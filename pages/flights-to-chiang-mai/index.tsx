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
  'long-haul': 'Long-haul (2 stops typical)',
};

export default function FlightsToChiangMaiPage({ routes, lastUpdated }: Props) {
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
    { name: 'Flights to Chiang Mai', href: '/flights-to-chiang-mai/' },
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
    name: 'Routes to Chiang Mai International Airport (CNX)',
    itemListElement: routes.filter(r => r.tier !== 'search').map((r, i) => ({
      '@type': 'ListItem', position: i + 1,
      name: `${r.fromName} (${r.from}) → Chiang Mai (CNX)`,
      url: `https://go2-thailand.com/flights-to-chiang-mai/#${r.code}`,
    })),
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'When is the cheapest time to fly to Chiang Mai?',
        acceptedAnswer: { '@type': 'Answer', text: 'May to early October (low season — green season) prices drop 25–40% on most domestic routes. Mid-September is typically the cheapest single window. Avoid late February through April: that\'s burning season when air quality plummets and many travelers shift dates last-minute. November and December (cool season) are most expensive — book 6–8 weeks ahead.' }
      },
      {
        '@type': 'Question',
        name: 'What is the longest direct flight to Chiang Mai?',
        acceptedAnswer: { '@type': 'Answer', text: 'There are no non-stop flights to Chiang Mai (CNX) from outside Asia. The longest direct route into CNX is Korean Air from Seoul Incheon (ICN) at around 5h 30m — and even that is seasonal, mainly November to March. From outside Asia, expect 2 stops minimum with Bangkok almost always the final connection.' }
      },
      {
        '@type': 'Question',
        name: 'How do I get from Chiang Mai Airport (CNX) to the Old City?',
        acceptedAnswer: { '@type': 'Answer', text: 'CNX is only 4 km southwest of the Old City — one of the closest airport-to-center distances in Asia. Official airport taxi from the rank: 150–200 THB to the Old City, 10–15 minutes. Grab/Bolt rideshare runs 100–150 THB. Songthaew (red shared truck) outside the airport zone: 40 THB per person but you may need to share. Many hotels offer free pickup if you book 24 hours ahead.' }
      },
      {
        '@type': 'Question',
        name: 'When should I book flights to Chiang Mai?',
        acceptedAnswer: { '@type': 'Answer', text: 'Domestic from Bangkok (BKK or DMK): 4–6 weeks ahead is ideal. AirAsia and Thai Lion Air rarely drop below their advance fare in the final 2 weeks. Regional from Singapore/KL/HK: 6–10 weeks ahead. Long-haul (US/Europe): 4 months ahead — book BKK separately and add a $25–80 BKK-CNX hop on AirAsia or Nok Air. This is almost always cheaper than booking through-tickets to CNX from outside Asia.' }
      },
      {
        '@type': 'Question',
        name: 'Tips for layovers in Bangkok when flying to Chiang Mai?',
        acceptedAnswer: { '@type': 'Answer', text: 'If your international flight lands at Suvarnabhumi (BKK) and your CNX flight departs from Don Mueang (DMK) — common with AirAsia/Lion Air bookings — allow 5+ hours between flights. The free shuttle takes 60–90 minutes plus check-in time. If both flights use BKK (Thai Airways, Bangkok Airways, Thai Smile), 2 hours is enough as you stay airside. Avoid the trap of booking separate tickets BKK arrival + DMK departure with only 3 hours connection — flight delays will burn the buffer.' }
      },
    ],
  };

  return (
    <>
      <SEOHead
        title="Flights to Chiang Mai: 14 Routes Compared (2026)"
        description="Compare flights to Chiang Mai (CNX) from Bangkok, Singapore, KL, Hong Kong, Seoul, plus 1+2-stop long-haul from LHR, JFK, LAX. Durations, airlines, fares."
      >
        <link rel="canonical" href="https://go2-thailand.com/flights-to-chiang-mai/" />
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
              Flights to Chiang Mai: {nonSearchCount} Routes Compared (2026)
            </h1>
            <p className="mt-4 text-lg lg:text-xl max-w-3xl opacity-95">
              Chiang Mai International (CNX) handles 11+ million passengers a year, with 60+ daily flights from Bangkok alone. Most international travel is 1–2 stops via Bangkok or another Asian hub — here&apos;s every route worth knowing, with realistic durations and prices.
            </p>
            {generic && (
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={withSubId(generic.partnerUrl, subId)}
                  target="_blank"
                  rel="noopener noreferrer nofollow sponsored"
                  className="rounded-full bg-thailand-red text-white px-6 py-3 text-base font-semibold hover:bg-red-700 shadow-lg"
                >
                  Search all flights to Chiang Mai on Trip.com →
                </a>
                <span className="text-sm opacity-80">Updated {new Date(lastUpdated).toLocaleDateString('en', { year: 'numeric', month: 'long' })}</span>
              </div>
            )}
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-xs opacity-90">
              <span>✔ All {nonSearchCount} routes verified May 2026</span>
              <span>✔ Direct + connecting options</span>
              <span>✔ 30-day cookie tracking</span>
              <span>✔ Honest airline notes</span>
            </div>
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          {/* Comparison table */}
          <section id="comparison">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-2">Quick comparison: {nonSearchCount} routes to Chiang Mai</h2>
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
                      <td className="px-4 py-3 text-gray-700 font-mono text-xs">{r.from} → CNX</td>
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
                            {r.fromName} → Chiang Mai
                          </a>
                        </h3>
                        <span className="rounded-full bg-thailand-blue/10 text-thailand-blue px-3 py-1 text-xs font-semibold uppercase tracking-wide">{r.from} → CNX</span>
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
                        Find flights {r.fromName} → Chiang Mai →
                      </a>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}

          {/* Buyer's guide — when/how to book */}
          <section className="rounded-2xl bg-amber-50 border border-amber-200 p-6">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">When to book flights to Chiang Mai</h2>
            <ul className="space-y-3 text-gray-800">
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>Domestic from Bangkok (BKK/DMK):</strong> 4–6 weeks ahead is ideal. AirAsia and Thai Lion Air rarely drop in the final 2 weeks. DMK fares typically $15–25 cheaper than BKK on the same day.</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>Regional (Singapore/KL/HKG):</strong> 6–10 weeks ahead. Direct flights are far less frequent than to Bangkok — book early or accept a Bangkok connection.</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>Long-haul (LHR/AMS/LAX/JFK):</strong> Almost always cheaper to book your long-haul to Bangkok and add a separate domestic ticket BKK–CNX (~$25–80 on AirAsia/Lion Air). Through-tickets via Asian carriers can be smoother but often $200+ more expensive.</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>Best months for cheapest fares:</strong> mid-May to early July, and September. Avoid November–December (cool season peak) and late February–April (burning season is bad but airfares stay high until the last minute).</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>Avoid:</strong> Yi Peng / Loy Krathong (lantern festival, November) — Chiang Mai sells out 4+ months ahead. Christmas/New Year, Chinese New Year, Songkran (mid-April) all premium-priced.</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>Burning season warning:</strong> February–April PM2.5 levels regularly hit hazardous (300+). If you have asthma or sensitive lungs, consider flying in November–January or June–September instead.</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>Tourist tax (2026):</strong> Thailand&apos;s 300 THB air-arrival entry fee is being fast-tracked. Confirm at time of booking whether it&apos;s active and collected by the airline at ticket purchase.</span></li>
            </ul>
          </section>

          {/* Chiang Mai Airport practicals */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">Chiang Mai Airport (CNX) basics</h2>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">Location + transfer</h3>
                <p className="text-gray-700 text-sm leading-relaxed">CNX is one of Asia&apos;s closest airports to a city center — only 4 km from the Old City moat. Transfer times: Old City 10–15 min · Nimmanhaemin 10–15 min · Hang Dong/Doi Suthep 20–30 min · Mae Rim 30–40 min. Official airport taxi 150–200 THB to most central areas; Grab/Bolt 100–150 THB.</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">Terminal info</h3>
                <p className="text-gray-700 text-sm leading-relaxed">Single integrated terminal handles both domestic and international flights. Separate piers for each but easy walk between. Allow 60 minutes for domestic, 90 minutes for international check-in. The airport is small enough that connections are simple — no shuttle needed.</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">SIM + connectivity</h3>
                <p className="text-gray-700 text-sm leading-relaxed">AIS, True and DTAC kiosks in arrivals — tourist SIM 200–400 THB for 7 days unlimited. Or pre-buy an eSIM before you fly to skip the kiosk queue. Free airport WiFi works after a quick SMS verification.</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">Baggage + customs</h3>
                <p className="text-gray-700 text-sm leading-relaxed">Thai customs allowance: 1L alcohol, 200 cigarettes, plus personal effects. Drone import requires Thai CAAT registration before arrival. Vape/e-cigarettes are illegal — do not bring. International arrivals usually clear immigration in 20–40 minutes.</p>
              </div>
            </div>
          </section>

          {/* Cluster mesh — internal links */}
          <section className="rounded-2xl bg-thailand-blue/10 p-6">
            <h2 className="font-heading text-xl font-bold text-gray-900">Once you&apos;ve booked your flight</h2>
            <p className="mt-2 text-gray-700">Plan the rest of your Chiang Mai trip:</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/best-hotels/chiang-mai/" className="rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">🏨 Best hotels in Chiang Mai</Link>
              <Link href="/where-to-stay/chiang-mai/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">🗺️ Where to stay (areas)</Link>
              <Link href="/best-hotels/chiang-mai/family/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">👨‍👩‍👧 Family hotels</Link>
              <Link href="/chiang-mai-elephant-sanctuary/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">🐘 Elephant sanctuary</Link>
              <Link href="/transport/bangkok-to-chiang-mai/" className="rounded-full bg-white text-gray-900 border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50">Bangkok → Chiang Mai alternatives</Link>
              <Link href="/city/chiang-mai/" className="rounded-full bg-white text-gray-900 border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50">Chiang Mai travel guide</Link>
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
            <p>Routes verified May 2026 against Trip.com schedules and airline timetables. Price bands are typical economy fares (low-to-high) outside peak weeks, not promotional sales. Duration ranges include minimum reasonable layover time for 1- and 2-stop options. We earn a commission when readers book through Trip.com — this never changes the price you pay or the routes we recommend. Last verified May 2026.</p>
          </section>
        </main>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const file = path.join(process.cwd(), 'data', 'pseo', 'flights', 'chiang-mai-routes.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  return { props: { routes: data.routes, lastUpdated: data.lastUpdated }, revalidate: 604800 };
};
