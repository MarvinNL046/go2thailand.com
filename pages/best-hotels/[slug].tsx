import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import ClusterNav from '../../components/ClusterNav';
import AffiliateBox from '../../components/AffiliateBox';
import IntentInternalLinks, { IntentInternalLinkItem } from '../../components/IntentInternalLinks';
import type { HotelsPage, ClusterHotel } from '../../lib/cluster-types';
import { getAffiliates, CityAffiliates, TRIP_GENERIC, withPlacementSubId } from '../../lib/affiliates';
import HotelGuideTemplate from '../../components/hotels/HotelGuideTemplate';
import type { HotelGuideData } from '../../data/hotels/types';
import { nlAttractionsOwner, nlCityOwner } from '../../lib/nl-route-owners';
import { normalizeEnInternalHref } from '../../lib/en-route-owners';
// NOTE: clusters.ts imported dynamically in getStaticPaths/Props to avoid bundling 'fs' client-side

interface Props {
  data: HotelsPage | null;
  affiliates: CityAffiliates | null;
  relatedLinks: IntentInternalLinkItem[];
  redesignData: HotelGuideData | null;
  hotelDetailSlugs: Record<string, string>;
  hotelGuideLinks: Array<{ href: string; label: string }>;
}

const categoryConfig = {
  budget: {
    label: 'Budget Hotels',
    accent: 'text-green-700',
    badgeBg: 'bg-green-100 text-green-700',
    borderTop: 'border-t-4 border-green-500',
    heading: 'green-700',
    icon: '💚',
    priceContext: 'great value',
  },
  'mid-range': {
    label: 'Mid-Range Hotels',
    accent: 'text-blue-700',
    badgeBg: 'bg-blue-100 text-blue-700',
    borderTop: 'border-t-4 border-blue-500',
    heading: 'blue-700',
    icon: '💙',
    priceContext: 'comfort without splashing out',
  },
  boutique: {
    label: 'Boutique Hotels',
    accent: 'text-saffron-dark',
    badgeBg: 'bg-orange-50 text-saffron-dark',
    borderTop: 'border-t-4 border-saffron',
    heading: 'saffron-dark',
    icon: '✦',
    priceContext: 'character-led stays',
  },
  luxury: {
    label: 'Luxury Hotels',
    accent: 'text-amber-700',
    badgeBg: 'bg-amber-100 text-amber-700',
    borderTop: 'border-t-4 border-amber-500',
    heading: 'amber-700',
    icon: '✨',
    priceContext: 'world-class experiences',
  },
};

// Editorial descriptions for each price tier, keyed by category
const categoryEditorial: Record<string, { what: string; who: string; tipLine: string }> = {
  budget: {
    what:
      'Budget accommodation in Thailand punches far above its weight class. Even at the lower end of the price range, you can expect air-conditioning, hot water, a reasonably comfortable bed and often a social common area. The gap between Thailand\'s budget hotels and those in Europe or North America is significant — expectations are higher here.',
    who:
      'Budget properties suit solo travellers happy with compact rooms, backpackers who spend most of the day outside, and anyone prioritising location and price over extra space. A well-chosen budget hotel near a transit hub will serve you far better than a mediocre mid-range property in an inconvenient area.',
    tipLine:
      'Compare the live total for your dates, room type, cancellation terms and included breakfast before deciding which budget stay is genuinely better value.',
  },
  'mid-range': {
    what:
      'Mid-range hotels in Thailand represent exceptional value by global standards. In this bracket you can expect genuine swimming pools, proper lobby bars, room service, modern bathrooms with reliable hot water pressure, and the kind of attentive service that costs twice as much in equivalent European destinations. Many mid-range Thai hotels are genuinely 4-star by international standards.',
    who:
      'Mid-range suits couples, families, and anyone who wants to actually enjoy their hotel rather than just sleep in it. If you plan to spend any time at the property — working remotely, poolside afternoons, evening drinks — the upgrade from budget to mid-range is almost always worth the extra cost in Thailand.',
    tipLine:
      'Check the same room and cancellation conditions across the hotel site and a trusted booking provider; headline prices are not comparable when taxes or breakfast differ.',
  },
  boutique: {
    what:
      'Boutique stays trade chain consistency for character: restored houses, locally designed rooms, smaller resorts and settings that feel specific to the destination. The label says more about scale and identity than price.',
    who:
      'Boutique hotels suit travellers who value atmosphere, local design and a more personal base. Check room layouts and accessibility carefully because smaller or heritage properties can vary more from room to room.',
    tipLine:
      'Compare the exact room category, recent property information and live total for your dates; the most photogenic room is not automatically the room shown in the first rate.',
  },
  luxury: {
    what:
      'Thailand\'s luxury hotel scene is world-class. Properties like the Mandarin Oriental Bangkok or Four Seasons Chiang Mai consistently rank among the finest hotels on the planet, and even outside those trophy names the luxury tier delivers genuine five-star experiences — multiple pools, butler service, Michelin-adjacent restaurants and spa facilities — at prices well below equivalent properties in London, New York or Tokyo.',
    who:
      'Luxury properties suit honeymooners, travellers celebrating special occasions, and those who simply want the best available. If you are spending 10 or more nights in Thailand, one or two nights at a flagship luxury property can be the defining memory of the trip — especially at riverside properties where the setting amplifies everything.',
    tipLine:
      'Compare the complete stay: breakfast, transfers, lounge access, cancellation terms and room category can matter more than the first nightly figure shown.',
  },
};

// Build a simple neighbourhood narrative from hotel area data
function extractAreas(hotels: ClusterHotel[]): { area: string; categories: string[] }[] {
  const areaMap: Record<string, Set<string>> = {};
  for (const hotel of hotels) {
    if (!hotel.area) continue;
    if (!areaMap[hotel.area]) areaMap[hotel.area] = new Set();
    areaMap[hotel.area].add(hotel.category);
  }
  return Object.entries(areaMap).map(([area, cats]) => ({
    area,
    categories: Array.from(cats),
  }));
}

function categoryLabel(cat: string): string {
  if (cat === 'budget') return 'budget options';
  if (cat === 'mid-range') return 'mid-range comfort';
  if (cat === 'boutique') return 'boutique character';
  if (cat === 'luxury') return 'luxury properties';
  return cat;
}

function normalizeHotelName(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '');
}

function stableHotelIntro(value: string): string {
  const stableSentences = value
    .split(/(?<=[.!?])\s+/)
    .filter(sentence => !(
      /(?:THB|USD|EUR|\$|€)/i.test(sentence)
      || /\breal\s+(?:20\d{2}(?:\/20\d{2})?\s+)?prices?\b/i.test(sentence)
      || /\bprices?\s+(?:start|range|are|from)\b/i.test(sentence)
    ));
  return stableSentences.length ? stableSentences.join(' ') : value;
}

function stableMetaDescription(value: string): string {
  return value
    .replace(/\breal prices?(?:, locations)?(?: and honest (?:tips|reviews))?/gi, 'current-price links and honest guidance')
    .replace(/\bwith real prices?\b/gi, 'with current-price links');
}

function hotelGuideLabel(category: string): string {
  const labels: Record<string, string> = {
    budget: 'Budget stays',
    'mid-range': 'Mid-range comfort',
    boutique: 'Boutique stays',
    luxury: 'Luxury hotels',
    beachfront: 'Beachfront hotels',
    couples: 'Hotels for couples',
    family: 'Family hotels',
    'private-pool': 'Private-pool stays',
    'old-town': 'Old-town hotels',
    'all-inclusive': 'All-inclusive stays',
    resorts: 'Resorts',
  };
  return labels[category] || category.split('-').map(part => `${part.charAt(0).toUpperCase()}${part.slice(1)}`).join(' ');
}

function HotelCard({ hotel, citySlug, tripBaseUrl, detailSlug }: { hotel: ClusterHotel; citySlug: string; tripBaseUrl: string; detailSlug?: string }) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const conf = categoryConfig[hotel.category];
  const slugSegment = (hotel.name || 'hotel').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 50);
  const tripUrl = withPlacementSubId(tripBaseUrl, `best-hotels-${citySlug}`, `card-${slugSegment}`);
  return (
    <article className={`flex flex-col rounded-xl border border-jade/10 bg-white p-5 shadow-[0_7px_24px_rgba(18,63,54,0.05)] ${conf.borderTop}`}>
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="font-display text-[1.45rem] font-semibold leading-tight text-jade">{hotel.name}</h3>
        <span className={`shrink-0 rounded-md px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] ${conf.badgeBg}`}>
          {conf.label.replace(' Hotels', '')}
        </span>
      </div>
      <span className="mb-3 inline-flex w-fit items-center rounded-md bg-jade/[0.05] px-2.5 py-1 text-[10px] font-semibold text-jade/65">
        {hotel.area}
      </span>
      <p className="text-sm leading-6 text-charcoal/64">{hotel.description}</p>
      {hotel.bestFor && hotel.bestFor.length > 0 && (
        <p className="text-xs text-gray-400 mt-2">
          <span className="font-medium text-gray-500">{isNl ? 'Beste voor:' : 'Best for:'}</span> {hotel.bestFor.join(', ')}
        </p>
      )}
      {hotel.highlights && hotel.highlights.length > 0 && (
        <ul className="mt-3 space-y-1">
          {hotel.highlights.map((h, i) => (
            <li key={i} className="flex gap-2 text-sm text-gray-600">
              <span className={`${conf.accent} font-bold shrink-0`}>✓</span>
              {h}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-auto grid gap-2 border-t border-jade/8 pt-4 sm:grid-cols-2">
        {!isNl && detailSlug && (
          <Link
            href={`/hotel/${detailSlug}/`}
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-jade/18 px-3 text-xs font-bold text-jade transition hover:border-jade/35 hover:bg-jade/[0.04]"
          >
            Read hotel analysis →
          </Link>
        )}
        <a
          href={tripUrl}
          target="_blank"
          rel="noopener noreferrer nofollow sponsored"
          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-jade px-3 text-center text-xs font-bold text-white transition hover:bg-jade-dark"
        >
          {isNl ? 'Bekijk actuele prijs op Trip.com →' : 'Check current price on Trip.com →'}
        </a>
      </div>
    </article>
  );
}

const categoryOrder: ClusterHotel['category'][] = ['budget', 'mid-range', 'boutique', 'luxury'];

export default function BestHotelsPage({ data, affiliates, relatedLinks, redesignData, hotelDetailSlugs, hotelGuideLinks }: Props) {
  const { locale } = useRouter();
  if (redesignData) return <HotelGuideTemplate data={redesignData} />;
  if (!data) return null;

  const isNl = locale === 'nl';
  const attractionsHref = isNl ? nlAttractionsOwner(data.citySlug) : normalizeEnInternalHref(`/city/${data.citySlug}/attractions/`);
  const hasCityOwner = attractionsHref !== '/city/';
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: isNl ? 'Hotels' : 'Hotels', href: '/where-to-stay/' },
    { name: isNl ? `Hotels in ${data.cityName}` : `Hotels in ${data.cityName}`, href: `/best-hotels/${data.citySlug}/` },
  ];

  const grouped = categoryOrder.reduce<Record<string, ClusterHotel[]>>((acc, cat) => {
    acc[cat] = data.hotels.filter(h => h.category === cat);
    return acc;
  }, {} as Record<string, ClusterHotel[]>);

  const areas = extractAreas(data.hotels);
  const specialistHrefs = new Set(hotelGuideLinks.map(link => link.href));
  const remainingRelatedLinks = relatedLinks.filter(link => !specialistHrefs.has(link.href));

  return (
    <>
      <SEOHead title={data.seo.title} description={stableMetaDescription(data.seo.metaDescription)} />
      <div className="min-h-screen bg-[#fcfaf6]">

        {/* Hero — editorial intro */}
        <section className="section-divider-bottom relative overflow-hidden bg-[#fcfaf6] py-10 lg:py-16">
          <div className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:radial-gradient(circle_at_1px_1px,rgba(18,63,54,0.2)_1px,transparent_0)] [background-size:22px_22px]" />
          <div className="container-custom relative">
            <Breadcrumbs items={breadcrumbs} />
            <div className="mt-8 grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-end lg:gap-16">
              <div>
                <p className="eyebrow">Choose the stay, then verify the live rate</p>
                <h1 className="mt-3 max-w-4xl font-display text-[3.25rem] font-semibold leading-[0.9] tracking-[-0.045em] text-jade sm:text-[4.15rem] lg:text-[5rem]">
                  {isNl ? `Beste hotels in ${data.cityName}` : `Best hotels in ${data.cityName}`}
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-8 text-charcoal/66 sm:text-lg">
                  {stableHotelIntro(data.intro)}
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a href="#hotel-shortlist" className="inline-flex min-h-11 items-center rounded-lg bg-jade px-5 text-xs font-bold text-white transition hover:bg-jade-dark">
                    Compare the shortlist →
                  </a>
                  <Link href={`/where-to-stay/${data.citySlug}/`} className="inline-flex min-h-11 items-center rounded-lg border border-saffron/45 bg-white/70 px-5 text-xs font-bold text-saffron-dark transition hover:bg-white">
                    Choose your area →
                  </Link>
                </div>
              </div>

              <aside className="rounded-xl border border-jade/10 bg-white/82 p-6 shadow-[0_12px_35px_rgba(18,63,54,0.07)] backdrop-blur-sm">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-saffron-dark">Independent shortlist</p>
                <p className="mt-2 font-display text-[2.25rem] font-semibold leading-none text-jade">{data.hotels.length} stays compared</p>
                <p className="mt-4 text-sm leading-6 text-charcoal/60">Compare location, trade-offs and traveller fit here. Room prices change by date and room type, so every hotel card sends you to the provider for the current total.</p>
                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-jade/8 pt-4 text-[10px] font-semibold text-jade/70">
                  <span>No paid rankings</span>
                  <span>Current-price CTAs</span>
                  <span>Affiliate links labelled</span>
                </div>
              </aside>
            </div>
            <p className="mt-8 text-[10px] text-charcoal/42">
              {isNl ? 'Laatst bijgewerkt: ' : 'Last updated: '}{new Date(data.lastUpdated).toLocaleDateString(isNl ? 'nl-NL' : 'en-GB', { year: 'numeric', month: 'long' })}
              {data.sources && data.sources.length > 0 && ` · ${data.sources.length} ${isNl ? 'geverifieerde bronnen' : 'verified sources'}`}
            </p>
          </div>
        </section>

        <div className="container-custom py-8">
          <ClusterNav citySlug={data.citySlug} cityName={data.cityName} currentPage="hotels" />

          {/* Choosing your area — neighbourhood narrative */}
          {areas.length > 1 && (
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{isNl ? `Kies Je Wijk in ${data.cityName}` : `Choosing Your Area in ${data.cityName}`}</h2>
              <p className="text-gray-600 mb-6 max-w-2xl">
                {isNl ? `Locatie is de belangrijkste hotelbeslissing in ${data.cityName}. De juiste wijk bespaart tijd, verlaagt vervoerskosten en brengt je dichter bij de ervaringen waarvoor je komt.` : `Location is the single most important hotel decision in ${data.cityName}. The right neighbourhood saves time, reduces transport costs and puts you closer to the experiences you came for. Here is what each area offers.`}
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {areas.map((a, i) => (
                  <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-900 mb-1">{a.area}</h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {isNl ? 'Beschikbaar in deze gids: ' : 'Available in this guide: '}{a.categories.map(categoryLabel).join(' · ')}
                    </p>
                    <p className="text-sm text-gray-600">
                      {a.categories.includes('luxury') && a.categories.includes('mid-range')
                        ? `${a.area} suits travellers who want a full range of options — from solid mid-range comfort to flagship luxury properties. It is one of the more established hotel zones in ${data.cityName}.`
                        : a.categories.includes('luxury')
                        ? `${a.area} is home to some of ${data.cityName}'s finest hotel properties. Expect premium pricing but exceptional facilities, service and location payoff.`
                        : a.categories.includes('mid-range')
                        ? `${a.area} delivers good mid-range value with a genuine sense of local character. A reliable choice for travellers who want comfort without overpaying.`
                        : `${a.area} is a practical budget base — well placed for sightseeing and transport, with honest no-frills accommodation that won't drain your daily budget.`}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-4">
                {isNl ? `Wil je ook je dagen in ${data.cityName} plannen? ` : `For a deeper dive into ${data.cityName}'s neighbourhoods, `}
                <Link href={isNl ? nlCityOwner(data.citySlug) : `/where-to-stay/${data.citySlug}/`} className="text-thailand-blue hover:underline">
                  {isNl ? `Lees de complete reisgids voor ${data.cityName}` : 'read our full Where to Stay guide'}
                </Link>
                .
              </p>
            </section>
          )}

          {/* Hotel categories with editorial context */}
          {categoryOrder.map((cat, categoryIndex) => {
            const hotels = grouped[cat];
            if (!hotels || hotels.length === 0) return null;
            const conf = categoryConfig[cat];
            const editorial = categoryEditorial[cat];

            return (
              <section key={cat} id={categoryIndex === 0 ? 'hotel-shortlist' : undefined} className="mb-14 scroll-mt-28">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{conf.icon}</span>
                  <h2 className={`text-2xl font-bold ${conf.accent}`}>
                    {conf.label} in {data.cityName}
                  </h2>
                </div>

                {/* Editorial context for this tier */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-50 mb-6 max-w-3xl">
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">{editorial.what}</p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">{editorial.who}</p>
                  <p className="text-xs text-gray-400 italic border-t border-gray-100 pt-3">{editorial.tipLine}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  {hotels.map((hotel, i) => (
                    <HotelCard
                      key={i}
                      hotel={hotel}
                      citySlug={data.citySlug}
                      tripBaseUrl={affiliates?.trip ?? TRIP_GENERIC}
                      detailSlug={hotelDetailSlugs[normalizeHotelName(hotel.name)]}
                    />
                  ))}
                </div>
              </section>
            );
          })}

          {hotelGuideLinks.length > 0 && (
            <section className="section-divider-top mb-12 pt-10">
              <div className="mb-6 grid gap-3 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-12">
                <div>
                  <p className="eyebrow">Refine the shortlist</p>
                  <h2 className="mt-2 font-display text-[2.7rem] font-semibold leading-[0.94] tracking-[-0.035em] text-jade">Hotel guides for the way you travel.</h2>
                </div>
                <p className="max-w-2xl text-sm leading-7 text-charcoal/60">Open a focused guide when location, traveller type or stay style matters more than a single overall ranking.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {hotelGuideLinks.map(link => (
                  <Link key={link.href} href={link.href} className="group flex min-h-20 items-center justify-between rounded-xl border border-jade/10 bg-white px-5 py-4 shadow-[0_5px_18px_rgba(18,63,54,0.04)] transition hover:-translate-y-0.5 hover:border-saffron/35 hover:shadow-lg">
                    <span>
                      <span className="block text-[9px] font-bold uppercase tracking-[0.17em] text-saffron-dark">Specialist guide</span>
                      <span className="mt-1 block font-display text-xl font-semibold text-jade">{link.label}</span>
                    </span>
                    <span aria-hidden="true" className="text-jade transition group-hover:translate-x-1">→</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Affiliate box — once, below all hotel sections */}
          {affiliates && (
            <div className="mb-12">
              <AffiliateBox affiliates={affiliates} cityName={data.cityName} type="hotels" />
            </div>
          )}

          {/* Booking tips — editorial, not CTA */}
          {data.bookingTips && data.bookingTips.length > 0 && (
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{isNl ? `Slim Hotels Boeken in ${data.cityName}` : `How to Book Hotels in ${data.cityName} Smartly`}</h2>
              <p className="text-gray-600 mb-6 max-w-2xl">
                {isNl ? 'Een paar boekingsgewoonten scheiden reizigers die te veel betalen van degenen die dezelfde kamer 20-30% goedkoper krijgen.' : 'A few booking habits separate travellers who overpay from those who get the same room for 20–30% less. These tips come from years of booking Thai accommodation across all price points.'}
              </p>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <ul className="space-y-4">
                  {data.bookingTips.map((tip, i) => (
                    <li key={i} className="flex gap-3 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                      <span className="text-thailand-gold font-bold text-lg shrink-0 mt-0.5">{i + 1}.</span>
                      <span className="text-gray-700 leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Cluster links — pillar links DOWN to category/audience/area spokes for full hub-and-spoke topical authority */}
          {remainingRelatedLinks.length > 0 && (
            <div className="mb-12">
              <IntentInternalLinks
                title={isNl ? `Meer ${data.cityName} Hotelgidsen` : `More ${data.cityName} Hotel Guides`}
                links={remainingRelatedLinks}
              />
            </div>
          )}

          {/* Cross-links — additional manual entry points beyond the cluster mesh */}
          <section className="mb-12">
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                href={isNl ? nlCityOwner(data.citySlug) : `/where-to-stay/${data.citySlug}/`}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-thailand-blue/30 transition-all group"
              >
                <h3 className="font-bold text-gray-900 group-hover:text-thailand-blue mb-1">
                  {isNl ? `${data.cityName} reisgids` : `Where to Stay in ${data.cityName}`}
                </h3>
                <p className="text-sm text-gray-500">
                  {isNl ? 'Plan bezienswaardigheden, vervoer en de beste reisperiode vanuit één overzicht.' : 'Neighbourhood guide — find the best area for your trip style.'}
                </p>
                <span className="text-thailand-blue text-sm font-semibold mt-2 inline-block">
                  {isNl ? 'Lees gids →' : 'Read guide →'}
                </span>
              </Link>
              <Link
                href={attractionsHref}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-thailand-blue/30 transition-all group"
              >
                <h3 className="font-bold text-gray-900 group-hover:text-thailand-blue mb-1">
                  {isNl ? `Wat te doen in ${data.cityName}` : hasCityOwner ? `Things to Do in ${data.cityName}` : 'Explore Thailand destinations'}
                </h3>
                <p className="text-sm text-gray-500">
                  {isNl ? 'Vergelijk de belangrijkste bezienswaardigheden en bouw een logische dagplanning.' : hasCityOwner ? 'Compare the main attractions and turn them into a practical day plan.' : 'Compare published destination guides and choose the right base for your route.'}
                </p>
                <span className="text-thailand-blue text-sm font-semibold mt-2 inline-block">
                  {isNl ? 'Bekijk bezienswaardigheden →' : hasCityOwner ? 'Explore attractions →' : 'Browse destinations →'}
                </span>
              </Link>
            </div>
          </section>

          {/* Source attribution */}
          {data.sources && data.sources.length > 0 && (
            <section className="mb-10">
              <h2 className="text-lg font-bold text-gray-700 mb-3">{isNl ? 'Bronnen & Verificatie' : 'Sources & Verification'}</h2>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500 mb-3">
                  {isNl ? 'Hotelprijzen, reviewscores en details zijn verzameld en geverifieerd uit de volgende bronnen. Prijzen zijn indicatief en fluctueren — bevestig altijd bij het boeken.' : 'Hotel prices, review scores and details were gathered and verified from the following sources. Prices are indicative and fluctuate — always confirm at time of booking.'}
                </p>
                <ul className="space-y-1.5">
                  {data.sources.map((s, i) => (
                    <li key={i} className="text-sm text-gray-500 flex gap-2">
                      <span className="shrink-0">·</span>
                      <span>
                        <a
                          href={s.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          className="text-thailand-blue hover:underline"
                        >
                          {s.sourceName}
                        </a>
                        {s.lastVerified && (
                          <span className="text-gray-400 ml-1">
                            ({isNl ? 'geverifieerd' : 'verified'} {new Date(s.lastVerified).toLocaleDateString(isNl ? 'nl-NL' : 'en-GB', { year: 'numeric', month: 'long' })})
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          <ClusterNav citySlug={data.citySlug} cityName={data.cityName} currentPage="hotels" />
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Enumerate every published cluster city so all /best-hotels/[city]/ pages
  // are pre-rendered at build time. This matters because outputFileTracing
  // can't follow the dynamic `data/clusters/{slug}/hotels.json` reads in
  // getStaticProps — without pre-rendering, the deployed function bundle
  // omits the data files and every request returns notFound.
  const { getClusterCities, getHotelsPage } = await import('../../lib/clusters');
  const paths = getClusterCities()
    .filter(citySlug => getHotelsPage(citySlug) !== null)
    .map(citySlug => ({ params: { slug: citySlug } }));
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const { getHotelsPage } = await import('../../lib/clusters');
  const { getIntentInternalLinks } = await import('../../lib/intent-pages');
  const slug = params?.slug as string;
  let redesignData: HotelGuideData | null = null;
  if (locale === 'nl') {
    const { getNlHotelGuide } = await import('../../data/hotels/nl');
    redesignData = getNlHotelGuide(slug);
  }
  const data = getHotelsPage(slug);
  if (!data && !redesignData) return { notFound: true };
  const relatedLinks = data ? getIntentInternalLinks({
    pageType: 'best-hotels',
    city: slug,
    cityName: data.cityName,
  }) : [];
  const hotelDetailSlugs: Record<string, string> = {};
  const hotelGuideLinks: Array<{ href: string; label: string }> = [];
  if (locale !== 'nl' && data) {
    const { readdirSync, readFileSync } = await import('node:fs');
    const { join } = await import('node:path');
    const hotelDirectory = join(process.cwd(), 'data', 'pseo', 'hotels');
    for (const filename of readdirSync(hotelDirectory).filter(file => file.endsWith('.json'))) {
      const detail = JSON.parse(readFileSync(join(hotelDirectory, filename), 'utf8')) as {
        citySlug?: string;
        hotelSlug?: string;
        hotel?: { name?: string };
      };
      if (detail.citySlug === slug && detail.hotelSlug && detail.hotel?.name) {
        hotelDetailSlugs[normalizeHotelName(detail.hotel.name)] = detail.hotelSlug;
      }
    }
    const guideDirectory = join(process.cwd(), 'data', 'pseo', 'best-hotels');
    const guidePrefix = `${slug}-`;
    for (const filename of readdirSync(guideDirectory).filter(file => file.startsWith(guidePrefix) && file.endsWith('.json'))) {
      const category = filename.slice(guidePrefix.length, -'.json'.length);
      hotelGuideLinks.push({
        href: `/best-hotels/${slug}/${category}/`,
        label: hotelGuideLabel(category),
      });
    }
    hotelGuideLinks.sort((a, b) => a.label.localeCompare(b.label));
  }
  return {
    props: { data, affiliates: getAffiliates(slug), relatedLinks, redesignData, hotelDetailSlugs, hotelGuideLinks },
    revalidate: 604800,
  };
};
