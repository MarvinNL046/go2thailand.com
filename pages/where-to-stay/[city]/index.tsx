import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import SEOHead from '../../../components/SEOHead';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { getAffiliates, withPlacementSubId } from '../../../lib/affiliates';
import type { CityAffiliates } from '../../../lib/affiliates';
import type { TravelIntentPage } from '../../../lib/intent-pages';

interface Props {
  page: TravelIntentPage;
  affiliates: CityAffiliates | null;
}

function groupLinks(page: TravelIntentPage) {
  return {
    audiences: page.internalLinks.filter(link => link.intent === 'audience'),
    areas: page.internalLinks.filter(link => link.intent === 'area'),
    hotels: page.internalLinks.filter(link => link.intent === 'hotel-category' || link.pageType === 'best-hotels'),
    guides: page.internalLinks.filter(link => link.intent === 'city-guide'),
  };
}

export default function WhereToStayCityPage({ page, affiliates }: Props) {
  const city = page.city || '';
  const cityName = page.cityName || city;
  const links = groupLinks(page);
  const bookingBaseUrl = affiliates?.booking || null;
  const heroBookingUrl = bookingBaseUrl
    ? withPlacementSubId(bookingBaseUrl, `intent-where-to-stay-${city}`, 'hero')
    : null;

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Where to Stay', href: '/where-to-stay/' },
    { name: cityName, href: page.slug },
  ];

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `https://go2-thailand.com${crumb.href}`,
    })),
  };

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Best areas to stay in ${cityName}`,
    itemListElement: page.topPicks.map((pick, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: pick.href ? `https://go2-thailand.com${pick.href}` : page.canonicalUrl,
      name: pick.name,
      description: pick.reason,
    })),
  };

  return (
    <>
      <SEOHead title={page.metaTitle} description={page.metaDescription}>
        <link rel="canonical" href={page.canonicalUrl} />
        {!page.indexable && <meta name="robots" content="noindex, follow" />}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        <section className="bg-thailand-blue text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Breadcrumbs items={breadcrumbs} />
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-white/75">
              Area decision guide
            </p>
            <h1 className="font-heading text-3xl lg:text-5xl font-bold mt-2">
              {page.h1}
            </h1>
            <p className="mt-4 text-lg opacity-90 max-w-3xl">{page.intro}</p>

            {page.quickAnswers.length > 0 && (
              <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {page.quickAnswers.map(answer => (
                  <Link
                    key={`${answer.label}-${answer.answer}`}
                    href={answer.href || '#area-comparison'}
                    className="rounded-2xl bg-white/10 backdrop-blur px-4 py-3 hover:bg-white/15 transition-colors"
                  >
                    <span className="block text-xs uppercase tracking-wide text-white/70">{answer.label}</span>
                    <span className="mt-1 block font-heading text-lg font-bold">{answer.answer}</span>
                  </Link>
                ))}
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              {heroBookingUrl && (
                <a
                  href={heroBookingUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow sponsored"
                  className="rounded-full bg-thailand-red px-6 py-3 text-base font-semibold text-white hover:bg-red-700 shadow-lg"
                >
                  Compare hotels in {cityName}
                </a>
              )}
              <a
                href="#area-comparison"
                className="rounded-full bg-white/10 backdrop-blur px-5 py-3 text-sm font-semibold text-white hover:bg-white/20"
              >
                Compare areas
              </a>
              <Link
                href={`/best-hotels/${city}/`}
                className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-thailand-blue hover:bg-gray-100"
              >
                See best hotels
              </Link>
            </div>

            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-xs opacity-90">
              <span>{page.topPicks.length} areas compared</span>
              <span>Hotel-area fit, transport, price, and trade-offs</span>
              <span>No sponsored placements</span>
            </div>
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <section id="area-comparison">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-4">
              <div>
                <h2 className="font-heading text-2xl font-bold text-gray-900">
                  Best areas in {cityName}, compared
                </h2>
                <p className="mt-1 text-gray-600">
                  Use this table to choose the right base before comparing hotels.
                </p>
              </div>
              {bookingBaseUrl && (
                <a
                  href={withPlacementSubId(bookingBaseUrl, `intent-where-to-stay-${city}`, 'comparison')}
                  target="_blank"
                  rel="noopener noreferrer nofollow sponsored"
                  className="rounded-full bg-thailand-red px-5 py-2 text-sm font-semibold text-white hover:bg-red-700"
                >
                  Check current hotel prices
                </a>
              )}
            </div>

            <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Area</th>
                    <th className="px-4 py-3 text-left font-semibold">Best for</th>
                    <th className="px-4 py-3 text-left font-semibold">Price</th>
                    <th className="px-4 py-3 text-left font-semibold">Main strength</th>
                    <th className="px-4 py-3 text-left font-semibold">Watch out for</th>
                    <th className="px-4 py-3 text-left font-semibold">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {page.comparisonTable.map(row => (
                    <tr key={row.label} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-semibold text-gray-900">{row.label}</td>
                      <td className="px-4 py-3 text-gray-700">{row.bestFor}</td>
                      <td className="px-4 py-3 text-gray-700">{row.priceBand || 'Varies'}</td>
                      <td className="px-4 py-3 text-gray-700">{row.strength}</td>
                      <td className="px-4 py-3 text-gray-600">{row.watchOut || 'Check transport before booking'}</td>
                      <td className="px-4 py-3">
                        {row.href && (
                          <Link href={row.href} className="font-semibold text-thailand-blue hover:underline whitespace-nowrap">
                            Area guide
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {page.decisionGuide.length > 0 && (
            <section>
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                Fast decision guide
              </h2>
              <div className="grid md:grid-cols-2 gap-3">
                {page.decisionGuide.map(item => (
                  <Link
                    key={`${item.condition}-${item.recommendation}`}
                    href={item.href || '#area-comparison'}
                    className="rounded-2xl bg-white border border-gray-200 p-4 shadow-sm hover:border-thailand-blue transition-colors"
                  >
                    <p className="text-sm text-gray-600">{item.condition}</p>
                    <p className="mt-1 font-heading text-lg font-bold text-gray-900">{item.recommendation}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-5">
              Recommended areas to check first
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              {page.topPicks.map((pick, index) => (
                <article key={pick.name} className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
                  <p className="text-sm font-semibold text-thailand-red">#{index + 1}</p>
                  <h3 className="mt-1 font-heading text-xl font-bold text-gray-900">{pick.name}</h3>
                  <p className="mt-2 text-gray-700 leading-relaxed">{pick.reason}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {pick.href && (
                      <Link
                        href={pick.href}
                        className="rounded-full bg-thailand-blue px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                      >
                        Read area guide
                      </Link>
                    )}
                    {bookingBaseUrl && (
                      <a
                        href={withPlacementSubId(bookingBaseUrl, `intent-where-to-stay-${city}`, `pick-${index + 1}`)}
                        target="_blank"
                        rel="noopener noreferrer nofollow sponsored"
                        className="rounded-full bg-white border border-thailand-red px-4 py-2 text-sm font-semibold text-thailand-red hover:bg-thailand-red hover:text-white"
                      >
                        Compare hotels
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>

          {page.bookingTips.length > 0 && (
            <section className="rounded-2xl bg-amber-50 border border-amber-200 p-6">
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                Booking tips for {cityName}
              </h2>
              <ul className="space-y-2 text-gray-800">
                {page.bookingTips.map((tip, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="font-bold text-amber-700">{index + 1}.</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="rounded-2xl bg-white border border-gray-200 p-6">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">
              Continue this {cityName} stay cluster
            </h2>
            <div className="grid md:grid-cols-3 gap-5">
              {links.audiences.length > 0 && (
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">By traveller type</h3>
                  <ul className="space-y-2">
                    {links.audiences.map(link => (
                      <li key={link.href}>
                        <Link href={link.href} className="text-sm font-semibold text-thailand-blue hover:underline">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {links.areas.length > 0 && (
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Area guides</h3>
                  <ul className="space-y-2">
                    {links.areas.slice(0, 8).map(link => (
                      <li key={link.href}>
                        <Link href={link.href} className="text-sm font-semibold text-thailand-blue hover:underline">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Hotel decisions</h3>
                <ul className="space-y-2">
                  {links.hotels.map(link => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm font-semibold text-thailand-blue hover:underline">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                  {links.guides.map(link => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm font-semibold text-thailand-blue hover:underline">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { listIntentPaths } = await import('../../../lib/intent-pages');
  return { paths: listIntentPaths('where-to-stay'), fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const city = params?.city as string;
  const { getWhereToStayIntentPage } = await import('../../../lib/intent-pages');
  const page = getWhereToStayIntentPage(city);
  if (!page) return { notFound: true, revalidate: 60 };

  return {
    props: {
      page,
      affiliates: getAffiliates(city),
    },
    revalidate: 604800,
  };
};
