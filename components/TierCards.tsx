"use client";

import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { tiers } from "@/lib/mock";
import { Section } from "./Section";

export default function TierCards() {
  return (
    <Section
      eyebrow="Partner tiers"
      title="Access grows with reviewed operating reliability"
      copy="Access level is based on review, reliability, proof quality, reconciliation history, operating profile and partner score."
    >
      <div className="grid gap-4 lg:grid-cols-4">
        {tiers.map((tier, index) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className={`rounded-[2rem] border p-6 ${tier.featured ? "border-cyan-300/40 bg-cyan-300/10 shadow-glow" : "border-white/10 bg-white/[0.035]"}`}
          >
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-cyan-100">{tier.badge}</span>
            <h3 className="mt-6 text-2xl font-semibold text-white">{tier.name}</h3>
            <ul className="mt-6 space-y-4">
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-3 text-sm text-slate-300">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" /> {feature}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
