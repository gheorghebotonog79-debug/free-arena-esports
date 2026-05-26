import { HelpCircle } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import type { ServerSeoPageData } from "@/lib/serverSeo";

type ServerFaqProps = {
  label: string;
  locale: Locale;
  page: ServerSeoPageData;
  title: string;
};

export function ServerFaq({ label, locale, page, title }: ServerFaqProps) {
  const faq = page.faq[locale];

  return (
    <section id="faq" className="px-4 pb-14 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-arena-green">
          {label}
        </p>
        <h2 className="mt-3 font-display text-3xl font-black uppercase text-white">
          {title}
        </h2>
        <div className="mt-6 grid gap-3">
          {faq.map((item) => (
            <details
              key={item.question}
              className="premium-card glass-panel group rounded-lg p-5"
            >
              <summary className="flex cursor-pointer list-none items-center gap-3 text-base font-black text-white">
                <HelpCircle size={20} className="shrink-0 text-cyan-200" aria-hidden="true" />
                <span>{item.question}</span>
              </summary>
              <p className="mt-4 text-sm leading-7 text-white/64">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
