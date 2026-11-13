import { Hero } from "@/components/home/hero";
import { CareerPaths } from "@/components/home/career-paths";

// Home page. Each section is its own component in components/home/,
// added one at a time (see SPEC.md for the order).
export default function Home() {
  return (
    <>
      <Hero />
      <CareerPaths />
    </>
  );
}
