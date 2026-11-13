"use client";

import { useLayoutEffect, useRef, type ComponentProps } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ScrollTrigger ships inside the gsap package (no new install). Registering
// tells GSAP the plugin exists so `ScrollTrigger.batch` works.
gsap.registerPlugin(ScrollTrigger);

// A reusable wrapper for any section: every child marked `data-reveal`
// fades in and rises 16px when it scrolls into view (DESIGN.md: 500-700ms,
// stagger 80ms, play once, skip under reduced motion).
// Only this wrapper is a Client Component; the content inside stays
// server-rendered HTML.
export function RevealOnScroll({ children, ...props }: ComponentProps<"div">) {
  const scope = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        const items = gsap.utils.toArray<HTMLElement>(
          "[data-reveal]",
          scope.current,
        );

        // Hide them before the first paint. The server HTML is visible, so if
        // JavaScript fails or is slow, the content is still there.
        gsap.set(items, { opacity: 0, y: 16 });

        const show = (batch: Element[]) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.08,
            overwrite: true,
          });

        // batch() groups items that enter the screen at the same moment, so
        // each row of cards animates together as you reach it (on a phone,
        // cards further down wait until you scroll to them).
        ScrollTrigger.batch(items, {
          start: "top 88%",
          once: true,
          onEnter: show,
          // A fast jump (e.g. a nav link) can skip past an item entirely;
          // show it anyway so nothing is left invisible.
          onLeave: show,
        });
      },
      scope,
    );

    // Cleanup: kill the triggers and remove GSAP's inline styles.
    return () => mm.revert();
  }, []);

  return (
    <div ref={scope} {...props}>
      {children}
    </div>
  );
}
