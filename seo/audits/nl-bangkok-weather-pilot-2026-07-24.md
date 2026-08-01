# Audit — NL Bangkok weer

## Scope

Owner-route: `/nl/city/bangkok/weather/`

## Implementatie

- Datagedreven `WeatherGuideTemplate` geregistreerd voor Bangkok.
- Twaalf maandwaarden uit TMD Bangkok Metropolis 48455, 1991–2020.
- Live-weerintentie krijgt een prominente officiële TMD-link; de pagina presenteert geen statische data als voorspelling.
- Drie unieke, geoptimaliseerde WebP-assets.
- Stedelijke seizoenskeuze, hitte-/regenplanning en plan A/B/C.
- Amazon-paklijst met interne `/go/`-redirects, `nofollow sponsored` en zichtbare disclosure.
- Dataset, FAQPage, BreadcrumbList en WebPage-schema via het template.
- Gedeeld template ontdaan van vaste kusttekst; Krabi en Phuket behouden hun maritieme advies via paginadata.

## Acceptatie

- [x] TypeScript
- [x] Design-system verifier
- [x] SEO verifier — 0 hard collisions, 0 waarschuwingen
- [x] Affiliate verifier — 13 gebruikte slugs, 13 geregistreerde producten
- [x] Desktop browser-QA
- [x] Mobiele browser-QA op 390 × 844
- [x] Canonical, hreflang en schema gecontroleerd
- [x] Alle beelden en Amazon-redirects gecontroleerd
- [x] Interne kernlinks en representatieve maandroutes gecontroleerd
- [x] Engelse route gecontroleerd en onaangeraakt

## Browserresultaat

- Eén zichtbare H1: `Bangkok weer. Wanneer ga jij?`
- Canonical: `https://go2-thailand.com/nl/city/bangkok/weather/`
- Hreflang: `nl`, `en` en `x-default` op de juiste locale-routes
- Schema: Organization, FAQPage, BreadcrumbList, WebPage en Dataset
- 12 maandrijen en 8 FAQ-items zichtbaar
- 8 beelden geladen, 0 defect
- Horizontale overflow: 0 px op desktop en mobiel
- Open FAQ-antwoord gebruikt `rgb(41, 53, 49)` en is goed leesbaar
- Vier Amazon-links hebben `nofollow sponsored`; alle vier `/go/`-routes geven 307 naar `www.amazon.com` en bevatten een trackingtag
- Bangkok-pillar, attractions, hotels, vier representatieve maandroutes en de Engelse weather-route geven HTTP 200
