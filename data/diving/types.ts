export type DiveGuideIcon = 'badge' | 'book' | 'calendar' | 'compass' | 'eye' | 'heart' | 'language' | 'plane' | 'shield' | 'ship' | 'users' | 'waves';

export interface DiveCourseChoice {
  slug: string;
  icon: DiveGuideIcon;
  kicker: string;
  title: string;
  duration: string;
  outcome: string;
  bestFor: string;
  tradeoff: string;
}

export interface DiveGuideData {
  slug: string;
  destinationName: string;
  locale: 'nl' | 'en';
  parentGuideHref: string;
  activitiesGuideHref: string;
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
    stats: Array<{ label: string; value: string; icon: DiveGuideIcon }>;
  };
  courseChoices: DiveCourseChoice[];
  schoolDecision: {
    image: string;
    imageAlt: string;
    eyebrow: string;
    title: string;
    description: string;
    checks: Array<{ icon: DiveGuideIcon; title: string; ask: string; why: string }>;
  };
  agencies: Array<{ name: string; label: string; description: string; decision: string }>;
  timeline: {
    eyebrow: string;
    title: string;
    description: string;
    steps: Array<{ label: string; title: string; description: string }>;
  };
  responsibleFeature: {
    image: string;
    imageAlt: string;
    eyebrow: string;
    title: string;
    description: string;
    points: Array<{ title: string; description: string }>;
  };
  diveProfiles: Array<{ title: string; level: string; examples: string; description: string; tradeoff: string }>;
  flightBuffer: {
    eyebrow: string;
    title: string;
    description: string;
    intervals: Array<{ label: string; value: string; description: string }>;
    caveat: string;
  };
  bookingChecklist: Array<{ icon: DiveGuideIcon; title: string; description: string }>;
  faqs: Array<{ question: string; answer: string }>;
  relatedGuides: Array<{ title: string; description: string; href: string; image: string; imageAlt?: string }>;
  sources: Array<{ title: string; creator: string; url: string; note: string }>;
}
