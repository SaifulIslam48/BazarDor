import { redirect } from "next/navigation";
import Link from "next/link";
import { UpdateForm } from "@/components/ProfileActions";
import { card } from "@/components/ui";
import { getSession } from "@/lib/session";

export default async function UpdateProfilePage() {
  const session = await getSession();
  if (!session) redirect("/signin?callbackUrl=/profile/update&reason=protected");

  return (
    <div className="mx-auto w-full max-w-[658px] px-4">
      <h1 className="text-[28px] font-bold">তথ্য আপডেট করুন</h1>
      <p className="mb-5 mt-1 text-sm text-[#6a756f]">আপনার নাম পরিবর্তন করে আপডেট বাটনে ক্লিক করুন।</p>
      <section className={`${card} rounded-[20px] p-5`}>
        <UpdateForm initialName={session.user.name ?? ""} />
      </section>
      <Link href="/profile" className="mt-6 inline-block text-sm text-[#6a756f]">← প্রোফাইলে ফিরে যান</Link>
    </div>
  );
}
