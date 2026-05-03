import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import { withSubId, KLOOK_GENERIC, TWELVEGO_GENERIC } from '../../lib/affiliates';
import { useSubId } from '../../lib/useSubId';

interface PartnerUrls {
  trip_thailand: { partnerUrl: string };
  trip_phuket: { partnerUrl: string };
  trip_generic: { partnerUrl: string };
  dc_phuket: { partnerUrl: string };
  dc_thailand: { partnerUrl: string };
  dc_airport: { partnerUrl: string };
}

interface Props {
  partners: PartnerUrls;
  lastUpdated: string;
}

export default function CarRentalPhuketPage({ partners, lastUpdated }: Props) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const subId = useSubId();

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: isNl ? 'Auto huren Phuket' : 'Car Rental Phuket', href: '/car-rental-phuket/' },
  ];

  const seoTitle = isNl
    ? 'Auto Huren in Phuket (2026): Vergelijken & Boeken'
    : 'Car Rental Phuket (2026): Compare Prices & 7 Companies';
  // Question hook + keyword + variations — under 155 chars
  const seoDescription = isNl
    ? 'Auto huren in Phuket? Vergelijk Discover Cars en Trip.com, lokaal vs internationaal, prijzen vanaf $20/dag, IDP-regels en boekingstips.'
    : 'Looking to rent a car in Phuket? Compare Discover Cars + Trip.com, local vs international brands, prices from $20/day, IDP rules + tips.';
  const canonical = `https://go2-thailand.com${isNl ? '/nl' : ''}/car-rental-phuket/`;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, i) => ({
      '@type': 'ListItem', position: i + 1, name: b.name,
      item: `https://go2-thailand.com${isNl ? '/nl' : ''}${b.href}`,
    })),
  };

  const faqEn = [
    { q: "Do I need an International Driving Permit (IDP) to rent a car in Phuket?",
      a: "Yes. Thai law requires an IDP (1949 or 1968 Convention) alongside your home country license. Rental companies will ask for both at pickup. Police road checks happen — getting caught with only your home license can mean a 1,000–2,000 THB on-the-spot fine and a void rental insurance. Get the IDP before you fly; in most countries it costs $20–30 and takes 5 minutes at an automobile association." },
    { q: "Is it safe to drive in Phuket?",
      a: "Drive defensively, accept that scooters will weave. Thailand drives on the left (UK-style). Phuket roads are paved and signed in English, but traffic in Patong/Karon is chaotic — particularly during high season (Nov–Apr). The west coast highway between airport and Patong is a 4-lane road with occasional aggressive overtaking. Phuket has one of the highest road-fatality rates per capita in Thailand — almost all involving scooters. In a car you're significantly safer than on a scooter." },
    { q: "Where's the best place to rent — airport or hotel?",
      a: "Airport (HKT) for biggest selection — 12+ rental desks at arrivals, plus hundreds more cars available online for delivery. Hotel pickup is convenient but typically 30–50% more expensive and offers fewer choices. If you're doing day trips from a single hotel base, hotel-pickup makes sense; if you're moving around the island, airport pickup wins." },
    { q: "How much should a Phuket rental cost?",
      a: "Economy car (Toyota Yaris / Honda Brio): $20–35/day low season, $30–55/day high season. Compact SUV (Toyota Yaris Cross): $35–65/day. Mid-size SUV (Honda CR-V / Toyota Fortuner): $50–100/day. Add full insurance for $10–18/day. These are aggregator prices; direct from international brands at airport adds 30–50%. Always check the deposit hold — usually 10,000–25,000 THB on the credit card." },
    { q: "Should I get full insurance?",
      a: "Yes. Always. Basic Thai rental insurance covers the car at minimum legal level, but the excess (deductible) is usually 30,000–50,000 THB — meaning if you scratch the car you pay that out of pocket. Full coverage / Super Cover Damage Waiver brings excess to zero or near-zero. Costs $10–18/day. The aggregator's bundled insurance (offered by Discover Cars) is often cheaper than the rental company's at-counter offer for the same coverage." },
    { q: "Can I rent without a credit card?",
      a: "International brands (Avis, Hertz, Budget, Sixt) require a credit card in the driver's name for the deposit hold. Local Phuket companies sometimes accept cash deposits or debit cards but with higher excess. Aggregators (Discover Cars, Trip.com) match you with companies that fit your payment method — check at booking, not at the desk." },
    { q: "Are there toll roads or fuel surcharges?",
      a: "No toll roads on Phuket. Fuel policy is almost always 'full-to-full' — return the car with the same fuel level you got it. Don't return empty (you'll pay 2–3× pump price for the refill plus a service fee). Most cars take 91 octane gasoline (~38 THB/litre in 2026) or diesel for SUVs." },
  ];

  const faqNl = [
    { q: "Heb ik een internationaal rijbewijs (IDP) nodig om een auto te huren in Phuket?",
      a: "Ja. Thaise wet vereist een IDP (1949 of 1968 Conventie) náást je gewone rijbewijs. Verhuurders vragen bij ophalen om allebei. Politie houdt regelmatig controles — als je alleen je Nederlandse rijbewijs bij je hebt riskeer je 1.000–2.000 THB direct boete en je verzekering vervalt. Regel je IDP voor je vliegt; bij de ANWB kost het ~€18 en is binnen 5 minuten geregeld." },
    { q: "Is rijden in Phuket veilig?",
      a: "Defensief rijden, accepteer dat scooters tussendoor weven. Thailand rijdt links (zoals UK). Phuket-wegen zijn geasfalteerd en bordjes vaak in het Engels, maar het verkeer in Patong/Karon is chaotisch — vooral in hoogseizoen (nov–apr). De westkust-snelweg tussen luchthaven en Patong is een 4-baans weg waarop soms agressief wordt ingehaald. Phuket heeft een van de hoogste verkeersdoden per inwoner in Thailand — bijna allemaal scooter-gerelateerd. In een auto ben je veel veiliger." },
    { q: "Waar kan ik het beste huren — luchthaven of hotel?",
      a: "Luchthaven (HKT) voor de grootste keuze — 12+ verhuurbalies bij aankomst plus honderden auto's online beschikbaar voor levering. Hotel-ophaal is handig maar meestal 30–50% duurder met minder keuze. Voor dagtrips vanaf één hotel werkt hotel-ophaal prima; als je over het eiland reist wint de luchthaven." },
    { q: "Wat kost een huurauto in Phuket?",
      a: "Compact (Toyota Yaris / Honda Brio): $20–35/dag laagseizoen, $30–55/dag hoogseizoen. Compacte SUV (Toyota Yaris Cross): $35–65/dag. Middelgrote SUV (Honda CR-V / Toyota Fortuner): $50–100/dag. Volledig verzekerd +$10–18/dag. Dit zijn aggregator-prijzen; direct bij internationale merken op de luchthaven 30–50% duurder. Check altijd de borg — meestal 10.000–25.000 THB op je creditcard." },
    { q: "Moet ik volledig verzekerd huren?",
      a: "Ja. Altijd. Basis Thaise verzekering dekt de auto op minimaal wettelijk niveau, maar het eigen risico is meestal 30.000–50.000 THB — een krasje en je betaalt dat zelf. Full Cover / Super Cover Damage Waiver brengt eigen risico naar nul. Kost $10–18/dag. De verzekering die Discover Cars erbij verkoopt is vaak goedkoper dan dezelfde dekking aan de balie." },
    { q: "Kan ik huren zonder creditcard?",
      a: "Internationale merken (Avis, Hertz, Budget, Sixt) eisen een creditcard op naam van de bestuurder voor de borg. Lokale Phuket-bedrijven accepteren soms contant geld of pinpas, maar met hoger eigen risico. Aggregators (Discover Cars, Trip.com) filteren op betaalmethode — check tijdens boeking, niet bij de balie." },
    { q: "Zijn er tolwegen of brandstoftoeslagen?",
      a: "Geen tolwegen op Phuket. Brandstofbeleid is bijna altijd 'full-to-full' — lever in met hetzelfde niveau als bij ophaal. Lever niet leeg in (dan betaal je 2–3× de pompprijs plus servicekosten). De meeste auto's rijden op 91 octaan (~38 THB/liter in 2026) of diesel voor SUVs." },
  ];

  const faqList = isNl ? faqNl : faqEn;

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqList.map(f => ({
      '@type': 'Question', name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
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
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-white/75">{isNl ? 'Auto verhuur vergelijking' : 'Car rental comparison'}</p>
            <h1 className="font-heading text-3xl lg:text-5xl font-bold mt-2">
              {/* H1 differs from title per SEO playbook — uses 'Best Way' framing + secondary keyword 'cheapest' */}
              {isNl
                ? 'Auto huren op Phuket: 7 verhuurders + de goedkoopste route'
                : 'Best Way to Rent a Car in Phuket: 7 Companies + Cheapest Route'}
            </h1>
            <p className="mt-4 text-lg lg:text-xl max-w-3xl opacity-95">
              {isNl
                ? 'Phuket Airport heeft 12+ verhuurbalies bij aankomst en honderden auto\'s online te boeken. Maar hotel-ophaal is meestal 30–50% duurder, sommige bedrijven eisen een creditcard borg van 25.000 THB, en de IDP-regel wordt vaak gemist. Hier vind je wat écht werkt — eerlijke prijzen, wat je nodig hebt, en de twee beste boekingsplatforms.'
                : "Phuket Airport (HKT) has 12+ rental desks at arrivals plus hundreds of cars available online. But hotel pickup is typically 30–50% more expensive, some companies require a 25,000 THB credit-card hold, and the International Driving Permit rule catches travelers out. Here's what actually works — honest prices, what to bring, and the two best booking platforms."}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={withSubId(partners.dc_phuket.partnerUrl, subId)}
                target="_blank"
                rel="noopener noreferrer nofollow sponsored"
                className="rounded-full bg-thailand-red text-white px-6 py-3 text-base font-semibold hover:bg-red-700 shadow-lg"
              >
                {isNl ? 'Vergelijk op Discover Cars' : 'Compare on Discover Cars'} →
              </a>
              <a
                href={withSubId(partners.trip_phuket.partnerUrl, subId)}
                target="_blank"
                rel="noopener noreferrer nofollow sponsored"
                className="rounded-full bg-[#287dfa] text-white px-6 py-3 text-base font-semibold hover:bg-[#1a5ec4]"
              >
                {isNl ? 'Zoeken op Trip.com' : 'Search on Trip.com'} →
              </a>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-xs opacity-90">
              <span>✔ {isNl ? '7 verhuurders eerlijk vergeleken' : '7 companies compared honestly'}</span>
              <span>✔ {isNl ? 'IDP + verzekering uitgelegd' : 'IDP + insurance explained'}</span>
              <span>✔ {isNl ? 'Bijgewerkt' : 'Updated'} {new Date(lastUpdated).toLocaleDateString(isNl ? 'nl-NL' : 'en', { year: 'numeric', month: 'long' })}</span>
            </div>
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          {/* Comparison table — biggest click driver */}
          <section id="comparison">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-2">{isNl ? 'Snelle vergelijking: 7 verhuurders' : 'Quick comparison: 7 companies'}</h2>
            <p className="text-gray-600 mb-6">{isNl ? 'Klik een naam om live tarieven te bekijken (we verdienen een kleine commissie zonder dat het jou iets extra kost).' : "Click a name to see live rates (we earn a small commission at no extra cost to you)."}</p>
            <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Verhuurder' : 'Company'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Type' : 'Type'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Prijsklasse' : 'Price band'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Sterk punt' : 'Standout'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Minpunt' : 'Watch out for'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Boek' : 'Book'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3"><a href={withSubId(partners.dc_phuket.partnerUrl, subId)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="font-semibold text-thailand-blue hover:text-thailand-red hover:underline">Discover Cars</a></td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? 'Aggregator' : 'Aggregator'}</td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">$20–80/{isNl ? 'dag' : 'day'}</td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? 'Beste prijs-vergelijker, eerlijke verzekering-add-on' : 'Best price aggregator, honest insurance add-on'}</td>
                    <td className="px-4 py-3 text-gray-600 italic">{isNl ? 'Sommige lokale bedrijven niet inbegrepen' : 'Some hyper-local companies not listed'}</td>
                    <td className="px-4 py-3"><a href={withSubId(partners.dc_phuket.partnerUrl, subId)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-thailand-red font-semibold hover:underline whitespace-nowrap">{isNl ? 'Bekijk →' : 'See deals →'}</a></td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3"><a href={withSubId(partners.trip_phuket.partnerUrl, subId)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="font-semibold text-thailand-blue hover:text-thailand-red hover:underline">Trip.com</a></td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? 'Aggregator' : 'Aggregator'}</td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">$22–85/{isNl ? 'dag' : 'day'}</td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? 'Sterk in Azië, vaak gunstige flash-deals' : 'Strong Asia inventory, frequent flash deals'}</td>
                    <td className="px-4 py-3 text-gray-600 italic">{isNl ? 'Verzekering iets duurder dan Discover Cars' : 'Insurance add-on slightly pricier than Discover Cars'}</td>
                    <td className="px-4 py-3"><a href={withSubId(partners.trip_phuket.partnerUrl, subId)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-thailand-red font-semibold hover:underline whitespace-nowrap">{isNl ? 'Bekijk →' : 'See deals →'}</a></td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold text-gray-900">Avis</td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? 'Internationaal' : 'International brand'}</td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">$35–110/{isNl ? 'dag' : 'day'}</td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? 'Betrouwbaar, 24/7 service, schone vloot' : 'Reliable, 24/7 service, clean fleet'}</td>
                    <td className="px-4 py-3 text-gray-600 italic">{isNl ? '30–50% duurder dan via aggregators' : '30–50% costlier than via aggregators'}</td>
                    <td className="px-4 py-3"><a href={withSubId(partners.dc_phuket.partnerUrl, subId)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-thailand-red font-semibold hover:underline whitespace-nowrap">{isNl ? 'Bekijk →' : 'See deals →'}</a></td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold text-gray-900">Hertz</td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? 'Internationaal' : 'International brand'}</td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">$32–105/{isNl ? 'dag' : 'day'}</td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? 'Goede loyalty-points voor Gold-leden' : 'Good loyalty perks for Gold members'}</td>
                    <td className="px-4 py-3 text-gray-600 italic">{isNl ? 'Flotte iets ouder dan Avis op Phuket' : 'Older fleet than Avis on Phuket'}</td>
                    <td className="px-4 py-3"><a href={withSubId(partners.dc_phuket.partnerUrl, subId)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-thailand-red font-semibold hover:underline whitespace-nowrap">{isNl ? 'Bekijk →' : 'See deals →'}</a></td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold text-gray-900">Sixt</td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? 'Internationaal' : 'International brand'}</td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">$40–130/{isNl ? 'dag' : 'day'}</td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? 'Premium-vloot (BMW/Mercedes)' : 'Premium fleet (BMW/Mercedes)'}</td>
                    <td className="px-4 py-3 text-gray-600 italic">{isNl ? 'Beperkte upgrade-opties op Phuket' : 'Limited upgrade options on Phuket'}</td>
                    <td className="px-4 py-3"><a href={withSubId(partners.dc_phuket.partnerUrl, subId)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-thailand-red font-semibold hover:underline whitespace-nowrap">{isNl ? 'Bekijk →' : 'See deals →'}</a></td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold text-gray-900">Budget</td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? 'Internationaal (budget)' : 'International (budget)'}</td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">$28–90/{isNl ? 'dag' : 'day'}</td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? 'Vaak goedkoper dan Avis met dezelfde vloot' : 'Often cheaper than Avis on similar fleet'}</td>
                    <td className="px-4 py-3 text-gray-600 italic">{isNl ? 'Service-niveau wisselend op Phuket' : 'Service level inconsistent on Phuket'}</td>
                    <td className="px-4 py-3"><a href={withSubId(partners.dc_phuket.partnerUrl, subId)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-thailand-red font-semibold hover:underline whitespace-nowrap">{isNl ? 'Bekijk →' : 'See deals →'}</a></td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold text-gray-900">Bizcar / Local</td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? 'Lokaal' : 'Local Phuket'}</td>
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">$18–60/{isNl ? 'dag' : 'day'}</td>
                    <td className="px-4 py-3 text-gray-700">{isNl ? 'Goedkoopst, accepteert soms cash borg' : 'Cheapest option, sometimes accepts cash deposit'}</td>
                    <td className="px-4 py-3 text-gray-600 italic">{isNl ? 'Hoger eigen risico, kleinere vloot, taalbarrière' : 'Higher excess, smaller fleet, language barrier'}</td>
                    <td className="px-4 py-3"><a href={withSubId(partners.dc_phuket.partnerUrl, subId)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-thailand-red font-semibold hover:underline whitespace-nowrap">{isNl ? 'Bekijk →' : 'See deals →'}</a></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-gray-500">{isNl ? 'Prijsklassen zijn typische 2026 economy/compact tarieven, exclusief verzekering. Aggregator-prijzen zijn vaak het laagst omdat ze diezelfde flotte indirect verkopen.' : 'Price bands are typical 2026 economy/compact rates excluding insurance. Aggregator prices are usually lowest as they resell the same fleets indirectly.'}</p>
          </section>

          {/* Top pick callout — aggregator wins for most travelers */}
          <section className="rounded-2xl bg-thailand-red/5 border-2 border-thailand-red p-6">
            <span className="inline-block rounded-full bg-thailand-red text-white text-xs font-bold uppercase tracking-wide px-3 py-1 mb-3">⭐ {isNl ? 'Beste keuze' : 'Top pick'}</span>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Voor 90% van de reizigers: Discover Cars' : 'For 90% of travelers: Discover Cars'}</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              {isNl
                ? 'Discover Cars vergelijkt aanbieders die normaal niet samen op één scherm staan (lokaal + internationaal) en hun verzekering-add-on (Full Coverage) is consistent goedkoper dan dezelfde dekking aan de balie. Dat dekt het grootste pijnpunt — het 30.000–50.000 THB eigen risico bij Thaise basisverzekeringen.'
                : "Discover Cars compares operators that don't normally appear on the same screen (local + international) and their Full Coverage insurance add-on is consistently cheaper than the same coverage bought at the counter. That solves the biggest pain point — the 30,000–50,000 THB excess on basic Thai insurance."}
            </p>
            <a
              href={withSubId(partners.dc_phuket.partnerUrl, subId)}
              target="_blank"
              rel="noopener noreferrer nofollow sponsored"
              className="inline-flex items-center rounded-full bg-thailand-red text-white px-6 py-3 text-sm font-semibold hover:bg-red-700"
            >
              {isNl ? 'Vergelijk live tarieven op Discover Cars' : 'Compare live rates on Discover Cars'} →
            </a>
          </section>

          {/* What you need section */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Wat je nodig hebt' : 'What you need to bring'}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? 'Rijbewijs + IDP' : 'License + IDP'}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? 'Je gewone rijbewijs PLUS een internationaal rijbewijs (1949 of 1968 Conventie). Politie controleert hier strikt — alleen je gewone rijbewijs = 1.000–2.000 THB boete én je verzekering vervalt. Regel je IDP via de ANWB (~€18) voor je vliegt.' : 'Your home country license PLUS an International Driving Permit (1949 or 1968 Convention). Police enforce this — getting caught with only your home license means 1,000–2,000 THB fine and voided insurance. Get the IDP at home — most automobile associations issue it in 5 minutes for $20–30.'}</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? 'Creditcard (op naam)' : 'Credit card in driver name'}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? 'Internationale merken eisen een creditcard van de bestuurder voor borg (10.000–25.000 THB hold). Lokale bedrijven nemen soms cash, maar verzekering is dan beperkter. Pinpas wordt zelden geaccepteerd voor borg.' : 'International brands require a credit card in the driver\'s name for the deposit hold (10,000–25,000 THB). Local companies sometimes accept cash but with limited insurance. Debit cards are rarely accepted for the hold.'}</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? 'Paspoort (origineel)' : 'Passport (original)'}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? 'Verhuurders maken een kopie en houden soms je paspoort gedurende de huurperiode (bij lokale bedrijven). Bij internationale merken wordt alleen een kopie gemaakt. Geef nooit je paspoort als borg.' : "Rental companies will photocopy it and (some local ones) hold it during your rental. International brands only photocopy. Never give your passport as a security deposit — that's not a legal practice."}</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? 'Hotel adres' : 'Hotel address'}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? 'Voor het registratieformulier en als je verzekeringclaim moet maken. Schrijf het op in Thais én Engels (vraag je hotel) — handig bij verkeerscontroles.' : 'For the registration form and any insurance claim. Have it written in Thai and English (ask your hotel) — useful at police checkpoints.'}</p>
              </div>
            </div>
          </section>

          {/* Buyer's guide */}
          <section className="rounded-2xl bg-amber-50 border border-amber-200 p-6">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Boekingstips' : 'Booking tips'}</h2>
            <ul className="space-y-3 text-gray-800">
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Boek 2–4 weken vooruit' : 'Book 2–4 weeks ahead'}</strong>{isNl ? ': in hoogseizoen (nov–apr) zijn populaire klassen al een week voor aankomst uitverkocht. Buiten hoogseizoen kun je vaak 2–3 dagen vooruit boeken zonder last.' : ': in high season (Nov–Apr) popular categories sell out a week before arrival. Outside high season you can often book 2–3 days ahead without issue.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Voeg full coverage toe via aggregator' : 'Add full coverage via the aggregator'}</strong>{isNl ? ': altijd $5–10/dag goedkoper dan dezelfde polis aan de balie en het brengt je eigen risico naar nul.' : ": always $5–10/day cheaper than the same policy at the counter and it drops your excess to zero."}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Fotograaf de auto bij ophaal' : 'Photograph the car at pickup'}</strong>{isNl ? ': elke deur, bumper, dak, interieur. Vooral met lokale bedrijven — anders rekenen ze later kleine krassen door.' : ": every door, bumper, roof, and interior. Especially with local companies — otherwise they'll later charge you for pre-existing scratches."}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Brandstofbeleid: full-to-full' : 'Fuel policy: full-to-full'}</strong>{isNl ? '. Lever in met dezelfde tankstand. "Pre-paid full" of "leeg-leeg" zijn meestal duurder.' : '. Return at the same level you got it. "Pre-paid full" or "empty-to-empty" is usually a bad deal.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Vermijd 1-dag huren' : 'Avoid 1-day rentals'}</strong>{isNl ? ': aanbieders rekenen vaak een toeslag voor minder dan 24 uur. 2 dagen huren kan soms goedkoper zijn dan 1 dag.' : ': companies often surcharge under 24 hours. Two days can be cheaper than one.'}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Check je auto voor je rijdt' : 'Test the car before you drive off'}</strong>{isNl ? ': airco werkt? Banden goed? Reservewiel? Lichten? Wisser-vloeistof? Drie-minuten check voor je vertrekt.' : ": AC working? Tires OK? Spare wheel? Lights? Wiper fluid? Three-minute check before you leave."}</span></li>
              <li className="flex gap-3"><span className="text-amber-700 font-bold">→</span><span><strong>{isNl ? 'Tankstations: PTT, Bangchak, Shell' : 'Gas stations: PTT, Bangchak, Shell'}</strong>{isNl ? '. Allemaal accepteren creditcard. Vermijd wegrand-pompjes met kleine fles benzine voor 5× de prijs (alleen voor scooters bedoeld).' : '. All take credit cards. Avoid roadside bottle-petrol stalls (5× the pump price — meant for scooters).'}</span></li>
            </ul>
          </section>

          {/* Where to pick up */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Waar ophalen?' : 'Where to pick up?'}</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="rounded-2xl bg-white p-5 shadow-sm border-l-4 border-green-500">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? 'Phuket Airport (HKT)' : 'Phuket Airport (HKT)'}</h3>
                <p className="text-xs text-green-700 font-semibold mb-2">{isNl ? '👍 Beste optie voor de meesten' : '👍 Best for most'}</p>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? '12+ verhuurbalies bij aankomst, kortste wachttijd, grootste keus. Aggregators leveren auto bij parking — soms 5-10 min wandeling van terminal.' : "12+ rental desks at arrivals, shortest queues, biggest selection. Aggregator cars are usually delivered at the airport parking — 5–10 min walk from terminal."}</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border-l-4 border-blue-500">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? 'Hotel ophalen' : 'Hotel delivery'}</h3>
                <p className="text-xs text-blue-700 font-semibold mb-2">{isNl ? '🔵 Handig maar duurder' : '🔵 Convenient but pricier'}</p>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? 'Auto wordt naar je hotel gebracht. 30–50% duurder dan luchthaven en kleinere keuze, maar geen taxi-rit nodig. Werkt het beste vanaf dag 2 van je verblijf.' : "Car delivered to your hotel. 30–50% costlier than airport pickup with smaller fleet, but no taxi needed. Works best from day 2 of your stay."}</p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-sm border-l-4 border-amber-500">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? 'Patong/Karon-stadskantoor' : 'Patong/Karon city office'}</h3>
                <p className="text-xs text-amber-700 font-semibold mb-2">{isNl ? '⚠️ Alleen voor specifieke routes' : '⚠️ Only for specific trips'}</p>
                <p className="text-gray-700 text-sm leading-relaxed">{isNl ? 'Lokale verhuurders hebben kantoren in toeristische zones. Goed als je pas op dag 3 begint te rijden, maar niet als je vanaf de luchthaven gaat.' : "Local operators have offices in tourist zones. Good if you'll only start driving on day 3, less so if you arrive and want to drive immediately from the airport."}</p>
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
            <h2 className="font-heading text-xl font-bold text-gray-900">{isNl ? 'Plan je hele Phuket trip' : 'Plan your whole Phuket trip'}</h2>
            <p className="mt-2 text-gray-700">{isNl ? 'Auto staat klaar — nu de rest:' : 'Car sorted — now the rest:'}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/flights-to-phuket/" className="rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">{isNl ? '✈️ Vluchten naar Phuket' : '✈️ Flights to Phuket'}</Link>
              <Link href="/best-hotels/phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏨 Beste hotels' : '🏨 Best hotels'}</Link>
              <Link href="/where-to-stay/phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🗺️ Waar verblijven' : '🗺️ Where to stay'}</Link>
              <Link href="/city/phuket/" className="rounded-full bg-white text-gray-900 border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50">{isNl ? '📖 Phuket reisgids' : '📖 Phuket travel guide'}</Link>
              <a href={withSubId(KLOOK_GENERIC, subId)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">{isNl ? '🎟️ Activiteiten (Klook)' : '🎟️ Activities (Klook)'}</a>
              <a href={withSubId(TWELVEGO_GENERIC, subId)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-white text-gray-900 border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50">{isNl ? '🚌 Bus/ferry alternatieven' : '🚌 Bus/ferry alternatives'}</a>
            </div>
          </section>

          {/* Methodology */}
          <section className="rounded-2xl bg-gray-50 border border-gray-200 p-6 text-sm text-gray-700">
            <h2 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? 'Hoe we dit vergeleken' : 'How we compared'}</h2>
            <p>{isNl ? 'Prijzen geverifieerd in mei 2026 op zowel Discover Cars als Trip.com voor pickup begin juni 2026 (Phuket Airport, 7 dagen, economy klasse). Verzekering-add-on prijzen vergeleken aan dezelfde voorwaarden. Lokaal merken-input via Phuket-recensies (Tripadvisor, Trustpilot) en steekproef in Patong/Karon. We verdienen een commissie wanneer lezers via Discover Cars of Trip.com boeken — dit verandert niets aan de prijs die jij betaalt of welke bedrijven we hier noemen.' : "Prices verified May 2026 on both Discover Cars and Trip.com for early June 2026 pickup (Phuket Airport, 7 days, economy class). Insurance add-on prices compared at matching coverage terms. Local-brand intel from Phuket reviews (Tripadvisor, Trustpilot) and on-the-ground spot checks in Patong/Karon. We earn a commission when readers book via Discover Cars or Trip.com — this never changes the price you pay or which companies we cover here."}</p>
          </section>
        </main>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const file = path.join(process.cwd(), 'data', 'pseo', 'car-rental', 'phuket-partners.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  return { props: { partners: data.partners, lastUpdated: data.lastUpdated }, revalidate: 604800 };
};
