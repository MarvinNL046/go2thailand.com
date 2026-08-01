import type { WeatherGuideData } from '../types';
import { kohSamuiWeatherGuideEn } from './koh-samui';
import { phuketWeatherGuideEn } from './phuket';

const weatherGuidesEn: Record<string, WeatherGuideData> = {
  'koh-samui': kohSamuiWeatherGuideEn,
  phuket: phuketWeatherGuideEn,
};

export function getEnWeatherGuide(citySlug: string): WeatherGuideData | undefined {
  return weatherGuidesEn[citySlug];
}

export { kohSamuiWeatherGuideEn, phuketWeatherGuideEn };
