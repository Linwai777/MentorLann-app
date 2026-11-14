import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

// The aqua glass block (DESIGN.md "glass card"), as one reusable piece:
// tint + a thin navy edge (darker on top) + a white inner highlight +
// shadow-glass (above and below) + 3 light reflections. Any section can use it
// and only adds its own content and padding.
// cn() merges class names, so a caller can add classes (e.g. "p-5").
export function GlassCard({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        // isolate: the reflection layers (-z-10) stay inside this card,
        // above its background but under the text.
        "relative isolate overflow-hidden rounded-2xl border border-ink/10 border-t-ink/20 bg-glass-tint/80 shadow-glass inset-shadow-sm inset-shadow-white/90",
        className,
      )}
      {...props}
    >
      {/* Reflection 1: a soft shine from the top-left corner */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-br from-white/80 via-white/0 via-40% to-transparent"
      />
      {/* Reflection 2: a diagonal light band (gradient at 115 degrees) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-linear-115 from-transparent from-50% via-white/60 via-62% to-transparent to-75%"
      />
      {/* Reflection 3: a thin bright line along the top edge */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 top-0 -z-10 h-px bg-linear-to-r from-transparent via-white to-transparent"
      />
      {children}
    </div>
  );
}
