function getCookingClassesIndex() {
  try {
    return require('../data/activities/cooking-classes/index.json');
  } catch (error) {
    console.error('Error loading cooking classes index:', error);
    return null;
  }
}

function getCookingClassesByCity(citySlug) {
  try {
    return require(`../data/activities/cooking-classes/${citySlug}.json`);
  } catch (error) {
    return null;
  }
}

function getAllCookingClassCities() {
  const index = getCookingClassesIndex();
  if (!index) return [];
  return index.cities.map(c => c.slug);
}

module.exports = {
  getCookingClassesIndex,
  getCookingClassesByCity,
  getAllCookingClassCities
};
