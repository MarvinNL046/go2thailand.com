# Audit — NL editorial stays, outdoors & culture batch 14

Datum: 2026-08-01
Scope: exact zeven routes uit de batchopdracht; centrale inventory, keywords, ledger, redirects en sitemap zijn niet gewijzigd.

## Uitkomst per route

| Route | Status | Index | Canonical | Hero | Affiliate |
|---|---:|---:|---|---|---|
| `/nl/blog/best-party-hostels-thailand-2026-bangkok-islands-chiang-mai/` | ready | ja | self | uniek lokaal WebP | Trip.com livecheck |
| `/nl/blog/camping-thailand-national-parks-guide-2026/` | ready | ja | self | uniek lokaal WebP | geen |
| `/nl/blog/cape-fahn-hotel-koh-samui-private-island-luxury-2026/` | ready | ja | self | uniek lokaal WebP | Trip.com livecheck |
| `/nl/blog/chiang-dao-stargazing-eco-lodges-mountain-retreat-2026/` | ready | ja | self | uniek lokaal WebP | Trip.com livecheck |
| `/nl/blog/chiang-mai-lanna-temple-walking-trail-hidden-gems-2026/` | ready | ja | self | uniek lokaal WebP | geen |
| `/nl/blog/chiang-mai-street-art-walking-guide-old-city-nimman-2026/` | ready | ja | self | uniek lokaal WebP | geen |
| `/nl/blog/earth-hour-2026-bangkok-thailand-landmarks-lights-off/` | archived | nee | self | uniek lokaal WebP | geen |

## Content- en ownercontrole

- Zeven typed profielen matchen exact hun manifestslug, route en cluster.
- Zes ready-routes bezitten afzonderlijke intenties; Earth Hour is archived/noindex met `temporalStatus: elapsed` en officiële start/einddatum.
- Geen redirect voorgesteld: voor Earth Hour bestaat geen inhoudelijk gelijkwaardige, permanente owner. Een redirect naar de algemene Bangkok-pagina zou intentie verliezen.
- Cape Fahn is een exacte property-owner naast de brede `/nl/best-hotels/koh-samui/`-owner; de tekst verwijst voor vergelijking naar de brede owner.
- De campingowner legt algemene voorbereiding uit en delegeert parkspecifieke details aan bestaande parkowners.
- De tempelroute scheidt de compacte stadswandeling van de geografisch aparte boslus; de street-artowner gebruikt buurten in plaats van vergankelijke muralpins.

## SEO en betrouwbaarheid

- Self-canonical op alle zeven routes; alleen Earth Hour zet `noindex: true`.
- Eén H1 komt uit de typed hero; bodies starten op H2.
- Titels, beschrijvingen, primary keywords en snelle antwoorden zijn uniek en natuurlijk Nederlands.
- FAQ’s beantwoorden route-eigen vragen zonder verzonnen PAA-herkomst.
- Primary sources zijn voorzien van `checkedAt: 2026-08-01`.
- Geen verzonnen zoekvolume, ranking, PAA, sterrenclassificatie, live prijs of beschikbaarheid.

## Affiliate- en prijsbeleid

- Alleen drie commercieel passende routes hebben een affiliateblok.
- CTA’s zeggen “actuele” beschikbaarheid/prijzen; geen lokaal bevroren bedragen.
- Disclosure staat in ieder affiliateblok; renderer bewaakt externe `nofollow sponsored noopener noreferrer`-relaties via de bestaande affiliategate.
- Informatieve cultuur-, park- en archiefroutes blijven vrij van geforceerde commerciële blokken.

## Visueel en toegankelijkheid

- Zeven route-eigen WebP-hero’s onder `public/images/redesign/editorial/`.
- Alle assets zijn 1536×1024, kleiner dan 450 KB en visueel gecontroleerd op onderwerp, negatieve tekstruimte, afwezigheid van tekst/logo/watermerk en passend contrast.
- Alt-teksten beschrijven de scène en herhalen niet mechanisch de paginatitel.

## QA-resultaten

- Typed loader: zeven van zeven profielen geldig en exact gematcht met manifest.
- Assets: zeven van zeven frontmatter/profile-paden gelijk; alle afbeeldingen 1536×1024, 46–241 KB en dus binnen de grens van 450 KB.
- Runtime: zeven van zeven routes HTTP 200 en exact één H1.
- Canonical: zeven van zeven absolute self-canonicals correct.
- Robots: zes ready-routes indexeerbaar; alleen Earth Hour rendert `noindex,follow`.
- Hreflang: NL, EN en x-default worden door de bestaande routehead gerenderd.
- Schema: typed routes renderen Article- en FAQ JSON-LD waar van toepassing.
- Affiliate-rendering: alle drie Trip.com-CTA’s hebben `_blank` en `rel="noopener noreferrer nofollow sponsored"`.
- `npx tsc --noEmit --incremental false`: geslaagd.
- `npm run design:verify`: geslaagd, 7 primitives en 34 pilottemplates.
- `npm run affiliate:verify`: geslaagd, 17 gebruikte slugs en 21 geregistreerde producten.
- `npm run seo:verify:nl-editorial:accepted`: geslaagd; deze nog niet centraal geaccepteerde batch werd terecht als in-progress genegeerd.
- `npm run seo:audit:nl-editorial-risk`: uitgevoerd; globale inventaris 252 artikelen, zonder batchblokker.
- Gerichte `git diff --check`: geslaagd; alleen informatieve LF/CRLF-waarschuwingen op Windows.
- Centrale accepted-only/family/assets/ledger-integratie blijft bij root nadat deze batch expliciet is geaccepteerd.
