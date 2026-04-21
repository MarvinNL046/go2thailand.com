import { GetStaticProps } from 'next';
import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import type { TravelIntentPage } from '../../lib/intent-pages';

interface Props {
  pages: Array<Pick<TravelIntentPage, 'city' | 'cityName' | 'slug' | 'intro' | 'topPicks'>>;
}

export default function WhereToStayHubPage({ pages }: Props) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Where to Stay', href: '/where-to-stay/' },
  ];

  return (
    <>
      <SEOHead
        title="Where to Stay in Thailand: Best Areas by City (2026)"
        description="Choose where to stay in Thailand with city-by-city area guides, hotel zones, traveller-type recommendations, and booking links."
      >
        <link rel="canonical" href="https://go2-thailand.com/where-to-stay/" />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        <section className="bg-thailand-blue text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Breadcrumbs items={breadcrumbs} />
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-white/75">
              Thailand accommodation decision hub
            </p>
            <h1 className="font-heading text-3xl lg:text-5xl font-bold mt-2">
              Where to stay in Thailand
            </h1>
            <p className="mt-4 text-lg opacity-90 max-w-3xl">
              Pick the right city area before you book. These guides compare neighborhoods by traveller type, transport, hotel value, and trade-offs.
            </p>
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {pages.map(page => (
              <Link
                key={page.slug}
                href={page.slug}
                className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200 hover:border-thailand-blue hover:shadow-md transition-all"
              >
                <h2 className="font-heading text-xl font-bold text-gray-900">
                  Where to stay in {page.cityName}
                </h2>
                <p className="mt-2 text-sm text-gray-600 line-clamp-3">{page.intro}</p>
                {page.topPicks.length > 0 && (
                  <p className="mt-4 text-sm text-gray-700">
                    <span className="font-semibold">Start with:</span>{' '}
                    {page.topPicks.slice(0, 3).map(pick => pick.name).join(', ')}
                  </p>
                )}
                <span className="mt-4 inline-block text-sm font-semibold text-thailand-blue">
                  Compare areas
                </span>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { getWhereToStayIntentPage, listIntentPaths } = await import('../../lib/intent-pages');
  const pages = listIntentPaths('where-to-stay')
    .map(path => getWhereToStayIntentPage(path.params.city))
    .filter((page): page is TravelIntentPage => page !== null)
    .map(page => ({
      city: page.city,
      cityName: page.cityName,
      slug: page.slug,
      intro: page.intro,
      topPicks: page.topPicks,
    }))
    .sort((a, b) => (a.cityName || '').localeCompare(b.cityName || ''));

  return {
    props: { pages },
    revalidate: 604800,
  };
};
