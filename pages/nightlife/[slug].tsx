import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Breadcrumbs from '../../components/Breadcrumbs';
import SEOHead from '../../components/SEOHead';
import fs from 'fs';
import path from 'path';

interface Venue {
  name: string;
  type: string;
  description: string;
  price_range: string;
}

interface PriceRange {
  [key: string]: string;
}

interface Area {
  rank: number;
  name: string;
  type: string;
  description: string;
  highlights: string[];
  venues: Venue[];
  price_level: string;
  price_range: PriceRange;
  peak_hours: string;
  how_to_get_there: string;
}

interface NightlifeData {
  title: string;
  meta_description: string;
  intro: string;
  areas: Area[];
  tips: string[];
  generated_at: string;
}

interface NightlifePageProps {
  nightlifeData: NightlifeData;
  slug: string;
  cityName: string;
}

const CITY_SLUGS = ['bangkok', 'phuket', 'pattaya', 'chiang-mai'];

const CITY_NAMES: Record<string, string> = {
  'bangkok': 'Bangkok',
  'phuket': 'Phuket',
  'pattaya': 'Pattaya',
  'chiang-mai': 'Chiang Mai',
};

function typeBadgeColor(type: string): string {
  switch (type) {
    case 'backpacker': return 'bg-green-100 text-green-700';
    case 'clubbing': return 'bg-purple-100 text-purple-700';
    case 'upscale': return 'bg-amber-100 text-amber-700';
    case 'mixed': return 'bg-blue-100 text-blue-700';
    case 'late-night': return 'bg-red-100 text-red-700';
    default: return 'bg-gray-100 text-gray-700';
  }
}

function priceLevelLabel(level: string, isNl: boolean): string {
  switch (level) {
    case 'budget': return isNl ? 'Budget' : 'Budget';
    case 'moderate': return isNl ? 'Middenklasse' : 'Mid-Range';
    case 'upscale': return isNl ? 'Luxe' : 'Upscale';
    default: return level;
  }
}

function generateFAQs(data: NightlifeData, cityName: string) {
  const areas = data.areas;
  const budgetArea = areas.find(a => a.price_level === 'budget') || areas[0];
  const clubArea = areas.find(a => a.type === 'clubbing') || areas[1];

  return [
    {
      question: `What are the best nightlife areas in ${cityName}?`,
      answer: `The top nightlife areas in ${cityName} are ${areas.slice(0, 3).map(a => a.name).join(', ')}. ${areas[0].name} is ranked #1 for its ${areas[0].type} atmosphere and is known for: ${areas[0].highlights[0].toLowerCase()}.`,
    },
    {
      question: `How much does a night out in ${cityName} cost?`,
      answer: `Prices vary by area. ${budgetArea.name} is the most affordable with beers from ${budgetArea.price_range.beers || 'around 100-150 THB'}. ${areas.find(a => a.price_level === 'upscale')?.name || areas[areas.length - 1].name} is the priciest with cocktails around ${areas.find(a => a.price_level === 'upscale')?.price_range.cocktails || '400+ THB'}.`,
    },
    {
      question: `What time does nightlife start in ${cityName}?`,
      answer: `Most bars get busy around ${areas[0].peak_hours}. ${clubArea ? `Clubs like those on ${clubArea.name} peak at ${clubArea.peak_hours}.` : ''} ${areas.find(a => a.type === 'late-night') ? `After-hours spots run ${areas.find(a => a.type === 'late-night')!.peak_hours}.` : 'Most venues close around 2 AM.'}`,
    },
  ];
}

export default function NightlifePage({ nightlifeData, slug, cityName }: NightlifePageProps) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: isNl ? 'Nachtleven' : 'Nightlife', href: '/nightlife/' },
    { name: cityName, href: `/nightlife/${slug}/` },
  ];

  const faqs = generateFAQs(nightlifeData, cityName);

  return (
    <>
      <SEOHead
        title={nightlifeData.title}
        description={nightlifeData.meta_description}
      >
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
                  "text": faq.answer,
                },
              })),
            }),
          }}
        />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        {/* Hero Section */}
        <section className="bg-surface-dark text-white">
          <div className="container-custom py-16 lg:py-20">
            <Breadcrumbs items={breadcrumbs} />
            <div className="text-center max-w-4xl mx-auto">
              <span className="section-label">{isNl ? 'Nachtleven Gids' : 'Nightlife Guide'}</span>
              <h1 className="text-4xl lg:text-5xl font-bold font-heading mb-6">
                {nightlifeData.title}
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
                {nightlifeData.intro}
              </p>
            </div>
          </div>
        </section>

        {/* Areas */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto space-y-10">
              {nightlifeData.areas.map((area) => (
                <article
                  key={area.rank}
                  id={`area-${area.rank}`}
                  className="bg-white rounded-2xl shadow-md overflow-hidden"
                >
                  <div className="p-6 lg:p-8">
                    {/* Area Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-thailand-gold text-white rounded-xl flex items-center justify-center text-xl font-bold">
                        {area.rank}
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl lg:text-3xl font-bold font-heading text-gray-900 mb-2">
                          {area.name}
                        </h2>
                        <div className="flex flex-wrap gap-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${typeBadgeColor(area.type)}`}>
                            {area.type.charAt(0).toUpperCase() + area.type.slice(1)}
                          </span>
                          <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-600">
                            {priceLevelLabel(area.price_level, isNl)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {area.description}
                    </p>

                    {/* Highlights */}
                    {area.highlights.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {area.highlights.map((highlight, idx) => (
                          <span
                            key={idx}
                            className="bg-thailand-gold/10 text-thailand-gold px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Price Range Table */}
                    <div className="bg-surface-cream rounded-xl p-4 mb-6">
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                        {isNl ? 'Prijsklasse' : 'Price Range'}
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {Object.entries(area.price_range).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <div className="text-lg font-bold text-gray-900">{value}</div>
                            <div className="text-xs text-gray-500 capitalize">{key}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Peak Hours & Getting There */}
                    <div className="grid sm:grid-cols-2 gap-4 mb-6">
                      <div className="bg-surface-cream rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                          {isNl ? 'Piekuren' : 'Peak Hours'}
                        </h3>
                        <p className="text-gray-900 font-medium">{area.peak_hours}</p>
                      </div>
                      <div className="bg-surface-cream rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                          {isNl ? 'Hoe Er Te Komen' : 'How to Get There'}
                        </h3>
                        <p className="text-gray-700 text-sm">{area.how_to_get_there}</p>
                      </div>
                    </div>

                    {/* Venues */}
                    {area.venues.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                          {isNl ? 'Bekende Uitgaansgelegenheden' : 'Notable Venues'}
                        </h3>
                        <div className="space-y-3">
                          {area.venues.map((venue, idx) => (
                            <div
                              key={idx}
                              className="border border-gray-200 rounded-xl p-4 hover:border-thailand-gold/40 transition-colors"
                            >
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="font-semibold text-gray-900">{venue.name}</h4>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full capitalize">
                                    {venue.type}
                                  </span>
                                  {venue.price_range && (
                                    <span className="text-xs text-thailand-gold font-medium">
                                      {venue.price_range}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <p className="text-sm text-gray-600">{venue.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Tips Section */}
        {nightlifeData.tips.length > 0 && (
          <section className="section-padding bg-white">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6 text-center">
                  {isNl ? `Nachtleven Tips voor ${cityName}` : `Nightlife Tips for ${cityName}`}
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {nightlifeData.tips.map((tip, idx) => (
                    <div key={idx} className="bg-surface-cream rounded-xl p-4 flex gap-3">
                      <span className="text-thailand-gold font-bold text-lg flex-shrink-0">
                        {idx + 1}.
                      </span>
                      <p className="text-gray-700 text-sm">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* FAQ Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6 text-center">
                {isNl ? 'Veelgestelde Vragen' : 'Frequently Asked Questions'}
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="font-semibold font-heading text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">
                {isNl ? `Ontdek Meer van ${cityName}` : `Explore More of ${cityName}`}
              </h2>
              <p className="text-gray-600 mb-6">
                {isNl ? `Ontdek restaurants, bezienswaardigheden en de complete reisgids voor ${cityName}.` : `Discover restaurants, attractions, and the complete travel guide for ${cityName}.`}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={`/city/${slug}/`} className="btn-primary">
                  {isNl ? `Complete ${cityName} Gids` : `Complete ${cityName} Guide`}
                </Link>
                <Link href={`/city/${slug}/top-10-restaurants/`} className="btn-secondary">
                  Top 10 Restaurants
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Related Guides */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6 text-center">
                {isNl ? 'Gerelateerde Gidsen' : 'Related Guides'}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link
                  href="/nightlife/"
                  className="bg-surface-cream rounded-xl p-5 hover:shadow-md border border-transparent hover:border-thailand-gold/30 transition-all group"
                >
                  <div className="text-2xl mb-2">🌃</div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-thailand-blue transition-colors mb-1">
                    {isNl ? 'Alle Nachtleven Gidsen' : 'All Nightlife Guides'}
                  </h3>
                  <p className="text-sm text-gray-500">{isNl ? 'Vergelijk nachtleven in Thaise steden' : "Compare nightlife across Thailand's cities"}</p>
                </Link>
                <Link
                  href="/drinks/"
                  className="bg-surface-cream rounded-xl p-5 hover:shadow-md border border-transparent hover:border-thailand-gold/30 transition-all group"
                >
                  <div className="text-2xl mb-2">���</div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-thailand-blue transition-colors mb-1">
                    {isNl ? 'Thaise Drankjes Gids' : 'Thai Drinks Guide'}
                  </h3>
                  <p className="text-sm text-gray-500">{isNl ? 'Cocktails, lokale dranken & prijzen' : 'Cocktails, local spirits & drink prices'}</p>
                </Link>
                <Link
                  href="/food/"
                  className="bg-surface-cream rounded-xl p-5 hover:shadow-md border border-transparent hover:border-thailand-gold/30 transition-all group"
                >
                  <div className="text-2xl mb-2">🍜</div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-thailand-blue transition-colors mb-1">
                    {isNl ? 'Thais Eten Gids' : 'Thai Food Guide'}
                  </h3>
                  <p className="text-sm text-gray-500">{isNl ? 'Straatvoedsel, gerechten & waar te eten' : 'Street food, dishes & where to eat'}</p>
                </Link>
                <Link
                  href={`/city/${slug}/`}
                  className="bg-surface-cream rounded-xl p-5 hover:shadow-md border border-transparent hover:border-thailand-gold/30 transition-all group"
                >
                  <div className="text-2xl mb-2">🏙️</div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-thailand-blue transition-colors mb-1">
                    {cityName} {isNl ? 'Stadsgids' : 'City Guide'}
                  </h3>
                  <p className="text-sm text-gray-500">{isNl ? 'Hotels, bezienswaardigheden & reistips' : 'Hotels, attractions & travel tips'}</p>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = CITY_SLUGS.map((slug) => ({ params: { slug } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const slug = params?.slug as string;
  const cityName = CITY_NAMES[slug];

  if (!cityName) return { notFound: true };

  const lang = locale || 'en';
  let nightlifeData: NightlifeData | null = null;
  try {
    const localePath = path.join(process.cwd(), 'data', 'nightlife', lang, `${slug}.json`);
    const defaultPath = path.join(process.cwd(), 'data', 'nightlife', `${slug}.json`);
    const dataPath = lang !== 'en' && fs.existsSync(localePath) ? localePath : defaultPath;

    if (fs.existsSync(dataPath)) {
      const fileContent = fs.readFileSync(dataPath, 'utf8');
      nightlifeData = JSON.parse(fileContent);
    }
  } catch (error) {
    // Data file not found
  }

  if (!nightlifeData) return { notFound: true };

  return {
    props: {
      nightlifeData,
      slug,
      cityName,
    },
    revalidate: 604800,
  };
};
