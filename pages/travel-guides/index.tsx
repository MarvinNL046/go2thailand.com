import SEOHead from '../../components/SEOHead';
import Link from 'next/link';
import Breadcrumbs from '../../components/Breadcrumbs';

export default function TravelGuidesIndex() {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Travel Guides', href: '/travel-guides' }
  ];

  const guides = [
    {
      title: 'Thailand Weather by Month',
      href: '/travel-guides/thailand-weather/',
      description: 'Complete monthly weather guide with temperatures, rainfall, and best times to visit',
      icon: ''
    },
    // More guides can be added here in the future
  ];

  return (
    <>
      <SEOHead
        title={`Thailand Travel Guides | Go2Thailand`}
        description="Comprehensive travel guides for Thailand including weather, transportation, culture, and travel tips."
      />

      <div className="bg-gray-50 min-h-screen">
        <section className="bg-white shadow-sm">
          <div className="container-custom py-8">
            <Breadcrumbs items={breadcrumbs} />
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Thailand Travel Guides
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to know for your perfect Thailand adventure
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {guides.map((guide) => (
                <Link key={guide.href} href={guide.href} className="group">
                  <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
                    <div className="text-4xl mb-4">{guide.icon}</div>
                    <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-thailand-blue transition-colors">
                      {guide.title}
                    </h2>
                    <p className="text-gray-600">
                      {guide.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Book Your Trip - Cross-sell Section */}
        <section className="bg-gradient-to-r from-thailand-blue to-thailand-blue-dark py-12">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-white text-center mb-3">Book Your Trip</h2>
            <p className="text-white/80 text-center mb-8 max-w-2xl mx-auto">
              Ready to go? Book everything you need for your Thailand adventure
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <a href="https://trip.tpo.lv/TmObooZ5" target="_blank" rel="noopener noreferrer" className="group">
                <div className="bg-white rounded-lg p-6 text-center hover:shadow-xl transition-shadow h-full">
                  <div className="text-4xl mb-3"></div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-thailand-blue transition-colors">Hotels & Resorts</h3>
                  <p className="text-gray-600 text-sm">Find great deals on Thailand accommodation on Trip.com</p>
                </div>
              </a>
              <a href="https://12go.tpo.lv/tNA80urD" target="_blank" rel="noopener noreferrer" className="group">
                <div className="bg-white rounded-lg p-6 text-center hover:shadow-xl transition-shadow h-full">
                  <div className="text-4xl mb-3"></div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-thailand-blue transition-colors">Transport</h3>
                  <p className="text-gray-600 text-sm">Book trains, buses, ferries, and flights via 12Go Asia</p>
                </div>
              </a>
              <Link href="/activities/" className="group">
                <div className="bg-white rounded-lg p-6 text-center hover:shadow-xl transition-shadow h-full">
                  <div className="text-4xl mb-3"></div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-thailand-blue transition-colors">Activities & Tours</h3>
                  <p className="text-gray-600 text-sm">Discover the best tours, excursions, and experiences</p>
                </div>
              </Link>
            </div>
            <p className="text-white/50 text-xs text-center mt-6">
              Some links are affiliate links. We may earn a commission at no extra cost to you.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}