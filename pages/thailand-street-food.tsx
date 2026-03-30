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
    answer: 'Thai street food is generally safe when you follow the same logic locals use: eat where Thai people are eating, prefer stalls that cook to order, and avoid anything that has been sitting in the sun for hours. High turnover is the most reliable signal — a stall moving 200 bowls between 11 AM and 2 PM is refreshing ingredients constantly. Stick to bottled water; ask for ice only at established stalls or in a sealed bag format. Bangkok, Chiang Mai, and other urban centres have active street food vendor oversight from municipal health departments.'
  },
  {
    question: 'How much does Thai street food cost in 2026?',
    answer: 'Most dishes cost 40-80 THB (roughly $1.10-$2.30 USD). Individual snacks — a moo ping skewer, a satay stick, a portion of sai krok sausage — are 5-20 THB each. A full day of street food eating, covering breakfast, lunch, afternoon snack, and dinner, costs around 150-300 THB ($4.50-$9 USD) in local neighbourhoods. Tourist concentrations including Khao San Road, Sukhumvit Soi 11, and Patong Beach typically price 50-100% higher. MICHELIN Bib Gourmand stalls — some of which have been operating for 50-90 years — serve at the same price band as ordinary street vendors.'
  },
  {
    question: 'What Thai street food should I try first?',
    answer: 'Start with dishes that have no heat: pad thai (40-80 THB), khao mun gai chicken rice (40-60 THB), or moo ping grilled pork skewers with sticky rice (30-50 THB for a set). For dessert, mango sticky rice is the universal first experience — Kor Panich on Tanao Road in Bangkok, operating since 1932 and holding a MICHELIN Bib Gourmand, is the definitive address. Once calibrated to the flavours, try pad kra pao (holy basil stir-fry with fried egg) — this is what most Thais eat for lunch daily. For heat, order som tam with two chilies (prik song met) and increase from there. Boat noodles at Victory Monument are a specifically Bangkok experience worth prioritising.'
  },
  {
    question: 'Which Bangkok street food areas are best?',
    answer: 'Yaowarat Road (Chinatown) is Bangkok\'s richest street food zone — after 5 PM, the road partially closes and vendors set up a large market along both sides. Specialties include seafood grills, oyster omelettes (hoy tod), guay jub noodle soup, pad thai, and dim sum. The Tourism Authority of Thailand specifically highlights Guay Jub Ouan Pochana (50+ years, MICHELIN Bib Gourmand) at No. 408 Yaowarat Road. The Victory Monument area is best for Isan food: boat noodles, som tam, gai yang grilled chicken, and fermented sausage. Chatuchak Weekend Market (35 acres, 15,000+ stalls, Saturday-Sunday only) concentrates coconut ice cream, fresh fruit shakes, grilled meats, and Thai desserts in one place.'
  },
  {
    question: 'What did UNESCO say about Thai street food?',
    answer: 'In December 2024, UNESCO inscribed Tom Yum Kung (tom yum goong) on its Representative List of the Intangible Cultural Heritage of Humanity — the first Thai dish to receive this status, and Thailand\'s fifth item on the list overall (joining Khon masked dance, traditional Thai massage, Nora dance drama, and Songkran). UNESCO\'s documentation describes the dish\'s origin in the Buddhist riverside communities of Central Thailand\'s Chao Phraya basin, where freshwater prawns were the preferred protein and the aromatic herbs (lemongrass, galangal, kaffir lime) were valued for medicinal properties. The first written recipe dates to 1888. Source: ich.unesco.org/en/RL/tomyum-kung-01879'
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
                Yaowarat, Chiang Mai Night Bazaar, Chatuchak — with MICHELIN Bib Gourmand picks and UNESCO heritage context
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm font-medium opacity-80">
                <span className="bg-white/20 px-4 py-2 rounded-full">25 dishes</span>
                <span className="bg-white/20 px-4 py-2 rounded-full">MICHELIN Bib Gourmand picks</span>
                <span className="bg-white/20 px-4 py-2 rounded-full">UNESCO heritage context</span>
                <span className="bg-white/20 px-4 py-2 rounded-full">Real vendor addresses</span>
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

        {/* UNESCO + MICHELIN Context Banner */}
        <section className="bg-thailand-gold/10 border-y border-thailand-gold/30 py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="bg-white rounded-full p-2 flex-shrink-0 shadow-sm">
                  <svg className="w-5 h-5 text-thailand-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">UNESCO Heritage Dish</p>
                  <p className="text-gray-600 text-xs mt-0.5">Tom Yum Kung was inscribed on UNESCO&apos;s Intangible Cultural Heritage list in December 2024 — Thailand&apos;s first dish to receive the designation. Source: <a href="https://ich.unesco.org/en/RL/tomyum-kung-01879" target="_blank" rel="noopener noreferrer" className="underline">ich.unesco.org</a></p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-white rounded-full p-2 flex-shrink-0 shadow-sm">
                  <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">MICHELIN Bib Gourmand: 137 venues</p>
                  <p className="text-gray-600 text-xs mt-0.5">The 2026 MICHELIN Guide Thailand Bib Gourmand selection covers 137 dining venues across Bangkok, Chiang Mai, Phuket, and beyond. Several are 50–90-year-old street stalls. Source: <a href="https://guide.michelin.com/en/th/bangkok-region/bangkok/restaurants/bib-gourmand" target="_blank" rel="noopener noreferrer" className="underline">guide.michelin.com</a></p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Location Spotlights */}
        <section className="bg-surface-cream py-12 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="section-label text-center">Where to Eat</p>
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-8 text-center">
              Three Essential Street Food Areas
            </h2>
            <div className="grid md:grid-cols-3 gap-6">

              {/* Yaowarat */}
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-red-800 to-red-900 px-6 py-5">
                  <p className="text-red-200 text-xs font-semibold uppercase tracking-wider mb-1">Bangkok</p>
                  <h3 className="text-xl font-bold text-white font-heading">Yaowarat Road</h3>
                  <p className="text-red-200 text-sm mt-1">Chinatown — Bangkok&apos;s best food street</p>
                </div>
                <div className="p-6 space-y-4">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Yaowarat Road anchors Bangkok&apos;s Chinatown, the largest in Southeast Asia. From 5 PM each evening, vendors close traffic lanes and extend their stalls along both sides of the road. Seafood grills, oyster omelettes, pad thai over charcoal, and guay jub noodle soup operate side by side until well past midnight.
                  </p>
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Notable Addresses</p>
                    <ul className="space-y-1.5 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold flex-shrink-0">&#9679;</span>
                        <span><strong>Guay Jub Ouan Pochana</strong> — No. 408 Yaowarat Rd. 50+ years, MICHELIN Bib Gourmand. Peppery rolled noodle soup.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold flex-shrink-0">&#9679;</span>
                        <span><strong>Nai Mong Hoy Tod</strong> — 30+ years, the benchmark oyster omelette. Ask for &apos;tod krop&apos;.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold flex-shrink-0">&#9679;</span>
                        <span><strong>T&amp;K Seafood</strong> — Long-running seafood grill and tom yum goong specialist on Yaowarat.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-red-600 font-bold flex-shrink-0">&#9679;</span>
                        <span><strong>Pa Tong Go Savoey</strong> — MICHELIN Bib Gourmand for Chinese doughnuts (pa tong go) with pandan custard.</span>
                      </li>
                    </ul>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Source: <a href="https://www.tourismthailand.org/Articles/top-5-street-food-restaurants-in-yaowarat-to-turn-your-hunger-into-happiness" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">Tourism Authority of Thailand</a>, <a href="https://guide.michelin.com/en/th/bangkok-region/bangkok/restaurants/bib-gourmand" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">MICHELIN Guide Thailand</a></p>
                </div>
              </div>

              {/* Chiang Mai Night Bazaar */}
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-amber-700 to-amber-800 px-6 py-5">
                  <p className="text-amber-200 text-xs font-semibold uppercase tracking-wider mb-1">Chiang Mai</p>
                  <h3 className="text-xl font-bold text-white font-heading">Night Bazaar</h3>
                  <p className="text-amber-200 text-sm mt-1">Chang Klan Road — Northern Thai specialties</p>
                </div>
                <div className="p-6 space-y-4">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    The Night Bazaar on Chang Klan Road began as a gathering point for Chinese merchants and local traders. Today it runs 5 PM to 11 PM along several blocks, combining craft stalls with street food vendors focused on Northern Thai specialties unavailable in Bangkok. It is the most accessible single location for Northern cuisine.
                  </p>
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">What to Order</p>
                    <ul className="space-y-1.5 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-amber-600 font-bold flex-shrink-0">&#9679;</span>
                        <span><strong>Khao Soi</strong> — Coconut curry egg noodle soup; the Northern Thai signature dish. Khao Soi Lung Prakit Kad Kom nearby holds a MICHELIN Bib Gourmand.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-600 font-bold flex-shrink-0">&#9679;</span>
                        <span><strong>Sai Oua</strong> — Northern herbal pork sausage. Aromatic from fresh curry paste, lemongrass, and kaffir lime.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-600 font-bold flex-shrink-0">&#9679;</span>
                        <span><strong>Nam Ngiew</strong> — Northern pork and tomato noodle soup with Shan-Burmese influence.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-600 font-bold flex-shrink-0">&#9679;</span>
                        <span><strong>Mango Sticky Rice &amp; Satay</strong> — Available throughout; quality is reliable in the bazaar food zone.</span>
                      </li>
                    </ul>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Hours: approx. 5 PM–11 PM daily. Source: <a href="https://chiangmaihub.com/chiang-mai-night-bazaar/" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">chiangmaihub.com</a></p>
                </div>
              </div>

              {/* Chatuchak */}
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-green-700 to-green-800 px-6 py-5">
                  <p className="text-green-200 text-xs font-semibold uppercase tracking-wider mb-1">Bangkok</p>
                  <h3 className="text-xl font-bold text-white font-heading">Chatuchak Weekend Market</h3>
                  <p className="text-green-200 text-sm mt-1">35 acres, 15,000+ stalls, Sat–Sun 9 AM–6 PM</p>
                </div>
                <div className="p-6 space-y-4">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Chatuchak is the largest weekend market in Thailand — 35 acres, over 15,000 stalls, and more than 200,000 weekly visitors (Tourism Authority of Thailand). For street food, concentrate on the interior food lanes and the perimeter. Arrive by 9 AM; by noon the heat and crowds are significant. MRT to Chatuchak Park (Exit 1) or Kamphaeng Phet (Exit 2).
                  </p>
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Key Food Stops</p>
                    <ul className="space-y-1.5 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold flex-shrink-0">&#9679;</span>
                        <span><strong>Coco JJ</strong> — Section 1, Lane 36. Coconut ice cream in a coconut shell. Operating since 2008, one of the market&apos;s most recognised dessert stalls.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold flex-shrink-0">&#9679;</span>
                        <span><strong>Mango Sticky Rice carts</strong> — Multiple vendors throughout the food section; quality is seasonal (best April–June).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 font-bold flex-shrink-0">&#9679;</span>
                        <span><strong>Grilled pork &amp; fried chicken</strong> — Moo ping and gai tod stalls are scattered throughout the market perimeter.</span>
                      </li>
                    </ul>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Source: <a href="https://www.tourismthailand.org/Attraction/chatuchak-weekend-market" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">Tourism Authority of Thailand</a></p>
                </div>
              </div>

            </div>
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
                              href="https://klook.tpo.lv/7Dt6WApj?subid=street-food"
                              target="_blank"
                              rel="noopener noreferrer nofollow"
                              className="bg-white text-thailand-blue px-4 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors"
                            >
                              Cooking Classes
                            </a>
                            <a
                              href="https://getyourguide.tpo.lv/GuAFfGGK?subid=street-food"
                              target="_blank"
                              rel="noopener noreferrer nofollow"
                              className="bg-white text-thailand-blue px-4 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors"
                            >
                              Food Tours
                            </a>
                            <a
                              href="https://booking.tpo.lv/2PT1kR82?subid=street-food"
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

        {/* Sources */}
        <section className="py-10 bg-surface-cream border-t">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold font-heading text-gray-900 mb-4">Sources &amp; References</h2>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="https://ich.unesco.org/en/RL/tomyum-kung-01879" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline font-medium">UNESCO — Tom Yum Kung Intangible Cultural Heritage inscription (ich.unesco.org)</a>
                <span className="text-gray-400 ml-2">— December 2024</span>
              </li>
              <li>
                <a href="https://guide.michelin.com/en/th/bangkok-region/bangkok/restaurants/bib-gourmand" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline font-medium">MICHELIN Guide Thailand — Bangkok Bib Gourmand listings (guide.michelin.com)</a>
                <span className="text-gray-400 ml-2">— 2026 selection, 137 venues</span>
              </li>
              <li>
                <a href="https://www.tourismthailand.org/Articles/top-5-street-food-restaurants-in-yaowarat-to-turn-your-hunger-into-happiness" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline font-medium">Tourism Authority of Thailand — Top street food in Yaowarat (tourismthailand.org)</a>
              </li>
              <li>
                <a href="https://www.tourismthailand.org/Attraction/chatuchak-weekend-market" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline font-medium">Tourism Authority of Thailand — Chatuchak Weekend Market (tourismthailand.org)</a>
              </li>
              <li>
                <a href="https://www.smithsonianmag.com/travel/the-surprising-history-of-pad-thai-180984625/" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline font-medium">Smithsonian Magazine — The Surprising History of Pad Thai (smithsonianmag.com)</a>
              </li>
              <li>
                <a href="https://en.wikipedia.org/wiki/Green_papaya_salad" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline font-medium">Wikipedia — Green papaya salad / Som Tam origin and spread</a>
              </li>
              <li>
                <a href="https://en.wikipedia.org/wiki/Satay" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline font-medium">Wikipedia — Satay origin and Southeast Asian culinary history</a>
              </li>
              <li>
                <a href="https://guide.michelin.com/en/article/features/decoding-the-delicious-som-tam" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline font-medium">MICHELIN Guide — Decoding Som Tam: Thailand&apos;s papaya salad (guide.michelin.com)</a>
              </li>
              <li>
                <a href="https://www.khaosodenglish.com/life/food/2024/12/05/tom-yum-kung-thailands-iconic-soup-achieves-unesco-heritage-status/" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline font-medium">Khaosod English — Tom Yum Kung achieves UNESCO Heritage Status (khaosodenglish.com)</a>
              </li>
              <li>
                <a href="https://chiangmaihub.com/chiang-mai-night-bazaar/" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline font-medium">Chiang Mai Hub — Night Bazaar guide (chiangmaihub.com)</a>
              </li>
            </ul>
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
                  href="https://klook.tpo.lv/7Dt6WApj?subid=street-food"
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
                  href="https://getyourguide.tpo.lv/GuAFfGGK?subid=street-food"
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
                  href="https://booking.tpo.lv/2PT1kR82?subid=street-food"
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
                  href="https://saily.tpo.lv/rf9lidnE?subid=street-food"
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
    revalidate: 604800
  };
};
