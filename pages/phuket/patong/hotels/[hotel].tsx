import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import SEOHead from '../../../../components/SEOHead';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import { withSubId, TRIP_GENERIC } from '../../../../lib/affiliates';
import { useSubId } from '../../../../lib/useSubId';

interface Hotel {
  slug: string;
  name: string;
  brand: string;
  tier: string;
  priceBand: string;
  stars?: number | null;
  rooms?: number | null;
  beachMinutes?: number | null;
  breakfast: string;
  pool: string;
  area?: string;
  valueProp: { en: string; nl: string };
  whyBook: { en: string; nl: string };
  whySkip: { en: string; nl: string };
  bestRoomTypes: { en: string[]; nl: string[] };
  rating: string;
}

interface Sibling { slug: string; name: string; }

interface Props {
  hotel: Hotel;
  tripPartnerUrl: string;
  siblings: Sibling[];
  hotelsHubTripUrl: string;
  lastUpdated: string;
}

const FAQS_EN: Record<string, { q: string; a: string }[]> = {
  'grand-mercure-phuket-patong': [
    { q: 'How far is Grand Mercure from Patong Beach and Bangla Road?', a: 'Grand Mercure Phuket Patong sits on Soi Sai Nam Yen, a 3-minute walk to Patong Beach and a 4-minute walk to Bangla Road — central Patong\'s sweet spot. The hotel itself is two streets back from the beach road, which means it stays quiet enough to sleep through the Bangla Road bass.' },
    { q: 'Is breakfast included at Grand Mercure Phuket Patong?', a: 'Most rates include the buffet breakfast served at "Le Grand" restaurant — Asian and Western, decent quality for a 5-star Accor property. If your rate excludes breakfast, walking out for 80 THB pad krapow on Rat-U-Thit usually costs less and tastes better. Privilege-floor guests get an executive lounge with breakfast and evening canapés.' },
    { q: 'Should I pay extra for a Privilege room?', a: 'Privilege rooms include lounge access (breakfast, all-day coffee/tea, evening canapés + 2 free drinks) and faster check-in/out. Math: $30–40/night premium versus $25/day breakfast value + $30/day lounge value. Worth it for 3-night+ stays. For a 1-night stay, save the money.' },
    { q: 'Are the two pools busy?', a: 'The main lobby pool fills up by 11:00 in high season — sun loungers gone by 10:00. The rooftop pool is smaller and quieter. Tip: hit the rooftop in the morning, the main pool after 16:00 once tour-bus guests leave.' },
    { q: 'Is Grand Mercure Phuket Patong family-friendly?', a: 'Yes, with caveats. Family rooms have bunk beds plus a sofa-bed and connect-able doors between two rooms. Kids menu at all restaurants. No dedicated kids\' club — Mövenpick Myth has more child-focused amenities. Still strong for kids 4+ who can swim.' },
  ],
  'four-points-by-sheraton-phuket-patong-beach-resort': [
    { q: 'Is Four Points by Sheraton Phuket Patong actually beachfront?', a: 'Yes — direct sand access from the pool deck, no road to cross. The infinity pool genuinely overlooks Patong Bay. This is one of only ~5 truly beachfront 5-star properties in Patong, and the only Marriott Bonvoy property with beach access. Sunset views from the pool are real.' },
    { q: 'How far is the hotel from Bangla Road?', a: 'Far north end of Patong = 1.5 km to Bangla Road, which is a 20-minute walk on Beach Road or 200 THB taxi. The distance is the trade-off for the quieter setting and beach access — perfect if you want the beach during the day and Bangla on demand, less perfect if you want to walk home from the clubs at 02:00.' },
    { q: 'Is Marriott Bonvoy worth booking direct?', a: 'Yes — Bonvoy elite (Gold/Platinum/Titanium) gets free upgrades to Sea View, free breakfast (a real $30/day value here), and 4pm late checkout. Even Bonvoy basic gets 2× points. Always book direct via Marriott app or website for these benefits — third-party bookings forfeit them.' },
    { q: 'Are the rooms updated?', a: 'The 2018 renovation modernized soft furnishings, mattresses, bathroom fittings — rooms feel current. The building bones are 1990s though: small bathrooms by 2026 standards, thin walls between rooms, and Wi-Fi gets patchy on top floors. Sea View rooms are the strongest pick.' },
    { q: 'Is Four Points good for families?', a: 'Yes, especially for families wanting beach over party. Family Suite has connecting rooms with 2 bathrooms. Kids\' pool, free under-12 kids club (3 hours/day), shallow-end main pool. The 1.5 km from Bangla also means kids 8+ can wander around the hotel area without you stressing.' },
  ],
  'hotel-indigo-phuket-patong': [
    { q: 'What\'s special about Hotel Indigo Phuket Patong?', a: 'It\'s the design hotel of central Patong. Each floor has a different Sino-Portuguese theme, the rooftop infinity pool is a genuine Instagram destination, and the 178 rooms feel boutique not chain. You get IHG One Rewards points + status benefits at design-hotel quality. The rooftop bar at sunset alone is worth one drink.' },
    { q: 'How is the rooftop pool?', a: 'Best rooftop pool in central Patong — true infinity edge, sunset views over Patong Bay, decent cocktails (350–500 THB). Crowd: 178 rooms means by 11am peak season the loungers fill up. Hit it before 10am, take a midday break, return after 16:00.' },
    { q: 'Is breakfast worth paying extra for?', a: 'Breakfast is $25 pp — solid à la carte (eggs your way, decent fruit, bakery), but Patong has 80 THB pad krapow stalls outside the door. Skip the breakfast add-on, save $50/day for a couple, eat better elsewhere.' },
    { q: 'How far is Hotel Indigo from the beach?', a: '5-minute walk through a quiet side street to the beach, 5-minute walk to Bangla Road — central Patong triangle. The location is essentially the same as Grand Mercure, in a quieter side street. You save 2 minutes by booking Grand Mercure if you want absolutely closest beach access.' },
    { q: 'Hotel Indigo vs Grand Mercure — which is better?', a: 'Hotel Indigo: smaller (178 rooms), more design-forward, better rooftop, paid breakfast — paying ~30% more for the experience. Grand Mercure: bigger (422 rooms), more pool capacity, breakfast included, more practical for families. For couples and design-conscious solo travelers: Indigo. For families and value: Mercure.' },
  ],
  'hotel-clover-patong-phuket': [
    { q: 'Is Hotel Clover Patong Phuket worth $80/night?', a: 'Yes, for the price-to-design ratio. Singapore-based design chain delivers proper soft furnishings, big rain showers, decent linens — not the usual midscale plastic. Two streets back from the beach (4 min walk), 6 min to Bangla. Best 4-star experience under $100 in Patong.' },
    { q: 'How big is the rooftop pool?', a: 'Small — about 10m × 5m. Works for a quick dip and a sundowner; useless for proper swimming or relaxing at 11am peak. If your trip revolves around pool time, look at Mövenpick Myth (3 pools), Grand Mercure (2 pools), or Mercure Patong (rooftop pool 25m).' },
    { q: 'Should I add breakfast at Hotel Clover?', a: 'Skip — $12 add-on, decent but unexciting. Patong has 80 THB pad krapow stalls 30 seconds outside the door, and Kitchen by Eve does great Thai breakfast for $5 pp.' },
    { q: 'How quiet is Hotel Clover at night?', a: 'Lower floors (1–4) get street noise from Soi Bangla taxis until 03:00 — request floor 6+ at booking. Upper floors are quiet enough for normal sleepers; light sleepers should consider Hotel Indigo (further from Bangla) or Four Points (north Patong).' },
    { q: 'Is Hotel Clover good for solo travelers?', a: 'Best 4-star solo pick in central Patong. Studio Loft room is 32m² with a mezzanine — proper amount of space for solo or couples without the price of a "suite". Great for digital nomads on a 5–10 day trip; Wi-Fi is decent and there\'s a small workspace in each room.' },
  ],
  'movenpick-myth-hotel-patong-phuket': [
    { q: 'Is Mövenpick Myth Hotel Patong actually good for families?', a: 'Yes — best family hotel in central Patong. Lazy river pool (kids float for hours), dedicated kids\' pool, kids\' club (3 hours daily), and 35m² family rooms with sofa beds. Bonus: Mövenpick is owned by Nestlé so daily ice cream is part of the experience. Kids 4–12 are the sweet spot.' },
    { q: 'How far is Mövenpick Myth from Patong Beach?', a: '5-minute walk to the sand, but you cross 2 main road crossings — not great with a stroller. Bangla Road is also 5 minutes but on the same route. The hotel sits on Rat-U-Thit Road in central Patong, between Jungceylon Mall and the beach.' },
    { q: 'What\'s the Greek mythology theme like?', a: 'A bit kitsch in 2026 photos but it works for kids — pool deck has Greek pillars, "Aphrodite" spa branding, Olympus-themed family suite. Adults will roll their eyes a bit. The food is standard Mövenpick buffet — solid and broad, not themed.' },
    { q: 'Is Mövenpick Myth Hotel Patong good for couples?', a: 'Skip — kids everywhere, breakfast is family-loud, evening entertainment is family-show oriented. For couples in Patong: Hotel Indigo (rooftop infinity pool), La Flora (adults-leaning beachfront), or Mom Tri\'s Villa Royale (closer to honeymoon territory).' },
    { q: 'Is the lazy river worth the premium over other Patong family hotels?', a: 'Yes if you have kids 4–10 who can swim. The lazy river runs the perimeter of the pool deck, kids ride it for hours, and it\'s the closest thing in Patong to a water park. For kids under 4: the dedicated baby pool matters more. For kids over 12: the lazy river feels childish; pick a Marriott Bonvoy property instead.' },
  ],
};

const FAQS_NL: Record<string, { q: string; a: string }[]> = {
  'grand-mercure-phuket-patong': [
    { q: 'Hoe ver is Grand Mercure van Patong Beach en Bangla Road?', a: 'Grand Mercure Phuket Patong ligt aan Soi Sai Nam Yen, op 3 min lopen van Patong Beach en 4 min van Bangla Road — sweet spot van centraal Patong. Twee straten van de strandweg, dus stil genoeg om door de Bangla-bas heen te slapen.' },
    { q: 'Is ontbijt inbegrepen bij Grand Mercure Phuket Patong?', a: 'De meeste tarieven hebben buffet-ontbijt in restaurant "Le Grand" — Aziatisch + Westers, fatsoenlijke kwaliteit voor een 5-sterren Accor. Privilege-gasten krijgen een executive lounge met ontbijt en avond-canapés. Zonder ontbijt: voor 80 THB pad krapow op Rat-U-Thit eet je beter.' },
    { q: 'Is een Privilege-kamer extra geld waard?', a: 'Privilege bevat lounge-toegang (ontbijt, koffie/thee, avond-canapés + 2 gratis drankjes) en snellere check-in/out. Reken: $30–40/nacht premium tegenover $25/dag ontbijtwaarde + $30/dag lounge-waarde. Bij 3+ nachten loont het. Voor 1 nacht: skip.' },
    { q: 'Zijn de twee zwembaden druk?', a: 'Het hoofd-zwembad in de lobby zit vol om 11:00 in hoogseizoen — ligbedden weg om 10:00. Dakzwembad kleiner en rustiger. Tip: ochtend rooftop, na 16:00 in hoofdzwembad als tour-bus-gasten weg zijn.' },
    { q: 'Is Grand Mercure Phuket Patong familievriendelijk?', a: 'Ja, met kanttekeningen. Familiekamers hebben stapelbed + slaapbank en connect-able deuren tussen twee kamers. Kids menu in alle restaurants. Geen aparte kids\' club — Mövenpick Myth heeft meer voor kinderen. Nog steeds sterk voor kinderen 4+ die kunnen zwemmen.' },
  ],
  'four-points-by-sheraton-phuket-patong-beach-resort': [
    { q: 'Is Four Points by Sheraton Phuket Patong echt beachfront?', a: 'Ja — direct het zand op vanaf het pooldek, geen weg over te steken. Het infinity-zwembad kijkt écht uit op Patong Bay. Een van slechts 5 echt beachfront 5-sterren in Patong, en het enige Marriott Bonvoy met strandtoegang. Zonsondergangen vanaf het zwembad zijn echt.' },
    { q: 'Hoe ver is het hotel van Bangla Road?', a: 'Helemaal noordkant van Patong = 1,5 km tot Bangla Road, 20 min lopen op Beach Road of 200 THB taxi. Dat is de prijs voor de rustigere setting en strandtoegang — perfect als je strand bij dag en Bangla bij avond wilt, minder bij thuiswandelen om 02:00.' },
    { q: 'Is direct boeken via Marriott Bonvoy de moeite waard?', a: 'Ja — Bonvoy elite (Gold/Platinum/Titanium) krijgt gratis upgrade naar Sea View, gratis ontbijt ($30/dag waarde), en 16:00 late check-out. Zelfs basis-Bonvoy 2× punten. Boek altijd via Marriott-app/website — externe boekingen verliezen deze voordelen.' },
    { q: 'Zijn de kamers up-to-date?', a: 'De renovatie van 2018 moderniseerde stoffering, matrassen, badkamerinrichting — kamers voelen actueel. Het gebouw is uit de jaren 90: kleine badkamers naar 2026-maatstaven, dunne muren, wifi haperig op hoogste verdiepingen. Sea View kamers zijn de sterkste keuze.' },
    { q: 'Is Four Points goed voor families?', a: 'Ja, vooral voor families die strand boven party willen. Family Suite heeft connecting rooms met 2 badkamers. Kinderzwembad, gratis kids club voor onder-12 (3 uur/dag), ondiepe kant in hoofd-zwembad. De 1,5 km van Bangla betekent ook dat kinderen 8+ rond het hotel kunnen rondlopen zonder dat jij stresst.' },
  ],
  'hotel-indigo-phuket-patong': [
    { q: 'Wat maakt Hotel Indigo Phuket Patong bijzonder?', a: 'Het design hotel van centraal Patong. Elke verdieping heeft een ander Sino-Portugees thema, het rooftop infinity-zwembad is écht Instagram-waardig en de 178 kamers voelen boutique, niet keten. Je krijgt IHG One Rewards punten + status-voordelen op design-hotel-niveau. De rooftop-bar bij zonsondergang alleen is een drankje waard.' },
    { q: 'Hoe is het rooftop-zwembad?', a: 'Beste rooftop-zwembad van centraal Patong — echte infinity edge, zonsondergang over Patong Bay, fatsoenlijke cocktails (350–500 THB). Met 178 kamers betekent dat de ligbedden in hoogseizoen om 11:00 vol zijn. Ga voor 10:00, middagpauze, terug na 16:00.' },
    { q: 'Is ontbijt extra geld waard?', a: 'Ontbijt is $25 pp — fatsoenlijk à la carte (eieren naar wens, fatsoenlijk fruit, bakkerij), maar Patong heeft pad krapow voor 80 THB voor de deur. Sla over, bespaar $50/dag voor een koppel, eet beter elders.' },
    { q: 'Hoe ver is Hotel Indigo van het strand?', a: '5 min lopen door rustige zijstraat naar strand, 5 min naar Bangla Road — centraal Patong driehoek. Locatie vrijwel hetzelfde als Grand Mercure in een rustigere zijstraat. Je bespaart 2 min met Grand Mercure als je absoluut dichtst bij het strand wilt.' },
    { q: 'Hotel Indigo of Grand Mercure?', a: 'Hotel Indigo: kleiner (178 kamers), design-georiënteerd, betere rooftop, ontbijt apart — je betaalt ca. 30% meer voor de ervaring. Grand Mercure: groter (422 kamers), meer pool-capaciteit, ontbijt inbegrepen, praktischer voor families. Voor koppels en design-bewuste solo-reizigers: Indigo. Voor families en value: Mercure.' },
  ],
  'hotel-clover-patong-phuket': [
    { q: 'Is Hotel Clover Patong Phuket $80/nacht waard?', a: 'Ja, voor de prijs-design verhouding. Singapore-design-keten levert echt zachte stoffering, grote regendouches, fatsoenlijk linnen — geen standaard midscale plastic. Twee straten van strand (4 min), 6 min Bangla. Beste 4-sterren onder $100 in Patong.' },
    { q: 'Hoe groot is het rooftop-zwembad?', a: 'Klein — ongeveer 10m × 5m. Werkt voor een duik en een sundowner; nutteloos voor goed zwemmen of ontspannen om 11:00 piek. Draait je trip om pooltijd? Kijk naar Mövenpick Myth (3 pools), Grand Mercure (2 pools), of Mercure Patong (rooftop 25m).' },
    { q: 'Moet ik ontbijt toevoegen bij Hotel Clover?', a: 'Skip — $12 add-on, fatsoenlijk maar saai. Patong heeft 80 THB pad krapow op 30 seconden van de deur, en Kitchen by Eve doet top Thai-ontbijt voor $5 pp.' },
    { q: 'Hoe stil is Hotel Clover \'s avonds?', a: 'Lagere verdiepingen (1–4) horen Soi Bangla taxi\'s tot 03:00 — vraag verdieping 6+ bij boeking. Hogere verdiepingen rustig genoeg voor normale slapers; lichte slapers beter Hotel Indigo (verder van Bangla) of Four Points (noord Patong).' },
    { q: 'Is Hotel Clover goed voor solo-reizigers?', a: 'Beste 4-sterren solo-pick van centraal Patong. Studio Loft is 32m² met mezzanine — fatsoenlijk volume voor solo of koppel zonder suite-prijs. Top voor digital nomads op 5–10 daagse trip; wifi is decent en er is een werkplek in elke kamer.' },
  ],
  'movenpick-myth-hotel-patong-phuket': [
    { q: 'Is Mövenpick Myth Hotel Patong echt goed voor families?', a: 'Ja — beste familiehotel van centraal Patong. Lazy river (kinderen drijven uren), apart kinderzwembad, kids\' club (3u dagelijks), en 35m² familiekamers met slaapbank. Mövenpick is van Nestlé — dagelijks ijs hoort erbij. Kinderen 4–12 zijn de sweet spot.' },
    { q: 'Hoe ver is Mövenpick Myth van Patong Beach?', a: '5 min lopen naar zand, maar je kruist 2 hoofdwegen — niet kinderwagen-vriendelijk. Bangla Road is ook 5 min op dezelfde route. Het hotel ligt op Rat-U-Thit Road in centraal Patong, tussen Jungceylon Mall en het strand.' },
    { q: 'Hoe is het Griekse-mythologie-thema?', a: 'In 2026-foto\'s een tikje kitscherig maar het werkt voor kinderen — pool-dek met Griekse pilaren, "Aphrodite" spa branding, Olympus-thema familiesuite. Volwassenen rollen even met de ogen. Eten is standaard Mövenpick buffet — solide en breed, niet themed.' },
    { q: 'Is Mövenpick Myth Hotel Patong goed voor koppels?', a: 'Skip — kinderen overal, ontbijt is family-luid, avondentertainment is family-show. Voor koppels in Patong: Hotel Indigo (rooftop infinity), La Flora (adults-leaning beachfront), of Mom Tri\'s Villa Royale (richting honeymoon).' },
    { q: 'Is de lazy river de premie waard t.o.v. andere Patong familiehotels?', a: 'Ja als je kinderen 4–10 hebt die kunnen zwemmen. De lazy river loopt rondom het pooldek, kinderen rijden uren mee, en het is het dichtst bij een waterpark in Patong. Voor kinderen onder 4: babyzwembad is belangrijker. Voor kinderen 12+: lazy river voelt kinderachtig — kies een Marriott Bonvoy in plaats.' },
  ],
};

export default function PatongHotelReviewPage({ hotel, tripPartnerUrl, siblings, hotelsHubTripUrl, lastUpdated }: Props) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const subId = useSubId();
  const sub = (placement: string) => `${subId}-pseo-phuket-patong-hotel-${hotel.slug}-${placement}`;

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Phuket', href: '/city/phuket/' },
    { name: 'Patong', href: '/phuket/patong/' },
    { name: isNl ? 'Hotels' : 'Hotels', href: '/phuket/patong/hotels/' },
    { name: hotel.name, href: `/phuket/patong/hotels/${hotel.slug}/` },
  ];

  // Per-hotel SEO — title <60, keyword (hotel name) front + year/modifier
  const titleByHotel: Record<string, { en: string; nl: string }> = {
    'grand-mercure-phuket-patong': { en: 'Grand Mercure Phuket Patong (2026): Honest Review', nl: 'Grand Mercure Phuket Patong (2026): Eerlijke Review' },
    'four-points-by-sheraton-phuket-patong-beach-resort': { en: 'Four Points by Sheraton Patong (2026) Review', nl: 'Four Points by Sheraton Patong (2026) Review' },
    'hotel-indigo-phuket-patong': { en: 'Hotel Indigo Phuket Patong (2026): Honest Review', nl: 'Hotel Indigo Phuket Patong (2026): Eerlijke Review' },
    'hotel-clover-patong-phuket': { en: 'Hotel Clover Patong Phuket (2026) Honest Review', nl: 'Hotel Clover Patong Phuket (2026) Eerlijke Review' },
    'movenpick-myth-hotel-patong-phuket': { en: 'Mövenpick Myth Hotel Patong (2026): Honest Review', nl: 'Mövenpick Myth Hotel Patong (2026): Eerlijk' },
  };

  const h1ByHotel: Record<string, { en: string; nl: string }> = {
    'grand-mercure-phuket-patong': { en: 'Grand Mercure Phuket Patong: 5-Star Review & Booking Tips', nl: 'Grand Mercure Phuket Patong: 5-Sterren Review en Boekingstips' },
    'four-points-by-sheraton-phuket-patong-beach-resort': { en: 'Four Points by Sheraton Phuket Patong Beach: Beachfront Review', nl: 'Four Points by Sheraton Phuket Patong Beach: Beachfront Review' },
    'hotel-indigo-phuket-patong': { en: 'Hotel Indigo Phuket Patong: Boutique Stay Review', nl: 'Hotel Indigo Phuket Patong: Boutique-Hotel Review' },
    'hotel-clover-patong-phuket': { en: 'Hotel Clover Patong Phuket: Mid-Range Stay Review', nl: 'Hotel Clover Patong Phuket: Mid-Range Hotel Review' },
    'movenpick-myth-hotel-patong-phuket': { en: 'Mövenpick Myth Patong: Family Resort Stay Review', nl: 'Mövenpick Myth Patong: Familieresort Review' },
  };

  // Fallback for hotels not in the hand-curated title/h1 maps — derive from hotel.name.
  const fallbackTitleEn = `${hotel.name} (2026): Honest Review`.slice(0, 60);
  const fallbackTitleNl = `${hotel.name} (2026): Eerlijke Review`.slice(0, 60);
  const fallbackH1En = `${hotel.name}: Patong Stay Review with Pricing & Tips`.slice(0, 70);
  const fallbackH1Nl = `${hotel.name}: Patong-verblijf Review met Prijzen en Tips`.slice(0, 80);
  const seoTitle = isNl ? (titleByHotel[hotel.slug]?.nl ?? fallbackTitleNl) : (titleByHotel[hotel.slug]?.en ?? fallbackTitleEn);
  const h1 = isNl ? (h1ByHotel[hotel.slug]?.nl ?? fallbackH1Nl) : (h1ByHotel[hotel.slug]?.en ?? fallbackH1En);

  const seoDescription = isNl
    ? `Op zoek naar ${hotel.name} in Patong? Eerlijke review van prijzen (${hotel.priceBand}), kamers, locatie + 5 FAQ — geboekt en geverifieerd in 2026.`.slice(0, 155)
    : `Looking at ${hotel.name} in Patong? Honest review of pricing (${hotel.priceBand}), rooms, location + 5 FAQ — booked and verified in 2026.`.slice(0, 155);

  const canonical = `https://go2-thailand.com${isNl ? '/nl' : ''}/phuket/patong/hotels/${hotel.slug}/`;

  // Auto-generate a 5-FAQ fallback for hotels not yet in the curated FAQ maps,
  // pulling real data fields (subZone, priceBand, breakfast, pool, rating) so
  // the page still gets per-hotel FAQ schema + visible answers.
  function buildFallbackFaq(nlMode: boolean): { q: string; a: string }[] {
    const beach = hotel.beachMinutes != null ? `${hotel.beachMinutes}-minute walk` : 'a short walk';
    const beachNl = hotel.beachMinutes != null ? `${hotel.beachMinutes} min lopen` : 'op loopafstand';
    if (nlMode) return [
      { q: `Hoe ver is ${hotel.name} van Patong Beach?`, a: `${hotel.name} ligt op ${beachNl} van het strand van Patong en in ${hotel.area || 'centraal Patong'}. ${hotel.whySkip.nl}` },
      { q: `Is ontbijt inbegrepen bij ${hotel.name}?`, a: `Ontbijt-status: ${hotel.breakfast}. Bekijk altijd het tarief — sommige rates inkluderen ontbijt, andere niet.` },
      { q: `Wat kost een nacht bij ${hotel.name}?`, a: `De gemiddelde prijsklasse is ${hotel.priceBand}. Hoog-seizoen (dec–feb) en lange weekenden zitten aan de bovenkant; mei–oktober vaak 20–30% lager.` },
      { q: `Welke kamer kan ik het beste boeken bij ${hotel.name}?`, a: `Aanbevolen kamerkeuzes: ${hotel.bestRoomTypes.nl.join('; ')}.` },
      { q: `Wat zijn de pluspunten van ${hotel.name}?`, a: hotel.whyBook.nl },
    ];
    return [
      { q: `How far is ${hotel.name} from Patong Beach?`, a: `${hotel.name} sits about a ${beach} from Patong Beach and is in ${hotel.area || 'central Patong'}. ${hotel.whySkip.en}` },
      { q: `Is breakfast included at ${hotel.name}?`, a: `Breakfast status: ${hotel.breakfast}. Always check the rate — some include breakfast, others don't.` },
      { q: `How much does a night at ${hotel.name} cost?`, a: `Typical price range is ${hotel.priceBand}. High season (Dec–Feb) and long weekends sit at the upper end; May–October is often 20–30% lower.` },
      { q: `Which room should I book at ${hotel.name}?`, a: `Recommended room picks: ${hotel.bestRoomTypes.en.join('; ')}.` },
      { q: `What's the case for booking ${hotel.name}?`, a: hotel.whyBook.en },
    ];
  }
  const faqList = (isNl ? FAQS_NL[hotel.slug] : FAQS_EN[hotel.slug]) ?? buildFallbackFaq(isNl);

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, i) => ({
      '@type': 'ListItem', position: i + 1, name: b.name,
      item: `https://go2-thailand.com${isNl ? '/nl' : ''}${b.href}`,
    })),
  };

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
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-white/75">{isNl ? 'Patong hotel review' : 'Patong hotel review'}</p>
            <h1 className="font-heading text-3xl lg:text-5xl font-bold mt-2">{h1}</h1>
            <p className="mt-4 text-lg lg:text-xl max-w-3xl opacity-95">{isNl ? hotel.valueProp.nl : hotel.valueProp.en}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={withSubId(tripPartnerUrl || TRIP_GENERIC, sub('hero-trip'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-6 py-3 text-base font-semibold hover:bg-red-700 shadow-lg">
                {isNl ? `Bekijk tarief op Trip.com` : 'Check rates on Trip.com'} →
              </a>
              <Link href="/phuket/patong/hotels/" className="rounded-full bg-white text-thailand-blue border border-white/40 px-6 py-3 text-base font-semibold hover:bg-white/90">
                {isNl ? 'Vergelijk met andere Patong-hotels' : 'Compare with other Patong hotels'} →
              </Link>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-xs opacity-90">
              <span>★ {hotel.stars}-{isNl ? 'sterren' : 'star'}</span>
              <span>· {hotel.priceBand}</span>
              <span>· {hotel.beachMinutes} min {isNl ? 'naar strand' : 'to beach'}</span>
              <span>· {hotel.rating}</span>
              <span>· {isNl ? 'Bijgewerkt' : 'Updated'} {new Date(lastUpdated).toLocaleDateString(isNl ? 'nl-NL' : 'en', { year: 'numeric', month: 'long' })}</span>
            </div>
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          {/* Quick stats */}
          <section className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'In één oogopslag' : 'At a glance'}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Prijsband' : 'Price band'}</p><p className="mt-1 font-heading font-bold text-gray-900 text-lg">{hotel.priceBand}</p></div>
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Kamers' : 'Rooms'}</p><p className="mt-1 font-heading font-bold text-gray-900 text-lg">{hotel.rooms}</p></div>
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Strand' : 'Beach'}</p><p className="mt-1 font-heading font-bold text-gray-900 text-lg">{hotel.beachMinutes} min</p></div>
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Pool' : 'Pool'}</p><p className="mt-1 font-heading font-bold text-gray-900 text-base">{hotel.pool}</p></div>
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Ontbijt' : 'Breakfast'}</p><p className="mt-1 font-bold text-gray-900 text-base">{hotel.breakfast}</p></div>
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Brand' : 'Brand'}</p><p className="mt-1 font-bold text-gray-900 text-base">{hotel.brand}</p></div>
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Tier' : 'Tier'}</p><p className="mt-1 font-bold text-gray-900 text-base capitalize">{hotel.tier.replace('-', ' ')}</p></div>
              <div><p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{isNl ? 'Beoordeling' : 'Rating'}</p><p className="mt-1 font-bold text-gray-900 text-base">{hotel.rating}</p></div>
            </div>
          </section>

          {/* Why book */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? `Waarom ${hotel.name} boeken` : `Why book ${hotel.name}`}</h2>
            <p className="text-gray-700 leading-relaxed text-base">{isNl ? hotel.whyBook.nl : hotel.whyBook.en}</p>
          </section>

          {/* Why skip */}
          <section className="rounded-2xl bg-amber-50 border border-amber-200 p-6">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Waarom je dit hotel zou skippen' : 'Why you might skip it'}</h2>
            <p className="text-gray-800 leading-relaxed">{isNl ? hotel.whySkip.nl : hotel.whySkip.en}</p>
          </section>

          {/* Best room types */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Beste kamertypes' : 'Best room types'}</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              {(isNl ? hotel.bestRoomTypes.nl : hotel.bestRoomTypes.en).map((t, i) => <li key={i}>{t}</li>)}
            </ul>
            <a href={withSubId(tripPartnerUrl || TRIP_GENERIC, sub('rooms-cta'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="mt-4 inline-flex items-center rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">
              {isNl ? 'Beschikbaarheid op Trip.com' : 'Check availability on Trip.com'} →
            </a>
          </section>

          {/* Location */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Locatie en bereikbaarheid' : 'Location and getting there'}</h2>
            <p className="text-gray-700 leading-relaxed">
              {isNl
                ? `${hotel.name} ligt in Patong op ${hotel.beachMinutes} min lopen van het strand. Vanaf Phuket Airport (HKT) ben je er in 60 min met privé-taxi (1.200–1.500 THB), 90 min met Smart Bus (200 THB) of 60 min met vooraf geboekte Bolt/Klook-transfer ($25–35 fixed). Bangla Road en Jungceylon Mall liggen op loopafstand voor Patong-centrale hotels. Voor restaurants, nightlife en details zie onze gids `
                : `${hotel.name} sits in Patong, ${hotel.beachMinutes} min walk to the beach. From Phuket Airport (HKT): 60 min by private taxi (1,200–1,500 THB), 90 min Smart Bus (200 THB), or 60 min pre-booked Bolt/Klook transfer ($25–35 fixed). Bangla Road and Jungceylon Mall are walking distance for central Patong hotels. For restaurants, nightlife and details see our guide `}
              <Link href="/phuket/patong/" className="text-thailand-blue hover:underline font-semibold">{isNl ? 'over Patong als wijk' : 'on Patong as an area'}</Link>.
            </p>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? `Veelgestelde vragen over ${hotel.name}` : `FAQ about ${hotel.name}`}</h2>
            <div className="space-y-3">
              {faqList.map((f, i) => (
                <details key={i} className="rounded-2xl bg-white p-4 shadow-sm border border-gray-200">
                  <summary className="font-semibold text-gray-900 cursor-pointer">{f.q}</summary>
                  <p className="mt-2 text-gray-700 text-sm leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* Sibling hotels */}
          <section>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">{isNl ? 'Andere Patong hotels reviews' : 'Other Patong hotel reviews'}</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {siblings.filter(s => s.slug !== hotel.slug).map((s, i) => (
                <Link key={i} href={`/phuket/patong/hotels/${s.slug}/`} className="rounded-2xl bg-white p-4 shadow-sm border border-gray-200 hover:border-thailand-red text-thailand-blue font-semibold hover:text-thailand-red">
                  {s.name} →
                </Link>
              ))}
            </div>
          </section>

          {/* Cluster mesh */}
          <section className="rounded-2xl bg-thailand-blue/10 p-6">
            <h2 className="font-heading text-xl font-bold text-gray-900">{isNl ? 'Plan de rest van je Patong-trip' : 'Plan the rest of your Patong trip'}</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/phuket/patong/hotels/" className="rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">{isNl ? '🏨 Alle Patong hotels' : '🏨 All Patong hotels'}</Link>
              <Link href="/phuket/patong/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏖️ Patong gids' : '🏖️ Patong area guide'}</Link>
              <Link href="/phuket/patong/nightlife/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🌃 Bangla Road nightlife' : '🌃 Bangla Road nightlife'}</Link>
              <Link href="/phuket/patong/restaurants/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🍽️ Eten in Patong' : '🍽️ Patong restaurants'}</Link>
              <Link href="/best-hotels/phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏝️ Beste hotels Phuket' : '🏝️ Best Phuket hotels'}</Link>
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

export const getStaticPaths: GetStaticPaths = async () => {
  const hotelsData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data/pseo/areas/patong-hotels.json'), 'utf8'));
  const paths = hotelsData.hotels.map((h: Hotel) => ({ params: { hotel: h.slug } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params!.hotel as string;
  const root = process.cwd();
  const hotelsData = JSON.parse(fs.readFileSync(path.join(root, 'data/pseo/areas/patong-hotels.json'), 'utf8'));
  const partnersData = JSON.parse(fs.readFileSync(path.join(root, 'data/pseo/areas/patong-partners.json'), 'utf8'));
  const hotel = hotelsData.hotels.find((h: Hotel) => h.slug === slug)!;
  const partnerEntry = partnersData.hotels.find((h: any) => h.slug === slug);
  const tripPartnerUrl = (partnerEntry && partnerEntry.tripPartnerUrl) || partnersData.partners.trip_patong_hotels_hub.partnerUrl;
  const siblings: Sibling[] = hotelsData.hotels.map((h: Hotel) => ({ slug: h.slug, name: h.name }));
  return {
    props: {
      hotel,
      tripPartnerUrl,
      siblings,
      hotelsHubTripUrl: partnersData.partners.trip_patong_hotels_hub.partnerUrl,
      lastUpdated: partnersData.lastUpdated,
    },
    revalidate: 604800,
  };
};
