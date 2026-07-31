# NL travel-guidefamilie — inventarisatie en researchplan

Datum: 31 juli 2026  
Status: implementatievoorbereiding; nog geen familieacceptatie

## Omvang

De completion-ledger wijst **28 Nederlandse routes** toe aan `nl:travel-guide`:

1. `/nl/things-to-do-in-thailand/`
2. `/nl/travel-guides/`
3. `/nl/thailand-index/`
4. `/nl/thailand-index/budget/`
5. `/nl/thailand-index/transport/`
6. `/nl/thailand-index/digital-nomad/`
7. `/nl/thailand-travel-guide/`
8. `/nl/thailand-for-first-timers/`
9. `/nl/thailand-itinerary/`
10. `/nl/travel-guides/scooter-rental-thailand/`
11. `/nl/travel-guides/sim-card-thailand/`
12. `/nl/travel-guides/vpn-thailand/`
13. `/nl/travel-guides/expat-long-stay-thailand/`
14. `/nl/travel-guides/health-hospitals-thailand/`
15. `/nl/travel-guides/diving-snorkeling-thailand/`
16. `/nl/travel-guides/hiking-trekking-thailand/`
17. `/nl/travel-guides/festivals-events-thailand/`
18. `/nl/travel-guides/shopping-markets-thailand/`
19. `/nl/travel-guides/dangerous-animals-thailand/`
20. `/nl/travel-guides/national-parks-thailand/`
21. `/nl/travel-guides/nightlife-rooftop-bars-thailand/`
22. `/nl/travel-guides/thailand-with-kids/`
23. `/nl/travel-guides/solo-female-travel-thailand/`
24. `/nl/travel-guides/thai-phrases-language/`
25. `/nl/travel-guides/vegetarian-vegan-thailand/`
26. `/nl/travel-guides/7-eleven-thailand/`
27. `/nl/travel-guides/hidden-gems-off-beaten-path-thailand/`
28. `/nl/travel-guides/history-culture-thailand/`

`/nl/travel-guides/first-time-thailand/` is al een permanente redirect naar `/nl/thailand-for-first-timers/` en staat daarom niet als afzonderlijke owner in de 28-routequeue.

## Bestaande sterke implementaties

| Owner | Huidige renderbeslissing | Actie |
|---|---|---|
| Budget Thailand | `ThailandBudgetGuide` | Research/freshness en route-QA behouden; niet terugzetten naar JSON. |
| Simkaart/eSIM | `ThailandEsimSimGuide` | Bestaande premium owner en providerlogica behouden; actuele providerclaims hercontroleren. |
| 7-Eleven | `SevenElevenThailandGuide` | Bestaande premium owner gebruiken; oude JSON met vaste productprijzen blijft buiten de render. |
| Vegetarisch/vegan | `VegetarianThailandGuide` | Bestaande premium owner behouden; allergenen- en dieetclaims via primaire bronnen hercontroleren. |

## Legacy-risico’s

De map `data/travel-guides/nl/` bevat 25 JSON-bestanden en circa 1,26 MB tekst. De steekproef en patrooncontrole tonen:

- vaste THB-, dollar- en europrijzen zonder actuele productbron;
- absolute formuleringen als *onbetwiste koning*, *beste*, *altijd*, *nooit* en *perfect*;
- winkel-, venue-, programma-, openings- en dienstclaims die kunnen wijzigen;
- medische, detox-, dieren-, scooter-, alcohol-, verzekering- en veiligheidsclaims zonder voldoende actuele primaire bron;
- Engelse resttekst in Nederlandse datasets;
- exacte temperaturen, aantallen vestigingen, afstanden en tijdschema’s zonder updatebewijs;
- named-venue-ranglijsten en populariteitsclaims die zoekintentie en lokale beschikbaarheid door elkaar halen.

De generieke legacyrenderer gebruikt oude grijze cards, tabellen en waarschuwingen en heeft geen volwaardige premium editorial-signatuur, bronmethode of consistente affiliate-uitleg. Design coverage op routeniveau is daardoor onvoldoende bewijs voor inhoudelijke acceptatie: de globale shell kan de premiumsignatuur leveren terwijl de hoofdcontent legacy blijft.

## Owner- en consolidatiebeslissingen die research vereisen

| Route | Voorlopige eigenaar | Beslissing vóór implementatie |
|---|---|---|
| `/nl/things-to-do-in-thailand/` | brede activiteitkeuze | Vergelijk met `/nl/activities/`; behouden als redactionele keuzehulp of consolideren wanneer intentie identiek blijkt. |
| `/nl/thailand-itinerary/` | brede route-intentie | Vergelijk met nieuwe `/nl/itineraries/`; waarschijnlijk permanent consolideren als rankings/links geen aparte waarde bewijzen. |
| `/nl/thailand-index/transport/` | landelijke vervoerskeuze | Vergelijk met `/nl/transport/`; één canonical owner, geen twee vrijwel gelijke hubs. |
| `/nl/thailand-travel-guide/`, `/nl/thailand-index/`, `/nl/travel-guides/` | drie hub-intenties | Scheid landintroductie, A–Z beslisindex en guide-directory of consolideer waar de SERP-intentie gelijk is. |
| `/nl/thailand-for-first-timers/` | eerste reis | Eigen novicebeslissingen behouden; niet laten concurreren met de algemene landgids. |
| digital nomad / expat long stay / VPN / sim | connectiviteit en lang verblijf | Heldere onderlinge grenzen; geen visum- of belastingadvies zonder primaire bron. |
| duiken / hiken / parken / dieren | natuuractiviteit en risico | Eigen owners, maar nationale parken, seizoenssluiting, dierenrisico en uitvoering blijven conditioneel. |
| festivals / markten / nightlife | veranderlijke evenementintentie | Geen vaste kalender, venue- of openingclaim zonder actuele officiële bron. |
| kinderen / solo vrouw / gezondheid / scooter | high-stakes voorbereiding | Veiligheids- en medische formuleringen primair onderbouwen en grenzen van advies expliciet maken. |

## Researchbatches

De creditsparende werkwijze gebruikt bestaande lokale DFS-resultaten waar beschikbaar, zichtbare Google Nederland-SERPs en echte PAA via Browser, plus primaire bronnen. Er komen geen verzonnen volumes of PAA-labels.

1. **Hub en eerste reis:** `thailand reisgids`, `eerste keer thailand`, `wat te doen in thailand`, `thailand route plannen`.
2. **Geld, vervoer en lang verblijf:** `thailand budget`, `vervoer thailand`, `digital nomad thailand`, `lang verblijf thailand`.
3. **Connectiviteit en mobiliteit:** `sim kaart thailand`, `vpn thailand`, `scooter huren thailand`.
4. **Gezondheid en persoonlijke veiligheid:** `ziekenhuis thailand toerist`, `alleen reizen vrouw thailand`, `thailand met kinderen`.
5. **Natuur:** `nationale parken thailand`, `hiken thailand`, `duiken snorkelen thailand`, `gevaarlijke dieren thailand`.
6. **Cultuur en dagelijks gebruik:** `thaise zinnen vakantie`, `geschiedenis cultuur thailand`, `vegetarisch thailand`, `7 eleven thailand`.
7. **Veranderlijke uitgaansintentie:** `festivals thailand`, `markten thailand`, `nightlife rooftop bars thailand`, `hidden gems thailand`.

## Primaire-bronmatrix

- Tourism Authority of Thailand: bestemming-, activiteit-, cultuur- en evenementcontext.
- Thai Meteorological Department: weer en waarschuwingen.
- Department of National Parks: parkstatus, toegang en sluitingen.
- NederlandWereldwijd: actueel reisadvies en veiligheidscontext.
- Thaise immigratie/BOI/Revenue Department: uitsluitend waar verblijf, visum, werk of belasting expliciet wordt besproken.
- WHO/CDC/Thaise Ministry of Public Health: gezondheids- en voedselveiligheidscontext; geen persoonlijke diagnose.
- Department of Land Transport en verzekeraarvoorwaarden: rijbewijs, helm, voertuig- en polisbeslissingen.
- Provider- en venuepagina’s: alleen voor actuele uitvoerbare productdetails, nooit als onafhankelijke ranglijstbron.

## Beoogd designsysteem

- Eén premium `TravelGuideDirectoryNl` voor de directory.
- Eén typed `NlTravelDecisionGuideTemplate` voor stabiele redactionele owners, met varianten voor veiligheid, natuur, connectiviteit en cultuur.
- Bestaande gespecialiseerde premiumcomponents blijven eigenaar wanneer zij inhoudelijk sterker zijn.
- Veranderlijke informatie verschijnt als beslissing/checklist met bron en controlemoment, niet als eeuwige feitentabel.
- Trip.com, 12Go en Klook alleen na relevante reisbeslissingen; Amazon alleen voor een concreet productprobleem met OneLink en *bekijk actuele prijs*.
- Iedere owner krijgt Article/CollectionPage, Breadcrumb en alleen zichtbare FAQ-schema’s, natuurlijke interne links, bronmethode, disclosure en responsive QA.

## Acceptatie-eis

De familie wordt pas gesloten als alle 28 ledger-routes een bewezen afzonderlijke owner of onderbouwde permanente consolidatie hebben, de render geen ongecontroleerde legacyclaims gebruikt, alle technische poorten groen zijn en de 28 routes in de site- en designaudit opnieuw zijn ververst.
