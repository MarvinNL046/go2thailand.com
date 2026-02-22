#!/usr/bin/env node
/**
 * Generate transport routes between Thailand cities.
 * Uses lat/lng from cities CSV to calculate distances,
 * then determines available transport modes and realistic durations.
 *
 * Usage: node scripts/generate-transport-routes.js
 */

const fs = require('fs');
const path = require('path');

// Read cities from CSV
const csvPath = path.join(__dirname, '..', 'thailand-csv', 'cities.csv');
const csvContent = fs.readFileSync(csvPath, 'utf8');
const lines = csvContent.trim().split('\n');
const headers = lines[0].split(',');

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (const ch of line) {
    if (ch === '"') { inQuotes = !inQuotes; }
    else if (ch === ',' && !inQuotes) { result.push(current); current = ''; }
    else { current += ch; }
  }
  result.push(current);
  return result;
}

const cities = lines.slice(1).map(line => {
  const vals = parseCSVLine(line);
  return {
    slug: vals[1],
    name: vals[2],
    region: vals[4],
    lat: parseFloat(vals[10]),
    lng: parseFloat(vals[11]),
  };
}).filter(c => c.lat && c.lng);

console.log(`Loaded ${cities.length} cities with coordinates`);

// Haversine distance in km
function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

// Road distance is roughly 1.3-1.5x straight-line in Thailand
function roadDistance(straightLine) {
  return Math.round(straightLine * 1.35);
}

// Cities with airports (domestic flights)
const AIRPORT_CITIES = [
  'bangkok', 'chiang-mai', 'phuket', 'krabi', 'koh-samui', 'hat-yai',
  'chiang-rai', 'surat-thani', 'udon-thani', 'khon-kaen', 'ubon-ratchathani',
  'nakhon-ratchasima', 'nakhon-si-thammarat', 'lampang', 'phitsanulok',
  'sukhothai', 'trang', 'chumphon', 'nakhon-phanom', 'mae-hong-son',
  'hua-hin', 'pattaya', // U-Tapao serves Pattaya/Rayong
  'rayong', // U-Tapao
];

// Cities with train stations (Thai railway network)
const TRAIN_CITIES = [
  'bangkok', 'chiang-mai', 'ayutthaya', 'phitsanulok', 'lampang',
  'surat-thani', 'hat-yai', 'nakhon-ratchasima', 'khon-kaen',
  'udon-thani', 'ubon-ratchathani', 'hua-hin', 'chumphon',
  'nakhon-si-thammarat', 'trang', 'lopburi', 'sukhothai',
  'nong-khai', // train to Nong Khai
];

// Coastal/ferry cities
const FERRY_CITIES = [
  'phuket', 'krabi', 'koh-samui', 'surat-thani', 'trat',
  'chumphon', 'trang', 'rayong',
];

// Hub cities (connect to many destinations)
const HUB_CITIES = ['bangkok', 'chiang-mai', 'phuket', 'krabi', 'pattaya', 'hua-hin'];

// Popular tourist cities (get bidirectional routes)
const POPULAR_CITIES = [
  'bangkok', 'chiang-mai', 'phuket', 'pattaya', 'krabi', 'chiang-rai',
  'koh-samui', 'hua-hin', 'ayutthaya', 'pai', 'kanchanaburi',
];

// Determine transport duration based on distance and mode
function getFlightDuration(distKm) {
  if (distKm < 300) return '45 minutes';
  if (distKm < 500) return '1 hour';
  if (distKm < 800) return '1.25 hours';
  if (distKm < 1200) return '1.5 hours';
  return '2 hours';
}

function getBusDuration(distKm) {
  // Average 60-70 km/h for Thai buses
  const hours = distKm / 65;
  const low = Math.round(hours * 0.9);
  const high = Math.round(hours * 1.2);
  if (low === high) return `${low} hours`;
  return `${low}-${high} hours`;
}

function getTrainDuration(distKm) {
  // Thai trains average 40-50 km/h
  const hours = distKm / 45;
  const low = Math.round(hours * 0.9);
  const high = Math.round(hours * 1.3);
  if (low === high) return `${low} hours`;
  return `${low}-${high} hours`;
}

function getCarDuration(distKm) {
  // Average 80-90 km/h on Thai highways
  const hours = distKm / 85;
  const low = Math.round(hours * 0.9 * 10) / 10;
  const high = Math.round(hours * 1.15 * 10) / 10;
  if (Math.round(low) === Math.round(high)) return `${Math.round(low)} hours`;
  return `${Math.round(low)}-${Math.round(high)} hours`;
}

function getTaxiDuration(distKm) {
  // Taxis slightly faster than buses
  const hours = distKm / 80;
  const low = Math.round(hours * 0.9 * 10) / 10;
  const high = Math.round(hours * 1.1 * 10) / 10;
  if (Math.round(low) === Math.round(high)) return `${Math.round(low)} hours`;
  return `${Math.round(low)}-${Math.round(high)} hours`;
}

// Build route between two cities
function buildRoute(from, to) {
  const straightDist = haversine(from.lat, from.lng, to.lat, to.lng);
  const dist = roadDistance(straightDist);

  const duration = {};

  // Flight: both cities need airports, and distance should be > 200km (otherwise not worth flying)
  if (dist > 200 && AIRPORT_CITIES.includes(from.slug) && AIRPORT_CITIES.includes(to.slug)) {
    duration.flight = getFlightDuration(dist);
  }

  // Bus: available for most routes under 1500km
  if (dist < 1500) {
    duration.bus = getBusDuration(dist);
  }

  // Train: both cities need train stations
  if (TRAIN_CITIES.includes(from.slug) && TRAIN_CITIES.includes(to.slug) && dist < 1200) {
    duration.train = getTrainDuration(dist);
  }

  // Taxi: practical for distances under 400km
  if (dist < 400) {
    duration.taxi = getTaxiDuration(dist);
  }

  // Car: always available for road trips under 1500km
  if (dist < 1500) {
    duration.car = getCarDuration(dist);
  }

  // Ferry: between coastal cities that are close
  if (FERRY_CITIES.includes(from.slug) && FERRY_CITIES.includes(to.slug) && dist < 500) {
    duration.ferry = dist < 100 ? '1-2 hours' : dist < 200 ? '2-3 hours' : '3-5 hours';
  }

  // Determine popularity
  const popular = POPULAR_CITIES.includes(from.slug) && POPULAR_CITIES.includes(to.slug);

  return {
    from: from.slug,
    to: to.slug,
    slug: `${from.slug}-to-${to.slug}`,
    distance: `${dist} km`,
    duration,
    popular,
  };
}

// Generate routes
const existingRoutes = JSON.parse(fs.readFileSync(
  path.join(__dirname, '..', 'data', 'transport-routes.json'), 'utf8'
));
const existingSlugs = new Set(existingRoutes.routes.map(r => r.slug));

const newRoutes = [];
const cityMap = Object.fromEntries(cities.map(c => [c.slug, c]));

// Strategy:
// 1. Bangkok to/from all other cities (hub)
// 2. Chiang Mai to/from northern + popular cities
// 3. Phuket to/from southern + popular cities
// 4. Regional connections (nearby cities within 300km)
// 5. Popular cross-regional routes

const routePairs = new Set();

function addRoute(fromSlug, toSlug) {
  const key = `${fromSlug}-to-${toSlug}`;
  if (routePairs.has(key)) return;
  if (existingSlugs.has(key)) return;
  if (!cityMap[fromSlug] || !cityMap[toSlug]) return;
  if (fromSlug === toSlug) return;

  routePairs.add(key);
  const route = buildRoute(cityMap[fromSlug], cityMap[toSlug]);

  // Skip if no transport modes or only car available (not useful)
  const modes = Object.keys(route.duration);
  if (modes.length === 0) return;
  if (modes.length <= 1 && modes[0] === 'car') return;

  newRoutes.push(route);
}

// 1. Bangkok hub: to/from all cities
for (const city of cities) {
  if (city.slug === 'bangkok') continue;
  addRoute('bangkok', city.slug);
  // Reverse for popular destinations
  if (POPULAR_CITIES.includes(city.slug)) {
    addRoute(city.slug, 'bangkok');
  }
}

// 2. Chiang Mai hub: to/from nearby + popular
for (const city of cities) {
  if (city.slug === 'chiang-mai') continue;
  const dist = haversine(cityMap['chiang-mai'].lat, cityMap['chiang-mai'].lng, city.lat, city.lng);
  if (dist < 400 || POPULAR_CITIES.includes(city.slug)) {
    addRoute('chiang-mai', city.slug);
    if (POPULAR_CITIES.includes(city.slug)) {
      addRoute(city.slug, 'chiang-mai');
    }
  }
}

// 3. Phuket hub: to/from nearby + popular
for (const city of cities) {
  if (city.slug === 'phuket') continue;
  const dist = haversine(cityMap['phuket'].lat, cityMap['phuket'].lng, city.lat, city.lng);
  if (dist < 400 || POPULAR_CITIES.includes(city.slug)) {
    addRoute('phuket', city.slug);
    if (POPULAR_CITIES.includes(city.slug)) {
      addRoute(city.slug, 'phuket');
    }
  }
}

// 4. Regional connections: cities within 300km of each other
for (let i = 0; i < cities.length; i++) {
  for (let j = i + 1; j < cities.length; j++) {
    const dist = haversine(cities[i].lat, cities[i].lng, cities[j].lat, cities[j].lng);
    if (dist < 300) {
      addRoute(cities[i].slug, cities[j].slug);
      // Reverse for popular pairs
      if (POPULAR_CITIES.includes(cities[i].slug) || POPULAR_CITIES.includes(cities[j].slug)) {
        addRoute(cities[j].slug, cities[i].slug);
      }
    }
  }
}

// 5. Popular cross-regional (often searched)
const crossRegional = [
  ['chiang-mai', 'phuket'],
  ['chiang-mai', 'krabi'],
  ['chiang-rai', 'phuket'],
  ['pattaya', 'phuket'],
  ['pattaya', 'krabi'],
  ['hua-hin', 'phuket'],
  ['hua-hin', 'krabi'],
  ['koh-samui', 'phuket'],
  ['koh-samui', 'krabi'],
  ['koh-samui', 'chiang-mai'],
  ['ayutthaya', 'chiang-mai'],
  ['kanchanaburi', 'chiang-mai'],
  ['udon-thani', 'chiang-mai'],
  ['khon-kaen', 'chiang-mai'],
];

for (const [a, b] of crossRegional) {
  addRoute(a, b);
  addRoute(b, a);
}

// Merge with existing routes
const allRoutes = [...existingRoutes.routes, ...newRoutes];

// Sort: popular first, then alphabetically
allRoutes.sort((a, b) => {
  if (a.popular !== b.popular) return b.popular ? 1 : -1;
  return a.slug.localeCompare(b.slug);
});

const output = { routes: allRoutes };
const outputPath = path.join(__dirname, '..', 'data', 'transport-routes.json');
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

console.log(`\nResults:`);
console.log(`  Existing routes kept: ${existingRoutes.routes.length}`);
console.log(`  New routes added: ${newRoutes.length}`);
console.log(`  Total routes: ${allRoutes.length}`);
console.log(`  Popular routes: ${allRoutes.filter(r => r.popular).length}`);
console.log(`  Unpopular routes: ${allRoutes.filter(r => !r.popular).length}`);
console.log(`\nSaved to: ${outputPath}`);
