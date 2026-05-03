import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import { withSubId, KLOOK_GENERIC, TWELVEGO_GENERIC } from '../../lib/affiliates';
import { useSubId } from '../../lib/useSubId';

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

export default function YachtCharterPhuketPage({ partners, lastUpdated }: Props) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const subId = useSubId();

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: isNl ? 'Yacht charter Phuket' : 'Yacht Charter Phuket', href: '/yacht-charter-phuket/' },
  ];

  // Title: keyword front, <60, modifier
  const seoTitle = isNl
    ? 'Yacht Charter Phuket (2026): 6 Opties Vergeleken'
    : 'Yacht Charter Phuket (2026): 6 Options + Honest Cost Guide';

  // Meta description: <155, question hook, keyword
  const seoDescription = isNl
    ? 'Yacht charter in Phuket? Vergelijk catamaran-dagtochten ($80–200pp), private yachts ($500–1500/dag) en luxe charters ($2.000+/dag). Eerlijke kosten + jachthavens.'
    : 'Looking to charter a yacht in Phuket? Compare catamaran day trips ($80–200pp), private yachts ($500–1,500/day) & luxury charters ($2,000+/day). Honest costs + marinas.';

  const canonical = `https://go2-thailand.com${isNl ? '/nl' : ''}/yacht-charter-phuket/`;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, i) => ({
      '@type': 'ListItem', position: i + 1, name: b.name,
      item: `https://go2-thailand.com${isNl ? '/nl' : ''}${b.href}`,
    })),
  };

  const faqEn = [
    { q: "How much does a yacht charter cost in Phuket?",
      a: "It depends entirely on what you mean by 'yacht.' Shared catamaran day trips with food + drinks: $80–150 per person. Private full-day catamaran/motor yacht (up to 8 guests): $500–1,500/day. Sunset cruises (2–3 hours): $40–80 shared, $200–600 private. Multi-day liveaboard luxury: $1,500–5,000/day. Crewed superyachts (40m+): $10,000+/day. Most travelers want one of the first three categories." },
    { q: "What's the difference between a catamaran and a yacht charter?",
      a: "On Phuket, both terms get used loosely. Catamaran = twin-hull, more stable, more deck space, slower. Motor yacht = single-hull, faster (Phi Phi in 35 min vs 75 min), bumpier in chop, smaller social area. For families and groups: catamaran. For couples wanting to maximise time at islands: motor yacht. For overnight trips: 50ft+ sailing yacht with cabins." },
    { q: "Which marina should I depart from?",
      a: "Yacht Haven Marina (north-east) is the biggest with 24+ charter operators — best selection. Ao Po Grand Marina (north) handles the largest super-yachts. Royal Phuket Marina (central east coast) is closest to Patong/Karon hotels (45 min vs 1h+ for Yacht Haven). For Phi Phi-bound trips: pick whichever is closest to your hotel — total trip length is similar." },
    { q: "When is the best time for a Phuket yacht charter?",
      a: "November to April is the dry season with calm Andaman waters — the only sensible window for the Similan Islands (closed May–Oct) and most multi-day trips. May to October is the south-west monsoon: rough seas on the west coast, but east-coast trips (Phi Phi, James Bond Bay) often still operate at 30–40% lower prices. Worst weather: late September." },
    { q: "Do I need a sailing license to charter a bareboat in Phuket?",
      a: "Yes — RYA Day Skipper (or equivalent ICC) minimum for monohulls, ICC plus catamaran endorsement or sailing CV showing catamaran experience for cats. Local operators verify by checking your logbook + license. If you don't have certification, every operator offers a skippered charter — adds $200–400/day for a Thai captain who handles navigation while you relax." },
    { q: "Can I include James Bond Bay or Similan Islands?",
      a: "James Bond Bay (Phang Nga) is a 4–5 hour round trip from any Phuket marina — fine as a full-day private charter. Similan Islands need 2 days minimum (12h round trip + sailing time at the islands) — only doable with overnight liveaboard November–May. Phi Phi is the most common day trip: 35–75 min each way depending on boat speed." },
    { q: "What's included in a typical Phuket yacht charter price?",
      a: "Shared day trips on Klook/GYG always include: lunch, soft drinks, snorkel gear, towels, fuel, marine park fees, hotel transfer (most). Private charters often DON'T include marine park fees ($30/person/day for Phi Phi National Park) or food beyond the basics — confirm at booking. Always-extra: alcohol beyond beer/wine, extended itineraries, off-route stops." },
  ];

  const faqNl = [
    { q: "Wat kost een yacht charter in Phuket?",
      a: "Hangt af van wat je onder 'yacht' verstaat. Gedeelde catamaran-dagtocht met eten + drinken: $80–150 per persoon. Privé full-day catamaran/motorjacht (tot 8 gasten): $500–1.500/dag. Zonsondergangcruise (2–3 uur): $40–80 gedeeld, $200–600 privé. Meerdaagse liveaboard luxe: $1.500–5.000/dag. Crewed superyachts (40m+): $10.000+/dag. De meeste reizigers willen een van de eerste drie." },
    { q: "Wat is het verschil tussen een catamaran en yacht charter?",
      a: "In Phuket worden de termen door elkaar gebruikt. Catamaran = twee romp, stabieler, meer dekruimte, langzamer. Motorjacht = één romp, sneller (Phi Phi in 35 min vs 75 min), hobbeliger in golven, kleinere sociale ruimte. Voor families/groepen: catamaran. Voor stellen die maximaal tijd op de eilanden willen: motorjacht. Voor overnachten: 50ft+ zeiljacht met cabines." },
    { q: "Vanuit welke jachthaven vertrek je het beste?",
      a: "Yacht Haven Marina (noordoost) is de grootste met 24+ operators — beste keuze. Ao Po Grand Marina (noord) handelt de grootste superyachts. Royal Phuket Marina (centraal oost) ligt het dichtst bij Patong/Karon hotels (45 min vs 1u+ voor Yacht Haven). Voor Phi Phi-trips: kies wat het dichtst bij je hotel ligt — totale tijd is vergelijkbaar." },
    { q: "Wanneer is de beste tijd voor een Phuket yacht charter?",
      a: "November tot april: droge seizoen met rustige Andamanwateren — het enige zinnige venster voor de Similan-eilanden (gesloten mei–okt) en meeste meerdaagse trips. Mei tot oktober: zuidwestmoesson, ruwe zee aan de westkust, maar oostkust-trips (Phi Phi, James Bond Bay) varen vaak nog op 30–40% lagere prijzen. Slechtste weer: eind september." },
    { q: "Heb ik een vaarbewijs nodig voor bareboat charter in Phuket?",
      a: "Ja — minimaal RYA Day Skipper (of gelijkwaardig ICC) voor mono-hulls, ICC plus catamaran-aantekening of CV voor cats. Lokale operators controleren je logboek + bewijs. Geen certificaat? Elke operator biedt skippered charter — voor $200–400/dag extra een Thaise kapitein die navigeert terwijl jij ontspant." },
    { q: "Kan ik James Bond Bay of de Similans meenemen?",
      a: "James Bond Bay (Phang Nga) is 4–5 uur retour vanaf elke Phuket-marina — prima voor een full-day private charter. Similan-eilanden: minimaal 2 dagen nodig (12u retour + tijd op eilanden) — alleen mogelijk met overnacht liveaboard tussen november en mei. Phi Phi is de populairste dagtrip: 35–75 min enkele reis afhankelijk van bootsnelheid." },
    { q: "Wat zit er bij een Phuket yacht charter prijs inbegrepen?",
      a: "Gedeelde dagtochten op Klook/GYG hebben altijd: lunch, frisdranken, snorkelgear, handdoeken, brandstof, marine park-fees, hoteltransfer (meestal). Privé-charters bevatten vaak GEEN marine park-fees ($30/persoon/dag voor Phi Phi National Park) of eten buiten basis — check bij boeking. Altijd extra: alcohol buiten bier/wijn, langere routes, off-route stops." },
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
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-white/75">{isNl ? 'Yacht charter vergelijking' : 'Yacht charter comparison'}</p>
            {/* H1 differs from title per playbook — uses 'How to' framing + secondary keyword 'cost' */}
            <h1 className="font-heading text-3xl lg:text-5xl font-bold mt-2">
              {isNl
                ? 'Phuket yacht charter: 6 opties + eerlijk kostenoverzicht'
                : 'How to Charter a Yacht in Phuket: 6 Options + Honest Cost Breakdown'}
            </h1>
            <p className="mt-4 text-lg lg:text-xl max-w-3xl opacity-95">
              {isNl
                ? "Phuket's oostkust-marinas (Yacht Haven, Royal Phuket, Ao Po Grand) huisvesten 200+ charterboten — van $80 catamaran-dagtochten tot $5.000+ luxe liveaboards. Hier vind je wat élk type kost, vanwaar je vertrekt, en hoe je niet betaalt voor extra's die thuishoren in de basisprijs."
                : "Phuket's east-coast marinas (Yacht Haven, Royal Phuket, Ao Po Grand) host 200+ charter boats — from $80 catamaran day trips to $5,000+ luxury liveaboards. Here's what each tier actually costs, which marina to leave from, and how to avoid paying extra for things that should be in the base price."}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={withSubId(partners.klook_yacht.partnerUrl, subId)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-6 py-3 text-base font-semibold hover:bg-red-700 shadow-lg">
                {isNl ? 'Bekijk Phuket yacht-trips op Klook' : 'See Phuket yacht trips on Klook'} →
              </a>
              <a href={withSubId(partners.gyg_phuket_yacht.partnerUrl, subId)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-[#1B9E3E] text-white px-6 py-3 text-base font-semibold hover:bg-[#157a30]">
                {isNl ? 'GetYourGuide jacht-categorie' : 'GetYourGuide yacht category'} →
              </a>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-xs opacity-90">
              <span>✔ 6 {isNl ? 'tiers vergeleken' : 'tiers compared'}</span>
              <span>✔ {isNl ? 'Marina + seizoen-tips' : 'Marina + season tips'}</span>
              <span>✔ {isNl ? 'Bijgewerkt' : 'Updated'} {new Date(lastUpdated).toLocaleDateString(isNl ? 'nl-NL' : 'en', { year: 'numeric', month: 'long' })}</span>
            </div>
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          {/* Comparison table — 6 yacht charter tiers */}
          <section id="comparison">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-2">{isNl ? 'Snelle vergelijking: 6 charter-tiers' : 'Quick comparison: 6 charter tiers'}</h2>
            <p className="text-gray-600 mb-6">{isNl ? 'Klik een tier om live aanbiedingen te zien (we verdienen een kleine commissie zonder dat het jou iets extra kost).' : 'Click a tier to see live availability (we earn a small commission at no extra cost to you).'}</p>
            <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Charter-tier' : 'Charter tier'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Duur' : 'Duration'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Prijs' : 'Price'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Beste voor' : 'Best for'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Boek' : 'Book'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3"><a href={withSubId(partners.klook_catamaran.partnerUrl, subId)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="font-semibold text-thailand-blue hover:text-thailand-red hover:underline">{isNl ? 'Gedeelde catamaran-dagtocht' : 'Shared catamaran day trip'}</a></td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? '6–8 uur' : '6–8 hours'}</td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">$80–150{isNl ? ' p.p.' : ' pp'}</td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? 'Solo, koppels, kleine groepen' : 'Solo, couples, small groups'}</td>
                    <td className="px-4 py-3"><a href={withSubId(partners.klook_catamaran.partnerUrl, subId)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-thailand-red font-semibold hover:underline whitespace-nowrap">{isNl ? 'Bekijk →' : 'See deals →'}</a></td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3"><a href={withSubId(partners.klook_yacht.partnerUrl, subId)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="font-semibold text-thailand-blue hover:text-thailand-red hover:underline">{isNl ? 'Gedeelde motorjacht-dagtocht' : 'Shared motor yacht day trip'}</a></td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? '6–9 uur' : '6–9 hours'}</td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">$110–200{isNl ? ' p.p.' : ' pp'}</td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? 'Snel naar Phi Phi & verre eilanden' : 'Fast to Phi Phi & farther islands'}</td>
                    <td className="px-4 py-3"><a href={withSubId(partners.klook_yacht.partnerUrl, subId)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-thailand-red font-semibold hover:underline whitespace-nowrap">{isNl ? 'Bekijk →' : 'See deals →'}</a></td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3"><a href={withSubId(partners.gyg_phuket_yacht.partnerUrl, subId)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="font-semibold text-thailand-blue hover:text-thailand-red hover:underline">{isNl ? 'Sunset cruise' : 'Sunset cruise'}</a></td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? '2–3 uur' : '2–3 hours'}</td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">$40–80{isNl ? ' p.p.' : ' pp'} / $200–600 {isNl ? 'privé' : 'private'}</td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? 'Eerste-avond entertainment' : 'First-night entertainment'}</td>
                    <td className="px-4 py-3"><a href={withSubId(partners.gyg_phuket_yacht.partnerUrl, subId)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-thailand-red font-semibold hover:underline whitespace-nowrap">{isNl ? 'Bekijk →' : 'See deals →'}</a></td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3"><a href={withSubId(partners.viator_yacht_search.partnerUrl, subId)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="font-semibold text-thailand-blue hover:text-thailand-red hover:underline">{isNl ? 'Privé full-day yacht (8 pax)' : 'Private full-day yacht (8 pax)'}</a></td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? '8–10 uur' : '8–10 hours'}</td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">$500–1.500/{isNl ? 'dag' : 'day'}</td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? 'Familie, vriendengroep, vieringen' : 'Families, friend groups, celebrations'}</td>
                    <td className="px-4 py-3"><a href={withSubId(partners.viator_yacht_search.partnerUrl, subId)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-thailand-red font-semibold hover:underline whitespace-nowrap">{isNl ? 'Bekijk →' : 'See deals →'}</a></td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3"><a href={withSubId(partners.klook_luxury.partnerUrl, subId)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="font-semibold text-thailand-blue hover:text-thailand-red hover:underline">{isNl ? 'Liveaboard luxe (overnachting)' : 'Liveaboard luxury (overnight)'}</a></td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? '2–7 dagen' : '2–7 days'}</td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">$1.500–5.000/{isNl ? 'dag' : 'day'}</td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? 'Honeymoons, Similan-eilanden' : 'Honeymoons, Similan Islands'}</td>
                    <td className="px-4 py-3"><a href={withSubId(partners.klook_luxury.partnerUrl, subId)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-thailand-red font-semibold hover:underline whitespace-nowrap">{isNl ? 'Bekijk →' : 'See deals →'}</a></td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold text-gray-900">{isNl ? 'Crewed superyacht (40m+)' : 'Crewed superyacht (40m+)'}</td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? '3–14 dagen' : '3–14 days'}</td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">$10.000+/{isNl ? 'dag' : 'day'}</td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? 'Privacy, ontmoetingen, families van 12+' : 'Privacy, retreats, families of 12+'}</td>
                    <td className="px-4 py-3"><a href={withSubId(partners.viator_yacht_search.partnerUrl, subId)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-thailand-red font-semibold hover:underline whitespace-nowrap">{isNl ? 'Bekijk →' : 'See deals →'}</a></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-gray-500">{isNl ? 'Prijzen zijn typische 2026 hoogseizoen-tarieven (nov–apr). Mei–okt prijzen meestal 30–40% lager. Marine park fees en hoteltransfers vaak apart bij privé-charters.' : 'Prices are typical 2026 high-season rates (Nov–Apr). May–Oct usually 30–40% cheaper. Marine park fees and hotel transfers often extra on private charters.'}</p>
          </section>

          {/* Top pick callout */}
          <section className="rounded-2xl bg-thailand-red/5 border-2 border-thailand-red p-6">
            <span className="inline-block rounded-full bg-thailand-red text-white text-xs font-bold uppercase tracking-wide px-3 py-1 mb-3">⭐ {isNl ? 'Beste keuze voor de meesten' : 'Top pick for most'}</span>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Gedeelde catamaran-dagtocht via Klook of GetYourGuide' : 'Shared catamaran day trip via Klook or GetYourGuide'}</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              {isNl
                ? '90% van de reizigers heeft hier het meest aan: 8–10 mensen, full-day naar Phi Phi of Coral Island, lunch + drinks + snorkel + transfer inbegrepen. $80–150 pp, 6–8 uur op het water. Klook en GetYourGuide laten dezelfde operators zien voor vergelijkbare prijzen — boek waar de reviews het sterkst zijn.'
                : "For 90% of travelers this is the right call: 8–10 guests, full-day to Phi Phi or Coral Island, lunch + drinks + snorkel + transfer included. $80–150 pp for 6–8 hours on the water. Klook and GetYourGuide list the same operators at similar prices — book wherever reviews look strongest."}
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={withSubId(partners.klook_catamaran.partnerUrl, subId)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">
                {isNl ? 'Catamaran op Klook' : 'Catamaran on Klook'} →
              </a>
              <a href={withSubId(partners.gyg_phuket_yacht.partnerUrl, subId)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center rounded-full bg-[#1B9E3E] text-white px-5 py-2 text-sm font-semibold hover:bg-[#157a30]">
                {isNl ? 'Catamaran op GetYourGuide' : 'Catamaran on GetYourGuide'} →
              </a>
            </div>
          </section>

          {/* Marinas section */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Vanuit welke jachthaven?' : 'Which marina to depart from?'}</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="rounded-2xl bg-white p-5 shadow-sm border-l-4 border-green-500">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">Yacht Haven Marina</h3>
                <p className="text-xs text-green-700 font-semibold mb-2">{isNl ? '👍 Grootste keuze' : '👍 Biggest selection'}</p>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? 'Noordoostkust, 24+ charter operators, beste range van budget-catamaran tot superyacht. ~1u rijden vanaf Patong/Karon.' : 'North-east coast, 24+ charter operators, best range from budget catamaran to superyacht. ~1h drive from Patong/Karon.'}</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border-l-4 border-blue-500">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">Royal Phuket Marina</h3>
                <p className="text-xs text-blue-700 font-semibold mb-2">{isNl ? '🔵 Dichtst bij hotels' : '🔵 Closest to hotels'}</p>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? 'Centraal oostkust, 45 min rijden vanaf Patong/Karon. Family-friendly faciliteiten, sterke beachfront restaurants. Kleinere fleet maar betere reistijd.' : 'Central east coast, 45 min drive from Patong/Karon. Family-friendly facilities, strong beachfront restaurants. Smaller fleet but better travel time.'}</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border-l-4 border-amber-500">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">Ao Po Grand Marina</h3>
                <p className="text-xs text-amber-700 font-semibold mb-2">{isNl ? '⚠️ Voor superyachts' : '⚠️ For superyachts'}</p>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? 'Noordkust, langste rit (1u15 vanaf Patong) maar enige marina die 50m+ superyachts huisvest. Voor luxe charter ($10.000+/dag) — anders sla je hier voorbij.' : 'North coast, longest drive (1h15 from Patong) but only marina hosting 50m+ superyachts. For luxury charter ($10,000+/day) — otherwise skip.'}</p>
              </div>
            </div>
          </section>

          {/* Buyer's guide */}
          <section className="rounded-2xl bg-amber-50 border border-amber-200 p-6">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Boekingstips' : 'Booking tips'}</h2>
            <ul className="space-y-3 text-gray-800">
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Boek hoogseizoen 2–4 weken vooruit' : 'Book high season 2–4 weeks ahead'}</strong>{isNl ? ': nov–apr verkopen populaire dagtochten 1 week vooruit. Buiten hoogseizoen lukt 2–3 dagen meestal.' : ': Nov–Apr popular day trips sell out 1 week out. Outside high season 2–3 days usually works.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Marine park fees apart' : 'Marine park fees are extra'}</strong>{isNl ? ': $30/persoon/dag voor Phi Phi National Park, lager elders. Bij gedeelde Klook/GYG-trips altijd inbegrepen, bij privé-charters meestal niet — vraag.' : ': $30/person/day for Phi Phi National Park, lower elsewhere. Always included on shared Klook/GYG trips; private charters usually NOT — ask.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Vergelijk Klook én GetYourGuide' : 'Compare Klook AND GetYourGuide'}</strong>{isNl ? ': vaak dezelfde operators, soms 10–25% prijsverschil voor identieke trip. Check beide, vooral bij gedeelde catamaran-trips.' : ": often the same operators, sometimes 10–25% price difference for identical trip. Check both, especially shared catamaran trips."}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Voor groepen ≥6: privé is goedkoper' : 'For groups of 6+: private is cheaper'}</strong>{isNl ? '. 8 mensen × $120 gedeeld = $960. Privé-yacht $700–1.000/dag voor 8 — vergelijkbaar of goedkoper, 100% controle over route.' : ". 8 people × $120 shared = $960. Private yacht $700–1,000/day for 8 — same or cheaper, 100% control over route."}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Vermijd jaarwisseling/Chinees Nieuwjaar' : 'Avoid New Year & Chinese New Year'}</strong>{isNl ? ': prijzen 2× normaal, alles overvol, motorjachten klagen vaker over Phi Phi crowds.' : ': prices 2× normal, everything packed, motor yacht trips complain more about Phi Phi crowds.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Liveaboard moet >1 nacht' : 'Liveaboard needs 2+ nights'}</strong>{isNl ? ': 1-nacht liveaboard kost meestal hetzelfde als 2 nachten — bedrijven willen niet voor 1 nacht uitvaren. 2 nachten optimaal voor Similans, 3+ voor Mergui.' : ": 1-night liveaboard usually costs the same as 2-night — operators won't sail for 1 night. 2 nights optimal for Similans, 3+ for Mergui Archipelago."}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Reisverzekering checken' : 'Check travel insurance'}</strong>{isNl ? ': boot-activiteiten kunnen onder "high-risk sports" vallen. Check je polis op snorkelen, watersporten, diepwater-activiteiten — vooral voor liveaboards.' : ': boat activities sometimes fall under "high-risk sports" exclusions. Check your policy for snorkeling, watersports, deep-water activities — especially for liveaboards.'}</span></li>
            </ul>
          </section>

          {/* Detailed tier sections */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Wat krijg je per prijsniveau?' : 'What you get at each price tier'}</h2>
            <div className="space-y-5">
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">{isNl ? '$80–200 — Gedeelde dagtocht' : '$80–200 — Shared day trip'}</h3>
                <p className="text-gray-700 leading-relaxed mb-3">{isNl ? 'De default voor solo-reizigers en koppels. 30–40 mensen op een 60ft+ catamaran of 50ft motorjacht, vaste route (Phi Phi het populairst), lunch + onbeperkt drinken (frisdrank/water/koffie/bier en wijn bij betere operators), snorkel- en duikuitrusting, kayak meestal, hotelpickup. Inkomende internationale park-fees ($30/dag) bij Klook/GYG ingebakken in prijs.' : 'The default for solo travelers and couples. 30–40 guests on a 60ft+ catamaran or 50ft motor yacht, fixed route (Phi Phi most popular), lunch + unlimited drinks (sodas/water/coffee/beer and wine on better operators), snorkel and dive gear, usually kayak, hotel transfer. National park fees ($30/day) baked into Klook/GYG price.'}</p>
                <a href={withSubId(partners.klook_catamaran.partnerUrl, subId)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center text-sm font-semibold text-thailand-red hover:underline">{isNl ? 'Bekijk gedeelde catamaran-trips →' : 'See shared catamaran trips →'}</a>
              </div>
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">{isNl ? '$500–1.500/dag — Privé-yacht (tot 8 gasten)' : '$500–1,500/day — Private yacht (up to 8 guests)'}</h3>
                <p className="text-gray-700 leading-relaxed mb-3">{isNl ? 'Voor families en vriendengroepen die 100% controle willen — eigen route, eigen tijdschema, eigen muziek. Tussen $500 en $1.500/dag afhankelijk van bootmaat en operator. Lunch en drinks meestal apart factureren ($30–50/persoon). Marine park-fees apart. Skipper inbegrepen. Kies een operator met 4.5+ Tripadvisor-rating, niet de absolute laagste prijs.' : "For families and friend groups wanting 100% control — own route, own schedule, own music. $500–1,500/day depending on boat size and operator. Lunch and drinks usually billed separately ($30–50/person). Marine park fees extra. Skipper included. Pick an operator with 4.5+ Tripadvisor rating, not the absolute lowest price."}</p>
                <a href={withSubId(partners.viator_daycruise.partnerUrl, subId)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center text-sm font-semibold text-thailand-red hover:underline">{isNl ? 'Bekijk privé-yachts op Viator →' : 'See private yachts on Viator →'}</a>
              </div>
              <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">{isNl ? '$1.500–5.000/dag — Liveaboard luxe' : '$1,500–5,000/day — Liveaboard luxury'}</h3>
                <p className="text-gray-700 leading-relaxed mb-3">{isNl ? 'Echt op zee leven 2–7 dagen, alle maaltijden + alcohol all-in. Uitstekend voor honeymoons en Similan/Surin-eilanden trips (alleen toegankelijk per liveaboard). Bemanning 4–6 mensen, eigen kapitein, kok, dive instructor. Boek 2–3 maanden vooruit voor hoogseizoen — beste boten zijn schaars.' : "Really live at sea for 2–7 days, all meals + alcohol included. Outstanding for honeymoons and Similan/Surin Islands trips (only accessible by liveaboard). Crew of 4–6, own captain, chef, dive instructor. Book 2–3 months ahead for high season — best boats are scarce."}</p>
                <a href={withSubId(partners.klook_luxury.partnerUrl, subId)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center text-sm font-semibold text-thailand-red hover:underline">{isNl ? 'Bekijk luxe yacht-charters →' : 'See luxury yacht charters →'}</a>
              </div>
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
            <h2 className="font-heading text-xl font-bold text-gray-900">{isNl ? 'Plan de rest van je Phuket trip' : 'Plan the rest of your Phuket trip'}</h2>
            <p className="mt-2 text-gray-700">{isNl ? 'Yacht charter is geboekt — nu de basis:' : 'Yacht charter sorted — now the basics:'}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/best-hotels/phuket/" className="rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">{isNl ? '🏨 Beste hotels in Phuket' : '🏨 Best hotels in Phuket'}</Link>
              <Link href="/flights-to-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '✈️ Vluchten naar Phuket' : '✈️ Flights to Phuket'}</Link>
              <Link href="/car-rental-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🚗 Auto huren naar de marina' : '🚗 Car rental to the marina'}</Link>
              <Link href="/where-to-stay/phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🗺️ Waar overnachten' : '🗺️ Where to stay'}</Link>
              <Link href="/city/phuket/" className="rounded-full bg-white text-gray-900 border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50">{isNl ? '📖 Phuket reisgids' : '📖 Phuket travel guide'}</Link>
              <a href={withSubId(KLOOK_GENERIC, subId)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">{isNl ? '🎟️ Andere Phuket activiteiten' : '🎟️ Other Phuket activities'}</a>
            </div>
          </section>

          {/* Methodology */}
          <section className="rounded-2xl bg-gray-50 border border-gray-200 p-6 text-sm text-gray-700">
            <h2 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? 'Hoe we vergeleken' : 'How we compared'}</h2>
            <p>{isNl ? 'Tarieven geverifieerd in mei 2026 op Klook, GetYourGuide, Viator en Trip.com voor early-juni 2026 boekingen vanuit Phuket. Marina-info gevalideerd via website van elke marina + recente Tripadvisor reviews. We verdienen commissie op boekingen via genoemde platforms — dit verandert niets aan de prijs of welke operators we noemen.' : "Rates verified May 2026 on Klook, GetYourGuide, Viator, and Trip.com for early-June 2026 bookings from Phuket. Marina info validated via each marina's website + recent Tripadvisor reviews. We earn a commission on bookings through the listed platforms — this never changes the price you pay or which operators we cover."}</p>
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
