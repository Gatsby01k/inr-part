"use client";

import { motion } from "framer-motion";
import { Menu, ShieldCheck } from "lucide-react";
import { navLinks } from "@/lib/mock";

export default function Header() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-2xl"
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-300/10 shadow-glow">
            <ShieldCheck className="h-5 w-5 text-cyan-200" />
          </span>
          <span>
            <span className="block text-sm font-semibold text-white sm:text-base">INR P2P Partner Portal</span>
            <span className="hidden text-xs text-slate-400 sm:block">Private partner network</span>
          </span>
        </a>
        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-slate-300 transition hover:text-white">
              {link.label}
            </a>
          ))}
        </div>
        <div className="hidden items-center gap-3 sm:flex">
          <a href="#login" className="rounded-full border border-white/12 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-300/40 hover:bg-white/5">
            Partner Login
          </a>
          <a href="#apply" className="rounded-full bg-cyan-300 px-4 py-2 text-sm font-semibold text-slate-950 shadow-glow transition hover:bg-cyan-200">
            Apply for Review
          </a>
        </div>
        <button aria-label="Open menu" className="rounded-2xl border border-white/10 p-2 text-slate-200 lg:hidden">
          <Menu className="h-5 w-5" />
        </button>
      </nav>
    </motion.header>
  );
}
