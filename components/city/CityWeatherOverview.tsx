import Link from 'next/link';
import { ArrowRight, CloudRain, Sun, ThermometerSun } from 'lucide-react';

interface CityWeatherOverviewProps {
  isNl: boolean;
}

const months = [
  { nl: 'Jan', en: 'Jan' }, { nl: 'Feb', en: 'Feb' }, { nl: 'Mrt', en: 'Mar' },
  { nl: 'Apr', en: 'Apr' }, { nl: 'Mei', en: 'May' }, { nl: 'Jun', en: 'Jun' },
  { nl: 'Jul', en: 'Jul' }, { nl: 'Aug', en: 'Aug' }, { nl: 'Sep', en: 'Sep' },
  { nl: 'Okt', en: 'Oct' }, { nl: 'Nov', en: 'Nov' }, { nl: 'Dec', en: 'Dec' },
] as const;

const weatherRows = [
  {
    label: { nl: 'Temperatuur (°C)', en: 'Temperature (°C)' },
    icon: ThermometerSun,
    values: [30, 31, 32, 32, 31, 30, 30, 30, 30, 30, 30, 30],
    tone: 'text-jade',
  },
  {
    label: { nl: 'Zonneschijn (uur)', en: 'Sunshine (hours)' },
    icon: Sun,
    values: [8, 9, 9, 8, 6, 6, 6, 6, 6, 7, 8, 8],
    tone: 'text-saffron-dark',
  },
  {
    label: { nl: 'Neerslag (mm)', en: 'Rainfall (mm)' },
    icon: CloudRain,
    values: [32, 28, 40, 70, 210, 240, 210, 220, 260, 210, 120, 42],
    tone: 'text-[#5687b9]',
  },
] as const;

export function CityWeatherOverview({ isNl }: CityWeatherOverviewProps) {
  return (
    <section id="praktisch" className="section-divider-bottom scroll-mt-24 bg-[#fcfaf6] py-12 lg:py-14">
      <div className="container-custom">
        <div className="mb-6 flex items-end justify-between gap-5">
          <div>
            <p className="eyebrow">{isNl ? 'Plan met het seizoen mee' : 'Plan around the seasons'}</p>
            <h2 className="font-display text-[2.8rem] font-semibold leading-none tracking-[-0.035em] text-jade sm:text-[3.25rem]">
              {isNl ? 'Beste reistijd voor Krabi' : 'Best time to visit Krabi'}
            </h2>
          </div>
          <Link href="/city/krabi/weather/" className="hidden items-center gap-2 text-xs font-bold text-jade transition hover:text-saffron-dark sm:flex">
            {isNl ? 'Bekijk de volledige klimaatgids' : 'View the full climate guide'} <ArrowRight size={15} />
          </Link>
        </div>

        <p className="mb-7 max-w-3xl text-sm leading-7 text-charcoal/65">
          {isNl
            ? 'November tot en met maart geeft doorgaans de beste kans op droger weer en een rustigere zee. April is vaak heter. Van mei tot oktober is meer regen en wind mogelijk, met gemiddeld de meeste regen rond september; reizen kan dan nog steeds, maar houd bootdagen flexibel.'
            : 'November through March generally offers the best chance of drier weather and calmer seas. April is often hotter. More rain and wind are possible from May through October, so keep boat days flexible.'}
        </p>

        <div className="grid gap-4 lg:grid-cols-[2fr_0.82fr]">
          <div className="overflow-hidden rounded-xl border border-jade/10 bg-white shadow-[0_5px_18px_rgba(18,63,54,0.04)]">
            <div className="scrollbar-hide overflow-x-auto">
              <table className="w-full min-w-[47rem] border-collapse text-center text-[10px] text-charcoal/58">
                <thead>
                  <tr className="border-b border-jade/8 bg-jade/[0.025]">
                    <th className="w-[10.5rem] px-4 py-3 text-left font-bold text-jade">{isNl ? 'Gemiddelden' : 'Averages'}</th>
                    {months.map(month => <th key={month.en} className="px-2 py-3 font-bold text-jade/65">{isNl ? month.nl : month.en}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {weatherRows.map(row => {
                    const Icon = row.icon;
                    return (
                      <tr key={row.label.en} className="border-b border-jade/8 last:border-b-0">
                        <th className="px-4 py-4 text-left font-semibold text-charcoal/62">
                          <span className="inline-flex items-center gap-2"><Icon size={14} className={row.tone} />{isNl ? row.label.nl : row.label.en}</span>
                        </th>
                        {row.values.map((value, index) => (
                          <td key={`${row.label.en}-${months[index].en}`} className={`px-2 py-4 font-semibold ${row.label.en.includes('Rainfall') && value >= 200 ? 'bg-[#edf4fb] text-[#507baa]' : 'text-charcoal/62'}`}>
                            {value}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="flex flex-wrap items-center gap-5 border-t border-jade/8 px-4 py-3 text-[9px] text-charcoal/45">
              <span className="inline-flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-sm bg-[#a9c997]" />{isNl ? 'Droger seizoen' : 'Drier season'}</span>
              <span className="inline-flex items-center gap-1.5"><i className="h-2.5 w-2.5 rounded-sm bg-[#bfd5ea]" />{isNl ? 'Meer regen' : 'More rain'}</span>
              <span className="ml-auto">{isNl ? 'Indicatieve maandgemiddelden' : 'Indicative monthly averages'}</span>
            </div>
          </div>

          <aside className="relative overflow-hidden rounded-xl border border-jade/10 bg-white p-6 shadow-[0_5px_18px_rgba(18,63,54,0.04)] sm:p-7">
            <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full border border-saffron/15" />
            <div className="absolute -right-3 top-5 h-16 w-16 rounded-full bg-saffron/[0.055]" />
            <span className="grid h-11 w-11 place-items-center rounded-xl border border-saffron/20 bg-saffron/[0.08] text-saffron-dark">
              <Sun size={23} />
            </span>
            <p className="mt-6 text-[10px] font-extrabold uppercase tracking-[0.2em] text-saffron-dark">{isNl ? 'Onze aanrader' : 'Our recommendation'}</p>
            <h3 className="mt-2 font-display text-[2rem] font-semibold leading-none tracking-[-0.025em] text-jade">{isNl ? 'November – maart' : 'November – March'}</h3>
            <p className="mt-4 max-w-[18rem] text-xs leading-6 text-charcoal/58">
              {isNl
                ? 'Dit is meestal de prettigste periode voor strand- en bootdagen. Ook dan blijft het verstandig om de lokale verwachting en waarschuwingen te controleren.'
                : 'This is usually the most comfortable period for beach and boat days. Local forecasts and warnings still matter.'}
            </p>
            <Link href="/city/krabi/weather/" className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-jade transition hover:text-saffron-dark">
              {isNl ? 'Lees de seizoensgids' : 'Read the seasonal guide'} <ArrowRight size={14} />
            </Link>
          </aside>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-end gap-x-5 gap-y-3 text-xs font-bold text-jade">
          <Link href="/city/krabi/weather/" className="inline-flex items-center gap-2 transition hover:text-saffron-dark">
            {isNl ? 'Het weer in Krabi per maand' : 'Krabi weather by month'} <ArrowRight size={14} />
          </Link>
          <Link href="/city/krabi/weather/" className="inline-flex items-center gap-2 transition hover:text-saffron-dark">
            {isNl ? 'Lees de beste-reistijdgids' : 'Read the best-time guide'} <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
