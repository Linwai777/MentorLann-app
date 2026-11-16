"use client";

import { useState, type ComponentProps } from "react";
import { CircleAlert, Eye, EyeOff, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

// Small form pieces shared by the sign-up and log-in forms.

// Input look: white box, 48px tall, 16px text (smaller text makes iPhones
// zoom in on focus), 8px radius. The border is ink-soft, not --edge:
// --edge is only 2.4:1 on the aqua glass, ink-soft keeps it above 3:1.
// aria-invalid (set when the field has an error) turns the border red.
const inputClass =
  "block h-12 w-full rounded-lg border border-ink-soft bg-white px-3.5 text-base text-ink aria-invalid:border-2 aria-invalid:border-destructive-ink";

type FieldProps = {
  name: string;
  label: string;
  hint?: string;
  error?: string;
} & Omit<ComponentProps<"input">, "name" | "id">;

// A text field: visible label + input + optional hint + error under it.
// aria-describedby links the hint and the error to the input, so a screen
// reader reads them together with the label when the input gets focus.
export function Field({ name, label, hint, error, ...inputProps }: FieldProps) {
  const id = `field-${name}`;
  const describedBy =
    [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div>
      <label htmlFor={id} className="block font-semibold text-ink">
        {label}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="text-sm text-ink-soft">
          {hint}
        </p>
      )}
      <input
        id={id}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={`mt-1.5 ${inputClass}`}
        {...inputProps}
      />
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

// A password field with a Show / Hide button inside the box on the right.
export function PasswordField({
  name,
  label,
  hint,
  error,
  ...inputProps
}: FieldProps) {
  const [visible, setVisible] = useState(false);
  const id = `field-${name}`;
  const describedBy =
    [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div>
      <label htmlFor={id} className="block font-semibold text-ink">
        {label}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="text-sm text-ink-soft">
          {hint}
        </p>
      )}
      <div className="relative mt-1.5">
        <input
          id={id}
          name={name}
          // type switches between "password" (dots) and "text" (readable)
          type={visible ? "text" : "password"}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={`${inputClass} pr-12`}
          {...inputProps}
        />
        {/* type="button": clicking it must NOT send the form.
            aria-pressed tells screen readers if the password is shown;
            the label stays the same ("Show password"), as WAI-ARIA asks
            for toggle buttons. 44x44px touch target. */}
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-pressed={visible}
          aria-controls={id}
          aria-label="Show password"
          className="absolute inset-y-0.5 right-0.5 flex w-11 items-center justify-center rounded-md text-ink-soft transition-colors duration-150 hover:text-royal-deep"
        >
          {visible ? (
            <EyeOff aria-hidden="true" className="size-5" />
          ) : (
            <Eye aria-hidden="true" className="size-5" />
          )}
        </button>
      </div>
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

// The red message under a field. The icon means color is not the only
// signal (DESIGN.md: "color is never the only signal").
function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p
      id={id}
      className="mt-1.5 flex items-start gap-1.5 text-sm font-medium text-destructive-ink"
    >
      <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
      {message}
    </p>
  );
}

// One message for the whole form (e.g. "Email or password is not correct").
// role="alert": screen readers read it out as soon as it appears.
export function FormMessage({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p
      role="alert"
      className="mb-5 flex items-start gap-2 rounded-lg border border-destructive-ink/40 bg-white px-3.5 py-3 text-sm font-medium text-destructive-ink"
    >
      <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
      {message}
    </p>
  );
}

// The submit button. While the form is being sent (pending) it is
// disabled, so it cannot be sent twice, and shows a spinner + new label.
export function SubmitButton({
  pending,
  label,
  pendingLabel,
}: {
  pending: boolean;
  label: string;
  pendingLabel: string;
}) {
  return (
    <Button type="submit" disabled={pending} className="mt-2 w-full">
      {pending && (
        <LoaderCircle
          aria-hidden="true"
          className="size-5 motion-safe:animate-spin"
        />
      )}
      {pending ? pendingLabel : label}
    </Button>
  );
}
