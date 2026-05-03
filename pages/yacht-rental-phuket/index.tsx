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

const SUBID_BASE = 'pseo-yacht-rental-phuket';

export default function YachtRentalPhuketPage({ partners, lastUpdated }: Props) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: isNl ? 'Yacht rental Phuket' : 'Yacht Rental Phuket', href: '/yacht-rental-phuket/' },
  ];

  // Title: keyword front, <60 chars, year + modifier
  const seoTitle = isNl
    ? 'Yacht Rental Phuket (2026): Bareboat & Skippered Opties'
    : 'Yacht Rental Phuket (2026): Bareboat & Skippered Options';

  // Meta description: <155 chars, question hook, keyword + variation
  const seoDescription = isNl
    ? 'Yacht rental in Phuket nodig? Zie bareboat-vaarbewijzen (RYA Day Skipper) + skippered alternatieven — en hoe de prijs zich verhoudt.'
    : 'Need a yacht rental in Phuket? See bareboat license requirements (RYA Day Skipper) + skippered alternatives — and how the price compares.';

  const canonical = `https://go2-thailand.com${isNl ? '/nl' : ''}/yacht-rental-phuket/`;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, i) => ({
      '@type': 'ListItem', position: i + 1, name: b.name,
      item: `https://go2-thailand.com${isNl ? '/nl' : ''}${b.href}`,
    })),
  };

  const faqEn = [
    { q: "What license do I need to rent a yacht bareboat in Phuket?",
      a: "Minimum requirements: RYA Day Skipper Practical (or ICC — International Certificate of Competence) for monohulls up to 50ft; ICC plus a documented catamaran endorsement OR a sailing CV showing 5+ days catamaran experience for cats. The Moorings, Sunsail, and Ocean Marina-based operators all check both your physical certificate AND your sailing CV before handover. ASA 104 (American Sailing Association Bareboat Cruising) is also commonly accepted. No license: every bareboat operator offers the same boat with a Thai skipper for $200–400/day extra — that's technically a 'skippered charter' but the boat and price are otherwise the same." },
    { q: "Where do I verify my qualification before flying out?",
      a: "Email a clean PDF scan of your license + sailing CV (boats sailed, dates, role, area) to the operator at booking. The Moorings and Sunsail respond within 48 hours with either a green light, a request for more info, or a recommendation to take a 'check-out sail' on arrival ($150–250 — the dockmaster goes out with you for 2–3 hours and signs off if you're competent). Don't fly out assuming you'll figure it out at the marina — operators have refused handover at the dock when paperwork falls short." },
    { q: "Bareboat rental cost vs skippered — what's the actual price difference in Phuket?",
      a: "Bareboat 38–42ft monohull or cat in high season: $400–700/day plus fuel ($80–150/day) + provisioning + marine park fees. Add a skipper: $200–400/day extra (skippers usually live aboard, so factor a small cabin and meals). Net difference once you add up everything: $300–500/day. For a couple sailing a route they know well, bareboat saves money. For first-time Andaman sailors or anyone uncertain about the reefs around Phi Phi or Koh Lanta, the skipper pays for himself by avoiding a single grounding incident." },
    { q: "What's the bareboat fleet in Phuket — which operators have the most boats?",
      a: "The Moorings (Yacht Haven Marina) — biggest international fleet, mostly Beneteau monohulls 40–50ft and Lagoon catamarans 42–50ft; cleanest handovers. Sunsail (also Yacht Haven) — sister company to The Moorings, similar fleet, slightly newer Sunsail-branded boats. Ocean Marina Yacht Club (technically Pattaya/east coast but charters reach Phuket via delivery) — smaller fleet, lower prices, more Thailand-experienced skippers. Several local operators around Royal Phuket Marina rent 30–38ft monohulls for $250–400/day to ICC-holders." },
    { q: "Is bareboat rental worth it for first-time visitors to Phuket?",
      a: "Honestly — usually no. The Andaman sea has reefs around Phi Phi and Koh Hong that aren't on every chart, fishing nets that don't appear in cruising guides, and rapidly-shifting weather in shoulder season (Apr–May, Oct–Nov). For a first Phuket trip, hire a skipper for at least the first 2–3 days, then negotiate to take over once you've seen the local hazards. Many operators offer this hybrid model — skippered start + bareboat finish — without extra paperwork." },
  ];

  const faqNl = [
    { q: "Welk vaarbewijs heb ik nodig om bareboat te huren in Phuket?",
      a: "Minimaal: RYA Day Skipper Practical (of ICC — International Certificate of Competence) voor monohulls tot 50ft; ICC plus een gedocumenteerde catamaran-aantekening OF een vaar-CV met 5+ dagen catamaran-ervaring voor cats. The Moorings, Sunsail en Ocean Marina-operators controleren zowel je fysieke certificaat ALS je vaar-CV vóór de overdracht. ASA 104 (American Sailing Association Bareboat Cruising) wordt ook geaccepteerd. Geen bewijs? Elke bareboat-operator biedt dezelfde boot met een Thaise schipper aan voor $200–400/dag extra — dat is technisch een 'skippered charter' maar de boot en prijs zijn verder hetzelfde." },
    { q: "Waar verifieer ik mijn kwalificatie voor het uitvliegen?",
      a: "Mail een schone PDF-scan van je vaarbewijs + vaar-CV (boten, datums, rol, gebied) naar de operator bij booking. The Moorings en Sunsail antwoorden binnen 48 uur met groen licht, een verzoek om meer info, of het advies om een 'check-out sail' te doen bij aankomst ($150–250 — de dockmaster gaat 2–3 uur mee en tekent af als je competent bent). Vlieg niet uit met de gedachte 'ik zie wel bij de marina' — operators hebben handovers geweigerd aan de steiger als papierwerk ontbreekt." },
    { q: "Bareboat-rental vs skippered — wat is het echte prijsverschil in Phuket?",
      a: "Bareboat 38–42ft monohull of cat in hoogseizoen: $400–700/dag plus brandstof ($80–150/dag) + proviand + marine park-fees. Schipper toevoegen: $200–400/dag extra (schippers wonen meestal aan boord, dus reken een kleine cabine + maaltijden). Netto verschil als je alles optelt: $300–500/dag. Voor een stel dat een bekende route vaart bespaart bareboat geld. Voor eerste-keer Andaman-zeilers of mensen die onzeker zijn over de riffen rond Phi Phi of Koh Lanta verdient een schipper zichzelf terug door één grondings-incident te voorkomen." },
    { q: "Wat is de bareboat-vloot in Phuket — welke operators hebben de meeste boten?",
      a: "The Moorings (Yacht Haven Marina) — grootste internationale vloot, meestal Beneteau monohulls 40–50ft en Lagoon catamarans 42–50ft; netste handovers. Sunsail (ook Yacht Haven) — zustermerk van The Moorings, vergelijkbare vloot, iets nieuwere Sunsail-branded boten. Ocean Marina Yacht Club (technisch Pattaya/oostkust maar charters bereiken Phuket via levering) — kleinere vloot, lagere prijzen, meer Thailand-ervaren schippers. Verschillende lokale operators rond Royal Phuket Marina verhuren 30–38ft monohulls voor $250–400/dag aan ICC-houders." },
    { q: "Is bareboat-rental de moeite waard voor eerste-keer-bezoekers van Phuket?",
      a: "Eerlijk — meestal niet. De Andaman-zee heeft riffen rond Phi Phi en Koh Hong die niet op elke kaart staan, visnetten die niet in cruising-gidsen staan, en snel-veranderend weer in tussenseizoenen (apr–mei, okt–nov). Voor een eerste Phuket-trip: huur de eerste 2–3 dagen een schipper, en neem het stuur over zodra je de lokale gevaren hebt gezien. Veel operators bieden dit hybride model — skippered start + bareboat finish — zonder extra papierwerk." },
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
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-white/75">{isNl ? 'Yacht rental gids Phuket' : 'Yacht rental guide Phuket'}</p>
            {/* H1 differs from title — uses 'Explained' framing + secondary keyword 'license' */}
            <h1 className="font-heading text-3xl lg:text-5xl font-bold mt-2">
              {isNl
                ? 'Phuket yacht rental uitgelegd: bareboat-vaarbewijs + skippered alternatieven'
                : 'Phuket Yacht Rental Explained: Bareboat License + Skippered Alternatives'}
            </h1>
            <p className="mt-4 text-lg lg:text-xl max-w-3xl opacity-95">
              {isNl
                ? "Yacht rental in Phuket draait om één vraag: heb je een vaarbewijs (RYA Day Skipper of ICC) of niet? Met certificaat huur je bareboat ($400–700/dag) en doe je het zelf. Zonder certificaat krijg je dezelfde boot plus een Thaise schipper voor $200–400/dag extra — technisch een charter, praktisch hetzelfde. Hier is alles wat je moet weten over kwalificaties, vloten en de Phuket-marinas."
                : "Phuket yacht rental comes down to one question: do you have a sailing license (RYA Day Skipper or ICC) or not? With certification you bareboat-rent ($400–700/day) and skipper yourself. Without it you get the same boat plus a Thai captain for $200–400/day more — technically a charter, practically the same thing. Here's everything to know about qualifications, fleets, and Phuket marinas."}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={withSubId(partners.viator_yacht_search.partnerUrl, `${SUBID_BASE}-hero-viator`)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-6 py-3 text-base font-semibold hover:bg-red-700 shadow-lg">
                {isNl ? 'Bekijk yacht-rentals op Viator' : 'See yacht rentals on Viator'} →
              </a>
              <a href={withSubId(partners.klook_yacht.partnerUrl, `${SUBID_BASE}-hero-klook`)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-blue-dark text-white px-6 py-3 text-base font-semibold border border-white/30 hover:bg-thailand-blue/80">
                {isNl ? 'Bekijk yacht-rentals op Klook' : 'See yacht rentals on Klook'} →
              </a>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-xs opacity-90">
              <span>✔ 3 {isNl ? 'license-tiers' : 'license tiers'}</span>
              <span>✔ {isNl ? 'Bareboat vs skippered' : 'Bareboat vs skippered'}</span>
              <span>✔ {isNl ? 'Bijgewerkt' : 'Updated'} {new Date(lastUpdated).toLocaleDateString(isNl ? 'nl-NL' : 'en', { year: 'numeric', month: 'long' })}</span>
            </div>
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          {/* License tiers comparison table */}
          <section id="comparison">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-2">{isNl ? 'Wat mag je huren? 3 license-tiers' : 'What you can rent: 3 license tiers'}</h2>
            <p className="text-gray-600 mb-6">{isNl ? 'Operators verifiëren elk certificaat — fake of "thuis vergeten" werkt niet.' : 'Operators verify every certificate — fake or "left at home" never works.'}</p>
            <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Wat heb je?' : 'What you hold'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Wat mag je' : 'You can rent'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Prijs/dag' : 'Price/day'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Verificatie' : 'Verification'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Boek' : 'Book'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3"><span className="font-semibold text-gray-900">{isNl ? 'Geen vaarbewijs' : 'No sailing license'}</span></td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? 'Skippered yacht (alle maten)' : 'Skippered yacht (any size)'}</td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">$600–1.500</td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? 'Geen — Thai schipper aan boord' : 'None — Thai skipper on board'}</td>
                    <td className="px-4 py-3"><a href={withSubId(partners.viator_daycruise.partnerUrl, `${SUBID_BASE}-table-skippered`)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-thailand-red font-semibold hover:underline whitespace-nowrap">{isNl ? 'Bekijk →' : 'See deals →'}</a></td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3"><span className="font-semibold text-gray-900">{isNl ? 'RYA Day Skipper / ICC' : 'RYA Day Skipper / ICC'}</span></td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? 'Bareboat monohull tot 50ft' : 'Bareboat monohull up to 50ft'}</td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">$400–700</td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? 'PDF-scan + vaar-CV' : 'PDF scan + sailing CV'}</td>
                    <td className="px-4 py-3"><a href={withSubId(partners.viator_yacht_search.partnerUrl, `${SUBID_BASE}-table-bareboat`)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-thailand-red font-semibold hover:underline whitespace-nowrap">{isNl ? 'Bekijk →' : 'See deals →'}</a></td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3"><span className="font-semibold text-gray-900">{isNl ? 'ICC + cat-aantekening / ASA 104' : 'ICC + cat endorsement / ASA 104'}</span></td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? 'Bareboat catamaran 42–50ft' : 'Bareboat catamaran 42–50ft'}</td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">$550–900</td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? 'PDF + cat-uren in CV' : 'PDF + cat hours in CV'}</td>
                    <td className="px-4 py-3"><a href={withSubId(partners.viator_yacht_search.partnerUrl, `${SUBID_BASE}-table-bareboat-cat`)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-thailand-red font-semibold hover:underline whitespace-nowrap">{isNl ? 'Bekijk →' : 'See deals →'}</a></td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3"><span className="font-semibold text-gray-900">{isNl ? 'Yachtmaster Offshore' : 'Yachtmaster Offshore'}</span></td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? 'Bareboat 50–60ft+ multi-day' : 'Bareboat 50–60ft+ multi-day'}</td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">$700–1.400</td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? 'PDF + check-out sail vaak' : 'PDF + check-out sail often'}</td>
                    <td className="px-4 py-3"><a href={withSubId(partners.viator_yacht_search.partnerUrl, `${SUBID_BASE}-table-yachtmaster`)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-thailand-red font-semibold hover:underline whitespace-nowrap">{isNl ? 'Bekijk →' : 'See deals →'}</a></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-gray-500">{isNl ? 'Prijzen zijn 2026 hoogseizoen (nov–apr). Brandstof, proviand en marine park-fees apart bij bareboat. Skippered prijzen inclusief schipper, exclusief brandstof.' : 'Prices are 2026 high-season rates (Nov–Apr). Fuel, provisioning, and marine park fees are extra on bareboat. Skippered rates include the skipper, exclude fuel.'}</p>
          </section>

          {/* License requirements deep-dive */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Welk vaarbewijs heb je echt nodig?' : 'What sailing qualification do you actually need?'}</h2>
            <div className="space-y-5">
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">{isNl ? 'RYA Day Skipper Practical (of ICC)' : 'RYA Day Skipper Practical (or ICC)'}</h3>
                <p className="text-gray-700 leading-relaxed">{isNl ? 'De wereldwijd geaccepteerde minimum-standaard. RYA Day Skipper is een 5-daagse cursus + praktijkexamen op een 30–40ft monohull. ICC is de internationale variant — vergelijkbaar niveau. The Moorings en Sunsail accepteren beide voor monohulls tot 50ft. Minder bekend maar geldig: ASA 103/104 (US), Cruising Skipper (NZ), Coastal Skipper (AU). Ze willen het origineel + vaar-CV zien.' : 'The globally-accepted minimum. RYA Day Skipper is a 5-day course + practical exam on a 30–40ft monohull. ICC is the international equivalent — comparable level. The Moorings and Sunsail accept both for monohulls up to 50ft. Less famous but valid: ASA 103/104 (US), Cruising Skipper (NZ), Coastal Skipper (AU). They want the physical certificate + sailing CV.'}</p>
              </div>
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">{isNl ? 'Catamaran-aantekening' : 'Catamaran endorsement'}</h3>
                <p className="text-gray-700 leading-relaxed">{isNl ? 'Cats reageren anders dan monohulls — ze helleren niet, draaien op twee motoren, hebben een grotere "windage" zijaanvalsoppervlak. RYA en ASA bieden specifieke cat-aantekeningen aan, of je kunt 5+ dagen gedocumenteerde cat-tijd in je vaar-CV zetten. Lagoon 42 en Leopard 45 chartersbedrijven willen meestal allebei zien.' : "Cats handle differently from monohulls — they don't heel, they pivot on twin engines, and they have huge windage. RYA and ASA offer specific cat endorsements, or you can document 5+ days of cat time in your sailing CV. Lagoon 42 and Leopard 45 charter operators usually want either."}</p>
              </div>
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">{isNl ? 'Geen certificaat? Skippered is je optie' : "No certificate? Skippered is your option"}</h3>
                <p className="text-gray-700 leading-relaxed">{isNl ? "Geen vaarbewijs is geen probleem in Phuket — elke 'rental'-operator biedt dezelfde boot met een Thaise schipper voor $200–400/dag extra. Technisch heet dat een 'skippered charter', maar de boot, route en prijsstructuur zijn verder identiek. De schipper kent lokale ankerplaatsen, riffen en visnetten — vaak waardevoller dan zijn dagtarief, vooral voor first-timers in de Andaman." : "No license is no problem in Phuket — every 'rental' operator offers the same boat with a Thai skipper for $200–400/day more. Technically that's a 'skippered charter', but the boat, route, and pricing are otherwise identical. The skipper knows local anchorages, reefs, and fishing nets — often worth more than his day rate, especially for Andaman first-timers."}</p>
              </div>
            </div>
          </section>

          {/* Bareboat operators */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'De bareboat-operators in Phuket' : 'The bareboat operators in Phuket'}</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="rounded-2xl bg-white p-5 shadow-sm border-l-4 border-green-500">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">The Moorings</h3>
                <p className="text-xs text-green-700 font-semibold mb-2">{isNl ? '👑 Grootste vloot' : '👑 Biggest fleet'}</p>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? 'Yacht Haven Marina-base, Beneteau monohulls 40–50ft + Lagoon catamarans 42–50ft. Bekend voor netste handovers en strikte vaarbewijs-controle. Internationaal merk — beste keuze als je verwacht dat alles soepel verloopt.' : 'Yacht Haven Marina base, Beneteau monohulls 40–50ft + Lagoon catamarans 42–50ft. Known for cleanest handovers and strict license verification. International brand — best choice if you want everything to go smoothly.'}</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border-l-4 border-blue-500">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">Sunsail</h3>
                <p className="text-xs text-blue-700 font-semibold mb-2">{isNl ? '🔵 Zustermerk Moorings' : '🔵 Sister brand'}</p>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? 'Ook Yacht Haven, dezelfde holding als The Moorings (TUI) maar Sunsail-branded boten zijn meestal 1–2 jaar nieuwer. Vergelijkbare prijzen, vergelijkbaar verificatie-proces. Soms beter beschikbaar als The Moorings-vloot vol is.' : 'Also Yacht Haven, same parent (TUI) as The Moorings but Sunsail-branded boats tend to be 1–2 years newer. Comparable prices, comparable verification process. Sometimes better availability when The Moorings fleet is full.'}</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border-l-4 border-amber-500">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">Ocean Marina + lokaal</h3>
                <p className="text-xs text-amber-700 font-semibold mb-2">{isNl ? '💰 Lagere prijzen' : '💰 Lower prices'}</p>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? 'Ocean Marina Yacht Club zit technisch in Pattaya maar heeft Andaman-routes. Lokale Royal Phuket Marina operators verhuren 30–38ft monohulls voor $250–400/dag aan ICC-houders. Minder consistente kwaliteit dan The Moorings, maar 30–40% goedkoper.' : "Ocean Marina Yacht Club is technically Pattaya-based but runs Andaman routes. Local Royal Phuket Marina operators rent 30–38ft monohulls for $250–400/day to ICC holders. Less consistent quality than The Moorings, but 30–40% cheaper."}</p>
              </div>
            </div>
          </section>

          {/* Buyer's guide */}
          <section className="rounded-2xl bg-amber-50 border border-amber-200 p-6">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Tips voor yacht-rental in Phuket' : 'Yacht rental tips for Phuket'}</h2>
            <ul className="space-y-3 text-gray-800">
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Stuur certificaat + vaar-CV samen' : 'Send certificate + sailing CV together'}</strong>{isNl ? ': operators wijzen handover af als er twijfel is. Je vaar-CV moet boten, datums, rol (schipper/bemanning), en gebied bevatten — geen losse zinnen, een duidelijke tabel.' : ': operators refuse handover if anything is unclear. Your sailing CV should list boats, dates, role (skipper/crew), and area — not loose sentences, a clean table.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Boek 6–12 weken vooruit voor hoogseizoen' : 'Book 6–12 weeks ahead for high season'}</strong>{isNl ? ': nov–apr zijn The Moorings en Sunsail vaak 2 maanden vooruit volgeboekt voor de populairste boten. Lokale operators 2–3 weken.' : ': Nov–Apr The Moorings and Sunsail typically book out 2 months ahead on the most popular boats. Local operators 2–3 weeks.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Reken brandstof + proviand erbij' : 'Add fuel + provisioning'}</strong>{isNl ? ': bareboat-prijs IS exclusief. Brandstof $80–150/dag, proviand $40–60/persoon/dag voor zelf koken, $80–120/persoon/dag voor restaurants en cocktailbars. Marine park-fees apart.' : ': bareboat price is exclusive. Fuel $80–150/day, provisioning $40–60/person/day if cooking, $80–120/person/day eating ashore. Marine park fees separate.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Vraag check-out sail aan als je twijfelt' : 'Request a check-out sail if uncertain'}</strong>{isNl ? ': $150–250 om 2–3 uur met de dockmaster te varen. Hij tekent af op je boekingsformulier — beschermt je tegen handover-weigering en geeft je een lokale briefing.' : ": $150–250 for 2–3 hours with the dockmaster. They sign off on your booking form — protects you from handover refusal and gives you a local briefing."}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Hybride: skippered start, bareboat finish' : 'Hybrid: skippered start, bareboat finish'}</strong>{isNl ? '. Veel operators staan dit toe — eerste 2–3 dagen schipper aan boord die je de Andaman leert, daarna verlaat hij de boot bij Phi Phi en vaar je zelf naar Phuket terug. Goedkoper dan volledig skippered, veiliger dan pure bareboat.' : '. Many operators allow this — skipper aboard first 2–3 days teaching you the Andaman, then he leaves the boat at Phi Phi and you sail back to Phuket alone. Cheaper than full skippered, safer than pure bareboat.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Reisverzekering met "skippered own boat" dekking' : 'Travel insurance with "skippered own boat" cover'}</strong>{isNl ? ': normale polissen sluiten "operating own vessel" uit. Zoek een polis (World Nomads, SafetyWing premium) die expliciet skippered yachts tot 50ft dekt — anders ben je zelf aansprakelijk voor schade.' : ': normal policies exclude "operating own vessel". Find a policy (World Nomads, SafetyWing premium) that explicitly covers skippered yachts up to 50ft — otherwise you are personally liable for damage.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Vermijd late seizoens-overgangen' : 'Avoid late season transitions'}</strong>{isNl ? '. Eind oktober en eind april zijn riskant: het weer kan binnen 24 uur omslaan van perfect naar 35-knots squall. Bareboat in deze periodes alleen als je significante ervaring hebt met snelle weersveranderingen.' : '. Late October and late April are tricky: weather can flip from perfect to 35-knot squalls within 24h. Bareboat in these windows only with significant experience handling fast weather shifts.'}</span></li>
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
            <h2 className="font-heading text-xl font-bold text-gray-900">{isNl ? 'Plan de rest van je Phuket-trip' : 'Plan the rest of your Phuket trip'}</h2>
            <p className="mt-2 text-gray-700">{isNl ? 'Yacht rental is zo geregeld — nu de basis:' : 'Yacht rental sorted — now the basics:'}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/yacht-charter-phuket/" className="rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">{isNl ? '⛵ Alle yacht-charter opties' : '⛵ All yacht charter options'}</Link>
              <Link href="/yacht-charter-phuket/luxury/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '💎 Luxe yacht-charter' : '💎 Luxury yacht charter'}</Link>
              <Link href="/yacht-charter-phuket/phi-phi/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏝️ Phi Phi charter' : '🏝️ Phi Phi charter'}</Link>
              <Link href="/yacht-charter-phuket/similan/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🐠 Similan liveaboard' : '🐠 Similan liveaboard'}</Link>
              <Link href="/catamaran-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🛥️ Catamaran-gids' : '🛥️ Catamaran guide'}</Link>
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
            <p>{isNl ? 'Vaarbewijs-vereisten en operator-policies geverifieerd in mei 2026 op de officiële The Moorings, Sunsail en Ocean Marina Yacht Club websites + recente Phuket bareboat-reviews op Cruising World en YachtPals forums. Tarieven gecheckt op Klook, GetYourGuide, Viator en Trip.com voor early-juni 2026 boekingen vanuit Yacht Haven en Royal Phuket Marina. We verdienen commissie op boekingen via genoemde platforms — dit verandert niets aan de prijs of welke operators we noemen.' : "License requirements and operator policies verified May 2026 on the official The Moorings, Sunsail, and Ocean Marina Yacht Club sites + recent Phuket bareboat reviews on Cruising World and YachtPals forums. Rates checked on Klook, GetYourGuide, Viator, and Trip.com for early-June 2026 bookings out of Yacht Haven and Royal Phuket Marina. We earn a commission on bookings through the listed platforms — this never changes the price you pay or which operators we cover."}</p>
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
