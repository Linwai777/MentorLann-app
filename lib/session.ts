import "server-only";

import { cache } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

// The ONE place that answers "who is logged in?" (a "Data Access Layer").
// Every page or component that needs the user asks here, so the rule
// lives in one file instead of being copied everywhere.

// getSession: reads the login cookie and checks it with Better Auth
// (in the database), returns { user, session } or null.
// cache(): if 3 components ask during the same request, the database is
// asked only once.
export const getSession = cache(async () => {
  return auth.api.getSession({ headers: await headers() });
});

// requireUser: for members-only content. A guest (or an expired login)
// is sent to the log-in page; "next" remembers where they wanted to go,
// so after logging in they come straight back.
export async function requireUser(nextPath: string) {
  const session = await getSession();
  if (!session) {
    redirect(`/log-in?next=${encodeURIComponent(nextPath)}`);
  }
  return session.user;
}
