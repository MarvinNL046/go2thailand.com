// lib/province-types.ts
// Client-safe types for province pages — no fs/path imports

import type { SourceMeta } from './cluster-types';

export interface ProvinceData {
  seo: {
    title: string;
    metaDescription: string;
    slug: string;
  };
  provinceSlug: string;
  provinceName: string;
  provinceNameThai: string;
  region: 'northern' | 'central' | 'southern' | 'isaan' | 'eastern' | 'western';
  capital: string;
  area: number; // km²
  population: number;
  populationYear: number;
  districts: number;
  coordinates: { lat: number; lng: number };
  overview: string;
  geography: string;
  highlights: string[];
  bestTimeToVisit: {
    peak: string;
    shoulder: string;
    lowSeason: string;
    recommendation: string;
  };
  topAttractions: ProvinceAttraction[];
  localFood: string[];
  culture: string;
  gettingThere: string;
  gettingAround: string;
  travelTips: string[];
  neighboringProvinces: Array<{
    name: string;
    slug: string;
  }>;
  // Links to our existing city/cluster pages within this province
  cities: Array<{
    name: string;
    slug: string;
    hasCluster: boolean;
    hasCityPage: boolean;
  }>;
  generatedAt: string;
  lastUpdated: string;
  sources: SourceMeta[];
}

export interface ProvinceAttraction {
  name: string;
  description: string;
  type: string;
  entranceFee?: string;
  googleMapsUrl?: string;
  sources?: SourceMeta[];
}

export interface ProvinceManifest {
  provinceSlug: string;
  provinceName: string;
  region: string;
  status: 'draft' | 'published' | 'needs-update';
  generatedAt: string;
  lastVerified: string;
  sourcesCount: number;
}

// Province → Region mapping helper (client-safe)
export function getProvinceLinks(provinceSlug: string, provinceName: string) {
  return {
    province: { href: `/province/${provinceSlug}/`, label: provinceName },
  };
}
