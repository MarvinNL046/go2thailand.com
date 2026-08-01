import type { SnorkelGuideData } from '../types';
import { kohTaoSnorkelGuideEn } from './koh-tao';

const guides: Record<string, SnorkelGuideData> = {
  'koh-tao': kohTaoSnorkelGuideEn,
};

export function getEnSnorkelGuide(slug: string): SnorkelGuideData | undefined {
  return guides[slug];
}

export { kohTaoSnorkelGuideEn };
