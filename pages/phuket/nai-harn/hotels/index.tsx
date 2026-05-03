import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import SEOHead from '../../../../components/SEOHead';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import { withSubId } from '../../../../lib/affiliates';
import { useSubId } from '../../../../lib/useSubId';

interface PartnerEntry { partnerUrl: string; label: string }
interface Partners { [key: string]: PartnerEntry }
interface HotelLite {
  slug: string;
  name: string;
  fullName: string;
  tier: string;
  stars: number;
  primaryPartnerKey: string;
  bestFor: { en: string; nl: string };
  priceBand: string;
  rooms: number;
  highlights: { en: string[]; nl: string[] };
}
interface Props { partners: Partners; hotels: HotelLite[]; lastUpdated: string }

export default function NaiHarnHotelsHubPage({ partners, hotels, lastUpdated }: Props) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const subId = useSubId();
  const placement = (p: string) => `${subId}-pseo-phuket-nai-harn-hotels-${p}`;

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Phuket', href: '/city/phuket/' },
    { name: 'Nai Harn', href: '/phuket/nai-harn/' },
    { name: isNl ? 'Hotels' : 'Hotels', href: '/phuket/nai-harn/hotels/' },
  ];

  // Title <60 — KW: "nai harn beach hotels" 70/KD4, "nai harn beach family hotels" 80/KD0
  const seoTitle = isNl
    ? 'Nai Harn Beach Hotels (2026): 6 Vergeleken'        // 47
    : 'Nai Harn Beach Hotels (2026): 6 Picks Compared'; // 47

  const h1 = isNl
    ? 'Waar overnachten in Nai Harn: 6 hotels van $80 tot $500/nacht'
    : 'Where to Stay in Nai Harn: 6 Hotels from $80 to $500/Night';

  const seoDescription = isNl
    ? 'Op zoek naar Nai Harn beach hotels? Vergelijk 6 opties van $80 mid-range tot $500 luxe — The Nai Harn, Wyndham Grand, family-vriendelijk + nog meer.'
    : 'Looking for Nai Harn beach hotels? Compare 6 picks from $80 mid-range to $500 luxury — The Nai Harn, Wyndham Grand, family hotels + more.';

  const canonical = `https://go2-thailand.com${isNl ? '/nl' : ''}/phuket/nai-harn/hotels/`;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, i) => ({ '@type': 'ListItem', position: i + 1, name: b.name, item: `https://go2-thailand.com${isNl ? '/nl' : ''}${b.href}` })),
  };

  // Comparison rows = featured 2 reviewed + 4 supplementary (we describe 6 options total)
  const supplementary = [
    { name: 'All Seasons Naiharn Phuket', tier: 'midrange', priceBand: '$$', stars: 3, bestFor: { en: 'Solo & couples on a budget', nl: 'Solo & stellen op budget' }, summary: { en: '4-min walk from beach, modern rooms, pool, $80–110/night.', nl: '4 min lopen van strand, moderne kamers, pool, $80–110/nacht.' }, partnerKey: 'trip_pillar' },
    { name: 'Sunsuri Phuket', tier: 'upscale', priceBand: '$$$', stars: 5, bestFor: { en: 'Adults & honeymooners', nl: 'Volwassenen & honeymooners' }, summary: { en: '8 min from beach, hillside resort, pool villas, $200–350/night.', nl: '8 min van strand, heuvelresort, pool-villas, $200–350/nacht.' }, partnerKey: 'trip_pillar' },
    { name: 'Mom Tri\'s Boathouse', tier: 'boutique', priceBand: '$$$', stars: 4, bestFor: { en: 'Foodies, gastronomes', nl: 'Foodies, gastronomen' }, summary: { en: 'Iconic restaurant + 38-room boutique, beachfront Kata-Nai Harn area, $180–280/night.', nl: 'Iconisch restaurant + 38-kamer boutique, beachfront Kata-Nai Harn, $180–280/nacht.' }, partnerKey: 'trip_pillar' },
    { name: 'Coriacea Boutique Resort', tier: 'midrange', priceBand: '$$', stars: 3, bestFor: { en: 'Couples on mid-budget', nl: 'Stellen op mid-budget' }, summary: { en: 'Adults-only, 5-min walk to beach, $90–140/night.', nl: 'Alleen volwassenen, 5 min lopen naar strand, $90–140/nacht.' }, partnerKey: 'trip_pillar' },
  ];

  const faqEn = [
    { q: "What's the best hotel in Nai Harn?", a: "Depends on what you want. The Nai Harn (5*, cliff-top, sea-view rooms) is the best for couples wanting luxury + romance. Wyndham Grand Nai Harn Beach Phuket (5*, hillside, 3 pools) is the best for families with kids. For mid-budget couples, Sunsuri or Coriacea are the practical picks. For solo or budget travellers, All Seasons Naiharn at $80–110/night." },
    { q: 'Are Nai Harn hotels good for families?', a: 'Yes — Wyndham Grand Nai Harn Beach Phuket has the strongest family setup (kids\' club, 3 pools, babysitting, family-friendly buffet, free shuttle). The Nai Harn welcomes families but kids under 8 may struggle with the cliff-side terrain. Mid-range All Seasons Naiharn is also family-friendly with smaller pool but no kids\' club. Avoid adults-only places like Coriacea and Sunsuri (some sections) if travelling with young kids.' },
    { q: 'How much does a Nai Harn beach hotel cost?', a: 'High season (Dec–Feb): mid-range $90–150/night, upscale $200–350, luxury $350–500+. Shoulder (Mar–Apr & Oct–Nov): 20–30% cheaper. Low season (May–Sep): often 40% cheaper but rooms with sea views can be hard to swim from. Always book direct on Trip.com 2–3 weeks ahead in high season — last-minute prices double.' },
    { q: 'Are Nai Harn hotels on the beach?', a: 'The Nai Harn has direct private path access (no road crossing). Most other hotels are 5–10 min walk to the beach OR offer free shuttle. None of the resorts are technically beachfront (the beach is municipal protected land). Wyndham Grand offers a free shuttle — its hill-top location is otherwise a 12-min walk down (and a steep walk back up).' },
    { q: 'Is Nai Harn cheaper or more expensive than Patong?', a: 'Comparable for like-for-like quality. Nai Harn skews slightly more upscale (fewer budget hotels, more boutique), so the average price is higher — but a 5* in Nai Harn often costs the same as a 5* in Patong. The savings come from fewer scams (no taxi-touts) and meals being competitively priced rather than tourist-marked-up.' },
  ];
  const faqNl = [
    { q: 'Wat is het beste hotel in Nai Harn?', a: 'Hangt af van wat je zoekt. The Nai Harn (5*, op de klif, zeezicht) is het beste voor stellen die luxe + romantiek willen. Wyndham Grand Nai Harn Beach Phuket (5*, heuvel, 3 pools) is het beste voor families met kinderen. Voor mid-budget stellen zijn Sunsuri of Coriacea de praktische keuze. Voor solo/budget: All Seasons Naiharn $80–110/nacht.' },
    { q: 'Zijn Nai Harn-hotels goed voor families?', a: 'Ja — Wyndham Grand heeft de sterkste familie-set (kids\' club, 3 pools, babysitting, familiebuffet, gratis shuttle). The Nai Harn verwelkomt families maar kids <8 kunnen het kliferterrein lastig vinden. Mid-range All Seasons Naiharn is ook familievriendelijk maar zonder kids\' club. Vermijd adults-only Coriacea en sommige delen van Sunsuri met jonge kinderen.' },
    { q: 'Wat kost een Nai Harn beach hotel?', a: 'Hoogseizoen (dec–feb): mid-range $90–150/nacht, upscale $200–350, luxe $350–500+. Schouderseizoen (mar–apr en okt–nov): 20–30% goedkoper. Laagseizoen (mei–sep): vaak 40% korting, maar zwemmen lastig. Boek Trip.com 2–3 weken vooruit in hoogseizoen — last-minute verdubbelt.' },
    { q: 'Liggen Nai Harn-hotels aan het strand?', a: 'The Nai Harn heeft een privépad (geen weg oversteken). De meeste andere hotels zijn 5–10 min lopen of bieden gratis shuttle. Geen van de resorts is technisch beachfront (strand is gemeentegrond). Wyndham Grand biedt gratis shuttle — heuveltop is anders 12 min naar beneden (en steile weg terug).' },
    { q: 'Is Nai Harn goedkoper of duurder dan Patong?', a: 'Vergelijkbaar voor dezelfde kwaliteit. Nai Harn leunt iets duurder (minder budgethotels, meer boutique). Een 5* in Nai Harn kost ongeveer hetzelfde als een 5* in Patong. Voordeel: minder scams (geen taxi-touts) en eten op normale prijs zonder toeristen-toeslag.' },
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
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-white/75">{isNl ? 'Nai Harn hotels-vergelijking' : 'Nai Harn hotels comparison'}</p>
            <h1 className="font-heading text-3xl lg:text-5xl font-bold mt-2">{h1}</h1>
            <p className="mt-4 text-lg lg:text-xl max-w-3xl opacity-95">
              {isNl
                ? 'Nai Harn heeft een kleine fleet — 6 hotels die echt het overwegen waard zijn. Twee grote ankers (The Nai Harn en Wyndham Grand) plus 4 mid-range opties. Hier vind je welke past bij jouw type vakantie en waar je echt klikken moet.'
                : "Nai Harn has a small hotel fleet — 6 properties genuinely worth considering. Two big anchors (The Nai Harn and Wyndham Grand) plus 4 mid-range options. Here's which one fits your trip and where to actually click."}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={withSubId(partners.trip_hotels.partnerUrl, placement('hero-primary'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-6 py-3 text-base font-semibold hover:bg-red-700 shadow-lg">
                {isNl ? 'Live tarieven op Trip.com' : 'See live rates on Trip.com'} →
              </a>
            </div>
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          {/* Comparison table */}
          <section id="comparison">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-2">{isNl ? 'Snelle vergelijking: 6 opties' : 'Quick compare: 6 picks'}</h2>
            <p className="text-gray-600 mb-6">{isNl ? 'Klik een hotelnaam voor live tarieven (we krijgen een kleine commissie zonder dat je extra betaalt).' : 'Click a hotel name for live rates (we earn a small commission at no extra cost to you).'}</p>
            <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Hotel' : 'Hotel'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Tier' : 'Tier'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Prijs' : 'Price'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Beste voor' : 'Best for'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Boek' : 'Book'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {hotels.map((h, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <Link href={`/phuket/nai-harn/hotels/${h.slug}/`} className="font-semibold text-thailand-blue hover:text-thailand-red hover:underline">{h.name}</Link>
                        <p className="text-xs text-gray-500 mt-0.5">{'★'.repeat(h.stars)} · {h.rooms} {isNl ? 'kamers' : 'rooms'}</p>
                      </td>
                      <td className="px-4 py-3 text-gray-700 capitalize">{h.tier}</td>
                      <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{h.priceBand}</td>
                      <td className="px-4 py-3 text-gray-700">{isNl ? h.bestFor.nl : h.bestFor.en}</td>
                      <td className="px-4 py-3"><a href={withSubId(partners[h.primaryPartnerKey]?.partnerUrl || partners.trip_hotels.partnerUrl, placement(`table-${h.slug}`))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-thailand-red font-semibold hover:underline whitespace-nowrap">{isNl ? 'Tarieven →' : 'Check rates →'}</a></td>
                    </tr>
                  ))}
                  {supplementary.map((h, i) => (
                    <tr key={`s-${i}`} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <a href={withSubId(partners[h.partnerKey]?.partnerUrl || partners.trip_hotels.partnerUrl, placement(`table-supp-${i}`))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="font-semibold text-thailand-blue hover:text-thailand-red hover:underline">{h.name}</a>
                        <p className="text-xs text-gray-500 mt-0.5">{'★'.repeat(h.stars)}</p>
                      </td>
                      <td className="px-4 py-3 text-gray-700 capitalize">{h.tier}</td>
                      <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{h.priceBand}</td>
                      <td className="px-4 py-3 text-gray-700">{isNl ? h.bestFor.nl : h.bestFor.en}</td>
                      <td className="px-4 py-3"><a href={withSubId(partners[h.partnerKey]?.partnerUrl || partners.trip_hotels.partnerUrl, placement(`table-supp-cta-${i}`))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-thailand-red font-semibold hover:underline whitespace-nowrap">{isNl ? 'Tarieven →' : 'Check rates →'}</a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Detailed reviewed hotels */}
          <section className="space-y-5">
            <h2 className="font-heading text-2xl font-bold text-gray-900">{isNl ? 'De 2 anker-hotels in detail' : 'The 2 anchor hotels in detail'}</h2>
            {hotels.map((h, i) => (
              <article key={i} className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-heading text-xl font-bold text-gray-900">
                    <Link href={`/phuket/nai-harn/hotels/${h.slug}/`} className="hover:text-thailand-red hover:underline">{h.name}</Link>
                  </h3>
                  <span className="shrink-0 inline-block rounded-full bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1">{isNl ? `Beste voor: ${h.bestFor.nl}` : `Best for: ${h.bestFor.en}`}</span>
                </div>
                <ul className="mt-3 space-y-1 text-sm text-gray-700">
                  {(isNl ? h.highlights.nl : h.highlights.en).slice(0, 4).map((hl, j) => (
                    <li key={j} className="flex gap-2"><span className="text-thailand-red">✓</span><span>{hl}</span></li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link href={`/phuket/nai-harn/hotels/${h.slug}/`} className="inline-flex items-center text-sm font-semibold text-thailand-blue hover:underline">{isNl ? 'Volledige review →' : 'Read full review →'}</Link>
                  <a href={withSubId(partners[h.primaryPartnerKey]?.partnerUrl || partners.trip_hotels.partnerUrl, placement(`card-${h.slug}`))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center rounded-full bg-thailand-red text-white px-4 py-1.5 text-sm font-semibold hover:bg-red-700">{isNl ? 'Tarieven op Trip.com' : 'Check rates on Trip.com'} →</a>
                </div>
              </article>
            ))}
          </section>

          {/* Buyer's guide */}
          <section className="rounded-2xl bg-amber-50 border border-amber-200 p-6">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Boekingstips Nai Harn hotels' : 'Booking tips for Nai Harn hotels'}</h2>
            <ul className="space-y-3 text-gray-800 text-sm">
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Boek 2–3 weken vooruit in hoogseizoen' : 'Book 2–3 weeks ahead in high season'}</strong>: {isNl ? 'dec–feb verkopen The Nai Harn en Wyndham Grand 90% van de kamers vooraf.' : 'Dec–Feb The Nai Harn and Wyndham Grand sell 90% of rooms in advance.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Sea-view kamers betalen' : 'Pay up for sea-view rooms'}</strong>: {isNl ? 'in The Nai Harn is het meerprijs ($60/nacht) zwaar het waard. Garden-view voelt als een gewoon hotel.' : 'at The Nai Harn the upcharge ($60/night) is well worth it — garden-view feels like a regular hotel.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Half-board waarde-check' : 'Check half-board math'}</strong>: {isNl ? 'Wyndham Grand half-pension ($45/persoon/dag) loont alleen als je 2 maaltijden in het hotel zou eten. Rawai heeft betere lokaal eten.' : "Wyndham Grand half-board ($45/person/day) only pays off if you'd actually eat both meals on-site. Rawai has better local food nearby."}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Vermijd kerst-jaarwisseling-toeslag' : 'Avoid the Christmas-NY surcharge'}</strong>: {isNl ? '20–28 dec en 28 dec–4 jan kosten 50–80% meer. Eerste week januari valt prijs terug; weer is identiek.' : '20–28 Dec and 28 Dec–4 Jan cost 50–80% more. Prices drop the first week of January with identical weather.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Auto/scooter mee-rekenen' : 'Factor in transport'}</strong>: {isNl ? 'Nai Harn is rustig — geen Grab-aanbod 1 km uit het centrum na 22:00. Reken op huurscooter ($6/dag) of huurauto.' : 'Nai Harn is quiet — Grab supply 1 km from the centre after 22:00 is sparse. Plan a rental scooter ($6/day) or rental car.'}</span></li>
            </ul>
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

          {/* Cluster mesh */}
          <section className="rounded-2xl bg-thailand-blue/10 p-6">
            <h2 className="font-heading text-xl font-bold text-gray-900">{isNl ? 'Verder met Phuket' : 'More on Phuket'}</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/phuket/nai-harn/" className="rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">{isNl ? '↑ Nai Harn complete gids' : '↑ Nai Harn full guide'}</Link>
              <Link href="/phuket/rawai/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏘️ Rawai gids' : '🏘️ Rawai guide'}</Link>
              <Link href="/phuket/old-town/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏛️ Old Phuket Town' : '🏛️ Old Phuket Town'}</Link>
              <Link href="/best-hotels/phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏨 Beste hotels Phuket-breed' : '🏨 Best hotels island-wide'}</Link>
              <Link href="/yacht-charter-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '⛵ Yacht charter' : '⛵ Yacht charter'}</Link>
              <Link href="/flights-to-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '✈️ Vluchten naar Phuket' : '✈️ Flights to Phuket'}</Link>
              <Link href="/car-rental-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🚗 Auto huren' : '🚗 Car rental Phuket'}</Link>
              <Link href="/city/phuket/" className="rounded-full bg-white text-gray-900 border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50">{isNl ? '📖 Phuket reisgids' : '📖 Phuket travel guide'}</Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const partnersFile = path.join(process.cwd(), 'data', 'pseo', 'areas', 'nai-harn-partners.json');
  const hotelsFile = path.join(process.cwd(), 'data', 'pseo', 'areas', 'nai-harn-hotels.json');
  const partnersData = JSON.parse(fs.readFileSync(partnersFile, 'utf8'));
  const hotelsData = JSON.parse(fs.readFileSync(hotelsFile, 'utf8'));

  const hotels: HotelLite[] = hotelsData.hotels.map((h: any) => ({
    slug: h.slug,
    name: h.name,
    fullName: h.fullName,
    tier: h.tier,
    stars: h.stars,
    primaryPartnerKey: h.primaryPartnerKey,
    bestFor: h.bestFor,
    priceBand: h.priceBand,
    rooms: h.rooms,
    highlights: h.highlights,
  }));

  return { props: { partners: partnersData.partners, hotels, lastUpdated: partnersData.lastUpdated }, revalidate: 604800 };
};
