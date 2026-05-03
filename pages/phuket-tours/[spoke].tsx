import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import { withSubId, KLOOK_GENERIC, GYG_GENERIC, VIATOR_GENERIC } from '../../lib/affiliates';
import { useSubId } from '../../lib/useSubId';
import phiPhiContentData from '../../data/pseo/tours/phi-phi-content.json';

interface PartnerEntry { partnerUrl: string; label?: string }
interface Partners { [key: string]: PartnerEntry }

type LegacySlug = 'big-buddha' | 'elephant-sanctuary' | 'cooking-class' | 'snorkeling' | 'old-town';
type PhiPhiSlug = 'phi-phi-day-trip' | 'maya-bay' | 'phi-phi-snorkeling' | 'phi-phi-sunset' | 'phi-phi-speedboat' | 'khai-islands' | 'bamboo-island';
type SpokeSlug = LegacySlug | PhiPhiSlug;

// Data-driven content for the 7 Phi Phi cluster spokes (loaded from JSON).
// Existing 5 legacy spokes (big-buddha, etc.) keep their hardcoded if-else
// blocks below for now — refactor pending.
interface PhiPhiSpokeContent {
  labelEn: string; labelNl: string;
  seoTitle: string; seoTitleNl: string;
  h1En: string; h1Nl: string;
  descEn: string; descNl: string;
  kicker: string; kickerNl: string;
  heroIntroEn: string; heroIntroNl: string;
  heroStats: Array<{ label: string; labelNl: string; value: string; valueNl: string }>;
  tableRows: Array<{ label: string; labelNl: string; spec: string; specNl: string; price: string; best: string; bestNl: string }>;
  sections: Array<{ title: string; titleNl: string; body: string; bodyNl: string }>;
  tips: Array<{ strong: string; strongNl: string; body: string; bodyNl: string }>;
  faqEn: Array<{ q: string; a: string }>;
  faqNl: Array<{ q: string; a: string }>;
}
const PHI_PHI_CONTENT = phiPhiContentData as Record<PhiPhiSlug, PhiPhiSpokeContent>;
const PHI_PHI_SLUGS: ReadonlySet<PhiPhiSlug> = new Set(Object.keys(PHI_PHI_CONTENT) as PhiPhiSlug[]);
function isPhiPhi(slug: SpokeSlug): slug is PhiPhiSlug {
  return PHI_PHI_SLUGS.has(slug as PhiPhiSlug);
}

interface SpokeMeta {
  slug: SpokeSlug;
  primaryPartnerKey: string;
  secondaryPartnerKey: string;
  tertiaryPartnerKey: string;
}

interface Props {
  spoke: SpokeSlug;
  primaryUrl: string;
  secondaryUrl: string;
  tertiaryUrl: string;
  siblings: SpokeSlug[];
  lastUpdated: string;
}

const SPOKE_LABELS: Record<SpokeSlug, { en: string; nl: string }> = {
  'big-buddha':         { en: 'Big Buddha tour',          nl: 'Big Buddha tour' },
  'elephant-sanctuary': { en: 'Elephant sanctuary',       nl: 'Olifantenopvang' },
  'cooking-class':      { en: 'Cooking class',            nl: 'Kookcursus' },
  'snorkeling':         { en: 'Snorkeling tours',         nl: 'Snorkel-dagtochten' },
  'old-town':           { en: 'Old Town walking tour',    nl: 'Old Town wandeltour' },
  'phi-phi-day-trip':   { en: 'Phi Phi day trip',         nl: 'Phi Phi dagtocht' },
  'maya-bay':           { en: 'Maya Bay',                 nl: 'Maya Bay' },
  'phi-phi-snorkeling': { en: 'Phi Phi snorkeling',       nl: 'Phi Phi snorkelen' },
  'phi-phi-sunset':     { en: 'Phi Phi sunset',           nl: 'Phi Phi zonsondergang' },
  'phi-phi-speedboat':  { en: 'Phi Phi speedboat',        nl: 'Phi Phi speedboot' },
  'khai-islands':       { en: 'Khai Islands',             nl: 'Khai-eilanden' },
  'bamboo-island':      { en: 'Bamboo Island',            nl: 'Bamboo Island' },
};

export default function PhuketToursSpokePage({ spoke, primaryUrl, secondaryUrl, tertiaryUrl, siblings, lastUpdated }: Props) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const subId = useSubId();
  const place = (placement: string) => `${subId}-pseo-phuket-tours-${spoke}-${placement}`;

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: isNl ? 'Phuket tours' : 'Phuket Tours', href: '/phuket-tours/' },
    { name: isNl ? SPOKE_LABELS[spoke].nl : SPOKE_LABELS[spoke].en, href: `/phuket-tours/${spoke}/` },
  ];

  // ---------- TITLES + DESCRIPTIONS (per SEO playbook) ----------
  // Title: keyword front, <60, modifier (year + count/promise)
  // H1: different word order from title, includes secondary keyword
  // Meta desc: <155, question hook, keyword + variation

  let seoTitle = ''; let seoTitleNl = '';
  let h1En = ''; let h1Nl = '';
  let descEn = ''; let descNl = '';
  let kicker = ''; let kickerNl = '';
  let heroIntroEn = ''; let heroIntroNl = '';

  if (isPhiPhi(spoke)) {
    const c = PHI_PHI_CONTENT[spoke];
    seoTitle = c.seoTitle;
    seoTitleNl = c.seoTitleNl;
    h1En = c.h1En;
    h1Nl = c.h1Nl;
    descEn = c.descEn;
    descNl = c.descNl;
    kicker = c.kicker;
    kickerNl = c.kickerNl;
    heroIntroEn = c.heroIntroEn;
    heroIntroNl = c.heroIntroNl;
  } else if (spoke === 'big-buddha') {
    seoTitle =   'Phuket Big Buddha Tour (2026): Half-Day Picks';        // 47
    seoTitleNl = 'Phuket Big Buddha Tour (2026): Halve Dag Tips';        // 45
    h1En = 'Big Buddha Tour Phuket: Half-Day Temples & Viewpoints';
    h1Nl = 'Big Buddha tour Phuket: halve dag tempels + uitzichtpunten';
    descEn = 'Want a Phuket Big Buddha tour worth the half-day? Compare $25–60 minibus tours covering Wat Chalong, Karon viewpoint + dress code, hours and routes.'.slice(0, 155);
    descNl = 'Op zoek naar een Phuket Big Buddha tour die de halve dag waard is? Vergelijk $25–60 minibus-tours met Wat Chalong, Karon viewpoint + dresscode.'.slice(0, 155);
    kicker = 'Big Buddha + temples';
    kickerNl = 'Big Buddha + tempels';
    heroIntroEn = 'The 45m white-marble Big Buddha sits 400m above southern Phuket — visible from Patong, Karon and the highway. A typical half-day tour pairs it with Wat Chalong (the island\'s main temple), Karon or Promthep Cape viewpoint and sometimes Wat Phra Thong. $25–60 pp shared, $100–180 private. Here\'s what each tier covers, the dress code, and which operators show up well across Klook + GYG + Viator.';
    heroIntroNl = 'De 45m witte marmeren Big Buddha torent 400m boven zuid-Phuket — zichtbaar vanaf Patong, Karon en de hoofdweg. Een typische halve-dag-tour combineert hem met Wat Chalong (hoofdtempel van het eiland), Karon of Promthep Cape uitzichtpunt en soms Wat Phra Thong. $25–60 pp gedeeld, $100–180 privé. Hier vind je wat elke tier dekt, de dresscode, en welke operators sterk presteren op Klook + GYG + Viator.';
  } else if (spoke === 'elephant-sanctuary') {
    seoTitle =   'Phuket Elephant Sanctuary Tour (2026): Ethical Picks';  // 53
    seoTitleNl = 'Phuket Olifantenopvang Tour (2026): Ethische Keuze';    // 51
    h1En = 'Phuket Elephant Sanctuary: Which Are Actually Ethical (No Riding)';
    h1Nl = 'Phuket olifantenopvang: welke écht ethisch zijn (geen rijden)';
    descEn = 'Looking for an ethical Phuket elephant sanctuary tour? Compare 4 no-riding-no-shows centres — $80–120 pp, half-day vs full-day, vetted by welfare standards.'.slice(0, 155);
    descNl = 'Op zoek naar ethische olifantenopvang in Phuket? Vergelijk 4 no-riding centra — $80–120 pp, halve vs hele dag, gevalideerd op welzijnsnormen.'.slice(0, 155);
    kicker = 'Ethical sanctuary tour';
    kickerNl = 'Ethische opvang-tour';
    heroIntroEn = "Phuket has roughly 30 places that call themselves \"elephant sanctuaries\" — most are repackaged trekking camps. Genuinely ethical ones share four traits: no riding, no shows, small herds (under 12 elephants), feeding + observing only. $80–120 pp for a half-day, $130–180 for full-day with vegetarian Thai lunch. We focus on Phuket-only here — for nationwide alternatives (Chiang Mai, Kanchanaburi etc.) see our Thailand-wide elephant sanctuaries guide.";
    heroIntroNl = 'Phuket heeft zo\'n 30 plekken die zich "olifantenopvang" noemen — de meeste zijn omgedoopte trekking-camps. Écht ethische delen vier kenmerken: geen rijden, geen shows, kleine kuddes (<12 olifanten), alleen voeren + observeren. $80–120 pp voor halve dag, $130–180 hele dag met vegetarische Thaise lunch. We focussen hier alleen op Phuket — voor landelijke alternatieven (Chiang Mai, Kanchanaburi) zie onze Thailand-brede olifantengids.';
  } else if (spoke === 'cooking-class') {
    seoTitle =   'Phuket Cooking Class (2026): 8 Best + Market Tour';     // 51
    seoTitleNl = 'Phuket Kookcursus (2026): 8 Beste + Markttour';         // 47
    h1En = 'Phuket Cooking Class: Market Tour, 4-Dish Menu + 2026 Picks';
    h1Nl = 'Phuket kookcursus: markttour, 4-gerechten menu + 2026 keuzes';
    descEn = 'Want a Phuket cooking class with a real market visit? Compare 8 schools — $40–80 pp, 3–4 hours, market + 4 dishes, vegan options + transfer details.'.slice(0, 155);
    descNl = 'Op zoek naar een Phuket kookcursus met markt-bezoek? Vergelijk 8 scholen — $40–80 pp, 3–4 uur, markt + 4 gerechten, veganistisch + transfer.'.slice(0, 155);
    kicker = 'Thai cooking class';
    kickerNl = 'Thaise kookcursus';
    heroIntroEn = "Phuket\'s Thai cooking classes are the indoor activity locals quietly send their friends to: 3–4 hours, hotel pickup, optional fresh-market visit, then 4 dishes you actually cook (not watch). $40–80 pp at the best schools — Pum Thai, Phuket Thai Cookery School, Blue Elephant. Here\'s how to pick the right format (market vs no-market), what each school does well, and why this often beats a beach tour for $50. For nationwide alternatives see our Thailand-wide cooking classes guide.";
    heroIntroNl = "Phuket's Thaise kookcursussen zijn de indoor-activiteit waar locals hun vrienden in stilte naartoe sturen: 3–4 uur, hoteltransfer, optioneel marktbezoek, dan 4 gerechten die je écht zelf kookt. $40–80 pp bij de beste scholen — Pum Thai, Phuket Thai Cookery School, Blue Elephant. Hier vind je hoe je het juiste format kiest (markt vs geen-markt), wat elke school goed doet, en waarom dit vaak beter is dan een strand-tour voor $50. Voor landelijke alternatieven: onze Thailand-brede kookcursusgids.";
  } else if (spoke === 'snorkeling') {
    seoTitle =   'Phuket Snorkeling Tour (2026): Coral, Racha, Phi Phi';   // 53
    seoTitleNl = 'Phuket Snorkel Dagtocht (2026): Coral, Racha, Phi Phi';  // 53
    h1En = 'Phuket Snorkeling Day Trips: Coral vs Racha vs Phi Phi Compared';
    h1Nl = 'Phuket snorkel-dagtochten: Coral vs Racha vs Phi Phi vergeleken';
    descEn = 'Which Phuket snorkeling tour gives the clearest water? Compare Coral, Racha + Phi Phi day trips — $60–110 pp, visibility ratings, gear + best months.'.slice(0, 155);
    descNl = 'Welke Phuket snorkel-tour heeft het helderste water? Vergelijk Coral, Racha + Phi Phi dagtochten — $60–110 pp, zicht, gear + beste maanden.'.slice(0, 155);
    kicker = 'Snorkeling day trip';
    kickerNl = 'Snorkel-dagtocht';
    heroIntroEn = 'Three Phuket snorkeling day trips dominate the market: Coral Island (25 min, family-friendly, average visibility), Racha Yai/Noi (45 min, the best visibility — 12–15m clear water on a calm day) and Phi Phi snorkel stops (combined with the islands tour). $60–110 pp shared with gear + lunch. Best months for visibility: November, February, March. For Thailand-wide alternatives see our diving + snorkeling guide.';
    heroIntroNl = 'Drie Phuket snorkel-dagtochten domineren: Coral Island (25 min, familievriendelijk, gemiddeld zicht), Racha Yai/Noi (45 min, beste zicht — 12–15m helder water op rustige dag) en Phi Phi snorkel-stops (gecombineerd met de eilanden-tour). $60–110 pp gedeeld met gear + lunch. Beste maanden voor zicht: november, februari, maart. Voor Thailand-brede alternatieven: onze duik- en snorkelgids.';
  } else { // old-town
    seoTitle =   'Phuket Old Town Walking Tour (2026): Sino Heritage';     // 51
    seoTitleNl = 'Phuket Old Town Wandeltour (2026): Sino-Cultuur';        // 49
    h1En = 'Phuket Old Town Walking Tour: Sino-Portuguese Streets + Cafés';
    h1Nl = 'Phuket Old Town wandeltour: Sino-Portugese straten + cafés';
    descEn = 'Want a Phuket Old Town walking tour that does more than photos? Compare 5 routes — $20–40 pp, 2–3 hours, food stops + Sino-Portuguese architecture.'.slice(0, 155);
    descNl = 'Een Phuket Old Town wandeltour die meer doet dan foto\'s maken? Vergelijk 5 routes — $20–40 pp, 2–3 uur, food-stops + Sino-Portugese architectuur.'.slice(0, 155);
    kicker = 'Old Town heritage walk';
    kickerNl = 'Old Town erfgoed-wandeling';
    heroIntroEn = 'Phuket Old Town\'s 200-year Sino-Portuguese shophouses are the cheapest cultural day on the island: 2–3 hours, $20–40 pp guided. Routes cover Thalang Road, Soi Romanee, Krabi Road murals, the Chinese shrines (Sang Tham, Put Jaw) and 1–2 food stops (kanom jin, oyster omelette, Phuket-style coffee). Best in late afternoon (16:00) when the heat eases and Sunday Market is starting. Pair with Big Buddha for a full-day culture circuit.';
    heroIntroNl = 'Phuket Old Town\'s 200 jaar oude Sino-Portugese winkelhuizen zijn de goedkoopste culturele dag op het eiland: 2–3 uur, $20–40 pp begeleid. Routes dekken Thalang Road, Soi Romanee, Krabi Road murals, de Chinese tempels (Sang Tham, Put Jaw) en 1–2 food-stops (kanom jin, oester-omelet, Phuket-koffie). Beste tijd: late namiddag (16:00), de hitte zakt en de Sunday Market start. Combineer met Big Buddha voor een volledige cultuur-dag.';
  }

  const titleFinal = isNl ? seoTitleNl : seoTitle;
  const descFinal = isNl ? descNl : descEn;
  const h1Final = isNl ? h1Nl : h1En;
  const kickerFinal = isNl ? kickerNl : kicker;
  const heroIntro = isNl ? heroIntroNl : heroIntroEn;

  const canonical = `https://go2-thailand.com${isNl ? '/nl' : ''}/phuket-tours/${spoke}/`;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, i) => ({
      '@type': 'ListItem', position: i + 1, name: b.name,
      item: `https://go2-thailand.com${isNl ? '/nl' : ''}${b.href}`,
    })),
  };

  // ---------- HERO STATS ----------
  const heroStats = (() => {
    if (isPhiPhi(spoke)) {
      return PHI_PHI_CONTENT[spoke].heroStats.map(s => ({
        label: isNl ? s.labelNl : s.label,
        value: isNl ? s.valueNl : s.value,
      }));
    }
    if (spoke === 'big-buddha') return [
      { label: isNl ? 'Duur' : 'Duration', value: isNl ? '4–5 uur' : '4–5 hours' },
      { label: isNl ? 'Prijs p.p.' : 'Price pp', value: '$25–60' },
      { label: isNl ? 'Beste tijd' : 'Best time', value: isNl ? '07:00 of 15:00' : '07:00 or 15:00' },
      { label: isNl ? 'Dresscode' : 'Dress code', value: isNl ? 'Schouders + knieën' : 'Shoulders + knees' },
    ];
    if (spoke === 'elephant-sanctuary') return [
      { label: isNl ? 'Duur' : 'Duration', value: isNl ? '4–8 uur' : '4–8 hours' },
      { label: isNl ? 'Prijs p.p.' : 'Price pp', value: '$80–180' },
      { label: isNl ? 'Beste maanden' : 'Best months', value: 'Nov–Apr' },
      { label: isNl ? 'Geen rijden' : 'No-ride', value: isNl ? 'Vereist' : 'Required' },
    ];
    if (spoke === 'cooking-class') return [
      { label: isNl ? 'Duur' : 'Duration', value: isNl ? '3–4 uur' : '3–4 hours' },
      { label: isNl ? 'Prijs p.p.' : 'Price pp', value: '$40–80' },
      { label: isNl ? 'Gerechten' : 'Dishes', value: '4' },
      { label: isNl ? 'Markt' : 'Market', value: isNl ? 'Optioneel' : 'Optional' },
    ];
    if (spoke === 'snorkeling') return [
      { label: isNl ? 'Duur' : 'Duration', value: isNl ? '6–8 uur' : '6–8 hours' },
      { label: isNl ? 'Prijs p.p.' : 'Price pp', value: '$60–110' },
      { label: isNl ? 'Beste zicht' : 'Best visibility', value: '12–15m' },
      { label: isNl ? 'Beste maanden' : 'Best months', value: 'Nov, Feb–Mar' },
    ];
    return [
      { label: isNl ? 'Duur' : 'Duration', value: isNl ? '2–3 uur' : '2–3 hours' },
      { label: isNl ? 'Prijs p.p.' : 'Price pp', value: '$20–40' },
      { label: isNl ? 'Beste tijd' : 'Best time', value: isNl ? '16:00' : '16:00' },
      { label: isNl ? 'Highlight' : 'Highlight', value: isNl ? 'Soi Romanee' : 'Soi Romanee' },
    ];
  })();

  // ---------- COMPARISON TABLE ROWS ----------
  const tableRows = (() => {
    if (isPhiPhi(spoke)) {
      return PHI_PHI_CONTENT[spoke].tableRows.map(r => ({
        label: isNl ? r.labelNl : r.label,
        spec: isNl ? r.specNl : r.spec,
        price: r.price,
        best: isNl ? r.bestNl : r.best,
      }));
    }
    if (spoke === 'big-buddha') return [
      { label: isNl ? 'Half-day Big Buddha + Wat Chalong' : 'Half-day Big Buddha + Wat Chalong', spec: isNl ? 'Minibus, 4 stops' : 'Minibus, 4 stops', price: '$25–45', best: isNl ? 'Eerste reis, korte tijd' : 'First-timers, short on time' },
      { label: isNl ? 'Half-day + Karon Viewpoint' : 'Half-day + Karon Viewpoint', spec: isNl ? 'Minibus, 5 stops' : 'Minibus, 5 stops', price: '$35–60', best: isNl ? 'Foto-fanaten' : 'Photo enthusiasts' },
      { label: isNl ? 'Privé tuktuk + tempelroute' : 'Private tuk-tuk + temple route', spec: isNl ? '2–4 personen, 5 uur' : '2–4 people, 5 hours', price: '$100–180', best: isNl ? 'Stellen, eigen tempo' : 'Couples, own pace' },
      { label: isNl ? 'Big Buddha + Phuket Old Town combo' : 'Big Buddha + Old Town combo', spec: isNl ? 'Full-day, 7–8 uur' : 'Full-day, 7–8 hours', price: '$60–110', best: isNl ? 'Cultuur-dag' : 'Culture-only day' },
    ];
    if (spoke === 'elephant-sanctuary') return [
      { label: 'Phuket Elephant Sanctuary (Paklok)', spec: isNl ? 'Half-day, geen rijden' : 'Half-day, no riding', price: '$95–125', best: isNl ? 'Strikt non-profit, ouder olifanten' : 'Strict non-profit, retired elephants' },
      { label: 'Elephant Jungle Sanctuary', spec: isNl ? 'Half + full-day, geen rijden' : 'Half + full-day, no riding', price: '$80–135', best: isNl ? 'Familievriendelijk, kinderen' : 'Family-friendly, kids' },
      { label: 'Green Elephant Sanctuary Park', spec: isNl ? 'Half-day, geen rijden' : 'Half-day, no riding', price: '$70–110', best: isNl ? 'Luxe-touch, transfers' : 'Luxe touch, transfers' },
      { label: 'Phuket Elephant Care', spec: isNl ? 'Half-day, klein, intiem' : 'Half-day, small, intimate', price: '$70–100', best: isNl ? 'Kleine groep (<12 gasten)' : 'Small groups (<12 guests)' },
    ];
    if (spoke === 'cooking-class') return [
      { label: 'Pum Thai Cooking School (Patong)', spec: isNl ? '3 uur, 5 gerechten, geen markt' : '3 hours, 5 dishes, no market', price: '$45–65', best: isNl ? 'Centraal, beginners' : 'Central, beginners' },
      { label: 'Phuket Thai Cookery School (Cape Panwa)', spec: isNl ? '4 uur, 4 gerechten + markt' : '4 hours, 4 dishes + market', price: '$55–80', best: isNl ? 'Met markt, sterkste recipes' : 'With market, strongest recipes' },
      { label: 'Blue Elephant (Phuket Town)', spec: isNl ? 'Half-day, royale setting' : 'Half-day, regal setting', price: '$70–110', best: isNl ? 'Premium, in een herenhuis' : 'Premium, in a mansion' },
      { label: isNl ? 'Privé bij chef thuis (diverse)' : 'Private in-home with chef (various)', spec: isNl ? '4 uur, 5 gerechten + markt' : '4 hours, 5 dishes + market', price: '$80–140', best: isNl ? 'Stellen, dieet-wensen' : 'Couples, dietary needs' },
    ];
    if (spoke === 'snorkeling') return [
      { label: 'Coral Island (Koh Hae)', spec: isNl ? '25 min boot, 6 uur trip' : '25 min boat, 6-hour trip', price: '$60–80', best: isNl ? 'Families, eerste keer' : 'Families, first-timers' },
      { label: 'Racha Yai + Racha Noi', spec: isNl ? '45 min boot, 7 uur trip' : '45 min boat, 7-hour trip', price: '$70–110', best: isNl ? 'Beste zicht (12–15m)' : 'Best visibility (12–15m)' },
      { label: isNl ? 'Phi Phi snorkel-stops (combo)' : 'Phi Phi snorkel stops (combo)', spec: isNl ? '8 uur, 3–4 stops' : '8 hours, 3–4 stops', price: '$80–150', best: isNl ? 'Iconische plekken + snorkel' : 'Iconic spots + snorkel' },
      { label: 'Khai Islands (Khai Nai/Nok)', spec: isNl ? '30 min boot, halve dag' : '30 min boat, half-day', price: '$50–75', best: isNl ? 'Goedkoop, korte trip' : 'Cheap, short trip' },
    ];
    return [
      { label: isNl ? 'Klassieke Sino-Portugese walk' : 'Classic Sino-Portuguese walk', spec: isNl ? '2 uur, geen food' : '2 hours, no food', price: '$20–30', best: isNl ? 'Architectuur-fans' : 'Architecture fans' },
      { label: isNl ? 'Old Town + street-food walk' : 'Old Town + street-food walk', spec: isNl ? '3 uur, 4 food-stops' : '3 hours, 4 food stops', price: '$30–45', best: isNl ? 'Foodies, eerste reis' : 'Foodies, first-timers' },
      { label: isNl ? 'Privé heritage tour' : 'Private heritage tour', spec: isNl ? '2–3 uur, 1–4 personen' : '2–3 hours, 1–4 guests', price: '$60–120', best: isNl ? 'Stellen, eigen tempo' : 'Couples, own pace' },
      { label: isNl ? 'Sunday Market wandeling (zelfgeleid)' : 'Sunday Market self-walk', spec: isNl ? 'Gratis, 2 uur, alleen zo' : 'Free, 2 hours, Sundays only', price: '$0', best: isNl ? 'Avond, lokaal sfeertje' : 'Evening, local vibe' },
    ];
  })();

  // ---------- DETAILED SECTION CARDS ----------
  const sections = (() => {
    if (isPhiPhi(spoke)) {
      return PHI_PHI_CONTENT[spoke].sections.map(s => ({
        title: isNl ? s.titleNl : s.title,
        body: isNl ? s.bodyNl : s.body,
      }));
    }
    if (spoke === 'big-buddha') {
      return [
        {
          title: isNl ? 'Wat zit in een typische Big Buddha-tour?' : 'What\'s in a typical Big Buddha tour?',
          body: isNl
            ? 'Hoteltransfer (airconditioned minibus, 8–14 personen), Engelstalige gids, 4 stops in 4–5 uur: 1) Big Buddha (45 min — beklim of skylift naar de top, panorama-foto\'s, sarongs gehuurd voor $1 als je shorts draagt). 2) Wat Chalong (30 min — eilands hoofdtempel, 3 verdiepingen, gouden chedi, vrije gift gewaardeerd). 3) Karon of Promthep Cape viewpoint (20 min — beste foto-locatie). 4) Soms Wat Phra Thong (de "halve-Boeddha onder de grond") of een lokale markt. Geen lunch inbegrepen — vraag of er een stop is.'
            : 'Hotel transfer (air-conditioned minibus, 8–14 people), English-speaking guide, 4 stops in 4–5 hours: 1) Big Buddha (45 min — climb or skylift to the top, panorama photos, sarongs rented for $1 if you\'re in shorts). 2) Wat Chalong (30 min — island\'s main temple, 3 floors, golden chedi, donations appreciated). 3) Karon or Promthep Cape viewpoint (20 min — best photo location). 4) Sometimes Wat Phra Thong (the "half-buried Buddha") or a local market. Lunch not included — ask if there\'s a stop.',
        },
        {
          title: isNl ? 'Dresscode + temperatuur' : 'Dress code + temperature',
          body: isNl
            ? 'Big Buddha en Wat Chalong vereisen bedekte schouders + knieën — geen tanktops, geen korte broek boven de knie. Beide tempels verhuren sarongs voor $1 maar het is sneller om vooraf passende kleding aan te trekken. Schoenen uit bij entree van Wat Chalong. Op het top-platform van Big Buddha is geen schaduw — neem zonnebrandcrème en water mee. Beste startuur: 07:00–08:00 (rustig, koel) of 15:00–16:00 (zonsondergangsfoto\'s).'
            : 'Big Buddha and Wat Chalong both require covered shoulders + knees — no tank tops, no shorts above the knee. Both temples rent sarongs for $1 but it\'s faster to dress accordingly beforehand. Shoes off at Wat Chalong entry. The Big Buddha top platform has no shade — bring sunscreen and water. Best start time: 07:00–08:00 (quiet, cool) or 15:00–16:00 (sunset shots).',
        },
        {
          title: isNl ? 'Klook vs GetYourGuide vs Viator: wat kies je?' : 'Klook vs GetYourGuide vs Viator: which to pick?',
          body: isNl
            ? 'Klook: meeste opties, scherpste prijzen voor het Aziatische publiek, snelle bevestiging. GetYourGuide: betere reviews-diepte, soepelere annulering (24u gratis), sterkere Engelstalige gidsen. Viator: meer kleine-groep + privé-opties, hogere prijzen maar betere kwaliteit-controle. Voor halve-dag Big Buddha: Klook of GYG. Voor privé tuktuk-route met eigen tempo: Viator. Vergelijk altijd, prijsverschil 10–25%.'
            : 'Klook: most options, sharpest pricing for Asian-market travelers, fast confirmation. GetYourGuide: better review depth, looser cancellation (24h free), stronger English-speaking guides. Viator: more small-group + private options, higher pricing but tighter quality control. For half-day Big Buddha: Klook or GYG. For private tuk-tuk on your own pace: Viator. Always compare — price gap 10–25%.',
        },
      ];
    }
    if (spoke === 'elephant-sanctuary') {
      return [
        {
          title: isNl ? 'De vier ethische voorwaarden' : 'The four ethical conditions',
          body: isNl
            ? '1) Geen rijden — olifanten\'s ruggengraten zijn niet gebouwd voor mensen, riding-camps zijn standaard misbruik. 2) Geen shows — schilderen, voetbal, "tricks" zijn aangeleerd via punishment. 3) Kleine kuddes (<12 olifanten) — meer is industrieel. 4) Alleen voeren + observeren + (eventueel) baden in een rivier. Cross-check via World Animal Protection en Asian Captive Elephant Working Group voor 2026-validatie. Phuket Elephant Sanctuary, Elephant Jungle Sanctuary en Phuket Elephant Care voldoen aan alle vier.'
            : '1) No riding — elephants\' spines aren\'t built for humans, riding camps are baseline abuse. 2) No shows — painting, football, "tricks" are trained via punishment. 3) Small herds (<12 elephants) — more is industrial. 4) Feeding + observing + (optionally) river bathing only. Cross-check World Animal Protection and Asian Captive Elephant Working Group for 2026 validation. Phuket Elephant Sanctuary, Elephant Jungle Sanctuary, and Phuket Elephant Care meet all four.',
        },
        {
          title: isNl ? 'Wat doe je tijdens een typische tour?' : 'What you actually do on a typical tour',
          body: isNl
            ? 'Half-day (4–5 uur, $80–125): hoteltransfer, briefing, voer-sessie (bananen + suikerriet), wandelen met de olifanten naar een rivier, modderbad of douche samen, vegetarische Thaise lunch. Full-day ($130–180): hetzelfde + extra wandeling door het regenwoud, en bij sommige opvang-centra lichte care-werk (jonge olifanten leren te lopen, oude verzorgen). Geen rijden, geen aanraking-zonder-toestemming — als de olifant zich afkeert, respect.'
            : 'Half-day (4–5 hours, $80–125): hotel transfer, briefing, feeding session (bananas + sugarcane), walk with the elephants to a river, mud bath or rinse together, vegetarian Thai lunch. Full-day ($130–180): same plus extended rainforest walk, and at some centres light care work (helping young elephants learn to walk, tending older ones). No riding, no forced touching — if the elephant turns away, respect that.',
        },
        {
          title: isNl ? 'Wanneer is de Thailand-brede gids beter?' : 'When the Thailand-wide guide is better',
          body: isNl
            ? 'Phuket\'s opvang-centra zijn solide voor wie al op het eiland is — maar de strengste, langst-bestaande non-profit elefantencentra zitten in Chiang Mai (Elephant Nature Park), Surin en Kanchanaburi. Als je een Thailand-trip plant: vergelijk je opties via onze Thailand-brede olifantenopvang-gids. Als je alleen Phuket doet: de drie hier-genoemde voldoen.'
            : 'Phuket\'s sanctuaries are solid for travelers already on the island — but the strictest, longest-standing non-profit elephant centres are in Chiang Mai (Elephant Nature Park), Surin and Kanchanaburi. If you\'re planning a wider Thailand trip, compare options via our Thailand-wide elephant sanctuaries guide. If you\'re Phuket-only, the three named above will do.',
        },
      ];
    }
    if (spoke === 'cooking-class') {
      return [
        {
          title: isNl ? 'Markttour vs zonder-markt: wat past bij jou?' : 'Market tour vs no-market: which fits you?',
          body: isNl
            ? 'Met markttour (3,5–4 uur, $55–80): start om 09:00 op een verse markt (Banzaan, Naka, Talad Sod), gids legt 30 ingrediënten uit, dan terug naar de school. Goed voor eerste-reis travelers die nog geen markt-ervaring hebben. Zonder markttour (3 uur, $40–55): direct in de school, meer tijd aan de pannen, makkelijker met kinderen. Bij beide: 4 gerechten (Tom Yum, Pad Thai, curry, dessert) die je zelf kookt en daarna opeet.'
            : 'With market tour (3.5–4 hours, $55–80): start 09:00 at a fresh market (Banzaan, Naka, Talad Sod), guide explains 30 ingredients, then back to the school. Good for first-time travelers without market experience. No-market (3 hours, $40–55): straight to the school, more time at the pans, easier with kids. Either way: 4 dishes (Tom Yum, Pad Thai, curry, dessert) you actually cook and then eat.',
        },
        {
          title: isNl ? 'De 4 beste scholen + waarom' : 'The 4 best schools + why',
          body: isNl
            ? 'Pum Thai (Patong, sinds 1997): centraal, vrolijke kleinschalige sfeer, 5-gerechten basis-menu, geen markt — perfect voor beginners. Phuket Thai Cookery School (Cape Panwa): authentiek, marktbezoek inclusief, beste recipes om mee naar huis te nemen. Blue Elephant (Phuket Town): in een Sino-Portuguese herenhuis, premium ervaring, $70–110, eindigt met diner. In-home privé met chef ($80–140): beste voor stellen of dieet-wensen (vegan, gluten-vrij), volledig persoonlijk.'
            : 'Pum Thai (Patong, since 1997): central, cheerful small-group vibe, 5-dish basic menu, no market — perfect for beginners. Phuket Thai Cookery School (Cape Panwa): authentic, market tour included, best take-home recipes. Blue Elephant (Phuket Town): in a Sino-Portuguese mansion, premium experience, $70–110, ends with a sit-down dinner. In-home private with chef ($80–140): best for couples or dietary needs (vegan, gluten-free), fully bespoke.',
        },
        {
          title: isNl ? 'Cross-link: Thailand-brede kookcursus-gids' : 'Cross-link: Thailand-wide cooking class guide',
          body: isNl
            ? 'Reis je verder dan Phuket? Bangkok en Chiang Mai hebben sterkere kookscholen-scenes (Bangkok\'s wijk-niveau verschillen, Chiang Mai\'s "boerderij-naar-bord"-formats). Onze Thailand-brede kookcursus-gids vergelijkt 12+ scholen over 5 steden — voor Phuket-only blijft Pum/PTCS/Blue Elephant het kortste antwoord.'
            : 'Travelling beyond Phuket? Bangkok and Chiang Mai have stronger cooking-school scenes (Bangkok\'s neighborhood-level differences, Chiang Mai\'s "farm-to-table" formats). Our Thailand-wide cooking classes guide compares 12+ schools across 5 cities — for Phuket-only, Pum/PTCS/Blue Elephant remains the shortest answer.',
        },
      ];
    }
    if (spoke === 'snorkeling') {
      return [
        {
          title: isNl ? 'Coral, Racha of Phi Phi: kies op zicht' : 'Coral, Racha or Phi Phi: pick on visibility',
          body: isNl
            ? 'Coral Island (Koh Hae): 25 min vanuit Chalong, zicht 6–10m op een gemiddelde dag, ondiep (2–4m), sterke familie-keuze. Racha Yai/Noi: 45 min vanuit Chalong, zicht 12–15m, zachte koraal-tuinen, beste optie voor "ik wil écht vis zien". Phi Phi snorkel-stops (Loh Samah, Pileh, Maya): combineerbaar met Phi Phi-trip, zicht 8–12m, drukker. Khai Islands: cheap + dichtbij, maar koraal beschadigd, alleen voor kinderen die net leren snorkelen.'
            : 'Coral Island (Koh Hae): 25 min from Chalong, visibility 6–10m on an average day, shallow (2–4m), strong family pick. Racha Yai/Noi: 45 min from Chalong, visibility 12–15m, soft coral gardens, the choice if you want to actually see fish. Phi Phi snorkel stops (Loh Samah, Pileh, Maya): bundleable with Phi Phi tour, 8–12m visibility, more crowded. Khai Islands: cheap + close, but coral is damaged — only for kids learning to snorkel.',
        },
        {
          title: isNl ? 'Beste maanden + zee-condities' : 'Best months + sea conditions',
          body: isNl
            ? 'Beste zicht: november (post-moesson, kalm), februari, maart. Slechtste: late september (zuidwestmoesson piekt). Mei kan nog werken aan oostkust-stops. Zee-status check: als swell-buoy in Phuket >1,5m staat, snorkel niet — slecht zicht, gevaarlijk voor zwakke zwemmers. Operators annuleren bij rough sea + bieden gratis re-book.'
            : 'Best visibility: November (post-monsoon, calm), February, March. Worst: late September (south-west monsoon peaks). May can still work for east-coast stops. Sea-status check: if Phuket\'s swell buoy reads >1.5m, skip snorkeling — bad visibility, dangerous for weak swimmers. Operators cancel in rough sea + offer free re-booking.',
        },
        {
          title: isNl ? 'Cross-link: Thailand-brede duik + snorkel-gids' : 'Cross-link: Thailand-wide diving + snorkeling guide',
          body: isNl
            ? 'Phuket is een vertrekpunt voor de beste snorkel-locaties van Thailand: Similan-eilanden (alleen 15 okt–15 mei via liveaboard), Surin/Richelieu Rock (walvishaaien), Koh Tao (Golf van Thailand, andere kust). Onze Thailand-brede duik- en snorkel-gids vergelijkt alle locaties + boekstrategie. Voor een dagtocht vanuit Phuket: Racha Yai/Noi blijft de beste optie.'
            : 'Phuket is the launch point for Thailand\'s best snorkel spots: Similan Islands (only 15 Oct–15 May via liveaboard), Surin/Richelieu Rock (whale sharks), Koh Tao (Gulf side, different coast). Our Thailand-wide diving + snorkeling guide compares all spots + booking strategy. For a day trip from Phuket: Racha Yai/Noi remains the best option.',
        },
      ];
    }
    return [
      {
        title: isNl ? 'De Sino-Portuguese hoofdroute' : 'The Sino-Portuguese main route',
        body: isNl
          ? 'Start: Krabi Road (de murals — wandschilderingen vertellen het Phuket-erfgoed). Wandel naar Thalang Road (de iconische 2-verdiepingen-shophouses, sommige gerestaureerd, sommige rauw). Soi Romanee (smalste, kleurrijkste straat van het eiland — Instagrammable). Stop bij Sang Tham of Put Jaw shrines (Chinese tempels, gratis entree). Eindig op Yaowarat Road met een traditionele Phuket-koffie + kanom jin. Totale wandeling 1,5 uur zonder stops, 2,5 uur met food.'
          : 'Start: Krabi Road (the murals — wall paintings tell Phuket\'s heritage story). Walk to Thalang Road (the iconic 2-storey shophouses, some restored, some raw). Soi Romanee (the narrowest, most colourful lane on the island — Instagrammable). Stop at Sang Tham or Put Jaw shrines (Chinese temples, free entry). Finish on Yaowarat Road with a traditional Phuket coffee + kanom jin. Total walk 1.5 hours without stops, 2.5 hours with food.',
      },
      {
        title: isNl ? 'Begeleid vs zelfgeleid' : 'Guided vs self-walk',
        body: isNl
          ? 'Begeleid ($20–40 pp, 2–3 uur): krijg uitleg over Hokkien-tin-baronnen, Sino-Portuguese architectuur, en de 4 belangrijkste foodstops. Voor eerste-reis-bezoekers veel rijker dan zelf rondlopen. Zelfgeleid (gratis): print ons mini-routekaartje of volg de Krabi Road murals — werkt prima voor herhaalbezoekers. Beste tijd: late namiddag (16:00) — hitte zakt, dak-cafés openen, Sunday Market start om 17:00 (alleen zondags).'
          : 'Guided ($20–40 pp, 2–3 hours): get context on Hokkien tin barons, Sino-Portuguese architecture, and the 4 must-stop foodstops. Much richer than self-walking for first-time visitors. Self-walk (free): print our mini route map or follow the Krabi Road murals — works fine for repeat visitors. Best time: late afternoon (16:00) — heat eases, rooftop cafés open, Sunday Market starts at 17:00 (Sundays only).',
      },
      {
        title: isNl ? 'Combineer met Big Buddha = volle cultuur-dag' : 'Combine with Big Buddha = full culture day',
        body: isNl
          ? 'Old Town in de namiddag (16:00–18:30, late lunch op Yaowarat) + Big Buddha bij zonsondergang (17:30–19:00) is een sterke "geen-strand"-dag voor regen of een culture-break. $50–80 totaal als je tuktuk huurt of GrabTaxi gebruikt. Vermijd zondagavond als je geen drukte wilt — Sunday Market trekt 10.000+ bezoekers naar Thalang Road.'
          : 'Old Town in the afternoon (16:00–18:30, late lunch on Yaowarat) + Big Buddha at sunset (17:30–19:00) is a strong "no-beach" day for rain or a culture break. $50–80 total if you grab a tuk-tuk or GrabTaxi. Avoid Sunday evenings if you dislike crowds — Sunday Market draws 10,000+ visitors to Thalang Road.',
      },
    ];
  })();

  // ---------- TIPS ----------
  const tips = (() => {
    if (isPhiPhi(spoke)) {
      return PHI_PHI_CONTENT[spoke].tips.map(t => ({
        strong: isNl ? t.strongNl : t.strong,
        body: isNl ? t.bodyNl : t.body,
      }));
    }
    if (spoke === 'big-buddha') return [
      { strong: isNl ? 'Vroeg of laat (07:00 of 15:00)' : 'Early or late (07:00 or 15:00)', body: isNl ? '— vermijd 11:00–14:00 als de zon op het top-platform fel is en de meeste bus-tours arriveren.' : '— avoid 11:00–14:00 when the sun on the top platform is brutal and most bus tours arrive.' },
      { strong: isNl ? 'Sarong of long-pants meenemen' : 'Bring a sarong or long pants', body: isNl ? '— $1 sarong-huur op locatie, maar je eigen kleding bespaart 5 minuten en is comfortabeler.' : '— sarong rental at site costs $1, but your own clothing saves 5 minutes and is more comfortable.' },
      { strong: isNl ? 'Donatie bij Big Buddha is optioneel' : 'Donation at Big Buddha is optional', body: isNl ? '— niemand verplicht je. 100 baht ($3) is gangbaar als je een gouden tegel wilt graveren.' : '— nobody forces you. 100 baht ($3) is standard if you want to engrave a golden tile.' },
      { strong: isNl ? 'Wat Chalong: 3 verdiepingen beklimmen' : 'Wat Chalong: climb all 3 floors', body: isNl ? '— de top-verdieping heeft het beste uitzicht over de tempelgrond. De meeste tour-groepen blijven op de begane grond — overweeg solo even naar boven.' : '— top floor has the best view across the temple grounds. Most tour groups stay on ground level — consider going up solo.' },
      { strong: isNl ? 'Karon Viewpoint vs Promthep Cape' : 'Karon Viewpoint vs Promthep Cape', body: isNl ? '— Karon: panorama op 3 baaien (Patong, Karon, Kata). Promthep: zonsondergang op de zuidpunt. Tours kiezen meestal Karon vanwege de tijd.' : '— Karon: panorama of 3 bays (Patong, Karon, Kata). Promthep: sunset on the southernmost point. Tours usually pick Karon for time.' },
      { strong: isNl ? 'Kinderen <8: tuktuk-privétour beter' : 'Kids under 8: private tuk-tuk better', body: isNl ? '— dan kun je stops korter maken, eigen tempo aanhouden, en op zonsondergang inspelen.' : '— you can shorten stops, set your own pace, and chase the sunset.' },
    ];
    if (spoke === 'elephant-sanctuary') return [
      { strong: isNl ? 'Cross-check de naam' : 'Cross-check the name', body: isNl ? '— "sanctuary" is geen beschermd label. Google de naam + "riding" — als rij-foto\'s opduiken, niet boeken.' : '— "sanctuary" isn\'t a protected label. Google the name + "riding" — if riding photos appear, don\'t book.' },
      { strong: isNl ? 'Klein = beter (< 12 olifanten)' : 'Small = better (under 12 elephants)', body: isNl ? '— grote camps zijn industrieel, kleine zijn meestal echt-non-profit.' : '— big camps are industrial, small ones are usually genuinely non-profit.' },
      { strong: isNl ? 'Geen aanraking tegen olifant zin' : 'No touching against elephant\'s will', body: isNl ? '— als de olifant zich afkeert of zijn kop schudt, respect. Goede gidsen wijzen dit ook actief aan.' : '— if the elephant turns or shakes its head, back off. Good guides will actively point this out.' },
      { strong: isNl ? 'Vegetarische lunch is standaard' : 'Vegetarian lunch is standard', body: isNl ? '— ethische opvang-centra serveren geen vlees ter plekke uit principe.' : '— ethical sanctuaries serve no meat on principle.' },
      { strong: isNl ? 'Modderbad: optioneel' : 'Mud bath: optional', body: isNl ? '— sommigen vinden het ongemakkelijk. Niemand verplicht het.' : '— some find it uncomfortable. Nobody forces it.' },
      { strong: isNl ? 'Reserveer 3–5 dagen vooruit' : 'Book 3–5 days ahead', body: isNl ? '— hoogseizoen (dec–feb) gaat 1 week vooruit op slot. Laagseizoen 1–2 dagen werkt.' : '— high season (Dec–Feb) sells out 1 week out. Low season 1–2 days works.' },
      { strong: isNl ? 'Voor Thailand-trip: vergelijk Chiang Mai' : 'Wider Thailand trip: compare Chiang Mai', body: isNl ? '— Elephant Nature Park (Chiang Mai) is de gouden standaard. Phuket is solide maar niet niveau-1.' : '— Elephant Nature Park (Chiang Mai) is the gold standard. Phuket is solid but not tier-1.' },
    ];
    if (spoke === 'cooking-class') return [
      { strong: isNl ? 'Met markt = beter voor eerste reis' : 'With market = better for first-timers', body: isNl ? '— je leert ingrediënten herkennen die je daarna in restaurants ziet.' : '— you learn to spot the ingredients you\'ll then see at restaurants.' },
      { strong: isNl ? 'Vegetarisch / vegan / gluten-vrij = vraag vooraf' : 'Veg/vegan/gluten-free = ask ahead', body: isNl ? '— alle goede scholen accommoderen, maar met 24u notice.' : '— all good schools accommodate but with 24h notice.' },
      { strong: isNl ? 'Recipes mee naar huis' : 'Take home the recipes', body: isNl ? '— eis bij boeking dat je een recipe-card krijgt. Beste scholen geven die standaard.' : '— insist at booking that you get a recipe card. Best schools provide one by default.' },
      { strong: isNl ? 'Vermijd hotelketen-cursussen' : 'Skip hotel-chain classes', body: isNl ? '— overpriced ($90+ pp), groot, weinig hands-on. Onafhankelijke scholen zijn beter.' : '— overpriced ($90+ pp), big, low hands-on time. Independents are better.' },
      { strong: isNl ? 'Lunch is het resultaat' : 'Lunch is what you cooked', body: isNl ? '— eet wat je hebt gemaakt. Geen restaurant-lunch erbij.' : '— you eat what you cooked. No restaurant lunch on top.' },
      { strong: isNl ? 'Kinderen vanaf 8 jaar' : 'Kids from age 8', body: isNl ? '— hete pannen + olie zijn niet ideaal voor jongere kinderen. Vraag vooraf.' : '— hot pans + oil aren\'t ideal for younger kids. Ask ahead.' },
    ];
    if (spoke === 'snorkeling') return [
      { strong: isNl ? 'Racha = beste zicht (12–15m)' : 'Racha = best visibility (12–15m)', body: isNl ? '— $10–30 meer dan Coral Island, maar het verschil in helder water is groot.' : '— $10–30 more than Coral Island, but the visibility gap is huge.' },
      { strong: isNl ? 'Eigen masker meenemen' : 'Bring your own mask', body: isNl ? '— huurmaskers lekken vaak. Een eigen $15-masker is een investering voor 3+ trips.' : '— rental masks often leak. Your own $15 mask pays back across 3+ trips.' },
      { strong: isNl ? 'Reef-safe sunscreen' : 'Reef-safe sunscreen', body: isNl ? '— oxybenzone-vrij. Standaard sunscreen vernietigt koraal in 30 min direct contact.' : '— oxybenzone-free. Standard sunscreen kills coral within 30 min of direct contact.' },
      { strong: isNl ? 'Niet zwemmen op koraal' : 'Don\'t stand on coral', body: isNl ? '— ook al lijkt het sterk: je breekt jaren-oude structuren. Drijfvest helpt om bovenaan te blijven.' : '— it looks tough but you break years-old structures. A life jacket helps you stay on top.' },
      { strong: isNl ? 'Zee-state check vóór vertrek' : 'Check sea state before departure', body: isNl ? '— als de operator op de avond ervoor twijfelt: re-boek liever dan een ruwe tocht door te zetten.' : '— if the operator hedges the night before, rebook rather than push through rough sea.' },
      { strong: isNl ? 'Combineer niet met diepzee-duiken op 1 dag' : 'Don\'t combine with deep diving same day', body: isNl ? '— vlieg-schema en compressie-effecten. Snorkel op één dag, duik op de volgende.' : '— flight schedule and compression issues. Snorkel one day, dive the next.' },
    ];
    return [
      { strong: isNl ? 'Late namiddag is beste tijd' : 'Late afternoon is best', body: isNl ? '— 16:00–18:30, hitte zakt, cafés openen, Sunday Market start om 17:00 (alleen zo).' : '— 16:00–18:30, heat eases, cafés open, Sunday Market starts 17:00 (Sundays only).' },
      { strong: isNl ? 'Soi Romanee in 1 wandeling' : 'Soi Romanee in one walk', body: isNl ? '— 200m kleine straatje, 5 min wandeling. Niet missen voor foto\'s.' : '— 200m narrow alley, 5-minute walk. Don\'t skip for photos.' },
      { strong: isNl ? 'Shrines respecteren' : 'Respect the shrines', body: isNl ? '— schoenen uit, geen flits-foto\'s. Donaties optioneel ($1–3).' : '— shoes off, no flash photography. Donations optional ($1–3).' },
      { strong: isNl ? 'Yaowarat Road voor street food' : 'Yaowarat Road for street food', body: isNl ? '— meer authentiek dan Thalang. Probeer kanom jin (rijst-noedel-curry) en moo hong (Phuket-gestoofd varken).' : '— more authentic than Thalang. Try kanom jin (rice-noodle curry) and moo hong (Phuket-style braised pork).' },
      { strong: isNl ? 'GrabTaxi vanaf strand-resorts' : 'GrabTaxi from beach resorts', body: isNl ? '— $8–15 vanaf Patong, eenrichting. Vanaf Phuket Town centrum: lopen of $2 tuktuk.' : '— $8–15 one-way from Patong. From Phuket Town centre: walk or $2 tuk-tuk.' },
      { strong: isNl ? 'Combineer met Big Buddha-zonsondergang' : 'Combine with Big Buddha sunset', body: isNl ? '— sterk culture-dag pad: Old Town 16:00–18:30 → Big Buddha 18:30–19:30.' : '— strong culture-day path: Old Town 16:00–18:30 → Big Buddha 18:30–19:30.' },
    ];
  })();

  // ---------- FAQ ----------
  const faqEn = (() => {
    if (isPhiPhi(spoke)) return PHI_PHI_CONTENT[spoke].faqEn;
    if (spoke === 'big-buddha') return [
      { q: 'How long does a Phuket Big Buddha tour take?', a: 'A typical half-day tour runs 4–5 hours from hotel pickup to drop-off. Big Buddha itself takes 45–60 minutes (climb, photos, optional gold-tile inscription). Wat Chalong adds 30 minutes. Karon viewpoint and an optional fourth stop bring it to 4–5 hours total. Private tours can stretch to 6–8 hours if you add Promthep Cape sunset and Old Town.' },
      { q: 'Is the Big Buddha tour worth it on a rain day?', a: 'Yes — better than most rain alternatives. Big Buddha\'s top platform is exposed, so a poncho helps, but the 360° view of southern Phuket is dramatic in moody weather. Wat Chalong is fully covered. Skip Karon viewpoint in heavy rain (zero view) and ask the operator to substitute with Phuket Town heritage walk or a market.' },
      { q: 'What\'s the dress code for Big Buddha and Wat Chalong?', a: 'Both require covered shoulders + knees — no tank tops, no shorts above the knee, no sleeveless dresses. Both temples rent sarongs for $1, but pack appropriately to save time. Shoes off at Wat Chalong entry. Hats off when entering temple buildings (sun hats fine outdoors).' },
      { q: 'Klook, GetYourGuide or Viator for Big Buddha?', a: 'For half-day group tours: Klook usually has the lowest price ($25–45). GetYourGuide has slightly fewer options but better cancellation flexibility (24h free). For private tuk-tuk or Sino-Portuguese-themed routes, Viator has more boutique operators. Check all three before booking — same operator can show on multiple platforms with 10–25% price differences.' },
      { q: 'Can I do Big Buddha by self-drive scooter?', a: 'Yes, and it\'s 60% cheaper. Rent a scooter ($8–12/day) and ride up the hill yourself — the road is steep but paved. Park free at the top, walk in. Skip if you\'re not a confident scooter rider — Phuket roads are aggressive and the descent is brake-heavy.' },
    ];
    if (spoke === 'elephant-sanctuary') return [
      { q: 'How do I know if a Phuket elephant sanctuary is actually ethical?', a: 'Check four things: 1) No riding (look for "no riding" prominently on the website). 2) No shows or trick performances. 3) Small herds (under 12 elephants). 4) Activities limited to feeding, walking alongside, and optional river bathing. Cross-check via World Animal Protection and the Asian Captive Elephant Working Group. Phuket Elephant Sanctuary (Paklok), Elephant Jungle Sanctuary, and Phuket Elephant Care all meet these.' },
      { q: 'How much does a Phuket elephant sanctuary tour cost?', a: 'Half-day (4–5 hours): $80–125 pp including hotel transfer, briefing, feeding, walk, and vegetarian Thai lunch. Full-day (7–8 hours): $130–180 pp adding rainforest walk and additional time with elephants. Private VIP packages run $200–300 pp. Online booking via Klook or GetYourGuide is usually 10–20% cheaper than booking direct.' },
      { q: 'Is it safe to be near elephants without a barrier?', a: 'At ethical sanctuaries with experienced mahouts, yes — but always follow the guides\' instructions. The elephants are habituated to humans but they\'re still 3-tonne wild animals. Don\'t approach from behind, don\'t make sudden moves, don\'t bring food they can\'t eat. Pregnant women and small children should stick to feeding stations, not walking alongside.' },
      { q: 'Should I do a Phuket sanctuary or wait for Chiang Mai?', a: 'If your trip includes Chiang Mai, save it: Elephant Nature Park (Chiang Mai) is the longest-running, strictest non-profit elephant sanctuary in Thailand and arguably the world. If you\'re Phuket-only, Phuket Elephant Sanctuary or Elephant Jungle Sanctuary will deliver an ethical experience. See our Thailand-wide elephant sanctuaries guide for the full ranking.' },
      { q: 'Are children welcome at Phuket elephant sanctuaries?', a: 'Yes — Elephant Jungle Sanctuary and Green Elephant Sanctuary Park are the most family-friendly. Phuket Elephant Sanctuary (Paklok) is observation-only, less interactive — great for adults but less engaging for kids under 10. All ethical sanctuaries are no-riding, so the "kids riding an elephant" photos some travelers expect won\'t happen, and that\'s the point.' },
    ];
    if (spoke === 'cooking-class') return [
      { q: 'Which Phuket cooking class is best for first-timers?', a: 'Pum Thai Cooking School in Patong is the easiest first-class: central location, 3-hour format, 5 dishes, friendly small groups (8–12 people), no market stress. $45–65 pp. For something more atmospheric with a market visit, Phuket Thai Cookery School at Cape Panwa runs 4 hours and delivers the strongest take-home recipes.' },
      { q: 'Do Phuket cooking classes accommodate vegetarians and vegans?', a: 'Yes, all four schools we recommend (Pum, PTCS, Blue Elephant, in-home private) accommodate vegetarian, vegan, gluten-free and shellfish allergies — but request 24 hours ahead via the booking platform. Vegan-specific classes are increasing post-2024; ask explicitly if you want fish sauce and shrimp paste swapped throughout.' },
      { q: 'Should I take the version with the market visit?', a: 'For first-time Thailand visitors: yes. The market segment (30–45 min at Banzaan, Naka or Talad Sod) teaches you to recognize Thai herbs (galangal, kaffir lime, holy basil), curry pastes and chilies — knowledge you\'ll use at every restaurant for the rest of the trip. For repeat visitors who already know the market, skip it and pay $15 less.' },
      { q: 'Can I take the recipes home?', a: 'Yes — every reputable school issues a recipe card or PDF after class with the 4–5 dishes you cooked. The best schools (Phuket Thai Cookery School, Blue Elephant) include sourcing tips for ingredients abroad (which Asian-grocery substitutes work, what to skip).' },
      { q: 'Phuket cooking class vs Bangkok or Chiang Mai?', a: 'Bangkok and Chiang Mai have stronger cooking-school scenes — more variety, more competition driving quality. Phuket\'s top 4 schools are very good but the depth isn\'t there. If your Thailand trip includes either Bangkok or Chiang Mai, do the cooking class there. Phuket-only trip: Pum Thai or Phuket Thai Cookery School are excellent.' },
    ];
    if (spoke === 'snorkeling') return [
      { q: 'Which Phuket snorkeling tour has the clearest water?', a: 'Racha Yai and Racha Noi (45 min by boat from Chalong) consistently deliver 12–15m visibility on calm days — the best in the Phuket area. Coral Island averages 6–10m visibility but is closer (25 min). Phi Phi snorkel stops are bundled into the Phi Phi day tour and run 8–12m visibility. For best-of-the-best: skip Phuket day trips and book a Similan liveaboard (15 Oct–15 May only).' },
      { q: 'How much does a Phuket snorkeling tour cost?', a: 'Coral Island: $60–80 pp shared with lunch + gear + transfer. Racha Yai/Noi: $70–110 pp. Phi Phi snorkel stops bundled with islands tour: $80–150 pp. Khai Islands: $50–75 pp (cheapest, but coral is damaged). Private speedboats for groups of 6–8: $400–700/day all-in. May–October: 20–30% cheaper but visibility drops.' },
      { q: 'Are Phuket snorkeling tours safe for non-swimmers?', a: 'Yes — operators provide life jackets and the snorkel stops are in shallow (2–4m) protected bays. A guide stays in the water near beginners. That said: if you\'re truly unable to float, prefer Coral Island over Racha (shallower, calmer). Avoid Phi Phi snorkel stops near Pileh Lagoon if you can\'t swim — depths reach 6–8m.' },
      { q: 'When is the best month for snorkeling in Phuket?', a: 'November (post-monsoon, calm), February and March consistently deliver the best visibility. Avoid late September (south-west monsoon peak — many trips cancel). May and October are transition months: 50/50 chance of a good day. December–January are great but expensive (peak holiday surcharges).' },
      { q: 'Can I bring my own snorkel and mask?', a: 'Yes — and you should if you\'ve got them. Rental masks often leak. Operators provide flotation gear and fins for free, but a personal mask + reef-safe sunscreen + rash guard upgrades the experience significantly.' },
    ];
    return [
      { q: 'How long does a Phuket Old Town walking tour take?', a: 'Standard guided tours run 2–3 hours covering Krabi Road murals, Thalang Road shophouses, Soi Romanee, the Chinese shrines (Sang Tham, Put Jaw) and 1–2 food stops. Self-walks can be done in 1.5 hours if you skip food. Private routes can extend to 3–4 hours with a longer Yaowarat Road food crawl.' },
      { q: 'Is a Phuket Old Town tour worth booking with a guide?', a: 'For first-time visitors: yes. The Sino-Portuguese architecture, Hokkien tin-baron history, and the Chinese-Thai cultural blend are not obvious from photos — a good guide adds context that makes the walk meaningful. For repeat visitors who already know the basics, self-walk works just as well.' },
      { q: 'When is the best time of day for Old Town?', a: 'Late afternoon (16:00–18:30) is ideal: the heat eases, cafés and shops open, and the lighting on the pastel shophouses is at its best. Sunday market night (17:00–22:00 on Thalang Road, Sundays only) is electric but extremely crowded — pick another day if you dislike crowds.' },
      { q: 'How do I get to Phuket Old Town from Patong, Karon or Kata?', a: 'GrabTaxi is the simplest: $8–15 one-way from Patong (45 min), $10–18 from Karon/Kata (50 min–1h). Public songthaew (blue truck) runs Patong–Phuket Town for $1 but is slow (75 min). Self-drive scooter works if you\'re confident — park near Soi Romanee for free.' },
      { q: 'Can I combine Phuket Old Town with Big Buddha in one day?', a: 'Yes — a strong "no-beach" culture day. Old Town 16:00–18:30 → quick GrabTaxi to Big Buddha for sunset (18:30–19:30) → dinner back in Phuket Town. Total $50–80 in transport plus tour costs. See our Big Buddha tour guide for the timing.' },
    ];
  })();

  const faqNl = (() => {
    if (isPhiPhi(spoke)) return PHI_PHI_CONTENT[spoke].faqNl;
    if (spoke === 'big-buddha') return [
      { q: 'Hoe lang duurt een Phuket Big Buddha-tour?', a: 'Een typische halve-dag-tour duurt 4–5 uur van hoteltransfer tot drop-off. Big Buddha zelf neemt 45–60 min (klimmen, foto\'s, optioneel gouden tegel-graveren). Wat Chalong: 30 min. Karon viewpoint en eventueel een vierde stop brengt het op 4–5 uur. Privé-tours kunnen 6–8 uur worden met Promthep Cape-zonsondergang en Old Town.' },
      { q: 'Is Big Buddha-tour de moeite waard op een regen-dag?', a: 'Ja — beter dan de meeste regen-alternatieven. Big Buddha\'s top-platform is open, dus poncho mee, maar het 360°-uitzicht over zuid-Phuket is dramatisch in mistig weer. Wat Chalong is overdekt. Skip Karon viewpoint bij hevige regen (geen zicht) en vraag de operator om Old Town heritage-walk of een markt als vervanging.' },
      { q: 'Wat is de dresscode voor Big Buddha en Wat Chalong?', a: 'Beide vereisen bedekte schouders + knieën — geen tanktops, geen shorts boven de knie, geen mouwloze jurken. Beide tempels verhuren sarongs voor $1, maar passend kleden vooraf is sneller. Schoenen uit bij Wat Chalong-ingang. Hoeden af bij betreden van tempelgebouwen (zonnehoeden buiten OK).' },
      { q: 'Klook, GetYourGuide of Viator voor Big Buddha?', a: 'Voor halve-dag groep-tours: Klook heeft meestal de laagste prijs ($25–45). GetYourGuide heeft minder opties maar betere annulering (24u gratis). Voor privé-tuktuk of Sino-Portuguese-thema is Viator beter. Check alle drie voor je boekt — dezelfde operator kan op meerdere platforms staan met 10–25% prijsverschil.' },
      { q: 'Kan ik Big Buddha zelf met scooter doen?', a: 'Ja, en het is 60% goedkoper. Huur een scooter ($8–12/dag) en rij zelf de heuvel op — de weg is steil maar verhard. Gratis parkeren boven, lopen naar de top. Sla over als je geen ervaren scooter-rijder bent — Phuket\'s wegen zijn aggressief en de afdaling is rem-zwaar.' },
    ];
    if (spoke === 'elephant-sanctuary') return [
      { q: 'Hoe weet ik of een Phuket olifantenopvang écht ethisch is?', a: 'Check vier dingen: 1) Geen rijden (kijk naar "no riding" duidelijk op de website). 2) Geen shows of trick-performances. 3) Kleine kuddes (<12 olifanten). 4) Activiteiten beperkt tot voeren, naast hen wandelen, en optioneel rivier-baden. Cross-check via World Animal Protection en Asian Captive Elephant Working Group. Phuket Elephant Sanctuary (Paklok), Elephant Jungle Sanctuary en Phuket Elephant Care voldoen aan alle vier.' },
      { q: 'Wat kost een Phuket olifantenopvang-tour?', a: 'Halve dag (4–5 uur): $80–125 pp inclusief hoteltransfer, briefing, voeren, wandelen, vegetarische Thaise lunch. Hele dag (7–8 uur): $130–180 pp met regenwoud-wandeling. Privé-VIP: $200–300 pp. Online via Klook of GetYourGuide is meestal 10–20% goedkoper dan direct boeken.' },
      { q: 'Is het veilig om dicht bij olifanten te zijn zonder hek?', a: 'Bij ethische opvang met ervaren mahouts: ja — maar volg altijd instructies. De olifanten zijn gewend aan mensen, maar het zijn nog steeds 3-tons wilde dieren. Niet van achter benaderen, geen plotselinge bewegingen, geen verkeerd voer. Zwangere vrouwen en kleine kinderen blijven bij voeder-stations, niet ernaast wandelen.' },
      { q: 'Phuket-opvang of wachten op Chiang Mai?', a: 'Includeert je trip Chiang Mai, bewaar het: Elephant Nature Park (Chiang Mai) is het langst-bestaande, strengst non-profit centrum van Thailand en discutabel ter wereld. Phuket-only: Phuket Elephant Sanctuary of Elephant Jungle Sanctuary leveren een ethische ervaring. Zie onze Thailand-brede olifantenopvang-gids voor de volledige ranking.' },
      { q: 'Zijn kinderen welkom bij Phuket olifantenopvang?', a: 'Ja — Elephant Jungle Sanctuary en Green Elephant Sanctuary Park zijn het meest familievriendelijk. Phuket Elephant Sanctuary (Paklok) is observatie-alleen, minder interactief — goed voor volwassenen, minder boeiend voor kinderen <10. Alle ethische opvang-centra zijn no-riding, dus de "kinderen-rijden-op-olifant"-foto\'s die sommige reizigers verwachten gebeuren niet — en dat is het punt.' },
    ];
    if (spoke === 'cooking-class') return [
      { q: 'Welke Phuket-kookcursus is het beste voor beginners?', a: 'Pum Thai Cooking School in Patong is de makkelijkste eerste-cursus: centrale locatie, 3-uurs format, 5 gerechten, vriendelijke kleine groepen (8–12 personen), geen markt-stress. $45–65 pp. Voor meer sfeer met markt-bezoek: Phuket Thai Cookery School op Cape Panwa, 4 uur, beste recipes om mee te nemen.' },
      { q: 'Accepteren Phuket-kookcursussen vegetariërs en veganisten?', a: 'Ja, alle vier scholen die we aanbevelen (Pum, PTCS, Blue Elephant, in-home privé) accommoderen vegetarisch, veganistisch, glutenvrij en schaaldier-allergie — maar vraag 24 uur vooruit via het boek-platform. Vegan-specifieke cursussen nemen toe sinds 2024; vraag expliciet of je vissaus en garnaal-pasta volledig wilt vervangen.' },
      { q: 'Kies ik de versie met markt-bezoek?', a: 'Eerste-reis Thailand-bezoekers: ja. Het markt-deel (30–45 min op Banzaan, Naka of Talad Sod) leert je Thaise kruiden herkennen (galangawortel, kaffirlimoen, heilige basilicum), currypasta\'s en chilies — kennis die je elke restaurant-bezoek de rest van de trip gebruikt. Herhaalbezoekers die de markt al kennen: sla over en bespaar $15.' },
      { q: 'Krijg ik de recipes mee?', a: 'Ja — elke nette school geeft een recipe-kaart of PDF na de cursus met de 4–5 gerechten die je hebt gekookt. Beste scholen (Phuket Thai Cookery School, Blue Elephant) geven ook tips voor ingrediënten-vervangers in het buitenland (welke Aziatische supermarkt-substituten werken).' },
      { q: 'Phuket-kookcursus vs Bangkok of Chiang Mai?', a: 'Bangkok en Chiang Mai hebben sterkere kookschool-scenes — meer variatie, meer concurrentie drijft kwaliteit. Phuket\'s top-4 zijn goed maar diepte ontbreekt. Includeert je Thailand-trip Bangkok of Chiang Mai: doe de cursus daar. Phuket-only trip: Pum Thai of Phuket Thai Cookery School zijn uitstekend.' },
    ];
    if (spoke === 'snorkeling') return [
      { q: 'Welke Phuket snorkel-tour heeft het helderste water?', a: 'Racha Yai en Racha Noi (45 min boot vanaf Chalong) leveren consistent 12–15m zicht op rustige dagen — beste in Phuket-gebied. Coral Island gemiddeld 6–10m maar dichterbij (25 min). Phi Phi snorkel-stops zijn bundled bij de Phi Phi-dagtocht, 8–12m zicht. Voor "best of the best": skip Phuket-dagtochten en boek een Similan-liveaboard (alleen 15 okt–15 mei).' },
      { q: 'Wat kost een Phuket snorkel-tour?', a: 'Coral Island: $60–80 pp gedeeld met lunch + gear + transfer. Racha Yai/Noi: $70–110 pp. Phi Phi snorkel-stops bundled met eilanden-tour: $80–150 pp. Khai Islands: $50–75 pp (goedkoopst, maar koraal beschadigd). Privé-speedboats voor groepen 6–8: $400–700/dag all-in. Mei–oktober: 20–30% goedkoper, zicht slechter.' },
      { q: 'Zijn Phuket snorkel-tours veilig voor niet-zwemmers?', a: 'Ja — operators leveren reddingsvesten en de snorkel-stops zijn in ondiepe (2–4m) beschermde baaien. Een gids blijft in het water bij beginners. Maar: als je écht niet kunt drijven, prefer Coral Island boven Racha (ondieper, kalmer). Vermijd Phi Phi snorkel-stops bij Pileh Lagoon als je niet kunt zwemmen — dieptes 6–8m.' },
      { q: 'Wanneer is de beste maand voor snorkelen in Phuket?', a: 'November (post-moesson, kalm), februari en maart leveren consistent het beste zicht. Vermijd late september (zuidwestmoesson-piek — veel trips annuleren). Mei en oktober zijn overgangsmaanden: 50/50 kans op een goede dag. December–januari zijn top maar duur (vakantietoeslag).' },
      { q: 'Mag ik mijn eigen snorkel en masker meenemen?', a: 'Ja — en doe het ook als je ze hebt. Huurmaskers lekken vaak. Operators leveren drijfvest en flippers gratis, maar een persoonlijk masker + reef-safe sunscreen + UV-shirt verhoogt de ervaring sterk.' },
    ];
    return [
      { q: 'Hoe lang duurt een Phuket Old Town wandeltour?', a: 'Standaard begeleide tours zijn 2–3 uur: Krabi Road murals, Thalang Road shophouses, Soi Romanee, de Chinese shrines (Sang Tham, Put Jaw) en 1–2 food-stops. Zelf-wandelen kan in 1,5 uur als je food overslaat. Privé-routes: 3–4 uur met langere Yaowarat Road food-tour.' },
      { q: 'Is een Phuket Old Town-tour de moeite met gids?', a: 'Eerste-reis bezoekers: ja. De Sino-Portugese architectuur, Hokkien tin-baron-geschiedenis en Chinees-Thaise cultuur-mix zijn niet duidelijk vanaf foto\'s — een goede gids voegt context toe die de wandeling betekenisvol maakt. Herhaalbezoekers die de basics kennen: zelf-wandelen werkt prima.' },
      { q: 'Wat is de beste tijd op de dag?', a: 'Late namiddag (16:00–18:30): de hitte zakt, cafés en winkels openen, en het licht op de pastelkleurige shophouses is op zijn best. Zondagavond (17:00–22:00 op Thalang Road, alleen zo) is electrisch maar extreem druk — kies een andere dag als je drukte mijdt.' },
      { q: 'Hoe kom ik naar Phuket Old Town vanaf Patong, Karon of Kata?', a: 'GrabTaxi is het simpelst: $8–15 enkele reis vanaf Patong (45 min), $10–18 vanaf Karon/Kata (50 min–1u). Publieke songthaew (blauwe truck) Patong–Phuket Town voor $1 maar traag (75 min). Zelf scooter rijden werkt als je zelfverzekerd bent — gratis parkeren bij Soi Romanee.' },
      { q: 'Kan ik Phuket Old Town combineren met Big Buddha op 1 dag?', a: 'Ja — sterke "geen-strand"-cultuur dag. Old Town 16:00–18:30 → snel GrabTaxi naar Big Buddha voor zonsondergang (18:30–19:30) → diner terug in Phuket Town. Totaal $50–80 vervoer + tour-kosten. Zie onze Big Buddha tour-gids voor timing.' },
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

  // Cross-link to Thailand-wide guides where relevant
  const relevantThailandGuide = (() => {
    if (spoke === 'elephant-sanctuary') return { href: '/best-elephant-sanctuaries-in-thailand/', labelEn: 'Thailand-wide elephant sanctuaries guide', labelNl: 'Thailand-brede olifantenopvang-gids' };
    if (spoke === 'cooking-class')      return { href: '/best-cooking-classes-in-thailand/',      labelEn: 'Thailand-wide cooking classes guide',      labelNl: 'Thailand-brede kookcursus-gids' };
    if (spoke === 'snorkeling')         return { href: '/best-diving-snorkeling-in-thailand/',     labelEn: 'Thailand-wide diving + snorkeling guide',  labelNl: 'Thailand-brede duik + snorkel-gids' };
    // Phi Phi cluster — point at /best-diving-snorkeling/ for water-focused trips, /islands/ for the rest
    if (spoke === 'phi-phi-snorkeling' || spoke === 'phi-phi-day-trip' || spoke === 'maya-bay' || spoke === 'phi-phi-sunset' || spoke === 'phi-phi-speedboat') {
      return { href: '/islands/koh-phi-phi/', labelEn: 'Koh Phi Phi island guide', labelNl: 'Koh Phi Phi eilandgids' };
    }
    if (spoke === 'khai-islands' || spoke === 'bamboo-island') {
      return { href: '/islands/koh-phi-phi/', labelEn: 'Koh Phi Phi island guide', labelNl: 'Koh Phi Phi eilandgids' };
    }
    return null;
  })();

  // Localised spoke label for use in render-layer headings
  const spokeLabel = isNl ? SPOKE_LABELS[spoke].nl : SPOKE_LABELS[spoke].en;

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
            {/* H1 — different from title per playbook, includes secondary keyword */}
            <h1 className="font-heading text-3xl lg:text-5xl font-bold mt-2">{h1Final}</h1>
            <p className="mt-4 text-lg lg:text-xl max-w-3xl opacity-95">{heroIntro}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={withSubId(primaryUrl, place('hero-primary'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-6 py-3 text-base font-semibold hover:bg-red-700 shadow-lg">
                {isNl ? 'Bekijk op Klook' : 'See on Klook'} →
              </a>
              <a href={withSubId(secondaryUrl, place('hero-secondary'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-[#1B9E3E] text-white px-6 py-3 text-base font-semibold hover:bg-[#157a30]">
                {isNl ? 'Vergelijk op GetYourGuide' : 'Compare on GetYourGuide'} →
              </a>
              <a href={withSubId(tertiaryUrl, place('hero-tertiary'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-white text-thailand-blue border border-white/40 px-6 py-3 text-base font-semibold hover:bg-white/90">
                {isNl ? 'Premium op Viator' : 'Premium on Viator'} →
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
              {spoke === 'big-buddha'         && (isNl ? 'Big Buddha tour-opties vergeleken' : 'Big Buddha tour options compared')}
              {spoke === 'elephant-sanctuary' && (isNl ? 'Phuket olifantenopvang vergeleken' : 'Phuket elephant sanctuaries compared')}
              {spoke === 'cooking-class'      && (isNl ? 'Phuket-kookscholen vergeleken' : 'Phuket cooking schools compared')}
              {spoke === 'snorkeling'         && (isNl ? 'Snorkel-bestemmingen vergeleken' : 'Snorkel destinations compared')}
              {spoke === 'old-town'           && (isNl ? 'Old Town tour-opties vergeleken' : 'Old Town tour options compared')}
              {isPhiPhi(spoke)                && (isNl ? `${spokeLabel} opties vergeleken` : `${spokeLabel} options compared`)}
            </h2>
            <p className="text-gray-600 mb-6">{isNl ? 'Klik om live aanbiedingen te zien (we verdienen een kleine commissie zonder dat het jou iets extra kost).' : 'Click to see live availability (we earn a small commission at no extra cost to you).'}</p>
            <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Optie' : 'Option'}</th>
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
                      <td className="px-4 py-3"><a href={withSubId(primaryUrl, place(`table-row-${i}`))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-thailand-red font-semibold hover:underline whitespace-nowrap">{isNl ? 'Bekijk →' : 'See deals →'}</a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-gray-500">{isNl ? 'Prijzen zijn 2026 hoogseizoen-tarieven (nov–apr). Mei–okt vaak 20–35% lager. Marine park-fees en transfer-toeslagen vaak apart bij privé-bookings.' : 'Prices are 2026 high-season rates (Nov–Apr). May–Oct often 20–35% lower. Marine park fees and transfer surcharges often extra on private bookings.'}</p>
          </section>

          {/* Top pick callout */}
          <section className="rounded-2xl bg-thailand-red/5 border-2 border-thailand-red p-6">
            <span className="inline-block rounded-full bg-thailand-red text-white text-xs font-bold uppercase tracking-wide px-3 py-1 mb-3">⭐ {isNl ? 'Onze keuze' : 'Our pick'}</span>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">
              {spoke === 'big-buddha'         && (isNl ? 'Half-day Big Buddha + Wat Chalong + Karon viewpoint' : 'Half-day Big Buddha + Wat Chalong + Karon viewpoint')}
              {spoke === 'elephant-sanctuary' && (isNl ? 'Elephant Jungle Sanctuary, half-day with lunch'        : 'Elephant Jungle Sanctuary, half-day with lunch')}
              {spoke === 'cooking-class'      && (isNl ? 'Phuket Thai Cookery School (4 uur, met markt)'         : 'Phuket Thai Cookery School (4 hours, with market)')}
              {spoke === 'snorkeling'         && (isNl ? 'Racha Yai + Racha Noi via Klook (full-day)'             : 'Racha Yai + Racha Noi via Klook (full-day)')}
              {spoke === 'old-town'           && (isNl ? 'Old Town heritage walk + 4 food-stops, 3 uur'          : 'Old Town heritage walk + 4 food stops, 3 hours')}
              {isPhiPhi(spoke)                && (() => {
                const r = tableRows[0];
                return isNl ? `${r.label} (${r.spec})` : `${r.label} (${r.spec})`;
              })()}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              {spoke === 'big-buddha' && (isNl
                ? 'Voor de meeste reizigers: 4–5 uur, $35–60 pp via Klook of GetYourGuide, hoteltransfer + Engelstalige gids + 4 stops (Big Buddha, Wat Chalong, Karon viewpoint, marketplace). Vertrek 07:00 om Big Buddha rustig te ervaren of 15:00 voor zonsondergangsfoto\'s. Vraag bij boeking om het Karon-viewpoint stop expliciet — sommige goedkope tours slaan dat over.'
                : 'For most travellers: 4–5 hours, $35–60 pp via Klook or GetYourGuide, hotel transfer + English-speaking guide + 4 stops (Big Buddha, Wat Chalong, Karon viewpoint, marketplace). Depart 07:00 for a quiet Big Buddha experience or 15:00 for sunset shots. Ask explicitly for the Karon viewpoint stop at booking — some cheap tours skip it.')}
              {spoke === 'elephant-sanctuary' && (isNl
                ? 'Elephant Jungle Sanctuary, half-day, $90–120 pp via Klook of GYG. No-riding, kleine groepen, lunch inbegrepen, hoteltransfer. Strikt diervriendelijk en de meest familievriendelijke optie van de drie ethische opties op het eiland. Boek 3–5 dagen vooruit in hoogseizoen.'
                : 'Elephant Jungle Sanctuary, half-day, $90–120 pp via Klook or GYG. No-riding, small groups, lunch included, hotel transfer. Strictly ethical and the most family-friendly of the three vetted options on the island. Book 3–5 days ahead in high season.')}
              {spoke === 'cooking-class' && (isNl
                ? 'Phuket Thai Cookery School (Cape Panwa), 4 uur met marktbezoek, 4 gerechten, $55–80 pp. Beste recipes om mee naar huis te nemen, sterk format voor eerste reizigers. Klook is meestal het goedkoopst.'
                : 'Phuket Thai Cookery School (Cape Panwa), 4 hours with market visit, 4 dishes, $55–80 pp. Best take-home recipes, strong format for first-timers. Klook usually cheapest.')}
              {spoke === 'snorkeling' && (isNl
                ? 'Racha Yai + Racha Noi via Klook, full-day (7 uur), $80–110 pp inclusief lunch + gear + transfer. Beste zicht in Phuket-gebied (12–15m op rustige dag), zachte koraal-tuinen. Vermijd Coral Island als je écht goed water wilt zien.'
                : 'Racha Yai + Racha Noi via Klook, full-day (7 hours), $80–110 pp including lunch + gear + transfer. Best visibility in the Phuket area (12–15m on a calm day), soft coral gardens. Skip Coral Island if you actually want clear water.')}
              {spoke === 'old-town' && (isNl
                ? '3-uurs heritage walking tour ($30–45 pp) met gids, 4 food-stops (kanom jin, oester-omelet, Phuket-koffie, kaffir-mandala), Krabi Road murals, Thalang Road shophouses, Soi Romanee, Sang Tham shrine. Beste in late namiddag (16:00).'
                : '3-hour heritage walking tour ($30–45 pp) with guide, 4 food stops (kanom jin, oyster omelette, Phuket coffee, kaffir-coconut dessert), Krabi Road murals, Thalang Road shophouses, Soi Romanee, Sang Tham shrine. Best late afternoon (16:00).')}
              {isPhiPhi(spoke)                && sections[0] && (isNl ? sections[0].body : sections[0].body)}
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={withSubId(primaryUrl, place('toppick-primary'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">
                {isNl ? 'Bekijk op Klook' : 'See on Klook'} →
              </a>
              <a href={withSubId(secondaryUrl, place('toppick-secondary'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center rounded-full bg-[#1B9E3E] text-white px-5 py-2 text-sm font-semibold hover:bg-[#157a30]">
                {isNl ? 'Bekijk op GetYourGuide' : 'See on GetYourGuide'} →
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
              {spoke === 'big-buddha'         && (isNl ? 'Boekingstips Big Buddha-tour' : 'Booking tips for Big Buddha tour')}
              {spoke === 'elephant-sanctuary' && (isNl ? 'Boekingstips olifantenopvang' : 'Booking tips for elephant sanctuary')}
              {spoke === 'cooking-class'      && (isNl ? 'Boekingstips kookcursus'      : 'Booking tips for cooking class')}
              {spoke === 'snorkeling'         && (isNl ? 'Boekingstips snorkel-tour'    : 'Booking tips for snorkeling tour')}
              {spoke === 'old-town'           && (isNl ? 'Boekingstips Old Town walk'   : 'Booking tips for Old Town walk')}
              {isPhiPhi(spoke)                && (isNl ? `Boekingstips ${spokeLabel}` : `Booking tips for ${spokeLabel}`)}
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

          {/* Cross-link to Thailand-wide guide if relevant */}
          {relevantThailandGuide && (
            <section className="rounded-2xl bg-white p-6 shadow-sm border-l-4 border-thailand-blue">
              <h2 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? 'Reis je verder dan Phuket?' : 'Travelling beyond Phuket?'}</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                {isNl
                  ? 'Andere regio\'s in Thailand bieden vaak sterkere of strengere alternatieven. Zie onze Thailand-brede vergelijkingsgids:'
                  : 'Other regions in Thailand often offer stronger or stricter alternatives. See our Thailand-wide comparison guide:'}
              </p>
              <Link href={relevantThailandGuide.href} className="inline-flex items-center rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">
                {isNl ? relevantThailandGuide.labelNl : relevantThailandGuide.labelEn} →
              </Link>
            </section>
          )}

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

          {/* Sibling spokes — lateral links per playbook */}
          {siblings.length > 0 && (
            <section>
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                {isNl ? 'Andere Phuket tour-categorieën' : 'Other Phuket tour categories'}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {siblings.map(s => (
                  <Link key={s} href={`/phuket-tours/${s}/`} className="block rounded-2xl bg-white p-4 shadow-sm border border-gray-200 hover:border-thailand-blue transition-colors">
                    <p className="font-heading font-bold text-gray-900">{isNl ? SPOKE_LABELS[s].nl : SPOKE_LABELS[s].en}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {s === 'big-buddha'         && (isNl ? 'Halve dag, $25–60 pp, dresscode' : 'Half-day, $25–60 pp, dress code')}
                      {s === 'elephant-sanctuary' && (isNl ? 'Ethisch, geen rijden, $80–180' : 'Ethical, no riding, $80–180')}
                      {s === 'cooking-class'      && (isNl ? '3–4 uur, $40–80, markt + 4 gerechten' : '3–4 hours, $40–80, market + 4 dishes')}
                      {s === 'snorkeling'         && (isNl ? 'Coral / Racha / Phi Phi, $60–110' : 'Coral / Racha / Phi Phi, $60–110')}
                      {s === 'old-town'           && (isNl ? 'Sino-Portugees, 2–3 uur, $20–40' : 'Sino-Portuguese, 2–3 hours, $20–40')}
                      {isPhiPhi(s)                && (() => {
                        const c = PHI_PHI_CONTENT[s];
                        const stat = c.heroStats[2] ?? c.heroStats[1] ?? c.heroStats[0];
                        return isNl ? `${stat.labelNl}: ${stat.valueNl}` : `${stat.label}: ${stat.value}`;
                      })()}
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
              {isNl ? 'Plan de rest van je Phuket-trip' : 'Plan the rest of your Phuket trip'}
            </h2>
            <p className="mt-2 text-gray-700">{isNl ? 'Tour-keuze gemaakt — werk de rest af:' : 'Tour pick locked in — wrap up the rest:'}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {/* UP to pillar — anchor variation */}
              <Link href="/phuket-tours/" className="rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">
                {isNl ? '🎟️ Alle Phuket tours vergelijken' : '🎟️ Compare all Phuket tours'}
              </Link>
              {/* Cross-cluster */}
              <Link href="/yacht-charter-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">
                {isNl ? '⛵ Privé jacht-charter' : '⛵ Private yacht charter'}
              </Link>
              <Link href="/best-hotels/phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">
                {isNl ? '🏨 Beste hotels in Phuket' : '🏨 Best hotels in Phuket'}
              </Link>
              <Link href="/flights-to-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">
                {isNl ? '✈️ Vluchten naar Phuket' : '✈️ Flights to Phuket'}
              </Link>
              <Link href="/city/phuket/" className="rounded-full bg-white text-gray-900 border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50">
                {isNl ? '📖 Phuket reisgids' : '📖 Phuket travel guide'}
              </Link>
              <a href={withSubId(GYG_GENERIC, place('mesh-gyg'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-[#1B9E3E] text-white px-5 py-2 text-sm font-semibold hover:bg-[#157a30]">
                {isNl ? '🎟️ Andere activiteiten' : '🎟️ Other activities'}
              </a>
              <a href={withSubId(VIATOR_GENERIC, place('mesh-viator'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">
                {isNl ? '🎫 Premium tours op Viator' : '🎫 Premium tours on Viator'}
              </a>
            </div>
          </section>

          {/* 12Go ferry alternative — only for Phi Phi cluster spokes */}
          {isPhiPhi(spoke) && (
            <section className="rounded-2xl bg-blue-50 border-2 border-thailand-blue p-6">
              <span className="inline-block rounded-full bg-thailand-blue text-white text-xs font-bold uppercase tracking-wide px-3 py-1 mb-3">⛴️ {isNl ? 'Plan B' : 'Plan B'}</span>
              <h2 className="font-heading text-xl font-bold text-gray-900 mb-2">
                {isNl ? 'Geen tour? Boek de ferry zelf' : 'Skip the tour? Book the ferry yourself'}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                {isNl
                  ? 'Wil je liever zelf naar Phi Phi en niet aan een tour-schema vastzitten? Phuket heeft directe ferries naar Phi Phi Don (Tonsai Pier) — gemiddeld $15-30 enkele reis, 90 min varen. Vergelijk schedules en boek live tickets via 12Go.'
                  : "Want to go to Phi Phi on your own schedule instead of joining a tour? Phuket has direct ferries to Phi Phi Don (Tonsai Pier) — typically $15-30 one-way, 90-min crossing. Compare schedules and book live tickets via 12Go."}
              </p>
              <a href={withSubId('https://12go.tpo.lv/bng1il3g', place('plan-b-12go-ferry'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center rounded-full bg-thailand-blue text-white px-5 py-2.5 text-sm font-semibold hover:bg-blue-700">
                {isNl ? '🎫 Phuket → Phi Phi ferry op 12Go' : '🎫 Phuket → Phi Phi ferry on 12Go'} →
              </a>
            </section>
          )}

          {/* Methodology */}
          <section className="rounded-2xl bg-gray-50 border border-gray-200 p-6 text-sm text-gray-700">
            <h2 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? 'Hoe we vergeleken' : 'How we compared'}</h2>
            <p>{isNl ? 'Tarieven en operator-info geverifieerd in mei 2026 op Klook, GetYourGuide, Viator en operator-websites. Tripadvisor-reviews (>200 reviews, 4,5+ rating) gebruikt voor kwaliteitscheck. We verdienen commissie op boekingen via genoemde platforms — dit verandert niets aan de prijs of welke operators we noemen.' : "Rates and operator info verified May 2026 on Klook, GetYourGuide, Viator, and operator websites. Tripadvisor reviews (>200 reviews, 4.5+ rating) used for quality checks. We earn a commission on bookings via the listed platforms — this never changes the price you pay or which operators we cover."}</p>
          </section>
        </main>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const file = path.join(process.cwd(), 'data', 'pseo', 'tours', 'phuket-spokes.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const paths = (data.spokes as SpokeMeta[]).map(s => ({ params: { spoke: s.slug } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.spoke as SpokeSlug;
  if (!slug) return { notFound: true, revalidate: 60 };

  const partnersFile = path.join(process.cwd(), 'data', 'pseo', 'tours', 'phuket-partners.json');
  const spokesFile = path.join(process.cwd(), 'data', 'pseo', 'tours', 'phuket-spokes.json');
  const partnersData = JSON.parse(fs.readFileSync(partnersFile, 'utf8'));
  const spokesData = JSON.parse(fs.readFileSync(spokesFile, 'utf8'));

  const partners: Partners = partnersData.partners;
  const allSpokes: SpokeMeta[] = spokesData.spokes;
  const me = allSpokes.find(s => s.slug === slug);
  if (!me) return { notFound: true, revalidate: 60 };

  const primaryUrl = partners[me.primaryPartnerKey].partnerUrl;
  const secondaryUrl = partners[me.secondaryPartnerKey].partnerUrl;
  const tertiaryUrl = partners[me.tertiaryPartnerKey].partnerUrl;

  const siblings: SpokeSlug[] = allSpokes.filter(s => s.slug !== slug).map(s => s.slug as SpokeSlug);

  return {
    props: {
      spoke: slug,
      primaryUrl,
      secondaryUrl,
      tertiaryUrl,
      siblings,
      lastUpdated: spokesData.lastUpdated,
    },
    revalidate: 604800,
  };
};
