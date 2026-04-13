const SITE_URL = 'https://go2-thailand.com';
const DEFAULT_CITY_IMAGE = '/og-default.webp';
const GENERATED_CITY_IMAGE_SLUGS = new Set([
  'bueng-kan',
  'chanthaburi',
  'chiang-khan',
  'chumphon',
  'hua-hin',
  'kanchanaburi',
  'khon-kaen',
  'koh-samui',
  'lampang',
  'lopburi',
  'mae-hong-son',
  'mukdahan',
  'nong-khai',
  'nakhon-phanom',
  'nakhon-ratchasima',
  'nakhon-si-thammarat',
  'pai',
  'phitsanulok',
  'rayong',
  'sukhothai',
  'surat-thani',
  'trang',
  'trat',
  'ubon-ratchathani',
  'udon-thani'
]);

function resolveCityImage(city) {
  if (!city) return DEFAULT_CITY_IMAGE;

  if (GENERATED_CITY_IMAGE_SLUGS.has(city.slug)) {
    return `/images/cities/generated/${city.slug}.webp`;
  }

  if (typeof city.image === 'string' && city.image.trim()) {
    return city.image.startsWith('/') || city.image.startsWith('http')
      ? city.image
      : `/${city.image}`;
  }

  return DEFAULT_CITY_IMAGE;
}

function withResolvedCityImage(city) {
  if (!city) return city;
  return {
    ...city,
    image: resolveCityImage(city)
  };
}

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
    return citiesIndex.map(withResolvedCityImage);
  } catch (error) {
    console.error('Error loading cities index:', error);
    return [];
  }
}

// Get city data by slug (with enhanced content if available).
// When locale !== 'en', tries data/enhanced/<locale>/<slug>.json first so
// reader stays in translated content. Falls back to default EN enhanced,
// then to base cities/ data.
function getCityBySlug(slug, locale = 'en') {
  try {
    if (locale && locale !== 'en') {
      try {
        const localeData = require(`../data/enhanced/${locale}/${slug}.json`);
        return withResolvedCityImage(localeData);
      } catch (_) { /* fallthrough */ }
    }
    try {
      const enhancedData = require(`../data/enhanced/${slug}.json`);
      return withResolvedCityImage(enhancedData);
    } catch (enhancedError) {
      const cityData = require(`../data/cities/${slug}.json`);
      return withResolvedCityImage(cityData);
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
    return withResolvedCityImage(cityData);
  } catch (error) {
    console.error(`Error loading original city data for ${slug}:`, error);
    return null;
  }
}

// Get enhanced city data specifically
function getEnhancedCityBySlug(slug) {
  try {
    const enhancedData = require(`../data/enhanced/${slug}.json`);
    return withResolvedCityImage(enhancedData);
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
  const rawCityDesc = city.overview || city.enhanced_description || city.seo?.metaDescription?.en || city.description?.en || '';
  const description = rawCityDesc.length > 155 ? rawCityDesc.substring(0, 155) + '...' : rawCityDesc;

  const baseTitle = city.seo?.metaTitle?.en || `${city.name.en} Travel Guide: Things to Do, Where to Stay & Food`;
  const title = category ?
    `${city.categories?.[category]?.en || baseTitle}` :
    baseTitle;

  const optimizedDescription = city.seo?.metaDescription?.en ||
    `Plan a smarter ${city.name.en} trip with curated attractions, neighborhood advice, food picks, hotel recommendations, and practical local tips.`;

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

function getAttractionIndexEntry(citySlug, attractionSlug) {
  const attractions = getAttractionsByCity(citySlug);
  return attractions.find((attraction) => attraction.slug === attractionSlug) || null;
}

// Get single attraction by slug (with enhanced content if available).
// Tries locale-specific enhanced data first (data/enhanced/attractions/<locale>/<city>/<slug>.json).
function getAttractionBySlug(citySlug, attractionSlug, locale = 'en') {
  try {
    if (locale && locale !== 'en') {
      try {
        return require(`../data/enhanced/attractions/${locale}/${citySlug}/${attractionSlug}.json`);
      } catch (_) { /* fallthrough */ }
    }
    try {
      const enhancedData = require(`../data/enhanced/attractions/${citySlug}/${attractionSlug}.json`);
      return enhancedData;
    } catch (enhancedError) {
      try {
        // Fallback to original attraction data if enhanced doesn't exist
        const attractionData = require(`../data/attractions/${citySlug}/${attractionSlug}.json`);
        return attractionData;
      } catch (attractionError) {
        // Final fallback: use the summary object from the city index so index-only attractions still render.
        const attractionIndexEntry = getAttractionIndexEntry(citySlug, attractionSlug);
        if (attractionIndexEntry) {
          return attractionIndexEntry;
        }
        throw attractionError;
      }
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

  // Dynamically get all cities from index
  const allCities = getAllCities();

  allCities.forEach(city => {
    const attractions = getAttractionsByCity(city.slug);
    attractions.forEach(attraction => {
      paths.push({
        params: {
          slug: city.slug,
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

  const rawDesc = attraction.enhanced_description || attraction.description?.en || '';
  const description = rawDesc.length > 155 ? rawDesc.substring(0, 155) + '...' : rawDesc;

  const cityName = city?.name?.en || 'Bangkok';
  let title = attraction.seo?.metaTitle?.en ||
    `${attraction.name.en}, ${cityName} | Go2Thailand`;
  // Ensure title stays under 60 chars for SERP display
  if (title.length > 60) {
    title = `${attraction.name.en} | Go2Thailand`;
  }

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
