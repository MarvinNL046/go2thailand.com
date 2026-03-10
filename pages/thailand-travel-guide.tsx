import { GetStaticProps } from 'next';
import Link from 'next/link';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';

const topCitiesStatic = [
  { slug: 'bangkok', name: 'Bangkok' },
  { slug: 'chiang-mai', name: 'Chiang Mai' },
  { slug: 'phuket', name: 'Phuket' },
  { slug: 'krabi', name: 'Krabi' },
  { slug: 'koh-samui', name: 'Koh Samui' },
  { slug: 'chiang-rai', name: 'Chiang Rai' },
  { slug: 'pai', name: 'Pai' },
  { slug: 'hua-hin', name: 'Hua Hin' },
  { slug: 'koh-phangan', name: 'Koh Phangan' },
  { slug: 'koh-tao', name: 'Koh Tao' },
  { slug: 'ayutthaya', name: 'Ayutthaya' },
  { slug: 'sukhothai', name: 'Sukhothai' },
];

interface TravelGuideProps {
  topCities: { slug: string; name: string }[];
  itineraryCount: number;
}

export default function ThailandTravelGuide({ topCities, itineraryCount }: TravelGuideProps) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Thailand Travel Guide', href: '/thailand-travel-guide/' },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Thailand Travel Guide 2026: Everything You Need to Know',
    description: 'Complete Thailand travel guide 2026. Best cities, islands, itineraries, budget, visa, safety and first-timer tips.',
    url: 'https://go2-thailand.com/thailand-travel-guide/',
    author: { '@type': 'Organization', name: 'Go2 Thailand' },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How many days do you need in Thailand?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most travelers spend 10-14 days in Thailand to cover Bangkok, Chiang Mai, and the southern islands. 7 days is the minimum for a meaningful trip.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the best time to visit Thailand?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'November to April is the dry season and best time to visit most of Thailand. Avoid May-October for the south, and June-October for the north.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Thailand cheap to travel?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Budget travelers can get by on $30-50/day. Mid-range is $60-120/day. Street food costs $1-2, local transport is cheap, and budget guesthouses start at $10-15/night.',
        },
      },
    ],
  };

  const navItems: [string, string][] = [
    ['Best Cities', '#cities'],
    ['Islands', '#islands'],
    ['Itineraries', '#itineraries'],
    ['Budget', '#budget'],
    ['Best Time', '#best-time'],
    ['Visa & Entry', '#visa'],
    ['Safety', '#safety'],
    ['Insurance', '#insurance'],
    ['First Timers', '#first-timers'],
  ];

  return (
    <>
      <SEOHead
        title="Thailand Travel Guide 2026 | Go2 Thailand"
        description="Complete Thailand travel guide for 2026. Best cities, islands, itineraries, budget tips, visa info and first-timer advice. Everything you need for your Thailand trip."
      >
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        <section className="bg-white shadow-sm">
          <div className="container-custom py-8">
            <Breadcrumbs items={breadcrumbs} />
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold font-heading text-gray-900 mb-4">
                Thailand Travel Guide 2026
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need for your Thailand trip — cities, islands, itineraries, budget, visa, and safety.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom max-w-4xl">
            <nav className="bg-white rounded-2xl shadow-md p-6 mb-10">
              <h2 className="text-lg font-bold font-heading text-gray-900 mb-4">In this guide</h2>
              <ul className="grid grid-cols-2 gap-2 text-sm">
                {navItems.map(([label, href]) => (
                  <li key={href}>
                    <a href={href} className="text-thailand-blue hover:underline">{label}</a>
                  </li>
                ))}
              </ul>
            </nav>

            <section id="cities" className="mb-12">
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">Best Cities in Thailand</h2>
              <p className="text-gray-600 mb-6">
                Thailand has 33 cities worth visiting, from the buzzing capital to quiet mountain towns and beach hubs.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {topCities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/city/${city.slug}/`}
                    className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow font-semibold text-thailand-blue"
                  >
                    {city.name}
                  </Link>
                ))}
              </div>
              <Link href="/best-places-to-visit-thailand/" className="text-thailand-blue hover:underline font-semibold">
                See all 33 destinations →
              </Link>
            </section>

            <section id="islands" className="mb-12">
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">Thailand Islands</h2>
              <p className="text-gray-600 mb-4">
                From the famous party island Koh Phangan to the diving paradise Koh Tao — Thailand has an island for every traveler.
              </p>
              <Link href="/islands/" className="text-thailand-blue hover:underline font-semibold">
                Explore all Thai islands →
              </Link>
            </section>

            <section id="itineraries" className="mb-12">
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">Thailand Itineraries</h2>
              <p className="text-gray-600 mb-4">
                We have {itineraryCount} ready-made itineraries ranging from 5 days to 4 weeks, covering every travel style.
              </p>
              <Link href="/itineraries/" className="text-thailand-blue hover:underline font-semibold">
                Browse all itineraries →
              </Link>
            </section>

            <section id="budget" className="mb-12">
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">Thailand on a Budget</h2>
              <p className="text-gray-600 mb-4">
                Thailand is one of the most affordable travel destinations in Southeast Asia.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
                <li>Street food meal: $1–2</li>
                <li>Budget guesthouse: $10–20/night</li>
                <li>Local bus: $0.50–3</li>
                <li>Budget daily total: $30–50</li>
              </ul>
              <Link href="/thailand-index/budget/" className="text-thailand-blue hover:underline font-semibold">
                Full budget breakdown per city →
              </Link>
            </section>

            <section id="best-time" className="mb-12">
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">Best Time to Visit Thailand</h2>
              <p className="text-gray-600 mb-4">
                November to April is ideal for most of Thailand. Each region has its own weather patterns — the south is split into two coasts with opposite seasons.
              </p>
              <Link href="/thailand-index/best-time/" className="text-thailand-blue hover:underline font-semibold">
                Full month-by-month guide →
              </Link>
            </section>

            <section id="visa" className="mb-12">
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">Visa & Entry</h2>
              <p className="text-gray-600 mb-4">
                Most nationalities get a 30-day visa exemption on arrival. Thailand also offers 60-day tourist visas and longer-stay options.
              </p>
              <Link href="/visa/" className="text-thailand-blue hover:underline font-semibold">
                Full visa guide →
              </Link>
            </section>

            <section id="safety" className="mb-12">
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">Is Thailand Safe?</h2>
              <p className="text-gray-600 mb-4">
                Thailand is generally safe for tourists. Common risks include petty theft, scams, and traffic — not violent crime.
              </p>
              <Link href="/is-thailand-safe/" className="text-thailand-blue hover:underline font-semibold">
                Full safety guide →
              </Link>
            </section>

            <section id="insurance" className="mb-12">
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">Travel Insurance</h2>
              <p className="text-gray-600 mb-4">
                Do not skip travel insurance for Thailand. Private hospital bills add up fast, and scooter accidents are the number one cause of tourist claims. We compared two solid options — one for short trips, one for digital nomads.
              </p>
              <Link href="/travel-insurance-thailand/" className="text-thailand-blue hover:underline font-semibold">
                Compare travel insurance for Thailand →
              </Link>
            </section>

            <section id="first-timers" className="mb-12">
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">First Time in Thailand?</h2>
              <p className="text-gray-600 mb-4">
                First-timers often start with Bangkok (2-3 nights), then Chiang Mai (2-3 nights), then the south (islands, 4-7 nights).
              </p>
              <Link href="/thailand-for-first-timers/" className="text-thailand-blue hover:underline font-semibold">
                First-timer guide →
              </Link>
            </section>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-bold font-heading text-gray-900 mb-4">FAQ</h2>
              <div className="space-y-4">
                {faqJsonLd.mainEntity.map((item) => (
                  <div key={item.name}>
                    <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                    <p className="text-gray-600 text-sm">{item.acceptedAnswer.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  let topCities = topCitiesStatic;
  let itineraryCount = 14;

  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { getAllCities } = require('../lib/cities');
    const allCities = getAllCities();
    if (allCities && allCities.length > 0) {
      topCities = allCities.slice(0, 12).map((c: { slug: string; name: string | { en: string } }) => ({
        slug: c.slug,
        name: typeof c.name === 'object' && c.name !== null ? (c.name as { en: string }).en : (c.name as string) || c.slug,
      }));
    }
  } catch {
    // fall back to static list
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { getAllItineraries } = require('../lib/itineraries');
    const allItineraries = getAllItineraries();
    if (allItineraries && allItineraries.length > 0) {
      itineraryCount = allItineraries.length;
    }
  } catch {
    // fall back to default count
  }

  return {
    props: { topCities, itineraryCount },
    revalidate: 86400,
  };
};
