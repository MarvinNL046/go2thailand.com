require('dotenv').config({ path: '.env.local' });
const ContentEnhancer = require('./lib/ai/content-enhancer');
const fs = require('fs');
const path = require('path');

async function regenerateAllCities() {
  console.log('🚀 REGENERATING ALL CITIES WITH IMPROVED AI PROMPT');
  console.log('🎯 Goal: Fix "Picture this" templates with unique openings\n');
  
  const enhancer = new ContentEnhancer();
  
  console.log('🤖 API Key Status:', process.env.OPENAI_API_KEY ? '✅ Available' : '❌ Missing');
  console.log('🔧 Using improved prompt with unique opening requirements\n');
  
  // Clear all cached cities to force regeneration
  const cacheDir = path.join(__dirname, 'data', 'cache');
  const enhancedDir = path.join(__dirname, 'data', 'enhanced');
  
  console.log('🗑️  Clearing caches to force regeneration...');
  if (fs.existsSync(cacheDir)) {
    const cacheFiles = fs.readdirSync(cacheDir).filter(f => f.startsWith('enhanced_city_'));
    cacheFiles.forEach(file => {
      fs.unlinkSync(path.join(cacheDir, file));
      console.log(`   🗑️  Deleted cache: ${file}`);
    });
  }
  
  console.log('\n🚀 Starting full regeneration...\n');
  
  try {
    const results = await enhancer.enhanceAllCities();
    
    console.log('\n📊 REGENERATION RESULTS:');
    console.log('=' .repeat(60));
    console.log(`✅ Enhanced: ${results.enhanced}`);
    console.log(`📋 Cached: ${results.cached}`);
    console.log(`❌ Errors: ${results.errors}`);
    console.log(`📊 Total: ${results.total}`);
    
    // Verify unique openings
    console.log('\n🔍 VERIFYING UNIQUE OPENINGS:');
    console.log('=' .repeat(60));
    
    let uniqueCount = 0;
    let templateCount = 0;
    
    if (fs.existsSync(enhancedDir)) {
      const enhancedFiles = fs.readdirSync(enhancedDir).filter(f => f.endsWith('.json') && !f.includes('attractions'));
      
      for (const file of enhancedFiles) {
        try {
          const cityData = JSON.parse(fs.readFileSync(path.join(enhancedDir, file), 'utf8'));
          const cityName = cityData.slug || file.replace('.json', '');
          
          if (cityData.enhanced_description) {
            const opening = cityData.enhanced_description.substring(0, 80);
            const hasTemplate = opening.toLowerCase().includes('picture this');
            
            if (hasTemplate) {
              templateCount++;
              console.log(`❌ ${cityName}: Still using template - "${opening}..."`);
            } else {
              uniqueCount++;
              console.log(`✅ ${cityName}: Unique opening - "${opening}..."`);
            }
          }
        } catch (error) {
          console.log(`⚠️  ${file}: Could not verify opening`);
        }
      }
    }
    
    console.log('\n📈 UNIQUENESS ANALYSIS:');
    console.log(`✅ Unique openings: ${uniqueCount}`);
    console.log(`❌ Template usage: ${templateCount}`);
    console.log(`📊 Success rate: ${uniqueCount}/${uniqueCount + templateCount} (${Math.round((uniqueCount/(uniqueCount + templateCount)) * 100)}%)`);
    
    if (templateCount === 0) {
      console.log('\n🎉 PERFECT SUCCESS!');
      console.log('🎯 All cities now have unique, engaging openings!');
      console.log('✨ No more "Picture this" templates!');
      console.log('🚀 Ready to commit and deploy improved content!');
    } else {
      console.log('\n⚠️  SOME TEMPLATES REMAIN');
      console.log('🔧 May need additional prompt refinement for remaining cities');
    }
    
    return results;
    
  } catch (error) {
    console.error('\n❌ REGENERATION FAILED:', error);
    throw error;
  }
}

// Run regeneration
if (require.main === module) {
  regenerateAllCities()
    .then(() => {
      console.log('\n✅ Regeneration completed successfully!');
      process.exit(0);
    })
    .catch(error => {
      console.error('\n💥 Regeneration failed:', error);
      process.exit(1);
    });
}

module.exports = { regenerateAllCities };
