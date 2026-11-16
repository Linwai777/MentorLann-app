"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dialog } from "radix-ui";
import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/site/glass-card";

// The popup frame for the log-in and sign-up forms (see auth-screens.tsx).
// It is shown by the intercepting routes in app/@modal/: the URL changes
// to /log-in, but the page you were on stays underneath, blurred.
//
// Radix Dialog gives the accessibility for free: focus moves into the
// popup and stays there (focus trap), Esc closes it, the page behind
// cannot scroll, and screen readers hear the title and description.
export function AuthModal({
  title,
  intro,
  footer,
  children,
}: {
  title: string;
  intro: string;
  footer: ReactNode;
  children: ReactNode;
}) {
  const router = useRouter();
  // Closing in two steps, so the closing motion can play:
  // 1. Esc / X / click outside -> open = false (the fade-out starts)
  // 2. When the popup is gone, onCloseAutoFocus runs -> router.back()
  //    takes the URL back to the page underneath (/log-in -> /vlogs).
  const [open, setOpen] = useState(true);
  // Did the PERSON close it? The popup also disappears when "Join free"
  // swaps it for the sign-up popup; then we must not go back.
  const closedByUser = useRef(false);

  // Next.js keeps a page you leave in memory, hidden (React <Activity>),
  // with its state. The cleanup below runs when the popup is hidden, so
  // it is reset to "open" for the next time "Log in" is clicked.
  useEffect(() => {
    return () => {
      closedByUser.current = false;
      setOpen(true);
    };
  }, []);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        if (!next) closedByUser.current = true;
        setOpen(next);
      }}
    >
      <Dialog.Portal>
        {/* Backdrop: navy tint + blur over the page. Fades in and out. */}
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-md duration-200 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0 motion-reduce:animate-none" />

        {/* The card, centered. Motion: fade + zoom from 95% to 100%
            (opacity and transform only). Taller than a small phone?
            max-h + overflow-y-auto lets it scroll inside. */}
        <Dialog.Content
          onCloseAutoFocus={(event) => {
            event.preventDefault(); // there is no trigger button to refocus
            if (closedByUser.current) router.back();
          }}
          className="fixed top-1/2 left-1/2 z-50 max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-[440px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl duration-200 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 motion-reduce:animate-none"
        >
          {/* The same aqua glass block as the rest of the site (GlassCard).
              bg-glass-tint at 100% (cards elsewhere use 80%): over the dark
              blurred page, 80% would let navy through and the grey text
              would drop under 4.5:1. Solid tint keeps it at 5.5:1 or more
              (the reflections only make it lighter). */}
          <GlassCard className="bg-glass-tint p-6 sm:p-8">
            <Image
              src="/brand/logo.svg"
              alt="MentorLann"
              width={764}
              height={160}
              className="mx-auto h-10 w-auto"
            />
            {/* Dialog.Title is an <h2>: the page underneath keeps its h1 */}
            <Dialog.Title className="mt-6 text-center font-display text-3xl font-bold text-balance text-ink">
              {title}
            </Dialog.Title>
            <Dialog.Description className="mt-2 text-center text-ink-soft">
              {intro}
            </Dialog.Description>

            <div className="mt-8">{children}</div>

            <p className="mt-6 text-center text-ink-soft">{footer}</p>

            {/* 44px close button, top right */}
            <Dialog.Close asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-3 right-3 size-11"
              >
                <XIcon aria-hidden="true" className="size-5" />
                <span className="sr-only">Close</span>
              </Button>
            </Dialog.Close>
          </GlassCard>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
