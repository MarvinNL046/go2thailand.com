import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';

interface CityFaqOverviewProps {
  faq: Array<{
    question: string;
    answer: string;
  }>;
  isNl: boolean;
  limit?: number;
}

export function CityFaqOverview({ faq, isNl, limit = 6 }: CityFaqOverviewProps) {
  if (!faq.length) return null;

  return (
    <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-14">
      <div className="container-custom">
        <div className="mb-6 flex items-end justify-between gap-5">
          <div>
            <p className="eyebrow">{isNl ? 'Alles voor vertrek' : 'Before you go'}</p>
            <h2 className="font-display text-[2.8rem] font-semibold leading-none tracking-[-0.035em] text-jade sm:text-[3.25rem]">
              {isNl ? 'Veelgestelde vragen' : 'Frequently asked questions'}
            </h2>
          </div>
          <Link href="/practical-info/" className="hidden items-center gap-2 text-xs font-bold text-jade transition hover:text-saffron-dark sm:flex">
            {isNl ? 'Bekijk alle praktische informatie' : 'View all practical information'} <ArrowRight size={15} />
          </Link>
        </div>

        <div className="overflow-hidden rounded-xl border border-jade/10 bg-white shadow-[0_5px_18px_rgba(18,63,54,0.035)]">
          {faq.slice(0, limit).map((item) => (
            <details key={item.question} className="group border-b border-jade/10 last:border-b-0">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-4 text-sm font-bold text-jade transition hover:bg-jade/[0.025] focus:outline-none sm:px-6 [&::-webkit-details-marker]:hidden">
                <span>{item.question}</span>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-jade/10 text-jade transition group-open:rotate-180 group-open:border-saffron/35 group-open:text-saffron-dark">
                  <ChevronDown size={15} />
                </span>
              </summary>
              <div className="px-5 pb-5 pr-16 sm:px-6 sm:pb-6 sm:pr-24">
                <p className="max-w-[58rem] text-sm leading-6 text-charcoal/85">{item.answer}</p>
              </div>
            </details>
          ))}
        </div>

        <Link href="/practical-info/" className="mt-5 flex items-center justify-end gap-2 text-xs font-bold text-jade sm:hidden">
          {isNl ? 'Alle praktische informatie' : 'All practical information'} <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}
