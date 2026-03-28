# Evergreen Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the remaining Thailand-wide evergreen editorial pages and related hub/index pages into source-backed, non-thin, AdSense-safe, EEAT-oriented clusters with stronger internal linking and visibly cited sources.

**Architecture:** Build this as two linked workflows: one tracker for nationwide editorial pillar pages and one tracker for their related hubs. Add shared validation so every route is checked for render health, visible sources, indexing state, and commercial leakage before it is marked done. Implement topic clusters in paired order so the pillar page and the supporting hub layer become coherent at the same time.

**Tech Stack:** Next.js pages router, TypeScript, JSON trackers/runbooks, localhost render checks via `curl`, repo scripts under `scripts/`, manual web fact-checking with primary sources.

---

## File Structure

### Workflow and tracking

- Create: `EVERGREEN_EDITORIAL_UPGRADE_RUNBOOK.md`
- Create: `EVERGREEN_HUB_UPGRADE_RUNBOOK.md`
- Create: `evergreen-editorial-upgrade-tracker.json`
- Create: `evergreen-hub-upgrade-tracker.json`
- Create: `scripts/check-evergreen-route.js`
- Create: `scripts/check-evergreen-cluster.js`

### Editorial pillars

- Modify: `pages/best-beaches-in-thailand.tsx`
- Modify: `pages/thailand-islands.tsx`
- Modify: `pages/thailand-temples.tsx`
- Modify: `pages/thailand-street-food.tsx`
- Modify: `pages/best-cooking-classes-in-thailand.tsx`
- Modify: `pages/best-muay-thai-in-thailand.tsx`
- Modify: `pages/best-elephant-sanctuaries-in-thailand.tsx`
- Modify: `pages/best-diving-snorkeling-in-thailand.tsx`

### Related hubs and cluster pages

- Modify: `pages/activities/index.tsx`
- Modify: `pages/islands/index.tsx`
- Modify: `pages/islands/[slug].tsx`
- Modify: `pages/practical-info/index.tsx`
- Modify: `pages/practical-info/[slug].tsx`
- Modify: `pages/blog/index.tsx`
- Modify: `pages/blog/[slug].tsx`
- Modify: `pages/blog/category/[category].tsx`
- Modify: `pages/blog/tag/[tag].tsx`
- Modify: `pages/itineraries/index.tsx`
- Modify: `pages/itineraries/[slug].tsx`

### Shared cleanup targets

- Modify: `components/AffiliateBox.tsx`
- Modify: `components/FoodAffiliateCTA.tsx`
- Modify: `components/PreFooterAffiliateBanner.tsx`
- Modify: `components/blog/Sources.tsx`
- Modify: `lib/affiliates.ts`
- Modify: `lib/affiliate-intents.ts`
- Modify: `lib/pipeline/affiliate-injector.ts`
- Modify: `lib/ai/perplexity-client.js`

## Task 1: Create the runbooks and trackers

**Files:**
- Create: `EVERGREEN_EDITORIAL_UPGRADE_RUNBOOK.md`
- Create: `EVERGREEN_HUB_UPGRADE_RUNBOOK.md`
- Create: `evergreen-editorial-upgrade-tracker.json`
- Create: `evergreen-hub-upgrade-tracker.json`

- [ ] **Step 1: Add the editorial runbook**

Create `EVERGREEN_EDITORIAL_UPGRADE_RUNBOOK.md` with:

```md
# Evergreen Editorial Upgrade Runbook

Use this runbook for the nationwide editorial pillars:

- /best-beaches-in-thailand/
- /thailand-islands/
- /thailand-temples/
- /thailand-street-food/
- /best-cooking-classes-in-thailand/
- /best-muay-thai-in-thailand/
- /best-elephant-sanctuaries-in-thailand/
- /best-diving-snorkeling-in-thailand/

Requirements:
- Use web search for unstable facts.
- Prefer official sources, TAT, DNP, UNESCO, MICHELIN, official venue/operator pages, transport authorities, and other primary references.
- No generic AI filler.
- No invented first-person stories.
- No TripAdvisor-style review spam.
- No unsupported exact price claims unless strongly verified and worth keeping.
- Keep visible source links in rendered HTML.
- Keep affiliate links secondary to editorial value.

Validation before marking a route done:
- jq empty on the tracker after any update
- npx tsc --noEmit
- localhost render check
- rendered HTML leak scan
- visible source-signals check
- indexing decision recorded
```

- [ ] **Step 2: Add the hub runbook**

Create `EVERGREEN_HUB_UPGRADE_RUNBOOK.md` with:

```md
# Evergreen Hub Upgrade Runbook

Use this runbook for the related hub and index layers:

- /activities/
- /islands/
- /practical-info/
- /blog/
- /itineraries/
- related category, tag, and slug pages where the hub system still behaves as thin or affiliate-first

Requirements:
- Hubs must be editorial navigation layers, not affiliate directories.
- Use web search for unstable claims.
- Show visible source links when the route template supports them.
- Remove generic “best deals”, “guest reviews”, and similar scrape-era copy.
- Remove or demote weak internal links.
- Record an explicit indexing decision for each route.
```

- [ ] **Step 3: Add the editorial tracker**

Create `evergreen-editorial-upgrade-tracker.json` with this structure:

```json
{
  "updated_at": "2026-03-28T00:00:00Z",
  "project": "go2thailand evergreen editorial upgrade tracker",
  "goal": "Upgrade Thailand-wide editorial pillar pages into source-backed, non-thin, AdSense-safe, EEAT-oriented pages.",
  "execution": {
    "mode": "sequential",
    "cluster_order": [
      "beaches-islands",
      "temples-practical-info",
      "street-food-blog",
      "cooking-classes-activities",
      "muay-thai-activities",
      "elephant-sanctuaries-activities",
      "diving-snorkeling-activities"
    ],
    "next_pending": "/best-beaches-in-thailand/"
  },
  "routes": [
    {
      "route": "/best-beaches-in-thailand/",
      "cluster": "beaches-islands",
      "status": "pending",
      "needs_rewrite": true,
      "sources_verified": false,
      "render_validated": false,
      "indexing_decision": "",
      "notes": ""
    }
  ]
}
```

- [ ] **Step 4: Add the hub tracker**

Create `evergreen-hub-upgrade-tracker.json` with this structure:

```json
{
  "updated_at": "2026-03-28T00:00:00Z",
  "project": "go2thailand evergreen hub upgrade tracker",
  "goal": "Upgrade related hub and index pages into non-thin, editorial-led navigation layers.",
  "execution": {
    "mode": "sequential",
    "next_pending": "/islands/"
  },
  "routes": [
    {
      "route": "/islands/",
      "cluster": "beaches-islands",
      "status": "pending",
      "needs_rewrite": true,
      "sources_verified": false,
      "render_validated": false,
      "indexing_decision": "",
      "notes": ""
    }
  ]
}
```

- [ ] **Step 5: Populate both trackers with the real route lists**

Editorial tracker routes:

```json
[
  "/best-beaches-in-thailand/",
  "/thailand-islands/",
  "/thailand-temples/",
  "/thailand-street-food/",
  "/best-cooking-classes-in-thailand/",
  "/best-muay-thai-in-thailand/",
  "/best-elephant-sanctuaries-in-thailand/",
  "/best-diving-snorkeling-in-thailand/"
]
```

Hub tracker routes:

```json
[
  "/activities/",
  "/islands/",
  "/islands/[slug]/",
  "/practical-info/",
  "/practical-info/[slug]/",
  "/blog/",
  "/blog/[slug]/",
  "/blog/category/[category]/",
  "/blog/tag/[tag]/",
  "/itineraries/",
  "/itineraries/[slug]/"
]
```

- [ ] **Step 6: Verify the tracker files are valid**

Run:

```bash
jq empty evergreen-editorial-upgrade-tracker.json
jq empty evergreen-hub-upgrade-tracker.json
```

Expected: no output, exit code `0` for both commands.

- [ ] **Step 7: Commit the workflow scaffolding**

Run:

```bash
git add EVERGREEN_EDITORIAL_UPGRADE_RUNBOOK.md EVERGREEN_HUB_UPGRADE_RUNBOOK.md evergreen-editorial-upgrade-tracker.json evergreen-hub-upgrade-tracker.json
git commit -m "Add evergreen cleanup runbooks and trackers"
```

## Task 2: Add shared evergreen validation helpers

**Files:**
- Create: `scripts/check-evergreen-route.js`
- Create: `scripts/check-evergreen-cluster.js`

- [ ] **Step 1: Add a per-route validator**

Create `scripts/check-evergreen-route.js`:

```js
#!/usr/bin/env node
const { execSync } = require('child_process');

const route = process.argv[2];
const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:3011';

if (!route) {
  console.error('Usage: node scripts/check-evergreen-route.js /route/');
  process.exit(1);
}

const url = `${baseUrl}${route}`;
const html = execSync(`curl -fsSL '${url}'`, { encoding: 'utf8' });

const forbidden = [
  /TripAdvisor/i,
  /guest reviews/i,
  /best deals/i,
  /current prices/i,
  /current rates/i,
  /24\\/7 updated/i,
  /GetYourGuide/i,
  /Klook/i,
  /Booking\\.com/i,
  /review_count/i,
  /trip_affiliate/i,
  /affiliate_url/i
];

const required = /(Sources|Source:|Official site|Official website|MICHELIN|UNESCO|Tourism Authority of Thailand|Department of National Parks|Fine Arts Department)/i;

for (const pattern of forbidden) {
  if (pattern.test(html)) {
    console.error(`Forbidden match: ${pattern}`);
    process.exit(1);
  }
}

if (!required.test(html)) {
  console.error('Missing visible source signals');
  process.exit(1);
}

console.log(`evergreen route check passed for ${route}`);
```

- [ ] **Step 2: Add a cluster validator**

Create `scripts/check-evergreen-cluster.js`:

```js
#!/usr/bin/env node
const { execSync } = require('child_process');

const routes = process.argv.slice(2);
if (routes.length === 0) {
  console.error('Usage: node scripts/check-evergreen-cluster.js /route-a/ /route-b/');
  process.exit(1);
}

for (const route of routes) {
  execSync(`node scripts/check-evergreen-route.js '${route}'`, { stdio: 'inherit' });
}
```

- [ ] **Step 3: Verify the helpers work on a known-clean route**

Run:

```bash
BASE_URL=http://127.0.0.1:3011 node scripts/check-evergreen-route.js /top-10/
```

Expected: either a clean pass on a known-safe test route or an intentional adjustment to the helper if the route is not a good fixture. Do not proceed until the helper behaves predictably.

- [ ] **Step 4: Commit the validation helpers**

Run:

```bash
git add scripts/check-evergreen-route.js scripts/check-evergreen-cluster.js
git commit -m "Add evergreen validation helpers"
```

## Task 3: Rebuild the beaches and islands cluster

**Files:**
- Modify: `pages/best-beaches-in-thailand.tsx`
- Modify: `pages/thailand-islands.tsx`
- Modify: `pages/islands/index.tsx`
- Modify: `pages/islands/[slug].tsx`
- Modify: `evergreen-editorial-upgrade-tracker.json`
- Modify: `evergreen-hub-upgrade-tracker.json`

- [ ] **Step 1: Audit the existing beaches and islands pages**

Run:

```bash
rg -n "Booking.com|Klook|GetYourGuide|best deals|guest reviews|current prices|current rates|affiliate" pages/best-beaches-in-thailand.tsx pages/thailand-islands.tsx pages/islands/index.tsx pages/islands/[slug].tsx
```

Expected: multiple matches confirming the current affiliate-led state.

- [ ] **Step 2: Gather fresh sources before rewriting**

Collect and keep a working source list for:

```text
- TAT beaches and island destination references
- Department of National Parks pages where marine parks are discussed
- official ferry/operator references where transport claims are kept
- official island or provincial tourism pages
```

Record only source-backed claims worth keeping.

- [ ] **Step 3: Rewrite the two editorial pillars**

Apply these changes:

```text
- remove large affiliate CTA sections
- replace generic shortlist framing with topic logic and tradeoffs
- keep a limited, defensible selection structure
- add visible source links and editorial trust signals
- route users to the strongest city or island pages instead of booking brands
```

- [ ] **Step 4: Rework the islands hubs**

Apply these changes:

```text
- make /islands/ a real discovery hub
- remove affiliate-box dominance from /islands/[slug]/
- keep onward links focused on strong comparison, practical, or destination pages
- record explicit indexing decisions in the hub tracker
```

- [ ] **Step 5: Validate the beaches-islands cluster**

Run:

```bash
npx tsc --noEmit
BASE_URL=http://127.0.0.1:3011 node scripts/check-evergreen-cluster.js /best-beaches-in-thailand/ /thailand-islands/ /islands/
```

Also manually check:

```bash
curl -I http://127.0.0.1:3011/islands/
curl -I http://127.0.0.1:3011/best-beaches-in-thailand/
curl -I http://127.0.0.1:3011/thailand-islands/
```

- [ ] **Step 6: Update both trackers and commit**

Run:

```bash
jq empty evergreen-editorial-upgrade-tracker.json
jq empty evergreen-hub-upgrade-tracker.json
git add pages/best-beaches-in-thailand.tsx pages/thailand-islands.tsx pages/islands/index.tsx pages/islands/[slug].tsx evergreen-editorial-upgrade-tracker.json evergreen-hub-upgrade-tracker.json
git commit -m "Upgrade beaches and islands evergreen cluster"
```

## Task 4: Rebuild the temples and practical-info cluster

**Files:**
- Modify: `pages/thailand-temples.tsx`
- Modify: `pages/practical-info/index.tsx`
- Modify: `pages/practical-info/[slug].tsx`
- Modify: `evergreen-editorial-upgrade-tracker.json`
- Modify: `evergreen-hub-upgrade-tracker.json`

- [ ] **Step 1: Audit the temples and practical-info pages**

Run:

```bash
rg -n "Booking.com|Klook|GetYourGuide|best deals|guest reviews|current prices|current rates|affiliate" pages/thailand-temples.tsx pages/practical-info/index.tsx pages/practical-info/[slug].tsx
```

- [ ] **Step 2: Build a source set for temple and practical claims**

Use sources like:

```text
- UNESCO
- Fine Arts Department
- TAT
- official temple or authority pages where useful
- official visa or transport authorities only for claims worth keeping
```

- [ ] **Step 3: Rewrite the temples pillar**

Apply:

```text
- shift from affiliate-led tours framing to temple-type and planning logic
- strip Klook/GetYourGuide/Booking blocks that outrun editorial value
- add visible sources and internal links to strong city temple pages
```

- [ ] **Step 4: Rebuild practical-info hubs**

Apply:

```text
- remove booking-brand-first navigation
- keep only practical route groupings with real utility
- tighten sub-pages so they do not act as affiliate wrappers
```

- [ ] **Step 5: Validate and commit**

Run:

```bash
npx tsc --noEmit
BASE_URL=http://127.0.0.1:3011 node scripts/check-evergreen-cluster.js /thailand-temples/ /practical-info/
jq empty evergreen-editorial-upgrade-tracker.json
jq empty evergreen-hub-upgrade-tracker.json
git add pages/thailand-temples.tsx pages/practical-info/index.tsx pages/practical-info/[slug].tsx evergreen-editorial-upgrade-tracker.json evergreen-hub-upgrade-tracker.json
git commit -m "Upgrade temples and practical info cluster"
```

## Task 5: Rebuild the street-food and blog cluster

**Files:**
- Modify: `pages/thailand-street-food.tsx`
- Modify: `pages/blog/index.tsx`
- Modify: `pages/blog/[slug].tsx`
- Modify: `pages/blog/category/[category].tsx`
- Modify: `pages/blog/tag/[tag].tsx`
- Modify: `components/blog/Sources.tsx`
- Modify: `evergreen-editorial-upgrade-tracker.json`
- Modify: `evergreen-hub-upgrade-tracker.json`

- [ ] **Step 1: Audit the street-food and blog pages**

Run:

```bash
rg -n "Booking.com|Klook|GetYourGuide|best deals|guest reviews|current prices|current rates|affiliate" pages/thailand-street-food.tsx pages/blog/index.tsx pages/blog/[slug].tsx pages/blog/category/[category].tsx pages/blog/tag/[tag].tsx
```

- [ ] **Step 2: Gather sources**

Keep a working list using:

```text
- MICHELIN
- TAT food references
- official market, venue, or tourism pages when useful
```

- [ ] **Step 3: Rewrite the street-food pillar**

Apply:

```text
- replace affiliate-heavy tour framing with cuisine, city, and market logic
- add visible sources
- link to strong city food and top-10 restaurant pages
```

- [ ] **Step 4: Rework the blog hub system**

Apply:

```text
- make /blog/ and category/tag pages editorial discovery hubs
- reduce cross-sell blocks
- ensure visible source treatment is available where the post template supports it
```

- [ ] **Step 5: Validate and commit**

Run:

```bash
npx tsc --noEmit
BASE_URL=http://127.0.0.1:3011 node scripts/check-evergreen-cluster.js /thailand-street-food/ /blog/
jq empty evergreen-editorial-upgrade-tracker.json
jq empty evergreen-hub-upgrade-tracker.json
git add pages/thailand-street-food.tsx pages/blog/index.tsx pages/blog/[slug].tsx pages/blog/category/[category].tsx pages/blog/tag/[tag].tsx components/blog/Sources.tsx evergreen-editorial-upgrade-tracker.json evergreen-hub-upgrade-tracker.json
git commit -m "Upgrade street food and blog cluster"
```

## Task 6: Rebuild the activity editorial cluster and activities hub

**Files:**
- Modify: `pages/best-cooking-classes-in-thailand.tsx`
- Modify: `pages/best-muay-thai-in-thailand.tsx`
- Modify: `pages/best-elephant-sanctuaries-in-thailand.tsx`
- Modify: `pages/best-diving-snorkeling-in-thailand.tsx`
- Modify: `pages/activities/index.tsx`
- Modify: `components/FoodAffiliateCTA.tsx`
- Modify: `components/AffiliateBox.tsx`
- Modify: `components/PreFooterAffiliateBanner.tsx`
- Modify: `evergreen-editorial-upgrade-tracker.json`
- Modify: `evergreen-hub-upgrade-tracker.json`

- [ ] **Step 1: Audit the activity pages and hub**

Run:

```bash
rg -n "Booking.com|Klook|GetYourGuide|best deals|guest reviews|current prices|current rates|affiliate" pages/best-cooking-classes-in-thailand.tsx pages/best-muay-thai-in-thailand.tsx pages/best-elephant-sanctuaries-in-thailand.tsx pages/best-diving-snorkeling-in-thailand.tsx pages/activities/index.tsx components/FoodAffiliateCTA.tsx components/AffiliateBox.tsx components/PreFooterAffiliateBanner.tsx
```

- [ ] **Step 2: Gather topic-specific primary sources**

Keep only defensible sources:

```text
- official schools or venues
- DNP or official park pages
- TAT
- ethical sanctuary/operator pages where suitable
- official dive operator or marine park references
```

- [ ] **Step 3: Rewrite each editorial pillar**

Apply:

```text
- cooking classes: city-based selection logic, visible sources, no urgency-booking copy
- muay thai: training-vs-fight-vs-visitor framing, visible sources, no platform-led CTA structure
- elephant sanctuaries: ethical selection criteria and source-backed caveats, no marketplace-led framing
- diving/snorkeling: area and season logic, source-backed operator/park framing, no marketplace-led framing
```

- [ ] **Step 4: Rebuild the activities hub and shared affiliate components**

Apply:

```text
- /activities/ becomes an editorial topic index, not a partner-brand launcher
- shared affiliate components are reduced, demoted, or removed where they overpower the page
- any remaining affiliate element must be secondary and not introduce forbidden leak terms in cluster HTML
```

- [ ] **Step 5: Validate and commit**

Run:

```bash
npx tsc --noEmit
BASE_URL=http://127.0.0.1:3011 node scripts/check-evergreen-cluster.js /best-cooking-classes-in-thailand/ /best-muay-thai-in-thailand/ /best-elephant-sanctuaries-in-thailand/ /best-diving-snorkeling-in-thailand/ /activities/
jq empty evergreen-editorial-upgrade-tracker.json
jq empty evergreen-hub-upgrade-tracker.json
git add pages/best-cooking-classes-in-thailand.tsx pages/best-muay-thai-in-thailand.tsx pages/best-elephant-sanctuaries-in-thailand.tsx pages/best-diving-snorkeling-in-thailand.tsx pages/activities/index.tsx components/FoodAffiliateCTA.tsx components/AffiliateBox.tsx components/PreFooterAffiliateBanner.tsx evergreen-editorial-upgrade-tracker.json evergreen-hub-upgrade-tracker.json
git commit -m "Upgrade evergreen activity cluster"
```

## Task 7: Rebuild the itineraries hub and itinerary detail system

**Files:**
- Modify: `pages/itineraries/index.tsx`
- Modify: `pages/itineraries/[slug].tsx`
- Modify: `evergreen-hub-upgrade-tracker.json`

- [ ] **Step 1: Audit the itinerary pages**

Run:

```bash
rg -n "Booking.com|Klook|GetYourGuide|best deals|guest reviews|current prices|current rates|affiliate" pages/itineraries/index.tsx pages/itineraries/[slug].tsx
```

- [ ] **Step 2: Reframe the itinerary system**

Apply:

```text
- make /itineraries/ an editorial planning hub
- remove “best deals” and booking-platform-first sections from /itineraries/[slug]/
- keep internal links toward strong city and practical pages
```

- [ ] **Step 3: Validate and commit**

Run:

```bash
npx tsc --noEmit
BASE_URL=http://127.0.0.1:3011 node scripts/check-evergreen-cluster.js /itineraries/
jq empty evergreen-hub-upgrade-tracker.json
git add pages/itineraries/index.tsx pages/itineraries/[slug].tsx evergreen-hub-upgrade-tracker.json
git commit -m "Upgrade itineraries evergreen hub"
```

## Task 8: Harden the content pipeline and finish the campaign

**Files:**
- Modify: `lib/ai/perplexity-client.js`
- Modify: `lib/pipeline/affiliate-injector.ts`
- Modify: `lib/affiliate-intents.ts`
- Modify: `lib/affiliates.ts`
- Modify: `evergreen-editorial-upgrade-tracker.json`
- Modify: `evergreen-hub-upgrade-tracker.json`

- [ ] **Step 1: Remove scrape-era generation prompts**

Change `lib/ai/perplexity-client.js` so prompts no longer request:

```text
- current prices
- recent reviews or ratings
- guest reviews
- search-domain filters centered on tripadvisor.com, booking.com, or agoda.com
```

- [ ] **Step 2: Reduce auto-injected affiliate pressure**

Change `lib/pipeline/affiliate-injector.ts`, `lib/affiliate-intents.ts`, and `lib/affiliates.ts` so shared automation no longer reintroduces:

```text
- “See Deals on Booking.com”
- “Browse Activities on Klook”
- “Browse Tours on GetYourGuide”
- automatic CTA density that makes editorial pages read like affiliate wrappers
```

- [ ] **Step 3: Final full-campaign validation**

Run:

```bash
jq empty evergreen-editorial-upgrade-tracker.json
jq empty evergreen-hub-upgrade-tracker.json
npx tsc --noEmit
BASE_URL=http://127.0.0.1:3011 node scripts/check-evergreen-cluster.js /best-beaches-in-thailand/ /thailand-islands/ /thailand-temples/ /thailand-street-food/ /best-cooking-classes-in-thailand/ /best-muay-thai-in-thailand/ /best-elephant-sanctuaries-in-thailand/ /best-diving-snorkeling-in-thailand/ /activities/ /islands/ /practical-info/ /blog/ /itineraries/
```

- [ ] **Step 4: Confirm tracker end-state**

Run:

```bash
node - <<'NODE'
const fs = require('fs');
for (const file of ['evergreen-editorial-upgrade-tracker.json', 'evergreen-hub-upgrade-tracker.json']) {
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const pending = data.routes.filter(route => route.status !== 'done');
  console.log(file, { pending: pending.length, next_pending: data.execution.next_pending });
}
NODE
```

Expected:

```text
evergreen-editorial-upgrade-tracker.json { pending: 0, next_pending: null }
evergreen-hub-upgrade-tracker.json { pending: 0, next_pending: null }
```

- [ ] **Step 5: Commit the pipeline hardening and final tracker state**

Run:

```bash
git add lib/ai/perplexity-client.js lib/pipeline/affiliate-injector.ts lib/affiliate-intents.ts lib/affiliates.ts evergreen-editorial-upgrade-tracker.json evergreen-hub-upgrade-tracker.json
git commit -m "Finish evergreen cleanup campaign"
```
