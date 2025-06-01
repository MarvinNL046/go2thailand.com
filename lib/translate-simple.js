require('dotenv').config({ path: '.env.local' });
const fs = require('fs').promises;
const path = require('path');
const OpenAI = require('openai');

// Simple translator focused on speed
class SimpleTranslator {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.requestCount = 0;
    this.lastReset = Date.now();
  }

  async waitIfNeeded() {
    // Simple rate limiting - 30 requests per minute
    const now = Date.now();
    if (now - this.lastReset > 60000) {
      this.requestCount = 0;
      this.lastReset = now;
    }
    
    if (this.requestCount >= 30) {
      const waitTime = 60000 - (now - this.lastReset);
      console.log(`  ⏱️  Rate limit reached, waiting ${Math.round(waitTime/1000)}s...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
      this.requestCount = 0;
      this.lastReset = Date.now();
    }
  }

  async translate(text, targetLang) {
    await this.waitIfNeeded();
    this.requestCount++;

    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a translator. Translate travel content from English to ${targetLang}. Keep place names recognizable. Be natural and culturally appropriate. Return ONLY the translated text, no explanations.`
          },
          {
            role: "user",
            content: text
          }
        ],
        max_tokens: 500,
        temperature: 0.3,
      });

      return response.choices[0]?.message?.content || text;
    } catch (error) {
      console.error(`Translation error: ${error.message}`);
      return text;
    }
  }

  async translateCityBasics() {
    console.log('\n🚀 Quick City Translation Demo\n');
    
    // Start with just Bangkok as a test
    const cityData = {
      bangkok: {
        name: "Bangkok",
        description: "Thailand's vibrant capital city where ancient temples meet modern skyscrapers",
        highlights: [
          "Grand Palace and Wat Phra Kaew",
          "Street food paradise",
          "Floating markets"
        ]
      },
      "chiang-mai": {
        name: "Chiang Mai",
        description: "Northern Thailand's cultural heart surrounded by mountains and temples",
        highlights: [
          "Over 300 Buddhist temples",
          "Night markets and handicrafts",
          "Elephant sanctuaries"
        ]
      },
      phuket: {
        name: "Phuket",
        description: "Thailand's largest island famous for stunning beaches and vibrant nightlife",
        highlights: [
          "Beautiful beaches",
          "Island hopping tours",
          "Old Town architecture"
        ]
      }
    };

    const languages = {
      zh: 'Chinese',
      de: 'German',
      fr: 'French'
    };

    const results = {};

    for (const [citySlug, city] of Object.entries(cityData)) {
      console.log(`\n📍 ${city.name}`);
      results[citySlug] = {
        name: { en: city.name },
        description: { en: city.description },
        highlights: { en: city.highlights }
      };

      for (const [langCode, langName] of Object.entries(languages)) {
        console.log(`  🌐 Translating to ${langName}...`);
        
        // Translate description
        results[citySlug].description[langCode] = await this.translate(
          city.description,
          langName
        );
        
        // Translate highlights
        results[citySlug].highlights[langCode] = [];
        for (const highlight of city.highlights) {
          const translated = await this.translate(highlight, langName);
          results[citySlug].highlights[langCode].push(translated);
        }
        
        // Quick delay between languages
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    // Save results
    const outputPath = path.join(__dirname, '..', 'translations', 'cities', 'city-basics.json');
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, JSON.stringify(results, null, 2));
    
    console.log('\n✅ Translation complete! Saved to:', outputPath);
    console.log('\nSample output:');
    console.log(JSON.stringify(results.bangkok.description, null, 2));
  }

  async translateFoodNames() {
    console.log('\n🍜 Quick Food Translation Demo\n');
    
    const foods = {
      "pad-thai": "Pad Thai - Stir-fried rice noodles",
      "tom-yum-goong": "Tom Yum Goong - Spicy shrimp soup",
      "green-curry": "Green Curry - Aromatic coconut curry"
    };

    const languages = {
      zh: 'Chinese',
      de: 'German',
      fr: 'French'
    };

    const results = {};

    for (const [foodSlug, foodName] of Object.entries(foods)) {
      console.log(`\n🍽️  ${foodName}`);
      results[foodSlug] = { en: foodName };

      for (const [langCode, langName] of Object.entries(languages)) {
        results[foodSlug][langCode] = await this.translate(foodName, langName);
        console.log(`  ${langCode}: ${results[foodSlug][langCode]}`);
      }
    }

    // Save results
    const outputPath = path.join(__dirname, '..', 'translations', 'food', 'food-names.json');
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.writeFile(outputPath, JSON.stringify(results, null, 2));
    
    console.log('\n✅ Food translations saved!');
  }
}

// Run demo
if (require.main === module) {
  const translator = new SimpleTranslator();
  const command = process.argv[2] || 'cities';
  
  if (command === 'cities') {
    translator.translateCityBasics().catch(console.error);
  } else if (command === 'food') {
    translator.translateFoodNames().catch(console.error);
  } else {
    console.log('Usage: node translate-simple.js [cities|food]');
  }
}

module.exports = SimpleTranslator;