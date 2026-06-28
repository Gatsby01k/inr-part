"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, LockKeyhole, Sparkles } from "lucide-react";
import { heroStats, productHighlights } from "@/lib/mock";

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden px-4 pb-20 pt-32 sm:px-6 lg:px-8 lg:pt-40">
      <div className="absolute inset-0 bg-radial-cyan" />
      <div className="absolute inset-0 bg-radial-emerald" />
      <div className="grid-bg absolute inset-0" />
      <div className="hero-orb absolute left-1/2 top-20 h-96 w-96 -translate-x-1/2 rounded-full opacity-70" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.02fr_.98fr]">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: "easeOut" }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100">
            <LockKeyhole className="h-4 w-4" />
            Private network. Review required. Portal access only for approved partners.
          </div>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.05em] text-white sm:text-7xl lg:text-8xl">
            Private INR P2P <span className="text-gradient">Partner Portal</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            A closed-access portal for approved INR settlement operators to manage operating profile, workflow status, proof history, reconciliation visibility and partner score.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#apply" className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 py-3 text-sm font-bold text-slate-950 shadow-glow transition hover:bg-cyan-200">
              Apply for Review <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#login" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:border-emerald-300/40 hover:bg-white/10">
              Partner Login
            </a>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {productHighlights.map(({ label, icon: Icon }) => (
              <div key={label} className="glass rounded-2xl px-4 py-3 text-sm text-slate-300">
                <Icon className="mb-2 h-4 w-4 text-emerald-300" />
                {label}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.94, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.85, ease: "easeOut", delay: 0.12 }} className="relative">
          <div className="absolute -inset-8 rounded-[3rem] bg-cyan-300/10 blur-3xl" />
          <div className="glass scan-line relative overflow-hidden rounded-[2rem] p-4 sm:p-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-cyan-200/80">
                  <Sparkles className="h-4 w-4" /> Demo dashboard
                </div>
                <p className="mt-1 text-sm text-slate-400">Sample data</p>
              </div>
              <span className="rounded-full border border-emerald-300/25 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-200">Private Beta</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {heroStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + index * 0.04 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.045] p-4"
                >
                  <p className="text-xs text-slate-400">{stat.label}</p>
                  <p className="mt-2 text-xl font-semibold text-white">{stat.value}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-5 rounded-3xl border border-cyan-300/20 bg-slate-950/70 p-4">
              <div className="mb-3 flex items-center justify-between text-sm">
                <span className="text-slate-300">Workflow health</span>
                <span className="text-cyan-200">98.4% matched</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                <motion.div initial={{ width: 0 }} animate={{ width: "98.4%" }} transition={{ duration: 1.3, delay: 0.45 }} className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-emerald-300 to-indigo-300" />
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-emerald-200">
                <CheckCircle2 className="h-4 w-4" /> Partner Status: Verified
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
