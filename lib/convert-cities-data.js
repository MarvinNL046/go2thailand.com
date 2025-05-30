const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// Function to convert CSV to individual JSON files
function convertCitiesData() {
  const cities = [];
  
  fs.createReadStream(path.join(__dirname, '..', 'thailand-csv', 'cities.csv'))
    .pipe(csv())
    .on('data', (row) => {
      // Convert highlights string to array
      const highlights = row.highlights ? row.highlights.split('|') : [];
      
      // Create city object with additional SEO data
      const city = {
        id: parseInt(row.id),
        slug: row.slug,
        name: {
          en: row.name_en,
          nl: row.name_nl
        },
        region: row.region,
        province: row.province,
        description: {
          en: row.description_en,
          nl: row.description_nl
        },
        population: parseInt(row.population),
        highlights: highlights,
        location: {
          lat: parseFloat(row.lat),
          lng: parseFloat(row.lng)
        },
        image: row.image,
        // Additional SEO data
        seo: {
          metaTitle: {
            en: `Discover ${row.name_en} | What to do in ${row.name_en}?`,
            nl: `Ontdek ${row.name_nl} | Wat te doen in ${row.name_nl}?`
          },
          metaDescription: {
            en: `Your guide to ${row.name_en}, Thailand – tips, highlights, food, hotels.`,
            nl: `Jouw gids voor ${row.name_nl}, Thailand – tips, highlights, eten, hotels.`
          }
        },
        // Categories for future expansion
        categories: {
          food: {
            en: `Best restaurants and street food in ${row.name_en}`,
            nl: `Beste restaurants en streetfood in ${row.name_nl}`
          },
          hotels: {
            en: `Top hotels in ${row.name_en} | Tips & deals`,
            nl: `Beste hotels in ${row.name_nl} | Tips & aanbiedingen`
          },
          attractions: {
            en: `Top attractions in ${row.name_en}`,
            nl: `Top bezienswaardigheden in ${row.name_nl}`
          }
        },
        // Tags for programmatic SEO
        tags: [
          row.region.toLowerCase(),
          row.province.toLowerCase(),
          'thailand',
          'travel',
          'tourism',
          'guide'
        ]
      };
      
      cities.push(city);
    })
    .on('end', () => {
      // Create individual JSON files for each city
      cities.forEach(city => {
        const filePath = path.join(__dirname, '..', 'data', 'cities', `${city.slug}.json`);
        fs.writeFileSync(filePath, JSON.stringify(city, null, 2));
        console.log(`Created ${city.slug}.json`);
      });
      
      // Create cities index file
      const indexPath = path.join(__dirname, '..', 'data', 'cities', 'index.json');
      const citiesIndex = cities.map(city => ({
        id: city.id,
        slug: city.slug,
        name: city.name,
        region: city.region,
        province: city.province,
        image: city.image,
        highlights: city.highlights.slice(0, 2) // First 2 highlights for preview
      }));
      
      fs.writeFileSync(indexPath, JSON.stringify(citiesIndex, null, 2));
      console.log('Created cities index.json');
      console.log(`Converted ${cities.length} cities successfully!`);
    });
}

module.exports = { convertCitiesData };

// Run if called directly
if (require.main === module) {
  convertCitiesData();
}
