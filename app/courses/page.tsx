import type { Metadata } from "next";
import Link from "next/link";
import { Lock } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { GlassCard } from "@/components/site/glass-card";
import { RevealOnScroll } from "@/components/site/reveal-on-scroll";
import { CourseCard } from "@/components/courses/course-card";
import { coursesForPath } from "@/components/courses/courses-data";
import { CAREER_PATHS } from "@/components/home/career-paths-data";

// The folder name app/courses/ becomes the URL /courses (App Router).
// "Courses" + the layout's template = "Courses | MentorLann" in the tab.
export const metadata: Metadata = {
  title: "Courses",
  description:
    "Free courses from trusted places like freeCodeCamp, Khan Academy and Adobe, put in order for each MentorLann career path.",
};

// Open paths get course lists; locked paths are listed as "coming".
const OPEN_PATHS = CAREER_PATHS.filter((path) => !path.locked);
const LOCKED_PATHS = CAREER_PATHS.filter((path) => path.locked);

export default function CoursesPage() {
  return (
    <>
      <PageHeader
        label="Courses"
        title="Free courses, picked for you."
        intro="We choose the best free lessons from trusted places like freeCodeCamp, Khan Academy and Adobe, and put them in order for each career path. Start at step 1."
      >
        {/* Jump links: plain anchor links to each path's section below.
            Works without any JavaScript (unlike a filter with state). */}
        <nav aria-label="Jump to a career path" className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {OPEN_PATHS.map(({ slug, title, icon: Icon }) => (
              <li key={slug}>
                <Link
                  href={`#${slug}`}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-white px-4 text-sm font-medium text-ink transition-colors duration-200 hover:border-royal hover:text-royal-deep"
                >
                  <Icon aria-hidden="true" className="size-4 text-royal" />
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </PageHeader>

      {OPEN_PATHS.map(({ slug, title, description, icon: Icon }, index) => {
        const courses = coursesForPath(slug);
        return (
          <section
            key={slug}
            id={slug}
            aria-labelledby={`${slug}-title`}
            // Alternate white / soft blue so each path reads as its own block
            className={`scroll-mt-24 py-16 md:py-20 ${
              index % 2 === 0 ? "bg-white" : "bg-surface-soft"
            }`}
          >
            <RevealOnScroll className="mx-auto w-full max-w-[1200px] px-4 sm:px-6">
              <div data-reveal className="flex items-start gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-royal/10 text-royal">
                  <Icon aria-hidden="true" className="size-6" />
                </span>
                <div>
                  <h2
                    id={`${slug}-title`}
                    className="font-display text-2xl font-bold text-ink sm:text-3xl"
                  >
                    {title}
                  </h2>
                  <p className="mt-1 text-ink-soft">
                    {description} {courses.length} free courses, in this order.
                  </p>
                </div>
              </div>

              {/* <ol>: the order is the roadmap (step 1 first) */}
              <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {courses.map((course) => (
                  <li key={course.id} data-reveal>
                    <CourseCard course={course} />
                  </li>
                ))}
              </ol>
            </RevealOnScroll>
          </section>
        );
      })}

      {/* The locked paths: honest "not yet", same wording as the home page */}
      <section
        aria-labelledby="more-paths-title"
        className="bg-white py-16 md:py-20"
      >
        <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6">
          <GlassCard className="p-6 sm:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2
                  id="more-paths-title"
                  className="font-display text-2xl font-semibold text-ink"
                >
                  More career paths are coming
                </h2>
                <p className="mt-2 text-ink-soft">
                  We will unlock these career paths and their courses later.
                </p>
              </div>
              <ul className="flex flex-wrap gap-2">
                {LOCKED_PATHS.map(({ slug, title }) => (
                  <li
                    key={slug}
                    className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/60 px-4 py-2 text-sm font-medium text-ink"
                  >
                    <Lock aria-hidden="true" className="size-4" />
                    {title}
                    <span className="sr-only">(locked)</span>
                  </li>
                ))}
              </ul>
            </div>
          </GlassCard>
          <p className="mt-6 text-sm text-ink-soft">
            All courses here are free to use. MentorLann is not paid by these
            providers; we choose them only because they are good for beginners.
          </p>
        </div>
      </section>
    </>
  );
}
