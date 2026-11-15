const BN = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export const toBn = (v: number | string) => String(v).replace(/\d/g, (d) => BN[Number(d)]);

/** Bengali or English digits (e.g. "১,৮৫০") -> number. Used for sorting + maths. */
export function parseNum(v: unknown): number {
  if (typeof v === "number") return v;
  const s = String(v ?? "")
    .replace(/[০-৯]/g, (d) => String(BN.indexOf(d)))
    .replace(/[^\d.\-]/g, "");
  const n = parseFloat(s);
  return Number.isFinite(n) ? n : 0;
}

export function fmtNum(n: number) {
  return toBn(
    n.toLocaleString("en-US", {
      minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
      maximumFractionDigits: 2,
    })
  );
}

export const fmtPct = (p: number) => toBn(Math.abs(p).toFixed(1)) + "%";

export function bnDate(d: Date = new Date()) {
  return d.toLocaleDateString("bn-BD", {
    weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Dhaka",
  });
}
