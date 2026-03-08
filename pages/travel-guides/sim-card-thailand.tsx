import { GetStaticProps } from 'next';
import SEOHead from '../../components/SEOHead';
import Link from 'next/link';
import Breadcrumbs from '../../components/Breadcrumbs';
import guideData from '../../data/travel-guides/sim-card-thailand.json';

interface FAQ {
  question: string;
  answer: string;
}

interface SimCardGuideProps {
  data: typeof guideData;
}

export default function SimCardThailandPage({ data }: SimCardGuideProps) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Travel Guides', href: '/travel-guides' },
    { name: 'SIM Card & eSIM Thailand', href: '/travel-guides/sim-card-thailand' }
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faqs.map((faq: FAQ) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return (
    <>
      <SEOHead
        title={data.seo.metaTitle}
        description={data.seo.metaDescription}
      >
        <meta name="keywords" content={data.seo.keywords} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        {/* Hero */}
        <section className="bg-surface-dark text-white">
          <div className="container-custom py-16">
            <Breadcrumbs items={breadcrumbs} />
            <div className="text-center max-w-4xl mx-auto">
              <p className="font-script text-thailand-gold mb-2">Travel Guide</p>
              <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6">
                SIM Card & eSIM in Thailand
              </h1>
              <p className="text-xl lg:text-2xl mb-8 opacity-90">
                {data.intro}
              </p>
            </div>
          </div>
        </section>

        {/* eSIM vs Physical Comparison */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <p className="section-label text-center">Comparison</p>
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8 text-center">
                {data.esimVsPhysical.title}
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-2xl overflow-hidden shadow-md">
                  <thead className="bg-thailand-blue text-white">
                    <tr>
                      <th className="px-4 py-3 text-left">Feature</th>
                      <th className="px-4 py-3 text-center">eSIM</th>
                      <th className="px-4 py-3 text-center">Physical SIM</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {data.esimVsPhysical.comparison.map((row, i) => (
                      <tr key={i} className={i % 2 === 1 ? 'bg-gray-50' : ''}>
                        <td className="px-4 py-3 font-medium text-gray-900">{row.feature}</td>
                        <td className="px-4 py-3 text-center text-gray-700">{row.esim}</td>
                        <td className="px-4 py-3 text-center text-gray-700">{row.physical}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-center mt-6">
                <Link href="/esim/" className="inline-flex items-center gap-2 bg-thailand-blue text-white px-6 py-3 rounded-full font-medium hover:bg-thailand-blue/90 transition-colors">
                  Compare eSIM providers & prices →
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* Three Networks */}
        <section className="section-padding">
          <div className="container-custom">
            <p className="section-label text-center">Networks</p>
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8 text-center">
              {data.networks.title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {data.networks.carriers.map((carrier, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-md p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold font-heading text-gray-900">{carrier.name}</h3>
                    <span className="text-xs bg-thailand-gold/20 text-gray-800 px-2 py-1 rounded-full">{carrier.marketShare}</span>
                  </div>
                  <div className="space-y-2 text-sm mb-4">
                    <p className="text-gray-600"><span className="font-medium text-gray-800">Coverage:</span> {carrier.coverage}</p>
                    <p className="text-gray-600"><span className="font-medium text-gray-800">Speed:</span> {carrier.speed}</p>
                    <p className="text-gray-600"><span className="font-medium text-gray-800">Tourist plan:</span> {carrier.touristPlan}</p>
                  </div>
                  <p className="text-sm font-medium text-thailand-blue">{carrier.verdict}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tourist Plans Table */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <p className="section-label text-center">Plans</p>
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8 text-center">
              {data.touristPlans.title}
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-2xl overflow-hidden shadow-md">
                <thead className="bg-thailand-blue text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">Carrier</th>
                    <th className="px-4 py-3 text-left">Plan</th>
                    <th className="px-4 py-3 text-center">Data</th>
                    <th className="px-4 py-3 text-center">Validity</th>
                    <th className="px-4 py-3 text-center">Price</th>
                    <th className="px-4 py-3 text-left hidden md:table-cell">Highlight</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.touristPlans.plans.map((plan, i) => (
                    <tr key={i} className={i % 2 === 1 ? 'bg-gray-50' : ''}>
                      <td className="px-4 py-3 font-medium text-gray-900">{plan.carrier}</td>
                      <td className="px-4 py-3 text-gray-700">{plan.plan}</td>
                      <td className="px-4 py-3 text-center font-medium">{plan.data}</td>
                      <td className="px-4 py-3 text-center">{plan.validity}</td>
                      <td className="px-4 py-3 text-center font-medium text-gray-900">{plan.price}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 hidden md:table-cell">{plan.highlight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Airport Guide */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <p className="section-label text-center">At the Airport</p>
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8 text-center">
                {data.airportGuide.title}
              </h2>

              <div className="space-y-6">
                {data.airportGuide.airports.map((airport, i) => (
                  <div key={i} className="bg-white rounded-2xl shadow-md p-6">
                    <h3 className="text-lg font-bold font-heading text-gray-900 mb-3">{airport.name}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600"><span className="font-medium text-gray-800">Location:</span> {airport.location}</p>
                        <p className="text-gray-600 mt-1"><span className="font-medium text-gray-800">Hours:</span> {airport.hours}</p>
                      </div>
                      <div>
                        <p className="text-gray-600"><span className="font-medium text-gray-800">Process:</span> {airport.process}</p>
                      </div>
                    </div>
                    <p className="text-sm text-thailand-blue mt-3 font-medium">Tip: {airport.tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 7-Eleven Guide */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <p className="section-label text-center">Convenience</p>
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4 text-center">
                {data.sevenElevenGuide.title}
              </h2>
              <p className="text-gray-600 text-center mb-8">{data.sevenElevenGuide.content}</p>

              <div className="bg-gray-50 rounded-2xl p-8">
                <ol className="space-y-3">
                  {data.sevenElevenGuide.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="bg-thailand-blue text-white text-sm font-bold w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                      <span className="text-gray-700">{step}</span>
                    </li>
                  ))}
                </ol>
                <p className="text-sm text-gray-500 mt-6 border-t border-gray-200 pt-4">
                  {data.sevenElevenGuide.tip}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* eSIM Setup Steps */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <p className="section-label text-center">Step by Step</p>
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8 text-center">
                {data.esimSetup.title}
              </h2>

              <div className="space-y-4">
                {data.esimSetup.steps.map((step) => (
                  <div key={step.step} className="bg-white rounded-2xl shadow-md p-6">
                    <div className="flex items-start gap-4">
                      <span className="bg-thailand-blue text-white text-lg font-bold w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">{step.step}</span>
                      <div>
                        <h3 className="font-semibold font-heading text-gray-900 mb-1">{step.title}</h3>
                        <p className="text-gray-600 text-sm">{step.detail}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tips */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <p className="section-label text-center">Pro Tips</p>
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8 text-center">
                Good to Know
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.tips.map((tip, i) => (
                  <div key={i} className="bg-gray-50 rounded-2xl p-6">
                    <h3 className="font-semibold font-heading text-gray-900 mb-2">{tip.title}</h3>
                    <p className="text-gray-600 text-sm">{tip.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <p className="section-label text-center">Common Questions</p>
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8 text-center">
                Frequently Asked Questions
              </h2>

              <div className="space-y-4">
                {data.faqs.map((faq: FAQ, i: number) => (
                  <details key={i} className="bg-white rounded-2xl shadow-md group" open={i === 0}>
                    <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 hover:text-thailand-blue transition-colors list-none flex items-center justify-between">
                      {faq.question}
                      <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="px-6 pb-4 text-gray-600">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-surface-dark py-12">
          <div className="container-custom">
            <p className="font-script text-thailand-gold text-center mb-2">Stay Connected</p>
            <h2 className="text-3xl font-bold font-heading text-white text-center mb-3">Ready to Explore?</h2>
            <p className="text-white/80 text-center mb-8 max-w-2xl mx-auto">
              Get your SIM sorted and discover the best of Thailand
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Link href="/esim/" className="group">
                <div className="bg-white rounded-2xl p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all h-full">
                  <div className="text-4xl mb-3">📶</div>
                  <h3 className="font-bold font-heading text-lg mb-2 group-hover:text-thailand-blue transition-colors">eSIM Providers</h3>
                  <p className="text-gray-600 text-sm">Compare prices and buy your eSIM before you fly</p>
                </div>
              </Link>
              <Link href="/travel-guides/scooter-rental-thailand/" className="group">
                <div className="bg-white rounded-2xl p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all h-full">
                  <div className="text-4xl mb-3">🛵</div>
                  <h3 className="font-bold font-heading text-lg mb-2 group-hover:text-thailand-blue transition-colors">Scooter Rental</h3>
                  <p className="text-gray-600 text-sm">Prices, license info, and safety tips for renting</p>
                </div>
              </Link>
              <Link href="/itineraries/" className="group">
                <div className="bg-white rounded-2xl p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all h-full">
                  <div className="text-4xl mb-3">🗺️</div>
                  <h3 className="font-bold font-heading text-lg mb-2 group-hover:text-thailand-blue transition-colors">Itineraries</h3>
                  <p className="text-gray-600 text-sm">Day-by-day travel plans for 3 to 14 days</p>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      data: guideData
    }
  };
};
