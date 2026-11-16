"use client";

import { useActionState } from "react";
import { logIn } from "@/lib/auth-actions";
import type { AuthFormState } from "@/lib/validation/auth";
import {
  Field,
  FormMessage,
  PasswordField,
  SubmitButton,
} from "@/components/auth/form-fields";
import { useFocusFirstError } from "@/components/auth/use-focus-first-error";
import { NextPathField } from "@/components/auth/next-path";

const initialState: AuthFormState = {};

// Same pattern as SignUpForm (see the comments there), with 2 fields.
export function LogInForm() {
  const [state, formAction, pending] = useActionState(logIn, initialState);
  const formRef = useFocusFirstError(state);

  return (
    <form ref={formRef} action={formAction} noValidate>
      <FormMessage message={state.message} />
      {/* The page to return to after success (?next=...) */}
      <NextPathField />

      <div className="space-y-5">
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
          // current-password: password managers fill the saved one
          autoComplete="current-password"
          required
          error={state.errors?.password?.[0]}
        />
        <SubmitButton
          pending={pending}
          label="Log in"
          pendingLabel="Logging in…"
        />
      </div>
    </form>
  );
}
