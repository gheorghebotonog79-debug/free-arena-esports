import { ArrowRight, ExternalLink, Headphones, MessageSquare, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { TacticalCardChrome, TacticalStatusBadge, TacticalTag } from "@/components/home/HomeTacticalPrimitives";
import { forumLinks } from "@/lib/forum-links";

const channels = [
  {
    key: "discord",
    href: "https://discord.gg/Unu756zZ",
    Icon: MessageSquare,
    external: true,
    status: "LIVE CHAT",
    tone: "text-[#98a3ff]",
    variant: "server-card--global",
  },
  {
    key: "teamspeak",
    href: "ts3server://ts.free-arena.ro",
    Icon: Headphones,
    external: false,
    status: "VOICE ONLINE",
    tone: "text-cyber-cyan",
    variant: "server-card--respawn",
  },
  {
    key: "forum",
    href: forumLinks.home,
    Icon: ExternalLink,
    external: true,
    status: "FORUM LIVE",
    tone: "text-cyber-amber",
    variant: "server-card--cs16",
  },
] as const;

type CommunityChannelKey = (typeof channels)[number]["key"];

export function CommunitySection() {
  const t = useTranslations("WarRoom.community");

  return (
    <section id="community" className="neon-section fa-premium-section-tight scroll-mt-32 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <p className="neon-kicker section-badge-label px-4 py-2">
              {t("eyebrow")}
            </p>
            <h2 className="community-command-title neon-title neon-text-pulse mt-5 max-w-2xl font-display text-[clamp(3rem,7vw,6rem)] font-black uppercase leading-[0.84]">
              {t("title")}
            </h2>
            <p className="mt-5 max-w-xl text-base font-semibold leading-7 text-white/62">
              {t("copy")}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {channels.map((channel) => (
              <CommunityCard
                Icon={channel.Icon}
                copy={t(`cards.${channel.key}.copy`)}
                cta={t(`cards.${channel.key}.cta`)}
                external={channel.external}
                href={channel.href}
                key={channel.key}
                status={channel.status}
                title={t(`cards.${channel.key}.title`)}
                tone={channel.tone}
                variant={channel.key}
                variantClass={channel.variant}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CommunityCard({
  Icon,
  copy,
  cta,
  external,
  href,
  status,
  title,
  tone,
  variant,
  variantClass,
}: {
  Icon: LucideIcon;
  copy: string;
  cta: string;
  external: boolean;
  href: string;
  status: string;
  title: string;
  tone: string;
  variant: CommunityChannelKey;
  variantClass: string;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`server-tactical-card neon-hover ${variantClass} server-tactical-card--online home-community-card group flex h-full min-w-0 flex-col p-5`}
      data-occupancy="low"
      data-status="online"
    >
      <TacticalCardChrome />
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <span className="server-card__icon grid size-16 shrink-0 place-items-center">
            <Icon size={36} className={tone} aria-hidden="true" />
          </span>
          <TacticalStatusBadge label={status} />
        </div>
        <h3 className="server-card__title mt-8 inline-flex items-center gap-2 font-display text-2xl font-black uppercase leading-none text-white">
          {title}
        </h3>
        <p className="server-card__region mt-1 text-xs font-black uppercase tracking-[0.18em] text-white/42">
          FREE-ARENA
        </p>
        <p className="mt-3 text-sm font-semibold leading-6 text-white/58">{copy}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          <TacticalTag label={variant} />
          <TacticalTag label="community" />
        </div>
        <span className="server-details-button mt-auto inline-flex items-center justify-center gap-2 px-3 py-3 text-xs font-black uppercase tracking-[0.1em] text-white transition">
          {cta}
          <ArrowRight size={18} className="transition group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </a>
  );
}
