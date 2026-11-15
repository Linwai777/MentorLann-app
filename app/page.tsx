import { Hero } from "@/components/home/hero";
import { CareerPaths } from "@/components/home/career-paths";
import { HowItWorks } from "@/components/home/how-it-works";
import { CommunityPreview } from "@/components/home/community-preview";
import { VlogsPreview } from "@/components/home/vlogs-preview";
import { CoursesPreview } from "@/components/home/courses-preview";
import { FinalCta } from "@/components/home/final-cta";

// Home page. Each section is its own component in components/home/,
// added one at a time (see SPEC.md for the order).
export default function Home() {
  return (
    <>
      <Hero />
      <CareerPaths />
      <HowItWorks />
      <CommunityPreview />
      <VlogsPreview />
      <CoursesPreview />
      <FinalCta />
    </>
  );
}
