import { readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { getNlEditorialManifest, requireNlEditorialProfile } from '../lib/nl-editorial-loader';

interface FamilyCompletion {
  families: Array<{
    key: string;
    acceptedRoutes?: string[];
    status?: string;
  }>;
}

const root = process.cwd();
const acceptedOnly = process.argv.includes('--accepted-only');
const familyCompletion = JSON.parse(
  readFileSync(resolve(root, 'seo', 'inventory', 'family-completion.json'), 'utf8'),
) as FamilyCompletion;
const family = familyCompletion.families.find((entry) => entry.key === 'nl:editorial');

if (!family) throw new Error('nl:editorial is missing from family-completion.json');
if (family.status === 'complete') throw new Error('nl:editorial may not be complete while routes remain unaccepted');

const manifest = getNlEditorialManifest();
if (manifest.count !== 253 || manifest.articleCount !== 252) {
  throw new Error(`Unexpected NL editorial manifest size: ${manifest.count}/${manifest.articleCount}`);
}

const acceptedRoutes = new Set(family.acceptedRoutes ?? []);
if (!acceptedRoutes.has('/nl/blog/')) throw new Error('The NL blog hub must remain an accepted route');

const profileDirectory = resolve(root, 'data', 'editorial', 'blog', 'nl');
const profileSlugs = readdirSync(profileDirectory)
  .filter((file) => file.endsWith('.json'))
  .map((file) => file.replace(/\.json$/, ''));

let verifiedProfileCount = 0;
for (const slug of profileSlugs) {
  const profile = requireNlEditorialProfile(slug);
  if (!acceptedRoutes.has(profile.route)) {
    if (acceptedOnly) continue;
    throw new Error(`Profile ${slug} is not listed as accepted in nl:editorial`);
  }
  if (profile.editorialStatus === 'draft') {
    throw new Error(`Accepted profile ${slug} still has draft status`);
  }
  verifiedProfileCount += 1;
}

const acceptedArticleRoutes = [...acceptedRoutes].filter((route) => route !== '/nl/blog/');
if (acceptedArticleRoutes.length !== verifiedProfileCount) {
  throw new Error(`Accepted/profile mismatch: ${acceptedArticleRoutes.length}/${verifiedProfileCount}`);
}

for (const route of acceptedArticleRoutes) {
  const slug = route.match(/^\/nl\/blog\/([^/]+)\/$/)?.[1];
  if (!slug) throw new Error(`Invalid accepted editorial route: ${route}`);
  requireNlEditorialProfile(slug);
}

console.log(
  `NL editorial verification passed: ${acceptedRoutes.size}/${manifest.count} accepted; ${verifiedProfileCount} verified article profiles${acceptedOnly ? ` (${profileSlugs.length - verifiedProfileCount} in-progress ignored)` : ''}.`,
);
