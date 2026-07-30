import type { CityFoodGuideData } from '../types';
import { ayutthayaCityFoodNl } from './ayutthaya';
import { bangkokCityFoodNl } from './bangkok';
import { chiangRaiCityFoodNl } from './chiang-rai';
import { chiangMaiCityFoodNl } from './chiang-mai';
import { hatYaiCityFoodNl } from './hat-yai';
import { huaHinCityFoodNl } from './hua-hin';
import { krabiCityFoodNl } from './krabi';
import { khonKaenCityFoodNl } from './khon-kaen';
import { kanchanaburiCityFoodNl } from './kanchanaburi';
import { lampangCityFoodNl } from './lampang';
import { lopburiCityFoodNl } from './lopburi';
import { maeHongSonCityFoodNl } from './mae-hong-son';
import { nakhonRatchasimaCityFoodNl } from './nakhon-ratchasima';
import { pattayaCityFoodNl } from './pattaya';
import { phitsanulokCityFoodNl } from './phitsanulok';
import { paiCityFoodNl } from './pai';
import { phuketCityFoodNl } from './phuket';
import { sukhothaiCityFoodNl } from './sukhothai';
import { suratThaniCityFoodNl } from './surat-thani';
import { udonThaniCityFoodNl } from './udon-thani';
import { ubonRatchathaniCityFoodNl } from './ubon-ratchathani';

const cityFoodGuidesNl: Record<string, CityFoodGuideData> = {
  ayutthaya: ayutthayaCityFoodNl,
  bangkok: bangkokCityFoodNl,
  'chiang-rai': chiangRaiCityFoodNl,
  'chiang-mai': chiangMaiCityFoodNl,
  'hat-yai': hatYaiCityFoodNl,
  'hua-hin': huaHinCityFoodNl,
  krabi: krabiCityFoodNl,
  'khon-kaen': khonKaenCityFoodNl,
  kanchanaburi: kanchanaburiCityFoodNl,
  lampang: lampangCityFoodNl,
  lopburi: lopburiCityFoodNl,
  'mae-hong-son': maeHongSonCityFoodNl,
  'nakhon-ratchasima': nakhonRatchasimaCityFoodNl,
  pattaya: pattayaCityFoodNl,
  phitsanulok: phitsanulokCityFoodNl,
  pai: paiCityFoodNl,
  phuket: phuketCityFoodNl,
  sukhothai: sukhothaiCityFoodNl,
  'surat-thani': suratThaniCityFoodNl,
  'udon-thani': udonThaniCityFoodNl,
  'ubon-ratchathani': ubonRatchathaniCityFoodNl,
};

export function getNlCityFoodGuide(slug: string): CityFoodGuideData | undefined {
  return cityFoodGuidesNl[slug];
}

export { ayutthayaCityFoodNl, bangkokCityFoodNl, chiangRaiCityFoodNl, chiangMaiCityFoodNl, hatYaiCityFoodNl, huaHinCityFoodNl, kanchanaburiCityFoodNl, khonKaenCityFoodNl, krabiCityFoodNl, lampangCityFoodNl, lopburiCityFoodNl, maeHongSonCityFoodNl, nakhonRatchasimaCityFoodNl, paiCityFoodNl, pattayaCityFoodNl, phitsanulokCityFoodNl, phuketCityFoodNl, sukhothaiCityFoodNl, suratThaniCityFoodNl, ubonRatchathaniCityFoodNl, udonThaniCityFoodNl };
