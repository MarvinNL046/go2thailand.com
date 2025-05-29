const fs = require('fs');
const path = require('path');

// Get all regions from the index file
function getAllRegions() {
  try {
    // Use process.cwd() to get the project root directory
    const regionsIndexPath = path.join(process.cwd(), 'data', 'regions', 'index.json');
    const regionsData = JSON.parse(fs.readFileSync(regionsIndexPath, 'utf8'));
    return regionsData;
  } catch (error) {
    console.error('Error loading regions:', error);
    return [];
  }
}

// Get a specific region by slug
function getRegionBySlug(slug) {
  try {
    // Use process.cwd() to get the project root directory
    const regionPath = path.join(process.cwd(), 'data', 'regions', `${slug}.json`);
    const regionData = JSON.parse(fs.readFileSync(regionPath, 'utf8'));
    return regionData;
  } catch (error) {
    console.error(`Error loading region ${slug}:`, error);
    return null;
  }
}

// Get all region static paths for Next.js
function getRegionStaticPaths() {
  const regions = getAllRegions();
  return regions.map(region => ({
    params: { slug: region.slug }
  }));
}

// Generate metadata for a region
function generateRegionMetadata(region) {
  if (!region) return {};

  return {
    title: region.seo.metaTitle.en,
    description: region.seo.metaDescription.en,
    keywords: `${region.name.en}, Thailand, ${region.cities.join(', ')}, travel guide, attractions, culture`,
    openGraph: {
      title: region.seo.metaTitle.en,
      description: region.seo.metaDescription.en,
      images: [
        {
          url: region.image,
          width: 1200,
          height: 630,
          alt: `${region.name.en}, Thailand`,
        },
      ],
      type: 'website',
    },
  };
}

// Generate breadcrumbs for a region
function generateRegionBreadcrumbs(region) {
  return [
    { name: 'Home', href: '/' },
    { name: 'Regions', href: '/region/' },
    { name: region.name.en, href: `/region/${region.slug}/` }
  ];
}

module.exports = {
  getAllRegions,
  getRegionBySlug,
  getRegionStaticPaths,
  generateRegionMetadata,
  generateRegionBreadcrumbs
};