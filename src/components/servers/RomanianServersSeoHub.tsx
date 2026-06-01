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
      "Pentru inceput, CS 1.6 Classic este alegerea cea mai simpla: ritm clar, harti cunoscute si conectare rapida. Daca vrei actiune continua, Respawn este mai potrivit pentru antrenament, warm-up si sesiuni scurte.",
  },
  {
    question: "Serverele FREE-ARENA au ranking si progres pentru jucatori?",
    answer:
      "Da. Pagina de rankings grupeaza jucatorii activi si ajuta comunitatea sa urmareasca performanta, kill-urile, headshot-urile si timpul jucat. Linkurile catre clasament sunt vizibile si utile pentru jucatori.",
  },
  {
    question: "Cum intru rapid pe Discord sau TeamSpeak?",
    answer:
      "Din hubul de servere poti intra direct pe paginile dedicate Discord si TeamSpeak. Discord este util pentru anunturi, suport si comunitate, iar TeamSpeak ramane potrivit pentru voice rapid in timpul meciurilor.",
  },
  {
    question: "De ce exista pagini separate pentru fiecare server?",
    answer:
      "Fiecare server are reguli, mod, harti, instructiuni si intentie diferita. Paginile dedicate pentru CS 1.6 Classic, Respawn, CS2 si Global dau context complet si explica mai bine diferentele decat o lista scurta de IP-uri.",
  },
  {
    question: "Ce inseamna Global / Coming Soon in lista de servere?",
    answer:
      "Global este zona pregatita pentru extinderi viitoare FREE-ARENA. Pagina ramane vizibila ca punct de informare pentru jucatorii care urmaresc lansari noi, evenimente si servere internationale.",
  },
] as const;

const serverCards: readonly HubCard[] = [
  {
    title: "CS 1.6 Classic",
    label: "Server CS 1.6 Romania",
    href: "/server/cs16-classic",
    copy:
      "CS 1.6 Classic este baza comunitatii FREE-ARENA: gameplay curat, harti recognoscibile, runde citibile si o experienta apropiata de Counter-Strike-ul clasic. Pagina dedicata explica IP-ul, conectarea, regulile, beneficiile VIP si motivele pentru care serverul merita salvat la favorite.",
  },
  {
    title: "Respawn",
    label: "Actiune rapida",
    href: "/server/respawn",
    copy:
      "Respawn este pentru jucatorii care vor dueluri dese, reincarcare rapida in joc si progres prin volum. Este ideal pentru incalzire, antrenament de aim, testarea armelor si sesiuni scurte in care nu astepti finalul rundei ca sa reintri in actiune.",
  },
  {
    title: "CS2",
    label: "Counter-Strike modern",
    href: "/server/cs2",
    copy:
      "CS2 aduce directia moderna a platformei FREE-ARENA: tick modern, vizibilitate mai buna, competitie actuala si potential pentru evenimente noi. Hubul trimite catre pagina dedicata, unde jucatorii gasesc status, context, comunitate si informatii utile pentru conectare.",
  },
  {
    title: "Global / Coming Soon",
    label: "Extindere FREE-ARENA",
    href: "/server/global",
    copy:
      "Global pregateste urmatorul pas pentru serverele FREE-ARENA. Pagina pastreaza un loc clar pentru lansari, testari, moduri internationale si anunturi, fara sa incurce serverele active. Este utila pentru jucatorii care urmaresc evolutia comunitatii.",
  },
];

const ecosystemLinks: readonly EcosystemLink[] = [
  {
    title: "Rankings",
    href: "/rankings",
    icon: Trophy,
    copy:
      "Clasamentul FREE-ARENA aduna jucatorii activi si transforma activitatea zilnica in competitie vizibila.",
  },
  {
    title: "Discord",
    href: "/discord",
    icon: MessageSquare,
    copy:
      "Discord este locul pentru anunturi, suport, discutii rapide, recrutare si feedback direct catre comunitate.",
  },
  {
    title: "TeamSpeak",
    href: "/teamspeak",
    icon: Headphones,
    copy:
      "TeamSpeak ramane canalul rapid pentru voice in timpul meciurilor, mixurilor si sesiunilor de echipa.",
  },
  {
    title: "Homepage",
    href: "/",
    icon: UsersRound,
    copy:
      "Prima pagina leaga serverele, topul de jucatori, comunitatea si zonele principale FREE-ARENA intr-un traseu simplu.",
  },
];

const decisionPoints = [
  "Alege CS 1.6 Classic daca vrei o experienta traditionala, cu harti cunoscute si runde in care comunicarea conteaza.",
  "Alege Respawn daca vrei sa intri direct in dueluri, sa faci warm-up sau sa te antrenezi fara pauze lungi.",
  "Alege CS2 daca preferi Counter-Strike-ul modern si vrei sa urmaresti directia competitiva noua a comunitatii.",
  "Urmareste Global daca te intereseaza lansarile viitoare, testele si extinderea FREE-ARENA in afara serverelor active.",
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
          <article className="premium-card glass-panel rounded-lg p-5 sm:p-6">
            <div className="grid gap-5 text-sm font-semibold leading-7 text-white/66">
              <p>
                FREE-ARENA este construit ca hub de servere gaming pentru Romania, cu focus pe Counter-Strike,
                comunitate activa si pagini clare pentru fiecare mod important. Scopul acestei pagini nu este
                doar sa afiseze statusul live, ci sa te ajute sa alegi rapid serverul potrivit, sa gasesti linkul
                corect de conectare si sa intelegi unde se intampla activitatea principala a comunitatii.
              </p>
              <p>
                Pentru jucatori, hubul leaga paginile care conteaza: serverul de CS 1.6 Classic,
                modul Respawn, zona CS2, pagina Global, clasamentul FREE-ARENA, Discord si TeamSpeak. Fiecare
                link este HTML normal, usor de accesat si gandit sa duca rapid catre pagina potrivita,
                unde exista detalii despre conectare, reguli, harti, beneficii VIP si intrebari frecvente.
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
                Lista live de mai sus arata statusul, harta, ping-ul si numarul de jucatori. Cardurile de mai jos
                explica rolul fiecarui server si trimit catre paginile oficiale pentru detalii complete.
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {serverCards.map((server) => (
              <Link
                key={server.href}
                href={server.href}
                className="premium-card glass-panel group h-full rounded-lg p-5 transition hover:border-arena-cyan/60 hover:bg-arena-cyan/10"
              >
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
                Comunitate, competitie si activitate
              </h2>
              <p className="mt-3 text-sm font-semibold leading-7 text-white/62">
                Un server bun nu inseamna doar IP online. Conteaza jucatorii care revin, staff-ul prezent,
                canalele de comunicare si un traseu simplu catre competitie.
              </p>
            </div>
          </div>
          <article className="premium-card glass-panel rounded-lg p-5 sm:p-6">
            <div className="grid gap-5 text-sm font-semibold leading-7 text-white/66">
              <p>
                FREE-ARENA foloseste hubul de servere ca punct de pornire pentru toata experienta: intri pe server,
                verifici cine joaca, urmaresti clasamentul si ramai aproape de comunitate pe Discord sau TeamSpeak.
                Rankings transforma activitatea zilnica in motivatie, iar paginile de servere ajuta jucatorii noi sa
                inteleaga diferenta dintre moduri fara sa caute informatii imprastiate.
              </p>
              <p>
                Pentru competitie, conteaza semnalele constante: servere accesibile, reguli scurte, harti potrivite,
                conectare rapida si linkuri interne care nu se pierd in meniuri. De aceea hubul leaga homepage-ul,
                landing page-urile, voice-ul si clasamentul intr-o structura clara, usor de parcurs de jucatori si
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
                className="premium-card glass-panel group rounded-lg p-5 transition hover:border-arena-cyan/60 hover:bg-arena-cyan/10"
              >
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
                Fiecare mod are o intentie diferita. Alege in functie de ritm, obiectiv si felul in care vrei sa
                te implici in comunitate.
              </p>
            </div>
          </div>
          <div className="grid gap-3">
            {decisionPoints.map((point, index) => (
              <div key={point} className="premium-card glass-panel flex gap-4 rounded-lg p-4">
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
                FAQ-ul raspunde direct intrebarilor importante pentru jucatori si completeaza informatiile vizibile de pe pagina.
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {romanianServersHubFaq.map((item) => (
              <article key={item.question} className="premium-card glass-panel rounded-lg p-5">
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
