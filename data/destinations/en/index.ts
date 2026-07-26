import { banKrutDestinationGuideEn } from "./ban-krut";
import type { DestinationGuideData } from "../types";

const guides: Record<string, DestinationGuideData> = {
  "ban-krut": banKrutDestinationGuideEn,
};

export function getEnDestinationGuide(citySlug: string) {
  return guides[citySlug];
}

export { banKrutDestinationGuideEn };
