"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { heroBullets } from "@/lib/mock";
import LiveTrustPanel from "./LiveTrustPanel";

export default function Hero() {
  return (
    <section id="top" className="relative px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pb-24 lg:pt-36">
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12">
        {/* Left */}
        <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-xs font-semibold tracking-wide text-amber-700">
            <ShieldCheck className="h-3.5 w-3.5" />
            Private Beta · Review Required
          </div>

          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.07] tracking-[-0.02em] text-ink sm:text-5xl lg:text-[3.35rem]">
            Work as an approved INR P2P partner with{" "}
            <span className="text-gradient">clear limits, workflow tracking and partner score.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            Apply for review, complete partner onboarding, manage your operating profile, track workflows, maintain proof
            history, view reconciliation status, and build your partner score inside one private portal.
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
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-bold text-white shadow-btn transition hover:-translate-y-0.5 hover:bg-brandDeep hover:shadow-lift"
            >
              Apply for Review <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#login"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-brand/30 bg-white/70 px-6 py-3.5 text-sm font-bold text-brand backdrop-blur transition hover:-translate-y-0.5 hover:bg-blue-50"
            >
              Partner Login
            </a>
          </div>

          <p className="mt-7 max-w-xl rounded-2xl border border-amber-200 bg-amber-50/70 px-4 py-3 text-sm leading-6 text-amber-800">
            Approved partners may be assigned an operating profile, limits and reserve requirements after review and
            agreement.
          </p>
        </motion.div>

        {/* Right — Live Trust Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 22 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.12 }}
          className="relative"
        >
          <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-blue-200/40 via-sky-200/30 to-transparent blur-2xl" />
          <LiveTrustPanel />
        </motion.div>
      </div>
    </section>
  );
}
