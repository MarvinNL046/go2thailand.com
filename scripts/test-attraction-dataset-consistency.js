const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const repoRoot = path.resolve(__dirname, '..');
const attractionsRoot = path.join(repoRoot, 'data', 'attractions');
const enhancedRoot = path.join(repoRoot, 'data', 'enhanced', 'attractions');

for (const citySlug of fs.readdirSync(attractionsRoot)) {
  const indexPath = path.join(attractionsRoot, citySlug, 'index.json');

  if (!fs.existsSync(indexPath)) {
    continue;
  }

  const cityIndex = JSON.parse(fs.readFileSync(indexPath, 'utf8'));

  for (const attraction of cityIndex.attractions ?? []) {
    const baseDetailPath = path.join(attractionsRoot, citySlug, `${attraction.slug}.json`);
    const enhancedDetailPath = path.join(enhancedRoot, citySlug, `${attraction.slug}.json`);

    assert.ok(
      fs.existsSync(baseDetailPath) || fs.existsSync(enhancedDetailPath),
      `Expected attraction detail file for ${citySlug}/${attraction.slug}`,
    );
  }
}

console.log('attraction dataset consistency checks passed');
