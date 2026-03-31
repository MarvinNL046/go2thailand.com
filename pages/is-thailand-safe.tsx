import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import Link from 'next/link';
import EmailCapture from '../components/EmailCapture';

const faqItems = [
  {
    question: 'Is Thailand safe for tourists?',
    answer: 'Yes, Thailand is generally safe for tourists. The main risks are petty theft, scams targeting tourists, and traffic accidents. Violent crime against tourists is rare.',
  },
  {
    question: 'Is Thailand safe for solo female travelers?',
    answer: 'Thailand is one of the more popular solo female travel destinations in Southeast Asia. Major cities and tourist areas are well-traveled and safe. Take normal precautions at night.',
  },
  {
    question: 'What are the biggest risks in Thailand?',
    answer: 'The biggest risks are road accidents (especially on scooters), tourist scams (tuk-tuk scams, gem scams), petty theft in crowded areas, and jellyfish/sea creatures in certain coastal areas.',
  },
  {
    question: 'Is tap water safe to drink in Thailand?',
    answer: 'No. Do not drink tap water in Thailand. Bottled water is cheap and widely available (about 10 THB / $0.30 per 1.5L bottle).',
  },
];

const risks = [
  { level: 'Low', color: 'bg-green-100 text-green-800', title: 'Violent crime', detail: 'Violent crime against tourists is rare. Thailand is not a high-risk country.' },
  { level: 'Medium', color: 'bg-yellow-100 text-yellow-800', title: 'Petty theft', detail: 'Pickpocketing in crowded markets and tourist areas. Keep valuables secure.' },
  { level: 'Medium', color: 'bg-yellow-100 text-yellow-800', title: 'Tourist scams', detail: 'Tuk-tuk scams, gem scams, fake travel agents. Stick to reputable operators.' },
  { level: 'High', color: 'bg-red-100 text-red-800', title: 'Traffic & scooters', detail: 'Road accidents are the #1 cause of tourist deaths in Thailand. Be very careful on scooters. Get travel insurance that covers motorbikes.' },
  { level: 'Low', color: 'bg-green-100 text-green-800', title: 'Natural disasters', detail: 'Tsunami risk exists on the Andaman coast but is rare. Monsoon flooding in some areas during rainy season.' },
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

export default function IsThailandSafePage() {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Is Thailand Safe?', href: '/is-thailand-safe/' },
  ];

  return (
    <>
      <SEOHead
        title="Is Thailand Safe? Yes — Here's What 35M Tourists Per Year Experience (2026)"
        description="Thailand is one of Asia's safest tourist destinations. Low violent crime, friendly locals, great healthcare. See the real risks (scams, traffic, drinks) and how to avoid them. Updated March 2026."
      >
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        <section className="bg-white shadow-sm">
          <div className="container-custom py-8">
            <Breadcrumbs items={breadcrumbs} />
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold font-heading text-gray-900 mb-4">Is Thailand Safe?</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Honest, up-to-date safety guide for Thailand in 2026. What to watch out for and what not to worry about.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom max-w-3xl">
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-10">
              <p className="text-green-800 font-semibold text-lg">
                Short answer: Yes, Thailand is safe for tourists. Millions of people visit every year without incident. The risks that do exist are manageable with basic awareness.
              </p>
            </div>

            <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">Safety Risk Overview</h2>
            <div className="space-y-4 mb-12">
              {risks.map((risk) => (
                <div key={risk.title} className="bg-white rounded-xl shadow-sm p-5 flex gap-4 items-start">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold shrink-0 ${risk.color}`}>{risk.level}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{risk.title}</h3>
                    <p className="text-gray-600 text-sm">{risk.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <EmailCapture heading="Stay safe in Thailand" subtext="Get weekly tips on safety, scams to avoid, and insider advice from experienced travelers." />

            <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-6 mb-12">
              {faqItems.map((item) => (
                <div key={item.question} className="bg-white rounded-xl shadow-sm p-5">
                  <h3 className="font-semibold text-gray-900 mb-2">{item.question}</h3>
                  <p className="text-gray-600 text-sm">{item.answer}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold font-heading text-gray-900 mb-3">More Thailand guides</h2>
              <ul className="space-y-2">
                <li><Link href="/thailand-travel-guide/" className="text-thailand-blue hover:underline">Thailand Travel Guide 2026</Link></li>
                <li><Link href="/thailand-for-first-timers/" className="text-thailand-blue hover:underline">Thailand for First Timers</Link></li>
                <li><Link href="/visa/" className="text-thailand-blue hover:underline">Thailand Visa Guide</Link></li>
                <li><Link href="/travel-security/" className="text-thailand-blue hover:underline">Travel Security Tips</Link></li>
                <li><Link href="/travel-insurance-thailand/" className="text-thailand-blue hover:underline">Travel Insurance for Thailand</Link></li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-bold font-heading text-gray-900 mb-3">Explore Destinations</h2>
              <ul className="space-y-2">
                <li><Link href="/city/bangkok/" className="text-thailand-blue hover:underline">Bangkok Guide</Link></li>
                <li><Link href="/city/chiang-mai/" className="text-thailand-blue hover:underline">Chiang Mai Guide</Link></li>
                <li><Link href="/city/phuket/" className="text-thailand-blue hover:underline">Phuket Guide</Link></li>
                <li><Link href="/islands/" className="text-thailand-blue hover:underline">Thai Islands Guide</Link></li>
                <li><Link href="/best-places-to-visit-thailand/" className="text-thailand-blue hover:underline">Best Places to Visit</Link></li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps = async () => ({ props: {}, revalidate: 604800 });
