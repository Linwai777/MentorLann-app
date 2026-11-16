import Link from "next/link";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import { GuestOrMember } from "@/components/auth/guest-or-member";
import { logOut } from "@/lib/auth-actions";

// The account part of the header: "Log in" + "Join free" for guests,
// the member's name + "Log out" for members. One version for the desktop
// bar, one for the bottom of the mobile menu.

// "Lin Wai Khant" -> "LW": initials for the small round badge.
function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]!.toUpperCase())
    .join("");
}

// Log out is a <form> with a Server Action (not a link): logging out
// changes data, and forms work even before JavaScript loads.
function LogOutButton({ className }: { className?: string }) {
  return (
    <form action={logOut}>
      <Button type="submit" variant="outline" className={className}>
        <LogOut aria-hidden="true" />
        Log out
      </Button>
    </form>
  );
}

// Desktop bar (from 768px; the phone bar only has the menu button).
export function DesktopAccount() {
  return (
    <GuestOrMember
      guest={
        <div className="hidden items-center gap-1 md:flex">
          <Link
            href="/log-in"
            className="inline-flex min-h-11 items-center rounded-lg px-3 text-[15px] font-medium whitespace-nowrap text-ink transition-colors duration-200 hover:bg-white/60 hover:text-royal-deep"
          >
            Log in
          </Link>
          <Button asChild>
            <Link href="/sign-up">Join free</Link>
          </Button>
        </div>
      }
      member={(user) => (
        <div className="hidden items-center gap-3 md:flex">
          {/* Initials badge + first name. The name is a hint of who is
              logged in; screen readers hear "Logged in as <full name>". */}
          <p className="flex items-center gap-2 text-[15px] font-medium text-ink">
            <span
              aria-hidden="true"
              className="grid size-9 place-items-center rounded-full bg-royal text-sm font-semibold text-white"
            >
              {initials(user.name)}
            </span>
            <span className="sr-only">Logged in as {user.name}</span>
            <span
              aria-hidden="true"
              className="hidden max-w-[8rem] truncate xl:inline"
            >
              {user.name.split(/\s+/)[0]}
            </span>
          </p>
          <LogOutButton className="h-11" />
        </div>
      )}
    />
  );
}

// Bottom of the mobile menu (Sheet).
export function MobileAccount() {
  return (
    <GuestOrMember
      guest={
        <div className="flex flex-col gap-3">
          <SheetClose asChild>
            <Button asChild className="w-full">
              <Link href="/sign-up">Join free</Link>
            </Button>
          </SheetClose>
          <SheetClose asChild>
            <Button asChild variant="outline" className="w-full">
              <Link href="/log-in">Log in</Link>
            </Button>
          </SheetClose>
        </div>
      }
      member={(user) => (
        <div className="flex flex-col gap-3">
          <p className="flex items-center gap-3 text-ink">
            <span
              aria-hidden="true"
              className="grid size-10 shrink-0 place-items-center rounded-full bg-royal text-sm font-semibold text-white"
            >
              {initials(user.name)}
            </span>
            <span className="min-w-0">
              <span className="block text-sm text-ink-soft">Logged in as</span>
              <span className="block truncate font-semibold">{user.name}</span>
            </span>
          </p>
          <LogOutButton className="w-full" />
        </div>
      )}
    />
  );
}
