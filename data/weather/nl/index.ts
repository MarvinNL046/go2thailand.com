import type { WeatherGuideData } from '../types';
import { bangkokWeatherGuide } from './bangkok';
import { chiangMaiWeatherGuide } from './chiang-mai';
import { krabiWeatherGuide } from './krabi';
import { kohSamuiWeatherGuide } from './koh-samui';
import { phuketWeatherGuide } from './phuket';

const nlWeatherGuides: Record<string, WeatherGuideData> = {
  bangkok: bangkokWeatherGuide,
  'chiang-mai': chiangMaiWeatherGuide,
  krabi: krabiWeatherGuide,
  'koh-samui': kohSamuiWeatherGuide,
  phuket: phuketWeatherGuide,
};

export function getNlWeatherGuide(citySlug: string): WeatherGuideData | undefined {
  return nlWeatherGuides[citySlug];
}

export { bangkokWeatherGuide, chiangMaiWeatherGuide, krabiWeatherGuide, kohSamuiWeatherGuide, phuketWeatherGuide };
