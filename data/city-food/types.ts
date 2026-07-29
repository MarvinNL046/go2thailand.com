import type { AmazonAffiliateSlug } from '../../lib/amazon-affiliates';

export type CityFoodIcon =
  | 'bowl'
  | 'chef'
  | 'clock'
  | 'coffee'
  | 'flame'
  | 'market'
  | 'moon'
  | 'restaurant'
  | 'shield'
  | 'shopping'
  | 'sun'
  | 'utensils';

export interface CityFoodGuideData {
  city: string;
  slug: string;
  pageUrl: string;
  updatedAt: string;
  hero: {
    image: string;
    imageAlt: string;
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    subtitle: string;
    description: string;
    sideEyebrow: string;
    sideTitle: string;
    sideDescription: string;
  };
  seo: { title: string; description: string };
  formats: Array<{
    title: string;
    label: string;
    fit: string;
    tradeoff: string;
    icon: CityFoodIcon;
  }>;
  districts: Array<{
    name: string;
    signal: string;
    description: string;
    timing: string;
    routeNote: string;
    image: string;
    imageAlt: string;
    href?: string;
  }>;
  dishes: Array<{
    title: string;
    thai?: string;
    description: string;
    orderNote: string;
    href: string;
    image: string;
    imageAlt: string;
  }>;
  dayPlan: Array<{
    time: string;
    title: string;
    description: string;
    icon: CityFoodIcon;
  }>;
  practicalChecks: Array<{
    title: string;
    description: string;
    icon: CityFoodIcon;
  }>;
  phrases: Array<{ phrase: string; meaning: string; note: string }>;
  affiliate: {
    klookSubId: string;
    products: Array<{
      title: string;
      description: string;
      amazonSlug: AmazonAffiliateSlug;
      icon: CityFoodIcon;
    }>;
  };
  faqs: Array<{ question: string; answer: string }>;
  sources: Array<{ title: string; creator: string; url: string; note: string }>;
  related: Array<{
    title: string;
    description: string;
    href: string;
    image: string;
    imageAlt: string;
  }>;
  researchSummary: string;
}
