import { z } from "zod";

// The rules for the sign-up and log-in forms, written once with Zod.
// The Server Actions check every form against these rules on the server,
// because anything that comes from the browser can be changed by the user.
// The messages are the exact words shown under each field.

// Email: remove spaces, make it lowercase, THEN check that it is an email.
// pipe() runs the email check after the clean-up, so " Lin@Mail.com "
// is accepted and saved as "lin@mail.com" (one account per address).
const email = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, "Enter your email address.")
  .pipe(z.email("Enter a valid email address, like name@example.com."));

export const signUpSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your name (at least 2 characters).")
    .max(60, "Use 60 characters or fewer."),
  email,
  // Same limits as lib/auth.ts (min 8). Max 128 stops huge inputs.
  // No trim: spaces can be part of a password.
  password: z
    .string()
    .min(8, "Use at least 8 characters.")
    .max(128, "Use 128 characters or fewer."),
});

export const logInSchema = z.object({
  email,
  // Log in only checks that something was typed; the real check is
  // Better Auth comparing it with the saved hash.
  password: z.string().min(1, "Enter your password."),
});

// Where to go after logging in / signing up: the "next" value from the
// URL (?next=/courses), set when a guest was sent to log in.
// It comes from the URL, so anyone can change it. Only paths on THIS site
// are allowed ("/courses"); "https://evil.com" or "//evil.com" (which a
// browser also treats as another site) fall back to the home page.
// Without this check the page would be an "open redirect" that attackers
// could use in phishing links.
export function safeNextPath(value: unknown): string {
  if (typeof value !== "string") return "/";
  if (!value.startsWith("/") || value.startsWith("//") || value.startsWith("/\\")) {
    return "/";
  }
  return value;
}

// What a form action sends back to the form after a failed try.
// - errors: messages per field, shown under that field
// - message: one message for the whole form (e.g. wrong password)
// - values: what the person typed, to fill the fields again.
//   The password is never sent back.
export type AuthFormState = {
  errors?: Partial<Record<"name" | "email" | "password", string[]>>;
  message?: string;
  values?: { name?: string; email?: string };
};
