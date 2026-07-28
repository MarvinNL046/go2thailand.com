import type { WeatherGuideData } from '../types';
import { kohSamuiWeatherGuideEn } from './koh-samui';

const weatherGuidesEn: Record<string, WeatherGuideData> = {
  'koh-samui': kohSamuiWeatherGuideEn,
};

export function getEnWeatherGuide(citySlug: string): WeatherGuideData | undefined {
  return weatherGuidesEn[citySlug];
}

export { kohSamuiWeatherGuideEn };
