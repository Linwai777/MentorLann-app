import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/site/glass-card";
import { RevealOnScroll } from "@/components/site/reveal-on-scroll";
import { GuestOrMember } from "@/components/auth/guest-or-member";

// Facts that are true today. Guests need an account to see the courses,
// vlogs and community (members only), so their list talks about joining.
const GUEST_PROMISES = [
  "Free to join",
  "Sign up in under a minute",
  "No experience needed",
];
const MEMBER_PROMISES = [
  "100% free",
  "No experience needed",
  "Learn at your own pace",
];

// The last section of the home page: one clear invitation.
// id="join" is the target of every "Join free" button on the site
// (header, mobile menu, hero, footer), so they all land here.
export function FinalCta() {
  return (
    <section
      id="join"
      aria-labelledby="join-title"
      className="scroll-mt-28 bg-surface-soft py-20 md:py-28"
    >
      <RevealOnScroll className="mx-auto w-full max-w-[1200px] px-4 sm:px-6">
        <div data-reveal>
          <GlassCard className="px-6 py-12 text-center sm:px-12 md:py-16">
            <p className="flex items-center justify-center gap-3 text-xs font-semibold tracking-[0.12em] text-royal-deep uppercase">
              <span
                aria-hidden="true"
                className="size-3 rounded-full bg-green ring-4 ring-green/15"
              />
              Join free
            </p>
            <h2
              id="join-title"
              className="mx-auto mt-4 max-w-3xl font-display text-3xl leading-tight font-bold tracking-tight text-balance text-ink sm:text-4xl md:text-5xl"
            >
              Your next career starts with one small step.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base text-ink-soft sm:text-lg">
              Pick a career path, open Step 1 of its free courses and meet
              people on the same path. Learn together, grow together.
            </p>

            {/* Guests: join or log in. Members: go learn. */}
            <GuestOrMember
              guest={
                <CtaActions
                  primary={{ href: "/sign-up", label: "Join free" }}
                  secondary={{ href: "/log-in", label: "Log in" }}
                  promises={GUEST_PROMISES}
                />
              }
              member={
                <CtaActions
                  primary={{
                    href: "/courses",
                    label: "Start with a free course",
                  }}
                  secondary={{
                    href: "/community",
                    label: "Join the community",
                  }}
                  promises={MEMBER_PROMISES}
                />
              }
            />
          </GlassCard>
        </div>
      </RevealOnScroll>
    </section>
  );
}

// The two buttons and the promise list.
// Primary (filled) = the main action; outline = the second.
// Stacked on phones, side by side from sm.
function CtaActions({
  primary,
  secondary,
  promises,
}: {
  primary: { href: string; label: string };
  secondary: { href: string; label: string };
  promises: string[];
}) {
  return (
    <>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button asChild className="w-full sm:w-auto">
          <Link href={primary.href} className="group">
            {primary.label}
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </Button>
        <Button asChild variant="outline" className="w-full sm:w-auto">
          <Link href={secondary.href}>{secondary.label}</Link>
        </Button>
      </div>

      <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-ink">
        {promises.map((promise) => (
          <li key={promise} className="flex items-center gap-2">
            <Check aria-hidden="true" className="size-4 text-green" />
            {promise}
          </li>
        ))}
      </ul>
    </>
  );
}
