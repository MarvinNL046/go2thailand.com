#!/usr/bin/env node
/**
 * Patch sister site blog loaders to read from BOTH `content/blog/` (root)
 * AND `content/blog/en/` (locale subfolder).
 *
 * Root cause: the 10 sister sites have inconsistent file layouts — some
 * have blogs in the root folder (bali, mexico), some only in `/en/`
 * (usa, china, france, japan, vietnam, morocco), some mixed (india, spain).
 * The loader on each site only looks at the root, so sites with files in
 * `/en/` show "Blog coming soon" on their blog index even though 20-40
 * posts exist.
 *
 * This script updates each `lib/blog.js` in-place. Idempotent: detects
 * if the fix is already applied and skips.
 */
import fs from 'node:fs';
import path from 'node:path';

const SITES = [
  'go2-bali.com', 'go2-china.com', 'go2-france.com', 'go2-india.com',
  'go2-japan.com', 'go2-mexico.com', 'go2-morocco.com', 'go2-spain.com',
  'go2-usa.com', 'go2-vietnam.com',
];

const PARENT = '/home/marvin/Projecten';

const MARKER = '// PATCHED: reads both content/blog/ and content/blog/en/';

// Drop-in replacement for the standard blog.js that sister sites share.
// It reads from both locations, dedupes by slug (prefers /en/), and
// keeps the same exported API.
const PATCHED_FILE = `${MARKER}
const path = require('path');
const fs = require('fs');
const matter = require('gray-matter');

const ROOT_DIR = path.join(process.cwd(), 'content', 'blog');
const EN_DIR = path.join(process.cwd(), 'content', 'blog', 'en');

function readBlogsFrom(dir) {
  if (!fs.existsSync(dir)) return [];
  try {
    return fs.readdirSync(dir)
      .filter(f => f.endsWith('.md'))
      .map(filename => ({ filename, dir }));
  } catch { return []; }
}

function loadAllFiles() {
  // /en/ first (takes priority on slug collision), then root.
  const bySlug = new Map();
  for (const ref of readBlogsFrom(EN_DIR)) {
    const slug = ref.filename.replace(/\\.md$/, '');
    if (!bySlug.has(slug)) bySlug.set(slug, ref);
  }
  for (const ref of readBlogsFrom(ROOT_DIR)) {
    const slug = ref.filename.replace(/\\.md$/, '');
    if (!bySlug.has(slug)) bySlug.set(slug, ref);
  }
  return [...bySlug.values()];
}

function getAllPosts() {
  try {
    return loadAllFiles().map(({ filename, dir }) => {
      const fileContent = fs.readFileSync(path.join(dir, filename), 'utf8');
      const { data } = matter(fileContent);
      const toStr = v => v instanceof Date ? v.toISOString() : (v || '');
      const image = data.image || data.heroImage || '/images/blog/default.webp';
      const date = toStr(data.date) || new Date().toISOString();
      const lastUpdated = toStr(data.lastUpdated) || toStr(data.updatedAt) || date;
      return {
        slug: filename.replace(/\\.md$/, ''),
        title: data.title || 'Untitled',
        date,
        excerpt: data.excerpt || data.description || '',
        description: data.description || data.excerpt || '',
        category: data.category || 'general',
        image,
        heroImage: image,
        tags: data.tags || [],
        author: data.author || { name: 'Team' },
        readingTime: data.readingTime || 5,
        lastUpdated,
        updatedAt: lastUpdated,
      };
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error loading blog posts:', error.message);
    return [];
  }
}

async function getPostBySlug(slug) {
  try {
    // Try /en/ first, then root.
    const candidates = [
      path.join(EN_DIR, \`\${slug}.md\`),
      path.join(ROOT_DIR, \`\${slug}.md\`),
    ];
    const filePath = candidates.find(p => fs.existsSync(p));
    if (!filePath) return null;

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    // remark-gfm adds GitHub-flavoured Markdown support: tables, strikethrough,
    // task lists, autolinks. Required because existing blog content uses pipe tables.
    const { remark } = await import('remark');
    const remarkHtml = (await import('remark-html')).default;
    let remarkGfm;
    try { remarkGfm = (await import('remark-gfm')).default; } catch { /* fall back if not installed */ }
    const pipeline = remark();
    if (remarkGfm) pipeline.use(remarkGfm);
    pipeline.use(remarkHtml);
    const processed = await pipeline.process(content);

    // Return EVERY field variant we've seen across sister sites so the loader
    // is compatible regardless of how the page component named the field.
    // Examples of the inconsistency:
    //   - content vs contentHtml (bali/india use content; others contentHtml)
    //   - faq vs faqItems (bali/india use faq; others faqItems)
    //   - description vs excerpt (some use one, some the other)
    //   - image vs heroImage (mexico uses heroImage)
    //   - lastUpdated vs updatedAt (mexico uses updatedAt)
    const html = processed.toString();
    const toStr = v => v instanceof Date ? v.toISOString() : (v || '');
    const image = data.image || data.heroImage || '/images/blog/default.webp';
    const date = toStr(data.date) || new Date().toISOString();
    const lastUpdated = toStr(data.lastUpdated) || toStr(data.updatedAt) || date;
    const faq = data.faq || data.faqItems || [];
    return {
      slug,
      title: data.title || 'Untitled',
      date,
      excerpt: data.excerpt || data.description || '',
      description: data.description || data.excerpt || '',
      category: data.category || 'general',
      image,
      heroImage: image,
      tags: data.tags || [],
      content: html,
      contentHtml: html,
      author: data.author || { name: 'Team' },
      readingTime: data.readingTime || 5,
      lastUpdated,
      updatedAt: lastUpdated,
      sources: data.sources || [],
      faq,
      faqItems: faq,
      toc: data.toc || [],
    };
  } catch (error) {
    console.error(\`Error loading blog post \${slug}:\`, error.message);
    return null;
  }
}

function getAllSlugs() {
  return loadAllFiles().map(({ filename }) => filename.replace(/\\.md$/, ''));
}

// Alias for legacy callers (some pages import this name).
function getPostSlugs() { return getAllSlugs(); }

// Simple tag-overlap related-posts. Returns up to \`limit\` posts sorted by
// descending shared-tag count, excluding the current slug.
function getRelatedPosts(currentSlug, limit = 3) {
  const all = getAllPosts();
  const current = all.find(p => p.slug === currentSlug);
  if (!current) return all.filter(p => p.slug !== currentSlug).slice(0, limit);
  const currentTags = new Set((current.tags || []).map(t => String(t).toLowerCase()));
  const scored = all
    .filter(p => p.slug !== currentSlug)
    .map(p => {
      const tags = (p.tags || []).map(t => String(t).toLowerCase());
      const overlap = tags.filter(t => currentTags.has(t)).length;
      return { post: p, score: overlap };
    })
    .sort((a, b) => b.score - a.score || new Date(b.post.date).getTime() - new Date(a.post.date).getTime());
  return scored.slice(0, limit).map(s => s.post);
}

module.exports = { getAllPosts, getPostBySlug, getAllSlugs, getPostSlugs, getRelatedPosts };
`;

let stats = { patched: 0, alreadyPatched: 0, missing: 0, errors: 0 };
for (const site of SITES) {
  const loaderPath = path.join(PARENT, site, 'lib', 'blog.js');
  if (!fs.existsSync(loaderPath)) {
    console.log(`✗ ${site}: lib/blog.js not found`);
    stats.missing++;
    continue;
  }

  const current = fs.readFileSync(loaderPath, 'utf8');
  if (current.includes(MARKER)) {
    console.log(`· ${site}: already patched`);
    stats.alreadyPatched++;
    continue;
  }

  // Backup and write.
  fs.writeFileSync(loaderPath + '.bak', current);
  fs.writeFileSync(loaderPath, PATCHED_FILE);
  console.log(`✓ ${site}: patched (backup: blog.js.bak)`);
  stats.patched++;
}

console.log('');
console.log(`patched: ${stats.patched}  already: ${stats.alreadyPatched}  missing: ${stats.missing}`);
