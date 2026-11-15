"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { authClient, useSession } from "@/lib/auth-client";
import type { Category } from "@/lib/api";
import { btnGreen, btnSm, container } from "./ui";


export default function Navbar({ date, categories }: { date: string; categories: Category[] }) {
  const { data: session, isPending } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  async function logout() {
    setOpen(false);
    await authClient.signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  const user = session?.user;

  return (
    <header className="border-b border-[#e3e8e1] bg-[#fafcf9]">
      <div className={`${container} flex h-[66px] items-center justify-between`}>
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid h-[38px] w-[38px] place-items-center rounded-[10px] bg-[#068a3f] text-lg">🛒</span>
          <span>
            <span className="block text-lg font-bold leading-tight">বাজার দর</span>
            <span className="block text-[11px] text-[#333]">{date}</span>
          </span>
        </Link>

        <div className="flex items-center gap-4 sm:gap-5">
          {isPending ? null : user ? (
            <div className="relative" ref={ref}>
              <button onClick={() => setOpen((o) => !o)} className="flex items-center gap-2 text-sm font-medium">
                {user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={user.image} alt="" className="h-[34px] w-[34px] rounded-full border border-[#e3e8e1] object-cover" />
                ) : (
                  <svg viewBox="0 0 40 40" className="h-[34px] w-[34px] overflow-hidden rounded-full border border-[#e3e8e1]" aria-hidden>
                    <rect width="40" height="40" fill="#dbe6f2" />
                    <circle cx="20" cy="15" r="7" fill="#5f8fc4" />
                    <path d="M6 40c0-9 6-14 14-14s14 5 14 14z" fill="#5f8fc4" />
                  </svg>
                )}
                <span className="hidden sm:inline">{user.name?.split(" ")[0]}</span>
                <span className="text-[9px] text-[#6a756f]">▾</span>
              </button>
              {open && (
                <div className="absolute right-0 top-12 z-30 w-[247px] rounded-2xl border border-[#e3e8e1] bg-[#fafcf9] px-5 pb-6 pt-[18px] shadow-xl">
                  <div className="text-sm font-semibold">{user.name}</div>
                  <div className="mb-3.5 mt-0.5 break-all text-xs text-[#6a756f]">{user.email}</div>
                  <Link href="/profile" onClick={() => setOpen(false)} className="block py-1.5 text-[13px]">
                    👤 আমার প্রোফাইল
                  </Link>
                  <button onClick={logout} className="mt-1 block w-full py-1.5 text-left text-[13px] text-[#d7263d]">
                    ↩ সাইন আউট
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/signin" className="text-sm font-semibold">সাইন ইন</Link>
              <Link href="/signup" className={`${btnGreen} ${btnSm}`}>সাইন আপ</Link>
            </>
          )}
        </div>
      </div>

      <nav className="border-t border-[#e3e8e1]">
        <div className={`${container} flex h-[46px] items-center gap-2 overflow-x-auto whitespace-nowrap sm:gap-5`}>
          {categories.map((c) => {
            const active = pathname === `/category/${c.slug}`;
            return (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[13px] font-semibold transition ${active ? "bg-[#e1f0e6] text-[#068a3f]" : "hover:text-[#068a3f]"
                  }`}
              >
                <span>{c.icon}</span> {c.name}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
