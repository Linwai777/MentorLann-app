import { RevealOnScroll } from "@/components/site/reveal-on-scroll";
import { VlogCard } from "@/components/vlogs/vlog-card";
import { VLOGS_NEWEST_FIRST } from "@/components/vlogs/vlogs-data";
import { SectionHeading, SeeAllLink } from "@/components/home/section-parts";

// Home page teaser for /vlogs: the 3 newest vlogs, as the same cards the
// Vlogs page uses (one card component, two places).
export function VlogsPreview() {
  const latest = VLOGS_NEWEST_FIRST.slice(0, 3);
  // Nothing to show yet: leave the section out instead of an empty block
  if (latest.length === 0) return null;

  return (
    <section
      id="vlogs"
      aria-labelledby="vlogs-title"
      className="scroll-mt-28 bg-surface-soft py-20 md:py-28"
    >
      <RevealOnScroll className="mx-auto w-full max-w-[1200px] px-4 sm:px-6">
        <SectionHeading
          id="vlogs-title"
          number="04"
          label="Knowledge-sharing vlogs"
          title="Learn from people on the same path."
          intro="Short articles and videos where learners and mentors share tips, first jobs, mistakes and wins."
        />

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((vlog) => (
            <li key={vlog.slug} data-reveal>
              <VlogCard vlog={vlog} />
            </li>
          ))}
        </ul>

        <SeeAllLink href="/vlogs" label="See all vlogs" />
      </RevealOnScroll>
    </section>
  );
}
