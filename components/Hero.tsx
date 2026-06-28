"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Info } from "lucide-react";
import { heroBullets } from "@/lib/mock";
import LiveTrustPanel from "./LiveTrustPanel";

export default function Hero() {
  return (
    <section id="top" className="relative px-4 pb-16 pt-32 sm:px-6 lg:px-8 lg:pb-24 lg:pt-44">
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Left */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-blue-700">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            Private Beta · Review Required
          </div>

          <h1 className="max-w-xl text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-ink sm:text-5xl lg:text-[3.4rem]">
            Work as an approved INR P2P partner with clear limits,{" "}
            <span className="text-gradient">live workflow tracking</span> and partner score.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-muted sm:text-lg">
            Apply for review, complete partner onboarding, manage your operating profile, track workflows, maintain proof
            history, view reconciliation status and build your partner score inside one private portal.
          </p>

          <ul className="mt-7 grid gap-2.5">
            {heroBullets.map((bullet) => (
              <li key={bullet} className="flex items-center gap-3 text-sm font-medium text-ink sm:text-base">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                {bullet}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#apply"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-btn transition hover:-translate-y-0.5 hover:bg-brandDeep"
            >
              Apply for Review <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#login"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-brand/25 bg-white/80 px-6 py-3 text-sm font-semibold text-brand transition hover:-translate-y-0.5 hover:bg-blue-50"
            >
              Partner Login
            </a>
          </div>

          <p className="mt-6 flex items-start gap-2 text-sm leading-6 text-slate-500">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
            Approved partners may receive operating limits and reserve requirements only after review and agreement.
          </p>
        </motion.div>

        {/* Right — Live Trust Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="relative lg:pl-2"
        >
          <LiveTrustPanel />
        </motion.div>
      </div>
    </section>
  );
}
