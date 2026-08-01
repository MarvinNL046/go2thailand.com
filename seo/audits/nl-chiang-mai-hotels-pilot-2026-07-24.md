# Audit — NL Chiang Mai hotels

## Scope

Owner-route: `/nl/best-hotels/chiang-mai/`

## Implementatie

- Legacyfallback vervangen door het datagedreven `HotelGuideTemplate` via de NL-hotelregistry.
- Vijf wijken met een voordeel, trade-off, transportbeslissing en aansluiting op de bestemmingspillar.
- Negen actuele hotelvoorbeelden, gecontroleerd via officiële hotelsites.
- Zes nieuwe geoptimaliseerde WebP-assets voor hero en wijkkaarten.
- Zes zichtbare, ontdubbelde FAQ-antwoorden uit echte Nederlandse People Also Ask-vragen.
- ItemList, FAQPage, BreadcrumbList en WebPage-schema via het template.
- Trip.com-links met placement-subids, `nofollow sponsored` en zichtbare disclosure.
- Geen vaste prijzen, reviewscore of betaalde redactionele rangorde.

## Acceptatie

- [x] TypeScript
- [x] Design-system verifier
- [x] SEO verifier — 0 hard collisions, 0 waarschuwingen
- [x] Affiliate verifier — 13 gebruikte slugs, 13 geregistreerde producten
- [x] Desktop browser-QA
- [x] Mobiele browser-QA op 390 × 844
- [x] Canonical, hreflang en schema gecontroleerd
- [x] Alle zes eigen beelden visueel gecontroleerd
- [x] Trip.com-links en officiële hotelsites gecontroleerd
- [x] Interne kernlinks gecontroleerd
- [x] Engelse route gecontroleerd en onaangeraakt

## Broncontrole

- [x] Old City en Nimman via Tourism Authority of Thailand gecontroleerd
- [x] Luchthavenroutes via Airports of Thailand gecontroleerd
- [x] Wat Ket, Ping-rivier en brugcontext via Chiang Mai Municipality gecontroleerd
- [x] Alle negen hotelvoorbeelden via actuele officiële hotelsites gecontroleerd
- [x] Geen stale akyra Manor-URL of doorverwijzing naar een Bangkok-property gebruikt

## Browserresultaat

- Eén zichtbare H1: `Hotels in Chiang Mai. Waar wil je wakker worden?`
- Canonical: `https://go2-thailand.com/nl/best-hotels/chiang-mai/`.
- Hreflang: `nl`, `en` en `x-default` op de juiste locale-routes; Engels blijft op de bestaande prefixloze owner-route.
- Schema: Organization, BreadcrumbList, FAQPage, ItemList en WebPage.
- 5 wijkkaarten, 9 hotelkaarten, 3 split-stay kaarten, 4 boekingstips en 6 FAQ-items zichtbaar.
- Geen horizontale overflow op desktop of de 390 px mobiele viewport.
- De vijfde wijkkaart en vijfde snelle wijkkeuze zijn op desktop gecentreerd; er blijft geen toevallig leeg gridvak over.
- De mobiele split-stay route behoudt de oranje verticale stippelverbinding tussen de drie kaarten.
- Het standaard geopende FAQ-antwoord heeft voldoende contrast en blijft mobiel goed leesbaar.
- Alle 12 zichtbare Trip.com-linkinstanties hebben `nofollow sponsored`; de placements gebruiken een route-specifieke subid en de shortlink reageert met HTTP 302.
- De negen officiële hoteldoelen zijn actueel; Anantara blokkeert geautomatiseerde requests met HTTP 403 en InterContinental redirect correct naar `/en`, zonder dat de zichtbare browserlink stuk is.
- NL owner-route, Engelse owner-route, bestemmingspillar, attractions en weather geven lokaal HTTP 200.
