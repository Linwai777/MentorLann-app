import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/lib/auth";

// One catch-all route for every Better Auth request:
// /api/auth/sign-up/email, /api/auth/sign-in/email, /api/auth/sign-out,
// /api/auth/get-session, ...
// "[...all]" matches any path after /api/auth/, and toNextJsHandler turns
// the auth object into the GET and POST functions Next.js expects.
export const { GET, POST } = toNextJsHandler(auth);
