import { Code2, Megaphone, PenTool, type LucideIcon } from "lucide-react";

// The career paths shown on the home page. Content lives here, separate from
// the layout, so adding or editing a path never means touching the JSX.
// MentorLann focuses on three paths: Web Development, Graphic Design and
// Digital Marketing. All have real entry-level demand and can be learned
// for free online.
export type CareerPath = {
  slug: string; // future page: /paths/<slug>
  title: string;
  description: string;
  skills: [string, string, string]; // exactly 3, so every card has the same shape
  icon: LucideIcon;
  // Locked paths are shown blurred behind a lock until their roadmap is ready.
  locked?: boolean;
};

// All 3 paths are open. (Set `locked: true` on a path to blur it behind a lock.)
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
    slug: "digital-marketing",
    title: "Digital Marketing",
    description: "Help businesses grow with social media and search.",
    skills: ["Social media", "SEO", "Content"],
    icon: Megaphone,
  },
];
