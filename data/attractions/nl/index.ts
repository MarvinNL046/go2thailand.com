import type { AttractionGuideData } from '../types';
import { bangkokAttractionsGuide } from './bangkok';
import { ayutthayaAttractionsGuide } from './ayutthaya';
import { chiangMaiAttractionsGuide } from './chiang-mai';
import { khaoSokAttractionsGuide } from './khao-sok';
import { kohSamuiAttractionsGuide } from './koh-samui';
import { kohTaoAttractionsGuide } from './koh-tao';
import { phuketAttractionsGuide } from './phuket';

const guides: Record<string, AttractionGuideData> = {
  ayutthaya: ayutthayaAttractionsGuide,
  bangkok: bangkokAttractionsGuide,
  'chiang-mai': chiangMaiAttractionsGuide,
  'khao-sok': khaoSokAttractionsGuide,
  'koh-samui': kohSamuiAttractionsGuide,
  'koh-tao': kohTaoAttractionsGuide,
  phuket: phuketAttractionsGuide,
};

export function getNlAttractionsGuide(citySlug: string) {
  return guides[citySlug];
}

export { ayutthayaAttractionsGuide, bangkokAttractionsGuide, chiangMaiAttractionsGuide, khaoSokAttractionsGuide, kohSamuiAttractionsGuide, kohTaoAttractionsGuide, phuketAttractionsGuide };
