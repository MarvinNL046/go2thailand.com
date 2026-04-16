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
 * PSEO template: /where-to-stay/[city]/[audience]
 *
 * Reads pre-generated data from data/pseo/where-to-stay/<city>-<audience>.json
 * which is produced by scripts/pseo-build-fase1.mjs (cluster filter + SerpAPI
 * PAA + Grok decision-support text). Page itself stays a thin renderer so we
 * can rebuild content offline without touching layout.
 *
 * If the data file is missing the page returns 404, so we never publish
 * empty programmatic pages.
 */

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

interface FaqItem { q: string; a: string }
interface ComparisonRow { name: string; bestFor: string; priceBand: string; walkability: string; vibe: string; drawback: string }
interface RankingItem { rank: number; name: string; why: string; drawback: string; skipIf?: string; localSignals?: string[]; travellerNote?: string }

interface AiContent {
  intro: string;
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
  template: 'where-to-stay-audience';
  citySlug: string;
  cityName: string;
  audience: string;
  neighborhoods: Neighborhood[];
  paaQuestions: string[];
  aiContent: AiContent;
  lastUpdated?: string;
  generatedAt: string;
}

interface Props {
  data: PseoData;
}

const AUDIENCE_LABELS: Record<string, string> = {
  'first-time': 'first-time visitors',
  family: 'families',
  nightlife: 'nightlife lovers',
  budget: 'budget travellers',
  couples: 'couples',
  luxury: 'luxury travellers',
  'digital-nomads': 'digital nomads',
};

export default function WhereToStayAudiencePage({ data }: Props) {
  const audienceLabel = AUDIENCE_LABELS[data.audience] || data.audience.replace(/-/g, ' ');
  const editorialUpdatedAt = getEditorialUpdatedAt(data);
  const aff = getAffiliates(data.citySlug);
  const subId = `pseo-where-to-stay-${data.citySlug}-${data.audience}`;
  const bookingFor = (placement: string) => aff?.booking ? withPlacementSubId(aff.booking, subId, placement) : null;
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Where to Stay', href: '/guides/where-to-stay/' },
    { name: data.cityName, href: `/guides/where-to-stay/${data.citySlug}/` },
    { name: `For ${audienceLabel}`, href: `/where-to-stay/${data.citySlug}/${data.audience}/` },
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

  return (
    <>
      <SEOHead
        title={data.aiContent.metaTitle}
        description={data.aiContent.metaDescription}
      >
        <link rel="canonical" href={`https://go2-thailand.com/where-to-stay/${data.citySlug}/${data.audience}/`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        <EditorialSchema
          title={data.aiContent.metaTitle}
          url={`https://go2-thailand.com/where-to-stay/${data.citySlug}/${data.audience}/`}
          updatedAt={editorialUpdatedAt}
        />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        <section className="bg-thailand-blue text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Breadcrumbs items={breadcrumbs} />
            <h1 className="font-heading text-3xl lg:text-5xl font-bold mt-4">
              Where to stay in {data.cityName} for {audienceLabel}
            </h1>
            <EditorialMeta updatedAt={editorialUpdatedAt} />
            <p className="mt-4 text-lg opacity-90 max-w-3xl">{data.aiContent.intro}</p>

            {/* Above-the-fold CTA */}
            {data.aiContent.topPick && (
              <div className="mt-6 inline-flex flex-wrap items-center gap-3 rounded-2xl bg-white/10 backdrop-blur px-4 py-3">
                <span className="text-sm opacity-90">Our pick for {audienceLabel}:</span>
                <span className="font-heading font-bold text-lg">{data.aiContent.topPick}</span>
                <Link href={`/best-hotels/${data.citySlug}/`} className="rounded-full bg-white text-thailand-blue px-4 py-1.5 text-sm font-semibold hover:bg-gray-100">View hotels →</Link>
                {(() => {
                  const aff = getAffiliates(data.citySlug);
                  const subId = `pseo-where-to-stay-${data.citySlug}-${data.audience}`;
                  return aff?.booking ? (
                    <a href={withPlacementSubId(aff.booking, subId, 'hero')} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-4 py-1.5 text-sm font-semibold hover:bg-red-700">Check rates in {data.cityName} →</a>
                  ) : null;
                })()}
              </div>
            )}

            {/* Trust mini-block */}
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-xs opacity-90">
              <span>✔ {data.neighborhoods.length} {data.cityName} neighbourhoods compared</span>
              <span>✔ Updated {editorialUpdatedAt ? new Date(editorialUpdatedAt).toLocaleString('en', {month:'short', year:'numeric'}) : 'for 2026'}</span>
              <span>✔ Honest trade-offs per area</span>
              <span>✔ No sponsored placements</span>
            </div>
          </div>
        </section>

        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          {/* Comparison table */}
          {data.aiContent.comparisonTable && data.aiContent.comparisonTable.length > 0 && (
            <section>
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">Quick comparison</h2>
              <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-50 text-gray-700">
                    <tr>
                      <th className="text-left font-semibold px-4 py-3">Neighbourhood</th>
                      <th className="text-left font-semibold px-4 py-3">Best for</th>
                      <th className="text-left font-semibold px-4 py-3">Price</th>
                      <th className="text-left font-semibold px-4 py-3">Walkability</th>
                      <th className="text-left font-semibold px-4 py-3">Vibe</th>
                      <th className="text-left font-semibold px-4 py-3">Watch out for</th>
                      <th className="text-left font-semibold px-4 py-3">Hotels</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {data.aiContent.comparisonTable.map((r, i) => {
                      const url = bookingFor(`table-${i}`);
                      return (
                        <tr key={i} className="hover:bg-gray-50">
                          <td className="px-4 py-3 font-semibold text-gray-900">{r.name}</td>
                          <td className="px-4 py-3 text-gray-700">{r.bestFor}</td>
                          <td className="px-4 py-3 text-gray-700">{r.priceBand}</td>
                          <td className="px-4 py-3 text-gray-700">{r.walkability}</td>
                          <td className="px-4 py-3 text-gray-700">{r.vibe}</td>
                          <td className="px-4 py-3 text-gray-600 italic">{r.drawback}</td>
                          <td className="px-4 py-3">
                            {url && (<a href={url} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-thailand-red font-semibold hover:underline whitespace-nowrap">View →</a>)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Decision guide — If X → choose Y, as clickable cards */}
          {data.aiContent.decisionGuide && data.aiContent.decisionGuide.length > 0 && (
            <section>
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">Quick decision guide</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {data.aiContent.decisionGuide.map((line, i) => {
                  const m = line.match(/^(.+?)[,.]\s*(choose|consider|pick|go for|stay in|try)\s+(.+?)\.?\s*$/i);
                  const pickedName = m ? m[3].trim().replace(/[.]$/, '') : null;
                  const url = bookingFor(`guide-${i}`);
                  return (
                    <div key={i} className="rounded-2xl bg-white border border-gray-200 p-4 shadow-sm">
                      {m ? (
                        <>
                          <p className="text-sm text-gray-600">{m[1]}</p>
                          <p className="mt-1 font-heading font-semibold text-gray-900">→ {pickedName}</p>
                          {url && pickedName && (
                            <a href={url} target="_blank" rel="noopener noreferrer nofollow sponsored" className="mt-2 inline-block text-xs font-semibold text-thailand-red hover:underline">
                              Search hotels in {pickedName} →
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

          {/* Ranked recommendation */}
          {data.aiContent.ranking && data.aiContent.ranking.length > 0 ? (
            <section>
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-6">Our ranking for {audienceLabel}</h2>
              <ol className="space-y-4">
                {data.aiContent.ranking.map(r => {
                  const url = bookingFor(`rank-${r.rank}`);
                  const isTop = r.rank === 1;
                  return (
                    <li key={r.rank} className={isTop
                      ? "rounded-2xl bg-white p-6 shadow-lg border-2 border-thailand-red ring-4 ring-thailand-red/10"
                      : "rounded-2xl bg-white p-5 shadow-sm border-l-4 border-thailand-blue"}>
                      {isTop && (
                        <span className="inline-block mb-2 rounded-full bg-thailand-red text-white text-xs font-bold uppercase tracking-wide px-3 py-1">
                          ⭐ Best overall for {audienceLabel}
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

                      {url && (
                        <a href={url} target="_blank" rel="noopener noreferrer nofollow sponsored" className={isTop
                          ? "mt-4 inline-flex items-center rounded-full bg-thailand-red text-white px-6 py-3 text-base font-semibold hover:bg-red-700 shadow"
                          : "mt-3 inline-flex items-center rounded-full bg-thailand-red text-white px-4 py-2 text-sm font-semibold hover:bg-red-700"}>
                          Search hotels in {r.name} →
                        </a>
                      )}
                    </li>
                  );
                })}
              </ol>
            </section>
          ) : data.aiContent.decisionSupport && (
            <section>
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">Which neighbourhood fits you?</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{data.aiContent.decisionSupport}</p>
            </section>
          )}

          {/* Neighborhood breakdown */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-6">{data.neighborhoods.length} neighbourhoods that suit {audienceLabel}</h2>
            <div className="space-y-6">
              {data.neighborhoods.map((n, idx) => {
                const url = bookingFor(`hood-${idx}`);
                return (
                  <article key={n.name} className="rounded-2xl bg-white p-6 shadow-md">
                    <h3 className="font-heading text-xl font-bold text-gray-900">{n.name}</h3>
                    <p className="mt-2 text-gray-700 leading-relaxed">{n.description}</p>
                    <div className="mt-4 grid sm:grid-cols-2 gap-4 text-sm">
                      <div><p className="font-semibold text-gray-900">Best for</p><p className="text-gray-700">{n.bestFor}</p></div>
                      {n.priceLevel && (<div><p className="font-semibold text-gray-900">Price</p><p className="text-gray-700">{n.priceLevel}</p></div>)}
                    </div>
                    {n.highlights && n.highlights.length > 0 && (
                      <ul className="mt-4 space-y-1 text-sm text-gray-700 list-disc list-inside">
                        {n.highlights.slice(0, 4).map((h, i) => <li key={i}>{h}</li>)}
                      </ul>
                    )}
                    {n.recommendedHotels && n.recommendedHotels.length > 0 && (
                      <p className="mt-4 text-sm text-gray-700">
                        <span className="font-semibold">Recommended hotels:</span> {n.recommendedHotels.join(', ')}
                      </p>
                    )}
                    {url && (
                      <a href={url} target="_blank" rel="noopener noreferrer nofollow sponsored" className="mt-5 inline-flex items-center justify-center rounded-full bg-thailand-blue px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                        Check hotels in {n.name} →
                      </a>
                    )}
                  </article>
                );
              })}
            </div>
          </section>

          {/* Booking tips */}
          {data.aiContent.bookingTips && data.aiContent.bookingTips.length > 0 && (
            <section className="rounded-2xl bg-amber-50 border border-amber-200 p-6">
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">Booking tips for {data.cityName}</h2>
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

          {/* Methodology — E-E-A-T trust block */}
          {data.aiContent.methodology && (
            <section className="rounded-2xl bg-gray-50 border border-gray-200 p-6">
              <h2 className="font-heading text-lg font-bold text-gray-900 mb-2">How we picked these neighbourhoods</h2>
              <p className="text-sm text-gray-700 leading-relaxed">{data.aiContent.methodology}</p>
              {(() => {
                const sources = Array.from(new Set(
                  (data.neighborhoods || []).flatMap(n => (n.sources || []).map(s => s?.sourceName).filter(Boolean))
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
            <h2 className="font-heading text-xl font-bold text-gray-900">Need more {data.cityName} planning help?</h2>
            <p className="mt-2 text-gray-700">Compare every neighbourhood, see best hotels, or read our full {data.cityName} travel guide.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href={`/guides/where-to-stay/${data.citySlug}/`} className="rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">All {data.cityName} neighbourhoods</Link>
              <Link href={`/best-hotels/${data.citySlug}/`} className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">Best hotels in {data.cityName}</Link>
              <Link href={`/city/${data.citySlug}/`} className="rounded-full bg-white text-gray-900 border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50">{data.cityName} travel guide</Link>
            </div>
          </section>

          {(() => {
            const aff = getAffiliates(data.citySlug);
            const subId = `pseo-where-to-stay-${data.citySlug}-${data.audience}`;
            return aff ? (
              <section className="rounded-2xl bg-amber-50 border border-amber-200 p-6">
                <h2 className="font-heading text-xl font-bold text-gray-900">Plan the rest of your {data.cityName} trip</h2>
                <p className="mt-2 text-gray-700">Once you've picked an area, sort hotels, activities, and transport.</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a href={withPlacementSubId(aff.booking, subId, 'plan-booking')} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">🏨 Hotels in {data.cityName} (Booking)</a>
                  <a href={withPlacementSubId(aff.klook, subId, 'plan-klook')} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-white text-thailand-red border border-thailand-red px-5 py-2 text-sm font-semibold hover:bg-thailand-red hover:text-white">🎟️ Activities (Klook)</a>
                  <a href={withPlacementSubId(aff.twelveGo, subId, 'plan-12go')} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-white text-gray-900 border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50">🚌 Transport (12Go)</a>
                </div>
              </section>
            ) : null;
          })()}
        </main>
      </div>

      {/* Sticky mobile CTA */}
      {(() => {
        const url = bookingFor('sticky-mobile');
        if (!url) return null;
        return (
          <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg px-3 py-2">
            <a href={url} target="_blank" rel="noopener noreferrer nofollow sponsored" className="flex items-center justify-center gap-2 w-full rounded-full bg-thailand-red text-white px-4 py-3 text-sm font-semibold hover:bg-red-700">
              {data.aiContent.topPick ? <>Search hotels in {data.aiContent.topPick} →</> : <>Search hotels in {data.cityName} →</>}
            </a>
          </div>
        );
      })()}
    </>
  );
}

// -------------------------------------------------------------------
// Static paths — only the (city, audience) pairs that have a generated
// data file under data/pseo/where-to-stay/. Returning `fallback: 'blocking'`
// means new pseo runs (after the data gen step) become reachable without a
// rebuild, but still 404 for missing combinations.
// -------------------------------------------------------------------

export const getStaticPaths: GetStaticPaths = async () => {
  const dir = path.join(process.cwd(), 'data', 'pseo', 'where-to-stay');
  const paths: { params: { city: string; audience: string } }[] = [];
  if (fs.existsSync(dir)) {
    for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.json'))) {
      // filename pattern: <city>-<audience>.json
      // City slugs may contain hyphens (chiang-mai, koh-samui), audience too
      // (first-time, digital-nomads). We rely on the pseo-build script to
      // also write a {city, audience} pair into the file body and read those
      // here to avoid splitting on the wrong hyphen.
      try {
        const data = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
        if (data.citySlug && data.audience) {
          paths.push({ params: { city: data.citySlug, audience: data.audience } });
        }
      } catch { /* skip */ }
    }
  }
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const city = params?.city as string;
  const audience = params?.audience as string;
  const file = path.join(process.cwd(), 'data', 'pseo', 'where-to-stay', `${city}-${audience}.json`);
  if (!fs.existsSync(file)) return { notFound: true, revalidate: 60 };
  const data = JSON.parse(fs.readFileSync(file, 'utf8')) as PseoData;
  return { props: { data }, revalidate: 604800 };
};
