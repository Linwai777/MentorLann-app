import type { Metadata } from "next";
import { Calistoga, Inter } from "next/font/google";
import { Header } from "@/components/site/header";
import "./globals.css";

// Two font families only (DESIGN.md section 3).
// next/font self-hosts them at build time, so there is no layout shift.
const calistoga = Calistoga({
  variable: "--font-calistoga",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MentorLann | Learn, belong, grow",
  description:
    "MentorLann is a learning community where people of every age choose a career path, learn with others and show their progress.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${calistoga.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
