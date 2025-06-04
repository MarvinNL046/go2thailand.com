const fs = require('fs');
const path = require('path');

// Template for generating enhanced content based on dish characteristics
function generateEnhancedContent(dish) {
  const regionDescriptions = {
    northern: "Northern Thai cuisine is characterized by milder flavors, sticky rice, and herbs",
    southern: "Southern Thai cuisine features intense spices, seafood, and coconut-based curries",
    central: "Central Thai cuisine balances sweet, sour, salty and spicy flavors perfectly",
    northeastern: "Isaan cuisine is known for its bold, spicy flavors and fermented ingredients"
  };

  const categoryIntros = {
    'main-dish': "hearty and satisfying main course",
    'soup': "soul-warming soup",
    'curry': "rich and aromatic curry",
    'salad': "fresh and vibrant salad",
    'dessert': "delightful sweet treat"
  };

  const spiceDescriptions = {
    'none': "gentle on the palate",
    'mild': "with a subtle warmth",
    'medium': "with a pleasant kick of heat",
    'hot': "fiery and bold",
    'very hot': "intensely spicy for true chili lovers"
  };

  // Generate enhanced description
  const enhanced_description = `${dish.name.en} is a beloved ${categoryIntros[dish.category] || 'dish'} from ${dish.region} Thailand that ${spiceDescriptions[dish.spice_level] || 'offers unique flavors'}. ${dish.description.en}. This ${dish.difficulty} recipe takes about ${dish.preparation_time} to prepare and represents the authentic flavors of ${regionDescriptions[dish.region]}. The combination of ${dish.ingredients.slice(0, 3).join(', ')} creates a harmonious blend that has made this dish a favorite among locals and visitors alike. Perfect for those seeking ${dish.price_range === 'budget' ? 'affordable' : dish.price_range === 'mid-range' ? 'reasonably priced' : 'premium'} authentic Thai cuisine.`;

  // Generate detailed ingredients
  const detailed_ingredients = dish.ingredients.slice(0, 4).map(ing => ({
    name: ing.charAt(0).toUpperCase() + ing.slice(1),
    purpose: `Essential for authentic ${dish.name.en} flavor`,
    substitutes: [`Fresh ${ing}`, `Dried ${ing}`, `${ing} paste`]
  }));

  // Generate cooking method
  const cooking_method = {
    technique: dish.category === 'soup' ? 'Simmering and layering flavors' : 
               dish.category === 'curry' ? 'Curry paste frying and coconut milk reduction' :
               dish.category === 'salad' ? 'Fresh preparation and mixing' :
               dish.category === 'main-dish' ? 'Stir-frying or grilling' : 'Traditional preparation',
    steps_overview: `Preparing ${dish.name.en} requires attention to detail and proper timing. The key is to balance all flavors while maintaining the texture of each ingredient. Traditional methods passed down through generations ensure authentic taste.`,
    cooking_tips: [
      `Use fresh ${dish.ingredients[0]} for best results`,
      `Adjust spice level to your preference`,
      `Don't overcook to maintain texture`,
      `Taste and adjust seasoning before serving`
    ]
  };

  // Generate cultural significance
  const cultural_significance = {
    origin_story: `${dish.name.en} has been a staple of ${dish.region} Thai cuisine for generations, reflecting the region's unique culinary traditions and local ingredients.`,
    cultural_importance: `This dish represents the heart of ${dish.region} Thai cooking, showcasing the balance and harmony that Thai cuisine is famous for worldwide.`,
    traditional_occasions: [
      "Family gatherings",
      "Local festivals",
      "Street food markets",
      "Special celebrations"
    ]
  };

  // Generate variations
  const variations = [
    {
      name: `${dish.name.en} Classic`,
      description: "The traditional version as served in local homes"
    },
    {
      name: `${dish.name.en} Modern`,
      description: "Contemporary twist with premium ingredients"
    },
    {
      name: `Vegetarian ${dish.name.en}`,
      description: "Plant-based version using tofu or mushrooms"
    }
  ];

  // Generate serving suggestions
  const serving_suggestions = {
    traditional_accompaniments: [
      "Jasmine rice",
      "Fresh vegetables",
      "Thai herbs"
    ],
    presentation: `Served ${dish.category === 'soup' ? 'in a bowl' : 'on a plate'} in traditional Thai style`,
    eating_etiquette: "Enjoyed with fork and spoon as per Thai custom"
  };

  // Generate nutritional info
  const nutritional_info = {
    calories_per_serving: dish.category === 'dessert' ? "200-300 calories" : "300-500 calories",
    health_benefits: [
      "Rich in Thai herbs and spices",
      "Source of protein and vegetables",
      "Balanced flavors and nutrients"
    ],
    dietary_notes: dish.dietary || []
  };

  // Generate where to find
  const where_to_find = {
    best_restaurants: [
      `Local ${dish.region} Thai restaurants`,
      "Authentic street food stalls",
      "Traditional markets",
      "Family-run eateries"
    ],
    street_food_areas: [
      "Night markets",
      "Morning fresh markets",
      "Local food courts"
    ],
    price_ranges: {
      street_vendor: dish.price_range === 'budget' ? "30-50 THB" : "50-80 THB",
      market_stall: dish.price_range === 'budget' ? "40-60 THB" : "60-100 THB",
      restaurant: dish.price_range === 'budget' ? "60-100 THB" : "100-200 THB"
    }
  };

  return {
    enhanced_description,
    detailed_ingredients,
    cooking_method,
    cultural_significance,
    variations,
    serving_suggestions,
    nutritional_info,
    where_to_find
  };
}

// Main function to enhance dishes
async function enhanceNewDishes() {
  console.log('🚀 Starting manual enhancement of new dishes...\n');
  
  const foodDir = path.join(__dirname, '..', 'data', 'food');
  const enhancedDir = path.join(__dirname, '..', 'data', 'enhanced', 'food');
  
  // Ensure enhanced directory exists
  if (!fs.existsSync(enhancedDir)) {
    fs.mkdirSync(enhancedDir, { recursive: true });
  }

  const files = fs.readdirSync(foodDir).filter(file => file.endsWith('.json') && file !== 'index.json');
  let enhanced = 0;
  let skipped = 0;

  for (const file of files) {
    const dishPath = path.join(foodDir, file);
    const enhancedPath = path.join(enhancedDir, file);
    
    const dish = JSON.parse(fs.readFileSync(dishPath, 'utf8'));
    
    // Skip if dish doesn't have required fields
    if (!dish.name || !dish.name.en) {
      console.log(`⚠️  Skipping ${file} - missing name data`);
      skipped++;
      continue;
    }

    // Check if enhanced version exists and has enhanced content
    if (fs.existsSync(enhancedPath)) {
      const existingEnhanced = JSON.parse(fs.readFileSync(enhancedPath, 'utf8'));
      if (existingEnhanced.enhanced_description) {
        console.log(`✅ Skipping ${dish.name.en} - already has enhanced content`);
        skipped++;
        continue;
      }
    }

    // Generate enhanced content
    console.log(`🍜 Enhancing ${dish.name.en}...`);
    const enhancedContent = generateEnhancedContent(dish);
    
    // Merge with existing data
    const enhancedDish = {
      ...dish,
      ...enhancedContent
    };

    // Save enhanced version
    fs.writeFileSync(enhancedPath, JSON.stringify(enhancedDish, null, 2));
    enhanced++;
    console.log(`✨ Enhanced ${dish.name.en}`);
  }

  console.log(`\n📊 Enhancement complete!`);
  console.log(`   Enhanced: ${enhanced} dishes`);
  console.log(`   Skipped: ${skipped} dishes (already enhanced)`);
  console.log(`   Total: ${files.length} dishes`);
}

// Run the enhancement
if (require.main === module) {
  enhanceNewDishes().catch(console.error);
}

module.exports = { enhanceNewDishes };