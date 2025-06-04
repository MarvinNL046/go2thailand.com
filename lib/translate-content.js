require('dotenv').config({ path: '.env.local' });
const fs = require('fs').promises;
const path = require('path');
const OpenAIClient = require('./ai/openai-client');

class ContentTranslator {
  constructor() {
    this.openaiClient = new OpenAIClient();
    this.languages = ['zh', 'de', 'fr', 'ru', 'ja', 'ko'];
    this.languageNames = {
      zh: 'Chinese (Simplified)',
      de: 'German',
      fr: 'French',
      ru: 'Russian',
      ja: 'Japanese',
      ko: 'Korean'
    };
  }

  // Translate a single piece of text
  async translateText(text, targetLang, context = '') {
    const prompt = `Translate the following English text to ${this.languageNames[targetLang]}. 
    ${context ? `Context: ${context}` : ''}
    
    Important:
    - Maintain the tone and style (friendly, informative travel content)
    - Keep proper nouns (place names) in their commonly used form for the target language
    - For food items, use the local Thai name with explanation if needed
    - Be culturally appropriate for ${this.languageNames[targetLang]} speakers
    
    Text to translate:
    "${text}"
    
    Return JSON with the translation:
    {
      "translation": "The translated text here"
    }`;

    const response = await this.openaiClient.makeOpenAICall(prompt, 1000);
    
    if (response.error || response.fallback) {
      console.error(`Translation failed for ${targetLang}:`, response.message);
      return text; // Return original text as fallback
    }

    // Extract translation from response
    if (typeof response === 'string') {
      return response;
    } else if (response.translation) {
      return response.translation;
    } else if (response.text) {
      return response.text;
    }
    
    return text; // Fallback to original
  }

  // Translate city basic info
  async translateCityBasics(citySlug) {
    console.log(`\n🌐 Translating city basics for: ${citySlug}`);
    
    try {
      // Read enhanced city data
      const cityPath = path.join(__dirname, '..', 'data', 'enhanced', `${citySlug}.json`);
      const cityData = JSON.parse(await fs.readFile(cityPath, 'utf8'));
      
      // Create translations object
      const translations = {
        name: { en: cityData.name.en },
        description: { en: cityData.description.en },
        highlights: { en: cityData.highlights }
      };

      // Translate to each language
      for (const lang of this.languages) {
        console.log(`  📝 Translating to ${this.languageNames[lang]}...`);
        
        // Translate description
        translations.description[lang] = await this.translateText(
          cityData.description.en,
          lang,
          `City description for ${cityData.name.en}, a ${cityData.region} Thailand destination`
        );

        // Translate highlights
        translations.highlights[lang] = [];
        for (const highlight of cityData.highlights) {
          const translated = await this.translateText(
            highlight,
            lang,
            `Tourist highlight for ${cityData.name.en}`
          );
          translations.highlights[lang].push(translated);
        }

        // City names - use common translations
        translations.name[lang] = await this.getCityNameTranslation(cityData.name.en, lang);
        
        // Small delay to respect rate limits
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      // Save translations
      const translationPath = path.join(__dirname, '..', 'translations', 'cities', `${citySlug}.json`);
      await fs.mkdir(path.dirname(translationPath), { recursive: true });
      await fs.writeFile(translationPath, JSON.stringify(translations, null, 2));
      
      console.log(`  ✅ Saved translations for ${citySlug}`);
      return translations;

    } catch (error) {
      console.error(`  ❌ Error translating ${citySlug}:`, error.message);
      return null;
    }
  }

  // Get standard city name translations
  async getCityNameTranslation(cityName, lang) {
    const cityNames = {
      'Bangkok': {
        zh: '曼谷',
        de: 'Bangkok',
        fr: 'Bangkok',
        ru: 'Бангкок',
        ja: 'バンコク',
        ko: '방콕'
      },
      'Chiang Mai': {
        zh: '清迈',
        de: 'Chiang Mai',
        fr: 'Chiang Mai',
        ru: 'Чиангмай',
        ja: 'チェンマイ',
        ko: '치앙마이'
      },
      'Phuket': {
        zh: '普吉岛',
        de: 'Phuket',
        fr: 'Phuket',
        ru: 'Пхукет',
        ja: 'プーケット',
        ko: '푸켓'
      },
      'Pattaya': {
        zh: '芭提雅',
        de: 'Pattaya',
        fr: 'Pattaya',
        ru: 'Паттайя',
        ja: 'パタヤ',
        ko: '파타야'
      },
      'Krabi': {
        zh: '甲米',
        de: 'Krabi',
        fr: 'Krabi',
        ru: 'Краби',
        ja: 'クラビ',
        ko: '끄라비'
      },
      'Ayutthaya': {
        zh: '大城',
        de: 'Ayutthaya',
        fr: 'Ayutthaya',
        ru: 'Аюттхая',
        ja: 'アユタヤ',
        ko: '아유타야'
      },
      'Chiang Rai': {
        zh: '清莱',
        de: 'Chiang Rai',
        fr: 'Chiang Rai',
        ru: 'Чианграй',
        ja: 'チェンライ',
        ko: '치앙라이'
      },
      'Hat Yai': {
        zh: '合艾',
        de: 'Hat Yai',
        fr: 'Hat Yai',
        ru: 'Хатъяй',
        ja: 'ハートヤイ',
        ko: '핫야이'
      },
      'Sukhothai': {
        zh: '素可泰',
        de: 'Sukhothai',
        fr: 'Sukhothai',
        ru: 'Сукхотай',
        ja: 'スコータイ',
        ko: '수코타이'
      },
      'Surat Thani': {
        zh: '素叻他尼',
        de: 'Surat Thani',
        fr: 'Surat Thani',
        ru: 'Сураттхани',
        ja: 'スラートターニー',
        ko: '수랏타니'
      }
    };

    return cityNames[cityName]?.[lang] || cityName;
  }

  // Translate food items
  async translateFood(foodSlug) {
    console.log(`\n🍜 Translating food: ${foodSlug}`);
    
    try {
      // Read enhanced food data
      const foodPath = path.join(__dirname, '..', 'data', 'enhanced', 'food', `${foodSlug}.json`);
      const foodData = JSON.parse(await fs.readFile(foodPath, 'utf8'));
      
      // Create translations object
      const translations = {
        name: { 
          en: foodData.name.en,
          th: foodData.name.th // Keep Thai name
        },
        description: { en: foodData.description.en },
        ingredients: { en: foodData.ingredients }
      };

      // Translate to each language
      for (const lang of this.languages) {
        console.log(`  📝 Translating to ${this.languageNames[lang]}...`);
        
        // For food names, keep Thai name but add translated explanation
        const namePrompt = `Translate this Thai food name and description to ${this.languageNames[lang]}: 
        "${foodData.name.en}" (Thai: ${foodData.name.th})
        Keep the Thai name but add a short description of what it is.`;
        
        translations.name[lang] = await this.translateText(
          foodData.name.en,
          lang,
          'Thai food dish name - keep recognizable'
        );

        // Translate description
        translations.description[lang] = await this.translateText(
          foodData.description.en,
          lang,
          `Description of Thai dish ${foodData.name.en}`
        );

        // Translate ingredients
        translations.ingredients[lang] = [];
        for (const ingredient of foodData.ingredients) {
          const translated = await this.translateText(
            ingredient,
            lang,
            'Food ingredient'
          );
          translations.ingredients[lang].push(translated);
        }
        
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      // Save translations
      const translationPath = path.join(__dirname, '..', 'translations', 'food', `${foodSlug}.json`);
      await fs.mkdir(path.dirname(translationPath), { recursive: true });
      await fs.writeFile(translationPath, JSON.stringify(translations, null, 2));
      
      console.log(`  ✅ Saved translations for ${foodSlug}`);
      return translations;

    } catch (error) {
      console.error(`  ❌ Error translating ${foodSlug}:`, error.message);
      return null;
    }
  }

  // Main translation runner
  async translateBatch(type = 'cities', limit = 3) {
    console.log(`\n🚀 Starting batch translation for ${type} (limit: ${limit})`);
    
    if (type === 'cities') {
      const cities = ['bangkok', 'chiang-mai', 'phuket'].slice(0, limit);
      
      for (const city of cities) {
        await this.translateCityBasics(city);
        console.log(`  ⏱️  Waiting 2 seconds before next city...`);
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
    
    if (type === 'food') {
      const foods = ['pad-thai', 'tom-yum-goong', 'green-curry'].slice(0, limit);
      
      for (const food of foods) {
        await this.translateFood(food);
        console.log(`  ⏱️  Waiting 2 seconds before next dish...`);
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
    
    console.log('\n✨ Batch translation complete!');
  }
}

// CLI usage
if (require.main === module) {
  const translator = new ContentTranslator();
  const args = process.argv.slice(2);
  
  const command = args[0] || 'help';
  const type = args[1] || 'cities';
  const limit = parseInt(args[2]) || 3;
  
  const commands = {
    help: () => {
      console.log(`
Go2Thailand Content Translator
==============================

Usage:
  node translate-content.js batch [type] [limit]  - Translate content in batches
  node translate-content.js city [slug]           - Translate single city
  node translate-content.js food [slug]           - Translate single food item
  
Examples:
  node translate-content.js batch cities 3        - Translate 3 cities
  node translate-content.js batch food 5          - Translate 5 food items
  node translate-content.js city bangkok          - Translate Bangkok only
  node translate-content.js food pad-thai         - Translate Pad Thai only
      `);
    },
    
    batch: async () => {
      await translator.translateBatch(type, limit);
    },
    
    city: async () => {
      const citySlug = type; // Second argument is city slug
      await translator.translateCityBasics(citySlug);
    },
    
    food: async () => {
      const foodSlug = type; // Second argument is food slug
      await translator.translateFood(foodSlug);
    }
  };
  
  const handler = commands[command] || commands.help;
  
  if (command === 'help') {
    handler();
  } else {
    handler().catch(console.error);
  }
}

module.exports = ContentTranslator;