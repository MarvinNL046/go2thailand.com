import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';

const CITIES = [
  { slug: 'bangkok', name: 'Bangkok', tagline: 'Rooftop bars, mega-clubs, and Khao San Road' },
  { slug: 'phuket', name: 'Phuket', tagline: 'Bangla Road, beach clubs, and island parties' },
  { slug: 'pattaya', name: 'Pattaya', tagline: 'Walking Street, cabarets, and beachfront bars' },
  { slug: 'chiang-mai', name: 'Chiang Mai', tagline: 'Laid-back bars, live music, and night bazaars' },
];

export default function NightlifeIndex() {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Nightlife', href: '/nightlife/' },
  ];

  return (
    <>
      <SEOHead
        title="Thailand Nightlife Guide 2026 — Best Bars & Clubs by City"
        description="Explore the best nightlife in Thailand. City-by-city guides covering bars, clubs, rooftop lounges, and late-night spots with real drink prices for 2026."
      />

      <div className="bg-surface-cream min-h-screen">
        {/* Hero */}
        <section className="bg-surface-dark text-white">
          <div className="container-custom py-16 lg:py-20">
            <Breadcrumbs items={breadcrumbs} />
            <div className="text-center max-w-3xl mx-auto">
              <span className="section-label">Nightlife Guides</span>
              <h1 className="text-4xl lg:text-5xl font-bold font-heading mb-6">
                Thailand Nightlife Guide 2026
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed">
                From Bangkok rooftop cocktails to Phuket beach parties — find the best bars, clubs, and late-night spots with verified drink prices across Thailand's top nightlife cities.
              </p>
            </div>
          </div>
        </section>

        {/* City Grid */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-6">
              {CITIES.map((city) => (
                <Link
                  key={city.slug}
                  href={`/nightlife/${city.slug}/`}
                  className="bg-white rounded-2xl shadow-md p-8 hover:shadow-lg hover:border-thailand-gold/40 border border-transparent transition-all group"
                >
                  <h2 className="text-2xl font-bold font-heading text-gray-900 mb-2 group-hover:text-thailand-gold transition-colors">
                    {city.name}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4">{city.tagline}</p>
                  <span className="text-thailand-gold text-sm font-medium">
                    View nightlife guide &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
