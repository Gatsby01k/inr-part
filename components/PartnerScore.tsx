"use client";

import { motion } from "framer-motion";
import { Check, TrendingUp } from "lucide-react";
import { afterItems, beforeItems, requirements, scoreFactors } from "@/lib/mock";
import { Section } from "./Section";

export default function PartnerScore() {
  return (
    <>
      <Section id="score" eyebrow="Partner score" title="Partner Score turns reliability into access">
        <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <div className="glass rounded-[2rem] p-7">
            <div className="relative mx-auto flex h-56 w-56 items-center justify-center rounded-full border border-cyan-300/25 bg-cyan-300/10 shadow-glow">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                className="absolute inset-3 rounded-full border border-dashed border-emerald-300/30"
              />
              <div className="text-center">
                <p className="text-6xl font-semibold text-white">86</p>
                <p className="text-sm uppercase tracking-[0.25em] text-slate-400">/100</p>
              </div>
            </div>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <Metric label="Tier" value="Verified" />
              <Metric label="Next Tier" value="Pro" />
              <Metric label="Progress" value="68%" />
            </div>
            <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-800">
              <motion.div initial={{ width: 0 }} whileInView={{ width: "68%" }} viewport={{ once: true }} transition={{ duration: 1 }} className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300" />
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {scoreFactors.map((factor, index) => (
              <motion.div
                key={factor}
                initial={{ opacity: 0, x: 14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.035 }}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-5"
              >
                <TrendingUp className="mb-4 h-5 w-5 text-emerald-300" />
                <p className="font-semibold text-white">{factor}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      <Section eyebrow="Partner operations" title="Move from messy chat coordination to structured partner operations">
        <div className="grid gap-5 lg:grid-cols-2">
          <CompareCard title="Before" items={beforeItems} muted />
          <CompareCard title="After" items={afterItems} />
        </div>
      </Section>

      <Section eyebrow="Requirements" title="Private network requirements">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {requirements.map((item) => (
            <div key={item} className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 text-sm leading-6 text-slate-300">
              <Check className="mb-3 h-5 w-5 text-cyan-200" />
              {item}
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 text-center">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 font-semibold text-white">{value}</p>
    </div>
  );
}

function CompareCard({ title, items, muted = false }: { title: string; items: string[]; muted?: boolean }) {
  return (
    <div className={`rounded-[2rem] border p-6 ${muted ? "border-rose-300/15 bg-rose-300/[0.03]" : "border-emerald-300/25 bg-emerald-300/[0.06] shadow-emerald"}`}>
      <h3 className="text-2xl font-semibold text-white">{title}</h3>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item} className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-sm text-slate-300">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
