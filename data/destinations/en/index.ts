import { banKrutDestinationGuideEn } from "./ban-krut";
import { buengKanDestinationGuideEn } from "./bueng-kan";
import { chanthaburiDestinationGuideEn } from "./chanthaburi";
import { chiangKhanDestinationGuideEn } from "./chiang-khan";
import { hatYaiDestinationGuideEn } from "./hat-yai";
import { khonKaenDestinationGuideEn } from "./khon-kaen";
import { lampangDestinationGuideEn } from "./lampang";
import { mukdahanDestinationGuideEn } from "./mukdahan";
import { nakhonPhanomDestinationGuideEn } from "./nakhon-phanom";
import { nakhonRatchasimaDestinationGuideEn } from "./nakhon-ratchasima";
import { nongKhaiDestinationGuideEn } from "./nong-khai";
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
  lampang: lampangDestinationGuideEn,
  "mukdahan": mukdahanDestinationGuideEn,
  "nakhon-phanom": nakhonPhanomDestinationGuideEn,
  "nakhon-ratchasima": nakhonRatchasimaDestinationGuideEn,
  "nong-khai": nongKhaiDestinationGuideEn,
  sukhothai: sukhothaiDestinationGuideEn,
  "trang": trangDestinationGuideEn,
  "ubon-ratchathani": ubonRatchathaniDestinationGuideEn,
  "udon-thani": udonThaniDestinationGuideEn,
};

export function getEnDestinationGuide(citySlug: string) {
  return guides[citySlug];
}

export { banKrutDestinationGuideEn, buengKanDestinationGuideEn, chanthaburiDestinationGuideEn, chiangKhanDestinationGuideEn, hatYaiDestinationGuideEn, khonKaenDestinationGuideEn, lampangDestinationGuideEn, mukdahanDestinationGuideEn, nakhonPhanomDestinationGuideEn, nakhonRatchasimaDestinationGuideEn, nongKhaiDestinationGuideEn, sukhothaiDestinationGuideEn, trangDestinationGuideEn, ubonRatchathaniDestinationGuideEn, udonThaniDestinationGuideEn };
