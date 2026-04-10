# Thicken Weak Attraction Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Strengthen five borderline-thin attraction detail pages by filling existing template fields with higher-value planning content instead of inflating generic prose.

**Architecture:** Keep the attraction renderer unchanged and improve only the enhanced JSON payloads that feed it. Each target page gets structured decision content such as `who_should_visit`, `who_can_skip`, `photography_tips`, `seasonal_considerations`, `accessibility`, `hidden_gem_reason`, and `fun_facts`, so the live template renders more useful sections without changing page behavior.

**Tech Stack:** Next.js pages router, JSON content files in `data/enhanced/attractions`, TypeScript typecheck, production `next build`

---

### Task 1: Strengthen the stay-base and optional-experience pages

**Files:**
- Modify: `data/enhanced/attractions/ubon-ratchathani/pk-riverside-resort.json`
- Modify: `data/enhanced/attractions/nakhon-phanom/mekong-sunset-boat-cruise.json`
- Reference: `pages/city/[slug]/attractions/[attraction].tsx`

- [ ] **Step 1: Add richer decision fields to the stay-base page**

```json
"visitor_experience": "Expect a functional overnight base for the Khong Chiam side of the province. The decision is mainly about lowering driving friction, improving sunrise timing, and giving yourself a calmer Mekong-side overnight than about staying at a destination resort.",
"who_should_visit": [
  "Travelers planning an early Pha Taem start and wanting to cut down on same-day driving from Ubon city.",
  "Couples or road-trippers who care more about Mekong-side pace and route efficiency than about being near urban nightlife.",
  "Visitors linking Khong Chiam, the Two-Color River, and Pha Taem into one overnight district stay."
],
"who_can_skip": [
  "Anyone staying only in Ubon city and treating Khong Chiam as a quick day trip.",
  "Travelers expecting a destination resort with strong in-house facilities and a large on-site program.",
  "Visitors who prefer a denser town-center base with more walkable dining and convenience options."
]
```

- [ ] **Step 2: Add photography, accessibility, and factual support to the stay-base page**

```json
"photography_tips": [
  "Use the riverfront or nearby Khong Chiam viewpoints for dawn and blue-hour atmosphere rather than relying on midday property shots.",
  "Frame the stay as part of a Mekong route story: room, river, then nearby district landscapes.",
  "If you want strong sunrise imagery, scout the exact river-facing angle after check-in because room and grounds layouts can vary."
],
"accessibility": "Accessibility depends on the current property layout and room assignment. Travelers who need step-free access, parking near the room, or specific bathroom features should confirm those details directly before booking.",
"fun_facts": [
  "The strongest argument for staying here is often logistical: Khong Chiam gives easier early access to Pha Taem than a same-day out-and-back from central Ubon.",
  "In this part of Ubon, the overnight base can shape the whole route more than the hotel itself becomes a standalone attraction."
]
```

- [ ] **Step 3: Add hidden-gem logic and visit filters to the optional cruise page**

```json
"hidden_gem_reason": "What makes this work is not the promise of a luxury cruise product but the fact that Nakhon Phanom is one of the few Mekong cities in Thailand where the public riverfront is already strong enough that a short boat ride can become a natural extension of the evening.",
"who_should_visit": [
  "Travelers who already enjoy the promenade and want one extra river-level perspective at the end of the day.",
  "Couples and slow travelers who prefer atmosphere, breeze, and skyline views over packed sightseeing.",
  "Visitors staying overnight in the city center who can decide based on real river conditions instead of forcing a fixed booking."
],
"who_can_skip": [
  "Anyone on a tight same-day schedule who only has time for the riverfront walk itself.",
  "Travelers who dislike operator uncertainty or want a fully standardized cruise product with fixed inclusions.",
  "Visitors in bad weather or high-water periods when local departures may be limited or not worthwhile."
]
```

- [ ] **Step 4: Add seasonality, access, and photography guidance to the optional cruise page**

```json
"photography_tips": [
  "Board with enough daylight left to capture the mountain backdrop and riverfront skyline before sunset fades.",
  "Shoot back toward the promenade and naga zone for context instead of only aiming at open water.",
  "Keep a phone or camera protected from river spray and low-light motion blur as dusk sets in."
],
"seasonal_considerations": "This experience is more fragile than the promenade itself because river level, wind, rain, and local operator activity all affect whether a cruise is worth doing. Dry-season evenings usually give the cleanest late-day planning window, while wet-season conditions can make departures less predictable.",
"accessibility": "Accessibility depends on the current pier or boarding setup. Travelers with limited mobility should assume uneven riverfront boarding conditions until a local operator confirms otherwise."
```

- [ ] **Step 5: Run focused validation of the edited files**

Run: `node -e "JSON.parse(require('fs').readFileSync('data/enhanced/attractions/ubon-ratchathani/pk-riverside-resort.json','utf8')); JSON.parse(require('fs').readFileSync('data/enhanced/attractions/nakhon-phanom/mekong-sunset-boat-cruise.json','utf8'))"`

Expected: command exits `0` with no JSON parse error

- [ ] **Step 6: Commit the first content pass**

```bash
git add data/enhanced/attractions/ubon-ratchathani/pk-riverside-resort.json data/enhanced/attractions/nakhon-phanom/mekong-sunset-boat-cruise.json
git commit -m "content: strengthen stay and cruise attraction pages"
```

### Task 2: Strengthen the Mukdahan event, evening-zone, and stay-area pages

**Files:**
- Modify: `data/enhanced/attractions/mukdahan/loy-krathong-mekong.json`
- Modify: `data/enhanced/attractions/mukdahan/riverside-craft-beer-dining.json`
- Modify: `data/enhanced/attractions/mukdahan/mukdahan-mekong-bungalows.json`
- Reference: `pages/city/[slug]/attractions/[attraction].tsx`

- [ ] **Step 1: Add event-specific decision sections to the Loi Krathong page**

```json
"who_should_visit": [
  "Travelers already in Mukdahan during festival week who want to see the Mekong riverfront in ceremonial mode.",
  "Visitors interested in Thai seasonal ritual life rather than only permanent attractions.",
  "Families or couples who enjoy community evenings more than nightlife-heavy events."
],
"who_can_skip": [
  "Anyone visiting outside the actual Loi Krathong window.",
  "Travelers who want a guaranteed fixed show schedule or large commercial festival production.",
  "Visitors who dislike evening crowds, noise, or flexible event logistics."
],
"seasonal_considerations": "This page only becomes a live attraction around the Loi Krathong period and should be read as cultural context the rest of the year. Exact programming, krathong activities, security setup, and crowd size change annually, so the local calendar matters more than evergreen assumptions.",
"accessibility": "Festival access depends on how the current year's riverfront zone is set up. Expect temporary crowding, variable walkway conditions, and limited seating unless local organizers confirm otherwise."
```

- [ ] **Step 2: Add evening-zone positioning to the riverside dining page**

```json
"hidden_gem_reason": "Mukdahan is not usually sold as a nightlife city, which is exactly why this riverfront dining layer can surprise people. The reward is not a famous bar strip but a softer Mekong evening where food, bridge views, and strolling sit in the same block.",
"who_should_visit": [
  "Travelers who like combining sunset, dinner, and a walk without needing a formal nightlife district.",
  "Couples and slow travelers looking for a relaxed riverfront evening rather than a single headline attraction.",
  "Visitors staying nearby who want to let the Mekong shape the pace of the night."
],
"who_can_skip": [
  "Anyone expecting a polished craft-beer scene with fixed flagship venues.",
  "Travelers who prefer destination restaurants with stable menus and reservations.",
  "Visitors during heavy rain or very quiet nights when the riverfront scene may feel thin."
],
"photography_tips": [
  "Go around sunset when the river, bridge lights, and food stalls can sit in the same frame.",
  "Use wider shots that include the promenade atmosphere instead of isolating one venue sign.",
  "Night phone photos work better if you pause near brighter bridge-viewpoint lighting instead of darker stretches."
],
"fun_facts": [
  "The appeal here is cumulative: promenade air, Lao-facing views, and informal dining matter more than any one shop name.",
  "This kind of Mekong evening zone often feels more memorable to slow travelers than a checklist attraction visited in daylight."
]
```

- [ ] **Step 3: Add stay-strategy guidance to the bungalow area page**

```json
"who_should_visit": [
  "Travelers who want Mukdahan to feel slower, quieter, and more river-oriented than a standard city stop.",
  "Couples or remote-working style travelers who value setting and pace over dense nightlife access.",
  "Visitors building an overnight Mekong route and wanting the river to be part of the stay, not just a short evening walk."
],
"who_can_skip": [
  "Anyone who wants the tightest access to city-center errands, bus links, or late-night dining.",
  "Travelers who prefer branded hotels with predictable facilities and reception standards.",
  "Visitors making only a short stop in Mukdahan with no real time to use a slower riverside base."
],
"photography_tips": [
  "Use early morning light for calmer river-surface shots and softer views across to Laos.",
  "Photograph the stay as part of a wider Mekong lifestyle story rather than as a standalone luxury property.",
  "Scout the exact riverside angle after arrival because bungalow spacing and river access differ by operator."
],
"seasonal_considerations": "This stay style works year-round in principle, but the quality of the experience depends on river conditions, shade, current property upkeep, and how much time you actually have to slow down. It is most rewarding when used as a real overnight pause rather than a rushed one-night transit stop.",
"accessibility": "Accessibility varies significantly by property. Travelers who need step-free routes, parking close to the room, or adapted bathrooms should treat those as direct pre-booking questions rather than assumptions.",
"fun_facts": [
  "A riverfront bungalow changes Mukdahan from a quick border-city stop into a slower Mekong overnight.",
  "For many travelers the main upgrade is psychological: waking near the river makes the city feel less transactional and more place-based."
]
```

- [ ] **Step 4: Run focused validation of the Mukdahan JSON files**

Run: `node -e "['data/enhanced/attractions/mukdahan/loy-krathong-mekong.json','data/enhanced/attractions/mukdahan/riverside-craft-beer-dining.json','data/enhanced/attractions/mukdahan/mukdahan-mekong-bungalows.json'].forEach((file)=>JSON.parse(require('fs').readFileSync(file,'utf8')))"`  
Expected: command exits `0` with no JSON parse error

- [ ] **Step 5: Commit the Mukdahan content pass**

```bash
git add data/enhanced/attractions/mukdahan/loy-krathong-mekong.json data/enhanced/attractions/mukdahan/riverside-craft-beer-dining.json data/enhanced/attractions/mukdahan/mukdahan-mekong-bungalows.json
git commit -m "content: enrich mukdahan attraction planning pages"
```

### Task 3: Verify the renderer still builds cleanly

**Files:**
- Verify: `data/enhanced/attractions/ubon-ratchathani/pk-riverside-resort.json`
- Verify: `data/enhanced/attractions/nakhon-phanom/mekong-sunset-boat-cruise.json`
- Verify: `data/enhanced/attractions/mukdahan/loy-krathong-mekong.json`
- Verify: `data/enhanced/attractions/mukdahan/riverside-craft-beer-dining.json`
- Verify: `data/enhanced/attractions/mukdahan/mukdahan-mekong-bungalows.json`
- Verify: `pages/city/[slug]/attractions/[attraction].tsx`

- [ ] **Step 1: Run the TypeScript verification**

Run: `npx tsc --noEmit --pretty false`  
Expected: exit code `0`

- [ ] **Step 2: Run the production build**

Run: `npm run build`  
Expected: exit code `0`; existing non-fatal framework warnings are acceptable, but no build failure

- [ ] **Step 3: Inspect the diff for only intended files**

Run: `git diff -- docs/superpowers/plans/2026-04-10-thicken-weak-attraction-pages.md data/enhanced/attractions/ubon-ratchathani/pk-riverside-resort.json data/enhanced/attractions/nakhon-phanom/mekong-sunset-boat-cruise.json data/enhanced/attractions/mukdahan/loy-krathong-mekong.json data/enhanced/attractions/mukdahan/riverside-craft-beer-dining.json data/enhanced/attractions/mukdahan/mukdahan-mekong-bungalows.json`

Expected: only the plan file and the five target content files show changes

- [ ] **Step 4: Commit the verified content thickening round**

```bash
git add docs/superpowers/plans/2026-04-10-thicken-weak-attraction-pages.md data/enhanced/attractions/ubon-ratchathani/pk-riverside-resort.json data/enhanced/attractions/nakhon-phanom/mekong-sunset-boat-cruise.json data/enhanced/attractions/mukdahan/loy-krathong-mekong.json data/enhanced/attractions/mukdahan/riverside-craft-beer-dining.json data/enhanced/attractions/mukdahan/mukdahan-mekong-bungalows.json
git commit -m "content: thicken weak attraction planning pages"
```
