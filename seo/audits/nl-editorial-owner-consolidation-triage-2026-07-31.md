# NL editorial owner/consolidation triage

**Auditdatum:** 31 juli 2026
**Scope:** de 253 inhoudelijke Nederlandse routes met `template_owner=editorial` in `seo/inventory/routes.csv`; `/nl/blog/` is als directory buiten de 253 inhoudelijke routes gehouden.
**Wijzigingsstatus:** analyse-only. Er zijn geen redirects, canonicals, pagina's, keywordregels of ledgerbeslissingen gewijzigd.

## Uitkomst

| Voorlopige beslissing | Routes | Aandeel | Betekenis |
|---|---:|---:|---|
| Waarschijnlijk consolideren/redirecten | 45 | 17,8% | De intentie wordt al duidelijker bezeten door een complete NL-family of door één sterkere editorial route. |
| Kan als zelfstandige owner blijven | 73 | 28,9% | Er is een verdedigbare eigen beslis-, locatie-, venue-, dieet-, vervoers- of evenementintentie. |
| Nieuws/event lifecycle en signaalcheck | 135 | 53,4% | Geen automatische redirect: eerst actualiteit, organische signalen, links en een bruikbaar evergreen doel vaststellen. |
| **Totaal** | **253** | **100%** | Iedere editorial contentroute valt in precies één triagebak. |

De inventaris bevat maar **12 exact geregistreerde implemented editorial owners** in `seo/keywords-nl.csv`. Die twaalf staan allemaal in de behoudgroep. De overige behoudroutes zijn dus owner-*kandidaten*, geen reeds bewezen keywordowners.

## Beslisregels

- Een complete destination-, weather-, itinerary-, food-, hotel-, visa-, attraction-, practical-, island-, travel-guide- of manual family krijgt voorrang boven een los blogartikel met dezelfde hoofdtaak.
- Een specifieke venue, attractie, vervoersverbinding, dieetvraag of lokale ervaring kan zelfstandig blijven wanneer de pagina een andere beslissing oplost dan de hub.
- `2026` of een publicatiedatum creëert geen aparte intentie. Nieuws blijft alleen indexeerbaar zolang het actuele gebeurtenis-, merk- of beleidsintentie heeft.
- Een redirect mag pas na een route-eigen GSC/GA4-, backlink- en contentmergecheck. Deze triage is geen toestemming om automatisch 301/308's uit te rollen.
- Bij consolidatie moet bruikbare unieke informatie eerst naar de doelowner worden overgezet. Daarna pas redirecten; niet canonicaliseren naar een inhoudelijk afwijkende pagina.

## Waarschijnlijk consolideren of redirecten (45)

### Weather en beste reistijd (4)

| Editorial route | Voorgestelde owner | Rationale |
|---|---|---|
| `/nl/blog/beste-tijd-thailand-bezoeken-per-regio/` | `/nl/weather/` | Landelijke seizoens- en regiokeuze is de expliciete weather-owner. |
| `/nl/blog/best-time-to-visit-thailand/` | `/nl/weather/` | Exact dezelfde landelijke beste-reistijdbeslissing. |
| `/nl/blog/thailand-rainy-season-travel-tips-2026/` | `/nl/weather/` | Regenseizoen hoort als sectie/freshness-update in de weerowner, niet als jaarlijks duplicaat. |
| `/nl/blog/phuket-weer/` | `/nl/city/phuket/weather/` | De complete city-weather owner bezit Phuket-klimaat en maandkeuze. |

`/nl/blog/el-nino-2026-thailand-weather-heatwave-travel-tips/` blijft apart: deze route is al geregistreerd als behouden traffic-owner voor de gebeurtenis en staat niet voor generieke beste-reistijdintentie.

### Itinerary, eerste reis en brede reisgids (18)

| Editorial route | Voorgestelde owner | Rationale |
|---|---|---|
| `/nl/blog/thailand-10-day-itinerary/` | `/nl/itineraries/` | De complete itinerary-family bevat drie onafhankelijke tien-dagenkeuzes; het generieke artikel concurreert met alle drie. |
| `/nl/blog/ultimate-thailand-itinerary-2026/` | `/nl/itineraries/` | Generieke routeplanner zonder duurzame eigen reisduur. |
| `/nl/blog/thailand-7-days-itineraries/` | `/nl/itineraries/` | De family bevat meerdere zeven-dagenowners; laat de directory de keuze verdelen. |
| `/nl/blog/thailand-itinerary-2-weeks/` | `/nl/itineraries/14-days-complete-thailand/` | Exacte veertien-dagenintentie. |
| `/nl/blog/thailand-island-hopping-guide/` | `/nl/itineraries/7-days-island-hopping/` | Het itinerarydoel bezit de concrete eilandhoproute; eilandkeuze blijft in `/nl/islands/`. |
| `/nl/blog/thailand-itinerary-first-timers/` | `/nl/thailand-for-first-timers/` | Eerste-reisintentie hoort bij de complete first-timer owner. |
| `/nl/blog/thailand-first-time-visitors-essential-guide-2026/` | `/nl/thailand-for-first-timers/` | Tweede generieke first-timerpagina. |
| `/nl/blog/thailand-with-kids-family-travel-guide/` | `/nl/travel-guides/thailand-with-kids/` | Exacte family-travel intentie heeft al een complete guide-owner. |
| `/nl/blog/solo-female-travel-thailand-safety-tips/` | `/nl/travel-guides/solo-female-travel-thailand/` | Exacte solo-female safety-owner bestaat al. |
| `/nl/blog/15-hidden-gems-thailand-tourists-miss/` | `/nl/travel-guides/hidden-gems-off-beaten-path-thailand/` | Exacte hidden-gems shortlistowner. |
| `/nl/blog/krabi-travel-guide/` | `/nl/city/krabi/` | De complete destination-owner bezit de brede Krabi-reisgids. |
| `/nl/blog/phuket-travel-guide-2026/` | `/nl/city/phuket/` | De complete destination-owner bezit de brede Phuket-reisgids. |
| `/nl/blog/koh-tao-guide-diving-beaches-budget-travel/` | `/nl/islands/koh-tao/` | De complete Koh Tao-family verdeelt eiland-, duik-, snorkel- en attractie-intentie. |
| `/nl/blog/koh-chang-guide-thailand-eastern-island/` | `/nl/islands/koh-chang/` | Exacte eilandowner bestaat al. |
| `/nl/blog/koh-lipe-maldives-of-thailand-travel-guide-2026/` | `/nl/islands/koh-lipe/` | Exacte eilandowner bestaat al. |
| `/nl/blog/phi-phi-islands-guide-beyond-tourist-crowds/` | `/nl/islands/koh-phi-phi/` | Exacte eilandowner bestaat al; losse tourintentie blijft bij Phuket Tours. |
| `/nl/blog/best-beaches-thailand/` | `/nl/best-beaches-in-thailand/` | Exacte nationale strandselectie is al een complete premium owner. |
| `/nl/blog/snorkelen-thailand-beste-eilanden-heldere-zicht/` | `/nl/travel-guides/diving-snorkeling-thailand/` | Landelijke snorkelkeuze overlapt de complete diving/snorkeling owner. |

### Hotels en verblijfskeuze (4)

| Editorial route | Voorgestelde owner | Rationale |
|---|---|---|
| `/nl/blog/where-to-stay-phuket-beaches-areas-budget/` | `/nl/best-hotels/phuket/` plus area hubs | De hotel-family bezit Phuket én de afzonderlijke verblijfsgebieden. |
| `/nl/blog/where-to-stay-chiang-mai-neighborhoods/` | `/nl/best-hotels/chiang-mai/` | Brede wijk- en hotelkeuze is al afgedekt door de city hotel-owner. |
| `/nl/blog/where-to-stay-bangkok-neighborhood-guide/` | `/nl/best-hotels/bangkok/` | Brede Bangkok-verblijfskeuze is al afgedekt. |
| `/nl/blog/cheapest-vs-most-expensive-hotel-bangkok/` | `/nl/blog/goedkoopste-vs-duurste-hotel-bangkok/` | Twee taal-slugs met dezelfde contrastintentie; behoud uiteindelijk alleen de route met de sterkste historie/signalen. |

### Food en dieet (8)

| Editorial route | Voorgestelde owner | Rationale |
|---|---|---|
| `/nl/blog/khao-soi-chiang-mai-guide/` | `/nl/food/khao-soi/` | De dish-owner kan Chiang Mai, bestellen en varianten meenemen. |
| `/nl/blog/mango-sticky-rice-season-thailand/` | `/nl/food/mango-sticky-rice/` | Seizoen is een sectie/freshnesslaag binnen dezelfde dessertintentie. |
| `/nl/blog/som-tam-regional-variations-thailand/` | `/nl/food/som-tam/` | Regionale varianten horen bij de complete dish-owner. |
| `/nl/blog/pad-thai-street-food-vs-restaurant-homemade/` | `/nl/food/pad-thai/` | Servicevormen horen als keuzehulp op de dish-owner. |
| `/nl/blog/tom-yum-goong-guide/` | `/nl/food/tom-yum-goong/` | Exacte dish-intentie. |
| `/nl/blog/vegan-thai-food-guide/` | `/nl/travel-guides/vegetarian-vegan-thailand/` | Exacte reizigers- en dieetintentie heeft al een complete owner. |
| `/nl/blog/what-makes-thai-food-spicy/` | `/nl/blog/is-thai-food-spicy-guide/` | De twee pagina's beantwoorden dezelfde pittigheidsvraag; behoud één vraagowner. |
| `/nl/blog/eat-like-local-thailand-under-5-dollars/` | `/nl/food/` | Brede food-intentie met een niet-duurzame vaste prijsbelofte; merge bruikbare budgettips in de foodhub. |

### Attractions en activiteiten (3)

| Editorial route | Voorgestelde owner | Rationale |
|---|---|---|
| `/nl/blog/grand-palace-bangkok-complete-guide-2026/` | `/nl/grand-palace-tickets/` | De manual owner bezit toegang, gidskeuze, kleding en bezoeklogistiek. |
| `/nl/blog/old-town-phuket-walking-guide-street-art-cafes-2026/` | `/nl/phuket/old-town/things-to-do/` | De complete Old Town-family bezit wat-te-doen; marktintentie blijft apart. |
| `/nl/blog/ethical-elephant-sanctuaries-thailand-2026-guide/` | `/nl/best-elephant-sanctuaries-in-thailand/` | Exacte landelijke welzijns- en regiokeuze. |

### Visa, practical en veiligheid (5)

| Editorial route | Voorgestelde owner | Rationale |
|---|---|---|
| `/nl/blog/thailand-visa-free-stay-cut-60-to-30-days-2026/` | `/nl/visa/` | Beleidsstatus hoort als actuele update in de visa-owner; titelclaim eerst opnieuw verifiëren. |
| `/nl/blog/thailand-evisa-overhaul-2026-simplified-categories/` | `/nl/visa/` | Generieke visacategorie- en procedure-intentie. |
| `/nl/blog/thailand-visa-run-era-ending-2026-expat-guide/` | `/nl/visa/` en relevante visatype-owner | Geen aparte permanente “era ending”-owner; merge alleen geverifieerde beleidsinformatie. |
| `/nl/blog/thailand-temple-etiquette-dress-code-guide-2026/` | `/nl/practical-info/etiquette-culture/` | Exacte etiquette- en dresscode-intentie heeft al een practical owner. |
| `/nl/blog/thailand-king-cobra-season/` | `/nl/travel-guides/dangerous-animals-thailand/` | Seizoensadvies is ondersteunende dierenveiligheidsinformatie, geen tweede brede safety-owner. |

### Algemene Songkran-intentie (3)

| Editorial route | Voorgestelde owner | Rationale |
|---|---|---|
| `/nl/blog/songkran-2026-survival-guide-what-to-know/` | `/nl/blog/songkran-festival-2026-guide/` | Algemene voorbereiding concurreert met de generieke festivalguide. |
| `/nl/blog/songkran-2026-76-provinces-nationwide-celebrations-guide/` | `/nl/blog/songkran-festival-2026-guide/` | Landelijke vieringsinformatie hoort in dezelfde event-owner. |
| `/nl/blog/songkran-2026-water-gun-rules-fines-safety-guide/` | `/nl/blog/songkran-festival-2026-guide/` | Veiligheid en regels zijn een sectie van de algemene festivalbeslissing. |

Plaats- of festival-specifieke Songkran-routes, zoals S2O, Siam Songkran, Silom Edge, Khaosan, Andamanda en Phra Pradaeng, blijven buiten deze merge omdat de gebruiker daar een specifiek evenement of gebied zoekt.

## Zelfstandige owner kan blijven (73)

Deze routes hebben een verdedigbare eigen intentie. `Kan blijven` betekent: behoud de URL voorlopig en registreer hem pas als implemented owner na eigen SERP/keyword-, bron- en QA-bewijs. De twaalf reeds geregistreerde routes zijn met **geregistreerd** gemarkeerd.

### Reeds geregistreerde editorial owners (12)

- `/nl/blog/bangkok-specialty-coffee-cafe-guide-2026/` — **geregistreerd**
- `/nl/blog/durian-season-thailand-2026-where-to-eat-buy-guide/` — **geregistreerd**
- `/nl/blog/el-nino-2026-thailand-weather-heatwave-travel-tips/` — **geregistreerd**
- `/nl/blog/muay-thai-training-camps-thailand-beginners-guide-2026/` — **geregistreerd**
- `/nl/blog/new-luxury-resorts-thailand-2026-marriott-hilton-mercure/` — **geregistreerd**
- `/nl/blog/bangkok-lumpini-hawker-centre-street-food-2026/` — **geregistreerd**
- `/nl/blog/cave-fantasy-mbk-center-bangkok-immersive-art-2026/` — **geregistreerd**
- `/nl/blog/harbor-island-bangkok-rooftop-waterpark-2026/` — **geregistreerd**
- `/nl/blog/chatuchak-weekend-market-food-guide/` — **geregistreerd**
- `/nl/blog/thai-massage-guide-types-prices/` — **geregistreerd**
- `/nl/blog/thai-curry-guide-green-red-yellow-massaman-panang/` — **geregistreerd**
- `/nl/blog/jodd-fairs-bangkok-night-market-guide/` — **geregistreerd**

### Evergreen of terugkerende zelfstandige owner-kandidaten (61)

| Cluster | Exacte routes | Waarom zelfstandig mogelijk |
|---|---|---|
| Route en vervoer | `/nl/blog/bangkok-in-4-dagen-vanuit-nederland-vluchtig-stedentrip-plan/`<br>`/nl/blog/koh-samui-voor-nederlanders-vluchten-via-bangkok-transfers-beste-wijken/`<br>`/nl/blog/phuket-airport/`<br>`/nl/blog/bangkok-to-koh-samui-guide/`<br>`/nl/blog/how-long-spend-thailand/`<br>`/nl/blog/bangkok-chiang-mai-sleeper-train-guide-2026/`<br>`/nl/blog/bangkok-public-transport-bts-mrt-tourist-guide-2026/` | Exacte duur, luchthaven of verbinding; afbakenen van destination- en itineraryhubs. |
| Foodcultuur, dieet en marktkeuze | `/nl/blog/beste-streetfood-bangkok-wijken-plekken-proeven/`<br>`/nl/blog/southern-thai-food-fiery-flavors/`<br>`/nl/blog/does-thai-food-have-msg/`<br>`/nl/blog/halal-food-thailand-guide/`<br>`/nl/blog/history-of-thai-cuisine/`<br>`/nl/blog/is-thai-food-gluten-free/`<br>`/nl/blog/is-thai-food-healthy/`<br>`/nl/blog/is-thai-food-spicy-guide/`<br>`/nl/blog/what-is-thai-food-cuisine-guide/`<br>`/nl/blog/night-markets-food-lovers-bangkok-chiang-mai-phuket/`<br>`/nl/blog/best-street-food-markets-bangkok/`<br>`/nl/blog/bangkok-street-food-beginners/`<br>`/nl/blog/bangkok-craft-beer-scene-2026-bars-festivals-guide/`<br>`/nl/blog/banthat-thong-road-bangkok-food-street-guide-2026/` | Een eigen dieet-, cultuur-, drank-, markt- of beginnerstaak; voorkom dat deze alsnog brede “Thai food”-intro's worden. |
| Kooklessen | `/nl/blog/thai-cooking-classes-chiang-mai/`<br>`/nl/blog/blue-elephant-cooking-school-bangkok-review/`<br>`/nl/blog/best-cooking-classes-bangkok-market-tour-2026/` | Lokale of venue-intentie is smaller dan de landelijke cooking-class owner. |
| Attracties en dagkeuze | `/nl/blog/doi-inthanon-national-park-thailand-highest-peak/`<br>`/nl/blog/sanctuary-of-truth-pattaya-wooden-temple/`<br>`/nl/blog/wat-pho-bangkok-reclining-buddha/`<br>`/nl/blog/chatuchak-market-bangkok-guide/`<br>`/nl/blog/best-day-trips-from-bangkok/`<br>`/nl/blog/24-hours-talad-noi-bangkok-hidden-gem/`<br>`/nl/blog/wat-arun-bangkok-temple-of-dawn-guide/`<br>`/nl/blog/ayutthaya-day-trip-train-bangkok-temples-guide-2026/`<br>`/nl/blog/erawan-falls-kanchanaburi-day-trip-guide-2026/`<br>`/nl/blog/khao-yai-national-park-day-trip-guide-2026/`<br>`/nl/blog/koh-larn-island-day-trip-pattaya-beaches-ferry-guide-2026/`<br>`/nl/blog/khao-sok-floating-bungalows-cheow-lan-lake-glamping-guide-2026/` | Specifieke attractie, dagtrip of ervaringslogistiek; city-attraction hubs blijven de shortlist bezitten. |
| Activiteit, natuur en wellness | `/nl/blog/best-kayaking-paddleboarding-spots-thailand-2026/`<br>`/nl/blog/camping-thailand-national-parks-guide-2026/`<br>`/nl/blog/chiang-dao-stargazing-eco-lodges-mountain-retreat-2026/`<br>`/nl/blog/thailand-liveaboard-diving-guide-similan-surin-2026/`<br>`/nl/blog/sak-yant-bamboo-tattoo-thailand-guide-2026/`<br>`/nl/blog/wildlife-conservation-volunteering-thailand-2026-turtles-elephants/`<br>`/nl/blog/yoga-retreats-koh-samui-koh-phangan-2026-guide/`<br>`/nl/blog/thailand-cycling-tours-2026-chiang-mai-coast-guide/`<br>`/nl/blog/thailand-mekong-river-cruises-cultural-tourism-2026/`<br>`/nl/blog/best-wellness-retreats-thailand-2026/`<br>`/nl/blog/full-moon-party-koh-phangan-guide-2026/` | Specifieke activiteit of terugkerende venue/event met een eigen keuzeproces. |
| Bestemming, wijk en verblijfstype | `/nl/blog/bangkok-travel-tips-reddit/`<br>`/nl/blog/thailand-travel-packages-guide/`<br>`/nl/blog/travel-insurance-thailand-guide/`<br>`/nl/blog/10-biggest-thailand-travel-mistakes/`<br>`/nl/blog/thailand-honeymoon-guide-romantic-destinations/`<br>`/nl/blog/where-to-live-bangkok-neighborhood-guide-expats/`<br>`/nl/blog/goedkoopste-vs-duurste-hotel-bangkok/`<br>`/nl/blog/best-party-hostels-thailand-2026-bangkok-islands-chiang-mai/`<br>`/nl/blog/chiang-mai-cheapest-digital-nomad-city-2026/`<br>`/nl/blog/koh-kood-quiet-island-guide-trat-2026/`<br>`/nl/blog/chiang-mai-lanna-temple-walking-trail-hidden-gems-2026/`<br>`/nl/blog/chiang-mai-street-art-walking-guide-old-city-nimman-2026/`<br>`/nl/blog/bangkok-floating-markets-guide-damnoen-amphawa-2026/` | Expats, pakketten, verzekering, reisfouten, verblijfstype of een locatie zonder bestaande exacte owner. Reddit mag alleen queryframing zijn, nooit de enige bronbasis. |
| Algemene Songkran-owner | `/nl/blog/songkran-festival-2026-guide/` | Centrale algemene festivalowner; lokale feesten en ticketed events kunnen aparte spokes zijn. |

## Nieuws/event lifecycle en signaalcheck (135)

Deze restgroep is volledig afgebakend als het complement van de 45 consolidatiekandidaten en 73 behoudkandidaten. Het zijn voornamelijk hotelopeningen, concerten, festivals, luchtvaartupdates, beleidsnieuws en toerismetrends met `2026` in de slug. Ze krijgen **niet** automatisch een redirect en zijn evenmin automatisch zelfstandige evergreen owners.

### Verplichte lifecycle-beslissing

1. **Actueel en specifieke merk/eventintentie:** behouden zolang datum, venue, ticketstatus en bronnen actueel zijn; event schema alleen met verifieerbare data.
2. **Verlopen maar met herhaalintentie:** herschrijven naar een tijdloze event/venue-owner en jaartal uit title/H1 verwijderen wanneer de URL-signalen behoud rechtvaardigen.
3. **Verlopen en zonder organische/backlinkwaarde:** noindex/410 kan logischer zijn dan redirecten; een redirect naar een generieke hub is alleen toegestaan als de intentie werkelijk gelijk is.
4. **Verlopen met bruikbare unieke informatie én gelijk doel:** content eerst mergen in de complete owner, daarna permanent redirecten.

### Clusters met verhoogd consolidatierisico

- **Thailand Tourism Festival:** `/nl/blog/thailand-tourism-festival-2026-5-must-do-food-culture-highlights/`, `/nl/blog/thailand-tourism-festival-2026-culinary-regional-food-guide/`, `/nl/blog/thailand-tourism-festival-2026-feel-all-feelings-visitor-guide/`, `/nl/blog/thailand-tourism-festival-2026-zero-waste-sustainability-zone/`. Vier artikelen rond één evenement; kies na signalen één event-owner en maak de andere onderwerpen secties.
- **Toerisme-outlook/economie:** `/nl/blog/thailand-tourism-growth-target-2026-recovery-after-2025-decline/`, `/nl/blog/thailand-tourism-outlook-2026-hopes-pressure-uncertainty/`, `/nl/blog/thailand-tourism-shifts-gears-fewer-visitors-better-experiences-2026/`, `/nl/blog/thailand-3-trillion-baht-tourism-target-amazing-5-economy-2026/`, `/nl/blog/thailand-tourism-2026-middle-east-impact-visitor-numbers/`, `/nl/blog/thailand-tourism-7-million-visitors-march-2026/`, `/nl/blog/thailand-tourism-next-strategy-value-over-volume-2026/`, `/nl/blog/thailand-tourism-competition-vietnam-regional-rivals-2026/`, `/nl/blog/thailand-pivots-marketing-short-haul-asian-markets-2026/`. Sterk overlappende nieuwsframes; geen negen evergreen owners maken.
- **Luchtvaart/crisisupdates:** `/nl/blog/new-airline-routes-thailand-2026-flydubai-norse-scoot-chiang-rai/`, `/nl/blog/thai-airways-a321neo-fleet-modernization-32-jets-2026/`, `/nl/blog/thai-airways-fare-hike-10-15-percent-fuel-costs-2026/`, `/nl/blog/thai-airways-summer-2026-new-routes-amsterdam-auckland-perth/`, `/nl/blog/thai-carriers-fuel-surge-tourism-boom-warning-2026/`, `/nl/blog/thailand-airlines-jet-fuel-tax-cut-proposal-march-2026/`, `/nl/blog/thailand-aerothai-1000-flights-cancelled-gulf-crisis-2026/`, `/nl/blog/thailand-fuel-shortage-suvarnabhumi-taxis-krabi-boats-march-2026/`, `/nl/blog/middle-east-conflict-thailand-flights-airfare-2026/`, `/nl/blog/thailand-oil-crisis-flight-prices-energy-march-2026/`. Behoud alleen afzonderlijk waar een merk/route/incident aantoonbaar eigen zoekvraag heeft; anders één actuele luchtvaartstatus of archiefbeleid.
- **Hotels/openingen:** merk- en openingsartikelen kunnen tijdelijk navigerende intentie hebben, maar concurreren na opening snel met `/nl/best-hotels/{city}/` en eventuele hoteldetails. Dit geldt onder meer voor Anantara Siam, Andaz One Bangkok, Fairmont Sukhumvit, Prince Akatoki, voco Surawong, Cape Fahn, Kahavadi Chiang Rai, KAIA Koh Phangan, Barai Hua Hin, Langham Custom House en Visama Explorer Nan.
- **Songkran-spokes:** S2O, Siam Songkran, Silom Edge, Khaosan, Andamanda, Phra Pradaeng en airline-discountpagina's niet samenvoegen met de algemene owner zolang er specifieke venue- of ticketintentie bestaat; na afloop opnieuw beoordelen.
- **Concerten en sport:** BTS World Tour, K-popoverzicht, Kraftwerk, Tomorrowland, HYROX, Toyota Thailand Open en World of Coffee zijn eventowners zolang hun editie actueel is. Daarna herhaalintentie of archiefstatus bepalen.

## Onderbouwing uit de huidige repository

- `seo/inventory/routes.csv`: 254 NL editorial routes, waarvan één directory en 253 inhoudelijke routes.
- `seo/keywords-nl.csv`: 12 exacte implemented editorial owners; dit is **geen** bewijs dat de andere 241 routes een zelfstandige owner zijn.
- `seo/inventory/family-completion.json`: doelgroepen zoals hotel-guide, destination-guide, destination-attractions, destination-weather, destination-food, food/drink, visa, island, itinerary, travel-guide, practical en manual-review zijn complete NL families.
- `next.config.js`: bestaande consolidaties laten dezelfde ownerlogica al zien, waaronder travel-guide weather naar `/nl/weather/`, best-time routes naar weather, visa-artikelen naar visa owners, cuisine naar `/nl/food/`, city best-time naar city weather en waar-verblijvenroutes naar city hotelowners.
- `seo/audits/design-coverage-nl-2026-07-31.md`: 253 van 254 editorial routes tonen een premium designsignatuur, maar premium templategebruik bewijst geen unieke zoekintentie.

## Uitvoeringsvolgorde

1. Start met de 45 waarschijnlijke consolidaties; controleer per route GSC/GA4, backlinks, externe links en mergewaardige inhoud.
2. Registreer pas daarna de 61 nog niet geregistreerde behoudkandidaten met een expliciete primaire keywordowner en boundary.
3. Maak voor de 135 lifecycle-routes een freshnessveld: `current`, `recurring`, `expired-merge`, `expired-noindex/410` of `archive-with-value`.
4. Draai na iedere redirectbatch de route-, canonical-, hreflang-, internal-link- en cannibalisatiechecks opnieuw.

## Niet doen

- Niet alle nieuwsartikelen naar `/nl/blog/` of de homepage redirecten; dat is meestal geen gelijkwaardige intentie.
- Niet op basis van alleen slugs of premium design een owner als bewezen registreren.
- Niet twee generieke owners laten bestaan omdat één route `2026` bevat.
- Niet automatisch verwijderen voordat historische clicks, impressions, backlinks en interne links zijn gecontroleerd.
