import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import { withSubId, KLOOK_GENERIC, GYG_GENERIC } from '../../lib/affiliates';
import { useSubId } from '../../lib/useSubId';

interface PartnerEntry { partnerUrl: string; label?: string }
interface Partners {
  trip_luxury_honeymoon: PartnerEntry;
  trip_wedding_venue: PartnerEntry;
  trip_honeymoon_resort: PartnerEntry;
  trip_pool_villa: PartnerEntry;
  trip_all_inclusive: PartnerEntry;
  trip_beach_resort: PartnerEntry;
  klook_honeymoon: PartnerEntry;
  klook_sunset_couples: PartnerEntry;
  klook_couples_spa: PartnerEntry;
  klook_phi_phi_private: PartnerEntry;
  gyg_phuket_couples: PartnerEntry;
  gyg_phuket_romantic: PartnerEntry;
  viator_honeymoon: PartnerEntry;
  viator_private_tour: PartnerEntry;
  gyg_yacht_sunset?: PartnerEntry;
  klook_luxury_yacht?: PartnerEntry;
}

interface Props { partners: Partners; lastUpdated: string }

export default function PhuketHoneymoonPillar({ partners, lastUpdated }: Props) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const subId = useSubId();
  const placement = (slot: string) => `${subId}-pseo-phuket-honeymoon-${slot}`;

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: isNl ? 'Phuket honeymoon' : 'Phuket Honeymoon', href: '/phuket-honeymoon/' },
  ];

  // Title <60, keyword first, modifier
  const seoTitle = isNl
    ? 'Phuket Honeymoon (2026): 8 Beste Resorts + Pakketten' // 51
    : 'Phuket Honeymoon (2026): 8 Best Resorts + Packages';  // 50

  // Meta <155, question hook
  const seoDescription = isNl
    ? 'Phuket honeymoon plannen? Vergelijk 8 luxe-resorts (Trisara, Amanpuri, Banyan Tree), pool-villas, all-inclusive deals + romantische activiteiten.'
    : 'Planning a Phuket honeymoon? Compare 8 luxury resorts (Trisara, Amanpuri, Banyan Tree), pool villas, all-inclusive packages + romantic activities.';

  const canonical = `https://go2-thailand.com${isNl ? '/nl' : ''}/phuket-honeymoon/`;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, i) => ({
      '@type': 'ListItem', position: i + 1, name: b.name,
      item: `https://go2-thailand.com${isNl ? '/nl' : ''}${b.href}`,
    })),
  };

  const faqEn = [
    { q: 'How many days do you need for a Phuket honeymoon?',
      a: 'Sweet spot is 7–10 nights: 4–5 nights in one luxury Phuket resort to decompress, then 3–5 nights island-hopping (Koh Phi Phi, Krabi, or a Similan liveaboard November–April). For shorter trips, 5 nights all in one resort still works, but you miss the islands. Allow 2 jet-lag days at start if flying long-haul — book Surin or Bang Tao for arrival, save Mai Khao quiet for the end.' },
    { q: 'Surin, Bang Tao, Mai Khao, or Cape Panwa — which area for a honeymoon?',
      a: 'Surin (north-west) — luxe + walkable beach (Trisara, Amanpuri, The Surin), the most "honeymoon" of all areas. Bang Tao — bigger resorts, lagoon villas (Banyan Tree, JW Marriott Mai Khao), wider price range, slightly less private. Mai Khao (north) — quietest, longest beach, best for couples wanting zero crowds (Anantara, Renaissance). Cape Panwa (south-east) — sunset cliffside (Sri Panwa, Cape Yamu), short ride to Phuket Town. Best overall: Surin for first-timers, Mai Khao for second-time visitors.' },
    { q: 'How much does a luxury Phuket honeymoon actually cost?',
      a: '7-night honeymoon real-world 2026 numbers: comfortable 4-star pool villa $1,800–3,500 total. Mid-tier luxury (Banyan Tree, The Slate, Anantara) $4,500–8,500 total. Top-tier luxury (Trisara, Amanpuri, Sri Panwa, Aman) $12,000–35,000 total. Add $500–1,500 for activities (sunset cruise, couples spa, private Phi Phi). All-inclusive packages add 30–40% on top of room rate but include all meals + drinks.' },
    { q: 'Is Phuket better than Bali or Maldives for a honeymoon?',
      a: 'Phuket vs Bali — Phuket has cleaner beaches, less traffic outside Patong, better English, more luxury-resort variety; Bali has stronger jungle/cultural mix and yoga scene. Phuket vs Maldives — Maldives wins on overwater bungalows and total seclusion; Phuket wins on price (50–70% cheaper for similar resort tier), longer-haul activities (sailing, diving, day trips to Phi Phi), and food variety. For 7+ nights honeymoon: Phuket usually beats Maldives on cost-per-experience.' },
    { q: 'Do Phuket honeymoon resorts give us perks if we mention it?',
      a: 'Yes — every luxury resort here treats honeymoons as a first-class segment. Mention it at booking and confirm it on arrival; expect: room upgrade (subject to availability), in-room flowers + champagne, private breakfast on the villa terrace, late checkout, a complimentary couples experience (spa-trial, beach picnic). Trisara, Amanpuri, Banyan Tree and Sri Panwa go further with custom honeymoon packages. Booking via Trip.com or direct: ask for "honeymoon perks" — never an extra cost.' },
    { q: 'Best month for a Phuket honeymoon?',
      a: 'November to early April is dry season — calm Andaman Sea, 28–32°C, best for outdoor dining + sunset photos. Avoid late September (worst weather of year), peak rainy August. Best value windows: late November (start of high season but pre-Christmas pricing) and April (last week of high season + Songkran festival energy). For Similan/Surin diving honeymoon: November to April only.' },
    { q: 'Can we combine the wedding + honeymoon in Phuket?',
      a: 'Yes, and many couples do — get married at Sri Panwa, Trisara, Amanpuri or Banyan Tree (see our wedding venues guide), spend 3 nights with the bridal party, then move to a quieter resort like Andara or Anantara Mai Khao for the honeymoon proper. Or stay at the same property — most luxury resorts have a "wedding rate" for the bridal party villa and a separate "honeymoon rate" for the couple. Saves on flights and visa hassle vs flying somewhere else after.' },
  ];

  const faqNl = [
    { q: 'Hoeveel dagen heb je nodig voor een Phuket-honeymoon?',
      a: 'Sweet spot is 7–10 nachten: 4–5 nachten in één luxe Phuket-resort om te decomprimeren, dan 3–5 nachten eilandhoppen (Koh Phi Phi, Krabi, of een Similan-liveaboard nov–apr). Voor kortere trips werkt 5 nachten in één resort ook, maar je mist de eilanden. Reken op 2 jetlag-dagen bij start als je lang vliegt — boek Surin of Bang Tao voor aankomst, hou Mai Khao stil voor het einde.' },
    { q: 'Surin, Bang Tao, Mai Khao of Cape Panwa — welk gebied voor honeymoon?',
      a: 'Surin (noordwest) — luxe + wandelbaar strand (Trisara, Amanpuri, The Surin), het meest "honeymoon" van alle gebieden. Bang Tao — grotere resorts, lagune-villas (Banyan Tree, JW Marriott Mai Khao), bredere prijsrange, iets minder privé. Mai Khao (noord) — rustigst, langst strand, beste voor stellen die geen drukte willen (Anantara, Renaissance). Cape Panwa (zuidoost) — sunset cliffside (Sri Panwa, Cape Yamu), korte rit naar Phuket Town. Beste overall: Surin voor eerste keer, Mai Khao voor tweede bezoek.' },
    { q: 'Wat kost een luxe Phuket-honeymoon écht?',
      a: '7-nachten honeymoon 2026: comfortabel 4-sterren pool-villa $1.800–3.500 totaal. Mid-tier luxe (Banyan Tree, The Slate, Anantara) $4.500–8.500 totaal. Top-tier luxe (Trisara, Amanpuri, Sri Panwa, Aman) $12.000–35.000 totaal. Plus $500–1.500 voor activiteiten (sunset cruise, koppels-spa, privé Phi Phi). All-inclusive 30–40% bovenop kamerprijs maar inclusief alle maaltijden + drinks.' },
    { q: 'Is Phuket beter dan Bali of Malediven voor honeymoon?',
      a: 'Phuket vs Bali — Phuket heeft schonere stranden, minder verkeer buiten Patong, beter Engels, meer luxe-resort-variatie; Bali heeft sterkere jungle/cultuur-mix en yoga-scene. Phuket vs Malediven — Malediven wint op overwater-bungalows en totale isolatie; Phuket wint op prijs (50–70% goedkoper voor zelfde resort-niveau), uitgebreidere activiteiten (zeilen, duiken, dagtochten naar Phi Phi), en eten. Voor 7+ nachten: Phuket meestal beter qua kosten/ervaring.' },
    { q: 'Krijgen we perks als we de honeymoon vermelden?',
      a: 'Ja — elk luxe-resort hier behandelt honeymoons als premium segment. Vermeld het bij boeking en bevestig bij aankomst; verwacht: kamer-upgrade (afhankelijk van beschikbaarheid), bloemen + champagne in de kamer, privé ontbijt op het villa-terras, late check-out, gratis koppel-experience (spa-trial, strand-picknick). Trisara, Amanpuri, Banyan Tree en Sri Panwa hebben aparte honeymoon-pakketten. Boek via Trip.com of direct: vraag om "honeymoon perks" — nooit extra kosten.' },
    { q: 'Beste maand voor Phuket-honeymoon?',
      a: 'November tot begin april is droog seizoen — rustige Andamanzee, 28–32°C, beste voor buiten-dineren en sunset-fotos. Vermijd eind september (slechtste weer van het jaar), piek-augustus. Beste value-windows: laat-november (start hoogseizoen, vóór Kerst-toeslag) en april (laatste week hoogseizoen + Songkran-festival). Voor Similan/Surin duik-honeymoon: alleen nov–apr.' },
    { q: 'Kunnen we de bruiloft + honeymoon in Phuket combineren?',
      a: 'Ja, en veel stellen doen dit — trouw bij Sri Panwa, Trisara, Amanpuri of Banyan Tree (zie onze trouwlocaties-gids), 3 nachten met bruidsgezelschap, dan naar een rustiger resort als Andara of Anantara Mai Khao voor de honeymoon zelf. Of blijf in hetzelfde resort — de meeste luxe-resorts hebben een "wedding rate" voor de bruidsgezelschap-villa en een aparte "honeymoon rate" voor het stel. Bespaart op vluchten en visa-gedoe vs ergens anders heen vliegen.' },
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
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-white/75">{isNl ? 'Phuket honeymoon-gids' : 'Phuket honeymoon guide'}</p>
            {/* H1 different from title + secondary keyword */}
            <h1 className="font-heading text-3xl lg:text-5xl font-bold mt-2">
              {isNl
                ? 'De beste Phuket honeymoon: 8 luxe-resorts + pool-villas vergeleken'
                : 'Best Phuket Honeymoon: 8 Luxury Resorts + Pool Villas Compared'}
            </h1>
            <p className="mt-4 text-lg lg:text-xl max-w-3xl opacity-95">
              {isNl
                ? "Phuket is Azië's #1 honeymoon-bestemming buiten de Malediven — voor een derde van de prijs. Hier vind je 8 resorts die je écht zou boeken (van $1.800 voor 7 nachten tot $35.000 villa-takeovers), welk gebied past (Surin, Bang Tao, Mai Khao, Cape Panwa), en welke activiteiten je trip onvergetelijk maken."
                : "Phuket is Asia's #1 honeymoon destination outside the Maldives — at a third of the price. Here are 8 resorts we would actually book (from $1,800 for 7 nights to $35,000 villa takeovers), which area fits (Surin, Bang Tao, Mai Khao, Cape Panwa), and which activities make the trip unforgettable."}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={withSubId(partners.trip_luxury_honeymoon.partnerUrl, placement('hero-trip'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-6 py-3 text-base font-semibold hover:bg-red-700 shadow-lg">
                {isNl ? 'Bekijk honeymoon-resorts op Trip.com' : 'See honeymoon resorts on Trip.com'} →
              </a>
              <a href={withSubId(partners.trip_pool_villa.partnerUrl, placement('hero-villa'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-white text-thailand-blue border border-white/40 px-6 py-3 text-base font-semibold hover:bg-white/90">
                {isNl ? 'Pool-villas vergelijken' : 'Compare pool villas'} →
              </a>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-xs opacity-90">
              <span>✔ 8 {isNl ? 'resorts vergeleken' : 'resorts compared'}</span>
              <span>✔ {isNl ? 'Per gebied + maand' : 'By area + month'}</span>
              <span>✔ {isNl ? 'Bijgewerkt' : 'Updated'} {new Date(lastUpdated).toLocaleDateString(isNl ? 'nl-NL' : 'en', { year: 'numeric', month: 'long' })}</span>
            </div>
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          {/* Comparison table — 8 honeymoon resorts */}
          <section id="comparison">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-2">{isNl ? '8 honeymoon-resorts in Phuket vergeleken' : '8 Phuket honeymoon resorts compared'}</h2>
            <p className="text-gray-600 mb-6">{isNl ? 'Klik om live tarieven en honeymoon-perks te zien (we verdienen een kleine commissie zonder dat het jou iets extra kost).' : 'Click to see live rates and honeymoon perks (we earn a small commission at no extra cost to you).'}</p>
            <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Resort' : 'Resort'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Gebied' : 'Area'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Stijl' : 'Style'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Prijs/nacht' : 'Price/night'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Boek' : 'Book'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { name: 'Trisara', area: 'Layan/Surin', style: isNl ? 'Pool-villa, beachfront' : 'Pool villa, beachfront', price: '$1,200–3,500' },
                    { name: 'Amanpuri', area: 'Pansea Beach', style: isNl ? 'Iconic luxe, privé strand' : 'Iconic luxury, private beach', price: '$1,500–4,500' },
                    { name: 'Sri Panwa', area: 'Cape Panwa', style: isNl ? 'Cliffside pool-villa' : 'Cliffside pool villa', price: '$700–2,500' },
                    { name: 'Banyan Tree', area: 'Bang Tao', style: isNl ? 'Lagune-villa, spa-resort' : 'Lagoon villa, spa resort', price: '$500–1,800' },
                    { name: 'The Slate', area: 'Nai Yang', style: isNl ? 'Boutique tin-mine design' : 'Boutique tin-mine design', price: '$300–700' },
                    { name: 'JW Marriott Mai Khao', area: 'Mai Khao', style: isNl ? 'Resort-stijl, lange beach' : 'Resort-style, long beach', price: '$350–800' },
                    { name: 'Anantara Mai Khao', area: 'Mai Khao', style: isNl ? 'Pool-villa, rustig' : 'Pool villa, quiet', price: '$450–1,200' },
                    { name: 'Andara Resort', area: 'Kamala', style: isNl ? 'Privé-villa takeover' : 'Private villa takeover', price: '$800–2,800' },
                  ].map((r, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-semibold text-gray-900">
                        <a href={withSubId(partners.trip_luxury_honeymoon.partnerUrl, placement(`table-${i}`))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-thailand-blue hover:text-thailand-red hover:underline">{r.name}</a>
                      </td>
                      <td className="px-4 py-3 text-gray-700">{r.area}</td>
                      <td className="px-4 py-3 text-gray-700">{r.style}</td>
                      <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{r.price}</td>
                      <td className="px-4 py-3"><a href={withSubId(partners.trip_luxury_honeymoon.partnerUrl, placement(`table-cta-${i}`))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-thailand-red font-semibold hover:underline whitespace-nowrap">{isNl ? 'Bekijk →' : 'See deals →'}</a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-gray-500">{isNl ? 'Prijzen zijn 2026 hoogseizoen-tarieven (nov–feb) per nacht voor 2 personen. Buiten hoogseizoen 30–40% lager. Honeymoon-perks (champagne, bloemen, upgrade) gratis bij vermelding bij boeking.' : 'Prices are 2026 high-season rates (Nov–Feb) per night for 2 guests. Outside high season 30–40% cheaper. Honeymoon perks (champagne, flowers, upgrade) free when mentioned at booking.'}</p>
          </section>

          {/* Top pick callout */}
          <section className="rounded-2xl bg-thailand-red/5 border-2 border-thailand-red p-6">
            <span className="inline-block rounded-full bg-thailand-red text-white text-xs font-bold uppercase tracking-wide px-3 py-1 mb-3">⭐ {isNl ? 'Beste keuze voor de meesten' : 'Top pick for most'}</span>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Trisara — pool-villa met privé strand-toegang' : 'Trisara — pool villa with private beach access'}</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              {isNl
                ? 'Voor 80% van internationale honeymoon-stellen tussen $2K–5K per nacht: 39 individuele pool-villas verspreid over een privé baai bij Layan, eigen koksdienst-optie, beachfront restaurant met onder de top 3 in Phuket. Honeymoon-pakket: champagne + bloemen, privé ontbijt op terras, gratis Andamanzee sunset cruise voor 2 (45 min). Boek 4–6 maanden vooruit voor laat-november/maart.'
                : "For 80% of international honeymoon couples in the $2K–5K/night bracket: 39 individual pool villas spread across a private bay near Layan, optional in-villa chef, beachfront restaurant ranked top 3 in Phuket. Honeymoon package: champagne + flowers, private breakfast on terrace, complimentary 45-min Andaman Sea sunset cruise for 2. Book 4–6 months ahead for late-November/March."}
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={withSubId(partners.trip_luxury_honeymoon.partnerUrl, placement('toppick-trip'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">
                {isNl ? 'Bekijk Trisara op Trip.com' : 'See Trisara on Trip.com'} →
              </a>
              <a href={withSubId(partners.trip_pool_villa.partnerUrl, placement('toppick-villa'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">
                {isNl ? 'Andere pool-villas' : 'Other pool villas'} →
              </a>
            </div>
          </section>

          {/* Areas section */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? '4 honeymoon-gebieden in Phuket — welke past?' : '4 honeymoon areas in Phuket — which fits?'}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white p-5 shadow-sm border-l-4 border-pink-500">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? '💕 Surin & Pansea' : '💕 Surin & Pansea'}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? 'Het meest "honeymoon" gebied. Trisara, Amanpuri, The Surin allemaal in een 5km strook. Privé-stranden, walkable boutique restaurants, golden-hour magie. Beste voor eerste-keer-Phuket honeymooners.' : 'The most "honeymoon" area. Trisara, Amanpuri, The Surin all within a 5km stretch. Private beaches, walkable boutique restaurants, golden-hour magic. Best for first-time-Phuket honeymooners.'}</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border-l-4 border-blue-500">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? '🏖️ Bang Tao & Layan' : '🏖️ Bang Tao & Layan'}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? 'Grootste resort-keuze (Banyan Tree, JW Marriott, Outrigger Laguna). Lagune-villas met privé eilandjes, brede prijsrange ($300–1.800/nacht). Iets minder afgesloten dan Surin maar veel restaurant-opties.' : 'Biggest resort selection (Banyan Tree, JW Marriott, Outrigger Laguna). Lagoon villas with private islets, wide price range ($300–1,800/night). Slightly less secluded than Surin but many restaurant options.'}</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border-l-4 border-green-500">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? '🌅 Mai Khao' : '🌅 Mai Khao'}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? 'Rustigste gebied — 11 km onbebouwd strand grenzend aan Sirinat National Park. Anantara, Renaissance, JW Marriott. Voor stellen die zero crowds willen + bereid zijn 25 min naar Phuket Town te rijden voor uit-eten.' : 'Quietest area — 11 km of undeveloped beach next to Sirinat National Park. Anantara, Renaissance, JW Marriott. For couples who want zero crowds + are willing to drive 25 min to Phuket Town for dining out.'}</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border-l-4 border-amber-500">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? '🌇 Cape Panwa & Cape Yamu' : '🌇 Cape Panwa & Cape Yamu'}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? 'Sunset-cliffside aan oostkust — Sri Panwa, Cape Yamu. Korte rit (15 min) naar Phuket Town voor Old Town strolling. Beste voor stellen die luxe + nightlife/cultuur balans willen, niet pure isolation.' : 'Sunset cliffside east coast — Sri Panwa, Cape Yamu. Short drive (15 min) to Phuket Town for Old Town strolling. Best for couples wanting luxury + nightlife/culture balance, not pure isolation.'}</p>
              </div>
            </div>
          </section>

          {/* Couples activities — affiliate-driven booking flow */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? '5 romantische activiteiten — vooraf boeken' : '5 romantic activities — book ahead'}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">🌅 {isNl ? 'Sunset cruise voor 2' : 'Sunset cruise for 2'}</h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">{isNl ? 'Privé-catamaran of motorjacht 2,5 uur, lemong-grass cocktails, lichte tapas-style maaltijd. Vertrek 16:30 vanuit Yacht Haven of Royal Phuket Marina. $200–600 privé voor 2 — perfect honeymoon-night. Of $40–80 pp gedeeld.' : 'Private catamaran or motor yacht for 2.5 hours, lemongrass cocktails, light tapas-style meal. Departs 16:30 from Yacht Haven or Royal Phuket Marina. $200–600 private for 2 — perfect honeymoon-night activity. Or $40–80 pp shared.'}</p>
                <a href={withSubId(partners.klook_sunset_couples.partnerUrl, placement('activity-sunset'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center text-sm font-semibold text-thailand-red hover:underline">{isNl ? 'Boek sunset cruise op Klook →' : 'Book sunset cruise on Klook →'}</a>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">💆 {isNl ? 'Couples spa-dag' : 'Couples spa day'}</h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">{isNl ? 'Banyan Tree Spa, COMO Shambhala, Trisara Jiva — alle drie 2,5–4u packages voor stellen ($250–800 voor 2). Inclusief ritueel-bad, massage, gezichtsbehandeling, fruit + thee. Boek 7–14 dagen vooruit voor weekenden.' : 'Banyan Tree Spa, COMO Shambhala, Trisara Jiva — all three 2.5–4h couples packages ($250–800 for 2). Includes ritual bath, massage, facial, fruit + tea. Book 7–14 days ahead for weekends.'}</p>
                <a href={withSubId(partners.klook_couples_spa.partnerUrl, placement('activity-spa'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center text-sm font-semibold text-thailand-red hover:underline">{isNl ? 'Boek couples spa op Klook →' : 'Book couples spa on Klook →'}</a>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">🏝️ {isNl ? 'Privé Phi Phi day-charter' : 'Private Phi Phi day charter'}</h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">{isNl ? 'Eigen boot voor 2 — Maya Bay zonder de massa, Pileh Lagoon snorkelen, lunch in een stille baai. $500–1.200 voor het hele jacht (privé voor 2 gasten gevoelt extreem speciaal). Vroeg vertrek (07:00) vermijdt de toeristen-floods.' : "Your own boat for 2 — Maya Bay without crowds, Pileh Lagoon snorkeling, lunch in a quiet cove. $500–1,200 for the whole yacht (private for 2 feels extreme special). Early departure (07:00) avoids the tourist flood."}</p>
                <a href={withSubId(partners.klook_phi_phi_private.partnerUrl, placement('activity-phi-phi'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center text-sm font-semibold text-thailand-red hover:underline">{isNl ? 'Boek privé Phi Phi tour →' : 'Book private Phi Phi tour →'}</a>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">🍷 {isNl ? 'Romantisch dineren' : 'Romantic dining experiences'}</h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">{isNl ? 'Baba Nest (Sri Panwa) sunset rooftop cocktails. PRU (Trisara) — Phuket\'s enige Michelin-ster restaurant. Mom Tri\'s Kitchen (Kata) — cliffside fine-dining. Reserveer 5–10 dagen vooruit voor weekend-tafels.' : 'Baba Nest (Sri Panwa) sunset rooftop cocktails. PRU (Trisara) — Phuket\'s only Michelin-starred restaurant. Mom Tri\'s Kitchen (Kata) — cliffside fine dining. Reserve 5–10 days ahead for weekend tables.'}</p>
                <a href={withSubId(partners.gyg_phuket_romantic.partnerUrl, placement('activity-dining'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center text-sm font-semibold text-thailand-red hover:underline">{isNl ? 'Romantisch dineren op GYG →' : 'Romantic dining on GYG →'}</a>
              </div>
            </div>
          </section>

          {/* Buyer's guide */}
          <section className="rounded-2xl bg-amber-50 border border-amber-200 p-6">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Boekingstips voor je Phuket-honeymoon' : 'Booking tips for your Phuket honeymoon'}</h2>
            <ul className="space-y-3 text-gray-800">
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Vermeld "honeymoon" bij élke boeking' : 'Mention "honeymoon" on every booking'}</strong>{isNl ? '. Resorts geven gratis upgrades, champagne, bloemen, late check-out. Je betaalt nooit extra.' : '. Resorts give free upgrades, champagne, flowers, late check-out. Never an extra cost.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Boek 4–6 maanden vooruit voor hoogseizoen' : 'Book 4–6 months ahead for high season'}</strong>{isNl ? ': Trisara, Amanpuri, Sri Panwa zit voor nov–feb 90+ dagen vooruit op slot.' : ': Trisara, Amanpuri, Sri Panwa book out 90+ days ahead Nov–Feb.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Vergelijk pakket vs los boeken' : 'Compare package vs separate'}</strong>{isNl ? ': all-inclusive scheelt $30–50/pp/dag bij meer dan 5 nachten — maar beperkt restaurant-keuze. Voor foodies: los boeken wint.' : ': all-inclusive saves $30–50/pp/day past 5 nights — but limits restaurant variety. For foodies: separate wins.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Activiteiten 2 weken vooruit boeken' : 'Book activities 2 weeks ahead'}</strong>{isNl ? ': sunset cruise privé, couples spa, privé Phi Phi-charter — high-demand voor weekenden in hoogseizoen.' : ': private sunset cruise, couples spa, private Phi Phi charter — high demand on high-season weekends.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Verdeel je verblijf 4+3 of 5+2' : 'Split stay 4+3 or 5+2'}</strong>{isNl ? '. Eerste deel rustig en luxe (Mai Khao/Trisara), tweede deel in Krabi/Phi Phi voor adventure-side. Voorkomt resort-saaiheid.' : '. First half quiet luxury (Mai Khao/Trisara), second half in Krabi/Phi Phi for the adventure side. Prevents resort fatigue.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Reisverzekering met "trip cancel" niveau' : 'Trip-cancel level travel insurance'}</strong>{isNl ? ': honeymoons zijn high-cost, hoge schade bij ziekte. Premium verzekering kost 5–8% van trip-budget.' : ": honeymoons are high cost with big losses on illness. Premium insurance costs 5–8% of trip budget."}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Plan een sunset op dag 1' : 'Plan a sunset on day 1'}</strong>{isNl ? '— niet wachten tot dag 5. Honeymoon-momentum begint bij eerste-avond Promthep Cape, Baba Nest of Cape Sienna sky bar.' : "— don't wait until day 5. Honeymoon momentum starts on day 1 with Promthep Cape, Baba Nest or Cape Sienna sky bar."}</span></li>
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
            <h2 className="font-heading text-xl font-bold text-gray-900">{isNl ? 'Plan de rest van je Phuket honeymoon' : 'Plan the rest of your Phuket honeymoon'}</h2>
            <p className="mt-2 text-gray-700">{isNl ? 'Resort gekozen — werk de rest af:' : 'Resort picked — wrap up the rest:'}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/phuket-honeymoon/private-pool-villas/" className="rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">{isNl ? '🏊 Privé pool-villas' : '🏊 Private pool villas'}</Link>
              <Link href="/phuket-honeymoon/all-inclusive/" className="rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">{isNl ? '🍽️ All-inclusive packages' : '🍽️ All-inclusive packages'}</Link>
              <Link href="/phuket-wedding-venues/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '💒 Trouwlocaties Phuket' : '💒 Wedding venues Phuket'}</Link>
              <Link href="/best-hotels/phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏨 Alle Phuket hotels' : '🏨 All Phuket hotels'}</Link>
              <Link href="/yacht-charter-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '⛵ Yacht charter sunset' : '⛵ Yacht charter sunset'}</Link>
              <Link href="/flights-to-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '✈️ Vluchten naar Phuket' : '✈️ Flights to Phuket'}</Link>
              <Link href="/car-rental-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🚗 Auto huren' : '🚗 Car rental'}</Link>
              <Link href="/city/phuket/" className="rounded-full bg-white text-gray-900 border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50">{isNl ? '📖 Phuket reisgids' : '📖 Phuket travel guide'}</Link>
              <a href={withSubId(KLOOK_GENERIC, placement('mesh-klook'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">{isNl ? '🎟️ Honeymoon-activiteiten' : '🎟️ Honeymoon activities'}</a>
            </div>
          </section>

          {/* Methodology */}
          <section className="rounded-2xl bg-gray-50 border border-gray-200 p-6 text-sm text-gray-700">
            <h2 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? 'Hoe we vergeleken' : 'How we compared'}</h2>
            <p>{isNl ? 'Tarieven en honeymoon-perks geverifieerd in mei 2026 op resort-websites + Trip.com voor 2026 boekingen. Activity-prijzen via Klook, Viator en GetYourGuide. Gebied-tips gevalideerd via recente Tripadvisor-reviews. We verdienen commissie op boekingen via genoemde platforms — dit verandert niets aan de prijs of welke resorts we noemen.' : "Rates and honeymoon perks verified May 2026 on resort websites + Trip.com for 2026 bookings. Activity pricing via Klook, Viator and GetYourGuide. Area tips validated via recent Tripadvisor reviews. We earn a commission on bookings through the listed platforms — this never changes the price you pay or which resorts we cover."}</p>
          </section>
        </main>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const file = path.join(process.cwd(), 'data', 'pseo', 'wedding-honeymoon', 'phuket-partners.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  return { props: { partners: data.partners, lastUpdated: data.lastUpdated }, revalidate: 604800 };
};
