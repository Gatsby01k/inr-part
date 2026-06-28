"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { scoreFactors } from "@/lib/mock";
import { Section } from "./Section";

export default function PartnerScore() {
  return (
    <Section
      id="score"
      eyebrow="Partner score"
      title="Partner Score turns reliable operating into better access"
      copy="Partner Score helps reliable operators receive better operating profiles over time. It is the reputation layer behind your limits and tier."
    >
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.5 }}
          className="glass rounded-3xl p-7"
        >
          <div className="relative mx-auto flex h-52 w-52 items-center justify-center rounded-full bg-amber-50">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 26, ease: "linear" }}
              className="absolute inset-3 rounded-full border-2 border-dashed border-brand/25"
            />
            <div className="text-center">
              <p className="text-6xl font-bold text-ink">86</p>
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted">/ 100</p>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-3 gap-2.5">
            <Metric label="Tier" value="Verified" />
            <Metric label="Next Tier" value="Pro" />
            <Metric label="Progress" value="68%" />
          </div>

          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between text-xs text-muted">
              <span>Verified</span>
              <span>Pro</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "68%" }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="h-full rounded-full bg-gradient-to-r from-saffron to-saffronWarm"
              />
            </div>
          </div>
        </motion.div>

        <div className="grid gap-3 sm:grid-cols-2">
          {scoreFactors.map((factor, index) => (
            <motion.div
              key={factor}
              initial={{ opacity: 0, x: 14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: index * 0.04 }}
              className="glass flex items-center gap-3 rounded-2xl p-4"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <TrendingUp className="h-5 w-5" />
              </span>
              <p className="text-sm font-semibold text-ink">{factor}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white/70 p-3 text-center">
      <p className="text-[0.7rem] text-muted">{label}</p>
      <p className="mt-1 text-sm font-semibold text-ink">{value}</p>
    </div>
  );
}
