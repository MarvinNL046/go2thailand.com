import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import BestHotelsCategoryPage from '../pages/best-hotels/[slug]/[category]';
import WhereToStayAudiencePage from '../pages/where-to-stay/[city]/[audience]';

(globalThis as typeof globalThis & { React: typeof React }).React = React;

const bangkokDigitalNomads = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'data', 'pseo', 'where-to-stay', 'bangkok-digital-nomads.json'), 'utf8'),
);

const digitalNomadsHtml = renderToStaticMarkup(
  <WhereToStayAudiencePage data={bangkokDigitalNomads} />,
);

assert.match(digitalNomadsHtml, /Related Bangkok stay decisions/);
assert.match(digitalNomadsHtml, /\/best-hotels\/bangkok\/mid-range\/?"/);
assert.match(digitalNomadsHtml, /\/areas\/bangkok\/ari\/?"/);
assert.doesNotMatch(digitalNomadsHtml, /\/guides\/where-to-stay\/bangkok\/?"/);

const bangkokMidRange = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'data', 'pseo', 'best-hotels', 'bangkok-mid-range.json'), 'utf8'),
);

const midRangeHtml = renderToStaticMarkup(
  <BestHotelsCategoryPage data={bangkokMidRange} />,
);

assert.match(midRangeHtml, /Related Bangkok hotel decisions/);
assert.match(midRangeHtml, /\/where-to-stay\/bangkok\/digital-nomads\/?"/);
assert.match(midRangeHtml, /\/where-to-stay\/bangkok\/?"/);
assert.doesNotMatch(midRangeHtml, /\/guides\/where-to-stay\/bangkok\/?"/);

console.log('intent page render ok');
