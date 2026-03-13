// lib/clusters.ts
import fs from 'fs';
import path from 'path';
import { getAffiliates, CityAffiliates } from './affiliates';

// --- Types ---

export interface ClusterSEO {
  title: string;
  metaDescription: string;
  slug: string;
}

export interface ClusterAttraction {
  name: string;
  description: string;
  type: string;
  location?: string;
  entranceFee?: string;
  tips?: string[];
  googleMapsUrl?: string;
}

export interface ClusterHotel {
  name: string;
  category: 'budget' | 'mid-range' | 'luxury';
  priceRange: string;
  area: string;
  description: string;
  highlights?: string[];
}

export interface ClusterNeighborhood {
  name: string;
  description: string;
  bestFor: string;
  priceLevel: string;
  highlights: string[];
  recommendedHotels?: string[];
}

export interface ClusterActivity {
  name: string;
  description: string;
  category: string;
  duration?: string;
  price?: string;
  tips?: string[];
  affiliateType?: 'tours' | 'activities';
}

export interface DestinationHub {
  seo: ClusterSEO;
  citySlug: string;
  cityName: string;
  overview: string;
  highlights: string[];
  bestTimeToVisit: {
    peak: string;
    shoulder: string;
    lowSeason: string;
    recommendation: string;
  };
  topAttractions: ClusterAttraction[];
  travelTips: string[];
  gettingThere: string;
  gettingAround: string;
  generatedAt: string;
}

export interface ThingsToDoPage {
  seo: ClusterSEO;
  citySlug: string;
  cityName: string;
  intro: string;
  activities: ClusterActivity[];
  travelTips: string[];
  generatedAt: string;
}

export interface HotelsPage {
  seo: ClusterSEO;
  citySlug: string;
  cityName: string;
  intro: string;
  hotels: ClusterHotel[];
  bookingTips: string[];
  generatedAt: string;
}

export interface WhereToStayPage {
  seo: ClusterSEO;
  citySlug: string;
  cityName: string;
  intro: string;
  neighborhoods: ClusterNeighborhood[];
  generalTips: string[];
  generatedAt: string;
}

export interface TravelGuidePage {
  seo: ClusterSEO;
  citySlug: string;
  cityName: string;
  intro: string;
  itinerary: {
    title: string;
    days: Array<{
      day: number;
      title: string;
      activities: string[];
    }>;
  };
  transport: {
    fromBangkok: string;
    localTransport: string[];
  };
  food: {
    mustTry: string[];
    foodAreas: string[];
    tips: string[];
  };
  etiquette: string[];
  budget: {
    budget: string;
    midRange: string;
    luxury: string;
  };
  generatedAt: string;
}

// --- Data reading ---

const CLUSTERS_DIR = path.join(process.cwd(), 'data', 'clusters');

function readClusterFile<T>(citySlug: string, fileName: string): T | null {
  try {
    const filePath = path.join(CLUSTERS_DIR, citySlug, fileName);
    if (!fs.existsSync(filePath)) return null;
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return null;
  }
}

export function getDestinationHub(citySlug: string): DestinationHub | null {
  return readClusterFile<DestinationHub>(citySlug, 'destination-hub.json');
}

export function getThingsToDo(citySlug: string): ThingsToDoPage | null {
  return readClusterFile<ThingsToDoPage>(citySlug, 'things-to-do.json');
}

export function getHotelsPage(citySlug: string): HotelsPage | null {
  return readClusterFile<HotelsPage>(citySlug, 'hotels.json');
}

export function getWhereToStay(citySlug: string): WhereToStayPage | null {
  return readClusterFile<WhereToStayPage>(citySlug, 'where-to-stay.json');
}

export function getTravelGuide(citySlug: string): TravelGuidePage | null {
  return readClusterFile<TravelGuidePage>(citySlug, 'travel-guide.json');
}

export function getClusterCities(): string[] {
  if (!fs.existsSync(CLUSTERS_DIR)) return [];
  return fs.readdirSync(CLUSTERS_DIR).filter(dir => {
    const hubPath = path.join(CLUSTERS_DIR, dir, 'destination-hub.json');
    return fs.existsSync(hubPath);
  });
}

export function hasCluster(citySlug: string): boolean {
  const hubPath = path.join(CLUSTERS_DIR, citySlug, 'destination-hub.json');
  return fs.existsSync(hubPath);
}

// Internal links for cross-linking within a cluster
export function getClusterLinks(citySlug: string, cityName: string) {
  return {
    hub: { href: `/destinations/${citySlug}/`, label: `${cityName} Travel Guide` },
    thingsToDo: { href: `/things-to-do/${citySlug}/`, label: `Things To Do in ${cityName}` },
    hotels: { href: `/best/hotels-${citySlug}/`, label: `Best Hotels in ${cityName}` },
    whereToStay: { href: `/guides/where-to-stay-${citySlug}/`, label: `Where To Stay in ${cityName}` },
    travelGuide: { href: `/guides/${citySlug}-travel-guide/`, label: `${cityName} Travel Guide` },
    // Cross-links to existing /city/ pages
    cityHub: { href: `/city/${citySlug}/`, label: `Explore ${cityName}` },
    cityAttractions: { href: `/city/${citySlug}/top-10-attractions/`, label: `Top 10 Attractions in ${cityName}` },
    cityHotels: { href: `/city/${citySlug}/top-10-hotels/`, label: `Top 10 Hotels in ${cityName}` },
    cityFood: { href: `/city/${citySlug}/food/`, label: `${cityName} Food Guide` },
    cityWeather: { href: `/city/${citySlug}/weather/`, label: `${cityName} Weather` },
    cityBudget: { href: `/city/${citySlug}/budget/`, label: `${cityName} Budget Guide` },
  };
}
