import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import SEOHead from '../../../../components/SEOHead';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import { withSubId } from '../../../../lib/affiliates';
import { useSubId } from '../../../../lib/useSubId';

interface BilingualText { en: string; nl: string; }
interface BilingualList { en: string[]; nl: string[]; }
interface Hotel {
  slug: string; name: string; primaryKeyword: string; tier: string; stars: number;
  priceFrom: number; priceTo: number; rooms: number; yearBuilt: number; renovated: number;
  beachDistance: string; tripPartnerKey: string;
  summary: BilingualText; pros: BilingualList; cons: BilingualList;
}
interface Partner { partnerUrl: string; label: string; }
type PartnersMap = Record<string, Partner>;
interface Props { hotel: Hotel; tripUrl: string; lastUpdated: string; }

export default function BangTaoHotelReview({ hotel, tripUrl, lastUpdated }: Props) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const subId = useSubId();
  const placement = (p: string) => `${subId}-pseo-phuket-bang-tao-${hotel.slug}-${p}`;

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Phuket', href: '/city/phuket/' },
    { name: 'Bang Tao Beach', href: '/phuket/bang-tao/' },
    { name: 'Hotels', href: '/phuket/bang-tao/hotels/' },
    { name: hotel.name, href: `/phuket/bang-tao/hotels/${hotel.slug}/` },
  ];

  const seoTitle = `${hotel.name} (2026): ${isNl ? 'Eerlijke Review' : 'Honest Review'}`.slice(0, 59);
  const seoDescription = isNl
    ? `Is ${hotel.name} de juiste keuze? ${hotel.tier}, $${hotel.priceFrom}–${hotel.priceTo}/nacht, ${hotel.beachDistance}. Pros, cons, FAQ — eerlijke 2026 review.`.slice(0, 154)
    : `Is ${hotel.name} the right pick? ${hotel.tier}, $${hotel.priceFrom}–${hotel.priceTo}/night, ${hotel.beachDistance}. Honest 2026 review with pros, cons & FAQ.`.slice(0, 154);
  const canonical = `https://go2-thailand.com${isNl ? '/nl' : ''}/phuket/bang-tao/hotels/${hotel.slug}/`;

  const breadcrumbJsonLd = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: breadcrumbs.map((b, i) => ({ '@type': 'ListItem', position: i + 1, name: b.name, item: `https://go2-thailand.com${isNl ? '/nl' : ''}${b.href}` })) };
  const hotelJsonLd = {
    '@context': 'https://schema.org', '@type': 'Hotel', name: hotel.name,
    starRating: { '@type': 'Rating', ratingValue: hotel.stars },
    address: { '@type': 'PostalAddress', addressLocality: 'Bang Tao Beach', addressRegion: 'Phuket', addressCountry: 'TH' },
    priceRange: `$${hotel.priceFrom}–${hotel.priceTo}`, numberOfRooms: hotel.rooms,
  };

  const faqEn = [
    { q: `How much does ${hotel.name} cost?`, a: `Standard rooms run $${hotel.priceFrom}–${hotel.priceTo}/night across the year. Peak (Christmas/NY): 60–80% above the high end. Low season (May–Oct): often 25–35% below the low end. Suite upgrades typically 1.5–2× the standard room rate.` },
    { q: `Is ${hotel.name} on Bang Tao Beach itself?`, a: `${hotel.beachDistance}. Bang Tao is Phuket\'s longest beach (8 km), gently sloping, lifeguards in high season, and 1 km from the Boat Avenue dining strip.` },
    { q: `When was ${hotel.name} renovated?`, a: `Built in ${hotel.yearBuilt}, last refreshed in ${hotel.renovated}. The 2024 update touched lobby, public areas and most rooms; older rooms in the original block may not feel as fresh.` },
    { q: `Does ${hotel.name} include Boat Avenue access?`, a: `Yes — all Bang Tao hotels are within walking distance (5–15 min) of Boat Avenue, Phuket\'s best mid-range dining strip. ${hotel.name} also operates a free shuttle to the beach during day hours.` },
    { q: `Hilton Honors points + ${hotel.name}?`, a: `${hotel.name} stacks Hilton Honors nights, points, and elite tier credits at standard Hilton Garden Inn rates. Diamond-tier perks (room upgrades, breakfast included) apply normally.` },
    { q: `${hotel.name} vs Banyan Tree Phuket — which is right for me?`, a: `Banyan Tree is all-villa luxury at $500+/night. ${hotel.name} is upper-mid Hilton at $90–200/night and 5 min walking from the same beach. If your stay is for the beach + dining (not for ultra-luxury bedroom), ${hotel.name} delivers 80% of the experience at 25% of the price.` },
    { q: `How do I get to ${hotel.name} from Phuket Airport?`, a: `17 km / 25 min by taxi ($15–20). Closer than any other major Phuket beach. Hilton Garden Inn often runs a paid airport shuttle service ($18–22 one-way) — confirm at booking.` },
  ];

  const faqNl = [
    { q: `Wat kost ${hotel.name}?`, a: `Standaardkamers $${hotel.priceFrom}–${hotel.priceTo}/nacht door het jaar. Piek (Kerst/NJ): 60–80% boven de high-end. Laagseizoen (mei–okt): vaak 25–35% onder de low-end. Suite-upgrades meestal 1,5–2× standaard.` },
    { q: `Ligt ${hotel.name} aan Bang Tao Beach zelf?`, a: `${hotel.beachDistance}. Bang Tao is Phuket\'s langste strand (8 km), zacht-glooiend, lifeguards in hoogseizoen, en 1 km van de Boat Avenue dining-strook.` },
    { q: `Wanneer is ${hotel.name} gerenoveerd?`, a: `Gebouwd in ${hotel.yearBuilt}, laatst opgefrist in ${hotel.renovated}. De 2024-update raakte lobby, openbare ruimtes en meeste kamers; oudere kamers in originele blok voelen mogelijk minder fris.` },
    { q: `Heeft ${hotel.name} toegang tot Boat Avenue?`, a: `Ja — alle Bang Tao hotels zijn op loopafstand (5–15 min) van Boat Avenue, Phuket\'s beste mid-range dining-strook. ${hotel.name} biedt ook gratis shuttle naar het strand overdag.` },
    { q: `Hilton Honors-punten + ${hotel.name}?`, a: `${hotel.name} stapelt Hilton Honors-nachten, punten en elite-credits op standaard Hilton Garden Inn-tarieven. Diamond-tier voordelen (room upgrades, ontbijt inbegrepen) gelden gewoon.` },
    { q: `${hotel.name} vs Banyan Tree Phuket — welk past?`, a: `Banyan Tree is all-villa luxe op $500+/nacht. ${hotel.name} is upper-mid Hilton op $90–200/nacht en 5 min lopen van hetzelfde strand. Als je verblijf voor strand + dining is (niet voor ultra-luxe slaapkamer), levert ${hotel.name} 80% van de ervaring op 25% van de prijs.` },
    { q: `Hoe kom ik naar ${hotel.name} vanaf Phuket Airport?`, a: `17 km / 25 min met taxi ($15–20). Dichterbij dan elk ander hoofdstrand. Hilton Garden Inn biedt vaak betaalde airport-shuttle ($18–22 enkele reis) — bevestig bij boeking.` },
  ];

  const faqList = isNl ? faqNl : faqEn;
  const faqJsonLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqList.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };

  const summary = isNl ? hotel.summary.nl : hotel.summary.en;
  const pros = isNl ? hotel.pros.nl : hotel.pros.en;
  const cons = isNl ? hotel.cons.nl : hotel.cons.en;

  return (
    <>
      <SEOHead title={seoTitle} description={seoDescription}>
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </SEOHead>
      <div className="bg-surface-cream min-h-screen">
        <section className="bg-thailand-blue text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Breadcrumbs items={breadcrumbs} />
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-white/75">{isNl ? 'Bang Tao hotel review' : 'Bang Tao hotel review'}</p>
            <h1 className="font-heading text-3xl lg:text-5xl font-bold mt-2">{isNl ? `${hotel.name}: eerlijke review met prijzen, pros en cons` : `${hotel.name}: Honest Review with Pricing, Pros & Cons`}</h1>
            <p className="mt-4 text-lg lg:text-xl max-w-3xl opacity-95">{summary}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={withSubId(tripUrl, placement('hero'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-6 py-3 text-base font-semibold hover:bg-red-700 shadow-lg">{isNl ? `Bekijk ${hotel.name} op Trip.com` : `See ${hotel.name} on Trip.com`} →</a>
              <Link href="/phuket/bang-tao/hotels/" className="rounded-full bg-white text-thailand-blue border border-white/40 px-6 py-3 text-base font-semibold hover:bg-white/90">{isNl ? '← Vergelijk alle Bang Tao hotels' : '← Compare all Bang Tao hotels'}</Link>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-xs opacity-90">
              <span>✔ {hotel.stars}★</span>
              <span>✔ {hotel.rooms} {isNl ? 'kamers' : 'rooms'}</span>
              <span>✔ ${hotel.priceFrom}–${hotel.priceTo}/{isNl ? 'nacht' : 'night'}</span>
              <span>✔ {isNl ? 'Bijgewerkt' : 'Updated'} {new Date(lastUpdated).toLocaleDateString(isNl ? 'nl-NL' : 'en', { year: 'numeric', month: 'long' })}</span>
            </div>
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <section className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'In één oogopslag' : 'At a glance'}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Tier' : 'Tier'}</p><p className="mt-1 font-heading font-bold text-gray-900 text-base">{hotel.tier}</p></div>
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Sterren' : 'Stars'}</p><p className="mt-1 font-heading font-bold text-gray-900 text-base">{hotel.stars}★</p></div>
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Kamers' : 'Rooms'}</p><p className="mt-1 font-heading font-bold text-gray-900 text-base">{hotel.rooms}</p></div>
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Prijs' : 'Price'}</p><p className="mt-1 font-heading font-bold text-gray-900 text-base">${hotel.priceFrom}–${hotel.priceTo}</p></div>
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Strand' : 'Beach'}</p><p className="mt-1 font-heading font-bold text-gray-900 text-base">{hotel.beachDistance}</p></div>
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Gebouwd' : 'Built'}</p><p className="mt-1 font-heading font-bold text-gray-900 text-base">{hotel.yearBuilt}</p></div>
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Gerenoveerd' : 'Renovated'}</p><p className="mt-1 font-heading font-bold text-gray-900 text-base">{hotel.renovated}</p></div>
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Locatie' : 'Location'}</p><p className="mt-1 font-heading font-bold text-gray-900 text-base">Bang Tao</p></div>
            </div>
          </section>

          <section className="grid md:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-green-50 border border-green-200 p-6">
              <h2 className="font-heading text-xl font-bold text-green-900 mb-3">✅ {isNl ? 'Pros' : 'Pros'}</h2>
              <ul className="space-y-2 text-gray-800 text-sm">
                {pros.map((p, i) => (<li key={i} className="flex gap-2"><span className="text-green-700 font-bold">✓</span><span>{p}</span></li>))}
              </ul>
            </div>
            <div className="rounded-2xl bg-amber-50 border border-amber-200 p-6">
              <h2 className="font-heading text-xl font-bold text-amber-900 mb-3">⚠️ {isNl ? 'Cons' : 'Cons'}</h2>
              <ul className="space-y-2 text-gray-800 text-sm">
                {cons.map((c, i) => (<li key={i} className="flex gap-2"><span className="text-amber-700 font-bold">!</span><span>{c}</span></li>))}
              </ul>
            </div>
          </section>

          <section className="rounded-2xl bg-thailand-red/5 border-2 border-thailand-red p-6">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Onze conclusie' : 'Our verdict'}</h2>
            <p className="text-gray-700 leading-relaxed mb-3">{summary}</p>
            <a href={withSubId(tripUrl, placement('verdict'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">{isNl ? 'Bekijk live tarieven' : 'See live rates'} →</a>
          </section>

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

          <section className="rounded-2xl bg-thailand-blue/10 p-6">
            <h2 className="font-heading text-xl font-bold text-gray-900">{isNl ? 'Plan je Bang Tao-trip' : 'Plan your Bang Tao trip'}</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/phuket/bang-tao/hotels/" className="rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">{isNl ? '🏨 Vergelijk alle Bang Tao hotels' : '🏨 Compare all Bang Tao hotels'}</Link>
              <Link href="/phuket/bang-tao/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏖️ Bang Tao gids' : '🏖️ Bang Tao guide'}</Link>
              <Link href="/phuket/kamala/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏝️ Kamala' : '🏝️ Kamala'}</Link>
              <Link href="/phuket/surin/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏝️ Surin' : '🏝️ Surin'}</Link>
              <Link href="/best-hotels/phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏨 Alle Phuket hotels' : '🏨 All Phuket hotels'}</Link>
              <Link href="/city/phuket/" className="rounded-full bg-white text-gray-900 border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50">{isNl ? '📖 Phuket reisgids' : '📖 Phuket travel guide'}</Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const file = path.join(process.cwd(), 'data', 'pseo', 'areas', 'bang-tao-hotels.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const paths = (data.hotels as Hotel[]).map(h => ({ params: { 'hotel-slug': h.slug } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.['hotel-slug'] as string;
  const hotelsFile = path.join(process.cwd(), 'data', 'pseo', 'areas', 'bang-tao-hotels.json');
  const partnersFile = path.join(process.cwd(), 'data', 'pseo', 'areas', 'bang-tao-partners.json');
  const hotelsData = JSON.parse(fs.readFileSync(hotelsFile, 'utf8'));
  const partnersData = JSON.parse(fs.readFileSync(partnersFile, 'utf8'));
  const hotel = (hotelsData.hotels as Hotel[]).find(h => h.slug === slug);
  if (!hotel) return { notFound: true, revalidate: 60 };
  const partners: PartnersMap = partnersData.partners;
  const partner = partners[hotel.tripPartnerKey];
  const tripUrl = partner ? partner.partnerUrl : partners['trip_pillar'].partnerUrl;
  return { props: { hotel, tripUrl, lastUpdated: hotelsData.lastUpdated }, revalidate: 604800 };
};
