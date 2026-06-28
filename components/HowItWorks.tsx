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
            className="glass card-hover relative overflow-hidden rounded-3xl p-6"
          >
            <div className="absolute right-3 top-1 text-6xl font-black text-amber-500/[0.08]">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-brand">
              <step.icon className="h-5 w-5" strokeWidth={2} />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">Step {index + 1}</p>
            <h3 className="mt-2 text-base font-semibold leading-snug text-ink">{step.title}</h3>
            <p className="mt-3 text-sm leading-6 text-muted">{step.copy}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
