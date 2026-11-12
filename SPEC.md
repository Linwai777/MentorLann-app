# SPEC.md — MentorLann

Status: draft from the Q&A with Lin Wai. Items marked OPEN still need an answer.

## Goal
A website where people prepare for their future careers by learning (courses) and by belonging (community). Learning and community have equal weight.

## Audience
All ages. Primary community: the Myanmar community in Dubai (fast mobile and home internet, so rich media such as the hero video is fine on phones). Language: English only. The interface must be simple enough for first-time learners and fast on mid-range phones.

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
2. Cinematic hero: full-viewport video background with ink overlay, entrance sequence, headline, short promise, two CTAs, interactive 3D "path nodes" on desktop (mouse reactive, lazy loaded, static fallback), Pause/Play for the video (see DESIGN.md section 7)
3. Career paths: 4–6 featured tracks (cards)
4. How it works: 3 steps (Choose a path, Learn with others, Show your progress)
5. Community: learner stories and activity snapshot
6. Courses preview: 3 featured courses with progress style
7. Final call to action
8. Footer

## Later pages (after the home page)
Courses, course detail, lesson, community, sign up / log in, dashboard.

## Animated components (see DESIGN.md section 8)
Route progress line, animated counters, skills marquee, hover-lift path cards, line-by-line text reveals, progress bar fills, shadcn accordion/tabs/menu, magnetic hero CTA.

## Hero video footage (downloaded)
Source: Pexels, "College Students Collaborative Study Session" (University of Edinburgh media team), https://www.pexels.com/video/college-students-collaborative-study-session-30614422/ . Files in `public/media/`: `hero-desktop.mp4` (720p, 2.7 MB), `hero-mobile.mp4` (540p, 1.5 MB), `hero-poster.jpg` (74 KB, preview image). TODO: confirm Pexels license terms before publishing; optionally re-encode with ffmpeg (not installed) to add WebM and a sharper poster.

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
- Language: English only for now. Burmese UI is deferred (it would also need a Myanmar-script font, because Calistoga and Inter do not include Myanmar glyphs).
- Tagline: "Learn Together. Grow Together."

## Libraries to add (approved by the request, installed at the step that needs them)
three, @react-three/fiber, @react-three/drei (only if needed), gsap, motion, shadcn/ui (with its dependencies).

## Quality gates
- Playwright at 375px and 1440px with a screenshot per page.
- Then: design critique, accessibility review, SEO check. List the top 5 issues and fix one by one.
- First screen under 2.5s, no layout shift, WCAG AA.

## Out of scope for now
Login, database, payments, multi-language.
