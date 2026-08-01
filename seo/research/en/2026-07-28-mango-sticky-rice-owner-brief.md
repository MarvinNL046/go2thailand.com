# Mango Sticky Rice English owner brief

## Owner decision

- Canonical owner: `/food/mango-sticky-rice/`
- Primary query: `mango sticky rice thailand`
- Preserve five current ranking variants on the dish owner: `mango rice thailand`, `mango sticky rice thailand`, `sticky rice thailand recipe`, `thailand mango sticky rice recipe` and `khao niao mamuang`.
- Consolidate the English `/blog/mango-sticky-rice-season-thailand/` into the dish owner. It returned zero ranking keywords and no reportable backlink signal, while its broad dish, ingredient, recipe, season and where-to-eat coverage overlaps the stronger owner.
- Keep the Dutch seasonal blog unchanged; the consolidation is locale-specific.
- Migrate natural English internal links from the legacy blog to the dish owner and include a concise, sourced season decision inside the canonical page.

## DFS evidence

- Keyword cluster: 37 records and 50 competitor domains.
- `mango sticky rice thailand`: UK volume 720, KD 19.
- `mango sticky rice recipe`: UK volume 2,900, KD 11. Recipe expectations should be supported with a useful sequence and a tested external source, not an invented recipe or unsupported Recipe schema.
- Ten current UK-English SERPs: 68 organic results, 56 PAA appearances and 50 unique genuine questions.
- Exact ranking/backlink checks completed for both candidate owners.
- Four usable full DFS source parses: Hot Thai Kitchen, Tourism Authority of Thailand, Thailand Foundation and Coeliac UK.

## Search intent to satisfy

The canonical page should help a traveller or home cook:

1. recognise Thai mango sticky rice and its Thai name;
2. distinguish glutinous rice from jasmine, basmati or ordinary long-grain rice;
3. understand the sweet-salty-fruity texture and the role of salted coconut sauce;
4. recognise common toppings such as crisp split mung beans or sesame;
5. understand that the dish is available year-round but ripe mango quality is seasonal;
6. assess vegan, dairy and gluten boundaries without absolute guarantees;
7. choose a market, dessert specialist or restaurant version using visible quality signals rather than an unverified “best shop” list;
8. eat the mango, coconut rice and sauce together at the temperature served;
9. understand the preparation sequence while being directed to a tested recipe for exact quantities and food safety;
10. compare the actual current menu or class rather than relying on a fixed price.

## Selected genuine PAA questions

- What is mango sticky rice made of?
- What is mango sticky rice called in Thailand?
- What does mango rice taste like?
- Which rice is used to make sticky rice?
- Is Thai sticky rice the same as jasmine rice?
- Is mango sticky rice usually vegan?
- Is sticky rice gluten-free?
- Does mango sticky rice contain dairy?
- Are you supposed to eat mango sticky rice cold or warm?
- What month is mango season in Thailand?

Exclude irrelevant medical-clickbait PAA, generic boyfriend/celiac questions, near-me delivery, London restaurants, celebrity recipes and fixed calorie/health labels.

## Evidence boundaries

- Thai white long-grain glutinous rice, ripe mango, coconut milk, sugar and salt are the core signals in the parsed technique source.
- “Glutinous” describes sticky texture; rice is naturally gluten-free according to Coeliac UK. A finished vendor plate still requires checking thickeners, toppings, labels and cross-contact when coeliac safety matters.
- A familiar version can be plant-based, but condensed milk, dairy substitutions, toppings and shared equipment vary. Never claim every plate is vegan or dairy-free.
- Thailand Foundation places the broad mango season from late March to July and notes that mango sticky rice is available year-round but especially seasonal at the peak. TAT describes it as a summer dish. Do not claim two exact annual seasons or guaranteed inferior imported/frozen mango outside one narrow window.
- Do not claim a settled royal-court, Ayutthaya, Buddhist-temple or exact invention story without a primary source.
- Do not publish static shop awards, opening hours, fixed prices, exchange conversions or “safest street food” guarantees.
- No fixed calories, universal health judgement, “most beloved” superlative or unsupported first-hand experience.
- Do not add Recipe schema unless exact quantities, tested timings and a verified method are genuinely published.

## Source set

1. Hot Thai Kitchen, *Thai Mango Sticky Rice Recipe* — rice type, coconut-syrup method, salted sauce, mung-bean topping and tested preparation sequence. Full DFS parse.
2. Tourism Authority of Thailand, *Insight Thainess Episode 1: Mango with Sticky Rice* — Thai household, fruit-orchard and summer context. Full DFS parse.
3. Thailand Foundation, *A Beginner’s Guide to Seasonal Thai Fruits* — late-March-to-July mango season, ripe varieties and year-round-versus-peak distinction. Full DFS parse.
4. Coeliac UK, *Gluten Free Options: What Grains Can You Safely Eat?* — rice as naturally gluten-free and the need to control cross-contamination. Full DFS parse.

## Design and monetisation plan

- Reuse `DishEditorialTemplate` with dessert-specific copy and a unique rights-safe hero.
- Visual direction: ripe golden Nam Dok Mai-style mango, glossy coconut sticky rice and salted coconut sauce on the right; calm jade/cream orchard or canal-house atmosphere with clean negative space on the left.
- One disclosed Klook cooking-class exit with a unique Mango Sticky Rice sub-ID; user must confirm the current class menu.
- Two restrained Amazon OneLink products: a broad Thai cookbook and the registered rice cooker. The rice-cooker copy must explicitly require checking glutinous-rice/steam capability, voltage and plug compatibility.
- Use “Check current price at Amazon” only; never display a fixed price.
- Natural related links: Thai food hub, Bangkok street-food decision guide and seasonal Thai fruit/durian content where intent is genuinely complementary.

## QA requirements

- Locale-specific 308 from the English legacy seasonal blog; no redirect for the Dutch page.
- Legacy English URL absent from EN sitemap and feed, while `/food/mango-sticky-rice/` retains one self-canonical.
- Unique title, description, Article, BreadcrumbList, ItemList and FAQPage schema.
- One H1, descriptive hero alt, no horizontal overflow at 390 px and comfortable affiliate CTA dimensions.
- TypeScript, targeted ESLint, cannibalisation, affiliate, design-system and full EN runtime gates.
