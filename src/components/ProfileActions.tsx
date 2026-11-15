"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { btnGreen, inputCls } from "./ui";

export function SignOutButton() {
  const router = useRouter();
  return (
    <button
      className="rounded-[10px] border border-[#d7263d] px-4 py-2 text-sm font-medium text-[#d7263d] hover:bg-[#d7263d]/5"
      onClick={async () => {
        await authClient.signOut();
        toast.success("সফলভাবে সাইন আউট হয়েছে");
        router.push("/");
        router.refresh();
      }}
    >
      ↩ সাইন আউট
    </button>
  );
}

export function UpdateLink() {
  return (
    <Link href="/profile/update" className={`${btnGreen} w-full`}>
      আপডেট
    </Link>
  );
}

export function UpdateForm({ initialName }: { initialName: string }) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (name.trim().length < 2) return toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে");
    setLoading(true);
    const { error } = await authClient.updateUser({ name: name.trim() });
    setLoading(false);
    if (error) return toast.error(error.message || "তথ্য আপডেট করা যায়নি");
    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="px-2 pb-2 sm:px-5">
      <label className="mb-4 block">
        <span className="mb-1.5 block text-sm font-medium">নাম</span>
        <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <button className={`${btnGreen} w-full`} disabled={loading}>
        {loading ? "অপেক্ষা করুন..." : "তথ্য আপডেট করুন"}
      </button>
    </form>
  );
}
