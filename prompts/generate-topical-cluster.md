# Topical Cluster Generator — go2-thailand.com

Generate ONE new topical cluster page per run. Work through clusters in order. Track progress in `data/topical-cluster-progress.json`.

## Core Rules

1. **ZERO HALLUCINATIONS** — Every fact must come from existing data files OR verified via WebSearch/WebFetch. If you can't verify, don't include it.
2. **E-E-A-T** — Real data, real prices, real hours. Cite sources. Mark anything unverified.
3. **Concise** — Short paragraphs. No filler. No "amazing" or "beautiful" without substance. 3 good sentences beat 10 mediocre ones.
4. **Bilingual** — Use `{"en": "...", "nl": "..."}` pattern where the existing data supports it. EN-only is fine for new data.
5. **Internal links** — Every new page needs 5+ cross-section links. Audit after creation.
6. **Build + push** — `npx next build` must pass. Then commit + push.

## Progress Tracking

Read `data/topical-cluster-progress.json`. If it doesn't exist, create it:
```json
{
  "current_cluster": "temples",
  "current_step": "infrastructure",
  "completed_pages": [],
  "clusters": {
    "temples": { "status": "in_progress", "pages_created": 0 },
    "nomad-cities": { "status": "pending", "pages_created": 0 },
    "safety": { "status": "pending", "pages_created": 0 },
    "beaches": { "status": "pending", "pages_created": 0 },
    "festivals": { "status": "pending", "pages_created": 0 },
    "markets": { "status": "pending", "pages_created": 0 }
  }
}
```

## Per-Run Workflow

1. Read progress file
2. Determine what to do next (infrastructure OR next page)
3. If infrastructure needed: create hub page + template + data helpers
4. If creating/enriching a page: web search for real data → verify → update JSON → ensure template renders
5. Audit new page for internal links (5+ cross-section). Fix until PASS.
6. `npx next build` — must pass
7. Commit: `git add [files]` then `git commit -m "content(cluster): add [description]"`
8. Push: `git stash && git pull --rebase origin main && git stash pop && git push`
9. Update progress file, commit+push that too
10. STOP — one page per run

## Design Patterns

Follow existing site conventions:
- `bg-surface-cream` page background
- `bg-white rounded-2xl shadow-md` content cards
- `font-heading` for headings
- `text-thailand-blue` for links
- `section-label` + `section-title` for section headers
- Breadcrumbs component
- JSON-LD structured data in Head
- ISR with 86400s revalidation

---

## CLUSTER 1: TEMPLES

**Data:** `data/temples.json` (16 temples with entry fees, hours, descriptions, Google Maps queries)
**Existing:** `pages/thailand-temples.tsx` (single list page — keep as-is, will become secondary)

### Infrastructure (Run 1):
- Create `pages/temples/index.tsx` — Hub page listing all temples, sortable by city/region
- Create `pages/temples/[slug].tsx` — Detail template reading from temples data
- Create `lib/temples.ts` — Helper functions: `getAllTemples()`, `getTempleBySlug()`
- Add slugs to each temple in `data/temples.json` (e.g., "wat-pho", "wat-arun")
- Use `getStaticPaths` + `getStaticProps` with ISR 86400

### Per-temple enrichment (Run 2-17, one temple per run):
- Pick next unenriched temple from data
- **WebSearch** to verify and add:
  - Full address (Thai + English)
  - Current entry fee (search "[temple name] entry fee 2025" or "2026")
  - Current opening hours
  - Dress code requirements (specific: long pants? covered shoulders? sarong rental?)
  - How to get there from city center (BTS station, bus number, taxi cost)
  - 3 concise visitor tips
  - Nearby temples (for cross-linking)
- Update temple in `data/temples.json` with verified enrichments
- Template auto-renders from data

### Expanding beyond 16 (Run 18+):
- WebSearch: "best temples in [city]" for each major city
- Add only temples you can verify with real data (name, location, fee)
- Target: 30-40 total temples across Thailand
- Priority cities: Ayutthaya (5+ temple ruins), Sukhothai (3+), Chiang Mai (3 more), Bangkok (2 more), Nakhon Si Thammarat, Phimai

### Temple page content structure:
```
Breadcrumbs: Home > Temples > [Temple Name]
Hero: Temple name, city, type badge
Quick Facts card: Entry fee | Hours | Dress code | Address
Description: 2-3 paragraphs MAX (from data + enrichment)
Key Facts: Bullet list
Getting There: 1-2 sentences with transport options
Visitor Tips: 3-4 bullets
Nearby Temples: Links to other temples in same city
JSON-LD: TouristAttraction schema
Cross-links: /city/[slug]/, /temples/, /transport/, /food/, /thailand-for-first-timers/
```

---

## CLUSTER 2: DIGITAL NOMAD CITIES

**Data:** `data/enrichments/thailand-nomad.json` (33 cities, complete with wifi, coworking, costs)

### Infrastructure (Run 1):
- Create `pages/nomad/index.tsx` — Hub with sortable table (nomad_score, cost, wifi, coworking count)
- Create `pages/nomad/[slug].tsx` — City detail template
- Create `lib/nomad.ts` — Helpers reading from nomad JSON

### Per-city pages (Run 2-34, one city per run):
- Start with highest nomad_score cities first
- **WebSearch** to verify per city:
  - Top 3 coworking spaces still operational (name, approx monthly price)
  - Average 1BR apartment rent (from Hipflat, FazWaz, or Nomadlist)
  - Internet speed verification (from Speedtest or Nomadlist)
  - Any active nomad communities (Facebook groups, meetups)
- Update data, template auto-renders

### Nomad page content structure:
```
Breadcrumbs: Home > Digital Nomad Guide > [City]
Nomad Score badge (color-coded)
Quick Stats: WiFi speed | Coworking spaces | Monthly cost | Community size
Best Areas: List from data with 1-sentence descriptions
Coworking Spaces: Verified names with brief descriptions
Cost Breakdown: Rent, food, transport, coworking (from data + enrichment)
Visa Options: Links to /visa/ pages
Cross-links: /city/[slug]/, /visa/, /esim/, /thailand-index/digital-nomad, /travel-security/
```

---

## CLUSTER 3: SAFETY PER CITY

**Data:** `data/enrichments/thailand-safety.json` (33 cities with scores, risks, emergency info)

### Infrastructure (Run 1):
- Create `pages/safety/index.tsx` — Hub with safety ranking table
- Create `pages/safety/[slug].tsx` — City safety detail
- Create `lib/safety.ts` — Helpers

### Per-city pages (Run 2-34):
- **WebSearch** per city:
  - Nearest international hospital name
  - Any specific scams reported for this city (search "[city] tourist scams")
  - Safe vs less-safe neighborhoods
  - Recent travel advisories (if any)
- Keep it factual and concise — not fear-mongering

### Safety page content structure:
```
Breadcrumbs: Home > Safety Guide > [City]
Safety Score badge (green/yellow/red based on score)
Quick Stats: Overall | Solo | Female Solo | Night Safety scores
Common Risks: From data, with brief explanations
Emergency Numbers: Police, Tourist Police, Ambulance
Hospitals: Verified name(s)
Tips: 4-5 concise safety tips specific to this city
Cross-links: /city/[slug]/, /is-thailand-safe/, /travel-insurance-thailand/, /practical-info/, /visa/
```

---

## CLUSTER 4: BEACHES

**Data:** `data/beaches/best-beaches.json` (25 beaches, bilingual, with vibe/budget/best_months)

### Infrastructure (Run 1):
- Create `pages/beaches/index.tsx` — Hub with filter by region, vibe, budget
- Create `pages/beaches/[slug].tsx` — Beach detail
- Create `lib/beaches.ts` — Helpers
- Add slugs to beach data if missing

### Per-beach pages (Run 2-26):
- **WebSearch** per beach:
  - How to get there (from nearest city/airport)
  - Current access conditions (boat schedule if island beach)
  - Parking/facilities available
  - Water safety notes (currents, jellyfish season)
  - 1-2 nearby restaurants or food options
- Keep descriptions from existing bilingual data

### Beach page content structure:
```
Breadcrumbs: Home > Beaches > [Beach Name]
Hero: Beach name, island/location, region badge
Quick Facts: Best months | Vibe | Crowd level | Budget level
Description: From existing bilingual data
Highlights: Bullet list from data
Best For: Activity tags
Getting There: From web search
Tips: 3-4 bullets
Cross-links: /islands/[slug]/, /best-beaches-in-thailand/, /best-diving-snorkeling-in-thailand/, /transport/
```

---

## CLUSTER 5: FESTIVALS

**Data:** `data/monthly-guides.json` (basic festival mentions per month)

### Infrastructure (Run 1):
- Create `data/festivals.json` via WebSearch — verify each festival:
  - Name (EN + TH romanized)
  - Typical dates/period
  - Main location(s)
  - Description (2-3 sentences)
  - What to expect (3-4 bullets)
  - Tourist tips (2-3 bullets)
  - Entry fee (usually free)
- Start with 15 major festivals
- Create `pages/festivals/index.tsx` — Calendar-style hub
- Create `pages/festivals/[slug].tsx` — Detail template
- Create `lib/festivals.ts`

### Per-festival pages (Run 2-16):
- Enrich each festival with WebSearch:
  - Exact dates for 2026 (search "[festival name] 2026 dates")
  - Best locations to experience it
  - What to wear/bring
  - Safety tips during festival
  - Photography tips

### Festival page content:
```
Breadcrumbs: Home > Festivals > [Festival Name]
Hero: Festival name, date, main location
Quick Facts: When | Where | Duration | Cost
Description: 2-3 paragraphs
What to Expect: Bullets
Tips: 3-4 concise bullets
Best Locations: Cities/areas to experience it
Cross-links: /thailand-in/[month]/, /city/[slug]/, /best-places-to-visit-thailand/, /food/
```

---

## CLUSTER 6: MARKETS

**Data:** `data/street-food.json` (25 street food items — for cross-reference)

### Infrastructure (Run 1):
- Create `data/markets.json` via WebSearch — verify each market:
  - Name (EN + TH)
  - City, address
  - Type (night market, floating, weekend, walking street)
  - Opening days + hours
  - What's sold
  - Must-try items (2-3)
  - How to get there
  - Tips
- Start with 20 major markets
- Create `pages/markets/index.tsx`, `pages/markets/[slug].tsx`, `lib/markets.ts`

### Per-market pages (Run 2-21):
- Enrich with WebSearch:
  - Verify still operational + current hours
  - Best time to visit (avoid crowds)
  - Nearest BTS/transport
  - Price ranges for common items
  - Must-try food stalls (verified names if possible)

### Market page content:
```
Breadcrumbs: Home > Markets > [Market Name]
Hero: Market name, city, type badge
Quick Facts: Open days | Hours | Type | Nearest transport
Description: 2-3 paragraphs
What to Buy/Eat: Categorized list
Must-Try: 2-3 specific items with prices
Tips: 3-4 bullets (bargaining, timing, etc.)
Cross-links: /food/, /city/[slug]/, /nightlife/, /transport/, /best-places-to-visit-thailand/
```

---

## Quality Checklist (every page)

- [ ] All facts verified via web search or existing data
- [ ] No generic filler ("amazing", "stunning" without substance)
- [ ] Concise — could anything be cut without losing value?
- [ ] 5+ internal cross-links to different site sections
- [ ] JSON-LD structured data
- [ ] Breadcrumbs
- [ ] Meta title < 60 chars, meta description 150-160 chars
- [ ] ISR 86400 revalidation
- [ ] `npx next build` passes
- [ ] Committed and pushed
