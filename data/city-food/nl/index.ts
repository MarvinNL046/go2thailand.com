import type { CityFoodGuideData } from '../types';
import { ayutthayaCityFoodNl } from './ayutthaya';
import { bangkokCityFoodNl } from './bangkok';
import { buengKanCityFoodNl } from './bueng-kan';
import { chanthaburiCityFoodNl } from './chanthaburi';
import { chiangKhanCityFoodNl } from './chiang-khan';
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
import { nakhonPhanomCityFoodNl } from './nakhon-phanom';
import { nongKhaiCityFoodNl } from './nong-khai';
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
  'bueng-kan': buengKanCityFoodNl,
  chanthaburi: chanthaburiCityFoodNl,
  'chiang-khan': chiangKhanCityFoodNl,
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
  'nakhon-phanom': nakhonPhanomCityFoodNl,
  'nong-khai': nongKhaiCityFoodNl,
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

export { ayutthayaCityFoodNl, bangkokCityFoodNl, buengKanCityFoodNl, chanthaburiCityFoodNl, chiangKhanCityFoodNl, chumphonCityFoodNl, chiangRaiCityFoodNl, chiangMaiCityFoodNl, hatYaiCityFoodNl, huaHinCityFoodNl, kanchanaburiCityFoodNl, kohSamuiCityFoodNl, khonKaenCityFoodNl, krabiCityFoodNl, lampangCityFoodNl, lopburiCityFoodNl, maeHongSonCityFoodNl, nakhonPhanomCityFoodNl, nakhonRatchasimaCityFoodNl, nakhonSiThammaratCityFoodNl, nongKhaiCityFoodNl, paiCityFoodNl, pattayaCityFoodNl, phitsanulokCityFoodNl, phuketCityFoodNl, rayongCityFoodNl, sukhothaiCityFoodNl, suratThaniCityFoodNl, trangCityFoodNl, tratCityFoodNl, ubonRatchathaniCityFoodNl, udonThaniCityFoodNl };
