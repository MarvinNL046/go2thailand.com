# English Thai Fried Rice / Khao Pad owner brief

**Primary owner:** `https://go2-thailand.com/food/thai-fried-rice/`

**Locale and market:** English / United Kingdom

**Research date:** 28 July 2026

**Implementation status:** approved for implementation

## Owner decision

`/food/thai-fried-rice/` owns the broad Thai Fried Rice and Khao Pad task: what the dish is, spelling, taste, common ingredient signals, protein variations, ordering, heat, sauce and allergen boundaries, comparison with Chinese fried rice, and safe home preparation.

`/food/khao-pad-sapparot/` remains an independent supporting owner for pineapple fried rice, Khao Pad Sapparot, pineapple, curry-powder, raisin, cashew and presentation intent. The broad owner may compare and link to it but must not absorb its complete recipe or pineapple-specific search task.

## DataForSEO evidence

- Two independent DFS clusters: 267 records for `thai fried rice` and 125 for `khao pad` (392 raw records total).
- Each cluster returned 50 competitor-domain records.
- Primary UK metrics: `thai fried rice` volume 1,300 / KD 20; `khao pad`, `khao pad thai` and `thai fried rice khao pad` volume 1,000 / KD 1.
- Useful supporting demand includes `thai fried rice recipe` volume 390 / KD 8, `thai chicken fried rice` volume 260, `thai egg fried rice` volume 210, `khao pad sapparod` volume 140 and named protein variants.
- Ten current UK-English SERPs returned 75 organic results.
- The SERPs returned 57 People Also Ask appearances and 41 unique questions.
- Exact owner ranking check: zero returned keywords.
- Exact owner backlink check: no reportable backlink summary signal.
- Near-me, takeaway, unrelated Pad Kra Pao and generic Chinese-fried-rice leakage is excluded from the owner.

## Competitor and source reading

- Eating Thai Food: 11,042 parsed markdown characters. Useful for the broad street-stall context, jasmine rice, protein naming, lime, prik nam pla, egg and one shrimp example. Personal superlatives and one-recipe-as-universal claims are excluded.
- Rosa's Thai: 2,735 parsed characters. Useful as one restaurant recipe expression and for the recurring lime, spring-onion, garlic, sauce and cooked-rice pattern. Commercial restaurant and cookbook promotion is excluded.
- The Woks of Life: 16,843 parsed characters. Useful for an explicit Thai-versus-Chinese comparison, sauce variability, vegetables, proteins and wok sequence. One family recipe is not treated as a national formula.
- Thailand Foundation / Ministry of Foreign Affairs cookbook project: 5,684 parsed characters. Primary-context confirmation that Khao Pad is Thai-style fried rice and a recognised Thai dish; its general health language is not reused.
- UK Food Standards Agency: current official control for cooling cooked rice quickly, refrigerated storage, reheating only once and reheating until steaming hot throughout.

## Dominant intent and format

The SERP is strongly recipe-led, but the Go2Thailand owner must solve a traveller's wider decision before offering a safe tested-method overview:

1. define Khao Pad immediately;
2. show the taste and texture without claiming one universal formula;
3. decode `gai`, `moo`, `goong`, `pu/khao pad poo` and meat-free requests;
4. distinguish table chilli and prik nam pla from heat already cooked into the rice;
5. compare Thai fried rice with Chinese fried rice without ranking one cuisine as better;
6. hand pineapple-specific intent to `/food/khao-pad-sapparot/`;
7. explain a safe high-heat sequence without publishing unsupported exact quantities or Recipe schema;
8. provide exact PAA answers, source methodology and contextual commercial exits after the useful answer.

## Information-gain modules

- A four-signal taste compass: savoury, aromatic, fresh finish and chilli heat.
- Eight ingredient signals with fish, shellfish, soy, wheat, egg and shared-wok boundaries.
- Three choice cards: classic Khao Pad, named-protein Khao Pad and Khao Pad Sapparot.
- A three-decision ordering route: choose version, set chilli/condiments, verify hidden sauces and cross-contact.
- A safe rice sequence that separates texture advice from storage safety: cook, cool quickly when saving, refrigerate, break up, stir-fry and serve steaming hot.
- A comparison that says Thai versions often use jasmine rice, fish sauce and lime/prik nam pla, while Chinese fried-rice traditions are diverse and cannot be reduced to one soy-only formula.

## Selected genuine PAA questions

1. What makes Thai fried rice different?
2. What are the ingredients in Thai fried rice?
3. What sauce is used in Thai fried rice?
4. What does Thai style fried rice taste like?
5. How spicy is typical Thai fried rice?
6. What is Khao Pad made of?
7. What are some variations of Khao Pad?
8. What is Khao Pad Poo?
9. What is the difference between Chinese fried rice and Thai fried rice?
10. Is Thai fried rice healthy?

The health answer must reject a universal label and explain that portion, oil, sauce, protein, vegetables, sodium and individual needs change the result. No calorie estimate is included.

## Affiliate plan

- Amazon OneLink product 1: `simple-thai-food-cookbook`, for tested quantities and broader Thai cooking context.
- Amazon OneLink product 2: `zojirushi-six-cup-rice-cooker`, only with explicit capacity, local voltage, plug, warranty and OneLink-market checks. It is not presented as necessary for Khao Pad.
- One Klook cooking-class exit after the editorial cooking section; users must verify the current menu, city, language, allergen support and whether Khao Pad is actually taught.
- Every product CTA says `Check current price at Amazon`; Klook says `Check current cooking classes`.
- All commercial exits use visible disclosure and `noopener noreferrer nofollow sponsored`.

## Claims deliberately excluded

- fixed street-food, restaurant or ingredient prices;
- fixed calories, healthy/unhealthy verdicts or weight-loss claims;
- one authentic ingredient list, compulsory tomato, compulsory basil or compulsory sugar;
- automatic vegetarian, vegan, gluten-free, halal or allergy-safe status;
- the claim that all Thai fried rice is spicy or that `mai pet` removes chilli already mixed into a sauce;
- the claim that all Chinese fried rice is soy-heavy or that one national tradition is better;
- unsafe advice to leave cooked rice at room temperature overnight;
- universal restaurant, stall, stock, rating or availability claims;
- Recipe schema without a complete independently tested recipe.

## Required implementation and QA

- Add an independent English component on the reusable `DishEditorialTemplate`.
- Generate a unique, text-free hero with a fully cooked plate, separate lime and prik nam pla, visible egg and vegetables, and a clear left copy zone; do not reuse Larb or noodle imagery.
- Add canonical cluster links to `/food/khao-pad-sapparot/`, `/food/pad-krapow/` and `/travel-guides/thai-cuisine-food-guide/` or the final canonical Thai-food guide.
- Verify one H1, canonical, hreflang, Article/BreadcrumbList/ItemList/FAQPage schema, no Recipe schema, all assets, affiliates, desktop/mobile overflow and expanded FAQ contrast.
- Run TypeScript, focused lint, cannibalisation, affiliate, design-system and layered 1,583-route English runtime gates.
