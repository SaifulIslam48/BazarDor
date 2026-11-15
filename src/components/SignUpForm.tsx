"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "./SocialButtons";
import { btnGreen, card, inputCls } from "./ui";

export default function SignUpForm() {
  const router = useRouter();
  const [f, setF] = useState({ name: "", email: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) => setF({ ...f, [k]: e.target.value });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!f.name.trim() || !f.email.trim()) return toast.error("নাম ও ইমেইল দিন");
    if (f.password.length < 8) return toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
    if (f.password !== f.confirm) return toast.error("পাসওয়ার্ড দুটি মিলছে না");

    setLoading(true);
    const { error } = await authClient.signUp.email({ name: f.name.trim(), email: f.email, password: f.password });
    setLoading(false);
    if (error) return toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
    toast.success("অ্যাকাউন্ট তৈরি হয়েছে, এবার সাইন ইন করুন");
    router.push("/signin");
  }

  return (
    <div className="mx-auto mt-6 max-w-[400px] px-4 text-center">
      <h1 className="text-[28px] font-bold">অ্যাকাউন্ট তৈরি করুন</h1>
      <p className="mb-5 mt-1 text-sm text-[#6a756f]">বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>

      <form onSubmit={onSubmit} className={`${card} rounded-[18px] p-6 text-left`}>
        {[
          ["নাম", "name", "text", "যেমন: রহিম উদ্দিন"],
          ["ইমেইল", "email", "email", "you@example.com"],
          ["পাসওয়ার্ড", "password", "password", "কমপক্ষে ৮ অক্ষর"],
          ["পাসওয়ার্ড নিশ্চিত করুন", "confirm", "password", "আবার লিখুন"],
        ].map(([label, key, type, ph]) => (
          <label key={key} className="mb-4 block">
            <span className="mb-1.5 block text-sm font-medium">{label}</span>
            <input type={type} className={inputCls} placeholder={ph} value={f[key as keyof typeof f]} onChange={set(key as keyof typeof f)} />
          </label>
        ))}
        <button className={`${btnGreen} w-full`} disabled={loading}>
          {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
        </button>
        <SocialButtons />
        <p className="mt-4 text-center text-sm">
          অ্যাকাউন্ট আছে? <Link href="/signin" className="text-[#068a3f]">সাইন ইন করুন</Link>
        </p>
      </form>

      <Link href="/" className="mt-7 inline-block text-sm text-[#6a756f]">← হোম পেজে ফিরে যান</Link>
    </div>
  );
}
