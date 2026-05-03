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

type SpokeSlug = 'beach' | 'resort-packages' | 'villa';

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
  'beach': { en: 'Beach wedding venues', nl: 'Strand-trouwlocaties' },
  'resort-packages': { en: 'Resort wedding packages', nl: 'Resort wedding-pakketten' },
  'villa': { en: 'Private villa weddings', nl: 'Privé-villa weddings' },
};

export default function PhuketWeddingSpokePage({ spoke, primaryUrl, secondaryUrl, partners, siblings, lastUpdated }: Props) {
  const { locale } = useRouter();
  const isNl = locale === 'nl';
  const subId = useSubId();
  const placement = (slot: string) => `${subId}-pseo-phuket-wedding-${spoke}-${slot}`;

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: isNl ? 'Phuket trouwlocaties' : 'Phuket Wedding Venues', href: '/phuket-wedding-venues/' },
    { name: isNl ? SPOKE_LABELS[spoke].nl : SPOKE_LABELS[spoke].en, href: `/phuket-wedding-venues/${spoke}/` },
  ];

  // Title <60, keyword first, modifier; H1 different word order; meta <155, question hook
  let seoTitle = '', seoTitleNl = '', h1En = '', h1Nl = '', descEn = '', descNl = '', kicker = '', kickerNl = '';

  if (spoke === 'beach') {
    seoTitle = 'Beach Wedding Venues Phuket (2026): 7 Top Picks';      // 50
    seoTitleNl = 'Strand-trouwlocaties Phuket (2026): 7 Top-keuzes';   // 51
    h1En = 'Phuket Beach Weddings: 7 Private Beach Venues + Real Costs';
    h1Nl = 'Phuket strand-bruiloften: 7 privé-strand venues + echte kosten';
    descEn = 'Looking for a beach wedding venue in Phuket? Compare 7 private-beach resorts (Trisara, Amanpuri, The Surin), packages $2,800–12,000 + tips.';
    descNl = 'Op zoek naar een strand-trouwlocatie in Phuket? Vergelijk 7 privé-strand resorts (Trisara, Amanpuri, The Surin), pakketten $2.800–12.000.';
    kicker = 'Beach wedding venues';
    kickerNl = 'Strand-trouwlocaties';
  } else if (spoke === 'resort-packages') {
    seoTitle = 'Phuket Wedding Packages Resort (2026): 6 Compared';     // 49
    seoTitleNl = 'Phuket Wedding-pakketten Resort (2026): 6 Vergeleken'; // 51
    h1En = 'Phuket Resort Wedding Packages: 6 All-Inclusive Picks Compared';
    h1Nl = 'Phuket resort wedding-pakketten: 6 all-inclusive opties vergeleken';
    descEn = 'Looking for Phuket resort wedding packages? Compare 6 all-inclusive deals (Banyan Tree, JW Marriott, Sri Panwa) from $2,800 to $15,000+.';
    descNl = 'Op zoek naar Phuket resort wedding-pakketten? Vergelijk 6 all-inclusive deals (Banyan Tree, JW Marriott, Sri Panwa) van $2.800 tot $15.000+.';
    kicker = 'Resort wedding packages';
    kickerNl = 'Resort wedding-pakketten';
  } else { // villa
    seoTitle = 'Phuket Villa Wedding (2026): 5 Private Takeover Picks'; // 51
    seoTitleNl = 'Phuket Villa Bruiloft (2026): 5 Privé-villa Picks';   // 49
    h1En = 'Private Villa Weddings in Phuket: 5 Multi-Day Takeover Venues';
    h1Nl = 'Privé-villa bruiloften Phuket: 5 multi-day takeover venues';
    descEn = 'Looking for a private villa wedding in Phuket? Compare 5 multi-day takeover venues (Andara, Villa Aye, Padma) for 20–60 guests $8K–25K/night.';
    descNl = 'Op zoek naar privé-villa bruiloft Phuket? Vergelijk 5 multi-day takeover venues (Andara, Villa Aye, Padma) voor 20–60 gasten $8K–25K/nacht.';
    kicker = 'Private villa weddings';
    kickerNl = 'Privé-villa weddings';
  }

  const titleFinal = isNl ? seoTitleNl : seoTitle;
  const descFinal = isNl ? descNl : descEn;
  const h1Final = isNl ? h1Nl : h1En;
  const kickerFinal = isNl ? kickerNl : kicker;

  const canonical = `https://go2-thailand.com${isNl ? '/nl' : ''}/phuket-wedding-venues/${spoke}/`;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, i) => ({
      '@type': 'ListItem', position: i + 1, name: b.name,
      item: `https://go2-thailand.com${isNl ? '/nl' : ''}${b.href}`,
    })),
  };

  // Hero stats
  const heroStats = (() => {
    if (spoke === 'beach') {
      return [
        { label: isNl ? 'Capaciteit' : 'Capacity', value: '20–250' },
        { label: isNl ? 'Pakket vanaf' : 'Package from', value: '$2,800' },
        { label: isNl ? 'Beste maand' : 'Best month', value: 'Nov–Feb' },
        { label: isNl ? 'Backup-tent' : 'Backup tent', value: isNl ? 'Aanbevolen' : 'Recommended' },
      ];
    }
    if (spoke === 'resort-packages') {
      return [
        { label: isNl ? 'Pakket-tier' : 'Package tier', value: '6 ' + (isNl ? 'opties' : 'options') },
        { label: isNl ? 'Prijsrange' : 'Price range', value: '$2,800–15,000+' },
        { label: isNl ? 'Capaciteit' : 'Capacity', value: '20–300' },
        { label: isNl ? 'Boek vooruit' : 'Book ahead', value: '6–12 mo' },
      ];
    }
    return [
      { label: isNl ? 'Slaapkamers' : 'Bedrooms', value: '5–10' },
      { label: isNl ? 'Villa/nacht' : 'Villa/night', value: '$8K–25K' },
      { label: isNl ? 'Gasten' : 'Guests', value: '20–60' },
      { label: isNl ? 'Min nachten' : 'Min nights', value: '3' },
    ];
  })();

  // Comparison table rows
  const tableRows = (() => {
    if (spoke === 'beach') {
      return [
        { label: 'Trisara (Layan)', spec: isNl ? '300m privé strand' : '300m private beach', price: '$7,500+', best: isNl ? 'Iconic luxe ceremonie' : 'Iconic luxury ceremony' },
        { label: 'Amanpuri (Pansea)', spec: isNl ? 'Privé bay, 40 villa\'s' : 'Private bay, 40 villas', price: '$12,000+', best: isNl ? 'Klein, sereen, exclusief' : 'Small, serene, exclusive' },
        { label: 'The Surin (Pansea)', spec: isNl ? '125m privé strand' : '125m private beach', price: '$4,200+', best: isNl ? 'Mid-luxe, sterk eten' : 'Mid-luxury, strong dining' },
        { label: 'JW Marriott Mai Khao', spec: isNl ? '11km onbebouwd strand' : '11km undeveloped beach', price: '$3,800+', best: isNl ? 'Grote groepen 100+' : 'Large groups 100+' },
        { label: 'The Slate (Nai Yang)', spec: isNl ? 'Boutique design strand' : 'Boutique design beach', price: '$3,200+', best: isNl ? 'Indoor + outdoor flex' : 'Indoor + outdoor flex' },
        { label: 'Banyan Tree (Bang Tao)', spec: isNl ? 'Lagune + strand' : 'Lagoon + beach', price: '$4,500+', best: isNl ? 'Spa-resort vibe' : 'Spa-resort vibe' },
        { label: 'Anantara Mai Khao', spec: isNl ? 'Quiet 8km beach' : 'Quiet 8km beach', price: '$3,500+', best: isNl ? 'Stelletjes en kleine groep' : 'Couples + small groups' },
      ];
    }
    if (spoke === 'resort-packages') {
      return [
        { label: 'Sri Panwa (cliffside)', spec: isNl ? '20–150 gasten' : '20–150 guests', price: '$5,500+', best: isNl ? 'Heuveltop sunset' : 'Hilltop sunset' },
        { label: 'Trisara (beach + tuin)', spec: isNl ? '20–120 gasten' : '20–120 guests', price: '$7,500+', best: isNl ? 'Iconic luxe' : 'Iconic luxury' },
        { label: 'Banyan Tree (lagune)', spec: isNl ? '20–200 gasten' : '20–200 guests', price: '$4,500+', best: isNl ? 'Spa-resort all-in' : 'Spa-resort all-in' },
        { label: 'JW Marriott Mai Khao', spec: isNl ? '20–300 gasten' : '20–300 guests', price: '$3,800+', best: isNl ? 'Grootste capaciteit' : 'Largest capacity' },
        { label: 'The Slate (Nai Yang)', spec: isNl ? '20–250 gasten' : '20–250 guests', price: '$3,200+', best: isNl ? 'Boutique design' : 'Boutique design' },
        { label: 'Cape Sienna (Kamala)', spec: isNl ? '20–80 gasten' : '20–80 guests', price: '$2,800+', best: isNl ? 'Mid-budget cliffside' : 'Mid-budget cliffside' },
      ];
    }
    return [
      { label: 'Andara Resort (Kamala)', spec: isNl ? '5–9 slk\'s, 20–60 gasten' : '5–9 br, 20–60 guests', price: '$8,000–18,000/n', best: isNl ? 'Resort-services + privé' : 'Resort services + private' },
      { label: 'Villa Aye (Kamala)', spec: isNl ? '6 slk\'s, 12 gasten verblijf' : '6 br, 12 guest stay', price: '$3,500–8,500/n', best: isNl ? 'Hilltop privé takeover' : 'Hilltop private takeover' },
      { label: 'Villa Padma (Kamala)', spec: isNl ? '6 slk\'s, oceaanview' : '6 br, ocean view', price: '$4,500–10,000/n', best: isNl ? 'Cliffside grote events' : 'Cliffside large events' },
      { label: 'Sava Beach Villas (Natai)', spec: isNl ? '4–7 slk\'s, beachfront' : '4–7 br, beachfront', price: '$3,000–9,500/n', best: isNl ? 'Multi-villa estate' : 'Multi-villa estate' },
      { label: 'Villa Amanzi (Kata Noi)', spec: isNl ? '6 slk\'s, dramatic view' : '6 br, dramatic view', price: '$5,500–12,500/n', best: isNl ? 'Iconic photo-fame' : 'Iconic photo fame' },
    ];
  })();

  // Detailed sections
  const sections = (() => {
    if (spoke === 'beach') {
      return [
        { title: isNl ? 'Privé strand vs publiek strand — groot verschil' : 'Private beach vs public beach — big difference',
          body: isNl
            ? 'In Thailand zijn alle stranden technisch publiek tot aan de hoogwater-lijn. Resorts met "privé strand" hebben in de praktijk: gated toegang, beach-attendants die niet-gasten weren, exclusieve setup-zones. Trisara, Amanpuri, The Surin en Andara bieden dit. JW Marriott Mai Khao en Anantara claimen ook privé maar je houdt af en toe wandelaars op het strand. Voor onverstoorde foto-momenten: kies écht-privé (boutique resorts).'
            : 'In Thailand all beaches are technically public up to the high-tide line. Resorts with "private beach" practically mean: gated access, beach attendants who turn away non-guests, exclusive setup zones. Trisara, Amanpuri, The Surin and Andara deliver this. JW Marriott Mai Khao and Anantara claim private but you may still get walkers passing through. For undisturbed photo moments: pick genuinely-private (boutique resorts).' },
        { title: isNl ? 'Wat zit er in een strand-pakket?' : "What's in a beach wedding package?",
          body: isNl
            ? 'Bij $3.000+ verwacht je: ceremonie-setup (sand-aisle, witte stoelen, bloem-arch), bilingual MC, basic decor, kleine ronde-tafel receptie voor 20 gasten, 2u fotograaf, basis-bouquet, ceremony-cake. Niet-inbegrepen: bloemen-upgrade ($500–2.000), uitgebreidere foto/video ($800–3.500), extra gasten ($80–150 pp), open-bar upgrade ($30–60 pp), regen-backup tent ($500–1.500). Vraag detail-breakdown vóór tekenen.'
            : 'At $3,000+ expect: ceremony setup (sand aisle, white chairs, flower arch), bilingual MC, basic decor, small round-table reception for 20 guests, 2h photographer, basic bouquet, ceremony cake. NOT included: flower upgrades ($500–2,000), extended photo/video ($800–3,500), extra guests ($80–150 pp), open-bar upgrade ($30–60 pp), rain backup tent ($500–1,500). Always request a detailed breakdown before signing.' },
        { title: isNl ? 'Beste tijd op de dag voor strand-ceremonie' : 'Best time of day for a beach ceremony',
          body: isNl
            ? '15:30–17:00 ceremonie is sweet spot. Te vroeg (12:00–14:00) = pittige zon, gasten zweten, slechte foto-licht. Te laat (na 18:00) = donker tijdens vows. Sunset-ceremonie aansluitend op cocktail-uur 17:00–18:30 werkt perfect: gouden-uur fotos tijdens vows, eerste schemering tijdens de toast, vol diner onder lampions. Eb-getij check: laag tij geeft 30m breder strand voor setup.'
            : '15:30–17:00 ceremony is the sweet spot. Too early (12:00–14:00) = harsh sun, sweating guests, bad photo light. Too late (after 18:00) = dark during vows. Sunset ceremony into cocktail hour 17:00–18:30 works perfectly: golden-hour photos during vows, twilight during toasts, full dinner under lanterns. Tide check: low tide gives 30m extra beach width for setup.' },
      ];
    }
    if (spoke === 'resort-packages') {
      return [
        { title: isNl ? 'Pakket-tiers: $2.800 vs $7.500 vs $15.000+' : 'Package tiers: $2,800 vs $7,500 vs $15,000+',
          body: isNl
            ? '$2.800–4.500 (Cape Sienna, The Slate, Anantara): 20–40 gasten, basic ceremonie + 3-gangen diner, basis-bloemen, 2u fotograaf, MC, geluid. $4.500–7.500 (Banyan Tree, JW Marriott, Sri Panwa): 40–80 gasten, premium-decor, 4u foto + 2u video, open-bar, betere bloemen, hair/make-up trial. $7.500–15.000+ (Trisara, Amanpuri): 60–120 gasten, luxe-decor, full-day fotograaf + cinematic video, premium-bar (champagne), live-muziek, custom-cake.'
            : '$2,800–4,500 (Cape Sienna, The Slate, Anantara): 20–40 guests, basic ceremony + 3-course dinner, basic flowers, 2h photographer, MC, sound. $4,500–7,500 (Banyan Tree, JW Marriott, Sri Panwa): 40–80 guests, premium decor, 4h photo + 2h video, open bar, better flowers, hair/makeup trial. $7,500–15,000+ (Trisara, Amanpuri): 60–120 guests, luxury decor, full-day photographer + cinematic video, premium bar (champagne), live music, custom cake.' },
        { title: isNl ? 'Wat valt buiten élk pakket' : 'What every package excludes',
          body: isNl
            ? 'Standaard NIET in resort-pakketten: legal Thai-paperwork ($400–800 via planner), gasten-overnachting (resort geeft soms 10–20% korting voor wedding-block), gasten-transport tussen ceremonie en receptie ($30–60 pp shuttle), import-bloemen (lokale bloemen wel), pre-wedding photoshoot ($600–1.500), maid-of-honor/bestman accommodatie. Internationale stellen onderschatten dit gemiddeld 25–35%.'
            : 'Standard exclusions: legal Thai paperwork ($400–800 via planner), guest accommodation (resort sometimes gives 10–20% off for wedding block), guest transport between ceremony and reception ($30–60 pp shuttle), imported flowers (local flowers are in), pre-wedding photoshoot ($600–1,500), maid-of-honor/bestman accommodation. International couples typically underestimate this by 25–35%.' },
        { title: isNl ? 'Onderhandelen werkt — waar precies' : 'Negotiation works — exactly where',
          body: isNl
            ? 'Kamer-block: 10–20% korting voor 10+ kamers, "release date" 60 dagen vóór. Cancellation-policy: vraag voor 90-dagen-voor 25% refund i.p.v. de standaard 0%. Free room-upgrade voor bruidspaar (always granted). Welcome-drink op aankomst voor élke gast (resort betaalt). Rehearsal-dinner: 25% korting op à-la-carte voor het bruidsgezelschap. Photographer-uren: extra 1–2u meestal gratis bij 6+ uur basis.'
            : 'Room block: 10–20% off for 10+ rooms, "release date" 60 days before. Cancellation: ask for 25% refund 90 days out instead of the standard 0%. Free room upgrade for bridal couple (always granted). Welcome drink on arrival for every guest (resort pays). Rehearsal dinner: 25% off à-la-carte for the bridal party. Photographer hours: extra 1–2h often free with a 6+h base.' },
      ];
    }
    return [
      { title: isNl ? 'Waarom een privé-villa nemen' : 'Why pick a private villa',
        body: isNl
          ? '5 redenen: (1) Total privacy — geen vreemden in foto\'s, geen lobbies, geen room-divider muziek. (2) Multi-day events: bruidsmeisjes-uitje, rehearsal dinner, bruiloft, brunch — allemaal in één spot. (3) Eigen kok mogelijk — je menu, niet resort-menu. (4) Bruidsgezelschap blijft samen 3–7 nachten i.p.v. verspreid over hotel-kamers. (5) Multi-villa estates (Sava Beach, Andara) huisvesten 30–60 mensen. Werkt vooral als 30%+ van gasten 3+ nachten blijft.'
          : '5 reasons: (1) Total privacy — no strangers in photos, no lobbies, no room-divider music. (2) Multi-day events: bridesmaid bonding, rehearsal dinner, wedding, brunch — all in one place. (3) Your own chef option — your menu, not the resort\'s. (4) Bridal party stays together 3–7 nights instead of scattered across hotel rooms. (5) Multi-villa estates (Sava Beach, Andara) host 30–60 people. Works best when 30%+ of guests stay 3+ nights.' },
      { title: isNl ? 'Wat je écht uitgeeft (totaal)' : 'What you actually spend (total)',
        body: isNl
          ? 'Een 4-nachten villa-takeover voor 30 gasten: villa $40.000 (4× $10.000/n premium), wedding planner $4.500, catering + bar 4 dagen $25.000–35.000, decor + bloemen $5.000–10.000, full-day fotograaf + video $4.000–7.000, MC + DJ + AV $2.500, transport + hair/make-up $2.000–4.000. Totaal $80.000–110.000. Per gast: $2.500–3.700. Vergelijk met resort: 30 gasten × $400/n × 4 nachten + bruiloft-pakket = $60.000–80.000 — privacy verschil rechtvaardigt vaak premie.'
          : 'A 4-night villa takeover for 30 guests: villa $40,000 (4× $10,000/n premium), wedding planner $4,500, catering + bar 4 days $25,000–35,000, decor + flowers $5,000–10,000, full-day photo + video $4,000–7,000, MC + DJ + AV $2,500, transport + hair/makeup $2,000–4,000. Total $80,000–110,000. Per guest: $2,500–3,700. Compare to a resort: 30 guests × $400/n × 4 nights + wedding package = $60,000–80,000 — privacy gap often justifies the premium.' },
      { title: isNl ? 'Permits + nood-paperwork' : 'Permits + nuts-and-bolts paperwork',
        body: isNl
          ? 'Privé-villa ≠ vrije licentie. Voor 50+ gasten met versterkte muziek na 22:00 heb je een Phuket Town public-event-permit nodig ($150–300, planner regelt). Catering moet door een Thai food-safety-licensed bedrijf — geen home-chefs voor 30+ gasten. Beach-side villas: lokale gemeente-melding voor strand-setup. Goede villa-managers handelen dit allemaal — bevestig in contract dat permits inbegrepen zijn vóór tekenen.'
          : 'Private villa ≠ blanket license. For 50+ guests with amplified music after 22:00 you need a Phuket Town public-event permit ($150–300, planner handles). Catering must come from a Thai food-safety-licensed company — no home chefs for 30+ guests. Beach-side villas: local municipality notification for beach setup. Good villa managers handle all of this — confirm in the contract that permits are included before signing.' },
    ];
  })();

  // Buyer's tips (5–7 per spoke)
  const tips = (() => {
    if (spoke === 'beach') {
      return [
        { strong: isNl ? 'Tij + zons-stand check' : 'Tide + sun-angle check', body: isNl ? '— laag tij = bredere strand-setup, hoog tij = water dichter bij ceremonie. Sunset-ceremonie 1u voor zonsondergang voor golden hour.' : '— low tide = wider beach setup, high tide = water closer to ceremony. Sunset ceremony 1h before sunset for golden hour.' },
        { strong: isNl ? 'Backup-tent verplicht apr–nov' : 'Backup tent mandatory Apr–Nov', body: isNl ? '. $500–1.500 voor een goede covered structure. Niet boeken = je viert binnen in een resort-zaal als het regent.' : '. $500–1,500 for a good covered structure. Skip it = you celebrate indoors in a resort hall if it rains.' },
        { strong: isNl ? 'Sand-floor schoenwerk' : 'Sand-floor footwear', body: isNl ? '— communiceer met gasten: blote voeten of strand-sandalen. Hakken zinken weg, ruïneren je foto-line-up.' : '— tell guests: bare feet or beach sandals. Heels sink in, ruin your photo line-up.' },
        { strong: isNl ? 'Geluid op het strand is moeilijk' : 'Sound on the beach is tricky', body: isNl ? '— wind + golfgeluid maakt vows-microfoon kritisch. Vraag operator om lavalier-microfoon plus speakers van topkwaliteit.' : '— wind + wave noise makes vow-microphone critical. Ask operator for lavalier mics and top-quality speakers.' },
        { strong: isNl ? 'Gasten-comfort eerst' : 'Guest comfort first', body: isNl ? ': water-stations, parasols, koele handdoeken bij aankomst, sun-screen station. Een 30-min ceremonie in de zon zonder dit = klagende gasten op de fotos.' : ': water stations, parasols, cool towels on arrival, sunscreen station. A 30-min ceremony in the sun without this = unhappy guests in your photos.' },
        { strong: isNl ? 'Vrijdag/zaterdag uitverkocht' : 'Friday/Saturday sells out', body: isNl ? '— top-resorts (Trisara, Amanpuri) verkopen 12 maanden vooruit. Doordeweeks (di-do) bespaart 20–30% en geeft fotograaf-keuze.' : '— top resorts (Trisara, Amanpuri) sell 12 months out. Weekday (Tue-Thu) saves 20–30% and frees up photographer choice.' },
      ];
    }
    if (spoke === 'resort-packages') {
      return [
        { strong: isNl ? 'Vraag complete breakdown' : 'Ask for the complete breakdown', body: isNl ? '— pakket "vanaf $4.500" zegt niks. Vraag: wat zit erin, wat is min-spend, welke uren foto, welke bar-niveau, hoeveel gasten max.' : '— "from $4,500" tells you nothing. Ask: what is included, what is the min-spend, photo hours, bar tier, max guests.' },
        { strong: isNl ? 'Onderhandel kamer-block' : 'Negotiate room block', body: isNl ? '— bij 10+ kamers, vraag 10–20% korting + late-release voorwaarde 60 dagen vóór. Resort wint cash, jij wint flexibel.' : '— at 10+ rooms ask for 10–20% off + 60-day late-release clause. Resort wins cash, you win flexibility.' },
        { strong: isNl ? 'Doordeweekse weddings 25% goedkoper' : 'Weekday weddings 25% cheaper', body: isNl ? '— di–do prijslijsten zijn vaak een kwart lager dan zaterdag. Combineer met off-peak (april) voor max-savings.' : '— Tue–Thu price lists are often a quarter below Saturday. Combine with off-peak (April) for max savings.' },
        { strong: isNl ? 'Resort wedding-coordinator vs externe planner' : 'Resort coordinator vs outside planner', body: isNl ? '— resort-coördinator zit in pakket maar werkt alleen ter plekke. Externe planner ($1.500–4.500) regelt vendors, paperwork, gasten-comms tussen reserveren en aankomst.' : '— resort coordinator is in the package but only works on-site. Outside planner ($1,500–4,500) handles vendors, paperwork, guest comms between booking and arrival.' },
        { strong: isNl ? 'Min-spend trucs' : 'Watch for min-spend tricks', body: isNl ? '— "pakket $4.500" maar min food&drinks-spend $7.500. Dit verandert je werkelijke min-uitgave naar $12.000+. Vraag expliciet naar F&B-minimum.' : '— "package $4,500" but min food&drinks spend $7,500. Real minimum becomes $12,000+. Always ask about F&B minimum.' },
        { strong: isNl ? 'Vendor-kostenpercentage check' : 'Vendor cost share check', body: isNl ? '— sommige resorts rekenen 15–25% commissie als je externe vendors meebrengt. Sri Panwa, Trisara doen dit niet, JW Marriott wel. Vraag vooraf.' : '— some resorts charge 15–25% commission for outside vendors. Sri Panwa and Trisara do not, JW Marriott does. Ask up-front.' },
        { strong: isNl ? 'Reisverzekering met wedding-cancel-extensie' : 'Wedding-cancel insurance', body: isNl ? '— 4–7% van budget. Dekt regen-cancel buiten droogseizoen, ziekte van bruidsstel, vendor-default.' : '— 4–7% of budget. Covers rain cancel outside dry season, bridal party illness, vendor default.' },
      ];
    }
    return [
      { strong: isNl ? 'Min 3 nachten — anders niet rendabel' : 'Min 3 nights — anything less is not worth it', body: isNl ? '. Setup + breakdown van een grote villa-event kost een dag elk; 1–2 nachten = je bent vooral aan het op- en afbouwen.' : '. Setup + breakdown of a large villa event eats a day each; 1–2 nights = you spend most of the stay assembling and dismantling.' },
      { strong: isNl ? 'Catering apart van villa' : 'Catering separate from villa', body: isNl ? '— villa\'s leveren keuken + service-staff, maar je catering komt van gespecialiseerde partners. Vraag villa-manager om 3 referenties.' : '— villas provide kitchen + service staff, but catering comes from specialised partners. Ask villa manager for 3 references.' },
      { strong: isNl ? 'Villa wedding-planner essentieel' : 'Villa wedding planner essential', body: isNl ? '— resorts hebben in-huis coördinatoren, villa\'s niet. Externe planner ($3.000–8.000) regelt vendors, permits, timeline.' : '— resorts have in-house coordinators, villas do not. Outside planner ($3,000–8,000) handles vendors, permits, timeline.' },
      { strong: isNl ? 'Permits voor 50+ gasten' : 'Permits for 50+ guests', body: isNl ? '— public event-permit nodig voor versterkte muziek na 22:00. $150–300 via planner. Niet hebben = politie sluit feest om 22:00.' : '— public event permit needed for amplified music after 22:00. $150–300 via planner. Skip it = police shut down the party at 22:00.' },
      { strong: isNl ? 'Schade-borg 5–10% van villa-prijs' : 'Damage deposit 5–10% of villa price', body: isNl ? '— bevroren bij boeking, terug 7–14 dagen na vertrek. Pre-event walkthrough met manager + foto\'s om disputes te voorkomen.' : '— frozen at booking, refunded 7–14 days after departure. Pre-event walkthrough with manager + photos to avoid disputes.' },
      { strong: isNl ? 'Multi-villa-estate optie' : 'Multi-villa estate option', body: isNl ? '— voor 40+ gasten: Sava Beach, Andara, Iniala. 3–8 villa\'s op één terrein. Cheaper per gast dan één mega-villa, plus iedereen krijgt eigen privacy.' : '— for 40+ guests: Sava Beach, Andara, Iniala. 3–8 villas on one estate. Cheaper per guest than one mega-villa, and everyone gets their own privacy.' },
    ];
  })();

  // FAQ — 5 unique per spoke
  const faqEn = (() => {
    if (spoke === 'beach') {
      return [
        { q: 'Are Phuket beaches really private if a resort says so?', a: 'In Thailand all beaches are public up to the high-tide line by law. "Private beach" means: gated resort access, beach attendants who turn away non-guests, and exclusive ceremony zones. Trisara, Amanpuri, The Surin and Andara deliver genuinely-private beaches — the path is gated and a guard checks. JW Marriott Mai Khao and Anantara claim private but you may still get the occasional walker. For undisturbed photos, pick a boutique resort with a true gated beach approach.' },
        { q: 'What if it rains on our Phuket beach wedding?', a: 'Outside dry season (Apr–Oct) you must have a backup plan. Options: (1) Resort indoor venue — most resorts include a covered fall-back room in the package. (2) Marquee tent on the beach itself — $500–1,500 setup, gives you the beach setting under cover. (3) Reschedule by hours — Phuket rain is usually heavy 30–60 min then clear. Best operators monitor weather 24h ahead and recommend timing. November to February: rain risk under 10%.' },
        { q: 'How early should the beach ceremony start?', a: 'Sweet spot is 15:30–17:00 — 60–90 minutes before sunset. Too early (12:00–14:00) = harsh sun, sweating guests, washed-out photos. Too late (post-18:00) = dark during vows. Sunset ceremony then cocktail hour 17:00–18:30 captures golden-hour vows, twilight toasts, and lantern-lit dinner. Confirm sunset time for your specific date — Nov–Feb sunset is 18:10–18:25, March–April is 18:35–18:45.' },
        { q: 'Can guests walk on the sand in formal clothes?', a: 'Tell them no shoes or flat sandals only. Sand absorbs heels — your bridal party photos turn into a wobbly line. Most beach-wedding resorts provide sand-walk runners (white linen aisle path) and white flip-flops in baskets at the entrance. Brides typically walk barefoot or in flat ballet flats. Tuxes: black silk sandals or barefoot — bring spare clean socks for indoor reception transition.' },
        { q: 'Best Phuket beach for a wedding ceremony specifically?', a: 'Layan Beach (Trisara) — most cinematic, calm waves, dramatic dragon-headland backdrop. Pansea Beach (Amanpuri, The Surin) — small private cove, soft white sand, sunset-side. Mai Khao Beach (JW Marriott, Anantara) — 11km undeveloped, longest stretch, ideal for big groups. Nai Yang Beach (The Slate) — boutique, less luxe but most flexible setup. Avoid Patong, Kata, Karon — too public, even at fancy resorts.' },
      ];
    }
    if (spoke === 'resort-packages') {
      return [
        { q: 'What does a "Phuket wedding packages resort" deal really include?', a: 'A typical $4,500 resort wedding package for 40 guests covers: ceremony setup (decor, chairs, arch), 3-course reception dinner, basic flower arrangements, 2-hour photographer, MC and sound, wedding cake, bridal hair/makeup. NOT included by default: legal Thai paperwork ($400–800 separately), guest accommodation, alcohol beyond house wine/beer, photo upgrades (4+ hour packages), pre-wedding photoshoot, transport between ceremony and reception. Always ask for an itemised PDF before signing.' },
        { q: 'Which Phuket resort has the best wedding package value for under $5,000?', a: 'Three picks: Cape Sienna ($2,800+) — hilltop ceremony with sunset view, 40-guest cap, strong photo quality for the price. The Slate ($3,200+) — boutique tin-mine design, indoor + outdoor flexibility, large guest capacity. Anantara Mai Khao ($3,500+) — quieter beach, premium villa-style accommodation for bridal party. All three include experienced English-speaking coordinators and standard photo + decor — competitive on price without thin-content packages.' },
        { q: 'How many guests fit at the typical Phuket resort wedding?', a: 'Standard packages cap at 40–80 guests. Larger venues (JW Marriott Mai Khao, Banyan Tree, Sri Panwa) handle 100–300 with surcharges around $80–150 per extra guest. Ultra-luxury (Trisara, Amanpuri) prefer intimate weddings — 60-guest cap is typical, beyond that pricing escalates fast. For 100+ guests: JW Marriott or Hilton Patong. For 200+: only JW Marriott Mai Khao practically.' },
        { q: 'Can we customise the Phuket resort wedding package?', a: 'Yes — every venue accepts customisation. Common upgrades: real-flower arch ($500–2,000 over silk), live music/string quartet ($600–1,800), photo extension ($300/hour), open bar premium spirits ($30–60 pp), late-night DJ ($800–2,000), themed decor (rustic, beach-luxe, modern). Drop options the package includes that you do not want — most resorts adjust pricing down for unused items. Always negotiate on F&B minimum spend, not on photo or decor (those are markup-heavy).' },
        { q: 'How long does it take to plan a Phuket resort wedding?', a: '6–12 months ideal. 3–6 months minimum for boutique resorts with availability. Sub-3-month: only off-peak weekday weddings at smaller resorts. Booking timeline: month 1 — shortlist 5 venues, request package PDFs, video tour 2 finalists. Month 2 — sign contract, 30% deposit. Months 3–4 — book vendors (photographer, planner, hair/makeup). Months 5–6 — guest invitations, hotel block release. Final 30 days — menu tasting, decor walkthrough, legal paperwork start.' },
      ];
    }
    return [
      { q: 'Why pay $40,000+ for a private villa wedding when a resort costs less?', a: 'Three reasons: (1) Multi-day events — bridesmaid bonding, rehearsal dinner, ceremony, brunch all in one place across 3–7 days. (2) Total privacy — no other guests, no hotel staff in your photos, no time-restrictions on music. (3) Bridal party stays together — no scattered hotel rooms. Per-guest cost ($2,500–3,700) is high vs resort ($1,500–2,500), but the experience is fundamentally different. Pick villa if 30%+ of guests stay 3+ nights; pick resort if guests fly in for 1–2 nights only.' },
      { q: 'How many bedrooms do we need for a 30-guest villa wedding?', a: 'For 30 guests: 8–12 bedrooms accommodates everyone except day-trip guests. Couples typically share, kids in adjacent rooms with parents. Multi-villa estates (Sava Beach Villas, Andara Resort, Iniala) offer 2–4 villas across the same compound — solves capacity without losing privacy. For 50+ guests: book the estate plus a nearby resort for overflow (10-room block at the resort). Calculation: 30 guests ÷ 2.5 average per room = 12 rooms with buffer.' },
      { q: 'Can we hire our own chef for a Phuket villa wedding?', a: 'Most premium villas (Sava Beach, Andara, Villa Padma) include a kitchen and serving staff but bring catering from a Thai food-safety-licensed company. Bringing your own chef from outside is technically possible for groups under 20, but for 30+ guests Thai law requires licensed-kitchen catering. Top villa-catering specialists in Phuket: Diethelm Travel, The Phuket Catering Co, Coast Restaurant catering. Cost: $150–350 per guest for full-day F&B (welcome cocktail, ceremony drinks, dinner, late-night).' },
      { q: 'What permits do we need for a private villa wedding in Phuket?', a: 'For 50+ guests with amplified music after 22:00: Phuket municipal public-event permit ($150–300, planner handles, 14-day lead time). Beach-side villas: local sub-district notification for ceremony setup on the beach. Liquor: every catering company has its own license — confirm. Drone for filming: aviation registration if commercial (your videographer handles this). Total permit cost via experienced villa wedding planner: $400–800.' },
      { q: 'Best private villa estates in Phuket for weddings?', a: 'Top 5: (1) Andara Resort (Kamala) — 5–9 bedroom villas with full resort services, $8,000–18,000/night. (2) Sava Beach Villas (Natai, just north of Phuket) — multi-villa beachfront estate, 4–7 BR each, $3,000–9,500/night. (3) Iniala Beach House (Natai) — 3 villas with private chefs, $4,500–11,000/night. (4) Villa Aye (Kamala hilltop) — 6 BR clifftop, $3,500–8,500/night. (5) Villa Padma (Kamala cliffside) — 6 BR ocean view, $4,500–10,000/night. Book 4–6 months ahead for high season.' },
    ];
  })();

  const faqNl = (() => {
    if (spoke === 'beach') {
      return [
        { q: 'Zijn Phuket-stranden écht privé als een resort dat zegt?', a: 'In Thailand zijn alle stranden wettelijk publiek tot aan de hoogwaterlijn. "Privé strand" betekent: gated resort-toegang, beach-attendants die niet-gasten weren, exclusieve ceremonie-zones. Trisara, Amanpuri, The Surin en Andara leveren écht-privé — pad is afgesloten en een bewaker checkt. JW Marriott Mai Khao en Anantara claimen privé maar je houdt af en toe wandelaars. Voor onverstoorde fotos: kies een boutique resort met écht gated beach-aanpak.' },
        { q: 'Wat als het regent op onze Phuket strand-bruiloft?', a: 'Buiten droogseizoen (apr–okt) heb je een backup-plan nodig. Opties: (1) Resort indoor venue — meeste resorts hebben covered fall-back in pakket. (2) Marquee-tent op het strand zelf — $500–1.500 setup, behoudt strand-setting onder cover. (3) Reschedule met uren — Phuket-regen is meestal heftig 30–60 min en daarna helder. Beste operators monitoren weer 24u vooruit. November tot februari: regen-risico onder 10%.' },
        { q: 'Hoe vroeg moet de strand-ceremonie starten?', a: 'Sweet spot is 15:30–17:00 — 60–90 minuten voor zonsondergang. Te vroeg (12:00–14:00) = pittige zon, zwetende gasten, uitgewassen fotos. Te laat (na 18:00) = donker tijdens vows. Sunset-ceremonie + cocktail-uur 17:00–18:30 vangt golden-hour vows, schemering-toasts, lampion-diner. Bevestig zonsondergangstijd voor jouw datum — nov–feb 18:10–18:25, mrt–apr 18:35–18:45.' },
        { q: 'Kunnen gasten in formele kleding op het zand lopen?', a: 'Zeg ze: alleen blote voeten of platte sandalen. Zand zuigt hakken op — je bruidsgezelschap-fotos worden een wankele line-up. Meeste strand-wedding-resorts leveren sand-walk runners (witte linnen-aisle) en witte flip-flops in mandjes bij ingang. Bruiden lopen meestal blootsvoets of in platte ballerina\'s. Smokings: zwarte zijden-sandalen of blote voeten — extra schone sokken voor indoor-receptie-overgang.' },
        { q: 'Beste Phuket-strand voor specifiek een trouw-ceremonie?', a: 'Layan Beach (Trisara) — meest cinematisch, rustige golven, dramatisch dragon-headland. Pansea Beach (Amanpuri, The Surin) — kleine privé-baai, zacht wit zand, sunset-zijde. Mai Khao Beach (JW Marriott, Anantara) — 11km onbebouwd, langste strook, ideaal voor grote groepen. Nai Yang Beach (The Slate) — boutique, minder luxe maar flexibelst in setup. Vermijd Patong, Kata, Karon — te publiek, zelfs bij chique resorts.' },
      ];
    }
    if (spoke === 'resort-packages') {
      return [
        { q: 'Wat zit er écht in een Phuket "wedding packages resort" deal?', a: 'Een typisch $4.500 resort wedding-pakket voor 40 gasten dekt: ceremonie-setup (decor, stoelen, arch), 3-gangen receptie-diner, basis-bloemarrangementen, 2-uur fotograaf, MC en geluid, bruidstaart, bruids hair/make-up. NIET inbegrepen: legal Thai paperwork ($400–800 apart), gasten-overnachting, alcohol buiten huiswijn/bier, foto-upgrades (4+ uur pakketten), pre-wedding photoshoot, transport tussen ceremonie en receptie. Vraag altijd om itemised PDF voor tekenen.' },
        { q: 'Welk Phuket-resort heeft beste wedding-package value onder $5.000?', a: 'Drie keuzes: Cape Sienna ($2.800+) — heuveltop ceremonie met sunset, 40-gasten cap, sterke foto-kwaliteit voor de prijs. The Slate ($3.200+) — boutique tin-mine design, indoor + outdoor flexibiliteit, grote gasten-capaciteit. Anantara Mai Khao ($3.500+) — rustiger strand, premium villa-stijl accommodatie voor bruidsgezelschap. Alle drie hebben ervaren English-speaking coordinators en standaard foto + decor — concurrerend in prijs zonder dunne pakketten.' },
        { q: 'Hoeveel gasten passen op een typische Phuket resort-bruiloft?', a: 'Standaard pakketten cap 40–80 gasten. Grotere venues (JW Marriott Mai Khao, Banyan Tree, Sri Panwa) doen 100–300 met toeslagen $80–150 pp. Ultra-luxe (Trisara, Amanpuri) prefereren intieme weddings — 60-cap is typisch, daarboven escaleren prijzen snel. Voor 100+: JW Marriott of Hilton Patong. Voor 200+: praktisch alleen JW Marriott Mai Khao.' },
        { q: 'Kunnen we het Phuket resort wedding-pakket aanpassen?', a: 'Ja — elke venue accepteert aanpassing. Gangbare upgrades: echte-bloem-arch ($500–2.000 over zijde), live-muziek/strijkkwartet ($600–1.800), foto-extensie ($300/uur), open-bar premium ($30–60 pp), late-night DJ ($800–2.000), themed decor. Laat opties uit pakket weg die je niet wilt — meeste resorts passen prijs aan voor ongebruikte items. Onderhandel op F&B-minimum, niet op foto of decor (markup-zwaar).' },
        { q: 'Hoe lang duurt het om een Phuket resort-bruiloft te plannen?', a: '6–12 maanden ideaal. 3–6 maanden minimaal bij boutique resorts. Onder 3 maanden: alleen off-peak doordeweekse weddings bij kleinere resorts. Timeline: maand 1 — shortlist 5 venues, vraag pakket-PDFs, video-tour 2 finalisten. Maand 2 — contract, 30% aanbetaling. Maand 3–4 — vendors boeken (fotograaf, planner, hair/make-up). Maand 5–6 — gasten-invites, hotel-block release. Laatste 30 dagen — menu-proef, decor-walkthrough, legal paperwork start.' },
      ];
    }
    return [
      { q: 'Waarom $40.000+ betalen voor privé-villa-bruiloft als resort goedkoper is?', a: 'Drie redenen: (1) Multi-day events — bruidsmeisjes-bonding, rehearsal dinner, ceremonie, brunch alles op één plek over 3–7 dagen. (2) Totale privacy — geen andere gasten, geen hotel-personeel in fotos, geen tijd-restricties op muziek. (3) Bruidsgezelschap blijft samen — geen verspreide hotel-kamers. Per-gast kosten ($2.500–3.700) hoog vs resort ($1.500–2.500), maar ervaring fundamenteel anders. Kies villa als 30%+ van gasten 3+ nachten blijft; resort als gasten 1–2 nachten vliegen.' },
      { q: 'Hoeveel slaapkamers nodig voor 30-gasten villa-bruiloft?', a: 'Voor 30 gasten: 8–12 slaapkamers huisvesten iedereen behalve dag-trippers. Stellen delen meestal, kinderen in aangrenzende kamers. Multi-villa estates (Sava Beach Villas, Andara Resort, Iniala) bieden 2–4 villa\'s op één compound — lost capaciteit op zonder privacy te verliezen. Voor 50+ gasten: estate plus nabijgelegen resort voor overflow (10-kamer-block). Berekening: 30 gasten ÷ 2,5 gemiddeld per kamer = 12 kamers met buffer.' },
      { q: 'Kunnen we eigen kok inhuren voor Phuket villa-bruiloft?', a: 'Premium villa\'s (Sava Beach, Andara, Villa Padma) leveren keuken + service-staff maar catering komt van Thai food-safety-licensed bedrijf. Eigen kok van buiten kan technisch voor groepen onder 20, maar 30+ gasten vereist Thai-licensed kitchen-catering. Top villa-catering in Phuket: Diethelm Travel, The Phuket Catering Co, Coast Restaurant catering. Kosten: $150–350 pp voor full-day F&B (welkomst-cocktail, ceremony drinks, diner, late-night).' },
      { q: 'Welke permits voor privé-villa-bruiloft in Phuket?', a: 'Voor 50+ gasten met versterkte muziek na 22:00: Phuket gemeentelijk public-event-permit ($150–300, planner regelt, 14-dagen lead-time). Strand-villa\'s: lokale sub-district melding voor ceremonie-setup op strand. Drank: elke catering-firma heeft eigen licentie — bevestig. Drone voor opnames: aviation-registratie als commercieel (videograaf regelt). Totale permit-kosten via ervaren villa-wedding-planner: $400–800.' },
      { q: 'Beste privé-villa estates in Phuket voor weddings?', a: 'Top 5: (1) Andara Resort (Kamala) — 5–9 slaapkamer-villa\'s met full resort-services, $8.000–18.000/n. (2) Sava Beach Villas (Natai, net noord van Phuket) — multi-villa beachfront estate, 4–7 SK elk, $3.000–9.500/n. (3) Iniala Beach House (Natai) — 3 villa\'s met privé-koks, $4.500–11.000/n. (4) Villa Aye (Kamala heuveltop) — 6 SK clifftop, $3.500–8.500/n. (5) Villa Padma (Kamala cliffside) — 6 SK oceaanview, $4.500–10.000/n. Boek 4–6 maanden vooruit voor hoogseizoen.' },
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
              {spoke === 'beach' && (isNl
                ? "Niet elk Phuket strand-resort is écht privé. Hier vind je de 7 die het wél leveren — gated toegang, beach-attendants, exclusieve setup-zones — plus wat een $3.000 vs $12.000 pakket écht inhoudt."
                : "Not every Phuket beach resort is actually private. Here are the 7 that genuinely deliver — gated access, beach attendants, exclusive setup zones — plus what a $3,000 vs $12,000 package actually includes.")}
              {spoke === 'resort-packages' && (isNl
                ? "6 resort wedding-pakketten in Phuket vergeleken — wat zit erin, wat is verborgen min-spend, en welke zijn de beste deal voor 40, 80 of 200 gasten."
                : "6 resort wedding packages in Phuket compared — what's included, where the hidden min-spend lurks, and which is the best deal for 40, 80 or 200 guests.")}
              {spoke === 'villa' && (isNl
                ? "Privé-villa neem-overs voor 20–60 gasten in Phuket. 5 multi-day estates vergeleken — kosten, permits, catering en wat je écht uitgeeft voor totaal-privacy."
                : "Private villa takeovers for 20–60 guests in Phuket. 5 multi-day estates compared — costs, permits, catering and what you actually spend for total privacy.")}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href={withSubId(primaryUrl, placement('hero-primary'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-6 py-3 text-base font-semibold hover:bg-red-700 shadow-lg">
                {spoke === 'beach' && (isNl ? 'Bekijk strand-resorts op Trip.com' : 'See beach resorts on Trip.com')}
                {spoke === 'resort-packages' && (isNl ? 'Bekijk wedding-resorts op Trip.com' : 'See wedding resorts on Trip.com')}
                {spoke === 'villa' && (isNl ? 'Bekijk privé-villa\'s op Trip.com' : 'See private villas on Trip.com')}
                {' '}→
              </a>
              <a href={withSubId(secondaryUrl, placement('hero-secondary'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-white text-thailand-blue border border-white/40 px-6 py-3 text-base font-semibold hover:bg-white/90">
                {isNl ? 'Vergelijk meer venues' : 'Compare more venues'} →
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
              {spoke === 'beach' && (isNl ? 'Strand-trouwlocaties vergeleken' : 'Beach wedding venues compared')}
              {spoke === 'resort-packages' && (isNl ? 'Resort wedding-pakketten vergeleken' : 'Resort wedding packages compared')}
              {spoke === 'villa' && (isNl ? 'Privé-villa weddings vergeleken' : 'Private villa weddings compared')}
            </h2>
            <p className="text-gray-600 mb-6">{isNl ? 'Klik om live tarieven te zien (we verdienen een kleine commissie zonder dat het jou iets extra kost).' : 'Click to see live rates (we earn a small commission at no extra cost to you).'}</p>
            <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="text-left font-semibold px-4 py-3">{isNl ? 'Venue' : 'Venue'}</th>
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
            <p className="mt-3 text-xs text-gray-500">{isNl ? 'Prijzen zijn 2026 hoogseizoen-tarieven (nov–feb). Buiten hoogseizoen 25–35% lager. F&B-minimum, gasten-overnachting en legal paperwork meestal apart.' : 'Prices are 2026 high-season rates (Nov–Feb). Outside high season 25–35% cheaper. F&B minimum, guest accommodation and legal paperwork usually separate.'}</p>
          </section>

          {/* Top pick callout */}
          <section className="rounded-2xl bg-thailand-red/5 border-2 border-thailand-red p-6">
            <span className="inline-block rounded-full bg-thailand-red text-white text-xs font-bold uppercase tracking-wide px-3 py-1 mb-3">⭐ {isNl ? 'Onze keuze' : 'Our pick'}</span>
            <h2 className="font-heading text-2xl font-bold text-gray-900 mb-3">
              {spoke === 'beach' && (isNl ? 'Trisara — privé Layan Beach + cliffside backup' : 'Trisara — private Layan Beach + cliffside backup')}
              {spoke === 'resort-packages' && (isNl ? 'Sri Panwa Hilltop pakket vanaf $5.500' : 'Sri Panwa hilltop package from $5,500')}
              {spoke === 'villa' && (isNl ? 'Andara Resort — multi-villa estate Kamala' : 'Andara Resort — multi-villa estate Kamala')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              {spoke === 'beach' && (isNl
                ? 'Trisara levert wat de meeste resorts beloven maar niet halen: 300m écht privé strand bij Layan, gated toegang, beach-attendants. Bonus: cliffside-restaurant als rain-backup. Pakket vanaf $7.500 voor 40 gasten — in lijn met Amanpuri en The Surin maar mét drinkbare regen-oplossing.'
                : 'Trisara delivers what most resorts promise but few do: 300m of genuinely-private beach at Layan, gated access, beach attendants. Bonus: cliffside restaurant as rain backup. Package from $7,500 for 40 guests — on par with Amanpuri and The Surin but with a workable rain plan.')}
              {spoke === 'resort-packages' && (isNl
                ? 'Sri Panwa\'s heuveltop ceremonie kijkt 360° over de Andamanzee, ideaal voor 40–80 gasten. $5.500 pakket dekt ceremonie + receptie + sound + decor + 4u foto. Free room-upgrade voor bruidsstel, wedding-block 15% korting. Onze beste pakket-value boven $5K.'
                : "Sri Panwa's hilltop ceremony has a 360° Andaman Sea view, ideal for 40–80 guests. $5,500 package covers ceremony + reception + sound + decor + 4h photo. Free room upgrade for bridal couple, 15% wedding-block discount. Our best package value above $5K.")}
              {spoke === 'villa' && (isNl
                ? 'Andara biedt 5–9 slaapkamer-villa\'s met full resort-services — perfect voor 30–60 gasten. Wedding-coordinator on-site, catering via The Phuket Catering Co, sterke event-keuken. $8K–18K/n villa-deel, totaal 4-dagen event $80K–110K. Ervaren met internationale stellen.'
                : "Andara offers 5–9 bedroom villas with full resort services — perfect for 30–60 guests. On-site wedding coordinator, catering via The Phuket Catering Co, strong event kitchen. $8K–18K/night villa portion, total 4-day event $80K–110K. Experienced with international couples.")}
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
              {spoke === 'beach' && (isNl ? 'Boekingstips strand-trouwerij' : 'Booking tips for beach weddings')}
              {spoke === 'resort-packages' && (isNl ? 'Boekingstips resort-pakketten' : 'Booking tips for resort packages')}
              {spoke === 'villa' && (isNl ? 'Boekingstips privé-villa-bruiloft' : 'Booking tips for private villa weddings')}
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
              <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">{isNl ? 'Andere wedding-opties in Phuket' : 'Other wedding options in Phuket'}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {siblings.map(s => (
                  <Link key={s} href={`/phuket-wedding-venues/${s}/`} className="block rounded-2xl bg-white p-4 shadow-sm border border-gray-200 hover:border-thailand-blue transition-colors">
                    <p className="font-heading font-bold text-gray-900">{isNl ? SPOKE_LABELS[s].nl : SPOKE_LABELS[s].en}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {s === 'beach' && (isNl ? '7 privé-strand resorts, $2.800–12.000+' : '7 private-beach resorts, $2,800–12,000+')}
                      {s === 'resort-packages' && (isNl ? '6 all-inclusive deals, 20–300 gasten' : '6 all-inclusive deals, 20–300 guests')}
                      {s === 'villa' && (isNl ? '5 multi-day takeover venues, 20–60 gasten' : '5 multi-day takeover venues, 20–60 guests')}
                    </p>
                    <p className="text-xs text-thailand-blue mt-2 font-semibold">{isNl ? 'Bekijk gids' : 'See guide'} →</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Cluster mesh — UP to pillar + cross-cluster */}
          <section className="rounded-2xl bg-thailand-blue/10 p-6">
            <h2 className="font-heading text-xl font-bold text-gray-900">{isNl ? 'Plan de rest van je Phuket trouwerij' : 'Plan the rest of your Phuket wedding'}</h2>
            <p className="mt-2 text-gray-700">{isNl ? 'Venue gekozen — werk de rest af:' : 'Venue picked — wrap up the rest:'}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/phuket-wedding-venues/" className="rounded-full bg-thailand-blue text-white px-5 py-2 text-sm font-semibold hover:bg-blue-700">{isNl ? '💒 Alle 9 trouwlocaties vergelijken' : '💒 Compare all 9 wedding venues'}</Link>
              <Link href="/phuket-honeymoon/" className="rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">{isNl ? '💕 Honeymoon na de bruiloft' : '💕 Honeymoon after the wedding'}</Link>
              <Link href="/best-hotels/phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🏨 Hotels voor gasten' : '🏨 Hotels for guests'}</Link>
              <Link href="/yacht-charter-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '⛵ Sunset cruise voor gasten' : '⛵ Sunset cruise for guests'}</Link>
              <Link href="/flights-to-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '✈️ Vluchten naar Phuket' : '✈️ Flights to Phuket'}</Link>
              <Link href="/car-rental-phuket/" className="rounded-full bg-white text-thailand-blue border border-thailand-blue px-5 py-2 text-sm font-semibold hover:bg-thailand-blue hover:text-white">{isNl ? '🚗 Auto huren' : '🚗 Car rental'}</Link>
              <Link href="/city/phuket/" className="rounded-full bg-white text-gray-900 border border-gray-300 px-5 py-2 text-sm font-semibold hover:bg-gray-50">{isNl ? '📖 Phuket reisgids' : '📖 Phuket travel guide'}</Link>
              <a href={withSubId(GYG_GENERIC, placement('mesh-gyg'))} target="_blank" rel="noopener noreferrer nofollow sponsored" className="rounded-full bg-thailand-red text-white px-5 py-2 text-sm font-semibold hover:bg-red-700">{isNl ? '🎟️ Pre-wedding activiteiten' : '🎟️ Pre-wedding activities'}</a>
            </div>
          </section>

          {/* Methodology */}
          <section className="rounded-2xl bg-gray-50 border border-gray-200 p-6 text-sm text-gray-700">
            <h2 className="font-heading text-lg font-bold text-gray-900 mb-2">{isNl ? 'Hoe we vergeleken' : 'How we compared'}</h2>
            <p>{isNl ? 'Pakket-prijzen geverifieerd in mei 2026 op resort-websites + Trip.com voor 2026 boekingen. Privé-villa data via Sava Beach Villas, Andara Resort en Iniala Beach House directe quotes. Wedding-planner-prijzen gevalideerd via PhuketWedding.net en BlissEvents reviews. We verdienen commissie op boekingen via genoemde platforms — dit verandert niets aan de prijs of welke venues we noemen.' : "Package prices verified May 2026 on resort websites + Trip.com for 2026 bookings. Private villa data via Sava Beach Villas, Andara Resort and Iniala Beach House direct quotes. Wedding planner pricing validated via PhuketWedding.net and BlissEvents reviews. We earn a commission on bookings through the listed platforms — this never changes the price you pay or which venues we cover."}</p>
          </section>
        </main>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const file = path.join(process.cwd(), 'data', 'pseo', 'wedding-honeymoon', 'wedding-spokes.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const paths = (data.spokes as SpokeMeta[]).map(s => ({ params: { spoke: s.slug } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = params?.spoke as SpokeSlug;
  if (!slug) return { notFound: true, revalidate: 60 };

  const partnersFile = path.join(process.cwd(), 'data', 'pseo', 'wedding-honeymoon', 'phuket-partners.json');
  const spokesFile = path.join(process.cwd(), 'data', 'pseo', 'wedding-honeymoon', 'wedding-spokes.json');
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
