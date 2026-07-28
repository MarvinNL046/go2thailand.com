import type { DiveGuideData } from '../types';
import { kohTaoDiveGuideEn } from './koh-tao';

const guides: Record<string, DiveGuideData> = {
  'koh-tao': kohTaoDiveGuideEn,
};

export function getEnDiveGuide(slug: string): DiveGuideData | undefined {
  return guides[slug];
}

export { kohTaoDiveGuideEn };
