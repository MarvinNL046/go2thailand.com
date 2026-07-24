# NL Rayong destination-owner — acceptatie

**Route:** `/nl/city/rayong/`  
**Status:** premium owner geïmplementeerd en finaal geverifieerd.

## Research en intentie

- [x] Zelfstandig DFS-cluster, live SERP, echte PAA, rankings- en backlinkcheck.
- [x] Top drie organische resultaten onderzocht; dynamisch geblokkeerde Tripadvisor-inhoud via live broninspectie aangevuld.
- [x] City-, vastelandkust-, ferry-, Koh Samet-, hotel- en attractie-intenties gescheiden.
- [x] Voetbal-, kaart- en generieke Thailand-ruis uit het DFS-cluster uitgesloten.

## Design en content

- [x] Premium herbruikbare `DestinationGuideTemplate` geregistreerd.
- [x] Vier nieuwe plaatsgebonden WebP-assets in de projectmap.
- [x] Vier zones, west-oost-route, fruit/food, planning en zes vragen.
- [x] 1.962 nuttige woorden in het gerenderde `<main>`; binnen het briefdoel van circa 1.800–2.300.
- [x] Desktop-QA op 1440×1000: hero, zones, routebanner, food, route en praktische kaarten.
- [x] Mobiele QA op 390×844: hero, sticky zoekbalk, bottomnav, zones, routebanner, highlights, food, praktisch, FAQ en footer.
- [x] De gedeelde highlightkaart kreeg `min-w-0` en afbreekbare/hyphenerende titels; lange Nederlandse samenstellingen blijven nu volledig binnen de kaart.

## Poorten

- [x] TypeScript.
- [x] Design-systemverificatie: 7 primitives en 26 pilottemplates.
- [x] SEO-cannibalisatie: 0 harde conflicten en 0 waarschuwingen.
- [x] Affiliatecontrole: 13/13 repositorychecks.
- [x] NL owner-runtimecontrole: 61/61 routes.
- [x] Inhoudelijke interne links: alle vijf Rayong-spokes geven lokaal HTTP 200.

## Browserbewijs

- [x] Eén H1: `Rayong Thailand`; titel `Rayong Thailand: kust, oude stad & tips 2026`.
- [x] Canonical exact `https://go2-thailand.com/nl/city/rayong/`.
- [x] Hreflang `nl`, `en` en `x-default` correct gekoppeld.
- [x] Schema: `Organization`, `TouristDestination`, `ItemList`, `FAQPage`, `BreadcrumbList` en `WebPage`.
- [x] Vijf zichtbare affiliateknoppen; allemaal `nofollow sponsored` plus veilige externe-linkrelaties.
- [x] Geen kapotte beelden; documentbreedte 375 px binnen de 390 px mobiele viewport en geen onbedoelde horizontale overflow.

## Bekende globale devmeldingen

- De reeds bestaande `emrldco.com config is not valid`-melding en Next.js HMR-waarschuwing zijn sitebrede/dev-only observaties, niet Rayong-specifiek. Ze blijven op de aparte third-party/performance-auditlijst.
