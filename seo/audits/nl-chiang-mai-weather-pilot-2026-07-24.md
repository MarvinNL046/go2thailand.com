# Audit — NL Chiang Mai weather

## Scope

Owner-route: `/nl/city/chiang-mai/weather/`

## Implementatie

- Legacyfallback vervangen door het datagedreven `WeatherGuideTemplate` via de NL-weatherregistry.
- Exacte TMD-klimaatnormalen 1991–2020 voor station Chiang Mai 48327.
- Twaalf maanden met maximum- en minimumtemperatuur, regen, regendagen en genuanceerd reisbeeld.
- Klimaat, live forecast, bergmicroklimaat en actuele luchtkwaliteit expliciet van elkaar gescheiden.
- Drie nieuwe geoptimaliseerde WebP-assets voor hero, groen seizoen en paklijst.
- Zes zichtbare, ontdubbelde FAQ-antwoorden uit echte People Also Ask-vragen.
- Dataset, FAQPage, BreadcrumbList en WebPage-schema via het template.
- Amazon-paklijst met centrale redirects, transparantie en vijf geregistreerde productslugs.
- Klook- en Trip.com-vervolgstappen via bestaande placement-subids en disclosure.

## Acceptatie

- [x] TypeScript
- [x] Design-system verifier
- [x] SEO verifier — 0 hard collisions, 0 waarschuwingen
- [x] Affiliate verifier — 13 gebruikte slugs, 13 geregistreerde producten
- [x] Desktop browser-QA
- [x] Mobiele browser-QA op 390 × 844
- [x] Canonical, hreflang en schema gecontroleerd
- [x] Alle drie eigen beelden visueel gecontroleerd
- [x] Amazon-, Klook- en Trip.com-links gecontroleerd
- [x] Interne kernlinks en alle twaalf maandroutes gecontroleerd
- [x] Engelse route gecontroleerd en onaangeraakt

## Broncontrole

- [x] TMD-PDF tekstueel uitgelezen
- [x] TMD-PDF pagina 5 visueel gecontroleerd
- [x] Klimaatwaarden één-op-één overgenomen
- [x] Live weer uitsluitend naar TMD verwezen
- [x] Historische haze-data niet als actuele luchtkwaliteit gepresenteerd
- [x] Air4Thai en NederlandWereldwijd als actuele beslisbronnen toegevoegd

## Browserresultaat

- Eén zichtbare H1: `Chiang Mai weer. Wanneer ga jij?`
- Canonical: `https://go2-thailand.com/nl/city/chiang-mai/weather/`
- Hreflang: `nl`, `en` en `x-default` op de juiste locale-routes.
- Schema: Organization, BreadcrumbList, FAQPage, Dataset en WebPage.
- 12 maandregels, 3 seizoenen, 4 reisstijlen, 6 FAQ-items en 5 bronkaarten zichtbaar.
- 8 beelden in de SSR-output; alle drie eigen weerassets lokaal aanwezig en visueel gecontroleerd.
- Geen zichtbare horizontale overflow op desktop of de 390 px mobiele viewport.
- De mobiele planroute behoudt de oranje stippelverbinding tussen plan A, B en C.
- Het geopende FAQ-antwoord heeft voldoende contrast en blijft op mobiel goed leesbaar.
- 5 Amazon-links hebben `nofollow sponsored`; alle redirects reageren met 307, wijzen naar Amazon en bevatten de Associates-tag.
- Klook- en Trip.com-links hebben `nofollow sponsored`, een unieke weather-placement-subid en reageren met HTTP 302.
- Pillar, attractions, verblijf, gear, Engelse owner-route en alle twaalf maandroutes geven HTTP 200.
