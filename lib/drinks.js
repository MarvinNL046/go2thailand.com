const fs = require('fs');
const path = require('path');

const drinksDirectory = path.join(process.cwd(), 'data', 'drinks');
const enhancedDrinksDirectory = path.join(process.cwd(), 'data', 'enhanced', 'drinks');

function getDrinkData(slug, enhanced = false) {
  const directory = enhanced ? enhancedDrinksDirectory : drinksDirectory;
  const fullPath = path.join(directory, `${slug}.json`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  return JSON.parse(fileContents);
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
function getDrink(slug) {
  // Try enhanced version first
  let drink = getDrinkData(slug, true);
  
  // Fall back to regular version
  if (!drink || !drink.enhanced_description) {
    const regularDrink = getDrinkData(slug, false);
    if (regularDrink) {
      drink = regularDrink;
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