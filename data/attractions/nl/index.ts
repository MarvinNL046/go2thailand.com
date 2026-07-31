import type { AttractionGuideData } from '../types';
import { bangkokAttractionsGuide } from './bangkok';
import { ayutthayaAttractionsGuide } from './ayutthaya';
import { chiangMaiAttractionsGuide } from './chiang-mai';
import { chiangRaiAttractionsGuide } from './chiang-rai';
import { khaoSokAttractionsGuide } from './khao-sok';
import { kanchanaburiAttractionsGuide } from './kanchanaburi';
import { kohSamuiAttractionsGuide } from './koh-samui';
import { kohTaoAttractionsGuide } from './koh-tao';
import { phuketAttractionsGuide } from './phuket';
import { paiAttractionsGuide } from './pai';
import { pattayaAttractionsGuide } from './pattaya';
import { sukhothaiAttractionsGuide } from './sukhothai';

const guides: Record<string, AttractionGuideData> = {
  ayutthaya: ayutthayaAttractionsGuide,
  bangkok: bangkokAttractionsGuide,
  'chiang-mai': chiangMaiAttractionsGuide,
  'chiang-rai': chiangRaiAttractionsGuide,
  'khao-sok': khaoSokAttractionsGuide,
  kanchanaburi: kanchanaburiAttractionsGuide,
  'koh-samui': kohSamuiAttractionsGuide,
  'koh-tao': kohTaoAttractionsGuide,
  phuket: phuketAttractionsGuide,
  pai: paiAttractionsGuide,
  pattaya: pattayaAttractionsGuide,
  sukhothai: sukhothaiAttractionsGuide,
};

export function getNlAttractionsGuide(citySlug: string) {
  return guides[citySlug];
}

export { ayutthayaAttractionsGuide, bangkokAttractionsGuide, chiangMaiAttractionsGuide, chiangRaiAttractionsGuide, khaoSokAttractionsGuide, kanchanaburiAttractionsGuide, kohSamuiAttractionsGuide, kohTaoAttractionsGuide, paiAttractionsGuide, pattayaAttractionsGuide, phuketAttractionsGuide, sukhothaiAttractionsGuide };
