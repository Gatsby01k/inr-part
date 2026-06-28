"use client";

import { motion } from "framer-motion";
import { steps } from "@/lib/mock";
import { Section } from "./Section";

export default function HowItWorks() {
  return (
    <Section id="how" eyebrow="Review-based access" title="How approved partners enter the portal">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/45 p-6"
          >
            <div className="absolute right-4 top-3 text-7xl font-black text-white/[0.035]">{String(index + 1).padStart(2, "0")}</div>
            <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300/20 to-emerald-300/10 text-sm font-bold text-cyan-100">
              {index + 1}
            </div>
            <h3 className="text-xl font-semibold text-white">{step.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">{step.copy}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
