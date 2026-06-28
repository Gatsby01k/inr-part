import { ArrowRight, ShieldCheck } from "lucide-react";
import { footerColumns } from "@/lib/mock";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-slate-950 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="glass mb-12 grid gap-6 rounded-[2rem] p-7 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-200">Final CTA</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-5xl">Ready to join the private INR partner network?</h2>
            <p className="mt-4 max-w-2xl leading-7 text-slate-300">Apply for review and get access to structured workflow tracking, proof history, reconciliation visibility and partner score.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <a href="#apply" className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 py-3 text-sm font-bold text-slate-950 shadow-glow hover:bg-cyan-200">
              Apply for Review <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#login" className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-bold text-white hover:bg-white/5">
              Partner Login
            </a>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.25fr_2fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-300/10">
                <ShieldCheck className="h-5 w-5 text-cyan-200" />
              </span>
              <span className="font-semibold text-white">INR P2P Partner Portal</span>
            </div>
            <p className="mt-5 max-w-md leading-7 text-slate-400">INR P2P Partner Portal is a private partner operations portal. Access is subject to review.</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="font-semibold text-white">{column.title}</h3>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a href="#top" className="text-sm text-slate-400 transition hover:text-cyan-200">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-slate-500">
          © 2026 INR P2P Partner Portal. Private beta partner website.
        </div>
      </div>
    </footer>
  );
}
