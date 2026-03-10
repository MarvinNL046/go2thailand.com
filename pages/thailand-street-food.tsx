import { GetStaticProps } from 'next';
import SEOHead from '../components/SEOHead';
import Link from 'next/link';
import Breadcrumbs from '../components/Breadcrumbs';
import TripcomWidget from '../components/TripcomWidget';
import { useState } from 'react';

interface DishData {
  rank: number;
  name: string;
  thai_name: string;
  type: string;
  price_range: string;
  spice_level: string;
  description: string;
  where_to_find: string;
  best_cities: string[];
  key_facts: string[];
  google_maps_query: string;
}

interface PageData {
  title: string;
  meta_description: string;
  intro: string;
  items: DishData[];
  tips: string[];
  generated_at: string;
}

interface StreetFoodProps {
  data: PageData;
}

type TypeFilter = 'all' | 'noodles' | 'rice' | 'grilled' | 'soup' | 'salad' | 'dessert' | 'drink';
type SpiceFilter = 'all' | 'mild' | 'medium' | 'hot';

const FAQ_ITEMS = [
  {
    question: 'Is Thai street food safe to eat?',
    answer: 'Yes, Thai street food is generally safe. Look for stalls with high turnover (long queues of local customers mean fresh food). Avoid pre-cooked dishes sitting out in the sun. Stick to vendors that cook to order. Drink bottled water and ask for ice only at established restaurants. Bangkok, Chiang Mai, and tourist areas have excellent food safety standards for street vendors. In over a decade of eating Thai street food, the \"queue of locals\" rule has never steered me wrong.'
  },
  {
    question: 'How much does Thai street food cost in 2026?',
    answer: 'Most street food dishes cost 40-80 THB ($1.20-$2.40 USD). Budget items like moo ping skewers or satay sticks are 5-20 THB each. A full day of eating street food costs roughly 150-300 THB ($4.50-$9 USD) in local neighborhoods. Tourist zones like Khao San Road, Sukhumvit, and Patong Beach charge 50-100% more. Food inflation in 2026 is around 0.92% year-over-year, keeping street food among the world\'s best food bargains.'
  },
  {
    question: 'What Thai street food should I try first?',
    answer: 'Start mild and work your way up. Pad Thai (40-80 THB) and Khao Mun Gai/chicken rice (40-60 THB) are the safest bets — flavorful but not spicy. For dessert, mango sticky rice (50-80 THB) is universally loved. Once comfortable, try Pad Kra Pao (basil stir-fry) with a fried egg — it is what Thais eat every day. If you handle heat well, order som tam (papaya salad) with 2 chilies to start. Boat noodles at Victory Monument are a unique Bangkok experience at 10-15 THB per tiny bowl.'
  }
];

function typeLabel(type: string): string {
  switch (type) {
    case 'noodles': return 'Noodles';
    case 'rice': return 'Rice';
    case 'grilled': return 'Grilled';
    case 'soup': return 'Soup';
    case 'salad': return 'Salad';
    case 'dessert': return 'Dessert';
    case 'drink': return 'Drink';
    default: return type;
  }
}

function typeColor(type: string): string {
  switch (type) {
    case 'noodles': return 'bg-amber-500/30 text-amber-200 border border-amber-400/40';
    case 'rice': return 'bg-green-500/30 text-green-200 border border-green-400/40';
    case 'grilled': return 'bg-red-500/30 text-red-200 border border-red-400/40';
    case 'soup': return 'bg-blue-500/30 text-blue-200 border border-blue-400/40';
    case 'salad': return 'bg-lime-500/30 text-lime-200 border border-lime-400/40';
    case 'dessert': return 'bg-pink-500/30 text-pink-200 border border-pink-400/40';
    case 'drink': return 'bg-cyan-500/30 text-cyan-200 border border-cyan-400/40';
    default: return 'bg-gray-500/30 text-gray-200';
  }
}

function typeTagColor(type: string): string {
  switch (type) {
    case 'noodles': return 'bg-amber-50 text-amber-700';
    case 'rice': return 'bg-green-50 text-green-700';
    case 'grilled': return 'bg-red-50 text-red-700';
    case 'soup': return 'bg-blue-50 text-blue-700';
    case 'salad': return 'bg-lime-50 text-lime-700';
    case 'dessert': return 'bg-pink-50 text-pink-700';
    case 'drink': return 'bg-cyan-50 text-cyan-700';
    default: return 'bg-gray-50 text-gray-700';
  }
}

function spiceIndicator(level: string): { label: string; color: string; dots: number } {
  switch (level) {
    case 'hot': return { label: 'Hot', color: 'text-red-600', dots: 3 };
    case 'medium': return { label: 'Medium', color: 'text-orange-500', dots: 2 };
    case 'mild': return { label: 'Mild', color: 'text-green-600', dots: 1 };
    default: return { label: level, color: 'text-gray-500', dots: 0 };
  }
}

export default function ThailandStreetFood({ data }: StreetFoodProps) {
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
  const [spiceFilter, setSpiceFilter] = useState<SpiceFilter>('all');

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Thailand Street Food', href: '/thailand-street-food/' }
  ];

  const filterDishes = (dishes: DishData[]): DishData[] => {
    let filtered = dishes;
    if (typeFilter !== 'all') {
      filtered = filtered.filter(d => d.type === typeFilter);
    }
    if (spiceFilter !== 'all') {
      filtered = filtered.filter(d => d.spice_level === spiceFilter);
    }
    return filtered;
  };

  const filteredDishes = filterDishes(data.items);

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: data.title,
    numberOfItems: data.items.length,
    itemListElement: data.items.map(dish => ({
      '@type': 'ListItem',
      position: dish.rank,
      name: `${dish.name} (${dish.thai_name})`,
      url: 'https://go2-thailand.com/thailand-street-food/'
    }))
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://go2-thailand.com${item.href}`
    }))
  };

  const combinedSchema = [itemListSchema, faqSchema, breadcrumbSchema];

  const typeFilters: { key: TypeFilter; label: string }[] = [
    { key: 'all', label: 'All Dishes' },
    { key: 'noodles', label: 'Noodles' },
    { key: 'rice', label: 'Rice' },
    { key: 'grilled', label: 'Grilled' },
    { key: 'soup', label: 'Soup' },
    { key: 'salad', label: 'Salad' },
    { key: 'dessert', label: 'Dessert' },
    { key: 'drink', label: 'Drinks' }
  ];

  const spiceFilters: { key: SpiceFilter; label: string }[] = [
    { key: 'all', label: 'Any Spice' },
    { key: 'mild', label: 'Mild' },
    { key: 'medium', label: 'Medium' },
    { key: 'hot', label: 'Hot' }
  ];

  return (
    <>
      <SEOHead
        title={data.title}
        description={data.meta_description}
      >
        <meta
          name="keywords"
          content="thailand street food, thai street food, pad thai, som tam, mango sticky rice, bangkok street food, thai food prices 2026, what to eat in thailand"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
        />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        {/* Hero */}
        <section className="bg-surface-dark text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="text-center">
              <p className="font-script text-thailand-gold text-lg mb-2">Food Guide</p>
              <h1 className="text-4xl lg:text-6xl font-bold font-heading mb-6">
                {data.title}
              </h1>
              <p className="text-xl lg:text-2xl mb-6 max-w-3xl mx-auto opacity-90">
                From Bangkok&apos;s sois to Chiang Mai&apos;s night markets — every dish you need to try
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm font-medium opacity-80">
                <span className="bg-white/20 px-4 py-2 rounded-full">25 dishes</span>
                <span className="bg-white/20 px-4 py-2 rounded-full">Real 2026 prices</span>
                <span className="bg-white/20 px-4 py-2 rounded-full">Where to find them</span>
                <span className="bg-white/20 px-4 py-2 rounded-full">Spice levels rated</span>
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumbs */}
        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumbs items={breadcrumbItems} />
          </div>
        </section>

        {/* Intro */}
        <section className="bg-white py-8 border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-lg text-gray-700 leading-relaxed">{data.intro}</p>
          </div>
        </section>

        {/* Filters */}
        <section className="bg-white border-b sticky top-0 z-40 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap gap-3 mb-3">
              {typeFilters.map(f => (
                <button
                  key={f.key}
                  onClick={() => setTypeFilter(f.key)}
                  className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    typeFilter === f.key
                      ? 'bg-thailand-blue text-white'
                      : 'bg-surface-cream text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {spiceFilters.map(f => (
                <button
                  key={f.key}
                  onClick={() => setSpiceFilter(f.key)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                    spiceFilter === f.key
                      ? 'bg-thailand-gold text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Dish Cards */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredDishes.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <p className="text-xl">No dishes found for this filter combination.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {filteredDishes.map(dish => {
                  const spice = spiceIndicator(dish.spice_level);
                  return (
                    <div key={dish.rank}>
                      <article className="bg-white rounded-2xl shadow-md overflow-hidden relative hover:shadow-lg transition-shadow">
                        <div className="absolute top-4 left-4 z-10 bg-thailand-gold text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                          #{dish.rank}
                        </div>

                        {/* Header */}
                        <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 pt-8">
                          <div className="ml-12">
                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                              <h2 className="text-2xl font-bold font-heading text-white">{dish.name}</h2>
                              <span className="text-white/60 text-sm">{dish.thai_name}</span>
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${typeColor(dish.type)}`}>
                                {typeLabel(dish.type)}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="text-thailand-gold font-bold text-lg">{dish.price_range}</span>
                              <span className="text-white/50">|</span>
                              <span className={`font-medium ${spice.color}`}>
                                {Array.from({ length: spice.dots }, (_, i) => <span key={i} role="img" aria-label="chili">{'\u{1F336}\uFE0F'}</span>)} {spice.label}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${typeTagColor(dish.type)}`}>
                              {typeLabel(dish.type)}
                            </span>
                            {dish.best_cities.map(city => (
                              <span
                                key={city}
                                className="px-3 py-1 rounded-full text-xs font-medium bg-thailand-gold/10 text-thailand-gold"
                              >
                                {city}
                              </span>
                            ))}
                          </div>

                          <p className="text-gray-700 mb-4 leading-relaxed">{dish.description}</p>

                          {/* Info Grid */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-sm">
                            <div className="bg-surface-cream rounded-xl p-3">
                              <div className="text-gray-500 text-xs mb-1">Where to Find</div>
                              <div className="font-semibold text-gray-900 text-xs sm:text-sm">{dish.where_to_find}</div>
                            </div>
                            <div className="bg-surface-cream rounded-xl p-3">
                              <div className="text-gray-500 text-xs mb-1">Key Facts</div>
                              <ul className="space-y-1">
                                {dish.key_facts.map((fact, i) => (
                                  <li key={i} className="text-xs sm:text-sm text-gray-900 flex items-start gap-1.5">
                                    <span className="text-green-500 flex-shrink-0">&#10003;</span>
                                    {fact}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Google Maps */}
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(dish.google_maps_query)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm text-thailand-blue hover:text-thailand-red transition-colors font-medium"
                          >
                            <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Find on Google Maps
                          </a>
                        </div>
                      </article>

                      {/* Affiliate CTA after dish 8 */}
                      {dish.rank === 8 && (
                        <div className="bg-surface-dark rounded-2xl p-6 text-white my-8">
                          <h3 className="text-xl font-bold font-heading mb-2">
                            Explore Thai Food Culture
                          </h3>
                          <p className="opacity-90 mb-4 text-sm">
                            Cooking classes, food tours &amp; market visits across Thailand
                          </p>
                          <div className="flex flex-wrap gap-3">
                            <a
                              href="https://klook.tpo.lv/7Dt6WApj"
                              target="_blank"
                              rel="noopener noreferrer nofollow"
                              className="bg-white text-thailand-blue px-4 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors"
                            >
                              Cooking Classes
                            </a>
                            <a
                              href="https://getyourguide.tpo.lv/GuAFfGGK"
                              target="_blank"
                              rel="noopener noreferrer nofollow"
                              className="bg-white text-thailand-blue px-4 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors"
                            >
                              Food Tours
                            </a>
                            <a
                              href="https://booking.tpo.lv/2PT1kR82"
                              target="_blank"
                              rel="noopener noreferrer nofollow"
                              className="bg-white text-thailand-blue px-4 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors"
                            >
                              Hotels near Markets
                            </a>
                          </div>
                        </div>
                      )}

                      {/* TripcomWidget after dish 15 */}
                      {dish.rank === 15 && (
                        <div className="my-8">
                          <TripcomWidget
                            city="Bangkok"
                            type="searchbox"
                            customTitle="Stay Near Bangkok's Best Street Food"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Tips */}
        <section className="py-12 bg-surface-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-label text-center">Good to Know</p>
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8 text-center">
              Street Food Tips
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.tips.map((tip, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className="flex items-start gap-3">
                    <span className="bg-thailand-gold text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {i + 1}
                    </span>
                    <p className="text-gray-700 text-sm leading-relaxed">{tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-label text-center">FAQ</p>
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {FAQ_ITEMS.map((item, i) => (
                <details key={i} className="mb-4 bg-surface-cream rounded-xl shadow-sm group">
                  <summary className="p-5 font-semibold cursor-pointer hover:bg-gray-200 rounded-xl list-none flex items-center justify-between transition-colors">
                    <span className="text-gray-900">{item.question}</span>
                    <svg
                      className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform flex-shrink-0 ml-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-5 text-gray-700 leading-relaxed text-sm">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Affiliate CTA */}
        <section className="bg-surface-dark py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white mb-8">
              <p className="font-script text-thailand-gold text-lg mb-2">Taste Thailand</p>
              <h2 className="text-3xl font-bold font-heading mb-3">
                Book a Thai Food Experience
              </h2>
              <p className="text-lg opacity-90">
                Cooking classes, market tours &amp; foodie adventures
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <TripcomWidget
                city="Bangkok"
                type="searchbox"
                customTitle="Hotels Near Night Markets"
              />
              <div className="space-y-3">
                <a
                  href="https://klook.tpo.lv/7Dt6WApj"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="flex items-center justify-between bg-white text-gray-900 px-5 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-sm"
                >
                  <span>&#127859; Klook Cooking Classes</span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                <a
                  href="https://getyourguide.tpo.lv/GuAFfGGK"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="flex items-center justify-between bg-white text-gray-900 px-5 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-sm"
                >
                  <span>&#127774; GetYourGuide Food Tours</span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                <a
                  href="https://booking.tpo.lv/2PT1kR82"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="flex items-center justify-between bg-white text-gray-900 px-5 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-sm"
                >
                  <span>&#127968; Booking.com</span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                <a
                  href="https://saily.tpo.lv/rf9lidnE"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="flex items-center justify-between bg-white text-gray-900 px-5 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-sm"
                >
                  <span>&#128242; Saily eSIM for Thailand</span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
            <p className="text-white/70 text-xs text-center mt-6">
              Some links are affiliate links. We may earn a commission at no extra cost to you.
            </p>
          </div>
        </section>

        {/* Related Pages */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-label text-center">More Guides</p>
            <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6 text-center">
              Related Pages
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Link
                href="/nightlife/bangkok/"
                className="group block bg-white rounded-2xl p-6 border-0 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="text-3xl mb-3">&#127750;</div>
                <h3 className="text-lg font-bold font-heading text-gray-900 group-hover:text-thailand-blue transition-colors mb-2">
                  Bangkok Nightlife
                </h3>
                <p className="text-gray-600 text-sm">
                  Night markets, rooftop bars &amp; Bangkok&apos;s after-dark food scene.
                </p>
                <span className="inline-block mt-3 text-thailand-blue text-sm font-medium group-hover:underline">
                  Explore nightlife &#8594;
                </span>
              </Link>

              <Link
                href="/city/bangkok/top-10-restaurants/"
                className="group block bg-white rounded-2xl p-6 border-0 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="text-3xl mb-3">&#127869;</div>
                <h3 className="text-lg font-bold font-heading text-gray-900 group-hover:text-thailand-blue transition-colors mb-2">
                  Bangkok Restaurants
                </h3>
                <p className="text-gray-600 text-sm">
                  The best sit-down restaurants in Bangkok, from local to fine dining.
                </p>
                <span className="inline-block mt-3 text-thailand-blue text-sm font-medium group-hover:underline">
                  View restaurants &#8594;
                </span>
              </Link>

              <Link
                href="/thailand-for-first-timers/"
                className="group block bg-white rounded-2xl p-6 border-0 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="text-3xl mb-3">&#127758;</div>
                <h3 className="text-lg font-bold font-heading text-gray-900 group-hover:text-thailand-blue transition-colors mb-2">
                  Thailand for First-Timers
                </h3>
                <p className="text-gray-600 text-sm">
                  Everything you need to know before your first trip to Thailand.
                </p>
                <span className="inline-block mt-3 text-thailand-blue text-sm font-medium group-hover:underline">
                  Read guide &#8594;
                </span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const fs = require('fs');
  const path = require('path');
  const lang = locale || 'en';

  const localePath = path.join(process.cwd(), 'data', `street-food.${lang}.json`);
  const defaultPath = path.join(process.cwd(), 'data', 'street-food.json');
  const dataPath = lang !== 'en' && fs.existsSync(localePath) ? localePath : defaultPath;

  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  return {
    props: { data },
    revalidate: 86400
  };
};
