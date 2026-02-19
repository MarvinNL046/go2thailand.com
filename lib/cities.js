const SITE_URL = 'https://go2-thailand.com';

// Ensure image path is an absolute URL
function toAbsoluteImageUrl(path) {
  if (!path) return `${SITE_URL}/og-default.webp`;
  if (path.startsWith('http')) return path;
  return `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}

// Get all cities for static generation
function getAllCities() {
  try {
    const citiesIndex = require('../data/cities/index.json');
    return citiesIndex;
  } catch (error) {
    console.error('Error loading cities index:', error);
    return [];
  }
}

// Get city data by slug (with enhanced content if available)
function getCityBySlug(slug) {
  try {
    // First try to get enhanced city data
    try {
      const enhancedData = require(`../data/enhanced/${slug}.json`);
      return enhancedData;
    } catch (enhancedError) {
      // Fallback to original city data if enhanced doesn't exist
      const cityData = require(`../data/cities/${slug}.json`);
      return cityData;
    }
  } catch (error) {
    console.error(`Error loading city data for ${slug}:`, error);
    return null;
  }
}

// Get original city data (without enhancements)
function getOriginalCityBySlug(slug) {
  try {
    const cityData = require(`../data/cities/${slug}.json`);
    return cityData;
  } catch (error) {
    console.error(`Error loading original city data for ${slug}:`, error);
    return null;
  }
}

// Get enhanced city data specifically
function getEnhancedCityBySlug(slug) {
  try {
    const enhancedData = require(`../data/enhanced/${slug}.json`);
    return enhancedData;
  } catch (error) {
    console.error(`Error loading enhanced city data for ${slug}:`, error);
    return null;
  }
}

// Get static paths for Next.js
function getCityStaticPaths() {
  const cities = getAllCities();
  return cities.map(city => ({
    params: { slug: city.slug }
  }));
}

// Get image for specific section (manual control)
function getCityImageForSection(city, section = 'hero') {
  if (!city) return city?.image || '';
  
  // Check if city has images object with section-specific images
  if (city.images && city.images[section]) {
    return city.images[section];
  }
  
  // Fallback to main image
  return city.image || '';
}

// Generate SEO metadata with enhanced support
function generateCityMetadata(city, category = '') {
  if (!city) return {};

  // Use enhanced description if available
  const description = city.enhanced_description 
    ? city.enhanced_description.substring(0, 160) + '...'
    : city.seo?.metaDescription?.en || city.description?.en;

  const baseTitle = `${city.name.en} 2026: Top Things to Do, Hotels & Tips`;
  const title = category ?
    `${city.categories?.[category]?.en || baseTitle}` :
    baseTitle;

  const optimizedDescription = `✈️ Complete ${city.name.en} travel guide 2026. Best attractions, hotels from $10/night, food spots & insider tips. Plan your trip now!`;

  return {
    title,
    description: optimizedDescription,
    keywords: [...(city.tags || []), city.name.en, city.region, city.province].join(', '),
    openGraph: {
      title,
      description,
      images: [
        {
          url: toAbsoluteImageUrl(getCityImageForSection(city, 'hero')),
          width: 1200,
          height: 630,
          alt: `${city.name.en}, Thailand`
        }
      ],
      type: 'website'
    }
  };
}

// Generate breadcrumbs
function generateBreadcrumbs(city, category = '') {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Cities', href: '/city/' }
  ];

  if (city) {
    breadcrumbs.push({
      name: city.name.en,
      href: `/city/${city.slug}/`
    });

    if (category) {
      breadcrumbs.push({
        name: category.charAt(0).toUpperCase() + category.slice(1),
        href: `/city/${city.slug}/${category}/`
      });
    }
  }

  return breadcrumbs;
}

// Get cities by region
function getCitiesByRegion(region) {
  const cities = getAllCities();
  return cities.filter(city => 
    city.region.toLowerCase() === region.toLowerCase()
  );
}

// Get related cities (same region)
function getRelatedCities(currentCity, limit = 3) {
  const cities = getAllCities();
  return cities
    .filter(city => 
      city.region === currentCity.region && 
      city.slug !== currentCity.slug
    )
    .slice(0, limit);
}

// Check if city has enhanced content (simple check without fs)
function hasEnhancedContent(slug) {
  try {
    require(`../data/enhanced/${slug}.json`);
    return true;
  } catch (error) {
    return false;
  }
}

// === ATTRACTIONS FUNCTIONS ===

// Get all attractions for a city
function getAttractionsByCity(citySlug) {
  try {
    const attractionsIndex = require(`../data/attractions/${citySlug}/index.json`);
    return attractionsIndex.attractions || [];
  } catch (error) {
    console.error(`Error loading attractions for ${citySlug}:`, error);
    return [];
  }
}

// Get enhanced attractions for a city
function getEnhancedAttractionsByCity(citySlug) {
  try {
    const enhancedIndex = require(`../data/enhanced/attractions/${citySlug}/index.json`);
    return enhancedIndex.attractions || [];
  } catch (error) {
    console.error(`Error loading enhanced attractions for ${citySlug}:`, error);
    // Fallback to regular attractions
    return getAttractionsByCity(citySlug);
  }
}

// Get single attraction by slug (with enhanced content if available)
function getAttractionBySlug(citySlug, attractionSlug) {
  try {
    // First try to get enhanced attraction data
    try {
      const enhancedData = require(`../data/enhanced/attractions/${citySlug}/${attractionSlug}.json`);
      return enhancedData;
    } catch (enhancedError) {
      // Fallback to original attraction data if enhanced doesn't exist
      const attractionData = require(`../data/attractions/${citySlug}/${attractionSlug}.json`);
      return attractionData;
    }
  } catch (error) {
    console.error(`Error loading attraction data for ${citySlug}/${attractionSlug}:`, error);
    return null;
  }
}

// Get static paths for attractions
function getAttractionStaticPaths(citySlug = 'bangkok') {
  const attractions = getAttractionsByCity(citySlug);
  return attractions.map(attraction => ({
    params: { 
      slug: citySlug,
      attraction: attraction.slug 
    }
  }));
}

// Get all attraction static paths (all cities)
function getAllAttractionStaticPaths() {
  const paths = [];
  
  // All cities that have attractions data
  const cities = [
    'bangkok',
    'chiang-mai',
    'phuket',
    'pattaya',
    'ayutthaya',
    'krabi',
    'chiang-rai',
    'hat-yai',
    'sukhothai',
    'surat-thani'
  ];
  
  cities.forEach(citySlug => {
    const attractions = getAttractionsByCity(citySlug);
    attractions.forEach(attraction => {
      paths.push({
        params: {
          slug: citySlug,
          attraction: attraction.slug
        }
      });
    });
  });
  
  return paths;
}

// Generate attraction metadata
function generateAttractionMetadata(attraction, city) {
  if (!attraction) return {};

  const description = attraction.enhanced_description 
    ? attraction.enhanced_description.substring(0, 160) + '...'
    : attraction.description?.en;

  const title = attraction.seo?.metaTitle?.en || 
    `${attraction.name.en} - ${city?.name?.en || 'Bangkok'} Attraction | Go2Thailand`;

  return {
    title,
    description,
    keywords: [...(attraction.tags || []), attraction.name.en, attraction.type, city?.name?.en || 'Bangkok'].join(', '),
    openGraph: {
      title,
      description,
      images: [
        {
          url: toAbsoluteImageUrl(attraction.image),
          width: 1200,
          height: 630,
          alt: attraction.name.en
        }
      ],
      type: 'website'
    }
  };
}

// Generate breadcrumbs for attractions
function generateAttractionBreadcrumbs(city, attraction) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Cities', href: '/city/' }
  ];

  if (city) {
    breadcrumbs.push({
      name: city.name.en,
      href: `/city/${city.slug}/`
    });

    breadcrumbs.push({
      name: 'Attractions',
      href: `/city/${city.slug}/attractions/`
    });

    if (attraction) {
      breadcrumbs.push({
        name: attraction.name.en,
        href: `/city/${city.slug}/attractions/${attraction.slug}/`
      });
    }
  }

  return breadcrumbs;
}

// CommonJS exports (works with both Next.js and Node.js)
module.exports = {
  getAllCities,
  getCityBySlug,
  getOriginalCityBySlug,
  getEnhancedCityBySlug,
  getCityStaticPaths,
  getCityImageForSection,
  generateCityMetadata,
  generateBreadcrumbs,
  getCitiesByRegion,
  getRelatedCities,
  hasEnhancedContent,
  toAbsoluteImageUrl,
  // Attractions functions
  getAttractionsByCity,
  getEnhancedAttractionsByCity,
  getAttractionBySlug,
  getAttractionStaticPaths,
  getAllAttractionStaticPaths,
  generateAttractionMetadata,
  generateAttractionBreadcrumbs
};

// Individual exports for ES6 import syntax
module.exports.getAllCities = getAllCities;
module.exports.getCityBySlug = getCityBySlug;
module.exports.getOriginalCityBySlug = getOriginalCityBySlug;
module.exports.getEnhancedCityBySlug = getEnhancedCityBySlug;
module.exports.getCityStaticPaths = getCityStaticPaths;
module.exports.getCityImageForSection = getCityImageForSection;
module.exports.generateCityMetadata = generateCityMetadata;
module.exports.generateBreadcrumbs = generateBreadcrumbs;
module.exports.getCitiesByRegion = getCitiesByRegion;
module.exports.getRelatedCities = getRelatedCities;
module.exports.hasEnhancedContent = hasEnhancedContent;
module.exports.getAttractionsByCity = getAttractionsByCity;
module.exports.getEnhancedAttractionsByCity = getEnhancedAttractionsByCity;
module.exports.getAttractionBySlug = getAttractionBySlug;
module.exports.getAttractionStaticPaths = getAttractionStaticPaths;
module.exports.getAllAttractionStaticPaths = getAllAttractionStaticPaths;
module.exports.generateAttractionMetadata = generateAttractionMetadata;
module.exports.generateAttractionBreadcrumbs = generateAttractionBreadcrumbs;
module.exports.toAbsoluteImageUrl = toAbsoluteImageUrl;
