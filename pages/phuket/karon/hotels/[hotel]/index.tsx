import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import SEOHead from '../../../../../components/SEOHead';
import Breadcrumbs from '../../../../../components/Breadcrumbs';
import { withSubId, TRIP_GENERIC } from '../../../../../lib/affiliates';
import { useSubId } from '../../../../../lib/useSubId';

interface PartnersFile {
  trip_karon_city: { partnerUrl: string };
  trip_karon_hotel_search: { partnerUrl: string };
  trip_pullman: { partnerUrl: string };
  trip_centara: { partnerUrl: string };
  trip_mandarava: { partnerUrl: string };
  trip_beyond: { partnerUrl: string };
  trip_avista: { partnerUrl: string };
}

interface RoomType { name: string; priceBand: string; for: string; }
interface Hotel {
  slug: string;
  name: string;
  shortName: string;
  partnerKey: keyof PartnersFile;
  category: string;
  tier: string;
  priceBand: string;
  rooms: number;
  beachDistance: string;
  pools: string;
  breakfast: string;
  valueProp: string;
  aiSeoNote?: string;
  pros: string[];
  cons: string[];
  bestRoomTypes: RoomType[];
  location: string;
  transfer: string;
  faq: { q: string; a: string }[];
}

interface Sibling { slug: string; shortName: string; tier: string; priceBand: string; }

interface Props {
  hotel: Hotel;
  partners: PartnersFile;
  siblings: Sibling[];
  lastUpdated: string;
}

// Per-hotel SEO copy — title <60, H1 different, desc <155 — bilingual
const HOTEL_SEO: Record<string, { titleEn: string; titleNl: string; h1En: string; h1Nl: string; descEn: string; descNl: string; }> = {
  'pullman-phuket-arcadia-karon-beach-resort': {
    titleEn: 'Pullman Phuket Arcadia Karon Beach Resort: Honest Review',
    titleNl: 'Pullman Phuket Arcadia Karon Beach Resort: Eerlijke Review',
    h1En: 'Pullman Arcadia Karon: Five Pools, 277 Rooms & 3-Min Beach Walk',
    h1Nl: 'Pullman Arcadia Karon: 5 zwembaden, 277 kamers & 3 min naar zee',
    descEn: 'Wondering if Pullman Arcadia Karon is right for your Phuket trip? Honest review of pools, rooms, beach walk and family vibe — book direct on Trip.com.',
    descNl: 'Klopt Pullman Arcadia Karon voor je Phuket-trip? Eerlijke review van zwembaden, kamers, strandafstand en familievibe — boek direct op Trip.com.',
  },
  'centara-grand-beach-resort-phuket': {
    titleEn: 'Centara Grand Karon Resort Phuket: Honest Review (2026)',
    titleNl: 'Centara Grand Karon Resort Phuket: Eerlijke Review',
    h1En: 'Centara Grand Karon: The Only True Beachfront Five-Star',
    h1Nl: 'Centara Grand Karon: het enige echte beachfront vijf-sterren',
    descEn: 'Looking at Centara Grand Karon for Phuket? Honest review — beachfront access, water slides, room types and what families should know before booking.',
    descNl: 'Op zoek naar Centara Grand Karon voor Phuket? Eerlijke review — beachfront, waterglijbanen, kamertypes en wat families moeten weten vóór ze boeken.',
  },
  'mandarava-resort-and-spa-karon-beach': {
    titleEn: 'Mandarava Resort & Spa Karon Beach: Review of 9-Pool Hilltop',
    titleNl: 'Mandarava Resort & Spa Karon Beach: 9-Pool Review',
    h1En: 'Mandarava Karon Beach: 9 Cascading Pools & Hilltop Pool Suites',
    h1Nl: 'Mandarava Karon Beach: 9 cascadezwembaden & hilltop pool suites',
    descEn: 'Considering Mandarava Resort and Spa Karon Beach? Review of the 9-pool hilltop, pool-access rooms, beach shuttle and where it falls short.',
    descNl: 'Twijfel je over Mandarava Resort and Spa Karon Beach? Review van het 9-pool heuvelresort, pool-access kamers, strandshuttle en waar het tekortschiet.',
  },
  'beyond-resort-karon': {
    titleEn: 'Beyond Resort Karon: Adults-Only Beachfront Review (2026)',
    titleNl: 'Beyond Resort Karon: Adults-Only Beachfront Review (2026)',
    h1En: 'Beyond Resort Karon: Adults-Only Beachfront on Quiet North End',
    h1Nl: 'Beyond Resort Karon: adults-only beachfront aan rustige noordzijde',
    descEn: "Wondering if Beyond Resort Karon suits couples? Honest review of the adults-only resort — beachfront access, sunset bar, room types and what to skip.",
    descNl: 'Past Beyond Resort Karon bij stellen? Eerlijke review van het adults-only resort — beachfront, sunset bar, kamertypes en wat je kunt overslaan.',
  },
  'avista-grande-karon-mgallery': {
    titleEn: 'Avista Grande Phuket Karon MGallery: Honest Boutique Review',
    titleNl: 'Avista Grande Phuket Karon MGallery: Boutique Review',
    h1En: 'Avista Grande Karon: MGallery Boutique with Rooftop Andaman Pool',
    h1Nl: 'Avista Grande Karon: MGallery boutique met dakzwembad over Andaman',
    descEn: 'Looking at Avista Grande Phuket Karon MGallery? Boutique hotel review — rooftop infinity pool, design rooms, service and the 8-min beach walk.',
    descNl: 'Bekijk je Avista Grande Phuket Karon MGallery? Boutique-hotelreview — dakzwembad, designkamers, service en de 8 minuten lopen naar het strand.',
  },
};

export default function KaronHotelDetailPage({ hotel, partners, siblings, lastUpdated }: Props) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const subId = useSubId();
  const seo = HOTEL_SEO[hotel.slug];

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Phuket', href: '/city/phuket/' },
    { name: 'Karon Beach', href: '/phuket/karon/' },
    { name: isNl ? 'Hotels' : 'Hotels', href: '/phuket/karon/hotels/' },
    { name: hotel.shortName, href: `/phuket/karon/hotels/${hotel.slug}/` },
  ];

  const seoTitle = isNl ? seo.titleNl : seo.titleEn;
  const seoDescription = isNl ? seo.descNl : seo.descEn;
  const h1 = isNl ? seo.h1Nl : seo.h1En;

  const canonical = `https://go2-thailand.com${isNl ? '/nl' : ''}/phuket/karon/hotels/${hotel.slug}/`;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, i) => ({
      '@type': 'ListItem', position: i + 1, name: b.name,
      item: `https://go2-thailand.com${isNl ? '/nl' : ''}${b.href}`,
    })),
  };

  const faqJsonLd = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: hotel.faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };

  const partnerUrl = partners[hotel.partnerKey]?.partnerUrl
    ? withSubId(partners[hotel.partnerKey].partnerUrl, subId)
    : withSubId(TRIP_GENERIC, subId);

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
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-white/75">{hotel.category} · Karon Beach, Phuket</p>
            <h1 className="font-heading text-3xl lg:text-5xl font-bold mt-2">{h1}</h1>
            <p className="mt-4 text-lg lg:text-xl max-w-3xl opacity-95">{hotel.valueProp}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={partnerUrl} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-6 py-3 text-base font-semibold hover:bg-red-700 shadow-lg">
                {isNl ? `Bekijk prijs op Trip.com` : `Check rates on Trip.com`} →
              </a>
              <Link href="/phuket/karon/hotels/" className="rounded-full bg-white/15 text-white border border-white/30 px-6 py-3 text-base font-semibold hover:bg-white/25">
                {isNl ? '← Vergelijk alle Karon hotels' : '← Compare all Karon hotels'}
              </Link>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-xs opacity-90">
              <span>✔ {hotel.priceBand}</span>
              <span>✔ {hotel.rooms} {isNl ? 'kamers' : 'rooms'}</span>
              <span>✔ {hotel.beachDistance}</span>
              <span>✔ {isNl ? 'Bijgewerkt' : 'Updated'} {new Date(lastUpdated).toLocaleDateString(isNl ? 'nl-NL' : 'en', { year: 'numeric', month: 'long' })}</span>
            </div>
          </div>
        </section>

        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          {/* Quick stats */}
          <section className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
              <p className="text-xs uppercase tracking-wide text-gray-500">{isNl ? 'Prijs' : 'Price'}</p>
              <p className="mt-1 text-base font-bold text-gray-900">{hotel.priceBand}</p>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
              <p className="text-xs uppercase tracking-wide text-gray-500">{isNl ? 'Kamers' : 'Rooms'}</p>
              <p className="mt-1 text-base font-bold text-gray-900">{hotel.rooms}</p>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
              <p className="text-xs uppercase tracking-wide text-gray-500">{isNl ? 'Strand' : 'Beach'}</p>
              <p className="mt-1 text-sm font-bold text-gray-900">{hotel.beachDistance}</p>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
              <p className="text-xs uppercase tracking-wide text-gray-500">{isNl ? 'Zwembaden' : 'Pools'}</p>
              <p className="mt-1 text-sm font-bold text-gray-900">{hotel.pools}</p>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
              <p className="text-xs uppercase tracking-wide text-gray-500">{isNl ? 'Ontbijt' : 'Breakfast'}</p>
              <p className="mt-1 text-sm font-bold text-gray-900">{hotel.breakfast}</p>
            </div>
          </section>

          {hotel.aiSeoNote && (
            <section className="rounded-2xl bg-amber-50 border border-amber-200 p-4 text-sm text-gray-800">
              <strong>{isNl ? 'Goed om te weten' : 'Good to know'}:</strong> {hotel.aiSeoNote}
            </section>
          )}

          {/* Pros + cons */}
          <section className="grid md:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white p-5 shadow-sm border-l-4 border-green-500">
              <h2 className="font-heading text-lg font-bold text-gray-900 mb-3">{isNl ? "Waarom hier verblijven" : "Why stay here"}</h2>
              <ul className="space-y-2 text-sm text-gray-700">
                {hotel.pros.map((p, i) => <li key={i} className="flex gap-2"><span className="text-green-600 font-bold">✓</span><span>{p}</span></li>)}
              </ul>
            </div>
            <div className="rounded-2xl bg-white p-5 shadow-sm border-l-4 border-red-400">
              <h2 className="font-heading text-lg font-bold text-gray-900 mb-3">{isNl ? 'Waar je rekening mee moet houden' : 'What to watch out for'}</h2>
              <ul className="space-y-2 text-sm text-gray-700">
                {hotel.cons.map((c, i) => <li key={i} className="flex gap-2"><span className="text-red-500 font-bold">!</span><span>{c}</span></li>)}
              </ul>
            </div>
          </section>

          {/* Best room types */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Welke kamercategorie kies je?' : 'Which room category to pick'}</h2>
            <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Kamertype' : 'Room type'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Prijsklasse' : 'Price band'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Beste voor' : 'Best for'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Boek' : 'Book'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {hotel.bestRoomTypes.map((r) => (
                    <tr key={r.name} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-semibold text-gray-900">{r.name}</td>
                      <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{r.priceBand}</td>
                      <td className="px-4 py-3 text-gray-700">{r.for}</td>
                      <td className="px-4 py-3"><a href={partnerUrl} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-thailand-red font-semibold hover:underline whitespace-nowrap">{isNl ? 'Bekijk →' : 'Check →'}</a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-gray-500">{isNl ? 'Prijzen zijn typische 2026 hoogseizoen-tarieven. Klik door naar Trip.com voor live data.' : 'Prices are typical 2026 high-season ranges. Click through to Trip.com for live availability.'}</p>
          </section>

          {/* Location + transfer */}
          <section className="grid md:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
              <h2 className="font-heading text-lg font-bold text-gray-900 mb-3">{isNl ? 'Locatie' : 'Location'}</h2>
              <p className="text-sm text-gray-700 leading-relaxed">{hotel.location}</p>
            </div>
            <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
              <h2 className="font-heading text-lg font-bold text-gray-900 mb-3">{isNl ? 'Hoe kom je er' : 'Getting there'}</h2>
              <p className="text-sm text-gray-700 leading-relaxed">{hotel.transfer}</p>
            </div>
          </section>

          {/* Big CTA */}
          <section className="rounded-2xl bg-thailand-red/5 border-2 border-thailand-red p-6 text-center">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-2">{isNl ? `Boek ${hotel.shortName} op Trip.com` : `Book ${hotel.shortName} on Trip.com`}</h2>
            <p className="text-gray-700 mb-4 max-w-2xl mx-auto">{isNl ? "Trip.com heeft 30 dagen cookie-attributie en doorgaans betere luxe-hoteltarieven dan Booking.com. Vergelijk minimaal 5 minuten voor je boekt." : 'Trip.com has 30-day cookie attribution and typically lower luxury-hotel rates than Booking.com. Compare for at least 5 min before you book.'}</p>
            <a href={partnerUrl} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center rounded-full bg-thailand-red text-white px-8 py-3 text-base font-semibold hover:bg-red-700">
              {isNl ? 'Check prijs en beschikbaarheid →' : 'Check rates & availability →'}
            </a>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? `Veelgestelde vragen over ${hotel.shortName}` : `${hotel.shortName} FAQ`}</h2>
            <div className="space-y-3">
              {hotel.faq.map((f, i) => (
                <details key={i} className="rounded-2xl bg-white p-4 shadow-sm border border-gray-200">
                  <summary className="font-semibold text-gray-900 cursor-pointer">{f.q}</summary>
                  <p className="mt-2 text-gray-700 text-sm leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Sibling hotels */}
          {siblings.length > 0 && (
            <section>
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Andere hotels op Karon Beach' : 'Other hotels on Karon Beach'}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {siblings.map((s) => (
                  <Link key={s.slug} href={`/phuket/karon/hotels/${s.slug}/`} className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100 hover:border-thailand-blue transition-colors">
                    <p className="font-semibold text-thailand-blue text-sm">{s.shortName}</p>
                    <p className="mt-1 text-xs text-gray-600">{s.tier}</p>
                    <p className="mt-1 text-xs text-gray-700">{s.priceBand}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Cluster mesh */}
          <section className="rounded-2xl bg-thailand-blue/10 p-6">
            <h2 className="font-heading text-xl font-bold text-gray-900">{isNl ? 'Plan de rest van je trip' : 'Plan the rest of your trip'}</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/phuket/karon/hotels/" className="rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">{isNl ? '🏨 Alle Karon hotels' : '🏨 All Karon hotels'}</Link>
              <Link href="/phuket/karon/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏖️ Karon Beach gids' : '🏖️ Karon Beach guide'}</Link>
              <Link href="/best-hotels/phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏨 Beste Phuket hotels' : '🏨 Phuket hotels overall'}</Link>
              <Link href="/flights-to-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '✈️ Vluchten naar Phuket' : '✈️ Flights to Phuket'}</Link>
              <Link href="/city/phuket/" className="rounded-full bg-white text-gray-900 border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50">{isNl ? '📖 Phuket reisgids' : '📖 Phuket travel guide'}</Link>
            </div>
          </section>

          {/* Methodology */}
          <section className="rounded-2xl bg-gray-50 border border-gray-200 p-6 text-sm text-gray-700">
            <h2 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? 'Hoe deze review tot stand kwam' : 'How this review was built'}</h2>
            <p>{isNl ? "Eerlijke voor- en nadelen samengesteld uit recente TripAdvisor 1- en 2-sterren-reviews (2024–2026), Booking.com en Trip.com gastfeedback. Tarieven steekproefsgewijs gecheckt mei 2026 voor reizen in november 2026. Wij verdienen commissie als je via onze Trip.com link boekt — dit verandert niets aan welke nadelen we noemen." : 'Honest pros and cons distilled from recent TripAdvisor 1- and 2-star reviews (2024–2026), Booking.com and Trip.com guest feedback. Rates spot-checked May 2026 for November 2026 travel dates. We earn commission if you book through our Trip.com link — this never changes which negatives we call out.'}</p>
          </section>
        </main>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const file = path.join(process.cwd(), 'data', 'pseo', 'areas', 'karon-hotels.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const paths = data.hotels.map((h: Hotel) => ({ params: { hotel: h.slug } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.hotel as string;
  const hotelsFile = path.join(process.cwd(), 'data', 'pseo', 'areas', 'karon-hotels.json');
  const hotelsData = JSON.parse(fs.readFileSync(hotelsFile, 'utf8'));
  const hotel: Hotel | undefined = hotelsData.hotels.find((h: Hotel) => h.slug === slug);
  if (!hotel) return { notFound: true };

  const partnersFile = path.join(process.cwd(), 'data', 'pseo', 'areas', 'karon-partners.json');
  const partnersData = JSON.parse(fs.readFileSync(partnersFile, 'utf8'));

  const siblings: Sibling[] = hotelsData.hotels
    .filter((h: Hotel) => h.slug !== slug)
    .map((h: Hotel) => ({ slug: h.slug, shortName: h.shortName, tier: h.tier, priceBand: h.priceBand }));

  return {
    props: {
      hotel,
      partners: partnersData.partners,
      siblings,
      lastUpdated: hotelsData.lastUpdated,
    },
    revalidate: 604800,
  };
};
