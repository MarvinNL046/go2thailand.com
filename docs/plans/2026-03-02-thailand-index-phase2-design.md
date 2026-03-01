# Thailand Index Phase 2 — Design Document

**Date:** 2026-03-02
**Status:** Approved
**Type:** Authority Magnet — Enrichment + 3 Subpages
**Depends on:** Phase 1 (completed 2026-03-01)

## Overview

Extend the Thailand Travel & Cost Index 2026 with three new subpages (Digital Nomad, Safety, Transport) and two enrichment data scripts. Enrichment data is AI-generated via Haiku 4.5, committed as static JSON. The aggregation pipeline merges enrichment data into the existing `thailand-index.json`.

## Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Enrichment data source | AI-generated (Haiku 4.5) | Cost-effective, matches existing ai-provider.ts pattern |
| Enrichment pipeline | Eenmalig + commit | No API calls during build, manually re-run when needed |
| Transport format | Route hub (sortable table) | Leverages existing 245 routes data, reuses components |
| Scope | All 3 subpages | Digital Nomad + Transport + Safety |

## Enrichment Data Architecture

### Script: `scripts/enrich-nomad-data.js`

Generates `data/enrichments/thailand-nomad.json`. Uses `ai-provider.ts` with Haiku 4.5 to generate structured data for all 33 cities.

```json
{
  "chiang-mai": {
    "wifi_avg_mbps": 45,
    "coworking_spaces": 50,
    "coworking_notable": ["Punspace", "CAMP", "Yellow"],
    "cafe_work_friendly": 8,
    "nomad_community_size": "large",
    "nomad_score": 0.92,
    "visa_options": ["tourist-60d", "ed-visa", "dtv"],
    "monthly_cost_usd": 800,
    "best_areas": ["Nimman", "Old City"],
    "sim_esim_available": true
  }
}
```

**Fields:**
- `wifi_avg_mbps` — Average WiFi speed in Mbps (number)
- `coworking_spaces` — Approximate count of coworking spaces (number)
- `coworking_notable` — Notable coworking space names (string[], max 3)
- `cafe_work_friendly` — Count of work-friendly cafes (number, 1-10 scale)
- `nomad_community_size` — "large" | "medium" | "small" | "minimal"
- `nomad_score` — Composite score 0-1 (weighted: wifi 0.2, coworking 0.25, cost 0.25, community 0.3)
- `visa_options` — Relevant visa types (string[])
- `monthly_cost_usd` — Estimated total monthly cost for a nomad in USD (number)
- `best_areas` — Best neighborhoods for nomads (string[], max 3)
- `sim_esim_available` — Whether eSIM is available (boolean)

### Script: `scripts/enrich-safety-data.js`

Generates `data/enrichments/thailand-safety.json`.

```json
{
  "bangkok": {
    "overall_safety_score": 0.78,
    "solo_traveller_safe": 0.82,
    "female_solo_safe": 0.75,
    "night_safety": 0.65,
    "common_risks": ["taxi-scams", "tuk-tuk-overcharging", "pickpocketing"],
    "tourist_police_available": true,
    "hospital_quality": "high",
    "emergency_numbers": {"police": 191, "tourist_police": 1155, "ambulance": 1669}
  }
}
```

**Fields:**
- `overall_safety_score` — Composite safety score 0-1 (number)
- `solo_traveller_safe` — Safety score for solo travellers 0-1 (number)
- `female_solo_safe` — Safety score for solo female travellers 0-1 (number)
- `night_safety` — Nighttime safety score 0-1 (number)
- `common_risks` — Common risks/scams (string[], slug format)
- `tourist_police_available` — Whether tourist police is present (boolean)
- `hospital_quality` — "high" | "medium" | "low"
- `emergency_numbers` — Emergency phone numbers (object)

### Enrichment Prompt Strategy

Both scripts iterate over all 33 city slugs, send a structured prompt to Haiku 4.5 requesting JSON output, validate the response, and write to the enrichment file. Rate limiting between calls to avoid API throttling.

The prompt includes:
- City name + region for context
- Existing city data (budget, population) for consistency
- Strict JSON schema to follow
- E-E-A-T instruction: conservative estimates, acknowledge uncertainty

## Aggregation Pipeline Update

`scripts/generate-index-data.js` extended to:

1. Read `data/enrichments/thailand-nomad.json` (graceful skip if missing)
2. Read `data/enrichments/thailand-safety.json` (graceful skip if missing)
3. Merge per city by slug into new fields: `nomad` and `safety` (nullable)
4. Add 2 new scores: `scores.nomad_score` and `scores.safety_score`
5. Update `overall_score` formula:
   - **With enrichment**: budget 25% + weather 25% + transport 20% + nomad 15% + safety 15%
   - **Without enrichment**: original formula (budget 35% + weather 35% + transport 30%)
6. Add 2 new rankings: `best_nomad` and `safest`
7. Update metadata with enrichment file hashes

## URL Structure

```
/thailand-index/              → Hub page (updated)
/thailand-index/budget        → Budget deep-dive (existing)
/thailand-index/best-time     → Season & weather (existing)
/thailand-index/transport     → NEW: Transport hub
/thailand-index/digital-nomad → NEW: Digital nomad guide
/thailand-index/safety        → NEW: Safety guide
```

## Page Architecture

### Transport Subpage: `/thailand-index/transport`

**Sections:**
1. **Hero** — H1: "Getting Around Thailand: Transport Hub for 33 Destinations" + stats bar (245 routes, 69 popular, most connected city)
2. **Sortable table** — All 33 cities: name, region, connections, hubness score, popular routes count, top 3 destinations
3. **Top 10 best connected** — RankingCard grid (reuse existing `most_connected` ranking)
4. **Per-region transport** — Regional breakdown with avg hubness, key routes
5. **FAQ** — 3-4 questions with FAQPage Schema.org

**Components:** Reuses `IndexTable` pattern (new `TransportTable.tsx`), `RankingCard`, `RegionFilter`, `ScoreBadge`, `TableOfContents`.

### Digital Nomad Subpage: `/thailand-index/digital-nomad`

**Sections:**
1. **Hero** — H1: "Thailand for Digital Nomads: 33 Cities Ranked on WiFi, Cost & Community"
2. **Sortable table** — All 33 cities: name, WiFi (Mbps), coworking count, monthly cost (USD), nomad score, community size
3. **Top 10 nomad cities** — RankingCard grid
4. **Per-region nomad overview** — Regional breakdown
5. **Visa quick-reference** — Table with visa types, duration, cost, requirements
6. **SIM/eSIM guide** — Provider overview (AIS, DTAC, TrueMove)
7. **Link to /expat/** — For deeper Bangkok-specific info
8. **FAQ** — 3-4 questions with FAQPage Schema.org

**Components:** New `NomadTable.tsx`, `VisaTable.tsx`. Reuses `RankingCard`, `RegionFilter`, `ScoreBadge`, `TableOfContents`.

### Safety Subpage: `/thailand-index/safety`

**Sections:**
1. **Hero** — H1: "How Safe is Thailand? Safety Scores for 33 Destinations"
2. **Sortable table** — All 33 cities: name, overall safety, solo safe, female solo, night safety, hospital quality
3. **Top 10 safest cities** — RankingCard grid
4. **Common risks** — Grouped by type (scams, theft, traffic, nature) with descriptions
5. **Emergency info** — Universal emergency numbers + per-city tourist police
6. **Per-region safety overview** — Regional breakdown
7. **FAQ** — 3-4 questions with FAQPage Schema.org

**Components:** New `SafetyTable.tsx`, `RiskCard.tsx`. Reuses `RankingCard`, `RegionFilter`, `ScoreBadge`, `TableOfContents`.

### Hub Page Update: `/thailand-index/`

Extend existing hub with:
- 2 extra columns in main table: Nomad score, Safety score (null-safe, show "-" when no data)
- "Nomad Preview" section: Top 5 + "Full digital nomad guide →"
- "Safety Preview" section: Top 5 + "Full safety guide →"
- Transport section gets link to transport subpage
- 3 extra links in "Explore the Index" grid
- Updated methodology section with enrichment data explanation

## New Components

| Component | Purpose |
|-----------|---------|
| `components/index/TransportTable.tsx` | Transport-specific sortable table: hubness, connections, top routes |
| `components/index/NomadTable.tsx` | Nomad-specific sortable table: wifi, coworking, cost, score |
| `components/index/SafetyTable.tsx` | Safety-specific sortable table: multiple safety scores |
| `components/index/VisaTable.tsx` | Visa quick-reference table (type, duration, cost) |
| `components/index/RiskCard.tsx` | Risk type card with category icon + description |

### Reused Components

- `ScoreBadge.tsx` — Score display (0-1)
- `RankingCard.tsx` — Top 10 ranking cards
- `RegionFilter.tsx` — Region filter chips
- `TableOfContents.tsx` — Sticky TOC sidebar
- `MonthMatrix.tsx` — (not used in Phase 2 pages)

## TypeScript Type Updates

Add to `lib/thailand-index.ts`:

```typescript
export interface CityNomad {
  wifi_avg_mbps: number;
  coworking_spaces: number;
  coworking_notable: string[];
  cafe_work_friendly: number;
  nomad_community_size: 'large' | 'medium' | 'small' | 'minimal';
  nomad_score: number;
  visa_options: string[];
  monthly_cost_usd: number;
  best_areas: string[];
  sim_esim_available: boolean;
}

export interface CitySafety {
  overall_safety_score: number;
  solo_traveller_safe: number;
  female_solo_safe: number;
  night_safety: number;
  common_risks: string[];
  tourist_police_available: boolean;
  hospital_quality: 'high' | 'medium' | 'low';
  emergency_numbers: Record<string, number>;
}
```

`IndexCity` gets 2 new nullable fields:
```typescript
nomad: CityNomad | null;
safety: CitySafety | null;
```

`CityScores` gets 2 new nullable fields:
```typescript
nomad_score: number | null;
safety_score: number | null;
```

New ranking names: `'best_nomad' | 'safest'`

## Schema.org Markup

- All 3 new subpages: `Article` + `FAQPage`
- Hub page: existing markup unchanged, new sections use existing patterns

## Sitemap Update

Add 3 new pages to `lib/sitemap.js`:
- `/thailand-index/transport/`
- `/thailand-index/digital-nomad/`
- `/thailand-index/safety/`

## Build Order

1. Enrichment scripts (eenmalig, niet in build pipeline)
2. Run enrichment scripts, review output, commit data
3. Update aggregation script to merge enrichments
4. Update TypeScript types
5. Build 3 new pages + update hub
6. Update sitemap
7. Build verification

## Phasing Within Phase 2

### Phase 2a (Enrichment + Pipeline)
- `scripts/enrich-nomad-data.js`
- `scripts/enrich-safety-data.js`
- Run scripts, review, commit enrichment data
- Update `scripts/generate-index-data.js` to merge enrichments
- Update `lib/thailand-index.ts` types

### Phase 2b (Pages)
- Transport subpage + `TransportTable.tsx`
- Digital Nomad subpage + `NomadTable.tsx` + `VisaTable.tsx`
- Safety subpage + `SafetyTable.tsx` + `RiskCard.tsx`
- Hub page update (new columns, preview sections, explore links)
- Sitemap update
- Build verification
