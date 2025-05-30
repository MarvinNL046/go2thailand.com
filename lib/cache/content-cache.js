const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class ContentCache {
  constructor(cacheDir = 'data/cache') {
    this.cacheDir = path.join(__dirname, '..', '..', cacheDir);
    this.ensureCacheDir();
  }

  ensureCacheDir() {
    if (!fs.existsSync(this.cacheDir)) {
      fs.mkdirSync(this.cacheDir, { recursive: true });
    }
  }

  // Generate cache key from content
  generateCacheKey(content) {
    return crypto.createHash('md5').update(JSON.stringify(content)).digest('hex');
  }

  // Get cache file path
  getCacheFilePath(key, type = 'general') {
    return path.join(this.cacheDir, `${type}_${key}.json`);
  }

  // Check if cache exists and is valid (24 hours)
  isCacheValid(filePath, maxAge = 24 * 60 * 60 * 1000) {
    if (!fs.existsSync(filePath)) {
      return false;
    }

    const stats = fs.statSync(filePath);
    const age = Date.now() - stats.mtime.getTime();
    return age < maxAge;
  }

  // Get cached content
  get(key, type = 'general') {
    try {
      const filePath = this.getCacheFilePath(key, type);
      
      if (!this.isCacheValid(filePath)) {
        return null;
      }

      const cached = fs.readFileSync(filePath, 'utf8');
      const data = JSON.parse(cached);
      
      console.log(`✅ Cache hit: ${type}_${key}`);
      return data.content;
    } catch (error) {
      console.log(`❌ Cache miss: ${type}_${key}`);
      return null;
    }
  }

  // Set cached content
  set(key, content, type = 'general') {
    try {
      const filePath = this.getCacheFilePath(key, type);
      const cacheData = {
        key,
        type,
        content,
        cached_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      };

      fs.writeFileSync(filePath, JSON.stringify(cacheData, null, 2));
      console.log(`💾 Cached: ${type}_${key}`);
      return true;
    } catch (error) {
      console.error(`❌ Cache write failed: ${type}_${key}`, error.message);
      return false;
    }
  }

  // Get enhanced city data with caching
  getEnhancedCity(citySlug) {
    return this.get(citySlug, 'enhanced_city');
  }

  // Set enhanced city data
  setEnhancedCity(citySlug, enhancedData) {
    return this.set(citySlug, enhancedData, 'enhanced_city');
  }

  // Get top-10 content with caching
  getTop10Content(citySlug, category) {
    const key = `${citySlug}_${category}`;
    return this.get(key, 'top10');
  }

  // Set top-10 content
  setTop10Content(citySlug, category, content) {
    const key = `${citySlug}_${category}`;
    return this.set(key, content, 'top10');
  }

  // Get travel guide with caching
  getTravelGuide(citySlug, guideType) {
    const key = `${citySlug}_${guideType}`;
    return this.get(key, 'guide');
  }

  // Set travel guide
  setTravelGuide(citySlug, guideType, content) {
    const key = `${citySlug}_${guideType}`;
    return this.set(key, content, 'guide');
  }

  // Clear cache for specific type
  clearCache(type = null) {
    try {
      const files = fs.readdirSync(this.cacheDir);
      let deleted = 0;

      files.forEach(file => {
        if (type && !file.startsWith(`${type}_`)) {
          return;
        }
        
        const filePath = path.join(this.cacheDir, file);
        fs.unlinkSync(filePath);
        deleted++;
      });

      console.log(`🗑️  Cleared ${deleted} cache files${type ? ` (type: ${type})` : ''}`);
      return deleted;
    } catch (error) {
      console.error('❌ Cache clear failed:', error.message);
      return 0;
    }
  }

  // Get cache statistics
  getCacheStats() {
    try {
      const files = fs.readdirSync(this.cacheDir);
      const stats = {
        total_files: files.length,
        types: {},
        total_size: 0,
        valid_cache: 0,
        expired_cache: 0
      };

      files.forEach(file => {
        const filePath = path.join(this.cacheDir, file);
        const fileStats = fs.statSync(filePath);
        stats.total_size += fileStats.size;

        // Count by type
        const type = file.split('_')[0];
        stats.types[type] = (stats.types[type] || 0) + 1;

        // Check if valid
        if (this.isCacheValid(filePath)) {
          stats.valid_cache++;
        } else {
          stats.expired_cache++;
        }
      });

      // Convert size to human readable
      stats.total_size_mb = (stats.total_size / (1024 * 1024)).toFixed(2);
      
      return stats;
    } catch (error) {
      console.error('❌ Cache stats failed:', error.message);
      return null;
    }
  }
}

module.exports = ContentCache;
