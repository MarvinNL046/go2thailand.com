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

const tierLabel = (tier: string, isNl: boolean): string => {
  if (isNl) {
    switch (tier) {
      case 'domestic': return 'Vanuit Thailand';
      case 'regional': return 'Vanuit Azië';
      case 'long-haul': return 'Intercontinentaal (1+ tussenstops)';
      default: return '';
    }
  }
  switch (tier) {
    case 'domestic': return 'From Thailand';
    case 'regional': return 'From Asia';
    case 'long-haul': return 'Long-haul (1+ stops)';
    default: return '';
  }
};

export default function FlightsToPhuketPage({ routes, lastUpdated }: Props) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const subId = useSubId();

  const tiers: Array<'domestic' | 'regional' | 'long-haul'> = ['domestic', 'regional', 'long-haul'];
  const grouped = tiers.reduce<Record<string, Route[]>>((acc, t) => {
    acc[t] = routes.filter(r => r.tier === t);
    return acc;
  }, {});
  const generic = routes.find(r => r.tier === 'search');

  const breadcrumbs = [
    { name: isNl ? 'Home' : 'Home', href: '/' },
    { name: isNl ? 'Vluchten naar Phuket' : 'Flights to Phuket', href: '/flights-to-phuket/' },
  ];

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, i) => ({
      '@type': 'ListItem', position: i + 1, name: b.name,
      item: `https://go2-thailand.com${isNl ? '/nl' : ''}${b.href}`,
    })),
  };

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: isNl ? 'Routes naar Phuket International Airport' : 'Routes to Phuket International Airport',
    itemListElement: routes.filter(r => r.tier !== 'search').map((r, i) => ({
      '@type': 'ListItem', position: i + 1,
      name: `${r.fromName} (${r.from}) → Phuket (HKT)`,
      url: `https://go2-thailand.com${isNl ? '/nl' : ''}/flights-to-phuket/#${r.code}`,
    })),
  };

  const faqEn = [
    {
      name: 'When is the cheapest time to fly to Phuket?',
      answer: 'May to October (low season — south-west monsoon) prices drop 30–50% on most routes. The absolute cheapest fares cluster in mid-September and early November (just before high season starts). Christmas/New Year and Chinese New Year are most expensive — book 4–6 months ahead for those dates.'
    },
    {
      name: 'How long is the flight from Bangkok to Phuket?',
      answer: 'Direct flights from Bangkok (BKK or DMK) take 1h 30m. There are 30+ daily flights from BKK and 20+ from DMK across Thai Airways, Bangkok Airways, AirAsia, Thai VietJet, Nok Air and Thai Lion Air. Total journey time including airport check-in and transfer to your Phuket hotel is typically 4–5 hours.'
    },
    {
      name: 'Can you fly directly from the US to Phuket?',
      answer: 'No — there are no non-stop flights from any US city to Phuket. All routes have at least one stop, typically in Bangkok (BKK), Hong Kong (HKG), Singapore (SIN), Taipei (TPE), Doha (DOH), or Dubai (DXB). Most LAX/SFO travelers connect via Taipei (EVA Air) or Hong Kong; JFK travelers usually connect via Doha (Qatar) or Dubai (Emirates).'
    },
    {
      name: 'Is Phuket Airport (HKT) close to Patong?',
      answer: 'No — Phuket International Airport sits at the north end of the island; Patong is a 45–60 minute drive south. Karon and Kata are 60–75 minutes. Mai Khao Beach hotels are the closest to the airport (10–20 minutes). Budget for a 600–1,200 THB metered taxi or pre-book an airport transfer through your hotel for fixed pricing.'
    },
    {
      name: 'Should I book direct or via a search engine?',
      answer: 'For domestic Thailand routes (Bangkok / Chiang Mai / Koh Samui to Phuket), search engines like Trip.com or Skyscanner usually beat direct booking. For long-haul flights, comparing both is worth the 5 minutes — sometimes the airline\'s direct site has slightly better prices or includes seat selection that costs extra elsewhere. Always check baggage allowances before booking the cheapest fare.'
    },
  ];

  const faqNl = [
    {
      name: 'Wanneer is de goedkoopste tijd om naar Phuket te vliegen?',
      answer: 'Van mei tot oktober (laagseizoen — zuidwestmoesson) zakken de prijzen op de meeste routes 30–50%. De allerlaagste tarieven vind je rond half september en begin november (net voor het hoogseizoen begint). Kerst/Oud & Nieuw en Chinees Nieuwjaar zijn het duurst — boek voor die periodes 4–6 maanden van tevoren.'
    },
    {
      name: 'Hoe lang duurt een vlucht van Bangkok naar Phuket?',
      answer: 'Directe vluchten vanuit Bangkok (BKK of DMK) duren 1u 30m. Vanaf BKK zijn er 30+ vluchten per dag en vanaf DMK 20+, met Thai Airways, Bangkok Airways, AirAsia, Thai VietJet, Nok Air en Thai Lion Air. De totale reistijd inclusief inchecken en transfer naar je hotel in Phuket is meestal 4–5 uur.'
    },
    {
      name: 'Kun je rechtstreeks vanuit de VS naar Phuket vliegen?',
      answer: 'Nee — er zijn geen rechtstreekse vluchten vanuit een Amerikaanse stad naar Phuket. Alle routes hebben minstens één tussenstop, meestal in Bangkok (BKK), Hong Kong (HKG), Singapore (SIN), Taipei (TPE), Doha (DOH) of Dubai (DXB). Reizigers vanuit LAX/SFO vliegen meestal via Taipei (EVA Air) of Hong Kong; vanuit JFK gaat het vaak via Doha (Qatar) of Dubai (Emirates).'
    },
    {
      name: 'Ligt Phuket Airport (HKT) dicht bij Patong?',
      answer: 'Nee — Phuket International Airport ligt aan de noordkant van het eiland; naar Patong is het 45–60 minuten rijden naar het zuiden. Karon en Kata zijn 60–75 minuten. Hotels bij Mai Khao Beach liggen het dichtst bij de luchthaven (10–20 minuten). Reken op 600–1.200 THB voor een taxi met meter, of boek een transfer via je hotel voor een vaste prijs.'
    },
    {
      name: 'Boek je direct of via een zoekmachine?',
      answer: 'Voor binnenlandse Thaise routes (Bangkok / Chiang Mai / Koh Samui naar Phuket) zijn zoekmachines zoals Trip.com of Skyscanner meestal goedkoper dan rechtstreeks bij de airline boeken. Voor langeafstandsvluchten is het de moeite waard om beide te vergelijken — soms heeft de site van de airline iets betere prijzen of zit stoelkeuze er gratis bij. Check altijd de bagageregels voor je het goedkoopste ticket boekt.'
    },
  ];

  const faqList = isNl ? faqNl : faqEn;

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqList.map(q => ({
      '@type': 'Question',
      name: q.name,
      acceptedAnswer: { '@type': 'Answer', text: q.answer },
    })),
  };

  const seoTitle = isNl
    ? 'Vluchten naar Phuket: 15 Routes Vergeleken (2026)'
    : 'Flights to Phuket Thailand: 15 Routes Compared (2026)';
  const seoDescription = isNl
    ? 'Vergelijk vluchten naar Phuket (HKT) vanuit Amsterdam, Bangkok, Singapore, Dubai en 11 andere steden. Reistijden, airlines, typische prijzen en wanneer boeken.'
    : 'Compare flights to Phuket (HKT) from Bangkok, Chiang Mai, Singapore, LAX, JFK and 11 more origins. Durations, airlines, typical price bands, when to book.';

  const dateLocale = isNl ? 'nl-NL' : 'en';
  const updatedLabel = isNl ? 'Bijgewerkt' : 'Updated';

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
      >
        <link rel="canonical" href={`https://go2-thailand.com${isNl ? '/nl' : ''}/flights-to-phuket/`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        <section className="bg-thailand-blue text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Breadcrumbs items={breadcrumbs} />
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-white/75">
              {isNl ? 'Vluchten vergelijken' : 'Flight comparison'}
            </p>
            <h1 className="font-heading text-3xl lg:text-5xl font-bold mt-2">
              {/* H1 different from title to vary keyword variations per SEO playbook */}
              {isNl
                ? 'Hoe vlieg je naar Phuket? 15 Routes vanuit de hele wereld'
                : 'How to Fly to Phuket: 15 Routes from Around the World'}
            </h1>
            <p className="mt-4 text-lg lg:text-xl max-w-3xl opacity-95">
              {isNl
                ? 'Phuket International (HKT) verwerkt 300+ vluchten per dag vanuit 9 directe Aziatische hubs en is met 1 tussenstop bereikbaar vanuit 60+ internationale steden. Hier vind je elke route die het waard is om te kennen — reistijden, airlines, typische prijzen en wanneer je het beste boekt.'
                : 'Phuket International (HKT) handles 300+ daily flights from 9 direct Asian hubs and 1-stop access from 60+ international cities. Here’s every route worth knowing — durations, airlines, typical fares, and when to book each.'}
            </p>
            {generic && (
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={withSubId(generic.partnerUrl, subId)}
                  target="_blank"
                  rel="noopener noreferrer nofollow sponsored"
                  className="rounded-full bg-thailand-red text-white px-6 py-3 text-base font-semibold hover:bg-red-700 shadow-lg"
                >
                  {isNl
                    ? 'Zoek alle vluchten naar Phuket op Trip.com →'
                    : 'Search all flights to Phuket on Trip.com →'}
                </a>
                <span className="text-sm opacity-80">
                  {updatedLabel} {new Date(lastUpdated).toLocaleDateString(dateLocale, { year: 'numeric', month: 'long' })}
                </span>
              </div>
            )}
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-xs opacity-90">
              <span>✔ {isNl ? 'Alle 15 routes geverifieerd in mei 2026' : 'All 15 routes verified May 2026'}</span>
              <span>✔ {isNl ? 'Direct + 1 tussenstop opties' : 'Direct + 1-stop options'}</span>
              <span>✔ {isNl ? '30-dagen cookie tracking' : '30-day cookie tracking'}</span>
              <span>✔ {isNl ? 'Eerlijke airline-notities' : 'Honest airline notes'}</span>
            </div>
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          {/* Comparison table — biggest click driver per affiliate playbook */}
          <section id="comparison">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-2">
              {isNl ? 'Snelle vergelijking: 15 routes naar Phuket' : 'Quick comparison: 15 routes to Phuket'}
            </h2>
            <p className="text-gray-600 mb-6">
              {isNl
                ? 'Klik op een stad om live vluchten te zoeken op Trip.com (30-dagen cookie tracking — wij ontvangen een kleine commissie zonder extra kosten voor jou).'
                : 'Click any city name to search live flights on Trip.com (30-day cookie tracking — we earn a small commission at no extra cost to you).'}
            </p>
            <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Vanuit' : 'From'}</th>
                    <th className="text-left font-semibold px-4 py-3">IATA</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Reistijd' : 'Duration'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Tussenstops' : 'Stops'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Prijsklasse' : 'Price band'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Zoek vluchten' : 'Find flights'}</th>
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
                      <td className="px-4 py-3 text-gray-700 font-mono text-xs">{r.from} → HKT</td>
                      <td className="px-4 py-3 text-gray-700">{r.duration}</td>
                      <td className="px-4 py-3 text-gray-700">{r.stops}</td>
                      <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{r.priceBand}</td>
                      <td className="px-4 py-3">
                        <a href={withSubId(r.partnerUrl, subId)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-thailand-red font-semibold hover:underline whitespace-nowrap">
                          {isNl ? 'Bekijk prijs →' : 'Check price →'}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-gray-500">
              {isNl
                ? 'Prijzen zijn gangbare laag-tot-hoog ranges in 2026 economy class — geen aanbiedingstarieven. Controleer altijd bij het boeken.'
                : 'Prices are typical low-to-high bands in 2026 economy class — not promotional fares. Always confirm at booking.'}
            </p>
          </section>

          {/* Detailed sections per tier */}
          {tiers.map(tier => {
            const tierRoutes = grouped[tier];
            if (!tierRoutes || tierRoutes.length === 0) return null;
            return (
              <section key={tier}>
                <h2 className="font-heading text-2xl font-bold text-gray-900 mb-6">{tierLabel(tier, isNl)}</h2>
                <div className="space-y-5">
                  {tierRoutes.map((r) => (
                    <article key={r.code} id={r.code} className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                      <div className="flex flex-wrap items-baseline gap-3 mb-2">
                        <h3 className="font-heading text-xl font-bold text-gray-900">
                          <a href={withSubId(r.partnerUrl, subId)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="hover:text-thailand-red">
                            {r.fromName} → Phuket
                          </a>
                        </h3>
                        <span className="rounded-full bg-thailand-blue/10 text-thailand-blue px-3 py-1 text-xs font-semibold uppercase tracking-wide">{r.from} → HKT</span>
                      </div>
                      <div className="grid sm:grid-cols-3 gap-4 text-sm mb-3">
                        <div>
                          <p className="text-xs uppercase text-gray-500 font-semibold">{isNl ? 'Reistijd' : 'Duration'}</p>
                          <p className="font-semibold text-gray-900">{r.duration}</p>
                        </div>
                        <div>
                          <p className="text-xs uppercase text-gray-500 font-semibold">{isNl ? 'Frequentie' : 'Frequency'}</p>
                          <p className="text-gray-700">{r.frequency}</p>
                        </div>
                        <div>
                          <p className="text-xs uppercase text-gray-500 font-semibold">{isNl ? 'Typische prijs' : 'Typical price'}</p>
                          <p className="text-gray-700">{r.priceBand}</p>
                        </div>
                      </div>
                      <div className="text-sm mb-3">
                        <span className="text-xs uppercase text-gray-500 font-semibold">{isNl ? 'Airlines: ' : 'Airlines: '}</span>
                        <span className="text-gray-700">{r.airlines.join(' · ')}</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed mb-4">{r.notes}</p>
                      <a
                        href={withSubId(r.partnerUrl, subId)}
                        target="_blank"
                        rel="noopener noreferrer nofollow sponsored"
                        className="inline-flex items-center rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700"
                      >
                        {isNl
                          ? `Zoek vluchten ${r.fromName} → Phuket →`
                          : `Find flights ${r.fromName} → Phuket →`}
                      </a>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}

          {/* Buyer's guide — when/how to book */}
          <section className="rounded-2xl bg-amber-50 border border-amber-200 p-6">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">
              {isNl ? 'Wanneer boeken: vluchten naar Phuket' : 'When to book flights to Phuket'}
            </h2>
            {isNl ? (
              <ul className="space-y-3 text-gray-800">
                <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>Binnenland (BKK/CNX/USM):</strong> 4–6 weken vooruit is het beste moment. Last-minute (binnen 7 dagen) zijn de prijzen op Thai VietJet soms gelijk, maar bijna nooit lager.</span></li>
                <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>Regionaal (Singapore/KL/HKG):</strong> 6–8 weken vooruit. Vertrekken op dinsdag en woensdag zijn meestal 20–30% goedkoper dan in het weekend.</span></li>
                <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>Intercontinentaal (LAX/JFK/LHR/AMS):</strong> 3–4 maanden vooruit voor het hoogseizoen (nov–apr); 1–2 maanden voor het laagseizoen. Kijk specifiek naar vertrekken op dinsdag, woensdag en zaterdag.</span></li>
                <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>Goedkoopste maanden:</strong> half september tot begin november (net voor het hoogseizoen) en mei–juni (na Songkran, voor de Europese zomervakantie).</span></li>
                <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>Vermijden:</strong> Kerst/Oud & Nieuw (tarieven 2–3x normaal), Chinees Nieuwjaar (jan/feb) en Songkran (half april). Boek 4–6 maanden vooruit als je in deze periodes moet reizen.</span></li>
                <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>Bagage-valkuil:</strong> Thai VietJet, AirAsia en Scoot tonen lage tarieven zonder ruimbagage. Reken op 500–1.200 THB extra voor 20 kg ruimbagage. De totaalprijs komt vaak in de buurt van een full-service airline.</span></li>
                <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>Toeristenbelasting (2026):</strong> Thailand wil de aankomstheffing van 300 THB versneld invoeren onder de nieuwe regering. Controleer bij het boeken of deze al actief is en door de airline bij ticketverkoop wordt geïnd.</span></li>
              </ul>
            ) : (
              <ul className="space-y-3 text-gray-800">
                <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>Domestic (BKK/CNX/USM):</strong> 4–6 weeks ahead is the sweet spot. Last-minute fares (within 7 days) sometimes match advance prices on Thai VietJet but rarely beat them.</span></li>
                <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>Regional (Singapore/KL/HKG):</strong> 6–8 weeks ahead. Tuesday and Wednesday departures usually 20–30% cheaper than weekends.</span></li>
                <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>Long-haul (LAX/JFK/LHR/AMS):</strong> 3–4 months ahead for high season (Nov–Apr); 1–2 months for low season. Check Tuesday-Wednesday-Saturday departures specifically.</span></li>
                <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>Best months for cheapest fares:</strong> mid-September through early November (just before high season) and again May–June (post Songkran, pre-summer European travel).</span></li>
                <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>Avoid:</strong> Christmas/New Year week (rates 2–3x normal), Chinese New Year (Jan/Feb), and Songkran (mid-April). Book 4–6 months out for these dates if you must travel.</span></li>
                <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>Baggage trap:</strong> Thai VietJet, AirAsia and Scoot all show low fares without checked bags. Add 500–1,200 THB for 20kg checked. The full price may end up similar to a full-service airline.</span></li>
                <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>Tourist tax (2026):</strong> Thailand&apos;s 300 THB air-arrival entry fee is being fast-tracked under the new administration. Confirm at time of booking whether it&apos;s active and collected by airline at ticket purchase.</span></li>
              </ul>
            )}
          </section>

          {/* Phuket Airport practicals */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">
              {isNl ? 'Phuket Airport (HKT) — praktische info' : 'Phuket Airport (HKT) basics'}
            </h2>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">
                  {isNl ? 'Locatie + transfer' : 'Location + transfer'}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {isNl
                    ? 'HKT ligt aan de noordkant van het eiland. Transfertijden: Mai Khao Beach 10–20 min · Bang Tao 25–35 min · Patong 45–60 min · Karon/Kata 60–75 min · Phuket Old Town 35–45 min. Een taxi met meter naar Patong kost zo\'n 600–900 THB, een vooraf betaalde couponstaxi op de luchthaven ongeveer 1.000 THB.'
                    : 'HKT sits at the north end of the island. Transfer times: Mai Khao Beach 10–20 min · Bang Tao 25–35 min · Patong 45–60 min · Karon/Kata 60–75 min · Phuket Old Town 35–45 min. Metered taxi to Patong is around 600–900 THB, pre-paid coupon taxi at the airport ~1,000 THB.'}
                </p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">
                  {isNl ? 'Terminalinformatie' : 'Terminal info'}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {isNl
                    ? 'De internationale (T1) en domestic (T2) terminals zijn met elkaar verbonden. Gratis shuttles rijden elke 5–10 min. Reken minimaal 90 minuten in voor internationale aansluitingen op HKT — bagage tussen terminals overzetten kost extra tijd.'
                    : 'International (T1) and domestic (T2) terminals are connected. Free shuttles every 5–10 min. Allow 90 min minimum for international connections at HKT — luggage transfer between terminals adds time.'}
                </p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">
                  {isNl ? 'SIM + connectiviteit' : 'SIM + connectivity'}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {isNl
                    ? 'AIS, True en DTAC hebben kiosken bij aankomst. Gemiddelde toeristen-SIM: 200–400 THB voor 7 dagen onbeperkt. Of koop vooraf een eSIM, dan sla je de rij bij de kiosk over.'
                    : 'AIS, True and DTAC kiosks in arrivals. Average tourist SIM: 200–400 THB for 7 days unlimited. Or pre-buy an eSIM before you fly to skip the kiosk queue.'}
                </p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">
                  {isNl ? 'Bagage + douane' : 'Baggage + customs'}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {isNl
                    ? 'Thaise douanevrijstelling: 1L alcohol, 200 sigaretten en persoonlijke bezittingen. Voor het meenemen van een drone moet je vooraf bij de Thaise CAAT registreren. Vapes en e-sigaretten zijn verboden — laat ze thuis.'
                    : 'Thai customs allowance: 1L alcohol, 200 cigarettes, plus personal effects. Drone import requires Thai CAAT registration before arrival. Vape/e-cigarettes are illegal — do not bring.'}
                </p>
              </div>
            </div>
          </section>

          {/* Cluster mesh — internal links */}
          <section className="rounded-2xl bg-thailand-blue/10 p-6">
            <h2 className="font-heading text-xl font-bold text-gray-900">
              {isNl ? 'Vlucht geboekt? Plan de rest van je reis' : 'Once you’ve booked your flight'}
            </h2>
            <p className="mt-2 text-gray-700">
              {isNl ? 'Plan de rest van je trip naar Phuket:' : 'Plan the rest of your Phuket trip:'}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/best-hotels/phuket/" className="rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">
                🏨 {isNl ? 'Beste hotels in Phuket' : 'Best hotels in Phuket'}
              </Link>
              <Link href="/where-to-stay/phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">
                🗺️ {isNl ? 'Waar overnachten (wijken)' : 'Where to stay (areas)'}
              </Link>
              <Link href="/best-hotels/phuket/family/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">
                👨‍👩‍👧 {isNl ? 'Familiehotels' : 'Family hotels'}
              </Link>
              <Link href="/best-hotels/phuket/all-inclusive/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">
                {isNl ? 'All-inclusive resorts' : 'All-inclusive resorts'}
              </Link>
              <Link href="/transport/bangkok-to-phuket/" className="rounded-full bg-white text-gray-900 border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50">
                {isNl ? 'Bangkok → Phuket alternatieven' : 'Bangkok → Phuket alternatives'}
              </Link>
              <Link href="/city/phuket/" className="rounded-full bg-white text-gray-900 border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50">
                {isNl ? 'Phuket reisgids' : 'Phuket travel guide'}
              </Link>
              <a href={withSubId(KLOOK_GENERIC, subId)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">
                🎟️ {isNl ? 'Activiteiten (Klook)' : 'Activities (Klook)'}
              </a>
              <a href={withSubId(TWELVEGO_GENERIC, subId)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-white text-gray-900 border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50">
                🚌 {isNl ? 'Vervoer over land (12Go)' : 'Ground transport (12Go)'}
              </a>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">
              {isNl ? 'Veelgestelde vragen' : 'Frequently asked questions'}
            </h2>
            <div className="space-y-3">
              {faqList.map((q, i) => (
                <details key={i} className="rounded-2xl bg-white p-4 shadow-sm border border-gray-200">
                  <summary className="font-semibold text-gray-900 cursor-pointer">{q.name}</summary>
                  <p className="mt-2 text-gray-700 text-sm leading-relaxed">{q.answer}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Methodology */}
          <section className="rounded-2xl bg-gray-50 border border-gray-200 p-6 text-sm text-gray-700">
            <h2 className="font-heading text-lg font-bold text-gray-900 mb-2">
              {isNl ? 'Onze werkwijze' : 'Methodology'}
            </h2>
            <p>
              {isNl
                ? 'Routes geverifieerd in mei 2026 op basis van Trip.com-schema\'s en airline-dienstregelingen. Prijsklassen zijn gangbare economy-tarieven (laag tot hoog) buiten piekweken, geen aanbiedingen. Reistijden voor 1-stop opties zijn inclusief minimale redelijke overstaptijd. Wij verdienen een commissie als lezers via Trip.com boeken — dit verandert nooit de prijs die je betaalt of de routes die we aanraden. Laatst gecheckt: mei 2026.'
                : 'Routes verified May 2026 against Trip.com schedules and airline timetables. Price bands are typical economy fares (low-to-high) outside peak weeks, not promotional sales. Duration ranges include minimum reasonable layover time for 1-stop options. We earn a commission when readers book through Trip.com — this never changes the price you pay or the routes we recommend. Last verified May 2026.'}
            </p>
          </section>
        </main>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  const enFile = path.join(process.cwd(), 'data', 'pseo', 'flights', 'phuket-routes.json');
  const nlFile = path.join(process.cwd(), 'data', 'pseo', 'flights', 'nl', 'phuket-routes.json');
  const file = locale === 'nl' && fs.existsSync(nlFile) ? nlFile : enFile;
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  return { props: { routes: data.routes, lastUpdated: data.lastUpdated }, revalidate: 604800 };
};
