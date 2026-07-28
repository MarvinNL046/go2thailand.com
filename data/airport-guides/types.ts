export interface AirportArrivalStep {
  label: string;
  title: string;
  description: string;
  check: string;
}

export interface AirportTransferMode {
  title: string;
  bestFor: string;
  description: string;
  tradeoff: string;
  actionLabel?: string;
  actionKind?: 'klook' | 'twelvego';
}

export interface AirportZone {
  area: string;
  direction: string;
  roadReality: string;
  bestFit: string;
}

export interface AirportDecision {
  title: string;
  answer: string;
  detail: string;
}

export interface AirportFaq {
  question: string;
  answer: string;
}

export interface AirportRelatedGuide {
  title: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
}

export interface AirportSource {
  title: string;
  creator: string;
  url: string;
  note: string;
}

export interface AirportArrivalGuideData {
  locale: 'en';
  airportCode: string;
  airportName: string;
  destinationName: string;
  destinationSlug: string;
  pageUrl: string;
  pageTitle: string;
  pageDescription: string;
  datePublished: string;
  dateModified: string;
  heroImage: string;
  heroAlt: string;
  eyebrow: string;
  heroTitle: string;
  heroAccent: string;
  intro: string;
  quickAnswer: string;
  stats: Array<{ label: string; value: string; detail: string }>;
  arrivalSteps: AirportArrivalStep[];
  transferModes: AirportTransferMode[];
  zones: AirportZone[];
  decisions: AirportDecision[];
  lateArrival: {
    title: string;
    description: string;
    checks: string[];
  };
  connectivity: {
    title: string;
    description: string;
    checks: string[];
  };
  faqs: AirportFaq[];
  relatedGuides: AirportRelatedGuide[];
  sources: AirportSource[];
}
