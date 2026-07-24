import fs from 'node:fs';
import path from 'node:path';
import { amazonAffiliateLinks, AMAZON_ASSOCIATES_TAG } from '../lib/amazon-affiliates';

const root = process.cwd();
const sourceRoots = ['components', 'data', 'pages'];
const sourceExtensions = new Set(['.ts', '.tsx', '.js', '.jsx', '.json']);

function walk(directory: string): string[] {
  if (!fs.existsSync(directory)) return [];

  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return walk(fullPath);
    return sourceExtensions.has(path.extname(entry.name)) ? [fullPath] : [];
  });
}

function fail(message: string): never {
  console.error(`Amazon affiliate verification failed: ${message}`);
  process.exit(1);
}

const sourceFiles = sourceRoots.flatMap((directory) => walk(path.join(root, directory)));
const usages = new Set<string>();

for (const file of sourceFiles) {
  const content = fs.readFileSync(file, 'utf8');

  if (/amazon\.com\/dp\/[^\s"']+\?tag=/i.test(content)) {
    fail(`direct tagged Amazon URL found in ${path.relative(root, file)}`);
  }

  for (const match of content.matchAll(/amazonSlug:\s*['"]([a-z0-9-]+)['"]/g)) {
    usages.add(match[1]);
  }
}

for (const slug of usages) {
  if (!(slug in amazonAffiliateLinks)) fail(`unknown product slug: ${slug}`);
}

for (const [slug, url] of Object.entries(amazonAffiliateLinks)) {
  if (!/^https:\/\/www\.amazon\.com\/dp\/[A-Z0-9]{10}$/.test(url)) {
    fail(`invalid canonical Amazon URL for ${slug}`);
  }
}

if (AMAZON_ASSOCIATES_TAG !== 'go2thailand-20') {
  fail('approved Associates tracking ID changed unexpectedly');
}

console.log(`Amazon affiliate verification passed: ${usages.size} used slug(s), ${Object.keys(amazonAffiliateLinks).length} registered product(s).`);
