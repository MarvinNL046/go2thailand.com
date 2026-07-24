# NL Chumphon destination-owner — acceptatie

**Route:** `/nl/city/chumphon/`  
**Status:** premium owner, research en responsive QA groen.

## Research en intentie

- [x] Zelfstandig DFS-cluster, live SERP, echte PAA, rankings- en backlinkcheck.
- [x] Top drie organische resultaten volledig geparseerd; eerste volwaardige aanvullende gids eveneens geparseerd.
- [x] City-, strand-, pier-, Koh Tao-, hotel- en attractie-intenties gescheiden.
- [x] Vaartijd gescheiden van totale transferduur; dynamische tijden alleen met actuele-checkadvies.

## Design en content

- [x] Premium herbruikbare `DestinationGuideTemplate` geregistreerd.
- [x] Drie nieuwe plaatsgebonden WebP-assets in de projectmap.
- [x] Vier zones, marineroute, food, planning en zes vragen.
- [x] Desktop-QA op 1440×1000; lichte mainland-hero, vier-zonehiërarchie, marinebanner en foodsectie visueel groen.
- [x] Mobiele QA op 390×844; effectieve documentbreedte 375/375, geen afgekapte tekst en nul kapotte beelden.

## Poorten

- [x] TypeScript.
- [x] Design system: 7 primitives en 26 pilottemplates.
- [x] SEO-cannibalisatie: 0 hard collisions en 0 waarschuwingen.
- [x] Affiliatecontrole: 13/13 Amazon-productroutes; vijf Chumphon-affiliatelinks hebben `nofollow sponsored`.
- [x] NL owner-runtimecontrole: 60/60 routes groen.
- [x] Alle zeven inhoudelijk gebruikte Chumphon-spokes en hubs geven HTTP 200; een niet-bestaande lokale weather-spoke is vóór acceptatie vervangen door `/nl/weather/`.

## Browserbewijs

- [x] H1: `Chumphon Thailand`; titel: `Chumphon Thailand: strand, eilanden & Koh Tao 2026`.
- [x] Canonical: `https://go2-thailand.com/nl/city/chumphon/`; hreflang `en`, `nl` en `x-default`.
- [x] Schema: Organization, TouristDestination, ItemList, FAQPage, BreadcrumbList en WebPage.
- [x] Vijf affiliatelinks met `nofollow sponsored`; interne Chumphon-links handmatig op 200 gecontroleerd.
- [x] Geen horizontale overflow, tekstclipping of kapotte beelden op mobiel.
- [x] Hero wordt via `EditorialHero` als image preload aangeboden; Next development-waarschuwing komt door hergebruik van dezelfde asset in lazy secties, niet door ontbrekende hero-prioriteit.
- Bekende globale consolemelding: `emrldco.com config is not valid`; meenemen in de afzonderlijke third-party audit. Development-only HMR-waarschuwing is geen productiepaginafout.
