import { existsSync, readFileSync, statSync } from 'node:fs';
import { resolve, sep } from 'node:path';

import matter from 'gray-matter';
import sharp from 'sharp';

import { requireNlEditorialProfile } from '../lib/nl-editorial-loader';

interface FamilyCompletion {
  families: Array<{ key: string; acceptedRoutes?: string[] }>;
}

const root = process.cwd();
const publicRoot = resolve(root, 'public');
const familyCompletion = JSON.parse(
  readFileSync(resolve(root, 'seo', 'inventory', 'family-completion.json'), 'utf8'),
) as FamilyCompletion;
const acceptedRoutes = familyCompletion.families
  .find((family) => family.key === 'nl:editorial')
  ?.acceptedRoutes ?? [];

async function main() {
  let verified = 0;

  for (const route of acceptedRoutes) {
    if (route === '/nl/blog/') continue;
    const slug = route.match(/^\/nl\/blog\/([^/]+)\/$/)?.[1];
    if (!slug) throw new Error(`Invalid accepted editorial route: ${route}`);

    const profile = requireNlEditorialProfile(slug);
    const heroPath = resolve(publicRoot, profile.hero.image.replace(/^\/+/, ''));
    if (!heroPath.startsWith(`${publicRoot}${sep}`)) throw new Error(`Hero escapes public root: ${profile.hero.image}`);
    if (!existsSync(heroPath)) throw new Error(`Missing editorial hero: ${profile.hero.image}`);

    const bytes = statSync(heroPath).size;
    if (bytes > 450_000) throw new Error(`Editorial hero exceeds 450 KB: ${profile.hero.image} (${bytes} bytes)`);

    const metadata = await sharp(heroPath).metadata();
    if (!metadata.width || !metadata.height || metadata.width < 1000 || metadata.height < 560) {
      throw new Error(`Editorial hero is too small: ${profile.hero.image} (${metadata.width}x${metadata.height})`);
    }

    const articlePath = resolve(root, 'content', 'blog', 'nl', `${slug}.md`);
    const frontmatter = matter(readFileSync(articlePath, 'utf8')).data as { image?: string };
    if (frontmatter.image !== profile.hero.image) {
      throw new Error(`Frontmatter/profile hero mismatch for ${slug}: ${frontmatter.image} !== ${profile.hero.image}`);
    }

    verified += 1;
  }

  console.log(`NL editorial asset verification passed: ${verified} accepted article hero(s), all local, matched and <= 450 KB.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
