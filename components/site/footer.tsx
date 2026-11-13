import Image from "next/image";
import Link from "next/link";
import { cacheLife } from "next/cache";
import { Button } from "@/components/ui/button";
import { NAV_LINKS } from "@/components/site/nav-links";

// With Cache Components on, `new Date()` must be inside a "use cache" scope.
// The year is computed once, saved in the static page, and refreshed daily.
async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  return (
    // Dark navy section. `[--ring:...]` makes focus rings white inside the footer,
    // because the royal-blue ring is too faint on navy (2.4:1).
    <footer className="bg-ink text-white [--ring:var(--color-white)]">
      <div className="mx-auto grid w-full max-w-[1200px] gap-10 px-4 py-14 sm:px-6 md:grid-cols-12 md:py-20">
        {/* Brand and mission */}
        <div className="md:col-span-6">
          <Link
            href="/"
            aria-label="MentorLann, home"
            className="inline-flex min-h-11 items-center rounded-md"
          >
            {/* White version of the logo for the navy background */}
            <Image
              src="/brand/logo-white.svg"
              alt="" // the link's aria-label already names it
              width={764}
              height={160}
              className="h-11 w-auto"
            />
          </Link>
          <p className="mt-4 font-display text-xl leading-tight font-semibold text-balance sm:text-2xl">
            Learn Together. Grow Together.
          </p>
          <p className="mt-3 max-w-md text-white/75">
            A free community where learners find resources, meet mentors and
            grow their careers.
          </p>
        </div>

        {/* Site links (same list as the Header) */}
        <nav aria-label="Footer" className="md:col-span-3">
          <h2 className="text-xs font-semibold tracking-[0.08em] text-white/75 uppercase">
            Explore
          </h2>
          <ul className="mt-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center text-white/90 underline-offset-4 transition-colors duration-200 hover:text-white hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Call to action */}
        <div className="md:col-span-3">
          <h2 className="text-xs font-semibold tracking-[0.08em] text-white/75 uppercase">
            Get started
          </h2>
          <p className="mt-3 text-white/75">
            Join free and find your next step.
          </p>
          {/* Light button: a royal button would blend into the navy background */}
          <Button asChild variant="secondary" className="mt-4">
            <Link href="/#join">Join free</Link>
          </Button>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/15">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-2 px-4 py-6 text-sm text-white/75 sm:px-6 md:flex-row md:justify-between">
          <p>
            &copy; <CopyrightYear /> MentorLann. All rights reserved.
          </p>
          <p>Designed and built by Lin Wai Khant Paing with Next.js</p>
        </div>
      </div>
    </footer>
  );
}
