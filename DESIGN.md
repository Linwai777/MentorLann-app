# DESIGN.md — MentorLann

Slogan: "Better experience for every client and visitor."
Product: learning + community website for future-career learners (all ages, English).
Tagline: "Learn Together. Grow Together."
Brand direction: modern, minimal, professional, welcoming, trustworthy. Colors: navy, royal blue, green accents, white (decided by Lin Wai, replacing the earlier cream and orange palette).
Concept: **The Atlas.** A clean map that helps you find your next step. Content sits on white, a single dotted "route" and round "nodes" connect the sections, and the same nodes appear as the 3D hero object (the 3D is optional and last; see section 9). Human, optimistic. Not a purple-gradient tech startup.
Dials: variance 6 (asymmetric but calm) · motion 5 · density 5.

## 1. Principles
- Guide, don't shout: one clear next step per section.
- One signature idea (route + nodes) used consistently, nothing else decorative.
- Fast and accessible first; motion supports meaning.
- Real content shapes, not lorem-style filler.

## 2. Color tokens (CSS variables in globals.css; never raw hex in components)
| Token | Hex | Use |
|---|---|---|
| --color-white | #FFFFFF | Page background, cards, text on dark/royal/green |
| --color-surface-soft | #F4F7FC | Alternating section backgrounds, muted areas |
| --color-ink | #0B1F4D | Navy: text, headings, dark sections (15.9:1 on white) |
| --color-ink-soft | #475569 | Secondary text (7.6:1 on white, 7.1:1 on surface-soft) |
| --color-line | #D5DDEB | 1px decorative borders |
| --color-edge | #8A94A6 | Borders of inputs and controls that must be seen (3.1:1 on white) |
| --color-royal | #1D4ED8 | Royal blue: primary buttons, links, active node (white text on it: 6.7:1) |
| --color-royal-deep | #1E40AF | Hover/pressed state, link hover (8.7:1 on white) |
| --color-green | #15803D | Green accent: progress, success, community, mentors (5.0:1 on white) |
| --color-green-soft | #DCFCE7 | Light green badge background (green text on it: 4.6:1) |
| --color-green-light | #4ADE80 | Green on dark navy sections only (9.2:1 on ink) |
| --color-destructive | #DC2626 | Errors |
| --color-ring | #1D4ED8 | Focus ring (2px, offset 2px; on navy sections use white) |

All pairs above were calculated with the WCAG formula (script run, not eyeballed). Rules: text at least 4.5:1; UI edges at least 3:1 where they carry meaning; color is never the only signal. Royal blue is NOT used as text on navy (only 2.4:1); on navy use white or green-light. Dark sections use ink background with white text. No decorative gradients; the only gradient allowed is the hero's navy overlay (one color fading in opacity, for legibility).

## 3. Typography (2 families)
- Display: **Poppins** (geometric, matches the MentorLann logo). Headings only, weights 600–700 (H1 700), line-height 1.05–1.1, tight tracking (-0.02em). Replaced Calistoga after the brand kit (mentorlann-brand-v3) was made.
- Text/UI: **Inter**. Weights 400, 500, 600.
- Load with `next/font/google`, expose as `--font-display` and `--font-sans`; remove the Geist fonts from the scaffold.
- Scale (mobile → desktop): Hero 40 → 68 (hero paragraph 16 → 18) · H2 32 → 52 · H3 22 → 28 · body 16–18 · small 14 · label 12 uppercase, letter-spacing 0.08em (Inter 600, not a third font).
- Line length 60–72ch. Body line-height 1.6.

## 4. Layout, shape, signature
- 8px grid. Container 1200px, section padding 80–128px desktop, 56–72px mobile.
- Asymmetric 12-column grid on desktop (text 7 cols, visual 5 cols), single column on mobile.
- Borders 1px `--color-line`. Radius 12px cards, 999px for pills and nodes, 8px inputs. No heavy shadows; floating layers get one small crisp shadow.
- **Route line:** a 1.5px dashed `--color-ink` line (opacity 0.25) running down the left side of the page on desktop between section numbers (01, 02, 03 …). Each section label is a node (12px circle, filled `royal` when in view).
- Section label pattern: node + number + small uppercase label, then the Poppins heading.

## 5. Components
- **Button**: 48px high, 8px radius. Primary = royal fill + white text (hover royal-deep). Secondary = 1px ink border, transparent. Hover: translateY(-1px) + shadow, 200ms. Loading and disabled states.
- **Path card** (career track): white surface, 1px line border, track icon (Lucide, 24px), title, 3 skill chips, duration, "View path" link. Hover lifts with motion; whole card is one link.
- **Step item**: large Poppins number, title, one sentence.
- **Story card** (community): quote, name, role, small avatar (initials fallback), green accent bar.
- **Course preview**: 16:9 reserved thumbnail, level pill, lesson count, progress bar (green on line track, 8px, numeric label).
- **Navigation (glass)**: a floating frosted-glass bar, sticky at the top: rounded 16px, 12px from the screen edges (16px on md+), 64px tall, `bg-white/70` + `backdrop-blur-xl` + `backdrop-saturate-150`, 1px `white/60` border, soft navy shadow. Logo left, 5 links (Career paths, How it works, Community, Vlogs, Courses), "Join free" right; below 1024px (phones and tablets) the links move into a shadcn Sheet menu with a labelled trigger (5 links wrap on a 768px tablet), 44px targets, focus trap. Links are navy (8.4:1 on the glass even over the darkest hero), not grey (grey drops to 4:1). `prefers-reduced-transparency` makes the bar solid white. The header pulls the page up under itself (`-mb-19` / `md:-mb-20`), so the hero photo shows through the glass; **every page must leave at least 76px (mobile) / 80px (md+) of space at the top** so content is not hidden behind the bar.
- **Forms** (later): visible labels, errors under fields with aria-describedby, 16px inputs.
- States for every list: loading skeleton, empty, error with retry.

## 6. Logo, icons and images
- **Logo** (source: `mentorlann-brand-v3/`, outlined SVG, no font needed): `public/brand/logo.svg` on light backgrounds (Header, 36px tall mobile / 44px desktop), `public/brand/logo-white.svg` on navy (Footer), `public/brand/mark.svg` for the "M + rising arrow" symbol alone. Never recolor or stretch it; keep `w-auto` so the 764:160 ratio holds.
- **App icons**: `app/favicon.ico`, `app/icon.svg`, `app/apple-icon.png` (Next.js picks them up automatically).

Lucide SVG only. Decorative `aria-hidden`; icon-only buttons need `aria-label`. `next/image` with reserved aspect ratios and alt text. No emoji as icons, no stock-photo faces for fake testimonials (use initials until real stories exist).

## 7. Cinematic hero (signature section)
A full-viewport, film-like opening. Layers from back to front:
1. **Photo background** (chosen by Lin Wai from the approved hero preview): `public/media/hero-desk.jpg`, a desk by a window with laptop, plant, books and mug on a navy wall (1600×900, 74 KB). Shown with `blur(3px)`, `saturate(.8)` and `scale(1.05)` (scale hides the soft edges blur creates). No background video.
2. **Ink overlay**: phones (text full width) one even layer of `--color-ink` at 75%; md and up a left-to-right fade 95% → 80% → 55% (darkest behind the text, lighter where the photo and 3D show). White text stays at least 4.5:1 even on a pure-white area: 75% gives ~7:1, and the paragraph's right edge on a 768px tablet (78% across) still sits on ~66% navy (~5:1).
3. **Path nodes (3D)**: the React Three Fiber floating nodes sit on top of the photo on desktop only, tilting toward the pointer.
4. **Content**: eyebrow with a small green dot; Poppins 700 headline in two lines with "Together." in green-light; one-sentence promise; primary royal CTA with an arrow that slides 4px on hover + ghost secondary CTA; a highlights row of facts that are true today (100% free, 5 steps, 3 ways to grow); desktop-only scroll cue that animates 3 times (under 5s) then stops.

Entrance sequence on load (total under 1.4s, plays once): overlay fades from 100% ink → target opacity, headline lines rise 24px + fade with 90ms stagger, CTAs fade in last. Use GSAP timeline; under reduced motion show the final state instantly.

Background rules (performance and access):
- Load the photo with `next/image` static import + `preload` + `placeholder="blur"` (it is the LCP element; size is known, so no layout shift).
- Reserve the hero height (`100svh`, min 560px) so there is no layout shift.
- The earlier background video (Pexels clip, `public/media/hero-desktop.mp4` / `hero-mobile.mp4` / `hero-poster.jpg`) was removed from the hero; the component is in git history (`components/home/hero-video.tsx`, commit a292771).

## 8. Animated components
A small, consistent set. Each has a purpose, none loops forever.
- **Route progress**: the dashed route line draws itself (stroke-dashoffset) as the page scrolls; nodes fill with `royal` when reached.
- **Animated counters**: only for real numbers (learners, mentors) once they exist; never invented placeholder stats. Count up once when visible; show the final number to screen readers.
- **Marquee of skills/careers**: slow horizontal ticker, pauses on hover and focus, static wrapped list under reduced motion.
- **Path cards**: lift 4px, icon nudges, arrow slides 4px on hover (motion.dev).
- **Text reveal**: headings split by line, each line rises and fades in on scroll.
- **Progress bars**: fill from 0 to value once visible.
- **Accordion / tabs / menu** (shadcn): height and content fade via transform/opacity-friendly patterns, 200ms.
- **Magnetic CTA** (hero primary button only): moves up to 6px toward the pointer; disabled on touch and reduced motion.

## 9. Motion
- Hero 3D: a **labeled career route** of 5 steps (Start → Learn → Practice → Mentor → Career, data in `components/home/hero-nodes-data.ts`). Glass style: see-through glass orbs (fresnel shader: clear center, bright rim, sharp highlight) with a glowing core and a thin rotating ring, joined by a glass tube; colors go from white to royal blue, the goal is green and pulses. HTML pill labels follow each node (white pill, numbered; goal green with a flag icon). Motion: the tube draws itself in (~1.8s after a 0.4s delay) and nodes pop in as it reaches them; light particles then flow along the route toward the goal; the route tilts toward the mouse with damping and floats gently. No continuous spin (it made the labels overlap). A Pause/Play button (44px, `aria-pressed`) stops the 3D render loop (WCAG 2.2.2). The 3D layer is `aria-hidden`; an `sr-only` sentence names the 5 steps. Three.js "transmission" glass was tested and rejected: on a transparent canvas over the HTML background it looks milky.
- Scroll reveals (GSAP ScrollTrigger): children fade + rise 16px, 500–700ms, stagger 80ms, play once. Skip entirely under reduced motion.
- Hover (motion.dev): cards lift 4px, buttons 1px, 150–250ms.
- Animate `transform` and `opacity` only. Reduced motion = final state, no movement.

## 10. Accessibility (WCAG 2.2 AA)
Keyboard-complete, visible focus, skip link, landmarks, one H1, touch targets at least 44x44px, text zoom to 200% without loss, 3D canvas `aria-hidden` with equivalent information in text.

## 11. SEO basics
Unique title and meta description per page, Open Graph image, semantic headings, `sitemap` and `robots` via App Router files, JSON-LD `EducationalOrganization` on the home page.

## 12. Pre-delivery checklist
- [ ] Hero text contrast checked on the brightest part of the background
- [ ] Continuous hero motion (3D spin) can be paused (WCAG 2.2.2)
- [ ] Playwright at 375px and 1440px, screenshots, no horizontal scroll
- [ ] Contrast, focus, keyboard path
- [ ] Reduced motion tested; 3D falls back correctly
- [ ] No layout shift; Lighthouse performance reviewed
- [ ] Max 2 font families, no emoji icons, tokens only
