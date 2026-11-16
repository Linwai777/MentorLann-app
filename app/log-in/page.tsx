import type { Metadata } from "next";
import Link from "next/link";
import { AuthCard } from "@/components/auth/auth-card";
import { LogInForm } from "@/components/auth/log-in-form";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to your MentorLann account.",
};

export default function LogInPage() {
  return (
    <AuthCard
      title="Welcome back"
      intro="Log in to continue learning with MentorLann."
      footer={
        <>
          New here?{" "}
          <Link
            href="/sign-up"
            className="inline-flex min-h-11 items-center font-semibold text-royal-deep underline underline-offset-4 hover:text-royal"
          >
            Join free
          </Link>
        </>
      }
    >
      <LogInForm />
    </AuthCard>
  );
}
