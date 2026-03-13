// lib/clusters.ts — Server-only data reading functions
// Types are in cluster-types.ts (client-safe)
import fs from 'fs';
import path from 'path';

// Re-export all types so existing imports still work
export type {
  SourceMeta,
  ClusterManifest,
  ClusterSEO,
  ClusterAttraction,
  ClusterHotel,
  ClusterNeighborhood,
  ClusterActivity,
  DestinationHub,
  ThingsToDoPage,
  HotelsPage,
  WhereToStayPage,
  TravelGuidePage,
} from './cluster-types';

import type { ClusterManifest, DestinationHub, ThingsToDoPage, HotelsPage, WhereToStayPage, TravelGuidePage } from './cluster-types';

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
    const manifestPath = path.join(CLUSTERS_DIR, dir, 'manifest.json');
    if (!fs.existsSync(manifestPath)) return false;
    try {
      const manifest: ClusterManifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      return manifest.status === 'published';
    } catch {
      return false;
    }
  });
}

export function hasCluster(citySlug: string): boolean {
  const manifestPath = path.join(CLUSTERS_DIR, citySlug, 'manifest.json');
  return fs.existsSync(manifestPath);
}

export function getClusterManifest(citySlug: string): ClusterManifest | null {
  return readClusterFile<ClusterManifest>(citySlug, 'manifest.json');
}

export function getAllManifests(): ClusterManifest[] {
  const cities = getClusterCities();
  return cities
    .map(slug => getClusterManifest(slug))
    .filter((m): m is ClusterManifest => m !== null);
}

// Internal links for cross-linking within a cluster
export function getClusterLinks(citySlug: string, cityName: string) {
  return {
    hub: { href: `/destinations/${citySlug}/`, label: `${cityName} Travel Guide` },
    thingsToDo: { href: `/things-to-do/${citySlug}/`, label: `Things To Do in ${cityName}` },
    hotels: { href: `/best-hotels/${citySlug}/`, label: `Best Hotels in ${cityName}` },
    whereToStay: { href: `/guides/where-to-stay/${citySlug}/`, label: `Where To Stay in ${cityName}` },
    travelGuide: { href: `/guides/travel-guide/${citySlug}/`, label: `${cityName} Travel Guide` },
    // Cross-links to existing /city/ pages
    cityHub: { href: `/city/${citySlug}/`, label: `Explore ${cityName}` },
    cityAttractions: { href: `/city/${citySlug}/top-10-attractions/`, label: `Top 10 Attractions in ${cityName}` },
    cityHotels: { href: `/city/${citySlug}/top-10-hotels/`, label: `Top 10 Hotels in ${cityName}` },
    cityFood: { href: `/city/${citySlug}/food/`, label: `${cityName} Food Guide` },
    cityWeather: { href: `/city/${citySlug}/weather/`, label: `${cityName} Weather` },
    cityBudget: { href: `/city/${citySlug}/budget/`, label: `${cityName} Budget Guide` },
  };
}
