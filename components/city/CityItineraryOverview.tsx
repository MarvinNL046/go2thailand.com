import Link from 'next/link';
import { ArrowRight, Flag, MapPin } from 'lucide-react';

interface CityItineraryOverviewProps {
  affiliateHref: string;
  isNl: boolean;
}

const days = [
  {
    day: 1,
    title: { nl: 'Railay', en: 'Railay' },
    items: {
      nl: ['Boottocht vanuit Ao Nang', 'Verken Phra Nang Cave Beach', 'Klimmen of relaxen op het strand'],
      en: ['Boat trip from Ao Nang', 'Explore Phra Nang Cave Beach', 'Climb or relax on the beach'],
    },
    href: '/city/krabi/attractions/railay-beach/',
    external: false,
  },
  {
    day: 2,
    title: { nl: 'Eilandhoppen', en: 'Island hopping' },
    items: {
      nl: ['Kies Phi Phi of de Hong-eilanden', 'Snorkel in helder water', 'Sluit af met zonsondergang op zee'],
      en: ['Choose Phi Phi or the Hong Islands', 'Snorkel in clear water', 'Finish with sunset at sea'],
    },
    href: '',
    external: true,
  },
  {
    day: 3,
    title: { nl: 'Natuur & tempels', en: 'Nature & temples' },
    items: {
      nl: ['Kies Tiger Cave Temple of Ao Thalane', 'Sluit de dag af in Krabi Town', 'Eet op de avondmarkt'],
      en: ['Emerald Pool & Hot Springs', 'Tiger Cave Temple (Wat Tham Sua)', 'Local market and street food'],
    },
    href: '/city/krabi/attractions/',
    external: false,
  },
] as const;

export function CityItineraryOverview({ affiliateHref, isNl }: CityItineraryOverviewProps) {
  return (
    <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-14">
      <div className="container-custom">
        <div className="mb-7 flex items-end justify-between gap-5">
          <div>
            <p className="eyebrow">{isNl ? 'Drie, vier of vijf dagen' : 'Three, four or five days'}</p>
            <h2 className="font-display text-[2.8rem] font-semibold leading-none tracking-[-0.035em] text-jade sm:text-[3.25rem]">
              {isNl ? 'Hoeveel dagen heb je nodig in Krabi?' : 'How many days do you need in Krabi?'}
            </h2>
          </div>
          <Link href="/city/krabi/attractions/" className="hidden items-center gap-2 text-xs font-bold text-jade transition hover:text-saffron-dark sm:flex">
            {isNl ? 'Bekijk alle bezienswaardigheden' : 'View all attractions'} <ArrowRight size={15} />
          </Link>
        </div>

        <p className="mb-7 max-w-3xl text-sm leading-7 text-charcoal/65">
          {isNl
            ? 'Voor de meeste reizigers zijn vier dagen ideaal. Met drie volle dagen zie je de hoogtepunten; met vijf dagen kun je een rustiger tempo aanhouden of een reservebootdag inplannen wanneer het weer verandert.'
            : 'Four days is ideal for most travellers. Three full days covers the highlights, while five days lets you slow down or keep a spare boat day if conditions change.'}
        </p>

        <h3 className="mb-5 font-display text-[1.8rem] font-semibold leading-none tracking-[-0.02em] text-jade">
          {isNl ? '3 dagen: de hoogtepunten' : '3 days: the highlights'}
        </h3>

        <div className="relative">
          <div className="absolute bottom-5 left-[1.05rem] top-5 border-l-2 border-dotted border-saffron/55 sm:hidden" />
          <MapPin className="absolute left-0 top-0 z-20 text-saffron sm:hidden" size={35} fill="#fcfaf6" strokeWidth={1.8} />
          <Flag className="absolute -bottom-1 left-[0.65rem] z-20 text-saffron sm:hidden" size={29} fill="#F29A38" strokeWidth={1.7} />

          <svg className="pointer-events-none absolute inset-x-2 top-[4.8rem] hidden h-[7.5rem] w-[calc(100%-1rem)] sm:block" viewBox="0 0 1200 120" fill="none" preserveAspectRatio="none" aria-hidden="true">
            <path d="M26 78C83 25 137 106 205 76C272 46 302 46 376 77C449 108 499 25 575 72C653 120 702 27 785 72C864 115 912 27 990 71C1050 104 1110 48 1172 66" stroke="#F29A38" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 8" />
            <circle cx="26" cy="78" r="5" fill="#F29A38" />
            <circle cx="376" cy="77" r="5" fill="#F29A38" />
            <circle cx="785" cy="72" r="5" fill="#F29A38" />
            <circle cx="1172" cy="66" r="5" fill="#F29A38" />
          </svg>
          <MapPin className="absolute -left-2 top-[4rem] z-20 hidden text-saffron sm:block" size={37} fill="#fcfaf6" strokeWidth={1.8} />
          <Flag className="absolute -right-1 top-[4rem] z-20 hidden text-saffron sm:block" size={34} fill="#F29A38" strokeWidth={1.7} />

          <div className="grid gap-4 pl-11 sm:grid-cols-3 sm:gap-10 sm:px-11">
            {days.map(day => {
              const href = day.external ? affiliateHref : day.href;
              const body = (
                <article className="group relative z-10 min-h-[13.5rem] rounded-xl border border-jade/10 bg-white p-5 shadow-[0_5px_18px_rgba(18,63,54,0.045)] transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:min-h-[14rem] sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-saffron-dark">{isNl ? `Dag ${day.day}` : `Day ${day.day}`}</p>
                      <h4 className="mt-2 font-display text-[1.65rem] font-semibold leading-none tracking-[-0.02em] text-jade">{isNl ? day.title.nl : day.title.en}</h4>
                    </div>
                    <span className="grid h-8 w-8 place-items-center rounded-lg border border-jade/10 text-jade transition group-hover:border-saffron/45 group-hover:text-saffron-dark"><ArrowRight size={14} /></span>
                  </div>
                  <ul className="mt-5 space-y-2.5 text-xs leading-5 text-charcoal/58">
                    {(isNl ? day.items.nl : day.items.en).map(item => (
                      <li key={item} className="flex gap-2.5"><span className="mt-[0.48rem] h-1 w-1 shrink-0 rounded-full bg-saffron" />{item}</li>
                    ))}
                  </ul>
                </article>
              );

              return day.external ? (
                <a key={day.day} href={href} target="_blank" rel="noopener noreferrer nofollow sponsored">{body}</a>
              ) : (
                <Link key={day.day} href={href}>{body}</Link>
              );
            })}
          </div>
        </div>

        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          <article className="rounded-xl border border-jade/10 bg-white p-5 shadow-[0_5px_18px_rgba(18,63,54,0.04)] sm:p-6">
            <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-saffron-dark">{isNl ? 'Onze aanrader' : 'Our recommendation'}</p>
            <h3 className="mt-2 font-display text-[1.65rem] font-semibold leading-none text-jade">{isNl ? '4 dagen: de beste balans' : '4 days: the best balance'}</h3>
            <p className="mt-3 text-xs leading-6 text-charcoal/60">
              {isNl
                ? 'Voeg een rustige dag bij Ao Thalane, Krabi Town of Khlong Thom toe. Je hoeft Railay en eilandhoppen dan niet direct achter elkaar te plannen.'
                : 'Add a slower day at Ao Thalane, Krabi Town or Khlong Thom, so Railay and island hopping do not need to be scheduled back to back.'}
            </p>
          </article>
          <article className="rounded-xl border border-jade/10 bg-white p-5 shadow-[0_5px_18px_rgba(18,63,54,0.04)] sm:p-6">
            <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-saffron-dark">{isNl ? 'Meer ruimte' : 'More breathing room'}</p>
            <h3 className="mt-2 font-display text-[1.65rem] font-semibold leading-none text-jade">{isNl ? '5 dagen: reis rustiger' : '5 days: travel more slowly'}</h3>
            <p className="mt-3 text-xs leading-6 text-charcoal/60">
              {isNl
                ? 'Gebruik de extra dag voor Ko Klang, een rustige stranddag of als alternatief wanneer wind of regen je bootplanning verandert.'
                : 'Use the extra day for Ko Klang, a quiet beach day or as a backup when wind or rain changes your boat plans.'}
            </p>
          </article>
        </div>

        <Link href="/city/krabi/attractions/" className="mt-6 flex items-center justify-end gap-2 text-xs font-bold text-jade sm:hidden">
          {isNl ? 'Alle bezienswaardigheden' : 'All attractions'} <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}
