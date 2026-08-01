# NL pensioenvisum Thailand — owner acceptance audit

**Route:** `/nl/visa/retirement-visa/`

**Datum:** 25 juli 2026  
**Template:** `ThailandRetirementVisaGuide`  
**Status:** groen na officiële hercontrole, inhoudelijke verdieping en desktop-/mobiele QA

## Onderzoek en intentie

- DataForSEO-cluster, Nederlandse SERP, zes echte PAA-vragen, drie concurrentieparses, rankingcheck en backlinkcheck zijn op 24 juli uitgevoerd.
- Primaire term `retirement visa thailand`: volume 140 en KD 8. Ondersteunende termen omvatten `pensioen visum thailand` (90) en `non immigrant o visa` (110).
- De zoekintentie combineert routekeuze, financiële toelating, kosten en praktische haalbaarheid. De owner scheidt daarom visumdrempel bewust van een duurzaam pensioenbudget.
- De Engelse route blijft ongewijzigd totdat de afzonderlijke Engelse researchfase start.

## Officiële feitencontrole

- De actuele pagina van de Royal Thai Embassy in Den Haag verwijst nog steeds naar de officiële categoriechecklist van 18 juni 2025 en vermeldt dat extra documenten kunnen worden gevraagd.
- In de checklist zijn Non-O O1-3, O-A en O-X afzonderlijk gecontroleerd op doel, leeftijd, duur, financiële drempel, verzekering, medische verklaring, strafregister en legalisatie.
- De Haagse tarieflijst bevestigt €70 voor Non-Immigrant single entry, €175 voor O-A en €350 voor O-X.
- De officiële O-A-pagina bevestigt de 90-dagenmelding als adresmelding en noemt een eventuele jaarverlenging een discretionaire immigratiebeslissing.
- Immigration Bureau-formulier TM.47 vermeldt dat de 90-dagenmelding geen extension of stay is. Het officiële re-entry-handboek bevestigt TM.8 en de single-/multiple-route.
- De pagina presenteert geen individueel juridisch advies en maakt expliciet dat actuele ambassade-, Immigration- en paspoortinformatie leidend zijn.

## Ontwerp en inhoud

- Eén H1, 1.438 gerenderde woorden en elf inhoudelijke FAQ’s.
- Informatiearchitectuur: kernwaarden, interactieve Non-O/O-A/O-X-keuze, bewijsroute, toelating versus leefbudget, Nederlandse aanvraagflow, vier processen na aankomst, documentplanner, onveilige-shortcutwaarschuwingen, flexibele eerste maand, FAQ, gerelateerde gidsen en bronnen.
- Drie eigen WebP-assets: long-stayhero, visuele documentroutes en een nieuwe na-aankomstplanning met volwassen reizigers.
- De extra onderhelft voorkomt dat een sterke hero eindigt in een afgeraffelde samenvatting en geeft informatiegain die concurrenten vaak missen.
- Affiliate-CTA’s staan pas ná de volledige visuminformatie en gaan uitsluitend over flexibel verblijf via Trip.com en bereikbaarheid via Saily; ze beïnvloeden geen routeadvies.

## Browser- en SEO-QA

- Desktop 1280 px: geen horizontale pagina-overflow; hero, interactieve routekeuze en nieuwe na-aankomstsectie visueel gecontroleerd.
- Mobiel 390 × 844: effectieve documentbreedte 375/375, geen overflow, sticky zoekbalk en bottomnavigation blijven bruikbaar.
- Geen gebroken geladen afbeeldingen; alle hoofdbeelden hebben inhoudelijke alt-tekst.
- Open FAQ gebruikt tekstkleur `rgb(41, 53, 49)`.
- Canonical: `https://go2-thailand.com/nl/visa/retirement-visa/`; hreflang `en`, `nl` en `x-default` aanwezig.
- JSON-LD parseert als Organization, FAQPage, WebPage en BreadcrumbList.
- Trip.com- en Saily-links hebben unieke subid’s, openen apart en gebruiken `noopener noreferrer nofollow sponsored` met zichtbare disclosure.

## Releasechecks

- TypeScript en gerichte ESLint-controle groen.
- Designsystem-, affiliate- en cannibalisatiecheck groen.
- Volledige Nederlandse runtime-ownercontrole groen.
