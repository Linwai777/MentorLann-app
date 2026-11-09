// Temporary placeholder so the Header can be tested while scrolling.
// Replaced by the cinematic Hero in the next step.
export default function Home() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-24 sm:px-6">
      <p className="text-xs font-semibold tracking-[0.08em] text-signal-text uppercase">
        Placeholder
      </p>
      <h1 className="mt-3 max-w-2xl font-display text-5xl leading-[1.1] tracking-tight text-ink">
        Hero section comes next.
      </h1>
      <div className="h-[120vh]" aria-hidden="true" />
    </div>
  );
}
