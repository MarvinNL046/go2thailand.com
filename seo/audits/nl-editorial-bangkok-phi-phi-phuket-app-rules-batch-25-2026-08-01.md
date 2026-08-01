# NL editorial batch 25 — lifecycle- en implementatieaudit

Onderzoek: `seo/research/nl/2026-08-01-editorial-bangkok-phi-phi-phuket-app-rules-batch-25-current-web.md`

## Scope

Exact zeven Nederlandse routes zijn inhoudelijk herzien. Trat en Koh Kood/Trat zijn uitgesloten. Centrale family-completion-, ledger-, keyword-, sitemap-, `next.config.js`- en manifestbestanden zijn niet gewijzigd. Er is niet gestaged of gecommit.

## Lifecycle en redirects

| Route | Status | Layout | Indexering | Redirect |
|---|---|---|---|---|
| `/nl/blog/one-bangkok-shopping-mall-tourist-guide-2026/` | ready | evergreen-guide | index | geen |
| `/nl/blog/outrigger-phi-phi-island-resort-barefoot-luxury-2026/` | ready; opening bevestigd | hotel-guide | index | geen |
| `/nl/blog/phuket-best-beach-clubs-2026-yona-catch-barra-cuda/` | ready | evergreen-guide/compare | index | geen |
| `/nl/blog/royal-ploughing-ceremony-bangkok-may-2026/` | archived; 12–13 mei verstreken | event-guide/elapsed | noindex | geen |
| `/nl/blog/silom-edge-songkran-2026-bangkok-water-festival-event/` | archived; april-event verstreken | event-guide/elapsed | noindex | geen |
| `/nl/blog/similan-islands-diving-snorkelling-new-rules-2026/` | ready; effectieve regelowner | policy-guide | index | geen |
| `/nl/blog/tagthai-app-sustainable-travel-guide-2026/` | ready | evergreen-guide/compare | index | geen |

Geen redirect wordt aanbevolen. De twee archieven bezitten nog exacte historische intentie en corrigeren misleidende oude informatie. Ze sturen gebruikers inhoudelijk door naar bredere actuele gidsen zonder een permanente routeconsolidatie af te dwingen.

## Bodyreview

- Alle zeven bodies zijn volledig herschreven in nuchter Nederlands.
- One Bangkok bezit zone-, aankomst- en tijdskeuze; geen brede Bangkok-shoppingowner.
- OUTRIGGER is van aankondiging naar actuele hotelkeuze omgezet; prijs alleen live.
- De beachclubroute vergelijkt locatie, sfeer, toegang en terugreis zonder ranglijst of vaste minimum spend.
- Beide verstreken events hebben heldere archieftaal en geen commerciële uitgang.
- Similan scheidt officiële parkstatus, compliance en operatoruitvoering van duiksitehype.
- TAGTHAi maakt onderscheid tussen platformgemak, diensten van derden en aantoonbare duurzaamheidsimpact.
- Geen vaste prijs-, dienstregeling-, weer-, zicht-, wildlife- of veiligheidsgarantie.
- Geen persoonlijke ervaring, verzonnen PAA of DFS-metriek.
- Geen affiliateblok toegevoegd: voor de twee commerciële vergelijkingen was een transparante liveprijsuitgang niet nodig om de zoekvraag te beantwoorden; merksites zijn als bronnen, niet als affiliate, opgenomen.

## Typed profiles en premium design

Voor alle routes staat een schema-v1-profiel in `data/editorial/blog/nl/`. Iedere route gebruikt hero, quick answer, passende vergelijking/steps/checklist, FAQ en primaire bronnen.

Imagegen is uitgevoerd met de ingebouwde generatieflow, één eigen prompt per route. Promptdoelen:

1. One Bangkok — blue-hour mixed-use district met tropische openbare ruimte en architecturale negatieve ruimte.
2. OUTRIGGER — rustige Phi Phi-strandaankomst per longtailboot, natuurlijke materialen, geen logo.
3. Beachclubs — samenhangend kustbeeld met drijvende, strand- en heuvelsetting.
4. Ploegceremonie — respectvolle documentaire Sanam Luang-scene zonder identificeerbaar koninklijk persoon.
5. Silom Edge — geloofwaardige publieke Songkranscene zonder gevaarlijke waterwapens of merkbeeld.
6. Similan — split-level snorkel/duikbeeld met drijfmiddelen en afstand tot koraal.
7. TAGTHAi — generieke telefoonroute in een lokale riviermarkt, zonder app-logo of greenwashiconen.

Alle finals zijn lokaal als 1600×900 WebP opgeslagen onder `public/images/redesign/editorial/`. Ze zijn uniek op SHA-256 en blijven onder de 450 KB-limiet.

## Keywordhandoff

Indexeerbare owners voor centrale registratie:

- `One Bangkok bezoeken`
- `OUTRIGGER Phi Phi Island Resort`
- `beachclubs Phuket`
- `Similan eilanden regels`
- `TAGTHAi app`

Historische/noindex-termen, niet als actieve groeikeywordowner registreren:

- `Koninklijke Ploegceremonie 2026`
- `Silom Edge Songkran 2026`

## QA-gates

- Profileloader: geslaagd voor exact zeven slugs; status, cluster en layoutcontract gevalideerd.
- Runtime/H1: geslaagd voor 7/7 routes in de geïntegreerde runtimecontrole.
- Editorial accepted-only runtime: geslaagd voor de reeds centraal geaccepteerde familie (nieuwe batchroutes blijven bewust in-progress tot parent-integratie).
- Assets: 7/7 frontmatter-profielkoppelingen correct; alle 1600×900, 133–273 KB en uniek op SHA-256.
- TypeScript: `npx tsc --noEmit --incremental false` geslaagd.
- Componenttests: editorial schema, editorial metadata en pSEO editorial date — 3/3 geslaagd.
- Design-system: 7 primitives en 34 pilottemplates geslaagd.
- Affiliatecontrole: 17 gebruikte slugs en 21 geregistreerde producten geslaagd; deze batch voegt geen affiliate toe.
- Contentrisico scoped: 0 vaste prijs-, dienstregeling- of numerieke zichtclaims in de zeven bodies.
- `git diff --check` op batch 25: geslaagd; alleen verwachte LF/CRLF-meldingen op Windows.
- Scope: exact 23 batchbestanden zichtbaar (7 bodies, 7 profiles, 7 heroes, 2 docs); geen centrale bestanden in de scoped status.
