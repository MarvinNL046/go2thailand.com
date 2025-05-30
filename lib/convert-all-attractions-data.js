const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// Helper function to create slug from name
function createSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-');
}

// Parse highlights string into array
function parseHighlights(highlightsString) {
  if (!highlightsString) return [];
  return highlightsString.split('|').map(h => h.trim()).filter(h => h.length > 0);
}

// Get city name from slug
function getCityName(citySlug) {
  const cityNames = {
    'bangkok': 'Bangkok',
    'chiang-mai': 'Chiang Mai',
    'phuket': 'Phuket',
    'pattaya': 'Pattaya',
    'ayutthaya': 'Ayutthaya',
    'krabi': 'Krabi',
    'chiang-rai': 'Chiang Rai',
    'hat-yai': 'Hat Yai',
    'sukhothai': 'Sukhothai',
    'surat-thani': 'Surat Thani'
  };
  return cityNames[citySlug] || citySlug;
}

// Convert CSV row to attraction object
function convertToAttraction(row) {
  const cityName = getCityName(row.city_slug);
  
  return {
    id: parseInt(row.id),
    slug: row.slug,
    name: {
      en: row.name_en,
      nl: row.name_nl
    },
    type: row.type,
    city_slug: row.city_slug,
    address: row.address,
    location: {
      lat: parseFloat(row.coordinates_lat),
      lng: parseFloat(row.coordinates_lng)
    },
    opening_hours: row.opening_hours,
    entrance_fee: {
      thb: parseInt(row.entrance_fee_thb) || 0,
      usd: Math.round((parseInt(row.entrance_fee_thb) || 0) / 34) // Rough conversion
    },
    description: {
      en: row.description_en,
      nl: row.description_nl
    },
    highlights: parseHighlights(row.highlights),
    image: row.image_url,
    official_website: row.official_website || null,
    seo: {
      metaTitle: {
        en: `${row.name_en} - Top Attraction in ${cityName} | Go2Thailand`,
        nl: `${row.name_nl} - Top Attractie in ${cityName} | Go2Thailand`
      },
      metaDescription: {
        en: `Discover ${row.name_en} in ${cityName}. ${row.description_en.substring(0, 120)}...`,
        nl: `Ontdek ${row.name_nl} in ${cityName}. ${row.description_nl.substring(0, 120)}...`
      }
    },
    tags: [
      row.type,
      row.city_slug,
      'thailand',
      'attraction',
      'travel',
      'tourism'
    ]
  };
}

// Convert single city attractions
async function convertCityAttractionsData(csvFilePath, outputDir, citySlug) {
  const attractions = [];
  
  return new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (row) => {
        try {
          const attraction = convertToAttraction(row);
          attractions.push(attraction);
        } catch (error) {
          console.error(`Error processing row ${row.id}:`, error);
        }
      })
      .on('end', () => {
        try {
          // Create output directories
          const cityOutputDir = path.join(outputDir, citySlug);
          
          if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
          }
          
          if (!fs.existsSync(cityOutputDir)) {
            fs.mkdirSync(cityOutputDir, { recursive: true });
          }

          // Write individual attraction files
          attractions.forEach(attraction => {
            const filename = `${attraction.slug}.json`;
            const filepath = path.join(cityOutputDir, filename);
            
            fs.writeFileSync(filepath, JSON.stringify(attraction, null, 2));
            console.log(`✅ Created: ${filepath}`);
          });

          // Write index file with all attractions
          const indexData = {
            city_slug: citySlug,
            city_name: getCityName(citySlug),
            total_attractions: attractions.length,
            attractions: attractions.map(attr => ({
              id: attr.id,
              slug: attr.slug,
              name: attr.name,
              type: attr.type,
              image: attr.image,
              description: attr.description,
              entrance_fee: attr.entrance_fee,
              highlights: attr.highlights.slice(0, 3) // First 3 highlights for index
            }))
          };

          const indexPath = path.join(cityOutputDir, 'index.json');
          fs.writeFileSync(indexPath, JSON.stringify(indexData, null, 2));
          console.log(`✅ Created index: ${indexPath}`);

          console.log(`\n🎉 Successfully converted ${attractions.length} ${getCityName(citySlug)} attractions!`);
          
          resolve({
            citySlug,
            count: attractions.length,
            outputDir: cityOutputDir,
            attractions
          });
        } catch (error) {
          reject(error);
        }
      })
      .on('error', reject);
  });
}

// Convert all cities
async function convertAllAttractionsData() {
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

  const csvDir = path.join(__dirname, '../thailand-csv');
  const outputDir = path.join(__dirname, '../data/attractions');
  const results = [];

  console.log('🔄 Converting all attractions CSV files to JSON...');
  console.log(`📁 CSV Directory: ${csvDir}`);
  console.log(`📁 Output Directory: ${outputDir}`);
  console.log('');

  for (const citySlug of cities) {
    const csvPath = path.join(csvDir, `${citySlug}-attractions.csv`);
    
    if (fs.existsSync(csvPath)) {
      console.log(`🏙️  Processing ${getCityName(citySlug)}...`);
      try {
        const result = await convertCityAttractionsData(csvPath, outputDir, citySlug);
        results.push(result);
        console.log(`✅ ${getCityName(citySlug)}: ${result.count} attractions converted\n`);
      } catch (error) {
        console.error(`❌ Error converting ${getCityName(citySlug)}:`, error);
      }
    } else {
      console.log(`⚠️  CSV file not found for ${getCityName(citySlug)}: ${csvPath}`);
    }
  }

  // Create master index file
  const masterIndex = {
    total_cities: results.length,
    total_attractions: results.reduce((sum, city) => sum + city.count, 0),
    cities: results.map(result => ({
      city_slug: result.citySlug,
      city_name: getCityName(result.citySlug),
      attraction_count: result.count,
      output_dir: result.outputDir
    }))
  };

  const masterIndexPath = path.join(outputDir, 'index.json');
  fs.writeFileSync(masterIndexPath, JSON.stringify(masterIndex, null, 2));
  console.log(`✅ Created master index: ${masterIndexPath}`);

  console.log('\n🎉 All attractions conversion completed!');
  console.log(`📊 Total: ${masterIndex.total_attractions} attractions across ${masterIndex.total_cities} cities`);
  
  return results;
}

// CLI execution
if (require.main === module) {
  convertAllAttractionsData()
    .then(results => {
      console.log('\n✅ All conversions completed successfully!');
      results.forEach(result => {
        console.log(`  ${getCityName(result.citySlug)}: ${result.count} attractions`);
      });
    })
    .catch(error => {
      console.error('❌ Conversion failed:', error);
      process.exit(1);
    });
}

module.exports = { convertAllAttractionsData, convertCityAttractionsData };
