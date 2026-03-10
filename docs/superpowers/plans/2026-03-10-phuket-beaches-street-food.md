# Phuket Beaches & Thailand Street Food Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create two new SEO hub pages (`/phuket-beaches/` and `/thailand-street-food/`) targeting low-KD keywords from Ahrefs gap analysis.

**Architecture:** Data-driven hub pages following the established pattern (thailand-islands.tsx / thailand-temples.tsx). JSON data files with real scraped data, locale-aware getStaticProps, interactive filters, schema.org structured data, and affiliate CTAs.

**Tech Stack:** Next.js 14 Pages Router, TypeScript, Tailwind CSS, ISR (86400s)

---

## Chunk 1: Phuket Beaches Page

### Task 1: Create Phuket Beaches Data File

**Files:**
- Create: `data/phuket-beaches.json`

- [ ] **Step 1: Write data/phuket-beaches.json with real scraped beach data**

Contains 15 Phuket beaches with verified data: names, Thai names, coast location, vibe, crowd level, best_for, description, length, access info, nearby landmarks, best_time, google_maps_query.

- [ ] **Step 2: Validate JSON is valid**

Run: `node -e "JSON.parse(require('fs').readFileSync('data/phuket-beaches.json'))"`
Expected: No output (valid JSON)

### Task 2: Create Phuket Beaches Page

**Files:**
- Create: `pages/phuket-beaches.tsx`
- Reference: `pages/thailand-islands.tsx` (pattern to follow)

- [ ] **Step 1: Create pages/phuket-beaches.tsx**

Follow the thailand-islands.tsx pattern exactly:
- SEOHead with title "Phuket Beaches — 15 Best Beaches Ranked (2026)"
- schema.org ItemList + FAQPage + BreadcrumbList
- Filters: coast (west/east/south/north) + vibe (family/party/quiet/snorkeling)
- Beach cards with rank badge, coast badge, vibe tags, info grid
- FAQ section with 3 real questions
- Affiliate CTAs (Booking, Klook, 12Go)
- Cross-links to /best-beaches-in-thailand/, /city/phuket/, /thailand-islands/
- getStaticProps with locale-aware JSON loading

- [ ] **Step 2: Verify build**

Run: `npx next build`
Expected: Build succeeds, /phuket-beaches/ page generated

- [ ] **Step 3: Commit**

```bash
git add data/phuket-beaches.json pages/phuket-beaches.tsx
git commit -m "feat: add Phuket beaches hub page with real beach data (SV 1.9K, KD 1)"
```

---

## Chunk 2: Thailand Street Food Page

### Task 3: Create Street Food Data File

**Files:**
- Create: `data/street-food.json`

- [ ] **Step 1: Write data/street-food.json with real scraped dish data**

Contains 25 Thai street food dishes with verified data: names, Thai names, type, price_range in THB, spice_level, description, where_to_find (specific markets), best_cities, key_facts, google_maps_query.

- [ ] **Step 2: Validate JSON is valid**

Run: `node -e "JSON.parse(require('fs').readFileSync('data/street-food.json'))"`
Expected: No output (valid JSON)

### Task 4: Create Thailand Street Food Page

**Files:**
- Create: `pages/thailand-street-food.tsx`
- Reference: `pages/thailand-islands.tsx` (pattern to follow)

- [ ] **Step 1: Create pages/thailand-street-food.tsx**

Follow the thailand-islands.tsx pattern:
- SEOHead with title "Thailand Street Food — 25 Must-Try Dishes & Prices (2026)"
- schema.org ItemList + FAQPage + BreadcrumbList
- Filters: type (noodles/rice/grilled/soup/dessert/drink) + spice (mild/medium/hot)
- Dish cards with rank, type badge, price tag, spice indicator, description, where to find
- FAQ section with 3 real questions
- Affiliate CTAs
- Cross-links to city restaurant pages, nightlife
- getStaticProps with locale-aware JSON loading

- [ ] **Step 2: Verify build**

Run: `npx next build`
Expected: Build succeeds, /thailand-street-food/ page generated

- [ ] **Step 3: Commit**

```bash
git add data/street-food.json pages/thailand-street-food.tsx
git commit -m "feat: add Thailand street food hub page with real dish data (SV 600, KD 7)"
```

---

## Chunk 3: Final Build Verification

### Task 5: Full Build & Cross-link Verification

- [ ] **Step 1: Run full build**

Run: `npx next build`
Expected: Build succeeds with 0 errors

- [ ] **Step 2: Verify both pages render**

Check that both pages appear in build output as static pages.
