import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
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

export const metadata: Metadata = {
  // default: the home page's title.
  // template: inner pages set only their own name ("Courses") and Next.js
  // adds the brand: "Courses | MentorLann".
  title: {
    default: "MentorLann | Learn, belong, grow",
    template: "%s | MentorLann",
  },
  description:
    "MentorLann is a learning community where people of every age choose a career path, learn with others and show their progress.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
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
      </body>
    </html>
  );
}
