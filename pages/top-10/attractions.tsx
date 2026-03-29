import { GetStaticProps } from 'next';
import SEOHead from '../../components/SEOHead';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumbs from '../../components/Breadcrumbs';
import { getAllCities } from '../../lib/cities';
import { attractionsHubContent } from '../../lib/top10-hub-content';
import fs from 'fs';
import path from 'path';

interface City {
  id: number;
  slug: string;
  name: { en: string; nl: string; };
  region: string;
  province: string;
  image: string;
}

interface Top10Guide {
  city: City;
  title: string;
  meta_description: string;
  last_updated?: string;
  item_count: number;
  has_current_data: boolean;
}

interface Top10AttractionsIndexProps {
  availableGuides: Top10Guide[];
  featuredGuides: Top10Guide[];
}

export default function Top10AttractionsIndex({ availableGuides, featuredGuides }: Top10AttractionsIndexProps) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Top 10 Guides', href: '/top-10/' },
    { name: 'Attractions', href: '/top-10/attractions/' }
  ];

  const cities = getAllCities();
  const cityBySlug = new Map(cities.map((city) => [city.slug, city]));
  const featuredCities = attractionsHubContent.featuredCities
    .map((featured) => ({
      ...featured,
      city: cityBySlug.get(featured.slug)
    }))
    .filter((featured) => featured.city);
  const browseGuides = [...availableGuides].sort((a, b) => a.city.name.en.localeCompare(b.city.name.en));

  return (
    <>
      <SEOHead
        title={attractionsHubContent.title}
        description={attractionsHubContent.description}
      >
        <meta name="keywords" content="Thailand attractions, top 10 attractions, sightseeing, tourist attractions, Bangkok attractions, Phuket activities, Chiang Mai temples, Thailand tourism" />
        <meta property="og:type" content="website" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": "Top 10 Attraction Guides Thailand",
              "description": attractionsHubContent.description,
              "publisher": {
                "@type": "Organization",
                "name": "Go2Thailand"
              },
              "mainEntity": {
                "@type": "ItemList",
                "numberOfItems": availableGuides.length,
                "itemListElement": availableGuides.map((guide, index) => ({
                  "@type": "ListItem",
                  "position": index + 1,
                  "url": `https://go2-thailand.com/city/${guide.city.slug}/top-10-attractions/`,
                  "name": guide.title
                }))
              }
            })
          }}
        />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        <section className="bg-surface-dark text-white">
          <div className="container-custom py-16 lg:py-20">
            <div className="max-w-4xl mx-auto text-center">
              <Breadcrumbs items={breadcrumbs} />
              <span className="font-script text-thailand-gold text-lg mb-3 block">
                {attractionsHubContent.heroEyebrow}
              </span>
              <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6">
                {attractionsHubContent.heroTitle}
              </h1>
              <p className="text-xl lg:text-2xl opacity-90">
                {attractionsHubContent.heroIntro}
              </p>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
                <div className="rounded-2xl bg-white/10 backdrop-blur px-5 py-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-white/60 mb-1">Focus</div>
                  <div className="text-base font-semibold">City-level attraction shortlists</div>
                </div>
                <div className="rounded-2xl bg-white/10 backdrop-blur px-5 py-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-white/60 mb-1">Sources</div>
                  <div className="text-base font-semibold">Visible references below</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="bg-white rounded-2xl shadow-md p-8 mb-12">
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">
                {attractionsHubContent.whyThisPageTitle}
              </h2>
              <p className="text-gray-600 max-w-3xl">
                {attractionsHubContent.whyThisPageBody}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
              {featuredCities.map((featured) => {
                const city = featured.city!;
                return (
                  <Link key={featured.slug} href={featured.primaryHref} className="group block">
                    <div className="bg-white rounded-2xl shadow-md overflow-hidden h-full transition-shadow group-hover:shadow-xl">
                      <div className="relative h-44">
                        <Image
                          src={city.image}
                          alt={`${city.name.en} attractions`}
                          layout="fill"
                          objectFit="cover"
                          className="brightness-90"
                        />
                        <div className="absolute top-4 left-4 rounded-full bg-surface-dark/80 px-3 py-1 text-xs font-semibold text-white">
                          {featured.kicker}
                        </div>
                      </div>
                      <div className="p-6">
                        <h2 className="text-xl font-bold font-heading text-gray-900 mb-2 group-hover:text-thailand-red transition-colors">
                          {city.name.en}
                        </h2>
                        <p className="text-gray-600 text-sm mb-4">
                          {featured.summary}
                        </p>
                        <div className="text-sm font-semibold text-thailand-red">
                          Open attraction guide →
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="space-y-8 mb-12">
              {attractionsHubContent.sections.map((section) => (
                <section key={section.title} className="rounded-2xl border border-gray-100 bg-surface-cream p-6 lg:p-8">
                  <div className="max-w-3xl mb-5">
                    <h2 className="text-2xl lg:text-3xl font-bold font-heading text-gray-900 mb-3">
                      {section.title}
                    </h2>
                    <p className="text-gray-600">
                      {section.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {section.citySlugs.map((slug) => {
                      const city = cityBySlug.get(slug);
                      if (!city) return null;

                      return (
                        <Link
                          key={slug}
                          href={`/city/${slug}/top-10-attractions/`}
                          className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-thailand-red"
                        >
                          {city.name.en}
                        </Link>
                      );
                    })}
                  </div>
                  {section.inlineSources?.length ? (
                    <div className="mt-4 text-sm text-gray-500">
                      Selected references:
                      {' '}
                      {section.inlineSources.map((source, index) => (
                        <span key={source.label}>
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-thailand-blue hover:underline"
                          >
                            {source.label}
                          </a>
                          {index < section.inlineSources.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </section>
              ))}
            </div>

            <section className="bg-white rounded-2xl shadow-md p-8 mb-12">
              <div className="flex items-end justify-between gap-6 mb-6">
                <div>
                  <span className="section-label">Browse Index</span>
                  <h2 className="text-3xl font-bold font-heading text-gray-900 mt-2">
                    All Attraction Guides
                  </h2>
                </div>
                <p className="text-gray-600 max-w-2xl">
                  A full city index for readers who want to browse the entire attraction library by destination.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {browseGuides.map((guide) => (
                  <Link key={guide.city.slug} href={`/city/${guide.city.slug}/top-10-attractions/`} className="group block">
                    <div className="rounded-2xl border border-gray-100 bg-surface-cream overflow-hidden h-full transition-shadow group-hover:shadow-md">
                      <div className="relative h-36">
                        <Image
                          src={guide.city.image}
                          alt={`${guide.city.name.en} attractions`}
                          layout="fill"
                          objectFit="cover"
                          className="brightness-90"
                        />
                        <div className="absolute top-4 left-4 rounded-full bg-surface-dark/80 px-3 py-1 text-xs font-semibold text-white">
                          {guide.city.region}
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="text-lg font-bold font-heading text-gray-900 mb-2 group-hover:text-thailand-red transition-colors">
                          {guide.city.name.en}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          {guide.city.province} Province
                        </p>
                        <div className="text-sm font-medium text-gray-700">
                          {guide.item_count} attractions
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow-md p-8">
              <div className="flex items-end justify-between gap-6 mb-6">
                <div>
                  <span className="section-label">Sources</span>
                  <h2 className="text-3xl font-bold font-heading text-gray-900 mt-2">
                    Visible References
                  </h2>
                </div>
                <p className="text-gray-600 max-w-2xl">
                  Selected source references used to shape the route framing and city-level context.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {attractionsHubContent.sourceLinks.map((source) => (
                  <a
                    key={source.label}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-2xl border border-gray-100 bg-surface-cream p-5 transition-shadow hover:shadow-md"
                  >
                    <div className="text-sm font-semibold text-thailand-red mb-2">
                      {source.label}
                    </div>
                    <p className="text-gray-600 text-sm">
                      {source.note}
                    </p>
                  </a>
                ))}
              </div>
            </section>
          </div>
        </section>

      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const cities = getAllCities();
  const availableGuides: Top10Guide[] = [];
  const featuredGuides: Top10Guide[] = [];

  // Check which cities have attraction guides
  for (const city of cities) {
    try {
      const localePath = locale && locale !== 'en' ? path.join(process.cwd(), 'data', 'top10', locale, `${city.slug}-attractions.json`) : '';
      const defaultPath = path.join(process.cwd(), 'data', 'top10', `${city.slug}-attractions.json`);
      const dataPath = localePath && fs.existsSync(localePath) ? localePath : defaultPath;
      if (fs.existsSync(dataPath)) {
        const fileContent = fs.readFileSync(dataPath, 'utf8');
        const data = JSON.parse(fileContent);
        
        const guide: Top10Guide = {
          city,
          title: data.title,
          meta_description: data.meta_description,
          last_updated: data.last_perplexity_update || data.generated_at || null,
          item_count: data.items?.length || 10,
          has_current_data: !!(data.data_sources && data.data_sources.length > 0)
        };
        
        availableGuides.push(guide);
        
        // Featured guides: Bangkok, Phuket, Chiang Mai
        if (['bangkok', 'phuket', 'chiang-mai'].includes(city.slug)) {
          featuredGuides.push(guide);
        }
      }
    } catch (error) {
      // Error reading top 10 attractions data for this city
    }
  }

  return {
    props: {
      availableGuides,
      featuredGuides
    },
    revalidate: 604800 // Revalidate daily
  };
};
