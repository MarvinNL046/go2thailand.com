import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import HotelDetailGuideTemplate from '../../components/hotels/HotelDetailGuideTemplate';
import { getNlHotelDetailGuide } from '../../data/hotel-details/nl';
import type { HotelDetailGuideData } from '../../data/hotel-details/types';
import { getAffiliates, withPlacementSubId, TRIP_GENERIC, tripcomAffiliate } from '../../lib/affiliates';
import { getCityBySlug } from '../../lib/cities';

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
  tripPartnerUrl?: string;
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

interface Props {
  data: PseoHotelData;
  nlGuide: HotelDetailGuideData | null;
  hasCategoryPage: boolean;
  hasWhereToStayPage: boolean;
  hasCityPage: boolean;
  relatedHotelSlugs: Record<string, string>;
}

let hotelSlugIndex: Record<string, Record<string, string>> | null = null;

function normalizedHotelName(value?: string): string {
  return (value || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '');
}

function getHotelSlugIndex(): Record<string, Record<string, string>> {
  if (hotelSlugIndex) return hotelSlugIndex;
  const index: Record<string, Record<string, string>> = {};
  const directory = path.join(process.cwd(), 'data', 'pseo', 'hotels');
  for (const filename of fs.readdirSync(directory).filter(file => file.endsWith('.json'))) {
    const detail = JSON.parse(fs.readFileSync(path.join(directory, filename), 'utf8')) as PseoHotelData;
    if (!index[detail.citySlug]) index[detail.citySlug] = {};
    index[detail.citySlug][normalizedHotelName(detail.hotel.name)] = detail.hotelSlug;
  }
  hotelSlugIndex = index;
  return index;
}

export default function HotelPage({ data, nlGuide, hasCategoryPage, hasWhereToStayPage, hasCityPage, relatedHotelSlugs }: Props) {
  const { hotel, cityName, citySlug } = data;
  const aff = getAffiliates(citySlug);

  if (nlGuide) {
    const tripBaseUrl = hotel.tripPartnerUrl || aff?.trip || TRIP_GENERIC;
    const tripHref = withPlacementSubId(tripBaseUrl, `nl-hotel-${data.hotelSlug}`, 'hotel-detail');
    return <HotelDetailGuideTemplate data={nlGuide} tripHref={tripHref} />;
  }

  const subId = `pseo-hotel-${data.hotelSlug}`;
  const norm = normalizedHotelName;

  const bookingFor = (h: Hotel | undefined, placement: string): { url: string; specific: boolean } | null => {
    if (h?.tripPartnerUrl) return { url: withPlacementSubId(h.tripPartnerUrl, subId, placement), specific: true };
    if (h?.bookingUrl) {
      const fixed = tripcomAffiliate(h.bookingUrl, placement);
      return { url: withPlacementSubId(fixed, subId, placement), specific: true };
    }
    return { url: withPlacementSubId(aff?.trip ?? TRIP_GENERIC, subId, placement), specific: false };
  };
  const providerFor = (url: string): string => {
    if (/booking\.com|booking\.tpo\.lv/i.test(url)) return 'Booking.com';
    if (/trip\.com|trip\.tpo\.lv/i.test(url)) return 'Trip.com';
    return 'our booking partner';
  };
  const heroCta = bookingFor(hotel, 'hero');

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Hotels', href: '/where-to-stay/' },
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

      <div className="min-h-screen bg-[#fcfaf6]">
        <section className="section-divider-bottom relative overflow-hidden bg-jade-dark py-12 text-white lg:py-16">
          <div className="pointer-events-none absolute inset-0 opacity-[0.14] [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.35)_1px,transparent_0)] [background-size:22px_22px]" />
          <div className="container-custom relative">
            <Breadcrumbs items={breadcrumbs} />
            <div className="mt-8 grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-end lg:gap-16">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-saffron-light">Independent hotel analysis</p>
                <h1 className="mt-3 max-w-4xl font-display text-[3.2rem] font-semibold leading-[0.9] tracking-[-0.045em] text-white sm:text-[4rem] lg:text-[4.75rem]">{hotel.name}</h1>
                <p className="mt-3 text-sm font-semibold text-white/62">{hotel.area ? `${hotel.area}, ` : ''}{cityName}</p>
                {data.aiContent.hookIntro && (
                  <p className="mt-6 max-w-3xl font-display text-2xl font-semibold leading-tight text-white/94 lg:text-[1.85rem]">{data.aiContent.hookIntro}</p>
                )}
                <p className="mt-4 max-w-3xl text-sm leading-7 text-white/70">{data.aiContent.intro}</p>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  {heroCta && (
                    <a href={heroCta.url} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex min-h-11 items-center rounded-lg bg-[#fff7e9] px-5 text-xs font-bold text-saffron-dark transition hover:bg-white">
                      Check current price on {providerFor(heroCta.url)} →
                    </a>
                  )}
                  <a href="#review" className="inline-flex min-h-11 items-center rounded-lg border border-white/28 px-5 text-xs font-bold text-white transition hover:bg-white/10">Read the full analysis</a>
                </div>
                <p className="mt-4 max-w-2xl text-[10px] leading-5 text-white/48">Affiliate disclosure: booking links may earn us a commission at no extra cost to you. Hotels cannot buy a ranking position in this guide.</p>
              </div>

              <aside className="rounded-xl border border-white/14 bg-white/[0.075] p-6 backdrop-blur-sm">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-saffron-light">The quick verdict</p>
                <p className="mt-3 font-display text-[2rem] font-semibold leading-tight text-white">Useful when the fit is right—not because a score says so.</p>
                <div className="mt-5 space-y-3 border-t border-white/12 pt-4 text-xs leading-5 text-white/68">
                  <p><strong className="text-white">Best for:</strong> {data.aiContent.quickStats?.bestFor || hotel.bestFor?.join(', ') || 'travellers comparing this area'}</p>
                  <p><strong className="text-white">Standout:</strong> {data.aiContent.quickStats?.standout || hotel.highlights?.[0] || 'location and overall stay fit'}</p>
                  <p><strong className="text-white">Rechecked:</strong> {data.lastUpdated ? new Date(data.lastUpdated).toLocaleString('en', { month: 'short', year: 'numeric' }) : '2026'}</p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <div className="container-custom space-y-12 py-12">
          {/* Quick stats card */}
          {data.aiContent.quickStats && (
            <section className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Price tier</p>
                  <p className="mt-1 font-heading font-bold text-gray-900 text-lg">{data.aiContent.quickStats.priceBand}</p>
                  <p className="text-xs text-gray-500">Confirm the live room rate for your exact dates.</p>
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
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">What it&apos;s actually like to stay here</h2>
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
                Check current price on {providerFor(heroCta.url)} →
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
                  const full = data.similarHotels.find(candidate => norm(s.name).startsWith(norm(candidate.name)));
                  const cta = bookingFor(full, `similar-${i}`);
                  const detailSlug = full ? relatedHotelSlugs[norm(full.name)] : undefined;
                  const displayName = full?.name || s.name.split(/\s+(?:\(|—)/)[0].trim();
                  return (
                    <article key={`${displayName}-${i}`} className="flex flex-col rounded-xl border border-jade/10 bg-white p-5 shadow-[0_6px_20px_rgba(18,63,54,0.05)]">
                      <p className="font-display text-xl font-semibold text-jade">{displayName}</p>
                      <p className="mt-2 flex-1 text-sm leading-6 text-charcoal/64">{s.howDifferent}</p>
                      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-jade/8 pt-3">
                        {detailSlug && (
                          <Link href={`/hotel/${detailSlug}/`} className="text-xs font-bold text-jade hover:text-saffron-dark">
                            Read hotel analysis →
                          </Link>
                        )}
                        {cta && (
                          <a href={cta.url} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-xs font-bold text-saffron-dark hover:text-jade">
                            Check current price on {providerFor(cta.url)} →
                          </a>
                        )}
                      </div>
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
              {hotel.category && hasCategoryPage && (
                <Link href={`/best-hotels/${citySlug}/${hotel.category}/`} className="rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">Best {hotel.category} hotels in {cityName}</Link>
              )}
              <Link href={`/best-hotels/${citySlug}/`} className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">All hotels in {cityName}</Link>
              <Link href={hasWhereToStayPage ? `/where-to-stay/${citySlug}/` : hasCityPage ? `/city/${citySlug}/` : '/city/'} className="rounded-full bg-white text-gray-900 border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50">{hasWhereToStayPage ? 'Where to stay (areas)' : hasCityPage ? `${cityName} travel guide` : 'Explore Thailand destinations'}</Link>
            </div>
          </section>
        </div>
      </div>

      {/* Sticky mobile CTA */}
      {heroCta && (
        <div className="fixed bottom-20 left-3 right-3 z-40 rounded-xl border border-jade/10 bg-white/95 p-2 shadow-[0_14px_40px_rgba(18,63,54,0.18)] backdrop-blur md:hidden">
          <a href={heroCta.url} target="_blank" rel="noopener noreferrer nofollow sponsored" className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-jade px-4 text-xs font-bold text-white hover:bg-jade-dark">
            Check current price on {providerFor(heroCta.url)} →
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

export const getStaticProps: GetStaticProps<Props> = async ({ params, locale }) => {
  const slug = params?.slug as string;
  const file = path.join(process.cwd(), 'data', 'pseo', 'hotels', `${slug}.json`);
  if (!fs.existsSync(file)) return { notFound: true, revalidate: 60 };
  const data = JSON.parse(fs.readFileSync(file, 'utf8')) as PseoHotelData;
  const nlGuide = locale === 'nl' ? getNlHotelDetailGuide(slug) : null;
  if (locale === 'nl' && !nlGuide) return { notFound: true, revalidate: 604800 };
  const categoryFile = data.hotel.category
    ? path.join(process.cwd(), 'data', 'pseo', 'best-hotels', `${data.citySlug}-${data.hotel.category}.json`)
    : '';
  const whereToStayFile = path.join(process.cwd(), 'data', 'clusters', data.citySlug, 'where-to-stay.json');
  const relatedHotelSlugs = locale === 'nl' ? {} : (getHotelSlugIndex()[data.citySlug] || {});
  return {
    props: {
      data,
      nlGuide,
      hasCategoryPage: Boolean(categoryFile && fs.existsSync(categoryFile)),
      hasWhereToStayPage: fs.existsSync(whereToStayFile),
      hasCityPage: Boolean(getCityBySlug(data.citySlug, 'en')),
      relatedHotelSlugs,
    },
    revalidate: 604800,
  };
};
