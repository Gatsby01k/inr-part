"use client";

import { motion } from "framer-motion";
import { steps } from "@/lib/mock";
import { Section } from "./Section";

export default function HowItWorks() {
  return (
    <Section
      id="how"
      eyebrow="How partner access works"
      title="A clear, review-based path to portal access"
      copy="Four steps from application to activation. Nothing is unlocked by payment — access is earned through review and agreement."
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.45, delay: index * 0.06 }}
            className="relative overflow-hidden rounded-2xl border border-line bg-panel/70 p-6"
          >
            <div className="absolute right-3 top-2 text-6xl font-black text-white/[0.03]">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-brand/25 bg-gradient-to-br from-brand/20 to-electric/10">
              <step.icon className="h-5 w-5 text-brandSoft" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brandSoft">Step {index + 1}</p>
            <h3 className="mt-2 text-base font-semibold leading-snug text-white">{step.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">{step.copy}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
