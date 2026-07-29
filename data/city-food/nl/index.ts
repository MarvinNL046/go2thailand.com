import type { CityFoodGuideData } from '../types';
import { bangkokCityFoodNl } from './bangkok';
import { krabiCityFoodNl } from './krabi';

const cityFoodGuidesNl: Record<string, CityFoodGuideData> = { bangkok: bangkokCityFoodNl, krabi: krabiCityFoodNl };

export function getNlCityFoodGuide(slug: string): CityFoodGuideData | undefined {
  return cityFoodGuidesNl[slug];
}

export { bangkokCityFoodNl, krabiCityFoodNl };
