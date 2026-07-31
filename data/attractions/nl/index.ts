import type { AttractionGuideData } from '../types';
import { bangkokAttractionsGuide } from './bangkok';
import { ayutthayaAttractionsGuide } from './ayutthaya';
import { chiangMaiAttractionsGuide } from './chiang-mai';
import { chiangRaiAttractionsGuide } from './chiang-rai';
import { huaHinAttractionsGuide } from './hua-hin';
import { hatYaiAttractionsGuide } from './hat-yai';
import { khaoSokAttractionsGuide } from './khao-sok';
import { kanchanaburiAttractionsGuide } from './kanchanaburi';
import { kohSamuiAttractionsGuide } from './koh-samui';
import { kohTaoAttractionsGuide } from './koh-tao';
import { phuketAttractionsGuide } from './phuket';
import { paiAttractionsGuide } from './pai';
import { pattayaAttractionsGuide } from './pattaya';
import { sukhothaiAttractionsGuide } from './sukhothai';
import { suratThaniAttractionsGuide } from './surat-thani';
import { maeHongSonAttractionsGuide } from './mae-hong-son';
import { lampangAttractionsGuide } from './lampang';
import { khonKaenAttractionsGuide } from './khon-kaen';
import { udonThaniAttractionsGuide } from './udon-thani';
import { nakhonRatchasimaAttractionsGuide } from './nakhon-ratchasima';
import { ubonRatchathaniAttractionsGuide } from './ubon-ratchathani';

const guides: Record<string, AttractionGuideData> = {
  ayutthaya: ayutthayaAttractionsGuide,
  bangkok: bangkokAttractionsGuide,
  'chiang-mai': chiangMaiAttractionsGuide,
  'chiang-rai': chiangRaiAttractionsGuide,
  'hua-hin': huaHinAttractionsGuide,
  'hat-yai': hatYaiAttractionsGuide,
  'khao-sok': khaoSokAttractionsGuide,
  kanchanaburi: kanchanaburiAttractionsGuide,
  'koh-samui': kohSamuiAttractionsGuide,
  'koh-tao': kohTaoAttractionsGuide,
  phuket: phuketAttractionsGuide,
  pai: paiAttractionsGuide,
  pattaya: pattayaAttractionsGuide,
  sukhothai: sukhothaiAttractionsGuide,
  'surat-thani': suratThaniAttractionsGuide,
  'mae-hong-son': maeHongSonAttractionsGuide,
  lampang: lampangAttractionsGuide,
  'khon-kaen': khonKaenAttractionsGuide,
  'udon-thani': udonThaniAttractionsGuide,
  'nakhon-ratchasima': nakhonRatchasimaAttractionsGuide,
  'ubon-ratchathani': ubonRatchathaniAttractionsGuide,
};

export function getNlAttractionsGuide(citySlug: string) {
  return guides[citySlug];
}

export { ayutthayaAttractionsGuide, bangkokAttractionsGuide, chiangMaiAttractionsGuide, chiangRaiAttractionsGuide, hatYaiAttractionsGuide, huaHinAttractionsGuide, khaoSokAttractionsGuide, kanchanaburiAttractionsGuide, khonKaenAttractionsGuide, kohSamuiAttractionsGuide, kohTaoAttractionsGuide, lampangAttractionsGuide, maeHongSonAttractionsGuide, nakhonRatchasimaAttractionsGuide, paiAttractionsGuide, pattayaAttractionsGuide, phuketAttractionsGuide, sukhothaiAttractionsGuide, suratThaniAttractionsGuide, ubonRatchathaniAttractionsGuide, udonThaniAttractionsGuide };
