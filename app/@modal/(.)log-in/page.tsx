import type { Metadata } from "next";
import { AuthModal } from "@/components/auth/auth-modal";
import { LogInScreen } from "@/components/auth/auth-screens";

export const metadata: Metadata = { title: "Log in" };

// "(.)log-in" INTERCEPTS the /log-in route: when someone clicks a link to
// /log-in inside the site, this popup is shown on top of the current page
// instead of leaving it. The URL still says /log-in.
export default function LogInModal({ searchParams }: PageProps<"/log-in">) {
  return <LogInScreen Frame={AuthModal} searchParams={searchParams} />;
}
