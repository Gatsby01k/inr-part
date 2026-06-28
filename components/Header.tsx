"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShieldCheck, X } from "lucide-react";
import { navLinks } from "@/lib/mock";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -22, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-ink/80 backdrop-blur-xl"
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
        <a href="#top" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-brand/30 bg-brand/10 shadow-glow lg:h-10 lg:w-10">
            <ShieldCheck className="h-5 w-5 text-brandSoft" />
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold text-white sm:text-base">INR P2P Partner Portal</span>
            <span className="hidden text-xs text-slate-400 sm:block">Private settlement partner network</span>
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
          <a
            href="#login"
            className="rounded-full border border-line px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-brand/40 hover:bg-white/5"
          >
            Partner Login
          </a>
          <a
            href="#apply"
            className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-ink shadow-glow transition hover:bg-brandSoft"
          >
            Apply for Review
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="rounded-xl border border-line p-2 text-slate-200 sm:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-line bg-ink/95 sm:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-2 flex gap-2">
                <a
                  href="#login"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-full border border-line px-4 py-2.5 text-center text-sm font-semibold text-slate-200"
                >
                  Partner Login
                </a>
                <a
                  href="#apply"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-full bg-brand px-4 py-2.5 text-center text-sm font-semibold text-ink"
                >
                  Apply for Review
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
