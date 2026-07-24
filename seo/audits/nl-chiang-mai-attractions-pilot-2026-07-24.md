# Audit — NL Chiang Mai attractions

## Scope

Owner-route: `/nl/city/chiang-mai/attractions/`

## Implementatie

- Oude generieke attractiepagina vervangen door het datagedreven `AttractionsGuideTemplate`.
- Acht redactionele keuzes met duur, beste doelgroep en een concrete trade-off.
- Ééndagsroute van berg naar stad en driedaagse route per schaalniveau.
- Vijf unieke, geoptimaliseerde WebP-assets voor hero, Wat Pha Lat, routeplanning, Bua Tong en lokale ambacht.
- Marktlogica per weekdag en observatiegerichte dierenwelzijnscriteria.
- Zes zichtbare FAQ-antwoorden uit vastgelegde echte People Also Ask-vragen.
- ItemList, FAQPage, BreadcrumbList en WebPage-schema via het template.
- Klook-vervolgstap met disclosure en `nofollow sponsored`.

## Acceptatie

- [x] TypeScript
- [x] Design-system verifier
- [x] SEO verifier — 0 hard collisions, 0 waarschuwingen
- [x] Affiliate verifier — 13 gebruikte slugs, 13 geregistreerde producten
- [x] Desktop browser-QA
- [x] Mobiele browser-QA op 390 × 844
- [x] Canonical, hreflang en schema gecontroleerd
- [x] Alle vijf eigen beelden gecontroleerd
- [x] Klook-link en placement-subid gecontroleerd
- [x] Interne kernlinks gecontroleerd
- [x] Engelse route gecontroleerd en onaangeraakt

## Browserresultaat

- Eén zichtbare H1: `Wat te doen in Chiang Mai?`
- Canonical: `https://go2-thailand.com/nl/city/chiang-mai/attractions/`
- Hreflang: `nl`, `en` en `x-default` op de juiste locale-routes
- Schema: Organization, BreadcrumbList, FAQPage, ItemList en WebPage
- 8 attractiekeuzes, 4 activiteitstypen, 4 ééndagsmomenten, 3 routedagen en 6 FAQ-items zichtbaar
- 15 beelden in de SSR-output; alle vijf eigen assets lokaal aanwezig en visueel gecontroleerd
- Geen zichtbare horizontale overflow op desktop of de 390 px mobiele viewport
- Open FAQ-antwoord heeft voldoende contrast en blijft op mobiel goed leesbaar
- 3 Klook-links hebben `nofollow sponsored` en placement-subid `chiang-mai-attractions`
- De Klook-shortlink reageert met HTTP 302
- Alle gekoppelde detailroutes, pillar, verblijf, weer en de Engelse owner-route geven HTTP 200
