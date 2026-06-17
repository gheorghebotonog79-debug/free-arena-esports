import { routing, type Locale } from "@/i18n/routing";
import type { AnalyticsEventName, AnalyticsPayload } from "@/lib/analytics";

export const keywordLandingSlugs = [
  "cs2-servers",
  "respawn-server",
  "cs-1-6-servers",
  "counter-strike-servers-europe",
  "cs-1-6-servers-balkans",
  "cs-1-6-servers-eastern-europe",
  "cs-1-6-servers-brazil",
  "fivem-server",
] as const;

export type KeywordLandingSlug = (typeof keywordLandingSlugs)[number];

export type KeywordLandingCard = {
  title: string;
  copy: string;
};

export type KeywordLandingFaq = {
  question: string;
  answer: string;
};

export type KeywordLandingAction = {
  copyValue?: string;
  eventName: AnalyticsEventName;
  eventPayload?: AnalyticsPayload;
  href?: string;
  label: string;
  tone?: "cs16" | "cs2" | "fivem" | "global" | "respawn";
  variant?: "glow" | "ghost";
};

export type KeywordLandingPageContent = {
  slug: KeywordLandingSlug;
  tone: "cs16" | "cs2" | "fivem" | "global" | "respawn";
  metadata: {
    title: string;
    description: string;
    imageAlt: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };
  primaryAction: {
    href: string;
    label: string;
  };
  secondaryAction: {
    href: string;
    label: string;
  };
  quickActions?: readonly KeywordLandingAction[];
  stats: readonly KeywordLandingCard[];
  sections: readonly KeywordLandingCard[];
  faq: readonly KeywordLandingFaq[];
  related: readonly {
    href: string;
    title: string;
    copy: string;
  }[];
};

export type KeywordLandingLocaleMap = Partial<Record<Locale, KeywordLandingPageContent>>;

export const keywordLandingPages: Record<KeywordLandingSlug, KeywordLandingLocaleMap> = {
  "cs2-servers": {
    ro: {
      slug: "cs2-servers",
      tone: "cs2",
      metadata: {
        title: "CS2 servers FREE-ARENA | Server Counter-Strike 2 România",
        description:
          "Cauți CS2 servers? FREE-ARENA are pagină dedicată pentru server Counter-Strike 2, IP direct, Discord, TeamSpeak, staff și comunitate competitivă.",
        imageAlt: "CS2 servers FREE-ARENA România",
      },
      hero: {
        eyebrow: "CS2 servers",
        title: "CS2 servers FREE-ARENA",
        description:
          "Pagina pentru jucătorii care caută servere CS2, comunitate Counter-Strike 2 și un traseu rapid către serverul FREE-ARENA.",
      },
      primaryAction: { href: "/server/cs2", label: "Vezi serverul CS2" },
      secondaryAction: { href: "/servers", label: "Toate serverele" },
      stats: [
        { title: "IP server", copy: "135.125.208.88:27015" },
        { title: "Comunitate", copy: "Discord, TeamSpeak și forum conectate la aceeași identitate FREE-ARENA." },
        { title: "Scop", copy: "Counter-Strike 2 competitiv, cu suport, reguli și dezvoltare pe termen lung." },
      ],
      sections: [
        {
          title: "De ce pagină separată pentru CS2 servers",
          copy:
            "Căutarea pentru CS2 servers este mai largă decât o pagină simplă de IP. Jucătorul vrea să vadă dacă există comunitate, suport, voice, reguli și o direcție clară. FREE-ARENA le adună într-un traseu scurt către pagina serverului CS2.",
        },
        {
          title: "Conectare și suport",
          copy:
            "Serverul CS2 poate fi adăugat în favorite cu IP-ul direct. Dacă browserul jocului întârzie, pagina serverului păstrează adresa, linkurile către Discord și TeamSpeak și informațiile de bază pentru conectare.",
        },
        {
          title: "Legătură cu ecosistemul FREE-ARENA",
          copy:
            "CS2 nu este izolat. El stă lângă CS 1.6 Classic, Respawn, rankings, Discord și TeamSpeak, astfel încât jucătorii pot trece ușor între servere și comunitate.",
        },
      ],
      faq: [
        { question: "Care este IP-ul serverului CS2 FREE-ARENA?", answer: "IP-ul public este 135.125.208.88:27015." },
        { question: "Există Discord pentru CS2?", answer: "Da. Discord-ul FREE-ARENA este folosit pentru anunțuri, suport, feedback și comunitate." },
        { question: "CS2 are pagină dedicată?", answer: "Da. Pagina canonică este /server/cs2 și include status, IP, comunitate și context pentru server." },
      ],
      related: [
        { href: "/server/cs2", title: "Server CS2", copy: "Pagina canonică pentru serverul Counter-Strike 2." },
        { href: "/discord", title: "Discord", copy: "Intră în comunitate pentru suport și anunțuri." },
        { href: "/rankings", title: "Rankings", copy: "Urmărește progresul jucătorilor FREE-ARENA." },
      ],
    },
    en: {
      slug: "cs2-servers",
      tone: "cs2",
      metadata: {
        title: "CS2 servers Europe FREE-ARENA | Counter-Strike 2 community",
        description:
          "Looking for CS2 servers Europe? FREE-ARENA links EU players to Counter-Strike 2, direct IP, Discord, TeamSpeak, support and English-friendly community.",
        imageAlt: "FREE-ARENA CS2 servers Europe",
      },
      hero: {
        eyebrow: "CS2 servers",
        title: "FREE-ARENA CS2 servers Europe",
        description:
          "A focused landing page for EU players searching for CS2 servers, Counter-Strike 2 community and quick access to FREE-ARENA.",
      },
      primaryAction: { href: "/server/cs2", label: "Open CS2 server" },
      secondaryAction: { href: "/servers", label: "All servers" },
      stats: [
        { title: "Server IP", copy: "135.125.208.88:27015" },
        { title: "Community", copy: "English-friendly Discord, TeamSpeak and forum connected to the FREE-ARENA identity." },
        { title: "Focus", copy: "Competitive Counter-Strike 2 for EU players with support, rules and long-term growth." },
      ],
      sections: [
        {
          title: "Why a dedicated CS2 servers page",
          copy:
            "A CS2 servers Europe search is broader than a raw IP page. Players want community, support, voice, rules and a clear direction. FREE-ARENA connects those signals to the dedicated CS2 server page.",
        },
        {
          title: "Connection and support",
          copy:
            "The CS2 server can be added to favorites with the direct IP. If the in-game browser is delayed, the server page keeps the address, Discord, TeamSpeak and core connection details visible.",
        },
        {
          title: "Part of the FREE-ARENA ecosystem",
          copy:
            "CS2 is connected with CS 1.6 Classic, Respawn, rankings, Discord and TeamSpeak so EU players can move from server discovery to community quickly.",
        },
      ],
      faq: [
        { question: "What is the FREE-ARENA CS2 server IP?", answer: "The public IP is 135.125.208.88:27015." },
        { question: "Is there a Discord for CS2?", answer: "Yes. FREE-ARENA Discord is used for announcements, support, feedback and community." },
        { question: "Does CS2 have a dedicated page?", answer: "Yes. The canonical page is /server/cs2 with status, IP, community links and server context." },
      ],
      related: [
        { href: "/server/cs2", title: "CS2 server", copy: "The canonical Counter-Strike 2 server page." },
        { href: "/discord", title: "Discord", copy: "Join the community for support and announcements." },
        { href: "/rankings", title: "Rankings", copy: "Follow FREE-ARENA player progress." },
      ],
    },
  },
  "respawn-server": {
    ro: {
      slug: "respawn-server",
      tone: "respawn",
      metadata: {
        title: "Respawn server CS 1.6 FREE-ARENA România",
        description:
          "Respawn server CS 1.6 FREE-ARENA pentru warm-up, aim, dueluri rapide, IP direct, staff, Discord, TeamSpeak și comunitate activă.",
        imageAlt: "Respawn server CS 1.6 FREE-ARENA",
      },
      hero: {
        eyebrow: "Respawn server",
        title: "Respawn server CS 1.6",
        description:
          "Pagina pentru jucătorii care caută un respawn server rapid, util pentru warm-up, aim, fraguri dese și conectare imediată.",
      },
      primaryAction: { href: "/server/respawn", label: "Vezi Respawn" },
      secondaryAction: { href: "/servers", label: "Toate serverele" },
      stats: [
        { title: "IP server", copy: "51.38.97.243:27015" },
        { title: "Mod", copy: "Respawn pentru acțiune continuă, antrenament și sesiuni scurte." },
        { title: "Suport", copy: "Discord, TeamSpeak și forum pentru raportări, staff și comunitate." },
      ],
      sections: [
        {
          title: "Pentru ce este bun Respawn",
          copy:
            "Respawn este potrivit pentru warm-up, spray control, reflex, prefire și repetarea duelurilor fără așteptarea finalului de rundă. Este serverul pe care intri când vrei multe situații de joc într-un timp scurt.",
        },
        {
          title: "De ce contează un server stabil",
          copy:
            "Un mod rapid devine obositor dacă nu are reguli, hărți potrivite și staff vizibil. FREE-ARENA poziționează Respawn ca server de antrenament și comunitate, nu ca slot haotic.",
        },
        {
          title: "Traseu rapid pentru jucător",
          copy:
            "Pagina leagă IP-ul, pagina canonică, Discord, TeamSpeak și rankings, astfel încât jucătorul să poată intra în joc, cere suport și urmări comunitatea fără căutări suplimentare.",
        },
      ],
      faq: [
        { question: "Care este IP-ul Respawn?", answer: "IP-ul serverului Respawn este 51.38.97.243:27015." },
        { question: "Respawn este bun pentru warm-up?", answer: "Da. Modul este potrivit pentru aim, reflex, spray control și dueluri dese." },
        { question: "Unde raportez probleme pe Respawn?", answer: "Poți folosi Discord, TeamSpeak sau forumul FREE-ARENA cu nick, hartă, oră și descriere." },
      ],
      related: [
        { href: "/server/respawn", title: "Server Respawn", copy: "Pagina canonică a serverului Respawn." },
        { href: "/server/cs16-classic", title: "CS 1.6 Classic", copy: "Serverul clasic pentru runde tactice." },
        { href: "/join-staff", title: "Aplică staff", copy: "Ajută comunitatea dacă ești activ și matur." },
      ],
    },
    en: {
      slug: "respawn-server",
      tone: "respawn",
      metadata: {
        title: "Respawn server CS 1.6 Europe | FREE-ARENA",
        description:
          "FREE-ARENA Respawn server for EU CS 1.6 players: warm-up, aim practice, fast duels, direct IP, staff, Discord, TeamSpeak and active community.",
        imageAlt: "FREE-ARENA Respawn server Europe",
      },
      hero: {
        eyebrow: "Respawn server",
        title: "CS 1.6 Respawn server Europe",
        description:
          "A page for EU players searching for a fast respawn server for warm-up, aim practice, frequent duels and quick connection.",
      },
      primaryAction: { href: "/server/respawn", label: "Open Respawn" },
      secondaryAction: { href: "/servers", label: "All servers" },
      stats: [
        { title: "Server IP", copy: "51.38.97.243:27015" },
        { title: "Mode", copy: "Respawn for continuous action, practice and short sessions." },
        { title: "Support", copy: "English-friendly Discord, TeamSpeak and forum for reports, staff and community." },
      ],
      sections: [
        {
          title: "What Respawn is good for",
          copy:
            "Respawn is useful for warm-up, spray control, reaction speed, prefire and repeated duels without waiting for round end.",
        },
        {
          title: "Why stability matters",
          copy:
            "A fast mode becomes tiring without rules, good maps and visible staff. FREE-ARENA positions Respawn as practice and community, not chaos.",
        },
        {
          title: "Quick player path",
          copy:
            "The page connects IP, canonical server page, Discord, TeamSpeak and rankings so EU players can join, get support and follow the community quickly.",
        },
      ],
      faq: [
        { question: "What is the Respawn IP?", answer: "The Respawn server IP is 51.38.97.243:27015." },
        { question: "Is Respawn good for warm-up?", answer: "Yes. The mode is useful for aim, reaction speed, spray control and frequent duels." },
        { question: "Where can I report Respawn issues?", answer: "Use FREE-ARENA Discord, TeamSpeak or forum with nickname, map, time and description." },
      ],
      related: [
        { href: "/server/respawn", title: "Respawn server", copy: "The canonical Respawn server page." },
        { href: "/server/cs16-classic", title: "CS 1.6 Classic", copy: "The classic tactical server." },
        { href: "/join-staff", title: "Join staff", copy: "Help the community if you are active and mature." },
      ],
    },
  },
  "cs-1-6-servers": {
    ro: {
      slug: "cs-1-6-servers",
      tone: "cs16",
      metadata: {
        title: "Servere CS 1.6 România și Moldova | FREE-ARENA",
        description:
          "Servere CS 1.6 România și Moldova pe FREE-ARENA: Classic, Respawn, IP direct, rankings, Discord, TeamSpeak, staff activ și comunitate.",
        imageAlt: "Servere CS 1.6 România și Moldova FREE-ARENA",
      },
      hero: {
        eyebrow: "Servere CS 1.6",
        title: "Servere CS 1.6 România și Moldova",
        description:
          "Un traseu clar pentru jucătorii din România și Moldova care caută Counter-Strike 1.6 Classic, Respawn, IP direct, rankings și comunitate activă.",
      },
      primaryAction: { href: "/server/cs16-classic", label: "CS 1.6 Classic" },
      secondaryAction: { href: "/server/respawn", label: "Respawn" },
      quickActions: [
        {
          href: "steam://connect/217.156.22.74:27015",
          label: "Joacă Classic",
          eventName: "click_play_now",
          eventPayload: { server: "cs16" },
          tone: "cs16",
          variant: "glow",
        },
        {
          copyValue: "217.156.22.74:27015",
          label: "Copiază IP Classic",
          eventName: "click_copy_ip",
          eventPayload: { server: "cs16" },
          tone: "cs16",
        },
        {
          href: "steam://connect/51.38.97.243:27015",
          label: "Joacă Respawn",
          eventName: "click_play_now",
          eventPayload: { server: "respawn" },
          tone: "respawn",
        },
        {
          href: "/discord",
          label: "Intră pe Discord",
          eventName: "click_join_discord",
          tone: "global",
        },
      ],
      stats: [
        { title: "Classic IP", copy: "217.156.22.74:27015" },
        { title: "Respawn IP", copy: "51.38.97.243:27015" },
        { title: "Public", copy: "Jucători din România, Moldova și comunități apropiate care vor ping bun și suport clar." },
      ],
      sections: [
        {
          title: "Classic pentru România și Moldova",
          copy:
            "CS 1.6 Classic păstrează ritmul tradițional: hărți cunoscute, obiectiv, economie și dueluri unde sunetul și poziționarea contează. Pagina este optimizată pentru jucătorii care caută servere CS 1.6 românești, dar și pentru cei din Moldova care vor acces rapid.",
        },
        {
          title: "Respawn pentru antrenament",
          copy:
            "Respawn completează serverul clasic cu warm-up, aim, dueluri dese și sesiuni rapide pentru jucătorii care vor progres mecanic.",
        },
        {
          title: "De ce FREE-ARENA",
          copy:
            "FREE-ARENA leagă serverele CS 1.6 de o comunitate reală: staff, reguli, rankings, Discord, TeamSpeak și pagini care explică fiecare mod fără date inventate sau promisiuni artificiale.",
        },
      ],
      faq: [
        { question: "Ce server CS 1.6 să aleg?", answer: "Alege Classic pentru runde tradiționale și Respawn pentru warm-up, aim și dueluri rapide." },
        { question: "Care este IP-ul CS 1.6 Classic?", answer: "IP-ul serverului Classic este 217.156.22.74:27015." },
        { question: "Este potrivit pentru jucători din Moldova?", answer: "Da. Serverele sunt orientate pe România și Europa apropiată, iar jucătorii din Moldova pot testa direct ping-ul folosind IP-urile afișate." },
      ],
      related: [
        { href: "/server/cs16-classic", title: "CS 1.6 Classic", copy: "Pagina oficială pentru serverul clasic." },
        { href: "/server/respawn", title: "Respawn", copy: "Warm-up și acțiune rapidă." },
        { href: "/rankings", title: "Rankings", copy: "Clasamentul jucătorilor FREE-ARENA." },
      ],
    },
    en: {
      slug: "cs-1-6-servers",
      tone: "cs16",
      metadata: {
        title: "CS 1.6 servers Europe | FREE-ARENA Classic and Respawn",
        description:
          "FREE-ARENA CS 1.6 servers Europe: Classic, Respawn, direct IPs, rankings, Discord, TeamSpeak, active staff and English-friendly community.",
        imageAlt: "FREE-ARENA CS 1.6 servers Europe",
      },
      hero: {
        eyebrow: "CS 1.6 servers",
        title: "CS 1.6 servers Europe",
        description:
          "A clear path for EU players searching for Counter-Strike 1.6 servers, Classic mode, Respawn, direct IPs and active community.",
      },
      primaryAction: { href: "/server/cs16-classic", label: "CS 1.6 Classic" },
      secondaryAction: { href: "/server/respawn", label: "Respawn" },
      quickActions: [
        {
          href: "steam://connect/217.156.22.74:27015",
          label: "Join Classic",
          eventName: "click_play_now",
          eventPayload: { server: "cs16" },
          tone: "cs16",
          variant: "glow",
        },
        {
          copyValue: "217.156.22.74:27015",
          label: "Copy Classic IP",
          eventName: "click_copy_ip",
          eventPayload: { server: "cs16" },
          tone: "cs16",
        },
        {
          href: "steam://connect/51.38.97.243:27015",
          label: "Join Respawn",
          eventName: "click_play_now",
          eventPayload: { server: "respawn" },
          tone: "respawn",
        },
        {
          href: "/discord",
          label: "Join Discord",
          eventName: "click_join_discord",
          tone: "global",
        },
      ],
      stats: [
        { title: "Classic IP", copy: "217.156.22.74:27015" },
        { title: "Respawn IP", copy: "51.38.97.243:27015" },
        { title: "Community", copy: "Rankings, Discord, TeamSpeak and forum for English-friendly support and activity." },
      ],
      sections: [
        {
          title: "Classic for readable rounds",
          copy:
            "CS 1.6 Classic keeps the traditional rhythm: known maps, objectives, economy and duels where sound and positioning matter.",
        },
        {
          title: "Respawn for practice",
          copy:
            "Respawn complements the classic server with warm-up, aim, frequent duels and short sessions for mechanical progress.",
        },
        {
          title: "Why FREE-ARENA",
          copy:
            "FREE-ARENA connects CS 1.6 servers Europe to a real community: staff, rules, rankings, Discord, TeamSpeak and pages that explain each mode without fake data.",
        },
      ],
      faq: [
        { question: "Which CS 1.6 server should I choose?", answer: "Choose Classic for traditional rounds and Respawn for warm-up, aim and fast duels." },
        { question: "What is the CS 1.6 Classic IP?", answer: "The Classic server IP is 217.156.22.74:27015." },
        { question: "Are there player rankings?", answer: "Yes. Rankings shows progress, XP, kills, headshots and playtime." },
      ],
      related: [
        { href: "/server/cs16-classic", title: "CS 1.6 Classic", copy: "The official classic server page." },
        { href: "/server/respawn", title: "Respawn", copy: "Warm-up and fast action." },
        { href: "/rankings", title: "Rankings", copy: "FREE-ARENA player rankings." },
        { href: "/cs-1-6-servers-balkans", title: "CS 1.6 Balkans", copy: "Country-focused route for Balkan and nearby EU players." },
        { href: "/cs-1-6-servers-eastern-europe", title: "CS 1.6 Eastern Europe", copy: "Discovery page for Poland, Ukraine, Russia, Belarus, Moldova and the Baltics." },
        { href: "/cs-1-6-servers-brazil", title: "CS 1.6 Brazil test", copy: "Transparent EU-hosted test page for Brazilian players checking ping." },
      ],
    },
  },
  "counter-strike-servers-europe": {
    ro: {
      slug: "counter-strike-servers-europe",
      tone: "global",
      metadata: {
        title: "Counter-Strike servers Europe | FREE-ARENA",
        description:
          "FREE-ARENA conecteaza jucatori europeni la servere Counter-Strike: CS2, CS 1.6 Classic, Respawn, IP direct, Discord, TeamSpeak si rankings.",
        imageAlt: "FREE-ARENA Counter-Strike servers Europe",
      },
      hero: {
        eyebrow: "Europe hub",
        title: "Counter-Strike servers Europe",
        description:
          "Hub pentru jucatori din Europa care cauta servere Counter-Strike accesibile, comunitate English-friendly si rute rapide catre CS2, CS 1.6 Classic si Respawn.",
      },
      primaryAction: { href: "/servers", label: "Vezi serverele" },
      secondaryAction: { href: "/discord", label: "Intra pe Discord" },
      stats: [
        { title: "CS2 IP", copy: "135.125.208.88:27015" },
        { title: "CS 1.6 Classic IP", copy: "217.156.22.74:27015" },
        { title: "Respawn IP", copy: "51.38.97.243:27015" },
      ],
      sections: [
        {
          title: "O ruta clara pentru Europa",
          copy:
            "FREE-ARENA este construit in Romania, dar serverele si comunitatea pot primi jucatori din Europa. Pagina aduna IP-urile, modurile active si canalele de suport intr-un singur traseu.",
        },
        {
          title: "CS2, CS 1.6 si Respawn",
          copy:
            "Jucatorii pot alege Counter-Strike 2 pentru directia moderna, CS 1.6 Classic pentru runde traditionale sau Respawn pentru warm-up si dueluri rapide.",
        },
        {
          title: "Comunitate English-friendly",
          copy:
            "Discord, TeamSpeak, forumul si rankings ajuta jucatorii noi sa inteleaga unde intra, cum cer suport si cum urmaresc activitatea comunitatii.",
        },
      ],
      faq: [
        { question: "FREE-ARENA accepta jucatori internationali?", answer: "Da. Comunitatea este romaneasca la baza, dar jucatorii internationali sunt bineveniti daca respecta regulile." },
        { question: "Ce servere Counter-Strike sunt listate?", answer: "Hub-ul leaga CS2, CS 1.6 Classic si Respawn, fiecare cu pagina dedicata si IP direct." },
        { question: "Unde gasesc suport?", answer: "Discord, TeamSpeak si forumul FREE-ARENA sunt canalele principale pentru suport si comunitate." },
      ],
      related: [
        { href: "/cs2-servers", title: "CS2 servers", copy: "Pagina pentru jucatori care cauta servere CS2 si comunitate Counter-Strike 2." },
        { href: "/cs-1-6-servers", title: "CS 1.6 servers", copy: "Classic si Respawn pentru Counter-Strike 1.6." },
        { href: "/respawn-server", title: "Respawn server", copy: "Warm-up, aim si dueluri rapide." },
      ],
    },
    en: {
      slug: "counter-strike-servers-europe",
      tone: "global",
      metadata: {
        title: "Counter-Strike servers Europe | FREE-ARENA CS2 and CS 1.6",
        description:
          "FREE-ARENA connects EU players to Counter-Strike servers: CS2, CS 1.6 Classic, Respawn, direct IPs, Discord, TeamSpeak, rankings and English-friendly community.",
        imageAlt: "FREE-ARENA Counter-Strike servers Europe",
      },
      hero: {
        eyebrow: "Europe server hub",
        title: "Counter-Strike servers Europe",
        description:
          "A Europe-focused hub for players looking for CS2 servers, CS 1.6 servers, Respawn practice, direct IPs and an English-friendly FREE-ARENA community.",
      },
      primaryAction: { href: "/servers", label: "View all servers" },
      secondaryAction: { href: "/discord", label: "Join Discord" },
      quickActions: [
        {
          href: "steam://connect/217.156.22.74:27015",
          label: "Join CS 1.6",
          eventName: "click_play_now",
          eventPayload: { server: "cs16" },
          tone: "cs16",
          variant: "glow",
        },
        {
          href: "/discord",
          label: "Join Discord",
          eventName: "click_join_discord",
          tone: "global",
        },
        {
          href: "/teamspeak",
          label: "TeamSpeak",
          eventName: "click_teamspeak",
          tone: "respawn",
        },
        {
          href: "/rankings",
          label: "Rankings",
          eventName: "click_server_details",
          eventPayload: { target: "rankings" },
          tone: "cs2",
        },
      ],
      stats: [
        { title: "CS2 IP", copy: "135.125.208.88:27015" },
        { title: "CS 1.6 Classic IP", copy: "217.156.22.74:27015" },
        { title: "Respawn IP", copy: "51.38.97.243:27015" },
      ],
      sections: [
        {
          title: "A clear European entry point",
          copy:
            "FREE-ARENA is rooted in Romania but built to welcome EU players. This hub gives international players one clear path to the live Counter-Strike servers, support channels and community pages.",
        },
        {
          title: "CS2, CS 1.6 Classic and Respawn",
          copy:
            "Players can choose Counter-Strike 2 for the modern direction, CS 1.6 Classic for traditional rounds, or Respawn for warm-up, aim practice and fast duels.",
        },
        {
          title: "English-friendly community signals",
          copy:
            "Discord, TeamSpeak, rankings and server pages help international players understand where to join, how to get support and how to follow FREE-ARENA activity.",
        },
      ],
      faq: [
        { question: "Is FREE-ARENA open to international players?", answer: "Yes. FREE-ARENA is rooted in Romania, but EU and international players are welcome if they follow the rules." },
        { question: "Which Counter-Strike servers are available?", answer: "The hub links CS2, CS 1.6 Classic and Respawn, with direct IPs and dedicated pages for each server." },
        { question: "Where can English-speaking players get support?", answer: "Use FREE-ARENA Discord, TeamSpeak or the forum. The English pages keep the main connection and support paths clear." },
      ],
      related: [
        { href: "/cs2-servers", title: "CS2 servers Europe", copy: "A focused path for Counter-Strike 2 players and EU server discovery." },
        { href: "/cs-1-6-servers", title: "CS 1.6 servers Europe", copy: "Classic Counter-Strike and Respawn practice in the FREE-ARENA network." },
        { href: "/respawn-server", title: "Respawn server", copy: "Warm-up, aim practice and fast Counter-Strike duels." },
        { href: "/cs-1-6-servers-balkans", title: "CS 1.6 Balkans", copy: "A Balkan-focused page for Romania, Moldova, Bulgaria, Serbia, Greece and Turkey." },
        { href: "/cs-1-6-servers-eastern-europe", title: "CS 1.6 Eastern Europe", copy: "A discovery route for Poland, Ukraine, Russia, Belarus, Moldova and the Baltics." },
        { href: "/cs-1-6-servers-brazil", title: "CS 1.6 Brazil test", copy: "A transparent EU-hosted test page for Brazilian players checking ping and community fit." },
      ],
    },
  },
  "fivem-server": {
    ro: {
      slug: "fivem-server",
      tone: "fivem",
      metadata: {
        title: "FiveM server FREE-ARENA | GTA V Roleplay Romania",
        description:
          "Pagina FiveM FREE-ARENA pentru GTA V Roleplay Romania: coming soon, Discord, whitelist, reguli, staff, update-uri si comunitate.",
        imageAlt: "FiveM server FREE-ARENA GTA V Roleplay Romania",
      },
      hero: {
        eyebrow: "FiveM server",
        title: "FiveM server FREE-ARENA",
        description:
          "Pagina dedicata pentru viitorul server FiveM FREE-ARENA: roleplay, whitelist, reguli, staff, Discord si update-uri intr-un singur loc.",
      },
      primaryAction: { href: "/server/fivem", label: "Vezi pagina FiveM" },
      secondaryAction: { href: "/discord", label: "Intra pe Discord" },
      quickActions: [
        {
          href: "/server/fivem",
          label: "Pagina FiveM",
          eventName: "click_server_details",
          eventPayload: { server: "fivem" },
          tone: "fivem",
          variant: "glow",
        },
        {
          href: "/discord",
          label: "Discord FiveM",
          eventName: "click_join_discord",
          eventPayload: { server: "fivem" },
          tone: "global",
        },
        {
          href: "/join-staff",
          label: "Aplica staff",
          eventName: "click_apply_staff",
          eventPayload: { server: "fivem" },
          tone: "respawn",
        },
        {
          href: "/servers",
          label: "Server hub",
          eventName: "click_server_details",
          eventPayload: { target: "servers", server: "fivem" },
          tone: "cs2",
        },
      ],
      stats: [
        { title: "Status", copy: "Coming soon, fara statistici inventate inainte de lansare." },
        { title: "Adresa rezervata", copy: "fivem.free-arena.ro:30120, confirmata public cand serverul este live." },
        { title: "Focus", copy: "GTA V Roleplay Romania, whitelist, reguli clare, staff si comunitate." },
      ],
      sections: [
        {
          title: "De ce pagina separata pentru FiveM",
          copy:
            "FiveM are nevoie de continut propriu: whitelist, reguli RP, economie, joburi, factiuni, politie, EMS si update-uri. O pagina dedicata evita amestecarea cu serverele Counter-Strike si ofera jucatorilor un traseu clar.",
        },
        {
          title: "Ce publicam aici",
          copy:
            "Aici pot aparea ghidul de conectare, regulamentul, cerintele de whitelist, cererile staff, anunturile de wipe, changelog-ul si noutatile despre orasul FREE-ARENA FiveM.",
        },
        {
          title: "Lansare transparenta",
          copy:
            "Pana la deschidere, pagina ramane coming soon. Cand serverul este pregatit, schimbam statusul, adaugam buton de conectare si publicam informatiile reale fara sa schimbam URL-ul.",
        },
      ],
      faq: [
        { question: "Serverul FiveM este live acum?", answer: "Nu. Este marcat coming soon pana cand infrastructura si regulile sunt pregatite pentru public." },
        { question: "Unde intru pentru noutati FiveM?", answer: "Discord-ul FREE-ARENA este canalul principal pentru anunturi, feedback si recrutare staff." },
        { question: "Va exista whitelist?", answer: "Directia recomandata este whitelist controlat pentru roleplay mai curat si comunitate mai usor de moderat." },
      ],
      related: [
        { href: "/server/fivem", title: "Pagina canonica FiveM", copy: "Tot ce tine de serverul FiveM FREE-ARENA." },
        { href: "/discord", title: "Discord FREE-ARENA", copy: "Anunturi, discutii, feedback si pregatirea comunitatii FiveM." },
        { href: "/join-staff", title: "Recrutare staff", copy: "Locul pentru aplicatii staff cand proiectul FiveM intra in faza activa." },
      ],
    },
    en: {
      slug: "fivem-server",
      tone: "fivem",
      metadata: {
        title: "FREE-ARENA FiveM server | GTA V Roleplay Europe",
        description:
          "FREE-ARENA FiveM server page for GTA V Roleplay: coming soon, Discord, whitelist, rules, staff, updates and community.",
        imageAlt: "FREE-ARENA FiveM server GTA V Roleplay Europe",
      },
      hero: {
        eyebrow: "FiveM server",
        title: "FREE-ARENA FiveM server",
        description:
          "A dedicated page for the future FREE-ARENA FiveM server: roleplay, whitelist, rules, staff, Discord and updates in one place.",
      },
      primaryAction: { href: "/server/fivem", label: "Open FiveM page" },
      secondaryAction: { href: "/discord", label: "Join Discord" },
      quickActions: [
        {
          href: "/server/fivem",
          label: "FiveM page",
          eventName: "click_server_details",
          eventPayload: { server: "fivem" },
          tone: "fivem",
          variant: "glow",
        },
        {
          href: "/discord",
          label: "FiveM Discord",
          eventName: "click_join_discord",
          eventPayload: { server: "fivem" },
          tone: "global",
        },
        {
          href: "/join-staff",
          label: "Apply staff",
          eventName: "click_apply_staff",
          eventPayload: { server: "fivem" },
          tone: "respawn",
        },
        {
          href: "/servers",
          label: "Server hub",
          eventName: "click_server_details",
          eventPayload: { target: "servers", server: "fivem" },
          tone: "cs2",
        },
      ],
      stats: [
        { title: "Status", copy: "Coming soon, with no invented live statistics before launch." },
        { title: "Reserved address", copy: "fivem.free-arena.ro:30120, confirmed publicly when the server is live." },
        { title: "Focus", copy: "GTA V Roleplay, whitelist, clear rules, staff and community." },
      ],
      sections: [
        {
          title: "Why FiveM needs its own page",
          copy:
            "FiveM needs its own content: whitelist, RP rules, economy, jobs, factions, police, EMS and updates. A dedicated page keeps it separate from Counter-Strike and gives players a clear path.",
        },
        {
          title: "What will be posted here",
          copy:
            "This page can host the connection guide, rules, whitelist requirements, staff applications, wipe announcements, changelog and updates about the FREE-ARENA FiveM city.",
        },
        {
          title: "Transparent launch",
          copy:
            "Until opening, the page stays coming soon. When the server is ready, we update status, add the connection action and publish real information without changing the URL.",
        },
      ],
      faq: [
        { question: "Is the FiveM server live now?", answer: "No. It is marked coming soon until infrastructure and rules are ready for public access." },
        { question: "Where can I follow FiveM updates?", answer: "FREE-ARENA Discord is the main channel for announcements, feedback and staff recruitment." },
        { question: "Will there be whitelist?", answer: "The recommended direction is controlled whitelist for cleaner roleplay and easier moderation." },
      ],
      related: [
        { href: "/server/fivem", title: "Canonical FiveM page", copy: "Everything about the FREE-ARENA FiveM server." },
        { href: "/discord", title: "FREE-ARENA Discord", copy: "Announcements, discussion, feedback and FiveM community preparation." },
        { href: "/join-staff", title: "Staff recruitment", copy: "The route for staff applications when FiveM becomes active." },
      ],
    },
  },
  "cs-1-6-servers-balkans": {
    en: {
      slug: "cs-1-6-servers-balkans",
      tone: "cs16",
      metadata: {
        title: "CS 1.6 servers Balkans | FREE-ARENA Classic and Respawn",
        description:
          "FREE-ARENA CS 1.6 servers for Balkan players: Romania, Moldova, Bulgaria, Serbia, Croatia, Bosnia, North Macedonia, Greece and Turkey. Direct IPs, Discord, TeamSpeak and rankings.",
        imageAlt: "FREE-ARENA CS 1.6 servers Balkans",
      },
      hero: {
        eyebrow: "CS 1.6 Balkans",
        title: "CS 1.6 servers for Balkan players",
        description:
          "A focused route for players from Romania, Moldova, Bulgaria, Serbia, Croatia, Bosnia, North Macedonia, Greece and Turkey who want Classic CS 1.6, Respawn practice and quick FREE-ARENA access.",
      },
      primaryAction: { href: "/server/cs16-classic", label: "Open Classic" },
      secondaryAction: { href: "/discord", label: "Join Discord" },
      quickActions: [
        {
          href: "steam://connect/217.156.22.74:27015",
          label: "Join Classic",
          eventName: "click_play_now",
          eventPayload: { server: "cs16" },
          tone: "cs16",
          variant: "glow",
        },
        {
          copyValue: "217.156.22.74:27015",
          label: "Copy Classic IP",
          eventName: "click_copy_ip",
          eventPayload: { server: "cs16" },
          tone: "cs16",
        },
        {
          href: "steam://connect/51.38.97.243:27015",
          label: "Join Respawn",
          eventName: "click_play_now",
          eventPayload: { server: "respawn" },
          tone: "respawn",
        },
        {
          href: "/discord",
          label: "Join Discord",
          eventName: "click_join_discord",
          tone: "global",
        },
      ],
      stats: [
        { title: "Classic IP", copy: "217.156.22.74:27015" },
        { title: "Respawn IP", copy: "51.38.97.243:27015" },
        { title: "Region focus", copy: "Balkan and nearby EU players should test ping directly before long sessions." },
      ],
      sections: [
        {
          title: "A Balkan-friendly CS 1.6 path",
          copy:
            "FREE-ARENA is rooted in Romania, which makes the Balkan route natural for players who want classic Counter-Strike 1.6 with direct IPs, English-friendly support and visible community channels.",
        },
        {
          title: "Classic rounds and Respawn practice",
          copy:
            "Classic is the main path for tactical rounds and familiar maps. Respawn is the faster path for aim, warm-up and repeated duels before longer sessions.",
        },
        {
          title: "Community before empty traffic",
          copy:
            "The page links Discord, TeamSpeak, rankings and canonical server pages so Balkan players can join, check activity and return to the same FREE-ARENA ecosystem.",
        },
      ],
      faq: [
        { question: "Is FREE-ARENA useful for Balkan CS 1.6 players?", answer: "Yes. The community is based in Romania and the server pages are built to make joining, support and rankings clear for nearby Balkan players." },
        { question: "Which countries are targeted by this page?", answer: "Romania, Moldova, Bulgaria, Serbia, Croatia, Bosnia, North Macedonia, Greece and Turkey are the main v1 focus." },
        { question: "What should I do first?", answer: "Copy the Classic IP or use the Join Classic button, then join Discord or TeamSpeak if you want support and community updates." },
      ],
      related: [
        { href: "/cs-1-6-servers", title: "CS 1.6 servers Europe", copy: "The main English CS 1.6 page for Classic and Respawn." },
        { href: "/server/cs16-classic", title: "CS 1.6 Classic", copy: "Canonical page with status, IP and connection context." },
        { href: "/server/respawn", title: "Respawn", copy: "Fast warm-up and practice server for CS 1.6 players." },
        { href: "/rankings", title: "Rankings", copy: "Follow XP, kills, headshots and player activity." },
      ],
    },
  },
  "cs-1-6-servers-eastern-europe": {
    en: {
      slug: "cs-1-6-servers-eastern-europe",
      tone: "cs16",
      metadata: {
        title: "CS 1.6 servers Eastern Europe | FREE-ARENA",
        description:
          "FREE-ARENA CS 1.6 servers for Eastern Europe: Poland, Ukraine, Russia, Belarus, Moldova and the Baltics. Classic, Respawn, direct IPs, Discord, TeamSpeak and rankings.",
        imageAlt: "FREE-ARENA CS 1.6 servers Eastern Europe",
      },
      hero: {
        eyebrow: "Eastern Europe",
        title: "CS 1.6 servers Eastern Europe",
        description:
          "A discovery page for Eastern European players searching for Classic Counter-Strike 1.6, Respawn practice, direct IPs and an English-friendly FREE-ARENA community.",
      },
      primaryAction: { href: "/server/cs16-classic", label: "Open Classic" },
      secondaryAction: { href: "/rankings", label: "View rankings" },
      quickActions: [
        {
          href: "steam://connect/217.156.22.74:27015",
          label: "Join Classic",
          eventName: "click_play_now",
          eventPayload: { server: "cs16" },
          tone: "cs16",
          variant: "glow",
        },
        {
          copyValue: "217.156.22.74:27015",
          label: "Copy Classic IP",
          eventName: "click_copy_ip",
          eventPayload: { server: "cs16" },
          tone: "cs16",
        },
        {
          href: "/discord",
          label: "Join Discord",
          eventName: "click_join_discord",
          tone: "global",
        },
        {
          href: "/teamspeak",
          label: "TeamSpeak",
          eventName: "click_teamspeak",
          tone: "respawn",
        },
      ],
      stats: [
        { title: "Classic IP", copy: "217.156.22.74:27015" },
        { title: "Respawn IP", copy: "51.38.97.243:27015" },
        { title: "Region focus", copy: "Poland, Ukraine, Russia, Belarus, Moldova and Baltic players should test latency first." },
      ],
      sections: [
        {
          title: "Eastern Europe demand, honest EU hosting",
          copy:
            "CS 1.6 still has strong interest across Eastern Europe. FREE-ARENA does not claim a local server in every country; it gives direct EU-hosted access and clear ways to test ping.",
        },
        {
          title: "Classic and Respawn in one route",
          copy:
            "Classic is for traditional rounds, map knowledge and objective play. Respawn is for faster practice, aim rhythm and short sessions when players want action quickly.",
        },
        {
          title: "English-first support in v1",
          copy:
            "The international pages stay in English for v1. Players can still use Discord, TeamSpeak and rankings while FREE-ARENA watches which countries convert into real activity.",
        },
      ],
      faq: [
        { question: "Is this a Russian or Polish local server?", answer: "No. FREE-ARENA is EU-hosted and rooted in Romania. Eastern European players should test ping with the direct IP before long sessions." },
        { question: "Which countries are included?", answer: "The v1 page targets Poland, Ukraine, Russia, Belarus, Moldova and the Baltic countries as discovery markets." },
        { question: "Will FREE-ARENA add Russian or other languages?", answer: "Not in v1. Extra languages should come only after Search Console, Discord joins and server activity prove demand." },
      ],
      related: [
        { href: "/cs-1-6-servers", title: "CS 1.6 servers Europe", copy: "The main English landing page for CS 1.6 Classic and Respawn." },
        { href: "/counter-strike-servers-europe", title: "Counter-Strike Europe", copy: "The broader international hub for FREE-ARENA servers." },
        { href: "/server/cs16-classic", title: "CS 1.6 Classic", copy: "Canonical server page with direct IP and details." },
        { href: "/rankings", title: "Rankings", copy: "Track active players and server progress." },
      ],
    },
  },
  "cs-1-6-servers-brazil": {
    en: {
      slug: "cs-1-6-servers-brazil",
      tone: "global",
      metadata: {
        title: "CS 1.6 servers Brazil test | FREE-ARENA EU-hosted",
        description:
          "FREE-ARENA CS 1.6 servers Brazil test page: EU-hosted Classic and Respawn servers for Brazilian players who want to check ping, direct IPs, Discord and rankings.",
        imageAlt: "FREE-ARENA CS 1.6 servers Brazil test",
      },
      hero: {
        eyebrow: "Brazil test route",
        title: "CS 1.6 servers Brazil test",
        description:
          "A transparent test page for Brazilian CS 1.6 players. FREE-ARENA is EU-hosted, so the right first step is to test ping with the direct IPs before treating it as a daily server.",
      },
      primaryAction: { href: "/server/cs16-classic", label: "Open Classic" },
      secondaryAction: { href: "/discord", label: "Join Discord" },
      quickActions: [
        {
          href: "steam://connect/217.156.22.74:27015",
          label: "Test Classic",
          eventName: "click_play_now",
          eventPayload: { server: "cs16" },
          tone: "cs16",
          variant: "glow",
        },
        {
          copyValue: "217.156.22.74:27015",
          label: "Copy Classic IP",
          eventName: "click_copy_ip",
          eventPayload: { server: "cs16" },
          tone: "cs16",
        },
        {
          href: "/discord",
          label: "Join Discord",
          eventName: "click_join_discord",
          tone: "global",
        },
        {
          href: "/rankings",
          label: "Rankings",
          eventName: "click_server_details",
          eventPayload: { target: "rankings" },
          tone: "cs2",
        },
      ],
      stats: [
        { title: "Hosting", copy: "EU-hosted, not a Brazil-hosted server." },
        { title: "Classic IP", copy: "217.156.22.74:27015" },
        { title: "Best first step", copy: "Test ping, copy the IP, then join Discord if the connection feels playable." },
      ],
      sections: [
        {
          title: "Why this page is a test",
          copy:
            "Brazil has visible Counter-Strike 1.6 interest, but distance to Europe can hurt latency. FREE-ARENA keeps this route honest: it is a discovery page, not a promise of a local Brazilian server.",
        },
        {
          title: "How Brazilian players should try it",
          copy:
            "Use the direct Classic IP first, check ping and feel, then try Respawn if you want faster duels. If it works for you, Discord and rankings make it easier to stay connected.",
        },
        {
          title: "When to invest more",
          copy:
            "If Brazil brings real clicks, Discord joins and active players, the next step can be Portuguese content or a separate infrastructure discussion. Until then, the page remains a measured test.",
        },
      ],
      faq: [
        { question: "Is FREE-ARENA hosted in Brazil?", answer: "No. FREE-ARENA is EU-hosted. Brazilian players should test ping with the direct IP before committing to regular play." },
        { question: "Why target Brazil at all?", answer: "Brazil can still show CS 1.6 demand. This page measures real player intent without pretending the server is local." },
        { question: "Will there be Portuguese content?", answer: "Only if the data supports it: Search Console clicks, Discord joins and real server activity from Brazilian players." },
      ],
      related: [
        { href: "/cs-1-6-servers", title: "CS 1.6 servers Europe", copy: "The main CS 1.6 landing page with Classic and Respawn." },
        { href: "/server/cs16-classic", title: "CS 1.6 Classic", copy: "Canonical server page with direct IP and connection context." },
        { href: "/discord", title: "Discord", copy: "Join the community if the server ping works for you." },
        { href: "/rankings", title: "Rankings", copy: "Check activity and progress before returning to the server." },
      ],
    },
  },
};

export function getKeywordLandingContent(slug: KeywordLandingSlug, locale: Locale) {
  return keywordLandingPages[slug][locale];
}

export function getKeywordLandingLocales(slug: KeywordLandingSlug) {
  return routing.locales.filter((locale) => Boolean(keywordLandingPages[slug][locale]));
}
