import { banKrutDestinationGuideEn } from "./ban-krut";
import { buengKanDestinationGuideEn } from "./bueng-kan";
import { chanthaburiDestinationGuideEn } from "./chanthaburi";
import { chiangKhanDestinationGuideEn } from "./chiang-khan";
import { hatYaiDestinationGuideEn } from "./hat-yai";
import { mukdahanDestinationGuideEn } from "./mukdahan";
import { nakhonPhanomDestinationGuideEn } from "./nakhon-phanom";
import { nongKhaiDestinationGuideEn } from "./nong-khai";
import { trangDestinationGuideEn } from "./trang";
import type { DestinationGuideData } from "../types";

const guides: Record<string, DestinationGuideData> = {
  "ban-krut": banKrutDestinationGuideEn,
  "bueng-kan": buengKanDestinationGuideEn,
  "chanthaburi": chanthaburiDestinationGuideEn,
  "chiang-khan": chiangKhanDestinationGuideEn,
  "hat-yai": hatYaiDestinationGuideEn,
  "mukdahan": mukdahanDestinationGuideEn,
  "nakhon-phanom": nakhonPhanomDestinationGuideEn,
  "nong-khai": nongKhaiDestinationGuideEn,
  "trang": trangDestinationGuideEn,
};

export function getEnDestinationGuide(citySlug: string) {
  return guides[citySlug];
}

export { banKrutDestinationGuideEn, buengKanDestinationGuideEn, chanthaburiDestinationGuideEn, chiangKhanDestinationGuideEn, hatYaiDestinationGuideEn, mukdahanDestinationGuideEn, nakhonPhanomDestinationGuideEn, nongKhaiDestinationGuideEn, trangDestinationGuideEn };
