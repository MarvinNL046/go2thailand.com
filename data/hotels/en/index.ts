import type { HotelGuideData } from "../types";
import { bangkokHotelGuideEn } from "./bangkok";
import { chiangMaiHotelGuideEn } from "./chiang-mai";

const hotelGuides: Record<string, HotelGuideData> = {
  bangkok: bangkokHotelGuideEn,
  "chiang-mai": chiangMaiHotelGuideEn,
};

export function getEnHotelGuide(citySlug: string): HotelGuideData | null {
  return hotelGuides[citySlug] ?? null;
}
