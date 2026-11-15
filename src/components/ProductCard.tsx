import Link from "next/link";
import type { Product } from "@/lib/api";
import { fmtNum } from "@/lib/format";
import ChangeBadge from "./ChangeBadge";
import { card } from "./ui";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className={`${card} block p-4 transition hover:-translate-y-0.5 hover:shadow-md`}
    >
      <div className="mb-4 flex items-center gap-3">
        <span className="grid h-[46px] w-[46px] flex-none place-items-center rounded-xl bg-[#eef1ec] text-[22px]">
          {product.icon}
        </span>
        <div>
          <div className="text-base font-semibold leading-tight">{product.name}</div>
          <div className="text-xs text-[#6a756f]">{product.unit}</div>
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <div className="text-xs text-[#333]">আজকের দাম</div>
          <div className="text-lg font-bold">{fmtNum(product.price)} টাকা</div>
        </div>
        <ChangeBadge change={product.change} />
      </div>
    </Link>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
