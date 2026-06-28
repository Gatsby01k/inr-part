"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { trustChips } from "@/lib/mock";

export default function FinalCTA() {
  return (
    <section className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55 }}
        className="glass relative overflow-hidden rounded-[2rem] p-8 text-center sm:p-12"
      >
        <div className="absolute inset-0 bg-radial-emerald opacity-70" />
        <div className="relative">
          <h2 className="mx-auto max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-[2.6rem] sm:leading-[1.1]">
            Ready to apply for private partner access?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300/90 sm:text-lg">
            Submit your partner profile for review and get access to structured workflow tracking, proof history,
            reconciliation visibility and partner score.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="#apply"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-3.5 text-sm font-bold text-ink shadow-glow transition hover:bg-brandSoft"
            >
              Apply for Review <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#login"
              className="inline-flex items-center justify-center rounded-full border border-line bg-white/[0.03] px-7 py-3.5 text-sm font-bold text-white transition hover:border-electric/50 hover:bg-white/[0.06]"
            >
              Partner Login
            </a>
          </div>
          <div className="mt-9 flex flex-wrap justify-center gap-2.5">
            {trustChips.map(({ label, icon: Icon }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium text-slate-300"
              >
                <Icon className="h-3.5 w-3.5 text-brandSoft" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
