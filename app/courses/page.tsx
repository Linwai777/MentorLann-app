import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { ComingSoon } from "@/components/site/coming-soon";

// The folder name app/courses/ becomes the URL /courses (App Router).
// "Courses" + the layout's template = "Courses | MentorLann" in the tab.
export const metadata: Metadata = {
  title: "Courses",
  description:
    "Free courses from trusted places like freeCodeCamp, Google and Microsoft Learn, put in order for each MentorLann career path.",
};

export default function CoursesPage() {
  return (
    <>
      <PageHeader
        label="Courses"
        title="Free courses, picked for you."
        intro="We choose the best free lessons from trusted places like freeCodeCamp, Google and Microsoft Learn, and put them in order for each career path."
      />
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6">
          {/* Placeholder until the course list is built (next step) */}
          <ComingSoon
            icon={BookOpen}
            title="The course list is on its way"
            text="We are choosing the first free courses for each career path. Check back soon."
          />
        </div>
      </section>
    </>
  );
}
