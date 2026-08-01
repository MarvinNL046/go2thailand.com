import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { nlCityNightlifeGuides } from "../data/nightlife/nl-city-guides";

const root = process.cwd();
const read = (file: string) => fs.readFileSync(path.join(root, file), "utf8");
const cityComponent = read("components/nightlife/CityNightlifeGuideNl.tsx");
const route = read("pages/nightlife/[slug].tsx");
const hub = read("components/nightlife/ThailandNightlifeGuide.tsx");
const pattaya = read("components/nightlife/PattayaNightlifeGuide.tsx");

assert.match(route, /getNlCityNightlifeGuide\(slug\)/, "NL city guide dispatch ontbreekt");
assert.match(route, /slug === 'pattaya'/, "Pattaya-dispatch ontbreekt");
assert.match(cityComponent, /"@type": "Article"/, "Article-schema ontbreekt");
assert.match(cityComponent, /"@type": "FAQPage"/, "FAQ-schema ontbreekt");
assert.match(cityComponent, /"@type": "BreadcrumbList"/, "Breadcrumb-schema ontbreekt");
assert.match(cityComponent, /"@type": "HowTo"/, "HowTo-schema ontbreekt");
assert.match(cityComponent, /noopener noreferrer nofollow sponsored/, "affiliate-rel ontbreekt");
assert.match(cityComponent, /AffiliateDisclosure/, "affiliate-disclosure ontbreekt");
assert.match(cityComponent, /1155/, "veiligheidsinformatie ontbreekt");
assert.doesNotMatch(cityComponent, /beste clubs|persoonlijk geverifieerd|echte drankprijzen/i, "onhoudbare claim in component");

const expected = ["bangkok", "chiang-mai", "phuket"] as const;
for (const slug of expected) {
  const guide = nlCityNightlifeGuides[slug];
  assert.equal(guide.slug, slug);
  assert.ok(guide.title.length >= 35 && guide.title.length <= 65, `${slug}: titlelengte`);
  assert.ok(guide.description.length >= 120 && guide.description.length <= 170, `${slug}: descriptionlengte`);
  assert.ok(guide.zones.length >= 4, `${slug}: minimaal vier unieke zones`);
  assert.ok(guide.route.length === 4, `${slug}: vier routefasen`);
  assert.ok(guide.checks.length === 4, `${slug}: vier actualiteitschecks`);
  assert.ok(guide.safety.length === 4, `${slug}: vier veiligheidschecks`);
  assert.ok(guide.faqs.length >= 6, `${slug}: minimaal zes FAQ's`);
  assert.ok(guide.sources.length >= 4, `${slug}: minimaal vier bronnen`);
  assert.ok(fs.existsSync(path.join(root, "public", guide.heroImage.replace(/^\//, ""))), `${slug}: hero ontbreekt`);
  assert.ok(new Set(guide.zones.map((zone) => zone.name)).size === guide.zones.length, `${slug}: dubbele zone`);
}

for (const source of [hub, pattaya]) {
  assert.match(source, /['"]@type['"]:\s*['"]Article['"]/, "bestaande owner mist Article-schema");
  assert.match(source, /noopener noreferrer nofollow sponsored/, "bestaande owner mist affiliate-rel");
  assert.match(source, /AffiliateDisclosure/, "bestaande owner mist disclosure");
}

console.log("NL nightlife family: 5/5 routes production checks green.");
