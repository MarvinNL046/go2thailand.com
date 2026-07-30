import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(__dirname, '..');
const failures: string[] = [];

function read(relativePath: string) {
  const file = resolve(root, relativePath);
  if (!existsSync(file)) {
    failures.push(`Missing required file: ${relativePath}`);
    return '';
  }
  return readFileSync(file, 'utf8');
}

const primitives = [
  'components/design/EditorialHero.tsx',
  'components/design/PageSectionNav.tsx',
  'components/design/SectionHeading.tsx',
  'components/design/FaqSplitSection.tsx',
  'components/design/RelatedGuidesSection.tsx',
  'components/design/SourceMethodSection.tsx',
  'components/design/AffiliateDisclosure.tsx',
];
primitives.forEach(read);

const tailwind = read('tailwind.config.js');
for (const token of ["canvas: '#FCFAF6'", "tonal: '#F4EEE4'", "mist: '#E8EFEB'", "jade:", "saffron:", "charcoal: '#293531'"]) {
  if (!tailwind.includes(token)) failures.push(`Tailwind token missing: ${token}`);
}

const globals = read('styles/globals.css');
for (const cssClass of ['.btn-jade', '.btn-jade-pattern', '.btn-cream', '.eyebrow', '.heading-redesign', '.section-divider-bottom']) {
  if (!globals.includes(cssClass)) failures.push(`Global design class missing: ${cssClass}`);
}

const pilotTemplates = [
  'components/city/DestinationGuideTemplate.tsx',
  'components/city/AttractionsGuideTemplate.tsx',
  'components/attractions/AttractionDetailGuideTemplate.tsx',
  'components/weather/WeatherGuideTemplate.tsx',
  'components/weather/SeasonDecisionGuideTemplate.tsx',
  'components/hotels/HotelGuideTemplate.tsx',
  'components/hotels/HotelDetailGuideTemplate.tsx',
  'components/activities/ThailandExcursionsGuide.tsx',
  'components/transport/TransportHubGuide.tsx',
  'components/editorial/FirstTimeThailandGuide.tsx',
  'components/compare/PhuketKrabiComparisonGuide.tsx',
  'components/gear/PackingGuideTemplate.tsx',
  'components/itineraries/ThailandRouteGuide.tsx',
  'components/budget/ThailandBudgetGuide.tsx',
  'components/weather/ThailandWeatherHub.tsx',
  'components/safety/ThailandSafetyGuide.tsx',
  'components/visa/ThailandVisaGuide.tsx',
  'components/visa/ThailandTdacGuide.tsx',
  'components/visa/ThailandDtvGuide.tsx',
  'components/visa/ThailandRetirementVisaGuide.tsx',
  'components/visa/ThailandTouristVisaGuide.tsx',
  'components/visa/ThailandVisaExtensionGuide.tsx',
  'components/visa/ThailandEducationVisaGuide.tsx',
  'components/visa/ThailandLtrVisaGuide.tsx',
  'components/visa/ThailandPrivilegeGuide.tsx',
  'components/blog/ClimateUpdateGuideTemplate.tsx',
  'components/transport/AirportArrivalGuideTemplate.tsx',
  'components/markets/BangkokStreetFoodMarketsGuideEn.tsx',
  'components/editorial/BangkokFirstTimeTipsGuideEn.tsx',
  'components/safety/SoloFemaleThailandGuideEn.tsx',
  'components/food/ThailandFoodGuideEn.tsx',
  'components/food/ThailandStreetFoodGuideEn.tsx',
  'components/city/CityFoodGuideTemplate.tsx',
];
for (const template of pilotTemplates) {
  const source = read(template);
  for (const primitive of ['EditorialHero', 'PageSectionNav']) {
    if (!source.includes(primitive)) failures.push(`${template} does not use ${primitive}`);
  }
  for (const rawRoleColor of ['bg-[#fcfaf6]', 'bg-[#f4eee4]', 'bg-[#e8efeb]', 'bg-[#e9f0ed]']) {
    if (source.toLowerCase().includes(rawRoleColor)) failures.push(`${template} still uses raw role color ${rawRoleColor}`);
  }
}

const seasonDecisionTemplate = read('components/weather/SeasonDecisionGuideTemplate.tsx');
for (const proof of ['FaqSplitSection', 'RelatedGuidesSection', 'SourceMethodSection', 'AffiliateDisclosure', 'data-premium-template="season-decision-guide-en"']) {
  if (!seasonDecisionTemplate.includes(proof)) failures.push(`Season decision template does not use ${proof}`);
}
const seasonDecisionRoute = read('pages/city/[slug]/best-time-to-visit.tsx');
for (const proof of ['getEnSeasonDecisionGuide', 'SeasonDecisionGuideTemplate', 'EN_BEST_TIME_TO_WEATHER', 'EN_BEST_TIME_TO_CITY']) {
  if (!seasonDecisionRoute.includes(proof)) failures.push(`Best-time route does not preserve season-owner proof: ${proof}`);
}
const khaoSokSeasonData = read('data/seasons/en/khao-sok.ts');
for (const proof of ['earth-pak-dry-bag', 'simari-water-shoes', 'rainleaf-travel-towel', 'Check the current drybag price at Amazon']) {
  if (!khaoSokSeasonData.includes(proof)) failures.push(`Khao Sok season owner lacks contextual Amazon proof: ${proof}`);
}
const huaHinSeasonData = read('data/seasons/en/hua-hin.ts');
for (const proof of ['best time to visit', 'Amazon is deliberately not inserted', 'Sam Roi Yot']) {
  if (!huaHinSeasonData.includes(proof)) failures.push(`Hua Hin season owner lacks decision proof: ${proof}`);
}

const thailandFoodGuideEn = read('components/food/ThailandFoodGuideEn.tsx');
for (const proof of ['FaqSplitSection', 'RelatedGuidesSection', 'SourceMethodSection', 'AffiliateDisclosure', 'data-premium-template="thai-food-guide-en"', 'simple-thai-food-cookbook', 'thai-granite-mortar-eight-inch', 'zojirushi-six-cup-rice-cooker']) {
  if (!thailandFoodGuideEn.includes(proof)) failures.push(`English Thai-food owner lacks proof: ${proof}`);
}
const travelGuideRoute = read('pages/travel-guides/[slug].tsx');
for (const proof of ['ThailandFoodGuideEn', "guide.slug === 'thai-cuisine-food-guide'"]) {
  if (!travelGuideRoute.includes(proof)) failures.push(`Travel-guide route does not wire Thai-food owner proof: ${proof}`);
}
if (!read('lib/blog.js').includes("'what-is-thai-food-cuisine-guide': '/travel-guides/thai-cuisine-food-guide/'")) failures.push('The obsolete what-is-Thai-food blog is not consolidated into the researched owner');

const thailandStreetFoodGuideEn = read('components/food/ThailandStreetFoodGuideEn.tsx');
for (const proof of ['FaqSplitSection', 'RelatedGuidesSection', 'SourceMethodSection', 'AffiliateDisclosure', 'data-premium-template="thai-street-food-guide-en"', 'simple-thai-food-cookbook', 'thai-granite-mortar-eight-inch']) {
  if (!thailandStreetFoodGuideEn.includes(proof)) failures.push(`English street-food owner lacks proof: ${proof}`);
}
const thailandStreetFoodRoute = read('pages/thailand-street-food.tsx');
if (!thailandStreetFoodRoute.includes('ThailandStreetFoodGuideEn')) failures.push('Standalone street-food route does not wire the English premium owner');
if (!read('lib/blog.js').includes("'thai-street-food-guide-2026': '/thailand-street-food/'")) failures.push('The obsolete English street-food blog is not consolidated into the evergreen owner');

const cityFoodTemplate = read('components/city/CityFoodGuideTemplate.tsx');
const ayutthayaCityFoodEn = read('data/city-food/en/ayutthaya.ts');
const bangkokCityFoodEn = read('data/city-food/en/bangkok.ts');
const buengKanCityFoodEn = read('data/city-food/en/bueng-kan.ts');
const chanthaburiCityFoodEn = read('data/city-food/en/chanthaburi.ts');
const chiangKhanCityFoodEn = read('data/city-food/en/chiang-khan.ts');
const chumphonCityFoodEn = read('data/city-food/en/chumphon.ts');
const chiangRaiCityFoodEn = read('data/city-food/en/chiang-rai.ts');
const chiangMaiCityFoodEn = read('data/city-food/en/chiang-mai.ts');
const hatYaiCityFoodEn = read('data/city-food/en/hat-yai.ts');
const huaHinCityFoodEn = read('data/city-food/en/hua-hin.ts');
const kanchanaburiCityFoodEn = read('data/city-food/en/kanchanaburi.ts');
const khonKaenCityFoodEn = read('data/city-food/en/khon-kaen.ts');
const kohSamuiCityFoodEn = read('data/city-food/en/koh-samui.ts');
const khaoSokCityFoodEn = read('data/city-food/en/khao-sok.ts');
const krabiCityFoodEn = read('data/city-food/en/krabi.ts');
const ayutthayaCityFoodNl = read('data/city-food/nl/ayutthaya.ts');
const bangkokCityFoodNl = read('data/city-food/nl/bangkok.ts');
const chiangRaiCityFoodNl = read('data/city-food/nl/chiang-rai.ts');
const chiangMaiCityFoodNl = read('data/city-food/nl/chiang-mai.ts');
const hatYaiCityFoodNl = read('data/city-food/nl/hat-yai.ts');
const krabiCityFoodNl = read('data/city-food/nl/krabi.ts');
const khonKaenCityFoodNl = read('data/city-food/nl/khon-kaen.ts');
const lampangCityFoodNl = read('data/city-food/nl/lampang.ts');
const maeHongSonCityFoodNl = read('data/city-food/nl/mae-hong-son.ts');
const paiCityFoodNl = read('data/city-food/nl/pai.ts');
const pattayaCityFoodNl = read('data/city-food/nl/pattaya.ts');
const phuketCityFoodNl = read('data/city-food/nl/phuket.ts');
const sukhothaiCityFoodNl = read('data/city-food/nl/sukhothai.ts');
const suratThaniCityFoodNl = read('data/city-food/nl/surat-thani.ts');
const lampangCityFoodEn = read('data/city-food/en/lampang.ts');
const lopburiCityFoodEn = read('data/city-food/en/lopburi.ts');
const maeHongSonCityFoodEn = read('data/city-food/en/mae-hong-son.ts');
const mukdahanCityFoodEn = read('data/city-food/en/mukdahan.ts');
const nakhonRatchasimaCityFoodEn = read('data/city-food/en/nakhon-ratchasima.ts');
const nakhonSiThammaratCityFoodEn = read('data/city-food/en/nakhon-si-thammarat.ts');
const nakhonPhanomCityFoodEn = read('data/city-food/en/nakhon-phanom.ts');
const paiCityFoodEn = read('data/city-food/en/pai.ts');
const pattayaCityFoodEn = read('data/city-food/en/pattaya.ts');
const phitsanulokCityFoodEn = read('data/city-food/en/phitsanulok.ts');
const tratCityFoodEn = read('data/city-food/en/trat.ts');
const trangCityFoodEn = read('data/city-food/en/trang.ts');
const nongKhaiCityFoodEn = read('data/city-food/en/nong-khai.ts');
const rayongCityFoodEn = read('data/city-food/en/rayong.ts');
const phuketCityFoodEn = read('data/city-food/en/phuket.ts');
const sukhothaiCityFoodEn = read('data/city-food/en/sukhothai.ts');
const suratThaniCityFoodEn = read('data/city-food/en/surat-thani.ts');
const udonThaniCityFoodEn = read('data/city-food/en/udon-thani.ts');
const ubonRatchathaniCityFoodEn = read('data/city-food/en/ubon-ratchathani.ts');
const cityFoodRegistryEn = read('data/city-food/en/index.ts');
const cityFoodRegistryNl = read('data/city-food/nl/index.ts');
const cityFoodRoute = read('pages/city/[slug]/food.tsx');
for (const proof of ['EditorialHero', 'PageSectionNav', 'FaqSplitSection', 'RelatedGuidesSection', 'SourceMethodSection', 'AffiliateDisclosure', 'data-premium-template={`city-food-guide-${isNl']) {
  if (!cityFoodTemplate.includes(proof)) failures.push(`City-food template lacks premium proof: ${proof}`);
}
for (const proof of ['formats:', 'districts:', 'dishes:', 'dayPlan:', 'practicalChecks:', 'phrases:', 'faqs:', 'sources:', 'simple-thai-food-cookbook', 'thai-granite-mortar-eight-inch']) {
  if (!ayutthayaCityFoodNl.includes(proof)) failures.push(`Dutch Ayutthaya city-food owner lacks content proof: ${proof}`);
  if (!bangkokCityFoodNl.includes(proof)) failures.push(`Dutch Bangkok city-food owner lacks content proof: ${proof}`);
  if (!chiangRaiCityFoodNl.includes(proof)) failures.push(`Dutch Chiang Rai city-food owner lacks content proof: ${proof}`);
  if (!chiangMaiCityFoodNl.includes(proof)) failures.push(`Dutch Chiang Mai city-food owner lacks content proof: ${proof}`);
  if (!hatYaiCityFoodNl.includes(proof)) failures.push(`Dutch Hat Yai city-food owner lacks content proof: ${proof}`);
  if (!krabiCityFoodNl.includes(proof)) failures.push(`Dutch Krabi city-food owner lacks content proof: ${proof}`);
  if (!khonKaenCityFoodNl.includes(proof)) failures.push(`Dutch Khon Kaen city-food owner lacks content proof: ${proof}`);
  if (!lampangCityFoodNl.includes(proof)) failures.push(`Dutch Lampang city-food owner lacks content proof: ${proof}`);
  if (!maeHongSonCityFoodNl.includes(proof)) failures.push(`Dutch Mae Hong Son city-food owner lacks content proof: ${proof}`);
  if (!paiCityFoodNl.includes(proof)) failures.push(`Dutch Pai city-food owner lacks content proof: ${proof}`);
  if (!pattayaCityFoodNl.includes(proof)) failures.push(`Dutch Pattaya city-food owner lacks content proof: ${proof}`);
  if (!phuketCityFoodNl.includes(proof)) failures.push(`Dutch Phuket city-food owner lacks content proof: ${proof}`);
  if (!sukhothaiCityFoodNl.includes(proof)) failures.push(`Dutch Sukhothai city-food owner lacks content proof: ${proof}`);
  if (!suratThaniCityFoodNl.includes(proof)) failures.push(`Dutch Surat Thani city-food owner lacks content proof: ${proof}`);
  if (!ayutthayaCityFoodEn.includes(proof)) failures.push(`Ayutthaya city-food owner lacks content proof: ${proof}`);
  if (!bangkokCityFoodEn.includes(proof)) failures.push(`Bangkok city-food owner lacks content proof: ${proof}`);
  if (!buengKanCityFoodEn.includes(proof)) failures.push(`Bueng Kan city-food owner lacks content proof: ${proof}`);
  if (!chanthaburiCityFoodEn.includes(proof)) failures.push(`Chanthaburi city-food owner lacks content proof: ${proof}`);
  if (!chiangKhanCityFoodEn.includes(proof)) failures.push(`Chiang Khan city-food owner lacks content proof: ${proof}`);
  if (!chumphonCityFoodEn.includes(proof)) failures.push(`Chumphon city-food owner lacks content proof: ${proof}`);
  if (!chiangRaiCityFoodEn.includes(proof)) failures.push(`Chiang Rai city-food owner lacks content proof: ${proof}`);
  if (!chiangMaiCityFoodEn.includes(proof)) failures.push(`Chiang Mai city-food owner lacks content proof: ${proof}`);
  if (!hatYaiCityFoodEn.includes(proof)) failures.push(`Hat Yai city-food owner lacks content proof: ${proof}`);
  if (!huaHinCityFoodEn.includes(proof)) failures.push(`Hua Hin city-food owner lacks content proof: ${proof}`);
  if (!kanchanaburiCityFoodEn.includes(proof)) failures.push(`Kanchanaburi city-food owner lacks content proof: ${proof}`);
  if (!khonKaenCityFoodEn.includes(proof)) failures.push(`Khon Kaen city-food owner lacks content proof: ${proof}`);
  if (!kohSamuiCityFoodEn.includes(proof)) failures.push(`Koh Samui city-food owner lacks content proof: ${proof}`);
  if (!khaoSokCityFoodEn.includes(proof)) failures.push(`Khao Sok city-food owner lacks content proof: ${proof}`);
  if (!krabiCityFoodEn.includes(proof)) failures.push(`Krabi city-food owner lacks content proof: ${proof}`);
  if (!lampangCityFoodEn.includes(proof)) failures.push(`Lampang city-food owner lacks content proof: ${proof}`);
  if (!lopburiCityFoodEn.includes(proof)) failures.push(`Lopburi city-food owner lacks content proof: ${proof}`);
  if (!maeHongSonCityFoodEn.includes(proof)) failures.push(`Mae Hong Son city-food owner lacks content proof: ${proof}`);
  if (!mukdahanCityFoodEn.includes(proof)) failures.push(`Mukdahan city-food owner lacks content proof: ${proof}`);
  if (!nakhonRatchasimaCityFoodEn.includes(proof)) failures.push(`Nakhon Ratchasima city-food owner lacks content proof: ${proof}`);
  if (!nakhonSiThammaratCityFoodEn.includes(proof)) failures.push(`Nakhon Si Thammarat city-food owner lacks content proof: ${proof}`);
  if (!nakhonPhanomCityFoodEn.includes(proof)) failures.push(`Nakhon Phanom city-food owner lacks content proof: ${proof}`);
  if (!paiCityFoodEn.includes(proof)) failures.push(`Pai city-food owner lacks content proof: ${proof}`);
  if (!pattayaCityFoodEn.includes(proof)) failures.push(`Pattaya city-food owner lacks content proof: ${proof}`);
  if (!phitsanulokCityFoodEn.includes(proof)) failures.push(`Phitsanulok city-food owner lacks content proof: ${proof}`);
  if (!tratCityFoodEn.includes(proof)) failures.push(`Trat city-food owner lacks content proof: ${proof}`);
  if (!trangCityFoodEn.includes(proof)) failures.push(`Trang city-food owner lacks content proof: ${proof}`);
  if (!nongKhaiCityFoodEn.includes(proof)) failures.push(`Nong Khai city-food owner lacks content proof: ${proof}`);
  if (!rayongCityFoodEn.includes(proof)) failures.push(`Rayong city-food owner lacks content proof: ${proof}`);
  if (!phuketCityFoodEn.includes(proof)) failures.push(`Phuket city-food owner lacks content proof: ${proof}`);
  if (!sukhothaiCityFoodEn.includes(proof)) failures.push(`Sukhothai city-food owner lacks content proof: ${proof}`);
  if (!suratThaniCityFoodEn.includes(proof)) failures.push(`Surat Thani city-food owner lacks content proof: ${proof}`);
  if (!udonThaniCityFoodEn.includes(proof)) failures.push(`Udon Thani city-food owner lacks content proof: ${proof}`);
  if (!ubonRatchathaniCityFoodEn.includes(proof)) failures.push(`Ubon Ratchathani city-food owner lacks content proof: ${proof}`);
}
for (const proof of ['ayutthayaCityFoodNl', 'ayutthaya: ayutthayaCityFoodNl', 'bangkokCityFoodNl', 'bangkok: bangkokCityFoodNl', 'chiangRaiCityFoodNl', "'chiang-rai': chiangRaiCityFoodNl", 'chiangMaiCityFoodNl', "'chiang-mai': chiangMaiCityFoodNl", 'hatYaiCityFoodNl', "'hat-yai': hatYaiCityFoodNl", 'khonKaenCityFoodNl', "'khon-kaen': khonKaenCityFoodNl", 'krabiCityFoodNl', 'krabi: krabiCityFoodNl', 'lampangCityFoodNl', 'lampang: lampangCityFoodNl', 'maeHongSonCityFoodNl', "'mae-hong-son': maeHongSonCityFoodNl", 'paiCityFoodNl', 'pai: paiCityFoodNl', 'pattayaCityFoodNl', 'pattaya: pattayaCityFoodNl', 'phuketCityFoodNl', 'phuket: phuketCityFoodNl', 'sukhothaiCityFoodNl', 'sukhothai: sukhothaiCityFoodNl', 'suratThaniCityFoodNl', "'surat-thani': suratThaniCityFoodNl"]) {
  if (!cityFoodRegistryNl.includes(proof)) failures.push(`Dutch city-food registry lacks owner proof: ${proof}`);
}
for (const proof of ["locale: 'nl'", "pageUrl: 'https://go2-thailand.com/nl/city/bangkok/food/'"]) {
  if (!bangkokCityFoodNl.includes(proof)) failures.push(`Dutch Bangkok city-food owner lacks locale proof: ${proof}`);
}
for (const proof of ["locale: 'nl'", "pageUrl: 'https://go2-thailand.com/nl/city/ayutthaya/food/'"]) {
  if (!ayutthayaCityFoodNl.includes(proof)) failures.push(`Dutch Ayutthaya city-food owner lacks locale proof: ${proof}`);
}
for (const proof of ["locale: 'nl'", "pageUrl: 'https://go2-thailand.com/nl/city/chiang-rai/food/'"]) {
  if (!chiangRaiCityFoodNl.includes(proof)) failures.push(`Dutch Chiang Rai city-food owner lacks locale proof: ${proof}`);
}
for (const proof of ["locale: 'nl'", "pageUrl: 'https://go2-thailand.com/nl/city/hat-yai/food/'"]) {
  if (!hatYaiCityFoodNl.includes(proof)) failures.push(`Dutch Hat Yai city-food owner lacks locale proof: ${proof}`);
}
for (const proof of ["locale: 'nl'", "pageUrl: 'https://go2-thailand.com/nl/city/chiang-mai/food/'"]) {
  if (!chiangMaiCityFoodNl.includes(proof)) failures.push(`Dutch Chiang Mai city-food owner lacks locale proof: ${proof}`);
}
for (const proof of ["locale: 'nl'", "pageUrl: 'https://go2-thailand.com/nl/city/krabi/food/'"]) {
  if (!krabiCityFoodNl.includes(proof)) failures.push(`Dutch Krabi city-food owner lacks locale proof: ${proof}`);
}
for (const proof of ["locale: 'nl'", "pageUrl: 'https://go2-thailand.com/nl/city/khon-kaen/food/'", 'khon-kaen-food-lake-isaan-nl.webp']) {
  if (!khonKaenCityFoodNl.includes(proof)) failures.push(`Dutch Khon Kaen city-food owner lacks locale or asset proof: ${proof}`);
}
for (const proof of ["locale: 'nl'", "pageUrl: 'https://go2-thailand.com/nl/city/lampang/food/'", 'lampang-food-wang-river-rooster-nl.webp']) {
  if (!lampangCityFoodNl.includes(proof)) failures.push(`Dutch Lampang city-food owner lacks locale or asset proof: ${proof}`);
}
for (const proof of ["locale: 'nl'", "pageUrl: 'https://go2-thailand.com/nl/city/mae-hong-son/food/'", 'mae-hong-son-food-lake-shan-nl.webp']) {
  if (!maeHongSonCityFoodNl.includes(proof)) failures.push(`Dutch Mae Hong Son city-food owner lacks locale or asset proof: ${proof}`);
}
for (const proof of ["locale: 'nl'", "pageUrl: 'https://go2-thailand.com/nl/city/pattaya/food/'"]) {
  if (!pattayaCityFoodNl.includes(proof)) failures.push(`Dutch Pattaya city-food owner lacks locale proof: ${proof}`);
}
for (const proof of ["locale: 'nl'", "pageUrl: 'https://go2-thailand.com/nl/city/phuket/food/'"]) {
  if (!phuketCityFoodNl.includes(proof)) failures.push(`Dutch Phuket city-food owner lacks locale proof: ${proof}`);
}
for (const proof of ["locale: 'nl'", "pageUrl: 'https://go2-thailand.com/nl/city/sukhothai/food/'", 'sukhothai-food-lotus-table-nl.webp']) {
  if (!sukhothaiCityFoodNl.includes(proof)) failures.push(`Dutch Sukhothai city-food owner lacks locale or asset proof: ${proof}`);
}
for (const proof of ["locale: 'nl'", "pageUrl: 'https://go2-thailand.com/nl/city/surat-thani/food/'", 'surat-thani-food-tapi-table-nl.webp']) {
  if (!suratThaniCityFoodNl.includes(proof)) failures.push(`Dutch Surat Thani city-food owner lacks locale or asset proof: ${proof}`);
}
for (const proof of ["locale: 'nl'", "pageUrl: 'https://go2-thailand.com/nl/city/pai/food/'", 'pai-food-valley-lanterns-nl.webp']) {
  if (!paiCityFoodNl.includes(proof)) failures.push(`Dutch Pai city-food owner lacks locale or asset proof: ${proof}`);
}
for (const proof of ['ayutthayaCityFoodEn', 'bangkokCityFoodEn', 'buengKanCityFoodEn', 'chanthaburiCityFoodEn', 'chiangKhanCityFoodEn', 'chumphonCityFoodEn', 'chiangRaiCityFoodEn', 'chiangMaiCityFoodEn', 'hatYaiCityFoodEn', 'huaHinCityFoodEn', 'kanchanaburiCityFoodEn', 'khonKaenCityFoodEn', 'kohSamuiCityFoodEn', 'khaoSokCityFoodEn', 'krabiCityFoodEn', 'lampangCityFoodEn', 'nakhonSiThammaratCityFoodEn', 'paiCityFoodEn', 'pattayaCityFoodEn', 'phuketCityFoodEn', 'sukhothaiCityFoodEn', 'suratThaniCityFoodEn', 'ayutthaya: ayutthayaCityFoodEn', "'bueng-kan': buengKanCityFoodEn", 'chanthaburi: chanthaburiCityFoodEn', "'chiang-khan': chiangKhanCityFoodEn", 'chumphon: chumphonCityFoodEn', "'chiang-rai': chiangRaiCityFoodEn", "'chiang-mai': chiangMaiCityFoodEn", "'hat-yai': hatYaiCityFoodEn", "'hua-hin': huaHinCityFoodEn", 'kanchanaburi: kanchanaburiCityFoodEn', "'khon-kaen': khonKaenCityFoodEn", "'koh-samui': kohSamuiCityFoodEn", "'khao-sok': khaoSokCityFoodEn", 'krabi: krabiCityFoodEn', 'lampang: lampangCityFoodEn', "'nakhon-si-thammarat': nakhonSiThammaratCityFoodEn", 'pai: paiCityFoodEn', 'pattaya: pattayaCityFoodEn', 'phuket: phuketCityFoodEn', 'sukhothai: sukhothaiCityFoodEn', "'surat-thani': suratThaniCityFoodEn", 'getEnCityFoodGuide']) {
  if (!cityFoodRegistryEn.includes(proof)) failures.push(`English city-food registry lacks owner proof: ${proof}`);
}
for (const proof of ['CityFoodGuideTemplate', 'getEnCityFoodGuide', 'getNlCityFoodGuide', 'cityFoodGuide']) {
  if (!cityFoodRoute.includes(proof)) failures.push(`City-food route lacks registry wiring: ${proof}`);
}
for (const proof of ['maeHongSonCityFoodEn', "'mae-hong-son': maeHongSonCityFoodEn"]) {
  if (!cityFoodRegistryEn.includes(proof)) failures.push(`English city-food registry lacks Mae Hong Son owner proof: ${proof}`);
}
for (const proof of ['mukdahanCityFoodEn', 'mukdahan: mukdahanCityFoodEn']) {
  if (!cityFoodRegistryEn.includes(proof)) failures.push(`English city-food registry lacks Mukdahan owner proof: ${proof}`);
}
for (const asset of ['mukdahan-food-mekong-market-table.webp', 'mukdahan-food.webp', 'mukdahan-indochina-market.webp', 'mukdahan-river-route.webp']) {
  if (!mukdahanCityFoodEn.includes(asset)) failures.push(`Mukdahan city-food owner does not use ${asset}`);
  read(`public/images/redesign/${asset}`);
}
for (const proof of ['udonThaniCityFoodEn', "'udon-thani': udonThaniCityFoodEn"]) {
  if (!cityFoodRegistryEn.includes(proof)) failures.push(`English city-food registry lacks Udon Thani owner proof: ${proof}`);
}
for (const proof of ['nakhonRatchasimaCityFoodEn', "'nakhon-ratchasima': nakhonRatchasimaCityFoodEn"]) {
  if (!cityFoodRegistryEn.includes(proof)) failures.push(`English city-food registry lacks Nakhon Ratchasima owner proof: ${proof}`);
}
for (const proof of ['nakhonPhanomCityFoodEn', "'nakhon-phanom': nakhonPhanomCityFoodEn"]) {
  if (!cityFoodRegistryEn.includes(proof)) failures.push(`English city-food registry lacks Nakhon Phanom owner proof: ${proof}`);
}
for (const asset of ['nakhon-phanom-food-mekong-breakfast.webp', 'nakhon-phanom-food.webp', 'nakhon-phanom-clock-tower.webp', 'nakhon-phanom-route-banner.webp']) {
  if (!nakhonPhanomCityFoodEn.includes(asset)) failures.push(`Nakhon Phanom city-food owner does not use ${asset}`);
  read(`public/images/redesign/${asset}`);
}
for (const proof of ['ubonRatchathaniCityFoodEn', "'ubon-ratchathani': ubonRatchathaniCityFoodEn"]) {
  if (!cityFoodRegistryEn.includes(proof)) failures.push(`English city-food registry lacks Ubon Ratchathani owner proof: ${proof}`);
}
for (const proof of ['lopburiCityFoodEn', 'lopburi: lopburiCityFoodEn']) {
  if (!cityFoodRegistryEn.includes(proof)) failures.push(`English city-food registry lacks Lopburi owner proof: ${proof}`);
}
for (const proof of ['phitsanulokCityFoodEn', 'phitsanulok: phitsanulokCityFoodEn']) {
  if (!cityFoodRegistryEn.includes(proof)) failures.push(`English city-food registry lacks Phitsanulok owner proof: ${proof}`);
}
for (const asset of ['phitsanulok-food-nan-river-table.webp', 'phitsanulok-nan-night-market.webp']) {
  if (!phitsanulokCityFoodEn.includes(asset)) failures.push(`Phitsanulok city-food owner does not use ${asset}`);
  read(`public/images/redesign/${asset}`);
}
for (const proof of ['tratCityFoodEn', 'trat: tratCityFoodEn']) {
  if (!cityFoodRegistryEn.includes(proof)) failures.push(`English city-food registry lacks Trat owner proof: ${proof}`);
}
for (const asset of ['trat-food-eastern-table.webp', 'trat-food.webp', 'trat-old-town.webp', 'trat-ban-nam-chiao.webp']) {
  if (!tratCityFoodEn.includes(asset)) failures.push(`Trat city-food owner does not use ${asset}`);
  read(`public/images/redesign/${asset}`);
}
for (const proof of ['trangCityFoodEn', 'trang: trangCityFoodEn']) {
  if (!cityFoodRegistryEn.includes(proof)) failures.push(`English city-food registry lacks Trang owner proof: ${proof}`);
}
for (const asset of ['trang-food-breakfast-table.webp', 'trang-breakfast.webp', 'trang-kantang-station.webp']) {
  if (!trangCityFoodEn.includes(asset)) failures.push(`Trang city-food owner does not use ${asset}`);
  read(`public/images/redesign/${asset}`);
}
for (const proof of ['nongKhaiCityFoodEn', "'nong-khai': nongKhaiCityFoodEn"]) {
  if (!cityFoodRegistryEn.includes(proof)) failures.push(`English city-food registry lacks Nong Khai owner proof: ${proof}`);
}
for (const asset of ['nong-khai-food-mekong-table.webp', 'nong-khai-food.webp', 'nong-khai-tha-sadet.webp']) {
  if (!nongKhaiCityFoodEn.includes(asset)) failures.push(`Nong Khai city-food owner does not use ${asset}`);
  read(`public/images/redesign/${asset}`);
}
for (const proof of ['rayongCityFoodEn', 'rayong: rayongCityFoodEn']) {
  if (!cityFoodRegistryEn.includes(proof)) failures.push(`English city-food registry lacks Rayong owner proof: ${proof}`);
}
for (const asset of ['rayong-food-eastern-gulf-table.webp', 'rayong-yomjinda-old-town.webp', 'rayong-fruit-orchard.webp', 'rayong-destination-hero.webp']) {
  if (!rayongCityFoodEn.includes(asset)) failures.push(`Rayong city-food owner does not use ${asset}`);
  read(`public/images/redesign/${asset}`);
}
for (const sitemap of [read('public/sitemap.xml'), read('public/sitemap-nl.xml')]) {
  if (!sitemap.includes('/thailand-street-food/')) failures.push('Street-food owner is missing from a locale sitemap');
  if (sitemap.includes('/blog/thai-street-food-guide-2026/')) failures.push('A locale sitemap still exposes the obsolete street-food blog owner');
}
const hreflang = read('components/Hreflang.tsx');
if (!hreflang.includes('CROSS_LOCALE_ALTERNATES')) failures.push('Hreflang keeps no explicit cross-locale mapping registry');
if (hreflang.includes("'/travel-guides/thai-cuisine-food-guide/'")) failures.push('The independent English Thai-food guide must not borrow the NL food-hub hreflang');

const climateUpdateTemplate = read('components/blog/ClimateUpdateGuideTemplate.tsx');
const climateUpdateData = read('data/climate/nl/el-nino-2026.ts');
const climateUpdateRoute = read('pages/blog/[slug].tsx');
for (const proof of ['FaqSplitSection', 'RelatedGuidesSection', 'SourceMethodSection', 'AffiliateDisclosure']) {
  if (!climateUpdateTemplate.includes(proof)) failures.push(`Climate update template does not use ${proof}`);
}
for (const proof of ['status:', 'fundamentals:', 'regions:', 'decisionPlan:', 'kit:', 'faqs:', 'sources:']) {
  if (!climateUpdateData.includes(proof)) failures.push(`El Niño climate data does not define ${proof}`);
}
for (const asset of ['thailand-el-nino-weather-hero.webp', 'el-nino-thailand-day-kit.webp']) {
  if (!climateUpdateData.includes(asset)) failures.push(`El Niño climate data does not use ${asset}`);
  read(`public/images/redesign/${asset}`);
}
for (const proof of ['ClimateUpdateGuideTemplate', 'getNlClimateUpdateGuide']) {
  if (!climateUpdateRoute.includes(proof)) failures.push(`Blog detail route does not wire ${proof}`);
}

const destinationIndexTemplate = read('components/destinations/DestinationIndexGuide.tsx');
for (const primitive of ['SectionHeading', 'FaqSplitSection', 'RelatedGuidesSection', 'SourceMethodSection', 'ThailandMapGraphic']) {
  if (!destinationIndexTemplate.includes(primitive)) failures.push(`DestinationIndexGuide does not use ${primitive}`);
}
if (!read('pages/city/index.tsx').includes('DestinationIndexGuide')) failures.push('The city index does not wire the destination index template');
if (!read('pages/activities/index.tsx').includes('ThailandExcursionsGuide')) failures.push('The activities index does not wire the commercial activity template');
if (!read('pages/transport/index.tsx').includes('TransportHubGuide')) failures.push('The transport index does not wire the practical route template');
if (!read('pages/thailand-for-first-timers.tsx').includes('FirstTimeThailandGuide')) failures.push('The first-timer route does not wire the editorial guide template');
const comparisonRoute = read('pages/compare/[slug].tsx');
for (const proof of ['PhuketKrabiComparisonGuide', "locale={lang}", "slug === 'phuket-vs-krabi'"]) {
  if (!comparisonRoute.includes(proof)) failures.push(`The comparison route lacks bilingual owner proof: ${proof}`);
}
const phuketKrabiComparison = read('components/compare/PhuketKrabiComparisonGuide.tsx');
for (const proof of ["locale?: 'nl' | 'en'", 'comparisonRowsEn', 'faqsEn', 'sourcesEn', 'compare-en-phuket-hotels', 'compare-en-krabi-tours', "inLanguage: isEn ? 'en-GB' : 'nl-NL'"]) {
  if (!phuketKrabiComparison.includes(proof)) failures.push(`The Phuket/Krabi comparison lacks EN owner proof: ${proof}`);
}
const travelGearRoute = read('pages/travel-gear/index.tsx');
for (const wiring of ['PackingGuideTemplate', 'thailandPackingGuide']) {
  if (!travelGearRoute.includes(wiring)) failures.push(`The travel gear route does not use ${wiring}`);
}
const packingGuideData = read('data/gear/nl/thailand-packing.ts');
for (const asset of ['travel-gear-hero.webp', 'travel-gear-cabin-baggage.webp', 'travel-gear-route-capsules.webp']) {
  if (!packingGuideData.includes(asset)) failures.push(`Thailand packing data does not use ${asset}`);
  read(`public/images/redesign/${asset}`);
}
for (const proof of ['quickAnswer:', 'checklist:', 'cabinRules:', 'routeCapsules:', 'productPicks:', 'faqs:', 'sources:']) {
  if (!packingGuideData.includes(proof)) failures.push(`Thailand packing data does not define ${proof}`);
}

const thailandRouteTemplate = read('components/itineraries/ThailandRouteGuide.tsx');
for (const asset of ['thailand-route-hero.webp', 'thailand-route-rhythm.webp', 'thailand-route-coast-fork.webp']) {
  if (!thailandRouteTemplate.includes(asset)) failures.push(`Thailand route template does not use ${asset}`);
  read(`public/images/redesign/${asset}`);
}
for (const proof of ['durationRoutes', 'ThailandMapGraphic', 'FaqSplitSection', 'SourceMethodSection', 'AffiliateDisclosure']) {
  if (!thailandRouteTemplate.includes(proof)) failures.push(`Thailand route template does not define or use ${proof}`);
}
const thailandItineraryRoute = read('pages/thailand-itinerary.tsx');
if (!thailandItineraryRoute.includes('ThailandRouteGuide')) failures.push('The Thailand itinerary owner does not wire the NL route template');

const thailandBudgetTemplate = read('components/budget/ThailandBudgetGuide.tsx');
for (const asset of ['thailand-budget-hero.webp', 'thailand-budget-leaks.webp', 'thailand-budget-regions.webp']) {
  if (!thailandBudgetTemplate.includes(asset)) failures.push(`Thailand budget template does not use ${asset}`);
  read(`public/images/redesign/${asset}`);
}
for (const proof of ['planningBands', 'FaqSplitSection', 'SourceMethodSection', 'AffiliateDisclosure']) {
  if (!thailandBudgetTemplate.includes(proof)) failures.push(`Thailand budget template does not define or use ${proof}`);
}
const thailandBudgetRoute = read('pages/thailand-index/budget.tsx');
if (!thailandBudgetRoute.includes('ThailandBudgetGuide')) failures.push('The Thailand budget owner does not wire the NL budget template');

const thailandWeatherHub = read('components/weather/ThailandWeatherHub.tsx');
for (const asset of ['thailand-weather-hub-hero.webp', 'thailand-weather-coast-switch.webp', 'thailand-weather-day-kit.webp']) {
  if (!thailandWeatherHub.includes(asset)) failures.push(`Thailand weather hub does not use ${asset}`);
  read(`public/images/redesign/${asset}`);
}
for (const proof of ['monthVerdicts', 'representativeRegions', 'FaqSplitSection', 'SourceMethodSection', 'AffiliateDisclosure']) {
  if (!thailandWeatherHub.includes(proof)) failures.push(`Thailand weather hub does not define or use ${proof}`);
}
const thailandWeatherRoute = read('pages/weather/index.tsx');
if (!thailandWeatherRoute.includes('ThailandWeatherHub')) failures.push('The Thailand weather owner does not wire the NL weather hub');

const thailandSafetyGuide = read('components/safety/ThailandSafetyGuide.tsx');
for (const asset of ['thailand-safety-hero.webp', 'thailand-safety-transport.webp', 'thailand-safety-emergency-kit.webp']) {
  if (!thailandSafetyGuide.includes(asset)) failures.push(`Thailand safety guide does not use ${asset}`);
  read(`public/images/redesign/${asset}`);
}
for (const proof of ['preparationItems', 'riskCards', 'FaqSplitSection', 'SourceMethodSection', 'AffiliateDisclosure']) {
  if (!thailandSafetyGuide.includes(proof)) failures.push(`Thailand safety guide does not define or use ${proof}`);
}
if (!read('pages/is-thailand-safe.tsx').includes('ThailandSafetyGuide')) failures.push('The Thailand safety owner does not wire the NL safety guide');

const thailandVisaGuide = read('components/visa/ThailandVisaGuide.tsx');
for (const asset of ['thailand-visa-hero.webp', 'thailand-entry-documents.webp', 'thailand-visa-rule-watch.webp']) {
  if (!thailandVisaGuide.includes(asset)) failures.push(`Thailand visa guide does not use ${asset}`);
  read(`public/images/redesign/${asset}`);
}
for (const proof of ['durationOptions', 'requiredItems', 'visaRoutes', 'FaqSplitSection', 'SourceMethodSection', 'AffiliateDisclosure']) {
  if (!thailandVisaGuide.includes(proof)) failures.push(`Thailand visa guide does not define or use ${proof}`);
}
if (!read('pages/visa/index.tsx').includes('ThailandVisaGuide')) failures.push('The Thailand visa owner does not wire the NL visa guide');

const thailandTdacGuide = read('components/visa/ThailandTdacGuide.tsx');
for (const asset of ['thailand-tdac-hero.webp', 'thailand-tdac-form-flow.webp']) {
  if (!thailandTdacGuide.includes(asset)) failures.push(`Thailand TDAC guide does not use ${asset}`);
  read(`public/images/redesign/${asset}`);
}
for (const proof of ['formSteps', 'checklistItems', 'situations', 'FaqSplitSection', 'SourceMethodSection', 'AffiliateDisclosure']) {
  if (!thailandTdacGuide.includes(proof)) failures.push(`Thailand TDAC guide does not define or use ${proof}`);
}
if (!read('pages/visa/[slug].tsx').includes('ThailandTdacGuide')) failures.push('The visa detail route does not wire the NL TDAC guide');

const thailandDtvGuide = read('components/visa/ThailandDtvGuide.tsx');
for (const asset of ['thailand-dtv-hero.webp', 'thailand-dtv-proof-routes.webp']) {
  if (!thailandDtvGuide.includes(asset)) failures.push(`Thailand DTV guide does not use ${asset}`);
  read(`public/images/redesign/${asset}`);
}
for (const proof of ['routeOptions', 'quickFacts', 'applicationSteps', 'FaqSplitSection', 'SourceMethodSection', 'AffiliateDisclosure']) {
  if (!thailandDtvGuide.includes(proof)) failures.push(`Thailand DTV guide does not define or use ${proof}`);
}
if (!read('pages/visa/[slug].tsx').includes('ThailandDtvGuide')) failures.push('The visa detail route does not wire the NL DTV guide');

const thailandRetirementVisaGuide = read('components/visa/ThailandRetirementVisaGuide.tsx');
for (const asset of ['thailand-retirement-visa-hero.webp', 'thailand-retirement-visa-routes.webp']) {
  if (!thailandRetirementVisaGuide.includes(asset)) failures.push(`Thailand retirement visa guide does not use ${asset}`);
  read(`public/images/redesign/${asset}`);
}
for (const proof of ['routes', 'quickFacts', 'FaqSplitSection', 'SourceMethodSection', 'AffiliateDisclosure']) {
  if (!thailandRetirementVisaGuide.includes(proof)) failures.push(`Thailand retirement visa guide does not define or use ${proof}`);
}
if (!read('pages/visa/[slug].tsx').includes('ThailandRetirementVisaGuide')) failures.push('The visa detail route does not wire the NL retirement visa guide');

const thailandTouristVisaGuide = read('components/visa/ThailandTouristVisaGuide.tsx');
for (const asset of ['thailand-tourist-visa-hero.webp', 'thailand-tourist-visa-routes.webp']) {
  if (!thailandTouristVisaGuide.includes(asset)) failures.push(`Thailand tourist visa guide does not use ${asset}`);
  read(`public/images/redesign/${asset}`);
}
for (const proof of ['touristRoutes', 'quickFacts', 'evidenceItems', 'FaqSplitSection', 'SourceMethodSection', 'AffiliateDisclosure']) {
  if (!thailandTouristVisaGuide.includes(proof)) failures.push(`Thailand tourist visa guide does not define or use ${proof}`);
}
if (!read('pages/visa/[slug].tsx').includes('ThailandTouristVisaGuide')) failures.push('The visa detail route does not wire the NL tourist visa guide');

const thailandVisaExtensionGuide = read('components/visa/ThailandVisaExtensionGuide.tsx');
for (const asset of ['thailand-visa-extension-hero.webp', 'thailand-visa-extension-documents.webp']) {
  if (!thailandVisaExtensionGuide.includes(asset)) failures.push(`Thailand visa extension guide does not use ${asset}`);
  read(`public/images/redesign/${asset}`);
}
for (const proof of ['extensionRoutes', 'quickFacts', 'documentItems', 'FaqSplitSection', 'SourceMethodSection', 'AffiliateDisclosure']) {
  if (!thailandVisaExtensionGuide.includes(proof)) failures.push(`Thailand visa extension guide does not define or use ${proof}`);
}
if (!read('pages/visa/[slug].tsx').includes('ThailandVisaExtensionGuide')) failures.push('The visa detail route does not wire the NL visa extension guide');

const thailandEducationVisaGuide = read('components/visa/ThailandEducationVisaGuide.tsx');
for (const asset of ['thailand-education-visa-hero.webp', 'thailand-education-visa-routes.webp']) {
  if (!thailandEducationVisaGuide.includes(asset)) failures.push(`Thailand education visa guide does not use ${asset}`);
  read(`public/images/redesign/${asset}`);
}
for (const proof of ['studyRoutes', 'quickFacts', 'commonEvidence', 'FaqSplitSection', 'SourceMethodSection', 'AffiliateDisclosure']) {
  if (!thailandEducationVisaGuide.includes(proof)) failures.push(`Thailand education visa guide does not define or use ${proof}`);
}
if (!read('pages/visa/[slug].tsx').includes('ThailandEducationVisaGuide')) failures.push('The visa detail route does not wire the NL education visa guide');

const thailandLtrVisaGuide = read('components/visa/ThailandLtrVisaGuide.tsx');
for (const asset of ['thailand-ltr-visa-hero.webp', 'thailand-ltr-visa-routes.webp']) {
  if (!thailandLtrVisaGuide.includes(asset)) failures.push(`Thailand LTR visa guide does not use ${asset}`);
  read(`public/images/redesign/${asset}`);
}
for (const proof of ['ltrRoutes', 'quickFacts', 'FaqSplitSection', 'SourceMethodSection', 'AffiliateDisclosure']) {
  if (!thailandLtrVisaGuide.includes(proof)) failures.push(`Thailand LTR visa guide does not define or use ${proof}`);
}
if (!read('pages/visa/[slug].tsx').includes('ThailandLtrVisaGuide')) failures.push('The visa detail route does not wire the NL LTR visa guide');

const thailandPrivilegeGuide = read('components/visa/ThailandPrivilegeGuide.tsx');
for (const asset of ['thailand-privilege-hero.webp', 'thailand-privilege-tiers.webp']) {
  if (!thailandPrivilegeGuide.includes(asset)) failures.push(`Thailand Privilege guide does not use ${asset}`);
  read(`public/images/redesign/${asset}`);
}
for (const proof of ['tiers', 'quickFacts', 'FaqSplitSection', 'SourceMethodSection', 'AffiliateDisclosure']) {
  if (!thailandPrivilegeGuide.includes(proof)) failures.push(`Thailand Privilege guide does not define or use ${proof}`);
}
if (!read('pages/visa/[slug].tsx').includes('ThailandPrivilegeGuide')) failures.push('The visa detail route does not wire the NL Thailand Privilege guide');
const visaDetailRoute = read('pages/visa/[slug].tsx');
for (const proof of ["locale === 'nl' && slug === 'visa-free-entry'", "destination: '/nl/visa/'", 'permanent: true']) {
  if (!visaDetailRoute.includes(proof)) failures.push(`The NL visa-free route does not preserve consolidation proof: ${proof}`);
}

const weatherRegistry = read('data/weather/nl/index.ts');
for (const city of ['bangkok', 'krabi', 'phuket']) {
  if (!weatherRegistry.includes(`${city}:`)) failures.push(`The NL weather registry does not include ${city}`);
}
if (!weatherRegistry.includes("'chiang-mai':")) failures.push('The NL weather registry does not include chiang-mai');
if (!weatherRegistry.includes("'koh-samui':")) failures.push('The NL weather registry does not include koh-samui');
const phuketWeatherData = read('data/weather/nl/phuket.ts');
for (const asset of ['phuket-weather-hero.webp', 'phuket-weather-green-season.webp', 'phuket-weather-packing-flatlay.webp']) {
  if (!phuketWeatherData.includes(asset)) failures.push(`Phuket weather data does not use ${asset}`);
  read(`public/images/redesign/${asset}`);
}
const bangkokWeatherData = read('data/weather/nl/bangkok.ts');
for (const asset of ['bangkok-weather-hero.webp', 'bangkok-weather-rainy-season.webp', 'bangkok-weather-packing-flatlay.webp']) {
  if (!bangkokWeatherData.includes(asset)) failures.push(`Bangkok weather data does not use ${asset}`);
  read(`public/images/cities/bangkok/redesign/${asset}`);
}
const chiangMaiWeatherData = read('data/weather/nl/chiang-mai.ts');
for (const asset of ['chiang-mai-weather-hero.webp', 'chiang-mai-weather-green-season.webp', 'chiang-mai-weather-packing-flatlay.webp']) {
  if (!chiangMaiWeatherData.includes(asset)) failures.push(`Chiang Mai weather data does not use ${asset}`);
  read(`public/images/cities/chiang-mai/redesign/${asset}`);
}
const kohSamuiWeatherData = read('data/weather/nl/koh-samui.ts');
const kohSamuiWeatherDataEn = read('data/weather/en/koh-samui.ts');
const phuketWeatherDataEn = read('data/weather/en/phuket.ts');
const weatherRegistryEn = read('data/weather/en/index.ts');
if (!weatherRegistryEn.includes("'koh-samui':")) failures.push('The EN weather registry does not include koh-samui');
if (!weatherRegistryEn.includes('phuket:')) failures.push('The EN weather registry does not include phuket');
for (const asset of ['koh-samui-weather-hero.webp', 'koh-samui-weather-green-season.webp', 'koh-samui-weather-packing.webp']) {
  if (!kohSamuiWeatherData.includes(asset)) failures.push(`Koh Samui weather data does not use ${asset}`);
  if (!kohSamuiWeatherDataEn.includes(asset)) failures.push(`English Koh Samui weather data does not use ${asset}`);
  read(`public/images/redesign/${asset}`);
}
if ((kohSamuiWeatherDataEn.match(/amazonSlug:/g) || []).length !== 4) failures.push('English Koh Samui weather data must use exactly four contextual Amazon products');
for (const asset of ['phuket-weather-hero.webp', 'phuket-weather-green-season.webp', 'phuket-weather-packing-flatlay.webp']) {
  if (!phuketWeatherDataEn.includes(asset)) failures.push(`English Phuket weather data does not use ${asset}`);
}
if ((phuketWeatherDataEn.match(/amazonSlug:/g) || []).length !== 4) failures.push('English Phuket weather data must use exactly four contextual Amazon products');
if ((phuketWeatherDataEn.match(/question:/g) || []).length < 10) failures.push('English Phuket weather data must preserve at least ten researched PAA answers');
for (const dataFile of ['data/weather/nl/bangkok.ts', 'data/weather/nl/chiang-mai.ts', 'data/weather/nl/koh-samui.ts', 'data/weather/nl/krabi.ts', 'data/weather/nl/phuket.ts']) {
  if (!read(dataFile).includes('planningNotes:')) failures.push(`${dataFile} does not define route-specific planning notes`);
}
const weatherRoute = read('pages/city/[slug]/weather/index.tsx');
for (const proof of ["locale === 'nl' ? getNlWeatherGuide(slug) : getEnWeatherGuide(slug)", "(!cityWeather[slug] && !weatherGuide)", 'monthlyWeather: weatherGuide.months.map']) {
  if (!weatherRoute.includes(proof)) failures.push(`The weather route does not preserve bilingual guide fallback proof: ${proof}`);
}
const nextConfig = read('next.config.js');
for (const proof of ["source: '/city/koh-samui/best-time-to-visit/'", "destination: '/city/koh-samui/weather/'", 'permanent: true']) {
  if (!nextConfig.includes(proof)) failures.push(`English Koh Samui weather consolidation misses ${proof}`);
}
for (const proof of ["source: '/city/phuket/best-time-to-visit/'", "destination: '/city/phuket/weather/'", 'permanent: true']) {
  if (!nextConfig.includes(proof)) failures.push(`English Phuket weather consolidation misses ${proof}`);
}
const bestTimeRoute = read('pages/city/[slug]/best-time-to-visit.tsx');
for (const proof of ["slug === 'koh-samui' || slug === 'phuket'", 'destination: `/city/${slug}/weather/`', 'permanent: true']) {
  if (!bestTimeRoute.includes(proof)) failures.push(`English weather best-time route misses runtime consolidation proof: ${proof}`);
}

const hotelRegistry = read('data/hotels/nl/index.ts');
for (const city of ['bangkok', 'krabi', 'phuket']) {
  if (!hotelRegistry.includes(`${city}:`)) failures.push(`The NL hotel registry does not include ${city}`);
}
if (!hotelRegistry.includes("'chiang-mai':")) failures.push('The NL hotel registry does not include chiang-mai');
if (!hotelRegistry.includes("'koh-samui':")) failures.push('The NL hotel registry does not include koh-samui');
if (!hotelRegistry.includes("'khao-sok':")) failures.push('The NL hotel registry does not include khao-sok');
if (!hotelRegistry.includes("'koh-tao':")) failures.push('The NL hotel registry does not include koh-tao');
for (const dataFile of ['data/hotels/nl/bangkok.ts', 'data/hotels/nl/chiang-mai.ts', 'data/hotels/nl/khao-sok.ts', 'data/hotels/nl/koh-samui.ts', 'data/hotels/nl/koh-tao.ts', 'data/hotels/nl/krabi.ts', 'data/hotels/nl/phuket.ts']) {
  if (!read(dataFile).includes('areaDecisionNote:')) failures.push(`${dataFile} does not define a destination-specific area decision note`);
}
const bangkokHotelData = read('data/hotels/nl/bangkok.ts');
for (const asset of [
  'bangkok-hotels-hero.webp',
  'bangkok-stay-riverside.webp',
  'bangkok-stay-old-town.webp',
  'bangkok-stay-chinatown.webp',
  'bangkok-stay-silom-sathorn.webp',
  'bangkok-stay-siam.webp',
  'bangkok-stay-sukhumvit.webp',
]) {
  if (!bangkokHotelData.includes(asset)) failures.push(`Bangkok hotel data does not use ${asset}`);
  read(`public/images/cities/bangkok/redesign/${asset}`);
}
const phuketHotelData = read('data/hotels/nl/phuket.ts');
for (const asset of [
  'phuket-hotels-hero.webp',
  'phuket-stay-patong.webp',
  'phuket-stay-kata-karon.webp',
  'phuket-stay-kamala.webp',
  'phuket-stay-bang-tao.webp',
  'phuket-stay-rawai-nai-harn.webp',
  'phuket-stay-old-town.webp',
]) {
  if (!phuketHotelData.includes(asset)) failures.push(`Phuket hotel data does not use ${asset}`);
  read(`public/images/redesign/${asset}`);
}
const chiangMaiHotelData = read('data/hotels/nl/chiang-mai.ts');
for (const asset of [
  'chiang-mai-hotels-hero.webp',
  'chiang-mai-stay-old-city.webp',
  'chiang-mai-stay-nimman.webp',
  'chiang-mai-stay-riverside.webp',
  'chiang-mai-stay-night-bazaar.webp',
  'chiang-mai-stay-santitham.webp',
]) {
  if (!chiangMaiHotelData.includes(asset)) failures.push(`Chiang Mai hotel data does not use ${asset}`);
  read(`public/images/cities/chiang-mai/redesign/${asset}`);
}
const kohSamuiHotelData = read('data/hotels/nl/koh-samui.ts');
for (const asset of [
  'koh-samui-hotels-hero.webp',
  'koh-samui-stay-chaweng.webp',
  'koh-samui-stay-lamai.webp',
  'koh-samui-fishermans-village.webp',
  'koh-samui-stay-choeng-mon.webp',
  'koh-samui-stay-maenam.webp',
  'koh-samui-stay-taling-ngam.webp',
]) {
  if (!kohSamuiHotelData.includes(asset)) failures.push(`Koh Samui hotel data does not use ${asset}`);
  read(`public/images/redesign/${asset}`);
}
const khaoSokHotelData = read('data/hotels/nl/khao-sok.ts');
const khaoSokHotelDataEn = read('data/hotels/en/khao-sok.ts');
const hotelRegistryEn = read('data/hotels/en/index.ts');
if (!hotelRegistryEn.includes('"khao-sok":')) failures.push('The EN hotel registry does not include khao-sok');
for (const asset of [
  'khao-sok-hotels-hero.webp',
  'khao-sok-jungle-village.webp',
  'khao-sok-stay-treehouse.webp',
  'khao-sok-stay-pier-base.webp',
  'khao-sok-floating-bungalows.webp',
]) {
  if (!khaoSokHotelData.includes(asset)) failures.push(`Khao Sok hotel data does not use ${asset}`);
  if (!khaoSokHotelDataEn.includes(asset)) failures.push(`English Khao Sok hotel data does not use ${asset}`);
  read(`public/images/redesign/${asset}`);
}
const khaoSokRiversideAsset = 'khao-sok-riverside-lodge.webp';
if (!khaoSokHotelDataEn.includes(khaoSokRiversideAsset)) failures.push(`English Khao Sok hotel data does not use ${khaoSokRiversideAsset}`);
read(`public/images/redesign/${khaoSokRiversideAsset}`);
const kohTaoHotelData = read('data/hotels/nl/koh-tao.ts');
for (const asset of [
  'koh-tao-hotels-hero.webp',
  'koh-tao-stay-sairee.webp',
  'koh-tao-stay-east-bay.webp',
]) {
  if (!kohTaoHotelData.includes(asset)) failures.push(`Koh Tao hotel data does not use ${asset}`);
  read(`public/images/redesign/${asset}`);
}

const attractionsRegistry = read('data/attractions/nl/index.ts');
for (const city of ['bangkok', "'chiang-mai'", "'khao-sok'", "'koh-samui'", "'koh-tao'", 'phuket']) {
  if (!attractionsRegistry.includes(`${city}:`)) failures.push(`The NL attractions registry does not include ${city}`);
}
const attractionsRoute = read('pages/city/[slug]/attractions.tsx');
for (const wiring of ['getNlAttractionsGuide', 'AttractionsGuideTemplate']) {
  if (!attractionsRoute.includes(wiring)) failures.push(`The attractions route does not use ${wiring}`);
}
const kohTaoAttractionsData = read('data/attractions/nl/koh-tao.ts');
const kohTaoAttractionsDataEn = read('data/attractions/en/koh-tao.ts');
const kohTaoAttractionsRoute = read('pages/islands/[slug]/attractions.tsx');
for (const wiring of ['getNlAttractionsGuide', 'getEnAttractionsGuide', 'AttractionsGuideTemplate']) {
  if (!kohTaoAttractionsRoute.includes(wiring)) failures.push(`The bilingual Koh Tao island attractions route does not preserve ${wiring}`);
}
for (const asset of [
  'koh-tao-attractions-hero.webp',
  'koh-tao-viewpoint-hike.webp',
  'koh-tao-sunset-paddle.webp',
]) {
  if (!kohTaoAttractionsData.includes(asset)) failures.push(`Koh Tao attractions data does not use ${asset}`);
  if (!kohTaoAttractionsDataEn.includes(asset)) failures.push(`English Koh Tao attractions data does not use ${asset}`);
  read(`public/images/redesign/${asset}`);
}
const diveTemplate = read('components/diving/DiveGuideTemplate.tsx');
const kohTaoDiveData = read('data/diving/nl/koh-tao.ts');
const kohTaoDiveDataEn = read('data/diving/en/koh-tao.ts');
const kohTaoDiveRoute = read('pages/islands/[slug]/diving.tsx');
for (const wiring of ['getNlDiveGuide', 'getEnDiveGuide', 'DiveGuideTemplate']) {
  if (!kohTaoDiveRoute.includes(wiring)) failures.push(`The bilingual Koh Tao diving route does not preserve ${wiring}`);
}
for (const proof of ['FaqSplitSection', 'SourceMethodSection', 'withPlacementSubId', 'nofollow sponsored']) {
  if (!diveTemplate.includes(proof)) failures.push(`The dive template does not preserve ${proof}`);
}
for (const asset of [
  'koh-tao-diving-hero.webp',
  'koh-tao-dive-briefing.webp',
  'koh-tao-responsible-diving.webp',
]) {
  if (!kohTaoDiveData.includes(asset)) failures.push(`Koh Tao diving data does not use ${asset}`);
  if (!kohTaoDiveDataEn.includes(asset)) failures.push(`English Koh Tao diving data does not use ${asset}`);
  read(`public/images/redesign/${asset}`);
}

const snorkelTemplate = read('components/snorkeling/SnorkelGuideTemplate.tsx');
const kohTaoSnorkelData = read('data/snorkeling/nl/koh-tao.ts');
const kohTaoSnorkelDataEn = read('data/snorkeling/en/koh-tao.ts');
const kohTaoSnorkelRoute = read('pages/islands/[slug]/snorkeling.tsx');
for (const wiring of ['getNlSnorkelGuide', 'getEnSnorkelGuide', 'SnorkelGuideTemplate']) {
  if (!kohTaoSnorkelRoute.includes(wiring)) failures.push(`The bilingual Koh Tao snorkeling route does not preserve ${wiring}`);
}
for (const proof of ['FaqSplitSection', 'SourceMethodSection', 'AffiliateDisclosure', 'withPlacementSubId', 'nofollow sponsored']) {
  if (!snorkelTemplate.includes(proof)) failures.push(`The snorkel template does not preserve ${proof}`);
}
for (const asset of [
  'koh-tao-snorkeling-hero.webp',
  'koh-tao-snorkel-shore-entry.webp',
  'koh-tao-responsible-snorkeling.webp',
]) {
  if (!kohTaoSnorkelData.includes(asset)) failures.push(`Koh Tao snorkeling data does not use ${asset}`);
  if (!kohTaoSnorkelDataEn.includes(asset)) failures.push(`English Koh Tao snorkeling data does not use ${asset}`);
  read(`public/images/redesign/${asset}`);
}

const thailandSnorkelTemplate = read('components/snorkeling/ThailandSnorkelingGuideTemplate.tsx');
const thailandSnorkelDataEn = read('data/snorkeling/en/thailand.ts');
const thailandSnorkelRoute = read('pages/best-diving-snorkeling-in-thailand.tsx');
const blogConsolidations = read('lib/blog.js');
for (const wiring of ['ThailandSnorkelingGuideTemplate', 'thailandSnorkelingGuideEn']) {
  if (!thailandSnorkelRoute.includes(wiring)) failures.push(`The English Thailand snorkeling owner does not preserve ${wiring}`);
}
for (const proof of ['EditorialHero', 'PageSectionNav', 'FaqSplitSection', 'SourceMethodSection', 'AffiliateDisclosure', 'withPlacementSubId', 'nofollow sponsored']) {
  if (!thailandSnorkelTemplate.includes(proof)) failures.push(`The Thailand snorkeling template does not preserve ${proof}`);
}
for (const proof of ['coastWindows:', 'morningSignals:', 'destinations:', 'accessChoices:', 'beginnerChecks:', 'responsibleRules:', 'gear:', 'diveBoundary:', 'faqs:', 'sources:']) {
  if (!thailandSnorkelDataEn.includes(proof)) failures.push(`The English Thailand snorkeling owner does not define ${proof}`);
}
for (const product of ['earth-pak-dry-bag', 'simari-water-shoes', 'rainleaf-travel-towel']) {
  if (!thailandSnorkelDataEn.includes(product)) failures.push(`The English Thailand snorkeling owner does not use contextual Amazon product ${product}`);
}
for (const asset of ['thailand-snorkeling-hero.webp', 'thailand-snorkeling-shore-or-boat.webp']) {
  if (!thailandSnorkelDataEn.includes(asset) && !thailandSnorkelTemplate.includes(asset)) failures.push(`The English Thailand snorkeling owner does not use ${asset}`);
  read(`public/images/redesign/${asset}`);
}
if (!blogConsolidations.includes("'best-snorkeling-spots-thailand-water-clarity': '/best-diving-snorkeling-in-thailand/'")) failures.push('The overlapping English water-clarity article does not consolidate into the Thailand snorkeling owner');
if (!blogConsolidations.includes("'cheapest-vs-most-expensive-hotel-bangkok': '/best-hotels/bangkok/'")) failures.push('The unsupported English Bangkok hotel-price experiment does not consolidate into the ranked hotel owner');

const destinationRegistry = read('data/destinations/nl/index.ts');
for (const city of ['ayutthaya', 'bangkok', 'chumphon', "'chiang-mai'", "'chiang-rai'", "'hua-hin'", 'kanchanaburi', 'pai', 'pattaya', 'phuket', 'rayong', 'sukhothai', "'koh-samui'", "'khao-sok'"]) {
  if (!destinationRegistry.includes(`${city}:`)) failures.push(`The NL destination registry does not include ${city}`);
}
for (const asset of ['thailand-excursions-hero.webp', 'transport-thailand-hero.webp']) {
  if (!destinationRegistry.includes(asset)) failures.push(`The NL destination index does not use ${asset}`);
  read(`public/images/redesign/${asset}`);
}
const destinationRoute = read('pages/city/[slug]/index.tsx');
for (const wiring of ['getNlDestinationGuide', 'DestinationGuideTemplate']) {
  if (!destinationRoute.includes(wiring)) failures.push(`The destination route does not use ${wiring}`);
}
const ayutthayaDestinationData = read('data/destinations/nl/ayutthaya.ts');
for (const asset of [
  'ayutthaya-destination-hero.webp',
  'ayutthaya-river-heritage.webp',
  'ayutthaya-food-specialties.webp',
]) {
  if (!ayutthayaDestinationData.includes(asset)) failures.push(`Ayutthaya destination data does not use ${asset}`);
  read(`public/images/redesign/${asset}`);
}
for (const proof of ['touristType:', 'quickAnswer:', 'zones:', 'itinerary:', 'faqs:', 'sources:']) {
  if (!ayutthayaDestinationData.includes(proof)) failures.push(`Ayutthaya destination data does not define ${proof}`);
}
const chiangRaiDestinationData = read('data/destinations/nl/chiang-rai.ts');
for (const asset of [
  'chiang-rai-destination-hero.webp',
  'chiang-rai-mountain-route.webp',
  'chiang-rai-food-coffee.webp',
]) {
  if (!chiangRaiDestinationData.includes(asset)) failures.push(`Chiang Rai destination data does not use ${asset}`);
  read(`public/images/redesign/${asset}`);
}
for (const proof of ['touristType:', 'quickAnswer:', 'zones:', 'itinerary:', 'faqs:', 'sources:', 'blue-temple']) {
  if (!chiangRaiDestinationData.includes(proof)) failures.push(`Chiang Rai destination data does not define ${proof}`);
}
const paiDestinationData = read('data/destinations/nl/pai.ts');
for (const asset of [
  'pai-destination-hero.webp',
  'pai-canyon-route.webp',
  'pai-food-walking-street.webp',
]) {
  if (!paiDestinationData.includes(asset)) failures.push(`Pai destination data does not use ${asset}`);
  read(`public/images/redesign/${asset}`);
}
for (const proof of ['touristType:', 'quickAnswer:', 'zones:', 'itinerary:', 'faqs:', 'sources:', 'pai-canyon']) {
  if (!paiDestinationData.includes(proof)) failures.push(`Pai destination data does not define ${proof}`);
}
const pattayaDestinationData = read('data/destinations/nl/pattaya.ts');
for (const asset of [
  'pattaya-destination-hero.webp',
  'pattaya-sanctuary-route.webp',
  'pattaya-seafood-coast.webp',
]) {
  if (!pattayaDestinationData.includes(asset)) failures.push(`Pattaya destination data does not use ${asset}`);
  read(`public/images/redesign/${asset}`);
}
for (const proof of ['touristType:', 'quickAnswer:', 'zones:', 'itinerary:', 'faqs:', 'sources:', 'coral-island', '/nightlife/pattaya/']) {
  if (!pattayaDestinationData.includes(proof)) failures.push(`Pattaya destination data does not define ${proof}`);
}
const huaHinDestinationData = read('data/destinations/nl/hua-hin.ts');
for (const asset of [
  'hua-hin-destination-hero.webp',
  'hua-hin-sam-roi-yot-route.webp',
  'hua-hin-night-market-seafood.webp',
]) {
  if (!huaHinDestinationData.includes(asset)) failures.push(`Hua Hin destination data does not use ${asset}`);
  read(`public/images/redesign/${asset}`);
}
for (const proof of ['touristType:', 'quickAnswer:', 'zones:', 'itinerary:', 'faqs:', 'sources:', 'Cha-am', 'Sam Roi Yot']) {
  if (!huaHinDestinationData.includes(proof)) failures.push(`Hua Hin destination data does not define ${proof}`);
}
const chumphonDestinationData = read('data/destinations/nl/chumphon.ts');
for (const asset of [
  'chumphon-destination-hero.webp',
  'chumphon-marine-route.webp',
  'chumphon-night-market-food.webp',
]) {
  if (!chumphonDestinationData.includes(asset)) failures.push(`Chumphon destination data does not use ${asset}`);
  read(`public/images/redesign/${asset}`);
}
for (const proof of ['touristType:', 'quickAnswer:', 'zones:', 'itinerary:', 'faqs:', 'sources:', 'Thung Wua Laen', 'Mu Ko Chumphon', 'Thung Makham Noi', '1 uur en 45 minuten']) {
  if (!chumphonDestinationData.includes(proof)) failures.push(`Chumphon destination data does not define ${proof}`);
}
const rayongDestinationData = read('data/destinations/nl/rayong.ts');
for (const asset of [
  'rayong-destination-hero.webp',
  'rayong-yomjinda-old-town.webp',
  'rayong-mangrove-route.webp',
  'rayong-fruit-orchard.webp',
]) {
  if (!rayongDestinationData.includes(asset)) failures.push(`Rayong destination data does not use ${asset}`);
  read(`public/images/redesign/${asset}`);
}
for (const proof of ['touristType:', 'quickAnswer:', 'zones:', 'itinerary:', 'faqs:', 'sources:', 'Mae Ramphueng', 'Yomjinda', 'Ban Phe', 'Thung Prong Thong', '/islands/koh-samet/']) {
  if (!rayongDestinationData.includes(proof)) failures.push(`Rayong destination data does not define ${proof}`);
}
const kanchanaburiDestinationData = read('data/destinations/nl/kanchanaburi.ts');
for (const asset of [
  'kanchanaburi-destination-hero.webp',
  'kanchanaburi-wampo-railway.webp',
  'kanchanaburi-erawan-waterfall.webp',
  'kanchanaburi-riverside-food.webp',
  'kanchanaburi-mon-bridge.webp',
]) {
  if (!kanchanaburiDestinationData.includes(asset)) failures.push(`Kanchanaburi destination data does not use ${asset}`);
  read(`public/images/redesign/${asset}`);
}
for (const proof of ['touristType:', 'quickAnswer:', 'zones:', 'itinerary:', 'faqs:', 'sources:', 'River Khwae', 'Erawan', 'Hellfire Pass', 'Sangkhla Buri', 'State Railway of Thailand']) {
  if (!kanchanaburiDestinationData.includes(proof)) failures.push(`Kanchanaburi destination data does not define ${proof}`);
}
const sukhothaiDestinationData = read('data/destinations/nl/sukhothai.ts');
for (const asset of [
  'sukhothai-destination-hero.webp',
  'sukhothai-cycling-central.webp',
  'sukhothai-wat-si-chum.webp',
  'sukhothai-si-satchanalai.webp',
  'sukhothai-noodles.webp',
]) {
  if (!sukhothaiDestinationData.includes(asset)) failures.push(`Sukhothai destination data does not use ${asset}`);
  read(`public/images/redesign/${asset}`);
}
for (const proof of ['touristType:', 'quickAnswer:', 'zones:', 'itinerary:', 'faqs:', 'sources:', 'Old Sukhothai', 'Wat Si Chum', 'Si Satchanalai', 'Phitsanulok', 'Bangkok Airways']) {
  if (!sukhothaiDestinationData.includes(proof)) failures.push(`Sukhothai destination data does not define ${proof}`);
}
const destinationGuideTemplate = read('components/city/DestinationGuideTemplate.tsx');
if (destinationGuideTemplate.includes('cultuur, karst of eilanden')) failures.push('Destination guide template still contains Krabi-specific Klook copy');
const nlTopAttractionsRoute = read('pages/city/[slug]/top-10-attractions.tsx');
const nlTopRestaurantsRoute = read('pages/city/[slug]/top-10-restaurants.tsx');
for (const [label, source, destination] of [
  ['attractions', nlTopAttractionsRoute, '`/nl/city/${slug}/attractions/`'],
  ['restaurants', nlTopRestaurantsRoute, '`/nl/city/${slug}/food/`'],
] as const) {
  for (const proof of ["locale === 'nl'", destination, 'permanent: true']) {
    if (!source.includes(proof)) failures.push(`NL top-10 ${label} consolidation does not preserve ${proof}`);
  }
}
const nlSitemap = read('public/sitemap-nl.xml');
if (/\/nl\/city\/[^/]+\/top-10-(?:attractions|restaurants)\//.test(nlSitemap)) failures.push('NL sitemap still contains consolidated city top-10 routes');
const enSitemap = read('public/sitemap.xml');
for (const route of [
  '/city/ban-krut/',
  '/nightlife/',
  '/nightlife/bangkok/',
  '/nightlife/chiang-mai/',
  '/nightlife/pattaya/',
  '/nightlife/phuket/',
  '/best-hotels/koh-tao/',
  '/best-hotels/khao-sok/',
  '/city/koh-samui/weather/',
  '/city/phuket/weather/',
  '/islands/koh-tao/attractions/',
  '/islands/koh-tao/diving/',
  '/islands/koh-tao/snorkeling/',
]) {
  if (!enSitemap.includes(`https://go2-thailand.com${route}`)) failures.push(`EN sitemap misses bilingual owner ${route}`);
  if (!nlSitemap.includes(`https://go2-thailand.com/nl${route}`)) failures.push(`NL sitemap misses bilingual owner ${route}`);
}
const phuketDestinationData = read('data/destinations/nl/phuket.ts');
for (const asset of [
  'phuket-destination-hero-v2.webp',
  'phuket-food-kopitiam.webp',
  'phuket-zones-banner.webp',
  'phuket-route-planning.webp',
]) {
  if (!phuketDestinationData.includes(asset)) failures.push(`Phuket destination data does not use ${asset}`);
  read(`public/images/redesign/${asset}`);
}
const bangkokDestinationData = read('data/destinations/nl/bangkok.ts');
for (const asset of [
  'bangkok-destination-hero.webp',
  'bangkok-food-yaowarat.webp',
  'bangkok-zones-banner.webp',
  'bangkok-route-planning.webp',
]) {
  if (!bangkokDestinationData.includes(asset)) failures.push(`Bangkok destination data does not use ${asset}`);
  read(`public/images/redesign/${asset}`);
}
const chiangMaiDestinationData = read('data/destinations/nl/chiang-mai.ts');
for (const asset of [
  'chiang-mai-destination-hero.webp',
  'chiang-mai-food-khao-soi.webp',
  'chiang-mai-zones-banner.webp',
  'chiang-mai-route-planning.webp',
]) {
  if (!chiangMaiDestinationData.includes(asset)) failures.push(`Chiang Mai destination data does not use ${asset}`);
  read(`public/images/cities/chiang-mai/redesign/${asset}`);
}
const kohSamuiDestinationData = read('data/destinations/nl/koh-samui.ts');
for (const asset of [
  'koh-samui-destination-hero.webp',
  'koh-samui-zones-banner.webp',
  'koh-samui-food.webp',
  'koh-samui-ang-thong.webp',
]) {
  if (!kohSamuiDestinationData.includes(asset)) failures.push(`Koh Samui destination data does not use ${asset}`);
  read(`public/images/redesign/${asset}`);
}
const khaoSokDestinationData = read('data/destinations/nl/khao-sok.ts');
for (const asset of [
  'khao-sok-destination-hero.webp',
  'khao-sok-jungle-village.webp',
  'khao-sok-floating-bungalows.webp',
  'khao-sok-southern-table.webp',
]) {
  if (!khaoSokDestinationData.includes(asset)) failures.push(`Khao Sok destination data does not use ${asset}`);
  read(`public/images/redesign/${asset}`);
}
const kohTaoIslandData = read('data/islands/nl-guides/koh-tao.ts');
const islandRoute = read('pages/islands/[slug].tsx');
for (const wiring of ['getNlIslandGuide', 'DestinationGuideTemplate']) {
  if (!islandRoute.includes(wiring)) failures.push(`The island route does not use ${wiring}`);
}
for (const asset of [
  'koh-tao-destination-hero.webp',
  'koh-tao-diving-choice.webp',
  'koh-tao-sairee-sunset.webp',
]) {
  if (!kohTaoIslandData.includes(asset)) failures.push(`Koh Tao island data does not use ${asset}`);
  read(`public/images/redesign/${asset}`);
}
const kohSametIslandData = read('data/islands/nl-guides/koh-samet.ts');
if (!kohSametIslandData.includes('koh-samet-attraction-hero.webp')) failures.push('Koh Samet island data does not use its dedicated hero asset');
read('public/images/redesign/koh-samet-attraction-hero.webp');
if (!read('data/islands/nl-guides/index.ts').includes("'koh-samet': kohSametIslandGuide")) failures.push('The NL island guide registry does not own Koh Samet');
const phuketAttractionsData = read('data/attractions/nl/phuket.ts');
for (const asset of [
  'phuket-attractions-hero.webp',
  'phuket-attraction-wat-chalong.webp',
  'phuket-attraction-big-buddha.webp',
  'phuket-attraction-phang-nga.webp',
  'phuket-attraction-elephants.webp',
]) {
  if (!phuketAttractionsData.includes(asset)) failures.push(`Phuket attractions data does not use ${asset}`);
  read(`public/images/redesign/${asset}`);
}
const bangkokAttractionsData = read('data/attractions/nl/bangkok.ts');
for (const asset of [
  'bangkok-attractions-hero.webp',
  'bangkok-attraction-chinatown.webp',
  'bangkok-attraction-golden-mount.webp',
  'bangkok-attractions-one-day.webp',
]) {
  if (!bangkokAttractionsData.includes(asset)) failures.push(`Bangkok attractions data does not use ${asset}`);
  read(`public/images/cities/bangkok/redesign/${asset}`);
}
const chiangMaiAttractionsData = read('data/attractions/nl/chiang-mai.ts');
for (const asset of [
  'chiang-mai-attractions-hero.webp',
  'chiang-mai-attraction-wat-pha-lat.webp',
  'chiang-mai-attractions-one-day.webp',
  'chiang-mai-attraction-sticky-waterfall.webp',
  'chiang-mai-attraction-creative-courtyard.webp',
]) {
  if (!chiangMaiAttractionsData.includes(asset)) failures.push(`Chiang Mai attractions data does not use ${asset}`);
  read(`public/images/cities/chiang-mai/redesign/${asset}`);
}
const kohSamuiAttractionsData = read('data/attractions/nl/koh-samui.ts');
for (const asset of [
  'koh-samui-attractions-hero.webp',
  'koh-samui-fishermans-village.webp',
  'koh-samui-temple-lake.webp',
  'koh-samui-ang-thong.webp',
]) {
  if (!kohSamuiAttractionsData.includes(asset)) failures.push(`Koh Samui attractions data does not use ${asset}`);
  read(`public/images/redesign/${asset}`);
}
const khaoSokAttractionsData = read('data/attractions/nl/khao-sok.ts');
for (const asset of [
  'khao-sok-attractions-hero.webp',
  'khao-sok-night-walk.webp',
  'khao-sok-jungle-village.webp',
  'khao-sok-floating-bungalows.webp',
]) {
  if (!khaoSokAttractionsData.includes(asset)) failures.push(`Khao Sok attractions data does not use ${asset}`);
  read(`public/images/redesign/${asset}`);
}

const nlHotelDetailData = read('data/hotel-details/nl.ts');
for (const asset of [
  'hotel-mandarin-oriental-bangkok-hero.webp',
  'hotel-tonsai-bay-resort-hero.webp',
  'hotel-centara-reserve-krabi-hero.webp',
  'hotel-oasis-koh-chang-hero.webp',
]) {
  if (!nlHotelDetailData.includes(asset)) failures.push(`NL hotel detail data does not use ${asset}`);
  read(`public/images/redesign/${asset}`);
}
const hotelDetailRoute = read('pages/hotel/[slug].tsx');
for (const proof of ['HotelDetailGuideTemplate', 'getNlHotelDetailGuide', "locale === 'nl' && !nlGuide"]) {
  if (!hotelDetailRoute.includes(proof)) failures.push(`The hotel detail route does not preserve NL localization proof: ${proof}`);
}

const nlAttractionDetailData = read('data/attraction-details/nl.ts');
for (const asset of ['wat-plai-laem-hero.webp', 'blue-temple-chiang-rai-hero.webp']) {
  if (!nlAttractionDetailData.includes(asset)) failures.push(`NL attraction detail data does not use ${asset}`);
  read(`public/images/redesign/${asset}`);
}
const enAttractionDetailData = read('data/attraction-details/en.ts');
for (const proof of [
  "locale: 'en'",
  "'koh-samui/wat-plai-laem'",
  '/images/redesign/wat-plai-laem-hero.webp',
  '/images/redesign/wat-plai-laem-reflection-banner.webp',
  '/city/koh-samui/weather/',
]) {
  if (!enAttractionDetailData.includes(proof)) failures.push(`EN Wat Plai Laem owner lacks proof: ${proof}`);
}
const attractionDetailRoute = read('pages/city/[slug]/attractions/[attraction].tsx');
for (const proof of ['AttractionDetailGuideTemplate', 'getNlAttractionDetailGuide', 'getEnAttractionDetailGuide', "locale === 'nl'"]) {
  if (!attractionDetailRoute.includes(proof)) failures.push(`The attraction detail route does not preserve NL localization proof: ${proof}`);
}

const airportArrivalTemplate = read('components/transport/AirportArrivalGuideTemplate.tsx');
const phuketAirportData = read('data/airport-guides/en/phuket.ts');
const blogRoute = read('pages/blog/[slug].tsx');
for (const proof of ['EditorialHero', 'PageSectionNav', 'FaqSplitSection', 'RelatedGuidesSection', 'SourceMethodSection', 'AffiliateDisclosure']) {
  if (!airportArrivalTemplate.includes(proof)) failures.push(`Airport arrival template does not use ${proof}`);
}
for (const proof of ['airport-en-transfer-klook', 'airport-en-transfer-12go', 'airport-en-airport-night', 'airport-en-phuket-hotels', 'airport-en-esim']) {
  if (!airportArrivalTemplate.includes(proof)) failures.push(`Airport arrival template misses affiliate placement proof: ${proof}`);
}
for (const proof of ['arrivalSteps:', 'transferModes:', 'zones:', 'lateArrival:', 'connectivity:', 'faqs:', 'sources:', 'phuket-airport-arrival-hero.webp']) {
  if (!phuketAirportData.includes(proof)) failures.push(`Phuket Airport data does not define ${proof}`);
}
if ((phuketAirportData.match(/question:/g) || []).length < 10) failures.push('Phuket Airport data must preserve at least ten researched PAA answers');
if (!blogRoute.includes('<AirportArrivalGuideTemplate data={phuketAirportGuideEn} />')) failures.push('Blog route does not wire the English Phuket Airport owner');
read('public/images/redesign/phuket-airport-arrival-hero.webp');

for (const template of ['components/city/DestinationGuideTemplate.tsx', 'components/city/AttractionsGuideTemplate.tsx', 'components/attractions/AttractionDetailGuideTemplate.tsx', 'components/weather/WeatherGuideTemplate.tsx', 'components/hotels/HotelGuideTemplate.tsx', 'components/hotels/HotelDetailGuideTemplate.tsx']) {
  const source = read(template);
  for (const primitive of ['FaqSplitSection', 'RelatedGuidesSection', 'SourceMethodSection']) {
    if (!source.includes(primitive)) failures.push(`${template} does not use ${primitive}`);
  }
}

if (failures.length) {
  console.error(`Design system verification failed (${failures.length}):`);
  failures.forEach(failure => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Design system verification passed: ${primitives.length} primitives and ${pilotTemplates.length + 1} pilot templates.`);
