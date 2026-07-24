# Audit — NL Bangkok bezienswaardigheden

## Scope

Owner-route: `/nl/city/bangkok/attractions/`

## Implementatie

- Datagedreven `AttractionsGuideTemplate` geregistreerd voor Bangkok.
- Vier unieke, geoptimaliseerde WebP-assets toegevoegd.
- Acht redactionele keuzes met voordelen en trade-offs.
- Ééndagsplan, driedaagse route, praktische tips en acht echte PAA-vragen.
- ItemList, FAQPage, BreadcrumbList en WebPage-schema via het template.
- Klook-link met `nofollow sponsored`, placement-subid en zichtbare disclosure.
- NL legacy top-10-route consolideert permanent; EN blijft intact.
- Officiële bronnen zichtbaar gemaakt en veranderlijke informatie van een controlewaarschuwing voorzien.

## Acceptatie

- [x] TypeScript
- [x] Design-system verifier
- [x] SEO verifier — 0 hard collisions, 0 waarschuwingen
- [x] Affiliate verifier
- [x] Desktop browser-QA
- [x] Mobiele browser-QA op 390 × 844
- [x] Canonical, hreflang en schema gecontroleerd
- [x] Interne kernlinks gecontroleerd — 9 van 9 geven HTTP 200
- [x] Legacy redirect en Engelse route gecontroleerd

## Browserresultaat

- Eén zichtbare H1: `Wat te doen in Bangkok?`
- Canonical: `https://go2-thailand.com/nl/city/bangkok/attractions/`
- Hreflang: `nl`, `en` en `x-default` op de juiste locale-routes
- Schema: Organization, ItemList, FAQPage, BreadcrumbList en WebPage
- 15 beelden geladen, 0 defect
- Horizontale overflow: 0 px op desktop en mobiel
- Klook-links: `nofollow sponsored` met `subid=bangkok-attractions`
- `/nl/city/bangkok/top-10-attractions/`: 308 naar de owner-route
- `/city/bangkok/top-10-attractions/`: 200 en dus intact voor de latere EN-fase
