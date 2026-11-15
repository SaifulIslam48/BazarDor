import Link from "next/link";
import { btnGreen } from "./ui";

export default function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-16 text-center">
      <div className="text-7xl font-extrabold text-[#068a3f]">{title}</div>
      <p className="mb-6 mt-3 text-[#6a756f]">{text}</p>
      <Link href="/" className={btnGreen}>
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
