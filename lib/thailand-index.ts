/**
 * Thailand Index — TypeScript types and data loader
 *
 * Provides typed access to the aggregated thailand-index.json data
 * used by the /thailand-index/ hub and sub-pages.
 */

import indexData from '../data/thailand-index.json';

// ---------------------------------------------------------------------------
// Bilingual text
// ---------------------------------------------------------------------------

export interface BilingualText {
  en: string;
  nl: string;
}

// ---------------------------------------------------------------------------
// Budget
// ---------------------------------------------------------------------------

export interface BudgetTier {
  min: number;
  max: number | null;
  median: number;
}

export interface CityBudgetRaw {
  budget: string;
  mid: string;
  luxury: string;
}

export interface CityBudget {
  raw: CityBudgetRaw;
  currency: string;
  tier_budget: BudgetTier | null;
  tier_mid: BudgetTier | null;
  tier_luxury: BudgetTier | null;
}

// ---------------------------------------------------------------------------
// Weather
// ---------------------------------------------------------------------------

export type MonthAbbrev =
  | 'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun'
  | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec';

export interface CityWeather {
  raw_best_time_text: string;
  best_months: MonthAbbrev[];
  month_scores: Record<MonthAbbrev, number>;
  avg_temp_c: number;
  rainfall_score: number;
  humidity_score: number;
  comfort_score: number;
}

// ---------------------------------------------------------------------------
// Transport
// ---------------------------------------------------------------------------

export interface TopRoute {
  to: string;
  duration: string;
  modes: string[];
}

export interface CityTransport {
  connections: number;
  unique_destinations: number;
  popular_routes: number;
  hubness: number;
  top_routes: TopRoute[];
}

// ---------------------------------------------------------------------------
// Nomad (enrichment — nullable)
// ---------------------------------------------------------------------------

export interface CityNomad {
  wifi_avg_mbps: number;
  coworking_spaces: number;
  coworking_notable: string[];
  cafe_work_friendly: number;
  nomad_community_size: 'large' | 'medium' | 'small' | 'minimal';
  nomad_score: number;
  visa_options: string[];
  monthly_cost_usd: number;
  best_areas: string[];
  sim_esim_available: boolean;
}

// ---------------------------------------------------------------------------
// Safety (enrichment — nullable)
// ---------------------------------------------------------------------------

export interface CitySafety {
  overall_safety_score: number;
  solo_traveller_safe: number;
  female_solo_safe: number;
  night_safety: number;
  common_risks: string[];
  tourist_police_available: boolean;
  hospital_quality: 'high' | 'medium' | 'low';
  emergency_numbers: Record<string, number>;
}

// ---------------------------------------------------------------------------
// Scores
// ---------------------------------------------------------------------------

export interface CityScores {
  budget_score: number;
  weather_score: number;
  transport_score: number;
  nomad_score: number | null;
  safety_score: number | null;
  overall_score: number;
}

export interface ScoreComponentBudget {
  tier_budget_median_usd: number;
  normalized: number;
}

export interface ScoreComponentWeather {
  comfort_score: number;
  best_month_count: number;
}

export interface ScoreComponentTransport {
  hubness: number;
  popular_count: number;
}

export interface CityScoreComponents {
  budget: ScoreComponentBudget;
  weather: ScoreComponentWeather;
  transport: ScoreComponentTransport;
}

// ---------------------------------------------------------------------------
// Location
// ---------------------------------------------------------------------------

export interface LatLng {
  lat: number;
  lng: number;
}

// ---------------------------------------------------------------------------
// Region
// ---------------------------------------------------------------------------

export interface CityRegionRef {
  slug: string;
  name: BilingualText;
}

export interface Region {
  slug: string;
  name: BilingualText;
  city_slugs: string[];
}

// ---------------------------------------------------------------------------
// City (top-level entry in `cities[]`)
// ---------------------------------------------------------------------------

export interface IndexCity {
  slug: string;
  name: BilingualText;
  image: string;
  region: CityRegionRef | null;
  location: LatLng;
  population: number;
  scores: CityScores;
  score_components: CityScoreComponents;
  budget: CityBudget;
  weather: CityWeather;
  transport: CityTransport;
  nomad: CityNomad | null;
  safety: CitySafety | null;
}

// ---------------------------------------------------------------------------
// Rankings
// ---------------------------------------------------------------------------

export interface RankingItem {
  slug: string;
  name: BilingualText;
  value: number;
  rank: number;
}

export interface Ranking {
  metric: string;
  order: 'asc' | 'desc';
  items: RankingItem[];
}

export type RankingName =
  | 'cheapest'
  | 'most_expensive'
  | 'best_weather_overall'
  | 'most_connected'
  | 'best_nomad'
  | 'safest'
  | 'overall';

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export interface IndexMetadata {
  generated_at: string;
  city_count: number;
  data_version: string;
  source_hashes: Record<string, string>;
  weather_coverage: number;
  transport_routes_count: number;
  regions_count: number;
  nomad_enrichment_count: number;
  safety_enrichment_count: number;
}

// ---------------------------------------------------------------------------
// Root type
// ---------------------------------------------------------------------------

export interface ThailandIndex {
  metadata: IndexMetadata;
  cities: IndexCity[];
  rankings: Record<RankingName, Ranking>;
  regions: Region[];
}

// ---------------------------------------------------------------------------
// Data access — cast once at module level
// ---------------------------------------------------------------------------

const data = indexData as unknown as ThailandIndex;

/**
 * Returns the full ThailandIndex data object.
 */
export function getThailandIndex(): ThailandIndex {
  return data;
}

/**
 * Finds a single city by its URL slug.
 * Returns `undefined` if the slug does not match any city.
 */
export function getCityBySlug(slug: string): IndexCity | undefined {
  return data.cities.find((c) => c.slug === slug);
}

/**
 * Returns a ranking list, optionally trimmed to `limit` entries.
 * Returns `undefined` if the ranking name is not found.
 */
export function getRanking(
  name: RankingName,
  limit?: number
): Ranking | undefined {
  const ranking = data.rankings[name];
  if (!ranking) return undefined;
  if (limit === undefined) return ranking;

  return {
    ...ranking,
    items: ranking.items.slice(0, limit),
  };
}

/**
 * Returns all cities belonging to a given region slug.
 * Falls back to an empty array if the region is not found.
 */
export function getCitiesByRegion(regionSlug: string): IndexCity[] {
  const region = data.regions.find((r) => r.slug === regionSlug);
  if (!region) return [];

  const slugSet = new Set(region.city_slugs);
  return data.cities.filter((c) => slugSet.has(c.slug));
}

/**
 * Returns the display name of a city for the given locale.
 * Falls back to the English name if the locale key is missing.
 */
export function getCityName(
  slug: string,
  locale: string = 'en'
): string {
  const city = getCityBySlug(slug);
  if (!city) return slug;
  const key = locale as keyof BilingualText;
  return city.name[key] || city.name.en;
}
