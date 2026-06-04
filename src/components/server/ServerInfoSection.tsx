import { Activity, Gauge, Map, RadioTower, Server, UsersRound } from "lucide-react";
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
    <section className="neon-section px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <h2 className="neon-title neon-text-pulse font-display text-3xl font-black uppercase text-white">
          {labels.title}
        </h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ Icon, key, label, tone, value }) => (
            <div key={key} className="premium-card glass-panel neon-hover min-h-32 rounded-lg p-4">
              <div className="flex items-start justify-between gap-4">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-white/40">
                  {label}
                </p>
                <Icon size={20} className={tone} aria-hidden="true" />
              </div>
              <p className="mt-5 break-words text-base font-black leading-6 text-white">
                {value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
