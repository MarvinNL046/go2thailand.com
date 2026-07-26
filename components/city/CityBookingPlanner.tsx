import { ArrowUpRight, BedDouble, BusFront, MapPinned, Smartphone } from 'lucide-react';

interface CityBookingPlannerProps {
  cityName?: string;
  hotelsHref: string;
  activitiesHref: string;
  transportHref: string;
  esimHref: string;
  isNl: boolean;
}

const AFFILIATE_REL = 'noopener noreferrer nofollow sponsored';

export function CityBookingPlanner({
  cityName = 'Krabi',
  hotelsHref,
  activitiesHref,
  transportHref,
  esimHref,
  isNl,
}: CityBookingPlannerProps) {
  const activityDescription = isNl
    ? 'Eilandtours, natuur en lokale belevenissen.'
    : ({
        Bangkok: 'Temple, food, river and local experiences.',
        'Chiang Mai': 'Temple, food, mountain and local experiences.',
        Phuket: 'Beach, boat, Old Town and local experiences.',
        Ayutthaya: 'Temple, heritage, river and local experiences.',
        Krabi: 'Island, coast, nature and local experiences.',
      }[cityName] || 'Tours, culture, nature and local experiences.');
  const transportDescription = isNl
    ? 'Veerboten, transfers, bussen en treinen.'
    : ({
        Bangkok: 'Airport, train, bus and onward connections.',
        'Chiang Mai': 'Airport, train, bus and onward connections.',
        Phuket: 'Airport, ferry, transfer and onward connections.',
        Ayutthaya: 'Train, transfer and Bangkok return connections.',
        Krabi: 'Ferry, transfer, bus and onward connections.',
      }[cityName] || 'Transfers, buses, trains and onward connections.');
  const items = [
    {
      icon: BedDouble,
      eyebrow: 'Trip.com',
      title: isNl ? 'Vind je verblijf' : 'Find your stay',
      description: isNl ? `Vergelijk hotels en resorts in ${cityName}.` : `Compare hotels and stays in ${cityName}.`,
      href: hotelsHref,
    },
    {
      icon: MapPinned,
      eyebrow: 'Klook',
      title: isNl ? 'Boek een ervaring' : 'Book an experience',
      description: activityDescription,
      href: activitiesHref,
    },
    {
      icon: BusFront,
      eyebrow: '12Go',
      title: isNl ? 'Regel je vervoer' : 'Arrange transport',
      description: transportDescription,
      href: transportHref,
    },
    {
      icon: Smartphone,
      eyebrow: 'Saily',
      title: isNl ? 'Blijf verbonden' : 'Stay connected',
      description: isNl ? 'Installeer je Thailand eSIM voor vertrek.' : 'Install your Thailand eSIM before departure.',
      href: esimHref,
    },
  ];

  return (
    <section className="section-divider-bottom bg-[#fcfaf6] py-12 lg:py-14">
      <div className="container-custom">
        <div className="relative overflow-hidden rounded-2xl bg-jade-dark px-6 py-8 text-white sm:px-9 lg:px-12 lg:py-10">
          <div className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -right-8 -top-16 h-56 w-56 rounded-full border border-saffron/25" />
          <div className="pointer-events-none absolute bottom-0 left-[29%] hidden h-px w-[16%] border-t border-dashed border-saffron/45 lg:block" />

          <div className="relative grid gap-8 lg:grid-cols-[0.72fr_1.5fr] lg:items-center lg:gap-12">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-saffron-light">
                {isNl ? 'Alles geregeld' : 'Everything arranged'}
              </p>
              <h2 className="mt-3 max-w-md font-display text-[2.5rem] font-semibold leading-[0.98] tracking-[-0.035em] sm:text-[3rem]">
                {isNl ? `Maak je ${cityName}-reis compleet.` : `Complete your ${cityName} trip.`}
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-6 text-white/68">
                {isNl
                  ? 'Boek bij onze vertrouwde partners en houd meer tijd over voor het avontuur.'
                  : 'Book with our trusted partners and save more time for the adventure.'}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {items.map(({ icon: Icon, eyebrow, title, description, href }) => (
                <a
                  key={eyebrow}
                  href={href}
                  target="_blank"
                  rel={AFFILIATE_REL}
                  className="group flex min-h-[8.8rem] items-start gap-4 rounded-xl border border-white/12 bg-white/[0.075] p-5 backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-saffron/45 hover:bg-white/[0.12]"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-saffron/30 bg-saffron/10 text-saffron-light">
                    <Icon size={22} strokeWidth={1.55} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[9px] font-bold uppercase tracking-[0.2em] text-saffron-light/85">{eyebrow}</span>
                    <span className="mt-1.5 flex items-center justify-between gap-3 font-display text-xl font-semibold leading-tight">
                      {title}
                      <ArrowUpRight className="shrink-0 text-saffron-light transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" size={17} />
                    </span>
                    <span className="mt-2 block text-xs leading-5 text-white/62">{description}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>

          <p className="relative mt-6 text-[9px] leading-relaxed text-white/38 lg:ml-auto lg:max-w-[63%]">
            {isNl
              ? 'Affiliate links — bij een boeking ontvangen wij mogelijk een commissie, zonder extra kosten voor jou.'
              : 'Affiliate links — we may receive a commission when you book, at no extra cost to you.'}
          </p>
        </div>
      </div>
    </section>
  );
}
