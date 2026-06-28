"use client";

import { motion } from "framer-motion";
import { benefits } from "@/lib/mock";
import { Section } from "./Section";

export default function WhatYouGet() {
  return (
    <Section
      id="benefits"
      eyebrow="What approved partners get"
      title="Everything an approved partner needs in one private portal"
      copy="No scattered chats or manual tracking. Approved partners operate from a single, structured workspace."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map(({ title, copy, icon: Icon }, index) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.45, delay: index * 0.06 }}
            className="glass card-hover flex flex-col rounded-3xl p-6"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brandDeep text-white shadow-btn">
              <Icon className="h-6 w-6" strokeWidth={2} />
            </div>
            <h3 className="text-lg font-semibold text-ink">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-muted">{copy}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
