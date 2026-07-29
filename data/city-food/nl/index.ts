import type { CityFoodGuideData } from '../types';
import { bangkokCityFoodNl } from './bangkok';
import { chiangMaiCityFoodNl } from './chiang-mai';
import { krabiCityFoodNl } from './krabi';
import { pattayaCityFoodNl } from './pattaya';
import { phuketCityFoodNl } from './phuket';

const cityFoodGuidesNl: Record<string, CityFoodGuideData> = {
  bangkok: bangkokCityFoodNl,
  'chiang-mai': chiangMaiCityFoodNl,
  krabi: krabiCityFoodNl,
  pattaya: pattayaCityFoodNl,
  phuket: phuketCityFoodNl,
};

export function getNlCityFoodGuide(slug: string): CityFoodGuideData | undefined {
  return cityFoodGuidesNl[slug];
}

export { bangkokCityFoodNl, chiangMaiCityFoodNl, krabiCityFoodNl, pattayaCityFoodNl, phuketCityFoodNl };
