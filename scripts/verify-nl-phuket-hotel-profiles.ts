import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { nlPhuketHotelDetailGuides } from '../data/hotel-details/nl-phuket';

const baseUrl = process.env.SITE_VERIFY_BASE_URL || 'http://localhost:3000';
const projectRoot = resolve(__dirname, '..');
const expectedSlugs = [
  'grand-mercure-phuket-patong',
  'four-points-by-sheraton-phuket-patong-beach-resort',
  'hotel-indigo-phuket-patong',
  'movenpick-myth-hotel-patong-phuket',
  'lub-d-phuket-patong',
  'novotel-phuket-kamala-beach',
  'sunwing-kamala-beach',
  'sunprime-kamala-beach',
];

function decodeHtml(value: string): string {
  return value.replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}

function textOf(html: string): string {
  return decodeHtml(html.replace(/<script\b[\s\S]*?<\/script>/gi, ' ').replace(/<style\b[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
}

function attribute(tag: string, name: string): string {
  return decodeHtml(tag.match(new RegExp(`\\b${name}\\s*=\\s*["']([^"']*)["']`, 'i'))?.[1] || '');
}

async function verify(slug: string): Promise<string[]> {
  const errors: string[] = [];
  const data = nlPhuketHotelDetailGuides[slug];
  if (!data) return [`ownerdata ontbreekt voor ${slug}`];
  if (!existsSync(resolve(projectRoot, 'public', data.hero.image.replace(/^\//, '')))) errors.push(`heroasset ontbreekt: ${data.hero.image}`);
  if (data.sources.length < 1 || data.sources.some((source) => !/^https:\/\//.test(source.url))) errors.push('primaire bronregistratie ontbreekt');
  if (data.faqs.length !== 6) errors.push(`verwacht 6 FAQ's, kreeg ${data.faqs.length}`);
  if (data.faqEyebrow !== 'Vragen vóór je boekt') errors.push('FAQ-label doet ten onrechte een PAA-claim');

  const route = new URL(data.pageUrl).pathname;
  const response = await fetch(new URL(route, baseUrl));
  const html = await response.text();
  const text = textOf(html);
  if (response.status !== 200) errors.push(`HTTP ${response.status}`);
  const canonical = decodeHtml(html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i)?.[1] || '');
  if (canonical !== data.pageUrl) errors.push(`canonical is ${canonical || 'leeg'}`);
  if ((html.match(/<h1\b/gi) || []).length !== 1) errors.push('niet exact één H1');
  for (const schema of ['BreadcrumbList', 'FAQPage', 'Hotel', 'WebPage']) if (!html.includes(`"@type":"${schema}"`)) errors.push(`${schema}-schema ontbreekt`);
  const sponsored = [...html.matchAll(/<a\b[^>]*>/gi)].map((match) => match[0]).filter((tag) => attribute(tag, 'rel').split(/\s+/).includes('sponsored'));
  if (sponsored.length < 3) errors.push(`slechts ${sponsored.length} gesponsorde hoteluitgangen`);
  if (sponsored.some((tag) => !['noopener', 'noreferrer', 'nofollow', 'sponsored'].every((token) => attribute(tag, 'rel').split(/\s+/).includes(token)))) errors.push('affiliate-rel is onvolledig');
  if (sponsored.some((tag) => !attribute(tag, 'href').includes('trip.tpo.lv'))) errors.push('niet-Trip hoteluitgang gevonden');
  if (/\$\s?\d|\b\d(?:[.,]\d)?\/5\b|eerlijke review|honest review/i.test(text)) errors.push('vluchtige prijs-, score- of ervaringsreviewclaim gevonden');
  if (!text.includes('AI-gegenereerd sfeerbeeld')) errors.push('beeldtransparantie ontbreekt');
  if (!text.includes(data.hotelName)) errors.push('hotelnaam ontbreekt in zichtbare tekst');
  return errors;
}

async function main(): Promise<void> {
  const results = await Promise.all(expectedSlugs.map(async (slug) => ({ slug, errors: await verify(slug) })));
  const failures = results.filter((result) => result.errors.length);
  console.log(`NL Phuket hotelprofielen: ${results.length - failures.length}/${results.length} groen op ${baseUrl}.`);
  for (const result of failures) {
    console.error(`\n${result.slug}`);
    for (const error of result.errors) console.error(`  - ${error}`);
  }
  if (failures.length) process.exitCode = 1;
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
