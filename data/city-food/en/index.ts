import type { CityFoodGuideData } from '../types';
import { ayutthayaCityFoodEn } from './ayutthaya';
import { bangkokCityFoodEn } from './bangkok';
import { buengKanCityFoodEn } from './bueng-kan';
import { chanthaburiCityFoodEn } from './chanthaburi';
import { chiangKhanCityFoodEn } from './chiang-khan';
import { chiangRaiCityFoodEn } from './chiang-rai';
import { chiangMaiCityFoodEn } from './chiang-mai';
import { hatYaiCityFoodEn } from './hat-yai';
import { huaHinCityFoodEn } from './hua-hin';
import { kanchanaburiCityFoodEn } from './kanchanaburi';
import { khaoSokCityFoodEn } from './khao-sok';
import { krabiCityFoodEn } from './krabi';
import { pattayaCityFoodEn } from './pattaya';
import { phuketCityFoodEn } from './phuket';
import { sukhothaiCityFoodEn } from './sukhothai';

const cityFoodGuidesEn: Record<string, CityFoodGuideData> = {
  ayutthaya: ayutthayaCityFoodEn,
  bangkok: bangkokCityFoodEn,
  'bueng-kan': buengKanCityFoodEn,
  chanthaburi: chanthaburiCityFoodEn,
  'chiang-khan': chiangKhanCityFoodEn,
  'chiang-rai': chiangRaiCityFoodEn,
  'chiang-mai': chiangMaiCityFoodEn,
  'hat-yai': hatYaiCityFoodEn,
  'hua-hin': huaHinCityFoodEn,
  kanchanaburi: kanchanaburiCityFoodEn,
  'khao-sok': khaoSokCityFoodEn,
  krabi: krabiCityFoodEn,
  pattaya: pattayaCityFoodEn,
  phuket: phuketCityFoodEn,
  sukhothai: sukhothaiCityFoodEn,
};

export function getEnCityFoodGuide(slug: string): CityFoodGuideData | undefined {
  return cityFoodGuidesEn[slug];
}
