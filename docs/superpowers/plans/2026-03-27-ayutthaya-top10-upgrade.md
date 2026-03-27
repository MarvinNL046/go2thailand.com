# Ayutthaya Top-10 Cluster Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the Ayutthaya `/top-10-attractions/`, `/top-10-restaurants/`, and `/top-10-hotels/` routes to the same AdSense-safe, EEAT-oriented quality bar as the finished city clusters.

**Architecture:** Keep Ayutthaya's existing top-10 data where it is already source-backed, then remove weak shared-template behavior that still leaks `noindex`, scrape-era badges, ratings, review-counts, affiliate-heavy CTAs, and inaccurate attraction schema. Validate on localhost and only then mark Ayutthaya done in the new top-10 tracker.

**Tech Stack:** Next.js pages router, JSON data files in `data/top10`, static generation via `getStaticProps`, local validation with `jq`, TypeScript, and localhost render checks.

---

### Task 1: Verify Ayutthaya Cluster Inputs

**Files:**
- Modify: `top10-upgrade-tracker.json`
- Check: `data/top10/ayutthaya-attractions.json`
- Check: `data/top10/ayutthaya-restaurants.json`
- Check: `data/top10/ayutthaya-hotels.json`

- [ ] **Step 1: Confirm Ayutthaya is the first pending city**

Run:
```bash
node -e 'const t=require("./top10-upgrade-tracker.json"); console.log(t.cities.find(c => c.status === "pending"))'
```
Expected: first pending slug is `ayutthaya`.

- [ ] **Step 2: Inspect existing Ayutthaya top-10 JSON for scrape-era leftovers**

Run:
```bash
rg -n "tripadvisor|trip_affiliate_url|affiliate_url|review_count|scraped" data/top10/ayutthaya-*.json
```
Expected: no matches, or only matches that will be intentionally removed before validation.

### Task 2: Harden Shared City Top-10 Templates

**Files:**
- Modify: `pages/city/[slug]/top-10-attractions.tsx`
- Modify: `pages/city/[slug]/top-10-restaurants.tsx`
- Modify: `pages/city/[slug]/top-10-hotels.tsx`

- [ ] **Step 1: Remove indexability and trust issues from upgraded top-10 pages**

Implementation:
- remove `noindex, follow` from the data-backed renders
- replace scrape-era badge blocks with neutral source-review trust text
- remove review-count, rating, and scrape-source UI from item cards
- remove inaccurate `isAccessibleForFree` schema claims

- [ ] **Step 2: Remove affiliate-heavy legacy blocks that weaken the editorial signal**

Implementation:
- remove route-level affiliate boxes, booking widgets, and booking-platform CTA blocks from the three shared templates
- keep internal navigation and source sections intact

### Task 3: Tighten Ayutthaya Data Where Needed

**Files:**
- Modify: `data/top10/ayutthaya-attractions.json`
- Modify: `data/top10/ayutthaya-restaurants.json`
- Modify: `data/top10/ayutthaya-hotels.json`

- [ ] **Step 1: Verify unstable claims against strong sources**

Implementation:
- confirm attraction framing against UNESCO and Go Ayutthaya pages
- confirm restaurant shortlist against MICHELIN and official restaurant/hotel pages where needed
- confirm hotel shortlist against official hotel sites

- [ ] **Step 2: Rewrite only if the current data still contains weak or brittle copy**

Implementation:
- prefer durable wording over exact price, hours, and fee claims
- keep visible source references renderable through `content_sources`

### Task 4: Validate, Track, and Commit

**Files:**
- Modify: `top10-upgrade-tracker.json`

- [ ] **Step 1: Validate JSON and TypeScript**

Run:
```bash
jq empty data/top10/ayutthaya-attractions.json
jq empty data/top10/ayutthaya-restaurants.json
jq empty data/top10/ayutthaya-hotels.json
jq empty top10-upgrade-tracker.json
npx tsc --noEmit
```
Expected: all commands exit successfully.

- [ ] **Step 2: Verify localhost render output**

Run:
```bash
curl -I http://127.0.0.1:3010/city/ayutthaya/top-10-attractions/
curl -I http://127.0.0.1:3010/city/ayutthaya/top-10-restaurants/
curl -I http://127.0.0.1:3010/city/ayutthaya/top-10-hotels/
```
Expected: all routes return `200`.

- [ ] **Step 3: Scan rendered HTML for legacy leakage**

Run:
```bash
curl -s http://127.0.0.1:3010/city/ayutthaya/top-10-attractions/ | rg -n "TripAdvisor|review_count|isAccessibleForFree|tpo\\.lv|klook|getyourguide|trip\\.com"
curl -s http://127.0.0.1:3010/city/ayutthaya/top-10-restaurants/ | rg -n "TripAdvisor|review_count|tpo\\.lv|trip\\.com|booking\\.com"
curl -s http://127.0.0.1:3010/city/ayutthaya/top-10-hotels/ | rg -n "TripAdvisor|review_count|tpo\\.lv|trip\\.com|booking\\.com"
```
Expected: no matches.

- [ ] **Step 4: Mark Ayutthaya done and commit**

Run:
```bash
git add pages/city/[slug]/top-10-attractions.tsx pages/city/[slug]/top-10-restaurants.tsx pages/city/[slug]/top-10-hotels.tsx data/top10/ayutthaya-attractions.json data/top10/ayutthaya-restaurants.json data/top10/ayutthaya-hotels.json top10-upgrade-tracker.json docs/superpowers/plans/2026-03-27-ayutthaya-top10-upgrade.md
git commit -m "Upgrade Ayutthaya top-10 cluster"
```
Expected: clean commit for the Ayutthaya top-10 batch.
