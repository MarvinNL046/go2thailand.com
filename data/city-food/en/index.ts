import type { CityFoodGuideData } from '../types';
import { ayutthayaCityFoodEn } from './ayutthaya';
import { bangkokCityFoodEn } from './bangkok';
import { buengKanCityFoodEn } from './bueng-kan';
import { chanthaburiCityFoodEn } from './chanthaburi';
import { chiangKhanCityFoodEn } from './chiang-khan';
import { chumphonCityFoodEn } from './chumphon';
import { chiangRaiCityFoodEn } from './chiang-rai';
import { chiangMaiCityFoodEn } from './chiang-mai';
import { hatYaiCityFoodEn } from './hat-yai';
import { huaHinCityFoodEn } from './hua-hin';
import { kanchanaburiCityFoodEn } from './kanchanaburi';
import { khonKaenCityFoodEn } from './khon-kaen';
import { kohSamuiCityFoodEn } from './koh-samui';
import { khaoSokCityFoodEn } from './khao-sok';
import { krabiCityFoodEn } from './krabi';
import { lampangCityFoodEn } from './lampang';
import { maeHongSonCityFoodEn } from './mae-hong-son';
import { nakhonSiThammaratCityFoodEn } from './nakhon-si-thammarat';
import { paiCityFoodEn } from './pai';
import { pattayaCityFoodEn } from './pattaya';
import { phuketCityFoodEn } from './phuket';
import { sukhothaiCityFoodEn } from './sukhothai';
import { suratThaniCityFoodEn } from './surat-thani';

const cityFoodGuidesEn: Record<string, CityFoodGuideData> = {
  ayutthaya: ayutthayaCityFoodEn,
  bangkok: bangkokCityFoodEn,
  'bueng-kan': buengKanCityFoodEn,
  chanthaburi: chanthaburiCityFoodEn,
  'chiang-khan': chiangKhanCityFoodEn,
  chumphon: chumphonCityFoodEn,
  'chiang-rai': chiangRaiCityFoodEn,
  'chiang-mai': chiangMaiCityFoodEn,
  'hat-yai': hatYaiCityFoodEn,
  'hua-hin': huaHinCityFoodEn,
  kanchanaburi: kanchanaburiCityFoodEn,
  'khon-kaen': khonKaenCityFoodEn,
  'koh-samui': kohSamuiCityFoodEn,
  'khao-sok': khaoSokCityFoodEn,
  krabi: krabiCityFoodEn,
  lampang: lampangCityFoodEn,
  'mae-hong-son': maeHongSonCityFoodEn,
  'nakhon-si-thammarat': nakhonSiThammaratCityFoodEn,
  pai: paiCityFoodEn,
  pattaya: pattayaCityFoodEn,
  phuket: phuketCityFoodEn,
  sukhothai: sukhothaiCityFoodEn,
  'surat-thani': suratThaniCityFoodEn,
};

export function getEnCityFoodGuide(slug: string): CityFoodGuideData | undefined {
  return cityFoodGuidesEn[slug];
}
