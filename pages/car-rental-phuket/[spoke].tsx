import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import { withSubId, TIQETS_GENERIC, KLOOK_GENERIC, TWELVEGO_GENERIC } from '../../lib/affiliates';
import { useSubId } from '../../lib/useSubId';

type SpokeSlug = 'airport' | 'long-term' | 'automatic';

interface PartnerEntry { partnerUrl: string; sourceUrl: string }
interface PartnersFile {
  lastUpdated: string;
  partners: Record<string, PartnerEntry>;
}

interface SpokeMeta {
  slug: SpokeSlug;
  primaryPartner: string;
  primaryKeyword: string;
  primaryKeywordNl: string;
}

interface Props {
  spoke: SpokeMeta;
  primaryPartnerUrl: string;
  secondaryPartnerUrl: string;
  lastUpdated: string;
}

const SIBLINGS: Record<SpokeSlug, { slug: SpokeSlug; en: string; nl: string }[]> = {
  'airport': [
    { slug: 'long-term', en: 'Long-term car rental Phuket', nl: 'Auto huren Phuket lange termijn' },
    { slug: 'automatic', en: 'Automatic car rental Phuket', nl: 'Automaat huren Phuket' },
  ],
  'long-term': [
    { slug: 'airport', en: 'Phuket airport car rental', nl: 'Huurauto Phuket Airport' },
    { slug: 'automatic', en: 'Automatic car rental Phuket', nl: 'Automaat huren Phuket' },
  ],
  'automatic': [
    { slug: 'airport', en: 'Phuket airport car rental', nl: 'Huurauto Phuket Airport' },
    { slug: 'long-term', en: 'Long-term car rental Phuket', nl: 'Auto huren Phuket lange termijn' },
  ],
};

interface Copy {
  crumb: string;
  title: string;
  description: string;
  kicker: string;
  h1: string;
  hero: string;
  primaryCta: string;
  secondaryCta: string;
  badge1: string;
  badge2: string;
  statsTitle: string;
  stats: { label: string; value: string }[];
  section1Title: string;
  section1Body: string;
  section1Cards: { title: string; body: string }[];
  section2Title: string;
  section2Body: string;
  section2Cards: { title: string; body: string }[];
  guideTitle: string;
  guideTips: { strong: string; rest: string }[];
  faqTitle: string;
  faq: { q: string; a: string }[];
  meshTitle: string;
  meshIntro: string;
  pillarLabel: string;
  flightsLabel: string;
  hotelsLabel: string;
  yachtLabel: string;
  guideLabel: string;
  klookLabel: string;
  tiqetsLabel: string;
  twelveGoLabel: string;
  methodologyTitle: string;
  methodologyBody: string;
}

function getCopy(spoke: SpokeSlug, isNl: boolean): Copy {
  if (spoke === 'airport') {
    return isNl ? {
      crumb: 'Huurauto Phuket Airport',
      title: 'Huurauto Phuket Airport (HKT) 2026: 12+ Balies & Tips',
      description: 'Auto huren op Phuket Airport? 12+ verhuurbalies bij aankomst, ophaalproces, after-hours afhalen en eerlijke prijzen vanaf $20/dag.',
      kicker: 'Phuket Airport (HKT) auto verhuur',
      h1: 'Auto huren bij Phuket International Airport: ophaalgids HKT',
      hero: 'Phuket International Airport (HKT) heeft 12+ verhuurbalies in de aankomsthal — Avis, Hertz, Budget, Sixt, Thrifty plus drie lokale operators. Aggregator-auto\'s worden meestal afgeleverd op parkeerplaats P2 (5–10 min lopen). Hier vind je het echte ophaalproces, after-hours opties, en wanneer hotel-ophaal eigenlijk slimmer is.',
      primaryCta: 'Vergelijk HKT-tarieven op Discover Cars',
      secondaryCta: 'Zoeken op Trip.com',
      badge1: '12+ verhuurbalies HKT',
      badge2: '24/7 after-hours ophaal',
      statsTitle: 'Phuket Airport in cijfers',
      stats: [
        { label: 'Verhuurbalies aankomsthal', value: '12+' },
        { label: 'Internationale merken', value: '5 (Avis/Hertz/Budget/Sixt/Thrifty)' },
        { label: 'Ophaalpunt aggregator', value: 'Parking P2 (5–10 min lopen)' },
        { label: 'After-hours pickup', value: '$15–25 toeslag' },
        { label: 'Vroegste pickup', value: '06:00 (eerste vluchten)' },
        { label: 'Borg credit card', value: '10.000–25.000 THB hold' },
      ],
      section1Title: 'Het ophaalproces stap voor stap',
      section1Body: 'Tussen het uitstappen en wegrijden zit gemiddeld 30–60 min. Het verschilt per type aanbieder.',
      section1Cards: [
        { title: 'Bij internationale merken (Avis/Hertz/Budget/Sixt)', body: 'Loop na bagage rechtstreeks naar de balies in de aankomsthal (Terminal Internationaal, Level 1, links na de uitgang). Toon paspoort, rijbewijs, IDP, creditcard. Tekenen, sleutel ophalen, lopen naar P1/P2. Totaal: 30–45 min.' },
        { title: 'Bij aggregator (Discover Cars / Trip.com)', body: 'Je krijgt een telefoonnummer. Bel of WhatsApp 5–10 min voor je uitstapt. Medewerker ontmoet je bij Exit 4 of 5 in de aankomsthal met bordje. Loop samen naar parking P2. Papierwerk gebeurt vaak bij de auto. Totaal: 25–40 min.' },
        { title: 'After-hours (na 22:00)', body: 'Internationale balies sluiten meestal om 22:00–23:00. Aggregator-leveringen werken 24/7 maar rekenen $15–25 toeslag voor aankomsten 23:00–06:00. Geef je vluchtnummer altijd door — bij vertraging blijven ze wachten.' },
      ],
      section2Title: 'Eerlijk: airport vs hotel vs marina ophalen',
      section2Body: 'De luchthaven wint voor 80% van de reizigers, maar niet altijd. Hier is wanneer hotel-ophaal of een marina-ophaal slimmer is.',
      section2Cards: [
        { title: 'Luchthaven ophalen — beste voor de meesten', body: 'Grootste keuze, kortste wachttijd, vaak 30–50% goedkoper dan hotel-ophaal. Beste als je dezelfde dag wilt rijden of dagtrips plant naar Phang Nga, Krabi, James Bond Island. Nadeel: na een lange vlucht direct linksrijden in chaotisch verkeer kan zwaar zijn.' },
        { title: 'Hotel-ophaal — beste vanaf dag 2', body: 'Geen taxi-rit van $25–35 nodig vanaf HKT. 30–50% duurder per dag, kleinere keuze (vaak alleen economy + compact). Slim als je eerst 1–2 dagen wilt acclimatiseren in Patong/Karon en pas daarna gaat rijden. Lokale operators in Patong leveren tot 22:00.' },
        { title: 'Marina/Royal Phuket Marina — niche', body: 'Alleen relevant als je arriveert per ferry vanaf Krabi/Phi Phi en niet langs HKT komt. Beperkte keuze (3–4 lokale operators), prijzen vergelijkbaar met luchthaven. Boek vooruit — geen walk-in inventaris zoals HKT.' },
      ],
      guideTitle: 'HKT ophaal-tips',
      guideTips: [
        { strong: 'Bewaar je vluchtnummer in de boeking', rest: '— bij vertragingen wachten goede aanbieders 1–2 uur extra zonder toeslag, mits ze de vlucht kunnen tracken.' },
        { strong: 'Lever je IDP origineel in, niet de digitale versie', rest: '. Sommige medewerkers accepteren geen scan op je telefoon — een $20 plastic boekje voorkomt gedoe.' },
        { strong: 'Loop rond de auto met je telefoon op video', rest: ' voor je wegrijdt. Iedere kras, iedere bumper, dak, interieur. Stuur de video naar jezelf met datum-stempel.' },
        { strong: 'Tank vol bij PTT op Highway 402', rest: ' (5 km richting Phuket-stad) — directe HKT-omgeving heeft alleen kleine pompjes met bottle-prijzen.' },
        { strong: 'Patong-route via highway, niet via West Coast Road na 18:00', rest: '. De kustweg is mooier maar slingert in het donker met scooters zonder licht.' },
        { strong: 'Vermijd Sunday-pickup als je alleen 7 dagen huurt', rest: ' — sommige aggregators rekenen automatisch 8 dagen door als ophalen op zondag is en inleveren op zondagochtend voor 11:00.' },
        { strong: 'Vraag om de Thai-ID-kaart van de auto', rest: ' bij ophaal. Die heb je nodig bij verzekeringclaim én bij politie-controle (vervangt Thais kentekenbewijs).' },
      ],
      faqTitle: 'Veelgestelde vragen — HKT ophaal',
      faq: [
        { q: 'Hoe vind ik de huurautobalies in HKT aankomsthal?',
          a: 'Volg na douane en bagage de borden "Car Rental" — de balies staan in de aankomsthal van de Internationale Terminal links naast Exit 4–5. Inrijhal, niet vertrek. 12+ desks naast elkaar: Avis, Hertz, Budget, Sixt, Thrifty, Bizcar, en 3 lokale operators. De Domestic Terminal heeft GEEN huurautobalies — als je vanuit Bangkok komt loop je naar de Internationale Terminal (3 min wandeling).' },
        { q: 'Werkt after-hours pickup echt op HKT?',
          a: 'Ja, maar alleen via aggregators (Discover Cars, Trip.com) of vooraf-geboekte hotel-levering. Internationale merken sluiten 22:00–23:00. Aggregator-medewerkers blijven 24/7 oproepbaar via mobiel — bel 30 min voor landing. Toeslag $15–25 voor pickups 23:00–06:00. Geef vluchtnummer + WhatsApp-nummer door bij boeking.' },
        { q: 'Moet ik vanaf P2-parking lopen of komen ze me halen?',
          a: 'Aggregator-medewerkers wachten in de aankomsthal bij Exit 4/5 met een bordje (jouw naam of bedrijfsnaam). Daarna lopen jullie samen 5–10 min naar P2 of P3. Internationale merken: papierwerk aan de balie, dan zelf lopen naar de gemarkeerde parking met sleutel. Geen shuttle — afstand is te kort.' },
        { q: 'Wat als mijn vlucht 3 uur vertraagd is?',
          a: 'Geef altijd je vluchtnummer door bij boeking (verplicht veld bij Discover Cars/Trip.com). Als de aanbieder het kan tracken, blijven ze wachten zonder toeslag tot 2 uur vertraging. Bij langere vertraging soms een no-show fee — bel direct als je een vertraging boven 2 uur ziet aankomen.' },
        { q: 'Kan ik elders inleveren dan HKT?',
          a: 'Ja. "One-way" inlevering bij Patong, Karon, Kata, Phuket Town of zelfs Krabi Airport (KBV) is mogelijk. Toeslag varieert: Patong/Karon meestal $15–25, Phuket Town $10, Krabi Airport $40–60 (twee provincies overschrijden). Boek deze optie bij reservering — kan je niet bij ophaal toevoegen.' },
      ],
      meshTitle: 'Plan je hele Phuket-reis',
      meshIntro: 'Auto staat klaar — nu de rest:',
      pillarLabel: '🚗 Alle 7 verhuurders (pillar)',
      flightsLabel: '✈️ Vluchten naar Phuket',
      hotelsLabel: '🏨 Beste hotels in Phuket',
      yachtLabel: '⛵ Yacht charter Phuket',
      guideLabel: '📖 Phuket reisgids',
      klookLabel: '🎟️ Activiteiten (Klook)',
      tiqetsLabel: '🎫 Attractie-tickets (Tiqets)',
      twelveGoLabel: '🚌 Bus/ferry alternatieven',
      methodologyTitle: 'Hoe we dit verifieerden',
      methodologyBody: 'HKT-ophaalproces gecontroleerd in mei 2026 met live boekingen via Discover Cars en Trip.com voor begin juni 2026. After-hours info getest met telefonische check bij 4 lokale operators. Borg-bedragen geverifieerd aan de balies van Avis, Hertz, Budget en Sixt. We verdienen een commissie als je via Discover Cars of Trip.com boekt — dat verandert nooit jouw prijs of welke aanbieders we noemen.',
    } : {
      crumb: 'Phuket Airport Car Rental',
      title: 'Phuket Airport Car Rental (HKT) 2026: 12+ Desks & Tips',
      description: 'Renting a car at Phuket Airport? 12+ rental desks at arrivals, pickup process, after-hours options and honest prices from $20/day.',
      kicker: 'Phuket Airport (HKT) car rental',
      h1: 'How to Rent a Car at Phuket International Airport: HKT Pickup Guide',
      hero: 'Phuket International Airport (HKT) has 12+ rental desks in the arrivals hall — Avis, Hertz, Budget, Sixt, Thrifty plus three local operators. Aggregator cars are usually delivered at parking lot P2 (5–10 min walk). Here\'s the real pickup process, after-hours options, and when hotel pickup is actually smarter.',
      primaryCta: 'Compare HKT rates on Discover Cars',
      secondaryCta: 'Search on Trip.com',
      badge1: '12+ rental desks at HKT',
      badge2: '24/7 after-hours pickup',
      statsTitle: 'Phuket Airport at a glance',
      stats: [
        { label: 'Rental desks at arrivals', value: '12+' },
        { label: 'International brands', value: '5 (Avis/Hertz/Budget/Sixt/Thrifty)' },
        { label: 'Aggregator pickup spot', value: 'Parking P2 (5–10 min walk)' },
        { label: 'After-hours surcharge', value: '$15–25 extra' },
        { label: 'Earliest pickup', value: '06:00 (first flights)' },
        { label: 'Credit card hold', value: '10,000–25,000 THB' },
      ],
      section1Title: 'The pickup process step by step',
      section1Body: 'Between deplaning and driving off you should budget 30–60 min. It depends on the operator type.',
      section1Cards: [
        { title: 'International brands (Avis/Hertz/Budget/Sixt)', body: 'After baggage, walk straight to the rental desks in the International Terminal arrivals hall (Level 1, left of Exit 4). Show passport, license, IDP, credit card. Sign, get keys, walk to P1/P2 parking. Total: 30–45 min.' },
        { title: 'Aggregator (Discover Cars / Trip.com)', body: 'You receive a phone number. Call or WhatsApp 5–10 min before exiting baggage. Agent meets you at Exit 4 or 5 in arrivals with a name sign. Walk together to parking P2. Paperwork often happens at the car. Total: 25–40 min.' },
        { title: 'After-hours (after 22:00)', body: 'International desks usually close 22:00–23:00. Aggregator deliveries run 24/7 but charge $15–25 surcharge for pickups 23:00–06:00. Always include your flight number — if delayed they\'ll wait.' },
      ],
      section2Title: 'Honest: airport vs hotel vs marina pickup',
      section2Body: 'Airport wins for 80% of travelers, but not always. Here\'s when hotel pickup or marina pickup makes more sense.',
      section2Cards: [
        { title: 'Airport pickup — best for most', body: 'Biggest selection, shortest queues, often 30–50% cheaper than hotel pickup. Best if you want to drive same-day or plan day trips to Phang Nga, Krabi, James Bond Island. Downside: jumping straight into left-hand-drive traffic after a long flight can be heavy.' },
        { title: 'Hotel pickup — best from day 2', body: 'Skip the $25–35 taxi from HKT. 30–50% pricier per day, smaller fleet (often economy + compact only). Smart if you want to acclimate 1–2 days in Patong/Karon before driving. Local operators deliver to Patong until 22:00.' },
        { title: 'Marina/Royal Phuket Marina — niche', body: 'Only relevant if you arrive by ferry from Krabi/Phi Phi and skip HKT entirely. Limited fleet (3–4 local operators), prices similar to airport. Pre-book — no walk-in inventory like HKT has.' },
      ],
      guideTitle: 'HKT pickup tips',
      guideTips: [
        { strong: 'Save your flight number in the booking', rest: ' — when delays happen, good operators wait 1–2 extra hours without surcharge if they can track the flight.' },
        { strong: 'Bring the original IDP, not a digital copy', rest: '. Some agents refuse phone scans — a $20 plastic booklet prevents hassle.' },
        { strong: 'Walk around the car with your phone on video', rest: ' before driving off. Every door, bumper, roof, interior. Send the video to yourself with timestamp.' },
        { strong: 'Fuel up at PTT on Highway 402', rest: ' (5 km toward Phuket Town) — the immediate HKT area only has small bottle-petrol stalls at marked-up prices.' },
        { strong: 'Take Highway to Patong, not West Coast Road after 18:00', rest: '. The coastal route is prettier but winds in the dark with unlit scooters.' },
        { strong: 'Avoid Sunday pickup if you only book 7 days', rest: ' — some aggregators auto-charge 8 days when pickup is Sunday and return is Sunday morning before 11:00.' },
        { strong: 'Ask for the car\'s Thai registration card', rest: ' at pickup. You need it for insurance claims AND police checkpoints (replaces Thai vehicle papers).' },
      ],
      faqTitle: 'Frequently asked questions — HKT pickup',
      faq: [
        { q: 'How do I find the rental desks in HKT arrivals?',
          a: 'After customs and baggage, follow "Car Rental" signs — desks are in the International Terminal arrivals hall, left of Exit 4–5. Arrivals, not departures. 12+ desks side by side: Avis, Hertz, Budget, Sixt, Thrifty, Bizcar, and 3 local operators. The Domestic Terminal has NO rental desks — if you fly in from Bangkok, walk to the International Terminal (3 min walk).' },
        { q: 'Does after-hours pickup actually work at HKT?',
          a: 'Yes, but only via aggregators (Discover Cars, Trip.com) or pre-booked hotel delivery. International brands close 22:00–23:00. Aggregator agents stay on-call 24/7 by mobile — call 30 min before landing. Surcharge $15–25 for pickups 23:00–06:00. Provide flight number + WhatsApp number when booking.' },
        { q: 'Do I walk to P2 parking, or do they meet me?',
          a: 'Aggregator agents wait in the arrivals hall at Exit 4/5 with a name sign (yours or company). Then you walk together 5–10 min to P2 or P3. International brands: paperwork at the desk, then walk to the marked parking with your keys. No shuttle — distance is too short.' },
        { q: 'What if my flight is 3 hours delayed?',
          a: 'Always provide your flight number when booking (mandatory field on Discover Cars/Trip.com). If the operator can track it, they wait without surcharge for delays up to 2 hours. Beyond that there\'s sometimes a no-show fee — call directly the moment you see a 2+ hour delay incoming.' },
        { q: 'Can I drop off somewhere other than HKT?',
          a: 'Yes. One-way returns at Patong, Karon, Kata, Phuket Town or even Krabi Airport (KBV) are possible. Surcharge varies: Patong/Karon usually $15–25, Phuket Town $10, Krabi Airport $40–60 (crosses two provinces). Book this option at reservation — you can\'t add it at pickup.' },
      ],
      meshTitle: 'Plan your whole Phuket trip',
      meshIntro: 'Car sorted — now the rest:',
      pillarLabel: '🚗 All 7 rental companies (pillar)',
      flightsLabel: '✈️ Flights to Phuket',
      hotelsLabel: '🏨 Best hotels in Phuket',
      yachtLabel: '⛵ Yacht charter Phuket',
      guideLabel: '📖 Phuket travel guide',
      klookLabel: '🎟️ Activities (Klook)',
      tiqetsLabel: '🎫 Attraction tickets (Tiqets)',
      twelveGoLabel: '🚌 Bus/ferry alternatives',
      methodologyTitle: 'How we verified this',
      methodologyBody: 'HKT pickup process verified in May 2026 via live bookings on Discover Cars and Trip.com for early June 2026. After-hours info confirmed by phone with 4 local operators. Deposit holds verified at Avis, Hertz, Budget and Sixt counters. We earn a commission when readers book through Discover Cars or Trip.com — this never changes the price you pay or which operators we cover.',
    };
  }

  if (spoke === 'long-term') {
    return isNl ? {
      crumb: 'Lange termijn auto huren Phuket',
      title: 'Auto Huren Phuket Lange Termijn 2026: Maandprijzen',
      description: 'Auto huren in Phuket voor 1+ maand? Maandtarieven $400–1.200, contractsoorten, verzekering bij lange huur en eerlijke vergelijking.',
      kicker: 'Lange termijn auto verhuur Phuket',
      h1: 'Maandelijks auto huren in Phuket: prijzen, contracten & tips voor expats',
      hero: 'Op Phuket blijven voor een maand of langer? Daghuren voor 30 dagen kost al snel $1.500–2.000 — maar een maandcontract zit op $400–1.200 voor dezelfde auto. Hier vind je hoe lange termijn-tarieven echt werken, welke verzekering je nodig hebt, en wanneer je beter naar een lokale Phuket-aanbieder gaat dan naar een aggregator.',
      primaryCta: 'Vergelijk maandtarieven op Discover Cars',
      secondaryCta: 'Zoeken op Trip.com',
      badge1: 'Maandtarieven vanaf $400',
      badge2: 'Tot 60% goedkoper dan daghuur',
      statsTitle: 'Lange termijn prijsklassen (28+ dagen)',
      stats: [
        { label: '1 maand economy (Yaris/Brio)', value: '$400–650' },
        { label: '1 maand compact SUV (Yaris Cross)', value: '$650–950' },
        { label: '1 maand mid-size SUV (CR-V/Fortuner)', value: '$900–1.500' },
        { label: '3 maanden economy', value: '$1.000–1.700 (gem. $11–19/dag)' },
        { label: '6 maanden economy', value: '$1.800–3.000 (gem. $10–17/dag)' },
        { label: 'Eigen risico full cover', value: '0–10.000 THB (laag)' },
      ],
      section1Title: 'Drie contracttypes — wat past bij jou?',
      section1Body: 'Lange-termijn-prijzen werken anders dan dagtarieven. Belasting, kilometerlimiet en verzekering zien er allemaal anders uit.',
      section1Cards: [
        { title: 'Aggregator maandboeking (28–90 dagen)', body: 'Discover Cars en Trip.com tonen automatisch het maandtarief als je 28+ dagen kiest. Onbeperkt km, full cover beschikbaar via aggregator-add-on, betaling vooraf of bij ophaal. Beste voor 1–3 maanden. Voorbeeld: Yaris in mei 2026, 30 dagen, $480 met full cover.' },
        { title: 'Lokaal maandcontract (1–6 maanden)', body: 'Phuket-aanbieders zoals Bizcar, Phuket Cheap Car Rental of Suzy bieden directe maandcontracten met cash- of bankoverschrijving betaling. 10–20% goedkoper dan aggregator, maar eigen risico vaak hoger (30.000–50.000 THB) tenzij je extra verzekering toevoegt. Vraag altijd schriftelijk contract.' },
        { title: 'Lease (3–12 maanden, expat-route)', body: 'Voor expats die 6+ maanden blijven. Vereist Thais werk- of pensioenvisum + bankrekening. Zit rond $300–500/maand voor een Yaris, maar je betaalt 20% BTW vooraf én een borg van 1 maand. Niet aanbevolen voor toeristen — administratief gedoe.' },
      ],
      section2Title: 'Verzekering bij lange huur — anders dan daghuur',
      section2Body: 'Bij 1+ maand wordt verzekering belangrijker. Een schade-voorval bij dag 25 van een 30-daagse huur betekent vaak dat je nog 5 dagen zonder auto zit terwijl ze repareren.',
      section2Cards: [
        { title: 'Wat basisverzekering NIET dekt op lang termijn', body: 'Standaard Thaise verzekering dekt third-party (anderen) en de auto op minimaal niveau. Eigen risico 30.000–50.000 THB blijft. Banden, ruiten, dak, en verlies van sleutels zijn meestal NIET gedekt — bij 1 maand huren is de kans op één van deze events significant. Vraag specifiek naar tire/glass coverage.' },
        { title: 'Full Cover vs Super Cover bij lange termijn', body: 'Full Cover (Discover Cars / aggregator add-on): brengt eigen risico naar nul, dekt theft + collision. Kost $8–15/dag — bij 30 dagen $240–450 extra. Super Cover (sommige lokalen): voegt banden, ruiten, sleutels toe, kost $15–25/dag. Bij verblijven 2+ maanden vaak voordeliger om Super af te sluiten.' },
        { title: 'Reisverzekering vs auto-verzekering', body: 'Je reis- of expat-verzekering dekt meestal NIET het eigen risico van een huurauto, ondanks beloftes. Lees de polis. Voor digitale nomaden: SafetyWing en World Nomads sluiten huurauto-aansprakelijkheid expliciet uit. Reken altijd op de aggregator-verzekering als primaire dekking.' },
      ],
      guideTitle: 'Lange-termijn boekingstips',
      guideTips: [
        { strong: 'Boek altijd 28 of 30 dagen, niet 27', rest: '. De maand-prijsbreuk start bij 28+ dagen op de meeste platforms. 27 dagen wordt 27× dagprijs gerekend (50% duurder).' },
        { strong: 'Vraag om contract-verlenging vooraf', rest: ': als je misschien wilt verlengen, vraag bij ophaal of de prijs blijft staan. Last-minute verlengen kan 30% extra kosten of "geen auto beschikbaar" opleveren in hoogseizoen.' },
        { strong: 'Onderhoudsbeurt zit in maandcontract', rest: '. Goede aanbieders includeren één service-beurt bij 3+ maanden huur (olie, banden checken). Vraag dit expliciet — anders kun je verantwoordelijk zijn voor onderhoud.' },
        { strong: 'Maandelijkse km-cap check', rest: '. De meeste aggregator-maandtarieven zijn onbeperkt. Lokalen zetten soms een cap van 3.000–5.000 km/maand. Bij 5.000 km is dat 167 km/dag — voldoende voor eilandgebruik, krap als je naar Krabi/Phang Nga reist.' },
        { strong: 'Betaling: vermijd 100% vooraf bij lokalen', rest: '. Verspreid: aanbetaling 30–50% bij ophaal, restbedrag halverwege of bij retour. Voorkomt verlies bij ondergang van de aanbieder (gebeurde 2 keer in 2024 op Phuket).' },
        { strong: 'Inleverlocatie kan veranderen', rest: '. Bij 3+ maanden huur kun je vaak gratis switchen van inleverlocatie (HKT, Patong, Phuket Town). Vraag dit bij boeking — kan later $30–60 schelen.' },
        { strong: 'Maandelijks switchen van auto kan goedkoper zijn', rest: ' dan 6 maanden in één: prijzen daltrend tussen mei–oktober (laagseizoen). Boek 1 maand laagseizoen → 1 maand hoogseizoen apart in plaats van 2 maanden hoogseizoen-tarief.' },
      ],
      faqTitle: 'Veelgestelde vragen — lange termijn',
      faq: [
        { q: 'Vanaf hoeveel dagen geldt het maandtarief?',
          a: '28 of 30 dagen op aggregators (Discover Cars: 28 dagen, Trip.com: 30 dagen). Tussen 8–27 dagen krijg je een "weekly+" tarief dat ongeveer 30% goedkoper is dan dagtarief, maar nog niet zo gunstig als maand. 27 dagen huren is bijna altijd duurder dan 30 dagen — boek liever 30 zelfs als je 27 nodig hebt.' },
        { q: 'Kan ik bij lange huur cash betalen?',
          a: 'Bij internationale merken (Avis/Hertz/Budget): nee, creditcard verplicht voor de borg. Bij lokale Phuket-aanbieders: meestal ja, maar borg blijft (cash 20.000–30.000 THB of bankoverschrijving). Aggregators staan tussen — sommige aanbieders accepteren bankoverschrijving voor de huur maar verlangen creditcard voor de borg-hold.' },
        { q: 'Wat als ik de auto langer wil houden?',
          a: 'Verleng minimaal 7 dagen voor de retour-datum. In hoogseizoen (nov–apr) heb je geen garantie dat dezelfde auto beschikbaar blijft. Aggregators tonen meestal de live-prijs voor verlenging in je account — die kan hoger of lager zijn dan je oorspronkelijke maandprijs. Bij lokalen: tarief is meestal hetzelfde, maar bevestig schriftelijk.' },
        { q: 'Heb ik een Thais rijbewijs nodig bij verblijf van 6+ maanden?',
          a: 'Strikt genomen: ja, na 90 dagen residentie. Praktisch: politie controleert dit zelden bij toeristen op een Yaris/Brio. Maar bij ongeval kan je verzekering vervallen. Voor verblijf 6+ maanden: haal het Thai license (5 dagen-cursus, ~3.000 THB bij DLT in Phuket Town). Geldig voor 2 jaar.' },
        { q: 'Wat gebeurt er bij schade halverwege een 3-maanden-huur?',
          a: 'Met Full Cover: aanbieders ruilen meestal binnen 24–48 uur de auto om. Zonder Full Cover: jij betaalt de reparatie tot het eigen risico, en bent zonder auto tot reparatie klaar (meestal 5–10 werkdagen voor blikschade). Bij 3-maanden-huur is het verlies van 7 dagen mobiliteit alleen al de Full Cover-kosten waard.' },
      ],
      meshTitle: 'Plan je lange Phuket-verblijf',
      meshIntro: 'Auto voor de lange duur — hier is wat verder helpt:',
      pillarLabel: '🚗 Alle 7 verhuurders (pillar)',
      flightsLabel: '✈️ Vluchten naar Phuket',
      hotelsLabel: '🏨 Beste hotels & long-stay',
      yachtLabel: '⛵ Yacht charter Phuket',
      guideLabel: '📖 Phuket reisgids',
      klookLabel: '🎟️ Activiteiten (Klook)',
      tiqetsLabel: '🎫 Attractie-tickets (Tiqets)',
      twelveGoLabel: '🚌 Bus/ferry alternatieven',
      methodologyTitle: 'Hoe we dit verifieerden',
      methodologyBody: 'Maandtarieven gecheckt mei 2026 op Discover Cars en Trip.com voor 30-, 60- en 90-dagen huur startend juni 2026, economy en compact-categorieën. Lokale Phuket-prijzen vergeleken via Bizcar, Suzy en Phuket Cheap Car Rental websites + telefoon-quotes. Verzekeringsvoorwaarden gelezen in policydocumenten van Discover Cars (Cap Direct), niet alleen marketing-pagina. We verdienen commissie op bevestigde boekingen via Discover Cars / Trip.com — verandert niets aan jouw prijs.',
    } : {
      crumb: 'Long-term car rental Phuket',
      title: 'Long Term Car Rental Phuket 2026: Monthly Rates Guide',
      description: 'Renting a car in Phuket for a month or more? Monthly rates $400–1,200, contract types, long-term insurance and an honest comparison.',
      kicker: 'Long-term car rental Phuket',
      h1: 'Monthly Car Rental in Phuket: Prices, Contracts & Tips for Long Stays',
      hero: 'Staying in Phuket for a month or longer? Daily renting for 30 days quickly costs $1,500–2,000 — but a monthly contract sits at $400–1,200 for the same car. Here\'s how long-term rates actually work, what insurance you need, and when a local Phuket operator beats an aggregator for extended stays.',
      primaryCta: 'Compare monthly rates on Discover Cars',
      secondaryCta: 'Search on Trip.com',
      badge1: 'Monthly rates from $400',
      badge2: 'Up to 60% cheaper than daily',
      statsTitle: 'Long-term price bands (28+ days)',
      stats: [
        { label: '1 month economy (Yaris/Brio)', value: '$400–650' },
        { label: '1 month compact SUV (Yaris Cross)', value: '$650–950' },
        { label: '1 month mid-size SUV (CR-V/Fortuner)', value: '$900–1,500' },
        { label: '3 months economy', value: '$1,000–1,700 (avg $11–19/day)' },
        { label: '6 months economy', value: '$1,800–3,000 (avg $10–17/day)' },
        { label: 'Excess with full cover', value: '0–10,000 THB (low)' },
      ],
      section1Title: 'Three contract types — which fits you?',
      section1Body: 'Long-term pricing works differently from daily rates. Tax, mileage caps and insurance all look different.',
      section1Cards: [
        { title: 'Aggregator monthly booking (28–90 days)', body: 'Discover Cars and Trip.com auto-show the monthly rate when you select 28+ days. Unlimited mileage, full cover available via aggregator add-on, payment upfront or at pickup. Best for 1–3 months. Example: Yaris in May 2026, 30 days, $480 including full cover.' },
        { title: 'Local monthly contract (1–6 months)', body: 'Phuket operators like Bizcar, Phuket Cheap Car Rental or Suzy offer direct monthly contracts with cash or bank-transfer payment. 10–20% cheaper than aggregator, but excess often higher (30,000–50,000 THB) unless you add extra insurance. Always get a written contract.' },
        { title: 'Lease (3–12 months, expat route)', body: 'For expats staying 6+ months. Requires Thai work or retirement visa + local bank account. Around $300–500/month for a Yaris, but you pay 20% VAT upfront plus a 1-month deposit. Not recommended for tourists — too much paperwork.' },
      ],
      section2Title: 'Insurance on long rentals — different from daily',
      section2Body: 'On 1+ month rentals insurance becomes more important. A damage event on day 25 of a 30-day rental often means you go without a car for 5 days while they repair.',
      section2Cards: [
        { title: 'What basic insurance does NOT cover long-term', body: 'Standard Thai insurance covers third-party and the car at minimum. Excess 30,000–50,000 THB stays. Tires, windows, roof, and lost keys are typically NOT covered — over a month, the chance of one of these events is significant. Specifically ask about tire/glass coverage.' },
        { title: 'Full Cover vs Super Cover on long-term', body: 'Full Cover (Discover Cars / aggregator add-on): excess to zero, covers theft + collision. Costs $8–15/day — that\'s $240–450 over 30 days. Super Cover (some locals): adds tires, glass, keys, costs $15–25/day. On 2+ month stays, Super often pays for itself.' },
        { title: 'Travel insurance vs car insurance', body: 'Your travel or expat insurance usually does NOT cover rental car excess, despite marketing claims. Read the policy. For digital nomads: SafetyWing and World Nomads explicitly exclude rental car liability. Always treat the aggregator insurance as primary coverage.' },
      ],
      guideTitle: 'Long-term booking tips',
      guideTips: [
        { strong: 'Always book 28 or 30 days, not 27', rest: '. The monthly price break starts at 28+ days on most platforms. 27 days gets charged 27× daily (50% pricier).' },
        { strong: 'Ask about extension pricing upfront', rest: ': if you might extend, ask at pickup whether the rate is locked. Last-minute extensions can cost 30% extra or get "no car available" in high season.' },
        { strong: 'Maintenance servicing is included on multi-month contracts', rest: '. Good operators include one service stop on 3+ month rentals (oil, tire check). Ask explicitly — otherwise you may be on the hook for maintenance.' },
        { strong: 'Check the monthly mileage cap', rest: '. Most aggregator monthly rates are unlimited. Locals sometimes set 3,000–5,000 km/month caps. 5,000 km = 167 km/day — fine for island use, tight for trips to Krabi/Phang Nga.' },
        { strong: 'Payment: avoid 100% upfront with locals', rest: '. Spread it: 30–50% deposit at pickup, balance mid-contract or at return. Protects you if the operator goes under (happened twice in 2024 on Phuket).' },
        { strong: 'Drop-off location can change', rest: '. On 3+ month rentals you can often switch return location (HKT, Patong, Phuket Town) for free. Ask at booking — saves $30–60 later.' },
        { strong: 'Booking month-by-month can beat one long contract', rest: ': prices trend down between May–October (low season). Booking 1 month low season + 1 month high season separately can beat 2 months at high-season rates.' },
      ],
      faqTitle: 'Frequently asked questions — long-term',
      faq: [
        { q: 'How many days qualify for monthly rates?',
          a: '28 or 30 days on aggregators (Discover Cars: 28, Trip.com: 30). Between 8–27 days you get a "weekly+" rate roughly 30% below daily, but not as good as monthly. Renting 27 days is almost always pricier than 30 — book 30 even if you only need 27.' },
        { q: 'Can I pay cash on a long rental?',
          a: 'International brands (Avis/Hertz/Budget): no, credit card required for the deposit. Local Phuket operators: usually yes, but the deposit remains (cash 20,000–30,000 THB or bank transfer). Aggregators sit in between — some operators accept bank transfer for the rental but require credit card for the deposit hold.' },
        { q: 'What if I want to keep the car longer?',
          a: 'Extend at least 7 days before the return date. In high season (Nov–Apr) there\'s no guarantee the same car stays available. Aggregators usually show the live extension price in your account — could be higher or lower than your original monthly rate. With locals: rate usually stays, but confirm in writing.' },
        { q: 'Do I need a Thai license on a 6+ month stay?',
          a: 'Strictly: yes, after 90 days of residence. Practically: police rarely check this with tourists in a Yaris/Brio. But your insurance can void on accident. For 6+ month stays: get the Thai license (5-day course, ~3,000 THB at DLT in Phuket Town). Valid 2 years.' },
        { q: 'What happens if there\'s damage mid-way through a 3-month rental?',
          a: 'With Full Cover: operators usually swap the car within 24–48 hours. Without Full Cover: you pay the repair up to excess, and go without a car until repair is done (typically 5–10 working days for body damage). On a 3-month rental, losing 7 days of mobility alone justifies the Full Cover cost.' },
      ],
      meshTitle: 'Plan your long Phuket stay',
      meshIntro: 'Long-term car sorted — here\'s what else helps:',
      pillarLabel: '🚗 All 7 rental companies (pillar)',
      flightsLabel: '✈️ Flights to Phuket',
      hotelsLabel: '🏨 Best hotels & long-stay',
      yachtLabel: '⛵ Yacht charter Phuket',
      guideLabel: '📖 Phuket travel guide',
      klookLabel: '🎟️ Activities (Klook)',
      tiqetsLabel: '🎫 Attraction tickets (Tiqets)',
      twelveGoLabel: '🚌 Bus/ferry alternatives',
      methodologyTitle: 'How we verified this',
      methodologyBody: 'Monthly rates checked May 2026 on Discover Cars and Trip.com for 30-, 60- and 90-day rentals starting June 2026, economy and compact categories. Local Phuket prices compared via Bizcar, Suzy and Phuket Cheap Car Rental websites plus phone quotes. Insurance terms read in Cap Direct policy documents underlying Discover Cars\' Full Cover, not just the marketing page. We earn commission on confirmed bookings via Discover Cars / Trip.com — never changes your price.',
    };
  }

  // automatic
  return isNl ? {
    crumb: 'Automaat huren Phuket',
    title: 'Automaat Huren in Phuket 2026: Welke Auto\'s & Prijzen',
    description: 'Automaat huren in Phuket? Yaris, City en Vios zijn standaard automaat. Vergelijk prijzen, $5–10/dag premium en eerlijke tips.',
    kicker: 'Automaat auto verhuur Phuket',
    h1: 'Auto met automaat huren in Phuket: welke modellen, wat kost het écht',
    hero: 'Bijna alle moderne huurauto\'s in Phuket zijn al automaat — Toyota Yaris, Honda City en Toyota Vios komen standaard met automatische versnellingsbak. De handgeschakelde optie kom je vooral tegen bij oudere of lokale budgetauto\'s. Hier vind je welke auto\'s gegarandeerd automaat zijn, hoeveel premium je werkelijk betaalt, en waar de stiekeme handgeschakelde verhuurders schuilen.',
    primaryCta: 'Filter op automaat — Discover Cars',
    secondaryCta: 'Zoeken op Trip.com',
    badge1: '95% van de vloot al automaat',
    badge2: '$5–10/dag premium boven manueel',
    statsTitle: 'Automaat in cijfers — Phuket vloot',
    stats: [
      { label: 'Aandeel auto\'s al automaat', value: '~95% (aggregator-vloot)' },
      { label: 'Premium boven handgeschakeld', value: '$5–10/dag (~25%)' },
      { label: 'Standaard automaat-modellen', value: 'Yaris, City, Vios, Yaris Cross' },
      { label: 'Soms manueel beschikbaar', value: 'Honda Brio, Suzuki Swift (oude versies)' },
      { label: 'Goedkoopste automaat economy', value: '$22–30/dag laagseizoen' },
      { label: 'Goedkoopste automaat SUV', value: '$38–50/dag laagseizoen' },
    ],
    section1Title: 'Welke modellen zijn gegarandeerd automaat?',
    section1Body: 'In de Thaise huurautomarkt is "automaat" niet altijd in de filter expliciet. Hier is per model wat je krijgt.',
    section1Cards: [
      { title: 'Toyota Yaris (2018–2024) — 100% automaat', body: 'Het meest verhuurde model op Phuket. Alle versies sinds 2018 zijn CVT (continu variabele transmissie). Geen handgeschakelde Yaris in de aggregator-vloot. Brandstofzuinig, comfortabele rit, makkelijk parkeren in Patong. $20–35/dag laagseizoen.' },
      { title: 'Honda City / Honda Brio — gemengd', body: 'Honda City is sinds 2020 standaard CVT. Honda Brio (kleinere economy) heeft nog ~30% handgeschakelde versies bij lokale aanbieders. Bij Brio expliciet checken — de filter "automaat" werkt niet altijd op lokale-vloot listings. Bij internationale merken altijd automaat.' },
      { title: 'Toyota Vios + Yaris Cross — 100% automaat', body: 'Toyota Vios (sedan) en Yaris Cross (compact SUV) zijn beide standaard CVT. Vios is iets ruimer dan Yaris voor 4 volwassenen, $25–40/dag. Yaris Cross is de SUV-versie ($35–50/dag) — zelfde aandrijflijn, hogere zit, betere zicht in Phukets bergachtige routes.' },
    ],
    section2Title: 'Premium-rekenwerk: automaat vs handgeschakeld',
    section2Body: 'Veel reizigers vragen zich af of de premium voor automaat de moeite waard is. Voor Phuket: ja, bijna altijd.',
    section2Cards: [
      { title: 'Het echte prijsverschil', body: 'Een handgeschakelde Brio bij Bizcar of een lokale operator: $15–22/dag laagseizoen. Dezelfde dag-economy automaat (Yaris): $20–30. Verschil: $5–8/dag, ongeveer 25–30% premium. Op een week-huur: $35–60 extra. Op een maand: $150–240 extra.' },
      { title: 'Waarom automaat op Phuket bijna altijd wint', body: 'Phuket-verkeer in Patong/Karon is stop-and-go met scooters van alle kanten. Linksrijden + handgeschakeld + scooters die wisselen van rijstrook = mentale belasting waarbij je de mooie kustrit niet meer ziet. Bij heuvelwegen naar Promthep Cape of Patong-viewpoint is automaat opmerkelijk minder vermoeiend. Voor langdurig rijden (1+ uur dagelijks) is de premium bijna altijd waard.' },
      { title: 'Wanneer handgeschakeld huren wel logisch is', body: 'Twee gevallen: (1) je bent zeer ervaren met links + manueel én blijft binnen Phuket-Town/west-coast vlakke wegen, (2) je huurt 4+ weken en het verschil van $200+ matters. Anders: bespaar de mentale energie voor het strand.' },
    ],
    guideTitle: 'Automaat-zoek tips voor Phuket',
    guideTips: [
      { strong: 'Filter "Automatic" werkt op aggregators consistent', rest: '. Op Discover Cars en Trip.com selecteer je "Transmission: Automatic" en de listing klopt 99% — bij twijfel staat het model+ jaar in de details.' },
      { strong: 'Bij lokale operators: vraag expliciet naar "auto"', rest: '. Thais hebben vaak Engelstalige website-vertalingen waar "manual" en "automatic" door elkaar lopen. Een telefoon- of WhatsApp-bevestiging voor je boekt is gratis verzekering.' },
      { strong: 'Vermijd "Honda Brio Manual" tenzij je geld wilt besparen', rest: '. Brio is de goedkoopste auto op Phuket maar de manuele versie is uit 2017–2019 — minder veiligheidsfeatures, hardere koppeling.' },
      { strong: 'Vraag of CVT of conventionele automaat', rest: '. Yaris, City, Vios zijn allemaal CVT — soepel maar langzaam in optrekken. Fortuner en CR-V hebben conventionele 4–6 traps automaten — sneller. Maakt verschil bij heuvels.' },
      { strong: 'Cruise control op automaat-modellen', rest: ' is bij 70% van de listings standaard. Vooral handig op Highway 4 richting Phang Nga. Vraag bij 1+ week huur of het beschikbaar is — kan boekingsverschil maken.' },
      { strong: 'Gebruik "P" altijd bij parkeren op heuvels', rest: '. CVT-automaten in Thaise huurauto\'s rollen makkelijker weg dan Europese — ALTIJD handrem + P-stand bij Phukets vele heuvelparking.' },
      { strong: 'Brandstofverbruik: automaat vs manueel verschil klein', rest: '. CVT in moderne Yaris haalt 18–22 km/L; manueel haalt 19–23. Verschil <5% — totale brandstofkosten op Phuket-trip zijn marginaal.' },
    ],
    faqTitle: 'Veelgestelde vragen — automaat',
    faq: [
      { q: 'Zijn alle huurauto\'s op Phuket automatisch?',
        a: 'Bijna alle, maar niet allemaal. ~95% van de aggregator-vloot (Discover Cars, Trip.com) is automaat. Bij lokale Phuket-aanbieders kom je nog 10–20% handgeschakelde auto\'s tegen, vooral oudere Honda Brio, Suzuki Swift en sommige Toyota Soluna-modellen. Filter altijd op "Automatic" om zeker te zijn.' },
      { q: 'Hoeveel duurder is automaat op Phuket?',
        a: 'Ongeveer $5–10/dag premium boven dezelfde klasse handgeschakeld — een Yaris automaat is $5 duurder dan een Brio manueel van vergelijkbare grootte. In percentages: 25–30% extra. Op een week-huur $35–60 extra. Bij een maand kan dat oplopen tot $150–240, wat voor digital nomads de afweging maakt.' },
      { q: 'Is de Toyota Yaris CVT goed voor heuvelwegen?',
        a: 'Voldoende voor Phukets heuvels. CVT (continu variabel) reageert langzamer dan een conventionele automaat bij plotse versnelling, maar voor de toeristische routes (Promthep Cape, Big Buddha, Patong-viewpoint) is het prima. Voor zware heuvels naar Khao Sok of Phang Nga bergweggen is een Yaris Cross of CR-V comfortabeler — meer pk en betere CVT-kalibratie.' },
      { q: 'Kan ik een automaat huren zonder reservering?',
        a: 'Bij internationale merken op HKT meestal wel — ze hebben grote vloten. Bij lokale operators in Patong is walk-in voor automaat in hoogseizoen (nov–apr) lastig: ze zijn meestal eerder uitverkocht dan handgeschakeld. Boek minimaal 3–7 dagen vooruit als automaat een must is.' },
      { q: 'Is de automaat-Yaris geschikt voor 4 volwassenen + bagage?',
        a: 'Krap maar mogelijk. De Yaris (hatchback) heeft 280L kofferbak — 2 grote koffers passen, 4 wordt echt vol. Voor 4 volwassenen + bagage van 1 week is de Yaris Cross of Toyota Vios beter: 350–470L kofferruimte. Beide zijn automaat-standaard. Voor 4 volwassenen + camping/duik-uitrusting: kies een Honda CR-V of Toyota Fortuner.' },
    ],
    meshTitle: 'Plan je rest van de Phuket-trip',
    meshIntro: 'Automaat geboekt — hier is de rest:',
    pillarLabel: '🚗 Alle 7 verhuurders (pillar)',
    flightsLabel: '✈️ Vluchten naar Phuket',
    hotelsLabel: '🏨 Beste hotels in Phuket',
    yachtLabel: '⛵ Yacht charter Phuket',
    guideLabel: '📖 Phuket reisgids',
    klookLabel: '🎟️ Activiteiten (Klook)',
    tiqetsLabel: '🎫 Attractie-tickets (Tiqets)',
    twelveGoLabel: '🚌 Bus/ferry alternatieven',
    methodologyTitle: 'Hoe we dit verifieerden',
    methodologyBody: 'Vlootverhouding automaat/manueel gechecked mei 2026 op zowel Discover Cars als Trip.com voor Phuket Airport-pickup juni 2026, vergelijking 200+ listings. Premium-prijzen handmatig vergeleken op identieke pickup-data en categorieën. Lokale operator-data via Bizcar, Phuket Cheap Car Rental en Suzy live websites. We verdienen commissie op bevestigde boekingen via Discover Cars / Trip.com — verandert nooit jouw prijs of welke verhuurders we noemen.',
  } : {
    crumb: 'Automatic car rental Phuket',
    title: 'Automatic Car Rental Phuket 2026: Models & Real Prices',
    description: 'Renting an automatic in Phuket? Yaris, City and Vios all come automatic. Compare prices, $5–10/day premium and honest tips.',
    kicker: 'Automatic transmission car rental Phuket',
    h1: 'How to Rent an Automatic Car in Phuket: Models, Prices & What\'s Really Auto',
    hero: 'Almost every modern rental car in Phuket already comes automatic — Toyota Yaris, Honda City and Toyota Vios all ship with automatic transmissions as standard. The manual option mostly survives in older or local-budget cars. Here\'s which models are guaranteed auto, what premium you actually pay, and where the sneaky manual cars hide.',
    primaryCta: 'Filter automatic — Discover Cars',
    secondaryCta: 'Search on Trip.com',
    badge1: '95% of fleet already automatic',
    badge2: '$5–10/day premium over manual',
    statsTitle: 'Automatic at a glance — Phuket fleet',
    stats: [
      { label: 'Share of cars already automatic', value: '~95% (aggregator fleet)' },
      { label: 'Premium over manual', value: '$5–10/day (~25%)' },
      { label: 'Always-automatic models', value: 'Yaris, City, Vios, Yaris Cross' },
      { label: 'Sometimes manual still', value: 'Honda Brio, Suzuki Swift (older)' },
      { label: 'Cheapest automatic economy', value: '$22–30/day low season' },
      { label: 'Cheapest automatic SUV', value: '$38–50/day low season' },
    ],
    section1Title: 'Which models are guaranteed automatic?',
    section1Body: 'In the Thai rental market, "automatic" isn\'t always explicit in the filter. Here\'s what you actually get model-by-model.',
    section1Cards: [
      { title: 'Toyota Yaris (2018–2024) — 100% automatic', body: 'The most-rented model on Phuket. All versions since 2018 are CVT (continuously variable transmission). No manual Yaris in the aggregator fleet. Fuel-efficient, comfortable ride, easy to park in Patong. $20–35/day low season.' },
      { title: 'Honda City / Honda Brio — mixed', body: 'Honda City has been CVT-standard since 2020. Honda Brio (smaller economy) still has ~30% manual versions at local operators. With Brio, explicitly check — the "automatic" filter doesn\'t always work on local-fleet listings. International brands always automatic.' },
      { title: 'Toyota Vios + Yaris Cross — 100% automatic', body: 'Toyota Vios (sedan) and Yaris Cross (compact SUV) both CVT-standard. Vios is roomier than Yaris for 4 adults, $25–40/day. Yaris Cross is the SUV version ($35–50/day) — same drivetrain, higher seat, better visibility on Phuket\'s hilly routes.' },
    ],
    section2Title: 'The premium math: automatic vs manual',
    section2Body: 'Many travelers wonder whether the automatic premium is worth it. For Phuket: yes, almost always.',
    section2Cards: [
      { title: 'The actual price difference', body: 'A manual Brio at Bizcar or a local operator: $15–22/day low season. The same daily economy automatic (Yaris): $20–30. Difference: $5–8/day, roughly a 25–30% premium. Over a week: $35–60 extra. Over a month: $150–240 extra.' },
      { title: 'Why automatic almost always wins on Phuket', body: 'Phuket traffic in Patong/Karon is stop-and-go with scooters from every angle. Left-hand-drive + manual + lane-switching scooters = mental load that costs you the actual coastal view. On hill roads to Promthep Cape or Patong viewpoint, automatic is markedly less tiring. For sustained driving (1+ hours daily) the premium is almost always worth it.' },
      { title: 'When manual makes sense', body: 'Two cases: (1) you\'re very experienced with left-hand + manual AND staying in flat Phuket-Town/west-coast roads, (2) you\'re renting 4+ weeks and the $200+ saving matters. Otherwise: save the mental energy for the beach.' },
    ],
    guideTitle: 'Automatic-finder tips for Phuket',
    guideTips: [
      { strong: 'The "Automatic" filter is reliable on aggregators', rest: '. On Discover Cars and Trip.com, selecting "Transmission: Automatic" matches the listing 99% of the time — model and year are in the details if in doubt.' },
      { strong: 'With local operators: explicitly ask for "auto"', rest: '. Thai operators often have English website translations where "manual" and "automatic" get mixed up. A phone or WhatsApp confirmation before booking is free insurance.' },
      { strong: 'Avoid "Honda Brio Manual" unless you really want savings', rest: '. Brio is the cheapest car on Phuket but the manual version is 2017–2019 — fewer safety features, harder clutch.' },
      { strong: 'Ask whether CVT or conventional automatic', rest: '. Yaris, City, Vios are all CVT — smooth but slow off the line. Fortuner and CR-V have conventional 4–6-speed automatics — quicker. Matters on hills.' },
      { strong: 'Cruise control on automatic models', rest: ' is standard on 70% of listings. Especially useful on Highway 4 toward Phang Nga. Ask on a 1+ week rental if it\'s available — can swing the booking.' },
      { strong: 'Always use "P" when parking on hills', rest: '. CVT automatics in Thai rental cars roll more easily than European ones — ALWAYS handbrake + P-position on Phuket\'s many hill car parks.' },
      { strong: 'Fuel consumption: automatic vs manual difference is small', rest: '. CVT in modern Yaris hits 18–22 km/L; manual hits 19–23. <5% difference — total fuel cost on a Phuket trip is marginal.' },
    ],
    faqTitle: 'Frequently asked questions — automatic',
    faq: [
      { q: 'Are all rental cars in Phuket automatic?',
        a: 'Almost all, but not all. ~95% of the aggregator fleet (Discover Cars, Trip.com) is automatic. Local Phuket operators still carry 10–20% manual cars, especially older Honda Brio, Suzuki Swift and some Toyota Soluna models. Always filter for "Automatic" to be sure.' },
      { q: 'How much pricier is automatic in Phuket?',
        a: 'Roughly $5–10/day premium over the same class manual — a Yaris automatic is $5 more than a comparable-size manual Brio. In percentage: 25–30% extra. Over a week $35–60 extra. Over a month it can hit $150–240, which is when digital nomads start running the math.' },
      { q: 'Is the Toyota Yaris CVT good for hilly roads?',
        a: 'Adequate for Phuket\'s hills. CVT (continuously variable) reacts slower than a conventional automatic on sudden acceleration, but for tourist routes (Promthep Cape, Big Buddha, Patong viewpoint) it\'s fine. For heavy hill roads to Khao Sok or Phang Nga mountain roads, a Yaris Cross or CR-V is more comfortable — more horsepower and better CVT calibration.' },
      { q: 'Can I rent an automatic without a reservation?',
        a: 'At international brands at HKT usually yes — they have large fleets. At local operators in Patong, walk-in for automatic in high season (Nov–Apr) is tight: they sell out faster than manual. Book at least 3–7 days ahead if automatic is a must.' },
      { q: 'Is the automatic Yaris suitable for 4 adults + luggage?',
        a: 'Tight but possible. The Yaris (hatchback) has 280L of trunk space — 2 large suitcases fit, 4 is genuinely full. For 4 adults + a week\'s luggage, the Yaris Cross or Toyota Vios is better: 350–470L. Both automatic-standard. For 4 adults + camping/dive gear: pick a Honda CR-V or Toyota Fortuner.' },
    ],
    meshTitle: 'Plan the rest of your Phuket trip',
    meshIntro: 'Automatic sorted — here\'s the rest:',
    pillarLabel: '🚗 All 7 rental companies (pillar)',
    flightsLabel: '✈️ Flights to Phuket',
    hotelsLabel: '🏨 Best hotels in Phuket',
    yachtLabel: '⛵ Yacht charter Phuket',
    guideLabel: '📖 Phuket travel guide',
    klookLabel: '🎟️ Activities (Klook)',
    tiqetsLabel: '🎫 Attraction tickets (Tiqets)',
    twelveGoLabel: '🚌 Bus/ferry alternatives',
    methodologyTitle: 'How we verified this',
    methodologyBody: 'Auto/manual fleet ratio checked May 2026 on both Discover Cars and Trip.com for Phuket Airport pickup June 2026, comparing 200+ listings. Premium pricing manually compared on identical pickup dates and categories. Local operator data via Bizcar, Phuket Cheap Car Rental and Suzy live sites. We earn commission on confirmed bookings through Discover Cars / Trip.com — never changes your price or which operators we cover.',
  };
}

export default function CarRentalSpokePage({ spoke, primaryPartnerUrl, secondaryPartnerUrl, lastUpdated }: Props) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  // Note: useSubId() invoked for parity with sibling pages (and to keep the hook
  // call-site stable in case future SubID logic depends on router state).
  // For these spoke pages we want explicit placement-tagged SubIDs.
  useSubId();
  const placement = `pseo-car-rental-phuket-${spoke.slug}`;
  const heroPrimarySub = `${placement}-hero-primary`;
  const heroSecondarySub = `${placement}-hero-secondary`;
  const section2Sub = `${placement}-section2-cta`;
  const klookSub = `${placement}-mesh-klook`;
  const tiqetsSub = `${placement}-mesh-tiqets`;
  const twelveGoSub = `${placement}-mesh-twelvego`;

  const c = getCopy(spoke.slug, isNl);

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: isNl ? 'Auto huren Phuket' : 'Car Rental Phuket', href: '/car-rental-phuket/' },
    { name: c.crumb, href: `/car-rental-phuket/${spoke.slug}/` },
  ];

  const canonical = `https://go2-thailand.com${isNl ? '/nl' : ''}/car-rental-phuket/${spoke.slug}/`;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, i) => ({
      '@type': 'ListItem', position: i + 1, name: b.name,
      item: `https://go2-thailand.com${isNl ? '/nl' : ''}${b.href}`,
    })),
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faq.map(f => ({
      '@type': 'Question', name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const siblings = SIBLINGS[spoke.slug];

  return (
    <>
      <SEOHead title={c.title} description={c.description}>
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        <section className="bg-thailand-blue text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Breadcrumbs items={breadcrumbs} />
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-white/75">{c.kicker}</p>
            <h1 className="font-heading text-3xl lg:text-5xl font-bold mt-2">{c.h1}</h1>
            <p className="mt-4 text-lg lg:text-xl max-w-3xl opacity-95">{c.hero}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={withSubId(primaryPartnerUrl, heroPrimarySub)}
                target="_blank"
                rel="noopener noreferrer nofollow sponsored"
                className="rounded-full bg-thailand-red text-white px-6 py-3 text-base font-semibold hover:bg-red-700 shadow-lg"
              >
                {c.primaryCta} →
              </a>
              <a
                href={withSubId(secondaryPartnerUrl, heroSecondarySub)}
                target="_blank"
                rel="noopener noreferrer nofollow sponsored"
                className="rounded-full bg-[#287dfa] text-white px-6 py-3 text-base font-semibold hover:bg-[#1a5ec4]"
              >
                {c.secondaryCta} →
              </a>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-xs opacity-90">
              <span>✔ {c.badge1}</span>
              <span>✔ {c.badge2}</span>
              <span>✔ {isNl ? 'Bijgewerkt' : 'Updated'} {new Date(lastUpdated).toLocaleDateString(isNl ? 'nl-NL' : 'en', { year: 'numeric', month: 'long' })}</span>
            </div>
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          {/* Quick stats */}
          <section className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{c.statsTitle}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {c.stats.map((s, i) => (
                <div key={i} className="rounded-xl bg-gray-50 p-4">
                  <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{s.label}</p>
                  <p className="mt-1 font-heading font-bold text-gray-900 text-base">{s.value}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 1 — detailed */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{c.section1Title}</h2>
            <p className="text-gray-700 mb-5 leading-relaxed">{c.section1Body}</p>
            <div className="grid md:grid-cols-3 gap-4">
              {c.section1Cards.map((card, i) => (
                <div key={i} className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
                  <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{card.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2 — detailed */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{c.section2Title}</h2>
            <p className="text-gray-700 mb-5 leading-relaxed">{c.section2Body}</p>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {c.section2Cards.map((card, i) => (
                <div key={i} className="rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
                  <h3 className="font-heading text-lg font-bold text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{card.body}</p>
                </div>
              ))}
            </div>
            <a
              href={withSubId(primaryPartnerUrl, section2Sub)}
              target="_blank"
              rel="noopener noreferrer nofollow sponsored"
              className="inline-flex items-center rounded-full bg-thailand-red text-white px-5 py-3 text-sm font-semibold hover:bg-red-700"
            >
              {c.primaryCta} →
            </a>
          </section>

          {/* Buyer's guide tips */}
          <section className="rounded-2xl bg-amber-50 border border-amber-200 p-6">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{c.guideTitle}</h2>
            <ul className="space-y-3 text-gray-800">
              {c.guideTips.map((tip, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-amber-700 font-bold">→</span>
                  <span><strong>{tip.strong}</strong>{tip.rest}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{c.faqTitle}</h2>
            <div className="space-y-3">
              {c.faq.map((f, i) => (
                <details key={i} className="rounded-2xl bg-white p-4 shadow-sm border border-gray-200">
                  <summary className="font-semibold text-gray-900 cursor-pointer">{f.q}</summary>
                  <p className="mt-2 text-gray-700 text-sm leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Sibling spokes — lateral links */}
          <section>
            <h2 className="font-heading text-xl font-bold text-gray-900 mb-3">
              {isNl ? 'Andere Phuket auto-huur opties' : 'Other Phuket car rental options'}
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {siblings.map(s => (
                <Link
                  key={s.slug}
                  href={`/car-rental-phuket/${s.slug}/`}
                  className="block rounded-2xl bg-white p-4 shadow-sm border border-gray-200 hover:border-thailand-blue transition-colors"
                >
                  <p className="font-heading font-bold text-gray-900">{isNl ? s.nl : s.en}</p>
                  <p className="text-xs text-thailand-blue mt-1 font-semibold">{isNl ? 'Bekijk gids' : 'See guide'} →</p>
                </Link>
              ))}
            </div>
          </section>

          {/* Cluster mesh */}
          <section className="rounded-2xl bg-thailand-blue/10 p-6">
            <h2 className="font-heading text-xl font-bold text-gray-900">{c.meshTitle}</h2>
            <p className="mt-2 text-gray-700">{c.meshIntro}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/car-rental-phuket/" className="rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">
                {c.pillarLabel}
              </Link>
              <Link href="/flights-to-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">
                {c.flightsLabel}
              </Link>
              <Link href="/best-hotels/phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">
                {c.hotelsLabel}
              </Link>
              <Link href="/yacht-charter-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">
                {c.yachtLabel}
              </Link>
              <Link href="/city/phuket/" className="rounded-full bg-white text-gray-900 border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50">
                {c.guideLabel}
              </Link>
              <a href={withSubId(KLOOK_GENERIC, klookSub)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">
                {c.klookLabel}
              </a>
              <a href={withSubId(TIQETS_GENERIC, tiqetsSub)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-white text-gray-900 border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50">
                {c.tiqetsLabel}
              </a>
              <a href={withSubId(TWELVEGO_GENERIC, twelveGoSub)} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-white text-gray-900 border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50">
                {c.twelveGoLabel}
              </a>
            </div>
          </section>

          {/* Methodology */}
          <section className="rounded-2xl bg-gray-50 border border-gray-200 p-6 text-sm text-gray-700">
            <h2 className="font-heading text-lg font-bold text-gray-900 mb-2">{c.methodologyTitle}</h2>
            <p>{c.methodologyBody}</p>
          </section>
        </main>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const file = path.join(process.cwd(), 'data', 'pseo', 'car-rental', 'phuket-spokes.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const paths = (data.spokes as SpokeMeta[]).map(s => ({ params: { spoke: s.slug } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.spoke as string;
  const spokesFile = path.join(process.cwd(), 'data', 'pseo', 'car-rental', 'phuket-spokes.json');
  const partnersFile = path.join(process.cwd(), 'data', 'pseo', 'car-rental', 'phuket-partners.json');
  const spokesData = JSON.parse(fs.readFileSync(spokesFile, 'utf8')) as { lastUpdated: string; spokes: SpokeMeta[] };
  const partnersData = JSON.parse(fs.readFileSync(partnersFile, 'utf8')) as PartnersFile;

  const spoke = spokesData.spokes.find(s => s.slug === slug);
  if (!spoke) return { notFound: true, revalidate: 60 };

  const primary = partnersData.partners[spoke.primaryPartner];
  const secondary = partnersData.partners['trip_phuket'];
  if (!primary || !secondary) return { notFound: true, revalidate: 60 };

  return {
    props: {
      spoke,
      primaryPartnerUrl: primary.partnerUrl,
      secondaryPartnerUrl: secondary.partnerUrl,
      lastUpdated: partnersData.lastUpdated,
    },
    revalidate: 604800,
  };
};
