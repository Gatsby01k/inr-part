"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Activity, CheckCircle2, Timer, Users, Wallet } from "lucide-react";
import {
  liveAmountPool,
  liveNextId,
  liveSeedMetrics,
  liveSeedRows,
  liveStatusOrder,
  type LiveActivityRow,
  type LiveStatus,
} from "@/lib/mock";

/* ---------------- config ---------------- */

const MAX_ROWS = 5;
const TICK_MIN = 2200;
const TICK_MAX = 3800;
const INSERT_CHANCE = 0.32;

type StatusMeta = { proof: string; recon: string; chip: string; dot: string; recTone: string };

const STATUS_META: Record<LiveStatus, StatusMeta> = {
  Assigned: { proof: "Required", recon: "Pending", chip: "border-slate-200 bg-slate-100 text-slate-600", dot: "bg-slate-400", recTone: "text-amber-600" },
  Processing: { proof: "In Progress", recon: "Open", chip: "border-blue-200 bg-blue-50 text-blue-700", dot: "bg-blue-500", recTone: "text-blue-600" },
  "Awaiting Proof": { proof: "Required", recon: "Pending", chip: "border-amber-200 bg-amber-50 text-amber-700", dot: "bg-amber-500", recTone: "text-amber-600" },
  Verified: { proof: "Verified", recon: "Open", chip: "border-sky-200 bg-sky-50 text-sky-700", dot: "bg-sky-500", recTone: "text-blue-600" },
  Matched: { proof: "Verified", recon: "Matched", chip: "border-emerald-200 bg-emerald-50 text-emerald-700", dot: "bg-emerald-500", recTone: "text-emerald-600" },
};

/* ---------------- helpers ---------------- */

const inr = (n: number) => "₹" + new Intl.NumberFormat("en-IN").format(n);
const clock = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}m ${String(s % 60).padStart(2, "0")}s`;
const vol = (cr: number) => `₹${cr.toFixed(2)} Cr`;
const randInt = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
const round1 = (n: number) => Math.round(n * 10) / 10;
const round2 = (n: number) => Math.round(n * 100) / 100;
const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

function drift(v: number, lo: number, hi: number) {
  const mid = (lo + hi) / 2;
  const pull = Math.random() < 0.3 ? (v > mid ? -1 : 1) : 0;
  return clamp(v + randInt(-1, 1) + pull, lo, hi);
}

// Static, gentle upward sparkline (settled-volume trend) — premium, not noisy.
const SPARK = [6, 10, 8, 14, 12, 18, 16, 22, 26, 24, 30, 34];
const sparkPath = (() => {
  const w = 100;
  const h = 32;
  const max = Math.max(...SPARK);
  const min = Math.min(...SPARK);
  const pts = SPARK.map((v, i) => {
    const x = (i / (SPARK.length - 1)) * w;
    const y = h - ((v - min) / (max - min)) * (h - 4) - 2;
    return [x, y] as const;
  });
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const area = `${line} L${w} ${h} L0 ${h} Z`;
  return { line, area };
})();

/* ---------------- component ---------------- */

export default function LiveTrustPanel() {
  const [rows, setRows] = useState<LiveActivityRow[]>(liveSeedRows.slice(0, MAX_ROWS));
  const [metrics, setMetrics] = useState(liveSeedMetrics);
  const [freshId, setFreshId] = useState<string | null>(null);

  const nextId = useRef(liveNextId);
  const freshTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 1s clock — increments elapsed for in-flight workflows (Matched are settled, so they freeze).
  useEffect(() => {
    const t = setInterval(() => {
      if (typeof document !== "undefined" && document.hidden) return;
      setRows((rs) => rs.map((r) => (r.status === "Matched" ? r : { ...r, elapsed: r.elapsed + 1 })));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  // Mutation scheduler — one subtle change every 2.2–3.8s.
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      let volumeAdd = 0;

      if (Math.random() < INSERT_CHANCE) {
        const id = `PPT-${nextId.current++}`;
        const amount = liveAmountPool[Math.floor(Math.random() * liveAmountPool.length)];
        const fresh: LiveActivityRow = { id, amount, status: "Assigned", elapsed: randInt(4, 26) };
        setRows((prev) => {
          const next = [fresh, ...prev];
          if (next.length > MAX_ROWS) {
            let idx = next.length - 1;
            for (let i = next.length - 1; i >= 0; i--) {
              if (next[i].status === "Matched") {
                idx = i;
                break;
              }
            }
            next.splice(idx, 1);
          }
          return next;
        });
        setFreshId(id);
        if (freshTimer.current) clearTimeout(freshTimer.current);
        freshTimer.current = setTimeout(() => setFreshId(null), 2400);
      } else {
        setRows((prev) => {
          const candidates: number[] = [];
          for (let i = 0; i < prev.length; i++) if (prev[i].status !== "Matched") candidates.push(i);
          if (candidates.length === 0) return prev;

          let total = 0;
          for (const i of candidates) total += i + 1;
          let r = Math.random() * total;
          let chosen = candidates[candidates.length - 1];
          for (const i of candidates) {
            r -= i + 1;
            if (r <= 0) {
              chosen = i;
              break;
            }
          }

          const ci = liveStatusOrder.indexOf(prev[chosen].status);
          const nextStatus = liveStatusOrder[Math.min(ci + 1, liveStatusOrder.length - 1)];
          if (nextStatus === "Matched") volumeAdd = prev[chosen].amount / 1e7;

          const next = prev.slice();
          next[chosen] = { ...next[chosen], status: nextStatus };
          return next;
        });
      }

      setMetrics((m) => ({
        partnersOnline: drift(m.partnersOnline, 124, 168),
        volumeCr: round2(m.volumeCr + volumeAdd),
        avgCompletionSec: clamp(m.avgCompletionSec + randInt(-3, 3), 430, 545),
        successRate: round1(clamp(m.successRate + (Math.random() * 0.2 - 0.1), 98, 99.3)),
      }));
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
      if (freshTimer.current) clearTimeout(freshTimer.current);
    };
  }, []);

  return (
    <div className="glass-panel rounded-[1.75rem] p-4 sm:p-5">
      {/* header */}
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-brand">
            <Activity className="h-5 w-5" strokeWidth={2.2} />
          </span>
          <div>
            <p className="text-sm font-semibold text-ink">Partner Dashboard</p>
            <p className="text-[0.7rem] text-muted">Demo dashboard · Sample data</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-emerald-700">
          <span className="relative flex h-2 w-2">
            <span className="ping-soft absolute inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            <span className="live-dot relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Live
        </span>
      </div>

      {/* metrics */}
      <div className="relative mt-4 grid grid-cols-2 gap-2.5">
        <Metric icon={<Users className="h-4 w-4" />} label="Partners Online" value={String(metrics.partnersOnline)} sub="active now" live />
        <Metric icon={<Wallet className="h-4 w-4" />} label="Today's Volume" value={vol(metrics.volumeCr)} sub="settled today" />
        <Metric icon={<Timer className="h-4 w-4" />} label="Avg Completion" value={clock(metrics.avgCompletionSec)} sub="per workflow" />
        <Metric icon={<CheckCircle2 className="h-4 w-4" />} label="Success Rate" value={`${metrics.successRate.toFixed(1)}%`} sub="last 24h" />
      </div>

      {/* activity table */}
      <div className="relative mt-3 overflow-hidden rounded-2xl border border-slate-200/70 bg-white/70">
        <div className="grid grid-cols-[1fr_auto_auto] gap-2 border-b border-slate-200/70 px-3 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-slate-400 md:grid-cols-[1.1fr_0.9fr_1.1fr_0.85fr] md:gap-3 md:px-4">
          <span>Partner ID</span>
          <span className="hidden md:block">Amount</span>
          <span>Status</span>
          <span className="text-right">Elapsed</span>
        </div>

        <div>
          <AnimatePresence initial={false}>
            {rows.map((row) => {
              const meta = STATUS_META[row.status];
              const isFresh = row.id === freshId;
              return (
                <motion.div
                  key={row.id}
                  layout
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.32, ease: "easeOut" }}
                  className={`group relative grid grid-cols-[1fr_auto_auto] items-center gap-2 border-b border-slate-100 px-3 py-2.5 text-sm transition-colors last:border-b-0 hover:bg-blue-50/50 md:grid-cols-[1.1fr_0.9fr_1.1fr_0.85fr] md:gap-3 md:px-4 ${
                    isFresh ? "bg-blue-50/70" : ""
                  }`}
                >
                  <span
                    className={`absolute left-0 top-0 h-full w-0.5 transition-opacity ${
                      isFresh ? "bg-brand opacity-100" : "bg-brand opacity-0 group-hover:opacity-100"
                    }`}
                  />

                  <div className="min-w-0">
                    <p className="font-semibold tabular-nums text-ink">{row.id}</p>
                    <p className="tabular-nums text-xs text-muted md:hidden">{inr(row.amount)}</p>
                  </div>

                  <p className="hidden tabular-nums text-slate-700 md:block">{inr(row.amount)}</p>

                  <div className="justify-self-start">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={row.status}
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.92 }}
                        transition={{ duration: 0.22 }}
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${meta.chip}`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
                        {row.status}
                      </motion.span>
                    </AnimatePresence>
                  </div>

                  <span className="justify-self-end whitespace-nowrap font-mono text-xs tabular-nums text-muted">
                    {clock(row.elapsed)}
                  </span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* reliability score + trend */}
      <div className="relative mt-3 grid grid-cols-[1.4fr_1fr] gap-2.5">
        <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-3.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted">Reliability Score</span>
            <span className="text-sm font-bold text-ink">
              86<span className="text-xs font-medium text-muted">/100</span>
            </span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "86%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-brand to-sky-400"
            />
          </div>
          <p className="mt-2 text-[0.68rem] text-muted">Verified tier · 68% to Pro</p>
        </div>

        <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-3.5">
          <span className="text-xs font-medium text-muted">Volume trend</span>
          <svg viewBox="0 0 100 32" preserveAspectRatio="none" className="mt-2 h-8 w-full">
            <defs>
              <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={sparkPath.area} fill="url(#sparkFill)" />
            <motion.path
              d={sparkPath.line}
              fill="none"
              stroke="#2563EB"
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

/* ---------------- metric tile ---------------- */

function Metric({
  icon,
  label,
  value,
  sub,
  live = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  live?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-3">
      <div className="mb-1.5 flex items-center gap-1.5 text-muted">
        <span className="text-brand">{icon}</span>
        <span className="text-[0.68rem] font-medium">{label}</span>
      </div>
      <div className="relative h-7 overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.p
            key={value}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0, position: "absolute" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="text-lg font-bold tabular-nums text-ink"
          >
            {value}
          </motion.p>
        </AnimatePresence>
      </div>
      <p className="mt-0.5 flex items-center gap-1.5 text-[0.66rem] text-muted">
        {live ? <span className="live-dot h-1.5 w-1.5 rounded-full bg-emerald-500" /> : null}
        {sub}
      </p>
    </div>
  );
}
