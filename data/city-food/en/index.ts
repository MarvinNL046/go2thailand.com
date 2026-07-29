import type { CityFoodGuideData } from '../types';
import { ayutthayaCityFoodEn } from './ayutthaya';
import { bangkokCityFoodEn } from './bangkok';
import { chiangRaiCityFoodEn } from './chiang-rai';
import { chiangMaiCityFoodEn } from './chiang-mai';
import { hatYaiCityFoodEn } from './hat-yai';
import { krabiCityFoodEn } from './krabi';
import { pattayaCityFoodEn } from './pattaya';
import { phuketCityFoodEn } from './phuket';

const cityFoodGuidesEn: Record<string, CityFoodGuideData> = {
  ayutthaya: ayutthayaCityFoodEn,
  bangkok: bangkokCityFoodEn,
  'chiang-rai': chiangRaiCityFoodEn,
  'chiang-mai': chiangMaiCityFoodEn,
  'hat-yai': hatYaiCityFoodEn,
  krabi: krabiCityFoodEn,
  pattaya: pattayaCityFoodEn,
  phuket: phuketCityFoodEn,
};

export function getEnCityFoodGuide(slug: string): CityFoodGuideData | undefined {
  return cityFoodGuidesEn[slug];
}
