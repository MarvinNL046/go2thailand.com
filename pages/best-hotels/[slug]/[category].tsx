import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import SEOHead from '../../../components/SEOHead';
import Breadcrumbs from '../../../components/Breadcrumbs';
import FounderNote from '../../../components/editorial/FounderNote';
import EditorialSchema from '../../../components/editorial/EditorialSchema';
import EditorialMeta from '../../../components/editorial/EditorialMeta';
import { getAffiliates, withPlacementSubId } from '../../../lib/affiliates';
import { getEditorialUpdatedAt } from '../../../lib/pseo-editorial-date';

/**
 * PSEO template: /best-hotels/[city]/[category]
 *
 * Reads pre-generated data from data/pseo/best-hotels/<city>-<category>.json
 * (produced by scripts/pseo-build-fase1.mjs).
 *
 * Returns 404 when the data file is missing so we never publish empty
 * programmatic shells.
 */

interface Hotel {
  name: string;
  category: string;
  priceRange?: string;
  area?: string;
  description: string;
  highlights?: string[];
  bookingUrl?: string;
  reviewScore?: string;
  bestFor?: string[];
  sources?: { sourceName?: string; sourceUrl?: string }[];
}

interface FaqItem { q: string; a: string }
interface ComparisonRow { name: string; area: string; priceBand: string; bestFor: string; standout: string; drawback: string }
interface RankingItem { rank: number; name: string; why: string; drawback: string; skipIf?: string; localSignals?: string[]; travellerNote?: string }

interface QuickAnswer { label: string; name: string; why: string }

interface AiContent {
  hookIntro?: string;
  intro: string;
  quickAnswers?: QuickAnswer[];
  urgencyLine?: string;
  comparisonTable?: ComparisonRow[];
  decisionGuide?: string[];
  internalLinks?: string[];
  ctaPlacements?: string[];
  ranking?: RankingItem[];
  decisionSupport?: string; // legacy fallback
  topPick?: string;
  topPickReason?: string;
  bookingTips?: string[];
  methodology?: string;
  faq: FaqItem[];
  metaTitle: string;
  metaDescription: string;
}

interface PseoData {
  template: 'best-hotels-category';
  citySlug: string;
  cityName: string;
  category: string;
  hotels: Hotel[];
  paaQuestions: string[];
  aiContent: AiContent;
  lastUpdated?: string;
  generatedAt: string;
}

interface Props { data: PseoData }

const CATEGORY_LABELS: Record<string, string> = {
  budget: 'budget',
  luxury: 'luxury',
  beachfront: 'beachfront',
  family: 'family',
  couples: 'couples',
  'private-pool': 'private pool',
  'old-town': 'old town',
};

export default function BestHotelsCategoryPage({ data }: Props) {
  const categoryLabel = CATEGORY_LABELS[data.category] || data.category.replace(/-/g, ' ');
  const editorialUpdatedAt = getEditorialUpdatedAt(data);
  // Lookup helper: find the affiliate URL of a hotel by its (verbatim) name.
  const norm = (s?: string) => (s || '').trim().toLowerCase();
  const hotelByName = (name?: string) => data.hotels.find(h => norm(h.name) === norm(name));
  const topPickHotel = hotelByName(data.aiContent.topPick);
  // City-level affiliate fallback — used when an individual hotel has no
  // direct bookingUrl. Always returns at least the city Booking search link
  // (with placement-tagged subId for revenue attribution per page section).
  const aff = getAffiliates(data.citySlug);
  const subId = `pseo-best-hotels-${data.citySlug}-${data.category}`;
  // Returns the affiliate URL plus whether it lands on this specific hotel.
  // When false, CTA copy must stay honest ("Search on Booking") instead of
  // promising "Check rates – <hotel name>" which would mislead users who
  // expect to land on that hotel's Booking page, not the city search.
  const bookingFor = (h: Hotel | undefined, placement: string): { url: string; specific: boolean } | null => {
    if (h?.bookingUrl) return { url: withPlacementSubId(h.bookingUrl, subId, placement), specific: true };
    if (aff?.booking) return { url: withPlacementSubId(aff.booking, subId, placement), specific: false };
    return null;
  };

  const renderHotelCard = (h: Hotel, idx: number) => {
    const cta = bookingFor(h, `card-${idx}`);
    return (
      <article key={h.name} className="rounded-2xl bg-white p-6 shadow-md">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-sm text-gray-500">#{idx + 1} {h.area || ''}</p>
            <h3 className="font-heading text-xl font-bold text-gray-900">{h.name}</h3>
          </div>
          {h.reviewScore && (
            <span className="rounded-full bg-thailand-blue/10 text-thailand-blue px-3 py-1 text-sm font-semibold">★ {h.reviewScore}</span>
          )}
        </div>
        <p className="mt-3 text-gray-700 leading-relaxed">{h.description}</p>
        <div className="mt-4 grid sm:grid-cols-2 gap-4 text-sm">
          {h.priceRange && (<div><p className="font-semibold text-gray-900">Price</p><p className="text-gray-700">{h.priceRange}</p></div>)}
          {h.bestFor && h.bestFor.length > 0 && (<div><p className="font-semibold text-gray-900">Best for</p><p className="text-gray-700">{h.bestFor.join(', ')}</p></div>)}
        </div>
        {h.highlights && h.highlights.length > 0 && (
          <ul className="mt-4 space-y-1 text-sm text-gray-700 list-disc list-inside">
            {h.highlights.slice(0, 4).map((hi, i) => <li key={i}>{hi}</li>)}
          </ul>
        )}
        {cta && (
          <a href={cta.url} target="_blank" rel="noopener noreferrer nofollow sponsored" className="mt-5 inline-flex items-center justify-center rounded-full bg-thailand-blue px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700">
            {cta.specific ? <>Check rates &amp; availability →</> : <>Search {h.name} on Booking →</>}
          </a>
        )}
      </article>
    );
  };
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Best Hotels', href: '/best-hotels/' },
    { name: data.cityName, href: `/best-hotels/${data.citySlug}/` },
    { name: `${categoryLabel.charAt(0).toUpperCase() + categoryLabel.slice(1)}`, href: `/best-hotels/${data.citySlug}/${data.category}/` },
  ];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.aiContent.faq.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  // Schema for the hotel list — helps Google understand item-list intent.
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: data.hotels.map((h, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Hotel',
        name: h.name,
        description: h.description,
        ...(h.area && { address: { '@type': 'PostalAddress', addressLocality: h.area, addressRegion: data.cityName, addressCountry: 'TH' } }),
        ...(h.priceRange && { priceRange: h.priceRange }),
        ...(h.bookingUrl && { url: h.bookingUrl }),
        // aggregateRating intentionally omitted — we don't have a real ratingCount.
        // Synthetic ratingCount:1 is schema-spam and risks rich-result demotion.
      },
    })),
  };

  return (
    <>
      <SEOHead
        title={data.aiContent.metaTitle}
        description={data.aiContent.metaDescription}
      >
        <link rel="canonical" href={`https://go2-thailand.com/best-hotels/${data.citySlug}/${data.category}/`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
        <EditorialSchema
          title={data.aiContent.metaTitle}
          url={`https://go2-thailand.com/best-hotels/${data.citySlug}/${data.category}/`}
          updatedAt={editorialUpdatedAt}
        />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        <section className="bg-thailand-blue text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Breadcrumbs items={breadcrumbs} />
            <h1 className="font-heading text-3xl lg:text-5xl font-bold mt-4">
              Best {categoryLabel} hotels in {data.cityName} (2026)
            </h1>
            <EditorialMeta updatedAt={editorialUpdatedAt} />
            {data.aiContent.hookIntro && (
              <p className="mt-4 text-lg lg:text-xl font-medium max-w-3xl">{data.aiContent.hookIntro}</p>
            )}
            <p className="mt-3 text-base opacity-90 max-w-3xl">{data.aiContent.intro}</p>

            {/* Above-the-fold CTA — direct affiliate link to top pick when available */}
            {data.aiContent.topPick && (
              <div className="mt-6 flex flex-wrap items-center gap-3">
                {(() => {
                  const cta = bookingFor(topPickHotel, 'hero');
                  if (!cta) return <a href="#hotels" className="rounded-full bg-white text-thailand-blue px-6 py-3 text-base font-semibold hover:bg-gray-100 shadow-lg">View top picks →</a>;
                  return (
                    <a href={cta.url} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-6 py-3 text-base font-semibold hover:bg-red-700 shadow-lg">
                      {cta.specific ? <>Check rates – {data.aiContent.topPick} →</> : <>Search {categoryLabel} hotels in {data.cityName} →</>}
                    </a>
                  );
                })()}
                <a href="#comparison" className="rounded-full bg-white/10 backdrop-blur text-white px-5 py-3 text-sm font-semibold hover:bg-white/20">
                  Compare all {data.hotels.length} hotels
                </a>
              </div>
            )}

            {data.aiContent.urgencyLine && (
              <p className="mt-4 text-sm opacity-95 italic">⚡ {data.aiContent.urgencyLine}</p>
            )}

            {/* Trust mini-block — quick EEAT signals */}
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-xs opacity-90">
              <span>✔ Based on real traveller data</span>
              <span>✔ Updated {editorialUpdatedAt ? new Date(editorialUpdatedAt).toLocaleString('en', {month:'short', year:'numeric'}) : 'for 2026'}</span>
              <span>✔ Honest trade-offs per hotel</span>
              <span>✔ Travelpayouts-tracked affiliate links</span>
            </div>
          </div>
        </section>

        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          {/* Quick answers — scannable above-the-fold pick block */}
          {data.aiContent.quickAnswers && data.aiContent.quickAnswers.length > 0 && (
            <section className="-mt-4">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {data.aiContent.quickAnswers.map((qa, i) => {
                  const h = hotelByName(qa.name);
                  const cta = bookingFor(h, `quick-${i}`);
                  return (
                    <div key={i} className="rounded-2xl bg-white p-4 shadow-sm border-t-4 border-thailand-blue">
                      <p className="text-xs uppercase tracking-wide text-thailand-blue font-bold">{qa.label}</p>
                      <p className="mt-1 font-heading font-bold text-gray-900">{qa.name}</p>
                      <p className="text-sm text-gray-600">{qa.why}</p>
                      {cta && (
                        <a href={cta.url} target="_blank" rel="noopener noreferrer nofollow sponsored" className="mt-2 inline-block text-sm font-semibold text-thailand-red hover:underline">
                          {cta.specific ? 'Check rates →' : 'Search on Booking →'}
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}
          {/* Comparison table */}
          {data.aiContent.comparisonTable && data.aiContent.comparisonTable.length > 0 && (
            <section id="comparison">
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">Quick comparison</h2>
              <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-50 text-gray-700">
                    <tr>
                      <th className="text-left font-semibold px-4 py-3">Hotel</th>
                      <th className="text-left font-semibold px-4 py-3">Area</th>
                      <th className="text-left font-semibold px-4 py-3">Price</th>
                      <th className="text-left font-semibold px-4 py-3">Best for</th>
                      <th className="text-left font-semibold px-4 py-3">Standout</th>
                      <th className="text-left font-semibold px-4 py-3">Watch out for</th>
                      <th className="text-left font-semibold px-4 py-3">Deal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {data.aiContent.comparisonTable.map((r, i) => {
                      const cta = bookingFor(hotelByName(r.name), `table-${i}`);
                      return (
                        <tr key={i} className="hover:bg-gray-50">
                          <td className="px-4 py-3 font-semibold text-gray-900">{r.name}</td>
                          <td className="px-4 py-3 text-gray-700">{r.area}</td>
                          <td className="px-4 py-3 text-gray-700">{r.priceBand}</td>
                          <td className="px-4 py-3 text-gray-700">{r.bestFor}</td>
                          <td className="px-4 py-3 text-gray-700">{r.standout}</td>
                          <td className="px-4 py-3 text-gray-600 italic">{r.drawback}</td>
                          <td className="px-4 py-3">
                            {cta && (<a href={cta.url} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-thailand-red font-semibold hover:underline whitespace-nowrap">{cta.specific ? 'View deal →' : 'Search →'}</a>)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Decision guide — If X → choose Y, rendered as cards */}
          {data.aiContent.decisionGuide && data.aiContent.decisionGuide.length > 0 && (
            <section>
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">Quick decision guide</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {data.aiContent.decisionGuide.map((line, i) => {
                  const m = line.match(/^(.+?)[,.]\s*(choose|consider|pick|go for|book)\s+(.+?)\.?\s*$/i);
                  const pickedName = m ? m[3].trim().replace(/[.]$/, '') : null;
                  const pickedHotel = data.hotels.find(h => norm(h.name) === norm(pickedName) || norm(h.name).includes(norm(pickedName))
                    || norm(pickedName).includes(norm(h.name)));
                  const cta = pickedHotel ? bookingFor(pickedHotel, `guide-${i}`) : null;
                  return (
                    <div key={i} className="rounded-2xl bg-white border border-gray-200 p-4 shadow-sm">
                      {m ? (
                        <>
                          <p className="text-sm text-gray-600">{m[1]}</p>
                          <p className="mt-1 font-heading font-semibold text-gray-900">→ {pickedName}</p>
                          {cta && (
                            <a href={cta.url} target="_blank" rel="noopener noreferrer nofollow sponsored" className="mt-2 inline-block text-xs font-semibold text-thailand-red hover:underline">
                              {cta.specific ? 'Check rates →' : 'Search on Booking →'}
                            </a>
                          )}
                        </>
                      ) : (
                        <p className="text-gray-800">{line}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Ranked picks */}
          {data.aiContent.ranking && data.aiContent.ranking.length > 0 ? (
            <section>
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-6">Our top {categoryLabel} picks</h2>
              <ol className="space-y-4">
                {data.aiContent.ranking.map(r => {
                  const cta = bookingFor(hotelByName(r.name), `rank-${r.rank}`);
                  const isTop = r.rank === 1;
                  return (
                    <li key={r.rank} className={isTop
                      ? "rounded-2xl bg-white p-6 shadow-lg border-2 border-thailand-red ring-4 ring-thailand-red/10"
                      : "rounded-2xl bg-white p-5 shadow-sm border-l-4 border-thailand-blue"}>
                      {isTop && (
                        <span className="inline-block mb-2 rounded-full bg-thailand-red text-white text-xs font-bold uppercase tracking-wide px-3 py-1">
                          ⭐ Best overall choice
                        </span>
                      )}
                      <div className="flex items-baseline gap-3">
                        <span className={isTop ? "text-3xl font-bold text-thailand-red" : "text-2xl font-bold text-thailand-red"}>#{r.rank}</span>
                        <h3 className={isTop ? "font-heading text-2xl font-bold text-gray-900" : "font-heading text-xl font-bold text-gray-900"}>{r.name}</h3>
                      </div>
                      <p className="mt-2 text-gray-700">{r.why}</p>

                      {r.localSignals && r.localSignals.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {r.localSignals.map((s, i) => (
                            <span key={i} className="rounded-full bg-gray-100 text-gray-700 text-xs px-3 py-1">📍 {s}</span>
                          ))}
                        </div>
                      )}

                      <p className="mt-3 text-sm text-gray-600"><span className="font-semibold">Drawback:</span> {r.drawback}</p>
                      {r.skipIf && (
                        <p className="mt-1 text-sm text-amber-700 bg-amber-50 border-l-2 border-amber-400 px-3 py-2 rounded">
                          <span className="font-semibold">✗ </span>{r.skipIf}
                        </p>
                      )}
                      {r.travellerNote && (
                        <p className="mt-3 text-sm italic text-gray-700 border-l-4 border-gray-200 pl-3">
                          💬 {r.travellerNote}
                        </p>
                      )}

                      {cta && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          <a href={cta.url} target="_blank" rel="noopener noreferrer nofollow sponsored" className={isTop
                            ? "inline-flex items-center rounded-full bg-thailand-red text-white px-6 py-3 text-base font-semibold hover:bg-red-700 shadow"
                            : "inline-flex items-center rounded-full bg-thailand-red text-white px-4 py-2 text-sm font-semibold hover:bg-red-700"}>
                            {cta.specific ? <>View hotel &amp; rates →</> : <>Search {r.name} on Booking →</>}
                          </a>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ol>
            </section>
          ) : data.aiContent.decisionSupport && (
            <section>
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">Which {categoryLabel} hotel suits you?</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{data.aiContent.decisionSupport}</p>
            </section>
          )}

          {/* Hotel cards */}
          <section id="hotels">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-6">Top {Math.min(5, data.hotels.length)} {categoryLabel} hotels we recommend</h2>
            <div className="space-y-6">
              {data.hotels.slice(0, 5).map((h, idx) => renderHotelCard(h, idx))}
            </div>
            {data.hotels.length > 5 && (
              <details className="mt-6 group">
                <summary className="cursor-pointer rounded-full bg-white border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50 inline-block">
                  Show {data.hotels.length - 5} more {categoryLabel} hotels →
                </summary>
                <div className="mt-6 space-y-6">
                  {data.hotels.slice(5).map((h, idx) => renderHotelCard(h, idx + 5))}
                </div>
              </details>
            )}
            <p className="mt-4 text-xs text-gray-500">Some links above are affiliate links — we may earn a small commission at no extra cost to you.</p>
          </section>

          {/* Booking tips */}
          {data.aiContent.bookingTips && data.aiContent.bookingTips.length > 0 && (
            <section className="rounded-2xl bg-amber-50 border border-amber-200 p-6">
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">Booking tips for {categoryLabel} hotels in {data.cityName}</h2>
              <ul className="space-y-2 text-gray-800">
                {data.aiContent.bookingTips.map((tip, i) => (
                  <li key={i} className="flex gap-2"><span className="text-amber-600 font-bold">→</span><span>{tip}</span></li>
                ))}
              </ul>
            </section>
          )}

          {/* FAQ */}
          {data.aiContent.faq.length > 0 && (
            <section>
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-6">Frequently asked questions</h2>
              <div className="space-y-4">
                {data.aiContent.faq.map((f, i) => (
                  <details key={i} className="rounded-2xl bg-white p-5 shadow-sm">
                    <summary className="font-semibold text-gray-900 cursor-pointer">{f.q}</summary>
                    <p className="mt-3 text-gray-700 leading-relaxed">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* Methodology + cluster sources (EEAT) */}
          {data.aiContent.methodology && (
            <section className="rounded-2xl bg-gray-50 border border-gray-200 p-6">
              <h2 className="font-heading text-lg font-bold text-gray-900 mb-2">How we picked these hotels</h2>
              <p className="text-sm text-gray-700 leading-relaxed">{data.aiContent.methodology}</p>
              {(() => {
                const sources = Array.from(new Set(
                  (data.hotels || []).flatMap(h => (h.sources || []).map(s => s.sourceName).filter(Boolean))
                )) as string[];
                return sources.length > 0 ? (
                  <p className="mt-3 text-xs text-gray-600">
                    <span className="font-semibold">Data sources:</span> {sources.slice(0, 5).join(' · ')}
                  </p>
                ) : null;
              })()}
            </section>
          )}

          <FounderNote updatedAt={editorialUpdatedAt} />

          {/* Cross-link */}
          <section className="rounded-2xl bg-thailand-blue/10 p-6">
            <h2 className="font-heading text-xl font-bold text-gray-900">Compare more {data.cityName} hotels</h2>
            <p className="mt-2 text-gray-700">Browse every category, compare neighbourhoods, or read the full {data.cityName} travel guide.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href={`/best-hotels/${data.citySlug}/`} className="rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">All hotels in {data.cityName}</Link>
              <Link href={`/guides/where-to-stay/${data.citySlug}/`} className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">Where to stay (areas)</Link>
              <Link href={`/city/${data.citySlug}/`} className="rounded-full bg-white text-gray-900 border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50">{data.cityName} travel guide</Link>
            </div>
          </section>

          {/* Plan the rest of your trip — affiliate activities/transport */}
          {aff && (
            <section className="rounded-2xl bg-amber-50 border border-amber-200 p-6">
              <h2 className="font-heading text-xl font-bold text-gray-900">Plan the rest of your {data.cityName} trip</h2>
              <p className="mt-2 text-gray-700">Book tours, transfers, and activities while you sort out where to sleep.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href={withPlacementSubId(aff.klook, subId, 'activities-klook')} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">🎟️ Activities & tours (Klook)</a>
                <a href={withPlacementSubId(aff.getyourguide, subId, 'activities-gyg')} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-white text-thailand-red border border-thailand-red px-5 py-2 text-sm font-semibold hover:bg-thailand-red hover:text-white">🎫 Tours (GetYourGuide)</a>
                <a href={withPlacementSubId(aff.twelveGo, subId, 'transport-12go')} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-white text-gray-900 border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50">🚌 Transport (12Go)</a>
              </div>
            </section>
          )}
        </main>
      </div>

      {/* Sticky mobile CTA — only visible on small screens, only when we have a top-pick link */}
      {topPickHotel && (() => {
        const cta = bookingFor(topPickHotel, 'sticky-mobile');
        if (!cta) return null;
        return (
          <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg px-3 py-2">
            <a href={cta.url} target="_blank" rel="noopener noreferrer nofollow sponsored" className="flex items-center justify-center gap-2 w-full rounded-full bg-thailand-red text-white px-4 py-3 text-sm font-semibold hover:bg-red-700">
              {cta.specific ? <>Check availability – {data.aiContent.topPick} →</> : <>Search {categoryLabel} hotels in {data.cityName} →</>}
            </a>
          </div>
        );
      })()}
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const dir = path.join(process.cwd(), 'data', 'pseo', 'best-hotels');
  const paths: { params: { slug: string; category: string } }[] = [];
  if (fs.existsSync(dir)) {
    for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.json'))) {
      try {
        const data = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
        if (data.citySlug && data.category) {
          paths.push({ params: { slug: data.citySlug, category: data.category } });
        }
      } catch { /* skip */ }
    }
  }
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const city = params?.slug as string;
  const category = params?.category as string;
  const file = path.join(process.cwd(), 'data', 'pseo', 'best-hotels', `${city}-${category}.json`);
  if (!fs.existsSync(file)) return { notFound: true, revalidate: 60 };
  const data = JSON.parse(fs.readFileSync(file, 'utf8')) as PseoData;
  return { props: { data }, revalidate: 604800 };
};
