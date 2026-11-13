# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Slogan: "Better experience for every client and visitor." Every design and code decision should serve it: fast, clear, accessible, delightful.

## Project

"MentorLann": a learning + community website for future-career learners, built with Next.js (App Router), Tailwind CSS v4 and TypeScript. Product scope and section order are in [SPEC.md](SPEC.md). Planned backend: PostgreSQL on Supabase + Prisma + Zod (Supabase Auth is not used); the auth library is still to be decided (Better Auth vs Auth.js, see SPEC.md). Backend is Phase 2 and nothing is installed or connected yet. Site language is English only; tagline: "Learn Together. Grow Together." Brand colors: navy, royal blue, green, white (see DESIGN.md).

## Working mode: Claude writes, Lin Wai reads and learns (set by Lin Wai, updated)

Lin Wai wants Claude to write the code, and to explain it step by step so they can understand it and talk about it in interviews:
- Write code in small steps (one file or one idea at a time). After each step, explain in Burmese what the code does and why it is written that way; keep code, filenames, commands and technical terms in English.
- After each step, add 2–4 interview questions with short model answers (questions and answers in English, with a one-line Burmese gloss).
- Still ask before installing packages, changing config, running migrations, or making big changes; explain why a dependency is needed first.
- Do not jump to the next feature until Lin Wai confirms. Suggest a commit message after each finished unit.
- `docs/DEVELOPMENT_PROGRESS.md` may only be created or updated after approval.

Built so far: design tokens in `app/globals.css`, fonts and metadata in `app/layout.tsx`, the sticky Header (`components/site/header.tsx`, shadcn Sheet for mobile) and the navy Footer (`components/site/footer.tsx`); both are rendered from the root layout and share one link list in `components/site/nav-links.ts`. `next.config.ts` has `cacheComponents: true`, so values like `new Date()` in Server Components need `"use cache"` (see the Footer's copyright year) or `await io()` inside `<Suspense>`. The Homepage (`app/page.tsx`) currently has the cinematic Hero (`components/home/hero*.tsx`): blurred photo background (`public/media/hero-desk.jpg`), GSAP entrance (`hero-reveal.tsx`, no-flash CSS guard in `globals.css`) and lazy-loaded React Three Fiber path nodes (`hero-nodes.tsx` decides 3D vs SVG vs nothing). Libraries added so far: shadcn/ui, gsap, three, @react-three/fiber. shadcn/ui is set up (`components.json`, `components/ui/`); the hero background photo lives in `public/media/` and the logos in `public/brand/`.

## Design source of truth

Read [DESIGN.md](DESIGN.md) before building or changing any UI, and follow it exactly (tokens, 2 font families max, spacing, motion, accessibility rules). If a UI change conflicts with DESIGN.md, update DESIGN.md deliberately instead of drifting from it. Only touch the section you were asked to change.

## Commands

```bash
npm run dev     # dev server (http://localhost:3000)
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint (flat config in eslint.config.mjs)
npx tsc --noEmit  # type check
```

No test runner is configured. UI is verified with Playwright at 375px and 1440px.

## Next.js version warning

This is Next.js 16.x with breaking changes from older versions. Before writing framework code, read the matching guide in `node_modules/next/dist/docs/` (see [AGENTS.md](AGENTS.md)) and use context7 for library docs. Known differences:
- Request interception uses `proxy.ts` (not `middleware.ts`).
- Page and layout props use the generated global types, e.g. `LayoutProps<"/">` in `app/layout.tsx`.

## Architecture notes

- App Router only: routes live in `app/`, server components by default; add `'use client'` only for interactive pieces (3D, GSAP, motion, shadcn interactive parts).
- Path alias `@/*` maps to the repo root (not `src/`).
- Styling: Tailwind v4 via `@import "tailwindcss"` and `@theme inline` in `app/globals.css`. Design tokens belong there as CSS variables; never hardcode hex values in components.
- Fonts load through `next/font/google` in `app/layout.tsx`.
- Known dev quirk (project lives in OneDrive): the Turbopack dev server sometimes does not pick up edits to `app/globals.css` (it keeps serving the old CSS; `.tsx` edits are fine). If a CSS change seems missing, fetch the served CSS to confirm, then restart `npm run dev`.

## Rules for working here

- Plan first for big changes; build one feature at a time.
- Do not add new libraries without asking the user first (React Three Fiber, GSAP, motion, shadcn, Supabase packages all need approval when first added).
- 3D (React Three Fiber) must be lazy loaded with a lightweight fallback on slow or mobile devices; every animation respects `prefers-reduced-motion` and animates only `transform` and `opacity`.
- After building UI, check it with Playwright at 375px and 1440px and fix what breaks.
- The user is learning frontend development: explain changes simply, and say why each piece of code exists.
