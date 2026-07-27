const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const contentDirectory = path.join(process.cwd(), 'content', 'blog');
const publicDirectory = path.join(process.cwd(), 'public');
const DEFAULT_BLOG_IMAGE = '/og-default.webp';

// Locale-specific owner consolidations. Keep the original markdown in version
// control for traceability, but never inherit a Dutch decision in English.
const BLOG_CONSOLIDATIONS = {
  en: {
    'ban-krut-beach-guide-hidden-gem-prachuap-2026': '/city/ban-krut/',
    'best-sim-card-esim-thailand-tourist-guide-2026': '/travel-guides/sim-card-thailand/',
    'thailand-digital-arrival-card-tdac-guide': '/visa/digital-arrival-card/',
  },
  nl: {
    'ban-krut-beach-guide-hidden-gem-prachuap-2026': '/nl/city/ban-krut/',
    'best-sim-card-esim-thailand-tourist-guide-2026': '/nl/travel-guides/sim-card-thailand/',
    'chanthaburi-gem-market-old-town-eastern-thailand-guide-2026': '/nl/city/chanthaburi/',
    'beste-streetfood-in-bangkok-wijken-plekken-en-wat-je-echt-moet-proeven': '/nl/blog/beste-streetfood-bangkok-wijken-plekken-proeven/',
    'digital-nomad-thailand-2026-dtv-visa-costs-cities': '/nl/thailand-index/digital-nomad/',
    'is-thailand-safe-tourists-2026': '/nl/is-thailand-safe/',
    'thailand-budget-2026-daily-costs': '/nl/thailand-index/budget/',
    'thailand-budget-vs-comfort-travel': '/nl/thailand-index/budget/',
    'thailand-cheap-2026-travel-costs': '/nl/thailand-index/budget/',
    'thailand-digital-arrival-card-tdac-guide': '/nl/visa/digital-arrival-card/',
    'thailand-travel-scams-2026': '/nl/practical-info/scams-safety/',
    'thailand-visa-guide-2026': '/nl/visa/',
    'thailand-visa-nederlanders-2026': '/nl/visa/',
    'thailand-visa-nederlanders-2026-wat-je-nodig-hebt': '/nl/visa/',
    'thailand-visa-voor-nederlanders-2026-wat-je-nodig-hebt': '/nl/visa/',
  },
};

function getBlogConsolidation(locale, slug) {
  return BLOG_CONSOLIDATIONS[locale]?.[slug] || null;
}

function isExternalUrl(value) {
  return /^https?:\/\//i.test(value);
}

function normalizeAuthor(author) {
  if (typeof author === 'string' && author.trim()) return { name: author.trim() };
  if (author && typeof author === 'object' && typeof author.name === 'string' && author.name.trim()) {
    return { name: author.name.trim() };
  }
  return { name: 'Go2Thailand Editorial' };
}

function canonicalBlogPath(pathname, locale) {
  const blogMatch = pathname.match(/^\/blog\/([^/]+)\/$/);
  if (blogMatch) {
    const consolidation = getBlogConsolidation(locale, blogMatch[1]);
    if (consolidation) return consolidation.replace(/^\/nl(?=\/)/, '');
  }

  if (pathname === '/transport/bangkok-to-koh-samui/') {
    return locale === 'nl'
      ? '/transport/bangkok-to-surat-thani/'
      : '/blog/bangkok-to-koh-samui-guide/';
  }

  const exact = new Map([
    ['/best-hotels/', '/where-to-stay/'],
    ['/guides/', '/travel-guides/'],
    ['/islands/phuket/', '/city/phuket/'],
    ['/travel-insurance-thailand/', '/travel-insurance/'],
    ['/digital-nomad/', '/thailand-index/digital-nomad/'],
    ['/best-time-to-visit-thailand/', '/weather/'],
    ['/best-day-trips-from-bangkok/', '/blog/best-day-trips-from-bangkok/'],
    ['/blog/best-beaches-in-thailand/', '/best-beaches-in-thailand/'],
    ['/blog/thailand-islands/', '/thailand-islands/'],
    ['/region/central-thailand/', '/region/central/'],
    ['/region/south-thailand/', '/region/southern/'],
    ['/island/koh-phangan/', '/islands/koh-phangan/'],
    ['/island/koh-phi-phi/', '/islands/koh-phi-phi/'],
    ['/island/koh-samui/', '/city/koh-samui/'],
    ['/islands/phi-phi/', '/islands/koh-phi-phi/'],
    ['/food/pad-see-ev/', '/food/pad-see-ew/'],
    ['/how-much-2-weeks-thailand-cost-2026-budget/', '/blog/how-much-2-weeks-thailand-cost-2026-budget/'],
    ['/thailand-first-time-visitors-essential-guide-2026/', '/blog/thailand-first-time-visitors-essential-guide-2026/'],
    ['/thailand-with-kids-family-travel-guide/', '/blog/thailand-with-kids-family-travel-guide/'],
    ['/thailand-travel-packages-guide/', '/blog/thailand-travel-packages-guide/'],
    ['/blog/best-hotels/pai/', '/best-hotels/pai/'],
    ['/blog/prince-akotoki-riverside-bangkok-japanese-luxury-hotel-2026/', '/blog/prince-akatoki-riverside-bangkok-japanese-luxury-hotel-2026/'],
    ['/blog/bangkok-streetfood-beginners/', '/blog/bangkok-street-food-beginners/'],
    ['/blog/beste-kooklessen-bangkok-markt-tour-2026/', '/blog/best-cooking-classes-bangkok-market-tour-2026/'],
    ['/blog/beste-streetfood-markten-bangkok/', '/blog/best-street-food-markets-bangkok/'],
    ['/blog/chatuchak-market-bangkok-gids/', '/blog/chatuchak-market-bangkok-guide/'],
    ['/blog/eet-als-een-local-in-thailand-onder-5-dollar/', '/blog/eat-like-local-thailand-under-5-dollars/'],
    ['/blog/geschiedenis-thaise-keuken/', '/blog/history-of-thai-cuisine/'],
    ['/blog/is-thais-eten-gezond/', '/blog/is-thai-food-healthy/'],
    ['/blog/is-thais-eten-pittig-gids/', '/blog/is-thai-food-spicy-guide/'],
    ['/blog/khao-soi-chiang-mai-gids/', '/blog/khao-soi-chiang-mai-guide/'],
    ['/blog/mango-kleefrijst-seizoen-thailand/', '/blog/mango-sticky-rice-season-thailand/'],
    ['/blog/pad-thai-streetfood-vs-restaurant-thuisgemaakt/', '/blog/pad-thai-street-food-vs-restaurant-homemade/'],
    ['/blog/som-tam-regionale-variaties-thailand/', '/blog/som-tam-regional-variations-thailand/'],
    ['/blog/thaise-curry-gids-groen-rood-geel-massaman-panang/', '/blog/thai-curry-guide-green-red-yellow-massaman-panang/'],
    ['/blog/vegan-thaise-voedsel-gids/', '/blog/vegan-thai-food-guide/'],
    ['/travel-guides/first-time-thailand/', '/thailand-for-first-timers/'],
    ['/travel-guides/thai-etiquette-dos-donts/', '/practical-info/etiquette-culture/'],
    ['/travel-guides/thailand-weather/', '/weather/'],
    ['/travel-guides/vaccinations-travel-health-thailand/', '/practical-info/health-vaccinations/'],
    ['/blog/thailand-budget-2026-daily-costs/', '/thailand-index/budget/'],
    ['/blog/thailand-cheap-2026-travel-costs/', '/thailand-index/budget/'],
    ['/blog/thailand-visa-guide-2026/', '/visa/'],
    ['/blog/thailand-visa-nederlanders-2026/', '/visa/'],
    ['/blog/thailand-visa-nederlanders-2026-wat-je-nodig-hebt/', '/visa/'],
    ['/blog/thailand-visa-voor-nederlanders-2026-wat-je-nodig-hebt/', '/visa/'],
    ['/blog/thailand-digital-arrival-card-tdac-guide/', '/visa/digital-arrival-card/'],
    ['/blog/is-thailand-safe-tourists-2026/', '/is-thailand-safe/'],
    ['/blog/digital-nomad-thailand-2026-dtv-visa-costs-cities/', '/thailand-index/digital-nomad/'],
    ['/blog/thailand-travel-scams-2026/', '/practical-info/scams-safety/'],
    ['/thailand-index/best-time/', '/weather/'],
    ['/thailand-index/safety/', '/is-thailand-safe/'],
    ['/city/bangkok/attractions/grand-palace/', '/grand-palace-tickets/'],
    ['/city/phuket/attractions/phi-phi-islands/', '/phi-phi-island-tour/'],
  ]);
  if (exact.has(pathname)) return exact.get(pathname);

  if (locale === 'nl') {
    const nlCitiesWithoutOwner = new Set(['buriram', 'chiang-khong', 'kamphaeng-phet', 'nan', 'phetchaburi', 'prachinburi', 'satun']);
    const nlWeatherOwners = new Set(['bangkok', 'chiang-mai', 'koh-samui', 'krabi', 'phuket']);
    let nlMatch = pathname.match(/^\/where-to-stay\/([^/]+)(?:\/[^/]+)?\/$/);
    if (nlMatch) return `/best-hotels/${nlMatch[1]}/`;

    nlMatch = pathname.match(/^\/guides\/where-to-stay\/([^/]+)\/$/);
    if (nlMatch) return `/best-hotels/${nlMatch[1]}/`;

    nlMatch = pathname.match(/^\/guides\/travel-guide\/([^/]+)\/$/);
    if (nlMatch) return nlCitiesWithoutOwner.has(nlMatch[1]) ? '/city/' : `/city/${nlMatch[1]}/`;

    nlMatch = pathname.match(/^\/best-hotels\/([^/]+)\/([^/]+)\/$/);
    if (nlMatch) {
      const localizedPhuketCategories = new Set(['all-inclusive', 'family', 'resorts']);
      if (nlMatch[1] !== 'phuket' || !localizedPhuketCategories.has(nlMatch[2])) {
        return `/best-hotels/${nlMatch[1]}/`;
      }
    }

    nlMatch = pathname.match(/^\/areas\/([^/]+)\/[^/]+\/$/);
    if (nlMatch) return `/best-hotels/${nlMatch[1]}/`;

    nlMatch = pathname.match(/^\/city\/([^/]+)\/best-time-to-visit\/$/);
    if (nlMatch) return nlWeatherOwners.has(nlMatch[1]) ? `/city/${nlMatch[1]}/weather/` : '/weather/';

    nlMatch = pathname.match(/^\/city\/([^/]+)\/weather\/$/);
    if (nlMatch && !nlWeatherOwners.has(nlMatch[1])) return '/weather/';

    nlMatch = pathname.match(/^\/city\/([^/]+)\/food\/$/);
    if (nlMatch && nlCitiesWithoutOwner.has(nlMatch[1])) return '/food/';

    nlMatch = pathname.match(/^\/city\/([^/]+)\/$/);
    if (nlMatch && nlCitiesWithoutOwner.has(nlMatch[1])) return '/city/';
  }

  let match = pathname.match(/^\/where-to-stay\/(bangkok|chiang-mai|phuket|koh-samui|krabi|khao-sok|koh-tao)\/$/);
  if (match) return `/best-hotels/${match[1]}/`;
  match = pathname.match(/^\/city\/([^/]+)\/(?:hotels|top-10-hotels)\/$/);
  if (match) return `/best-hotels/${match[1]}/`;
  match = pathname.match(/^\/city\/([^/]+)\/top-10-attractions\/$/);
  if (match) return `/city/${match[1]}/attractions/`;
  match = pathname.match(/^\/city\/([^/]+)\/top-10-restaurants\/$/);
  if (match) return `/city/${match[1]}/food/`;
  match = pathname.match(/^\/(?:destinations)\/([^/]+)\/$/);
  if (match) return canonicalBlogPath(`/city/${match[1]}/`, locale);
  match = pathname.match(/^\/things-to-do\/([^/]+)\/$/);
  if (match) return canonicalBlogPath(`/city/${match[1]}/attractions/`, locale);
  match = pathname.match(/^\/city\/([^/]+)\/attractions\/([^/]+)\/$/);
  if (locale === 'nl' && match) {
    const nlDetailOwners = new Set([
      '/city/koh-samui/attractions/wat-plai-laem/',
      '/city/chiang-rai/attractions/blue-temple/',
    ]);
    if (!nlDetailOwners.has(pathname)) return `/city/${match[1]}/attractions/`;
  }

  return pathname;
}

function normalizeBlogInternalHref(rawHref, locale) {
  const parsed = new URL(rawHref, 'https://go2-thailand.com');
  let inputPathname = parsed.pathname;
  const firstSeg = inputPathname.split('/').filter(Boolean)[0] || '';
  const skip = new Set(['api', '_next', 'images', 'static']);
  if (skip.has(firstSeg)) return rawHref;

  if (firstSeg === 'en' || firstSeg === 'nl') {
    const requestedLocale = locale === 'nl' ? 'nl' : 'en';
    if (firstSeg !== requestedLocale) return rawHref;
    inputPathname = inputPathname.replace(new RegExp(`^/${firstSeg}(?=/)`), '');
  }

  const pathname = canonicalBlogPath(
    inputPathname.endsWith('/') ? inputPathname : `${inputPathname}/`,
    locale,
  );
  const localePath = locale && locale !== 'en' ? `/${locale}${pathname}` : pathname;
  return `${localePath}${parsed.search}${parsed.hash}`;
}

function addAffiliateRelToHtml(contentHtml) {
  return contentHtml.replace(/<a\b[^>]*>/gi, (tag) => {
    const hrefMatch = tag.match(/\bhref=(?:"([^"]+)"|'([^']+)')/i);
    const href = hrefMatch?.[1] || hrefMatch?.[2] || '';
    if (!/(?:\.tpo\.lv\/|tp\.media\/|[?&]tag=[^&]+|amazon\.[a-z.]+\/)/i.test(href)) return tag;

    const relMatch = tag.match(/\brel=(?:"([^"]*)"|'([^']*)')/i);
    const relTokens = new Set(`${relMatch?.[1] || relMatch?.[2] || ''} nofollow sponsored`.trim().split(/\s+/));
    const rel = [...relTokens].filter(Boolean).join(' ');
    if (relMatch) return tag.replace(relMatch[0], `rel="${rel}"`);
    return tag.replace(/>$/, ` rel="${rel}">`);
  });
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

  const fileNames = fs.readdirSync(localeDir)
    .filter(f => f.endsWith('.md'))
    .filter(fileName => !getBlogConsolidation(locale, fileName.replace(/\.md$/, '')));

  const posts = fileNames.map(fileName => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(localeDir, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug,
      ...data,
      title: data.title || slug.replace(/-/g, ' '),
      description: data.description || data.summary || data.excerpt || '',
      category: data.category || 'travel',
      author: normalizeAuthor(data.author),
      tags: Array.isArray(data.tags) ? data.tags.filter(Boolean).map(String) : [],
      readingTime: Number(data.readingTime) || 0,
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

  // The article template owns the single page H1. Historical markdown files
  // occasionally start with another H1, so demote content-level H1s to H2s.
  contentHtml = contentHtml.replace(/<h1>([\s\S]*?)<\/h1>/g, '<h2>$1</h2>');

  // Normalize internal Markdown links in one pass. A large part of the archive
  // still contains absolute links to our own domain and historical owner URLs.
  // The rendered document should link directly to the canonical locale route.
  contentHtml = contentHtml.replace(
    /href="(?:(?:https?:\/\/(?:www\.)?go2-thailand\.com))?(\/[^\"]*)"/gi,
    (match, rawHref) => {
      const normalizedHref = normalizeBlogInternalHref(rawHref, locale);
      return normalizedHref === rawHref ? match : `href="${normalizedHref}"`;
    },
  );
  contentHtml = addAffiliateRelToHtml(contentHtml);

  // Extract FAQ pairs from frontmatter (preferred) or raw markdown
  const faqItems = extractFaqFromMarkdown(content, data);

  return {
    slug,
    contentHtml,
    faqItems,
    ...data,
    title: data.title || slug.replace(/-/g, ' '),
    description: data.description || data.summary || data.excerpt || '',
    category: data.category || 'travel',
    author: normalizeAuthor(data.author),
    tags: Array.isArray(data.tags) ? data.tags.filter(Boolean).map(String) : [],
    readingTime: Number(data.readingTime) || Math.max(1, Math.ceil(content.split(/\s+/).length / 220)),
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
  const pick = (p) => p ? {
    slug: p.slug,
    title: p.title || p.slug.replace(/-/g, ' '),
    category: p.category || 'travel',
  } : null;
  return { prevPost: pick(prevPost), nextPost: pick(nextPost) };
}

module.exports = {
  slugifyTag,
  canonicalBlogPath,
  normalizeBlogInternalHref,
  getBlogConsolidation,
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
