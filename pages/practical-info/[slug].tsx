import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Breadcrumbs from '../../components/Breadcrumbs';
import { getAllPracticalInfo, getPracticalInfoBySlug, generatePracticalInfoBreadcrumbs } from '../../lib/practical-info';

interface SectionItem {
  name: { en: string; nl: string };
  description: { en: string; nl: string };
  how_to_avoid?: { en: string; nl: string };
}

interface Section {
  title: { en: string; nl: string };
  items: SectionItem[];
}

interface FAQ {
  question: { en: string; nl: string };
  answer: { en: string; nl: string };
}

interface PracticalInfo {
  slug: string;
  title: { en: string; nl: string };
  icon: string;
  description: { en: string; nl: string };
  sections: Section[];
  faqs: FAQ[];
  tips: Array<{ en: string; nl: string }>;
  last_updated: string;
  seo: {
    metaTitle: { en: string; nl: string };
    metaDescription: { en: string; nl: string };
  };
}

interface PracticalInfoPageProps {
  info: PracticalInfo;
}

export default function PracticalInfoDetailPage({ info }: PracticalInfoPageProps) {
  const { locale } = useRouter();
  const lang = (locale === 'nl' ? 'nl' : 'en') as 'en' | 'nl';
  const breadcrumbs = generatePracticalInfoBreadcrumbs(info);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": info.faqs.map(faq => ({
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
        <title>{info.seo.metaTitle[lang]}</title>
        <meta name="description" content={info.seo.metaDescription[lang]} />
        <meta property="og:title" content={info.seo.metaTitle[lang]} />
        <meta property="og:description" content={info.seo.metaDescription[lang]} />
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
        <section className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center gap-4">
              <span className="text-5xl">{info.icon}</span>
              <div>
                <h1 className="text-3xl lg:text-5xl font-bold">{info.title[lang]}</h1>
                <p className="text-lg opacity-90 mt-2">{info.description[lang]}</p>
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Content Sections */}
              {info.sections.map((section, sIndex) => (
                <section key={sIndex}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {section.title[lang]}
                  </h2>
                  <div className="space-y-4">
                    {section.items.map((item, iIndex) => (
                      <div key={iIndex} className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{item.name[lang]}</h3>
                        <p className="text-gray-700 mb-3">{item.description[lang]}</p>
                        {item.how_to_avoid && (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                            <span className="font-medium text-green-800">
                              {lang === 'nl' ? 'Hoe te vermijden: ' : 'How to avoid: '}
                            </span>
                            <span className="text-green-700">{item.how_to_avoid[lang]}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              ))}

              {/* FAQs */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {lang === 'nl' ? 'Veelgestelde Vragen' : 'Frequently Asked Questions'}
                </h2>
                <div className="space-y-4">
                  {info.faqs.map((faq, index) => (
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
            <aside className="space-y-6">
              {/* Tips */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">
                  {lang === 'nl' ? 'Snelle Tips' : 'Quick Tips'}
                </h3>
                <ul className="space-y-3">
                  {info.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-yellow-500">💡</span>
                      <span className="text-sm text-gray-700">{tip[lang]}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Related Pages */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">
                  {lang === 'nl' ? 'Gerelateerd' : 'Related'}
                </h3>
                <div className="space-y-2">
                  <Link href="/visa/" className="block text-teal-600 hover:underline text-sm">🛂 {lang === 'nl' ? 'Visum Gids' : 'Visa Guide'}</Link>
                  <Link href="/weather/" className="block text-teal-600 hover:underline text-sm">🌤️ {lang === 'nl' ? 'Weer Gids' : 'Weather Guide'}</Link>
                  <Link href="/transport/" className="block text-teal-600 hover:underline text-sm">🚌 {lang === 'nl' ? 'Transport' : 'Transport'}</Link>
                  <Link href="/practical-info/" className="block text-teal-600 hover:underline text-sm">← {lang === 'nl' ? 'Alle praktische info' : 'All practical info'}</Link>
                </div>
              </div>

              {/* Travel Insurance */}
              <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">🛡️ {lang === 'nl' ? 'Reisverzekering' : 'Travel Insurance'}</h3>
                <p className="text-sm opacity-90 mb-4">
                  {lang === 'nl'
                    ? 'Bescherm jezelf op reis. Vergelijk de beste reisverzekeringen.'
                    : 'Protect yourself while traveling. Compare the best travel insurance.'}
                </p>
                <Link href="/travel-insurance/" className="block bg-white text-teal-600 text-center px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  {lang === 'nl' ? 'Vergelijk Nu' : 'Compare Now'}
                </Link>
              </div>

              {/* eSIM */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold mb-2">📱 Thailand eSIM</h3>
                <p className="text-sm text-gray-600 mb-4">
                  {lang === 'nl'
                    ? 'Blijf verbonden in Thailand. Bestel je eSIM vooraf.'
                    : 'Stay connected in Thailand. Order your eSIM before you go.'}
                </p>
                <a
                  href="https://saily.tpo.lv/rf9lidnE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-thailand-blue text-white text-center px-4 py-2 rounded-lg font-semibold hover:bg-thailand-red transition-colors mb-2"
                >
                  Saily eSIM
                </a>
                <Link href="/esim/" className="block text-teal-600 text-center text-sm hover:underline">
                  {lang === 'nl' ? 'Meer eSIM opties →' : 'More eSIM options →'}
                </Link>
              </div>

              {/* Book Hotels */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold mb-3">
                  {lang === 'nl' ? 'Boek Hotels' : 'Book Hotels'}
                </h3>
                <div className="space-y-3">
                  <a
                    href="https://booking.tpo.lv/2PT1kR82"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-blue-700 text-white text-center px-4 py-2 rounded-lg font-semibold hover:bg-blue-800 transition-colors text-sm"
                  >
                    Booking.com
                  </a>
                  <a
                    href="https://trip.tpo.lv/TmObooZ5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-blue-500 text-white text-center px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors text-sm"
                  >
                    Trip.com
                  </a>
                </div>
                <p className="text-xs text-gray-500 mt-3 text-center">Affiliate links</p>
              </div>

              {/* Activities */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold mb-3">
                  {lang === 'nl' ? 'Activiteiten' : 'Activities'}
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
                <a href="https://klook.tpo.lv/7Dt6WApj" target="_blank" rel="noopener noreferrer" className="bg-white text-thailand-blue px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">Activities</a>
                <a href="https://12go.tpo.lv/tNA80urD" target="_blank" rel="noopener noreferrer" className="bg-white text-thailand-blue px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">Transport</a>
                <a href="https://saily.tpo.lv/rf9lidnE" target="_blank" rel="noopener noreferrer" className="bg-white text-thailand-blue px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">eSIM</a>
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
  const items = getAllPracticalInfo();
  const paths = items.map(item => ({
    params: { slug: item.slug }
  }));

  return {
    paths,
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const info = getPracticalInfoBySlug(slug);

  if (!info) {
    return { notFound: true };
  }

  return {
    props: { info },
    revalidate: 86400
  };
};
