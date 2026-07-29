import type { CityFoodGuideData } from '../types';
import { ayutthayaCityFoodEn } from './ayutthaya';
import { bangkokCityFoodEn } from './bangkok';
import { chiangMaiCityFoodEn } from './chiang-mai';
import { pattayaCityFoodEn } from './pattaya';
import { phuketCityFoodEn } from './phuket';

const cityFoodGuidesEn: Record<string, CityFoodGuideData> = {
  ayutthaya: ayutthayaCityFoodEn,
  bangkok: bangkokCityFoodEn,
  'chiang-mai': chiangMaiCityFoodEn,
  pattaya: pattayaCityFoodEn,
  phuket: phuketCityFoodEn,
};

export function getEnCityFoodGuide(slug: string): CityFoodGuideData | undefined {
  return cityFoodGuidesEn[slug];
}
