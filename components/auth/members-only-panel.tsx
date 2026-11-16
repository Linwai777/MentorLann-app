import Link from "next/link";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

// What a guest sees on a members-only page (/community, /vlogs, an
// article, /courses), under the page header: a lock, "Members only" and
// two buttons. Both buttons remember this page (?next=...), so after
// joining or logging in the guest comes straight back here.
export function MembersOnlyPanel({
  what,
  next,
}: {
  /** What is locked, for the sentence, e.g. "all the vlogs" */
  what: string;
  /** This page's path, e.g. "/vlogs" */
  next: string;
}) {
  const query = `?next=${encodeURIComponent(next)}`;

  return (
    <section
      aria-labelledby="members-only-title"
      className="bg-white py-16 md:py-24"
    >
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6">
        <div className="mx-auto max-w-md rounded-2xl border border-line bg-white p-6 text-center shadow-glass sm:p-8">
          {/* lock-shake (globals.css): the lock shakes on hover */}
          <span className="lock-shake mx-auto grid size-14 place-items-center rounded-full bg-royal/10 text-royal-deep ring-1 ring-royal/20">
            <Lock aria-hidden="true" className="size-6" />
          </span>
          {/* h2: the page's h1 is in the page header above */}
          <h2
            id="members-only-title"
            className="mt-4 font-display text-2xl font-semibold text-ink"
          >
            Members only
          </h2>
          <p className="mt-2 text-ink-soft">
            Create a free account to see {what}. It takes under a minute.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild className="w-full sm:w-auto">
              <Link href={`/sign-up${query}`}>Join free</Link>
            </Button>
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link href={`/log-in${query}`}>Log in</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
