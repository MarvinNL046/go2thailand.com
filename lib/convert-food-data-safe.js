const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// Function to safely merge enhanced data with CSV data
function mergeWithEnhancedData(basicDish, enhancedPath) {
  if (fs.existsSync(enhancedPath)) {
    const enhancedData = JSON.parse(fs.readFileSync(enhancedPath, 'utf8'));
    
    // Preserve all enhanced fields while updating basic fields from CSV
    return {
      ...enhancedData, // Keep all enhanced fields
      ...basicDish, // Update with CSV data
      // But preserve these enhanced fields if they exist
      enhanced_description: enhancedData.enhanced_description || basicDish.enhanced_description,
      detailed_ingredients: enhancedData.detailed_ingredients || basicDish.detailed_ingredients,
      cooking_method: enhancedData.cooking_method || basicDish.cooking_method,
      cultural_significance: enhancedData.cultural_significance || basicDish.cultural_significance,
      variations: enhancedData.variations || basicDish.variations,
      serving_suggestions: enhancedData.serving_suggestions || basicDish.serving_suggestions,
      nutritional_info: enhancedData.nutritional_info || basicDish.nutritional_info,
      where_to_find: enhancedData.where_to_find || basicDish.where_to_find,
      ai_generated: enhancedData.ai_generated !== undefined ? enhancedData.ai_generated : basicDish.ai_generated
    };
  }
  return basicDish;
}

// Function to convert CSV to individual JSON files while preserving enhanced data
function convertFoodDataSafely() {
  const dishes = [];
  
  // Ensure directories exist
  const foodDir = path.join(__dirname, '..', 'data', 'food');
  const enhancedDir = path.join(__dirname, '..', 'data', 'enhanced', 'food');
  
  if (!fs.existsSync(foodDir)) {
    fs.mkdirSync(foodDir, { recursive: true });
  }
  if (!fs.existsSync(enhancedDir)) {
    fs.mkdirSync(enhancedDir, { recursive: true });
  }
  
  console.log('🍜 Converting food data safely (preserving enhanced content)...\n');
  
  fs.createReadStream(path.join(__dirname, '..', 'thailand-csv', 'food.csv'))
    .pipe(csv())
    .on('data', (row) => {
      // Convert ingredients string to array
      const ingredients = row.ingredients ? row.ingredients.split(', ') : [];
      
      // Convert allergens string to array
      const allergens = row.allergens && row.allergens !== 'none' ? row.allergens.split(', ') : [];
      
      // Convert dietary string to array
      const dietary = row.dietary && row.dietary !== 'none' ? row.dietary.split(', ') : [];
      
      // Create basic dish object from CSV
      const basicDish = {
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
      
      dishes.push(basicDish);
    })
    .on('end', () => {
      let preservedCount = 0;
      let newCount = 0;
      
      // Process each dish
      dishes.forEach(basicDish => {
        // Check for enhanced data
        const enhancedPath = path.join(enhancedDir, `${basicDish.slug}.json`);
        const finalDish = mergeWithEnhancedData(basicDish, enhancedPath);
        
        // Track if we preserved enhanced data
        if (fs.existsSync(enhancedPath)) {
          preservedCount++;
          console.log(`✅ Preserved enhanced data for: ${basicDish.slug}`);
        } else {
          newCount++;
          console.log(`📝 Created new entry for: ${basicDish.slug}`);
        }
        
        // Write to both directories
        const basicPath = path.join(foodDir, `${basicDish.slug}.json`);
        const enhancedSavePath = path.join(enhancedDir, `${basicDish.slug}.json`);
        
        // Save basic version (for backwards compatibility)
        fs.writeFileSync(basicPath, JSON.stringify(basicDish, null, 2));
        
        // Save enhanced version
        fs.writeFileSync(enhancedSavePath, JSON.stringify(finalDish, null, 2));
      });
      
      // Create food index file
      const indexPath = path.join(foodDir, 'index.json');
      const enhancedIndexPath = path.join(enhancedDir, 'index.json');
      
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
      fs.writeFileSync(enhancedIndexPath, JSON.stringify(foodIndex, null, 2));
      console.log('\n📋 Created food index files');
      
      // Create category-based index files
      const categories = [...new Set(dishes.map(dish => dish.category))];
      categories.forEach(category => {
        const categoryDishes = dishes.filter(dish => dish.category === category);
        const categoryPath = path.join(foodDir, `${category}.json`);
        const enhancedCategoryPath = path.join(enhancedDir, `${category}.json`);
        
        fs.writeFileSync(categoryPath, JSON.stringify(categoryDishes, null, 2));
        fs.writeFileSync(enhancedCategoryPath, JSON.stringify(categoryDishes, null, 2));
      });
      
      console.log(`\n✨ Conversion complete!`);
      console.log(`📊 Total dishes: ${dishes.length}`);
      console.log(`✅ Enhanced data preserved: ${preservedCount}`);
      console.log(`📝 New dishes added: ${newCount}`);
      console.log(`📁 Categories created: ${categories.join(', ')}`);
    });
}

module.exports = { convertFoodDataSafely };

// Run if called directly
if (require.main === module) {
  convertFoodDataSafely();
}