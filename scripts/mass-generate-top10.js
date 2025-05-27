#!/usr/bin/env node

/**
 * Mass Top 10 Content Generator
 * Generates all Top 10 guides for all cities and categories
 * 
 * Usage: node scripts/mass-generate-top10.js [options]
 * Options:
 *   --dry-run       Show what would be generated
 *   --category X    Only generate specific category
 *   --city X        Only generate specific city
 *   --skip-existing Skip cities that already have content
 */

const ContentEnhancer = require('../lib/ai/content-enhancer');
const { getAllCities } = require('../lib/cities');
const fs = require('fs');
const path = require('path');

class MassTop10Generator {
  constructor() {
    this.enhancer = new ContentEnhancer();
    this.categories = ['restaurants', 'hotels', 'attractions'];
    this.cities = getAllCities();
    this.results = {
      successful: [],
      failed: [],
      skipped: [],
      total: 0,
      startTime: Date.now()
    };
  }

  // Parse command line arguments
  parseArguments() {
    const args = process.argv.slice(2);
    
    return {
      isDryRun: args.includes('--dry-run'),
      specificCategory: this.extractFlag(args, '--category'),
      specificCity: this.extractFlag(args, '--city'),
      skipExisting: args.includes('--skip-existing')
    };
  }

  // Extract flag value from arguments
  extractFlag(args, flag) {
    const flagIndex = args.indexOf(flag);
    return flagIndex !== -1 && flagIndex + 1 < args.length ? args[flagIndex + 1] : null;
  }

  // Check if content already exists
  contentExists(citySlug, category) {
    const filePath = path.join(process.cwd(), 'data', 'top10', `${citySlug}-${category}.json`);
    return fs.existsSync(filePath);
  }

  // Show generation plan
  showGenerationPlan(options) {
    const cities = options.specificCity ? 
      this.cities.filter(city => city.slug === options.specificCity) : 
      this.cities;
    
    const categories = options.specificCategory ? 
      [options.specificCategory] : 
      this.categories;

    console.log(`🚀 MASS TOP 10 CONTENT GENERATION PLAN\n`);
    console.log(`📊 SCOPE:`);
    console.log(`   Cities: ${cities.length} (${cities.map(c => c.name.en).join(', ')})`);
    console.log(`   Categories: ${categories.length} (${categories.join(', ')})`);
    console.log(`   Total guides to generate: ${cities.length * categories.length}\n`);

    if (options.skipExisting) {
      let existingCount = 0;
      cities.forEach(city => {
        categories.forEach(category => {
          if (this.contentExists(city.slug, category)) existingCount++;
        });
      });
      console.log(`   Existing content: ${existingCount} (will be skipped)`);
      console.log(`   New content: ${(cities.length * categories.length) - existingCount}\n`);
    }

    console.log(`⚡ GENERATION METHOD:`);
    console.log(`   1. Perplexity API → Current 2025 data`);
    console.log(`   2. OpenAI GPT-4o Mini → Storytelling`);
    console.log(`   3. JSON output → Website ready\n`);

    console.log(`💰 ESTIMATED COSTS:`);
    console.log(`   Per guide: ~$0.0025`);
    console.log(`   Total: ~$${((cities.length * categories.length) * 0.0025).toFixed(3)}\n`);

    if (options.isDryRun) {
      console.log(`🔍 DRY RUN MODE - No actual generation will occur\n`);
    }
  }

  // Generate single content piece
  async generateContent(citySlug, category) {
    const city = this.cities.find(c => c.slug === citySlug);
    const startTime = Date.now();

    try {
      console.log(`\n🔄 Generating: ${city.name.en} ${category}...`);
      
      const result = await this.enhancer.generateTop10WithPerplexity(citySlug, category);
      
      const duration = Math.round((Date.now() - startTime) / 1000);
      console.log(`✅ Success! (${duration}s) - ${result.title}`);
      
      this.results.successful.push({
        city: city.name.en,
        citySlug,
        category,
        duration,
        title: result.title,
        itemCount: result.items?.length || 0,
        hybrid: result.hybrid,
        dataSource: result.data_sources?.join(', ') || 'OpenAI'
      });

      return result;

    } catch (error) {
      const duration = Math.round((Date.now() - startTime) / 1000);
      console.log(`❌ Failed! (${duration}s) - ${error.message}`);
      
      this.results.failed.push({
        city: city.name.en,
        citySlug,
        category,
        duration,
        error: error.message
      });
      
      throw error;
    }
  }

  // Run mass generation
  async runGeneration(options) {
    const cities = options.specificCity ? 
      this.cities.filter(city => city.slug === options.specificCity) : 
      this.cities;
    
    const categories = options.specificCategory ? 
      [options.specificCategory] : 
      this.categories;

    console.log(`🚀 STARTING MASS GENERATION\n`);
    console.log(`Total guides to process: ${cities.length * categories.length}`);
    console.log(`Estimated time: ${Math.round((cities.length * categories.length * 30) / 60)} minutes\n`);

    let processed = 0;
    this.results.total = cities.length * categories.length;

    // Process each city
    for (const city of cities) {
      console.log(`\n📍 PROCESSING CITY: ${city.name.en.toUpperCase()} (${city.slug})`);
      console.log(`━`.repeat(50));

      // Process each category for this city
      for (const category of categories) {
        processed++;

        // Check if content already exists
        if (options.skipExisting && this.contentExists(city.slug, category)) {
          console.log(`⏭️  Skipping ${city.name.en} ${category} - already exists`);
          this.results.skipped.push({
            city: city.name.en,
            citySlug: city.slug,
            category,
            reason: 'Already exists'
          });
          continue;
        }

        console.log(`\n[${processed}/${this.results.total}] Processing ${category}...`);

        try {
          if (!options.isDryRun) {
            await this.generateContent(city.slug, category);
            // Small delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 1000));
          } else {
            console.log(`🔍 DRY RUN: Would generate ${city.name.en} ${category}`);
          }
        } catch (error) {
          console.log(`❌ Failed to generate ${city.name.en} ${category}: ${error.message}`);
          // Continue with next item instead of stopping
        }
      }
    }
  }

  // Show final results
  showResults() {
    const totalDuration = Math.round((Date.now() - this.results.startTime) / 1000);
    
    console.log(`\n🎉 MASS GENERATION COMPLETE!`);
    console.log(`═`.repeat(60));
    console.log(`\n📊 FINAL STATISTICS:`);
    console.log(`   Total time: ${Math.floor(totalDuration / 60)}m ${totalDuration % 60}s`);
    console.log(`   Successful: ${this.results.successful.length}`);
    console.log(`   Failed: ${this.results.failed.length}`);
    console.log(`   Skipped: ${this.results.skipped.length}`);
    console.log(`   Total processed: ${this.results.total}\n`);

    if (this.results.successful.length > 0) {
      console.log(`✅ SUCCESSFUL GENERATIONS:`);
      this.results.successful.forEach(item => {
        console.log(`   🍽️ ${item.city} ${item.category} - ${item.itemCount} items (${item.duration}s)`);
      });
      console.log('');
    }

    if (this.results.failed.length > 0) {
      console.log(`❌ FAILED GENERATIONS:`);
      this.results.failed.forEach(item => {
        console.log(`   💥 ${item.city} ${item.category} - ${item.error}`);
      });
      console.log('');
    }

    if (this.results.skipped.length > 0) {
      console.log(`⏭️  SKIPPED:`);
      this.results.skipped.forEach(item => {
        console.log(`   ⏩ ${item.city} ${item.category} - ${item.reason}`);
      });
      console.log('');
    }

    // Cost calculation
    const actualCost = this.results.successful.length * 0.0025;
    console.log(`💰 ESTIMATED COSTS:`);
    console.log(`   Generated: ${this.results.successful.length} guides × $0.0025 = $${actualCost.toFixed(4)}`);
    console.log(`   Cost per minute: $${(actualCost / (totalDuration / 60)).toFixed(4)}\n`);

    // Show next steps
    console.log(`🚀 NEXT STEPS:`);
    console.log(`   1. Check generated content in data/top10/`);
    console.log(`   2. Test the new Top 10 pages on website`);
    console.log(`   3. Update sitemap if needed`);
    console.log(`   4. Deploy to production!\n`);

    if (this.results.failed.length > 0) {
      console.log(`🔄 TO RETRY FAILED ITEMS:`);
      this.results.failed.forEach(item => {
        console.log(`   node scripts/refresh-top10.js ${item.citySlug} ${item.category}`);
      });
    }
  }

  // Show usage instructions
  showUsage() {
    console.log(`
🚀 Mass Top 10 Content Generator

USAGE:
  node scripts/mass-generate-top10.js [options]

OPTIONS:
  --dry-run           Show what would be generated without doing it
  --category X        Only generate specific category (restaurants/hotels/attractions)
  --city X            Only generate specific city (bangkok, phuket, etc.)
  --skip-existing     Skip cities that already have content files

EXAMPLES:
  node scripts/mass-generate-top10.js
    → Generate ALL content for ALL cities

  node scripts/mass-generate-top10.js --dry-run
    → Show generation plan without executing

  node scripts/mass-generate-top10.js --category restaurants
    → Only generate restaurant guides for all cities

  node scripts/mass-generate-top10.js --city bangkok
    → Only generate all categories for Bangkok

  node scripts/mass-generate-top10.js --skip-existing
    → Skip cities that already have content

AVAILABLE CITIES:
  ${this.cities.map(c => c.slug).join(', ')}

CATEGORIES:
  ${this.categories.join(', ')}
`);
  }

  // Main execution function
  async run() {
    const options = this.parseArguments();

    // Validate arguments
    if (options.specificCategory && !this.categories.includes(options.specificCategory)) {
      console.error(`❌ Invalid category: ${options.specificCategory}`);
      console.error(`Available: ${this.categories.join(', ')}`);
      process.exit(1);
    }

    if (options.specificCity && !this.cities.find(c => c.slug === options.specificCity)) {
      console.error(`❌ Invalid city: ${options.specificCity}`);
      console.error(`Available: ${this.cities.map(c => c.slug).join(', ')}`);
      process.exit(1);
    }

    // Show help if no valid arguments
    if (process.argv.length === 2) {
      this.showUsage();
      return;
    }

    try {
      this.showGenerationPlan(options);
      
      if (options.isDryRun) {
        console.log(`✨ Dry run complete! Remove --dry-run to execute.`);
        return;
      }

      // Confirm before proceeding
      console.log(`⚠️  This will generate content using Perplexity and OpenAI APIs.`);
      console.log(`Continue? Press Ctrl+C to cancel, Enter to proceed...`);
      
      // Wait for user confirmation in non-dry-run mode
      process.stdin.setRawMode(true);
      process.stdin.resume();
      await new Promise(resolve => {
        process.stdin.once('data', () => {
          process.stdin.setRawMode(false);
          process.stdin.pause();
          resolve();
        });
      });

      await this.runGeneration(options);
      this.showResults();
      
    } catch (error) {
      console.error(`\n💥 Fatal error:`, error.message);
      process.exit(1);
    }
  }
}

// CLI execution
if (require.main === module) {
  const generator = new MassTop10Generator();
  generator.run();
}

module.exports = MassTop10Generator;
