import Head from 'next/head';
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
      icon: '🌤️'
    },
    // More guides can be added here in the future
  ];

  return (
    <>
      <Head>
        <title>Thailand Travel Guides | Go2Thailand</title>
        <meta name="description" content="Comprehensive travel guides for Thailand including weather, transportation, culture, and travel tips." />
      </Head>

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
      </div>
    </>
  );
}