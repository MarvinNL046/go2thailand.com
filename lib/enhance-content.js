require('dotenv').config({ path: '.env.local' });
const ContentEnhancer = require('./ai/content-enhancer');
const { getAllCities } = require('./cities');

class ContentEnhancementRunner {
  constructor() {
    this.enhancer = new ContentEnhancer();
  }

  async runFullEnhancement() {
    console.log('🚀 Starting Go2Thailand Content Enhancement...\n');
    
    // Check if OpenAI API key is set
    if (!process.env.OPENAI_API_KEY) {
      console.log('⚠️  No OpenAI API key found. Set OPENAI_API_KEY in .env.local');
      console.log('📝 Content will be generated with fallback data only.\n');
    }

    const startTime = Date.now();
    const results = {
      cities_enhanced: 0,
      top10_generated: 0,
      guides_generated: 0,
      errors: []
    };

    try {
      // Step 1: Enhance all cities
      console.log('📍 Step 1: Enhancing city data...');
      const cityResults = await this.enhancer.enhanceAllCities();
      results.cities_enhanced = cityResults.enhanced + cityResults.cached;
      
      // Step 2: Generate top-10 content
      console.log('\n🔟 Step 2: Generating top-10 content...');
      const categories = ['attractions', 'restaurants', 'hotels'];
      const cities = getAllCities();
      
      for (const city of cities) {
        for (const category of categories) {
          try {
            await this.enhancer.generateTop10(city.slug, category);
            results.top10_generated++;
            
            // Brief delay
            await new Promise(resolve => setTimeout(resolve, 300));
          } catch (error) {
            console.error(`❌ Failed top-10 ${category} for ${city.slug}:`, error.message);
            results.errors.push(`Top-10 ${category} for ${city.slug}: ${error.message}`);
          }
        }
      }

      // Step 3: Generate travel guides
      console.log('\n📖 Step 3: Generating travel guides...');
      const guideTypes = ['budget', 'luxury', 'family', 'solo'];
      
      for (const city of cities) {
        for (const guideType of guideTypes) {
          try {
            await this.enhancer.generateGuide(city.slug, guideType);
            results.guides_generated++;
            
            // Brief delay
            await new Promise(resolve => setTimeout(resolve, 300));
          } catch (error) {
            console.error(`❌ Failed ${guideType} guide for ${city.slug}:`, error.message);
            results.errors.push(`${guideType} guide for ${city.slug}: ${error.message}`);
          }
        }
      }

      // Final results
      const duration = ((Date.now() - startTime) / 1000 / 60).toFixed(2);
      
      console.log('\n🎉 Content Enhancement Complete!');
      console.log('=====================================');
      console.log(`⏱️  Duration: ${duration} minutes`);
      console.log(`📍 Cities Enhanced: ${results.cities_enhanced}`);
      console.log(`🔟 Top-10 Content: ${results.top10_generated}`);
      console.log(`📖 Travel Guides: ${results.guides_generated}`);
      console.log(`❌ Errors: ${results.errors.length}`);
      
      if (results.errors.length > 0) {
        console.log('\n❌ Errors encountered:');
        results.errors.forEach((error, index) => {
          console.log(`   ${index + 1}. ${error}`);
        });
      }

      // Calculate expected pages
      const expectedPages = this.calculateExpectedPages(cities.length);
      console.log(`\n📊 Expected Total Pages: ${expectedPages}`);
      console.log('   - Original city pages: 44');
      console.log(`   - Top-10 pages: ${cities.length * categories.length} (${categories.length} categories × ${cities.length} cities)`);
      console.log(`   - Guide pages: ${cities.length * guideTypes.length} (${guideTypes.length} types × ${cities.length} cities)`);
      console.log('   - Homepage & index pages: ~6');
      
      return results;
      
    } catch (error) {
      console.error('💥 Fatal error during enhancement:', error);
      throw error;
    }
  }

  // Quick enhancement - just enhance cities, no top-10 or guides
  async runQuickEnhancement() {
    console.log('⚡ Starting Quick Enhancement (cities only)...\n');
    
    try {
      const results = await this.enhancer.enhanceAllCities();
      console.log('\n⚡ Quick Enhancement Complete!');
      console.log(`📍 Cities Enhanced/Cached: ${results.enhanced + results.cached}`);
      console.log(`❌ Errors: ${results.errors}`);
      
      return results;
    } catch (error) {
      console.error('💥 Error during quick enhancement:', error);
      throw error;
    }
  }

  // Generate specific content
  async generateSpecific(type, citySlug, category) {
    console.log(`🎯 Generating ${type} content for ${citySlug}...`);
    
    try {
      let result;
      
      switch (type) {
        case 'city':
          result = await this.enhancer.enhanceCity(citySlug);
          break;
        case 'top10':
          result = await this.enhancer.generateTop10(citySlug, category);
          break;
        case 'guide':
          result = await this.enhancer.generateGuide(citySlug, category);
          break;
        default:
          throw new Error(`Unknown type: ${type}`);
      }
      
      console.log(`✅ Generated ${type} content successfully`);
      return result;
      
    } catch (error) {
      console.error(`❌ Error generating ${type} content:`, error);
      throw error;
    }
  }

  // Get cache statistics
  async getCacheStats() {
    const stats = this.enhancer.cache.getCacheStats();
    
    console.log('📊 Cache Statistics:');
    console.log('===================');
    console.log(`Total files: ${stats.total_files}`);
    console.log(`Total size: ${stats.total_size_mb}MB`);
    console.log(`Valid cache: ${stats.valid_cache}`);
    console.log(`Expired cache: ${stats.expired_cache}`);
    console.log('\nBy type:');
    
    Object.entries(stats.types).forEach(([type, count]) => {
      console.log(`   ${type}: ${count} files`);
    });
    
    return stats;
  }

  // Clear cache
  async clearCache(type = null) {
    const deleted = this.enhancer.cache.clearCache(type);
    console.log(`🗑️  Cleared ${deleted} cache files${type ? ` (type: ${type})` : ''}`);
    return deleted;
  }

  calculateExpectedPages(cityCount) {
    const originalPages = 44; // Current structure
    const top10Pages = cityCount * 3; // 3 categories per city
    const guidePages = cityCount * 4; // 4 guide types per city
    const indexPages = 6; // Homepage, city index, category indices
    
    return originalPages + top10Pages + guidePages + indexPages;
  }
}

// CLI interface
async function main() {
  const runner = new ContentEnhancementRunner();
  const args = process.argv.slice(2);
  const command = args[0];
  
  try {
    switch (command) {
      case 'full':
        await runner.runFullEnhancement();
        break;
        
      case 'quick':
        await runner.runQuickEnhancement();
        break;
        
      case 'city':
        if (!args[1]) {
          console.error('Usage: node enhance-content.js city <city-slug>');
          process.exit(1);
        }
        await runner.generateSpecific('city', args[1]);
        break;
        
      case 'top10':
        if (!args[1] || !args[2]) {
          console.error('Usage: node enhance-content.js top10 <city-slug> <category>');
          process.exit(1);
        }
        await runner.generateSpecific('top10', args[1], args[2]);
        break;
        
      case 'guide':
        if (!args[1] || !args[2]) {
          console.error('Usage: node enhance-content.js guide <city-slug> <guide-type>');
          process.exit(1);
        }
        await runner.generateSpecific('guide', args[1], args[2]);
        break;
        
      case 'stats':
        await runner.getCacheStats();
        break;
        
      case 'clear':
        await runner.clearCache(args[1]);
        break;
        
      default:
        console.log('Go2Thailand Content Enhancement Tool');
        console.log('====================================\n');
        console.log('Usage:');
        console.log('  node enhance-content.js full                    - Full enhancement (cities + top-10 + guides)');
        console.log('  node enhance-content.js quick                   - Quick enhancement (cities only)');
        console.log('  node enhance-content.js city <slug>             - Enhance specific city');
        console.log('  node enhance-content.js top10 <slug> <category> - Generate top-10 for city/category');
        console.log('  node enhance-content.js guide <slug> <type>     - Generate guide for city/type');
        console.log('  node enhance-content.js stats                   - Show cache statistics');
        console.log('  node enhance-content.js clear [type]            - Clear cache (optionally by type)');
        console.log('\nExamples:');
        console.log('  node enhance-content.js city bangkok');
        console.log('  node enhance-content.js top10 chiang-mai attractions');
        console.log('  node enhance-content.js guide phuket budget');
        console.log('  node enhance-content.js clear enhanced_city');
        break;
    }
  } catch (error) {
    console.error('💥 Command failed:', error.message);
    process.exit(1);
  }
}

// Export for programmatic use
module.exports = ContentEnhancementRunner;

// Run CLI if called directly
if (require.main === module) {
  main();
}
