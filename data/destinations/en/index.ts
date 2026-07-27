import { banKrutDestinationGuideEn } from "./ban-krut";
import { chanthaburiDestinationGuideEn } from "./chanthaburi";
import { hatYaiDestinationGuideEn } from "./hat-yai";
import { trangDestinationGuideEn } from "./trang";
import type { DestinationGuideData } from "../types";

const guides: Record<string, DestinationGuideData> = {
  "ban-krut": banKrutDestinationGuideEn,
  "chanthaburi": chanthaburiDestinationGuideEn,
  "hat-yai": hatYaiDestinationGuideEn,
  "trang": trangDestinationGuideEn,
};

export function getEnDestinationGuide(citySlug: string) {
  return guides[citySlug];
}

export { banKrutDestinationGuideEn, chanthaburiDestinationGuideEn, hatYaiDestinationGuideEn, trangDestinationGuideEn };
