import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import Link from 'next/link';

const classicRoute = [
  { city: 'Bangkok', nights: '2–3 nights', desc: 'Start here. Temples, street food, markets, and nightlife. The pulse of Thailand.' },
  { city: 'Chiang Mai', nights: '2–3 nights', desc: 'Northern culture, elephant sanctuaries, cooking classes, and mountain scenery.' },
  { city: 'Southern Islands', nights: '4–7 nights', desc: 'Choose your vibe: party (Koh Phangan), diving (Koh Tao), beaches (Koh Samui, Krabi, Phuket).' },
];

const beforeYouGo = [
  { title: 'Visa', detail: 'Most nationalities get 30 days visa-free on arrival. Check your specific country.', link: { href: '/visa/', label: 'Visa guide' } },
  { title: 'SIM card / eSIM', detail: 'Buy a local SIM at the airport or get an eSIM before you leave.', link: { href: '/esim/', label: 'eSIM guide' } },
  { title: 'Currency', detail: 'Thai Baht (THB). ATMs are everywhere but charge ~200 THB fee. Use Wise or Revolut to minimize fees.' },
  { title: 'Health', detail: 'No mandatory vaccinations. Consider Hep A, Typhoid, and malaria prevention for rural areas. Travel insurance recommended.' },
  { title: 'Language', detail: 'Thai is the official language. English is widely spoken in tourist areas. Learn a few Thai words — locals appreciate it.' },
];

const mistakes = [
  'Overpacking: Thailand is hot and laundry is cheap. Pack light.',
  'Trusting tuk-tuk drivers who "know a better temple" — classic scam.',
  'Not negotiating: markets and tuk-tuks expect it.',
  'Renting a scooter without experience — road accidents are the #1 tourist risk.',
  'Changing money at the airport — terrible rates. Use an ATM in the city.',
  'Disrespecting temple dress codes — cover shoulders and knees.',
];

const faqItems = [
  { question: 'Is Thailand good for first-time solo travelers?', answer: 'Yes. Thailand is one of the most first-timer-friendly destinations in the world. English is widely spoken, transport is easy, and the country is set up for tourism.' },
  { question: 'How much money do I need for Thailand?', answer: 'Budget: $30-50/day. Mid-range: $60-120/day. This covers accommodation, food, local transport, and activities. Flights and big tours are extra.' },
  { question: 'Do I need vaccines for Thailand?', answer: 'No mandatory vaccines. Recommended: Hepatitis A and Typhoid. Check with your doctor. Travel insurance is strongly advised.' },
  { question: 'What should I pack for Thailand?', answer: 'Light, breathable clothes. Reef-safe sunscreen. A scarf (for temples). Flip flops. Power adapter (Thailand uses Type A/B/C — most electronics work fine). That is basically it.' },
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

export default function ThailandForFirstTimers() {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Thailand for First Timers', href: '/thailand-for-first-timers/' },
  ];

  return (
    <>
      <SEOHead
        title="Thailand for First Timers: Complete Beginner Guide 2026 | Go2 Thailand"
        description="First time in Thailand? This complete beginner guide covers the classic route, visa, budget, what to pack, common mistakes, and everything you need to know before you go."
      >
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        <section className="bg-white shadow-sm">
          <div className="container-custom py-8">
            <Breadcrumbs items={breadcrumbs} />
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold font-heading text-gray-900 mb-4">Thailand for First Timers</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to know before your first trip to Thailand — route, budget, visa, what to pack, and what to avoid.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom max-w-3xl">

            <section className="mb-12">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">The Classic First-Timer Route</h2>
              <div className="space-y-4">
                {classicRoute.map((stop, i) => (
                  <div key={stop.city} className="bg-white rounded-xl shadow-sm p-5 flex gap-4">
                    <span className="text-2xl font-bold text-thailand-blue shrink-0">{i + 1}</span>
                    <div>
                      <h3 className="font-bold font-heading text-gray-900">{stop.city} <span className="text-gray-500 font-normal text-sm">({stop.nights})</span></h3>
                      <p className="text-gray-600 text-sm mt-1">{stop.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-gray-600 text-sm mt-4">
                Total: 10–14 days. Shorter trip? Do Bangkok + one destination. Longer? Add Chiang Rai, Pai, or more islands.
              </p>
              <Link href="/itineraries/" className="text-thailand-blue hover:underline font-semibold mt-2 inline-block">
                Browse ready-made itineraries →
              </Link>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">What to Know Before You Go</h2>
              <div className="space-y-4">
                {beforeYouGo.map((item) => (
                  <div key={item.title} className="bg-white rounded-xl shadow-sm p-5">
                    <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.detail}</p>
                    {item.link && (
                      <Link href={item.link.href} className="text-thailand-blue hover:underline text-sm font-semibold mt-1 inline-block">
                        {item.link.label} →
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">Common First-Timer Mistakes</h2>
              <ul className="space-y-3">
                {mistakes.map((mistake) => (
                  <li key={mistake} className="bg-white rounded-xl shadow-sm p-4 flex gap-3">
                    <span className="text-red-500 shrink-0">✗</span>
                    <span className="text-gray-600 text-sm">{mistake}</span>
                  </li>
                ))}
              </ul>
            </section>

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

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-bold font-heading text-gray-900 mb-3">More guides</h2>
              <ul className="space-y-2">
                <li><Link href="/thailand-travel-guide/" className="text-thailand-blue hover:underline">Complete Thailand Travel Guide</Link></li>
                <li><Link href="/is-thailand-safe/" className="text-thailand-blue hover:underline">Is Thailand Safe?</Link></li>
                <li><Link href="/thailand-index/budget/" className="text-thailand-blue hover:underline">Thailand Budget Guide</Link></li>
                <li><Link href="/city/bangkok/" className="text-thailand-blue hover:underline">Bangkok Guide</Link></li>
                <li><Link href="/city/chiang-mai/" className="text-thailand-blue hover:underline">Chiang Mai Guide</Link></li>
              </ul>
            </div>

          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps = async () => ({ props: {}, revalidate: 86400 });
