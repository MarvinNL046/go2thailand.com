# Audit — NL Bangkok hotels

## Scope

Owner-route: `/nl/best-hotels/bangkok/`

## Implementatie

- Datagedreven `HotelGuideTemplate` geregistreerd voor Bangkok.
- Zes wijkkeuzes met voordeel, trade-off en vervoerslogica.
- Zes representatieve hotelvoorbeelden met officiële bron en zonder vaste prijs of reviewscore.
- Zeven unieke, geoptimaliseerde WebP-assets.
- Split-stay-keuze, vier boekingstips en acht zichtbare FAQ-antwoorden.
- ItemList, FAQPage, BreadcrumbList en WebPage-schema via het template.
- Gedeeld hoteltemplate ontdaan van vaste kust- en boottekst; iedere bestemming levert nu eigen beslisadvies.
- Trip.com-links behouden zichtbare disclosure en `nofollow sponsored`.

## Acceptatie

- [x] TypeScript
- [x] Design-system verifier
- [x] SEO verifier — 0 hard collisions, 0 waarschuwingen
- [x] Affiliate verifier — 13 gebruikte slugs, 13 geregistreerde producten
- [x] Desktop browser-QA
- [x] Mobiele browser-QA op 390 × 844
- [x] Canonical, hreflang en schema gecontroleerd
- [x] Alle zeven beelden gecontroleerd
- [x] Trip.com-links en placement-subids gecontroleerd
- [x] Interne kernlinks gecontroleerd
- [x] Engelse route gecontroleerd en onaangeraakt

## Browserresultaat

- Eén zichtbare H1: `Waar verblijven in Bangkok?`
- Canonical: `https://go2-thailand.com/nl/best-hotels/bangkok/`
- Hreflang: `nl`, `en` en `x-default` op de juiste locale-routes
- Schema: Organization, BreadcrumbList, FAQPage, ItemList en WebPage
- 6 gebiedskaarten, 6 hotelkaarten en 8 FAQ-items zichtbaar
- 12 beelden geladen, 0 defect
- Horizontale overflow: 0 px op desktop en mobiel
- Open FAQ-antwoord gebruikt `rgb(41, 53, 49)` en is goed leesbaar
- 9 Trip.com-links hebben `nofollow sponsored` en unieke placement-subids waar van toepassing
- De Trip.com-shortlink geeft 302 naar `trip.com/hotels/` met affiliateparameters
- Bangkok-pillar, attractions, weather, luxury-subroute en de Engelse hotelroute geven HTTP 200
