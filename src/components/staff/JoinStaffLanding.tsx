import { ArrowRight, CheckCircle2, Clock3, MessageSquare, ShieldCheck, Trophy, UserPlus, type LucideIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

const content = {
  ro: {
    eyebrow: "Recrutare staff",
    title: "Cautam admini activi pentru FREE-ARENA",
    copy:
      "FREE-ARENA este la inceputul unei etape in care comunitatea conteaza mai mult decat orice pagina. Avem nevoie de oameni maturi, prezenti seara, care pot ajuta jucatorii si pot tine serverele curate.",
    apply: "Aplica pe Forum",
    servers: "Vezi serverele",
    requirementsTitle: "Cerinte",
    benefitsTitle: "Beneficii",
    noteTitle: "Ce cautam de fapt",
    note:
      "Nu cautam admini doar pentru comenzi. Cautam oameni care pot vorbi normal cu jucatorii, pot calma conflicte si pot ajuta comunitatea sa creasca fara promisiuni false.",
    requirements: [
      "Minim 16 ani.",
      "Activitate seara, cand serverele au cea mai mare sansa sa stranga jucatori.",
      "Comportament matur si rabdare cu jucatorii noi.",
      "Cont pe forum obligatoriu pentru comunicarea cu echipa.",
      "Experienta CS reprezinta avantaj.",
    ],
    benefits: [
      "Rol staff in comunitatea FREE-ARENA.",
      "Acces la organizarea comunitatii si la deciziile operationale.",
      "Prioritate la evenimente, testari si activitati comunitare.",
      "Posibilitate de avansare daca activitatea este serioasa.",
    ],
    steps: [
      "Intra pe Forum.",
      "Spune pentru ce server vrei sa ajuti.",
      "Scrie varsta, experienta si intervalul in care poti fi activ.",
      "Asteapta un raspuns de la echipa.",
    ],
  },
  en: {
    eyebrow: "Staff recruitment",
    title: "We are looking for active FREE-ARENA admins",
    copy:
      "FREE-ARENA is entering a stage where the community matters more than any page. We need mature people who can be active in the evening, help players, and keep the servers clean.",
    apply: "Apply on Forum",
    servers: "View servers",
    requirementsTitle: "Requirements",
    benefitsTitle: "Benefits",
    noteTitle: "What we actually need",
    note:
      "We are not looking for admins only for commands. We need people who can speak normally with players, calm conflicts, and help the community grow without fake promises.",
    requirements: [
      "Minimum age 16.",
      "Evening activity, when the servers have the best chance to gather players.",
      "Mature behavior and patience with new players.",
      "A forum account is required for team communication.",
      "Counter-Strike experience is an advantage.",
    ],
    benefits: [
      "Staff role inside the FREE-ARENA community.",
      "Access to community organization and operational decisions.",
      "Priority for events, testing, and community activity.",
      "Possibility to advance if the activity is serious.",
    ],
    steps: [
      "Join the forum.",
      "Say which server you want to help with.",
      "Share your age, experience, and active hours.",
      "Wait for a reply from the team.",
    ],
  },
} as const;

export function JoinStaffLanding({ locale }: { locale: Locale }) {
  const page = content[locale];

  return (
    <main className="neon-page-shell cyber-root bg-arena-black text-white">
      <section className="neon-section px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[minmax(0,0.96fr)_minmax(22rem,0.78fr)] lg:items-center">
          <div>
            <p className="neon-kicker section-badge-label inline-flex px-4 py-2">
              {page.eyebrow}
            </p>
            <h1 className="neon-heading neon-title neon-text-pulse mt-6 max-w-5xl font-display text-[clamp(3rem,8vw,7rem)] font-black uppercase leading-[0.84] text-white">
              {page.title}
            </h1>
            <p className="mt-6 max-w-3xl text-base font-semibold leading-8 text-white/68 sm:text-lg">
              {page.copy}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="https://free-arena.ro"
                target="_blank"
                rel="noreferrer"
                className="button-glow inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-arena-green px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-black transition hover:bg-white"
              >
                <MessageSquare size={18} aria-hidden="true" />
                {page.apply}
              </a>
              <Link
                href="/servers"
                className="button-ghost inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/14 bg-white/[0.055] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:border-arena-cyan/60 hover:bg-arena-cyan/10"
              >
                {page.servers}
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <aside className="premium-card glass-panel neon-hover animated-border rounded-lg p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <span className="grid size-14 place-items-center rounded-lg border border-arena-gold/30 bg-arena-gold/12 text-arena-gold">
                <UserPlus size={26} aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-white/42">FREE-ARENA</p>
                <h2 className="mt-1 font-display text-3xl font-black uppercase text-white">
                  Staff
                </h2>
              </div>
            </div>
            <ol className="mt-6 grid gap-3">
              {page.steps.map((step, index) => (
                <li key={step} className="server-metric flex gap-3 p-3 text-sm font-semibold leading-6 text-white/68">
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-cyan-300/20 bg-cyan-300/10 font-display text-sm font-black text-cyan-200">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </section>

      <section className="neon-section px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-7xl gap-5 lg:grid-cols-2">
          <InfoPanel Icon={ShieldCheck} items={page.requirements} title={page.requirementsTitle} />
          <InfoPanel Icon={Trophy} items={page.benefits} title={page.benefitsTitle} />
        </div>
      </section>

      <section className="neon-section px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <article className="premium-card glass-panel neon-hover rounded-lg p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <span className="grid size-12 shrink-0 place-items-center rounded-lg border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
                <Clock3 size={22} aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-display text-3xl font-black uppercase text-white">
                  {page.noteTitle}
                </h2>
                <p className="mt-3 max-w-4xl text-sm font-semibold leading-7 text-white/64">
                  {page.note}
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}

function InfoPanel({
  Icon,
  items,
  title,
}: {
  Icon: LucideIcon;
  items: readonly string[];
  title: string;
}) {
  return (
    <article className="premium-card glass-panel neon-hover h-full rounded-lg p-5">
      <div className="flex items-center gap-3">
        <span className="grid size-12 place-items-center rounded-lg border border-cyan-300/20 bg-cyan-300/10 text-cyan-200">
          <Icon size={22} aria-hidden="true" />
        </span>
        <h2 className="font-display text-3xl font-black uppercase text-white">
          {title}
        </h2>
      </div>
      <ul className="mt-6 grid gap-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm font-semibold leading-6 text-white/66">
            <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-arena-green" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
