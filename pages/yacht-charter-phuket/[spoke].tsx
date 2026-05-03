import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import { withSubId, KLOOK_GENERIC, TWELVEGO_GENERIC } from '../../lib/affiliates';
import { useSubId } from '../../lib/useSubId';

interface Partners {
  klook_yacht: { partnerUrl: string };
  klook_catamaran: { partnerUrl: string };
  klook_luxury: { partnerUrl: string };
  gyg_yacht: { partnerUrl: string };
  gyg_phuket_yacht: { partnerUrl: string };
  viator_daycruise: { partnerUrl: string };
  viator_yacht_search: { partnerUrl: string };
  trip_yacht: { partnerUrl: string };
  trip_yacht_search: { partnerUrl: string };
  tiqets_yacht: { partnerUrl: string };
}

type SpokeSlug = 'luxury' | 'phi-phi' | 'similan';

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
  'luxury': { en: 'Luxury yacht charter', nl: 'Luxe yacht charter' },
  'phi-phi': { en: 'Yacht charter to Phi Phi', nl: 'Yacht charter naar Phi Phi' },
  'similan': { en: 'Yacht charter to Similan', nl: 'Yacht charter naar Similan' },
};

export default function YachtCharterPhuketSpokePage({ spoke, primaryUrl, secondaryUrl, partners, siblings, lastUpdated }: Props) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const subId = useSubId();
  const placementSubId = (placement: string) => `${subId}-pseo-yacht-charter-phuket-${spoke}-${placement}`;

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: isNl ? 'Yacht charter Phuket' : 'Yacht Charter Phuket', href: '/yacht-charter-phuket/' },
    { name: isNl ? SPOKE_LABELS[spoke].nl : SPOKE_LABELS[spoke].en, href: `/yacht-charter-phuket/${spoke}/` },
  ];

  // ---------- TITLES + DESCRIPTIONS (per SEO playbook) ----------

  // Title: keyword front, <60, modifier (year + count/promise)
  // H1: different word order from title, includes secondary keyword
  // Meta desc: <155, question hook, keyword + variation
  let seoTitle = '';
  let seoTitleNl = '';
  let h1En = '';
  let h1Nl = '';
  let descEn = '';
  let descNl = '';
  let kicker = '';
  let kickerNl = '';

  if (spoke === 'luxury') {
    seoTitle = 'Luxury Yacht Charter Phuket (2026): 50ft+ Picks';      // 49
    seoTitleNl = 'Luxe Yacht Charter Phuket (2026): 50ft+ Boten';      // 47
    h1En = 'Luxury Yacht Charter Phuket: 50ft+ Boats from $2,500/Day';
    h1Nl = 'Luxe yacht charter Phuket: 50ft+ jachten vanaf $2.500/dag';
    descEn = 'Looking for a luxury yacht charter in Phuket? Compare Sunseeker, Princess & Azimut superyachts $2.5K–15K/day with white-glove crew + Andaman routes.'.slice(0, 155);
    descNl = 'Op zoek naar een luxe yacht charter Phuket? Vergelijk Sunseeker, Princess & Azimut superjachten $2,5K–15K/dag met crew en Andaman-routes.'.slice(0, 155);
    kicker = 'Superyacht charter';
    kickerNl = 'Superjacht charter';
  } else if (spoke === 'phi-phi') {
    seoTitle = 'Yacht Charter Phuket to Phi Phi (2026): Day Trip Guide'; // 53
    seoTitleNl = 'Yacht Charter Phuket naar Phi Phi (2026): Dagtocht';   // 50
    h1En = 'Phuket to Phi Phi by Yacht: Maya Bay, Pileh Lagoon & Best Times';
    h1Nl = 'Phuket naar Phi Phi per jacht: Maya Bay, Pileh Lagoon & beste vertrek';
    descEn = 'Looking for a yacht charter from Phuket to Phi Phi? Day trips $500–1,500 private, 35–75 min each way, Maya Bay, Monkey Beach & Pileh Lagoon tips.'.slice(0, 155);
    descNl = 'Op zoek naar yacht charter Phuket naar Phi Phi? Dagtochten $500–1.500 privé, 35–75 min enkele reis, Maya Bay, Monkey Beach & Pileh Lagoon tips.'.slice(0, 155);
    kicker = 'Phi Phi day-charter';
    kickerNl = 'Phi Phi dagcharter';
  } else { // similan
    seoTitle = 'Yacht Charter Phuket to Similan (2026): Liveaboard Guide'; // 56
    seoTitleNl = 'Yacht Charter Phuket naar Similan (2026): Liveaboard';   // 51
    h1En = 'Phuket to Similan Islands: Multi-Day Yacht Liveaboards (Nov–May)';
    h1Nl = 'Phuket naar Similan-eilanden: meerdaagse yacht-liveaboards (nov–mei)';
    descEn = 'Looking for a yacht charter from Phuket to the Similan Islands? Liveaboards $1.5K–5K/day, 3-day minimum, Nov–May only, dive sites + booking tips.'.slice(0, 155);
    descNl = 'Op zoek naar yacht charter Phuket naar de Similans? Liveaboards $1,5K–5K/dag, min 3 dagen, alleen nov–mei, duikspots + boekingstips.'.slice(0, 155);
    kicker = 'Similan liveaboard';
    kickerNl = 'Similan liveaboard';
  }

  const titleFinal = isNl ? seoTitleNl : seoTitle;
  const descFinal = isNl ? descNl : descEn;
  const h1Final = isNl ? h1Nl : h1En;
  const kickerFinal = isNl ? kickerNl : kicker;

  const canonical = `https://go2-thailand.com${isNl ? '/nl' : ''}/yacht-charter-phuket/${spoke}/`;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, i) => ({
      '@type': 'ListItem', position: i + 1, name: b.name,
      item: `https://go2-thailand.com${isNl ? '/nl' : ''}${b.href}`,
    })),
  };

  // ---------- HERO STATS (4 quick stats per spoke) ----------
  const heroStats = (() => {
    if (spoke === 'luxury') {
      return [
        { label: isNl ? 'Bootmaat' : 'Boat size', value: '50–95 ft' },
        { label: isNl ? 'Prijs/dag' : 'Price/day', value: '$2,500–15,000' },
        { label: isNl ? 'Crew' : 'Crew', value: '3–8' },
        { label: isNl ? 'Beste seizoen' : 'Best season', value: 'Nov–Apr' },
      ];
    }
    if (spoke === 'phi-phi') {
      return [
        { label: isNl ? 'Vaartijd' : 'Travel time', value: '35–75 min' },
        { label: isNl ? 'Prijs privé' : 'Private price', value: '$500–1,500' },
        { label: isNl ? 'Park-fee' : 'Park fee', value: '$30 pp' },
        { label: isNl ? 'Beste vertrek' : 'Best departure', value: '07:00–08:00' },
      ];
    }
    return [
      { label: isNl ? 'Min duur' : 'Min length', value: isNl ? '3 dagen' : '3 days' },
      { label: isNl ? 'Prijs/dag' : 'Price/day', value: '$1,500–5,000' },
      { label: isNl ? 'Seizoen' : 'Season', value: 'Nov–May' },
      { label: isNl ? 'Eilanden' : 'Islands', value: '8 + Surin' },
    ];
  })();

  // ---------- COMPARISON / QUICK-FACT TABLE ROWS ----------
  const tableRows = (() => {
    if (spoke === 'luxury') {
      return [
        { label: isNl ? 'Sunseeker 60–95ft' : 'Sunseeker 60–95ft', spec: isNl ? '6–10 gasten' : '6–10 guests', price: '$3,000–8,000/d', best: isNl ? 'Stijl + snelheid' : 'Style + speed' },
        { label: 'Princess 55–78ft', spec: isNl ? '6–8 gasten' : '6–8 guests', price: '$2,500–6,500/d', best: isNl ? 'Britse afwerking' : 'British finish' },
        { label: 'Azimut 55–80ft', spec: isNl ? '6–10 gasten' : '6–10 guests', price: '$2,800–7,000/d', best: isNl ? 'Italiaans design' : 'Italian design' },
        { label: 'Pershing 70–115ft', spec: isNl ? '6–12 gasten' : '6–12 guests', price: '$5,000–15,000/d', best: isNl ? 'Performance, sport' : 'Performance, sport' },
        { label: isNl ? 'Sailing yacht 60ft+' : 'Sailing yacht 60ft+', spec: isNl ? '4–8 gasten' : '4–8 guests', price: '$1,800–4,500/d', best: isNl ? 'Zeilliefhebbers' : 'Sailing purists' },
      ];
    }
    if (spoke === 'phi-phi') {
      return [
        { label: isNl ? 'Speedboat 38ft' : 'Speedboat 38ft', spec: isNl ? '35 min enkele reis' : '35 min each way', price: '$400–700/d', best: isNl ? 'Snelste route' : 'Fastest route' },
        { label: isNl ? 'Motorjacht 50–60ft' : 'Motor yacht 50–60ft', spec: isNl ? '50 min enkele reis' : '50 min each way', price: '$700–1,200/d', best: isNl ? 'Comfort + snelheid' : 'Comfort + speed' },
        { label: isNl ? 'Catamaran 60–72ft' : 'Catamaran 60–72ft', spec: isNl ? '70 min enkele reis' : '70 min each way', price: '$900–1,500/d', best: isNl ? 'Stabiel, families' : 'Stable, families' },
        { label: isNl ? 'Sailing yacht 50ft+' : 'Sailing yacht 50ft+', spec: isNl ? '90+ min enkele reis' : '90+ min each way', price: '$700–1,400/d', best: isNl ? 'Zeilen, geen haast' : 'Sailing, no rush' },
      ];
    }
    return [
      { label: isNl ? 'Liveaboard standard' : 'Liveaboard standard', spec: isNl ? '3–4 dagen, 8 cabins' : '3–4 days, 8 cabins', price: '$1,500–2,500/d', best: isNl ? 'Eerste Similan-trip' : 'First Similan trip' },
      { label: isNl ? 'Liveaboard premium' : 'Liveaboard premium', spec: isNl ? '4–5 dagen, 6 cabins' : '4–5 days, 6 cabins', price: '$2,500–3,500/d', best: isNl ? 'Duikers, comfort' : 'Divers, comfort' },
      { label: isNl ? 'Privé motor-yacht' : 'Private motor yacht', spec: isNl ? '3–7 dagen, full charter' : '3–7 days, full charter', price: '$3,500–5,000/d', best: isNl ? 'Familie, vrienden' : 'Family, friends' },
      { label: isNl ? 'Sailing catamaran' : 'Sailing catamaran', spec: isNl ? '5–7 dagen, 4–6 cabins' : '5–7 days, 4–6 cabins', price: '$2,000–3,500/d', best: isNl ? 'Surin + Similan combo' : 'Surin + Similan combo' },
    ];
  })();

  // ---------- DETAILED SECTION CARDS ----------
  const sections = (() => {
    if (spoke === 'luxury') {
      return [
        {
          title: isNl ? "Wat zit erbij in een luxe charter?" : "What's included in a luxury charter?",
          body: isNl
            ? "Bij $2.500+/dag verwacht je: kapitein + bemanning (3–8 personen), kok aan boord, full open-bar (premium spirits, wijn, champagne), gourmet-lunch + diner, tenders + jet-ski's, snorkel + duikuitrusting, paddleboards. Brandstof tot 6 uur varen meestal inclusief — daarna apart ($300–800/u). Marine park fees ($30 pp) en hoteltransfers per limousine vaak apart maar onderhandelbaar."
            : "At $2,500+/day expect: captain + crew (3–8), onboard chef, full open bar (premium spirits, wine, champagne), gourmet lunch + dinner, tenders + jet skis, snorkel + dive gear, paddleboards. Fuel up to 6 hours usually included — beyond that billed separately ($300–800/h). Marine park fees ($30 pp) and limousine hotel transfers often extra but negotiable.",
        },
        {
          title: isNl ? 'Top operators in Phuket' : 'Top operators in Phuket',
          body: isNl
            ? "Asia Marine (Boat Lagoon Marina) — grootste luxe-fleet in Phuket, 60+ jachten, sterk service-record. Yacht Charter Andamans (Yacht Haven) — gespecialiseerd in zeilen + crewed motor yachts. Lee Marine (Royal Phuket Marina) — Sunseeker-dealer, sterk in 60–80ft segment. Northrop & Johnson — globale broker, voor 80ft+ superyachts en multi-week charters. Vergelijk altijd 2–3 quotes; bemanningservaring telt zwaarder dan 1m extra bootlengte."
            : "Asia Marine (Boat Lagoon Marina) — biggest luxury fleet in Phuket, 60+ yachts, strong service record. Yacht Charter Andamans (Yacht Haven) — specialised in sailing + crewed motor yachts. Lee Marine (Royal Phuket Marina) — Sunseeker dealer, strong 60–80ft segment. Northrop & Johnson — global broker, for 80ft+ superyachts and multi-week charters. Always compare 2–3 quotes; crew experience matters more than 1m extra hull length.",
        },
        {
          title: isNl ? 'Beste routes vanuit Phuket (3–7 dagen)' : 'Best routes from Phuket (3–7 days)',
          body: isNl
            ? "3-daagse: Phuket → Phi Phi → Krabi/Railay → terug. 5-daagse: voeg James Bond Bay (Phang Nga) en Koh Yao Yai/Noi toe — perfecte mix van karst-landschap en stille ankerplaatsen. 7-daagse (alleen nov–mei): Similan Islands en/of Surin Islands voor wereldklasse-duiken. Voor 10+ dagen: door naar de Mergui-archipel (Myanmar) — vereist extra papierwerk maar ongeëvenaard rust en lege eilanden."
            : "3-day: Phuket → Phi Phi → Krabi/Railay → back. 5-day: add James Bond Bay (Phang Nga) and Koh Yao Yai/Noi — perfect mix of karst landscape and quiet anchorages. 7-day (Nov–May only): Similan Islands and/or Surin Islands for world-class diving. For 10+ days: continue to Mergui Archipelago (Myanmar) — requires extra paperwork but unmatched silence and empty islands.",
        },
      ];
    }
    if (spoke === 'phi-phi') {
      return [
        {
          title: isNl ? "Wat zie je op een Phi Phi yacht-dagtocht?" : 'What you see on a Phi Phi yacht day trip',
          body: isNl
            ? "Standaard-route: Maya Bay (de The Beach-baai, dagelijkse limit 380 bezoekers — luxe-charters mogen ankeren maar niet aan land na 16:00), Pileh Lagoon (smaragdgroene cliff-baai, snorkel-spot), Viking Cave, Monkey Beach, Bamboo Island. Lunch ankert je in een rustige baai (meestal Loh Samah of Nui Bay). Beste reisvolgorde: Maya Bay vóór 09:30 of na 15:00 om de massa te ontwijken — speedboten dumpen 4.000+ mensen tussen 10:00 en 14:00."
            : "Standard route: Maya Bay (the The Beach cove, daily limit 380 visitors — luxury charters can anchor but no landing after 16:00), Pileh Lagoon (emerald cliff bay, snorkel spot), Viking Cave, Monkey Beach, Bamboo Island. Lunch anchors in a quiet bay (usually Loh Samah or Nui Bay). Best order: Maya Bay before 09:30 or after 15:00 to dodge crowds — speedboats dump 4,000+ people between 10:00 and 14:00.",
        },
        {
          title: isNl ? 'Boottype maakt het verschil (35 vs 75 min)' : 'Boat type makes the difference (35 vs 75 min)',
          body: isNl
            ? "Speedboat 38ft: 35 min naar Phi Phi Don, hobbelig in golven, weinig schaduw — niet ideaal voor seniors of jonge kinderen. Motorjacht 50–60ft: 50 min, glad en stabiel, eigen badkamer + binnenruimte. Catamaran 60–72ft: 70 min, het stabielst (twee rompen), groot zonnedek — beste familiekeuze. Zeiljacht: 90+ min als je wilt zeilen (charme), of motoren als je tijd op het eiland wilt maximaliseren."
            : "Speedboat 38ft: 35 min to Phi Phi Don, bumpy in chop, little shade — not ideal for seniors or young kids. Motor yacht 50–60ft: 50 min, smooth and stable, private bathroom + indoor area. Catamaran 60–72ft: 70 min, most stable (twin hulls), large sun deck — best family pick. Sailing yacht: 90+ min if you actually sail (charm), or motor across if you want to maximise island time.",
        },
        {
          title: isNl ? 'Vertrek + park-fees: details' : 'Departure + park fees: details',
          body: isNl
            ? "Beste vertrekmarinas voor Phi Phi: Royal Phuket Marina (centraal oost, 45 min vanaf Patong) of Chalong Pier (zuid, 30 min vanaf Karon, het dichtst bij Phi Phi). Yacht Haven Marina (noord-oost) ligt verder en kost 20–30 min extra varen. Phi Phi Marine National Park entry: $30 pp (kinderen $15) — meestal NIET inbegrepen bij privé-yacht charter, wel bij Klook/GYG-trips. Vraag bij booking expliciet of marine park fee is inbegrepen."
            : "Best departure marinas for Phi Phi: Royal Phuket Marina (central east, 45 min from Patong) or Chalong Pier (south, 30 min from Karon, closest to Phi Phi). Yacht Haven Marina (north-east) is further out and costs 20–30 min extra at sea. Phi Phi Marine National Park entry: $30 pp (kids $15) — usually NOT included on private yacht charters but IS bundled with Klook/GYG day trips. Always ask at booking whether the marine park fee is in.",
        },
      ];
    }
    return [
      {
        title: isNl ? 'Wat is een Similan-liveaboard?' : 'What is a Similan liveaboard?',
        body: isNl
          ? "De Similan-eilanden (9 eilanden, 84 km noord-west van Phuket) zijn UNESCO-genoteerd marine national park, alleen open van 15 oktober tot 15 mei. Geen overnachting toegestaan op land — daarom liveaboard: je slaapt aan boord. Standaard-route: 3 nachten, 4 dagen, 14–16 duiken op Richelieu Rock (Surin), Elephant Head Rock, Christmas Point, Boulder City. Boten vertrekken meestal 's avonds vanuit Tap Lamu Pier (1u30 noord van Phuket) of Phuket zelf — je slaapt onderweg en duikt ochtend dag 2."
          : "The Similan Islands (9 islands, 84 km north-west of Phuket) are a UNESCO-listed marine national park, only open 15 October to 15 May. No overnight on land allowed — hence liveaboard: you sleep onboard. Standard route: 3 nights, 4 days, 14–16 dives at Richelieu Rock (Surin), Elephant Head Rock, Christmas Point, Boulder City. Boats usually leave evening from Tap Lamu Pier (1h30 north of Phuket) or Phuket itself — you sleep en route and dive morning day 2.",
      },
      {
        title: isNl ? 'Beste duikspots + wat je ziet' : 'Best dive sites + what you see',
        body: isNl
          ? "Richelieu Rock (Surin Islands): legendarisch voor walvishaaien (jan–apr), mantarogs, school van barracudas. Elephant Head Rock (Similan #8): swim-throughs, leopard sharks, schildpadden. Christmas Point (Similan #9): grote granieten boulders, zeegrasvelden, bumphead parrotfish. Anita's Reef: zachte koralen, ideaal voor open water-niveau. Niet-duikers (snorkelaars) doen het beste in mei (begin laagseizoen) — minder duikboten, koralen nog goed."
          : "Richelieu Rock (Surin Islands): legendary for whale sharks (Jan–Apr), manta rays, schools of barracuda. Elephant Head Rock (Similan #8): swim-throughs, leopard sharks, turtles. Christmas Point (Similan #9): big granite boulders, seagrass meadows, bumphead parrotfish. Anita's Reef: soft corals, ideal for Open Water level. Non-divers (snorkellers) do best in May (start of low season) — fewer dive boats, corals still good.",
      },
      {
        title: isNl ? 'Combinatie Similan + Surin + Mergui' : 'Combine Similan + Surin + Mergui',
        body: isNl
          ? "5-daagse trip: Similan + Surin + Richelieu Rock — de standaard voor serieuze duikers. 7+ dagen: voeg Mergui-archipel (Myanmar) toe — 800+ eilanden, vrijwel onaangetast, vereist extra Burma-permit ($150–250 pp), papierwerk regelt operator. November + april zijn ideaal: water 28–29°C, zicht 25–30m, minste boten op de plek. Mid-mei boten gaan terug naar Phuket vóór de zomer-gesloten periode (15 mei sluit park officieel)."
          : "5-day trip: Similan + Surin + Richelieu Rock — the standard for serious divers. 7+ days: add Mergui Archipelago (Myanmar) — 800+ islands, near-untouched, requires extra Burma permit ($150–250 pp) which the operator handles. November and April are ideal: water 28–29°C, 25–30m visibility, fewest boats on site. By mid-May boats return to Phuket before the summer closure (park officially shuts 15 May).",
      },
    ];
  })();

  // ---------- BUYER'S GUIDE TIPS (5–7 per spoke) ----------
  const tips = (() => {
    if (spoke === 'luxury') {
      return [
        { strong: isNl ? 'Boek 2–3 maanden vooruit' : 'Book 2–3 months ahead', body: isNl ? '— top luxe-boten gaan in nov–apr 60–90 dagen vooruit op slot. Buiten hoogseizoen 3–4 weken meestal voldoende.' : '— top luxury boats book out 60–90 days ahead Nov–Apr. Outside high season 3–4 weeks usually enough.' },
        { strong: isNl ? 'APA-systeem begrijpen' : 'Understand the APA', body: isNl ? '— Advance Provisioning Allowance: 25–35% bovenop charter-prijs voor brandstof, eten, alcohol, marina-fees. Niet-uitgegeven deel krijg je terug.' : "— Advance Provisioning Allowance: 25–35% on top of charter price for fuel, food, alcohol, marina fees. Whatever isn't spent comes back to you." },
        { strong: isNl ? 'Tip-verwachting: 10–15%' : 'Crew tip expectation: 10–15%', body: isNl ? "— bovenop charter-prijs, contant aan einde van trip. 5% absoluut minimum, 20% bij uitzonderlijk service. Vraag operator of tip al in is verwerkt." : '— on top of charter price, cash at end of trip. 5% absolute minimum, 20% for exceptional service. Ask operator if tip is already bundled.' },
        { strong: isNl ? 'Charter-broker vs direct' : 'Charter broker vs direct', body: isNl ? '— bij 50ft+ helpt een gecertificeerde broker (MYBA/CYBA) bij contracten en geschillen. Geen extra kosten — broker krijgt 15% commissie van eigenaar.' : '— for 50ft+ a certified broker (MYBA/CYBA) helps with contracts and disputes. No extra cost to you — broker earns 15% from the owner side.' },
        { strong: isNl ? 'Reisverzekering check' : 'Check travel insurance', body: isNl ? '— veel polissen dekken geen yacht-charter $5K+/dag. Specifieke "yacht charter cancellation" verzekering kost 2–4% van charter-prijs.' : "— many policies don't cover yacht charters $5K+/day. Specific 'yacht charter cancellation' insurance costs 2–4% of charter price." },
        { strong: isNl ? 'Onderhandelen kan' : 'Negotiation works', body: isNl ? '— vraag altijd om gratis transfer, marine park fees inbegrepen, of een extra dag. 80% van operators komt 5–15% omlaag voor multi-day charters.' : '— always ask for free transfer, marine park fees included, or an extra day. 80% of operators come down 5–15% for multi-day charters.' },
      ];
    }
    if (spoke === 'phi-phi') {
      return [
        { strong: isNl ? 'Vertrek vroeg (07:00–08:00)' : 'Leave early (07:00–08:00)', body: isNl ? '— rustige zee, leeg Maya Bay vóór 09:30, je terug in marina vóór 16:00 als de zon-up wind opsteekt.' : '— calm sea, empty Maya Bay before 09:30, back at marina before 16:00 when afternoon wind picks up.' },
        { strong: isNl ? 'Maya Bay reservering vereist' : 'Maya Bay reservation required', body: isNl ? '— sinds 2022 dagelijks limit 380 bezoekers, vooraf via DNP-portal (operator regelt). Geen reservering = geen toegang.' : '— since 2022 daily cap 380 visitors, pre-booked via DNP portal (operator handles). No reservation = no entry.' },
        { strong: isNl ? 'Park-fee apart vragen' : 'Ask about park fees', body: isNl ? '— $30 pp ($15 kinderen), bij privé-charters meestal NIET inbegrepen. Voor groep van 6: $180 verschil.' : "— $30 pp ($15 kids), usually NOT included on private charters. For group of 6: $180 difference." },
        { strong: isNl ? 'Hoog seizoen = drukte' : 'High season = crowds', body: isNl ? '— jan–maart en jaarwisseling: 4.000+ dagbezoekers Phi Phi. Boek mei (begin laag-seizoen) of nov voor 60% minder boten op de plek.' : '— Jan–March and Christmas/NY: 4,000+ daytrippers on Phi Phi. Book May (start of low season) or Nov for 60% fewer boats onsite.' },
        { strong: isNl ? 'Snorkel en duik-stops plannen' : 'Plan snorkel + dive stops', body: isNl ? "— Pileh Lagoon (snorkel), Loh Samah (rays + reef), Bamboo Island (witste zand). Vraag operator om 2–3 stops naast Maya Bay." : '— Pileh Lagoon (snorkel), Loh Samah (rays + reef), Bamboo Island (whitest sand). Ask operator for 2–3 stops besides Maya Bay.' },
        { strong: isNl ? 'Lunch aan boord vs op het eiland' : 'Lunch onboard vs on island', body: isNl ? "— aan boord ankeren in een rustige baai is veel rustiger en standaard bij privé-yachts. Lunches op Phi Phi Don zijn duur ($25+) en druk." : "— anchoring in a quiet bay is much calmer and standard on private yachts. Restaurants on Phi Phi Don are expensive ($25+) and crowded." },
        { strong: isNl ? 'Kindersveiligheid op snelle boten' : 'Kid safety on fast boats', body: isNl ? '— speedboats hobbelen hard in chop, niet ideaal voor kids <6. Catamaran 60ft+ veel comfortabeler — twee rompen = stabiel.' : '— speedboats slam hard in chop, not ideal for kids under 6. Catamaran 60ft+ much more comfortable — twin hulls = stable.' },
      ];
    }
    return [
      { strong: isNl ? 'Alleen 15 oktober – 15 mei' : 'Only 15 October – 15 May', body: isNl ? '— park officieel gesloten in zuidwestmoesson. Boekingen voor jun–sep krijg je niet, en operators die het toch aanbieden zijn rood.' : '— park officially closed during south-west monsoon. Bookings for Jun–Sep do not exist, and any operator offering them is red-flag.' },
      { strong: isNl ? 'Minimaal 3 nachten' : 'Minimum 3 nights', body: isNl ? '— alles korter geeft 4u ankeren per dag verspilling. Best balance: 3 nachten = 14 duiken, 4 dagen = 16 duiken, 5 dagen = combo Similan + Surin + Mergui.' : '— anything shorter wastes 4h anchoring per day. Best balance: 3 nights = 14 dives, 4 days = 16 dives, 5 days = combo Similan + Surin + Mergui.' },
      { strong: isNl ? 'Walvishaaien-seizoen: jan–april' : 'Whale shark season: Jan–April', body: isNl ? '— Richelieu Rock (Surin) is dé hotspot. Boek 4–6 maanden vooruit, beste boten zijn al in oktober vol.' : '— Richelieu Rock (Surin) is THE hotspot. Book 4–6 months ahead, best boats fill up by October.' },
      { strong: isNl ? 'Open Water minimum' : 'Open Water minimum', body: isNl ? '— PADI Open Water of equivalent voor Similan duiken. Voor Richelieu Rock en swim-throughs: Advanced Open Water + 30 logged dives sterk aanbevolen.' : '— PADI Open Water or equivalent for Similan diving. For Richelieu Rock and swim-throughs: Advanced Open Water + 30 logged dives strongly recommended.' },
      { strong: isNl ? 'Niet-duikers welkom (mits genoeg duikers)' : 'Non-divers welcome (if enough divers)', body: isNl ? '— operators accepteren snorkelaars maar boot-prijs is duik-georiënteerd. Snorkel + 1 duik per dag haalbaar tegen flink lagere kosten.' : '— operators accept snorkellers but boat pricing is dive-oriented. Snorkel + 1 dive per day doable at much lower cost.' },
      { strong: isNl ? 'Marine park fee: $80 voor 4 dagen' : 'Marine park fee: $80 for 4 days', body: isNl ? '— $20 pp/dag, meestal apart van charter-prijs. Surin Islands extra fee. Bij Mergui-trip: Myanmar permit $150–250.' : '— $20 pp/day, usually separate from charter price. Surin Islands has extra fee. For Mergui trip: Myanmar permit $150–250.' },
      { strong: isNl ? 'Zeeziekte-tablets' : 'Pack motion-sickness tablets', body: isNl ? '— overtocht naar Similan 4–5u open water, kan in nov en apr golvig zijn. Stugeron of Bonine 1u voor vertrek.' : '— crossing to Similan 4–5h open water, can be choppy in Nov and Apr. Stugeron or Bonine 1h before departure.' },
    ];
  })();

  // ---------- FAQ (5 per spoke) ----------
  const faqEn = (() => {
    if (spoke === 'luxury') {
      return [
        { q: 'How much does a luxury yacht charter in Phuket actually cost?', a: 'Real-world 2026 day rates: 50–60ft motor yacht $2,500–4,000/day, 60–80ft $4,000–8,000/day, 80–95ft superyacht $8,000–15,000/day. Add 25–35% APA for fuel, food, alcohol and 10–15% crew tip on top. A 5-day charter on a 70ft Sunseeker with full crew, gourmet chef, Phi Phi + Phang Nga + Krabi route lands around $35,000–55,000 all-in for 8 guests.' },
        { q: 'Sunseeker, Princess, Azimut or Pershing — which is best?', a: 'Sunseeker (British) — sportiest profile, fastest, best resale; popular for sunset and short charters. Princess (British) — more interior comfort, slightly slower; better for 3–7 day cruising. Azimut (Italian) — best deck design and aesthetics; popular with influencer/photo charters. Pershing (Italian) — pure performance, 40+ knots, premium price, smaller interior. Most Phuket fleets carry all four; pick on cruising style not brand prestige.' },
        { q: 'Can I bareboat-charter a luxury yacht in Phuket?', a: "Technically yes (RYA Yachtmaster Offshore + ICC required, plus a sailing CV showing recent 50ft+ command), but practically every operator at the $2,500+/day tier insists on a captain. Reasons: insurance, local navigation knowledge (reefs, currents in Phang Nga), and asset value. A skipper adds $300–500/day at this tier — accept it." },
        { q: 'Which marina handles 80ft+ superyachts?', a: 'Ao Po Grand Marina (north Phuket) is the only one with deep-water berths and amenities for 80ft+. Boat Lagoon Marina handles up to 75ft. Yacht Haven Marina takes mid-size luxury (60–75ft). Royal Phuket Marina has shallower draft and is best for 50–65ft. For superyachts 100ft+, anchor-out + tender is also common.' },
        { q: 'Best season for a luxury yacht charter in Phuket?', a: 'November to April (north-east monsoon) is the only sensible window: calm Andaman Sea, 28–32°C water, low rain, all dive sites + Similans accessible. Peak demand mid-December to mid-February (Christmas, Chinese New Year) — book 3–4 months ahead and expect 20–30% premium. Best value: late November and April, full season weather minus the holiday surcharge.' },
      ];
    }
    if (spoke === 'phi-phi') {
      return [
        { q: 'How long does it take to reach Phi Phi from Phuket by yacht?', a: 'Speedboat 38ft: 35 minutes. Motor yacht 50–60ft: 45–55 minutes. Catamaran 60–72ft: 65–75 minutes. Sailing yacht under power: 90 minutes; sailing properly: 2–3 hours. Departure marina also matters — Chalong Pier is 15–20 min closer to Phi Phi than Yacht Haven Marina (north Phuket). Most full-day charters allow 5–6 hours at the islands.' },
        { q: 'Is Maya Bay open and can I land there?', a: "Yes — reopened January 2022 after a 4-year coral recovery. Daily cap of 380 visitors, time-slotted (typically 09:00–16:00), no swimming, no overnight, no anchoring inside the bay (anchor in Loh Samah and walk over). Yacht charters book the slot via the DNP (Department of National Parks) portal — operator handles it. Without a pre-booked slot you'll be turned away at the rangers' floating booth." },
        { q: 'How much is the Phi Phi marine park fee?', a: 'Hat Noppharat Thara–Mu Ko Phi Phi National Park: 400 THB ($30 USD pp) for adults, 200 THB ($15) for kids 4–14. Charged per day inside the park. Klook/GYG shared day trips include this in the price. Private yacht charters usually do NOT — confirm at booking. Pay rangers in cash THB at the Phi Phi pier or at Maya Bay.' },
        { q: 'What time should we leave Phuket for the best Phi Phi experience?', a: 'Depart 07:00–08:00 from Chalong/Royal Phuket. You arrive 09:00–09:30 — Maya Bay is still empty (cap 380 spread across the day). Snorkel Pileh Lagoon and Loh Samah 10:00–12:00, lunch onboard 12:30, Monkey Beach + Bamboo Island 14:00–15:30, head back 16:00 before afternoon chop picks up. Late starts (10:00+) hit Maya Bay during peak crowds and risk rough water on return.' },
        { q: 'Yacht to Phi Phi vs speedboat day tour — what is the real difference?', a: 'Speedboat day tour: $80–150 pp, 30 strangers on board, fixed schedule, ~3 hours at the islands, no shade, no private bathroom. Private yacht: $500–1,500/day for 6–8 guests, your route, your stops, full bathroom, lunch onboard in a quiet bay, 5–6 hours at the islands. For a couple: tour wins on price. For a family of 4+ or any group of 6+: private yacht is similar cost and a different experience.' },
      ];
    }
    return [
      { q: 'When can I do a Similan Islands liveaboard from Phuket?', a: 'Marine park officially open 15 October to 15 May only — closed during the south-west monsoon. Best diving: November through April. Whale shark and manta season: late January through early April at Richelieu Rock. Park officially shuts 16 May; any operator selling Similan trips for June–October is operating illegally or means somewhere else.' },
      { q: 'What is the minimum length for a Similan liveaboard trip?', a: '3 days / 3 nights (14 dives) is the practical minimum — anything shorter wastes too much travel time on the 84 km crossing. Standard premium trip is 4 days / 16 dives. To include Surin Islands and Richelieu Rock: minimum 5 days. To add Mergui Archipelago in Myanmar: 7+ days (and a $150–250 Burma permit, organised by the operator).' },
      { q: 'Do I need to be a certified diver to join a Similan liveaboard?', a: 'PADI Open Water (or equivalent) is the practical minimum for most boats. For Richelieu Rock pinnacle and Elephant Head Rock swim-throughs: Advanced Open Water + 30 logged dives strongly recommended. Some operators run Open Water + Advanced courses on board for an extra $300–500 (you finish certified + dive Similan). Snorkellers welcome on most boats but pricing stays dive-focused.' },
      { q: 'How much does a Similan liveaboard from Phuket cost?', a: 'Standard 3-day / 4-night liveaboard (8-cabin shared boat): $750–1,200 pp all-inclusive (cabin, all meals, all dives, tanks, weights, guide). Premium 4-day liveaboard (6-cabin): $1,400–1,800 pp. Private full-yacht charter for family/group of 6–8: $3,500–5,000/day all-in. Marine park fees ($20 pp/day) usually extra. Equipment rental $20–30/day if you do not bring your own.' },
      { q: 'Similan vs Surin — which is better for a Phuket liveaboard?', a: 'Similan (9 islands, 84 km from Phuket) — granite boulders, swim-throughs, leopard sharks, turtles, easier currents, beginner-friendly. Surin (5 islands, 60 km further north) — Richelieu Rock pinnacle (whale sharks, manta rays Jan–Apr), deeper structures, stronger currents, advanced level. Most 4-day+ trips combine both. Diving Similan only: pick 3 days. Want whale sharks: must include Surin and minimum 5 days.' },
    ];
  })();

  const faqNl = (() => {
    if (spoke === 'luxury') {
      return [
        { q: 'Wat kost een luxe yacht charter in Phuket echt?', a: '2026 dagprijzen: 50–60ft motorjacht $2.500–4.000/dag, 60–80ft $4.000–8.000/dag, 80–95ft superjacht $8.000–15.000/dag. Plus 25–35% APA voor brandstof, eten, alcohol en 10–15% crew-tip. Een 5-daagse charter op een 70ft Sunseeker met crew, kok, route Phi Phi + Phang Nga + Krabi: rond $35.000–55.000 all-in voor 8 gasten.' },
        { q: 'Sunseeker, Princess, Azimut of Pershing — wat is beter?', a: 'Sunseeker (Brits) — sportiefst profiel, snelst, beste resale; populair voor sunset en korte charters. Princess (Brits) — meer interieur-comfort, iets langzamer; beter voor 3–7 dagen cruisen. Azimut (Italiaans) — beste dekontwerp en esthetiek; populair bij influencer/foto-charters. Pershing (Italiaans) — pure performance, 40+ knopen, premium prijs, kleiner interieur. De meeste Phuket-vloten hebben alle vier; kies op vaarstijl, niet op merkprestige.' },
        { q: 'Kan ik een luxe jacht bareboat-charteren in Phuket?', a: 'Theoretisch ja (RYA Yachtmaster Offshore + ICC vereist, plus CV met recent 50ft+ commando), maar in de praktijk eist elke operator op $2.500+/dag-niveau een kapitein. Redenen: verzekering, lokale navigatiekennis (riffen, stromingen Phang Nga), bootwaarde. Skipper kost $300–500/dag op dit niveau — accepteer het.' },
        { q: 'Welke marina handelt 80ft+ superjachten?', a: 'Ao Po Grand Marina (noord Phuket) is de enige met diepwater-ligplaatsen en faciliteiten voor 80ft+. Boat Lagoon Marina tot 75ft. Yacht Haven Marina handelt mid-luxe (60–75ft). Royal Phuket Marina heeft minder diepe vaargeul, beste voor 50–65ft. Voor superyachts 100ft+: anchor-out + tender is ook gangbaar.' },
        { q: 'Beste seizoen voor luxe yacht charter in Phuket?', a: 'November tot april (noordoost-moesson) is het enige zinnige venster: rustige Andamanzee, 28–32°C water, weinig regen, alle duikspots + Similans toegankelijk. Piek-vraag mid-december tot mid-februari (Kerst, Chinees Nieuwjaar) — boek 3–4 maanden vooruit, verwacht 20–30% premie. Beste value: laat-november en april, volle seizoens-weer zonder vakantietoeslag.' },
      ];
    }
    if (spoke === 'phi-phi') {
      return [
        { q: 'Hoe lang duurt het naar Phi Phi vanuit Phuket per jacht?', a: 'Speedboat 38ft: 35 min. Motorjacht 50–60ft: 45–55 min. Catamaran 60–72ft: 65–75 min. Zeiljacht onder motor: 90 min; werkelijk zeilen: 2–3 uur. Vertrekmarina maakt verschil — Chalong Pier is 15–20 min dichter bij Phi Phi dan Yacht Haven Marina (noord Phuket). Meeste full-day charters bieden 5–6 uur op de eilanden.' },
        { q: 'Is Maya Bay open en mag je er aanmeren?', a: "Ja — heropend in januari 2022 na 4-jarig koraal-herstel. Daglimit 380 bezoekers, time-slot (meestal 09:00–16:00), geen zwemmen, geen overnachting, geen anker in de baai (anker in Loh Samah en loop). Yacht-charters boeken de slot via DNP-portal (operator regelt). Zonder pre-booked slot wordt je teruggestuurd bij de drijvende rangers-post." },
        { q: 'Wat kost de Phi Phi marine park fee?', a: 'Hat Noppharat Thara–Mu Ko Phi Phi National Park: 400 THB ($30) voor volwassenen, 200 THB ($15) voor kinderen 4–14. Per dag in het park. Klook/GYG-trips hebben dit inbegrepen. Privé-yacht charters meestal NIET — vraag bij boeking. Cash THB betalen aan de rangers bij Phi Phi pier of Maya Bay.' },
        { q: 'Hoe laat vertrek ik vanuit Phuket voor de beste Phi Phi-ervaring?', a: 'Vertrek 07:00–08:00 vanuit Chalong/Royal Phuket. Aankomst 09:00–09:30 — Maya Bay is nog leeg (cap 380 verspreid over de dag). Snorkel Pileh Lagoon en Loh Samah 10:00–12:00, lunch aan boord 12:30, Monkey Beach + Bamboo Island 14:00–15:30, terugvaren 16:00 vóór de middagchop. Late starts (10:00+) raken Maya Bay tijdens piekdrukte en riskeren ruwe terugreis.' },
        { q: 'Yacht naar Phi Phi vs speedboat day tour — wat is het echte verschil?', a: 'Speedboat day tour: $80–150 pp, 30 vreemden aan boord, vast schema, ~3u op de eilanden, geen schaduw, geen privé-toilet. Privé-jacht: $500–1.500/dag voor 6–8 gasten, eigen route, eigen stops, full bathroom, lunch in rustige baai, 5–6u op de eilanden. Stel: tour wint op prijs. Familie van 4+ of groep van 6+: privé-jacht is vergelijkbaar in kosten en een andere ervaring.' },
      ];
    }
    return [
      { q: 'Wanneer kun je een Similan liveaboard doen vanuit Phuket?', a: 'Park officieel open 15 oktober tot 15 mei — gesloten in zuidwestmoesson. Beste duiken: november–april. Walvishaaien + mantarogs: eind januari–begin april bij Richelieu Rock. Park sluit 16 mei; elke operator die Similan-trips voor jun–okt verkoopt is illegaal of bedoelt iets anders.' },
      { q: 'Wat is de minimumduur voor een Similan-liveaboard?', a: '3 dagen / 3 nachten (14 duiken) is praktisch minimum — alles korter verspilt de 84 km overtocht. Standaard premium: 4 dagen / 16 duiken. Inclusief Surin + Richelieu Rock: minimaal 5 dagen. Met Mergui-archipel (Myanmar): 7+ dagen (en $150–250 Burma-permit, regelt de operator).' },
      { q: 'Heb ik een duikbrevet nodig voor Similan-liveaboard?', a: 'PADI Open Water (of gelijkwaardig) is praktisch minimum. Voor Richelieu Rock-pinakel en Elephant Head Rock swim-throughs: Advanced Open Water + 30 gelogde duiken sterk aanbevolen. Sommige operators draaien Open Water + Advanced cursussen aan boord voor $300–500 extra (gecertificeerd na de trip). Snorkelaars welkom maar prijs is duik-georiënteerd.' },
      { q: 'Wat kost een Similan-liveaboard vanuit Phuket?', a: 'Standaard 3-daagse / 4 nachten liveaboard (8-cabin gedeeld): $750–1.200 pp all-in (cabin, alle maaltijden, alle duiken, tanks, gewichten, gids). Premium 4-daags (6-cabin): $1.400–1.800 pp. Privé full-yacht charter familie/groep 6–8: $3.500–5.000/dag all-in. Marine park fees ($20 pp/dag) meestal apart. Uitrustinghuur $20–30/dag.' },
      { q: 'Similan vs Surin — wat is beter voor een Phuket-liveaboard?', a: 'Similan (9 eilanden, 84 km vanaf Phuket) — granieten boulders, swim-throughs, leopard sharks, schildpadden, lichtere stromingen, beginner-vriendelijk. Surin (5 eilanden, 60 km verder noord) — Richelieu Rock pinakel (walvishaaien, mantarogs jan–apr), diepere structuren, sterkere stromingen, gevorderd niveau. Meeste 4-daagse+ trips combineren beide. Alleen Similan: 3 dagen. Walvishaaien: minimaal Surin + 5 dagen.' },
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
            {/* H1 — different from title per playbook, includes secondary keyword */}
            <h1 className="font-heading text-3xl lg:text-5xl font-bold mt-2">{h1Final}</h1>
            <p className="mt-4 text-lg lg:text-xl max-w-3xl opacity-95">
              {spoke === 'luxury' && (isNl
                ? "Phuket's marinas (Ao Po Grand, Yacht Haven, Royal Phuket, Boat Lagoon) huisvesten 200+ luxe-jachten van 50ft tot 130ft. Dit is wat je werkelijk uitgeeft, welke merken (Sunseeker, Princess, Azimut, Pershing) het beste passen, en welke operators (Asia Marine, Lee Marine, Yacht Charter Andamans) écht leveren."
                : "Phuket's marinas (Ao Po Grand, Yacht Haven, Royal Phuket, Boat Lagoon) host 200+ luxury yachts from 50ft to 130ft. Here's what you actually spend, which brands (Sunseeker, Princess, Azimut, Pershing) suit which trip, and which operators (Asia Marine, Lee Marine, Yacht Charter Andamans) genuinely deliver.")}
              {spoke === 'phi-phi' && (isNl
                ? "Phi Phi vanuit Phuket is dé yacht-dagtocht: Maya Bay, Pileh Lagoon, Monkey Beach, Bamboo Island. Vaartijd 35–75 min afhankelijk van bootformaat, marine park fee $30 pp, en als je vroeg vertrekt zie je Maya Bay nog leeg. Dit is hoe je het zonder fouten doet."
                : "Phi Phi from Phuket is the marquee yacht day trip: Maya Bay, Pileh Lagoon, Monkey Beach, Bamboo Island. Travel time 35–75 min depending on boat size, marine park fee $30 pp, and an early start means Maya Bay before the crowds. Here's how to do it right.")}
              {spoke === 'similan' && (isNl
                ? "De Similan-eilanden zijn alleen 15 oktober–15 mei toegankelijk en alleen per liveaboard — geen overnachting op land. Walvishaaien jan–apr, 9 granieten eilanden, world-class duiken bij Richelieu Rock. Dit is wat je nodig hebt, wat het kost en welke operator past."
                : "The Similan Islands are accessible only 15 October–15 May, and only by liveaboard — no overnight on land. Whale sharks Jan–April, 9 granite islands, world-class diving at Richelieu Rock. Here's what you need, what it costs, and which operator fits.")}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={withSubId(primaryUrl, placementSubId('hero-primary'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-6 py-3 text-base font-semibold hover:bg-red-700 shadow-lg">
                {spoke === 'luxury' && (isNl ? 'Bekijk luxe yacht-trips op Klook' : 'See luxury yacht trips on Klook')}
                {spoke === 'phi-phi' && (isNl ? 'Bekijk Phi Phi yacht-trips op Klook' : 'See Phi Phi yacht trips on Klook')}
                {spoke === 'similan' && (isNl ? 'Bekijk Similan-liveaboards op Klook' : 'See Similan liveaboards on Klook')}
                {' '}→
              </a>
              <a href={withSubId(secondaryUrl, placementSubId('hero-secondary'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-white text-thailand-blue border border-white/40 px-6 py-3 text-base font-semibold hover:bg-white/90">
                {isNl ? 'Vergelijk op Viator' : 'Compare on Viator'} →
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
              {spoke === 'luxury' && (isNl ? 'Luxe jachten vergeleken' : 'Luxury yachts compared')}
              {spoke === 'phi-phi' && (isNl ? 'Boottypes naar Phi Phi vergeleken' : 'Boat types to Phi Phi compared')}
              {spoke === 'similan' && (isNl ? 'Similan-liveaboard opties vergeleken' : 'Similan liveaboard options compared')}
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
                      <td className="px-4 py-3"><a href={withSubId(primaryUrl, placementSubId(`table-row-${i}`))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="text-thailand-red font-semibold hover:underline whitespace-nowrap">{isNl ? 'Bekijk →' : 'See deals →'}</a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-gray-500">{isNl ? 'Prijzen zijn 2026 hoogseizoen-tarieven (nov–apr). Mei–okt meestal 30–40% lager (Similan-park gesloten 16 mei–14 okt). Marine park fees, tip, transfer vaak apart bij privé-charters.' : 'Prices are 2026 high-season rates (Nov–Apr). May–Oct usually 30–40% cheaper (Similan park closed 16 May–14 Oct). Marine park fees, tip, transfers often extra on private charters.'}</p>
          </section>

          {/* Top pick callout */}
          <section className="rounded-2xl bg-thailand-red/5 border-2 border-thailand-red p-6">
            <span className="inline-block rounded-full bg-thailand-red text-white text-xs font-bold uppercase tracking-wide px-3 py-1 mb-3">⭐ {isNl ? 'Onze keuze' : 'Our pick'}</span>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">
              {spoke === 'luxury' && (isNl ? 'Sunseeker 70ft via Asia Marine of Lee Marine' : 'Sunseeker 70ft via Asia Marine or Lee Marine')}
              {spoke === 'phi-phi' && (isNl ? 'Privé-motorjacht 50–60ft, vertrek 07:30 vanaf Royal Phuket Marina' : 'Private 50–60ft motor yacht, 07:30 departure from Royal Phuket Marina')}
              {spoke === 'similan' && (isNl ? '4-daagse premium liveaboard (Similan + Surin + Richelieu Rock)' : '4-day premium liveaboard (Similan + Surin + Richelieu Rock)')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              {spoke === 'luxury' && (isNl
                ? 'Voor groepen van 6–8 die echte luxe willen zonder superyacht-prijzen: een 70ft Sunseeker geeft je 30+ knopen, vier cabins, full crew en je kunt Phi Phi + Phang Nga + Krabi in 3 dagen comfortabel doen. $4.500–6.500/dag, beste value op de markt voor wie kwaliteit boven absolute grootte plaatst.'
                : 'For groups of 6–8 who want real luxury without superyacht pricing: a 70ft Sunseeker delivers 30+ knots, four cabins, full crew and easily covers Phi Phi + Phang Nga + Krabi in 3 days. $4,500–6,500/day — best value on the market for travelers who prioritise quality over absolute size.')}
              {spoke === 'phi-phi' && (isNl
                ? 'Voor families en groepen tot 8: privé-motorjacht 50–60ft, vertrek 07:30 vanuit Royal Phuket Marina, Maya Bay slot 09:00, lunch in een rustige baai, terug 16:30. $700–1.200/dag inclusief skipper en brandstof. Vraag expliciet of marine park fee ($30 pp) is inbegrepen.'
                : 'For families and groups up to 8: private 50–60ft motor yacht, 07:30 departure from Royal Phuket Marina, Maya Bay slot 09:00, lunch in a quiet bay, back 16:30. $700–1,200/day including skipper and fuel. Always confirm whether marine park fee ($30 pp) is included.')}
              {spoke === 'similan' && (isNl
                ? 'Beste balans tussen tijd en kosten: 4 dagen, 16 duiken, Similan #1–9 + Surin + Richelieu Rock (walvishaaien jan–apr). $1.400–1.800 pp all-in op een 6-cabin premium boot. Boek 3–4 maanden vooruit voor het hoogseizoen — beste boten zijn al in oktober vol.'
                : 'Best balance of time and cost: 4 days, 16 dives, Similan #1–9 + Surin + Richelieu Rock (whale sharks Jan–Apr). $1,400–1,800 pp all-in on a 6-cabin premium boat. Book 3–4 months ahead for high season — best boats fill by October.')}
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={withSubId(primaryUrl, placementSubId('toppick-primary'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">
                {isNl ? 'Bekijk op Klook' : 'See on Klook'} →
              </a>
              <a href={withSubId(secondaryUrl, placementSubId('toppick-secondary'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="inline-flex items-center rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">
                {isNl ? 'Bekijk op Viator' : 'See on Viator'} →
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
              {spoke === 'luxury' && (isNl ? 'Boekingstips luxe charter' : 'Booking tips for luxury charter')}
              {spoke === 'phi-phi' && (isNl ? 'Boekingstips Phi Phi-charter' : 'Booking tips for Phi Phi charter')}
              {spoke === 'similan' && (isNl ? 'Boekingstips Similan-liveaboard' : 'Booking tips for Similan liveaboard')}
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
                {isNl ? 'Andere yacht charter opties in Phuket' : 'Other yacht charter options in Phuket'}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {siblings.map(s => (
                  <Link key={s} href={`/yacht-charter-phuket/${s}/`} className="block rounded-2xl bg-white p-4 shadow-sm border border-gray-200 hover:border-thailand-blue transition-colors">
                    <p className="font-heading font-bold text-gray-900">{isNl ? SPOKE_LABELS[s].nl : SPOKE_LABELS[s].en}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {s === 'luxury' && (isNl ? 'Superjachten 50ft+, $2.500–15.000/dag' : 'Superyachts 50ft+, $2,500–15,000/day')}
                      {s === 'phi-phi' && (isNl ? 'Dagtocht naar Maya Bay, 35–75 min vaartijd' : 'Day trip to Maya Bay, 35–75 min travel time')}
                      {s === 'similan' && (isNl ? 'Liveaboard 3–7 dagen, alleen nov–mei' : 'Liveaboard 3–7 days, Nov–May only')}
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
              {spoke === 'luxury' && (isNl ? 'Plan de rest van je luxe Phuket-trip' : 'Plan the rest of your luxury Phuket trip')}
              {spoke === 'phi-phi' && (isNl ? 'Plan de rest van je Phuket-vakantie' : 'Plan the rest of your Phuket vacation')}
              {spoke === 'similan' && (isNl ? 'Plan je Phuket-trip rond de liveaboard' : 'Plan your Phuket trip around the liveaboard')}
            </h2>
            <p className="mt-2 text-gray-700">{isNl ? 'Je yacht charter is geregeld — werk de rest af:' : 'Yacht charter sorted — wrap up the rest:'}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {/* UP to pillar — anchor variation */}
              <Link href="/yacht-charter-phuket/" className="rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">
                {isNl ? '⛵ Alle 6 yacht-tiers vergelijken' : '⛵ Compare all 6 yacht tiers'}
              </Link>
              {/* Cross-cluster */}
              <Link href="/best-hotels/phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">
                {isNl ? '🏨 Beste hotels in Phuket' : '🏨 Best hotels in Phuket'}
              </Link>
              <Link href="/flights-to-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">
                {isNl ? '✈️ Vluchten naar Phuket' : '✈️ Flights to Phuket'}
              </Link>
              <Link href="/car-rental-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">
                {isNl ? '🚗 Auto huren naar de marina' : '🚗 Rent a car to the marina'}
              </Link>
              <Link href="/city/phuket/" className="rounded-full bg-white text-gray-900 border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50">
                {isNl ? '📖 Phuket reisgids' : '📖 Phuket travel guide'}
              </Link>
              <a href={withSubId(KLOOK_GENERIC, placementSubId('mesh-klook'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">
                {isNl ? '🎟️ Andere Phuket activiteiten' : '🎟️ Other Phuket activities'}
              </a>
              <a href={withSubId(TWELVEGO_GENERIC, placementSubId('mesh-12go'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-white text-gray-900 border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50">
                {isNl ? '🚌 Vervoer naar Phuket' : '🚌 Transport to Phuket'}
              </a>
            </div>
          </section>

          {/* Methodology */}
          <section className="rounded-2xl bg-gray-50 border border-gray-200 p-6 text-sm text-gray-700">
            <h2 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? 'Hoe we vergeleken' : 'How we compared'}</h2>
            <p>{isNl ? 'Tarieven en boot-specs geverifieerd in mei 2026 op Klook, Viator en operator-websites (Asia Marine, Lee Marine, Yacht Charter Andamans). Marine park-fees gevalideerd via DNP-portal. We verdienen commissie op boekingen via genoemde platforms — dit verandert niets aan de prijs of welke operators we noemen.' : "Rates and boat specs verified May 2026 on Klook, Viator and operator websites (Asia Marine, Lee Marine, Yacht Charter Andamans). Marine park fees validated via DNP portal. We earn a commission on bookings through the listed platforms — this never changes the price you pay or which operators we cover."}</p>
          </section>
        </main>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const file = path.join(process.cwd(), 'data', 'pseo', 'yacht-charter', 'phuket-spokes.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const paths = (data.spokes as SpokeMeta[]).map(s => ({ params: { spoke: s.slug } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.spoke as SpokeSlug;
  if (!slug) return { notFound: true, revalidate: 60 };

  const partnersFile = path.join(process.cwd(), 'data', 'pseo', 'yacht-charter', 'phuket-partners.json');
  const spokesFile = path.join(process.cwd(), 'data', 'pseo', 'yacht-charter', 'phuket-spokes.json');
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
