import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumbs from '../../components/Breadcrumbs';

interface ESIMProvider {
  id: number;
  name: string;
  slug: string;
  logo: string;
  description: string;
  features: string[];
  plans: {
    duration: string;
    data: string;
    price: string;
    priceUSD: number;
  }[];
  coverage: string[];
  pros: string[];
  cons: string[];
  affiliateLink: string;
  mobileAppLink?: string;
  qrCodeImage?: string;
  rating: number;
  dealText?: string;
}

interface ESIMPageProps {
  providers: ESIMProvider[];
}

export default function ESIMPage({ providers }: ESIMPageProps) {
  return (
    <>
      <Head>
        <title>Best eSIM for Thailand 2026 | Compare Prices & Data Plans</title>
        <meta name="description" content="Find the best eSIM for Thailand travel. Compare data plans, prices, and coverage from top providers. Stay connected without expensive roaming charges." />
        <meta name="keywords" content="Thailand eSIM, best eSIM Thailand, Thailand travel SIM, mobile data Thailand, eSIM providers Thailand, Thailand internet" />
      </Head>

      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-thailand-blue to-thailand-gold text-white">
          <div className="container-custom py-16">
            <div className="text-center">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Best eSIM for Thailand
              </h1>
              <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                Stay connected in Thailand with affordable data plans - no physical SIM needed!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">
                  📱 Instant Activation
                </div>
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">
                  🌐 Nationwide Coverage
                </div>
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">
                  💰 From $5/week
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Breadcrumbs */}
        <section className="bg-white">
          <div className="container-custom py-6">
            <Breadcrumbs items={[
              { name: 'Home', href: '/' },
              { name: 'Thailand eSIM', href: '/esim' }
            ]} />
            
            {/* Affiliate Notice */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg mt-4">
              <div className="px-4 py-3">
                <p className="text-sm text-center text-orange-800">
                  💡 This page contains affiliate links. We may earn a commission at no extra cost to you when you purchase through our links. 😊
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Info Section */}
        <section className="bg-white section-padding">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Why Use an eSIM in Thailand?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-thailand-blue bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">✈️</span>
                  </div>
                  <h3 className="font-semibold mb-2">Activate Before You Fly</h3>
                  <p className="text-gray-600 text-sm">
                    Set up your eSIM at home and land in Thailand with data ready to go
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-thailand-gold bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💸</span>
                  </div>
                  <h3 className="font-semibold mb-2">Save on Roaming</h3>
                  <p className="text-gray-600 text-sm">
                    Avoid expensive roaming charges with affordable local data rates
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-thailand-red bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📲</span>
                  </div>
                  <h3 className="font-semibold mb-2">Keep Your Number</h3>
                  <p className="text-gray-600 text-sm">
                    Use data on eSIM while keeping your home number active for calls
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Providers Grid */}
        <section className="section-padding">
          <div className="container-custom">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 text-center">
              Compare Thailand eSIM Providers
            </h2>
            
            {/* First batch of providers */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {providers.slice(0, 4).map((provider) => (
                <div key={provider.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {provider.name}
                        </h3>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex text-thailand-gold">
                            {[...Array(5)].map((_, i) => (
                              <span key={i}>{i < provider.rating ? '★' : '☆'}</span>
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">({provider.rating}/5)</span>
                        </div>
                        {provider.dealText && (
                          <span className="inline-block bg-thailand-red text-white px-3 py-1 rounded-full text-sm font-medium">
                            🔥 {provider.dealText}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 mb-6">
                      {provider.description}
                    </p>

                    {/* Features */}
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3">Key Features:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {provider.features.map((feature, index) => (
                          <div key={index} className="flex items-center text-sm text-gray-600">
                            <span className="text-green-500 mr-2">✓</span>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Plans */}
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3">Popular Plans:</h4>
                      <div className="space-y-2">
                        {provider.plans.slice(0, 3).map((plan, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-medium">{plan.duration}</span>
                              <span className="text-sm text-gray-600">{plan.data}</span>
                            </div>
                            <span className="font-bold text-thailand-blue">{plan.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pros & Cons */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <h4 className="font-semibold text-green-600 mb-2">Pros:</h4>
                        <ul className="text-sm space-y-1">
                          {provider.pros.map((pro, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-green-500 mr-2">+</span>
                              <span className="text-gray-600">{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-red-600 mb-2">Cons:</h4>
                        <ul className="text-sm space-y-1">
                          {provider.cons.map((con, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-red-500 mr-2">-</span>
                              <span className="text-gray-600">{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex gap-3">
                      <a 
                        href={provider.affiliateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-thailand-blue text-white text-center py-3 rounded-lg font-semibold hover:bg-thailand-blue-dark transition-colors"
                      >
                        Get {provider.name} eSIM →
                      </a>
                      {provider.mobileAppLink && (
                        <a 
                          href={provider.mobileAppLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors flex items-center gap-2"
                          title="Download Mobile App"
                        >
                          📱 App
                        </a>
                      )}
                    </div>

                    {/* QR Code for mobile scanning */}
                    {provider.qrCodeImage && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-600">
                            <p className="font-semibold mb-1">📱 Scan with your phone</p>
                            <p className="text-xs">Quick access to {provider.name}</p>
                          </div>
                          <div className="relative w-32 h-32 bg-white rounded-lg overflow-hidden shadow-md border border-gray-200">
                            <Image
                              src={provider.qrCodeImage}
                              alt={`${provider.name} QR Code`}
                              width={128}
                              height={128}
                              className="object-contain p-2"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>


            {/* Remaining providers */}
            {providers.length > 4 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {providers.slice(4).map((provider) => (
                  <div key={provider.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            {provider.name}
                          </h3>
                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex text-thailand-gold">
                              {[...Array(5)].map((_, i) => (
                                <span key={i}>{i < provider.rating ? '★' : '☆'}</span>
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">({provider.rating}/5)</span>
                          </div>
                          {provider.dealText && (
                            <span className="inline-block bg-thailand-red text-white px-3 py-1 rounded-full text-sm font-medium">
                              🔥 {provider.dealText}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 mb-6">
                        {provider.description}
                      </p>

                      {/* Features */}
                      <div className="mb-6">
                        <h4 className="font-semibold mb-3">Key Features:</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {provider.features.map((feature, index) => (
                            <div key={index} className="flex items-center text-sm text-gray-600">
                              <span className="text-green-500 mr-2">✓</span>
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Plans */}
                      <div className="mb-6">
                        <h4 className="font-semibold mb-3">Popular Plans:</h4>
                        <div className="space-y-2">
                          {provider.plans.slice(0, 3).map((plan, index) => (
                            <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                              <div className="flex items-center gap-3">
                                <span className="text-sm font-medium">{plan.duration}</span>
                                <span className="text-sm text-gray-600">{plan.data}</span>
                              </div>
                              <span className="font-bold text-thailand-blue">{plan.price}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Pros & Cons */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                          <h4 className="font-semibold text-green-600 mb-2">Pros:</h4>
                          <ul className="text-sm space-y-1">
                            {provider.pros.map((pro, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-green-500 mr-2">+</span>
                                <span className="text-gray-600">{pro}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-red-600 mb-2">Cons:</h4>
                          <ul className="text-sm space-y-1">
                            {provider.cons.map((con, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-red-500 mr-2">-</span>
                                <span className="text-gray-600">{con}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <a 
                        href={provider.affiliateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-thailand-blue text-white text-center py-3 rounded-lg font-semibold hover:bg-thailand-blue-dark transition-colors"
                      >
                        Get {provider.name} eSIM →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Quick Comparison Table */}
        <section className="bg-gray-100 section-padding">
          <div className="container-custom">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Quick Comparison: Airalo vs Yesim vs Saily
              </h2>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-thailand-blue text-white">
                      <tr>
                        <th className="px-6 py-4 text-left">Feature</th>
                        <th className="px-6 py-4 text-center">Airalo</th>
                        <th className="px-6 py-4 text-center">Yesim</th>
                        <th className="px-6 py-4 text-center">Saily</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 font-medium">Best For</td>
                        <td className="px-6 py-4 text-center">Short trips (1-2GB)</td>
                        <td className="px-6 py-4 text-center">Heavy users (5GB+)</td>
                        <td className="px-6 py-4 text-center">Security-minded travelers</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 font-medium">Starting Price</td>
                        <td className="px-6 py-4 text-center">$5 for 1GB/7 days</td>
                        <td className="px-6 py-4 text-center">$25 for Unlimited/7 days</td>
                        <td className="px-6 py-4 text-center">$4 for 1GB/7 days</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium">Networks</td>
                        <td className="px-6 py-4 text-center">AIS, TrueMove, dtac</td>
                        <td className="px-6 py-4 text-center">AIS, dtac</td>
                        <td className="px-6 py-4 text-center">AIS, TrueMove</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 font-medium">Unlimited Plans</td>
                        <td className="px-6 py-4 text-center">❌ No</td>
                        <td className="px-6 py-4 text-center">✅ Yes</td>
                        <td className="px-6 py-4 text-center">❌ No</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium">Security Brand</td>
                        <td className="px-6 py-4 text-center">❌ No</td>
                        <td className="px-6 py-4 text-center">✅ Yes (Free VPN iOS)</td>
                        <td className="px-6 py-4 text-center">✅ By NordVPN</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="px-6 py-4 font-medium">Customer Rating</td>
                        <td className="px-6 py-4 text-center">4.5/5 ⭐</td>
                        <td className="px-6 py-4 text-center">4.3/5 ⭐</td>
                        <td className="px-6 py-4 text-center">4.4/5 ⭐</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-medium">Support Speed</td>
                        <td className="px-6 py-4 text-center">~22 minutes</td>
                        <td className="px-6 py-4 text-center">~2 minutes</td>
                        <td className="px-6 py-4 text-center">24/7 support</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="p-6 bg-thailand-blue-50">
                  <h3 className="font-semibold text-thailand-blue-900 mb-3">🎯 Our Recommendation:</h3>
                  <div className="space-y-2 text-sm">
                    <p className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span><strong>Choose Airalo</strong> if you need just 1-2GB for a short trip or want the most network options.</span>
                    </p>
                    <p className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span><strong>Choose Yesim</strong> if you want unlimited data, need 5GB+, or value the free VPN for security.</span>
                    </p>
                    <p className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span><strong>Choose Saily</strong> if you value cybersecurity expertise (made by NordVPN) and want competitive pricing.</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How to Install Guide */}
        <section className="bg-white section-padding">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                How to Install Your Thailand eSIM
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-thailand-blue text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                    1
                  </div>
                  <h3 className="font-semibold mb-2">Check Compatibility</h3>
                  <p className="text-gray-600 text-sm">
                    Ensure your phone supports eSIM (iPhone XS+, most new Android phones)
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-thailand-blue text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                    2
                  </div>
                  <h3 className="font-semibold mb-2">Purchase Plan</h3>
                  <p className="text-gray-600 text-sm">
                    Choose your data plan and complete purchase online
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-thailand-blue text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                    3
                  </div>
                  <h3 className="font-semibold mb-2">Scan QR Code</h3>
                  <p className="text-gray-600 text-sm">
                    Scan the QR code from your email to install the eSIM
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-thailand-blue text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                    4
                  </div>
                  <h3 className="font-semibold mb-2">Activate in Thailand</h3>
                  <p className="text-gray-600 text-sm">
                    Turn on data roaming when you arrive and you're connected!
                  </p>
                </div>
              </div>
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
                  <h3 className="font-semibold text-lg mb-2">Do I need to remove my physical SIM?</h3>
                  <p className="text-gray-600">
                    No! eSIM works alongside your physical SIM. You can use your eSIM for data in Thailand while keeping your home number active for calls and texts.
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="font-semibold text-lg mb-2">When should I install my eSIM?</h3>
                  <p className="text-gray-600">
                    Install your eSIM before you travel (at home with WiFi). You can install it days or even weeks before your trip, then activate it when you land in Thailand.
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="font-semibold text-lg mb-2">Can I top up my data if I run out?</h3>
                  <p className="text-gray-600">
                    Yes! Most providers allow you to top up your data through their app or website. Some eSIMs automatically renew, while others require manual top-up.
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="font-semibold text-lg mb-2">Which Thai networks do eSIMs use?</h3>
                  <p className="text-gray-600">
                    Most eSIMs connect to major Thai networks like AIS, TrueMove, or dtac. You'll get the same coverage and speeds as local SIM cards.
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
              Stay connected while discovering amazing destinations across the Kingdom
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/city/" className="bg-white text-thailand-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Explore Cities
              </Link>
              <Link href="/food/" className="bg-white bg-opacity-20 text-white border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-thailand-blue transition-colors">
                Thai Food Guide
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // TODO: Replace with actual data from a data file or API
  const providers: ESIMProvider[] = [
    {
      id: 1,
      name: "Airalo",
      slug: "airalo",
      logo: "/images/esim/airalo-logo.png",
      description: "The world's first eSIM store with coverage in 190+ countries. Airalo offers reliable connectivity with competitive prices for Thailand.",
      features: [
        "Instant activation",
        "24/7 customer support",
        "Top-up available",
        "Multiple plan options"
      ],
      plans: [
        { duration: "7 days", data: "1GB", price: "$5", priceUSD: 5 },
        { duration: "15 days", data: "3GB", price: "$13", priceUSD: 13 },
        { duration: "30 days", data: "5GB", price: "$20", priceUSD: 20 }
      ],
      coverage: ["AIS", "TrueMove", "dtac"],
      pros: [
        "Easy to use app",
        "Instant delivery",
        "Good customer support",
        "Referral program"
      ],
      cons: [
        "No unlimited plans",
        "Can be pricey for long stays"
      ],
      affiliateLink: "https://airalo.tp.st/r8TriO5V",
      mobileAppLink: "https://airalo.tp.st/vG2gKDGp",
      qrCodeImage: "/affiliate-qrcodes/airalo/tp-airalo-qr-code.jpeg",
      rating: 4.5,
      dealText: "Get $3 off with code THAILAND"
    },
    {
      id: 2,
      name: "Yesim",
      slug: "yesim",
      logo: "/images/esim/yesim-logo.png",
      description: "Leading eSIM provider with 200+ destinations, offering flexible data plans and unlimited options for Thailand. Includes free VPN for iOS users.",
      features: [
        "Free VPN included",
        "Unlimited data plans",
        "5G/4G coverage",
        "Pay As You Go option"
      ],
      plans: [
        { duration: "7 days", data: "Unlimited", price: "$25", priceUSD: 25 },
        { duration: "15 days", data: "Unlimited", price: "$44", priceUSD: 44 },
        { duration: "30 days", data: "20GB", price: "$34", priceUSD: 34 }
      ],
      coverage: ["AIS", "dtac"],
      pros: [
        "Free VPN for security",
        "Unlimited data options",
        "Better value for 5GB+",
        "Fast customer support"
      ],
      cons: [
        "No small data plans",
        "Minimum 5GB packages"
      ],
      affiliateLink: "https://yesim.tp.st/i9QU4Xm6",
      mobileAppLink: "https://yesim.tp.st/YXSla7MO",
      qrCodeImage: "/affiliate-qrcodes/airalo/tp-yesim-qr-code.jpeg",
      rating: 4.3,
      dealText: "Best for unlimited data"
    },
    {
      id: 3,
      name: "Saily",
      slug: "saily",
      logo: "/images/partners/saily.svg",
      description: "Built by the makers of NordVPN, Saily offers reliable eSIM connectivity in 150+ countries. Affordable plans with easy app-based setup and trusted cybersecurity expertise.",
      features: [
        "Built by NordVPN team",
        "150+ countries covered",
        "Easy app-based setup",
        "Trusted security brand"
      ],
      plans: [
        { duration: "7 days", data: "1GB", price: "$4", priceUSD: 4 },
        { duration: "15 days", data: "3GB", price: "$10", priceUSD: 10 },
        { duration: "30 days", data: "5GB", price: "$16", priceUSD: 16 }
      ],
      coverage: ["AIS", "TrueMove"],
      pros: [
        "Backed by NordVPN security",
        "Competitive pricing",
        "Reliable connections",
        "User-friendly app"
      ],
      cons: [
        "Newer provider",
        "Fewer plan options than competitors"
      ],
      affiliateLink: "https://saily.tpo.lv/rf9lidnE",
      rating: 4.4,
      dealText: "By the makers of NordVPN"
    },
    /* Temporarily disabled - waiting for affiliate approval
    {
      id: 2,
      name: "Holafly",
      slug: "holafly",
      logo: "/images/esim/holafly-logo.png",
      description: "Unlimited data eSIMs for worry-free travel. Perfect for heavy data users and long stays in Thailand.",
      features: [
        "Unlimited data",
        "Keep your WhatsApp",
        "Easy installation",
        "No data limits"
      ],
      plans: [
        { duration: "5 days", data: "Unlimited", price: "$19", priceUSD: 19 },
        { duration: "10 days", data: "Unlimited", price: "$34", priceUSD: 34 },
        { duration: "30 days", data: "Unlimited", price: "$64", priceUSD: 64 }
      ],
      coverage: ["dtac"],
      pros: [
        "Truly unlimited data",
        "Great for streaming",
        "Simple pricing",
        "Good speeds"
      ],
      cons: [
        "More expensive",
        "Limited network choice"
      ],
      affiliateLink: "https://affiliate-link-holafly.com",
      rating: 4.3
    },
    {
      id: 3,
      name: "Nomad",
      slug: "nomad",
      logo: "/images/esim/nomad-logo.png",
      description: "Affordable eSIM plans with good coverage across Thailand. Great value for budget travelers.",
      features: [
        "Competitive prices",
        "Multiple networks",
        "Easy app",
        "Data tracking"
      ],
      plans: [
        { duration: "7 days", data: "1GB", price: "$4.50", priceUSD: 4.5 },
        { duration: "14 days", data: "3GB", price: "$11", priceUSD: 11 },
        { duration: "30 days", data: "5GB", price: "$16", priceUSD: 16 }
      ],
      coverage: ["TrueMove", "AIS"],
      pros: [
        "Very affordable",
        "Good network selection",
        "Fast activation",
        "Regular promotions"
      ],
      cons: [
        "Limited customer support hours",
        "App can be buggy"
      ],
      affiliateLink: "https://affiliate-link-nomad.com",
      rating: 4.2,
      dealText: "20% off first purchase"
    },
    {
      id: 4,
      name: "SimOptions",
      slug: "simoptions",
      logo: "/images/esim/simoptions-logo.png",
      description: "Wide range of eSIM plans for Thailand with flexible data options and durations.",
      features: [
        "Many plan choices",
        "Good coverage",
        "24/7 support",
        "Auto-renewal option"
      ],
      plans: [
        { duration: "8 days", data: "2GB", price: "$8", priceUSD: 8 },
        { duration: "15 days", data: "5GB", price: "$18", priceUSD: 18 },
        { duration: "30 days", data: "10GB", price: "$32", priceUSD: 32 }
      ],
      coverage: ["AIS", "TrueMove"],
      pros: [
        "Flexible plans",
        "Good for families",
        "Reliable service",
        "Easy setup"
      ],
      cons: [
        "Website can be confusing",
        "Prices vary by season"
      ],
      affiliateLink: "https://affiliate-link-simoptions.com",
      rating: 4.0
    }
    */ // End of temporarily disabled providers
  ];

  return {
    props: {
      providers
    }
  };
};