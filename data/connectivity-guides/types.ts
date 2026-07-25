import type { AmazonAffiliateSlug } from '../../lib/amazon-affiliates';

export interface ConnectivityFaq {
  question: string;
  answer: string;
}

export interface ConnectivitySource {
  title: string;
  creator: string;
  url: string;
  note: string;
}

export interface ConnectivityGuideData {
  slug: string;
  publishedAt: string;
  updatedAt: string;
  seo: { title: string; description: string; image: string; keywords: string };
  hero: { eyebrow: string; title: string; accent: string; description: string; image: string; imageAlt: string };
  choices: Array<{ label: string; title: string; description: string; verdict: string }>;
  comparison: Array<{ feature: string; travelEsim: string; thaiSim: string; roaming: string }>;
  dataProfiles: Array<{ label: string; title: string; amount: string; description: string; tips: string[] }>;
  purchaseOptions: Array<{ label: string; title: string; description: string; goodFor: string; caution: string }>;
  providers: Array<{ title: string; label: string; description: string; checks: string[] }>;
  setupSteps: Array<{ title: string; description: string; check: string }>;
  troubleshooting: Array<{ problem: string; actions: string[] }>;
  amazonProducts: Array<{ title: string; reason: string; amazonSlug: AmazonAffiliateSlug }>;
  faqs: ConnectivityFaq[];
  related: Array<{ title: string; description: string; href: string; image: string; imageAlt: string }>;
  sources: ConnectivitySource[];
}
