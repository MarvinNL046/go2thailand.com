import { banKrutDestinationGuideEn } from "./ban-krut";
import { ayutthayaDestinationGuideEn } from "./ayutthaya";
import { bangkokDestinationGuideEn } from "./bangkok";
import { buengKanDestinationGuideEn } from "./bueng-kan";
import { chanthaburiDestinationGuideEn } from "./chanthaburi";
import { chiangKhanDestinationGuideEn } from "./chiang-khan";
import { chiangMaiDestinationGuideEn } from "./chiang-mai";
import { chiangRaiDestinationGuideEn } from "./chiang-rai";
import { chumphonDestinationGuideEn } from "./chumphon";
import { hatYaiDestinationGuideEn } from "./hat-yai";
import { huaHinDestinationGuideEn } from "./hua-hin";
import { khonKaenDestinationGuideEn } from "./khon-kaen";
import { khaoSokDestinationGuideEn } from "./khao-sok";
import { kanchanaburiDestinationGuideEn } from "./kanchanaburi";
import { kohSamuiDestinationGuideEn } from "./koh-samui";
import { lampangDestinationGuideEn } from "./lampang";
import { lopburiDestinationGuideEn } from "./lopburi";
import { maeHongSonDestinationGuideEn } from "./mae-hong-son";
import { mukdahanDestinationGuideEn } from "./mukdahan";
import { nakhonPhanomDestinationGuideEn } from "./nakhon-phanom";
import { nakhonRatchasimaDestinationGuideEn } from "./nakhon-ratchasima";
import { nakhonSiThammaratDestinationGuideEn } from "./nakhon-si-thammarat";
import { nongKhaiDestinationGuideEn } from "./nong-khai";
import { paiDestinationGuideEn } from "./pai";
import { pattayaDestinationGuideEn } from "./pattaya";
import { phitsanulokDestinationGuideEn } from "./phitsanulok";
import { phuketDestinationGuideEn } from "./phuket";
import { rayongDestinationGuideEn } from "./rayong";
import { sukhothaiDestinationGuideEn } from "./sukhothai";
import { suratThaniDestinationGuideEn } from "./surat-thani";
import { trangDestinationGuideEn } from "./trang";
import { tratDestinationGuideEn } from "./trat";
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
  chumphon: chumphonDestinationGuideEn,
  "hat-yai": hatYaiDestinationGuideEn,
  "hua-hin": huaHinDestinationGuideEn,
  "khon-kaen": khonKaenDestinationGuideEn,
  "khao-sok": khaoSokDestinationGuideEn,
  kanchanaburi: kanchanaburiDestinationGuideEn,
  "koh-samui": kohSamuiDestinationGuideEn,
  lampang: lampangDestinationGuideEn,
  lopburi: lopburiDestinationGuideEn,
  "mae-hong-son": maeHongSonDestinationGuideEn,
  "mukdahan": mukdahanDestinationGuideEn,
  "nakhon-phanom": nakhonPhanomDestinationGuideEn,
  "nakhon-ratchasima": nakhonRatchasimaDestinationGuideEn,
  "nakhon-si-thammarat": nakhonSiThammaratDestinationGuideEn,
  "nong-khai": nongKhaiDestinationGuideEn,
  pai: paiDestinationGuideEn,
  pattaya: pattayaDestinationGuideEn,
  phitsanulok: phitsanulokDestinationGuideEn,
  phuket: phuketDestinationGuideEn,
  rayong: rayongDestinationGuideEn,
  sukhothai: sukhothaiDestinationGuideEn,
  "surat-thani": suratThaniDestinationGuideEn,
  "trang": trangDestinationGuideEn,
  trat: tratDestinationGuideEn,
  "ubon-ratchathani": ubonRatchathaniDestinationGuideEn,
  "udon-thani": udonThaniDestinationGuideEn,
};

export function getEnDestinationGuide(citySlug: string) {
  return guides[citySlug];
}

export { ayutthayaDestinationGuideEn, bangkokDestinationGuideEn, banKrutDestinationGuideEn, buengKanDestinationGuideEn, chanthaburiDestinationGuideEn, chiangKhanDestinationGuideEn, chiangMaiDestinationGuideEn, chiangRaiDestinationGuideEn, chumphonDestinationGuideEn, hatYaiDestinationGuideEn, huaHinDestinationGuideEn, khonKaenDestinationGuideEn, khaoSokDestinationGuideEn, kanchanaburiDestinationGuideEn, kohSamuiDestinationGuideEn, lampangDestinationGuideEn, lopburiDestinationGuideEn, maeHongSonDestinationGuideEn, mukdahanDestinationGuideEn, nakhonPhanomDestinationGuideEn, nakhonRatchasimaDestinationGuideEn, nakhonSiThammaratDestinationGuideEn, nongKhaiDestinationGuideEn, paiDestinationGuideEn, pattayaDestinationGuideEn, phitsanulokDestinationGuideEn, phuketDestinationGuideEn, rayongDestinationGuideEn, sukhothaiDestinationGuideEn, suratThaniDestinationGuideEn, trangDestinationGuideEn, tratDestinationGuideEn, ubonRatchathaniDestinationGuideEn, udonThaniDestinationGuideEn };
