# NL visumfamilie — production audit 2026-07-26

## Scope

De volledige Nederlandse visumfamilie is als één semantisch cluster afgerond:

- `/nl/visa/`
- `/nl/visa/digital-arrival-card/`
- `/nl/visa/digital-nomad-visa/`
- `/nl/visa/retirement-visa/`
- `/nl/visa/tourist-visa/`
- `/nl/visa/visa-extension/`
- `/nl/visa/education-visa/`
- `/nl/visa/ltr-visa/`
- `/nl/visa/thailand-elite-visa/`

De Engelse equivalenten blijven inhoudelijk en visueel ongewijzigd tot de afzonderlijke Engelse DFS-fase.

## Zoekintentie en research

- Negen unieke owners zonder kannibalisatiewaarschuwing.
- Zelfstandige Nederlandse DataForSEO-clusters, live SERP’s, echte PAA, concurrentieparses, rankings en backlinkchecks uit 24 juli 2026 zijn gekoppeld aan de owners.
- Brede visumstatus blijft eigendom van `/nl/visa/`; TDAC, DTV, pensioen, toerist, verlengen, studie, LTR en Privilege bezitten ieder hun eigen taakgerichte intentie.
- Vier brede NL-visumblogs, een dubbele TDAC-blog en de rankingloze visa-free-entryroute zijn volgens de bestaande consolidatie-audits naar de juiste owner geleid.
- De feitelijke laag is op 26 juli 2026 opnieuw gecontroleerd tegen NederlandWereldwijd, Thailand MFA, Royal Thai Embassy The Hague, Thailand Immigration Bureau, BOI en Thailand Privilege. Zie `seo/research/nl/2026-07-26-visa-official-source-refresh.md`.

## Design en contentkwaliteit

- Alle negen routes gebruiken het premium redactionele designsysteem met een eigen hero, beslisarchitectuur, visuele bewijs- of routekaart, contrasterende call-outs, FAQ, bronnenblok en relevante vervolgroutes.
- Iedere owner heeft minimaal twee lokale WebP-assets; de hub en pensioenowner hebben er drie.
- Interacties zijn doelgericht: reisduurkeuze, TDAC-venster/checklist, DTV-route, pensioenroute, Tourist Visa-route, verlengingsroute, studieroute, LTR-kwalificatie en Privilege-tiercalculator.
- De onderste paginahelften bevatten inhoudelijke routekeuzes, waarschuwingen, FAQ, bronnen en interne doorstroom; ze zijn niet gereduceerd tot generieke kaartgrids.
- De TDAC-owner bevat nu natuurlijke inline links naar de brede visumowner en de toeristenvisumowner, direct naast de uitleg dat TDAC geen verblijfsrecht geeft.
- Alle visumcomponenten gebruiken de ene globale `<main>`-landmark uit de layout; acht dubbele/nested `<main>`-elementen zijn verwijderd.

## SEO, schema en affiliates

- Per route: één H1, self-canonical, `en`, `nl` en `x-default` hreflang.
- Per route: geldige Organization-, WebPage-, BreadcrumbList- en FAQPage-JSON-LD.
- Alle WebPage-schema’s hebben een expliciete canonical URL, `nl-NL` en `dateModified: 2026-07-26`.
- FAQ’s komen uit vastgelegde Nederlandse PAA/SERP-research en officiële FAQ- of categoriebronnen; niet iedere informatieve vraag wordt als PAA voorgesteld.
- Affiliateverwijzingen staan pas na de visumbeslissing, bevatten zichtbare disclosure en `noopener noreferrer nofollow sponsored`.
- Geen betaalde visumdienst wordt als noodzakelijke aanvraagroute gepresenteerd. Officiële overheidslinks zijn de primaire acties.
- Amazon OneLink is bewust niet in dit juridische/praktische cluster geforceerd; er is geen noodzakelijk fysiek product dat de visumkeuze verbetert.

## Actuele feitelijke beslissingen

- Huidige status voor Nederlandse paspoorthouders: maximaal 60 dagen visumvrij volgens NederlandWereldwijd en de Haagse Thaise ambassade bij de controle van 26 juli 2026.
- De goedgekeurde 30-dagenwijziging staat als aangekondigd, niet als ingegaan; de officiële Thaise bron koppelt werking aan Royal Gazette-publicatie plus vijftien dagen.
- TDAC: gratis, binnen drie dagen inclusief aankomstdag, voor iedere niet-Thaise reiziger die immigratie passeert en opnieuw per binnenkomst.
- Haagse categorieën, verblijfsduur, visumgeldigheid en tarieven zijn van elkaar gescheiden.
- Verlengingen blijven individuele Immigration-beslissingen; geen duur of toelating wordt gegarandeerd.
- LTR- en Thailand Privilege-tijdlijnen, prijzen en rechten worden niet als permanent verblijf, algemeen werkrecht of automatisch belastingvoordeel voorgesteld.

## Verificatiebewijs

- `npm run seo:verify:nl-visas`: 9/9 groen.
- Verifier controleert per owner HTTP, locale, title en description, één H1/main, canonical, drie hreflangs, vier schema’s, schema-URL/datum/taal, FAQ-dekking, affiliate-rel/disclosure, minimaal twee siblinglinks, officiële brondomeinen, assets en alt-attributen.
- Browser-QA hub op 1440 × 1000: één H1/main, 11 contentsecties, vier geldige schema’s, geen kapotte beelden en geen globale overflow.
- Browser-QA hub op 390 × 844: één H1/main, geen kapotte beelden en geen globale overflow; hero, CTA’s, vaste mobiele zoekbalk en bottom navigation correct.
- Mobiele onderste helft van de hub gecontroleerd bij de TDAC- en affiliatestroom; content en navigatie blijven leesbaar boven de bottom navigation.
- TDAC op 390 × 844: inline visumlinks, formulierflow, checklist, één H1/main, geen kapotte beelden en geen globale overflow. Checklistinteractie ging van 0/6 naar 1/6 met correcte pressed-state.
- Thailand Privilege op 1440 × 1000: Diamond-selectie gaf 2.500.000 THB en circa 166.667 THB per basisjaar; schema, beelden en overflow groen.
- Thailand Privilege op 390 × 844: hero, beide CTA’s, vaste mobiele navigatie, één H1/main en overflow groen.
- De enige browserspecifieke waarschuwing was een Next.js LCP-suggestie voor de TDAC-formulierflow tijdens een QA-sessie die al naar dat lagere gedeelte was gescrold; geen runtime-error of kapot beeld.

## Acceptatie

- [x] Negen routes status `implemented` in ContentOps.
- [x] Officiële bronrefresh gedocumenteerd.
- [x] TypeScript en gerichte ESLint-run.
- [x] Visumfamilieverifier 9/9.
- [x] Sitebrede SEO-cannibalisatie 0 hard / 0 warnings.
- [x] Volledige NL-runtimeverificatie.
- [x] Affiliateverificatie.
- [x] Desktop- en mobiele browser-QA.
