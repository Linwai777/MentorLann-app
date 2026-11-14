import { RevealOnScroll } from "@/components/site/reveal-on-scroll";
import { CourseCard } from "@/components/courses/course-card";
import { coursesForPath } from "@/components/courses/courses-data";
import { CAREER_PATHS } from "@/components/home/career-paths-data";
import { SectionHeading, SeeAllLink } from "@/components/home/section-parts";

// Home page teaser for /courses: the first course (Step 1) of each open
// career path, because that is where every learner should begin.
export function CoursesPreview() {
  const firstSteps = CAREER_PATHS.filter((path) => !path.locked).flatMap(
    (path) => {
      const first = coursesForPath(path.slug)[0];
      return first ? [{ path, course: first }] : [];
    },
  );

  return (
    <section
      id="courses"
      aria-labelledby="courses-title"
      className="scroll-mt-28 bg-white py-20 md:py-28"
    >
      <RevealOnScroll className="mx-auto w-full max-w-[1200px] px-4 sm:px-6">
        <SectionHeading
          id="courses-title"
          number="05"
          label="Free courses"
          title="Start with step 1 today."
          intro="The best free lessons from trusted places like freeCodeCamp, Khan Academy and Adobe, put in order for each career path."
        />

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {firstSteps.map(({ path, course }) => {
            const Icon = path.icon;
            return (
              <li key={course.id} data-reveal className="flex flex-col">
                {/* Which path this first step belongs to */}
                <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-ink">
                  <Icon aria-hidden="true" className="size-4 text-royal" />
                  {path.title}
                </p>
                <div className="flex-1">
                  <CourseCard course={course} />
                </div>
              </li>
            );
          })}
        </ul>

        <SeeAllLink href="/courses" label="Browse all free courses" />
      </RevealOnScroll>
    </section>
  );
}
