"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { faq } from "@/lib/mock";
import { Section } from "./Section";

export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <Section id="faq" eyebrow="FAQ" title="Questions about partner access">
      <div className="mx-auto max-w-3xl space-y-3">
        {faq.map((item, index) => {
          const isOpen = open === index;
          return (
            <div
              key={item.q}
              className={`glass overflow-hidden rounded-2xl transition ${isOpen ? "ring-1 ring-brand/20" : ""}`}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : index)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
              >
                <span className="text-sm font-semibold text-ink sm:text-base">{item.q}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-brand transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p className="px-5 pb-5 text-sm leading-7 text-muted">{item.a}</p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
