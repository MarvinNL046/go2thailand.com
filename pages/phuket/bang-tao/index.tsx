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
interface Partners { trip_pillar: Partner; trip_hotels: Partner; klook_pillar: Partner; gyg_pillar: Partner; viator_pillar: Partner; trip_hilton_garden: Partner; }
interface Props { partners: Partners; lastUpdated: string; }

export default function BangTaoPillar({ partners, lastUpdated }: Props) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const subId = useSubId();
  const placement = (p: string) => `${subId}-pseo-phuket-bang-tao-pillar-${p}`;

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Phuket', href: '/city/phuket/' },
    { name: 'Bang Tao Beach', href: '/phuket/bang-tao/' },
  ];

  const seoTitle = isNl ? 'Bang Tao Beach Phuket (2026): Laguna + Strand' : 'Bang Tao Beach Phuket (2026): The Laguna Beach Guide';
  const seoDescription = isNl
    ? 'Op zoek naar Bang Tao Beach? Phuket\'s langste strand (8 km), Laguna-resorts, Boat Avenue dining, $90–500 hotels — eerlijke gids 2026 met top picks.'
    : 'Heading to Bang Tao Beach? Phuket\'s longest stretch of sand (8 km), Laguna resorts, Boat Avenue dining, $90–500 hotels — honest 2026 guide with top picks.';
  const canonical = `https://go2-thailand.com${isNl ? '/nl' : ''}/phuket/bang-tao/`;

  const breadcrumbJsonLd = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: breadcrumbs.map((b, i) => ({ '@type': 'ListItem', position: i + 1, name: b.name, item: `https://go2-thailand.com${isNl ? '/nl' : ''}${b.href}` })) };

  const faqEn = [
    { q: 'Where is Bang Tao Beach in Phuket?', a: 'North-west Phuket, 25 km north of Patong (35–40 min taxi), 17 km from the airport (25 min). The "Laguna Phuket" complex (5 connected luxury resorts: Banyan Tree, Angsana, Laguna Beach Resort, Dusit Thani Laguna, Cassia) sits at the south end. Boat Avenue dining strip is 1 km inland.' },
    { q: 'Is Bang Tao Beach better than Patong or Kata?', a: "Different proposition. Bang Tao = longest beach (8 km), most luxurious resorts (Banyan Tree, Trisara nearby), best dining strip (Boat Avenue), but quietest evenings. Patong = nightlife + variety. Kata = village feel + family. Choose Bang Tao if you want polish over personality." },
    { q: 'How much does Bang Tao cost compared to Kata or Patong?', a: 'Hotel rates trend 20–40% higher than Patong/Kata for similar tier — beachfront luxury especially. Mid-tier hotels $90–200 (Hilton Garden Inn, Centara Grand). Luxury $300–800+ (Banyan Tree, Trisara). The Boat Avenue dining strip is mid-priced ($10–25 per main).' },
    { q: 'Is Bang Tao good for families?', a: 'Yes — wide beach with no rocks, lifeguards 09:00–17:00 in high season, family resorts (Angsana Laguna, Cassia, Outrigger). The Laguna estate has a free shuttle bus connecting all 5 hotels — kids love the boat-ride link between properties. Drawback: limited walkable kids\' activities outside the resort gates.' },
    { q: 'What is Boat Avenue at Bang Tao?', a: 'A 600 m commercial strip 1 km inland from the beach, considered Phuket\'s best mid-range dining cluster. 50+ restaurants (Catch Beach Club, The Tasting Room, Som Tam Den, Bampot, Black Ginger), boutique shops, two supermarkets, weekly Friday food market. 10 min walk from most Bang Tao hotels.' },
    { q: 'When is the best time to visit Bang Tao?', a: 'November to April (dry season): calm swimming, 28–32°C, peak hotel rates. Best value: late November and April. May to October: rougher water, 30–40% lower hotel prices, occasional red flags. Worst weather: late September.' },
    { q: 'How do I get to Bang Tao from Phuket Airport?', a: '17 km / 25 min by taxi ($15–20). Closer than any other major Phuket beach. Many Laguna resorts include free transfer for stays of 3+ nights. Alternative: airport bus to Phuket Town then taxi (~$8 total, 90 min).' },
  ];

  const faqNl = [
    { q: 'Waar ligt Bang Tao Beach in Phuket?', a: 'Noordwest-Phuket, 25 km noord van Patong (35–40 min taxi), 17 km van de luchthaven (25 min). De "Laguna Phuket"-complex (5 luxe-resorts: Banyan Tree, Angsana, Laguna Beach Resort, Dusit Thani Laguna, Cassia) ligt aan de zuidzijde. Boat Avenue dining-strook is 1 km landinwaarts.' },
    { q: 'Is Bang Tao beter dan Patong of Kata?', a: "Andere propositie. Bang Tao = langste strand (8 km), luxste resorts, beste dining-strook (Boat Avenue), maar rustigste avonden. Patong = nachtleven + variatie. Kata = dorpsgevoel + familie. Kies Bang Tao als je polish boven persoonlijkheid wilt." },
    { q: 'Hoeveel kost Bang Tao vergeleken met Kata of Patong?', a: 'Hotelprijzen 20–40% hoger dan Patong/Kata voor vergelijkbare tier — vooral beachfront luxe. Mid-tier $90–200 (Hilton Garden Inn, Centara Grand). Luxe $300–800+ (Banyan Tree, Trisara). Boat Avenue is mid-range geprijsd ($10–25 per main).' },
    { q: 'Is Bang Tao goed voor families?', a: 'Ja — breed strand zonder rotsen, lifeguards 09:00–17:00 in hoogseizoen, familieresorts (Angsana Laguna, Cassia, Outrigger). De Laguna-estate heeft gratis shuttle-bus + boot tussen alle 5 hotels — kinderen vinden de bootverbinding magisch. Nadeel: weinig loopbare kinderactiviteiten buiten resort.' },
    { q: 'Wat is Boat Avenue bij Bang Tao?', a: 'Een 600 m commerciële strook 1 km landinwaarts, beschouwd als Phuket\'s beste mid-range dining-cluster. 50+ restaurants (Catch Beach Club, The Tasting Room, Som Tam Den, Bampot, Black Ginger), boutiques, twee supermarkten, weekelijkse vrijdag-foodmarkt. 10 min lopen vanaf meeste Bang Tao hotels.' },
    { q: 'Wanneer is de beste tijd voor Bang Tao?', a: 'November tot april (droog seizoen): kalm zwemmen, 28–32°C, piek hotelprijzen. Beste value: laat-november en april. Mei tot oktober: ruwer water, 30–40% lagere hotelprijzen, soms rode vlaggen. Slechtst: eind september.' },
    { q: 'Hoe kom ik in Bang Tao vanaf Phuket Airport?', a: '17 km / 25 min met taxi ($15–20). Dichterbij dan elk ander hoofdstrand. Veel Laguna-resorts hebben gratis transfer bij 3+ nachten. Alternatief: airport-bus naar Phuket Town + taxi (~$8 totaal, 90 min).' },
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
            <h1 className="font-heading text-3xl lg:text-5xl font-bold mt-2">{isNl ? 'Bang Tao Beach Phuket: 8 km zand, Laguna-luxe & Boat Avenue' : 'Bang Tao Beach Phuket: 8 km of Sand, Laguna Luxury & Boat Avenue'}</h1>
            <p className="mt-4 text-lg lg:text-xl max-w-3xl opacity-95">{isNl ? "Bang Tao is Phuket's langste, breedste strand en de thuisbasis van de Laguna-resort-estate — 5 verbonden luxe-hotels, een gratis shuttle, en de beste dining-strook van het eiland 1 km inwaarts. Hier vind je waar te slapen, hoe Boat Avenue werkt, en waarom het strand-cluster Phuket's slim-luxe keuze is." : "Bang Tao is Phuket\'s longest, widest beach and the home of the Laguna resort estate — 5 connected luxury hotels, a free shuttle, and the island\'s best dining strip 1 km inland. Here\'s where to stay, how Boat Avenue works, and why this stretch is Phuket\'s smart-luxury pick."}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={withSubId(partners.trip_pillar.partnerUrl, placement('hero-trip'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-6 py-3 text-base font-semibold hover:bg-red-700 shadow-lg">{isNl ? 'Bang Tao hotels op Trip.com' : 'Bang Tao hotels on Trip.com'} →</a>
              <a href={withSubId(partners.klook_pillar.partnerUrl, placement('hero-klook'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-white text-thailand-blue border border-white/40 px-6 py-3 text-base font-semibold hover:bg-white/90">{isNl ? 'Activiteiten op Klook' : 'Activities on Klook'} →</a>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-xs opacity-90">
              <span>✔ {isNl ? '8 km strand' : '8 km beach'}</span>
              <span>✔ Laguna estate</span>
              <span>✔ {isNl ? 'Bijgewerkt' : 'Updated'} {new Date(lastUpdated).toLocaleDateString(isNl ? 'nl-NL' : 'en', { year: 'numeric', month: 'long' })}</span>
            </div>
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <section className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'In één oogopslag' : 'At a glance'}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Locatie' : 'Location'}</p><p className="mt-1 font-heading font-bold text-gray-900 text-lg">{isNl ? 'NW-Phuket, 25 km N Patong' : 'NW Phuket, 25 km N Patong'}</p></div>
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Sfeer' : 'Vibe'}</p><p className="mt-1 font-heading font-bold text-gray-900 text-lg">{isNl ? 'Laguna luxe + dining' : 'Laguna luxury + dining'}</p></div>
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Beste voor' : 'Best for'}</p><p className="mt-1 font-heading font-bold text-gray-900 text-lg">{isNl ? 'Stellen, foodies' : 'Couples, foodies'}</p></div>
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Prijsklasse' : 'Price tier'}</p><p className="mt-1 font-heading font-bold text-gray-900 text-lg">$90–800</p></div>
            </div>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Het strand & de Laguna-estate' : 'Beach character & the Laguna estate'}</h2>
            <p className="text-gray-700 leading-relaxed mb-3">{isNl ? "Bang Tao Beach is een rechte 8 km strook tussen twee landtongen, de langste van Phuket. Het zand is fijn-wit, de oceaan helt zacht — geen rotsen, geen stromingen waar je uit moet kijken in droogseizoen. Wat Bang Tao uniek maakt: het zuidelijke 1,5 km gedeelte hoort bij Laguna Phuket, een 5-hotelenclave verbonden door tropische lagunes met gratis shuttles + bootjes." : "Bang Tao Beach is a straight 8 km strip between two headlands, the longest in Phuket. Fine-white sand, gently sloping ocean — no rocks, no rip currents to worry about in dry season. What makes Bang Tao unique: the south 1.5 km belongs to Laguna Phuket, a 5-hotel enclave linked by tropical lagoons with free shuttles + boats."}</p>
            <p className="text-gray-700 leading-relaxed mb-3">{isNl ? 'De midden-baai (rond Hilton Garden Inn, Centara Grand) is publiek strand met openbare toegang vanaf de hoofdweg. Het noordelijke uiteinde is rustiger, met villa-developments en de Trisara-luxe enclave. Op het hele strand: $5–10 ligbedjes, palmschaduw, paar strand-vendor BBQs voor lunch.' : 'The mid-bay (around Hilton Garden Inn, Centara Grand) is public beach with open access from the main road. The north end is quieter, villa developments and the Trisara luxury enclave. Across the strip: $5–10 sun loungers, palm shade, a few beach-vendor BBQs for lunch.'}</p>
            <p className="text-gray-700 leading-relaxed">{isNl ? "Boat Avenue, 1 km landinwaarts, is wat Bang Tao tot een dining-bestemming maakt — niet alleen voor hotelgasten. 50+ restaurants in een ontspannen open-lucht boulevard, vrijdag-avondmarkt, twee supermarkten. Het is waar Patong-bezoekers naartoe taxiën als ze een serieuze maaltijd willen." : "Boat Avenue, 1 km inland, is what makes Bang Tao a dining destination — not just for hotel guests. 50+ restaurants in a relaxed open-air boulevard, Friday-night food market, two supermarkets. It\'s where Patong visitors taxi to for a serious meal."}</p>
          </section>

          <section className="rounded-2xl bg-thailand-red/5 border-2 border-thailand-red p-6">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Waar overnachten in Bang Tao' : 'Where to stay in Bang Tao'}</h2>
            <p className="text-gray-700 leading-relaxed mb-3">{isNl ? "Drie tiers: Laguna luxe ($300–800+: Banyan Tree, Angsana Laguna, Dusit Thani Laguna, Cassia), mid-range Boat Avenue-strook ($90–200: Hilton Garden Inn, Centara Grand West Sands), en goedkoper landinwaarts ($60–120 voor 3-sterren guesthouses). Slimste pick voor de meeste reizigers: Hilton Garden Inn — Laguna-prijzen vermijden zonder de dining-strook te missen." : "Three tiers: Laguna luxury ($300–800+: Banyan Tree, Angsana Laguna, Dusit Thani Laguna, Cassia), mid-range Boat Avenue strip ($90–200: Hilton Garden Inn, Centara Grand West Sands), cheaper inland ($60–120 for 3-star guesthouses). Smartest pick for most travelers: Hilton Garden Inn — avoiding Laguna prices without missing the dining strip."}</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/phuket/bang-tao/hotels/" className="inline-flex items-center rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">{isNl ? '🏨 Vergelijk Bang Tao hotels' : '🏨 Compare Bang Tao hotels'} →</Link>
              <a href={withSubId(partners.trip_hotels.partnerUrl, placement('wts'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? 'Live Trip.com tarieven' : 'Live Trip.com rates'} →</a>
            </div>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Wat te doen op Bang Tao' : 'Things to do at Bang Tao'}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100"><h3 className="font-heading text-lg font-bold text-gray-900 mb-2">Boat Avenue dining</h3><p className="text-gray-700 text-sm leading-relaxed">{isNl ? '50+ restaurants over 600 m. Reserveer Catch Beach Club voor sunset, Bampot voor mediterrane fine dining, Black Ginger voor traditioneel Thais.' : '50+ restaurants over 600 m. Book Catch Beach Club for sunset, Bampot for Mediterranean fine dining, Black Ginger for traditional Thai.'}</p></div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100"><h3 className="font-heading text-lg font-bold text-gray-900 mb-2">Catch Beach Club</h3><p className="text-gray-700 text-sm leading-relaxed">{isNl ? "Phuket's bekendste beach club — DJ\'s, infinity-pool aan zee, ligbedjes met minimum-besteding $40. Perfect voor sunset, niet kindvriendelijk." : "Phuket\'s best-known beach club — DJs, infinity pool by the sea, loungers with $40 minimum spend. Perfect for sunset, not kid-friendly."}</p></div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100"><h3 className="font-heading text-lg font-bold text-gray-900 mb-2">Laguna-shuttles + boten</h3><p className="text-gray-700 text-sm leading-relaxed">{isNl ? 'Gratis shuttle voor verblijvers in elk Laguna-hotel, tussen alle 5 properties + naar Boat Avenue. Bootjes door de tropische lagune zijn een familiehit.' : 'Free shuttle for guests of any Laguna hotel, between all 5 properties + to Boat Avenue. Boats through the tropical lagoon are a family hit.'}</p></div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100"><h3 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? 'Vrijdag night market' : 'Friday night market'}</h3><p className="text-gray-700 text-sm leading-relaxed">{isNl ? 'Boat Avenue elke vrijdag 17–22u — streetfood ($1–3 per dish), live muziek, kleding/souvenirs, lokaalbier $2.' : 'Boat Avenue every Friday 17:00–22:00 — street food ($1–3 a dish), live music, clothes/souvenirs, local beer $2.'}</p></div>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href={withSubId(partners.gyg_pillar.partnerUrl, placement('todo-gyg'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-[#1B9E3E] text-white px-5 py-2 text-sm font-semibold hover:bg-[#157a30]">{isNl ? 'GetYourGuide trips' : 'GetYourGuide trips'} →</a>
              <a href={withSubId(partners.viator_pillar.partnerUrl, placement('todo-viator'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-white text-gray-900 border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50">Viator →</a>
            </div>
          </section>

          <section className="rounded-2xl bg-amber-50 border border-amber-200 p-6">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Hoe kom je in Bang Tao' : 'Getting to Bang Tao'}</h2>
            <ul className="space-y-3 text-gray-800 text-sm">
              <li><strong>{isNl ? 'Vanaf Phuket Airport (HKT)' : 'From Phuket Airport (HKT)'}:</strong> {isNl ? '17 km, 25 min, taxi $15–20. Dichterbij dan elk ander hoofdstrand.' : '17 km, 25 min, taxi $15–20. Closer than any other main beach.'}</li>
              <li><strong>{isNl ? 'Vanaf Patong' : 'From Patong'}:</strong> {isNl ? '25 km, 35–40 min, taxi $20–30 of songthaew $6–8 (laatste vertrek 17u).' : '25 km, 35–40 min, taxi $20–30 or songthaew $6–8 (last departure 17:00).'}</li>
              <li><strong>{isNl ? 'Vanaf Kamala/Surin' : 'From Kamala/Surin'}:</strong> {isNl ? '5–7 km, 10–15 min, songthaew $4 of taxi $7–10.' : '5–7 km, 10–15 min, songthaew $4 or taxi $7–10.'}</li>
              <li><strong>{isNl ? 'Scooter' : 'Scooter'}:</strong> {isNl ? '$8–12/dag. Vanaf Patong: cliff-route via Kamala (mooi), 30 min. Internationaal rijbewijs verplicht.' : '$8–12/day. From Patong: cliff route via Kamala (scenic), 30 min. International driving permit required.'}</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Wanneer naar Bang Tao' : 'When to visit Bang Tao'}</h2>
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
              <Link href="/phuket/bang-tao/hotels/" className="rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">{isNl ? '🏨 Bang Tao hotels' : '🏨 Bang Tao hotels'}</Link>
              <Link href="/phuket/kamala/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏝️ Kamala' : '🏝️ Kamala'}</Link>
              <Link href="/phuket/surin/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏝️ Surin' : '🏝️ Surin'}</Link>
              <Link href="/phuket/kata/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏝️ Kata' : '🏝️ Kata'}</Link>
              <Link href="/best-hotels/phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏨 Alle Phuket hotels' : '🏨 All Phuket hotels'}</Link>
              <Link href="/yacht-charter-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '⛵ Yacht charter' : '⛵ Yacht charter'}</Link>
              <Link href="/city/phuket/" className="rounded-full bg-white text-gray-900 border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50">{isNl ? '📖 Phuket reisgids' : '📖 Phuket travel guide'}</Link>
              <a href={withSubId(KLOOK_GENERIC, placement('mesh-klook'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">{isNl ? '🎟️ Andere activiteiten' : '🎟️ Other activities'}</a>
            </div>
          </section>

          <section className="rounded-2xl bg-gray-50 border border-gray-200 p-6 text-sm text-gray-700">
            <h2 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? 'Hoe we Bang Tao beoordelen' : 'How we evaluate Bang Tao'}</h2>
            <p>{isNl ? 'Tarieven en hotelinformatie geverifieerd in mei 2026 op Trip.com, Klook, GetYourGuide en Viator. Strand-condities op basis van DNP-data 2020–2025. Boat Avenue restaurant-info gevalideerd via 2024–2025 Tripadvisor reviews.' : "Rates and hotel info verified May 2026 on Trip.com, Klook, GetYourGuide and Viator. Beach conditions from DNP data 2020–2025. Boat Avenue restaurant info validated via 2024–2025 Tripadvisor reviews."}</p>
          </section>
        </main>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const file = path.join(process.cwd(), 'data', 'pseo', 'areas', 'bang-tao-partners.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  return { props: { partners: data.partners, lastUpdated: data.lastUpdated }, revalidate: 604800 };
};
