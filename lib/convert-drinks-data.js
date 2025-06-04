const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// Ensure directories exist
const dataDir = path.join(__dirname, '..', 'data');
const drinksDir = path.join(dataDir, 'drinks');
const enhancedDrinksDir = path.join(dataDir, 'enhanced', 'drinks');

if (!fs.existsSync(drinksDir)) {
  fs.mkdirSync(drinksDir, { recursive: true });
}

if (!fs.existsSync(enhancedDrinksDir)) {
  fs.mkdirSync(enhancedDrinksDir, { recursive: true });
}

function convertDrinksData() {
  console.log('🍹 Converting drinks data...\n');
  
  const drinks = [];
  const drinksByCategory = {};
  const drinksByType = {};
  
  // Read CSV file
  fs.createReadStream(path.join(__dirname, '..', 'thailand-csv', 'drinks.csv'))
    .pipe(csv())
    .on('data', (row) => {
      // Process each drink
      const drink = {
        id: parseInt(row.id),
        slug: row.slug,
        name: {
          en: row.name_en,
          nl: row.name_nl,
          thai: row.name_thai
        },
        category: row.category,
        type: row.type,
        description: {
          en: row.description_en,
          nl: row.description_nl
        },
        ingredients: row.ingredients.split(', '),
        allergens: row.allergens === 'none' ? [] : row.allergens.split(', '),
        dietary: row.dietary === 'none' ? [] : row.dietary.split(', '),
        image: row.image,
        temperature: row.temperature,
        alcohol_content: row.alcohol_content,
        caffeine: row.caffeine,
        price_range: row.price_range,
        region: row.region,
        occasions: row.occasions.split(', '),
        seo: {
          metaTitle: {
            en: `${row.name_en} Recipe | Authentic Thai ${row.category}`,
            nl: `${row.name_nl} Recept | Authentieke Thaise ${row.category}`
          },
          metaDescription: {
            en: `Learn about ${row.name_en} (${row.name_thai}) - ${row.description_en}`,
            nl: `Leer over ${row.name_nl} (${row.name_thai}) - ${row.description_nl}`
          }
        },
        tags: [
          'thai-drinks',
          'thailand',
          row.category,
          row.type,
          row.temperature,
          ...row.occasions.split(', ').map(o => o.replace(' ', '-'))
        ].filter(Boolean)
      };
      
      drinks.push(drink);
      
      // Group by category
      if (!drinksByCategory[drink.category]) {
        drinksByCategory[drink.category] = [];
      }
      drinksByCategory[drink.category].push(drink);
      
      // Group by type
      if (!drinksByType[drink.type]) {
        drinksByType[drink.type] = [];
      }
      drinksByType[drink.type].push(drink);
    })
    .on('end', () => {
      // Save individual drink files
      drinks.forEach(drink => {
        const drinkPath = path.join(drinksDir, `${drink.slug}.json`);
        fs.writeFileSync(drinkPath, JSON.stringify(drink, null, 2));
        console.log(`✅ Created ${drink.slug}.json`);
        
        // Also create enhanced version (will be enhanced later with AI)
        const enhancedPath = path.join(enhancedDrinksDir, `${drink.slug}.json`);
        if (!fs.existsSync(enhancedPath)) {
          fs.writeFileSync(enhancedPath, JSON.stringify(drink, null, 2));
        }
      });
      
      // Create category index files
      Object.entries(drinksByCategory).forEach(([category, categoryDrinks]) => {
        const categoryPath = path.join(drinksDir, `${category}.json`);
        fs.writeFileSync(categoryPath, JSON.stringify({
          category: category,
          drinks: categoryDrinks.map(d => ({
            id: d.id,
            slug: d.slug,
            name: d.name
          }))
        }, null, 2));
        console.log(`📁 Created ${category}.json`);
      });
      
      // Create main index
      const indexData = {
        total: drinks.length,
        categories: Object.keys(drinksByCategory),
        types: Object.keys(drinksByType),
        drinks: drinks.map(d => ({
          id: d.id,
          slug: d.slug,
          name: d.name,
          category: d.category,
          type: d.type
        }))
      };
      
      fs.writeFileSync(
        path.join(drinksDir, 'index.json'),
        JSON.stringify(indexData, null, 2)
      );
      
      console.log(`\n✨ Conversion complete!`);
      console.log(`📊 Total drinks: ${drinks.length}`);
      console.log(`📁 Categories: ${Object.keys(drinksByCategory).join(', ')}`);
      console.log(`🍹 Types: ${Object.keys(drinksByType).join(', ')}`);
    });
}

// Helper function to get all drinks
function getAllDrinks() {
  const indexPath = path.join(drinksDir, 'index.json');
  if (!fs.existsSync(indexPath)) {
    return [];
  }
  
  const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
  return index.drinks.map(drinkRef => {
    const drinkPath = path.join(drinksDir, `${drinkRef.slug}.json`);
    return JSON.parse(fs.readFileSync(drinkPath, 'utf8'));
  });
}

// Export for use in other scripts
module.exports = {
  convertDrinksData,
  getAllDrinks
};

// Run if called directly
if (require.main === module) {
  convertDrinksData();
}