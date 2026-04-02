import { useState, useEffect } from 'react';
import Link from 'next/link';

interface BookingHeroCTAProps {
  slug: string;
  category?: string;
  tags?: string[];
  cityName?: string;
  citySlug?: string;
  pageType: 'blog' | 'city' | 'transport';
}

type BookingIntent = 'hotels' | 'transport' | 'food' | 'beach' | 'city' | null;

interface CtaContent {
  icon: string;
  heading: string;
  subtext: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}

function detectBookingIntent(slug: string, category?: string, tags?: string[], pageType?: string): BookingIntent {
  const text = `${slug} ${category || ''} ${(tags || []).join(' ')}`.toLowerCase();

  if (/where-to-stay|hotel|neighborhood|accommodation|resort|hostel|top-10-hotels/.test(text)) return 'hotels';
  if (/to-[a-z]|transport|flight|train|airport|bus-/.test(text) || pageType === 'transport') return 'transport';
  if (/market|food|restaurant|cooking|tour|night-market|street-food|curry/.test(text)) return 'food';
  if (/beach|island|diving|snorkel|koh-|surf/.test(text)) return 'beach';
  if (pageType === 'city') return 'city';
  return null;
}

function getCtaContent(intent: BookingIntent, cityName?: string): CtaContent {
  const city = cityName || 'Thailand';

  switch (intent) {
    case 'hotels':
    case 'city':
      return {
        icon: '🏨',
        heading: `Find Hotels in ${city}`,
        subtext: `Compare thousands of hotels, hostels, and resorts in ${city}`,
        primaryHref: `https://trip.tpo.lv/TmObooZ5?subid=hero-hotels`,
        primaryLabel: 'Search on Trip.com',
        secondaryHref: `https://booking.tpo.lv/2PT1kR82?subid=hero-hotels`,
        secondaryLabel: 'Booking.com',
      };
    case 'transport':
      return {
        icon: '🚂',
        heading: `Book Your Ticket to ${city}`,
        subtext: 'Compare buses, trains, ferries & flights — instant e-ticket confirmation',
        primaryHref: `https://12go.tpo.lv/tNA80urD?subid=hero-transport`,
        primaryLabel: 'Search on 12Go Asia',
      };
    case 'food':
      return {
        icon: '🍜',
        heading: `Book a Food Tour in ${city}`,
        subtext: 'Street food walks, cooking classes, and night market tours with local guides',
        primaryHref: `https://klook.tpo.lv/7Dt6WApj?subid=hero-food`,
        primaryLabel: 'Browse on Klook',
      };
    case 'beach':
      return {
        icon: '🏝️',
        heading: `Book Island Activities in ${city}`,
        subtext: 'Snorkeling, diving, island hopping & beach tours',
        primaryHref: `https://klook.tpo.lv/7Dt6WApj?subid=hero-beach`,
        primaryLabel: 'Browse on Klook',
      };
    default:
      return {
        icon: '🇹🇭',
        heading: 'Plan Your Thailand Trip',
        subtext: 'Hotels, tours, transport — all in one place',
        primaryHref: `https://trip.tpo.lv/TmObooZ5?subid=hero-generic`,
        primaryLabel: 'Search on Trip.com',
      };
  }
}

export default function BookingHeroCTA({ slug, category, tags, cityName, pageType }: BookingHeroCTAProps) {
  const [visible, setVisible] = useState(false);
  const [isSearchReferrer, setIsSearchReferrer] = useState(false);

  useEffect(() => {
    // Check if already dismissed this session
    if (sessionStorage.getItem('bookingHeroDismissed')) return;

    // Detect referrer
    const ref = document.referrer.toLowerCase();
    const fromSearch = /google\.|bing\.|duckduckgo\.|yahoo\.|ecosia\.|chatgpt\./.test(ref);
    setIsSearchReferrer(fromSearch);

    // Detect intent
    const intent = detectBookingIntent(slug, category, tags, pageType);

    // Only show if there's booking intent
    if (intent) {
      setVisible(true);
    }
  }, [slug, category, tags, pageType]);

  const intent = detectBookingIntent(slug, category, tags, pageType);
  if (!visible || !intent) return null;

  const cta = getCtaContent(intent, cityName);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem('bookingHeroDismissed', 'true');
  };

  // Prominent variant for search engine visitors
  if (isSearchReferrer) {
    return (
      <div className="relative bg-gradient-to-r from-thailand-blue to-thailand-blue/80 text-white py-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-4">
          <span className="text-3xl flex-shrink-0">{cta.icon}</span>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-lg sm:text-xl font-bold font-heading">{cta.heading}</h2>
            <p className="text-sm text-white/80 mt-0.5">{cta.subtext}</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <a
              href={cta.primaryHref}
              target="_blank"
              rel="noopener noreferrer nofollow sponsored"
              className="bg-white text-thailand-blue px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-gray-100 transition-colors whitespace-nowrap"
            >
              {cta.primaryLabel}
            </a>
            {cta.secondaryHref && (
              <a
                href={cta.secondaryHref}
                target="_blank"
                rel="noopener noreferrer nofollow sponsored"
                className="border-2 border-white/60 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-white/10 transition-colors whitespace-nowrap hidden sm:inline-flex"
              >
                {cta.secondaryLabel}
              </a>
            )}
          </div>
          <button
            onClick={dismiss}
            className="absolute top-2 right-2 text-white/60 hover:text-white transition-colors"
            aria-label="Dismiss"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-[10px] text-white/40 text-center mt-2">Affiliate link</p>
      </div>
    );
  }

  // Subtle variant for direct/returning visitors
  return (
    <div className="relative bg-surface-cream border-b border-gray-200 py-3 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
        <span className="text-lg">{cta.icon}</span>
        <span className="text-sm text-gray-700">
          {cta.heading}
        </span>
        <a
          href={cta.primaryHref}
          target="_blank"
          rel="noopener noreferrer nofollow sponsored"
          className="bg-thailand-blue text-white px-4 py-1.5 rounded-lg font-medium text-xs hover:bg-thailand-blue/90 transition-colors whitespace-nowrap"
        >
          {cta.primaryLabel} →
        </a>
        <button
          onClick={dismiss}
          className="text-gray-400 hover:text-gray-600 transition-colors ml-1"
          aria-label="Dismiss"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
