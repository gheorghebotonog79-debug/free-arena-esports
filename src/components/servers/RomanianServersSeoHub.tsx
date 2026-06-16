import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  CircleHelp,
  Gamepad2,
  Headphones,
  MessageSquare,
  RadioTower,
  Search,
  ShieldCheck,
  Trophy,
  UsersRound,
} from "lucide-react";
import { TacticalCardChrome } from "@/components/public/PublicPagePrimitives";
import { Link } from "@/i18n/navigation";

type HubCard = {
  copy: string;
  href: string;
  label: string;
  tone: "cs16" | "cs2" | "global" | "respawn";
  title: string;
};

type EcosystemLink = {
  copy: string;
  href: string;
  icon: LucideIcon;
  title: string;
};

export const romanianServersHubFaq = [
  {
    question: "Ce server FREE-ARENA este potrivit pentru un jucător nou?",
    answer:
      "Pentru început, CS 1.6 Classic este alegerea cea mai simplă: ritm clar, hărți cunoscute și conectare rapidă. Dacă vrei acțiune continuă, Respawn este mai potrivit pentru warm-up, aim și sesiuni scurte.",
  },
  {
    question: "Serverele FREE-ARENA au ranking și progres pentru jucători?",
    answer:
      "Da. Pagina de rankings grupează jucătorii activi și ajută comunitatea să urmărească XP, kill-uri, headshot-uri, timp jucat și progres real pe servere.",
  },
  {
    question: "Cum intru rapid pe Discord sau TeamSpeak?",
    answer:
      "Din hubul de servere poți intra direct pe paginile dedicate Discord și TeamSpeak. Discord este util pentru anunțuri și suport, iar TeamSpeak rămâne canalul rapid pentru voice în timpul meciurilor.",
  },
  {
    question: "De ce există pagini separate pentru fiecare server?",
    answer:
      "Fiecare server are mod, reguli, hărți, ritm și intenție diferită. Paginile dedicate pentru CS 1.6 Classic, Respawn, CS2 și Global explică mai bine diferențele decât o listă scurtă de IP-uri.",
  },
  {
    question: "Ce înseamnă Global / Coming Soon în lista de servere?",
    answer:
      "Global este zona pregătită pentru extinderi viitoare FREE-ARENA. Pagina rămâne vizibilă ca punct de informare pentru jucătorii care urmăresc lansări, evenimente și servere conectate.",
  },
] as const;

const serverCards: readonly HubCard[] = [
  {
    title: "CS 1.6 Classic",
    label: "Server CS 1.6 România",
    href: "/server/cs16-classic",
    tone: "cs16",
    copy:
      "Serverul clasic FREE-ARENA pentru runde clare, hărți cunoscute, IP direct și comunitate românească activă. Pagina dedicată explică regulile, conectarea, suportul și beneficiile VIP.",
  },
  {
    title: "Respawn",
    label: "Warm-up și dueluri rapide",
    href: "/server/respawn",
    tone: "respawn",
    copy:
      "Respawn este pentru jucătorii care vor acțiune continuă, reintrare rapidă în joc, antrenament de aim și fraguri dese fără așteptarea finalului de rundă.",
  },
  {
    title: "CS2",
    label: "Counter-Strike modern",
    href: "/server/cs2",
    tone: "cs2",
    copy:
      "CS2 este direcția modernă FREE-ARENA pentru jucători competitivi, server dedicat, comunitate conectată la Discord și TeamSpeak și dezvoltare pe termen lung.",
  },
  {
    title: "Global",
    label: "Extindere FREE-ARENA",
    href: "/server/global",
    tone: "global",
    copy:
      "Global pregătește următorul pas al rețelei: servere conectate, evenimente cross-server, anunțuri și o zonă centrală pentru dezvoltarea comunității.",
  },
];

const popularSearchLinks: readonly HubCard[] = [
  {
    title: "CS2 servers",
    label: "Căutare Google",
    href: "/cs2-servers",
    tone: "cs2",
    copy:
      "Landing page pentru jucătorii care caută servere CS2, comunitate Counter-Strike 2 și informații rapide despre conectarea pe FREE-ARENA.",
  },
  {
    title: "Respawn server",
    label: "Căutare Google",
    href: "/respawn-server",
    tone: "respawn",
    copy:
      "Pagină dedicată pentru intenția de căutare Respawn server: warm-up, aim, IP direct, reguli scurte și legături către serverul live.",
  },
  {
    title: "CS 1.6 servers",
    label: "Căutare Google",
    href: "/cs-1-6-servers",
    tone: "cs16",
    copy:
      "Pagină orientată către căutări pentru servere CS 1.6 România, Counter-Strike clasic, IP direct și comunitate activă.",
  },
];

const ecosystemLinks: readonly EcosystemLink[] = [
  {
    title: "Rankings",
    href: "/rankings",
    icon: Trophy,
    copy: "Clasamentul transformă activitatea zilnică în progres vizibil pentru jucători.",
  },
  {
    title: "Discord",
    href: "/discord",
    icon: MessageSquare,
    copy: "Canal pentru anunțuri, suport, recrutare staff, feedback și comunitate.",
  },
  {
    title: "TeamSpeak",
    href: "/teamspeak",
    icon: Headphones,
    copy: "Voice rapid pentru mixuri, sesiuni de joc și suport în timp real.",
  },
  {
    title: "Homepage",
    href: "/",
    icon: UsersRound,
    copy: "Punctul central care leagă serverele, topul de jucători și comunitatea.",
  },
];

const decisionPoints = [
  "Alege CS 1.6 Classic dacă vrei o experiență tradițională, cu hărți cunoscute și runde în care comunicarea contează.",
  "Alege Respawn dacă vrei să intri direct în dueluri, să faci warm-up sau să te antrenezi fără pauze lungi.",
  "Alege CS2 dacă preferi Counter-Strike-ul modern și vrei să urmărești direcția competitivă nouă a comunității.",
  "Urmărește Global dacă te interesează lansările viitoare, testele și extinderea FREE-ARENA în afara serverelor active.",
] as const;

export function RomanianServersSeoHub() {
  return (
    <section className="bg-[#080909] px-4 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-white/44"
        >
          <Link href="/" className="transition hover:text-cyan-200">
            Acasă
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-cyan-200">Servere</span>
        </nav>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <p className="neon-kicker section-badge-label inline-flex px-4 py-2">
              Hub servere România
            </p>
            <h2 className="mt-5 font-display text-3xl font-black uppercase leading-tight text-white sm:text-4xl">
              FREE-ARENA ca punct central pentru servere CS active
            </h2>
          </div>

          <article className="premium-card glass-panel server-tactical-card server-card--cs2 server-tactical-card--online min-h-0 rounded-lg p-5 sm:p-6" data-occupancy="low" data-status="online">
            <TacticalCardChrome />
            <div className="grid gap-5 text-sm font-semibold leading-7 text-white/66">
              <p>
                FREE-ARENA este construit ca hub de servere gaming pentru România, cu focus pe Counter-Strike,
                comunitate activă și pagini clare pentru fiecare mod important. Scopul acestei pagini nu este
                doar să afișeze statusul live, ci să ajute jucătorii să aleagă rapid serverul potrivit.
              </p>
              <p>
                Pentru jucători, hubul leagă serverul de CS 1.6 Classic, modul Respawn, zona CS2,
                pagina Global, clasamentul FREE-ARENA, Discord și TeamSpeak. Fiecare link este HTML normal,
                ușor de accesat și gândit să ducă rapid către informația potrivită.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/server/cs16-classic"
                className="button-glow inline-flex items-center justify-center gap-2 rounded-lg bg-arena-cyan px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-black transition hover:bg-white"
              >
                Joacă acum
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <Link
                href="/servers"
                className="button-ghost inline-flex items-center justify-center gap-2 rounded-lg border border-white/14 bg-white/[0.055] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:border-arena-cyan/60 hover:bg-arena-cyan/10"
              >
                Vezi serverele
              </Link>
              <Link
                href="/discord"
                className="button-ghost inline-flex items-center justify-center gap-2 rounded-lg border border-white/14 bg-white/[0.055] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:border-arena-cyan/60 hover:bg-arena-cyan/10"
              >
                Intră pe Discord
              </Link>
            </div>
          </article>
        </div>

        <HubGrid
          Icon={Gamepad2}
          copy="Lista live arată statusul, harta, ping-ul și numărul de jucători. Cardurile de mai jos explică rolul fiecărui server și trimit către paginile oficiale."
          items={serverCards}
          title="Servere FREE-ARENA"
        />

        <HubGrid
          Icon={Search}
          copy="Aceste pagini sunt construite pentru căutări reale și trimit autoritate către serverele principale."
          items={popularSearchLinks}
          title="Căutări populare"
          columns="three"
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="flex items-start gap-3">
            <span className="grid size-12 shrink-0 place-items-center rounded-lg border border-arena-green/30 bg-arena-green/12 text-arena-green">
              <ShieldCheck size={22} aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-display text-3xl font-black uppercase text-white">
                Comunitate, competiție și activitate
              </h2>
              <p className="mt-3 text-sm font-semibold leading-7 text-white/62">
                Un server bun nu înseamnă doar IP online. Contează jucătorii care revin, staff-ul prezent,
                canalele de comunicare și traseul simplu către competiție.
              </p>
            </div>
          </div>
          <article className="premium-card glass-panel server-tactical-card server-card--global server-tactical-card--online min-h-0 rounded-lg p-5 sm:p-6" data-occupancy="low" data-status="online">
            <TacticalCardChrome />
            <div className="grid gap-5 text-sm font-semibold leading-7 text-white/66">
              <p>
                FREE-ARENA folosește hubul de servere ca punct de pornire pentru toată experiența: intri pe server,
                verifici cine joacă, urmărești clasamentul și rămâi aproape de comunitate pe Discord sau TeamSpeak.
              </p>
              <p>
                Pentru competiție contează semnalele constante: servere accesibile, reguli scurte, hărți potrivite,
                conectare rapidă și linkuri interne care nu se pierd în meniuri.
              </p>
            </div>
          </article>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {ecosystemLinks.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="premium-card glass-panel group server-tactical-card server-card--cs2 server-tactical-card--online min-h-72 rounded-lg p-5 transition hover:border-arena-cyan/60 hover:bg-arena-cyan/10"
                data-occupancy="low"
                data-status="online"
              >
                <TacticalCardChrome />
                <span className="grid size-11 place-items-center rounded-lg border border-white/12 bg-white/[0.055] text-cyan-200">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <h3 className="font-display text-xl font-black uppercase text-white">
                    {item.title}
                  </h3>
                  <ArrowRight size={18} className="shrink-0 text-cyan-200 transition group-hover:translate-x-1" aria-hidden="true" />
                </div>
                <p className="mt-3 text-sm font-semibold leading-6 text-white/62">
                  {item.copy}
                </p>
              </Link>
            );
          })}
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="flex items-start gap-3">
            <span className="grid size-12 shrink-0 place-items-center rounded-lg border border-arena-red/30 bg-arena-red/12 text-arena-red">
              <RadioTower size={22} aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-display text-3xl font-black uppercase text-white">
                Cum alegi serverul potrivit
              </h2>
              <p className="mt-3 text-sm font-semibold leading-7 text-white/62">
                Fiecare mod are o intenție diferită. Alege în funcție de ritm, obiectiv și felul în care vrei
                să te implici în comunitate.
              </p>
            </div>
          </div>
          <div className="grid gap-3">
            {decisionPoints.map((point, index) => (
              <div key={point} className="premium-card glass-panel server-tactical-card server-card--respawn server-tactical-card--online flex min-h-0 gap-4 rounded-lg p-4" data-occupancy="low" data-status="online">
                <TacticalCardChrome />
                <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-cyan-300/20 bg-cyan-300/10 font-display text-sm font-black text-cyan-200">
                  {index + 1}
                </span>
                <p className="text-sm font-semibold leading-6 text-white/68">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div id="servers-faq" className="mt-14">
          <div className="flex max-w-4xl items-start gap-3">
            <span className="grid size-12 shrink-0 place-items-center rounded-lg border border-arena-gold/30 bg-arena-gold/12 text-arena-gold">
              <CircleHelp size={22} aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-display text-3xl font-black uppercase text-white">
                Întrebări frecvente despre serverele FREE-ARENA
              </h2>
              <p className="mt-3 text-sm font-semibold leading-7 text-white/62">
                FAQ-ul răspunde direct întrebărilor importante pentru jucători și completează informațiile vizibile de pe pagină.
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {romanianServersHubFaq.map((item) => (
              <article key={item.question} className="premium-card glass-panel server-tactical-card server-card--global server-tactical-card--online min-h-72 rounded-lg p-5" data-occupancy="low" data-status="online">
                <TacticalCardChrome />
                <h3 className="font-display text-xl font-black uppercase text-white">
                  {item.question}
                </h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-white/62">
                  {item.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HubGrid({
  columns = "four",
  copy,
  Icon,
  items,
  title,
}: {
  columns?: "four" | "three";
  copy: string;
  Icon: LucideIcon;
  items: readonly HubCard[];
  title: string;
}) {
  return (
    <div className="mt-14">
      <div className="flex max-w-4xl items-start gap-3">
        <span className="grid size-12 shrink-0 place-items-center rounded-lg border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
          <Icon size={22} aria-hidden="true" />
        </span>
        <div>
          <h2 className="font-display text-3xl font-black uppercase text-white">
            {title}
          </h2>
          <p className="mt-3 text-sm font-semibold leading-7 text-white/62">
            {copy}
          </p>
        </div>
      </div>
      <div className={columns === "three" ? "mt-6 grid gap-4 md:grid-cols-3" : "mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4"}>
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`premium-card glass-panel group server-tactical-card server-card--${item.tone} server-tactical-card--online h-full min-h-80 rounded-lg p-5 transition hover:border-arena-cyan/60 hover:bg-arena-cyan/10`}
            data-occupancy={item.tone === "global" ? "idle" : "low"}
            data-status="online"
          >
            <TacticalCardChrome />
            <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-200">
              {item.label}
            </p>
            <div className="mt-3 flex items-start justify-between gap-3">
              <h3 className="font-display text-xl font-black uppercase text-white">
                {item.title}
              </h3>
              <ArrowRight size={18} className="shrink-0 text-cyan-200 transition group-hover:translate-x-1" aria-hidden="true" />
            </div>
            <p className="mt-4 text-sm font-semibold leading-7 text-white/62">
              {item.copy}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
