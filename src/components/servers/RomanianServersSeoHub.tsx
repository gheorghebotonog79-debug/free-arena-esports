import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  CircleHelp,
  Gamepad2,
  Headphones,
  MessageSquare,
  RadioTower,
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
    question: "Ce server FREE-ARENA este potrivit pentru un jucator nou?",
    answer:
      "Pentru început, CS 1.6 Classic este alegerea cea mai simplă: ritm clar, hărți cunoscute și conectare rapidă. Dacă vrei acțiune continuă, Respawn este mai potrivit pentru antrenament, warm-up și sesiuni scurte.",
  },
  {
    question: "Serverele FREE-ARENA au ranking și progres pentru jucători?",
    answer:
      "Da. Pagina de rankings grupează jucătorii activi și ajută comunitatea să urmărească performanța, kill-urile, headshot-urile și timpul jucat. Linkurile către clasament sunt vizibile și utile pentru jucători.",
  },
  {
    question: "Cum intru rapid pe Discord sau TeamSpeak?",
    answer:
      "Din hubul de servere poți intra direct pe paginile dedicate Discord și TeamSpeak. Discord este util pentru anunțuri, suport și comunitate, iar TeamSpeak rămâne potrivit pentru voice rapid în timpul meciurilor.",
  },
  {
    question: "De ce exista pagini separate pentru fiecare server?",
    answer:
      "Fiecare server are reguli, mod, hărți, instrucțiuni și intenție diferită. Paginile dedicate pentru CS 1.6 Classic, Respawn, CS2 și Global dau context complet și explică mai bine diferențele decât o listă scurtă de IP-uri.",
  },
  {
    question: "Ce înseamnă Global / Coming Soon în lista de servere?",
    answer:
      "Global este zona pregătită pentru extinderi viitoare FREE-ARENA. Pagina rămâne vizibilă ca punct de informare pentru jucătorii care urmăresc lansări noi, evenimente și servere internaționale.",
  },
] as const;

const serverCards: readonly HubCard[] = [
  {
    title: "CS 1.6 Classic",
    label: "Server CS 1.6 Romania",
    href: "/server/cs16-classic",
    copy:
      "CS 1.6 Classic este baza comunității FREE-ARENA: gameplay curat, hărți recognoscibile, runde citibile și o experiență apropiată de Counter-Strike-ul clasic. Pagina dedicată explică IP-ul, conectarea, regulile, beneficiile VIP și motivele pentru care serverul merită salvat la favorite.",
  },
  {
    title: "Respawn",
    label: "Actiune rapida",
    href: "/server/respawn",
    copy:
      "Respawn este pentru jucătorii care vor dueluri dese, reîncărcare rapidă în joc și progres prin volum. Este ideal pentru încălzire, antrenament de aim, testarea armelor și sesiuni scurte în care nu aștepți finalul rundei ca să reintri în acțiune.",
  },
  {
    title: "CS2",
    label: "Counter-Strike modern",
    href: "/server/cs2",
    copy:
      "CS2 aduce direcția modernă a platformei FREE-ARENA: tick modern, vizibilitate mai bună, competiție actuală și potențial pentru evenimente noi. Hubul trimite către pagina dedicată, unde jucătorii găsesc status, context, comunitate și informații utile pentru conectare.",
  },
  {
    title: "Global / Coming Soon",
    label: "Extindere FREE-ARENA",
    href: "/server/global",
    copy:
      "Global pregătește următorul pas pentru serverele FREE-ARENA. Pagina păstrează un loc clar pentru lansări, testări, moduri internaționale și anunțuri, fără să încurce serverele active. Este utilă pentru jucătorii care urmăresc evoluția comunității.",
  },
];

const ecosystemLinks: readonly EcosystemLink[] = [
  {
    title: "Rankings",
    href: "/rankings",
    icon: Trophy,
    copy:
      "Clasamentul FREE-ARENA adună jucătorii activi și transformă activitatea zilnică în competiție vizibilă.",
  },
  {
    title: "Discord",
    href: "/discord",
    icon: MessageSquare,
    copy:
      "Discord este locul pentru anunțuri, suport, discuții rapide, recrutare și feedback direct către comunitate.",
  },
  {
    title: "TeamSpeak",
    href: "/teamspeak",
    icon: Headphones,
    copy:
      "TeamSpeak rămâne canalul rapid pentru voice în timpul meciurilor, mixurilor și sesiunilor de echipă.",
  },
  {
    title: "Homepage",
    href: "/",
    icon: UsersRound,
    copy:
      "Prima pagină leagă serverele, topul de jucători, comunitatea și zonele principale FREE-ARENA într-un traseu simplu.",
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
            Acasa
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-cyan-200">Servere</span>
        </nav>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <p className="neon-kicker section-badge-label inline-flex px-4 py-2">
              Hub servere Romania
            </p>
            <h2 className="mt-5 font-display text-3xl font-black uppercase leading-tight text-white sm:text-4xl">
              FREE-ARENA ca punct central pentru servere CS active
            </h2>
          </div>
          <article className="premium-card glass-panel server-tactical-card server-card--cs2 server-tactical-card--online min-h-0 rounded-lg p-5 sm:p-6" data-occupancy="low" data-status="online">
            <TacticalCardChrome />
            <div className="grid gap-5 text-sm font-semibold leading-7 text-white/66">
              <p>
                FREE-ARENA este construit ca hub de servere gaming pentru Romania, cu focus pe Counter-Strike,
                comunitate activă și pagini clare pentru fiecare mod important. Scopul acestei pagini nu este
                doar sa afiseze statusul live, ci sa te ajute sa alegi rapid serverul potrivit, sa gasesti linkul
                corect de conectare și să înțelegi unde se întâmplă activitatea principală a comunității.
              </p>
              <p>
                Pentru jucători, hubul leagă paginile care contează: serverul de CS 1.6 Classic,
                modul Respawn, zona CS2, pagina Global, clasamentul FREE-ARENA, Discord și TeamSpeak. Fiecare
                link este HTML normal, ușor de accesat și gândit să ducă rapid către pagina potrivită,
                unde există detalii despre conectare, reguli, hărți, beneficii VIP și întrebări frecvente.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/server/cs16-classic"
                className="button-glow inline-flex items-center justify-center gap-2 rounded-lg bg-arena-cyan px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-black transition hover:bg-white"
              >
                Joaca acum
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
                Intra pe Discord
              </Link>
            </div>
          </article>
        </div>

        <div className="mt-14">
          <div className="flex max-w-4xl items-start gap-3">
            <span className="grid size-12 shrink-0 place-items-center rounded-lg border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
              <Gamepad2 size={22} aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-display text-3xl font-black uppercase text-white">
                Servere FREE-ARENA
              </h2>
              <p className="mt-3 text-sm font-semibold leading-7 text-white/62">
                Lista live de mai sus arată statusul, harta, ping-ul și numărul de jucători. Cardurile de mai jos
                explică rolul fiecărui server și trimit către paginile oficiale pentru detalii complete.
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {serverCards.map((server) => (
              <Link
                key={server.href}
                href={server.href}
                className={`premium-card glass-panel group server-tactical-card ${server.href.includes("respawn") ? "server-card--respawn" : server.href.includes("cs2") ? "server-card--cs2" : server.href.includes("global") ? "server-card--global" : "server-card--cs16"} server-tactical-card--online h-full min-h-96 rounded-lg p-5 transition hover:border-arena-cyan/60 hover:bg-arena-cyan/10`}
                data-occupancy={server.href.includes("global") ? "idle" : "low"}
                data-status="online"
              >
                <TacticalCardChrome />
                <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-200">
                  {server.label}
                </p>
                <div className="mt-3 flex items-start justify-between gap-3">
                  <h3 className="font-display text-xl font-black uppercase text-white">
                    {server.title}
                  </h3>
                  <ArrowRight
                    size={18}
                    className="shrink-0 text-cyan-200 transition group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </div>
                <p className="mt-4 text-sm font-semibold leading-7 text-white/62">
                  {server.copy}
                </p>
              </Link>
            ))}
          </div>
        </div>

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
                Un server bun nu inseamna doar IP online. Conteaza jucatorii care revin, staff-ul prezent,
                canalele de comunicare și un traseu simplu către competiție.
              </p>
            </div>
          </div>
          <article className="premium-card glass-panel server-tactical-card server-card--global server-tactical-card--online min-h-0 rounded-lg p-5 sm:p-6" data-occupancy="low" data-status="online">
            <TacticalCardChrome />
            <div className="grid gap-5 text-sm font-semibold leading-7 text-white/66">
              <p>
                FREE-ARENA foloseste hubul de servere ca punct de pornire pentru toata experienta: intri pe server,
                verifici cine joacă, urmărești clasamentul și rămâi aproape de comunitate pe Discord sau TeamSpeak.
                Rankings transformă activitatea zilnică în motivație, iar paginile de servere ajută jucătorii noi să
                inteleaga diferenta dintre moduri fara sa caute informatii imprastiate.
              </p>
              <p>
                Pentru competiție, contează semnalele constante: servere accesibile, reguli scurte, hărți potrivite,
                conectare rapidă și linkuri interne care nu se pierd în meniuri. De aceea hubul leagă homepage-ul,
                landing page-urile, voice-ul și clasamentul într-o structură clară, ușor de parcurs de jucători și
                usor de descoperit de motoarele de cautare.
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
                  <ArrowRight
                    size={18}
                    className="shrink-0 text-cyan-200 transition group-hover:translate-x-1"
                    aria-hidden="true"
                  />
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
                Fiecare mod are o intenție diferită. Alege în funcție de ritm, obiectiv și felul în care vrei să
                te implici în comunitate.
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
                Intrebari frecvente despre serverele FREE-ARENA
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
