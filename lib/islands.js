// Get all islands for static generation
function getAllIslands() {
  try {
    const islandsIndex = require('../data/islands/index.json');
    return islandsIndex;
  } catch (error) {
    console.error('Error loading islands index:', error);
    return [];
  }
}

// Get island data by slug
function getIslandBySlug(slug) {
  try {
    const islandData = require(`../data/islands/${slug}.json`);
    return islandData;
  } catch (error) {
    console.error(`Error loading island data for ${slug}:`, error);
    return null;
  }
}

// Get static paths for Next.js
function getIslandStaticPaths() {
  const islands = getAllIslands();
  return islands.map(island => ({
    params: { slug: island.slug }
  }));
}

// Get islands by region (Gulf of Thailand / Andaman Sea)
function getIslandsByRegion(region) {
  const islands = getAllIslands();
  return islands.filter(island =>
    island.region.toLowerCase() === region.toLowerCase()
  );
}

// Get related islands (same region, excluding current)
function getRelatedIslands(currentIsland, limit = 3) {
  const islands = getAllIslands();
  return islands
    .filter(island =>
      island.region === currentIsland.region &&
      island.slug !== currentIsland.slug
    )
    .slice(0, limit);
}

// Generate breadcrumbs for island pages
function generateIslandBreadcrumbs(island) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Islands', href: '/islands/' }
  ];

  if (island) {
    breadcrumbs.push({
      name: island.name.en,
      href: `/islands/${island.slug}/`
    });
  }

  return breadcrumbs;
}

module.exports = {
  getAllIslands,
  getIslandBySlug,
  getIslandStaticPaths,
  getIslandsByRegion,
  getRelatedIslands,
  generateIslandBreadcrumbs
};
