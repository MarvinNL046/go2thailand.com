import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import { getAffiliates, withPlacementSubId } from '../../lib/affiliates';

/**
 * PSEO Fase 3: /hotel/[slug]/
 *
 * Deepest BOFU layer — per-hotel review page. Data from
 * data/pseo/hotels/<slug>.json (built by scripts/pseo-build-hotels.mjs).
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
  sources?: { sourceName?: string; sourceUrl?: string; lastVerified?: string }[];
}

interface QuickStats { priceBand: string; bestFor: string; standout: string; noGoFor?: string }
interface SimilarHotel { name: string; howDifferent: string }
interface FaqItem { q: string; a: string }

interface AiContent {
  hookIntro?: string;
  intro: string;
  quickStats?: QuickStats;
  whyBook?: string[];
  whyNotBook?: string[];
  skipIf?: string;
  detailedReview?: string;
  locationReality?: string;
  localSignals?: string[];
  travellerNote?: string;
  bookingTips?: string[];
  similarHotels?: SimilarHotel[];
  faq?: FaqItem[];
  urgencyLine?: string;
  methodology?: string;
  metaTitle: string;
  metaDescription: string;
}

interface PseoHotelData {
  template: 'hotel-deep';
  citySlug: string;
  cityName: string;
  hotelSlug: string;
  hotel: Hotel;
  similarHotels: Hotel[];
  paaQuestions: string[];
  aiContent: AiContent;
  lastUpdated?: string;
  generatedAt: string;
}

interface Props { data: PseoHotelData }

export default function HotelPage({ data }: Props) {
  const { hotel, cityName, citySlug } = data;
  const aff = getAffiliates(citySlug);
  const subId = `pseo-hotel-${data.hotelSlug}`;
  const norm = (s?: string) => (s || '').trim().toLowerCase();

  const bookingFor = (h: Hotel | undefined, placement: string): { url: string; specific: boolean } | null => {
    if (h?.bookingUrl) return { url: withPlacementSubId(h.bookingUrl, subId, placement), specific: true };
    if (aff?.booking) return { url: withPlacementSubId(aff.booking, subId, placement), specific: false };
    return null;
  };
  const heroCta = bookingFor(hotel, 'hero');
  const similarBySlug = new Map(data.similarHotels.map(h => [norm(h.name), h]));

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Best Hotels', href: '/best-hotels/' },
    { name: cityName, href: `/best-hotels/${citySlug}/` },
    { name: hotel.name, href: `/hotel/${data.hotelSlug}/` },
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

  const hotelJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    name: hotel.name,
    description: hotel.description,
    ...(hotel.area && { address: { '@type': 'PostalAddress', addressLocality: hotel.area, addressRegion: cityName, addressCountry: 'TH' } }),
    ...(hotel.priceRange && { priceRange: hotel.priceRange }),
    ...(hotel.bookingUrl && { url: hotel.bookingUrl }),
  };

  return (
    <>
      <SEOHead title={data.aiContent.metaTitle} description={data.aiContent.metaDescription}>
        <link rel="canonical" href={`https://go2-thailand.com/hotel/${data.hotelSlug}/`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelJsonLd) }} />
        {faqJsonLd && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        )}
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        <section className="bg-thailand-blue text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Breadcrumbs items={breadcrumbs} />
            <h1 className="font-heading text-3xl lg:text-5xl font-bold mt-4">{hotel.name}</h1>
            <p className="mt-1 text-lg opacity-90">{hotel.area ? `${hotel.area}, ` : ''}{cityName}</p>
            {hotel.reviewScore && (
              <span className="mt-3 inline-block rounded-full bg-white/15 backdrop-blur px-3 py-1 text-sm font-semibold">★ {hotel.reviewScore}</span>
            )}
            {data.aiContent.hookIntro && (
              <p className="mt-4 text-lg lg:text-xl font-medium max-w-3xl">{data.aiContent.hookIntro}</p>
            )}
            <p className="mt-3 text-base opacity-90 max-w-3xl">{data.aiContent.intro}</p>

            {/* Above-the-fold CTA */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {heroCta && (
                <a href={heroCta.url} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-6 py-3 text-base font-semibold hover:bg-red-700 shadow-lg">
                  {heroCta.specific ? <>Check rates for {hotel.name} →</> : <>Search {hotel.name} on Booking →</>}
                </a>
              )}
              <a href="#review" className="rounded-full bg-white/10 backdrop-blur text-white px-5 py-3 text-sm font-semibold hover:bg-white/20">Read full review</a>
            </div>

            {data.aiContent.urgencyLine && (
              <p className="mt-4 text-sm opacity-95 italic">⚡ {data.aiContent.urgencyLine}</p>
            )}

            {/* Trust mini-block */}
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-xs opacity-90">
              <span>✔ Honest trade-offs</span>
              <span>✔ Updated {data.lastUpdated ? new Date(data.lastUpdated).toLocaleString('en', {month:'short', year:'numeric'}) : 'for 2026'}</span>
              <span>✔ Affiliate-tracked links</span>
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
                  {hotel.priceRange && <p className="text-xs text-gray-500">{hotel.priceRange}</p>}
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Best for</p>
                  <p className="mt-1 font-heading font-semibold text-gray-900">{data.aiContent.quickStats.bestFor}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Standout</p>
                  <p className="mt-1 font-heading font-semibold text-gray-900">{data.aiContent.quickStats.standout}</p>
                </div>
                {data.aiContent.quickStats.noGoFor && (
                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Not for</p>
                    <p className="mt-1 text-gray-700">{data.aiContent.quickStats.noGoFor}</p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Why book / Why not book */}
          {(data.aiContent.whyBook?.length || data.aiContent.whyNotBook?.length) && (
            <section className="grid md:grid-cols-2 gap-4">
              {data.aiContent.whyBook && data.aiContent.whyBook.length > 0 && (
                <div className="rounded-2xl bg-green-50 border border-green-200 p-5">
                  <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">Why book {hotel.name}</h3>
                  <ul className="space-y-1 text-sm text-gray-800">
                    {data.aiContent.whyBook.map((p, i) => <li key={i} className="flex gap-2"><span className="text-green-700">✓</span><span>{p}</span></li>)}
                  </ul>
                </div>
              )}
              {data.aiContent.whyNotBook && data.aiContent.whyNotBook.length > 0 && (
                <div className="rounded-2xl bg-amber-50 border border-amber-200 p-5">
                  <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">Why you might skip</h3>
                  <ul className="space-y-1 text-sm text-gray-800">
                    {data.aiContent.whyNotBook.map((c, i) => <li key={i} className="flex gap-2"><span className="text-amber-700">⚠</span><span>{c}</span></li>)}
                  </ul>
                </div>
              )}
            </section>
          )}

          {/* Skip if */}
          {data.aiContent.skipIf && (
            <section className="rounded-2xl bg-red-50 border-l-4 border-red-400 p-5">
              <p className="font-semibold text-red-900">✗ {data.aiContent.skipIf}</p>
            </section>
          )}

          {/* Detailed review */}
          {data.aiContent.detailedReview && (
            <section id="review">
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">What it's actually like to stay here</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{data.aiContent.detailedReview}</p>
            </section>
          )}

          {/* Location reality */}
          {data.aiContent.locationReality && (
            <section className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
              <h2 className="font-heading text-xl font-bold text-gray-900 mb-3">Location reality check</h2>
              <p className="text-gray-700 leading-relaxed">{data.aiContent.locationReality}</p>
              {data.aiContent.localSignals && data.aiContent.localSignals.length > 0 && (
                <ul className="mt-4 grid sm:grid-cols-2 gap-2 text-sm text-gray-800">
                  {data.aiContent.localSignals.map((s, i) => (
                    <li key={i} className="flex gap-2"><span className="text-thailand-blue">📍</span><span>{s}</span></li>
                  ))}
                </ul>
              )}
            </section>
          )}

          {/* Highlights from cluster data */}
          {hotel.highlights && hotel.highlights.length > 0 && (
            <section>
              <h2 className="font-heading text-xl font-bold text-gray-900 mb-3">Hotel highlights</h2>
              <ul className="space-y-1 text-sm text-gray-800 list-disc list-inside">
                {hotel.highlights.map((h, i) => <li key={i}>{h}</li>)}
              </ul>
            </section>
          )}

          {/* Traveller note */}
          {data.aiContent.travellerNote && (
            <section className="rounded-2xl bg-white p-5 border-l-4 border-gray-300">
              <p className="text-gray-700 italic">💬 {data.aiContent.travellerNote}</p>
            </section>
          )}

          {/* Booking tips */}
          {data.aiContent.bookingTips && data.aiContent.bookingTips.length > 0 && (
            <section className="rounded-2xl bg-amber-50 border border-amber-200 p-6">
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">Booking tips</h2>
              <ul className="space-y-2 text-gray-800">
                {data.aiContent.bookingTips.map((tip, i) => (
                  <li key={i} className="flex gap-2"><span className="text-amber-600 font-bold">→</span><span>{tip}</span></li>
                ))}
              </ul>
            </section>
          )}

          {/* Second CTA mid-page, highest-intent moment */}
          {heroCta && (
            <section className="rounded-2xl bg-thailand-blue text-white p-6 text-center">
              <p className="font-heading text-xl font-bold mb-3">Ready to book {hotel.name}?</p>
              <a href={heroCta.url} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center rounded-full bg-thailand-red text-white px-6 py-3 text-base font-semibold hover:bg-red-700 shadow-lg">
                {heroCta.specific ? <>Check current rates →</> : <>See on Booking →</>}
              </a>
              <p className="mt-3 text-xs opacity-80">Affiliate link — we may earn a small commission at no extra cost to you.</p>
            </section>
          )}

          {/* Similar hotels */}
          {data.aiContent.similarHotels && data.aiContent.similarHotels.length > 0 && (
            <section>
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">Similar hotels in {cityName}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {data.aiContent.similarHotels.map((s, i) => {
                  const full = similarBySlug.get(norm(s.name));
                  const cta = bookingFor(full, `similar-${i}`);
                  return (
                    <article key={s.name} className="rounded-2xl bg-white p-4 shadow-sm border border-gray-200">
                      <p className="font-heading font-bold text-gray-900">{s.name}</p>
                      {full?.priceRange && <p className="text-xs text-gray-500 mt-0.5">{full.priceRange}</p>}
                      <p className="mt-2 text-sm text-gray-700">{s.howDifferent}</p>
                      {cta && (
                        <a href={cta.url} target="_blank" rel="noopener noreferrer nofollow sponsored" className="mt-3 inline-block text-sm font-semibold text-thailand-red hover:underline">
                          {cta.specific ? 'Check rates →' : 'Search on Booking →'}
                        </a>
                      )}
                    </article>
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
              <h2 className="font-heading text-lg font-bold text-gray-900 mb-2">How we rated {hotel.name}</h2>
              <p className="text-sm text-gray-700 leading-relaxed">{data.aiContent.methodology}</p>
              {(() => {
                const sources = Array.from(new Set(
                  (hotel.sources || []).map(s => s?.sourceName).filter(Boolean)
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
            <h2 className="font-heading text-xl font-bold text-gray-900">Still comparing?</h2>
            <p className="mt-2 text-gray-700">Zoom out to find more options in {cityName}:</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {hotel.category && (
                <Link href={`/best-hotels/${citySlug}/${hotel.category}/`} className="rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">Best {hotel.category} hotels in {cityName}</Link>
              )}
              <Link href={`/best-hotels/${citySlug}/`} className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">All hotels in {cityName}</Link>
              <Link href={`/where-to-stay/${citySlug}/`} className="rounded-full bg-white text-gray-900 border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50">Where to stay (areas)</Link>
            </div>
          </section>
        </main>
      </div>

      {/* Sticky mobile CTA */}
      {heroCta && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg px-3 py-2">
          <a href={heroCta.url} target="_blank" rel="noopener noreferrer nofollow sponsored" className="flex items-center justify-center gap-2 w-full rounded-full bg-thailand-red text-white px-4 py-3 text-sm font-semibold hover:bg-red-700">
            {heroCta.specific ? <>Check rates – {hotel.name} →</> : <>Search on Booking →</>}
          </a>
        </div>
      )}
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const dir = path.join(process.cwd(), 'data', 'pseo', 'hotels');
  const paths: { params: { slug: string } }[] = [];
  if (fs.existsSync(dir)) {
    for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.json'))) {
      try {
        const data = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
        if (data.hotelSlug) paths.push({ params: { slug: data.hotelSlug } });
      } catch { /* skip */ }
    }
  }
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.slug as string;
  const file = path.join(process.cwd(), 'data', 'pseo', 'hotels', `${slug}.json`);
  if (!fs.existsSync(file)) return { notFound: true, revalidate: 60 };
  const data = JSON.parse(fs.readFileSync(file, 'utf8')) as PseoHotelData;
  return { props: { data }, revalidate: 604800 };
};
