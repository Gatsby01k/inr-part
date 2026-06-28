"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Clock3, FileCheck2, ShieldCheck } from "lucide-react";
import { overviewMetrics, portalTabs, workflows } from "@/lib/mock";
import { Section } from "./Section";

type Tab = (typeof portalTabs)[number];

export default function PortalPreview() {
  const [active, setActive] = useState<Tab>("Overview");

  return (
    <Section id="portal" eyebrow="Portal preview" title="One private workspace for profile, workflows and proof history" copy="Interactive demo preview using sample data only. No backend, no database and no auth logic.">
      <div className="glass overflow-hidden rounded-[2rem] p-4 sm:p-6 lg:p-8">
        <div className="mb-6 flex flex-wrap gap-2">
          {portalTabs.map((tab) => (
            <button
              type="button"
              key={tab}
              onClick={() => setActive(tab)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${active === tab ? "bg-cyan-300 text-slate-950" : "border border-white/10 bg-white/5 text-slate-300 hover:text-white"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <motion.div key={active} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}>
          {active === "Overview" ? <Overview /> : null}
          {active === "Workflows" ? <WorkflowTable /> : null}
          {active === "Proof Tracking" ? <StatusPanel icon={<FileCheck2 className="h-5 w-5" />} title="Proof tracking" copy="Proof requirements, submitted records, reference notes and verification status stay visible across every workflow." stats={["94% proof quality", "2 verified today", "1 required"]} /> : null}
          {active === "Reconciliation" ? <StatusPanel icon={<CheckCircle2 className="h-5 w-5" />} title="Reconciliation visibility" copy="Matched, pending and open reconciliation states are clearly separated so partners can coordinate with less operational noise." stats={["98.4% matched", "1 pending", "0 exceptions"]} /> : null}
          {active === "Partner Score" ? <StatusPanel icon={<ShieldCheck className="h-5 w-5" />} title="Partner score" copy="Reliability, response quality and proof discipline are converted into a visible partner reputation layer." stats={["86/100", "Verified tier", "68% to Pro"]} /> : null}
          {active === "Profile" ? <StatusPanel icon={<ArrowUpRight className="h-5 w-5" />} title="Operating profile" copy="Partner type, region, capacity, communication reliability and review status live inside one private operating profile." stats={["Approved", "North + West India", "Professional entity"]} /> : null}
        </motion.div>
      </div>
    </Section>
  );
}

function Overview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {overviewMetrics.map(([label, value]) => (
        <div key={label} className="rounded-3xl border border-white/10 bg-slate-950/45 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</p>
          <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
        </div>
      ))}
    </div>
  );
}

function WorkflowTable() {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10">
      <div className="grid grid-cols-5 gap-3 bg-white/[0.04] p-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 max-md:hidden">
        <span>Workflow ID</span><span>Amount</span><span>Status</span><span>Proof</span><span>Reconciliation</span>
      </div>
      {workflows.map((row) => (
        <div key={row.id} className="grid gap-3 border-t border-white/10 p-4 text-sm text-slate-300 md:grid-cols-5">
          <span className="font-semibold text-white">{row.id}</span>
          <span>{row.amount}</span>
          <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4 text-cyan-200" />{row.status}</span>
          <span>{row.proof}</span>
          <span>{row.reconciliation}</span>
        </div>
      ))}
    </div>
  );
}

function StatusPanel({ icon, title, copy, stats }: { icon: React.ReactNode; title: string; copy: string; stats: string[] }) {
  return (
    <div className="grid gap-5 lg:grid-cols-[.85fr_1.15fr]">
      <div className="rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-6">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-300 text-slate-950">{icon}</div>
        <h3 className="text-2xl font-semibold text-white">{title}</h3>
        <p className="mt-4 leading-7 text-slate-300">{copy}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat} className="rounded-3xl border border-white/10 bg-slate-950/45 p-6">
            <p className="text-2xl font-semibold text-white">{stat}</p>
            <p className="mt-3 text-sm text-slate-500">Sample portal metric</p>
          </div>
        ))}
      </div>
    </div>
  );
}
