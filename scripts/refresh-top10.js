#!/usr/bin/env node

const ContentEnhancer = require('../lib/ai/content-enhancer');
const { getAllCities, getCityBySlug } = require('../lib/cities');

class Top10Refresher {
  constructor() {
    this.enhancer = new ContentEnhancer();
    this.validCategories = ['restaurants', 'hotels', 'attractions'];
  }

  // Parse and validate command line arguments
  parseArguments() {
    const args = process.argv.slice(2);
    
    if (args.length < 2) {
      this.showUsage();
      process.exit(1);
    }

    const citySlug = args[0].toLowerCase();
    const category = args[1].toLowerCase();
    const isDryRun = args.includes('--dry-run') || args.includes('-d');
    const usePerplexity = !args.includes('--openai-only');

    return { citySlug, category, isDryRun, usePerplexity };
  }

  // Show usage instructions
  showUsage() {
    console.log(`
🔄 Top 10 Content Refresher

USAGE:
  node scripts/refresh-top10.js <city> <category> [options]

ARGUMENTS:
  city      City slug (e.g., bangkok, phuket, chiang-mai)
  category  Content category (restaurants, hotels, attractions)

OPTIONS:
  --dry-run       Show what would be generated without actually doing it
  --openai-only   Skip Perplexity, use OpenAI only (faster, less current)

EXAMPLES:
  node scripts/refresh-top10.js bangkok restaurants
  node scripts/refresh-top10.js phuket hotels --dry-run
  node scripts/refresh-top10.js chiang-mai attractions --openai-only

AVAILABLE CITIES:
  ${this.getAvailableCities().join(', ')}

CATEGORIES:
  ${this.validCategories.join(', ')}
`);
  }

  // Get list of available cities
  getAvailableCities() {
    try {
      return getAllCities().map(city => city.slug);
    } catch (error) {
      return ['bangkok', 'phuket', 'chiang-mai', '...']; // fallback
    }
  }

  // Validate arguments
  validateArguments(citySlug, category) {
    // Check if city exists
    const city = getCityBySlug(citySlug);
    if (!city) {
      console.error(`❌ Error: City '${citySlug}' not found.`);
      console.error(`Available cities: ${this.getAvailableCities().join(', ')}`);
      return false;
    }

    // Check if category is valid
    if (!this.validCategories.includes(category)) {
      console.error(`❌ Error: Category '${category}' not valid.`);
      console.error(`Available categories: ${this.validCategories.join(', ')}`);
      return false;
    }

    return true;
  }

  // Show what would be generated (dry run)
  async showDryRun(citySlug, category, usePerplexity) {
    const city = getCityBySlug(citySlug);
    
    console.log(`🔍 DRY RUN MODE - No actual generation will occur\n`);
    console.log(`📍 City: ${city.name.en} (${citySlug})`);
    console.log(`📂 Category: ${category}`);
    console.log(`🤖 Method: ${usePerplexity ? 'Perplexity + OpenAI (Hybrid)' : 'OpenAI Only'}`);
    console.log(`📁 Output: data/top10/${citySlug}-${category}.json\n`);

    if (usePerplexity) {
      console.log(`🔍 Perplexity Query Preview:`);
      console.log(`   "${this.enhancer.perplexity.getQueryTemplate(city.name.en, category)}"\n`);
      console.log(`⚡ Process:`);
      console.log(`   1. Query Perplexity for current ${category} data`);
      console.log(`   2. Process with OpenAI for storytelling`);
      console.log(`   3. Merge and structure content`);
      console.log(`   4. Save to JSON file`);
    } else {
      console.log(`⚡ Process:`);
      console.log(`   1. Generate with OpenAI only`);
      console.log(`   2. Use existing templates and fallbacks`);
      console.log(`   3. Save to JSON file`);
    }

    console.log(`\n💡 To execute: Remove --dry-run flag`);
  }

  // Perform the actual refresh
  async performRefresh(citySlug, category, usePerplexity) {
    const city = getCityBySlug(citySlug);
    
    console.log(`🚀 REFRESHING TOP 10 CONTENT\n`);
    console.log(`📍 City: ${city.name.en} (${citySlug})`);
    console.log(`📂 Category: ${category}`);
    console.log(`🤖 Method: ${usePerplexity ? 'Perplexity + OpenAI (Hybrid)' : 'OpenAI Only'}\n`);

    const startTime = Date.now();

    try {
      let result;
      
      if (usePerplexity) {
        console.log(`🔄 Generating with Perplexity + OpenAI hybrid approach...`);
        result = await this.enhancer.generateTop10WithPerplexity(citySlug, category);
      } else {
        console.log(`🔄 Generating with OpenAI only...`);
        result = await this.enhancer.generateTop10(citySlug, category);
      }

      const duration = Math.round((Date.now() - startTime) / 1000);
      
      console.log(`\n✅ SUCCESS! Generated in ${duration}s`);
      console.log(`📄 Title: ${result.title || `Top 10 ${category} in ${city.name.en}`}`);
      console.log(`📊 Items: ${result.items ? result.items.length : 0}`);
      console.log(`🔗 Data sources: ${result.data_sources ? result.data_sources.join(', ') : 'OpenAI'}`);
      console.log(`💾 Saved to: data/top10/${citySlug}-${category}.json`);
      
      if (result.hybrid) {
        console.log(`🔄 Hybrid generation: ${result.ai_generated ? 'Success' : 'Fallback used'}`);
      }

      return result;

    } catch (error) {
      console.error(`\n❌ GENERATION FAILED:`);
      console.error(`   Error: ${error.message}`);
      console.error(`   Duration: ${Math.round((Date.now() - startTime) / 1000)}s`);
      throw error;
    }
  }

  // Main execution function
  async run() {
    console.log(`🔄 Top 10 Content Refresher\n`);

    const { citySlug, category, isDryRun, usePerplexity } = this.parseArguments();

    if (!this.validateArguments(citySlug, category)) {
      process.exit(1);
    }

    try {
      if (isDryRun) {
        await this.showDryRun(citySlug, category, usePerplexity);
      } else {
        await this.performRefresh(citySlug, category, usePerplexity);
      }
      
      console.log(`\n✨ Complete!`);
      
    } catch (error) {
      console.error(`\n💥 Fatal error:`, error.message);
      process.exit(1);
    }
  }
}

// CLI execution
if (require.main === module) {
  const refresher = new Top10Refresher();
  refresher.run();
}

module.exports = Top10Refresher;
