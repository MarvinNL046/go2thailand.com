import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getCookingClassesIndex, getCookingClassesByCity } from '../lib/cooking-classes';
import { formatPrice } from '../lib/price';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';

interface CookingClass {
  name: string;
  slug: string;
  rating: number;
  reviews: number;
  priceFrom: number;
  currency: string;
  duration: string;
  groupSize: string;
  badge: string;
}

interface CityEntry {
  slug: string;
  name: { en: string; nl: string };
  classCount: number;
  priceRange: { from: number; to: number; currency: string };
  topRating: number;
  highlight: { en: string; nl: string };
}

interface CityClasses {
  city: string;
  cityName: { en: string; nl: string };
  intro: { en: string; nl: string };
  classes: CookingClass[];
}

interface Props {
  cities: CityEntry[];
  topClasses: { cityName: string; citySlug: string; cls: CookingClass }[];
}

const GYG_AFFILIATE = 'https://getyourguide.tpo.lv/6HngJ5FC';
const KLOOK_AFFILIATE = 'https://klook.tpo.lv/7Dt6WApj';

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: fullStars }, (_, i) => (
        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
    </span>
  );
}

export default function BestCookingClassesPage({ cities, topClasses }: Props) {
  const { locale } = useRouter();
  const loc = locale || 'en';
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Best Cooking Classes in Thailand', href: '/best-cooking-classes-in-thailand/' }
  ];

  const title = 'Best Cooking Classes in Thailand 2026 — 5 Cities Compared';
  const description = 'Verified guide to the best Thai cooking schools in Bangkok, Chiang Mai, Phuket, Koh Samui and Krabi. Real schools, real details — from farm-to-table classes to Michelin-recognised kitchens.';

  const faqItems = [
    {
      q: 'Where is the best place to take a cooking class in Thailand?',
      a: 'Chiang Mai is widely considered the gold standard for cooking classes in Thailand. The city has the highest concentration of schools, the most competitive prices, and a unique farm-to-table tradition — several schools, including Thai Farm Cooking School and Mama Noi, run classes on working organic farms outside the city. Bangkok is a close second if you want luxury: the Blue Elephant Cooking School in the Sathorn district operates from a century-old colonial mansion and is recognised by the Michelin Guide.'
    },
    {
      q: 'How much does a Thai cooking class cost?',
      a: 'Budget-friendly half-day classes in Chiang Mai start around 1,000 THB (roughly USD 27). In Bangkok, mid-range schools like Silom Thai Cooking School charge a similar amount and include a morning market tour. Premium experiences — Blue Elephant Bangkok or the Phuket Thai Cooking Academy\'s multi-day courses — can run 3,000–5,000 THB or more. Koh Samui and Krabi fall in the middle, typically 1,200–2,500 THB for a half-day session.'
    },
    {
      q: 'Do Thai cooking classes include a market visit?',
      a: 'Many do, and it is worth seeking out one that does. Walking a Thai wet market before you cook gives essential context: you learn to identify galangal versus ginger, see how fresh coconut milk is pressed, and understand why Thai chefs insist on same-day ingredients. Schools that include market tours include Silom Thai Cooking School (Bangkok), Thai Farm Cooking School (Chiang Mai), Phuket Thai Cooking Academy, and Ya\'s Cookery School (Krabi).'
    },
    {
      q: 'Are Thai cooking classes suitable for vegetarians and vegans?',
      a: 'Yes — most schools actively cater for vegetarians and vegans. Phuket Thai Cooking Academy has a dedicated vegetarian programme and even offers a five-day professional vegan Thai cooking course. Mama Noi in Chiang Mai has a specific vegetarian cooking class menu. Asia Scenic in Chiang Mai allows you to substitute fish sauce and shrimp paste. Always mention your dietary needs when booking so the school can prepare accordingly.'
    },
    {
      q: 'Is Thai food a UNESCO recognised culinary heritage?',
      a: 'Yes, in a significant way. In December 2024, Thailand\'s tom yum kung was inscribed on the UNESCO Representative List of the Intangible Cultural Heritage of Humanity — the first Thai food to receive this honour. The dish joins Khon masked dance, Thai massage, Nora dance drama and Songkran on Thailand\'s UNESCO intangible heritage list. Taking a cooking class is one of the most direct ways to engage with this living culinary tradition.'
    },
    {
      q: 'Should I book a cooking class in advance?',
      a: 'Yes, especially during peak season (November through February). Popular Chiang Mai schools fill up a week or more ahead. Even in quieter months, booking two to three days in advance guarantees your preferred session time and gives the school time to arrange hotel pickup. Most schools offer free cancellation up to 24 hours before the class.'
    }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a
      }
    }))
  };

  const howToJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': 'How to Choose and Book a Thai Cooking Class in Thailand',
    'description': 'A practical guide to selecting the right Thai cooking class for your trip, based on city, budget, and experience level.',
    'totalTime': 'PT15M',
    'step': [
      {
        '@type': 'HowToStep',
        'name': 'Choose your city based on your travel style',
        'text': 'Chiang Mai offers farm-to-table classes and the best value. Bangkok suits those wanting a Michelin-recognised experience or a class with a morning market visit in an urban setting. Phuket and Koh Samui add a beach holiday dimension. Krabi works well if you want a small-group class in a more relaxed resort town.',
        'position': 1
      },
      {
        '@type': 'HowToStep',
        'name': 'Decide on class format: half-day, full-day, or speciality',
        'text': 'Half-day classes (typically 3–4 hours) cover four to five dishes and suit most travellers. Full-day classes add a market tour and an organic farm visit — the Thai Farm Cooking School in Chiang Mai is the benchmark. Speciality classes focus on a single technique, such as curry paste grinding or fruit and vegetable carving.',
        'position': 2
      },
      {
        '@type': 'HowToStep',
        'name': 'Verify the school operates its own premises',
        'text': 'Look for schools with a fixed address, an official website, and consistent reviews across TripAdvisor and Google. Schools like Silom Thai Cooking School (silomthaicooking.com), Blue Elephant (blueelephant.com), and Mama Noi (mamanoicookingschool.com) maintain transparent booking pages. Avoid operators that only exist on third-party platforms.',
        'position': 3
      },
      {
        '@type': 'HowToStep',
        'name': 'Check group size',
        'text': 'Smaller is better for hands-on learning. Look for classes capped at 8–12 participants. Jungle Kitchen in Koh Samui limits classes to eight guests. Silom Thai Cooking School runs sessions of around nine to ten. Large groups at hotel cooking demos can leave you watching rather than cooking.',
        'position': 4
      },
      {
        '@type': 'HowToStep',
        'name': 'Book directly or through a trusted platform',
        'text': 'Booking directly on the school\'s website is usually cheapest. For flexibility and instant confirmation, GetYourGuide and Klook both list verified Thai cooking classes. Book at least two to three days ahead; one week during peak season (November–February) or around Songkran in April.',
        'position': 5
      }
    ]
  };

  return (
    <>
      <SEOHead title={title} description={description}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
        />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        {/* Hero */}
        <section className="bg-surface-dark text-white">
          <div className="container-custom py-12">
            <Breadcrumbs items={breadcrumbs} />
            <div className="text-center mt-6">
              <p className="font-script text-thailand-gold text-lg mb-2">Thai Cuisine</p>
              <h1 className="text-4xl lg:text-5xl font-bold font-heading mb-4">
                Best Cooking Classes in Thailand
              </h1>
              <p className="text-xl max-w-3xl mx-auto opacity-90">
                A journalist&apos;s guide to verified Thai cooking schools across five cities — from Chiang Mai&apos;s organic farms to Bangkok&apos;s Michelin-recognised kitchens. Real schools, real details.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">

            {/* Editorial intro */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-12">
              <p className="section-label">Editorial Overview</p>
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">
                Why Thai Cooking Classes Are Worth Your Time
              </h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  In December 2024, UNESCO added tom yum kung to its Representative List of the Intangible Cultural Heritage of Humanity — the first Thai dish to receive this recognition. The inscription acknowledged what food lovers have known for decades: Thai cuisine is not just a collection of recipes, it is a living system of knowledge about herbs, fermentation, balance of flavour, and community ritual that has evolved over centuries.
                </p>
                <p className="text-gray-700 mb-4">
                  Taking a cooking class in Thailand is the most direct way to engage with that system. You learn not just the recipe for green curry but why galangal and lemongrass need to be bruised, not minced. You discover that the heat in a Chiang Mai larb comes from toasted dried chillies, not fresh ones. You understand why Thai cooks taste and adjust constantly, treating a dish not as a fixed formula but as a conversation between ingredients.
                </p>
                <p className="text-gray-700 mb-4">
                  This guide covers verified cooking schools in Bangkok, Chiang Mai, Phuket, Koh Samui and Krabi. Every school listed here has a functioning official website and established operating history. Prices, market tours, vegetarian options and key details have been checked against each school&apos;s own published information as of early 2026.
                </p>
                <p className="text-gray-700 text-sm italic">
                  Source: UNESCO Intangible Cultural Heritage inscription of tom yum kung, December 2024 (ich.unesco.org). School details sourced from official websites and verified booking platforms.
                </p>
              </div>
            </div>

            {/* Quick Comparison Table */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-12">
              <p className="section-label px-6 pt-6">Compare</p>
              <h2 className="text-2xl font-bold font-heading text-gray-900 p-6 pb-0">
                Five Cities at a Glance
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-surface-cream">
                    <tr>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">City</th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">Classes</th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">Price Range</th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">Best For</th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {cities.map((city) => (
                      <tr key={city.slug} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <Link href={`/city/${city.slug}/cooking-classes/`} className="font-semibold text-thailand-blue hover:underline">
                            {city.name.en}
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-gray-700">{city.classCount}+</td>
                        <td className="px-6 py-4 text-gray-700">
                          {formatPrice(city.priceRange.from, loc)} – {formatPrice(city.priceRange.to, loc)}
                        </td>
                        <td className="px-6 py-4 text-gray-600 text-sm">{city.highlight.en.split(' — ')[0]}</td>
                        <td className="px-6 py-4">
                          <Link
                            href={`/city/${city.slug}/cooking-classes/`}
                            className="text-sm font-semibold text-thailand-red hover:text-red-700"
                          >
                            View classes &rarr;
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ===== BANGKOK ===== */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-lg font-bold text-white bg-thailand-blue w-8 h-8 rounded-xl flex items-center justify-center">1</span>
                <h2 className="text-2xl font-bold font-heading text-gray-900">
                  <Link href="/city/bangkok/cooking-classes/" className="hover:text-thailand-blue">
                    Cooking Classes in Bangkok
                  </Link>
                </h2>
              </div>
              <p className="text-gray-500 text-sm mb-4">Best for: urban convenience, luxury experiences, Michelin-recognised schools</p>

              <p className="text-gray-700 mb-6">
                Bangkok is not where you go for the cheapest class — it is where you go for the most polished one. The city&apos;s cooking schools benefit from Bangkok&apos;s extraordinary street food culture and wholesale markets. A morning market visit here can involve sampling seven different varieties of banana or watching a vendor press fresh coconut milk to order. Two schools stand out for very different reasons.
              </p>

              {/* Silom Thai Cooking School */}
              <div className="border border-gray-200 rounded-xl p-6 mb-6">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <h3 className="text-xl font-bold font-heading text-gray-900">Silom Thai Cooking School</h3>
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">Market tour included</span>
                </div>
                <p className="text-sm text-gray-500 mb-3">
                  6/14 Decho Road, Bang Rak, Bangkok &mdash; near Chong Nonsi BTS &mdash;{' '}
                  <a href="https://www.silomthaicooking.com" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">silomthaicooking.com</a>
                </p>
                <p className="text-gray-700 mb-4">
                  Silom Thai Cooking School has operated from a traditional open kitchen in the Bang Rak district for well over a decade, maintaining a small-group format of around nine to ten participants per session. The morning class (9 am to noon) opens with a guided walk through the local fresh market, where your instructor explains the difference between young and mature galangal, points out kaffir lime leaves and holy basil, and helps you choose the ingredients you will cook with an hour later. Afternoon and evening sessions are also available for those who prefer to skip the market.
                </p>
                <p className="text-gray-700 mb-4">
                  The curriculum covers four to five dishes per session: expect to work on a soup such as tom kha gai, a stir-fry, a curry, and a dessert. The school issues a recipe booklet to take home. Instructors are certified Thai chefs who teach in English.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-2">
                  <div className="bg-surface-cream rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Duration</div>
                    <div className="text-sm font-semibold text-gray-800">3 hours</div>
                  </div>
                  <div className="bg-surface-cream rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Group size</div>
                    <div className="text-sm font-semibold text-gray-800">~9–10 people</div>
                  </div>
                  <div className="bg-surface-cream rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Market visit</div>
                    <div className="text-sm font-semibold text-green-700">Yes (morning)</div>
                  </div>
                  <div className="bg-surface-cream rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Vegetarian</div>
                    <div className="text-sm font-semibold text-green-700">Yes, on request</div>
                  </div>
                </div>
              </div>

              {/* Blue Elephant */}
              <div className="border border-gray-200 rounded-xl p-6 mb-6">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <h3 className="text-xl font-bold font-heading text-gray-900">Blue Elephant Cooking School Bangkok</h3>
                  <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-3 py-1 rounded-full">Michelin recognised</span>
                </div>
                <p className="text-sm text-gray-500 mb-3">
                  233 South Sathorn Road, Yan Nawa, Sathorn, Bangkok &mdash;{' '}
                  <a href="https://blueelephant.com/cooking-school/cooking-school-bangkok/" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">blueelephant.com</a>
                </p>
                <p className="text-gray-700 mb-4">
                  Founded in 1980 by Thai-Belgian chef Nooror Somany Steppe, Blue Elephant is one of the most respected names in Thai fine dining — and its cooking school reflects that pedigree. Classes take place inside a century-old colonial mansion (the Thai Chine Building) in the Sathorn district: a yellow-painted, arched-window heritage building that feels a world removed from the street outside.
                </p>
                <p className="text-gray-700 mb-4">
                  The half-day morning class includes a Thai market tour where students select fresh ingredients before returning to prepare four to five dishes. Teaching is available in English, Thai, French, Dutch and Chinese. The school produces graduates confident enough to replicate restaurant-standard Thai curries at home. Expect a higher price point than typical tourist-track schools — this is Thai culinary education taken seriously.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-2">
                  <div className="bg-surface-cream rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Duration</div>
                    <div className="text-sm font-semibold text-gray-800">Half-day</div>
                  </div>
                  <div className="bg-surface-cream rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Setting</div>
                    <div className="text-sm font-semibold text-gray-800">Heritage mansion</div>
                  </div>
                  <div className="bg-surface-cream rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Market visit</div>
                    <div className="text-sm font-semibold text-green-700">Yes (morning class)</div>
                  </div>
                  <div className="bg-surface-cream rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Languages</div>
                    <div className="text-sm font-semibold text-gray-800">EN / TH / FR / NL / ZH</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {topClasses.filter(tc => tc.citySlug === 'bangkok').slice(0, 3).map((tc, i) => (
                  <div key={tc.cls.slug} className="flex items-center gap-2 p-3 bg-surface-cream rounded-xl text-sm">
                    <span className="text-gray-400 font-bold">#{i+1}</span>
                    <span className="font-medium text-gray-800">{tc.cls.name}</span>
                    <StarRating rating={tc.cls.rating} />
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link href="/city/bangkok/cooking-classes/" className="inline-flex items-center text-thailand-red font-semibold hover:text-red-700">
                  See all Bangkok cooking classes &rarr;
                </Link>
              </div>
            </div>

            {/* ===== CHIANG MAI ===== */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-lg font-bold text-white bg-thailand-blue w-8 h-8 rounded-xl flex items-center justify-center">2</span>
                <h2 className="text-2xl font-bold font-heading text-gray-900">
                  <Link href="/city/chiang-mai/cooking-classes/" className="hover:text-thailand-blue">
                    Cooking Classes in Chiang Mai
                  </Link>
                </h2>
              </div>
              <p className="text-gray-500 text-sm mb-4">Best for: farm-to-table experience, best value, widest choice, northern Thai cuisine</p>

              <p className="text-gray-700 mb-6">
                Chiang Mai is the undisputed capital of Thai cooking classes for travelling food lovers. The city&apos;s cooler climate, fertile surrounding countryside and deeply rooted culinary traditions — northern Thai cuisine (khao soi, larb, naem sausage) differs significantly from central Thai cooking — give Chiang Mai schools a distinctive character. Several operate on working organic farms in the hills outside the city, which means you are not just buying ingredients from a market but picking them from the ground yourself. Three schools are worth highlighting.
              </p>

              {/* Thai Farm Cooking School */}
              <div className="border border-gray-200 rounded-xl p-6 mb-6">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <h3 className="text-xl font-bold font-heading text-gray-900">Thai Farm Cooking School</h3>
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">Established 2001 — first organic farm school</span>
                </div>
                <p className="text-sm text-gray-500 mb-3">
                  Organic farm approx. 17 km from Chiang Mai city &mdash;{' '}
                  <a href="https://thaifarmcooking.com" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">thaifarmcooking.com</a>
                </p>
                <p className="text-gray-700 mb-4">
                  The original. Thai Farm Cooking School opened in 2001 as the first Thai cooking school to run classes on a working organic farm, and it still makes that claim convincingly. The day starts with a stop at a local market on the way out of Chiang Mai, then continues to the farm — roughly 17 kilometres from the old city — where participants are guided through plots of lemongrass, turmeric, galangal and kaffir lime before cooking in individual, well-equipped stations.
                </p>
                <p className="text-gray-700 mb-4">
                  The curriculum leans toward northern Thai dishes as well as the central Thai canon: expect khao soi alongside green curry, and sticky rice preparation alongside jasmine rice. Both half-day and full-day options are available. The full-day course is the more instructive: you cook six to seven dishes and have time to absorb the farm environment rather than rushing through it.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-2">
                  <div className="bg-surface-cream rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Options</div>
                    <div className="text-sm font-semibold text-gray-800">Half-day / Full-day</div>
                  </div>
                  <div className="bg-surface-cream rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Setting</div>
                    <div className="text-sm font-semibold text-gray-800">Organic farm</div>
                  </div>
                  <div className="bg-surface-cream rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Market visit</div>
                    <div className="text-sm font-semibold text-green-700">Yes, en route</div>
                  </div>
                  <div className="bg-surface-cream rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Vegetarian</div>
                    <div className="text-sm font-semibold text-green-700">Yes, on request</div>
                  </div>
                </div>
              </div>

              {/* Asia Scenic */}
              <div className="border border-gray-200 rounded-xl p-6 mb-6">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <h3 className="text-xl font-bold font-heading text-gray-900">Asia Scenic Thai Cooking School</h3>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">Old City + Farm options</span>
                </div>
                <p className="text-sm text-gray-500 mb-3">
                  31 Rachadumneon Soi 5, Chiang Mai Old City (near Thapae Gate) &mdash;{' '}
                  <a href="https://www.asiascenic.com" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">asiascenic.com</a>
                </p>
                <p className="text-gray-700 mb-4">
                  Founded by Gayle in 2007, Asia Scenic offers a useful choice: take your class in the school&apos;s Secret Garden inside the historic Old City (walking distance from Thapae Gate), or out at the Organic Farm Retreat in the quieter countryside. Both options include a guided market visit. Morning sessions run 9 am to 1:30 pm; evening sessions 4 pm to 8:30 pm — the latter giving you sunset cooking in the garden, which is a genuinely pleasant experience.
                </p>
                <p className="text-gray-700 mb-4">
                  Prices at 1,000 THB per person (Old City) or 1,200 THB (farm) put this among the most accessible options in Chiang Mai without compromising on instruction quality. Vegetarian and vegan substitutions are accommodated, including replacing fish sauce with soy sauce and omitting shrimp paste from curry pastes.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-2">
                  <div className="bg-surface-cream rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Price from</div>
                    <div className="text-sm font-semibold text-gray-800">1,000 THB</div>
                  </div>
                  <div className="bg-surface-cream rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Sessions</div>
                    <div className="text-sm font-semibold text-gray-800">Morning &amp; Evening</div>
                  </div>
                  <div className="bg-surface-cream rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Market visit</div>
                    <div className="text-sm font-semibold text-green-700">Yes</div>
                  </div>
                  <div className="bg-surface-cream rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Vegetarian/Vegan</div>
                    <div className="text-sm font-semibold text-green-700">Accommodated</div>
                  </div>
                </div>
              </div>

              {/* Mama Noi */}
              <div className="border border-gray-200 rounded-xl p-6 mb-6">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <h3 className="text-xl font-bold font-heading text-gray-900">Mama Noi Thai Cooking School</h3>
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full">Air-conditioned kitchen option</span>
                </div>
                <p className="text-sm text-gray-500 mb-3">
                  Chiang Mai, with free pickup within 5 km of the Old City &mdash;{' '}
                  <a href="https://www.mamanoicookingschool.com" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">mamanoicookingschool.com</a>
                </p>
                <p className="text-gray-700 mb-4">
                  Mama Noi stands apart from most Chiang Mai schools by offering climate-controlled kitchens — a meaningful practical difference in Thailand&apos;s humid heat. The school sits on a 6-acre property described as an organic farm, with kaffir lime trees, morning glory and other Thai herbs that students pick themselves before cooking. Each participant works at an individual cooking station rather than sharing with others, which translates to genuinely hands-on practice rather than an observer role.
                </p>
                <p className="text-gray-700 mb-4">
                  Afternoon classes (from 3:30 pm) end with complimentary mango sticky rice and Thai tea. A dedicated vegetarian cooking class is available alongside the standard curriculum. Free pickup by traditional songthaew is offered within 5 km of the Old City.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-2">
                  <div className="bg-surface-cream rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Price from</div>
                    <div className="text-sm font-semibold text-gray-800">1,000 THB</div>
                  </div>
                  <div className="bg-surface-cream rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Kitchen</div>
                    <div className="text-sm font-semibold text-gray-800">Outdoor + AC option</div>
                  </div>
                  <div className="bg-surface-cream rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Individual station</div>
                    <div className="text-sm font-semibold text-green-700">Yes</div>
                  </div>
                  <div className="bg-surface-cream rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Vegetarian class</div>
                    <div className="text-sm font-semibold text-green-700">Dedicated menu</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {topClasses.filter(tc => tc.citySlug === 'chiang-mai').slice(0, 3).map((tc, i) => (
                  <div key={tc.cls.slug} className="flex items-center gap-2 p-3 bg-surface-cream rounded-xl text-sm">
                    <span className="text-gray-400 font-bold">#{i+1}</span>
                    <span className="font-medium text-gray-800">{tc.cls.name}</span>
                    <StarRating rating={tc.cls.rating} />
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link href="/city/chiang-mai/cooking-classes/" className="inline-flex items-center text-thailand-red font-semibold hover:text-red-700">
                  See all Chiang Mai cooking classes &rarr;
                </Link>
              </div>
            </div>

            {/* ===== PHUKET ===== */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-lg font-bold text-white bg-thailand-blue w-8 h-8 rounded-xl flex items-center justify-center">3</span>
                <h2 className="text-2xl font-bold font-heading text-gray-900">
                  <Link href="/city/phuket/cooking-classes/" className="hover:text-thailand-blue">
                    Cooking Classes in Phuket
                  </Link>
                </h2>
              </div>
              <p className="text-gray-500 text-sm mb-4">Best for: combining a beach holiday with culinary learning, dedicated vegetarian courses, Blue Elephant second branch</p>

              <p className="text-gray-700 mb-6">
                Phuket&apos;s cooking class scene benefits from the island&apos;s Peranakan food heritage — a fusion of Thai and Chinese-Malay influences that produced dishes like mee hokkien and massaman curry (via southern trade routes). Classes here tend to cover southern Thai dishes alongside the national repertoire. Two schools offer consistently strong programmes.
              </p>

              {/* Phuket Thai Cooking Academy */}
              <div className="border border-gray-200 rounded-xl p-6 mb-6">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <h3 className="text-xl font-bold font-heading text-gray-900">Phuket Thai Cooking Academy</h3>
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">Dedicated vegan programme</span>
                </div>
                <p className="text-sm text-gray-500 mb-3">
                  Kathu, near Patong Beach &mdash;{' '}
                  <a href="https://phuketthaicookingacademy.com" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">phuketthaicookingacademy.com</a>
                </p>
                <p className="text-gray-700 mb-4">
                  Located near the Kathu waterfall, a few minutes from Patong, this school distinguishes itself in two ways: a genuine choose-your-own-menu format and one of the most comprehensive vegetarian programmes in Thailand. Standard half-day classes include a walk through the Kathu food market, where the instructor identifies and explains the full range of Thai herbs, pastes and vegetables before students select the four dishes they want to prepare.
                </p>
                <p className="text-gray-700 mb-4">
                  For vegetarians and vegans, the school has a dedicated menu and even offers a five-day professional vegan Thai cooking course — rare in a country where fermented shrimp paste and fish sauce underpin most sauces. Free hotel pickup is offered from Patong, Phuket Town and Kathu, with pickup from anywhere on the island for groups of three or more.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-2">
                  <div className="bg-surface-cream rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Menu style</div>
                    <div className="text-sm font-semibold text-gray-800">Choose your dishes</div>
                  </div>
                  <div className="bg-surface-cream rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Kitchen</div>
                    <div className="text-sm font-semibold text-gray-800">Air-conditioned</div>
                  </div>
                  <div className="bg-surface-cream rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Market visit</div>
                    <div className="text-sm font-semibold text-green-700">Yes (Kathu market)</div>
                  </div>
                  <div className="bg-surface-cream rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Vegetarian/Vegan</div>
                    <div className="text-sm font-semibold text-green-700">Dedicated programme</div>
                  </div>
                </div>
              </div>

              {/* Blue Elephant Phuket */}
              <div className="border border-gray-200 rounded-xl p-6 mb-6">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <h3 className="text-xl font-bold font-heading text-gray-900">Blue Elephant Cooking School Phuket</h3>
                  <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-3 py-1 rounded-full">Premium / Royal Thai cuisine</span>
                </div>
                <p className="text-sm text-gray-500 mb-3">
                  Phuket &mdash;{' '}
                  <a href="https://blueelephant.com/cooking-school/cooking-school-phuket/" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">blueelephant.com/cooking-school/cooking-school-phuket/</a>
                </p>
                <p className="text-gray-700 mb-4">
                  The Blue Elephant brand&apos;s second cooking school brings the same rigorous curriculum as its Bangkok counterpart to Phuket. Morning classes include a Thai market tour to hand-pick fresh ingredients; afternoon classes proceed directly to the kitchen. The focus is on Royal Thai cuisine — the refined palace cooking tradition that prioritises presentation, balance and technique over rustic speed. If you have already taken a basic Thai cooking class elsewhere, this is a logical step up.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-2">
                  <div className="bg-surface-cream rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Cuisine focus</div>
                    <div className="text-sm font-semibold text-gray-800">Royal Thai</div>
                  </div>
                  <div className="bg-surface-cream rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Duration</div>
                    <div className="text-sm font-semibold text-gray-800">Half-day</div>
                  </div>
                  <div className="bg-surface-cream rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Market visit</div>
                    <div className="text-sm font-semibold text-green-700">Yes (morning class)</div>
                  </div>
                  <div className="bg-surface-cream rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Level</div>
                    <div className="text-sm font-semibold text-gray-800">Beginner to advanced</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {topClasses.filter(tc => tc.citySlug === 'phuket').slice(0, 3).map((tc, i) => (
                  <div key={tc.cls.slug} className="flex items-center gap-2 p-3 bg-surface-cream rounded-xl text-sm">
                    <span className="text-gray-400 font-bold">#{i+1}</span>
                    <span className="font-medium text-gray-800">{tc.cls.name}</span>
                    <StarRating rating={tc.cls.rating} />
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link href="/city/phuket/cooking-classes/" className="inline-flex items-center text-thailand-red font-semibold hover:text-red-700">
                  See all Phuket cooking classes &rarr;
                </Link>
              </div>
            </div>

            {/* ===== KOH SAMUI ===== */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-lg font-bold text-white bg-thailand-blue w-8 h-8 rounded-xl flex items-center justify-center">4</span>
                <h2 className="text-2xl font-bold font-heading text-gray-900">
                  <Link href="/city/koh-samui/cooking-classes/" className="hover:text-thailand-blue">
                    Cooking Classes in Koh Samui
                  </Link>
                </h2>
              </div>
              <p className="text-gray-500 text-sm mb-4">Best for: small-group intimacy, sunset cooking, traditional charcoal technique</p>

              <p className="text-gray-700 mb-6">
                Koh Samui&apos;s cooking school scene is smaller than Bangkok or Chiang Mai, but the island compensates with atmosphere. Several classes take place in open-air garden kitchens where you cook surrounded by coconut palms and sea breezes. The island also has a strong southern Thai culinary identity — coconut milk appears in almost everything, and fresh turmeric (rather than dried) colours many dishes yellow.
              </p>

              {/* Jungle Kitchen */}
              <div className="border border-gray-200 rounded-xl p-6 mb-6">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <h3 className="text-xl font-bold font-heading text-gray-900">Jungle Kitchen Koh Samui</h3>
                  <span className="bg-orange-100 text-orange-800 text-xs font-semibold px-3 py-1 rounded-full">Traditional charcoal stoves — max 8 guests</span>
                </div>
                <p className="text-sm text-gray-500 mb-3">
                  151/68 Moo 1, Soi Khao Phra, Bo Phut (near Fisherman&apos;s Village), Koh Samui &mdash;{' '}
                  <a href="https://junglekitchensamui.com" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">junglekitchensamui.com</a>
                </p>
                <p className="text-gray-700 mb-4">
                  Jungle Kitchen, open since August 2019, offers one of the most distinctive cooking experiences on the island: an open-air kitchen on a hillside near Fisherman&apos;s Village in Bo Phut, with panoramic views of Koh Phangan across the water. Classes run strictly in the evening (5 pm to 9 pm), which means you cook in natural light that fades gradually into a sunset backdrop — and the school makes the most of the timing.
                </p>
                <p className="text-gray-700 mb-4">
                  What makes Jungle Kitchen unusual is its deliberate commitment to traditional technique: cooking happens on Thai charcoal stoves rather than gas burners, reproducing the flavour development that Thai home cooks have relied on for generations. Classes are capped at eight participants, and the school maintains an organic herb garden where you pick your own kaffir lime leaves, lemongrass and chilli before the session begins.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-2">
                  <div className="bg-surface-cream rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Time</div>
                    <div className="text-sm font-semibold text-gray-800">Evening only (5–9 pm)</div>
                  </div>
                  <div className="bg-surface-cream rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Group size</div>
                    <div className="text-sm font-semibold text-gray-800">Max 8 guests</div>
                  </div>
                  <div className="bg-surface-cream rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Herb garden</div>
                    <div className="text-sm font-semibold text-green-700">Yes, pick your own</div>
                  </div>
                  <div className="bg-surface-cream rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Cooking method</div>
                    <div className="text-sm font-semibold text-gray-800">Charcoal stoves</div>
                  </div>
                </div>
              </div>

              {/* Island Organics Samui */}
              <div className="border border-gray-200 rounded-xl p-6 mb-6">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <h3 className="text-xl font-bold font-heading text-gray-900">Island Organics Samui</h3>
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">TV-featured, established 2015</span>
                </div>
                <p className="text-sm text-gray-500 mb-3">
                  Koh Samui &mdash;{' '}
                  <a href="https://islandorganicssamui.com" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">islandorganicssamui.com</a>
                </p>
                <p className="text-gray-700 mb-4">
                  Operating since 2015 and described by its own website as &ldquo;Samui&apos;s leading and TV-featured Thai cooking classes&rdquo;, Island Organics Samui emphasises clean ingredients and organic sourcing. The organic focus is genuine rather than marketing: the curriculum teaches students to identify quality herbs by smell and texture, and to understand why fresh-pressed coconut cream behaves differently from the tinned variety.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-2">
                  <div className="bg-surface-cream rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Focus</div>
                    <div className="text-sm font-semibold text-gray-800">Organic ingredients</div>
                  </div>
                  <div className="bg-surface-cream rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Established</div>
                    <div className="text-sm font-semibold text-gray-800">2015</div>
                  </div>
                  <div className="bg-surface-cream rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Vegetarian</div>
                    <div className="text-sm font-semibold text-green-700">Yes, on request</div>
                  </div>
                  <div className="bg-surface-cream rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">TV-featured</div>
                    <div className="text-sm font-semibold text-gray-800">Yes</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {topClasses.filter(tc => tc.citySlug === 'koh-samui').slice(0, 3).map((tc, i) => (
                  <div key={tc.cls.slug} className="flex items-center gap-2 p-3 bg-surface-cream rounded-xl text-sm">
                    <span className="text-gray-400 font-bold">#{i+1}</span>
                    <span className="font-medium text-gray-800">{tc.cls.name}</span>
                    <StarRating rating={tc.cls.rating} />
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link href="/city/koh-samui/cooking-classes/" className="inline-flex items-center text-thailand-red font-semibold hover:text-red-700">
                  See all Koh Samui cooking classes &rarr;
                </Link>
              </div>
            </div>

            {/* ===== KRABI ===== */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-lg font-bold text-white bg-thailand-blue w-8 h-8 rounded-xl flex items-center justify-center">5</span>
                <h2 className="text-2xl font-bold font-heading text-gray-900">
                  <Link href="/city/krabi/cooking-classes/" className="hover:text-thailand-blue">
                    Cooking Classes in Krabi
                  </Link>
                </h2>
              </div>
              <p className="text-gray-500 text-sm mb-4">Best for: relaxed pace, Ao Nang convenience, morning market visits, southern Thai flavours</p>

              <p className="text-gray-700 mb-6">
                Krabi is a lower-pressure choice: fewer options than Chiang Mai, but the classes that exist are unhurried and run by local families with deep roots in southern Thai cooking. Ao Nang, the main tourist hub, is where most schools operate — meaning a class is easy to slot into an island-hopping itinerary. Southern Thai food skews spicier and more coconut-heavy than the central Thai dishes most visitors know, making Krabi classes a genuine education rather than a repeat of what you learned in Bangkok.
              </p>

              {/* Ya's Cookery School */}
              <div className="border border-gray-200 rounded-xl p-6 mb-6">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <h3 className="text-xl font-bold font-heading text-gray-900">Ya&apos;s Cookery School</h3>
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">Market tour + 5 dishes</span>
                </div>
                <p className="text-sm text-gray-500 mb-3">
                  Ao Nang, Krabi Province &mdash;{' '}
                  <a href="https://yacookeryschool.com" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">yacookeryschool.com</a>
                </p>
                <p className="text-gray-700 mb-4">
                  Ya&apos;s Cookery School is one of Krabi&apos;s most established cooking schools, with more than 17 years of continuous operation. The four-hour class format begins with a walk through Krabi&apos;s morning market — a practical, lively affair that is a world away from the sanitised tourist markets you might visit elsewhere. Your instructor identifies seasonal produce, explains southern Thai spice profiles and helps you select what you will cook.
                </p>
                <p className="text-gray-700 mb-4">
                  The curriculum runs to five dishes in a single session: spring rolls, pad Thai and pad krapow (stir-fried meat with holy basil) appear regularly on the menu. Morning and evening class times are available. Hotel pickup within Ao Nang is included in most bookings.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-2">
                  <div className="bg-surface-cream rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Duration</div>
                    <div className="text-sm font-semibold text-gray-800">~4 hours</div>
                  </div>
                  <div className="bg-surface-cream rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Dishes</div>
                    <div className="text-sm font-semibold text-gray-800">5 per session</div>
                  </div>
                  <div className="bg-surface-cream rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Market visit</div>
                    <div className="text-sm font-semibold text-green-700">Yes (Krabi market)</div>
                  </div>
                  <div className="bg-surface-cream rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Vegetarian</div>
                    <div className="text-sm font-semibold text-green-700">Yes, on request</div>
                  </div>
                </div>
              </div>

              {/* Thai Charm */}
              <div className="border border-gray-200 rounded-xl p-6 mb-6">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <h3 className="text-xl font-bold font-heading text-gray-900">Thai Charm Cooking School</h3>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">Ao Nang, open-air garden kitchen</span>
                </div>
                <p className="text-sm text-gray-500 mb-3">
                  Soi Khlong Jilad, Sai Thai, Mueang Krabi &mdash;{' '}
                  <a href="https://www.thaicharmcookingkrabiaonang.com" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">thaicharmcookingkrabiaonang.com</a>
                </p>
                <p className="text-gray-700 mb-4">
                  Thai Charm operates a more intimate, family-run class in a garden kitchen outside central Ao Nang. The teaching style is relaxed and personal: group sizes are kept deliberately small, and the instructor adjusts the pace to the group&apos;s experience level. The school is a good option for travellers who want a less structured atmosphere than the larger schools provide, while still learning authentic technique.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-2">
                  <div className="bg-surface-cream rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Style</div>
                    <div className="text-sm font-semibold text-gray-800">Family-run, small group</div>
                  </div>
                  <div className="bg-surface-cream rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Kitchen</div>
                    <div className="text-sm font-semibold text-gray-800">Open-air garden</div>
                  </div>
                  <div className="bg-surface-cream rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Vegetarian</div>
                    <div className="text-sm font-semibold text-green-700">Yes, on request</div>
                  </div>
                  <div className="bg-surface-cream rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1">Setting</div>
                    <div className="text-sm font-semibold text-gray-800">Garden, Ao Nang area</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {topClasses.filter(tc => tc.citySlug === 'krabi').slice(0, 3).map((tc, i) => (
                  <div key={tc.cls.slug} className="flex items-center gap-2 p-3 bg-surface-cream rounded-xl text-sm">
                    <span className="text-gray-400 font-bold">#{i+1}</span>
                    <span className="font-medium text-gray-800">{tc.cls.name}</span>
                    <StarRating rating={tc.cls.rating} />
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link href="/city/krabi/cooking-classes/" className="inline-flex items-center text-thailand-red font-semibold hover:text-red-700">
                  See all Krabi cooking classes &rarr;
                </Link>
              </div>
            </div>

            {/* What you will learn */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-12">
              <p className="section-label">Curriculum</p>
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">
                What Thai Cooking Classes Actually Teach You
              </h2>
              <p className="text-gray-700 mb-6">
                Most Thai cooking classes cover a structured set of dishes chosen to illustrate core techniques: curry paste grinding (the foundation of almost every Thai curry), stir-frying at high heat, hot-and-sour soup balance, and sticky-rice or coconut dessert preparation. Here are the dishes that appear most frequently:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {[
                  { slug: 'pad-thai', name: 'Pad Thai', note: 'Stir-frying, tamarind balance' },
                  { slug: 'green-curry', name: 'Green Curry', note: 'Paste-making, coconut technique' },
                  { slug: 'tom-yum-goong', name: 'Tom Yum Goong', note: 'UNESCO-listed dish, 2024' },
                  { slug: 'pad-krapow', name: 'Pad Krapow', note: 'Holy basil stir-fry' },
                  { slug: 'som-tam', name: 'Som Tam', note: 'Green papaya, mortar technique' },
                  { slug: 'massaman-curry', name: 'Massaman Curry', note: 'Southern Thai, slow-braised' },
                  { slug: 'pad-see-ew', name: 'Pad See Ew', note: 'Wide noodle, dark soy' },
                  { slug: 'thai-fried-rice', name: 'Thai Fried Rice', note: 'Wok control basics' },
                ].map((dish) => (
                  <Link
                    key={dish.slug}
                    href={`/food/${dish.slug}/`}
                    className="flex flex-col p-3 bg-surface-cream rounded-xl hover:bg-orange-50 hover:shadow-sm transition-all"
                  >
                    <span className="text-sm font-semibold text-gray-800 mb-1">{dish.name}</span>
                    <span className="text-xs text-gray-500">{dish.note}</span>
                  </Link>
                ))}
              </div>
              <p className="text-sm text-gray-600">
                Tom yum kung was inscribed on the UNESCO Intangible Cultural Heritage list in December 2024, reflecting the dish&apos;s deep cultural significance in Thai society. Source:{' '}
                <a href="https://ich.unesco.org/en/state/thailand-TH" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">UNESCO ICH Thailand</a>.
                Explore the full{' '}
                <Link href="/food/" className="text-thailand-blue hover:underline">Thai food guide</Link>.
              </p>
            </div>

            {/* CTA */}
            <div className="bg-surface-dark rounded-2xl p-8 mb-12 text-center text-white">
              <p className="font-script text-thailand-gold text-lg mb-2">Book Now</p>
              <h2 className="text-3xl font-bold font-heading mb-4">Ready to Book Your Thai Cooking Class?</h2>
              <p className="text-lg mb-6 opacity-90">
                Browse verified cooking classes across all five cities on these trusted booking platforms.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={GYG_AFFILIATE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3 bg-white text-thailand-red font-semibold rounded-xl hover:bg-gray-100 transition-colors"
                >
                  Browse on GetYourGuide
                </a>
                <a
                  href={KLOOK_AFFILIATE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3 bg-white/20 text-white font-semibold rounded-xl hover:bg-white/30 transition-colors border border-white/40"
                >
                  Browse on Klook
                </a>
              </div>
              <p className="text-xs text-white/70 mt-4">
                We may earn a commission when you book through our links, at no extra cost to you.
              </p>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-12">
              <p className="section-label">FAQ</p>
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {faqItems.map((item, i) => (
                  <div key={i} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                    <h3 className="text-lg font-semibold font-heading text-gray-900 mb-2">{item.q}</h3>
                    <p className="text-gray-700 leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Source note */}
            <div className="bg-surface-cream rounded-xl p-6 mb-8">
              <p className="text-sm text-gray-600 font-semibold mb-2">Sources &amp; Verification</p>
              <p className="text-sm text-gray-600">
                School details on this page were verified against official school websites and established booking platforms in early 2026.
                Websites cited: <a href="https://www.silomthaicooking.com" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">silomthaicooking.com</a>,{' '}
                <a href="https://blueelephant.com" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">blueelephant.com</a>,{' '}
                <a href="https://thaifarmcooking.com" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">thaifarmcooking.com</a>,{' '}
                <a href="https://www.asiascenic.com" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">asiascenic.com</a>,{' '}
                <a href="https://www.mamanoicookingschool.com" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">mamanoicookingschool.com</a>,{' '}
                <a href="https://phuketthaicookingacademy.com" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">phuketthaicookingacademy.com</a>,{' '}
                <a href="https://junglekitchensamui.com" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">junglekitchensamui.com</a>,{' '}
                <a href="https://islandorganicssamui.com" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">islandorganicssamui.com</a>,{' '}
                <a href="https://yacookeryschool.com" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">yacookeryschool.com</a>,{' '}
                <a href="https://www.thaicharmcookingkrabiaonang.com" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">thaicharmcookingkrabiaonang.com</a>.{' '}
                UNESCO tom yum kung inscription: <a href="https://ich.unesco.org/en/state/thailand-TH" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">ich.unesco.org</a>.
              </p>
            </div>

          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const index = getCookingClassesIndex();
  if (!index) return { notFound: true };

  const topClasses: { cityName: string; citySlug: string; cls: CookingClass }[] = [];

  index.cities.forEach((city: CityEntry) => {
    const data = getCookingClassesByCity(city.slug) as CityClasses | null;
    if (data) {
      data.classes.slice(0, 3).forEach((cls: CookingClass) => {
        topClasses.push({
          cityName: city.name.en,
          citySlug: city.slug,
          cls
        });
      });
    }
  });

  return {
    props: {
      cities: index.cities,
      topClasses
    },
    revalidate: 86400
  };
};
