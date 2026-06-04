import { CheckCircle2, Clock3, MessageSquare, ShieldCheck, Trophy, UserPlus, type LucideIcon } from "lucide-react";
import { TrackedAnchor } from "@/components/analytics/TrackedLink";
import {
  PublicPageShell,
  TacticalActions,
  TacticalBadge,
  TacticalCard,
  TacticalCardHeader,
  TacticalGrid,
  TacticalInfoBlock,
  TacticalSection,
} from "@/components/public/PublicPagePrimitives";
import type { Locale } from "@/i18n/routing";
import { forumLinks } from "@/lib/forum-links";

const DISCORD_URL = "https://discord.gg/freearena";

const content = {
  ro: {
    eyebrow: "Recrutare staff",
    title: "Căutăm admini activi pentru FREE-ARENA",
    copy:
      "FREE-ARENA este într-o etapă în care comunitatea contează mai mult decât orice pagină. Avem nevoie de oameni maturi, prezenți seara, care pot ajuta jucătorii și pot ține serverele curate.",
    apply: "Aplică pe Forum",
    discord: "Discută pe Discord",
    requirementsTitle: "Cerințe",
    benefitsTitle: "Beneficii",
    noteTitle: "Ce căutăm de fapt",
    note:
      "Nu căutăm admini doar pentru comenzi. Căutăm oameni care pot vorbi normal cu jucătorii, pot calma conflicte și pot ajuta comunitatea să crească fără promisiuni false.",
    routeTitle: "Traseu aplicare",
    requirements: [
      "Minim 16 ani.",
      "Activitate seara, când serverele au cea mai mare șansă să strângă jucători.",
      "Comportament matur și răbdare cu jucătorii noi.",
      "Cont pe forum obligatoriu pentru comunicarea cu echipa.",
      "Experiența CS reprezintă avantaj.",
    ],
    benefits: [
      "Rol staff în comunitatea FREE-ARENA.",
      "Acces la organizarea comunității și la deciziile operaționale.",
      "Prioritate la evenimente, testări și activități comunitare.",
      "Posibilitate de avansare dacă activitatea este serioasă.",
    ],
    steps: [
      "Intră pe Forum.",
      "Spune pentru ce server vrei să ajuți.",
      "Scrie vârsta, experiența și intervalul în care poți fi activ.",
      "Așteaptă un răspuns de la echipă.",
    ],
  },
  en: {
    eyebrow: "Staff recruitment",
    title: "We are looking for active FREE-ARENA admins",
    copy:
      "FREE-ARENA is entering a stage where the community matters more than any page. We need mature people who can be active in the evening, help players, and keep the servers clean.",
    apply: "Apply on Forum",
    discord: "Talk on Discord",
    requirementsTitle: "Requirements",
    benefitsTitle: "Benefits",
    noteTitle: "What we actually need",
    note:
      "We are not looking for admins only for commands. We need people who can speak normally with players, calm conflicts, and help the community grow without fake promises.",
    routeTitle: "Application route",
    requirements: [
      "Minimum age 16.",
      "Evening activity, when the servers have the best chance to gather players.",
      "Mature behavior and patience with new players.",
      "A forum account is required for team communication.",
      "Counter-Strike experience is an advantage.",
    ],
    benefits: [
      "Staff role inside the FREE-ARENA community.",
      "Access to community organization and operational decisions.",
      "Priority for events, testing, and community activity.",
      "Possibility to advance if the activity is serious.",
    ],
    steps: [
      "Join the forum.",
      "Say which server you want to help with.",
      "Share your age, experience, and active hours.",
      "Wait for a reply from the team.",
    ],
  },
} as const;

export function JoinStaffLanding({ locale }: { locale: Locale }) {
  const page = content[locale];

  return (
    <PublicPageShell>
      <section className="neon-section px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid w-full max-w-[92rem] gap-8 lg:grid-cols-[minmax(0,0.96fr)_minmax(22rem,0.78fr)] lg:items-stretch">
          <div className="min-w-0">
            <p className="neon-kicker section-badge-label inline-flex px-4 py-2">
              {page.eyebrow}
            </p>
            <h1 className="neon-heading neon-title neon-text-pulse mt-6 max-w-5xl break-words font-display text-[clamp(3rem,8vw,7rem)] font-black uppercase leading-[0.84] text-white">
              {page.title}
            </h1>
            <p className="mt-6 max-w-3xl text-base font-semibold leading-8 text-white/68 sm:text-lg">
              {page.copy}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <TrackedAnchor
                href={forumLinks.adminRequests}
                target="_blank"
                rel="noopener noreferrer"
                eventName="click_apply_staff"
                eventPayload={{ location: "join_staff_hero", channel: "forum" }}
                className="server-card--cs16 server-join-button inline-flex min-h-12 items-center justify-center gap-2 px-5 py-3 text-sm font-black uppercase tracking-[0.12em] transition"
              >
                <MessageSquare size={18} aria-hidden="true" />
                {page.apply}
              </TrackedAnchor>
              <TrackedAnchor
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                eventName="click_join_discord"
                eventPayload={{ location: "join_staff_hero" }}
                className="server-card--cs2 server-details-button inline-flex min-h-12 items-center justify-center gap-2 px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition"
              >
                <MessageSquare size={18} aria-hidden="true" />
                {page.discord}
              </TrackedAnchor>
            </div>
          </div>

          <TacticalCard as="aside" tone="cs16" className="min-h-96">
            <TacticalCardHeader
              Icon={UserPlus}
              badge={<TacticalBadge dot>OPEN</TacticalBadge>}
              eyebrow="FREE-ARENA"
              title={page.routeTitle}
            />
            <ol className="mt-6 grid gap-3">
              {page.steps.map((step, index) => (
                <TacticalInfoBlock key={step} label={`0${index + 1}`} value={step} />
              ))}
            </ol>
          </TacticalCard>
        </div>
      </section>

      <TacticalSection className="pb-16">
        <TacticalGrid columns="two">
          <InfoPanel Icon={ShieldCheck} items={page.requirements} title={page.requirementsTitle} tone="cs2" />
          <InfoPanel Icon={Trophy} items={page.benefits} title={page.benefitsTitle} tone="respawn" />
        </TacticalGrid>
      </TacticalSection>

      <TacticalSection className="pb-20">
        <TacticalCard tone="global">
          <TacticalCardHeader
            Icon={Clock3}
            badge={<TacticalBadge>FREE-ARENA</TacticalBadge>}
            eyebrow={page.eyebrow}
            title={page.noteTitle}
          >
            <p className="mt-4 max-w-4xl text-sm font-semibold leading-7 text-white/64">
              {page.note}
            </p>
          </TacticalCardHeader>
          <TacticalActions className="sm:grid-cols-2 lg:max-w-xl">
            <TrackedAnchor
              href={forumLinks.adminRequests}
              target="_blank"
              rel="noopener noreferrer"
              eventName="click_apply_staff"
              eventPayload={{ location: "join_staff_note", channel: "forum" }}
              className="server-join-button inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-black uppercase tracking-[0.1em] transition"
            >
              {page.apply}
            </TrackedAnchor>
            <TrackedAnchor
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              eventName="click_join_discord"
              eventPayload={{ location: "join_staff_note" }}
              className="server-details-button inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-black uppercase tracking-[0.1em] text-white transition"
            >
              {page.discord}
            </TrackedAnchor>
          </TacticalActions>
        </TacticalCard>
      </TacticalSection>
    </PublicPageShell>
  );
}

function InfoPanel({
  Icon,
  items,
  title,
  tone,
}: {
  Icon: LucideIcon;
  items: readonly string[];
  title: string;
  tone: "cs2" | "respawn";
}) {
  return (
    <TacticalCard tone={tone} className="min-h-96">
      <TacticalCardHeader
        Icon={Icon}
        badge={<TacticalBadge>STAFF</TacticalBadge>}
        eyebrow="FREE-ARENA.RO"
        title={title}
      />
      <ul className="mt-6 grid gap-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm font-semibold leading-6 text-white/66">
            <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[color:var(--card-accent)]" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </TacticalCard>
  );
}
