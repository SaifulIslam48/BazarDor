import { parseNum } from "./format";

export type Market = { name: string; division: string; min: number; max: number; avg: number };
export type Product = {
  id: string;
  slug: string;
  name: string;
  icon: string;
  unit: string; // Bangla, e.g. "প্রতি কেজি"
  price: number;
  yesterday: number;
  change: number; // signed percent, e.g. -2.9
  category: string; // category slug, e.g. "chal"
  categoryName: string;
  markets: Market[];
};
export type Category = { slug: string; name: string; icon: string };

// ---- raw shapes returned by the Bazardor API ----
type RawMarket = { market: string; division: string; min: number; max: number };
type RawProduct = {
  id: number; slug: string; nameBn: string; category: string; categoryNameBn: string; categoryIcon: string;
  unit: string; image: string; today: number; yesterday: number;
  change: { dir: "up" | "down" | "flat"; pct: number };
  markets: RawMarket[];
};
type RawCategory = { id: string; slug: string; nameBn: string; icon: string };

// Main API first, then the two alternative base URLs from the assignment
const BASES = [
  process.env.NEXT_PUBLIC_API_URL,
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
].filter(Boolean) as string[];

async function get<T>(path: string): Promise<T | null> {
  for (const base of BASES) {
    try {
      const res = await fetch(base + path, { next: { revalidate: 300 } });
      if (res.ok) return (await res.json()) as T;
    } catch {
      /* try the next base url */
    }
  }
  return null;
}

const UNITS: Record<string, string> = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  liter: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
};

function toProduct(r: RawProduct): Product {
  const pct = Math.abs(parseNum(r.change?.pct));
  const change = r.change?.dir === "down" ? -pct : r.change?.dir === "up" ? pct : 0;
  const markets = (r.markets ?? [])
    .map((m) => {
      const min = parseNum(m.min);
      const max = parseNum(m.max);
      return { name: m.market, division: m.division, min, max, avg: (min + max) / 2 };
    })
    .sort((a, b) => a.avg - b.avg); // Figma lists bazars from cheapest to most expensive average

  return {
    id: String(r.id),
    slug: r.slug,
    name: r.nameBn,
    icon: r.image || r.categoryIcon || "🛒",
    unit: UNITS[r.unit] ?? `প্রতি ${r.unit}`,
    price: parseNum(r.today),
    yesterday: parseNum(r.yesterday),
    change,
    category: r.category,
    categoryName: r.categoryNameBn,
    markets,
  };
}

const toCategory = (r: RawCategory): Category => ({ slug: r.slug ?? r.id, name: r.nameBn, icon: r.icon });

export async function getProducts(category?: string): Promise<Product[]> {
  const data = await get<RawProduct[]>(category ? `/products?category=${encodeURIComponent(category)}` : "/products");
  return Array.isArray(data) ? data.map(toProduct) : [];
}

/** Product pages use /product/[slug]; the list is cached, so this is one cheap lookup. */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const all = await getProducts();
  return all.find((p) => p.slug === slug || p.id === slug) ?? null;
}

export async function getCategories(): Promise<Category[]> {
  const data = await get<RawCategory[]>("/categories");
  return Array.isArray(data) ? data.map(toCategory) : [];
}

export async function getCategory(slug: string): Promise<Category | null> {
  const data = await get<RawCategory | RawCategory[]>(`/categories/${encodeURIComponent(slug)}`);
  const r = Array.isArray(data) ? data[0] : data;
  return r && r.nameBn ? toCategory(r) : null;
}

export const risers = (p: Product[]) => p.filter((x) => x.change > 0).sort((a, b) => b.change - a.change).slice(0, 6);
export const fallers = (p: Product[]) => p.filter((x) => x.change < 0).sort((a, b) => a.change - b.change).slice(0, 6);
