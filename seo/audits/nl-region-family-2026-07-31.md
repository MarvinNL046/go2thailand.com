# Nederlandse regiofamilie — definitieve acceptatie

Datum: 31 juli 2026

## Scope

| Route | Exacte ownerbeslissing |
|---|---|
| `/nl/region/` | Interactieve directory voor de brede keuze tussen Noord, Centraal, Zuid en Isaan. |
| `/nl/region/northern/` | Routeowner voor Chiang Mai, Chiang Rai, Sukhothai of de westelijke berglus. |
| `/nl/region/central/` | Routeowner voor Bangkok als hub met Ayutthaya, Kanchanaburi of de Chao Phraya-vlakte. |
| `/nl/region/southern/` | Routeowner voor Andaman, zuidelijke Golf, vastelandnatuur of de lager-zuidcorridor. |
| `/nl/region/isaan/` | Routeowner voor Korat/Khmer, midden-Isaan, boven-Mekong of oostelijke Mekongas. |

De destinationowners bezitten plaatsen; de eilanddirectory bezit eilandkeuze; itineraries bezitten complete dagschema’s. De regiofamilie bezit uitsluitend het grotere netwerk, de corridorselectie en de consequenties van de overgang.

## Research en contentkwaliteit

- `seo/research/nl/2026-07-31-thailand-region-family-browser-brief.md` legt vijf zichtbare Google Nederland-SERPs, echte PAA, concurrentiepatronen en primaire bronnen vast zonder nieuwe DFS-call.
- Bestaande lokale DFS-signalen zijn behouden waar zij bruikbaar waren; de tekst claimt niet dat hybride Browservragen uit DataForSEO komen.
- De directory legt uit dat vier regio’s een praktische reisindeling zijn en niet de enige administratieve/geografische indeling.
- Noord begrenst rook, luchtkwaliteit, bergweg, scooter, festival en gemeenschapsclaims.
- Centraal vervangt de foutieve compacte dagtriplogica door deur-tot-deur, terminal- en overnachtingskeuzes.
- Zuid scheidt Andaman en Golf als twee weer- en vervoerssystemen en maakt de hele boot-hotelketen zichtbaar.
- Isaan vermijdt *arm*, *authentiek*, *onontdekt* en bewoners-als-decor; de owner bouwt op moderne stadshubs en corridors.
- Vaste bezoekers-, bevolking-, temperatuur-, prijs-, route-, reistijd- en ranglijstclaims uit de oude JSON zijn niet blind hergebruikt.

## Design en functionaliteit

- Eén nieuwe interactieve `ThailandRegionsDirectoryNl` met werkend reisstijlfilter, correcte Thailandcontour, netwerkkaarten, FAQ, bronnen en natuurlijke vervolgkeuzes.
- Eén typed `DestinationGuideTemplate`-familie met vier zelfstandige datasets, corridorcards, beslisbanners, eten, ritme, weer, vervoer, FAQ en bronnen.
- Vier unieke gegenereerde hero-assets voor Noord, Centraal, Zuid en Isaan. De beelden tonen bewoonde landschappen zonder tekst, armoedecliché, etnische fotoprop of onjuiste kalksteenfantasie.
- Browser desktop-QA: directory en Noord-owner op 1440 × 1000; filter naar *Kust & eilanden* reduceert correct tot Zuid-Thailand.
- Browser mobile-QA: Zuid-owner en directory op 390 × 844; geen horizontale overflow, mobiele zoekbalk aanwezig en geopend FAQ-antwoord leesbaar.

## Affiliate en technische QA

- Directory gebruikt één contextuele 12Go-uitgang met actuele-opties-CTA, disclosure en `noopener noreferrer nofollow sponsored`.
- Detailowners gebruiken de gedeelde transparante Trip.com/Klook/12Go-integraties; Amazon is niet geforceerd op brede regio-intentie.
- TypeScript zonder emit: groen.
- `npm run design:verify`: groen, inclusief vier dataowners, directorysignatuur en vier assets.
- `npm run affiliate:verify`: groen, 16 gebruikte Amazonslugs en 20 geregistreerde producten.
- `npm run seo:cannibalization`: 0 harde collisions en 0 waarschuwingen.
- `seo/audits/runtime/nl-region-family-final-2026-07-31.json`: 702/702 Nederlandse sitemaproutes zonder harde fouten of waarschuwingen na een gevonden en gecorrigeerde ontbrekende directoryasset.
- `seo/audits/design-coverage-nl-2026-07-31.md`: 703/703 premium signatures, 0 hybrid en 160 exacte owners.

## Uitkomst

De Nederlandse regiofamilie is gesloten: **5/5** routes hebben afzonderlijke Nederlandse research, een premium reusable implementatie, werkende functionaliteit en volledige technische acceptatie.
