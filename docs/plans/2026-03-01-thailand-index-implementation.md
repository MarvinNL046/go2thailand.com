# Thailand Travel & Cost Index 2026 — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a Thailand Travel & Cost Index as a hub page with budget and best-time subpages, powered by an aggregation script that combines 33 city datasets.

**Architecture:** Aggregation script reads enhanced city JSONs + weather + transport + regions data, outputs `data/thailand-index.json`. Next.js pages consume this file via `getStaticProps`. Interactive tables use React state for sort/filter. Sticky TOC tracks scroll position via IntersectionObserver.

**Tech Stack:** Next.js 14 Pages Router, TypeScript, Tailwind CSS, Node.js scripts

---

### Task 1: Data Aggregation Script

**Files:**
- Create: `scripts/generate-index-data.js`
- Modify: `package.json` (add `data:index` script)

**Context:**
- City data lives in `data/enhanced/*.json` (33 files)
- Budget is in `budget_info.budget_per_day.en` format like `"$15-25"` or `"$30-50 per day"`
- Weather is in `data/city-weather.json` with monthly `temp_high`, `temp_low`, `rainfall_mm`, `humidity`, `rainfall_days`
- Transport is in `data/transport-routes.json` with `from`, `to`, `popular` fields
- Regions are in `data/regions/index.json` with `slug`, `cities` array (city NAMES not slugs)

**Step 1: Create the aggregation script**

```javascript
// scripts/generate-index-data.js
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ENHANCED_DIR = path.join(__dirname, '..', 'data', 'enhanced');
const WEATHER_FILE = path.join(__dirname, '..', 'data', 'city-weather.json');
const TRANSPORT_FILE = path.join(__dirname, '..', 'data', 'transport-routes.json');
const REGIONS_FILE = path.join(__dirname, '..', 'data', 'regions', 'index.json');
const OUTPUT_FILE = path.join(__dirname, '..', 'data', 'thailand-index.json');

// --- Budget Parsing ---

function parseBudgetString(str) {
  if (!str) return null;
  // Remove "per day", "/day", whitespace variants
  const cleaned = str.replace(/per\s*day/i, '').replace(/\/day/i, '').trim();

  // Handle "$100+" or "$100+ per day"
  const plusMatch = cleaned.match(/[\$€£]?\s*(\d+)\s*\+/);
  if (plusMatch) {
    const min = parseInt(plusMatch[1]);
    return { min, max: null, median: Math.round(min * 1.5) };
  }

  // Handle "$30-50", "$30–50" (en-dash), "30-50", "30 to 50"
  const rangeMatch = cleaned.match(/[\$€£]?\s*(\d+)\s*[-–to]+\s*[\$€£]?\s*(\d+)/);
  if (rangeMatch) {
    const min = parseInt(rangeMatch[1]);
    const max = parseInt(rangeMatch[2]);
    return { min, max, median: Math.round((min + max) / 2) };
  }

  // Handle "~$40" or "$40"
  const singleMatch = cleaned.match(/[\$€£~]?\s*(\d+)/);
  if (singleMatch) {
    const val = parseInt(singleMatch[1]);
    return { min: Math.round(val * 0.85), max: Math.round(val * 1.15), median: val };
  }

  // Handle THB: "฿1000-1500" → convert to USD (1 USD ≈ 35 THB)
  const thbMatch = cleaned.match(/[฿]?\s*(\d+)\s*[-–]\s*(\d+)/);
  if (thbMatch) {
    const min = Math.round(parseInt(thbMatch[1]) / 35);
    const max = Math.round(parseInt(thbMatch[2]) / 35);
    return { min, max, median: Math.round((min + max) / 2) };
  }

  return null;
}

function extractBudget(city) {
  const info = city.budget_info || {};
  const budgetRaw = info.budget_per_day?.en || info.budget || info.daily_budget?.budget || '';
  const midRaw = info.midrange_per_day?.en || info.mid_range || info.daily_budget?.mid || '';
  const luxuryRaw = info.luxury_per_day?.en || info.luxury || info.daily_budget?.luxury || '';

  return {
    raw: { budget: budgetRaw, mid: midRaw, luxury: luxuryRaw },
    currency: 'USD',
    tier_budget: parseBudgetString(budgetRaw),
    tier_mid: parseBudgetString(midRaw),
    tier_luxury: parseBudgetString(luxuryRaw),
  };
}

// --- Weather Scoring ---

function tempComfort(high, low) {
  // Ideal: high 25-30, low 20-25. Penalize extremes.
  const highScore = high <= 30 ? 1.0 : high <= 33 ? 0.8 : high <= 36 ? 0.5 : 0.3;
  const lowScore = low >= 20 ? 1.0 : low >= 15 ? 0.7 : low >= 10 ? 0.4 : 0.2;
  return (highScore + lowScore) / 2;
}

function rainfallScore(mm) {
  if (mm <= 20) return 1.0;
  if (mm <= 50) return 0.85;
  if (mm <= 100) return 0.65;
  if (mm <= 200) return 0.4;
  if (mm <= 300) return 0.2;
  return 0.1;
}

function humidityScore(pct) {
  if (pct <= 60) return 1.0;
  if (pct <= 70) return 0.85;
  if (pct <= 80) return 0.6;
  return 0.4;
}

function rainfallDaysScore(days) {
  if (days <= 3) return 1.0;
  if (days <= 8) return 0.75;
  if (days <= 15) return 0.5;
  if (days <= 22) return 0.3;
  return 0.15;
}

function computeMonthScore(monthData) {
  if (!monthData) return 0;
  const tc = tempComfort(monthData.temp_high || 32, monthData.temp_low || 24);
  const rs = rainfallScore(monthData.rainfall_mm || 100);
  const hs = humidityScore(monthData.humidity || 75);
  const rds = rainfallDaysScore(monthData.rainfall_days || 10);
  // Weighted average
  return Math.round((tc * 0.3 + rs * 0.35 + hs * 0.2 + rds * 0.15) * 100) / 100;
}

const MONTH_KEYS = ['january','february','march','april','may','june','july','august','september','october','november','december'];
const MONTH_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function extractWeather(citySlug, weatherData) {
  const cityWeather = weatherData[citySlug];
  if (!cityWeather) return null;

  const monthScores = {};
  let totalTemp = 0;
  let totalRainfall = 0;
  let totalHumidity = 0;
  let monthCount = 0;

  MONTH_KEYS.forEach((month, i) => {
    const m = cityWeather.monthly_weather?.[month];
    if (m) {
      monthScores[MONTH_SHORT[i]] = computeMonthScore(m);
      totalTemp += (m.temp_high + m.temp_low) / 2;
      totalRainfall += m.rainfall_mm || 0;
      totalHumidity += m.humidity || 75;
      monthCount++;
    }
  });

  // Find best months (score > 0.75)
  const bestMonths = Object.entries(monthScores)
    .filter(([, score]) => score >= 0.75)
    .sort((a, b) => b[1] - a[1])
    .map(([month]) => month);

  const avgComfort = monthCount > 0
    ? Math.round(Object.values(monthScores).reduce((a, b) => a + b, 0) / monthCount * 100) / 100
    : 0;

  return {
    raw_best_time_text: cityWeather.best_months?.join(', ') || '',
    best_months: bestMonths,
    month_scores: monthScores,
    avg_temp_c: monthCount > 0 ? Math.round(totalTemp / monthCount * 10) / 10 : null,
    rainfall_score: monthCount > 0 ? Math.round((1 - totalRainfall / (monthCount * 400)) * 100) / 100 : null,
    humidity_score: monthCount > 0 ? Math.round((1 - (totalHumidity / monthCount - 50) / 50) * 100) / 100 : null,
    comfort_score: avgComfort,
  };
}

// --- Transport Scoring ---

function extractTransport(citySlug, routes) {
  const cityRoutes = routes.filter(r => r.from === citySlug || r.to === citySlug);
  const destinations = new Set(cityRoutes.map(r => r.from === citySlug ? r.to : r.from));
  const popularRoutes = cityRoutes.filter(r => r.popular);

  const topRoutes = popularRoutes.slice(0, 5).map(r => ({
    to: r.from === citySlug ? r.to : r.from,
    duration: r.duration?.bus || r.duration?.train || r.duration?.flight || 'varies',
    modes: Object.keys(r.duration || {}),
  }));

  return {
    connections: cityRoutes.length,
    unique_destinations: destinations.size,
    popular_routes: popularRoutes.length,
    hubness: 0, // normalized later
    top_routes: topRoutes,
  };
}

// --- Region Mapping ---

function buildRegionMap(regionsData, allCitySlugs) {
  // Map region names to travel-oriented groups
  // regions/index.json has city NAMES (e.g., "Chiang Mai"), we need slugs
  const nameToSlug = {};
  allCitySlugs.forEach(slug => {
    nameToSlug[slug.replace(/-/g, ' ').toLowerCase()] = slug;
    // Also handle "koh" variants
    nameToSlug[slug.replace(/koh-/g, 'ko ').replace(/-/g, ' ').toLowerCase()] = slug;
  });

  const regionMap = {};
  for (const region of regionsData) {
    const slugs = (region.cities || [])
      .map(name => {
        const normalized = name.toLowerCase().replace(/ /g, '-');
        return allCitySlugs.includes(normalized) ? normalized : nameToSlug[name.toLowerCase()] || null;
      })
      .filter(Boolean);
    regionMap[region.slug] = slugs;
  }
  return regionMap;
}

// --- Normalization ---

function normalize(values) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  if (max === min) return values.map(() => 0.5);
  return values.map(v => Math.round((v - min) / (max - min) * 100) / 100);
}

// --- File Hashing ---

function fileHash(filePath) {
  if (!fs.existsSync(filePath)) return null;
  const content = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(content).digest('hex').substring(0, 12);
}

function dirHash(dirPath) {
  if (!fs.existsSync(dirPath)) return null;
  const files = fs.readdirSync(dirPath).sort();
  const hash = crypto.createHash('sha256');
  files.forEach(f => {
    const content = fs.readFileSync(path.join(dirPath, f));
    hash.update(content);
  });
  return hash.digest('hex').substring(0, 12);
}

// --- Main ---

function main() {
  console.log('Generating Thailand Index data...');

  // Load data sources
  const weatherData = JSON.parse(fs.readFileSync(WEATHER_FILE, 'utf8'));
  const transportData = JSON.parse(fs.readFileSync(TRANSPORT_FILE, 'utf8'));
  const routes = transportData.routes || transportData;
  const regionsData = JSON.parse(fs.readFileSync(REGIONS_FILE, 'utf8'));

  // Load all city files
  const cityFiles = fs.readdirSync(ENHANCED_DIR).filter(f => f.endsWith('.json'));
  const allSlugs = cityFiles.map(f => f.replace('.json', ''));

  console.log(`Found ${cityFiles.length} cities`);

  // Process each city
  const cities = cityFiles.map(file => {
    const city = JSON.parse(fs.readFileSync(path.join(ENHANCED_DIR, file), 'utf8'));
    const slug = file.replace('.json', '');

    return {
      slug,
      name: city.name || { en: slug, nl: slug },
      region: city.region || 'unknown',
      location: city.location || null,
      image: city.image || null,
      budget: extractBudget(city),
      weather: extractWeather(slug, weatherData),
      transport: extractTransport(slug, Array.isArray(routes) ? routes : []),
      // Scores computed after normalization
      scores: {},
      score_components: {},
    };
  });

  // Normalize transport hubness
  const rawHubness = cities.map(c =>
    (c.transport.connections * 0.3) +
    (c.transport.popular_routes * 0.4) +
    (c.transport.unique_destinations * 0.3)
  );
  const normalizedHubness = normalize(rawHubness);
  cities.forEach((c, i) => { c.transport.hubness = normalizedHubness[i]; });

  // Compute scores
  cities.forEach(c => {
    const budgetMedian = c.budget.tier_budget?.median;
    // Lower budget = higher score (inverted)
    const budgetScore = budgetMedian ? Math.round(Math.max(0, 1 - budgetMedian / 80) * 100) / 100 : 0;
    const weatherScore = c.weather?.comfort_score || 0;
    const transportScore = c.transport.hubness;

    c.scores = {
      budget_score: budgetScore,
      weather_score: weatherScore,
      transport_score: transportScore,
      overall_score: Math.round((budgetScore * 0.35 + weatherScore * 0.35 + transportScore * 0.3) * 100) / 100,
    };
    c.score_components = {
      budget: { tier_budget_median_usd: budgetMedian, normalized: budgetScore },
      weather: { comfort_score: weatherScore, best_month_count: c.weather?.best_months?.length || 0 },
      transport: { hubness: transportScore, popular_count: c.transport.popular_routes },
    };
  });

  // Build rankings
  const rankings = {
    cheapest: {
      metric: 'budget.tier_budget.median',
      order: 'asc',
      items: [...cities]
        .filter(c => c.budget.tier_budget?.median)
        .sort((a, b) => a.budget.tier_budget.median - b.budget.tier_budget.median)
        .map((c, i) => ({ slug: c.slug, value: c.budget.tier_budget.median, rank: i + 1 })),
    },
    most_expensive: {
      metric: 'budget.tier_budget.median',
      order: 'desc',
      items: [...cities]
        .filter(c => c.budget.tier_budget?.median)
        .sort((a, b) => b.budget.tier_budget.median - a.budget.tier_budget.median)
        .map((c, i) => ({ slug: c.slug, value: c.budget.tier_budget.median, rank: i + 1 })),
    },
    best_weather_overall: {
      metric: 'weather.comfort_score',
      order: 'desc',
      items: [...cities]
        .filter(c => c.weather?.comfort_score)
        .sort((a, b) => b.weather.comfort_score - a.weather.comfort_score)
        .map((c, i) => ({ slug: c.slug, value: c.weather.comfort_score, rank: i + 1 })),
    },
    most_connected: {
      metric: 'transport.hubness',
      order: 'desc',
      items: [...cities]
        .sort((a, b) => b.transport.hubness - a.transport.hubness)
        .map((c, i) => ({ slug: c.slug, value: c.transport.hubness, rank: i + 1 })),
    },
    overall: {
      metric: 'scores.overall_score',
      order: 'desc',
      items: [...cities]
        .sort((a, b) => b.scores.overall_score - a.scores.overall_score)
        .map((c, i) => ({ slug: c.slug, value: c.scores.overall_score, rank: i + 1 })),
    },
  };

  // Build region groupings
  const regionMap = buildRegionMap(regionsData, allSlugs);

  // Build output
  const output = {
    cities,
    rankings,
    regions: regionMap,
    metadata: {
      generated_at: new Date().toISOString(),
      city_count: cities.length,
      data_version: '1.0.0',
      sources: {
        cities_dir_hash: dirHash(ENHANCED_DIR),
        weather_file_hash: fileHash(WEATHER_FILE),
        transport_file_hash: fileHash(TRANSPORT_FILE),
        regions_dir_hash: dirHash(path.join(__dirname, '..', 'data', 'regions')),
      },
    },
  };

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));
  console.log(`Written ${OUTPUT_FILE}`);
  console.log(`  Cities: ${output.cities.length}`);
  console.log(`  Rankings: ${Object.keys(output.rankings).length}`);
  console.log(`  Regions: ${Object.keys(output.regions).length}`);
  console.log(`  Top 5 cheapest: ${rankings.cheapest.items.slice(0, 5).map(i => `${i.slug} ($${i.value})`).join(', ')}`);
  console.log(`  Top 5 overall: ${rankings.overall.items.slice(0, 5).map(i => `${i.slug} (${i.value})`).join(', ')}`);
}

main();
```

**Step 2: Run and verify output**

Run: `node scripts/generate-index-data.js`
Expected: Creates `data/thailand-index.json` with 33 cities, 5 rankings, region groupings. Check console output for sanity (cheapest should be Pai/Chiang Khan, most connected should be Bangkok).

**Step 3: Add npm script**

In `package.json`, add to scripts:
```json
"data:index": "node scripts/generate-index-data.js"
```

And append `&& npm run data:index` to the existing `data:generate` script.

**Step 4: Commit**

```bash
git add scripts/generate-index-data.js data/thailand-index.json package.json
git commit -m "feat: add Thailand Index data aggregation script"
```

---

### Task 2: Shared TypeScript Types & Data Loader

**Files:**
- Create: `lib/thailand-index.ts`

**Context:** This file provides TypeScript interfaces and a data loader used by all index pages. Pattern follows `lib/cities.js` but for the aggregated index data.

**Step 1: Create the types and loader**

```typescript
// lib/thailand-index.ts
import indexData from '../data/thailand-index.json';

// --- Types ---

export interface BudgetTier {
  min: number;
  max: number | null;
  median: number;
}

export interface CityBudget {
  raw: { budget: string; mid: string; luxury: string };
  currency: string;
  tier_budget: BudgetTier | null;
  tier_mid: BudgetTier | null;
  tier_luxury: BudgetTier | null;
}

export interface CityWeather {
  raw_best_time_text: string;
  best_months: string[];
  month_scores: Record<string, number>;
  avg_temp_c: number | null;
  rainfall_score: number | null;
  humidity_score: number | null;
  comfort_score: number;
}

export interface CityTransport {
  connections: number;
  unique_destinations: number;
  popular_routes: number;
  hubness: number;
  top_routes: Array<{
    to: string;
    duration: string;
    modes: string[];
  }>;
}

export interface CityScores {
  budget_score: number;
  weather_score: number;
  transport_score: number;
  overall_score: number;
}

export interface IndexCity {
  slug: string;
  name: { en: string; nl: string };
  region: string;
  location: { lat: number; lng: number } | null;
  image: string | null;
  budget: CityBudget;
  weather: CityWeather | null;
  transport: CityTransport;
  scores: CityScores;
  score_components: {
    budget: { tier_budget_median_usd: number | null; normalized: number };
    weather: { comfort_score: number; best_month_count: number };
    transport: { hubness: number; popular_count: number };
  };
}

export interface RankingItem {
  slug: string;
  value: number;
  rank: number;
}

export interface Ranking {
  metric: string;
  order: 'asc' | 'desc';
  items: RankingItem[];
}

export interface ThailandIndex {
  cities: IndexCity[];
  rankings: Record<string, Ranking>;
  regions: Record<string, string[]>;
  metadata: {
    generated_at: string;
    city_count: number;
    data_version: string;
    sources: Record<string, string>;
  };
}

// --- Data Access ---

export function getThailandIndex(): ThailandIndex {
  return indexData as unknown as ThailandIndex;
}

export function getCityBySlug(slug: string): IndexCity | undefined {
  return (indexData as unknown as ThailandIndex).cities.find(c => c.slug === slug);
}

export function getRanking(name: string, limit?: number): RankingItem[] {
  const ranking = (indexData as unknown as ThailandIndex).rankings[name];
  if (!ranking) return [];
  return limit ? ranking.items.slice(0, limit) : ranking.items;
}

export function getCitiesByRegion(region: string): IndexCity[] {
  const slugs = (indexData as unknown as ThailandIndex).regions[region] || [];
  const cities = (indexData as unknown as ThailandIndex).cities;
  return slugs.map(s => cities.find(c => c.slug === s)).filter(Boolean) as IndexCity[];
}

export function getCityName(slug: string, locale: string = 'en'): string {
  const city = getCityBySlug(slug);
  if (!city) return slug;
  return (city.name as Record<string, string>)[locale] || city.name.en || slug;
}
```

**Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit lib/thailand-index.ts` (or just check in next build)

**Step 3: Commit**

```bash
git add lib/thailand-index.ts
git commit -m "feat: add Thailand Index TypeScript types and data loader"
```

---

### Task 3: Reusable UI Components

**Files:**
- Create: `components/index/IndexTable.tsx`
- Create: `components/index/TableOfContents.tsx`
- Create: `components/index/ScoreBadge.tsx`
- Create: `components/index/RankingCard.tsx`
- Create: `components/index/RegionFilter.tsx`
- Create: `components/index/MonthMatrix.tsx`

**Context:** All components use Tailwind CSS. Follow existing patterns: functional components, `useRouter` for locale, bilingual `{en, nl}` data. Color scheme uses `thailand.red`, `thailand.blue`, `thailand.gold`, `surface.cream`.

**Step 1: Create ScoreBadge**

```tsx
// components/index/ScoreBadge.tsx
interface ScoreBadgeProps {
  score: number; // 0-1
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export default function ScoreBadge({ score, size = 'md', showLabel = false }: ScoreBadgeProps) {
  const pct = Math.round(score * 100);
  const color = score >= 0.75 ? 'bg-green-500' : score >= 0.5 ? 'bg-yellow-500' : 'bg-red-500';
  const textColor = score >= 0.75 ? 'text-green-700' : score >= 0.5 ? 'text-yellow-700' : 'text-red-700';
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  };

  return (
    <div className="flex items-center gap-1.5">
      <div className={`${sizeClasses[size]} ${color} bg-opacity-20 rounded-full flex items-center justify-center font-semibold ${textColor}`}>
        {pct}
      </div>
      {showLabel && (
        <span className={`text-xs ${textColor}`}>
          {score >= 0.75 ? 'Great' : score >= 0.5 ? 'OK' : 'Low'}
        </span>
      )}
    </div>
  );
}
```

**Step 2: Create RankingCard**

```tsx
// components/index/RankingCard.tsx
import Link from 'next/link';
import { IndexCity } from '../../lib/thailand-index';

interface RankingCardProps {
  city: IndexCity;
  rank: number;
  metricLabel: string;
  metricValue: string;
  locale: string;
}

export default function RankingCard({ city, rank, metricLabel, metricValue, locale }: RankingCardProps) {
  const name = (city.name as Record<string, string>)[locale] || city.name.en;
  return (
    <Link href={`/city/${city.slug}/`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-cream transition-colors group">
      <span className="text-2xl font-bold text-thailand-gold w-8 text-center">{rank}</span>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-thailand-blue group-hover:text-thailand-red transition-colors truncate">{name}</p>
        <p className="text-sm text-gray-500">{metricLabel}</p>
      </div>
      <span className="font-mono text-sm font-semibold text-thailand-blue">{metricValue}</span>
    </Link>
  );
}
```

**Step 3: Create RegionFilter**

```tsx
// components/index/RegionFilter.tsx
interface RegionFilterProps {
  regions: string[];
  activeRegion: string | null;
  onRegionChange: (region: string | null) => void;
  locale: string;
}

const REGION_LABELS: Record<string, { en: string; nl: string }> = {
  all: { en: 'All Regions', nl: 'Alle regio\'s' },
  northern: { en: 'North', nl: 'Noord' },
  central: { en: 'Central', nl: 'Centraal' },
  southern: { en: 'South', nl: 'Zuid' },
  isaan: { en: 'Isaan (NE)', nl: 'Isaan (NO)' },
};

export default function RegionFilter({ regions, activeRegion, onRegionChange, locale }: RegionFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onRegionChange(null)}
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
          activeRegion === null
            ? 'bg-thailand-red text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        {(REGION_LABELS.all as Record<string, string>)[locale] || 'All'}
      </button>
      {regions.map(region => (
        <button
          key={region}
          onClick={() => onRegionChange(region)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            activeRegion === region
              ? 'bg-thailand-red text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {(REGION_LABELS[region] as Record<string, string>)?.[locale] || region}
        </button>
      ))}
    </div>
  );
}
```

**Step 4: Create IndexTable**

```tsx
// components/index/IndexTable.tsx
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { IndexCity } from '../../lib/thailand-index';
import ScoreBadge from './ScoreBadge';
import RegionFilter from './RegionFilter';

type SortKey = 'name' | 'budget' | 'weather' | 'transport' | 'overall';
type SortOrder = 'asc' | 'desc';

interface IndexTableProps {
  cities: IndexCity[];
  regions: string[];
  locale: string;
  compact?: boolean; // hub page uses compact, subpages use full
}

const COLUMN_LABELS: Record<SortKey, { en: string; nl: string }> = {
  name: { en: 'Destination', nl: 'Bestemming' },
  budget: { en: 'Budget/day', nl: 'Budget/dag' },
  weather: { en: 'Weather', nl: 'Weer' },
  transport: { en: 'Transport', nl: 'Vervoer' },
  overall: { en: 'Overall', nl: 'Totaal' },
};

export default function IndexTable({ cities, regions, locale, compact = false }: IndexTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('overall');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder(key === 'budget' ? 'asc' : 'desc');
    }
  };

  const sortedCities = useMemo(() => {
    let filtered = activeRegion
      ? cities.filter(c => c.region === activeRegion)
      : cities;

    return [...filtered].sort((a, b) => {
      let aVal: number | string = 0;
      let bVal: number | string = 0;

      switch (sortKey) {
        case 'name':
          aVal = ((a.name as Record<string, string>)[locale] || a.name.en).toLowerCase();
          bVal = ((b.name as Record<string, string>)[locale] || b.name.en).toLowerCase();
          return sortOrder === 'asc' ? (aVal < bVal ? -1 : 1) : (aVal > bVal ? -1 : 1);
        case 'budget':
          aVal = a.budget.tier_budget?.median || 999;
          bVal = b.budget.tier_budget?.median || 999;
          break;
        case 'weather':
          aVal = a.scores.weather_score;
          bVal = b.scores.weather_score;
          break;
        case 'transport':
          aVal = a.scores.transport_score;
          bVal = b.scores.transport_score;
          break;
        case 'overall':
          aVal = a.scores.overall_score;
          bVal = b.scores.overall_score;
          break;
      }
      return sortOrder === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
    });
  }, [cities, sortKey, sortOrder, activeRegion, locale]);

  const t = (key: SortKey) => (COLUMN_LABELS[key] as Record<string, string>)[locale] || COLUMN_LABELS[key].en;

  return (
    <div>
      <RegionFilter regions={regions} activeRegion={activeRegion} onRegionChange={setActiveRegion} locale={locale} />

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 px-2 font-semibold text-gray-600">#</th>
              {(['name', 'budget', 'weather', 'transport', 'overall'] as SortKey[]).map(key => (
                <th
                  key={key}
                  onClick={() => handleSort(key)}
                  className="text-left py-3 px-2 font-semibold text-gray-600 cursor-pointer hover:text-thailand-red transition-colors select-none"
                >
                  {t(key)} {sortKey === key && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedCities.map((city, i) => {
              const name = (city.name as Record<string, string>)[locale] || city.name.en;
              return (
                <tr key={city.slug} className="border-b border-gray-100 hover:bg-surface-cream transition-colors">
                  <td className="py-2.5 px-2 text-gray-400 font-mono text-xs">{i + 1}</td>
                  <td className="py-2.5 px-2">
                    <Link href={`/city/${city.slug}/`} className="font-medium text-thailand-blue hover:text-thailand-red transition-colors">
                      {name}
                    </Link>
                  </td>
                  <td className="py-2.5 px-2 font-mono">
                    {city.budget.tier_budget ? `$${city.budget.tier_budget.median}` : '–'}
                  </td>
                  <td className="py-2.5 px-2"><ScoreBadge score={city.scores.weather_score} size="sm" /></td>
                  <td className="py-2.5 px-2"><ScoreBadge score={city.scores.transport_score} size="sm" /></td>
                  <td className="py-2.5 px-2"><ScoreBadge score={city.scores.overall_score} size="sm" /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-gray-400">{sortedCities.length} destinations · Click column headers to sort</p>
    </div>
  );
}
```

**Step 5: Create TableOfContents**

```tsx
// components/index/TableOfContents.tsx
import { useState, useEffect } from 'react';

interface TOCItem {
  id: string;
  label: string;
  level: number; // 2 for H2, 3 for H3
}

interface TableOfContentsProps {
  items: TOCItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find(e => e.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
    );

    items.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-4 right-4 z-40 bg-thailand-red text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium"
      >
        {isOpen ? '✕ Close' : '☰ Contents'}
      </button>

      {/* TOC panel */}
      <nav className={`
        lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto lg:block
        ${isOpen ? 'fixed inset-0 z-30 bg-white p-6 overflow-y-auto' : 'hidden lg:block'}
      `}>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Contents</p>
        <ul className="space-y-1">
          {items.filter(item => item.level === 2).map(item => (
            <li key={item.id}>
              <button
                onClick={() => handleClick(item.id)}
                className={`text-left w-full px-2 py-1.5 rounded text-sm transition-colors ${
                  activeId === item.id
                    ? 'bg-thailand-red bg-opacity-10 text-thailand-red font-medium'
                    : 'text-gray-600 hover:text-thailand-blue'
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
```

**Step 6: Create MonthMatrix**

```tsx
// components/index/MonthMatrix.tsx
import { IndexCity } from '../../lib/thailand-index';

interface MonthMatrixProps {
  cities: IndexCity[];
  locale: string;
}

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function scoreColor(score: number): string {
  if (score >= 0.85) return 'bg-green-500 text-white';
  if (score >= 0.7) return 'bg-green-300 text-green-900';
  if (score >= 0.55) return 'bg-yellow-300 text-yellow-900';
  if (score >= 0.4) return 'bg-orange-300 text-orange-900';
  return 'bg-red-300 text-red-900';
}

export default function MonthMatrix({ cities, locale }: MonthMatrixProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b-2 border-gray-200">
            <th className="text-left py-2 px-1 font-semibold text-gray-600 sticky left-0 bg-white min-w-[120px]">
              {locale === 'nl' ? 'Bestemming' : 'Destination'}
            </th>
            {MONTHS.map(m => (
              <th key={m} className="py-2 px-1 font-semibold text-gray-600 text-center w-10">{m}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cities.map(city => {
            const name = (city.name as Record<string, string>)[locale] || city.name.en;
            return (
              <tr key={city.slug} className="border-b border-gray-50">
                <td className="py-1.5 px-1 font-medium text-thailand-blue sticky left-0 bg-white truncate max-w-[120px]">
                  {name}
                </td>
                {MONTHS.map(m => {
                  const score = city.weather?.month_scores?.[m] ?? 0;
                  return (
                    <td key={m} className="py-1.5 px-0.5 text-center">
                      <span className={`inline-block w-8 py-0.5 rounded text-[10px] font-mono font-semibold ${scoreColor(score)}`}>
                        {Math.round(score * 100)}
                      </span>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-500" /> 85+</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-300" /> 70-84</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-yellow-300" /> 55-69</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-orange-300" /> 40-54</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-300" /> &lt;40</span>
      </div>
    </div>
  );
}
```

**Step 7: Verify components render**

Run: `npm run dev` and check for TypeScript errors in terminal.

**Step 8: Commit**

```bash
git add components/index/
git commit -m "feat: add Thailand Index UI components (table, TOC, scores, rankings, month matrix)"
```

---

### Task 4: Hub Page (`/thailand-index/`)

**Files:**
- Create: `pages/thailand-index/index.tsx`

**Context:** This is the main authority magnet page. It uses `getStaticProps` to load `data/thailand-index.json`. Pattern follows `pages/expat/index.tsx`: static data import via `require()`, ISR revalidation 86400. Uses `SEOHead`, `Breadcrumbs`, new index components.

**Step 1: Create the hub page**

```tsx
// pages/thailand-index/index.tsx
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import IndexTable from '../../components/index/IndexTable';
import TableOfContents from '../../components/index/TableOfContents';
import RankingCard from '../../components/index/RankingCard';
import ScoreBadge from '../../components/index/ScoreBadge';
import { ThailandIndex, IndexCity } from '../../lib/thailand-index';

interface Props {
  data: ThailandIndex;
}

const CONTENT = {
  title: {
    en: 'Thailand Travel & Cost Index 2026',
    nl: 'Thailand Reis- & Kostenindex 2026',
  },
  subtitle: {
    en: '33 destinations compared on budget, season, safety & connectivity',
    nl: '33 bestemmingen vergeleken op budget, seizoen, veiligheid & connectiviteit',
  },
  metaTitle: {
    en: 'Thailand Travel & Cost Index 2026: 33 Destinations Compared | Go2Thailand',
    nl: 'Thailand Reis- & Kostenindex 2026: 33 Bestemmingen Vergeleken | Go2Thailand',
  },
  metaDescription: {
    en: 'Compare 33 Thailand destinations on daily budget, best travel season, transport connections and more. Data-driven rankings updated for 2026.',
    nl: 'Vergelijk 33 Thailand bestemmingen op dagbudget, beste reistijd, vervoersverbindingen en meer. Datagedreven rankings bijgewerkt voor 2026.',
  },
  sections: {
    at_a_glance: { en: 'At a Glance', nl: 'In \u00e9\u00e9n oogopslag' },
    overview_table: { en: 'Destination Rankings', nl: 'Bestemmingen ranglijst' },
    why_this_index: { en: 'Why This Index?', nl: 'Waarom deze index?' },
    methodology: { en: 'Methodology & Sources', nl: 'Methodologie & bronnen' },
    budget: { en: 'Budget Index 2026', nl: 'Budget Index 2026' },
    best_time: { en: 'Best Time to Visit', nl: 'Beste reistijd' },
    routes: { en: 'Recommended Routes', nl: 'Aanbevolen routes' },
    faq: { en: 'Frequently Asked Questions', nl: 'Veelgestelde vragen' },
    about: { en: 'About This Report', nl: 'Over dit rapport' },
  },
};

const FAQ_ITEMS = [
  {
    q: { en: 'Is Thailand still cheap in 2026?', nl: 'Is Thailand nog goedkoop in 2026?' },
    a: { en: 'Yes. Budget travelers can still manage on $20-35/day in cities like Pai, Chiang Khan, and Lopburi. Even popular destinations like Chiang Mai remain affordable at $30-50/day. However, premium beach destinations like Phuket and Koh Samui have seen price increases of 15-20% since 2023.', nl: 'Ja. Budgetreizigers kunnen nog steeds rondkomen met $20-35/dag in steden als Pai, Chiang Khan en Lopburi. Zelfs populaire bestemmingen als Chiang Mai blijven betaalbaar met $30-50/dag. Premium strandbestemmingen als Phuket en Koh Samui zijn echter 15-20% duurder geworden sinds 2023.' },
  },
  {
    q: { en: 'What does 2 weeks in Thailand cost on average?', nl: 'Wat kost 2 weken Thailand gemiddeld?' },
    a: { en: 'Budget: $400-700 ($30-50/day). Mid-range: $700-1,400 ($50-100/day). Comfort: $1,400-2,800+ ($100-200/day). These include accommodation, food, transport and activities. Flights are extra.', nl: 'Budget: $400-700 ($30-50/dag). Midrange: $700-1.400 ($50-100/dag). Comfort: $1.400-2.800+ ($100-200/dag). Dit is inclusief accommodatie, eten, vervoer en activiteiten. Vluchten zijn extra.' },
  },
  {
    q: { en: 'What is the cheapest month to visit Thailand?', nl: 'Wat is de goedkoopste maand om naar Thailand te gaan?' },
    a: { en: 'May-June and September-October offer the lowest prices (green/monsoon season). Hotels are 30-50% cheaper, and flights from Europe drop significantly. The trade-off is more rain, but mornings are usually dry.', nl: 'Mei-juni en september-oktober bieden de laagste prijzen (groen/moessonseizoen). Hotels zijn 30-50% goedkoper en vluchten vanuit Europa dalen aanzienlijk. De trade-off is meer regen, maar ochtenden zijn meestal droog.' },
  },
  {
    q: { en: 'Is Thailand safe for solo travelers?', nl: 'Is Thailand veilig voor solo travelers?' },
    a: { en: 'Thailand is one of the safest countries in Southeast Asia for solo travel, including for women. The main risks are petty theft, traffic accidents (especially scooters), and tourist scams. Violent crime against tourists is rare. Stick to common sense and you will be fine.', nl: 'Thailand is een van de veiligste landen in Zuidoost-Azi\u00eb voor solo reizen, ook voor vrouwen. De belangrijkste risico\'s zijn kleine diefstal, verkeersongelukken (vooral scooters) en toeristenzwendel. Geweldsmisdrijven tegen toeristen zijn zeldzaam.' },
  },
  {
    q: { en: 'Where does Thailand have the best internet?', nl: 'Waar heb je het beste internet in Thailand?' },
    a: { en: 'Bangkok, Chiang Mai, and Phuket have the most reliable internet with 50-200 Mbps widely available. Chiang Mai has the highest concentration of coworking spaces. On islands, Koh Samui and Koh Phangan have decent coverage, but remote areas may be slow.', nl: 'Bangkok, Chiang Mai en Phuket hebben het meest betrouwbare internet met 50-200 Mbps breed beschikbaar. Chiang Mai heeft de hoogste concentratie coworking spaces. Op eilanden hebben Koh Samui en Koh Phangan redelijke dekking, maar afgelegen gebieden kunnen traag zijn.' },
  },
];

export default function ThailandIndexPage({ data }: Props) {
  const { locale = 'en' } = useRouter();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en;

  const tocItems = Object.entries(CONTENT.sections).map(([id, label]) => ({
    id,
    label: t(label),
    level: 2,
  }));

  const cityMap = new Map(data.cities.map(c => [c.slug, c]));
  const regions = Object.keys(data.regions);
  const cheapest = data.rankings.cheapest?.items.slice(0, 10) || [];
  const mostExpensive = data.rankings.most_expensive?.items.slice(0, 5) || [];
  const bestOverall = data.rankings.overall?.items.slice(0, 10) || [];

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: t(CONTENT.title) },
  ];

  return (
    <>
      <SEOHead
        title={t(CONTENT.metaTitle)}
        description={t(CONTENT.metaDescription)}
      >
        {/* FAQPage schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: FAQ_ITEMS.map(item => ({
            '@type': 'Question',
            name: t(item.q),
            acceptedAnswer: { '@type': 'Answer', text: t(item.a) },
          })),
        })}} />
      </SEOHead>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <Breadcrumbs items={breadcrumbs} />

        {/* Hero */}
        <header className="mb-12 mt-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-thailand-blue leading-tight">
            {t(CONTENT.title)}
          </h1>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl">{t(CONTENT.subtitle)}</p>
          <div className="mt-3 flex items-center gap-4 text-sm text-gray-400">
            <span>{data.metadata.city_count} destinations</span>
            <span>·</span>
            <span>Updated {new Date(data.metadata.generated_at).toLocaleDateString(locale === 'nl' ? 'nl-NL' : 'en-US', { month: 'long', year: 'numeric' })}</span>
          </div>
        </header>

        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-8">
          {/* Sticky TOC */}
          <aside className="hidden lg:block">
            <TableOfContents items={tocItems} />
          </aside>

          {/* Mobile TOC */}
          <div className="lg:hidden">
            <TableOfContents items={tocItems} />
          </div>

          {/* Main content */}
          <main className="min-w-0">

            {/* At a Glance */}
            <section id="at_a_glance" className="mb-16">
              <h2 className="text-2xl font-bold text-thailand-blue mb-6">{t(CONTENT.sections.at_a_glance)}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <h3 className="font-semibold text-thailand-blue mb-3">
                    {locale === 'nl' ? 'Top 10 goedkoopst' : 'Top 10 Cheapest'}
                  </h3>
                  {cheapest.map(item => {
                    const city = cityMap.get(item.slug);
                    if (!city) return null;
                    return <RankingCard key={item.slug} city={city} rank={item.rank} metricLabel={locale === 'nl' ? 'budget/dag' : 'budget/day'} metricValue={`$${item.value}`} locale={locale} />;
                  })}
                </div>
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <h3 className="font-semibold text-thailand-blue mb-3">
                    {locale === 'nl' ? 'Top 10 beste totaalscore' : 'Top 10 Best Overall'}
                  </h3>
                  {bestOverall.map(item => {
                    const city = cityMap.get(item.slug);
                    if (!city) return null;
                    return <RankingCard key={item.slug} city={city} rank={item.rank} metricLabel="overall score" metricValue={`${Math.round(item.value * 100)}/100`} locale={locale} />;
                  })}
                </div>
              </div>
            </section>

            {/* Overview Table */}
            <section id="overview_table" className="mb-16">
              <h2 className="text-2xl font-bold text-thailand-blue mb-6">{t(CONTENT.sections.overview_table)}</h2>
              <IndexTable cities={data.cities} regions={regions} locale={locale} compact />
            </section>

            {/* Why This Index */}
            <section id="why_this_index" className="mb-16">
              <h2 className="text-2xl font-bold text-thailand-blue mb-4">{t(CONTENT.sections.why_this_index)}</h2>
              <div className="prose prose-gray max-w-none">
                {locale === 'nl' ? (
                  <>
                    <p>Thailand verandert snel. Prijzen stijgen op populaire eilanden, maar verborgen parels blijven betaalbaar. Deze index helpt je de juiste bestemming te kiezen op basis van actuele data — niet op basis van verouderde blogposts.</p>
                    <h3>Voor wie is dit rapport?</h3>
                    <ul>
                      <li><strong>Backpackers</strong> — vind de goedkoopste bestemmingen met de beste vibe</li>
                      <li><strong>Digital nomads</strong> — ontdek steden met snel internet en coworking</li>
                      <li><strong>Stellen</strong> — vergelijk romantische bestemmingen op budget en seizoen</li>
                      <li><strong>Gezinnen</strong> — vind veilige, betaalbare plekken met activiteiten voor kinderen</li>
                    </ul>
                  </>
                ) : (
                  <>
                    <p>Thailand is changing fast. Prices are rising at popular beach destinations, but hidden gems remain affordable. This index helps you pick the right destination based on current data — not outdated blog posts.</p>
                    <h3>Who is this report for?</h3>
                    <ul>
                      <li><strong>Backpackers</strong> — find the cheapest destinations with the best vibe</li>
                      <li><strong>Digital nomads</strong> — discover cities with fast internet and coworking spaces</li>
                      <li><strong>Couples</strong> — compare romantic destinations on budget and season</li>
                      <li><strong>Families</strong> — find safe, affordable places with kid-friendly activities</li>
                    </ul>
                  </>
                )}
              </div>
            </section>

            {/* Methodology */}
            <section id="methodology" className="mb-16">
              <h2 className="text-2xl font-bold text-thailand-blue mb-4">{t(CONTENT.sections.methodology)}</h2>
              <div className="prose prose-gray max-w-none">
                {locale === 'nl' ? (
                  <>
                    <h3>Databronnen</h3>
                    <p>We combineren data uit meerdere bronnen: accommodatieprijzen van booking platforms, lokale voedselprijzen van expat communities, weerdata van meteorologische diensten, en vervoerskosten van lokale aanbieders.</p>
                    <h3>Hoe we scores berekenen</h3>
                    <p><strong>Budgetscore:</strong> Gebaseerd op mediaan dagbudget voor budget reizigers. Lager = beter.</p>
                    <p><strong>Weerscore:</strong> Gewogen gemiddelde van temperatuurcomfort (30%), regenval (35%), luchtvochtigheid (20%) en regendagen (15%). Per maand berekend.</p>
                    <p><strong>Vervoersscore:</strong> Gebaseerd op aantal verbindingen (30%), populaire routes (40%) en unieke bestemmingen (30%).</p>
                    <h3>Beperkingen</h3>
                    <p>Prijzen zijn indicatief en kunnen variëren per seizoen. Weerdata is gebaseerd op historische gemiddelden. Veiligheids- en internetscores worden in een toekomstige update toegevoegd.</p>
                  </>
                ) : (
                  <>
                    <h3>Data Sources</h3>
                    <p>We combine data from multiple sources: accommodation prices from booking platforms, local food prices from expat communities, weather data from meteorological services, and transport costs from local providers.</p>
                    <h3>How We Calculate Scores</h3>
                    <p><strong>Budget score:</strong> Based on median daily budget for budget travelers. Lower cost = higher score.</p>
                    <p><strong>Weather score:</strong> Weighted average of temperature comfort (30%), rainfall (35%), humidity (20%), and rainy days (15%). Calculated per month.</p>
                    <p><strong>Transport score:</strong> Based on number of connections (30%), popular routes (40%), and unique destinations (30%).</p>
                    <h3>Limitations</h3>
                    <p>Prices are indicative and may vary by season. Weather data is based on historical averages. Safety and internet scores will be added in a future update.</p>
                  </>
                )}
                <p className="text-sm text-gray-400 mt-4">
                  Last updated: {new Date(data.metadata.generated_at).toLocaleDateString(locale === 'nl' ? 'nl-NL' : 'en-US')} · Data version: {data.metadata.data_version}
                </p>
              </div>
            </section>

            {/* Budget Preview */}
            <section id="budget" className="mb-16">
              <h2 className="text-2xl font-bold text-thailand-blue mb-6">{t(CONTENT.sections.budget)}</h2>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-green-50 rounded-xl p-6">
                  <h3 className="font-semibold text-green-800 mb-3">
                    {locale === 'nl' ? 'Goedkoopst' : 'Most Affordable'}
                  </h3>
                  {cheapest.slice(0, 5).map(item => {
                    const city = cityMap.get(item.slug);
                    if (!city) return null;
                    return <RankingCard key={item.slug} city={city} rank={item.rank} metricLabel="" metricValue={`$${item.value}/day`} locale={locale} />;
                  })}
                </div>
                <div className="bg-red-50 rounded-xl p-6">
                  <h3 className="font-semibold text-red-800 mb-3">
                    {locale === 'nl' ? 'Duurste' : 'Most Expensive'}
                  </h3>
                  {mostExpensive.slice(0, 5).map(item => {
                    const city = cityMap.get(item.slug);
                    if (!city) return null;
                    return <RankingCard key={item.slug} city={city} rank={item.rank} metricLabel="" metricValue={`$${item.value}/day`} locale={locale} />;
                  })}
                </div>
              </div>
              <Link href="/thailand-index/budget/" className="inline-flex items-center gap-2 text-thailand-red font-semibold hover:underline">
                {locale === 'nl' ? 'Volledige budget breakdown →' : 'Full budget breakdown →'}
              </Link>
            </section>

            {/* Best Time Preview */}
            <section id="best_time" className="mb-16">
              <h2 className="text-2xl font-bold text-thailand-blue mb-6">{t(CONTENT.sections.best_time)}</h2>
              <p className="text-gray-600 mb-4">
                {locale === 'nl'
                  ? 'Kleurgecodeerde weerscore per maand. Groen = ideaal weer, rood = monsoonseizoen.'
                  : 'Color-coded weather comfort score per month. Green = ideal weather, red = monsoon season.'}
              </p>
              <div className="bg-white rounded-xl shadow-sm border p-4">
                {/* Show top 10 overall cities in the matrix as preview */}
                {(() => {
                  const { default: MonthMatrix } = require('../../components/index/MonthMatrix');
                  const previewCities = bestOverall.slice(0, 10).map(r => cityMap.get(r.slug)).filter(Boolean) as IndexCity[];
                  return <MonthMatrix cities={previewCities} locale={locale} />;
                })()}
              </div>
              <Link href="/thailand-index/best-time/" className="inline-flex items-center gap-2 mt-4 text-thailand-red font-semibold hover:underline">
                {locale === 'nl' ? 'Complete seizoensgids per regio →' : 'Complete season guide by region →'}
              </Link>
            </section>

            {/* Routes */}
            <section id="routes" className="mb-16">
              <h2 className="text-2xl font-bold text-thailand-blue mb-6">{t(CONTENT.sections.routes)}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { href: '/itineraries/', label: { en: 'All Itineraries', nl: 'Alle routes' }, desc: { en: 'Pre-planned multi-day trips', nl: 'Voorgeplande meerdaagse reizen' } },
                  { href: '/transport/', label: { en: 'Transport Guide', nl: 'Vervoersgids' }, desc: { en: '245 inter-city routes compared', nl: '245 intercity routes vergeleken' } },
                  { href: '/islands/', label: { en: 'Island Guide', nl: 'Eilandengids' }, desc: { en: 'Compare Thailand\'s best islands', nl: 'Vergelijk Thailands beste eilanden' } },
                ].map(link => (
                  <Link key={link.href} href={link.href} className="block p-4 rounded-xl border hover:border-thailand-red hover:shadow-sm transition-all">
                    <p className="font-semibold text-thailand-blue">{t(link.label)}</p>
                    <p className="text-sm text-gray-500 mt-1">{t(link.desc)}</p>
                  </Link>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="mb-16">
              <h2 className="text-2xl font-bold text-thailand-blue mb-6">{t(CONTENT.sections.faq)}</h2>
              <div className="space-y-4">
                {FAQ_ITEMS.map((item, i) => (
                  <details key={i} className="group bg-white rounded-xl border p-4">
                    <summary className="font-semibold text-thailand-blue cursor-pointer list-none flex items-center justify-between">
                      {t(item.q)}
                      <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <p className="mt-3 text-gray-600 leading-relaxed">{t(item.a)}</p>
                  </details>
                ))}
              </div>
            </section>

            {/* About */}
            <section id="about" className="mb-16">
              <h2 className="text-2xl font-bold text-thailand-blue mb-4">{t(CONTENT.sections.about)}</h2>
              <div className="prose prose-gray max-w-none">
                {locale === 'nl' ? (
                  <p>Dit rapport is samengesteld door het Go2Thailand.com team op basis van data-analyse van 33 Thaise bestemmingen. We combineren actuele prijsdata, weerstatistieken en vervoersinformatie tot een objectief vergelijkingsoverzicht. Heb je feedback of vragen? <Link href="/feedback/" className="text-thailand-red">Laat het ons weten</Link>.</p>
                ) : (
                  <p>This report is compiled by the Go2Thailand.com team based on data analysis of 33 Thai destinations. We combine current price data, weather statistics, and transport information into an objective comparison overview. Have feedback or questions? <Link href="/feedback/" className="text-thailand-red">Let us know</Link>.</p>
                )}
              </div>
            </section>

          </main>
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const data = require('../../data/thailand-index.json');
  return {
    props: { data },
    revalidate: 86400,
  };
};
```

**Step 2: Verify page loads**

Run: `npm run dev`, navigate to `http://localhost:3000/thailand-index/`
Expected: Page renders with hero, TOC, rankings, table, FAQ sections.

**Step 3: Commit**

```bash
git add pages/thailand-index/index.tsx
git commit -m "feat: add Thailand Index hub page with rankings, interactive table, FAQ"
```

---

### Task 5: Budget Subpage (`/thailand-index/budget`)

**Files:**
- Create: `pages/thailand-index/budget.tsx`

**Context:** Deep-dive into budget data. Full interactive table with 3 budget tiers. Budget per region breakdown. Uses same components as hub.

**Step 1: Create the budget page**

```tsx
// pages/thailand-index/budget.tsx
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import IndexTable from '../../components/index/IndexTable';
import RankingCard from '../../components/index/RankingCard';
import { ThailandIndex, IndexCity } from '../../lib/thailand-index';

interface Props {
  data: ThailandIndex;
}

const CONTENT = {
  title: {
    en: 'Thailand Budget Index 2026: Daily Costs for 33 Destinations',
    nl: 'Thailand Budget Index 2026: Dagelijkse Kosten voor 33 Bestemmingen',
  },
  metaTitle: {
    en: 'Thailand Budget Index 2026: What Does Thailand Cost Per Day? | Go2Thailand',
    nl: 'Thailand Budget Index 2026: Wat Kost Thailand Per Dag? | Go2Thailand',
  },
  metaDescription: {
    en: 'Compare daily costs across 33 Thai destinations. Budget ($15-50), mid-range ($50-100), and luxury ($100+) breakdowns for 2026.',
    nl: 'Vergelijk dagelijkse kosten van 33 Thaise bestemmingen. Budget ($15-50), midrange ($50-100) en luxe ($100+) overzicht voor 2026.',
  },
};

const BUDGET_FAQ = [
  {
    q: { en: 'What is the cheapest city in Thailand?', nl: 'Wat is de goedkoopste stad in Thailand?' },
    a: { en: 'Based on our 2026 data, the cheapest destinations are typically in the north (Pai, Chiang Khan) and Isaan region, where budget travelers can live on $15-25 per day including accommodation, food, and activities.', nl: 'Op basis van onze 2026 data zijn de goedkoopste bestemmingen doorgaans in het noorden (Pai, Chiang Khan) en de Isaan regio, waar budgetreizigers rond kunnen komen met $15-25 per dag inclusief accommodatie, eten en activiteiten.' },
  },
  {
    q: { en: 'How much money do I need per day in Thailand?', nl: 'Hoeveel geld heb ik per dag nodig in Thailand?' },
    a: { en: 'Budget: $20-40/day (dorms, street food, local transport). Mid-range: $50-100/day (private room, restaurant meals, occasional taxi). Comfort: $100-200+/day (hotel, fine dining, private tours).', nl: 'Budget: $20-40/dag (slaapzalen, straateten, lokaal vervoer). Midrange: $50-100/dag (privékamer, restaurantmaaltijden, af en toe een taxi). Comfort: $100-200+/dag (hotel, fine dining, privé tours).' },
  },
  {
    q: { en: 'Are Thai islands more expensive than cities?', nl: 'Zijn Thaise eilanden duurder dan steden?' },
    a: { en: 'Generally yes. Islands like Phuket and Koh Samui are 30-60% more expensive than mainland cities due to import costs and tourist premiums. Exceptions: Koh Lanta and Koh Chang offer better value than popular islands.', nl: 'Over het algemeen ja. Eilanden als Phuket en Koh Samui zijn 30-60% duurder dan steden op het vasteland door importkosten en toeristenpremies. Uitzonderingen: Koh Lanta en Koh Chang bieden betere waarde dan populaire eilanden.' },
  },
];

export default function BudgetPage({ data }: Props) {
  const { locale = 'en' } = useRouter();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en;

  const cityMap = new Map(data.cities.map(c => [c.slug, c]));
  const regions = Object.keys(data.regions);
  const cheapest = data.rankings.cheapest?.items.slice(0, 10) || [];
  const mostExpensive = data.rankings.most_expensive?.items.slice(0, 10) || [];

  // Budget per region
  const regionBudgets = Object.entries(data.regions).map(([region, slugs]) => {
    const cities = slugs.map(s => cityMap.get(s)).filter(Boolean) as IndexCity[];
    const medians = cities.map(c => c.budget.tier_budget?.median).filter(Boolean) as number[];
    const avg = medians.length > 0 ? Math.round(medians.reduce((a, b) => a + b, 0) / medians.length) : null;
    return { region, avg, cityCount: cities.length };
  });

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: locale === 'nl' ? 'Thailand Index' : 'Thailand Index', href: '/thailand-index/' },
    { label: locale === 'nl' ? 'Budget' : 'Budget' },
  ];

  return (
    <>
      <SEOHead title={t(CONTENT.metaTitle)} description={t(CONTENT.metaDescription)}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: BUDGET_FAQ.map(item => ({
            '@type': 'Question',
            name: t(item.q),
            acceptedAnswer: { '@type': 'Answer', text: t(item.a) },
          })),
        })}} />
      </SEOHead>

      <div className="max-w-5xl mx-auto px-4 py-6">
        <Breadcrumbs items={breadcrumbs} />

        <header className="mb-10 mt-6">
          <Link href="/thailand-index/" className="text-sm text-thailand-red hover:underline mb-2 inline-block">
            ← {locale === 'nl' ? 'Terug naar Thailand Index' : 'Back to Thailand Index'}
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-thailand-blue leading-tight">{t(CONTENT.title)}</h1>
          <p className="mt-3 text-gray-600">
            {locale === 'nl'
              ? 'Alle 33 bestemmingen vergeleken op dagbudget. Sorteer op budget tier om de goedkoopste of duurste plekken te vinden.'
              : 'All 33 destinations compared on daily budget. Sort by budget tier to find the cheapest or most expensive places.'}
          </p>
        </header>

        {/* Full Budget Table */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-thailand-blue mb-6">
            {locale === 'nl' ? 'Overzichtstabel: alle bestemmingen' : 'Overview Table: All Destinations'}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-2 font-semibold text-gray-600">#</th>
                  <th className="text-left py-3 px-2 font-semibold text-gray-600">{locale === 'nl' ? 'Bestemming' : 'Destination'}</th>
                  <th className="text-left py-3 px-2 font-semibold text-gray-600">{locale === 'nl' ? 'Regio' : 'Region'}</th>
                  <th className="text-right py-3 px-2 font-semibold text-green-600">Budget</th>
                  <th className="text-right py-3 px-2 font-semibold text-yellow-600">Mid-range</th>
                  <th className="text-right py-3 px-2 font-semibold text-red-600">Luxury</th>
                </tr>
              </thead>
              <tbody>
                {[...data.cities]
                  .sort((a, b) => (a.budget.tier_budget?.median || 999) - (b.budget.tier_budget?.median || 999))
                  .map((city, i) => {
                    const name = (city.name as Record<string, string>)[locale] || city.name.en;
                    return (
                      <tr key={city.slug} className="border-b border-gray-100 hover:bg-surface-cream transition-colors">
                        <td className="py-2.5 px-2 text-gray-400 font-mono text-xs">{i + 1}</td>
                        <td className="py-2.5 px-2">
                          <Link href={`/city/${city.slug}/`} className="font-medium text-thailand-blue hover:text-thailand-red transition-colors">
                            {name}
                          </Link>
                        </td>
                        <td className="py-2.5 px-2 text-gray-500 text-xs">{city.region}</td>
                        <td className="py-2.5 px-2 text-right font-mono">
                          {city.budget.tier_budget ? `$${city.budget.tier_budget.min}-${city.budget.tier_budget.max || '?'}` : '–'}
                        </td>
                        <td className="py-2.5 px-2 text-right font-mono">
                          {city.budget.tier_mid ? `$${city.budget.tier_mid.min}-${city.budget.tier_mid.max || '?'}` : '–'}
                        </td>
                        <td className="py-2.5 px-2 text-right font-mono">
                          {city.budget.tier_luxury ? `$${city.budget.tier_luxury.min}+` : '–'}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Top 10 Cheapest / Most Expensive */}
        <section className="mb-12">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-green-800 mb-4">
                {locale === 'nl' ? 'Top 10 goedkoopste bestemmingen' : 'Top 10 Cheapest Destinations'}
              </h3>
              {cheapest.map(item => {
                const city = cityMap.get(item.slug);
                if (!city) return null;
                return <RankingCard key={item.slug} city={city} rank={item.rank} metricLabel="" metricValue={`$${item.value}/day`} locale={locale} />;
              })}
            </div>
            <div className="bg-red-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-red-800 mb-4">
                {locale === 'nl' ? 'Top 10 duurste bestemmingen' : 'Top 10 Most Expensive'}
              </h3>
              {mostExpensive.map(item => {
                const city = cityMap.get(item.slug);
                if (!city) return null;
                return <RankingCard key={item.slug} city={city} rank={item.rank} metricLabel="" metricValue={`$${item.value}/day`} locale={locale} />;
              })}
            </div>
          </div>
        </section>

        {/* Budget Per Region */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-thailand-blue mb-6">
            {locale === 'nl' ? 'Gemiddeld budget per regio' : 'Average Budget by Region'}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {regionBudgets.filter(r => r.avg).map(({ region, avg, cityCount }) => (
              <div key={region} className="bg-white rounded-xl border p-4 text-center">
                <p className="text-sm text-gray-500 capitalize">{region}</p>
                <p className="text-2xl font-bold text-thailand-blue mt-1">${avg}<span className="text-sm font-normal text-gray-400">/day</span></p>
                <p className="text-xs text-gray-400 mt-1">{cityCount} destinations</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-thailand-blue mb-6">
            {locale === 'nl' ? 'Veelgestelde vragen over budget' : 'Budget FAQ'}
          </h2>
          <div className="space-y-4">
            {BUDGET_FAQ.map((item, i) => (
              <details key={i} className="group bg-white rounded-xl border p-4">
                <summary className="font-semibold text-thailand-blue cursor-pointer list-none flex items-center justify-between">
                  {t(item.q)}
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-gray-600 leading-relaxed">{t(item.a)}</p>
              </details>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const data = require('../../data/thailand-index.json');
  return {
    props: { data },
    revalidate: 86400,
  };
};
```

**Step 2: Verify page loads**

Run: `npm run dev`, navigate to `http://localhost:3000/thailand-index/budget/`
Expected: Full budget table, top 10 cheapest/expensive, region averages, FAQ.

**Step 3: Commit**

```bash
git add pages/thailand-index/budget.tsx
git commit -m "feat: add Thailand Index budget subpage with full cost comparison"
```

---

### Task 6: Best Time Subpage (`/thailand-index/best-time`)

**Files:**
- Create: `pages/thailand-index/best-time.tsx`

**Context:** Season & weather deep-dive. Uses MonthMatrix component for color-coded visualization. Breaks down by region.

**Step 1: Create the best-time page**

```tsx
// pages/thailand-index/best-time.tsx
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import SEOHead from '../../components/SEOHead';
import Breadcrumbs from '../../components/Breadcrumbs';
import MonthMatrix from '../../components/index/MonthMatrix';
import { ThailandIndex, IndexCity } from '../../lib/thailand-index';

interface Props {
  data: ThailandIndex;
}

const CONTENT = {
  title: {
    en: 'Best Time to Visit Thailand 2026: Season Guide by Region',
    nl: 'Beste Reistijd Thailand 2026: Seizoensgids per Regio',
  },
  metaTitle: {
    en: 'Best Time to Visit Thailand 2026: Month-by-Month Weather Guide | Go2Thailand',
    nl: 'Beste Reistijd Thailand 2026: Maand-voor-Maand Weergids | Go2Thailand',
  },
  metaDescription: {
    en: 'Find the best month to visit Thailand in 2026. Weather comfort scores for 33 destinations, broken down by region. Avoid monsoon season, find the sweet spots.',
    nl: 'Vind de beste maand om Thailand te bezoeken in 2026. Weercomfort scores voor 33 bestemmingen, uitgesplitst per regio. Vermijd moessonseizoen, vind de sweet spots.',
  },
};

const REGION_INFO: Record<string, { en: string; nl: string; best: string; avoid: string }> = {
  northern: {
    en: 'Northern Thailand (Chiang Mai, Chiang Rai, Pai) has the most pleasant cool season from November to February. March-April brings burning season with poor air quality. The green season (June-October) is lush but wet.',
    nl: 'Noord-Thailand (Chiang Mai, Chiang Rai, Pai) heeft het aangenaamste koele seizoen van november tot februari. Maart-april brengt het brandseizoen met slechte luchtkwaliteit. Het groene seizoen (juni-oktober) is weelderig maar nat.',
    best: 'Nov-Feb', avoid: 'Mar-Apr',
  },
  central: {
    en: 'Central Thailand (Bangkok, Ayutthaya, Kanchanaburi) is hot year-round. The cool season (Nov-Feb) brings relief with temperatures around 25-32°C. April is the hottest month. Heavy rains peak in September-October.',
    nl: 'Centraal-Thailand (Bangkok, Ayutthaya, Kanchanaburi) is het hele jaar warm. Het koele seizoen (nov-feb) brengt verlichting met temperaturen rond 25-32°C. April is de heetste maand. Hevige regenval piekt in september-oktober.',
    best: 'Nov-Feb', avoid: 'Apr, Sep-Oct',
  },
  southern: {
    en: 'Southern Thailand has two coasts with different monsoon seasons. The Andaman coast (Phuket, Krabi) is best November-April. The Gulf coast (Koh Samui, Koh Phangan) is best January-September, with monsoon in October-December.',
    nl: 'Zuid-Thailand heeft twee kusten met verschillende moessonseizoenen. De Andamankust (Phuket, Krabi) is het best van november tot april. De Golfkust (Koh Samui, Koh Phangan) is het best van januari tot september, met moesson in oktober-december.',
    best: 'Dec-Mar', avoid: 'varies by coast',
  },
  isaan: {
    en: 'Isaan (northeastern Thailand) is off the tourist trail and has a classic tropical climate. The cool season (Nov-Feb) is ideal. Summers are extremely hot (38°C+). Rains are moderate compared to the south.',
    nl: 'Isaan (noordoost-Thailand) ligt buiten de toeristische route en heeft een klassiek tropisch klimaat. Het koele seizoen (nov-feb) is ideaal. Zomers zijn extreem heet (38°C+). Regenval is gematigd vergeleken met het zuiden.',
    best: 'Nov-Feb', avoid: 'Apr-May',
  },
};

const SEASON_FAQ = [
  {
    q: { en: 'What is the best month to visit Thailand overall?', nl: 'Wat is de beste maand om Thailand te bezoeken?' },
    a: { en: 'December and January are the best months overall. The weather is cool and dry across most of the country, all attractions are open, and the atmosphere is festive. The trade-off is higher prices and more tourists.', nl: 'December en januari zijn over het algemeen de beste maanden. Het weer is koel en droog in het grootste deel van het land, alle attracties zijn open en de sfeer is feestelijk. De trade-off is hogere prijzen en meer toeristen.' },
  },
  {
    q: { en: 'Can I visit Thailand during monsoon season?', nl: 'Kan ik Thailand bezoeken tijdens het moessonseizoen?' },
    a: { en: 'Yes! Monsoon season (May-October) means lower prices, fewer tourists, and lush green landscapes. Rain usually falls in heavy but short afternoon bursts. Mornings are often sunny. Some boat services to islands may be reduced.', nl: 'Ja! Het moessonseizoen (mei-oktober) betekent lagere prijzen, minder toeristen en weelderig groene landschappen. Regen valt meestal in zware maar korte middagbuien. Ochtenden zijn vaak zonnig. Sommige bootdiensten naar eilanden kunnen beperkt zijn.' },
  },
  {
    q: { en: 'When is the cheapest time to fly to Thailand?', nl: 'Wanneer is de goedkoopste tijd om naar Thailand te vliegen?' },
    a: { en: 'May-June and September-October offer the cheapest flights from Europe and North America. You can save 30-50% compared to peak season (December-January). Book 2-3 months in advance for the best deals.', nl: 'Mei-juni en september-oktober bieden de goedkoopste vluchten vanuit Europa en Noord-Amerika. Je kunt 30-50% besparen vergeleken met het hoogseizoen (december-januari). Boek 2-3 maanden van tevoren voor de beste deals.' },
  },
];

export default function BestTimePage({ data }: Props) {
  const { locale = 'en' } = useRouter();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en;

  const cityMap = new Map(data.cities.map(c => [c.slug, c]));

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Thailand Index', href: '/thailand-index/' },
    { label: locale === 'nl' ? 'Beste reistijd' : 'Best Time' },
  ];

  return (
    <>
      <SEOHead title={t(CONTENT.metaTitle)} description={t(CONTENT.metaDescription)}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: SEASON_FAQ.map(item => ({
            '@type': 'Question',
            name: t(item.q),
            acceptedAnswer: { '@type': 'Answer', text: t(item.a) },
          })),
        })}} />
      </SEOHead>

      <div className="max-w-5xl mx-auto px-4 py-6">
        <Breadcrumbs items={breadcrumbs} />

        <header className="mb-10 mt-6">
          <Link href="/thailand-index/" className="text-sm text-thailand-red hover:underline mb-2 inline-block">
            ← {locale === 'nl' ? 'Terug naar Thailand Index' : 'Back to Thailand Index'}
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-thailand-blue leading-tight">{t(CONTENT.title)}</h1>
          <p className="mt-3 text-gray-600">
            {locale === 'nl'
              ? 'Interactieve weermatrix voor alle 33 bestemmingen. Scores gebaseerd op temperatuur, regenval, luchtvochtigheid en regendagen.'
              : 'Interactive weather matrix for all 33 destinations. Scores based on temperature, rainfall, humidity, and rainy days.'}
          </p>
        </header>

        {/* Full Month Matrix */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-thailand-blue mb-6">
            {locale === 'nl' ? 'Weercomfort per maand — alle bestemmingen' : 'Weather Comfort by Month — All Destinations'}
          </h2>
          <div className="bg-white rounded-xl shadow-sm border p-4">
            <MonthMatrix
              cities={[...data.cities].sort((a, b) => (b.weather?.comfort_score || 0) - (a.weather?.comfort_score || 0))}
              locale={locale}
            />
          </div>
        </section>

        {/* Per Region */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-thailand-blue mb-6">
            {locale === 'nl' ? 'Beste reistijd per regio' : 'Best Time by Region'}
          </h2>
          <div className="space-y-8">
            {Object.entries(data.regions).map(([region, slugs]) => {
              const info = REGION_INFO[region];
              const regionCities = slugs.map(s => cityMap.get(s)).filter(Boolean) as IndexCity[];
              if (regionCities.length === 0) return null;

              return (
                <div key={region} className="bg-white rounded-xl border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-thailand-blue capitalize">{region} Thailand</h3>
                    {info && (
                      <div className="flex gap-4 text-sm">
                        <span className="text-green-600 font-medium">Best: {info.best}</span>
                        <span className="text-red-500 font-medium">Avoid: {info.avoid}</span>
                      </div>
                    )}
                  </div>
                  {info && <p className="text-gray-600 text-sm mb-4">{t(info)}</p>}
                  <MonthMatrix cities={regionCities} locale={locale} />
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-thailand-blue mb-6">
            {locale === 'nl' ? 'Veelgestelde vragen over reistijd' : 'Best Time FAQ'}
          </h2>
          <div className="space-y-4">
            {SEASON_FAQ.map((item, i) => (
              <details key={i} className="group bg-white rounded-xl border p-4">
                <summary className="font-semibold text-thailand-blue cursor-pointer list-none flex items-center justify-between">
                  {t(item.q)}
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-gray-600 leading-relaxed">{t(item.a)}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Links to city weather pages */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-thailand-blue mb-4">
            {locale === 'nl' ? 'Gedetailleerd weer per bestemming' : 'Detailed Weather by Destination'}
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {data.cities.map(city => {
              const name = (city.name as Record<string, string>)[locale] || city.name.en;
              return (
                <Link key={city.slug} href={`/city/${city.slug}/best-time-to-visit/`} className="text-sm text-thailand-blue hover:text-thailand-red transition-colors py-1">
                  {name} →
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const data = require('../../data/thailand-index.json');
  return {
    props: { data },
    revalidate: 86400,
  };
};
```

**Step 2: Verify page loads**

Run: `npm run dev`, navigate to `http://localhost:3000/thailand-index/best-time/`
Expected: Full month matrix, per-region breakdown, FAQ, city weather links.

**Step 3: Commit**

```bash
git add pages/thailand-index/best-time.tsx
git commit -m "feat: add Thailand Index best-time subpage with weather matrix by region"
```

---

### Task 7: Build Integration & Sitemap

**Files:**
- Modify: `package.json` (add `data:index` to `data:generate`)
- Modify: `lib/sitemap.js` (add `/thailand-index/` pages to sitemap)

**Step 1: Update package.json scripts**

Add `"data:index": "node scripts/generate-index-data.js"` to scripts, and append `&& npm run data:index` to the end of the `data:generate` script.

**Step 2: Add thailand-index pages to sitemap**

In `lib/sitemap.js`, find where static pages are added and add:
```javascript
// Thailand Index pages
const indexPages = ['thailand-index', 'thailand-index/budget', 'thailand-index/best-time'];
indexPages.forEach(page => {
  urls.push({ url: `/${page}/`, changefreq: 'monthly', priority: 0.8 });
});
```

**Step 3: Run full pipeline**

Run: `npm run data:index && npm run dev`
Expected: `data/thailand-index.json` regenerated, dev server starts, all 3 pages accessible.

**Step 4: Commit**

```bash
git add package.json lib/sitemap.js
git commit -m "feat: integrate Thailand Index into data pipeline and sitemap"
```

---

### Task 8: Visual Review & Polish

**Files:**
- May modify: any component or page from Tasks 3-6

**Step 1: Run dev server and visually review all pages**

Run: `npm run dev`

Check each page at:
- `http://localhost:3000/thailand-index/`
- `http://localhost:3000/thailand-index/budget/`
- `http://localhost:3000/thailand-index/best-time/`

Verify:
- [ ] Hero renders with correct title
- [ ] TOC sidebar works on desktop (sticky, active section highlighting)
- [ ] TOC mobile button works
- [ ] Table sorts correctly (click headers)
- [ ] Region filter works (click chips)
- [ ] Ranking cards link to city pages
- [ ] Month matrix colors are correct (green = good, red = bad)
- [ ] FAQ sections expand/collapse
- [ ] Breadcrumbs are correct
- [ ] Mobile responsive (check at 375px, 768px)
- [ ] No TypeScript errors in console

**Step 2: Fix any issues found**

**Step 3: Commit**

```bash
git add -A
git commit -m "fix: polish Thailand Index pages after visual review"
```

---

### Task 9: Final Build Verification

**Step 1: Run production build**

Run: `npm run build`
Expected: Build succeeds. Check for:
- No TypeScript errors
- Thailand Index pages generated as static HTML
- No missing data warnings

**Step 2: Check generated pages**

Run: `npm run start`, verify all 3 pages load correctly in production mode.

**Step 3: Final commit if any fixes needed**

```bash
git add -A
git commit -m "fix: resolve build issues for Thailand Index"
```
