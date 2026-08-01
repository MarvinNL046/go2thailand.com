# NL editorial batch 24 — implementatie-audit

Datum: 1 augustus 2026
Scope: exact zeven toegewezen routes. Trat en Koh Kood/Trat zijn niet geopend, gewijzigd of opnieuw ingepland.

## Resultaat per route

| Route | Lifecycle | Indexatie | Owner / vervolg |
|---|---|---|---|
| `exercise-cope-tiger-2026-korat-air-base-thailand` | `archived`, elapsed | `noindex,follow` | historisch defensiearchief; geen redirect |
| `harbor-island-bangkok-rooftop-waterpark-2026` | `ready`, evergreen | index | gespecialiseerde branch-, route- en gezinsowner |
| `healing-journey-thailand-wellness-campaign-2026` | `ready`, evergreen | index | TAT-campagne en wellnesskeuzegrenzen |
| `khao-sok-floating-bungalows-cheow-lan-lake-glamping-guide-2026` | `archived`, `superseded` | `noindex,follow` | redirectadvies naar `/nl/best-hotels/khao-sok/` |
| `koh-kradan-bileh-beach-five-star-rating-thailand-2026` | `ready`, confirmed | index | gedateerde Beach Star 2025-context |
| `koh-tao-coral-restoration-eco-diving-rules-2026` | `ready`, effective policy | index | DMCR-regels en operator-/herstelcheck |
| `middle-east-conflict-thailand-flights-airfare-2026` | `ready`, developing | index | individuele vlucht-, transit- en voorwaardencheck |

## Gewijzigde artefacten

- Zeven Nederlandse Markdown-bodies volledig herschreven.
- Zeven typed editorial-profielen toegevoegd.
- Zeven route-eigen imagegen-heroes gegenereerd, naar WebP geconverteerd en lokaal opgeslagen.
- Eén route-eigen componentregel aangepast: `HarborIslandBangkapiGuide.tsx` gebruikt nu dezelfde nieuwe hero als frontmatter en profile.
- Batchspecifiek researchdossier en deze audit toegevoegd.
- Geen wijzigingen aan `family-completion.json`, ledger, keywordmap, `next.config.js`, sitemap of andere centrale administratie.

## Specialized renderer en typed profile

Harbor Island heeft al een geregistreerde `harbor-island-nl`-renderer. `pages/blog/[slug].tsx` slaat voor geregistreerde owners de generieke `NlEditorialArticle`-renderer over. Alleen een nieuw typed profile zou de zichtbare hero daarom niet wijzigen.

De componentconstante is route-specifiek bijgewerkt naar `/images/redesign/editorial/harbor-island-bangkok-rooftop-waterpark-2026-hero.webp`. Loadercontrole bevestigt tegelijk een geldig typed profile met `ready`/`evergreen-guide`; registrycontrole bevestigt `harbor-island-nl`. Runtime toont de nieuwe hero, één H1, self-canonical en de bestaande zeven JSON-LD-blokken van de gespecialiseerde owner.

## Lifecycle en redirect

- Vijf routes zijn `ready` en indexeerbaar.
- Cope Tiger is verstreken en daarom `archived` + `noindex,follow` zonder redirect; de route bewaart eigen historische bronwaarde.
- Khao Sok floating bungalows overlapt de bestaande hotelowner en is daarom `archived`, `superseded` en `noindex,follow`.
- Aanbevolen permanente redirect: `/nl/blog/khao-sok-floating-bungalows-cheow-lan-lake-glamping-guide-2026/` → `/nl/best-hotels/khao-sok/`.
- De redirect is niet lokaal geïmplementeerd omdat centrale redirectconfiguratie expliciet buiten batchscope valt; root handelt de centrale redirect-runtime af.

## Keywords

| Route | Primair | Secundair |
|---|---|---|
| Cope Tiger | `Cope Tiger 2026 Korat` | `Korat Air Base oefening`; `Cope Tiger Thailand`; `luchtmachtoefening Nakhon Ratchasima` |
| Harbor Island | `Harbor Island Bangkapi` | `Harbor Island Bangkok`; `waterpark Bangkok met kinderen`; `The Mall Lifestore Bangkapi waterpark` |
| Healing Journey | `Healing Journey Thailand 2026` | `wellness Thailand`; `Healing is the New Luxury`; `Thailand wellnesscampagne` |
| Khao Sok | `Khao Sok floating bungalows` | `Cheow Lan Lake overnachten`; `Khao Sok raft house`; `drijvende bungalow Khao Sok` |
| Koh Kradan/Bileh | `Koh Kradan Bileh Beach vijf sterren` | `Beach Star Thailand 2025`; `Koh Kradan milieuscore`; `Bileh Beach Koh Hong` |
| Koh Tao | `Koh Tao koraalregels duiken` | `verantwoord duiken Koh Tao`; `koraalherstel Koh Tao`; `DMCR duikregels Thailand` |
| Vluchten | `Thailand vlucht via Midden-Oosten` | `vluchtverstoring Thailand`; `overstap Dubai Thailand`; `vliegticket Thailand routecheck` |

De vraagfamilies zijn geobserveerd via zichtbare openbare resultaten, snippets en officiële navigatie. Er zijn geen DFS-volumes, rankings, concurrentiemetrieken of PAA-vragen verzonnen. De centrale keywordmap is niet gewijzigd.

## Assetcontrole

Alle heroes zijn 1536×864 pixels, WebP, kleiner dan 450 KB en onderling uniek. Iedere frontmatter-`image` is gelijk aan `profile.hero.image`.

| Slug | Bytes | SHA-256 prefix |
|---|---:|---|
| `exercise-cope-tiger-2026-korat-air-base-thailand` | 40.552 | `6dee286c4873` |
| `harbor-island-bangkok-rooftop-waterpark-2026` | 257.460 | `640c17409122` |
| `healing-journey-thailand-wellness-campaign-2026` | 143.754 | `3955f0592a4d` |
| `khao-sok-floating-bungalows-cheow-lan-lake-glamping-guide-2026` | 165.324 | `6c656dcab638` |
| `koh-kradan-bileh-beach-five-star-rating-thailand-2026` | 162.432 | `3995e5ab9958` |
| `koh-tao-coral-restoration-eco-diving-rules-2026` | 133.868 | `3bd7b876199f` |
| `middle-east-conflict-thailand-flights-airfare-2026` | 71.824 | `4acfb82cde0e` |

## Runtimecontrole op localhost:3000

Alle zeven routes:

- geven HTTP 200;
- renderen exact één H1;
- renderen de route-eigen nieuwe hero;
- renderen een absolute self-canonical op `https://go2-thailand.com/nl/blog/{slug}/`;
- renderen één `nl`, `en` en `x-default` hreflang;
- renderen minimaal twee JSON-LD-blokken;
- Cope Tiger en Khao Sok renderen `robots=noindex,follow`;
- de vijf ready-routes renderen geen noindex-directive.

## QA

- `requireNlEditorialProfile()` voor alle zeven slugs: geslaagd.
- Specialized-ownercheck Harbor Island: `harbor-island-nl`, geslaagd.
- Runtime HTTP/H1/canonical/hreflang/schema/robots/hero: geslaagd voor 7/7.
- Assetmetadata, bestandsgrootte, frontmatter/profile-match en batch-hashuniciteit: geslaagd.
- `node node_modules/typescript/bin/tsc --noEmit --incremental false`: exit 0.
- `npm run design:verify`: geslaagd, 7 primitives en 34 pilot templates.
- `npm run affiliate:verify`: geslaagd, 17 gebruikte Amazon-slugs en 21 geregistreerde producten. Deze batch voegt geen nieuwe affiliateblokken toe; Harbor behoudt zijn bestaande transparante Klook-plaatsing.
- `npm run seo:cannibalization`: geslaagd, 0 harde conflicten en 0 waarschuwingen.
- Scoped `git diff --check` plus whitespacecontrole op nieuwe textartefacten: geslaagd.

## Centrale handoff

Root kan na inhoudelijke acceptatie de zeven routes en evidence in family-/keywordadministratie opnemen, de Khao Sok-redirect centraal implementeren en daarna accepted-only editorial-, asset-, risico- en ledgergates uitvoeren.
