# NL destination audit — Ban Krut

**Route:** `/nl/city/ban-krut/`

**Datum:** 24 juli 2026

**Status:** geïmplementeerd en lokaal groen

## Research en ownerkeuze

- Exacte DFS-hoofdquery `ban krut thailand`: volume 170, KD 0, informationele intentie.
- Cluster: 6 bruikbare keywordrecords en 34 domeinen.
- Negen live Nederlandse SERP's voor bestemming, strand, activiteiten, ligging, vervoer, reistijd, verblijfsduur, zwemmen en de vergelijking met Hua Hin.
- Twee direct Ban Krut-specifieke PAA-vragen en twee letterlijk aangetroffen vragen uit gerelateerde Ban Krut-SERP's. Er zijn geen redactionele vragen als PAA verzonnen.
- Nul gevonden rankings en nul gevonden backlinks voor zowel `/nl/city/ban-krut/` als de overlappende Nederlandse blogroute `/nl/blog/ban-krut-beach-guide-hidden-gem-prachuap-2026/`.
- Vijf relevante concurrenten onderzocht: Thailandblog, Abenteuerglobus, Travelfish, TreasureBeaches en BM Air. Bevroren prijzen, treinuren, markturen, restaurantclaims en generieke “hidden gem”-marketing zijn niet overgenomen.
- Primaire context gecontroleerd bij Tourism Authority of Thailand, State Railway of Thailand, Thai Meteorological Department en NederlandWereldwijd.
- De city-route wordt de Nederlandse destination owner. De oude NL-blog verdwijnt uit blogindexen en geeft permanent 308 naar de owner; het markdownbronbestand blijft voor traceerbaarheid in versiebeheer.
- De Engelse blog blijft bewust onaangeroerd: 22 GA4-weergaven, 14 seconden engagement en 14 GSC-impressies rond `ban krut thailand` maken die URL beschermd tot de afzonderlijke Engelse ownerresearch.

## Information gain

1. De kust wordt geografisch en praktisch gesplitst in centraal/zuidelijk Ban Krut Beach, Khao Thong Chai met Wat Thang Sai, stiller Thang Sai Beach en een afzonderlijke zuidelijke Bang Saphan-dag.
2. Ban Krut wordt eerlijk gepositioneerd voor rustige stranddagen, fietsen, treinreizen en seafood — niet voor nightlife, een grote attractielijst of gegarandeerd snorkelwater.
3. Twee tot vier nachten is een transparant redactioneel advies, geen verzonnen PAA of harde regel.
4. De owner maakt expliciet dat het station niet aan iedere strandaccommodatie ligt en dat trein plus last mile als één reis moet worden gepland.
5. SRT en D-Ticket blijven de actuele bron; treinummers, vertrekterminal en dienstregeling worden niet in de owner bevroren.
6. Zwemadvies volgt actuele Golfcondities, lokale vlaggen, onweer en TMD in plaats van een generiek “het hele jaar kalme zee”.
7. De foodlaag combineert dagvangst, gegrilde vis, inktvis, krab en Zuid-Thaise curry met concrete prijs-, schelpdier-, vissaus-, garnalenpasta- en kruiscontactchecks.
8. Wat Thang Sai wordt als actieve religieuze plek behandeld met kleding- en gedragscontext, zonder onbevestigde cijferclaims of fantasy-architectuur.

## Visueel systeem

Vijf nieuwe plaatsgebonden WebP-assets zijn met de imagegen-skill gemaakt en inhoudelijk gecontroleerd:

- `ban-krut-destination-hero.webp` — vlakke rustige Golfkust met palmen, lokale vissersboten, belangrijke details rechts en lichte kopruimte links; geen Phuket- of Krabi-kliffen.
- `ban-krut-coast-zones.webp` — Khao Thong Chai als herkenbare kustscheiding met tempel, lange stranden en fietsers.
- `ban-krut-wat-thang-sai.webp` — respectvolle tempel- en chedicontext op de groene kustheuvel, zonder fantasiebeelden of oversized Buddha.
- `ban-krut-seafood.webp` — lokale visserij en gedeelde tafel met vis, inktvis, krab, curry, kruiden en rijst zonder restaurant- of prijsclaim.
- `ban-krut-route-banner.webp` — donkere groene tekstruimte, station, dorp, headland en strandkeuzes verbonden door de oranje stippelroute; bewust redactioneel en niet op schaal.

De beelden zijn als WebP opgeslagen met quality 84 en method 6 en wegen samen circa 1,1 MB. De oude Phuket Old Town-afbeelding staat nog alleen in de legacy city-data die Next als pageprop serialiseert; geen gerenderd `<img>` op de Nederlandse owner gebruikt deze afbeelding.

## Browser-QA

- Lokaal gecontroleerd op `http://localhost:3000/nl/city/ban-krut/` bij 1440 × 900 en 390 × 844 px.
- 2.860 gerenderde hoofdcontentwoorden.
- Eén H1: `Ban Krut Thailand`.
- Alle secties van hero tot bronnen en nieuwsbrief renderen in het premium destination-template.
- Geen horizontale overflow: desktop documentbreedte 1425/1425 en mobiel 375/375.
- Zeventien gerenderde afbeeldingen; de owner gebruikt alleen het nieuwe Ban Krut-beeldpakket en bestaande merklogo's.
- De mobiele sticky bestemmingszoeker en bottom-nav zijn aanwezig; de hero, routebanner en kaarten blijven binnen de viewport.
- De geopende FAQ gebruikt `rgb(41, 53, 49)`, 14 px tekst en 28 px regelhoogte en is visueel goed leesbaar.
- De hero heeft een geldige Next.js image-preload. Hetzelfde herobestand is niet meer onder de vouw hergebruikt, zodat de LCP-kandidaat eenduidig blijft.
- Alleen globale dev/vendorlogs bleven zichtbaar: een externe `emrldco.com`-configmelding en Next HMR-manifestwaarschuwing. Er trad geen Ban Krut-componentfout, gebroken afbeelding of routefout op; de globale vendorscriptcontrole blijft onderdeel van de latere technische eindaudit.

## Redirect, SEO, schema en affiliates

- Canonical: `https://go2-thailand.com/nl/city/ban-krut/`.
- Hreflang: `nl`, `en` en `x-default` aanwezig.
- Schema gevonden: `Organization`, `TouristDestination`, `ItemList`, `FAQPage`, `BreadcrumbList` en `WebPage`.
- De oude NL-blogroute geeft permanent 308 naar `/nl/city/ban-krut/` en komt niet meer voor in `getAllPosts('nl')` of de Nederlandse blogindex.
- De Engelse blogroute blijft 200, blijft in `getAllPosts('en')` en behoudt haar Engelse canonical.
- Er worden alleen bestaande interne vervolgowners gelinkt: attracties, food en beste reistijd. Niet-bestaande hotel- en verblijfsgidsen zijn bewust niet gelinkt.
- Klook, Trip.com en 12Go blijven transparante gesponsorde uitgangen met route-eigen sub-ID's. Amazon wordt alleen toegevoegd wanneer een concrete paklijst in een supporting owner het productprobleem kan uitleggen.
- Geen harde cannibalisatie of waarschuwing in de automatische ownercheck.

## Gates

- `npx tsc --noEmit` — groen.
- `npm run design:verify` — groen: 7 primitives en 26 pilot templates.
- `npm run seo:verify:nl-runtime` — groen na toevoegen van deze audit: 69/69 routes.
- `npm run seo:cannibalization` — groen: 0 hard collisions en 0 waarschuwingen.
- `npm run affiliate:verify` — groen: 13 gebruikte slugs en 13 geregistreerde producten.
- `git diff --check` — gecontroleerd vóór commit.

## GA4-queue

De volledige aangeleverde GA4-top 25 is nu vertaald naar een URL-matrix met per route verplichte DFS-, mobiele engagement- en visuele acceptatie. De Nederlandse El Niño-route is al volledig vernieuwd. Alle Engelse verkeersroutes, inclusief de Engelse Ban Krut-blog, blijven beschermd tot de afzonderlijke Engelse fase.
