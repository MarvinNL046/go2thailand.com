// Get all dishes from the food index
function getAllDishes() {
  try {
    const dishesIndex = require('../data/food/index.json');
    return dishesIndex;
  } catch (error) {
    console.error('Error loading food index:', error);
    return [];
  }
}

// Get enhanced dishes from the enhanced food index
function getAllEnhancedDishes() {
  try {
    const enhancedIndex = require('../data/enhanced/food/index.json');
    return enhancedIndex;
  } catch (error) {
    console.error('Error loading enhanced food index:', error);
    // Fallback to regular dishes if enhanced not available
    return getAllDishes();
  }
}

// Get single dish by slug
function getDishBySlug(slug) {
  try {
    const dishData = require(`../data/food/${slug}.json`);
    return dishData;
  } catch (error) {
    console.error(`Error loading dish data for ${slug}:`, error);
    return null;
  }
}

// Get enhanced dish by slug
function getEnhancedDishBySlug(slug) {
  try {
    // First try to get enhanced dish data
    try {
      const enhancedData = require(`../data/enhanced/food/${slug}.json`);
      return enhancedData;
    } catch (enhancedError) {
      // Fallback to regular dish data if enhanced doesn't exist
      const dishData = require(`../data/food/${slug}.json`);
      return dishData;
    }
  } catch (error) {
    console.error(`Error loading dish data for ${slug}:`, error);
    return null;
  }
}

// Get dishes by category
function getDishesByCategory(category) {
  try {
    const categoryData = require(`../data/food/${category}.json`);
    return categoryData;
  } catch (error) {
    console.error(`Error loading category data for ${category}:`, error);
    // Fallback: filter from all dishes
    const allDishes = getAllDishes();
    return allDishes.filter(dish => dish.category === category);
  }
}

// Get all categories
function getAllCategories() {
  const dishes = getAllDishes();
  const categorySet = new Set(dishes.map(dish => dish.category));
  return Array.from(categorySet);
}

// Get dishes by region
function getDishesByRegion(region) {
  const allDishes = getAllDishes();
  return allDishes.filter(dish => dish.region === region);
}

// Get dishes by spice level
function getDishesBySpiceLevel(spiceLevel) {
  const allDishes = getAllDishes();
  return allDishes.filter(dish => dish.spice_level === spiceLevel);
}

// Get static paths for dish pages
function getDishStaticPaths() {
  const dishes = getAllDishes();
  return dishes.map(dish => ({
    params: { slug: dish.slug }
  }));
}

// Get static paths for category pages
function getCategoryStaticPaths() {
  const categories = getAllCategories();
  return categories.map(category => ({
    params: { category }
  }));
}

// Generate dish metadata for SEO
function generateDishMetadata(dish) {
  if (!dish) return {};

  const title = `${dish.name.en} (${dish.name.thai}) | Authentic Thai ${dish.category.replace('-', ' ')} Recipe`;
  const description = dish.enhanced_description || dish.description.en;
  const keywords = [
    dish.name.en,
    dish.name.thai,
    'Thai food',
    'Thai cuisine',
    dish.category,
    dish.region,
    ...dish.ingredients.slice(0, 5)
  ].join(', ');

  return {
    title,
    description: description.substring(0, 160),
    keywords,
    openGraph: {
      title,
      description: description.substring(0, 160),
      images: [
        {
          url: dish.image,
          width: 1200,
          height: 630,
          alt: dish.name.en
        }
      ],
      type: 'website'
    }
  };
}

// Generate category metadata for SEO
function generateCategoryMetadata(category) {
  const categoryName = category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  const title = `Thai ${categoryName} | Authentic Thai ${categoryName} Recipes`;
  const description = `Discover authentic Thai ${categoryName.toLowerCase()} recipes and cooking techniques. Learn about traditional ingredients and cultural significance.`;
  const keywords = `Thai ${categoryName.toLowerCase()}, Thai cuisine, Thai recipes, authentic Thai cooking, ${category}`;

  return {
    title,
    description,
    keywords
  };
}

// Search dishes by name or ingredients
function searchDishes(query) {
  const allDishes = getAllDishes();
  const searchTerm = query.toLowerCase();
  
  return allDishes.filter(dish => 
    dish.name.en.toLowerCase().includes(searchTerm) ||
    dish.name.thai.toLowerCase().includes(searchTerm) ||
    dish.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchTerm)) ||
    dish.description.en.toLowerCase().includes(searchTerm)
  );
}

// Get related dishes (same category or region)
function getRelatedDishes(dish, limit = 4) {
  const allDishes = getAllDishes();
  
  // Filter out the current dish and find related ones
  const related = allDishes
    .filter(d => d.slug !== dish.slug)
    .filter(d => d.category === dish.category || d.region === dish.region)
    .slice(0, limit);
  
  // If not enough related dishes, fill with random dishes
  if (related.length < limit) {
    const remaining = allDishes
      .filter(d => d.slug !== dish.slug && !related.includes(d))
      .slice(0, limit - related.length);
    related.push(...remaining);
  }
  
  return related;
}

// Get popular dishes (can be enhanced with view counts later)
function getPopularDishes(limit = 6) {
  const allDishes = getAllDishes();
  // For now, return first dishes of each category
  const categories = getAllCategories();
  const popular = [];
  
  categories.forEach(category => {
    const categoryDishes = allDishes.filter(dish => dish.category === category);
    if (categoryDishes.length > 0) {
      popular.push(categoryDishes[0]);
    }
  });
  
  return popular.slice(0, limit);
}

// Generate breadcrumbs for food pages
function generateFoodBreadcrumbs(dish = null, category = null) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Thai Food', href: '/food/' }
  ];

  if (category) {
    breadcrumbs.push({
      name: category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      href: `/food/category/${category}/`
    });
  }

  if (dish) {
    breadcrumbs.push({
      name: dish.name.en,
      href: `/food/${dish.slug}/`
    });
  }

  return breadcrumbs;
}

// Check if dish has enhanced content
function hasEnhancedContent(slug) {
  try {
    require(`../data/enhanced/food/${slug}.json`);
    return true;
  } catch (error) {
    return false;
  }
}

// CommonJS exports (works with both Next.js and Node.js)
module.exports = {
  getAllDishes,
  getAllEnhancedDishes,
  getDishBySlug,
  getEnhancedDishBySlug,
  getDishesByCategory,
  getAllCategories,
  getDishesByRegion,
  getDishesBySpiceLevel,
  getDishStaticPaths,
  getCategoryStaticPaths,
  generateDishMetadata,
  generateCategoryMetadata,
  searchDishes,
  getRelatedDishes,
  getPopularDishes,
  generateFoodBreadcrumbs,
  hasEnhancedContent
};

// Individual exports for ES6 import syntax
module.exports.getAllDishes = getAllDishes;
module.exports.getAllEnhancedDishes = getAllEnhancedDishes;
module.exports.getDishBySlug = getDishBySlug;
module.exports.getEnhancedDishBySlug = getEnhancedDishBySlug;
module.exports.getDishesByCategory = getDishesByCategory;
module.exports.getAllCategories = getAllCategories;
module.exports.getDishesByRegion = getDishesByRegion;
module.exports.getDishesBySpiceLevel = getDishesBySpiceLevel;
module.exports.getDishStaticPaths = getDishStaticPaths;
module.exports.getCategoryStaticPaths = getCategoryStaticPaths;
module.exports.generateDishMetadata = generateDishMetadata;
module.exports.generateCategoryMetadata = generateCategoryMetadata;
module.exports.searchDishes = searchDishes;
module.exports.getRelatedDishes = getRelatedDishes;
module.exports.getPopularDishes = getPopularDishes;
module.exports.generateFoodBreadcrumbs = generateFoodBreadcrumbs;
module.exports.hasEnhancedContent = hasEnhancedContent;
