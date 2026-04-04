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
  const isNl = locale === 'nl';
  const lang = isNl ? 'nl' : 'en';
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: isNl ? 'Beste Muay Thai in Thailand' : 'Best Muay Thai in Thailand', href: '/best-muay-thai-in-thailand/' }
  ];

  const title = isNl
    ? 'Beste Muay Thai in Thailand 2026 — Stadions, Trainingscentra & Sportscholen'
    : 'Best Muay Thai in Thailand 2026 — Stadiums, Training Camps & Gyms';
  const description = isNl
    ? 'De complete gids voor Muay Thai in Thailand: Rajadamnern en Lumpinee stadions in Bangkok, Tiger Muay Thai in Phuket, Lanna Muay Thai in Chiang Mai. Geschiedenis, trainingstips en kaartjes.'
    : 'The complete guide to Muay Thai in Thailand: Rajadamnern and Lumpinee stadiums in Bangkok, Tiger Muay Thai in Phuket, Lanna Muay Thai in Chiang Mai. History, training tips, and fight tickets.';

  const faqItems = isNl ? [
    {
      q: 'Waar is de beste plek om Muay Thai te kijken in Thailand?',
      a: 'Bangkok is de ultieme bestemming, met het legendarische Rajadamnern Stadium (geopend 1945) — Thailand\'s oudste opererende Muay Thai arena — en Lumpinee Stadium, algemeen beschouwd als het meest prestigieuze ter wereld. Phuket\'s Bangla Boxing Stadium biedt een even elektrische sfeer voor toeristen in het zuiden.'
    },
    {
      q: 'Kunnen toeristen Muay Thai trainen in Thailand?',
      a: 'Ja. Alle grote steden bieden beginnersvriendelijke trainingssessies bij professionele sportscholen. Tiger Muay Thai in Phuket heeft 20+ lessen dagelijks vanaf 500 baht per sessie. In Chiang Mai verwelkomen Lanna Muay Thai en Dang Muay Thai alle niveaus. Sessies duren doorgaans 1,5–2,5 uur en alle uitrusting wordt verstrekt.'
    },
    {
      q: 'Hoeveel kosten Muay Thai gevechtstickets?',
      a: 'Gevechtstickets variëren van ongeveer EUR16 in Chiang Mai tot EUR56+ voor VIP ringzijplaatsen in Bangkok of Phuket. Rajadamnern Stadium biedt tickets vanaf EUR27. Ringzijplaatsen geven het beste uitzicht en sfeer maar zijn snel uitverkocht — boek vooruit.'
    },
    {
      q: 'Wat is de geschiedenis van Muay Thai?',
      a: 'Muay Thai is geëvolueerd uit Muay Boran, een gevechtssysteem op het slagveld dat werd gebruikt door Siamese legers sinds minstens het 13e-eeuwse Sukhothai Koninkrijk. De beroemdste legende is Nai Khanom Tom, een Thaise gevangene die 9–10 Birmese vechters achtereenvolgens versloeg in 1774. Modern gecodificeerd Muay Thai met regels en handschoenen ontstond onder Koning Rama VII in de jaren 1920–30. In 2024 heeft Thailand Muay Thai formeel voorgedragen voor UNESCO immaterieel cultureel erfgoed.'
    },
    {
      q: 'Wat is het verschil tussen Muay Thai kijken en trainen?',
      a: 'Kijken betekent een live gevechtsavond bijwonen met professionele wedstrijden — perfect voor toeschouwers die de sfeer, gokcultuur en traditionele muziek willen ervaren. Trainen betekent dat je deelneemt aan een hands-on sessie in een sportschool, waarbij je de acht ledematen (vuisten, ellebogen, knieën, trappen) leert van professionele coaches. Combopakketten combineren beide op één dag.'
    }
  ] : [
    {
      q: 'Where is the best place to watch Muay Thai in Thailand?',
      a: 'Bangkok is the ultimate destination, home to the legendary Rajadamnern Stadium (opened 1945) — Thailand\'s oldest operating Muay Thai arena — and Lumpinee Stadium, widely regarded as the most prestigious in the world. Phuket\'s Bangla Boxing Stadium offers an equally electric atmosphere for tourists visiting the south.'
    },
    {
      q: 'Can tourists train Muay Thai in Thailand?',
      a: 'Yes. All major cities offer beginner-friendly training sessions at professional gyms. Tiger Muay Thai in Phuket runs 20+ classes daily from 500 baht per session. In Chiang Mai, Lanna Muay Thai and Dang Muay Thai welcome all skill levels. Sessions typically last 1.5–2.5 hours and all equipment is provided.'
    },
    {
      q: 'How much do Muay Thai fight tickets cost?',
      a: 'Fight tickets range from around EUR16 in Chiang Mai to EUR56+ for VIP ringside seats in Bangkok or Phuket. Rajadamnern Stadium offers tickets from EUR27. Ringside seats give the best view and atmosphere but fill up fast — book ahead.'
    },
    {
      q: 'What is the history of Muay Thai?',
      a: 'Muay Thai evolved from Muay Boran, a battlefield combat system used by Siamese armies from at least the 13th century Sukhothai Kingdom. Its most famous legend is Nai Khanom Tom, a Thai prisoner who defeated 9–10 Burmese fighters in succession in 1774, earning his freedom. Modern codified Muay Thai with rules and gloves emerged under King Rama VII in the 1920s–30s. In 2024, Thailand formally submitted Muay Thai for UNESCO intangible cultural heritage inscription.'
    },
    {
      q: 'What is the difference between watching and training Muay Thai?',
      a: 'Watching means attending a live fight night with professional bouts — perfect for spectators wanting to experience the atmosphere, gambling culture, and traditional music. Training means you participate in a hands-on session at a gym, learning the eight limbs (fists, elbows, knees, kicks) from professional coaches. Combo packages combine both in one day.'
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

      <div className="bg-surface-cream min-h-screen">
        {/* Hero */}
        <section className="bg-surface-dark text-white">
          <div className="container-custom py-12">
            <Breadcrumbs items={breadcrumbs} />
            <div className="text-center mt-6">
              <p className="font-script text-thailand-gold text-lg mb-2">{isNl ? 'De Kunst van Acht Ledematen' : 'The Art of Eight Limbs'}</p>
              <h1 className="text-4xl lg:text-5xl font-bold font-heading mb-4">
                {isNl ? 'Beste Muay Thai in Thailand' : 'Best Muay Thai in Thailand'}
              </h1>
              <p className="text-xl max-w-3xl mx-auto text-gray-300">
                {isNl
                  ? 'Van Bangkok\'s legendarische Rajadamnern Stadium tot Phuket\'s Tiger Muay Thai — Thailand\'s nationale sport vindt zijn oorsprong in oud slagveldgevecht. Hier is alles wat je moet weten over kijken en trainen.'
                  : 'From Bangkok\'s legendary Rajadamnern Stadium to Phuket\'s Tiger Muay Thai — Thailand\'s national sport traces its roots to ancient battlefield combat. Here\'s everything you need to know about watching and training.'}
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">
            {/* Quick Comparison Table */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-12">
              <p className="section-label px-6 pt-6">{isNl ? 'Vergelijk' : 'Compare'}</p>
              <h2 className="text-2xl font-bold font-heading text-gray-900 p-6 pb-0">
                {isNl ? 'Steden Vergelijking in een Oogopslag' : 'City Comparison at a Glance'}
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-surface-cream">
                    <tr>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">{isNl ? 'Stad' : 'City'}</th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">{isNl ? 'Activiteiten' : 'Activities'}</th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">{isNl ? 'Prijsklasse' : 'Price Range'}</th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600">{isNl ? 'Beste Voor' : 'Best For'}</th>
                      <th className="px-6 py-4 text-sm font-semibold text-gray-600"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {cities.map((city) => (
                      <tr key={city.slug} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <Link href={`/city/${city.slug}/muay-thai/`} className="font-semibold text-thailand-red hover:underline">
                            {city.name[lang] || city.name.en}
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-gray-700">{city.classCount}+</td>
                        <td className="px-6 py-4 text-gray-700">
                          {formatPrice(city.priceRange.from, loc)} - {formatPrice(city.priceRange.to, loc)}
                        </td>
                        <td className="px-6 py-4 text-gray-600 text-sm">{(city.highlight[lang] || city.highlight.en).split('.')[0]}</td>
                        <td className="px-6 py-4">
                          <Link
                            href={`/city/${city.slug}/muay-thai/`}
                            className="text-sm font-semibold text-thailand-red hover:text-red-700"
                          >
                            {isNl ? 'Bekijk alle' : 'View all'} &rarr;
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
              <div key={city.slug} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-8 mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-lg font-bold text-white bg-thailand-red w-8 h-8 rounded-xl flex items-center justify-center">
                    {index + 1}
                  </span>
                  <h2 className="text-2xl font-bold font-heading text-gray-900">
                    <Link href={`/city/${city.slug}/muay-thai/`} className="hover:text-thailand-red">
                      Muay Thai in {city.name[lang] || city.name.en}
                    </Link>
                  </h2>
                </div>
                <p className="text-gray-700 mb-4">{city.highlight[lang] || city.highlight.en}</p>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-surface-cream rounded-xl p-3 text-center">
                    <div className="text-lg font-bold text-gray-900">{city.classCount}+</div>
                    <div className="text-xs text-gray-600">{isNl ? 'Activiteiten' : 'Activities'}</div>
                  </div>
                  <div className="bg-surface-cream rounded-xl p-3 text-center">
                    <div className="text-lg font-bold text-gray-900">
                      {formatPrice(city.priceRange.from, loc)}+
                    </div>
                    <div className="text-xs text-gray-600">{isNl ? 'Vanafprijs' : 'Starting Price'}</div>
                  </div>
                  <div className="bg-surface-cream rounded-xl p-3 text-center">
                    <div className="text-lg font-bold text-gray-900">{city.topRating}</div>
                    <div className="text-xs text-gray-600">{isNl ? 'Hoogste Beoordeling' : 'Top Rating'}</div>
                  </div>
                </div>

                {/* Top 3 activities for this city */}
                <div className="space-y-3 mb-6">
                  {topActivities
                    .filter(tc => tc.citySlug === city.slug)
                    .slice(0, 3)
                    .map((tc, i) => (
                      <div key={tc.cls.slug} className="flex items-center justify-between p-3 bg-surface-cream rounded-xl">
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
                  className="inline-flex items-center text-thailand-red font-semibold hover:text-red-700"
                >
                  {isNl ? `Bekijk alle ${city.classCount} activiteiten in ${city.name.nl || city.name.en}` : `See all ${city.classCount} activities in ${city.name.en}`} &rarr;
                </Link>
              </div>
            ))}

            {/* History & Context */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
              <p className="section-label">{isNl ? 'Geschiedenis' : 'History'}</p>
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">
                {isNl ? 'Van Oud Slagveld tot Nationale Sport' : 'From Ancient Battlefield to National Sport'}
              </h2>
              <div className="prose prose-gray max-w-none text-gray-700 space-y-4">
                <p>
                  {isNl
                    ? <>Muay Thai — de &quot;Kunst van Acht Ledematen&quot; — is ontstaan uit <strong>Muay Boran</strong>, een close-combatsysteem dat werd gebruikt door Siamese legers vanaf ten minste het 13e-eeuwse Sukhothai-koninkrijk. Soldaten die hun wapens verloren in de strijd vielen terug op hun vuisten, ellebogen, knieën en schenen. Dit overlevingssysteem werd verfijnd gedurende eeuwen van conflict met Birmese, Cambodjaanse en Laotiaanse koninkrijken.</>
                    : <>Muay Thai — the &quot;Art of Eight Limbs&quot; — evolved from <strong>Muay Boran</strong>, a close-combat system used by Siamese armies from at least the 13th century Sukhothai Kingdom. Soldiers who lost their weapons in battle fell back on their fists, elbows, knees, and shins. This survival system was refined over centuries of conflict with Burmese, Cambodian, and Lao kingdoms.</>}
                </p>
                <p>
                  {isNl
                    ? <>De meest gevierde figuur in de Muay Thai-folklore is <strong>Nai Khanom Tom</strong>, een vechter die gevangen werd genomen door Birmese troepen na de val van Ayutthaya in 1767. In 1774, tijdens een koninklijke viering in Rangoon, werd hij bevolen om tegen Birmese boksers te vechten. Naar verluidt versloeg hij negen of tien vechters achter elkaar zonder pauze — een prestatie die hem zijn vrijheid opleverde. Elk jaar op <strong>17 maart</strong> viert Thailand Nai Khanom Tom Day ter ere van hem. Hij blijft de symbolische &quot;Vader van Muay Thai.&quot;</>
                    : <>The most celebrated figure in Muay Thai folklore is <strong>Nai Khanom Tom</strong>, a fighter captured by Burmese forces after the fall of Ayutthaya in 1767. In 1774, at a royal celebration in Rangoon, he was ordered to fight Burmese boxers. He reportedly defeated nine or ten fighters in succession without pause — a feat that earned him his freedom. Every year on <strong>March 17</strong>, Thailand observes Nai Khanom Tom Day in his honour. He remains the symbolic &quot;Father of Muay Thai.&quot;</>}
                </p>
                <p>
                  {isNl
                    ? <>Muay Thai in zijn moderne, gecodificeerde vorm — met handschoenen, rondes en een scheidsrechter — ontstond onder <strong>Koning Rama VII</strong> in de jaren 1920 en 1930. Rajadamnern Stadium opende in <strong>1945</strong> als Thailand&apos;s eerste permanente Muay Thai-arena. Lumpinee Stadium volgde in <strong>1956</strong> en werd al snel de meest prestigieuze locatie van de sport. Beide zijn tot op de dag van vandaag in gebruik.</>
                    : <>Muay Thai in its modern codified form — with gloves, rounds, and a referee — emerged under <strong>King Rama VII</strong> in the 1920s and 1930s. Rajadamnern Stadium opened in <strong>1945</strong> as Thailand&apos;s first permanent Muay Thai arena. Lumpinee Stadium followed in <strong>1956</strong> and quickly became the sport&apos;s most prestigious venue. Both operate to this day.</>}
                </p>
                <p>
                  In 2024, Thailand formally proposed Muay Thai for <strong>UNESCO&apos;s Representative List of the Intangible Cultural Heritage of Humanity</strong> — recognition that would place it alongside Songkran (already inscribed in 2023) as a protected piece of Thai cultural identity.
                </p>
              </div>
            </div>

            {/* Landmark Stadiums & Gyms */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
              <p className="section-label">{isNl ? 'Belangrijke Locaties' : 'Must-Know Venues'}</p>
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">
                {isNl ? 'Legendarische Stadions & Grote Trainingscentra' : 'Legendary Stadiums & Major Training Camps'}
              </h2>
              <div className="space-y-6">
                {[
                  {
                    name: 'Rajadamnern Stadium',
                    location: 'Bangkok (Rattanakosin, near Democracy Monument)',
                    type: 'Fights',
                    typeColor: 'bg-red-100 text-red-700',
                    description: 'Opened in 1945, Rajadamnern is Thailand\'s oldest operating Muay Thai stadium and one of only two arenas that can grant the official Rajadamnern Championship belt. The atmosphere — traditional sarama music, bookmakers gesturing through the crowd, packed standing sections — is unlike anything in sport. Fight nights run on Mondays, Wednesdays, Thursdays, and Sundays.',
                    highlights: ['Oldest stadium in Thailand (1945)', 'Official championship belt fights', 'Mon / Wed / Thu / Sun fight nights'],
                  },
                  {
                    name: 'Lumpinee Boxing Stadium',
                    location: 'Bangkok (Ram Intra Road, north of city centre)',
                    type: 'Fights',
                    typeColor: 'bg-red-100 text-red-700',
                    description: 'Established in 1956 and relocated to a modern air-conditioned arena in 2014, Lumpinee is widely regarded as the most prestigious Muay Thai stadium in the world. A Lumpinee belt is the sport\'s highest honour. The army-operated stadium runs fights on Tuesdays and Fridays.',
                    highlights: ['Most prestigious stadium in the world', 'Army-run, belt fights', 'Modern arena since 2014'],
                  },
                  {
                    name: 'Tiger Muay Thai',
                    location: 'Soi Ta-Iad, Chalong, Phuket',
                    type: 'Training',
                    typeColor: 'bg-blue-100 text-blue-700',
                    description: 'Founded in 2003, Tiger Muay Thai has grown into one of the largest Muay Thai and MMA training facilities in Southeast Asia. Spanning over 9,600 m², the camp has 12 rings, a full MMA cage, 40+ trainers, and runs 25+ classes daily Monday to Saturday (6:30 am – 7:00 pm). Classes cover Muay Thai at all levels, MMA, BJJ, boxing, yoga, and Muay Boran. A single 2.5-hour class costs 500 baht; a monthly training pass runs 14,000 baht.',
                    highlights: ['9,600 m² facility, 12 rings', '25+ classes per day, all levels', '500 baht/class | 14,000 baht/month'],
                  },
                  {
                    name: 'Lanna Muay Thai (Kiat Busaba)',
                    location: 'Mae Rim area, Chiang Mai',
                    type: 'Training',
                    typeColor: 'bg-blue-100 text-blue-700',
                    description: 'One of Chiang Mai\'s most respected and established camps with over 30 years of history. Lanna (also known as Kiat Busaba) offers an authentic training experience in a natural mountain setting south of the old city. Highly regarded for producing regional champions. Weekly packages from 6,000 baht include accommodation options.',
                    highlights: ['30+ years of history', 'Authentic camp atmosphere', 'From 6,000 baht/week'],
                  },
                  {
                    name: 'Dang Muay Thai',
                    location: 'Chiang Mai Old City',
                    type: 'Training',
                    typeColor: 'bg-blue-100 text-blue-700',
                    description: 'The highest-rated Muay Thai gym in Chiang Mai with 2,700+ five-star Google reviews. Located in the heart of the old town, Dang Muay Thai offers a modern 9,000 sq ft facility with structured classes for all levels — ideal for travellers who want quality coaching without commuting outside the city.',
                    highlights: ['2,700+ five-star reviews', 'Central old city location', 'Modern 9,000 sq ft facility'],
                  },
                ].map((venue) => (
                  <div key={venue.name} className="flex gap-4 p-4 bg-surface-cream rounded-xl">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-bold font-heading text-gray-900">{venue.name}</h3>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded ${venue.typeColor}`}>{venue.type}</span>
                      </div>
                      <div className="text-xs text-gray-500 mb-2">{venue.location}</div>
                      <p className="text-sm text-gray-700 mb-3">{venue.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {venue.highlights.map((h, i) => (
                          <span key={i} className="text-[11px] bg-white text-gray-600 px-2 py-0.5 rounded-full shadow-sm">{h}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Best Training Gyms */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-8">
              <p className="section-label">{isNl ? 'Training' : 'Training'}</p>
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-2">
                {isNl ? 'Beste Muay Thai Trainingscentra in Zuid-Thailand' : 'Best Muay Thai Training Gyms in Southern Thailand'}
              </h2>
              <p className="text-gray-600 mb-6">
                {isNl
                  ? 'Serieus willen trainen? Deze 7 sportscholen zijn onafhankelijk beoordeeld op faciliteiten, netheid, lesstructuur en coachingkwaliteit (max 20 punten). Of je nu beginner of ervaren vechter bent, dit zijn de beste plekken om te trainen in het zuiden.'
                  : 'Looking to train seriously? These 7 gyms were independently reviewed and scored on facilities, cleanliness, class structure, and coaching quality (max 20 points). Whether you\'re a beginner or experienced fighter, these are the best places to train in the south.'}
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
                  <div key={gym.name} className="flex items-start gap-4 p-4 bg-surface-cream rounded-xl">
                    <div className="flex flex-col items-center min-w-[56px]">
                      <div className="text-2xl font-bold text-yellow-600">{gym.score}</div>
                      <div className="text-[10px] text-gray-500">/20</div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold text-gray-400">#{index + 1}</span>
                        <h3 className="font-bold font-heading text-gray-900">{gym.name}</h3>
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
                          <span key={i} className="text-[10px] bg-white text-gray-600 px-1.5 py-0.5 rounded-full border-0 shadow-sm">{f}</span>
                        ))}
                        <span className="text-[10px] text-gray-400 ml-1">
                          Facilities {gym.scores.facilities} &middot; Clean {gym.scores.cleanliness} &middot; Structure {gym.scores.classStructure} &middot; Coaching {gym.scores.coachingQuality}
                        </span>
                      </div>
                    </div>
                    {gym.citySlug && (
                      <Link href={`/city/${gym.citySlug}/muay-thai/`} className="text-xs text-thailand-red hover:text-red-700 font-semibold whitespace-nowrap self-center">
                        View &rarr;
                      </Link>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-yellow-50 rounded-xl border-0">
                <p className="text-sm text-gray-700">
                  <strong>DTV Visa tip:</strong> If you&apos;re planning a longer training stay, check if your chosen gym can sponsor a 6 or 12 month DTV (Destination Thailand Visa) for Muay Thai training. Lamay Muay Thai and Diamond Muay Thai are known to offer this.
                </p>
              </div>
            </div>

            {/* Insurance warning */}
            <div className="bg-red-50 rounded-2xl p-6 mb-12 border border-red-200">
              <h3 className="font-bold text-red-900 mb-2">{isNl ? 'Verzekeringswaarschuwing voor Muay Thai' : 'Insurance Warning for Muay Thai'}</h3>
              <p className="text-sm text-red-800 mb-3">
                {isNl
                  ? 'De meeste reisverzekeringen sluiten vechtsporten uit. SafetyWing\'s polisvoorwaarden vermelden vechtsporten als uitgesloten activiteiten. Als training of vechten deel uitmaakt van je reis, vraag dan schriftelijke bevestiging van de verzekeraar voordat je koopt.'
                  : 'Most travel insurance policies exclude martial arts. SafetyWing\'s Description of Coverage lists martial arts among excluded activities. If training or fighting is part of your trip, get written confirmation from the insurer before you buy.'}
              </p>
              <Link href="/travel-insurance-thailand/" className="text-sm font-semibold text-thailand-blue hover:underline">
                {isNl ? 'Vergelijk reisverzekeringen voor Thailand →' : 'Compare travel insurance for Thailand →'}
              </Link>
            </div>

            {/* CTA */}
            <div className="bg-surface-dark rounded-2xl p-8 mb-12 text-center text-white">
              <p className="font-script text-thailand-gold text-lg mb-2">{isNl ? 'Gevechtsavond' : 'Fight Night'}</p>
              <h2 className="text-3xl font-bold font-heading mb-4">{isNl ? 'Klaar om Muay Thai te Ervaren?' : 'Ready to Experience Muay Thai?'}</h2>
              <p className="text-lg mb-6 opacity-90">
                {isNl ? 'Bekijk Muay Thai gevechten, trainingen en combopakketten door heel Thailand.' : 'Browse Muay Thai fights, training sessions, and combo packages across Thailand.'}
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
                {isNl ? 'We kunnen een commissie ontvangen wanneer je boekt via onze links, zonder extra kosten voor jou.' : 'We may earn a commission when you book through our links, at no extra cost to you.'}
              </p>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-12">
              <p className="section-label">FAQ</p>
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">
                {isNl ? 'Veelgestelde Vragen' : 'Frequently Asked Questions'}
              </h2>
              <div className="space-y-6">
                {faqItems.map((item, i) => (
                  <div key={i}>
                    <h3 className="text-lg font-semibold font-heading text-gray-900 mb-2">{item.q}</h3>
                    <p className="text-gray-700">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Guides */}
            <div className="mb-8">
              <p className="section-label">{isNl ? 'Gerelateerde Gidsen' : 'Related Guides'}</p>
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">{isNl ? 'Plan je Reis' : 'Plan Your Trip'}</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  { href: '/food/', title: 'Thai Food Guide', description: 'Explore the flavours of Thailand — street food, regional dishes, and where to eat in every city.' },
                  { href: '/nightlife/', title: 'Nightlife Guide', description: 'From Bangkok rooftop bars to Full Moon Party beaches — the best nightlife spots across Thailand.' },
                  { href: '/best-places-to-visit-thailand/', title: 'Best Places to Visit', description: 'Compare Thailand\'s top destinations: beaches, cities, islands, and hidden gems for every travel style.' },
                  { href: '/thailand-for-first-timers/', title: "First Timer's Guide", description: 'Essential tips for first-time visitors: safety, etiquette, transport, and must-do experiences.' },
                  { href: '/best-diving-snorkeling-in-thailand/', title: 'Diving & Snorkeling', description: 'The best dive sites, liveaboards, and snorkeling spots across Thailand\'s Andaman and Gulf coasts.' },
                  { href: '/best-elephant-sanctuaries-in-thailand/', title: 'Elephant Sanctuaries', description: 'Find ethical elephant experiences — sanctuaries that prioritise welfare over entertainment.' },
                  { href: '/best-cooking-classes-in-thailand/', title: 'Cooking Classes', description: 'Learn to cook authentic Thai food with hands-on classes in Bangkok, Chiang Mai, and beyond.' },
                ].map((guide) => (
                  <Link
                    key={guide.href}
                    href={guide.href}
                    className="rounded-2xl bg-surface-cream p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                  >
                    <h3 className="mb-2 font-bold font-heading text-gray-900">{guide.title}</h3>
                    <p className="text-sm text-gray-600">{guide.description}</p>
                  </Link>
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
    revalidate: 604800
  };
};
