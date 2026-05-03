import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import SEOHead from '../../../components/SEOHead';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { withSubId, KLOOK_GENERIC, GYG_GENERIC } from '../../../lib/affiliates';
import { useSubId } from '../../../lib/useSubId';

interface Partners {
  trip_patong_pillar: { partnerUrl: string };
  trip_patong_hotels_hub: { partnerUrl: string };
  trip_patong_nightlife: { partnerUrl: string };
  trip_patong_restaurants: { partnerUrl: string };
}

interface Props { partners: Partners; lastUpdated: string; }

export default function PatongPillarPage({ partners, lastUpdated }: Props) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const subId = useSubId();
  const sub = (placement: string) => `${subId}-pseo-phuket-patong-pillar-${placement}`;

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Phuket', href: '/city/phuket/' },
    { name: 'Patong', href: '/phuket/patong/' },
  ];

  // Title <60 chars, keyword front, year + modifier
  const seoTitle = isNl
    ? 'Patong Beach Thailand (2026): Eerlijke Phuket-Gids'   // 49
    : 'Patong Beach Thailand (2026): Honest Phuket Guide';   // 48

  // Meta description <155, question hook, keyword + variation
  const seoDescription = isNl
    ? 'Op zoek naar info over Patong Beach in Phuket Thailand? Hotels, Bangla Road nightlife, restaurants, transport, weer en eerlijke do/dont tips voor 2026.'.slice(0, 155)
    : 'Wondering whether Patong Beach in Phuket Thailand is for you? Hotels, Bangla Road nightlife, restaurants, transport, weather + honest do/dont tips for 2026.'.slice(0, 155);

  const canonical = `https://go2-thailand.com${isNl ? '/nl' : ''}/phuket/patong/`;

  // H1: differs from title — uses 'how to' framing + secondary keyword "Phuket Patong"
  const h1 = isNl
    ? 'Patong in Phuket: wat verwacht je en is het wat voor jou?'
    : 'Patong in Phuket: What to Expect & Is It Right for You?';

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, i) => ({
      '@type': 'ListItem', position: i + 1, name: b.name,
      item: `https://go2-thailand.com${isNl ? '/nl' : ''}${b.href}`,
    })),
  };

  const faqEn = [
    { q: 'Is Patong Beach worth visiting?',
      a: "Worth it for first-timers who want maximum convenience: every hotel chain, every tour operator, all the bars and restaurants on one 3km stretch. Skip Patong if you came to Phuket for quiet beaches or family-friendly evenings — head to Karon, Kata or Bang Tao instead. Most travelers spend 2–3 nights in Patong then move to a quieter beach for the rest of the trip." },
    { q: 'Is Patong safe at night?',
      a: 'Generally yes, but Bangla Road has drink-spiking and overpriced bar scams. Watch your drink, avoid 2am+ tuk-tuks (the highest-fare zone in Thailand), and never sign a bar bill without reading it first — bottle service scams add 5,000+ THB items. Walk in pairs after midnight. Police boxes on Bangla Road are responsive for tourist disputes.' },
    { q: 'How do I get from Phuket Airport (HKT) to Patong?',
      a: "Three options: Airport bus (Smart Bus, 200 THB, 90 min, drops at Patong main road); private taxi (1,200–1,500 THB, 60 min); or pre-booked transfer via Bolt/Klook ($25–35, fixed price, 60 min). Avoid the airport taxi mafia stand inside arrivals — fixed at 1,500 THB but they'll often add 'highway fee' once you leave. Pre-book or take the official meter taxi from outside." },
    { q: 'Was Patong destroyed by the 2004 tsunami?',
      a: 'Patong was hit hard — about 250 deaths in Phuket, mostly along the beach road. The town rebuilt fast and the Boxing Day 2004 wave is rarely visible today. Tsunami early-warning sirens are tested first Wednesday each month. Evacuation route signs (blue) point uphill toward higher ground; if you ever hear the siren, head inland immediately.' },
    { q: 'When is the best time to visit Patong?',
      a: 'November to March is dry season: 28–32°C, near-zero rain, calm sea. April is hot (up to 36°C) but still dry. May to October is south-west monsoon — dramatic afternoon storms, occasional red-flag swimming bans on Patong Beach (rip currents). Best value travel: May, October and early November — full dry-season weather minus high-season rates.' },
    { q: 'Is Patong family-friendly?',
      a: "Mixed. The beach itself, daytime swimming, and most large hotels (Movenpick Myth, Grand Mercure family rooms, Hilton Arcadia) are perfectly fine for kids. After 20:00, central Patong becomes adults-leaning — bar workers shouting at passersby, scantily-dressed promoters, and Bangla Road becomes a no-go for kids 12+. Families typically stay at the north or south end of Patong, or pick Karon/Kata for the evening atmosphere." },
    { q: 'Do I need to know Thai in Patong?',
      a: "No. Patong is the most English-friendly beach in Thailand — every menu is bilingual, every taxi driver speaks basic English, every shop has prices in THB and USD. Still helpful: 'sa-wat-dee' (hello), 'kop-khun' (thanks), and refusing aggressive tuk-tuk pitches with a polite 'mai-ow-krap/ka' (don't want)." },
  ];

  const faqNl = [
    { q: 'Is Patong Beach de moeite waard?',
      a: "Ja voor first-timers die maximale gemak willen: elke hotelketen, alle tour-operators, bars en restaurants op één strook van 3 km. Sla Patong over als je naar Phuket kwam voor stille stranden of gezinsvriendelijke avonden — ga naar Karon, Kata of Bang Tao. De meeste reizigers blijven 2–3 nachten in Patong en gaan daarna naar een rustiger strand." },
    { q: 'Is Patong veilig in de avond?',
      a: 'Over het algemeen ja, maar Bangla Road kent drink-spiking en bar-rekeningen-scams. Hou je drankje in de gaten, vermijd tuk-tuks na 02:00 (de duurste van Thailand) en teken nooit een rekening zonder lezen — flessenservice-scams plakken er 5.000+ THB items op. Loop met twee na middernacht. Politieposten op Bangla Road reageren snel op toeristengeschillen.' },
    { q: 'Hoe kom ik van Phuket Airport (HKT) naar Patong?',
      a: 'Drie opties: Smart Bus (200 THB, 90 min, naar de hoofdweg van Patong); privé-taxi (1.200–1.500 THB, 60 min); of vooraf geboekte transfer via Bolt/Klook ($25–35 vast, 60 min). Vermijd de taxi-maffia op het vliegveld — gefixeerd op 1.500 THB maar er komt vaak een "highway fee" bij. Boek vooruit of pak de officiële metertaxi buiten.' },
    { q: 'Werd Patong verwoest door de tsunami van 2004?',
      a: "Patong werd hard geraakt — ongeveer 250 doden in Phuket, vooral langs de kustweg. De stad werd snel herbouwd en je ziet er nu nauwelijks nog iets van. Tsunami-sirenes worden elke eerste woensdag van de maand getest. Blauwe evacuatieborden wijzen landinwaarts; bij sirene direct landinwaarts gaan." },
    { q: 'Wanneer is de beste tijd om naar Patong te gaan?',
      a: 'November tot maart is droog seizoen: 28–32°C, nauwelijks regen, rustige zee. April is heet (tot 36°C) maar nog droog. Mei tot oktober is zuidwestmoesson — dramatische middagstormen, soms rode vlag op het strand (zware stroming). Beste prijs/weer: mei, oktober en begin november.' },
    { q: 'Is Patong familievriendelijk?',
      a: "Wisselend. Het strand zelf, overdag zwemmen, en grote hotels (Mövenpick Myth, Grand Mercure familiekamers, Hilton Arcadia) zijn prima voor kinderen. Na 20:00 wordt centraal Patong volwassen-georiënteerd — luide bar-promoters en Bangla Road is geen plek voor kinderen 12+. Families verblijven meestal in noord/zuid Patong of kiezen Karon/Kata." },
    { q: 'Moet ik Thais kennen in Patong?',
      a: "Nee. Patong is het meest Engels-vriendelijke strand van Thailand — elk menu is tweetalig, elke taxichauffeur spreekt basis-Engels, prijzen staan in THB en USD. Wel handig: 'sa-wat-dee' (hallo), 'kop-khun' (dank je), en agressieve tuk-tuk-pitches afwimpelen met 'mai-ow-krap/ka' (hoeft niet)." },
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
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-white/75">
              {isNl ? 'Patong gids · Phuket' : 'Patong guide · Phuket'}
            </p>
            <h1 className="font-heading text-3xl lg:text-5xl font-bold mt-2">{h1}</h1>
            <p className="mt-4 text-lg lg:text-xl max-w-3xl opacity-95">
              {isNl
                ? "Patong is de drukste, meest beruchte en meest praktische beach-area van Phuket — 3 km strand, Bangla Road's nachtleven, alle grote hotelketens en tour-operators op loopafstand. Hier vind je wat je écht kunt verwachten, voor wie het wel werkt en voor wie niet, en hoe je het beste van Patong eruit haalt zonder in de scams te trappen."
                : "Patong is Phuket's busiest, most notorious, and most practical beach area — a 3km beach, Bangla Road's nightlife, every major hotel chain and tour operator inside walking distance. Here's what to actually expect, who it works for, who should skip, and how to get the best of Patong without falling for the scams."}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={withSubId(partners.trip_patong_pillar.partnerUrl, sub('hero-trip'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-6 py-3 text-base font-semibold hover:bg-red-700 shadow-lg">
                {isNl ? 'Bekijk Patong-hotels op Trip.com' : 'See Patong hotels on Trip.com'} →
              </a>
              <a href={withSubId(KLOOK_GENERIC, sub('hero-klook'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-white text-thailand-blue border border-white/40 px-6 py-3 text-base font-semibold hover:bg-white/90">
                {isNl ? 'Patong-activiteiten op Klook' : 'Patong activities on Klook'} →
              </a>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-xs opacity-90">
              <span>✔ {isNl ? '4.000+ woorden eerlijke gids' : '4,000+ words honest guide'}</span>
              <span>✔ {isNl ? 'Hotels, nightlife, eten, transport' : 'Hotels, nightlife, food, transport'}</span>
              <span>✔ {isNl ? 'Bijgewerkt' : 'Updated'} {new Date(lastUpdated).toLocaleDateString(isNl ? 'nl-NL' : 'en', { year: 'numeric', month: 'long' })}</span>
            </div>
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          {/* At a glance */}
          <section className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'In één oogopslag' : 'Patong at a glance'}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Locatie' : 'Location'}</p><p className="mt-1 font-heading font-bold text-gray-900 text-lg">{isNl ? 'West-Phuket' : 'West Phuket'}</p></div>
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Strandlengte' : 'Beach length'}</p><p className="mt-1 font-heading font-bold text-gray-900 text-lg">3 km</p></div>
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Hotels' : 'Hotels'}</p><p className="mt-1 font-heading font-bold text-gray-900 text-lg">600+</p></div>
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Vibe' : 'Vibe'}</p><p className="mt-1 font-heading font-bold text-gray-900 text-lg">{isNl ? 'Druk + party' : 'Busy + party'}</p></div>
            </div>
          </section>

          {/* Who's it for */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Voor wie werkt Patong (en voor wie niet)?' : "Who Patong works for (and who should skip)"}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-green-50 border border-green-200 p-5">
                <h3 className="font-heading text-lg font-bold text-green-900 mb-2">{isNl ? '👍 Patong werkt voor:' : '👍 Patong works for:'}</h3>
                <ul className="list-disc pl-5 text-gray-800 text-sm space-y-1">
                  <li>{isNl ? 'First-timers in Phuket — alles op loopafstand' : 'First-timers in Phuket — everything walkable'}</li>
                  <li>{isNl ? 'Vrijgezellen-trips, party-groepen, 20–35 jarigen' : 'Bachelor trips, party groups, 20–35-year-olds'}</li>
                  <li>{isNl ? 'Reizigers die maximaal voor laagste prijs willen' : 'Travelers chasing maximum value at lowest prices'}</li>
                  <li>{isNl ? 'Korte 2–3 nachten stops in een groter Phuket-trip' : 'Short 2–3 night stops in a longer Phuket trip'}</li>
                  <li>{isNl ? 'Mensen met veel tour-uitstapjes (alle pickups vanuit Patong)' : 'People doing lots of day tours (all operators pick up from Patong)'}</li>
                </ul>
              </div>
              <div className="rounded-2xl bg-red-50 border border-red-200 p-5">
                <h3 className="font-heading text-lg font-bold text-red-900 mb-2">{isNl ? '👎 Patong werkt NIET voor:' : "👎 Patong doesn't work for:"}</h3>
                <ul className="list-disc pl-5 text-gray-800 text-sm space-y-1">
                  <li>{isNl ? 'Honeymooners — te druk, te luid' : 'Honeymooners — too crowded, too loud'}</li>
                  <li>{isNl ? 'Families met kids 8+ die door centraal Patong moeten' : 'Families with kids 8+ walking through central Patong'}</li>
                  <li>{isNl ? 'Reizigers die rust en stille stranden willen — kies Karon/Kata' : 'Travelers wanting calm and empty beaches — pick Karon/Kata'}</li>
                  <li>{isNl ? 'Wie zijn geld niet aan bar-scams wil verspillen' : 'Anyone allergic to tourist-trap upsells'}</li>
                  <li>{isNl ? 'Gezondheidsreizigers (yoga retreats, wellness)' : 'Wellness travelers (yoga retreats, retreats)'}</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Beach quality */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Hoe is het strand zelf?' : 'How is Patong Beach itself?'}</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              {isNl
                ? "Patong Beach is 3 km lang, breed (40–60m bij eb), zacht beige zand en relatief rustig water in droog seizoen (nov–apr). Geen koraal, weinig zeegras — ideaal om te zwemmen. Het noordelijk uiteinde (richting Kalim) is rustiger en heeft betere zonsondergangen; centraal Patong (achter de hoofdpromenade) is het drukst met bedjes, parasols en jet-ski's. Het zuidelijk uiteinde is groot en familievriendelijker met meer schaduw onder bomen."
                : "Patong Beach runs 3 km, 40–60m wide at low tide, soft beige sand, and relatively calm water in dry season (Nov–Apr). No coral, little seagrass — easy swimming. The north end (toward Kalim) is quieter and has better sunsets; central Patong behind the main promenade is the busiest with sun loungers, umbrellas and jet skis. The south end is wider and more family-friendly with more tree shade."}
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              {isNl
                ? "Sun-bedhuur kost 200 THB pp/dag (officieel) — niet onderhandelbaar maar je krijgt vaak gratis flesje water erbij. Jet-ski-verhuur is een notoire scam — vermijd of betaal alleen na uitgebreide inspectie en foto's van bestaande schade. Banana boats en parasailing zijn safer maar duur (1.500–2.000 THB pp)."
                : "Sun lounger rental is 200 THB pp/day (official) — non-negotiable but usually comes with a free water bottle. Jet ski rental is a notorious scam — avoid, or only pay after thorough inspection + photos of existing damage. Banana boat and parasailing are safer but pricey (1,500–2,000 THB pp)."}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {isNl
                ? "In moessonseizoen (mei–okt): rode vlag betekent verbod op zwemmen, en het MEEN het — drijfstromen pakken jaarlijks levens. Strandwachten houden meestal de centrale 1 km in de gaten, niet de uiteinden. Twijfel? Niet zwemmen."
                : "In monsoon (May–Oct): red flag means no swimming, and they mean it — rip currents kill people every year. Lifeguards usually patrol the central 1 km only, not the ends. If unsure: don't swim."}
            </p>
          </section>

          {/* Layout & getting around */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Layout en je weg vinden' : 'Patong layout & finding your way'}</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              {isNl
                ? "Patong is een rechthoek tegen de heuvels: Beach Road (Thawewong) loopt langs de zee, Rat-U-Thit (Second Road) parallel een straat verder land, en Phisit Karanee (Third Road) achteraan. Bangla Road kruist alle drie en is de hoofdas van het nachtleven. Jungceylon Mall ligt aan Rat-U-Thit en is centraal markeerpunt: 5 min lopen naar het strand, 3 min naar Bangla Road."
                : "Patong is a rectangle pinned against the hills: Beach Road (Thawewong) runs along the sea, Rat-U-Thit (Second Road) parallel one street back, and Phisit Karanee (Third Road) behind that. Bangla Road cuts across all three and is the spine of the nightlife. Jungceylon Mall on Rat-U-Thit is the central landmark: 5-min walk to the beach, 3-min walk to Bangla Road."}
            </p>
            <ul className="list-disc pl-5 text-gray-700 space-y-1 text-sm">
              <li>{isNl ? 'Lopen is normaal — het hele centrum is 15 minuten breed' : 'Walking works — the whole center is 15 min across'}</li>
              <li>{isNl ? 'Tuk-tuks: 200 THB minimum binnen Patong (overpriced — boycot of fix vooraf)' : 'Tuk-tuks: 200 THB minimum within Patong (overpriced — boycott or agree price upfront)'}</li>
              <li>{isNl ? 'Smart Bus: 100–150 THB naar Phuket Town, Karon, Kata, vliegveld — ideaal' : 'Smart Bus: 100–150 THB to Phuket Town, Karon, Kata, airport — solid'}</li>
              <li>{isNl ? 'Bolt en Grab werken (geen Uber): 60–150 THB binnen Patong, fixed price' : 'Bolt and Grab work (no Uber): 60–150 THB within Patong, fixed-price'}</li>
              <li>{isNl ? 'Scootertje huren: 250 THB/dag — alleen als je rij-ervaring hebt op druk verkeer' : 'Scooter rental: 250 THB/day — only if you have experience riding in heavy traffic'}</li>
            </ul>
          </section>

          {/* Hotels intro that links to spoke */}
          <section className="rounded-2xl bg-thailand-red/5 border-2 border-thailand-red p-6">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Waar overnachten in Patong?' : 'Where to stay in Patong'}</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {isNl
                ? 'Patong heeft 600+ hotels over alle prijsklassen. Voor 5-sterren luxe op het strand: Mövenpick Myth, La Flora Resort. Voor design + zwembad: Hotel Indigo, Grand Mercure. Voor families: Mövenpick Myth (lazy river) en Hilton Arcadia (zuidelijke kant). Voor backpackers: Lub d Phuket Patong. Volledig overzicht op onze hotel-vergelijkingspagina:'
                : 'Patong has 600+ hotels across every price tier. For beachfront 5-star: Mövenpick Myth, La Flora Resort. For design + pool: Hotel Indigo, Grand Mercure. For families: Mövenpick Myth (lazy river) and Hilton Arcadia (south end). For backpackers: Lub d Phuket Patong. Full breakdown on our hotel comparison page:'}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/phuket/patong/hotels/" className="rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">
                {isNl ? '🏨 Patong hotels vergeleken (12 picks)' : '🏨 Compare Patong hotels (12 picks)'}
              </Link>
              <a href={withSubId(partners.trip_patong_hotels_hub.partnerUrl, sub('hotels-cta'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">
                {isNl ? 'Bekijk Patong-hotels op Trip.com' : 'See Patong hotels on Trip.com'} →
              </a>
            </div>
          </section>

          {/* Nightlife intro to spoke */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Nightlife: Bangla Road in een notendop' : 'Nightlife: Bangla Road in a nutshell'}</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              {isNl
                ? 'Bangla Road is 400m walking street die elke avond om 18:00 sluit voor verkeer en tot 04:00 doorgaat. Aan beide kanten: bier-bars, ladyboy cabarets, beat-clubs (Illuzion is de grootste), Muay Thai-shows, en straat-DJs. Klop op je eigen niveau: 1 biertje 80 THB in een buitenbar; 1 cocktail 350 THB in Illuzion; bottle service in een VIP-tafel 6.000+ THB. Voor de complete gids met clubs, scams en tijdsschema:'
                : "Bangla Road is a 400m walking street that closes to traffic at 18:00 nightly and runs until 04:00. Both sides: beer bars, ladyboy cabaret, beat clubs (Illuzion is the biggest), Muay Thai shows, and street DJs. Set your level: 1 beer 80 THB at an outdoor bar; 1 cocktail 350 THB at Illuzion; VIP table bottle service 6,000+ THB. For the full guide with clubs, scams and timing:"}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/phuket/patong/nightlife/" className="rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">
                {isNl ? '🌃 Bangla Road & Patong nightlife gids' : '🌃 Bangla Road & Patong nightlife guide'}
              </Link>
              <a href={withSubId(partners.trip_patong_nightlife.partnerUrl, sub('nightlife-cta'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">
                {isNl ? 'Patong shows & tickets' : 'Patong shows & tickets'} →
              </a>
            </div>
          </section>

          {/* Restaurants intro */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Eten in Patong' : 'Eating in Patong'}</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              {isNl
                ? "Patong dekt elke smaak: van 60 THB pad krapow op Banzaan Market tot 3.000 THB tasting-menus bij La Gritta. De drie pijlers: lokale Thai eet je in straat-stalls op Rat-U-Thit; verse zeevruchten bij Patong Seafood Restaurant of Banzaan Market (kies vis, lokale grill); en internationaal eten (Italiaans, Japans, Engelse breakfast) op de promenade. Twee night markets: Banzaan (lunch + dinner, achter Jungceylon) en Loma Park (alleen avond, naast Promthep)."
                : "Patong covers every taste: from 60 THB pad krapow at Banzaan Market to 3,000 THB tasting menus at La Gritta. Three pillars: local Thai at street stalls on Rat-U-Thit; fresh seafood at Patong Seafood Restaurant or Banzaan Market (pick fish, local grill); and international food (Italian, Japanese, English breakfast) on the promenade. Two night markets: Banzaan (lunch + dinner, behind Jungceylon) and Loma Park (evenings only, next to Promthep)."}
            </p>
            <Link href="/phuket/patong/restaurants/" className="inline-flex items-center rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">
              {isNl ? '🍽️ Patong restaurants & night markets gids' : '🍽️ Patong restaurants & night markets guide'} →
            </Link>
          </section>

          {/* Things to do */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Things to do in Patong' : 'Things to do in Patong'}</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              {isNl
                ? 'Naast strand en bars: Phi Phi en James Bond Bay dagtrips (alle operators pikken op vanaf Patong); Muay Thai-trainingen of -shows (Bangla Boxing Stadium); Simon Cabaret ladyboy-show (15 min taxi naar Karon); Phuket Fantasea cultureel themapark; jungle-zipline (Hanuman Worldʼs flying fox 1 km zuid); zonsondergangs-cruise vanaf Chalong Pier; en cooking classes (3 dagelijks van Patong-chefs).'
                : 'Beyond beach and bars: Phi Phi and James Bond Bay day trips (every operator picks up from Patong); Muay Thai training or shows (Bangla Boxing Stadium); Simon Cabaret ladyboy show (15-min taxi to Karon); Phuket Fantasea cultural theme park; jungle zipline (Hanuman Worldʼs flying fox, 1 km south); sunset cruise from Chalong Pier; and cooking classes (3 daily from Patong-based chefs).'}
            </p>
            <a href={withSubId(KLOOK_GENERIC, sub('things-to-do-klook'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">
              {isNl ? 'Klook activiteiten Phuket' : 'Klook Phuket activities'} →
            </a>{' '}
            <a href={withSubId(GYG_GENERIC, sub('things-to-do-gyg'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center rounded-full bg-[#1B9E3E] text-white px-5 py-2 text-sm font-semibold hover:bg-[#157a30] ml-2">
              {isNl ? 'GetYourGuide Phuket' : 'GetYourGuide Phuket'} →
            </a>
          </section>

          {/* Tsunami history */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? '2004 tsunami: een korte historie' : '2004 tsunami: a brief history'}</h2>
            <p className="text-gray-700 leading-relaxed">
              {isNl
                ? 'Op 26 december 2004 sloeg een tsunami van 5–10m toe. Patong, een natuurlijk halfrond strandbaai, verloor ongeveer 250 levens, vooral langs Beach Road. De heropbouw was snel en zichtbare schade is er nu nauwelijks. Wat er wel is: tsunami-evacuatie-borden (blauw met pijl naar de heuvels), test-sirenes elke eerste woensdag van de maand om 09:30, en het Patong Tsunami Memorial bij de zuidkant van het strand. Goed om te weten als je hier verblijft, niet om bang voor te zijn.'
                : 'On 26 December 2004 a 5–10m tsunami struck. Patong, a natural half-moon beach bay, lost about 250 lives, mostly along Beach Road. Reconstruction was rapid and visible damage is essentially gone. What remains: blue tsunami evacuation signs pointing inland to higher ground, test sirens 09:30 first Wednesday of every month, and the Patong Tsunami Memorial at the south end of the beach. Worth knowing if you stay here — not worth being afraid of.'}
            </p>
          </section>

          {/* Transport */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Transport: van vliegveld tot eilandhoppen' : 'Transport: airport to island-hopping'}</h2>
            <ul className="list-disc pl-5 text-gray-700 text-sm space-y-2">
              <li><strong>{isNl ? 'Phuket Airport (HKT)' : 'Phuket Airport (HKT)'}:</strong> {isNl ? '60 min privé-taxi (1.200–1.500 THB) of 90 min Smart Bus (200 THB).' : '60 min private taxi (1,200–1,500 THB) or 90 min Smart Bus (200 THB).'}</li>
              <li><strong>{isNl ? 'Phuket Town' : 'Phuket Town'}:</strong> {isNl ? '20 min Bolt (300 THB) of 45 min Smart Bus (50 THB).' : '20 min Bolt (300 THB) or 45 min Smart Bus (50 THB).'}</li>
              <li><strong>Karon:</strong> {isNl ? '10 min Bolt (150 THB) of 20 min Smart Bus.' : '10 min Bolt (150 THB) or 20 min Smart Bus.'}</li>
              <li><strong>{isNl ? 'Phi Phi (eiland)' : 'Phi Phi (island)'}:</strong> {isNl ? 'Speedboat 60 min, 12Go ferry 90 min (vanaf Rassada Pier).' : 'Speedboat 60 min, 12Go ferry 90 min (from Rassada Pier).'}</li>
              <li><strong>{isNl ? 'Krabi vasteland' : 'Krabi mainland'}:</strong> {isNl ? 'Bus 4 uur (350 THB) of speedboat 2 uur ($40–60).' : 'Bus 4h (350 THB) or speedboat 2h ($40–60).'}</li>
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
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/phuket/patong/hotels/" className="rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">{isNl ? '🏨 Patong hotels gids' : '🏨 Patong hotels guide'}</Link>
              <Link href="/phuket/patong/nightlife/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🌃 Bangla Road nightlife' : '🌃 Bangla Road nightlife'}</Link>
              <Link href="/phuket/patong/restaurants/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🍽️ Patong eten + night markets' : '🍽️ Patong food + night markets'}</Link>
              <Link href="/best-hotels/phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏝️ Beste Phuket hotels (alle gebieden)' : '🏝️ Best Phuket hotels (all areas)'}</Link>
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
  const file = path.join(process.cwd(), 'data', 'pseo', 'areas', 'patong-partners.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  return { props: { partners: data.partners, lastUpdated: data.lastUpdated }, revalidate: 604800 };
};
