// lib/intent-pages.ts
// Server-side intent architecture helpers for high-intent travel SEO pages.
import fs from 'fs';
import path from 'path';
import type { ClusterHotel, ClusterNeighborhood, HotelsPage, WhereToStayPage } from './cluster-types';
import { normalizeWhereToStay } from './normalize-cluster';

export const SITE_URL = 'https://go2-thailand.com';

export type IntentPageType =
  | 'where-to-stay'
  | 'where-to-stay-audience'
  | 'best-hotels'
  | 'best-hotels-category'
  | 'area'
  | 'hotel'
  | 'comparison';

export interface IntentCanonicalInput {
  pageType: IntentPageType;
  city?: string;
  audience?: string;
  category?: string;
  area?: string;
  hotel?: string;
  comparison?: string;
}

export interface IntentLink {
  href: string;
  label: string;
  intent: 'parent' | 'audience' | 'area' | 'hotel-category' | 'hotel' | 'comparison' | 'city-guide';
  pageType: IntentPageType | 'city-guide';
}

export interface QuickAnswer {
  label: string;
  answer: string;
  href?: string;
}

export interface ComparisonRow {
  label: string;
  bestFor: string;
  priceBand?: string;
  strength: string;
  watchOut?: string;
  href?: string;
}

export interface DecisionGuideItem {
  condition: string;
  recommendation: string;
  href?: string;
}

export interface TopPick {
  name: string;
  reason: string;
  href?: string;
  affiliateUrl?: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface TravelIntentPage {
  slug: string;
  pageType: IntentPageType;
  city?: string;
  cityName?: string;
  area?: string;
  areaName?: string;
  audience?: string;
  category?: string;
  comparison?: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  quickAnswers: QuickAnswer[];
  comparisonTable: ComparisonRow[];
  decisionGuide: DecisionGuideItem[];
  topPicks: TopPick[];
  bookingTips: string[];
  faq: FaqItem[];
  internalLinks: IntentLink[];
  affiliateBlocks: Array<{ placement: string; label: string; href: string }>;
  canonicalUrl: string;
  indexable: boolean;
  source: 'cluster' | 'pseo';
  updatedAt?: string;
  raw: unknown;
}

interface LinkContext {
  pageType: IntentPageType;
  city: string;
  cityName: string;
  audience?: string;
  category?: string;
  area?: string;
}

const CLUSTERS_DIR = path.join(process.cwd(), 'data', 'clusters');
const PSEO_DIR = path.join(process.cwd(), 'data', 'pseo');

const AUDIENCE_LABELS: Record<string, string> = {
  'first-time': 'first-time visitors',
  family: 'families',
  nightlife: 'nightlife lovers',
  budget: 'budget travellers',
  couples: 'couples',
  luxury: 'luxury travellers',
  'digital-nomads': 'digital nomads',
};

const CATEGORY_LABELS: Record<string, string> = {
  budget: 'budget hotels',
  luxury: 'luxury hotels',
  'mid-range': 'mid-range hotels',
  beachfront: 'beachfront hotels',
  boutique: 'boutique hotels',
  family: 'family hotels',
  couples: 'couples hotels',
  'private-pool': 'private pool hotels',
  'old-town': 'old town hotels',
};

function readJson<T>(filePath: string): T | null {
  try {
    if (!fs.existsSync(filePath)) return null;
    return JSON.parse(fs.readFileSync(filePath, 'utf8')) as T;
  } catch {
    return null;
  }
}

function uniqueLinks(links: IntentLink[]): IntentLink[] {
  const seen = new Set<string>();
  return links.filter(link => {
    if (seen.has(link.href)) return false;
    seen.add(link.href);
    return true;
  });
}

export function slugifyAreaName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[&/]/g, ' ')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export function getAudienceLabel(audience: string): string {
  return AUDIENCE_LABELS[audience] || audience.replace(/-/g, ' ');
}

export function getCategoryLabel(category: string): string {
  return CATEGORY_LABELS[category] || category.replace(/-/g, ' ');
}

export function getCanonicalPath(input: IntentCanonicalInput): string {
  switch (input.pageType) {
    case 'where-to-stay':
      return `/where-to-stay/${input.city}/`;
    case 'where-to-stay-audience':
      return `/where-to-stay/${input.city}/${input.audience}/`;
    case 'best-hotels':
      return `/best-hotels/${input.city}/`;
    case 'best-hotels-category':
      return `/best-hotels/${input.city}/${input.category}/`;
    case 'area':
      return `/areas/${input.city}/${input.area}/`;
    case 'hotel':
      return `/hotel/${input.hotel}/`;
    case 'comparison':
      return `/compare/${input.comparison}/`;
    default:
      throw new Error(`Unsupported intent page type: ${input.pageType}`);
  }
}

export function getCanonicalUrl(input: IntentCanonicalInput): string {
  return `${SITE_URL}${getCanonicalPath(input)}`;
}

function getClusterFile<T>(city: string, fileName: string): T | null {
  return readJson<T>(path.join(CLUSTERS_DIR, city, fileName));
}

function getPublishedClusterCities(): string[] {
  if (!fs.existsSync(CLUSTERS_DIR)) return [];
  return fs.readdirSync(CLUSTERS_DIR).filter(city => {
    const manifest = readJson<{ status?: string }>(path.join(CLUSTERS_DIR, city, 'manifest.json'));
    return manifest?.status === 'published';
  });
}

function listPseoRecords<T extends Record<string, unknown>>(dirName: string): T[] {
  const dir = path.join(PSEO_DIR, dirName);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(file => file.endsWith('.json'))
    .map(file => readJson<T>(path.join(dir, file)))
    .filter((record): record is T => record !== null);
}

function listAudiencePages(city: string): Array<{ slug: string; label: string }> {
  return listPseoRecords<{ citySlug?: string; audience?: string }>('where-to-stay')
    .filter(record => record.citySlug === city && typeof record.audience === 'string')
    .map(record => ({
      slug: record.audience as string,
      label: `Where to stay for ${getAudienceLabel(record.audience as string)}`,
    }))
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

function listHotelCategoryPages(city: string): Array<{ slug: string; label: string }> {
  const priority = ['mid-range', 'budget', 'luxury', 'family', 'couples', 'boutique', 'beachfront', 'private-pool', 'old-town'];
  return listPseoRecords<{ citySlug?: string; category?: string }>('best-hotels')
    .filter(record => record.citySlug === city && typeof record.category === 'string')
    .map(record => ({
      slug: record.category as string,
      label: `Best ${getCategoryLabel(record.category as string)}`,
    }))
    .sort((a, b) => {
      const aPriority = priority.indexOf(a.slug);
      const bPriority = priority.indexOf(b.slug);
      if (aPriority !== -1 || bPriority !== -1) {
        return (aPriority === -1 ? 999 : aPriority) - (bPriority === -1 ? 999 : bPriority);
      }
      return a.slug.localeCompare(b.slug);
    });
}

function listAreaPages(city: string): Array<{ slug: string; name: string }> {
  return listPseoRecords<{ citySlug?: string; areaSlug?: string; areaName?: string }>('areas')
    .filter(record => record.citySlug === city && typeof record.areaSlug === 'string')
    .map(record => ({
      slug: record.areaSlug as string,
      name: (record.areaName as string) || slugifyAreaName(record.areaSlug as string),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

function listClusterAreaPages(city: string): Array<{ slug: string; name: string }> {
  const data = getClusterFile<WhereToStayPage>(city, 'where-to-stay.json');
  const neighborhoods = data?.neighborhoods || [];
  return neighborhoods.map(neighborhood => ({
    slug: getAreaSlugByName(city, neighborhood.name),
    name: neighborhood.name,
  }));
}

function getAreaSlugByName(city: string, areaName: string): string {
  const normalizedName = areaName.trim().toLowerCase();
  const exact = listAreaPages(city).find(area => area.name.trim().toLowerCase() === normalizedName);
  return exact?.slug || slugifyAreaName(areaName);
}

export function listIntentPaths(pageType: 'where-to-stay' | 'best-hotels'): Array<{ params: { city: string } }> {
  if (pageType === 'where-to-stay') {
    return getPublishedClusterCities()
      .filter(city => getClusterFile<WhereToStayPage>(city, 'where-to-stay.json') !== null)
      .map(city => ({ params: { city } }));
  }

  return getPublishedClusterCities()
    .filter(city => getClusterFile<HotelsPage>(city, 'hotels.json') !== null)
    .map(city => ({ params: { city } }));
}

export function getIntentInternalLinks(context: LinkContext): IntentLink[] {
  const { city, cityName } = context;
  const links: IntentLink[] = [];

  if (context.pageType !== 'where-to-stay') {
    links.push({
      href: getCanonicalPath({ pageType: 'where-to-stay', city }),
      label: `Where to stay in ${cityName}`,
      intent: 'parent',
      pageType: 'where-to-stay',
    });
  }

  if (context.pageType !== 'best-hotels') {
    links.push({
      href: getCanonicalPath({ pageType: 'best-hotels', city }),
      label: `Best hotels in ${cityName}`,
      intent: 'parent',
      pageType: 'best-hotels',
    });
  }

  for (const audience of listAudiencePages(city).filter(item => item.slug !== context.audience).slice(0, 6)) {
    links.push({
      href: getCanonicalPath({ pageType: 'where-to-stay-audience', city, audience: audience.slug }),
      label: audience.label,
      intent: 'audience',
      pageType: 'where-to-stay-audience',
    });
  }

  for (const category of listHotelCategoryPages(city).filter(item => item.slug !== context.category).slice(0, 5)) {
    links.push({
      href: getCanonicalPath({ pageType: 'best-hotels-category', city, category: category.slug }),
      label: category.label,
      intent: 'hotel-category',
      pageType: 'best-hotels-category',
    });
  }

  const prioritizedAreas = [
    ...listClusterAreaPages(city),
    ...listAreaPages(city),
  ].filter(item => item.slug !== context.area);

  for (const area of prioritizedAreas.slice(0, 10)) {
    links.push({
      href: getCanonicalPath({ pageType: 'area', city, area: area.slug }),
      label: `Stay in ${area.name}`,
      intent: 'area',
      pageType: 'area',
    });
  }

  links.push({
    href: `/city/${city}/`,
    label: `${cityName} travel guide`,
    intent: 'city-guide',
    pageType: 'city-guide',
  });

  return uniqueLinks(links);
}

function buildWhereToStayQuickAnswers(city: string, neighborhoods: ClusterNeighborhood[]): QuickAnswer[] {
  return neighborhoods.slice(0, 4).map((neighborhood, index) => ({
    label: index === 0 ? 'Best overall area' : neighborhood.bestFor.split(',')[0]?.trim() || 'Good fit',
    answer: neighborhood.name,
    href: getCanonicalPath({ pageType: 'area', city, area: getAreaSlugByName(city, neighborhood.name) }),
  }));
}

function buildWhereToStayComparison(city: string, neighborhoods: ClusterNeighborhood[]): ComparisonRow[] {
  return neighborhoods.map(neighborhood => ({
    label: neighborhood.name,
    bestFor: neighborhood.bestFor,
    priceBand: neighborhood.priceLevel,
    strength: neighborhood.highlights?.[0] || neighborhood.description,
    watchOut: neighborhood.transportNotes?.[0],
    href: getCanonicalPath({ pageType: 'area', city, area: getAreaSlugByName(city, neighborhood.name) }),
  }));
}

function buildWhereToStayDecisionGuide(city: string, neighborhoods: ClusterNeighborhood[]): DecisionGuideItem[] {
  return neighborhoods.slice(0, 6).map(neighborhood => ({
    condition: `If you want ${neighborhood.bestFor.toLowerCase()}`,
    recommendation: `choose ${neighborhood.name}`,
    href: getCanonicalPath({ pageType: 'area', city, area: getAreaSlugByName(city, neighborhood.name) }),
  }));
}

function buildWhereToStayTopPicks(city: string, neighborhoods: ClusterNeighborhood[]): TopPick[] {
  return neighborhoods.slice(0, 5).map(neighborhood => ({
    name: neighborhood.name,
    reason: neighborhood.description,
    href: getCanonicalPath({ pageType: 'area', city, area: getAreaSlugByName(city, neighborhood.name) }),
  }));
}

function buildHotelTopPicks(hotels: ClusterHotel[]): TopPick[] {
  return hotels.slice(0, 6).map(hotel => ({
    name: hotel.name,
    reason: hotel.description,
    affiliateUrl: hotel.bookingUrl,
  }));
}

export function getWhereToStayIntentPage(city: string): TravelIntentPage | null {
  const raw = getClusterFile<WhereToStayPage>(city, 'where-to-stay.json');
  if (!raw) return null;

  const data = normalizeWhereToStay(raw) as WhereToStayPage;
  const canonicalInput: IntentCanonicalInput = { pageType: 'where-to-stay', city };
  const neighborhoods = data.neighborhoods || [];

  return {
    slug: getCanonicalPath(canonicalInput),
    pageType: 'where-to-stay',
    city,
    cityName: data.cityName,
    primaryKeyword: `where to stay in ${data.cityName}`,
    secondaryKeywords: [
      `best areas to stay in ${data.cityName}`,
      `${data.cityName} neighborhoods`,
      `${data.cityName} hotel areas`,
    ],
    title: data.seo.title,
    metaTitle: data.seo.title,
    metaDescription: data.seo.metaDescription,
    h1: `Where to stay in ${data.cityName}`,
    intro: data.intro,
    quickAnswers: buildWhereToStayQuickAnswers(city, neighborhoods),
    comparisonTable: buildWhereToStayComparison(city, neighborhoods),
    decisionGuide: buildWhereToStayDecisionGuide(city, neighborhoods),
    topPicks: buildWhereToStayTopPicks(city, neighborhoods),
    bookingTips: data.generalTips || [],
    faq: [],
    internalLinks: getIntentInternalLinks({ pageType: 'where-to-stay', city, cityName: data.cityName }),
    affiliateBlocks: [],
    canonicalUrl: getCanonicalUrl(canonicalInput),
    indexable: true,
    source: 'cluster',
    updatedAt: data.lastUpdated || data.generatedAt,
    raw: data,
  };
}

export function getBestHotelsIntentPage(city: string): TravelIntentPage | null {
  const data = getClusterFile<HotelsPage>(city, 'hotels.json');
  if (!data) return null;

  const canonicalInput: IntentCanonicalInput = { pageType: 'best-hotels', city };

  return {
    slug: getCanonicalPath(canonicalInput),
    pageType: 'best-hotels',
    city,
    cityName: data.cityName,
    primaryKeyword: `best hotels in ${data.cityName}`,
    secondaryKeywords: [
      `${data.cityName} hotels`,
      `where to book hotels in ${data.cityName}`,
      `${data.cityName} hotel recommendations`,
    ],
    title: data.seo.title,
    metaTitle: data.seo.title,
    metaDescription: data.seo.metaDescription,
    h1: `Best hotels in ${data.cityName}`,
    intro: data.intro,
    quickAnswers: data.hotels.slice(0, 4).map((hotel, index) => ({
      label: index === 0 ? 'Best overall hotel' : hotel.category,
      answer: hotel.name,
      href: hotel.bookingUrl,
    })),
    comparisonTable: data.hotels.map(hotel => ({
      label: hotel.name,
      bestFor: hotel.bestFor?.join(', ') || hotel.category,
      priceBand: hotel.priceRange,
      strength: hotel.highlights?.[0] || hotel.description,
      watchOut: hotel.area,
      href: hotel.bookingUrl,
    })),
    decisionGuide: data.hotels.slice(0, 6).map(hotel => ({
      condition: `If you want ${hotel.category} in ${hotel.area}`,
      recommendation: `compare ${hotel.name}`,
      href: hotel.bookingUrl,
    })),
    topPicks: buildHotelTopPicks(data.hotels),
    bookingTips: data.bookingTips || [],
    faq: [],
    internalLinks: getIntentInternalLinks({ pageType: 'best-hotels', city, cityName: data.cityName }),
    affiliateBlocks: [],
    canonicalUrl: getCanonicalUrl(canonicalInput),
    indexable: true,
    source: 'cluster',
    updatedAt: data.lastUpdated || data.generatedAt,
    raw: data,
  };
}
