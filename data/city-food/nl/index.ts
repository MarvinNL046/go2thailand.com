import type { CityFoodGuideData } from '../types';
import { krabiCityFoodNl } from './krabi';

const cityFoodGuidesNl: Record<string, CityFoodGuideData> = { krabi: krabiCityFoodNl };

export function getNlCityFoodGuide(slug: string): CityFoodGuideData | undefined {
  return cityFoodGuidesNl[slug];
}

export { krabiCityFoodNl };
