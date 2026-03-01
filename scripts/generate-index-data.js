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

/** Map full month name to 3-letter abbreviation */
const MONTH_ABBREV = {
  january: 'Jan', february: 'Feb', march: 'Mar', april: 'Apr',
  may: 'May', june: 'Jun', july: 'Jul', august: 'Aug',
  september: 'Sep', october: 'Oct', november: 'Nov', december: 'Dec',
};

/** Map full month name (capitalised) to abbreviation */
function monthNameToAbbrev(name) {
  return MONTH_ABBREV[name.toLowerCase()] || name.slice(0, 3);
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
 * Returns the new spec format with raw strings, currency, and renamed tiers.
 *
 * Tries multiple data formats found across the 33 city files:
 *   1. budget_info.budget_per_day.en (bilingual string - more city-specific)
 *   2. budget_info.budget (plain string - more city-specific)
 *   3. budgetGuide.budget.{min, max} (structured numeric - often generic $20-40)
 */
function extractBudget(city) {
  const bg = city.budgetGuide;
  const bi = city.budget_info;

  // Collect raw strings and parsed tiers
  const raw = { budget: null, mid: null, luxury: null };
  let tierBudget = null;
  let tierMid = null;
  let tierLuxury = null;

  // --- Budget tier ---
  if (bi && bi.budget_per_day && bi.budget_per_day.en) {
    raw.budget = bi.budget_per_day.en;
    tierBudget = parseBudgetString(bi.budget_per_day.en);
  } else if (bi && typeof bi.budget === 'string') {
    raw.budget = bi.budget;
    tierBudget = parseBudgetString(bi.budget);
  } else if (bg && bg.budget && typeof bg.budget.min === 'number') {
    const min = bg.budget.min;
    const max = bg.budget.max;
    raw.budget = `$${min}-${max} per day`;
    tierBudget = { min, max, median: Math.round((min + max) / 2) };
  }

  // --- Midrange tier ---
  if (bi && bi.midrange_per_day && bi.midrange_per_day.en) {
    raw.mid = bi.midrange_per_day.en;
    tierMid = parseBudgetString(bi.midrange_per_day.en);
  } else if (bi && typeof bi.mid_range === 'string') {
    raw.mid = bi.mid_range;
    tierMid = parseBudgetString(bi.mid_range);
  } else if (bg && bg.midrange && typeof bg.midrange.min === 'number') {
    const min = bg.midrange.min;
    const max = bg.midrange.max;
    raw.mid = `$${min}-${max} per day`;
    tierMid = { min, max, median: Math.round((min + max) / 2) };
  }

  // --- Luxury tier ---
  if (bi && bi.luxury_per_day && bi.luxury_per_day.en) {
    raw.luxury = bi.luxury_per_day.en;
    tierLuxury = parseBudgetString(bi.luxury_per_day.en);
  } else if (bi && typeof bi.luxury === 'string') {
    raw.luxury = bi.luxury;
    tierLuxury = parseBudgetString(bi.luxury);
  } else if (bg && bg.luxury && typeof bg.luxury.min === 'number') {
    const min = bg.luxury.min;
    const max = bg.luxury.max;
    raw.luxury = `$${min}-${max}+ per day`;
    tierLuxury = { min, max, median: Math.round((min + max) / 2) };
  }

  return {
    raw,
    currency: 'USD',
    tier_budget: tierBudget,
    tier_mid: tierMid,
    tier_luxury: tierLuxury,
  };
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
 * Compute weather scores for a city's weather data.
 * Returns spec-compliant structure with month_scores, comfort_score,
 * avg_temp_c, rainfall_score, humidity_score, best_months, raw_best_time_text.
 */
function computeWeatherScores(weatherData) {
  const monthScores = {};
  let totalComfort = 0;
  let totalRainfall = 0;
  let totalHumidity = 0;
  let totalTemp = 0;
  let validCount = 0;

  // Handle two data formats:
  // Format A: { monthly_weather: { january: { temp_high, temp_low, rainfall_mm, rainfall_days, humidity } } }
  // Format B: { january: { temperature: { high, low }, rainfall, rainyDays, humidity } }
  const monthlySource = weatherData.monthly_weather || weatherData;

  for (const month of MONTHS) {
    const raw = monthlySource[month];
    const abbrev = MONTH_ABBREV[month];
    if (!raw) {
      monthScores[abbrev] = null;
      continue;
    }

    // Normalise field names across the two formats
    const tempHigh = raw.temp_high ?? raw.temperature?.high ?? null;
    const tempLow = raw.temp_low ?? raw.temperature?.low ?? null;
    const rainfallMm = raw.rainfall_mm ?? raw.rainfall ?? null;
    const humidity = raw.humidity ?? null;
    const rainfallDays = raw.rainfall_days ?? raw.rainyDays ?? null;

    if (tempHigh === null || tempLow === null) {
      monthScores[abbrev] = null;
      continue;
    }

    const tc = tempComfort(tempHigh, tempLow);
    const ri = rainfallInverse(rainfallMm || 0);
    const hi = humidityInverse(humidity || 70);
    const rdi = rainfallDaysInverse(rainfallDays || 0);

    const score = parseFloat(
      (tc * 0.30 + ri * 0.35 + hi * 0.20 + rdi * 0.15).toFixed(3)
    );

    monthScores[abbrev] = score;
    totalComfort += score;
    totalRainfall += ri;
    totalHumidity += hi;
    totalTemp += (tempHigh + tempLow) / 2;
    validCount++;
  }

  const comfortScore = validCount > 0
    ? parseFloat((totalComfort / validCount).toFixed(3))
    : null;

  const rainfallScore = validCount > 0
    ? parseFloat((totalRainfall / validCount).toFixed(3))
    : null;

  const humidityScore = validCount > 0
    ? parseFloat((totalHumidity / validCount).toFixed(3))
    : null;

  const avgTempC = validCount > 0
    ? parseFloat((totalTemp / validCount).toFixed(1))
    : null;

  // best_months from source data (full names like "November") -> abbreviations
  const bestMonthsFull = weatherData.best_months || [];
  let bestMonths = bestMonthsFull.map(monthNameToAbbrev);
  const rawBestTimeText = bestMonthsFull.join(', ');

  // Fallback: compute best_months from weather scores if source data is empty
  if (bestMonths.length === 0) {
    bestMonths = Object.entries(monthScores)
      .filter(([, score]) => score !== null && score >= 0.75)
      .sort((a, b) => b[1] - a[1])
      .map(([month]) => month);
  }

  return {
    raw_best_time_text: rawBestTimeText,
    best_months: bestMonths,
    month_scores: monthScores,
    avg_temp_c: avgTempC,
    rainfall_score: rainfallScore,
    humidity_score: humidityScore,
    comfort_score: comfortScore,
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

/**
 * Build a Map<slug, route[]> of popular routes per city (up to 5).
 * Each route entry: { to, duration, modes }
 * Deduplicates by destination slug per city.
 */
function buildTopRoutes(routes) {
  // cityRoutes: Map<slug, Map<destSlug, routeEntry>>
  const cityRoutes = new Map();

  function addRoute(citySlug, destSlug, duration, modes) {
    if (!cityRoutes.has(citySlug)) cityRoutes.set(citySlug, new Map());
    const destMap = cityRoutes.get(citySlug);
    if (!destMap.has(destSlug)) {
      destMap.set(destSlug, { to: destSlug, duration, modes });
    }
  }

  for (const route of routes) {
    if (!route.popular) continue;

    const from = route.from;
    const to = route.to;
    const modes = Object.keys(route.duration || {});
    // Pick first available duration string
    const duration = modes.length > 0 ? route.duration[modes[0]] : null;

    // Add route from both directions
    addRoute(from, to, duration, modes);
    addRoute(to, from, duration, modes);
  }

  // Convert to arrays, limit to 5 per city
  const result = new Map();
  for (const [slug, destMap] of cityRoutes) {
    result.set(slug, [...destMap.values()].slice(0, 5));
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
 * Each ranking is wrapped with metric metadata and items include rank.
 */
function generateRankings(cities) {
  const rankings = {};

  // Filter to cities with budget data
  const withBudget = cities.filter(c => c.budget && c.budget.tier_budget && c.budget.tier_budget.median != null);

  // Cheapest (lowest budget median)
  const cheapestItems = [...withBudget]
    .sort((a, b) => a.budget.tier_budget.median - b.budget.tier_budget.median)
    .map((c, i) => ({
      slug: c.slug,
      name: c.name,
      value: c.budget.tier_budget.median,
      rank: i + 1,
    }));

  rankings.cheapest = {
    metric: 'budget.tier_budget.median',
    order: 'asc',
    items: cheapestItems,
  };

  // Most expensive (highest budget median)
  const expensiveItems = [...cheapestItems].reverse().map((c, i) => ({
    ...c,
    rank: i + 1,
  }));

  rankings.most_expensive = {
    metric: 'budget.tier_budget.median',
    order: 'desc',
    items: expensiveItems,
  };

  // Best weather overall (highest comfort score)
  const withWeather = cities.filter(c => c.weather && c.weather.comfort_score != null);
  rankings.best_weather_overall = {
    metric: 'weather.comfort_score',
    order: 'desc',
    items: [...withWeather]
      .sort((a, b) => b.weather.comfort_score - a.weather.comfort_score)
      .map((c, i) => ({
        slug: c.slug,
        name: c.name,
        value: c.weather.comfort_score,
        rank: i + 1,
      })),
  };

  // Most connected (highest hubness)
  const withTransport = cities.filter(c => c.transport && c.transport.hubness != null);
  rankings.most_connected = {
    metric: 'transport.hubness',
    order: 'desc',
    items: [...withTransport]
      .sort((a, b) => b.transport.hubness - a.transport.hubness)
      .map((c, i) => ({
        slug: c.slug,
        name: c.name,
        value: c.transport.hubness,
        rank: i + 1,
      })),
  };

  // Overall score: derived from per-city scores.overall_score (single source of truth)
  const withOverall = cities.filter(c => c.scores?.overall_score != null);

  rankings.overall = {
    metric: 'scores.overall_score',
    order: 'desc',
    items: [...withOverall]
      .sort((a, b) => b.scores.overall_score - a.scores.overall_score)
      .map((c, i) => ({
        slug: c.slug,
        name: c.name,
        value: c.scores.overall_score,
        rank: i + 1,
      })),
  };

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
  const topRoutesMap = buildTopRoutes(transportData.routes);

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

    const image = city.image || null;

    // Extract budget tiers (budget/mid/luxury) with raw strings and parsed values
    const budget = extractBudget(city);

    // Compute monthly weather scores, comfort score, and best months
    const weather = weatherData[slug]
      ? computeWeatherScores(weatherData[slug])
      : null;

    // Transport connectivity and top routes
    const transportRaw = transportStats.get(slug) || null;
    let transport = null;
    if (transportRaw) {
      transport = {
        connections: transportRaw.connections,
        unique_destinations: transportRaw.unique_destinations,
        popular_routes: transportRaw.popular_routes,
        hubness: transportRaw.hubness,
        top_routes: topRoutesMap.get(slug) || [],
      };
    }

    // Region
    const region = regionMap.get(slug) || null;

    // Composite scores: budget (absolute), weather, transport
    const budgetMedian = budget.tier_budget?.median ?? null;
    const budgetScore = budgetMedian != null
      ? Math.round(Math.max(0, 1 - budgetMedian / 80) * 100) / 100
      : null;
    const weatherScore = weather?.comfort_score ?? null;
    const transportScore = transport?.hubness ?? null;

    let overallScore = null;
    if (budgetScore != null && weatherScore != null && transportScore != null) {
      overallScore = parseFloat(
        (budgetScore * 0.35 + weatherScore * 0.35 + transportScore * 0.3).toFixed(2)
      );
    } else if (budgetScore != null) {
      // Partial: use available scores with defaults
      const ws = weatherScore ?? 0.5;
      const ts = transportScore ?? 0.1;
      overallScore = parseFloat(
        (budgetScore * 0.35 + ws * 0.35 + ts * 0.3).toFixed(2)
      );
    }

    const scores = {
      budget_score: budgetScore,
      weather_score: weatherScore,
      transport_score: transportScore,
      overall_score: overallScore,
    };

    // Score breakdown for transparency
    const bestMonthCount = weather?.best_months?.length ?? 0;
    const scoreComponents = {
      budget: {
        tier_budget_median_usd: budgetMedian,
        normalized: budgetScore,
      },
      weather: {
        comfort_score: weatherScore,
        best_month_count: bestMonthCount,
      },
      transport: {
        hubness: transportScore,
        popular_count: transport?.popular_routes ?? 0,
      },
    };

    // Track source hash
    sourceHashes[`city:${slug}`] = fileHash(filePath);

    const entry = {
      slug,
      name: city.name || { en: slug, nl: slug },
      image,
      region: region
        ? { slug: region.region_slug, name: region.region_name }
        : null,
      location: city.location || null,
      population: city.population || null,
      scores,
      score_components: scoreComponents,
      budget,
      weather,
      transport,
    };

    cities.push(entry);

    // Log processing
    const budgetStr = budget.tier_budget
      ? `$${budget.tier_budget.min}-${budget.tier_budget.max ?? '?'}/day (median: $${budget.tier_budget.median})`
      : 'no budget data';
    const weatherStr = weather
      ? `comfort: ${weather.comfort_score}`
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
  console.log(`  Cheapest:        ${rankings.cheapest.items.slice(0, 3).map(c => `${c.name.en} ($${c.value})`).join(', ')}`);
  console.log(`  Most expensive:  ${rankings.most_expensive.items.slice(0, 3).map(c => `${c.name.en} ($${c.value})`).join(', ')}`);
  if (rankings.best_weather_overall.items.length > 0) {
    console.log(`  Best weather:    ${rankings.best_weather_overall.items.slice(0, 3).map(c => `${c.name.en} (${c.value})`).join(', ')}`);
  }
  console.log(`  Most connected:  ${rankings.most_connected.items.slice(0, 3).map(c => `${c.name.en} (${c.value})`).join(', ')}`);
  console.log(`  Overall best:    ${rankings.overall.items.slice(0, 3).map(c => `${c.name.en} (${c.value})`).join(', ')}`);

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
