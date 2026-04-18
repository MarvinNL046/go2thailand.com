const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const contentDirectory = path.join(process.cwd(), 'content', 'blog');
const publicDirectory = path.join(process.cwd(), 'public');
const DEFAULT_BLOG_IMAGE = '/og-default.webp';

function isExternalUrl(value) {
  return /^https?:\/\//i.test(value);
}

function resolveBlogImage(image, slug) {
  if (slug) {
    const generatedSlugImage = `/images/blog/${slug}.webp`;
    const generatedSlugPath = path.join(publicDirectory, generatedSlugImage.replace(/^\/+/, ''));
    if (fs.existsSync(generatedSlugPath)) {
      return generatedSlugImage;
    }
  }

  if (typeof image !== 'string') {
    return DEFAULT_BLOG_IMAGE;
  }

  const normalizedImage = image.trim();

  if (!normalizedImage) {
    return DEFAULT_BLOG_IMAGE;
  }

  if (isExternalUrl(normalizedImage)) {
    return normalizedImage;
  }

  const publicImagePath = normalizedImage.startsWith('/') ? normalizedImage : `/${normalizedImage}`;
  const filePath = path.join(publicDirectory, publicImagePath.replace(/^\/+/, ''));

  return fs.existsSync(filePath) ? publicImagePath : DEFAULT_BLOG_IMAGE;
}

// Slugify a tag: lowercase, trim, replace non-alphanumeric with hyphens
function slugifyTag(tag) {
  if (tag == null) return '';
  return String(tag)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Get all blog posts for a locale
function getAllPosts(locale = 'en') {
  const localeDir = path.join(contentDirectory, locale);

  if (!fs.existsSync(localeDir)) {
    return [];
  }

  const fileNames = fs.readdirSync(localeDir).filter(f => f.endsWith('.md'));

  const posts = fileNames.map(fileName => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(localeDir, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug,
      ...data,
      image: resolveBlogImage(data.image, slug),
      date: data.date ? String(data.date) : '',
    };
  });

  // Sort by date descending
  return posts.sort((a, b) => {
    if (a.date < b.date) return 1;
    if (a.date > b.date) return -1;
    return 0;
  });
}

// Lightweight list — returns ONLY the fields the blog-index grid needs.
// Strips `sources`, `faqItems`, `lastUpdated`, `readingTime`, etc. so the
// getStaticProps payload doesn't cross Next.js' 128 kB warning. About 60%
// smaller than getAllPosts(). Use this anywhere you render card lists.
function getPostsForIndex(locale = 'en') {
  const trunc = s => (typeof s === 'string' && s.length > 180 ? s.slice(0, 177).trimEnd() + '…' : (s || ''));
  return getAllPosts(locale).map(p => ({
    slug: p.slug,
    title: p.title || '',
    // Truncate description for card view; full text still loads on the post page.
    description: trunc(p.description || p.excerpt || ''),
    category: p.category || 'general',
    date: p.date || '',
    image: p.image,
    tags: Array.isArray(p.tags) ? p.tags.filter(Boolean).slice(0, 4) : [],
    author: p.author ? { name: p.author.name || 'Team' } : { name: 'Team' },
    featured: !!p.featured,
  }));
}

// Strip markdown formatting to produce plain text for structured data
function stripMarkdown(text) {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')  // [text](url) -> text
    .replace(/\*\*([^*]+)\*\*/g, '$1')          // **bold** -> bold
    .replace(/\*([^*]+)\*/g, '$1')               // *italic* -> italic
    .replace(/`([^`]+)`/g, '$1')                 // `code` -> code
    .replace(/~~([^~]+)~~/g, '$1')               // ~~strike~~ -> strike
    .trim();
}

// Extract FAQ question-answer pairs from raw markdown content
function extractFaqFromMarkdown(markdown, frontmatter) {
  // Prefer frontmatter faq/faqItems when present
  if (frontmatter && Array.isArray(frontmatter.faq) && frontmatter.faq.length > 0) {
    return frontmatter.faq.map(f => ({ question: f.question, answer: f.answer }));
  }
  if (frontmatter && Array.isArray(frontmatter.faqItems) && frontmatter.faqItems.length > 0) {
    return frontmatter.faqItems.map(f => ({ question: f.question, answer: f.answer }));
  }
  const faqItems = [];

  // Find the FAQ section: starts with ## FAQ or ## Frequently Asked Questions
  const faqMatch = markdown.match(/^##\s+(?:FAQ|Frequently Asked Questions)\s*$/m);
  if (!faqMatch) return faqItems;

  // Get content after the FAQ heading
  const faqStart = faqMatch.index + faqMatch[0].length;
  const afterFaq = markdown.slice(faqStart);

  // End the FAQ section at the next ## heading, --- separator, or end of content
  const sectionEndMatch = afterFaq.match(/^(?:##\s|---)/m);
  const faqSection = sectionEndMatch
    ? afterFaq.slice(0, sectionEndMatch.index)
    : afterFaq;

  // Split into ### question blocks
  const questionBlocks = faqSection.split(/^###\s+/m).filter(block => block.trim());

  for (const block of questionBlocks) {
    const lines = block.split('\n');
    const question = stripMarkdown(lines[0].trim());

    // Answer is everything after the question line, skipping empty lines
    const answerLines = lines.slice(1).filter(line => line.trim() !== '');
    const answer = stripMarkdown(answerLines.join(' '));

    if (question && answer) {
      faqItems.push({ question, answer });
    }
  }

  return faqItems;
}

// Get a single post by slug with parsed HTML content
async function getPostBySlug(slug, locale = 'en') {
  const fullPath = path.join(contentDirectory, locale, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // Dynamic import for ESM modules (remark + remark-html + remark-gfm)
  const { remark } = await import('remark');
  const remarkGfm = (await import('remark-gfm')).default;
  const remarkHtml = (await import('remark-html')).default;

  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(content);
  let contentHtml = processedContent.toString();

  // For non-default locales, prefix internal absolute paths with /{locale} so
  // raw <a href="/city/..."> links keep the reader in the same locale.
  // Skip: external URLs (http/https, mailto, tel), anchors (#), already-prefixed
  // locale paths, API routes, and image/asset paths.
  if (locale && locale !== 'en') {
    contentHtml = contentHtml.replace(
      /href="\/([^"/][^"]*)"/g,
      (match, rest) => {
        const firstSeg = rest.split('/')[0];
        const skip = new Set(['en', 'nl', 'api', '_next', 'images', 'static']);
        if (skip.has(firstSeg)) return match;
        return `href="/${locale}/${rest}"`;
      }
    );
  }

  // Extract FAQ pairs from frontmatter (preferred) or raw markdown
  const faqItems = extractFaqFromMarkdown(content, data);

  return {
    slug,
    contentHtml,
    faqItems,
    ...data,
    image: resolveBlogImage(data.image, slug),
    date: data.date ? String(data.date) : '',
  };
}

// Get all unique categories
function getAllCategories(locale = 'en') {
  const posts = getAllPosts(locale);
  const categories = new Set();

  posts.forEach(post => {
    if (post.category) {
      categories.add(post.category);
    }
  });

  return Array.from(categories);
}

// Get all unique tags
function getAllTags(locale = 'en') {
  const posts = getAllPosts(locale);
  const tags = new Set();

  posts.forEach(post => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach(tag => tags.add(slugifyTag(tag)));
    }
  });

  return Array.from(tags);
}

// Get posts by category
function getPostsByCategory(category, locale = 'en') {
  const posts = getAllPosts(locale);
  return posts.filter(post => post.category === category);
}

// Get posts by tag (tag param is expected to be slugified)
function getPostsByTag(tag, locale = 'en') {
  const posts = getAllPosts(locale);
  return posts.filter(post =>
    post.tags && Array.isArray(post.tags) && post.tags.some(t => slugifyTag(t) === tag)
  );
}

// Get featured posts
function getFeaturedPosts(locale = 'en') {
  const posts = getAllPosts(locale);
  return posts.filter(post => post.featured);
}

// Get related posts: same category first, then tag overlap, then recent posts
function getRelatedPosts(currentSlug, locale = 'en', limit = 3) {
  const posts = getAllPosts(locale);
  const currentPost = posts.find(p => p.slug === currentSlug);

  if (!currentPost) return posts.slice(0, limit);

  const currentTags = (currentPost.tags || []).map(t => slugifyTag(t));
  const others = posts.filter(post => post.slug !== currentSlug);

  // Score each post: +10 for same category, +1 per shared tag
  const scored = others.map(post => {
    let score = 0;
    if (post.category === currentPost.category) score += 10;
    const postTags = (post.tags || []).map(t => slugifyTag(t));
    score += postTags.filter(t => currentTags.includes(t)).length;
    return { post, score };
  });

  // Sort by score descending, then by date descending for ties
  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (a.post.date < b.post.date) return 1;
    if (a.post.date > b.post.date) return -1;
    return 0;
  });

  return scored.slice(0, limit).map(s => s.post);
}

// Get static paths for all posts
function getPostStaticPaths(locale = 'en') {
  const posts = getAllPosts(locale);
  return posts.map(post => ({
    params: { slug: post.slug }
  }));
}

// Get static paths for all categories
function getCategoryStaticPaths(locale = 'en') {
  const categories = getAllCategories(locale);
  return categories.map(category => ({
    params: { category }
  }));
}

// Get static paths for all tags
function getTagStaticPaths(locale = 'en') {
  const tags = getAllTags(locale);
  return tags.map(tag => ({
    params: { tag }
  }));
}

// Get the previous and next posts by date (for prev/next navigation)
function getAdjacentPosts(currentSlug, locale = 'en') {
  const posts = getAllPosts(locale);
  const currentIndex = posts.findIndex(p => p.slug === currentSlug);

  if (currentIndex === -1) return { prevPost: null, nextPost: null };

  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  // Return minimal data to keep props small
  const pick = (p) => p ? { slug: p.slug, title: p.title, category: p.category || 'travel' } : null;
  return { prevPost: pick(prevPost), nextPost: pick(nextPost) };
}

module.exports = {
  slugifyTag,
  getAllPosts,
  getPostsForIndex,
  getPostBySlug,
  getAllCategories,
  getAllTags,
  getPostsByCategory,
  getPostsByTag,
  getFeaturedPosts,
  getRelatedPosts,
  getPostStaticPaths,
  getCategoryStaticPaths,
  getTagStaticPaths,
  getAdjacentPosts
};
