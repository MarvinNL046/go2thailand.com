import { GetStaticPaths, GetStaticProps } from 'next';
import SEOHead from '../../components/SEOHead';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Breadcrumbs from '../../components/Breadcrumbs';
import PreFooterAffiliateBanner from '../../components/PreFooterAffiliateBanner';
import TravelpayoutsRecoveryPanel from '../../components/TravelpayoutsRecoveryPanel';
import {
  BOOKING_GENERIC,
  GYG_GENERIC,
  KLOOK_GENERIC,
  NORDPASS_GENERIC,
  NORDVPN_GENERIC,
  SAILY_GENERIC,
  TRIP_GENERIC,
  TWELVEGO_GENERIC,
  withPlacementSubId,
} from '../../lib/affiliates';
import { getAllPracticalInfo, getPracticalInfoBySlug, generatePracticalInfoBreadcrumbs } from '../../lib/practical-info';
import { useSubId } from '../../lib/useSubId';

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
  const subId = useSubId();
  const lang = (locale === 'nl' ? 'nl' : 'en') as 'en' | 'nl';
  const breadcrumbs = generatePracticalInfoBreadcrumbs(info);
  const trackAffiliate = (url: string, placement: string) => withPlacementSubId(url, subId, placement);

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

        <section className="py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <TravelpayoutsRecoveryPanel
              pageType="practical"
              placement="practical-slug-recovery"
              slug={info.slug}
              columns={3}
            />
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Content Sections */}
              {info.sections.map((section, sIndex) => (
                <section key={sIndex}>
                  <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">
                    {section.title[lang]}
                  </h2>
                  <div className="space-y-4">
                    {section.items.map((item, iIndex) => (
                      <div key={iIndex} className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all p-6">
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
              <section>
                <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">
                  {lang === 'nl' ? 'Veelgestelde Vragen' : 'Frequently Asked Questions'}
                </h2>
                <div className="space-y-4">
                  {info.faqs.map((faq, index) => (
                    <details key={index} className="bg-white rounded-2xl shadow-md group">
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
              <div className="lg:sticky lg:top-4 space-y-6">
              {/* Tips */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold font-heading mb-4">
                  {lang === 'nl' ? 'Snelle Tips' : 'Quick Tips'}
                </h3>
                <ul className="space-y-3">
                  {info.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-yellow-500"></span>
                      <span className="text-sm text-gray-700">{tip[lang]}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Related Pages */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold font-heading mb-4">
                  {lang === 'nl' ? 'Gerelateerd' : 'Related'}
                </h3>
                <div className="space-y-2">
                  <Link href="/visa/" className="block text-thailand-blue hover:underline text-sm">{lang === 'nl' ? 'Visum Gids' : 'Visa Guide'}</Link>
                  <Link href="/weather/" className="block text-thailand-blue hover:underline text-sm">{lang === 'nl' ? 'Weer Gids' : 'Weather Guide'}</Link>
                  <Link href="/transport/" className="block text-thailand-blue hover:underline text-sm">{lang === 'nl' ? 'Transport' : 'Transport'}</Link>
                  <Link href="/practical-info/" className="block text-thailand-blue hover:underline text-sm">← {lang === 'nl' ? 'Alle praktische info' : 'All practical info'}</Link>
                </div>
              </div>

              {/* Travel Insurance */}
              <div className="bg-surface-dark text-white rounded-2xl p-6">
                <h3 className="text-xl font-bold font-heading mb-2">{lang === 'nl' ? 'Reisverzekering' : 'Travel Insurance'}</h3>
                <p className="text-sm opacity-90 mb-4">
                  {lang === 'nl'
                    ? 'Bescherm jezelf op reis. Vergelijk de beste reisverzekeringen.'
                    : 'Protect yourself while traveling. Compare the best travel insurance.'}
                </p>
                <Link href="/travel-insurance-thailand/" className="block bg-white text-thailand-blue text-center px-4 py-2 rounded-xl font-semibold hover:bg-surface-cream transition-colors">
                  {lang === 'nl' ? 'Vergelijk Nu' : 'Compare Now'}
                </Link>
              </div>

              {/* eSIM */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold font-heading mb-2">Thailand eSIM</h3>
                <p className="text-sm text-gray-600 mb-4">
                  {lang === 'nl'
                    ? 'Blijf verbonden in Thailand. Bestel je eSIM vooraf.'
                    : 'Stay connected in Thailand. Order your eSIM before you go.'}
                </p>
                <a
                  href={trackAffiliate(SAILY_GENERIC, 'sidebar-esim')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-thailand-blue text-white text-center px-4 py-2 rounded-xl font-semibold hover:bg-thailand-red transition-colors mb-2"
                >
                  Saily eSIM
                </a>
                <Link href="/esim/" className="block text-thailand-blue text-center text-sm hover:underline">
                  {lang === 'nl' ? 'Meer eSIM opties →' : 'More eSIM options →'}
                </Link>
              </div>

              {/* Book Hotels */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold font-heading mb-3">
                  {lang === 'nl' ? 'Boek Hotels' : 'Book Hotels'}
                </h3>
                <div className="space-y-3">
                  <a
                    href={trackAffiliate(BOOKING_GENERIC, 'sidebar-hotels-primary')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-thailand-blue text-white text-center px-4 py-2 rounded-xl font-semibold hover:bg-thailand-red transition-colors text-sm"
                  >
                    Booking.com
                  </a>
                  <a
                    href={trackAffiliate(TRIP_GENERIC, 'sidebar-hotels-secondary')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-thailand-blue text-white text-center px-4 py-2 rounded-xl font-semibold hover:bg-thailand-red transition-colors text-sm"
                  >
                    Trip.com
                  </a>
                </div>
                <p className="text-xs text-gray-500 mt-3 text-center">Affiliate links</p>
              </div>

              {/* Activities */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="text-xl font-bold font-heading mb-3">
                  {lang === 'nl' ? 'Activiteiten' : 'Activities'}
                </h3>
                <div className="space-y-3">
                  <a
                    href={trackAffiliate(KLOOK_GENERIC, 'sidebar-activities-primary')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-thailand-red text-white text-center px-4 py-2 rounded-xl font-semibold hover:bg-thailand-blue transition-colors text-sm"
                  >
                    Klook Activities
                  </a>
                  <a
                    href={trackAffiliate(GYG_GENERIC, 'sidebar-activities-secondary')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-thailand-red text-white text-center px-4 py-2 rounded-xl font-semibold hover:bg-thailand-blue transition-colors text-sm"
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

        <PreFooterAffiliateBanner
          title={lang === 'nl' ? 'Plan Je Thailand Reis' : 'Plan Your Thailand Trip'}
          description={lang === 'nl' ? 'Boek hotels, transport en activiteiten' : 'Book hotels, transport and activities'}
          placement="practical-slug-prefooter"
          links={[
            { label: 'Booking.com', href: BOOKING_GENERIC },
            { label: 'Trip.com', href: TRIP_GENERIC },
            { label: 'Activities', href: KLOOK_GENERIC },
            { label: 'Transport', href: TWELVEGO_GENERIC },
            { label: 'eSIM', href: SAILY_GENERIC },
            { label: 'NordVPN', href: NORDVPN_GENERIC },
            { label: 'NordPass', href: NORDPASS_GENERIC },
          ]}
        />
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
    revalidate: 604800
  };
};
