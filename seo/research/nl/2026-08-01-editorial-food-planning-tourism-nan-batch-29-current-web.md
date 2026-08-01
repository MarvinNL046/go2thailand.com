# NL editorial batch 29 — current-web research

Checked: 2026-08-01
Scope: seven routes only; Trat and Koh Kood excluded.

## Method and observed question families

We checked current primary or authoritative sources first and used observed search-intent families rather than claiming access to a fixed PAA/DFS set. The recurring question forms were: **what is it/status**, **does this ingredient occur**, **how do I verify**, **how many days/bases**, **what changed historically**, and **is a named food category safe/suitable**. We do not label these as measured search volumes or a complete question corpus.

`npm run seo:cannibalization` returned zero hard collisions and zero warnings before writing. Targeted checks of `seo/keywords-nl.csv` and `seo/used-keywords-nl.md` returned no exact prior owner for the seven chosen primary phrases.

## Route decisions

### Visama Explorer Nan

- Lifecycle: `ready`; persistent commercial-investigation owner.
- Intent: location, route fit, tent/camp offer, transfer and booking checks.
- Evidence: the [official camp page](https://visamatentedcamps.com/en/nan/) is the provider source for current offer claims; [TAT Nan](https://www.tourismthailand.org/Destinations/Provinces/Nan/219) supplies destination context.
- Guardrails: provider sustainability language is attributed; no fixed price, transfer time, schedule, weather or safety promise. Live-price-only.
- Primary keyword: `Visama Explorer Nan`.

### MSG in Thai food

- Lifecycle: `ready`; persistent informational owner.
- Intent: whether added MSG occurs, hidden sources, how to ask, and difference from glutamate/gluten/sodium.
- Evidence: [FDA MSG Q&A](https://www.fda.gov/food/food-additives-petitions/questions-and-answers-monosodium-glutamate-msg) and [EFSA glutamate review](https://www.efsa.europa.eu/en/press/news/170712).
- Guardrails: no diagnosis, symptom attribution or prescribed diet; official assessments are described in their own regulatory context.
- Primary keyword: `MSG in Thais eten`.

### FETTA proposal

- Lifecycle: `archived`, `noindex`; corrective historical route.
- Intent: status of the reported March 2026 request.
- Evidence: [Nation Thailand](https://www.nationthailand.com/news/tourism/40064070) reports a tourism-industry request, not adoption. Later primary TAT publications—[Thailand Tourism Next](https://www.tatnews.org/2026/01/tat-sets-thailand-tourism-next-for-value-growth-plan/) and the [TTM+ update](https://www.tatnews.org/2026/06/thailand-tourism-update-at-ttm-2026-reinforces-quality-led-growth-direction/)—describe other strategies and do not confirm the named package.
- Guardrails: the amount appears only as an attributed historic proposal; no entitlement, promotion, price forecast or application CTA.
- Primary keyword: `FETTA toerismevoorstel 2026`.

### Halal food in Thailand

- Lifecycle: `ready`; persistent informational owner.
- Intent: how certification differs from Muslim ownership, a partial menu, or ‘no pork’; what to verify in the kitchen.
- Evidence: [Central Islamic Council of Thailand](https://www.halal.or.th/en/) for official halal search/certification context; [TAT Foodie Map](https://www.tourismthailand.org/Articles/explore-thai-taste-thai-foodie-map-2-0-en) for destination inspiration only.
- Guardrails: no venue is guaranteed; current certificate, correct branch, ingredients and shared equipment are separate checks.
- Primary keyword: `halal eten Thailand`.

### History of Thai cuisine

- Lifecycle: `ready`; persistent learn owner.
- Intent: origins, regional differences, trade and migration, court and household roles, street-food development.
- Evidence: Thailand Foundation’s [Thai Food overview](https://thailandfoundation.or.th/culture-heritage/thai-food/), [Classical Era](https://thailandfoundation.or.th/women-in-thai-cuisine-part-1-the-classical-era/) and [Era of Change](https://thailandfoundation.or.th/th/women-in-thai-cuisine-part-2-the-era-of-change/); [UNESCO Tomyum Kung](https://ich.unesco.org/en/RL/tomyum-kung-01879).
- Guardrails: no monocausal invention story or unsupported exact introduction date; households, women, local communities and migrants remain visible alongside court history.
- Primary keyword: `geschiedenis Thaise keuken`.

### How long in Thailand

- Lifecycle: `ready`; persistent planning owner.
- Intent: week/two-week/three-week scope, number of bases, transfer-day accounting and buffers.
- Evidence: [TAT Destinations](https://www.tourismthailand.org/Destinations) and [TAT Trip Planner](https://www.tourismthailand.org/Trip-Planner) establish region-based planning context, not a universal ideal duration.
- Guardrails: ranges are planning heuristics, not guarantees; no fixed transport schedule or weather claim.
- Primary keyword: `hoe lang naar Thailand`.

### Gluten in Thai food

- Lifecycle: `ready`; persistent informational owner.
- Intent: whether the cuisine is gluten-free, sauce/noodle risks, cross-contact, packaged-food and restaurant questions.
- Evidence: [FDA gluten-free labeling](https://www.fda.gov/food/nutrition-food-labeling-and-critical-foods/gluten-free-labeling-foods) and [NIDDK celiac nutrition guidance](https://www.niddk.nih.gov/health-information/digestive-diseases/celiac-disease/eating-diet-nutrition).
- Guardrails: US definitions are not presented as Thai law; no named dish is guaranteed; readers with a medical diet are referred to their care team, without treatment advice.
- Primary keyword: `is Thais eten glutenvrij`.

## Lifecycle and redirect summary

Six routes remain indexable owners. FETTA remains at its existing URL as an archived/noindex correction. No redirect is recommended: every existing URL retains a distinct, useful intent, and no stronger canonical owner was found.

## Commercial policy

No affiliate block is used. Cooking products are not necessary to answer the MSG, halal or gluten intents, and a product CTA would weaken the safety-focused verification path.
