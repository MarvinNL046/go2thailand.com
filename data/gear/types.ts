import type { AmazonAffiliateSlug } from '../../lib/amazon-affiliates';

export interface PackingChecklistCategory {
  id: string;
  title: string;
  description: string;
  icon: 'documents' | 'clothing' | 'health' | 'electronics' | 'bags' | 'route';
  items: Array<{ id: string; label: string; note?: string; essential?: boolean }>;
}

export interface PackingProductPick {
  name: string;
  category: string;
  icon: 'adapter' | 'battery' | 'daypack' | 'drybag' | 'towel' | 'sun' | 'rain' | 'shoes';
  amazonSlug: AmazonAffiliateSlug;
  usefulFor: string;
  description: string;
  skipWhen: string;
}

export interface PackingGuideData {
  locale: 'nl';
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
  checklist: PackingChecklistCategory[];
  bagChoices: Array<{ title: string; bestFor: string; advantage: string; tradeoff: string }>;
  cabinRulesImage: string;
  cabinRulesImageAlt: string;
  cabinRules: Array<{ title: string; items: string[]; tone: 'carry' | 'checked' | 'leave' }>;
  routeImage: string;
  routeImageAlt: string;
  routeCapsules: Array<{ eyebrow: string; title: string; description: string; additions: string[] }>;
  homeVsLocal: {
    bring: string[];
    buy: string[];
    leave: string[];
  };
  productPicks: PackingProductPick[];
  faqs: Array<{ question: string; answer: string }>;
  relatedGuides: Array<{ title: string; description: string; href: string; image: string; imageAlt: string }>;
  sources: Array<{ title: string; creator: string; url: string; note: string }>;
  dateModified: string;
}
