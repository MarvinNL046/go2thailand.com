import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import SEOHead from '../../../components/SEOHead';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { withSubId, KLOOK_GENERIC, TRIP_GENERIC } from '../../../lib/affiliates';
import { useSubId } from '../../../lib/useSubId';

interface Partner { partnerUrl: string; label: string; }
interface Partners {
  trip_pillar: Partner;
  trip_hotels: Partner;
  klook_pillar: Partner;
  gyg_pillar: Partner;
  viator_pillar: Partner;
  klook_surfing: Partner;
  gyg_surfing: Partner;
  trip_kata_noi: Partner;
  klook_kata_noi: Partner;
}

interface Props { partners: Partners; lastUpdated: string; }

export default function KataBeachPillar({ partners, lastUpdated }: Props) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const subId = useSubId();
  const placement = (p: string) => `${subId}-pseo-phuket-kata-pillar-${p}`;

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Phuket', href: '/city/phuket/' },
    { name: 'Kata Beach', href: '/phuket/kata/' },
  ];

  const seoTitle = isNl
    ? 'Kata Beach Phuket (2026): Surfen, Strand & Hotels'
    : 'Kata Beach Phuket (2026): Surf, Sand & Where to Stay';
  const seoDescription = isNl
    ? 'Op zoek naar info over Kata Beach? Phuket\'s enige surfstrand (mei–okt), kalm zwemwater nov–apr, $95–280 hotels, 7 km zuidelijk van Patong. Volledige gids 2026.'
    : 'Heading to Kata Beach? Phuket\'s only true surf beach (May–Oct), calm swimming Nov–Apr, $95–280 hotels, 7 km south of Patong. Honest 2026 guide inside.';
  const canonical = `https://go2-thailand.com${isNl ? '/nl' : ''}/phuket/kata/`;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, i) => ({
      '@type': 'ListItem', position: i + 1, name: b.name,
      item: `https://go2-thailand.com${isNl ? '/nl' : ''}${b.href}`,
    })),
  };

  const faqEn = [
    { q: 'Is Kata Beach better than Patong for families?', a: "Yes — calmer water in dry season (Nov–Apr), shorter beach (1.5 km vs 3 km Patong) so easier to find your group, no Bangla Road noise, hotels closer to a small village rather than a 24/7 entertainment strip. Trade-off: 60% fewer restaurant options and almost no nightlife. Most families pick Kata over Patong without regret." },
    { q: 'When is the best time to visit Kata Beach?', a: 'November to April (dry season): calm swimming water, 28–32°C, low rain. May to October (south-west monsoon): rougher surf — this is Kata\'s only true selling point versus Karon and Kamala. Surfboard rentals open May, peak surf July–September. Avoid: late September/early October (wettest). Best value: late November and April.' },
    { q: 'How far is Kata Beach from Phuket Airport?', a: 'About 45 km, 60–80 min by taxi or pre-booked transfer ($25–35). Airport bus to Phuket Town then taxi: $7–10 total but takes 2 h. Many resorts include free or paid airport transfers — check at booking.' },
    { q: 'Can you actually surf at Kata Beach?', a: 'Yes — Kata is the only Phuket beach with consistent surf May–October (south-west monsoon swell). Wave height typically 1–1.5 m, occasional 2 m days July–September. Six surf schools rent boards ($10/hr or $20/day) and run lessons ($35–50 for 2 hours). Reef is mostly sand — beginner-friendly. Outside May–October there\'s no surf at all.' },
    { q: 'What is the difference between Kata and Kata Noi?', a: 'Kata (Kata Yai) is the main 1.5-km crescent with the village, restaurants, and most hotels. Kata Noi is a smaller 700 m beach over the southern headland — quieter, fewer restaurants, dominated by Katathani Phuket Beach Resort. Both are equally good for swimming. Kata Noi has slightly bigger surf June–September because of the headland funnel effect.' },
    { q: 'Is Kata Beach walkable to restaurants and shops?', a: 'Yes — the village is compact, you can walk from any beachfront hotel to 30+ restaurants, the morning market, surf schools, and a few rooftop bars in 5–10 min. Songthaew tuk-tuks run to Karon (10 min) and Patong (20 min) for $5–8. Walking from Kata to Karon along the beach takes 25 min at low tide.' },
    { q: 'How much does Kata Beach cost per day for a couple?', a: 'Budget: $80/day (guesthouse, hawker meals, beach lunch, no taxis). Mid-range (most travelers): $150–220/day (4-star hotel, 2 restaurants, 1 activity). Comfort: $300+/day (beachfront hotel, fine dining, private taxi). Surf-camp week (lessons + budget hotel): $400–600 all-in.' },
  ];

  const faqNl = [
    { q: 'Is Kata Beach beter dan Patong voor families?', a: 'Ja — rustiger water in droogseizoen (nov–apr), korter strand (1,5 km vs 3 km Patong) dus makkelijker je groep terugvinden, geen Bangla Road-lawaai, hotels dichter bij een klein dorp in plaats van een 24/7 uitgaansstrip. Trade-off: 60% minder restaurantkeuze en bijna geen nachtleven. Meeste families kiezen Kata zonder spijt.' },
    { q: 'Wanneer is de beste tijd om Kata Beach te bezoeken?', a: 'November tot april (droogseizoen): rustig zwemwater, 28–32°C, weinig regen. Mei tot oktober (zuidwestmoesson): ruwere golven — dit is Kata\'s unieke verkoopargument t.o.v. Karon en Kamala. Surfboard-huur opent in mei, piek surf juli–september. Vermijd: eind sept/begin okt (natste). Beste value: laat-november en april.' },
    { q: 'Hoe ver is Kata Beach van Phuket Airport?', a: 'Ongeveer 45 km, 60–80 min met taxi of pre-booked transfer ($25–35). Airport bus naar Phuket Town + taxi: $7–10 totaal maar duurt 2 u. Veel resorts hebben gratis of betaalde transfer — check bij boeking.' },
    { q: 'Kun je echt surfen bij Kata Beach?', a: 'Ja — Kata is het enige Phuket-strand met consistent surf mei–oktober (zuidwestmoesson-swell). Golfhoogte meestal 1–1,5 m, soms 2 m dagen juli–september. Zes surfscholen verhuren boards ($10/u of $20/dag) en geven lessen ($35–50 voor 2 uur). Bodem is grotendeels zand — beginnersvriendelijk. Buiten mei–oktober is er geen surf.' },
    { q: 'Wat is het verschil tussen Kata en Kata Noi?', a: 'Kata (Kata Yai) is het hoofdstrand van 1,5 km met dorp, restaurants en de meeste hotels. Kata Noi is een kleiner strand van 700 m over de zuidelijke landtong — rustiger, minder restaurants, gedomineerd door Katathani Phuket Beach Resort. Beide goed voor zwemmen. Kata Noi heeft iets grotere golven juni–september door het landtong-effect.' },
    { q: 'Is Kata Beach loopbaar naar restaurants en winkels?', a: 'Ja — het dorp is compact, je loopt vanaf elk strandhotel naar 30+ restaurants, ochtendmarkt, surfscholen en wat rooftop bars in 5–10 min. Songthaew-tuktuks rijden naar Karon (10 min) en Patong (20 min) voor $5–8. Lopen Kata–Karon over het strand: 25 min bij eb.' },
    { q: 'Wat kost Kata Beach per dag voor een stel?', a: 'Budget: $80/dag (guesthouse, hawker, strand-lunch, geen taxi\'s). Mid-range (meeste reizigers): $150–220/dag (4-sterren, 2 restaurants, 1 activiteit). Comfort: $300+/dag (beachfront, fine dining, privé-taxi). Surfkamp-week (lessen + budgethotel): $400–600 all-in.' },
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
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-white/75">{isNl ? 'Phuket beach gids' : 'Phuket beach guide'}</p>
            <h1 className="font-heading text-3xl lg:text-5xl font-bold mt-2">
              {isNl ? 'Kata Beach Phuket: surfgolven, strand & familievriendelijke hotels' : 'Kata Beach Phuket: Surf Waves, Sand & Family-Friendly Hotels'}
            </h1>
            <p className="mt-4 text-lg lg:text-xl max-w-3xl opacity-95">
              {isNl
                ? "Kata is Phuket\'s enige surfstrand (mei–okt) en een van de rustigste familiestranden in droogseizoen. 1,5 km wit zand, 7 km zuidelijk van Patong, met een dorp dat klein genoeg is om volledig te belopen. Hier vind je waar te slapen, wanneer te komen, en waarom Kata vaak een betere keuze is dan z\'n drukke buurman."
                : "Kata is Phuket\'s only true surf beach (May–Oct) and one of the calmer family beaches in dry season. 1.5 km of white sand, 7 km south of Patong, with a village small enough to walk end to end. Here\'s where to stay, when to come, and why Kata beats its noisy neighbour for most travelers."}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={withSubId(partners.trip_pillar.partnerUrl, placement('hero-trip'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-6 py-3 text-base font-semibold hover:bg-red-700 shadow-lg">
                {isNl ? 'Kata hotels op Trip.com' : 'Kata hotels on Trip.com'} →
              </a>
              <a href={withSubId(partners.klook_pillar.partnerUrl, placement('hero-klook'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-white text-thailand-blue border border-white/40 px-6 py-3 text-base font-semibold hover:bg-white/90">
                {isNl ? 'Kata activiteiten op Klook' : 'Kata activities on Klook'} →
              </a>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-xs opacity-90">
              <span>✔ {isNl ? '1,5 km strand' : '1.5 km beach'}</span>
              <span>✔ {isNl ? 'Surfen mei–okt' : 'Surf May–Oct'}</span>
              <span>✔ {isNl ? 'Bijgewerkt' : 'Updated'} {new Date(lastUpdated).toLocaleDateString(isNl ? 'nl-NL' : 'en', { year: 'numeric', month: 'long' })}</span>
            </div>
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          {/* Quick stats */}
          <section className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'In één oogopslag' : 'At a glance'}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Locatie' : 'Location'}</p><p className="mt-1 font-heading font-bold text-gray-900 text-lg">{isNl ? 'West-Phuket, 7 km Z' : 'West Phuket, 7 km S'}</p></div>
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Sfeer' : 'Vibe'}</p><p className="mt-1 font-heading font-bold text-gray-900 text-lg">{isNl ? 'Familie + surf' : 'Family + surf'}</p></div>
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Beste voor' : 'Best for'}</p><p className="mt-1 font-heading font-bold text-gray-900 text-lg">{isNl ? 'Stellen, families' : 'Couples, families'}</p></div>
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Prijsklasse' : 'Price tier'}</p><p className="mt-1 font-heading font-bold text-gray-900 text-lg">$95–280</p></div>
            </div>
          </section>

          {/* Beach character */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Het strand & de sfeer' : 'Beach character & atmosphere'}</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              {isNl
                ? 'Kata is een vlakke kilometer-en-een-half wit zand, geflankeerd door twee groene landtongen (Karon-zijde noord, Kata Noi-zijde zuid). Het water is meestal helder en het zand glooit langzaam — geen plotselinge afgronden zoals bij Surin. In droogseizoen (nov–apr) is het zwemwater meestal stil; je kunt veilig met kinderen zwemmen op 100 m van de kust.'
                : 'Kata is a flat 1.5 km of white sand, bookended by two green headlands (Karon side north, Kata Noi side south). The water is usually clear and the sand slopes gently — no sudden drops like Surin. In dry season (Nov–Apr) swimming is mostly calm; you can safely paddle with kids 100 m from shore.'}
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              {isNl
                ? 'Tussen mei en oktober draait het strand 180°. De zuidwestmoesson stuurt 1–2 m swell direct in de baai, wat van Kata Phuket\'s enige echte surfstrand maakt. De rode vlaggen gaan dan vaak omhoog voor zwemmen — maar dezelfde golven die zwemmen riskant maken, lokken een kleine internationale surfcommunity die elk seizoen terugkeert.'
                : 'Between May and October the beach flips. The south-west monsoon pushes 1–2 m swell straight into the bay, making Kata Phuket\'s only real surf beach. Red swimming flags usually go up — but the same waves that close the swim window draw a small international surf community that returns every season.'}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {isNl
                ? 'Sfeer: rustiger dan Patong, drukker dan Kamala. Het dorp achter het strand heeft 30+ restaurants (Thais, Italiaans, Japans, Indiaas), een ochtendmarkt, drie supermarkten, en een enkele 24-uurs straat met casual bars — geen Bangla-style nachtleven, wel genoeg om een week te eten zonder te herhalen.'
                : 'Vibe: quieter than Patong, busier than Kamala. The village behind the beach has 30+ restaurants (Thai, Italian, Japanese, Indian), a morning market, three supermarkets, and one short street of casual bars — no Bangla-style nightlife, but enough variety to eat for a week without repeating.'}
            </p>
          </section>

          {/* Where to stay */}
          <section className="rounded-2xl bg-thailand-red/5 border-2 border-thailand-red p-6">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Waar overnachten in Kata' : 'Where to stay in Kata'}</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              {isNl
                ? "Het dorp is klein genoeg dat \"beachfront vs inland\" een rustig debat is — alles ligt binnen 7 minuten lopen van het zand. Wel verschillen prijs, view en geluid. Beachfront luxe (Kata Rocks, Boathouse): $250–500/nacht, ocean-view, sterke ontbijten. Mid-range (Beyond Kata, Centara Kata Resort): $130–220/nacht, pools, 3–5 min naar zand. Budget guesthouses landinwaarts: $30–60/nacht."
                : "The village is small enough that the \"beachfront vs inland\" debate is muted — everything sits within 7 min walking distance of the sand. But price, view and noise differ. Beachfront luxury (Kata Rocks, Boathouse): $250–500/night, ocean views, strong breakfasts. Mid-range (Beyond Kata, Centara Kata Resort): $130–220/night, pools, 3–5 min to sand. Budget inland guesthouses: $30–60/night."}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/phuket/kata/hotels/" className="inline-flex items-center rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">
                {isNl ? '🏨 Vergelijk Kata hotels' : '🏨 Compare all Kata hotels'} →
              </Link>
              <a href={withSubId(partners.trip_hotels.partnerUrl, placement('wts-trip'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">
                {isNl ? 'Live tarieven Trip.com' : 'Live rates on Trip.com'} →
              </a>
            </div>
          </section>

          {/* Things to do */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Wat te doen op Kata Beach' : 'Things to do at Kata Beach'}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? 'Surflessen (mei–okt)' : 'Surf lessons (May–Oct)'}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? 'Phuket Surf, Kata Surf en Saltwater Dreaming geven les vanaf $35 voor 2u. Beginnersgolf 0,5–1 m, zandbodem, schaduw onder de palmen. Boek 1–2 dagen vooruit in juli/aug.' : 'Phuket Surf, Kata Surf and Saltwater Dreaming run lessons from $35 for 2h. Beginner waves 0.5–1 m, sand bottom, shade under palms. Book 1–2 days ahead Jul/Aug.'}</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? 'Karon viewpoint' : 'Karon viewpoint'}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? '5 min met scooter zuidelijk — panorama over Kata, Kata Noi en Karon in één oogopslag. Beste lichtuur 17:00–18:00.' : '5 min south by scooter — panorama of Kata, Kata Noi and Karon in one frame. Best light 17:00–18:00.'}</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? 'Snorkelen (nov–apr)' : 'Snorkeling (Nov–Apr)'}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? 'Het noordelijke uiteinde rond Crab Island heeft koraalkoppen op 3–6 m. Zelfgenoeg als de zee rustig is. Ankertransfers van Kata Pier naar Coral Island ($25 retour).' : 'North end around Crab Island has coral heads at 3–6 m. Self-sufficient if the sea is calm. Boat transfers from Kata Pier to Coral Island ($25 return).'}</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? 'Avondmarkt + Phuket Town' : 'Night market + Phuket Town'}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? 'Kata Night Market di–vr 17–22u — streetfood + souvenirs. Phuket Old Town 25 min taxi, Sino-Portugese architectuur en gallerijcafés.' : 'Kata Night Market Tue–Fri 17:00–22:00 — street food + souvenirs. Phuket Old Town 25 min taxi, Sino-Portuguese architecture and gallery cafés.'}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/phuket/kata/surfing/" className="rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">{isNl ? '🏄 Surfen op Kata gids' : '🏄 Surfing at Kata guide'}</Link>
              <a href={withSubId(partners.gyg_pillar.partnerUrl, placement('todo-gyg'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-[#1B9E3E] text-white px-5 py-2 text-sm font-semibold hover:bg-[#157a30]">{isNl ? 'GetYourGuide trips' : 'GetYourGuide trips'} →</a>
              <a href={withSubId(partners.viator_pillar.partnerUrl, placement('todo-viator'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-white text-gray-900 border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50">Viator →</a>
            </div>
          </section>

          {/* Getting there */}
          <section className="rounded-2xl bg-amber-50 border border-amber-200 p-6">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Hoe kom je in Kata' : 'Getting to Kata'}</h2>
            <ul className="space-y-3 text-gray-800 text-sm">
              <li><strong>{isNl ? 'Vanaf Phuket Airport (HKT)' : 'From Phuket Airport (HKT)'}:</strong> {isNl ? '45 km, 60–80 min, taxi $25–35 (meterloos onderhandelen) of pre-booked transfer $20–28. Airport-bus naar Phuket Town + lokale bus duurt 2u maar kost $7–10.' : '45 km, 60–80 min, taxi $25–35 (no meter — agree first) or pre-booked transfer $20–28. Airport bus to Phuket Town + local bus takes 2 h but costs $7–10.'}</li>
              <li><strong>{isNl ? 'Vanaf Patong' : 'From Patong'}:</strong> {isNl ? '10 km, 25 min, songthaew $5 (vertrekken Patong Beach Road tot 18u), taxi $10–15.' : '10 km, 25 min, songthaew $5 (leave from Patong Beach Road until 18:00), taxi $10–15.'}</li>
              <li><strong>{isNl ? 'Vanaf Karon' : 'From Karon'}:</strong> {isNl ? '3 km, 8 min, songthaew $3 of een rustige strandwandeling van 25 min bij eb.' : '3 km, 8 min, songthaew $3 or a calm 25-min beach walk at low tide.'}</li>
              <li><strong>{isNl ? 'Scooter' : 'Scooter'}:</strong> {isNl ? '$8–12/dag, makkelijke route uit Patong (15 min). Internationaal rijbewijs nodig — politie controleert geregeld op Patong-Kata route.' : '$8–12/day, easy route out of Patong (15 min). International driving permit required — police check this route regularly.'}</li>
            </ul>
          </section>

          {/* When to visit */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Wanneer naar Kata' : 'When to visit Kata'}</h2>
            <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Periode' : 'Period'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Weer' : 'Weather'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Zwemmen' : 'Swimming'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Surf' : 'Surf'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Hotel-prijs' : 'Hotel price'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr><td className="px-4 py-3 font-semibold">Nov–Feb</td><td className="px-4 py-3">28–32°C, droog</td><td className="px-4 py-3">{isNl ? 'Uitstekend' : 'Excellent'}</td><td className="px-4 py-3">{isNl ? 'Geen' : 'None'}</td><td className="px-4 py-3">$$$ {isNl ? '(piek)' : '(peak)'}</td></tr>
                  <tr><td className="px-4 py-3 font-semibold">Mar–Apr</td><td className="px-4 py-3">30–34°C, droog</td><td className="px-4 py-3">{isNl ? 'Uitstekend' : 'Excellent'}</td><td className="px-4 py-3">{isNl ? 'Klein' : 'Small'}</td><td className="px-4 py-3">$$ {isNl ? '(value)' : '(value)'}</td></tr>
                  <tr><td className="px-4 py-3 font-semibold">May–Jun</td><td className="px-4 py-3">29–31°C, regen</td><td className="px-4 py-3">{isNl ? 'OK overdag' : 'OK midday'}</td><td className="px-4 py-3">{isNl ? 'Begin' : 'Building'}</td><td className="px-4 py-3">$ {isNl ? '(laag)' : '(low)'}</td></tr>
                  <tr><td className="px-4 py-3 font-semibold">Jul–Sep</td><td className="px-4 py-3">28–30°C, regen</td><td className="px-4 py-3">{isNl ? 'Vaak rood' : 'Often red flag'}</td><td className="px-4 py-3">{isNl ? 'Piek 1–2 m' : 'Peak 1–2 m'}</td><td className="px-4 py-3">$ {isNl ? '(laag)' : '(low)'}</td></tr>
                  <tr><td className="px-4 py-3 font-semibold">Oct</td><td className="px-4 py-3">28–30°C, natste</td><td className="px-4 py-3">{isNl ? 'Risico' : 'Risky'}</td><td className="px-4 py-3">{isNl ? 'Eind seizoen' : 'Late season'}</td><td className="px-4 py-3">$ {isNl ? '(laag)' : '(low)'}</td></tr>
                </tbody>
              </table>
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
            <h2 className="font-heading text-xl font-bold text-gray-900">{isNl ? 'Plan de rest van je Phuket-trip' : 'Plan the rest of your Phuket trip'}</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/phuket/kata/hotels/" className="rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">{isNl ? '🏨 Kata Beach hotels' : '🏨 Kata Beach hotels'}</Link>
              <Link href="/phuket/kata/surfing/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏄 Surfen op Kata' : '🏄 Surfing at Kata'}</Link>
              <Link href="/phuket/kata/kata-noi/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏖️ Kata Noi gids' : '🏖️ Kata Noi guide'}</Link>
              <Link href="/phuket/kamala/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏝️ Kamala Beach' : '🏝️ Kamala Beach'}</Link>
              <Link href="/phuket/bang-tao/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏝️ Bang Tao' : '🏝️ Bang Tao'}</Link>
              <Link href="/phuket/surin/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏝️ Surin' : '🏝️ Surin'}</Link>
              <Link href="/best-hotels/phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏨 Alle Phuket hotels' : '🏨 All Phuket hotels'}</Link>
              <Link href="/yacht-charter-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '⛵ Yacht charter' : '⛵ Yacht charter'}</Link>
              <Link href="/city/phuket/" className="rounded-full bg-white text-gray-900 border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50">{isNl ? '📖 Phuket reisgids' : '📖 Phuket travel guide'}</Link>
              <a href={withSubId(KLOOK_GENERIC, placement('mesh-klook'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">{isNl ? '🎟️ Andere activiteiten' : '🎟️ Other activities'}</a>
            </div>
          </section>

          {/* Methodology */}
          <section className="rounded-2xl bg-gray-50 border border-gray-200 p-6 text-sm text-gray-700">
            <h2 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? 'Hoe we Kata beoordelen' : 'How we evaluate Kata'}</h2>
            <p>{isNl ? 'Tarieven en hotelinformatie geverifieerd in mei 2026 op Trip.com, Klook, GetYourGuide en Viator. Surfseizoen-data uit 12 jaar Magic Seaweed-records. We verdienen commissie op boekingen via genoemde platforms — dit verandert niets aan de prijs of welke hotels we noemen.' : "Rates and hotel info verified May 2026 on Trip.com, Klook, GetYourGuide and Viator. Surf season data from 12 years of Magic Seaweed records. We earn a commission on bookings through the listed platforms — this never changes the price you pay or which hotels we cover."}</p>
          </section>
        </main>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const file = path.join(process.cwd(), 'data', 'pseo', 'areas', 'kata-partners.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  return { props: { partners: data.partners, lastUpdated: data.lastUpdated }, revalidate: 604800 };
};
