import { GetStaticPaths, GetStaticProps } from 'next';
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
  route: Route;
  siblings: Route[];
  generic: Route | null;
  lastUpdated: string;
}

// Map route.code → URL slug for /from-<slug>/
const SLUG: Record<string, string> = {
  'bkk-to-hkt': 'bangkok',
  'dmk-to-hkt': 'bangkok-dmk',
  'cnx-to-hkt': 'chiang-mai',
  'usm-to-hkt': 'koh-samui',
  'sin-to-hkt': 'singapore',
  'kul-to-hkt': 'kuala-lumpur',
  'hkg-to-hkt': 'hong-kong',
  'icn-to-hkt': 'seoul',
  'dxb-to-hkt': 'dubai',
  'lax-to-hkt': 'lax',
  'jfk-to-hkt': 'jfk',
  'sfo-to-hkt': 'sfo',
  'lhr-to-hkt': 'london',
  'ams-to-hkt': 'amsterdam',
};
const REVERSE_SLUG: Record<string, string> = Object.fromEntries(
  Object.entries(SLUG).map(([code, slug]) => [slug, code])
);

const tierBadge = (tier: string, isNl: boolean): string => {
  if (isNl) {
    return tier === 'domestic' ? 'Binnenlands' : tier === 'regional' ? 'Regionaal Azië' : 'Intercontinentaal';
  }
  return tier === 'domestic' ? 'Domestic' : tier === 'regional' ? 'Regional Asia' : 'Long-haul';
};

export default function FlightFromOriginPage({ route, siblings, generic, lastUpdated }: Props) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const subId = useSubId();
  const slug = SLUG[route.code];

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: isNl ? 'Vluchten naar Phuket' : 'Flights to Phuket', href: '/flights-to-phuket/' },
    { name: route.fromName, href: `/flights-to-phuket/${slug}/` },
  ];

  // Strip parenthetical airport names ('Bangkok (Suvarnabhumi)' → 'Bangkok')
  // to keep title under 60 chars per Google truncation limit.
  const shortFromName = route.fromName.replace(/\s*\([^)]*\)\s*/g, '').trim();
  const seoTitle = isNl
    ? `Vluchten ${shortFromName} naar Phuket: ${route.from}→HKT Gids 2026`
    : `Flights ${shortFromName} to Phuket: ${route.from}→HKT Guide 2026`;
  const seoDescription = isNl
    ? `Vluchten van ${route.fromName} naar Phuket: ${route.duration}, ${route.stops}, ${route.priceBand}. Vergelijk airlines en boek via Trip.com.`.slice(0, 160)
    : `Flights from ${route.fromName} to Phuket: ${route.duration}, ${route.stops}, typical fares ${route.priceBand}. Compare airlines and book via Trip.com.`.slice(0, 160);

  const canonical = `https://go2-thailand.com${isNl ? '/nl' : ''}/flights-to-phuket/${slug}/`;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, i) => ({
      '@type': 'ListItem', position: i + 1, name: b.name,
      item: `https://go2-thailand.com${isNl ? '/nl' : ''}${b.href}`,
    })),
  };

  // FAQ — generated per route from facts
  const faqEn = [
    {
      q: `How long is the flight from ${route.fromName} to Phuket?`,
      a: `${route.duration} (${route.stops}). Flight time from ${route.fromName} (${route.from}) to Phuket International Airport (HKT). Total journey including airport check-in, security, and transfer to your Phuket hotel is typically 3–5 hours longer than the flight itself.`,
    },
    {
      q: `Which airlines fly from ${route.fromName} to Phuket?`,
      a: `${route.airlines.join(', ')}. ${route.tier === 'long-haul' ? 'All routes from this airport require at least one connection — typically via Bangkok (BKK), Hong Kong (HKG), Singapore (SIN), Doha (DOH), or Dubai (DXB).' : 'Compare current schedules and prices on Trip.com to find the right combination of price, schedule, and baggage allowance.'}`,
    },
    {
      q: `What's the typical price for a flight from ${route.fromName} to Phuket?`,
      a: `${route.priceBand}. Prices reflect typical 2026 economy fares — not promotional sales. ${route.tier === 'domestic' ? 'Book 4–6 weeks ahead for the best fares; budget airlines (AirAsia, Thai VietJet) are usually cheapest.' : route.tier === 'regional' ? 'Book 6–8 weeks ahead. Tuesday/Wednesday departures often 20–30% cheaper than weekends.' : 'Book 3–4 months ahead for high season (Nov–Apr); 1–2 months for low season. Tuesday-Wednesday-Saturday departures typically cheapest.'}`,
    },
    {
      q: `When is the cheapest time to fly from ${route.fromName} to Phuket?`,
      a: `May to October (south-west monsoon low season) prices drop 30–50% on most routes. Mid-September and early November are often the cheapest weeks. Avoid Christmas/New Year, Chinese New Year (Jan/Feb) and Songkran (mid-April) — fares can be 2–3x normal.`,
    },
    {
      q: `Should I book direct or via a search engine?`,
      a: `${route.tier === 'domestic' ? 'For domestic Thailand routes, search engines like Trip.com or Skyscanner usually beat direct booking — Thai VietJet, AirAsia and Nok Air all sell through these platforms at the same price as direct.' : 'For ' + route.tier + ' routes, comparing both is worth the 5 minutes. Sometimes the airline\'s direct site has slightly better prices, includes seat selection that costs extra elsewhere, or has different baggage allowances.'} Always check baggage rules before booking the cheapest fare.`,
    },
  ];

  const faqNl = [
    {
      q: `Hoe lang duurt de vlucht van ${route.fromName} naar Phuket?`,
      a: `${route.duration} (${route.stops}). Vluchttijd van ${route.fromName} (${route.from}) naar Phuket International Airport (HKT). De totale reistijd inclusief inchecken, security en transfer naar je hotel in Phuket is meestal 3–5 uur langer dan de vlucht zelf.`,
    },
    {
      q: `Welke airlines vliegen van ${route.fromName} naar Phuket?`,
      a: `${route.airlines.join(', ')}. ${route.tier === 'long-haul' ? 'Alle routes vanaf deze luchthaven hebben minstens één tussenstop — meestal via Bangkok (BKK), Hong Kong (HKG), Singapore (SIN), Doha (DOH) of Dubai (DXB).' : 'Vergelijk actuele schema\'s en prijzen op Trip.com voor de juiste combinatie van prijs, vertrektijd en bagageregels.'}`,
    },
    {
      q: `Wat kost een vlucht van ${route.fromName} naar Phuket gemiddeld?`,
      a: `${route.priceBand}. Prijzen weerspiegelen typische 2026 economy-tarieven — geen promo's. ${route.tier === 'domestic' ? 'Boek 4–6 weken van tevoren voor de beste prijs; budget-airlines (AirAsia, Thai VietJet) zijn meestal het goedkoopst.' : route.tier === 'regional' ? 'Boek 6–8 weken van tevoren. Vertrek op dinsdag/woensdag is vaak 20–30% goedkoper dan in het weekend.' : 'Boek 3–4 maanden van tevoren voor hoogseizoen (nov–apr); 1–2 maanden voor laagseizoen. Vertrek op dinsdag/woensdag/zaterdag is meestal het goedkoopst.'}`,
    },
    {
      q: `Wanneer is de goedkoopste tijd om van ${route.fromName} naar Phuket te vliegen?`,
      a: `Mei tot oktober (zuidwestmoesson laagseizoen) zakken de prijzen op de meeste routes 30–50%. Half september en begin november zijn vaak de allergoedkoopste weken. Vermijd Kerst/Oud & Nieuw, Chinees Nieuwjaar (jan/feb) en Songkran (half april) — tarieven kunnen 2–3x zo hoog zijn.`,
    },
    {
      q: `Boek je direct of via een zoekmachine?`,
      a: `${route.tier === 'domestic' ? 'Voor binnenlandse Thaise routes zijn zoekmachines zoals Trip.com of Skyscanner meestal goedkoper dan direct boeken — Thai VietJet, AirAsia en Nok Air verkopen via deze platforms voor dezelfde prijs als direct.' : 'Voor ' + (route.tier === 'regional' ? 'regionale' : 'intercontinentale') + ' routes is het de moeite waard om beide te vergelijken. Soms heeft de airline-site iets betere prijzen, zit stoelkeuze er gratis bij, of zijn de bagageregels anders.'} Check altijd de bagageregels voor je het goedkoopste ticket boekt.`,
    },
  ];

  const faqList = isNl ? faqNl : faqEn;

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqList.map(f => ({
      '@type': 'Question', name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <SEOHead title={seoTitle} description={seoDescription}>
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        <section className="bg-thailand-blue text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Breadcrumbs items={breadcrumbs} />
            <div className="mt-4 flex items-center gap-3">
              <span className="rounded-full bg-white/15 backdrop-blur px-3 py-1 text-xs font-semibold uppercase tracking-wide">{tierBadge(route.tier, isNl)}</span>
              <span className="font-mono text-sm opacity-90">{route.from} → HKT</span>
            </div>
            <h1 className="font-heading text-3xl lg:text-5xl font-bold mt-3">
              {/* H1 differs from title per SEO playbook — uses 'How to' framing + duration */}
              {isNl
                ? `${route.fromName} naar Phuket: vluchten, airlines & boekingstips`
                : `${route.fromName} to Phuket: Airlines, Schedule & Booking Tips`}
            </h1>
            <p className="mt-4 text-lg max-w-3xl opacity-95">
              {route.duration} · {route.stops} · {route.frequency} · {route.priceBand}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={withSubId(route.partnerUrl, subId)}
                target="_blank"
                rel="noopener noreferrer nofollow sponsored"
                className="rounded-full bg-thailand-red text-white px-6 py-3 text-base font-semibold hover:bg-red-700 shadow-lg"
              >
                {isNl ? `Zoek vluchten ${route.fromName} → Phuket` : `Find flights ${route.fromName} → Phuket`} →
              </a>
              <span className="text-sm opacity-80">{isNl ? 'Bijgewerkt' : 'Updated'} {new Date(lastUpdated).toLocaleDateString(isNl ? 'nl-NL' : 'en', { year: 'numeric', month: 'long' })}</span>
            </div>
          </div>
        </section>

        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          {/* Quick stats */}
          <section className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Route in cijfers' : 'Route at a glance'}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Vluchttijd' : 'Flight time'}</p>
                <p className="mt-1 font-heading font-bold text-gray-900 text-lg">{route.duration}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Tussenstops' : 'Stops'}</p>
                <p className="mt-1 font-heading font-bold text-gray-900 text-lg">{route.stops}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Frequentie' : 'Frequency'}</p>
                <p className="mt-1 font-heading font-semibold text-gray-900">{route.frequency}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Prijsklasse' : 'Typical price'}</p>
                <p className="mt-1 text-gray-700">{route.priceBand}</p>
              </div>
            </div>
          </section>

          {/* Airlines + notes */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? `Airlines op deze route` : `Airlines on this route`}</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">{route.notes}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {route.airlines.map(a => (
                <span key={a} className="rounded-full bg-thailand-blue/10 text-thailand-blue px-3 py-1 text-sm font-semibold">{a}</span>
              ))}
            </div>
            <a
              href={withSubId(route.partnerUrl, subId)}
              target="_blank"
              rel="noopener noreferrer nofollow sponsored"
              className="inline-flex items-center rounded-full bg-thailand-red text-white px-5 py-3 text-sm font-semibold hover:bg-red-700"
            >
              {isNl ? 'Bekijk live tarieven op Trip.com' : 'See live fares on Trip.com'} →
            </a>
          </section>

          {/* Sibling routes — internal cluster mesh */}
          {siblings.length > 0 && (
            <section>
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                {isNl ? `Andere routes naar Phuket ${route.tier === 'domestic' ? 'binnen Thailand' : route.tier === 'regional' ? 'vanuit Azië' : ''}`.trim() : `Other ${route.tier === 'domestic' ? 'domestic' : route.tier === 'regional' ? 'regional' : 'long-haul'} routes to Phuket`}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {siblings.slice(0, 6).map(s => {
                  const sSlug = SLUG[s.code];
                  if (!sSlug) return null;
                  return (
                    <Link
                      key={s.code}
                      href={`/flights-to-phuket/${sSlug}/`}
                      className="block rounded-2xl bg-white p-4 shadow-sm border border-gray-200 hover:border-thailand-blue transition-colors"
                    >
                      <p className="text-xs font-mono text-gray-500">{s.from} → HKT</p>
                      <p className="font-heading font-bold text-gray-900 mt-1">{s.fromName}</p>
                      <p className="text-sm text-gray-700 mt-1">{s.duration} · {s.stops}</p>
                      <p className="text-xs text-thailand-blue mt-2 font-semibold">{isNl ? 'Bekijk route' : 'See route'} →</p>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* FAQ */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Veelgestelde vragen' : 'Frequently asked questions'}</h2>
            <div className="space-y-3">
              {faqList.map((f, i) => (
                <details key={i} className="rounded-2xl bg-white p-4 shadow-sm border border-gray-200">
                  <summary className="font-semibold text-gray-900 cursor-pointer">{f.q}</summary>
                  <p className="mt-2 text-gray-700 text-sm leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Cluster mesh — back to pillar + Phuket pages */}
          <section className="rounded-2xl bg-thailand-blue/10 p-6">
            <h2 className="font-heading text-xl font-bold text-gray-900">
              {isNl ? `Eenmaal in Phuket aangekomen` : `Once you land in Phuket`}
            </h2>
            <p className="mt-2 text-gray-700">{isNl ? 'Plan de rest van je Phuket trip:' : 'Plan the rest of your Phuket trip:'}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/flights-to-phuket/" className="rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">
                {isNl ? 'Alle 15 routes naar Phuket' : 'All 15 routes to Phuket'}
              </Link>
              <Link href="/best-hotels/phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">
                {isNl ? 'Beste hotels in Phuket' : 'Best hotels in Phuket'}
              </Link>
              <Link href="/where-to-stay/phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">
                {isNl ? 'Waar verblijven (gebieden)' : 'Where to stay (areas)'}
              </Link>
              <Link href="/car-rental-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">
                {isNl ? '🚗 Auto huren bij aankomst' : '🚗 Rent a car at the airport'}
              </Link>
              <Link href="/city/phuket/" className="rounded-full bg-white text-gray-900 border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50">
                {isNl ? 'Phuket reisgids' : 'Phuket travel guide'}
              </Link>
              <a href={withSubId(KLOOK_GENERIC, subId)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">
                {isNl ? '🎟️ Activiteiten (Klook)' : '🎟️ Activities (Klook)'}
              </a>
              <a href={withSubId(TWELVEGO_GENERIC, subId)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-white text-gray-900 border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50">
                {isNl ? '🚌 Grondtransport (12Go)' : '🚌 Ground transport (12Go)'}
              </a>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const file = path.join(process.cwd(), 'data', 'pseo', 'flights', 'phuket-routes.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const paths = data.routes
    .filter((r: Route) => r.tier !== 'search' && SLUG[r.code])
    .map((r: Route) => ({ params: { origin: SLUG[r.code] } }));
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params, locale }) => {
  const origin = params?.origin as string;
  const code = REVERSE_SLUG[origin];
  if (!code) return { notFound: true, revalidate: 60 };

  const enFile = path.join(process.cwd(), 'data', 'pseo', 'flights', 'phuket-routes.json');
  const nlFile = path.join(process.cwd(), 'data', 'pseo', 'flights', 'nl', 'phuket-routes.json');
  const file = locale === 'nl' && fs.existsSync(nlFile) ? nlFile : enFile;
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const routes: Route[] = data.routes;
  const route = routes.find(r => r.code === code);
  if (!route) return { notFound: true, revalidate: 60 };

  // Sibling routes — same tier, exclude self, exclude generic
  const siblings = routes.filter(r => r.tier === route.tier && r.code !== code && r.tier !== 'search');
  const generic = routes.find(r => r.tier === 'search') || null;

  return { props: { route, siblings, generic, lastUpdated: data.lastUpdated }, revalidate: 604800 };
};
