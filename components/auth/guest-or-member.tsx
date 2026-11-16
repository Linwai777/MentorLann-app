import { Suspense, type ReactNode } from "react";
import { getSession } from "@/lib/session";

type SessionUser = NonNullable<Awaited<ReturnType<typeof getSession>>>["user"];

// Shows one thing to guests and another to logged-in members, on pages
// that everyone can open (like the home page and the header).
//
// How it stays fast: the GUEST version is the Suspense fallback, so it is
// part of the static page shell and appears at once. Then the session is
// checked on the server; for a member the member version streams in and
// replaces it (a member may see the guest version for a moment).
//
// The member version is only rendered on the server for members, so
// guests never receive it. It can be a function that gets the user
// (e.g. to show their name).
export function GuestOrMember({
  guest,
  member,
}: {
  guest: ReactNode;
  member: ReactNode | ((user: SessionUser) => ReactNode);
}) {
  return (
    <Suspense fallback={guest}>
      <Pick guest={guest} member={member} />
    </Suspense>
  );
}

async function Pick({
  guest,
  member,
}: {
  guest: ReactNode;
  member: ReactNode | ((user: SessionUser) => ReactNode);
}) {
  const session = await getSession();
  if (!session) return guest;
  return typeof member === "function" ? member(session.user) : member;
}
