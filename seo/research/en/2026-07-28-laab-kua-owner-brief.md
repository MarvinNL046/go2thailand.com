# Laab Kua English owner brief

**Canonical owner:** `https://go2-thailand.com/food/laab-kua/`  
**Locale / market:** UK English / United Kingdom  
**Research date:** 28 July 2026  
**Status:** ready for implementation

## Search evidence

- Three independent DataForSEO clusters: `laab kua`, `northern thai larb` and `laab khua`.
- Four cluster records in total, zero competitor-domain records.
- `laab kua` and `northern thai larb` each have UK volume 10; no usable KD was returned.
- Ten current UK-English SERPs: 67 organic results and 55 People Also Ask appearances, with 32 unique questions.
- Exact owner ranking and backlink checks found no ranking keywords and no reportable backlink summary signal.
- The low volume is not a reason to merge the URL into broad Larb: the SERPs and food sources consistently distinguish the cooked Northern spice-led form from familiar Isan larb.

## Ownership boundary

`/food/laab-kua/` owns Laab Kua / Laab Khua / Larb Kua, Northern Thai laab, Northern laab spice, prik laab, makhwaen, its cooked preparation, how it differs from Isan larb, how to order it and what commonly accompanies it.

`/food/larb/` remains the broad owner for general `larb`, `laab`, `laap`, Isan / Lao-influenced lime-and-toasted-rice forms, common pork and chicken choices, general spelling and broad traveller intent. The two pages must link naturally in both directions without repeating the same full ingredient or FAQ set.

Recipe quantities, commercial spice-paste shopping, restaurant-near-me, fixed calories and raw Northern laab are not primary owner intent. This remains an editorial travel and ordering guide and must not emit Recipe schema.

## Fact and safety boundaries

- Laab Kua is a cooked Northern Thai / Lanna laab form. Chiang Mai University describes it as seasoned laab that is then `kua`-cooked; Hot Thai Kitchen explains `kua` as stirring in a hot pan.
- Do not translate `kua` into one universal dry-frying rule. Northern `kua` methods can involve a little oil, water or neither depending on the dish and recipe.
- A Northern `prik laab` spice blend is the central signal. Common documented examples include dried chilli, coriander seed, cumin, pepper, long pepper, makhwaen / prickly ash, cloves, star anise, cinnamon, nutmeg, cardamom and other aromatics. No one list is a golden standard.
- Makhwaen is a characteristic Northern prickly-ash spice with aromatic and tingling qualities. Sichuan pepper is a substitute in some overseas recipes, not the same ingredient.
- Pork and beef are familiar; chicken and other proteins occur. Offal, liver or blood appear in some traditional or regional forms but are not mandatory. Ask rather than universalise.
- Northern Laab Kua is commonly darker, more roasted and spice-led than Isan larb. Lime and toasted rice are not defining signals here; never claim every Northern plate omits them without checking the kitchen.
- Raw Northern laab exists, but Laab Kua is the cooked owner. Never recommend raw minced meat or imply freshness makes it safe.
- Fish sauce, stock, soy, wheat-containing seasoning, spice premixes and shared equipment require vendor-level checks. Do not claim automatic gluten-free, soy-free, vegetarian or vegan status.
- Heat varies with the prik laab and additional chilli. A made-to-order reduction may be possible but is not guaranteed once premixed spice is used.
- Sticky rice, raw vegetables, herbs, fried garlic or shallot and pork rind are familiar accompaniments, not universal requirements.
- Do not publish fixed price, calorie, health, shelf-life or safety claims.

## Genuine PAA set selected for the page

1. What are the spices in Northern laab?
2. Is there a difference between laab and larb?
3. What is laab seasoning made of?
4. What is laab made of?
5. What is a famous northern Thai dish?
6. What are the different types of laab?
7. Is Thai laab spicy?
8. How is Laab served?
9. Is laab eaten hot or cold?
10. What does laab taste like?

Broad questions are answered specifically for Laab Kua, with a handoff to `/food/larb/` when the question belongs to the wider dish family. Health, celebrity, branded paste and unrelated menu questions are excluded.

## Information-gain design

- Hero immediately presents a darker cooked Northern plate and explains the spice-led boundary.
- Taste compass uses roasted spice, savoury depth, herbal lift and heat instead of copying the Isan page's sour / toasted-rice framework.
- Ingredient signals focus on prik laab, makhwaen, cooked mince, optional offal and finishing herbs.
- Choice cards separate Laab Kua, raw Northern laab and Isan larb while keeping the owner safely focused on the cooked form.
- Three-decision ordering route: name the Northern form, confirm cooked protein and optional offal/blood, then check heat and hidden seasoning.
- Cooking sequence covers roasting and grinding the spice blend, raw/cooked separation and fully cooking mince while delegating quantities and temperatures to a tested recipe.
- Contextual Amazon cookbook and mortar routes are permitted because spice roasting and grinding create a genuine home-cooking task; both stay behind central OneLink-compatible `/go/` routes with current-price wording.
- One broad Klook cooking-class route is permitted with explicit current-menu and food-handling checks.

## Sources captured

- Hot Thai Kitchen, *Northern Laab Kua: The Other Laab You Didn't Know About* - complete DFS parse for naming, ingredients, prik laab variability, preparation, accompaniments, protein choices and cooked-versus-raw boundary.
- Chiang Mai University Library, Northern Thai Information Center, *Laab / Luu* - current primary Thai-language source capture for the definition of Laab Kua as seasoned laab subsequently cooked by `kua`; DFS parsing returned zero markdown, so no unsupported machine-translation detail is used.
- Epicurious / Chef Hong Thaimee, *How A Thai Chef Makes Northern-Style Laab & Sticky Rice* - complete DFS transcript parse for Lanna context, prik laab spices and the distinction from familiar Isan toasted-rice larb.
- KHUA Phayao, *How to Make Phayao Northern Laab* - complete commercial-source parse for one regional Phayao expression, makhwaen and roasted-spice focus; product claims are not adopted.
- Thailand Foundation Northern cuisine and WHO minced-meat food-safety sources captured for the immediately preceding Larb owner remain applicable supporting controls.

## QA requirements

- Unique text-free rights-safe hero, visually distinct from the Isan Larb hero, stored as optimised WebP in the project.
- Canonical, EN/NL hreflang and Article/BreadcrumbList/ItemList/FAQPage schema through the shared dish template.
- No horizontal overflow at 390 px or 1,280 px.
- Natural links to `/food/larb/`, `/city/chiang-mai/`, `/food/khao-soi/` and the Northern region owner where relevant.
- Affiliate disclosure adjacent to Amazon and Klook links; all external commercial links sponsored/nofollow.
- TypeScript, focused ESLint, cannibalisation, affiliate, design-system and full layered English runtime audits green.
