# NL editorial batch 21 — implementatie-audit

Datum: 1 augustus 2026
Scope: exact zeven toegewezen routes; Trat en Koh Kood/Trat zijn niet geopend, gewijzigd of opnieuw ingepland.

## Resultaat per route

| Route | Lifecycle | Indexatie | Owner / vervolg |
|---|---|---|---|
| `u-tapao-pattaya-airport-new-flights-expansion-2026` | ready, confirmed | index | live vlucht- en luchthavenkeuze voor Pattaya/Rayong |
| `voco-bangkok-surawong-ihg-first-thailand-opening-2026` | ready, geopend | index | hotel-, locatie- en live-prijsowner |
| `wildlife-conservation-volunteering-thailand-2026-turtles-elephants` | ready, evergreen | index | dierenwelzijns-, no-touch- en juridische keuze-owner |
| `yoga-retreats-koh-samui-koh-phangan-2026-guide` | ready, evergreen | index | eiland-, programma- en verblijfvergelijking |
| `amazing-thailand-app-ai-mastercard-2026` | ready, confirmed | index | actuele appfuncties en verificatiegrenzen |
| `andamanda-phuket-day-songkran-pool-party-2026` | archived, elapsed | noindex, follow | historisch eventarchief; geen actuele verkoop |
| `banana-beach-koh-hey-asia-best-beach-tripadvisor-2026` | ready, current award | index | awardcontext en dagtripafweging voor Koh Hey |

## Gewijzigde artefacten

- Zeven Nederlandse Markdown-bodies volledig herschreven.
- Zeven typed editorial-profielen toegevoegd.
- Zeven route-eigen WebP-heroes gegenereerd en lokaal opgeslagen.
- Researchdossier en deze implementatie-audit toegevoegd.
- Geen wijzigingen aan `family-completion.json`, keywordmap, ledger, `next.config.js` of sitemap.
- Natuurlijke affiliates: Trip.com op de hotel- en retreatkeuze; Klook op de Koh Hey-dagtrip. Geen affiliate op informatie-, beleids- of verlopen eventroutes.

## Lifecycle en redirects

- Zes routes zijn `ready` en indexeerbaar.
- De Andamanda-editie is verstreken en daarom `archived` + `noindex,follow`.
- Geen route is inhoudelijk dubbel met een sterkere bestaande owner; er is geen redirectadvies.

## Assetcontrole

Alle assets zijn 1536×864 pixels, WebP, kleiner dan 450 KB en hebben een unieke SHA-256, ook vergeleken met de overige 166 editorial-assets:

| Slug | Bytes | SHA-256 prefix |
|---|---:|---|
| `u-tapao-pattaya-airport-new-flights-expansion-2026` | 63.424 | `bffb8eabda47` |
| `voco-bangkok-surawong-ihg-first-thailand-opening-2026` | 263.804 | `454ec9d11d20` |
| `wildlife-conservation-volunteering-thailand-2026-turtles-elephants` | 328.910 | `785ba96dcdf8` |
| `yoga-retreats-koh-samui-koh-phangan-2026-guide` | 162.386 | `5ed1ee935f7d` |
| `amazing-thailand-app-ai-mastercard-2026` | 92.410 | `331e49198986` |
| `andamanda-phuket-day-songkran-pool-party-2026` | 141.808 | `1d31c2e0ccfa` |
| `banana-beach-koh-hey-asia-best-beach-tripadvisor-2026` | 101.250 | `f0d4815a9146` |

## Runtimecontrole op localhost:3000

Alle zeven routes:

- geven HTTP 200;
- renderen exact één H1;
- renderen een absolute self-canonical op `https://go2-thailand.com/nl/blog/{slug}/`;
- renderen ieder twee JSON-LD-blokken en één `nl`, `en` en `x-default` hreflang;
- de gearchiveerde Andamanda-route rendert `robots=noindex,follow`;
- de zes ready-routes renderen geen noindex-directive.

## QA

- `requireNlEditorialProfile()` voor alle zeven slugs: geslaagd.
- Runtime op localhost:3000, H1, canonical, hreflang, schema en robots: geslaagd.
- Assetmetadata, bestandsgrootte en hash-uniciteit: geslaagd.
- `npx tsc --noEmit --incremental false`: geslaagd.
- `npm run design:verify`: geslaagd, 7 primitives en 34 pilot templates.
- `npm run affiliate:verify`: geslaagd, 17 gebruikte Amazon-slugs en 21 geregistreerde producten; nieuwe Trip.com- en Klookblokken volgen het bestaande typed disclosuremodel.
- `npm run seo:cannibalization`: geslaagd, 0 harde conflicten en 0 waarschuwingen.
- `git diff --check` op de batchbestanden: geslaagd.

## Centrale handoff

Root kan na inhoudelijke acceptatie de zeven routes en evidence in de family-/keywordadministratie opnemen en daarna accepted-only editorial-, asset-, risico-, cannibalisatie- en ledgergates uitvoeren. Er zijn geen redirects of sitemapuitsluitingen nodig.
