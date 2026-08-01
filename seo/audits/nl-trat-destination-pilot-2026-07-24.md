# NL destination audit — Trat

**Route:** `/nl/city/trat/`

**Datum:** 24 juli 2026

**Status:** geïmplementeerd en lokaal groen

## Research en ownerkeuze

- Exacte DFS-hoofdquery `trat thailand`: volume 210, KD 0, informationele intentie.
- Cluster: 86 ruwe keywordrecords en 50 competitor domains.
- Zeven live Nederlandse SERP's leverden zeven bruikbare bezoekwaardigheids-, locatie-, veiligheids- en route-PAA's op.
- Nul gevonden rankings en nul gevonden backlinks voor de bestaande route.
- Vier Nederlandse concurrenten onderzocht; oude transferprijzen, bevroren dienstregelingen, persoonlijke observaties uit 2006 en de verouderde Trat–Cambodja-transitframe zijn niet overgenomen.
- Primaire en actuele context gecontroleerd bij TAT, MICHELIN/TAT, Boonsiri, TMD en NederlandWereldwijd.
- Ownergrens: deze route bezit bestemming, verblijfsduur, vastelandkeuze en pierbeslissing. Attracties, food, hotels, vervoer en de afzonderlijke eilandowners houden hun verdiepende intentie.

## Information gain

1. Trat-stad, de provincie, luchthaven, pieren en eilanden worden als afzonderlijke geografische lagen uitgelegd.
2. Een stadsnacht wordt niet verplicht verkocht: één nacht is sterk voor oude wijk, markt en eten; direct doorreizen blijft logisch met een ruime bevestigde aansluiting.
3. Rak Khlong Bang Phra, markt/Wat Phai Lom, Ban Nam Chiao/Laem Ngop en de piercorridors krijgen ieder een eigen functie en trade-off.
4. Koh Chang volgt niet blind dezelfde kustroute als Koh Kood en Koh Mak; eilandkeuze komt vóór pier- en ticketkeuze.
5. Ban Nam Chiao wordt als respectvolle community- en mangrove-ervaring behandeld, niet als geënsceneerd decor.
6. De foodlaag combineert krab, seafood, rijstsnacks en boomgaardfruit met concrete allergie- en ingrediëntenvragen.
7. De Cambodjagrens wordt niet commercieel gepusht. Het actuele Nederlandse reisadvies met rode/oranje grenszones en gesloten landsgrens is expliciet verwerkt.

## Visueel systeem

Vijf nieuwe, verschillende WebP-assets zijn met de ingebouwde image-generationroute gemaakt en inhoudelijk gecontroleerd:

- `trat-destination-hero.webp` — Trat-stad bij avondlicht met houten huizen, kanaal, marktleven en rustige kopruimte; bewust geen eilandstrand.
- `trat-old-town.webp` — de historische kanaalwijk met geleefde houten architectuur en kleine brug.
- `trat-food.webp` — krabnoedels, gegrilde seafood, rijstsnacks, mangosteen en salacca als lokale tafel.
- `trat-ban-nam-chiao.webp` — mangrovepad en gemeenschap met een respectvolle verwijzing naar de gemengde geloofscontext.
- `trat-route-banner.webp` — redactionele vertakking vanuit Trat naar de Koh Chang-ferrycorridor en de Laem Sok-route voor Koh Kood/Koh Mak; bewust geen schaalkaart.

De beelden zijn als WebP opgeslagen met quality 84 en method 6. De pagina gebruikt het premium destination-template volledig: hero-keuzelaag, quick answer, asymmetrische zones, editorial highlights, transparante commerciële CTA's, routebanner, foodstory, reisplan, praktische onderhelft, PAA-accordion, bronnen en footer.

## Browser-QA

- Lokaal gecontroleerd op `http://localhost:3000/nl/city/trat/` bij desktopviewport en 390 × 844 mobiel.
- 2.456 gerenderde hoofdcontentwoorden.
- Eén H1: `Trat Thailand`.
- Zeven FAQ-items; het standaard geopende antwoord gebruikt `rgb(41, 53, 49)` en is goed leesbaar.
- Zeventien gerenderde afbeeldingen; na volledige lazy-load nul ontbrekende of gebroken beelden.
- Geen horizontale overflow op desktop (`1265/1265`) of mobiel (`375/375`).
- Hero, quick answer, gebiedskaarten, routebanner, highlights, food, itinerary, praktische onderhelft, FAQ, bronnen en footer zijn bekeken.
- Mobiele sticky zoekpil en vaste bottom-nav zijn aanwezig; kaarten stapelen zonder afgekapt beeld of tekst.

## SEO, schema en affiliates

- Canonical: `https://go2-thailand.com/nl/city/trat/`.
- Hreflang: `nl`, `en` en `x-default` aanwezig.
- Schema gevonden: `Organization`, `TouristDestination`, `ItemList`, `FAQPage`, `BreadcrumbList` en `WebPage`.
- Vijf gesponsorde affiliatelinks; allemaal met `rel=sponsored` en een route-eigen `subid` voor hotels, activiteiten of vervoer.
- Geen harde cannibalisatie of waarschuwing in de automatische ownercheck.
- De gerelateerde routes voor attracties, food, hotels en vervoer geven lokaal HTTP 200.

## Gates

- `npx tsc --noEmit` — groen.
- `npm run design:verify` — groen: 7 primitives en 26 pilot templates.
- `npm run seo:cannibalization` — groen: 0 hard collisions en 0 waarschuwingen.
- `npm run affiliate:verify` — groen: 13 gebruikte slugs en 13 geregistreerde producten.
- `npm run seo:verify:nl-runtime` — groen: 67/67 routes.
- `git diff --check` — productionele bestanden groen; automatisch gegenereerde research-Markdown gebruikt de bestaande dubbele-spatie-hardbreaks.

## Beeldprompts

De vijf prompts gebruikten natuurlijke documentaire reisfotografie met expliciete geografie, compositie, tekstvrije kopruimte en uitsluitingen voor Bangkok-skylines, generieke resortstranden, glamourtoerisme, leesbare merktekst en watermerken. De routebanner wordt in inhoud en alttekst als redactionele routevisual behandeld, zodat de vertakking niet als letterlijke schaalkaart wordt geïnterpreteerd.
