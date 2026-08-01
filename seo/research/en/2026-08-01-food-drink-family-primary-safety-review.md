# English food-and-drink family: primary-source safety review

Date: 2026-08-01
Scope: the 72 indexed English routes under `/food/` and `/drinks/`
Market and language: English, with UK-oriented spelling where copy is newly written

## Intent boundary

- `/food/` owns the broad Thai-dish discovery intent; its 45 indexed children own a named-dish decision, ordering and home-cooking intent.
- `/drinks/` owns broad Thai-beverage discovery; its 25 children own a named-drink identity, ingredients, ordering and safety intent.
- `/city/[slug]/food/` remains the location-specific owner. Generic dish and drink owners link into the travel journey but do not manufacture restaurant rankings or venue availability.
- Recipe schema is only defensible when the rendered owner contains both a real ingredient list and ordered preparation steps. The 25 current drink records contain ingredients but zero complete step sets, so their refreshed route output uses Article + BreadcrumbList + FAQPage and intentionally emits no Recipe schema.

## Primary evidence checked on 2026-08-01

1. CDC Yellow Book, _Food and Water Precautions for Travelers_: https://www.cdc.gov/yellow-book/hcp/preparing-international-travelers/food-and-water-precautions-for-travelers.html
   - Supports the conservative boundary around unopened factory-sealed or adequately treated water when safety is uncertain.
   - Supports asking about ice and avoiding it when safe-water provenance cannot reasonably be established.
   - Supports distinguishing freshly boiled/hot drinks from drinks made with uncertain water or ice.
2. World Health Organization, _Five keys to safer food_: https://www.who.int/activities/promoting-safe-food-handling/five-key-to-safer-food
   - Supports clean handling, raw/cooked separation, thorough cooking, safe temperatures, and safe water/raw materials.
3. CDC Travelers' Health, _Allergies and Travel_: https://wwwnc.cdc.gov/travel/page/allergies
   - Supports carrying a translated allergy card, making the preparer aware of the allergy, retaining medication and an emergency plan, and not relying on an unlabeled item.
4. Tourism Authority of Thailand Newsroom, _Alcohol sales and consumption rules updated in Thailand – what tourists need to know_, 29 May 2026: https://www.tatnews.org/2026/05/alcohol-sales-and-consumption-rules-updated-in-thailand-what-tourists-need-to-know/
   - Supports age 20+, the currently reported general sales window, and explicit warnings that venue-specific, prohibited-place and temporary restrictions still apply.

## Applied evidence rules

- A listed allergen is a prompt to ask, never a guarantee of absence or suitability.
- Drink names do not prove ingredients: premixes, milk/creamer, shared blenders, utensils, toppings and substitutions remain vendor-level checks.
- Exact alcohol percentages in old JSON are not rendered as timeless facts; users are told to check the current bottle label or menu.
- Old `budget`, `mid-range` and invented fallback THB bands are not rendered on English drink details. No current seller price is claimed.
- No health-benefit promise is derived from ingredient names, colour or traditional use.
- Article and FAQ copy distinguishes a common version from the actual serve.

## Affiliate boundary

- Amazon is not injected across all 25 drink routes.
- It appears only on Thai iced tea, Thai milk tea, Thai iced coffee and oliang, where the existing tea blend or portable coffee brewer directly supports the user task.
- Every CTA uses the central `/go/` registry, `nofollow sponsored`, a clear Amazon disclosure and a “check current price” formulation.
- OneLink is described as conditional: country, store, seller, product, price and availability can differ.

## Dataset observations

- 25/25 drink records have a local image.
- 25/25 have at least one ingredient signal.
- 6/25 are alcoholic routes.
- 0/25 currently contain a complete ordered method, so 0/25 qualify for Recipe schema in the refreshed output.
- 45/45 indexed food-detail routes dispatch to independently authored premium dish owners; the legacy `khao-soi` food route is excluded from the English sitemap and permanently redirects to its established editorial owner.
