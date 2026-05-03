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
  slug: string;
  name: string;
  primaryKeyword: string;
  tier: string;
  stars: number;
  priceFrom: number;
  priceTo: number;
  rooms: number;
  yearBuilt: number;
  renovated: number;
  beachDistance: string;
  tripPartnerKey: string;
  summary: BilingualText;
  pros: BilingualList;
  cons: BilingualList;
}

interface Partner { partnerUrl: string; label: string; }
type PartnersMap = Record<string, Partner>;

interface Props { hotel: Hotel; tripUrl: string; lastUpdated: string; siblings: Array<{ slug: string; name: string }>; }

export default function KamalaHotelReview({ hotel, tripUrl, lastUpdated, siblings }: Props) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const subId = useSubId();
  const placement = (p: string) => `${subId}-pseo-phuket-kamala-${hotel.slug}-${p}`;

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Phuket', href: '/city/phuket/' },
    { name: 'Kamala Beach', href: '/phuket/kamala/' },
    { name: 'Hotels', href: '/phuket/kamala/hotels/' },
    { name: hotel.name, href: `/phuket/kamala/hotels/${hotel.slug}/` },
  ];

  const seoTitle = `${hotel.name} (2026): ${isNl ? 'Eerlijke Review' : 'Honest Review'}`.slice(0, 59);
  const seoDescription = isNl
    ? `Is ${hotel.name} de juiste keuze? ${hotel.tier} resort, $${hotel.priceFrom}–${hotel.priceTo}/nacht, ${hotel.beachDistance}. Pros, cons, FAQ — eerlijke 2026 review.`.slice(0, 154)
    : `Is ${hotel.name} the right pick? ${hotel.tier} resort, $${hotel.priceFrom}–${hotel.priceTo}/night, ${hotel.beachDistance}. Honest 2026 review with pros, cons & FAQ.`.slice(0, 154);
  const canonical = `https://go2-thailand.com${isNl ? '/nl' : ''}/phuket/kamala/hotels/${hotel.slug}/`;

  const breadcrumbJsonLd = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: breadcrumbs.map((b, i) => ({ '@type': 'ListItem', position: i + 1, name: b.name, item: `https://go2-thailand.com${isNl ? '/nl' : ''}${b.href}` })) };

  const hotelJsonLd = {
    '@context': 'https://schema.org', '@type': 'Hotel',
    name: hotel.name,
    starRating: { '@type': 'Rating', ratingValue: hotel.stars },
    address: { '@type': 'PostalAddress', addressLocality: 'Kamala Beach', addressRegion: 'Phuket', addressCountry: 'TH' },
    priceRange: `$${hotel.priceFrom}–${hotel.priceTo}`,
    numberOfRooms: hotel.rooms,
  };

  const faqEn = [
    { q: `How much does ${hotel.name} cost?`, a: `Standard rooms run $${hotel.priceFrom}–${hotel.priceTo}/night across the year. Peak (Christmas/NY): 60–80% above the high end. Low season (May–Oct): often 25–35% below the low end. Suites and pool villas: typically 1.5–2× the standard room rate.` },
    { q: `Is ${hotel.name} on Kamala Beach itself?`, a: `${hotel.beachDistance}. The Kamala beach is the gently-sloping 2 km strip on Phuket's west coast, 15 min north of Patong, lifeguard-staffed in high season.` },
    { q: `When was ${hotel.name} last renovated?`, a: `Originally built in ${hotel.yearBuilt}, the most recent significant renovation was completed in ${hotel.renovated}. Older wing rooms may not feel as fresh as the renovated stock — request a renovated room at booking if it matters to you.` },
    { q: `How many rooms does ${hotel.name} have?`, a: `${hotel.rooms} rooms across the property. Resort scale at this size means efficient kids' clubs and pools, but also peak-week queues at restaurants — book breakfast slot or eat in the village.` },
    { q: `Is breakfast included at ${hotel.name}?`, a: `Some rate plans include breakfast as standard, others charge $15–25/person/night. Confirm in the booking flow on Trip.com — the same room can show up at multiple meal-plan tiers.` },
    { q: `What's the best alternative if ${hotel.name} is full?`, a: `Within Kamala: ${siblings.map(s => s.name).join(', ')}. Outside Kamala: similar-tier options in Bang Tao (Hilton Garden Inn) or Kata Beach (Beyond Kata, Centara Kata Resort). Use our Kamala hotels hub to compare.` },
    { q: `How do I get from Phuket Airport to ${hotel.name}?`, a: `25 km / 30–40 min by taxi ($20–28) or pre-booked transfer ($18–22). Many resorts include free transfer for stays of 3+ nights — ask at booking. Cheapest: airport bus to Phuket Town, then taxi (~$10 total, but 2 hours).` },
  ];

  const faqNl = [
    { q: `Wat kost ${hotel.name}?`, a: `Standaardkamers $${hotel.priceFrom}–${hotel.priceTo}/nacht door het jaar. Piek (Kerst/NJ): 60–80% boven de high-end. Laagseizoen (mei–okt): vaak 25–35% onder de low-end. Suites en pool-villa's: meestal 1,5–2× standaard tarief.` },
    { q: `Ligt ${hotel.name} aan Kamala Beach zelf?`, a: `${hotel.beachDistance}. Het Kamala-strand is de zacht-glooiende 2 km strook aan Phuket's westkust, 15 min noord van Patong, lifeguards in hoogseizoen.` },
    { q: `Wanneer is ${hotel.name} voor het laatst gerenoveerd?`, a: `Oorspronkelijk gebouwd in ${hotel.yearBuilt}, de laatste grote renovatie was in ${hotel.renovated}. Oudere kamers voelen mogelijk minder fris dan de gerenoveerde — vraag bij boeking om een gerenoveerde kamer als dit belangrijk is.` },
    { q: `Hoeveel kamers heeft ${hotel.name}?`, a: `${hotel.rooms} kamers totaal. Resort op deze schaal betekent efficiënte kinderclubs en zwembaden, maar ook piek-rijen bij restaurants — boek een ontbijtslot of eet in het dorp.` },
    { q: `Is ontbijt inbegrepen bij ${hotel.name}?`, a: `Sommige tarief-plannen hebben ontbijt standaard, andere rekenen $15–25/persoon/nacht. Bevestig in de Trip.com-boekingsflow — dezelfde kamer kan op meerdere meal-plan-tiers verschijnen.` },
    { q: `Wat is het beste alternatief als ${hotel.name} vol is?`, a: `Binnen Kamala: ${siblings.map(s => s.name).join(', ')}. Buiten Kamala: vergelijkbare opties in Bang Tao (Hilton Garden Inn) of Kata Beach (Beyond Kata, Centara Kata Resort). Gebruik onze Kamala hotels-hub om te vergelijken.` },
    { q: `Hoe kom ik van Phuket Airport naar ${hotel.name}?`, a: `25 km / 30–40 min met taxi ($20–28) of pre-booked transfer ($18–22). Veel resorts hebben gratis transfer bij 3+ nachten — vraag bij boeking. Goedkoopst: airport-bus naar Phuket Town + taxi (~$10 totaal, 2u).` },
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
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-white/75">{isNl ? 'Kamala hotel review' : 'Kamala hotel review'}</p>
            <h1 className="font-heading text-3xl lg:text-5xl font-bold mt-2">{isNl ? `${hotel.name}: eerlijke review met prijzen, pros en cons` : `${hotel.name}: Honest Review with Pricing, Pros & Cons`}</h1>
            <p className="mt-4 text-lg lg:text-xl max-w-3xl opacity-95">{summary}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={withSubId(tripUrl, placement('hero'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-6 py-3 text-base font-semibold hover:bg-red-700 shadow-lg">{isNl ? `Bekijk ${hotel.name} op Trip.com` : `See ${hotel.name} on Trip.com`} →</a>
              <Link href="/phuket/kamala/hotels/" className="rounded-full bg-white text-thailand-blue border border-white/40 px-6 py-3 text-base font-semibold hover:bg-white/90">{isNl ? '← Vergelijk alle Kamala hotels' : '← Compare all Kamala hotels'}</Link>
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
          {/* Quick stats */}
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
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Locatie' : 'Location'}</p><p className="mt-1 font-heading font-bold text-gray-900 text-base">Kamala</p></div>
            </div>
          </section>

          {/* Pros / cons */}
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

          {/* Verdict */}
          <section className="rounded-2xl bg-thailand-red/5 border-2 border-thailand-red p-6">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Onze conclusie' : 'Our verdict'}</h2>
            <p className="text-gray-700 leading-relaxed mb-3">{summary}</p>
            <a href={withSubId(tripUrl, placement('verdict'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">{isNl ? `Bekijk live tarieven` : `See live rates`} →</a>
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

          {/* Siblings */}
          {siblings.length > 0 && (
            <section>
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Andere Kamala hotels' : 'Other Kamala hotels'}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {siblings.map(s => (
                  <Link key={s.slug} href={`/phuket/kamala/hotels/${s.slug}/`} className="block rounded-2xl bg-white p-4 shadow-sm border border-gray-200 hover:border-thailand-blue">
                    <p className="font-heading font-bold text-gray-900">{s.name}</p>
                    <p className="text-xs text-thailand-blue mt-2 font-semibold">{isNl ? 'Lees review' : 'Read review'} →</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Cluster mesh */}
          <section className="rounded-2xl bg-thailand-blue/10 p-6">
            <h2 className="font-heading text-xl font-bold text-gray-900">{isNl ? 'Plan je Kamala-trip' : 'Plan your Kamala trip'}</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/phuket/kamala/hotels/" className="rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">{isNl ? '🏨 Vergelijk alle Kamala hotels' : '🏨 Compare all Kamala hotels'}</Link>
              <Link href="/phuket/kamala/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏖️ Kamala Beach gids' : '🏖️ Kamala Beach guide'}</Link>
              <Link href="/phuket/kata/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏝️ Kata Beach' : '🏝️ Kata Beach'}</Link>
              <Link href="/phuket/bang-tao/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏝️ Bang Tao' : '🏝️ Bang Tao'}</Link>
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
  const file = path.join(process.cwd(), 'data', 'pseo', 'areas', 'kamala-hotels.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const paths = (data.hotels as Hotel[]).map(h => ({ params: { 'hotel-slug': h.slug } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.['hotel-slug'] as string;
  const hotelsFile = path.join(process.cwd(), 'data', 'pseo', 'areas', 'kamala-hotels.json');
  const partnersFile = path.join(process.cwd(), 'data', 'pseo', 'areas', 'kamala-partners.json');
  const hotelsData = JSON.parse(fs.readFileSync(hotelsFile, 'utf8'));
  const partnersData = JSON.parse(fs.readFileSync(partnersFile, 'utf8'));
  const hotel = (hotelsData.hotels as Hotel[]).find(h => h.slug === slug);
  if (!hotel) return { notFound: true, revalidate: 60 };
  const partners: PartnersMap = partnersData.partners;
  const partner = partners[hotel.tripPartnerKey];
  const tripUrl = partner ? partner.partnerUrl : partners['trip_pillar'].partnerUrl;
  const siblings = (hotelsData.hotels as Hotel[]).filter(h => h.slug !== slug).map(h => ({ slug: h.slug, name: h.name }));
  return { props: { hotel, tripUrl, lastUpdated: hotelsData.lastUpdated, siblings }, revalidate: 604800 };
};
