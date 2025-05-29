import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import EzoicAd from '../../components/EzoicAd';
import { EZOIC_AD_UNITS } from '../../lib/ads/ezoic-config';

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
        <title>Best eSIM for Thailand 2025 | Compare Prices & Data Plans</title>
        <meta name="description" content="Find the best eSIM for Thailand travel. Compare data plans, prices, and coverage from top providers. Stay connected without expensive roaming charges." />
        <meta name="keywords" content="Thailand eSIM, best eSIM Thailand, Thailand travel SIM, mobile data Thailand, eSIM providers Thailand, Thailand internet" />
        <link rel="canonical" href="https://go2-thailand.com/esim/" />
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

        {/* 💰 ESIM HEADER AD - HIGH VISIBILITY */}
        <section className="bg-white py-6">
          <div className="container-custom">
            <EzoicAd 
              adUnit="go2thailand_esim_banner"
              size="banner"
              className="mx-auto"
              lazy={false}
            />
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

            {/* 💰 MID-CONTENT AD - ESIM ENGAGEMENT */}
            {providers.length > 4 && (
              <div className="mb-12">
                <EzoicAd 
                  adUnit="go2thailand_esim_mid_content"
                  size="rectangle"
                  className="mx-auto"
                  lazy={true}
                />
              </div>
            )}

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
      affiliateLink: "https://affiliate-link-airalo.com",
      rating: 4.5,
      dealText: "Get $3 off with code THAILAND"
    },
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
  ];

  return {
    props: {
      providers
    }
  };
};