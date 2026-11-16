import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { safeNextPath } from "@/lib/validation/auth";

// On /log-in and /sign-up: someone who is ALREADY logged in has nothing
// to do here, so send them on (to ?next=... or home).
//
// It checks the real session (not just "is there a cookie"): with an old,
// expired cookie the person simply stays on the page and can log in.
// Inside <Suspense> so the form itself still loads at once.
export function RedirectMembers({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <Suspense fallback={null}>
      <Check searchParams={searchParams} />
    </Suspense>
  );
}

async function Check({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const session = await getSession();
  if (session) {
    const { next } = await searchParams;
    redirect(safeNextPath(next));
  }
  return null;
}
