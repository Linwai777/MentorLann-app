import {
  BarChart3,
  Calculator,
  Code2,
  Megaphone,
  Palette,
  PenTool,
  type LucideIcon,
} from "lucide-react";

// The career paths shown on the home page. Content lives here, separate from
// the layout, so adding or editing a path never means touching the JSX.
// Chosen for the MentorLann community (Myanmar learners, many in Dubai):
// fields with real entry-level demand that can be learned for free online.
export type CareerPath = {
  slug: string; // future page: /paths/<slug>
  title: string;
  description: string;
  skills: [string, string, string]; // exactly 3, so every card has the same shape
  icon: LucideIcon;
  // Locked paths are shown blurred behind a lock until their roadmap is ready.
  locked?: boolean;
};

// Order: the 3 open paths first, then the 3 locked ones.
export const CAREER_PATHS: CareerPath[] = [
  {
    slug: "web-development",
    title: "Web Development",
    description: "Build websites and web apps that people use every day.",
    skills: ["HTML & CSS", "JavaScript", "React"],
    icon: Code2,
  },
  {
    slug: "graphic-design",
    title: "Graphic Design",
    description: "Create logos, posts and visuals that make brands stand out.",
    skills: ["Photoshop", "Illustrator", "Branding"],
    icon: PenTool,
  },
  {
    slug: "accounting-finance",
    title: "Accounting & Finance",
    description: "Keep a business's money organised, from books to VAT.",
    skills: ["Bookkeeping", "Excel", "UAE VAT basics"],
    icon: Calculator,
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    description: "Design apps and websites that are clear and easy to use.",
    skills: ["Figma", "User research", "Prototyping"],
    icon: Palette,
    locked: true,
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    description: "Help businesses grow with social media and search.",
    skills: ["Social media", "SEO", "Content"],
    icon: Megaphone,
    locked: true,
  },
  {
    slug: "data-analysis",
    title: "Data Analysis",
    description: "Turn numbers into answers that help teams decide.",
    skills: ["Excel", "SQL", "Power BI"],
    icon: BarChart3,
    locked: true,
  },
];
