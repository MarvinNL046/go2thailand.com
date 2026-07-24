import Link from 'next/link';
import { ArrowRight, CarFront, CloudSun, ShieldCheck, WalletCards } from 'lucide-react';

interface CityPracticalCardsProps {
  isNl: boolean;
}

const practicalItems = [
  {
    title: { nl: 'Vervoer', en: 'Transport' },
    description: {
      nl: 'Vanaf de luchthaven van Krabi reis je per transfer, taxi of gedeeld vervoer naar Ao Nang of Krabi Town. De reistijd hangt af van je eindadres en het verkeer.',
      en: 'Travel from Krabi Airport to Ao Nang or Krabi Town by transfer, taxi or shared transport. Journey time depends on your destination and traffic.',
    },
    href: '/transport/',
    icon: CarFront,
  },
  {
    title: { nl: 'Budget', en: 'Budget' },
    description: {
      nl: 'Je keuze van uitvalsbasis, boottochten en transfers bepaalt een groot deel van je budget. Lokale eetplekken en gedeelde excursies houden de kosten lager.',
      en: 'Krabi suits almost every budget. Save with local food, shared tours and one practical base.',
    },
    href: '/city/krabi/budget/',
    icon: WalletCards,
  },
  {
    title: { nl: 'Veiligheid', en: 'Safety' },
    description: {
      nl: 'Let op verkeer, sterke zon, zeestromingen, natte paden en veranderende omstandigheden op het water. Volg lokale waarschuwingen bij boottochten.',
      en: 'Pay attention to traffic, strong sun, sea currents, wet trails and changing conditions on the water. Follow local warnings for boat trips.',
    },
    href: '/practical-info/scams-safety/',
    icon: ShieldCheck,
  },
  {
    title: { nl: 'Weer', en: 'Weather' },
    description: {
      nl: 'November tot maart geeft meestal de beste kans op droger weer. Van mei tot oktober zijn buien, wind en een ruigere zee waarschijnlijker.',
      en: 'November to March generally offers the best chance of drier weather. Showers, wind and rougher seas are more likely from May to October.',
    },
    href: '/city/krabi/weather/',
    icon: CloudSun,
  },
] as const;

export function CityPracticalCards({ isNl }: CityPracticalCardsProps) {
  return (
    <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-14">
      <div className="container-custom">
        <div className="mb-7">
          <p className="eyebrow">{isNl ? 'Handig om te weten' : 'Good to know'}</p>
          <h2 className="font-display text-[2.8rem] font-semibold leading-none tracking-[-0.035em] text-jade sm:text-[3.25rem]">
              {isNl ? 'Praktische tips voor Krabi' : 'Practical tips for Krabi'}
          </h2>
        </div>

        <div className="scrollbar-hide flex snap-x gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4">
          {practicalItems.map(item => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title.en}
                href={item.href}
                className="group flex min-h-[12.5rem] min-w-[86vw] snap-start items-start gap-4 rounded-xl border border-jade/10 bg-white p-5 shadow-[0_5px_18px_rgba(18,63,54,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:min-w-0 sm:gap-5 sm:p-6"
              >
                <Icon size={43} strokeWidth={1.45} className="mt-0.5 shrink-0 text-jade transition group-hover:text-saffron-dark" />
                <div className="flex min-h-[9.5rem] flex-1 flex-col">
                  <h3 className="font-display text-[1.4rem] font-semibold leading-none tracking-[-0.02em] text-jade">{isNl ? item.title.nl : item.title.en}</h3>
                  <p className="mt-2.5 text-[11px] leading-[1.65] text-charcoal/58">{isNl ? item.description.nl : item.description.en}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-4 text-[11px] font-bold text-jade transition group-hover:text-saffron-dark">
                    {isNl ? 'Lees meer' : 'Read more'} <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
