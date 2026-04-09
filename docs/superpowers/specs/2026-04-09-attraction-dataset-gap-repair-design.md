# Attraction Dataset Gap Repair Design

## Goal

Repair the attraction dataset so every slug listed in `data/attractions/*/index.json` resolves to a real detail record, while raising source quality and EEAT standards for the 19 currently index-only attractions in `mukdahan`, `nakhon-phanom`, `nong-khai`, and `ubon-ratchathani`.

## Problem

The production error came from `getAttractionBySlug()` attempting to load attraction detail files that do not exist for some slugs. A runtime fallback now prevents crashes, but the dataset itself is still incomplete. The current gaps are:

- `mukdahan/naga-temple-big-buddha`
- `mukdahan/mekong-riverside-promenade`
- `mukdahan/loy-krathong-mekong`
- `mukdahan/riverside-craft-beer-dining`
- `mukdahan/mukdahan-mekong-bungalows`
- `nakhon-phanom/mekong-promenade-golden-naga`
- `nakhon-phanom/mekong-sunset-boat-cruise`
- `nakhon-phanom/phra-that-phanom-style-stupas`
- `nakhon-phanom/vietnamese-thai-food-street`
- `nong-khai/den-ping-cave`
- `nong-khai/cliff-temple-viewpoint`
- `nong-khai/white-marble-reclining-buddha`
- `nong-khai/friendship-bridge-viewpoint`
- `nong-khai/mekong-riverside-promenade`
- `ubon-ratchathani/sao-chaliang`
- `ubon-ratchathani/prehistoric-paintings-pha-mon-noi`
- `ubon-ratchathani/soi-sawan-waterfall`
- `ubon-ratchathani/sang-chan-waterfall`
- `ubon-ratchathani/pk-riverside-resort`

## Constraints

- Use conservative, source-backed claims only.
- Prefer primary and official sources:
  - TAT destination and article pages
  - Tourism Product pages
  - National park / museum / temple / public authority pages where available
- Avoid inflating soft concepts into hard “must-see attraction” claims.
- Keep file format aligned with existing high-quality attraction detail JSON in `data/enhanced/attractions/*/*.json`.
- Add verification so this class of dataset gap cannot silently return.

## Data Quality Rules

### 1. Hard attraction vs soft experience

The 19 missing entries are not equally strong:

- Strong landmark-like entries:
  - `sao-chaliang`
  - `prehistoric-paintings-pha-mon-noi`
  - `soi-sawan-waterfall`
  - `sang-chan-waterfall`
  - `naga-temple-big-buddha`
  - `den-ping-cave`
  - `white-marble-reclining-buddha`
- Medium-confidence district or promenade entries:
  - `mekong-riverside-promenade`
  - `friendship-bridge-viewpoint`
  - `mekong-promenade-golden-naga`
  - `cliff-temple-viewpoint`
- Softest entries:
  - `mekong-sunset-boat-cruise`
  - `vietnamese-thai-food-street`
  - `riverside-craft-beer-dining`
  - `mukdahan-mekong-bungalows`
  - `pk-riverside-resort`
  - `loy-krathong-mekong`

For the softest entries, content must read like a contextual local experience or area recommendation, not a formally bounded attraction page with invented authority.

### 2. Source policy

Each generated file must contain:

- `contentSources`: at least 2 sources when possible
- `verified_note`: a plain-English note describing source quality and any limits

Preferred source stack:

1. Official destination source or public authority source
2. Official venue / museum / temple / park source when available
3. TAT / Tourism Product article or destination listing
4. Google Maps only as navigation support, not as sole factual basis

### 3. Claim policy

Allowed:

- Location framing
- What the place is
- Why it is relevant locally
- Practical route value
- Conservative visit planning advice

Not allowed unless explicitly sourced:

- Exact operating hours stated as fact
- Exact ticket prices stated as current fact without official support
- Superlatives such as “best”, “largest”, “most famous” unless source-backed
- Event recurrence claims unless official event/tourism source supports them

## Output Format

Each missing attraction becomes a real detail file, preferably under:

- `data/enhanced/attractions/<city>/<slug>.json`

Each file should include:

- `id`
- `slug`
- `name`
- `type`
- `city_slug`
- `address`
- `location`
- `opening_hours`
- `entrance_fee`
- `description`
- `highlights`
- `image`
- `seo`
- `tags`
- `googleMapsUrl`
- `best_time`
- `duration_hours`
- `enhanced_description`
- `detailed_history`
- `visitor_experience`
- `best_time_to_visit`
- `practical_info`
- `insider_tips`
- `verified_note`
- `cultural_significance`
- `contentSources`

If a field cannot be responsibly populated, use conservative null/soft wording rather than fabrication.

## Implementation Approach

### Option Selected

Use the hybrid approach:

- Generate all 19 missing detail records
- Use conservative, explicit wording for the soft entries
- Preserve dataset completeness without pretending every slug is a sharply verified landmark

### Research workflow

For each slug:

1. Confirm whether it is a distinct place, route-area, event, or editorially soft concept
2. Collect primary or official source links
3. Cross-check the index entry description against available sources
4. Write the detail JSON in the enhanced style
5. Keep a source-backed `verified_note`

### Verification workflow

Add a regression check that fails if any attraction slug in any `index.json` lacks both:

- `data/attractions/<city>/<slug>.json`
- `data/enhanced/attractions/<city>/<slug>.json`

This should be separate from the runtime fallback check already added.

## Risks

### Risk: soft entries lower trust

Mitigation:

- Rewrite them as contextual, scoped local experiences
- Remove inflated claims
- Add transparent `verified_note`

### Risk: official sources are sparse for secondary Isaan attractions

Mitigation:

- Prefer city/province tourism framing plus official place references
- Use shorter copy where the source base is thin
- Do not synthesize operational facts without support

### Risk: index descriptions conflict with source-backed reality

Mitigation:

- Correct the detail file to match verified reality
- If needed, later normalize the index entry too

## Success Criteria

- All 19 missing slugs have real detail records
- Loader regression test still passes
- New dataset consistency test passes
- `npm run build` passes
- No production route should log `Cannot find module` for these attraction slugs
- New attraction files are defensible under EEAT review

## Out of Scope

- Full editorial rewrite of all existing attraction files
- Re-ranking entire city attraction indexes
- Translating all new attraction files into additional languages in this round
