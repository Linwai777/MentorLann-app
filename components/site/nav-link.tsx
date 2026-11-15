"use client";

import { Suspense, type ComponentProps } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = ComponentProps<typeof Link> & { href: string };

// A navigation link that knows when it points at the page you are on.
// It then gets aria-current="page": screen readers say "current page",
// and the header styles it with aria-[current=page]:... classes.
//
// Only real pages (/courses, /vlogs, /community) can be "current".
// Home sections like "/#paths" never are: the URL alone cannot tell
// which section you are looking at.
export function NavLink(props: NavLinkProps) {
  // usePathname() reads the URL. With cacheComponents, Next.js needs a
  // <Suspense> boundary around it: while the URL is not known yet (for
  // example an unknown /vlogs/<slug>), the fallback shows the same link
  // without the highlight, so nothing jumps.
  return (
    <Suspense fallback={<Link {...props} />}>
      <ActiveLink {...props} />
    </Suspense>
  );
}

function ActiveLink({ href, ...props }: NavLinkProps) {
  const pathname = usePathname();
  const isPage = !href.includes("#");
  // "/vlogs" is current on /vlogs and on /vlogs/how-to-use-free-courses
  const isCurrent =
    isPage && (pathname === href || pathname.startsWith(`${href}/`));

  return (
    <Link
      href={href}
      aria-current={isCurrent ? "page" : undefined}
      {...props}
    />
  );
}
