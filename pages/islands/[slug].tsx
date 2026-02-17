import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Breadcrumbs from '../../components/Breadcrumbs';
import TripcomWidget from '../../components/TripcomWidget';
import AffiliateWidget from '../../components/AffiliateWidget';
import { getAllIslands, getIslandBySlug, getRelatedIslands, generateIslandBreadcrumbs } from '../../lib/islands';

interface Beach {
  name: string;
  description: { en: string; nl: string };
  best_for: string[];
}

interface Activity {
  name: string;
  type: string;
  description: { en: string; nl: string };
  price_range: string;
}

interface TransportOption {
  method: string;
  duration: string;
  price: string;
  description: { en: string; nl: string };
}

interface AccommodationArea {
  name: string;
  description: { en: string; nl: string };
  price_range: string;
}

interface Island {
  slug: string;
  name: { en: string; nl: string };
  region: string;
  province: string;
  image: string;
  description: { en: string; nl: string };
  beaches: Beach[];
  activities: Activity[];
  getting_there: {
    from_bangkok: {
      options: TransportOption[];
    };
  };
  accommodation_tips: {
    areas: AccommodationArea[];
  };
  budget_info: {
    daily_budget: { budget: string; mid: string; luxury: string };
    currency_tips: { en: string; nl: string };
  };
  best_time_to_visit: {
    high_season: string;
    shoulder: string;
    low_season: string;
    avoid: string;
    description: { en: string; nl: string };
  };
  highlights: string[];
  tags: string[];
  seo: {
    metaTitle: { en: string; nl: string };
    metaDescription: { en: string; nl: string };
  };
}

interface RelatedIsland {
  id: number;
  slug: string;
  name: { en: string; nl: string };
  region: string;
  image: string;
  highlights: string[];
}

interface IslandPageProps {
  island: Island;
  relatedIslands: RelatedIsland[];
}

const getTransportIcon = (method: string) => {
  const m = method.toLowerCase();
  if (m.includes('flight') || m.includes('fly')) return '✈️';
  if (m.includes('ferry') || m.includes('boat')) return '⛴️';
  if (m.includes('bus')) return '🚌';
  if (m.includes('train')) return '🚂';
  if (m.includes('taxi') || m.includes('car')) return '🚗';
  return '🚐';
};

export default function IslandPage({ island, relatedIslands }: IslandPageProps) {
  const { locale } = useRouter();
  const lang = (locale === 'nl' ? 'nl' : 'en') as 'en' | 'nl';
  const breadcrumbs = generateIslandBreadcrumbs(island);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    "name": island.name.en,
    "description": island.description.en,
    "url": `https://go2-thailand.com/islands/${island.slug}/`,
    "image": `https://go2-thailand.com${island.image}`,
    "touristType": island.tags,
    "geo": {
      "@type": "GeoCoordinates",
      "addressCountry": "TH"
    },
    "containedInPlace": {
      "@type": "Country",
      "name": "Thailand"
    }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": `https://go2-thailand.com${crumb.href}`
    }))
  };

  return (
    <>
      <Head>
        <title>{island.seo.metaTitle[lang]}</title>
        <meta name="description" content={island.seo.metaDescription[lang]} />
        <meta name="keywords" content={[island.name.en, island.region, island.province, ...island.tags].join(', ')} />
        <meta property="og:title" content={island.seo.metaTitle[lang]} />
        <meta property="og:description" content={island.seo.metaDescription[lang]} />
        <meta property="og:image" content={`https://go2-thailand.com${island.image}`} />
        <meta property="og:type" content="website" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </Head>

      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[400px] lg:h-[500px]">
          <Image
            src={island.image}
            alt={`${island.name.en}, Thailand`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
              <div className="flex gap-2 mb-4">
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                  {island.region}
                </span>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                  {island.province}
                </span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-4">{island.name[lang]}</h1>
              <p className="text-lg lg:text-xl max-w-3xl opacity-90">
                {island.description[lang]}
              </p>
            </div>
          </div>
        </section>

        {/* Breadcrumbs */}
        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </section>

        {/* Quick Stats */}
        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-2xl mb-1">🏖️</div>
                <div className="text-sm text-gray-600">Beaches</div>
                <div className="font-bold text-lg">{island.beaches.length}</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-2xl mb-1">🎯</div>
                <div className="text-sm text-gray-600">Activities</div>
                <div className="font-bold text-lg">{island.activities.length}</div>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 text-center">
                <div className="text-2xl mb-1">☀️</div>
                <div className="text-sm text-gray-600">Best Season</div>
                <div className="font-bold text-lg">{island.best_time_to_visit.high_season}</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <div className="text-2xl mb-1">💰</div>
                <div className="text-sm text-gray-600">Daily Budget</div>
                <div className="font-bold text-lg">{island.budget_info.daily_budget.budget}</div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Beaches Section */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Beaches on {island.name[lang]}
                </h2>
                <div className="space-y-6">
                  {island.beaches.map((beach, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{beach.name}</h3>
                      <p className="text-gray-700 mb-3">{beach.description[lang]}</p>
                      <div className="flex flex-wrap gap-2">
                        {beach.best_for.map((tag, idx) => (
                          <span key={idx} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Activities Section */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Things to Do on {island.name[lang]}
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {island.activities.map((activity, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{activity.name}</h3>
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                          {activity.price_range}
                        </span>
                      </div>
                      <span className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs mb-2">
                        {activity.type}
                      </span>
                      <p className="text-gray-700 text-sm">{activity.description[lang]}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Getting There Section */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  How to Get to {island.name[lang]}
                </h2>
                <div className="space-y-4">
                  {island.getting_there.from_bangkok.options.map((option, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">{getTransportIcon(option.method)}</span>
                          <div>
                            <h3 className="text-lg font-bold">{option.method}</h3>
                            <span className="text-sm text-gray-600">{option.duration}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-green-600">{option.price}</div>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm">{option.description[lang]}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Book Transport to {island.name.en}</h3>
                  <AffiliateWidget
                    scriptContent='<script src="https://tp.media/content?trs=384595&shmarker=602467&lang=en&powered_by=true&border_radius=20&plain=true&promo_id=4416&campaign_id=121"></script>'
                    className="mb-4"
                    minHeight="250px"
                  />
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="https://12go.tpo.lv/tNA80urD"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-thailand-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-thailand-red transition-colors"
                    >
                      12Go Asia →
                    </a>
                    <a
                      href="https://trip.tpo.lv/iP1HSint"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Trip.com Transfers →
                    </a>
                  </div>
                  <p className="text-gray-500 text-xs mt-2">Affiliate links - we may earn a commission at no extra cost to you</p>
                </div>
              </section>

              {/* Where to Stay Section */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Where to Stay on {island.name[lang]}
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {island.accommodation_tips.areas.map((area, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{area.name}</h3>
                        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-medium">
                          {area.price_range}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm">{area.description[lang]}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href="https://booking.tpo.lv/2PT1kR82"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-thailand-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-thailand-red transition-colors"
                  >
                    Booking.com →
                  </a>
                  <a
                    href="https://trip.tpo.lv/TmObooZ5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Trip.com →
                  </a>
                  <p className="w-full text-gray-500 text-xs mt-1">Affiliate links - we may earn a commission at no extra cost to you</p>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Best Time to Visit */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">Best Time to Visit</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">High Season</span>
                    <span className="font-medium text-green-600">{island.best_time_to_visit.high_season}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Shoulder</span>
                    <span className="font-medium text-yellow-600">{island.best_time_to_visit.shoulder}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Low Season</span>
                    <span className="font-medium text-orange-600">{island.best_time_to_visit.low_season}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Avoid</span>
                    <span className="font-medium text-red-600">{island.best_time_to_visit.avoid}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mt-4">{island.best_time_to_visit.description[lang]}</p>
              </div>

              {/* Budget Guide */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">Daily Budget</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">🎒 Budget</span>
                    <span className="font-bold text-green-600">{island.budget_info.daily_budget.budget}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">🏨 Mid-Range</span>
                    <span className="font-bold text-blue-600">{island.budget_info.daily_budget.mid}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">💎 Luxury</span>
                    <span className="font-bold text-purple-600">{island.budget_info.daily_budget.luxury}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4">{island.budget_info.currency_tips[lang]}</p>
              </div>

              {/* Related Islands */}
              {relatedIslands.length > 0 && (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold mb-4">Nearby Islands</h3>
                  <div className="space-y-4">
                    {relatedIslands.map(related => (
                      <Link
                        key={related.slug}
                        href={`/islands/${related.slug}/`}
                        className="flex items-center gap-3 group"
                      >
                        <div className="relative w-16 h-16 flex-shrink-0">
                          <Image
                            src={related.image}
                            alt={related.name.en}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium group-hover:text-thailand-blue transition-colors">
                            {related.name[lang]}
                          </h4>
                          <p className="text-xs text-gray-500">{related.highlights.slice(0, 2).join(', ')}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Trip.com Search Widget */}
              <TripcomWidget
                city={island.name.en}
                type="searchbox"
                customTitle={`Hotels on ${island.name.en}`}
              />

              {/* Activities & Tours */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">Tours & Activities</h3>
                <p className="text-sm text-gray-600 mb-4">Book the best activities on {island.name.en}</p>
                <div className="space-y-3">
                  <a
                    href="https://klook.tpo.lv/7Dt6WApj"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-orange-500 text-white text-center px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors text-sm"
                  >
                    Klook Activities
                  </a>
                  <a
                    href="https://getyourguide.tpo.lv/GuAFfGGK"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-red-500 text-white text-center px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors text-sm"
                  >
                    GetYourGuide Tours
                  </a>
                </div>
                <p className="text-xs text-gray-500 mt-3 text-center">Affiliate links</p>
              </div>

              {/* Quick Links */}
              <div className="bg-gradient-to-r from-thailand-blue to-thailand-blue-dark text-white rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Plan Your Visit</h3>
                <div className="space-y-2">
                  <a
                    href="https://12go.tpo.lv/tNA80urD"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    ⛴️ Book Ferry Tickets
                  </a>
                  <a
                    href="https://booking.tpo.lv/2PT1kR82"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    🏨 Hotels (Booking.com)
                  </a>
                  <a
                    href="https://trip.tpo.lv/TmObooZ5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    🏨 Hotels (Trip.com)
                  </a>
                  <a
                    href="https://klook.tpo.lv/7Dt6WApj"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    🎯 Tours & Activities (Klook)
                  </a>
                  <Link
                    href="/travel-insurance/"
                    className="block bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    🛡️ Travel Insurance
                  </Link>
                  <a
                    href="https://getyourguide.tpo.lv/GuAFfGGK"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    🎒 Tours (GetYourGuide)
                  </a>
                  <a
                    href="https://saily.tpo.lv/rf9lidnE"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    📱 Thailand eSIM
                  </a>
                </div>
                <p className="text-white/60 text-xs mt-3">
                  Some links are affiliate links.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const islands = getAllIslands();
  const paths = islands.map(island => ({
    params: { slug: island.slug }
  }));

  return {
    paths,
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const island = getIslandBySlug(slug);

  if (!island) {
    return { notFound: true };
  }

  const relatedIslands = getRelatedIslands(island, 3);

  return {
    props: {
      island,
      relatedIslands
    },
    revalidate: 86400
  };
};
