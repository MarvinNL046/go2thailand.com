const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const contentDirectory = path.join(process.cwd(), 'content', 'blog');

// Slugify a tag: lowercase, trim, replace non-alphanumeric with hyphens
function slugifyTag(tag) {
  return tag
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
  const contentHtml = processedContent.toString();

  return {
    slug,
    contentHtml,
    ...data,
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

module.exports = {
  slugifyTag,
  getAllPosts,
  getPostBySlug,
  getAllCategories,
  getAllTags,
  getPostsByCategory,
  getPostsByTag,
  getFeaturedPosts,
  getRelatedPosts,
  getPostStaticPaths,
  getCategoryStaticPaths,
  getTagStaticPaths
};
