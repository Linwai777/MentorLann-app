# SPEC.md — MentorLann

Status: draft from the Q&A with Lin Wai. Items marked OPEN still need an answer.

## Goal
A website where people prepare for their future careers by learning (courses) and by belonging (community). Learning and community have equal weight.

## Audience
All ages. Primary community: the Myanmar community in Dubai (fast mobile and home internet). Language: English only. The interface must be simple enough for first-time learners and fast on mid-range phones.

## Brand
- Name: MentorLann (renamed from "Future Careers"; spelling as given by Lin Wai, with double n)
- Slogan (project value, not necessarily shown): "Better experience for every client and visitor."
- Personality: warm, optimistic, editorial, guiding. A map that helps you find your next step. Not corporate, not "tech startup".

## Pillars
1. Learn: career-track courses, lessons, progress.
2. Belong: community of learners, mentors, shared wins.
3. Grow: career paths that connect skills to real jobs.

## Sections for the home page (build one at a time, in this order)
1. Header + navigation
2. Cinematic hero: full-viewport blurred photo background with navy overlay, entrance sequence, headline, short promise, two CTAs, highlights, interactive 3D career route on desktop (mouse reactive, lazy loaded, static fallback), pause control for the 3D motion (see DESIGN.md section 7)
3. Career paths (built, `#paths`): 3 tracks only: Web Development, Graphic Design, Digital Marketing (UI/UX, Data Analysis and Accounting & Finance were removed on 2026-11-19)
4. How it works (built, `#how`): 5 steps that match the hero ("5 steps to your career" and the 3D route): Start your path, Learn with others, Practice and see your progress, Meet your mentors, Reach your career goal
5. Community preview (built, `#community`): the 4 planned activities as compact glass cards marked "Planned" + "Visit the community" link
6. Knowledge-sharing vlogs preview (built, `#vlogs`): the 3 newest vlogs (same VlogCard as `/vlogs`) + "See all vlogs"; the section hides itself if there are no vlogs
7. Courses preview (built, `#courses`): Step 1 of each open career path (same CourseCard as `/courses`, path name above each) + "Browse all free courses"; no progress bars until login exists
8. Final call to action (built, `#join`): one GlassCard: "Your next career starts with one small step.". Guests: primary "Join free" (/sign-up), outline "Log in", promises: free to join, sign up in under a minute, no experience needed. Members: primary "Start with a free course" (/courses), outline "Join the community" (/community), promises: 100% free, no experience needed, learn at your own pace. Every "Join free" button on the site (header, mobile menu, hero, footer, locked previews) links to `/sign-up`. For members the hero button becomes "Continue learning" and the footer button "Browse free courses" (both /courses).
9. Footer

## Sharing and the site address (done 2026-11-15)
- `lib/site.ts` gives `SITE_URL`: `NEXT_PUBLIC_SITE_URL` when set (set it to the real domain, e.g. `https://mentorlann.com`, once it exists), otherwise Vercel's production address, otherwise `http://localhost:3000`. The root layout uses it as `metadataBase`.
- Default share picture: `public/og-image.jpg` (1200x630 screenshot of the home hero), listed in the root layout metadata with width, height and alt for Open Graph and X. Vlog articles share their own cover as `og:type=article` with date and author.
- Do not use `app/opengraph-image.alt.txt`: the Turbopack build ignores it.

## Own pages (decided 2026-11-14; build in this order)
1. Shared pieces (done): `PageHeader` (label + h1 + intro), honest `ComingSoon` block, nav links `/community`, `/vlogs`, `/courses`, title template "<Page> | MentorLann". Starter pages exist at all three URLs.
2. `/courses` (built): a curated list of FREE courses from trusted providers (freeCodeCamp, Google, Microsoft Learn, ...), grouped by career path. MentorLann does not make its own courses for now. Data in a file shaped like future database rows. No progress bars before login. Now: 4 courses each for Web Development, Graphic Design and Digital Marketing (12 links; the Web and Graphic ones were checked in a real browser on 2026-11-14, the Digital Marketing ones only respond 200 so far and still need a browser check).
3. `/vlogs` (built): cards with a picture, title and summary. Two kinds: **text vlogs** (pictures + text) open in full on our site at `/vlogs/<slug>`; **video vlogs** show YouTube and Facebook icons that open the full video there. The YouTube channel and Facebook page are new, so the first two vlogs are real text guides by the MentorLann team ("How to use MentorLann's free courses", "How to choose your first career path"), illustrated with screenshots of the site. Add a video by adding a `kind: "video"` entry with `youtubeUrl` and/or `facebookUrl`.
4. `/community` (built): the community is just starting (no members yet). Shows planned activities marked "Planned" (study groups, Dubai meetups, mentor chats, show your work), 3 steps to join, 5 community rules and a call for future mentors. Paste the Facebook page address into `COMMUNITY_LINKS.facebook` when it exists; the "Follow MentorLann" button then appears by itself.
5. Home preview sections for Community, Vlogs and Courses (done 2026-11-14).

Later: course detail, lesson, single vlog, sign up / log in, dashboard (Phase 2).

## Animated components (see DESIGN.md section 8)
Route progress line, animated counters, skills marquee, hover-lift path cards, line-by-line text reveals, progress bar fills, shadcn accordion/tabs/menu, magnetic hero CTA.

## Hero background image
`public/media/hero-desk.jpg` (1600×900, 74 KB): extracted from Lin Wai's approved hero preview (`mentorlann-hero-preview.html`, part of the `mentorlann-brand-v3` work). The earlier Pexels background video was removed (files and component are in git history).

## Motion plan
- Hero: React Three Fiber floating path nodes that tilt toward the mouse. Lazy loaded, simple CSS/SVG fallback on mobile, slow devices and reduced motion.
- Next sections: GSAP ScrollTrigger reveals (small rise + fade).
- Hover effects: motion (motion.dev) on cards and buttons.
- All motion respects prefers-reduced-motion, uses transform and opacity only.

## Tech
- Next.js 16 App Router, Tailwind v4, TypeScript.
- shadcn/ui for interactive parts (navigation menu, dialog, tabs, accordion).
- Layout inspiration: 21st.dev patterns (reference only, do not copy).
- Backend (decided): PostgreSQL hosted on Supabase, accessed through Prisma ORM, with Zod for validation. Supabase Auth is NOT used, so there is only one auth system. Auth library: **Better Auth** (decided 2026-11-16), **email + password only** for the first version (Google login, email verification and password reset come later; they need OAuth keys and an email service).
- Phase 2 progress: (1) Supabase project "MentorLann-Mumbai" created by Lin Wai (Region: South Asia (Mumbai) `ap-south-1`, the closest to Dubai: about 40 ms per query; "Auto" had picked Tokyo, about 184 ms, so that project was replaced while still empty; Data API OFF, "expose new tables" OFF, automatic RLS ON: we only reach the database through Prisma on the server). Secrets live in `.env.local` (git-ignored): `DATABASE_URL` = Transaction pooler, port 6543, `?pgbouncer=true` (app runtime); `DIRECT_URL` = Session pooler, port 5432 (Prisma CLI / migrations); `BETTER_AUTH_SECRET` (generated locally); `BETTER_AUTH_URL`. Never paste these values into chat or commits. (2) Prisma 7.10.1 set up (done 2026-11-17): `prisma/schema.prisma` (generator `prisma-client`, output `lib/generated/prisma`, git-ignored), `prisma.config.ts` (loads `.env.local` with Node's `process.loadEnvFile`, CLI uses `DIRECT_URL`), `lib/prisma.ts` (one shared PrismaClient with the `@prisma/adapter-pg` driver adapter on `DATABASE_URL`). Packages pinned to exact versions: prisma (dev), @prisma/client, @prisma/adapter-pg 7.10.1, better-auth 1.7.25, zod 4.6.7. Prisma 8 is only a release candidate and Better Auth supports Prisma up to 7. (3) Better Auth server done (lib/auth.ts, /api/auth/[...all], first migration with user/session/account/verification). (4) /sign-up and /log-in done (Zod rules + Server Actions, accessible glass-card forms). (4b) Members-only access (decided by Lin Wai 2026-11-17): guests may see only the home page (hero, career paths, how it works, final CTA) and the auth pages; /community, /vlogs (and every article) and /courses need an account. Guests who open them stay on the page and see its header plus a "Members only" panel (Join free / Log in, both with ?next=<page>, so they come back after joining; next is checked: only paths on this site). The check is MembersOnly inside each page (real session check through lib/session.ts; guests never receive the content); there is no proxy.ts any more. Home sections 03-05 show their cards and "see all" links to everyone (changed by Lin Wai 2026-11-17: the blurred previews were removed). (4c) Log in and sign up open as a popup over the current page when clicked inside the site (full pages stay for direct links and refresh). (5) Header user state done: "Log in" + "Join free" (/sign-up) for guests, initials + "Log out" for members (desktop and phone menu); logged-in members who open /log-in or /sign-up are sent on to ?next=<page> (or home).
- Language: English only for now. Burmese UI is deferred (it would also need a Myanmar-script font, because Poppins and Inter do not include Myanmar glyphs).
- Tagline: "Learn Together. Grow Together."

## Libraries to add (approved by the request, installed at the step that needs them)
three, @react-three/fiber, @react-three/drei (only if needed), gsap, motion, shadcn/ui (with its dependencies).

## Quality gates
- Playwright at 375px and 1440px with a screenshot per page.
- Then: design critique, accessibility review, SEO check. List the top 5 issues and fix one by one.
- First screen under 2.5s, no layout shift, WCAG AA.

## Out of scope for now
Login, database, payments, multi-language.
