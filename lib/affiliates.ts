// lib/affiliates.ts

export interface CityAffiliates {
  booking: string;   // Booking.com search URL with affiliate tag
  klook: string;     // Klook search URL with affiliate tag
  getyourguide: string; // GetYourGuide search URL
}

// Replace AFFILIATE_ID placeholders with real IDs before deploy
const BOOKING_AFF = 'aid=BOOKING_AFFILIATE_ID';
const KLOOK_AFF = 'aid=KLOOK_AFFILIATE_ID';

export const cityAffiliates: Record<string, CityAffiliates> = {
  bangkok: {
    booking: `https://www.booking.com/city/th/bangkok.html?${BOOKING_AFF}`,
    klook: `https://www.klook.com/en-US/search/?q=Bangkok&${KLOOK_AFF}`,
    getyourguide: 'https://www.getyourguide.com/bangkok-l169/',
  },
  'chiang-mai': {
    booking: `https://www.booking.com/city/th/chiang-mai.html?${BOOKING_AFF}`,
    klook: `https://www.klook.com/en-US/search/?q=Chiang+Mai&${KLOOK_AFF}`,
    getyourguide: 'https://www.getyourguide.com/chiang-mai-l244/',
  },
  phuket: {
    booking: `https://www.booking.com/city/th/phuket.html?${BOOKING_AFF}`,
    klook: `https://www.klook.com/en-US/search/?q=Phuket&${KLOOK_AFF}`,
    getyourguide: 'https://www.getyourguide.com/phuket-l193/',
  },
  krabi: {
    booking: `https://www.booking.com/city/th/krabi.html?${BOOKING_AFF}`,
    klook: `https://www.klook.com/en-US/search/?q=Krabi&${KLOOK_AFF}`,
    getyourguide: 'https://www.getyourguide.com/krabi-l209/',
  },
  'koh-samui': {
    booking: `https://www.booking.com/city/th/koh-samui.html?${BOOKING_AFF}`,
    klook: `https://www.klook.com/en-US/search/?q=Koh+Samui&${KLOOK_AFF}`,
    getyourguide: 'https://www.getyourguide.com/koh-samui-l127/',
  },
};

// Cities with affiliate links configured
export const affiliateCities = Object.keys(cityAffiliates);

export function getAffiliates(citySlug: string): CityAffiliates | null {
  return cityAffiliates[citySlug] ?? null;
}
