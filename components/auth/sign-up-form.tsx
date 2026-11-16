"use client";

import { useActionState } from "react";
import { signUp } from "@/lib/auth-actions";
import type { AuthFormState } from "@/lib/validation/auth";
import {
  Field,
  FormMessage,
  PasswordField,
  SubmitButton,
} from "@/components/auth/form-fields";
import { useFocusFirstError } from "@/components/auth/use-focus-first-error";

const initialState: AuthFormState = {};

export function SignUpForm() {
  // useActionState connects the form to the signUp Server Action:
  // - state: what the action returned last time (errors, typed values)
  // - formAction: goes into <form action>, sends the form to the server
  // - pending: true while the server is working
  const [state, formAction, pending] = useActionState(signUp, initialState);
  const formRef = useFocusFirstError(state);

  return (
    // noValidate: skip the browser's own popup bubbles, so every error
    // looks the same and comes from our Zod rules on the server.
    // The form also works before JavaScript loads (plain form post).
    <form ref={formRef} action={formAction} noValidate>
      <FormMessage message={state.message} />

      <div className="space-y-5">
        <Field
          name="name"
          label="Your name"
          autoComplete="name"
          required
          defaultValue={state.values?.name}
          error={state.errors?.name?.[0]}
        />
        <Field
          name="email"
          label="Email"
          type="email"
          inputMode="email"
          autoComplete="email"
          spellCheck={false}
          required
          defaultValue={state.values?.email}
          error={state.errors?.email?.[0]}
        />
        <PasswordField
          name="password"
          label="Password"
          hint="At least 8 characters."
          // new-password: password managers offer to create a strong one
          autoComplete="new-password"
          required
          error={state.errors?.password?.[0]}
        />
        <SubmitButton
          pending={pending}
          label="Create free account"
          pendingLabel="Creating your account…"
        />
      </div>
    </form>
  );
}
