import type { AmazonAffiliateSlug } from '../../lib/amazon-affiliates';
import type { SnorkelGuideIcon } from './types';

export interface ThailandSnorkelingDestination {
  slug: string;
  name: string;
  region: string;
  access: string;
  bestFor: string;
  planningWindow: string;
  decision: string;
  tradeoff: string;
  href: string;
  image: string;
  imageAlt: string;
}

export interface ThailandSnorkelingGuideData {
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
  };
  quickAnswer: {
    title: string;
    description: string;
    stats: Array<{ label: string; value: string; icon: SnorkelGuideIcon }>;
  };
  coastWindows: Array<{
    id: string;
    icon: SnorkelGuideIcon;
    name: string;
    places: string;
    planningWindow: string;
    decision: string;
    caveat: string;
  }>;
  morningSignals: Array<{ icon: SnorkelGuideIcon; title: string; check: string; response: string }>;
  destinations: ThailandSnorkelingDestination[];
  accessChoices: Array<{
    icon: SnorkelGuideIcon;
    title: string;
    bestFor: string;
    advantages: string[];
    tradeoff: string;
  }>;
  beginnerChecks: Array<{ icon: SnorkelGuideIcon; title: string; description: string }>;
  responsibleRules: Array<{ title: string; description: string }>;
  gear: Array<{
    icon: SnorkelGuideIcon;
    title: string;
    description: string;
    amazonLabel?: string;
    amazonSlug?: AmazonAffiliateSlug;
  }>;
  diveBoundary: Array<{ title: string; description: string }>;
  faqs: Array<{ question: string; answer: string }>;
  relatedGuides: Array<{ title: string; description: string; href: string; image: string; imageAlt: string }>;
  sources: Array<{ title: string; creator: string; url: string; note: string }>;
}
