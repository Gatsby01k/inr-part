import { ShieldCheck } from "lucide-react";
import { footerColumns } from "@/lib/mock";

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-ink px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand/30 bg-brand/10">
                <ShieldCheck className="h-5 w-5 text-brandSoft" />
              </span>
              <span className="font-semibold text-white">INR P2P Partner Portal</span>
            </div>
            <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">
              A private partner portal for approved INR P2P settlement operators. Access is review-based, and any
              operating reserve or limit is assigned only after review and agreement. This site is a frontend demo using
              sample data.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-semibold text-white">{column.title}</h3>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a href="#top" className="text-sm text-slate-400 transition hover:text-brandSoft">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 INR P2P Partner Portal · Private beta partner website.</span>
          <span>Review required · Approved partners only · Sample data</span>
        </div>
      </div>
    </footer>
  );
}
