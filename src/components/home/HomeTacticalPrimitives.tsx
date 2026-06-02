import type { LucideIcon } from "lucide-react";

export function TacticalCardChrome() {
  return (
    <>
      <span className="server-card__backdrop" aria-hidden="true" />
      <span className="server-card__noise" aria-hidden="true" />
      <span className="server-card__scanline" aria-hidden="true" />
      <span className="server-card__shine" aria-hidden="true" />
    </>
  );
}

export function TacticalStatusBadge({ label }: { label: string }) {
  return (
    <span className="server-status-badge inline-flex shrink-0 items-center gap-2 px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-[0.14em]">
      <span className="server-status-badge__dot size-2 rounded-full" aria-hidden="true" />
      {label}
    </span>
  );
}

export function TacticalTag({ label }: { label: string }) {
  return (
    <span className="server-tag px-2.5 py-1 text-[0.68rem] font-black uppercase tracking-[0.12em] text-white/56">
      {label}
    </span>
  );
}

export function TacticalMetric({
  Icon,
  label,
  value,
}: {
  Icon?: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="server-metric min-w-0 p-3">
      <p className="flex items-center gap-2 text-[0.64rem] font-black uppercase tracking-[0.14em] text-white/34">
        {Icon ? <Icon size={15} className="server-card__accent-icon shrink-0" aria-hidden="true" /> : null}
        {label}
      </p>
      <p className="mt-2 truncate text-sm font-black uppercase text-white">{value}</p>
    </div>
  );
}
