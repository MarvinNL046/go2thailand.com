import type { AmazonAffiliateSlug } from '../../lib/amazon-affiliates';

export type ClimateGuideIcon = 'cloud' | 'heat' | 'map' | 'rain' | 'shield' | 'sun' | 'waves' | 'wind';

export interface ClimateUpdateGuideData {
  slug: string;
  pageTitle: string;
  pageDescription: string;
  pageUrl: string;
  datePublished: string;
  dateModified: string;
  author: string;
  hero: {
    image: string;
    imageAlt: string;
    imageCaption: string;
    eyebrow: string;
    title: string;
    accent: string;
    subtitle: string;
    description: string;
  };
  status: {
    label: string;
    title: string;
    summary: string;
    checked: string;
    facts: Array<{ label: string; value: string; note: string; icon: ClimateGuideIcon }>;
  };
  fundamentals: {
    eyebrow: string;
    title: string;
    intro: string;
    cards: Array<{ title: string; description: string; icon: ClimateGuideIcon; tone: 'jade' | 'cream' }>;
  };
  regions: Array<{ name: string; signal: string; description: string; action: string; icon: ClimateGuideIcon }>;
  decisionPlan: Array<{ label: string; title: string; description: string; action: string; icon: ClimateGuideIcon }>;
  kit: {
    image: string;
    imageAlt: string;
    title: string;
    description: string;
    checklist: string[];
    products: Array<{ title: string; reason: string; amazonSlug: AmazonAffiliateSlug }>;
  };
  faqs: Array<{ question: string; answer: string }>;
  relatedGuides: Array<{ title: string; description: string; href: string; image: string; imageAlt?: string }>;
  sources: Array<{ title: string; creator: string; url: string; note: string }>;
}

