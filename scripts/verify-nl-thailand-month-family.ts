import fs from 'node:fs';
import path from 'node:path';
import { MONTH_SLUGS_NL, thailandMonthGuidesNl } from '../data/thailand-month-guides.nl';

const root = process.cwd();
const pagePath = path.join(root, 'pages', 'thailand-in', '[month].tsx');
const templatePath = path.join(root, 'components', 'planning', 'ThailandMonthGuideNl.tsx');
const dataPath = path.join(root, 'data', 'thailand-month-guides.nl.ts');

const page = fs.readFileSync(pagePath, 'utf8');
const template = fs.readFileSync(templatePath, 'utf8');
const dataSource = fs.readFileSync(dataPath, 'utf8');
const failures: string[] = [];

function assert(condition: unknown, message: string) {
  if (!condition) failures.push(message);
}

assert(MONTH_SLUGS_NL.length === 12, `expected 12 month owners, found ${MONTH_SLUGS_NL.length}`);
assert(new Set(MONTH_SLUGS_NL).size === 12, 'month slugs are not unique');
assert(page.includes('ThailandMonthGuideNl'), 'dynamic route does not dispatch NL to the premium month template');
assert(page.includes('isMonthSlugNl(guide.slug)'), 'dynamic route lacks an exact NL month guard');
assert(template.includes('data-premium-template="thailand-month-guide-nl"'), 'premium template marker is missing');
assert(template.includes("'@type': 'Article'"), 'Article schema is missing');
assert(template.includes("'@type': 'BreadcrumbList'"), 'BreadcrumbList schema is missing');
assert(template.includes("'@type': 'FAQPage'"), 'FAQPage schema is missing');
assert(template.includes("inLanguage: 'nl-NL'"), 'NL schema language is missing');
assert(template.includes('https://go2-thailand.com/nl/thailand-in/${guide.slug}/'), 'self-referencing schema URL is missing');
assert(template.includes('rel="noopener noreferrer nofollow sponsored"'), 'affiliate rel attributes are missing');
assert(template.includes('We tonen bewust geen vaste vanafprijzen'), 'live-price guardrail is missing');
assert(template.includes('Dit zijn redactionele beslisvragen, geen verzonnen Google People Also Ask-data'), 'PAA transparency is missing');

const textToCheck = `${template}\n${dataSource}`;
for (const artifact of ['â€', 'Ã', 'ðŸ', 'ï¸', '\uFFFD']) {
  assert(!textToCheck.includes(artifact), `mojibake marker found: ${artifact}`);
}

const titles = new Set<string>();
const descriptions = new Set<string>();
const verdicts = new Set<string>();

for (const slug of MONTH_SLUGS_NL) {
  const guide = thailandMonthGuidesNl[slug];
  assert(guide.slug === slug, `${slug}: data slug mismatch`);
  assert(guide.month.length >= 3, `${slug}: Dutch month label missing`);
  assert(guide.title.toLowerCase().includes(`thailand in ${guide.month}`), `${slug}: title does not own the Dutch month intent`);
  assert(guide.title.length <= 65, `${slug}: raw title exceeds 65 characters (${guide.title.length})`);
  assert(guide.description.length >= 105 && guide.description.length <= 165, `${slug}: description length ${guide.description.length} is outside 105–165`);
  assert(guide.regions.length === 3, `${slug}: expected exactly three regional decisions`);
  assert(guide.choices.length === 3, `${slug}: expected exactly three route choices`);
  assert(guide.packing.length === 4, `${slug}: expected exactly four packing decisions`);
  assert(guide.caution.length >= 90, `${slug}: caution lacks decision depth`);
  assert(guide.coastChoice.length >= 90, `${slug}: coast decision lacks depth`);
  assert(!/perfect|goedkoopste|altijd droog|garantie/i.test(`${guide.title} ${guide.verdict} ${guide.description}`), `${slug}: absolute or price-superlative claim found`);

  titles.add(guide.title);
  descriptions.add(guide.description);
  verdicts.add(guide.verdict);

  const imagePath = path.join(root, 'public', guide.hero.replace(/^\//, ''));
  assert(fs.existsSync(imagePath), `${slug}: hero image does not exist: ${guide.hero}`);
}

assert(titles.size === 12, `titles are not unique (${titles.size}/12)`);
assert(descriptions.size === 12, `descriptions are not unique (${descriptions.size}/12)`);
assert(verdicts.size === 12, `verdicts are not unique (${verdicts.size}/12)`);

if (failures.length) {
  console.error(`NL Thailand month family: ${failures.length} failure(s)`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('NL Thailand month family: 12/12 owners passed');
console.log('- unique Dutch month decision: 12/12');
console.log('- premium template + Article/Breadcrumb/FAQ schema: passed');
console.log('- regional/coast/route/packing decisions: passed');
console.log('- affiliate disclosure + sponsored rel + live-price guardrail: passed');
console.log('- hero assets + mojibake check: passed');
