import type { SnorkelGuideData } from '../types';
import { kohTaoSnorkelGuide } from './koh-tao';

const guides: Record<string, SnorkelGuideData> = {
  'koh-tao': kohTaoSnorkelGuide,
};

export function getNlSnorkelGuide(slug: string): SnorkelGuideData | undefined {
  return guides[slug];
}

export { kohTaoSnorkelGuide };
