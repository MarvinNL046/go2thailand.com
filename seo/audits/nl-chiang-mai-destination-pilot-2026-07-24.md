# Audit — NL Chiang Mai destination pillar

## Scope

Owner-route: `/nl/city/chiang-mai/`

## Implementatie

- Datagedreven `DestinationGuideTemplate` geregistreerd voor Chiang Mai.
- Vijf onderscheidende stadszones met doelgroep, voordeel en trade-off.
- Vierdaagse route met expliciete scheiding tussen stadsdagen en provincie-excursies.
- Vier unieke, geoptimaliseerde WebP-assets voor hero, zones, food en routeplanning.
- Reistijd- en luchtkwaliteitsadvies zonder een universeel “brandseizoen” als vaststaand dagfeit te presenteren.
- Zes zichtbare FAQ-antwoorden uit vastgelegde echte People Also Ask-vragen.
- TouristDestination, ItemList, FAQPage, BreadcrumbList en WebPage-schema via het template.
- Bestaande owner-URL en Engelse route blijven behouden.

## Acceptatie

- [x] TypeScript
- [x] Design-system verifier
- [x] SEO verifier — 0 hard collisions, 0 waarschuwingen
- [x] Affiliate verifier — 13 gebruikte slugs, 13 geregistreerde producten
- [x] Desktop browser-QA
- [x] Mobiele browser-QA op 390 × 844
- [x] Canonical, hreflang en schema gecontroleerd
- [x] Alle vier eigen beelden gecontroleerd
- [x] Interne kernlinks gecontroleerd
- [x] Engelse route gecontroleerd en onaangeraakt

## Browserresultaat

- Eén zichtbare H1: `Chiang Mai Thailand`
- Canonical: `https://go2-thailand.com/nl/city/chiang-mai/`
- Hreflang: `nl`, `en` en `x-default` op de juiste locale-routes
- Schema: Organization, BreadcrumbList, FAQPage, ItemList, TouristDestination en WebPage
- 5 zonekaarten, 3 inhoudelijke highlightcards, 4 routedagen en 6 FAQ-items zichtbaar
- 18 beelden in de SSR-output; alle eigen Chiang Mai-assets lokaal aanwezig en visueel gecontroleerd
- Geen zichtbare horizontale overflow op desktop of de 390 px mobiele viewport
- Open FAQ-antwoord heeft voldoende contrast en blijft op mobiel goed leesbaar
- 2 Trip.com-links hebben `nofollow sponsored` en de placement-subid `chiang-mai-destination-hotels`
- Alle gekoppelde Chiang Mai-subroutes en de Engelse owner-route geven HTTP 200
