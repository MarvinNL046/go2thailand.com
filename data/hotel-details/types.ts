export type HotelDetailIcon = 'map' | 'route' | 'bed' | 'wallet' | 'sparkles' | 'waves';

export interface HotelDetailStat {
  label: string;
  value: string;
  note: string;
  icon: HotelDetailIcon;
}

export interface HotelDetailSource {
  title: string;
  creator: string;
  url: string;
  note: string;
}

export interface HotelDetailGuideData {
  slug: string;
  hotelName: string;
  cityName: string;
  citySlug: string;
  destinationHref?: string;
  area: string;
  pageTitle: string;
  pageDescription: string;
  pageUrl: string;
  dateModified: string;
  hero: {
    image: string;
    imageAlt: string;
    imageCaption: string;
    eyebrow: string;
    title: string;
    accent?: string;
    subtitle: string;
    description: string;
    ctaLabel: string;
  };
  verdict: {
    eyebrow: string;
    title: string;
    description: string;
    stats: HotelDetailStat[];
  };
  fit: {
    eyebrow: string;
    title: string;
    intro: string;
    goodFor: string[];
    tradeoffs: string[];
  };
  location: {
    eyebrow: string;
    title: string;
    description: string;
    steps: Array<{ label: string; title: string; description: string }>;
  };
  booking: {
    eyebrow: string;
    title: string;
    description: string;
    checks: Array<{ title: string; description: string }>;
  };
  faqs: Array<{ question: string; answer: string }>;
  relatedGuides: Array<{ title: string; description: string; href: string; image: string; imageAlt: string }>;
  sources: HotelDetailSource[];
}
