# NL destination audit — Hat Yai

**Route:** `/nl/city/hat-yai/`

**Datum:** 24 juli 2026

**Status:** geïmplementeerd en lokaal groen

## Research en ownerkeuze

- Exacte DFS-hoofdquery `hat yai thailand`: volume 210, KD 2, informationele intentie.
- Cluster: 63 ruwe keywordrecords en 50 competitor domains.
- Zes live Nederlandse SERP's leverden zeven bruikbare locatie-, bezoekwaardigheids-, koop- en route-PAA's op.
- Nul gevonden rankings en nul gevonden backlinks voor de bestaande route.
- Drie Nederlandse concurrenten volledig geparseerd; bevroren prijzen, vaste vertrekmomenten, generieke onderhandelclaims en transit-only framing zijn niet overgenomen.
- Primaire en actuele context gecontroleerd bij TAT, Hat Yai City Municipality, AOT, SRT, TMD en NederlandWereldwijd.
- Ownergrens: deze route bezit bestemming, basiskeuze en hoofdroutes. Attracties, food, hotels, vervoer en een toekomstige Koh Lipe-owner houden hun eigen verdiepende intentie.

## Information gain

1. Hat Yai wordt als markt- en foodstad uitgelegd in plaats van als teleurstellende wachtruimte.
2. Hat Yai en Songkhla-stad krijgen ieder hun eigen functie: praktische handelsbasis versus erfgoeduitbreiding.
3. De owner scheidt centrum/station, avondstad, Kho Hong/Municipal Park en Songkhla Old Town.
4. Municipal Park blijft waardevol zonder een oncontroleerbare kabelbaanbelofte.
5. De Koh Lipe-route wordt als keten uitgelegd: Hat Yai-pick-up, wegtransfer, Pak Bara-terminal, boot en aankomstpunt.
6. Food combineert Thai-Chinese en Maleis-Moslimse lagen en maakt halal, vegetarisch en allergieveilig expliciet van elkaar los.
7. Actueel NederlandWereldwijd-advies wordt per route en district toegepast; de stabiele situatie in Hat Yai wordt niet gegeneraliseerd naar het hele diepe zuiden.

## Visueel systeem

Vijf nieuwe, verschillende WebP-assets zijn met de ingebouwde image-generationroute gemaakt en inhoudelijk gecontroleerd:

- `hat-yai-destination-hero.webp` — stedelijke marktstraat na regen, met rustige kopruimte en zonder strandcliché.
- `hat-yai-kim-yong-market.webp` — echte handelslaag met droge waren, fruit, thee, verkopers en kopers.
- `hat-yai-food.webp` — dim sum, fried chicken, roti, curry, thee en koffie als gedeelde foodcultuur.
- `hat-yai-songkhla-old-town.webp` — verweerde Sino-Europese erfgoedstraat met een eigen Songkhla-karakter.
- `hat-yai-route-banner.webp` — redactionele vertakking vanuit Hat Yai naar Songkhla en via Pak Bara naar Koh Lipe; bewust geen letterlijke kaart.

De beelden zijn als WebP opgeslagen met quality 84 en effort 6. De pagina gebruikt het premium destination-template volledig: hero-keuzekaart, quick answer, asymmetrische zones, editorial highlights, transparante commerciële CTA's, routebanner, foodstory, reisplan, praktische onderhelft, PAA-accordion, bronnen en footer.

## Browser-QA

- Lokaal gecontroleerd op `http://localhost:3000/nl/city/hat-yai/` in de in-app browser bij 1280 × 720.
- 2.504 gerenderde hoofdcontentwoorden.
- Eén H1: `Hat Yai Thailand`.
- Zeven FAQ-items; het geopende Koh Lipe-antwoord heeft voldoende contrast en regelafstand.
- Zeventien afbeeldingen; na volledige lazy-load nul ontbrekende of gebroken afbeeldingen.
- Geen horizontale overflow (`scrollWidth 1265` bij `clientWidth 1265`).
- Hero, gebiedskaarten, highlights, routebanner, food, itinerary, praktische onderhelft, FAQ, bronnen, nieuwsbrief en footer zijn handmatig bekeken.
- De route gebruikt het eerder mobiel gevalideerde gedeelde destination-template; responsive regels blijven tevens afgedekt door `design:verify` en TypeScript.

## SEO, schema en affiliates

- Canonical: `https://go2-thailand.com/nl/city/hat-yai/`.
- Hreflang: `nl`, `en` en `x-default` aanwezig.
- Schema gevonden: `Organization`, `TouristDestination`, `ItemList`, `FAQPage`, `BreadcrumbList` en `WebPage`.
- Vijf gesponsorde affiliatelinks; allemaal met `rel=sponsored` en een route-eigen `subid`.
- Geen harde cannibalisatie of waarschuwing in de automatische ownercheck.
- De gerelateerde routes voor attracties, food, hotels en vervoer geven lokaal HTTP 200.

## Gates

- `npx tsc --noEmit` — groen.
- `npm run design:verify` — groen: 7 primitives en 26 pilot templates.
- `npm run seo:cannibalization` — groen: 0 hard collisions en 0 waarschuwingen.
- `npm run affiliate:verify` — groen: 13 gebruikte slugs en 13 geregistreerde producten.
- `npm run seo:verify:nl-runtime` — groen: 65/65 routes.
- `git diff --check` — productionele bestanden groen; automatisch gegenereerde research-Markdown gebruikt bestaande dubbele-spatie-hardbreaks.

## Beeldprompts

De vijf prompts gebruikten `photorealistic-natural` met expliciete rollen, geografie, compositie, kopruimte en uitsluitingen voor Bangkok-skylines, stranden in Hat Yai, resortpolish, leesbare merktekst en watermerken. De routebanner is in de content en alttekst expliciet als routecollage behandeld, zodat de visuele vertakking niet als geografische schaalkaart wordt geïnterpreteerd.
