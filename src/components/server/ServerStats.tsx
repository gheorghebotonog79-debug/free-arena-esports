import type { LucideIcon } from "lucide-react";
import {
  TacticalBadge,
  TacticalCard,
  TacticalCardHeader,
  TacticalGrid,
  TacticalInfoBlock,
} from "@/components/public/PublicPagePrimitives";

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
      <TacticalCard as="section" tone="global" status="pending" className="min-h-52">
        <TacticalCardHeader
          badge={<TacticalBadge>{pendingTitle}</TacticalBadge>}
          eyebrow="SERVER STATUS"
          title={pendingTitle}
        />
        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/68">
          {pendingCopy}
        </p>
      </TacticalCard>
    );
  }

  return (
    <section>
      <h2 className="font-display text-2xl font-black uppercase text-white">
        {title}
      </h2>
      <TacticalGrid columns="auto" className="mt-4 2xl:grid-cols-5">
        {items.map(({ key, label, value, Icon }, index) => (
          <TacticalCard
            key={key}
            tone={index % 4 === 0 ? "cs2" : index % 4 === 1 ? "cs16" : index % 4 === 2 ? "respawn" : "global"}
            className="min-h-40"
          >
            <TacticalInfoBlock Icon={Icon} label={label} value={<span className="font-display text-2xl">{value}</span>} />
          </TacticalCard>
        ))}
      </TacticalGrid>
    </section>
  );
}
