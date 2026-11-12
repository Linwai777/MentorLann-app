import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroVideo } from "@/components/home/hero-video";
import { HeroReveal } from "@/components/home/hero-reveal";
// Static import: Next.js reads the width/height at build time (no layout shift)
// and creates a tiny blurred version for `placeholder="blur"`.
import heroPoster from "@/public/media/hero-poster.jpg";

// Server Component: the text and buttons are plain HTML, so they show
// instantly even before any JavaScript loads. The client pieces are
// HeroReveal (the <section> + entrance animation) and HeroVideo.
export function Hero() {
  return (
    <HeroReveal
      aria-labelledby="hero-title"
      // `isolate` starts a new stacking context, so the negative z-index layers
      // below stay inside this section instead of going behind the page.
      className="relative isolate flex min-h-[calc(100svh-4rem)] items-end overflow-hidden bg-ink text-white md:min-h-[calc(100svh-5rem)] md:items-center"
    >
      {/* Layer 1 (back): poster image, the Largest Contentful Paint element */}
      <Image
        src={heroPoster}
        alt=""
        fill
        preload
        sizes="100vw"
        placeholder="blur"
        className="-z-30 object-cover"
      />

      {/* Layer 2: background video (skipped for reduced motion or Data Saver) */}
      <HeroVideo />

      {/* Layer 3: navy overlay. 70% keeps white text at 6.1:1 even on a white frame */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/70" />

      {/* Curtain: solid navy that fades away at the start of the entrance.
          Invisible by default; CSS shows it only when JS will animate it. */}
      <div
        aria-hidden="true"
        data-hero-curtain
        className="absolute inset-0 -z-10 bg-ink opacity-0"
      />

      {/* Layer 4 (front): content. `data-hero-reveal` marks what animates in. */}
      <div className="mx-auto w-full max-w-[1200px] px-4 pt-24 pb-16 sm:px-6 md:py-24">
        <p
          data-hero-reveal
          className="text-xs font-semibold tracking-[0.08em] text-green-light uppercase"
        >
          Free learning &amp; mentorship community
        </p>
        <h1
          id="hero-title"
          className="mt-4 max-w-3xl font-display text-[44px] leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-[80px]"
        >
          {/* Two lines so each one can rise in separately */}
          <span data-hero-reveal className="block">
            Learn Together.
          </span>
          <span data-hero-reveal className="block">
            Grow Together.
          </span>
        </h1>
        <p
          data-hero-reveal
          className="mt-6 max-w-xl text-lg text-white/85 md:text-xl"
        >
          Free resources, career roadmaps and mentors who have walked the path.
          Made for learners in Myanmar and beyond.
        </p>
        <div data-hero-reveal className="mt-10 flex flex-col gap-3 sm:flex-row">
          {/* Light button: a royal button would blend into the dark hero */}
          <Button asChild variant="secondary">
            <Link href="/#join">Join free</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-white/60 bg-transparent text-white hover:bg-white/10 hover:text-white"
          >
            <Link href="/#paths">Explore career paths</Link>
          </Button>
        </div>
      </div>
    </HeroReveal>
  );
}
