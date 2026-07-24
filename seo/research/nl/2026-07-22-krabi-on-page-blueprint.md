# Definitief on-page blueprint NL — Krabi

**Datum:** 22 juli 2026  
**Doelpagina:** `/nl/city/krabi/`  
**Primaire term:** `krabi thailand`  
**Status:** klaar voor implementatie  
**Basis:** DataForSEO keyword suggestions, related keywords, keyword overview, SERP competitors, live SERP/PAA, content parsing en exacte URL-rankings; aangevuld met TAT, TMD en routeonderzoek.

## 1. Strategisch besluit

`/nl/city/krabi/` wordt de brede bestemmingspillar voor iemand die Krabi overweegt of een verblijf wil plannen. De pagina beantwoordt eerst de beslisvragen — wat Krabi is, waar je verblijft, hoeveel dagen je nodig hebt en welke ervaringen je kiest — en verwijst daarna naar gespecialiseerde subpagina's.

De huidige pagina telde vóór deduplicatie circa 4.071 zichtbare woorden. Meer tekst is niet het doel. De uiteindelijke lengte volgt uit volledige intentiedekking zonder herhaling; er geldt geen kunstmatig minimum. De winst moet komen uit een betere antwoordvolgorde, duidelijke zoekintentie per URL, natuurlijk Nederlands, eigen keuzehulp en minder herhaling.

### Bewijs voor de canonical pillar

DataForSEO meet voor de exacte URL `/nl/city/krabi/` 17 zoekwoorden, waaronder:

| Zoekwoord | Positie | Volume |
|---|---:|---:|
| krabi thailand | 43 | 6.600 |
| krabi | 52 | 6.600 |
| krabi town | 42 | 390 |
| wat te doen in krabi | 60 | 260 |
| krabi stad | 36 | 90 |
| krabi bezienswaardigheden | 52 | 70 |

Voor `/nl/guides/travel-guide/krabi/`, `/nl/blog/krabi-travel-guide/` en `/nl/city/krabi/attractions/` meet DFS momenteel geen exacte URL-rankings. Dat maakt de city-URL de logische consolidatiebestemming. Vóór productie-redirects blijft een laatste controle in Google Search Console over de laatste 90 dagen wenselijk.

## 2. Zoekwoord-eigenaarschap

| Intentie | Primaire eigenaar | Rol van de city-pillar |
|---|---|---|
| brede bestemming, oriëntatie en planning | `/nl/city/krabi/` — `krabi thailand` | volledig behandelen |
| bezienswaardigheden en activiteiten | `/nl/city/krabi/attractions/` — `krabi bezienswaardigheden` | 5–7 hoogtepunten samenvatten en doorlinken |
| weer per maand | `/nl/city/krabi/weather/` — `krabi weer` | seizoen in circa 150 woorden en doorlinken |
| beste reisperiode | `/nl/city/krabi/best-time-to-visit/` | direct antwoord geven; details doorlinken |
| hotels en accommodatiekeuze | `/nl/best-hotels/krabi/` — `krabi waar verblijven` | gebieden vergelijken; geen lange hotellijst |
| eten en restaurants | `/nl/city/krabi/food/` en `/top-10-restaurants/` | lokale eetcontext en drie keuzes samenvatten |
| budget | `/nl/city/krabi/budget/` | budgetprincipes; geen ongedateerde prijsclaims |
| vervoer Krabi–Phuket | `/nl/transport/krabi-to-phuket/` | afstand en opties samenvatten en doorlinken |

De hoofdpagina mag secundaire termen noemen wanneer dat inhoudelijk nodig is. De gespecialiseerde pagina krijgt de diepste tekst, exact passende title/H1 en de meeste contextuele interne links voor zijn eigen intentie.

## 3. URL-consolidatie

| Huidige URL | Actie | Bestemming / reden |
|---|---|---|
| `/nl/city/krabi/` | behouden, herschrijven | bestaande ranking-signalen en beste brede bestemming |
| `/nl/guides/travel-guide/krabi/` | unieke inhoud samenvoegen, daarna permanent redirecten | naar `/nl/city/krabi/`; duplicaat zonder DFS-rankings |
| `/nl/blog/krabi-travel-guide/` | unieke inhoud samenvoegen, daarna permanent redirecten | naar `/nl/city/krabi/`; duplicaat zonder DFS-rankings |
| `/nl/city/krabi/attractions/` | behouden en later uitbouwen | zelfstandige wat-te-doen-intentie |
| `/nl/destinations/krabi/` | bestaande redirect behouden | geen nieuwe indexeerbare variant maken |
| `/nl/things-to-do/krabi/` | redirect naar attractions controleren | activiteit-intentie niet naar brede pillar sturen |
| `/nl/guides/where-to-stay/krabi/` | redirect naar `/nl/best-hotels/krabi/` controleren | hotelintentie bij hotelpagina houden |

### Implementatiepoort voor redirects

1. Exporteer indien beschikbaar GSC-prestaties per exacte URL over 90 dagen.
2. Bewaar unieke links, vragen en lokale inzichten uit de twee duplicaten.
3. Voeg alleen bruikbare, niet-herhaalde passages toe aan de pillar.
4. Plaats een permanente redirect en werk alle interne links direct bij.
5. Laat redirect-URL's niet in de XML-sitemap staan.

## 4. Exacte metadata en hero

- **Title:** `Krabi, Thailand: tips, bezienswaardigheden & verblijf`
- **Meta description:** `Ontdek wat je in Krabi doet, hoeveel dagen je nodig hebt en waar je verblijft. Met tips voor Ao Nang, Railay, eilanden, weer en vervoer.`
- **Canonical:** `https://go2-thailand.com/nl/city/krabi/`
- **Hreflang:** `nl-NL`, `en` en `x-default` naar de equivalente routes.
- **H1:** `Krabi, Thailand`

Visueel mag `Krabi` groot en `Thailand` kleiner worden gezet, zolang dit technisch één H1 blijft. De intro telt 45–65 woorden en legt direct uit dat Krabi zowel een provincie als de naam van Krabi Town is. Snelle feiten: `Ideaal: 4 dagen`, `Beste kans op droog weer: nov–mrt`, `Handige eerste basis: Ao Nang`.

### Aanbevolen openingsantwoord

> Krabi is een provincie aan de Andamanse kust van Zuid-Thailand, bekend om kalksteenkliffen, eilanden en stranden zoals Railay. Voor een eerste reis is Ao Nang meestal de handigste basis voor boottochten en restaurants. Reken op vier dagen voor Railay, een eilandtour en één dag op het vasteland; met vijf dagen reis je rustiger.

Dit antwoord moet binnen de eerste 250 zichtbare woorden staan en mag tijdens de eindredactie nog natuurlijker worden gemaakt.

## 5. Definitieve informatiearchitectuur

De visuele secties van het redesign kunnen grotendeels blijven. Onderstaande H2's bepalen de semantische volgorde; eyebrows zijn decoratief en vervangen geen kop.

### H1 — Krabi, Thailand

Hero plus kort direct antwoord. **90–130 woorden.**

### H2 — Krabi in het kort

**220–300 woorden.**

- provincie versus Krabi Town;
- voor wie Krabi geschikt is;
- Ao Nang, Railay en Krabi Town als korte keuzehulp;
- vier dagen als redactioneel advies, niet als objectief feit;
- een eenvoudige kaart of oriëntatievisual mag hier informatie toevoegen.

### H2 — Wat te doen in Krabi: de mooiste bezienswaardigheden

**450–600 woorden.** Maximaal zeven keuzes, elk met één onderscheidende reden:

1. Railay en Phra Nang Beach;
2. Hong Islands of Four Islands — leg het verschil uit;
3. Tiger Cave Temple;
4. kajakken bij Ao Thalane;
5. Emerald Pool en warmwaterbronnen;
6. Krabi Town Night Market;
7. één rustiger alternatief, bijvoorbeeld Ko Klang.

Sluit af met **Bekijk alle bezienswaardigheden in Krabi** naar `/nl/city/krabi/attractions/`. Activiteitskaarten met affiliate-links mogen blijven, maar de redactionele link naar de eigen attractions-pagina moet minstens even duidelijk zijn.

### H2 — Waar verblijf je in Krabi?

**350–450 woorden.**

#### H3 — Ao Nang: handig voor een eerste bezoek
#### H3 — Railay: bijzonder, maar alleen per boot bereikbaar
#### H3 — Krabi Town: markten en een lokalere stadssfeer
#### H3 — Klong Muang en Tubkaek: rustiger en meer resortgericht

Vergelijk sfeer, strand, vervoer, prijsniveau in woorden en type reiziger. Verwijs daarna naar `/nl/best-hotels/krabi/`. Verwijder de tweede uitgebreide hotellijst lager op de pagina.

### H2 — Hoeveel dagen heb je nodig in Krabi?

**300–420 woorden.**

#### H3 — 3 dagen: de hoogtepunten
- dag 1 Railay;
- dag 2 eilandhoppen;
- dag 3 vasteland of Krabi Town.

#### H3 — 4 dagen: de beste balans
- voeg rust, Ao Thalane of een reservebootdag toe.

#### H3 — 5 dagen: meer ruimte voor lokaal Krabi
- voeg Ko Klang, Khlong Thom of een extra rustige stranddag toe.

De huidige visuele driedaagse route mag blijven, maar krijgt een duidelijke 4- en 5-daagse uitbreiding.

### H2 — Beste reistijd voor Krabi

**180–240 woorden.**

- november–maart: doorgaans beste kans op droger weer en rustigere zee;
- april: vaak heter;
- mei–oktober: meer kans op regen en wind, gemiddeld natter rond september;
- niet beweren dat reizen in het hele regenseizoen moet worden vermeden;
- adviseer flexibele bootplanning en lokale waarschuwingen.

Link naar `/nl/city/krabi/weather/` en `/nl/city/krabi/best-time-to-visit/` met verschillende beschrijvende ankers.

### H2 — Praktische tips voor Krabi

**350–500 woorden.** Gebruik korte kaarten, maar zorg dat de tekst ook zonder iconen betekenisvol is.

#### H3 — Vervoer en aankomst
- vliegveld naar Ao Nang/Krabi Town zonder onbevestigde actuele tarieven;
- Krabi Town–Phuket Town: circa 162 km over de weg en onder gunstige omstandigheden ongeveer 2,5 uur per auto;
- link naar `/nl/transport/krabi-to-phuket/`;
- eerst de foutieve canonical van die transportpagina corrigeren.

#### H3 — Budget
- verklaar welke keuzes budget sturen;
- link naar `/nl/city/krabi/budget/`;
- vermijd de claim dat Krabi altijd goedkoper is dan Phuket.

#### H3 — Veiligheid
- concrete voorzorgsmaatregelen voor verkeer, zon, zeecondities en bezittingen;
- niet zonder bron claimen dat Krabi veilig of veiliger dan Phuket is;
- link naar `/nl/practical-info/scams-safety/`.

### H2 — Ontdek het andere Krabi

**280–380 woorden.** Dit is de belangrijkste informatie-gain-sectie tegenover generieke concurrenten.

- Ko Klang;
- Ban Na Teen;
- Khao Khanap Nam of een ander passend lokaal onderwerp;
- alleen locaties behouden waarvoor de tekst betrouwbaar en specifiek genoeg is;
- geen niet-geverifieerde openingstijden of entreeprijzen publiceren.

### H2 — Eten in Krabi

**180–260 woorden.**

- verschil tussen markten, lokale Zuid-Thaise keuken en toeristische restaurantzones;
- drie concrete redactionele aanknopingspunten;
- link naar `/nl/city/krabi/food/` en eventueel apart naar `/top-10-restaurants/`;
- commerciële elementen niet als onafhankelijke redactionele aanbeveling presenteren.

### H2 — Veelgestelde vragen over Krabi

Toon alle zes vragen zichtbaar. Antwoorden moeten woordelijk overeenkomen met de FAQ-data wanneer FAQPage-schema wordt gebruikt.

1. Wat moet je echt doen in Krabi?
2. Hoeveel dagen heb je nodig voor Krabi?
3. Wat is leuker, Krabi of Ao Nang?
4. Wat is leuker, Krabi of Phuket?
5. Zijn 3 dagen voldoende voor Krabi?
6. Wat is de beste reistijd voor Krabi?

De goedgekeurde antwoordbasis staat in `2026-07-22-krabi-paa-answer-research.md`. De afstand tot Phuket hoort in de vervoerssectie. De prijsvraag blijft buiten de FAQ totdat vergelijkbaar en gedateerd budgetonderzoek beschikbaar is.

### H2 — Plan je reis naar Krabi

Plaats de booking planner pas na de onafhankelijke keuzehulp. Scheid visueel en tekstueel hotels via Trip.com, activiteiten via Klook, vervoer via 12Go en eSIM als aanvullende service. Sluit af met bronnen, laatst gecontroleerd, auteur/redactie en relevante vergelijkingen of vervolgbestemmingen.

## 6. Componentbesluit

| Component | Besluit | Aanpassing |
|---|---|---|
| `CityDestinationHero` | behouden | één H1, Nederlandse intro, 4 dagen en nov–mrt |
| `CityEditorialIntro` | herbestemmen | “Krabi in het kort” met geografische uitleg en keuzehulp |
| `CityExperienceHighlights` | behouden binnen activiteiten-H2 | betere kaarttekst en detail-links |
| `CityPlaceHighlights` | samenvoegen | semantisch onder activiteiten; geen tweede concurrerende H2 |
| `CityAdventureBanner` | behouden | visuele pauze; affiliate-CTA herkenbaar maken |
| `CityHotelHighlights` | behouden en uitbreiden | gebiedenvergelijking; intern naar canonical hotelpagina |
| `CityItineraryOverview` | behouden en uitbreiden | 3/4/5 dagen; vóór weer plaatsen |
| `CityWeatherOverview` | behouden | geverifieerde nuance en diepe links |
| `CityPracticalCards` | behouden | geen absolute prijs- of veiligheidsclaims |
| `CityFaqOverview` | behouden | vier naar zes zichtbare vragen; exact gelijk aan schema |
| `CityBookingPlanner` | behouden | pas na onafhankelijke informatie en FAQ |
| `CitySeoOverview` | samenvoegen/herbestemmen | late “Over Krabi”-herhaling verwijderen |
| `CityCompleteGuide` | fors inkorten | alleen lokale inzichten, eten, vervolglinks en bronnen behouden |

## 7. Interne linkkaart

| Vanuit sectie | Ankertekst | Doel |
|---|---|---|
| activiteiten | alle bezienswaardigheden in Krabi | `/nl/city/krabi/attractions/` |
| Railay-kaart | Railay Beach bezoeken | `/nl/city/krabi/attractions/railay-beach/` |
| eilanden | Four Islands-tour | `/nl/city/krabi/attractions/four-islands-tour/` |
| tempel | Tiger Cave Temple | `/nl/city/krabi/attractions/tiger-cave-temple/` |
| verblijf | waar verblijven in Krabi | `/nl/best-hotels/krabi/` |
| weer | het weer in Krabi per maand | `/nl/city/krabi/weather/` |
| seizoen | de beste reistijd voor Krabi | `/nl/city/krabi/best-time-to-visit/` |
| eten | eten in Krabi | `/nl/city/krabi/food/` |
| budget | budget voor Krabi plannen | `/nl/city/krabi/budget/` |
| vervoer | van Krabi naar Phuket reizen | `/nl/transport/krabi-to-phuket/` |
| veiligheid | scams en veiligheid in Thailand | `/nl/practical-info/scams-safety/` |

Gebruik locale-aware links en test dat iedere link direct op de canonicale eind-URL uitkomt.

## 8. Structured data

1. **TouristDestination**
   - locale canonical URL `/nl/city/krabi/` gebruiken;
   - `inLanguage: nl-NL` toevoegen;
   - `includesAttraction` gebruiken voor echte bezienswaardigheden;
   - hotels niet als `amenityFeature` van de bestemming modelleren;
   - description laten aansluiten op de zichtbare Nederlandse intro.

2. **BreadcrumbList**
   - Home → Bestemmingen → Krabi;
   - alle URL's absoluut en locale-specifiek.

3. **WebPage of Guide**
   - de onjuiste `TravelGuide`-typeaanduiding verwijderen;
   - een algemeen `WebPage` gebruiken, of `Guide` alleen als validatie en semantiek kloppen;
   - publisher, author/reviewer, `dateModified`, `mainEntity` en `inLanguage` alleen waarheidsgetrouw opnemen.

4. **FAQPage**
   - alleen de zes zichtbare vragen opnemen;
   - schema en accordion exact gelijk houden;
   - niet rekenen op FAQ-rich-results; de FAQ is primair voor bezoekers en semantiek.

Test in de Schema.org Validator en, waar Google het type ondersteunt, de Rich Results Test. Er mag geen schema voor onzichtbare of afwijkende inhoud zijn.

## 9. Afbeeldingen en alt-tekst

- Beschrijf in hero-alt de werkelijk zichtbare Krabi-locatie; voeg niet geforceerd keywords toe.
- Gebruik unieke alt-teksten per informatieve kaart.
- Decoratieve stippellijnen, patronen en iconen krijgen een lege alt of `aria-hidden`.
- Vermijd dezelfde afbeelding in meerdere zichtbare secties.
- Reserveer `priority` voor de echte LCP-afbeelding.
- De Thailand-kaart moet geografisch herkenbaar zijn en niet als navigatiekaart gelden wanneer hij decoratief is.

## 10. Affiliate- en redactionele regels

- Plaats een duidelijke affiliatemelding vóór de eerste commerciële CTA of in een consequent zichtbaar element.
- Schrijf niet alsof Go2Thailand zelf organisator of hotelverkoper is.
- Eigen redactionele links mogen niet verdrinken tussen commerciële knoppen.
- Prijzen, scores, beschikbaarheid en openingstijden alleen met bron en controledatum; anders dynamisch ophalen of weglaten.
- Gebruik “beste” alleen met een uitgelegde selectiegrond.
- Externe affiliatelinks krijgen tracking en passende `rel`-attributen.

## 11. Acceptatiecriteria voor stap 4

- [ ] Nederlandse title, meta description, H1 en intro zijn geïmplementeerd.
- [ ] Binnen 250 woorden staan provincie/stad, aanbevolen basis en reisduur.
- [ ] Iedere sectie heeft één intentie en een natuurlijke H2/H3-structuur.
- [ ] De pagina behandelt alle beslisvragen volledig zonder stukken te behouden om alleen een woordenaantal te halen.
- [ ] Attractions, weather, best-time, hotels, food, budget en transport hebben een contextuele link.
- [ ] Geen interne link wijst naar een redirect wanneer het canonicale doel bekend is.
- [ ] Zes FAQ's zijn zichtbaar en exact gelijk aan de schema-inhoud.
- [ ] Structured data bevat geen foutieve `TravelGuide` of hotel-amenityconstructie.
- [ ] De Krabi–Phuket-pagina heeft een correcte `/nl/` canonical vóór de interne link live gaat.
- [ ] Duplicaatgidsen zijn pas geredirect nadat unieke inhoud en, indien beschikbaar, GSC zijn gecontroleerd.
- [ ] Nederlandse grammatica, zinsbouw en feiten zijn handmatig nagelezen.
- [ ] SEO-verificatie, TypeScript, diff-check en visuele desktop- en mobiele controle slagen.

## 12. Uitvoeringsvolgorde

1. metadata, H1, hero en “Krabi in het kort”;
2. sectievolgorde en koppenstructuur;
3. activiteiten, verblijf en 3/4/5-daagse planning;
4. weer en praktische kaarten met geverifieerde copy;
5. unieke lokale inhoud en eten behouden, duplicaten schrappen;
6. zes FAQ's plus schema gelijkzetten;
7. interne links, canonical en structured data repareren;
8. duplicaat-URL's consolideren na inhouds- en GSC-controle;
9. volledige taal-, SEO-, schema- en visuele QA.
