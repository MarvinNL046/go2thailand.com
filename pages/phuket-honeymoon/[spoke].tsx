import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import { withSubId, KLOOK_GENERIC, GYG_GENERIC } from '../../lib/affiliates';
import { useSubId } from '../../lib/useSubId';

interface PartnerEntry { partnerUrl: string; label?: string }
interface Partners {
  trip_luxury_honeymoon: PartnerEntry;
  trip_wedding_venue: PartnerEntry;
  trip_honeymoon_resort: PartnerEntry;
  trip_pool_villa: PartnerEntry;
  trip_all_inclusive: PartnerEntry;
  trip_beach_resort: PartnerEntry;
  klook_honeymoon: PartnerEntry;
  klook_sunset_couples: PartnerEntry;
  klook_couples_spa: PartnerEntry;
  klook_phi_phi_private: PartnerEntry;
  gyg_phuket_couples: PartnerEntry;
  gyg_phuket_romantic: PartnerEntry;
  viator_honeymoon: PartnerEntry;
  viator_private_tour: PartnerEntry;
  gyg_yacht_sunset?: PartnerEntry;
  klook_luxury_yacht?: PartnerEntry;
}

type SpokeSlug = 'private-pool-villas' | 'all-inclusive';

interface SpokeMeta { slug: SpokeSlug; primaryPartnerKey: keyof Partners; secondaryPartnerKey: keyof Partners }

interface Props {
  spoke: SpokeSlug;
  primaryUrl: string;
  secondaryUrl: string;
  partners: Partners;
  siblings: SpokeSlug[];
  lastUpdated: string;
}

const SPOKE_LABELS: Record<SpokeSlug, { en: string; nl: string }> = {
  'private-pool-villas': { en: 'Private pool villas', nl: 'Privé pool-villas' },
  'all-inclusive': { en: 'All-inclusive honeymoon', nl: 'All-inclusive honeymoon' },
};

export default function PhuketHoneymoonSpokePage({ spoke, primaryUrl, secondaryUrl, partners, siblings, lastUpdated }: Props) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const subId = useSubId();
  const placement = (slot: string) => `${subId}-pseo-phuket-honeymoon-${spoke}-${slot}`;

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: isNl ? 'Phuket honeymoon' : 'Phuket Honeymoon', href: '/phuket-honeymoon/' },
    { name: isNl ? SPOKE_LABELS[spoke].nl : SPOKE_LABELS[spoke].en, href: `/phuket-honeymoon/${spoke}/` },
  ];

  let seoTitle = '', seoTitleNl = '', h1En = '', h1Nl = '', descEn = '', descNl = '', kicker = '', kickerNl = '';

  if (spoke === 'private-pool-villas') {
    seoTitle = 'Phuket Honeymoon Pool Villa (2026): 7 Romantic Picks';   // 55
    seoTitleNl = 'Phuket Honeymoon Pool-villa (2026): 7 Romantisch';     // 49
    h1En = 'Best Private Pool Villas in Phuket for Honeymoon Couples';
    h1Nl = 'Beste privé pool-villas in Phuket voor honeymoon-stellen';
    descEn = 'Looking for a private pool villa for your Phuket honeymoon? Compare 7 romantic picks (Trisara, Sri Panwa, Anantara) from $700 to $4,500/night.';
    descNl = 'Op zoek naar een privé pool-villa voor je Phuket-honeymoon? Vergelijk 7 romantische keuzes (Trisara, Sri Panwa, Anantara) $700–4.500/nacht.';
    kicker = 'Pool villa honeymoon';
    kickerNl = 'Pool-villa honeymoon';
  } else { // all-inclusive
    seoTitle = 'All-Inclusive Phuket Honeymoon (2026): 6 Resorts'; // 50
    seoTitleNl = 'All-Inclusive Phuket Honeymoon (2026): 6 Resorts'; // 50
    h1En = 'Phuket All-Inclusive Honeymoon Packages: 6 Resorts Compared';
    h1Nl = 'Phuket all-inclusive honeymoon-pakketten: 6 resorts vergeleken';
    descEn = 'Looking for an all-inclusive Phuket honeymoon? Compare 6 packages (Banyan Tree, Anantara, Centara) — what\'s in, what\'s extra and real costs.';
    descNl = 'Op zoek naar all-inclusive Phuket honeymoon? Vergelijk 6 pakketten (Banyan Tree, Anantara, Centara) — wat zit erin, wat is extra en echte kosten.';
    kicker = 'All-inclusive honeymoon';
    kickerNl = 'All-inclusive honeymoon';
  }

  const titleFinal = isNl ? seoTitleNl : seoTitle;
  const descFinal = isNl ? descNl : descEn;
  const h1Final = isNl ? h1Nl : h1En;
  const kickerFinal = isNl ? kickerNl : kicker;

  const canonical = `https://go2-thailand.com${isNl ? '/nl' : ''}/phuket-honeymoon/${spoke}/`;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, i) => ({
      '@type': 'ListItem', position: i + 1, name: b.name,
      item: `https://go2-thailand.com${isNl ? '/nl' : ''}${b.href}`,
    })),
  };

  const heroStats = (() => {
    if (spoke === 'private-pool-villas') {
      return [
        { label: isNl ? 'Aantal villa\'s' : 'Villa count', value: '7' },
        { label: isNl ? 'Prijs/nacht' : 'Price/night', value: '$700–4,500' },
        { label: isNl ? 'Beste maand' : 'Best month', value: 'Nov–Mar' },
        { label: isNl ? 'Honeymoon-perks' : 'Honeymoon perks', value: isNl ? 'Standaard' : 'Standard' },
      ];
    }
    return [
      { label: isNl ? 'Resorts' : 'Resorts', value: '6' },
      { label: isNl ? 'Pakket vanaf' : 'Package from', value: '$280/n' },
      { label: isNl ? 'Min nachten' : 'Min nights', value: '5' },
      { label: isNl ? 'Bespaart' : 'Saves', value: '~30%' },
    ];
  })();

  const tableRows = (() => {
    if (spoke === 'private-pool-villas') {
      return [
        { label: 'Trisara (Layan)', spec: isNl ? '39 villa\'s, beachfront' : '39 villas, beachfront', price: '$1,200–3,500', best: isNl ? 'Iconic luxe + privacy' : 'Iconic luxury + privacy' },
        { label: 'Amanpuri (Pansea)', spec: isNl ? '40 villa\'s, privé baai' : '40 villas, private bay', price: '$1,500–4,500', best: isNl ? 'Ultra-luxe rust' : 'Ultra-luxury serenity' },
        { label: 'Sri Panwa (Cape Panwa)', spec: isNl ? 'Cliffside pool-villa' : 'Cliffside pool villa', price: '$700–2,500', best: isNl ? 'Sunset uitzicht' : 'Sunset view' },
        { label: 'Anantara Mai Khao', spec: isNl ? 'Garden + beach pool-villa' : 'Garden + beach pool villa', price: '$450–1,200', best: isNl ? 'Rust + dropdown prijs' : 'Quiet + great value' },
        { label: 'Banyan Tree Bang Tao', spec: isNl ? 'Lagune-villa + spa' : 'Lagoon villa + spa', price: '$500–1,800', best: isNl ? 'Spa-honeymoon' : 'Spa-focused honeymoon' },
        { label: 'The Pavilions Phuket', spec: isNl ? 'Cherngtalay heuveltop' : 'Cherngtalay hilltop', price: '$350–950', best: isNl ? 'Mid-budget intiem' : 'Mid-budget intimate' },
        { label: 'Andara Resort (Kamala)', spec: isNl ? '5–9 SK villa\'s' : '5–9 BR villas', price: '$800–2,800', best: isNl ? 'Multi-day takeover' : 'Multi-day takeover' },
      ];
    }
    return [
      { label: 'Centara Grand Beach Resort', spec: isNl ? 'Karon Beach, family-luxe' : 'Karon Beach, family luxury', price: '$280–550/n', best: isNl ? 'Beste pakket-value' : 'Best package value' },
      { label: 'Outrigger Laguna Phuket', spec: isNl ? 'Lagune Bang Tao' : 'Lagoon Bang Tao', price: '$320–680/n', best: isNl ? 'Resort-faciliteiten' : 'Full resort facilities' },
      { label: 'Anantara Mai Khao', spec: isNl ? 'Pool-villa al-in optie' : 'Pool villa AI option', price: '$650–1,400/n', best: isNl ? 'Luxe AI met privacy' : 'Luxury AI + privacy' },
      { label: 'Banyan Tree Bang Tao', spec: isNl ? 'Spa + dining inclusief' : 'Spa + dining included', price: '$700–1,900/n', best: isNl ? 'Spa-rich honeymoon' : 'Spa-rich honeymoon' },
      { label: 'JW Marriott Mai Khao', spec: isNl ? 'Family-resort, 11km strand' : 'Family resort, 11km beach', price: '$420–820/n', best: isNl ? 'Brede gasten-leeftijd' : 'Wide guest age range' },
      { label: 'Holiday Inn Mai Khao', spec: isNl ? 'Mid-range AI mogelijk' : 'Mid-range AI option', price: '$220–380/n', best: isNl ? 'Onder-$300 budget' : 'Under-$300 budget' },
    ];
  })();

  const sections = (() => {
    if (spoke === 'private-pool-villas') {
      return [
        { title: isNl ? "Wat onderscheidt een echte honeymoon-villa?" : "What makes a real honeymoon villa",
          body: isNl
            ? "Niet elke villa is honeymoon-geschikt. Look-fors: (1) Volledig privé pool — niet gedeeld met buren. (2) Geen overlapping zichtlijnen vanuit andere villa's. (3) In-villa dining-optie (privé chef voor minimaal één diner). (4) King-bed met romantische dressing (bloemen-pad, kaarsen, champagne — gratis bij honeymoon-vermelding). (5) Outdoor shower of sunken bath. (6) Beach- of cliff-toegang binnen 100m. Trisara, Amanpuri en Sri Panwa scoren 6/6, Anantara en The Pavilions 5/6."
            : "Not every villa is honeymoon-grade. Look for: (1) Fully private pool — not shared with neighbours. (2) No overlapping sight lines from other villas. (3) In-villa dining option (private chef for at least one dinner). (4) King bed with romantic dressing (rose-petal trail, candles, champagne — free with honeymoon mention). (5) Outdoor shower or sunken bath. (6) Beach or cliff access within 100m. Trisara, Amanpuri and Sri Panwa score 6/6, Anantara and The Pavilions 5/6.", },
        { title: isNl ? "Honeymoon-perks die élke luxe-villa biedt" : "Honeymoon perks every luxury villa offers",
          body: isNl
            ? "Vermeld \"honeymoon\" bij boeking + bevestig bij aankomst. Standaard gratis: room-upgrade (vaak naar volgende villa-tier), in-room champagne + bloemen, privé ontbijt op terras 1×, late check-out (14:00 of 16:00), gratis kamertaart. Premium-villas voegen toe: gratis 60-min couples-massage, sunset cocktails op privé-deck, kandelaber-strand-diner-setup voor 1 avond. Trisara, Amanpuri, Sri Panwa: alle bovengenoemde. Banyan Tree, Anantara: standaard + 1–2 premium-items."
            : "Mention 'honeymoon' at booking + confirm at arrival. Free standard: room upgrade (often to next villa tier), in-room champagne + flowers, private terrace breakfast 1×, late check-out (14:00 or 16:00), free room cake. Premium villas add: free 60-min couples massage, sunset cocktails on private deck, candle-lit beach dinner setup for 1 night. Trisara, Amanpuri, Sri Panwa: all of the above. Banyan Tree, Anantara: standard + 1–2 premium items.", },
        { title: isNl ? "Pool-villa vs hotel-suite: cost-benefit" : "Pool villa vs hotel suite: cost vs benefit",
          body: isNl
            ? "Hotel-suite (700ft²): $400–800/n, gedeelde pool, lobby-passage, kamerservice via gang. Pool-villa (1.500–3.500ft²): $700–4.500/n, privé pool, eigen tuin, eigen ingang. Verschil per nacht $300–2.000 — voor 7 nachten honeymoon $2.000–14.000 premium. Het loont als jullie 50%+ van de tijd in de villa willen doorbrengen (lazy mornings, midnight swim, eigen ontbijt). Niet als jullie 8u/dag uit-aan-stap zijn — kies dan suite."
            : "Hotel suite (700ft²): $400–800/n, shared pool, lobby pass-through, room service via corridor. Pool villa (1,500–3,500ft²): $700–4,500/n, private pool, own garden, own entrance. Difference per night $300–2,000 — for 7-night honeymoon $2,000–14,000 premium. Worth it if you plan to spend 50%+ of time in the villa (lazy mornings, midnight swim, terrace breakfast). Not worth it if you are out 8h/day — pick a suite then.", },
      ];
    }
    return [
      { title: isNl ? "Wat 'all-inclusive' in Phuket écht betekent" : "What 'all-inclusive' actually means in Phuket",
        body: isNl
          ? "Phuket-AI is anders dan Caribbean-AI. Standaard inbegrepen: 3 maaltijden/dag (vaak buffet of à-la-carte met categorie-limiet), house-wijn/bier/frisdrank/koffie/thee, 2 verschillende restaurants per dag, 1 strandcabana of pool-cabana, dagelijkse activity-rotatie (yoga, snorkel-clinic, kookles). Niet inbegrepen: premium-spirits (whisky, gin, cocktails buiten welcome-drink), top-tier dining (Michelin-restaurants, hotel-eigen signature), spa, watersport, off-resort dagtochten. Reken op extra $30–80/pp/dag bovenop AI."
          : "Phuket AI is different from Caribbean AI. Standard inclusions: 3 meals/day (often buffet or à-la-carte with course limit), house wine/beer/sodas/coffee/tea, 2 different restaurants per day, 1 beach or pool cabana, daily activity rotation (yoga, snorkel clinic, cooking class). NOT included: premium spirits (whisky, gin, cocktails beyond welcome drink), top-tier dining (Michelin venues, hotel signature), spa, watersports, off-resort day trips. Budget extra $30–80 pp/day on top of AI.", },
      { title: isNl ? "Rekenen: AI vs los — wanneer wint AI?" : "Math: AI vs separate — when AI wins",
        body: isNl
          ? "Voorbeeld 7-nachten honeymoon, 2 personen: AI-pakket Centara $390/n total = $2.730. Los-boeken zelfde resort: kamer $280/n × 7 = $1.960 + eten 3×$60/dag × 7 = $1.260 + 5 cocktails/dag × $12 × 7 = $840. Totaal los: $4.060 — AI bespaart $1.330 (33%). Aanname: jullie eten 3 hoofdmaaltijden/dag + drinken meer dan 3 alcoholische glazen/dag. Voor lichte eters of stellen die uit-eten op restaurant willen: los-boeken wint."
          : "Example 7-night honeymoon, 2 guests: AI package Centara $390/n total = $2,730. Separate same resort: room $280/n × 7 = $1,960 + food 3×$60/day × 7 = $1,260 + 5 cocktails/day × $12 × 7 = $840. Total separate: $4,060 — AI saves $1,330 (33%). Assumes you eat 3 full meals/day + drink more than 3 alcoholic drinks/day. For light eaters or couples who want off-property dining: separate wins.", },
      { title: isNl ? "Beste tier-AI voor honeymoon (niet familie-AI)" : "Best honeymoon-tier AI (not family AI)",
        body: isNl
          ? "Family-AI's (Holiday Inn, Centara Grand) zijn solide budget-keuzes maar luidruchtig in dag-pool. Honeymoon-tier AI: Anantara Mai Khao (pool-villa AI optie, romantische upgrade), Banyan Tree Bang Tao (spa-rich AI), Outrigger Laguna (volwassen pool, lagune-vibe). Vraag specifiek naar 'honeymoon AI' of 'adults-preferred AI' — sommige resorts hebben rustige sub-pools voor stellen. Reserveer á-la-carte restaurant tafels op aankomst — populair in hoogseizoen."
          : "Family AIs (Holiday Inn, Centara Grand) are solid budget picks but loud at the day pool. Honeymoon-tier AI: Anantara Mai Khao (pool-villa AI option, romantic upgrade), Banyan Tree Bang Tao (spa-rich AI), Outrigger Laguna (adult-only pool, lagoon vibe). Ask specifically for 'honeymoon AI' or 'adults-preferred AI' — some resorts have quieter sub-pools for couples. Reserve à-la-carte restaurant tables on arrival — popular in high season.", },
    ];
  })();

  const tips = (() => {
    if (spoke === 'private-pool-villas') {
      return [
        { strong: isNl ? 'Vermeld honeymoon bij boeking ÉN check-in' : 'Mention honeymoon at booking AND check-in', body: isNl ? '— online-bookers vergeten dit, het is essentiële stap voor gratis upgrades, champagne, bloemen.' : '— online bookers forget this, the essential step for free upgrades, champagne, flowers.' },
        { strong: isNl ? 'Boek 4–6 maanden vooruit voor hoogseizoen' : 'Book 4–6 months ahead for high season', body: isNl ? '— Trisara, Amanpuri, Sri Panwa zit voor nov–feb 90+ dagen vooruit op slot.' : '— Trisara, Amanpuri, Sri Panwa book out 90+ days ahead Nov–Feb.' },
        { strong: isNl ? 'Vraag privé chef-optie aan' : 'Ask about private chef', body: isNl ? '— bij premium-villa\'s standaard. $80–250 voor een 4-gangen diner-thuis. Romantischer dan restaurant + photo-worthy.' : '— standard at premium villas. $80–250 for a 4-course in-villa dinner. More romantic than restaurant + photo-worthy.' },
        { strong: isNl ? 'Pool-positie checken (privacy)' : 'Check pool position (privacy)', body: isNl ? '— sommige villa\'s hebben overlap met buren. Vraag floorplan + photo voor je boekt — Trisara villa-types verschillen sterk.' : '— some villas overlap with neighbours. Ask for the floorplan + photo before booking — Trisara villa types vary widely.' },
        { strong: isNl ? 'Bath-products check' : 'Check bath products', body: isNl ? '— top-villa\'s leveren Aman, Le Labo, Diptyque amenities; mid-range geeft generieke. Klein detail dat vakantie-fotos verbetert.' : '— top villas stock Aman, Le Labo, Diptyque amenities; mid-range stocks generic. Small detail that elevates vacation photos.' },
        { strong: isNl ? 'Late check-out vragen' : 'Ask for late check-out', body: isNl ? '— honeymooners krijgen meestal 14:00 of 16:00 i.p.v. 11:00 standaard. Gratis bij vermelding.' : '— honeymooners usually get 14:00 or 16:00 instead of 11:00 standard. Free with mention.' },
        { strong: isNl ? 'Reisverzekering met luxe-tier' : 'Travel insurance with luxury tier', body: isNl ? '— $4.000+ accommodatie heeft luxe-niveau insurance nodig. Premium polissen kosten 5–7% van trip-budget.' : '— $4,000+ accommodation needs luxury-tier insurance. Premium policies cost 5–7% of trip budget.' },
      ];
    }
    return [
      { strong: isNl ? 'Reken eigen scenario, geen generiek advies' : 'Run your own numbers, not generic advice', body: isNl ? '— AI is geen win voor lichte eters of restaurant-fans. Schat je eigen eten/drinks-uitgaven los voor je AI accepteert.' : '— AI is not a win for light eaters or restaurant fans. Estimate your own food/drink spend separately before agreeing to AI.' },
      { strong: isNl ? 'Vraag wat ÉCHT inbegrepen is' : 'Ask what is REALLY included', body: isNl ? '— "all-inclusive" varieert per resort. Vraag itemised PDF: alcohol-tier, restaurants, spa, watersport, dagtochten.' : '— "all-inclusive" varies by resort. Ask for itemised PDF: alcohol tier, restaurants, spa, watersports, day tours.' },
      { strong: isNl ? 'Honeymoon-tier resorts kiezen' : 'Pick honeymoon-tier resorts', body: isNl ? ': Anantara, Banyan Tree, Outrigger boven Holiday Inn of Centara Family. Adult-preferred pool maakt verschil.' : ': Anantara, Banyan Tree, Outrigger over Holiday Inn or Centara Family. Adult-preferred pool makes the difference.' },
      { strong: isNl ? 'Reserveer à-la-carte op aankomst' : 'Reserve à-la-carte on arrival', body: isNl ? '— populaire restaurants in hoog-seizoen vol. AI dekt het maar je moet plek hebben — boek alle 7 nachten in eerste 24u.' : '— popular restaurants fill in high season. AI covers it but you need a table — book all 7 nights in the first 24h.' },
      { strong: isNl ? 'Min 5 nachten voor AI break-even' : 'Min 5 nights for AI break-even', body: isNl ? '— eronder verlies je via early-check-out + late-check-in onbenutte maaltijden. 7 nachten is sweet-spot.' : '— below that you lose via early check-out + late check-in unused meals. 7 nights is the sweet spot.' },
      { strong: isNl ? 'Vraag honeymoon-room-upgrade' : 'Ask for honeymoon room upgrade', body: isNl ? '— ja, ook bij AI. Free upgrade naar volgende kamer-tier op basis van availability bij vermelding.' : '— yes, even on AI. Free upgrade to next room tier subject to availability with mention.' },
      { strong: isNl ? 'Plan 1 off-resort uitstapje' : 'Plan 1 off-resort outing', body: isNl ? '— Phuket Old Town diner of sunset bij Promthep Cape. Tegen AI-burnout op dag 4–5.' : '— Phuket Old Town dinner or sunset at Promthep Cape. Antidote to AI burnout on day 4–5.' },
    ];
  })();

  const faqEn = (() => {
    if (spoke === 'private-pool-villas') {
      return [
        { q: 'Are private pool villas in Phuket worth the extra cost for a honeymoon?', a: "Yes — if you plan to spend 50%+ of your time in the villa (lazy mornings, midnight swim, terrace breakfast). The premium over hotel suite is $300–2,000/night, total $2,000–14,000 over 7 nights. For couples who want decompression-style honeymoon (read, swim, room-service), villa wins. For couples who tour 8h/day and only sleep at the resort, suite wins. Ask if 50% of plans involve being at the resort." },
        { q: 'Which Phuket pool villa has the best honeymoon perks?', a: 'Trisara, Amanpuri and Sri Panwa lead — all three offer: free champagne + flowers + cake, room upgrade subject to availability, free 60-min couples spa, candle-lit private dinner setup for one night, late check-out at 16:00. Banyan Tree and Anantara give standard perks (champagne, flowers, late check-out) but charge for the spa + dinner add-ons. Always mention "honeymoon" at booking AND check-in to trigger them.' },
        { q: 'Pool villa size — how big is enough?', a: '1,500ft² (140m²) one-bedroom pool villa is the standard luxury size — comfortable for 7+ nights honeymoon. 2,000–3,000ft² (185–280m²) is true luxury — used at Amanpuri, top Trisara categories. 3,500ft²+ (325m²) is signature villa — Sri Panwa Habita series, Trisara residential category, $2,500+/night. Smaller (under 1,200ft²) feels cramped for 7-night honeymoon especially with luggage. Sweet spot: 1,500–2,000ft².' },
        { q: 'Can we order a private dinner in our pool villa?', a: 'Yes — every premium pool villa offers in-villa dining. Trisara, Amanpuri, Sri Panwa: dedicated chef brings 4-course meal to your villa, $80–250 pp depending on menu (Thai degustation, BBQ on terrace, romantic candle-lit). Mid-range villas (Anantara, Banyan Tree): same option from main restaurant. Book 24h ahead for normal menu, 48h for custom. Most romantic option for honeymoons — better than restaurant photos.' },
        { q: 'Best pool villa for first-time honeymoon in Phuket?', a: 'Trisara at Layan Beach is the most-recommended first-time honeymoon villa: 39 individual villas across a private bay, beachfront access from many villas, top-3 restaurant in Phuket on-site (PRU — Michelin-starred), full honeymoon perks. Price $1,200–3,500/night. Runner-up: Sri Panwa for cliffside sunset views and excellent value (from $700/night, the best mid-luxury pool villa in Phuket).' },
      ];
    }
    return [
      { q: 'Is an all-inclusive Phuket honeymoon worth it?', a: 'Math depends on your eating + drinking habits. Example: 7 nights, 2 guests at Centara — AI package $2,730, separate booking estimated $4,060 for the same room + 3 meals + 5 daily cocktails. AI saves $1,330 (33%) IF you eat 3 hotel meals/day + drink alcohol regularly. For light eaters or couples who want off-property dining: separate booking wins. Run your own numbers before agreeing to AI — never assume the brochure quote is universal.' },
      { q: 'What does "all-inclusive" actually include in Phuket?', a: 'Standard inclusions: 3 meals/day (often buffet or à-la-carte with course limit), house wine/beer/sodas/coffee/tea, 2 restaurants per day, 1 beach/pool cabana, daily activities (yoga, snorkel clinic, cooking class). NOT included: premium spirits (whisky, gin, cocktails beyond welcome drink), Michelin/signature dining, spa, watersports, off-property tours. Always ask for an itemised PDF — Phuket AI varies more than Caribbean AI.' },
      { q: 'Best all-inclusive Phuket resorts for honeymoon couples?', a: 'Three picks: Anantara Mai Khao Pool Villa AI ($650–1,400/night) — luxury AI with privacy, adults-preferred sub-pool. Banyan Tree Bang Tao ($700–1,900/night) — spa-rich, lagoon villas, premium AI. Outrigger Laguna ($320–680/night) — full resort facilities, adult-only pool, mid-luxury AI. Avoid family-focused AIs (Holiday Inn, Centara Grand) for honeymoons unless budget is tight — pool noise during the day is the issue.' },
      { q: 'How many days minimum for an all-inclusive honeymoon to make sense?', a: '5 nights minimum, 7 ideal. Below 5 nights you lose value via early check-out + late check-in unused meals. At 7 nights, AI typically saves 25–35% vs separate booking when you use it fully. At 10+ nights, savings hit 35–45%. For 3–4 night trips, separate booking almost always wins because the daily AI rate amortises poorly over fewer days.' },
      { q: 'Can we negotiate the AI package?', a: 'Some yes, some no. Always ask: (1) Free room upgrade for honeymoon (often given). (2) Premium-bar add-on at discount (drops $20–30/day instead of $40–50). (3) Spa credit ($100–200) thrown in for 7+ night stays. (4) Late check-out at 16:00. (5) One off-property meal credit ($60–100 at a partner restaurant). Top resorts (Anantara, Banyan Tree) say yes to 3–4 of these for honeymoon couples — ask before booking, get it in writing.' },
    ];
  })();

  const faqNl = (() => {
    if (spoke === 'private-pool-villas') {
      return [
        { q: 'Zijn privé pool-villa\'s in Phuket de extra kosten waard voor honeymoon?', a: "Ja — als je 50%+ van de tijd in de villa wilt doorbrengen (lazy mornings, midnight swim, terras-ontbijt). Premium over hotel-suite is $300–2.000/n, totaal $2.000–14.000 over 7 nachten. Voor stellen die decompressie-style honeymoon willen (lezen, zwemmen, room-service): villa wint. Voor stellen die 8u/dag toeren en alleen slapen in resort: suite wint. Vraag jezelf: 50%+ tijd in resort?" },
        { q: 'Welke Phuket pool-villa heeft beste honeymoon-perks?', a: 'Trisara, Amanpuri en Sri Panwa lopen voorop — alle drie: gratis champagne + bloemen + taart, kamer-upgrade afh. van availability, gratis 60-min couples-spa, kandelaber privé-diner-setup voor 1 avond, late check-out 16:00. Banyan Tree en Anantara geven standaard perks (champagne, bloemen, late check-out) maar rekenen voor spa + dinner add-ons. Vermeld "honeymoon" bij boeking ÉN check-in om ze te triggeren.' },
        { q: 'Pool-villa grootte — hoeveel is genoeg?', a: '1.500ft² (140m²) één-slaapkamer is standaard luxe — comfortabel voor 7+ nachten honeymoon. 2.000–3.000ft² (185–280m²) is écht luxe — Amanpuri, Trisara top-categorieën. 3.500ft²+ (325m²) signature-villa — Sri Panwa Habita, Trisara residential, $2.500+/n. Kleiner (onder 1.200ft²) voelt krap voor 7-nachten honeymoon, vooral met bagage. Sweet-spot: 1.500–2.000ft².' },
        { q: 'Kunnen we privé diner in onze pool-villa bestellen?', a: 'Ja — elke premium-pool-villa biedt in-villa dining. Trisara, Amanpuri, Sri Panwa: dedicated chef brengt 4-gangen naar je villa, $80–250 pp afh. van menu (Thai degustation, BBQ op terras, kandelaar romantisch). Mid-range villa\'s (Anantara, Banyan Tree): zelfde optie via hoofdrestaurant. Boek 24u vooruit voor standaard, 48u voor custom. Romantisch beter dan restaurant-fotos.' },
        { q: 'Beste pool-villa voor eerste-keer honeymoon in Phuket?', a: 'Trisara bij Layan Beach is de meest-aanbevolen eerste-keer honeymoon-villa: 39 individuele villa\'s rond een privé baai, beachfront-toegang vanuit veel villa\'s, top-3 restaurant in Phuket on-site (PRU — Michelin), volle honeymoon-perks. Prijs $1.200–3.500/n. Runner-up: Sri Panwa voor cliffside-sunset en uitstekende value (vanaf $700/n, beste mid-luxe pool-villa in Phuket).' },
      ];
    }
    return [
      { q: 'Is een all-inclusive Phuket-honeymoon de moeite waard?', a: 'Berekening hangt af van eet/drink-gewoontes. Voorbeeld: 7 nachten, 2 personen Centara — AI $2.730, los geschat $4.060 voor zelfde kamer + 3 maaltijden + 5 dagelijkse cocktails. AI bespaart $1.330 (33%) ALS je 3 hotel-maaltijden/dag eet + regelmatig alcohol drinkt. Voor lichte eters of stellen die uit-eten willen: los wint. Reken eigen scenario voor je AI accepteert — brochures kloppen niet altijd.' },
      { q: 'Wat zit er écht in "all-inclusive" in Phuket?', a: 'Standaard: 3 maaltijden/dag (buffet of à-la-carte met course-limiet), huis-wijn/bier/frisdrank/koffie/thee, 2 restaurants per dag, 1 beach/pool cabana, dagelijkse activiteiten. NIET inbegrepen: premium-spirits (whisky, gin, cocktails buiten welcome-drink), Michelin/signature-dining, spa, watersport, off-property tours. Vraag altijd om itemised PDF — Phuket-AI varieert meer dan Caribbean-AI.' },
      { q: 'Beste all-inclusive Phuket-resorts voor honeymoon-stellen?', a: 'Drie keuzes: Anantara Mai Khao Pool Villa AI ($650–1.400/n) — luxe AI met privacy, adults-preferred sub-pool. Banyan Tree Bang Tao ($700–1.900/n) — spa-rich, lagune-villa, premium-AI. Outrigger Laguna ($320–680/n) — full resort, adult-only pool, mid-luxe AI. Vermijd family-focused AI (Holiday Inn, Centara Grand) voor honeymoons tenzij budget krap — pool-lawaai is het probleem.' },
      { q: 'Hoeveel dagen minimaal voor zinnig all-inclusive honeymoon?', a: '5 nachten min, 7 ideaal. Onder 5 nachten verlies je waarde via early check-out + late check-in onbenutte maaltijden. Bij 7 nachten bespaart AI 25–35% vs los als je het volledig benut. Bij 10+ nachten loopt besparing 35–45% op. Voor 3–4 nachten wint los-boeken bijna altijd omdat dagelijkse AI-tarief slecht amortiseert over weinig dagen.' },
      { q: 'Kunnen we het AI-pakket onderhandelen?', a: 'Soms ja, soms nee. Altijd vragen: (1) Gratis kamer-upgrade voor honeymoon (vaak gegeven). (2) Premium-bar add-on met korting ($20–30/d ipv $40–50). (3) Spa-credit ($100–200) bij 7+ nachten. (4) Late check-out 16:00. (5) Off-property meal-credit ($60–100 bij partner-restaurant). Top-resorts (Anantara, Banyan Tree) zeggen ja tot 3–4 hiervan voor honeymoon-stellen — vraag voor boeken, krijg het op papier.' },
    ];
  })();

  const faqList = isNl ? faqNl : faqEn;

  const faqJsonLd = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: faqList.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
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
              {spoke === 'private-pool-villas' && (isNl
                ? "Phuket heeft 100+ resorts met privé pool-villa's, van $700 mid-luxe tot $4.500 ultra-luxe per nacht. Hier zijn de 7 die écht honeymoon-grade zijn — privé pools (geen gedeelde buren-zichtlijnen), in-villa dining, gratis perks bij vermelden van honeymoon."
                : "Phuket has 100+ resorts with private pool villas, from $700 mid-luxury to $4,500 ultra-luxury per night. Here are the 7 that are genuinely honeymoon-grade — truly private pools (no neighbour sight lines), in-villa dining, free perks with the honeymoon mention.")}
              {spoke === 'all-inclusive' && (isNl
                ? "All-inclusive in Phuket lijkt op Caribbean-AI maar is niet hetzelfde. Hier zijn de 6 honeymoon-tier AI-resorts, wat ÉCHT inbegrepen is, hoeveel je los zou betalen, en wanneer AI verliest van separate-boeken."
                : "All-inclusive in Phuket looks like Caribbean AI but is not the same. Here are the 6 honeymoon-tier AI resorts, what is REALLY included, how much you'd pay separately, and when AI loses to separate booking.")}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={withSubId(primaryUrl, placement('hero-primary'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-6 py-3 text-base font-semibold hover:bg-red-700 shadow-lg">
                {spoke === 'private-pool-villas' ? (isNl ? 'Bekijk pool-villa\'s op Trip.com' : 'See pool villas on Trip.com') : (isNl ? 'Bekijk all-inclusive op Trip.com' : 'See all-inclusive on Trip.com')} →
              </a>
              <a href={withSubId(secondaryUrl, placement('hero-secondary'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-white text-thailand-blue border border-white/40 px-6 py-3 text-base font-semibold hover:bg-white/90">
                {isNl ? 'Vergelijk meer resorts' : 'Compare more resorts'} →
              </a>
            </div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-xs opacity-90">
              <span>✔ {isNl ? 'Bijgewerkt' : 'Updated'} {new Date(lastUpdated).toLocaleDateString(isNl ? 'nl-NL' : 'en', { year: 'numeric', month: 'long' })}</span>
              <span>✔ {isNl ? 'Eerlijke breakdowns' : 'Honest breakdowns'}</span>
              <span>✔ {isNl ? 'Geen extra kosten voor jou' : 'No extra cost to you'}</span>
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
              {spoke === 'private-pool-villas' ? (isNl ? 'Pool-villa-honeymoons vergeleken' : 'Pool villa honeymoons compared') : (isNl ? 'All-inclusive honeymoon-resorts vergeleken' : 'All-inclusive honeymoon resorts compared')}
            </h2>
            <p className="text-gray-600 mb-6">{isNl ? 'Klik om live tarieven te zien (we verdienen een kleine commissie zonder dat het jou iets extra kost).' : 'Click to see live rates (we earn a small commission at no extra cost to you).'}</p>
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
                      <td className="px-4 py-3"><a href={withSubId(primaryUrl, placement(`table-row-${i}`))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-thailand-red font-semibold hover:underline whitespace-nowrap">{isNl ? 'Bekijk →' : 'See deals →'}</a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-gray-500">{isNl ? 'Prijzen zijn 2026 hoogseizoen-tarieven (nov–feb) per nacht voor 2 gasten. Buiten hoogseizoen 25–35% lager. Honeymoon-perks gratis bij vermelding bij boeking.' : 'Prices are 2026 high-season rates (Nov–Feb) per night for 2 guests. Outside high season 25–35% cheaper. Honeymoon perks free with mention at booking.'}</p>
          </section>

          {/* Top pick callout */}
          <section className="rounded-2xl bg-thailand-red/5 border-2 border-thailand-red p-6">
            <span className="inline-block rounded-full bg-thailand-red text-white text-xs font-bold uppercase tracking-wide px-3 py-1 mb-3">⭐ {isNl ? 'Onze keuze' : 'Our pick'}</span>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">
              {spoke === 'private-pool-villas' ? (isNl ? 'Trisara — beachfront pool-villa, volle honeymoon-perks' : 'Trisara — beachfront pool villa, full honeymoon perks') : (isNl ? 'Anantara Mai Khao Pool Villa AI — luxe + privacy' : 'Anantara Mai Khao Pool Villa AI — luxury + privacy')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              {spoke === 'private-pool-villas' && (isNl
                ? '39 individuele pool-villa\'s op een privé baai, $1.200–3.500/n, gratis champagne + bloemen + room-upgrade + 60-min couples-spa + kandelaber-strand-diner. Eén Michelin-restaurant on-site (PRU). Vraag specifiek naar Ocean View Pool Villa — sweet-spot tussen prijs en uitzicht.'
                : '39 individual pool villas on a private bay, $1,200–3,500/n, free champagne + flowers + room upgrade + 60-min couples spa + candle-lit beach dinner. One Michelin restaurant on-site (PRU). Ask specifically for Ocean View Pool Villa — sweet spot between price and view.')}
              {spoke === 'all-inclusive' && (isNl
                ? 'Premium AI met privé pool-villa\'s op rustig Mai Khao strand, adult-preferred sub-pool, $650–1.400/n. Inbegrepen: alle maaltijden inclusief privé-villa BBQ, premium-bar (cocktails! whisky!), spa-credit, dagelijkse activiteiten. Honeymoon-pakket: gratis cliff-side picnic op cape-day-trip.'
                : 'Premium AI with private pool villas on the quiet Mai Khao beach, adults-preferred sub-pool, $650–1,400/n. Included: all meals including private villa BBQ, premium bar (cocktails! whisky!), spa credit, daily activities. Honeymoon package: free cliff-side picnic on cape day trip.')}
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={withSubId(primaryUrl, placement('toppick-primary'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">
                {isNl ? 'Bekijk op Trip.com' : 'See on Trip.com'} →
              </a>
              <a href={withSubId(secondaryUrl, placement('toppick-secondary'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">
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
              {spoke === 'private-pool-villas' ? (isNl ? 'Boekingstips pool-villa honeymoon' : 'Booking tips for pool villa honeymoon') : (isNl ? 'Boekingstips all-inclusive honeymoon' : 'Booking tips for all-inclusive honeymoon')}
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
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Andere honeymoon-opties in Phuket' : 'Other honeymoon options in Phuket'}</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {siblings.map(s => (
                  <Link key={s} href={`/phuket-honeymoon/${s}/`} className="block rounded-2xl bg-white p-4 shadow-sm border border-gray-200 hover:border-thailand-blue transition-colors">
                    <p className="font-heading font-bold text-gray-900">{isNl ? SPOKE_LABELS[s].nl : SPOKE_LABELS[s].en}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {s === 'private-pool-villas' && (isNl ? '7 pool-villa picks, $700–4.500/nacht' : '7 pool villa picks, $700–4,500/night')}
                      {s === 'all-inclusive' && (isNl ? '6 AI honeymoon-resorts vergeleken' : '6 AI honeymoon resorts compared')}
                    </p>
                    <p className="text-xs text-thailand-blue mt-2 font-semibold">{isNl ? 'Bekijk gids' : 'See guide'} →</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Cluster mesh — UP to pillar + cross-cluster */}
          <section className="rounded-2xl bg-thailand-blue/10 p-6">
            <h2 className="font-heading text-xl font-bold text-gray-900">{isNl ? 'Plan je hele Phuket honeymoon' : 'Plan your full Phuket honeymoon'}</h2>
            <p className="mt-2 text-gray-700">{isNl ? 'Resort gekozen — werk de rest af:' : 'Resort picked — wrap up the rest:'}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/phuket-honeymoon/" className="rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">{isNl ? '💕 Alle 8 honeymoon-resorts vergelijken' : '💕 Compare all 8 honeymoon resorts'}</Link>
              <Link href="/phuket-wedding-venues/" className="rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">{isNl ? '💒 Trouwlocaties Phuket' : '💒 Wedding venues Phuket'}</Link>
              <Link href="/best-hotels/phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏨 Alle Phuket hotels' : '🏨 All Phuket hotels'}</Link>
              <Link href="/yacht-charter-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '⛵ Yacht charter sunset' : '⛵ Yacht charter sunset'}</Link>
              <Link href="/flights-to-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '✈️ Vluchten naar Phuket' : '✈️ Flights to Phuket'}</Link>
              <Link href="/car-rental-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🚗 Auto huren' : '🚗 Car rental'}</Link>
              <Link href="/city/phuket/" className="rounded-full bg-white text-gray-900 border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50">{isNl ? '📖 Phuket reisgids' : '📖 Phuket travel guide'}</Link>
              <a href={withSubId(KLOOK_GENERIC, placement('mesh-klook'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">{isNl ? '🎟️ Couples-activiteiten' : '🎟️ Couples activities'}</a>
            </div>
          </section>

          {/* Methodology */}
          <section className="rounded-2xl bg-gray-50 border border-gray-200 p-6 text-sm text-gray-700">
            <h2 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? 'Hoe we vergeleken' : 'How we compared'}</h2>
            <p>{isNl ? 'Tarieven en honeymoon-perks geverifieerd in mei 2026 op resort-websites + Trip.com voor 2026 boekingen. AI-pakket-inclusies via resort-rate-sheets en recente Tripadvisor-reviews. Pool-villa-specs gevalideerd via 4–6 directe operator-quotes. We verdienen commissie op boekingen via genoemde platforms — dit verandert niets aan de prijs of welke resorts we noemen.' : "Rates and honeymoon perks verified May 2026 on resort websites + Trip.com for 2026 bookings. AI package inclusions via resort rate sheets and recent Tripadvisor reviews. Pool villa specs validated via 4–6 direct operator quotes. We earn a commission on bookings through the listed platforms — this never changes the price you pay or which resorts we cover."}</p>
          </section>
        </main>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const file = path.join(process.cwd(), 'data', 'pseo', 'wedding-honeymoon', 'honeymoon-spokes.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const paths = (data.spokes as SpokeMeta[]).map(s => ({ params: { spoke: s.slug } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.spoke as SpokeSlug;
  if (!slug) return { notFound: true, revalidate: 60 };

  const partnersFile = path.join(process.cwd(), 'data', 'pseo', 'wedding-honeymoon', 'phuket-partners.json');
  const spokesFile = path.join(process.cwd(), 'data', 'pseo', 'wedding-honeymoon', 'honeymoon-spokes.json');
  const partnersData = JSON.parse(fs.readFileSync(partnersFile, 'utf8'));
  const spokesData = JSON.parse(fs.readFileSync(spokesFile, 'utf8'));

  const partners: Partners = partnersData.partners;
  const allSpokes: SpokeMeta[] = spokesData.spokes;
  const me = allSpokes.find(s => s.slug === slug);
  if (!me) return { notFound: true, revalidate: 60 };

  const primaryUrl = partners[me.primaryPartnerKey]?.partnerUrl;
  const secondaryUrl = partners[me.secondaryPartnerKey]?.partnerUrl;
  if (!primaryUrl || !secondaryUrl) return { notFound: true, revalidate: 60 };

  const siblings: SpokeSlug[] = allSpokes.filter(s => s.slug !== slug).map(s => s.slug);

  return {
    props: { spoke: slug, primaryUrl, secondaryUrl, partners, siblings, lastUpdated: spokesData.lastUpdated },
    revalidate: 604800,
  };
};
