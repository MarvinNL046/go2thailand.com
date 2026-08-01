import type { AttractionGuideData } from '../types';
import { kohTaoAttractionsGuideEn } from './koh-tao';

const guides: Record<string, AttractionGuideData> = {
  'koh-tao': kohTaoAttractionsGuideEn,
};

export function getEnAttractionsGuide(citySlug: string) {
  return guides[citySlug];
}

export { kohTaoAttractionsGuideEn };
