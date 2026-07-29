import type { CityFoodGuideData } from '../types';
import { ayutthayaCityFoodNl } from './ayutthaya';
import { bangkokCityFoodNl } from './bangkok';
import { chiangRaiCityFoodNl } from './chiang-rai';
import { chiangMaiCityFoodNl } from './chiang-mai';
import { krabiCityFoodNl } from './krabi';
import { pattayaCityFoodNl } from './pattaya';
import { phuketCityFoodNl } from './phuket';

const cityFoodGuidesNl: Record<string, CityFoodGuideData> = {
  ayutthaya: ayutthayaCityFoodNl,
  bangkok: bangkokCityFoodNl,
  'chiang-rai': chiangRaiCityFoodNl,
  'chiang-mai': chiangMaiCityFoodNl,
  krabi: krabiCityFoodNl,
  pattaya: pattayaCityFoodNl,
  phuket: phuketCityFoodNl,
};

export function getNlCityFoodGuide(slug: string): CityFoodGuideData | undefined {
  return cityFoodGuidesNl[slug];
}

export { ayutthayaCityFoodNl, bangkokCityFoodNl, chiangRaiCityFoodNl, chiangMaiCityFoodNl, krabiCityFoodNl, pattayaCityFoodNl, phuketCityFoodNl };
