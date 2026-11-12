"use client";

import { useLayoutEffect, useRef, type ComponentProps } from "react";
import gsap from "gsap";

// The Hero's <section>, plus the entrance animation that plays once on load:
// 1. the full-navy "curtain" fades away, revealing poster/video
// 2. eyebrow, both headline lines, paragraph and buttons rise in one by one
// Total time: about 1.3s. The children stay Server Components.
export function HeroReveal({ children, ...props }: ComponentProps<"section">) {
  const scope = useRef<HTMLElement>(null);

  // useLayoutEffect runs after React attaches to the DOM but before the
  // browser paints, so the first animation frame is never skipped.
  useLayoutEffect(() => {
    // matchMedia runs the animation only when the visitor allows motion.
    // With reduced motion, nothing runs and the CSS shows the final state.
    const mm = gsap.matchMedia();
    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        gsap
          .timeline({ defaults: { ease: "power2.out" } })
          .fromTo(
            "[data-hero-curtain]",
            { opacity: 1 },
            { opacity: 0, duration: 0.6 },
          )
          .fromTo(
            "[data-hero-reveal]",
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.09 },
            "-=0.3", // start 0.3s before the curtain finishes
          );
      },
      scope, // selectors only match elements inside this section
    );

    // Cleanup: stop animations and remove the inline styles GSAP added.
    return () => mm.revert();
  }, []);

  return (
    <section ref={scope} {...props}>
      {children}
    </section>
  );
}
