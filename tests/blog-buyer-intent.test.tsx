import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import BuyerIntentNextStep from '../components/blog/BuyerIntentNextStep';
import { getBlogBuyerIntentContext } from '../lib/blog-buyer-intent';

const nightlifeContext = getBlogBuyerIntentContext({
  slug: 'bangkok-best-cocktail-bars-march-2026-nightlife',
  title: 'Bangkok Best Cocktail Bars March 2026 Nightlife',
  tags: ['Bangkok', 'Nightlife', 'Cocktails'],
});

assert.equal(nightlifeContext?.citySlug, 'bangkok');
assert.equal(nightlifeContext?.audience.slug, 'nightlife');
assert.equal(nightlifeContext?.hotelCategory.slug, 'luxury');
assert.equal(nightlifeContext?.links[0]?.href, '/where-to-stay/bangkok/first-time/');
assert.equal(nightlifeContext?.links[1]?.href, '/where-to-stay/bangkok/nightlife/');
assert.equal(nightlifeContext?.links[3]?.href, '/best-hotels/bangkok/luxury/');

const genericContext = getBlogBuyerIntentContext({
  slug: 'thailand-budget-vs-comfort-travel',
  title: 'Thailand Budget vs Comfort Travel',
  tags: ['Thailand', 'Budget Travel'],
});

assert.equal(genericContext, null);

const html = renderToStaticMarkup(
  <BuyerIntentNextStep
    post={{
      slug: 'phuket-best-beach-clubs-2026-yona-catch-barra-cuda',
      title: 'Phuket Best Beach Clubs 2026',
      tags: ['Phuket', 'Nightlife', 'Beach Clubs'],
    }}
  />,
);

assert.match(html, /Planning your stay in Phuket\?/);
assert.match(html, /Where to stay in Phuket for first-time visitors/);
assert.match(html, /Where to stay in Phuket for nightlife/);
assert.match(html, /Best hotels in Phuket/);
assert.match(html, /Best beachfront hotels in Phuket/);
assert.match(html, /\/where-to-stay\/phuket\/nightlife\/?"/);
assert.match(html, /\/best-hotels\/phuket\/beachfront\/?"/);

const hiddenHtml = renderToStaticMarkup(
  <BuyerIntentNextStep
    post={{
      slug: 'thailand-itinerary-2-weeks',
      title: 'Thailand itinerary 2 weeks',
      tags: ['Thailand', 'Itinerary'],
    }}
  />,
);

assert.equal(hiddenHtml, '');

console.log('blog buyer intent ok');
