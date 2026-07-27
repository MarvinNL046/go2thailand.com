import { banKrutDestinationGuideEn } from "./ban-krut";
import { hatYaiDestinationGuideEn } from "./hat-yai";
import type { DestinationGuideData } from "../types";

const guides: Record<string, DestinationGuideData> = {
  "ban-krut": banKrutDestinationGuideEn,
  "hat-yai": hatYaiDestinationGuideEn,
};

export function getEnDestinationGuide(citySlug: string) {
  return guides[citySlug];
}

export { banKrutDestinationGuideEn, hatYaiDestinationGuideEn };
