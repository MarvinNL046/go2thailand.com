const assert = require('node:assert/strict');
const { getAllCities, getAttractionsByCity, getAttractionBySlug } = require('../lib/cities');

for (const city of getAllCities()) {
  for (const attraction of getAttractionsByCity(city.slug)) {
    const loaded = getAttractionBySlug(city.slug, attraction.slug);

    assert.ok(
      loaded,
      `Expected attraction loader to resolve ${city.slug}/${attraction.slug}`,
    );

    assert.equal(
      loaded.slug,
      attraction.slug,
      `Expected resolved attraction slug to match for ${city.slug}/${attraction.slug}`,
    );
  }
}

console.log('attraction loader checks passed');
