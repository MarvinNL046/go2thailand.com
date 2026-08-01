import type { DiveGuideData } from '../types';
import { kohTaoDiveGuide } from './koh-tao';

const guides: Record<string, DiveGuideData> = {
  'koh-tao': kohTaoDiveGuide,
};

export function getNlDiveGuide(slug: string): DiveGuideData | undefined {
  return guides[slug];
}

export { kohTaoDiveGuide };
