// Get all visas for static generation
function getAllVisas() {
  try {
    const visasIndex = require('../data/visas/index.json');
    return visasIndex;
  } catch (error) {
    console.error('Error loading visas index:', error);
    return [];
  }
}

// Get visa data by slug
function getVisaBySlug(slug) {
  try {
    const visaData = require(`../data/visas/${slug}.json`);
    return visaData;
  } catch (error) {
    console.error(`Error loading visa data for ${slug}:`, error);
    return null;
  }
}

// Get static paths for Next.js
function getVisaStaticPaths() {
  const visas = getAllVisas();
  return visas.map(visa => ({
    params: { slug: visa.slug }
  }));
}

// Get visas by category (tourist, long-stay, special)
function getVisasByCategory(category) {
  const visas = getAllVisas();
  return visas.filter(visa =>
    visa.category.toLowerCase() === category.toLowerCase()
  );
}

// Generate breadcrumbs for visa pages
function generateVisaBreadcrumbs(visa) {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Visa Guide', href: '/visa/' }
  ];

  if (visa) {
    breadcrumbs.push({
      name: visa.title.en,
      href: `/visa/${visa.slug}/`
    });
  }

  return breadcrumbs;
}

module.exports = {
  getAllVisas,
  getVisaBySlug,
  getVisaStaticPaths,
  getVisasByCategory,
  generateVisaBreadcrumbs
};
