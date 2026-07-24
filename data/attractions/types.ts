export type AttractionIcon = 'calendar' | 'camera' | 'compass' | 'footprints' | 'landmark' | 'map' | 'mountain' | 'ship' | 'sparkles' | 'tree' | 'waves';

export interface AttractionHighlight {
  slug: string;
  title: string;
  type: string;
  duration: string;
  image: string;
  imageAlt: string;
  description: string;
  bestFor: string;
  tradeoff: string;
  href?: string;
}

export interface AttractionGuideData {
  citySlug: string;
  cityName: string;
  parentGuideHref?: string;
  breadcrumbLabel?: string;
  selectionTitle?: string;
  locale: 'nl';
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
    stats: Array<{ label: string; value: string; icon: AttractionIcon }>;
  };
  highlights: AttractionHighlight[];
  activityTypes: Array<{ icon: AttractionIcon; title: string; description: string; picks: string }>;
  feature: {
    image: string;
    imageAlt: string;
    eyebrow: string;
    title: string;
    description: string;
    panelEyebrow: string;
    panelTitle: string;
    panelDescription: string;
    groups: Array<{ title: string; description: string }>;
  };
  route: {
    eyebrow: string;
    title: string;
    description: string;
    days: Array<{ day: string; title: string; description: string; href: string }>;
  };
  practicalTips: Array<{ icon: AttractionIcon; title: string; description: string }>;
  faqs: Array<{ question: string; answer: string }>;
  relatedGuides: Array<{ title: string; description: string; href: string; image: string; imageAlt?: string }>;
  sources: Array<{ title: string; creator: string; url: string; note: string }>;
}
