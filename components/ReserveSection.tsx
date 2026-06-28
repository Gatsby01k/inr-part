"use client";

import { motion } from "framer-motion";
import { Wallet } from "lucide-react";
import { reserveCards } from "@/lib/mock";
import { Section } from "./Section";

export default function ReserveSection() {
  return (
    <Section
      id="reserve"
      eyebrow="Operating reserve"
      title="Operating reserve is assigned only after partner review"
      copy="INR P2P Partner Portal does not collect deposits on this public website. Approved partners may receive reserve requirements, operating limits and agreement terms after review."
    >
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.5 }}
          className="glass flex flex-col justify-center rounded-2xl border-amberSoft/20 p-7"
        >
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-amberSoft/30 bg-amberSoft/10">
            <Wallet className="h-6 w-6 text-amberSoft" />
          </div>
          <h3 className="text-xl font-semibold text-white">Security reserve, handled the right way</h3>
          <p className="mt-4 leading-7 text-slate-300/90">
            A reserve (sometimes called a security reserve) gives the operating relationship a structured safety layer.
            But it is part of a written partner agreement — defined inside your operating profile after you are
            reviewed and approved. It is never requested, unlocked or collected on this website.
          </p>
          <div className="mt-6 rounded-xl border border-line bg-slatecard/70 px-4 py-3 text-sm text-amber-100/80">
            Reserve Status (demo): <span className="font-semibold text-amberSoft">Agreement-based</span>
          </div>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          {reserveCards.map(({ title, copy, icon: Icon }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="glass card-hover flex flex-col rounded-2xl p-6"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-white/[0.03]">
                <Icon className="h-5 w-5 text-brandSoft" />
              </div>
              <h4 className="text-base font-semibold text-white">{title}</h4>
              <p className="mt-2 text-sm leading-6 text-slate-400">{copy}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
