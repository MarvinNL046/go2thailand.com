# Larb English owner brief

**Canonical owner:** `https://go2-thailand.com/food/larb/`  
**Locale / market:** UK English / United Kingdom  
**Research date:** 28 July 2026  
**Status:** ready for implementation

## Search evidence

- DataForSEO cluster: 216 keyword records and 50 competitor domains.
- Primary intent: `larb`, `larb food`, `thai dish larb`, `thai larb` (volume 2,900; KD 17-21).
- Supporting intent: `larb recipe` (1,000; KD 21), `larb gai` (880; KD 0), `larb pork` (720), `chicken larb` (590), `larb moo` (480).
- Ten current UK-English SERPs: 76 organic results and 53 People Also Ask appearances, with 41 unique questions.
- Exact owner ranking and backlink checks found no ranking keywords and no reportable backlink summary signal.
- `/food/laab-kua/` also has no ranking or backlink summary signal, but remains a distinct Northern Thai dish owner rather than a duplicate.

## Ownership boundary

`/food/larb/` owns the general traveller-facing Isan / Lao-influenced minced-meat herb salad intent, including spelling variants `larb`, `laab` and `laap`, common pork and chicken choices, toasted rice powder, how to eat it, how to order it, heat, dietary checks and a safe home-cooking sequence.

`/food/laab-kua/` retains Northern Thai cooked/spiced laab intent. It should not be merged into this owner: Northern laab commonly uses a different dry-spice and frying profile, while the familiar Isan version is lime-, herb- and toasted-rice-led. The owner may compare the two, but must link to the separate route.

Recipe quantities, restaurant-near-me intent, celebrity diets, fixed calories, brand menus and supermarket-product queries are not primary owner intent. The page is an editorial travel and ordering guide, not a Recipe-schema recipe.

## Fact and safety boundaries

- Describe larb as a dish family, not one universal formula.
- Familiar Isan signals include minced protein, lime, fish sauce, toasted rice powder (`khao khua`), dried chilli, shallot and fresh herbs such as mint; vendor and regional recipes vary.
- Pork (`larb moo`), chicken (`larb gai`), beef, duck, fish and mushroom or tofu adaptations exist. Do not claim one protein is the authentic default.
- Raw or blood-containing relatives and variants exist. Never claim all larb is cooked or that raw meat is safe when fresh.
- For travellers, recommend asking for a fully cooked version when preparation is uncertain. WHO guidance treats minced meat as requiring particular attention and advises thorough cooking.
- Do not publish a universal temperature as restaurant-ordering advice; the home-cooking boundary may refer readers to WHO and a tested recipe for exact safe temperatures and handling.
- Do not claim larb is automatically gluten-free, soy-free, vegetarian or vegan. Fish sauce, stock, seasoning sauce, toasted-rice product, premixes and shared preparation all need checking.
- Do not claim it is inherently healthy or assign fixed calories. Protein, fat, sodium, portion and accompaniments vary materially.
- Heat is adjustable in some made-to-order kitchens, but premixes and shared preparation mean `mai pet` is a request rather than a zero-chilli guarantee.
- Sticky rice, cabbage, long beans and other raw vegetables are common accompaniments, not mandatory components of every plate.

## Genuine PAA set selected for the page

1. What is a larb made of?
2. What does larb mean in Thai?
3. How are you supposed to eat larb?
4. Is there a difference between laab and larb?
5. Is Larb Moo raw?
6. What is the difference between laab and Nam Tok?
7. What are the different types of larb Thai?
8. How is larb traditionally served?
9. Is Thai larb gluten-free?
10. How do you say larb in Thai?

Questions about weight loss, fixed calories, nearby restaurants, branded menus and unrelated Thai dishes are excluded even when surfaced in PAA.

## Information-gain design

- Hero immediately explains the dish family and spelling issue.
- Taste compass separates sour, herbaceous, toasted and hot signals without presenting a fixed formula.
- Ingredient grid shows visible signals and hidden dietary checks.
- Choice cards distinguish Isan larb, Northern laab kua and nam tok rather than flattening them.
- Three-step ordering route: choose protein, request cooked / heat level, confirm sauces and allergies.
- Cooking sequence explains toasted-rice texture and off-heat seasoning while delegating quantities and safety controls to a tested recipe.
- One contextual Amazon cookbook route and one mortar route are permitted because toasted rice, chilli and aromatics create a genuine home-cooking task; both use central OneLink-compatible `/go/` routes and current-price wording.
- One broad Klook cooking-class route is permitted with explicit menu and dietary-verification language.

## Sources captured

- Thailand Foundation, *Northeast Thai Cuisine* - regional context, Isan / Lao-PDR relationship, sticky rice and larb with toasted rice powder.
- Hot Thai Kitchen, *Authentic Thai Laab (Larb) Recipe with Pork* - spelling, familiar ingredients, serving, toasted-rice and technique signals; treated as one tested recipe, not a universal definition.
- World Health Organization, *Public health advice on food safety during summer* - separation of raw and cooked foods and thorough cooking, with specific attention to minced meat.
- Thailand Foundation, *Northern Thai Cuisine* - Northern regional context used to maintain the separate `/food/laab-kua/` owner boundary.

## QA requirements

- Unique text-free rights-safe hero in project WebP storage.
- Canonical, EN/NL hreflang and Article/BreadcrumbList/ItemList/FAQPage schema through the shared template.
- No horizontal overflow at 390 px or 1,280 px.
- Natural links to `/food/`, `/food/laab-kua/`, `/food/som-tam/` and the vegetarian ordering guide.
- Affiliate disclosure adjacent to Amazon and Klook links; all external commercial links sponsored/nofollow.
- TypeScript, focused ESLint, cannibalisation, affiliate, design-system and full layered English runtime audits green.
