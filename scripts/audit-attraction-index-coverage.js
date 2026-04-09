const fs = require('node:fs');
const path = require('node:path');

const repoRoot = path.resolve(__dirname, '..');
const attractionsRoot = path.join(repoRoot, 'data', 'attractions');
const enhancedRoot = path.join(repoRoot, 'data', 'enhanced', 'attractions');

const cities = fs
  .readdirSync(attractionsRoot)
  .filter((citySlug) => fs.existsSync(path.join(attractionsRoot, citySlug, 'index.json')))
  .sort();

const report = [];

for (const citySlug of cities) {
  const baseIndex = JSON.parse(
    fs.readFileSync(path.join(attractionsRoot, citySlug, 'index.json'), 'utf8'),
  );
  const enhancedIndexPath = path.join(enhancedRoot, citySlug, 'index.json');

  if (!fs.existsSync(enhancedIndexPath)) {
    continue;
  }

  const enhancedIndex = JSON.parse(fs.readFileSync(enhancedIndexPath, 'utf8'));
  const baseSlugs = (baseIndex.attractions || []).map((attraction) => attraction.slug);
  const enhancedSlugs = (enhancedIndex.attractions || []).map((attraction) => attraction.slug);

  const missingDetail = baseSlugs.filter(
    (slug) =>
      !fs.existsSync(path.join(attractionsRoot, citySlug, `${slug}.json`)) &&
      !fs.existsSync(path.join(enhancedRoot, citySlug, `${slug}.json`)),
  );
  const missingFromEnhancedIndex = baseSlugs.filter((slug) => !enhancedSlugs.includes(slug));
  const enhancedOnly = enhancedSlugs.filter((slug) => !baseSlugs.includes(slug));

  if (missingDetail.length || missingFromEnhancedIndex.length || enhancedOnly.length) {
    report.push({
      city: citySlug,
      baseCount: baseSlugs.length,
      enhancedCount: enhancedSlugs.length,
      missingDetail,
      missingFromEnhancedIndex,
      enhancedOnly,
    });
  }
}

console.log(JSON.stringify(report, null, 2));
