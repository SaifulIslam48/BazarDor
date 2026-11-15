import { fmtPct } from "@/lib/format";

export default function ChangeBadge({ change, plain = false }: { change: number; plain?: boolean }) {
  const tone =
    change > 0 ? "text-[#d7263d] bg-[#f2eeee]" : change < 0 ? "text-[#068a3f] bg-[#e8f2ea]" : "text-[#6a756f] bg-[#eef1ec]";
  const mark = change > 0 ? "▲ " : change < 0 ? "▼ " : "— ";
  return (
    <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${plain ? tone.replace(/bg-\[[^\]]+\]/, "") : tone}`}>
      {mark}
      {fmtPct(change)}
    </span>
  );
}
