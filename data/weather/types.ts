import type { AmazonAffiliateSlug } from '../../lib/amazon-affiliates';

export type WeatherIconName =
  | 'sun'
  | 'cloud-sun'
  | 'cloud-rain'
  | 'waves'
  | 'leaf'
  | 'wallet'
  | 'camera'
  | 'umbrella'
  | 'shirt'
  | 'shield';

export interface WeatherMonth {
  slug: string;
  name: string;
  shortName: string;
  meanHigh: number;
  meanLow: number;
  rainfall: number;
  rainDays: number;
  travelLabel: string;
  travelTone: 'best' | 'good' | 'mixed' | 'wet';
}

export interface WeatherSeason {
  months: string;
  title: string;
  icon: WeatherIconName;
  summary: string;
  bestFor: string;
  tradeoff: string;
  tone: 'dry' | 'transition' | 'green';
}

export interface WeatherTravelStyle {
  title: string;
  icon: WeatherIconName;
  months: string;
  description: string;
}

export interface WeatherPackingTip {
  title: string;
  icon: WeatherIconName;
  description: string;
  amazonLabel?: string;
  amazonSlug?: AmazonAffiliateSlug;
}

export interface WeatherPlan {
  label: string;
  title: string;
  description: string;
}

export interface WeatherFaq {
  question: string;
  answer: string;
}

export interface WeatherRelatedGuide {
  title: string;
  description: string;
  href: string;
  image: string;
}

export interface WeatherSource {
  title: string;
  creator: string;
  url: string;
  note: string;
}

export interface WeatherGuideData {
  citySlug: string;
  cityName: string;
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
  decisionCards: Array<{
    label: string;
    value: string;
  }>;
  currentForecastUrl: string;
  planningNotes: {
    climateVsForecast: string;
    interpretation: Array<{ title: string; description: string }>;
    bookingTip: string;
  };
  climatePeriod: string;
  climateStation: string;
  stats: Array<{ label: string; value: string; detail: string }>;
  months: WeatherMonth[];
  monthDetailRoutes?: boolean;
  seasons: WeatherSeason[];
  greenSeason: {
    image: string;
    alt: string;
    eyebrow: string;
    title: string;
    description: string;
    bullets: string[];
  };
  travelStyles: WeatherTravelStyle[];
  packingImage: {
    src: string;
    alt: string;
  };
  packingTips: WeatherPackingTip[];
  plans: WeatherPlan[];
  faqs: WeatherFaq[];
  relatedGuides: WeatherRelatedGuide[];
  sources: WeatherSource[];
  dateModified: string;
}
