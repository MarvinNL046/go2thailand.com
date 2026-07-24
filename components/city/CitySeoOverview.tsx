import Link from 'next/link';
import { Compass, MapPinned } from 'lucide-react';

interface CitySeoOverviewProps {
  paragraphs: string[];
  region: string;
  province: string;
  population: string;
  populationLabel: string;
  populationNote?: string;
  coordinates: string;
  isNl: boolean;
}

export function CitySeoOverview({
  paragraphs,
  region,
  province,
  population,
  populationLabel,
  populationNote,
  coordinates,
  isNl,
}: CitySeoOverviewProps) {
  const displayRegion = isNl && region.toLowerCase() === 'southern' ? 'Zuidelijk' : region;

  return (
    <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-16">
      <div className="container-custom grid gap-8 lg:grid-cols-[1.45fr_0.65fr] lg:items-start lg:gap-14">
        <article>
          <p className="eyebrow">{isNl ? 'Verdiep je in de bestemming' : 'Get to know the destination'}</p>
          <h2 className="font-display text-[2.8rem] font-semibold leading-none tracking-[-0.035em] text-jade sm:text-[3.25rem]">
            {isNl ? 'Over Krabi' : 'About Krabi'}
          </h2>

          <div className="mt-7 border-l border-saffron/45 pl-5 sm:pl-7">
            <div className="max-w-[49rem] space-y-5 text-[0.95rem] leading-7 text-charcoal/82">
              {paragraphs.map((paragraph, index) => (
                <p key={`${paragraph.slice(0, 30)}-${index}`}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="mt-7 flex items-center gap-3 text-xs font-semibold text-jade/70">
            <Compass size={17} strokeWidth={1.6} className="text-saffron-dark" />
            <span>{isNl ? 'Lokale context, praktisch uitgelegd.' : 'Local context, explained practically.'}</span>
          </div>
        </article>

        <aside className="overflow-hidden rounded-2xl border border-jade/10 bg-white shadow-[0_10px_30px_rgba(18,63,54,0.05)]">
          <div className="flex items-center gap-4 border-b border-jade/10 px-6 py-5">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-jade text-white">
              <MapPinned size={21} strokeWidth={1.55} />
            </span>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-saffron-dark">Snapshot</p>
              <h3 className="mt-0.5 font-display text-[1.55rem] font-semibold leading-none text-jade">
                {isNl ? 'Snelle feiten' : 'Quick facts'}
              </h3>
            </div>
          </div>

          <dl className="px-6 py-3">
            <div className="flex items-center justify-between gap-5 border-b border-jade/10 py-3.5">
              <dt className="text-xs text-charcoal/52">{isNl ? 'Regio' : 'Region'}</dt>
              <dd>
                <Link href={`/region/${region}/`} className="text-sm font-bold capitalize text-jade transition hover:text-saffron-dark">
                  {displayRegion}
                </Link>
              </dd>
            </div>
            <div className="flex items-center justify-between gap-5 border-b border-jade/10 py-3.5">
              <dt className="text-xs text-charcoal/52">{isNl ? 'Provincie' : 'Province'}</dt>
              <dd className="text-sm font-bold text-jade">{province}</dd>
            </div>
            <div className="flex items-center justify-between gap-5 border-b border-jade/10 py-3.5">
              <dt className="text-xs text-charcoal/52">{populationLabel}</dt>
              <dd className="text-sm font-bold text-jade">{population}</dd>
            </div>
            <div className="flex items-center justify-between gap-5 py-3.5">
              <dt className="text-xs text-charcoal/52">{isNl ? 'Coördinaten' : 'Coordinates'}</dt>
              <dd className="text-xs font-bold text-jade">{coordinates}</dd>
            </div>
          </dl>

          {populationNote && (
            <p className="border-t border-jade/10 bg-saffron/[0.07] px-6 py-4 text-[11px] leading-5 text-charcoal/65">
              {populationNote}
            </p>
          )}
        </aside>
      </div>
    </section>
  );
}
