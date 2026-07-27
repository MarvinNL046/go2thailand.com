# Massaman Curry English owner brief

## Owner decision

- Canonical owner: `/food/massaman-curry/`
- Primary query: `massaman curry thailand`
- Supporting intent: what it is, taste, ingredients, heat, origin, ordering, halal and vegetarian checks, and comparison with Panang.
- Keep `/blog/thai-curry-guide-green-red-yellow-massaman-panang/` as a distinct comparison pillar. It answers curry-choice intent and should link naturally to this deeper dish owner.
- No Massaman-specific legacy route requires consolidation.
- Exact ranking and backlink checks returned no ranking keywords and no reportable backlink signal for the canonical owner on 27 July 2026.

## DFS evidence

- Existing comparison cluster: 92 keyword records and 50 competitor domains.
- Primary UK market signal: `massaman curry thailand`, volume 27,100 and KD 23 in the captured cluster.
- Ten current UK-English SERPs captured independently.
- 75 organic results, 58 People Also Ask appearances and 48 unique genuine PAA questions after excluding the aggregate cluster file.
- Full DFS source parses available for Hot Thai Kitchen, Tourism Authority of Thailand regional food coverage, Tourism Authority of Thailand four-regions coverage and Thailand Foundation culinary context.
- Michelin's current Massaman history page was retained as a source-discovery signal only because DFS returned no usable body markdown.

## Search intent to satisfy

The owner is a traveller-facing dish and ordering guide, not a recipe clone. It must help a visitor:

1. recognise the warm-spiced, coconut-rich and often stew-like profile;
2. understand that recipe, protein, paste and heat vary;
3. check peanut, fish, shellfish and shared-preparation risks;
4. distinguish Muslim roots from a guaranteed halal kitchen or certification;
5. request a vegetarian or vegan version without assuming the visible vegetables prove it;
6. choose between chicken, beef and a specifically confirmed meat-free version;
7. compare Massaman with Panang without declaring a universal winner;
8. order rice or roti and confirm portion and current menu details;
9. understand the trade-route and Thai-Muslim context without claiming one settled origin story.

## Selected genuine PAA questions

- What is Massaman curry made of?
- What does Massaman curry taste like?
- How hot is a Massaman curry?
- Is Massaman a mild curry?
- Is Massaman curry Indian or Thai?
- Where is Massaman curry from in Thailand?
- Is Thai Massaman curry vegetarian?
- Is Massaman curry pork or chicken?
- What is the difference between Massaman curry and Thai curry?
- Is Massaman curry hotter than Panang curry?

Answers must remain conditional at vendor and recipe level. Similar duplicated questions may be combined in the visible FAQ while preserving the actual researched wording in the method record.

## Evidence boundaries

- Common warm spices include cinnamon, cardamom, cumin, coriander, cloves, nutmeg or mace, but there is no single universal formula.
- Coconut milk, curry paste, potato, onion, tamarind, peanut and chicken or beef are common signals, not a guarantee for every plate.
- Muslim and trade-route influences are well supported; exact birthplace and a single unchanged origin story are not.
- Pork is uncommon in traditional context, but the dish name alone does not prove halal meat, utensils, stock, alcohol-free preparation or certification.
- A curry may be relatively gentle compared with another plate, but the name does not guarantee a fixed chilli level.
- Vegetarian and vegan status requires checking paste, shrimp paste, fish sauce, stock, protein and shared equipment.
- No fixed price, fixed nutrition, universal health ranking, authenticity hierarchy or unsupported first-hand experience.
- Do not add Recipe schema: the page gives a decision sequence, not tested quantities and timings.

## Source set

1. Hot Thai Kitchen, *Authentic Thai Massaman Curry with Chicken* — ingredients, dry-spice distinction, common proteins and cooking sequence. Full DFS parse.
2. Tourism Authority of Thailand, *Much-loved, must-eat dishes from different regions of Thailand* — Thai-Muslim context, common proteins, potato, onion, coconut milk and peanut. Full DFS parse.
3. Tourism Authority of Thailand, *Discover Thai Cuisine through its famous four regions* — regional and southern cross-cultural context. Full DFS parse.
4. Thailand Foundation, *Secrets to Thai Cooking* — wider Thai culinary context and Massaman's international recognition. Full DFS parse.
5. Michelin Guide, *What Is Massaman Curry?* — current discovery evidence for trade-route/history nuance; no full DFS body was available, so do not rely on unsupported detail from the empty parse.

## Design and monetisation plan

- Use the reusable `DishEditorialTemplate` with a distinct rights-safe hero rather than a generic curry photograph.
- Visual direction: copper-gold Massaman curry, potato, onion, peanut and warm spices; deep jade/indigo restaurant atmosphere with strong left-side negative space for the hero copy.
- Keep one disclosed Klook cooking-class exit using a unique Massaman sub-ID.
- Keep at most two contextual Amazon OneLink products: one Thai cookbook and one granite mortar. Use “Check current price at Amazon”; never display or imply a fixed price.
- Link naturally to the broad Thai curry comparison pillar, Thai food hub and vegetarian ordering guide.

## QA requirements

- Unique title, description, canonical, Article, BreadcrumbList, ItemList and FAQPage schema.
- One H1, useful heading order, descriptive image alt text and no horizontal overflow at 390 px.
- Desktop and mobile visual review.
- TypeScript, targeted ESLint, affiliate verifier, design-system verifier, cannibalisation gate and full EN runtime audit.
