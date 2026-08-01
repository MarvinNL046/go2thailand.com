# NL Bangkok evergreen batch 2 — owner- en runtime-audit

Datum: 1 augustus 2026

| Slug | Besluit | Renderowner | Profiel |
|---|---|---|---|
| `24-hours-talad-noi-bangkok-hidden-gem` | ready/index | NL editorial | ready |
| `chatuchak-market-bangkok-guide` | ready/index | NL editorial | ready |
| `chatuchak-weekend-market-food-guide` | ready/index | `ChatuchakFoodGuide` | ready evidence-profiel |
| `grand-palace-bangkok-complete-guide-2026` | ready/index | NL editorial | ready |
| `jodd-fairs-bangkok-night-market-guide` | ready/index | `JoddFairsRatchadaGuide` | ready evidence-profiel |
| `wat-arun-bangkok-temple-of-dawn-guide` | ready/index | NL editorial | ready |
| `wat-pho-bangkok-reclining-buddha` | ready/index | NL editorial | ready |
| `bangkok-in-4-dagen-vanuit-nederland-vluchtig-stedentrip-plan` | archived/noindex | NL editorial | archived + noindex |

## Assets en schema

- Acht route-eigen 1800×1012 WebP-heroes zijn als geoptimaliseerde derivaten opgeslagen onder `/images/redesign/editorial/<slug>-hero.webp`.
- Jodd Fairs en Chatuchak Food gebruiken hun bestaande gespecialiseerde premium beeld als bron; de andere routes gebruiken hun bestaande route-eigen bronbeeld.
- Alle acht profielen valideren via `loadNlEditorialProfile`, matchen het manifestcluster en verwijzen naar exact hetzelfde hero-pad als de frontmatter.

## Acceptatiegates

- Runtime: 8/8 HTTP 200 en exact één H1; alle routes hebben een zelfrefererende NL-canonical.
- Runtimebody: 0 legacywidgets, iframes of `javascript:`-URLs.
- De zeven ready-routes renderen zonder robots-noindex; de archived vierdagenroute toont aantoonbaar `noindex,follow`.
- Alle frontmatterbodies zijn vervangen door korte, veilige NL fallbackcopy; Jodd Fairs en Chatuchak Food tonen desondanks terecht hun rijkere specialistische owner.
- Mobile sanity volgt uit dezelfde responsive template/special-owner die reeds op 390px wordt gebruikt; er is in deze batch geen nieuwe route-eigen layoutcode toegevoegd.
- Registryprioriteit voor Jodd Fairs en Chatuchak Food blijft ongewijzigd.
- Geen central family-, keyword-, ledger-, package- of registrybestand is in deze batch gewijzigd.
