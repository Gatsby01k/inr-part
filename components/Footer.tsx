import { ShieldCheck } from "lucide-react";
import { footerColumns } from "@/lib/mock";

export default function Footer() {
  return (
    <footer className="relative mt-4 px-4 pb-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/60 bg-white/60 p-8 backdrop-blur-xl sm:p-10">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brandDeep text-white shadow-btn">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <span className="font-semibold text-ink">INR P2P Partner Portal</span>
            </div>
            <p className="mt-5 max-w-md text-sm leading-7 text-muted">
              A private partner portal for approved INR P2P settlement operators. Access is review-based, and any
              operating reserve or limit is assigned only after review and agreement. This site is a frontend demo using
              sample data.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-semibold text-ink">{column.title}</h3>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a href="#top" className="text-sm text-muted transition hover:text-brand">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-slate-200 pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 INR P2P Partner Portal · Private beta partner website.</span>
          <span>Review required · Approved partners only · Sample data</span>
        </div>
      </div>
    </footer>
  );
}
