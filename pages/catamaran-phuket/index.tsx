import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import { withSubId, KLOOK_GENERIC } from '../../lib/affiliates';

interface Partners {
  klook_yacht: { partnerUrl: string };
  klook_catamaran: { partnerUrl: string };
  klook_luxury: { partnerUrl: string };
  gyg_yacht: { partnerUrl: string };
  gyg_phuket_yacht: { partnerUrl: string };
  viator_daycruise: { partnerUrl: string };
  viator_yacht_search: { partnerUrl: string };
  trip_yacht: { partnerUrl: string };
  trip_yacht_search: { partnerUrl: string };
  tiqets_yacht: { partnerUrl: string };
}

interface Props { partners: Partners; lastUpdated: string; }

const SUBID_BASE = 'pseo-catamaran-phuket';

export default function CatamaranPhuketPage({ partners, lastUpdated }: Props) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: isNl ? 'Catamaran Phuket' : 'Catamaran Phuket', href: '/catamaran-phuket/' },
  ];

  // Title: keyword front, <60 chars, year + modifier
  const seoTitle = isNl
    ? 'Catamaran Phuket (2026): Dagtochten, Zeilen & Charter'
    : 'Catamaran Phuket (2026): Day Trips, Sailing & Charter Guide';

  // Meta description: <155 chars, question hook, keyword + variation
  const seoDescription = isNl
    ? 'Op zoek naar een catamaran in Phuket? Vergelijk gedeelde dagtochten ($80–150 p.p.), privé full-day catamarans ($600–1.500/dag) + 3 jachthavens.'
    : "Wondering about catamaran rentals in Phuket? Compare shared day trips ($80–150pp), private full-day catamarans ($600–1,500/day) + 3 marinas.";

  const canonical = `https://go2-thailand.com${isNl ? '/nl' : ''}/catamaran-phuket/`;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, i) => ({
      '@type': 'ListItem', position: i + 1, name: b.name,
      item: `https://go2-thailand.com${isNl ? '/nl' : ''}${b.href}`,
    })),
  };

  const faqEn = [
    { q: "Sailing catamaran or power catamaran — which is better in Phuket?",
      a: "Sailing catamarans (Tropical Sailing, most Lagoon and Leopard hulls) move slower (8–12 knots) but are quieter, more atmospheric, and use less fuel. Best for relaxed Coral Island or Racha day trips. Power catamarans (twin diesel, 18–25 knots) reach Phi Phi in 45–60 minutes vs 90+ minutes under sail — better when you want maximum island time. For first-time visitors with kids: power cat to Phi Phi. For couples wanting calm + sundowners: sailing cat to Coral or Racha." },
    { q: "Why choose a catamaran over a monohull yacht for a Phuket day trip?",
      a: "Three reasons: stability, deck space, and seasickness. The twin-hull design barely rolls in the typical Andaman 1–2m chop — a huge difference if anyone in your group gets seasick. Deck area on a 50ft cat is roughly double a 50ft monohull, so 8–10 guests don't trip over each other. Trade-off: cats are slower and don't heel (less fun if you're a sailing purist). For families and mixed groups, a catamaran is almost always the right call." },
    { q: "How much does a private catamaran charter cost in Phuket per day?",
      a: "Private full-day catamaran (8 guests, skipper included, 8–10 hours): $600–900 for a 38–42ft cat, $900–1,500 for a 50ft+ cat with extra crew. Multi-day sailing catamaran with cabins (Lagoon 42, Leopard 45): $1,500–2,500/day all-in for 6–8 guests, food and fuel often extra. Most operators add $30–50/person for catered lunch and a flat $200/day fuel surcharge during peak season." },
    { q: "Are Tropical Sailing and Phuket Sail Tours worth booking direct vs Klook?",
      a: "Tropical Sailing (Coral Island shared cat day trips) and Phuket Sail Tours run their own boats — you can book direct on their sites or via Klook/GetYourGuide for the same price (operators absorb the platform commission rather than passing it on). Booking via Klook gives you free cancellation up to 24h and a single payment account if you book multiple trips. Going direct only matters for custom multi-day itineraries." },
    { q: "What size catamaran do I need for my group?",
      a: "Up to 6 guests: 38–42ft (Lagoon 42, Leopard 40) — comfortable, single skipper, $600–800/day. 7–10 guests: 45–50ft (Lagoon 50, Leopard 48) — needs a deckhand, $900–1,400/day. 11–16 guests: 55–62ft party cat or two smaller cats raft-up — most Phuket operators cap at 12 because of marina permit limits. Above 16: charter two boats and meet at the same anchorage — cheaper than one giant boat." },
  ];

  const faqNl = [
    { q: "Zeilcatamaran of motorcatamaran — wat is beter in Phuket?",
      a: "Zeilcatamarans (Tropical Sailing, meeste Lagoon en Leopard) varen langzamer (8–12 knopen) maar zijn stiller, sfeervoller en zuiniger. Beste voor rustige Coral Island of Racha-dagtocht. Motorcatamarans (twee diesels, 18–25 knopen) bereiken Phi Phi in 45–60 minuten vs 90+ minuten onder zeil — beter als je maximale eilandtijd wilt. Voor eerste-keer-bezoekers met kinderen: motorcat naar Phi Phi. Voor stellen die rust + zonsondergang willen: zeilcat naar Coral of Racha." },
    { q: "Waarom een catamaran kiezen boven een monohull voor een Phuket-dagtocht?",
      a: "Drie redenen: stabiliteit, dekruimte en zeeziekte. Het twee-romp ontwerp rolt nauwelijks in typische Andaman-golven van 1–2m — groot verschil als iemand in je groep zeeziek wordt. Dekoppervlak op een 50ft cat is ongeveer dubbel zo groot als een 50ft monohull, dus 8–10 gasten lopen elkaar niet in de weg. Nadeel: cats zijn langzamer en helleren niet (minder leuk als je een puristische zeiler bent). Voor families en gemengde groepen is een catamaran bijna altijd de juiste keuze." },
    { q: "Wat kost een privé catamaran-charter in Phuket per dag?",
      a: "Privé full-day catamaran (8 gasten, schipper inbegrepen, 8–10 uur): $600–900 voor een 38–42ft cat, $900–1.500 voor een 50ft+ cat met extra bemanning. Meerdaagse zeilcatamaran met cabines (Lagoon 42, Leopard 45): $1.500–2.500/dag all-in voor 6–8 gasten, eten en brandstof vaak apart. De meeste operators rekenen $30–50/persoon voor lunch en een vaste $200/dag brandstoftoeslag in hoogseizoen." },
    { q: "Is Tropical Sailing of Phuket Sail Tours direct boeken voordeliger dan via Klook?",
      a: "Tropical Sailing (Coral Island gedeelde cat-dagtochten) en Phuket Sail Tours varen hun eigen boten — je kunt direct op hun sites boeken of via Klook/GetYourGuide voor dezelfde prijs (operators slikken de platformcommissie in). Via Klook boeken geeft je gratis annulering tot 24u vooraf en één betaalaccount als je meerdere trips boekt. Direct boeken loont alleen voor maatwerk meerdaagse itineraries." },
    { q: "Welke maat catamaran heb ik nodig voor mijn groep?",
      a: "Tot 6 gasten: 38–42ft (Lagoon 42, Leopard 40) — comfortabel, één schipper, $600–800/dag. 7–10 gasten: 45–50ft (Lagoon 50, Leopard 48) — heeft een dekhand nodig, $900–1.400/dag. 11–16 gasten: 55–62ft party-cat of twee kleinere cats samen — de meeste Phuket-operators houden maximaal 12 aan vanwege marina-vergunningslimieten. Boven 16: huur twee boten en spreek af op dezelfde ankerplek — goedkoper dan één megaboot." },
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
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-white/75">{isNl ? 'Catamaran-gids Phuket' : 'Catamaran guide Phuket'}</p>
            {/* H1 differs from title — uses 'Renting a Catamaran' framing + secondary keyword 'cost' */}
            <h1 className="font-heading text-3xl lg:text-5xl font-bold mt-2">
              {isNl
                ? 'Een catamaran huren in Phuket: 5 trip-types + eerlijk kostenoverzicht'
                : 'Renting a Catamaran in Phuket: 5 Trip Types + Honest Cost Guide'}
            </h1>
            <p className="mt-4 text-lg lg:text-xl max-w-3xl opacity-95">
              {isNl
                ? 'Catamarans domineren de Phuket-charterscene omdat hun twee-romp ontwerp stabieler is in Andaman-golven, dubbel zoveel dekruimte heeft en bijna nooit zeeziekte veroorzaakt. Hier vind je elke catamaran-tier — van $80 gedeelde Coral Island-trips tot $2.500/dag liveaboards op Lagoon en Leopard zeilcatamarans.'
                : "Catamarans dominate Phuket's charter scene because the twin-hull design is steadier in Andaman chop, gives you twice the deck space, and almost never causes seasickness. Here's every catamaran tier — from $80 shared Coral Island trips to $2,500/day liveaboards on Lagoon and Leopard sailing cats."}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={withSubId(partners.klook_catamaran.partnerUrl, `${SUBID_BASE}-hero-klook`)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-6 py-3 text-base font-semibold hover:bg-red-700 shadow-lg">
                {isNl ? 'Bekijk catamaran-trips op Klook' : 'See catamaran trips on Klook'} →
              </a>
              <a href={withSubId(partners.gyg_phuket_yacht.partnerUrl, `${SUBID_BASE}-hero-gyg`)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-[#1B9E3E] text-white px-6 py-3 text-base font-semibold hover:bg-[#157a30]">
                {isNl ? 'GetYourGuide jacht-categorie' : 'GetYourGuide yacht category'} →
              </a>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-xs opacity-90">
              <span>✔ 5 {isNl ? 'catamaran-types' : 'catamaran types'}</span>
              <span>✔ {isNl ? 'Zeil vs motor uitgelegd' : 'Sailing vs power explained'}</span>
              <span>✔ {isNl ? 'Bijgewerkt' : 'Updated'} {new Date(lastUpdated).toLocaleDateString(isNl ? 'nl-NL' : 'en', { year: 'numeric', month: 'long' })}</span>
            </div>
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          {/* Comparison table — 5 catamaran trip types */}
          <section id="comparison">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-2">{isNl ? 'Snelle vergelijking: 5 catamaran-trip types' : 'Quick comparison: 5 catamaran trip types'}</h2>
            <p className="text-gray-600 mb-6">{isNl ? 'Klik op een type voor live beschikbaarheid (we verdienen een kleine commissie zonder dat het jou iets extra kost).' : 'Click a type to see live availability (we earn a small commission at no extra cost to you).'}</p>
            <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Type' : 'Type'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Boot' : 'Boat'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Prijs' : 'Price'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Beste voor' : 'Best for'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Boek' : 'Book'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3"><a href={withSubId(partners.klook_catamaran.partnerUrl, `${SUBID_BASE}-table-shared-sail`)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="font-semibold text-thailand-blue hover:text-thailand-red hover:underline">{isNl ? 'Gedeelde zeilcatamaran' : 'Shared sailing catamaran'}</a></td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? '50–60ft, 25–35 gasten' : '50–60ft, 25–35 guests'}</td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">$80–120{isNl ? ' p.p.' : ' pp'}</td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? 'Coral & Racha eilanden, sfeer' : 'Coral & Racha islands, ambience'}</td>
                    <td className="px-4 py-3"><a href={withSubId(partners.klook_catamaran.partnerUrl, `${SUBID_BASE}-table-shared-sail-cta`)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-thailand-red font-semibold hover:underline whitespace-nowrap">{isNl ? 'Bekijk →' : 'See deals →'}</a></td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3"><a href={withSubId(partners.klook_catamaran.partnerUrl, `${SUBID_BASE}-table-shared-power`)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="font-semibold text-thailand-blue hover:text-thailand-red hover:underline">{isNl ? 'Gedeelde motorcatamaran' : 'Shared power catamaran'}</a></td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? '55–65ft, 30–45 gasten' : '55–65ft, 30–45 guests'}</td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">$100–150{isNl ? ' p.p.' : ' pp'}</td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? 'Phi Phi & verre eilanden snel' : 'Phi Phi & fast island hops'}</td>
                    <td className="px-4 py-3"><a href={withSubId(partners.klook_catamaran.partnerUrl, `${SUBID_BASE}-table-shared-power-cta`)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-thailand-red font-semibold hover:underline whitespace-nowrap">{isNl ? 'Bekijk →' : 'See deals →'}</a></td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3"><a href={withSubId(partners.gyg_phuket_yacht.partnerUrl, `${SUBID_BASE}-table-sunset`)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="font-semibold text-thailand-blue hover:text-thailand-red hover:underline">{isNl ? 'Catamaran zonsondergangcruise' : 'Catamaran sunset cruise'}</a></td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? '45–55ft, 20–30 gasten' : '45–55ft, 20–30 guests'}</td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">$50–90{isNl ? ' p.p.' : ' pp'}</td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? 'Eerste-avond entertainment' : 'First-night entertainment'}</td>
                    <td className="px-4 py-3"><a href={withSubId(partners.gyg_phuket_yacht.partnerUrl, `${SUBID_BASE}-table-sunset-cta`)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-thailand-red font-semibold hover:underline whitespace-nowrap">{isNl ? 'Bekijk →' : 'See deals →'}</a></td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3"><a href={withSubId(partners.viator_yacht_search.partnerUrl, `${SUBID_BASE}-table-private`)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="font-semibold text-thailand-blue hover:text-thailand-red hover:underline">{isNl ? 'Privé full-day catamaran' : 'Private full-day catamaran'}</a></td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? 'Lagoon 42 / Leopard 45 (8 pax)' : 'Lagoon 42 / Leopard 45 (8 pax)'}</td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">$600–1.500/{isNl ? 'dag' : 'day'}</td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? 'Familie, vriendengroep' : 'Families, friend groups'}</td>
                    <td className="px-4 py-3"><a href={withSubId(partners.viator_yacht_search.partnerUrl, `${SUBID_BASE}-table-private-cta`)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-thailand-red font-semibold hover:underline whitespace-nowrap">{isNl ? 'Bekijk →' : 'See deals →'}</a></td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3"><a href={withSubId(partners.klook_luxury.partnerUrl, `${SUBID_BASE}-table-liveaboard`)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="font-semibold text-thailand-blue hover:text-thailand-red hover:underline">{isNl ? 'Catamaran liveaboard' : 'Catamaran liveaboard'}</a></td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? 'Lagoon 50 / Leopard 48 (6–8 pax)' : 'Lagoon 50 / Leopard 48 (6–8 pax)'}</td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">$1.500–2.500/{isNl ? 'dag' : 'day'}</td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? 'Honeymoons, Similan-eilanden' : 'Honeymoons, Similan Islands'}</td>
                    <td className="px-4 py-3"><a href={withSubId(partners.klook_luxury.partnerUrl, `${SUBID_BASE}-table-liveaboard-cta`)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-thailand-red font-semibold hover:underline whitespace-nowrap">{isNl ? 'Bekijk →' : 'See deals →'}</a></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-gray-500">{isNl ? 'Prijzen zijn typische 2026 hoogseizoen-tarieven (nov–apr). Mei–okt prijzen meestal 25–35% lager. Marine park fees vaak apart bij privé-charters.' : 'Prices are typical 2026 high-season rates (Nov–Apr). May–Oct usually 25–35% cheaper. Marine park fees often extra on private charters.'}</p>
          </section>

          {/* Sailing vs power section */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Zeilcatamaran vs motorcatamaran: welk type past bij jou?' : 'Sailing vs power catamaran: which fits your trip?'}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white p-5 shadow-sm border-l-4 border-blue-500">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? 'Zeilcatamaran (sail cat)' : 'Sailing catamaran (sail cat)'}</h3>
                <p className="text-xs text-blue-700 font-semibold mb-2">{isNl ? '⛵ Stil, sfeervol, langzamer' : '⛵ Quiet, atmospheric, slower'}</p>
                <p className="text-gray-700 text-sm leading-relaxed mb-2">
                  {isNl
                    ? 'Tropical Sailing en de meeste Lagoon/Leopard charters varen onder zeil bij gunstige wind (8–12 knopen) en motoren als de wind wegvalt. Beste keuze voor Coral Island, Racha en Naka — kortere afstanden waar zeiltijd geen probleem is.'
                    : 'Tropical Sailing and most Lagoon/Leopard charters sail under canvas in good wind (8–12 knots) and motor when the wind dies. Best for Coral Island, Racha, and Naka — shorter routes where the slower pace is fine.'}
                </p>
                <p className="text-gray-600 text-xs"><strong>{isNl ? 'Operators:' : 'Operators:'}</strong> Tropical Sailing, Phuket Sail Tours, sailing-focused private charters on Lagoon 42/50 + Leopard 45/48 hulls.</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border-l-4 border-amber-500">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? 'Motorcatamaran (power cat)' : 'Power catamaran (power cat)'}</h3>
                <p className="text-xs text-amber-700 font-semibold mb-2">{isNl ? '⚡ Snel, meer eilandtijd' : '⚡ Fast, more island time'}</p>
                <p className="text-gray-700 text-sm leading-relaxed mb-2">
                  {isNl
                    ? 'Twee diesels, 18–25 knopen kruissnelheid. Phi Phi in 45–60 min vs 90+ min onder zeil. Beter voor familie-trips waar je de hele dag op de eilanden wilt zijn, niet onderweg. Brandstof is wel duurder — denk aan $200–300/dag toeslag bij private charter.'
                    : 'Twin diesels, 18–25 knot cruise. Phi Phi in 45–60 min vs 90+ min under sail. Better for family trips where you want all day at the islands, not in transit. Fuel is pricier — $200–300/day surcharge on private charters.'}
                </p>
                <p className="text-gray-600 text-xs"><strong>{isNl ? 'Boot-merken:' : 'Hulls:'}</strong> Aquila 36/44, Sunreef Power 60/70, Lagoon Sixty 5 (luxury power), most shared Phi Phi day-trip cats.</p>
              </div>
            </div>
          </section>

          {/* Top pick callout */}
          <section className="rounded-2xl bg-thailand-red/5 border-2 border-thailand-red p-6">
            <span className="inline-block rounded-full bg-thailand-red text-white text-xs font-bold uppercase tracking-wide px-3 py-1 mb-3">⭐ {isNl ? 'Beste keuze voor de meesten' : 'Top pick for most'}</span>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Gedeelde catamaran-dagtocht naar Phi Phi of Coral Island' : 'Shared catamaran day trip to Phi Phi or Coral Island'}</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              {isNl
                ? "Voor 80% van de bezoekers is dit het juiste antwoord: 25–35 medegasten op een 55ft+ catamaran, full-day route met snorkel-stops, lunch + drinks + transfer inbegrepen. $80–150 p.p. voor 7–8 uur op het water. Klook en GetYourGuide bieden dezelfde operators (Tropical Sailing, Phuket Sail Tours, Catamaran Cruise Phuket) — boek waar de reviews het sterkst zijn."
                : "For 80% of visitors this is the right answer: 25–35 fellow guests on a 55ft+ catamaran, full-day route with snorkel stops, lunch + drinks + transfer included. $80–150 pp for 7–8 hours on the water. Klook and GetYourGuide list the same operators (Tropical Sailing, Phuket Sail Tours, Catamaran Cruise Phuket) — book wherever reviews look strongest."}
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={withSubId(partners.klook_catamaran.partnerUrl, `${SUBID_BASE}-toppick-klook`)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">
                {isNl ? 'Catamaran op Klook' : 'Catamaran on Klook'} →
              </a>
              <a href={withSubId(partners.gyg_phuket_yacht.partnerUrl, `${SUBID_BASE}-toppick-gyg`)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center rounded-full bg-[#1B9E3E] text-white px-5 py-2 text-sm font-semibold hover:bg-[#157a30]">
                {isNl ? 'Catamaran op GetYourGuide' : 'Catamaran on GetYourGuide'} →
              </a>
            </div>
          </section>

          {/* Boats & operators section */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Welke boten en operators dragen de Phuket-vloot?' : 'Which boats and operators run the Phuket fleet?'}</h2>
            <div className="space-y-5">
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">{isNl ? 'Tropical Sailing — gedeelde zeil-cats' : 'Tropical Sailing — shared sailing cats'}</h3>
                <p className="text-gray-700 leading-relaxed">{isNl ? 'Vertrekt vanaf Chalong Pier op een 56ft zeilcatamaran. Bekend van de Coral Island & Racha Yai dagroute, kleine groepen (max 30), goede review-scores op Klook + GetYourGuide. Eigen vloot, dus geen vertraging door tussenpartij.' : 'Departs Chalong Pier on a 56ft sailing catamaran. Known for the Coral Island & Racha Yai day route, small groups (max 30), strong review scores on Klook + GetYourGuide. They own their boats — no middleman delays.'}</p>
              </div>
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">{isNl ? 'Phuket Sail Tours — Phang Nga + Phi Phi' : 'Phuket Sail Tours — Phang Nga + Phi Phi'}</h3>
                <p className="text-gray-700 leading-relaxed">{isNl ? 'Vertrekt vanaf Ao Por op een 50ft zeilcat. Specialiseert in Phang Nga Bay (James Bond rotsen) en Phi Phi-routes via een lange 9-uur dag. Vaak hoger gewaardeerd dan motorboot-massatrips omdat groepen kleiner zijn (max 24).' : 'Departs Ao Por on a 50ft sailing cat. Specialises in Phang Nga Bay (James Bond karsts) and Phi Phi routes on a long 9-hour day. Tends to score higher than mass motor-boat trips because groups are smaller (max 24).'}</p>
              </div>
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">{isNl ? 'Lagoon en Leopard charter-merken' : 'Lagoon and Leopard charter brands'}</h3>
                <p className="text-gray-700 leading-relaxed">{isNl ? 'De meeste privé- en multi-day catamarans in Phuket zijn Lagoon (Frans, ruim, populair voor charter) of Leopard (Zuid-Afrikaans, robuuster, beter in golven). Maten: Lagoon 42/50/52, Leopard 40/45/48. Operators zoals Sunsail en The Moorings hebben Phuket-bases bij Yacht Haven Marina — zoek hun naam plus "Phuket" voor directe boekingen, of vergelijk via Viator/Klook.' : 'Most private and multi-day cats in Phuket are Lagoon (French, spacious, charter-favourite) or Leopard (South African, sturdier, better in chop). Sizes: Lagoon 42/50/52, Leopard 40/45/48. Operators like Sunsail and The Moorings have Phuket bases at Yacht Haven Marina — search their name plus "Phuket" for direct bookings, or comparison-shop on Viator/Klook.'}</p>
              </div>
            </div>
          </section>

          {/* Buyer's guide */}
          <section className="rounded-2xl bg-amber-50 border border-amber-200 p-6">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Boekingstips voor catamaran-charter Phuket' : 'Catamaran booking tips Phuket'}</h2>
            <ul className="space-y-3 text-gray-800">
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Check de groepsgrootte voor je boekt' : 'Check group size before booking'}</strong>{isNl ? ': "Catamaran" op Klook varieert van 12 tot 50 medegasten. 25–35 is de sweet spot. Boven 40: lange wachtrijen voor de waterglijbaan en het toilet.' : ': "catamaran" on Klook ranges from 12 to 50 fellow guests. 25–35 is the sweet spot. Above 40: long queues for the waterslide and the toilet.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Sail-cat = ankertijd, power-cat = eilandtijd' : 'Sail cat = anchor time, power cat = island time'}</strong>{isNl ? '. Snorkel-stops zijn 30–45 min op een sail cat (motoren te luid voor lange anker-stops onder zeil), 60+ min op een power cat. Verdrievoudig je effectieve eilandtijd door power te kiezen voor Phi Phi.' : '. Snorkel stops run 30–45 min on a sail cat (engines too loud for long anchored sailing breaks), 60+ min on a power cat. Triple your effective island time by going power for Phi Phi.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Marine park fees apart bij privé-cat' : 'Marine park fees extra on private cats'}</strong>{isNl ? ': $30 p.p. voor Phi Phi National Park, $20 voor Similan, lager elders. Bij gedeelde Klook/GYG trips altijd ingebakken — bij privé-charters meestal apart, vraag bij booking.' : ': $30 pp for Phi Phi National Park, $20 for Similan, lower elsewhere. Always baked into shared Klook/GYG trips — usually extra on private charters, ask at booking.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Voor 6+ vrienden: privé-cat is goedkoper' : 'For 6+ friends: private cat is cheaper'}</strong>{isNl ? '. 8 mensen × $130 gedeeld = $1.040. Privé Lagoon 42 voor 8: $700–900/dag — vergelijkbaar of goedkoper, plus controle over de route.' : '. 8 people × $130 shared = $1,040. Private Lagoon 42 for 8: $700–900/day — same or cheaper plus full route control.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Vraag naar trampoline + helmstoel' : 'Ask about trampoline + helm seating'}</strong>{isNl ? '. Premium catamarans hebben een groot voortrampoline en zonnedek bovenop — beste plek voor zonnen en zonsondergang. Budget-cats hebben dit vaak niet.' : '. Premium catamarans have a big foredeck trampoline and a flybridge sun-lounger — best spots for tanning and sunset. Budget cats often skip this.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Zeeziektegevoeligheid? Catamaran > monohull' : 'Seasickness-prone? Catamaran &gt; monohull'}</strong>{isNl ? '. Twee romp = veel minder rolbeweging. Combineer met Stugeron of Scopolamine-pleister 30 min voor vertrek voor mensen die kwetsbaar zijn.' : '. Twin hulls = much less roll motion. Combine with Stugeron or a scopolamine patch 30 min before departure for vulnerable guests.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Boek nov–apr 1–2 weken vooruit' : 'Book Nov–Apr 1–2 weeks ahead'}</strong>{isNl ? ': hoogseizoen Phi Phi en Coral Island catamarans verkopen 5–10 dagen vooruit volledig uit. Buiten hoogseizoen vaak 2–3 dagen genoeg.' : ': high-season Phi Phi and Coral Island catamarans sell out 5–10 days ahead. Off-season 2–3 days usually works.'}</span></li>
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

          {/* Cluster mesh — link UP to pillar + lateral to spokes + cross-cluster */}
          <section className="rounded-2xl bg-thailand-blue/10 p-6">
            <h2 className="font-heading text-xl font-bold text-gray-900">{isNl ? 'Plan de rest van je Phuket-trip' : 'Plan the rest of your Phuket trip'}</h2>
            <p className="mt-2 text-gray-700">{isNl ? 'Catamaran is geboekt — nu de basis:' : 'Catamaran sorted — now the basics:'}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/yacht-charter-phuket/" className="rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">{isNl ? '⛵ Alle yacht-charter opties' : '⛵ All yacht charter options'}</Link>
              <Link href="/yacht-charter-phuket/luxury/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '💎 Luxe yacht-charter' : '💎 Luxury yacht charter'}</Link>
              <Link href="/yacht-charter-phuket/phi-phi/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏝️ Phi Phi charter' : '🏝️ Phi Phi charter'}</Link>
              <Link href="/yacht-charter-phuket/similan/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🐠 Similan liveaboard' : '🐠 Similan liveaboard'}</Link>
              <Link href="/yacht-rental-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🛥️ Yacht rental (bareboat)' : '🛥️ Yacht rental (bareboat)'}</Link>
              <Link href="/best-hotels/phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏨 Beste hotels Phuket' : '🏨 Best hotels Phuket'}</Link>
              <Link href="/flights-to-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '✈️ Vluchten naar Phuket' : '✈️ Flights to Phuket'}</Link>
              <Link href="/car-rental-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🚗 Auto huren naar de marina' : '🚗 Car rental to the marina'}</Link>
              <Link href="/city/phuket/" className="rounded-full bg-white text-gray-900 border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50">{isNl ? '📖 Phuket reisgids' : '📖 Phuket travel guide'}</Link>
              <a href={withSubId(KLOOK_GENERIC, `${SUBID_BASE}-mesh-klook-generic`)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">{isNl ? '🎟️ Andere Phuket-activiteiten' : '🎟️ Other Phuket activities'}</a>
            </div>
          </section>

          {/* Methodology */}
          <section className="rounded-2xl bg-gray-50 border border-gray-200 p-6 text-sm text-gray-700">
            <h2 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? 'Hoe we vergeleken' : 'How we compared'}</h2>
            <p>{isNl ? 'Tarieven en operators geverifieerd in mei 2026 op Klook, GetYourGuide en Viator voor early-juni 2026 boekingen vanuit Phuket. Boot-merken (Lagoon, Leopard) en operator-namen (Tropical Sailing, Phuket Sail Tours) zijn cross-checked tegen recente Tripadvisor-reviews + de eigen websites van de operators. We verdienen commissie op boekingen via genoemde platforms — dit verandert niets aan de prijs of welke catamarans we noemen.' : "Rates and operators verified May 2026 on Klook, GetYourGuide and Viator for early-June 2026 bookings from Phuket. Boat brands (Lagoon, Leopard) and operator names (Tropical Sailing, Phuket Sail Tours) cross-checked against recent Tripadvisor reviews + each operator's own site. We earn a commission on bookings through the listed platforms — this never changes the price you pay or which catamarans we cover."}</p>
          </section>
        </main>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const file = path.join(process.cwd(), 'data', 'pseo', 'yacht-charter', 'phuket-partners.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  return { props: { partners: data.partners, lastUpdated: data.lastUpdated }, revalidate: 604800 };
};
