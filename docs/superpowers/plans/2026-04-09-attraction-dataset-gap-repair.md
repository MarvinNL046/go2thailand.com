# Attraction Dataset Gap Repair Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fill the 19 missing attraction detail records with source-backed, EEAT-safe content and add a regression check that prevents future index/detail mismatches.

**Architecture:** Keep the current runtime fallback in `lib/cities.js`, but repair the underlying data by creating real enhanced attraction JSON files for every missing slug. Use primary tourism and venue sources where possible, write conservative copy for soft experience entries, and add a dataset consistency test that fails whenever an index slug lacks a backing detail file.

**Tech Stack:** Node.js scripts, JSON content files, Next.js data loaders, official web sources via browser search.

---

### Task 1: Lock the gap list and add a failing dataset consistency test

**Files:**
- Modify: `scripts/test-attraction-loader.js`
- Create: `scripts/test-attraction-dataset-consistency.js`

- [ ] **Step 1: Write the failing consistency test**

```js
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(process.cwd(), 'data', 'attractions');
const enhancedRoot = path.join(process.cwd(), 'data', 'enhanced', 'attractions');
const cities = fs.readdirSync(root).filter((name) => fs.statSync(path.join(root, name)).isDirectory());

for (const city of cities) {
  const indexPath = path.join(root, city, 'index.json');
  if (!fs.existsSync(indexPath)) continue;

  const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
  for (const attraction of index.attractions || []) {
    const basePath = path.join(root, city, `${attraction.slug}.json`);
    const enhancedPath = path.join(enhancedRoot, city, `${attraction.slug}.json`);
    assert.ok(
      fs.existsSync(basePath) || fs.existsSync(enhancedPath),
      `Missing attraction detail file for ${city}/${attraction.slug}`,
    );
  }
}

console.log('attraction dataset consistency checks passed');
```

- [ ] **Step 2: Run the new test to verify it fails**

Run: `node scripts/test-attraction-dataset-consistency.js`
Expected: FAIL on one of the 19 missing slugs

- [ ] **Step 3: Keep the loader regression test as a separate safety net**

Run: `node scripts/test-attraction-loader.js`
Expected: PASS because the runtime fallback already protects production

- [ ] **Step 4: Commit the test harness once the data repair is complete**

```bash
git add scripts/test-attraction-loader.js scripts/test-attraction-dataset-consistency.js
git commit -m "test: guard attraction dataset consistency"
```

### Task 2: Research and write the five missing Ubon Ratchathani attraction records

**Files:**
- Create: `data/enhanced/attractions/ubon-ratchathani/sao-chaliang.json`
- Create: `data/enhanced/attractions/ubon-ratchathani/prehistoric-paintings-pha-mon-noi.json`
- Create: `data/enhanced/attractions/ubon-ratchathani/soi-sawan-waterfall.json`
- Create: `data/enhanced/attractions/ubon-ratchathani/sang-chan-waterfall.json`
- Create: `data/enhanced/attractions/ubon-ratchathani/pk-riverside-resort.json`

- [ ] **Step 1: Gather primary and official sources**

Run targeted browser searches for:
- `site:tourismthailand.org Ubon Ratchathani Sao Chaliang`
- `site:tourismthailand.org Ubon Ratchathani Pha Mon Noi`
- `site:tourismthailand.org Ubon Ratchathani Soi Sawan Waterfall`
- `site:tourismthailand.org Ubon Ratchathani Sang Chan Waterfall`
- `site:tourismthailand.org Ubon Ratchathani Khong Chiam accommodation`

- [ ] **Step 2: Write conservative enhanced JSON files**

Pattern to follow:

```json
{
  "id": 10,
  "slug": "sao-chaliang",
  "name": { "en": "Sao Chaliang", "nl": "Sao Chaliang" },
  "type": "nature",
  "city_slug": "ubon-ratchathani",
  "address": "Pha Taem National Park area, Ubon Ratchathani",
  "location": null,
  "opening_hours": "Check current national park access arrangements before relying on exact same-day timing.",
  "entrance_fee": { "thb": 200, "usd": 6 },
  "description": { "en": "...", "nl": "..." },
  "highlights": ["...", "..."],
  "image": "/images/cities/generated/ubon-ratchathani.webp",
  "seo": {
    "metaTitle": { "en": "Sao Chaliang | Go2Thailand", "nl": "Sao Chaliang | Go2Thailand" },
    "metaDescription": { "en": "...", "nl": "..." }
  },
  "tags": ["ubon-ratchathani", "nature", "isaan"],
  "googleMapsUrl": "...",
  "best_time": "morning",
  "duration_hours": 1.5,
  "enhanced_description": "...",
  "detailed_history": "...",
  "visitor_experience": "...",
  "best_time_to_visit": {
    "time_of_day": "Morning",
    "duration": "About 60 to 90 minutes",
    "crowd_level": "Usually light outside Thai holiday peaks"
  },
  "practical_info": {
    "how_to_get_there": "...",
    "nearby_attractions": "...",
    "food_options": "...",
    "shopping": "Not a shopping-led stop"
  },
  "insider_tips": ["...", "..."],
  "verified_note": "...",
  "cultural_significance": "...",
  "contentSources": [
    { "name": "Official source name", "url": "https://..." },
    { "name": "Supporting source name", "url": "https://..." }
  ]
}
```

- [ ] **Step 3: Run the consistency and loader tests**

Run:
- `node scripts/test-attraction-dataset-consistency.js`
- `node scripts/test-attraction-loader.js`

Expected: fewer missing slugs than before, loader still PASS

- [ ] **Step 4: Commit the Ubon batch**

```bash
git add data/enhanced/attractions/ubon-ratchathani/*.json
git commit -m "feat: add missing ubon attraction detail records"
```

### Task 3: Research and write the five missing Nong Khai attraction records

**Files:**
- Create: `data/enhanced/attractions/nong-khai/den-ping-cave.json`
- Create: `data/enhanced/attractions/nong-khai/cliff-temple-viewpoint.json`
- Create: `data/enhanced/attractions/nong-khai/white-marble-reclining-buddha.json`
- Create: `data/enhanced/attractions/nong-khai/friendship-bridge-viewpoint.json`
- Create: `data/enhanced/attractions/nong-khai/mekong-riverside-promenade.json`

- [ ] **Step 1: Gather official Nong Khai sources**

Run targeted browser searches for:
- `site:tourismthailand.org Nong Khai Den Ping Cave`
- `site:tourismthailand.org Nong Khai reclining Buddha temple`
- `site:tourismthailand.org Nong Khai Mekong promenade`
- `site:tourismthailand.org Nong Khai Friendship Bridge viewpoint`

- [ ] **Step 2: Write the five JSON files**

Use the same field structure as Task 2, but keep promenade and viewpoint pages explicitly scoped as area or riverfront experiences rather than hard landmark claims.

- [ ] **Step 3: Run the two regression tests**

Run:
- `node scripts/test-attraction-dataset-consistency.js`
- `node scripts/test-attraction-loader.js`

- [ ] **Step 4: Commit the Nong Khai batch**

```bash
git add data/enhanced/attractions/nong-khai/*.json
git commit -m "feat: add missing nong khai attraction detail records"
```

### Task 4: Research and write the four missing Nakhon Phanom attraction records

**Files:**
- Create: `data/enhanced/attractions/nakhon-phanom/mekong-promenade-golden-naga.json`
- Create: `data/enhanced/attractions/nakhon-phanom/mekong-sunset-boat-cruise.json`
- Create: `data/enhanced/attractions/nakhon-phanom/phra-that-phanom-style-stupas.json`
- Create: `data/enhanced/attractions/nakhon-phanom/vietnamese-thai-food-street.json`

- [ ] **Step 1: Gather official Nakhon Phanom sources**

Run targeted browser searches for:
- `site:tourismthailand.org Nakhon Phanom Mekong promenade naga`
- `site:tourismthailand.org Nakhon Phanom Phra That Phanom`
- `site:tourismthailand.org Nakhon Phanom Vietnamese food`

- [ ] **Step 2: Write the four JSON files**

Use stricter wording for the boat cruise and food street entries:
- describe them as city experiences, not discrete institutions
- keep `verified_note` explicit about source limits

- [ ] **Step 3: Run the two regression tests**

Run:
- `node scripts/test-attraction-dataset-consistency.js`
- `node scripts/test-attraction-loader.js`

- [ ] **Step 4: Commit the Nakhon Phanom batch**

```bash
git add data/enhanced/attractions/nakhon-phanom/*.json
git commit -m "feat: add missing nakhon phanom attraction detail records"
```

### Task 5: Research and write the five missing Mukdahan attraction records

**Files:**
- Create: `data/enhanced/attractions/mukdahan/naga-temple-big-buddha.json`
- Create: `data/enhanced/attractions/mukdahan/mekong-riverside-promenade.json`
- Create: `data/enhanced/attractions/mukdahan/loy-krathong-mekong.json`
- Create: `data/enhanced/attractions/mukdahan/riverside-craft-beer-dining.json`
- Create: `data/enhanced/attractions/mukdahan/mukdahan-mekong-bungalows.json`

- [ ] **Step 1: Gather official Mukdahan sources**

Run targeted browser searches for:
- `site:tourismthailand.org Mukdahan big buddha naga temple`
- `site:tourismthailand.org Mukdahan Mekong riverside`
- `site:tourismthailand.org Mukdahan Loy Krathong`

- [ ] **Step 2: Write the five JSON files**

Use the same structure as prior tasks. For the softest entries (`loy-krathong-mekong`, `riverside-craft-beer-dining`, `mukdahan-mekong-bungalows`), keep copy modest and practical.

- [ ] **Step 3: Run the two regression tests**

Run:
- `node scripts/test-attraction-dataset-consistency.js`
- `node scripts/test-attraction-loader.js`

- [ ] **Step 4: Commit the Mukdahan batch**

```bash
git add data/enhanced/attractions/mukdahan/*.json
git commit -m "feat: add missing mukdahan attraction detail records"
```

### Task 6: Final verification and deploy-ready check

**Files:**
- Verify: `lib/cities.js`
- Verify: `scripts/test-attraction-loader.js`
- Verify: `scripts/test-attraction-dataset-consistency.js`
- Verify: `data/enhanced/attractions/mukdahan/*.json`
- Verify: `data/enhanced/attractions/nakhon-phanom/*.json`
- Verify: `data/enhanced/attractions/nong-khai/*.json`
- Verify: `data/enhanced/attractions/ubon-ratchathani/*.json`

- [ ] **Step 1: Run the dataset consistency test**

Run: `node scripts/test-attraction-dataset-consistency.js`
Expected: PASS

- [ ] **Step 2: Run the attraction loader regression**

Run: `node scripts/test-attraction-loader.js`
Expected: PASS

- [ ] **Step 3: Run TypeScript validation**

Run: `npx tsc --noEmit --pretty false`
Expected: exit 0

- [ ] **Step 4: Run the full build**

Run: `npm run build`
Expected: exit 0

- [ ] **Step 5: Commit the finished repair**

```bash
git add lib/cities.js scripts/test-attraction-loader.js scripts/test-attraction-dataset-consistency.js data/enhanced/attractions/mukdahan/*.json data/enhanced/attractions/nakhon-phanom/*.json data/enhanced/attractions/nong-khai/*.json data/enhanced/attractions/ubon-ratchathani/*.json
git commit -m "feat: repair missing attraction detail dataset"
```
