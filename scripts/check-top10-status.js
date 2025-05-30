#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { getAllCities } = require('../lib/cities');

class Top10StatusChecker {
  constructor() {
    this.top10DataDir = path.join(__dirname, '..', 'data', 'top10');
    this.categories = ['restaurants', 'hotels', 'attractions'];
  }

  // Check if top10 directory exists
  ensureTop10Directory() {
    if (!fs.existsSync(this.top10DataDir)) {
      console.log(`📁 Creating top10 directory: ${this.top10DataDir}`);
      fs.mkdirSync(this.top10DataDir, { recursive: true });
    }
  }

  // Get file age in days
  getFileAge(filePath) {
    try {
      const stats = fs.statSync(filePath);
      const ageMs = Date.now() - stats.mtime.getTime();
      return Math.floor(ageMs / (1000 * 60 * 60 * 24));
    } catch (error) {
      return null; // File doesn't exist
    }
  }

  // Check status of a specific city/category combination
  checkStatus(citySlug, category) {
    const fileName = `${citySlug}-${category}.json`;
    const filePath = path.join(this.top10DataDir, fileName);
    const age = this.getFileAge(filePath);

    if (age === null) {
      return {
        exists: false,
        age: null,
        status: 'missing',
        lastUpdated: null,
        needsUpdate: true
      };
    }

    // Define when content needs update based on category
    const updateThresholds = {
      restaurants: 7,   // 7 days
      hotels: 14,       // 14 days
      attractions: 30   // 30 days
    };

    const threshold = updateThresholds[category] || 14;
    const needsUpdate = age > threshold;

    return {
      exists: true,
      age,
      status: needsUpdate ? 'outdated' : 'current',
      lastUpdated: fs.statSync(filePath).mtime.toISOString().split('T')[0],
      needsUpdate,
      threshold
    };
  }

  // Generate comprehensive status report
  generateReport() {
    this.ensureTop10Directory();
    
    const cities = getAllCities();
    const report = {
      generated_at: new Date().toISOString(),
      summary: {
        total_files: 0,
        missing: 0,
        current: 0,
        outdated: 0
      },
      cities: {}
    };

    console.log(`🔍 Checking Top 10 Content Status\n`);
    console.log(`📊 Categories: ${this.categories.join(', ')}`);
    console.log(`🏙️  Cities: ${cities.length} total\n`);

    for (const city of cities) {
      report.cities[city.slug] = {
        name: city.name.en,
        categories: {}
      };

      console.log(`\n🏛️  ${city.name.en} (${city.slug})`);
      console.log('─'.repeat(50));

      for (const category of this.categories) {
        const status = this.checkStatus(city.slug, category);
        report.cities[city.slug].categories[category] = status;
        report.summary.total_files++;

        // Update summary counts
        report.summary[status.status]++;

        // Display status
        const emoji = this.getStatusEmoji(status);
        const ageText = status.age !== null ? `${status.age}d old` : 'missing';
        const thresholdText = status.threshold ? `(${status.threshold}d limit)` : '';
        
        console.log(`  ${emoji} ${category.padEnd(12)} ${ageText.padEnd(10)} ${thresholdText}`);
      }
    }

    this.displaySummary(report.summary);
    this.displayRecommendations(report);

    return report;
  }

  // Get appropriate emoji for status
  getStatusEmoji(status) {
    if (!status.exists) return '❌';
    if (status.needsUpdate) return '⚠️ ';
    return '✅';
  }

  // Display summary statistics
  displaySummary(summary) {
    console.log('\n' + '='.repeat(60));
    console.log('📈 SUMMARY STATISTICS');
    console.log('='.repeat(60));
    console.log(`Total files:      ${summary.total_files}`);
    console.log(`✅ Current:       ${summary.current}`);
    console.log(`⚠️  Outdated:      ${summary.outdated}`);
    console.log(`❌ Missing:       ${summary.missing}`);
    
    const percentage = Math.round((summary.current / summary.total_files) * 100);
    console.log(`📊 Up-to-date:    ${percentage}%`);
  }

  // Display actionable recommendations
  displayRecommendations(report) {
    console.log('\n' + '='.repeat(60));
    console.log('💡 RECOMMENDATIONS');
    console.log('='.repeat(60));

    const outdatedItems = [];
    const missingItems = [];

    for (const [citySlug, cityData] of Object.entries(report.cities)) {
      for (const [category, status] of Object.entries(cityData.categories)) {
        if (!status.exists) {
          missingItems.push(`${citySlug} ${category}`);
        } else if (status.needsUpdate) {
          outdatedItems.push(`${citySlug} ${category} (${status.age}d old)`);
        }
      }
    }

    if (missingItems.length > 0) {
      console.log('\n🆕 MISSING CONTENT (Generate first):');
      missingItems.slice(0, 5).forEach(item => {
        console.log(`   node scripts/refresh-top10.js ${item}`);
      });
      if (missingItems.length > 5) {
        console.log(`   ... and ${missingItems.length - 5} more`);
      }
    }

    if (outdatedItems.length > 0) {
      console.log('\n🔄 OUTDATED CONTENT (High priority):');
      outdatedItems.slice(0, 5).forEach(item => {
        console.log(`   node scripts/refresh-top10.js ${item}`);
      });
      if (outdatedItems.length > 5) {
        console.log(`   ... and ${outdatedItems.length - 5} more`);
      }
    }

    if (missingItems.length === 0 && outdatedItems.length === 0) {
      console.log('\n🎉 All content is up to date!');
    }

    console.log('\n📝 EXAMPLE COMMANDS:');
    console.log('   node scripts/refresh-top10.js bangkok restaurants');
    console.log('   node scripts/refresh-top10.js phuket hotels');
    console.log('   node scripts/refresh-city-top10.js chiang-mai');
  }

  // Save status report to file
  saveReport(report) {
    const reportPath = path.join(this.top10DataDir, 'status-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\n💾 Status report saved: ${reportPath}`);
  }
}

// CLI execution
if (require.main === module) {
  const checker = new Top10StatusChecker();
  
  try {
    const report = checker.generateReport();
    
    // Save report if --save flag is provided
    if (process.argv.includes('--save')) {
      checker.saveReport(report);
    }
    
    console.log('\n✨ Status check complete!');
  } catch (error) {
    console.error('❌ Error checking status:', error.message);
    process.exit(1);
  }
}

module.exports = Top10StatusChecker;
