import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import { withSubId, KLOOK_GENERIC, TWELVEGO_GENERIC } from '../../lib/affiliates';
import { useSubId } from '../../lib/useSubId';

interface Route {
  code: string;
  from: string;
  fromName: string;
  duration: string;
  stops: string;
  frequency: string;
  airlines: string[];
  priceBand: string;
  tier: 'domestic' | 'regional' | 'long-haul' | 'search';
  partnerUrl: string;
  notes: string;
}

interface Props {
  routes: Route[];
  lastUpdated: string;
}

const TIER_LABEL: Record<string, string> = {
  domestic: 'From Thailand',
  regional: 'From Asia',
  'long-haul': 'Long-haul (direct + 1 stop)',
};

export default function FlightsToBangkokPage({ routes, lastUpdated }: Props) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const subId = useSubId();

  const tiers: Array<'domestic' | 'regional' | 'long-haul'> = ['domestic', 'regional', 'long-haul'];
  const grouped = tiers.reduce<Record<string, Route[]>>((acc, t) => {
    acc[t] = routes.filter(r => r.tier === t);
    return acc;
  }, {});
  const generic = routes.find(r => r.tier === 'search');
  const nonSearchCount = routes.filter(r => r.tier !== 'search').length;

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Flights to Bangkok', href: '/flights-to-bangkok/' },
  ];

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, i) => ({
      '@type': 'ListItem', position: i + 1, name: b.name,
      item: `https://go2-thailand.com${b.href}`,
    })),
  };

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Routes to Bangkok (BKK + DMK)',
    itemListElement: routes.filter(r => r.tier !== 'search').map((r, i) => ({
      '@type': 'ListItem', position: i + 1,
      name: `${r.fromName} (${r.from}) → Bangkok (BKK)`,
      url: `https://go2-thailand.com/flights-to-bangkok/#${r.code}`,
    })),
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'When is the cheapest time to fly to Bangkok?',
        acceptedAnswer: { '@type': 'Answer', text: 'May to early October (low season — south-west monsoon) prices drop 25–40% on most routes. The absolute cheapest fares cluster in mid-September and early November (just before high season starts) and again in late May/early June. Christmas/New Year, Chinese New Year (late Jan/early Feb) and Songkran (mid-April) are most expensive — book 4–6 months ahead for those windows.' }
      },
      {
        '@type': 'Question',
        name: 'What is the longest direct flight to Bangkok?',
        acceptedAnswer: { '@type': 'Answer', text: 'Thai Airways and EVA Air both operate non-stop flights from London Heathrow (LHR) to Bangkok at around 11–12 hours. KLM flies non-stop daily from Amsterdam (~11h), and Lufthansa from Frankfurt (~10.5h). The longest scheduled non-stop into BKK is Thai Airways from London at roughly 12 hours westbound. There is no non-stop service from any US city — all American routings include at least one Asian or Middle Eastern stop.' }
      },
      {
        '@type': 'Question',
        name: 'How do I get from Suvarnabhumi (BKK) to central Bangkok?',
        acceptedAnswer: { '@type': 'Answer', text: 'Three main options. The Airport Rail Link train runs every 10–15 minutes to Phaya Thai BTS station (~26 minutes, 45 THB) — fastest in traffic. Public taxi from the official rank costs 250–450 THB metered to most central areas plus 70 THB expressway tolls and 50 THB airport surcharge — around 30–60 minutes depending on traffic. Grab/Bolt rideshare runs 350–550 THB. From Don Mueang (DMK), the A1 bus to Mo Chit BTS is the cheapest option at 30 THB, or 250–400 THB by taxi.' }
      },
      {
        '@type': 'Question',
        name: 'When should I book flights to Bangkok?',
        acceptedAnswer: { '@type': 'Answer', text: 'Domestic routes inside Thailand: 4–6 weeks ahead is the sweet spot. Regional flights from Asia (Singapore, KL, HK, Seoul, Tokyo): 6–10 weeks ahead. Long-haul from Europe and Australia: 3–4 months ahead for high season (Nov–Apr); 1–2 months for low season. From the US: 4 months ahead is ideal — fares fluctuate widely but rarely drop in the final 6 weeks. Tuesday and Wednesday departures are typically 15–25% cheaper than weekends across all routes.' }
      },
      {
        '@type': 'Question',
        name: 'Tips for layovers in Bangkok between flights?',
        acceptedAnswer: { '@type': 'Answer', text: 'If your layover is at Suvarnabhumi (BKK) and is at least 8 hours, you can leave the airport — most nationalities get visa-on-arrival or visa-free entry. Use the Airport Rail Link to reach a central hotel for a quick rest, or pay for a transit hotel inside Concourse G. For shorter layovers (3–6 hours), the Miracle Lounges and Coral lounges accept Priority Pass. If you fly into BKK and out from DMK (or vice versa), allow 4 hours minimum between flights — the airports are 50 km apart and the official shuttle takes 60–90 minutes including traffic. The free shuttle is more reliable than taxis for cross-airport transfers.' }
      },
    ],
  };

  return (
    <>
      <SEOHead
        title="Flights to Bangkok: 19 Routes Compared (2026)"
        description="Compare flights to Bangkok (BKK + DMK) from Singapore, KL, Hong Kong, Tokyo, LAX, JFK, London, Amsterdam and 11 more origins. Durations, airlines, fares."
      >
        <link rel="canonical" href="https://go2-thailand.com/flights-to-bangkok/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        <section className="bg-thailand-blue text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Breadcrumbs items={breadcrumbs} />
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-white/75">Flight comparison</p>
            <h1 className="font-heading text-3xl lg:text-5xl font-bold mt-2">
              {/* H1 different from title per SEO playbook */}
              How to Fly to Bangkok: {nonSearchCount} Direct & Connecting Routes
            </h1>
            <p className="mt-4 text-lg lg:text-xl max-w-3xl opacity-95">
              Suvarnabhumi (BKK) handled 60+ million passengers in 2024 and Don Mueang (DMK) another 30+ million — together Thailand&apos;s primary global gateway. Here&apos;s every route worth knowing — durations, airlines, typical fares, and when to book.
            </p>
            {generic && (
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={withSubId(generic.partnerUrl, subId)}
                  target="_blank"
                  rel="noopener noreferrer nofollow sponsored"
                  className="rounded-full bg-thailand-red text-white px-6 py-3 text-base font-semibold hover:bg-red-700 shadow-lg"
                >
                  Search all flights to Bangkok on Trip.com →
                </a>
                <span className="text-sm opacity-80">Updated {new Date(lastUpdated).toLocaleDateString('en', { year: 'numeric', month: 'long' })}</span>
              </div>
            )}
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-xs opacity-90">
              <span>✔ All {nonSearchCount} routes verified May 2026</span>
              <span>✔ BKK + DMK both covered</span>
              <span>✔ 30-day cookie tracking</span>
              <span>✔ Honest airline notes</span>
            </div>
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          {/* Comparison table */}
          <section id="comparison">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-2">Quick comparison: {nonSearchCount} routes to Bangkok</h2>
            <p className="text-gray-600 mb-6">Click any city name to search live flights on Trip.com (30-day cookie tracking — we earn a small commission at no extra cost to you).</p>
            <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="text-left font-semibold px-4 py-3">From</th>
                    <th className="text-left font-semibold px-4 py-3">IATA</th>
                    <th className="text-left font-semibold px-4 py-3">Duration</th>
                    <th className="text-left font-semibold px-4 py-3">Stops</th>
                    <th className="text-left font-semibold px-4 py-3">Price band</th>
                    <th className="text-left font-semibold px-4 py-3">Find flights</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {routes.filter(r => r.tier !== 'search').map((r) => (
                    <tr key={r.code} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-semibold">
                        <a href={withSubId(r.partnerUrl, subId)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-thailand-blue hover:text-thailand-red hover:underline">
                          {r.fromName}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-gray-700 font-mono text-xs">{r.from} → BKK</td>
                      <td className="px-4 py-3 text-gray-700">{r.duration}</td>
                      <td className="px-4 py-3 text-gray-700">{r.stops}</td>
                      <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{r.priceBand}</td>
                      <td className="px-4 py-3">
                        <a href={withSubId(r.partnerUrl, subId)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-thailand-red font-semibold hover:underline whitespace-nowrap">Check price →</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-gray-500">Prices are typical low-to-high bands in 2026 economy class — not promotional fares. Always confirm at booking.</p>
          </section>

          {/* Detailed sections per tier */}
          {tiers.map(tier => {
            const tierRoutes = grouped[tier];
            if (!tierRoutes || tierRoutes.length === 0) return null;
            return (
              <section key={tier}>
                <h2 className="font-heading text-2xl font-bold text-gray-900 mb-6">{TIER_LABEL[tier]}</h2>
                <div className="space-y-5">
                  {tierRoutes.map((r) => (
                    <article key={r.code} id={r.code} className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                      <div className="flex flex-wrap items-baseline gap-3 mb-2">
                        <h3 className="font-heading text-xl font-bold text-gray-900">
                          <a href={withSubId(r.partnerUrl, subId)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="hover:text-thailand-red">
                            {r.fromName} → Bangkok
                          </a>
                        </h3>
                        <span className="rounded-full bg-thailand-blue/10 text-thailand-blue px-3 py-1 text-xs font-semibold uppercase tracking-wide">{r.from} → BKK</span>
                      </div>
                      <div className="grid sm:grid-cols-3 gap-4 text-sm mb-3">
                        <div>
                          <p className="text-xs uppercase text-gray-500 font-semibold">Duration</p>
                          <p className="font-semibold text-gray-900">{r.duration}</p>
                        </div>
                        <div>
                          <p className="text-xs uppercase text-gray-500 font-semibold">Frequency</p>
                          <p className="text-gray-700">{r.frequency}</p>
                        </div>
                        <div>
                          <p className="text-xs uppercase text-gray-500 font-semibold">Typical price</p>
                          <p className="text-gray-700">{r.priceBand}</p>
                        </div>
                      </div>
                      <div className="text-sm mb-3">
                        <span className="text-xs uppercase text-gray-500 font-semibold">Airlines: </span>
                        <span className="text-gray-700">{r.airlines.join(' · ')}</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed mb-4">{r.notes}</p>
                      <a
                        href={withSubId(r.partnerUrl, subId)}
                        target="_blank"
                        rel="noopener noreferrer nofollow sponsored"
                        className="inline-flex items-center rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700"
                      >
                        Find flights {r.fromName} → Bangkok →
                      </a>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}

          {/* Buyer's guide — when/how to book */}
          <section className="rounded-2xl bg-amber-50 border border-amber-200 p-6">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">When to book flights to Bangkok</h2>
            <ul className="space-y-3 text-gray-800">
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>Domestic (CNX/HKT/USM/KBV):</strong> 4–6 weeks ahead is ideal. Last-minute fares (within 7 days) sometimes match advance prices on Thai VietJet but rarely beat them.</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>Regional (Singapore/KL/HKG/Seoul/Tokyo):</strong> 6–10 weeks ahead. Tuesday and Wednesday departures usually 20–30% cheaper than weekends.</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>Long-haul (LHR/AMS/FRA/LAX/JFK):</strong> 3–4 months ahead for high season (Nov–Apr); 1–2 months for low season. Direct LHR/AMS/FRA flights sell out earlier than 1-stop options.</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>Best months for cheapest fares:</strong> mid-September through early November (just before high season) and again May–early June (post Songkran, pre-summer European travel).</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>Avoid:</strong> Christmas/New Year week (rates 2–3x normal), Chinese New Year (Jan/Feb), Songkran (mid-April) and Loy Krathong (November). Book 4–6 months out for these dates if you must travel.</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>BKK vs DMK:</strong> Suvarnabhumi (BKK) for most international airlines and full-service domestic; Don Mueang (DMK) for AirAsia, Nok Air, Thai Lion Air budget flights. DMK is often $20–50 cheaper per leg but check baggage fees.</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>Tourist tax (2026):</strong> Thailand&apos;s 300 THB air-arrival entry fee is being fast-tracked. Confirm at time of booking whether it&apos;s active and collected by the airline at ticket purchase.</span></li>
            </ul>
          </section>

          {/* Bangkok Airport practicals */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">Bangkok&apos;s two airports: BKK + DMK</h2>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">Suvarnabhumi (BKK) — main hub</h3>
                <p className="text-gray-700 text-sm leading-relaxed">25 km east of central Bangkok, single integrated terminal. Most international airlines (Thai Airways, Singapore Airlines, Emirates, Qatar, KLM, Lufthansa, EVA Air, Cathay) plus Thai Smile, Bangkok Airways and Thai VietJet domestic. Airport Rail Link to Phaya Thai BTS: 26 min, 45 THB. Taxi to Sukhumvit: 30–60 min, 250–450 THB plus tolls.</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">Don Mueang (DMK) — budget hub</h3>
                <p className="text-gray-700 text-sm leading-relaxed">25 km north of central Bangkok, two terminals (T1 international, T2 domestic). Home to AirAsia, Thai Lion Air, Nok Air. No direct rail link — A1 bus to Mo Chit BTS is the cheapest route (30 THB, 30–45 min). Taxi to Sukhumvit: 250–400 THB plus tolls, 30–60 min.</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">BKK ↔ DMK transfer</h3>
                <p className="text-gray-700 text-sm leading-relaxed">Free official shuttle bus between the two airports for passengers with onward boarding pass — runs every 30 min, takes 60–90 min depending on traffic. Allow 4+ hours between flights for cross-airport transfers. Taxi between airports: ~400 THB but can hit 90+ minutes in rush hour.</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">SIM, customs + entry</h3>
                <p className="text-gray-700 text-sm leading-relaxed">AIS, True and DTAC kiosks in arrivals at both airports — tourist SIM 200–400 THB for 7 days unlimited. Customs allowance: 1L alcohol, 200 cigarettes. Vape/e-cigarettes are illegal — do not bring. Drone import requires Thai CAAT registration before arrival. Most nationalities get visa-free or visa-on-arrival entry.</p>
              </div>
            </div>
          </section>

          {/* Cluster mesh — internal links */}
          <section className="rounded-2xl bg-thailand-blue/10 p-6">
            <h2 className="font-heading text-xl font-bold text-gray-900">Once you&apos;ve booked your flight</h2>
            <p className="mt-2 text-gray-700">Plan the rest of your Bangkok trip:</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/best-hotels/bangkok/" className="rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">🏨 Best hotels in Bangkok</Link>
              <Link href="/where-to-stay/bangkok/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">🗺️ Where to stay (areas)</Link>
              <Link href="/best-hotels/bangkok/family/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">👨‍👩‍👧 Family hotels</Link>
              <Link href="/grand-palace-tickets/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">Grand Palace tickets</Link>
              <Link href="/transport/bangkok-to-chiang-mai/" className="rounded-full bg-white text-gray-900 border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50">Bangkok → Chiang Mai</Link>
              <Link href="/transport/bangkok-to-phuket/" className="rounded-full bg-white text-gray-900 border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50">Bangkok → Phuket</Link>
              <Link href="/city/bangkok/" className="rounded-full bg-white text-gray-900 border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50">Bangkok travel guide</Link>
              <a href={withSubId(KLOOK_GENERIC, subId)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">🎟️ Activities (Klook)</a>
              <a href={withSubId(TWELVEGO_GENERIC, subId)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-white text-gray-900 border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50">🚌 Ground transport (12Go)</a>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">Frequently asked questions</h2>
            <div className="space-y-3">
              {(faqJsonLd.mainEntity as Array<{ name: string; acceptedAnswer: { text: string } }>).map((q, i) => (
                <details key={i} className="rounded-2xl bg-white p-4 shadow-sm border border-gray-200">
                  <summary className="font-semibold text-gray-900 cursor-pointer">{q.name}</summary>
                  <p className="mt-2 text-gray-700 text-sm leading-relaxed">{q.acceptedAnswer.text}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Methodology */}
          <section className="rounded-2xl bg-gray-50 border border-gray-200 p-6 text-sm text-gray-700">
            <h2 className="font-heading text-lg font-bold text-gray-900 mb-2">Methodology</h2>
            <p>Routes verified May 2026 against Trip.com schedules and airline timetables. Price bands are typical economy fares (low-to-high) outside peak weeks, not promotional sales. Duration ranges include minimum reasonable layover time for 1-stop options. We earn a commission when readers book through Trip.com — this never changes the price you pay or the routes we recommend. Last verified May 2026.</p>
          </section>
        </main>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const file = path.join(process.cwd(), 'data', 'pseo', 'flights', 'bangkok-routes.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  return { props: { routes: data.routes, lastUpdated: data.lastUpdated }, revalidate: 604800 };
};
