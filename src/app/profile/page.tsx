import { redirect } from "next/navigation";
import { SignOutButton, UpdateLink } from "@/components/ProfileActions";
import { card, inputCls } from "@/components/ui";
import { getSession } from "@/lib/session";

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) redirect("/signin?callbackUrl=/profile&reason=protected");
  const { name, email, image } = session.user;

  return (
    <div className="mx-auto w-full max-w-[658px] px-4">
      <h1 className="text-[28px] font-bold">আমার প্রোফাইল</h1>
      <p className="mb-5 mt-1 text-sm text-[#6a756f]">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>

      <section className={`${card} mb-5 flex flex-wrap items-center gap-3.5 rounded-[20px] p-5`}>
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={image} alt="" className="h-16 w-16 rounded-full border border-[#e3e8e1] object-cover" />
        ) : (
          <svg viewBox="0 0 40 40" className="h-16 w-16 overflow-hidden rounded-full border border-[#e3e8e1]" aria-hidden>
            <rect width="40" height="40" fill="#dbe6f2" />
            <circle cx="20" cy="15" r="7" fill="#5f8fc4" />
            <path d="M6 40c0-9 6-14 14-14s14 5 14 14z" fill="#5f8fc4" />
          </svg>
        )}
        <div className="flex-1">
          <div className="text-lg font-semibold">{name}</div>
          <div className="text-[15px] text-[#6a756f]">{email}</div>
        </div>
        <SignOutButton />
      </section>

      <section className={`${card} rounded-[20px] p-5`}>
        <h3 className="mb-3.5 text-[17px] font-semibold">তথ্য</h3>
        <div className="px-2 pb-2 sm:px-5">
          <label className="mb-4 block">
            <span className="mb-1.5 block text-sm font-medium">নাম</span>
            <input className={inputCls} value={name} readOnly />
          </label>
          <UpdateLink />
        </div>
      </section>
    </div>
  );
}
