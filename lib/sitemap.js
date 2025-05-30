const fs = require('fs');
const path = require('path');
const { getAllCities } = require('./cities');
const { getAllDishes } = require('./food');
const { getAllRegions } = require('./regions');

const SITE_URL = 'https://go2-thailand.com';

// Dynamic function to get all Top 10 guides
function getAllTop10Guides() {
  const top10Data = [];
  const cities = getAllCities();
  const categories = ['restaurants', 'hotels', 'attractions'];
  
  cities.forEach(city => {
    categories.forEach(category => {
      try {
        const filePath = path.join(__dirname, '..', 'data', 'top10', `${city.slug}-${category}.json`);
        if (fs.existsSync(filePath)) {
          top10Data.push({
            city: city.slug,
            category: category,
            url: `/city/${city.slug}/top-10-${category}/`
          });
        }
      } catch (error) {
        console.warn(`Warning: Could not check Top 10 ${category} for ${city.slug}`);
      }
    });
  });
  
  return top10Data;
}

// Dynamic function to get all attractions for all cities
function getAllAttractions() {
  const attractionsData = [];
  const cities = getAllCities();
  
  cities.forEach(city => {
    try {
      const cityAttractionsPath = path.join(__dirname, '..', 'data', 'attractions', city.slug);
      if (fs.existsSync(cityAttractionsPath)) {
        const files = fs.readdirSync(cityAttractionsPath);
        
        files.forEach(file => {
          if (file.endsWith('.json') && file !== 'index.json') {
            try {
              const attractionData = require(path.join(cityAttractionsPath, file));
              attractionsData.push({
                city: city.slug,
                slug: attractionData.slug || file.replace('.json', ''),
                name: attractionData.name
              });
            } catch (error) {
              console.warn(`Warning: Could not load attraction ${file} for ${city.slug}`);
            }
          }
        });
      }
    } catch (error) {
      console.warn(`Warning: Could not scan attractions for ${city.slug}`);
    }
  });
  
  return attractionsData;
}


// Dynamic function to scan for static pages
function getStaticPages() {
  const staticPages = [
    '', // Homepage
    '/city/', // Cities index
    '/food/', // Food index
    '/esim/', // eSIM page
    '/social/', // Social media page
    '/region/', // Regions index
  ];
  
  return staticPages;
}

function generateSitemap() {
  console.log('🚀 Generating dynamic sitemap...');
  
  // Get all data
  const cities = getAllCities();
  const dishes = getAllDishes();
  const attractions = getAllAttractions();
  const top10Guides = getAllTop10Guides();
  const regions = getAllRegions();
  
  console.log(`📊 Data loaded: ${cities.length} cities, ${dishes.length} dishes, ${attractions.length} attractions, ${top10Guides.length} top-10 guides, ${regions.length} regions`);
  
  // Static pages
  const staticPages = getStaticPages();
  
  // Top 10 Category Index pages
  const top10CategoryPages = [
    '/top-10/', // Main Top 10 index page
    '/top-10/restaurants/',
    '/top-10/hotels/',
    '/top-10/attractions/'
  ];
  
  // Food pages - Individual dish pages
  const foodPages = [];
  dishes.forEach(dish => {
    foodPages.push(`/food/${dish.slug}/`);
  });
  
  // Region pages - Individual region pages
  const regionPages = [];
  regions.forEach(region => {
    regionPages.push(`/region/${region.slug}/`);
  });
  
  // City pages - Main city pages + subpages
  const cityPages = [];
  cities.forEach(city => {
    cityPages.push(`/city/${city.slug}/`);
    cityPages.push(`/city/${city.slug}/food/`);
    cityPages.push(`/city/${city.slug}/hotels/`);
    cityPages.push(`/city/${city.slug}/attractions/`);
  });
  
  // Top 10 pages - City-specific Top 10 guides
  const top10Pages = [];
  top10Guides.forEach(guide => {
    top10Pages.push(guide.url);
  });
  
  // Individual attraction pages
  const attractionPages = [];
  attractions.forEach(attraction => {
    attractionPages.push(`/city/${attraction.city}/attractions/${attraction.slug}/`);
  });
  
  // Combine all pages
  const allPages = [
    ...staticPages,
    ...top10CategoryPages,
    ...foodPages,
    ...regionPages,
    ...cityPages,
    ...top10Pages,
    ...attractionPages
  ];
  
  console.log(`📄 Total URLs generated: ${allPages.length}`);
  console.log(`   - Static pages: ${staticPages.length}`);
  console.log(`   - Top 10 category pages: ${top10CategoryPages.length}`);
  console.log(`   - Food pages: ${foodPages.length}`);
  console.log(`   - Region pages: ${regionPages.length}`);
  console.log(`   - City pages: ${cityPages.length}`);
  console.log(`   - Top 10 pages: ${top10Pages.length}`);
  console.log(`   - Attraction pages: ${attractionPages.length}`);
  
  // Split into multiple sitemaps if needed (max 50,000 URLs per sitemap)
  const maxUrlsPerSitemap = 50000;
  const sitemapChunks = [];
  
  for (let i = 0; i < allPages.length; i += maxUrlsPerSitemap) {
    sitemapChunks.push(allPages.slice(i, i + maxUrlsPerSitemap));
  }

  const sitemapIndexes = [];

  sitemapChunks.forEach((chunk, index) => {
    const sitemapNumber = index + 1;
    const sitemapFilename = index === 0 ? 'sitemap.xml' : `sitemap-${sitemapNumber}.xml`;
    
    const sitemap = generateSitemapXML(chunk);
    
    // Write sitemap file
    const sitemapPath = path.join(__dirname, '..', 'public', sitemapFilename);
    fs.writeFileSync(sitemapPath, sitemap);
    
    sitemapIndexes.push({
      filename: sitemapFilename,
      lastmod: new Date().toISOString(),
    });
    
    console.log(`✅ Generated ${sitemapFilename} with ${chunk.length} URLs`);
  });

  // Generate sitemap index if multiple sitemaps
  if (sitemapChunks.length > 1) {
    const sitemapIndex = generateSitemapIndexXML(sitemapIndexes);
    const indexPath = path.join(__dirname, '..', 'public', 'sitemap-index.xml');
    fs.writeFileSync(indexPath, sitemapIndex);
    console.log(`✅ Generated sitemap-index.xml with ${sitemapChunks.length} sitemaps`);
  }

  console.log(`🎉 Sitemap generation complete! Total URLs: ${allPages.length}`);
  return allPages.length;
}

function generateSitemapXML(urls) {
  const currentDate = new Date().toISOString();
  
  const urlElements = urls.map(url => {
    // Determine priority and change frequency based on URL
    let priority = '0.8';
    let changefreq = 'weekly';
    
    if (url === '') {
      // Homepage
      priority = '1.0';
      changefreq = 'daily';
    } else if (url === '/city/' || url === '/food/' || url === '/esim/') {
      // Main section pages
      priority = '0.9';
      changefreq = 'daily';
    } else if (url.startsWith('/top-10/')) {
      // Top 10 category index pages
      priority = '0.9';
      changefreq = 'weekly';
    } else if (url.includes('/top-10-')) {
      // City-specific Top 10 pages
      priority = '0.8';
      changefreq = 'weekly';
    } else if (url.startsWith('/region/')) {
      // Region pages
      priority = '0.8';
      changefreq = 'weekly';
    } else if (url.includes('/food/') && url !== '/food/') {
      // Individual food pages
      priority = '0.7';
      changefreq = 'weekly';
    } else if (url.includes('/city/') && !url.includes('/food') && !url.includes('/hotels') && !url.includes('/attractions') && !url.includes('/top-10')) {
      // Main city pages
      priority = '0.8';
      changefreq = 'weekly';
    } else if (url.includes('/attractions/') && url.split('/').length > 4) {
      // Individual attraction pages
      priority = '0.7';
      changefreq = 'monthly';
    } else {
      // Other city subpages (food, hotels, attractions index)
      priority = '0.6';
      changefreq = 'monthly';
    }

    return `  <url>
    <loc>${SITE_URL}${url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
}

function generateSitemapIndexXML(sitemaps) {
  const sitemapElements = sitemaps.map(sitemap => {
    return `  <sitemap>
    <loc>${SITE_URL}/${sitemap.filename}</loc>
    <lastmod>${sitemap.lastmod}</lastmod>
  </sitemap>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapElements}
</sitemapindex>`;
}

// Utility function to get sitemap stats
function getSitemapStats() {
  const cities = getAllCities();
  const dishes = getAllDishes();
  const attractions = getAllAttractions();
  
  return {
    cities: cities.length,
    dishes: dishes.length,
    attractions: attractions.length,
    totalEstimated: 6 + dishes.length + (cities.length * 4) + attractions.length + require('./regions').getAllRegions().length // static + food + city pages + attractions + regions
  };
}

module.exports = { 
  generateSitemap, 
  getAllAttractions,
  getSitemapStats 
};

// Run if called directly
if (require.main === module) {
  // Ensure public directory exists
  const publicDir = path.join(__dirname, '..', 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }
  
  generateSitemap();
}
