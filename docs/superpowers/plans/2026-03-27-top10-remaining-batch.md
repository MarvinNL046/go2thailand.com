# Remaining Top-10 Cluster Batch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade every remaining pending city in `top10-upgrade-tracker.json` to the same AdSense-safe, EEAT-oriented quality bar as the finished Ayutthaya top-10 cluster.

**Architecture:** Reuse the hardened shared city top-10 templates, then work city-by-city through the tracker. For each city, audit the 3 top-10 data files, replace scrape-era or first-person content with source-backed editorial picks, validate the 3 live routes on localhost, then mark the tracker entry done and commit in sensible batches.

**Tech Stack:** Next.js pages router, JSON data in `data/top10`, `top10-upgrade-tracker.json`, local validation with `jq`, `npx tsc --noEmit`, localhost render checks on `127.0.0.1:3010`, and web fact-checking against official and primary sources.

---

### Task 1: Sequential Tracker Execution

**Files:**
- Modify: `top10-upgrade-tracker.json`
- Modify: `data/top10/[slug]-attractions.json`
- Modify: `data/top10/[slug]-restaurants.json`
- Modify: `data/top10/[slug]-hotels.json`

- [ ] **Step 1: Read the next pending city from the tracker**

Run:
```bash
node -e 'const t=require("./top10-upgrade-tracker.json"); console.log(t.cities.find(c => c.status === "pending"))'
```
Expected: one pending city slug.

- [ ] **Step 2: Audit the three top-10 JSON files and the three rendered routes**

Run:
```bash
rg -n "tripadvisor|trip_affiliate_url|affiliate_url|review_count|scraped|rating|I " data/top10/[slug]-attractions.json data/top10/[slug]-restaurants.json data/top10/[slug]-hotels.json
curl -I http://127.0.0.1:3010/city/[slug]/top-10-attractions/
curl -I http://127.0.0.1:3010/city/[slug]/top-10-restaurants/
curl -I http://127.0.0.1:3010/city/[slug]/top-10-hotels/
```
Expected: clear evidence of what still needs cleanup and `200` route status before/after edits.

### Task 2: Fact-Check and Rewrite Each City Cluster

**Files:**
- Modify: `data/top10/[slug]-attractions.json`
- Modify: `data/top10/[slug]-restaurants.json`
- Modify: `data/top10/[slug]-hotels.json`

- [ ] **Step 1: Gather durable sources before keeping unstable claims**

Implementation:
- attractions: official tourism boards, UNESCO, Fine Arts, museums, transport authorities, official attraction sites
- restaurants: MICHELIN first, then official restaurant/hotel pages
- hotels: official property pages first, then brand/operator pages

- [ ] **Step 2: Rewrite weak files to remove scrape-era and thin content**

Implementation:
- remove `scraped`, ratings, review counts, affiliate URLs, TripAdvisor leftovers, and first-person story filler
- keep only source-backed shortlist logic with visible `content_sources`
- prefer durable wording over exact fees, hours, and price claims unless strongly verified and worth keeping

### Task 3: Validate and Track Per City

**Files:**
- Modify: `top10-upgrade-tracker.json`

- [ ] **Step 1: Run JSON, TypeScript, and render validation**

Run:
```bash
jq empty data/top10/[slug]-attractions.json
jq empty data/top10/[slug]-restaurants.json
jq empty data/top10/[slug]-hotels.json
jq empty top10-upgrade-tracker.json
npx tsc --noEmit
curl -s http://127.0.0.1:3010/city/[slug]/top-10-attractions/ > /tmp/[slug]-top10-attractions.html
curl -s http://127.0.0.1:3010/city/[slug]/top-10-restaurants/ > /tmp/[slug]-top10-restaurants.html
curl -s http://127.0.0.1:3010/city/[slug]/top-10-hotels/ > /tmp/[slug]-top10-hotels.html
```
Expected: all commands succeed and all 3 routes render.

- [ ] **Step 2: Scan rendered HTML for leftovers**

Run:
```bash
rg -n "TripAdvisor|review_count|tpo\\.lv|klook|getyourguide|booking\\.com|trip\\.com|noindex|isAccessibleForFree" /tmp/[slug]-top10-*.html
```
Expected: no matches.

- [ ] **Step 3: Mark the city done only after validation**

Implementation:
- update the specific tracker entry with `status: "done"`
- add concise notes only if useful

### Task 4: Commit In Sensible Batches

**Files:**
- Modify: `top10-upgrade-tracker.json`
- Modify: `docs/superpowers/plans/2026-03-27-top10-remaining-batch.md`

- [ ] **Step 1: Commit after each sensible batch**

Run:
```bash
git add data/top10/*.json top10-upgrade-tracker.json docs/superpowers/plans/2026-03-27-top10-remaining-batch.md
git commit -m "Upgrade [city or batch] top-10 cluster"
```
Expected: clean, reviewable commit history without touching unrelated worktree changes.

- [ ] **Step 2: Continue automatically until there are no pending cities or a real blocker appears**

Implementation:
- do not wait for another user prompt between cities
- only interrupt for a blocker that cannot be resolved from local context or primary-source research
