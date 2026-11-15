import { Suspense } from "react";
import Hero from "@/components/Hero";
import { ProductGrid } from "@/components/ProductCard";
import { GridSkeleton } from "@/components/Skeletons";
import { container } from "@/components/ui";
import { fallers, getProducts, risers } from "@/lib/api";
import { bnDate, toBn } from "@/lib/format";

const h2 = "mb-3.5 mt-8 flex items-center gap-1.5 text-[22px] font-bold";

function SectionsSkeleton() {
  return (
    <>
      <div className="mb-4 mt-8 h-7 w-48 animate-pulse rounded bg-[#e3e8e1]" />
      <GridSkeleton />
      <div className="mb-4 mt-8 h-7 w-48 animate-pulse rounded bg-[#e3e8e1]" />
      <GridSkeleton />
    </>
  );
}

async function Sections() {
  const products = await getProducts();
  if (!products.length) {
    return <p className="py-10 text-center text-[#6a756f]">পণ্যের তথ্য এখন লোড করা যাচ্ছে না। একটু পরে আবার চেষ্টা করুন।</p>;
  }
  return (
    <>
      <h2 className={h2}><span className="text-base text-[#d7263d]">▲</span> আজ দাম বেড়েছে</h2>
      <ProductGrid products={risers(products)} />

      <h2 className={h2}><span className="text-base text-[#068a3f]">▼</span> আজ দাম কমেছে</h2>
      <ProductGrid products={fallers(products)} />

      <h2 id="সব-পণ্য" className={h2}>সব পণ্য</h2>
      <p className="-mt-2 mb-3.5 text-[13px] text-[#6a756f]">মোট {toBn(products.length)}টি পণ্য দেখানো হচ্ছে</p>
      <ProductGrid products={products} />
    </>
  );
}

export default function Home() {
  return (
    <div className={container}>
      <Hero date={bnDate()} />
      <Suspense fallback={<SectionsSkeleton />}>
        <Sections />
      </Suspense>
    </div>
  );
}
