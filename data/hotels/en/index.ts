import type { HotelGuideData } from "../types";
import { bangkokHotelGuideEn } from "./bangkok";
import { chiangMaiHotelGuideEn } from "./chiang-mai";
import { krabiHotelGuideEn } from "./krabi";
import { kohSamuiHotelGuideEn } from "./koh-samui";
import { pattayaHotelGuideEn } from "./pattaya";
import { phuketHotelGuideEn } from "./phuket";
import { huaHinHotelGuideEn } from "./hua-hin";

const hotelGuides: Record<string, HotelGuideData> = {
  bangkok: bangkokHotelGuideEn,
  "chiang-mai": chiangMaiHotelGuideEn,
  krabi: krabiHotelGuideEn,
  "koh-samui": kohSamuiHotelGuideEn,
  pattaya: pattayaHotelGuideEn,
  phuket: phuketHotelGuideEn,
  "hua-hin": huaHinHotelGuideEn,
};

export function getEnHotelGuide(citySlug: string): HotelGuideData | null {
  return hotelGuides[citySlug] ?? null;
}
