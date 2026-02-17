const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const contentDirectory = path.join(process.cwd(), 'content', 'blog');

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

  // Dynamic import for ESM modules (remark + remark-html)
  const { remark } = await import('remark');
  const remarkHtml = (await import('remark-html')).default;

  const processedContent = await remark()
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
      post.tags.forEach(tag => tags.add(tag));
    }
  });

  return Array.from(tags);
}

// Get posts by category
function getPostsByCategory(category, locale = 'en') {
  const posts = getAllPosts(locale);
  return posts.filter(post => post.category === category);
}

// Get posts by tag
function getPostsByTag(tag, locale = 'en') {
  const posts = getAllPosts(locale);
  return posts.filter(post =>
    post.tags && Array.isArray(post.tags) && post.tags.includes(tag)
  );
}

// Get featured posts
function getFeaturedPosts(locale = 'en') {
  const posts = getAllPosts(locale);
  return posts.filter(post => post.featured);
}

// Get related posts (same category, excluding current)
function getRelatedPosts(currentSlug, locale = 'en', limit = 3) {
  const posts = getAllPosts(locale);
  const currentPost = posts.find(p => p.slug === currentSlug);

  if (!currentPost) return posts.slice(0, limit);

  const related = posts
    .filter(post => post.slug !== currentSlug && post.category === currentPost.category)
    .slice(0, limit);

  if (related.length < limit) {
    const additional = posts
      .filter(post => post.slug !== currentSlug && !related.find(r => r.slug === post.slug))
      .slice(0, limit - related.length);
    related.push(...additional);
  }

  return related;
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
