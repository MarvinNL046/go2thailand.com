# Thicken Weak Attraction Pages Design

## Goal

Strengthen the five weakest attraction pages from the recent dataset repair so they feel less like thin route notes and more like useful decision pages for SEO and Pinterest traffic.

Target pages:

- `data/enhanced/attractions/ubon-ratchathani/pk-riverside-resort.json`
- `data/enhanced/attractions/nakhon-phanom/mekong-sunset-boat-cruise.json`
- `data/enhanced/attractions/mukdahan/loy-krathong-mekong.json`
- `data/enhanced/attractions/mukdahan/riverside-craft-beer-dining.json`
- `data/enhanced/attractions/mukdahan/mukdahan-mekong-bungalows.json`

## Problem

These pages are not technically thin by the current template thresholds, but they are weaker than the stronger location-based attraction pages because they mostly rely on broad descriptive paragraphs and conservative notes.

The current attraction template already supports richer decision content through fields like:

- `who_should_visit`
- `who_can_skip`
- `photography_tips`
- `hidden_gem_reason`
- `seasonal_considerations`
- `accessibility`
- `fun_facts`

Those fields are mostly unused on the weakest pages, so the pages render with less structure and less decision value than they could.

## Approach

Do not rewrite these pages as generic longer articles.

Instead, strengthen them by filling the decision-oriented template fields already supported by the page renderer. This keeps the copy useful, specific, and modular.

## Page-Level Intent

### PK Riverside Resort

Position as a `stay-base decision page`, not as a sightseeing attraction.

Add:

- `who_should_visit`
- `who_can_skip`
- `photography_tips`
- `accessibility`
- `fun_facts`
- stronger `visitor_experience`

### Mekong Sunset Boat Cruise

Position as a `same-day optional experience page`.

Add:

- `who_should_visit`
- `who_can_skip`
- `hidden_gem_reason`
- `seasonal_considerations`
- `photography_tips`
- `accessibility`

### Loi Krathong on the Mekong

Position as a `festival-context page`, not an evergreen attraction promise.

Add:

- `who_should_visit`
- `who_can_skip`
- `seasonal_considerations`
- `accessibility`
- `fun_facts`

### Riverside Craft Beer and Dining

Position as a `riverfront evening zone` rather than a fixed venue page.

Add:

- `who_should_visit`
- `who_can_skip`
- `photography_tips`
- `hidden_gem_reason`
- `fun_facts`

### Mukdahan Mekong Bungalows

Position as a `slower-stay strategy page`.

Add:

- `who_should_visit`
- `who_can_skip`
- `seasonal_considerations`
- `accessibility`
- `photography_tips`
- `fun_facts`

## Content Rules

- Keep the conservative EEAT tone already used in the repaired batch
- Avoid unstable claims about prices, operators, schedules, or exact inclusions unless strongly source-backed
- Make each page more useful by improving decision clarity, not by inflating prose
- Keep the distinction between `place`, `experience`, `event`, and `stay-base` explicit

## Verification

After the edits:

- inspect the updated JSON files
- run `npx tsc --noEmit --pretty false`
- run `npm run build`

The goal is not just longer content, but visibly richer rendered sections on the live template.
