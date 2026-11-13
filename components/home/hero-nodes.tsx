"use client";

import dynamic from "next/dynamic";
import { useState, useSyncExternalStore } from "react";
import { Pause, Play } from "lucide-react";
import { HeroNodesSvg } from "@/components/home/hero-nodes-svg";

// Lazy load: three.js is big, so its code is split into a separate file that
// is only downloaded when HeroScene actually renders (large screens only).
// ssr: false because WebGL only exists in the browser.
const HeroScene = dynamic(() => import("@/components/home/hero-scene"), {
  ssr: false,
});

// Read a CSS media query in React and re-render when it changes
// (e.g. the window is resized). useSyncExternalStore is React's built-in way
// to read values that live outside React, like window.matchMedia.
function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches, // value in the browser
    () => false, // value during server rendering
  );
}

type NetworkInfo = { saveData?: boolean };

// Skip the 3D scene on weak devices or when the visitor asked to save data.
function canAfford3D(): boolean {
  const connection = (navigator as Navigator & { connection?: NetworkInfo })
    .connection;
  if (connection?.saveData) return false;
  return (navigator.hardwareConcurrency ?? 4) >= 4; // at least 4 CPU cores
}

// This value never changes while the page is open, so nothing to subscribe to.
const subscribeNever = () => () => {};

export function HeroNodes() {
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const strongDevice = useSyncExternalStore(
    subscribeNever,
    canAfford3D,
    () => false,
  );

  // Lives here (not inside HeroScene) so the button can be outside the
  // click-through 3D layer.
  const [paused, setPaused] = useState(false);

  // Phones and tablets: the text uses the full width, so no nodes at all.
  if (!isLargeScreen) return null;

  const show3D = !reduceMotion && strongDevice;

  return (
    <>
      <div
        aria-hidden="true"
        // pointer-events-none: the route is decoration and never blocks clicks.
        // -z-5 puts it above the navy overlay but below the text.
        className="pointer-events-none absolute inset-y-0 right-0 -z-5 w-[45%]"
      >
        {show3D ? <HeroScene paused={paused} /> : <HeroNodesSvg />}
      </div>

      {/* WCAG 2.2.2: motion that lasts more than 5 seconds needs a pause.
          The static SVG does not move, so it needs no button.
          z-10 keeps the button above the text layer so it can be clicked. */}
      {show3D && (
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          aria-label="Pause animation"
          className="absolute right-6 bottom-6 z-10 inline-flex size-11 items-center justify-center rounded-full border border-white/40 bg-ink/60 text-white transition-colors duration-200 hover:bg-ink/80"
        >
          {paused ? (
            <Play aria-hidden="true" className="size-5" />
          ) : (
            <Pause aria-hidden="true" className="size-5" />
          )}
        </button>
      )}
    </>
  );
}
