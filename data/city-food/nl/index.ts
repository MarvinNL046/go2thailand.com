import type { CityFoodGuideData } from '../types';
import { ayutthayaCityFoodNl } from './ayutthaya';
import { bangkokCityFoodNl } from './bangkok';
import { chiangRaiCityFoodNl } from './chiang-rai';
import { chiangMaiCityFoodNl } from './chiang-mai';
import { hatYaiCityFoodNl } from './hat-yai';
import { krabiCityFoodNl } from './krabi';
import { khonKaenCityFoodNl } from './khon-kaen';
import { lampangCityFoodNl } from './lampang';
import { maeHongSonCityFoodNl } from './mae-hong-son';
import { nakhonRatchasimaCityFoodNl } from './nakhon-ratchasima';
import { pattayaCityFoodNl } from './pattaya';
import { paiCityFoodNl } from './pai';
import { phuketCityFoodNl } from './phuket';
import { sukhothaiCityFoodNl } from './sukhothai';
import { suratThaniCityFoodNl } from './surat-thani';
import { udonThaniCityFoodNl } from './udon-thani';

const cityFoodGuidesNl: Record<string, CityFoodGuideData> = {
  ayutthaya: ayutthayaCityFoodNl,
  bangkok: bangkokCityFoodNl,
  'chiang-rai': chiangRaiCityFoodNl,
  'chiang-mai': chiangMaiCityFoodNl,
  'hat-yai': hatYaiCityFoodNl,
  krabi: krabiCityFoodNl,
  'khon-kaen': khonKaenCityFoodNl,
  lampang: lampangCityFoodNl,
  'mae-hong-son': maeHongSonCityFoodNl,
  'nakhon-ratchasima': nakhonRatchasimaCityFoodNl,
  pattaya: pattayaCityFoodNl,
  pai: paiCityFoodNl,
  phuket: phuketCityFoodNl,
  sukhothai: sukhothaiCityFoodNl,
  'surat-thani': suratThaniCityFoodNl,
  'udon-thani': udonThaniCityFoodNl,
};

export function getNlCityFoodGuide(slug: string): CityFoodGuideData | undefined {
  return cityFoodGuidesNl[slug];
}

export { ayutthayaCityFoodNl, bangkokCityFoodNl, chiangRaiCityFoodNl, chiangMaiCityFoodNl, hatYaiCityFoodNl, khonKaenCityFoodNl, krabiCityFoodNl, lampangCityFoodNl, maeHongSonCityFoodNl, nakhonRatchasimaCityFoodNl, paiCityFoodNl, pattayaCityFoodNl, phuketCityFoodNl, sukhothaiCityFoodNl, suratThaniCityFoodNl, udonThaniCityFoodNl };
