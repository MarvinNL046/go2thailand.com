require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

// Enhanced content generation for attractions
async function enhanceAttractionContent(attraction) {
  const cityName = getCityName(attraction.city_slug);
  
  const prompt = `You are a travel expert specializing in Thailand tourism. Create detailed, engaging content for this ${cityName} attraction:

**Attraction:** ${attraction.name.en}
**City:** ${cityName}
**Type:** ${attraction.type}
**Basic Description:** ${attraction.description.en}
**Highlights:** ${attraction.highlights.join(', ')}
**Address:** ${attraction.address}
**Entrance Fee:** ฿${attraction.entrance_fee.thb}

Generate comprehensive content in this exact JSON format (respond with ONLY the JSON, no other text):

{
  "enhanced_description": "A detailed 200-250 word description about the attraction's history, significance, what visitors can expect, and why it's worth visiting",
  "detailed_history": "150-200 words about the historical background and cultural significance",
  "visitor_experience": "What to expect when visiting - layout, main areas, typical visit duration, etc.",
  "best_time_to_visit": {
    "time_of_day": "Morning/Afternoon/Evening with reasoning",
    "duration": "Recommended visit duration",
    "crowd_level": "Expected crowd level and best times to avoid crowds"
  },
  "photography_tips": [
    "Best photo spots and angles",
    "Lighting conditions",
    "Instagram-worthy locations",
    "Photography restrictions to be aware of"
  ],
  "practical_info": {
    "how_to_get_there": "Transportation options and directions from ${cityName}",
    "nearby_attractions": "3-4 nearby attractions within walking distance",
    "food_options": "Dining options nearby or within the attraction",
    "shopping": "Souvenir shops or markets nearby"
  },
  "insider_tips": [
    "Local secrets and lesser-known facts",
    "How to make the most of your visit",
    "Things most tourists miss",
    "Cultural etiquette and customs"
  ],
  "seasonal_considerations": "How the experience changes throughout the year",
  "accessibility": "Information for visitors with mobility issues",
  "cultural_significance": "Why this place is important to Thai culture and history",
  "fun_facts": [
    "3-5 interesting facts that most people don't know",
    "Unique features or records",
    "Famous visitors or events"
  ]
}

Focus on accuracy, engaging storytelling, and practical value for tourists. Make it informative but not overwhelming. Ensure all information is specific to ${cityName} and this attraction.`;

  try {
    console.log(`🤖 Generating enhanced content for ${attraction.name.en} in ${cityName}...`);
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a Thailand travel expert. Respond only with valid JSON, no additional text or formatting."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    const content = response.choices[0].message.content.trim();
    
    // Parse the JSON response
    let enhancedContent;
    try {
      enhancedContent = JSON.parse(content);
    } catch (parseError) {
      console.error(`❌ JSON parsing failed for ${attraction.name.en}`);
      throw parseError;
    }

    // Combine original data with enhanced content
    const enhancedAttraction = {
      ...attraction,
      ...enhancedContent,
      enhanced_at: new Date().toISOString(),
      ai_generated: true
    };

    console.log(`✅ Enhanced content generated for ${attraction.name.en}`);
    return enhancedAttraction;

  } catch (error) {
    console.error(`❌ Error enhancing ${attraction.name.en}:`, error.message);
    throw error;
  }
}

// Process all attractions in a city
async function enhanceCityAttractions(citySlug) {
  const cityName = getCityName(citySlug);
  const attractionsDir = path.join(__dirname, '../data/attractions', citySlug);
  const enhancedDir = path.join(__dirname, '../data/enhanced/attractions', citySlug);
  
  // Check if base attractions exist
  if (!fs.existsSync(attractionsDir)) {
    throw new Error(`Attractions directory not found: ${attractionsDir}`);
  }

  // Create enhanced directory
  if (!fs.existsSync(enhancedDir)) {
    fs.mkdirSync(enhancedDir, { recursive: true });
  }

  // Read index file to get all attractions
  const indexPath = path.join(attractionsDir, 'index.json');
  if (!fs.existsSync(indexPath)) {
    throw new Error(`Index file not found: ${indexPath}`);
  }

  const indexData = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));
  const attractions = indexData.attractions;

  console.log(`\n🚀 Starting enhancement for ${attractions.length} ${cityName} attractions...\n`);

  for (let i = 0; i < attractions.length; i++) {
    const attractionSummary = attractions[i];
    
    try {
      // Read full attraction data
      const attractionPath = path.join(attractionsDir, `${attractionSummary.slug}.json`);
      const attraction = JSON.parse(fs.readFileSync(attractionPath, 'utf-8'));
      
      console.log(`📍 Processing ${i + 1}/${attractions.length}: ${attraction.name.en}`);
      
      // Check if already enhanced
      const enhancedPath = path.join(enhancedDir, `${attraction.slug}.json`);
      if (fs.existsSync(enhancedPath)) {
        console.log(`⏭️  Already enhanced, skipping...`);
        continue;
      }

      // Generate enhanced content
      const enhanced = await enhanceAttractionContent(attraction);
      
      // Save enhanced data
      fs.writeFileSync(enhancedPath, JSON.stringify(enhanced, null, 2));
      console.log(`💾 Saved enhanced data: ${enhancedPath}`);
      
      // Add delay to respect API rate limits
      console.log(`⏳ Waiting 2 seconds before next request...\n`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (error) {
      console.error(`❌ Failed to enhance ${attractionSummary.name.en}:`, error.message);
      continue; // Continue with next attraction
    }
  }

  // Create enhanced index
  const enhancedIndexData = {
    ...indexData,
    enhanced_at: new Date().toISOString(),
    enhanced_count: fs.readdirSync(enhancedDir).filter(f => f.endsWith('.json') && f !== 'index.json').length
  };

  const enhancedIndexPath = path.join(enhancedDir, 'index.json');
  fs.writeFileSync(enhancedIndexPath, JSON.stringify(enhancedIndexData, null, 2));
  console.log(`📋 Created enhanced index: ${enhancedIndexPath}`);

  console.log(`\n🎉 Enhancement completed for ${cityName}!`);
  return enhancedIndexData.enhanced_count;
}

// Process all cities
async function enhanceAllCitiesAttractions() {
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

  console.log('🔄 Starting enhancement for all cities attractions...');
  console.log(`📊 Total cities to process: ${cities.length}`);
  console.log('');

  const results = [];

  for (const citySlug of cities) {
    const cityName = getCityName(citySlug);
    
    try {
      console.log(`🏙️  Starting ${cityName}...`);
      const enhancedCount = await enhanceCityAttractions(citySlug);
      results.push({
        citySlug,
        cityName,
        enhancedCount,
        status: 'completed'
      });
      console.log(`✅ ${cityName}: ${enhancedCount} attractions enhanced\n`);
      
      // Longer delay between cities to be respectful to API
      if (citySlug !== cities[cities.length - 1]) {
        console.log(`⏳ Waiting 5 seconds before next city...\n`);
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
      
    } catch (error) {
      console.error(`❌ Error enhancing ${cityName}:`, error.message);
      results.push({
        citySlug,
        cityName,
        enhancedCount: 0,
        status: 'failed',
        error: error.message
      });
    }
  }

  // Summary
  console.log('\n🎉 All cities enhancement completed!');
  console.log('📊 Summary:');
  
  const totalEnhanced = results.reduce((sum, city) => sum + city.enhancedCount, 0);
  const successfulCities = results.filter(city => city.status === 'completed').length;
  
  results.forEach(result => {
    const status = result.status === 'completed' ? '✅' : '❌';
    console.log(`  ${status} ${result.cityName}: ${result.enhancedCount} attractions`);
  });
  
  console.log(`\n📈 Total: ${totalEnhanced} attractions enhanced across ${successfulCities}/${cities.length} cities`);
  
  return results;
}

// CLI execution
if (require.main === module) {
  const citySlug = process.argv[2];
  
  if (citySlug && citySlug !== 'all') {
    // Single city
    console.log(`🔄 Enhancing attractions for ${getCityName(citySlug)}...`);
    
    enhanceCityAttractions(citySlug)
      .then((count) => {
        console.log(`\n✅ ${getCityName(citySlug)} attractions enhanced successfully! (${count} attractions)`);
      })
      .catch(error => {
        console.error('❌ Enhancement failed:', error.message);
        process.exit(1);
      });
  } else {
    // All cities
    enhanceAllCitiesAttractions()
      .then(results => {
        console.log('\n✅ All cities enhancement process completed!');
      })
      .catch(error => {
        console.error('❌ Enhancement failed:', error.message);
        process.exit(1);
      });
  }
}

module.exports = { enhanceAttractionContent, enhanceCityAttractions, enhanceAllCitiesAttractions };
