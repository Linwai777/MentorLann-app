import { ExternalLink, Info } from "lucide-react";
import { GlassCard } from "@/components/site/glass-card";
import type { Course } from "@/components/courses/courses-data";

// One free course as a glass card. The button opens the provider's site in a
// new tab, so the learner keeps MentorLann open as their "map".
export function CourseCard({ course }: { course: Course }) {
  const { order, title, provider, url, description, level, format, note } =
    course;

  return (
    <GlassCard className="flex h-full flex-col p-5">
      <div className="flex items-center justify-between gap-3">
        {/* aria-hidden: the <ol> around the cards already reads "1 of 4" */}
        <span
          aria-hidden="true"
          className="rounded-full bg-royal px-3 py-1 text-xs font-semibold text-white"
        >
          Step {order}
        </span>
        <span className="rounded-full border border-white/80 bg-white/60 px-3 py-1 text-xs font-medium text-ink">
          {format}
        </span>
      </div>

      {/* Provider first, small: learners want to know "who teaches this" */}
      <p className="mt-5 text-xs font-semibold tracking-[0.08em] text-royal-deep uppercase">
        {provider}
      </p>
      <h3 className="mt-1 font-display text-lg leading-snug font-semibold text-ink">
        {title}
      </h3>
      <p className="mt-2 text-ink-soft">{description}</p>

      {/* Honest extra info (e.g. "the app itself is paid") */}
      {note && (
        <p className="mt-3 flex gap-2 text-sm text-ink">
          <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {note}
        </p>
      )}

      {/* mt-auto pushes this row to the bottom, so buttons line up */}
      <div className="mt-auto flex items-center justify-between gap-3 pt-5">
        <span className="text-sm font-medium text-ink-soft">{level}</span>
        <a
          href={url}
          target="_blank"
          // noopener noreferrer: the new tab cannot control this page
          // (security) and is not told where the visitor came from.
          rel="noopener noreferrer"
          className="group inline-flex min-h-11 items-center gap-2 rounded-lg bg-white/70 px-4 text-sm font-semibold text-royal-deep ring-1 ring-white/80 transition-colors duration-200 hover:bg-white"
        >
          Open course
          {/* Screen readers hear where the link goes and that it opens
              a new tab; sighted users see the external-link icon. */}
          <span className="sr-only">
            {`: ${title} on ${provider} (opens in a new tab)`}
          </span>
          <ExternalLink aria-hidden="true" className="size-4" />
        </a>
      </div>
    </GlassCard>
  );
}
