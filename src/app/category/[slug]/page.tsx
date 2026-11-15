import { Suspense } from "react";
import CategoryView from "@/components/CategoryView";
import EmptyState from "@/components/EmptyState";
import { GridSkeleton } from "@/components/Skeletons";
import { container } from "@/components/ui";
import { getCategory, getProducts } from "@/lib/api";

async function Content({ slug }: { slug: string }) {
  const [cat, all] = await Promise.all([getCategory(slug), getProducts(slug)]);
  // some APIs ignore an unknown filter and return everything, so double-check the slug
  const products = all.filter((p) => !p.category || p.category === slug);
  if (!cat && !products.length) return <EmptyState title="404" text="এই ক্যাটাগরিটি খুঁজে পাওয়া যায়নি।" />;
  return <CategoryView title={cat?.name ?? products[0]?.categoryName ?? slug} icon={cat?.icon ?? "🛒"} products={products} />;
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <div className={container}>
      <Suspense
        fallback={
          <>
            <div className="mb-5 h-8 w-44 animate-pulse rounded bg-[#e3e8e1]" />
            <GridSkeleton count={9} />
          </>
        }
      >
        <Content slug={slug} />
      </Suspense>
    </div>
  );
}
