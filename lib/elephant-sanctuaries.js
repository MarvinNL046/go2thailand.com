function getElephantSanctuariesIndex() {
  try {
    return require('../data/activities/elephant-sanctuaries/index.json');
  } catch (error) {
    console.error('Error loading elephant sanctuaries index:', error);
    return null;
  }
}

function getElephantSanctuariesByCity(citySlug) {
  try {
    return require(`../data/activities/elephant-sanctuaries/${citySlug}.json`);
  } catch (error) {
    return null;
  }
}

function getAllElephantSanctuaryCities() {
  const index = getElephantSanctuariesIndex();
  if (!index) return [];
  return index.cities.map(c => c.slug);
}

module.exports = {
  getElephantSanctuariesIndex,
  getElephantSanctuariesByCity,
  getAllElephantSanctuaryCities
};
