"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  overviewMetrics,
  portalTabs,
  proofRows,
  profileRows,
  reconRows,
  scoreFactors,
  scoreSummary,
  workflows,
  type Workflow,
} from "@/lib/mock";
import { Section } from "./Section";

type Tab = (typeof portalTabs)[number];

const tone = {
  brand: "text-emerald-600",
  electric: "text-navy",
  amber: "text-amber-600",
} as const;

const badgeTone = {
  brand: "border-emerald-200 bg-emerald-50 text-emerald-700",
  electric: "border-slate-200 bg-slate-100 text-navy",
  amber: "border-amber-200 bg-amber-50 text-amber-700",
} as const;

export default function PortalPreview() {
  const [active, setActive] = useState<Tab>("Overview");

  return (
    <Section
      id="portal"
      eyebrow="Portal preview"
      title="A real partner dashboard, not generic SaaS cards"
      copy="Switch between tabs to see what an approved partner tracks. Interactive demo using sample data only — no backend, database or auth."
    >
      <div className="glass overflow-hidden rounded-[1.75rem] p-3 sm:p-5 lg:p-6">
        {/* window chrome */}
        <div className="mb-4 flex items-center justify-between border-b border-slate-200/70 pb-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
            <span className="ml-3 text-xs text-muted">portal.inr-p2p · sample workspace</span>
          </div>
          <span className="hidden rounded-full border border-amber-300 bg-amber-50 px-2.5 py-1 text-[0.7rem] font-semibold text-amber-700 sm:inline">
            Private Beta
          </span>
        </div>

        {/* tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          {portalTabs.map((tab) => (
            <button
              type="button"
              key={tab}
              onClick={() => setActive(tab)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                active === tab
                  ? "bg-brand text-white shadow-btn"
                  : "border border-slate-200 bg-white/70 text-muted hover:text-brand"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {active === "Overview" && <Overview />}
            {active === "Workflows" && <Workflows />}
            {active === "Proof" && <StatList rows={proofRows} note="Proof requirements and verification stay visible across every workflow." />}
            {active === "Reconciliation" && <StatList rows={reconRows} note="Matched, pending and exception states are clearly separated to reduce operational noise." />}
            {active === "Score" && <ScoreTab />}
            {active === "Profile" && <ProfileTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
}

function Overview() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {overviewMetrics.map((m) => (
        <div key={m.label} className="glass-2 rounded-2xl p-5">
          <p className="text-[0.7rem] uppercase tracking-[0.16em] text-muted">{m.label}</p>
          <p className={`mt-3 text-xl font-bold ${m.tone ? tone[m.tone] : "text-ink"}`}>{m.value}</p>
        </div>
      ))}
    </div>
  );
}

function Workflows() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white/60">
      <div className="grid grid-cols-5 gap-3 border-b border-slate-200/70 bg-white/70 px-4 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-muted max-md:hidden">
        <span>Workflow</span>
        <span>Amount</span>
        <span>Status</span>
        <span>Proof</span>
        <span>Reconciliation</span>
      </div>
      {workflows.map((row: Workflow) => (
        <div
          key={row.id}
          className="grid gap-2 border-t border-slate-100 px-4 py-4 text-sm text-muted first:border-t-0 md:grid-cols-5 md:items-center"
        >
          <span className="font-semibold text-ink">{row.id}</span>
          <span className="text-slate-700">{row.amount}</span>
          <span>
            <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${badgeTone[row.statusTone]}`}>
              {row.status}
            </span>
          </span>
          <span className="text-slate-700">{row.proof}</span>
          <span>
            <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${badgeTone[row.reconTone]}`}>
              {row.reconciliation}
            </span>
          </span>
        </div>
      ))}
      <div className="flex items-center justify-between border-t border-slate-200/70 bg-white/70 px-4 py-3 text-xs text-muted">
        <span>Available capacity impacts how much you can take on next.</span>
        <span className="font-semibold text-emerald-600">Available: ₹3,20,000</span>
      </div>
    </div>
  );
}

type StatRow = { label: string; value: string; note: string; icon: React.ComponentType<{ className?: string }> };

function StatList({ rows, note }: { rows: StatRow[]; note: string }) {
  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-3">
        {rows.map((r) => (
          <div key={r.label} className="glass-2 rounded-2xl p-5">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-brand">
              <r.icon className="h-4 w-4" />
            </div>
            <p className="text-2xl font-bold text-ink">{r.value}</p>
            <p className="mt-1 text-sm font-medium text-slate-700">{r.label}</p>
            <p className="mt-1 text-xs leading-5 text-muted">{r.note}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-muted">{note}</p>
    </div>
  );
}

function ScoreTab() {
  return (
    <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
        {scoreSummary.map((s) => (
          <div key={s.label} className="glass-2 flex items-center gap-3 rounded-2xl p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-brand">
              <s.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted">{s.label}</p>
              <p className="text-base font-semibold text-ink">{s.value}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="glass-2 rounded-2xl p-5">
        <p className="mb-4 text-sm font-medium text-slate-700">Score factors</p>
        <div className="grid grid-cols-2 gap-2">
          {scoreFactors.map((f) => (
            <span key={f} className="rounded-lg border border-slate-200 bg-white/70 px-3 py-2 text-xs text-slate-700">
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProfileTab() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {profileRows.map((p) => (
        <div key={p.label} className="glass-2 rounded-2xl p-5">
          <p className="text-[0.7rem] uppercase tracking-[0.16em] text-muted">{p.label}</p>
          <p className="mt-2 text-base font-semibold text-ink">{p.value}</p>
        </div>
      ))}
    </div>
  );
}
