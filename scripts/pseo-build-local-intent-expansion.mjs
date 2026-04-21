#!/usr/bin/env node
/**
 * Deterministic pSEO expansion builder.
 *
 * Generates local, data-backed records for high-intent pages that do not need
 * external SERP/model calls:
 * - /where-to-stay/[city]/digital-nomads
 * - /best-hotels/[city]/mid-range
 *
 * The output follows the existing data/pseo schemas used by the Next.js page
 * templates. Source facts are pulled from data/clusters so generated pages stay
 * tied to the site's editorial inventory instead of becoming freeform articles.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const CORE_CITIES = ['bangkok', 'chiang-mai', 'phuket', 'krabi', 'koh-samui'];
const UPDATED_AT = '2026-04-21';
const GENERATED_AT = `${UPDATED_AT}T00:00:00.000Z`;

const cityProfiles = {
  bangkok: {
    stationSignal: 'BTS/MRT access matters more than distance on the map',
    airportSignal: 'Grab from Suvarnabhumi usually works better than changing hotels for one late arrival',
    workSignal: 'Pick a BTS-linked area if you plan to cross the city more than twice a week',
    midRangeSignal: 'BTS-adjacent hotels sell out first in November-February',
    digitalPreferred: ['Ari', 'Ekkamai', 'Thonglor', 'Sukhumvit'],
  },
  'chiang-mai': {
    stationSignal: 'Nimman and the Old City are the easiest bases without a car',
    airportSignal: 'The airport is close, so neighbourhood choice matters more than transfer time',
    workSignal: 'Nimman has the densest cafe and remote-work rhythm',
    midRangeSignal: 'Old City mid-range hotels book quickly around Yi Peng and cool season',
    digitalPreferred: ['Nimmanhaemin (Nimman)', 'Santitham', 'Huay Kaew', 'Old City (Within the Moat)'],
  },
  phuket: {
    stationSignal: 'Expect to use Grab, taxis, or a scooter between beaches',
    airportSignal: 'Staying south means a longer transfer but better long-stay food and beach options',
    workSignal: 'Rawai and Old Town work better for routines than Patong party blocks',
    midRangeSignal: 'Beach-area mid-range hotels jump in price during Christmas and New Year',
    digitalPreferred: ['Rawai & Nai Harn', 'Phuket Old Town', 'Chalong', 'Kata Beach'],
  },
  krabi: {
    stationSignal: 'Ao Nang is the easiest mainland base; Koh Lanta is better for slower stays',
    airportSignal: 'Krabi airport transfers are simpler from Ao Nang and Krabi Town than the islands',
    workSignal: 'Saladan and Krabi Town suit longer stays better than remote resort beaches',
    midRangeSignal: 'Ao Nang mid-range hotels fill when island tours peak in dry season',
    digitalPreferred: ['Saladan', 'Krabi Town', 'Ao Nang', 'Long Beach, Koh Lanta'],
  },
  'koh-samui': {
    stationSignal: 'Neighbourhood choice decides whether you can walk, ride, or need taxis every day',
    airportSignal: 'Northeast areas reduce transfer time; Maenam and Lamai feel calmer for longer stays',
    workSignal: 'Maenam, Bophut, and Lamai balance food, beach access, and daily routine',
    midRangeSignal: 'North-coast mid-range rooms go early during European winter holidays',
    digitalPreferred: ['Maenam Beach', "Bophut (Fisherman's Village)", 'Lamai Beach', 'Bang Rak'],
  },
};

const HOTEL_CATEGORY_DEFS = {
  'mid-range': {
    titleLabel: 'mid-range',
    match: hotel => hotel.category === 'mid-range',
    problem: 'paying luxury-area prices for a room that still needs taxis every day',
    rankedOn: 'area practicality, price band, review signal, facilities, and how directly they help travellers solve the stay decision',
    bestForFallback: 'Value-focused travellers',
    topReason: 'location, comfort, and bookable value',
    skipIf: 'Skip if you want either hostel-level pricing or full luxury resort facilities.',
    urgency: profile => profile.midRangeSignal,
    quickLabels: ['Best overall', 'Best value', 'Best comfort'],
  },
  family: {
    titleLabel: 'family',
    terms: ['family', 'families', 'kids', 'children', 'child', 'pool', 'resort'],
    problem: 'ending up somewhere noisy, cramped, or too hard to move around with kids',
    rankedOn: 'room practicality, pool and resort facilities, area convenience, transport friction, and family-friendly value',
    bestForFallback: 'Families with kids',
    topReason: 'comfort, facilities, and easier logistics',
    skipIf: 'Skip if you want an adults-only atmosphere or late-night nightlife on the doorstep.',
    urgency: (_profile, cityName) => `Family-friendly rooms in ${cityName} are easiest to compare early for school holidays and winter high season.`,
    quickLabels: ['Best overall', 'Best value', 'Best for kids'],
  },
  couples: {
    titleLabel: 'couples',
    terms: ['couple', 'couples', 'honeymoon', 'romantic', 'adults', 'boutique', 'quiet'],
    problem: 'booking a practical hotel that feels wrong for the mood of the trip',
    rankedOn: 'location feel, room comfort, quieter setting, dining access, and value for two-person trips',
    bestForFallback: 'Couples',
    topReason: 'atmosphere, comfort, and a better two-person base',
    skipIf: 'Skip if your priority is the cheapest possible room over atmosphere or location.',
    urgency: (_profile, cityName) => `Couples-focused hotels in ${cityName} can jump during Christmas, New Year, and long weekends, so compare refundable rates early.`,
    quickLabels: ['Best overall', 'Best value', 'Most romantic'],
  },
  boutique: {
    titleLabel: 'boutique',
    terms: ['boutique', 'design', 'historic', 'charm', 'heritage', 'villa', 'suite'],
    problem: 'paying for style while losing the location or comfort that actually improves the stay',
    rankedOn: 'design character, room individuality, area fit, service feel, and booking value',
    bestForFallback: 'Design-focused travellers',
    topReason: 'character, location, and a more memorable stay',
    skipIf: 'Skip if you prefer large resort facilities or standardized chain-hotel predictability.',
    urgency: (_profile, cityName) => `Small boutique hotels in ${cityName} have fewer comparable rooms, so the best-value dates disappear faster than large chain inventory.`,
    quickLabels: ['Best overall', 'Best value', 'Best design'],
  },
  'private-pool': {
    titleLabel: 'private pool',
    terms: ['private pool', 'private pools', 'pool villa', 'plunge pool'],
    problem: 'booking an expensive villa-style stay without enough privacy, space, or location fit',
    rankedOn: 'villa feel, privacy, pool or resort facilities, area trade-offs, and special-occasion value',
    bestForFallback: 'Private-stay travellers',
    topReason: 'privacy, space, and special-occasion value',
    skipIf: 'Skip if you will spend most days out touring and only need a simple room.',
    urgency: (_profile, cityName) => `Private-pool style stays in ${cityName} have limited inventory, especially around honeymoons and winter holidays.`,
    quickLabels: ['Best overall', 'Best value', 'Most private'],
  },
  'old-town': {
    titleLabel: 'old town',
    terms: ['old city', 'old town', 'historic', 'heritage', 'temple'],
    problem: 'staying too far from the historic core when your trip is built around temples, food, and walkable streets',
    rankedOn: 'historic access, walkability, room value, atmosphere, and how easily the hotel supports short sightseeing stays',
    bestForFallback: 'Culture-focused travellers',
    topReason: 'historic access, walkability, and practical sightseeing value',
    skipIf: 'Skip if you want resort space, beach access, or a quiet rural setting.',
    urgency: (_profile, cityName) => `Old-town hotels in ${cityName} book quickly around festivals and cool-season sightseeing months.`,
    quickLabels: ['Best overall', 'Best value', 'Best location'],
  },
};

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`);
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[&/]/g, ' ')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function areaSlug(city, areaName) {
  const areasDir = path.join(ROOT, 'data', 'pseo', 'areas');
  if (fs.existsSync(areasDir)) {
    for (const file of fs.readdirSync(areasDir).filter(file => file.startsWith(`${city}-`) && file.endsWith('.json'))) {
      const record = readJson(path.join(areasDir, file));
      if (record.areaName?.trim().toLowerCase() === areaName.trim().toLowerCase()) return record.areaSlug;
    }
  }
  return slugify(areaName);
}

function priceBand(value = '') {
  const lower = value.toLowerCase();
  if (lower.includes('budget') || lower.includes('hostel') || lower.includes('€–€€')) return '€';
  if (lower.includes('luxury') || lower.includes('€€€') || lower.includes('5-star')) return '€€€';
  return '€€';
}

function scoreDigitalArea(area, preferred) {
  const haystack = [
    area.name,
    area.bestFor,
    area.description,
    ...(area.highlights || []),
    ...(area.transportNotes || []),
  ].join(' ').toLowerCase();
  const tokens = [
    'digital nomad',
    'long-stay',
    'long stay',
    'long-stayers',
    'expat',
    'cafes',
    'cafe',
    'coffee',
    'foodies',
    'local',
    'university',
    'budget',
    'residential',
    'quiet',
  ];
  let score = tokens.reduce((total, token) => total + (haystack.includes(token) ? 2 : 0), 0);
  const preferredIndex = preferred.findIndex(name => name.toLowerCase() === area.name.toLowerCase());
  if (preferredIndex >= 0) score += 50 - preferredIndex;
  return score;
}

function selectDigitalAreas(city, neighborhoods) {
  const preferred = cityProfiles[city].digitalPreferred;
  const byName = new Map(neighborhoods.map(area => [area.name.toLowerCase(), area]));
  const preferredAreas = preferred
    .map(name => byName.get(name.toLowerCase()))
    .filter(Boolean);
  const selectedNames = new Set(preferredAreas.map(area => area.name.toLowerCase()));
  const scoredFallbacks = neighborhoods
    .filter(area => !selectedNames.has(area.name.toLowerCase()))
    .map(area => ({ area, score: scoreDigitalArea(area, preferred) }))
    .sort((a, b) => b.score - a.score)
    .map(item => item.area);

  return [...preferredAreas, ...scoredFallbacks]
    .slice(0, 4);
}

function nearbyAreaLine(area) {
  const base = area.bestFor || 'longer stays';
  return String(base).split(',')[0].split('&')[0].trim().toLowerCase();
}

function buildDigitalNomads(city, source) {
  const profile = cityProfiles[city];
  const selected = selectDigitalAreas(city, source.neighborhoods || []);
  const top = selected[0];
  const second = selected[1] || selected[0];
  const third = selected[2] || selected[0];

  return {
    template: 'where-to-stay-audience',
    citySlug: city,
    cityName: source.cityName,
    audience: 'digital-nomads',
    neighborhoods: selected,
    paaQuestions: [
      `Where should digital nomads stay in ${source.cityName}?`,
      `Is ${source.cityName} good for digital nomads?`,
      `Which area in ${source.cityName} is best for long stays?`,
      `Where can remote workers stay in ${source.cityName}?`,
    ],
    aiContent: {
      hookIntro: `Picking the wrong ${source.cityName} base as a digital nomad can turn every workday into transport friction and noisy nights.`,
      intro: `For digital nomads in ${source.cityName}, start with ${top.name} if you want the strongest daily routine and compare it with ${second.name} if budget or pace matters more. We ranked areas by cafe rhythm, long-stay practicality, transport, noise trade-offs, and access to bookable hotels.`,
      quickAnswers: [
        { label: 'Best overall', name: top.name, why: 'Best work-life base' },
        { label: 'Best value', name: second.name, why: 'Better long-stay trade-off' },
        { label: 'Best backup base', name: third.name, why: 'Useful alternative area' },
      ],
      urgencyLine: `Monthly-friendly rooms in ${source.cityName} are easiest to compare before high season, especially around the most practical long-stay areas.`,
      comparisonTable: selected.map(area => ({
        name: area.name,
        bestFor: nearbyAreaLine(area),
        priceBand: priceBand(area.priceLevel),
        walkability: String(area.walkingScore || '').toLowerCase().includes('high') ? 'High' : 'Medium',
        vibe: area.name === top.name ? 'work friendly' : 'local relaxed',
        drawback: city === 'bangkok' ? 'Traffic between districts' : 'Transport varies at night',
      })),
      decisionGuide: [
        `If you want the simplest first digital nomad base, choose ${top.name}.`,
        `If you want a calmer routine with fewer tourist crowds, choose ${second.name}.`,
        `If you care most about food and local errands, choose ${third.name}.`,
        `If you plan to move around often, avoid isolated resort zones and compare ${top.name} first.`,
      ],
      ranking: selected.slice(0, 3).map((area, index) => ({
        rank: index + 1,
        name: area.name,
        why: index === 0
          ? `${area.name} is the best all-round digital nomad base in ${source.cityName} because it combines daily convenience with enough hotel choice to compare short stays before committing longer.`
          : `${area.name} works well when you want ${nearbyAreaLine(area)} and can accept a little more transport planning than ${top.name}.`,
        drawback: index === 0 ? 'Popular blocks can cost more in peak season.' : 'You may need more rides for cross-city plans.',
        skipIf: `Skip if you need every errand, meal, and meeting within a five-minute walk.`,
        localSignals: [
          profile.stationSignal,
          profile.airportSignal,
          profile.workSignal,
        ],
        travellerNote: `Travellers often praise ${area.name} for convenience and daily rhythm but note that monthly value depends heavily on the exact street and season.`,
      })),
      topPick: top.name,
      topPickReason: `${top.name} gives digital nomads the cleanest balance of routine, food, transport, and hotel choice in ${source.cityName}.`,
      bookingTips: [
        `Book 3-7 nights first in ${top.name}, then extend only after checking noise, desk space, and commute times in person.`,
        profile.stationSignal,
        profile.airportSignal,
        `Avoid choosing purely by beach or nightlife; for remote work in ${source.cityName}, daily errands and evening transport matter more.`,
        `During high season, compare refundable rates early so you can switch areas without losing the best long-stay options.`,
      ],
      methodology: `We compared ${source.cityName} areas by long-stay practicality, transport access, cafe and food convenience, noise risk, and hotel density. We weighted daily routine highest because digital nomads usually care more about repeatable workdays than one-off sightseeing. Last updated: 2026-04.`,
      internalLinks: [
        `/where-to-stay/${city}/`,
        `/best-hotels/${city}/`,
        `/best-hotels/${city}/mid-range/`,
        `/areas/${city}/${areaSlug(city, top.name)}/`,
        `/city/${city}/`,
      ],
      ctaPlacements: [
        `after-intro: 'Compare hotels in ${source.cityName}'`,
        `after-comparison-table: 'See long-stay-friendly areas'`,
        `after-top-pick: 'View hotels in ${top.name}'`,
      ],
      faq: [
        {
          q: `Where should digital nomads stay in ${source.cityName}?`,
          a: `${top.name} is the safest first pick for most digital nomads because it balances daily convenience, food access, and hotel choice. Compare ${second.name} if you want a calmer or better-value base.`,
        },
        {
          q: `Is ${source.cityName} good for digital nomads?`,
          a: `${source.cityName} can work well for digital nomads if you choose the right area before optimizing for price. The best base depends on whether you need transport, quiet, beach access, or cafe density.`,
        },
        {
          q: `Which ${source.cityName} area is best for a one-month stay?`,
          a: `${top.name} is the easiest first-month base, while ${second.name} is worth comparing if you want a slower routine after you understand the city.`,
        },
        {
          q: `Should digital nomads book hotels or apartments in ${source.cityName}?`,
          a: `Start with a refundable hotel for the first few nights, then compare longer stays after testing noise, internet, desk comfort, and transport from the exact block.`,
        },
      ],
      metaTitle: `Where to Stay in ${source.cityName} for Digital Nomads`,
      metaDescription: `Compare the best ${source.cityName} areas for digital nomads by work rhythm, transport, value and hotel choice. See where to stay first.`,
    },
    lastUpdated: UPDATED_AT,
    generatedAt: GENERATED_AT,
  };
}

function hotelHaystack(hotel) {
  return [
    hotel.name,
    hotel.category,
    hotel.area,
    hotel.description,
    ...(hotel.highlights || []),
    ...(hotel.bestFor || []),
  ].join(' ').toLowerCase();
}

function selectHotelsForCategory(source, def) {
  return (source.hotels || []).filter(hotel => {
    if (def.match) return def.match(hotel);
    const haystack = hotelHaystack(hotel);
    return def.terms.some(term => haystack.includes(term));
  });
}

function buildHotelCategory(city, source, category, hotels) {
  const profile = cityProfiles[city];
  const def = HOTEL_CATEGORY_DEFS[category];
  const top = hotels[0];
  const second = hotels[1] || hotels[0];
  const third = hotels[2] || hotels[0];
  const categoryLabel = def.titleLabel;
  const titleCaseLabel = categoryLabel
    .split(/[\s-]+/)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
  const urgencyLine = def.urgency(profile, source.cityName);

  return {
    template: 'best-hotels-category',
    citySlug: city,
    cityName: source.cityName,
    category,
    hotels,
    paaQuestions: [
      `What is the best ${categoryLabel} hotel in ${source.cityName}?`,
      `Where should I stay in ${source.cityName} for ${categoryLabel} hotels?`,
      `Which ${source.cityName} ${categoryLabel} hotels are worth booking?`,
      `What area has the best ${categoryLabel} hotels in ${source.cityName}?`,
    ],
    aiContent: {
      hookIntro: `Choosing the wrong ${categoryLabel} hotel in ${source.cityName} can mean ${def.problem}.`,
      intro: `The best ${categoryLabel} hotels in ${source.cityName} should fit the reason you are booking, not just the nightly price. We ranked these hotels by ${def.rankedOn}.`,
      quickAnswers: [
        { label: def.quickLabels[0], name: top.name, why: 'Best overall fit' },
        { label: def.quickLabels[1], name: second.name, why: 'Strong practical value' },
        { label: def.quickLabels[2], name: third.name, why: 'Useful alternative pick' },
      ],
      urgencyLine,
      comparisonTable: hotels.map(hotel => ({
        name: hotel.name,
        area: hotel.area || source.cityName,
        priceBand: priceBand(`${hotel.category || ''} ${hotel.priceRange || ''}`),
        bestFor: (hotel.bestFor || []).slice(0, 2).join(', ') || def.bestForFallback,
        standout: (hotel.highlights || [])[0] || 'Location',
        drawback: city === 'bangkok' ? 'Traffic can affect plans' : 'Rates vary by season',
      })),
      decisionGuide: [
        `If you want the safest ${categoryLabel} pick, choose ${top.name}.`,
        `If you want a practical base with strong value, choose ${second.name}.`,
        `If the top pick is unavailable, compare ${third.name}.`,
        `If your dates fall in peak season, compare refundable rates before narrowing by area.`,
      ],
      ranking: hotels.slice(0, 3).map((hotel, index) => ({
        rank: index + 1,
        name: hotel.name,
        why: index === 0
          ? `${hotel.name} is the strongest ${categoryLabel} pick because it balances ${def.topReason} better than the alternatives.`
          : `${hotel.name} is a good alternative when its area or room style fits your itinerary better than ${top.name}.`,
        drawback: index === 0 ? 'Best-value rates may disappear first.' : 'It is less universal than the top pick.',
        skipIf: def.skipIf,
        localSignals: [
          hotel.area ? `Area: ${hotel.area}` : `Area: ${source.cityName}`,
          hotel.priceRange ? `Typical range: ${hotel.priceRange}` : `Typical range: ${categoryLabel}`,
          urgencyLine,
        ],
        travellerNote: `Travellers often choose ${hotel.name} for its fit with ${categoryLabel} stays but should compare recent room types and cancellation terms before booking.`,
      })),
      topPick: top.name,
      topPickReason: `${top.name} is the easiest ${categoryLabel} recommendation when you want ${def.topReason}.`,
      bookingTips: [
        `Compare rates for ${top.name} first, then check ${second.name} and ${third.name} for refundable deals on the same dates.`,
        urgencyLine,
        `Use the exact area as a filter; a cheaper ${source.cityName} hotel can cost more once daily transport is included.`,
        `For stays longer than three nights, prioritize the reason you are choosing ${categoryLabel} over a small nightly discount.`,
        `Check cancellation terms before booking peak-season dates so you can rebook if a better area opens up.`,
      ],
      methodology: `We filtered the ${source.cityName} hotel inventory to ${categoryLabel} properties and compared them by area, price band, facilities, practical traveller fit, and booking usefulness. We publish this category only when at least three data-backed hotels are available. Last updated: 2026-04.`,
      internalLinks: [
        `/best-hotels/${city}/`,
        `/where-to-stay/${city}/`,
        category === 'mid-range' ? `/where-to-stay/${city}/digital-nomads/` : `/best-hotels/${city}/mid-range/`,
        `/where-to-stay/${city}/first-time/`,
        `/city/${city}/`,
      ],
      ctaPlacements: [
        `after-intro: 'Compare ${categoryLabel} hotels in ${source.cityName}'`,
        `after-comparison-table: 'Check rates for top picks'`,
        `after-top-pick: 'View ${top.name}'`,
      ],
      faq: [
        {
          q: `What is the best ${categoryLabel} hotel in ${source.cityName}?`,
          a: `${top.name} is the best first comparison point because it gives a strong balance of location, comfort, and price. Compare it with ${second.name} if your dates are expensive.`,
        },
        {
          q: `Which area has good ${categoryLabel} hotels in ${source.cityName}?`,
          a: `Start with the areas attached to the top picks on this page, then compare them against the main where-to-stay guide before booking.`,
        },
        {
          q: `Are ${categoryLabel} hotels in ${source.cityName} worth it?`,
          a: `Yes, if the hotel matches your trip style and area needs. Compare the trade-offs in the table before choosing only by price.`,
        },
        {
          q: `When should I book ${categoryLabel} hotels in ${source.cityName}?`,
          a: `Book earlier for peak season and festival dates, especially if you need refundable rates in the most practical areas.`,
        },
      ],
      metaTitle: `Best ${titleCaseLabel} Hotels in ${source.cityName} (2026)`,
      metaDescription: `Compare the best ${categoryLabel} hotels in ${source.cityName} by area, value, comfort and booking fit. See top picks before you reserve.`,
    },
    lastUpdated: UPDATED_AT,
    generatedAt: GENERATED_AT,
  };
}

for (const city of CORE_CITIES) {
  const whereToStay = readJson(path.join(ROOT, 'data', 'clusters', city, 'where-to-stay.json'));
  const hotels = readJson(path.join(ROOT, 'data', 'clusters', city, 'hotels.json'));

  writeJson(
    path.join(ROOT, 'data', 'pseo', 'where-to-stay', `${city}-digital-nomads.json`),
    buildDigitalNomads(city, whereToStay),
  );

  for (const [category, def] of Object.entries(HOTEL_CATEGORY_DEFS)) {
    const categoryHotels = selectHotelsForCategory(hotels, def);
    const outputFile = path.join(ROOT, 'data', 'pseo', 'best-hotels', `${city}-${category}.json`);
    if (categoryHotels.length < 3) {
      if (fs.existsSync(outputFile)) fs.unlinkSync(outputFile);
      continue;
    }
    writeJson(outputFile, buildHotelCategory(city, hotels, category, categoryHotels));
  }
}

console.log('Generated local intent expansion records.');
