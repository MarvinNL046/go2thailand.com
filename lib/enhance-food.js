require('dotenv').config({ path: '.env.local' });
const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');

class FoodEnhancer {
  constructor() {
    this.hasApiKey = !!process.env.OPENAI_API_KEY;
    if (this.hasApiKey) {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
    }
    this.dataDir = path.join(__dirname, '..', 'data', 'food');
    this.enhancedDir = path.join(__dirname, '..', 'data', 'enhanced', 'food');
    this.ensureDirectories();
  }

  ensureDirectories() {
    if (!fs.existsSync(this.enhancedDir)) {
      fs.mkdirSync(this.enhancedDir, { recursive: true });
    }
  }

  // Get all food dishes
  getAllDishes() {
    const indexPath = path.join(this.dataDir, 'index.json');
    if (!fs.existsSync(indexPath)) {
      throw new Error('Food index.json not found. Run convert-food-data.js first.');
    }
    return JSON.parse(fs.readFileSync(indexPath, 'utf8'));
  }

  // Get single dish data
  getDish(slug) {
    const dishPath = path.join(this.dataDir, `${slug}.json`);
    if (!fs.existsSync(dishPath)) {
      throw new Error(`Dish not found: ${slug}`);
    }
    return JSON.parse(fs.readFileSync(dishPath, 'utf8'));
  }

  // Enhance single dish with OpenAI
  async enhanceDish(slug) {
    console.log(`🍜 Enhancing dish: ${slug}`);
    
    // Check if already enhanced
    const enhancedPath = path.join(this.enhancedDir, `${slug}.json`);
    if (fs.existsSync(enhancedPath)) {
      const existingData = JSON.parse(fs.readFileSync(enhancedPath, 'utf8'));
      // Only skip if it has actual enhanced content
      if (existingData.enhanced_description && existingData.detailed_ingredients) {
        console.log(`✅ Using existing enhanced data for ${slug}`);
        return existingData;
      }
      console.log(`📝 Found ${slug} but missing enhanced content, will enhance with AI`);
    }

    // Get original dish data
    const originalDish = this.getDish(slug);

    try {
      // Enhance with OpenAI
      console.log(`🤖 Calling OpenAI for ${slug}...`);
      const aiEnhancements = await this.enhanceDishWithAI(originalDish);
      
      let enhanced;
      if (aiEnhancements.error) {
        console.log(`⚠️  OpenAI error for ${slug}, using fallback data`);
        enhanced = this.createFallbackEnhancement(originalDish);
      } else {
        // Merge original data with AI enhancements
        enhanced = {
          ...originalDish,
          enhanced_description: aiEnhancements.enhanced_description || originalDish.description.en,
          detailed_ingredients: aiEnhancements.detailed_ingredients || this.createFallbackIngredients(originalDish),
          cooking_method: aiEnhancements.cooking_method || this.createFallbackCookingMethod(originalDish),
          cultural_significance: aiEnhancements.cultural_significance || this.createFallbackCulturalInfo(originalDish),
          variations: aiEnhancements.variations || this.createFallbackVariations(originalDish),
          serving_suggestions: aiEnhancements.serving_suggestions || this.createFallbackServingSuggestions(originalDish),
          nutritional_info: aiEnhancements.nutritional_info || this.createFallbackNutritionalInfo(originalDish),
          where_to_find: aiEnhancements.where_to_find || this.createFallbackWhereToFind(originalDish),
          enhanced_at: new Date().toISOString(),
          ai_generated: !aiEnhancements.error
        };
      }

      // Save enhanced data
      fs.writeFileSync(enhancedPath, JSON.stringify(enhanced, null, 2));
      
      console.log(`✅ Enhanced ${slug} successfully`);
      return enhanced;
      
    } catch (error) {
      console.error(`❌ Error enhancing ${slug}:`, error.message);
      const enhanced = this.createFallbackEnhancement(originalDish);
      fs.writeFileSync(enhancedPath, JSON.stringify(enhanced, null, 2));
      return enhanced;
    }
  }

  // Enhance dish with OpenAI
  async enhanceDishWithAI(dishData) {
    // If no API key, return error to trigger fallback
    if (!this.hasApiKey) {
      console.log('⚠️  No OpenAI API key found, using fallback data');
      return {
        error: true,
        message: 'No OpenAI API key configured',
        fallback: true
      };
    }
    const prompt = `Enhance this Thai dish data with rich, detailed content. Return JSON only.

Dish: ${dishData.name.en} (${dishData.name.thai})
Category: ${dishData.category}
Region: ${dishData.region}
Current description: ${dishData.description.en}
Ingredients: ${dishData.ingredients.join(', ')}
Spice level: ${dishData.spice_level}
Preparation time: ${dishData.preparation_time}

Create enhanced JSON with:
- enhanced_description: 200-250 word engaging description about the dish, its taste, texture, and appeal
- detailed_ingredients: array of objects with ingredient name, purpose, and substitutes
- cooking_method: object with technique, steps_overview, and cooking_tips
- cultural_significance: object with origin_story, cultural_importance, and traditional_occasions
- variations: array of 3-4 regional or style variations with descriptions
- serving_suggestions: object with traditional_accompaniments, presentation, and eating_etiquette
- nutritional_info: object with calories_per_serving, health_benefits, and dietary_notes
- where_to_find: object with best_restaurants, street_food_areas, and price_ranges

Keep it factual and food-focused for authentic Thai cuisine.`;

    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a Thai cuisine expert that MUST only return JSON. Add NO explanation or text outside the JSON structure. Be precise, factual, and helpful for Thai food content."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 4000,
        temperature: 0.7,
        response_format: { type: "json_object" }
      });

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No content in OpenAI response');
      }

      return JSON.parse(content);
    } catch (error) {
      console.error('OpenAI API Error:', error.message);
      return {
        error: true,
        message: error.message,
        fallback: true
      };
    }
  }

  // Enhance all dishes
  async enhanceAllDishes() {
    const dishes = this.getAllDishes();
    console.log(`🚀 Starting enhancement of ${dishes.length} dishes...`);
    
    const results = {
      enhanced: 0,
      cached: 0,
      errors: 0,
      total: dishes.length
    };

    for (const dish of dishes) {
      try {
        const enhanced = await this.enhanceDish(dish.slug);
        if (enhanced.ai_generated !== false) {
          results.enhanced++;
        } else {
          results.cached++;
        }
      } catch (error) {
        console.error(`❌ Failed to enhance ${dish.slug}:`, error.message);
        results.errors++;
      }
      
      // Brief delay to be respectful to API
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Create enhanced index
    this.createEnhancedIndex();

    console.log(`\n📊 Enhancement Results:`);
    console.log(`   Enhanced: ${results.enhanced}`);
    console.log(`   Cached: ${results.cached}`);
    console.log(`   Errors: ${results.errors}`);
    console.log(`   Total: ${results.total}`);
    
    return results;
  }

  // Create enhanced index file
  createEnhancedIndex() {
    const dishes = this.getAllDishes();
    const enhancedIndex = dishes.map(dish => {
      const enhancedPath = path.join(this.enhancedDir, `${dish.slug}.json`);
      if (fs.existsSync(enhancedPath)) {
        const enhanced = JSON.parse(fs.readFileSync(enhancedPath, 'utf8'));
        return {
          ...dish,
          enhanced: true,
          enhanced_at: enhanced.enhanced_at,
          ai_generated: enhanced.ai_generated
        };
      }
      return dish;
    });

    const indexPath = path.join(this.enhancedDir, 'index.json');
    fs.writeFileSync(indexPath, JSON.stringify(enhancedIndex, null, 2));
    console.log('Created enhanced food index.json');
  }

  // Fallback enhancement when OpenAI fails
  createFallbackEnhancement(originalDish) {
    return {
      ...originalDish,
      enhanced_description: originalDish.description.en,
      detailed_ingredients: this.createFallbackIngredients(originalDish),
      cooking_method: this.createFallbackCookingMethod(originalDish),
      cultural_significance: this.createFallbackCulturalInfo(originalDish),
      variations: this.createFallbackVariations(originalDish),
      serving_suggestions: this.createFallbackServingSuggestions(originalDish),
      nutritional_info: this.createFallbackNutritionalInfo(originalDish),
      where_to_find: this.createFallbackWhereToFind(originalDish),
      enhanced_at: new Date().toISOString(),
      ai_generated: false,
      fallback: true
    };
  }

  createFallbackIngredients(dish) {
    return dish.ingredients.map(ingredient => ({
      name: ingredient,
      purpose: "Essential ingredient for authentic flavor",
      substitutes: ["Available at Asian grocery stores"]
    }));
  }

  createFallbackCookingMethod(dish) {
    return {
      technique: dish.category === 'curry' ? 'Simmering' : 'Stir-frying',
      steps_overview: `Traditional Thai cooking method for ${dish.name.en}`,
      cooking_tips: ["Use high heat for stir-frying", "Balance sweet, sour, salty, and spicy flavors"]
    };
  }

  createFallbackCulturalInfo(dish) {
    return {
      origin_story: `${dish.name.en} is a traditional Thai dish from the ${dish.region} region`,
      cultural_importance: "Popular dish in Thai cuisine",
      traditional_occasions: ["Daily meals", "Family gatherings"]
    };
  }

  createFallbackVariations(dish) {
    return [
      {
        name: `Regional ${dish.name.en}`,
        description: `Traditional ${dish.region} style preparation`
      },
      {
        name: `Modern ${dish.name.en}`,
        description: "Contemporary interpretation with modern techniques"
      }
    ];
  }

  createFallbackServingSuggestions(dish) {
    return {
      traditional_accompaniments: ["Jasmine rice", "Fresh vegetables"],
      presentation: "Served hot in traditional Thai style",
      eating_etiquette: "Enjoyed with fork and spoon"
    };
  }

  createFallbackNutritionalInfo(dish) {
    return {
      calories_per_serving: "Varies by preparation",
      health_benefits: ["Rich in Thai herbs and spices", "Balanced flavors"],
      dietary_notes: dish.dietary.length > 0 ? dish.dietary : ["Contains traditional Thai ingredients"]
    };
  }

  createFallbackWhereToFind(dish) {
    return {
      best_restaurants: ["Local Thai restaurants", "Traditional eateries"],
      street_food_areas: ["Thai street food markets", "Food courts"],
      price_ranges: {
        street_food: "$2-5",
        restaurant: "$8-15",
        upscale: "$15-25"
      }
    };
  }
}

// CLI interface
async function main() {
  const enhancer = new FoodEnhancer();
  const args = process.argv.slice(2);
  const command = args[0];
  
  try {
    switch (command) {
      case 'all':
        await enhancer.enhanceAllDishes();
        break;
        
      case 'dish':
        if (!args[1]) {
          console.error('Usage: node enhance-food.js dish <dish-slug>');
          process.exit(1);
        }
        await enhancer.enhanceDish(args[1]);
        break;
        
      default:
        console.log('Thai Food Enhancement Tool');
        console.log('==========================\n');
        console.log('Usage:');
        console.log('  node enhance-food.js all           - Enhance all dishes');
        console.log('  node enhance-food.js dish <slug>    - Enhance specific dish');
        console.log('\nExamples:');
        console.log('  node enhance-food.js all');
        console.log('  node enhance-food.js dish pad-thai');
        break;
    }
  } catch (error) {
    console.error('💥 Command failed:', error.message);
    process.exit(1);
  }
}

// Export for programmatic use
module.exports = FoodEnhancer;

// Run CLI if called directly
if (require.main === module) {
  main();
}
