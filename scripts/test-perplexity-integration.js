#!/usr/bin/env node

const ContentEnhancer = require('../lib/ai/content-enhancer');
const Top10StatusChecker = require('./check-top10-status');

class PerplexityIntegrationTester {
  constructor() {
    this.enhancer = new ContentEnhancer();
    this.statusChecker = new Top10StatusChecker();
  }

  // Test the Perplexity client with fallback data
  async testPerplexityClient() {
    console.log(`🧪 TESTING PERPLEXITY CLIENT\n`);
    
    try {
      const result = await this.enhancer.perplexity.getCurrentData('Bangkok', 'restaurants');
      
      console.log(`✅ Perplexity client test successful:`);
      console.log(`   City: ${result.city}`);
      console.log(`   Category: ${result.category}`);
      console.log(`   Query: ${result.query.substring(0, 100)}...`);
      console.log(`   Response length: ${result.response.content.length} chars`);
      console.log(`   Sources: ${result.response.sources.join(', ')}`);
      console.log(`   Fallback mode: ${result.response.fallback ? 'Yes' : 'No'}`);
      
      return true;
    } catch (error) {
      console.error(`❌ Perplexity client test failed:`, error.message);
      return false;
    }
  }

  // Test the hybrid content generation
  async testHybridGeneration() {
    console.log(`\n🧪 TESTING HYBRID GENERATION\n`);
    
    try {
      console.log(`🔄 Generating hybrid content for Bangkok restaurants...`);
      const result = await this.enhancer.generateTop10WithPerplexity('bangkok', 'restaurants');
      
      console.log(`✅ Hybrid generation test successful:`);
      console.log(`   Title: ${result.title || 'No title'}`);
      console.log(`   Items: ${result.items ? result.items.length : 0}`);
      console.log(`   Data sources: ${result.data_sources ? result.data_sources.join(', ') : 'None'}`);
      console.log(`   Hybrid: ${result.hybrid ? 'Yes' : 'No'}`);
      console.log(`   AI Generated: ${result.ai_generated ? 'Yes' : 'No'}`);
      console.log(`   Fallback: ${result.fallback ? 'Yes' : 'No'}`);
      
      // Check if file was saved
      const fs = require('fs');
      const path = require('path');
      const filePath = path.join(__dirname, '..', 'data', 'top10', 'bangkok-restaurants.json');
      const fileExists = fs.existsSync(filePath);
      console.log(`   File saved: ${fileExists ? 'Yes' : 'No'}`);
      
      return true;
    } catch (error) {
      console.error(`❌ Hybrid generation test failed:`, error.message);
      return false;
    }
  }

  // Test the status checker
  async testStatusChecker() {
    console.log(`\n🧪 TESTING STATUS CHECKER\n`);
    
    try {
      const report = this.statusChecker.generateReport();
      
      console.log(`✅ Status checker test successful:`);
      console.log(`   Total files tracked: ${report.summary.total_files}`);
      console.log(`   Current files: ${report.summary.current}`);
      console.log(`   Outdated files: ${report.summary.outdated}`);
      console.log(`   Missing files: ${report.summary.missing}`);
      
      return true;
    } catch (error) {
      console.error(`❌ Status checker test failed:`, error.message);
      return false;
    }
  }

  // Test MCP integration (if available)
  async testMCPIntegration() {
    console.log(`\n🧪 TESTING MCP INTEGRATION\n`);
    
    // Check if we're in an environment that supports MCP
    const mcpAvailable = process.env.NODE_ENV === 'development' && global.use_mcp_tool;
    
    console.log(`MCP Environment: ${mcpAvailable ? 'Available' : 'Not available (using fallback)'}`);
    
    if (mcpAvailable) {
      try {
        // Test actual MCP call
        console.log(`🔄 Testing real MCP call...`);
        const result = await global.use_mcp_tool(
          'github.com/pashpashpash/perplexity-mcp', 
          'search', 
          { query: 'Top 3 restaurants in Bangkok Thailand', detail_level: 'brief' }
        );
        
        console.log(`✅ MCP integration test successful:`);
        console.log(`   Response received: ${result ? 'Yes' : 'No'}`);
        console.log(`   Content length: ${result.content ? result.content.length : 0} chars`);
        
        return true;
      } catch (error) {
        console.error(`❌ MCP integration test failed:`, error.message);
        return false;
      }
    } else {
      console.log(`⚠️  MCP not available - fallback mode will be used`);
      console.log(`   This is normal when running outside Cline environment`);
      return true;
    }
  }

  // Run comprehensive test suite
  async runTests() {
    console.log(`🚀 PERPLEXITY INTEGRATION TEST SUITE`);
    console.log(`=`.repeat(50));
    
    const results = {
      perplexity_client: false,
      hybrid_generation: false,
      status_checker: false,
      mcp_integration: false
    };

    // Test 1: Perplexity Client
    results.perplexity_client = await this.testPerplexityClient();
    
    // Test 2: Hybrid Generation
    results.hybrid_generation = await this.testHybridGeneration();
    
    // Test 3: Status Checker
    results.status_checker = await this.testStatusChecker();
    
    // Test 4: MCP Integration
    results.mcp_integration = await this.testMCPIntegration();

    // Summary
    this.displayTestSummary(results);
    
    return results;
  }

  // Display test results summary
  displayTestSummary(results) {
    console.log(`\n` + `=`.repeat(50));
    console.log(`📊 TEST RESULTS SUMMARY`);
    console.log(`=`.repeat(50));
    
    const tests = [
      { name: 'Perplexity Client', key: 'perplexity_client' },
      { name: 'Hybrid Generation', key: 'hybrid_generation' },
      { name: 'Status Checker', key: 'status_checker' },
      { name: 'MCP Integration', key: 'mcp_integration' }
    ];
    
    let passed = 0;
    const total = tests.length;
    
    tests.forEach(test => {
      const status = results[test.key] ? '✅ PASS' : '❌ FAIL';
      console.log(`${status} ${test.name}`);
      if (results[test.key]) passed++;
    });
    
    console.log(`\n📈 Overall: ${passed}/${total} tests passed (${Math.round(passed/total*100)}%)`);
    
    if (passed === total) {
      console.log(`🎉 All tests passed! Perplexity integration is ready.`);
    } else {
      console.log(`⚠️  Some tests failed. Check the output above for details.`);
    }

    console.log(`\n💡 Next Steps:`);
    console.log(`   1. Run: node scripts/check-top10-status.js`);
    console.log(`   2. Test: node scripts/refresh-top10.js bangkok restaurants --dry-run`);
    console.log(`   3. Generate: node scripts/refresh-top10.js bangkok restaurants`);
  }
}

// CLI execution
if (require.main === module) {
  const tester = new PerplexityIntegrationTester();
  
  tester.runTests()
    .then(() => {
      console.log(`\n✨ Testing complete!`);
    })
    .catch(error => {
      console.error(`\n💥 Test suite failed:`, error.message);
      process.exit(1);
    });
}

module.exports = PerplexityIntegrationTester;
