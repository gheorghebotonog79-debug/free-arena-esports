import type { Locale } from "@/i18n/routing";
import type { PublicServerSlug } from "@/lib/servers";

export const serverSeoSlugs = ["cs16-classic", "respawn", "cs2", "fivem", "global"] as const;

export type ServerSeoSlug = (typeof serverSeoSlugs)[number];

export type ServerSeoFeatureKey =
  | "antiCheat"
  | "activeAdmins"
  | "fastSupport"
  | "events"
  | "stableServers"
  | "rankings";

export type ServerSeoFeature = {
  key: ServerSeoFeatureKey;
  title: string;
  description: string;
};

export type ServerSeoFaq = {
  question: string;
  answer: string;
};

export type ServerSeoPageData = {
  slug: ServerSeoSlug;
  publicServerSlug: PublicServerSlug;
  gameName: string;
  genres: readonly string[];
  platforms: readonly string[];
  seo: Record<Locale, {
    title: string;
    description: string;
    imageAlt: string;
  }>;
  hero: Record<Locale, {
    eyebrow: string;
    name: string;
    description: string;
    statusLabel: string;
  }>;
  info: Record<Locale, {
    status: string;
    players: string;
    map: string;
    latency: string;
  }>;
  content: Record<Locale, {
    heading: string;
    intro: string;
    paragraphs: readonly string[];
  }>;
  features: Record<Locale, readonly ServerSeoFeature[]>;
  faq: Record<Locale, readonly ServerSeoFaq[]>;
};

const roFeatures: readonly ServerSeoFeature[] = [
  {
    key: "antiCheat",
    title: "Anti-cheat activ",
    description: "Reguli clare, monitorizare constanta si interventii rapide pentru meciuri corecte.",
  },
  {
    key: "activeAdmins",
    title: "Admini activi",
    description: "Staff-ul FREE-ARENA urmareste serverele si raspunde la situatii reale din comunitate.",
  },
  {
    key: "fastSupport",
    title: "Suport rapid",
    description: "Discord, TeamSpeak si forumul sunt puncte directe pentru intrebari si raportari.",
  },
  {
    key: "events",
    title: "Evenimente",
    description: "Structura este pregatita pentru cupe, seri tematice si competitii organizate.",
  },
  {
    key: "stableServers",
    title: "Servere stabile",
    description: "Configuratia este gandita pentru uptime bun, conexiune curata si sesiuni repetabile.",
  },
  {
    key: "rankings",
    title: "Rankings",
    description: "Progresul competitiv si clasamentele ajuta jucatorii sa revina cu obiective clare.",
  },
];

const enFeatures: readonly ServerSeoFeature[] = [
  {
    key: "antiCheat",
    title: "Active anti-cheat",
    description: "Clear rules, constant monitoring and quick action keep matches fair.",
  },
  {
    key: "activeAdmins",
    title: "Active admins",
    description: "FREE-ARENA staff follows the servers and reacts to real community situations.",
  },
  {
    key: "fastSupport",
    title: "Fast support",
    description: "Discord, TeamSpeak and the forum give players direct support paths.",
  },
  {
    key: "events",
    title: "Events",
    description: "The structure is ready for cups, themed nights and organized competitions.",
  },
  {
    key: "stableServers",
    title: "Stable servers",
    description: "The setup is built for good uptime, clean connectivity and repeatable sessions.",
  },
  {
    key: "rankings",
    title: "Rankings",
    description: "Competitive progress and rankings give players clear reasons to return.",
  },
];

const roFiveMFeatures: readonly ServerSeoFeature[] = [
  {
    key: "activeAdmins",
    title: "Staff RP",
    description: "Roluri dedicate pentru suport, whitelist, reguli si moderare pe viitorul server FiveM.",
  },
  {
    key: "antiCheat",
    title: "Reguli clare",
    description: "Regulamentul RP va fi publicat inainte de lansare, cu asteptari clare pentru jucatori.",
  },
  {
    key: "fastSupport",
    title: "Discord conectat",
    description: "Anunturile, feedback-ul, intrebarile si cererile staff vor ramane vizibile pe canalele oficiale.",
  },
  {
    key: "stableServers",
    title: "Lansare controlata",
    description: "Nu afisam date false; statusul trece live doar cand infrastructura FiveM este pregatita.",
  },
  {
    key: "events",
    title: "Evenimente RP",
    description: "Pagina este pregatita pentru eventuri, wipe announcements, changelog si update-uri de oras.",
  },
  {
    key: "rankings",
    title: "Identitate comunitate",
    description: "FiveM va fi legat de ecosistemul FREE-ARENA: Discord, forum, staff si server hub.",
  },
];

const enFiveMFeatures: readonly ServerSeoFeature[] = [
  {
    key: "activeAdmins",
    title: "RP staff",
    description: "Dedicated roles for support, whitelist, rules and moderation on the future FiveM server.",
  },
  {
    key: "antiCheat",
    title: "Clear rules",
    description: "RP rules will be published before launch, with clear expectations for players.",
  },
  {
    key: "fastSupport",
    title: "Connected Discord",
    description: "Announcements, feedback, questions and staff requests stay visible on official channels.",
  },
  {
    key: "stableServers",
    title: "Controlled launch",
    description: "No fake data is shown; status becomes live only when the FiveM infrastructure is ready.",
  },
  {
    key: "events",
    title: "RP events",
    description: "The page is prepared for events, wipe announcements, changelog and city updates.",
  },
  {
    key: "rankings",
    title: "Community identity",
    description: "FiveM will be connected to the FREE-ARENA ecosystem: Discord, forum, staff and server hub.",
  },
];

export const serverSeoPages: Record<ServerSeoSlug, ServerSeoPageData> = {
  "cs16-classic": {
    slug: "cs16-classic",
    publicServerSlug: "cs16",
    gameName: "Counter-Strike 1.6",
    genres: ["FPS", "Competitive", "Classic"],
    platforms: ["PC", "Steam"],
    seo: {
      ro: {
        title: "Server CS 1.6 Classic FREE-ARENA România",
        description:
          "Joaca pe serverul FREE-ARENA CS 1.6 Classic România: gameplay clasic, staff activ, anti-cheat, evenimente si comunitate competitiva.",
        imageAlt: "FREE-ARENA CS 1.6 Classic server România",
      },
      en: {
        title: "CS 1.6 Classic FREE-ARENA Europe Server",
        description:
          "Play FREE-ARENA CS 1.6 Classic Europe: classic Counter-Strike gameplay, direct IP, active staff, anti-cheat, events and English-friendly community.",
        imageAlt: "FREE-ARENA CS 1.6 Classic Europe server",
      },
    },
    hero: {
      ro: {
        eyebrow: "Server Counter-Strike 1.6",
        name: "CS 1.6 Classic",
        description:
          "Serverul clasic FREE-ARENA pentru jucatori care vor runde curate, harti cunoscute si o comunitate romaneasca activa.",
        statusLabel: "Status live in hub",
      },
      en: {
        eyebrow: "Counter-Strike 1.6 server",
        name: "CS 1.6 Classic",
        description:
          "The classic FREE-ARENA server for EU players who want clean rounds, familiar maps and an English-friendly community rooted in Romania.",
        statusLabel: "Live status in hub",
      },
    },
    info: {
      ro: {
        status: "Verificat live in pagina /servers",
        players: "Afisat live in hub-ul de servere",
        map: "Afisata live in hub-ul de servere",
        latency: "Masurata in timpul interogarii live",
      },
      en: {
        status: "Checked live on the /servers page",
        players: "Shown live in the server hub",
        map: "Shown live in the server hub",
        latency: "Measured during live query",
      },
    },
    content: {
      ro: {
        heading: "CS 1.6 Classic pe FREE-ARENA România",
        intro:
          "CS 1.6 Classic este pagina dedicata serverului principal FREE-ARENA pentru jucatorii care cauta Counter-Strike 1.6 autentic in România.",
        paragraphs: [
          "Serverul FREE-ARENA CS 1.6 Classic pastreaza ritmul care a facut Counter-Strike 1.6 atat de iubit: runde rapide, dueluri simple de citit, economie de echipa si harti pe care comunitatea le cunoaste deja. Scopul paginii este sa ofere jucatorilor un punct clar, cu informatii despre IP, comunitate, reguli si directiile de suport.",
          "Gameplay-ul este gandit pentru jucatori care vor o experienta competitiva fara artificii inutile. FREE-ARENA pune accent pe meciuri curate, comunicare intre coechipieri si un cadru in care skill-ul real conteaza. Serverul poate fi folosit pentru sesiuni casual, dar ramane potrivit si pentru jucatori care vor sa-si testeze reflexele, aim-ul si disciplina pe harti clasice.",
          "Comunitatea este partea care tine serverul viu. Jucatorii pot intra pe Discord, TeamSpeak sau forum pentru suport, discutii, anunturi si raportari. Staff-ul activ ajuta la mentinerea regulilor, iar sistemele anti-cheat si verificarile administrative reduc comportamentele care strica experienta. Nu promitem perfectiune, dar construim un mediu in care problemele pot fi vazute si corectate.",
          "Pentru România, FREE-ARENA vrea sa fie mai mult decat un simplu IP intr-o lista de servere. Pagina CS 1.6 Classic pregateste terenul pentru evenimente, seri competitive, clasamente si continut editorial despre server. In fazele urmatoare, aceasta structura poate primi design cinematic, statistici live mai vizibile si module dedicate pentru ranking si progres.",
          "Daca vrei Counter-Strike 1.6 cu identitate clara, comunitate activa, suport rapid si o baza tehnica stabila, CS 1.6 Classic este punctul de start. Foloseste butoanele de mai sus pentru conectare, Discord sau TeamSpeak si revino pe pagina pentru actualizari legate de harti, evenimente si imbunatatiri.",
        ],
      },
      en: {
        heading: "CS 1.6 Classic on FREE-ARENA Romania",
        intro:
          "CS 1.6 Classic is the dedicated page for the main FREE-ARENA Counter-Strike 1.6 server for Romania and EU players.",
        paragraphs: [
          "FREE-ARENA CS 1.6 Classic keeps the rhythm that made Counter-Strike 1.6 last for so many years: fast rounds, readable duels, team economy and maps that the community already understands. This page gives players a clear destination for the server, with information about the address, support channels, rules and the community around it.",
          "The gameplay is built for players who want competitive Counter-Strike without unnecessary noise. FREE-ARENA focuses on clean matches, team communication and an environment where real skill matters. The server can be used for casual sessions, but it also fits players who want to test aim, positioning, reactions and discipline on classic maps.",
          "The community is what keeps the server alive. Players can join Discord, TeamSpeak or the forum for support, announcements, conversations and reports. Active staff helps enforce rules, while anti-cheat systems and administrative checks reduce behavior that hurts the match experience. We do not present the server as magic; we build a place where issues can be seen and handled.",
          "For EU players, FREE-ARENA aims to be more than another IP in a server list. The CS 1.6 Classic page prepares the foundation for events, competitive evenings, rankings and editorial content around the server. Later phases can add a stronger cinematic design, richer live stats and modules focused on player progress.",
          "If you want Counter-Strike 1.6 with a clear identity, active community, fast support and a stable technical base, CS 1.6 Classic is the starting point. Use the actions above to connect, join Discord or open TeamSpeak, and come back for updates about maps, events and improvements.",
        ],
      },
    },
    features: { ro: roFeatures, en: enFeatures },
    faq: {
      ro: [
        {
          question: "Cum intru pe serverul CS 1.6 Classic FREE-ARENA?",
          answer: "Foloseste IP-ul 217.156.22.74:27015 sau butonul Join Server de pe pagina, daca ai Counter-Strike 1.6 instalat.",
        },
        {
          question: "Serverul este pentru Romania?",
          answer: "Da. FREE-ARENA este construit in jurul comunitatii din România, dar jucatorii internationali sunt bineveniti daca respecta regulile.",
        },
        {
          question: "Exista anti-cheat pe CS 1.6 Classic?",
          answer: "Da, serverul este pregatit cu reguli, verificari si masuri anti-cheat pentru a proteja gameplay-ul corect.",
        },
        {
          question: "Unde pot raporta o problema?",
          answer: "Poti folosi Discord, TeamSpeak sau forumul FREE-ARENA pentru raportari, suport si intrebari despre server.",
        },
        {
          question: "Vor exista evenimente pe server?",
          answer: "Structura FREE-ARENA este pregatita pentru evenimente, seri competitive si activitati de comunitate.",
        },
        {
          question: "Ce harti se potrivesc pentru CS 1.6 Classic?",
          answer: "Rotatia clasica poate include harti precum de_dust2, de_inferno, de_nuke si de_train, pentru runde clare, joc de echipa si dueluri cunoscute de comunitatea romaneasca.",
        },
        {
          question: "Pot adauga serverul CS 1.6 Classic la Favorites?",
          answer: "Da. Adauga 217.156.22.74:27015 in Favorites sau foloseste comanda connect 217.156.22.74:27015 in consola jocului.",
        },
        {
          question: "VIP-ul strica echilibrul pe server?",
          answer: "Beneficiile VIP trebuie pastrate controlat. Scopul este sustinerea comunitatii si identitatea jucatorilor activi, nu transformarea rundelor intr-un avantaj nedrept.",
        },
        {
          question: "Unde gasesc regulile serverului?",
          answer: "Regulile sunt rezumate pe pagina serverului, iar pentru detalii, reclamatii sau contestatii poti folosi Discord, TeamSpeak sau forumul FREE-ARENA.",
        },
        {
          question: "Care este pagina oficiala pentru CS 1.6 Classic?",
          answer: "Pagina oficiala pentru acest server este /server/cs16-classic, iar linkurile vechi duc catre aceasta pagina pentru ca jucatorii sa ajunga direct la informatia corecta.",
        },
      ],
      en: [
        {
          question: "How do I join the FREE-ARENA CS 1.6 Classic server?",
          answer: "Use 217.156.22.74:27015 or the Join Server button on this page if Counter-Strike 1.6 is installed.",
        },
        {
          question: "Is this a Romanian server?",
          answer: "Yes. FREE-ARENA is built around the Romanian community, while international players are welcome if they follow the rules.",
        },
        {
          question: "Does CS 1.6 Classic have anti-cheat?",
          answer: "Yes, the server is prepared with rules, checks and anti-cheat measures to protect fair gameplay.",
        },
        {
          question: "Where can I report an issue?",
          answer: "Use FREE-ARENA Discord, TeamSpeak or the forum for reports, support and server questions.",
        },
        {
          question: "Will there be events on this server?",
          answer: "The FREE-ARENA structure is ready for events, competitive nights and community activities.",
        },
      ],
    },
  },
  respawn: {
    slug: "respawn",
    publicServerSlug: "respawn",
    gameName: "Counter-Strike 1.6 Respawn",
    genres: ["FPS", "Respawn", "Competitive"],
    platforms: ["PC", "Steam"],
    seo: {
      ro: {
        title: "Server Respawn CS 1.6 FREE-ARENA România",
        description:
          "Server FREE-ARENA Respawn România pentru CS 1.6: actiune rapida, staff activ, anti-cheat, rankings, evenimente si suport comunitar.",
        imageAlt: "FREE-ARENA Respawn CS 1.6 România",
      },
      en: {
        title: "Respawn CS 1.6 FREE-ARENA Europe Server",
        description:
          "FREE-ARENA Respawn Europe for CS 1.6: fast action, warm-up, active staff, anti-cheat, rankings, community support and quick practice sessions.",
        imageAlt: "FREE-ARENA Respawn CS 1.6 Europe",
      },
    },
    hero: {
      ro: {
        eyebrow: "Server CS 1.6 Respawn",
        name: "Respawn",
        description:
          "Server FREE-ARENA pentru jucatori care vor ritm rapid, reintrare imediata si multe dueluri intr-o sesiune scurta.",
        statusLabel: "Status live in hub",
      },
      en: {
        eyebrow: "CS 1.6 Respawn server",
        name: "Respawn",
        description:
          "The FREE-ARENA server for EU players who want fast pacing, instant re-entry and many duels in a short session.",
        statusLabel: "Live status in hub",
      },
    },
    info: {
      ro: {
        status: "Verificat live in pagina /servers",
        players: "Afisat live in hub-ul de servere",
        map: "Afisata live in hub-ul de servere",
        latency: "Masurata in timpul interogarii live",
      },
      en: {
        status: "Checked live on the /servers page",
        players: "Shown live in the server hub",
        map: "Shown live in the server hub",
        latency: "Measured during live query",
      },
    },
    content: {
      ro: {
        heading: "Respawn rapid pentru comunitatea FREE-ARENA",
        intro:
          "Respawn este pagina dedicata serverului FREE-ARENA pentru jucatori care vor actiune continua in Counter-Strike 1.6.",
        paragraphs: [
          "Serverul FREE-ARENA Respawn este construit pentru jucatori care nu vor sa astepte mult intre dueluri. Formatul respawn schimba energia unei sesiuni de Counter-Strike 1.6: revii rapid, incerci un alt unghi, ajustezi aim-ul si strangi mult mai multe situatii de joc intr-un timp scurt. Este potrivit pentru incalzire, antrenament si sesiuni rapide dupa o zi lunga.",
          "Gameplay-ul pune accent pe miscare, reflexe si adaptare. Spre deosebire de un server clasic, unde fiecare runda are pauze naturale, Respawn te tine conectat constant la actiune. Asta il face bun pentru jucatorii care vor sa exerseze spray control, pozitii, prefire si reactii. FREE-ARENA vrea ca acest ritm sa ramana placut, nu haotic, prin reguli clare si supraveghere.",
          "Comunitatea din România are nevoie de servere unde jucatorii pot intra repede si pot simti ca timpul lor este respectat. Respawn vine cu aceeasi baza FREE-ARENA: suport prin Discord, TeamSpeak si forum, staff activ, anti-cheat si spatiu pentru evenimente. Cand apar probleme, jucatorii au canale clare prin care pot semnala comportamente nepotrivite sau buguri.",
          "Pagina Respawn pregateste serverul pentru extinderi ulterioare. In fazele urmatoare putem adauga statistici vizuale, leaderboard-uri dedicate, highlight-uri din evenimente si un design cinematic care sa puna energia modului respawn in prim-plan. Fundatia de acum separa continutul, datele si componentele pentru upgrade rapid.",
          "Daca vrei un server CS 1.6 in care sa intri direct in actiune, Respawn este alegerea naturala. Conecteaza-te, intra pe Discord sau foloseste TeamSpeak pentru echipa si suport. Serverul este parte din ecosistemul FREE-ARENA, alaturi de CS 1.6 Classic, CS2 si proiectul Global.",
        ],
      },
      en: {
        heading: "Fast Respawn for the FREE-ARENA community",
        intro:
          "Respawn is the dedicated FREE-ARENA page for EU players who want continuous Counter-Strike 1.6 action.",
        paragraphs: [
          "FREE-ARENA Respawn is built for players who do not want to wait long between duels. The respawn format changes the energy of a Counter-Strike 1.6 session: you return quickly, try another angle, adjust aim and collect many more situations in a short amount of time. It works well for warm-up, practice and short gaming sessions.",
          "The gameplay focuses on movement, reaction and adaptation. Unlike a classic server, where each round has natural pauses, Respawn keeps you close to the action. That makes it useful for players who want to train spray control, positioning, prefire and reactions. FREE-ARENA wants that pace to stay enjoyable, not chaotic, with clear rules and active oversight.",
          "EU players need servers where they can join quickly and feel that their time is respected. Respawn uses the same FREE-ARENA base: Discord, TeamSpeak and forum support, active staff, anti-cheat and room for events. When issues appear, players have clear channels for reporting bad behavior or bugs.",
          "The Respawn page prepares the server for later expansion. Future phases can add visual stats, dedicated leaderboards, event highlights and a cinematic design that brings the energy of respawn gameplay forward. The current foundation separates content, data and components so upgrades can move quickly.",
          "If you want a CS 1.6 server where you jump straight into the action, Respawn is the natural choice. Connect to the server, join Discord or use TeamSpeak for team voice and support. It is part of the FREE-ARENA ecosystem together with CS 1.6 Classic, CS2 and the Global project.",
        ],
      },
    },
    features: { ro: roFeatures, en: enFeatures },
    faq: {
      ro: [
        {
          question: "Ce este serverul FREE-ARENA Respawn?",
          answer: "Este un server CS 1.6 cu reintrare rapida in joc, potrivit pentru actiune continua, antrenament si dueluri dese.",
        },
        {
          question: "Care este IP-ul serverului Respawn?",
          answer: "Adresa serverului este 51.38.97.243:27015.",
        },
        {
          question: "Respawn are staff activ?",
          answer: "Da, serverul face parte din reteaua FREE-ARENA si este sustinut de staff, reguli si canale de raportare.",
        },
        {
          question: "Pot folosi Respawn pentru warm-up?",
          answer: "Da. Ritmul rapid il face potrivit pentru aim, reflexe, spray control si incalzire inainte de meciuri.",
        },
        {
          question: "Unde gasesc comunitatea Respawn?",
          answer: "Comunitatea este disponibila pe Discord, TeamSpeak si forumul FREE-ARENA.",
        },
        {
          question: "Respawn este bun pentru warm-up?",
          answer: "Da. Modul respawn este potrivit pentru incalzire, reflex, spray control, prefire si repetarea duelurilor fara asteptarea finalului de runda.",
        },
        {
          question: "Ce harti merg bine pe Respawn?",
          answer: "Respawn functioneaza bine pe harti cu contact rapid precum de_dust2, de_inferno, aim_map, aim_headshot sau harti fun folosite controlat pentru varietate.",
        },
        {
          question: "Cum raportez camp excesiv sau spawn abuse?",
          answer: "Trimite raportul pe Discord, TeamSpeak sau forum cu nick, ora, harta si descrierea situatiei, astfel incat staff-ul sa poata verifica rapid.",
        },
        {
          question: "Serverul Respawn are legatura cu CS 1.6 Classic?",
          answer: "Da. Respawn face parte din ecosistemul FREE-ARENA alaturi de CS 1.6 Classic, CS2, Discord, TeamSpeak si hub-ul de servere.",
        },
        {
          question: "Pot folosi aceeasi comunitate pentru suport?",
          answer: "Da. Canalele FREE-ARENA sunt comune pentru suport, anunturi, raportari si propuneri legate de toate serverele.",
        },
      ],
      en: [
        {
          question: "What is the FREE-ARENA Respawn server?",
          answer: "It is a CS 1.6 server with quick re-entry into the game, built for continuous action, practice and frequent duels.",
        },
        {
          question: "What is the Respawn server IP?",
          answer: "The server address is 51.38.97.243:27015.",
        },
        {
          question: "Does Respawn have active staff?",
          answer: "Yes. The server is part of the FREE-ARENA network and is supported by staff, rules and reporting channels.",
        },
        {
          question: "Can I use Respawn for warm-up?",
          answer: "Yes. The fast pace makes it useful for aim, reactions, spray control and warm-up before matches.",
        },
        {
          question: "Where can I find the Respawn community?",
          answer: "The community is available through FREE-ARENA Discord, TeamSpeak and forum.",
        },
      ],
    },
  },
  cs2: {
    slug: "cs2",
    publicServerSlug: "cs2",
    gameName: "Counter-Strike 2",
    genres: ["FPS", "Competitive", "Tactical"],
    platforms: ["PC", "Steam"],
    seo: {
      ro: {
        title: "CS2 FREE-ARENA România | Server Competitiv",
        description:
          "Server FREE-ARENA CS2 România pentru jucatori competitivi: comunitate activa, staff, anti-cheat, events, rankings si suport.",
        imageAlt: "FREE-ARENA CS2 România server",
      },
      en: {
        title: "CS2 FREE-ARENA Europe | Competitive Server",
        description:
          "FREE-ARENA CS2 Europe server for competitive players: direct IP, active community, staff, anti-cheat, events, rankings and support.",
        imageAlt: "FREE-ARENA CS2 Europe server",
      },
    },
    hero: {
      ro: {
        eyebrow: "Server Counter-Strike 2",
        name: "CS2",
        description:
          "Serverul FREE-ARENA pentru noua generatie Counter-Strike, pregatit pentru meciuri competitive si comunitate moderna.",
        statusLabel: "Status live in hub",
      },
      en: {
        eyebrow: "Counter-Strike 2 server",
        name: "CS2",
        description:
          "The FREE-ARENA server for the new Counter-Strike generation, prepared for EU competitive matches and a modern community.",
        statusLabel: "Live status in hub",
      },
    },
    info: {
      ro: {
        status: "Verificat live in pagina /servers",
        players: "Afisat live in hub-ul de servere",
        map: "Afisata live in hub-ul de servere",
        latency: "Masurata in timpul interogarii live",
      },
      en: {
        status: "Checked live on the /servers page",
        players: "Shown live in the server hub",
        map: "Shown live in the server hub",
        latency: "Measured during live query",
      },
    },
    content: {
      ro: {
        heading: "CS2 competitiv in ecosistemul FREE-ARENA",
        intro:
          "CS2 este pagina dedicata serverului FREE-ARENA pentru Counter-Strike 2 si pentru comunitatea care vrea sa creasca o scena moderna in România.",
        paragraphs: [
          "Serverul FREE-ARENA CS2 este gandit ca o punte intre comunitatea clasica si generatia noua de Counter-Strike. Jucatorii care vin din CS 1.6 gasesc aici o directie moderna, iar cei care joaca deja CS2 au un punct local pentru meciuri, comunicare si progres. Pagina exista pentru ca serverul sa aiba o identitate clara, nu doar o mentiune intr-un meniu.",
          "Gameplay-ul CS2 cere disciplina, sunet bun, comunicare si decizii rapide. FREE-ARENA pregateste serverul pentru sesiuni competitive, dar pastreaza accesibilitatea unei comunitati deschise. Scopul este ca jucatorii sa poata intra, sa inteleaga unde gasesc suport, sa vada legaturile cu Discord si TeamSpeak si sa revina pentru evenimente sau anunturi.",
          "România are multi jucatori care cauta servere stabile, staff vizibil si reguli clare. FREE-ARENA pune accent pe anti-cheat, suport rapid si administrare responsabila. Nu incarcam pagina cu promisiuni exagerate; descriem o fundatie pe care o putem imbunatati constant prin feedback, raportari si update-uri tehnice.",
          "CS2 este si un candidat natural pentru faza cinematica urmatoare. Structura actuala permite adaugarea de elemente vizuale puternice, statistici live, clipuri de highlight, leaderboard-uri si preview-uri pentru eventuri. Continutul de acum explica serverul in limbaj natural, cu detalii relevante pentru Counter-Strike 2, competitiv, comunitate si Romania.",
          "Daca vrei sa urmaresti directia moderna FREE-ARENA, pagina CS2 este locul potrivit. Foloseste linkurile interne catre Discord, TeamSpeak si lista de servere, iar cand intri pe server joaca responsabil, comunica si ajuta comunitatea sa ramana curata si competitiva.",
        ],
      },
      en: {
        heading: "Competitive CS2 in the FREE-ARENA ecosystem",
        intro:
          "CS2 is the dedicated FREE-ARENA page for Counter-Strike 2 and the community building a modern scene for Romania and EU players.",
        paragraphs: [
          "FREE-ARENA CS2 is designed as a bridge between the classic community and the new Counter-Strike generation. Players coming from CS 1.6 find a modern direction here, while players already focused on CS2 get a local point for matches, communication and progress. This page gives the server a clear identity, not just a mention inside a menu.",
          "CS2 gameplay rewards discipline, sound, communication and quick decisions. FREE-ARENA prepares the server for competitive sessions while keeping the accessibility of an open community. The goal is simple: players should know how to join, where to find support, how Discord and TeamSpeak connect to the server, and where to return for events or announcements.",
          "EU players look for stable servers, visible staff and clear rules. FREE-ARENA focuses on anti-cheat, fast support and responsible administration. The page avoids exaggerated promises and describes a foundation that can improve through feedback, reports and technical updates.",
          "CS2 is also a natural candidate for the next cinematic phase. The current structure can receive stronger visual systems, live statistics, highlight clips, leaderboards and event previews. The content explains the server in natural language with relevant details around Counter-Strike 2, competition, community and Romania.",
          "If you want to follow the modern FREE-ARENA direction, the CS2 page is the right place. Use the internal links to Discord, TeamSpeak and the server list, and when you join the server, play responsibly, communicate and help the community stay clean and competitive.",
        ],
      },
    },
    features: { ro: roFeatures, en: enFeatures },
    faq: {
      ro: [
        {
          question: "Ce este serverul FREE-ARENA CS2?",
          answer: "Este serverul FREE-ARENA dedicat Counter-Strike 2, creat pentru comunitate, competitie si suport modern.",
        },
        {
          question: "Care este adresa serverului CS2?",
          answer: "Adresa configurata este 135.125.208.88:27015.",
        },
        {
          question: "CS2 are legatura cu Discord si TeamSpeak?",
          answer: "Da. Pagina include linkuri directe spre Discord si TeamSpeak pentru voce, suport si comunitate.",
        },
        {
          question: "Serverul CS2 este competitiv?",
          answer: "Da, serverul este pozitionat pentru jucatori competitivi, dar ramane accesibil comunitatii.",
        },
        {
          question: "Vor exista rankings pentru CS2?",
          answer: "Structura FREE-ARENA este pregatita pentru clasamente si progres competitiv in fazele urmatoare.",
        },
        {
          question: "Cum ma conectez daca serverul CS2 nu apare in browser?",
          answer: "Foloseste IP-ul direct 135.125.208.88:27015 in consola sau adauga serverul la favorite. Browserul CS2 poate afisa uneori serverele cu intarziere dupa update-uri.",
        },
        {
          question: "Ce harti sunt potrivite pentru serverul CS2?",
          answer: "Rotatia poate include Mirage, Inferno, Nuke, Ancient si Anubis, in functie de directia comunitatii si de feedback-ul jucatorilor activi.",
        },
        {
          question: "CS2 este pentru jucatori competitivi sau casual?",
          answer: "Serverul este pozitionat competitiv, dar ramane accesibil. Jucatorii noi sunt bineveniti daca respecta regulile, comunicarea si fair-play-ul.",
        },
        {
          question: "VIP-ul pe CS2 ofera avantaje agresive?",
          answer: "VIP-ul este gandit ca sustinere si identitate in comunitate. Beneficiile trebuie calibrate astfel incat jocul competitiv sa ramana corect.",
        },
        {
          question: "De ce are CS2 pagina dedicata pe FREE-ARENA?",
          answer: "CS2 este directia moderna a comunitatii si are nevoie de continut propriu: conectare, harti, reguli, suport, evenimente si informatii separate de CS 1.6.",
        },
      ],
      en: [
        {
          question: "What is the FREE-ARENA CS2 server?",
          answer: "It is the FREE-ARENA server dedicated to Counter-Strike 2, created for community, competition and modern support.",
        },
        {
          question: "What is the CS2 server address?",
          answer: "The configured address is 135.125.208.88:27015.",
        },
        {
          question: "Is CS2 connected to Discord and TeamSpeak?",
          answer: "Yes. This page links directly to Discord and TeamSpeak for voice, support and community activity.",
        },
        {
          question: "Is the CS2 server competitive?",
          answer: "Yes, the server is positioned for competitive players while staying accessible to the community.",
        },
        {
          question: "Will CS2 have rankings?",
          answer: "The FREE-ARENA structure is prepared for rankings and competitive progress in later phases.",
        },
      ],
    },
  },
  fivem: {
    slug: "fivem",
    publicServerSlug: "fivem",
    gameName: "FiveM / GTA V",
    genres: ["Roleplay", "Open World", "Multiplayer"],
    platforms: ["PC", "FiveM", "GTA V"],
    seo: {
      ro: {
        title: "FiveM FREE-ARENA Romania | GTA V Roleplay Coming Soon",
        description:
          "Pagina dedicata FiveM FREE-ARENA: GTA V roleplay Romania, Discord, reguli, whitelist, staff, update-uri si lansare coming soon.",
        imageAlt: "FREE-ARENA FiveM GTA V Roleplay Romania",
      },
      en: {
        title: "FREE-ARENA FiveM Europe | GTA V Roleplay Coming Soon",
        description:
          "Dedicated FREE-ARENA FiveM page for GTA V roleplay: Discord, rules, whitelist, staff, updates and coming soon launch information.",
        imageAlt: "FREE-ARENA FiveM GTA V Roleplay Europe",
      },
    },
    hero: {
      ro: {
        eyebrow: "Server FiveM / GTA V",
        name: "FiveM",
        description:
          "Zona FREE-ARENA pentru viitorul server FiveM: roleplay, comunitate, reguli, whitelist si anunturi intr-o pagina dedicata.",
        statusLabel: "Coming soon",
      },
      en: {
        eyebrow: "FiveM / GTA V server",
        name: "FiveM",
        description:
          "The FREE-ARENA area for the future FiveM server: roleplay, community, rules, whitelist and updates in one dedicated page.",
        statusLabel: "Coming soon",
      },
    },
    info: {
      ro: {
        status: "Coming soon",
        players: "Nu este deschis inca",
        map: "Romania RP / oras in pregatire",
        latency: "Va fi masurata dupa lansare",
      },
      en: {
        status: "Coming soon",
        players: "Not open yet",
        map: "Romania RP / city in preparation",
        latency: "To be measured after launch",
      },
    },
    content: {
      ro: {
        heading: "FiveM FREE-ARENA pentru GTA V Roleplay",
        intro:
          "FiveM este pagina dedicata noului proiect FREE-ARENA pentru jucatori GTA V care vor roleplay, comunitate si reguli clare.",
        paragraphs: [
          "Serverul FiveM este pregatit ca urmatoarea directie FREE-ARENA, separata clar de serverele Counter-Strike. Pagina ramane publica din timp pentru ca jucatorii sa stie unde vor aparea informatiile despre whitelist, reguli, Discord, staff, update-uri si data lansarii.",
          "In faza curenta nu afisam statistici false si nu promitem un oras live daca serverul nu este deschis. Cardul ramane marcat corect ca coming soon, iar adresa publica poate fi actualizata imediat cand infrastructura FiveM este finalizata.",
          "Directia recomandata este roleplay curat, cu regulament usor de inteles, staff matur si canale de suport vizibile. Comunitatea poate urmari Discord-ul FREE-ARENA pentru anunturi, cereri staff, discutii despre economie, joburi, factiuni, politie, EMS si reguli de conduita.",
          "Aceasta pagina poate deveni centrul pentru tot ce tine de FiveM: ghid de conectare, whitelist, lista de joburi, reguli RP, changelog, anunturi de wipe, evenimente, clipuri, screenshot-uri si intrebari frecvente. URL-ul ramane stabil, deci putem construi autoritate SEO fara sa schimbam traseul jucatorilor.",
          "Cand serverul devine live, actualizam aici IP-ul final, statusul, butonul de conectare, hartile/zonele importante si orice cerinta de whitelist. Pana atunci, pagina pregateste comunitatea si leaga FiveM de Discord, forum, staff si restul ecosistemului FREE-ARENA.",
        ],
      },
      en: {
        heading: "FREE-ARENA FiveM for GTA V Roleplay",
        intro:
          "FiveM is the dedicated FREE-ARENA page for GTA V players who want roleplay, community and clear rules.",
        paragraphs: [
          "The FiveM server is prepared as the next FREE-ARENA direction, clearly separated from the Counter-Strike servers. This page is public early so players know where whitelist, rules, Discord, staff, updates and launch information will appear.",
          "At this stage we do not show fake statistics and we do not claim the city is live before the server opens. The card is correctly marked as coming soon, while the public address can be updated as soon as the FiveM infrastructure is finalized.",
          "The recommended direction is clean roleplay, easy-to-read rules, mature staff and visible support channels. Players can follow FREE-ARENA Discord for announcements, staff applications, economy ideas, jobs, factions, police, EMS and conduct rules.",
          "This page can become the center for everything FiveM: connection guide, whitelist, job list, RP rules, changelog, wipe announcements, events, clips, screenshots and FAQ. The URL stays stable, so SEO authority can build without changing the player path.",
          "When the server goes live, we will update the final IP, status, connect action, important map areas and whitelist requirements here. Until then, the page prepares the community and connects FiveM with Discord, forum, staff and the wider FREE-ARENA ecosystem.",
        ],
      },
    },
    features: { ro: roFiveMFeatures, en: enFiveMFeatures },
    faq: {
      ro: [
        {
          question: "FREE-ARENA are server FiveM?",
          answer: "FiveM este planificat si are pagina dedicata. Serverul este marcat corect ca coming soon pana la lansarea reala.",
        },
        {
          question: "Unde vor aparea regulile FiveM?",
          answer: "Regulile, whitelist-ul, cerintele de conectare si update-urile vor fi publicate pe aceasta pagina si anuntate pe Discord.",
        },
        {
          question: "Va exista whitelist pentru FiveM?",
          answer: "Directia recomandata este whitelist controlat, pentru roleplay mai curat si comunitate mai usor de moderat.",
        },
        {
          question: "Pot aplica pentru staff FiveM?",
          answer: "Da. Poti urmari pagina de recrutare staff si Discord-ul FREE-ARENA pentru roluri dedicate FiveM cand proiectul intra in faza activa.",
        },
        {
          question: "Care este adresa serverului FiveM?",
          answer: "Adresa rezervata este fivem.free-arena.ro:30120, dar conectarea publica va fi confirmata cand serverul este pregatit live.",
        },
      ],
      en: [
        {
          question: "Does FREE-ARENA have a FiveM server?",
          answer: "FiveM is planned and has a dedicated page. The server is correctly marked as coming soon until the real launch.",
        },
        {
          question: "Where will FiveM rules be published?",
          answer: "Rules, whitelist, connection requirements and updates will be published on this page and announced on Discord.",
        },
        {
          question: "Will FiveM use whitelist?",
          answer: "The recommended direction is controlled whitelist for cleaner roleplay and easier moderation.",
        },
        {
          question: "Can I apply for FiveM staff?",
          answer: "Yes. Follow the staff recruitment page and FREE-ARENA Discord for FiveM roles when the project becomes active.",
        },
        {
          question: "What is the FiveM server address?",
          answer: "The reserved address is fivem.free-arena.ro:30120, but public connection will be confirmed when the server is ready live.",
        },
      ],
    },
  },
  global: {
    slug: "global",
    publicServerSlug: "global",
    gameName: "FREE-ARENA Global",
    genres: ["Gaming Community", "Multiplayer", "Events"],
    platforms: ["PC"],
    seo: {
      ro: {
        title: "FREE-ARENA Global | Comunitate Gaming RO",
        description:
          "FREE-ARENA Global este proiectul coming soon pentru comunitate gaming, evenimente, rankings si servere conectate in Romania.",
        imageAlt: "FREE-ARENA Global gaming community",
      },
      en: {
        title: "FREE-ARENA Global | Romania Gaming Hub",
        description:
          "FREE-ARENA Global is the coming soon project for gaming community, events, rankings, connected servers, and long-term growth in Romania.",
        imageAlt: "FREE-ARENA Global gaming community",
      },
    },
    hero: {
      ro: {
        eyebrow: "Proiect coming soon",
        name: "Global",
        description:
          "Zona FREE-ARENA pregatita pentru extindere, evenimente cross-server, comunitate si directii competitive noi.",
        statusLabel: "Coming soon",
      },
      en: {
        eyebrow: "Coming soon project",
        name: "Global",
        description:
          "The FREE-ARENA area prepared for expansion, cross-server events, community systems and new competitive directions.",
        statusLabel: "Coming soon",
      },
    },
    info: {
      ro: {
        status: "Coming soon",
        players: "Nu este deschis inca",
        map: "Va fi anuntata",
        latency: "Va fi masurata dupa lansare",
      },
      en: {
        status: "Coming soon",
        players: "Not open yet",
        map: "To be announced",
        latency: "To be measured after launch",
      },
    },
    content: {
      ro: {
        heading: "FREE-ARENA Global ca baza pentru extindere",
        intro:
          "Global este pagina dedicata proiectului FREE-ARENA aflat in pregatire, gandit pentru conectarea comunitatii, evenimentelor si serverelor.",
        paragraphs: [
          "FREE-ARENA Global este o pagina coming soon, dar nu este un placeholder gol. Ea explica directia in care vrem sa ducem comunitatea: servere conectate, evenimente care pot traversa mai multe jocuri, rankings mai vizibile si un punct central pentru jucatorii care vor sa ramana aproape de ecosistem. Pagina ofera context real despre proiect inainte de lansarea completa.",
          "Ideea Global porneste de la faptul ca o comunitate gaming nu traieste doar printr-un singur server. Jucatorii intra pentru CS 1.6, Respawn sau CS2, dar raman cand gasesc oameni, staff activ, suport si activitati care au sens. Global va putea lega aceste experiente intr-o zona mai ampla, pregatita pentru competitii, anunturi si evolutie pe termen lung.",
          "In România, multe comunitati dispar pentru ca nu au structura. FREE-ARENA incearca sa construiasca invers: pagini clare, continut util, rute stabile si componente care pot fi imbunatatite fara sa fie rescrise. Global este partea care lasa loc pentru crestere, fara sa inventeze date false despre jucatori, harti sau status live.",
          "Pe partea tehnica, aceasta pagina este pregatita pentru design cinematic cyberpunk in faza urmatoare. Poate primi un hero mai spectaculos, animatii, cards pentru serverele conectate, grafice, timeline de evenimente si module pentru progresul contului. Continutul actual ramane curat si util, astfel incat upgrade-ul vizual sa nu rupa experienta jucatorilor.",
          "Pana la lansare, foloseste linkurile catre serverele active, Discord si TeamSpeak. Acolo se formeaza comunitatea care va sustine proiectul Global. Cand directia finala este gata, pagina poate deveni centrul pentru evenimente FREE-ARENA, clasamente, competitii si update-uri importante.",
        ],
      },
      en: {
        heading: "FREE-ARENA Global as an expansion foundation",
        intro:
          "Global is the dedicated page for the FREE-ARENA project in preparation, built to connect community, events and servers.",
        paragraphs: [
          "FREE-ARENA Global is a coming soon page, but it is not an empty placeholder. It explains where the community is going: connected servers, events that can cross multiple games, more visible rankings and a central point for players who want to stay close to the ecosystem. The page gives real context about the project before the complete launch.",
          "The Global idea starts from a simple truth: a gaming community does not live through one server only. Players may join for CS 1.6, Respawn or CS2, but they stay when they find people, active staff, support and activities that matter. Global can connect those experiences into a wider area prepared for competitions, announcements and long-term growth.",
          "In Romania, many communities disappear because they lack structure. FREE-ARENA is trying to build in the opposite direction: clear pages, useful content, stable routes and components that can improve without being rewritten. Global leaves room for growth without inventing false data about players, maps or live status.",
          "Technically, this page is ready for the next cyberpunk cinematic phase. It can receive a stronger hero, animation, cards for connected servers, charts, event timelines and account progress modules. The current content stays clean and useful, so the visual upgrade will not break the player experience.",
          "Until launch, use the links to the active servers, Discord and TeamSpeak. That is where the community that will support Global is being formed. When the final direction is ready, this page can become the center for FREE-ARENA events, rankings, competitions and important updates.",
        ],
      },
    },
    features: { ro: roFeatures, en: enFeatures },
    faq: {
      ro: [
        {
          question: "Ce este FREE-ARENA Global?",
          answer: "Este proiectul coming soon pentru extinderea comunitatii FREE-ARENA, cu evenimente, rankings si servere conectate.",
        },
        {
          question: "Serverul Global este deja deschis?",
          answer: "Nu. Pagina este pregatita pentru comunicare, dar proiectul este marcat corect ca coming soon.",
        },
        {
          question: "Global va inlocui serverele existente?",
          answer: "Nu. Global este gandit ca o zona de conectare intre serverele existente, nu ca un inlocuitor pentru CS 1.6, Respawn sau CS2.",
        },
        {
          question: "De ce exista pagina inainte de lansare?",
          answer: "Pentru transparenta si pregatirea comunitatii. Pagina explica directia fara sa publice date false.",
        },
        {
          question: "Unde pot urmari noutatile despre Global?",
          answer: "Urmareste Discord, TeamSpeak, forumul si paginile serverelor FREE-ARENA pentru anunturi.",
        },
      ],
      en: [
        {
          question: "What is FREE-ARENA Global?",
          answer: "It is the coming soon project for expanding the FREE-ARENA community with events, rankings and connected servers.",
        },
        {
          question: "Is the Global server already open?",
          answer: "No. The page is prepared for communication, but the project is correctly marked as coming soon.",
        },
        {
          question: "Will Global replace the existing servers?",
          answer: "No. Global is designed as a connection layer between existing servers, not a replacement for CS 1.6, Respawn or CS2.",
        },
        {
          question: "Why does the page exist before launch?",
          answer: "For transparency and community preparation. It explains the direction without publishing false data.",
        },
        {
          question: "Where can I follow Global updates?",
          answer: "Follow Discord, TeamSpeak, the forum and FREE-ARENA server pages for announcements.",
        },
      ],
    },
  },
};
