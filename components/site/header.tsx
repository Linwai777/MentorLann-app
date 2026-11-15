import Image from "next/image";
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
import { NAV_LINKS } from "@/components/site/nav-links";
import { NavLink } from "@/components/site/nav-link";

// The brand logo (from the MentorLann brand kit). It is an outlined SVG, so it
// looks sharp at any size and needs no font. width/height are the file's real
// size (764x160); they reserve the right space so nothing jumps while loading.
// The visible size comes from the height class; `w-auto` keeps the ratio.
function Wordmark() {
  return (
    <Link
      href="/"
      className="inline-flex min-h-11 items-center rounded-md"
      aria-label="MentorLann, home"
    >
      <Image
        src="/brand/logo.svg"
        alt="" // the link's aria-label already names it
        width={764}
        height={160}
        className="h-9 w-auto md:h-11"
      />
    </Link>
  );
}

export function Header() {
  return (
    <>
      {/* Skip link: the first thing keyboard users reach */}
      <a
        href="#main"
        className="sr-only z-[60] rounded-md bg-ink px-4 py-3 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>

      {/* Floating glass bar.
          - The outer <header> is a see-through strip: pointer-events-none so
            its empty margins never block clicks on the page under it.
          - -mb-19 / md:-mb-20 (= its own height) pulls the page up under the
            header, so the hero photo shows through the glass at the top.
          - The inner bar is the "glass": 70% white + backdrop blur. 70% keeps
            navy text at 8.4:1 even over the darkest part of the hero. */}
      <header className="pointer-events-none sticky top-0 z-40 -mb-19 px-3 pt-3 sm:px-4 md:-mb-20 md:pt-4">
        {/* Upper side, so the bar looks like polished glass:
            - border-t-white: a bright top edge
            - inset-shadow-white: a thin light line just inside the top
            - shadow-glass: the shared glass shadow, which also falls ABOVE
              the bar (visible in the gap over white pages)
            - isolate: keeps the gloss layer (-z-10) inside the bar */}
        <div className="pointer-events-auto relative isolate mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between gap-4 rounded-2xl border border-white/60 border-t-white bg-white/70 px-3 shadow-glass inset-shadow-sm inset-shadow-white backdrop-blur-xl backdrop-saturate-150 sm:px-5 [@media(prefers-reduced-transparency:reduce)]:bg-white">
          {/* Gloss: white light on the top half that fades out downwards,
              like a shine on a glass panel. Decorative only. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-1/2 rounded-t-2xl bg-linear-to-b from-white/80 to-transparent"
          />
          <Wordmark />

          {/* Desktop navigation */}
          {/* Full link row only from 1024px: with 5 links, tablets would wrap */}
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <NavLink
                    href={link.href}
                    // Navy (not grey) text: grey drops to 4:1 on the glass.
                    // aria-[current=page]: styles the link of the page you
                    // are on (white pill + royal text), set by NavLink.
                    className="inline-flex min-h-11 items-center rounded-lg px-3 text-[15px] font-medium text-ink transition-colors duration-200 hover:bg-white/60 hover:text-royal-deep aria-[current=page]:bg-white aria-[current=page]:font-semibold aria-[current=page]:text-royal-deep aria-[current=page]:shadow-sm"
                  >
                    {link.label}
                  </NavLink>
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
                  className="lg:hidden"
                  aria-label="Open menu"
                >
                  <Menu aria-hidden="true" className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[min(88vw,22rem)] gap-0 p-0"
              >
                <div className="border-b border-line p-4 pr-16">
                  <SheetTitle className="font-display text-xl font-semibold">
                    Menu
                  </SheetTitle>
                  <SheetDescription className="sr-only">
                    Site navigation
                  </SheetDescription>
                </div>
                <nav aria-label="Mobile" className="flex-1 overflow-y-auto p-4">
                  <ul className="flex flex-col">
                    {NAV_LINKS.map((link) => (
                      <li key={link.href} className="border-b border-line">
                        <SheetClose asChild>
                          <NavLink
                            href={link.href}
                            className="flex min-h-14 items-center text-lg font-medium text-ink aria-[current=page]:font-semibold aria-[current=page]:text-royal-deep"
                          >
                            {link.label}
                          </NavLink>
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
