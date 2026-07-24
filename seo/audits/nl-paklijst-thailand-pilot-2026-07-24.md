# Audit — NL paklijst Thailand

## Scope

Owner-route: `/nl/travel-gear/`

## Implementatie

- Nederlandse legacyproductpagina vervangen door het datagedreven `PackingGuideTemplate`; Engelse locale blijft bewust op de bestaande pagina tot eigen research.
- Onbewezen “getest”-claims, vaste prijzen, ratings en reviewaantallen zijn niet zichtbaar op NL.
- 36 interactieve checklistitems in zes categorieën met voortgang, reset en print/PDF-functie.
- Backpack-, koffer- en hybridetasbeslissing met voordeel en trade-off.
- Handbagage-, ruimbagage- en niet-meenemenregels op basis van actuele officiële bronnen.
- Drie routecapsules, een meenemen/kopen/thuislaten-route en zes contextuele Amazon-productvoorbeelden.
- Drie nieuwe geoptimaliseerde WebP-assets; geen externe Amazon-afbeeldingen in de NL-template.
- Zes zichtbare, ontdubbelde FAQ-antwoorden uit echte Nederlandse People Also Ask-vragen.
- ItemList, FAQPage, BreadcrumbList en WebPage-schema via het template.

## Acceptatie

- [x] TypeScript
- [x] Design-system verifier
- [x] SEO verifier — 0 hard collisions, 0 waarschuwingen
- [x] Affiliate verifier
- [x] Desktop browser-QA
- [x] Mobiele browser-QA op 390 × 844
- [x] Checklistinteractie, reset en printknop gecontroleerd
- [x] Canonical, hreflang en schema gecontroleerd
- [x] Alle drie eigen beelden visueel gecontroleerd
- [x] Amazon-redirects en rel-attributen gecontroleerd
- [x] Interne kernlinks gecontroleerd
- [x] Engelse route gecontroleerd en inhoudelijk onaangeraakt

## Broncontrole

- [x] DFS-cluster, vijf SERPs, echte PAA, vier concurrentieparses, rankings en backlinks vastgelegd
- [x] TDAC via Thai Immigration Bureau gecontroleerd
- [x] Paspoort, medicijnen en verboden goederen via NederlandWereldwijd gecontroleerd
- [x] Powerbank- en lithiumregels via IATA gecontroleerd
- [x] Vloeistof- en handbagageregels via Schiphol gecontroleerd
- [x] Invoerbeperkingen via Thai Customs gecontroleerd
- [x] Tempelkleding via Tourism Authority of Thailand gecontroleerd

## Browserresultaat

Desktop op 1280 px en mobiel op 390 × 844 gecontroleerd. Hero, checklist,
handbagagebeeld, routecapsules, keuze-route, donkere uitrustingssectie en FAQ
blijven visueel hiërarchisch en zonder horizontale overflow. De checklist ging
van 0 naar 1 van 36 en na `Wissen` terug naar 0. De geopende FAQ gebruikt
donkere bodytekst (`rgb(41, 53, 49)`) en is goed leesbaar.

DOM-controle: precies één H1, juiste NL-canonical, EN/NL/x-default-hreflang,
Organization-, BreadcrumbList-, FAQPage-, ItemList- en WebPage-schema. Zes
Amazon-links bevatten `nofollow sponsored`; alle zes lokale redirects geven 307
naar Amazon met de geregistreerde affiliate-tag. Er worden geen externe
Amazon-afbeeldingen in de Nederlandse template geladen.

De sitebrede derde-partyscriptbron `emrldco.com` meldt op localhost nog steeds
`config is not valid`. De pagina zelf toont geen Next.js-erroroverlay of eigen
runtimefout. Dit bekende punt blijft onderdeel van de sitebrede third-party- en
performance-audit en is niet stilzwijgend uit deze route verwijderd.
