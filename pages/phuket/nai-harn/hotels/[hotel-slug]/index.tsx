import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import SEOHead from '../../../../../components/SEOHead';
import Breadcrumbs from '../../../../../components/Breadcrumbs';
import { withSubId } from '../../../../../lib/affiliates';
import { useSubId } from '../../../../../lib/useSubId';

interface PartnerEntry { partnerUrl: string; label: string }
interface Partners { [key: string]: PartnerEntry }

interface HotelData {
  slug: string;
  name: string;
  fullName: string;
  tier: string;
  stars: number;
  primaryKeywords: string[];
  primaryPartnerKey: string;
  secondaryPartnerKey: string;
  summary: { en: string; nl: string };
  highlights: { en: string[]; nl: string[] };
  watchOuts: { en: string[]; nl: string[] };
  bestFor: { en: string; nl: string };
  priceBand: string;
  rooms: number;
}

interface Props {
  hotel: HotelData;
  siblings: { slug: string; name: string }[];
  partners: Partners;
  lastUpdated: string;
}

export default function NaiHarnHotelReviewPage({ hotel, siblings, partners, lastUpdated }: Props) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const subId = useSubId();
  const placement = (p: string) => `${subId}-pseo-phuket-nai-harn-hotel-${hotel.slug}-${p}`;

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Phuket', href: '/city/phuket/' },
    { name: 'Nai Harn', href: '/phuket/nai-harn/' },
    { name: isNl ? 'Hotels' : 'Hotels', href: '/phuket/nai-harn/hotels/' },
    { name: hotel.name, href: `/phuket/nai-harn/hotels/${hotel.slug}/` },
  ];

  // Title <60 — KW-front, name + Phuket + year + modifier
  const seoTitle = (() => {
    if (hotel.slug === 'the-nai-harn-phuket') return isNl ? 'The Nai Harn Phuket (2026): Eerlijke Hotel Review' : 'The Nai Harn Phuket (2026): Honest 5-Star Review';
    if (hotel.slug === 'wyndham-grand-nai-harn-beach-phuket') return isNl ? 'Wyndham Grand Nai Harn Phuket: 2026 Familie-Review' : 'Wyndham Grand Nai Harn Beach Phuket Review (2026)';
    return `${hotel.name} (2026): ${isNl ? 'Eerlijke Review' : 'Honest Review'}`;
  })();

  const h1 = (() => {
    if (hotel.slug === 'the-nai-harn-phuket') return isNl ? 'The Nai Harn: cliff-top luxe boven Nai Harn Beach' : 'Inside The Nai Harn: Cliff-Top Luxury Above Nai Harn Beach';
    if (hotel.slug === 'wyndham-grand-nai-harn-beach-phuket') return isNl ? 'Wyndham Grand Nai Harn Beach Phuket: familie-resort gewogen' : 'Wyndham Grand Nai Harn Beach Phuket: Family Resort Weighed Up';
    return `${hotel.name}: ${isNl ? 'eerlijke review' : 'honest review'}`;
  })();

  const seoDescription = (() => {
    if (hotel.slug === 'the-nai-harn-phuket') return isNl ? 'Op zoek naar The Nai Harn? 5* op de klif, zeezicht-kamers, infinity-pool. Wat erin zit, watch-outs, prijzen $250–500/nacht — eerlijke review.' : 'Looking at The Nai Harn? 5* clifftop, sea-view rooms, infinity pool. What\'s included, watch-outs, $250–500/night — honest review.';
    if (hotel.slug === 'wyndham-grand-nai-harn-beach-phuket') return isNl ? 'Op zoek naar Wyndham Grand Nai Harn Beach Phuket? 5* familie, 3 pools, kids\' club, $200–400/nacht. Eerlijke pros + cons.' : 'Looking at Wyndham Grand Nai Harn Beach Phuket? 5* family resort, 3 pools, kids\' club, $200–400/night. Honest pros + cons review.';
    return isNl ? `Op zoek naar ${hotel.name}? Eerlijke review met pros, cons, prijzen en wat je echt moet weten.` : `Looking at ${hotel.name}? Honest review with pros, cons, pricing and what you actually need to know.`;
  })();

  const canonical = `https://go2-thailand.com${isNl ? '/nl' : ''}/phuket/nai-harn/hotels/${hotel.slug}/`;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, i) => ({ '@type': 'ListItem', position: i + 1, name: b.name, item: `https://go2-thailand.com${isNl ? '/nl' : ''}${b.href}` })),
  };

  const primaryUrl = partners[hotel.primaryPartnerKey]?.partnerUrl || partners.trip_pillar.partnerUrl;
  const secondaryUrl = partners[hotel.secondaryPartnerKey]?.partnerUrl || partners.trip_hotels.partnerUrl;

  const faqEn = [
    { q: `Is ${hotel.name} worth it?`, a: hotel.slug === 'the-nai-harn-phuket' ? "Yes — for couples and honeymooners. The cliff-top setting, sea-view-from-every-room, infinity pool over the beach and Cosmo restaurant earn the $300+/night price. Less ideal for families with young kids (cliff terrain) or travellers wanting a low-maintenance flat-floor resort." : "Yes — for families specifically. Three pools, kids\' club, free shuttle to Nai Harn beach, half-board competitive vs Patong upscale resorts. Less ideal for couples wanting beachfront luxury (it's hillside, not on the sand) — choose The Nai Harn for that." },
    { q: `What does ${hotel.name} cost?`, a: hotel.slug === 'the-nai-harn-phuket' ? "Garden-view rooms $250–350/night standard rate, sea-view $310–500. High season (Dec–Feb) tops out near $500. Promotions on Trip.com run shoulder-season for 20–30% less." : "Standard rooms $200–300/night, family suites $300–400. High-season Dec–Feb peaks at $400+. Half-board adds $45/person/day; only worth it if you'll genuinely eat both meals on-site." },
    { q: `Is ${hotel.name} on the beach?`, a: hotel.slug === 'the-nai-harn-phuket' ? 'Direct private path access — 2-min walk down the staircase from the lobby, no road crossing. Beach is municipal so technically not "private", but the path is reserved for hotel guests.' : 'Hillside, 12-min walk down (and steep walk back up). The hotel runs a free shuttle every 30 min during the day. Not on the beach in the strict sense.' },
    { q: `What's the food like at ${hotel.name}?`, a: hotel.slug === 'the-nai-harn-phuket' ? 'Cosmo restaurant (modern Thai) is a destination diner — locals book it, not just guests. Rock Salt at the beach end is more casual seafood. Both worth booking. Breakfast buffet is one of the better in south Phuket.' : "Resort-style breakfast buffet (extensive but predictable), all-day dining at three onsite restaurants. F&B is competently executed but not destination-level — Rawai seafood market 8 min away is much better value for an evening meal." },
    { q: `Should I get a sea-view at ${hotel.name}?`, a: hotel.slug === 'the-nai-harn-phuket' ? 'Yes. The $60/night upcharge is the best value-add at the property. Garden-view rooms feel like a regular hotel; sea-view is what you came for. Book sea-view direct on Trip.com to lock the rate.' : "Hill-view rooms are the upgrade pick at Wyndham — sea views are partial through trees from many \"sea-view\" rooms here. Read recent reviews specifying floor + room number before paying for the upgrade." },
  ];
  const faqNl = [
    { q: `Is ${hotel.name} de moeite waard?`, a: hotel.slug === 'the-nai-harn-phuket' ? 'Ja — voor stellen en honeymooners. Klif-locatie, zeezicht uit elke kamer, infinity-pool boven het strand en Cosmo-restaurant rechtvaardigen de $300+/nacht. Minder ideaal voor families met jonge kinderen (klifterrein) of reizigers die een low-maintenance vlakke-vloer resort willen.' : "Ja — voor families. Drie pools, kids\' club, gratis shuttle naar het strand, half-pension competitief met Patong upscale resorts. Minder voor stellen die beachfront luxe willen (het is heuvel, geen strand) — kies The Nai Harn." },
    { q: `Wat kost ${hotel.name}?`, a: hotel.slug === 'the-nai-harn-phuket' ? 'Garden-view kamers $250–350/nacht standaard, sea-view $310–500. Hoogseizoen (dec–feb) piek $500. Trip.com aanbiedingen in schouderseizoen 20–30% lager.' : 'Standaard kamers $200–300/nacht, familiesuites $300–400. Hoogseizoen dec–feb piekt op $400+. Half-pension $45/persoon/dag; alleen als je 2 maaltijden ter plaatse zou eten.' },
    { q: `Ligt ${hotel.name} aan het strand?`, a: hotel.slug === 'the-nai-harn-phuket' ? 'Privépad — 2 min naar beneden via trap vanaf lobby, geen weg oversteken. Strand is gemeentegrond dus niet "privé", maar pad is voor gasten gereserveerd.' : 'Heuvel, 12 min lopen omlaag (en steile weg omhoog). Gratis shuttle elke 30 min overdag. Niet beachfront in strikte zin.' },
    { q: `Hoe is het eten in ${hotel.name}?`, a: hotel.slug === 'the-nai-harn-phuket' ? 'Cosmo (moderne Thais) is een diner-bestemming — locals reserveren ook hier. Rock Salt aan strandkant is casual seafood. Beide reserveren. Ontbijtbuffet behoort tot de betere van zuid-Phuket.' : 'Resort-stijl ontbijtbuffet (uitgebreid maar voorspelbaar), all-day dining op 3 onsite restaurants. F&B is goed maar geen bestemming — Rawai-vismarkt 8 min weg is veel beter voor een avondmaaltijd.' },
    { q: `Moet ik een sea-view boeken bij ${hotel.name}?`, a: hotel.slug === 'the-nai-harn-phuket' ? 'Ja. Meerprijs $60/nacht is de beste value-upgrade in het hotel. Garden-view voelt als een gewoon hotel; sea-view is waar je voor komt. Boek direct op Trip.com om tarief vast te zetten.' : 'Hill-view-kamers zijn hier de slimme upgrade — sommige "sea-view" zijn maar gedeeltelijk door de bomen. Lees recente reviews met verdieping + kamernummer voor je upgrade betaalt.' },
  ];
  const faqList = isNl ? faqNl : faqEn;
  const faqJsonLd = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: faqList.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
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
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Breadcrumbs items={breadcrumbs} />
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-white/75">{isNl ? `${hotel.tier} · ${hotel.stars}★` : `${hotel.tier} · ${hotel.stars}★`}</p>
            <h1 className="font-heading text-3xl lg:text-5xl font-bold mt-2">{h1}</h1>
            <p className="mt-4 text-lg lg:text-xl max-w-3xl opacity-95">{isNl ? hotel.summary.nl : hotel.summary.en}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={withSubId(primaryUrl, placement('hero-primary'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-6 py-3 text-base font-semibold hover:bg-red-700 shadow-lg">
                {isNl ? 'Tarieven op Trip.com' : 'Check rates on Trip.com'} →
              </a>
              <Link href="/phuket/nai-harn/hotels/" className="rounded-full bg-white text-thailand-blue border border-white/40 px-6 py-3 text-base font-semibold hover:bg-white/90">
                {isNl ? 'Vergelijk alle Nai Harn hotels' : 'Compare all Nai Harn hotels'} →
              </Link>
            </div>
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
          {/* Quick stats */}
          <section className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Niveau' : 'Tier'}</p><p className="mt-1 font-heading font-bold text-gray-900 text-lg capitalize">{hotel.tier}</p></div>
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Sterren' : 'Stars'}</p><p className="mt-1 font-heading font-bold text-gray-900 text-lg">{'★'.repeat(hotel.stars)}</p></div>
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Kamers' : 'Rooms'}</p><p className="mt-1 font-heading font-bold text-gray-900 text-lg">{hotel.rooms}</p></div>
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Beste voor' : 'Best for'}</p><p className="mt-1 font-heading font-bold text-gray-900 text-lg">{isNl ? hotel.bestFor.nl : hotel.bestFor.en}</p></div>
            </div>
          </section>

          {/* Pros/cons */}
          <section className="grid md:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-emerald-50 p-6 border border-emerald-200">
              <h2 className="font-heading text-xl font-bold text-emerald-900 mb-3">{isNl ? '👍 Wat erin zit' : '👍 What works'}</h2>
              <ul className="space-y-2 text-sm text-emerald-900">
                {(isNl ? hotel.highlights.nl : hotel.highlights.en).map((h, i) => (
                  <li key={i} className="flex gap-2"><span>✓</span><span>{h}</span></li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-rose-50 p-6 border border-rose-200">
              <h2 className="font-heading text-xl font-bold text-rose-900 mb-3">{isNl ? '⚠️ Watch-outs' : '⚠️ Watch-outs'}</h2>
              <ul className="space-y-2 text-sm text-rose-900">
                {(isNl ? hotel.watchOuts.nl : hotel.watchOuts.en).map((h, i) => (
                  <li key={i} className="flex gap-2"><span>!</span><span>{h}</span></li>
                ))}
              </ul>
            </div>
          </section>

          {/* CTA mid */}
          <section className="rounded-2xl bg-thailand-red/5 border-2 border-thailand-red p-6 text-center">
            <h2 className="font-heading text-xl font-bold text-gray-900 mb-2">{isNl ? `Klaar om ${hotel.name} te boeken?` : `Ready to book ${hotel.name}?`}</h2>
            <p className="text-gray-700 mb-4 text-sm">{isNl ? 'Live tarieven, gratis annuleren tot 24 uur voor aankomst (op de meeste tarieven).' : 'Live rates, free cancellation up to 24h before arrival (on most rates).'}</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a href={withSubId(primaryUrl, placement('mid-primary'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center rounded-full bg-thailand-red text-white px-6 py-3 text-base font-semibold hover:bg-red-700">{isNl ? 'Tarieven op Trip.com' : 'Check rates on Trip.com'} →</a>
              <a href={withSubId(secondaryUrl, placement('mid-secondary'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center rounded-full bg-thailand-blue text-white px-6 py-3 text-base font-semibold hover:bg-blue-700">{isNl ? 'Andere Nai Harn opties' : 'Other Nai Harn options'} →</a>
            </div>
          </section>

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

          {/* Sibling reviews */}
          {siblings.length > 0 && (
            <section>
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Andere Nai Harn hotels' : 'Other Nai Harn hotels'}</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {siblings.map(s => (
                  <Link key={s.slug} href={`/phuket/nai-harn/hotels/${s.slug}/`} className="block rounded-2xl bg-white p-4 shadow-sm border border-gray-200 hover:border-thailand-blue transition-colors">
                    <p className="font-heading font-bold text-gray-900">{s.name}</p>
                    <p className="text-xs text-thailand-blue mt-2 font-semibold">{isNl ? 'Lees review' : 'Read review'} →</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Cluster mesh */}
          <section className="rounded-2xl bg-thailand-blue/10 p-6">
            <h2 className="font-heading text-xl font-bold text-gray-900">{isNl ? 'Plan de rest van je trip' : 'Plan the rest of your trip'}</h2>
            <p className="mt-2 text-xs text-gray-500">{isNl ? `Bijgewerkt ${new Date(lastUpdated).toLocaleDateString('nl-NL', { year: 'numeric', month: 'long' })}` : `Updated ${new Date(lastUpdated).toLocaleDateString('en', { year: 'numeric', month: 'long' })}`}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/phuket/nai-harn/hotels/" className="rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">{isNl ? '↑ Vergelijk Nai Harn hotels' : '↑ Compare Nai Harn hotels'}</Link>
              <Link href="/phuket/nai-harn/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '📖 Nai Harn gids' : '📖 Nai Harn guide'}</Link>
              <Link href="/phuket/rawai/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏘️ Rawai gids' : '🏘️ Rawai guide'}</Link>
              <Link href="/best-hotels/phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏨 Hotels Phuket-breed' : '🏨 Hotels island-wide'}</Link>
              <Link href="/yacht-charter-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '⛵ Yacht charter' : '⛵ Yacht charter'}</Link>
              <Link href="/flights-to-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '✈️ Vluchten naar Phuket' : '✈️ Flights to Phuket'}</Link>
              <Link href="/city/phuket/" className="rounded-full bg-white text-gray-900 border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50">{isNl ? '📖 Phuket reisgids' : '📖 Phuket travel guide'}</Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const file = path.join(process.cwd(), 'data', 'pseo', 'areas', 'nai-harn-hotels.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const paths = (data.hotels || []).map((h: any) => ({ params: { 'hotel-slug': h.slug } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.['hotel-slug'] as string;
  const hotelsFile = path.join(process.cwd(), 'data', 'pseo', 'areas', 'nai-harn-hotels.json');
  const partnersFile = path.join(process.cwd(), 'data', 'pseo', 'areas', 'nai-harn-partners.json');
  const hotelsData = JSON.parse(fs.readFileSync(hotelsFile, 'utf8'));
  const partnersData = JSON.parse(fs.readFileSync(partnersFile, 'utf8'));

  const hotel = (hotelsData.hotels || []).find((h: HotelData) => h.slug === slug);
  if (!hotel) return { notFound: true, revalidate: 60 };

  const siblings = (hotelsData.hotels || [])
    .filter((h: HotelData) => h.slug !== slug)
    .map((h: HotelData) => ({ slug: h.slug, name: h.name }));

  return {
    props: {
      hotel,
      siblings,
      partners: partnersData.partners,
      lastUpdated: hotelsData.lastUpdated,
    },
    revalidate: 604800,
  };
};
