"use client";

import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { tiers } from "@/lib/mock";
import { Section } from "./Section";

export default function TierCards() {
  return (
    <Section
      id="tiers"
      eyebrow="Partner tiers"
      title="Access grows with reviewed operating reliability"
      copy="Every partner starts reviewed and moves up with consistent, reliable operating. Tier reflects trust — not payment."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tiers.map((tier, index) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.45, delay: index * 0.06 }}
            className={`relative flex flex-col rounded-3xl p-6 ${
              tier.featured
                ? "border-2 border-brand bg-gradient-to-b from-blue-50 to-white shadow-lift"
                : "glass"
            }`}
          >
            {tier.featured ? (
              <span className="absolute -top-3 left-6 rounded-full bg-brand px-3 py-1 text-[0.7rem] font-bold text-white shadow-btn">
                Most common
              </span>
            ) : null}
            <h3 className="text-2xl font-semibold text-ink">{tier.name}</h3>
            <p className="mt-1 text-sm font-semibold text-brand">{tier.tagline}</p>
            <ul className="mt-6 space-y-3.5">
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-3 text-sm text-slate-700">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" /> {feature}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
