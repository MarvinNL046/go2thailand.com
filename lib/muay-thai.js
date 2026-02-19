function getMuayThaiIndex() {
  try {
    return require('../data/activities/muay-thai/index.json');
  } catch (error) {
    console.error('Error loading muay thai index:', error);
    return null;
  }
}

function getMuayThaiByCity(citySlug) {
  try {
    return require(`../data/activities/muay-thai/${citySlug}.json`);
  } catch (error) {
    return null;
  }
}

function getAllMuayThaiCities() {
  const index = getMuayThaiIndex();
  if (!index) return [];
  return index.cities.map(c => c.slug);
}

module.exports = {
  getMuayThaiIndex,
  getMuayThaiByCity,
  getAllMuayThaiCities
};
