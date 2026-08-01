# NL editorial high-risk food review — batch B

Datum: 2026-08-01

Scope: drie ready/indexable NL-foodowners; geen centrale registries, redirects, sitemaplogica of family-completion gewijzigd.

## Routes en besluit

| Route | Status | Zelfstandige informatiewinst |
|---|---|---|
| `/nl/blog/khao-soi-chiang-mai-guide/` | ready / index | Chiang Mai-varianten, bouillon/noedel/topping-proefkader en allergenenbesluit; algemene gerechtowner blijft `/nl/food/khao-soi/`. |
| `/nl/blog/mango-sticky-rice-season-thailand/` | ready / index | Thaise zomer versus feitelijke fruitaanvoer, rijpheids- en versheidskader; algemene gerechtowner blijft `/nl/food/mango-sticky-rice/`. |
| `/nl/blog/night-markets-food-lovers-bangkok-chiang-mai-phuket/` | ready / index | Vergelijkende foodroute voor Bangkok, Chiang Mai en Phuket; lokale foodowners houden hun stadsintentie. |

Alle drie bestaande route-eigen hero-afbeeldingen zijn behouden. Copy, alttekst, CTA’s, informatiedichtheid en typed blocks zijn routespecifiek gemaakt.

## Research en inhoud

- Eén gebundelde researchnotitie: `seo/research/nl/2026-08-01-editorial-high-risk-food-batch-b-current-web.md`.
- Primaire/gezaghebbende bronnen: Thailand Foundation, Tourism Authority of Thailand/TAT Newsroom, Thailand.go.th/Thaise overheid, UNESCO en WHO/FAO.
- Geen DataForSEO-, zoekvolume-, ranking- of echte-PAA-claim.
- Geen vaste prijzen, gegarandeerde uren, persoonlijke ervaring of absolute winnaar.
- Allergenen worden als mogelijke ingrediënten en kruiscontact behandeld; geen kraam of gerecht krijgt een ongefundeerde allergeenvrij-garantie.
- Een affiliateblok is inhoudelijk afgewezen: een productlink helpt niet bij de directe gerecht-, seizoen- of marktkeuze.

## Verificatie

### Vooraf

- `npm run seo:cannibalization`: 0 harde botsingen, 0 waarschuwingen.

### Loader en profielen

- Scoped `requireNlEditorialProfile` voor alle drie slugs: `ready`, juiste self-canonical en respectievelijk 6, 7 en 6 geldige typed blocks.
- `npm run seo:verify:nl-editorial:accepted`: 253/253 accepted, 252 profielen geldig.
- `npm run seo:verify:nl-editorial-assets`: 252 hero’s lokaal, gematcht, uniek voor indexeerbare routes en maximaal 450 KB.

### Editorial risk, alleen deze scope

Dezelfde woord-, bron-, prijs-, tijd-, superlatief- en ervaringsregels als `audit-nl-editorial-content-risk.ts` zijn read-only op de drie Markdownbestanden toegepast:

| Slug | Woorden | Frontmatterbronnen | Flags |
|---|---:|---:|---:|
| `khao-soi-chiang-mai-guide` | 832 | 3 | 0 |
| `mango-sticky-rice-season-thailand` | 802 | 4 | 0 |
| `night-markets-food-lovers-bangkok-chiang-mai-phuket` | 957 | 5 | 0 |

De globale runtime-risicofile is bewust niet overschreven binnen deze exclusieve batch.

### Gerenderde runtime, schema/meta en design

Scoped gecontroleerd op de verse lokale Next.js-runtime op poort 3001:

- alle drie HTTP 200, geen redirect en geen `noindex`;
- exact één H1 per route;
- unieke titlelengtes 52–55 tekens en descriptions 122–129 tekens;
- self-canonical exact gelijk aan de route;
- `nl` en `x-default` hreflang aanwezig;
- twee geldige JSON-LD-scripts per route;
- alle drie `premium-signature` met `canvas`, `container`, `display-heading`, `section-divider` en `tonal-surface`.

### Affiliate en types

- `npm run affiliate:verify`: 17 gebruikte en 21 geregistreerde Amazon-slugs; groen.
- `npm run design:verify`: 7 primitives en 34 pilottemplates; groen.
- `npx tsc --noEmit --incremental false`: exit 0.

## Scopebewaking

Gewijzigd zijn uitsluitend:

- de drie toegewezen Markdownbestanden;
- de drie corresponderende typed-profilebestanden;
- deze audit;
- de gebundelde researchnotitie.

Niet gewijzigd door deze batch: `family-completion.json`, `keywords-nl.csv`, `used-keywords-nl.md`, manifest, ledger, `next.config.js`, sitemapbestanden en package scripts. Er is niets gestaged of gecommit.
