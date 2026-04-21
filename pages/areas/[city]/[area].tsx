import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import SEOHead from '../../../components/SEOHead';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { getAffiliates, withPlacementSubId } from '../../../lib/affiliates';

/**
 * PSEO Fase 2: /areas/[city]/[area]/
 *
 * Deep per-neighborhood page. Bridges top-of-funnel blogs with
 * bottom-of-funnel where-to-stay + best-hotels. Data comes from
 * data/pseo/areas/<city>-<area-slug>.json (built by scripts/pseo-build-areas.mjs).
 */

interface Hotel {
  name: string;
  category?: string;
  priceRange?: string;
  area?: string;
  description: string;
  highlights?: string[];
  bookingUrl?: string;
  reviewScore?: string;
  bestFor?: string[];
}

interface Neighborhood {
  name: string;
  description: string;
  bestFor: string;
  priceLevel?: string;
  highlights?: string[];
  walkingScore?: string;
  transportNotes?: string[];
  recommendedHotels?: string[];
  sources?: { sourceName?: string; sourceUrl?: string; lastVerified?: string }[];
}

interface QuickStats { priceBand: string; walkability: string; bestFor: string; safetyNote?: string }
interface StayRec { name: string; why: string }
interface CompareItem { areaName: string; shortPitch: string; recommendFor?: string }
interface FaqItem { q: string; a: string }

interface AiContent {
  hookIntro?: string;
  intro: string;
  vibe?: string;
  quickStats?: QuickStats;
  detailedDescription?: string;
  localSignals?: string[];
  pros?: string[];
  cons?: string[];
  skipIf?: string;
  stayRecommendations?: StayRec[];
  compareTo?: CompareItem[];
  travellerNote?: string;
  faq?: FaqItem[];
  urgencyLine?: string;
  methodology?: string;
  metaTitle: string;
  metaDescription: string;
}

interface PseoAreaData {
  template: 'area-deep';
  citySlug: string;
  cityName: string;
  areaSlug: string;
  areaName: string;
  neighborhood: Neighborhood;
  hotels: Hotel[];
  nearbyAreas: string[];
  paaQuestions: string[];
  aiContent: AiContent;
  lastUpdated?: string;
  generatedAt: string;
}

interface Props { data: PseoAreaData }

const slugifyArea = (s: string) => s.toLowerCase().replace(/[&/]/g, ' ').replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');

export default function AreaPage({ data }: Props) {
  const { areaName, cityName, citySlug } = data;
  const aff = getAffiliates(citySlug);
  const subId = `pseo-areas-${citySlug}-${data.areaSlug}`;
  const norm = (s?: string) => (s || '').trim().toLowerCase();

  const bookingForHotel = (h: Hotel | undefined, placement: string): { url: string; specific: boolean } | null => {
    if (h?.bookingUrl) return { url: withPlacementSubId(h.bookingUrl, subId, placement), specific: true };
    if (aff?.booking) return { url: withPlacementSubId(aff.booking, subId, placement), specific: false };
    return null;
  };
  const areaBookingUrl = aff?.booking ? withPlacementSubId(aff.booking, subId, 'hero') : null;
  const hotelByName = (name?: string) => data.hotels.find(h => norm(h.name) === norm(name));

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Where to Stay', href: '/where-to-stay/' },
    { name: cityName, href: `/where-to-stay/${citySlug}/` },
    { name: areaName, href: `/areas/${citySlug}/${data.areaSlug}/` },
  ];

  const faqJsonLd = data.aiContent.faq && data.aiContent.faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.aiContent.faq.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  } : null;

  // Place schema — identifies the area as a geographic place within the city
  const placeJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: `${areaName}, ${cityName}`,
    containedInPlace: { '@type': 'City', name: cityName, addressCountry: 'TH' },
    description: data.aiContent.intro,
  };

  return (
    <>
      <SEOHead title={data.aiContent.metaTitle} description={data.aiContent.metaDescription}>
        <link rel="canonical" href={`https://go2-thailand.com/areas/${citySlug}/${data.areaSlug}/`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(placeJsonLd) }} />
        {faqJsonLd && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        )}
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        <section className="bg-thailand-blue text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Breadcrumbs items={breadcrumbs} />
            <h1 className="font-heading text-3xl lg:text-5xl font-bold mt-4">
              Staying in {areaName}, {cityName} (2026)
            </h1>
            {data.aiContent.vibe && (
              <p className="mt-3 inline-block rounded-full bg-white/15 backdrop-blur px-3 py-1 text-sm font-semibold">
                {data.aiContent.vibe}
              </p>
            )}
            {data.aiContent.hookIntro && (
              <p className="mt-4 text-lg lg:text-xl font-medium max-w-3xl">{data.aiContent.hookIntro}</p>
            )}
            <p className="mt-3 text-base opacity-90 max-w-3xl">{data.aiContent.intro}</p>

            {/* Above-the-fold CTAs */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {areaBookingUrl && (
                <a href={areaBookingUrl} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-6 py-3 text-base font-semibold hover:bg-red-700 shadow-lg">
                  Search hotels in {areaName} →
                </a>
              )}
              <a href="#stay" className="rounded-full bg-white/10 backdrop-blur text-white px-5 py-3 text-sm font-semibold hover:bg-white/20">
                See recommended hotels
              </a>
            </div>

            {data.aiContent.urgencyLine && (
              <p className="mt-4 text-sm opacity-95 italic">⚡ {data.aiContent.urgencyLine}</p>
            )}

            {/* Trust mini-block */}
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-xs opacity-90">
              <span>✔ Real traveller data</span>
              <span>✔ Updated {data.lastUpdated ? new Date(data.lastUpdated).toLocaleString('en', {month:'short', year:'numeric'}) : 'for 2026'}</span>
              <span>✔ Honest trade-offs</span>
              <span>✔ No sponsored placements</span>
            </div>
          </div>
        </section>

        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          {/* Quick stats card */}
          {data.aiContent.quickStats && (
            <section className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Price</p>
                  <p className="mt-1 font-heading font-bold text-gray-900 text-lg">{data.aiContent.quickStats.priceBand}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Walkability</p>
                  <p className="mt-1 font-heading font-bold text-gray-900 text-lg">{data.aiContent.quickStats.walkability}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Best for</p>
                  <p className="mt-1 font-heading font-semibold text-gray-900">{data.aiContent.quickStats.bestFor}</p>
                </div>
                {data.aiContent.quickStats.safetyNote && (
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Safety</p>
                    <p className="mt-1 text-gray-700">{data.aiContent.quickStats.safetyNote}</p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Detailed description */}
          {data.aiContent.detailedDescription && (
            <section>
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">What it's like to stay in {areaName}</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{data.aiContent.detailedDescription}</p>
            </section>
          )}

          {/* Local signals grid */}
          {data.aiContent.localSignals && data.aiContent.localSignals.length > 0 && (
            <section className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
              <h2 className="font-heading text-xl font-bold text-gray-900 mb-4">Getting around + nearby</h2>
              <ul className="grid sm:grid-cols-2 gap-2 text-sm text-gray-800">
                {data.aiContent.localSignals.map((s, i) => (
                  <li key={i} className="flex gap-2"><span className="text-thailand-blue">📍</span><span>{s}</span></li>
                ))}
              </ul>
            </section>
          )}

          {/* Pros + cons */}
          {(data.aiContent.pros?.length || data.aiContent.cons?.length) && (
            <section className="grid md:grid-cols-2 gap-4">
              {data.aiContent.pros && data.aiContent.pros.length > 0 && (
                <div className="rounded-2xl bg-green-50 border border-green-200 p-5">
                  <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">What works</h3>
                  <ul className="space-y-1 text-sm text-gray-800">
                    {data.aiContent.pros.map((p, i) => <li key={i} className="flex gap-2"><span className="text-green-700">✓</span><span>{p}</span></li>)}
                  </ul>
                </div>
              )}
              {data.aiContent.cons && data.aiContent.cons.length > 0 && (
                <div className="rounded-2xl bg-amber-50 border border-amber-200 p-5">
                  <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">What to watch for</h3>
                  <ul className="space-y-1 text-sm text-gray-800">
                    {data.aiContent.cons.map((c, i) => <li key={i} className="flex gap-2"><span className="text-amber-700">⚠</span><span>{c}</span></li>)}
                  </ul>
                </div>
              )}
            </section>
          )}

          {/* Skip-if */}
          {data.aiContent.skipIf && (
            <section className="rounded-2xl bg-red-50 border-l-4 border-red-400 p-5">
              <p className="font-semibold text-red-900">✗ {data.aiContent.skipIf}</p>
            </section>
          )}

          {/* Traveller sentiment */}
          {data.aiContent.travellerNote && (
            <section className="rounded-2xl bg-white p-5 border-l-4 border-gray-300">
              <p className="text-gray-700 italic">💬 {data.aiContent.travellerNote}</p>
            </section>
          )}

          {/* Stay recommendations */}
          {data.aiContent.stayRecommendations && data.aiContent.stayRecommendations.length > 0 && (
            <section id="stay">
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">Where to stay in {areaName}</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {data.aiContent.stayRecommendations.map((s, i) => {
                  const h = hotelByName(s.name);
                  const cta = bookingForHotel(h, `stay-${i}`);
                  return (
                    <article key={s.name} className="rounded-2xl bg-white p-5 shadow-sm border border-gray-200">
                      <h3 className="font-heading font-bold text-gray-900">{s.name}</h3>
                      {h?.priceRange && <p className="text-xs text-gray-500 mt-0.5">{h.priceRange}</p>}
                      <p className="mt-2 text-sm text-gray-700">{s.why}</p>
                      {cta && (
                        <a href={cta.url} target="_blank" rel="noopener noreferrer nofollow sponsored" className="mt-3 inline-block text-sm font-semibold text-thailand-red hover:underline">
                          {cta.specific ? 'Check rates →' : 'Search on Booking →'}
                        </a>
                      )}
                    </article>
                  );
                })}
              </div>
              <p className="mt-3 text-xs text-gray-500">Some links above are affiliate links — we may earn a small commission at no extra cost to you.</p>
            </section>
          )}

          {/* Compare to nearby */}
          {data.aiContent.compareTo && data.aiContent.compareTo.length > 0 && (
            <section>
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">Not sure? Compare with nearby areas</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {data.aiContent.compareTo.map((c, i) => {
                  const otherSlug = slugifyArea(c.areaName);
                  return (
                    <Link key={i} href={`/areas/${citySlug}/${otherSlug}/`} className="block rounded-2xl bg-white p-4 shadow-sm border border-gray-200 hover:border-thailand-blue transition-colors">
                      <p className="font-heading font-bold text-gray-900">{c.areaName}</p>
                      {c.recommendFor && <p className="text-xs text-thailand-blue mt-0.5 font-semibold uppercase tracking-wide">For {c.recommendFor}</p>}
                      <p className="mt-2 text-sm text-gray-700">{c.shortPitch}</p>
                      <p className="mt-2 text-xs text-thailand-red font-semibold">See this area →</p>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* FAQ */}
          {data.aiContent.faq && data.aiContent.faq.length > 0 && (
            <section>
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">Frequently asked questions</h2>
              <div className="space-y-3">
                {data.aiContent.faq.map((f, i) => (
                  <details key={i} className="rounded-2xl bg-white p-4 shadow-sm border border-gray-200">
                    <summary className="font-semibold text-gray-900 cursor-pointer">{f.q}</summary>
                    <p className="mt-2 text-gray-700 text-sm leading-relaxed">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* Methodology + sources */}
          {data.aiContent.methodology && (
            <section className="rounded-2xl bg-gray-50 border border-gray-200 p-6">
              <h2 className="font-heading text-lg font-bold text-gray-900 mb-2">How we picked these signals</h2>
              <p className="text-sm text-gray-700 leading-relaxed">{data.aiContent.methodology}</p>
              {(() => {
                const sources = Array.from(new Set(
                  (data.neighborhood.sources || []).map(s => s?.sourceName).filter(Boolean)
                )) as string[];
                return sources.length > 0 ? (
                  <p className="mt-3 text-xs text-gray-600">
                    <span className="font-semibold">Data sources:</span> {sources.slice(0, 5).join(' · ')}
                  </p>
                ) : null;
              })()}
            </section>
          )}

          {/* Funnel cross-link */}
          <section className="rounded-2xl bg-thailand-blue/10 p-6">
            <h2 className="font-heading text-xl font-bold text-gray-900">Still planning your {cityName} trip?</h2>
            <p className="mt-2 text-gray-700">Broader picks for the whole city:</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href={`/where-to-stay/${citySlug}/`} className="rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">All {cityName} neighbourhoods</Link>
              <Link href={`/best-hotels/${citySlug}/`} className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">Best hotels in {cityName}</Link>
              <Link href={`/city/${citySlug}/`} className="rounded-full bg-white text-gray-900 border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50">{cityName} travel guide</Link>
            </div>
          </section>
        </main>
      </div>

      {/* Sticky mobile CTA */}
      {areaBookingUrl && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg px-3 py-2">
          <a href={areaBookingUrl} target="_blank" rel="noopener noreferrer nofollow sponsored" className="flex items-center justify-center gap-2 w-full rounded-full bg-thailand-red text-white px-4 py-3 text-sm font-semibold hover:bg-red-700">
            Search hotels in {areaName} →
          </a>
        </div>
      )}
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const dir = path.join(process.cwd(), 'data', 'pseo', 'areas');
  const paths: { params: { city: string; area: string } }[] = [];
  if (fs.existsSync(dir)) {
    for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.json'))) {
      try {
        const data = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
        if (data.citySlug && data.areaSlug) {
          paths.push({ params: { city: data.citySlug, area: data.areaSlug } });
        }
      } catch { /* skip */ }
    }
  }
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const city = params?.city as string;
  const area = params?.area as string;
  const file = path.join(process.cwd(), 'data', 'pseo', 'areas', `${city}-${area}.json`);
  if (!fs.existsSync(file)) return { notFound: true, revalidate: 60 };
  const data = JSON.parse(fs.readFileSync(file, 'utf8')) as PseoAreaData;
  return { props: { data }, revalidate: 604800 };
};
