import type { Locale } from "@/i18n/routing";
import type { ServerSeoPageData } from "@/lib/serverSeo";

type ServerSeoContentProps = {
  label: string;
  locale: Locale;
  page: ServerSeoPageData;
};

export function ServerSeoContent({ label, locale, page }: ServerSeoContentProps) {
  const content = page.content[locale];

  return (
    <section className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
        <div>
          <p className="neon-kicker inline-flex px-4 py-2 text-xs font-black uppercase tracking-[0.22em]">
            {label}
          </p>
          <h2 className="neon-heading mt-5 font-display text-[clamp(2.4rem,5vw,4.8rem)] font-black uppercase leading-[0.92] text-white">
            {content.heading}
          </h2>
          <p className="mt-5 text-base font-semibold leading-7 text-white/64">
            {content.intro}
          </p>
        </div>

        <article className="premium-card glass-panel rounded-lg p-5 sm:p-6">
          <div className="grid gap-5 text-sm leading-7 text-white/68 sm:text-base">
            {content.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
