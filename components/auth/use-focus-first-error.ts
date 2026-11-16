"use client";

import { useEffect, useRef } from "react";
import type { AuthFormState } from "@/lib/validation/auth";

// After a failed submit, move keyboard focus to the first field with an
// error. A screen reader then reads that field's label and its error, and
// keyboard users can fix it right away. Returns a ref for the <form>.
export function useFocusFirstError(state: AuthFormState) {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const first = formRef.current?.querySelector<HTMLElement>(
      '[aria-invalid="true"]',
    );
    first?.focus();
  }, [state]);

  return formRef;
}
