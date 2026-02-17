import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Breadcrumbs from '../../components/Breadcrumbs';
import { getAllVisas } from '../../lib/visas';

interface Visa {
  id: number;
  slug: string;
  title: { en: string; nl: string };
  icon: string;
  duration: string;
  cost: string;
  category: string;
}

interface VisaPageProps {
  visas: Visa[];
}

export default function VisaIndexPage({ visas }: VisaPageProps) {
  const { locale } = useRouter();
  const lang = (locale === 'nl' ? 'nl' : 'en') as 'en' | 'nl';

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Visa Guide', href: '/visa/' }
  ];

  const categories = [
    { key: 'tourist', label: { en: 'Tourist Visas', nl: 'Toeristenvisa' }, icon: '🏖️' },
    { key: 'work', label: { en: 'Work & Digital Nomad', nl: 'Werk & Digitale Nomade' }, icon: '💻' },
    { key: 'long-stay', label: { en: 'Long-Stay Visas', nl: 'Langverblijfvisa' }, icon: '🏠' },
    { key: 'premium', label: { en: 'Premium Visas', nl: 'Premium Visa' }, icon: '⭐' },
    { key: 'general', label: { en: 'Processes & Info', nl: 'Processen & Info' }, icon: '📋' }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Thailand Visa Guide 2026",
    "description": "Complete guide to all Thailand visa types in 2026. Visa-free entry, tourist visa, digital nomad visa, retirement visa and more.",
    "url": "https://go2-thailand.com/visa/",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": `https://go2-thailand.com${crumb.href}`
      }))
    }
  };

  return (
    <>
      <Head>
        <title>Thailand Visa Guide 2026: All Visa Types, Requirements & Tips | Go2Thailand</title>
        <meta name="description" content="Complete Thailand visa guide 2026. Visa-free entry (60 days), tourist visa, digital nomad visa (DTV), retirement visa & more. Requirements, costs & step-by-step process." />
        <meta name="keywords" content="Thailand visa, Thailand visa 2026, visa free Thailand, tourist visa Thailand, digital nomad visa Thailand, DTV Thailand" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Thailand Visa Guide 2026
              </h1>
              <p className="text-xl lg:text-2xl mb-4 max-w-3xl mx-auto opacity-90">
                {lang === 'nl'
                  ? 'Alles wat je moet weten over visa voor Thailand'
                  : 'Everything you need to know about visas for Thailand'}
              </p>
              <p className="text-lg max-w-2xl mx-auto opacity-80">
                {lang === 'nl'
                  ? 'Van visumvrije toegang tot langverblijfvisa - vind het juiste visum voor jouw reis'
                  : 'From visa-free entry to long-stay visas — find the right visa for your trip'}
              </p>
            </div>
          </div>
        </section>

        {/* Breadcrumbs */}
        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </section>

        {/* Quick Summary */}
        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h2 className="text-lg font-bold text-green-800 mb-2">
                {lang === 'nl' ? 'Goed nieuws voor Nederlandse reizigers!' : 'Good news for most travelers!'}
              </h2>
              <p className="text-green-700">
                {lang === 'nl'
                  ? 'Sinds 2024 kunnen Nederlanders, Belgen en burgers van 90+ landen Thailand bezoeken zonder visum voor 60 dagen. Verlengbaar met 30 dagen bij immigratie.'
                  : 'Since 2024, citizens of 93+ countries can enter Thailand visa-free for 60 days. Extendable by 30 days at immigration for 1,900 THB.'}
              </p>
            </div>
          </div>
        </section>

        {/* Visa Categories */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {categories.map(category => {
              const categoryVisas = visas.filter(v => v.category === category.key);
              if (categoryVisas.length === 0) return null;

              return (
                <div key={category.key} className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {category.icon} {category.label[lang]}
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryVisas.map(visa => (
                      <Link
                        key={visa.id}
                        href={`/visa/${visa.slug}/`}
                        className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 group"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <span className="text-3xl">{visa.icon}</span>
                          <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs font-medium">
                            {visa.cost}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors mb-2">
                          {visa.title[lang]}
                        </h3>
                        <div className="flex items-center text-sm text-gray-600">
                          <span>Duration: {visa.duration}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {lang === 'nl' ? 'Thailand Visum Overzicht 2026' : 'Thailand Visa Overview 2026'}
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                Thailand offers a variety of visa options to accommodate different types of travelers, from short-term tourists
                to digital nomads and retirees. In 2024, Thailand extended its visa-free entry from 30 to 60 days for citizens
                of 93 countries, making it even easier to visit the Land of Smiles.
              </p>
              <p>
                For longer stays, the Digital Nomad Visa (DTV) introduced in 2024 allows remote workers to stay up to 180 days.
                Retirees aged 50+ can apply for a retirement visa (Non-Immigrant O-A), while the Thailand Privilege Card
                (formerly Elite Visa) offers long-term residence from 5 to 20 years.
              </p>
              <h3>Key Changes in 2024-2026</h3>
              <ul>
                <li>Visa-free entry extended from 30 to 60 days</li>
                <li>New Digital Nomad Visa (DTV) for remote workers</li>
                <li>Thailand Elite rebranded as Thailand Privilege Card</li>
                <li>Long-Term Resident (LTR) visa for high-income individuals</li>
                <li>Thailand Digital Arrival Card (TDAC) replacing paper TM.6 form</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Affiliate Banner */}
        <section className="bg-gradient-to-r from-thailand-blue to-thailand-gold">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-white">
                <h2 className="text-2xl font-bold mb-1">
                  {lang === 'nl' ? 'Plan Je Thailand Reis' : 'Plan Your Thailand Trip'}
                </h2>
                <p className="opacity-90 text-sm">
                  {lang === 'nl' ? 'Boek hotels, transport en meer' : 'Book hotels, transport and more'}
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="https://booking.tpo.lv/2PT1kR82"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-thailand-blue px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors"
                >
                  Booking.com
                </a>
                <a
                  href="https://trip.tpo.lv/TmObooZ5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-thailand-blue px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors"
                >
                  Trip.com
                </a>
                <Link href="/travel-insurance/" className="bg-white text-thailand-blue px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">
                  Travel Insurance
                </Link>
                <a
                  href="https://saily.tpo.lv/rf9lidnE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-thailand-blue px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors"
                >
                  eSIM
                </a>
              </div>
            </div>
            <p className="text-white/70 text-xs text-center mt-4">
              Some links are affiliate links. We may earn a commission at no extra cost to you.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const visas = getAllVisas();

  return {
    props: {
      visas
    }
  };
};
