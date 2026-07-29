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
import { lopburiCityFoodEn } from './lopburi';
import { maeHongSonCityFoodEn } from './mae-hong-son';
import { nakhonRatchasimaCityFoodEn } from './nakhon-ratchasima';
import { nakhonSiThammaratCityFoodEn } from './nakhon-si-thammarat';
import { nongKhaiCityFoodEn } from './nong-khai';
import { paiCityFoodEn } from './pai';
import { pattayaCityFoodEn } from './pattaya';
import { phitsanulokCityFoodEn } from './phitsanulok';
import { phuketCityFoodEn } from './phuket';
import { rayongCityFoodEn } from './rayong';
import { sukhothaiCityFoodEn } from './sukhothai';
import { suratThaniCityFoodEn } from './surat-thani';
import { tratCityFoodEn } from './trat';
import { trangCityFoodEn } from './trang';
import { udonThaniCityFoodEn } from './udon-thani';
import { ubonRatchathaniCityFoodEn } from './ubon-ratchathani';

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
  lopburi: lopburiCityFoodEn,
  'mae-hong-son': maeHongSonCityFoodEn,
  'nakhon-ratchasima': nakhonRatchasimaCityFoodEn,
  'nakhon-si-thammarat': nakhonSiThammaratCityFoodEn,
  'nong-khai': nongKhaiCityFoodEn,
  pai: paiCityFoodEn,
  pattaya: pattayaCityFoodEn,
  phitsanulok: phitsanulokCityFoodEn,
  phuket: phuketCityFoodEn,
  rayong: rayongCityFoodEn,
  sukhothai: sukhothaiCityFoodEn,
  'surat-thani': suratThaniCityFoodEn,
  trat: tratCityFoodEn,
  trang: trangCityFoodEn,
  'udon-thani': udonThaniCityFoodEn,
  'ubon-ratchathani': ubonRatchathaniCityFoodEn,
};

export function getEnCityFoodGuide(slug: string): CityFoodGuideData | undefined {
  return cityFoodGuidesEn[slug];
}
