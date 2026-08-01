import type { AmazonAffiliateSlug } from '../../lib/amazon-affiliates';

export interface SeasonDecisionWindow {
  months: string;
  title: string;
  label: string;
  summary: string;
  gain: string;
  tradeoff: string;
  image: string;
  imageAlt: string;
}

export interface SeasonMonthRhythm {
  months: string;
  title: string;
  tone: 'strong' | 'balanced' | 'flexible';
  summary: string;
  plan: string;
}

export interface SeasonPackingItem {
  title: string;
  description: string;
  amazonSlug?: AmazonAffiliateSlug;
  amazonLabel?: string;
}

export interface SeasonDecisionGuideData {
  citySlug: string;
  cityName: string;
  pageTitle: string;
  pageDescription: string;
  pageUrl: string;
  dateModified: string;
  hero: {
    image: string;
    imageAlt: string;
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    subtitle: string;
    description: string;
    sideLabel: string;
    sideTitle: string;
    sideDescription: string;
  };
  answer: {
    eyebrow: string;
    title: string;
    description: string;
    signals: Array<{ label: string; value: string; detail: string }>;
  };
  windows: SeasonDecisionWindow[];
  rhythm: SeasonMonthRhythm[];
  visual: {
    image: string;
    imageAlt: string;
    eyebrow: string;
    title: string;
    description: string;
    bullets: string[];
  };
  tripStyles: Array<{ title: string; months: string; description: string }>;
  plans: Array<{ label: string; title: string; description: string }>;
  packing: {
    image: string;
    imageAlt: string;
    intro: string;
    items: SeasonPackingItem[];
  };
  affiliate: {
    hotel?: boolean;
    activities?: boolean;
    transport?: boolean;
    note: string;
  };
  faqs: Array<{ question: string; answer: string }>;
  relatedGuides: Array<{ title: string; description: string; href: string; image: string; imageAlt: string }>;
  sources: Array<{ title: string; creator: string; url: string; note: string }>;
  researchNote: string;
}
