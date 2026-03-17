// lib/temples.ts — Server-only helper functions for temples cluster data
import fs from 'fs';
import path from 'path';

export interface Temple {
  rank: number;
  name: string;
  slug: string;
  city: string;
  city_slug: string;
  entry_fee: string;
  opening_hours: string | null;
  description: string;
  key_facts: string[];
  type: string;
  google_maps_query: string;
  // Enrichment fields (added per-temple via web search)
  enriched?: boolean;
  address?: string;
  dress_code?: string;
  getting_there?: string;
  visitor_tips?: string[];
  nearby_temples?: string[];
}

interface TemplesData {
  title: string;
  meta_description: string;
  intro: string;
  items: Temple[];
  tips: string[];
}

const TEMPLES_FILE = path.join(process.cwd(), 'data', 'temples.json');

function readTemplesData(): TemplesData | null {
  try {
    return JSON.parse(fs.readFileSync(TEMPLES_FILE, 'utf8')) as TemplesData;
  } catch {
    return null;
  }
}

export function getAllTemples(): Temple[] {
  const data = readTemplesData();
  return data?.items ?? [];
}

export function getTempleBySlug(slug: string): Temple | null {
  const temples = getAllTemples();
  return temples.find((t) => t.slug === slug) ?? null;
}

export function getTempleSlugs(): string[] {
  return getAllTemples().map((t) => t.slug);
}

export function getTemplesByCity(citySlug: string): Temple[] {
  return getAllTemples().filter((t) => t.city_slug === citySlug);
}

export function getNearbyTemples(slug: string, limit = 3): Temple[] {
  const temple = getTempleBySlug(slug);
  if (!temple) return [];
  return getAllTemples()
    .filter((t) => t.city_slug === temple.city_slug && t.slug !== slug)
    .slice(0, limit);
}

export function getTemplesPageMeta(): Pick<TemplesData, 'title' | 'meta_description' | 'intro' | 'tips'> | null {
  const data = readTemplesData();
  if (!data) return null;
  return {
    title: data.title,
    meta_description: data.meta_description,
    intro: data.intro,
    tips: data.tips,
  };
}
