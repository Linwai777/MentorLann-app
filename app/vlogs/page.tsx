import type { Metadata } from "next";
import { Video } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { ComingSoon } from "@/components/site/coming-soon";

// URL: /vlogs. Title in the tab: "Vlogs | MentorLann".
export const metadata: Metadata = {
  title: "Vlogs",
  description:
    "Short knowledge-sharing videos where MentorLann learners and mentors share what they know.",
};

export default function VlogsPage() {
  return (
    <>
      <PageHeader
        label="Knowledge-sharing vlogs"
        title="Learn from people on the same path."
        intro="Short videos where learners and mentors share what they know: tips, first jobs, mistakes and wins."
      />
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6">
          {/* No videos yet: an honest message instead of fake ones */}
          <ComingSoon
            icon={Video}
            title="The first vlogs are coming soon"
            text="Our YouTube channel is just starting. The first videos will appear here."
          />
        </div>
      </section>
    </>
  );
}
