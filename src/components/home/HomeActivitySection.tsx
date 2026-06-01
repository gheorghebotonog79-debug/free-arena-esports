import { CalendarDays, Gift, ShieldCheck, Sparkles, Trophy, type LucideIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

type ActivityItem = {
  Icon: LucideIcon;
  copy: string;
  title: string;
};

const content: Record<
  Locale,
  {
    cards: readonly ActivityItem[];
    ctaDiscord: string;
    ctaRankings: string;
    ctaStaff: string;
    eyebrow: string;
    note: string;
    title: string;
  }
> = {
  ro: {
    eyebrow: "Activitate comunitate",
    title: "Evenimente FREE-ARENA",
    note: "Evenimentele sunt activate treptat pe masura ce comunitatea creste.",
    ctaDiscord: "Intra pe Discord pentru anunturi",
    ctaRankings: "Vezi clasamentul",
    ctaStaff: "Aplica staff",
    cards: [
      {
        Icon: CalendarDays,
        title: "Friday Night CS 1.6",
        copy: "Seara dedicata rundelor clasice, hartilor cunoscute si jucatorilor care vor meciuri curate.",
      },
      {
        Icon: Sparkles,
        title: "Frag of the Week",
        copy: "Highlight-uri si faze bune trimise de comunitate, pregatite pentru Discord si forum.",
      },
      {
        Icon: Gift,
        title: "VIP Giveaway",
        copy: "Premii mici si beneficii VIP pot fi oferite treptat pentru activitate reala pe servere.",
      },
      {
        Icon: ShieldCheck,
        title: "Admin Recruitment",
        copy: "Cautam oameni maturi care pot ajuta seara, pot tine comunitatea curata si pot raspunde pe Discord.",
      },
    ],
  },
  en: {
    eyebrow: "Community activity",
    title: "FREE-ARENA Events",
    note: "Events are activated gradually as the community grows.",
    ctaDiscord: "Join Discord for announcements",
    ctaRankings: "View rankings",
    ctaStaff: "Join staff",
    cards: [
      {
        Icon: CalendarDays,
        title: "Friday Night CS 1.6",
        copy: "A night for classic rounds, familiar maps, and players who want clean matches.",
      },
      {
        Icon: Sparkles,
        title: "Frag of the Week",
        copy: "Good plays and community highlights prepared for Discord and forum activity.",
      },
      {
        Icon: Gift,
        title: "VIP Giveaway",
        copy: "Small rewards and VIP benefits can be offered gradually for real server activity.",
      },
      {
        Icon: ShieldCheck,
        title: "Admin Recruitment",
        copy: "We are looking for mature people who can help in the evening and keep the community clean.",
      },
    ],
  },
};

export function HomeActivitySection({ locale }: { locale: Locale }) {
  const page = content[locale];

  return (
    <section id="events" className="neon-section scroll-mt-32 px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <p className="neon-kicker section-badge-label inline-flex px-4 py-2">
              {page.eyebrow}
            </p>
            <h2 className="neon-heading mt-5 max-w-3xl font-display text-[clamp(2.3rem,5vw,4.8rem)] font-black uppercase leading-[0.9] text-white">
              {page.title}
            </h2>
            <p className="mt-4 max-w-2xl text-base font-semibold leading-7 text-white/62">
              {page.note}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="https://discord.gg/freearena"
                target="_blank"
                rel="noreferrer"
                className="button-glow inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-black transition hover:bg-arena-green"
              >
                {page.ctaDiscord}
              </a>
              <Link
                href="/rankings"
                className="button-ghost inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/14 bg-white/[0.055] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:border-arena-cyan/60 hover:bg-arena-cyan/10"
              >
                <Trophy size={18} aria-hidden="true" />
                {page.ctaRankings}
              </Link>
              <Link
                href="/join-staff"
                className="button-ghost inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/14 bg-white/[0.055] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:border-arena-gold/60 hover:bg-arena-gold/10"
              >
                {page.ctaStaff}
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {page.cards.map(({ Icon, copy, title }) => (
              <article key={title} className="premium-card glass-panel neon-hover h-full rounded-lg p-5">
                <span className="grid size-12 place-items-center rounded-lg border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-2xl font-black uppercase text-white">
                  {title}
                </h3>
                <p className="mt-3 text-sm font-semibold leading-6 text-white/62">
                  {copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
