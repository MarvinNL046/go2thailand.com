require('dotenv').config({ path: '.env.local' });
const ContentEnhancer = require('./lib/ai/content-enhancer');
const fs = require('fs');
const path = require('path');

async function testUniqueOpenings() {
  console.log('🧪 Testing unique openings with improved AI prompt...\n');
  
  const enhancer = new ContentEnhancer();
  const testCities = ['bangkok', 'chiang-mai', 'phuket']; // Test with 3 different cities
  
  console.log('🤖 API Key Status:', process.env.OPENAI_API_KEY ? '✅ Available' : '❌ Missing');
  console.log(`📋 Testing ${testCities.length} cities for unique openings\n`);
  
  const results = [];
  
  for (const citySlug of testCities) {
    try {
      console.log(`🚀 Testing ${citySlug}...`);
      
      // Force regeneration by clearing cache
      const cacheDir = path.join(__dirname, 'data', 'cache');
      const cacheFile = path.join(cacheDir, `enhanced_city_${citySlug}.json`);
      if (fs.existsSync(cacheFile)) {
        fs.unlinkSync(cacheFile);
        console.log(`   🗑️  Cleared cache for ${citySlug}`);
      }
      
      const enhanced = await enhancer.enhanceCity(citySlug);
      
      if (enhanced.enhanced_description) {
        const opening = enhanced.enhanced_description.substring(0, 100);
        console.log(`   📝 Opening: "${opening}..."`);
        console.log(`   🤖 AI Generated: ${enhanced.ai_generated ? '✅' : '❌'}\n`);
        
        results.push({
          city: citySlug,
          opening: opening,
          ai_generated: enhanced.ai_generated,
          has_picture_this: opening.toLowerCase().includes('picture this')
        });
      } else {
        console.log(`   ❌ No enhanced_description found\n`);
      }
      
      // Brief delay between calls
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error(`   ❌ Error testing ${citySlug}:`, error.message);
      results.push({
        city: citySlug,
        opening: 'ERROR',
        ai_generated: false,
        error: error.message
      });
    }
  }
  
  // Analysis
  console.log('\n📊 RESULTS ANALYSIS:');
  console.log('=' .repeat(60));
  
  let uniqueOpenings = 0;
  let templateUsage = 0;
  let aiGenerated = 0;
  
  results.forEach(result => {
    if (result.opening !== 'ERROR') {
      if (result.ai_generated) aiGenerated++;
      if (result.has_picture_this) {
        templateUsage++;
        console.log(`❌ ${result.city}: Still using "Picture this" template`);
      } else {
        uniqueOpenings++;
        console.log(`✅ ${result.city}: Unique opening - "${result.opening}..."`);
      }
    }
  });
  
  console.log('\n📈 SUMMARY:');
  console.log(`   ✅ Unique openings: ${uniqueOpenings}/${testCities.length}`);
  console.log(`   ❌ Template usage: ${templateUsage}/${testCities.length}`);
  console.log(`   🤖 AI generated: ${aiGenerated}/${testCities.length}`);
  
  if (templateUsage === 0) {
    console.log('\n🎉 SUCCESS: All cities have unique openings!');
    console.log('💡 The improved AI prompt is working correctly.');
  } else {
    console.log('\n⚠️  WARNING: Some cities still use templates.');
    console.log('🔧 May need further prompt refinement.');
  }
  
  return results;
}

// Run the test
if (require.main === module) {
  testUniqueOpenings()
    .then(() => {
      console.log('\n✅ Test completed!');
      process.exit(0);
    })
    .catch(error => {
      console.error('\n❌ Test failed:', error);
      process.exit(1);
    });
}

module.exports = { testUniqueOpenings };
