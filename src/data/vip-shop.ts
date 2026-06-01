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
};

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
    comparisonTitle: "Comparație pachete VIP",
    cta: {
      title: "Activează VIP prin Discord",
      gold: "Cumpără Gold",
      diamond: "Cumpără Diamond",
      discord: "Open Discord Ticket",
    },
    importantNotes: {
      title: "Note importante",
      items: [
        "VIP does not mean immunity from rules.",
        "VIP does not allow insults, abuse or toxic behavior.",
        "Some benefits may be limited on specific maps.",
        "AWP may be blocked on special maps.",
        "VIP weapons activate from round 3.",
        "Activation is done after payment confirmation.",
      ],
    },
    packages: {
      queen: {
        name: "QUEEN / QUIN",
        price: "Gratis",
        tone: "queen",
        purpose: "Grad cosmetic gratuit pentru jucătorii comunității.",
        cta: "Cere Queen / Quin",
        benefits: [
          "QUEEN / QUIN tag",
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
        cta: "Cumpără Gold",
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
        cta: "Cumpără Diamond",
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
    comparisonTitle: "VIP package comparison",
    cta: {
      title: "Activate VIP through Discord",
      gold: "Buy Gold",
      diamond: "Buy Diamond",
      discord: "Open Discord Ticket",
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
    packages: {
      queen: {
        name: "QUEEN / QUIN",
        price: "Free",
        tone: "queen",
        purpose: "Free community cosmetic rank for FREE-ARENA players.",
        cta: "Request Queen / Quin",
        benefits: [
          "QUEEN / QUIN tag",
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
        cta: "Buy Gold",
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
        cta: "Buy Diamond",
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
