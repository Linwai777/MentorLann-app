import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { GlassCard } from "@/components/site/glass-card";
import { RevealOnScroll } from "@/components/site/reveal-on-scroll";
import { FacebookIcon } from "@/components/vlogs/brand-icons";
import {
  ACTIVITIES,
  COMMUNITY_LINKS,
  RULES,
} from "@/components/community/community-data";

// URL: /community. Title in the tab: "Community | MentorLann".
export const metadata: Metadata = {
  title: "Community",
  description:
    "A free community for learners from Myanmar and beyond, starting in Dubai: study groups, meetups, mentor chats and kind feedback.",
};

// Shared styles for the small section labels and headings on this page
const LABEL =
  "text-xs font-semibold tracking-[0.12em] text-royal-deep uppercase";
const H2 =
  "mt-3 font-display text-3xl leading-tight font-bold tracking-tight text-ink sm:text-4xl";

export default function CommunityPage() {
  return (
    <>
      <PageHeader
        label="Community"
        title="Grow together with people like you."
        intro="MentorLann is a free community for learners from Myanmar and beyond, starting in Dubai. We are just getting started, so you can be one of the first members."
      />

      {/* 1. What we plan to do. Every card says "Planned" until it is real. */}
      <section
        aria-labelledby="together-title"
        className="bg-white py-16 md:py-24"
      >
        <RevealOnScroll className="mx-auto w-full max-w-[1200px] px-4 sm:px-6">
          <div data-reveal className="max-w-2xl">
            <p className={LABEL}>What we will do together</p>
            <h2 id="together-title" className={H2}>
              Learn with people, not alone.
            </h2>
          </div>

          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {ACTIVITIES.map(({ title, description, where, icon: Icon }) => (
              <li key={title} data-reveal>
                <GlassCard className="flex h-full gap-4 p-6">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-white/60 text-royal ring-1 ring-white/80">
                    <Icon aria-hidden="true" className="size-6" />
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-xl font-semibold text-ink">
                        {title}
                      </h3>
                      {/* Honest status: not happening yet */}
                      <span className="rounded-full bg-white/70 px-2.5 py-0.5 text-xs font-semibold text-royal-deep ring-1 ring-white/80">
                        Planned
                      </span>
                    </div>
                    <p className="mt-2 text-ink-soft">{description}</p>
                    <p className="mt-3 text-sm font-medium text-ink">{where}</p>
                  </div>
                </GlassCard>
              </li>
            ))}
          </ul>
        </RevealOnScroll>
      </section>

      {/* 2. How to join: 3 steps, in order */}
      <section
        aria-labelledby="join-title"
        className="bg-surface-soft py-16 md:py-24"
      >
        <RevealOnScroll className="mx-auto w-full max-w-[1200px] px-4 sm:px-6">
          <div data-reveal className="max-w-2xl">
            <p className={LABEL}>How to join</p>
            <h2 id="join-title" className={H2}>
              Three small steps to start.
            </h2>
          </div>

          <ol className="mt-10 grid gap-5 lg:grid-cols-3">
            <JoinStep number={1} title="Choose a career path">
              <p>Pick a path and start Step 1 of its free courses.</p>
              <Link
                href="/courses"
                className="group mt-4 inline-flex min-h-11 items-center gap-2 rounded-md font-semibold text-royal-deep underline-offset-4 hover:underline"
              >
                Browse free courses
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            </JoinStep>

            <JoinStep number={2} title="Follow us on Facebook">
              {COMMUNITY_LINKS.facebook ? (
                <>
                  <p>News, study group dates and meetups are posted there.</p>
                  <a
                    href={COMMUNITY_LINKS.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-lg bg-white px-4 text-sm font-semibold text-ink ring-1 ring-line transition-colors duration-200 hover:ring-facebook"
                  >
                    <FacebookIcon className="size-5 text-facebook" />
                    Follow MentorLann
                    {/* Leading space in the string: JSX drops line-break
                        spaces, which would make "MentorLannon Facebook" */}
                    <span className="sr-only">
                      {" on Facebook (opens in a new tab)"}
                    </span>
                  </a>
                </>
              ) : (
                // No page yet: say so instead of showing a broken link
                <p>
                  Our Facebook page is starting now. The link will appear here
                  soon.
                </p>
              )}
            </JoinStep>

            <JoinStep number={3} title="Join the first study group">
              <p>
                We will announce the first study group and the first Dubai
                meetup on our Facebook page.
              </p>
            </JoinStep>
          </ol>
        </RevealOnScroll>
      </section>

      {/* 3. Community rules */}
      <section
        aria-labelledby="rules-title"
        className="bg-white py-16 md:py-24"
      >
        <RevealOnScroll className="mx-auto w-full max-w-[1200px] px-4 sm:px-6">
          <div data-reveal className="max-w-2xl">
            <p className={LABEL}>Community rules</p>
            <h2 id="rules-title" className={H2}>
              A safe and friendly place to learn.
            </h2>
          </div>

          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {RULES.map(({ text, icon: Icon }) => (
              <li
                key={text}
                data-reveal
                className="flex items-start gap-4 rounded-2xl border border-line p-5"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-royal/10 text-royal">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <p className="pt-2 text-ink">{text}</p>
              </li>
            ))}
          </ul>

          {/* 4. Future mentors */}
          <div data-reveal className="mt-16">
            <GlassCard className="p-6 sm:p-10">
              <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
                Already working in one of these fields?
              </h2>
              <p className="mt-3 max-w-2xl text-ink-soft">
                Your first steps can help someone else start. Soon we will
                invite our first mentors for short chats with learners.
              </p>
            </GlassCard>
          </div>
        </RevealOnScroll>
      </section>
    </>
  );
}

// One "How to join" step: a number node (like How it works) and its text.
function JoinStep({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li data-reveal className="h-full">
      <GlassCard className="h-full p-6">
        {/* aria-hidden: the <ol> already reads the number */}
        <span
          aria-hidden="true"
          className="grid size-12 place-items-center rounded-full border-2 border-royal bg-white font-display text-lg font-bold text-royal"
        >
          {number}
        </span>
        <h3 className="mt-4 font-display text-xl font-semibold text-ink">
          {title}
        </h3>
        <div className="mt-2 text-ink-soft">{children}</div>
      </GlassCard>
    </li>
  );
}
