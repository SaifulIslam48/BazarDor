import type { Product } from "@/lib/api";
import { fmtNum, fmtPct } from "@/lib/format";

function Items({ products }: { products: Product[] }) {
  return (
    <>
      {products.map((p) => (
        <div key={p.id} className="flex items-center gap-2 whitespace-nowrap border-r border-[#e3e8e1] px-4 py-3 text-[13px]">
          <span>{p.icon}</span>
          <b className="text-sm font-semibold">{p.name}</b>
          <span className="text-[#444]">
            {fmtNum(p.price)} টাকা/{p.unit.replace("প্রতি ", "")}
          </span>
          <span className={`font-bold ${p.change > 0 ? "text-[#d7263d]" : p.change < 0 ? "text-[#068a3f]" : "text-[#6a756f]"}`}>
            {p.change > 0 ? "▲ " : p.change < 0 ? "▼ " : ""}
            {fmtPct(p.change)}
          </span>
        </div>
      ))}
    </>
  );
}

export default function MarqueeTicker({ products }: { products: Product[] }) {
  if (!products.length) return null;
  return (
    <div className="overflow-hidden border-b border-[#e3e8e1] bg-[#fafcf9]">
      <div className="ticker-track flex w-max">
        <Items products={products} />
        <Items products={products} />
      </div>
    </div>
  );
}
