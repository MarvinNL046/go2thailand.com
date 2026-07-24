export type DestinationIcon = 'calendar' | 'car' | 'compass' | 'food' | 'hotel' | 'map' | 'ship' | 'sparkles' | 'sun' | 'waves';

export interface DestinationGuideData {
  citySlug: string;
  cityName: string;
  locale: 'nl';
  pageTitle: string;
  pageDescription: string;
  pageUrl: string;
  dateModified: string;
  coordinates: { latitude: number; longitude: number };
  touristType?: string[];
  breadcrumbsRoot?: { label: string; href: string };
  stayGuideHref?: string | null;
  hero: {
    image: string;
    imageAlt: string;
    eyebrow: string;
    title: string;
    accent: string;
    subtitle: string;
    description: string;
    imageClassName?: string;
    stats: Array<{ label: string; value: string; icon: DestinationIcon }>;
  };
  quickAnswer: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    verdicts: Array<{ label: string; value: string; description: string; icon: DestinationIcon }>;
  };
  zones: Array<{
    slug: string;
    name: string;
    kicker: string;
    image: string;
    imageAlt: string;
    summary: string;
    bestFor: string;
    tradeoff: string;
  }>;
  highlights: Array<{
    title: string;
    eyebrow: string;
    image: string;
    imageAlt: string;
    description: string;
    decision: string;
    href: string;
  }>;
  featureBanner: {
    image: string;
    imageAlt: string;
    eyebrow: string;
    title: string;
    description: string;
  };
  food: {
    image: string;
    imageAlt: string;
    eyebrow: string;
    title: string;
    description: string;
    dishes: Array<{ name: string; description: string }>;
  };
  itinerary: {
    eyebrow: string;
    title: string;
    description: string;
    days: Array<{ day: string; title: string; description: string; href: string }>;
  };
  planning: {
    weather: { title: string; summary: string; best: string; tradeoff: string; href: string; image: string; imageAlt: string };
    transport: { title: string; summary: string; facts: string[]; image: string; imageAlt: string };
  };
  practicalTips: Array<{ icon: DestinationIcon; title: string; description: string }>;
  faqs: Array<{ question: string; answer: string }>;
  relatedGuides: Array<{ title: string; description: string; href: string; image: string; imageAlt?: string }>;
  sources: Array<{ title: string; creator: string; url: string; note: string }>;
}
