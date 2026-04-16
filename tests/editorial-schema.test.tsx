import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import EditorialSchema from '../components/editorial/EditorialSchema';

const html = renderToStaticMarkup(
  <EditorialSchema
    title="Where to stay in Bangkok for nightlife lovers"
    url="https://go2-thailand.com/where-to-stay/bangkok/nightlife/"
    updatedAt="2026-04-15T12:00:00.000Z"
  />,
);

const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
assert.ok(match, 'expected JSON-LD script tag');

const data = JSON.parse(match[1]);
assert.equal(data['@context'], 'https://schema.org');
assert.ok(Array.isArray(data['@graph']));

const person = data['@graph'].find((node: any) => node['@type'] === 'Person');
const org = data['@graph'].find((node: any) => node['@type'] === 'Organization');
const page = data['@graph'].find((node: any) => node['@type'] === 'WebPage');

assert.equal(person.name, 'Marvin');
assert.equal(person.jobTitle, 'Founder & Lead Editor');
assert.equal(org.name, 'Go2Thailand.com');
assert.equal(page.url, 'https://go2-thailand.com/where-to-stay/bangkok/nightlife/');
assert.equal(page.dateModified, '2026-04-15T12:00:00.000Z');
assert.equal(page.author['@id'], 'https://go2-thailand.com/#marvin');

console.log('editorial schema render ok');
