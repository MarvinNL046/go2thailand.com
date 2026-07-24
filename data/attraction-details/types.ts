export type AttractionDetailIcon = 'clock' | 'map' | 'route' | 'sparkles' | 'sun' | 'ticket';

export interface AttractionDetailSource {
  title: string;
  creator: string;
  url: string;
  note: string;
}

export interface AttractionDetailGuideData {
  slug: string;
  citySlug: string;
  cityName: string;
  placeName: string;
  pageTitle: string;
  pageDescription: string;
  pageUrl: string;
  dateModified: string;
  coordinates: { latitude: number; longitude: number };
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
  verdict: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    facts: Array<{ label: string; value: string; note: string; icon: AttractionDetailIcon }>;
  };
  experience: {
    eyebrow: string;
    title: string;
    intro: string;
    details: Array<{ title: string; description: string }>;
    goodFor: string[];
    skipIf: string[];
  };
  visitPlan: {
    eyebrow: string;
    title: string;
    description: string;
    steps: Array<{ label: string; title: string; description: string }>;
  };
  route: {
    eyebrow: string;
    title: string;
    description: string;
    stops: Array<{ label: string; title: string; description: string }>;
  };
  respect: {
    eyebrow: string;
    title: string;
    description: string;
    items: Array<{ title: string; description: string }>;
  };
  faqs: Array<{ question: string; answer: string }>;
  relatedGuides: Array<{ title: string; description: string; href: string; image: string; imageAlt: string }>;
  sources: AttractionDetailSource[];
}
