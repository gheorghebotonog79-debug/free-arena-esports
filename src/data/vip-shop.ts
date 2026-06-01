import type { Locale } from "@/i18n/routing";

export type VipTierKey = "queen" | "gold" | "diamond";

export type VipPackageTone = "queen" | "gold" | "diamond";

export type VipPackage = {
  badge?: string;
  benefits: readonly string[];
  cta: string;
  limitations?: readonly string[];
  name: string;
  price: string;
  purpose: string;
  tone: VipPackageTone;
};

export type VipComparisonRow = {
  diamond: boolean;
  gold: boolean;
  label: string;
  queen: boolean;
};

export type VipShopContent = {
  activation: {
    copy: string;
    customCopy: string;
    customCta: string;
    customTitle: string;
    discordCta: string;
    forumCta: string;
    steps: readonly string[];
    title: string;
  };
  comparisonTitle: string;
  cta: {
    diamond: string;
    discord: string;
    gold: string;
    title: string;
  };
  hero: {
    eyebrow: string;
    packages: string;
    subtitle: string;
    ticket: string;
    title: string;
  };
  importantNotes: {
    items: readonly string[];
    title: string;
  };
  metadata: {
    description: string;
    title: string;
  };
  packages: Record<VipTierKey, VipPackage>;
  support: {
    copy: string;
    emailCopy: string;
    emailCta: string;
    emailTitle: string;
    items: readonly string[];
    teamSpeakCopy: string;
    teamSpeakCta: string;
    teamSpeakTitle: string;
    title: string;
  };
};

export const vipShopContact = {
  email: "gheorghe.botonog79@gmail.com",
  emailHref: "mailto:gheorghe.botonog79@gmail.com?subject=FREE-ARENA%20VIP%20acces%20garantat",
  teamSpeakAddress: "ts.free-arena.ro",
  teamSpeakHref: "ts3server://ts.free-arena.ro",
} as const;

export const vipShopContent: Record<Locale, VipShopContent> = {
  ro: {
    metadata: {
      title: "Shop VIP FREE-ARENA | Gold și Diamond",
      description:
        "Cumpără VIP Gold sau VIP Diamond pe FREE-ARENA și activează beneficii premium pentru serverele comunității.",
    },
    hero: {
      eyebrow: "FREE-ARENA VIP SHOP",
      title: "Alege gradul tău VIP",
      subtitle: "Premium benefits for active FREE-ARENA players.",
      packages: "Vezi pachete",
      ticket: "Deschide ticket",
    },
    activation: {
      title: "Cum se activeaza VIP?",
      copy:
        "Shop-ul FREE-ARENA functioneaza momentan ca funnel manual. Nu exista plata online automata, iar activarea se face dupa confirmare.",
      forumCta: "Intreaba pe forum",
      discordCta: "Cere activare VIP",
      customTitle: "VIP Custom / Contact",
      customCopy:
        "Ai nevoie de acces garantat, activare speciala sau clarificari pentru un server anume? Contacteaza-ne inainte de plata.",
      customCta: "Contact pentru VIP Custom",
      steps: [
        "Alegi pachetul potrivit.",
        "Ne contactezi pe forum sau Discord.",
        "Confirmam plata si datele contului.",
        "Activam VIP pe serverul ales.",
      ],
    },
    comparisonTitle: "Comparație pachete VIP",
    cta: {
      title: "Cere activare VIP manual",
      gold: "Cere Gold",
      diamond: "Cere Diamond",
      discord: "Deschide ticket",
    },
    importantNotes: {
      title: "Note importante",
      items: [
        "VIP nu inseamna imunitate la reguli.",
        "VIP nu permite injurii, abuz sau comportament toxic.",
        "Unele beneficii pot fi limitate pe harti speciale.",
        "AWP poate fi blocat pe anumite harti.",
        "Armele VIP se activeaza din runda 3.",
        "Activarea se face dupa confirmarea platii.",
      ],
    },
    support: {
      title: "TeamSpeak si acces garantat",
      copy:
        "Pentru suport rapid, activare VIP sau acces garantat, foloseste TeamSpeak-ul comunitatii sau trimite email direct cu detaliile contului tau.",
      teamSpeakTitle: "TeamSpeak FREE-ARENA",
      teamSpeakCopy:
        "Intra pe voice pentru suport, verificari rapide si discutii cu staff-ul atunci cand ai nevoie de ajutor pentru VIP.",
      teamSpeakCta: "Deschide TeamSpeak",
      emailTitle: "Acces garantat",
      emailCopy:
        "Pentru acces garantat, trimite email cu numele tau din joc, serverul, pachetul dorit si dovada platii.",
      emailCta: "Trimite email",
      items: [
        "Adresa TeamSpeak: ts.free-arena.ro",
        "Email acces garantat: gheorghe.botonog79@gmail.com",
        "Include numele folosit pe server si pachetul VIP dorit.",
        "Activarea se face dupa confirmarea platii.",
      ],
    },
    packages: {
      queen: {
        name: "QUEEN",
        price: "Gratis",
        tone: "queen",
        purpose: "Grad cosmetic gratuit pentru comunitate, evidentiat special pentru fete si jucatoare active.",
        cta: "Cere Queen",
        benefits: [
          "QUEEN tag cosmetic",
          "Grad vizual special pentru prezenta feminina in comunitate",
          "Apare în lista VIP online",
          "Acces la /vip, /beneficii, /vips, /arme",
          "Bonus basic la spawn",
          "Skin sau tag vizual",
        ],
        limitations: [
          "Fără revive",
          "Fără slot rezervat premium",
          "Fără wallbang",
          "Fără hitmarker",
          "Fără pachet Diamond",
        ],
      },
      gold: {
        name: "VIP GOLD",
        price: "10 euro",
        badge: "Recomandat",
        tone: "gold",
        purpose: "Pachet echilibrat pentru jucători activi pe serverele FREE-ARENA.",
        cta: "Cere activare VIP",
        benefits: [
          "Slot rezervat",
          "VIP Gold tag",
          "Meniu arme din runda 3",
          "M4A1 / AK-47 / AWP unde harta permite",
          "Deagle + HE + 2 Flash + 1 Frost la spawn",
          "100 HP + 100 armor",
          "Double jump",
          "Bonus bani pe damage",
          "Bonus bani pe kill",
          "Extra bani pe headshot",
          "+10 HP la kill",
          "+15 HP la headshot",
          "Maximum 100 HP",
          "Killstreak rewards: 3 kills HP, 5 kills armor, 7 kills HE",
        ],
      },
      diamond: {
        name: "VIP DIAMOND",
        price: "20 euro",
        badge: "Premium",
        tone: "diamond",
        purpose: "Cel mai complet pachet pentru jucătorii care intră des și vor beneficii premium.",
        cta: "Cere activare VIP",
        benefits: [
          "Tot ce include Gold",
          "VIP Diamond tag",
          "Slot rezervat",
          "Meniu arme din runda 3",
          "Kit complet la spawn: Deagle + HE + 2 Flash + 2 Frost + 1 Revive",
          "100 HP + 100 armor cu helmet",
          "Manual revive 1x per round",
          "Revive dezactivat dacă bomba este plantată sau runda s-a terminat",
          "Double jump",
          "Wallbang",
          "Hitmarker",
          "Model player Diamond",
          "Skinuri Diamond pentru M4A1 / AK-47 / AWP",
          "Killstreak rewards",
          "Cel mai bun pachet pentru jucători activi",
        ],
      },
    },
  },
  en: {
    metadata: {
      title: "FREE-ARENA VIP Shop | Gold and Diamond",
      description:
        "Buy VIP Gold or VIP Diamond on FREE-ARENA and unlock premium community server benefits.",
    },
    hero: {
      eyebrow: "FREE-ARENA VIP SHOP",
      title: "Choose your VIP rank",
      subtitle: "Premium benefits for active FREE-ARENA players.",
      packages: "View packages",
      ticket: "Open ticket",
    },
    activation: {
      title: "How is VIP activated?",
      copy:
        "The FREE-ARENA shop currently works as a manual funnel. There is no automatic online payment, and activation happens after confirmation.",
      forumCta: "Ask on forum",
      discordCta: "Request VIP activation",
      customTitle: "VIP Custom / Contact",
      customCopy:
        "Need guaranteed access, special activation, or clarification for a specific server? Contact us before payment.",
      customCta: "Contact for VIP Custom",
      steps: [
        "Choose the right package.",
        "Contact us on forum or Discord.",
        "We confirm payment and account details.",
        "We activate VIP on the selected server.",
      ],
    },
    comparisonTitle: "VIP package comparison",
    cta: {
      title: "Request manual VIP activation",
      gold: "Request Gold",
      diamond: "Request Diamond",
      discord: "Open ticket",
    },
    importantNotes: {
      title: "Important notes",
      items: [
        "VIP does not mean immunity from rules.",
        "VIP does not allow insults, abuse or toxic behavior.",
        "Some benefits may be limited on specific maps.",
        "AWP may be blocked on special maps.",
        "VIP weapons activate from round 3.",
        "Activation is done after payment confirmation.",
      ],
    },
    support: {
      title: "TeamSpeak and guaranteed access",
      copy:
        "For fast support, VIP activation, or guaranteed access, use the community TeamSpeak or email the account details directly.",
      teamSpeakTitle: "FREE-ARENA TeamSpeak",
      teamSpeakCopy:
        "Join voice for support, quick checks, and staff conversations whenever you need help with VIP.",
      teamSpeakCta: "Open TeamSpeak",
      emailTitle: "Guaranteed access",
      emailCopy:
        "For guaranteed access, send an email with your in-game name, server, desired package, and payment proof.",
      emailCta: "Send email",
      items: [
        "TeamSpeak address: ts.free-arena.ro",
        "Guaranteed access email: gheorghe.botonog79@gmail.com",
        "Include your server name and desired VIP package.",
        "Activation is completed after payment confirmation.",
      ],
    },
    packages: {
      queen: {
        name: "QUEEN",
        price: "Free",
        tone: "queen",
        purpose: "Free community cosmetic rank, highlighted especially for active female players.",
        cta: "Request Queen",
        benefits: [
          "QUEEN cosmetic tag",
          "Visual rank for female presence in the community",
          "Appears in the VIP online list",
          "Access to /vip, /beneficii, /vips, /arme",
          "Basic spawn bonus",
          "Visual skin or tag",
        ],
        limitations: [
          "No revive",
          "No premium reserved slot",
          "No wallbang",
          "No hitmarker",
          "No Diamond package",
        ],
      },
      gold: {
        name: "VIP GOLD",
        price: "10 euro",
        badge: "Recommended",
        tone: "gold",
        purpose: "Balanced package for active players on FREE-ARENA servers.",
        cta: "Request VIP activation",
        benefits: [
          "Reserved slot",
          "VIP Gold tag",
          "Weapon menu from round 3",
          "M4A1 / AK-47 / AWP where map allows",
          "Deagle + HE + 2 Flash + 1 Frost on spawn",
          "100 HP + 100 armor",
          "Double jump",
          "Money bonus on damage",
          "Money bonus on kill",
          "Extra money on headshot",
          "+10 HP on kill",
          "+15 HP on headshot",
          "Max 100 HP",
          "Killstreak rewards: 3 kills HP, 5 kills armor, 7 kills HE",
        ],
      },
      diamond: {
        name: "VIP DIAMOND",
        price: "20 euro",
        badge: "Premium",
        tone: "diamond",
        purpose: "The strongest package for active players who want premium benefits.",
        cta: "Request VIP activation",
        benefits: [
          "Everything from Gold",
          "VIP Diamond tag",
          "Reserved slot",
          "Weapon menu from round 3",
          "Full spawn kit: Deagle + HE + 2 Flash + 2 Frost + 1 Revive",
          "100 HP + 100 armor with helmet",
          "Manual revive 1x per round",
          "Revive disabled if bomb is planted or round ended",
          "Double jump",
          "Wallbang",
          "Hitmarker",
          "Diamond player model",
          "Diamond weapon skins for M4A1 / AK-47 / AWP",
          "Killstreak rewards",
          "Best package for active players",
        ],
      },
    },
  },
};

export const vipPackageOrder: readonly VipTierKey[] = ["queen", "gold", "diamond"];

export const vipComparisonRows: Record<Locale, readonly VipComparisonRow[]> = {
  ro: [
    { label: "VIP tag", queen: true, gold: true, diamond: true },
    { label: "Listă VIP online", queen: true, gold: true, diamond: true },
    { label: "Meniuri VIP", queen: true, gold: true, diamond: true },
    { label: "Slot rezervat", queen: false, gold: true, diamond: true },
    { label: "Meniu arme runda 3", queen: false, gold: true, diamond: true },
    { label: "Double jump", queen: false, gold: true, diamond: true },
    { label: "Revive", queen: false, gold: false, diamond: true },
    { label: "Wallbang", queen: false, gold: false, diamond: true },
    { label: "Hitmarker", queen: false, gold: false, diamond: true },
    { label: "Skinuri premium", queen: false, gold: false, diamond: true },
    { label: "Killstreak rewards", queen: false, gold: true, diamond: true },
  ],
  en: [
    { label: "VIP tag", queen: true, gold: true, diamond: true },
    { label: "VIP online list", queen: true, gold: true, diamond: true },
    { label: "VIP menus", queen: true, gold: true, diamond: true },
    { label: "Reserved slot", queen: false, gold: true, diamond: true },
    { label: "Weapon menu round 3", queen: false, gold: true, diamond: true },
    { label: "Double jump", queen: false, gold: true, diamond: true },
    { label: "Revive", queen: false, gold: false, diamond: true },
    { label: "Wallbang", queen: false, gold: false, diamond: true },
    { label: "Hitmarker", queen: false, gold: false, diamond: true },
    { label: "Premium skins", queen: false, gold: false, diamond: true },
    { label: "Killstreak rewards", queen: false, gold: true, diamond: true },
  ],
};
