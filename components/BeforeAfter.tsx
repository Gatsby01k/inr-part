"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, X } from "lucide-react";
import { afterItems, beforeItems } from "@/lib/mock";
import { Section } from "./Section";

export default function BeforeAfter() {
  return (
    <Section
      id="before-after"
      eyebrow="Why a portal"
      title="Move from messy chat coordination to structured partner operations"
      copy="The difference an approved partner feels on day one."
    >
      <div className="grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr]">
        <CompareCard title="Before" items={beforeItems} variant="before" />
        <div className="flex items-center justify-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-white shadow-btn">
            <ArrowRight className="h-5 w-5 max-lg:rotate-90" />
          </div>
        </div>
        <CompareCard title="After" items={afterItems} variant="after" />
      </div>
    </Section>
  );
}

function CompareCard({ title, items, variant }: { title: string; items: string[]; variant: "before" | "after" }) {
  const after = variant === "after";
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.5 }}
      className={`rounded-3xl p-6 ${
        after ? "border-2 border-emerald-200 bg-gradient-to-b from-emerald-50 to-white shadow-glassSoft" : "glass"
      }`}
    >
      <h3 className={`text-xl font-semibold ${after ? "text-ink" : "text-muted"}`}>{title}</h3>
      <ul className="mt-5 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-3 text-sm">
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                after ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400"
              }`}
            >
              {after ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
            </span>
            <span className={after ? "font-medium text-ink" : "text-muted"}>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
