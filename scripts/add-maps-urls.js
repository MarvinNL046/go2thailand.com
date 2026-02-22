#!/usr/bin/env node

/**
 * Add googleMapsUrl to all attractions across all cities.
 *
 * For each attraction without a googleMapsUrl, generates one using:
 *   https://www.google.com/maps/search/?api=1&query=ENCODED_NAME+CITY+Thailand
 *
 * Updates both:
 *   data/enhanced/attractions/{city}/index.json
 *   data/attractions/{city}/index.json
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const ENHANCED_DIR = path.join(ROOT, 'data', 'enhanced', 'attractions');
const PLAIN_DIR = path.join(ROOT, 'data', 'attractions');

function titleCase(str) {
  return str
    .split(/[\s-]+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

function buildGoogleMapsUrl(attractionNameEn, cityName) {
  const query = `${attractionNameEn} ${cityName} Thailand`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function main() {
  const cityDirs = fs.readdirSync(ENHANCED_DIR).filter((d) => {
    return fs.statSync(path.join(ENHANCED_DIR, d)).isDirectory();
  });

  let totalUpdated = 0;
  let totalSkipped = 0;
  const summary = [];

  for (const citySlug of cityDirs.sort()) {
    const enhancedFile = path.join(ENHANCED_DIR, citySlug, 'index.json');

    if (!fs.existsSync(enhancedFile)) {
      console.log(`  SKIP ${citySlug} - no index.json`);
      continue;
    }

    const data = JSON.parse(fs.readFileSync(enhancedFile, 'utf-8'));
    const cityName = data.city_name || titleCase(citySlug);

    let updatedCount = 0;
    let skippedCount = 0;

    for (const attraction of data.attractions) {
      if (attraction.googleMapsUrl) {
        skippedCount++;
        continue;
      }

      const nameEn = attraction.name && attraction.name.en;
      if (!nameEn) {
        console.log(`  WARN: ${citySlug} attraction id=${attraction.id} has no name.en, skipping`);
        skippedCount++;
        continue;
      }

      attraction.googleMapsUrl = buildGoogleMapsUrl(nameEn, cityName);
      updatedCount++;
    }

    // Write enhanced file
    fs.writeFileSync(enhancedFile, JSON.stringify(data, null, 2) + '\n', 'utf-8');

    // Write plain file (copy the same content, but strip enhanced_at / enhanced_count if present)
    const plainDir = path.join(PLAIN_DIR, citySlug);
    if (!fs.existsSync(plainDir)) {
      fs.mkdirSync(plainDir, { recursive: true });
    }
    const plainFile = path.join(plainDir, 'index.json');

    // Read existing plain file to preserve its structure, or fall back to enhanced data
    let plainData;
    if (fs.existsSync(plainFile)) {
      plainData = JSON.parse(fs.readFileSync(plainFile, 'utf-8'));
      // Update attractions in plain data to match enhanced
      for (const enhancedAttr of data.attractions) {
        const plainAttr = plainData.attractions.find((a) => a.slug === enhancedAttr.slug || a.id === enhancedAttr.id);
        if (plainAttr && !plainAttr.googleMapsUrl && enhancedAttr.googleMapsUrl) {
          plainAttr.googleMapsUrl = enhancedAttr.googleMapsUrl;
        }
      }
    } else {
      // No plain file exists yet; create one from enhanced data minus enhanced-only fields
      plainData = { ...data };
      delete plainData.enhanced_at;
      delete plainData.enhanced_count;
    }

    fs.writeFileSync(plainFile, JSON.stringify(plainData, null, 2) + '\n', 'utf-8');

    totalUpdated += updatedCount;
    totalSkipped += skippedCount;

    if (updatedCount > 0) {
      summary.push({ city: cityName, slug: citySlug, updated: updatedCount, skipped: skippedCount });
    }

    const totalInCity = data.attractions.length;
    console.log(
      `  ${cityName.padEnd(22)} ${String(totalInCity).padStart(3)} attractions | ${String(updatedCount).padStart(3)} added | ${String(skippedCount).padStart(3)} already had URL`
    );
  }

  console.log('\n--- Summary ---');
  console.log(`Cities processed:    ${cityDirs.length}`);
  console.log(`URLs added:          ${totalUpdated}`);
  console.log(`Already had URL:     ${totalSkipped}`);
  console.log(`Total attractions:   ${totalUpdated + totalSkipped}`);

  if (summary.length > 0) {
    console.log(`\nCities updated (${summary.length}):`);
    for (const s of summary) {
      console.log(`  ${s.city}: ${s.updated} attractions updated`);
    }
  }
}

main();
