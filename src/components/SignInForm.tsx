"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "./SocialButtons";
import { btnGreen, card, inputCls } from "./ui";

export default function SignInForm({ callbackUrl, protectedRedirect }: { callbackUrl: string; protectedRedirect: boolean }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (protectedRedirect) toast.error("এই পেজ দেখতে আগে সাইন ইন করুন", { id: "protected" });
  }, [protectedRedirect]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || password.length < 8) return toast.error("সঠিক ইমেইল ও কমপক্ষে ৮ অক্ষরের পাসওয়ার্ড দিন");
    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);
    if (error) return toast.error(error.message || "ইমেইল বা পাসওয়ার্ড সঠিক নয়");
    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div className="mx-auto mt-6 max-w-[400px] px-4 text-center">
      <h1 className="text-[28px] font-bold">সাইন ইন</h1>
      <p className="mb-5 mt-1 text-sm text-[#6a756f]">বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।</p>

      <form onSubmit={onSubmit} className={`${card} rounded-[18px] p-6 text-left`}>
        <label className="mb-4 block">
          <span className="mb-1.5 block text-sm font-medium">ইমেইল</span>
          <input type="email" className={inputCls} placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className="mb-4 block">
          <span className="mb-1.5 block text-sm font-medium">পাসওয়ার্ড</span>
          <input type="password" className={inputCls} placeholder="কমপক্ষে ৮ অক্ষর" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button className={`${btnGreen} w-full`} disabled={loading}>
          {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
        </button>
        <SocialButtons callbackURL={callbackUrl} />
        <p className="mt-4 text-center text-sm">
          অ্যাকাউন্ট নেই? <Link href="/signup" className="text-[#068a3f]">সাইন আপ করুন</Link>
        </p>
      </form>

      <Link href="/" className="mt-7 inline-block text-sm text-[#6a756f]">← হোম পেজে ফিরে যান</Link>
    </div>
  );
}
