import type { StaticImageData } from "next/image";
import coursesPage from "@/public/vlogs/courses-page.jpg";
import courseCards from "@/public/vlogs/course-cards.jpg";
import careerPaths from "@/public/vlogs/career-paths.jpg";
import fiveSteps from "@/public/vlogs/five-steps.jpg";

// Knowledge-sharing vlogs. Two kinds:
// - "text": pictures + text, read in full on our site (/vlogs/<slug>)
// - "video": watched in full on YouTube and/or Facebook
// Shaped like future database rows, like the courses data.
//
// Images are imported (not written as "/vlogs/x.jpg" strings): Next.js then
// knows each picture's real width and height (no layout shift) and makes a
// tiny blurred preview automatically.

type Picture = { src: StaticImageData; alt: string };

// The body of a text vlog is a list of simple blocks, so the page can render
// each kind in its own style without needing an extra library (like MDX).
export type VlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "image"; image: Picture; caption?: string };

type VlogBase = {
  slug: string;
  title: string;
  summary: string; // shown on the card
  topic: string;
  author: string;
  publishedAt: string; // "YYYY-MM-DD"
  cover: Picture;
};

// A "discriminated union": `kind` tells TypeScript which fields exist.
// If kind is "text", there must be a body; if "video", there must be links.
export type TextVlog = VlogBase & { kind: "text"; body: VlogBlock[] };
export type VideoVlog = VlogBase & {
  kind: "video";
  youtubeUrl?: string; // give at least one of the two
  facebookUrl?: string;
  length?: string; // e.g. "8 min"
};
export type Vlog = TextVlog | VideoVlog;

export const VLOGS: Vlog[] = [
  {
    kind: "text",
    slug: "how-to-use-free-courses",
    title: "How to use MentorLann's free courses",
    summary:
      "Where the courses come from, how to read a course card and how to keep going every day.",
    topic: "Guide",
    author: "MentorLann team",
    publishedAt: "2026-11-14",
    cover: {
      src: coursesPage,
      alt: "The MentorLann Courses page with jump links to Web Development, Graphic Design and Accounting & Finance.",
    },
    body: [
      {
        type: "paragraph",
        text: "Every course on MentorLann is free, and each one comes from a trusted teacher such as freeCodeCamp, Khan Academy or Adobe. We do not host the lessons ourselves. Our job is to choose good ones and put them in the right order, so you always know what to do next.",
      },
      { type: "heading", text: "1. Pick one career path" },
      {
        type: "paragraph",
        text: "Open the Courses page and jump to the path you chose. Each path has four courses, numbered Step 1 to Step 4. Start with Step 1, even if it feels easy: it builds the base for everything after it.",
      },
      {
        type: "image",
        image: {
          src: courseCards,
          alt: "Four course cards for Accounting & Finance, numbered Step 1 to Step 4, each with an Open course button.",
        },
        caption:
          "Each card shows the step, the teacher, the format and an honest note if something is paid.",
      },
      { type: "heading", text: "2. Read the card before you click" },
      {
        type: "list",
        items: [
          "Format: Interactive (you practise in the browser), Video or Reading.",
          "Level: Beginner, or Next step when it builds on the earlier courses.",
          "Note: a short warning when part of it costs money, for example the Adobe apps.",
        ],
      },
      { type: "heading", text: "3. Learn a little every day" },
      {
        type: "paragraph",
        text: "Open course opens the lesson in a new tab, so MentorLann stays open as your map. Thirty minutes a day is better than one long day a week. After each session, write down one thing you learned.",
      },
      { type: "heading", text: "4. Finish, then move on" },
      {
        type: "paragraph",
        text: "When you finish a course, come back to your path and open the next step. More career paths, and their courses, will unlock later.",
      },
    ],
  },
  {
    kind: "text",
    slug: "choose-your-first-career-path",
    title: "How to choose your first career path",
    summary:
      "You do not need the perfect answer today. Here is a simple way to pick a path and test it in one week.",
    topic: "Guide",
    author: "MentorLann team",
    publishedAt: "2026-11-14",
    cover: {
      src: careerPaths,
      alt: "The MentorLann career path cards: Web Development, Graphic Design and Accounting & Finance are open, three more are locked.",
    },
    body: [
      {
        type: "paragraph",
        text: "Choosing where to start can feel like the hardest step. You do not need the perfect answer today. You need a good first step that you can try.",
      },
      { type: "heading", text: "Start with the open paths" },
      {
        type: "paragraph",
        text: "Right now three paths are open: Web Development, Graphic Design, and Accounting & Finance. UI/UX Design, Digital Marketing and Data Analysis will unlock later.",
      },
      { type: "heading", text: "Ask yourself three questions" },
      {
        type: "list",
        items: [
          "What do I enjoy more: building things, making things look good, or keeping things organised?",
          "Which skills on the path cards sound interesting to me?",
          "Which jobs do I see around me, at work or in my city?",
        ],
      },
      { type: "heading", text: "Try it for one week" },
      {
        type: "paragraph",
        text: "Pick the path that feels closest and do Step 1 of its courses for one week. If you enjoy it, keep going. If not, try another path. That is not failure: it is how you find the right one.",
      },
      {
        type: "image",
        image: {
          src: fiveSteps,
          alt: "The five MentorLann steps on a route line: start your path, learn with others, practice, meet your mentors, reach your career goal.",
        },
        caption: "Every path follows the same five steps.",
      },
      { type: "heading", text: "Remember the route" },
      {
        type: "paragraph",
        text: "Whichever path you choose, the route is the same: start your path, learn with others, practice and see your progress, meet your mentors, and reach your career goal.",
      },
    ],
  },
];

// Newest first, for the list page.
export const VLOGS_NEWEST_FIRST = [...VLOGS].sort((a, b) =>
  b.publishedAt.localeCompare(a.publishedAt),
);

export const TEXT_VLOGS = VLOGS.filter(
  (vlog): vlog is TextVlog => vlog.kind === "text",
);

export function getTextVlog(slug: string) {
  return TEXT_VLOGS.find((vlog) => vlog.slug === slug);
}

// "14 Nov 2026". timeZone UTC: the same date on every server and computer.
export function formatDate(isoDate: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00Z`));
}

// Reading time from the words in the body (about 200 words per minute),
// so it never goes out of date when the text changes.
export function readingMinutes(vlog: TextVlog) {
  const words = vlog.body
    .flatMap((block) =>
      block.type === "list"
        ? block.items
        : block.type === "image"
          ? []
          : [block.text],
    )
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}
