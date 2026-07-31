import type { HotelGuideData } from "../types";
import { bangkokHotelGuide } from "./bangkok";
import { chiangMaiHotelGuide } from "./chiang-mai";
import { krabiHotelGuide } from "./krabi";
import { kohSamuiHotelGuide } from "./koh-samui";
import { kohTaoHotelGuide } from "./koh-tao";
import { khaoSokHotelGuide } from "./khao-sok";
import { phuketHotelGuide } from "./phuket";
import { pattayaHotelGuide } from "./pattaya";

const hotelGuides: Record<string, HotelGuideData> = {
  bangkok: bangkokHotelGuide,
  "chiang-mai": chiangMaiHotelGuide,
  krabi: krabiHotelGuide,
  "koh-samui": kohSamuiHotelGuide,
  "koh-tao": kohTaoHotelGuide,
  "khao-sok": khaoSokHotelGuide,
  phuket: phuketHotelGuide,
  pattaya: pattayaHotelGuide,
};

export function getNlHotelGuide(citySlug: string): HotelGuideData | null {
  return hotelGuides[citySlug] ?? null;
}
