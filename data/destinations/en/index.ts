import { banKrutDestinationGuideEn } from "./ban-krut";
import { ayutthayaDestinationGuideEn } from "./ayutthaya";
import { bangkokDestinationGuideEn } from "./bangkok";
import { buengKanDestinationGuideEn } from "./bueng-kan";
import { chanthaburiDestinationGuideEn } from "./chanthaburi";
import { chiangKhanDestinationGuideEn } from "./chiang-khan";
import { chiangMaiDestinationGuideEn } from "./chiang-mai";
import { chiangRaiDestinationGuideEn } from "./chiang-rai";
import { hatYaiDestinationGuideEn } from "./hat-yai";
import { huaHinDestinationGuideEn } from "./hua-hin";
import { khonKaenDestinationGuideEn } from "./khon-kaen";
import { khaoSokDestinationGuideEn } from "./khao-sok";
import { kanchanaburiDestinationGuideEn } from "./kanchanaburi";
import { lampangDestinationGuideEn } from "./lampang";
import { lopburiDestinationGuideEn } from "./lopburi";
import { maeHongSonDestinationGuideEn } from "./mae-hong-son";
import { mukdahanDestinationGuideEn } from "./mukdahan";
import { nakhonPhanomDestinationGuideEn } from "./nakhon-phanom";
import { nakhonRatchasimaDestinationGuideEn } from "./nakhon-ratchasima";
import { nongKhaiDestinationGuideEn } from "./nong-khai";
import { paiDestinationGuideEn } from "./pai";
import { phitsanulokDestinationGuideEn } from "./phitsanulok";
import { sukhothaiDestinationGuideEn } from "./sukhothai";
import { suratThaniDestinationGuideEn } from "./surat-thani";
import { trangDestinationGuideEn } from "./trang";
import { ubonRatchathaniDestinationGuideEn } from "./ubon-ratchathani";
import { udonThaniDestinationGuideEn } from "./udon-thani";
import type { DestinationGuideData } from "../types";

const guides: Record<string, DestinationGuideData> = {
  ayutthaya: ayutthayaDestinationGuideEn,
  bangkok: bangkokDestinationGuideEn,
  "ban-krut": banKrutDestinationGuideEn,
  "bueng-kan": buengKanDestinationGuideEn,
  "chanthaburi": chanthaburiDestinationGuideEn,
  "chiang-khan": chiangKhanDestinationGuideEn,
  "chiang-mai": chiangMaiDestinationGuideEn,
  "chiang-rai": chiangRaiDestinationGuideEn,
  "hat-yai": hatYaiDestinationGuideEn,
  "hua-hin": huaHinDestinationGuideEn,
  "khon-kaen": khonKaenDestinationGuideEn,
  "khao-sok": khaoSokDestinationGuideEn,
  kanchanaburi: kanchanaburiDestinationGuideEn,
  lampang: lampangDestinationGuideEn,
  lopburi: lopburiDestinationGuideEn,
  "mae-hong-son": maeHongSonDestinationGuideEn,
  "mukdahan": mukdahanDestinationGuideEn,
  "nakhon-phanom": nakhonPhanomDestinationGuideEn,
  "nakhon-ratchasima": nakhonRatchasimaDestinationGuideEn,
  "nong-khai": nongKhaiDestinationGuideEn,
  pai: paiDestinationGuideEn,
  phitsanulok: phitsanulokDestinationGuideEn,
  sukhothai: sukhothaiDestinationGuideEn,
  "surat-thani": suratThaniDestinationGuideEn,
  "trang": trangDestinationGuideEn,
  "ubon-ratchathani": ubonRatchathaniDestinationGuideEn,
  "udon-thani": udonThaniDestinationGuideEn,
};

export function getEnDestinationGuide(citySlug: string) {
  return guides[citySlug];
}

export { ayutthayaDestinationGuideEn, bangkokDestinationGuideEn, banKrutDestinationGuideEn, buengKanDestinationGuideEn, chanthaburiDestinationGuideEn, chiangKhanDestinationGuideEn, chiangMaiDestinationGuideEn, chiangRaiDestinationGuideEn, hatYaiDestinationGuideEn, huaHinDestinationGuideEn, khonKaenDestinationGuideEn, khaoSokDestinationGuideEn, kanchanaburiDestinationGuideEn, lampangDestinationGuideEn, lopburiDestinationGuideEn, maeHongSonDestinationGuideEn, mukdahanDestinationGuideEn, nakhonPhanomDestinationGuideEn, nakhonRatchasimaDestinationGuideEn, nongKhaiDestinationGuideEn, paiDestinationGuideEn, phitsanulokDestinationGuideEn, sukhothaiDestinationGuideEn, suratThaniDestinationGuideEn, trangDestinationGuideEn, ubonRatchathaniDestinationGuideEn, udonThaniDestinationGuideEn };
