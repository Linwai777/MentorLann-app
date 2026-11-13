import type { Metadata } from "next";
import { Users } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { ComingSoon } from "@/components/site/coming-soon";

// URL: /community. Title in the tab: "Community | MentorLann".
export const metadata: Metadata = {
  title: "Community",
  description:
    "A free community for learners from Myanmar and beyond, starting in Dubai. Learn together and grow together.",
};

export default function CommunityPage() {
  return (
    <>
      <PageHeader
        label="Community"
        title="Grow together with people like you."
        intro="A free community for learners from Myanmar and beyond, starting in Dubai."
      />
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6">
          {/* The community is just starting: no invented members or stories */}
          <ComingSoon
            icon={Users}
            title="Our community is just starting"
            text="Study groups, meetups and mentor chats are coming. Be one of the first members."
          />
        </div>
      </section>
    </>
  );
}
