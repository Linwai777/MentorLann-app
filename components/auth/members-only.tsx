import { Suspense, type ReactNode } from "react";
import { requireUser } from "@/lib/session";

// Wrap members-only content with this (used by the layouts of /community,
// /vlogs and /courses). It is the REAL lock: proxy.ts only checks that a
// cookie exists, this checks the session in the database.
//
// Why <Suspense>: with cacheComponents, reading cookies is request-time
// work and must sit inside a Suspense boundary. The header and footer
// still load at once from the static shell; this part streams in after
// the check. Guests never receive the members-only HTML, because the
// children are only rendered after requireUser() lets them through.
//
// next: the page to come back to after log in. It can be a Promise (the
// vlog article builds it from `params`), so it is read inside Suspense.
export function MembersOnly({
  next,
  children,
}: {
  next: string | Promise<string>;
  children: ReactNode;
}) {
  return (
    <Suspense fallback={<CheckingAccount />}>
      <Gate next={next}>{children}</Gate>
    </Suspense>
  );
}

async function Gate({
  next,
  children,
}: {
  next: string | Promise<string>;
  children: ReactNode;
}) {
  await requireUser(await next); // guests are redirected to /log-in here
  return children;
}

// Shown for a moment while the session is checked: an empty soft-blue
// area (same color as the page headers, so nothing flashes) that keeps
// the footer from jumping up. Screen readers hear a short status.
function CheckingAccount() {
  return (
    <div aria-busy="true" className="min-h-[70vh] bg-surface-soft">
      <p role="status" className="sr-only">
        Checking your account…
      </p>
    </div>
  );
}
