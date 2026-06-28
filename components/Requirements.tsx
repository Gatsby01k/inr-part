"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { requirements } from "@/lib/mock";
import { Section } from "./Section";

export default function Requirements() {
  return (
    <Section
      id="requirements"
      eyebrow="Requirements"
      title="What we look for in a partner"
      copy="Access is review-based. Partners who meet these expectations move through review faster."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {requirements.map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: index * 0.03 }}
            className="flex items-center gap-3 rounded-2xl border border-line bg-white/[0.025] p-4"
          >
            <CheckCircle2 className="h-5 w-5 shrink-0 text-brandSoft" />
            <span className="text-sm leading-6 text-slate-200">{item}</span>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
