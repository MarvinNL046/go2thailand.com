import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
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
  const { locale } = useRouter();
  const isNl = locale === 'nl';

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: isNl ? 'Reisgidsen' : 'Travel Guides', href: '/travel-guides' },
    { name: isNl ? 'SIM Kaart & eSIM Thailand' : 'SIM Card & eSIM Thailand', href: '/travel-guides/sim-card-thailand' }
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
              <p className="font-script text-thailand-gold mb-2">{isNl ? 'Reisgids' : 'Travel Guide'}</p>
              <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6">
                {isNl ? 'SIM Kaart & eSIM in Thailand' : 'SIM Card & eSIM in Thailand'}
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
              <p className="section-label text-center">{isNl ? 'Vergelijking' : 'Comparison'}</p>
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8 text-center">
                {data.esimVsPhysical.title}
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-2xl overflow-hidden shadow-md">
                  <thead className="bg-thailand-blue text-white">
                    <tr>
                      <th className="px-4 py-3 text-left">{isNl ? 'Kenmerk' : 'Feature'}</th>
                      <th className="px-4 py-3 text-center">eSIM</th>
                      <th className="px-4 py-3 text-center">{isNl ? 'Fysieke SIM' : 'Physical SIM'}</th>
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
                  {isNl ? 'Vergelijk eSIM aanbieders & prijzen \u2192' : 'Compare eSIM providers & prices \u2192'}
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* Three Networks */}
        <section className="section-padding">
          <div className="container-custom">
            <p className="section-label text-center">{isNl ? 'Netwerken' : 'Networks'}</p>
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
                    <p className="text-gray-600"><span className="font-medium text-gray-800">{isNl ? 'Dekking:' : 'Coverage:'}</span> {carrier.coverage}</p>
                    <p className="text-gray-600"><span className="font-medium text-gray-800">{isNl ? 'Snelheid:' : 'Speed:'}</span> {carrier.speed}</p>
                    <p className="text-gray-600"><span className="font-medium text-gray-800">{isNl ? 'Toeristenplan:' : 'Tourist plan:'}</span> {carrier.touristPlan}</p>
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
            <p className="section-label text-center">{isNl ? 'Abonnementen' : 'Plans'}</p>
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8 text-center">
              {data.touristPlans.title}
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-2xl overflow-hidden shadow-md">
                <thead className="bg-thailand-blue text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">{isNl ? 'Aanbieder' : 'Carrier'}</th>
                    <th className="px-4 py-3 text-left">{isNl ? 'Abonnement' : 'Plan'}</th>
                    <th className="px-4 py-3 text-center">Data</th>
                    <th className="px-4 py-3 text-center">{isNl ? 'Geldigheid' : 'Validity'}</th>
                    <th className="px-4 py-3 text-center">{isNl ? 'Prijs' : 'Price'}</th>
                    <th className="px-4 py-3 text-left hidden md:table-cell">{isNl ? 'Hoogtepunt' : 'Highlight'}</th>
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
              <p className="section-label text-center">{isNl ? 'Op de Luchthaven' : 'At the Airport'}</p>
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8 text-center">
                {data.airportGuide.title}
              </h2>

              <div className="space-y-6">
                {data.airportGuide.airports.map((airport, i) => (
                  <div key={i} className="bg-white rounded-2xl shadow-md p-6">
                    <h3 className="text-lg font-bold font-heading text-gray-900 mb-3">{airport.name}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600"><span className="font-medium text-gray-800">{isNl ? 'Locatie:' : 'Location:'}</span> {airport.location}</p>
                        <p className="text-gray-600 mt-1"><span className="font-medium text-gray-800">{isNl ? 'Openingstijden:' : 'Hours:'}</span> {airport.hours}</p>
                      </div>
                      <div>
                        <p className="text-gray-600"><span className="font-medium text-gray-800">{isNl ? 'Procedure:' : 'Process:'}</span> {airport.process}</p>
                      </div>
                    </div>
                    <p className="text-sm text-thailand-blue mt-3 font-medium">{isNl ? 'Tip: ' : 'Tip: '}{airport.tip}</p>
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
              <p className="section-label text-center">{isNl ? 'Gemak' : 'Convenience'}</p>
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
              <p className="section-label text-center">{isNl ? 'Stap voor Stap' : 'Step by Step'}</p>
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
              <p className="section-label text-center">{isNl ? 'Pro Tips' : 'Pro Tips'}</p>
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8 text-center">
                {isNl ? 'Goed om te Weten' : 'Good to Know'}
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
              <p className="section-label text-center">{isNl ? 'Veelgestelde Vragen' : 'Common Questions'}</p>
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8 text-center">
                {isNl ? 'Veelgestelde Vragen' : 'Frequently Asked Questions'}
              </h2>

              <div className="space-y-4">
                {data.faqs.map((faq: FAQ, i: number) => (
                  <details key={i} className="bg-white rounded-2xl shadow-md group" open={i === 0}>
                    <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 hover:text-thailand-blue transition-colors list-none flex items-center justify-between">
                      {faq.question}
                      <span className="text-gray-400 group-open:rotate-180 transition-transform">\u25BC</span>
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
            <p className="font-script text-thailand-gold text-center mb-2">{isNl ? 'Blijf Verbonden' : 'Stay Connected'}</p>
            <h2 className="text-3xl font-bold font-heading text-white text-center mb-3">
              {isNl ? 'Klaar om te Ontdekken?' : 'Ready to Explore?'}
            </h2>
            <p className="text-white/80 text-center mb-8 max-w-2xl mx-auto">
              {isNl ? 'Regel je SIM kaart en ontdek het beste van Thailand' : 'Get your SIM sorted and discover the best of Thailand'}
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Link href="/esim/" className="group">
                <div className="bg-white rounded-2xl p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all h-full">
                  <div className="text-4xl mb-3">\uD83D\uDCF6</div>
                  <h3 className="font-bold font-heading text-lg mb-2 group-hover:text-thailand-blue transition-colors">
                    {isNl ? 'eSIM Aanbieders' : 'eSIM Providers'}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {isNl ? 'Vergelijk prijzen en koop je eSIM voordat je vliegt' : 'Compare prices and buy your eSIM before you fly'}
                  </p>
                </div>
              </Link>
              <Link href="/travel-guides/scooter-rental-thailand/" className="group">
                <div className="bg-white rounded-2xl p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all h-full">
                  <div className="text-4xl mb-3">\uD83D\uDEF5</div>
                  <h3 className="font-bold font-heading text-lg mb-2 group-hover:text-thailand-blue transition-colors">
                    {isNl ? 'Scooter Huur' : 'Scooter Rental'}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {isNl ? 'Prijzen, rijbewijs info en veiligheidstips voor huur' : 'Prices, license info, and safety tips for renting'}
                  </p>
                </div>
              </Link>
              <Link href="/itineraries/" className="group">
                <div className="bg-white rounded-2xl p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all h-full">
                  <div className="text-4xl mb-3">\uD83D\uDDFA\uFE0F</div>
                  <h3 className="font-bold font-heading text-lg mb-2 group-hover:text-thailand-blue transition-colors">
                    {isNl ? 'Reisroutes' : 'Itineraries'}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {isNl ? 'Dag-voor-dag reisplannen van 3 tot 14 dagen' : 'Day-by-day travel plans for 3 to 14 days'}
                  </p>
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
