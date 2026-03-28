# City Support Clusters Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create the runbook, tracker, and execution scaffolding for upgrading every city support cluster to a source-backed, non-thin, AdSense-safe, EEAT-oriented quality bar.

**Architecture:** Keep the support-route implementation inside the existing Next.js pages-router city cluster, but add a dedicated operational layer for support upgrades: one runbook, one sequential tracker, and one repeatable validation pattern. The tracker will treat all nine support routes as one city-level unit so a city only becomes `done` when the full support cluster is clean.

**Tech Stack:** Markdown runbooks in repo root, JSON tracker data, Next.js pages router, existing city slug data from `lib/cities`, local validation with `jq`, `npx tsc --noEmit`, and localhost render checks.

---

### Task 1: Create the support-cluster runbook

**Files:**
- Create: `CITY_SUPPORT_UPGRADE_RUNBOOK.md`
- Reference: `CITY_UPGRADE_RUNBOOK.md`
- Reference: `TOP10_UPGRADE_RUNBOOK.md`

- [ ] **Step 1: Write the runbook header and goal**

Create `CITY_SUPPORT_UPGRADE_RUNBOOK.md` with this opening structure:

```md
# City Support Cluster Upgrade Runbook

Use this runbook to upgrade `/city/[slug]/` support routes to the current Go2Thailand quality bar.

## Goal

Each English city support cluster should be:

- non-thin
- AdSense-safe
- EEAT-oriented
- source-backed
- internally coherent
- free of stale legacy claims in rendered HTML

This applies to:

- `/city/[slug]/food/`
- `/city/[slug]/hotels/`
- `/city/[slug]/attractions/`
- `/city/[slug]/best-time-to-visit/`
- `/city/[slug]/budget/`
- `/city/[slug]/cooking-classes/`
- `/city/[slug]/muay-thai/`
- `/city/[slug]/elephant-sanctuaries/`
- `/city/[slug]/diving-snorkeling/`
```

- [ ] **Step 2: Add the quality and source rules**

Add a `## Quality Rules` section that explicitly includes:

```md
- Use web search for fact checking on unstable facts.
- Prefer official sources, official venue pages, official hotel pages, airport or transport authorities, MICHELIN, TAT, UNESCO, Fine Arts Department, and other strong primary references.
- Do not invent first-person stories, local encounters, or personal anecdotes.
- Do not keep vague AI filler, fake insider framing, or generic planning copy.
- Do not lean on TripAdvisor-style ratings, review counts, or scraped review snippets.
- Do not use unsupported exact prices unless the source is clear and current enough to defend.
- Prefer durable wording over brittle exact numbers when pricing, schedules, or logistics may change.
- Source links should be visible in rendered output where the template supports them.
- If an internal link points to something weak or missing, improve that target or stop linking to it.
- Do not let affiliate modules outrun the editorial value of the page.
```

- [ ] **Step 3: Add the standard workflow**

Create a `## Standard Workflow` section with these subsections and checks:

```md
### 1. Audit the full support cluster

Check:

- rendered `/city/[slug]/food/`
- rendered `/city/[slug]/hotels/`
- rendered `/city/[slug]/attractions/`
- rendered `/city/[slug]/best-time-to-visit/`
- rendered `/city/[slug]/budget/`
- rendered `/city/[slug]/cooking-classes/`
- rendered `/city/[slug]/muay-thai/`
- rendered `/city/[slug]/elephant-sanctuaries/`
- rendered `/city/[slug]/diving-snorkeling/`
- shared templates used by those routes
- relevant data in `data/enhanced/[slug].json`
- relevant attraction detail/index data where linked

Look for:

- first-person AI filler
- stale exact price claims
- unsupported review or rating language
- affiliate-heavy sections that dominate the route
- weak fallback copy
- hidden legacy fields leaking into `__NEXT_DATA__`
- thin internal links
- noindex rules that no longer match the route quality
```

Also add subsections for:

- source gathering before rewriting
- shared template cleanup when a weak pattern affects multiple cities
- internal-link review across the cluster
- route-by-route indexing review based on actual page quality

- [ ] **Step 4: Add the validation gates and pass criteria**

Add a `## Validation Gates` section that includes these commands:

```bash
jq empty data/enhanced/[slug].json
npx tsc --noEmit
curl -s http://127.0.0.1:3010/city/[slug]/food/
curl -s http://127.0.0.1:3010/city/[slug]/hotels/
curl -s http://127.0.0.1:3010/city/[slug]/attractions/
curl -s http://127.0.0.1:3010/city/[slug]/best-time-to-visit/
curl -s http://127.0.0.1:3010/city/[slug]/budget/
curl -s http://127.0.0.1:3010/city/[slug]/cooking-classes/
curl -s http://127.0.0.1:3010/city/[slug]/muay-thai/
curl -s http://127.0.0.1:3010/city/[slug]/elephant-sanctuaries/
curl -s http://127.0.0.1:3010/city/[slug]/diving-snorkeling/
```

Then add pass criteria stating a city is `done` only if:

```md
- all 9 support routes render `200` or are intentionally kept noindex with strong non-thin content
- no first-person AI copy remains in rendered English HTML
- no stale rating-spam or scrape-era copy remains
- no stale affiliate-first or booking-first template leak dominates the page
- visible source-backed trust signals are present where supported
- internal links point only to strong pages
- materially unstable claims are web-fact-checked
```

- [ ] **Step 5: Validate the runbook file**

Run:

```bash
sed -n '1,260p' CITY_SUPPORT_UPGRADE_RUNBOOK.md
```

Expected: the file reads as a complete standalone workflow with no placeholders or missing route scope.

- [ ] **Step 6: Commit the runbook**

Run:

```bash
git add CITY_SUPPORT_UPGRADE_RUNBOOK.md
git commit -m "Add city support cluster upgrade runbook"
```

Expected: one commit containing only the new runbook.

### Task 2: Create the sequential support-cluster tracker

**Files:**
- Create: `city-support-upgrade-tracker.json`
- Reference: `city-upgrade-tracker.json`
- Reference: `top10-upgrade-tracker.json`

- [ ] **Step 1: Write the tracker metadata and done definition**

Create `city-support-upgrade-tracker.json` with this top-level shape:

```json
{
  "updated_at": "2026-03-28T00:00:00.000Z",
  "project": "go2thailand city support cluster upgrade tracker",
  "goal": "Upgrade all English city support clusters to source-backed, non-thin, AdSense-safe, EEAT-oriented pages.",
  "scope": [
    "/city/[slug]/food/",
    "/city/[slug]/hotels/",
    "/city/[slug]/attractions/",
    "/city/[slug]/best-time-to-visit/",
    "/city/[slug]/budget/",
    "/city/[slug]/cooking-classes/",
    "/city/[slug]/muay-thai/",
    "/city/[slug]/elephant-sanctuaries/",
    "/city/[slug]/diving-snorkeling/"
  ],
  "done_definition": [
    "all support routes in scope render 200 or remain intentionally noindex with strong content",
    "rendered English HTML contains no stale first-person AI copy",
    "rendered English HTML contains no scrape-era review or rating spam",
    "rendered English HTML contains no affiliate-first template leakage that outruns editorial value",
    "material unstable claims are web-fact-checked",
    "source-backed trust signals are present where supported",
    "internal links point only to strong pages"
  ],
  "cities": []
}
```

- [ ] **Step 2: Seed the city list in fixed sequential order**

Populate `cities` with the same 33 slugs already used in the city and top-10 trackers. For each city, add this structure:

```json
{
  "slug": "ayutthaya",
  "status": "pending",
  "routes": {
    "food": "pending",
    "hotels": "pending",
    "attractions": "pending",
    "best_time_to_visit": "pending",
    "budget": "pending",
    "cooking_classes": "pending",
    "muay_thai": "pending",
    "elephant_sanctuaries": "pending",
    "diving_snorkeling": "pending"
  },
  "notes": ""
}
```

Use the same city order as the existing trackers, starting with `ayutthaya` and ending with `udon-thani`.

- [ ] **Step 3: Add sequential execution helpers**

Extend the tracker so the top level also includes:

```json
{
  "execution": {
    "mode": "sequential",
    "start_rule": "Start with the first pending city and continue in order.",
    "current_city": "ayutthaya",
    "next_pending": "ayutthaya"
  }
}
```

This is the lightweight task-list layer the user asked for. It must make the next city obvious without requiring re-deciding scope in every session.

- [ ] **Step 4: Validate the tracker JSON**

Run:

```bash
jq empty city-support-upgrade-tracker.json
```

Expected: exit code `0`

- [ ] **Step 5: Commit the tracker**

Run:

```bash
git add city-support-upgrade-tracker.json
git commit -m "Add city support cluster upgrade tracker"
```

Expected: one commit containing only the new tracker.

### Task 3: Create the execution handoff document for sequential runs

**Files:**
- Create: `docs/superpowers/plans/2026-03-28-city-support-remaining-batch.md`
- Reference: `docs/superpowers/plans/2026-03-27-top10-remaining-batch.md`
- Reference: `CITY_SUPPORT_UPGRADE_RUNBOOK.md`
- Reference: `city-support-upgrade-tracker.json`

- [ ] **Step 1: Create the remaining-batch handoff header**

Add this structure to `docs/superpowers/plans/2026-03-28-city-support-remaining-batch.md`:

```md
# City Support Remaining Batch

## Operating Rules

- Follow `CITY_SUPPORT_UPGRADE_RUNBOOK.md`
- Use `city-support-upgrade-tracker.json` as source of truth
- Start with `execution.next_pending`
- Work city by city in sequence
- Do not mark a city `done` until the full support cluster passes validation
- Commit in sensible batches
- Stop only for real blockers
```

- [ ] **Step 2: Add the per-city execution checklist**

Add this checklist verbatim:

```md
## Per-City Checklist

1. Audit `/city/[slug]/food/`
2. Audit `/city/[slug]/hotels/`
3. Audit `/city/[slug]/attractions/`
4. Audit `/city/[slug]/best-time-to-visit/`
5. Audit `/city/[slug]/budget/`
6. Audit `/city/[slug]/cooking-classes/`
7. Audit `/city/[slug]/muay-thai/`
8. Audit `/city/[slug]/elephant-sanctuaries/`
9. Audit `/city/[slug]/diving-snorkeling/`
10. Fix shared template issues before patching city-by-city around them
11. Gather web-fact-checked primary sources
12. Rewrite or harden weak route content
13. Fix internal links
14. Remove stale legacy leaks from rendered HTML and `__NEXT_DATA__`
15. Validate locally
16. Update tracker only after the city passes
17. Continue to the next pending city
```

- [ ] **Step 3: Add the validation command block**

Include this exact block:

```bash
jq empty data/enhanced/[slug].json
npx tsc --noEmit
for route in food hotels attractions best-time-to-visit budget cooking-classes muay-thai elephant-sanctuaries diving-snorkeling; do
  curl -I -s "http://127.0.0.1:3010/city/[slug]/${route}/" | head -n 1
done
```

Then note that HTML leak checks must be run for stale AI copy, scrape leftovers, affiliate-first copy, and missing source signals.

- [ ] **Step 4: Commit the execution handoff doc**

Run:

```bash
git add docs/superpowers/plans/2026-03-28-city-support-remaining-batch.md
git commit -m "Add city support cluster batch handoff"
```

Expected: one commit containing only the handoff doc.

### Task 4: Audit the shared support templates before city-by-city rollout

**Files:**
- Modify: `pages/city/[slug]/food.tsx`
- Modify: `pages/city/[slug]/hotels.tsx`
- Modify: `pages/city/[slug]/attractions.tsx`
- Modify: `pages/city/[slug]/best-time-to-visit.tsx`
- Modify: `pages/city/[slug]/budget.tsx`
- Modify: `pages/city/[slug]/cooking-classes.tsx`
- Modify: `pages/city/[slug]/muay-thai.tsx`
- Modify: `pages/city/[slug]/elephant-sanctuaries.tsx`
- Modify: `pages/city/[slug]/diving-snorkeling.tsx`

- [ ] **Step 1: Record the known shared risks before editing**

Use this checklist as the audit baseline:

```md
- noindex rules that may no longer match route quality
- affiliate-heavy CTAs dominating the route
- stale review/rating presentation
- deal-driven or booking-driven headings
- weak fallback copy
- inaccurate schema
- missing visible source signals
- weak sideways/internal-link logic
```

- [ ] **Step 2: Run a focused source-string audit against the shared templates**

Run:

```bash
rg -n "TripAdvisor|review_count|tpo\\.lv|booking\\.tpo\\.lv|trip\\.tpo\\.lv|getyourguide\\.tpo\\.lv|klook\\.tpo\\.lv|Best Deals|guest reviews|current prices|current rates" \
  pages/city/[slug]/food.tsx \
  pages/city/[slug]/hotels.tsx \
  pages/city/[slug]/attractions.tsx \
  pages/city/[slug]/best-time-to-visit.tsx \
  pages/city/[slug]/budget.tsx \
  pages/city/[slug]/cooking-classes.tsx \
  pages/city/[slug]/muay-thai.tsx \
  pages/city/[slug]/elephant-sanctuaries.tsx \
  pages/city/[slug]/diving-snorkeling.tsx
```

Expected: a concrete list of template-layer cleanup targets before the first city execution.

- [ ] **Step 3: Commit only if shared template fixes are actually made**

If template cleanup is part of this task, commit with:

```bash
git add pages/city/[slug]/food.tsx \
  pages/city/[slug]/hotels.tsx \
  pages/city/[slug]/attractions.tsx \
  pages/city/[slug]/best-time-to-visit.tsx \
  pages/city/[slug]/budget.tsx \
  pages/city/[slug]/cooking-classes.tsx \
  pages/city/[slug]/muay-thai.tsx \
  pages/city/[slug]/elephant-sanctuaries.tsx \
  pages/city/[slug]/diving-snorkeling.tsx
git commit -m "Harden shared city support templates"
```

Expected: skip this commit if the task was audit-only and no code changed.

### Task 5: Verify the planning and tracking layer end to end

**Files:**
- Verify: `CITY_SUPPORT_UPGRADE_RUNBOOK.md`
- Verify: `city-support-upgrade-tracker.json`
- Verify: `docs/superpowers/plans/2026-03-28-city-support-remaining-batch.md`

- [ ] **Step 1: Run the full non-code verification set**

Run:

```bash
jq empty city-support-upgrade-tracker.json
npx tsc --noEmit
git diff --check
```

Expected:

- `jq empty` exits `0`
- `npx tsc --noEmit` exits `0`
- `git diff --check` reports no whitespace or conflict-marker issues in the newly added workflow files

- [ ] **Step 2: Re-read the runbook and tracker against the approved spec**

Confirm the final workflow includes:

```md
- all 9 routes in scope
- mandatory web fact-checking
- visible source expectations
- strong internal-link requirements
- sequential next-pending execution
- city-level done gating for the full support cluster
```

- [ ] **Step 3: Commit any final wording or consistency fixes**

Run:

```bash
git add CITY_SUPPORT_UPGRADE_RUNBOOK.md city-support-upgrade-tracker.json docs/superpowers/plans/2026-03-28-city-support-remaining-batch.md
git commit -m "Finalize city support cluster workflow"
```

Expected: only needed if small cleanup edits were required after verification.
