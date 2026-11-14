import { RevealOnScroll } from "@/components/site/reveal-on-scroll";
import { GlassCard } from "@/components/site/glass-card";
import { ACTIVITIES } from "@/components/community/community-data";
import { SectionHeading, SeeAllLink } from "@/components/home/section-parts";

// Home page teaser for /community. Uses the same ACTIVITIES list as the
// Community page, so both always say the same thing. Still "Planned":
// no invented members or numbers.
export function CommunityPreview() {
  return (
    <section
      id="community"
      aria-labelledby="community-title"
      className="scroll-mt-28 bg-white py-20 md:py-28"
    >
      <RevealOnScroll className="mx-auto w-full max-w-[1200px] px-4 sm:px-6">
        <SectionHeading
          id="community-title"
          number="03"
          label="Community"
          title="Learn with people, not alone."
          intro="A free community for learners from Myanmar and beyond, starting in Dubai. We are just getting started: be one of the first members."
        />

        {/* Compact cards: icon, name, "Planned". Details live on /community */}
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ACTIVITIES.map(({ title, where, icon: Icon }) => (
            <li key={title} data-reveal>
              <GlassCard className="flex h-full flex-col p-5">
                <span className="grid size-11 place-items-center rounded-xl bg-white/60 text-royal ring-1 ring-white/80">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                  {title}
                </h3>
                <p className="mt-1 text-sm text-ink-soft">{where}</p>
                <span className="mt-4 self-start rounded-full bg-white/70 px-2.5 py-0.5 text-xs font-semibold text-royal-deep ring-1 ring-white/80">
                  Planned
                </span>
              </GlassCard>
            </li>
          ))}
        </ul>

        <SeeAllLink href="/community" label="Visit the community" />
      </RevealOnScroll>
    </section>
  );
}
