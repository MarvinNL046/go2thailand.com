const assert = require('node:assert/strict');

const {
  getBudgetMedian,
  formatBudgetRange,
  getBudgetSortValue,
  summarizeRegionBudgets,
} = require('../lib/thailand-index-budget');

const nullBudgetCity = {
  slug: 'mukdahan',
  budget: {
    tier_budget: null,
    tier_mid: null,
    tier_luxury: null,
  },
};

const fullBudgetCity = {
  slug: 'bangkok',
  budget: {
    tier_budget: { min: 30, max: 50, median: 40 },
    tier_mid: { min: 60, max: 90, median: 75 },
    tier_luxury: { min: 120, max: null, median: 180 },
  },
};

assert.equal(getBudgetMedian(nullBudgetCity, 'budget'), null);
assert.equal(getBudgetMedian(fullBudgetCity, 'budget'), 40);
assert.equal(getBudgetSortValue(nullBudgetCity), Number.POSITIVE_INFINITY);
assert.equal(formatBudgetRange(nullBudgetCity, 'budget'), 'N/A');
assert.equal(formatBudgetRange(fullBudgetCity, 'budget'), '$30-50');
assert.equal(formatBudgetRange(fullBudgetCity, 'luxury'), '$120+');

const regionSummary = summarizeRegionBudgets([nullBudgetCity, fullBudgetCity]);

assert.deepEqual(regionSummary, {
  avgBudget: 40,
  avgMid: 75,
  avgLuxury: 180,
  cityCount: 1,
});

console.log('thailand-index budget null handling ok');
