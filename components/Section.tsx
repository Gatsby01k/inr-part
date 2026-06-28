import type { ReactNode } from "react";

export function Section({ id, eyebrow, title, copy, children }: { id?: string; eyebrow?: string; title: string; copy?: string; children: ReactNode }) {
  return (
    <section id={id} className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        {eyebrow ? <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300/80">{eyebrow}</p> : null}
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">{title}</h2>
        {copy ? <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">{copy}</p> : null}
      </div>
      {children}
    </section>
  );
}
