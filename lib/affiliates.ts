// lib/affiliates.ts

export interface CityAffiliates {
  booking: string;   // Booking.com search URL with affiliate tag
  klook: string;     // Klook search URL with affiliate tag
  getyourguide: string; // GetYourGuide search URL
}

// Travelpayouts affiliate links (marker: 602467, trs: 421888)
const BOOKING = 'https://booking.tpo.lv/2PT1kR82';
const KLOOK = 'https://klook.tpo.lv/7Dt6WApj';
const GYG = 'https://getyourguide.tpo.lv/GuAFfGGK';

export const cityAffiliates: Record<string, CityAffiliates> = {
  ayutthaya: {
    booking: BOOKING,
    klook: KLOOK,
    getyourguide: GYG,
  },
  bangkok: {
    booking: BOOKING,
    klook: KLOOK,
    getyourguide: GYG,
  },
  'bueng-kan': {
    booking: BOOKING,
    klook: KLOOK,
    getyourguide: GYG,
  },
  chanthaburi: {
    booking: BOOKING,
    klook: KLOOK,
    getyourguide: GYG,
  },
  'chiang-khan': {
    booking: BOOKING,
    klook: KLOOK,
    getyourguide: GYG,
  },
  'chiang-mai': {
    booking: BOOKING,
    klook: KLOOK,
    getyourguide: GYG,
  },
  'chiang-rai': {
    booking: BOOKING,
    klook: KLOOK,
    getyourguide: GYG,
  },
  chumphon: {
    booking: BOOKING,
    klook: KLOOK,
    getyourguide: GYG,
  },
  'hat-yai': {
    booking: BOOKING,
    klook: KLOOK,
    getyourguide: GYG,
  },
  'hua-hin': {
    booking: BOOKING,
    klook: KLOOK,
    getyourguide: GYG,
  },
  kanchanaburi: {
    booking: BOOKING,
    klook: KLOOK,
    getyourguide: GYG,
  },
  'khon-kaen': {
    booking: BOOKING,
    klook: KLOOK,
    getyourguide: GYG,
  },
  'koh-samui': {
    booking: BOOKING,
    klook: KLOOK,
    getyourguide: GYG,
  },
  krabi: {
    booking: BOOKING,
    klook: KLOOK,
    getyourguide: GYG,
  },
  lampang: {
    booking: BOOKING,
    klook: KLOOK,
    getyourguide: GYG,
  },
  lopburi: {
    booking: BOOKING,
    klook: KLOOK,
    getyourguide: GYG,
  },
  'mae-hong-son': {
    booking: BOOKING,
    klook: KLOOK,
    getyourguide: GYG,
  },
  mukdahan: {
    booking: BOOKING,
    klook: KLOOK,
    getyourguide: GYG,
  },
  'nakhon-phanom': {
    booking: BOOKING,
    klook: KLOOK,
    getyourguide: GYG,
  },
  'nakhon-ratchasima': {
    booking: BOOKING,
    klook: KLOOK,
    getyourguide: GYG,
  },
  'nakhon-si-thammarat': {
    booking: BOOKING,
    klook: KLOOK,
    getyourguide: GYG,
  },
  'nong-khai': {
    booking: BOOKING,
    klook: KLOOK,
    getyourguide: GYG,
  },
  pai: {
    booking: BOOKING,
    klook: KLOOK,
    getyourguide: GYG,
  },
  pattaya: {
    booking: BOOKING,
    klook: KLOOK,
    getyourguide: GYG,
  },
  phitsanulok: {
    booking: BOOKING,
    klook: KLOOK,
    getyourguide: GYG,
  },
  phuket: {
    booking: BOOKING,
    klook: KLOOK,
    getyourguide: GYG,
  },
  rayong: {
    booking: BOOKING,
    klook: KLOOK,
    getyourguide: GYG,
  },
  sukhothai: {
    booking: BOOKING,
    klook: KLOOK,
    getyourguide: GYG,
  },
  'surat-thani': {
    booking: BOOKING,
    klook: KLOOK,
    getyourguide: GYG,
  },
  trang: {
    booking: BOOKING,
    klook: KLOOK,
    getyourguide: GYG,
  },
  trat: {
    booking: BOOKING,
    klook: KLOOK,
    getyourguide: GYG,
  },
  'ubon-ratchathani': {
    booking: BOOKING,
    klook: KLOOK,
    getyourguide: GYG,
  },
  'udon-thani': {
    booking: BOOKING,
    klook: KLOOK,
    getyourguide: GYG,
  },
};

// Cities with affiliate links configured
export const affiliateCities = Object.keys(cityAffiliates);

export function getAffiliates(citySlug: string): CityAffiliates | null {
  return cityAffiliates[citySlug] ?? null;
}
