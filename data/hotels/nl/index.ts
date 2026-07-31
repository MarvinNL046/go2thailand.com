import type { HotelGuideData } from "../types";
import { bangkokHotelGuide } from "./bangkok";
import { chiangMaiHotelGuide } from "./chiang-mai";
import { krabiHotelGuide } from "./krabi";
import { kohSamuiHotelGuide } from "./koh-samui";
import { kohTaoHotelGuide } from "./koh-tao";
import { khaoSokHotelGuide } from "./khao-sok";
import { phuketHotelGuide } from "./phuket";
import { pattayaHotelGuide } from "./pattaya";
import { ayutthayaHotelGuide } from "./ayutthaya";
import { chiangRaiHotelGuide } from "./chiang-rai";
import { hatYaiHotelGuide } from "./hat-yai";
import { sukhothaiHotelGuide } from "./sukhothai";
import { chumphonHotelGuide } from "./chumphon";
import { huaHinHotelGuide } from "./hua-hin";
import { kanchanaburiHotelGuide } from "./kanchanaburi";
import { suratThaniHotelGuide } from "./surat-thani";

const hotelGuides: Record<string, HotelGuideData> = {
  bangkok: bangkokHotelGuide,
  "chiang-mai": chiangMaiHotelGuide,
  krabi: krabiHotelGuide,
  "koh-samui": kohSamuiHotelGuide,
  "koh-tao": kohTaoHotelGuide,
  "khao-sok": khaoSokHotelGuide,
  phuket: phuketHotelGuide,
  pattaya: pattayaHotelGuide,
  ayutthaya: ayutthayaHotelGuide,
  "chiang-rai": chiangRaiHotelGuide,
  "hat-yai": hatYaiHotelGuide,
  sukhothai: sukhothaiHotelGuide,
  chumphon: chumphonHotelGuide,
  "hua-hin": huaHinHotelGuide,
  kanchanaburi: kanchanaburiHotelGuide,
  "surat-thani": suratThaniHotelGuide,
};

export function getNlHotelGuide(citySlug: string): HotelGuideData | null {
  return hotelGuides[citySlug] ?? null;
}
