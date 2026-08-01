# NL vaccinaties en reisgezondheid Thailand — owner acceptance audit

**Route:** `/nl/practical-info/health-vaccinations/`

**Datum:** 26 juli 2026

**Template:** `ThailandVaccinationsGuide` met gedeelde editorial-designprimitives
**Status:** groen na desktop-, mobiel-, SEO-, bron-, link-, schema-, medische-grens- en affiliate-QA

## Onderzoek en ownerkeuze

- DataForSEO-cluster met 90 records, vijf kernvolumes, tien Nederlandse SERP/PAA-sets, drie brede landpagina’s, vijf officiële bronnen en vier familiebrede ranking- en backlinkchecks uitgevoerd.
- Primaire term `vaccinaties thailand`: volume 3.600 en KD 34. De aanvullingen `welke vaccinaties thailand` en `malaria thailand` dragen duidelijke beslisintentie.
- De hoofdcontent telt 1.633 zichtbare woorden; dit ligt binnen 20% van de circa 2.040 woorden van de tweede brede landconcurrent.
- Twee overlappende Nederlandse routes consolideren permanent naar de praktische owner. De aparte ziekenhuisgids en alle Engelse routes blijven bestaan.
- Alleen werkelijk aangetroffen PAA is als FAQ opgenomen.

## Content en ontwerp

- Unieke Nederlandse title, meta description en exact één H1.
- Informatiearchitectuur: aanbevolen versus verplicht; vierstaps check; vaccinatiekompas; voorbereidingstijdlijn; routewijziging; malaria/dengue; rabiës-noodroute; reisapotheek; kosten en dekking; noodnummers; FAQ; related guides en bronmethode.
- Drie nieuwe projectspecifieke WebP-assets: reisconsult, praktische inpak-flatlay en een brede groene Thailand-route. Alle drie zijn visueel gecontroleerd en lokaal geoptimaliseerd.
- Verouderde vaste prijzen, vaccinschema’s, medicatiedoseringen, dengue-jaarcijfers en absolute malaria-uitsluitingen zijn verwijderd uit de NL-owner.
- De onderhelft bevat volwaardige visuele en inhoudelijke modules voor rabiës, inpakken, OneLink, kosten, noodhulp, FAQ, interne doorstroom en bronnen.

## Browser-QA

- Desktop: 1.280 × 900; documentbreedte 1.280/1.280 en geen horizontale overflow.
- Mobiel: 390 × 844; documentbreedte 390/390, hero, sticky zoekbalk en bottomnavigation blijven bruikbaar.
- De enige elementen buiten het mobiele viewport zijn items in de bewust horizontaal scrollbare sectienavigatie; de pagina zelf blijft exact 390 px breed.
- Alle acht gerenderde beeldinstanties laden na progressief scrollen en hebben een alt-attribuut.
- FAQ bevat tien zichtbare items; het geopende antwoord rendert in donker `rgb(41, 53, 49)`.

## SEO, schema, links en affiliates

- Canonical: `https://go2-thailand.com/nl/practical-info/health-vaccinations/`.
- Hreflang: `nl`, `en` en `x-default` aanwezig.
- JSON-LD: Organization, Article, BreadcrumbList, FAQPage, HowTo en ItemList; alle scripts parseerbaar.
- Alle directe interne contentroutes retourneren HTTP 200.
- Beide dubbele NL-routes retourneren HTTP 308 naar de owner; de twee Engelse equivalenten blijven HTTP 200.
- Twee Amazon-productlinks lopen via de centrale `/go/`-registry en retourneren HTTP 307 met de Go2Thailand-tag, no-store en noindex/nofollow-responseheaders.
- Beide commerciële uitgangen bevatten `noopener noreferrer nofollow sponsored` en een zichtbare partnerspecifieke OneLink-disclosure.
- TypeScript, gerichte ESLint, cannibalisatie, design-system, Amazon-affiliate en NL-runtimechecks zijn groen.

## Bronnen en veranderlijke feiten

- GGD Reisvaccinaties voor landadvies, DTP/hepatitis A, afspraakmoment en persoonsgebonden advies.
- WANDA / Instituut voor Tropische Geneeskunde voor voorbereidingstijd en route-afhankelijke malaria- en gelekoortscontext.
- RIVM voor denguepreventie en de directe handelingen na mogelijke rabiësblootstelling.
- NederlandWereldwijd voor actuele reiscontext en lokale noodnummers; bron opnieuw vastgelegd tijdens deze owner.
- Vaccinatie-, malaria-, inreis- en noodinformatie kan wijzigen. De pagina zet ieder veranderlijk besluit terug naar een actuele officiële controle en een erkende reisvaccinatieprofessional.
