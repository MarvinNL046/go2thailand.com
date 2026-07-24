# Audit — NL Destination Thailand Visa

## Scope

Owner-route: `/nl/visa/digital-nomad-visa/`

## Implementatie

- NL-only premium DTV-template; Engelse route en bestaande data blijven staan tot afzonderlijke Engelse research.
- Twee eigen geoptimaliseerde WebP-assets: DTV-hero en bewijsroutes.
- Interactieve keuze voor DTV1 workcation, DTV2 soft power en DTV3 gezinslid.
- Aparte visualisatie voor vijf jaar visumgeldigheid en maximaal 180 dagen verblijf per binnenkomst.
- Officiële bewijsmap, Nederlandse locatievoorwaarde, e-Visa-proces en aankomstflow.
- FAQPage, WebPage en BreadcrumbList-schema op basis van echte DTV-PAA.
- Twee contextuele affiliatelinks pas na het visumdossier, met zichtbare disclosure.
- Brede dubbele NL-nomadenblog redirect naar de lifestyle-index; DTV-intent blijft op de visa-spoke.

## Acceptatie

- [x] TypeScript
- [x] ESLint zonder template-eigen waarschuwingen
- [x] Design-system verifier
- [x] SEO verifier
- [x] Affiliate verifier
- [x] HTTP 200 en één H1
- [x] Desktop browser-QA op 1440 × 1000
- [x] Mobiele browser-QA op exact 390 × 844 zonder horizontale overflow
- [x] DTV-routeinteractie in echte browser gecontroleerd
- [x] Canonical, hreflang, schema, affiliatelinks, assets en NL-only redirect via HTTP/DOM gecontroleerd

## Browseruitkomst

Hero, interactieve routekeuze, tweeklokken-tijdlijn en bewijsmap zijn op desktop en mobiel visueel gecontroleerd. De route heeft één H1, geen horizontale overflow en geen Next.js-erroroverlay. De bekende sitebrede `emrldco.com`-configmelding blijft onderdeel van de afzonderlijke third-party-audit.
