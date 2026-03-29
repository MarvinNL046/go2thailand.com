import React, { useState } from 'react';
import SEOHead from '../../components/SEOHead';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import Breadcrumbs from '../../components/Breadcrumbs';
import AffiliateWidget from '../../components/AffiliateWidget';
import transportRoutes from '../../data/transport-routes.json';
import citiesData from '../../data/cities/index.json';

const TWELVEGO_SEARCH_WIDGET = '<script async src="https://tpembd.com/content?trs=421888&shmarker=602467&locale=en&from=Bangkok&to=Phuket&from_en=Bangkok&to_en=Phuket&powered_by=true&color=black&border=1&campaign_id=44&promo_id=1506" charset="utf-8"></script>';

interface Route {
  slug: string;
  from: string;
  to: string;
  distance: string;
  duration: {
    flight?: string;
    bus?: string;
    train?: string;
    taxi?: string;
    ferry?: string;
  };
  popular?: boolean;
}

interface City {
  slug: string;
  name: {
    en: string;
  };
  region: string;
}

interface TransportIndexProps {
  popularRoutes: Route[];
  allRoutes: Route[];
  cities: City[];
}

const TransportIndex: React.FC<TransportIndexProps> = ({ popularRoutes, allRoutes, cities }) => {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Transport Routes', href: '/transport' }
  ];

  const handleRouteSearch = () => {
    if (fromCity && toCity && fromCity !== toCity) {
      const routeSlug = `${fromCity}-to-${toCity}`;
      const route = allRoutes.find(r => r.slug === routeSlug);
      if (route) {
        window.location.href = `/transport/${routeSlug}`;
      } else {
        alert('This route is not available yet. Please try a different route.');
      }
    }
  };

  const getRouteIcon = (from: string, to: string) => {
    const fromCity = cities.find(c => c.slug === from);
    const toCity = cities.find(c => c.slug === to);
    
    if (!fromCity || !toCity) return '';
    
    // Check if it's an island route
    if (['phuket', 'koh-samui', 'koh-phangan', 'koh-tao'].includes(from) || 
        ['phuket', 'koh-samui', 'koh-phangan', 'koh-tao'].includes(to)) {
      return '';
    }
    
    // Check distance for flight icon
    const route = allRoutes.find(r => r.slug === `${from}-to-${to}`);
    if (route && parseInt(route.distance) > 500) {
      return '';
    }
    
    return '';
  };

  const groupedRoutes = allRoutes.reduce((acc, route) => {
    const fromCity = cities.find(c => c.slug === route.from);
    if (fromCity) {
      const region = fromCity.region;
      if (!acc[region]) acc[region] = [];
      acc[region].push(route);
    }
    return acc;
  }, {} as Record<string, Route[]>);

  return (
    <div className="min-h-screen bg-surface-cream">
      <SEOHead
        title={`Thailand Transport Routes 2026 | Go2Thailand`}
        description="Complete guide to traveling between Thai cities. Compare transport options, prices, and duration for flights, buses, trains, and ferries. Plan your Thailand journey with confidence."
      >
        <meta name="keywords" content="thailand transport, thailand bus routes, thailand flights, thailand trains, bangkok to chiang mai, bangkok to phuket, transport in thailand" />
      </SEOHead>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={breadcrumbs} />

        <h1 className="text-4xl font-bold font-heading text-gray-900 mb-4">Thailand Transport Routes</h1>
        <p className="text-xl text-gray-600 mb-8">
          Find the best way to travel between Thai cities. Compare flights, buses, trains, and ferries.
        </p>

        {/* 12Go Search Widget */}
        <section className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold font-heading mb-4">Book Buses, Trains & Ferries</h2>
          <p className="text-gray-600 mb-4">Search and book transport across Thailand with 12Go — compare operators, prices, and schedules.</p>
          <AffiliateWidget scriptContent={TWELVEGO_SEARCH_WIDGET} minHeight="300px" />
          <p className="text-xs text-gray-500 mt-2 text-center">Powered by 12Go — we earn a commission at no extra cost to you</p>
        </section>

        {/* Route Finder */}
        <section className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold font-heading mb-4">Find Your Route</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-2">
                From
              </label>
              <select
                id="from"
                value={fromCity}
                onChange={(e) => setFromCity(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-thailand-red"
              >
                <option value="">Select departure city</option>
                {cities.map(city => (
                  <option key={city.slug} value={city.slug}>{city.name.en}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-2">
                To
              </label>
              <select
                id="to"
                value={toCity}
                onChange={(e) => setToCity(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-thailand-red"
              >
                <option value="">Select destination</option>
                {cities.filter(c => c.slug !== fromCity).map(city => (
                  <option key={city.slug} value={city.slug}>{city.name.en}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={handleRouteSearch}
                disabled={!fromCity || !toCity}
                className="w-full bg-thailand-red text-white py-3 px-6 rounded-xl hover:bg-thailand-red-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Search Route
              </button>
            </div>
          </div>
        </section>

        {/* Popular Routes */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold font-heading mb-6">Popular Routes</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularRoutes.map(route => {
              const from = cities.find(c => c.slug === route.from);
              const to = cities.find(c => c.slug === route.to);
              if (!from || !to) return null;

              return (
                <Link
                  key={route.slug}
                  href={`/transport/${route.slug}`}
                  className="bg-white rounded-2xl shadow-sm p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{getRouteIcon(route.from, route.to)}</span>
                    <span className="text-sm text-gray-500">{route.distance}</span>
                  </div>
                  <h3 className="font-semibold font-heading text-lg mb-1">
                    {from.name.en} → {to.name.en}
                  </h3>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>From {route.duration.bus || route.duration.flight || route.duration.train}</span>
                    <span className="text-thailand-red">View options →</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>


        {/* All Routes by Region */}
        <section>
          <h2 className="text-3xl font-bold font-heading mb-6">All Routes by Region</h2>
          <div className="space-y-8">
            {Object.entries(groupedRoutes).map(([region, routes]) => (
              <div key={region} className="bg-white rounded-2xl shadow-md p-6">
                <h3 className="text-2xl font-semibold font-heading mb-4 capitalize">
                  From {region} Thailand
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {routes.map(route => {
                    const from = cities.find(c => c.slug === route.from);
                    const to = cities.find(c => c.slug === route.to);
                    if (!from || !to) return null;

                    return (
                      <Link
                        key={route.slug}
                        href={`/transport/${route.slug}`}
                        className="flex items-center justify-between p-3 bg-surface-cream rounded-xl hover:bg-white transition-colors"
                      >
                        <span className="font-medium">
                          {from.name.en} → {to.name.en}
                        </span>
                        <span className="text-thailand-red">→</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 12Go Booking CTA */}
        <section className="mt-12 mb-12">
          <div className="bg-surface-dark rounded-2xl shadow-md p-8 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold font-heading mb-4">Book Thailand Transport Online</h2>
              <p className="text-lg mb-6 opacity-90">
                Book buses, trains, ferries, and transfers across Thailand instantly with 12Go. Compare prices, read reviews, and get e-tickets delivered to your email.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                  Buses & Minivans
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                  Trains & Sleepers
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                  Ferries & Speedboats
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                  Airport Transfers
                </div>
              </div>
              <a
                href="https://12go.tpo.lv/tNA80urD"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-thailand-red text-white px-8 py-3 rounded-xl font-semibold hover:bg-thailand-red-600 transition-colors shadow-md"
              >
                Search Routes on 12Go →
              </a>
              <p className="text-xs mt-4 opacity-75">
                We earn a commission when you book through our links at no extra cost to you
              </p>
            </div>
          </div>
        </section>

        {/* Transport Tips */}
        <section className="mt-12 bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-bold font-heading mb-4">Thailand Transport Tips</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold font-heading mb-2">Best Transport by Distance</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>&lt; 200km:</strong> Bus or minivan (cheapest)</li>
                <li>• <strong>200-500km:</strong> Train (scenic) or VIP bus</li>
                <li>• <strong>&gt; 500km:</strong> Flight (time-saving)</li>
                <li>• <strong>Island routes:</strong> Ferry + bus combo</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold font-heading mb-2">Booking Tips</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Book flights 3-4 weeks in advance</li>
                <li>• Train sleepers fill up fast - book early</li>
                <li>• Buses rarely need advance booking</li>
                <li>• Avoid travel on Thai holidays</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold font-heading mb-2">Comfort Levels</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Most comfortable:</strong> Flights, first-class train</li>
                <li>• <strong>Good comfort:</strong> VIP bus, sleeper train</li>
                <li>• <strong>Basic comfort:</strong> Regular bus, 3rd class train</li>
                <li>• <strong>Variable:</strong> Minivans (fast but cramped)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold font-heading mb-2">What to Bring</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Light jacket (AC can be very cold)</li>
                <li>• Snacks and water</li>
                <li>• Entertainment (book, music)</li>
                <li>• Small pillow for long journeys</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Explore More */}
        <section className="mt-12 bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-bold font-heading mb-4">Explore Thailand</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Link href="/islands/" className="p-3 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
              <div className="font-semibold text-gray-900 text-sm">Thai Islands</div>
              <div className="text-xs text-gray-600">Ferry destinations</div>
            </Link>
            <Link href="/city/" className="p-3 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
              <div className="font-semibold text-gray-900 text-sm">All Cities</div>
              <div className="text-xs text-gray-600">Browse destinations</div>
            </Link>
            <Link href="/region/" className="p-3 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
              <div className="font-semibold text-gray-900 text-sm">Regions</div>
              <div className="text-xs text-gray-600">North, South, Central</div>
            </Link>
            <Link href="/food/" className="p-3 bg-surface-cream rounded-xl hover:shadow-md transition-all text-center">
              <div className="font-semibold text-gray-900 text-sm">Thai Food</div>
              <div className="text-xs text-gray-600">Cuisine guide</div>
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
};

export const getStaticProps: GetStaticProps<TransportIndexProps> = async () => {
  const popularRoutes = transportRoutes.routes.filter(r => r.popular);
  const allRoutes = transportRoutes.routes;
  const cities = citiesData;

  return {
    props: {
      popularRoutes,
      allRoutes,
      cities
    },
    revalidate: 604800
  };
};

export default TransportIndex;