"use client";

import { useLayoutEffect, useRef, type ComponentProps } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Draws the "How it works" route line when it scrolls into view, so the
// visitor sees the path being walked from step 1 to step 5.
// Each line piece has `data-route-segment`. Only `transform` is animated
// (scaleX / scaleY from 0 to 1), never width or height.
// Without JavaScript or with reduced motion, the full line simply shows.
export function RouteDraw({ children, ...props }: ComponentProps<"div">) {
  const scope = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      {
        desktop: "(min-width: 1024px)",
        motionOk: "(prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const { desktop, motionOk } = context.conditions ?? {};
        if (!motionOk) return;

        const segments = gsap.utils.toArray<HTMLElement>(
          "[data-route-segment]",
          scope.current,
        );

        if (desktop) {
          // Desktop: the whole route is visible at once, so draw the pieces
          // one after another, left to right (stagger = each piece's time).
          gsap.set(segments, { scaleX: 0, transformOrigin: "left center" });
          gsap.to(segments, {
            scaleX: 1,
            duration: 0.45,
            ease: "power1.inOut",
            stagger: 0.45,
            scrollTrigger: {
              trigger: scope.current,
              start: "top 75%",
              once: true,
            },
          });
        } else {
          // Phone: the route runs down a long page, so each piece draws
          // downwards when you scroll to it.
          segments.forEach((segment) => {
            gsap.set(segment, { scaleY: 0, transformOrigin: "center top" });
            gsap.to(segment, {
              scaleY: 1,
              duration: 0.6,
              ease: "power1.out",
              scrollTrigger: { trigger: segment, start: "top 85%", once: true },
            });
          });
        }
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
