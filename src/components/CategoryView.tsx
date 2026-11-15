"use client";
import { useMemo, useState } from "react";
import type { Product } from "@/lib/api";
import { toBn } from "@/lib/format";
import { ProductGrid } from "./ProductCard";
import EmptyState from "./EmptyState";

type Sort = "default" | "asc" | "desc";

export default function CategoryView({ title, icon, products }: { title: string; icon: string; products: Product[] }) {
  const [sort, setSort] = useState<Sort>("default");

  // price is already a real number (Bengali digits are parsed in lib/api), so numeric sort is safe
  const sorted = useMemo(() => {
    if (sort === "asc") return [...products].sort((a, b) => a.price - b.price);
    if (sort === "desc") return [...products].sort((a, b) => b.price - a.price);
    return products;
  }, [products, sort]);

  if (!products.length) return <EmptyState title="404" text="এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।" />;

  return (
    <>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-[22px] font-bold">{icon} {title}</h1>
          <p className="text-[13px] text-[#6a756f]">মোট {toBn(products.length)}টি পণ্য দেখানো হচ্ছে</p>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <span className="text-[#6a756f]">সাজান:</span>
          <span className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="h-10 appearance-none rounded-lg border border-[#e3e8e1] bg-[#fafcf9] pl-3 pr-9 text-sm outline-none focus:border-[#068a3f]"
            >
              <option value="default">ডিফল্ট</option>
              <option value="asc">দাম: কম থেকে বেশি</option>
              <option value="desc">দাম: বেশি থেকে কম</option>
            </select>
            <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" width="12" height="12" viewBox="0 0 12 12" aria-hidden>
              <path d="M2 4l4 4 4-4" fill="none" stroke="#444" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </label>
      </div>
      <ProductGrid products={sorted} />
    </>
  );
}
