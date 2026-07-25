import type { AmazonAffiliateSlug } from '../../lib/amazon-affiliates';

export type PracticalGuideIcon =
  | 'basket'
  | 'coffee'
  | 'credit-card'
  | 'id-card'
  | 'map-pin'
  | 'microwave'
  | 'moon'
  | 'package'
  | 'phone'
  | 'shield'
  | 'sim'
  | 'sparkles'
  | 'wallet';

export interface PracticalGuideCard {
  title: string;
  label?: string;
  description: string;
  note?: string;
  icon: PracticalGuideIcon;
}

export interface PracticalGuideProductCard {
  title: string;
  label: string;
  description: string;
  bestFor: string;
  caution: string;
  image: string;
  imageAlt: string;
}

export interface PracticalGuidePriceRow {
  category: string;
  range: string;
  context: string;
}

export interface PracticalGuideAmazonProduct {
  title: string;
  reason: string;
  amazonSlug: AmazonAffiliateSlug;
}

export interface PracticalGuideFaq {
  question: string;
  answer: string;
}

export interface PracticalGuideRelated {
  title: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
}

export interface PracticalGuideSource {
  title: string;
  creator: string;
  url: string;
  note: string;
}

export interface PracticalEditorialGuideData {
  slug: string;
  updatedAt: string;
  publishedAt: string;
  seo: { title: string; description: string; image: string };
  hero: {
    eyebrow: string;
    title: string;
    accent: string;
    description: string;
    image: string;
    imageAlt: string;
  };
  intro: {
    eyebrow: string;
    title: string;
    description: string;
    verdict: string;
    cards: PracticalGuideCard[];
  };
  basket: {
    title: string;
    intro: string;
    image: string;
    imageAlt: string;
    items: Array<{ title: string; detail: string }>;
  };
  products: {
    eyebrow: string;
    title: string;
    description: string;
    cards: PracticalGuideProductCard[];
    decisionTitle: string;
    decisionText: string;
  };
  scenarios: {
    eyebrow: string;
    title: string;
    description: string;
    items: Array<{
      label: string;
      title: string;
      text: string;
      steps: string[];
    }>;
  };
  prices: {
    eyebrow: string;
    title: string;
    description: string;
    howToReadTitle: string;
    howToRead: string;
    rows: PracticalGuidePriceRow[];
    note: string;
  };
  services: {
    eyebrow: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    cards: PracticalGuideCard[];
  };
  rules: {
    eyebrow: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    items: Array<{ label: string; title: string; text: string }>;
  };
  pack: {
    eyebrow: string;
    title: string;
    description: string;
    localTitle: string;
    localItems: Array<{ title: string; detail: string }>;
    amazonTitle: string;
    amazonDescription: string;
    amazonProducts: PracticalGuideAmazonProduct[];
  };
  tips: {
    eyebrow: string;
    title: string;
    cards: PracticalGuideCard[];
  };
  faqs: PracticalGuideFaq[];
  related: PracticalGuideRelated[];
  sources: PracticalGuideSource[];
}
