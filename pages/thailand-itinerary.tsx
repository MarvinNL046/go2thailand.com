import { GetStaticProps } from 'next';
import Link from 'next/link';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';

interface ItineraryItem {
  slug: string;
  title: string;
}

interface PageProps {
  itineraries: ItineraryItem[];
}

const durations = [
  { days: '7 days', title: 'One Week in Thailand', desc: 'Bangkok (2 nights) + Chiang Mai (2 nights) + island (3 nights). Fast but rewarding.', ideal: 'First-timers, short vacation' },
  { days: '10 days', title: '10 Days in Thailand', desc: 'Bangkok (2) + Chiang Mai (3) + two islands (5). The sweet spot for most travelers.', ideal: 'Most popular choice' },
  { days: '2 weeks', title: 'Two Weeks in Thailand', desc: 'Bangkok (2) + north (4) + island hopping (7). Time for a cooking class and day trips.', ideal: 'First-timers who want variety' },
  { days: '3 weeks', title: 'Three Weeks in Thailand', desc: 'Add Chiang Rai, Pai, or multiple islands. Start going deeper into culture and nature.', ideal: 'Repeat visitors, slow travelers' },
];

const faqItems = [
  { question: 'How long should I spend in Thailand?', answer: '10-14 days is ideal for a first trip. This gives you time for Bangkok, one northern destination, and 4-7 days on the islands.' },
  { question: 'What is the best itinerary for Thailand?', answer: 'The classic route: Bangkok (2-3 nights) → Chiang Mai (2-3 nights) → southern islands (4-7 nights). This covers culture, nature, and beaches.' },
  { question: 'Can I do Thailand in 7 days?', answer: 'Yes, but you will need to choose: either Bangkok + Chiang Mai, or Bangkok + one island. Trying to do both north and south in 7 days involves a lot of travel.' },
  { question: 'What is the best time for a Thailand itinerary?', answer: 'November to February is perfect: cool and dry across most of the country. March-April is hot. May-October is monsoon season (cheaper, but some islands close down).' },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(item => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
};

export default function ThailandItineraryPage({ itineraries }: PageProps) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Thailand Itinerary', href: '/thailand-itinerary/' },
  ];

  return (
    <>
      <SEOHead
        title="Thailand Itinerary 2026: Best Routes for Every Trip Length | Go2 Thailand"
        description="The best Thailand itineraries for 2026. 7-day, 10-day, 2-week and 3-week routes with tips on what to skip, where to go, and how to plan the perfect Thailand trip."
      >
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        <section className="bg-white shadow-sm">
          <div className="container-custom py-8">
            <Breadcrumbs items={breadcrumbs} />
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold font-heading text-gray-900 mb-4">Thailand Itinerary 2026</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                The best routes for every trip length — from 7 days to 3 weeks. Choose your itinerary and go.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom max-w-4xl">

            <section className="mb-12">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">Choose Your Trip Length</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {durations.map((d) => (
                  <div key={d.days} className="bg-white rounded-2xl shadow-md p-6">
                    <div className="text-thailand-blue font-bold text-sm mb-1">{d.days}</div>
                    <h3 className="text-lg font-bold font-heading text-gray-900 mb-2">{d.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{d.desc}</p>
                    <span className="text-xs bg-surface-cream text-gray-600 px-3 py-1 rounded-full">Ideal for: {d.ideal}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">The Classic Thailand Route</h2>
              <div className="bg-white rounded-2xl shadow-md p-6">
                <div className="space-y-4">
                  {[
                    { step: 'Start', city: 'Bangkok', detail: 'Fly in. 2-3 nights. Grand Palace, Wat Pho, street food, nightlife.' },
                    { step: 'North', city: 'Chiang Mai', detail: 'Fly or train from Bangkok. 2-3 nights. Temples, elephant sanctuary, cooking class.' },
                    { step: 'South', city: 'Islands', detail: 'Fly from Chiang Mai. 4-7 nights. Choose based on vibe: Koh Samui (relaxed), Koh Phangan (party), Koh Tao (diving), Krabi/Phuket (beaches).' },
                    { step: 'Fly out', city: 'Bangkok or Phuket', detail: 'Most direct international flights leave from Bangkok (BKK/DMK) or Phuket (HKT).' },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <span className="text-thailand-blue font-bold shrink-0 w-16">{item.step}</span>
                      <div>
                        <span className="font-semibold text-gray-900">{item.city}</span>
                        <p className="text-gray-600 text-sm">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {itineraries.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">Ready-Made Itineraries</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {itineraries.map((itin) => (
                    <Link
                      key={itin.slug}
                      href={`/itineraries/${itin.slug}/`}
                      className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow"
                    >
                      <span className="font-semibold text-gray-900">{itin.title}</span>
                      <span className="text-thailand-blue text-sm ml-2">→</span>
                    </Link>
                  ))}
                </div>
                <Link href="/itineraries/" className="text-thailand-blue hover:underline font-semibold mt-4 inline-block">
                  See all itineraries →
                </Link>
              </section>
            )}

            <section className="mb-12">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">FAQ</h2>
              <div className="space-y-6">
                {faqItems.map((item) => (
                  <div key={item.question} className="bg-white rounded-xl shadow-sm p-5">
                    <h3 className="font-semibold text-gray-900 mb-2">{item.question}</h3>
                    <p className="text-gray-600 text-sm">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold font-heading text-gray-900 mb-3">Plan your trip</h2>
              <ul className="space-y-2">
                <li><Link href="/thailand-travel-guide/" className="text-thailand-blue hover:underline">Complete Thailand Travel Guide</Link></li>
                <li><Link href="/best-places-to-visit-thailand/" className="text-thailand-blue hover:underline">Best Places to Visit</Link></li>
                <li><Link href="/thailand-index/best-time/" className="text-thailand-blue hover:underline">Best Time to Visit</Link></li>
                <li><Link href="/thailand-index/budget/" className="text-thailand-blue hover:underline">Budget Guide</Link></li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-bold font-heading text-gray-900 mb-3">Add to your itinerary</h2>
              <ul className="space-y-2">
                <li><Link href="/islands/" className="text-thailand-blue hover:underline">Thai Islands Guide</Link></li>
                <li><Link href="/food/" className="text-thailand-blue hover:underline">Thai Food Guide</Link></li>
                <li><Link href="/best-cooking-classes-in-thailand/" className="text-thailand-blue hover:underline">Cooking Classes</Link></li>
                <li><Link href="/transport/" className="text-thailand-blue hover:underline">Transport Routes</Link></li>
                <li><Link href="/region/" className="text-thailand-blue hover:underline">Explore by Region</Link></li>
                <li><Link href="/travel-insurance-thailand/" className="text-thailand-blue hover:underline">Travel Insurance</Link></li>
              </ul>
            </div>

          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  let itineraries: ItineraryItem[] = [];
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { getAllItineraries } = require('../lib/itineraries');
    const all = getAllItineraries();
    itineraries = all.map((item: any) => ({
      slug: item.slug,
      title: (typeof item.title === 'object' ? item.title?.en : item.title) || item.name || item.slug,
    }));
  } catch {}

  return {
    props: { itineraries },
    revalidate: 86400,
  };
};
