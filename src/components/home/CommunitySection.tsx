import { ArrowRight, ExternalLink, Headphones, MessageSquare, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";

const channels = [
  {
    key: "discord",
    href: "https://discord.gg/freearena",
    Icon: MessageSquare,
    external: true,
    tone: "text-[#98a3ff]",
  },
  {
    key: "teamspeak",
    href: "ts3server://ts.free-arena.ro",
    Icon: Headphones,
    external: false,
    tone: "text-cyber-cyan",
  },
  {
    key: "forum",
    href: "https://free-arena.ro",
    Icon: ExternalLink,
    external: true,
    tone: "text-cyber-amber",
  },
] as const;

export function CommunitySection() {
  const t = useTranslations("WarRoom.community");

  return (
    <section id="community" className="cyber-section scroll-mt-32 border-b border-white/10 bg-[#07080d] px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
          <div>
            <p className="hud-chip inline-flex border-cyber-cyan/28 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyber-cyan">
              {t("eyebrow")}
            </p>
            <h2 className="mt-5 max-w-2xl font-display text-[clamp(3rem,7vw,6rem)] font-black uppercase leading-[0.84] text-white">
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
                title={t(`cards.${channel.key}.title`)}
                tone={channel.tone}
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
  title,
  tone,
}: {
  Icon: LucideIcon;
  copy: string;
  cta: string;
  external: boolean;
  href: string;
  title: string;
  tone: string;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="cyber-panel cyber-card group min-h-72 p-5"
    >
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <Icon size={36} className={tone} aria-hidden="true" />
          <ArrowRight size={20} className="text-white/42 transition group-hover:translate-x-1 group-hover:text-cyber-cyan" aria-hidden="true" />
        </div>
        <h3 className="mt-8 font-display text-3xl font-black uppercase text-white">{title}</h3>
        <p className="mt-3 text-sm font-semibold leading-6 text-white/58">{copy}</p>
        <span className="mt-auto pt-6 text-xs font-black uppercase tracking-[0.18em] text-cyber-cyan">{cta}</span>
      </div>
    </a>
  );
}
