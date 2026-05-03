import { GetStaticPaths, GetStaticProps } from 'next';
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

type SpokeSlug = 'private-pool' | 'oceanfront' | 'family';

interface SpokeMeta {
  slug: SpokeSlug;
  primaryPartnerKey: keyof Partners;
  secondaryPartnerKey: keyof Partners;
}

interface Props {
  spoke: SpokeSlug;
  primaryUrl: string;
  secondaryUrl: string;
  partners: Partners;
  siblings: SpokeSlug[];
  lastUpdated: string;
}

const SPOKE_LABELS: Record<SpokeSlug, { en: string; nl: string }> = {
  'private-pool': { en: 'Private pool villas', nl: "Private pool villa's" },
  'oceanfront': { en: 'Oceanfront villas', nl: "Oceanfront villa's" },
  'family': { en: 'Family villas (4+ bedrooms)', nl: "Family villa's (4+ slaapkamers)" },
};

export default function PhuketLuxuryVillasSpokePage({ spoke, primaryUrl, secondaryUrl, partners, siblings, lastUpdated }: Props) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const subId = useSubId();
  const placementSubId = (placement: string) => `${subId}-pseo-phuket-luxury-villas-${spoke}-${placement}`;

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: isNl ? 'Phuket luxe villas' : 'Phuket Luxury Villas', href: '/phuket-luxury-villas/' },
    { name: isNl ? SPOKE_LABELS[spoke].nl : SPOKE_LABELS[spoke].en, href: `/phuket-luxury-villas/${spoke}/` },
  ];

  // ---------- TITLES + DESCRIPTIONS ----------
  let seoTitle = '';
  let seoTitleNl = '';
  let h1En = '';
  let h1Nl = '';
  let descEn = '';
  let descNl = '';
  let kicker = '';
  let kickerNl = '';

  if (spoke === 'private-pool') {
    seoTitle = 'Phuket Private Pool Villa (2026): 7 Verified Picks';   // 53
    seoTitleNl = 'Phuket Private Pool Villa (2026): 7 Echte Privé';    // 50
    h1En = 'Phuket Private Pool Villas: 7 Resorts with Truly Exclusive Pools';
    h1Nl = "Phuket private pool villa's: 7 resorts met echt exclusieve zwembaden";
    descEn = 'Looking for a Phuket private pool villa? Compare 7 resorts where every pool is exclusively yours — sizes, heating, prices $700–10,000/night.'.slice(0, 155);
    descNl = "Op zoek naar een Phuket private pool villa? Vergelijk 7 resorts waar elk bad exclusief van jou is — afmetingen, verwarming, $700–10.000/nacht.".slice(0, 155);
    kicker = 'Private pool villa guide';
    kickerNl = 'Private pool villa-gids';
  } else if (spoke === 'oceanfront') {
    seoTitle = 'Phuket Oceanfront Villas (2026): 6 Direct Sea-View Picks'; // 56
    seoTitleNl = 'Phuket Oceanfront Villa\'s (2026): 6 Direct Zeezicht';    // 50
    h1En = 'Phuket Oceanfront Villas: 6 Direct Sea-View Pool Villas $1,500+/Night';
    h1Nl = "Phuket oceanfront villa's: 6 directe zeezicht pool villa's vanaf $1.500/nacht";
    descEn = 'Looking for oceanfront villas in Phuket? Compare 6 resorts with direct sea views — Trisara, Twinpalms, Sri Panwa $1,500–9,000/night, beachfront access.'.slice(0, 155);
    descNl = "Op zoek naar oceanfront villa's in Phuket? Vergelijk 6 resorts met direct zeezicht — Trisara, Twinpalms, Sri Panwa $1.500–9.000/nacht.".slice(0, 155);
    kicker = 'Oceanfront villa guide';
    kickerNl = 'Oceanfront villa-gids';
  } else { // family
    seoTitle = 'Phuket Family Villas (2026): 5 Picks for 4+ Bedrooms';   // 51
    seoTitleNl = 'Phuket Family Villa\'s (2026): 5 Top 4+ Slaapkamers';   // 50
    h1En = 'Phuket Family Villas: 5 Multi-Bedroom Pool Villas for 6–12 Guests';
    h1Nl = "Phuket family villa's: 5 multi-slaapkamer pool villa's voor 6–12 gasten";
    descEn = 'Looking for a family villa in Phuket? Compare 5 resorts with 4–8 bedroom pool villas — Andara, Sri Panwa, Banyan Tree $1,500–6,000/night, kid-friendly.'.slice(0, 155);
    descNl = "Op zoek naar een family villa in Phuket? Vergelijk 5 resorts met 4–8 slaapkamer pool villa's — Andara, Sri Panwa, Banyan Tree $1.500–6.000/nacht.".slice(0, 155);
    kicker = 'Family villa guide';
    kickerNl = 'Family villa-gids';
  }

  const titleFinal = isNl ? seoTitleNl : seoTitle;
  const descFinal = isNl ? descNl : descEn;
  const h1Final = isNl ? h1Nl : h1En;
  const kickerFinal = isNl ? kickerNl : kicker;

  const canonical = `https://go2-thailand.com${isNl ? '/nl' : ''}/phuket-luxury-villas/${spoke}/`;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, i) => ({
      '@type': 'ListItem', position: i + 1, name: b.name,
      item: `https://go2-thailand.com${isNl ? '/nl' : ''}${b.href}`,
    })),
  };

  // ---------- HERO STATS ----------
  const heroStats = (() => {
    if (spoke === 'private-pool') {
      return [
        { label: isNl ? 'Pool-formaat' : 'Pool size', value: '5×3 – 12×5 m' },
        { label: isNl ? 'Vanaf' : 'From', value: '$700/nt' },
        { label: isNl ? 'Verwarmd' : 'Heated', value: 'Nov–Feb' },
        { label: isNl ? 'Beste seizoen' : 'Best season', value: 'Nov–Apr' },
      ];
    }
    if (spoke === 'oceanfront') {
      return [
        { label: isNl ? 'Vanaf' : 'From', value: '$1,500/nt' },
        { label: isNl ? 'Strand-toegang' : 'Beach access', value: isNl ? 'Direct' : 'Direct' },
        { label: isNl ? 'Beste gebied' : 'Best area', value: 'Layan, Pansea' },
        { label: isNl ? 'Beste seizoen' : 'Best season', value: 'Nov–Apr' },
      ];
    }
    return [
      { label: isNl ? 'Slaapkamers' : 'Bedrooms', value: '4–8' },
      { label: isNl ? 'Voor groepen' : 'For groups', value: '6–12' },
      { label: isNl ? 'Vanaf' : 'From', value: '$1,500/nt' },
      { label: isNl ? 'Eigen chef' : 'Own chef', value: isNl ? 'Optie' : 'Optional' },
    ];
  })();

  // ---------- COMPARISON TABLE ROWS ----------
  const tableRows = (() => {
    if (spoke === 'private-pool') {
      return [
        { label: 'Amanpuri', spec: isNl ? 'Privé estate, 12×5 m' : 'Private estate, 12×5 m', price: '$5,000–15,000/nt', best: isNl ? 'Ultieme privé-luxe' : 'Ultimate private luxury' },
        { label: 'Trisara', spec: isNl ? 'Oceanfront infinity 8×3.5 m' : 'Oceanfront infinity 8×3.5 m', price: '$2,500–9,000/nt', best: isNl ? 'Honeymoons' : 'Honeymoons' },
        { label: 'Sri Panwa', spec: isNl ? 'Cliff pool 7×3.5 m' : 'Cliff pool 7×3.5 m', price: '$1,200–4,500/nt', best: isNl ? 'Cliff-view, sociaal' : 'Cliff-view, social' },
        { label: 'Andara Resort', spec: isNl ? 'Hillside 8×4 m, 1–6BR' : 'Hillside 8×4 m, 1–6BR', price: '$1,200–6,000/nt', best: isNl ? 'Families groot' : 'Large families' },
        { label: 'Banyan Tree Phuket', spec: isNl ? 'Lagoon villa 6×3 m' : 'Lagoon villa 6×3 m', price: '$800–2,500/nt', best: isNl ? 'Best value privé' : 'Best value private' },
        { label: 'The Pavilions', spec: isNl ? 'Adults pool 6×2.5 m' : 'Adults pool 6×2.5 m', price: '$700–1,400/nt', best: isNl ? 'Stellen, value' : 'Couples, value' },
        { label: 'Cape Sienna', spec: isNl ? 'Hilltop 6×3 m' : 'Hilltop 6×3 m', price: '$600–1,200/nt', best: isNl ? 'Foodies + uitzicht' : 'Foodies + view' },
      ];
    }
    if (spoke === 'oceanfront') {
      return [
        { label: 'Amanpuri', spec: isNl ? 'Pansea cove, 30 villa\'s' : 'Pansea cove, 30 villas', price: '$5,000+/nt', best: isNl ? 'Privé-cove' : 'Private cove' },
        { label: 'Trisara', spec: isNl ? 'Layan, 39 oceanfront villa\'s' : 'Layan, 39 oceanfront villas', price: '$2,500–9,000/nt', best: isNl ? 'Direct zeezicht' : 'Direct sea view' },
        { label: 'Twinpalms Montazure', spec: isNl ? 'Kamala beachfront' : 'Kamala beachfront', price: '$900–2,200/nt', best: isNl ? 'Strand + design' : 'Beach + design' },
        { label: 'Sri Panwa', spec: isNl ? 'Cliff-villa, oost' : 'Cliff villa, east', price: '$1,200–4,500/nt', best: isNl ? 'Sunrise + harbour' : 'Sunrise + harbour' },
        { label: 'The Surin Phuket', spec: isNl ? 'Pansea cove, beachfront' : 'Pansea cove, beachfront', price: '$1,500–3,500/nt', best: isNl ? 'Cove privacy' : 'Cove privacy' },
        { label: 'Andaman Cannacia', spec: isNl ? 'Kata, beachfront' : 'Kata, beachfront', price: '$1,800–3,000/nt', best: isNl ? 'Strand-toegang' : 'Beach access' },
      ];
    }
    return [
      { label: 'Andara Resort & Villas', spec: isNl ? '4–6BR hillside pool' : '4–6BR hillside pool', price: '$2,500–6,000/nt', best: isNl ? 'Multi-gen, 6–12 gasten' : 'Multi-gen, 6–12 guests' },
      { label: 'Sri Panwa', spec: isNl ? '3–5BR cliff villa' : '3–5BR cliff villa', price: '$2,000–4,500/nt', best: isNl ? 'Familie + uitzicht' : 'Family + views' },
      { label: 'Banyan Tree Phuket', spec: isNl ? '2–3BR lagoon pool' : '2–3BR lagoon pool', price: '$1,500–3,500/nt', best: isNl ? 'Kleinere gezinnen' : 'Smaller families' },
      { label: 'Trisara', spec: isNl ? '3–6BR oceanfront' : '3–6BR oceanfront', price: '$5,000–9,000/nt', best: isNl ? 'Beste + privé' : 'Best + private' },
      { label: 'Amanpuri private estates', spec: isNl ? '4–9BR + chef' : '4–9BR + chef', price: '$8,000–15,000/nt', best: isNl ? 'Multi-gen ultra-luxe' : 'Multi-gen ultra-luxury' },
    ];
  })();

  // ---------- DETAILED SECTION CARDS ----------
  const sections = (() => {
    if (spoke === 'private-pool') {
      return [
        {
          title: isNl ? 'Wat maakt een zwembad echt "privé"?' : 'What makes a pool truly "private"?',
          body: isNl
            ? "Drie criteria: (1) exclusief gebruik tijdens de boeking — geen andere gasten, (2) ommuurd of omheind binnen je villa-grenzen, niet zichtbaar vanaf gangen of gedeelde tuinen, (3) zwembad-formaat (minimum 5×3 m). Onder $700/nacht betekent 'pool villa' vaak een plunge pool van 3×2 m met gedeelde gang. Vraag altijd: \"pool exclusively for our villa, no shared access\" in de bevestiging."
            : "Three criteria: (1) exclusive use during your booking — no other guests, (2) walled or fenced inside your villa boundaries, not visible from corridors or shared gardens, (3) swimming size (minimum 5×3 m). Below $700/night, 'pool villa' often means a 3×2 m plunge pool with shared corridor. Always ask: \"pool exclusively for our villa, no shared access\" in writing.",
        },
        {
          title: isNl ? 'Verwarmde zwembaden — wanneer relevant?' : 'Heated pools — when does it matter?',
          body: isNl
            ? "December–februari kan ochtendwater dalen naar 24–26°C — onverwarmd voelt koud bij eerste duik. Verwarmd standaard bij Trisara, Amanpuri, Andara en betere Banyan Tree-units. Optioneel (vraag bij boeking) bij Sri Panwa. Niet aanwezig bij The Pavilions, Cape Sienna. Maart–november is water altijd 28–30°C — verwarming irrelevant."
            : "December–February morning water can drop to 24–26°C — unheated feels cold on first plunge. Heated standard at Trisara, Amanpuri, Andara, and better Banyan Tree units. Optional (ask at booking) at Sri Panwa. Not available at The Pavilions, Cape Sienna. March–November water is always 28–30°C — heating irrelevant.",
        },
        {
          title: isNl ? 'Pool-fence add-on voor peuters' : 'Pool-fence add-on for toddlers',
          body: isNl
            ? "Banyan Tree, Andara en Sri Panwa bieden een mesh-pool-fence add-on voor $50/nacht — een schuifbaar net rond het bad voor toddler-veiligheid. Vraag bij boeking als je kinderen onder 4 hebt. Andere resorts kunnen het via externe leveranciers regelen ($30–60/dag). Niet alle villa-layouts laten dit toe — sommige paden lopen door het bad."
            : "Banyan Tree, Andara and Sri Panwa offer a mesh pool fence add-on for $50/night — a sliding net around the pool for toddler safety. Ask at booking if you have kids under 4. Other resorts can usually arrange via external suppliers ($30–60/day). Not all villa layouts permit it — some paths run through the pool deck.",
        },
      ];
    }
    if (spoke === 'oceanfront') {
      return [
        {
          title: isNl ? "Wat is écht 'oceanfront' versus 'sea view'?" : "What's actually 'oceanfront' vs 'sea view'?",
          body: isNl
            ? "Oceanfront = direct strandtoegang of hooguit 50 m van het water, geen weg of ander gebouw ertussen. Sea view = uitzicht op zee, maar mogelijk een resort-gebouw, weg of bos ertussen. Trisara, Twinpalms Montazure en Andaman Cannacia zijn echt oceanfront. Sri Panwa is cliff-front (geen direct strand maar 50 m verticaal naar zee). Amanpuri-villa's variëren — sommige direct, andere 100 m."
            : "Oceanfront = direct beach access or at most 50 m from the water, no road or other building between. Sea view = a view of the sea, but possibly with a resort building, road or scrub between. Trisara, Twinpalms Montazure and Andaman Cannacia are truly oceanfront. Sri Panwa is clifffront (no direct beach but 50 m vertical to sea). Amanpuri villas vary — some direct, others 100 m.",
        },
        {
          title: isNl ? 'Beste oceanfront-gebieden in Phuket' : 'Best oceanfront areas in Phuket',
          body: isNl
            ? "Layan/Pansea (noordwest) — Trisara, Amanpuri, The Surin Phuket. Brede platte stranden, kalme cove-bays, beste zonsondergangen. Kamala (noord-Patong) — Twinpalms Montazure, Andara. Beach-strip plus restaurants in loopafstand. Cape Panwa (zuidoost) — Sri Panwa cliff, kalme havenzijde, sunrise. Patong/Karon zelf vermijden — strand massaal, weinig oceanfront luxe-villa's."
            : "Layan/Pansea (north-west) — Trisara, Amanpuri, The Surin Phuket. Wide flat beaches, calm cove bays, best sunsets. Kamala (north of Patong) — Twinpalms Montazure, Andara. Beach strip plus walkable restaurants. Cape Panwa (south-east) — Sri Panwa cliff, calm harbour side, sunrise. Patong/Karon itself: avoid — beach is mass tourism, no oceanfront luxury villas to speak of.",
        },
        {
          title: isNl ? 'Direct beach-toegang vs cliff-pool — wat past bij jou?' : 'Direct beach access vs cliff pool — which fits you?',
          body: isNl
            ? "Direct beach: Twinpalms Montazure, Andaman Cannacia, The Surin Phuket — je loopt 30 sec van pool naar zand. Beste voor families en wie elke dag wil zwemmen in zee. Cliff-pool: Sri Panwa, sommige Amanpuri en Trisara villa's — pool boven zee, geen direct strand maar dramatischer uitzicht en meer privacy. Beste voor stellen die fotogeniek view boven strandzwemmen waarderen."
            : "Direct beach: Twinpalms Montazure, Andaman Cannacia, The Surin Phuket — 30 seconds from pool to sand. Best for families and anyone wanting daily sea swims. Cliff pool: Sri Panwa, some Amanpuri and Trisara villas — pool above the sea, no direct beach but more dramatic view and more privacy. Best for couples who value photogenic views over beach swimming.",
        },
      ];
    }
    return [
      {
        title: isNl ? 'Family villa configuraties (4–9 slaapkamers)' : 'Family villa configurations (4–9 bedrooms)',
        body: isNl
          ? "Andara biedt 4–6 slaapkamer hillside villa's ($2.500–6.000/nacht voor 6–12 gasten). Sri Panwa heeft 3–5 slaapkamer cliff villa's ($2.000–4.500). Trisara heeft 3–6 slaapkamer oceanfront ($5.000–9.000). Amanpuri private estates gaan tot 9 slaapkamers ($8.000–15.000/nacht voor 18 gasten met eigen chef en butler). Per slaapkamer berekend zijn grotere configuraties altijd voordeliger — een 6BR is vaak slechts 2,5× de prijs van 1BR."
          : "Andara offers 4–6 bedroom hillside villas ($2,500–6,000/night for 6–12 guests). Sri Panwa has 3–5 bedroom cliff villas ($2,000–4,500). Trisara has 3–6 bedroom oceanfront ($5,000–9,000). Amanpuri private estates go up to 9 bedrooms ($8,000–15,000/night for 18 guests with own chef and butler). Per-bedroom, larger configs are always cheaper — a 6BR is often only 2.5× the price of 1BR.",
      },
      {
        title: isNl ? 'Wat krijg je extra bij families?' : 'What do you get extra for families?',
        body: isNl
          ? "Pool-fence add-on (mesh-hek voor toddler-safety, $50/nacht). Kids' menu in elk restaurant. Kids' club in Banyan Tree, Sri Panwa, Trisara en Amanpuri (ochtend + middag programma). In-villa nanny-service ($15–25/uur) — boekable via villa-attendant. Multi-gen-friendly layouts: aparte master + kids-vleugels, eigen entrée vanuit elke kamer naar het zwembad. Vraag specifiek naar kinderbedjes (cribs) en hoge stoelen — meestal gratis."
          : "Pool-fence add-on (mesh fence for toddler safety, $50/night). Kids' menu at every restaurant. Kids' club at Banyan Tree, Sri Panwa, Trisara and Amanpuri (morning + afternoon program). In-villa nanny service ($15–25/hour) — bookable via villa attendant. Multi-gen-friendly layouts: separate master + kids' wings, individual entry from each room to the pool. Specifically request cribs and high chairs — usually free.",
      },
      {
        title: isNl ? 'Beste family villa-resorts per gezinsgrootte' : 'Best family villa resorts by family size',
        body: isNl
          ? "Gezin van 4 (2 ouders + 2 kids): Banyan Tree 2BR pool villa ($1.500/nacht). Gezin van 6 (incl. opa/oma): Andara 3BR ($1.500–2.000/nacht) of Sri Panwa 3BR ($2.000). Gezin van 8 (multi-gen): Andara 4–6BR ($2.500–4.000) of Trisara 4BR oceanfront ($6.000–8.000). Multi-gen 12+: Amanpuri 6–9 bedroom private estate ($10K+/nacht maar per-persoon vergelijkbaar met luxe hotelkamer)."
          : "Family of 4 (2 parents + 2 kids): Banyan Tree 2BR pool villa ($1,500/night). Family of 6 (incl. grandparents): Andara 3BR ($1,500–2,000/night) or Sri Panwa 3BR ($2,000). Family of 8 (multi-gen): Andara 4–6BR ($2,500–4,000) or Trisara 4BR oceanfront ($6,000–8,000). Multi-gen 12+: Amanpuri 6–9 bedroom private estate ($10K+/night but per-person comparable with luxury hotel rooms).",
      },
    ];
  })();

  // ---------- BUYER'S GUIDE TIPS ----------
  const tips = (() => {
    if (spoke === 'private-pool') {
      return [
        { strong: isNl ? 'Eis "exclusive use"' : 'Demand "exclusive use"', body: isNl ? '— in de schriftelijke bevestiging. "Pool villa" zonder dat woord kan gedeelde toegang betekenen.' : '— in the written confirmation. "Pool villa" without that word can mean shared access.' },
        { strong: isNl ? 'Vraag pool-formaat' : 'Ask for pool size', body: isNl ? '— minimaal 5 m lang om écht baantjes te trekken. Onder 5 m = afkoel-bad, niet zwembad.' : '— minimum 5 m long for actual lap swimming. Under 5 m = soaking pool, not swimming pool.' },
        { strong: isNl ? 'Verwarming bevestigen voor dec–feb' : 'Confirm heating for Dec–Feb', body: isNl ? '— ochtendwater 24–26°C voelt onverwarmd koud. Standaard bij Trisara, Amanpuri, Andara.' : '— morning water at 24–26°C feels cold unheated. Standard at Trisara, Amanpuri, Andara.' },
        { strong: isNl ? 'Pool-fence voor kids onder 4' : 'Pool fence for kids under 4', body: isNl ? '— $50/nacht add-on bij Banyan Tree, Andara, Sri Panwa. Mesh-hek rond bad.' : '— $50/night add-on at Banyan Tree, Andara, Sri Panwa. Mesh fence around the pool.' },
        { strong: isNl ? 'Boek de grootste villa' : 'Book the largest villa', body: isNl ? '— 3-bedroom is vaak slechts 60% duurder dan 1-bedroom. Per slaapkamer fors goedkoper.' : '— 3-bedroom is often only 60% more than 1-bedroom. Per bedroom significantly cheaper.' },
        { strong: isNl ? 'Service charge + btw apart' : 'Service charge + VAT extra', body: isNl ? '— 10% service + 7% btw bovenop "from"-prijs. Reken altijd 17% extra.' : '— 10% service + 7% VAT on top of "from" price. Always add 17%.' },
        { strong: isNl ? 'Vergelijk Trip.com vs direct' : 'Compare Trip.com vs direct', body: isNl ? '— soms wint Trip met 15–25% lager. Soms wint direct met perks (transfer, ontbijt, spa-credit). Check beide.' : '— sometimes Trip wins with 15–25% lower. Sometimes direct wins with perks (transfer, breakfast, spa credit). Check both.' },
      ];
    }
    if (spoke === 'oceanfront') {
      return [
        { strong: isNl ? '"Oceanfront" vs "sea view" verschil' : '"Oceanfront" vs "sea view" matters', body: isNl ? '— oceanfront = max 50m van zee, geen weg ertussen. Sea view = uitzicht maar resort/weg ertussen. Vraag specifiek.' : '— oceanfront = max 50m from sea, no road between. Sea view = view but resort/road in between. Ask specifically.' },
        { strong: isNl ? 'Layan + Pansea = beste areas' : 'Layan + Pansea = top areas', body: isNl ? '— breed strand, kalme cove-bays, beste zonsondergangen. Trisara en Amanpuri zitten hier.' : '— wide beach, calm cove bays, best sunsets. Trisara and Amanpuri are here.' },
        { strong: isNl ? 'Cliff-pool vs direct beach kiezen' : 'Cliff pool vs direct beach', body: isNl ? '— families willen meestal direct beach. Stellen die view + privacy willen kiezen cliff (Sri Panwa).' : '— families usually want direct beach. Couples valuing view + privacy choose cliff (Sri Panwa).' },
        { strong: isNl ? 'Boek 3–4 maanden vooruit (hoogseizoen)' : 'Book 3–4 months ahead (high season)', body: isNl ? '— oceanfront-villa\'s zijn de eerste die volgeboekt raken. Voor Kerst/CNY: 4–6 maanden vooruit.' : '— oceanfront villas are the first to sell out. For Christmas/CNY: 4–6 months ahead.' },
        { strong: isNl ? 'Andamansezicht oost vs west' : 'East vs West views', body: isNl ? '— Westkust (Layan, Kamala): zonsondergang. Oostkust (Cape Panwa): zonsopgang + kalmer water.' : '— West coast (Layan, Kamala): sunset. East coast (Cape Panwa): sunrise + calmer water.' },
        { strong: isNl ? 'Mei–oktober = monsoon-impact' : 'May–October = monsoon impact', body: isNl ? '— oceanfront-villa\'s vangen meer wind en regen. Maar 30–45% korting kan het waard zijn.' : '— oceanfront villas catch more wind and rain. But 30–45% discount may make it worth it.' },
        { strong: isNl ? 'Strandstoelen + kayaks gratis' : 'Beach loungers + kayaks free', body: isNl ? '— bij Trisara, Twinpalms, Andaman Cannacia inbegrepen. Bij Amanpuri inclusief premium service.' : '— at Trisara, Twinpalms, Andaman Cannacia included. At Amanpuri included with premium service.' },
      ];
    }
    return [
      { strong: isNl ? 'Boek de grootste configuratie' : 'Book the largest config', body: isNl ? '— per slaapkamer fors goedkoper. 6BR Andara is vaak slechts 2,5× de 1BR-prijs.' : '— per bedroom much cheaper. 6BR Andara often only 2.5× the 1BR price.' },
      { strong: isNl ? 'Pool-fence voor kleintjes' : 'Pool fence for little ones', body: isNl ? '— $50/nacht add-on bij Banyan Tree, Andara, Sri Panwa.' : '— $50/night add-on at Banyan Tree, Andara, Sri Panwa.' },
      { strong: isNl ? 'Eigen chef voor multi-gen' : 'Own chef for multi-gen', body: isNl ? '— Amanpuri standaard, anderen via villa-attendant ($150–250/dag voor 8 gasten). Bespaart restaurant-stress.' : '— Amanpuri standard, others via villa attendant ($150–250/day for 8 guests). Saves restaurant logistics.' },
      { strong: isNl ? 'Multi-gen layout vragen' : 'Ask for multi-gen layout', body: isNl ? '— aparte master + kids-vleugels, ouders en grootouders apart. Vraag plattegrond bij boeking.' : '— separate master + kids wings, parents and grandparents apart. Request floor plan at booking.' },
      { strong: isNl ? 'In-villa nanny ($15–25/u)' : 'In-villa nanny ($15–25/h)', body: isNl ? '— boekable via villa-attendant. Voor avond-out is essentieel.' : '— bookable via villa attendant. Essential for parents night out.' },
      { strong: isNl ? 'Cribs + high chairs gratis' : 'Cribs + high chairs free', body: isNl ? '— vraag bij boeking. Standaard bij alle luxe-resorts in Phuket.' : '— ask at booking. Standard at all luxury resorts in Phuket.' },
      { strong: isNl ? 'Kids\' club checken' : "Check kids' club", body: isNl ? '— Banyan Tree, Sri Panwa, Trisara, Amanpuri hebben programmas voor 4–12. Geeft ouders middagrust.' : '— Banyan Tree, Sri Panwa, Trisara, Amanpuri have programmes for ages 4–12. Gives parents afternoon rest.' },
    ];
  })();

  // ---------- FAQ ----------
  const faqEn = (() => {
    if (spoke === 'private-pool') {
      return [
        { q: 'How much is a Phuket private pool villa per night?', a: '2026 high-season rates: Cape Sienna $600+, The Pavilions $700+, Banyan Tree $800+, Andara $1,200+, Sri Panwa $1,200+, Trisara $2,500+, Amanpuri $5,000+. May–Oct most properties drop 30–45%. Add 10% service + 7% VAT — usually quoted separately. Premium 1-bedroom at Banyan Tree or Sri Panwa is the sweet spot for couples; 3-bedroom Andara is sweet spot for families.' },
        { q: 'Is the pool actually private or shared?', a: 'At the $700+/night tier, genuinely private — Banyan Tree, Trisara, Sri Panwa, Andara, Amanpuri, The Pavilions, Cape Sienna all guarantee exclusive use, walled or fenced, no shared corridor. Below $600/night, "pool villa" can mean a plunge pool with shared access. Always demand "pool exclusively for our villa, no shared access" in the booking confirmation.' },
        { q: 'How big is the pool?', a: 'Standard luxury private pool: 6×3 m to 8×4 m, 1.4 m depth — fits a couple swimming together comfortably. Trisara oceanfront: 8×3.5 m infinity. Amanpuri private estates: 12×5 m main pool plus secondary plunge pool. Below 5 m it functions as a soaking/cooling pool. Heated Nov–Feb at Trisara, Amanpuri, Andara.' },
        { q: 'Are private pool villas suitable for kids?', a: 'Yes — arguably the best accommodation for kids in Phuket. Walled/fenced pool means no random adults nearby; you watch from the terrace. Pool-fence add-ons available at Banyan Tree, Andara, Sri Panwa ($50/night) for toddler safety. 2-bedroom configurations $1,000–2,500/night for a family of 4 is strong value vs separate hotel rooms.' },
        { q: 'When should I book?', a: 'High season (Nov–Apr): 2–4 months ahead. Christmas/NY/Chinese NY weeks: 4–6 months ahead. Low season (May–Oct): 2 weeks usually works. Sweet-spot months: late November (high-season weather, no holiday surcharge) or early May (start of low season, hotels still well-staffed).' },
      ];
    }
    if (spoke === 'oceanfront') {
      return [
        { q: 'What\'s the difference between oceanfront and sea-view?', a: 'Oceanfront = direct beach access or at most 50 m from the water, no road or other building between. Sea view = a view of the sea, but possibly with a resort building, road or scrub between. Trisara, Twinpalms Montazure, Andaman Cannacia and The Surin are truly oceanfront. Sri Panwa is clifffront. Amanpuri varies by villa.' },
        { q: 'Which areas of Phuket have the best oceanfront villas?', a: 'Layan + Pansea (north-west) — Trisara, Amanpuri, The Surin. Wide flat beaches, calm cove bays, best sunsets. Kamala (north of Patong) — Twinpalms Montazure, Andaman Cannacia. Beach strip plus walkable restaurants. Cape Panwa (south-east) — Sri Panwa cliff villa, calm harbour-side, sunrise. Avoid Patong/Karon for oceanfront luxury — that strip is mass tourism.' },
        { q: 'How much do oceanfront pool villas cost?', a: 'Twinpalms Montazure $900–2,200/night. Sri Panwa cliff villa $1,200–4,500. The Surin Phuket $1,500–3,500. Andaman Cannacia $1,800–3,000. Trisara oceanfront $2,500–9,000. Amanpuri $5,000+. May–Oct discount 30–45% off rack rates. Add 10% service + 7% VAT.' },
        { q: 'Is direct beach access included?', a: 'Yes at Twinpalms Montazure, Andaman Cannacia, The Surin Phuket, Amanpuri (own private cove). Sri Panwa is clifffront — 50m vertical to sea, no direct walk-out. Trisara has direct beach but a 100m staircase from upper villas. Confirm at booking — "direct walkout to sand" is the phrase to use.' },
        { q: 'Best season for an oceanfront villa in Phuket?', a: 'November–April: calm seas, every day usable, all restaurants open. May–October: south-west monsoon hits the west coast harder than inland — oceanfront villas can have 1–2 days/week of strong wind and rain. East-coast Sri Panwa is more sheltered. Sweet-spot: late November (full high-season weather, no holiday premium).' },
      ];
    }
    return [
      { q: 'How many bedrooms in a Phuket family villa?', a: '4–9 bedrooms is the typical range. Banyan Tree 2–3BR ($1,500–3,500). Sri Panwa 3–5BR ($2,000–4,500). Andara 4–6BR ($2,500–6,000). Trisara 3–6BR ($5,000–9,000). Amanpuri private estates 4–9BR ($8,000–15,000/night for 18 guests). Per-bedroom, larger configurations are always cheaper.' },
      { q: 'Are family villas safe for toddlers?', a: 'Yes with the pool-fence add-on. Banyan Tree, Andara, Sri Panwa offer mesh fences ($50/night). Most luxury villas are designed with safety in mind: enclosed gardens, no open balconies in kid wings, soft pool edges. Cribs and high chairs free on request. In-villa nanny service $15–25/h via villa attendant.' },
      { q: 'What kid amenities come standard?', a: "Kids' menus at every restaurant. Kids' clubs at Banyan Tree, Sri Panwa, Trisara, Amanpuri (ages 4–12, morning + afternoon programme). Cribs + high chairs free. Pool toys, beach toys, snorkel gear available. In-villa babysitter on request. Some resorts offer kid-friendly spa treatments + cooking classes." },
      { q: 'Can we get our own chef in the villa?', a: 'Yes. Amanpuri private estates include a personal chef. Trisara, Sri Panwa, Andara, Banyan Tree offer in-villa chef on request ($150–250/day plus food cost for 8 guests). Saves restaurant logistics with kids. Particularly good for breakfast and dinner — lunch usually still at the resort restaurants for variety.' },
      { q: 'How much does a 6-bedroom family villa really cost?', a: 'Andara 6BR: $4,000–6,000/night. Trisara 6BR oceanfront: $7,000–9,000/night. Amanpuri 6BR private estate: $10,000–13,000/night. Per-bedroom on Andara that\'s $666–1,000/night — comparable to a luxury hotel room — but with private pool, full kitchen, and 6 bedrooms close together. For multi-gen trips: usually the cheapest luxury option per person.' },
    ];
  })();

  const faqNl = (() => {
    if (spoke === 'private-pool') {
      return [
        { q: 'Wat kost een Phuket private pool villa per nacht?', a: '2026 hoogseizoen-tarieven: Cape Sienna $600+, The Pavilions $700+, Banyan Tree $800+, Andara $1.200+, Sri Panwa $1.200+, Trisara $2.500+, Amanpuri $5.000+. Mei–okt 30–45% goedkoper. Plus 10% service + 7% btw — meestal apart. Premium 1-bedroom bij Banyan Tree of Sri Panwa is sweet spot voor stellen; 3-bedroom Andara voor families.' },
        { q: 'Is het zwembad echt privé of gedeeld?', a: 'Op $700+/nacht: echt privé — Banyan Tree, Trisara, Sri Panwa, Andara, Amanpuri, The Pavilions, Cape Sienna garanderen exclusief gebruik, ommuurd of omheind, geen gedeelde gang. Onder $600/nacht kan "pool villa" plunge pool met gedeelde toegang betekenen. Eis altijd schriftelijk: "pool exclusively for our villa, no shared access".' },
        { q: 'Hoe groot is het zwembad?', a: 'Standaard luxe privé-zwembad: 6×3 m tot 8×4 m, 1,4 m diep — twee personen kunnen comfortabel samen zwemmen. Trisara oceanfront: 8×3,5 m infinity. Amanpuri privé-estates: 12×5 m hoofdzwembad plus secundaire plunge pool. Onder 5 m functioneert als afkoel-bad. Verwarmd nov–feb bij Trisara, Amanpuri, Andara.' },
        { q: 'Zijn private pool villa\'s geschikt voor kinderen?', a: 'Ja — argumenteerbaar de beste accommodatie voor kinderen in Phuket. Ommuurd/omheind zwembad betekent geen vreemde volwassenen; je kijkt vanaf het terras. Pool-fence add-ons bij Banyan Tree, Andara, Sri Panwa ($50/nacht) voor toddler-safety. 2-bedroom configuraties $1.000–2.500/nacht voor een gezin van 4 is sterke value vs aparte hotelkamers.' },
        { q: 'Wanneer moet ik boeken?', a: 'Hoogseizoen (nov–apr): 2–4 maanden vooruit. Kerst/Oud & Nieuw/Chinees Nieuwjaar: 4–6 maanden vooruit. Laagseizoen (mei–okt): 2 weken werkt meestal. Sweet-spot maanden: laat november (hoogseizoens-weer zonder vakantietoeslag) of begin mei (start laagseizoen, hotels nog goed bemand).' },
      ];
    }
    if (spoke === 'oceanfront') {
      return [
        { q: 'Wat is het verschil tussen oceanfront en sea-view?', a: 'Oceanfront = direct strandtoegang of maximaal 50 m van zee, geen weg of gebouw ertussen. Sea view = uitzicht op zee, maar mogelijk een resort-gebouw, weg of bos ertussen. Trisara, Twinpalms Montazure, Andaman Cannacia en The Surin zijn echt oceanfront. Sri Panwa is cliff-front. Amanpuri varieert per villa.' },
        { q: 'Welke gebieden van Phuket hebben de beste oceanfront villa\'s?', a: 'Layan + Pansea (noordwest) — Trisara, Amanpuri, The Surin. Brede platte stranden, kalme cove-bays, beste zonsondergangen. Kamala (noord van Patong) — Twinpalms Montazure, Andaman Cannacia. Beach-strip plus restaurants in loopafstand. Cape Panwa (zuidoost) — Sri Panwa cliff villa, kalme havenzijde, sunrise. Patong/Karon vermijden voor oceanfront luxe — die strip is massa-toerisme.' },
        { q: 'Wat kosten oceanfront pool villa\'s?', a: 'Twinpalms Montazure $900–2.200/nacht. Sri Panwa cliff villa $1.200–4.500. The Surin Phuket $1.500–3.500. Andaman Cannacia $1.800–3.000. Trisara oceanfront $2.500–9.000. Amanpuri $5.000+. Mei–okt 30–45% korting. Plus 10% service + 7% btw.' },
        { q: 'Is direct strandtoegang inbegrepen?', a: 'Ja bij Twinpalms Montazure, Andaman Cannacia, The Surin Phuket, Amanpuri (eigen privé-cove). Sri Panwa is cliff-front — 50 m verticaal naar zee, geen direct walk-out. Trisara heeft direct strand maar 100 m trap vanaf upper villa\'s. Bevestig bij boeking — "direct walkout to sand" is de zin om te gebruiken.' },
        { q: 'Beste seizoen voor een oceanfront villa in Phuket?', a: 'November–april: kalme zee, elke dag bruikbaar, alle restaurants open. Mei–oktober: zuidwestmoesson raakt de westkust harder dan binnenland — oceanfront-villa\'s kunnen 1–2 dagen/week sterke wind en regen hebben. Oostkust Sri Panwa is meer beschut. Sweet-spot: laat november (volle hoogseizoen-weer zonder vakantietoeslag).' },
      ];
    }
    return [
      { q: 'Hoeveel slaapkamers in een Phuket family villa?', a: '4–9 slaapkamers is de typische range. Banyan Tree 2–3BR ($1.500–3.500). Sri Panwa 3–5BR ($2.000–4.500). Andara 4–6BR ($2.500–6.000). Trisara 3–6BR ($5.000–9.000). Amanpuri privé-estates 4–9BR ($8.000–15.000/nacht voor 18 gasten). Per slaapkamer zijn grotere configuraties altijd voordeliger.' },
      { q: 'Zijn family villa\'s veilig voor peuters?', a: 'Ja, met de pool-fence add-on. Banyan Tree, Andara, Sri Panwa bieden mesh-hekken ($50/nacht). Meeste luxe-villa\'s zijn ontworpen met veiligheid: omheinde tuinen, geen open balkons in kindervleugels, zachte zwembadranden. Kinderbedjes en hoge stoelen gratis op verzoek. In-villa nanny-service $15–25/u via villa-attendant.' },
      { q: 'Welke kinderfaciliteiten zijn standaard?', a: "Kids' menus in elk restaurant. Kids' clubs bij Banyan Tree, Sri Panwa, Trisara, Amanpuri (4–12 jaar, ochtend + middag programma). Kinderbedjes + hoge stoelen gratis. Zwembadspeelgoed, strandspeelgoed, snorkelgear beschikbaar. In-villa oppas op verzoek. Sommige resorts bieden kindvriendelijke spa-behandelingen + kookklassen." },
      { q: 'Kunnen we een eigen chef in de villa krijgen?', a: 'Ja. Amanpuri privé-estates inclusief persoonlijke chef. Trisara, Sri Panwa, Andara, Banyan Tree bieden in-villa chef op verzoek ($150–250/dag plus eten voor 8 gasten). Bespaart restaurant-logistiek met kinderen. Vooral goed voor ontbijt en diner — lunch meestal nog bij de resort-restaurants voor variatie.' },
      { q: 'Wat kost een 6-slaapkamer family villa echt?', a: 'Andara 6BR: $4.000–6.000/nacht. Trisara 6BR oceanfront: $7.000–9.000/nacht. Amanpuri 6BR privé-estate: $10.000–13.000/nacht. Per slaapkamer op Andara: $666–1.000/nacht — vergelijkbaar met luxe hotelkamer — maar met privézwembad, volledige keuken, en 6 slaapkamers dicht bijeen. Voor multi-gen trips: vaak goedkoopste luxe-optie per persoon.' },
    ];
  })();

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
      <SEOHead title={titleFinal} description={descFinal}>
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        <section className="bg-thailand-blue text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Breadcrumbs items={breadcrumbs} />
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-white/75">{kickerFinal}</p>
            <h1 className="font-heading text-3xl lg:text-5xl font-bold mt-2">{h1Final}</h1>
            <p className="mt-4 text-lg lg:text-xl max-w-3xl opacity-95">
              {spoke === 'private-pool' && (isNl
                ? "Niet alle 'private pool villa\'s' in Phuket zijn écht privé. Hier vind je de 7 resorts waar elk zwembad exclusief van jou is, ommuurd of omheind, en in echte zwembad-formaat. Plus precies wat je krijgt voor $700, $1.500 of $5.000/nacht."
                : "Not every 'private pool villa' in Phuket is actually private. Here are 7 resorts where each pool is exclusively yours, walled or fenced, and in real swimming-size. Plus exactly what you get at $700, $1,500 or $5,000/night.")}
              {spoke === 'oceanfront' && (isNl
                ? "Phuket\'s oceanfront pool villa\'s zitten geconcentreerd in Layan, Pansea, Kamala en Cape Panwa. Hier vergelijk je 6 echt-direct-aan-zee resorts ($1.500–9.000/nacht), zien welk gebied past bij je trip, en vermijd je 'sea view'-doorverkoop."
                : "Phuket's oceanfront pool villas concentrate in Layan, Pansea, Kamala and Cape Panwa. Here you compare 6 truly-on-the-water resorts ($1,500–9,000/night), see which area fits your trip, and avoid 'sea view' upselling.")}
              {spoke === 'family' && (isNl
                ? "Phuket family villa\'s met 4+ slaapkamers zijn vaak de goedkoopste luxe-optie per persoon. Hier vergelijk je 5 resorts (Andara, Sri Panwa, Banyan Tree, Trisara, Amanpuri privé-estates), zie je wat extra geregeld wordt voor kids, en kies je op gezinsgrootte."
                : "Phuket family villas with 4+ bedrooms are often the cheapest luxury option per person. Here you compare 5 resorts (Andara, Sri Panwa, Banyan Tree, Trisara, Amanpuri private estates), see what's arranged extra for kids, and choose by family size.")}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={withSubId(primaryUrl, placementSubId('hero-primary'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-6 py-3 text-base font-semibold hover:bg-red-700 shadow-lg">
                {spoke === 'private-pool' && (isNl ? 'Bekijk private pool villa\'s op Trip.com' : 'See private pool villas on Trip.com')}
                {spoke === 'oceanfront' && (isNl ? 'Bekijk oceanfront villa\'s op Trip.com' : 'See oceanfront villas on Trip.com')}
                {spoke === 'family' && (isNl ? 'Bekijk family villa\'s op Trip.com' : 'See family villas on Trip.com')}
                {' '}→
              </a>
              <a href={withSubId(BOOKING_GENERIC, placementSubId('hero-booking'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-white text-thailand-blue border border-white/40 px-6 py-3 text-base font-semibold hover:bg-white/90">
                {isNl ? 'Vergelijk op Booking.com' : 'Compare on Booking.com'} →
              </a>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-xs opacity-90">
              <span>✔ {isNl ? 'Bijgewerkt' : 'Updated'} {new Date(lastUpdated).toLocaleDateString(isNl ? 'nl-NL' : 'en', { year: 'numeric', month: 'long' })}</span>
              <span>✔ {isNl ? 'Geen extra kosten voor jou' : 'No extra cost to you'}</span>
              <span>✔ {isNl ? 'Eerlijke vergelijking' : 'Honest comparison'}</span>
            </div>
          </div>
        </section>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          {/* Quick stats */}
          <section className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'In één oogopslag' : 'At a glance'}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              {heroStats.map((s, i) => (
                <div key={i}>
                  <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{s.label}</p>
                  <p className="mt-1 font-heading font-bold text-gray-900 text-lg">{s.value}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Comparison table */}
          <section id="comparison">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-2">
              {spoke === 'private-pool' && (isNl ? 'Private pool villa-resorts vergeleken' : 'Private pool villa resorts compared')}
              {spoke === 'oceanfront' && (isNl ? 'Oceanfront villa-resorts vergeleken' : 'Oceanfront villa resorts compared')}
              {spoke === 'family' && (isNl ? 'Family villa-resorts vergeleken' : 'Family villa resorts compared')}
            </h2>
            <p className="text-gray-600 mb-6">{isNl ? 'Klik om actuele beschikbaarheid te zien (we verdienen een kleine commissie zonder dat het jou iets extra kost).' : 'Click to see live availability (we earn a small commission at no extra cost to you).'}</p>
            <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Resort' : 'Resort'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Specs' : 'Specs'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Prijs' : 'Price'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Beste voor' : 'Best for'}</th>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Boek' : 'Book'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {tableRows.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-semibold text-gray-900">{row.label}</td>
                      <td className="px-4 py-3 text-gray-700">{row.spec}</td>
                      <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{row.price}</td>
                      <td className="px-4 py-3 text-gray-700">{row.best}</td>
                      <td className="px-4 py-3"><a href={withSubId(primaryUrl, placementSubId(`table-${i}`))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-thailand-red font-semibold hover:underline whitespace-nowrap">{isNl ? 'Bekijk →' : 'See deals →'}</a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-gray-500">{isNl ? 'Prijzen zijn 2026 hoogseizoen-tarieven (dec–feb), exclusief 10% service + 7% btw. Mei–okt meestal 30–45% lager.' : 'Prices are 2026 high-season rates (Dec–Feb), excluding 10% service + 7% VAT. May–Oct typically 30–45% cheaper.'}</p>
          </section>

          {/* Top pick callout */}
          <section className="rounded-2xl bg-thailand-red/5 border-2 border-thailand-red p-6">
            <span className="inline-block rounded-full bg-thailand-red text-white text-xs font-bold uppercase tracking-wide px-3 py-1 mb-3">⭐ {isNl ? 'Onze keuze' : 'Our pick'}</span>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">
              {spoke === 'private-pool' && (isNl ? 'Banyan Tree Phuket — beste value echte privé-pool' : 'Banyan Tree Phuket — best value truly-private pool')}
              {spoke === 'oceanfront' && (isNl ? 'Trisara — directe oceanfront infinity pool villa\'s' : 'Trisara — direct oceanfront infinity pool villas')}
              {spoke === 'family' && (isNl ? 'Andara Resort — 4–6BR hillside pool villa\'s voor multi-gen' : 'Andara Resort — 4–6BR hillside pool villas for multi-gen')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              {spoke === 'private-pool' && (isNl
                ? 'Voor wie een echt privé-zwembad wil zonder Trisara/Amanpuri-prijzen: Banyan Tree Phuket bij Bang Tao lagoon levert ommuurd 6×3 m zwembad, eigen tuin, butler op afroep, vanaf $800/nacht. 1- en 2-bedroom configuraties. Boek 6+ nachten en je krijgt vaak gratis transfer + spa-credit.'
                : 'For travelers wanting a genuine private pool without Trisara/Amanpuri pricing: Banyan Tree Phuket at Bang Tao lagoon delivers a walled 6×3 m pool, own garden, butler on call, from $800/night. 1- and 2-bedroom configurations. Book 6+ nights and you typically get a complimentary transfer + spa credit.')}
              {spoke === 'oceanfront' && (isNl
                ? '39 villa\'s op een 25-acre privé-cove ten noorden van Layan Beach. Élke villa heeft een infinity pool met direct uitzicht op de Andamanzee. 2-bedroom oceanfront pool villa $2.500–4.500/nacht — sweet spot voor stellen of klein gezin. Restaurants PRU (1 Michelin-ster) en Seafood. Het meest privé high-end resort op het hoofdland.'
                : '39 villas on a 25-acre private cove north of Layan Beach. Every villa has an infinity pool with direct Andaman Sea view. 2-bedroom oceanfront pool villa $2,500–4,500/night — sweet spot for couples or small families. Restaurants PRU (1 Michelin star) and Seafood. The most private high-end resort on the mainland.')}
              {spoke === 'family' && (isNl
                ? '63 hillside pool villa\'s in Kamala met spectaculair uitzicht op de Andamanzee. 4–6 bedroom configuraties zijn dé multi-gen keuze ($2.500–6.000/nacht voor 8–12 gasten — sterk per persoon). Eigen chef on-site, supermarkt op het terrein, shuttle naar Kamala beach. Pool-fence add-on en kids\' club inbegrepen.'
                : "63 hillside pool villas in Kamala with spectacular Andaman Sea views. 4–6 bedroom configs are the multi-gen choice ($2,500–6,000/night for 8–12 guests — strong per-person). On-site chef, supermarket on-property, shuttle to Kamala beach. Pool-fence add-on and kids' club included.")}
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={withSubId(primaryUrl, placementSubId('toppick-primary'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">
                {isNl ? 'Bekijk op Trip.com' : 'See on Trip.com'} →
              </a>
              <a href={withSubId(secondaryUrl, placementSubId('toppick-secondary'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">
                {isNl ? 'Vergelijk alternatieven' : 'Compare alternatives'} →
              </a>
            </div>
          </section>

          {/* Detailed sections */}
          <section className="space-y-5">
            {sections.map((s, i) => (
              <div key={i} className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
                <h2 className="font-heading text-xl font-bold text-gray-900 mb-2">{s.title}</h2>
                <p className="text-gray-700 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </section>

          {/* Buyer's guide */}
          <section className="rounded-2xl bg-amber-50 border border-amber-200 p-6">
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">
              {spoke === 'private-pool' && (isNl ? 'Boekingstips voor echte private pool villa\'s' : 'Booking tips for truly-private pool villas')}
              {spoke === 'oceanfront' && (isNl ? 'Boekingstips voor oceanfront villa\'s' : 'Booking tips for oceanfront villas')}
              {spoke === 'family' && (isNl ? 'Boekingstips voor family villa\'s' : 'Booking tips for family villas')}
            </h2>
            <ul className="space-y-3 text-gray-800">
              {tips.map((t, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-amber-700 font-bold">→</span>
                  <span><strong>{t.strong}</strong>{' '}{t.body}</span>
                </li>
              ))}
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

          {/* Sibling spokes */}
          {siblings.length > 0 && (
            <section>
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                {isNl ? 'Andere luxe villa-types in Phuket' : 'Other luxury villa types in Phuket'}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {siblings.map(s => (
                  <Link key={s} href={`/phuket-luxury-villas/${s}/`} className="block rounded-2xl bg-white p-4 shadow-sm border border-gray-200 hover:border-thailand-blue transition-colors">
                    <p className="font-heading font-bold text-gray-900">{isNl ? SPOKE_LABELS[s].nl : SPOKE_LABELS[s].en}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {s === 'private-pool' && (isNl ? 'Echte privé-zwembaden, $700–10.000/nacht' : 'Truly private pools, $700–10,000/night')}
                      {s === 'oceanfront' && (isNl ? 'Direct zeezicht, vanaf $1.500/nacht' : 'Direct sea view, from $1,500/night')}
                      {s === 'family' && (isNl ? 'Multi-bedroom voor 6–12 gasten' : 'Multi-bedroom for 6–12 guests')}
                    </p>
                    <p className="text-xs text-thailand-blue mt-2 font-semibold">{isNl ? 'Bekijk gids' : 'See guide'} →</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Cluster mesh — UP to pillar + cross-cluster */}
          <section className="rounded-2xl bg-thailand-blue/10 p-6">
            <h2 className="font-heading text-xl font-bold text-gray-900">
              {spoke === 'private-pool' && (isNl ? 'Plan de rest van je luxe Phuket-trip' : 'Plan the rest of your luxury Phuket trip')}
              {spoke === 'oceanfront' && (isNl ? 'Plan de rest van je oceanfront-vakantie' : 'Plan the rest of your oceanfront vacation')}
              {spoke === 'family' && (isNl ? 'Plan de rest van je family-trip' : 'Plan the rest of your family trip')}
            </h2>
            <p className="mt-2 text-gray-700">{isNl ? 'Je villa is geboekt — werk de rest af:' : 'Villa booked — wrap up the rest:'}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {/* UP to pillar — anchor variation */}
              <Link href="/phuket-luxury-villas/" className="rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">
                {isNl ? '🏝️ Vergelijk alle 8 luxe villa-resorts' : '🏝️ Compare all 8 luxury villa resorts'}
              </Link>
              <Link href="/private-pool-villa-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">
                {isNl ? '🏊 Private pool villa-gids' : '🏊 Private pool villa guide'}
              </Link>
              {/* Cross-cluster */}
              <Link href="/best-hotels/phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">
                {isNl ? '🏨 Beste hotels in Phuket' : '🏨 Best hotels in Phuket'}
              </Link>
              <Link href="/yacht-charter-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">
                {isNl ? '⛵ Yacht charter Phuket' : '⛵ Yacht charter Phuket'}
              </Link>
              <Link href="/flights-to-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">
                {isNl ? '✈️ Vluchten naar Phuket' : '✈️ Flights to Phuket'}
              </Link>
              <Link href="/car-rental-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">
                {isNl ? '🚗 Auto huren naar je villa' : '🚗 Rent a car to your villa'}
              </Link>
              <Link href="/city/phuket/" className="rounded-full bg-white text-gray-900 border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50">
                {isNl ? '📖 Phuket reisgids' : '📖 Phuket travel guide'}
              </Link>
              <a href={withSubId(KLOOK_GENERIC, placementSubId('mesh-klook'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">
                {isNl ? '🎟️ Phuket activiteiten' : '🎟️ Phuket activities'}
              </a>
            </div>
          </section>

          {/* Methodology */}
          <section className="rounded-2xl bg-gray-50 border border-gray-200 p-6 text-sm text-gray-700">
            <h2 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? 'Hoe we vergeleken' : 'How we compared'}</h2>
            <p>{isNl ? 'Tarieven en villa-specs geverifieerd in mei 2026 op Trip.com, Booking.com en de officiële website van elke resort. Privacy- en oceanfront-criteria gevalideerd via floorplans en recente Tripadvisor-foto\'s. We verdienen commissie op boekingen via genoemde platforms — dit verandert niets aan de prijs of welke resorts we noemen.' : "Rates and villa specs verified May 2026 on Trip.com, Booking.com and each resort's official website. Privacy and oceanfront criteria validated via floorplans and recent Tripadvisor photos. We earn a commission on bookings through the listed platforms — this never changes the price you pay or which resorts we cover."}</p>
          </section>
        </main>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const file = path.join(process.cwd(), 'data', 'pseo', 'villas', 'phuket-spokes.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const paths = (data.spokes as SpokeMeta[]).map(s => ({ params: { spoke: s.slug } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.spoke as SpokeSlug;
  if (!slug) return { notFound: true, revalidate: 60 };

  const partnersFile = path.join(process.cwd(), 'data', 'pseo', 'villas', 'phuket-partners.json');
  const spokesFile = path.join(process.cwd(), 'data', 'pseo', 'villas', 'phuket-spokes.json');
  const partnersData = JSON.parse(fs.readFileSync(partnersFile, 'utf8'));
  const spokesData = JSON.parse(fs.readFileSync(spokesFile, 'utf8'));

  const partners: Partners = partnersData.partners;
  const allSpokes: SpokeMeta[] = spokesData.spokes;
  const me = allSpokes.find(s => s.slug === slug);
  if (!me) return { notFound: true, revalidate: 60 };

  const primaryUrl = partners[me.primaryPartnerKey].partnerUrl;
  const secondaryUrl = partners[me.secondaryPartnerKey].partnerUrl;

  const siblings: SpokeSlug[] = allSpokes.filter(s => s.slug !== slug).map(s => s.slug);

  return {
    props: {
      spoke: slug,
      primaryUrl,
      secondaryUrl,
      partners,
      siblings,
      lastUpdated: spokesData.lastUpdated,
    },
    revalidate: 604800,
  };
};
