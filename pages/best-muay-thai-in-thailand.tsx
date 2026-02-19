import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getMuayThaiIndex, getMuayThaiByCity } from '../lib/muay-thai';
import { formatPrice } from '../lib/price';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';

interface MuayThaiActivity {
  name: string;
  slug: string;
  type: 'watch' | 'train' | 'combo';
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
  classes: MuayThaiActivity[];
}

interface Props {
  cities: CityEntry[];
  topActivities: { cityName: string; citySlug: string; cls: MuayThaiActivity }[];
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

function TypeBadge({ type }: { type: string }) {
  const config: Record<string, { label: string; color: string }> = {
    watch: { label: 'Fights', color: 'bg-red-100 text-red-700' },
    train: { label: 'Training', color: 'bg-blue-100 text-blue-700' },
    combo: { label: 'Combo', color: 'bg-purple-100 text-purple-700' },
  };
  const { label, color } = config[type] || config.watch;
  return <span className={`text-xs font-semibold px-2 py-0.5 rounded ${color}`}>{label}</span>;
}

export default function BestMuayThaiPage({ cities, topActivities }: Props) {
  const { locale } = useRouter();
  const loc = locale || 'en';
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Best Muay Thai in Thailand', href: '/best-muay-thai-in-thailand/' }
  ];

  const title = 'Best Muay Thai in Thailand 2026 — Fights, Training & Gyms';
  const description = 'Compare Muay Thai fights, training camps and gyms in Bangkok, Chiang Mai and Phuket. Tickets from $13, 7 gyms reviewed and top stadium picks.';

  const faqItems = [
    {
      q: 'Where is the best place to watch Muay Thai in Thailand?',
      a: 'Bangkok is the ultimate destination for watching Muay Thai, home to the legendary Rajadamnern Stadium (since 1945) with 10,000+ reviews. Phuket\'s Patong Boxing Stadium is a close second with 2,000+ reviews and a vibrant atmosphere.'
    },
    {
      q: 'Can tourists train Muay Thai in Thailand?',
      a: 'Absolutely! All major cities offer beginner-friendly training sessions at professional gyms. Sessions typically cost EUR13-48 per class, last 1-2 hours, and all equipment is provided. No experience needed.'
    },
    {
      q: 'How much do Muay Thai fight tickets cost?',
      a: 'Fight tickets range from EUR16 in Chiang Mai to EUR56+ for VIP seats in Phuket. Bangkok\'s Rajadamnern Stadium offers tickets from EUR27. Ringside and VIP upgrades provide the best experience.'
    },
    {
      q: 'What is the difference between watching and training?',
      a: 'Watching means attending a live Muay Thai fight night with professional bouts — perfect for spectators. Training means you participate in a hands-on session at a gym, learning techniques from coaches. Some combo packages offer both.'
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

  return (
    <>
      <SEOHead title={title} description={description}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </SEOHead>

      <div className="bg-gray-50 min-h-screen">
        {/* Hero */}
        <section className="bg-gray-900 text-white">
          <div className="container-custom py-12">
            <Breadcrumbs items={breadcrumbs} />
            <div className="text-center mt-6">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Best Muay Thai in Thailand
              </h1>
              <p className="text-xl max-w-3xl mx-auto text-gray-300">
                From Bangkok&apos;s legendary Rajadamnern Stadium to Phuket&apos;s world-class training camps — compare fights, training, and combo experiences across Thailand&apos;s top destinations.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            {/* Quick Comparison Table */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
              <h2 className="text-2xl font-bold text-gray-900 p-6 pb-0">
                City Comparison at a Glance
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">City</th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">Activities</th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">Price Range</th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">Best For</th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {cities.map((city) => (
                      <tr key={city.slug} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <Link href={`/city/${city.slug}/muay-thai/`} className="font-semibold text-red-600 hover:underline">
                            {city.name.en}
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-gray-700">{city.classCount}+</td>
                        <td className="px-6 py-4 text-gray-700">
                          {formatPrice(city.priceRange.from, loc)} - {formatPrice(city.priceRange.to, loc)}
                        </td>
                        <td className="px-6 py-4 text-gray-600 text-sm">{city.highlight.en.split('.')[0]}</td>
                        <td className="px-6 py-4">
                          <Link
                            href={`/city/${city.slug}/muay-thai/`}
                            className="text-sm font-semibold text-red-500 hover:text-red-600"
                          >
                            View all &rarr;
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* City Sections */}
            {cities.map((city, index) => (
              <div key={city.slug} className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-lg font-bold text-white bg-red-600 w-8 h-8 rounded-full flex items-center justify-center">
                    {index + 1}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900">
                    <Link href={`/city/${city.slug}/muay-thai/`} className="hover:text-red-600">
                      Muay Thai in {city.name.en}
                    </Link>
                  </h2>
                </div>
                <p className="text-gray-700 mb-4">{city.highlight.en}</p>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-gray-900">{city.classCount}+</div>
                    <div className="text-xs text-gray-600">Activities</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-gray-900">
                      {formatPrice(city.priceRange.from, loc)}+
                    </div>
                    <div className="text-xs text-gray-600">Starting Price</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-gray-900">{city.topRating}</div>
                    <div className="text-xs text-gray-600">Top Rating</div>
                  </div>
                </div>

                {/* Top 3 activities for this city */}
                <div className="space-y-3 mb-6">
                  {topActivities
                    .filter(tc => tc.citySlug === city.slug)
                    .slice(0, 3)
                    .map((tc, i) => (
                      <div key={tc.cls.slug} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-gray-400">#{i + 1}</span>
                          <div>
                            <div className="font-medium text-gray-900 text-sm flex items-center gap-2">
                              {tc.cls.name}
                              <TypeBadge type={tc.cls.type} />
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              {tc.cls.rating > 0 && (
                                <>
                                  <StarRating rating={tc.cls.rating} />
                                  <span>{tc.cls.rating}</span>
                                  {tc.cls.reviews > 0 && <span>({tc.cls.reviews.toLocaleString()})</span>}
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-gray-900">{formatPrice(tc.cls.priceFrom, loc)}</div>
                        </div>
                      </div>
                    ))}
                </div>

                <Link
                  href={`/city/${city.slug}/muay-thai/`}
                  className="inline-flex items-center text-red-500 font-semibold hover:text-red-600"
                >
                  See all {city.classCount} activities in {city.name.en} &rarr;
                </Link>
              </div>
            ))}

            {/* Best Training Gyms */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Best Muay Thai Training Gyms in Southern Thailand
              </h2>
              <p className="text-gray-600 mb-6">
                Looking to train seriously? These 7 gyms were independently reviewed and scored on facilities, cleanliness, class structure, and coaching quality (max 20 points). Whether you&apos;re a beginner or experienced fighter, these are the best places to train in the south.
              </p>
              <div className="space-y-4">
                {[
                  {
                    name: 'Yakyai Muay Thai',
                    location: 'Chalong, Phuket',
                    score: 19,
                    scores: { facilities: 5, cleanliness: 5, classStructure: 5, coachingQuality: 4 },
                    highlight: 'American-owned with all-Thai coaches. Old school martial arts vibe on the \'fittest street in the world\' in Chalong. Welcoming atmosphere, great for beginners and experienced fighters alike.',
                    features: ['All-Thai coaches', 'Beginner-friendly', 'Private lessons available'],
                    dtvVisa: false,
                    citySlug: 'phuket'
                  },
                  {
                    name: 'Diamond Muay Thai',
                    location: 'Koh Phangan',
                    score: 18.5,
                    scores: { facilities: 5, cleanliness: 4.5, classStructure: 5, coachingQuality: 4 },
                    highlight: 'Family-run gym with bungalows on-site. Excellent clinch work and creative drills. The coaches live at the gym creating a true community atmosphere. May offer DTV (Muay Thai) visa.',
                    features: ['On-site bungalows', 'Great clinch training', 'Community vibe'],
                    dtvVisa: true,
                    citySlug: null
                  },
                  {
                    name: 'Lanta Muay Thai',
                    location: 'Koh Lanta',
                    score: 18,
                    scores: { facilities: 4, cleanliness: 4, classStructure: 5, coachingQuality: 5 },
                    highlight: 'Traditional Muay Thai — coaches will correct your kickboxing habits and teach you proper technique. The kind of gym that humbles you and makes you better. Tucked away from Koh Lanta\'s main street.',
                    features: ['Traditional technique focus', 'Private lessons available', 'Quiet location'],
                    dtvVisa: false,
                    citySlug: null
                  },
                  {
                    name: 'Kubird Muay Thai',
                    location: 'Phuket',
                    score: 18,
                    scores: { facilities: 4, cleanliness: 4, classStructure: 5, coachingQuality: 5 },
                    highlight: 'Private-lesson-only gym. Coach Kubird also teaches Muay Boran (the ancient art that birthed Muay Thai). Extremely thorough — focuses on fight IQ, movement, and reading opponents. YouTube: Mohawks and Muay Thai.',
                    features: ['Private lessons only', 'Muay Boran classes', 'Fight IQ training'],
                    dtvVisa: false,
                    citySlug: 'phuket'
                  },
                  {
                    name: 'Lamay Muay Thai',
                    location: 'Koh Samui',
                    score: 18,
                    scores: { facilities: 5, cleanliness: 4, classStructure: 5, coachingQuality: 4 },
                    highlight: 'Well-established gym that produces real fighters. 7-8 coaches for 30-40 students — they watch from all corners and correct mistakes. Great repetition of basics with clear explanations. May offer DTV visa.',
                    features: ['Produces fighters', 'On-site accommodation', 'High coach-to-student ratio'],
                    dtvVisa: true,
                    citySlug: null
                  },
                  {
                    name: 'Kunik Muay Thai',
                    location: 'Ao Nang, Krabi',
                    score: 17,
                    scores: { facilities: 5, cleanliness: 5, classStructure: 3, coachingQuality: 4 },
                    highlight: 'Stunning 4-story compound overlooking mountains, sea, and islands. Beautiful hostel, cafe, and pro shop. They hold a monthly beach training session at sunset — shadow boxing and drills on the sand.',
                    features: ['Stunning views', 'On-site hostel & cafe', 'Monthly beach sessions'],
                    dtvVisa: false,
                    citySlug: null
                  },
                  {
                    name: 'Dragon Muay Thai',
                    location: 'Chalong, Phuket',
                    score: 16,
                    scores: { facilities: 4, cleanliness: 3.5, classStructure: 3.5, coachingQuality: 5 },
                    highlight: 'Cool outdoor gym near Tiger Muay Thai with awesome wall artwork. Private lessons are recommended here — coaching quality is exceptional with personalized combinations and setups. Shares building with Tiwis Striking boxing gym.',
                    features: ['Near Tiger Muay Thai', 'Private lessons recommended', 'Cool atmosphere'],
                    dtvVisa: false,
                    citySlug: 'phuket'
                  }
                ].map((gym, index) => (
                  <div key={gym.name} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex flex-col items-center min-w-[56px]">
                      <div className="text-2xl font-bold text-yellow-600">{gym.score}</div>
                      <div className="text-[10px] text-gray-500">/20</div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold text-gray-400">#{index + 1}</span>
                        <h3 className="font-bold text-gray-900">{gym.name}</h3>
                        {gym.dtvVisa && (
                          <span className="text-[10px] font-semibold text-green-700 bg-green-100 px-1.5 py-0.5 rounded">
                            DTV Visa
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 mb-1">{gym.location}</div>
                      <p className="text-sm text-gray-700 mb-2">{gym.highlight}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {gym.features.map((f, i) => (
                          <span key={i} className="text-[10px] bg-white text-gray-600 px-1.5 py-0.5 rounded border border-gray-200">{f}</span>
                        ))}
                        <span className="text-[10px] text-gray-400 ml-1">
                          Facilities {gym.scores.facilities} &middot; Clean {gym.scores.cleanliness} &middot; Structure {gym.scores.classStructure} &middot; Coaching {gym.scores.coachingQuality}
                        </span>
                      </div>
                    </div>
                    {gym.citySlug && (
                      <Link href={`/city/${gym.citySlug}/muay-thai/`} className="text-xs text-red-500 hover:text-red-600 font-semibold whitespace-nowrap self-center">
                        View &rarr;
                      </Link>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-gray-700">
                  <strong>DTV Visa tip:</strong> If you&apos;re planning a longer training stay, check if your chosen gym can sponsor a 6 or 12 month DTV (Destination Thailand Visa) for Muay Thai training. Lamay Muay Thai and Diamond Muay Thai are known to offer this.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-red-600 to-gray-900 rounded-lg p-8 mb-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Ready to Experience Muay Thai?</h2>
              <p className="text-lg mb-6 opacity-90">
                Browse Muay Thai fights, training sessions, and combo packages across Thailand.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={GYG_AFFILIATE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Browse on GetYourGuide
                </a>
                <a
                  href={KLOOK_AFFILIATE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/30 transition-colors border border-white/40"
                >
                  Browse on Klook
                </a>
              </div>
              <p className="text-xs text-white/70 mt-4">
                We may earn a commission when you book through our links, at no extra cost to you.
              </p>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {faqItems.map((item, i) => (
                  <div key={i}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.q}</h3>
                    <p className="text-gray-700">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const index = getMuayThaiIndex();
  if (!index) return { notFound: true };

  const topActivities: { cityName: string; citySlug: string; cls: MuayThaiActivity }[] = [];

  index.cities.forEach((city: CityEntry) => {
    const data = getMuayThaiByCity(city.slug) as CityClasses | null;
    if (data) {
      data.classes.slice(0, 3).forEach((cls: MuayThaiActivity) => {
        topActivities.push({
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
      topActivities
    },
    revalidate: 86400
  };
};
