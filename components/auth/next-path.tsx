"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// Helpers that carry ?next=... (the page a guest wanted) through the
// log-in and sign-up pages.
//
// useSearchParams reads the URL in the browser. With cacheComponents it
// must sit inside <Suspense>: the page itself is prerendered without the
// query string, and these small parts fill it in when the page loads.

// A hidden form field: sends "next" to the Server Action with the form.
export function NextPathField() {
  return (
    <Suspense fallback={null}>
      <NextPathInput />
    </Suspense>
  );
}

function NextPathInput() {
  const next = useSearchParams().get("next");
  return next ? <input type="hidden" name="next" value={next} /> : null;
}

// A link to the other auth page that keeps ?next=..., so a guest who
// switches from "Log in" to "Join free" still comes back to their page.
// replace: switching does not add a history step, so closing the popup
// (router.back) returns to the page underneath, not to the other form.
export function AuthSwitchLink({
  href,
  children,
  className,
}: {
  href: "/log-in" | "/sign-up";
  children: string;
  className?: string;
}) {
  const plain = (
    <Link href={href} replace className={className}>
      {children}
    </Link>
  );
  return (
    <Suspense fallback={plain}>
      <SwitchLinkWithNext href={href} className={className}>
        {children}
      </SwitchLinkWithNext>
    </Suspense>
  );
}

function SwitchLinkWithNext({
  href,
  children,
  className,
}: {
  href: string;
  children: string;
  className?: string;
}) {
  const next = useSearchParams().get("next");
  const target = next ? `${href}?next=${encodeURIComponent(next)}` : href;
  return (
    <Link href={target} replace className={className}>
      {children}
    </Link>
  );
}
