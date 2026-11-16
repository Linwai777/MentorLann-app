import type { Metadata } from "next";
import { AuthCard } from "@/components/auth/auth-card";
import { LogInScreen } from "@/components/auth/auth-screens";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to your MentorLann account.",
};

// The full log-in page: shown when /log-in is opened directly (a link in
// an email, a refresh). Clicks inside the site open the popup instead
// (app/@modal/(.)log-in).
export default function LogInPage({ searchParams }: PageProps<"/log-in">) {
  return <LogInScreen Frame={AuthCard} searchParams={searchParams} />;
}
