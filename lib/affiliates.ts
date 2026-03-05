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
  bangkok: {
    booking: BOOKING,
    klook: KLOOK,
    getyourguide: GYG,
  },
  'chiang-mai': {
    booking: BOOKING,
    klook: KLOOK,
    getyourguide: GYG,
  },
  phuket: {
    booking: BOOKING,
    klook: KLOOK,
    getyourguide: GYG,
  },
  krabi: {
    booking: BOOKING,
    klook: KLOOK,
    getyourguide: GYG,
  },
  'koh-samui': {
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
