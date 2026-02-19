import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import SEOHead from '../../components/SEOHead';
import Link from 'next/link';
import Breadcrumbs from '../../components/Breadcrumbs';
import TripcomWidget from '../../components/TripcomWidget';
import AffiliateWidget from '../../components/AffiliateWidget';
import transportRoutes from '../../data/transport-routes.json';
import citiesData from '../../data/cities/index.json';

interface TransportOption {
  method: string;
  duration: string;
  price: string;
  frequency: string;
  comfort: number;
  description: string;
  pros: string[];
  cons: string[];
  bookingTips: string[];
}

interface RoutePageProps {
  route: any;
  fromCity: any;
  toCity: any;
  transportOptions: TransportOption[];
}

const getTransportIcon = (method: string) => {
  switch(method.toLowerCase()) {
    case 'flight': return '';
    case 'bus': return '';
    case 'train': return '';
    case 'taxi': return '';
    case 'car': return '';
    case 'ferry': return '';
    default: return '';
  }
};

const getComfortStars = (rating: number) => {
  return '*'.repeat(rating) + '-'.repeat(5 - rating);
};

const TransportRoutePage: React.FC<RoutePageProps> = ({ route, fromCity, toCity, transportOptions }) => {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Transport', href: '/transport' },
    { name: `${fromCity.name.en} to ${toCity.name.en}`, href: `/transport/${route.slug}` }
  ];

  const faqs = [
    {
      question: `How do I get from ${fromCity.name.en} to ${toCity.name.en}?`,
      answer: `You can travel from ${fromCity.name.en} to ${toCity.name.en} by ${transportOptions.map(o => o.method.toLowerCase()).join(', ')}. The distance is ${route.distance}.`
    },
    {
      question: `How long does it take from ${fromCity.name.en} to ${toCity.name.en}?`,
      answer: `Travel times vary: ${transportOptions.map(o => `${o.method}: ${o.duration}`).join(', ')}.`
    },
    {
      question: `What is the cheapest way from ${fromCity.name.en} to ${toCity.name.en}?`,
      answer: `The most budget-friendly option is ${transportOptions.reduce((cheapest, o) => {
        const price = parseInt(o.price.replace(/[^0-9]/g, ''));
        const cheapestPrice = parseInt(cheapest.price.replace(/[^0-9]/g, ''));
        return price < cheapestPrice ? o : cheapest;
      }).method.toLowerCase()} at ${transportOptions.reduce((cheapest, o) => {
        const price = parseInt(o.price.replace(/[^0-9]/g, ''));
        const cheapestPrice = parseInt(cheapest.price.replace(/[^0-9]/g, ''));
        return price < cheapestPrice ? o : cheapest;
      }).price}.`
    },
    {
      question: `Can I fly from ${fromCity.name.en} to ${toCity.name.en}?`,
      answer: route.duration.flight
        ? `Yes, flights take approximately ${route.duration.flight} and are the fastest option.`
        : `There are no direct flights. The best alternatives are ${transportOptions.map(o => o.method.toLowerCase()).join(' or ')}.`
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead
        title={`${fromCity.name.en} to ${toCity.name.en}: Cheapest Routes & Prices (2026)`}
        description={`Compare ${transportOptions.length} ways from ${fromCity.name.en} to ${toCity.name.en}. Buses, trains & flights. Prices from ${transportOptions.reduce((min, o) => { const p = parseInt(o.price.replace(/[^0-9]/g, '')); return p < min ? p : min; }, 99999).toLocaleString()} THB. Book online!`}
      >
        <meta name="keywords" content={`${fromCity.name.en} to ${toCity.name.en}, transport ${fromCity.name.en} ${toCity.name.en}, how to get from ${fromCity.name.en} to ${toCity.name.en}, ${fromCity.name.en} ${toCity.name.en} bus, ${fromCity.name.en} ${toCity.name.en} flight`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            })
          }}
        />
      </SEOHead>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={breadcrumbs} />

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {fromCity.name.en} to {toCity.name.en}
        </h1>
        
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="bg-blue-100 px-4 py-2 rounded-lg">
            <span className="text-sm text-gray-600">Distance:</span>
            <span className="ml-2 font-semibold">{route.distance}</span>
          </div>
          <div className="bg-green-100 px-4 py-2 rounded-lg">
            <span className="text-sm text-gray-600">Fastest:</span>
            <span className="ml-2 font-semibold">{route.duration.flight || route.duration.taxi || 'N/A'}</span>
          </div>
          <div className="bg-orange-100 px-4 py-2 rounded-lg">
            <span className="text-sm text-gray-600">Budget:</span>
            <span className="ml-2 font-semibold">{route.duration.bus || route.duration.train || 'N/A'}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Transport Options */}
            <section className="space-y-6 mb-8">
              {transportOptions.map((option, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <span className="text-3xl mr-3">{getTransportIcon(option.method)}</span>
                      <div>
                        <h2 className="text-2xl font-bold">{option.method}</h2>
                        <div className="text-sm text-gray-600">
                          Comfort: {getComfortStars(option.comfort)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">{option.price}</div>
                      <div className="text-sm text-gray-600">{option.duration}</div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{option.description}</p>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h3 className="font-semibold text-green-600 mb-2">Pros</h3>
                      <ul className="space-y-1">
                        {option.pros.map((pro, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-green-500 mr-2">✓</span>
                            <span className="text-sm text-gray-700">{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-red-600 mb-2">Cons</h3>
                      <ul className="space-y-1">
                        {option.cons.map((con, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-red-500 mr-2">✗</span>
                            <span className="text-sm text-gray-700">{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="font-semibold mb-2">Booking Tips</h3>
                    <ul className="space-y-1">
                      {option.bookingTips.map((tip, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-blue-500 mr-2">Tip:</span>
                          <span className="text-sm text-gray-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 bg-gray-50 p-3 rounded-lg flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      <strong>Frequency:</strong> {option.frequency}
                    </span>
                    <a
                      href="https://12go.tpo.lv/tNA80urD"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                    >
                      Book on 12Go →
                    </a>
                  </div>
                </div>
              ))}
            </section>


            {/* Travel Tips */}
            <section className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Travel Tips</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Best Time to Travel</h3>
                  <p className="text-gray-700">
                    Early morning departures (6-8 AM) often have less traffic and cooler temperatures. 
                    Avoid Friday evenings and Sunday afternoons when traffic is heaviest.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">What to Bring</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Valid ID or passport</li>
                    <li>Snacks and water for long journeys</li>
                    <li>Entertainment (book, music, downloads)</li>
                    <li>Neck pillow for comfort</li>
                    <li>Light jacket (for air-conditioned transport)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Booking Advice</h3>
                  <p className="text-gray-700">
                    Book flights 3-4 weeks in advance for best prices. Bus and train tickets can usually be 
                    purchased 1-2 days ahead, except during Thai holidays when advance booking is essential.
                  </p>
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                    <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Alternative Routes */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Alternative Routes</h2>
              <div className="grid gap-4">
                <Link href={`/city/${fromCity.slug}`} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <span className="font-medium">Explore {fromCity.name.en}</span>
                  <span className="text-orange-500">→</span>
                </Link>
                <Link href={`/city/${toCity.slug}`} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <span className="font-medium">Discover {toCity.name.en}</span>
                  <span className="text-orange-500">→</span>
                </Link>
                {route.from !== 'bangkok' && toCity.slug !== 'bangkok' && transportRoutes.routes.some(r => r.slug === `bangkok-to-${toCity.slug}`) && (
                  <Link href={`/transport/bangkok-to-${toCity.slug}`} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="font-medium">Bangkok to {toCity.name.en}</span>
                    <span className="text-orange-500">→</span>
                  </Link>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside>
            <div className="lg:sticky lg:top-4 space-y-6">
            {/* 12Go Search Widget */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-3">Search Transport</h3>
              <AffiliateWidget
                scriptContent={`<script async src="https://tpembd.com/content?trs=421888&shmarker=602467&locale=en&from=${encodeURIComponent(fromCity.name.en)}&to=${encodeURIComponent(toCity.name.en)}&from_en=${encodeURIComponent(fromCity.name.en)}&to_en=${encodeURIComponent(toCity.name.en)}&powered_by=true&color=black&border=1&campaign_id=44&promo_id=1506" charset="utf-8"></script>`}
                minHeight="250px"
              />
            </div>

            {/* 12Go Booking */}
            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-lg shadow-md p-6 border border-green-200">
              <h3 className="text-lg font-semibold mb-3">Book Transport</h3>
              <p className="text-sm text-gray-600 mb-4">
                Book buses, trains, and ferries from {fromCity.name.en} to {toCity.name.en} on 12Go — Thailand&apos;s most popular transport booking platform.
              </p>
              <div className="space-y-2 mb-4">
                {['Instant e-ticket confirmation', 'Compare all operators & prices', 'Free cancellation on most tickets', '24/7 customer support'].map((f, i) => (
                  <div key={i} className="flex items-center text-xs text-gray-600">
                    <span className="text-green-500 mr-2">✓</span>{f}
                  </div>
                ))}
              </div>
              <a
                href="https://12go.tpo.lv/tNA80urD"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-green-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Search on 12Go →
              </a>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Affiliate link — we earn a small commission
              </p>
            </div>

            {/* Trip.com Widget */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Book Your Journey</h3>
              <TripcomWidget city={fromCity.name.en} type="bundle" />
            </div>

            {/* Other Routes Selector */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Popular Routes</h3>
              <select 
                className="w-full p-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 mb-4"
                value={route.slug}
                onChange={(e) => window.location.href = `/transport/${e.target.value}`}
              >
                <option value="">Select a route...</option>
                {transportRoutes.routes
                  .filter(r => r.popular)
                  .map(r => (
                    <option key={r.slug} value={r.slug}>
                      {citiesData.find(c => c.slug === r.from)?.name.en} → {citiesData.find(c => c.slug === r.to)?.name.en}
                    </option>
                  ))
                }
              </select>
              <Link href="/transport" className="text-orange-500 hover:text-orange-600 text-sm">
                View all routes →
              </Link>
            </div>

            {/* Quick Facts */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Facts</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Distance:</dt>
                  <dd className="font-medium">{route.distance}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Time Zone:</dt>
                  <dd className="font-medium">GMT+7</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Currency:</dt>
                  <dd className="font-medium">Thai Baht (฿)</dd>
                </div>
              </dl>
            </div>

            {/* Related Links */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Plan Your Trip</h3>
              <ul className="space-y-2">
                <li>
                  <Link href={`/city/${fromCity.slug}/weather`} className="text-orange-500 hover:text-orange-600">
                    {fromCity.name.en} Weather
                  </Link>
                </li>
                <li>
                  <Link href={`/city/${toCity.slug}/weather`} className="text-orange-500 hover:text-orange-600">
                    {toCity.name.en} Weather
                  </Link>
                </li>
                <li>
                  <Link href="/travel-insurance" className="text-orange-500 hover:text-orange-600">
                    Travel Insurance
                  </Link>
                </li>
                <li>
                  <Link href="/esim" className="text-orange-500 hover:text-orange-600">
                    Thailand eSIM
                  </Link>
                </li>
              </ul>
            </div>

            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

// Generate transport options based on route
const generateTransportOptions = (route: any): TransportOption[] => {
  const options: TransportOption[] = [];

  if (route.duration.flight) {
    options.push({
      method: 'Flight',
      duration: route.duration.flight,
      price: getFlightPrice(route.distance),
      frequency: 'Multiple daily flights',
      comfort: 5,
      description: 'The fastest and most comfortable way to travel. Direct flights available with several airlines including Thai Airways, Bangkok Airways, and budget carriers.',
      pros: [
        'Fastest travel time',
        'Most comfortable',
        'Reliable schedule',
        'Airport lounges available'
      ],
      cons: [
        'Most expensive option',
        'Airport transfer time',
        'Baggage restrictions',
        'Check-in time required'
      ],
      bookingTips: [
        'Book 3-4 weeks in advance for best prices',
        'Compare prices on Tuesday/Wednesday',
        'Consider budget airlines for short flights',
        'Check baggage allowance before booking'
      ]
    });
  }

  if (route.duration.bus) {
    options.push({
      method: 'Bus',
      duration: route.duration.bus,
      price: getBusPrice(route.distance),
      frequency: 'Departures every 1-2 hours',
      comfort: 3,
      description: 'Economical option with various classes available. VIP buses offer reclining seats and meals. Regular buses are basic but functional.',
      pros: [
        'Budget-friendly',
        'Frequent departures',
        'City center terminals',
        'No booking needed (usually)'
      ],
      cons: [
        'Long journey time',
        'Less comfortable',
        'Possible delays',
        'Limited luggage space'
      ],
      bookingTips: [
        'VIP buses worth the extra cost for long journeys',
        'Book online for popular routes',
        'Bring snacks and entertainment',
        'Arrive 30 minutes before departure'
      ]
    });
  }

  if (route.duration.train) {
    options.push({
      method: 'Train',
      duration: route.duration.train,
      price: getTrainPrice(route.distance),
      frequency: '2-4 departures daily',
      comfort: 4,
      description: 'Scenic and comfortable journey through Thailand. Sleeper trains available for overnight routes with beds and dining cars.',
      pros: [
        'Scenic journey',
        'Comfortable seats/beds',
        'Can walk around',
        'Dining car available'
      ],
      cons: [
        'Often delayed',
        'Limited schedule',
        'Books up quickly',
        'Slower than bus'
      ],
      bookingTips: [
        'Book sleeper berths well in advance',
        'Lower berths more spacious',
        'Bring warm clothes for AC carriages',
        'Food available but bring snacks'
      ]
    });
  }

  if (route.duration.taxi) {
    options.push({
      method: 'Taxi/Private Car',
      duration: route.duration.taxi,
      price: getTaxiPrice(route.distance),
      frequency: 'Available anytime',
      comfort: 4,
      description: 'Door-to-door convenience with flexibility to stop along the way. Can be shared to reduce costs.',
      pros: [
        'Door-to-door service',
        'Flexible schedule',
        'Can stop anywhere',
        'Privacy'
      ],
      cons: [
        'Expensive for solo travelers',
        'Driver quality varies',
        'Traffic dependent',
        'Need to negotiate price'
      ],
      bookingTips: [
        'Agree on price before departure',
        'Use ride-hailing apps for transparency',
        'Share with others to split cost',
        'Ask hotel to arrange trusted driver'
      ]
    });
  }

  if (route.duration.ferry) {
    options.push({
      method: 'Ferry',
      duration: route.duration.ferry,
      price: getFerryPrice(route.distance),
      frequency: '2-4 sailings daily',
      comfort: 3,
      description: 'Scenic sea journey with outdoor decks. Various classes from basic seating to VIP cabins.',
      pros: [
        'Scenic sea views',
        'Can walk around',
        'Fresh air on deck',
        'Vehicle transport available'
      ],
      cons: [
        'Weather dependent',
        'Can be rough seas',
        'Limited schedule',
        'Possible seasickness'
      ],
      bookingTips: [
        'Book in advance during high season',
        'Choose upper deck for less motion',
        'Bring seasickness medication',
        'Arrive 1 hour before departure'
      ]
    });
  }

  return options;
};

// Price estimation functions
const getFlightPrice = (distance: string): string => {
  const km = parseInt(distance);
  if (km < 500) return '฿1,500-3,000';
  if (km < 1000) return '฿2,000-4,500';
  return '฿2,500-6,000';
};

const getBusPrice = (distance: string): string => {
  const km = parseInt(distance);
  if (km < 200) return '฿150-300';
  if (km < 500) return '฿300-600';
  if (km < 1000) return '฿500-900';
  return '฿700-1,200';
};

const getTrainPrice = (distance: string): string => {
  const km = parseInt(distance);
  if (km < 200) return '฿50-300';
  if (km < 500) return '฿200-800';
  if (km < 1000) return '฿400-1,500';
  return '฿600-2,000';
};

const getTaxiPrice = (distance: string): string => {
  const km = parseInt(distance);
  if (km < 200) return '฿2,000-3,000';
  if (km < 500) return '฿4,000-7,000';
  if (km < 1000) return '฿7,000-12,000';
  return '฿10,000-15,000';
};

const getFerryPrice = (distance: string): string => {
  return '฿300-1,200';
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = transportRoutes.routes.map(route => ({
    params: { route: route.slug }
  }));
  
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps<RoutePageProps> = async ({ params }) => {
  const { route: routeSlug } = params as { route: string };
  
  const route = transportRoutes.routes.find(r => r.slug === routeSlug);
  if (!route) {
    return { notFound: true };
  }

  const fromCity = citiesData.find(c => c.slug === route.from);
  const toCity = citiesData.find(c => c.slug === route.to);

  if (!fromCity || !toCity) {
    return { notFound: true };
  }

  const transportOptions = generateTransportOptions(route);

  return {
    props: {
      route,
      fromCity,
      toCity,
      transportOptions
    },
    revalidate: 86400
  };
};

export default TransportRoutePage;