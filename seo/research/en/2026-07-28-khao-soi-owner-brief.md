# Khao Soi English owner brief

## Owner decision

- Canonical owner: `/blog/khao-soi-chiang-mai-guide/`
- Primary query: `khao soi chiang mai`
- Preserve the five current ranking variants on the existing guide owner: `khao soi chiang mai`, `best khao soi chiang mai`, `best khao soi in chiang mai`, `chiang mai khao soi` and `chiang mai kow soi`.
- Consolidate only the English `/food/khao-soi/` route into the ranking guide owner. The dish route returned zero ranking keywords and no reportable backlink signal, while both pages target the same definition, ingredients, eating and Chiang Mai discovery intent.
- Keep `/nl/food/khao-soi/` unchanged. The redirect and sitemap removal are locale-specific.
- Migrate natural English internal links to the canonical guide and replace a brittle restaurant ranking with a current-choice framework.

## DFS evidence

- Keyword cluster: 69 records and 50 competitor domains.
- `khao soi recipe`: UK volume 1,300, KD 22.
- `khao soi chiang mai`: UK volume 260, KD 0.
- `khao soi curry`: UK volume 260, KD 26.
- `khao soi thailand`: UK volume 140, KD 23.
- `khao soi ingredients`: UK volume 70, KD 24.
- `best khao soi in chiang mai`: UK volume 70, KD 0.
- Ten current UK-English SERPs: 77 organic results, 57 PAA appearances and 44 unique genuine questions.
- Exact ranking and backlink checks completed for both candidate owners.
- Three usable full DFS source parses plus a current Michelin search capture. The direct Michelin parser returned no body and is therefore treated only as corroborating discovery evidence, not as a full parse.

## Search intent to satisfy

The canonical page should help a traveller or home cook:

1. recognise Chiang Mai-style khao soi as a northern Thai curry noodle soup;
2. understand the soft egg-noodle and crisp fried-noodle contrast;
3. identify common broth, protein and condiment signals without presenting one recipe as universal;
4. understand chicken and beef as familiar choices while avoiding automatic halal assumptions;
5. assess wheat, egg, coconut, fish, shrimp and shared-kitchen boundaries;
6. ask for a vegetarian or vegan version without assuming the curry paste, stock or noodles qualify;
7. adjust lime, pickled mustard greens, shallot and chilli at the table;
8. compare market stall, specialist shop and restaurant versions using practical quality signals;
9. understand the preparation sequence while using a tested external recipe for exact quantities;
10. check current venue, class and menu details rather than relying on a frozen “best restaurants” list.

## Selected genuine PAA questions

- What is Chiang Mai khao soi?
- What is khao soi made of?
- What does khao soi taste like?
- Is khao soi curry or soup?
- Is khao soi very spicy?
- What noodles are used for khao soi?
- What are the crunchy noodles on top?
- Can khao soi be vegetarian?
- Is khao soi Thai or Burmese food?
- What is khao soi normally served with?

Exclude celebrity, London, near-me and delivery PAA, generic healthiest-dish clickbait, restaurant-name queries and unsupported “world’s best” claims.

## Evidence boundaries

- TAT describes khao soi as a northern/Lanna dish strongly associated with Chiang Mai, with coconut curry broth, soft egg noodles, crisp noodles and chicken or sometimes beef.
- Michelin connects the dish with Chin Haw or Chinese-Muslim trade and wider Yunnan–Myanmar–northern Thailand movement. Exact origin and etymology remain debated; do not name one inventor or present one migration story as settled fact.
- A familiar Chiang Mai bowl uses wheat-based egg noodles. Crisp noodles are generally a fried portion of the noodle component, not a separate rice garnish.
- Broth and paste vary. Common signals include coconut milk, dried chilli, turmeric, ginger, shallot, coriander and black cardamom; individual shops may use commercial paste, stock, fish sauce or shrimp-containing seasonings.
- Chicken or beef does not make a shop automatically halal. Verify meat sourcing, paste, stock, utensils and kitchen practice when halal compliance matters.
- Vegetarian or vegan is not the default. Check broth, curry paste, fish sauce, shrimp paste, egg noodles and shared preparation.
- Heat is variable and table chilli is optional, but the base broth may already contain chilli. Never promise a mild bowl.
- Do not publish fixed prices, exchange conversions, guaranteed opening hours, static restaurant rankings, fixed nutrition, health claims or unsupported first-hand experience.
- Do not add Recipe schema without a complete independently tested recipe with exact quantities and timings.

## Source set

1. Tourism Authority of Thailand, *Discover Thai Cuisine through its famous four regions* — Lanna context and soft-versus-crisp noodle, coconut-curry and chicken structure. Full DFS parse.
2. Tourism Authority of Thailand, *Much-loved, must-eat dishes from different regions of Thailand* — Chiang Mai association, egg noodles, chicken/beef and creamy curry context. Full DFS parse.
3. Hot Thai Kitchen, *Khao Soi: Northern Thai Curry Noodle Soup* — wheat egg noodles, paste and broth technique, condiments, variant warning and practical preparation sequence. Full DFS parse.
4. Michelin Guide, *Chiang Mai: A Gastronomy Journey of Thailand* and noodle primer — Lanna status, Chin Haw historical context, aromatic ingredients and familiar toppings. Current discovery captures; direct DFS body parse unavailable.

## Design and monetisation plan

- Reuse `DishEditorialTemplate` while retaining the rank-bearing blog URL.
- Unique rights-safe hero: a finished bowl in a Chiang Mai/Lanna shophouse setting, soft noodles and crisp topping visibly distinct, condiment dishes nearby, deep jade and terracotta negative space for the headline.
- One disclosed Klook Chiang Mai cooking-class exit with a unique Khao Soi sub-ID; wording requires checking the current class menu.
- Two restrained Amazon OneLink products: a broad Thai cookbook and the registered granite mortar and pestle. Use current-price wording only.
- Natural related links: Chiang Mai destination guide, northern Thailand discovery and the broader Thai curry comparison owner.

## QA requirements

- Locale-specific permanent redirect from English `/food/khao-soi/`; Dutch route remains HTTP 200.
- English dish route absent from sitemap and feed; canonical guide appears once and self-canonicals.
- Unique title, description, Article, BreadcrumbList, ItemList and FAQPage schema.
- One H1, descriptive hero alt, no horizontal overflow at 390 px and comfortable affiliate CTA dimensions.
- TypeScript, targeted ESLint, cannibalisation, affiliate, design-system and full English runtime gates.
