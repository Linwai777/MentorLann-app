import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Small shared pieces for the home page preview sections, so all three
// (Community, Vlogs, Courses) start and end the same way.

// Section label (node + number + uppercase label) + h2 + short intro.
// The h2 gets an id so the <section> can point at it with aria-labelledby.
export function SectionHeading({
  id,
  number,
  label,
  title,
  intro,
}: {
  id: string;
  number: string;
  label: string;
  title: string;
  intro: string;
}) {
  return (
    <div data-reveal>
      <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.12em] text-royal-deep uppercase">
        <span
          aria-hidden="true"
          className="size-3 rounded-full bg-royal ring-4 ring-royal/15"
        />
        <span aria-hidden="true">{number}</span>
        {label}
      </p>
      <div className="mt-4 max-w-2xl">
        <h2
          id={id}
          className="font-display text-3xl leading-tight font-bold tracking-tight text-ink sm:text-4xl md:text-5xl"
        >
          {title}
        </h2>
        <p className="mt-4 text-base text-ink-soft sm:text-lg">{intro}</p>
      </div>
    </div>
  );
}

// "See all ..." link at the end of a preview: the one next step.
export function SeeAllLink({ href, label }: { href: string; label: string }) {
  return (
    <div data-reveal className="mt-10">
      <Link
        href={href}
        className="group inline-flex min-h-11 items-center gap-2 rounded-md font-semibold text-royal-deep underline-offset-4 hover:underline"
      >
        {label}
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-200 group-hover:translate-x-1"
        />
      </Link>
    </div>
  );
}
