import type { CityFoodGuideData } from '../types';
import { ayutthayaCityFoodNl } from './ayutthaya';
import { bangkokCityFoodNl } from './bangkok';
import { chanthaburiCityFoodNl } from './chanthaburi';
import { chumphonCityFoodNl } from './chumphon';
import { chiangRaiCityFoodNl } from './chiang-rai';
import { chiangMaiCityFoodNl } from './chiang-mai';
import { hatYaiCityFoodNl } from './hat-yai';
import { huaHinCityFoodNl } from './hua-hin';
import { krabiCityFoodNl } from './krabi';
import { khonKaenCityFoodNl } from './khon-kaen';
import { kanchanaburiCityFoodNl } from './kanchanaburi';
import { kohSamuiCityFoodNl } from './koh-samui';
import { lampangCityFoodNl } from './lampang';
import { lopburiCityFoodNl } from './lopburi';
import { maeHongSonCityFoodNl } from './mae-hong-son';
import { nakhonRatchasimaCityFoodNl } from './nakhon-ratchasima';
import { nakhonSiThammaratCityFoodNl } from './nakhon-si-thammarat';
import { pattayaCityFoodNl } from './pattaya';
import { phitsanulokCityFoodNl } from './phitsanulok';
import { paiCityFoodNl } from './pai';
import { phuketCityFoodNl } from './phuket';
import { rayongCityFoodNl } from './rayong';
import { sukhothaiCityFoodNl } from './sukhothai';
import { suratThaniCityFoodNl } from './surat-thani';
import { tratCityFoodNl } from './trat';
import { trangCityFoodNl } from './trang';
import { udonThaniCityFoodNl } from './udon-thani';
import { ubonRatchathaniCityFoodNl } from './ubon-ratchathani';

const cityFoodGuidesNl: Record<string, CityFoodGuideData> = {
  ayutthaya: ayutthayaCityFoodNl,
  bangkok: bangkokCityFoodNl,
  chanthaburi: chanthaburiCityFoodNl,
  chumphon: chumphonCityFoodNl,
  'chiang-rai': chiangRaiCityFoodNl,
  'chiang-mai': chiangMaiCityFoodNl,
  'hat-yai': hatYaiCityFoodNl,
  'hua-hin': huaHinCityFoodNl,
  krabi: krabiCityFoodNl,
  'khon-kaen': khonKaenCityFoodNl,
  kanchanaburi: kanchanaburiCityFoodNl,
  'koh-samui': kohSamuiCityFoodNl,
  lampang: lampangCityFoodNl,
  lopburi: lopburiCityFoodNl,
  'mae-hong-son': maeHongSonCityFoodNl,
  'nakhon-ratchasima': nakhonRatchasimaCityFoodNl,
  'nakhon-si-thammarat': nakhonSiThammaratCityFoodNl,
  pattaya: pattayaCityFoodNl,
  phitsanulok: phitsanulokCityFoodNl,
  pai: paiCityFoodNl,
  phuket: phuketCityFoodNl,
  rayong: rayongCityFoodNl,
  sukhothai: sukhothaiCityFoodNl,
  'surat-thani': suratThaniCityFoodNl,
  trat: tratCityFoodNl,
  trang: trangCityFoodNl,
  'udon-thani': udonThaniCityFoodNl,
  'ubon-ratchathani': ubonRatchathaniCityFoodNl,
};

export function getNlCityFoodGuide(slug: string): CityFoodGuideData | undefined {
  return cityFoodGuidesNl[slug];
}

export { ayutthayaCityFoodNl, bangkokCityFoodNl, chanthaburiCityFoodNl, chumphonCityFoodNl, chiangRaiCityFoodNl, chiangMaiCityFoodNl, hatYaiCityFoodNl, huaHinCityFoodNl, kanchanaburiCityFoodNl, kohSamuiCityFoodNl, khonKaenCityFoodNl, krabiCityFoodNl, lampangCityFoodNl, lopburiCityFoodNl, maeHongSonCityFoodNl, nakhonRatchasimaCityFoodNl, nakhonSiThammaratCityFoodNl, paiCityFoodNl, pattayaCityFoodNl, phitsanulokCityFoodNl, phuketCityFoodNl, rayongCityFoodNl, sukhothaiCityFoodNl, suratThaniCityFoodNl, trangCityFoodNl, tratCityFoodNl, ubonRatchathaniCityFoodNl, udonThaniCityFoodNl };
