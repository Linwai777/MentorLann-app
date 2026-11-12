"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

// Two sizes of the same clip: phones get the smaller file (540p, ~1.5 MB).
const DESKTOP_SRC = "/media/hero-desktop.mp4";
const MOBILE_SRC = "/media/hero-mobile.mp4";

// The Network Information API is not in every browser or in TypeScript's
// default types, so we describe only the field we read.
type NetworkInfo = { saveData?: boolean };

// Our community (Myanmar community in Dubai) is on fast networks, so we only
// skip the video when the visitor has asked for less motion or less data.
// Then they simply keep seeing the poster image behind the overlay.
function canPlayVideo(): boolean {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const connection = (navigator as Navigator & { connection?: NetworkInfo }).connection;
  if (connection?.saveData) return false; // user turned on Data Saver
  return true;
}

function pickSource(): string {
  return window.matchMedia("(min-width: 768px)").matches ? DESKTOP_SRC : MOBILE_SRC;
}

type Status = "off" | "playing" | "paused";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState<Status>("off");
  // A ref (not state) because changing it should not re-render anything.
  const pausedByUser = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !canPlayVideo()) return;

    // Setting `src` only now (not in the HTML) means visitors who skip the
    // video never download it, and each screen size gets the right file.
    video.muted = true; // browsers only allow autoplay when muted
    video.src = pickSource();
    video.play().catch(() => {
      // Autoplay was blocked: nothing to do, the poster stays visible.
    });

    // Save battery and CPU: pause when the hero scrolls out of view.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!pausedByUser.current) video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(video);

    return () => {
      observer.disconnect();
      video.pause();
    };
  }, []);

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      pausedByUser.current = false;
      video.play().catch(() => {});
    } else {
      pausedByUser.current = true;
      video.pause();
    }
  }

  return (
    <>
      <video
        ref={videoRef}
        aria-hidden="true"
        tabIndex={-1}
        loop
        muted
        playsInline
        preload="none"
        onPlaying={() => setStatus("playing")}
        onPause={() => setStatus((s) => (s === "off" ? "off" : "paused"))}
        // Fades in over the poster once frames are actually playing.
        className={cn(
          "absolute inset-0 -z-20 size-full object-cover opacity-0 transition-opacity duration-700",
          status !== "off" && "opacity-100",
        )}
      />

      {/* WCAG 2.2.2: moving content longer than 5s needs a way to pause it */}
      {status !== "off" && (
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={status === "playing" ? "Pause background video" : "Play background video"}
          className="absolute right-4 bottom-4 z-10 inline-flex size-11 items-center justify-center rounded-full border border-white/40 bg-ink/60 text-white transition-colors duration-200 hover:bg-ink/80 sm:right-6 sm:bottom-6"
        >
          {status === "playing" ? (
            <Pause aria-hidden="true" className="size-5" />
          ) : (
            <Play aria-hidden="true" className="size-5" />
          )}
        </button>
      )}
    </>
  );
}
