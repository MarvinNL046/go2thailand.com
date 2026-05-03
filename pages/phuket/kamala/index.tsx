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
interface Partners { trip_pillar: Partner; trip_hotels: Partner; klook_pillar: Partner; gyg_pillar: Partner; viator_pillar: Partner; trip_novotel: Partner; trip_sunwing: Partner; trip_sunprime: Partner; }
interface Props { partners: Partners; lastUpdated: string; }

export default function KamalaBeachPillar({ partners, lastUpdated }: Props) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const subId = useSubId();
  const placement = (p: string) => `${subId}-pseo-phuket-kamala-pillar-${p}`;

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Phuket', href: '/city/phuket/' },
    { name: 'Kamala Beach', href: '/phuket/kamala/' },
  ];

  const seoTitle = isNl ? 'Kamala Beach Phuket (2026): Familievriendelijk' : 'Kamala Beach Phuket (2026): Family-Friendly Beach Guide';
  const seoDescription = isNl
    ? 'Op zoek naar Kamala Beach? Phuket\'s rustige familiekeuze, 2 km zand, $95–280 hotels, 15 min van Patong, lokale moskeestrand-mix. Eerlijke gids 2026.'
    : 'Heading to Kamala Beach? Phuket\'s quiet family pick — 2 km of sand, $95–280 hotels, 15 min from Patong, mosque-village character. Honest 2026 guide.';
  const canonical = `https://go2-thailand.com${isNl ? '/nl' : ''}/phuket/kamala/`;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, i) => ({ '@type': 'ListItem', position: i + 1, name: b.name, item: `https://go2-thailand.com${isNl ? '/nl' : ''}${b.href}` })),
  };

  const faqEn = [
    { q: 'Is Kamala Beach better than Patong for families?', a: 'Yes for most families: quieter water, beachfront resorts not separated from the sand by a 4-lane road, no Bangla nightlife noise, walking distance to a real Thai-Muslim village rather than tourist strip. Trade-off: 70% fewer restaurant choices, no big shopping mall, and you\'ll taxi to Patong if you want variety. Most families pick Kamala happily.' },
    { q: 'How far is Kamala from Phuket Airport?', a: '25 km / 30–40 min by taxi ($20–28). Considerably closer than Kata or Karon — half the airport-transfer time. Many resorts include free transfer at booking.' },
    { q: 'When is the best time to visit Kamala Beach?', a: 'November to April (dry season): calm swimming, 28–32°C, low rain. May to October (south-west monsoon): rougher water, occasional red flags, but hotel rates 30–40% lower. Best value: late November and April. Worst: late September.' },
    { q: 'Does Kamala have nightlife?', a: 'Almost none — that\'s the point. Kamala is a Muslim-majority village, alcohol is licensed only at hotels and a handful of beachfront restaurants, no bars or clubs. For nightlife you taxi 15 min to Patong/Bangla Road. Kamala\'s "evening scene" is sunset drinks at HQ Beach Lounge or your resort.' },
    { q: 'What\'s the difference between Kamala and Surin?', a: 'Kamala has more accommodation (15+ resorts vs 5–6 in Surin), longer beach (2 km vs 800 m), and is more affordable. Surin is glossier (Twinpalms, Catch Beach Club) and pricier. Kamala for value family stays; Surin for boutique luxury or a beach club afternoon.' },
    { q: 'Is the water safe for swimming at Kamala?', a: 'Generally yes Nov–Apr — gently sloping sand, very few rips, lifeguards on duty 09:00–17:00 in high season. May–Oct can produce red-flag days; respect them. The middle of the bay is the safest swim zone; both ends have submerged rocks at low tide.' },
    { q: 'Can I walk from my Kamala hotel to restaurants?', a: 'Yes — most beachfront hotels are 5–10 min walk from the village restaurant strip (around 30 spots, mostly Thai + a few Italian/Indian). The challenge: hotels at the south end (Sunwing, Sunprime) are 15–20 min walk to the village. Their all-inclusive packages exist for this reason.' },
  ];

  const faqNl = [
    { q: 'Is Kamala Beach beter dan Patong voor families?', a: 'Voor de meeste families ja: rustiger water, beachfront-resorts niet gescheiden van zand door 4-baans weg, geen Bangla-nachtleven, loopafstand tot een échte Thais-moslimdorp. Trade-off: 70% minder restaurantkeuze, geen grote winkelmall, en je taxiet naar Patong voor variatie. Meeste families kiezen Kamala met plezier.' },
    { q: 'Hoe ver is Kamala van Phuket Airport?', a: '25 km / 30–40 min met taxi ($20–28). Aanzienlijk dichterbij dan Kata of Karon — halve transfertijd. Veel resorts hebben gratis transfer bij boeking.' },
    { q: 'Wanneer is de beste tijd voor Kamala Beach?', a: 'November tot april (droogseizoen): kalm zwemmen, 28–32°C, weinig regen. Mei tot oktober (zuidwestmoesson): ruwer water, soms rode vlaggen, maar hotelprijzen 30–40% lager. Beste value: laat-november en april. Slechtst: eind september.' },
    { q: 'Heeft Kamala nachtleven?', a: 'Bijna niets — dat is juist het punt. Kamala is een moslim-meerderheidsdorp, alcohol alleen vergund bij hotels en enkele beachfront-restaurants, geen bars of clubs. Voor nachtleven: taxi 15 min naar Patong/Bangla. De "avondscene" hier zijn sunset-drinks bij HQ Beach Lounge of je resort.' },
    { q: 'Verschil tussen Kamala en Surin?', a: 'Kamala heeft meer accommodatie (15+ resorts vs 5–6 in Surin), langer strand (2 km vs 800 m), en is betaalbaarder. Surin is luxer (Twinpalms, Catch Beach Club) en duurder. Kamala voor value-family; Surin voor boutique luxe of een beach club-middag.' },
    { q: 'Is het water veilig om te zwemmen bij Kamala?', a: 'Meestal ja nov–apr — geleidelijk aflopend zand, weinig stromingen, lifeguards van 09:00–17:00 in hoogseizoen. Mei–okt kunnen rode-vlag-dagen voorkomen; respecteer ze. Het midden van de baai is veiligst; beide uiteinden hebben verborgen rotsen bij eb.' },
    { q: 'Kan ik vanaf mijn Kamala hotel naar restaurants lopen?', a: 'Ja — meeste beachfront-hotels zijn 5–10 min lopen naar de dorpsrestaurantenstrook (ca. 30 plekken, vooral Thais + wat Italiaans/Indiaas). Uitdaging: hotels aan zuidzijde (Sunwing, Sunprime) zijn 15–20 min lopen naar het dorp — daarvoor bestaan hun all-inclusive pakketten.' },
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
            <h1 className="font-heading text-3xl lg:text-5xl font-bold mt-2">{isNl ? 'Kamala Beach Phuket: het rustige familiestrand naast Patong' : 'Kamala Beach Phuket: The Quiet Family Beach Next to Patong'}</h1>
            <p className="mt-4 text-lg lg:text-xl max-w-3xl opacity-95">{isNl ? "Kamala is wat Patong was vóór 1995 — een Thais-moslimvissersdorp dat groeide rond een 2 km strand, 15 minuten ten noorden. Geen Bangla, geen mall, wel echte familievibe en hotelbeachfront direct aan zacht-glooiend zand. Hier vind je waar te slapen, wat te doen, en waarom Kamala vaak slimmer is dan Patong voor reizigers met kinderen." : "Kamala is what Patong was before 1995 — a Thai-Muslim fishing village that grew around 2 km of sand, 15 min north. No Bangla, no mall, but real family vibe and beachfront hotels right on gently-sloping sand. Here's where to stay, what to do, and why Kamala is the smart play for travelers with kids."}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={withSubId(partners.trip_pillar.partnerUrl, placement('hero-trip'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-6 py-3 text-base font-semibold hover:bg-red-700 shadow-lg">{isNl ? 'Kamala hotels op Trip.com' : 'Kamala hotels on Trip.com'} →</a>
              <a href={withSubId(partners.klook_pillar.partnerUrl, placement('hero-klook'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-white text-thailand-blue border border-white/40 px-6 py-3 text-base font-semibold hover:bg-white/90">{isNl ? 'Activiteiten op Klook' : 'Activities on Klook'} →</a>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-xs opacity-90">
              <span>✔ {isNl ? '2 km strand' : '2 km beach'}</span>
              <span>✔ {isNl ? '15 min van Patong' : '15 min from Patong'}</span>
              <span>✔ {isNl ? 'Bijgewerkt' : 'Updated'} {new Date(lastUpdated).toLocaleDateString(isNl ? 'nl-NL' : 'en', { year: 'numeric', month: 'long' })}</span>
            </div>
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <section className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'In één oogopslag' : 'At a glance'}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Locatie' : 'Location'}</p><p className="mt-1 font-heading font-bold text-gray-900 text-lg">{isNl ? 'West, 5 km N Patong' : 'West, 5 km N of Patong'}</p></div>
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Sfeer' : 'Vibe'}</p><p className="mt-1 font-heading font-bold text-gray-900 text-lg">{isNl ? 'Familie + dorps' : 'Family + village'}</p></div>
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Beste voor' : 'Best for'}</p><p className="mt-1 font-heading font-bold text-gray-900 text-lg">{isNl ? 'Families, koppels' : 'Families, couples'}</p></div>
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Prijsklasse' : 'Price tier'}</p><p className="mt-1 font-heading font-bold text-gray-900 text-lg">$95–280</p></div>
            </div>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Het strand & het dorp' : 'Beach character & village'}</h2>
            <p className="text-gray-700 leading-relaxed mb-3">{isNl ? "Kamala-strand strekt zich 2 km uit van noord naar zuid, breder dan Patong, met fijn-poederig wit zand en zacht-glooiende oceaan. Het noordelijke uiteinde (waar Novotel staat) is rotsachtiger en rustiger. Het centrale gedeelte voor het dorp is het meest sociale stuk — een paar strandrestaurants, parasolverhuur ($5/dag), zacht zwemwater. Het zuidelijke uiteinde (Sunwing/Sunprime) is een resort-bubbel met privé-ligbedden." : "Kamala beach runs 2 km north to south, wider than Patong, fine-powder white sand and a gently-sloping ocean. The north end (where Novotel sits) is rockier and quieter. The central village section is the social stretch — a handful of beach restaurants, umbrella rentals ($5/day), calm swimming. The south end (Sunwing/Sunprime) is a resort bubble with private loungers."}</p>
            <p className="text-gray-700 leading-relaxed mb-3">{isNl ? "Het dorp zelf telt zo'n 6.000 inwoners, een moskee, een vissersmarkt (vroege ochtend), de iconische Tsunami Memorial Park, en ongeveer 30 restaurants verspreid over twee straten parallel aan het strand. Geen mall, geen 7-Eleven elke 200 m — wel een Tesco-Lotus en twee gewone supermarkten. Sfeer is meer Mediterraan-dorp dan Thaise tourist hub." : "The village itself has around 6,000 residents, a mosque, a fishing market (early morning), the iconic Tsunami Memorial Park, and about 30 restaurants across two streets parallel to the beach. No mall, no 7-Eleven every 200 m — but a Tesco-Lotus and two regular supermarkets. Vibe is closer to a Mediterranean village than a Thai tourist hub."}</p>
            <p className="text-gray-700 leading-relaxed">{isNl ? "Belangrijke noot voor families: Kamala heeft Phuket FantaSea (8 min loopafstand), het grootste cultureel-themapark op het eiland — diner-show + acrobatische show, $35–55 pp, ouders vinden het kitsch, kinderen vinden het magisch." : "Important note for families: Kamala has Phuket FantaSea (8 min walk), the island's biggest cultural theme park — dinner-show + acrobatic show, $35–55 pp, parents find it kitsch, kids find it magical."}</p>
          </section>

          <section className="rounded-2xl bg-thailand-red/5 border-2 border-thailand-red p-6">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Waar overnachten in Kamala' : 'Where to stay in Kamala'}</h2>
            <p className="text-gray-700 leading-relaxed mb-3">{isNl ? "15+ hotels van $40 guesthouses tot $400 cliff-villas. Top picks: Novotel (Accor-vertrouwen, kinderclub, $95–220), Sunwing (Scandinavische families, all-inclusive, $130–260), Sunprime (adults-only zusje van Sunwing, $140–280). Voor luxe: Andara Resort & Villas of The Cape Phuket. Kamala\'s allergrootste sterkte: bijna elk hotel heeft een directe stranddoorgang, geen 4-baans weg ertussen zoals in Patong." : "15+ hotels from $40 guesthouses to $400 cliff villas. Top picks: Novotel (Accor reliability, kids' club, $95–220), Sunwing (Scandinavian family all-inclusive, $130–260), Sunprime (adults-only sister to Sunwing, $140–280). For luxury: Andara Resort & Villas or The Cape Phuket. Kamala's biggest strength: almost every hotel has a direct beach passage, no 4-lane road like Patong."}</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/phuket/kamala/hotels/" className="inline-flex items-center rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">{isNl ? '🏨 Vergelijk Kamala hotels' : '🏨 Compare Kamala hotels'} →</Link>
              <a href={withSubId(partners.trip_hotels.partnerUrl, placement('wts-trip'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? 'Live Trip.com tarieven' : 'Live Trip.com rates'} →</a>
            </div>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Wat te doen op Kamala' : 'Things to do at Kamala'}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100"><h3 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? 'Phuket FantaSea' : 'Phuket FantaSea'}</h3><p className="text-gray-700 text-sm leading-relaxed">{isNl ? 'Acrobatische cultuur-show + diner buffet. 19:30–22:00. $35–55 pp. Boek online voor 30% korting. 8 min lopen vanaf hoofdstrand.' : 'Acrobatic cultural show + dinner buffet. 19:30–22:00. $35–55 pp. Book online for 30% off. 8 min walk from main beach.'}</p></div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100"><h3 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? 'Tsunami Memorial Park' : 'Tsunami Memorial Park'}</h3><p className="text-gray-700 text-sm leading-relaxed">{isNl ? 'Aan de noordzijde — herinnering aan 2004. Stilte-park, bordjes met getuigenverhalen, 15 min serieuze pauze van strandvakantie.' : 'On the north end — 2004 memorial. Quiet park, witness-story signs, 15 min serious pause from beach holiday.'}</p></div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100"><h3 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? 'HQ Beach Lounge' : 'HQ Beach Lounge'}</h3><p className="text-gray-700 text-sm leading-relaxed">{isNl ? 'Beach club aan zuidzijde Kamala — beste sunset-cocktails op het strand, ligbedjes $15/dag minimum besteed. Niet kindvriendelijk.' : "Beach club at south Kamala — best sunset cocktails on sand, loungers $15/day min spend. Not kid-friendly."}</p></div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100"><h3 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? 'Snorkelen + dagtocht naar Phi Phi' : 'Snorkeling + Phi Phi day trip'}</h3><p className="text-gray-700 text-sm leading-relaxed">{isNl ? 'Geen pier op Kamala — speedboats vertrekken vanaf Patong (15 min taxi). Kamala-resorts regelen pickup.' : 'No pier at Kamala — speedboats depart Patong (15 min taxi). Kamala resorts arrange pickup.'}</p></div>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href={withSubId(partners.gyg_pillar.partnerUrl, placement('todo-gyg'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-[#1B9E3E] text-white px-5 py-2 text-sm font-semibold hover:bg-[#157a30]">{isNl ? 'GetYourGuide trips' : 'GetYourGuide trips'} →</a>
              <a href={withSubId(partners.viator_pillar.partnerUrl, placement('todo-viator'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-white text-gray-900 border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50">Viator →</a>
            </div>
          </section>

          <section className="rounded-2xl bg-amber-50 border border-amber-200 p-6">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Hoe kom je in Kamala' : 'Getting to Kamala'}</h2>
            <ul className="space-y-3 text-gray-800 text-sm">
              <li><strong>{isNl ? 'Vanaf Phuket Airport (HKT)' : 'From Phuket Airport (HKT)'}:</strong> {isNl ? '25 km, 30–40 min, taxi $20–28 of pre-booked transfer $18–22.' : '25 km, 30–40 min, taxi $20–28 or pre-booked transfer $18–22.'}</li>
              <li><strong>{isNl ? 'Vanaf Patong' : 'From Patong'}:</strong> {isNl ? '5 km, 15 min, songthaew $4 of taxi $8–10. Beste route: cliff-weg met zicht op Patong-baai.' : '5 km, 15 min, songthaew $4 or taxi $8–10. Best route: cliff road with views of Patong bay.'}</li>
              <li><strong>{isNl ? 'Vanaf Surin/Bang Tao' : 'From Surin/Bang Tao'}:</strong> {isNl ? '4 km / 10 min — fietsbaar of korte taxi $5–7.' : '4 km / 10 min — bikeable or short taxi $5–7.'}</li>
              <li><strong>{isNl ? 'Scooter' : 'Scooter'}:</strong> {isNl ? '$8–12/dag. Internationaal rijbewijs verplicht — politie checkt op Patong-Kamala route.' : '$8–12/day. International driving permit required — police check the Patong-Kamala route.'}</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Wanneer naar Kamala' : 'When to visit Kamala'}</h2>
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
              <Link href="/phuket/kamala/hotels/" className="rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">{isNl ? '🏨 Kamala hotels' : '🏨 Kamala hotels'}</Link>
              <Link href="/phuket/kata/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏝️ Kata Beach' : '🏝️ Kata Beach'}</Link>
              <Link href="/phuket/bang-tao/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏝️ Bang Tao' : '🏝️ Bang Tao'}</Link>
              <Link href="/phuket/surin/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏝️ Surin' : '🏝️ Surin'}</Link>
              <Link href="/best-hotels/phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏨 Alle Phuket hotels' : '🏨 All Phuket hotels'}</Link>
              <Link href="/yacht-charter-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '⛵ Yacht charter' : '⛵ Yacht charter'}</Link>
              <Link href="/city/phuket/" className="rounded-full bg-white text-gray-900 border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50">{isNl ? '📖 Phuket reisgids' : '📖 Phuket travel guide'}</Link>
              <a href={withSubId(KLOOK_GENERIC, placement('mesh-klook'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">{isNl ? '🎟️ Andere activiteiten' : '🎟️ Other activities'}</a>
            </div>
          </section>

          <section className="rounded-2xl bg-gray-50 border border-gray-200 p-6 text-sm text-gray-700">
            <h2 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? 'Hoe we Kamala beoordelen' : 'How we evaluate Kamala'}</h2>
            <p>{isNl ? 'Tarieven en hotelinformatie geverifieerd in mei 2026 op Trip.com, Klook, GetYourGuide en Viator. Strand-condities op basis van DNP-data en lifeguard-records 2020–2025. Commissies via genoemde platforms — geen invloed op prijzen of welke hotels we noemen.' : "Rates and hotel info verified May 2026 on Trip.com, Klook, GetYourGuide and Viator. Beach conditions from DNP data and lifeguard records 2020–2025. Commissions via the listed platforms — no impact on prices or which hotels we cover."}</p>
          </section>
        </main>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const file = path.join(process.cwd(), 'data', 'pseo', 'areas', 'kamala-partners.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  return { props: { partners: data.partners, lastUpdated: data.lastUpdated }, revalidate: 604800 };
};
