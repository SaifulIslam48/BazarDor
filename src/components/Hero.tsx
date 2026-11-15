import Image from "next/image";
import { btnGreen, card } from "./ui";

export default function Hero({ date }: { date: string }) {
  return (
    <section className={`${card} mb-9 flex flex-col-reverse items-center justify-between gap-6 p-6 md:flex-row md:px-10 md:py-9 lg:rounded-3xl`}>
      <div className="max-w-xl">
        <span className="mb-2 inline-block rounded-full bg-[#e1f0e6] px-3 py-1 text-xs font-semibold text-[#068a3f]">
          {date}
        </span>
        <h1 className="mb-3 text-3xl font-bold leading-tight md:text-[38px]">আজকের বাজারের দাম এক নজরে</h1>
        <p className="mb-6 leading-relaxed text-[#6a756f] md:text-base">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং
          দামের পরিবর্তন এক জায়গায়।
        </p>
        <a href="#সব-পণ্য" className={btnGreen}>
          সব পণ্য দেখুন
        </a>
      </div>
      <Image src="/bazar-hero.png" alt="বাজারের ঝুড়ি" width={300} height={240} priority className="h-auto w-48 md:w-72" />
    </section>
  );
}
