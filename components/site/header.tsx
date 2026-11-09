import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Anchors point at the home page sections we will build next.
// They become real routes when the Courses / Community pages exist.
const NAV_LINKS = [
  { label: "Career paths", href: "/#paths" },
  { label: "How it works", href: "/#how" },
  { label: "Community", href: "/#community" },
  { label: "Courses", href: "/#courses" },
];

// The wordmark: one "node" dot (the signature of the Atlas design) + the name.
function Wordmark() {
  return (
    <Link
      href="/"
      className="inline-flex min-h-11 items-center gap-2.5 rounded-md"
      aria-label="MentorLann, home"
    >
      <span
        aria-hidden="true"
        className="size-3 rounded-full bg-signal ring-4 ring-signal/20"
      />
      <span className="font-display text-xl leading-none tracking-tight text-ink">
        MentorLann
      </span>
    </Link>
  );
}

export function Header() {
  return (
    <>
      {/* Skip link: the first thing keyboard users reach */}
      <a
        href="#main"
        className="sr-only z-[60] rounded-md bg-ink px-4 py-3 text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-sm supports-[backdrop-filter]:bg-paper/85">
        <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6 md:h-20">
          <Wordmark />

          {/* Desktop navigation */}
          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center rounded-md px-3 text-[15px] font-medium text-ink-soft transition-colors duration-200 hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild className="hidden md:inline-flex">
              <Link href="/#join">Join free</Link>
            </Button>

            {/* Mobile menu: shadcn Sheet gives focus trap, Esc to close, aria roles */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open menu"
                >
                  <Menu aria-hidden="true" className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[min(88vw,22rem)] gap-0 p-0">
                <div className="border-b border-line p-4 pr-16">
                  <SheetTitle className="font-display text-xl">Menu</SheetTitle>
                  <SheetDescription className="sr-only">
                    Site navigation
                  </SheetDescription>
                </div>
                <nav aria-label="Mobile" className="flex-1 overflow-y-auto p-4">
                  <ul className="flex flex-col">
                    {NAV_LINKS.map((link) => (
                      <li key={link.href} className="border-b border-line">
                        <SheetClose asChild>
                          <Link
                            href={link.href}
                            className="flex min-h-14 items-center text-lg font-medium text-ink"
                          >
                            {link.label}
                          </Link>
                        </SheetClose>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="border-t border-line p-4">
                  <SheetClose asChild>
                    <Button asChild className="w-full">
                      <Link href="/#join">Join free</Link>
                    </Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}
