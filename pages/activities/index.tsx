import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumbs from '../../components/Breadcrumbs';
import AffiliateWidget from '../../components/AffiliateWidget';

const KLOOK_WIDGET = '<script async src="https://tpembd.com/content?currency=USD&trs=421888&shmarker=602467&locale=en&category=4&amount=3&powered_by=true&campaign_id=137&promo_id=4497" charset="utf-8"></script>';
const GYG_POPULAR_TOURS = '<script async src="https://tpembd.com/content?trs=421888&shmarker=602467&place=Thailand&items=3&locale=en&powered_by=true&campaign_id=108&promo_id=4039" charset="utf-8"></script>';
const GYG_CITY_WIDGET = '<script async src="https://tpembd.com/content?trs=421888&shmarker=602467&locale=en-US&powered_by=true&campaign_id=108&promo_id=4040" charset="utf-8"></script>';

const activities = [
  {
    category: 'Tours & Sightseeing',
    items: [
      { name: 'Grand Palace & Wat Pho Tour', city: 'Bangkok', duration: '4-5 hours', price: 'From $25' },
      { name: 'Doi Suthep Temple Half-Day Tour', city: 'Chiang Mai', duration: '3-4 hours', price: 'From $15' },
      { name: 'Phi Phi Islands Day Trip', city: 'Phuket', duration: 'Full day', price: 'From $45' },
    ],
  },
  {
    category: 'Water Activities',
    items: [
      { name: 'Snorkeling at Similan Islands', city: 'Phuket', duration: 'Full day', price: 'From $65' },
      { name: 'Kayaking in Phang Nga Bay', city: 'Phuket', duration: '5-6 hours', price: 'From $35' },
      { name: 'Island Hopping Koh Samui', city: 'Koh Samui', duration: 'Full day', price: 'From $50' },
    ],
  },
  {
    category: 'Cultural Experiences',
    items: [
      { name: 'Thai Cooking Class', city: 'Chiang Mai', duration: 'Half day', price: 'From $30' },
      { name: 'Muay Thai Experience', city: 'Bangkok', duration: '2-3 hours', price: 'From $40' },
      { name: 'Night Market Food Tour', city: 'Bangkok', duration: '3-4 hours', price: 'From $35' },
    ],
  },
  {
    category: 'Adventure',
    items: [
      { name: 'Zip-lining Through the Jungle', city: 'Chiang Mai', duration: '3-4 hours', price: 'From $55' },
      { name: 'Elephant Sanctuary Visit', city: 'Chiang Mai', duration: 'Half day', price: 'From $50' },
      { name: 'Krabi Rock Climbing', city: 'Krabi', duration: '4-5 hours', price: 'From $40' },
    ],
  },
];

const cities = [
  { name: 'Bangkok', slug: 'bangkok', klookLink: 'https://klook.tpo.lv/FXwAY84o', gygLink: 'https://getyourguide.tpo.lv/PHh5hvej' },
  { name: 'Phuket', slug: 'phuket', klookLink: 'https://klook.tpo.lv/7Dt6WApj', gygLink: 'https://getyourguide.tpo.lv/8d41f2Fq' },
  { name: 'Chiang Mai', slug: 'chiang-mai', klookLink: 'https://klook.tpo.lv/SrPrBanh', gygLink: 'https://getyourguide.tpo.lv/8d41f2Fq' },
  { name: 'Krabi', slug: 'krabi', klookLink: 'https://klook.tpo.lv/aq6ZFxvc', gygLink: 'https://getyourguide.tpo.lv/GuAFfGGK' },
  { name: 'Pattaya', slug: 'pattaya', klookLink: 'https://klook.tpo.lv/aq6ZFxvc', gygLink: 'https://getyourguide.tpo.lv/GuAFfGGK' },
];

export default function ActivitiesPage() {
  return (
    <>
      <Head>
        <title>Best Thailand Activities & Tours 2026 | Book on Klook & GetYourGuide</title>
        <meta name="description" content="Discover and book the best activities, tours, and experiences in Thailand. Compare Klook and GetYourGuide for temple tours, island hopping, cooking classes, and more." />
        <meta name="keywords" content="Thailand activities, Thailand tours, Bangkok tours, Phuket activities, Chiang Mai tours, Klook Thailand, GetYourGuide Thailand, Thailand things to do" />
      </Head>

      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-orange-600 to-blue-800 text-white">
          <div className="container-custom py-16">
            <div className="text-center">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Thailand Activities & Tours
              </h1>
              <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                From temple tours and cooking classes to island hopping and adventure activities — book with instant confirmation
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">
                  ✅ Instant Confirmation
                </div>
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">
                  💰 Best Price Guarantee
                </div>
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">
                  🔄 Free Cancellation
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <a
                  href="https://klook.tpo.lv/aq6ZFxvc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Browse on Klook →
                </a>
                <a
                  href="https://getyourguide.tpo.lv/GuAFfGGK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Browse on GetYourGuide →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumbs */}
        <section className="bg-white">
          <div className="container-custom py-6">
            <Breadcrumbs items={[
              { name: 'Home', href: '/' },
              { name: 'Activities & Tours', href: '/activities' }
            ]} />
            <div className="bg-orange-50 border border-orange-200 rounded-lg mt-4">
              <div className="px-4 py-3">
                <p className="text-sm text-center text-orange-800">
                  💡 This page contains affiliate links. We may earn a commission at no extra cost to you when you purchase through our links. 😊
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Comparison */}
        <section className="bg-white section-padding">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Two Great Platforms to Book From
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Klook Card */}
              <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-orange-500">
                <div className="relative h-10 w-32 mb-4">
                  <Image src="/images/partners/klook.svg" alt="Klook" fill className="object-contain object-left" />
                </div>
                <p className="text-gray-600 mb-4">
                  Asia&apos;s leading travel activities platform with 500K+ experiences. Strong focus on Southeast Asian destinations with competitive pricing.
                </p>
                <div className="space-y-2 mb-6">
                  {['Instant booking confirmation', 'Best price guarantee', 'Free cancellation on most activities', 'Mobile vouchers accepted'].map((f, i) => (
                    <div key={i} className="flex items-center text-sm text-gray-600">
                      <span className="text-green-500 mr-2">✓</span>{f}
                    </div>
                  ))}
                </div>
                <a href="https://klook.tpo.lv/aq6ZFxvc" target="_blank" rel="noopener noreferrer"
                  className="block w-full bg-orange-500 text-white text-center py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                  Browse Thailand on Klook →
                </a>
              </div>

              {/* GetYourGuide Card */}
              <div className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-blue-700">
                <div className="relative h-10 w-48 mb-4">
                  <Image src="/images/partners/getyourguide.svg" alt="GetYourGuide" fill className="object-contain object-left" />
                </div>
                <p className="text-gray-600 mb-4">
                  Global tours marketplace with expert local guides and curated experiences. Skip-the-line access and hassle-free booking worldwide.
                </p>
                <div className="space-y-2 mb-6">
                  {['Expert local guides', 'Skip-the-line access', 'Free cancellation up to 24h', 'Verified traveler reviews'].map((f, i) => (
                    <div key={i} className="flex items-center text-sm text-gray-600">
                      <span className="text-green-500 mr-2">✓</span>{f}
                    </div>
                  ))}
                </div>
                <a href="https://getyourguide.tpo.lv/GuAFfGGK" target="_blank" rel="noopener noreferrer"
                  className="block w-full bg-blue-700 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors">
                  Browse Thailand on GetYourGuide →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Klook & GYG Embed Widgets */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Browse & Book Instantly
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Image src="/images/partners/klook.svg" alt="Klook" width={80} height={24} className="mr-2" />
                  Activities
                </h3>
                <AffiliateWidget scriptContent={KLOOK_WIDGET} className="mb-4" minHeight="250px" />
                <a href="https://klook.tpo.lv/aq6ZFxvc" target="_blank" rel="noopener noreferrer"
                  className="block w-full bg-orange-500 text-white text-center py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors text-sm">
                  View All on Klook →
                </a>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Image src="/images/partners/getyourguide.svg" alt="GetYourGuide" width={120} height={24} className="mr-2" />
                  Tours
                </h3>
                <AffiliateWidget scriptContent={GYG_POPULAR_TOURS} className="mb-4" minHeight="250px" />
                <a href="https://getyourguide.tpo.lv/GuAFfGGK" target="_blank" rel="noopener noreferrer"
                  className="block w-full bg-blue-700 text-white text-center py-2 rounded-lg font-medium hover:bg-blue-800 transition-colors text-sm">
                  View All on GetYourGuide →
                </a>
              </div>
            </div>
            <div className="mt-8 max-w-3xl mx-auto">
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Things to Do in Thailand</h3>
              <AffiliateWidget scriptContent={GYG_CITY_WIDGET} minHeight="200px" />
            </div>
          </div>
        </section>

        {/* Activities by Category */}
        <section className="section-padding">
          <div className="container-custom">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 text-center">
              Popular Thailand Activities
            </h2>
            {activities.map((category, catIndex) => (
              <div key={catIndex} className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{category.category}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {category.items.map((item, i) => (
                    <div key={i} className="bg-white rounded-lg shadow-md p-6">
                      <h4 className="font-semibold text-gray-900 mb-2">{item.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span>📍 {item.city}</span>
                        <span>⏱ {item.duration}</span>
                      </div>
                      <p className="text-thailand-blue font-bold mb-4">{item.price}</p>
                      <div className="flex gap-2">
                        <a href="https://klook.tpo.lv/aq6ZFxvc" target="_blank" rel="noopener noreferrer"
                          className="flex-1 bg-orange-500 text-white text-center py-2 rounded text-sm font-medium hover:bg-orange-600 transition-colors">
                          Klook
                        </a>
                        <a href="https://getyourguide.tpo.lv/GuAFfGGK" target="_blank" rel="noopener noreferrer"
                          className="flex-1 bg-blue-700 text-white text-center py-2 rounded text-sm font-medium hover:bg-blue-800 transition-colors">
                          GetYourGuide
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Activities by City */}
        <section className="bg-white section-padding">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Activities by City
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {cities.map((city) => (
                <div key={city.slug} className="bg-gray-50 rounded-lg p-6 text-center">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">{city.name}</h3>
                  <div className="space-y-2">
                    <a href={city.klookLink} target="_blank" rel="noopener noreferrer"
                      className="block bg-orange-500 text-white py-2 rounded text-sm font-medium hover:bg-orange-600 transition-colors">
                      Klook {city.name}
                    </a>
                    <a href={city.gygLink} target="_blank" rel="noopener noreferrer"
                      className="block bg-blue-700 text-white py-2 rounded text-sm font-medium hover:bg-blue-800 transition-colors">
                      GYG {city.name}
                    </a>
                    <Link href={`/city/${city.slug}/`}
                      className="block bg-gray-200 text-gray-700 py-2 rounded text-sm font-medium hover:bg-gray-300 transition-colors">
                      City Guide →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="font-semibold text-lg mb-2">Should I book activities in advance?</h3>
                  <p className="text-gray-600">
                    For popular activities like island tours, cooking classes, and temple visits, we recommend booking at least 2-3 days in advance, especially during peak season (November-March). Both Klook and GetYourGuide offer free cancellation on most activities.
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="font-semibold text-lg mb-2">Klook vs GetYourGuide — which is better for Thailand?</h3>
                  <p className="text-gray-600">
                    Both are excellent! Klook tends to have more Asia-specific activities and sometimes lower prices. GetYourGuide offers more curated experiences with expert guides. We recommend checking both for the best deals.
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="font-semibold text-lg mb-2">Are the activities child-friendly?</h3>
                  <p className="text-gray-600">
                    Many activities in Thailand are perfect for families. Elephant sanctuaries, cooking classes, and boat tours are popular with kids. Check individual activity descriptions for age requirements and family-friendly options.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-thailand-gold to-thailand-blue text-white section-padding">
          <div className="container-custom text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Explore Thailand?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Complete your trip with all the essentials
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/esim/" className="bg-white text-thailand-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Get an eSIM
              </Link>
              <Link href="/travel-security/" className="bg-white bg-opacity-20 text-white border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-thailand-blue transition-colors">
                VPN & Security
              </Link>
              <Link href="/travel-insurance/" className="bg-white bg-opacity-20 text-white border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-thailand-blue transition-colors">
                Travel Insurance
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
