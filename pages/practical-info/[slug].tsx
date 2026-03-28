import { GetStaticPaths, GetStaticProps } from 'next';
import SEOHead from '../../components/SEOHead';
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

// Official sources shown per topic slug
const officialSources: Record<string, { label: string; url: string }[]> = {
  'scams-safety': [
    { label: 'Royal Thai Police', url: 'https://www.royalthaipolice.go.th' },
    { label: 'Tourist Police Thailand (1155)', url: 'https://www.touristpolice.go.th' },
    { label: 'UK FCDO Thailand Travel Advice', url: 'https://www.gov.uk/foreign-travel-advice/thailand' },
  ],
  'atm-money': [
    { label: 'Bank of Thailand', url: 'https://www.bot.or.th/en' },
    { label: 'TAT — Money & Currency', url: 'https://www.tourismthailand.org/Articles/practical-tips-money-currency' },
  ],
  'health-vaccinations': [
    { label: 'Department of Disease Control Thailand', url: 'https://ddc.moph.go.th/en' },
    { label: 'WHO Thailand', url: 'https://www.who.int/countries/tha/' },
    { label: 'CDC Traveler Health — Thailand', url: 'https://wwwnc.cdc.gov/travel/destinations/traveler/none/thailand' },
  ],
  'packing-list': [
    { label: 'TAT Official Travel Tips', url: 'https://www.tourismthailand.org/Articles/practical-tips' },
  ],
  'etiquette-culture': [
    { label: 'TAT Culture & Etiquette', url: 'https://www.tourismthailand.org/Articles/thailand-culture' },
    { label: 'Fine Arts Department Thailand', url: 'https://www.finearts.go.th' },
  ],
};

// Related cross-links shown in sidebar
const relatedLinks = {
  en: [
    { label: 'Visa Guide', href: '/visa/' },
    { label: 'Weather & Climate', href: '/weather/' },
    { label: 'Getting Around', href: '/transport/' },
    { label: 'SIM & Connectivity', href: '/esim/' },
    { label: 'Travel Insurance', href: '/travel-insurance-thailand/' },
    { label: '← All practical info', href: '/practical-info/' },
  ],
  nl: [
    { label: 'Visum Gids', href: '/visa/' },
    { label: 'Weer & Klimaat', href: '/weather/' },
    { label: 'Transport', href: '/transport/' },
    { label: 'SIM & Verbinding', href: '/esim/' },
    { label: 'Reisverzekering', href: '/travel-insurance-thailand/' },
    { label: '← Alle praktische info', href: '/practical-info/' },
  ],
};

export default function PracticalInfoDetailPage({ info }: PracticalInfoPageProps) {
  const { locale } = useRouter();
  const lang = (locale === 'nl' ? 'nl' : 'en') as 'en' | 'nl';
  const breadcrumbs = generatePracticalInfoBreadcrumbs(info);
  const sources = officialSources[info.slug] ?? [];
  const links = relatedLinks[lang];

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

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": info.title[lang],
    "description": info.description[lang],
    "dateModified": info.last_updated,
    "publisher": {
      "@type": "Organization",
      "name": "Go2Thailand",
      "url": "https://go2-thailand.com"
    },
    "url": `https://go2-thailand.com/practical-info/${info.slug}/`
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
      <SEOHead
        title={info.seo.metaTitle[lang]}
        description={info.seo.metaDescription[lang]}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        {/* Hero Section */}
        <section className="bg-surface-dark text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center gap-4">
              <span className="text-5xl">{info.icon}</span>
              <div>
                <h1 className="text-3xl lg:text-5xl font-bold font-heading">{info.title[lang]}</h1>
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

              {/* Last updated + source notice */}
              {info.last_updated && (
                <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-4 text-sm text-blue-800">
                  {lang === 'nl' ? (
                    <>
                      <span className="font-semibold">Bijgewerkt:</span> {info.last_updated}.{' '}
                      Regelgeving, prijzen en procedures in Thailand kunnen wijzigen.
                      Controleer altijd officiële bronnen voor je vertrek.
                    </>
                  ) : (
                    <>
                      <span className="font-semibold">Last updated:</span> {info.last_updated}.{' '}
                      Rules, prices, and procedures in Thailand can change.
                      Always verify with official sources before you travel.
                    </>
                  )}
                </div>
              )}

              {/* Content Sections */}
              {info.sections.map((section, sIndex) => (
                <section key={sIndex}>
                  <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">
                    {section.title[lang]}
                  </h2>
                  <div className="space-y-4">
                    {section.items.map((item, iIndex) => (
                      <div key={iIndex} className="bg-white rounded-2xl shadow-md p-6">
                        <h3 className="text-lg font-bold font-heading text-gray-900 mb-2">{item.name[lang]}</h3>
                        <p className="text-gray-700 mb-3">{item.description[lang]}</p>
                        {item.how_to_avoid && (
                          <div className="bg-green-50 rounded-xl p-3">
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
              {info.faqs.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">
                    {lang === 'nl' ? 'Veelgestelde Vragen' : 'Frequently Asked Questions'}
                  </h2>
                  <div className="space-y-4">
                    {info.faqs.map((faq, index) => (
                      <details key={index} className="bg-white rounded-2xl shadow-md group">
                        <summary className="p-6 cursor-pointer font-bold text-gray-900 flex justify-between items-center">
                          {faq.question[lang]}
                          <svg className="w-5 h-5 flex-shrink-0 transform transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              )}

              {/* Official Sources */}
              {sources.length > 0 && (
                <section>
                  <h2 className="text-xl font-bold font-heading text-gray-900 mb-4">
                    {lang === 'nl' ? 'Officiële Bronnen' : 'Official Sources'}
                  </h2>
                  <div className="bg-white rounded-2xl shadow-md p-6">
                    <p className="text-sm text-gray-600 mb-4">
                      {lang === 'nl'
                        ? 'Verifieer actuele informatie via deze officiële bronnen:'
                        : 'Verify current information through these official sources:'}
                    </p>
                    <ul className="space-y-2">
                      {sources.map((source, i) => (
                        <li key={i}>
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-thailand-blue hover:underline text-sm flex items-center gap-1"
                          >
                            <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            {source.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <aside>
              <div className="lg:sticky lg:top-4 space-y-6">

                {/* Quick Tips */}
                {info.tips.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-md p-6">
                    <h3 className="text-xl font-bold font-heading mb-4">
                      {lang === 'nl' ? 'Snelle Tips' : 'Quick Tips'}
                    </h3>
                    <ul className="space-y-3">
                      {info.tips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-yellow-500 mt-0.5">&#9679;</span>
                          <span className="text-sm text-gray-700">{tip[lang]}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Related Pages */}
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="text-xl font-bold font-heading mb-4">
                    {lang === 'nl' ? 'Gerelateerd' : 'Related'}
                  </h3>
                  <div className="space-y-2">
                    {links.map((link, i) => (
                      <Link
                        key={i}
                        href={link.href}
                        className="block text-thailand-blue hover:underline text-sm"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Travel Insurance — editorial note, no urgency copy */}
                <div className="bg-surface-dark text-white rounded-2xl p-6">
                  <h3 className="text-xl font-bold font-heading mb-2">
                    {lang === 'nl' ? 'Reisverzekering' : 'Travel Insurance'}
                  </h3>
                  <p className="text-sm opacity-80 mb-4">
                    {lang === 'nl'
                      ? 'Medische zorg in Thailand kan duur zijn voor buitenlanders. Een reisverzekering met medische dekking wordt sterk aanbevolen door zowel de TAT als de meeste ambassades.'
                      : 'Medical care in Thailand can be expensive for foreign nationals. Travel insurance with medical coverage is strongly recommended by TAT and most embassies.'}
                  </p>
                  <Link
                    href="/travel-insurance-thailand/"
                    className="block bg-white text-thailand-blue text-center px-4 py-2 rounded-xl font-semibold hover:bg-surface-cream transition-colors text-sm"
                  >
                    {lang === 'nl' ? 'Vergelijk verzekeringen' : 'Compare insurance options'}
                  </Link>
                </div>

                {/* Connectivity */}
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="text-xl font-bold font-heading mb-2">
                    {lang === 'nl' ? 'Verblijf Verbonden' : 'Staying Connected'}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {lang === 'nl'
                      ? 'Thaise SIM-kaarten zijn goedkoop en breed verkrijgbaar op de luchthaven en in 7-Eleven winkels. Een eSIM werkt ook voor de meeste moderne telefoons.'
                      : 'Thai SIM cards are affordable and widely available at the airport and 7-Eleven stores. An eSIM also works for most modern phones.'}
                  </p>
                  <Link
                    href="/esim/"
                    className="block text-thailand-blue text-sm hover:underline text-center"
                  >
                    {lang === 'nl' ? 'SIM & eSIM gids →' : 'SIM & eSIM guide →'}
                  </Link>
                </div>

              </div>
            </aside>

          </div>
        </div>

        {/* Footer nav back to hub */}
        <section className="py-8 bg-white border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Link
              href="/practical-info/"
              className="text-thailand-blue hover:underline font-medium"
            >
              {lang === 'nl' ? '← Terug naar alle praktische info' : '← Back to all practical info'}
            </Link>
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
