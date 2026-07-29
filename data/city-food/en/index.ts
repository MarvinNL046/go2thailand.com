import type { CityFoodGuideData } from '../types';
import { bangkokCityFoodEn } from './bangkok';
import { chiangMaiCityFoodEn } from './chiang-mai';

const cityFoodGuidesEn: Record<string, CityFoodGuideData> = {
  bangkok: bangkokCityFoodEn,
  'chiang-mai': chiangMaiCityFoodEn,
};

export function getEnCityFoodGuide(slug: string): CityFoodGuideData | undefined {
  return cityFoodGuidesEn[slug];
}
