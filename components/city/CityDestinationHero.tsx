import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Building2, CalendarDays, Clock3, Compass, MapPin, Palmtree, Sparkles, Utensils } from 'lucide-react';
import { normalizeEnInternalHref } from '../../lib/en-route-owners';
import { normalizeNlInternalHref } from '../../lib/nl-route-owners';

interface CityDestinationHeroProps {
  activitiesHref: string;
  bestTime: string;
  cityName: string;
  citySlug: string;
  description: string;
  heroImage: string;
  hotelsHref: string;
  idealFor: string;
  isNl: boolean;
  stayLength: string;
}

export function CityDestinationHero({ activitiesHref, bestTime, cityName, citySlug, description, heroImage, hotelsHref, idealFor, isNl, stayLength }: CityDestinationHeroProps) {
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
  const isSuratThani = citySlug === 'surat-thani' && !isNl;
  const isChumphon = citySlug === 'chumphon' && !isNl;
  const isNakhonSiThammarat = citySlug === 'nakhon-si-thammarat' && !isNl;
  const isPremiumOwner = isKrabi || isBangkok || isChiangMai || isPhuket || isAyutthaya || isKohSamui || isChiangRai || isKanchanaburi || isSukhothai || isPai || isHuaHin || isPattaya || isTrat || isRayong || isSuratThani || isChumphon || isNakhonSiThammarat;
  const subtitle = isKrabi
    ? isNl ? 'Kalksteenkliffen, eilanden en een slimme basis aan de Andamanse kust.' : 'Limestone cliffs, islands and a smart base on the Andaman coast.'
    : isBangkok
      ? 'Temples, river neighbourhoods and modern city energy—best explored by cluster.'
    : isChiangMai
      ? 'Lanna temples, Northern food and mountain edges—with a base for every rhythm.'
    : isPhuket
      ? 'Beach zones, Old Town flavour and Andaman day trips—planned as one island.'
    : isAyutthaya
      ? 'Ancient-capital ruins, river history and a route worth slowing down for.'
    : isKohSamui
      ? 'Distinct beach zones, Gulf weather and one island loop—planned at a slower pace.'
    : isChiangRai
      ? 'Contemporary temple art, quiet city evenings and one northern route—without the checklist.'
    : isKanchanaburi
      ? 'River Kwai history, waterfall country and upriver nights—planned as separate chapters.'
    : isSukhothai
      ? 'UNESCO ruins, quiet cycling loops and a second heritage landscape—read in the right order.'
    : isPai
      ? 'A walkable mountain town, a wider valley and one winding arrival—planned without scooter pressure.'
    : isHuaHin
      ? 'A long city beach, market evenings and one wild limestone day—within easy reach of Bangkok.'
    : isPattaya
      ? 'Four coastal zones, one cultural anchor and an evening for every kind of traveller.'
    : isTrat
      ? 'Old wooden streets, eastern food and three very different island routes—planned from the mainland first.'
    : isRayong
      ? 'A real mainland coast, an old-town evening and one deliberate island or mangrove extension.'
    : isSuratThani
      ? 'A southern river city, serious food and one onward island, jungle or heritage chapter.'
    : isChumphon
      ? 'A quiet mainland coast, a real provincial evening and one deliberate sea chapter.'
    : isNakhonSiThammarat
      ? 'A living temple city, southern food and mountain-village craft—planned as one coherent journey.'
      : description;
  const directAnswer = isKrabi
    ? isNl
      ? 'Krabi is een provincie in Zuid-Thailand én de naam van Krabi Town. Voor een eerste reis is Ao Nang meestal de handigste basis voor boten en restaurants. Met vier dagen heb je tijd voor Railay, een eilandtour en één dag op het vasteland.'
      : 'Krabi is both a province in southern Thailand and the name of Krabi Town. Ao Nang is usually the most convenient first base for boats and restaurants. Four days gives you time for Railay, an island tour and one day on the mainland.'
    : isBangkok
      ? 'Bangkok is Thailand’s capital, but it is not one compact centre. Plan the Old Town and river, Chinatown and the BTS/MRT corridor as separate clusters. Three full days gives most first-time visitors a strong introduction without turning every transfer into a race.'
    : isChiangMai
      ? 'Chiang Mai is Northern Thailand’s cultural hub, but the visitor experience extends beyond the moat. Plan the Old City, Nimman and the mountain side as connected clusters. Three full days gives you temples, Northern food and one deeper experience without rushing.'
    : isPhuket
      ? 'Phuket is Thailand’s largest island and also a province; Phuket Town is its urban centre. Choose one beach zone as your base, give Old Town its own block and plan one serious boat day. Four full days is a useful first-trip minimum without constant cross-island transfers.'
    : isAyutthaya
      ? 'Ayutthaya was a major Siamese capital and its protected historic city is now a UNESCO World Heritage Site. A focused day trip can cover the central ruin cluster and one outer temple; an overnight adds early light, a museum and a slower river evening.'
    : isKohSamui
      ? 'Koh Samui is a Gulf of Thailand island with very different stay zones. Choose Chaweng, Lamai, Bophut or a quieter coast first, then plan one island loop and one sea day. Four to five days gives a first trip enough room for beach time and changing conditions.'
    : isChiangRai
      ? 'Chiang Rai is a compact Northern Thai city and a practical base for a much larger province. Two nights covers the city and main art-temple circuit without rushing; add a third full day for one mountain, tea or border-history route.'
    : isKanchanaburi
      ? 'Kanchanaburi is both a provincial city and the gateway to a long western corridor. Use one day for documented history and remembrance, then give Erawan, the surviving railway or an upriver stay its own chapter. Two to three days is a strong first balance.'
    : isSukhothai
      ? 'Sukhothai is both a modern provincial town and a UNESCO-listed old-capital landscape. Start in the central zone, add Wat Si Chum or the west only after that orientation, and give Si Satchanalai a separate day. One night is a strong minimum; two full days adds real depth.'
    : isPai
      ? 'Pai is a compact valley town in Mae Hong Son province, most commonly reached from Chiang Mai by a winding mountain road. Stay near the centre for a walkable evening, then plan one outer-valley day by driver, organised route or suitable legal transport. Two to three nights is a strong first balance.'
    : isHuaHin
      ? 'Hua Hin is a coastal city in Prachuap Khiri Khan province, not one continuous resort strip. Choose the older centre, Nong Kae or Khao Takiab first, then separate the beach-and-market rhythm from any full-day nature route. Two to three nights is a strong first balance.'
    : isPattaya
      ? 'Where is Pattaya in Thailand? Pattaya is a coastal city in Chon Buri province on the eastern Gulf coast, within practical overland reach of Bangkok. Choose Central Pattaya, Naklua, Pratumnak or Jomtien first, then build separate culture, island and evening chapters. Two to three days is a strong first balance.'
    : isTrat
      ? 'Where is Trat in Thailand? Trat is a provincial town in eastern Thailand and the mainland gateway to Koh Chang, Koh Mak and Koh Kood. One night is a useful transfer buffer; two nights gives the old quarter, local food and one coastal community their own chapter before the island journey.'
    : isRayong
      ? 'Where is Rayong in Thailand? Rayong is a provincial city and a long mainland coast east of Bangkok, while Koh Samet is a separate island in the same province. Two nights covers Yomjinda, Khao Laem Ya and Mae Ramphueng; use a third day for one fruit, mangrove or island extension.'
    : isSuratThani
      ? 'Where is Surat Thani in Thailand? Surat Thani is a southern river city and the capital of a province that also contains Koh Samui, Koh Phangan and Koh Tao. One night reveals the old town and food scene; two nights adds a canal route before a separately planned island, Khao Sok or Chaiya chapter.'
    : isChumphon
      ? 'Where is Chumphon in Thailand? Chumphon is a southern mainland province and city on the Gulf of Thailand, with a long coast, Mu Ko Chumphon National Park and ferry connections to Koh Tao. Two nights gives town and the mainland coast their own shape; add a third day for one weather-dependent sea chapter.'
    : isNakhonSiThammarat
      ? 'Nakhon Si Thammarat is both a historic southern Thai city and the capital of a much larger province. Two nights gives Wat Phra Mahathat, the old core, living craft and local food enough room; add a third day only for one deliberate Kiriwong or Phromlok extension.'
      : '';
  const regionLabel = isKrabi ? (isNl ? 'Zuid-Thailand' : 'Southern Thailand') : isTrat || isRayong ? 'Eastern Thailand' : isBangkok || isAyutthaya || isKanchanaburi || isHuaHin || isPattaya ? 'Central Thailand' : isChiangMai || isChiangRai || isSukhothai || isPai ? 'Northern Thailand' : isPhuket || isKohSamui || isSuratThani || isChumphon || isNakhonSiThammarat ? 'Southern Thailand' : 'Thailand';
  const ownerHref = (href: string) => isNl ? normalizeNlInternalHref(href) : normalizeEnInternalHref(href);

  const navigation = [
    { href: '#over-bestemming', label: isNl ? `Over ${cityName}` : `About ${cityName}`, icon: Sparkles },
    { href: ownerHref(`/city/${citySlug}/attractions/`), label: isNl ? 'Wat te doen' : 'Things to do', icon: Compass },
    isBangkok || isChiangMai || isPhuket || isAyutthaya || isKohSamui || isChiangRai || isKanchanaburi || isSukhothai || isPai || isHuaHin || isPattaya || isTrat || isRayong || isSuratThani || isChumphon || isNakhonSiThammarat
      ? { href: ownerHref(`/city/${citySlug}/food/`), label: 'Food', icon: Utensils }
      : { href: '/best-beaches-in-thailand/', label: isNl ? 'Stranden' : 'Beaches', icon: Palmtree },
    { href: ownerHref(`/best-hotels/${citySlug}/`), label: 'Hotels', icon: Building2 },
    { href: ownerHref(`/city/${citySlug}/budget/`), label: isNl ? 'Praktisch' : 'Practical', icon: MapPin },
  ];

  return (
    <>
      <section className={`relative min-h-[650px] overflow-hidden bg-[#eaf1ef] lg:min-h-0 ${isPremiumOwner ? 'lg:h-[650px]' : 'lg:h-[610px]'}`}>
        <Image
          src={heroImage}
          alt={`${cityName}, Thailand`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[61%_center] lg:object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(252,250,246,0.05)_0%,rgba(252,250,246,0.18)_48%,rgba(252,250,246,0.96)_100%)] lg:bg-[linear-gradient(90deg,rgba(252,250,246,0.97)_0%,rgba(252,250,246,0.88)_28%,rgba(252,250,246,0.18)_57%,rgba(6,54,47,0.04)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#fcfaf6]/90 via-[#fcfaf6]/45 to-transparent lg:hidden" />

        <div className="container-custom relative z-10 flex h-full min-h-[650px] items-end pb-8 pt-32 lg:min-h-0 lg:items-center lg:pb-0 lg:pt-16">
          <div className="max-w-[590px]">
            <nav aria-label={isNl ? 'Kruimelpad' : 'Breadcrumb'} className="mb-5 flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.13em] text-jade/65">
              <Link href="/" className="transition hover:text-saffron-dark">Thailand</Link>
              <span aria-hidden="true">/</span>
              <span>{regionLabel}</span>
              <span aria-hidden="true">/</span>
              <span className="text-jade">{cityName}</span>
            </nav>

            <h1 className="font-display font-semibold leading-[0.82] tracking-[-0.045em] text-jade">
              <span className={`block ${isNakhonSiThammarat ? 'text-[2.75rem] sm:text-[4.3rem] lg:text-[5.35rem]' : isKanchanaburi ? 'text-[3.25rem] sm:text-[5rem] lg:text-[6.6rem]' : 'text-[4.5rem] sm:text-[5.6rem] lg:text-[6.6rem]'}`}>{cityName}<span className="sr-only">, </span></span>
              {isPremiumOwner && <span className="mt-2 block text-[2.35rem] tracking-[-0.03em] sm:text-[2.8rem] lg:text-[3.25rem]">Thailand</span>}
            </h1>
            <p className="mt-5 max-w-[530px] font-display text-[1.55rem] font-semibold leading-[1.05] text-jade sm:text-[1.85rem]">{subtitle}</p>
            {directAnswer && <p className="mt-4 max-w-[540px] text-sm font-medium leading-6 text-charcoal/72">{directAnswer}</p>}

            <div className="mt-7 flex flex-wrap gap-3">
              <a href={activitiesHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-jade btn-jade-pattern group min-h-12 px-6">
                {isNl ? 'Bekijk uitjes' : 'View experiences'}
                <ArrowRight size={17} className="text-saffron transition-transform group-hover:translate-x-1" />
              </a>
              <a href={hotelsHref} target="_blank" rel="noopener noreferrer nofollow sponsored" className="btn-cream group min-h-12 px-6 text-saffron-dark">
                {isNl ? 'Vind een hotel' : 'Find a hotel'}
                <span className="grid h-6 w-6 place-items-center rounded-md border border-saffron/45"><ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" /></span>
              </a>
            </div>
            {isPremiumOwner && (
              <p className="mt-3 max-w-[540px] text-[9px] leading-4 text-charcoal/48">
                {isNl
                  ? 'De hotel- en uitjesknoppen zijn affiliatelinks. Bij een boeking ontvangen wij mogelijk een commissie; jij betaalt niets extra.'
                  : 'Hotel and experience buttons are affiliate links. We may earn a commission when you book, at no extra cost to you.'}
              </p>
            )}

            <dl className="mt-8 grid max-w-[570px] grid-cols-1 gap-3 border-t border-jade/12 pt-5 text-jade sm:grid-cols-3 sm:gap-0">
              <div className="flex items-center gap-3 sm:border-r sm:border-jade/12 sm:pr-4">
                <CalendarDays size={18} className="shrink-0 text-jade/65" />
                <div><dt className="text-[10px] font-medium text-charcoal/50">{isNl ? 'Beste reistijd' : 'Best time'}</dt><dd className="text-xs font-bold">{bestTime}</dd></div>
              </div>
              <div className="flex items-center gap-3 sm:border-r sm:border-jade/12 sm:px-4">
                <Palmtree size={18} className="shrink-0 text-jade/65" />
                <div><dt className="text-[10px] font-medium text-charcoal/50">{isKrabi ? (isNl ? 'Handige eerste basis' : 'Convenient first base') : isBangkok || isChiangMai || isPhuket || isAyutthaya || isKohSamui || isChiangRai || isKanchanaburi || isSukhothai || isPai || isHuaHin || isPattaya || isTrat || isRayong || isSuratThani || isChumphon || isNakhonSiThammarat ? 'Well-linked bases' : (isNl ? 'Ideaal voor' : 'Ideal for')}</dt><dd className="text-xs font-bold">{idealFor}</dd></div>
              </div>
              <div className="flex items-center gap-3 sm:pl-4">
                <Clock3 size={18} className="shrink-0 text-jade/65" />
                <div><dt className="text-[10px] font-medium text-charcoal/50">{isPremiumOwner ? (isNl ? 'Ideale reisduur' : 'Ideal trip length') : (isNl ? 'Verblijf' : 'Stay')}</dt><dd className="text-xs font-bold">{stayLength}</dd></div>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <nav aria-label={isNl ? 'Op deze bestemmingspagina' : 'On this destination page'} className="section-divider-bottom bg-[#fcfaf6]">
        <div className="container-custom scrollbar-hide flex snap-x items-stretch overflow-x-auto py-1 lg:justify-center">
          {navigation.map(({ href, label, icon: Icon }, index) => (
            <Link key={href} href={href} className={`group flex min-w-[145px] snap-start items-center justify-center gap-2 border-b-2 px-5 py-4 text-xs font-bold transition ${index === 0 ? 'border-jade text-jade' : 'border-transparent text-charcoal/55 hover:border-saffron/45 hover:text-jade'}`}>
              <Icon size={16} className={index === 0 ? 'text-jade' : 'text-charcoal/40 group-hover:text-saffron'} />
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
