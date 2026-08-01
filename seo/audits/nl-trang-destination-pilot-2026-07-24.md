# NL destination audit — Trang

**Route:** `/nl/city/trang/`  
**Datum:** 24 juli 2026  
**Status:** geïmplementeerd en lokaal groen

## Research en ownerkeuze

- Exacte DFS-hoofdquery `trang thailand`: volume 260, KD 0, informationele intentie.
- Cluster: 151 ruwe keywordrecords en 50 competitor domains.
- Zeven live Nederlandse SERP's leverden zeven bruikbare locatie-PAA's op.
- Nul gevonden rankings en nul gevonden backlinks voor de bestaande route.
- Vier Nederlandse concurrenten volledig geparseerd; oude ferry-, markt-, vrijwilligers- en scooterclaims zijn niet overgenomen.
- Primaire context gecontroleerd bij TAT, DMCR, DNP, Department of Airports, SRT, TMD en NederlandWereldwijd.
- Ownergrens: deze route bezit de bestemming, basiskeuze en hoofdroute. Attracties, hotels, food, weer en individuele eilanden houden hun eigen verdiepende intentie.

## Information gain

1. Trang-stad wordt als vroege ontbijt- en spoorstad behandeld, niet als lege transferhub.
2. Trang-stad, Kantang, kust/pier en eiland zijn vier verschillende reisblokken.
3. De pagina laat de bezoeker eerst een pier en actuele uitvoering kiezen en daarna pas een eiland.
4. Koh Mook, Koh Kradan en Koh Libong worden op reisritme vergeleken; Koh Ngai krijgt de noodzakelijke Krabi-provincienuance.
5. Emerald Cave krijgt gids-, reddingsvest-, getij-, zee- en comfortcontext in plaats van een bevroren “beste tijd”.
6. Zeegras en doejongs worden als natuurcontext uitgelegd zonder observatiegarantie.
7. Ook op rustige eilanden blijven rijbewijs, verzekering, helm en ervaring voorwaarden voor zelf rijden.

## Visueel systeem

Vijf nieuwe, verschillende WebP-assets zijn met de ingebouwde image-generationroute gemaakt en inhoudelijk gecontroleerd:

- `trang-destination-hero.webp` — echte stad-/spoorrol, geen generieke strandhero.
- `trang-breakfast.webp` — dim sum, Trang moo yang, rijstepap, thee en koffie.
- `trang-kantang-station.webp` — herkenbaar eindstation zonder fantasietrein.
- `trang-emerald-cave.webp` — begeleide groep; de eerste versie is gericht gecorrigeerd zodat ook de gids een reddingsvest draagt.
- `trang-sea-route.webp` — ultra-wide kust-naar-eilandroute met rustige kopruimte.

De beelden zijn als WebP opgeslagen met quality 84 en effort 6. De pagina hergebruikt het premium destination-template met hero-keuzekaart, quick answer, asymmetrische zones, editorial highlights, commerciële maar transparante CTA's, foodstory, route, praktische kaarten, PAA-accordion, bronnen en footer.

## Browser-QA

- Lokaal gecontroleerd op `http://localhost:3000/nl/city/trang/` in de in-app browser bij 1280 × 720.
- 2.685 gerenderde hoofdcontentwoorden.
- Eén H1: `Trang Thailand`.
- Zeven FAQ-items; open antwoord heeft voldoende contrast en leesbare regelafstand.
- Zeventien afbeeldingen; na lazy-load nul ontbrekende of gebroken afbeeldingen.
- Geen horizontale overflow (`scrollWidth 1265` bij viewport 1280).
- Onderste helft handmatig gecontroleerd: planning, vervoersfeiten, praktische kaarten, FAQ, related guides, bronnen, rating, nieuwsbrief en footer zijn volledig vormgegeven.
- De browserbinding kon de viewport niet naar 390 px wijzigen. De route gebruikt ongewijzigd het eerder op 390 px gevalideerde gedeelde destination-template; responsive regels blijven tevens afgedekt door `design:verify` en TypeScript.

## SEO, schema en affiliates

- Canonical: `https://go2-thailand.com/nl/city/trang/`.
- Hreflang: `nl`, `en` en `x-default` aanwezig.
- Schema gevonden: `Organization`, `TouristDestination`, `ItemList`, `FAQPage`, `BreadcrumbList` en `WebPage`.
- Vijf gesponsorde affiliatelinks; allemaal met `rel=sponsored` en een route-eigen `subid`.
- Geen harde cannibalisatie of waarschuwing in de automatische ownercheck.
- De Emerald Cave-highlight linkt bewust naar de zelfstandig Nederlandse attractie-owner `/nl/city/trang/attractions/`. De oude Engelstalige detailgenerator wordt voor NL afgeschermd en geeft terecht een 404 totdat een afzonderlijk onderzochte Nederlandse detailowner bestaat.

## Gates

- `npx tsc --noEmit` — groen.
- `npm run design:verify` — groen: 7 primitives en 26 pilot templates.
- `npm run seo:cannibalization` — groen: 0 hard collisions en 0 waarschuwingen.
- `npm run affiliate:verify` — groen: 13 gebruikte slugs en 13 geregistreerde producten.
- `npm run seo:verify:nl-runtime` — groen.
- `git diff --check` — groen.

## Beeldprompts

De vijf prompts gebruikten `photorealistic-natural` voor premium editorial website-assets, met per rol expliciete geografie, compositie, kopruimte, veiligheidsconstraints en uitsluitingen voor Krabi/Phi Phi-clichés, luxe-resortpolish, leesbare merktekst en watermerken. Emerald Cave kreeg daarna één `precise-object-edit`: alleen een passend reddingsvest voor de gids, met alle overige scène-invarianten behouden.
