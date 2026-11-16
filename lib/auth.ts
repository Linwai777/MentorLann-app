import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { prisma } from "@/lib/prisma";

// The Better Auth server: one object that knows how to sign people up,
// log them in and out, and check who is logged in. Server code only.
//
// Better Auth reads two secrets from .env.local by itself, so they are
// not written here:
// - BETTER_AUTH_SECRET: signs the session cookies, so nobody can fake one
// - BETTER_AUTH_URL: the site address (http://localhost:3000 for now)
export const auth = betterAuth({
  // Save users and sessions in our Postgres database through Prisma.
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  // Login method for Phase 2: email + password only (no Google etc. yet).
  // Passwords are stored hashed (scrypt), never as plain text.
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },

  plugins: [
    // Lets Server Actions set the login cookie in Next.js.
    // Must stay the LAST plugin in this list.
    nextCookies(),
  ],
});
