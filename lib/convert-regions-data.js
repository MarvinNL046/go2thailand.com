const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// Function to convert CSV to individual JSON files
function convertRegionsData() {
  const regions = [];
  
  fs.createReadStream(path.join(__dirname, '..', 'thailand-csv', 'regions.csv'))
    .pipe(csv())
    .on('data', (row) => {
      // Convert highlights and cities strings to arrays
      const highlights = row.highlights ? row.highlights.split('|') : [];
      const cities = row.cities ? row.cities.split('|') : [];
      
      // Convert additional arrays
      const topActivities = row.top_activities ? row.top_activities.split('|') : [];
      const hiddenGems = row.hidden_gems ? row.hidden_gems.split('|') : [];
      const localFestivals = row.local_festivals ? row.local_festivals.split('|') : [];
      const travelTips = row.travel_tips ? row.travel_tips.split('|') : [];
      const whatToPack = row.what_to_pack ? row.what_to_pack.split('|') : [];

      // Create region object with comprehensive data
      const region = {
        id: parseInt(row.id),
        slug: row.slug,
        name: {
          en: row.name_en,
          nl: row.name_nl
        },
        description: {
          en: row.description_en,
          nl: row.description_nl
        },
        highlights: highlights,
        cities: cities,
        climate: row.climate,
        bestTimeToVisit: row.best_time_to_visit,
        image: row.image,
        
        // Enhanced content sections
        geography: row.geography,
        culture: row.culture,
        cuisine: row.cuisine,
        transportation: row.transportation,
        budgetInfo: row.budget_info,
        topActivities: topActivities,
        hiddenGems: hiddenGems,
        localFestivals: localFestivals,
        travelTips: travelTips,
        whatToPack: whatToPack,
        
        // Additional SEO data
        seo: {
          metaTitle: {
            en: `Discover ${row.name_en} | Complete Travel Guide`,
            nl: `Ontdek ${row.name_nl} | Complete Reisgids`
          },
          metaDescription: {
            en: `Complete guide to ${row.name_en} - best cities, attractions, climate, and travel tips.`,
            nl: `Complete gids voor ${row.name_nl} - beste steden, attracties, klimaat en reistips.`
          }
        },
        // Categories for future expansion
        categories: {
          attractions: {
            en: `Top attractions in ${row.name_en}`,
            nl: `Top bezienswaardigheden in ${row.name_nl}`
          },
          cities: {
            en: `Best cities to visit in ${row.name_en}`,
            nl: `Beste steden om te bezoeken in ${row.name_nl}`
          },
          climate: {
            en: `Climate and weather in ${row.name_en}`,
            nl: `Klimaat en weer in ${row.name_nl}`
          }
        },
        // Tags for programmatic SEO
        tags: [
          'thailand',
          'region',
          'travel',
          'tourism',
          'guide',
          row.slug.toLowerCase()
        ]
      };
      
      regions.push(region);
    })
    .on('end', () => {
      // Create data/regions directory if it doesn't exist
      const regionsDir = path.join(__dirname, '..', 'data', 'regions');
      if (!fs.existsSync(regionsDir)) {
        fs.mkdirSync(regionsDir, { recursive: true });
      }
      
      // Create individual JSON files for each region
      regions.forEach(region => {
        const filePath = path.join(regionsDir, `${region.slug}.json`);
        fs.writeFileSync(filePath, JSON.stringify(region, null, 2));
        console.log(`Created ${region.slug}.json`);
      });
      
      // Create regions index file
      const indexPath = path.join(regionsDir, 'index.json');
      const regionsIndex = regions.map(region => ({
        id: region.id,
        slug: region.slug,
        name: region.name,
        description: region.description,
        image: region.image,
        cities: region.cities,
        highlights: region.highlights.slice(0, 3) // First 3 highlights for preview
      }));
      
      fs.writeFileSync(indexPath, JSON.stringify(regionsIndex, null, 2));
      console.log('Created regions index.json');
      console.log(`Converted ${regions.length} regions successfully!`);
    });
}

module.exports = { convertRegionsData };

// Run if called directly
if (require.main === module) {
  convertRegionsData();
}