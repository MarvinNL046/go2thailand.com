import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import ClusterNav from '../../components/ClusterNav';
import AffiliateBox from '../../components/AffiliateBox';
import type { ThingsToDoPage, ClusterActivity } from '../../lib/cluster-types';
import { getClusterLinks } from '../../lib/cluster-types';
import { getAffiliates, CityAffiliates } from '../../lib/affiliates';
// NOTE: clusters.ts imported dynamically in getStaticPaths/Props to avoid bundling 'fs' client-side

interface Props {
  data: ThingsToDoPage;
  affiliates: CityAffiliates | null;
}

function groupByCategory(activities: ClusterActivity[]): Record<string, ClusterActivity[]> {
  return activities.reduce((acc, activity) => {
    const cat = activity.category || 'General';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(activity);
    return acc;
  }, {} as Record<string, ClusterActivity[]>);
}

function ActivityCard({ activity }: { activity: ClusterActivity }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col gap-2">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-bold text-gray-900 leading-snug">{activity.name}</h3>
        <span className="shrink-0 text-xs text-thailand-blue bg-thailand-blue/10 px-2 py-0.5 rounded-full">
          {activity.category}
        </span>
      </div>
      <p className="text-gray-600 text-sm">{activity.description}</p>
      {(activity.duration || activity.price) && (
        <div className="flex flex-wrap gap-3 text-sm text-gray-500">
          {activity.duration && (
            <span className="flex items-center gap-1">
              <span className="text-thailand-gold">⏱</span> {activity.duration}
            </span>
          )}
          {activity.price && (
            <span className="flex items-center gap-1">
              <span className="text-thailand-gold">💰</span> {activity.price}
            </span>
          )}
        </div>
      )}
      {activity.tips && activity.tips.length > 0 && (
        <ul className="mt-1 space-y-1">
          {activity.tips.map((tip, i) => (
            <li key={i} className="flex gap-2 text-sm text-gray-600">
              <span className="text-thailand-gold shrink-0">•</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function ThingsToDoPage({ data, affiliates }: Props) {
  const links = getClusterLinks(data.citySlug, data.cityName);
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Things To Do', href: '/things-to-do/' },
    { name: data.cityName, href: `/things-to-do/${data.citySlug}/` },
  ];

  const grouped = groupByCategory(data.activities);
  const categories = Object.keys(grouped);

  // Flatten activities in category order with affiliate insertion markers
  const allActivities = data.activities;
  const AFFILIATE_INTERVAL = 6;

  return (
    <>
      <SEOHead title={data.seo.title} description={data.seo.metaDescription} />
      <div className="bg-surface-cream min-h-screen">
        {/* Hero */}
        <section className="bg-white shadow-sm">
          <div className="container-custom py-8">
            <Breadcrumbs items={breadcrumbs} />
            <h1 className="text-4xl lg:text-5xl font-bold font-heading text-gray-900 mb-4">
              Things To Do in {data.cityName} (2026)
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">{data.intro}</p>
          </div>
        </section>

        <div className="container-custom py-8">
          {/* Top nav */}
          <ClusterNav citySlug={data.citySlug} cityName={data.cityName} currentPage="things-to-do" />

          {/* Quick jump by category */}
          {categories.length > 1 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map(cat => (
                <a
                  key={cat}
                  href={`#cat-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-sm text-thailand-blue bg-thailand-blue/10 px-3 py-1 rounded-full hover:bg-thailand-blue/20 transition-colors"
                >
                  {cat} ({grouped[cat].length})
                </a>
              ))}
            </div>
          )}

          {/* Activities grouped by category */}
          {categories.map((cat, catIdx) => {
            const catActivities = grouped[cat];
            // Determine how many affiliate boxes to show within this category
            return (
              <section
                key={cat}
                id={`cat-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                className="mb-12"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                  <span className="w-1 h-7 bg-thailand-gold rounded-full inline-block" />
                  {cat}
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {catActivities.map((activity, i) => (
                    <ActivityCard key={i} activity={activity} />
                  ))}
                </div>

                {/* Affiliate box after every ~6 activities (per category group) */}
                {catActivities.length >= AFFILIATE_INTERVAL && affiliates && (
                  <AffiliateBox affiliates={affiliates} cityName={data.cityName} type="tours" />
                )}

                {/* Affiliate box between categories if crossing multiple of AFFILIATE_INTERVAL across the full list */}
                {catActivities.length < AFFILIATE_INTERVAL && catIdx > 0 && catIdx % 2 === 0 && affiliates && (
                  <AffiliateBox affiliates={affiliates} cityName={data.cityName} type="tours" />
                )}
              </section>
            );
          })}

          {/* Cross-link to Top 10 Attractions */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Looking for the top sights?</h3>
              <p className="text-gray-600 text-sm">
                See our curated list of the best attractions in {data.cityName}, with tips, opening hours and entrance fees.
              </p>
            </div>
            <Link
              href={links.cityAttractions.href}
              className="shrink-0 inline-flex items-center gap-2 bg-thailand-blue text-white font-semibold px-5 py-3 rounded-xl hover:bg-thailand-blue/90 transition-colors"
            >
              Top 10 Attractions →
            </Link>
          </div>

          {/* Travel Tips */}
          {data.travelTips && data.travelTips.length > 0 && (
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Travel Tips for {data.cityName}</h2>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <ul className="space-y-3">
                  {data.travelTips.map((tip, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-thailand-gold shrink-0">•</span>
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Final affiliate box */}
          {affiliates && (
            <AffiliateBox affiliates={affiliates} cityName={data.cityName} type="tours" />
          )}

          {/* Cross-link to destination hub */}
          <div className="mb-8">
            <Link
              href={links.hub.href}
              className="text-thailand-blue hover:underline font-medium"
            >
              ← Back to the {data.cityName} Destination Guide
            </Link>
          </div>

          {/* Bottom nav */}
          <ClusterNav citySlug={data.citySlug} cityName={data.cityName} currentPage="things-to-do" />
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { getClusterCities } = await import('../../lib/clusters');
  const cities = getClusterCities();
  return {
    paths: cities.map(slug => ({ params: { slug } })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { getThingsToDo } = await import('../../lib/clusters');
  const slug = params?.slug as string;
  const data = getThingsToDo(slug);
  if (!data) return { notFound: true };
  return {
    props: { data, affiliates: getAffiliates(slug) },
    revalidate: 86400,
  };
};
