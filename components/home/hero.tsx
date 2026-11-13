import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroReveal } from "@/components/home/hero-reveal";
import { HeroNodes } from "@/components/home/hero-nodes";
// Static import: Next.js reads the width/height at build time (no layout shift)
// and creates a tiny blurred version for `placeholder="blur"`.
// The photo comes from the approved hero preview (desk by a window, navy wall).
import heroPhoto from "@/public/media/hero-desk.jpg";

// Facts that are true from day one. We do NOT show learner or mentor counts
// until we have real numbers: invented stats break trust.
const HIGHLIGHTS = [
  { value: "100%", label: "free to join" },
  { value: "5", label: "steps to your career" },
  { value: "3", label: "ways to grow: learn, connect, mentor" },
];

// Server Component: the text and buttons are plain HTML, so they show
// instantly even before any JavaScript loads. The client pieces are
// HeroReveal (the <section> + entrance animation) and HeroNodes (3D).
export function Hero() {
  return (
    <HeroReveal
      aria-labelledby="hero-title"
      // `isolate` starts a new stacking context, so the negative z-index layers
      // below stay inside this section instead of going behind the page.
      // min-h-svh: the hero now starts at the very top, under the glass header.
      className="relative isolate flex min-h-svh items-end overflow-hidden bg-ink text-white md:items-center"
    >
      {/* Layer 1 (back): background photo, the Largest Contentful Paint element.
          A soft blur + less saturation (like the preview) keeps it calm, so the
          text and 3D route stand out. scale-105 hides the blurred, see-through
          edges that blur() creates at the borders. */}
      <Image
        src={heroPhoto}
        alt=""
        fill
        preload
        sizes="100vw"
        placeholder="blur"
        className="-z-30 scale-105 object-cover blur-[3px] saturate-[.8]"
      />

      {/* Layer 3: navy overlay, so white text stays readable on any frame.
          Phones: text uses the full width, so one even 75% layer.
          md and up: text sits on the left, so the overlay is darkest there
          (95%) and lighter on the right (55%) where the video and 3D show. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-ink/75 md:bg-transparent md:bg-linear-to-r md:from-ink/95 md:via-ink/80 md:to-ink/55"
      />

      {/* Curtain: solid navy that fades away at the start of the entrance.
          Invisible by default; CSS shows it only when JS will animate it. */}
      <div
        aria-hidden="true"
        data-hero-curtain
        className="absolute inset-0 -z-10 bg-ink opacity-0"
      />

      {/* Layer 3.5: 3D career route on large screens (lazy loaded) */}
      <HeroNodes />

      {/* Layer 4 (front): content. `data-hero-reveal` marks what animates in. */}
      {/* Top padding = glass bar height (76/80px) + breathing room, so the
          text never sits right under the bar (~52px gap on phones, 64px+ on
          desktop, more when the content is centered on tall screens). */}
      <div className="mx-auto w-full max-w-[1200px] px-4 pt-32 pb-16 sm:px-6 md:pt-36 md:pb-20">
        <p
          data-hero-reveal
          className="flex items-center gap-2.5 text-xs font-semibold tracking-[0.12em] text-green-light uppercase"
        >
          {/* Small "live" dot, echoing the route nodes */}
          <span
            aria-hidden="true"
            className="size-2 shrink-0 rounded-full bg-green-light ring-4 ring-green-light/20"
          />
          Free learning &amp; mentorship community
        </p>
        <h1
          id="hero-title"
          className="mt-4 max-w-3xl font-display text-[40px] leading-[1.05] font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-[68px]"
        >
          {/* Two lines so each one can rise in separately */}
          <span data-hero-reveal className="block">
            Learn Together.
          </span>
          <span data-hero-reveal className="block">
            Grow <span className="text-green-light">Together.</span>
          </span>
        </h1>
        <p
          data-hero-reveal
          className="mt-5 max-w-xl text-base text-white/85 sm:text-lg"
        >
          Free resources, career roadmaps and mentors who have walked the path.
          Made for learners from Myanmar and beyond.
        </p>
        <div data-hero-reveal className="mt-8 flex flex-col gap-3 sm:flex-row">
          {/* Primary: royal, like the brand. White text on royal is 6.7:1.
              The arrow slides right on hover to say "this takes you forward". */}
          <Button asChild className="hover:shadow-lg hover:shadow-royal/40">
            <Link href="/#join">
              Join free
              <ArrowRight
                aria-hidden="true"
                data-icon="inline-end"
                className="size-5 transition-transform duration-200 group-hover/button:translate-x-1"
              />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-white/50 bg-white/5 text-white hover:bg-white/10 hover:text-white"
          >
            <Link href="/#paths">Explore career paths</Link>
          </Button>
        </div>

        {/* Highlights: a real list, so screen readers hear "100% free to join" */}
        <ul
          data-hero-reveal
          className="mt-10 grid max-w-xl grid-cols-3 gap-4 sm:gap-8"
        >
          {HIGHLIGHTS.map((item) => (
            <li key={item.value + item.label}>
              <span className="block font-display text-2xl font-bold">
                {item.value}
              </span>
              <span className="mt-1 block text-sm leading-snug text-white/75">
                {item.label}
              </span>
            </li>
          ))}
        </ul>

        {/* The 3D route is hidden from screen readers (aria-hidden), so say
            what it shows in words. sr-only = invisible but still read aloud. */}
        <p className="sr-only">
          The 5 steps of a MentorLann career path: Start, Learn, Practice,
          Mentor, Career.
        </p>
      </div>

      {/* Scroll cue (desktop only): a small mouse whose wheel moves down.
          It plays 3 times (under 5s) and stops, so it never distracts. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-6 left-6 hidden flex-col items-center gap-1.5 text-[11px] font-semibold tracking-[0.14em] text-white/70 md:flex"
      >
        <span className="relative h-8 w-5 rounded-full border-[1.5px] border-white/60">
          <span className="scroll-cue-wheel absolute top-1.5 left-1/2 h-2 w-[3px] -translate-x-1/2 rounded-full bg-white" />
        </span>
        SCROLL
      </div>
    </HeroReveal>
  );
}
