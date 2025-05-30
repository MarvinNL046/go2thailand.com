const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// Function to convert CSV to individual JSON files
function convertFoodData() {
  const dishes = [];
  
  // Ensure data/food directory exists
  const foodDir = path.join(__dirname, '..', 'data', 'food');
  if (!fs.existsSync(foodDir)) {
    fs.mkdirSync(foodDir, { recursive: true });
  }
  
  fs.createReadStream(path.join(__dirname, '..', 'thailand-csv', 'food.csv'))
    .pipe(csv())
    .on('data', (row) => {
      // Convert ingredients string to array
      const ingredients = row.ingredients ? row.ingredients.split(', ') : [];
      
      // Convert allergens string to array
      const allergens = row.allergens && row.allergens !== 'none' ? row.allergens.split(', ') : [];
      
      // Convert dietary string to array
      const dietary = row.dietary && row.dietary !== 'none' ? row.dietary.split(', ') : [];
      
      // Create dish object with additional SEO data
      const dish = {
        id: parseInt(row.id),
        slug: row.slug,
        name: {
          en: row.name_en,
          nl: row.name_nl,
          thai: row.name_thai
        },
        category: row.category,
        region: row.region,
        spice_level: row.spice_level,
        description: {
          en: row.description_en,
          nl: row.description_nl
        },
        ingredients: ingredients,
        allergens: allergens,
        dietary: dietary,
        image: row.image,
        preparation_time: row.preparation_time,
        difficulty: row.difficulty,
        price_range: row.price_range,
        // Additional SEO data
        seo: {
          metaTitle: {
            en: `${row.name_en} Recipe | Authentic Thai ${row.category.replace('-', ' ')}`,
            nl: `${row.name_nl} Recept | Authentieke Thaise ${row.category.replace('-', ' ')}`
          },
          metaDescription: {
            en: `Learn about ${row.name_en} (${row.name_thai}) - ${row.description_en.substring(0, 120)}...`,
            nl: `Leer over ${row.name_nl} (${row.name_thai}) - ${row.description_nl.substring(0, 120)}...`
          }
        },
        // Tags for programmatic SEO
        tags: [
          'thai-food',
          'thailand',
          row.category,
          row.region,
          row.spice_level,
          row.difficulty,
          row.price_range,
          ...ingredients.slice(0, 3).map(ing => ing.toLowerCase().replace(' ', '-'))
        ].filter(tag => tag && tag !== 'none'),
        // Cooking information
        cooking: {
          preparation_time: row.preparation_time,
          difficulty: row.difficulty,
          spice_level: row.spice_level,
          serves: "2-4 people" // Default serving size
        },
        // Nutritional and dietary info
        nutrition: {
          allergens: allergens,
          dietary: dietary,
          price_range: row.price_range
        }
      };
      
      dishes.push(dish);
    })
    .on('end', () => {
      // Create individual JSON files for each dish
      dishes.forEach(dish => {
        const filePath = path.join(__dirname, '..', 'data', 'food', `${dish.slug}.json`);
        fs.writeFileSync(filePath, JSON.stringify(dish, null, 2));
        console.log(`Created ${dish.slug}.json`);
      });
      
      // Create food index file
      const indexPath = path.join(__dirname, '..', 'data', 'food', 'index.json');
      const foodIndex = dishes.map(dish => ({
        id: dish.id,
        slug: dish.slug,
        name: dish.name,
        category: dish.category,
        region: dish.region,
        spice_level: dish.spice_level,
        image: dish.image,
        difficulty: dish.difficulty,
        preparation_time: dish.preparation_time,
        price_range: dish.price_range,
        ingredients: dish.ingredients.slice(0, 3) // First 3 ingredients for preview
      }));
      
      fs.writeFileSync(indexPath, JSON.stringify(foodIndex, null, 2));
      console.log('Created food index.json');
      
      // Create category-based index files
      const categories = [...new Set(dishes.map(dish => dish.category))];
      categories.forEach(category => {
        const categoryDishes = dishes.filter(dish => dish.category === category);
        const categoryPath = path.join(__dirname, '..', 'data', 'food', `${category}.json`);
        fs.writeFileSync(categoryPath, JSON.stringify(categoryDishes, null, 2));
        console.log(`Created ${category}.json`);
      });
      
      console.log(`Converted ${dishes.length} dishes successfully!`);
      console.log(`Created ${categories.length} category files: ${categories.join(', ')}`);
    });
}

module.exports = { convertFoodData };

// Run if called directly
if (require.main === module) {
  convertFoodData();
}
