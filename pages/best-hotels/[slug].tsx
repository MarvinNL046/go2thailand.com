import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import ClusterNav from '../../components/ClusterNav';
import AffiliateBox from '../../components/AffiliateBox';
import type { HotelsPage, ClusterHotel } from '../../lib/cluster-types';
import { getAffiliates, CityAffiliates } from '../../lib/affiliates';
// NOTE: clusters.ts imported dynamically in getStaticPaths/Props to avoid bundling 'fs' client-side

interface Props {
  data: HotelsPage;
  affiliates: CityAffiliates | null;
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
      'Look for properties that include breakfast — even a basic Thai breakfast of toast, eggs and fruit juice saves 80–120 THB per person per day and is frequently offered at the better budget guesthouses.',
  },
  'mid-range': {
    what:
      'Mid-range hotels in Thailand represent exceptional value by global standards. In this bracket you can expect genuine swimming pools, proper lobby bars, room service, modern bathrooms with reliable hot water pressure, and the kind of attentive service that costs twice as much in equivalent European destinations. Many mid-range Thai hotels are genuinely 4-star by international standards.',
    who:
      'Mid-range suits couples, families, and anyone who wants to actually enjoy their hotel rather than just sleep in it. If you plan to spend any time at the property — working remotely, poolside afternoons, evening drinks — the upgrade from budget to mid-range is almost always worth the extra cost in Thailand.',
    tipLine:
      'Book direct or via Agoda for mid-range Thai hotels — rates are frequently 10–15% lower than Booking.com, and many properties include room upgrades or late checkout for direct bookers.',
  },
  luxury: {
    what:
      'Thailand\'s luxury hotel scene is world-class. Properties like the Mandarin Oriental Bangkok or Four Seasons Chiang Mai consistently rank among the finest hotels on the planet, and even outside those trophy names the luxury tier delivers genuine five-star experiences — multiple pools, butler service, Michelin-adjacent restaurants and spa facilities — at prices well below equivalent properties in London, New York or Tokyo.',
    who:
      'Luxury properties suit honeymooners, travellers celebrating special occasions, and those who simply want the best available. If you are spending 10 or more nights in Thailand, one or two nights at a flagship luxury property can be the defining memory of the trip — especially at riverside properties where the setting amplifies everything.',
    tipLine:
      'Luxury hotel breakfast buffets in Thailand can cost 600–1,200 THB per person — often a third of the room rate. If the hotel is in an area with good street food nearby (it often is), skipping breakfast is a legitimate saving without sacrificing quality.',
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
  if (cat === 'luxury') return 'luxury properties';
  return cat;
}

function HotelCard({ hotel }: { hotel: ClusterHotel }) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const conf = categoryConfig[hotel.category];
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-5 ${conf.borderTop}`}>
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="font-bold text-gray-900 text-lg leading-tight">{hotel.name}</h3>
        <span className={`shrink-0 text-sm font-semibold px-3 py-1 rounded-full ${conf.badgeBg}`}>
          {hotel.priceRange}
        </span>
      </div>
      <span className="inline-block text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full mb-3">
        {hotel.area}
      </span>
      <p className="text-gray-600 text-sm leading-relaxed">{hotel.description}</p>
      {hotel.bestFor && hotel.bestFor.length > 0 && (
        <p className="text-xs text-gray-400 mt-2">
          <span className="font-medium text-gray-500">{isNl ? 'Beste voor:' : 'Best for:'}</span> {hotel.bestFor.join(', ')}
        </p>
      )}
      {hotel.reviewScore && (
        <p className="text-sm font-semibold text-green-700 mt-2">
          {hotel.reviewScore} {isNl ? 'gastscore' : 'guest score'}
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
    </div>
  );
}

const categoryOrder: Array<'budget' | 'mid-range' | 'luxury'> = ['budget', 'mid-range', 'luxury'];

export default function BestHotelsPage({ data, affiliates }: Props) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: isNl ? 'Beste Hotels' : 'Best Hotels', href: '/best-hotels/' },
    { name: isNl ? `Hotels in ${data.cityName}` : `Hotels in ${data.cityName}`, href: `/best-hotels/${data.citySlug}/` },
  ];

  const grouped = categoryOrder.reduce<Record<string, ClusterHotel[]>>((acc, cat) => {
    acc[cat] = data.hotels.filter(h => h.category === cat);
    return acc;
  }, {} as Record<string, ClusterHotel[]>);

  const areas = extractAreas(data.hotels);

  return (
    <>
      <SEOHead title={data.seo.title} description={data.seo.metaDescription} />
      <div className="bg-surface-cream min-h-screen">

        {/* Hero — editorial intro */}
        <section className="bg-white shadow-sm">
          <div className="container-custom py-10">
            <Breadcrumbs items={breadcrumbs} />
            <h1 className="text-4xl lg:text-5xl font-bold font-heading text-gray-900 mb-6">
              {isNl ? `Beste Hotels in ${data.cityName} (2026)` : `Best Hotels in ${data.cityName} (2026)`}
            </h1>
            <div className="max-w-3xl">
              <p className="text-xl text-gray-700 leading-relaxed mb-4">{data.intro}</p>
              <p className="text-sm text-gray-400">
                {isNl ? 'Laatst bijgewerkt: ' : 'Last updated: '}{new Date(data.lastUpdated).toLocaleDateString(isNl ? 'nl-NL' : 'en-GB', { year: 'numeric', month: 'long' })}
                {data.sources && data.sources.length > 0 && ` · ${data.sources.length} ${isNl ? 'geverifieerde bronnen' : 'verified sources'}`}
              </p>
            </div>
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
                For a deeper dive into {data.cityName}'s neighbourhoods,{' '}
                <Link href={`/guides/where-to-stay/${data.citySlug}/`} className="text-thailand-blue hover:underline">
                  {isNl ? 'lees onze volledige Waar Verblijven gids' : 'read our full Where to Stay guide'}
                </Link>
                .
              </p>
            </section>
          )}

          {/* Hotel categories with editorial context */}
          {categoryOrder.map(cat => {
            const hotels = grouped[cat];
            if (!hotels || hotels.length === 0) return null;
            const conf = categoryConfig[cat];
            const editorial = categoryEditorial[cat];

            return (
              <section key={cat} className="mb-14">
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
                    <HotelCard key={i} hotel={hotel} />
                  ))}
                </div>
              </section>
            );
          })}

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

          {/* Cross-links */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-5">{isNl ? `Meer ${data.cityName} Hotelgidsen` : `More ${data.cityName} Hotel Guides`}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                href={`/guides/where-to-stay/${data.citySlug}/`}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-thailand-blue/30 transition-all group"
              >
                <h3 className="font-bold text-gray-900 group-hover:text-thailand-blue mb-1">
                  {isNl ? `Waar Verblijven in ${data.cityName}` : `Where to Stay in ${data.cityName}`}
                </h3>
                <p className="text-sm text-gray-500">
                  {isNl ? 'Wijkgids — vind het beste gebied voor jouw reisstijl.' : 'Neighbourhood guide — find the best area for your trip style.'}
                </p>
                <span className="text-thailand-blue text-sm font-semibold mt-2 inline-block">
                  {isNl ? 'Lees gids →' : 'Read guide →'}
                </span>
              </Link>
              <Link
                href={`/city/${data.citySlug}/top-10-hotels/`}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-thailand-blue/30 transition-all group"
              >
                <h3 className="font-bold text-gray-900 group-hover:text-thailand-blue mb-1">
                  Top 10 Hotels in {data.cityName}
                </h3>
                <p className="text-sm text-gray-500">
                  {isNl ? 'Onze samengestelde top 10 lijst met beoordelingen en reviews.' : 'Our curated top 10 list with ratings and reviews.'}
                </p>
                <span className="text-thailand-blue text-sm font-semibold mt-2 inline-block">
                  {isNl ? 'Bekijk top 10 →' : 'See top 10 →'}
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
  return { paths: [], fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { getHotelsPage } = await import('../../lib/clusters');
  const slug = params?.slug as string;
  const data = getHotelsPage(slug);
  if (!data) return { notFound: true };
  return {
    props: { data, affiliates: getAffiliates(slug) },
    revalidate: 604800,
  };
};
