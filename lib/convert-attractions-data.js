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

// Convert CSV row to attraction object
function convertToAttraction(row) {
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
        en: `${row.name_en} - Top Attraction in Bangkok | Go2Thailand`,
        nl: `${row.name_nl} - Top Attractie in Bangkok | Go2Thailand`
      },
      metaDescription: {
        en: `Discover ${row.name_en} in Bangkok. ${row.description_en.substring(0, 120)}...`,
        nl: `Ontdek ${row.name_nl} in Bangkok. ${row.description_nl.substring(0, 120)}...`
      }
    },
    tags: [
      row.type,
      'bangkok',
      'thailand',
      'attraction',
      'travel',
      'tourism'
    ]
  };
}

// Main conversion function
async function convertAttractionsData(csvFilePath, outputDir) {
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
          const cityOutputDir = path.join(outputDir, 'bangkok');
          
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
            city_slug: 'bangkok',
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

          console.log(`\n🎉 Successfully converted ${attractions.length} Bangkok attractions!`);
          console.log(`📁 Output directory: ${cityOutputDir}`);
          
          resolve({
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

// CLI execution
if (require.main === module) {
  const csvPath = path.join(__dirname, '../thailand-csv/bangkok-attractions.csv');
  const outputPath = path.join(__dirname, '../data/attractions');
  
  console.log('🔄 Converting Bangkok attractions CSV to JSON...');
  console.log(`📍 CSV: ${csvPath}`);
  console.log(`📁 Output: ${outputPath}`);
  
  convertAttractionsData(csvPath, outputPath)
    .then(result => {
      console.log(`\n✅ Conversion completed!`);
      console.log(`📊 ${result.count} attractions processed`);
    })
    .catch(error => {
      console.error('❌ Conversion failed:', error);
      process.exit(1);
    });
}

module.exports = { convertAttractionsData };
