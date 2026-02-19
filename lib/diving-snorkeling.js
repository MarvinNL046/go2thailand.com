function getDivingSnorkelingIndex() {
  try {
    return require('../data/activities/diving-snorkeling/index.json');
  } catch (error) {
    console.error('Error loading diving-snorkeling index:', error);
    return null;
  }
}

function getDivingSnorkelingByCity(citySlug) {
  try {
    return require(`../data/activities/diving-snorkeling/${citySlug}.json`);
  } catch (error) {
    return null;
  }
}

function getAllDivingSnorkelingCities() {
  const index = getDivingSnorkelingIndex();
  if (!index) return [];
  return index.cities.map(c => c.slug);
}

module.exports = {
  getDivingSnorkelingIndex,
  getDivingSnorkelingByCity,
  getAllDivingSnorkelingCities
};
