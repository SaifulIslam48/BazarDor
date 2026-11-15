import type { Metadata } from "next";
import { Hind_Siliguri, Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import MarqueeTicker from "@/components/MarqueeTicker";
import Footer from "@/components/Footer";
import { getCategories, getProducts } from "@/lib/api";
import { bnDate } from "@/lib/format";

const bn = Hind_Siliguri({ subsets: ["bengali", "latin"], weight: ["400", "500", "600", "700"], variable: "--font-bn" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const dynamic = "force-dynamic"; // so the Bangla date is always today's

export const metadata: Metadata = {
  title: "বাজার দর",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);
  return (
    <html lang="bn" className={`${bn.variable} ${inter.variable}`}>
      <body>
        <Providers>
          <Navbar date={bnDate()} categories={categories} />
          <MarqueeTicker products={products} />
          <main className="flex-1 py-6 pb-14">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
