# NL destination audit — Surat Thani

**Route:** `/nl/city/surat-thani/`

**Datum:** 24 juli 2026

**Status:** geïmplementeerd en lokaal groen

## Research en ownerkeuze

- Exacte DFS-hoofdquery `surat thani thailand`: volume 480, KD 0, informationele intentie.
- Zes live Nederlandse SERP's leverden zeven bruikbare locatie- en route-PAA's op.
- Nul gevonden rankings en nul gevonden backlinks voor de bestaande route.
- Drie Nederlandse concurrenten volledig geparseerd; bevroren tijden en prijzen, onveilige scooterroutes, brede scamclaims en wildlife-attractieframing zijn niet overgenomen.
- Primaire context gecontroleerd bij TAT, Department of Airports, SRT, Seatran Ferry, Raja Ferry, TMD en NederlandWereldwijd.
- Ownergrens: deze route bezit de stad, basiskeuze en knooppuntenlogica. Attracties, hotels, food, weer, vervoer en eilanden houden hun eigen verdiepende intentie.

## Information gain

1. De pagina scheidt vier veel verwarde knooppunten: luchthaven, Phunphin-station, Surat Thani-stad en Donsak-pier.
2. Talat Lang, Na Dan, de 100-Year Arch Bridge, City Pillar, Tapee en markteten maken een stadsnacht inhoudelijk waardevol.
3. Bang Bai Mai en Khlong Roi Sai vormen een bewuste kanaal- en community-uitbreiding, niet een gegarandeerde dagelijkse attractie.
4. Chaiya en Phum Riang geven Srivijaya-erfgoed, textiel en lokale foodcontext een eigen routeblok.
5. Koh Samui-vervoer wordt deur-tot-deur uitgelegd: pick-up, Donsak-terminal, operator, eilandhaven en hoteltransfer.
6. Khao Sok wordt opgesplitst in Khlong Sok-dorp en de Ratchaprapha/Cheow Lan-kant.
7. Zelf rijden krijgt rijbewijs-, verzekering-, helm- en ervaringsvoorwaarden; wilde apen worden niet als voerbare attractie behandeld.

## Visueel systeem

Vijf nieuwe, verschillende WebP-assets zijn met de ingebouwde image-generationroute gemaakt en inhoudelijk gecontroleerd:

- `surat-thani-destination-hero.webp` — Tapee-rivierstad tijdens het blauwe uur met rustige tekstruimte.
- `surat-thani-old-town.webp` — geleefde oude winkelstraat in plaats van een generieke Thaise tempelstraat.
- `surat-thani-food.webp` — patongo, rijstdumplings, khao moo daeng, khanom chin, koffie en thee.
- `surat-thani-chaiya.webp` — compacte Srivijaya-stupa; een eerste generieke hoge chedi-versie is gericht afgewezen.
- `surat-thani-route-banner.webp` — panoramische trein-stad-weg-ferryroute met subtiele oranje waypointlijn.

De beelden zijn als WebP opgeslagen met quality 84 en effort 6. De pagina hergebruikt het premium destination-template met hero-keuzekaart, quick answer, asymmetrische zones, editorial highlights, commerciële maar transparante CTA's, foodstory, lineaire route, praktische kaarten, PAA-accordion, bronnen en footer.

## Browser-QA

- Lokaal gecontroleerd op `http://localhost:3000/nl/city/surat-thani/` in de in-app browser bij 1280 × 720.
- 2.578 gerenderde hoofdcontentwoorden.
- Eén H1: `Surat Thani Thailand`.
- Zeven FAQ-items; open antwoord heeft voldoende contrast en leesbare regelafstand.
- Zeventien afbeeldingen; na volledige lazy-load nul ontbrekende of gebroken afbeeldingen.
- Geen horizontale overflow (`scrollWidth 1265` bij `clientWidth 1265`).
- Onderste helft handmatig gecontroleerd: weer, vervoer, praktische tips, FAQ, related guides, bronnen, rating, nieuwsbrief en footer zijn volledig vormgegeven.
- De route gebruikt het eerder mobiel gevalideerde gedeelde destination-template; responsive regels blijven tevens afgedekt door `design:verify` en TypeScript.

## SEO, schema en affiliates

- Canonical: `https://go2-thailand.com/nl/city/surat-thani/`.
- Hreflang: `nl`, `en` en `x-default` aanwezig.
- Schema gevonden: `Organization`, `TouristDestination`, `ItemList`, `FAQPage`, `BreadcrumbList` en `WebPage`.
- Vijf gesponsorde affiliatelinks; allemaal met `rel=sponsored` en een route-eigen `subid`.
- Geen harde cannibalisatie of waarschuwing in de automatische ownercheck.
- Alle gerelateerde routes voor attracties, food, hotels en vervoer geven lokaal HTTP 200.

## Gates

- `npx tsc --noEmit` — groen.
- `npm run design:verify` — groen: 7 primitives en 26 pilot templates.
- `npm run seo:cannibalization` — groen: 0 hard collisions en 0 waarschuwingen.
- `npm run affiliate:verify` — groen: 13 gebruikte slugs en 13 geregistreerde producten.
- `npm run seo:verify:nl-runtime` — groen: 64/64 routes.
- `git diff --check` — productionele bestanden groen; automatisch gegenereerde research-Markdown gebruikt bestaande dubbele-spatie-hardbreaks.

## Beeldprompts

De vijf prompts gebruikten `photorealistic-natural` voor premium editorial website-assets, met per rol expliciete geografie, compositie, kopruimte, veiligheidsconstraints en uitsluitingen voor generieke eiland-, Krabi- en luxe-resortclichés. De Chaiya-opdracht kreeg een tweede generatie omdat de eerste versie een onjuiste generieke hoge Thaise chedi suggereerde.
