import type { CityFoodGuideData } from '../types';
import { ayutthayaCityFoodNl } from './ayutthaya';
import { bangkokCityFoodNl } from './bangkok';
import { chiangRaiCityFoodNl } from './chiang-rai';
import { chiangMaiCityFoodNl } from './chiang-mai';
import { hatYaiCityFoodNl } from './hat-yai';
import { krabiCityFoodNl } from './krabi';
import { maeHongSonCityFoodNl } from './mae-hong-son';
import { pattayaCityFoodNl } from './pattaya';
import { paiCityFoodNl } from './pai';
import { phuketCityFoodNl } from './phuket';
import { sukhothaiCityFoodNl } from './sukhothai';
import { suratThaniCityFoodNl } from './surat-thani';

const cityFoodGuidesNl: Record<string, CityFoodGuideData> = {
  ayutthaya: ayutthayaCityFoodNl,
  bangkok: bangkokCityFoodNl,
  'chiang-rai': chiangRaiCityFoodNl,
  'chiang-mai': chiangMaiCityFoodNl,
  'hat-yai': hatYaiCityFoodNl,
  krabi: krabiCityFoodNl,
  'mae-hong-son': maeHongSonCityFoodNl,
  pattaya: pattayaCityFoodNl,
  pai: paiCityFoodNl,
  phuket: phuketCityFoodNl,
  sukhothai: sukhothaiCityFoodNl,
  'surat-thani': suratThaniCityFoodNl,
};

export function getNlCityFoodGuide(slug: string): CityFoodGuideData | undefined {
  return cityFoodGuidesNl[slug];
}

export { ayutthayaCityFoodNl, bangkokCityFoodNl, chiangRaiCityFoodNl, chiangMaiCityFoodNl, hatYaiCityFoodNl, krabiCityFoodNl, maeHongSonCityFoodNl, paiCityFoodNl, pattayaCityFoodNl, phuketCityFoodNl, sukhothaiCityFoodNl, suratThaniCityFoodNl };
