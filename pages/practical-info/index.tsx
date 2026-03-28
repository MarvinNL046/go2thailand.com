import { GetStaticProps } from 'next';
import SEOHead from '../../components/SEOHead';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Breadcrumbs from '../../components/Breadcrumbs';
import PreFooterAffiliateBanner from '../../components/PreFooterAffiliateBanner';
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

      <div className="bg-surface-cream min-h-screen">
        {/* Hero Section */}
        <section className="bg-surface-dark text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <span className="font-script text-thailand-gold text-lg">Essential knowledge</span>
              <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6 mt-2">
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
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all p-8 group text-center"
                >
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h2 className="text-xl font-bold font-heading text-gray-900 group-hover:text-thailand-blue transition-colors">
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
            <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">
              {lang === 'nl' ? 'Meer Reisinformatie' : 'More Travel Resources'}
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/visa/" className="bg-surface-cream text-thailand-blue px-6 py-3 rounded-xl font-medium hover:bg-thailand-blue hover:text-white transition-colors">
                {lang === 'nl' ? 'Visum Gids' : 'Visa Guide'}
              </Link>
              <Link href="/weather/" className="bg-surface-cream text-thailand-blue px-6 py-3 rounded-xl font-medium hover:bg-thailand-blue hover:text-white transition-colors">
                {lang === 'nl' ? 'Weer Gids' : 'Weather Guide'}
              </Link>
              <Link href="/transport/" className="bg-surface-cream text-thailand-blue px-6 py-3 rounded-xl font-medium hover:bg-thailand-blue hover:text-white transition-colors">
                {lang === 'nl' ? 'Transport' : 'Transport'}
              </Link>
              <Link href="/esim/" className="bg-surface-cream text-thailand-blue px-6 py-3 rounded-xl font-medium hover:bg-thailand-blue hover:text-white transition-colors">
                eSIM
              </Link>
            </div>
          </div>
        </section>

        <PreFooterAffiliateBanner
          title={lang === 'nl' ? 'Plan Je Thailand Reis' : 'Plan Your Thailand Trip'}
          description={lang === 'nl' ? 'Boek hotels, transport en activiteiten' : 'Book hotels, transport and activities'}
          links={[
            { label: 'Booking.com', href: 'https://booking.tpo.lv/2PT1kR82' },
            { label: 'Trip.com', href: 'https://trip.tpo.lv/TmObooZ5' },
            { label: 'Insurance', href: '/travel-insurance-thailand/', internal: true },
            { label: 'eSIM', href: 'https://saily.tpo.lv/rf9lidnE' },
            { label: 'NordVPN', href: 'https://nordvpn.tpo.lv/ekHF1i55' },
            { label: 'NordPass', href: 'https://nordvpn.tpo.lv/tp12zNjC' },
          ]}
        />
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
