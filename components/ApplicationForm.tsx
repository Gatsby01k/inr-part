"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, CheckCircle2, Clock3, LockKeyhole, ShieldCheck, X } from "lucide-react";
import { companyTypes, neverAsks, onboardingSteps, portalGoals, volumeRanges } from "@/lib/mock";

export default function ApplicationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [goals, setGoals] = useState<string[]>([]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  function toggleGoal(goal: string) {
    setGoals((prev) => (prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]));
  }

  return (
    <section id="apply" className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      {/* header */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-90px" }}
        transition={{ duration: 0.5 }}
        className="mx-auto mb-12 max-w-2xl text-center"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3.5 py-1.5 text-xs font-semibold text-amber-700">
          <span className="h-1.5 w-1.5 rounded-full bg-saffron" />
          Apply for Review · Private partner onboarding
        </span>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-[2.6rem] sm:leading-[1.1]">
          Submit your partner profile for review
        </h2>
        <p className="mt-5 text-base leading-8 text-muted sm:text-lg">
          Share your business profile, operating region and workflow details to start partner review. No bank, UPI, card
          or personal account details are collected here.
        </p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* ---------- LEFT: application form ---------- */}
        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="glass rounded-3xl p-6 sm:p-8 lg:col-span-2"
        >
          {submitted ? (
            <div className="flex min-h-[560px] flex-col items-center justify-center text-center">
              <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <span className="absolute inset-0 rounded-full bg-green-200/60 blur-md" />
                <CheckCircle2 className="relative h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold text-ink sm:text-3xl">Application received</h3>
              <p className="mt-3 max-w-md leading-7 text-muted">
                Your partner profile has been submitted for review. If there is a fit, operating profile, agreement terms
                and reserve requirements may be shared separately.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setGoals([]);
                }}
                className="mt-8 rounded-full border border-saffron/40 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-amber-50"
              >
                Submit another profile
              </button>
            </div>
          ) : (
            <div className="space-y-9">
              {/* Partner identity */}
              <fieldset>
                <GroupHeader n={1} title="Partner identity" />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Business / Partner name" />
                  <Field label="Contact person" />
                  <Field label="Work email" type="email" />
                  <SelectField label="Company type" options={companyTypes} />
                </div>
              </fieldset>

              {/* Operations profile */}
              <fieldset>
                <GroupHeader n={2} title="Operations profile" />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Operating region" />
                  <SelectField label="Estimated monthly settlement volume" options={volumeRanges} />
                  <TextField label="Current settlement workflow" wide />
                  <TextField label="Main operating pain point" wide />
                </div>
              </fieldset>

              {/* Portal goals */}
              <fieldset>
                <GroupHeader n={3} title="Portal goals" />
                <span className="mb-3 block text-sm font-medium text-ink">What do you want from the portal?</span>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                  {portalGoals.map((goal) => {
                    const active = goals.includes(goal);
                    return (
                      <button
                        key={goal}
                        type="button"
                        aria-pressed={active}
                        onClick={() => toggleGoal(goal)}
                        className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-sm transition ${
                          active
                            ? "border-saffron bg-amber-50 text-amber-900 shadow-sm"
                            : "border-slate-200 bg-white/70 text-slate-600 hover:border-saffron/50 hover:bg-amber-50/40"
                        }`}
                      >
                        <span
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition ${
                            active ? "border-saffron bg-saffron text-white" : "border-slate-300"
                          }`}
                        >
                          {active ? <Check className="h-3 w-3" strokeWidth={3} /> : null}
                        </span>
                        <span className="leading-tight">{goal}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="mt-4">
                  <TextField label="Message" wide />
                </div>
              </fieldset>

              {/* Consent + submit */}
              <fieldset>
                <GroupHeader n={4} title="Consent and submit" />
                <label className="flex gap-3 rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-sm leading-6 text-slate-700">
                  <input required type="checkbox" className="mt-0.5 h-4 w-4 accent-saffron" />
                  <span>
                    I understand that portal access is subject to partner review.
                  </span>
                </label>
                <button
                  type="submit"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-saffron to-saffronWarm px-6 py-3.5 text-sm font-bold text-white shadow-btnSaffron transition hover:-translate-y-0.5"
                >
                  Apply for Review <ArrowRight className="h-4 w-4" />
                </button>
              </fieldset>
            </div>
          )}
        </motion.form>

        {/* ---------- RIGHT: support cards ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="space-y-5"
        >
          {/* Partner Login */}
          <div id="login" className="glass rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                <LockKeyhole className="h-5 w-5" />
              </div>
              <span className="rounded-full bg-green-50 px-2.5 py-1 text-[0.68rem] font-semibold text-green-700">
                For approved partners
              </span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-ink">Partner Login</h3>
            <p className="mt-1.5 text-sm leading-6 text-muted">
              Portal access is available only after partner review and approval.
            </p>
            <div className="mt-5 space-y-3">
              <Field label="Email / Partner ID" compact />
              <Field label="Invite code" compact />
              <button
                type="button"
                className="w-full rounded-full border-2 border-saffron/30 bg-amber-50/60 px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-saffron/60 hover:bg-amber-50"
              >
                Enter Partner Portal
              </button>
              <p className="text-center text-xs text-muted">Approved partners only · Invite code required</p>
            </div>
          </div>

          {/* What happens next */}
          <div className="glass rounded-3xl p-6">
            <div className="mb-5 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                <Clock3 className="h-5 w-5" />
              </span>
              <h3 className="text-base font-semibold text-ink">What happens after you apply</h3>
            </div>
            <ol className="relative">
              {onboardingSteps.map((label, i) => {
                const done = i === 0;
                const active = i === 1;
                const last = i === onboardingSteps.length - 1;
                return (
                  <li key={label} className="relative flex gap-3 pb-5 last:pb-0">
                    {!last ? <span className="absolute left-[13px] top-7 h-[calc(100%-1rem)] w-px bg-slate-200" /> : null}
                    <span
                      className={`relative z-10 flex h-[27px] w-[27px] shrink-0 items-center justify-center rounded-full ${
                        done
                          ? "bg-green-100 text-green-600"
                          : active
                            ? "bg-amber-100 text-amber-700"
                            : "border border-slate-200 bg-white text-slate-300"
                      }`}
                    >
                      {done ? (
                        <Check className="h-4 w-4" strokeWidth={3} />
                      ) : active ? (
                        <span className="live-dot h-2 w-2 rounded-full bg-amber-500" />
                      ) : (
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                      )}
                    </span>
                    <div className="pt-0.5">
                      <p className={`text-sm ${done || active ? "font-medium text-ink" : "text-slate-500"}`}>{label}</p>
                      {done ? <span className="text-[0.7rem] font-medium text-green-600">Done</span> : null}
                      {active ? <span className="text-[0.7rem] font-medium text-amber-600">In progress</span> : null}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* What this form never asks for */}
          <div className="glass rounded-3xl p-6">
            <div className="mb-4 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-100 text-green-600">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <h3 className="text-base font-semibold text-ink">What this form never asks for</h3>
            </div>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {neverAsks.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                    <X className="h-2.5 w-2.5" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50/70 px-3.5 py-3 text-xs leading-5 text-amber-800">
              Reserve and operating limit terms, if applicable, are handled only after review and agreement.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- subcomponents ---------------- */

function GroupHeader({ n, title }: { n: number; title: string }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-100 text-xs font-bold text-amber-700">
        {n}
      </span>
      <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink">{title}</h4>
      <span className="h-px flex-1 bg-slate-200" />
    </div>
  );
}

function Field({ label, type = "text", compact = false }: { label: string; type?: string; compact?: boolean }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>
      <input
        type={type}
        placeholder={label}
        className={`w-full rounded-xl border border-slate-200 bg-white/80 px-4 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-saffron focus:ring-2 focus:ring-saffron/20 ${
          compact ? "py-2.5" : "py-3"
        }`}
      />
    </label>
  );
}

function SelectField({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>
      <select className="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-ink outline-none transition focus:border-saffron focus:ring-2 focus:ring-saffron/20">
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function TextField({ label, wide = false }: { label: string; wide?: boolean }) {
  return (
    <label className={`block ${wide ? "sm:col-span-2" : ""}`}>
      <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>
      <textarea
        rows={3}
        placeholder={label}
        className="w-full resize-none rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-saffron focus:ring-2 focus:ring-saffron/20"
      />
    </label>
  );
}
