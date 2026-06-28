"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Activity, CheckCircle2, Timer, Users, Wallet } from "lucide-react";
import {
  advanceLiveState,
  buildInitialLiveState,
  formatCr,
  formatClock,
  formatINR,
  getDailyLiveBaseline,
  liveAmountPool,
  liveSeedRows,
  liveStatusOrder,
  loadLiveState,
  saveLiveState,
  utcDay,
  type LiveActivityRow,
  type LiveMetrics,
  type LiveStatus,
  type PersistedLiveState,
} from "@/lib/mock";

/* ---------------- fixed layout constants (stability) ---------------- */

const MAX_ROWS = 5;
const ROW_H = 52; // px — fixed row height; the table never re-lays-out
const TICK_MIN = 3000;
const TICK_MAX = 5000;
const INSERT_BIAS = 0.42;

/* ---------------- status styling ---------------- */

type StatusMeta = { chip: string; dot: string };

const STATUS_META: Record<LiveStatus, StatusMeta> = {
  Assigned: { chip: "border-slate-200 bg-slate-100 text-slate-600", dot: "bg-slate-400" },
  Processing: { chip: "border-slate-300 bg-slate-100 text-navy", dot: "bg-navy" },
  "Awaiting Proof": { chip: "border-amber-200 bg-amber-50 text-amber-700", dot: "bg-amber-500" },
  Verified: { chip: "border-emerald-200 bg-emerald-50 text-emerald-700", dot: "bg-emerald-500" },
  Matched: { chip: "border-emerald-200 bg-emerald-50 text-emerald-700", dot: "bg-emerald-500" },
  Completed: { chip: "border-emerald-300 bg-emerald-100 text-emerald-800", dot: "bg-emerald-600" },
};

/* ---------------- small helpers (timers only — never during render) ---------------- */

const randInt = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
const r1 = (n: number) => Math.round(n * 10) / 10;
const r2 = (n: number) => Math.round(n * 100) / 100;
const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

function drift(v: number, lo: number, hi: number) {
  const mid = (lo + hi) / 2;
  const pull = Math.random() < 0.3 ? (v > mid ? -1 : 1) : 0;
  return clamp(v + randInt(-1, 1) + pull, lo, hi);
}

// Static, gentle upward sparkline — rendered once, never re-laid-out.
const SPARK = [6, 9, 8, 13, 12, 17, 16, 21, 25, 23, 29, 33];
const sparkPath = (() => {
  const w = 100;
  const h = 30;
  const max = Math.max(...SPARK);
  const min = Math.min(...SPARK);
  const pts = SPARK.map((v, i) => {
    const x = (i / (SPARK.length - 1)) * w;
    const y = h - ((v - min) / (max - min)) * (h - 4) - 2;
    return [x, y] as const;
  });
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  return { line, area: `${line} L${w} ${h} L0 ${h} Z` };
})();

/* ---------------- component ---------------- */

export default function LiveTrustPanel() {
  // Deterministic initial state — identical on server and client (no hydration drift).
  const [metrics, setMetrics] = useState<LiveMetrics>(() => getDailyLiveBaseline(utcDay()));
  const [rows, setRows] = useState<LiveActivityRow[]>(() => liveSeedRows.slice(0, MAX_ROWS).map((r) => ({ ...r })));
  const [flashId, setFlashId] = useState<string | null>(null);

  const nextId = useRef(0);
  const stateRef = useRef<PersistedLiveState | null>(null);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Latest values for the timers to read — keeps state updaters pure (StrictMode-safe).
  const rowsRef = useRef(rows);
  const metricsRef = useRef(metrics);

  // Keep refs + a persistable snapshot in sync with the latest rendered values.
  useEffect(() => {
    rowsRef.current = rows;
    metricsRef.current = metrics;
    stateRef.current = {
      day: utcDay(),
      lastUpdatedAt: Date.now(),
      nextId: nextId.current,
      metrics,
      rows,
    };
  }, [metrics, rows]);

  // On mount (client only): continue from persisted state, advanced by the time gap.
  useEffect(() => {
    const now = Date.now();
    const persisted = loadLiveState();
    const state = persisted ? advanceLiveState(persisted, now) : buildInitialLiveState(utcDay(now), now);
    nextId.current = state.nextId;
    setMetrics(state.metrics);
    setRows(state.rows.slice(0, MAX_ROWS));
    saveLiveState({ ...state, rows: state.rows.slice(0, MAX_ROWS) });

    const persist = () => {
      if (stateRef.current) saveLiveState(stateRef.current);
    };
    window.addEventListener("pagehide", persist);
    return () => window.removeEventListener("pagehide", persist);
  }, []);

  // 1s clock — text only (fixed row height ⇒ zero re-layout).
  useEffect(() => {
    const t = setInterval(() => {
      if (typeof document !== "undefined" && document.hidden) return;
      setRows((rs) =>
        rs.map((r) => (r.status === "Matched" || r.status === "Completed" ? r : { ...r, elapsed: r.elapsed + 1 })),
      );
    }, 1000);
    return () => clearInterval(t);
  }, []);

  // Mutation scheduler — one subtle change every 3–5s, in place (no reorder).
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const flash = (id: string) => {
      setFlashId(id);
      if (flashTimer.current) clearTimeout(flashTimer.current);
      flashTimer.current = setTimeout(() => setFlashId(null), 1100);
    };

    // Compute the whole mutation up-front from refs, then apply pure value updates.
    const tick = () => {
      const prev = rowsRef.current;
      const m = metricsRef.current;

      const completed: number[] = [];
      const active: number[] = [];
      prev.forEach((r, i) => (r.status === "Completed" ? completed.push(i) : active.push(i)));

      const next = prev.slice();
      let changedId: string | null = null;
      let volumeAdd = 0;

      const rotate = (completed.length > 0 && Math.random() < INSERT_BIAS) || active.length === 0;

      if (rotate && completed.length > 0) {
        // Rotate a finished lane into a fresh workflow (the "new row" event), in place.
        const slot = completed[0];
        const id = `PPT-${nextId.current++}`;
        next[slot] = { id, amount: liveAmountPool[Math.floor(Math.random() * liveAmountPool.length)], status: "Assigned", elapsed: randInt(3, 18) };
        changedId = id;
      } else if (active.length > 0) {
        // Bias progression toward lower (older) lanes so the board flows naturally.
        let total = 0;
        for (const i of active) total += i + 1;
        let pick = Math.random() * total;
        let chosen = active[active.length - 1];
        for (const i of active) {
          pick -= i + 1;
          if (pick <= 0) {
            chosen = i;
            break;
          }
        }
        const ci = liveStatusOrder.indexOf(prev[chosen].status);
        const ns = liveStatusOrder[Math.min(ci + 1, liveStatusOrder.length - 1)];
        if (ns === "Matched") volumeAdd = prev[chosen].amount / 1e7;
        next[chosen] = { ...next[chosen], status: ns };
        changedId = next[chosen].id;
      } else {
        return;
      }

      setRows(next);

      const newMetrics: LiveMetrics = {
        partnersOnline: drift(m.partnersOnline, 132, 168),
        volumeCr: r2(m.volumeCr + volumeAdd),
        avgCompletionSec: clamp(m.avgCompletionSec + randInt(-3, 3), 430, 545),
        successRate: r1(clamp(m.successRate + (Math.random() * 0.2 - 0.1), 97.8, 99.1)),
      };
      setMetrics(newMetrics);

      if (changedId) flash(changedId);
    };

    const schedule = () => {
      timer = setTimeout(() => {
        if (typeof document === "undefined" || !document.hidden) tick();
        schedule();
      }, randInt(TICK_MIN, TICK_MAX));
    };
    schedule();

    return () => {
      clearTimeout(timer);
      if (flashTimer.current) clearTimeout(flashTimer.current);
    };
  }, []);

  return (
    <div className="glass-panel rounded-3xl p-4 sm:p-5">
      {/* header */}
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-saffron">
            <Activity className="h-5 w-5" strokeWidth={2.2} />
          </span>
          <div>
            <p className="text-sm font-semibold text-ink">Partner Dashboard</p>
            <p className="text-[0.7rem] text-muted">Demo dashboard · Sample data</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-wide text-emerald-700">
          <span className="relative flex h-2 w-2">
            <span className="ping-soft absolute inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            <span className="live-dot relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Live
        </span>
      </div>

      {/* metrics — fixed-height tiles */}
      <div className="relative mt-4 grid grid-cols-2 gap-2.5">
        <Metric icon={<Users className="h-4 w-4" />} accent="text-emerald-600" label="Partners Online" value={String(metrics.partnersOnline)} sub="active now" live />
        <Metric icon={<Wallet className="h-4 w-4" />} accent="text-saffron" label="Today's Volume" value={formatCr(metrics.volumeCr)} sub="settled today" />
        <Metric icon={<Timer className="h-4 w-4" />} accent="text-navy" label="Avg Completion" value={formatClock(metrics.avgCompletionSec)} sub="per workflow" />
        <Metric icon={<CheckCircle2 className="h-4 w-4" />} accent="text-emerald-600" label="Success Rate" value={`${metrics.successRate.toFixed(1)}%`} sub="last 24h" />
      </div>

      {/* activity table — fixed slots, fixed row height, no reorder */}
      <div className="relative mt-3 overflow-hidden rounded-2xl border border-slate-200/70 bg-white/70">
        <div className="grid grid-cols-[1fr_9rem_4rem] gap-2 border-b border-slate-200/70 px-3 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-slate-400 md:grid-cols-[1.1fr_0.9fr_9rem_4.2rem] md:gap-3 md:px-4">
          <span>Partner ID</span>
          <span className="hidden md:block">Amount</span>
          <span>Status</span>
          <span className="text-right">Elapsed</span>
        </div>

        <div style={{ height: MAX_ROWS * ROW_H }}>
          {rows.map((row, idx) => {
            const meta = STATUS_META[row.status];
            const isFresh = row.id === flashId;
            return (
              <div
                key={idx}
                style={{ height: ROW_H }}
                className={`border-b border-slate-100 transition-colors duration-700 last:border-b-0 ${
                  isFresh ? "bg-amber-50" : "bg-transparent"
                }`}
              >
                {/* lane content keyed by workflow id — remounts (fades in) only when a lane rotates */}
                <motion.div
                  key={row.id}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="grid h-full grid-cols-[1fr_9rem_4rem] items-center gap-2 px-3 text-sm md:grid-cols-[1.1fr_0.9fr_9rem_4.2rem] md:gap-3 md:px-4"
                >
                  <div className="min-w-0">
                    <p className="truncate font-semibold tabular-nums text-ink">{row.id}</p>
                    <p className="truncate tabular-nums text-xs text-muted md:hidden">{formatINR(row.amount)}</p>
                  </div>
                  <p className="hidden tabular-nums text-slate-700 md:block">{formatINR(row.amount)}</p>
                  <div className="justify-self-start">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors duration-300 ${meta.chip}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
                      {row.status}
                    </span>
                  </div>
                  <span className="justify-self-end whitespace-nowrap font-mono text-xs tabular-nums text-muted">
                    {formatClock(row.elapsed)}
                  </span>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* reliability score + trend — fixed height */}
      <div className="relative mt-3 grid grid-cols-[1.4fr_1fr] gap-2.5">
        <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-3.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted">Reliability Score</span>
            <span className="text-sm font-bold tabular-nums text-ink">
              86<span className="text-xs font-medium text-muted">/100</span>
            </span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "86%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-saffron to-saffronWarm"
            />
          </div>
          <p className="mt-2 text-[0.68rem] text-muted">Verified tier · 68% to Pro</p>
        </div>

        <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-3.5">
          <span className="text-xs font-medium text-muted">Volume trend</span>
          <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="mt-2 h-8 w-full">
            <defs>
              <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={sparkPath.area} fill="url(#sparkFill)" />
            <motion.path
              d={sparkPath.line}
              fill="none"
              stroke="#F59E0B"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: "easeOut" }}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ---------------- fixed-height metric tile ---------------- */

function Metric({
  icon,
  accent,
  label,
  value,
  sub,
  live = false,
}: {
  icon: React.ReactNode;
  accent: string;
  label: string;
  value: string;
  sub: string;
  live?: boolean;
}) {
  return (
    <div className="flex h-[84px] flex-col justify-between rounded-2xl border border-slate-200/70 bg-white/70 p-3">
      <div className="flex items-center gap-1.5 text-muted">
        <span className={accent}>{icon}</span>
        <span className="text-[0.68rem] font-medium">{label}</span>
      </div>
      <motion.p
        key={value}
        initial={{ opacity: 0.45 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="text-lg font-bold tabular-nums leading-none text-ink"
      >
        {value}
      </motion.p>
      <p className="flex items-center gap-1.5 text-[0.66rem] leading-none text-muted">
        {live ? <span className="live-dot h-1.5 w-1.5 rounded-full bg-emerald-500" /> : null}
        {sub}
      </p>
    </div>
  );
}
