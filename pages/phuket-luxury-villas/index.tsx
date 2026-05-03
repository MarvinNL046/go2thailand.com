import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import { withSubId, BOOKING_GENERIC, KLOOK_GENERIC } from '../../lib/affiliates';
import { useSubId } from '../../lib/useSubId';

interface Partners {
  trip_luxury: { partnerUrl: string };
  trip_private_pool: { partnerUrl: string };
  trip_oceanfront: { partnerUrl: string };
  trip_family: { partnerUrl: string };
  trip_villa_search: { partnerUrl: string };
}

interface Props { partners: Partners; lastUpdated: string; }

export default function PhuketLuxuryVillasPillar({ partners, lastUpdated }: Props) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const subId = useSubId();
  const placementSubId = (placement: string) => `${subId}-pseo-phuket-luxury-villas-${placement}`;

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: isNl ? 'Phuket luxe villas' : 'Phuket Luxury Villas', href: '/phuket-luxury-villas/' },
  ];

  // Title <60, keyword front, year + count
  const seoTitle = isNl
    ? 'Phuket Luxury Villas (2026): 8 Top Resorts + Private Pool'   // 53
    : 'Phuket Luxury Villas (2026): 8 Top Picks + Private Pool';   // 51

  // Meta description <155, question hook, secondary keyword
  const seoDescription = isNl
    ? 'Op zoek naar luxe villas in Phuket? Vergelijk Trisara, Amanpuri, Sri Panwa & Banyan Tree pool villas $800–10.000/nacht — oceanfront, hillside, family.'
    : 'Looking for luxury villas in Phuket? Compare Trisara, Amanpuri, Sri Panwa & Banyan Tree pool villas $800–10,000/night — oceanfront, hillside, family.';

  const canonical = `https://go2-thailand.com${isNl ? '/nl' : ''}/phuket-luxury-villas/`;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, i) => ({
      '@type': 'ListItem', position: i + 1, name: b.name,
      item: `https://go2-thailand.com${isNl ? '/nl' : ''}${b.href}`,
    })),
  };

  const faqEn = [
    { q: "How much does a luxury villa in Phuket actually cost per night?",
      a: "Real-world 2026 high-season rates (Dec–Feb): Banyan Tree 1-bedroom pool villa $800–1,400/night, Trisara 2-bedroom oceanfront pool villa $2,500–4,500/night, Amanpuri private 4-bedroom villa $5,500–9,000/night, Sri Panwa 3-bedroom Habita Villa $1,500–2,800/night, The Pavilions cliff villa $700–1,200/night, Andara 3-bedroom villa $1,200–2,000/night. Outside high season (May–Oct) most properties drop 30–45%. Add 10% service + 7% VAT — usually quoted separately." },
    { q: "What's the difference between a luxury villa and a luxury hotel suite in Phuket?",
      a: "A villa is its own standalone building with private pool, full kitchen (or kitchenette), separate living and dining areas, and usually a private garden or terrace. Suites are still part of a hotel building, share corridors, and rarely have a private pool. Trisara, Amanpuri and Sri Panwa villas come with a personal villa attendant or butler; suites do not. For 6+ guests, families with kids, or anyone wanting genuine privacy, villa beats suite — for 2 guests on a 4-day trip, a hotel suite is often 40–50% cheaper for similar amenities." },
    { q: "Which area of Phuket has the best luxury villas?",
      a: "Kamala (north-west) — Andara, Cape Sienna, Trisara just north — quiet beach, 25 min from airport, the prestige strip. Layan/Bang Tao (north) — Banyan Tree, Trisara, The Pavilions Phuket — wide flat beach, family-friendly. Cape Panwa (south-east) — Sri Panwa cliff villas — best sunrise views, calm harbor side, 15 min from old town. Patong/Kalim — fewer luxury villas, more party-adjacent. Avoid Phuket Town for villa stays — luxury inventory is on the coastal strips." },
    { q: "Do all Phuket luxury villas have a private pool?",
      a: "At the $800+/night tier, yes — that's the defining feature. Banyan Tree, Trisara, Sri Panwa, Andara, Amanpuri, The Pavilions all guarantee a private pool with every villa booking. Below $600/night, 'pool villa' often means access to a shared pool with a small plunge pool on the deck. Always confirm: 'private pool, exclusive use, no shared access' in the booking confirmation. Pool size at the luxury tier is typically 6–10 m × 3–4 m, heated November–February." },
    { q: "When is the best time to book a luxury villa in Phuket?",
      a: "Booking 2–4 months ahead is the sweet spot. The top 5–10 villas at Trisara, Amanpuri and Sri Panwa book out 3–6 months ahead for Christmas/New Year and Chinese New Year — you'll need 4–6 months for those weeks. May–October (low season) you can often book 2 weeks out at 30–45% off rack rates, but expect 1–2 days/week of monsoon rain. Best value period: late November (high-season weather, no holiday surcharge) or early May (shoulder)." },
    { q: "Are luxury villa prices negotiable in Phuket?",
      a: "Direct booking with the resort: yes, especially for 5+ night stays — ask for late checkout, complimentary airport transfer, daily breakfast for 2 included, or a free spa credit. OTAs (Trip.com, Booking, Agoda) won't negotiate but often have time-limited 15–25% sales. Multi-villa group bookings (3+ villas same dates) typically get 10–15% off plus a complimentary villa attendant. Always book the largest villa configuration available — per-bedroom price drops sharply (a 3-bedroom is often only 60% more than a 1-bedroom)." },
    { q: "Trisara, Amanpuri or Sri Panwa — which luxury villa resort is best?",
      a: "Trisara (Layan, north-west) — most private, only 39 villas on a 25-acre cove, best for honeymoons and discreet luxury, $2,500–9,000/night. Amanpuri (Pansea, north-west) — the original, 30+ years legacy, all-villa Aman with the most refined service in Phuket, $5,000–15,000/night. Sri Panwa (Cape Panwa, south-east) — cliff-top villas, more sociable atmosphere, Baba Nest sunset bar, $1,200–4,500/night. For first-timers wanting maximum prestige: Amanpuri. For couples on a 5–7 night romantic trip: Trisara. For families or groups wanting variety: Sri Panwa." },
  ];

  const faqNl = [
    { q: "Wat kost een luxe villa in Phuket per nacht?",
      a: "2026 hoogseizoen (dec–feb): Banyan Tree 1-bedroom pool villa $800–1.400/nacht, Trisara 2-bedroom oceanfront pool villa $2.500–4.500/nacht, Amanpuri privé 4-bedroom villa $5.500–9.000/nacht, Sri Panwa 3-bedroom Habita Villa $1.500–2.800/nacht, The Pavilions cliff villa $700–1.200/nacht, Andara 3-bedroom villa $1.200–2.000/nacht. Buiten hoogseizoen (mei–okt) 30–45% goedkoper. Plus 10% service + 7% btw — meestal apart vermeld." },
    { q: "Wat is het verschil tussen een luxe villa en een luxe hotelsuite in Phuket?",
      a: "Een villa is een vrijstaand gebouw met privézwembad, volledige keuken (of kitchenette), aparte woon- en eetkamer, vaak privétuin of -terras. Suites zitten in een hotel, delen gangen, hebben zelden privézwembad. Trisara-, Amanpuri- en Sri Panwa-villa's komen met persoonlijke villa-butler; suites niet. Voor 6+ gasten, gezinnen met kinderen of echte privacy: villa wint. Voor 2 personen op een 4-daagse trip is een hotelsuite vaak 40–50% goedkoper met vergelijkbare faciliteiten." },
    { q: "Welke regio van Phuket heeft de beste luxe villa's?",
      a: "Kamala (noordwest) — Andara, Cape Sienna, Trisara — rustig strand, 25 min van de luchthaven, het prestige-strip. Layan/Bang Tao (noord) — Banyan Tree, Trisara, The Pavilions Phuket — breed strand, gezinsvriendelijk. Cape Panwa (zuidoost) — Sri Panwa cliff villas — beste zonsopgang, kalme havenkant, 15 min naar de oude stad. Patong/Kalim — minder luxe villa's, meer feest-georiënteerd. Phuket Town vermijden voor villa-verblijf — luxe-inventaris zit aan de kustlijnen." },
    { q: "Hebben alle Phuket-luxe villa's een privézwembad?",
      a: "Op $800+/nacht-niveau: ja — dat is dé bepalende feature. Banyan Tree, Trisara, Sri Panwa, Andara, Amanpuri, The Pavilions garanderen allemaal privézwembad bij elke villa-boeking. Onder $600/nacht betekent 'pool villa' vaak gedeelde pool plus kleine plunge pool op het dek. Bevestig altijd: 'private pool, exclusive use, no shared access' in de bevestigingsmail. Bad-formaat in luxe-segment: meestal 6–10 m × 3–4 m, verwarmd nov–feb." },
    { q: "Wanneer is de beste tijd om een luxe villa in Phuket te boeken?",
      a: "2–4 maanden vooruit boeken is de sweet spot. De top 5–10 villa's bij Trisara, Amanpuri en Sri Panwa zijn 3–6 maanden vooruit volgeboekt voor Kerst/Oud & Nieuw en Chinees Nieuwjaar — voor die weken 4–6 maanden vooruit. Mei–okt (laagseizoen) kun je 2 weken vooruit boeken met 30–45% korting, maar reken op 1–2 dagen/week regen. Beste value: laat november (hoogseizoens-weer zonder vakantietoeslag) of begin mei (overgangsperiode)." },
    { q: "Zijn luxe villa-prijzen in Phuket onderhandelbaar?",
      a: "Direct boeken bij het resort: ja, vooral bij 5+ nachten — vraag om late check-out, gratis luchthaventransfer, dagelijks ontbijt voor 2, of spa-credit. OTA's (Trip.com, Booking, Agoda) onderhandelen niet maar hebben vaak tijdelijke 15–25% sales. Multi-villa groepsboekingen (3+ villa's zelfde datums) krijgen meestal 10–15% korting + gratis villa-butler. Boek altijd de grootste villa-configuratie — per-slaapkamer-prijs daalt fors (3-bedroom is vaak maar 60% duurder dan 1-bedroom)." },
    { q: "Trisara, Amanpuri of Sri Panwa — welke luxe villa-resort is de beste?",
      a: "Trisara (Layan, noordwest) — meest privé, slechts 39 villa's op een 25-acre cove, beste voor honeymoons en discrete luxe, $2.500–9.000/nacht. Amanpuri (Pansea, noordwest) — de originele, 30+ jaar legacy, all-villa Aman met de meest verfijnde service van Phuket, $5.000–15.000/nacht. Sri Panwa (Cape Panwa, zuidoost) — cliff-villa's, socialere sfeer, Baba Nest sunset bar, $1.200–4.500/nacht. Eerste keer en maximum prestige: Amanpuri. Stel op 5–7 daagse romantische trip: Trisara. Familie of groep met variatie: Sri Panwa." },
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
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-white/75">{isNl ? 'Phuket luxe villa-gids' : 'Phuket luxury villa guide'}</p>
            {/* H1 differs from title — secondary keyword "private pool villas" + value hook */}
            <h1 className="font-heading text-3xl lg:text-5xl font-bold mt-2">
              {isNl
                ? 'Luxe villa\'s in Phuket: 8 top private pool villa-resorts + eerlijke prijsgids'
                : 'Luxury Villas in Phuket: 8 Top Private Pool Villa Resorts + Honest Price Guide'}
            </h1>
            <p className="mt-4 text-lg lg:text-xl max-w-3xl opacity-95">
              {isNl
                ? 'Phuket\'s luxe villa\'s strekken zich uit van $700 cliff-villa\'s in Cape Panwa tot $10.000/nacht Amanpuri-estates in Pansea. Hier vind je wat élk resort écht kost, welk gebied past bij je trip, en welke villa-categorie (oceanfront, hillside, beachfront access) is het geld waard.'
                : "Phuket's luxury villas range from $700 cliff villas at Cape Panwa to $10,000/night Amanpuri estates in Pansea. Here's what each resort really costs, which area fits your trip, and which villa category (oceanfront, hillside, beachfront access) is worth the money."}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={withSubId(partners.trip_luxury.partnerUrl, placementSubId('hero-trip'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-6 py-3 text-base font-semibold hover:bg-red-700 shadow-lg">
                {isNl ? 'Bekijk Phuket luxe villa\'s op Trip.com' : 'See Phuket luxury villas on Trip.com'} →
              </a>
              <a href={withSubId(BOOKING_GENERIC, placementSubId('hero-booking'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-white text-thailand-blue border border-white/40 px-6 py-3 text-base font-semibold hover:bg-white/90">
                {isNl ? 'Vergelijk op Booking.com' : 'Compare on Booking.com'} →
              </a>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-xs opacity-90">
              <span>✔ 8 {isNl ? 'resorts vergeleken' : 'resorts compared'}</span>
              <span>✔ {isNl ? 'Per gebied + categorie' : 'By area + category'}</span>
              <span>✔ {isNl ? 'Bijgewerkt' : 'Updated'} {new Date(lastUpdated).toLocaleDateString(isNl ? 'nl-NL' : 'en', { year: 'numeric', month: 'long' })}</span>
            </div>
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          {/* Comparison table */}
          <section id="comparison">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-2">{isNl ? 'Snelle vergelijking: 8 luxe villa-resorts' : 'Quick comparison: 8 luxury villa resorts'}</h2>
            <p className="text-gray-600 mb-6">{isNl ? 'Klik op een resort om actuele beschikbaarheid te zien (we verdienen een kleine commissie zonder dat het jou iets extra kost).' : 'Click a resort to see live availability (we earn a small commission at no extra cost to you).'}</p>
            <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Resort' : 'Resort'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Gebied' : 'Area'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Type villa' : 'Villa type'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Prijs/nacht' : 'Price/night'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Beste voor' : 'Best for'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Boek' : 'Book'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { name: 'Amanpuri', area: 'Pansea', type: isNl ? 'Privé estate' : 'Private estate', price: '$5,000–15,000', best: isNl ? 'Ultieme prestige' : 'Ultimate prestige' },
                    { name: 'Trisara', area: 'Layan', type: isNl ? 'Oceanfront pool' : 'Oceanfront pool', price: '$2,500–9,000', best: isNl ? 'Honeymoons, privacy' : 'Honeymoons, privacy' },
                    { name: 'Sri Panwa', area: 'Cape Panwa', type: isNl ? 'Cliff pool villa' : 'Cliff pool villa', price: '$1,200–4,500', best: isNl ? 'Uitzicht, sociaal' : 'Views, social' },
                    { name: 'Banyan Tree Phuket', area: 'Bang Tao', type: isNl ? 'Lagoon pool' : 'Lagoon pool', price: '$800–2,500', best: isNl ? 'Best value luxe' : 'Best value luxury' },
                    { name: 'Andara Resort & Villas', area: 'Kamala', type: isNl ? 'Hillside pool' : 'Hillside pool', price: '$1,200–2,500', best: isNl ? 'Families 4+ gasten' : 'Families 4+ guests' },
                    { name: 'The Pavilions Phuket', area: 'Cherng Talay', type: isNl ? 'Adults-only pool' : 'Adults-only pool', price: '$700–1,400', best: isNl ? 'Stellen, budget-luxe' : 'Couples, value luxury' },
                    { name: 'Cape Sienna Gourmet', area: 'Kamala', type: isNl ? 'Pool villa' : 'Pool villa', price: '$600–1,200', best: isNl ? 'Foodies, panorama' : 'Foodies, panorama' },
                    { name: 'Twinpalms Montazure', area: 'Kamala', type: isNl ? 'Beach pool villa' : 'Beach pool villa', price: '$900–2,200', best: isNl ? 'Beachfront, design' : 'Beachfront, design' },
                  ].map((r, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-4 py-3"><a href={withSubId(partners.trip_luxury.partnerUrl, placementSubId(`table-${i}`))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="font-semibold text-thailand-blue hover:text-thailand-red hover:underline">{r.name}</a></td>
                      <td className="px-4 py-3 text-gray-700">{r.area}</td>
                      <td className="px-4 py-3 text-gray-700">{r.type}</td>
                      <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{r.price}</td>
                      <td className="px-4 py-3 text-gray-700">{r.best}</td>
                      <td className="px-4 py-3"><a href={withSubId(partners.trip_luxury.partnerUrl, placementSubId(`table-cta-${i}`))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-thailand-red font-semibold hover:underline whitespace-nowrap">{isNl ? 'Bekijk →' : 'See deals →'}</a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-gray-500">{isNl ? 'Prijzen zijn 2026 hoogseizoen-tarieven (dec–feb), exclusief 10% service + 7% btw. Mei–okt meestal 30–45% lager.' : 'Prices are 2026 high-season rates (Dec–Feb), excluding 10% service + 7% VAT. May–Oct typically 30–45% cheaper.'}</p>
          </section>

          {/* Top pick callout */}
          <section className="rounded-2xl bg-thailand-red/5 border-2 border-thailand-red p-6">
            <span className="inline-block rounded-full bg-thailand-red text-white text-xs font-bold uppercase tracking-wide px-3 py-1 mb-3">⭐ {isNl ? 'Beste keuze voor de meesten' : 'Top pick for most'}</span>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Banyan Tree Phuket — beste value luxe pool villa' : 'Banyan Tree Phuket — best value luxury pool villa'}</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              {isNl
                ? 'Voor 90% van reizigers die een echte luxe pool villa willen zonder Amanpuri-prijzen: Banyan Tree Phuket bij Bang Tao Lagoon levert privézwembad, eigen tuin, butler op afroep en wereldklasse spa, vanaf $800/nacht. 1- en 2-bedroom configuraties beschikbaar — perfect voor stel of klein gezin. Boek 6+ nachten en je krijgt vaak gratis transfer + spa-credit.'
                : "For 90% of travelers wanting a genuine luxury pool villa without Amanpuri pricing: Banyan Tree Phuket at Bang Tao Lagoon delivers private pool, own garden, butler on call and world-class spa from $800/night. 1- and 2-bedroom configurations — perfect for couples or small families. Book 6+ nights and you typically get a complimentary transfer + spa credit."}
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={withSubId(partners.trip_luxury.partnerUrl, placementSubId('toppick-trip'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">
                {isNl ? 'Banyan Tree op Trip.com' : 'Banyan Tree on Trip.com'} →
              </a>
              <a href={withSubId(BOOKING_GENERIC, placementSubId('toppick-booking'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">
                {isNl ? 'Banyan Tree op Booking' : 'Banyan Tree on Booking'} →
              </a>
            </div>
          </section>

          {/* Areas section */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Welk gebied van Phuket past bij jouw villa-trip?' : 'Which area of Phuket fits your villa trip?'}</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="rounded-2xl bg-white p-5 shadow-sm border-l-4 border-green-500">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">Layan & Bang Tao</h3>
                <p className="text-xs text-green-700 font-semibold mb-2">{isNl ? '👍 Beste mix' : '👍 Best mix'}</p>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? 'Noordwestkust, breed plat strand, 25 min van de luchthaven. Trisara, Banyan Tree, The Pavilions. Family-friendly, Laguna golf-resort vlakbij. Beste keuze voor 5–7 daagse villa-trip.' : 'North-west coast, wide flat beach, 25 min from airport. Trisara, Banyan Tree, The Pavilions. Family-friendly, Laguna golf resort nearby. Best choice for a 5–7 day villa trip.'}</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border-l-4 border-blue-500">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">Kamala & Pansea</h3>
                <p className="text-xs text-blue-700 font-semibold mb-2">{isNl ? '🔵 Prestige + privacy' : '🔵 Prestige + privacy'}</p>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? 'Noordwest, dichter bij Patong (15 min). Amanpuri, Andara, Twinpalms Montazure, Cape Sienna. Prive coves, beste zonsondergangen, fine-dining scene. Voor honeymoons en discrete luxe.' : 'North-west, closer to Patong (15 min). Amanpuri, Andara, Twinpalms Montazure, Cape Sienna. Private coves, best sunsets, fine-dining scene. For honeymoons and discreet luxury.'}</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border-l-4 border-amber-500">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">Cape Panwa</h3>
                <p className="text-xs text-amber-700 font-semibold mb-2">{isNl ? '🌅 Sunrise + harbour' : '🌅 Sunrise + harbour'}</p>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? 'Zuidoostkust, kalme havenzijde, 15 min naar Phuket Town. Sri Panwa cliff-villa\'s, Baba Nest sunset bar. Ander gevoel — minder strand, meer cliff-pool drama. Beste voor stellen die zonsopgang willen.' : "South-east coast, calm harbour side, 15 min to Phuket Town. Sri Panwa cliff villas, Baba Nest sunset bar. Different vibe — less beach, more cliff-pool drama. Best for couples wanting sunrise."}</p>
              </div>
            </div>
          </section>

          {/* Buyer's guide */}
          <section className="rounded-2xl bg-amber-50 border border-amber-200 p-6">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Boekingstips voor luxe villa\'s in Phuket' : 'Booking tips for luxury villas in Phuket'}</h2>
            <ul className="space-y-3 text-gray-800">
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Boek hoogseizoen 2–4 maanden vooruit' : 'Book high season 2–4 months ahead'}</strong>{isNl ? '. Top villa\'s gaan 3–6 maanden vooruit op slot voor Kerst en Chinees Nieuwjaar — laat is laat.' : '. Top villas sell out 3–6 months ahead for Christmas and Chinese New Year — late is late.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Boek de grootste configuratie' : 'Book the largest configuration'}</strong>{isNl ? '. Een 3-bedroom villa is vaak maar 60% duurder dan 1-bedroom — per slaapkamer bespaar je significant. Multi-generation trips zijn de bedoeling op dit niveau.' : '. A 3-bedroom is often only 60% more than a 1-bedroom — per-bedroom you save big. Multi-generation trips are intended at this tier.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Direct boeken loont voor 5+ nachten' : 'Direct booking pays for 5+ nights'}</strong>{isNl ? '. Vraag late check-out, gratis luchthaventransfer, ontbijt voor 2, of $200 spa-credit. Resort-managers willen direct-bookers.' : '. Ask for late checkout, complimentary airport transfer, breakfast for 2, or $200 spa credit. Resort managers prefer direct bookers.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Bevestig "private pool exclusive use"' : 'Confirm "private pool, exclusive use"'}</strong>{isNl ? '. Onder $600/nacht kan "pool villa" gedeeld zwembad betekenen. Op luxe-niveau zou het exclusief moeten zijn — eis dit in de bevestiging.' : '. Below $600/night, "pool villa" can mean shared pool. At the luxury tier it should be exclusive — get it in the booking confirmation.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Service charge + btw apart' : 'Service charge + VAT extra'}</strong>{isNl ? '. Standaard 10% service + 7% btw bovenop kamerprijs. Check of de quote inclusief is — rekenkundig 17% verschil per nacht.' : '. Standard 10% service + 7% VAT on top of room rate. Check if the quote includes both — that\'s 17% per night.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Vergelijk altijd 3 platforms' : 'Always compare 3 platforms'}</strong>{isNl ? ': Trip.com en Booking.com hebben vaak 10–25% prijsverschil voor identieke villa, identieke datum. Klein werk, grote winst.' : ': Trip.com and Booking.com often differ 10–25% for identical villa, identical date. Small effort, big saving.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Reisverzekering met villa-coverage' : 'Travel insurance with villa coverage'}</strong>{isNl ? '. Op $1.500+/nacht is annuleringsverzekering essentieel. Specifieke "villa cancellation" polis kost 2–4% van totaalprijs — sterk aangeraden.' : '. At $1,500+/night, cancellation insurance is essential. Specific "villa cancellation" policy costs 2–4% of total — strongly recommended.'}</span></li>
            </ul>
          </section>

          {/* Detailed resort cards */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Top luxe villa-resorts in detail' : 'Top luxury villa resorts in detail'}</h2>
            <div className="space-y-5">
              {[
                {
                  name: 'Amanpuri',
                  desc: isNl
                    ? 'De originele Aman-resort sinds 1988, en nog steeds de gouden standaard van Aziatische luxe. 30 villa-suites en 30 privé-villa\'s op een coconut grove in Pansea. 2-tot-9-bedroom configuraties beschikbaar — privé-villa\'s komen met hun eigen chef, butler, masseuse en optionele yoga-instructeur. Het service-niveau is wat je betaalt: $5.000–15.000/nacht.'
                    : "The original Aman resort since 1988, still the gold standard of Asian luxury. 30 villa-suites and 30 private villas on a coconut grove in Pansea. 2-to-9-bedroom configurations — private villas come with their own chef, butler, masseuse and optional yoga instructor. Service level is what you pay for: $5,000–15,000/night.",
                },
                {
                  name: 'Trisara',
                  desc: isNl
                    ? 'Slechts 39 villa\'s op een 25-acre privé cove ten noorden van Layan Beach. Elke villa heeft een infinity pool met direct uitzicht op de Andamanzee. Restaurants PRU (1 Michelin-ster) en Seafood. 2-bedroom oceanfront pool villa $2.500–4.500/nacht — sweet spot voor 2 stellen of een gezin van 4. Het meest privé high-end resort op het hoofdland van Phuket.'
                    : "Just 39 villas on a 25-acre private cove north of Layan Beach. Every villa has an infinity pool with direct Andaman Sea view. Restaurants PRU (1 Michelin star) and Seafood. 2-bedroom oceanfront pool villa $2,500–4,500/night — sweet spot for 2 couples or a family of 4. The most private high-end resort on Phuket mainland.",
                },
                {
                  name: 'Sri Panwa',
                  desc: isNl
                    ? 'Cliff-top resort op Cape Panwa met de iconische Baba Nest sunset rooftop bar. Habita Villas en Pool Villas vanaf $1.200/nacht, 1-tot-3-bedroom. Andere vibe dan westkust — minder strand, meer cliff-drama, kalmere haven-zijde. Restaurant Baba Soul voor de beste sunset views in Phuket. Gezinsvriendelijk en sociaal — niet voor wie absolute privacy wil.'
                    : "Cliff-top resort on Cape Panwa with the iconic Baba Nest sunset rooftop bar. Habita Villas and Pool Villas from $1,200/night, 1-to-3-bedroom. Different vibe than west coast — less beach, more cliff drama, calmer harbour side. Restaurant Baba Soul for the best sunset views in Phuket. Family-friendly and social — not for absolute privacy seekers.",
                },
                {
                  name: 'Banyan Tree Phuket',
                  desc: isNl
                    ? 'Onze top pick voor value luxe. Iconische Thai-style pool villa\'s aan een lagoon in Bang Tao, vanaf $800/nacht. Onderdeel van het Laguna-complex met 5 hotels en een golfbaan, dus extra activiteiten op loopafstand. Onthou dat je niet aan zee zit (5 min lopen) — voor pure beachfront kijk naar Trisara of Twinpalms Montazure.'
                    : "Our top pick for value luxury. Iconic Thai-style pool villas around a lagoon in Bang Tao, from $800/night. Part of the Laguna complex with 5 hotels and a golf course, so extra activities walkable. Note you're not directly on the beach (5 min walk) — for true beachfront look at Trisara or Twinpalms Montazure.",
                },
                {
                  name: 'Andara Resort & Villas',
                  desc: isNl
                    ? '63 hillside pool villa\'s in Kamala met spectaculair uitzicht op de Andamanzee. 1-tot-6-bedroom — de 4–6 bedroom configuraties zijn dé keuze voor multi-generation trips ($2.500–4.000/nacht voor 6 bedrooms is sterk per persoon). Eigen chef on-site, supermarkt op het terrein, shuttle naar Kamala beach. Beste familie-keuze.'
                    : "63 hillside pool villas in Kamala with spectacular Andaman Sea views. 1-to-6-bedroom — the 4–6 bedroom configs are the move for multi-generation trips ($2,500–4,000/night for 6 bedrooms is strong per-person). On-site chef, supermarket on the property, shuttle to Kamala beach. Best family choice.",
                },
              ].map((r, i) => (
                <div key={i} className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                  <h3 className="font-heading text-xl font-bold text-gray-900 mb-2">{r.name}</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">{r.desc}</p>
                  <a href={withSubId(partners.trip_luxury.partnerUrl, placementSubId(`detail-${i}`))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center text-sm font-semibold text-thailand-red hover:underline">{isNl ? `Bekijk ${r.name} op Trip.com →` : `See ${r.name} on Trip.com →`}</a>
                </div>
              ))}
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

          {/* Spoke cluster mesh */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Verken specifieke villa-types' : 'Explore specific villa types'}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <Link href="/phuket-luxury-villas/private-pool/" className="block rounded-2xl bg-white p-4 shadow-sm border border-gray-200 hover:border-thailand-blue transition-colors">
                <p className="font-heading font-bold text-gray-900">{isNl ? 'Private pool villa\'s' : 'Private pool villas'}</p>
                <p className="text-sm text-gray-600 mt-1">{isNl ? 'Elke kamer eigen pool, $800–10.000/nacht' : 'Every room with private pool, $800–10,000/night'}</p>
                <p className="text-xs text-thailand-blue mt-2 font-semibold">{isNl ? 'Bekijk gids' : 'See guide'} →</p>
              </Link>
              <Link href="/phuket-luxury-villas/oceanfront/" className="block rounded-2xl bg-white p-4 shadow-sm border border-gray-200 hover:border-thailand-blue transition-colors">
                <p className="font-heading font-bold text-gray-900">{isNl ? 'Oceanfront villa\'s' : 'Oceanfront villas'}</p>
                <p className="text-sm text-gray-600 mt-1">{isNl ? 'Direct uitzicht op zee, vanaf $1.500/nacht' : 'Direct sea view, from $1,500/night'}</p>
                <p className="text-xs text-thailand-blue mt-2 font-semibold">{isNl ? 'Bekijk gids' : 'See guide'} →</p>
              </Link>
              <Link href="/phuket-luxury-villas/family/" className="block rounded-2xl bg-white p-4 shadow-sm border border-gray-200 hover:border-thailand-blue transition-colors">
                <p className="font-heading font-bold text-gray-900">{isNl ? 'Family villa\'s (4+ slaapkamers)' : 'Family villas (4+ bedrooms)'}</p>
                <p className="text-sm text-gray-600 mt-1">{isNl ? 'Multi-gen trips, eigen chef + butler' : 'Multi-gen trips, own chef + butler'}</p>
                <p className="text-xs text-thailand-blue mt-2 font-semibold">{isNl ? 'Bekijk gids' : 'See guide'} →</p>
              </Link>
              <Link href="/private-pool-villa-phuket/" className="block rounded-2xl bg-white p-4 shadow-sm border border-gray-200 hover:border-thailand-blue transition-colors">
                <p className="font-heading font-bold text-gray-900">{isNl ? 'Private pool villa Phuket vergelijking' : 'Private pool villa Phuket comparison'}</p>
                <p className="text-sm text-gray-600 mt-1">{isNl ? 'Wat verwachten + beste operators' : 'What to expect + best operators'}</p>
                <p className="text-xs text-thailand-blue mt-2 font-semibold">{isNl ? 'Bekijk gids' : 'See guide'} →</p>
              </Link>
            </div>
          </section>

          {/* Cross-cluster mesh */}
          <section className="rounded-2xl bg-thailand-blue/10 p-6">
            <h2 className="font-heading text-xl font-bold text-gray-900">{isNl ? 'Plan de rest van je luxe Phuket-trip' : 'Plan the rest of your luxury Phuket trip'}</h2>
            <p className="mt-2 text-gray-700">{isNl ? 'Villa is geboekt — werk de rest af:' : 'Villa booked — wrap up the rest:'}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/best-hotels/phuket/" className="rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">{isNl ? '🏨 Beste hotels in Phuket' : '🏨 Best hotels in Phuket'}</Link>
              <Link href="/yacht-charter-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '⛵ Yacht charter Phuket' : '⛵ Yacht charter Phuket'}</Link>
              <Link href="/flights-to-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '✈️ Vluchten naar Phuket' : '✈️ Flights to Phuket'}</Link>
              <Link href="/car-rental-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🚗 Auto huren naar je villa' : '🚗 Rent a car to your villa'}</Link>
              <Link href="/city/phuket/" className="rounded-full bg-white text-gray-900 border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50">{isNl ? '📖 Phuket reisgids' : '📖 Phuket travel guide'}</Link>
              <a href={withSubId(KLOOK_GENERIC, placementSubId('mesh-klook'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">{isNl ? '🎟️ Phuket activiteiten' : '🎟️ Phuket activities'}</a>
            </div>
          </section>

          {/* Methodology */}
          <section className="rounded-2xl bg-gray-50 border border-gray-200 p-6 text-sm text-gray-700">
            <h2 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? 'Hoe we vergeleken' : 'How we compared'}</h2>
            <p>{isNl ? 'Tarieven en villa-specs geverifieerd in mei 2026 op Trip.com, Booking.com en de officiële website van elke resort voor early-juni 2026 boekingen. Resort-categorieën gevalideerd via Tripadvisor + recente Google reviews. We verdienen commissie op boekingen via genoemde platforms — dit verandert niets aan de prijs of welke resorts we aanraden.' : "Rates and villa specs verified May 2026 on Trip.com, Booking.com and each resort's official website for early-June 2026 bookings. Resort categorisations validated via Tripadvisor + recent Google reviews. We earn a commission on bookings through the listed platforms — this never changes the price you pay or which resorts we recommend."}</p>
          </section>
        </main>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const file = path.join(process.cwd(), 'data', 'pseo', 'villas', 'phuket-partners.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  return { props: { partners: data.partners, lastUpdated: data.lastUpdated }, revalidate: 604800 };
};
