import { ArrowRight, ExternalLink, Headphones, MessageSquare, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";

const channels = [
  {
    key: "discord",
    href: "https://discord.gg/freearena",
    Icon: MessageSquare,
    external: true,
    status: "LIVE CHAT",
    tone: "text-[#98a3ff]",
  },
  {
    key: "teamspeak",
    href: "ts3server://ts.free-arena.ro",
    Icon: Headphones,
    external: false,
    status: "VOICE ONLINE",
    tone: "text-cyber-cyan",
  },
  {
    key: "forum",
    href: "https://free-arena.ro",
    Icon: ExternalLink,
    external: true,
    status: "FORUM LIVE",
    tone: "text-cyber-amber",
  },
] as const;

type CommunityChannelKey = (typeof channels)[number]["key"];

export function CommunitySection() {
  const t = useTranslations("WarRoom.community");

  return (
    <section id="community" className="neon-section scroll-mt-32 px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <p className="neon-kicker px-4 py-2 text-xs font-black uppercase tracking-[0.22em]">
              {t("eyebrow")}
            </p>
            <h2 className="community-command-title mt-5 max-w-2xl font-display text-[clamp(3rem,7vw,6rem)] font-black uppercase leading-[0.84]">
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
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={`neon-card community-portal-card community-portal-card--${variant} group p-5`}
    >
      <span className="community-card__backdrop" aria-hidden="true" />
      <span className="community-card__scanline" aria-hidden="true" />
      <span className="community-card__shine" aria-hidden="true" />
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <span className="community-card__icon neon-icon-cell grid size-16 place-items-center">
            <Icon size={36} className={tone} aria-hidden="true" />
          </span>
          <span className="community-card__status border px-2 py-1 text-[0.62rem] font-black uppercase tracking-[0.16em]">
            {status}
          </span>
        </div>
        <h3 className="community-card__title mt-8 font-display font-black uppercase text-white">{title}</h3>
        <p className="mt-3 text-sm font-semibold leading-6 text-white/58">{copy}</p>
        <span className="community-card__cta mt-auto inline-flex items-center gap-2 pt-6 text-xs font-black uppercase tracking-[0.18em]">
          {cta}
          <ArrowRight size={18} className="transition group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </a>
  );
}
