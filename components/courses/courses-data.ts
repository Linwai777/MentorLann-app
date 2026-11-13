import type { CareerPath } from "@/components/home/career-paths-data";

// Free courses from trusted providers, chosen and put in order for each
// open career path. MentorLann does not make its own courses (yet); we guide
// learners to the best free ones.
//
// Shaped like future database rows (id, pathSlug, order ...), so in Phase 2
// this list can move to Postgres without changing the page.
// Every link was checked in a real browser on 2026-11-14.

export type CourseFormat = "Interactive" | "Video" | "Reading";

export type Course = {
  id: string;
  pathSlug: CareerPath["slug"]; // which career path it belongs to
  order: number; // 1 = do this first
  title: string;
  provider: string;
  url: string;
  description: string;
  level: "Beginner" | "Next step";
  format: CourseFormat;
  note?: string; // honest extra info, e.g. "the app itself is paid"
};

export const COURSES: Course[] = [
  // Web Development
  {
    id: "fcc-responsive-web-design",
    pathSlug: "web-development",
    order: 1,
    title: "Responsive Web Design",
    provider: "freeCodeCamp",
    url: "https://www.freecodecamp.org/learn/responsive-web-design-v9/",
    description:
      "Learn HTML and CSS by building real pages, right in your browser.",
    level: "Beginner",
    format: "Interactive",
  },
  {
    id: "fcc-javascript",
    pathSlug: "web-development",
    order: 2,
    title: "JavaScript",
    provider: "freeCodeCamp",
    url: "https://www.freecodecamp.org/learn/javascript-v9/",
    description: "Make pages interactive and learn to think like a programmer.",
    level: "Beginner",
    format: "Interactive",
  },
  {
    id: "odin-foundations",
    pathSlug: "web-development",
    order: 3,
    title: "Foundations",
    provider: "The Odin Project",
    url: "https://www.theodinproject.com/paths/foundations/courses/foundations",
    description:
      "Set up real developer tools, use Git and build small projects on your own.",
    level: "Beginner",
    format: "Reading",
  },
  {
    id: "react-learn",
    pathSlug: "web-development",
    order: 4,
    title: "Learn React",
    provider: "react.dev",
    url: "https://react.dev/learn",
    description:
      "The official React course: build user interfaces from components.",
    level: "Next step",
    format: "Reading",
  },

  // Graphic Design
  {
    id: "learnfree-beginning-graphic-design",
    pathSlug: "graphic-design",
    order: 1,
    title: "Beginning Graphic Design",
    provider: "LearnFree",
    url: "https://www.learnfree.org/series/beginning-graphic-design",
    description:
      "The basics every designer needs: color, type, layout and images.",
    level: "Beginner",
    format: "Video",
  },
  {
    id: "canva-design-school",
    pathSlug: "graphic-design",
    order: 2,
    title: "Design School",
    provider: "Canva",
    url: "https://www.canva.com/design-school/",
    description:
      "Short lessons to make social posts, flyers and presentations fast.",
    level: "Beginner",
    format: "Video",
  },
  {
    id: "adobe-learn-photoshop",
    pathSlug: "graphic-design",
    order: 3,
    title: "Learn Photoshop",
    provider: "Adobe",
    url: "https://www.adobe.com/learn/photoshop",
    description: "Edit photos and build images layer by layer.",
    level: "Next step",
    format: "Video",
    note: "Tutorials are free; Photoshop itself is paid (free trial).",
  },
  {
    id: "adobe-learn-illustrator",
    pathSlug: "graphic-design",
    order: 4,
    title: "Learn Illustrator",
    provider: "Adobe",
    url: "https://www.adobe.com/learn/illustrator",
    description: "Draw logos and icons that stay sharp at any size.",
    level: "Next step",
    format: "Video",
    note: "Tutorials are free; Illustrator itself is paid (free trial).",
  },

  // Accounting & Finance
  {
    id: "khan-accounting",
    pathSlug: "accounting-finance",
    order: 1,
    title: "Accounting and financial statements",
    provider: "Khan Academy",
    url: "https://www.khanacademy.org/economics-finance-domain/core-finance/accounting-and-financial-stateme",
    description: "Understand balance sheets, income statements and cash flow.",
    level: "Beginner",
    format: "Video",
  },
  {
    id: "learnfree-excel-foundations",
    pathSlug: "accounting-finance",
    order: 2,
    title: "Excel: Foundations",
    provider: "LearnFree",
    url: "https://www.learnfree.org/series/excel-foundations",
    description: "Spreadsheets from zero: cells, formulas and simple tables.",
    level: "Beginner",
    format: "Video",
  },
  {
    id: "accountingcoach",
    pathSlug: "accounting-finance",
    order: 3,
    title: "Bookkeeping and accounting topics",
    provider: "AccountingCoach",
    url: "https://www.accountingcoach.com/",
    description: "Clear explanations of debits, credits, journals and more.",
    level: "Beginner",
    format: "Reading",
    note: "The explanations are free; extra PRO material is paid.",
  },
  {
    id: "uae-fta-vat-guides",
    pathSlug: "accounting-finance",
    order: 4,
    title: "UAE VAT guides",
    provider: "UAE Federal Tax Authority",
    url: "https://tax.gov.ae/en/taxes/vat/guides.references.aspx",
    description:
      "The official guides to VAT in the UAE, straight from the tax authority.",
    level: "Next step",
    format: "Reading",
  },
];

// The courses of one path, in learning order.
export function coursesForPath(pathSlug: string) {
  return COURSES.filter((course) => course.pathSlug === pathSlug).sort(
    (a, b) => a.order - b.order,
  );
}
