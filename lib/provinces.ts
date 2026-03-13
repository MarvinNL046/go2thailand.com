// lib/provinces.ts — Server-only data reading for provinces
import fs from 'fs';
import path from 'path';

export type { ProvinceData, ProvinceManifest, ProvinceAttraction } from './province-types';

import type { ProvinceData, ProvinceManifest } from './province-types';

const PROVINCES_DIR = path.join(process.cwd(), 'data', 'provinces');

function readProvinceFile<T>(provinceSlug: string, fileName: string): T | null {
  try {
    const filePath = path.join(PROVINCES_DIR, provinceSlug, fileName);
    if (!fs.existsSync(filePath)) return null;
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return null;
  }
}

export function getProvince(provinceSlug: string): ProvinceData | null {
  return readProvinceFile<ProvinceData>(provinceSlug, 'province.json');
}

export function getProvinceManifest(provinceSlug: string): ProvinceManifest | null {
  return readProvinceFile<ProvinceManifest>(provinceSlug, 'manifest.json');
}

export function getPublishedProvinces(): string[] {
  if (!fs.existsSync(PROVINCES_DIR)) return [];
  return fs.readdirSync(PROVINCES_DIR).filter(dir => {
    const manifestPath = path.join(PROVINCES_DIR, dir, 'manifest.json');
    if (!fs.existsSync(manifestPath)) return false;
    try {
      const manifest: ProvinceManifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      return manifest.status === 'published';
    } catch {
      return false;
    }
  });
}

export function getAllProvinceManifests(): ProvinceManifest[] {
  const provinces = getPublishedProvinces();
  return provinces
    .map(slug => getProvinceManifest(slug))
    .filter((m): m is ProvinceManifest => m !== null);
}
