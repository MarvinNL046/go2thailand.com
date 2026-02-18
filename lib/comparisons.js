const fs = require('fs');
const path = require('path');
const { getAllIslands } = require('./islands');
const { getAllCities } = require('./cities');

// Popular comparisons - hardcoded top 10
const POPULAR_COMPARISONS = [
  // Islands
  'koh-samui-vs-koh-phangan',
  'koh-samui-vs-koh-tao',
  'koh-phi-phi-vs-koh-lanta',
  'koh-phangan-vs-koh-tao',
  'koh-samui-vs-koh-phi-phi',
  'koh-chang-vs-koh-lipe',
  'koh-lanta-vs-koh-lipe',
  // Cities
  'bangkok-vs-chiang-mai',
  'bangkok-vs-phuket',
  'chiang-mai-vs-phuket'
];

// Generate all unique pairs from an array of items
// Returns n*(n-1)/2 pairs
function generateAllPairs(items, type) {
  const pairs = [];

  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      const item1 = items[i];
      const item2 = items[j];
      const slug = `${item1.slug}-vs-${item2.slug}`;

      pairs.push({
        slug,
        item1: item1.slug,
        item2: item2.slug,
        type,
        name1: item1.name,
        name2: item2.name
      });
    }
  }

  return pairs;
}

// Returns array of ALL comparison slugs (island + city)
function getAllComparisonSlugs() {
  const allComparisons = getAllComparisons();
  return allComparisons.map(pair => pair.slug);
}

// Returns array of ALL comparison pair objects (both island and city)
function getAllComparisons() {
  const islands = getAllIslands();
  const cities = getAllCities();

  const islandPairs = generateAllPairs(islands, 'island');
  const cityPairs = generateAllPairs(cities, 'city');

  return [...islandPairs, ...cityPairs];
}

// Determines if a slug is an island or city comparison
// Returns 'island', 'city', or null if not found
function getComparisonType(slug) {
  const islands = getAllIslands();
  const cities = getAllCities();

  const islandSlugs = new Set(islands.map(i => i.slug));
  const citySlugs = new Set(cities.map(c => c.slug));

  const pair = getComparisonPair(slug);
  if (!pair) return null;

  if (islandSlugs.has(pair.item1Slug) && islandSlugs.has(pair.item2Slug)) {
    return 'island';
  }

  if (citySlugs.has(pair.item1Slug) && citySlugs.has(pair.item2Slug)) {
    return 'city';
  }

  return null;
}

// Loads enriched comparison data from data/comparisons/{type}/{slug}.json
// Returns null if file doesn't exist (not all comparisons will be enriched yet)
function getComparisonBySlug(slug) {
  const type = getComparisonType(slug);
  if (!type) return null;

  try {
    const filePath = path.join(
      __dirname,
      '../data/comparisons',
      type,
      `${slug}.json`
    );
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    // File does not exist yet - expected for unenriched comparisons
    return null;
  }
}

// Parses a comparison slug like "koh-samui-vs-koh-phangan"
// Returns { item1Slug, item2Slug, type } or null if invalid
function getComparisonPair(slug) {
  if (!slug || !slug.includes('-vs-')) return null;

  const vsIndex = slug.indexOf('-vs-');
  if (vsIndex === -1) return null;

  const item1Slug = slug.substring(0, vsIndex);
  const item2Slug = slug.substring(vsIndex + 4); // length of '-vs-' is 4

  if (!item1Slug || !item2Slug) return null;

  // Determine type
  const islands = getAllIslands();
  const cities = getAllCities();

  const islandSlugs = new Set(islands.map(i => i.slug));
  const citySlugs = new Set(cities.map(c => c.slug));

  let type = null;
  if (islandSlugs.has(item1Slug) && islandSlugs.has(item2Slug)) {
    type = 'island';
  } else if (citySlugs.has(item1Slug) && citySlugs.has(item2Slug)) {
    type = 'city';
  }

  return { item1Slug, item2Slug, type };
}

// Returns the hardcoded top 10 popular comparison slugs
function getPopularComparisons() {
  return POPULAR_COMPARISONS;
}

// Returns all comparison slugs that include a specific island or city
// Used for internal linking on island/city detail pages
function getComparisonsForItem(itemSlug, type) {
  const items = type === 'island' ? getAllIslands() : getAllCities();
  const pairs = generateAllPairs(items, type);

  return pairs
    .filter(pair => pair.item1 === itemSlug || pair.item2 === itemSlug)
    .map(pair => pair.slug);
}

module.exports = {
  generateAllPairs,
  getAllComparisonSlugs,
  getAllComparisons,
  getComparisonType,
  getComparisonBySlug,
  getComparisonPair,
  getPopularComparisons,
  getComparisonsForItem
};

// Individual exports for ES6 import syntax compatibility
module.exports.generateAllPairs = generateAllPairs;
module.exports.getAllComparisonSlugs = getAllComparisonSlugs;
module.exports.getAllComparisons = getAllComparisons;
module.exports.getComparisonType = getComparisonType;
module.exports.getComparisonBySlug = getComparisonBySlug;
module.exports.getComparisonPair = getComparisonPair;
module.exports.getPopularComparisons = getPopularComparisons;
module.exports.getComparisonsForItem = getComparisonsForItem;
