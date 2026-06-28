"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2, LockKeyhole, ShieldCheck } from "lucide-react";
import { companyTypes, portalGoals, volumeRanges } from "@/lib/mock";
import { Section } from "./Section";

export default function ApplicationForm() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <Section
      id="apply"
      eyebrow="Apply for review"
      title="Submit your partner profile for review"
      copy="No bank, UPI, card or personal account details — and no deposit — are collected here. This form only starts your partner review."
    >
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Application form */}
        <form onSubmit={onSubmit} className="glass rounded-[1.75rem] p-5 sm:p-7">
          {submitted ? (
            <div className="flex min-h-[520px] flex-col items-center justify-center text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-brand/30 bg-brand/10">
                <CheckCircle2 className="h-9 w-9 text-brandSoft" />
              </div>
              <h3 className="text-2xl font-semibold text-white sm:text-3xl">Application received.</h3>
              <p className="mt-4 max-w-md leading-7 text-slate-300">
                Your partner profile has been submitted for review.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-8 rounded-full border border-line px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
              >
                Submit another profile
              </button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Business / Partner name" />
              <Input label="Contact person" />
              <Input label="Work email" type="email" />
              <Select label="Company type" options={companyTypes} />
              <Input label="Operating region" />
              <Select label="Estimated monthly settlement volume range" options={volumeRanges} />
              <TextArea label="Current settlement workflow" />
              <TextArea label="Main operating pain point" />
              <div className="sm:col-span-2">
                <span className="mb-2 block text-sm font-medium text-slate-300">What do you want from the portal?</span>
                <div className="grid gap-2 sm:grid-cols-3">
                  {portalGoals.map((goal) => (
                    <label
                      key={goal}
                      className="flex cursor-pointer items-center gap-2 rounded-xl border border-line bg-white/[0.02] p-3 text-sm text-slate-300 transition hover:border-brand/30"
                    >
                      <input type="checkbox" className="accent-brand" /> {goal}
                    </label>
                  ))}
                </div>
              </div>
              <TextArea label="Message" wide />
              <label className="flex gap-3 rounded-xl border border-brand/25 bg-brand/[0.07] p-4 text-sm leading-6 text-slate-100 sm:col-span-2">
                <input required type="checkbox" className="mt-1 accent-brand" />
                I understand that portal access is subject to partner review.
              </label>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-ink shadow-glow transition hover:bg-brandSoft sm:col-span-2"
              >
                Apply for Review <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </form>

        {/* Partner login + assurances */}
        <div className="flex flex-col gap-5">
          <div id="login" className="glass rounded-[1.75rem] p-6 sm:p-7">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-electric/30 bg-electric/10">
              <LockKeyhole className="h-6 w-6 text-electricSoft" />
            </div>
            <h3 className="text-2xl font-semibold text-white">Partner Login</h3>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              Portal access is available only for approved partners.
            </p>
            <div className="mt-6 space-y-4">
              <Input label="Email / Partner ID" />
              <Input label="Invite code" />
              <button
                type="button"
                className="w-full rounded-full border border-electric/30 bg-electric/10 px-6 py-3 text-sm font-bold text-electricSoft transition hover:bg-electric/15"
              >
                Enter Partner Portal
              </button>
            </div>
            <p className="mt-5 text-xs leading-5 text-slate-500">
              Frontend-only preview. No authentication or backend connection is included.
            </p>
          </div>

          <div className="glass rounded-[1.75rem] border-amberSoft/20 p-6">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-amberSoft">
              <ShieldCheck className="h-5 w-5" /> What this form never asks for
            </div>
            <p className="text-sm leading-6 text-slate-400">
              No bank account details, no personal account or UPI details, no card details, no deposit amount and no
              payment information. Reserve and limit terms are handled only after review and agreement.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Input({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-300">{label}</span>
      <input
        type={type}
        className="w-full rounded-xl border border-line bg-slatecard/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-brand/50"
        placeholder={label}
      />
    </label>
  );
}

function Select({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-300">{label}</span>
      <select className="w-full rounded-xl border border-line bg-slatecard/70 px-4 py-3 text-sm text-white outline-none transition focus:border-brand/50">
        {options.map((option) => (
          <option key={option} className="bg-panel">
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextArea({ label, wide = false }: { label: string; wide?: boolean }) {
  return (
    <label className={`block ${wide ? "sm:col-span-2" : ""}`}>
      <span className="mb-2 block text-sm font-medium text-slate-300">{label}</span>
      <textarea
        rows={4}
        className="w-full resize-none rounded-xl border border-line bg-slatecard/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-brand/50"
        placeholder={label}
      />
    </label>
  );
}
