import type { HotelGuideData } from "../types";
import { bangkokHotelGuideEn } from "./bangkok";

const hotelGuides: Record<string, HotelGuideData> = {
  bangkok: bangkokHotelGuideEn,
};

export function getEnHotelGuide(citySlug: string): HotelGuideData | null {
  return hotelGuides[citySlug] ?? null;
}
