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
          className="glass rounded-[1.75rem] p-7"
        >
          <div className="relative mx-auto flex h-52 w-52 items-center justify-center rounded-full border border-brand/25 bg-brand/[0.07] shadow-glow">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 26, ease: "linear" }}
              className="absolute inset-3 rounded-full border border-dashed border-brand/30"
            />
            <div className="text-center">
              <p className="text-6xl font-semibold text-white">86</p>
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500">/ 100</p>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-3 gap-2.5">
            <Metric label="Tier" value="Verified" />
            <Metric label="Next Tier" value="Pro" />
            <Metric label="Progress" value="68%" />
          </div>

          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
              <span>Verified</span>
              <span>Pro</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-white/5">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "68%" }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="h-full rounded-full bg-gradient-to-r from-brand to-teal"
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
              className="flex items-center gap-3 rounded-2xl border border-line bg-white/[0.025] p-4"
            >
              <TrendingUp className="h-5 w-5 shrink-0 text-brandSoft" />
              <p className="text-sm font-medium text-white">{factor}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-line bg-slatecard/70 p-3 text-center">
      <p className="text-[0.7rem] text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}
