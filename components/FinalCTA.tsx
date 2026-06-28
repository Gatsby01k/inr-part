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
        className="glass-panel relative overflow-hidden rounded-[2rem] p-8 text-center sm:p-12"
      >
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-amber-200/40 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-emerald-200/35 blur-3xl" />
        <div className="relative">
          <h2 className="mx-auto max-w-3xl text-3xl font-semibold tracking-tight text-ink sm:text-[2.6rem] sm:leading-[1.1]">
            Ready to apply for private partner access?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            Submit your partner profile for review and get access to structured workflow tracking, proof history,
            reconciliation visibility and partner score.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="#apply"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-saffron to-saffronWarm px-7 py-3.5 text-sm font-bold text-white shadow-btnSaffron transition hover:-translate-y-0.5 hover:brightness-105"
            >
              Apply for Review <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#login"
              className="inline-flex items-center justify-center rounded-full border border-saffron/40 bg-white/70 px-7 py-3.5 text-sm font-bold text-ink transition hover:-translate-y-0.5 hover:bg-amber-50"
            >
              Partner Login
            </a>
          </div>
          <div className="mt-9 flex flex-wrap justify-center gap-2.5">
            {trustChips.map(({ label, icon: Icon }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3.5 py-1.5 text-xs font-medium text-slate-700"
              >
                <Icon className="h-3.5 w-3.5 text-brand" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
