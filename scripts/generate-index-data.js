#!/usr/bin/env node
/**
 * generate-index-data.js
 *
 * Aggregates city, weather, transport, and region data into a single
 * `data/thailand-index.json` file consumed by the Thailand Index pages.
 *
 * Usage: node scripts/generate-index-data.js
 * npm:   npm run data:index
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------
const ROOT = path.resolve(__dirname, '..');
const ENHANCED_DIR = path.join(ROOT, 'data', 'enhanced');
const WEATHER_FILE = path.join(ROOT, 'data', 'city-weather.json');
const TRANSPORT_FILE = path.join(ROOT, 'data', 'transport-routes.json');
const REGIONS_FILE = path.join(ROOT, 'data', 'regions', 'index.json');
const OUTPUT_FILE = path.join(ROOT, 'data', 'thailand-index.json');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** SHA-256 hash of a file, truncated to 12 hex chars */
function fileHash(filePath) {
  try {
    const content = fs.readFileSync(filePath);
    return crypto.createHash('sha256').update(content).digest('hex').slice(0, 12);
  } catch {
    return null;
  }
}

/** Convert a city name like "Chiang Mai" to slug "chiang-mai" */
function nameToSlug(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

// ---------------------------------------------------------------------------
// Budget Parsing
// ---------------------------------------------------------------------------

/**
 * Parse a budget string like "$30-50 per day", "$100+", "~$40/day", "$15-25"
 * Returns { min, max, median } in USD, or null if unparseable.
 */
function parseBudgetString(str) {
  if (!str || typeof str !== 'string') return null;

  // Remove currency symbols, whitespace normalizations
  const clean = str.trim();

  // Pattern: "$100+" or "$100+ per day"
  const plusMatch = clean.match(/\$(\d+)\+/);
  if (plusMatch) {
    const min = parseInt(plusMatch[1], 10);
    return { min, max: null, median: Math.round(min * 1.5) };
  }

  // Pattern: "~$40/day" or "~$40 per day"
  const tildeMatch = clean.match(/~\$(\d+)/);
  if (tildeMatch) {
    const val = parseInt(tildeMatch[1], 10);
    const variance = Math.round(val * 0.125);
    return { min: val - variance, max: val + variance, median: val };
  }

  // Pattern: "$30-50" or "$30-50 per day" or "$15-25/day"
  const rangeMatch = clean.match(/\$(\d+)\s*[-–]\s*(\d+)/);
  if (rangeMatch) {
    const min = parseInt(rangeMatch[1], 10);
    const max = parseInt(rangeMatch[2], 10);
    return { min, max, median: Math.round((min + max) / 2) };
  }

  // Pattern: single number "$40"
  const singleMatch = clean.match(/\$(\d+)/);
  if (singleMatch) {
    const val = parseInt(singleMatch[1], 10);
    return { min: val, max: val, median: val };
  }

  return null;
}

/**
 * Extract budget data from a city JSON object.
 * Tries multiple data formats found across the 33 city files:
 *   1. budget_info.budget_per_day.en (bilingual string - more city-specific)
 *   2. budget_info.budget (plain string - more city-specific)
 *   3. budgetGuide.budget.{min, max} (structured numeric - often generic $20-40)
 */
function extractBudget(city) {
  const result = {
    budget: null,
    midrange: null,
    luxury: null,
  };

  const bg = city.budgetGuide;
  const bi = city.budget_info;

  // --- Budget tier ---
  // Prefer budget_info strings (more city-specific) over budgetGuide numerics (often generic)
  if (bi && bi.budget_per_day && bi.budget_per_day.en) {
    result.budget = parseBudgetString(bi.budget_per_day.en);
  } else if (bi && typeof bi.budget === 'string') {
    result.budget = parseBudgetString(bi.budget);
  } else if (bg && bg.budget && typeof bg.budget.min === 'number') {
    const min = bg.budget.min;
    const max = bg.budget.max;
    result.budget = { min, max, median: Math.round((min + max) / 2) };
  }

  // --- Midrange tier ---
  if (bi && bi.midrange_per_day && bi.midrange_per_day.en) {
    result.midrange = parseBudgetString(bi.midrange_per_day.en);
  } else if (bi && typeof bi.mid_range === 'string') {
    result.midrange = parseBudgetString(bi.mid_range);
  } else if (bg && bg.midrange && typeof bg.midrange.min === 'number') {
    const min = bg.midrange.min;
    const max = bg.midrange.max;
    result.midrange = { min, max, median: Math.round((min + max) / 2) };
  }

  // --- Luxury tier ---
  if (bi && bi.luxury_per_day && bi.luxury_per_day.en) {
    result.luxury = parseBudgetString(bi.luxury_per_day.en);
  } else if (bi && typeof bi.luxury === 'string') {
    result.luxury = parseBudgetString(bi.luxury);
  } else if (bg && bg.luxury && typeof bg.luxury.min === 'number') {
    const min = bg.luxury.min;
    const max = bg.luxury.max;
    result.luxury = { min, max, median: Math.round((min + max) / 2) };
  }

  return result;
}

// ---------------------------------------------------------------------------
// Weather Scoring
// ---------------------------------------------------------------------------

const MONTHS = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december',
];

/**
 * Temperature comfort score (0-1).
 * Ideal range: 24-30C high, 18-24C low.
 * Penalise extremes progressively.
 */
function tempComfort(tempHigh, tempLow) {
  // High temperature scoring: ideal is 27, drops off outside 24-32
  const highIdeal = 27;
  const highDev = Math.abs(tempHigh - highIdeal);
  const highScore = Math.max(0, 1 - (highDev / 12));

  // Low temperature scoring: ideal is 22, drops off outside 18-25
  const lowIdeal = 22;
  const lowDev = Math.abs(tempLow - lowIdeal);
  const lowScore = Math.max(0, 1 - (lowDev / 10));

  return (highScore * 0.6 + lowScore * 0.4);
}

/**
 * Rainfall inverse score (0-1).
 * 0mm = 1.0, 400mm+ = 0.0
 */
function rainfallInverse(rainfallMm) {
  return Math.max(0, 1 - (rainfallMm / 400));
}

/**
 * Humidity inverse score (0-1).
 * 50% = 1.0, 95%+ = 0.0
 */
function humidityInverse(humidity) {
  return Math.max(0, 1 - Math.max(0, humidity - 50) / 45);
}

/**
 * Rainfall days inverse score (0-1).
 * 0 days = 1.0, 25+ days = 0.0
 */
function rainfallDaysInverse(rainfallDays) {
  return Math.max(0, 1 - (rainfallDays / 25));
}

/**
 * Compute monthly comfort scores for a city's weather data.
 * Returns { monthly: { january: score, ... }, annual_avg: score }
 */
function computeWeatherScores(weatherData) {
  const monthly = {};
  let total = 0;

  // Handle two data formats:
  // Format A: { monthly_weather: { january: { temp_high, temp_low, rainfall_mm, rainfall_days, humidity } } }
  // Format B: { january: { temperature: { high, low }, rainfall, rainyDays, humidity } }
  const monthlySource = weatherData.monthly_weather || weatherData;

  for (const month of MONTHS) {
    const raw = monthlySource[month];
    if (!raw) {
      monthly[month] = null;
      continue;
    }

    // Normalise field names across the two formats
    const tempHigh = raw.temp_high ?? raw.temperature?.high ?? null;
    const tempLow = raw.temp_low ?? raw.temperature?.low ?? null;
    const rainfallMm = raw.rainfall_mm ?? raw.rainfall ?? null;
    const humidity = raw.humidity ?? null;
    const rainfallDays = raw.rainfall_days ?? raw.rainyDays ?? null;

    if (tempHigh === null || tempLow === null) {
      monthly[month] = null;
      continue;
    }

    const tc = tempComfort(tempHigh, tempLow);
    const ri = rainfallInverse(rainfallMm || 0);
    const hi = humidityInverse(humidity || 70);
    const rdi = rainfallDaysInverse(rainfallDays || 0);

    const score = parseFloat(
      (tc * 0.30 + ri * 0.35 + hi * 0.20 + rdi * 0.15).toFixed(3)
    );

    monthly[month] = score;
    total += score;
  }

  const validMonths = Object.values(monthly).filter(v => v !== null).length;

  return {
    monthly,
    annual_avg: validMonths > 0
      ? parseFloat((total / validMonths).toFixed(3))
      : null,
    best_months: weatherData.best_months || [],
    avoid_months: weatherData.avoid_months || [],
  };
}

// ---------------------------------------------------------------------------
// Transport Scoring
// ---------------------------------------------------------------------------

/**
 * Compute transport hub stats for each city from routes data.
 * Returns Map<slug, { connections, popular_routes, unique_destinations, hubness_raw }>
 */
function computeTransportStats(routes) {
  const stats = new Map();

  for (const route of routes) {
    const from = route.from;
    const to = route.to;
    const popular = route.popular === true;

    for (const slug of [from, to]) {
      if (!stats.has(slug)) {
        stats.set(slug, {
          connections: 0,
          popular_routes: 0,
          unique_destinations: new Set(),
        });
      }
    }

    const fromStats = stats.get(from);
    fromStats.connections++;
    if (popular) fromStats.popular_routes++;
    fromStats.unique_destinations.add(to);

    const toStats = stats.get(to);
    toStats.connections++;
    if (popular) toStats.popular_routes++;
    toStats.unique_destinations.add(from);
  }

  // Compute raw hubness scores
  let maxRaw = 0;
  const rawScores = new Map();

  for (const [slug, s] of stats) {
    const uniqueDest = s.unique_destinations.size;
    const raw = s.connections * 0.3 + s.popular_routes * 0.4 + uniqueDest * 0.3;
    rawScores.set(slug, {
      connections: s.connections,
      popular_routes: s.popular_routes,
      unique_destinations: uniqueDest,
      hubness_raw: raw,
    });
    if (raw > maxRaw) maxRaw = raw;
  }

  // Normalize to 0-1
  const result = new Map();
  for (const [slug, data] of rawScores) {
    result.set(slug, {
      ...data,
      hubness: maxRaw > 0
        ? parseFloat((data.hubness_raw / maxRaw).toFixed(3))
        : 0,
    });
  }

  return result;
}

// ---------------------------------------------------------------------------
// Region Mapping
// ---------------------------------------------------------------------------

/**
 * Build a Map<slug, { region_slug, region_name }> from regions data.
 * Region cities are stored as names (e.g., "Chiang Mai"), we convert to slugs.
 */
function buildRegionMap(regions) {
  const map = new Map();

  for (const region of regions) {
    for (const cityName of region.cities) {
      const slug = nameToSlug(cityName);
      map.set(slug, {
        region_slug: region.slug,
        region_name: region.name,
      });
    }
  }

  return map;
}

// ---------------------------------------------------------------------------
// Rankings
// ---------------------------------------------------------------------------

/**
 * Generate parameterised rankings from processed city data.
 * Each ranking is an ordered array of { slug, name, value }.
 */
function generateRankings(cities) {
  const rankings = {};

  // Filter to cities with budget data
  const withBudget = cities.filter(c => c.budget && c.budget.budget && c.budget.budget.median != null);

  // Cheapest (lowest budget median)
  rankings.cheapest = [...withBudget]
    .sort((a, b) => a.budget.budget.median - b.budget.budget.median)
    .map(c => ({
      slug: c.slug,
      name: c.name,
      value: c.budget.budget.median,
      unit: 'USD/day',
    }));

  // Most expensive (highest budget median)
  rankings.most_expensive = [...rankings.cheapest].reverse();

  // Best weather overall (highest annual avg comfort score)
  const withWeather = cities.filter(c => c.weather && c.weather.annual_avg != null);
  rankings.best_weather_overall = [...withWeather]
    .sort((a, b) => b.weather.annual_avg - a.weather.annual_avg)
    .map(c => ({
      slug: c.slug,
      name: c.name,
      value: c.weather.annual_avg,
      unit: 'comfort_score',
    }));

  // Most connected (highest hubness)
  const withTransport = cities.filter(c => c.transport && c.transport.hubness != null);
  rankings.most_connected = [...withTransport]
    .sort((a, b) => b.transport.hubness - a.transport.hubness)
    .map(c => ({
      slug: c.slug,
      name: c.name,
      value: c.transport.hubness,
      unit: 'hubness_score',
    }));

  // Overall score: composite of budget value, weather, and connectivity
  // Normalise each dimension 0-1 and weight: budget_value 0.3, weather 0.35, transport 0.35
  const allCities = cities.filter(
    c => c.budget?.budget?.median != null
  );

  // Get ranges for normalisation
  const budgetMedians = allCities.map(c => c.budget.budget.median).filter(Boolean);
  const budgetMin = Math.min(...budgetMedians);
  const budgetMax = Math.max(...budgetMedians);
  const budgetRange = budgetMax - budgetMin || 1;

  rankings.overall = allCities
    .map(c => {
      // Budget value: cheaper = better, normalise inverted
      const budgetScore = 1 - ((c.budget.budget.median - budgetMin) / budgetRange);

      // Weather: use annual_avg if available, else 0.5 (neutral)
      const weatherScore = c.weather?.annual_avg ?? 0.5;

      // Transport: hubness if available, else 0.1 (low)
      const transportScore = c.transport?.hubness ?? 0.1;

      const overall = parseFloat(
        (budgetScore * 0.3 + weatherScore * 0.35 + transportScore * 0.35).toFixed(3)
      );

      return {
        slug: c.slug,
        name: c.name,
        value: overall,
        unit: 'overall_score',
        breakdown: {
          budget_value: parseFloat(budgetScore.toFixed(3)),
          weather: parseFloat(weatherScore.toFixed(3)),
          transport: parseFloat(transportScore.toFixed(3)),
        },
      };
    })
    .sort((a, b) => b.value - a.value);

  return rankings;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  console.log('=== Generating thailand-index.json ===\n');

  // 1. Load source data
  const weatherData = JSON.parse(fs.readFileSync(WEATHER_FILE, 'utf-8'));
  const transportData = JSON.parse(fs.readFileSync(TRANSPORT_FILE, 'utf-8'));
  const regionsData = JSON.parse(fs.readFileSync(REGIONS_FILE, 'utf-8'));

  // 2. Build lookup maps
  const regionMap = buildRegionMap(regionsData);
  const transportStats = computeTransportStats(transportData.routes);

  // 3. Process each city
  const cityFiles = fs.readdirSync(ENHANCED_DIR)
    .filter(f => f.endsWith('.json'))
    .sort();

  console.log(`Processing ${cityFiles.length} cities...\n`);

  const sourceHashes = {
    weather: fileHash(WEATHER_FILE),
    transport: fileHash(TRANSPORT_FILE),
    regions: fileHash(REGIONS_FILE),
  };

  const cities = [];

  for (const file of cityFiles) {
    const filePath = path.join(ENHANCED_DIR, file);
    const city = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const slug = city.slug || file.replace('.json', '');

    // Budget
    const budget = extractBudget(city);

    // Weather
    const weather = weatherData[slug]
      ? computeWeatherScores(weatherData[slug])
      : null;

    // Transport
    const transport = transportStats.get(slug) || null;
    // Remove hubness_raw from output (internal only)
    if (transport) {
      delete transport.hubness_raw;
    }

    // Region
    const region = regionMap.get(slug) || null;

    // Track source hash
    sourceHashes[`city:${slug}`] = fileHash(filePath);

    const entry = {
      slug,
      name: city.name || { en: slug, nl: slug },
      region: region
        ? { slug: region.region_slug, name: region.region_name }
        : null,
      location: city.location || null,
      population: city.population || null,
      budget,
      weather,
      transport,
    };

    cities.push(entry);

    // Log processing
    const budgetStr = budget.budget
      ? `$${budget.budget.min}-${budget.budget.max ?? '?'}/day (median: $${budget.budget.median})`
      : 'no budget data';
    const weatherStr = weather
      ? `annual avg: ${weather.annual_avg}`
      : 'no weather data';
    const transportStr = transport
      ? `hubness: ${transport.hubness}`
      : 'no transport data';
    const regionStr = region ? region.region_slug : 'unmapped';

    console.log(`  ${slug}: ${budgetStr} | ${weatherStr} | ${transportStr} | region: ${regionStr}`);
  }

  // 4. Generate rankings
  console.log('\nGenerating rankings...');
  const rankings = generateRankings(cities);

  // Log top entries
  console.log(`  Cheapest:        ${rankings.cheapest.slice(0, 3).map(c => `${c.name.en} ($${c.value})`).join(', ')}`);
  console.log(`  Most expensive:  ${rankings.most_expensive.slice(0, 3).map(c => `${c.name.en} ($${c.value})`).join(', ')}`);
  if (rankings.best_weather_overall.length > 0) {
    console.log(`  Best weather:    ${rankings.best_weather_overall.slice(0, 3).map(c => `${c.name.en} (${c.value})`).join(', ')}`);
  }
  console.log(`  Most connected:  ${rankings.most_connected.slice(0, 3).map(c => `${c.name.en} (${c.value})`).join(', ')}`);
  console.log(`  Overall best:    ${rankings.overall.slice(0, 3).map(c => `${c.name.en} (${c.value})`).join(', ')}`);

  // 5. Build output
  const output = {
    metadata: {
      generated_at: new Date().toISOString(),
      city_count: cities.length,
      data_version: '1.0.0',
      source_hashes: sourceHashes,
      weather_coverage: Object.keys(weatherData).length,
      transport_routes_count: transportData.routes.length,
      regions_count: regionsData.length,
    },
    cities,
    rankings,
    regions: regionsData.map(r => ({
      slug: r.slug,
      name: r.name,
      city_slugs: r.cities.map(nameToSlug),
    })),
  };

  // 6. Write output
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2), 'utf-8');

  const fileSize = (fs.statSync(OUTPUT_FILE).size / 1024).toFixed(1);
  console.log(`\nOutput written to: ${OUTPUT_FILE}`);
  console.log(`File size: ${fileSize} KB`);
  console.log(`Cities: ${cities.length}`);
  console.log(`Rankings: ${Object.keys(rankings).length} categories`);
  console.log('\nDone!');
}

main();
