import "server-only";

import { cache } from "react";
import { headers } from "next/headers";
import { connection } from "next/server";
import { auth } from "@/lib/auth";

// The ONE place that answers "who is logged in?" (a "Data Access Layer").
// Every page or component that needs the user asks here, so the rule
// lives in one file instead of being copied everywhere.

// getSession: reads the login cookie and checks it with Better Auth
// (in the database), returns { user, session } or null.
// cache(): if 3 components ask during the same request, the database is
// asked only once.
export const getSession = cache(async () => {
  // connection(): "this must run at request time, never in a prerender".
  // Checking a session compares its expiry date with the current time
  // (new Date() inside Better Auth), and Next.js does not allow reading
  // the current time while prerendering, even a prerender that already
  // has the request headers (it does one after a log-in redirect).
  await connection();
  return auth.api.getSession({ headers: await headers() });
});

