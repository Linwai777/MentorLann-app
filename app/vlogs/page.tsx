import type { Metadata } from "next";
import { Video } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { ComingSoon } from "@/components/site/coming-soon";
import { RevealOnScroll } from "@/components/site/reveal-on-scroll";
import { VlogCard } from "@/components/vlogs/vlog-card";
import { VLOGS_NEWEST_FIRST } from "@/components/vlogs/vlogs-data";

// URL: /vlogs. Title in the tab: "Vlogs | MentorLann".
export const metadata: Metadata = {
  title: "Vlogs",
  description:
    "Knowledge-sharing vlogs from MentorLann: short articles and videos where learners and mentors share what they know.",
};

export default function VlogsPage() {
  return (
    <>
      <PageHeader
        label="Knowledge-sharing vlogs"
        title="Learn from people on the same path."
        intro="Short articles and videos where learners and mentors share what they know: tips, first jobs, mistakes and wins."
      />
      <section aria-label="All vlogs" className="bg-white py-16 md:py-24">
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6">
          {VLOGS_NEWEST_FIRST.length > 0 ? (
            <RevealOnScroll>
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {VLOGS_NEWEST_FIRST.map((vlog) => (
                  <li key={vlog.slug} data-reveal>
                    <VlogCard vlog={vlog} />
                  </li>
                ))}
              </ul>
              {/* Honest status of the video side */}
              <p data-reveal className="mt-10 text-sm text-ink-soft">
                Video vlogs are coming soon on our YouTube channel and Facebook
                page.
              </p>
            </RevealOnScroll>
          ) : (
            // Kept for safety: if the list is ever empty, say so honestly
            <ComingSoon
              icon={Video}
              title="The first vlogs are coming soon"
              text="Our YouTube channel is just starting. The first videos will appear here."
            />
          )}
        </div>
      </section>
    </>
  );
}
