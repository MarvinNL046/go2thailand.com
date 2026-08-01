import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BedDouble,
  BookOpenText,
  BusFront,
  CalendarDays,
  MapPinned,
  Sparkles,
  Utensils,
  WalletCards,
} from 'lucide-react';
import { normalizeEnInternalHref } from '../../lib/en-route-owners';
import { normalizeNlInternalHref } from '../../lib/nl-route-owners';

type HiddenGem = {
  name: string;
  story: string;
  how_to_find?: string;
  best_time?: string;
  local_insights?: string[];
};

type Experience = {
  name?: string;
  activity?: string;
  story: string;
  cultural_significance?: string;
  how_to_participate?: string;
  insights?: string[];
  href?: string;
  cta_label?: string;
};

type Attraction = {
  name: string;
  description: string;
  rank?: number;
  location?: string;
  entrance_fee?: string;
  highlights?: string[];
  href?: string;
  cta_label?: string;
};

type FoodAdventure = {
  name?: string;
  dish?: string;
  story: string;
  location?: string;
  where_to_find?: string;
  price_range?: string;
  ordering_tips?: string[];
  href?: string;
  cta_label?: string;
};

type Restaurant = {
  name: string;
  description: string;
  rank?: number;
  cuisine?: string;
  cuisine_type?: string;
  location?: string;
  price_range?: string;
  highlights?: string[];
  href?: string;
  cta_label?: string;
};

type Hotel = {
  name: string;
  description: string;
  rank?: number;
  price_range?: string;
  category?: string;
  area?: string;
  highlights?: string[];
  href?: string;
  cta_label?: string;
};

type Source = {
  type: string;
  title: string;
  creator: string;
  url: string;
  description?: string;
};

interface CityCompleteGuideProps {
  isNl: boolean;
  city: {
    slug: string;
    name: { en: string; nl: string };
    hidden_gems?: HiddenGem[];
    authentic_experiences?: Experience[];
    top_attractions?: Attraction[];
    foodie_adventures?: FoodAdventure[];
    top_restaurants?: Restaurant[];
    top_hotels?: Hotel[];
    thingsToDo?: string;
    whereToStay?: string;
    local_insights?: Array<string | { observation?: string; tip?: string; surprise?: string }>;
    travel_tips?: string[];
    safetyTips?: string;
    seasonal_secrets?: string | { best_season?: string; why?: string; insider_tips?: string[] };
    budget_reality?: string | { budget?: string; mid_range?: string; luxury?: string; money_saving_tricks?: string[] };
    categories: {
      food: { en: string; nl: string };
      hotels: { en: string; nl: string };
      attractions: { en: string; nl: string };
    };
    tags: string[];
    contentSources?: Source[];
    reviewed_by?: string;
  };
  comparisons: Array<{ slug: string; otherName: { en: string; nl: string } }>;
  transportLinks: Array<{ slug: string; otherName: string; distance: string; modes: string[] }>;
  reviewedDate: string | null;
}

function ArrowLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="inline-flex items-center gap-2 text-xs font-bold text-jade transition hover:text-saffron-dark">
      {children} <ArrowRight size={14} />
    </Link>
  );
}

function SectionHeading({ eyebrow, title, description, light = false }: { eyebrow: string; title: string; description?: string; light?: boolean }) {
  return (
    <div className="max-w-3xl">
      <p className={light ? 'text-[10px] font-bold uppercase tracking-[0.24em] text-saffron-light' : 'eyebrow'}>{eyebrow}</p>
      <h2 className={`font-display text-[2.8rem] font-semibold leading-[0.98] tracking-[-0.035em] sm:text-[3.35rem] ${light ? 'text-white' : 'text-jade'}`}>{title}</h2>
      {description && <p className={`mt-4 max-w-2xl text-sm leading-6 ${light ? 'text-white/65' : 'text-charcoal/68'}`}>{description}</p>}
    </div>
  );
}

export function CityCompleteGuide({ city, comparisons, transportLinks, reviewedDate, isNl }: CityCompleteGuideProps) {
  const cityName = isNl ? city.name.nl || city.name.en : city.name.en;
  const uniqueRoutes = transportLinks.filter((route, index, routes) => routes.findIndex(item => item.otherName === route.otherName) === index);
  const featuredComparisons = comparisons.slice(0, 6);
  const moreComparisons = comparisons.slice(6);
  const displayedSources = (city.contentSources || []).filter(source => source.type !== 'hotel' && source.type !== 'restaurant');
  const modeLabels: Record<string, string> = {
    flight: 'vliegtuig',
    bus: 'bus',
    taxi: 'taxi',
    car: 'auto',
    ferry: 'veerboot',
    train: 'trein',
  };
  const explore = [
    { icon: Utensils, title: isNl ? 'Eten & drinken' : 'Food & dining', description: isNl ? city.categories.food.nl || city.categories.food.en : city.categories.food.en, href: `/city/${city.slug}/food/` },
    { icon: BedDouble, title: isNl ? 'Hotels & verblijf' : 'Hotels & stays', description: isNl ? city.categories.hotels.nl || city.categories.hotels.en : city.categories.hotels.en, href: `/best-hotels/${city.slug}/` },
    { icon: MapPinned, title: isNl ? 'Bezienswaardigheden' : 'Attractions', description: isNl ? city.categories.attractions.nl || city.categories.attractions.en : city.categories.attractions.en, href: `/city/${city.slug}/attractions/` },
    { icon: CalendarDays, title: isNl ? 'Beste reistijd' : 'Best time to visit', description: isNl ? 'Weer, seizoenen en het beste reismoment.' : 'Weather, seasons and the best time to travel.', href: `/city/${city.slug}/best-time-to-visit/` },
    { icon: WalletCards, title: isNl ? 'Budget' : 'Budget', description: isNl ? 'Dagbudgetten en slimme bespaartips.' : 'Daily budgets and smart saving tips.', href: `/city/${city.slug}/budget/` },
  ];

  return (
    <div className="bg-[#fcfaf6]">
      <section id="andere-krabi" className="section-divider-bottom scroll-mt-24 py-14 lg:py-20">
        <div className="container-custom">
          <SectionHeading
            eyebrow={isNl ? 'Verder dan de bekende route' : 'Beyond the familiar route'}
            title={isNl ? 'Ontdek het andere Krabi' : 'Discover another side of Krabi'}
            description={isNl ? 'Plekken en ervaringen die de provincie meer diepte geven dan alleen stranden en eilandboten.' : 'Places and experiences that give the province more depth than beaches and island boats alone.'}
          />

          <div className="mt-9 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-[28rem] overflow-hidden rounded-2xl">
              <Image src="/images/cities/krabi/attractions/tiger cave temple.webp" alt="Tiger Cave Temple in Krabi" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 42vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-jade-dark via-jade-dark/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 text-white sm:p-9">
                <Sparkles size={21} className="text-saffron-light" />
                <p className="mt-4 font-display text-3xl font-semibold leading-tight">{isNl ? 'Kijk voorbij de kustlijn.' : 'Look beyond the coastline.'}</p>
                <p className="mt-2 max-w-md text-xs leading-5 text-white/68">{isNl ? 'Tempels, mangroven, dorpen en het dagelijkse ritme van Krabi Town.' : 'Temples, mangroves, villages and the everyday rhythm of Krabi Town.'}</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {(city.hidden_gems || []).map((gem, index) => (
                <article key={gem.name} className={`rounded-2xl border border-jade/10 bg-white p-6 shadow-[0_6px_22px_rgba(18,63,54,0.04)] ${index === 2 ? 'sm:col-span-2' : ''}`}>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-saffron-dark">0{index + 1}</span>
                  <h3 className="mt-3 font-display text-2xl font-semibold leading-tight text-jade">{gem.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-charcoal/72">{gem.story}</p>
                  {(gem.how_to_find || gem.best_time) && (
                    <div className="mt-5 grid gap-2 text-[11px] leading-5 text-charcoal/62 sm:grid-cols-2">
                      {gem.how_to_find && <p className="rounded-lg bg-[#faf7f0] p-3"><strong className="block text-jade">{isNl ? 'Zo vind je het' : 'How to find it'}</strong>{gem.how_to_find}</p>}
                      {gem.best_time && <p className="rounded-lg bg-[#faf7f0] p-3"><strong className="block text-jade">{isNl ? 'Beste moment' : 'Best time'}</strong>{gem.best_time}</p>}
                    </div>
                  )}
                  {gem.local_insights && gem.local_insights.length > 0 && (
                    <div className="mt-4 border-t border-jade/10 pt-4">
                      <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-saffron-dark">{isNl ? 'Lokale blik' : 'Local perspective'}</p>
                      <ul className="mt-2 space-y-1.5 text-[11px] leading-5 text-charcoal/58">
                        {gem.local_insights.map(insight => <li key={insight} className="flex gap-2"><span className="text-saffron-dark">•</span><span>{insight}</span></li>)}
                      </ul>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <ArrowLink href={`/city/${city.slug}/attractions/`}>{isNl ? 'Bekijk alle bezienswaardigheden in Krabi' : 'View all attractions in Krabi'}</ArrowLink>
          </div>
        </div>
      </section>

      <section id="eten-in-krabi" className="scroll-mt-24 bg-jade-dark py-14 text-white lg:py-20">
        <div className="container-custom">
          <div className="grid gap-9 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
            <SectionHeading
              eyebrow={isNl ? 'Proef de provincie' : 'Taste the province'}
              title={isNl ? 'Eten in Krabi' : 'Food in Krabi'}
              description={isNl ? 'Combineer eten op de markt, een lokale lunch en één bijzondere avond. Zo wordt eten echt onderdeel van je reis.' : 'Combine market food, a local lunch and one special evening so food becomes part of the journey.'}
              light
            />
            <div className="relative h-72 overflow-hidden rounded-2xl border border-white/10 sm:h-80">
              <Image src="/images/food/southern.webp" alt="Southern Thai food" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 58vw" />
              <div className="absolute inset-0 bg-gradient-to-r from-jade-dark/50 to-transparent" />
            </div>
          </div>

          <div className="mt-9 grid gap-4 md:grid-cols-2">
            {(city.foodie_adventures || []).slice(0, 3).map((food, index) => (
              <article key={food.dish || food.name} className="rounded-xl border border-white/12 bg-white/[0.07] p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-saffron-light">{food.location || `Stop ${index + 1}`}</span>
                  {food.price_range && <span className="rounded-full bg-white/8 px-3 py-1 text-[10px] text-white/65">{food.price_range}</span>}
                </div>
                <h3 className="mt-3 font-display text-2xl font-semibold text-white">{food.name || food.dish}</h3>
                <p className="mt-3 text-xs leading-5 text-white/62">{food.story}</p>
                {(food.where_to_find || (food.ordering_tips && food.ordering_tips.length > 0)) && (
                  <details className="group mt-4 border-t border-white/10 pt-3">
                    <summary className="flex cursor-pointer list-none items-center justify-between text-[10px] font-bold uppercase tracking-[0.13em] text-white/72 [&::-webkit-details-marker]:hidden">
                      {isNl ? 'Bestellen als een local' : 'Order like a local'} <span className="text-saffron-light group-open:rotate-45">+</span>
                    </summary>
                    <div className="mt-3 space-y-2 text-[11px] leading-5 text-white/58">
                      {food.where_to_find && <p>{food.where_to_find}</p>}
                      {food.ordering_tips?.map(tip => <p key={tip} className="border-l border-saffron-light/50 pl-3">{tip}</p>)}
                    </div>
                  </details>
                )}
                {food.href && <Link href={isNl ? normalizeNlInternalHref(food.href) : food.href} className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-saffron-light">{food.cta_label || (isNl ? 'Meer informatie' : 'More information')} <ArrowRight size={14} /></Link>}
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-end gap-x-5 gap-y-3 border-t border-white/10 pt-7 text-xs font-bold text-saffron-light">
            <Link href={`/city/${city.slug}/food/`} className="inline-flex items-center gap-2">{isNl ? 'Lees de gids over eten in Krabi' : 'Read the Krabi food guide'} <ArrowRight size={14} /></Link>
            <Link href={isNl ? `/city/${city.slug}/food/` : `/city/${city.slug}/top-10-restaurants/`} className="inline-flex items-center gap-2">{isNl ? 'Bekijk de restaurantgids' : 'View the restaurant guide'} <ArrowRight size={14} /></Link>
          </div>
        </div>
      </section>

      <section id="verder-plannen" className="section-divider-top scroll-mt-24 py-14 lg:py-20">
        <div className="container-custom">
          <SectionHeading eyebrow={isNl ? 'Plan verder' : 'Continue planning'} title={isNl ? `Meer uit je ${cityName}-reis halen` : `Get more from your ${cityName} trip`} />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {explore.map(({ icon: Icon, title, description, href }) => (
              <Link key={title} href={isNl ? normalizeNlInternalHref(href) : normalizeEnInternalHref(href)} className="group rounded-xl border border-jade/10 bg-white p-5 transition hover:-translate-y-0.5 hover:border-saffron/35">
                <Icon size={21} strokeWidth={1.55} className="text-saffron-dark" />
                <h3 className="mt-4 font-display text-xl font-semibold text-jade">{title}</h3>
                <p className="mt-2 line-clamp-3 text-[11px] leading-5 text-charcoal/58">{description}</p>
                <ArrowRight size={14} className="mt-4 text-jade transition group-hover:translate-x-1" />
              </Link>
            ))}
          </div>

          {(comparisons.length > 0 || uniqueRoutes.length > 0) && (
            <div className="mt-12 grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
              <div>
                <h3 className="font-display text-3xl font-semibold text-jade">{isNl ? 'Vergelijk bestemmingen' : 'Compare destinations'}</h3>
                <div className="mt-5 space-y-2">{featuredComparisons.map(comparison => <Link key={comparison.slug} href={`/compare/${comparison.slug}/`} className="flex items-center justify-between rounded-lg border border-jade/10 bg-white px-4 py-3 text-xs font-bold text-jade transition hover:border-saffron/35"><span>Krabi <span className="font-normal text-charcoal/38">vs</span> {isNl ? comparison.otherName.nl || comparison.otherName.en : comparison.otherName.en}</span><ArrowRight size={13} /></Link>)}</div>
                {moreComparisons.length > 0 && (
                  <details className="group mt-3 rounded-lg border border-jade/10 bg-white">
                    <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-xs font-bold text-jade [&::-webkit-details-marker]:hidden">
                      <span>{isNl ? `${moreComparisons.length} andere bestemmingen` : `${moreComparisons.length} other destinations`}</span>
                      <span className="text-saffron-dark group-open:rotate-45">+</span>
                    </summary>
                    <div className="space-y-1 border-t border-jade/10 p-2">
                      {moreComparisons.map(comparison => <Link key={comparison.slug} href={`/compare/${comparison.slug}/`} className="flex items-center justify-between rounded-md px-3 py-2.5 text-[11px] font-bold text-jade transition hover:bg-[#faf7f0]"><span>Krabi <span className="font-normal text-charcoal/38">vs</span> {isNl ? comparison.otherName.nl || comparison.otherName.en : comparison.otherName.en}</span><ArrowRight size={12} /></Link>)}
                    </div>
                  </details>
                )}
              </div>
              <div>
                <h3 className="font-display text-3xl font-semibold text-jade">{isNl ? 'Verder reizen vanuit Krabi' : 'Travel onward from Krabi'}</h3>
                <div className="mt-5 grid gap-2 sm:grid-cols-2">{uniqueRoutes.map(route => <Link key={route.slug} href={`/transport/${route.slug}/`} className="rounded-lg border border-jade/10 bg-white px-4 py-3 transition hover:border-saffron/35"><span className="flex items-center justify-between text-xs font-bold text-jade"><span className="flex items-center gap-2"><BusFront size={14} className="text-saffron-dark" /> Krabi → {route.otherName}</span><span className="text-[10px] font-normal text-charcoal/42">{route.distance}</span></span><span className="mt-2 block text-[10px] text-charcoal/48">{route.modes.map(mode => isNl ? modeLabels[mode] || mode : mode).join(' · ')}</span></Link>)}</div>
              </div>
            </div>
          )}

          {displayedSources.length > 0 && (
            <details className="group mt-12 rounded-xl border border-jade/10 bg-white">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 [&::-webkit-details-marker]:hidden">
                <span className="flex items-center gap-3"><BookOpenText size={18} className="text-saffron-dark" /><span><strong className="block font-display text-xl font-semibold text-jade">{isNl ? 'Bronnen & redactie' : 'Sources & editorial'}</strong><span className="text-[10px] text-charcoal/48">{displayedSources.length} {isNl ? 'bronnen gebruikt' : 'sources used'} · {city.reviewed_by || 'Go2Thailand Editorial Team'} · {isNl ? 'bijgewerkt' : 'updated'} {reviewedDate || ''}</span></span></span>
                <span className="text-xs font-bold text-jade group-open:hidden">{isNl ? 'Bekijken' : 'View'}</span>
                <span className="hidden text-xs font-bold text-jade group-open:block">{isNl ? 'Sluiten' : 'Close'}</span>
              </summary>
              <div className="grid gap-2 border-t border-jade/10 p-5 sm:grid-cols-2">
                {displayedSources.map(source => <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-[#faf7f0] px-4 py-3 text-xs text-charcoal/62 transition hover:text-jade"><strong className="block text-jade">{source.title}</strong><span className="mt-1 block text-[10px]">{source.creator}</span>{source.description && <span className="mt-2 block text-[10px] leading-4 text-charcoal/48">{source.description}</span>}</a>)}
              </div>
            </details>
          )}
        </div>
      </section>
    </div>
  );
}
