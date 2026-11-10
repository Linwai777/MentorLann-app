// Links shown in both the Header and the Footer.
// Keeping them in one list means a section is added or renamed in one place only.
// The "/#..." anchors point at home page sections; they become real routes later.
export type NavLink = {
  label: string;
  href: string;
};

export const NAV_LINKS: NavLink[] = [
  { label: "Career paths", href: "/#paths" },
  { label: "How it works", href: "/#how" },
  { label: "Community", href: "/#community" },
  { label: "Courses", href: "/#courses" },
];
