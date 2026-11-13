import type { ReactNode } from "react";

// The top block of every inner page (/courses, /vlogs, /community):
// small label, the page's one <h1>, a short intro. One component so all
// pages start the same way. `children` is a slot for extras later
// (e.g. filter buttons on /courses).
export function PageHeader({
  label,
  title,
  intro,
  children,
}: {
  label: string;
  title: string;
  intro: string;
  children?: ReactNode;
}) {
  return (
    // pt-32 / md:pt-40: the floating glass header (80px) sits on top of the
    // page, so the heading needs more space above it than a normal section.
    <div className="bg-surface-soft pt-32 pb-14 md:pt-40 md:pb-20">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6">
        {/* Same label pattern as the home sections (DESIGN.md) */}
        <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.12em] text-royal-deep uppercase">
          <span
            aria-hidden="true"
            className="size-3 rounded-full bg-royal ring-4 ring-royal/15"
          />
          {label}
        </p>
        {/* h1: each page has exactly one, the most important heading */}
        <h1 className="mt-4 max-w-3xl font-display text-balance text-4xl leading-tight font-bold tracking-tight text-ink sm:text-5xl md:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base text-ink-soft sm:text-lg">
          {intro}
        </p>
        {children}
      </div>
    </div>
  );
}
