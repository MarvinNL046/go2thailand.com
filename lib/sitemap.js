const fs = require('fs');
const path = require('path');
const { getAllCities } = require('./cities');
const { getAllDishes } = require('./food');

const SITE_URL = 'https://go2-thailand.com';

function generateSitemap() {
  const cities = getAllCities();
  const dishes = getAllDishes();
  
  // Static pages
  const staticPages = [
    '',
    '/city/',
    '/food/',
  ];

  // Food pages
  const foodPages = [];
  dishes.forEach(dish => {
    foodPages.push(`/food/${dish.slug}/`);
  });

  // Dynamic city pages
  const cityPages = [];
  cities.forEach(city => {
    cityPages.push(`/city/${city.slug}/`);
    cityPages.push(`/city/${city.slug}/food/`);
    cityPages.push(`/city/${city.slug}/hotels/`);
    cityPages.push(`/city/${city.slug}/attractions/`);
  });

  const allPages = [...staticPages, ...foodPages, ...cityPages];
  
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
    
    console.log(`Generated ${sitemapFilename} with ${chunk.length} URLs`);
  });

  // Generate sitemap index if multiple sitemaps
  if (sitemapChunks.length > 1) {
    const sitemapIndex = generateSitemapIndexXML(sitemapIndexes);
    const indexPath = path.join(__dirname, '..', 'public', 'sitemap-index.xml');
    fs.writeFileSync(indexPath, sitemapIndex);
    console.log(`Generated sitemap-index.xml with ${sitemapChunks.length} sitemaps`);
  }

  console.log(`Total URLs generated: ${allPages.length}`);
}

function generateSitemapXML(urls) {
  const currentDate = new Date().toISOString();
  
  const urlElements = urls.map(url => {
    // Determine priority and change frequency based on URL
    let priority = '0.8';
    let changefreq = 'weekly';
    
    if (url === '') {
      priority = '1.0';
      changefreq = 'daily';
    } else if (url === '/city/' || url === '/food/') {
      priority = '0.9';
      changefreq = 'daily';
    } else if (url.includes('/food/') && url !== '/food/') {
      priority = '0.7';
      changefreq = 'weekly';
    } else if (url.includes('/city/') && !url.includes('/food') && !url.includes('/hotels') && !url.includes('/attractions')) {
      priority = '0.8';
      changefreq = 'weekly';
    } else {
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

module.exports = { generateSitemap };

// Run if called directly
if (require.main === module) {
  // Ensure public directory exists
  const publicDir = path.join(__dirname, '..', 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }
  
  generateSitemap();
}
