export type DeepReadonly<T> = T extends (...args: never[]) => unknown
  ? T
  : T extends readonly (infer U)[]
    ? readonly DeepReadonly<U>[]
    : T extends object
      ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
      : T;

export type NlEditorialCluster =
  | 'planning'
  | 'destination-guides'
  | 'food'
  | 'culture-wellness'
  | 'transport'
  | 'attractions'
  | 'hotels'
  | 'events'
  | 'news-trends'
  | 'policy';

export type NlEditorialManifestEntry =
  | {
      readonly kind: 'index';
      readonly route: '/nl/blog/';
      readonly slug: null;
      readonly cluster: 'index';
      readonly profilePath: null;
    }
  | {
      readonly kind: 'article';
      readonly route: `/nl/blog/${string}/`;
      readonly slug: string;
      readonly cluster: NlEditorialCluster;
      readonly profilePath: `data/editorial/blog/nl/${string}.json`;
    };

export interface NlEditorialManifest {
  readonly schemaVersion: 1;
  readonly generatedAt: string;
  readonly locale: 'nl';
  readonly familyKey: 'nl:editorial';
  readonly source: {
    readonly path: 'seo/audits/goal-completion-ledger.json';
    readonly sha256: string;
    readonly predicate: 'locale=nl AND familyKey=nl:editorial';
  };
  readonly count: number;
  readonly articleCount: number;
  readonly entries: readonly NlEditorialManifestEntry[];
}

export interface NlEditorialSeo {
  title: string;
  description: string;
  primaryKeyword: string;
  secondaryKeywords?: string[];
  searchIntent: 'informational' | 'commercial-investigation' | 'transactional' | 'navigational';
  canonicalPath?: `/nl/blog/${string}/`;
  noindex?: boolean;
}

export interface NlEditorialHero {
  eyebrow: string;
  title: string;
  accent?: string;
  description: string;
  image: `/${string}`;
  imageAlt: string;
  primaryCta?: NlEditorialLink;
  secondaryCta?: NlEditorialLink;
}

export interface NlEditorialLink {
  label: string;
  href: string;
  external?: boolean;
}

interface NlEditorialLayoutBase {
  heroVariant?: 'editorial' | 'immersive' | 'split';
  navigation?: 'anchors' | 'compact' | 'none';
  density?: 'standard' | 'longform';
}

export interface NlEvergreenGuideLayout extends NlEditorialLayoutBase {
  kind: 'evergreen-guide';
  decisionMode: 'plan' | 'compare' | 'learn';
}

export interface NlDestinationGuideLayout extends NlEditorialLayoutBase {
  kind: 'destination-guide';
  geography: 'country' | 'region' | 'city' | 'island' | 'route';
}

export interface NlFoodGuideLayout extends NlEditorialLayoutBase {
  kind: 'food-guide';
  foodMode: 'dish' | 'market' | 'restaurant' | 'class' | 'overview';
}

export interface NlHotelGuideLayout extends NlEditorialLayoutBase {
  kind: 'hotel-guide';
  pricePolicy: 'live-price-only';
}

export interface NlEventGuideLayout extends NlEditorialLayoutBase {
  kind: 'event-guide';
  temporalStatus: 'scheduled' | 'elapsed' | 'recurring' | 'unknown';
  startsOn?: string;
  endsOn?: string;
  checkedAt: string;
}

export interface NlNewsUpdateLayout extends NlEditorialLayoutBase {
  kind: 'news-update';
  newsStatus: 'developing' | 'confirmed' | 'superseded' | 'archived';
  checkedAt: string;
}

export interface NlPolicyGuideLayout extends NlEditorialLayoutBase {
  kind: 'policy-guide';
  policyStatus: 'proposed' | 'announced' | 'effective' | 'superseded' | 'unknown';
  checkedAt: string;
  effectiveFrom?: string;
}

export type NlEditorialLayout =
  | NlEvergreenGuideLayout
  | NlDestinationGuideLayout
  | NlFoodGuideLayout
  | NlHotelGuideLayout
  | NlEventGuideLayout
  | NlNewsUpdateLayout
  | NlPolicyGuideLayout;

export interface NlEditorialCard {
  title: string;
  description: string;
  label?: string;
  image?: `/${string}`;
  imageAlt?: string;
  href?: string;
  note?: string;
}

export interface NlEditorialSource {
  title: string;
  publisher: string;
  url: `https://${string}`;
  checkedAt: string;
  note?: string;
}

export interface NlEditorialFaqItem {
  question: string;
  answer: string;
}

export type NlEditorialAffiliateProvider = 'amazon' | 'klook' | 'trip.com' | '12go' | 'travelpayouts';

export interface NlEditorialAffiliateBlock {
  kind: 'affiliate';
  id: string;
  provider: NlEditorialAffiliateProvider;
  title: string;
  description: string;
  cta: NlEditorialLink;
  placement: string;
  disclosure: string;
}

export type NlEditorialBlock =
  | { kind: 'prose'; id: string; title?: string; markdown: string }
  | { kind: 'card-grid'; id: string; eyebrow?: string; title: string; description?: string; cards: NlEditorialCard[] }
  | { kind: 'comparison'; id: string; title: string; description?: string; options: NlEditorialCard[] }
  | { kind: 'steps'; id: string; title: string; description?: string; steps: NlEditorialCard[] }
  | { kind: 'checklist'; id: string; title: string; items: string[] }
  | { kind: 'callout'; id: string; tone: 'jade' | 'cream' | 'saffron' | 'warning'; title: string; description: string; cta?: NlEditorialLink }
  | { kind: 'faq'; id: string; title: string; items: NlEditorialFaqItem[] }
  | { kind: 'sources'; id: string; title: string; items: NlEditorialSource[] }
  | { kind: 'related'; id: string; title: string; items: NlEditorialCard[] }
  | NlEditorialAffiliateBlock;

export interface NlEditorialProfile {
  schemaVersion: 1;
  locale: 'nl';
  slug: string;
  route: `/nl/blog/${string}/`;
  cluster: NlEditorialCluster;
  editorialStatus: 'draft' | 'review' | 'ready' | 'archived';
  updatedAt: string;
  seo: NlEditorialSeo;
  hero: NlEditorialHero;
  layout: NlEditorialLayout;
  quickAnswer?: string;
  blocks: NlEditorialBlock[];
}

export interface NlEditorialMarkdownModel {
  slug: string;
  title: string;
  description: string;
  category: string;
  date?: string;
  lastUpdated?: string;
  image?: string;
  author?: { name: string };
  tags?: string[];
  readingTime?: number;
  contentHtml: string;
  faqItems?: NlEditorialFaqItem[];
  sources?: Array<{ name?: string; title?: string; url: string; note?: string }>;
}

export interface NlEditorialDocument {
  profile: DeepReadonly<NlEditorialProfile>;
  markdown: DeepReadonly<NlEditorialMarkdownModel>;
}
