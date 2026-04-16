import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import FounderNote from '../components/editorial/FounderNote';

const html = renderToStaticMarkup(
  <FounderNote updatedAt="2026-04-15T12:00:00.000Z" />,
);

assert.match(html, /Marvin/);
assert.match(html, /Founder &amp; Lead Editor/);
assert.match(html, /50 provinces/);
assert.match(html, /April 15, 2026/);
assert.match(html, /\/about\//);
assert.match(html, /\/editorial-policy\//);

console.log('founder note render ok');
