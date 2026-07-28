# Thai Green Curry English owner brief

## Owner decision

- Canonical owner: `/food/green-curry/`
- Primary query: `thai green curry`
- Preserve the dish owner’s two current Thai-name rankings: `kaeng kiew wan` and `gaeng keow wan`.
- Keep `/blog/thai-curry-guide-green-red-yellow-massaman-panang/` as a separate comparison owner. Its 49 ranking keywords are overwhelmingly red-versus-green, Panang-versus-Massaman, curry-type and heat-comparison intent.
- The dish owner should answer one short red-versus-green question and link to the comparison owner, not absorb its full comparison table.
- No URL consolidation is needed. Strengthen natural internal links to the dish owner where the anchor is specifically green curry.

## DFS evidence

- Keyword cluster: 317 records and 50 competitor domains.
- `thai green curry`: UK volume 27,100, KD 31.
- `thai green curry recipe`: UK volume 33,100, KD 16.
- `thai green curry paste`: UK volume 5,400, KD 0.
- `thai green curry vegetarian` and vegan/vegetable variants: UK volume 4,400 with low-to-moderate difficulty.
- Ten current UK-English SERPs: 78 organic results, 51 PAA appearances and 44 unique genuine questions.
- Exact ranking and backlink checks completed for the dish owner and broad curry comparison owner.
- Two new usable full DFS source parses, one reusable full TAT parse and current Michelin discovery captures.

## Search intent to satisfy

The canonical page should help a traveller or home cook:

1. recognise Thai green curry and its Thai name `kaeng khiao wan`;
2. understand that fresh green chillies are the core colour signal while leaves may deepen the green;
3. distinguish green curry from a fixed “sweet” or “mild” promise;
4. identify common paste, coconut, protein, aubergine, basil, lime-leaf and seasoning signals;
5. assess shrimp paste, fish sauce, stock, soy, coconut and commercial-paste boundaries;
6. order a genuinely vegetarian or vegan version rather than assuming vegetables are enough;
7. choose chicken, another protein or a confirmed meat-free version without treating one as universal;
8. eat it with jasmine rice or khanom chin according to the setting;
9. understand paste-to-broth preparation while following a tested source for exact quantities and food safety;
10. compare the current class, menu or product rather than relying on fixed prices.

## Selected genuine PAA questions

- What are the main ingredients in Thai green curry?
- What gives green curry its green colour?
- What do Thai people call green curry?
- Is Thai green curry very hot?
- Is Thai green curry meant to be sweet?
- Is green curry usually vegetarian?
- Does green curry usually have fish sauce?
- What is the paste in gaeng keow wan?
- What do Thai people eat with green curry?
- Do you serve Thai curry with rice or noodles?

Keep one concise “red or green” answer that sends full comparison intent to the existing curry guide. Exclude near-me, supermarket-brand, celebrity, health-ranking and subjective “tastiest curry” PAA.

## Evidence boundaries

- Thailand Foundation and Hot Thai Kitchen use the Thai name แกงเขียวหวาน, commonly transliterated in several ways. Preserve the existing `kaeng kiew wan` and `gaeng keow wan` variants naturally.
- Fresh green chillies distinguish the paste from red-curry paste. Thai basil or other green leaves can deepen colour; do not claim every green shade comes only from chilli or that a pale curry is necessarily inferior.
- “Wan” should not become a promise that the dish tastes sweet. Thailand Foundation and Hot Thai Kitchen explain it in relation to the soft or creamy green colour; actual seasoning balances spicy, savoury, salty and some sweetness.
- Common paste signals include green chilli, lemongrass, galangal, makrut-lime zest, shallot, garlic, coriander root, spices and often shrimp paste. Recipes and commercial products vary.
- Familiar finished-curry signals include coconut milk or cream, curry paste, fish sauce, palm sugar, Thai aubergine, pea aubergine, basil, makrut-lime leaf and a chosen protein. These are signals, not a universal ingredient guarantee.
- Vegetable, tofu or meat-free appearance does not prove vegetarian or vegan status. Check shrimp paste, fish sauce, stock, commercial paste, seasoning and shared tools.
- A familiar version can be dairy-free, but coconut appearance is not certification. Check commercial paste, stock, substitutes and shared preparation.
- Do not promise gluten-free status from appearance. Check paste, fish sauce, stock, soy-based seasonings, labels and cross-contact when coeliac safety matters.
- Heat varies by chilli, paste, quantity and cook. The broad curry guide retains comparative heat intent; do not crown green curry universally hottest or milder than red.
- Thailand Foundation places its emergence in the early twentieth century. Present that as a sourced historical placement, not a documented inventor or exact birth year.
- Do not publish fixed prices, calories, universal health claims, one authentic protein, unsupported first-hand experience or Recipe schema without independently tested quantities and timings.

## Source set

1. Thailand Foundation, *Kaeng Khiao Wan: Thailand’s Iconic Green Curry* — Thai name, colour-language explanation, historical placement, ingredients, serving and preparation. Full DFS parse.
2. Hot Thai Kitchen, *Authentic & Easy Thai Green Curry Chicken* — fresh-green-chilli colour, paste and broth signals, common protein, vegetables, serving choices and tested preparation. Full DFS parse.
3. Tourism Authority of Thailand, *Discover Thai Cuisine through its famous four regions* — Central Thailand context and common curry-paste ingredients. Existing full DFS parse from 28 July 2026.
4. Michelin Guide, *How To Make Thai Green Curry Like A Michelin Starred Restaurant* — fresh paste, coconut proportion, ingredient and balance corroboration. Current search capture; direct DFS body parse unavailable.

## Design and monetisation plan

- Reuse `DishEditorialTemplate` with a unique rights-safe green-curry hero.
- Visual direction: vivid but natural green curry on the right, Thai aubergine, pea aubergine, basil, makrut-lime leaf and chicken visible; elegant Central Thai riverside or teak dining setting; calm deep jade negative space on the left.
- One disclosed Klook cooking-class exit with unique sub-ID `en-green-curry-thailand-cooking-class`; require checking the current menu and whether paste is made from scratch.
- Two restrained Amazon OneLink products: a broad Thai cookbook and the registered granite mortar. Use “Check current price at Amazon” only.
- Natural related links: broad Thai curry comparison, Thai food hub and Thailand cooking-class owner.

## QA requirements

- Dish route remains self-canonical and appears once in the English sitemap.
- Comparison owner remains independently indexable and preserves its current ranking intent.
- Unique title, description, Article, BreadcrumbList, ItemList and FAQPage schema; no Recipe schema.
- One H1, descriptive hero alt, no horizontal overflow at 390 px and comfortable affiliate CTA dimensions.
- TypeScript, targeted ESLint, cannibalisation, affiliate, design-system and full English runtime gates.
