import { redirect } from "next/navigation";
import SignInForm from "@/components/SignInForm";
import { getSession } from "@/lib/session";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; reason?: string }>;
}) {
  const { callbackUrl, reason } = await searchParams;
  const target = callbackUrl?.startsWith("/") && !callbackUrl.startsWith("//") ? callbackUrl : "/";
  if (await getSession()) redirect(target);
  return <SignInForm callbackUrl={target} protectedRedirect={reason === "protected"} />;
}
