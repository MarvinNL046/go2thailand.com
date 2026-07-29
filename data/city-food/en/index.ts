import type { CityFoodGuideData } from '../types';
import { bangkokCityFoodEn } from './bangkok';
import { chiangMaiCityFoodEn } from './chiang-mai';
import { phuketCityFoodEn } from './phuket';

const cityFoodGuidesEn: Record<string, CityFoodGuideData> = {
  bangkok: bangkokCityFoodEn,
  'chiang-mai': chiangMaiCityFoodEn,
  phuket: phuketCityFoodEn,
};

export function getEnCityFoodGuide(slug: string): CityFoodGuideData | undefined {
  return cityFoodGuidesEn[slug];
}
