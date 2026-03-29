import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getDivingSnorkelingIndex, getDivingSnorkelingByCity } from '../lib/diving-snorkeling';
import { formatPrice } from '../lib/price';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';

interface Activity {
  name: string;
  slug: string;
  type: 'diving' | 'snorkeling';
  rating: number;
  reviews: number;
  priceFrom: number;
  currency: string;
  duration: string;
  groupSize: string;
  badge: string;
}

interface CityEntry {
  slug: string;
  name: { en: string; nl: string };
  classCount: number;
  priceRange: { from: number; to: number; currency: string };
  topRating: number;
  highlight: { en: string; nl: string };
}

interface CityData {
  city: string;
  cityName: { en: string; nl: string };
  intro: { en: string; nl: string };
  classes: Activity[];
}

interface Props {
  cities: CityEntry[];
  topActivities: { cityName: string; citySlug: string; activity: Activity }[];
}

function TypeBadge({ type }: { type: string }) {
  const config: Record<string, { label: string; color: string }> = {
    diving: { label: 'Diving', color: 'bg-blue-100 text-blue-700' },
    snorkeling: { label: 'Snorkeling', color: 'bg-cyan-100 text-cyan-700' },
  };
  const { label, color } = config[type] || config.snorkeling;
  return <span className={`text-xs font-semibold px-2 py-0.5 rounded ${color}`}>{label}</span>;
}

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: fullStars }, (_, i) => (
        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
    </span>
  );
}

const diveSites = [
  {
    id: 'similan-islands',
    name: 'Similan Islands',
    region: 'Andaman Sea — Phang Nga Province',
    season: 'November 15 – May 15 (park is legally closed outside this window)',
    depth: '5–30 m (recreational); certain sites reach 40 m+',
    visibility: '20–30 m; best February–April',
    experience: 'Open Water and above; some sites Advanced recommended',
    highlights: [
      'Archipelago of 11 islands, 70 km offshore from Phang Nga Province',
      'Similan Marine National Park established 1982 (PADI listed dive destination)',
      'Massive boulder formations on east; sloping coral gardens on west',
      'Whale shark season: January–March; manta rays year-round in season',
      'Water temperature 26–30°C; visibility rarely drops below 20 m',
      'Park entrance fees apply; day-trip boats and liveaboards both operate from Khao Lak',
    ],
    conservation: 'The Department of National Parks (DNP) enforces the November–May closure to allow reef recovery. Anchoring is banned across the park; moorings must be used.',
    note: 'The 2024–2025 season recorded an unusual increase in manta ray encounters at sites normally associated with whale sharks, according to liveaboard trip reports from Divehappy.',
  },
  {
    id: 'richelieu-rock',
    name: 'Richelieu Rock',
    region: 'Andaman Sea — Surin Islands area (Phang Nga)',
    season: 'November – May (Andaman dry season)',
    depth: '5–35 m',
    visibility: '15–30 m',
    experience: 'Advanced Open Water recommended; strong currents possible',
    highlights: [
      'Horseshoe-shaped submerged pinnacle; approximately 45 km from the mainland',
      'Named after Admiral Richelieu of the Royal Thai Navy — Thai Navy maps reference the rock from the early 1900s',
      'Purple and red soft corals cover most of the structure',
      'Macro life: seahorses, harlequin shrimp, frogfish, pineapplefish, orangutan crab',
      'Pelagic life: whale sharks and manta rays (February–April peak)',
      'Consistently ranked among the top 10 dive sites in Asia in multiple dive publications',
    ],
    conservation: 'Located within the Mu Koh Surin National Park zone. Dive operators are required to use park-approved moorings. No anchoring or coral touching is permitted.',
    note: 'The Jacques Cousteau "discovery" attribution is a popular but inaccurate story. The rock appears on official Royal Thai Navy charts from the early 20th century.',
  },
  {
    id: 'koh-tao',
    name: 'Koh Tao',
    region: 'Gulf of Thailand — Surat Thani Province',
    season: 'March – October (Gulf dry season); diving possible year-round',
    depth: '5–28 m depending on site',
    visibility: '10–30 m',
    experience: 'All levels; ideal for beginners and certification courses',
    highlights: [
      '21 km² island, part of the Chumphon Archipelago',
      'Produces more PADI Open Water certifications annually than almost anywhere else on the planet — described by PADI itself as one of the world\'s top certification destinations',
      'PADI Open Water course: approximately 9,900–12,000 THB (all-inclusive); advertised prices from 6,500 THB may exclude equipment rental and certification card fee',
      'Discover Scuba Diving (1 day): from approximately 2,500 THB',
      'Advanced Open Water course: from approximately 11,000 THB',
      'Key sites: Japanese Gardens, Chumphon Pinnacle, Shark Island, Twins, Southwest Pinnacle',
      'Marine life: reef sharks, barracuda, rays, sea turtles, occasional whale sharks',
    ],
    conservation: 'New Heaven Reef Conservation on Koh Tao runs long-term reef monitoring and restoration programs. COREsea operates coral gardening projects across the Samui Archipelago. Koh Tao dive operators have adopted voluntary fin-no-touch policies and mandatory dive briefings.',
    note: 'Prices are competitive due to a high density of dive shops (roughly 100+ operators on the island) creating strong market competition. Always confirm exactly what is included before paying.',
  },
  {
    id: 'sail-rock',
    name: 'Sail Rock (Hin Bai)',
    region: 'Gulf of Thailand — between Koh Phangan and Koh Tao',
    season: 'March – October; year-round with varying conditions',
    depth: '6–40 m',
    visibility: '10–40 m; peaks June–September',
    experience: 'Advanced Open Water recommended due to depth and current',
    highlights: [
      'Massive granite pinnacle rising approximately 15 m above the surface',
      'The Chimney: a vertical swim-through entering at ~16 m and exiting at ~6 m — one of Thailand\'s most distinctive dive features',
      'Dense fish life: barracuda schools, trevally, batfish, large groupers, giant moray eels',
      'Highest frequency of whale shark sightings in the Gulf of Thailand region',
      'Typically accessed via full-day trips from Koh Tao or daily departures from Koh Phangan',
    ],
    conservation: 'No permanent structures. No anchoring policy enforced by operators. Dive briefings required by reputable operators.',
    note: 'Sail Rock is one of the few Gulf sites where visibility can genuinely exceed 30 m in peak conditions.',
  },
  {
    id: 'hin-daeng-hin-muang',
    name: 'Hin Daeng & Hin Muang',
    region: 'Andaman Sea — south of Koh Lanta, Krabi Province',
    season: 'November – May',
    depth: 'Hin Daeng: surface to 70 m; Hin Muang: surface to 60 m+ (deepest wall dives in Thailand)',
    visibility: '15–30 m',
    experience: 'Advanced Open Water required; deep and current-prone',
    highlights: [
      'Hin Daeng = "Red Rock"; Hin Muang = "Purple Rock" — names reflect the broccoli coral colours covering the walls',
      'Hin Muang\'s southern wall drops beyond 60 m — the deepest recorded wall dive in Thailand',
      'Oceanic manta rays up to 4 m wingspan frequently seen at cleaning stations',
      'Whale sharks present November–April',
      'Dense glassfish schools, lionfish, barracuda, large trevally, ghost pipefish',
      'Remote location: approximately 2 hours by speedboat from Koh Lanta',
    ],
    conservation: 'Both pinnacles sit within a marine protected zone. The Department of Marine and Coastal Resources (DMCR) classifies these sites as priority conservation areas. The DMCR\'s "Reduce, Refrain, Rescue" policy applies — periodic closures may occur after coral bleaching events.',
    note: 'Due to remote location and depth, only reputable operators with properly maintained equipment and certified divemasters should be used.',
  },
  {
    id: 'surin-islands',
    name: 'Surin Islands',
    region: 'Andaman Sea — Phang Nga Province (Mu Koh Surin National Park, est. 1981)',
    season: 'November – May',
    depth: '5–25 m; snorkeling possible from shore',
    visibility: 'Average 30 m',
    experience: 'All levels; excellent snorkeling and beginner diving',
    highlights: [
      'Five-island archipelago; Koh Surin Nuea and Koh Surin Tai are the main islands',
      'UNESCO ASEAN Heritage Park and Reserve (designated 1982)',
      'Shallow reefs with 260+ recorded fish species, 68 coral species, 48 nudibranch species, 31 shrimp species (source: park biological surveys)',
      'Ao Mae Yai and Ao Chak: accessible snorkeling with sea turtles, angelfish, parrotfish',
      'Richelieu Rock (see separate entry) is accessed via Surin Islands liveaboard routes',
      'Moken (sea gypsy) community: 150–330 individuals living on Koh Surin Tai; one of very few surviving semi-nomadic maritime cultures in Southeast Asia',
      'The Moken\'s oral navigation knowledge contributed to the entire community surviving the 2004 Indian Ocean tsunami by recognising warning signs before the wave arrived',
    ],
    conservation: 'Mu Koh Surin National Park is managed by the Department of National Parks (DNP). Visitors must purchase a park entry pass. Chemical sunscreen use in the water is banned inside the park to protect coral.',
    note: 'If visiting the Moken village, follow park guidelines. Photography of individuals should only be done with consent. The community\'s cultural preservation is fragile.',
  },
  {
    id: 'koh-lipe',
    name: 'Koh Lipe & Tarutao Marine Park',
    region: 'Andaman Sea — Satun Province (near Malaysian border)',
    season: 'November – April; peak February – April',
    depth: '5–30 m',
    visibility: '15–25 m; best February–April',
    experience: 'All levels; mix of easy reef dives and intermediate sites',
    highlights: [
      'Tarutao National Marine Park: Thailand\'s oldest marine park, established 19 April 1974; declared UNESCO ASEAN Heritage Park 1982',
      'Park covers 50+ islands across Satun Province',
      'Koh Lipe sits within the park; 200 THB entrance fee valid for 5 days',
      'Notable dive sites: Stonehenge (boulder formations), 8 Mile Rock, Sarang, local wreck with soft coral growth',
      'Marine life: lionfish, angelfish, butterflyfish, groupers, trumpetfish, dolphins, and occasionally dugong',
      'Water temperature 27–30°C year-round',
      '55 km northwest of Langkawi, Malaysia — accessible by ferry during season',
    ],
    conservation: 'Dive operators on Koh Lipe operate under national park permit system. Some operators run coral gardening programs. The park\'s remoteness (no airport, ferry-only access) has limited overdevelopment compared to Phuket.',
    note: 'Koh Lipe has seen rapid tourism growth since 2010. Visitors are advised to choose PADI-affiliated or locally certified operators to ensure environmental standards are followed.',
  },
  {
    id: 'koh-chang-koh-rang',
    name: 'Koh Chang & Koh Rang',
    region: 'Gulf of Thailand — Trat Province',
    season: 'November – April (best visibility); diving possible year-round',
    depth: '5–30 m; wreck at 14–22 m',
    visibility: '10–25 m',
    experience: 'All levels; wreck diving for Advanced',
    highlights: [
      'Koh Rang sits within Mu Koh Chang National Park (Trat Province)',
      'HTMS Chang wreck: decommissioned Thai navy vessel, 117 m long — one of the largest accessible wrecks in Thailand; sunk deliberately as an artificial reef',
      'Whale shark sightings reported around the HTMS Chang wreck January–April',
      'Reef life: soft corals, sea fans, anemones, rays, eels, sea turtles',
      'Large school fish: fusiliers, batfish, yellowtail barracuda',
      'Less crowded than Phuket or Koh Tao — good alternative for Gulf-side divers',
      'PADI dive centres operate out of Koh Chang\'s White Sand Beach area',
    ],
    conservation: 'The national park status of Mu Koh Chang protects the surrounding reef. The HTMS Chang artificial reef has developed significant coral growth since sinking and is monitored by marine biologists.',
    note: 'Koh Chang is accessible year-round by ferry from Trat or van from Bangkok (approximately 6 hours). It suits travellers combining diving with a quieter island beach holiday.',
  },
  {
    id: 'racha-islands',
    name: 'Racha Islands (Koh Racha Yai & Racha Noi)',
    region: 'Andaman Sea — 17–25 km south of Phuket',
    season: 'November – April; manta rays most frequent January – March',
    depth: 'Racha Yai: 5–20 m; Racha Noi: 5–30 m',
    visibility: '15–30 m average; can reach 30 m at Racha Noi',
    experience: 'Racha Yai: all levels; Racha Noi: Advanced recommended',
    highlights: [
      'Racha Yai: 17 km south of Phuket; calm bays, hard coral gardens, suitable for beginners and snorkelers',
      'Racha Noi: 25 km south of Phuket; stronger currents, deeper sites, more pelagic encounters',
      'Racha Noi South Tip contains the only confirmed manta ray cleaning station in the greater Phuket region — giant manta rays up to 7 m wingspan observed',
      '99% of all manta ray sightings in the Phuket/Phi Phi region occur at Racha Noi during January–March (source: dive operator records)',
      'Marine life: sea turtles, barracuda schools, reef sharks, leopard sharks resting on sandy bottoms',
      'Most popular day-trip destination from Phuket; morning departure to maximise visibility',
    ],
    conservation: 'No anchoring zone around both islands. Moorings mandatory. Racha Noi cleaning stations are classed as sensitive habitats; dive operators are instructed to maintain 3 m distance from manta rays and to prohibit flash photography.',
    note: 'Racha Yai\'s sheltered bays make it one of the most reliable sites for beginner divers during the Andaman season. Snorkeling from the beach is possible without a boat.',
  },
  {
    id: 'chumphon-pinnacle',
    name: 'Chumphon Pinnacle',
    region: 'Gulf of Thailand — northwest of Koh Tao',
    season: 'May – September (whale shark peak); diving March – October',
    depth: '16–36 m (flat bottom below)',
    visibility: '10–25 m',
    experience: 'Advanced Open Water required; depth and currents',
    highlights: [
      'Submerged granite formation northwest of Koh Tao; lozenge-shaped pinnacle from ~16 m down to ~30 m depth',
      'Widely regarded as the best single dive site in the Gulf of Thailand',
      'Whale shark sightings: 3–4 confirmed sightings per season on average; highest frequency of any site in the Gulf',
      'Large pelagic aggregations: barracuda, trevally, batfish, reef sharks',
      'Advanced qualification required by most reputable operators due to currents and depth below 18 m',
      'Reached by day trip from Koh Tao (approximately 45 minutes by speedboat)',
    ],
    conservation: 'No-anchor zone enforced. Regular fish population counts conducted by local conservation groups including Big Blue Conservation, which has operated reef survey programs on Koh Tao since 2011.',
    note: 'Whale shark sightings are never guaranteed. Responsible operators do not advertise guaranteed sightings. The DMCR has guidelines for whale shark interaction: no touching, no riding, 3 m minimum distance.',
  },
];

const seasonTable = [
  {
    region: 'Andaman Sea (Phuket, Krabi, Khao Lak, Koh Lanta, Satun)',
    sites: 'Similan Islands, Richelieu Rock, Hin Daeng/Hin Muang, Surin Islands, Koh Lipe, Racha Islands',
    bestSeason: 'November – April',
    peakMonths: 'February – April',
    avoid: 'May – October (south-west monsoon; high seas, park closures)',
  },
  {
    region: 'Gulf of Thailand (Koh Tao, Koh Phangan, Koh Samui)',
    sites: 'Chumphon Pinnacle, Sail Rock, Southwest Pinnacle',
    bestSeason: 'March – October',
    peakMonths: 'May – September',
    avoid: 'November – February (north-east monsoon affects northern Gulf)',
  },
  {
    region: 'Gulf of Thailand — Eastern Seaboard (Koh Chang, Koh Kood)',
    sites: 'HTMS Chang wreck, Koh Rang reefs',
    bestSeason: 'November – April',
    peakMonths: 'January – March',
    avoid: 'May – October (south-west monsoon, reduced visibility)',
  },
];

export default function BestDivingSnorkelingPage({ cities, topActivities }: Props) {
  const { locale } = useRouter();
  const loc = locale || 'en';

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Best Diving & Snorkeling in Thailand', href: '/best-diving-snorkeling-in-thailand/' }
  ];

  const title = 'Best Diving & Snorkeling in Thailand 2026 — Complete Guide';
  const description = 'Comprehensive guide to Thailand\'s top dive sites: Similan Islands, Richelieu Rock, Koh Tao, Sail Rock, Hin Daeng/Hin Muang and more. Seasons, depths, PADI costs, and conservation information.';

  const faqItems = [
    {
      q: 'Where is the best diving in Thailand?',
      a: 'For sheer variety and visibility, the Similan Islands (Andaman Sea, open November–May) are consistently ranked among Asia\'s top dive destinations, with visibility reaching 20–30 m and encounters with whale sharks and manta rays. Richelieu Rock, within Mu Koh Surin National Park, is rated by dive publications as one of the best individual dive sites in the world. In the Gulf of Thailand, Chumphon Pinnacle northwest of Koh Tao is the most acclaimed site, with the highest frequency of whale shark sightings in the Gulf.'
    },
    {
      q: 'Where is the best snorkeling in Thailand?',
      a: 'The Surin Islands offer some of Thailand\'s most pristine snorkeling — visibility averages 30 m and the shallow reefs are protected within a national park. Racha Yai, 17 km south of Phuket, has calm bays with coral gardens accessible from the beach. Koh Lipe\'s beaches in Tarutao Marine Park provide excellent snorkeling with minimal development. For a budget option, Krabi\'s Hong Islands and 4 Islands tours offer accessible snorkeling for first-timers.'
    },
    {
      q: 'How much does a PADI Open Water certification cost in Thailand?',
      a: 'Koh Tao is one of the world\'s most affordable places to get PADI certified. Advertised prices start from around 6,500 THB but a realistic all-inclusive cost including equipment rental, certification card, and dive site fees is 9,900–12,000 THB (approximately USD 270–330 at 2025 rates). Always confirm exactly what is included. The Discover Scuba Diving introductory course costs around 2,500 THB. Phuket-based dive centres typically charge 15,000–20,000 THB for the same Open Water course.'
    },
    {
      q: 'When is the best time for diving in Thailand?',
      a: 'Thailand has two distinct dive seasons separated by geography. The Andaman coast (Phuket, Krabi, Khao Lak, Koh Lanta, Satun) is best from November to April — the Similan Islands park is legally open only from November 15 to May 15. The Gulf of Thailand coast (Koh Tao, Koh Phangan, Koh Samui) is best from March to October, with peak conditions May–September. There is no single month that is good for all regions simultaneously.'
    },
    {
      q: 'Is it safe to dive in Thailand without experience?',
      a: 'Yes, with appropriate supervision. Most dive sites near Phuket, Krabi, and Koh Tao cater to beginners. A Discover Scuba Diving experience (no certification required) allows first-timers to dive to 12 m with a certified instructor. Obtaining a PADI Open Water certification (minimum 3 days) qualifies you to dive independently to 18 m. Sites like Chumphon Pinnacle, Hin Daeng/Hin Muang, and Richelieu Rock require Advanced certification and experience due to depth and currents.'
    },
    {
      q: 'Are whale sharks common in Thailand?',
      a: 'Whale shark sightings are possible but not common. Chumphon Pinnacle (Gulf of Thailand) records an average of 3–4 confirmed sightings per season — the highest in the Gulf. Richelieu Rock and the Similan Islands offer the best Andaman chances, particularly January–April. Responsible operators follow DMCR interaction guidelines: no touching, no riding, minimum 3 m distance. Any operator guaranteeing a whale shark sighting should be treated with scepticism.'
    },
    {
      q: 'What marine conservation rules apply to divers in Thailand?',
      a: 'The Department of Marine and Coastal Resources (DMCR) and the Department of National Parks (DNP) jointly enforce Thailand\'s marine protected areas. Key rules: no anchoring in designated zones (moorings must be used), no coral touching or collection, chemical sunscreen banned in most national park waters, no fish feeding, and mandatory observer distances from whale sharks and manta rays. The Similan and Surin Islands are legally closed May 16 – November 14 each year. Violations carry fines under the National Park Act.'
    },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a
      }
    }))
  };

  return (
    <>
      <SEOHead title={title} description={description}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </SEOHead>

      <div className="bg-surface-cream min-h-screen">
        {/* Hero */}
        <section className="bg-surface-dark text-white">
          <div className="container-custom py-12">
            <Breadcrumbs items={breadcrumbs} />
            <div className="text-center mt-6">
              <p className="font-script text-thailand-gold text-lg mb-2">Diving & Snorkeling</p>
              <h1 className="text-4xl lg:text-5xl font-bold font-heading mb-4">
                Best Diving & Snorkeling in Thailand
              </h1>
              <p className="text-xl max-w-3xl mx-auto text-gray-300">
                From the granite boulders of the Similan Islands to the vertical chimney of Sail Rock — a factual guide to Thailand&apos;s top underwater destinations, with seasons, depths, and certification costs.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom">

            {/* Introduction */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-10">
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">Overview</h2>
              <p className="text-gray-700 mb-4">
                Thailand has two geographically distinct dive regions: the <strong>Andaman Sea</strong> on the west coast and the <strong>Gulf of Thailand</strong> on the east. They run on opposite monsoon cycles, which means the best diving in each region falls in different months — and planning around this is the single most important factor in choosing where and when to go.
              </p>
              <p className="text-gray-700 mb-4">
                The Andaman season runs from <strong>November to April</strong>. The Similan Islands national park is legally closed between May 16 and November 14 every year under a closure enforced by the Department of National Parks (DNP) to allow reef recovery. The Gulf of Thailand season runs from <strong>March to October</strong>, making Koh Tao and the surrounding area a practical destination during Andaman monsoon months.
              </p>
              <p className="text-gray-700">
                Koh Tao produces more PADI Open Water certifications than almost anywhere else on the planet, according to PADI&apos;s own destination profiles. Intense competition among roughly 100+ dive operators on the island keeps certification prices at 9,900–12,000 THB all-inclusive — among the lowest in the world. The Andaman sites generally cost more due to boat transfer distances, with liveaboards being the most common format for the Similan and Surin Islands.
              </p>
            </div>

            {/* Seasons Quick Reference */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-10">
              <div className="px-8 pt-8 pb-4">
                <p className="section-label">Seasons</p>
                <h2 className="text-2xl font-bold font-heading text-gray-900 mb-2">Diving Season by Region</h2>
                <p className="text-gray-600 text-sm mb-4">Thailand&apos;s two coasts operate on opposite monsoon cycles. Plan your trip around this before booking anything.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-surface-cream">
                    <tr>
                      <th className="px-6 py-4 font-semibold text-gray-700">Region</th>
                      <th className="px-6 py-4 font-semibold text-gray-700">Key Sites</th>
                      <th className="px-6 py-4 font-semibold text-gray-700">Dive Season</th>
                      <th className="px-6 py-4 font-semibold text-gray-700">Peak Conditions</th>
                      <th className="px-6 py-4 font-semibold text-gray-700">Avoid</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {seasonTable.map((row, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">{row.region}</td>
                        <td className="px-6 py-4 text-gray-600">{row.sites}</td>
                        <td className="px-6 py-4 text-green-700 font-semibold">{row.bestSeason}</td>
                        <td className="px-6 py-4 text-gray-700">{row.peakMonths}</td>
                        <td className="px-6 py-4 text-red-600">{row.avoid}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Individual Dive Site Profiles */}
            <div className="mb-4">
              <p className="section-label">Dive Sites</p>
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-2">Top 10 Dive Sites in Thailand</h2>
              <p className="text-gray-600 text-sm mb-8">Each profile includes verifiable location data, seasonal windows, depth ranges, and conservation context sourced from PADI dive site records, the DNP, and DMCR publications.</p>
            </div>

            <div className="space-y-8 mb-12">
              {diveSites.map((site, index) => (
                <div key={site.id} className="bg-white rounded-2xl shadow-md p-8">
                  <div className="flex items-start gap-4 mb-5">
                    <span className="text-sm font-bold text-white bg-thailand-blue w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <div>
                      <h2 className="text-2xl font-bold font-heading text-gray-900">{site.name}</h2>
                      <p className="text-sm text-gray-500 mt-1">{site.region}</p>
                    </div>
                  </div>

                  {/* Quick specs */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    <div className="bg-surface-cream rounded-xl p-3">
                      <div className="text-xs text-gray-500 mb-1">Season</div>
                      <div className="text-sm font-semibold text-gray-800">{site.season.split('(')[0].trim()}</div>
                    </div>
                    <div className="bg-surface-cream rounded-xl p-3">
                      <div className="text-xs text-gray-500 mb-1">Depth</div>
                      <div className="text-sm font-semibold text-gray-800">{site.depth}</div>
                    </div>
                    <div className="bg-surface-cream rounded-xl p-3">
                      <div className="text-xs text-gray-500 mb-1">Visibility</div>
                      <div className="text-sm font-semibold text-gray-800">{site.visibility}</div>
                    </div>
                    <div className="bg-surface-cream rounded-xl p-3">
                      <div className="text-xs text-gray-500 mb-1">Experience</div>
                      <div className="text-sm font-semibold text-gray-800">{site.experience.split(';')[0]}</div>
                    </div>
                  </div>

                  {/* Highlights */}
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">Key Facts</h3>
                  <ul className="space-y-2 mb-5">
                    {site.highlights.map((h, i) => (
                      <li key={i} className="flex gap-2 text-gray-700 text-sm">
                        <span className="text-thailand-blue mt-1 flex-shrink-0">&#8212;</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Conservation */}
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
                    <p className="text-xs font-semibold text-green-800 uppercase tracking-wide mb-1">Conservation & Regulations</p>
                    <p className="text-sm text-green-900">{site.conservation}</p>
                  </div>

                  {/* Contextual note */}
                  {site.note && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                      <p className="text-xs font-semibold text-amber-800 uppercase tracking-wide mb-1">Editorial Note</p>
                      <p className="text-sm text-amber-900">{site.note}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Certification Cost Section */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-10">
              <p className="section-label">Courses & Costs</p>
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">PADI Certification Costs in Thailand</h2>
              <p className="text-gray-700 mb-6">
                Koh Tao dominates the certification market due to extreme competition among operators. The price advantage is real, but advertised prices are not always all-inclusive. The table below reflects realistic all-in costs based on 2024–2025 market data from multiple Koh Tao dive centres.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-surface-cream">
                    <tr>
                      <th className="px-4 py-3 font-semibold text-gray-700">Course</th>
                      <th className="px-4 py-3 font-semibold text-gray-700">Koh Tao (THB)</th>
                      <th className="px-4 py-3 font-semibold text-gray-700">Phuket (THB)</th>
                      <th className="px-4 py-3 font-semibold text-gray-700">Duration</th>
                      <th className="px-4 py-3 font-semibold text-gray-700">Prerequisite</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">Discover Scuba Diving</td>
                      <td className="px-4 py-3 text-gray-700">~2,500</td>
                      <td className="px-4 py-3 text-gray-700">3,000–5,000</td>
                      <td className="px-4 py-3 text-gray-600">Half day</td>
                      <td className="px-4 py-3 text-gray-600">None (max 12 m with instructor)</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">PADI Open Water</td>
                      <td className="px-4 py-3 text-gray-700">9,900–12,000*</td>
                      <td className="px-4 py-3 text-gray-700">15,000–20,000</td>
                      <td className="px-4 py-3 text-gray-600">3–4 days</td>
                      <td className="px-4 py-3 text-gray-600">None (qualifies to 18 m)</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">PADI Advanced Open Water</td>
                      <td className="px-4 py-3 text-gray-700">~11,000</td>
                      <td className="px-4 py-3 text-gray-700">14,000–18,000</td>
                      <td className="px-4 py-3 text-gray-600">2 days</td>
                      <td className="px-4 py-3 text-gray-600">Open Water (qualifies to 30 m)</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">PADI Rescue Diver</td>
                      <td className="px-4 py-3 text-gray-700">12,000–16,000</td>
                      <td className="px-4 py-3 text-gray-700">16,000–22,000</td>
                      <td className="px-4 py-3 text-gray-600">3 days</td>
                      <td className="px-4 py-3 text-gray-600">Advanced OW + EFR</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">Divemaster (DM)</td>
                      <td className="px-4 py-3 text-gray-700">35,000–55,000</td>
                      <td className="px-4 py-3 text-gray-700">50,000–80,000</td>
                      <td className="px-4 py-3 text-gray-600">4–8 weeks</td>
                      <td className="px-4 py-3 text-gray-600">Rescue Diver + 40 logged dives</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                * Advertised Koh Tao Open Water prices from 6,500 THB may exclude equipment rental (2,000–3,000 THB), certification card fee (300–500 THB), and dive site fees. Confirm all inclusions before paying a deposit.
              </p>
            </div>

            {/* City index from data */}
            {cities.length > 0 && (
              <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-10">
                <div className="px-8 pt-8 pb-4">
                  <p className="section-label">By Destination</p>
                  <h2 className="text-2xl font-bold font-heading text-gray-900 mb-2">Browse Activities by City</h2>
                  <p className="text-gray-600 text-sm mb-4">Compare dive operators, trip prices, and available activities across Thailand&apos;s main dive destinations.</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-surface-cream">
                      <tr>
                        <th className="px-6 py-4 font-semibold text-gray-600">Destination</th>
                        <th className="px-6 py-4 font-semibold text-gray-600">Activities Listed</th>
                        <th className="px-6 py-4 font-semibold text-gray-600">Price Range</th>
                        <th className="px-6 py-4 font-semibold text-gray-600">Highlight</th>
                        <th className="px-6 py-4 font-semibold text-gray-600"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {cities.map((city) => (
                        <tr key={city.slug} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <Link href={`/city/${city.slug}/diving-snorkeling/`} className="font-semibold text-thailand-blue hover:underline">
                              {city.name.en}
                            </Link>
                          </td>
                          <td className="px-6 py-4 text-gray-700">{city.classCount}+</td>
                          <td className="px-6 py-4 text-gray-700">
                            {formatPrice(city.priceRange.from, loc)} – {formatPrice(city.priceRange.to, loc)}
                          </td>
                          <td className="px-6 py-4 text-gray-600">{city.highlight.en.split('.')[0]}</td>
                          <td className="px-6 py-4">
                            <Link
                              href={`/city/${city.slug}/diving-snorkeling/`}
                              className="text-sm font-semibold text-thailand-blue hover:text-blue-800"
                            >
                              View all &rarr;
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Top activities per city */}
            {cities.length > 0 && (
              <div className="space-y-6 mb-12">
                {cities.map((city, index) => {
                  const cityActivities = topActivities.filter(ta => ta.citySlug === city.slug).slice(0, 3);
                  if (cityActivities.length === 0) return null;
                  return (
                    <div key={city.slug} className="bg-white rounded-2xl shadow-md p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-sm font-bold text-white bg-thailand-blue w-8 h-8 rounded-xl flex items-center justify-center">
                          {index + 1}
                        </span>
                        <h3 className="text-xl font-bold font-heading text-gray-900">
                          <Link href={`/city/${city.slug}/diving-snorkeling/`} className="hover:text-thailand-blue">
                            Top Activities in {city.name.en}
                          </Link>
                        </h3>
                      </div>
                      <p className="text-gray-600 text-sm mb-5">{city.highlight.en}</p>
                      <div className="space-y-3 mb-5">
                        {cityActivities.map((ta, i) => (
                          <div key={ta.activity.slug} className="flex items-center justify-between p-3 bg-surface-cream rounded-xl">
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-bold text-gray-400">#{i + 1}</span>
                              <div>
                                <div className="font-medium text-gray-900 text-sm flex items-center gap-2">
                                  {ta.activity.name}
                                  <TypeBadge type={ta.activity.type} />
                                </div>
                                {ta.activity.rating > 0 && (
                                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                                    <StarRating rating={ta.activity.rating} />
                                    <span>{ta.activity.rating}</span>
                                    {ta.activity.reviews > 0 && <span>({ta.activity.reviews.toLocaleString()} reviews)</span>}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="font-bold text-gray-900 text-sm">{formatPrice(ta.activity.priceFrom, loc)}</div>
                          </div>
                        ))}
                      </div>
                      <Link
                        href={`/city/${city.slug}/diving-snorkeling/`}
                        className="inline-flex items-center text-thailand-blue font-semibold hover:text-blue-800 text-sm"
                      >
                        See all {city.classCount} activities in {city.name.en} &rarr;
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Marine Conservation section */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-10">
              <p className="section-label">Conservation</p>
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">Marine Conservation in Thailand</h2>
              <p className="text-gray-700 mb-4">
                Thailand&apos;s reefs have faced significant pressure from mass tourism, coral bleaching events (particularly the 2010 and 2016 episodes), and coastal development. The government has responded with policy and enforcement changes over the past decade.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-4">
                <div className="bg-surface-cream rounded-xl p-5">
                  <h3 className="font-semibold text-gray-900 mb-3">Government Bodies</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li><strong>Department of National Parks (DNP)</strong> — manages all national marine parks including the Similan and Surin Islands; enforces seasonal closures and anchoring bans</li>
                    <li><strong>Department of Marine and Coastal Resources (DMCR)</strong> — responsible for coral reef monitoring, rehabilitation, and the &quot;Reduce, Refrain, Rescue&quot; policy framework across Thai waters</li>
                    <li><strong>Marine and Coastal Research and Development Institute</strong> — operates under DMCR; conducts biological surveys of coral, seagrass, and mangrove habitats</li>
                  </ul>
                </div>
                <div className="bg-surface-cream rounded-xl p-5">
                  <h3 className="font-semibold text-gray-900 mb-3">Active NGO Programs</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li><strong>New Heaven Reef Conservation (Koh Tao)</strong> — long-running reef monitoring and coral gardening, operating since 2011; trains dive professionals in marine survey methodology</li>
                    <li><strong>COREsea (Koh Phangan / Samui Archipelago)</strong> — marine conservation research and education; runs coral nurseries and fish population surveys</li>
                    <li><strong>Big Blue Conservation (Koh Tao)</strong> — reef survey training and citizen science programs integrated with the dive instructor development centre</li>
                  </ul>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                <h3 className="font-semibold text-blue-900 mb-2">What Divers Can Do</h3>
                <ul className="space-y-1 text-sm text-blue-900">
                  <li>— Use reef-safe sunscreen (oxybenzone and octinoxate are banned inside most Thai national parks)</li>
                  <li>— Maintain neutral buoyancy to avoid accidental contact with coral</li>
                  <li>— Choose operators that use park-approved moorings and hold mandatory dive briefings</li>
                  <li>— Do not purchase coral, shells, or marine souvenirs — this is illegal under Thai law</li>
                  <li>— Observe the 3 m minimum distance rule for whale sharks and manta rays (DMCR guideline)</li>
                  <li>— Report anchor damage or illegal fishing to the nearest park authority</li>
                </ul>
              </div>
            </div>

            {/* Insurance */}
            <div className="bg-amber-50 rounded-2xl p-6 mb-10 border border-amber-200">
              <h3 className="font-bold text-amber-900 mb-2">Diving Insurance</h3>
              <p className="text-sm text-amber-800 mb-3">
                Standard travel insurance policies typically exclude scuba diving below 10 metres. Decompression sickness (DCS) treatment in a hyperbaric chamber costs USD 2,000–10,000 or more and is not covered by most general travel policies. Divers Alert Network (DAN) offers diving-specific medical insurance that covers hyperbaric treatment, medical evacuation, and diving-related injuries globally. DAN Asia-Pacific coverage starts from around USD 75 per year for recreational divers.
              </p>
              <Link href="/travel-insurance-thailand/" className="text-sm font-semibold text-thailand-blue hover:underline">
                Compare travel insurance options for Thailand &rarr;
              </Link>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-2xl shadow-md p-8 mb-12">
              <p className="section-label">FAQ</p>
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-7">
                {faqItems.map((item, i) => (
                  <div key={i}>
                    <h3 className="text-lg font-semibold font-heading text-gray-900 mb-2">{item.q}</h3>
                    <p className="text-gray-700">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sources */}
            <div className="bg-surface-cream rounded-2xl p-6 mb-12 border border-gray-200">
              <h3 className="font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wide">Sources & References</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>PADI Dive Site: Similan Islands National Marine Park — <a href="https://www.padi.com/dive-site/thailand/similan-islands-national-marine-park/" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">padi.com</a></li>
                <li>PADI Dive Site: Hin Daeng / Hin Muang — <a href="https://www.padi.com/dive-site/thailand/hin-daeng-hin-muang/" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">padi.com</a></li>
                <li>PADI Diving in Koh Tao — <a href="https://www.padi.com/diving-in/koh-tao/" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">padi.com</a></li>
                <li>PADI Dive Site: Sail Rock — <a href="https://www.padi.com/dive-site/thailand/sail-rock-3/" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">padi.com</a></li>
                <li>Similan Dive Center — Similan Islands Diving Season — <a href="https://similandivecenter.com/news/similan-islands-diving-season/" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">similandivecenter.com</a></li>
                <li>Richelieu Rock — Wikipedia — <a href="https://en.wikipedia.org/wiki/Richelieu_Rock" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">wikipedia.org</a></li>
                <li>Surin Islands — Wikipedia (Mu Koh Surin National Park) — <a href="https://en.wikipedia.org/wiki/Surin_Islands" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">wikipedia.org</a></li>
                <li>Tarutao National Marine Park — Trat Province — <a href="https://www.zubludiving.com/destination/thailand/andaman-sea/koh-lipe-and-tarutao" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">zubludiving.com</a></li>
                <li>Department of Marine and Coastal Resources (DMCR) — <a href="https://responsiblethailand.com/protecting-thailands-coral-reefs/" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">responsiblethailand.com</a></li>
                <li>New Heaven Reef Conservation, Koh Tao — <a href="https://newheavenreefconservation.org/" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">newheavenreefconservation.org</a></li>
                <li>Chumphon Pinnacle dive site — <a href="https://divehappy.com/thailand/koh-tao-dive-sites-chumphon-pinnacle/" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">divehappy.com</a></li>
                <li>Racha Islands diving — <a href="https://www.aussiediversphuket.com/day-trip-3-dives-racha-yai-racha-noi/" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">aussiediversphuket.com</a></li>
                <li>Koh Chang / HTMS Chang wreck — <a href="https://diving-kohchang.com/divesites-koh-chang/koh-rang-national-park/" target="_blank" rel="noopener noreferrer" className="text-thailand-blue hover:underline">diving-kohchang.com</a></li>
              </ul>
            </div>

            {/* Related Guides */}
            <div className="mb-8">
              <p className="section-label">Related Guides</p>
              <h2 className="text-2xl font-bold font-heading text-gray-900 mb-6">Plan Your Thailand Trip</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  { href: '/islands/', title: 'Thai Islands Guide', description: 'Factual profiles of Thailand\'s main islands — from the Andaman to the Gulf, with transport, costs, and best season.' },
                  { href: '/best-beaches-in-thailand/', title: 'Best Beaches in Thailand', description: 'Top beaches ranked by water clarity, crowd levels, and facilities across both coasts.' },
                  { href: '/best-places-to-visit-thailand/', title: 'Best Places to Visit', description: 'Thailand\'s top destinations ranked by experience type — beaches, culture, value, and adventure.' },
                  { href: '/thailand-for-first-timers/', title: "First Timer's Guide", description: 'Essential orientation for first-time visitors: safety, etiquette, transport, health, and must-do experiences.' },
                  { href: '/best-elephant-sanctuaries-in-thailand/', title: 'Elephant Sanctuaries', description: 'Ethical elephant experiences that prioritise animal welfare — with details on what to look for and what to avoid.' },
                  { href: '/travel-insurance-thailand/', title: 'Travel Insurance for Thailand', description: 'How to choose a policy that covers scuba diving, adventure activities, and medical evacuation.' },
                ].map((guide) => (
                  <Link
                    key={guide.href}
                    href={guide.href}
                    className="rounded-2xl bg-surface-cream p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                  >
                    <h3 className="mb-2 font-bold font-heading text-gray-900">{guide.title}</h3>
                    <p className="text-sm text-gray-600">{guide.description}</p>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const index = getDivingSnorkelingIndex();
  if (!index) return { notFound: true };

  const topActivities: { cityName: string; citySlug: string; activity: Activity }[] = [];

  index.cities.forEach((city: CityEntry) => {
    const data = getDivingSnorkelingByCity(city.slug) as CityData | null;
    if (data) {
      data.classes.slice(0, 3).forEach((activity: Activity) => {
        topActivities.push({
          cityName: city.name.en,
          citySlug: city.slug,
          activity
        });
      });
    }
  });

  return {
    props: {
      cities: index.cities,
      topActivities
    },
    revalidate: 604800
  };
};
