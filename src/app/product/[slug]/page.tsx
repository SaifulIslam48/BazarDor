import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import ChangeBadge from "@/components/ChangeBadge";
import { card } from "@/components/ui";
import { getProductBySlug } from "@/lib/api";
import { fmtNum, toBn } from "@/lib/format";
import { getSession } from "@/lib/session";

const th = "px-3 py-3 font-medium text-[#6a756f]";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // protected route
  const session = await getSession();
  if (!session) redirect(`/signin?callbackUrl=${encodeURIComponent(`/product/${slug}`)}&reason=protected`);

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const catName = product.categoryName;
  const unitShort = product.unit.replace("প্রতি ", "");
  const m = product.markets;
  const min = m.length ? Math.min(...m.map((x) => x.min)) : product.price;
  const max = m.length ? Math.max(...m.map((x) => x.max)) : product.price;
  const diff = Math.abs(product.price - product.yesterday);

  const line =
    (product.change > 0
      ? `গতকালের তুলনায় আজ দাম বেড়েছে · ${toBn(diff)} টাকা`
      : product.change < 0
        ? `গতকালের তুলনায় আজ দাম কমেছে · ${toBn(diff)} টাকা`
        : "গতকালের তুলনায় আজ দাম অপরিবর্তিত");

  return (
    <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
      <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
        <Link href="/">হোম</Link> <span className="text-[#6a756f]">›</span>
        {catName && (
          <>
            <Link href={`/category/${product.category}`}>{catName}</Link> <span className="text-[#6a756f]">›</span>
          </>
        )}
        <span>{product.name}</span>
      </div>

      <section className={`${card} mb-5 flex flex-col gap-4 rounded-[20px] p-5 sm:flex-row sm:items-center`}>
        <span className="grid h-[76px] w-[76px] flex-none place-items-center rounded-[18px] bg-[#eef1ec] text-4xl">{product.icon}</span>
        <div className="flex-1">
          <h1 className="text-[28px] font-bold leading-tight sm:text-[30px]">{product.name}</h1>
          <div className="mb-1.5 mt-0.5 text-[13px] text-[#6a756f]">{product.unit}{catName && ` · ${catName}`}</div>
          <div className="text-[13px]">{line}</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {catName && <span className="rounded-full bg-[#e1f0e6] px-2.5 py-0.5 text-xs font-semibold text-[#068a3f]">{catName}</span>}
            <span className="rounded-full bg-[#eef1ec] px-2.5 py-0.5 text-xs">{product.unit}</span>
          </div>
        </div>
        <div className="min-w-[156px] rounded-[18px] bg-[#eef1ec] px-7 py-4 text-center">
          <div className="text-xs text-[#444]">আজকের দাম</div>
          <div className="text-4xl font-extrabold leading-tight">{fmtNum(product.price)}</div>
          <div className="text-[13px] text-[#333]">টাকা / {unitShort}</div>
          <div className="mt-1.5"><ChangeBadge change={product.change} plain /></div>
        </div>
      </section>

      <section className={`${card} rounded-[20px] p-5`}>
        <h3 className="mb-3.5 text-[17px] font-semibold">দামের সারসংক্ষেপ</h3>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            ["সর্বনিম্ন দাম", min, "text-[#068a3f]", "সবচেয়ে কম দামের বাজার"],
            ["সর্বাধিক দাম", max, "text-[#d7263d]", "সবচেয়ে বেশি দামের বাজার"],
            ["গড় দাম", product.price, "text-[#068a3f]", `${product.unit}-এর হিসাবে`],
          ].map(([label, val, color, note]) => (
            <div key={label as string} className="rounded-2xl border border-[#e3e8e1] px-[18px] py-4">
              <div className="text-xs text-[#444]">{label}</div>
              <div className={`my-1 text-2xl font-extrabold ${color}`}>
                {fmtNum(val as number)} <small className="text-sm font-medium">টাকা</small>
              </div>
              <div className="text-[11px] text-[#6a756f]">{note}</div>
            </div>
          ))}
        </div>

        <h3 className="mb-3.5 mt-7 text-[17px] font-semibold">বাজারভিত্তিক আজকের দাম</h3>
        <div className="overflow-x-auto rounded-[14px] border border-[#e3e8e1]">
          <table className="w-full min-w-[560px] border-collapse text-[13px]">
            <thead>
              <tr className="border-b border-[#e3e8e1] text-left">
                <th className={th}>বাজার</th>
                <th className={th}>বিভাগ</th>
                <th className={`${th} text-right`}>সর্বনিম্ন</th>
                <th className={`${th} text-right`}>সর্বাধিক</th>
                <th className={`${th} text-right`}>গড়</th>
              </tr>
            </thead>
            <tbody>
              {m.map((x, i) => (
                <tr key={x.name + i} className="border-t border-[#e3e8e1] even:bg-[#eff3ed]">
                  <td className="px-3 py-2.5">{x.name}</td>
                  <td className="px-3 py-2.5">{x.division}</td>
                  <td className="px-3 py-2.5 text-right">{fmtNum(x.min)} টাকা</td>
                  <td className="px-3 py-2.5 text-right">{fmtNum(x.max)} টাকা</td>
                  <td className="px-3 py-2.5 text-right font-bold">{fmtNum(x.avg)} টাকা</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
