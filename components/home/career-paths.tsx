import { Lock } from "lucide-react";
import {
  CAREER_PATHS,
  type CareerPath,
} from "@/components/home/career-paths-data";
import { RevealOnScroll } from "@/components/site/reveal-on-scroll";

// Server Component: the markup is plain HTML from the server. Only the small
// <RevealOnScroll> wrapper sends JavaScript (for the scroll animation).
// The lock shake on hover is pure CSS (globals.css), so it needs no JS either.
// id="paths" is the target of the "Career paths" nav link and the hero's
// "Explore career paths" button.
export function CareerPaths() {
  return (
    <section
      id="paths"
      aria-labelledby="paths-title"
      // scroll-mt-28: when a link jumps here, stop 112px below the top so the
      // floating glass header does not cover the heading.
      className="scroll-mt-28 bg-white py-20 md:py-28"
    >
      <RevealOnScroll className="mx-auto w-full max-w-[1200px] px-4 sm:px-6">
        <div data-reveal>
          {/* Section label (DESIGN.md: node + number + small uppercase label) */}
          <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.12em] text-royal-deep uppercase">
            <span
              aria-hidden="true"
              className="size-3 rounded-full bg-royal ring-4 ring-royal/15"
            />
            <span aria-hidden="true">01</span>
            Career paths
          </p>

          <div className="mt-4 max-w-2xl">
            <h2
              id="paths-title"
              className="font-display text-3xl leading-tight font-bold tracking-tight text-ink sm:text-4xl md:text-5xl"
            >
              Choose the path that fits your future.
            </h2>
            <p className="mt-4 text-base text-ink-soft sm:text-lg">
              Each path is a free, step-by-step roadmap: start, learn, practice,
              meet a mentor and move into your career.
            </p>
          </div>
        </div>

        {/* A list, so screen readers announce "list, 6 items" */}
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CAREER_PATHS.map((path) => (
            <li key={path.slug} data-reveal>
              <PathCard path={path} />
            </li>
          ))}
        </ul>
      </RevealOnScroll>
    </section>
  );
}

// The glass card shell. Open and locked cards share it, so both look like
// the same family of blocks.
function PathCard({ path }: { path: CareerPath }) {
  return (
    // Glass card (tint: --glass-tint, a soft aqua):
    // - bg-glass-tint/80: the aqua glass on the white section
    // - border-white/80 + white inner top shadow: the bright edges where
    //   light catches the glass
    // - isolate: the reflection layers (-z-10) stay inside the card, above
    //   its background but under the text
    <article className="relative isolate flex h-full flex-col overflow-hidden rounded-2xl border border-white/80 bg-glass-tint/80 shadow-xl inset-shadow-sm shadow-ink/10 inset-shadow-white/90">
      {/* Reflection 1: a soft shine from the top-left corner, like light
          falling on a glass panel */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-br from-white/80 via-white/0 via-40% to-transparent"
      />
      {/* Reflection 2: a diagonal light band across the glass
          (bg-linear-115 = a gradient drawn at 115 degrees) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-linear-115 from-transparent from-50% via-white/60 via-62% to-transparent to-75%"
      />
      {/* Reflection 3: a thin bright line along the top edge */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 top-0 -z-10 h-px bg-linear-to-r from-transparent via-white to-transparent"
      />

      {path.locked ? (
        <>
          {/* The real content, blurred so it is a "sneak peek" only.
              aria-hidden + inert: screen readers and keyboard skip the
              blurred copy; the overlay below says what this card is. */}
          <div
            aria-hidden="true"
            inert
            className="flex h-full flex-col blur-[6px] select-none"
          >
            <CardContent path={path} />
          </div>

          {/* Lock overlay, centered on top of the blurred content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-white/25 p-6 text-center">
            {/* The heading for screen readers (the visible one is blurred) */}
            <h3 className="sr-only">{path.title} (locked)</h3>
            {/* lock-shake (globals.css): the icon shakes when the pointer
                is on it */}
            <span className="lock-shake grid size-16 place-items-center rounded-full border border-white/80 bg-white/70 text-ink shadow-lg shadow-ink/10">
              <Lock aria-hidden="true" className="size-7" />
            </span>
            <p className="max-w-[16rem] font-display text-lg font-semibold text-ink">
              We will unlock this career path later.
            </p>
          </div>
        </>
      ) : (
        <CardContent path={path} />
      )}
    </article>
  );
}

// What is inside a card: icon, badge, title, sentence, 3 skills, status.
function CardContent({
  path: { title, description, skills, icon: Icon },
}: {
  path: CareerPath;
}) {
  return (
    <div className="flex h-full flex-col p-6">
      <div className="flex items-start justify-between gap-4">
        {/* Decorative icon: the title already says what it is */}
        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-white/55 text-royal ring-1 ring-white/80">
          <Icon aria-hidden="true" className="size-6" />
        </span>
        {/* green on green-soft = 4.6:1 */}
        <span className="rounded-full bg-green-soft px-3 py-1 text-xs font-semibold text-green">
          Beginner friendly
        </span>
      </div>

      <h3 className="mt-5 font-display text-xl font-semibold text-ink">
        {title}
      </h3>
      {/* ink-soft on the aqua = 5.5:1 (AA needs 4.5) */}
      <p className="mt-2 text-ink-soft">{description}</p>

      <ul
        aria-label={`Skills in ${title}`}
        className="mt-5 flex flex-wrap gap-2"
      >
        {skills.map((skill) => (
          <li
            key={skill}
            className="rounded-full border border-white/80 bg-white/60 px-3 py-1 text-sm text-ink"
          >
            {skill}
          </li>
        ))}
      </ul>

      {/* Honest status: the roadmap pages are not built yet, so the card is
          not a link (a link would lead to a 404 page). */}
      <p className="mt-auto pt-6 text-sm font-medium text-ink-soft">
        Roadmap coming soon
      </p>
    </div>
  );
}
