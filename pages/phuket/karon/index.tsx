import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import SEOHead from '../../../components/SEOHead';
import Breadcrumbs from '../../../components/Breadcrumbs';
import { withSubId, KLOOK_GENERIC, TRIP_GENERIC } from '../../../lib/affiliates';
import { useSubId } from '../../../lib/useSubId';

interface Partners {
  trip_karon_city: { partnerUrl: string };
  trip_karon_hotel_search: { partnerUrl: string };
  trip_pullman: { partnerUrl: string };
  trip_centara: { partnerUrl: string };
  trip_mandarava: { partnerUrl: string };
  trip_beyond: { partnerUrl: string };
  trip_avista: { partnerUrl: string };
}

interface YachtPartners {
  klook_catamaran: { partnerUrl: string };
  klook_yacht: { partnerUrl: string };
  gyg_phuket_yacht: { partnerUrl: string };
}

interface Props {
  partners: Partners;
  yachtPartners: YachtPartners;
  lastUpdated: string;
}

export default function KaronBeachPillarPage({ partners, yachtPartners, lastUpdated }: Props) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const subId = useSubId();

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Phuket', href: '/city/phuket/' },
    { name: 'Karon Beach', href: '/phuket/karon/' },
  ];

  // Title: keyword front, <60, modifier — primary keyword "karon beach"
  // EN: 49 chars, NL: 50 chars
  const seoTitle = isNl
    ? 'Karon Beach Phuket (2026): Complete Reisgids'
    : 'Karon Beach, Phuket (2026): The Complete Local Guide';

  // Meta desc: <155, question hook, keyword + variation
  const seoDescription = isNl
    ? 'Op zoek naar Karon Beach in Phuket? Strandkarakter, beste maanden, Karon viewpoint, vervoer, kosten en hotels — alles wat je voor 2026 moet weten.'
    : 'Looking at Karon Beach for your Phuket trip? Beach character, when to go, Karon viewpoint, transport, costs and hotels — everything to know for 2026.';

  const canonical = `https://go2-thailand.com${isNl ? '/nl' : ''}/phuket/karon/`;

  // H1 differs from title — uses secondary keyword "karon phuket" + variation
  const h1 = isNl
    ? 'Karon Phuket: Wat te verwachten + waar te logeren in 2026'
    : 'Karon Phuket: What to Expect & Where to Stay in 2026';

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: b.name,
      item: `https://go2-thailand.com${isNl ? '/nl' : ''}${b.href}`,
    })),
  };

  const faqEn = [
    { q: 'Is Karon Beach a good area to stay in Phuket?',
      a: "Yes — Karon is one of the strongest picks for travelers who want a real beach holiday without Patong's nightlife noise. The beach is over 3 km long, the resort selection skews mid-range to luxury, and you're 15 minutes from Patong if you do want a night out. We recommend Karon over Patong for couples, families and anyone past their first trip to Phuket." },
    { q: 'Is Karon Beach better than Patong Beach?',
      a: "For sleep, family time and beach quality — yes, Karon beats Patong. The beach is wider, the hotels have more space and the streets are quieter. For nightlife, walkable bars and street food density — Patong wins. The good news: it's a 15-minute Grab between them, so picking Karon doesn't lock you out of Patong." },
    { q: 'When should I visit Karon Beach?',
      a: "November to April is the dry season — calm Andaman water, clean beach, full sun. May to October is the south-west monsoon: still warm but daily afternoon rain, occasional rough surf, and fewer beach loungers set up. Pros of low season: rooms 30–50% cheaper, the beach often empty. Worst surf: typically late August through September." },
    { q: 'Can you swim at Karon Beach?',
      a: "Yes, in the November–April high season. Lifeguards post green/yellow/red flags daily — green means safe, red means stay out (usually monsoon May–October when the surf gets serious). The beach has a soft sandy bottom; the south end gets shallower at low tide and is safer for kids." },
    { q: 'How do I get from Phuket Airport to Karon Beach?',
      a: "Roughly 45–60 minutes by road, 38 km. Grab works at the airport (~600–800 THB). The airport limousine counter is fixed-price ~1,000 THB. The cheapest option is the orange airport bus to Phuket Town, then Smart Bus down to Karon (~200 THB total) but takes 2 hours. For most travelers, Grab is the right call." },
    { q: 'What is Karon Beach known for?',
      a: "Three things: the length of the beach (one of Phuket's longest), the spread-out resort layout (more breathing room than Patong or Kata) and the Karon Viewpoint just south of the beach — the most photographed sunset spot on the island, looking down over Karon, Kata and Kata Noi." },
    { q: 'Is Karon Beach good for families?',
      a: "Very — it's arguably Phuket's strongest family beach. The sand is wide enough for kids to run, the resorts have kids' clubs as standard, the main road has zero seedy bar zones, and the public night markets (Wednesday + Saturday) are a kid-friendly evening out. The only watch-out: monsoon surf can mean swimming restrictions May–October." },
    { q: 'Is Karon Beach walkable?',
      a: 'Karon Circle (the main village) is walkable — restaurants, ATMs, 7-Elevens, massage shops, the Saturday night market. The beach itself is over 3 km long, so getting from a north-end resort to the south-end Karon Viewpoint involves a Grab or the Smart Bus. Within any one section: yes, easy walking.' },
  ];

  const faqNl = [
    { q: 'Is Karon Beach een goede plek om te verblijven in Phuket?',
      a: 'Ja — Karon is een van de sterkste keuzes voor reizigers die een echte strandvakantie willen zonder de feestnoise van Patong. Het strand is meer dan 3 km lang, het hotelaanbod is mid-range tot luxe, en je zit 15 minuten van Patong als je tóch een avondje uit wilt. We raden Karon aan boven Patong voor stellen, families en iedereen die niet voor het eerst in Phuket is.' },
    { q: 'Is Karon Beach beter dan Patong Beach?',
      a: 'Voor slaap, familievakanties en strandkwaliteit — ja, Karon wint van Patong. Het strand is breder, de hotels hebben meer ruimte en de straten zijn rustiger. Voor uitgaan, bardichtheid en streetfood — wint Patong. Het goede nieuws: 15 minuten met Grab tussen beiden, dus Karon kiezen sluit Patong niet uit.' },
    { q: 'Wanneer kun je het beste naar Karon Beach?',
      a: 'November tot april is droog seizoen — kalm Andaman-water, schoon strand, volle zon. Mei tot oktober is de zuidwestmoesson: nog steeds warm maar dagelijkse middagregen, ruwere branding en minder strandbedden. Voordeel laagseizoen: kamers 30–50% goedkoper en het strand vaak leeg. Slechtste branding: meestal eind augustus tot en met september.' },
    { q: 'Kun je zwemmen op Karon Beach?',
      a: 'Ja, in het hoogseizoen november–april. Strandwachten plaatsen dagelijks groene/gele/rode vlaggen — groen = veilig, rood = niet zwemmen (meestal moessontijd mei–oktober wanneer de branding stevig wordt). Zachte zandbodem; het zuidelijke uiteinde wordt ondieper bij eb en is veiliger voor kinderen.' },
    { q: 'Hoe kom ik van Phuket Airport naar Karon Beach?',
      a: 'Ongeveer 45–60 minuten over de weg, 38 km. Grab werkt op het vliegveld (~600–800 THB). De airport limousine-balie is vaste prijs ~1.000 THB. Goedkoopst: de oranje airport bus naar Phuket Town en dan de Smart Bus naar Karon (~200 THB totaal) — duurt 2 uur. Voor de meeste reizigers is Grab de juiste keuze.' },
    { q: 'Waar is Karon Beach bekend om?',
      a: "Drie dingen: de lengte van het strand (een van Phuket's langste), de ruim opgezette hotelindeling (meer ademruimte dan Patong of Kata) en het Karon Viewpoint net ten zuiden van het strand — het meest gefotografeerde sunset-punt op het eiland, met uitzicht over Karon, Kata en Kata Noi." },
    { q: 'Is Karon Beach goed voor families?',
      a: "Heel goed — waarschijnlijk Phuket's sterkste familiestrand. Het zand is breed genoeg om kinderen te laten rennen, hotels hebben standaard kids' clubs, de hoofdweg heeft geen louche barzones, en de openbare nachtmarkten (woensdag + zaterdag) zijn kindvriendelijk. Enige aandachtspunt: moessonbranding kan zwemrestricties betekenen mei–oktober." },
    { q: 'Is Karon Beach loopbaar?',
      a: "Karon Circle (het centrale dorp) is loopbaar — restaurants, geldautomaten, 7-Elevens, massagewinkels, de zaterdagse nachtmarkt. Het strand zelf is meer dan 3 km lang, dus van een hotel aan het noordeind naar het Karon Viewpoint in het zuiden vereist een Grab of de Smart Bus. Binnen één sectie: ja, makkelijk lopen." },
  ];

  const faqList = isNl ? faqNl : faqEn;

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
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
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-white/75">{isNl ? 'Phuket strandgebied · Karon' : 'Phuket beach area · Karon'}</p>
            <h1 className="font-heading text-3xl lg:text-5xl font-bold mt-2">{h1}</h1>
            <p className="mt-4 text-lg lg:text-xl max-w-3xl opacity-95">
              {isNl
                ? 'Karon Beach is het rustigere, ruimere alternatief voor Patong — meer dan 3 km breed strand, mid-range tot luxe resorts, en het beroemde Karon Viewpoint op 5 minuten rijden. Geschikt voor stellen, families en iedereen die wel een echte strandvakantie wil maar niet de feestnoise.'
                : "Karon Beach is the calmer, roomier alternative to Patong — over 3 km of wide sand, a strong mid-range to luxury resort lineup, and the famous Karon Viewpoint a 5-minute drive south. It suits couples, families and anyone who wants a real beach holiday without the party-strip noise."}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={withSubId(partners.trip_karon_city.partnerUrl, subId)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-6 py-3 text-base font-semibold hover:bg-red-700 shadow-lg">
                {isNl ? 'Bekijk Karon hotels op Trip.com' : 'See Karon hotels on Trip.com'} →
              </a>
              <a href={withSubId(yachtPartners.klook_catamaran.partnerUrl, subId)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red/80 text-white px-6 py-3 text-base font-semibold hover:bg-red-700">
                {isNl ? 'Activiteiten op Klook' : 'Activities on Klook'} →
              </a>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-xs opacity-90">
              <span>✔ 3 km {isNl ? 'wit zandstrand' : 'of white sand'}</span>
              <span>✔ {isNl ? 'Mid-range tot luxe resorts' : 'Mid-range to luxury resorts'}</span>
              <span>✔ {isNl ? 'Bijgewerkt' : 'Updated'} {new Date(lastUpdated).toLocaleDateString(isNl ? 'nl-NL' : 'en', { year: 'numeric', month: 'long' })}</span>
            </div>
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          {/* Quick stats */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
              <p className="text-xs uppercase tracking-wide text-gray-500">{isNl ? 'Strandlengte' : 'Beach length'}</p>
              <p className="mt-1 text-xl font-bold text-gray-900">3 km+</p>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
              <p className="text-xs uppercase tracking-wide text-gray-500">{isNl ? 'Beste seizoen' : 'Best season'}</p>
              <p className="mt-1 text-xl font-bold text-gray-900">Nov–Apr</p>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
              <p className="text-xs uppercase tracking-wide text-gray-500">{isNl ? 'Vanaf airport' : 'From airport'}</p>
              <p className="mt-1 text-xl font-bold text-gray-900">45–60 min</p>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100">
              <p className="text-xs uppercase tracking-wide text-gray-500">{isNl ? 'Naar Patong' : 'To Patong'}</p>
              <p className="mt-1 text-xl font-bold text-gray-900">15 min</p>
            </div>
          </section>

          {/* Who is Karon for */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? "Voor wie is Karon Beach?" : "Who Karon Beach is for"}</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="rounded-2xl bg-white p-5 shadow-sm border-l-4 border-green-500">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? '👨‍👩‍👧 Families' : '👨‍👩‍👧 Families'}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? "Phuket's sterkste familiestrand. Brede zandstrand, geen barzones aan de hoofdweg, kid's clubs in elk groter resort, en nachtmarkten waar kinderen welkom zijn." : "Phuket's strongest family beach. Wide sand, no seedy bar strip, kids' clubs at every larger resort, and night markets that work as a kid-friendly evening." }</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border-l-4 border-pink-500">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? '💕 Stellen' : '💕 Couples'}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? "Twee adults-only resorts (Beyond, Avista MGallery), het Karon Viewpoint voor sunset, en hotelbars met live muziek zonder DJ-gegil. Patong op 15 min als je een avondje uit wilt." : "Two adults-only properties (Beyond, Avista MGallery), the Karon Viewpoint for sunsets, and hotel bars with live acoustic sets — no superclubs in earshot. Patong is 15 min away if you want one big night."}</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border-l-4 border-blue-500">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? '🌴 Rust-zoekers' : '🌴 Quiet seekers'}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? "Het strand is zo lang dat je altijd een rustige plek vindt. Het noordeind is het breedst en stilst. Geen Bangla Road in straal van 5 km. 's Nachts hoor je vooral de branding." : "The beach is long enough that you'll always find a quiet stretch — the north end is widest and stillest. No Bangla Road within a 5 km radius. At night you mostly hear the surf."}</p>
              </div>
            </div>
          </section>

          {/* Beach character */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Hoe voelt Karon Beach aan?' : 'What Karon Beach feels like'}</h2>
            <div className="prose max-w-none text-gray-700 leading-relaxed space-y-4">
              <p>
                {isNl
                  ? "Karon is breed, lang en wit. Het zand is fijner dan op Patong en piept onder je voeten in droge maanden — een zeldzame eigenschap die Karon deelt met een handvol stranden in Australië en Hawaii. Het strand loopt van noord naar zuid in een lichte boog, ongeveer 3,2 km tussen de twee uiteinden. Aan het noordeind is het strand het breedst (40+ meter bij eb) en het rustigst — daar zit ook Beyond Resort. Het centrale stuk, recht voor Karon Circle, heeft de meeste strandbedden, voedselkraampjes en parasailing-aanbieders. Het zuidelijke stuk wordt smaller, rotsachtiger bij eb en is goed voor wandelaars."
                  : "Karon is wide, long and white. The sand is finer than Patong's and famously squeaks underfoot in dry months — a rare trait Karon shares with a handful of beaches in Australia and Hawaii. The beach runs north-south in a gentle curve, about 3.2 km between the two ends. The north end is the widest (40+ m at low tide) and the quietest — Beyond Resort sits here. The central section in front of Karon Circle has the most loungers, food carts and parasail operators. The south end narrows, gets rockier at low tide and is best for walkers."}
              </p>
              <p>
                {isNl
                  ? "De resorts staan vrijwel allemaal aan de overkant van Patak Road, de strandweg. Centara Grand is een van de weinige met directe strandtoegang (geen weg over te steken). Anderen — Pullman, Hilton, Marriott — staan op de heuvel of net achter de weg, met gratis pendelbussen naar het strand. Dit verklaart waarom je vaak 'beachfront' tegenkomt op een resort dat in werkelijkheid 200 m van het zand af staat: de afstand is voor Phuket-begrippen kort, maar het is geen voetstap-uit-bed-in-zand affaire."
                  : "Almost every resort sits across Patak Road, the beach road. Centara Grand is one of the few with direct beach access — no road to cross. Others (Pullman, Hilton, Marriott) sit on the hillside or just back from the road, with free shuttles down to the sand. This explains why \"beachfront\" gets used loosely on Karon: the walks are short by Phuket standards, but it's not a step-from-the-bed-into-the-sand setup at most properties."}
              </p>
              <p>
                {isNl
                  ? "De vibe is volwassener dan Patong, levendiger dan Surin en Bang Tao. Restaurants en winkels zijn geconcentreerd rond Karon Circle — het rotonde-knooppunt waar Patak Road en Karon Road kruisen. Daar vind je de Saturday Night Market (op zaterdagavonden, tegenover Karon Temple), 7-Elevens, geldautomaten, een paar massagewinkels en een opvallend goede selectie Italiaanse en Indiase restaurants naast de gebruikelijke Thaise tenten."
                  : "The vibe is more grown-up than Patong, livelier than Surin and Bang Tao. Restaurants and shops cluster around Karon Circle — the roundabout where Patak Road meets Karon Road. That's where you'll find the Saturday Night Market (Saturdays, opposite Karon Temple), 7-Elevens, ATMs, a handful of massage shops and a surprisingly strong cluster of Italian and Indian restaurants alongside the Thai standards."}
              </p>
            </div>
          </section>

          {/* When to go */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Wanneer ga je naar Karon?' : 'When to visit Karon'}</h2>
            <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Maanden' : 'Months'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Weer' : 'Weather'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Surf / zwemmen' : 'Surf / swim'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Prijzen' : 'Prices'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-700">
                  <tr><td className="px-4 py-3 font-semibold">Nov–Feb</td><td className="px-4 py-3">{isNl ? 'Droog, 25–32°C, koele wind' : 'Dry, 25–32°C, cool breeze'}</td><td className="px-4 py-3">{isNl ? 'Kalm, groen vlag' : 'Calm, green flags'}</td><td className="px-4 py-3 text-thailand-red font-semibold">{isNl ? 'Hoogseizoen — 100%' : 'High season — 100%'}</td></tr>
                  <tr><td className="px-4 py-3 font-semibold">Mar–Apr</td><td className="px-4 py-3">{isNl ? 'Heet, 30–35°C, weinig regen' : 'Hot, 30–35°C, little rain'}</td><td className="px-4 py-3">{isNl ? 'Kalm, helder water' : 'Calm, clear water'}</td><td className="px-4 py-3">{isNl ? 'Hoog — 90%' : 'High — 90%'}</td></tr>
                  <tr><td className="px-4 py-3 font-semibold">May–Jul</td><td className="px-4 py-3">{isNl ? 'Begin moesson, middagbuien' : 'Early monsoon, afternoon showers'}</td><td className="px-4 py-3">{isNl ? 'Wisselend, kleine surf' : 'Mixed, small surf'}</td><td className="px-4 py-3 text-green-700 font-semibold">{isNl ? 'Laag — 50–60%' : 'Low — 50–60%'}</td></tr>
                  <tr><td className="px-4 py-3 font-semibold">Aug–Sep</td><td className="px-4 py-3">{isNl ? 'Volle moesson, veel regen' : 'Peak monsoon, heavy rain'}</td><td className="px-4 py-3 text-thailand-red">{isNl ? 'Ruwe surf, rode vlag vaak' : 'Rough surf, red flags common'}</td><td className="px-4 py-3 text-green-700 font-semibold">{isNl ? 'Laagseizoen — 40–50%' : 'Low season — 40–50%'}</td></tr>
                  <tr><td className="px-4 py-3 font-semibold">Oct</td><td className="px-4 py-3">{isNl ? 'Late moesson, kalmer' : 'Late monsoon, calmer'}</td><td className="px-4 py-3">{isNl ? 'Verbeterd, oppassen' : 'Improving, stay alert'}</td><td className="px-4 py-3">{isNl ? 'Schouder — 60–70%' : 'Shoulder — 60–70%'}</td></tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm text-gray-600">{isNl ? "Beste compromis tussen weer en menigte: half november of half maart. Hoogseizoen kerst-nieuwjaar prijzen verdubbelen — boek 3 maanden vooruit voor de beste deals." : "Best compromise between weather and crowds: mid-November or mid-March. Christmas/New Year peak doubles prices — book 3 months out for any decent deal."}</p>
          </section>

          {/* Karon Viewpoint + Three Beach Hill */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Karon Viewpoint & Three Beach Hill' : 'Karon Viewpoint & Three Beach Hill'}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">Karon Viewpoint</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? "Op 4 km ten zuiden van Karon, langs de kustweg richting Promthep Cape. Vanaf het uitkijkpunt zie je drie stranden achter elkaar: Kata Noi, Kata Yai en Karon. Het is hét sunset-spot van het zuiden van het eiland — kom 30 min voor zonsondergang voor een goede plek. Gratis. Parking 20 THB voor scooters, 40 voor auto's. Een 5-min Grab-rit van Karon Circle." : "About 4 km south of Karon along the coast road toward Promthep Cape. The viewpoint looks down on three beaches lined up — Kata Noi, Kata Yai and Karon. It's the sunset spot for the south of the island; arrive 30 min before sunset for a decent spot. Free. Parking 20 THB scooter, 40 car. 5 min Grab from Karon Circle."}</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">Three Beach Hill / {isNl ? 'Karon-Kata Heuvel' : 'Karon-Kata Hill'}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? "Lokale naam voor het uitkijkpunt — soms verwijst dit ook naar het korte heuvelpad tussen het zuideind van Karon en Kata Yai. Te lopen op 25 minuten met goede schoenen, of 5 minuten met scooter. Het uitzicht halverwege over Kata Noi is het tussendoortje." : "Local name for the viewpoint — sometimes also used for the short hill path between south Karon and Kata Yai. Walkable in 25 min with decent shoes, or 5 min by scooter. The mid-walk overlook of Kata Noi is the bonus."}</p>
              </div>
            </div>
          </section>

          {/* Getting there + transport */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Vervoer en bereikbaarheid' : 'Transport and getting around'}</h2>
            <ul className="space-y-3 text-gray-800">
              <li className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100"><strong>{isNl ? 'Van Phuket Airport (HKT)' : 'From Phuket Airport (HKT)'}</strong>: {isNl ? '38 km, 45–60 min. Grab 600–800 THB, airport limo ~1.000 THB, Smart Bus + transfer ~200 THB maar 2 uur reistijd.' : '38 km, 45–60 min. Grab 600–800 THB, airport limo ~1,000 THB, Smart Bus + transfer ~200 THB but 2 hours travel time.'}</li>
              <li className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100"><strong>{isNl ? 'Naar Patong' : 'To Patong'}</strong>: {isNl ? '15 min Grab (~200 THB), Smart Bus 50 THB elke 30 min, scooter via de Patong Hill weg in 12 min.' : '15 min by Grab (~200 THB), Smart Bus 50 THB every 30 min, or scooter via the Patong Hill road in 12 min.'}</li>
              <li className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100"><strong>{isNl ? 'Naar Kata Beach' : 'To Kata Beach'}</strong>: {isNl ? '5 min over Kata Hill — direct buurt. Lopen kan, 25 min via heuvelpad.' : '5 min by road over Kata Hill — direct neighbour. Walkable in 25 min via the hill path.'}</li>
              <li className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100"><strong>{isNl ? 'Naar Phuket Old Town' : 'To Phuket Old Town'}</strong>: {isNl ? '22 km, 35–45 min Grab (~350–450 THB). Een halve dag uitstapje waard.' : '22 km, 35–45 min by Grab (~350–450 THB). A worthwhile half-day trip.'}</li>
              <li className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100"><strong>{isNl ? 'Scooterhuur in Karon' : 'Scooter rental in Karon'}</strong>: {isNl ? '200–250 THB/dag voor 125cc. Veel winkels op Patak Road. Internationaal rijbewijs en helm zijn pure verplichting — politie controleert.' : '200–250 THB/day for a 125cc. Plenty of shops on Patak Road. International driving permit and helmet are mandatory — police check.'}</li>
              <li className="rounded-2xl bg-white p-4 shadow-sm border border-gray-100"><strong>{isNl ? 'Smart Bus' : 'Smart Bus'}</strong>: {isNl ? 'De officiële openbaarvervoerlijn van Phuket. Loopt vanaf het vliegveld via Surin, Patong, Karon, Kata, Rawai. Halte op Patak Road bij Karon Circle. 50–170 THB afhankelijk van afstand.' : "Phuket's official public bus line. Runs from the airport via Surin, Patong, Karon, Kata, Rawai. Stop on Patak Road by Karon Circle. 50–170 THB depending on distance."}</li>
            </ul>
            <p className="mt-3 text-sm text-gray-600">{isNl ? 'Voor een week Phuket vanaf Karon: Grab voor stadsritjes, een gehuurde scooter voor strandhopping is de gangbare combinatie. Auto huren is alleen zinnig als je naar Phang Nga of de noordstranden gaat.' : 'For a week in Phuket basing at Karon: Grab for town runs, a rented scooter for beach hopping is the usual combo. Renting a car only makes sense if you plan a Phang Nga or north-coast trip.'}</p>
          </section>

          {/* Hotels intro + link to hub */}
          <section className="rounded-2xl bg-thailand-red/5 border-2 border-thailand-red p-6">
            <span className="inline-block rounded-full bg-thailand-red text-white text-xs font-bold uppercase tracking-wide px-3 py-1 mb-3">⭐ {isNl ? 'Hoofd geld-pagina' : 'Money page'}</span>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Hotels in Karon: alle prijsklassen op één pagina' : 'Hotels in Karon: every price tier in one place'}</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              {isNl
                ? "Karon heeft veel meer mid-range en luxe familieopties dan Patong (waar de markt feestpubliek bedient). De grote namen — Pullman, Centara Grand, Hilton, Marriott, Mövenpick — staan allemaal hier. Voor de complete vergelijking met prijzen, kamertypes en eerlijke voor- en nadelen: ga door naar onze Karon hotels-gids."
                : "Karon has many more mid-range and luxury family options than Patong (which mostly serves the party crowd). The big names — Pullman, Centara Grand, Hilton, Marriott, Mövenpick — are all here. For the full comparison with prices, room types and honest pros/cons, head to our Karon hotels guide."}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/phuket/karon/hotels/" className="inline-flex items-center rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">
                {isNl ? 'Vergelijk Karon hotels →' : 'Compare Karon hotels →'}
              </Link>
              <a href={withSubId(partners.trip_karon_hotel_search.partnerUrl, subId)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center rounded-full bg-white text-thailand-red border border-thailand-red px-5 py-2 text-sm font-semibold hover:bg-thailand-red hover:text-white">
                {isNl ? 'Live prijzen op Trip.com →' : 'Live prices on Trip.com →'}
              </a>
            </div>
          </section>

          {/* Featured hotels quick row */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Drie Karon-resorts om te bekijken' : 'Three Karon resorts to consider'}</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2"><Link href="/phuket/karon/hotels/pullman-phuket-arcadia-karon-beach-resort/" className="text-thailand-blue hover:text-thailand-red hover:underline">Pullman Arcadia Karon</Link></h3>
                <p className="text-xs text-green-700 font-semibold mb-2">{isNl ? '👨‍👩‍👧 Beste familie-resort' : '👨‍👩‍👧 Best family resort'}</p>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? "5 zwembaden, 277 kamers, 3 min lopen naar het strand. Dé default voor families van 4+." : "5 pools, 277 rooms, 3 min walk to the beach. Default pick for families of 4+."}</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2"><Link href="/phuket/karon/hotels/centara-grand-beach-resort-phuket/" className="text-thailand-blue hover:text-thailand-red hover:underline">Centara Grand Karon</Link></h3>
                <p className="text-xs text-blue-700 font-semibold mb-2">{isNl ? '🏖️ Enige beachfront' : '🏖️ Only beachfront'}</p>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? "Karon's enige echte beachfront vijf-sterren — lagunezwembad mondt uit op het zand, waterglijbanen voor kinderen." : "Karon's only true beachfront five-star — lagoon pool spills onto the sand, water slides for kids."}</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2"><Link href="/phuket/karon/hotels/beyond-resort-karon/" className="text-thailand-blue hover:text-thailand-red hover:underline">Beyond Resort Karon</Link></h3>
                <p className="text-xs text-pink-700 font-semibold mb-2">{isNl ? '💕 Adults-only' : '💕 Adults-only'}</p>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? "Adults-only beachfront aan het rustige noordeind. Sterke pick voor stellen die ook geld willen sparen vs Avista." : "Adults-only beachfront on the quieter north end. Strong pick for couples who also want to save vs Avista."}</p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Veelgestelde vragen over Karon Beach' : 'Karon Beach FAQ'}</h2>
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
            <p className="mt-2 text-gray-700">{isNl ? 'Karon is gekozen — nu de bouwstenen:' : 'Karon is sorted — now the rest:'}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/phuket/karon/hotels/" className="rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">{isNl ? '🏨 Hotels in Karon' : '🏨 Hotels in Karon'}</Link>
              <Link href="/best-hotels/phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏨 Beste Phuket hotels' : '🏨 Best Phuket hotels overall'}</Link>
              <Link href="/flights-to-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '✈️ Vluchten naar Phuket' : '✈️ Flights to Phuket'}</Link>
              <Link href="/car-rental-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🚗 Auto huren op Phuket' : '🚗 Rent a car on Phuket'}</Link>
              <Link href="/yacht-charter-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '⛵ Yacht charters' : '⛵ Yacht charters'}</Link>
              <Link href="/city/phuket/" className="rounded-full bg-white text-gray-900 border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50">{isNl ? '📖 Phuket reisgids' : '📖 Phuket travel guide'}</Link>
              <a href={withSubId(yachtPartners.gyg_phuket_yacht.partnerUrl, subId)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">{isNl ? '🎟️ Activiteiten boeken' : '🎟️ Book activities'}</a>
            </div>
          </section>

          {/* Methodology */}
          <section className="rounded-2xl bg-gray-50 border border-gray-200 p-6 text-sm text-gray-700">
            <h2 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? 'Hoe deze gids tot stand kwam' : 'How this guide was built'}</h2>
            <p>{isNl ? 'Veldobservaties en beach-afstanden kruisgecheckt met TripAdvisor (laatste 100 reviews per resort, 2024–2026), Booking.com en Trip.com listings. Vervoersinformatie geverifieerd met de Smart Bus operator (PhuketSmartBus.com) en Grab tarieven gecheckt mei 2026. Wij verdienen commissie op boekingen via Trip.com, Klook en GetYourGuide — dit verandert niets aan welke hotels of opties we noemen.' : "Field observations and beach distances cross-checked against TripAdvisor (last 100 reviews per resort, 2024–2026), Booking.com and Trip.com listings. Transport info verified with the Smart Bus operator (PhuketSmartBus.com) and Grab fares checked May 2026. We earn commission on bookings through Trip.com, Klook and GetYourGuide — this never changes which hotels or options we cover."}</p>
          </section>
        </main>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const partnersFile = path.join(process.cwd(), 'data', 'pseo', 'areas', 'karon-partners.json');
  const partnersData = JSON.parse(fs.readFileSync(partnersFile, 'utf8'));

  const yachtFile = path.join(process.cwd(), 'data', 'pseo', 'yacht-charter', 'phuket-partners.json');
  const yachtData = JSON.parse(fs.readFileSync(yachtFile, 'utf8'));

  return {
    props: {
      partners: partnersData.partners,
      yachtPartners: {
        klook_catamaran: yachtData.partners.klook_catamaran,
        klook_yacht: yachtData.partners.klook_yacht,
        gyg_phuket_yacht: yachtData.partners.gyg_phuket_yacht,
      },
      lastUpdated: partnersData.lastUpdated,
    },
    revalidate: 604800,
  };
};
