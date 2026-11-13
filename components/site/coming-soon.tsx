import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { GlassCard } from "@/components/site/glass-card";

// An honest "not ready yet" block. We show this instead of invented content
// (fake videos, fake members): made-up content breaks visitors' trust.
export function ComingSoon({
  icon: Icon,
  title,
  text,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
}) {
  return (
    <GlassCard className="mx-auto max-w-xl p-8 text-center sm:p-10">
      <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-white/60 text-royal ring-1 ring-white/80">
        <Icon aria-hidden="true" className="size-7" />
      </span>
      <h2 className="mt-5 font-display text-2xl font-semibold text-ink">
        {title}
      </h2>
      <p className="mt-3 text-ink-soft">{text}</p>
      {/* A useful next step, so the visitor is never at a dead end */}
      <Link
        href="/#paths"
        className="group mt-6 inline-flex min-h-11 items-center gap-2 rounded-md font-semibold text-royal-deep underline-offset-4 hover:underline"
      >
        Explore career paths
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-200 group-hover:translate-x-1"
        />
      </Link>
    </GlassCard>
  );
}
