import Image from "next/image";
import type { ReactNode } from "react";
import { GlassCard } from "@/components/site/glass-card";

// The frame shared by /sign-up and /log-in: a soft-blue page with one
// centered glass card holding the logo, the page title (the only <h1>),
// a short intro, the form, and a link to the other page.
export function AuthCard({
  title,
  intro,
  children,
  footer,
}: {
  title: string;
  intro: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    // pt-28 / md:pt-32: room for the floating header (it pulls the page up
    // under itself by 76px / 80px, see DESIGN.md "Navigation").
    <section className="bg-surface-soft px-4 pt-28 pb-16 md:pt-32 md:pb-24">
      <GlassCard className="mx-auto w-full max-w-[440px] p-6 sm:p-8">
        {/* The brand logo, centered on top of the form.
            width/height = the SVG's real size (764x160), so the space is
            reserved and nothing jumps; h-10 sets the visible size.
            alt names the brand, because here it is content (not a link). */}
        <Image
          src="/brand/logo.svg"
          alt="MentorLann"
          width={764}
          height={160}
          loading="eager" // on screen at once, so do not lazy-load it
          className="mx-auto h-10 w-auto"
        />

        <h1 className="mt-6 text-center font-display text-3xl font-bold text-balance text-ink">
          {title}
        </h1>
        <p className="mt-2 text-center text-ink-soft">{intro}</p>

        <div className="mt-8">{children}</div>

        <p className="mt-6 text-center text-ink-soft">{footer}</p>
      </GlassCard>
    </section>
  );
}
