import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import SEOHead from '../../../components/SEOHead';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { withSubId, KLOOK_GENERIC } from '../../../lib/affiliates';
import { useSubId } from '../../../lib/useSubId';

interface Partner { partnerUrl: string; label: string; }
interface Partners { trip_pillar: Partner; klook_pillar: Partner; gyg_pillar: Partner; viator_pillar: Partner; }
interface Props { partners: Partners; lastUpdated: string; }

export default function SurinPillar({ partners, lastUpdated }: Props) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const subId = useSubId();
  const placement = (p: string) => `${subId}-pseo-phuket-surin-pillar-${p}`;

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Phuket', href: '/city/phuket/' },
    { name: 'Surin Beach', href: '/phuket/surin/' },
  ];

  const seoTitle = isNl ? 'Surin Beach Phuket Thailand (2026): Luxe + Stil' : 'Surin Beach Phuket Thailand (2026): Luxury & Quiet Guide';
  const seoDescription = isNl
    ? 'Op zoek naar Surin Beach Phuket? Phuket\'s glossy strand-bestemming — boutique luxe, geen hawkers, $200–700 hotels. Eerlijke 2026 gids met top picks.'
    : 'Heading to Surin Beach Phuket? Phuket\'s polished beach destination — boutique luxury, no hawkers, $200–700 hotels. Honest 2026 guide with top picks.';
  const canonical = `https://go2-thailand.com${isNl ? '/nl' : ''}/phuket/surin/`;

  const breadcrumbJsonLd = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: breadcrumbs.map((b, i) => ({ '@type': 'ListItem', position: i + 1, name: b.name, item: `https://go2-thailand.com${isNl ? '/nl' : ''}${b.href}` })) };

  const faqEn = [
    { q: 'Where is Surin Beach Phuket?', a: 'On Phuket\'s west coast, between Kamala (south) and Bang Tao (north). 22 km from the airport (30 min taxi), 18 km from Patong (30 min). Smaller than its neighbours — about 800 m of crescent sand.' },
    { q: 'Is Surin Beach worth visiting?', a: 'Yes if you want polished beach culture without the Patong noise — Surin is where Phuket\'s wealthy holiday-makers go. Boutique resorts, designer hotels (Twinpalms, The Surin), upmarket beach clubs (Catch Beach Club is technically Bang Tao but reachable). Skip if you want budget options or visible Thai-village character.' },
    { q: 'How does Surin Beach Phuket Thailand differ from other beaches?', a: 'Smaller, glossier, more expensive. No vendor-stall lining the sand (since the 2014 beach clean-up), no parasol/lounger rentals beyond what hotels provide. Water is calm in dry season, can be rough in monsoon. The vibe is intentionally upmarket — not unfriendly, just curated.' },
    { q: 'Where should I stay near Surin Beach?', a: 'Twinpalms Phuket ($300–600, design icon), The Surin ($350–700, beachfront cottages), Surin Beach Hotel ($150–280 boutique). Bang Tao\'s Outrigger Surin Beach Resort ($160–320) is technically next-bay but uses "Surin" branding. Budget options are 1 km inland.' },
    { q: 'Can you swim at Surin Beach?', a: 'Yes Nov–Apr — calm gentle slope, lifeguards posted in high season. May–Oct: rougher water, occasional red flag days, undertow more pronounced than Bang Tao. Always respect the flag system. The middle of the bay is safest; both ends have submerged rocks at low tide.' },
    { q: 'Is Surin Beach Phuket Thailand good for families?', a: 'Less so than Kamala or Bang Tao. The hotels are couple-skewing, the beach is shorter, and there\'s less walkable family activity. Twinpalms welcomes families but the brand identity is design-led not kids-led. For families: Bang Tao or Kamala. For couples wanting Phuket polish: Surin.' },
    { q: 'How do I get to Surin Beach from Phuket Airport?', a: '22 km / 30 min by taxi ($18–22) — closer than Patong, Kata or Karon. Many Surin resorts include free transfer for stays of 3+ nights.' },
  ];

  const faqNl = [
    { q: 'Waar ligt Surin Beach Phuket?', a: "Aan Phuket's westkust, tussen Kamala (zuid) en Bang Tao (noord). 22 km van de luchthaven (30 min taxi), 18 km van Patong (30 min). Kleiner dan z\'n buren — ongeveer 800 m halve-cirkel zand." },
    { q: 'Is Surin Beach een bezoek waard?', a: "Ja als je gepolijste strandcultuur wilt zonder Patong-lawaai — Surin is waar Phuket's welgestelde vakantiegangers heen gaan. Boutique-resorts, design-hotels (Twinpalms, The Surin), upmarket beach clubs. Sla over als je budget-opties of zichtbaar Thais-dorps karakter wilt." },
    { q: 'Hoe verschilt Surin Beach Phuket Thailand van andere stranden?', a: 'Kleiner, glossier, duurder. Geen verkooptenten op het strand (sinds de 2014 schoonmaak), geen parasol/ligbedjes-huur buiten wat hotels bieden. Water is rustig in droogseizoen, kan ruw in moesson. Sfeer is bewust upmarket — niet onvriendelijk, gewoon gecureerd.' },
    { q: 'Waar moet ik blijven bij Surin Beach?', a: 'Twinpalms Phuket ($300–600, design-icoon), The Surin ($350–700, beachfront-bungalows), Surin Beach Hotel ($150–280 boutique). Bang Tao\'s Outrigger Surin Beach Resort ($160–320) is technisch volgende baai maar gebruikt "Surin" branding. Budget-opties zijn 1 km landinwaarts.' },
    { q: 'Kun je zwemmen bij Surin Beach?', a: 'Ja nov–apr — kalm, zachte glooiing, lifeguards in hoogseizoen. Mei–okt: ruwer water, soms rode vlaggen, sterkere onderstroom dan Bang Tao. Respecteer altijd het vlaggen-systeem. Midden van de baai is veiligst; beide uiteinden hebben verborgen rotsen bij eb.' },
    { q: 'Is Surin Beach Phuket Thailand goed voor families?', a: 'Minder dan Kamala of Bang Tao. De hotels zijn op koppels gericht, het strand korter, en er is minder loopbare familieactiviteit. Twinpalms verwelkomt families maar het merk is design-gericht niet kind-gericht. Voor families: Bang Tao of Kamala. Voor stellen die Phuket-polish willen: Surin.' },
    { q: 'Hoe kom ik naar Surin Beach vanaf Phuket Airport?', a: '22 km / 30 min met taxi ($18–22) — dichterbij dan Patong, Kata of Karon. Veel Surin-resorts hebben gratis transfer bij 3+ nachten.' },
  ];

  const faqList = isNl ? faqNl : faqEn;
  const faqJsonLd = { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqList.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) };

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
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-white/75">{isNl ? 'Phuket beach gids' : 'Phuket beach guide'}</p>
            <h1 className="font-heading text-3xl lg:text-5xl font-bold mt-2">{isNl ? 'Surin Beach Phuket Thailand: het stille luxe-strand tussen Kamala en Bang Tao' : 'Surin Beach Phuket Thailand: The Quiet Luxury Beach Between Kamala & Bang Tao'}</h1>
            <p className="mt-4 text-lg lg:text-xl max-w-3xl opacity-95">{isNl ? "Surin is wat Phuket's strand-cultuur is geworden voor reizigers met budget en zonder geduld voor hawkers. 800 m fijn zand, drie design-resorts, geen verkooptenten, en de stilste ondergaande zon van het hele eiland. Niet voor budget-reizigers of families — wel voor stellen die rustige luxe willen op de Andamanee zee." : "Surin is what Phuket\'s beach culture has become for travelers with budget and no patience for hawkers. 800 m of fine sand, three design-led resorts, zero vendor stalls, and the quietest sunset on the island. Not for budget travelers or families — but for couples wanting calm luxury on the Andaman."}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={withSubId(partners.trip_pillar.partnerUrl, placement('hero-trip'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-6 py-3 text-base font-semibold hover:bg-red-700 shadow-lg">{isNl ? 'Surin hotels op Trip.com' : 'Surin hotels on Trip.com'} →</a>
              <a href={withSubId(partners.klook_pillar.partnerUrl, placement('hero-klook'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-white text-thailand-blue border border-white/40 px-6 py-3 text-base font-semibold hover:bg-white/90">{isNl ? 'Activiteiten op Klook' : 'Activities on Klook'} →</a>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-xs opacity-90">
              <span>✔ 800 m {isNl ? 'strand' : 'beach'}</span>
              <span>✔ {isNl ? 'Geen verkooptenten' : 'No vendor stalls'}</span>
              <span>✔ {isNl ? 'Bijgewerkt' : 'Updated'} {new Date(lastUpdated).toLocaleDateString(isNl ? 'nl-NL' : 'en', { year: 'numeric', month: 'long' })}</span>
            </div>
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <section className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'In één oogopslag' : 'At a glance'}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Locatie' : 'Location'}</p><p className="mt-1 font-heading font-bold text-gray-900 text-lg">{isNl ? 'NW-Phuket, Kamala/Bang Tao' : 'NW Phuket, between Kamala/Bang Tao'}</p></div>
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Sfeer' : 'Vibe'}</p><p className="mt-1 font-heading font-bold text-gray-900 text-lg">{isNl ? 'Stille luxe' : 'Quiet luxury'}</p></div>
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Beste voor' : 'Best for'}</p><p className="mt-1 font-heading font-bold text-gray-900 text-lg">{isNl ? 'Stellen, design' : 'Couples, design'}</p></div>
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Prijsklasse' : 'Price tier'}</p><p className="mt-1 font-heading font-bold text-gray-900 text-lg">$150–700</p></div>
            </div>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Het strand & de gepolijste sfeer' : 'Beach character & polished vibe'}</h2>
            <p className="text-gray-700 leading-relaxed mb-3">{isNl ? "Surin Beach is sinds 2014 ingrijpend veranderd toen de regering alle 200+ informele strandrestaurants en verhuur-stalls verwijderde. Het resultaat is wat je nu ziet: 800 m fijn-wit zand zonder commerciële activiteit op het zand zelf — geen ligbedjes, geen massagestoeltjes, geen Thaise pannenkoek-vendors. Sommige bezoekers vinden het schoner en mooier; anderen missen het Thaise dorpkarakter." : "Surin Beach has changed substantially since 2014 when the government cleared all 200+ informal beach restaurants and rental stalls. The result is what you see today: 800 m of fine white sand with zero commercial activity on the sand itself — no loungers, no massage chairs, no Thai pancake vendors. Some visitors find it cleaner and prettier; others miss the Thai-village character."}</p>
            <p className="text-gray-700 leading-relaxed mb-3">{isNl ? "Het zwemwater is meestal rustig in droogseizoen (nov–apr), met een glooiend-zandige bodem en zelden rip-currents. In monsoon (mei–okt) is de zee ruwer en gaan de rode vlaggen vaker omhoog. Lifeguards zijn aanwezig 09:00–17:00 in hoogseizoen. Belangrijke noot: de stranduiteinden hebben verborgen rotsen bij laag tij — blijf in het midden van de baai." : "Swimming is calm in dry season (Nov–Apr), gently-sloping sand bottom, rare rip currents. In monsoon (May–Oct) the sea is rougher and red flags appear more often. Lifeguards on duty 09:00–17:00 in high season. Important: beach ends have submerged rocks at low tide — stay in the middle of the bay."}</p>
            <p className="text-gray-700 leading-relaxed">{isNl ? "Sfeer: gefocust op hotelgasten van de drie boutique-resorts. Niet onvriendelijk, gewoon ingetogen. Het dorp landinwaarts heeft een paar restaurants en cafés, maar niet de variatie van Patong of Kata. Voor avond-eten taxiën de meeste reizigers naar Boat Avenue (Bang Tao, 5 min)." : "Vibe: focused on guests of the three boutique resorts. Not unfriendly, just understated. The village inland has a handful of restaurants and cafés, but not the variety of Patong or Kata. For dinner most travelers taxi to Boat Avenue (Bang Tao, 5 min)."}</p>
          </section>

          <section className="rounded-2xl bg-thailand-red/5 border-2 border-thailand-red p-6">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Waar overnachten in Surin' : 'Where to stay in Surin'}</h2>
            <p className="text-gray-700 leading-relaxed mb-3">{isNl ? "Drie sterke beachfront-keuzes: Twinpalms Phuket ($300–600, design-iconen, Catch Beach Club nabij), The Surin ($350–700, traditionele bungalows met privé-tuintjes), Surin Beach Hotel ($150–280, kleinere boutique-keuze). Voor wat budget-vriendelijker: opties 500–800 m landinwaarts ($90–150) — niet beachfront maar dichtbij het strand." : "Three strong beachfront choices: Twinpalms Phuket ($300–600, design icon, Catch Beach Club nearby), The Surin ($350–700, traditional cottages with private gardens), Surin Beach Hotel ($150–280, smaller boutique pick). For more budget-friendly: options 500–800 m inland ($90–150) — not beachfront but close to it."}</p>
            <div className="flex flex-wrap gap-3">
              <a href={withSubId(partners.trip_pillar.partnerUrl, placement('wts'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">{isNl ? 'Live Surin tarieven' : 'Live Surin rates'} →</a>
              <Link href="/best-hotels/phuket/" className="inline-flex items-center rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏨 Alle Phuket hotels' : '🏨 All Phuket hotels'}</Link>
            </div>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Wat te doen bij Surin' : 'Things to do at Surin'}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100"><h3 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? 'Sunset op het strand' : 'Beach sunset'}</h3><p className="text-gray-700 text-sm leading-relaxed">{isNl ? "Surin's USP — westwaarts gericht, geen vendors, palmschaduw, perfect voor 17:30–18:30. Resort-bars serveren cocktails op het zand voor hotelgasten." : "Surin\'s USP — west-facing, no vendors, palm shade, perfect for 17:30–18:30. Resort bars serve cocktails on sand for guests."}</p></div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100"><h3 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? 'Catch Beach Club' : 'Catch Beach Club'}</h3><p className="text-gray-700 text-sm leading-relaxed">{isNl ? '5 min lopen noord (technisch Bang Tao) — DJ\'s, infinity-pool, ligbedjes met $40 minimum.' : "5 min walk north (technically Bang Tao) — DJs, infinity pool, loungers with $40 minimum."}</p></div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100"><h3 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? 'Phuket Old Town dagtocht' : 'Phuket Old Town day trip'}</h3><p className="text-gray-700 text-sm leading-relaxed">{isNl ? "30 min taxi naar Phuket Town — Sino-Portugese architectuur, gallerij-cafés, weekend-markt op zondag." : "30 min taxi to Phuket Town — Sino-Portuguese architecture, gallery cafés, weekend market on Sunday."}</p></div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100"><h3 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? 'Yacht charter' : 'Yacht charter'}</h3><p className="text-gray-700 text-sm leading-relaxed">{isNl ? 'Surin-hotels regelen privé-yacht charter naar Phi Phi of de Similans (mei–okt). Vertrek meestal vanaf Yacht Haven Marina (1u rijden).' : 'Surin hotels arrange private yacht charters to Phi Phi or the Similans (May–Oct). Most depart from Yacht Haven Marina (1h drive).'}</p></div>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href={withSubId(partners.gyg_pillar.partnerUrl, placement('todo-gyg'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-[#1B9E3E] text-white px-5 py-2 text-sm font-semibold hover:bg-[#157a30]">{isNl ? 'GetYourGuide trips' : 'GetYourGuide trips'} →</a>
              <a href={withSubId(partners.viator_pillar.partnerUrl, placement('todo-viator'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-white text-gray-900 border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50">Viator →</a>
              <Link href="/yacht-charter-phuket/" className="rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">{isNl ? '⛵ Yacht charter gids' : '⛵ Yacht charter guide'}</Link>
            </div>
          </section>

          <section className="rounded-2xl bg-amber-50 border border-amber-200 p-6">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Hoe kom je in Surin' : 'Getting to Surin'}</h2>
            <ul className="space-y-3 text-gray-800 text-sm">
              <li><strong>{isNl ? 'Vanaf Phuket Airport (HKT)' : 'From Phuket Airport (HKT)'}:</strong> {isNl ? '22 km, 30 min, taxi $18–22. Veel resorts gratis bij 3+ nachten.' : '22 km, 30 min, taxi $18–22. Many resorts free with 3+ nights.'}</li>
              <li><strong>{isNl ? 'Vanaf Patong' : 'From Patong'}:</strong> {isNl ? '18 km, 30 min, taxi $20–25 of songthaew $5–7.' : '18 km, 30 min, taxi $20–25 or songthaew $5–7.'}</li>
              <li><strong>{isNl ? 'Vanaf Kamala/Bang Tao' : 'From Kamala/Bang Tao'}:</strong> {isNl ? '3–4 km, 8 min, songthaew $3 of taxi $5.' : '3–4 km, 8 min, songthaew $3 or taxi $5.'}</li>
              <li><strong>{isNl ? 'Scooter' : 'Scooter'}:</strong> {isNl ? '$8–12/dag. Cliff-route vanaf Patong (mooi), 30 min. Internationaal rijbewijs verplicht.' : '$8–12/day. Cliff route from Patong (scenic), 30 min. International driving permit required.'}</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Wanneer naar Surin' : 'When to visit Surin'}</h2>
            <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-700"><tr>
                  <th className="text-left font-semibold px-4 py-3">{isNl ? 'Periode' : 'Period'}</th>
                  <th className="text-left font-semibold px-4 py-3">{isNl ? 'Weer' : 'Weather'}</th>
                  <th className="text-left font-semibold px-4 py-3">{isNl ? 'Zwemmen' : 'Swimming'}</th>
                  <th className="text-left font-semibold px-4 py-3">{isNl ? 'Hotel-prijs' : 'Hotel price'}</th>
                </tr></thead>
                <tbody className="divide-y divide-gray-100">
                  <tr><td className="px-4 py-3 font-semibold">Nov–Feb</td><td className="px-4 py-3">28–32°C, droog</td><td className="px-4 py-3">{isNl ? 'Uitstekend' : 'Excellent'}</td><td className="px-4 py-3">$$$ {isNl ? '(piek)' : '(peak)'}</td></tr>
                  <tr><td className="px-4 py-3 font-semibold">Mar–Apr</td><td className="px-4 py-3">30–34°C, droog</td><td className="px-4 py-3">{isNl ? 'Uitstekend' : 'Excellent'}</td><td className="px-4 py-3">$$ {isNl ? '(value)' : '(value)'}</td></tr>
                  <tr><td className="px-4 py-3 font-semibold">May–Jun</td><td className="px-4 py-3">29–31°C, regen</td><td className="px-4 py-3">{isNl ? 'OK overdag' : 'OK midday'}</td><td className="px-4 py-3">$ {isNl ? '(laag)' : '(low)'}</td></tr>
                  <tr><td className="px-4 py-3 font-semibold">Jul–Sep</td><td className="px-4 py-3">28–30°C, regen</td><td className="px-4 py-3">{isNl ? 'Vaak rood' : 'Often red flag'}</td><td className="px-4 py-3">$ {isNl ? '(laag)' : '(low)'}</td></tr>
                  <tr><td className="px-4 py-3 font-semibold">Oct</td><td className="px-4 py-3">28–30°C, natste</td><td className="px-4 py-3">{isNl ? 'Risico' : 'Risky'}</td><td className="px-4 py-3">$ {isNl ? '(laag)' : '(low)'}</td></tr>
                </tbody>
              </table>
            </div>
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
            <h2 className="font-heading text-xl font-bold text-gray-900">{isNl ? 'Plan de rest van je Phuket-trip' : 'Plan the rest of your Phuket trip'}</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/phuket/bang-tao/" className="rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">{isNl ? '🏝️ Bang Tao naast Surin' : '🏝️ Bang Tao next door'}</Link>
              <Link href="/phuket/kamala/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏝️ Kamala' : '🏝️ Kamala'}</Link>
              <Link href="/phuket/kata/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏝️ Kata' : '🏝️ Kata'}</Link>
              <Link href="/best-hotels/phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏨 Alle Phuket hotels' : '🏨 All Phuket hotels'}</Link>
              <Link href="/yacht-charter-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '⛵ Yacht charter' : '⛵ Yacht charter'}</Link>
              <Link href="/city/phuket/" className="rounded-full bg-white text-gray-900 border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50">{isNl ? '📖 Phuket reisgids' : '📖 Phuket travel guide'}</Link>
              <a href={withSubId(KLOOK_GENERIC, placement('mesh-klook'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">{isNl ? '🎟️ Andere activiteiten' : '🎟️ Other activities'}</a>
            </div>
          </section>

          <section className="rounded-2xl bg-gray-50 border border-gray-200 p-6 text-sm text-gray-700">
            <h2 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? 'Hoe we Surin beoordelen' : 'How we evaluate Surin'}</h2>
            <p>{isNl ? 'Tarieven en hotelinformatie geverifieerd in mei 2026 op Trip.com, Klook, GetYourGuide en Viator. Strand-condities op basis van DNP-data 2020–2025. Hotelfeedback gevalideerd via Tripadvisor + lokale agent-reviews.' : 'Rates and hotel info verified May 2026 on Trip.com, Klook, GetYourGuide and Viator. Beach conditions from DNP data 2020–2025. Hotel feedback validated via Tripadvisor + local agent reviews.'}</p>
          </section>
        </main>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const file = path.join(process.cwd(), 'data', 'pseo', 'areas', 'surin-partners.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  return { props: { partners: data.partners, lastUpdated: data.lastUpdated }, revalidate: 604800 };
};
