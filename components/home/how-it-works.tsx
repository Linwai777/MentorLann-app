import Link from "next/link";
import {
  ArrowRight,
  Compass,
  Flag,
  MessagesSquare,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import { RevealOnScroll } from "@/components/site/reveal-on-scroll";
import { GlassCard } from "@/components/site/glass-card";
import { RouteDraw } from "@/components/home/route-draw";

// The same 5 steps as the hero's 3D route (Start, Learn, Practice, Mentor,
// Career), so the page tells one story. Used only here, so kept in this file.
const STEPS: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Start your path",
    description:
      "Choose a career path that fits you and open its free roadmap.",
    icon: Compass,
  },
  {
    title: "Learn with others",
    description: "Study the lessons, ask questions and join study groups.",
    icon: Users,
  },
  {
    title: "Practice and see your progress",
    description:
      "Build small projects and watch your skills grow step by step.",
    icon: TrendingUp,
  },
  {
    title: "Meet your mentors",
    description:
      "Get advice and feedback from people already working in the field.",
    icon: MessagesSquare,
  },
  {
    title: "Reach your career goal",
    description: "Use your projects and new skills to land your next job.",
    icon: Flag,
  },
];

// Server Component. Client pieces: RevealOnScroll (fade in) and RouteDraw
// (draws the route line). id="how" is the target of the "How it works" link.
export function HowItWorks() {
  return (
    <section
      id="how"
      aria-labelledby="how-title"
      // surface-soft: sections alternate white / soft blue (DESIGN.md).
      className="scroll-mt-28 bg-surface-soft py-20 md:py-28"
    >
      <RevealOnScroll className="mx-auto w-full max-w-[1200px] px-4 sm:px-6">
        <div data-reveal>
          {/* Section label (DESIGN.md: node + number + small uppercase label) */}
          <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.12em] text-royal-deep uppercase">
            <span
              aria-hidden="true"
              className="size-3 rounded-full bg-royal ring-4 ring-royal/15"
            />
            <span aria-hidden="true">02</span>
            How it works
          </p>

          <div className="mt-4 max-w-2xl">
            <h2
              id="how-title"
              className="font-display text-3xl leading-tight font-bold tracking-tight text-ink sm:text-4xl md:text-5xl"
            >
              Five steps to your career.
            </h2>
            <p className="mt-4 text-base text-ink-soft sm:text-lg">
              No experience needed. Start where you are and grow together with
              people on the same path.
            </p>
          </div>
        </div>

        <RouteDraw className="mt-14">
          {/* <ol>: the order matters; screen readers say "list, 5 items"
              and read each step's number for us. */}
          <ol className="grid gap-6 lg:grid-cols-5 lg:gap-5">
            {STEPS.map(({ title, description, icon: Icon }, index) => {
              const isLast = index === STEPS.length - 1;
              return (
                <li
                  key={title}
                  data-reveal
                  // Phone: number on the left, card on the right.
                  // Desktop: number on top, card below, 5 columns.
                  className="relative grid grid-cols-[3.5rem_1fr] gap-x-4 lg:flex lg:flex-col lg:gap-5"
                >
                  {/* Number node on the route. The last one is green (the
                      goal), like the hero route. aria-hidden: the <ol>
                      already announces the number. */}
                  <span
                    aria-hidden="true"
                    className={`relative z-10 grid size-14 shrink-0 place-items-center rounded-full border-2 bg-white font-display text-xl font-bold shadow-sm ${
                      isLast
                        ? "border-green text-green"
                        : "border-royal text-royal"
                    }`}
                  >
                    {index + 1}
                  </span>

                  {/* Route line to the next step (not after the last one).
                      Solid royal/50, 2px: stronger than a faint dashed line.
                      Phone: runs down from this node's center line.
                      Desktop: runs right from this node to the next column.
                      RouteDraw animates it with scaleY / scaleX. */}
                  {!isLast && (
                    <span
                      aria-hidden="true"
                      data-route-segment
                      className="absolute top-16 -bottom-4 left-[27px] w-0.5 rounded-full bg-royal/50 lg:top-[27px] lg:-right-3 lg:bottom-auto lg:left-[4.5rem] lg:h-0.5 lg:w-auto"
                    />
                  )}

                  {/* The step itself, in the same aqua glass as the
                      Career paths cards */}
                  <GlassCard className="p-5 lg:flex-1">
                    {/* Icon: helps scan what the step is about.
                        Decorative, the title says it in words. */}
                    <span className="grid size-10 place-items-center rounded-xl bg-white/55 ring-1 ring-white/80">
                      <Icon
                        aria-hidden="true"
                        className={`size-5 ${isLast ? "text-green" : "text-royal"}`}
                      />
                    </span>
                    <h3 className="mt-4 font-display text-lg leading-snug font-semibold text-ink">
                      {title}
                    </h3>
                    {/* ink-soft on the aqua = 5.5:1 */}
                    <p className="mt-2 text-ink-soft lg:text-[15px]">
                      {description}
                    </p>
                  </GlassCard>
                </li>
              );
            })}
          </ol>
        </RouteDraw>

        {/* One clear next step (DESIGN.md: "Guide, don't shout") */}
        <div data-reveal className="mt-14">
          <Link
            href="/#paths"
            className="group inline-flex min-h-11 items-center gap-2 rounded-md font-semibold text-royal-deep underline-offset-4 hover:underline"
          >
            Start with a career path
            {/* The arrow slides 4px on hover (transform only) */}
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </RevealOnScroll>
    </section>
  );
}
