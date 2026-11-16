"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { APIError } from "better-auth/api";
import { auth } from "@/lib/auth";
import {
  logInSchema,
  safeNextPath,
  signUpSchema,
  type AuthFormState,
} from "@/lib/validation/auth";

// Server Actions: functions that run on the SERVER when a form is sent.
// The forms call them through useActionState, so each one receives the
// previous state first and the form data second, and returns the new
// state (errors) when something is wrong.
// On success they do not return: redirect() sends the person on.

// FormData.get() returns a string, a File or null; we only want text.
function text(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value : "";
}

export async function signUp(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const values = { name: text(formData, "name"), email: text(formData, "email") };

  // 1. Check the fields. If a rule fails, send the messages back.
  const parsed = signUpSchema.safeParse({
    ...values,
    password: text(formData, "password"),
  });
  if (!parsed.success) {
    return { errors: z.flattenError(parsed.error).fieldErrors, values };
  }

  // 2. Create the user. Better Auth hashes the password, saves the user,
  //    and (with the nextCookies plugin) sets the login cookie.
  try {
    await auth.api.signUpEmail({
      body: parsed.data,
      headers: await headers(),
    });
  } catch (error) {
    // The code is USER_ALREADY_EXISTS (or a longer variant of it).
    const code = error instanceof APIError ? error.body?.code : undefined;
    if (code?.startsWith("USER_ALREADY_EXISTS")) {
      return {
        errors: { email: ["An account with this email already exists. Log in instead."] },
        values,
      };
    }
    return { message: "Something went wrong. Please try again.", values };
  }

  // 3. Signed up and logged in: go to the page they wanted (?next=...),
  //    or home. redirect() must stay OUTSIDE try/catch: it works by
  //    throwing, and the catch above would swallow it.
  redirect(safeNextPath(formData.get("next")));
}

export async function logIn(
  _prev: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const values = { email: text(formData, "email") };

  const parsed = logInSchema.safeParse({
    ...values,
    password: text(formData, "password"),
  });
  if (!parsed.success) {
    return { errors: z.flattenError(parsed.error).fieldErrors, values };
  }

  try {
    await auth.api.signInEmail({
      body: parsed.data,
      headers: await headers(),
    });
  } catch (error) {
    // Same message for "no such email" and "wrong password": telling them
    // apart would let strangers find out who has an account.
    if (error instanceof APIError && error.status === "UNAUTHORIZED") {
      return { message: "Email or password is not correct.", values };
    }
    return { message: "Something went wrong. Please try again.", values };
  }

  redirect(safeNextPath(formData.get("next")));
}
