import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getCookingClassesIndex } from '../../lib/cooking-classes';
import { getMuayThaiIndex } from '../../lib/muay-thai';
import { getElephantSanctuariesIndex } from '../../lib/elephant-sanctuaries';
import { getDivingSnorkelingIndex } from '../../lib/diving-snorkeling';
import { formatPrice } from '../../lib/price';
import Breadcrumbs from '../../components/Breadcrumbs';
import AffiliateWidget from '../../components/AffiliateWidget';
import SEOHead from '../../components/SEOHead';

interface CityEntry {
  slug: string;
  name: { en: string; nl: string };
  classCount: number;
  priceRange: { from: number; to: number; currency: string };
}

interface ActivityType {
  slug: string;
  title: string;
  description: string;
  borderColor: string;
  buttonColor: string;
  guidePath: string;
  cities: CityEntry[];
  totalActivities: number;
  lowestPrice: number;
}

interface Props {
  activities: ActivityType[];
}

const KLOOK_WIDGET = '<script async src="https://tpembd.com/content?currency=USD&trs=421888&shmarker=602467&locale=en&category=4&amount=3&powered_by=true&campaign_id=137&promo_id=4497" charset="utf-8"></script>';
const GYG_POPULAR_TOURS = '<script async src="https://tpembd.com/content?trs=421888&shmarker=602467&place=Thailand&items=3&locale=en&powered_by=true&campaign_id=108&promo_id=4039" charset="utf-8"></script>';

const GYG_AFFILIATE = 'https://getyourguide.tpo.lv/6HngJ5FC';
const KLOOK_AFFILIATE = 'https://klook.tpo.lv/7Dt6WApj';

function getCityActivityPath(activitySlug: string, citySlug: string) {
  switch (activitySlug) {
    case 'cooking-classes': return `/city/${citySlug}/cooking-classes/`;
    case 'muay-thai': return `/city/${citySlug}/muay-thai/`;
    case 'elephant-sanctuaries': return `/city/${citySlug}/elephant-sanctuaries/`;
    case 'diving-snorkeling': return `/city/${citySlug}/diving-snorkeling/`;
    default: return `/city/${citySlug}/`;
  }
}

export default function ActivitiesPage({ activities }: Props) {
  const { locale } = useRouter();
  const loc = locale || 'en';

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Activities & Tours', href: '/activities/' }
  ];

  const totalActivities = activities.reduce((sum, a) => sum + a.totalActivities, 0);

  return (
    <>
      <SEOHead
        title="Things to Do in Thailand (2025) - Activities, Tours & Experiences"
        description={`Discover ${totalActivities}+ activities in Thailand: cooking classes, Muay Thai, elephant sanctuaries, diving and snorkeling. Compare prices, read reviews, and book across ${activities.reduce((s, a) => s + a.cities.length, 0)} destinations.`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Things to Do in Thailand',
            description: 'Discover the best activities in Thailand: cooking classes, Muay Thai, elephant sanctuaries, diving and snorkeling.',
            url: 'https://go2-thailand.com/activities/',
          }) }}
        />
      </SEOHead>

      <div className="bg-gray-50 min-h-screen">
        {/* Hero */}
        <section className="bg-gray-900 text-white">
          <div className="container-custom py-12">
            <Breadcrumbs items={breadcrumbs} />
            <div className="text-center mt-6">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Things to Do in Thailand
              </h1>
              <p className="text-xl max-w-3xl mx-auto text-gray-300">
                {totalActivities}+ bookable activities across Thailand&apos;s top destinations.
                Cooking classes, Muay Thai, elephant sanctuaries, diving, and more.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            {/* Activity Guide Cards */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Activity Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {activities.map((activity) => (
                <div key={activity.slug} className={`bg-white rounded-lg shadow-lg overflow-hidden border-l-4 ${activity.borderColor}`}>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      <Link href={activity.guidePath} className="hover:underline">
                        {activity.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{activity.description}</p>

                    <div className="flex gap-3 mb-4">
                      <div className="bg-gray-50 rounded px-3 py-1.5 text-center">
                        <div className="text-sm font-bold text-gray-900">{activity.totalActivities}+</div>
                        <div className="text-[10px] text-gray-500">Activities</div>
                      </div>
                      <div className="bg-gray-50 rounded px-3 py-1.5 text-center">
                        <div className="text-sm font-bold text-gray-900">{activity.cities.length}</div>
                        <div className="text-[10px] text-gray-500">Cities</div>
                      </div>
                      <div className="bg-gray-50 rounded px-3 py-1.5 text-center">
                        <div className="text-sm font-bold text-gray-900">{formatPrice(activity.lowestPrice, loc)}+</div>
                        <div className="text-[10px] text-gray-500">From</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {activity.cities.map((city) => (
                        <Link
                          key={city.slug}
                          href={getCityActivityPath(activity.slug, city.slug)}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                        >
                          {city.name.en}
                        </Link>
                      ))}
                    </div>

                    <Link
                      href={activity.guidePath}
                      className={`inline-flex items-center px-5 py-2 text-white text-sm font-semibold rounded-lg transition-colors ${activity.buttonColor}`}
                    >
                      Compare all {activity.title.toLowerCase()} &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Activities by City */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Activities by City</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {['bangkok', 'chiang-mai', 'phuket', 'krabi'].map((citySlug) => {
                  const cityName = citySlug === 'chiang-mai' ? 'Chiang Mai'
                    : citySlug.charAt(0).toUpperCase() + citySlug.slice(1);
                  const cityActivities = activities.filter(a =>
                    a.cities.some(c => c.slug === citySlug)
                  );
                  if (cityActivities.length === 0) return null;
                  return (
                    <div key={citySlug} className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-bold text-gray-900 mb-3">
                        <Link href={`/city/${citySlug}/`} className="hover:underline">
                          {cityName}
                        </Link>
                      </h3>
                      <ul className="space-y-2">
                        {cityActivities.map((a) => {
                          const city = a.cities.find(c => c.slug === citySlug);
                          return (
                            <li key={a.slug}>
                              <Link
                                href={getCityActivityPath(a.slug, citySlug)}
                                className="text-sm text-blue-600 hover:underline"
                              >
                                {a.title}
                              </Link>
                              {city && (
                                <span className="text-xs text-gray-400 ml-1">
                                  ({city.classCount})
                                </span>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Booking Platforms */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Book on Trusted Platforms</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-orange-500">
                <div className="relative h-10 w-32 mb-4">
                  <Image src="/images/partners/klook.svg" alt="Klook" fill className="object-contain object-left" />
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Asia&apos;s leading travel activities platform with competitive pricing and instant confirmation.
                </p>
                <AffiliateWidget scriptContent={KLOOK_WIDGET} className="mb-4" minHeight="200px" />
                <a href={KLOOK_AFFILIATE} target="_blank" rel="noopener noreferrer"
                  className="block w-full bg-orange-500 text-white text-center py-2.5 rounded-lg font-semibold hover:bg-orange-600 transition-colors text-sm">
                  Browse Thailand on Klook
                </a>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-blue-700">
                <div className="relative h-10 w-48 mb-4">
                  <Image src="/images/partners/getyourguide.svg" alt="GetYourGuide" fill className="object-contain object-left" />
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Global tours marketplace with expert local guides, skip-the-line access, and verified reviews.
                </p>
                <AffiliateWidget scriptContent={GYG_POPULAR_TOURS} className="mb-4" minHeight="200px" />
                <a href={GYG_AFFILIATE} target="_blank" rel="noopener noreferrer"
                  className="block w-full bg-blue-700 text-white text-center py-2.5 rounded-lg font-semibold hover:bg-blue-800 transition-colors text-sm">
                  Browse Thailand on GetYourGuide
                </a>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">What are the most popular activities in Thailand?</h3>
                  <p className="text-gray-700">Cooking classes, Muay Thai fights and training, elephant sanctuary visits, and diving/snorkeling trips are among the most popular. All can be booked as day trips in major destinations like Phuket, Chiang Mai, Bangkok, and Krabi.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">How far in advance should I book?</h3>
                  <p className="text-gray-700">During peak season (November-February), popular activities sell out days in advance. Book cooking classes and diving trips 2-3 days ahead. Muay Thai fight tickets and elephant sanctuaries are usually available with shorter notice.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Which city has the most activities?</h3>
                  <p className="text-gray-700">Phuket offers the widest range — diving, Muay Thai, elephant sanctuaries, and cooking classes. Chiang Mai is top for cooking classes and elephant sanctuaries. Bangkok has the best Muay Thai fight stadiums.</p>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-400 text-center mt-8">
              We may earn a commission when you book through our links, at no extra cost to you.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const cookingIndex = getCookingClassesIndex();
  const muayThaiIndex = getMuayThaiIndex();
  const elephantIndex = getElephantSanctuariesIndex();
  const divingIndex = getDivingSnorkelingIndex();

  const activities: ActivityType[] = [];

  if (cookingIndex) {
    const cities = cookingIndex.cities as CityEntry[];
    activities.push({
      slug: 'cooking-classes',
      title: 'Cooking Classes',
      description: 'Learn to cook authentic Thai dishes — pad thai, green curry, mango sticky rice. Hands-on classes with market tours and organic farm visits.',
      borderColor: 'border-orange-400',
      buttonColor: 'bg-orange-600 hover:bg-orange-700',
      guidePath: '/best-cooking-classes-in-thailand/',
      cities,
      totalActivities: cities.reduce((sum, c) => sum + c.classCount, 0),
      lowestPrice: Math.min(...cities.map(c => c.priceRange.from)),
    });
  }

  if (muayThaiIndex) {
    const cities = muayThaiIndex.cities as CityEntry[];
    activities.push({
      slug: 'muay-thai',
      title: 'Muay Thai',
      description: 'Watch electrifying live fights at legendary stadiums or train with professional coaches at world-class gyms across Thailand.',
      borderColor: 'border-red-400',
      buttonColor: 'bg-red-600 hover:bg-red-700',
      guidePath: '/best-muay-thai-in-thailand/',
      cities,
      totalActivities: cities.reduce((sum, c) => sum + c.classCount, 0),
      lowestPrice: Math.min(...cities.map(c => c.priceRange.from)),
    });
  }

  if (elephantIndex) {
    const cities = elephantIndex.cities as CityEntry[];
    activities.push({
      slug: 'elephant-sanctuaries',
      title: 'Elephant Sanctuaries',
      description: 'Visit ethical sanctuaries where rescued elephants roam freely. Feed, bathe, and walk alongside these gentle giants — no riding, no chains.',
      borderColor: 'border-green-400',
      buttonColor: 'bg-green-600 hover:bg-green-700',
      guidePath: '/best-elephant-sanctuaries-in-thailand/',
      cities,
      totalActivities: cities.reduce((sum, c) => sum + c.classCount, 0),
      lowestPrice: Math.min(...cities.map(c => c.priceRange.from)),
    });
  }

  if (divingIndex) {
    const cities = divingIndex.cities as CityEntry[];
    activities.push({
      slug: 'diving-snorkeling',
      title: 'Diving & Snorkeling',
      description: 'Explore Thailand\'s underwater world — from the Similan Islands to Phi Phi\'s coral reefs. Scuba diving for all levels plus snorkeling day trips.',
      borderColor: 'border-blue-400',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
      guidePath: '/best-diving-snorkeling-in-thailand/',
      cities,
      totalActivities: cities.reduce((sum, c) => sum + c.classCount, 0),
      lowestPrice: Math.min(...cities.map(c => c.priceRange.from)),
    });
  }

  return {
    props: { activities },
    revalidate: 86400
  };
};
