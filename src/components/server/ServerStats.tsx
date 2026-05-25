import type { LucideIcon } from "lucide-react";

export type ServerStatItem = {
  key: string;
  label: string;
  value: string;
  Icon: LucideIcon;
  toneClass: string;
};

type ServerStatsProps = {
  title: string;
  pending: boolean;
  pendingTitle: string;
  pendingCopy: string;
  items: ServerStatItem[];
};

export function ServerStats({
  title,
  pending,
  pendingTitle,
  pendingCopy,
  items,
}: ServerStatsProps) {
  if (pending) {
    return (
      <section className="rounded-lg border border-arena-gold/24 bg-arena-gold/10 p-5">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-arena-gold">
          {pendingTitle}
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/68">
          {pendingCopy}
        </p>
      </section>
    );
  }

  return (
    <section>
      <h2 className="font-display text-2xl font-black uppercase text-white">
        {title}
      </h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {items.map(({ key, label, value, Icon, toneClass }) => (
          <div
            key={key}
            className="premium-card glass-panel min-h-32 rounded-lg p-4"
          >
            <Icon size={20} className={toneClass} aria-hidden="true" />
            <p className="mt-5 break-words font-display text-2xl font-black leading-tight text-white">
              {value}
            </p>
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-white/42">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
