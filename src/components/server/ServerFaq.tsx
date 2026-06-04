import { HelpCircle } from "lucide-react";
import { TacticalCardChrome, TacticalSection } from "@/components/public/PublicPagePrimitives";
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
    <TacticalSection
      id="faq"
      className="pb-14"
      eyebrow={label}
      title={title}
    >
        <div className="mt-6 grid gap-3">
          {faq.map((item) => (
            <details
              key={item.question}
              className="server-tactical-card neon-hover server-card--global server-tactical-card--online group min-h-0 rounded-lg p-5"
              data-occupancy="low"
              data-status="online"
            >
              <TacticalCardChrome />
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
    </TacticalSection>
  );
}
