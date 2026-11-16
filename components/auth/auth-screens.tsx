import type { ComponentType, ReactNode } from "react";
import { AuthSwitchLink } from "@/components/auth/next-path";
import { RedirectMembers } from "@/components/auth/redirect-members";
import { LogInForm } from "@/components/auth/log-in-form";
import { SignUpForm } from "@/components/auth/sign-up-form";

// The log-in and sign-up "screens": title, intro, form and the link to
// the other one. Written ONCE and shown in two frames:
// - AuthCard (components/auth/auth-card.tsx): the full page, when someone
//   opens /log-in directly or refreshes it
// - AuthModal (components/auth/auth-modal.tsx): the popup, when someone
//   clicks "Log in" / "Join free" while on the site
// `Frame` is the component that draws the box around the content.
export type AuthFrame = ComponentType<{
  title: string;
  intro: string;
  footer: ReactNode;
  children: ReactNode;
}>;

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const SWITCH_LINK =
  "inline-flex min-h-11 items-center font-semibold text-royal-deep underline underline-offset-4 hover:text-royal";

export function LogInScreen({
  Frame,
  searchParams,
}: {
  Frame: AuthFrame;
  searchParams: SearchParams;
}) {
  return (
    <Frame
      title="Welcome back"
      intro="Log in to continue learning with MentorLann."
      footer={
        <>
          New here?{" "}
          <AuthSwitchLink href="/sign-up" className={SWITCH_LINK}>
            Join free
          </AuthSwitchLink>
        </>
      }
    >
      {/* Already logged in? Go on to ?next=... (or home) */}
      <RedirectMembers searchParams={searchParams} />
      <LogInForm />
    </Frame>
  );
}

export function SignUpScreen({
  Frame,
  searchParams,
}: {
  Frame: AuthFrame;
  searchParams: SearchParams;
}) {
  return (
    <Frame
      title="Join MentorLann"
      intro="Create your free account. It takes less than a minute."
      footer={
        <>
          Already have an account?{" "}
          <AuthSwitchLink href="/log-in" className={SWITCH_LINK}>
            Log in
          </AuthSwitchLink>
        </>
      }
    >
      <RedirectMembers searchParams={searchParams} />
      <SignUpForm />
    </Frame>
  );
}
