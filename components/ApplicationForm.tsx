"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2, LockKeyhole } from "lucide-react";
import { Section } from "./Section";

const companyTypes = ["OTC desk", "Payment partner", "Liquidity business", "Trading entity", "Settlement operator", "Other"];
const volumes = ["Below ₹10L", "₹10L–₹50L", "₹50L–₹2Cr", "₹2Cr+"];
const portalGoals = ["Workflow tracking", "Proof history", "Reconciliation visibility", "Partner score", "Reporting", "Private network access"];

export default function ApplicationForm() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <Section id="apply" eyebrow="Apply for review" title="Submit your partner profile" copy="No bank account details, personal account details, UPI details, card details or deposit amounts are collected on this form.">
      <div className="grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
        <form onSubmit={onSubmit} className="glass rounded-[2rem] p-5 sm:p-7">
          {submitted ? (
            <div className="flex min-h-[520px] flex-col items-center justify-center text-center">
              <CheckCircle2 className="mb-5 h-14 w-14 text-emerald-300" />
              <h3 className="text-3xl font-semibold text-white">Application received.</h3>
              <p className="mt-4 max-w-md leading-7 text-slate-300">Your partner profile has been submitted for review.</p>
              <button type="button" onClick={() => setSubmitted(false)} className="mt-8 rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/5">
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
              <Select label="Estimated monthly settlement volume range" options={volumes} />
              <TextArea label="Current settlement workflow" />
              <TextArea label="Main operating pain point" />
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-300">What do you want from the portal?</label>
                <div className="grid gap-2 sm:grid-cols-3">
                  {portalGoals.map((goal) => (
                    <label key={goal} className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.035] p-3 text-sm text-slate-300">
                      <input type="checkbox" className="accent-cyan-300" /> {goal}
                    </label>
                  ))}
                </div>
              </div>
              <TextArea label="Message" wide />
              <label className="flex gap-3 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4 text-sm leading-6 text-cyan-50 sm:col-span-2">
                <input required type="checkbox" className="mt-1 accent-cyan-300" />
                I understand that portal access is subject to partner review.
              </label>
              <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-300 px-6 py-3 text-sm font-bold text-slate-950 shadow-glow hover:bg-cyan-200 sm:col-span-2">
                Apply for Review <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </form>

        <div id="login" className="glass rounded-[2rem] p-6 sm:p-7">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-300/25 bg-emerald-300/10">
            <LockKeyhole className="h-6 w-6 text-emerald-200" />
          </div>
          <h3 className="text-3xl font-semibold text-white">Partner Login</h3>
          <p className="mt-3 leading-7 text-slate-400">Portal access is available only for approved partners.</p>
          <div className="mt-7 space-y-4">
            <Input label="Email / Partner ID" />
            <Input label="Invite code" />
            <button type="button" className="w-full rounded-full border border-emerald-300/25 bg-emerald-300/10 px-6 py-3 text-sm font-bold text-emerald-100 transition hover:bg-emerald-300/15">
              Enter Partner Portal
            </button>
          </div>
          <div className="mt-8 rounded-3xl border border-white/10 bg-slate-950/45 p-5">
            <p className="text-sm font-semibold text-white">Private beta access</p>
            <p className="mt-2 text-sm leading-6 text-slate-400">Invite code login is a frontend-only preview. No auth logic or backend connection is included.</p>
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
      <input type={type} className="w-full rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/50" placeholder={label} />
    </label>
  );
}

function Select({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-300">{label}</span>
      <select className="w-full rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/50">
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  );
}

function TextArea({ label, wide = false }: { label: string; wide?: boolean }) {
  return (
    <label className={`block ${wide ? "sm:col-span-2" : ""}`}>
      <span className="mb-2 block text-sm font-medium text-slate-300">{label}</span>
      <textarea rows={4} className="w-full resize-none rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/50" placeholder={label} />
    </label>
  );
}
