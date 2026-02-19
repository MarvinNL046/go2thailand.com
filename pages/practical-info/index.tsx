import { GetStaticProps } from 'next';
import SEOHead from '../../components/SEOHead';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Breadcrumbs from '../../components/Breadcrumbs';
import { getAllPracticalInfo } from '../../lib/practical-info';

interface PracticalInfoItem {
  id: number;
  slug: string;
  title: { en: string; nl: string };
  icon: string;
}

interface PracticalInfoPageProps {
  items: PracticalInfoItem[];
}

export default function PracticalInfoIndexPage({ items }: PracticalInfoPageProps) {
  const { locale } = useRouter();
  const lang = (locale === 'nl' ? 'nl' : 'en') as 'en' | 'nl';

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Practical Info', href: '/practical-info/' }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Thailand Practical Travel Info",
    "description": "Essential practical information for traveling to Thailand. Safety tips, money guide, packing list, health info and cultural etiquette.",
    "url": "https://go2-thailand.com/practical-info/",
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
      <SEOHead
        title={`Thailand Travel Tips & Info 2026 | Go2Thailand`}
        description="Essential Thailand travel info for 2026. Scam awareness, ATM & money tips, packing list, health & vaccinations, and Thai etiquette guide."
      >
        <meta name="keywords" content="Thailand travel tips, Thailand safety, Thailand money, Thailand packing list, Thailand vaccinations, Thai culture etiquette" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </SEOHead>

      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                {lang === 'nl' ? 'Praktische Informatie' : 'Practical Travel Info'}
              </h1>
              <p className="text-xl lg:text-2xl mb-4 max-w-3xl mx-auto opacity-90">
                {lang === 'nl'
                  ? 'Alles wat je moet weten voor je reis naar Thailand'
                  : 'Everything you need to know before visiting Thailand'}
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

        {/* Info Cards */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map(item => (
                <Link
                  key={item.id}
                  href={`/practical-info/${item.slug}/`}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all p-8 group text-center"
                >
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h2 className="text-xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors">
                    {item.title[lang]}
                  </h2>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Cross-links */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {lang === 'nl' ? 'Meer Reisinformatie' : 'More Travel Resources'}
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/visa/" className="bg-indigo-100 text-indigo-700 px-6 py-3 rounded-lg font-medium hover:bg-indigo-200 transition-colors">
                {lang === 'nl' ? 'Visum Gids' : 'Visa Guide'}
              </Link>
              <Link href="/weather/" className="bg-blue-100 text-blue-700 px-6 py-3 rounded-lg font-medium hover:bg-blue-200 transition-colors">
                {lang === 'nl' ? 'Weer Gids' : 'Weather Guide'}
              </Link>
              <Link href="/transport/" className="bg-green-100 text-green-700 px-6 py-3 rounded-lg font-medium hover:bg-green-200 transition-colors">
                {lang === 'nl' ? 'Transport' : 'Transport'}
              </Link>
              <Link href="/esim/" className="bg-purple-100 text-purple-700 px-6 py-3 rounded-lg font-medium hover:bg-purple-200 transition-colors">
                eSIM
              </Link>
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
                  {lang === 'nl' ? 'Boek hotels, transport en activiteiten' : 'Book hotels, transport and activities'}
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <a href="https://booking.tpo.lv/2PT1kR82" target="_blank" rel="noopener noreferrer" className="bg-white text-thailand-blue px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">Booking.com</a>
                <a href="https://trip.tpo.lv/TmObooZ5" target="_blank" rel="noopener noreferrer" className="bg-white text-thailand-blue px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">Trip.com</a>
                <Link href="/travel-insurance/" className="bg-white text-thailand-blue px-5 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">Insurance</Link>
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

export const getStaticProps: GetStaticProps = async () => {
  const items = getAllPracticalInfo();
  return {
    props: { items }
  };
};
