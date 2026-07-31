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
import { paiHotelGuide } from "./pai";
import { maeHongSonHotelGuide } from "./mae-hong-son";
import { lampangHotelGuide } from "./lampang";
import { khonKaenHotelGuide } from "./khon-kaen";
import { udonThaniHotelGuide } from "./udon-thani";
import { nakhonRatchasimaHotelGuide } from "./nakhon-ratchasima";
import { ubonRatchathaniHotelGuide } from "./ubon-ratchathani";
import { lopburiHotelGuide } from "./lopburi";
import { phitsanulokHotelGuide } from "./phitsanulok";
import { tratHotelGuide } from "./trat";
import { rayongHotelGuide } from "./rayong";
import { nakhonSiThammaratHotelGuide } from "./nakhon-si-thammarat";
import { trangHotelGuide } from "./trang";
import { chanthaburiHotelGuide } from "./chanthaburi";
import { chiangKhanHotelGuide } from "./chiang-khan";
import { nongKhaiHotelGuide } from "./nong-khai";

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
  pai: paiHotelGuide,
  "mae-hong-son": maeHongSonHotelGuide,
  lampang: lampangHotelGuide,
  "khon-kaen": khonKaenHotelGuide,
  "udon-thani": udonThaniHotelGuide,
  "nakhon-ratchasima": nakhonRatchasimaHotelGuide,
  "ubon-ratchathani": ubonRatchathaniHotelGuide,
  lopburi: lopburiHotelGuide,
  phitsanulok: phitsanulokHotelGuide,
  trat: tratHotelGuide,
  rayong: rayongHotelGuide,
  "nakhon-si-thammarat": nakhonSiThammaratHotelGuide,
  trang: trangHotelGuide,
  chanthaburi: chanthaburiHotelGuide,
  "chiang-khan": chiangKhanHotelGuide,
  "nong-khai": nongKhaiHotelGuide,
};

export function getNlHotelGuide(citySlug: string): HotelGuideData | null {
  return hotelGuides[citySlug] ?? null;
}
