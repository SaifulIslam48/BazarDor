import { redirect } from "next/navigation";
import SignUpForm from "@/components/SignUpForm";
import { getSession } from "@/lib/session";

export default async function SignUpPage() {
  if (await getSession()) redirect("/");
  return <SignUpForm />;
}
