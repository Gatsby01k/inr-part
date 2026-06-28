"use client";

import { motion } from "framer-motion";
import { networkCards } from "@/lib/mock";
import { Section } from "./Section";

export default function NetworkSection() {
  return (
    <Section
      id="network"
      eyebrow="Private network"
      title="Built for serious INR settlement operators"
      copy="This is a private partner network for reviewed operators who need structured workflow visibility, proof history, reconciliation status and performance-based access."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {networkCards.map(({ title, copy, icon: Icon }, index) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: index * 0.04 }}
            className="glass card-hover rounded-3xl p-5"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10">
              <Icon className="h-6 w-6 text-cyan-200" />
            </div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">{copy}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
