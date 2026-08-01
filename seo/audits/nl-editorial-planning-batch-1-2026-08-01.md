# Audit — NL editorial planning batch 1

Datum: 1 augustus 2026
Status: gereed voor integratie
Scope: exact zeven Nederlandse blogowners.

## Resultaat per route

| Route | Cluster | Upgrade | Profiel |
|---|---|---|---|
| `/nl/blog/thailand-king-cobra-season/` | planning | Onbewezen seizoensclaim verwijderd; veilige ontmoeting en WHO-eerste hulp centraal; geen spotadvies. | ready |
| `/nl/blog/beste-tijd-thailand-bezoeken-per-regio/` | planning | Regionale klimaatkeuze zonder landelijke weergarantie; TMD als primaire bron. | ready |
| `/nl/blog/thailand-7-days-itineraries/` | planning | Drie haalbare routes met maximaal twee bases, volledige transferdagen en vertrekbuffer. | ready |
| `/nl/blog/thailand-itinerary-2-weeks/` | planning | Drie hoofdbases, één kustkeuze en beschermde laatste reisdag. | ready |
| `/nl/blog/10-biggest-thailand-travel-mistakes/` | planning | Tien beslisbare verbeteringen rond TDAC, route, vervoer, weer, cultuur, wildlife en verzekering. | ready |
| `/nl/blog/where-to-stay-bangkok-neighborhood-guide/` | hotels | Wijkkeuze op reisroute en openbaar vervoer; geen hotelranglijst of vaste prijzen. | ready |
| `/nl/blog/where-to-stay-phuket-beaches-areas-budget/` | hotels | Gebiedsfit, eilandafstanden en strandveiligheid; geen permanente prijs- of zwemgarantie. | ready |

## Visuele en commerciële laag

- Elke route gebruikt een eigen geoptimaliseerde WebP-hero onder `/images/redesign/editorial/<slug>-hero.webp` in frontmatter én typed profiel.
- Alle zeven profielen gebruiken het bestaande editorial componentcontract met besliskaarten, stappen, checklists, callouts, FAQ en bronnen.
- Alleen de twee hotelowners bevatten een Trip.com-affiliateblok.
- Beide hotelblokken zeggen expliciet dat actuele prijs, kamertype en voorwaarden bij de provider leidend zijn.
- Er zijn geen vaste hotelprijzen, generieke kortingsclaims of geforceerde Amazon-productblokken toegevoegd.

## Ownergrenzen en interne links

- De planningowners verwijzen alleen waar nuttig naar bestaande bestemmings-, klimaat- en veiligheidsowners.
- Bangkok verwijst naar de bestemmings- en hotelowner; Phuket naar de bestemmingsowner.
- Alle gebruikte interne links zijn Nederlands en lokaal gecontroleerd.
- Er zijn geen inline links toegevoegd puur voor linkvolume.

## QA

| Controle | Resultaat |
|---|---|
| JSON parse voor zeven profielen | geslaagd |
| Typed loader + exacte manifestcluster | geslaagd; vijf `planning`, twee `hotels` |
| Editorial status | alle zeven `ready` |
| Markdown-parser | zeven van zeven geslaagd |
| TypeScript `tsc --noEmit --incremental false` | exit 0 |
| Lokale artikelroutes | zeven van zeven HTTP 200 |
| Documenttaal | zeven van zeven `lang="nl"` |
| H1 | exact één per route |
| Route-eigen hero in runtime-HTML | zeven van zeven aanwezig |
| Hero-assets aanwezig | zeven van zeven, circa 118–226 KB |
| Interne links | alle gebruikte doelen HTTP 200 na correctie van één verouderd pad |
| Mojibake, scripts, iframes en shortcodepatronen | geen treffers |
| Vaste europrijzen en fake-experienceclaims | geen treffers |

## Bron- en claimbeleid

De openbare research staat in `seo/research/nl/2026-08-01-editorial-planning-batch-1-current-web.md`. Er zijn geen DFS-, ranking-, volume- of PAA-claims gebruikt. Tijdgevoelige informatie wordt gekoppeld aan officiële controlepunten en niet als permanente waarheid gepresenteerd.
