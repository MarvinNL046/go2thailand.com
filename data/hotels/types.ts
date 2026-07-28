export type HotelAreaTone = 'easy' | 'scenic' | 'local' | 'quiet';

export interface HotelArea {
  slug: string;
  name: string;
  shortLabel: string;
  tone: HotelAreaTone;
  image: string;
  imageAlt: string;
  bestFor: string;
  summary: string;
  advantage: string;
  tradeoff: string;
  transport: string;
}

export interface HotelPick {
  name: string;
  area: string;
  category: string;
  bestFor: string;
  description: string;
  whySelected: string;
  officialUrl: string;
}

export interface HotelFaq {
  question: string;
  answer: string;
}

export interface HotelSource {
  title: string;
  creator: string;
  url: string;
  note: string;
}

export interface HotelRelatedGuide {
  title: string;
  description: string;
  href: string;
  image: string;
}

export interface HotelGuideData {
  citySlug: string;
  cityName: string;
  parentGuideHref?: string;
  locale: 'nl' | 'en';
  pageTitle: string;
  pageDescription: string;
  pageUrl: string;
  heroImage: string;
  heroAlt: string;
  eyebrow: string;
  heroTitle: string;
  heroAccent: string;
  intro: string;
  quickAnswer: string;
  areaDecisionNote: string;
  areas: HotelArea[];
  hotelPicks: HotelPick[];
  splitStay: {
    eyebrow: string;
    title: string;
    description: string;
    routes: Array<{ label: string; title: string; description: string }>;
  };
  bookingTips: Array<{ title: string; description: string }>;
  specialistGuides?: Array<{ title: string; description: string; href: string }>;
  profileLinks?: Array<{ title: string; href: string }>;
  faqs: HotelFaq[];
  relatedGuides: HotelRelatedGuide[];
  sources: HotelSource[];
  dateModified: string;
}
