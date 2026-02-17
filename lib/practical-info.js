// Get all practical info pages for static generation
function getAllPracticalInfo() {
  try {
    const practicalInfoIndex = require('../data/practical-info/index.json');
    return practicalInfoIndex;
  } catch (error) {
    console.error('Error loading practical-info index:', error);
    return [];
  }
}

// Get practical info data by slug
function getPracticalInfoBySlug(slug) {
  try {
    const infoData = require(`../data/practical-info/${slug}.json`);
    return infoData;
  } catch (error) {
    console.error(`Error loading practical-info data for ${slug}:`, error);
    return null;
  }
}

// Get static paths for Next.js
function getPracticalInfoStaticPaths() {
  const items = getAllPracticalInfo();
  return items.map(item => ({
    params: { slug: item.slug }
  }));
}

// Generate breadcrumbs for practical info pages
function generatePracticalInfoBreadcrumbs(info) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Practical Info', href: '/practical-info/' }
  ];

  if (info) {
    breadcrumbs.push({
      name: info.title.en,
      href: `/practical-info/${info.slug}/`
    });
  }

  return breadcrumbs;
}

module.exports = {
  getAllPracticalInfo,
  getPracticalInfoBySlug,
  getPracticalInfoStaticPaths,
  generatePracticalInfoBreadcrumbs
};
