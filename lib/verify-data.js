const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Verify a file exists and is valid JSON
function verifyJsonFile(filepath, description) {
  try {
    if (!fs.existsSync(filepath)) {
      log('red', `❌ Missing: ${description} - ${filepath}`);
      return false;
    }
    
    const content = fs.readFileSync(filepath, 'utf-8');
    JSON.parse(content); // Will throw if invalid JSON
    
    log('green', `✅ Valid: ${description}`);
    return true;
  } catch (error) {
    log('red', `❌ Invalid JSON: ${description} - ${error.message}`);
    return false;
  }
}

// Verify directory exists and has files
function verifyDirectory(dirpath, description, expectedFiles = null) {
  try {
    if (!fs.existsSync(dirpath)) {
      log('red', `❌ Missing directory: ${description} - ${dirpath}`);
      return false;
    }
    
    const files = fs.readdirSync(dirpath);
    const jsonFiles = files.filter(f => f.endsWith('.json'));
    
    if (expectedFiles && jsonFiles.length < expectedFiles) {
      log('yellow', `⚠️  Expected ${expectedFiles} files, found ${jsonFiles.length}: ${description}`);
      return false;
    }
    
    log('green', `✅ Directory OK: ${description} (${jsonFiles.length} JSON files)`);
    return true;
  } catch (error) {
    log('red', `❌ Directory error: ${description} - ${error.message}`);
    return false;
  }
}

// Verify CSV source files
function verifyCsvSources() {
  log('blue', '\n📊 Verifying CSV Source Files...');
  let allValid = true;
  
  const csvFiles = [
    { path: 'thailand-csv/cities.csv', description: 'Cities CSV' },
    { path: 'thailand-csv/bangkok-attractions.csv', description: 'Bangkok Attractions CSV' }
  ];
  
  csvFiles.forEach(file => {
    if (!fs.existsSync(file.path)) {
      log('red', `❌ Missing: ${file.description} - ${file.path}`);
      allValid = false;
    } else {
      log('green', `✅ Found: ${file.description}`);
    }
  });
  
  return allValid;
}

// Verify basic city data
function verifyCityData() {
  log('blue', '\n🏙️  Verifying City Data...');
  let allValid = true;
  
  // Check cities directory
  if (!verifyDirectory('data/cities', 'Cities directory', 10)) {
    allValid = false;
  }
  
  // Check cities index
  if (!verifyJsonFile('data/cities/index.json', 'Cities index')) {
    allValid = false;
  }
  
  // Check some key city files
  const keyCities = ['bangkok', 'chiang-mai', 'phuket'];
  keyCities.forEach(city => {
    if (!verifyJsonFile(`data/cities/${city}.json`, `${city} data`)) {
      allValid = false;
    }
  });
  
  return allValid;
}

// Verify enhanced city data
function verifyEnhancedCityData() {
  log('blue', '\n🚀 Verifying Enhanced City Data...');
  let allValid = true;
  
  // Check enhanced cities directory
  if (!verifyDirectory('data/enhanced', 'Enhanced cities directory', 10)) {
    allValid = false;
  }
  
  // Check some key enhanced city files
  const keyCities = ['bangkok', 'chiang-mai', 'phuket'];
  keyCities.forEach(city => {
    if (!verifyJsonFile(`data/enhanced/${city}.json`, `Enhanced ${city} data`)) {
      allValid = false;
    }
  });
  
  return allValid;
}

// Verify attractions data
function verifyAttractionsData() {
  log('blue', '\n🏛️  Verifying Attractions Data...');
  let allValid = true;
  
  // Check attractions directory
  if (!verifyDirectory('data/attractions/bangkok', 'Bangkok attractions directory', 10)) {
    allValid = false;
  }
  
  // Check attractions index
  if (!verifyJsonFile('data/attractions/bangkok/index.json', 'Bangkok attractions index')) {
    allValid = false;
  }
  
  // Check some key attraction files
  const keyAttractions = ['grand-palace', 'wat-pho', 'chatuchak-market'];
  keyAttractions.forEach(attraction => {
    if (!verifyJsonFile(`data/attractions/bangkok/${attraction}.json`, `${attraction} data`)) {
      allValid = false;
    }
  });
  
  return allValid;
}

// Verify enhanced attractions data
function verifyEnhancedAttractionsData() {
  log('blue', '\n✨ Verifying Enhanced Attractions Data...');
  let allValid = true;
  
  // Check enhanced attractions directory
  if (!verifyDirectory('data/enhanced/attractions/bangkok', 'Enhanced Bangkok attractions directory', 10)) {
    allValid = false;
  }
  
  // Check enhanced attractions index
  if (!verifyJsonFile('data/enhanced/attractions/bangkok/index.json', 'Enhanced Bangkok attractions index')) {
    allValid = false;
  }
  
  // Check some key enhanced attraction files
  const keyAttractions = ['grand-palace', 'wat-pho', 'chatuchak-market'];
  keyAttractions.forEach(attraction => {
    if (!verifyJsonFile(`data/enhanced/attractions/bangkok/${attraction}.json`, `Enhanced ${attraction} data`)) {
      allValid = false;
    }
  });
  
  return allValid;
}

// Verify sitemap and SEO files
function verifySeoFiles() {
  log('blue', '\n🔍 Verifying SEO Files...');
  let allValid = true;
  
  const seoFiles = [
    { path: 'public/sitemap.xml', description: 'Sitemap' },
    { path: 'public/robots.txt', description: 'Robots.txt' }
  ];
  
  seoFiles.forEach(file => {
    if (!fs.existsSync(file.path)) {
      log('red', `❌ Missing: ${file.description} - ${file.path}`);
      allValid = false;
    } else {
      log('green', `✅ Found: ${file.description}`);
    }
  });
  
  return allValid;
}

// Get data statistics
function getDataStats() {
  log('blue', '\n📈 Data Statistics...');
  
  try {
    // Count cities
    const citiesDir = 'data/cities';
    const cityFiles = fs.readdirSync(citiesDir).filter(f => f.endsWith('.json') && f !== 'index.json');
    log('green', `📍 Cities: ${cityFiles.length}`);
    
    // Count enhanced cities
    const enhancedDir = 'data/enhanced';
    if (fs.existsSync(enhancedDir)) {
      const enhancedFiles = fs.readdirSync(enhancedDir).filter(f => f.endsWith('.json'));
      log('green', `🚀 Enhanced Cities: ${enhancedFiles.length}`);
    }
    
    // Count attractions
    const attractionsDir = 'data/attractions/bangkok';
    if (fs.existsSync(attractionsDir)) {
      const attractionFiles = fs.readdirSync(attractionsDir).filter(f => f.endsWith('.json') && f !== 'index.json');
      log('green', `🏛️  Bangkok Attractions: ${attractionFiles.length}`);
    }
    
    // Count enhanced attractions
    const enhancedAttractionsDir = 'data/enhanced/attractions/bangkok';
    if (fs.existsSync(enhancedAttractionsDir)) {
      const enhancedAttractionFiles = fs.readdirSync(enhancedAttractionsDir).filter(f => f.endsWith('.json') && f !== 'index.json');
      log('green', `✨ Enhanced Bangkok Attractions: ${enhancedAttractionFiles.length}`);
    }
    
  } catch (error) {
    log('red', `❌ Error getting stats: ${error.message}`);
  }
}

// Main verification function
function verifyAllData() {
  log('blue', '🔍 GO2THAILAND DATA VERIFICATION');
  log('blue', '================================\n');
  
  const checks = [
    verifyCsvSources,
    verifyCityData,
    verifyEnhancedCityData,
    verifyAttractionsData,
    verifyEnhancedAttractionsData,
    verifySeoFiles
  ];
  
  let allPassed = true;
  checks.forEach(check => {
    if (!check()) {
      allPassed = false;
    }
  });
  
  getDataStats();
  
  if (allPassed) {
    log('green', '\n🎉 ALL VERIFICATION CHECKS PASSED!');
    log('green', '✅ Your data is production-ready!\n');
    return true;
  } else {
    log('red', '\n❌ SOME VERIFICATION CHECKS FAILED!');
    log('yellow', '⚠️  Please run the data generation scripts to fix missing files.\n');
    return false;
  }
}

// CLI execution
if (require.main === module) {
  const success = verifyAllData();
  process.exit(success ? 0 : 1);
}

module.exports = { verifyAllData };
