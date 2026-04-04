import { GetStaticPaths, GetStaticProps } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import PreFooterAffiliateBanner from '../../components/PreFooterAffiliateBanner';
import TripcomWidget from '../../components/TripcomWidget';
import {
  getAllItineraries,
  getItineraryBySlug,
  getRelatedItineraries,
  toAbsoluteImageUrl
} from '../../lib/itineraries';

// --- Type definitions ---

interface Activity {
  name: string;
  description?: string;
  cost?: string;
  duration?: string;
  type?: string;
}

interface MealRecommendation {
  meal: string;
  restaurant?: string;
  cuisine?: string;
  cost?: string;
}

interface Accommodation {
  name: string;
  price?: string;
  link?: string;
  description?: string;
}

interface DayPlan {
  day: number;
  title: string;
  city?: string;
  description?: string;
  activities: Activity[];
  meals?: MealRecommendation[];
  accommodation?: {
    budget?: Accommodation;
    mid?: Accommodation;
    luxury?: Accommodation;
  };
  transport?: string;
}

interface TransportSegment {
  from: string;
  to: string;
  options: {
    type: string;
    duration?: string;
    cost?: string;
    bookingLink?: string;
  }[];
}

interface BudgetBreakdown {
  category: string;
  budget: string;
  mid: string;
  luxury: string;
}

interface Itinerary {
  slug: string;
  title: string;
  duration: number;
  region: string;
  image: string;
  description: string;
  highlights: string[];
  cities?: string[];
  bestTime?: string;
  budget: {
    budget: string;
    mid: string;
    luxury: string;
  };
  days: DayPlan[];
  transport?: TransportSegment[];
  budgetBreakdown?: BudgetBreakdown[];
  packingTips?: string[];
  faqs?: { question: string; answer: string }[];
  tags?: string[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

interface ItineraryListItem {
  slug: string;
  title: string;
  duration: number;
  region: string;
  image: string;
  description: string;
  highlights: string[];
  budget: {
    budget: string;
    mid: string;
    luxury: string;
  };
}

interface ItineraryPageProps {
  itinerary: Itinerary;
  relatedItineraries: ItineraryListItem[];
}

// --- Activity type icons ---

function getActivityIcon(type?: string) {
  switch (type) {
    case 'temple':
    case 'culture':
      return (
        <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
        </svg>
      );
    case 'food':
    case 'dining':
      return (
        <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      );
    case 'beach':
    case 'nature':
      return (
        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
        </svg>
      );
    case 'shopping':
    case 'market':
      return (
        <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      );
    case 'transport':
    case 'travel':
      return (
        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    case 'nightlife':
    case 'entertainment':
      return (
        <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      );
    default:
      return (
        <svg className="w-5 h-5 text-thailand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
  }
}

// --- Component ---

export default function ItineraryPage({ itinerary, relatedItineraries }: ItineraryPageProps) {
  const [activeAccomTab, setActiveAccomTab] = useState<'budget' | 'mid' | 'luxury'>('mid');
  const { locale } = useRouter();
  const tr = (en: string, nl: string) => locale === 'nl' ? nl : en;

  if (!itinerary) {
    return <div>{tr('Itinerary not found', 'Reisroute niet gevonden')}</div>;
  }

  const breadcrumbs = [
    { name: tr('Home', 'Home'), href: '/' },
    { name: tr('Itineraries', 'Reisroutes'), href: '/itineraries/' },
    { name: itinerary.title, href: `/itineraries/${itinerary.slug}/` }
  ];

  const seoTitle = itinerary.seo?.metaTitle || `${itinerary.title} | Go2Thailand`;
  const seoDescription = itinerary.seo?.metaDescription || itinerary.description;

  // Generate FAQs (auto-generated + from data)
  const autoFaqs = [
    {
      question: `How much does ${itinerary.duration} days in Thailand cost?`,
      answer: `A ${itinerary.duration}-day trip to Thailand costs approximately ${itinerary.budget.budget} on a budget, ${itinerary.budget.mid} for mid-range travel, and ${itinerary.budget.luxury} for a luxury experience. This includes accommodation, food, transport, and activities.`
    },
    {
      question: `What is the best time to visit ${itinerary.region} Thailand?`,
      answer: itinerary.bestTime
        ? `The best time to visit ${itinerary.region} Thailand is ${itinerary.bestTime}. This period offers the most favorable weather and fewer crowds.`
        : `The best time to visit Thailand is generally November to February during the cool, dry season. However, this can vary by region.`
    },
    {
      question: `Is ${itinerary.duration} days enough for Thailand?`,
      answer: `Yes, ${itinerary.duration} days is ${itinerary.duration <= 3 ? 'enough for a focused trip to one area' : itinerary.duration <= 7 ? 'a great amount of time to explore multiple destinations' : 'plenty of time for a comprehensive Thailand experience'}. This itinerary covers ${itinerary.cities?.join(', ') || itinerary.region} with a well-planned day-by-day schedule.`
    }
  ];
  const allFaqs = [...autoFaqs, ...(itinerary.faqs || [])];

  // JSON-LD schemas
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": `https://go2-thailand.com${crumb.href}`
    }))
  };

  const travelActionJsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAction",
    "name": itinerary.title,
    "description": itinerary.description,
    "image": toAbsoluteImageUrl(itinerary.image),
    "url": `https://go2-thailand.com/itineraries/${itinerary.slug}/`,
    "toLocation": {
      "@type": "Country",
      "name": "Thailand"
    }
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": allFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  // Extract numeric budget value from string like "$150-200" -> "150"
  const budgetMatch = itinerary.budget?.budget?.match(/\$?([\d,]+)/);
  const budgetValue = budgetMatch ? budgetMatch[1].replace(/,/g, '') : undefined;

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `How to spend ${itinerary.duration} days in Thailand: ${itinerary.title}`,
    "description": itinerary.description,
    "totalTime": `P${itinerary.duration}D`,
    "image": toAbsoluteImageUrl(itinerary.image),
    "url": `https://go2-thailand.com/itineraries/${itinerary.slug}/`,
    ...(budgetValue ? {
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "USD",
        "value": budgetValue
      }
    } : {}),
    "step": itinerary.days?.map((day) => {
      const activitiesSummary = day.activities
        ?.map(a => a.name)
        .join(', ');
      const stepText = [
        day.description,
        activitiesSummary ? `Activities: ${activitiesSummary}.` : '',
        day.transport ? `Transport: ${day.transport}.` : ''
      ].filter(Boolean).join(' ');

      return {
        "@type": "HowToStep",
        "name": `Day ${day.day}: ${day.title}${day.city ? ` (${day.city})` : ''}`,
        "text": stepText || day.title,
        "position": day.day,
        "url": `https://go2-thailand.com/itineraries/${itinerary.slug}/#day-${day.day}`
      };
    }) || []
  };

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        ogImage={toAbsoluteImageUrl(itinerary.image)}
      >
        <meta name="keywords" content={`Thailand itinerary, ${itinerary.duration} days Thailand, ${itinerary.region}, ${(itinerary.tags || []).join(', ')}`} />
        <meta property="og:type" content="article" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(travelActionJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
        />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[400px] lg:h-[500px] overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={itinerary.image}
              alt={itinerary.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>

          <div className="relative z-10 h-full flex items-end">
            <div className="container-custom pb-12 text-white">
              <div className="max-w-4xl">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="bg-thailand-red text-white px-3 py-1 rounded text-sm font-semibold">
                    {itinerary.duration} Days
                  </span>
                  <span className="bg-thailand-blue text-white px-3 py-1 rounded text-sm font-semibold">
                    {itinerary.region}
                  </span>
                  {itinerary.budget && (
                    <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded text-sm font-semibold">
                      From {itinerary.budget.budget}
                    </span>
                  )}
                </div>
                <h1 className="text-3xl lg:text-5xl font-bold font-heading mb-4">
                  {itinerary.title}
                </h1>
                <p className="text-lg text-gray-200 max-w-3xl">
                  {itinerary.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumbs */}
        <section className="bg-white border-b">
          <div className="container-custom py-4">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </section>

        {/* Main Content + Sidebar */}
        <section className="py-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content (2/3) */}
              <div className="lg:col-span-2">

                {/* Overview & Key Stats */}
                <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
                  <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">{tr('Overview', 'Overzicht')}</h2>
                  <p className="text-gray-700 leading-relaxed mb-6">{itinerary.description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-surface-cream rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-thailand-blue">{itinerary.duration}</div>
                      <div className="text-sm text-gray-600">{tr('Days', 'Dagen')}</div>
                    </div>
                    <div className="bg-surface-cream rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-thailand-red">{itinerary.cities?.length || '-'}</div>
                      <div className="text-sm text-gray-600">{tr('Cities', 'Steden')}</div>
                    </div>
                    <div className="bg-surface-cream rounded-xl p-4 text-center">
                      <div className="text-lg font-bold text-thailand-blue">{itinerary.budget?.budget || '-'}</div>
                      <div className="text-sm text-gray-600">{tr('Min Budget', 'Min Budget')}</div>
                    </div>
                    <div className="bg-surface-cream rounded-xl p-4 text-center">
                      <div className="text-lg font-bold text-thailand-blue">{itinerary.highlights?.length || '-'}</div>
                      <div className="text-sm text-gray-600">{tr('Highlights', 'Hoogtepunten')}</div>
                    </div>
                  </div>

                  {/* Highlights */}
                  {itinerary.highlights && itinerary.highlights.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold font-heading text-gray-900 mb-3">{tr('Trip Highlights', 'Reis Hoogtepunten')}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {itinerary.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-center">
                            <svg className="w-5 h-5 text-thailand-gold mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-700 text-sm">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Day-by-Day Timeline */}
                <div className="mb-8">
                  <span className="font-script text-thailand-gold text-lg">{tr('Your journey', 'Jouw reis')}</span>
                  <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8 mt-1">{tr('Day-by-Day Itinerary', 'Dag-voor-Dag Reisroute')}</h2>

                  {itinerary.days && itinerary.days.map((day) => (
                    <div key={day.day} className="relative mb-8">
                      {/* Timeline connector */}
                      <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gray-200" style={{ display: day.day === itinerary.days.length ? 'none' : 'block' }} />

                      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                        {/* Day Header */}
                        <div className="bg-surface-dark p-6 text-white">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                              <span className="text-xl font-bold">{day.day}</span>
                            </div>
                            <div>
                              <h3 className="text-xl font-bold font-heading">{day.title}</h3>
                              {day.city && (
                                <p className="text-blue-200 text-sm mt-1">
                                  <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  </svg>
                                  {day.city}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="p-6">
                          {/* Day Description */}
                          {day.description && (
                            <p className="text-gray-700 mb-6 leading-relaxed">{day.description}</p>
                          )}

                          {/* Activities */}
                          {day.activities && day.activities.length > 0 && (
                            <div className="mb-6">
                              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                <svg className="w-5 h-5 text-thailand-blue mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                {tr('Activities', 'Activiteiten')}
                              </h4>
                              <div className="space-y-3">
                                {day.activities.map((activity, idx) => (
                                  <div key={idx} className="flex items-start bg-surface-cream rounded-xl p-4">
                                    <div className="flex-shrink-0 mr-3 mt-0.5">
                                      {getActivityIcon(activity.type)}
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center justify-between flex-wrap gap-2">
                                        <h5 className="font-medium text-gray-900">{activity.name}</h5>
                                        <div className="flex items-center gap-3 text-xs">
                                          {activity.cost && (
                                            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded font-medium">
                                              {activity.cost}
                                            </span>
                                          )}
                                          {activity.duration && (
                                            <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium">
                                              {activity.duration}
                                            </span>
                                          )}
                                          <a
                                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.name + ' ' + (day.city || '') + ' Thailand')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center text-xs text-gray-500 hover:text-thailand-blue transition-colors"
                                            title="View on Google Maps"
                                          >
                                            <svg className="w-3.5 h-3.5 mr-0.5" viewBox="0 0 24 24" fill="currentColor">
                                              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                            </svg>
                                            Maps
                                          </a>
                                        </div>
                                      </div>
                                      {activity.description && (
                                        <p className="text-gray-600 text-sm mt-1">{activity.description}</p>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Meal Recommendations */}
                          {day.meals && day.meals.length > 0 && (
                            <div className="mb-6">
                              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                <svg className="w-5 h-5 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                {tr('Meals', 'Maaltijden')}
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                {day.meals.map((meal, idx) => (
                                  <div key={idx} className="bg-orange-50 rounded-xl p-3">
                                    <div className="text-xs font-semibold text-orange-600 uppercase mb-1">{meal.meal}</div>
                                    {meal.restaurant && <div className="text-sm font-medium text-gray-900">{meal.restaurant}</div>}
                                    {meal.cuisine && <div className="text-xs text-gray-600">{meal.cuisine}</div>}
                                    {meal.cost && <div className="text-xs text-green-600 font-medium mt-1">{meal.cost}</div>}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Accommodation */}
                          {day.accommodation && (
                            <div className="mb-4">
                              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                <svg className="w-5 h-5 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                {tr('Where to Stay', 'Waar Verblijven')}
                              </h4>
                              <div className="flex gap-1 mb-3">
                                {(['budget', 'mid', 'luxury'] as const).map(tab => (
                                  <button
                                    key={tab}
                                    onClick={() => setActiveAccomTab(tab)}
                                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                                      activeAccomTab === tab
                                        ? 'bg-thailand-blue text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                  >
                                    {tab === 'budget' ? 'Budget' : tab === 'mid' ? tr('Mid-Range', 'Midden') : 'Luxury'}
                                  </button>
                                ))}
                              </div>
                              {day.accommodation[activeAccomTab] && (
                                <div className="bg-indigo-50 rounded-xl p-4">
                                  <div className="font-medium text-gray-900">{day.accommodation[activeAccomTab]!.name}</div>
                                  {day.accommodation[activeAccomTab]!.price && (
                                    <div className="text-sm text-green-600 font-medium mt-1">{day.accommodation[activeAccomTab]!.price}</div>
                                  )}
                                  {day.accommodation[activeAccomTab]!.description && (
                                    <div className="text-sm text-gray-600 mt-1">{day.accommodation[activeAccomTab]!.description}</div>
                                  )}
                                  {day.accommodation[activeAccomTab]!.link && (
                                    <a
                                      href={day.accommodation[activeAccomTab]!.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-block mt-2 text-sm text-thailand-blue font-medium hover:underline"
                                    >
                                      {tr('Check availability', 'Beschikbaarheid bekijken')} &rarr;
                                    </a>
                                  )}
                                </div>
                              )}
                            </div>
                          )}

                          {/* Day Transport Info */}
                          {day.transport && (
                            <div className="bg-blue-50 rounded-xl p-4">
                              <div className="flex items-center">
                                <svg className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                <span className="text-sm text-gray-700">{day.transport}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Transport Between Cities */}
                {itinerary.transport && itinerary.transport.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
                    <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">
                      {tr('Transport Between Cities', 'Transport Tussen Steden')}
                    </h2>
                    <div className="space-y-4">
                      {itinerary.transport.map((segment, idx) => (
                        <div key={idx} className="bg-surface-cream rounded-xl p-5">
                          <div className="flex items-center gap-3 mb-4">
                            <span className="font-semibold text-gray-900">{segment.from}</span>
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                            <span className="font-semibold text-gray-900">{segment.to}</span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {segment.options.map((option, oidx) => (
                              <div key={oidx} className="bg-white rounded-xl p-3 flex items-center justify-between">
                                <div>
                                  <div className="font-medium text-sm text-gray-900">{option.type}</div>
                                  {option.duration && <div className="text-xs text-gray-500">{option.duration}</div>}
                                </div>
                                <div className="text-right">
                                  {option.cost && <div className="text-sm font-semibold text-green-600">{option.cost}</div>}
                                  {option.bookingLink && (
                                    <a
                                      href={option.bookingLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-xs text-thailand-blue hover:underline"
                                    >
                                      {tr('Book now', 'Boek nu')}
                                    </a>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4">
                      <a
                        href="https://12go.tpo.lv/tNA80urD?subid=itinerary"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-thailand-blue text-white px-6 py-2 rounded-xl font-semibold hover:bg-thailand-red transition-colors text-sm"
                      >
                        {tr('Compare all routes on 12Go Asia', 'Vergelijk alle routes op 12Go Asia')}
                      </a>
                      <p className="text-xs text-gray-500 mt-2">{tr('Affiliate link', 'Affiliate link')}</p>
                    </div>
                  </div>
                )}

                {/* Budget Breakdown Table */}
                {itinerary.budgetBreakdown && itinerary.budgetBreakdown.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
                    <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">
                      {tr('Budget Breakdown', 'Budget Overzicht')}
                    </h2>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b-2 border-gray-200">
                            <th className="text-left py-3 pr-4 font-semibold text-gray-900">{tr('Category', 'Categorie')}</th>
                            <th className="text-center py-3 px-4 font-semibold text-thailand-blue">Budget</th>
                            <th className="text-center py-3 px-4 font-semibold text-thailand-blue">{tr('Mid-Range', 'Midden')}</th>
                            <th className="text-center py-3 px-4 font-semibold text-thailand-red">Luxury</th>
                          </tr>
                        </thead>
                        <tbody>
                          {itinerary.budgetBreakdown.map((row, idx) => (
                            <tr key={idx} className="border-b border-gray-100">
                              <td className="py-3 pr-4 font-medium text-gray-900">{row.category}</td>
                              <td className="py-3 px-4 text-center text-gray-700">{row.budget}</td>
                              <td className="py-3 px-4 text-center text-gray-700">{row.mid}</td>
                              <td className="py-3 px-4 text-center text-gray-700">{row.luxury}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr className="border-t-2 border-gray-300 bg-surface-cream">
                            <td className="py-3 pr-4 font-bold text-gray-900">{tr('Total', 'Totaal')}</td>
                            <td className="py-3 px-4 text-center font-bold text-thailand-blue">{itinerary.budget.budget}</td>
                            <td className="py-3 px-4 text-center font-bold text-thailand-blue">{itinerary.budget.mid}</td>
                            <td className="py-3 px-4 text-center font-bold text-thailand-red">{itinerary.budget.luxury}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                )}

                {/* Packing Tips */}
                {itinerary.packingTips && itinerary.packingTips.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
                    <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">
                      {tr('Packing Tips', 'Inpaktips')}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {itinerary.packingTips.map((tip, idx) => (
                        <div key={idx} className="flex items-center">
                          <svg className="w-5 h-5 text-thailand-blue mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                          <span className="text-gray-700 text-sm">{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* FAQs */}
                {allFaqs.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
                    <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">
                      {tr('Frequently Asked Questions', 'Veelgestelde Vragen')}
                    </h2>
                    <div className="space-y-4">
                      {allFaqs.map((faq, idx) => (
                        <div key={idx} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                          <h3 className="font-semibold font-heading text-gray-900 mb-2">{faq.question}</h3>
                          <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* Related Guides */}
                <div className="bg-surface-cream rounded-2xl p-8 mb-8">
                  <h2 className="text-2xl font-bold font-heading text-gray-900 mb-2">
                    {tr('Plan Your Trip — Related Guides', 'Plan Je Reis — Gerelateerde Gidsen')}
                  </h2>
                  <p className="text-gray-600 text-sm mb-6">
                    {tr('Everything you need to make the most of your Thailand adventure.', 'Alles wat je nodig hebt om het meeste uit je Thailand avontuur te halen.')}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Link href="/city/" className="flex items-center gap-3 bg-white rounded-xl p-4 hover:shadow-md transition-shadow group">
                      <span className="text-2xl flex-shrink-0">🏙️</span>
                      <div>
                        <div className="font-semibold text-thailand-blue group-hover:underline text-sm">{tr('City Guides', 'Stadsgidsen')}</div>
                        <div className="text-xs text-gray-500">{tr('Explore all 33 Thai cities in depth', 'Ontdek alle 33 Thaise steden uitgebreid')}</div>
                      </div>
                    </Link>
                    <Link href="/food/" className="flex items-center gap-3 bg-white rounded-xl p-4 hover:shadow-md transition-shadow group">
                      <span className="text-2xl flex-shrink-0">🍜</span>
                      <div>
                        <div className="font-semibold text-thailand-blue group-hover:underline text-sm">{tr('Thai Food Guide', 'Thais Eten Gids')}</div>
                        <div className="text-xs text-gray-500">{tr('Dishes, street food & where to eat', 'Gerechten, straateten & waar te eten')}</div>
                      </div>
                    </Link>
                    <Link href="/transport/" className="flex items-center gap-3 bg-white rounded-xl p-4 hover:shadow-md transition-shadow group">
                      <span className="text-2xl flex-shrink-0">🚌</span>
                      <div>
                        <div className="font-semibold text-thailand-blue group-hover:underline text-sm">{tr('Transport Routes', 'Transport Routes')}</div>
                        <div className="text-xs text-gray-500">{tr('Buses, trains & ferries between cities', 'Bussen, treinen & veerboten tussen steden')}</div>
                      </div>
                    </Link>
                    <Link href="/islands/" className="flex items-center gap-3 bg-white rounded-xl p-4 hover:shadow-md transition-shadow group">
                      <span className="text-2xl flex-shrink-0">🏝️</span>
                      <div>
                        <div className="font-semibold text-thailand-blue group-hover:underline text-sm">{tr('Thai Islands', 'Thaise Eilanden')}</div>
                        <div className="text-xs text-gray-500">{tr('Best islands, beaches & dive spots', 'Beste eilanden, stranden & duikplekken')}</div>
                      </div>
                    </Link>
                    <Link href="/thailand-index/" className="flex items-center gap-3 bg-white rounded-xl p-4 hover:shadow-md transition-shadow group">
                      <span className="text-2xl flex-shrink-0">📊</span>
                      <div>
                        <div className="font-semibold text-thailand-blue group-hover:underline text-sm">{tr('Thailand Travel Index', 'Thailand Reis Index')}</div>
                        <div className="text-xs text-gray-500">{tr('Compare costs, weather & rankings', 'Vergelijk kosten, weer & ranglijsten')}</div>
                      </div>
                    </Link>
                    <Link href="/weather/" className="flex items-center gap-3 bg-white rounded-xl p-4 hover:shadow-md transition-shadow group">
                      <span className="text-2xl flex-shrink-0">☀️</span>
                      <div>
                        <div className="font-semibold text-thailand-blue group-hover:underline text-sm">{tr('Weather Guide', 'Weergids')}</div>
                        <div className="text-xs text-gray-500">{tr('Best time to visit every region', 'Beste tijd om elke regio te bezoeken')}</div>
                      </div>
                    </Link>
                    <Link href="/best-places-to-visit-thailand/" className="flex items-center gap-3 bg-white rounded-xl p-4 hover:shadow-md transition-shadow group">
                      <span className="text-2xl flex-shrink-0">📍</span>
                      <div>
                        <div className="font-semibold text-thailand-blue group-hover:underline text-sm">{tr('Best Places to Visit', 'Beste Plekken om te Bezoeken')}</div>
                        <div className="text-xs text-gray-500">{tr('Top destinations for every travel style', 'Topbestemmingen voor elke reisstijl')}</div>
                      </div>
                    </Link>
                    <Link href="/thailand-for-first-timers/" className="flex items-center gap-3 bg-white rounded-xl p-4 hover:shadow-md transition-shadow group">
                      <span className="text-2xl flex-shrink-0">✈️</span>
                      <div>
                        <div className="font-semibold text-thailand-blue group-hover:underline text-sm">{tr("First Timer's Guide", 'Gids voor Eerste Keer')}</div>
                        <div className="text-xs text-gray-500">{tr('Essential tips before your first visit', 'Essentiële tips voor je eerste bezoek')}</div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Sidebar (1/3) */}
              <aside className="lg:col-span-1">
                <div className="lg:sticky lg:top-4 space-y-6">

                  {/* Quick Facts Card */}
                  <div className="bg-white rounded-2xl shadow-md p-6">
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-4">{tr('Quick Facts', 'Snelle Feiten')}</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">{tr('Duration:', 'Duur:')}</span>
                        <span className="font-medium">{itinerary.duration} {tr('Days', 'Dagen')}</span>
                      </div>
                      {itinerary.cities && itinerary.cities.length > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">{tr('Cities:', 'Steden:')}</span>
                          <span className="font-medium text-right text-sm">{itinerary.cities.join(', ')}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-600">{tr('Region:', 'Regio:')}</span>
                        <span className="font-medium">{itinerary.region}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Budget:</span>
                        <span className="font-medium text-thailand-blue">{itinerary.budget?.budget}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">{tr('Mid-Range:', 'Midden:')}</span>
                        <span className="font-medium text-thailand-blue">{itinerary.budget?.mid}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Luxury:</span>
                        <span className="font-medium text-thailand-red">{itinerary.budget?.luxury}</span>
                      </div>
                      {itinerary.bestTime && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">{tr('Best Time:', 'Beste Tijd:')}</span>
                          <span className="font-medium text-sm">{itinerary.bestTime}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Book Your Trip Card */}
                  <div className="bg-white rounded-2xl shadow-md p-6">
                    <h3 className="text-xl font-bold font-heading text-gray-900 mb-3">{tr('Book Your Trip', 'Boek Je Reis')}</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {tr('Get the best deals on hotels, transport, and activities for this itinerary.', 'Vind de beste deals voor hotels, transport en activiteiten voor deze reisroute.')}
                    </p>
                    <div className="space-y-3">
                      <a
                        href="https://12go.tpo.lv/tNA80urD?subid=itinerary"
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="block bg-[#F59E0B] text-white text-center px-4 py-2 rounded-xl font-semibold hover:bg-[#D97706] transition-colors text-sm"
                      >
                        12Go Asia - Buses, Trains & Ferries
                      </a>
                      <a
                        href="https://booking.tpo.lv/2PT1kR82?subid=itinerary"
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="block bg-[#003580] text-white text-center px-4 py-2 rounded-xl font-semibold hover:bg-[#00224f] transition-colors text-sm"
                      >
                        Booking.com - Hotels
                      </a>
                      <a
                        href="https://klook.tpo.lv/7Dt6WApj?subid=itinerary"
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="block bg-[#FF5722] text-white text-center px-4 py-2 rounded-xl font-semibold hover:bg-[#e64a19] transition-colors text-sm"
                      >
                        Klook - Activities & Tours
                      </a>
                    </div>
                    <p className="text-xs text-gray-500 mt-3 text-center">{tr('Affiliate links', 'Affiliate links')}</p>
                  </div>

                  {/* Trip.com Widget */}
                  <TripcomWidget city="Thailand" type="searchbox" customTitle="Search Thailand Hotels" />

                  {/* Related Itineraries */}
                  {relatedItineraries.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-md p-6">
                      <h3 className="text-xl font-bold font-heading text-gray-900 mb-4">{tr('Related Itineraries', 'Gerelateerde Reisroutes')}</h3>
                      <div className="space-y-4">
                        {relatedItineraries.map(related => (
                          <Link
                            key={related.slug}
                            href={`/itineraries/${related.slug}/`}
                            className="block group"
                          >
                            <div className="flex gap-3">
                              <div className="relative w-20 h-16 rounded overflow-hidden flex-shrink-0">
                                <Image
                                  src={related.image}
                                  alt={related.title}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-medium text-gray-900 group-hover:text-thailand-blue transition-colors line-clamp-2">
                                  {related.title}
                                </h4>
                                <div className="flex gap-2 mt-1">
                                  <span className="text-xs text-gray-500">{related.duration} days</span>
                                  <span className="text-xs text-gray-400">|</span>
                                  <span className="text-xs text-gray-500">{related.region}</span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <Link
                        href="/itineraries/"
                        className="block text-thailand-blue text-center text-sm hover:underline mt-4 font-medium"
                      >
                        {tr('View all itineraries', 'Bekijk alle reisroutes')} &rarr;
                      </Link>
                    </div>
                  )}

                  {/* eSIM */}
                  <div className="bg-white rounded-2xl shadow-md p-6">
                    <h3 className="text-xl font-bold font-heading mb-2">Thailand eSIM</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {tr(
                        `Stay connected during your ${itinerary.duration}-day trip. Order your eSIM before you go.`,
                        `Blijf verbonden tijdens je ${itinerary.duration}-daagse reis. Bestel je eSIM voordat je vertrekt.`
                      )}
                    </p>
                    <a
                      href="https://saily.tpo.lv/rf9lidnE?subid=itinerary"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-thailand-blue text-white text-center px-4 py-2 rounded-xl font-semibold hover:bg-thailand-red transition-colors mb-2"
                    >
                      Saily eSIM
                    </a>
                    <Link href="/esim/" className="block text-thailand-blue text-center text-sm hover:underline">
                      {tr('More eSIM options', 'Meer eSIM opties')} &rarr;
                    </Link>
                  </div>

                  {/* Travel Insurance */}
                  <div className="bg-surface-dark text-white rounded-2xl p-6">
                    <h3 className="text-xl font-bold font-heading mb-2">{tr('Travel Insurance', 'Reisverzekering')}</h3>
                    <p className="text-sm opacity-90 mb-4">
                      {tr('Protect yourself while traveling Thailand. Compare the best travel insurance.', 'Bescherm jezelf tijdens je reis door Thailand. Vergelijk de beste reisverzekeringen.')}
                    </p>
                    <Link href="/travel-insurance-thailand/" className="block bg-white text-thailand-blue text-center px-4 py-2 rounded-xl font-semibold hover:bg-surface-cream transition-colors">
                      {tr('Compare Now', 'Vergelijk Nu')}
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <PreFooterAffiliateBanner
          title={tr('Plan Your Thailand Trip', 'Plan Je Thailand Reis')}
          description={tr('Book hotels, transport, activities, and get connected with an eSIM', 'Boek hotels, transport, activiteiten en blijf verbonden met een eSIM')}
          links={[
            { label: 'Booking.com', href: 'https://booking.tpo.lv/2PT1kR82?subid=itinerary' },
            { label: 'Trip.com', href: 'https://trip.tpo.lv/TmObooZ5?subid=itinerary' },
            { label: 'Activities', href: 'https://klook.tpo.lv/7Dt6WApj?subid=itinerary' },
            { label: 'Transport', href: 'https://12go.tpo.lv/tNA80urD?subid=itinerary' },
            { label: 'eSIM', href: 'https://saily.tpo.lv/rf9lidnE?subid=itinerary' },
            { label: 'NordVPN', href: 'https://nordvpn.tpo.lv/ekHF1i55?subid=itinerary' },
            { label: 'NordPass', href: 'https://nordvpn.tpo.lv/tp12zNjC?subid=itinerary' },
          ]}
        />
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const itineraries = getAllItineraries();
  const paths = itineraries.map(itinerary => ({
    params: { slug: itinerary.slug }
  }));

  return {
    paths,
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const slug = params?.slug as string;
  const lang = locale || 'en';

  const rawItinerary = getItineraryBySlug(slug);

  if (!rawItinerary) {
    return {
      notFound: true,
    };
  }

  // Helper to resolve bilingual {en, nl} objects to a string
  const t = (val: any): string => {
    if (!val) return '';
    if (typeof val === 'string') return val;
    if (typeof val === 'object' && val[lang]) return val[lang];
    if (typeof val === 'object' && val.en) return val.en;
    return String(val);
  };

  // Transform bilingual data to locale-specific strings
  const itinerary: Itinerary = {
    slug: rawItinerary.slug,
    title: t(rawItinerary.title),
    duration: rawItinerary.duration,
    region: rawItinerary.region,
    image: rawItinerary.image,
    description: t(rawItinerary.description),
    highlights: rawItinerary.highlights || [],
    cities: rawItinerary.cities || [],
    bestTime: rawItinerary.bestTimeToVisit || rawItinerary.bestTime || '',
    budget: {
      budget: rawItinerary.budget?.budget?.total || '',
      mid: rawItinerary.budget?.midrange?.total || rawItinerary.budget?.mid?.total || '',
      luxury: rawItinerary.budget?.luxury?.total || '',
    },
    days: (rawItinerary.days || []).map((day: any) => ({
      day: day.day,
      title: t(day.title),
      city: day.city || '',
      description: t(day.description),
      activities: (day.activities || []).map((act: any) => ({
        name: t(act.name),
        description: t(act.tip || act.description),
        cost: act.cost || '',
        duration: act.duration || '',
        type: act.type || '',
      })),
      meals: day.meals
        ? Object.entries(day.meals).map(([mealType, mealVal]: [string, any]) => ({
            meal: mealType.charAt(0).toUpperCase() + mealType.slice(1),
            restaurant: t(mealVal),
            cuisine: '',
            cost: '',
          }))
        : [],
      accommodation: day.accommodation
        ? {
            budget: day.accommodation.budget
              ? { name: t(day.accommodation.budget), price: '', link: '', description: '' }
              : undefined,
            mid: (day.accommodation.midrange || day.accommodation.mid)
              ? { name: t(day.accommodation.midrange || day.accommodation.mid), price: '', link: '', description: '' }
              : undefined,
            luxury: day.accommodation.luxury
              ? { name: t(day.accommodation.luxury), price: '', link: '', description: '' }
              : undefined,
          }
        : undefined,
      transport: t(day.transport),
    })),
    transport: (rawItinerary.transportBetweenCities || rawItinerary.transport || [])
      .filter((seg: any) => seg && seg.from)
      .map((seg: any) => ({
        from: seg.from || '',
        to: seg.to || '',
        options: (seg.options || []).map((opt: any) => ({
          type: opt.mode || opt.type || '',
          duration: opt.duration || '',
          cost: opt.cost || '',
          bookingLink: opt.bookingLink || opt.link || '',
        })),
      })),
    budgetBreakdown: rawItinerary.budgetBreakdown || [],
    packingTips: rawItinerary.packingTips
      ? (Array.isArray(rawItinerary.packingTips)
          ? rawItinerary.packingTips
          : (rawItinerary.packingTips[lang] || rawItinerary.packingTips.en || []))
      : [],
    faqs: rawItinerary.faqs || [],
    tags: rawItinerary.tags || [],
    seo: rawItinerary.seo
      ? {
          metaTitle: t(rawItinerary.seo.metaTitle),
          metaDescription: t(rawItinerary.seo.metaDescription),
        }
      : undefined,
  };

  // Transform related itineraries (from index.json with bilingual data)
  const rawRelated = getRelatedItineraries(slug, 3);
  const relatedItineraries: ItineraryListItem[] = rawRelated.map((item: any) => ({
    slug: item.slug,
    title: typeof item.title === 'object' ? (item.title[lang] || item.title.en) : item.title,
    duration: item.duration,
    region: item.region,
    image: item.image,
    description: '',
    highlights: item.highlights || [],
    budget: {
      budget: item.budgetRange || '',
      mid: '',
      luxury: '',
    },
  }));

  return {
    props: {
      itinerary,
      relatedItineraries,
    },
    revalidate: 604800,
  };
};
