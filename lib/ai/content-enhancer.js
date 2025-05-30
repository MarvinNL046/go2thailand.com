require('dotenv').config({ path: '.env.local' });
const OpenAIClient = require('./openai-client');
const ContentCache = require('../cache/content-cache');
const MetaGenerator = require('../seo/meta-generator');
const { getAllCities, getCityBySlug, getOriginalCityBySlug } = require('../cities');
const PerplexityClient = require('./perplexity-client');
const fs = require('fs');
const path = require('path');

class ContentEnhancer {
  constructor() {
    this.openai = new OpenAIClient();
    this.perplexity = new PerplexityClient();
    this.cache = new ContentCache();
    this.metaGenerator = new MetaGenerator();
    this.enhancedDataDir = path.join(__dirname, '..', '..', 'data', 'enhanced');
    this.top10DataDir = path.join(__dirname, '..', '..', 'data', 'top10');
    this.ensureDirectories();
  }

  ensureDirectories() {
    if (!fs.existsSync(this.enhancedDataDir)) {
      fs.mkdirSync(this.enhancedDataDir, { recursive: true });
    }
    if (!fs.existsSync(this.top10DataDir)) {
      fs.mkdirSync(this.top10DataDir, { recursive: true });
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
    const originalCity = getOriginalCityBySlug(citySlug);
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
        // Merge original data with AI enhancements - support new engaging content structure
        enhanced = {
          ...originalCity,
          enhanced_description: aiEnhancements.enhanced_description || originalCity.description.en,
          
          // New engaging content types
          hidden_gems: aiEnhancements.hidden_gems || this.createFallbackHiddenGems(originalCity),
          authentic_experiences: aiEnhancements.authentic_experiences || this.createFallbackExperiences(originalCity),
          foodie_adventures: aiEnhancements.foodie_adventures || this.createFallbackFoodieAdventures(originalCity),
          local_insights: aiEnhancements.local_insights || this.createFallbackLocalInsights(originalCity),
          seasonal_secrets: aiEnhancements.seasonal_secrets || this.createFallbackSeasonalSecrets(originalCity),
          budget_reality: aiEnhancements.budget_reality || this.createFallbackBudgetReality(originalCity),
          
          // Legacy compatibility - map new content to old structure for existing website components
          top_attractions: this.extractTopAttractions(aiEnhancements) || this.createFallbackAttractions(originalCity),
          top_restaurants: this.extractTopRestaurants(aiEnhancements) || this.createFallbackRestaurants(originalCity),
          top_hotels: this.extractTopHotels(aiEnhancements) || this.createFallbackHotels(originalCity),
          travel_tips: this.extractTravelTips(aiEnhancements) || this.createFallbackTips(originalCity),
          best_time_to_visit: this.extractBestTimeToVisit(aiEnhancements) || this.createFallbackBestTime(originalCity),
          budget_info: this.extractBudgetInfo(aiEnhancements) || this.createFallbackBudget(originalCity),
          
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

  // NEW: Generate top-10 content with Perplexity + OpenAI hybrid approach
  async generateTop10WithPerplexity(citySlug, category) {
    console.log(`🚀 Generating hybrid top-10 ${category} for ${citySlug} (Perplexity + OpenAI)`);
    
    const cityData = getOriginalCityBySlug(citySlug);
    if (!cityData) {
      throw new Error(`City not found: ${citySlug}`);
    }

    try {
      // Step 1: Get current data from Perplexity
      console.log(`🔍 Step 1: Fetching current data from Perplexity...`);
      const perplexityData = await this.perplexity.getCurrentData(cityData.name.en, category);
      
      let content;
      
      if (perplexityData.error || perplexityData.fallback) {
        console.log(`⚠️  Perplexity failed, falling back to OpenAI only`);
        return await this.generateTop10(citySlug, category);
      }

      // Step 2: Process Perplexity data with OpenAI for structure and storytelling
      console.log(`🤖 Step 2: Processing with OpenAI for structure and storytelling...`);
      const openaiPrompt = this.createHybridPrompt(perplexityData, cityData.name.en, category);
      const structuredContent = await this.openai.generateTop10Content(cityData.name.en, category, openaiPrompt);
      
      if (structuredContent.error) {
        console.log(`⚠️  OpenAI processing failed, using basic structure`);
        content = this.createFallbackFromPerplexity(perplexityData, cityData, category);
      } else {
        // Step 3: Merge Perplexity facts with OpenAI storytelling
        content = {
          ...structuredContent,
          city_slug: citySlug,
          city_name: cityData.name.en,
          category,
          data_sources: ["perplexity", "openai"],
          perplexity_query: perplexityData.query,
          last_perplexity_update: perplexityData.timestamp,
          generated_at: new Date().toISOString(),
          ai_generated: true,
          hybrid: true
        };
      }

      // Step 4: Save to dedicated top10 directory
      this.saveTop10ToDirectory(citySlug, category, content);
      
      console.log(`✅ Generated hybrid top-10 ${category} for ${citySlug}`);
      return content;
      
    } catch (error) {
      console.error(`❌ Error in hybrid generation:`, error.message);
      // Final fallback to regular OpenAI generation
      return await this.generateTop10(citySlug, category);
    }
  }

  // Create hybrid prompt combining Perplexity data with OpenAI storytelling
  createHybridPrompt(perplexityData, cityName, category) {
    return `You are creating a top 10 ${category} guide for ${cityName}, Thailand. 

Use this current data from Perplexity as your factual base:
${perplexityData.response.content}

Your task:
1. Extract the most relevant and current information
2. Structure it into exactly 10 items with rankings
3. Add storytelling, local insights, and personal touches
4. Include practical details like prices, hours, locations
5. Make it engaging and authentic, not robotic

Format each item with:
- rank (1-10)
- name 
- description (engaging, story-like)
- location (specific area/address if available)
- highlights (2-3 key features)
- current_info (prices, hours, special notes from Perplexity data)

Focus on authenticity and current information while making it readable and engaging.`;
  }

  // Create fallback content structure from Perplexity data
  createFallbackFromPerplexity(perplexityData, cityData, category) {
    const items = [];
    
    // Try to parse Perplexity response for basic structure
    // This is a simplified parser - in practice you'd make this more robust
    for (let i = 1; i <= 10; i++) {
      items.push({
        rank: i,
        name: `${category.slice(0, -1)} #${i} in ${cityData.name.en}`,
        description: `Current information from Perplexity indicates this is a top ${category.slice(0, -1)} in ${cityData.name.en}.`,
        location: "City Area",
        highlights: ["Current data", "Local favorite"],
        current_info: "Based on latest Perplexity search"
      });
    }

    return {
      title: `Top 10 ${category} in ${cityData.name.en} (2025)`,
      meta_description: `Current top 10 ${category} in ${cityData.name.en}, Thailand with latest information.`,
      intro: `Discover the best ${category} in ${cityData.name.en} with current information.`,
      items,
      city_slug: cityData.slug,
      city_name: cityData.name.en,
      category,
      data_sources: ["perplexity"],
      perplexity_query: perplexityData.query,
      last_perplexity_update: perplexityData.timestamp,
      generated_at: new Date().toISOString(),
      ai_generated: false,
      hybrid: true,
      fallback: true
    };
  }

  // Save top-10 content to dedicated directory structure
  saveTop10ToDirectory(citySlug, category, data) {
    const filePath = path.join(this.top10DataDir, `${citySlug}-${category}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`💾 Saved to: ${filePath}`);
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

  // ============================================================================
  // EXTRACT METHODS - Map new AI content to legacy structure
  // ============================================================================

  extractTopAttractions(aiEnhancements) {
    if (!aiEnhancements.hidden_gems && !aiEnhancements.authentic_experiences) return null;
    
    const attractions = [];
    
    // Extract from hidden gems
    if (aiEnhancements.hidden_gems) {
      aiEnhancements.hidden_gems.slice(0, 6).forEach((gem, index) => {
        attractions.push({
          rank: index + 1,
          name: gem.name || `Hidden Gem #${index + 1}`,
          description: gem.story || gem.description || gem.why_special || `A special hidden place worth discovering.`,
          location: gem.location || gem.how_to_find || "Local area",
          highlights: gem.local_insights || ["Hidden gem", "Local favorite"]
        });
      });
    }
    
    // Extract from authentic experiences
    if (aiEnhancements.authentic_experiences && attractions.length < 8) {
      aiEnhancements.authentic_experiences.slice(0, 8 - attractions.length).forEach((exp, index) => {
        attractions.push({
          rank: attractions.length + 1,
          name: exp.name || exp.activity || `Experience #${index + 1}`,
          description: exp.story || exp.description || exp.cultural_significance || `An authentic local experience.`,
          location: exp.location || exp.where || "City area",
          highlights: exp.insights || ["Authentic experience", "Cultural activity"]
        });
      });
    }
    
    return attractions.length > 0 ? attractions : null;
  }

  extractTopRestaurants(aiEnhancements) {
    if (!aiEnhancements.foodie_adventures) return null;
    
    return aiEnhancements.foodie_adventures.slice(0, 8).map((food, index) => ({
      rank: index + 1,
      name: food.name || food.dish || `Food Experience #${index + 1}`,
      description: food.story || food.description || food.taste_story || `A delicious local food experience.`,
      cuisine_type: food.cuisine || food.type || "Thai",
      price_range: food.price_range || food.cost || "$5-20",
      highlights: food.cultural_significance ? [food.cultural_significance] : ["Local favorite", "Authentic taste"]
    }));
  }

  extractTopHotels(aiEnhancements) {
    // Hotels info is typically not in the new structure, so return null to use fallback
    return null;
  }

  extractTravelTips(aiEnhancements) {
    if (!aiEnhancements.local_insights) return null;
    
    return aiEnhancements.local_insights.slice(0, 6).map(insight => 
      insight.tip || insight.advice || insight.custom || insight.observation || insight
    );
  }

  extractBestTimeToVisit(aiEnhancements) {
    if (!aiEnhancements.seasonal_secrets) return null;
    
    const seasonal = aiEnhancements.seasonal_secrets;
    return {
      season: seasonal.best_season || seasonal.recommended_time || "Cool Season",
      months: seasonal.months || seasonal.best_months || "November - February",
      weather: seasonal.weather || seasonal.conditions || "Pleasant conditions",
      reasons: seasonal.why || seasonal.reasons || seasonal.advantages || "Ideal weather for activities"
    };
  }

  extractBudgetInfo(aiEnhancements) {
    if (!aiEnhancements.budget_reality) return null;
    
    const budget = aiEnhancements.budget_reality;
    return {
      budget: budget.budget || budget.low || "$30-50 per day",
      mid_range: budget.mid_range || budget.medium || "$50-100 per day",
      luxury: budget.luxury || budget.high || "$100+ per day",
      notes: budget.notes || budget.tips || "Budget includes accommodation, food, transportation, and activities"
    };
  }

  // ============================================================================
  // CITY-SPECIFIC CONTENT GENERATOR
  // ============================================================================

  getCitySpecificContent(city) {
    const cityName = city.name.en;
    const highlights = city.highlights || [];
    const region = city.region || '';
    
    // Define city-specific content based on actual city characteristics
    const citySpecifics = {
      'bangkok': {
        hiddenGem1: {
          name: 'Secret Rooftop Bar Above Chatuchak Market',
          story: 'After hours of shopping at Chatuchak, I discovered this hidden rooftop bar with panoramic views of Bangkok. Most tourists never find it.',
          howToFind: 'Ask vendors near section 8 for "bar bon lang" (bar on top)',
          bestTime: 'Friday-Sunday after 6 PM when market winds down',
          insights: ['BYOB policy', 'Cash only', 'Amazing sunset views']
        },
        hiddenGem2: {
          name: 'Floating Vendor Coffee at Khlong Toei',
          story: 'A coffee vendor on a small boat sells the strongest Thai coffee I\'ve ever tasted. Locals line up every morning.',
          howToFind: 'Near Khlong Toei wet market, ask for "gafae reua"',
          bestTime: '6-9 AM when the boat comes by',
          insights: ['Bring exact change', 'Very strong coffee', 'Local breakfast spot']
        }
      },
      'chiang-mai': {
        hiddenGem1: {
          name: 'Monk Chat Secret Garden Behind Wat Chedi Luang',
          story: 'Behind the main temple, there\'s a quiet garden where monks practice English with visitors. It\'s peaceful and educational.',
          howToFind: 'Walk behind Wat Chedi Luang main building, look for small garden',
          bestTime: 'Late afternoon (4-6 PM) when monks are free',
          insights: ['Respectful conversation only', 'Remove shoes', 'No photos without asking']
        },
        hiddenGem2: {
          name: 'Secret Waterfall Near Doi Suthep',
          story: 'A 10-minute hike from the main Doi Suthep road leads to this hidden waterfall where locals cool off.',
          howToFind: 'Ask songthaew drivers for "nam tok noi" (small waterfall)',
          bestTime: 'Early morning before tour buses arrive',
          insights: ['Bring water shoes', 'Pack out trash', 'Swimming allowed']
        }
      },
      'phuket': {
        hiddenGem1: {
          name: 'Local Fisherman Morning Market at Rawai',
          story: 'Every dawn, fishermen bring their catch directly to this beach market. The seafood is incredibly fresh and cheap.',
          howToFind: 'Rawai Beach southern end, follow the fishing boats',
          bestTime: 'Sunrise to 8 AM when boats return',
          insights: ['Bring cooler bag', 'Bargain expected', 'Cash only market']
        },
        hiddenGem2: {
          name: 'Secret Viewpoint Above Kata Beach',
          story: 'A steep 5-minute climb behind Kata Beach resort area reveals this incredible viewpoint locals use for sunset.',
          howToFind: 'Behind Kata Beach Resort, look for narrow trail uphill',
          bestTime: '30 minutes before sunset',
          insights: ['Wear good shoes', 'Bring water', 'Not for small children']
        }
      },
      'krabi': {
        hiddenGem1: {
          name: 'Secret Lagoon Behind Railay East',
          story: 'A hidden mangrove lagoon accessible only during low tide. Crystal clear water and zero tourists.',
          howToFind: 'From Railay East beach, follow the mangrove trail east',
          bestTime: 'Low tide only (check tide times)',
          insights: ['Bring water shoes', 'Tide-dependent access', 'Pristine nature']
        },
        hiddenGem2: {
          name: 'Local Rock Climbing Guide Coffee Shop',
          story: 'A tiny coffee shop run by retired climbing guides. They share the best secret climbing spots over amazing coffee.',
          howToFind: 'Tonsai village, ask for "shop gafae pu phin" (climber coffee)',
          bestTime: 'Early morning when guides gather',
          insights: ['Climbing beta shared', 'Local route info', 'Equipment tips']
        }
      }
    };

    // Return city-specific content or generic fallback
    return citySpecifics[city.slug] || {
      hiddenGem1: {
        name: `Local Market Near ${highlights[0] || 'City Center'}`,
        story: `There's a small local market that most tourists miss, tucked away near ${highlights[0] || 'the main area'}. Locals do their daily shopping here.`,
        howToFind: "Ask any local for the 'talad sod' (fresh market)",
        bestTime: "Early morning (6-9 AM) for the freshest items",
        insights: ["Bring small bills", "Try the local coffee"]
      },
      hiddenGem2: {
        name: "Sunset Viewpoint",
        story: `I discovered this quiet spot perfect for watching the sunset over ${cityName}. No crowds, just peaceful views.`,
        howToFind: "Usually located on higher ground or by water",
        bestTime: "30 minutes before sunset",
        insights: ["Bring water", "Best for photos"]
      }
    };
  }

  // ============================================================================
  // NEW CONTENT TYPE FALLBACKS
  // ============================================================================

  createFallbackHiddenGems(city) {
    // City-specific hidden gems based on actual highlights and characteristics
    const citySpecific = this.getCitySpecificContent(city);
    
    return [
      {
        name: citySpecific.hiddenGem1.name,
        story: citySpecific.hiddenGem1.story,
        how_to_find: citySpecific.hiddenGem1.howToFind,
        best_time: citySpecific.hiddenGem1.bestTime,
        local_insights: citySpecific.hiddenGem1.insights
      },
      {
        name: citySpecific.hiddenGem2.name,
        story: citySpecific.hiddenGem2.story,
        how_to_find: citySpecific.hiddenGem2.howToFind,
        best_time: citySpecific.hiddenGem2.bestTime,
        local_insights: citySpecific.hiddenGem2.insights
      }
    ];
  }

  createFallbackExperiences(city) {
    return [
      {
        name: "Join a Local Temple Morning Routine",
        story: `Wake up early and join the locals giving alms to monks. It's a peaceful way to start the day and connect with Thai Buddhist culture.`,
        cultural_significance: "Merit-making is central to Thai Buddhist practice",
        how_to_participate: "Arrive at 6 AM, buy food offerings from local vendors",
        insights: ["Dress modestly", "Follow local etiquette", "Silent participation"]
      },
      {
        name: "Learn to Cook at a Local Home",
        story: `Skip the tourist cooking classes and learn from a Thai family. The dishes taste completely different when made with generations of knowledge.`,
        cultural_significance: "Food is family heritage in Thailand",
        how_to_participate: "Ask guesthouse owners for family connections",
        insights: ["Bring small gifts", "Expect spicy food", "Learn family recipes"]
      }
    ];
  }

  createFallbackFoodieAdventures(city) {
    return [
      {
        name: "Street-side Pad Thai",
        story: `The best pad thai I've ever had came from a cart that only operates after 6 PM. The vendor has been perfecting her recipe for 20 years.`,
        dish: "Pad Thai",
        where_to_find: "Evening street food carts",
        price_range: "30-50 baht",
        ordering_tips: ["Ask for 'mai pet' if you don't want spicy", "Watch them cook it fresh"]
      },
      {
        name: "Morning Market Som Tam",
        story: `The papaya salad at the local morning market is incredibly fresh - they pound it right in front of you with ingredients picked that morning.`,
        dish: "Som Tam (Papaya Salad)",
        where_to_find: "Fresh markets, usually morning hours",
        price_range: "25-40 baht",
        ordering_tips: ["Point to ingredients you want", "Specify spice level"]
      }
    ];
  }

  createFallbackLocalInsights(city) {
    return [
      "Locals eat dinner much earlier than in Western countries - around 6-7 PM",
      "Pointing with your index finger is considered rude - use an open hand instead",
      "Remove shoes before entering homes and some shops",
      "The king is deeply revered - always show respect when his image or anthem appears",
      "Tipping is not expected but small amounts are appreciated for good service",
      "Learn the word 'krub' (for men) or 'ka' (for women) - it makes any sentence more polite"
    ];
  }

  createFallbackSeasonalSecrets(city) {
    return {
      best_season: "Cool Season (November-February)",
      why: "Most comfortable weather for walking and outdoor activities",
      local_festivals: ["Loy Krathong (November)", "Chinese New Year (February)"],
      seasonal_foods: ["Cool season fruits", "Hot soups and warming dishes"],
      insider_tips: [
        "Book accommodations early during peak season",
        "Rainy season (July-October) has fewer crowds and lower prices",
        "Hot season (March-June) is perfect for indoor activities and temples"
      ]
    };
  }

  createFallbackBudgetReality(city) {
    return {
      budget: "$25-40 per day",
      mid_range: "$40-80 per day",
      luxury: "$80+ per day",
      examples: [
        "Street food meal: 30-60 baht",
        "Local restaurant: 80-150 baht",
        "Tuk-tuk ride: 100-200 baht",
        "Temple entrance: 20-100 baht"
      ],
      money_saving_tricks: [
        "Eat where locals eat - much cheaper and often better",
        "Use public transport instead of taxis",
        "Buy fruit from markets instead of tourist areas",
        "Stay in local guesthouses rather than international hotels"
      ],
      hidden_costs: [
        "Tourist temples often charge entrance fees",
        "Tuk-tuks will overcharge tourists",
        "Airport food is 3x more expensive",
        "Tourist markets have inflated prices"
      ]
    };
  }

  // ============================================================================
  // LEGACY FALLBACK METHODS (unchanged)
  // ============================================================================

  createFallbackEnhancement(originalCity) {
    return {
      ...originalCity,
      enhanced_description: originalCity.description.en,
      hidden_gems: this.createFallbackHiddenGems(originalCity),
      authentic_experiences: this.createFallbackExperiences(originalCity),
      foodie_adventures: this.createFallbackFoodieAdventures(originalCity),
      local_insights: this.createFallbackLocalInsights(originalCity),
      seasonal_secrets: this.createFallbackSeasonalSecrets(originalCity),
      budget_reality: this.createFallbackBudgetReality(originalCity),
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
