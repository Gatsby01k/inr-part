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
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto mt-3 max-w-7xl px-3 sm:px-5 lg:px-6">
        <nav className="glass flex h-16 items-center justify-between rounded-2xl px-3 sm:px-5">
          <a href="#top" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brandDeep shadow-btn">
              <ShieldCheck className="h-5 w-5 text-white" />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-semibold text-ink sm:text-[0.95rem]">INR P2P Partner Portal</span>
              <span className="hidden text-xs text-muted sm:block">Private settlement partner network</span>
            </span>
          </a>

          <div className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-sm font-medium text-muted transition hover:text-brand">
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-2.5 sm:flex">
            <a
              href="#login"
              className="rounded-full border border-brand/30 bg-white/70 px-4 py-2 text-sm font-semibold text-brand transition hover:bg-blue-50"
            >
              Partner Login
            </a>
            <a
              href="#apply"
              className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white shadow-btn transition hover:bg-brandDeep"
            >
              Apply for Review
            </a>
          </div>

          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="rounded-xl border border-slate-200 bg-white/70 p-2 text-ink sm:hidden"
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
              className="glass mt-2 overflow-hidden rounded-2xl sm:hidden"
            >
              <div className="flex flex-col gap-1 p-3">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted transition hover:bg-blue-50 hover:text-brand"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="mt-2 flex gap-2">
                  <a
                    href="#login"
                    onClick={() => setOpen(false)}
                    className="flex-1 rounded-full border border-brand/30 px-4 py-2.5 text-center text-sm font-semibold text-brand"
                  >
                    Partner Login
                  </a>
                  <a
                    href="#apply"
                    onClick={() => setOpen(false)}
                    className="flex-1 rounded-full bg-brand px-4 py-2.5 text-center text-sm font-semibold text-white"
                  >
                    Apply for Review
                  </a>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
