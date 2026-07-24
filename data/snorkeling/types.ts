import type { AmazonAffiliateSlug } from '../../lib/amazon-affiliates';

export type SnorkelGuideIcon = 'anchor' | 'binoculars' | 'compass' | 'eye' | 'footprints' | 'leaf' | 'shield' | 'ship' | 'sun' | 'turtle' | 'waves' | 'wind';

export interface SnorkelBayProfile {
  slug: string;
  icon: SnorkelGuideIcon;
  title: string;
  side: string;
  access: string;
  bestFor: string;
  conditions: string;
  caveat: string;
}

export interface SnorkelGuideData {
  slug: string;
  destinationName: string;
  locale: 'nl';
  parentGuideHref: string;
  activitiesGuideHref: string;
  divingGuideHref: string;
  pageTitle: string;
  pageDescription: string;
  pageUrl: string;
  dateModified: string;
  hero: {
    image: string;
    imageAlt: string;
    eyebrow: string;
    title: string;
    accent: string;
    subtitle: string;
    description: string;
    imageClassName?: string;
  };
  quickAnswer: {
    eyebrow: string;
    title: string;
    description: string;
    stats: Array<{ label: string; value: string; icon: SnorkelGuideIcon }>;
  };
  conditionSignals: Array<{ icon: SnorkelGuideIcon; title: string; question: string; decision: string }>;
  bayProfiles: SnorkelBayProfile[];
  accessChoice: {
    image: string;
    imageAlt: string;
    eyebrow: string;
    title: string;
    description: string;
    options: Array<{ icon: SnorkelGuideIcon; title: string; bestFor: string; benefits: string[]; tradeoff: string }>;
  };
  responsibleFeature: {
    image: string;
    imageAlt: string;
    eyebrow: string;
    title: string;
    description: string;
    rules: Array<{ title: string; description: string }>;
  };
  wildlife: Array<{ icon: SnorkelGuideIcon; title: string; expectation: string; behaviour: string }>;
  gear: Array<{ icon: SnorkelGuideIcon; title: string; description: string; amazonLabel?: string; amazonSlug?: AmazonAffiliateSlug }>;
  bookingChecklist: Array<{ icon: SnorkelGuideIcon; title: string; description: string }>;
  faqs: Array<{ question: string; answer: string }>;
  relatedGuides: Array<{ title: string; description: string; href: string; image: string; imageAlt?: string }>;
  sources: Array<{ title: string; creator: string; url: string; note: string }>;
}
