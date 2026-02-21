const fs = require('fs');
const path = require('path');
const { getAllPosts } = require('./blog');

const SITE_URL = 'https://go2-thailand.com';
const SITE_NAME = 'Go2 Thailand';
const SITE_DESCRIPTION = 'Your ultimate guide to traveling Thailand - tips, itineraries, food guides, and more.';
const FEED_PATH = path.join(process.cwd(), 'public', 'feed.xml');

/**
 * Escape special XML characters in a string.
 */
function escapeXml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Convert a date string (YYYY-MM-DD) to an RFC 822 date for RSS.
 */
function toRfc822Date(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toUTCString();
}

/**
 * Build an RSS 2.0 XML string from blog posts.
 */
function buildFeedXml(posts) {
  const now = new Date().toUTCString();

  const items = posts.map(post => {
    const link = `${SITE_URL}/blog/${post.slug}`;
    const imageUrl = post.image ? `${SITE_URL}${post.image}` : '';

    let categoryTag = '';
    if (post.category) {
      categoryTag = `      <category>${escapeXml(post.category)}</category>`;
    }

    let enclosureTag = '';
    if (post.image) {
      // Determine MIME type based on extension
      const ext = path.extname(post.image).toLowerCase();
      const mimeTypes = {
        '.webp': 'image/webp',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
      };
      const mimeType = mimeTypes[ext] || 'image/jpeg';
      enclosureTag = `      <enclosure url="${escapeXml(imageUrl)}" type="${mimeType}" length="0" />`;
    }

    return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(link)}</link>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${toRfc822Date(post.date)}</pubDate>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
${categoryTag}
${enclosureTag}
    </item>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;
}

/**
 * Generate the RSS feed and write it to public/feed.xml.
 */
function generateFeed() {
  console.log('Generating RSS feed...');

  const posts = getAllPosts('en');
  console.log(`Found ${posts.length} blog posts.`);

  const xml = buildFeedXml(posts);
  fs.writeFileSync(FEED_PATH, xml, 'utf8');

  console.log(`RSS feed written to ${FEED_PATH}`);
}

// Run directly
generateFeed();
