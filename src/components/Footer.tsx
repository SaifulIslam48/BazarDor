import { container } from "./ui";

export default function Footer() {
  return (
    <footer className="border-t border-[#e3e8e1] bg-[#fafcf9] py-6 text-sm">
      <div className={`${container} flex flex-col justify-between gap-2 sm:flex-row`}>
        <span>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</span>
        <span>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</span>
      </div>
    </footer>
  );
}
