# NL manual topical family audit — 31 juli 2026

## Scope en methode

Deze audit dekt exact veertien Nederlandse routes:

- `/nl/thailand-street-food/`
- `/nl/esim/`
- `/nl/social/`
- `/nl/weather/`
- `/nl/travel-gear/`
- `/nl/best-beaches-in-thailand/`
- `/nl/best-cooking-classes-in-thailand/`
- `/nl/best-muay-thai-in-thailand/`
- `/nl/best-elephant-sanctuaries-in-thailand/`
- `/nl/best-diving-snorkeling-in-thailand/`
- `/nl/grand-palace-tickets/`
- `/nl/phi-phi-island-tour/`
- `/nl/chiang-mai-elephant-sanctuary/`
- `/nl/best-places-to-visit-thailand/`

Voor aanvang zijn `AGENTS.md`, `seo/README.md`, `seo/references/voice-nl.md`, de NL-keywordregistry en de gebruikte-keywordlog gelezen. `npm run seo:cannibalization` gaf nul harde botsingen en nul waarschuwingen. DataForSEO was uitgeput; deze batch doet daarom geen zoekvolume-, ranking- of People Also Ask-claim. Bestaande onderzoeksregistraties, primaire of gezaghebbende bronnen en de actuele openbare-webfallback in [`seo/research/nl/2026-07-31-topical-manual-web-serp-refresh.md`](../research/nl/2026-07-31-topical-manual-web-serp-refresh.md) onderbouwen de redactionele grenzen.

De familie-agent wijzigde bewust geen gedeelde registries. Tijdens de centrale integratie zijn de zeven zelfstandige web-SERP-gevalideerde owners aan `seo/keywords-nl.csv` toegevoegd; consolidaties kregen geen dubbel keywordrecord.

## Routebesluiten

| Route | Besluit | Productie-eigenschap |
|---|---|---|
| `/nl/thailand-street-food/` | 308 naar `/nl/food/` | De onderzochte foodhub bezit brede eet- en streetfoodintentie; de oude pagina bevatte verouderde vaste prijzen, gebroken NL-copy en zeventien affiliate-uitgangen. |
| `/nl/esim/` | 308 naar `/nl/travel-guides/sim-card-thailand/` | De onderzochte sim/eSIM-owner bezit provider-, installatie- en connectiviteitskeuze; geen tweede commerciële owner. |
| `/nl/social/` | Eigen brandowner | Premium NL-socialhub zonder fictieve feed, likes, shares of persoonlijke ervaringsclaims; twee sociale uitgangen en natuurlijke links naar inhoudelijke owners. |
| `/nl/weather/` | Bestaande owner behouden | Reeds premium: interactieve maand-regiovergelijker, kustwissel, schema, bronnen en begrensde affiliates. |
| `/nl/travel-gear/` | Bestaande owner behouden | Reeds premium: interactieve paklijst, bagagekeuze, schema, Amazon-OneLink en transparantie. |
| `/nl/best-beaches-in-thailand/` | Eigen strandkeuze-owner | Nieuwe beeldgedreven hero, kustlogica, NL-fitlabels, actuele seizoenscheck en maximaal twaalf gesponsorde uitgangen bij alleen de eerste zes keuzes (voorheen circa vijftig). |
| `/nl/best-cooking-classes-in-thailand/` | Eigen landelijke lesvormowner | Volledig NL premium-template voor stad-, markt-, boerderij- en dieetgerichte les; dieet/allergenenroute, vijf boekingschecks, één Klook- en twee contextuele Amazon-uitgangen. |
| `/nl/best-muay-thai-in-thailand/` | Eigen landelijke ervaringsowner | Scheidt stadionavond, proefles, losse training en kamp; geen vaste prijs, gymranking of dekkingclaim; één Klook-uitgang na de keuzecheck. |
| `/nl/best-elephant-sanctuaries-in-thailand/` | Eigen landelijke welzijnsowner | Observatie en keuzevrijheid centraal; rijden, shows en gedwongen baden uitgesloten; listings zijn expliciet geen welzijnsbewijs. |
| `/nl/best-diving-snorkeling-in-thailand/` | 308 naar `/nl/travel-guides/diving-snorkeling-thailand/` | De nieuwe onderzochte wateractiviteit-owner bezit activiteitfit, medische grens, park/zee- en operatorcheck. |
| `/nl/grand-palace-tickets/` | Eigen Bangkok-ticketowner | Engelse NL-fallback vervangen door officiële-ticket-versus-gidskeuze, dresscode, scam-signaal, vijf checks en één begrensde Klook-uitgang. |
| `/nl/phi-phi-island-tour/` | 308 naar `/nl/phuket-tours/phi-phi-day-trip/` | De onderzochte dagproductowner bezit boottype, stops, parkfee, transfer, comfort en terugkeerbuffer. |
| `/nl/chiang-mai-elephant-sanctuary/` | Eigen lokale welzijnsowner | Engelse NL-fallback en onbewezen dollarprijzen vervangen; bezoekvorm, groepsdruk, transferketen en welzijnsgrens zijn zelfstandig uitgewerkt. |
| `/nl/best-places-to-visit-thailand/` | 308 naar `/nl/city/` | De premium bestemmingenindex bezit brede inspiratie- en keuzehulpintentie; individuele steden behouden lokale details. |

De vijf consolidaties zijn lokaal als permanente HTTP 308 met exact doelpad geverifieerd. Alle Engelse URL's blijven ongewijzigd voor hun zelfstandige EN-fase.

## Keywordoverdracht voor zeven zelfstandige owners en vijf consolidaties

De zeven zelfstandige owners zijn centraal in de CSV geregistreerd. Bij een geconsolideerde URL blijft het keyword bij de al bestaande doelowner, niet bij de oude route.

| Geaudite route | Voorgestelde primary | Voorgestelde secondary keywords | Ownergrens |
|---|---|---|---|
| `/nl/thailand-street-food/` | `eten in thailand` op `/nl/food/` | `street food thailand`, `thais straateten`, `wat eten in thailand`, `typisch thais eten` | Brede eetkeuze, regionale keuken en streetfoodformat; gerechten en stad-food blijven spokes. Oude URL bezit geen keyword. |
| `/nl/esim/` | `esim thailand` op `/nl/travel-guides/sim-card-thailand/` | `simkaart thailand`, `esim thailand kopen`, `simkaart kopen thailand`, `mobiel internet thailand` | eSIM versus fysieke sim, installatie, provider- en aankoopkeuze; VPN en digitale veiligheid blijven afzonderlijk. Oude URL bezit geen keyword. |
| `/nl/social/` | `go2 thailand social media` | `go2thailand instagram`, `go2thailand facebook`, `go2 thailand volgen` | Uitsluitend navigerende merkintentie en officiële kanalen; geen algemene Thailand-inspiratie of bestemmingsintentie. |
| `/nl/best-beaches-in-thailand/` | `beste stranden thailand` | `mooiste stranden thailand`, `thailand stranden`, `welk strand thailand`, `andaman of golfkust` | Landelijke kust- en strandshortlist; eilandowners bezitten verblijf en bereikbaarheid, weerowner bezit maandklimaat, lokale attractiepagina bezit één strand. |
| `/nl/best-cooking-classes-in-thailand/` | `kookcursus thailand` | `thaise kookles thailand`, `kookworkshop thailand`, `thai cooking class thailand`, `kookles met marktbezoek` | Landelijke lesvorm- en stedenkeuze; city-spokes bezitten lokale aanbieders, foodhub bezit gerechten en eetcultuur. |
| `/nl/best-muay-thai-in-thailand/` | `muay thai thailand` | `muay thai kijken thailand`, `muay thai training thailand`, `muay thai stadion thailand`, `muay thai kamp thailand` | Kijken-versus-proberen-versus-kamp; de bestaande beginner-owner bezit eerste les, trainingsweek, paklijst en beginnersveiligheid. |
| `/nl/best-elephant-sanctuaries-in-thailand/` | `olifantenopvang thailand` | `ethische olifantenopvang thailand`, `elephant sanctuary thailand`, `olifanten zonder rijden`, `olifantenwelzijn thailand` | Landelijk welzijnskader en regioselectie; Chiang Mai- en Phuket-owners bezitten lokale programma- en transferkeuze. |
| `/nl/best-diving-snorkeling-in-thailand/` | `duiken en snorkelen thailand` op `/nl/travel-guides/diving-snorkeling-thailand/` | `beste snorkelplek thailand`, `duiken thailand`, `snorkelen thailand`, `golf of andaman snorkelen` | Landelijke activiteitfit, regio, park/zee en operator; eilandspokes bezitten lokale baaien en duiklocaties. Oude URL bezit geen keyword. |
| `/nl/grand-palace-tickets/` | `grand palace bangkok tickets` | `grand palace tickets`, `grand palace kaartjes`, `grand palace dresscode`, `grand palace met gids` | Toegang, officieel ticket, gidskeuze, kleding en bezoeklogistiek; Bangkok-attractiehub bezit brede wat-te-doen-intentie. |
| `/nl/phi-phi-island-tour/` | `phi phi dagtocht vanaf phuket` op `/nl/phuket-tours/phi-phi-day-trip/` | `phi phi tour phuket`, `dagtrip phi phi`, `phi phi boottour`, `speedboot of catamaran phi phi` | Dagproduct vanaf Phuket; eilandowner bezit verblijf, brede Phi Phi-intentie en ferrylogistiek. Oude URL bezit geen keyword. |
| `/nl/chiang-mai-elephant-sanctuary/` | `olifantenopvang chiang mai` | `elephant sanctuary chiang mai`, `ethische olifanten chiang mai`, `olifanten zonder rijden chiang mai`, `elephant nature park bezoeken` | Lokale bezoekvorm, welzijnscheck en transferketen; landelijke owner bezit algemene criteria en regiovergelijking. |
| `/nl/best-places-to-visit-thailand/` | `mooiste plekken thailand` op `/nl/city/` | `bestemmingen thailand`, `thailand mooiste plekken`, `hoogtepunten thailand`, `welke bestemming thailand` | Brede bestemmingenkeuze en regio/reisstijlhulp; individuele owners bezitten plaatsdetails. Oude URL bezit geen keyword. |

`/nl/weather/` (`weer thailand`) en `/nl/travel-gear/` (`paklijst thailand`) hebben al een geïmplementeerd keywordrecord en zijn daarom niet opnieuw voorgesteld.

## SEO, schema en interne links

- Alle negen owners renderen HTTP 200, exact één H1, `lang="nl"`, een zelfverwijzende canonical en `hreflang` voor `nl`, `en` en `x-default`.
- De vijf nieuwe topical owners hebben `Article`, `FAQPage` en `BreadcrumbList`; de socialhub heeft passende `CollectionPage`- en breadcrumbregistratie.
- Interne links zijn beschrijvend en wijzen naar de beslislaag die de detailintentie bezit: food, lokale activiteiten, beginnersgids, reisverzekering, etiquette, bestemmingen en hotelselectie.
- De consolidaties voorkomen een tweede owner voor food/streetfood, eSIM/simkaart, duiken/snorkelen, Phi Phi-dagtocht en bestemmingen.
- Geen nieuwe PAA-, volume-, ranking-, prijs-, review- of actuele-beschikbaarheidsclaim is toegevoegd.

## Affiliate- en transparantiecontrole

- Social: nul gesponsorde uitgangen.
- Grand Palace, landelijke Muay Thai en beide olifantenowners: ieder precies één Klook-uitgang na gratis keuze- en grensinformatie.
- Kookcursus: één Klook-uitgang plus twee natuurlijke Amazon-OneLink-producten voor thuisgebruik; niet als reisbenodigdheid gepresenteerd.
- Strandowner: maximaal twaalf uitgangen, alleen bij de eerste zes shortlistprofielen; overige profielen houden een neutrale interne gidslink.
- Alle gesponsorde links gebruiken `_blank` en `rel="noopener noreferrer nofollow sponsored"` met zichtbare disclosure.
- Platformlisting, badge of review wordt nergens als kwaliteits-, veiligheids- of welzijnsbewijs gepresenteerd.

## Responsive, toegankelijkheid en visuele QA

Browsercontrole is uitgevoerd op de gedeelde topical-template en de zelfstandige strandowner:

- kookcursus op 1440 × 900: exact één H1, nul kapotte afbeeldingen, geen foutoverlay, geen horizontale overflow, 6.528 zichtbare hoofdcontenttekens en drie begrensde gesponsorde uitgangen;
- Grand Palace op 390 × 844: exact één H1, nul kapotte afbeeldingen, geen foutoverlay, geen horizontale overflow en één gesponsorde uitgang;
- stranden op 390 × 844: nieuwe beeldhero, exact één H1, nul kapotte afbeeldingen, geen foutoverlay, geen horizontale overflow, zes bruikbare filterknoppen en twaalf begrensde gesponsorde uitgangen;
- consolecontrole: nul errors op de geteste pagina's;
- de mobiele sticky zoekbalk en bottom navigation blijven zichtbaar zonder hero-CTA's af te snijden.

De voorgeschreven `agent-browser` CLI was niet geïnstalleerd. De gelijkwaardige connectorbrowser met vaste desktop- en mobiele viewport, DOM-metingen, consolelog en screenshots is gebruikt.

## Bronnen en grenzen

De nieuwe owners verwijzen onder meer naar:

- UNESCO Intangible Cultural Heritage en WHO voor culinaire/voedselveiligheidscontext;
- Voedingscentrum voor allergie en intolerantie;
- officiële Rajadamnern- en Lumpinee-kanalen voor live wedstrijddetails;
- World Animal Protection en IUCN voor dierenwelzijn en soortcontext;
- Bureau of the Royal Household voor Grand Palace-toegang en regels;
- Tourism Authority of Thailand en NederlandWereldwijd voor bestemming- en reiscontext.

Operator- of locatiebronnen beschrijven uitsluitend hun eigen actuele aanbod en worden expliciet niet als onafhankelijke vergelijking of certificering gebruikt. Veranderlijke opening, programma's, prijzen, zeecondities en voorwaarden blijven een live check.

## Verificatie

- `npx tsx scripts/verify-nl-topical-manual-family.ts` — **14/14 groen**
- `npx tsc --noEmit --incremental false` — **groen**
- `npm run design:verify` — **groen**
- `npm run affiliate:verify` — **groen**
- `npm run seo:cannibalization` — **0 botsingen, 0 waarschuwingen**
