import { banKrutDestinationGuideEn } from "./ban-krut";
import { chanthaburiDestinationGuideEn } from "./chanthaburi";
import { chiangKhanDestinationGuideEn } from "./chiang-khan";
import { hatYaiDestinationGuideEn } from "./hat-yai";
import { trangDestinationGuideEn } from "./trang";
import type { DestinationGuideData } from "../types";

const guides: Record<string, DestinationGuideData> = {
  "ban-krut": banKrutDestinationGuideEn,
  "chanthaburi": chanthaburiDestinationGuideEn,
  "chiang-khan": chiangKhanDestinationGuideEn,
  "hat-yai": hatYaiDestinationGuideEn,
  "trang": trangDestinationGuideEn,
};

export function getEnDestinationGuide(citySlug: string) {
  return guides[citySlug];
}

export { banKrutDestinationGuideEn, chanthaburiDestinationGuideEn, chiangKhanDestinationGuideEn, hatYaiDestinationGuideEn, trangDestinationGuideEn };
