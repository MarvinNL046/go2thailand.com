import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import SEOHead from '../../../../components/SEOHead';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import { withSubId, KLOOK_GENERIC, TRIP_GENERIC } from '../../../../lib/affiliates';
import { useSubId } from '../../../../lib/useSubId';

interface Partners {
  trip_karon_city: { partnerUrl: string };
  trip_karon_hotel_search: { partnerUrl: string };
  trip_pullman: { partnerUrl: string };
  trip_centara: { partnerUrl: string };
  trip_mandarava: { partnerUrl: string };
  trip_beyond: { partnerUrl: string };
  trip_avista: { partnerUrl: string };
}

interface Props { partners: Partners; lastUpdated: string; }

interface HotelRow {
  name: string;
  slug: string;
  partnerKey: keyof Partners | null;
  tier: string;
  price: string;
  bestFor: { en: string; nl: string };
  watchOut: { en: string; nl: string };
  beach: { en: string; nl: string };
}

const HOTELS: HotelRow[] = [
  { name: 'Pullman Phuket Arcadia Karon Beach Resort', slug: 'pullman-phuket-arcadia-karon-beach-resort', partnerKey: 'trip_pullman', tier: 'Luxury', price: '$180–$340', bestFor: { en: 'Families of 4+, kids 5–14', nl: 'Families van 4+, kinderen 5–14' }, watchOut: { en: '200 m hilltop walk to beach', nl: '200 m heuvel naar het strand' }, beach: { en: '3-min walk', nl: '3 min lopen' } },
  { name: 'Centara Grand Beach Resort Phuket', slug: 'centara-grand-beach-resort-phuket', partnerKey: 'trip_centara', tier: 'Luxury', price: '$160–$300', bestFor: { en: 'Families wanting beachfront', nl: 'Families die beachfront willen' }, watchOut: { en: 'Pricier sea-view rooms', nl: 'Sea-view kamers stuk duurder' }, beach: { en: 'Beachfront — 0 m', nl: 'Beachfront — 0 m' } },
  { name: 'Mandarava Resort and Spa Karon Beach', slug: 'mandarava-resort-and-spa-karon-beach', partnerKey: 'trip_mandarava', tier: 'Upscale', price: '$120–$220', bestFor: { en: 'Couples wanting pool-access rooms', nl: 'Stellen die pool-access willen' }, watchOut: { en: 'Hilltop, 12-min walk to sand', nl: 'Heuveltop, 12 min naar het zand' }, beach: { en: '12-min walk / shuttle', nl: '12 min lopen / shuttle' } },
  { name: 'Beyond Resort Karon', slug: 'beyond-resort-karon', partnerKey: 'trip_beyond', tier: 'Upscale', price: '$130–$240', bestFor: { en: 'Adults-only, beachfront couples', nl: 'Adults-only, stellen aan het strand' }, watchOut: { en: '15 min walk to Karon village', nl: '15 min lopen naar Karon dorp' }, beach: { en: 'Beachfront — 0 m', nl: 'Beachfront — 0 m' } },
  { name: 'Avista Grande Phuket Karon — MGallery', slug: 'avista-grande-karon-mgallery', partnerKey: 'trip_avista', tier: 'Luxury boutique', price: '$170–$320', bestFor: { en: 'Honeymoons, design-conscious', nl: 'Honeymoons, designliefhebbers' }, watchOut: { en: 'Not beachfront, no shuttle', nl: 'Niet beachfront, geen shuttle' }, beach: { en: '8-min walk', nl: '8 min lopen' } },
  { name: 'Marriott Karon Beach Resort & Spa', slug: null as unknown as string, partnerKey: null, tier: 'Luxury', price: '$190–$330', bestFor: { en: 'Families wanting Marriott loyalty', nl: 'Families met Marriott-loyalty' }, watchOut: { en: 'Across the road from beach', nl: 'Aan overkant van strandweg' }, beach: { en: '2-min crossing', nl: '2 min oversteek' } },
  { name: 'Mövenpick Resort Karon Beach', slug: null as unknown as string, partnerKey: null, tier: 'Luxury', price: '$200–$360', bestFor: { en: 'Couples wanting villa stays', nl: 'Stellen die villa willen' }, watchOut: { en: 'Spread out across hillside', nl: 'Verspreid over heuvel' }, beach: { en: 'Beachfront — 0 m', nl: 'Beachfront — 0 m' } },
  { name: 'Karon Sea Sands Resort & Spa', slug: null as unknown as string, partnerKey: null, tier: 'Mid-range', price: '$50–$85', bestFor: { en: 'Beachfront budget pick', nl: 'Beachfront budget-keuze' }, watchOut: { en: 'Older rooms, dated decor', nl: 'Oudere kamers, gedateerd' }, beach: { en: 'Beachfront — 0 m', nl: 'Beachfront — 0 m' } },
  { name: 'In On The Beach Karon', slug: null as unknown as string, partnerKey: null, tier: 'Budget', price: '$40–$70', bestFor: { en: 'Solo + couples on a budget', nl: 'Solo + stellen op budget' }, watchOut: { en: 'Small property, books out fast', nl: 'Klein hotel, snel volgeboekt' }, beach: { en: '1-min walk', nl: '1 min lopen' } },
  { name: 'Baan Karon Resort', slug: null as unknown as string, partnerKey: null, tier: 'Budget', price: '$17–$30', bestFor: { en: 'Backpackers + couples', nl: 'Backpackers + stellen' }, watchOut: { en: '5-min walk to beach', nl: '5 min lopen naar het strand' }, beach: { en: '5-min walk', nl: '5 min lopen' } },
];

export default function KaronHotelsHubPage({ partners, lastUpdated }: Props) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const subId = useSubId();

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Phuket', href: '/city/phuket/' },
    { name: 'Karon Beach', href: '/phuket/karon/' },
    { name: isNl ? 'Hotels' : 'Hotels', href: '/phuket/karon/hotels/' },
  ];

  // Title: keyword front, <60 — primary "karon beach phuket hotels"
  // EN 56 chars, NL 53 chars
  const seoTitle = isNl
    ? 'Karon Beach Hotels Phuket (2026): 10 Beste Picks'
    : 'Karon Beach Hotels, Phuket (2026): 10 Top Picks Compared';

  const seoDescription = isNl
    ? 'Op zoek naar een hotel in Karon Beach? Vergelijk 10 resorts in alle klassen — beachfront, luxe families, adults-only en budget — eerlijke pluspunten.'
    : 'Looking for a hotel in Karon Beach? Compare 10 resorts across every tier — beachfront, luxury family, adults-only and budget — with honest pros & cons.';

  const canonical = `https://go2-thailand.com${isNl ? '/nl' : ''}/phuket/karon/hotels/`;

  // H1 differs from title — uses secondary "where to stay in karon beach"
  const h1 = isNl
    ? 'Waar te logeren in Karon Beach: 10 hotels en accommodaties vergeleken'
    : 'Where to Stay in Karon Beach: 10 Hotels & Accommodations Compared';

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, i) => ({
      '@type': 'ListItem', position: i + 1, name: b.name,
      item: `https://go2-thailand.com${isNl ? '/nl' : ''}${b.href}`,
    })),
  };

  const faqEn = [
    { q: 'What is the best hotel in Karon Beach?',
      a: 'For families, Pullman Phuket Arcadia Karon Beach Resort is the default — five pools, 277 rooms, three minutes downhill to the beach. For couples wanting beachfront and adults-only, Beyond Resort Karon. For pure beachfront five-star with kids in mind, Centara Grand. Best is genuinely audience-dependent on Karon — there is no single answer.' },
    { q: 'Are Karon Beach hotels cheaper than Patong?',
      a: "At the same star level, Karon trends slightly cheaper than Patong on average — partly because the demand is more consistent (mostly families) and less peaked (no Bangla Road draw on weekends). Off-season (May–October), the gap widens — Karon hotels go to 50% off published rates while Patong stays closer to 35%." },
    { q: 'Which Karon Beach hotels are directly on the beach?',
      a: 'True beachfront on Karon is rare — most resorts sit across Patak Road. The properties with no road to cross are: Centara Grand Beach Resort, Beyond Resort Karon, Mövenpick Resort Karon, Karon Sea Sands Resort. Most other big-name properties (Pullman, Hilton, Marriott) are 50–250 m back with shuttles or short walks.' },
    { q: 'Are there adults-only hotels in Karon Beach?',
      a: 'Yes — Beyond Resort Karon (16+) is the main adults-only beachfront pick. Avista Grande MGallery is family-friendly but skews adult through scale and design rather than a strict policy. For a strict adults-only beachfront resort: Beyond is the answer.' },
    { q: 'Should I stay at the north or south end of Karon Beach?',
      a: 'North end (Beyond Resort area) — quietest, widest beach, longer walk to restaurants. Central (Karon Circle, Centara, Hilton) — most amenities within walking distance, shopping, night markets. South end (Pullman, near Karon Viewpoint) — quieter, better sunset access, slightly less walkable. For first-timers: central. For couples: north or south.' },
    { q: 'Do Karon Beach hotels have airport transfers?',
      a: 'Most published transfers run 1,200–1,800 THB one-way for 1–3 passengers — pricier than Grab (550–800 THB). Worth it only if you have a tight schedule or family with luggage where the meet-and-greet matters. The Grab app works fine at HKT in 2026; queue is usually 5–10 min.' },
  ];

  const faqNl = [
    { q: 'Welk hotel is het beste in Karon Beach?',
      a: 'Voor families is Pullman Phuket Arcadia Karon Beach Resort de default — vijf zwembaden, 277 kamers, drie minuten naar het strand. Voor stellen die beachfront en adults-only willen: Beyond Resort Karon. Voor pure beachfront vijf-sterren met kinderen: Centara Grand. Het beste is echt afhankelijk van je type reiziger op Karon — er is geen één antwoord.' },
    { q: 'Zijn Karon Beach hotels goedkoper dan Patong?',
      a: 'Bij dezelfde sterrenklasse zijn Karon-hotels gemiddeld iets goedkoper dan Patong — deels omdat de vraag op Karon constanter is (vooral families) en minder pieken kent (geen Bangla Road in de weekenden). Off-season (mei–oktober) wordt het gat groter — Karon-hotels gaan naar 50% korting terwijl Patong rond 35% blijft.' },
    { q: 'Welke Karon Beach hotels liggen direct aan het strand?',
      a: 'Echt beachfront op Karon is zeldzaam — de meeste resorts staan aan de overkant van Patak Road. Geen weg over te steken bij: Centara Grand Beach Resort, Beyond Resort Karon, Mövenpick Resort Karon, Karon Sea Sands Resort. Andere grote namen (Pullman, Hilton, Marriott) staan 50–250 m terug met shuttles of korte wandelingen.' },
    { q: 'Zijn er adults-only hotels in Karon Beach?',
      a: 'Ja — Beyond Resort Karon (16+) is dé adults-only beachfront keuze. Avista Grande MGallery is familievriendelijk maar voelt volwassener door schaal en ontwerp, niet door beleid. Voor een strikt adults-only beachfront resort: Beyond is het antwoord.' },
    { q: 'Moet ik aan het noord- of zuideind van Karon Beach verblijven?',
      a: 'Noord (Beyond Resort gebied) — rustigst, breedste strand, langer lopen naar restaurants. Centraal (Karon Circle, Centara, Hilton) — meeste voorzieningen op loopafstand, winkelen, nachtmarkten. Zuid (Pullman, bij Karon Viewpoint) — rustiger, betere zonsondergang, iets minder loopbaar. Eerste keer: centraal. Stellen: noord of zuid.' },
    { q: 'Hebben Karon Beach hotels luchthaventransfer?',
      a: 'Meeste transfers kosten 1.200–1.800 THB enkele reis voor 1–3 personen — duurder dan Grab (550–800 THB). De moeite waard alleen bij krappe schema\'s of families met veel bagage waar meet-and-greet belangrijk is. De Grab app werkt prima op HKT in 2026; rij meestal 5–10 min.' },
  ];

  const faqList = isNl ? faqNl : faqEn;

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqList.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };

  const partnerUrlFor = (key: HotelRow['partnerKey']) =>
    key && partners[key] ? withSubId(partners[key].partnerUrl, subId) : withSubId(partners.trip_karon_hotel_search.partnerUrl, subId);

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
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-white/75">{isNl ? 'Karon Beach hotels-gids' : 'Karon Beach hotels guide'}</p>
            <h1 className="font-heading text-3xl lg:text-5xl font-bold mt-2">{h1}</h1>
            <p className="mt-4 text-lg lg:text-xl max-w-3xl opacity-95">
              {isNl
                ? "In tegenstelling tot Patong (waar de feestmarkt 80% van de hotels bedient) heeft Karon Beach een veel breder aanbod aan mid-range en luxe familie- en koppelresorts. Hier vergelijken we 10 hotels op alle prijsklassen — beachfront, hilltop, adults-only en budget — met voor wie ze werken en waar ze niet."
                : "Unlike Patong (where the party market drives 80% of hotels), Karon Beach has a much broader spread of mid-range and luxury family and couples resorts. Here we compare 10 hotels across every tier — beachfront, hilltop, adults-only and budget — with who they actually work for and where they fall short."}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={withSubId(partners.trip_karon_hotel_search.partnerUrl, subId)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-6 py-3 text-base font-semibold hover:bg-red-700 shadow-lg">
                {isNl ? 'Vergelijk live prijzen op Trip.com' : 'Compare live prices on Trip.com'} →
              </a>
              <Link href="/phuket/karon/" className="rounded-full bg-white/15 text-white border border-white/30 px-6 py-3 text-base font-semibold hover:bg-white/25">
                {isNl ? '← Terug naar Karon gids' : '← Back to Karon guide'}
              </Link>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-xs opacity-90">
              <span>✔ 10 {isNl ? 'hotels vergeleken' : 'hotels compared'}</span>
              <span>✔ {isNl ? '5 prijsklassen' : '5 price tiers'}</span>
              <span>✔ {isNl ? 'Bijgewerkt' : 'Updated'} {new Date(lastUpdated).toLocaleDateString(isNl ? 'nl-NL' : 'en', { year: 'numeric', month: 'long' })}</span>
            </div>
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          {/* Intro stat */}
          <section className="rounded-2xl bg-amber-50 border border-amber-200 p-5">
            <p className="text-gray-800 leading-relaxed">
              {isNl
                ? "💡 Statistiek: van de 60+ hotels in Karon Beach valt 70% in de mid-range tot luxe categorie. Op Patong is dat 35%. Karon is letterlijk gemaakt voor reizigers die niet komen om te feesten — en dat zie je terug in elke hotelschelf."
                : "💡 Statistic: of the 60+ hotels in Karon Beach, 70% are mid-range to luxury. On Patong, it's 35%. Karon is built for travelers who aren't there to party — and you see it in every hotel shelf."}
            </p>
          </section>

          {/* Comparison table */}
          <section id="comparison">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-2">{isNl ? 'Snelle vergelijking: 10 hotels in Karon Beach' : 'Quick comparison: 10 Karon Beach hotels'}</h2>
            <p className="text-gray-600 mb-6">{isNl ? 'Klik een hotelnaam om live prijzen op Trip.com te zien — wij verdienen een kleine commissie zonder kosten voor jou.' : 'Click any hotel name to see live prices on Trip.com — we earn a small commission at no extra cost.'}</p>
            <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Hotel' : 'Hotel'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Prijsklasse' : 'Tier'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Prijs/nacht' : 'Price/night'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Strand' : 'Beach'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Beste voor' : 'Best for'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Pas op' : 'Watch out for'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Boek' : 'Book'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {HOTELS.map((h) => (
                    <tr key={h.name} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        {h.slug ? (
                          <Link href={`/phuket/karon/hotels/${h.slug}/`} className="font-semibold text-thailand-blue hover:text-thailand-red hover:underline">{h.name}</Link>
                        ) : (
                          <a href={partnerUrlFor(h.partnerKey)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="font-semibold text-thailand-blue hover:text-thailand-red hover:underline">{h.name}</a>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{h.tier}</td>
                      <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{h.price}</td>
                      <td className="px-4 py-3 text-gray-700">{isNl ? h.beach.nl : h.beach.en}</td>
                      <td className="px-4 py-3 text-gray-700">{isNl ? h.bestFor.nl : h.bestFor.en}</td>
                      <td className="px-4 py-3 text-gray-700">{isNl ? h.watchOut.nl : h.watchOut.en}</td>
                      <td className="px-4 py-3"><a href={partnerUrlFor(h.partnerKey)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-thailand-red font-semibold hover:underline whitespace-nowrap">{isNl ? 'Bekijk →' : 'Check →'}</a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-gray-500">{isNl ? 'Prijzen zijn typische 2026 hoogseizoen-tarieven (nov–apr). Mei–oktober prijzen 30–50% lager.' : 'Prices are typical 2026 high-season rates (Nov–Apr). May–October rates 30–50% lower.'}</p>
          </section>

          {/* Top pick callout */}
          <section className="rounded-2xl bg-thailand-red/5 border-2 border-thailand-red p-6">
            <span className="inline-block rounded-full bg-thailand-red text-white text-xs font-bold uppercase tracking-wide px-3 py-1 mb-3">⭐ {isNl ? 'Beste keuze voor de meeste reizigers' : 'Top pick for most travelers'}</span>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">Pullman Phuket Arcadia Karon Beach Resort</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              {isNl
                ? "Voor de meeste reizigers naar Karon — vooral families van 4+ — is Pullman Arcadia de juiste keuze. Vijf zwembaden, ruime kamers met balkon, drie restaurants, gratis pendelbus naar het strand. Niet beachfront, maar dat is op Karon zelden een dealbreaker. $180–$340/nacht voor het hoogseizoen."
                : "For most travelers heading to Karon — especially families of 4+ — Pullman Arcadia is the right call. Five pools, spacious balcony rooms, three restaurants, free shuttle to the beach. Not beachfront, but that's rarely a dealbreaker on Karon. $180–$340/night high season."}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/phuket/karon/hotels/pullman-phuket-arcadia-karon-beach-resort/" className="inline-flex items-center rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">
                {isNl ? 'Pullman review →' : 'Read Pullman review →'}
              </Link>
              <a href={withSubId(partners.trip_pullman.partnerUrl, subId)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center rounded-full bg-white text-thailand-red border border-thailand-red px-5 py-2 text-sm font-semibold hover:bg-thailand-red hover:text-white">
                {isNl ? 'Live prijs Trip.com →' : 'Live price on Trip.com →'}
              </a>
            </div>
          </section>

          {/* Per tier sections */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Per categorie: welke Karon-hotels werken voor wie?' : 'By category: which Karon hotels suit who?'}</h2>
            <div className="space-y-5">
              <div className="rounded-2xl bg-white p-5 shadow-sm border-l-4 border-purple-500">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? 'Luxe & families' : 'Luxury & families'}</h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-2">{isNl ? "Pullman Arcadia, Centara Grand, Marriott. Elk heeft een sterke kid's club en meerdere zwembaden. Centara Grand is de enige beachfront. Marriott biedt loyaltypunten. Pullman heeft de grootste fysieke schaal." : "Pullman Arcadia, Centara Grand, Marriott. Each has a strong kids' club and multiple pools. Centara Grand is the only beachfront one. Marriott gives loyalty points. Pullman has the biggest physical footprint."}</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border-l-4 border-pink-500">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? 'Stellen & honeymoons' : 'Couples & honeymoons'}</h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-2">{isNl ? 'Beyond Resort Karon (adults-only beachfront), Avista Grande MGallery (boutique luxe), Mandarava (cascadezwembaden). Beyond geeft beachfront-rust. Avista geeft service en design. Mandarava geeft waarde + pool-access kamers.' : 'Beyond Resort Karon (adults-only beachfront), Avista Grande MGallery (boutique luxury), Mandarava (cascading pools). Beyond delivers beachfront calm. Avista delivers service and design. Mandarava delivers value + pool-access rooms.'}</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border-l-4 border-amber-500">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? 'Mid-range & beachfront waarde' : 'Mid-range & beachfront value'}</h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-2">{isNl ? "Karon Sea Sands ($50–85), Mövenpick (luxe-mid). Karon Sea Sands is dé betaalbare beachfront optie — gedateerde inrichting maar de locatie is onverslaanbaar. Mövenpick zit in de luxe range maar mist soms beschikbaarheid in december." : "Karon Sea Sands ($50–85), Mövenpick (luxury mid). Karon Sea Sands is the affordable beachfront — dated decor but the location can't be beaten. Mövenpick falls in the luxury range but availability dips in December."}</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border-l-4 border-green-500">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? 'Budget' : 'Budget'}</h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-2">{isNl ? "In On The Beach Karon ($40–70) staat het dichtst bij het strand voor backpacker-prijzen. Baan Karon Resort ($17–30) ligt 5 min terug, heeft een tuin en zwembad — beste deal als je niet beachfront hoeft." : "In On The Beach Karon ($40–70) is the closest to the sand for backpacker money. Baan Karon Resort ($17–30) sits 5 min back, has a garden and pool — best deal if beachfront isn't a hard requirement."}</p>
              </div>
            </div>
          </section>

          {/* Booking tips */}
          <section className="rounded-2xl bg-amber-50 border border-amber-200 p-6">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Boekingstips voor Karon hotels' : 'Booking tips for Karon hotels'}</h2>
            <ul className="space-y-3 text-gray-800">
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Boek 2–3 maanden vooruit voor december-januari' : 'Book 2–3 months out for December–January'}</strong>{isNl ? ': de Pullman, Centara Grand en Marriott verkopen ~80% al 60 dagen vóór aankomst.' : ': Pullman, Centara Grand and Marriott are ~80% sold out 60 days before arrival.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Mei-oktober is het halfprijs-venster' : 'May–October is the half-price window'}</strong>{isNl ? ': dezelfde kamer in juni kost 30–50% minder. Risico: middagregen, ruwere zee.' : ': the same room in June costs 30–50% less. Risk: afternoon rain, rougher sea.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Trip.com vs Booking — Trip wint vaak' : 'Trip.com vs Booking — Trip often wins'}</strong>{isNl ? ': vooral op luxe-hotels. Vergelijk altijd 5 minuten — 30-dagen cookie en je krijgt soms hetzelfde tarief 10–15% goedkoper.' : ': especially on luxury hotels. Compare for 5 min — Trip.com gives a 30-day cookie and sometimes drops the same rate 10–15%.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Vraag een hoge verdieping' : 'Request a high floor'}</strong>{isNl ? ': de 4e+ verdieping ontwijkt straatlawaai van Patak Road en geeft betere zee-uitzichten.' : ': 4th floor up dodges Patak Road street noise and adds genuine sea-view potential.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Skip ontbijt-pakketten als je geen luxe-resort boekt' : 'Skip breakfast packages outside luxury resorts'}</strong>{isNl ? ': in Karon Circle eet je voor 100–150 THB beter ontbijt dan een $20 pakket.' : ': you eat better breakfast for 100–150 THB at Karon Circle than a $20 package.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Hotel-airport transfer = duur' : 'Hotel airport transfer = pricey'}</strong>{isNl ? ': 1.200–1.800 THB. Grab is 600–800 THB en werkt prima op HKT in 2026.' : ': 1,200–1,800 THB. Grab is 600–800 THB and works fine at HKT in 2026.'}</span></li>
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
            <h2 className="font-heading text-xl font-bold text-gray-900">{isNl ? 'Plan de rest van je Phuket trip' : 'Plan the rest of your Phuket trip'}</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/phuket/karon/" className="rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">{isNl ? '🏖️ Karon Beach gids' : '🏖️ Karon Beach guide'}</Link>
              <Link href="/best-hotels/phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏨 Beste Phuket hotels' : '🏨 Best Phuket hotels overall'}</Link>
              <Link href="/flights-to-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '✈️ Vluchten naar Phuket' : '✈️ Flights to Phuket'}</Link>
              <Link href="/car-rental-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🚗 Auto huren' : '🚗 Rent a car'}</Link>
              <Link href="/yacht-charter-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '⛵ Yacht charters' : '⛵ Yacht charters'}</Link>
              <Link href="/city/phuket/" className="rounded-full bg-white text-gray-900 border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50">{isNl ? '📖 Phuket reisgids' : '📖 Phuket travel guide'}</Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const file = path.join(process.cwd(), 'data', 'pseo', 'areas', 'karon-partners.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  return { props: { partners: data.partners, lastUpdated: data.lastUpdated }, revalidate: 604800 };
};
