import { GetStaticProps } from 'next';
import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import type { ProvinceManifest } from '../../lib/province-types';

interface Props {
  provinces: ProvinceManifest[];
}

const regionOrder = ['northern', 'central', 'eastern', 'western', 'southern', 'isaan'];
const regionLabels: Record<string, string> = {
  northern: 'Northern Thailand',
  central: 'Central Thailand',
  southern: 'Southern Thailand',
  isaan: 'Isaan (Northeast)',
  eastern: 'Eastern Thailand',
  western: 'Western Thailand',
};

const regionDescriptions: Record<string, { intro: string; keyProvinces: string; highlights: string }> = {
  northern: {
    intro: 'Northern Thailand is the country\'s mountainous heartland, home to 17 provinces stretching from the lowlands of the Ping River valley to the forested highlands bordering Myanmar and Laos. The region is defined by cool winters, dense jungle, and a distinct cultural identity shaped by the ancient Lanna Kingdom, which ruled independently from Bangkok until 1932.',
    keyProvinces: 'Chiang Mai (the north\'s capital and cultural hub), Chiang Rai (gateway to the Golden Triangle), Mae Hong Son (remote mountain province near the Myanmar border), Lampang (traditional horse-carriages and heritage temples), and Phrae and Nan (authentic, tourist-light provinces with superb temples).',
    highlights: 'Trekking to hill tribe villages, Doi Inthanon National Park (Thailand\'s highest peak at 2,565m), the White Temple (Wat Rong Khun) in Chiang Rai, Chiang Mai\'s Sunday Walking Street, and the Yi Peng Lantern Festival.',
  },
  central: {
    intro: 'Central Thailand encompasses the broad, flat Chao Phraya River delta — Thailand\'s "rice bowl" — and the capital Bangkok, along with the ancient capital cities of Ayutthaya and Sukhothai. This is the political, economic, and cultural core of the kingdom, where the royal court tradition shaped everything from cuisine to architecture over seven centuries.',
    keyProvinces: 'Bangkok (the special administrative capital), Ayutthaya (UNESCO World Heritage ancient capital), Nakhon Pathom (tallest Buddhist monument in the world), Kanchanaburi (WWII history and Death Railway), Suphan Buri and Ang Thong (traditional farming heartland).',
    highlights: 'Ayutthaya Historical Park, the Death Railway Bridge over the River Kwai, Erawan National Park waterfalls, the Damnoen Saduak floating market, and Bangkok\'s Grand Palace complex.',
  },
  eastern: {
    intro: 'The Eastern region, sometimes called the Eastern Seaboard, combines Thailand\'s industrial engine with its most accessible island escapes. The Gulf coast here is dotted with islands famous for diving and nightlife, while the mainland houses Pattaya — one of Southeast Asia\'s largest resort cities — and Rayong, gateway to Koh Samet.',
    keyProvinces: 'Chonburi (home to Pattaya), Rayong (Koh Samet and fruit orchards), Chanthaburi (gem-trading capital and beautiful cathedral), Trat (gateway to Koh Chang archipelago), and Sa Kaeo (border province with Cambodia).',
    highlights: 'Koh Chang National Marine Park, Koh Samet\'s white sand beaches, Pattaya\'s entertainment scene, Chanthaburi\'s weekend gem market, and the Khao Kitchakut National Park waterfall.',
  },
  western: {
    intro: 'Western Thailand is the country\'s least-visited and most dramatically wild region, sharing a long forested border with Myanmar and containing some of Thailand\'s most pristine national parks. The region is thin in tourist infrastructure but rich in waterfalls, mountain scenery, and authentic provincial life.',
    keyProvinces: 'Kanchanaburi (shared with Central classification in some systems — WWII heritage, waterfalls, and tigers), Ratchaburi (Damnoen Saduak floating market), Phetchaburi (royal palace, UNESCO gastronomy city), Prachuap Khiri Khan (Hua Hin and Khao Sam Roi Yot National Park).',
    highlights: 'Three Pagodas Pass border crossing, Erawan National Park\'s tiered waterfalls, Hua Hin beach resort town, Khao Sam Roi Yot wetlands (freshwater caves and bird life), and Phetchaburi\'s hilltop palace (Phra Nakhon Khiri).',
  },
  southern: {
    intro: 'Southern Thailand is a long, narrow peninsula stretching 1,000km south to the Malaysian border, flanked on the west by the Andaman Sea and on the east by the Gulf of Thailand. The two coasts have entirely different weather patterns, cultures, and characters. The Andaman coast (Phuket, Krabi, Koh Lanta) has the most famous beaches globally. The Gulf coast (Koh Samui, Koh Phangan, Koh Tao) offers a separate travel circuit. The deep south (Songkhla, Pattani, Narathiwat) has a strong Malay Muslim identity and different travel considerations.',
    keyProvinces: 'Phuket (Thailand\'s largest island and most visited province), Krabi (Railay Beach, Phi Phi Islands), Surat Thani (gateway to Koh Samui, Koh Phangan, Koh Tao), Phang Nga (James Bond Island, mangroves), Trang and Satun (quiet snorkelling and cave diving).',
    highlights: 'Maya Bay (Koh Phi Phi Le), Full Moon Party on Koh Phangan, Koh Tao dive sites, Phang Nga Bay kayaking, Khao Sok National Park ancient rainforest, and Songkhla Old Town\'s multicultural architecture.',
  },
  isaan: {
    intro: 'Isan — the Northeastern plateau — is Thailand\'s largest, most populous, and least-toured region, covering a third of the country\'s landmass across 20 provinces. Bordered by Laos to the north and east and Cambodia to the southeast, Isan has a distinct Lao-influenced culture, language, cuisine, and traditions that differ sharply from Bangkok\'s Central Thai identity. It is the source of Thailand\'s most characterful food (som tam, larb, gai yang), its most exuberant festivals, and some of its most important ancient history.',
    keyProvinces: 'Khon Kaen (Isan\'s commercial capital and university city), Udon Thani (largest city, near Ban Chiang prehistoric site), Nakhon Ratchasima/Korat (gateway to Khao Yai National Park), Ubon Ratchathani (Candle Festival, Mekong River), Nong Khai (Mekong riverside, gateway to Laos), Buriram (Phanom Rung Khmer ruins).',
    highlights: 'Phanom Rung and Prasat Hin Phimai Khmer temple complexes, Ban Chiang UNESCO World Heritage prehistoric site, Khao Yai National Park (UNESCO), Nong Khai\'s Sala Kaew Ku sculpture park, the Ubon Ratchathani Candle Festival (July), and the Mekong River sunset cruise from Nong Khai.',
  },
};

export default function ProvinceIndex({ provinces }: Props) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Provinces', href: '/province/' },
  ];

  const grouped = regionOrder.reduce<Record<string, ProvinceManifest[]>>((acc, region) => {
    acc[region] = provinces.filter(p => p.region === region).sort((a, b) => a.provinceName.localeCompare(b.provinceName));
    return acc;
  }, {});

  return (
    <>
      <SEOHead
        title="All 77 Provinces of Thailand — Complete Province Guide 2026"
        description="Explore all 77 provinces of Thailand organised by region. Discover attractions, culture, and travel tips for every province from Bangkok to Bueng Kan."
      />
      <div className="bg-surface-cream min-h-screen">
        {/* Hero */}
        <section className="bg-white shadow-sm">
          <div className="container-custom py-8">
            <Breadcrumbs items={breadcrumbs} />
            <h1 className="text-4xl lg:text-5xl font-bold font-heading text-gray-900 mb-4">
              All 77 Provinces of Thailand
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              Thailand is divided into 77 provinces (changwat), each with its own unique character,
              culture, and attractions. Explore our growing collection of province guides organised by region.
            </p>
          </div>
        </section>

        <div className="container-custom py-8">

          {/* Editorial Introduction */}
          <section className="bg-white rounded-2xl p-8 shadow-sm mb-8">
            <h2 className="text-2xl font-bold font-heading text-gray-900 mb-4">Understanding Thailand's Provinces</h2>
            <div className="prose prose-base text-gray-700 max-w-none">
              <p className="mb-4">
                Thailand is administratively divided into 77 provinces (Thai: จังหวัด, changwat), plus Bangkok which has special administrative status as the capital. Each province is governed by a governor appointed by the Ministry of the Interior and is further divided into districts (amphoe), sub-districts (tambon), and villages (muban). This hierarchical structure has been in place since the administrative reforms of King Rama V in the late 19th century, which unified what had previously been a patchwork of semi-autonomous principalities under central Bangkok authority.
              </p>
              <p className="mb-4">
                For tourism and travel planning purposes, the 77 provinces are typically grouped into six broad geographic regions — Northern, Central, Eastern, Western, Southern, and Northeastern (Isan) — though Thailand also uses other grouping schemes for meteorological, statistical, and economic planning purposes. These regional groupings do not have separate administrative powers; they are simply useful ways to understand the country's geography and cultural diversity.
              </p>
              <p className="mb-4">
                Each region has a distinct cultural identity shaped by its geography, history, and neighboring countries. The North was the seat of the Lanna Kingdom and carries strong Burmese and Yunnan Chinese influences. The Northeast (Isan) is culturally Lao, sharing language, cuisine, and festivals with Laos across the Mekong River. The South is predominantly Muslim in its lower provinces, with Malay language and culture dominant near the Malaysian border. Central Thailand is the political and cultural heartland — home to Bangkok, the royal court, and the "standard Thai" language taught in schools nationwide.
              </p>
              <p className="mb-0">
                For travellers, the province system is most useful for understanding which part of the country you're visiting and what to expect in terms of culture, weather, and infrastructure. Tourist infrastructure is concentrated in a relatively small number of provinces — primarily Bangkok, Chiang Mai, Chiang Rai, Phuket, Krabi, Koh Samui (Surat Thani), Chonburi (Pattaya), and Kanchanaburi. Many of the 77 provinces see very few foreign visitors and offer some of the most authentic travel experiences Thailand has to offer.
              </p>
            </div>
          </section>

          {/* Stats */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-8 flex flex-wrap gap-6">
            <div>
              <span className="text-3xl font-bold text-thailand-blue">{provinces.length}</span>
              <span className="text-gray-500 ml-2">provinces covered</span>
            </div>
            <div>
              <span className="text-3xl font-bold text-gray-400">77</span>
              <span className="text-gray-500 ml-2">total provinces</span>
            </div>
            <div>
              <span className="text-3xl font-bold text-thailand-gold">6</span>
              <span className="text-gray-500 ml-2">geographic regions</span>
            </div>
          </div>

          {/* Provinces by region */}
          {regionOrder.map(region => {
            const regionProvinces = grouped[region];
            const regionInfo = regionDescriptions[region];
            if (!regionProvinces || regionProvinces.length === 0) return null;
            return (
              <section key={region} className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="w-1 h-7 bg-thailand-gold rounded-full inline-block" />
                  {regionLabels[region] || region}
                  <span className="text-sm font-normal text-gray-400 ml-2">({regionProvinces.length} provinces)</span>
                </h2>

                {regionInfo && (
                  <div className="bg-white rounded-2xl p-6 shadow-sm mb-4">
                    <p className="text-gray-700 text-sm leading-relaxed mb-3">{regionInfo.intro}</p>
                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-semibold text-gray-800 mb-1">Key Provinces</p>
                        <p className="text-gray-600">{regionInfo.keyProvinces}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 mb-1">Top Attractions</p>
                        <p className="text-gray-600">{regionInfo.highlights}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {regionProvinces.map(p => (
                    <Link
                      key={p.provinceSlug}
                      href={`/province/${p.provinceSlug}/`}
                      className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-thailand-blue/30 transition-all group"
                    >
                      <h3 className="font-bold text-gray-900 group-hover:text-thailand-blue transition-colors">
                        {p.provinceName}
                      </h3>
                      <span className="text-sm text-gray-500">{regionLabels[p.region]}</span>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}

          {/* Link to regions */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-2">Prefer a broader view?</h3>
            <p className="text-gray-600 text-sm mb-3">
              Explore Thailand by region for a higher-level overview of each part of the country — geography, culture, best times to visit, and key destinations.
            </p>
            <Link href="/region/" className="text-thailand-blue font-semibold hover:underline">
              View Thailand by Region →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { getAllProvinceManifests } = await import('../../lib/provinces');
  const provinces = getAllProvinceManifests();
  return {
    props: { provinces },
    revalidate: 86400,
  };
};
