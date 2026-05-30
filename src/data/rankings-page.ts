import type { Locale } from "@/i18n/routing";

export type RankingMetricKey = "players" | "kills" | "headshots" | "playtime";

export type RankingInfoBlock = {
  body: readonly string[];
  title: string;
};

export type RankingServerLink = {
  copy: string;
  href: string;
  title: string;
};

export type RankingsPageContent = {
  activityTitle: string;
  breadcrumb: {
    current: string;
    home: string;
  };
  description: string;
  eyebrow: string;
  headshotsTitle: string;
  heroBullets: readonly string[];
  h1: string;
  how: RankingInfoBlock;
  imageAlt: string;
  internalLinksTitle: string;
  killsTitle: string;
  metadataDescription: string;
  metadataTitle: string;
  playtimeTitle: string;
  serverLinks: readonly RankingServerLink[];
  topPlayersTitle: string;
  why: RankingInfoBlock;
};

export const rankingsPageContent: Record<Locale, RankingsPageContent> = {
  ro: {
    metadataTitle: "Clasament FREE-ARENA | Top jucatori CS 1.6 si CS2",
    metadataDescription:
      "Vezi clasamentul FREE-ARENA cu top jucatori, kill-uri, headshot-uri, timp jucat si activitate pe serverele CS 1.6, Respawn si CS2.",
    imageAlt: "Clasament FREE-ARENA cu top jucatori si statistici Counter-Strike",
    breadcrumb: {
      home: "Acasa",
      current: "Clasament",
    },
    eyebrow: "Rankings live",
    h1: "Clasament FREE-ARENA",
    description:
      "Clasamentul FREE-ARENA este pagina centrala pentru progresul jucatorilor, activitate si competitie. Aici vezi cine urca in top, cine domina la kill-uri, cine tine ritmul la headshot-uri si cine investeste cel mai mult timp pe serverele comunitatii. Datele sunt gandite ca un reper rapid pentru jucatori, admini si membri noi care vor sa inteleaga nivelul competitiv al comunitatii.",
    heroBullets: [
      "Top jucatori dupa XP si performanta generala.",
      "Liste clare pentru kill-uri, headshot-uri si timp jucat.",
      "Legaturi directe catre serverele unde poti intra imediat.",
    ],
    topPlayersTitle: "Top Players",
    killsTitle: "Top Kills",
    headshotsTitle: "Top Headshots",
    playtimeTitle: "Top Playtime",
    activityTitle: "Top Server Activity",
    how: {
      title: "Cum functioneaza clasamentul",
      body: [
        "Clasamentul foloseste statistici asociate activitatii reale din ecosistemul FREE-ARENA. Pentru fiecare jucator sunt urmarite valori precum XP, kill-uri, headshot-uri, timp jucat si eficienta in dueluri. Ordinea principala este orientata spre progres si activitate, nu doar spre un singur numar izolat. Asta ajuta comunitatea sa vada cine joaca constant, cine contribuie la ritmul serverelor si cine revine suficient de des incat sa conteze in top.",
        "Top Kills arata jucatorii care produc cel mai mult impact ofensiv. Top Headshots scoate in fata precizia si controlul armei. Top Playtime este important pentru comunitate, pentru ca un server puternic nu inseamna doar fraguri, ci si prezenta constanta. Cand aceste liste sunt citite impreuna, un jucator poate intelege mai bine unde sta: poate nu este primul la XP, dar poate fi foarte sus la timp jucat sau la headshot-uri.",
        "Datele pot fi actualizate periodic si pot afisa fallback-uri curate daca sursa live nu raspunde temporar. Pagina ramane utila pentru Google si pentru utilizatori deoarece explica transparent ce masoara clasamentul si cum se leaga de serverele active.",
        "Clasamentul nu este gandit ca o promisiune de status permanent. Este un instrument viu, util pentru motivatie si pentru decizii de comunitate: ce server atrage activitate, ce mod merita evenimente si ce tip de jucator revine cel mai des.",
      ],
    },
    why: {
      title: "De ce sa joci pe FREE-ARENA",
      body: [
        "FREE-ARENA este construit ca un ecosistem pentru jucatori care vor servere stabile, reguli clare si comunitate activa. Clasamentul adauga un motiv simplu de revenire: fiecare sesiune poate conta. Daca intri pe CS 1.6 Classic pentru joc echilibrat, pe Respawn pentru warm-up sau pe CS2 pentru directia moderna, progresul tau devine parte dintr-o imagine mai mare.",
        "Pentru jucatorii noi, pagina de rankings functioneaza ca o usa de intrare. Vezi nume active, intelegi ce servere sunt importante si ai linkuri directe catre paginile canonice. Pentru jucatorii vechi, pagina devine un punct de verificare: cine a urcat, cine a ramas constant, cine domina la precizie si cine tine comunitatea vie prin activitate.",
        "Pe termen lung, acest clasament poate sustine evenimente, provocari saptamanale, premii VIP, continut pentru Discord si topicuri pe forum. Fundatia corecta este importanta acum: URL stabil, canonical clar, sitemap curat si linkuri interne catre serverele care trebuie sa rankeze.",
      ],
    },
    internalLinksTitle: "Intra pe serverele FREE-ARENA",
    serverLinks: [
      {
        href: "/server/cs16-classic",
        title: "CS 1.6 Classic",
        copy: "Serverul clasic pentru runde echilibrate, harti cunoscute si progres competitiv.",
      },
      {
        href: "/server/respawn",
        title: "Respawn",
        copy: "Warm-up rapid, dueluri constante si un mod bun pentru antrenament zilnic.",
      },
      {
        href: "/server/cs2",
        title: "CS2",
        copy: "Directia moderna FREE-ARENA pentru jucatori competitivi si comunitate activa.",
      },
    ],
  },
  en: {
    metadataTitle: "FREE-ARENA Rankings | Top CS Players and Activity",
    metadataDescription:
      "View FREE-ARENA rankings with top players, kills, headshots, played time, and server activity for CS 1.6, Respawn, and CS2.",
    imageAlt: "FREE-ARENA rankings with Counter-Strike player statistics",
    breadcrumb: {
      home: "Home",
      current: "Rankings",
    },
    eyebrow: "Live rankings",
    h1: "FREE-ARENA Rankings",
    description:
      "FREE-ARENA Rankings is the central page for player progress, activity, and competition. It shows who is moving up, who leads in kills, who keeps precision high with headshots, and who spends the most time on the community servers. The page is built for players who want a quick competitive snapshot and for new visitors who need to understand where the active community lives.",
    heroBullets: [
      "Top players by XP and overall activity.",
      "Separate views for kills, headshots, and played time.",
      "Direct links to the active FREE-ARENA server pages.",
    ],
    topPlayersTitle: "Top Players",
    killsTitle: "Top Kills",
    headshotsTitle: "Top Headshots",
    playtimeTitle: "Top Playtime",
    activityTitle: "Server Activity",
    how: {
      title: "How rankings work",
      body: [
        "The rankings use statistics connected to real FREE-ARENA activity. Each player can be evaluated through XP, kills, headshots, played time, and duel efficiency. The main ranking focuses on progress and repeated activity instead of a single isolated number. This gives players and staff a better view of who is active, who contributes to server rhythm, and who returns often enough to matter in the leaderboard.",
        "Top Kills highlights offensive impact. Top Headshots rewards precision and weapon control. Top Playtime matters because a strong server is not built only by frag leaders; it is also built by players who keep showing up. Read together, these lists give a more complete view of performance. A player may not be first by XP, but can still stand out through accuracy, time, or consistency.",
        "The live module can update periodically and use clean fallback data if the external statistics source is temporarily unavailable. The page remains useful for users and search engines because the visible content explains what the ranking measures and connects those metrics to the active server pages.",
        "The rankings are not meant to promise permanent status. They are a live motivation layer and a practical community signal: which server attracts activity, which mode deserves events, and which type of player returns most consistently.",
      ],
    },
    why: {
      title: "Why play on FREE-ARENA",
      body: [
        "FREE-ARENA is built as an ecosystem for players who want stable servers, clear rules, and an active community. Rankings add a simple reason to return: every session can count. Whether you join CS 1.6 Classic for balanced rounds, Respawn for daily warm-up, or CS2 for the modern competitive direction, your progress becomes part of the larger community picture.",
        "For new players, this page works as an entry point. They can see active names, understand which servers matter, and move directly to the canonical server pages. For returning players, it becomes a check-in page: who moved up, who stayed consistent, who leads on precision, and who keeps the community active through time played.",
        "Over time, this rankings page can support weekly challenges, VIP rewards, Discord content, and forum topics. The foundation matters now: stable URL, clean canonical, sitemap inclusion, hreflang support, and internal links toward the server pages that should build search authority.",
      ],
    },
    internalLinksTitle: "Join FREE-ARENA servers",
    serverLinks: [
      {
        href: "/server/cs16-classic",
        title: "CS 1.6 Classic",
        copy: "The classic server for balanced rounds, familiar maps, and competitive progress.",
      },
      {
        href: "/server/respawn",
        title: "Respawn",
        copy: "Fast warm-up, repeated duels, and a strong mode for daily practice.",
      },
      {
        href: "/server/cs2",
        title: "CS2",
        copy: "The modern FREE-ARENA direction for competitive players and active community play.",
      },
    ],
  },
};
