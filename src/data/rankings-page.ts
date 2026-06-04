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
    metadataTitle: "Clasament FREE-ARENA | Top jucători CS 1.6 și CS2",
    metadataDescription:
      "Vezi clasamentul FREE-ARENA cu top jucători, kill-uri, headshot-uri, timp jucat și activitate pe serverele CS 1.6, Respawn și CS2.",
    imageAlt: "Clasament FREE-ARENA cu top jucători și statistici Counter-Strike",
    breadcrumb: {
      home: "Acasă",
      current: "Clasament",
    },
    eyebrow: "Rankings live",
    h1: "Clasament FREE-ARENA",
    description:
      "Clasamentul FREE-ARENA este pagina centrală pentru progresul jucătorilor, activitate și competiție. Aici vezi cine urcă în top, cine domină la kill-uri, cine ține ritmul la headshot-uri și cine investește cel mai mult timp pe serverele comunității. Datele sunt gândite ca un reper rapid pentru jucători, admini și membri noi care vor să înțeleagă nivelul competitiv al comunității.",
    heroBullets: [
      "Top jucători după XP și performanță generală.",
      "Liste clare pentru kill-uri, headshot-uri și timp jucat.",
      "Legături directe către serverele unde poți intra imediat.",
    ],
    topPlayersTitle: "Top Players",
    killsTitle: "Top Kills",
    headshotsTitle: "Top Headshots",
    playtimeTitle: "Top Playtime",
    activityTitle: "Top Server Activity",
    how: {
      title: "Cum funcționează clasamentul",
      body: [
        "Clasamentul folosește statistici asociate activității reale din ecosistemul FREE-ARENA. Pentru fiecare jucător sunt urmărite valori precum XP, kill-uri, headshot-uri, timp jucat și eficiență în dueluri. Ordinea principală este orientată spre progres și activitate, nu doar spre un singur număr izolat. Asta ajută comunitatea să vadă cine joacă constant, cine contribuie la ritmul serverelor și cine revine suficient de des încât să conteze în top.",
        "Top Kills arată jucătorii care produc cel mai mult impact ofensiv. Top Headshots scoate în față precizia și controlul armei. Top Playtime este important pentru comunitate, pentru că un server puternic nu înseamnă doar fraguri, ci și prezență constantă. Când aceste liste sunt citite împreună, un jucător poate înțelege mai bine unde stă: poate nu este primul la XP, dar poate fi foarte sus la timp jucat sau la headshot-uri.",
        "Datele pot fi actualizate periodic și pot afișa fallback-uri curate dacă sursa live nu răspunde temporar. Pagina rămâne utilă pentru utilizatori deoarece explică transparent ce măsoară clasamentul și cum se leagă de serverele active.",
        "Clasamentul nu este gândit ca o promisiune de status permanent. Este un instrument viu, util pentru motivație și pentru decizii de comunitate: ce server atrage activitate, ce mod merită evenimente și ce tip de jucător revine cel mai des.",
      ],
    },
    why: {
      title: "De ce să joci pe FREE-ARENA",
      body: [
        "FREE-ARENA este construit ca un ecosistem pentru jucători care vor servere stabile, reguli clare și comunitate activă. Clasamentul adaugă un motiv simplu de revenire: fiecare sesiune poate conta. Dacă intri pe CS 1.6 Classic pentru joc echilibrat, pe Respawn pentru warm-up sau pe CS2 pentru direcția modernă, progresul tău devine parte dintr-o imagine mai mare.",
        "Pentru jucătorii noi, pagina de rankings funcționează ca o ușă de intrare. Vezi nume active, înțelegi ce servere sunt importante și ai linkuri directe către paginile oficiale. Pentru jucătorii vechi, pagina devine un punct de verificare: cine a urcat, cine a rămas constant, cine domină la precizie și cine ține comunitatea vie prin activitate.",
        "Pe termen lung, acest clasament poate susține evenimente, provocări săptămânale, premii VIP, conținut pentru Discord și topicuri pe forum. Fundația corectă este importantă acum: traseu stabil, pagină clară și linkuri interne către serverele principale.",
      ],
    },
    internalLinksTitle: "Intră pe serverele FREE-ARENA",
    serverLinks: [
      {
        href: "/server/cs16-classic",
        title: "CS 1.6 Classic",
        copy: "Serverul clasic pentru runde echilibrate, hărți cunoscute și progres competitiv.",
      },
      {
        href: "/server/respawn",
        title: "Respawn",
        copy: "Warm-up rapid, dueluri constante și un mod bun pentru antrenament zilnic.",
      },
      {
        href: "/server/cs2",
        title: "CS2",
        copy: "Direcția modernă FREE-ARENA pentru jucători competitivi și comunitate activă.",
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
        "For new players, this page works as an entry point. They can see active names, understand which servers matter, and move directly to the official server pages. For returning players, it becomes a check-in page: who moved up, who stayed consistent, who leads on precision, and who keeps the community active through time played.",
        "Over time, this rankings page can support weekly challenges, VIP rewards, Discord content, and forum topics. The foundation matters now: stable routes, clear page structure, and internal links toward the main server pages.",
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
