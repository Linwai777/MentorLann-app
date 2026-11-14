import {
  Ban,
  HandHelping,
  Heart,
  MapPin,
  MessageSquareText,
  MessagesSquare,
  Share2,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

// The MentorLann community is just starting (no members yet), so this page
// only says what is true: what we PLAN to do, how to join and our rules.
// No invented members, stories or numbers.

// Social links. Leave a value undefined until the page really exists:
// the Community page then shows "coming soon" instead of a broken link.
// When the Facebook page is ready, paste its address here and a
// "Follow us on Facebook" button appears automatically.
export const COMMUNITY_LINKS: { facebook?: string } = {
  facebook: undefined,
};

export type Activity = {
  title: string;
  description: string;
  where: string;
  icon: LucideIcon;
};

// Everything here is "Planned" until it really happens.
export const ACTIVITIES: Activity[] = [
  {
    title: "Study groups",
    description:
      "Small groups that follow the same career path and meet every week to learn and ask questions.",
    where: "Online",
    icon: Users,
  },
  {
    title: "Dubai meetups",
    description:
      "Meet other learners in person, share what you are working on and make friends on the same path.",
    where: "In Dubai",
    icon: MapPin,
  },
  {
    title: "Mentor chats",
    description:
      "Ask people who already work in the field about their jobs, their first steps and their mistakes.",
    where: "Online",
    icon: MessagesSquare,
  },
  {
    title: "Show your work",
    description:
      "Share a small project and get kind, honest feedback that helps you improve.",
    where: "Online",
    icon: Share2,
  },
];

export type Rule = { text: string; icon: LucideIcon };

export const RULES: Rule[] = [
  { text: "Be kind and patient. Everyone starts as a beginner.", icon: Heart },
  {
    text: "Help others learn. Share what you know, even small tips.",
    icon: HandHelping,
  },
  {
    text: "Give honest, useful feedback, and say how to improve.",
    icon: MessageSquareText,
  },
  {
    text: "Keep personal information private, yours and other people's.",
    icon: ShieldCheck,
  },
  { text: "No spam, no selling and no hate.", icon: Ban },
];
