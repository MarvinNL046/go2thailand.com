import Image from 'next/image';
import { StoryDottedRoute } from '../visuals/StoryDottedRoute';

interface CityEditorialIntroProps {
  cityName: string;
  citySlug: string;
  editorial: string;
  imageSrc: string;
  isNl: boolean;
}

export function CityEditorialIntro({ cityName, citySlug, editorial, imageSrc, isNl }: CityEditorialIntroProps) {
  const isKrabi = citySlug === 'krabi';
  const isBangkok = citySlug === 'bangkok' && !isNl;
  const isChiangMai = citySlug === 'chiang-mai' && !isNl;
  const isPhuket = citySlug === 'phuket' && !isNl;
  const isAyutthaya = citySlug === 'ayutthaya' && !isNl;
  const isKohSamui = citySlug === 'koh-samui' && !isNl;
  const isChiangRai = citySlug === 'chiang-rai' && !isNl;
  const isKanchanaburi = citySlug === 'kanchanaburi' && !isNl;
  const isSukhothai = citySlug === 'sukhothai' && !isNl;
  const isPai = citySlug === 'pai' && !isNl;
  const isHuaHin = citySlug === 'hua-hin' && !isNl;
  const isPattaya = citySlug === 'pattaya' && !isNl;
  const isTrat = citySlug === 'trat' && !isNl;
  const isRayong = citySlug === 'rayong' && !isNl;
  const title = isKrabi
    ? (isNl ? 'Krabi in het kort' : 'Krabi at a glance')
    : isBangkok
      ? 'Bangkok at a glance'
    : isChiangMai
      ? 'Chiang Mai at a glance'
    : isPhuket
      ? 'Phuket at a glance'
    : isAyutthaya
      ? 'Ayutthaya at a glance'
    : isKohSamui
      ? 'Koh Samui at a glance'
    : isChiangRai
      ? 'Chiang Rai at a glance'
    : isKanchanaburi
      ? 'Kanchanaburi at a glance'
    : isSukhothai
      ? 'Sukhothai at a glance'
    : isPai
      ? 'Pai at a glance'
    : isHuaHin
      ? 'Hua Hin at a glance'
    : isPattaya
      ? 'Pattaya at a glance'
    : isTrat
      ? 'Trat at a glance'
    : isRayong
      ? 'Rayong at a glance'
      : (isNl ? `${cityName} op z’n mooist` : `${cityName} at its finest`);
  const paragraphs = isKrabi
    ? isNl
      ? [
          'Krabi is een provincie aan de Andamanse kust van Zuid-Thailand. De naam wordt ook gebruikt voor Krabi Town, de provinciehoofdstad. De meeste strandreizigers slapen niet in de stad, maar in Ao Nang, Railay of aan de rustigere kust bij Klong Muang en Tubkaek.',
          'Ao Nang is voor een eerste bezoek de praktischste uitvalsbasis: boten naar Railay en de eilanden vertrekken dichtbij en je hebt veel keuze uit restaurants en hotels. Railay past beter bij een bijzonder strandverblijf, terwijl Krabi Town aantrekkelijk is voor markten en een lokalere sfeer. Vier dagen is voor de meeste reizigers een goede balans tussen zee, vasteland en rust.',
        ]
      : [
          'Krabi is a province on southern Thailand’s Andaman coast, and Krabi Town is its provincial capital. Most beach travellers stay outside the town in Ao Nang, Railay or along the quieter Klong Muang and Tubkaak coast.',
          'Ao Nang is usually the easiest first base because boats, transfers, restaurants and hotels are close at hand. Railay suits a scenery-led beach stay, while Krabi Town is stronger for markets and a more local evening. Four days gives most first-time visitors a useful balance of coast, mainland and breathing room.',
        ]
    : isBangkok
      ? [
          'Bangkok is Thailand’s capital and its largest urban region, but the visitor experience is split across distinct clusters. Rattanakosin and Thonburi hold the royal and temple core; the Chao Phraya links heritage districts; Chinatown is a food and trade city of its own; Siam, Sukhumvit, Silom and Sathorn follow different rail and evening rhythms.',
          'For a first visit, choose one well-connected base and build days by neighbourhood rather than by a citywide attraction list. Three full days can combine old Bangkok and the river, Chinatown and local food, then the modern city with green space. A fourth or fifth day adds depth rather than urgency.',
        ]
    : isChiangMai
      ? [
          'Chiang Mai is Northern Thailand’s cultural hub, built around a moat-ringed historic core but extending west toward Nimman and Doi Suthep and east toward the Ping River. The Old City is strongest for temple walks; Nimman adds cafes and modern design; the riverside gives the trip a slower hotel and dining rhythm.',
          'For a first visit, three full days can combine the Old City, a mountain-side route and one deeper experience such as a cooking class or carefully researched sanctuary. Add time for craft culture or nature, and treat live air quality as a planning input rather than a footnote.',
        ]
    : isPhuket
      ? [
          'Phuket is Thailand’s largest island and the centre of a province with the same name. The west coast holds the best-known beach zones; Phuket Town and Old Town sit inland on the southeast side; piers, temples and viewpoints form separate clusters across a much larger island than many first-time visitors expect.',
          'For a first visit, choose one coast base, reserve a focused block for Old Town and add one boat or bay day. Four full days creates a useful balance of beach, food, culture and sea without making traffic the main experience.',
        ]
    : isAyutthaya
      ? [
          'Ayutthaya was founded in the 14th century and became a major Siamese capital before its destruction in the 18th century. The UNESCO-listed historic city preserves the central royal and religious core, while important temples and river landscapes extend beyond the island circuit.',
          'A full day can cover one coherent central cluster, a shaded food or museum pause and one outer temple. Staying overnight removes the Bangkok deadline and creates room for early light, a second historical layer and a quieter river evening.',
        ]
    : isKohSamui
      ? [
          'Koh Samui sits in the Gulf of Thailand and combines mature resort infrastructure with distinct beach zones, a ring road, temple clusters and access to Mu Ko Ang Thong. Chaweng, Lamai, Bophut and the quieter north and west coasts create genuinely different first trips.',
          'Choose the coast before the hotel, keep one focused island loop and reserve one day for the sea if conditions suit. Four to five days gives a first visit enough room for beach time, one deeper route and weather flexibility without making the ring road the main attraction.',
        ]
    : isChiangRai
      ? [
          'Chiang Rai is both a compact Northern Thai city and the gateway to a much larger province. The centre gives you an easy evening around the clock tower and market area, while Wat Rong Khun, Wat Rong Suea Ten, Baan Dam and the mountain routes sit in different road clusters.',
          'For a first visit, two nights can combine the city, contemporary art-temple circuit and one unhurried evening. Add a third full day for Doi Tung, Mae Salong or Golden Triangle history, and treat live air quality as a real planning input during northern haze periods.',
        ]
    : isKanchanaburi
      ? [
          'Kanchanaburi is both a city and a large western Thai province. The city holds the bridge, cemetery and important interpretation sites, while Erawan, Sai Yok, Hellfire Pass and far-west river stays extend along a much larger road and railway corridor.',
          'A focused day trip can introduce the town’s remembrance layer, but two or three days creates a more responsible balance: history with context, one separate nature or railway day, and—if it matters to you—a slower upriver night. Treat current park and transport conditions as live inputs.',
        ]
    : isSukhothai
      ? [
          'Sukhothai is both a modern provincial town and the wider landscape of Thailand’s early old capital. The UNESCO World Heritage property links Sukhothai with Si Satchanalai and Kamphaeng Phet, while the visitor experience starts with a much clearer distinction: New Sukhothai for practical town life, and Mueang Kao for the historical park.',
          'For a first visit, use the central zone to understand Wat Mahathat, the ponds, walls and overall city plan. Add Wat Si Chum or the west as a second layer, then decide whether another day should deepen the local park or go to Si Satchanalai. One night works; two full days creates a calmer and more legible trip.',
        ]
    : isPai
      ? [
          'Where is Pai in Thailand? Pai is a small town in Mae Hong Son province, set in a wider northern valley beyond a winding mountain journey from Chiang Mai. The centre around Walking Street is compact and easy to understand; Pai Canyon, hot springs, viewpoints and community stops sit in separate outer clusters.',
          'For a first visit, use the arrival day for the town, then give one full day to a coherent valley route. Two nights is workable, while three nights creates room for road recovery, changing weather and a no-scooter plan without turning every viewpoint into a timed transfer.',
        ]
    : isHuaHin
      ? [
          'Hua Hin is a coastal city in Prachuap Khiri Khan province and one of Thailand’s long-established seaside escapes from Bangkok. The older centre combines railway-era heritage, Chat Chai Market, the main night market and a long urban beach; Nong Kae and Khao Takiab create a more resort-led south-coast stay.',
          'For a first visit, use one morning for the centre and beach, one late day for Khao Takiab and the south-side markets, then decide whether a third day belongs to the resort or Khao Sam Roi Yot. Hua Hin works best when the city coast and outer nature routes remain separate chapters.',
        ]
    : isPattaya
      ? [
          'Pattaya is a coastal city in Chon Buri province on Thailand’s eastern Gulf coast, connected to Bangkok by a practical overland corridor. Central Pattaya is the commercial and nightlife-heavy core; Naklua and the north add the Sanctuary of Truth and resort stays; Pratumnak creates a quieter edge; Jomtien runs at a slower beachfront pace.',
          'For a first visit, choose the area before the hotel, then separate the cultural north, one island or south-coast day and the evening atmosphere you actually want. Two nights can work, while three days creates enough room for Koh Larn or Jomtien without reducing the whole city to Walking Street.',
        ]
    : isTrat
      ? [
          'Trat is both a compact provincial town in eastern Thailand and the mainland gateway to an island-rich province. The centre has an old wooden quarter, the Bang Phra canal community, a city museum and a useful local food-and-market layer; Laem Ngop and Ban Nam Chiao form separate coastal extensions beyond town.',
          'For a first visit, one night works as a sensible transfer buffer, while two nights creates room for the old centre and one mainland route. Koh Chang, Koh Mak and Koh Kood are specialist island trips with different piers, stay styles and transfer chains—choose the island before booking the connection.',
        ]
    : isRayong
      ? [
          'Rayong is both a provincial city and a long eastern Gulf coast. Yomjinda Road gives the centre a compact old-town layer; Mae Ramphueng and Khao Laem Ya form the clearest mainland beach-and-nature pair; Ban Phe is the working harbour and departure area for Koh Samet.',
          'For a first visit, choose the base before the hotel. Two nights can combine the city and mainland coast, while a third day belongs to one deliberate extension: the Prasae mangrove side, a currently operating fruit orchard or Koh Samet as a separate island chapter.',
        ]
      : [editorial].filter(Boolean);

  return (
    <section id="over-bestemming" className="section-divider-bottom scroll-mt-24 bg-[#fcfaf6]">
      <div className="container-custom grid items-center gap-8 py-12 lg:grid-cols-[0.72fr_1.55fr] lg:gap-14 lg:py-16">
        <div className="relative self-stretch lg:flex lg:flex-col lg:justify-center">
          <p className="eyebrow">{isKrabi ? (isNl ? 'Eerst even oriënteren' : 'Start with the essentials') : isBangkok ? 'Start with the city structure' : isChiangMai || isChiangRai || isKanchanaburi || isTrat ? 'Start with the city and province' : isRayong ? 'Start with the city and mainland coast' : isSukhothai ? 'Start with the old-city structure' : isPai ? 'Start with the town and valley' : isHuaHin || isPattaya ? 'Start with the city and coast' : isPhuket || isKohSamui ? 'Start with the island structure' : isAyutthaya ? 'Start with the historical layers' : (isNl ? 'Ontdek de bestemming' : 'Discover the destination')}</p>
          <h2 className="font-display text-[3.1rem] font-semibold leading-[0.9] tracking-[-0.035em] text-jade sm:text-[3.7rem]">{title}</h2>
          <div className="mt-6 max-w-[31rem] space-y-4 text-sm leading-7 text-charcoal/62">
            {paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <StoryDottedRoute className="mt-1 ml-auto hidden h-[112px] w-[145px] opacity-85 sm:block lg:mr-3" />
        </div>

        <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-jade/10 bg-jade/5 shadow-[0_8px_28px_rgba(18,63,54,0.06)] lg:aspect-[16/8.8]">
          <Image src={imageSrc} alt={isNl ? `${cityName} vanuit de lucht` : `${cityName} city overview`} fill sizes="(min-width: 1024px) 65vw, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-jade/10 via-transparent to-white/5" />
        </div>
      </div>
    </section>
  );
}
