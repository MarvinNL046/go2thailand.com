import { banKrutDestinationGuideEn } from "./ban-krut";
import { buengKanDestinationGuideEn } from "./bueng-kan";
import { chanthaburiDestinationGuideEn } from "./chanthaburi";
import { chiangKhanDestinationGuideEn } from "./chiang-khan";
import { hatYaiDestinationGuideEn } from "./hat-yai";
import { khonKaenDestinationGuideEn } from "./khon-kaen";
import { khaoSokDestinationGuideEn } from "./khao-sok";
import { lampangDestinationGuideEn } from "./lampang";
import { lopburiDestinationGuideEn } from "./lopburi";
import { maeHongSonDestinationGuideEn } from "./mae-hong-son";
import { mukdahanDestinationGuideEn } from "./mukdahan";
import { nakhonPhanomDestinationGuideEn } from "./nakhon-phanom";
import { nakhonRatchasimaDestinationGuideEn } from "./nakhon-ratchasima";
import { nongKhaiDestinationGuideEn } from "./nong-khai";
import { phitsanulokDestinationGuideEn } from "./phitsanulok";
import { sukhothaiDestinationGuideEn } from "./sukhothai";
import { trangDestinationGuideEn } from "./trang";
import { ubonRatchathaniDestinationGuideEn } from "./ubon-ratchathani";
import { udonThaniDestinationGuideEn } from "./udon-thani";
import type { DestinationGuideData } from "../types";

const guides: Record<string, DestinationGuideData> = {
  "ban-krut": banKrutDestinationGuideEn,
  "bueng-kan": buengKanDestinationGuideEn,
  "chanthaburi": chanthaburiDestinationGuideEn,
  "chiang-khan": chiangKhanDestinationGuideEn,
  "hat-yai": hatYaiDestinationGuideEn,
  "khon-kaen": khonKaenDestinationGuideEn,
  "khao-sok": khaoSokDestinationGuideEn,
  lampang: lampangDestinationGuideEn,
  lopburi: lopburiDestinationGuideEn,
  "mae-hong-son": maeHongSonDestinationGuideEn,
  "mukdahan": mukdahanDestinationGuideEn,
  "nakhon-phanom": nakhonPhanomDestinationGuideEn,
  "nakhon-ratchasima": nakhonRatchasimaDestinationGuideEn,
  "nong-khai": nongKhaiDestinationGuideEn,
  phitsanulok: phitsanulokDestinationGuideEn,
  sukhothai: sukhothaiDestinationGuideEn,
  "trang": trangDestinationGuideEn,
  "ubon-ratchathani": ubonRatchathaniDestinationGuideEn,
  "udon-thani": udonThaniDestinationGuideEn,
};

export function getEnDestinationGuide(citySlug: string) {
  return guides[citySlug];
}

export { banKrutDestinationGuideEn, buengKanDestinationGuideEn, chanthaburiDestinationGuideEn, chiangKhanDestinationGuideEn, hatYaiDestinationGuideEn, khonKaenDestinationGuideEn, khaoSokDestinationGuideEn, lampangDestinationGuideEn, lopburiDestinationGuideEn, maeHongSonDestinationGuideEn, mukdahanDestinationGuideEn, nakhonPhanomDestinationGuideEn, nakhonRatchasimaDestinationGuideEn, nongKhaiDestinationGuideEn, phitsanulokDestinationGuideEn, sukhothaiDestinationGuideEn, trangDestinationGuideEn, ubonRatchathaniDestinationGuideEn, udonThaniDestinationGuideEn };
