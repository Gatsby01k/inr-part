"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, LockKeyhole } from "lucide-react";
import { heroBullets, heroStats, type HeroStat } from "@/lib/mock";

const toneText: Record<NonNullable<HeroStat["tone"]>, string> = {
  brand: "text-brandSoft",
  electric: "text-electricSoft",
  amber: "text-amberSoft",
  neutral: "text-white",
};

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pb-28 lg:pt-40">
      <div className="absolute inset-0 bg-radial-emerald" />
      <div className="absolute inset-0 bg-radial-electric" />
      <div className="grid-bg absolute inset-0" />
      <div className="hero-orb absolute left-1/2 top-10 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full opacity-80" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
        {/* Left */}
        <motion.div initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amberSoft/30 bg-amberSoft/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-amberSoft">
            <LockKeyhole className="h-3.5 w-3.5" />
            Private Beta · Review Required
          </div>

          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.08] tracking-[-0.02em] text-white sm:text-5xl lg:text-[3.4rem]">
            Work as an approved INR P2P partner with{" "}
            <span className="text-gradient">clear limits, workflow tracking and partner score.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300/90 sm:text-lg">
            Apply for review, complete partner onboarding, manage your operating profile, track workflows, maintain proof
            history, view reconciliation status, and build your partner score inside one private portal.
          </p>

          <ul className="mt-7 grid gap-2.5">
            {heroBullets.map((bullet) => (
              <li key={bullet} className="flex items-center gap-3 text-sm text-slate-200 sm:text-base">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-brandSoft" />
                {bullet}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#apply"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-ink shadow-glow transition hover:bg-brandSoft"
            >
              Apply for Review <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#login"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-white/[0.03] px-6 py-3 text-sm font-bold text-white transition hover:border-electric/50 hover:bg-white/[0.06]"
            >
              Partner Login
            </a>
          </div>

          <p className="mt-7 max-w-xl rounded-2xl border border-amberSoft/20 bg-amberSoft/[0.06] px-4 py-3 text-sm leading-6 text-amber-100/80">
            Approved partners may be assigned an operating profile, limits and reserve requirements after review and
            agreement.
          </p>
        </motion.div>

        {/* Right — dashboard preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 22 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.12 }}
          className="relative"
        >
          <div className="absolute -inset-6 rounded-[2.5rem] bg-brand/[0.07] blur-3xl" />
          <div className="glass relative overflow-hidden rounded-[1.75rem] p-4 sm:p-5">
            {/* header row */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="live-dot h-2 w-2 rounded-full bg-brand" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Partner Dashboard</span>
              </div>
              <span className="rounded-full border border-brand/30 bg-brand/10 px-2.5 py-1 text-[0.7rem] font-semibold text-brandSoft">
                Private Beta
              </span>
            </div>

            {/* status banner */}
            <div className="mb-4 flex items-center justify-between rounded-2xl border border-line bg-slatecard/80 px-4 py-3">
              <div>
                <p className="text-[0.7rem] uppercase tracking-wide text-slate-500">Partner Status</p>
                <p className="mt-0.5 text-sm font-semibold text-brandSoft">Verified · Under Review cleared</p>
              </div>
              <CheckCircle2 className="h-6 w-6 text-brandSoft" />
            </div>

            {/* metric grid */}
            <div className="grid grid-cols-2 gap-2.5">
              {heroStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.035 }}
                  className="rounded-xl border border-line bg-white/[0.02] px-3 py-2.5"
                >
                  <p className="text-[0.68rem] leading-tight text-slate-500">{stat.label}</p>
                  <p className={`mt-1 text-sm font-semibold ${toneText[stat.tone ?? "neutral"]}`}>{stat.value}</p>
                </motion.div>
              ))}
            </div>

            {/* recon bar */}
            <div className="mt-4 rounded-2xl border border-electric/20 bg-slatecard/70 p-4">
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="text-slate-300">Reconciliation match</span>
                <span className="font-semibold text-electricSoft">98.4%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "98.4%" }}
                  transition={{ duration: 1.2, delay: 0.5 }}
                  className="h-full rounded-full bg-gradient-to-r from-brand via-teal to-electric"
                />
              </div>
            </div>

            <p className="mt-3 text-center text-[0.7rem] text-slate-500">Demo dashboard · Sample data</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
