import type { Metadata } from "next";
import { AuthCard } from "@/components/auth/auth-card";
import { SignUpScreen } from "@/components/auth/auth-screens";

export const metadata: Metadata = {
  title: "Join free",
  description:
    "Create your free MentorLann account to learn and grow with the community.",
};

// The full sign-up page (direct visits). Clicks inside the site open the
// popup instead (app/@modal/(.)sign-up).
export default function SignUpPage({ searchParams }: PageProps<"/sign-up">) {
  return <SignUpScreen Frame={AuthCard} searchParams={searchParams} />;
}
