import { Activity, Gauge, Map, RadioTower, Server, UsersRound } from "lucide-react";
import { TacticalCard, TacticalGrid, TacticalInfoBlock, TacticalSection } from "@/components/public/PublicPagePrimitives";
import type { Locale } from "@/i18n/routing";
import type { ServerSeoPageData } from "@/lib/serverSeo";
import type { PublicServerConfig } from "@/lib/servers";

type ServerInfoSectionProps = {
  labels: {
    currentMap: string;
    ip: string;
    latency: string;
    players: string;
    port: string;
    status: string;
    title: string;
  };
  locale: Locale;
  page: ServerSeoPageData;
  server: PublicServerConfig;
};

export function ServerInfoSection({ labels, locale, page, server }: ServerInfoSectionProps) {
  const info = page.info[locale];
  const pendingHostLabel = locale === "ro" ? "DNS nepornit încă" : "DNS not live yet";
  const pendingValue = locale === "ro" ? "Pregătit pentru lansare" : "Ready for launch";
  const items = [
    { key: "ip", label: labels.ip, value: server.pending ? pendingHostLabel : server.host, Icon: Server, tone: "text-arena-cyan" },
    { key: "port", label: labels.port, value: String(server.port), Icon: RadioTower, tone: "text-arena-green" },
    { key: "status", label: labels.status, value: info.status, Icon: Activity, tone: "text-arena-gold" },
    { key: "players", label: labels.players, value: info.players, Icon: UsersRound, tone: "text-[#98a3ff]" },
    { key: "map", label: labels.currentMap, value: server.pending ? pendingValue : info.map, Icon: Map, tone: "text-arena-red" },
    { key: "latency", label: labels.latency, value: server.pending ? pendingValue : info.latency, Icon: Gauge, tone: "text-white" },
  ];

  return (
    <TacticalSection
      className="py-12"
      eyebrow="SERVER INTEL"
      title={labels.title}
    >
        <TacticalGrid columns="three">
          {items.map(({ Icon, key, label, value }, index) => (
            <TacticalCard key={key} tone={index % 3 === 0 ? "cs2" : index % 3 === 1 ? "cs16" : "respawn"} className="min-h-40">
              <TacticalInfoBlock Icon={Icon} label={label} value={value} />
            </TacticalCard>
          ))}
        </TacticalGrid>
    </TacticalSection>
  );
}
