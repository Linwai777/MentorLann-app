// Links shown in both the Header and the Footer.
// Keeping them in one list means a section is added or renamed in one place only.
// "/#..." = a section on the home page; "/community" etc. = its own page.
export type NavLink = {
  label: string;
  href: string;
};

export const NAV_LINKS: NavLink[] = [
  { label: "Career paths", href: "/#paths" },
  { label: "How it works", href: "/#how" },
  { label: "Community", href: "/community" },
  // Knowledge-sharing vlogs: short videos where learners and mentors share
  // what they know. Placed next to Community because members make them.
  { label: "Vlogs", href: "/vlogs" },
  { label: "Courses", href: "/courses" },
];
