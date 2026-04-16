import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import EditorialMeta from '../components/editorial/EditorialMeta';

const html = renderToStaticMarkup(
  <EditorialMeta updatedAt="2026-04-15" />,
);

assert.match(html, /Reviewed by Marvin/);
assert.match(html, /Founder &amp; Lead Editor/);
assert.match(html, /Last updated: <strong>April 15, 2026<\/strong>/);

console.log('editorial meta render ok');
