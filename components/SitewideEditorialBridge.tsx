import Link from 'next/link';
import { ArrowRight, Compass, MapPin, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/router';
import { normalizeEnInternalHref } from '../lib/en-route-owners';
import { nlAttractionsOwner, nlCityOwner, normalizeNlInternalHref } from '../lib/nl-route-owners';

interface EditorialLink {
  href: string;
  label: string;
  shortLabel: string;
}

interface BridgeContent {
  eyebrow: string;
  title: string;
  intro: string;
  links: EditorialLink[];
}

const CITY_NAMES: Record<string, string> = {
  'ayutthaya': 'Ayutthaya',
  'bangkok': 'Bangkok',
  'bueng-kan': 'Bueng Kan',
  'chiang-khan': 'Chiang Khan',
  'chiang-mai': 'Chiang Mai',
  'chiang-rai': 'Chiang Rai',
  'hat-yai': 'Hat Yai',
  'hua-hin': 'Hua Hin',
  'khao-sok': 'Khao Sok',
  'koh-samui': 'Koh Samui',
  'krabi': 'Krabi',
  'mukdahan': 'Mukdahan',
  'nakhon-phanom': 'Nakhon Phanom',
  'nong-khai': 'Nong Khai',
  'pattaya': 'Pattaya',
  'phuket': 'Phuket',
  'sukhothai': 'Sukhothai',
};

function cityName(slug: string): string {
  return CITY_NAMES[slug] || slug.split('-').map(part => `${part.charAt(0).toUpperCase()}${part.slice(1)}`).join(' ');
}

function routePath(asPath: string): string {
  const path = (asPath.split(/[?#]/)[0] || '/').replace(/^\/nl(?=\/|$)/, '') || '/';
  return path === '/' ? '/' : `${path.replace(/\/+$/, '')}/`;
}

function link(href: string, label: string, shortLabel: string): EditorialLink {
  return { href: normalizeNlInternalHref(href), label, shortLabel };
}

function englishLink(href: string, label: string, shortLabel: string): EditorialLink {
  return { href: normalizeEnInternalHref(href), label, shortLabel };
}

function buildContent(path: string): BridgeContent {
  const cityMatch = path.match(/^\/city\/([^/]+)\//);
  const hotelMatch = path.match(/^\/best-hotels\/([^/]+)\//);

  if (cityMatch) {
    const slug = cityMatch[1];
    const name = cityName(slug);
    const cityLinks = [
      link(nlAttractionsOwner(slug), `de bezienswaardigheden van ${name}`, 'Bezienswaardigheden'),
      link(`/best-hotels/${slug}/`, `de beste hotels in ${name}`, 'Bijzonder overnachten'),
      link(`/city/${slug}/best-time-to-visit/`, `het weer en de beste reistijd voor ${name}`, 'Weer & reistijd'),
    ];
    if (path === '/city/chiang-mai/') {
      cityLinks[2] = link('/flights-to-chiang-mai/', 'de vluchtgids voor Chiang Mai', 'Vliegen naar Chiang Mai');
    }
    if (path === '/city/koh-samui/attractions/') {
      cityLinks[0] = link('/city/koh-samui/attractions/wat-plai-laem/', 'onze verdiepende gids voor Wat Plai Laem', 'Wat Plai Laem');
    }
    return {
      eyebrow: 'Maak je reisplan compleet',
      title: `Verder reizen vanuit ${name}`,
      intro: `Een fijne reis draait om de samenhang tussen wat je wilt zien, waar je slaapt en wanneer je gaat.`,
      links: cityLinks,
    };
  }

  if (hotelMatch) {
    const slug = hotelMatch[1];
    const name = cityName(slug);
    const hotelLinks: Record<string, EditorialLink[]> = {
      bangkok: [
        link('/city/bangkok/', 'onze complete gids voor Bangkok', 'Bestemming'),
        link('/hotel/mandarin-oriental-bangkok/', 'de onafhankelijke analyse van Mandarin Oriental Bangkok', 'Hotelanalyse'),
        link('/city/bangkok/attractions/', 'de mooiste plekken in Bangkok', 'Wat te doen'),
      ],
      krabi: [
        link('/city/krabi/', 'onze complete gids voor Krabi', 'Bestemming'),
        link('/hotel/centara-grand-beach-resort-villas-krabi/', 'de actuele analyse van Centara Reserve Krabi', 'Centara Reserve'),
        link('/hotel/tonsai-bay-resort/', 'de onafhankelijke analyse van Tonsai Bay Resort', 'Tonsai Bay Resort'),
      ],
      phuket: [
        link('/city/phuket/', 'onze complete gids voor Phuket', 'Bestemming'),
        link('/best-hotels/phuket/resorts/', 'onze vergelijking van Phuket-resorts', 'Resorts vergelijken'),
        link('/city/phuket/attractions/', 'de mooiste plekken op Phuket', 'Wat te doen'),
      ],
      trat: [
        link('/islands/koh-chang/', 'onze complete gids voor Koh Chang', 'Koh Chang'),
        link('/hotel/oasis-koh-chang/', 'de onafhankelijke analyse van Oasis Koh Chang', 'Oasis Koh Chang'),
        link('/transport/', 'de praktische vervoersgids voor Thailand', 'Vervoer'),
      ],
    };
    return {
      eyebrow: 'Van verblijf naar reisplan',
      title: `Ontdek meer van ${name}`,
      intro: 'De beste uitvalsbasis past bij je route, dagplanning en het seizoen waarin je reist.',
      links: hotelLinks[slug] || [
        link(nlCityOwner(slug), `onze complete gids voor ${name}`, 'Bestemming'),
        link(nlAttractionsOwner(slug), `de mooiste plekken in ${name}`, 'Wat te doen'),
        link('/transport/', 'de praktische vervoersgids voor Thailand', 'Vervoer'),
      ],
    };
  }

  if (path.startsWith('/phuket') || path.includes('-phuket/')) {
    return {
      eyebrow: 'Plan Phuket als geheel',
      title: 'Van stranddag naar complete eilandreis',
      intro: 'Phuket werkt het best wanneer je strand, verblijf en excursies als één route bekijkt.',
      links: [
        link('/city/phuket/', 'de complete Phuket-reisgids', 'Phuket overzicht'),
        link('/best-hotels/phuket/', 'de beste hotels en resorts op Phuket', 'Waar verblijven'),
        link('/phuket-tours/', 'betrouwbare tours en activiteiten op Phuket', 'Tours & uitjes'),
      ],
    };
  }

  if (path.startsWith('/islands/') || path === '/thailand-islands/' || path.includes('beaches')) {
    return {
      eyebrow: 'Van eilanddroom naar route',
      title: 'Kies een eiland dat bij je reis past',
      intro: 'De sfeer, bereikbaarheid en seizoenen verschillen sterker per eiland dan de kaart doet vermoeden.',
      links: [
        link('/thailand-islands/', 'onze vergelijking van de Thaise eilanden', 'Eilanden vergelijken'),
        link('/transport/', 'de gids voor ferry’s, treinen en transfers', 'Route & vervoer'),
        link('/weather/', 'het weer per regio en reisperiode', 'Weer & seizoen'),
      ],
    };
  }

  if (path.startsWith('/food/') || path.startsWith('/drinks/') || path.includes('street-food')) {
    return {
      eyebrow: 'Proef verder',
      title: 'Laat eten je route door Thailand bepalen',
      intro: 'Regionale keukens, markten en lokale adressen geven iedere bestemming een eigen smaak.',
      links: [
        link('/food/', 'de complete gids voor Thais eten', 'Thaise keuken'),
        link('/city/', 'onze bestemmingen en lokale eettips', 'Bestemmingen'),
        link('/travel-guides/', 'praktische reisgidsen voor onderweg', 'Reisgidsen'),
      ],
    };
  }

  if (path.startsWith('/visa/') || path.includes('first-timer') || path.includes('first-time')) {
    return {
      eyebrow: 'Goed voorbereid vertrekken',
      title: 'Regel de praktische basis van je reis',
      intro: 'Controleer toelating, verzekering en je eerste reisdagen voordat je losse boekingen vastlegt.',
      links: [
        link('/visa/thailand-elite-visa/', 'onze actuele uitleg over Thailand Privilege', 'Thailand Privilege'),
        link('/travel-insurance/', 'onze uitleg over reisverzekeringen', 'Reisverzekering'),
        link('/thailand-for-first-timers/', 'de Thailand-gids voor je eerste reis', 'Eerste keer Thailand'),
      ],
    };
  }

  if (path.startsWith('/transport/') || path.startsWith('/flights-to-')) {
    return {
      eyebrow: 'Bouw je route verder uit',
      title: 'Laat afstanden voor je werken',
      intro: 'Een slimme volgorde bespaart reistijd en houdt voldoende ruimte over voor spontane dagen.',
      links: [
        link('/transport/', 'alle belangrijke vervoersroutes in Thailand', 'Vervoer vergelijken'),
        link('/itineraries/', 'onze uitgewerkte Thailand-rondreizen', 'Reisroutes'),
        link('/city/', 'de bestemmingen die logisch op je route passen', 'Volgende bestemming'),
      ],
    };
  }

  if (path.startsWith('/itinerar') || path.includes('itinerary')) {
    return {
      eyebrow: 'Van idee naar dagplanning',
      title: 'Maak van losse plekken één sterke route',
      intro: 'Stem reistempo, seizoen en bestemmingen op elkaar af voordat je vervoer en hotels boekt.',
      links: [
        link('/itineraries/', 'onze complete rondreizen door Thailand', 'Rondreizen'),
        link('/weather/', 'de beste reistijd per regio', 'Beste reistijd'),
        link('/city/', 'alle bestemmingen voor je route', 'Bestemmingen'),
      ],
    };
  }

  if (path.startsWith('/travel-gear/') || path.startsWith('/travel-security/')) {
    return {
      eyebrow: 'Slim voorbereid op pad',
      title: 'Pak alleen in wat je reis beter maakt',
      intro: 'Kies je uitrusting op basis van klimaat, route en activiteiten in plaats van een standaard paklijst.',
      links: [
        link('/travel-gear/', 'onze praktische Thailand-paklijst', 'Paklijst'),
        link('/travel-insurance/', 'de reisverzekering die bij je plannen past', 'Reisverzekering'),
        link('/is-thailand-safe/', 'de actuele veiligheidsgids voor Thailand', 'Veilig reizen'),
      ],
    };
  }

  if (path.startsWith('/blog/')) {
    return {
      eyebrow: 'Van artikel naar reisplan',
      title: 'Bewaar inspiratie die bij jouw reis past',
      intro: 'Gebruik een artikel als vertrekpunt en verbind nieuwe ideeën daarna met je route en praktische voorbereiding.',
      links: [
        link('/travel-guides/', 'onze praktische Thailand-reisgidsen', 'Praktische gidsen'),
        link('/social/', 'onze sociale kanalen en nieuwe community-updates', 'Volg Go2Thailand'),
        link('/itineraries/', 'onze uitgewerkte Thailand-rondreizen', 'Reisroutes'),
      ],
    };
  }

  return {
    eyebrow: 'Jouw volgende stap',
    title: 'Maak van inspiratie een reis die klopt',
    intro: 'Verdiep je eerst in de grote keuzes en werk daarna bestemming voor bestemming verder.',
    links: [
      link('/thailand-travel-guide/', 'onze complete reisgids voor Thailand', 'Thailand reisgids'),
      link('/city/', 'alle bestemmingen en hun karakter', 'Bestemmingen'),
      link('/itineraries/', 'onze uitgewerkte Thailand-rondreizen', 'Reisroutes'),
    ],
  };
}

function buildEnglishContent(path: string): BridgeContent {
  const cityMatch = path.match(/^\/city\/([^/]+)\//);
  const hotelMatch = path.match(/^\/best-hotels\/([^/]+)\//);

  if (cityMatch) {
    const slug = cityMatch[1];
    const name = cityName(slug);
    return {
      eyebrow: 'Complete your route',
      title: `Travel further from ${name}`,
      intro: 'A good itinerary connects what you want to see with where you stay and the season in which you travel.',
      links: [
        englishLink(`/city/${slug}/attractions/`, `the best things to do in ${name}`, 'Things to do'),
        englishLink(`/best-hotels/${slug}/`, `the best hotels in ${name}`, 'Places to stay'),
        englishLink(`/city/${slug}/best-time-to-visit/`, `the weather and best time to visit ${name}`, 'Weather & timing'),
      ],
    };
  }

  if (hotelMatch) {
    const slug = hotelMatch[1];
    const name = cityName(slug);
    const cityHref = normalizeEnInternalHref(`/city/${slug}/`);
    const hasCityOwner = cityHref !== '/city/';
    return {
      eyebrow: 'From hotel shortlist to itinerary',
      title: `Discover more of ${name}`,
      intro: 'The right base depends on your route, daily pace and the experiences that matter most to you.',
      links: hasCityOwner
        ? [
            englishLink(`/city/${slug}/`, `our complete ${name} travel guide`, 'Destination guide'),
            englishLink(`/city/${slug}/attractions/`, `the best things to do in ${name}`, 'Things to do'),
            englishLink('/transport/', 'our practical guide to transport in Thailand', 'Getting around'),
          ]
        : [
            englishLink(`/where-to-stay/${slug}/`, `the best areas to stay in ${name}`, 'Area guide'),
            englishLink('/city/', 'our published Thailand destination guides', 'Destinations'),
            englishLink('/transport/', 'our practical guide to transport in Thailand', 'Getting around'),
          ],
    };
  }

  if (path.startsWith('/phuket') || path.includes('-phuket/')) {
    return {
      eyebrow: 'Plan Phuket as one trip',
      title: 'Connect your beach days, base and adventures',
      intro: 'Phuket is easier to plan when you treat its beaches, neighbourhoods and day trips as one connected route.',
      links: [
        englishLink('/city/phuket/', 'our complete Phuket travel guide', 'Phuket guide'),
        englishLink('/best-hotels/phuket/', 'the best hotels and resorts in Phuket', 'Where to stay'),
        englishLink('/phuket-tours/', 'trusted tours and activities in Phuket', 'Tours & activities'),
      ],
    };
  }

  if (path.startsWith('/islands/') || path === '/thailand-islands/' || path.includes('beaches')) {
    return {
      eyebrow: 'Turn an island idea into a route',
      title: 'Choose an island that fits your trip',
      intro: 'Atmosphere, connections and seasonal weather vary more between Thai islands than the map suggests.',
      links: [
        englishLink('/thailand-islands/', 'our comparison of Thailand’s islands', 'Compare islands'),
        englishLink('/transport/', 'the guide to ferries, trains and transfers', 'Route & transport'),
        englishLink('/weather/', 'weather by region and travel period', 'Weather & seasons'),
      ],
    };
  }

  if (path.startsWith('/food/') || path.startsWith('/drinks/') || path.includes('street-food')) {
    return {
      eyebrow: 'Keep tasting',
      title: 'Let food shape your route through Thailand',
      intro: 'Regional cooking, local markets and neighbourhood favourites give every destination a different flavour.',
      links: [
        englishLink('/food/', 'our complete guide to Thai food', 'Thai food guide'),
        englishLink('/city/', 'our destinations and local food ideas', 'Destinations'),
        englishLink('/travel-guides/', 'practical guides for travelling in Thailand', 'Travel guides'),
      ],
    };
  }

  if (path.startsWith('/visa/') || path.includes('first-timer') || path.includes('first-time')) {
    return {
      eyebrow: 'Prepare before you leave',
      title: 'Get the practical foundations right',
      intro: 'Check entry rules, insurance and your first days in Thailand before committing to separate bookings.',
      links: [
        englishLink('/visa/', 'our current overview of Thailand visa routes', 'Visa overview'),
        englishLink('/travel-insurance/', 'our guide to Thailand travel insurance', 'Travel insurance'),
        englishLink('/thailand-for-first-timers/', 'the Thailand guide for first-time visitors', 'First trip guide'),
      ],
    };
  }

  if (path.startsWith('/transport/') || path.startsWith('/flights-to-')) {
    return {
      eyebrow: 'Build the next leg',
      title: 'Make Thailand’s distances work for you',
      intro: 'A smart sequence reduces travel time and leaves enough room for unplanned days along the way.',
      links: [
        englishLink('/transport/', 'the main transport routes across Thailand', 'Compare transport'),
        englishLink('/itineraries/', 'our complete Thailand itineraries', 'Itineraries'),
        englishLink('/city/', 'destinations that fit naturally into your route', 'Next destination'),
      ],
    };
  }

  if (path.startsWith('/itinerar') || path.includes('itinerary')) {
    return {
      eyebrow: 'From idea to day plan',
      title: 'Turn separate places into one coherent route',
      intro: 'Balance pace, season and destinations before booking long-distance transport and hotels.',
      links: [
        englishLink('/itineraries/', 'our complete itineraries through Thailand', 'Thailand itineraries'),
        englishLink('/weather/', 'the best time to visit each region', 'Best time to go'),
        englishLink('/city/', 'all destinations for your route', 'Destinations'),
      ],
    };
  }

  if (path.startsWith('/travel-gear/') || path.startsWith('/travel-security/')) {
    return {
      eyebrow: 'Pack with purpose',
      title: 'Bring only what improves your trip',
      intro: 'Choose gear for your climate, route and activities instead of following a generic packing list.',
      links: [
        englishLink('/travel-gear/', 'our practical Thailand packing guide', 'Packing guide'),
        englishLink('/travel-insurance/', 'travel insurance for your plans', 'Travel insurance'),
        englishLink('/is-thailand-safe/', 'our current Thailand safety guide', 'Travel safely'),
      ],
    };
  }

  if (path.startsWith('/blog/')) {
    return {
      eyebrow: 'From story to itinerary',
      title: 'Connect inspiration to the rest of your trip',
      intro: 'Use this story as a starting point, then match new ideas to your route and practical preparation.',
      links: [
        englishLink('/travel-guides/', 'our practical Thailand travel guides', 'Practical guides'),
        englishLink('/city/', 'our destination guides across Thailand', 'Destinations'),
        englishLink('/itineraries/', 'our complete Thailand itineraries', 'Itineraries'),
      ],
    };
  }

  return {
    eyebrow: 'Your next step',
    title: 'Turn inspiration into a trip that works',
    intro: 'Start with the big decisions, then shape the details one destination at a time.',
    links: [
      englishLink('/thailand-travel-guide/', 'our complete Thailand travel guide', 'Thailand guide'),
      englishLink('/city/', 'all destinations and what makes them different', 'Destinations'),
      englishLink('/itineraries/', 'our complete Thailand itineraries', 'Itineraries'),
    ],
  };
}

export default function SitewideEditorialBridge() {
  const router = useRouter();
  const isNl = router.locale === 'nl';

  const currentPath = routePath(router.asPath);
  // The homepage newsletter is deliberately connected directly to the footer.
  if (currentPath === '/') return null;

  const content = isNl ? buildContent(currentPath) : buildEnglishContent(currentPath);
  const fallback = isNl
    ? link('/travel-guides/', 'onze praktische Thailand-reisgidsen', 'Reisgidsen')
    : englishLink('/travel-guides/', 'our practical Thailand travel guides', 'Travel guides');
  const visibleLinks = content.links
    .filter((item, index, items) => item.href !== currentPath && items.findIndex(other => other.href === item.href) === index);
  if (visibleLinks.length < 3 && fallback.href !== currentPath && !visibleLinks.some(item => item.href === fallback.href)) {
    visibleLinks.push(fallback);
  }
  const links = visibleLinks.slice(0, 3);

  return (
    <section aria-labelledby="sitewide-editorial-bridge-title" className="bg-canvas px-4 py-12 sm:px-6 lg:py-16">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[1.4rem] border border-jade/10 bg-white shadow-editorial-card">
        <div aria-hidden="true" className="absolute -left-16 -top-20 h-52 w-52 rounded-full bg-saffron/10 blur-3xl" />
        <div aria-hidden="true" className="absolute -bottom-24 right-10 h-56 w-56 rounded-full bg-mist blur-3xl" />

        <div className="relative grid lg:grid-cols-[0.92fr_1.08fr]">
          <div className="px-6 py-8 sm:px-9 sm:py-10 lg:px-11">
            <p className="eyebrow">{content.eyebrow}</p>
            <h2 id="sitewide-editorial-bridge-title" className="mt-3 max-w-xl font-display text-[2.35rem] font-semibold leading-[0.95] tracking-[-0.035em] text-jade sm:text-[2.75rem]">
              {content.title}
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-charcoal/70">
              {content.intro}{' '}
              {isNl ? <>
                Begin met <Link href={links[0].href} className="font-bold text-jade underline decoration-saffron/55 decoration-2 underline-offset-4 transition hover:text-saffron-dark">{links[0].label}</Link>,
                {' '}leg dat naast <Link href={links[1].href} className="font-bold text-jade underline decoration-saffron/55 decoration-2 underline-offset-4 transition hover:text-saffron-dark">{links[1].label}</Link>
                {links[2] ? <> en gebruik <Link href={links[2].href} className="font-bold text-jade underline decoration-saffron/55 decoration-2 underline-offset-4 transition hover:text-saffron-dark">{links[2].label}</Link> om de details goed op elkaar af te stemmen.</> : '.'}
              </> : <>
                Start with <Link href={links[0].href} className="font-bold text-jade underline decoration-saffron/55 decoration-2 underline-offset-4 transition hover:text-saffron-dark">{links[0].label}</Link>,
                {' '}compare it with <Link href={links[1].href} className="font-bold text-jade underline decoration-saffron/55 decoration-2 underline-offset-4 transition hover:text-saffron-dark">{links[1].label}</Link>
                {links[2] ? <> and use <Link href={links[2].href} className="font-bold text-jade underline decoration-saffron/55 decoration-2 underline-offset-4 transition hover:text-saffron-dark">{links[2].label}</Link> to align the practical details.</> : '.'}
              </>}
            </p>
          </div>

          <div className="relative border-t border-jade/10 bg-tonal/55 px-6 py-8 sm:px-9 lg:border-l lg:border-t-0 lg:px-10 lg:py-10">
            <div aria-hidden="true" className="absolute left-11 top-[3.25rem] h-[calc(100%-6.5rem)] border-l border-dashed border-saffron/70 lg:left-[13%] lg:right-[13%] lg:top-[4.05rem] lg:h-0 lg:border-l-0 lg:border-t" />
            <ol className="relative grid gap-4 lg:grid-cols-3 lg:gap-5">
              {links.map((item, index) => (
                <li key={item.href} className="relative">
                  <Link href={item.href} className="group flex min-h-[84px] items-center gap-4 rounded-xl border border-jade/10 bg-white/90 p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-saffron/40 hover:shadow-editorial-card lg:min-h-[150px] lg:flex-col lg:items-start lg:justify-between">
                    <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-saffron/40 bg-canvas text-sm font-extrabold text-jade shadow-sm">
                      {index === 0 ? <MapPin size={18} aria-hidden="true" className="text-saffron-dark" /> : index + 1}
                    </span>
                    <span className="flex flex-1 items-end justify-between gap-3 lg:w-full">
                      <span className="text-sm font-extrabold leading-snug text-jade">{item.shortLabel}</span>
                      <ArrowRight size={16} aria-hidden="true" className="shrink-0 text-saffron transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="relative flex flex-col gap-2 border-t border-jade/10 bg-jade px-6 py-4 text-white sm:flex-row sm:items-center sm:justify-between sm:px-9 lg:px-11">
          <span className="inline-flex items-center gap-2 text-xs font-bold"><Compass size={15} aria-hidden="true" className="text-saffron" /> {isNl ? 'Onafhankelijk samengesteld voor jouw reisplanning' : 'Independently selected for your travel planning'}</span>
          <p className="inline-flex max-w-xl items-start gap-2 text-[11px] leading-5 text-white/72 sm:text-right">
            <ShieldCheck size={15} aria-hidden="true" className="mt-0.5 shrink-0 text-saffron-light" />
            {isNl
              ? 'Sommige boekings- en productlinks zijn affiliatelinks. Wij kunnen een commissie ontvangen, zonder extra kosten voor jou; onze redactionele keuzes blijven onafhankelijk.'
              : 'Some booking and product links are affiliate links. We may earn a commission at no extra cost to you; our editorial choices remain independent.'}
          </p>
        </div>
      </div>
    </section>
  );
}
