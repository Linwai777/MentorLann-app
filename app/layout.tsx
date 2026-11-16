import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

// Two font families only (DESIGN.md section 3).
// next/font self-hosts them at build time, so there is no layout shift.
// Poppins matches the geometric letters of the MentorLann logo.
// Poppins is not a variable font, so we list only the weights we use.
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// The default share picture: a 1200x630 screenshot of the home hero
// (the size Facebook and others expect), in public/og-image.jpg.
const SHARE_IMAGE = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: 'MentorLann home page: "Learn Together. Grow Together." with a 5-step career route from Start to Career.',
};

export const metadata: Metadata = {
  // The base for every relative link in the metadata below and in the
  // pages (e.g. the share image "/opengraph-image.jpg" becomes
  // "https://<site>/opengraph-image.jpg"). See lib/site.ts.
  metadataBase: new URL(SITE_URL),
  // default: the home page's title.
  // template: inner pages set only their own name ("Courses") and Next.js
  // adds the brand: "Courses | MentorLann".
  title: {
    default: "MentorLann | Learn, belong, grow",
    template: "%s | MentorLann",
  },
  description:
    "MentorLann is a learning community where people of every age choose a career path, learn with others and show their progress.",
  // Open Graph: what Facebook, Viber, WhatsApp and LinkedIn show when
  // someone shares a link. Every page uses this picture unless it sets its
  // own (the vlog articles use their cover).
  // The picture is listed here by hand (not with the app/opengraph-image
  // file) because the Turbopack build skips the opengraph-image.alt.txt
  // file, and the alt text matters for screen readers.
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    images: [SHARE_IMAGE],
  },
  // X (Twitter): show the big picture card
  twitter: { card: "summary_large_image", images: [SHARE_IMAGE] },
};

export default function RootLayout({ children, modal }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        {/* The log-in / sign-up popup (app/@modal), or nothing */}
        {modal}
      </body>
    </html>
  );
}
