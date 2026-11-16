import type { Metadata } from "next";
import Link from "next/link";
import { AuthCard } from "@/components/auth/auth-card";
import { SignUpForm } from "@/components/auth/sign-up-form";

export const metadata: Metadata = {
  title: "Join free",
  description:
    "Create your free MentorLann account to learn and grow with the community.",
};

export default function SignUpPage() {
  return (
    <AuthCard
      title="Join MentorLann"
      intro="Create your free account. It takes less than a minute."
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/log-in"
            className="inline-flex min-h-11 items-center font-semibold text-royal-deep underline underline-offset-4 hover:text-royal"
          >
            Log in
          </Link>
        </>
      }
    >
      <SignUpForm />
    </AuthCard>
  );
}
