import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import SEOHead from '../../../../components/SEOHead';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import { withSubId, GYG_GENERIC, TRIP_GENERIC } from '../../../../lib/affiliates';
import { useSubId } from '../../../../lib/useSubId';

interface Partners {
  trip_patong_pillar: { partnerUrl: string };
  trip_patong_hotels_hub: { partnerUrl: string };
  trip_patong_nightlife: { partnerUrl: string };
  trip_patong_restaurants: { partnerUrl: string };
}

interface ReviewHotel {
  slug: string;
  name: string;
  brand: string;
  tier: string;
  priceBand: string;
  stars: number;
  rooms: number;
  beachMinutes: number;
  breakfast: string;
  pool: string;
  valueProp: { en: string; nl: string };
  rating: string;
}

interface ExtraHotel { name: string; tier: string; priceBand: string; bestFor: string; }

interface Props {
  partners: Partners;
  hotels: ReviewHotel[];
  extras: ExtraHotel[];
  hotelPartnerMap: Record<string, string>;
  lastUpdated: string;
}

export default function PatongHotelsHubPage({ partners, hotels, extras, hotelPartnerMap, lastUpdated }: Props) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const subId = useSubId();
  const sub = (placement: string) => `${subId}-pseo-phuket-patong-hotels-hub-${placement}`;

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Phuket', href: '/city/phuket/' },
    { name: 'Patong', href: '/phuket/patong/' },
    { name: isNl ? 'Hotels' : 'Hotels', href: '/phuket/patong/hotels/' },
  ];

  // Title <60, keyword front, count + year
  const seoTitle = isNl
    ? 'Patong Hotels (2026): 12 Resorts Vergeleken'    // 46
    : 'Patong Hotels (2026): 12 Beach Resorts Compared'; // 50

  // Meta description <155, question hook, keyword + variation
  const seoDescription = isNl
    ? 'Op zoek naar een hotel in Patong Beach? Vergelijk 12 resorts van $11 hostels tot $340 beachfront — Mövenpick, Mercure, Hilton, Hotel Indigo + meer.'.slice(0, 155)
    : 'Looking for a hotel in Patong Beach? Compare 12 resorts from $11 hostels to $340 beachfront — Mövenpick, Mercure, Hilton, Hotel Indigo + more.'.slice(0, 155);

  const canonical = `https://go2-thailand.com${isNl ? '/nl' : ''}/phuket/patong/hotels/`;

  // H1 differs from title — uses "where to stay" secondary keyword
  const h1 = isNl
    ? 'Waar overnachten in Patong: top 12 beach hotels en resorts'
    : 'Where to Stay in Patong: 12 Top Beach Hotels and Resorts';

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, i) => ({
      '@type': 'ListItem', position: i + 1, name: b.name,
      item: `https://go2-thailand.com${isNl ? '/nl' : ''}${b.href}`,
    })),
  };

  const faqEn = [
    { q: 'Where exactly should I stay in Patong?',
      a: 'Three sub-zones: (1) North Patong (Kalim end) — quietest, beachfront 5-star resorts like Four Points by Sheraton; 15-min walk to Bangla Road. (2) Central Patong (around Jungceylon Mall and Soi Sai Nam Yen) — 3-min walk to both Bangla and the beach; Grand Mercure, Hotel Indigo, Hotel Clover. (3) South Patong (toward Tri Trang) — quieter, family resorts and Hilton Arcadia. Pick north for sleep, central for convenience, south for families.' },
    { q: 'Are Patong hotels noisy at night?',
      a: 'Hotels within 200m of Bangla Road are loud until 03:00 — bass from the clubs carries. Hotels two streets back from Bangla (most central listings, including Grand Mercure and Hotel Indigo) are tolerable with windows closed. Beachfront and north/south end hotels are silent. If light sleeper: pick north Patong (Four Points) or move to Karon/Kata.' },
    { q: 'Patong hotel cost in 2026: budget, mid and luxury?',
      a: 'Hostels: $11–25/night (Lub d Patong is the design king). Midscale: $60–140 (Hotel Clover, Best Western, Holiday Inn Express). Upper-midscale: $80–160 (Ramada by Wyndham, Deevana Patong). Upscale: $110–250 (Grand Mercure, Hotel Indigo, Mövenpick Myth). Beachfront 5-star: $180–360 (Four Points, La Flora). Add 30–50% for Christmas/NY/Chinese New Year peaks.' },
    { q: 'Do I need to book ahead for Patong?',
      a: 'Yes for high season (15 Dec – 15 Feb) — book 6–8 weeks ahead, especially for beachfront properties. November and March: 2–3 weeks ahead is fine. May–October low season: walk-in works, expect 30–40% discount on most rates. Trip.com and Klook usually beat Booking on Patong rates by 5–15% — always check.' },
    { q: 'Best Patong hotel for families with young kids?',
      a: 'Mövenpick Myth Hotel Patong has the best family layout — lazy river pool, kids\' club, dedicated kids\' pool, and 35m² family rooms with sofa-bed. Second pick: Grand Mercure (family rooms with bunk + sofa bed, two pools). Third: Hilton Arcadia at the south end of Patong if you want quiet evenings — but it\'s a 25-minute walk to Bangla Road (good if you want to avoid that scene).' },
    { q: 'Best Patong hotel for couples?',
      a: 'Hotel Indigo Phuket Patong — the rooftop infinity pool at sunset, Sino-Portuguese design, 5-min walk to a great dinner spot, 5-min walk back to the beach. Also strong: La Flora Resort Patong (beachfront luxury, adults-leaning). Skip Mövenpick Myth (kids everywhere) and Grand Mercure (too big and busy) for a couples trip.' },
    { q: 'Best Patong hotel for solo travelers and backpackers?',
      a: 'Lub d Phuket Patong — pod hostel with rooftop pool and excellent social spaces, $11–25/night for dorms or $50–80 for private rooms. Walking distance to Bangla. Second: Hotel Clover Patong — design rooms at $60–80 if you want privacy. Third: 7Q Patong Beach Hotel — bare-bones but clean, great location, $40–60.' },
  ];

  const faqNl = [
    { q: 'Waar in Patong moet ik precies overnachten?',
      a: 'Drie zones: (1) Noord-Patong (Kalim-kant) — rustigst, beachfront 5-sterren zoals Four Points by Sheraton; 15 min lopen naar Bangla. (2) Centraal Patong (rond Jungceylon Mall en Soi Sai Nam Yen) — 3 min lopen naar Bangla én strand; Grand Mercure, Hotel Indigo, Hotel Clover. (3) Zuid-Patong (richting Tri Trang) — rustiger, familieresorts en Hilton Arcadia. Kies noord voor slapen, centraal voor gemak, zuid voor families.' },
    { q: 'Zijn Patong-hotels luidruchtig in de avond?',
      a: 'Hotels binnen 200m van Bangla Road zijn luid tot 03:00 — bas van de clubs draagt. Hotels twee straten landinwaarts (de meeste centrale listings, zoals Grand Mercure en Hotel Indigo) zijn met dichte ramen prima. Beachfront en noord/zuid Patong zijn stil. Lichte slaper? Kies noord Patong (Four Points) of ga naar Karon/Kata.' },
    { q: 'Wat kost een Patong hotel in 2026: budget, mid en luxe?',
      a: 'Hostels: $11–25/nacht (Lub d Patong is design-koning). Midscale: $60–140 (Hotel Clover, Best Western, Holiday Inn Express). Upper-midscale: $80–160 (Ramada by Wyndham, Deevana Patong). Upscale: $110–250 (Grand Mercure, Hotel Indigo, Mövenpick Myth). Beachfront 5-sterren: $180–360 (Four Points, La Flora). Plus 30–50% bij Kerst/NJaar/Chinees Nieuwjaar.' },
    { q: 'Moet ik vooraf boeken voor Patong?',
      a: 'Ja voor hoogseizoen (15 dec – 15 feb) — 6–8 weken vooruit, vooral beachfront. November en maart: 2–3 weken vooruit. Mei–okt laagseizoen: walk-in lukt vaak met 30–40% korting. Trip.com en Klook verslaan Booking meestal 5–15% op Patong-tarieven — altijd vergelijken.' },
    { q: 'Beste Patong-hotel voor families met jonge kinderen?',
      a: 'Mövenpick Myth Hotel Patong heeft de beste familielayout — lazy river, kids\' club, apart kinderzwembad en 35m² familiekamers met slaapbank. Tweede: Grand Mercure (familiekamers met stapelbed + bank, twee zwembaden). Derde: Hilton Arcadia aan de zuidkant van Patong — 25 min lopen van Bangla, ideaal als je dat juist wil vermijden.' },
    { q: 'Beste Patong-hotel voor koppels?',
      a: 'Hotel Indigo Phuket Patong — rooftop infinity pool bij zonsondergang, Sino-Portugees design, 5 min lopen naar diner, 5 min terug naar strand. Ook sterk: La Flora Resort (beachfront luxe, volwassen). Skip Mövenpick Myth (kinderen overal) en Grand Mercure (te groot, te druk) voor een koppel-trip.' },
    { q: 'Beste Patong-hotel voor solo en backpackers?',
      a: 'Lub d Phuket Patong — pod hostel met dakzwembad en sterke sociale ruimtes, $11–25/nacht dorm of $50–80 privé. Loopafstand Bangla. Tweede: Hotel Clover Patong — design-kamers vanaf $60–80 als je privacy wilt. Derde: 7Q Patong Beach Hotel — bare-bones maar schoon, top locatie, $40–60.' },
  ];

  const faqList = isNl ? faqNl : faqEn;

  const faqJsonLd = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: faqList.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };

  const trip = (slug: string) => hotelPartnerMap[slug] || partners.trip_patong_hotels_hub.partnerUrl;

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
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-white/75">{isNl ? 'Patong hotels vergelijking' : 'Patong hotels comparison'}</p>
            <h1 className="font-heading text-3xl lg:text-5xl font-bold mt-2">{h1}</h1>
            <p className="mt-4 text-lg lg:text-xl max-w-3xl opacity-95">
              {isNl
                ? "Patong heeft 600+ hotels — van $11 design-pods tot $340 beachfront-suites. Hier vergelijken we de 12 beste tegen prijs, locatie binnen Patong, voor wie ze passen, en wat ze niet vertellen op de hotelwebsite. Trip.com prijzen verifieerden we deze week voor mid-juni 2026."
                : "Patong has 600+ hotels — from $11 design pod hostels to $340 beachfront suites. Here we compare the 12 best on price band, location inside Patong, who they suit, and what their websites won't tell you. Trip.com rates verified this week for mid-June 2026 stays."}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={withSubId(partners.trip_patong_hotels_hub.partnerUrl, sub('hero-trip'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-6 py-3 text-base font-semibold hover:bg-red-700 shadow-lg">
                {isNl ? 'Vergelijk Patong-hotels op Trip.com' : 'Compare Patong hotels on Trip.com'} →
              </a>
              <a href={withSubId(GYG_GENERIC, sub('hero-gyg'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-[#1B9E3E] text-white px-6 py-3 text-base font-semibold hover:bg-[#157a30]">
                {isNl ? 'Patong-tours via GetYourGuide' : 'Patong tours via GetYourGuide'} →
              </a>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-xs opacity-90">
              <span>✔ 12 {isNl ? 'hotels vergeleken' : 'hotels compared'}</span>
              <span>✔ {isNl ? 'Eerlijke pros + cons' : 'Honest pros + cons'}</span>
              <span>✔ {isNl ? 'Bijgewerkt' : 'Updated'} {new Date(lastUpdated).toLocaleDateString(isNl ? 'nl-NL' : 'en', { year: 'numeric', month: 'long' })}</span>
            </div>
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          {/* Comparison table */}
          <section id="comparison">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-2">{isNl ? 'Snelle vergelijking: 12 Patong hotels' : 'Quick comparison: 12 Patong hotels'}</h2>
            <p className="text-gray-600 mb-6">{isNl ? 'Klik op een hotelnaam om live tarieven te zien (we verdienen een kleine commissie zonder dat het jou iets extra kost).' : 'Click a hotel name to see live rates (we earn a small commission at no extra cost to you).'}</p>
            <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Hotel' : 'Hotel'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Tier' : 'Tier'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Prijs' : 'Price'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Strand' : 'Beach'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Beste voor' : 'Best for'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Boek' : 'Book'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {hotels.map((h, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <Link href={`/phuket/patong/hotels/${h.slug}/`} className="font-semibold text-thailand-blue hover:text-thailand-red hover:underline">{h.name}</Link>
                      </td>
                      <td className="px-4 py-3 text-gray-700 capitalize">{h.tier.replace('-', ' ')}</td>
                      <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{h.priceBand}</td>
                      <td className="px-4 py-3 text-gray-700">{h.beachMinutes} min</td>
                      <td className="px-4 py-3 text-gray-700">{(isNl ? h.valueProp.nl : h.valueProp.en).split(' — ')[0].slice(0, 60)}</td>
                      <td className="px-4 py-3"><a href={withSubId(trip(h.slug), sub(`table-${h.slug}`))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-thailand-red font-semibold hover:underline whitespace-nowrap">{isNl ? 'Tarief →' : 'Check rates →'}</a></td>
                    </tr>
                  ))}
                  {extras.map((h, i) => (
                    <tr key={`e-${i}`} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-semibold text-gray-900">{h.name}</td>
                      <td className="px-4 py-3 text-gray-700 capitalize">{h.tier.replace('-', ' ')}</td>
                      <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{h.priceBand}</td>
                      <td className="px-4 py-3 text-gray-700">—</td>
                      <td className="px-4 py-3 text-gray-700">{h.bestFor}</td>
                      <td className="px-4 py-3"><a href={withSubId(partners.trip_patong_hotels_hub.partnerUrl, sub(`extra-${i}`))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-thailand-red font-semibold hover:underline whitespace-nowrap">{isNl ? 'Tarief →' : 'Check rates →'}</a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-gray-500">{isNl ? 'Tarieven zijn 2026 hoogseizoen-bandbreedtes (nov–apr). Mei–okt meestal 30–40% lager.' : 'Rates are 2026 high-season ranges (Nov–Apr). May–Oct usually 30–40% cheaper.'}</p>
          </section>

          {/* Top pick callout */}
          <section className="rounded-2xl bg-thailand-red/5 border-2 border-thailand-red p-6">
            <span className="inline-block rounded-full bg-thailand-red text-white text-xs font-bold uppercase tracking-wide px-3 py-1 mb-3">⭐ {isNl ? 'Beste keuze voor de meesten' : 'Top pick for most travelers'}</span>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">Grand Mercure Phuket Patong</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              {isNl
                ? '422 kamers, twee zwembaden (waarvan één rooftop), 3 minuten lopen naar Bangla Road én strand, Accor-betrouwbaarheid en $110–220/nacht. Voor de combinatie locatie + voorzieningen + prijs is dit het sterkste voorstel in centraal Patong. Voor 90% van de reizigers het juiste antwoord.'
                : '422 rooms, two pools (one rooftop), 3-min walk to Bangla Road and the beach, Accor consistency, $110–220/night. For the combination of location + amenities + price, this is the strongest pitch in central Patong. For 90% of travelers, the right answer.'}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/phuket/patong/hotels/grand-mercure-phuket-patong/" className="rounded-full bg-white text-thailand-red border border-thailand-red px-5 py-2 text-sm font-semibold hover:bg-thailand-red hover:text-white">
                {isNl ? 'Lees onze Grand Mercure review' : 'Read our Grand Mercure review'} →
              </Link>
              <a href={withSubId(trip('grand-mercure-phuket-patong'), sub('toppick-trip'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">
                {isNl ? 'Tarief op Trip.com' : 'Check rates on Trip.com'} →
              </a>
            </div>
          </section>

          {/* Detail cards for the 5 review hotels */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'De 5 Patong-hotels die wij eerlijk reviewden' : 'The 5 Patong hotels we reviewed honestly'}</h2>
            <div className="space-y-5">
              {hotels.map((h, i) => (
                <div key={i} className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                  <h3 className="font-heading text-xl font-bold text-gray-900 mb-1">
                    <Link href={`/phuket/patong/hotels/${h.slug}/`} className="hover:text-thailand-red hover:underline">{h.name}</Link>
                    <span className="ml-2 text-sm font-normal text-gray-500">— {h.brand} · {h.priceBand}</span>
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-3">{isNl ? h.valueProp.nl : h.valueProp.en}</p>
                  <div className="flex flex-wrap gap-3 text-xs text-gray-600 mb-3">
                    <span>★ {h.stars}-{isNl ? 'sterren' : 'star'}</span>
                    <span>· {h.rooms} {isNl ? 'kamers' : 'rooms'}</span>
                    <span>· {h.beachMinutes} min {isNl ? 'naar strand' : 'to beach'}</span>
                    <span>· {isNl ? 'Pool' : 'Pool'}: {h.pool}</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link href={`/phuket/patong/hotels/${h.slug}/`} className="inline-flex items-center text-sm font-semibold text-thailand-blue hover:underline">{isNl ? 'Volledige review' : 'Full review'} →</Link>
                    <a href={withSubId(trip(h.slug), sub(`card-${h.slug}`))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center text-sm font-semibold text-thailand-red hover:underline">{isNl ? 'Tarief op Trip.com' : 'Check rates on Trip.com'} →</a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Buyer's guide */}
          <section className="rounded-2xl bg-amber-50 border border-amber-200 p-6">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Boekingstips voor Patong' : 'Patong booking tips'}</h2>
            <ul className="space-y-3 text-gray-800">
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Boek hoogseizoen 6–8 weken vooruit' : 'Book high season 6–8 weeks ahead'}</strong>{isNl ? ' (15 dec – 15 feb): de top-50 hotels gaan het eerst.' : ' (15 Dec – 15 Feb): the top 50 hotels sell out first.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Vergelijk Trip.com en Klook' : 'Compare Trip.com and Klook'}</strong>{isNl ? ': beide verslaan Booking 5–15% op Patong en hebben 30-daagse cookie-tracking.' : ": both beat Booking by 5–15% on Patong and have 30-day cookie attribution."}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Twee straten van Bangla = stille slaap' : 'Two streets back from Bangla = quiet sleep'}</strong>{isNl ? '. Strandzicht klinkt mooi, achterstraten slapen beter.' : '. Beach view sounds great; back-street rooms sleep better.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Filter op zwembad-grootte' : 'Filter by pool size'}</strong>{isNl ? ': kleine boutique-hotels (Hotel Clover, Hotel Indigo) hebben pools die om 11:00 vol zitten. Grand Mercure en Mövenpick Myth hebben meerdere pools.' : ': small boutique hotels (Hotel Clover, Hotel Indigo) have pools that fill by 11am. Grand Mercure and Mövenpick Myth have multiple pools.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Lid van Marriott/IHG/Accor?' : 'Marriott/IHG/Accor member?'}</strong>{isNl ? ' Boek direct via app voor punten en upgrades — Patong heeft alle drie.' : ' Book direct via app for points + upgrades — Patong has all three brands.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Ontbijt apart kopen' : "Skip mandatory breakfast"}</strong>{isNl ? ': in Patong ontbijt je voor 80–150 THB op straat — bijna altijd lekkerder en goedkoper dan hotel-buffet.' : ": in Patong, breakfast is 80–150 THB at street stalls — almost always tastier and cheaper than the hotel buffet."}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Vermijd "free shuttle to beach"-marketing' : 'Ignore "free shuttle to beach" marketing'}</strong>{isNl ? ': elk hotel binnen 1 km is loopafstand. Shuttle is meestal 1×/uur en je zit aan vaste tijden vast.' : ': any hotel within 1 km is walkable. Shuttles usually run hourly and lock you to fixed times.'}</span></li>
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
            <h2 className="font-heading text-xl font-bold text-gray-900">{isNl ? 'Vergelijk verder' : 'Compare further'}</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/phuket/patong/" className="rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">{isNl ? '🏖️ Patong gids' : '🏖️ Patong area guide'}</Link>
              <Link href="/phuket/patong/nightlife/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🌃 Bangla Road nightlife' : '🌃 Bangla Road nightlife'}</Link>
              <Link href="/phuket/patong/restaurants/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🍽️ Eten in Patong' : '🍽️ Patong restaurants'}</Link>
              <Link href="/best-hotels/phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏝️ Beste hotels Phuket (alle gebieden)' : '🏝️ Best Phuket hotels (all areas)'}</Link>
              <Link href="/flights-to-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '✈️ Vluchten naar Phuket' : '✈️ Flights to Phuket'}</Link>
              <Link href="/car-rental-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🚗 Auto huren Phuket' : '🚗 Car rental Phuket'}</Link>
              <Link href="/yacht-charter-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '⛵ Yacht charter Phuket' : '⛵ Yacht charter Phuket'}</Link>
              <Link href="/city/phuket/" className="rounded-full bg-white text-gray-900 border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50">{isNl ? '📖 Phuket reisgids' : '📖 Phuket travel guide'}</Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const root = process.cwd();
  const partnersData = JSON.parse(fs.readFileSync(path.join(root, 'data/pseo/areas/patong-partners.json'), 'utf8'));
  const hotelsData = JSON.parse(fs.readFileSync(path.join(root, 'data/pseo/areas/patong-hotels.json'), 'utf8'));

  const hotelPartnerMap: Record<string, string> = {};
  for (const h of partnersData.hotels) hotelPartnerMap[h.slug] = h.tripPartnerUrl;

  return {
    props: {
      partners: partnersData.partners,
      hotels: hotelsData.hotels.map((h: any) => ({
        slug: h.slug, name: h.name, brand: h.brand, tier: h.tier,
        priceBand: h.priceBand, stars: h.stars, rooms: h.rooms,
        beachMinutes: h.beachMinutes, breakfast: h.breakfast, pool: h.pool,
        valueProp: h.valueProp, rating: h.rating,
      })),
      extras: hotelsData.extraHubHotels,
      hotelPartnerMap,
      lastUpdated: partnersData.lastUpdated,
    },
    revalidate: 604800,
  };
};
