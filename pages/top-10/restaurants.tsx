import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import { getAllCities } from '../../lib/cities';
import { restaurantsHubContent } from '../../lib/top10-hub-content';
import fs from 'fs';
import path from 'path';
import { useT } from '../../lib/i18n';
import { strings as i18nStrings } from '../../lib/i18n/top-10-restaurants';

interface City {
  id: number;
  slug: string;
  name: { en: string; nl: string };
  region: string;
  province: string;
  image: string;
}

interface Top10Guide {
  city: City;
  title: string;
  meta_description: string;
  item_count: number;
}

interface Top10RestaurantsIndexProps {
  availableGuides: Top10Guide[];
}

export default function Top10RestaurantsIndex({ availableGuides }: Top10RestaurantsIndexProps) {
  const t = useT(i18nStrings);
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const lang = isNl ? 'nl' : 'en';

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: isNl ? 'Top 10 Gidsen' : 'Top 10 Guides', href: '/top-10/' },
    { name: 'Restaurants', href: '/top-10/restaurants/' }
  ];

  const cities = getAllCities();
  const cityBySlug = new Map(cities.map((city) => [city.slug, city]));
  const featuredCities = restaurantsHubContent.featuredCities
    .map((featured) => ({
      ...featured,
      city: cityBySlug.get(featured.slug)
    }))
    .filter((featured) => featured.city);
  const browseGuides = [...availableGuides].sort((a, b) => (a.city.name[lang] || a.city.name.en).localeCompare(b.city.name[lang] || b.city.name.en));

  return (
    <>
      <SEOHead
        title={restaurantsHubContent.title}
        description={restaurantsHubContent.description}
      >
        <meta
          name="keywords"
          content={t("s001_thailand_restaurants_top_10")}
        />
        <meta property="og:type" content="website" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              name: restaurantsHubContent.title,
              description: restaurantsHubContent.description,
              publisher: {
                '@type': 'Organization',
                name: 'Go2Thailand'
              },
              mainEntity: {
                '@type': 'ItemList',
                numberOfItems: availableGuides.length,
                itemListElement: availableGuides.map((guide, index) => ({
                  '@type': 'ListItem',
                  position: index + 1,
                  url: `https://go2-thailand.com/city/${guide.city.slug}/top-10-restaurants/`,
                  name: guide.title
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
                {restaurantsHubContent.heroEyebrow}
              </span>
              <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6">
                {restaurantsHubContent.heroTitle}
              </h1>
              <p className="text-xl lg:text-2xl opacity-90">
                {restaurantsHubContent.heroIntro}
              </p>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
                <div className="rounded-2xl bg-white/10 backdrop-blur px-5 py-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-white/60 mb-1">Focus</div>
                  <div className="text-base font-semibold">{t("s002_city_level_restaurant_shortlists")}</div>
                </div>
                <div className="rounded-2xl bg-white/10 backdrop-blur px-5 py-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-white/60 mb-1">References</div>
                  <div className="text-base font-semibold">{t("s003_visible_source_links_below")}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-custom">
            <section className="bg-white rounded-2xl shadow-md p-8 mb-12">
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">
                {restaurantsHubContent.whyThisPageTitle}
              </h2>
              <p className="text-gray-600 max-w-3xl">
                {restaurantsHubContent.whyThisPageBody}
              </p>
            </section>

            <section className="mb-12">
              <div className="flex items-end justify-between gap-6 mb-6">
                <div>
                  <span className="section-label">{isNl ? 'Uitgelichte Steden' : 'Featured Cities'}</span>
                  <h2 className="text-3xl font-bold font-heading text-gray-900 mt-2">
                    {isNl ? 'Begin Hier' : 'Start Here'}
                  </h2>
                </div>
                <p className="text-gray-600 max-w-2xl">
                  {isNl ? 'Dit zijn de beste startpunten voor de restaurantgidsen per stad.' : 'These are the strongest entry points for the city-level restaurant guides.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {featuredCities.map((featured) => {
                  const city = featured.city!;
                  return (
                    <Link key={featured.slug} href={featured.primaryHref} className="group block">
                      <div className="bg-white rounded-2xl shadow-md overflow-hidden h-full transition-shadow group-hover:shadow-xl">
                        <div className="relative h-44">
                          <Image
                            src={city.image}
                            alt={`${city.name[lang] || city.name.en} restaurants`}
                            layout="fill"
                            objectFit="cover"
                            className="brightness-90"
                          />
                          <div className="absolute top-4 left-4 rounded-full bg-surface-dark/80 px-3 py-1 text-xs font-semibold text-white">
                            {featured.kicker}
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-bold font-heading text-gray-900 mb-2 group-hover:text-thailand-red transition-colors">
                            {city.name[lang] || city.name.en}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4">
                            {featured.summary}
                          </p>
                          <div className="text-sm font-semibold text-thailand-red">
                            {isNl ? 'Open restaurantgids' : 'Open restaurant guide'} &rarr;
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>

            <section className="space-y-8 mb-12">
              {restaurantsHubContent.sections.map((section) => (
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
                          href={`/city/${slug}/top-10-restaurants/`}
                          className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-thailand-red"
                        >
                          {city.name[lang] || city.name.en}
                        </Link>
                      );
                    })}
                  </div>
                  {section.inlineSources?.length ? (
                    <div className="mt-4 text-sm text-gray-500">
                      {isNl ? 'Geselecteerde bronnen:' : 'Selected references:'}
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
            </section>

            <section className="bg-white rounded-2xl shadow-md p-8 mb-12">
              <div className="flex items-end justify-between gap-6 mb-6">
                <div>
                  <span className="section-label">{t("s004_browse_index")}</span>
                  <h2 className="text-3xl font-bold font-heading text-gray-900 mt-2">
                    {isNl ? 'Alle Restaurantgidsen' : 'All Restaurant Guides'}
                  </h2>
                </div>
                <p className="text-gray-600 max-w-2xl">
                  {isNl ? 'Een volledig stadsoverzicht voor wie de restaurantbibliotheek per bestemming wil bekijken.' : 'A full city index for readers who want to browse the restaurant library by destination.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {browseGuides.map((guide) => (
                  <Link key={guide.city.slug} href={`/city/${guide.city.slug}/top-10-restaurants/`} className="group block">
                    <div className="rounded-2xl border border-gray-100 bg-surface-cream overflow-hidden h-full transition-shadow group-hover:shadow-md">
                      <div className="relative h-36">
                        <Image
                          src={guide.city.image}
                          alt={`${guide.city.name[lang] || guide.city.name.en} restaurants`}
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
                          {guide.city.name[lang] || guide.city.name.en}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          {guide.city.province} {isNl ? 'Provincie' : 'Province'}
                        </p>
                        <div className="text-sm font-medium text-gray-700">
                          {guide.item_count} restaurants
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
                    {isNl ? 'Zichtbare Bronnen' : 'Visible References'}
                  </h2>
                </div>
                <p className="text-gray-600 max-w-2xl">
                  {isNl ? 'Geselecteerde bronverwijzingen gebruikt voor de routekadering en stadsniveau context.' : 'Selected source references used to shape the route framing and city-level context.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {restaurantsHubContent.sourceLinks.map((source) => (
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
                    <p className="text-gray-600 text-sm">{source.note}</p>
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

  for (const city of cities) {
    try {
      const localePath = locale && locale !== 'en'
        ? path.join(process.cwd(), 'data', 'top10', locale, `${city.slug}-restaurants.json`)
        : '';
      const defaultPath = path.join(process.cwd(), 'data', 'top10', `${city.slug}-restaurants.json`);
      const dataPath = localePath && fs.existsSync(localePath) ? localePath : defaultPath;

      if (fs.existsSync(dataPath)) {
        const fileContent = fs.readFileSync(dataPath, 'utf8');
        const data = JSON.parse(fileContent);

        const guide: Top10Guide = {
          city,
          title: data.title,
          meta_description: data.meta_description,
          item_count: data.items?.length || 10
        };

        availableGuides.push(guide);
      }
    } catch (error) {
      // Ignore malformed guide data and continue building the hub.
    }
  }

  return {
    props: {
      availableGuides
    },
    revalidate: 604800
  };
};
