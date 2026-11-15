import { card, container } from "./ui";

export function CardSkeleton() {
  return (
    <div className={`${card} animate-pulse p-4`}>
      <div className="mb-4 flex items-center gap-3">
        <div className="h-[46px] w-[46px] rounded-xl bg-[#e3e8e1]" />
        <div className="space-y-2">
          <div className="h-4 w-28 rounded bg-[#e3e8e1]" />
          <div className="h-3 w-16 rounded bg-[#e3e8e1]" />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div className="space-y-2">
          <div className="h-3 w-16 rounded bg-[#e3e8e1]" />
          <div className="h-5 w-24 rounded bg-[#e3e8e1]" />
        </div>
        <div className="h-6 w-14 rounded-full bg-[#e3e8e1]" />
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className={container} aria-busy="true">
      <div className="mb-8 h-56 animate-pulse rounded-3xl bg-[#e3e8e1]" />
      <div className="mb-4 h-7 w-48 animate-pulse rounded bg-[#e3e8e1]" />
      <GridSkeleton />
    </div>
  );
}
