import type { CityFoodGuideData } from '../types';
import { bangkokCityFoodNl } from './bangkok';
import { krabiCityFoodNl } from './krabi';
import { phuketCityFoodNl } from './phuket';

const cityFoodGuidesNl: Record<string, CityFoodGuideData> = { bangkok: bangkokCityFoodNl, krabi: krabiCityFoodNl, phuket: phuketCityFoodNl };

export function getNlCityFoodGuide(slug: string): CityFoodGuideData | undefined {
  return cityFoodGuidesNl[slug];
}

export { bangkokCityFoodNl, krabiCityFoodNl, phuketCityFoodNl };
