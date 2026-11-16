import type { Metadata } from "next";
import { AuthModal } from "@/components/auth/auth-modal";
import { SignUpScreen } from "@/components/auth/auth-screens";

export const metadata: Metadata = { title: "Join free" };

// Intercepts /sign-up the same way (see (.)log-in/page.tsx).
export default function SignUpModal({ searchParams }: PageProps<"/sign-up">) {
  return <SignUpScreen Frame={AuthModal} searchParams={searchParams} />;
}
