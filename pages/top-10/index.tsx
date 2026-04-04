import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Breadcrumbs from '../../components/Breadcrumbs';
import SEOHead from '../../components/SEOHead';
import { getAllCities } from '../../lib/cities';
import { rootHubContent, type Top10Category } from '../../lib/top10-hub-content';

interface Top10IndexProps {
  totalGuides: {
    attractions: number;
    restaurants: number;
    hotels: number;
  };
}

interface CityRecord {
  slug: string;
  name: {
    en: string;
  };
}

function getSectionCityHref(slug: string, category?: Top10Category) {
  return category ? `/city/${slug}/top-10-${category}/` : `/city/${slug}/`;
}

export default function Top10Index({ totalGuides }: Top10IndexProps) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: isNl ? 'Top 10 Gidsen' : 'Top 10 Guides', href: '/top-10/' }
  ];

  const cities = getAllCities() as CityRecord[];
  const cityBySlug = new Map(cities.map((city) => [city.slug, city]));

  const featuredCities = rootHubContent.featuredCities
    .map((featured) => ({
      ...featured,
      city: cityBySlug.get(featured.slug)
    }))
    .filter((featured) => featured.city);

  return (
    <>
      <SEOHead
        title={rootHubContent.title}
        description={rootHubContent.description}
      >
        <meta
          name="keywords"
          content="Thailand top 10 guides, Thailand attraction guides, Thailand restaurant guides, Thailand hotel guides"
        />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        <section className="bg-white shadow-sm">
          <div className="container-custom py-8">
            <Breadcrumbs items={breadcrumbs} />

            <div className="text-center mt-8">
              <span className="section-label">{rootHubContent.heroEyebrow}</span>
              <h1 className="text-4xl lg:text-5xl font-bold font-heading text-gray-900 mb-4">
                {rootHubContent.heroTitle}
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {rootHubContent.heroIntro}
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm text-gray-600">
                <span className="inline-flex items-center rounded-full bg-surface-cream px-4 py-2">
                  {totalGuides.attractions} {isNl ? 'attractiegidsen' : 'attraction guides'}
                </span>
                <span className="inline-flex items-center rounded-full bg-surface-cream px-4 py-2">
                  {totalGuides.restaurants} {isNl ? 'restaurantgidsen' : 'restaurant guides'}
                </span>
                <span className="inline-flex items-center rounded-full bg-surface-cream px-4 py-2">
                  {totalGuides.hotels} {isNl ? 'hotelgidsen' : 'hotel guides'}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            <section className="bg-white rounded-2xl shadow-md p-8 mb-12">
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">
                {isNl ? 'Hoe Gebruik Je Deze Gidsen' : 'How To Use These Guides'}
              </h2>
              <p className="text-gray-600 max-w-3xl">
                {isNl ? 'Begin met de gidscategorie die past bij jouw beslissing en open dan een stadspagina voor de daadwerkelijke shortlist.' : 'Start with the guide family that matches the decision you are making, then open a city page for the actual shortlist and source-backed context.'}
              </p>
            </section>

            <section className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    href: '/top-10/attractions/',
                    title: isNl ? 'Attracties' : 'Attractions',
                    description: isNl ? 'Gebruik dit pad als je reis draait om tempels, bezienswaardigheden en sightseeing.' : 'Use this path when the trip is built around temples, landmarks, and sightseeing shortlists.'
                  },
                  {
                    href: '/top-10/restaurants/',
                    title: 'Restaurants',
                    description: isNl ? 'Gebruik dit pad als je belangrijkste beslissing is waar te eten en welke stad de beste eetscene heeft.' : 'Use this path when the main decision is where to eat and which city has the strongest food scene.'
                  },
                  {
                    href: '/top-10/hotels/',
                    title: 'Hotels',
                    description: isNl ? 'Gebruik dit pad als het hotel de basis vormt voor je reisplanning en verblijfstijl.' : 'Use this path when the hotel base drives the trip shape, stay style, and transit planning.'
                  }
                ].map((guide) => (
                  <Link key={guide.href} href={guide.href} className="group block">
                    <div className="bg-white rounded-2xl shadow-md p-6 h-full transition-shadow group-hover:shadow-lg">
                      <div className="text-sm font-semibold text-thailand-red mb-2">
                        {isNl ? 'Gidscategorie' : 'Guide family'}
                      </div>
                      <h3 className="text-xl font-bold font-heading text-gray-900 mb-2 group-hover:underline">
                        {guide.title}
                      </h3>
                      <p className="text-gray-600">{guide.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
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
                  {isNl ? 'Dit zijn de beste startpunten voor de top-10 stadsgidsen.' : 'These are the strongest entry points for the city-level top-10 guides.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {featuredCities.map((featured) => {
                  const city = featured.city!;
                  return (
                    <div key={featured.slug} className="flex flex-col">
                      <Link href={featured.primaryHref} className="group block">
                        <div className="bg-white rounded-2xl shadow-md p-6 h-full transition-shadow group-hover:shadow-lg">
                          <div className="text-sm font-semibold text-thailand-red mb-2">{featured.kicker}</div>
                          <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">{city.name.en}</h3>
                          <p className="text-gray-600">{featured.summary}</p>
                        </div>
                      </Link>
                      {featured.secondaryHref ? (
                        <Link
                          href={featured.secondaryHref}
                          className="mt-3 inline-flex items-center text-sm font-semibold text-thailand-blue hover:underline"
                        >
                          {isNl ? 'Bekijk stadsoverzicht' : 'View city overview'}
                        </Link>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow-md p-8 mb-12">
              <div className="flex items-end justify-between gap-6 mb-6">
                <div>
                  <span className="section-label">{isNl ? 'Steden Index' : 'City Index'}</span>
                  <h2 className="text-3xl font-bold font-heading text-gray-900 mt-2">
                    {isNl ? 'Regionale Shortlists' : 'Regional Shortlists'}
                  </h2>
                </div>
                <p className="text-gray-600 max-w-2xl">
                  {isNl ? 'Een compact overzicht van de stedengroepen in deze hub.' : 'A compact index of the city groups this hub routes into.'}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {rootHubContent.sections.map((section) => (
                  <div key={section.title} className="rounded-2xl border border-gray-100 bg-surface-cream p-5">
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-2">
                      {section.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {section.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {section.citySlugs.map((slug) => {
                        const city = cityBySlug.get(slug);
                        if (!city) return null;

                        return (
                          <Link
                            key={slug}
                            href={getSectionCityHref(slug, section.linkCategory)}
                            className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-thailand-red"
                          >
                            {city.name.en}
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
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow-md p-8">
              <div className="flex items-end justify-between gap-6 mb-6">
                <div>
                  <span className="section-label">{isNl ? 'Redactionele Bronnen' : 'Editorial References'}</span>
                  <h2 className="text-3xl font-bold font-heading text-gray-900 mt-2">
                    {isNl ? 'Geselecteerde Redactionele Bronnen' : 'Selected Editorial Reference Set'}
                  </h2>
                </div>
                <p className="text-gray-600 max-w-2xl">
                  {isNl ? 'Dit zijn geselecteerde bronnen achter de uitgelichte steden en routelogica. Ze zijn representatief, niet uitputtend.' : 'These are selected references behind the featured cities and route logic. They are representative, not exhaustive, and they do not individually substantiate every page statement.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {rootHubContent.sourceLinks.map((source) => (
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

export const getStaticProps: GetStaticProps = async () => {
  const fs = require('fs');
  const path = require('path');

  const totalGuides = {
    attractions: 0,
    restaurants: 0,
    hotels: 0
  };

  try {
    const top10Dir = path.join(process.cwd(), 'data', 'top10');
    if (fs.existsSync(top10Dir)) {
      const files = fs.readdirSync(top10Dir);

      files.forEach((file: string) => {
        if (file.endsWith('-attractions.json')) totalGuides.attractions++;
        if (file.endsWith('-restaurants.json')) totalGuides.restaurants++;
        if (file.endsWith('-hotels.json')) totalGuides.hotels++;
      });
    }
  } catch (error) {
    // Could not count top10 guides
  }

  return {
    props: {
      totalGuides
    }
  };
};
