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

const MAX_ROWS = 7;
const TICK_MIN = 2200;
const TICK_MAX = 3800;
const INSERT_CHANCE = 0.32;

type StatusMeta = { proof: string; recon: string; chip: string; dot: string; recTone: string };

const STATUS_META: Record<LiveStatus, StatusMeta> = {
  Assigned: { proof: "Required", recon: "Pending", chip: "border-white/15 bg-white/[0.06] text-slate-200", dot: "bg-slate-300", recTone: "text-amberSoft" },
  Processing: { proof: "In Progress", recon: "Open", chip: "border-electric/40 bg-electric/10 text-electricSoft", dot: "bg-electric", recTone: "text-electricSoft" },
  "Awaiting Proof": { proof: "Required", recon: "Pending", chip: "border-amberSoft/40 bg-amberSoft/10 text-amberSoft", dot: "bg-amberSoft", recTone: "text-amberSoft" },
  Verified: { proof: "Verified", recon: "Open", chip: "border-teal/50 bg-teal/15 text-teal", dot: "bg-teal", recTone: "text-electricSoft" },
  Matched: { proof: "Verified", recon: "Matched", chip: "border-brand/40 bg-brand/10 text-brandSoft", dot: "bg-brand", recTone: "text-brandSoft" },
};

/* ---------------- helpers ---------------- */

const inr = (n: number) => "₹" + new Intl.NumberFormat("en-IN").format(n);
const clock = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}m ${String(s % 60).padStart(2, "0")}s`;
const vol = (cr: number) => `₹${cr.toFixed(2)} Cr`;
const randInt = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
const round1 = (n: number) => Math.round(n * 10) / 10;
const round2 = (n: number) => Math.round(n * 100) / 100;
const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

// Gentle mean-reverting random walk so values never run away or stick to an edge.
function drift(v: number, lo: number, hi: number) {
  const mid = (lo + hi) / 2;
  const pull = Math.random() < 0.3 ? (v > mid ? -1 : 1) : 0;
  return clamp(v + randInt(-1, 1) + pull, lo, hi);
}

/* ---------------- component ---------------- */

export default function LiveTrustPanel() {
  const [rows, setRows] = useState<LiveActivityRow[]>(liveSeedRows);
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

          // Bias progression toward older (lower) rows so the feed flows downward.
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

      // Single, batched metrics update — drift + any settled volume.
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
    <section id="live" className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55 }}
        className="liquid-glass overflow-hidden p-5 sm:p-7"
      >
        {/* header */}
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-electric/10">
              <Activity className="h-5 w-5 text-electricSoft" />
            </span>
            <div>
              <h2 className="text-lg font-semibold text-white sm:text-xl">Live partner network</h2>
              <p className="text-xs text-slate-400">Workflows being processed across approved partners</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-brandSoft">
            <span className="relative flex h-2 w-2">
              <span className="ping-soft absolute inline-flex h-2 w-2 rounded-full bg-brand" />
              <span className="live-dot relative inline-flex h-2 w-2 rounded-full bg-brand" />
            </span>
            Live
          </span>
        </div>

        {/* metrics */}
        <div className="relative mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Metric icon={<Users className="h-4 w-4" />} label="Partners Online" value={String(metrics.partnersOnline)} sub="active now" live />
          <Metric icon={<Wallet className="h-4 w-4" />} label="Today's Volume" value={vol(metrics.volumeCr)} sub="settled today" />
          <Metric icon={<Timer className="h-4 w-4" />} label="Avg Completion Time" value={clock(metrics.avgCompletionSec)} sub="per workflow" />
          <Metric icon={<CheckCircle2 className="h-4 w-4" />} label="Success Rate" value={`${metrics.successRate.toFixed(1)}%`} sub="last 24h" />
        </div>

        {/* activity table */}
        <div className="relative mt-6 overflow-hidden rounded-2xl border border-white/10 bg-ink/40">
          <div className="grid grid-cols-[1fr_auto_auto] gap-3 border-b border-white/10 px-4 py-3 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-slate-500 md:grid-cols-[1.1fr_1fr_1.2fr_0.95fr_1fr_0.85fr]">
            <span>Partner ID</span>
            <span className="hidden md:block">Amount (INR)</span>
            <span>Status</span>
            <span className="hidden md:block">Proof</span>
            <span className="hidden md:block">Reconciliation</span>
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
                    className={`group relative grid grid-cols-[1fr_auto_auto] items-center gap-3 border-b border-white/[0.06] px-4 py-3 text-sm transition-colors last:border-b-0 hover:bg-white/[0.035] md:grid-cols-[1.1fr_1fr_1.2fr_0.95fr_1fr_0.85fr] ${
                      isFresh ? "bg-electric/[0.07]" : ""
                    }`}
                  >
                    {/* left accent on hover / fresh */}
                    <span
                      className={`absolute left-0 top-0 h-full w-0.5 transition-opacity ${
                        isFresh ? "bg-electric opacity-100" : "bg-brand opacity-0 group-hover:opacity-100"
                      }`}
                    />

                    {/* Partner ID (+ amount on mobile) */}
                    <div className="min-w-0">
                      <p className="font-medium tabular-nums text-white">{row.id}</p>
                      <p className="tabular-nums text-xs text-slate-400 md:hidden">{inr(row.amount)}</p>
                    </div>

                    {/* Amount (desktop) */}
                    <p className="hidden tabular-nums text-slate-200 md:block">{inr(row.amount)}</p>

                    {/* Status chip */}
                    <div className="justify-self-start">
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                          key={row.status}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.22 }}
                          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${meta.chip}`}
                        >
                          <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
                          {row.status}
                        </motion.span>
                      </AnimatePresence>
                    </div>

                    {/* Proof (desktop) */}
                    <span className="hidden text-slate-300 md:block">{meta.proof}</span>

                    {/* Reconciliation (desktop) */}
                    <span className={`hidden font-medium md:block ${meta.recTone}`}>{meta.recon}</span>

                    {/* Elapsed */}
                    <span className="justify-self-end whitespace-nowrap font-mono text-xs tabular-nums text-slate-400">
                      {clock(row.elapsed)}
                    </span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        <p className="relative mt-4 text-center text-[0.7rem] text-slate-500">
          Live activity is simulated with sample data for demonstration · no real partner data is shown
        </p>
      </motion.div>
    </section>
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
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="mb-2 flex items-center gap-2 text-slate-400">
        <span className="text-electricSoft">{icon}</span>
        <span className="text-[0.7rem] font-medium">{label}</span>
      </div>
      <div className="relative h-8 overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.p
            key={value}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0, position: "absolute" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="text-xl font-semibold tabular-nums text-white"
          >
            {value}
          </motion.p>
        </AnimatePresence>
      </div>
      <p className="mt-1 flex items-center gap-1.5 text-[0.7rem] text-slate-500">
        {live ? <span className="live-dot h-1.5 w-1.5 rounded-full bg-brand" /> : null}
        {sub}
      </p>
    </div>
  );
}
