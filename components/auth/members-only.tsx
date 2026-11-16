import { Suspense, type ReactNode } from "react";
import { getSession } from "@/lib/session";
import { MembersOnlyPanel } from "@/components/auth/members-only-panel";

// Wrap members-only content with this, INSIDE the page (/community,
// /vlogs, each article, /courses). It checks the session in the database:
// - member: sees the page (children)
// - guest: stays on the page and sees `guest` (the page header) plus the
//   "Members only" panel with Join free / Log in.
//
// Why <Suspense>: with cacheComponents, reading cookies is request-time
// work and must sit inside a Suspense boundary. The header and footer
// still load at once from the static shell; this part streams in after
// the check. Guests never receive the members-only HTML, because the
// children are only rendered for a logged-in member.
//
// next: this page's path, for the buttons' ?next=. It can be a Promise
// (the vlog article builds it from `params`), so it is read inside Suspense.
export function MembersOnly({
  next,
  what,
  guest,
  children,
}: {
  next: string | Promise<string>;
  /** For the panel sentence: "Create a free account to see {what}." */
  what: string;
  /** Shown to guests above the panel (usually the page header) */
  guest: ReactNode;
  children: ReactNode;
}) {
  return (
    <Suspense fallback={<CheckingAccount />}>
      <Gate next={next} what={what} guest={guest}>
        {children}
      </Gate>
    </Suspense>
  );
}

async function Gate({
  next,
  what,
  guest,
  children,
}: {
  next: string | Promise<string>;
  what: string;
  guest: ReactNode;
  children: ReactNode;
}) {
  const session = await getSession();
  if (session) return children;

  return (
    <>
      {guest}
      <MembersOnlyPanel what={what} next={await next} />
    </>
  );
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
