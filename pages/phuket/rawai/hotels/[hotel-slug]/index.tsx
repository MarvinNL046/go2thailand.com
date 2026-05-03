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
  partners: Partners;
  lastUpdated: string;
}

export default function RawaiHotelReviewPage({ hotel, partners, lastUpdated }: Props) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const subId = useSubId();
  const placement = (p: string) => `${subId}-pseo-phuket-rawai-hotel-${hotel.slug}-${p}`;

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Phuket', href: '/city/phuket/' },
    { name: 'Rawai', href: '/phuket/rawai/' },
    { name: hotel.name, href: `/phuket/rawai/hotels/${hotel.slug}/` },
  ];

  // Title <60 — KW: "selina serenity rawai phuket" 200/KD1
  const seoTitle = isNl
    ? 'Selina Serenity Rawai Phuket: Eerlijke Hostel Review 2026' // 60
    : 'Selina Serenity Rawai Phuket: Honest 2026 Hostel Review';  // 56

  const h1 = isNl
    ? 'Selina Serenity Rawai: het digital-nomad-anker van zuid-Phuket'
    : "Inside Selina Serenity Rawai Phuket: South Phuket's Digital-Nomad Anchor";

  const seoDescription = isNl
    ? 'Op zoek naar Selina Serenity Rawai Phuket? Hostel-hybrid met coworking, dorms $15–25, privé $55–110, suites $120+. Eerlijke pros + cons.'
    : 'Looking at Selina Serenity Rawai Phuket? Hostel-hybrid with coworking, dorms $15–25, privates $55–110, suites $120+. Honest pros + cons review.';

  const canonical = `https://go2-thailand.com${isNl ? '/nl' : ''}/phuket/rawai/hotels/${hotel.slug}/`;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, i) => ({ '@type': 'ListItem', position: i + 1, name: b.name, item: `https://go2-thailand.com${isNl ? '/nl' : ''}${b.href}` })),
  };

  const primaryUrl = partners[hotel.primaryPartnerKey]?.partnerUrl || partners.trip_pillar.partnerUrl;
  const secondaryUrl = partners[hotel.secondaryPartnerKey]?.partnerUrl || partners.trip_pillar.partnerUrl;

  const faqEn = [
    { q: 'Is Selina Serenity Rawai worth booking?', a: 'For long-stays (1+ week) yes — the coworking + community + pool combination is unique in Phuket. Less ideal for short 3–5 day trips: the hostel-hybrid vibe is built for slow travel, not quick beach holidays. Pricing scales: solo dorm bed $15–25/night, private room $55–110, suite $120+. Best value per dollar of any Phuket stay if you genuinely use the coworking space.' },
    { q: 'How fast is the wifi at Selina Serenity Rawai?', a: 'Verified 100+ Mbps in the coworking space (Speedtest May 2026, evening peak). Rooms run 30–60 Mbps. Good enough for video calls, WordPress dev, light video editing. Heavy upload work (4K video, large model training) — bring a backup hotspot for fail-safe. Selina has battery-backup but Rawai\'s grid does occasionally drop in monsoon thunderstorms.' },
    { q: 'Does Selina Rawai have private rooms?', a: 'Yes — hostel-hybrid means dorms (4–6 bed, $15–25), king/queen private rooms ($55–110), and 1-bed suites ($120–180). All have AC. Privates have private bathrooms. Suites add a small kitchenette and balcony. Selina is much closer to a "boutique hotel" feel than a traditional hostel — most guests are 25–40 working remote, not party-trip 20-somethings.' },
    { q: "What's near Selina Serenity Rawai?", a: '200 m walk to Rawai Pier (the seafood market is the killer feature). 5 min scooter to Promthep Cape sunset. 8 min to Nai Harn Beach. 5 min to Naga Pearl Farm. The location balances Rawai\'s authentic local life with quick access to better swimming beaches at Nai Harn and Ya Nui. Tesco Lotus mini-mart 300 m for groceries.' },
    { q: 'Is Selina Rawai noisy?', a: 'Weekend evenings (Fri/Sat) the beach club hosts events 19:00–23:00 — request a room on the back side away from the pool deck if you want quiet sleep. Weekdays are calm. Daily yoga classes at 06:30 + 17:30 are gentle, not amplified. Most negative reviews mention pool noise; honest fix is the back-side rooms (request "garden side" at booking).' },
    { q: 'Selina Rawai vs renting a Phuket condo monthly?', a: 'For 1–4 weeks: Selina wins on simplicity (zero deposit, instant move-in, gym + pool included, social). For 1–3 months: monthly condo rentals via Facebook groups are 30–50% cheaper but mean apartment hunting on arrival, no community, no built-in workspace. Many digital nomads do 2–4 weeks at Selina to "scout" Phuket, then move to a monthly condo.' },
  ];
  const faqNl = [
    { q: 'Is Selina Serenity Rawai het waard?', a: 'Voor long-stays (1+ week): ja — coworking + community + zwembad is uniek in Phuket. Minder ideaal voor 3–5 dagen: hostel-hybrid is gebouwd voor slow travel, niet snel-strand. Prijzen: solo dorm $15–25/nacht, privé kamer $55–110, suite $120+. Beste value-per-dollar als je het coworking echt gebruikt.' },
    { q: 'Hoe snel is de wifi?', a: 'Geverifieerd 100+ Mbps in coworking-ruimte (Speedtest mei 2026, avondpiek). Kamers 30–60 Mbps. Goed voor video-calls, WordPress, lichte video-editing. Zware upload (4K, model-training) — neem hotspot mee voor fail-safe. Selina heeft battery-backup maar Rawai-stroomnet valt soms uit in moessononweer.' },
    { q: 'Heeft Selina Rawai privé kamers?', a: 'Ja — hostel-hybrid: dorms (4–6 bed, $15–25), king/queen privé kamers ($55–110), 1-bed suites ($120–180). Allemaal AC. Privé kamers hebben eigen badkamer. Suites met kleine keuken en balkon. Sfeer is dichter bij "boutique hotel" dan traditionele hostel — meeste gasten 25–40 werken remote, geen party-trip-twintigers.' },
    { q: 'Wat ligt er rond Selina Rawai?', a: "200 m lopen naar Rawai Pier (vismarkt is dé feature). 5 min scooter naar Promthep Cape sunset. 8 min naar Nai Harn beach. 5 min naar Naga Pearl Farm. Locatie balanceert Rawai's authentieke lokale leven met snelle toegang tot betere zwemstranden Nai Harn en Ya Nui. Tesco Lotus mini-mart 300 m voor boodschappen." },
    { q: 'Is Selina Rawai luid?', a: 'Weekendavonden (vr/za) houdt beach-club events 19:00–23:00 — vraag een kamer aan de achterkant weg van pooldek voor stille slaap. Weekdagen zijn rustig. Dagelijkse yoga 06:30 + 17:30 is zacht, niet versterkt. Meeste negatieve reviews vermelden pool-geluid; oplossing: vraag bij boeking om "garden side"-kamer.' },
    { q: 'Selina Rawai vs maandelijks Phuket-condo?', a: 'Voor 1–4 weken: Selina wint op gemak (geen borg, direct intrek, gym + pool included, social). Voor 1–3 maanden: maand-condo via Facebook is 30–50% goedkoper, maar appartement zoeken bij aankomst, geen community, geen werkruimte ingebouwd. Veel digital nomads doen 2–4 weken bij Selina om Phuket te scouten, dan naar maand-condo.' },
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
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-white/75">{isNl ? `Hostel-hybrid · ${hotel.stars}★` : `Hostel-hybrid · ${hotel.stars}★`}</p>
            <h1 className="font-heading text-3xl lg:text-5xl font-bold mt-2">{h1}</h1>
            <p className="mt-4 text-lg lg:text-xl max-w-3xl opacity-95">{isNl ? hotel.summary.nl : hotel.summary.en}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={withSubId(primaryUrl, placement('hero-primary'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-6 py-3 text-base font-semibold hover:bg-red-700 shadow-lg">
                {isNl ? 'Tarieven op Trip.com' : 'Check rates on Trip.com'} →
              </a>
              <Link href="/phuket/rawai/" className="rounded-full bg-white text-thailand-blue border border-white/40 px-6 py-3 text-base font-semibold hover:bg-white/90">
                {isNl ? 'Rawai gids' : 'Rawai area guide'} →
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
              <a href={withSubId(secondaryUrl, placement('mid-secondary'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center rounded-full bg-thailand-blue text-white px-6 py-3 text-base font-semibold hover:bg-blue-700">{isNl ? 'Andere Rawai opties' : 'Other Rawai options'} →</a>
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

          {/* Cluster mesh */}
          <section className="rounded-2xl bg-thailand-blue/10 p-6">
            <h2 className="font-heading text-xl font-bold text-gray-900">{isNl ? 'Plan de rest van je trip' : 'Plan the rest of your trip'}</h2>
            <p className="mt-2 text-xs text-gray-500">{isNl ? `Bijgewerkt ${new Date(lastUpdated).toLocaleDateString('nl-NL', { year: 'numeric', month: 'long' })}` : `Updated ${new Date(lastUpdated).toLocaleDateString('en', { year: 'numeric', month: 'long' })}`}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/phuket/rawai/" className="rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">{isNl ? '↑ Rawai gids' : '↑ Rawai guide'}</Link>
              <Link href="/phuket/nai-harn/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏖️ Nai Harn gids' : '🏖️ Nai Harn guide'}</Link>
              <Link href="/phuket/nai-harn/hotels/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏨 Nai Harn hotels' : '🏨 Nai Harn hotels'}</Link>
              <Link href="/best-hotels/phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏨 Beste hotels Phuket' : '🏨 Best hotels in Phuket'}</Link>
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
  const file = path.join(process.cwd(), 'data', 'pseo', 'areas', 'rawai-hotels.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const paths = (data.hotels || []).map((h: any) => ({ params: { 'hotel-slug': h.slug } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.['hotel-slug'] as string;
  const hotelsFile = path.join(process.cwd(), 'data', 'pseo', 'areas', 'rawai-hotels.json');
  const partnersFile = path.join(process.cwd(), 'data', 'pseo', 'areas', 'rawai-partners.json');
  const hotelsData = JSON.parse(fs.readFileSync(hotelsFile, 'utf8'));
  const partnersData = JSON.parse(fs.readFileSync(partnersFile, 'utf8'));

  const hotel = (hotelsData.hotels || []).find((h: HotelData) => h.slug === slug);
  if (!hotel) return { notFound: true, revalidate: 60 };

  return {
    props: {
      hotel,
      partners: partnersData.partners,
      lastUpdated: hotelsData.lastUpdated,
    },
    revalidate: 604800,
  };
};
