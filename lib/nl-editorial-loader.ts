import { existsSync, readFileSync } from 'node:fs';
import { resolve, sep } from 'node:path';
import { z } from 'zod';

import type {
  DeepReadonly,
  NlEditorialDocument,
  NlEditorialManifest,
  NlEditorialManifestEntry,
  NlEditorialMarkdownModel,
  NlEditorialProfile,
} from '../data/editorial/blog/types';

const PROJECT_ROOT = process.cwd();
const MANIFEST_PATH = resolve(PROJECT_ROOT, 'seo', 'inventory', 'nl-editorial-manifest.json');
const PROFILE_ROOT = resolve(PROJECT_ROOT, 'data', 'editorial', 'blog', 'nl');
const ARTICLE_ROUTE_PATTERN = /^\/nl\/blog\/([a-z0-9]+(?:-[a-z0-9]+)*)\/$/;
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const clusterSchema = z.enum([
  'planning',
  'destination-guides',
  'food',
  'culture-wellness',
  'transport',
  'attractions',
  'hotels',
  'events',
  'news-trends',
  'policy',
]);

const linkSchema = z.object({
  label: z.string().trim().min(1),
  href: z.string().trim().min(1),
  external: z.boolean().optional(),
}).strict();

const cardSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
  label: z.string().trim().min(1).optional(),
  image: z.string().startsWith('/').optional(),
  imageAlt: z.string().trim().min(1).optional(),
  href: z.string().trim().min(1).optional(),
  note: z.string().trim().min(1).optional(),
}).strict().superRefine((card, context) => {
  if (card.image && !card.imageAlt) {
    context.addIssue({ code: z.ZodIssueCode.custom, path: ['imageAlt'], message: 'imageAlt is required when image is present' });
  }
});

const faqItemSchema = z.object({
  question: z.string().trim().min(1),
  answer: z.string().trim().min(1),
}).strict();

const sourceSchema = z.object({
  title: z.string().trim().min(1),
  publisher: z.string().trim().min(1),
  url: z.string().url().refine((url) => url.startsWith('https://'), 'source URL must use HTTPS'),
  checkedAt: z.string().regex(ISO_DATE_PATTERN),
  note: z.string().trim().min(1).optional(),
}).strict();

const layoutBaseShape = {
  heroVariant: z.enum(['editorial', 'immersive', 'split']).optional(),
  navigation: z.enum(['anchors', 'compact', 'none']).optional(),
  density: z.enum(['standard', 'longform']).optional(),
};

const layoutSchema = z.discriminatedUnion('kind', [
  z.object({ ...layoutBaseShape, kind: z.literal('evergreen-guide'), decisionMode: z.enum(['plan', 'compare', 'learn']) }).strict(),
  z.object({ ...layoutBaseShape, kind: z.literal('destination-guide'), geography: z.enum(['country', 'region', 'city', 'island', 'route']) }).strict(),
  z.object({ ...layoutBaseShape, kind: z.literal('food-guide'), foodMode: z.enum(['dish', 'market', 'restaurant', 'class', 'overview']) }).strict(),
  z.object({ ...layoutBaseShape, kind: z.literal('hotel-guide'), pricePolicy: z.literal('live-price-only') }).strict(),
  z.object({
    ...layoutBaseShape,
    kind: z.literal('event-guide'),
    temporalStatus: z.enum(['scheduled', 'elapsed', 'recurring', 'unknown']),
    startsOn: z.string().regex(ISO_DATE_PATTERN).optional(),
    endsOn: z.string().regex(ISO_DATE_PATTERN).optional(),
    checkedAt: z.string().regex(ISO_DATE_PATTERN),
  }).strict(),
  z.object({
    ...layoutBaseShape,
    kind: z.literal('news-update'),
    newsStatus: z.enum(['developing', 'confirmed', 'superseded', 'archived']),
    checkedAt: z.string().regex(ISO_DATE_PATTERN),
  }).strict(),
  z.object({
    ...layoutBaseShape,
    kind: z.literal('policy-guide'),
    policyStatus: z.enum(['proposed', 'announced', 'effective', 'superseded', 'unknown']),
    checkedAt: z.string().regex(ISO_DATE_PATTERN),
    effectiveFrom: z.string().regex(ISO_DATE_PATTERN).optional(),
  }).strict(),
]);

const blockSchema = z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('prose'), id: z.string().trim().min(1), title: z.string().trim().min(1).optional(), markdown: z.string().trim().min(1) }).strict(),
  z.object({ kind: z.literal('card-grid'), id: z.string().trim().min(1), eyebrow: z.string().trim().min(1).optional(), title: z.string().trim().min(1), description: z.string().trim().min(1).optional(), cards: z.array(cardSchema).min(1) }).strict(),
  z.object({ kind: z.literal('comparison'), id: z.string().trim().min(1), title: z.string().trim().min(1), description: z.string().trim().min(1).optional(), options: z.array(cardSchema).min(2) }).strict(),
  z.object({ kind: z.literal('steps'), id: z.string().trim().min(1), title: z.string().trim().min(1), description: z.string().trim().min(1).optional(), steps: z.array(cardSchema).min(1) }).strict(),
  z.object({ kind: z.literal('checklist'), id: z.string().trim().min(1), title: z.string().trim().min(1), items: z.array(z.string().trim().min(1)).min(1) }).strict(),
  z.object({ kind: z.literal('callout'), id: z.string().trim().min(1), tone: z.enum(['jade', 'cream', 'saffron', 'warning']), title: z.string().trim().min(1), description: z.string().trim().min(1), cta: linkSchema.optional() }).strict(),
  z.object({ kind: z.literal('faq'), id: z.string().trim().min(1), title: z.string().trim().min(1), items: z.array(faqItemSchema).min(1) }).strict(),
  z.object({ kind: z.literal('sources'), id: z.string().trim().min(1), title: z.string().trim().min(1), items: z.array(sourceSchema).min(1) }).strict(),
  z.object({ kind: z.literal('related'), id: z.string().trim().min(1), title: z.string().trim().min(1), items: z.array(cardSchema).min(1) }).strict(),
  z.object({
    kind: z.literal('affiliate'),
    id: z.string().trim().min(1),
    provider: z.enum(['amazon', 'klook', 'trip.com', '12go', 'travelpayouts']),
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    cta: linkSchema,
    placement: z.string().trim().min(1),
    disclosure: z.string().trim().min(1),
  }).strict(),
]);

const profileSchema = z.object({
  schemaVersion: z.literal(1),
  locale: z.literal('nl'),
  slug: z.string().regex(SLUG_PATTERN),
  route: z.string().regex(ARTICLE_ROUTE_PATTERN),
  cluster: clusterSchema,
  editorialStatus: z.enum(['draft', 'review', 'ready', 'archived']),
  updatedAt: z.string().regex(ISO_DATE_PATTERN),
  seo: z.object({
    title: z.string().trim().min(1).max(70),
    description: z.string().trim().min(1).max(180),
    primaryKeyword: z.string().trim().min(1),
    secondaryKeywords: z.array(z.string().trim().min(1)).optional(),
    searchIntent: z.enum(['informational', 'commercial-investigation', 'transactional', 'navigational']),
    canonicalPath: z.string().regex(ARTICLE_ROUTE_PATTERN).optional(),
    noindex: z.boolean().optional(),
  }).strict(),
  hero: z.object({
    eyebrow: z.string().trim().min(1),
    title: z.string().trim().min(1),
    accent: z.string().trim().min(1).optional(),
    description: z.string().trim().min(1),
    image: z.string().startsWith('/'),
    imageAlt: z.string().trim().min(1),
    primaryCta: linkSchema.optional(),
    secondaryCta: linkSchema.optional(),
  }).strict(),
  layout: layoutSchema,
  quickAnswer: z.string().trim().min(1).optional(),
  blocks: z.array(blockSchema),
}).strict().superRefine((profile, context) => {
  const routeSlug = ARTICLE_ROUTE_PATTERN.exec(profile.route)?.[1];
  if (routeSlug !== profile.slug) {
    context.addIssue({ code: z.ZodIssueCode.custom, path: ['route'], message: 'route must match profile slug' });
  }
  if (profile.seo.canonicalPath && profile.seo.canonicalPath !== profile.route) {
    context.addIssue({ code: z.ZodIssueCode.custom, path: ['seo', 'canonicalPath'], message: 'canonicalPath must match profile route' });
  }
  const blockIds = profile.blocks.map((block) => block.id);
  if (new Set(blockIds).size !== blockIds.length) {
    context.addIssue({ code: z.ZodIssueCode.custom, path: ['blocks'], message: 'block ids must be unique within a profile' });
  }
});

const manifestEntrySchema = z.discriminatedUnion('kind', [
  z.object({
    kind: z.literal('index'),
    route: z.literal('/nl/blog/'),
    slug: z.null(),
    cluster: z.literal('index'),
    profilePath: z.null(),
  }).strict(),
  z.object({
    kind: z.literal('article'),
    route: z.string().regex(ARTICLE_ROUTE_PATTERN),
    slug: z.string().regex(SLUG_PATTERN),
    cluster: clusterSchema,
    profilePath: z.string().regex(/^data\/editorial\/blog\/nl\/[a-z0-9]+(?:-[a-z0-9]+)*\.json$/),
  }).strict(),
]);

const manifestSchema = z.object({
  schemaVersion: z.literal(1),
  generatedAt: z.string().regex(ISO_DATE_PATTERN),
  locale: z.literal('nl'),
  familyKey: z.literal('nl:editorial'),
  source: z.object({
    path: z.literal('seo/audits/goal-completion-ledger.json'),
    sha256: z.string().regex(/^[A-F0-9]{64}$/),
    predicate: z.literal('locale=nl AND familyKey=nl:editorial'),
  }).strict(),
  count: z.number().int().nonnegative(),
  articleCount: z.number().int().nonnegative(),
  entries: z.array(manifestEntrySchema),
}).strict().superRefine((manifest, context) => {
  if (manifest.count !== manifest.entries.length) {
    context.addIssue({ code: z.ZodIssueCode.custom, path: ['count'], message: 'count must equal entries.length' });
  }
  const articles = manifest.entries.filter((entry) => entry.kind === 'article');
  if (manifest.articleCount !== articles.length) {
    context.addIssue({ code: z.ZodIssueCode.custom, path: ['articleCount'], message: 'articleCount must equal the article entry count' });
  }
  if (manifest.entries.filter((entry) => entry.kind === 'index').length !== 1) {
    context.addIssue({ code: z.ZodIssueCode.custom, path: ['entries'], message: 'manifest must contain exactly one blog index entry' });
  }
  const routes = manifest.entries.map((entry) => entry.route);
  if (new Set(routes).size !== routes.length) {
    context.addIssue({ code: z.ZodIssueCode.custom, path: ['entries'], message: 'manifest routes must be unique' });
  }
  for (const [index, entry] of articles.entries()) {
    const routeSlug = ARTICLE_ROUTE_PATTERN.exec(entry.route)?.[1];
    const expectedProfilePath = `data/editorial/blog/nl/${entry.slug}.json`;
    if (routeSlug !== entry.slug) {
      context.addIssue({ code: z.ZodIssueCode.custom, path: ['entries', index, 'slug'], message: 'article slug must match route' });
    }
    if (entry.profilePath !== expectedProfilePath) {
      context.addIssue({ code: z.ZodIssueCode.custom, path: ['entries', index, 'profilePath'], message: 'profilePath must match slug' });
    }
  }
});

let manifestCache: DeepReadonly<NlEditorialManifest> | undefined;
let entryCache: ReadonlyMap<string, DeepReadonly<Extract<NlEditorialManifestEntry, { kind: 'article' }>>> | undefined;
const profileCache = new Map<string, DeepReadonly<NlEditorialProfile>>();

function parseJsonFile(path: string): unknown {
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Unable to parse JSON file ${path}: ${message}`);
  }
}

function freezeDeep<T>(value: T): DeepReadonly<T> {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) {
    for (const child of Object.values(value)) freezeDeep(child);
    Object.freeze(value);
  }
  return value as DeepReadonly<T>;
}

function normalizeSlug(slug: string): string {
  const normalized = slug.trim().toLowerCase();
  if (!SLUG_PATTERN.test(normalized)) throw new Error(`Invalid NL editorial slug: ${slug}`);
  return normalized;
}

function buildEntryCache(manifest: DeepReadonly<NlEditorialManifest>) {
  return new Map(
    manifest.entries
      .filter((entry): entry is DeepReadonly<Extract<NlEditorialManifestEntry, { kind: 'article' }>> => entry.kind === 'article')
      .map((entry) => [entry.slug, entry]),
  );
}

export function getNlEditorialManifest(): DeepReadonly<NlEditorialManifest> {
  if (manifestCache) return manifestCache;
  if (!existsSync(MANIFEST_PATH)) throw new Error(`NL editorial manifest not found: ${MANIFEST_PATH}`);

  const parsed = manifestSchema.safeParse(parseJsonFile(MANIFEST_PATH));
  if (!parsed.success) {
    throw new Error(`Invalid NL editorial manifest: ${parsed.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join('; ')}`);
  }

  manifestCache = freezeDeep(parsed.data as NlEditorialManifest);
  entryCache = buildEntryCache(manifestCache);
  return manifestCache;
}

export function listNlEditorialEntries(): readonly DeepReadonly<NlEditorialManifestEntry>[] {
  return getNlEditorialManifest().entries;
}

export function listNlEditorialArticleEntries(): readonly DeepReadonly<Extract<NlEditorialManifestEntry, { kind: 'article' }>>[] {
  getNlEditorialManifest();
  return [...(entryCache?.values() ?? [])];
}

export function getNlEditorialManifestEntry(slug: string): DeepReadonly<Extract<NlEditorialManifestEntry, { kind: 'article' }>> | null {
  const normalized = normalizeSlug(slug);
  getNlEditorialManifest();
  return entryCache?.get(normalized) ?? null;
}

export function hasNlEditorialRouteSlug(slug: string): boolean {
  return getNlEditorialManifestEntry(slug) !== null;
}

export function loadNlEditorialProfile(slug: string): DeepReadonly<NlEditorialProfile> | null {
  const normalized = normalizeSlug(slug);
  if (profileCache.has(normalized)) return profileCache.get(normalized) ?? null;

  const entry = getNlEditorialManifestEntry(normalized);
  if (!entry) return null;

  const profilePath = resolve(PROJECT_ROOT, entry.profilePath);
  if (!profilePath.startsWith(`${PROFILE_ROOT}${sep}`)) {
    throw new Error(`NL editorial profile path escapes profile root: ${entry.profilePath}`);
  }
  if (!existsSync(profilePath)) {
    return null;
  }

  const parsed = profileSchema.safeParse(parseJsonFile(profilePath));
  if (!parsed.success) {
    throw new Error(`Invalid NL editorial profile ${normalized}: ${parsed.error.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`).join('; ')}`);
  }
  if (parsed.data.slug !== entry.slug || parsed.data.route !== entry.route || parsed.data.cluster !== entry.cluster) {
    throw new Error(`NL editorial profile ${normalized} does not match its manifest entry`);
  }

  const profile = freezeDeep(parsed.data as NlEditorialProfile);
  profileCache.set(normalized, profile);
  return profile;
}

export function requireNlEditorialProfile(slug: string): DeepReadonly<NlEditorialProfile> {
  const profile = loadNlEditorialProfile(slug);
  if (!profile) throw new Error(`NL editorial profile not found for manifest slug: ${slug}`);
  return profile;
}

export function combineNlEditorialDocument(
  profile: DeepReadonly<NlEditorialProfile>,
  markdown: DeepReadonly<NlEditorialMarkdownModel>,
): DeepReadonly<NlEditorialDocument> {
  if (profile.slug !== markdown.slug) {
    throw new Error(`Cannot combine NL editorial profile ${profile.slug} with Markdown ${markdown.slug}`);
  }
  return freezeDeep({ profile, markdown } as NlEditorialDocument);
}
