"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

export function Section({
  id,
  eyebrow,
  title,
  copy,
  align = "center",
  children,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  copy?: string;
  align?: "center" | "left";
  children: ReactNode;
}) {
  const aligned = align === "center";
  return (
    <section id={id} className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-90px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`mb-12 max-w-3xl ${aligned ? "mx-auto text-center" : "text-left"}`}
      >
        {eyebrow ? (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-brand">{eyebrow}</p>
        ) : null}
        <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-[2.7rem] sm:leading-[1.1]">{title}</h2>
        {copy ? <p className="mt-5 text-base leading-8 text-muted sm:text-lg">{copy}</p> : null}
      </motion.div>
      {children}
    </section>
  );
}
