import type { Locale } from "@/i18n/routing";

export const keywordLandingSlugs = ["cs2-servers", "respawn-server", "cs-1-6-servers"] as const;

export type KeywordLandingSlug = (typeof keywordLandingSlugs)[number];

export type KeywordLandingCard = {
  title: string;
  copy: string;
};

export type KeywordLandingFaq = {
  question: string;
  answer: string;
};

export type KeywordLandingPageContent = {
  slug: KeywordLandingSlug;
  tone: "cs16" | "cs2" | "respawn";
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
  stats: readonly KeywordLandingCard[];
  sections: readonly KeywordLandingCard[];
  faq: readonly KeywordLandingFaq[];
  related: readonly {
    href: string;
    title: string;
    copy: string;
  }[];
};

export const keywordLandingPages: Record<KeywordLandingSlug, Record<Locale, KeywordLandingPageContent>> = {
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
        title: "CS2 servers FREE-ARENA | Counter-Strike 2 community",
        description:
          "Looking for CS2 servers? FREE-ARENA links the Counter-Strike 2 server, direct IP, Discord, TeamSpeak, support and competitive community.",
        imageAlt: "FREE-ARENA CS2 servers",
      },
      hero: {
        eyebrow: "CS2 servers",
        title: "FREE-ARENA CS2 servers",
        description:
          "A focused landing page for players searching for CS2 servers, Counter-Strike 2 community and quick access to FREE-ARENA.",
      },
      primaryAction: { href: "/server/cs2", label: "Open CS2 server" },
      secondaryAction: { href: "/servers", label: "All servers" },
      stats: [
        { title: "Server IP", copy: "135.125.208.88:27015" },
        { title: "Community", copy: "Discord, TeamSpeak and forum connected to the FREE-ARENA identity." },
        { title: "Focus", copy: "Competitive Counter-Strike 2 with support, rules and long-term growth." },
      ],
      sections: [
        {
          title: "Why a dedicated CS2 servers page",
          copy:
            "A CS2 servers search is broader than a raw IP page. Players want community, support, voice, rules and a clear direction. FREE-ARENA connects those signals to the dedicated CS2 server page.",
        },
        {
          title: "Connection and support",
          copy:
            "The CS2 server can be added to favorites with the direct IP. If the in-game browser is delayed, the server page keeps the address, Discord, TeamSpeak and core connection details visible.",
        },
        {
          title: "Part of the FREE-ARENA ecosystem",
          copy:
            "CS2 is connected with CS 1.6 Classic, Respawn, rankings, Discord and TeamSpeak so players can move from server discovery to community quickly.",
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
        title: "Respawn server CS 1.6 FREE-ARENA",
        description:
          "FREE-ARENA Respawn server for CS 1.6 warm-up, aim practice, fast duels, direct IP, staff, Discord, TeamSpeak and active community.",
        imageAlt: "FREE-ARENA Respawn server",
      },
      hero: {
        eyebrow: "Respawn server",
        title: "CS 1.6 Respawn server",
        description:
          "A page for players searching for a fast respawn server for warm-up, aim practice, frequent duels and quick connection.",
      },
      primaryAction: { href: "/server/respawn", label: "Open Respawn" },
      secondaryAction: { href: "/servers", label: "All servers" },
      stats: [
        { title: "Server IP", copy: "51.38.97.243:27015" },
        { title: "Mode", copy: "Respawn for continuous action, practice and short sessions." },
        { title: "Support", copy: "Discord, TeamSpeak and forum for reports, staff and community." },
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
            "The page connects IP, canonical server page, Discord, TeamSpeak and rankings so players can join, get support and follow the community quickly.",
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
        title: "Servere CS 1.6 România | FREE-ARENA Classic și Respawn",
        description:
          "Servere CS 1.6 România pe FREE-ARENA: Classic, Respawn, IP direct, rankings, Discord, TeamSpeak, staff activ și comunitate.",
        imageAlt: "Servere CS 1.6 România FREE-ARENA",
      },
      hero: {
        eyebrow: "Servere CS 1.6",
        title: "Servere CS 1.6 România",
        description:
          "Un traseu clar pentru jucătorii care caută servere Counter-Strike 1.6 românești, mod Classic, Respawn, IP direct și comunitate activă.",
      },
      primaryAction: { href: "/server/cs16-classic", label: "CS 1.6 Classic" },
      secondaryAction: { href: "/server/respawn", label: "Respawn" },
      stats: [
        { title: "Classic IP", copy: "217.156.22.74:27015" },
        { title: "Respawn IP", copy: "51.38.97.243:27015" },
        { title: "Comunitate", copy: "Rankings, Discord, TeamSpeak și forum pentru suport și activitate." },
      ],
      sections: [
        {
          title: "Classic pentru runde clare",
          copy:
            "CS 1.6 Classic păstrează ritmul tradițional: hărți cunoscute, obiectiv, economie și dueluri unde sunetul și poziționarea contează.",
        },
        {
          title: "Respawn pentru antrenament",
          copy:
            "Respawn completează serverul clasic cu warm-up, aim, dueluri dese și sesiuni rapide pentru jucătorii care vor progres mecanic.",
        },
        {
          title: "De ce FREE-ARENA",
          copy:
            "FREE-ARENA leagă serverele CS 1.6 de o comunitate reală: staff, reguli, rankings, Discord, TeamSpeak și pagini care explică fiecare mod fără date inventate.",
        },
      ],
      faq: [
        { question: "Ce server CS 1.6 să aleg?", answer: "Alege Classic pentru runde tradiționale și Respawn pentru warm-up, aim și dueluri rapide." },
        { question: "Care este IP-ul CS 1.6 Classic?", answer: "IP-ul serverului Classic este 217.156.22.74:27015." },
        { question: "Există clasament pentru jucători?", answer: "Da. Pagina Rankings arată progres, XP, kill-uri, headshot-uri și timp jucat." },
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
        title: "CS 1.6 servers Romania | FREE-ARENA Classic and Respawn",
        description:
          "FREE-ARENA CS 1.6 servers in Romania: Classic, Respawn, direct IPs, rankings, Discord, TeamSpeak, active staff and community.",
        imageAlt: "FREE-ARENA CS 1.6 servers Romania",
      },
      hero: {
        eyebrow: "CS 1.6 servers",
        title: "CS 1.6 servers Romania",
        description:
          "A clear path for players searching for Romanian Counter-Strike 1.6 servers, Classic mode, Respawn, direct IPs and active community.",
      },
      primaryAction: { href: "/server/cs16-classic", label: "CS 1.6 Classic" },
      secondaryAction: { href: "/server/respawn", label: "Respawn" },
      stats: [
        { title: "Classic IP", copy: "217.156.22.74:27015" },
        { title: "Respawn IP", copy: "51.38.97.243:27015" },
        { title: "Community", copy: "Rankings, Discord, TeamSpeak and forum for support and activity." },
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
            "FREE-ARENA connects CS 1.6 servers to a real community: staff, rules, rankings, Discord, TeamSpeak and pages that explain each mode without fake data.",
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
      ],
    },
  },
};
