import type { HotelGuideData } from "../types";
import { bangkokHotelGuideEn } from "./bangkok";
import { chiangMaiHotelGuideEn } from "./chiang-mai";
import { phuketHotelGuideEn } from "./phuket";

const hotelGuides: Record<string, HotelGuideData> = {
  bangkok: bangkokHotelGuideEn,
  "chiang-mai": chiangMaiHotelGuideEn,
  phuket: phuketHotelGuideEn,
};

export function getEnHotelGuide(citySlug: string): HotelGuideData | null {
  return hotelGuides[citySlug] ?? null;
}
