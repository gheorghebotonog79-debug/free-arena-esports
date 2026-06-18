import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  Car,
  ClipboardList,
  Clock3,
  Gamepad2,
  Headphones,
  HeartPulse,
  MessageCircle,
  RadioTower,
  Scale,
  ShieldCheck,
  Siren,
  Sparkles,
  UsersRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { TrackedAnchor } from "@/components/analytics/TrackedLink";
import { LiveChatLauncher } from "@/components/chat/live-chat-launcher";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
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

const DISCORD_URL = "https://discord.gg/Unu756zZ";
const FIVEM_ADDRESS = "fivem.free-arena.ro:30120";

const plannedSystems: Array<{
  copy: string;
  Icon: LucideIcon;
  title: string;
  tone: "cs2" | "fivem" | "global" | "respawn";
}> = [
  {
    Icon: ClipboardList,
    title: "Whitelist controlat",
    copy: "Acces organizat prin Discord, cu reguli clare si verificare inainte de intrarea in oras.",
    tone: "fivem",
  },
  {
    Icon: BriefcaseBusiness,
    title: "Joburi si economie",
    copy: "Joburi legale, progres pe termen lung si economie gandita pentru roleplay, nu pentru grind gol.",
    tone: "cs2",
  },
  {
    Icon: Siren,
    title: "Politie si factiuni",
    copy: "Structuri pentru politie, EMS, organizatii si business-uri, publicate doar dupa ce regulile sunt stabilite.",
    tone: "respawn",
  },
  {
    Icon: Car,
    title: "Vehicule si garaje",
    copy: "Sisteme de vehicule, garaje si proprietati, pregatite gradual ca sa nu incarcam lansarea inutil.",
    tone: "global",
  },
  {
    Icon: HeartPulse,
    title: "EMS si suport",
    copy: "Roluri utile pentru comunitate, cu proceduri simple pentru interventii si raportari.",
    tone: "fivem",
  },
  {
    Icon: UsersRound,
    title: "Staff activ",
    copy: "Moderare, ticket si feedback centralizate pe Discord, cu pagina dedicata pentru cereri staff.",
    tone: "cs2",
  },
];

const roadmap = [
  {
    label: "Faza 01",
    title: "Fundatie tehnica",
    copy: "Stabilim framework-ul, resursele de baza, identitatea orasului si regulile principale.",
  },
  {
    label: "Faza 02",
    title: "Test intern",
    copy: "Verificam stabilitatea, permisiunile, joburile, sistemele de baza si fluxul de suport.",
  },
  {
    label: "Faza 03",
    title: "Whitelist / staff",
    copy: "Deschidem aplicatii controlate pentru jucatori si staff inainte de lansarea publica.",
  },
  {
    label: "Faza 04",
    title: "Lansare publica",
    copy: "Publicam IP-ul activ, ghidul de conectare, regulamentul final si update-urile orasului.",
  },
];

const rules = [
  "Roleplay serios, fara haos si fara comportament toxic.",
  "Reguli clare pentru politie, EMS, factiuni, jafuri si conflicte.",
  "Whitelist recomandat pentru calitate si moderare mai usoara.",
  "Ticket pe Discord pentru probleme, bug-uri si propuneri.",
  "Fara promisiuni pay-to-win inainte de definirea sistemului VIP.",
];

const updates = [
  {
    title: "Status dezvoltare",
    copy: "Pagina ramane publica pe /fivem si va strange aici toate anunturile importante despre server.",
  },
  {
    title: "Ce urmeaza",
    copy: "Dupa alegerea setup-ului tehnic publicam regulamentul, cerintele de whitelist si primele roluri disponibile.",
  },
  {
    title: "Unde discuta comunitatea",
    copy: "Discord ramane canalul principal pentru anunturi, feedback, testeri si recrutare staff FiveM.",
  },
];

const faq = [
  {
    question: "Serverul FiveM este live acum?",
    answer: "Nu. Pagina este pregatita pentru lansare si marcheaza proiectul ca in pregatire pana cand serverul este stabil.",
  },
  {
    question: "Unde se face whitelist-ul?",
    answer: "Directia recomandata este Discord. Acolo putem tine aplicatii, reguli, ticket si anunturi intr-un singur loc.",
  },
  {
    question: "Va exista IP direct?",
    answer: `Da, adresa rezervata este ${FIVEM_ADDRESS}, dar butonul de conectare apare doar cand serverul este verificat live.`,
  },
  {
    question: "Pot aplica pentru staff FiveM?",
    answer: "Da, dar cererile trebuie deschise controlat dupa ce stabilim rolurile, responsabilitatile si regulamentul.",
  },
];

export function FiveMPortalPage() {
  return (
    <>
      <SiteHeader />
      <PublicPageShell>
        <section className="neon-section relative overflow-hidden px-4 pb-14 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pb-20 lg:pt-24">
          <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_18%_12%,rgba(52,211,153,0.18),transparent_48%),radial-gradient(circle_at_82%_0%,rgba(0,229,255,0.13),transparent_46%)]" aria-hidden="true" />
          <div className="mx-auto grid w-full max-w-[92rem] gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.52fr)] lg:items-stretch">
            <div className="relative min-w-0">
              <p className="neon-kicker section-badge-label inline-flex px-4 py-2">
                GTA V Roleplay / FREE-ARENA
              </p>
              <h1 className="neon-heading neon-title neon-text-pulse mt-6 max-w-5xl break-words font-display text-[clamp(3rem,8vw,7.4rem)] font-black uppercase leading-[0.84] text-white">
                FREE-ARENA FiveM
              </h1>
              <p className="mt-6 max-w-3xl text-base font-semibold leading-8 text-white/68 sm:text-lg">
                Pagina oficiala pentru viitorul server FiveM FREE-ARENA. Aici publicam statusul, whitelist-ul,
                regulamentul, update-urile, cererile staff si toate informatiile despre oras.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <TrackedAnchor
                  eventName="click_join_discord"
                  eventPayload={{ location: "fivem_hero", server: "fivem" }}
                  href={DISCORD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-glow inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-transparent bg-arena-cyan px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-black transition hover:bg-white"
                >
                  <MessageCircle size={17} aria-hidden="true" />
                  Intra pe Discord
                </TrackedAnchor>
                <TrackedAnchor
                  eventName="click_server_details"
                  eventPayload={{ location: "fivem_hero", target: "server_hub", server: "fivem" }}
                  href="/ro/servers"
                  className="button-ghost inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-emerald-300/28 bg-emerald-300/10 px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-emerald-100 transition hover:border-emerald-200/70 hover:bg-emerald-300/18"
                >
                  Vezi server hub
                  <ArrowRight size={17} aria-hidden="true" />
                </TrackedAnchor>
              </div>
            </div>

            <TacticalCard as="aside" tone="fivem" status="pending" className="min-h-96">
              <div className="flex items-start justify-between gap-4">
                <span className="server-card__icon grid size-20 shrink-0 place-items-center">
                  <Image
                    src="/assets/game-icons/GTA.png"
                    alt="FREE-ARENA FiveM GTA V icon"
                    width={64}
                    height={64}
                    className="size-14 object-contain"
                    priority
                  />
                </span>
                <TacticalBadge dot>In pregatire</TacticalBadge>
              </div>
              <p className="server-card__region mt-8 text-xs font-black uppercase tracking-[0.18em]">
                Server status
              </p>
              <h2 className="server-card__title mt-2 font-display text-[clamp(2rem,4vw,3.6rem)] font-black uppercase leading-none text-white">
                Coming Soon
              </h2>
              <div className="mt-6 grid gap-3">
                <TacticalInfoBlock Icon={RadioTower} label="Adresa rezervata" value={FIVEM_ADDRESS} />
                <TacticalInfoBlock Icon={ShieldCheck} label="Conectare" value="Activa dupa lansare" />
                <TacticalInfoBlock Icon={ClipboardList} label="Whitelist" value="Planificat" />
                <TacticalInfoBlock Icon={Headphones} label="Canal principal" value="Discord" />
              </div>
            </TacticalCard>
          </div>
        </section>

        <TacticalSection
          eyebrow="Plan server"
          title="Ce pregatim pentru FiveM"
          description="Serverul nu trebuie lansat ca o pagina goala cu un IP. Intai pregatim regulile, sistemele si traseul comunitatii."
        >
          <TacticalGrid columns="three">
            {plannedSystems.map((item) => (
              <TacticalCard key={item.title} tone={item.tone} status="online" className="min-h-72">
                <TacticalCardHeader
                  Icon={item.Icon}
                  badge={<TacticalBadge>FiveM</TacticalBadge>}
                  eyebrow="FREE-ARENA"
                  title={item.title}
                />
                <p className="mt-5 text-sm font-semibold leading-7 text-white/64">
                  {item.copy}
                </p>
              </TacticalCard>
            ))}
          </TacticalGrid>
        </TacticalSection>

        <TacticalSection
          eyebrow="Roadmap"
          title="Lansare controlata"
          description="Pagina /fivem ramane URL-ul public. Continutul se actualizeaza pe masura ce serverul trece prin fazele reale."
        >
          <TacticalGrid columns="four">
            {roadmap.map((item) => (
              <TacticalCard key={item.label} tone="fivem" status="pending" className="min-h-64">
                <TacticalCardHeader
                  Icon={Clock3}
                  badge={<TacticalBadge>{item.label}</TacticalBadge>}
                  eyebrow="FiveM launch"
                  title={item.title}
                />
                <p className="mt-5 text-sm font-semibold leading-7 text-white/64">
                  {item.copy}
                </p>
              </TacticalCard>
            ))}
          </TacticalGrid>
        </TacticalSection>

        <TacticalSection
          eyebrow="Regulament / whitelist"
          title="Intrare curata in oras"
          description="Pentru FiveM conteaza mai mult calitatea comunitatii decat numarul brut de intrari. De aceea pagina porneste cu reguli si Discord in fata."
        >
          <div className="grid gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <TacticalCard tone="respawn" status="online" className="min-h-80">
              <TacticalCardHeader
                Icon={Scale}
                badge={<TacticalBadge>Rules</TacticalBadge>}
                eyebrow="Standard RP"
                title="Principii de baza"
              />
              <ul className="mt-6 grid gap-3">
                {rules.map((rule) => (
                  <li key={rule} className="flex gap-3 text-sm font-semibold leading-7 text-white/66">
                    <BadgeCheck size={17} className="mt-1 shrink-0 text-emerald-300" aria-hidden="true" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </TacticalCard>

            <TacticalCard tone="fivem" status="pending" className="min-h-80">
              <TacticalCardHeader
                Icon={Building2}
                badge={<TacticalBadge dot>Discord first</TacticalBadge>}
                eyebrow="Community flow"
                title="Unde strangem comunitatea"
              />
              <p className="mt-5 text-sm font-semibold leading-7 text-white/66">
                Discord-ul este locul pentru anunturi, whitelist, testeri, bug reports si recrutare staff.
                Forumul si site-ul raman arhiva publica, dar actiunea rapida pentru FiveM se face pe Discord.
              </p>
              <TacticalActions className="sm:grid-cols-2">
                <TrackedAnchor
                  eventName="click_join_discord"
                  eventPayload={{ location: "fivem_rules", server: "fivem" }}
                  href={DISCORD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="server-join-button inline-flex items-center justify-center gap-2 px-3 py-3 text-xs font-black uppercase tracking-[0.1em] transition"
                >
                  Discord
                  <MessageCircle size={15} aria-hidden="true" />
                </TrackedAnchor>
                <TrackedAnchor
                  eventName="click_apply_staff"
                  eventPayload={{ location: "fivem_rules", server: "fivem" }}
                  href="/ro/join-staff"
                  className="server-details-button inline-flex items-center justify-center gap-2 px-3 py-3 text-xs font-black uppercase tracking-[0.1em] text-white transition"
                >
                  Aplica staff
                  <ArrowRight size={15} aria-hidden="true" />
                </TrackedAnchor>
              </TacticalActions>
            </TacticalCard>
          </div>
        </TacticalSection>

        <TacticalSection
          eyebrow="Development updates"
          title="Tot ce tine de FiveM"
          description="Aceasta sectiune devine jurnalul public pentru server: status, changelog, reguli, wipe-uri, testeri si anunturi."
        >
          <TacticalGrid columns="three">
            {updates.map((item) => (
              <TacticalCard key={item.title} tone="global" status="online" className="min-h-64">
                <TacticalCardHeader
                  Icon={Sparkles}
                  badge={<TacticalBadge>Update</TacticalBadge>}
                  eyebrow="FiveM notes"
                  title={item.title}
                />
                <p className="mt-5 text-sm font-semibold leading-7 text-white/64">
                  {item.copy}
                </p>
              </TacticalCard>
            ))}
          </TacticalGrid>
        </TacticalSection>

        <TacticalSection
          eyebrow="FAQ"
          title="Intrebari rapide"
          description="Raspunsurile raman scurte pana avem setup-ul final. Cand serverul este gata, actualizam aceasta pagina fara sa schimbam URL-ul."
        >
          <TacticalGrid columns="four">
            {faq.map((item) => (
              <TacticalCard key={item.question} tone="cs2" status="online" className="min-h-64">
                <TacticalCardHeader
                  Icon={Gamepad2}
                  badge={<TacticalBadge>FAQ</TacticalBadge>}
                  eyebrow="FiveM"
                  title={item.question}
                />
                <p className="mt-5 text-sm font-semibold leading-7 text-white/64">
                  {item.answer}
                </p>
              </TacticalCard>
            ))}
          </TacticalGrid>
        </TacticalSection>
      </PublicPageShell>
      <SiteFooter />
      <LiveChatLauncher />
    </>
  );
}

export const fiveMFaqItems = faq;
