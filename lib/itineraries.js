const SITE_URL = 'https://go2-thailand.com';

// Ensure image path is an absolute URL
function toAbsoluteImageUrl(imgPath) {
  if (!imgPath) return `${SITE_URL}/og-default.webp`;
  if (imgPath.startsWith('http')) return imgPath;
  return `${SITE_URL}${imgPath.startsWith('/') ? '' : '/'}${imgPath}`;
}

// Get all itineraries from the index file
function getAllItineraries() {
  try {
    const data = require('../data/itineraries/index.json');
    return data;
  } catch (error) {
    console.error('Error loading itineraries index:', error);
    return [];
  }
}

// Get a specific itinerary by slug
function getItineraryBySlug(slug) {
  try {
    const data = require(`../data/itineraries/${slug}.json`);
    return data;
  } catch (error) {
    console.error(`Error loading itinerary ${slug}:`, error);
    return null;
  }
}

// Get static paths for Next.js
function getItineraryStaticPaths() {
  const itineraries = getAllItineraries();
  return itineraries.map(itinerary => ({
    params: { slug: itinerary.slug }
  }));
}

// Filter itineraries by duration (in days)
function getItinerariesByDuration(days) {
  const itineraries = getAllItineraries();
  return itineraries.filter(itinerary => itinerary.duration === days);
}

// Filter itineraries by region
function getItinerariesByRegion(region) {
  const itineraries = getAllItineraries();
  return itineraries.filter(itinerary =>
    itinerary.region.toLowerCase() === region.toLowerCase()
  );
}

// Get related itineraries (different from current, optionally same region or different duration)
function getRelatedItineraries(currentSlug, limit = 3) {
  const itineraries = getAllItineraries();
  const current = itineraries.find(i => i.slug === currentSlug);
  if (!current) return itineraries.filter(i => i.slug !== currentSlug).slice(0, limit);

  // Prioritize same region, then different durations
  const sameRegion = itineraries.filter(i =>
    i.slug !== currentSlug && i.region === current.region
  );
  const differentRegion = itineraries.filter(i =>
    i.slug !== currentSlug && i.region !== current.region
  );

  return [...sameRegion, ...differentRegion].slice(0, limit);
}

// Generate SEO metadata for an itinerary
function generateItineraryMetadata(itinerary) {
  if (!itinerary) return {};

  const title = itinerary.seo?.metaTitle ||
    `${itinerary.title} | Go2Thailand`;
  const description = itinerary.seo?.metaDescription ||
    itinerary.description || '';

  return {
    title,
    description: description.length > 155 ? description.substring(0, 155) + '...' : description,
    keywords: [
      'Thailand itinerary',
      `${itinerary.duration} days Thailand`,
      itinerary.region,
      ...(itinerary.highlights || []),
      ...(itinerary.tags || [])
    ].join(', '),
    openGraph: {
      title,
      description,
      images: [
        {
          url: toAbsoluteImageUrl(itinerary.image),
          width: 1200,
          height: 630,
          alt: itinerary.title
        }
      ],
      type: 'website'
    }
  };
}

// Generate breadcrumbs for an itinerary
function generateItineraryBreadcrumbs(itinerary) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Itineraries', href: '/itineraries/' }
  ];

  if (itinerary) {
    breadcrumbs.push({
      name: itinerary.title,
      href: `/itineraries/${itinerary.slug}/`
    });
  }

  return breadcrumbs;
}

module.exports = {
  getAllItineraries,
  getItineraryBySlug,
  getItineraryStaticPaths,
  getItinerariesByDuration,
  getItinerariesByRegion,
  getRelatedItineraries,
  generateItineraryMetadata,
  generateItineraryBreadcrumbs,
  toAbsoluteImageUrl
};

// Individual exports for ES6 import syntax
module.exports.getAllItineraries = getAllItineraries;
module.exports.getItineraryBySlug = getItineraryBySlug;
module.exports.getItineraryStaticPaths = getItineraryStaticPaths;
module.exports.getItinerariesByDuration = getItinerariesByDuration;
module.exports.getItinerariesByRegion = getItinerariesByRegion;
module.exports.getRelatedItineraries = getRelatedItineraries;
module.exports.generateItineraryMetadata = generateItineraryMetadata;
module.exports.generateItineraryBreadcrumbs = generateItineraryBreadcrumbs;
module.exports.toAbsoluteImageUrl = toAbsoluteImageUrl;
