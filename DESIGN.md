# DESIGN.md — MentorLann

Slogan: "Better experience for every client and visitor."
Product: learning + community website for future-career learners (all ages, English).
Concept: **The Atlas.** A warm paper map that helps you find your next step. Content sits on paper, a single dotted "route" and round "nodes" connect the sections, and the same nodes appear as the 3D hero object. Editorial, human, optimistic. Not a purple-gradient tech startup.
Dials: variance 6 (asymmetric but calm) · motion 5 · density 5.

## 1. Principles
- Guide, don't shout: one clear next step per section.
- One signature idea (route + nodes) used consistently, nothing else decorative.
- Fast and accessible first; motion supports meaning.
- Real content shapes, not lorem-style filler.

## 2. Color tokens (CSS variables in globals.css; never raw hex in components)
| Token | Hex | Use |
|---|---|---|
| --color-paper | #FBF7F0 | Page background |
| --color-surface | #FFFFFF | Cards, panels |
| --color-ink | #101A33 | Text, headings, dark sections (darkened from #14213D so ink text on signal reaches 4.7:1; #14213D only gave 4.3:1) |
| --color-ink-soft | #4B5563 | Secondary text (7:1 on paper) |
| --color-line | #D9D2C3 | 1px borders on paper |
| --color-signal | #E4572E | Main CTA fill, active node (ink text on it: 4.7:1) |
| --color-signal-text | #B8401C | Signal color used as text/links (5.4:1 on paper) |
| --color-forest | #1F6F5C | Progress, success, "community" accents |
| --color-sun | #F2B84B | Highlights, small badges only |
| --color-ink-contrast | #FBF7F0 | Text on ink backgrounds |
| --color-destructive | #DC2626 | Errors |
| --color-ring | #14213D | Focus ring (2px, offset 2px; on dark use paper) |

Rules: text at least 4.5:1; UI edges at least 3:1 where they carry meaning; color is never the only signal. Dark sections use ink background with paper text. No default purple/blue gradients; flat color or a single soft radial of `sun` at low opacity is the only allowed glow.

## 3. Typography (2 families)
- Display: **Calistoga** (warm, human). Headings only, 400 weight, line-height 1.1, tight tracking.
- Text/UI: **Inter**. Weights 400, 500, 600.
- Load with `next/font/google`, expose as `--font-display` and `--font-sans`; remove the Geist fonts from the scaffold.
- Scale (mobile → desktop): Hero 44 → 80 · H2 32 → 52 · H3 22 → 28 · body 16–18 · small 14 · label 12 uppercase, letter-spacing 0.08em (Inter 600, not a third font).
- Line length 60–72ch. Body line-height 1.6.

## 4. Layout, shape, signature
- 8px grid. Container 1200px, section padding 80–128px desktop, 56–72px mobile.
- Asymmetric 12-column grid on desktop (text 7 cols, visual 5 cols), single column on mobile.
- Borders 1px `--color-line`. Radius 12px cards, 999px for pills and nodes, 8px inputs. No heavy shadows; floating layers get one small crisp shadow.
- **Route line:** a 1.5px dashed `--color-ink` line (opacity 0.25) running down the left side of the page on desktop between section numbers (01, 02, 03 …). Each section label is a node (12px circle, filled `signal` when in view).
- Section label pattern: node + number + small uppercase label, then the Calistoga heading.

## 5. Components
- **Button**: 48px high, 8px radius. Primary = signal fill + ink text. Secondary = 1px ink border, transparent. Hover: translateY(-1px) + shadow, 200ms. Loading and disabled states.
- **Path card** (career track): paper-white surface, 1px line border, track icon (Lucide, 24px), title, 3 skill chips, duration, "View path" link. Hover lifts with motion; whole card is one link.
- **Step item**: large Calistoga number, title, one sentence.
- **Story card** (community): quote, name, role, small avatar (initials fallback), forest accent bar.
- **Course preview**: 16:9 reserved thumbnail, level pill, lesson count, progress bar (forest on line track, 8px, numeric label).
- **Navigation**: wordmark left, 4 links, "Join free" button. Mobile menu uses shadcn Sheet with labelled trigger, 44px targets, focus trap.
- **Forms** (later): visible labels, errors under fields with aria-describedby, 16px inputs.
- States for every list: loading skeleton, empty, error with retry.

## 6. Icons and images
Lucide SVG only. Decorative `aria-hidden`; icon-only buttons need `aria-label`. `next/image` with reserved aspect ratios and alt text. No emoji as icons, no stock-photo faces for fake testimonials (use initials until real stories exist).

## 7. Cinematic hero (signature section)
A full-viewport, film-like opening. Layers from back to front:
1. **Video background**: slow, calm footage of people learning, building and meeting (hands on laptops, workshops, city mornings). Muted, looped, `playsinline`, no audio track.
2. **Ink overlay**: `--color-ink` at 55–70% opacity plus a bottom fade into `--color-paper`, so white headline text always reaches 4.5:1 contrast. Check against the brightest frame, not the average.
3. **Path nodes (3D)**: the React Three Fiber floating nodes sit on top of the video on desktop only, tilting toward the pointer.
4. **Content**: Calistoga headline (hero scale), one-sentence promise, primary + secondary CTA, small scroll cue.

Entrance sequence on load (total under 1.4s, plays once): overlay fades from 100% ink → target opacity, headline lines rise 24px + fade with 90ms stagger, CTAs fade in last. Use GSAP timeline; under reduced motion show the final state instantly.

Video rules (performance and access):
- Provide `poster` (WebP/AVIF, same aspect ratio) so the first paint is the poster; the video starts after load (`preload="none"`, then start when idle).
- Two sources: 1080p desktop (target under 4 MB, 8–12s loop, H.264 MP4 + WebM/AV1) and a 720p mobile source (target under 1.5 MB). Frame rate 24–30fps.
- Show the poster only (no video) when: `prefers-reduced-motion`, `saveData`, slow connection (`effectiveType` 2g/3g), or battery saver.
- A visible Pause/Play button (44x44px, labelled) for WCAG 2.2.2. Video is decorative: `aria-hidden`, no captions needed because there is no speech.
- Pause playback when the hero leaves the viewport (IntersectionObserver).
- Reserve the hero height (`100svh`, min 560px) so there is no layout shift.
- Footage must be licensed or self-made. OPEN: choose the source (own footage, stock, or generated).

## 8. Animated components
A small, consistent set. Each has a purpose, none loops forever.
- **Route progress**: the dashed route line draws itself (stroke-dashoffset) as the page scrolls; nodes fill with `signal` when reached.
- **Animated counters**: community numbers (learners, mentors, paths) count up once when visible; show the final number to screen readers.
- **Marquee of skills/careers**: slow horizontal ticker, pauses on hover and focus, static wrapped list under reduced motion.
- **Path cards**: lift 4px, icon nudges, arrow slides 4px on hover (motion.dev).
- **Text reveal**: headings split by line, each line rises and fades in on scroll.
- **Progress bars**: fill from 0 to value once visible.
- **Accordion / tabs / menu** (shadcn): height and content fade via transform/opacity-friendly patterns, 200ms.
- **Magnetic CTA** (hero primary button only): moves up to 6px toward the pointer; disabled on touch and reduced motion.

## 9. Motion
- Hero 3D: floating path nodes (spheres joined by a thin line) that tilt toward the pointer with damping. Lazy loaded with `next/dynamic` (`ssr: false`) after first paint. Fallback: static SVG of the same nodes. Use fallback on small screens with low hardware concurrency, `prefers-reduced-motion`, no WebGL, or `saveData`. Cap devicePixelRatio at 1.5, pause when off-screen. On mobile the hero is poster/short video + SVG nodes, never video + WebGL together.
- Scroll reveals (GSAP ScrollTrigger): children fade + rise 16px, 500–700ms, stagger 80ms, play once. Skip entirely under reduced motion.
- Hover (motion.dev): cards lift 4px, buttons 1px, 150–250ms.
- Animate `transform` and `opacity` only. Reduced motion = final state, no movement.

## 10. Accessibility (WCAG 2.2 AA)
Keyboard-complete, visible focus, skip link, landmarks, one H1, touch targets at least 44x44px, text zoom to 200% without loss, 3D canvas `aria-hidden` with equivalent information in text.

## 11. SEO basics
Unique title and meta description per page, Open Graph image, semantic headings, `sitemap` and `robots` via App Router files, JSON-LD `EducationalOrganization` on the home page.

## 12. Pre-delivery checklist
- [ ] Hero text contrast checked on the brightest video frame; Pause/Play works by keyboard
- [ ] Video falls back to poster on reduced motion, saveData and slow networks
- [ ] Playwright at 375px and 1440px, screenshots, no horizontal scroll
- [ ] Contrast, focus, keyboard path
- [ ] Reduced motion tested; 3D falls back correctly
- [ ] No layout shift; Lighthouse performance reviewed
- [ ] Max 2 font families, no emoji icons, tokens only
