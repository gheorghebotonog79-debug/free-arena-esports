import { ExternalLink, Headphones, MessageCircle, MessagesSquare, Radio } from "lucide-react";
import { useTranslations } from "next-intl";
import { forumLinks } from "@/lib/forum-links";

const DISCORD_URL = "https://discord.gg/Unu756zZ";
const TEAMSPEAK_URL = "ts3server://ts.free-arena.ro";

const channels = [
  {
    key: "discord",
    href: DISCORD_URL,
    icon: MessagesSquare,
    iconClass: "border-[#98a3ff]/30 bg-[#5865f2]/14 text-[#98a3ff]",
    external: true,
  },
  {
    key: "teamspeak",
    href: TEAMSPEAK_URL,
    icon: Headphones,
    iconClass: "border-arena-cyan/30 bg-arena-cyan/12 text-arena-cyan",
    external: false,
  },
  {
    key: "forum",
    href: forumLinks.support,
    icon: MessageCircle,
    iconClass: "border-arena-green/30 bg-arena-green/12 text-arena-green",
    external: true,
  },
] as const;

export function CommunityLivePanel() {
  const t = useTranslations("LiveChat.card");

  return (
    <div className="premium-card glass-panel animated-border mt-4 rounded-lg p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-arena-cyan">
            {t("eyebrow")}
          </p>
          <h3 className="mt-3 font-display text-3xl font-black uppercase text-white">
            {t("title")}
          </h3>
          <p className="mt-3 text-sm leading-6 text-white/62">
            {t("copy")}
          </p>
        </div>

        <div className="grid gap-2 sm:grid-cols-3 lg:w-[34rem]">
          {channels.map((channel) => {
            const Icon = channel.icon;

            return (
              <a
                key={channel.key}
                href={channel.href}
                target={channel.external ? "_blank" : undefined}
                rel={channel.external ? "noopener noreferrer" : undefined}
                className="group rounded-lg border border-white/10 bg-white/[0.045] p-3 transition hover:border-arena-cyan/40 hover:bg-arena-cyan/10"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className={`grid size-10 place-items-center rounded-lg border ${channel.iconClass}`}>
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-lg border border-arena-green/30 bg-arena-green/12 px-2 py-1 text-[0.65rem] font-black uppercase tracking-[0.12em] text-arena-green">
                    <span className="live-pulse" aria-hidden="true">
                      <Radio size={12} />
                    </span>
                    {t(`channels.${channel.key}.status`)}
                  </span>
                </div>
                <p className="mt-3 text-sm font-black text-white">
                  {t(`channels.${channel.key}.title`)}
                </p>
                <p className="mt-1 text-xs font-semibold leading-5 text-white/44">
                  {t(`channels.${channel.key}.copy`)}
                </p>
                <span className="mt-3 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.12em] text-arena-cyan">
                  {t(`channels.${channel.key}.cta`)}
                  <ExternalLink size={14} className="transition group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
