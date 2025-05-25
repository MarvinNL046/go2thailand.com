const OpenAIClient = require('./openai-client');
const ContentCache = require('../cache/content-cache');
const MetaGenerator = require('../seo/meta-generator');
const { getAllCities, getCityBySlug } = require('../cities');
const fs = require('fs');
const path = require('path');

class ContentEnhancer {
  constructor() {
    this.openai = new OpenAIClient();
    this.cache = new ContentCache();
    this.metaGenerator = new MetaGenerator();
    this.enhancedDataDir = path.join(__dirname, '..', '..', 'data', 'enhanced');
    this.ensureDirectories();
  }

  ensureDirectories() {
    if (!fs.existsSync(this.enhancedDataDir)) {
      fs.mkdirSync(this.enhancedDataDir, { recursive: true });
    }
  }

  // Enhance single city with OpenAI
  async enhanceCity(citySlug) {
    console.log(`🚀 Enhancing city: ${citySlug}`);
    
    // Check cache first
    let enhanced = this.cache.getEnhancedCity(citySlug);
    if (enhanced && !enhanced.error) {
      console.log(`✅ Using cached enhanced data for ${citySlug}`);
      return enhanced;
    }

    // Get original city data
    const originalCity = getCityBySlug(citySlug);
    if (!originalCity) {
      throw new Error(`City not found: ${citySlug}`);
    }

    try {
      // Enhance with OpenAI
      console.log(`🤖 Calling OpenAI for ${citySlug}...`);
      const aiEnhancements = await this.openai.enhanceCityDescription(originalCity);
      
      if (aiEnhancements.error) {
        console.log(`⚠️  OpenAI error for ${citySlug}, using fallback data`);
        enhanced = this.createFallbackEnhancement(originalCity);
      } else {
        // Merge original data with AI enhancements
        enhanced = {
          ...originalCity,
          enhanced_description: aiEnhancements.enhanced_description || originalCity.description.en,
          top_attractions: aiEnhancements.top_attractions || this.createFallbackAttractions(originalCity),
          top_restaurants: aiEnhancements.top_restaurants || this.createFallbackRestaurants(originalCity),
          top_hotels: aiEnhancements.top_hotels || this.createFallbackHotels(originalCity),
          travel_tips: aiEnhancements.travel_tips || this.createFallbackTips(originalCity),
          best_time_to_visit: aiEnhancements.best_time_to_visit || this.createFallbackBestTime(originalCity),
          budget_info: aiEnhancements.budget_info || this.createFallbackBudget(originalCity),
          enhanced_at: new Date().toISOString(),
          ai_generated: !aiEnhancements.error
        };
      }

      // Cache the result
      this.cache.setEnhancedCity(citySlug, enhanced);
      
      // Save to enhanced data directory
      this.saveEnhancedCity(citySlug, enhanced);
      
      console.log(`✅ Enhanced ${citySlug} successfully`);
      return enhanced;
      
    } catch (error) {
      console.error(`❌ Error enhancing ${citySlug}:`, error.message);
      enhanced = this.createFallbackEnhancement(originalCity);
      this.cache.setEnhancedCity(citySlug, enhanced);
      return enhanced;
    }
  }

  // Enhance all cities
  async enhanceAllCities() {
    const cities = getAllCities();
    console.log(`🚀 Starting enhancement of ${cities.length} cities...`);
    
    const results = {
      enhanced: 0,
      cached: 0,
      errors: 0,
      total: cities.length
    };

    for (const city of cities) {
      try {
        const enhanced = await this.enhanceCity(city.slug);
        if (enhanced.ai_generated !== false) {
          results.enhanced++;
        } else {
          results.cached++;
        }
      } catch (error) {
        console.error(`❌ Failed to enhance ${city.slug}:`, error.message);
        results.errors++;
      }
      
      // Brief delay to be respectful to API
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log(`\n📊 Enhancement Results:`);
    console.log(`   Enhanced: ${results.enhanced}`);
    console.log(`   Cached: ${results.cached}`);
    console.log(`   Errors: ${results.errors}`);
    console.log(`   Total: ${results.total}`);
    
    return results;
  }

  // Generate top-10 content for a city/category
  async generateTop10(citySlug, category) {
    console.log(`🚀 Generating top-10 ${category} for ${citySlug}`);
    
    // Check cache first
    let content = this.cache.getTop10Content(citySlug, category);
    if (content && !content.error) {
      console.log(`✅ Using cached top-10 data`);
      return content;
    }

    const cityData = getCityBySlug(citySlug);
    if (!cityData) {
      throw new Error(`City not found: ${citySlug}`);
    }

    try {
      // Generate with OpenAI
      const aiContent = await this.openai.generateTop10Content(cityData.name.en, category);
      
      if (aiContent.error) {
        content = this.createFallbackTop10(cityData, category);
      } else {
        content = {
          ...aiContent,
          city_slug: citySlug,
          city_name: cityData.name.en,
          category,
          generated_at: new Date().toISOString(),
          ai_generated: true
        };
      }

      // Cache and save
      this.cache.setTop10Content(citySlug, category, content);
      this.saveTop10Content(citySlug, category, content);
      
      console.log(`✅ Generated top-10 ${category} for ${citySlug}`);
      return content;
      
    } catch (error) {
      console.error(`❌ Error generating top-10:`, error.message);
      content = this.createFallbackTop10(cityData, category);
      this.cache.setTop10Content(citySlug, category, content);
      return content;
    }
  }

  // Generate travel guide
  async generateGuide(citySlug, guideType) {
    console.log(`🚀 Generating ${guideType} guide for ${citySlug}`);
    
    let content = this.cache.getTravelGuide(citySlug, guideType);
    if (content && !content.error) {
      console.log(`✅ Using cached guide data`);
      return content;
    }

    const cityData = getCityBySlug(citySlug);
    if (!cityData) {
      throw new Error(`City not found: ${citySlug}`);
    }

    try {
      const aiContent = await this.openai.generateTravelGuide(cityData.name.en, guideType);
      
      if (aiContent.error) {
        content = this.createFallbackGuide(cityData, guideType);
      } else {
        content = {
          ...aiContent,
          city_slug: citySlug,
          city_name: cityData.name.en,
          guide_type: guideType,
          generated_at: new Date().toISOString(),
          ai_generated: true
        };
      }

      this.cache.setTravelGuide(citySlug, guideType, content);
      this.saveTravelGuide(citySlug, guideType, content);
      
      console.log(`✅ Generated ${guideType} guide for ${citySlug}`);
      return content;
      
    } catch (error) {
      console.error(`❌ Error generating guide:`, error.message);
      content = this.createFallbackGuide(cityData, guideType);
      this.cache.setTravelGuide(citySlug, guideType, content);
      return content;
    }
  }

  // Save enhanced city data
  saveEnhancedCity(citySlug, data) {
    const filePath = path.join(this.enhancedDataDir, `${citySlug}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }

  // Save top-10 content
  saveTop10Content(citySlug, category, data) {
    const filePath = path.join(this.enhancedDataDir, `top10_${citySlug}_${category}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }

  // Save travel guide
  saveTravelGuide(citySlug, guideType, data) {
    const filePath = path.join(this.enhancedDataDir, `guide_${citySlug}_${guideType}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }

  // Fallback enhancement when OpenAI fails
  createFallbackEnhancement(originalCity) {
    return {
      ...originalCity,
      enhanced_description: originalCity.description.en,
      top_attractions: this.createFallbackAttractions(originalCity),
      top_restaurants: this.createFallbackRestaurants(originalCity),
      top_hotels: this.createFallbackHotels(originalCity),
      travel_tips: this.createFallbackTips(originalCity),
      best_time_to_visit: this.createFallbackBestTime(originalCity),
      budget_info: this.createFallbackBudget(originalCity),
      enhanced_at: new Date().toISOString(),
      ai_generated: false,
      fallback: true
    };
  }

  createFallbackAttractions(city) {
    return city.highlights.map((highlight, index) => ({
      rank: index + 1,
      name: highlight,
      description: `Experience ${highlight} in ${city.name.en}, one of the top attractions in this beautiful Thai destination.`,
      location: "City Center",
      highlights: ["Must-see attraction", "Great for photos"]
    }));
  }

  createFallbackRestaurants(city) {
    const restaurantTypes = ["Local Thai Restaurant", "Street Food Stall", "Traditional Eatery", "Rooftop Restaurant", "Market Food Court"];
    return restaurantTypes.slice(0, 5).map((type, index) => ({
      rank: index + 1,
      name: `Best ${type} in ${city.name.en}`,
      description: `Authentic Thai cuisine and local specialties at this popular ${type.toLowerCase()} in ${city.name.en}.`,
      cuisine_type: "Thai",
      price_range: "$10-30",
      highlights: ["Authentic cuisine", "Local favorite"]
    }));
  }

  createFallbackHotels(city) {
    const hotelTypes = ["Boutique Hotel", "Resort", "Budget Hotel", "Luxury Hotel", "Guesthouse"];
    return hotelTypes.slice(0, 5).map((type, index) => ({
      rank: index + 1,
      name: `${type} ${city.name.en}`,
      description: `Comfortable accommodation at this well-located ${type.toLowerCase()} in ${city.name.en}.`,
      price_range: "$30-150",
      highlights: ["Good location", "Comfortable rooms"]
    }));
  }

  createFallbackTips(city) {
    return [
      `Best time to visit ${city.name.en} is during the cool season (November-February)`,
      "Learn basic Thai phrases for better local interactions",
      "Always carry cash as many places don't accept cards",
      "Respect local customs and dress modestly at temples",
      "Try local street food but choose busy stalls for freshness"
    ];
  }

  createFallbackBestTime(city) {
    return {
      season: "Cool Season",
      months: "November - February",
      weather: "Pleasant temperatures and less rainfall",
      reasons: "Ideal weather conditions for sightseeing and outdoor activities"
    };
  }

  createFallbackBudget(city) {
    return {
      budget: "$30-50 per day",
      mid_range: "$50-100 per day", 
      luxury: "$100+ per day",
      notes: "Budget includes accommodation, food, transportation, and activities"
    };
  }

  createFallbackTop10(city, category) {
    const items = [];
    for (let i = 1; i <= 10; i++) {
      items.push({
        rank: i,
        name: `Top ${category.slice(0, -1)} #${i} in ${city.name.en}`,
        description: `Discover this amazing ${category.slice(0, -1)} in ${city.name.en}, Thailand. A must-visit destination for travelers.`,
        location: "City Area",
        highlights: ["Popular choice", "Highly recommended"]
      });
    }

    return {
      title: `Top 10 ${category} in ${city.name.en}`,
      meta_description: `Discover the best ${category} in ${city.name.en}, Thailand. Our curated list of top attractions and activities.`,
      intro: `Explore the best ${category} that ${city.name.en} has to offer.`,
      items,
      city_slug: city.slug,
      city_name: city.name.en,
      category,
      generated_at: new Date().toISOString(),
      ai_generated: false,
      fallback: true
    };
  }

  createFallbackGuide(city, guideType) {
    return {
      title: `${guideType} Guide to ${city.name.en}`,
      meta_description: `Complete ${guideType} travel guide for ${city.name.en}, Thailand. Tips, recommendations, and planning advice.`,
      introduction: `Welcome to your comprehensive ${guideType} guide for ${city.name.en}, Thailand.`,
      sections: [
        {
          section_title: "Getting Started",
          content: `Everything you need to know for your ${guideType} trip to ${city.name.en}.`,
          tips: ["Plan ahead", "Book accommodations early"]
        }
      ],
      essential_info: {
        duration: "3-5 days",
        best_for: `${guideType} travelers`,
        budget_estimate: "$50-100 per day",
        must_know: ["Bring sunscreen", "Respect local customs", "Try local food"]
      },
      city_slug: city.slug,
      city_name: city.name.en,
      guide_type: guideType,
      generated_at: new Date().toISOString(),
      ai_generated: false,
      fallback: true
    };
  }
}

module.exports = ContentEnhancer;
