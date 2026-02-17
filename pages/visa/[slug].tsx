import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Breadcrumbs from '../../components/Breadcrumbs';
import TripcomWidget from '../../components/TripcomWidget';
import { getAllVisas, getVisaBySlug, generateVisaBreadcrumbs } from '../../lib/visas';

interface Requirement {
  item: { en: string; nl: string };
  detail: { en: string; nl: string };
}

interface Step {
  step: number;
  title: { en: string; nl: string };
  description: { en: string; nl: string };
}

interface FAQ {
  question: { en: string; nl: string };
  answer: { en: string; nl: string };
}

interface Visa {
  slug: string;
  title: { en: string; nl: string };
  icon: string;
  category: string;
  description: { en: string; nl: string };
  requirements: Requirement[];
  duration: {
    initial: string;
    extensions: { en: string; nl: string };
  };
  cost: {
    entry: string;
    extension: string;
  };
  process: {
    steps: Step[];
  };
  eligible_countries?: string[];
  faqs: FAQ[];
  tips: Array<{ en: string; nl: string }>;
  last_updated: string;
  seo: {
    metaTitle: { en: string; nl: string };
    metaDescription: { en: string; nl: string };
  };
}

interface VisaPageProps {
  visa: Visa;
}

export default function VisaDetailPage({ visa }: VisaPageProps) {
  const { locale } = useRouter();
  const lang = (locale === 'nl' ? 'nl' : 'en') as 'en' | 'nl';
  const breadcrumbs = generateVisaBreadcrumbs(visa);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": visa.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question[lang],
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer[lang]
      }
    }))
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": `https://go2-thailand.com${crumb.href}`
    }))
  };

  return (
    <>
      <Head>
        <title>{visa.seo.metaTitle[lang]}</title>
        <meta name="description" content={visa.seo.metaDescription[lang]} />
        <meta property="og:title" content={visa.seo.metaTitle[lang]} />
        <meta property="og:description" content={visa.seo.metaDescription[lang]} />
        <meta property="og:type" content="article" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </Head>

      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl">{visa.icon}</span>
              <div>
                <h1 className="text-3xl lg:text-5xl font-bold">{visa.title[lang]}</h1>
                <p className="text-lg opacity-90 mt-2">{visa.description[lang]}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumbs */}
        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </section>

        {/* Quick Info Bar */}
        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-indigo-50 rounded-lg p-4 text-center">
                <div className="text-sm text-gray-600">{lang === 'nl' ? 'Duur' : 'Duration'}</div>
                <div className="font-bold text-lg text-indigo-700">{visa.duration.initial}</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-sm text-gray-600">{lang === 'nl' ? 'Kosten' : 'Cost'}</div>
                <div className="font-bold text-lg text-green-700">{visa.cost.entry}</div>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 text-center">
                <div className="text-sm text-gray-600">{lang === 'nl' ? 'Verlenging' : 'Extension'}</div>
                <div className="font-bold text-lg text-orange-700">{visa.cost.extension}</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-sm text-gray-600">{lang === 'nl' ? 'Bijgewerkt' : 'Updated'}</div>
                <div className="font-bold text-lg text-blue-700">{visa.last_updated}</div>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Requirements */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {lang === 'nl' ? 'Vereisten' : 'Requirements'}
                </h2>
                <div className="space-y-3">
                  {visa.requirements.map((req, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-4 flex items-start gap-3">
                      <span className="text-green-500 text-xl mt-0.5">✓</span>
                      <div>
                        <h3 className="font-medium text-gray-900">{req.item[lang]}</h3>
                        <p className="text-sm text-gray-600">{req.detail[lang]}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Process Steps */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {lang === 'nl' ? 'Aanvraagproces' : 'Application Process'}
                </h2>
                <div className="space-y-4">
                  {visa.process.steps.map((step) => (
                    <div key={step.step} className="bg-white rounded-lg shadow-md p-6 flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                        {step.step}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">{step.title[lang]}</h3>
                        <p className="text-gray-700 mt-1">{step.description[lang]}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Duration & Extension */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {lang === 'nl' ? 'Verblijfsduur & Verlenging' : 'Duration & Extension'}
                </h2>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">
                        {lang === 'nl' ? 'Initiële verblijfsduur' : 'Initial Stay'}
                      </h3>
                      <p className="text-2xl font-bold text-indigo-600">{visa.duration.initial}</p>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">
                        {lang === 'nl' ? 'Verlenging' : 'Extension'}
                      </h3>
                      <p className="text-gray-700">{visa.duration.extensions[lang]}</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Eligible Countries */}
              {visa.eligible_countries && visa.eligible_countries.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {lang === 'nl' ? 'In Aanmerking Komende Landen' : 'Eligible Countries'}
                  </h2>
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex flex-wrap gap-2">
                      {visa.eligible_countries.map((country, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {country}
                        </span>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* FAQs */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {lang === 'nl' ? 'Veelgestelde Vragen' : 'Frequently Asked Questions'}
                </h2>
                <div className="space-y-4">
                  {visa.faqs.map((faq, index) => (
                    <details key={index} className="bg-white rounded-lg shadow-md group">
                      <summary className="p-6 cursor-pointer font-bold text-gray-900 flex justify-between items-center">
                        {faq.question[lang]}
                        <svg className="w-5 h-5 transform transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <div className="px-6 pb-6 text-gray-700">
                        {faq.answer[lang]}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside>
              <div className="lg:sticky lg:top-4 space-y-6 lg:max-h-[calc(100vh-2rem)] lg:overflow-y-auto">
              {/* Tips */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">
                  {lang === 'nl' ? 'Tips' : 'Tips'}
                </h3>
                <ul className="space-y-3">
                  {visa.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-yellow-500">💡</span>
                      <span className="text-sm text-gray-700">{tip[lang]}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Other Visa Types */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">
                  {lang === 'nl' ? 'Andere Visum Types' : 'Other Visa Types'}
                </h3>
                <div className="space-y-2">
                  <Link href="/visa/" className="block text-indigo-600 hover:underline text-sm">
                    ← {lang === 'nl' ? 'Alle visum types bekijken' : 'View all visa types'}
                  </Link>
                </div>
              </div>

              {/* Travel Insurance CTA */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">
                  {lang === 'nl' ? 'Reisverzekering Nodig?' : 'Need Travel Insurance?'}
                </h3>
                <p className="text-sm opacity-90 mb-4">
                  {lang === 'nl'
                    ? 'Sommige visa vereisen een reisverzekering. Vergelijk de beste opties.'
                    : 'Some visas require travel insurance. Compare the best options.'}
                </p>
                <Link
                  href="/travel-insurance/"
                  className="block bg-white text-indigo-600 text-center px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  {lang === 'nl' ? 'Vergelijk Verzekeringen' : 'Compare Insurance'}
                </Link>
              </div>

              {/* eSIM CTA */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold mb-2">📱 Thailand eSIM</h3>
                <p className="text-sm text-gray-600 mb-4">
                  {lang === 'nl'
                    ? 'Blijf verbonden zodra je landt in Thailand'
                    : 'Stay connected as soon as you land in Thailand'}
                </p>
                <a
                  href="https://saily.tpo.lv/rf9lidnE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-thailand-blue text-white text-center px-4 py-2 rounded-lg font-semibold hover:bg-thailand-red transition-colors mb-2"
                >
                  Saily eSIM
                </a>
                <Link
                  href="/esim/"
                  className="block text-thailand-blue text-center text-sm hover:underline"
                >
                  {lang === 'nl' ? 'Meer eSIM opties →' : 'More eSIM options →'}
                </Link>
              </div>

              {/* Trip.com Widget */}
              <TripcomWidget
                city="Thailand"
                type="searchbox"
                customTitle={lang === 'nl' ? 'Boek je Thailand Reis' : 'Book Your Thailand Trip'}
              />

              {/* Book Activities */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold mb-3">
                  {lang === 'nl' ? 'Boek Activiteiten' : 'Book Activities'}
                </h3>
                <div className="space-y-3">
                  <a
                    href="https://klook.tpo.lv/7Dt6WApj"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-orange-500 text-white text-center px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors text-sm"
                  >
                    Klook Activities
                  </a>
                  <a
                    href="https://getyourguide.tpo.lv/GuAFfGGK"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-red-500 text-white text-center px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors text-sm"
                  >
                    GetYourGuide Tours
                  </a>
                </div>
                <p className="text-xs text-gray-500 mt-3 text-center">Affiliate links</p>
              </div>
              </div>
            </aside>
          </div>
        </div>

        {/* Affiliate Banner */}
        <section className="bg-gradient-to-r from-thailand-blue to-thailand-gold">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-white">
                <h2 className="text-2xl font-bold mb-1">
                  {lang === 'nl' ? 'Plan Je Thailand Reis' : 'Plan Your Thailand Trip'}
                </h2>
                <p className="opacity-90 text-sm">
                  {lang === 'nl' ? 'Boek hotels, transport en activiteiten' : 'Book hotels, transport and activities'}
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <a href="https://booking.tpo.lv/2PT1kR82" target="_blank" rel="noopener noreferrer" className="bg-white text-thailand-blue px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">Booking.com</a>
                <a href="https://trip.tpo.lv/TmObooZ5" target="_blank" rel="noopener noreferrer" className="bg-white text-thailand-blue px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">Trip.com</a>
                <Link href="/travel-insurance/" className="bg-white text-thailand-blue px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">Insurance</Link>
                <a href="https://saily.tpo.lv/rf9lidnE" target="_blank" rel="noopener noreferrer" className="bg-white text-thailand-blue px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">eSIM</a>
                <a href="https://12go.tpo.lv/tNA80urD" target="_blank" rel="noopener noreferrer" className="bg-white text-thailand-blue px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">Transport</a>
              </div>
            </div>
            <p className="text-white/70 text-xs text-center mt-4">Some links are affiliate links. We may earn a commission at no extra cost to you.</p>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const visas = getAllVisas();
  const paths = visas.map(visa => ({
    params: { slug: visa.slug }
  }));

  return {
    paths,
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const visa = getVisaBySlug(slug);

  if (!visa) {
    return { notFound: true };
  }

  return {
    props: {
      visa
    },
    revalidate: 86400
  };
};
