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
3. Career paths (built, `#paths`): 6 tracks for the community: Web Development, UI/UX Design, Data Analysis, Digital Marketing, Accounting & Finance (incl. UAE VAT basics), Graphic Design
4. How it works (built, `#how`): 5 steps that match the hero ("5 steps to your career" and the 3D route): Start your path, Learn with others, Practice and see your progress, Meet your mentors, Reach your career goal
5. Community preview: a short teaser that links to `/community` (no invented stories or member counts)
6. Knowledge-sharing vlogs preview: a short teaser that links to `/vlogs`
7. Courses preview: 3 featured free courses that link to `/courses` (no progress bars until login exists)
8. Final call to action
9. Footer

## Own pages (decided 2026-11-14; build in this order)
1. Shared pieces (done): `PageHeader` (label + h1 + intro), honest `ComingSoon` block, nav links `/community`, `/vlogs`, `/courses`, title template "<Page> | MentorLann". Starter pages exist at all three URLs.
2. `/courses` (built): a curated list of FREE courses from trusted providers (freeCodeCamp, Google, Microsoft Learn, ...), grouped by career path. MentorLann does not make its own courses for now. Data in a file shaped like future database rows. No progress bars before login. Now: 4 courses each for Web Development, Graphic Design and Accounting & Finance (12 links, all checked in a real browser on 2026-11-14); locked paths get courses when they unlock.
3. `/vlogs`: YouTube videos shown with a click-to-load facade (thumbnail first, player only on click). The channel is new: show the ComingSoon block until real videos exist.
4. `/community`: the community is just starting (no members yet). Show how to join (Facebook page, later groups), planned study groups and Dubai meetups; never invented members, stories or counts.
5. Home preview sections for Community, Vlogs and Courses, linking to the pages.

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
- Backend (decided): PostgreSQL hosted on Supabase, accessed through Prisma ORM, with Zod for validation. Supabase Auth is NOT used, so there is only one auth system. Auth library: DECISION PENDING between Better Auth (recommended: Auth.js is now security-fixes-only and its own team recommends Better Auth for new projects) and Auth.js as originally planned. Nothing backend is installed in Phase 1.
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
