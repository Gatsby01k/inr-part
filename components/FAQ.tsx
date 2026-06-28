"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faq } from "@/lib/mock";
import { Section } from "./Section";

export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <Section id="faq" eyebrow="FAQ" title="Private partner network questions">
      <div className="mx-auto max-w-4xl space-y-3">
        {faq.map((item, index) => (
          <div key={item.q} className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035]">
            <button type="button" onClick={() => setOpen(open === index ? -1 : index)} className="flex w-full items-center justify-between gap-4 p-5 text-left">
              <span className="font-semibold text-white">{item.q}</span>
              <ChevronDown className={`h-5 w-5 shrink-0 text-cyan-200 transition ${open === index ? "rotate-180" : ""}`} />
            </button>
            {open === index ? <p className="px-5 pb-5 leading-7 text-slate-400">{item.a}</p> : null}
          </div>
        ))}
      </div>
    </Section>
  );
}
