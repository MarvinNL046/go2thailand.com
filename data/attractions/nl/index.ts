import type { AttractionGuideData } from '../types';
import { bangkokAttractionsGuide } from './bangkok';
import { ayutthayaAttractionsGuide } from './ayutthaya';
import { chiangMaiAttractionsGuide } from './chiang-mai';
import { chiangRaiAttractionsGuide } from './chiang-rai';
import { khaoSokAttractionsGuide } from './khao-sok';
import { kohSamuiAttractionsGuide } from './koh-samui';
import { kohTaoAttractionsGuide } from './koh-tao';
import { phuketAttractionsGuide } from './phuket';
import { sukhothaiAttractionsGuide } from './sukhothai';

const guides: Record<string, AttractionGuideData> = {
  ayutthaya: ayutthayaAttractionsGuide,
  bangkok: bangkokAttractionsGuide,
  'chiang-mai': chiangMaiAttractionsGuide,
  'chiang-rai': chiangRaiAttractionsGuide,
  'khao-sok': khaoSokAttractionsGuide,
  'koh-samui': kohSamuiAttractionsGuide,
  'koh-tao': kohTaoAttractionsGuide,
  phuket: phuketAttractionsGuide,
  sukhothai: sukhothaiAttractionsGuide,
};

export function getNlAttractionsGuide(citySlug: string) {
  return guides[citySlug];
}

export { ayutthayaAttractionsGuide, bangkokAttractionsGuide, chiangMaiAttractionsGuide, chiangRaiAttractionsGuide, khaoSokAttractionsGuide, kohSamuiAttractionsGuide, kohTaoAttractionsGuide, phuketAttractionsGuide, sukhothaiAttractionsGuide };
