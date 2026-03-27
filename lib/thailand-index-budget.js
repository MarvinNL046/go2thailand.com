function getBudgetTier(city, tier) {
  return city?.budget?.[`tier_${tier}`] ?? null;
}

function getBudgetMedian(city, tier) {
  const tierData = getBudgetTier(city, tier);
  return typeof tierData?.median === 'number' ? tierData.median : null;
}

function getBudgetSortValue(city) {
  const median = getBudgetMedian(city, 'budget');
  return median === null ? Number.POSITIVE_INFINITY : median;
}

function formatBudgetRange(city, tier) {
  const tierData = getBudgetTier(city, tier);
  if (!tierData || typeof tierData.min !== 'number') {
    return 'N/A';
  }

  if (tierData.max === null) {
    return `$${tierData.min}+`;
  }

  return `$${tierData.min}-${tierData.max}`;
}

function formatBudgetMedian(city, tier) {
  const median = getBudgetMedian(city, tier);
  return median === null ? 'N/A' : `$${median}`;
}

function summarizeRegionBudgets(cities) {
  const validCities = cities.filter((city) => {
    return (
      getBudgetMedian(city, 'budget') !== null &&
      getBudgetMedian(city, 'mid') !== null &&
      getBudgetMedian(city, 'luxury') !== null
    );
  });

  if (validCities.length === 0) {
    return {
      avgBudget: null,
      avgMid: null,
      avgLuxury: null,
      cityCount: 0,
    };
  }

  const avg = (tier) =>
    Math.round(
      validCities.reduce((sum, city) => sum + getBudgetMedian(city, tier), 0) /
        validCities.length
    );

  return {
    avgBudget: avg('budget'),
    avgMid: avg('mid'),
    avgLuxury: avg('luxury'),
    cityCount: validCities.length,
  };
}

module.exports = {
  formatBudgetMedian,
  formatBudgetRange,
  getBudgetMedian,
  getBudgetSortValue,
  summarizeRegionBudgets,
};
