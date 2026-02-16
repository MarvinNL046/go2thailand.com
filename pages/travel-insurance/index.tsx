import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumbs from '../../components/Breadcrumbs';
import { useState } from 'react';

interface InsuranceProvider {
  id: number;
  name: string;
  slug: string;
  logo: string;
  description: string;
  features: string[];
  coverage: {
    medical: string;
    tripCancellation: string;
    baggage: string;
    emergency: string;
  };
  pricing: {
    monthly: string;
    priceUSD: number;
  };
  pros: string[];
  cons: string[];
  affiliateLink: string;
  rating: number;
  bestFor: string;
}

interface TravelInsurancePageProps {
  providers: InsuranceProvider[];
}

export default function TravelInsurancePage({ providers }: TravelInsurancePageProps) {
  const [selectedDuration, setSelectedDuration] = useState<'short' | 'long'>('short');
  
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Travel Insurance', href: '/travel-insurance' }
  ];

  return (
    <>
      <Head>
        <title>Best Travel Insurance for Thailand 2026 | Compare Coverage & Prices</title>
        <meta name="description" content="Find the best travel insurance for Thailand. Compare medical coverage, COVID-19 protection, and adventure sports coverage from trusted providers." />
        <meta name="keywords" content="Thailand travel insurance, best travel insurance Thailand, medical coverage Thailand, travel protection, SafetyWing Thailand" />
      </Head>

      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-thailand-blue to-thailand-gold text-white">
          <div className="container-custom py-16">
            <div className="text-center">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Travel Insurance for Thailand
              </h1>
              <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
                Protect your Thailand adventure with comprehensive travel insurance
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">
                  🏥 Medical Coverage
                </div>
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">
                  🦠 COVID-19 Protection
                </div>
                <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm font-medium">
                  🏍️ Adventure Sports
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Breadcrumbs */}
        <section className="bg-white">
          <div className="container-custom py-6">
            <Breadcrumbs items={breadcrumbs} />
            
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

        {/* Why Travel Insurance Section */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-center mb-8">Why You Need Travel Insurance for Thailand</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="text-center">
                <div className="text-4xl mb-4">🏥</div>
                <h3 className="font-semibold mb-2">Medical Emergencies</h3>
                <p className="text-gray-600 text-sm">
                  Thai hospitals require upfront payment. A simple ER visit can cost $500+
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🏍️</div>
                <h3 className="font-semibold mb-2">Motorbike Accidents</h3>
                <p className="text-gray-600 text-sm">
                  The #1 cause of tourist injuries. Make sure you're covered for scooter riding
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">✈️</div>
                <h3 className="font-semibold mb-2">Trip Disruptions</h3>
                <p className="text-gray-600 text-sm">
                  Flight cancellations, lost baggage, and unexpected changes
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Insurance Providers Section */}
        <section className="py-12">
          <div className="container-custom">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Compare Travel Insurance Providers</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We've researched the best travel insurance options for Thailand travelers
              </p>
            </div>

            {/* Duration Toggle */}
            <div className="flex justify-center mb-8">
              <div className="bg-white rounded-lg shadow-sm p-1 inline-flex">
                <button
                  onClick={() => setSelectedDuration('short')}
                  className={`px-6 py-2 rounded-md transition-colors ${
                    selectedDuration === 'short'
                      ? 'bg-thailand-blue text-white'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Short Trip (1-30 days)
                </button>
                <button
                  onClick={() => setSelectedDuration('long')}
                  className={`px-6 py-2 rounded-md transition-colors ${
                    selectedDuration === 'long'
                      ? 'bg-thailand-blue text-white'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Long Stay / Nomad
                </button>
              </div>
            </div>

            {/* Provider Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {providers.map((provider) => (
                <div key={provider.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold mb-1">{provider.name}</h3>
                        <p className="text-sm text-gray-600">{provider.bestFor}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < Math.floor(provider.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                              ★
                            </span>
                          ))}
                        </div>
                        <p className="text-sm text-gray-600">{provider.rating}/5</p>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{provider.description}</p>

                    {/* Price */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <p className="text-sm text-gray-600 mb-1">Starting from</p>
                      <p className="text-3xl font-bold text-thailand-blue">
                        {provider.pricing.monthly}
                        <span className="text-base font-normal text-gray-600">/month</span>
                      </p>
                    </div>

                    {/* Coverage Details */}
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Coverage Includes:</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-green-500">✓</span>
                          <span>Medical: {provider.coverage.medical}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-green-500">✓</span>
                          <span>Emergency: {provider.coverage.emergency}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-green-500">✓</span>
                          <span>Trip: {provider.coverage.tripCancellation}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-green-500">✓</span>
                          <span>Baggage: {provider.coverage.baggage}</span>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Key Features:</h4>
                      <ul className="text-sm space-y-1">
                        {provider.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-thailand-blue mr-2">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Pros and Cons */}
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
                      Get Quote from {provider.name} →
                    </a>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Coverage Tips Section */}
        <section className="py-12 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-center mb-8">Thailand Travel Insurance Tips</h2>
            <div className="max-w-3xl mx-auto">
              <div className="space-y-4">
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <h3 className="font-semibold mb-2">⚠️ Motorbike Coverage</h3>
                  <p className="text-gray-700">
                    Most standard policies don't cover motorbike accidents. Look for "adventure sports" 
                    or specific motorbike coverage if you plan to rent a scooter.
                  </p>
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                  <h3 className="font-semibold mb-2">💊 Pre-existing Conditions</h3>
                  <p className="text-gray-700">
                    Declare all pre-existing medical conditions. Some insurers offer coverage 
                    after a stability period (usually 90 days).
                  </p>
                </div>
                <div className="bg-green-50 border-l-4 border-green-400 p-4">
                  <h3 className="font-semibold mb-2">🏥 Direct Billing Hospitals</h3>
                  <p className="text-gray-700">
                    Choose insurers with direct billing agreements with Thai hospitals. 
                    This means you won't need to pay upfront for medical care.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold mb-2">Do I really need travel insurance for Thailand?</h3>
                <p className="text-gray-700">
                  While not legally required, travel insurance is highly recommended. Medical costs 
                  can be expensive for foreigners, and accidents (especially motorbike) are common.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold mb-2">What's the best insurance for long-term travel?</h3>
                <p className="text-gray-700">
                  For stays over 30 days, nomad insurance like SafetyWing offers better value 
                  with monthly subscriptions instead of daily rates.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold mb-2">Does travel insurance cover COVID-19?</h3>
                <p className="text-gray-700">
                  Most modern travel insurance policies now include COVID-19 coverage for medical 
                  treatment, but check the specific terms for quarantine and cancellation coverage.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const providers: InsuranceProvider[] = [
    {
      id: 1,
      name: "SafetyWing",
      slug: "safetywing",
      logo: "/images/insurance/safetywing-logo.png",
      description: "Digital nomad-friendly travel medical insurance with flexible monthly subscriptions. Perfect for long-term travelers and remote workers.",
      features: [
        "Monthly subscription (cancel anytime)",
        "Coverage in 180+ countries",
        "Covers COVID-19 like any illness",
        "Adventure sports add-on available",
        "Direct billing with hospitals"
      ],
      coverage: {
        medical: "$250,000",
        tripCancellation: "Not included",
        baggage: "$3,000",
        emergency: "$100,000"
      },
      pricing: {
        monthly: "$56",
        priceUSD: 56
      },
      pros: [
        "No upfront end date",
        "Covers home country after 90 days",
        "Great for digital nomads",
        "Easy online claims"
      ],
      cons: [
        "No trip cancellation",
        "$250 deductible",
        "Basic baggage coverage"
      ],
      affiliateLink: "https://safetywing.com/?referenceID=go2thailand",
      rating: 4.5,
      bestFor: "Best for Digital Nomads & Long Stays"
    }
    /* Other providers commented out for now - add when approved
    {
      id: 2,
      name: "World Nomads",
      slug: "world-nomads",
      // ... rest of provider data
    }
    */
  ];

  return {
    props: {
      providers
    }
  };
};