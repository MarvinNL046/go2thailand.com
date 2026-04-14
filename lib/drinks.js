const fs = require('fs');
const path = require('path');

const drinksDirectory = path.join(process.cwd(), 'data', 'drinks');
const enhancedDrinksDirectory = path.join(process.cwd(), 'data', 'enhanced', 'drinks');

function getDrinkData(slug, enhanced = false, locale = 'en') {
  const directory = enhanced ? enhancedDrinksDirectory : drinksDirectory;
  // Prefer locale-specific enhanced file (e.g. data/enhanced/drinks/nl/<slug>.json).
  if (enhanced && locale && locale !== 'en') {
    const localePath = path.join(directory, locale, `${slug}.json`);
    if (fs.existsSync(localePath)) {
      return JSON.parse(fs.readFileSync(localePath, 'utf8'));
    }
  }
  const fullPath = path.join(directory, `${slug}.json`);
  if (!fs.existsSync(fullPath)) return null;
  return JSON.parse(fs.readFileSync(fullPath, 'utf8'));
}

function getAllDrinks(enhanced = false) {
  const directory = enhanced ? enhancedDrinksDirectory : drinksDirectory;
  const indexPath = path.join(directory, 'index.json');
  
  if (!fs.existsSync(indexPath)) {
    // If no index, scan directory
    const files = fs.readdirSync(directory);
    const drinks = files
      .filter(file => file.endsWith('.json') && file !== 'index.json')
      .map(file => {
        const slug = file.replace('.json', '');
        return getDrinkData(slug, enhanced);
      })
      .filter(Boolean);
    
    return drinks;
  }
  
  const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
  return index.drinks.map(drinkRef => getDrinkData(drinkRef.slug, enhanced)).filter(Boolean);
}

function getDrinksByCategory(category, enhanced = false) {
  const allDrinks = getAllDrinks(enhanced);
  return allDrinks.filter(drink => drink.category === category);
}

function getDrinksByType(type, enhanced = false) {
  const allDrinks = getAllDrinks(enhanced);
  return allDrinks.filter(drink => drink.type === type);
}

function getDrinkCategories() {
  return ['tea', 'coffee', 'juice', 'herbal', 'alcohol', 'natural', 'mocktail', 'soda', 'milk'];
}

function getDrinkTypes() {
  return ['hot', 'cold', 'both', 'neat', 'mixed', 'room'];
}

// For Next.js pages
function getDrink(slug, locale = 'en') {
  // Try locale-specific enhanced version first.
  let drink = getDrinkData(slug, true, locale);

  // Fall back to regular (base) version if the enhanced record is missing
  // key fields. We intentionally do NOT overwrite a locale-specific enhanced
  // result here — it is already the best match for the active locale.
  if (!drink || !drink.enhanced_description) {
    const regularDrink = getDrinkData(slug, false);
    if (regularDrink) {
      drink = drink || regularDrink;
    }
  }

  return drink;
}

module.exports = {
  getDrink,
  getDrinkData,
  getAllDrinks,
  getDrinksByCategory,
  getDrinksByType,
  getDrinkCategories,
  getDrinkTypes
};