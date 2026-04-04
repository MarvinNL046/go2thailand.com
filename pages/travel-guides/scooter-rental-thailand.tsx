import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import SEOHead from '../../components/SEOHead';
import Link from 'next/link';
import Breadcrumbs from '../../components/Breadcrumbs';
import guideData from '../../data/travel-guides/scooter-rental-thailand.json';

interface FAQ {
  question: string;
  answer: string;
}

interface ScooterGuideProps {
  data: typeof guideData;
}

export default function ScooterRentalThailandPage({ data }: ScooterGuideProps) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: isNl ? 'Reisgidsen' : 'Travel Guides', href: '/travel-guides' },
    { name: isNl ? 'Scooter Huur Thailand' : 'Scooter Rental Thailand', href: '/travel-guides/scooter-rental-thailand' }
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
                {isNl ? 'Scooter & Motor Huur in Thailand' : 'Scooter & Motorbike Rental in Thailand'}
              </h1>
              <p className="text-xl lg:text-2xl mb-8 opacity-90">
                {data.intro}
              </p>
            </div>
          </div>
        </section>

        {/* License & IDP */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <p className="section-label text-center">{isNl ? 'Wettelijke Vereisten' : 'Legal Requirements'}</p>
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4 text-center">
                {data.license.title}
              </h2>
              <p className="text-gray-700 text-center mb-8 max-w-3xl mx-auto">
                {data.license.content}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {data.license.facts.map((fact, i) => (
                  <div key={i} className="bg-gray-50 rounded-2xl p-5 text-center">
                    <p className="text-sm text-gray-500 mb-1">{fact.label}</p>
                    <p className="text-2xl font-bold font-heading text-gray-900 mb-1">{fact.value}</p>
                    <p className="text-xs text-gray-500">{fact.note}</p>
                  </div>
                ))}
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 rounded-r-2xl p-6">
                <p className="font-semibold text-red-800 mb-1">{isNl ? 'Belangrijke Waarschuwing' : 'Important Warning'}</p>
                <p className="text-red-700 text-sm">{data.license.warning}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Prices by City */}
        <section className="section-padding">
          <div className="container-custom">
            <p className="section-label text-center">{isNl ? 'Prijzen' : 'Pricing'}</p>
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4 text-center">
              {data.prices.title}
            </h2>
            <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">{data.prices.note}</p>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-2xl overflow-hidden shadow-md">
                <thead className="bg-thailand-blue text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">{isNl ? 'Stad' : 'City'}</th>
                    <th className="px-4 py-3 text-center">{isNl ? 'Dagelijks (THB)' : 'Daily (THB)'}</th>
                    <th className="px-4 py-3 text-center">{isNl ? 'Wekelijks' : 'Weekly'}</th>
                    <th className="px-4 py-3 text-center">{isNl ? 'Maandelijks' : 'Monthly'}</th>
                    <th className="px-4 py-3 text-center">{isNl ? 'Borg' : 'Deposit'}</th>
                    <th className="px-4 py-3 text-left hidden lg:table-cell">{isNl ? 'Opmerkingen' : 'Notes'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.prices.cities.map((city, i) => (
                    <tr key={city.slug} className={i % 2 === 1 ? 'bg-gray-50' : ''}>
                      <td className="px-4 py-4">
                        <Link href={`/city/${city.slug}/`} className="text-thailand-blue hover:underline font-medium">
                          {city.city}
                        </Link>
                      </td>
                      <td className="px-4 py-4 text-center">{city.daily}</td>
                      <td className="px-4 py-4 text-center">{city.weekly}</td>
                      <td className="px-4 py-4 text-center">{city.monthly}</td>
                      <td className="px-4 py-4 text-center text-sm">{city.deposit}</td>
                      <td className="px-4 py-4 text-sm text-gray-600 hidden lg:table-cell">{city.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-center text-sm text-gray-500 mt-4">
              {isNl ? 'Prijzen in Thaise Baht (THB). $1 \u2248 35 THB.' : 'Prices in Thai Baht (THB). $1 \u2248 35 THB.'}
            </p>
          </div>
        </section>

        {/* Insurance */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <p className="section-label text-center">{isNl ? 'Bescherming' : 'Protection'}</p>
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8 text-center">
                {data.insurance.title}
              </h2>

              <div className="space-y-6">
                {data.insurance.sections.map((section, i) => (
                  <div key={i} className="bg-gray-50 rounded-2xl p-6">
                    <h3 className="font-semibold font-heading text-gray-900 mb-2">{section.heading}</h3>
                    <p className="text-gray-700">{section.content}</p>
                  </div>
                ))}
              </div>

              <p className="text-center mt-6">
                <Link href="/travel-insurance-thailand/" className="text-thailand-blue hover:underline font-medium">
                  {isNl ? 'Vergelijk reisverzekeringen met motordekking \u2192' : 'Compare travel insurance options with motorcycle coverage \u2192'}
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* Safety Tips */}
        <section className="section-padding">
          <div className="container-custom">
            <p className="section-label text-center">{isNl ? 'Blijf Veilig' : 'Stay Safe'}</p>
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8 text-center">
              {data.safety.title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {data.safety.tips.map((tip, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-md p-6">
                  <div className="flex items-start gap-3">
                    <span className="text-xl mt-0.5">{i < 4 ? '\u26A0\uFE0F' : '\uD83D\uDCA1'}</span>
                    <div>
                      <h3 className="font-semibold font-heading text-gray-900 mb-1">{tip.title}</h3>
                      <p className="text-gray-600 text-sm">{tip.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center mt-6">
              <Link href="/practical-info/scams-safety/" className="text-thailand-blue hover:underline font-medium">
                {isNl ? 'Lees onze volledige Thailand oplichting & veiligheidsgids \u2192' : 'Read our full Thailand scams & safety guide \u2192'}
              </Link>
            </p>
          </div>
        </section>

        {/* Pre-Rental Checklist */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <p className="section-label text-center">{isNl ? 'Voor Je Rijdt' : 'Before You Ride'}</p>
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8 text-center">
                {data.preRentalChecklist.title}
              </h2>

              <div className="bg-gray-50 rounded-2xl p-8">
                <ul className="space-y-3">
                  {data.preRentalChecklist.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-green-500 font-bold mt-0.5">\u2713</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Trusted Shops */}
        <section className="section-padding">
          <div className="container-custom">
            <p className="section-label text-center">{isNl ? 'Aanbevolen' : 'Recommended'}</p>
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8 text-center">
              {data.trustedShops.title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {data.trustedShops.shops.map((shop, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-md p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold font-heading text-gray-900">{shop.name}</h3>
                    <span className="text-xs bg-thailand-blue/10 text-thailand-blue px-2 py-1 rounded-full">{shop.priceRange}</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">
                    <Link href={`/city/${shop.slug}/`} className="text-thailand-blue hover:underline">{shop.city}</Link>
                  </p>
                  <p className="text-gray-600 text-sm">{shop.why}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Alternatives */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <p className="section-label text-center">{isNl ? 'Nog Niet Klaar om te Rijden?' : 'Not Ready to Ride?'}</p>
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8 text-center">
                {data.alternatives.title}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.alternatives.options.map((option, i) => (
                  <div key={i} className="bg-gray-50 rounded-2xl p-6">
                    <h3 className="font-semibold font-heading text-gray-900 mb-2">{option.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{option.description}</p>
                    <p className="text-xs text-gray-500">{isNl ? 'Beste voor: ' : 'Best for: '}{option.bestFor}</p>
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
            <p className="font-script text-thailand-gold text-center mb-2">{isNl ? 'Ontdek Meer' : 'Explore More'}</p>
            <h2 className="text-3xl font-bold font-heading text-white text-center mb-3">
              {isNl ? 'Plan Je Thailand Reis' : 'Plan Your Thailand Trip'}
            </h2>
            <p className="text-white/80 text-center mb-8 max-w-2xl mx-auto">
              {isNl ? 'Scooter geregeld? Plan nu de rest van je avontuur.' : 'Got your scooter sorted? Now plan the rest of your adventure.'}
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
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
              <Link href="/travel-guides/sim-card-thailand/" className="group">
                <div className="bg-white rounded-2xl p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all h-full">
                  <div className="text-4xl mb-3">\uD83D\uDCF1</div>
                  <h3 className="font-bold font-heading text-lg mb-2 group-hover:text-thailand-blue transition-colors">
                    {isNl ? 'SIM Kaart Gids' : 'SIM Card Guide'}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {isNl ? 'Blijf verbonden met de beste SIM & eSIM opties' : 'Stay connected with the best SIM & eSIM options'}
                  </p>
                </div>
              </Link>
              <Link href="/travel-insurance-thailand/" className="group">
                <div className="bg-white rounded-2xl p-6 text-center hover:shadow-xl hover:-translate-y-1 transition-all h-full">
                  <div className="text-4xl mb-3">\uD83D\uDEE1\uFE0F</div>
                  <h3 className="font-bold font-heading text-lg mb-2 group-hover:text-thailand-blue transition-colors">
                    {isNl ? 'Reisverzekering' : 'Travel Insurance'}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {isNl ? 'Bescherm jezelf met motorvriendelijke polissen' : 'Protect yourself with motorcycle-friendly policies'}
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
