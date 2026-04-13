const fs = require('fs');
const path = require('path');

// Get all travel guides from registry (static + dynamic)
function getAllTravelGuides() {
  try {
    const index = require('../data/travel-guides/index.json');
    return index;
  } catch (error) {
    console.error('Error loading travel-guides index:', error);
    return [];
  }
}

// Get only dynamic travel guides (excludes static pages like weather, scooter, SIM)
function getDynamicTravelGuides() {
  return getAllTravelGuides().filter(guide => !guide.static);
}

// Get travel guide data by slug
function getTravelGuideBySlug(slug, locale = 'en') {
  try {
    if (locale && locale !== 'en') {
      try { return require(`../data/travel-guides/${locale}/${slug}.json`); } catch (_) {}
    }
    return require(`../data/travel-guides/${slug}.json`);
  } catch (error) {
    console.error(`Error loading travel-guide data for ${slug}:`, error);
    return null;
  }
}

// Get static paths for Next.js [slug].tsx (dynamic guides only)
function getTravelGuideStaticPaths() {
  const dynamicGuides = getDynamicTravelGuides();
  return dynamicGuides.map(guide => ({
    params: { slug: guide.slug }
  }));
}

// Get guides grouped by category
function getTravelGuidesByCategory() {
  const guides = getAllTravelGuides();
  const grouped = {};
  guides.forEach(guide => {
    const cat = guide.category || 'other';
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(guide);
  });
  return grouped;
}

// Get all travel guide slugs for sitemap (static + dynamic)
function getAllTravelGuideSlugs() {
  return getAllTravelGuides().map(guide => guide.slug);
}

module.exports = {
  getAllTravelGuides,
  getDynamicTravelGuides,
  getTravelGuideBySlug,
  getTravelGuideStaticPaths,
  getTravelGuidesByCategory,
  getAllTravelGuideSlugs
};
