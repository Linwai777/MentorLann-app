# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Slogan: "Better experience for every client and visitor." Every design and code decision should serve it: fast, clear, accessible, delightful.

## Project

"MentorLann": a learning + community website for future-career learners, built with Next.js (App Router), Tailwind CSS v4 and TypeScript. Product scope and section order are in [SPEC.md](SPEC.md). Supabase is the chosen backend (auth + database) but is deferred; design comes first and nothing is installed or connected yet.

Built so far: design tokens in `app/globals.css`, fonts and metadata in `app/layout.tsx`, and the sticky Header (`components/site/header.tsx`, shadcn Sheet for mobile). `app/page.tsx` is a temporary placeholder until the cinematic Hero is built. shadcn/ui is set up (`components.json`, `components/ui/`); hero video files live in `public/media/`.

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

## Rules for working here

- Plan first for big changes; build one feature at a time.
- Do not add new libraries without asking the user first (React Three Fiber, GSAP, motion, shadcn, Supabase packages all need approval when first added).
- 3D (React Three Fiber) must be lazy loaded with a lightweight fallback on slow or mobile devices; every animation respects `prefers-reduced-motion` and animates only `transform` and `opacity`.
- After building UI, check it with Playwright at 375px and 1440px and fix what breaks.
- The user is learning frontend development: explain changes simply, and say why each piece of code exists.
