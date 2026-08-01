# Acceptance-audit — Nederlandse city top-10-consolidatie

**Datum:** 24 juli 2026  
**Status:** 66 duplicaatroutes permanent geconsolideerd; Engelse familie behouden.

## Geconsolideerde routepatronen

- `/nl/city/<stad>/top-10-attractions/` → `/nl/city/<stad>/attractions/`
- `/nl/city/<stad>/top-10-restaurants/` → `/nl/city/<stad>/food/`

Het gaat om 33 steden met twee duplicaatroutes per stad. De Engelse equivalenten blijven HTTP 200 en staan nog in de Engelse sitemap tot hun eigen onderzoeksfase.

## Onderbouwing

- De familiebrede DataForSEO-audit onderzocht 236 Nederlandse stads-URLs over 34 steden.
- Uitkomst: 49 rankingkeywords op 9 URLs en nul URLs met backlinks.
- De twee top-10-signaalroutes zijn inhoudelijk gelijkwaardig overgezet:
  - `/nl/city/bangkok/top-10-restaurants/` had 6 rankingkeywords, waaronder `restaurants bangkok` en `bangkok eten`, en leidt nu naar de food-owner.
  - `/nl/city/hua-hin/top-10-attractions/` had 2 rankingkeywords rond `wat te doen in hua hin` en leidt nu naar de attractions-owner.
- De overige 64 top-10-routes hadden in de exacte DFS-familieaudit geen rankings of backlinks.
- Een vaste “top 10” is bovendien sneller verouderd en minder bruikbaar dan een beslisgids met gebied, route, trade-offs en actuele bronnen.

## Technische implementatie

- Beide dynamische Next.js-routes geven uitsluitend voor `locale === 'nl'` een permanente redirect terug.
- Targets zijn semantisch één-op-één en behouden de stad in het pad.
- Nederlandse top-10-attractie- en restaurantroutes zijn uit de sitemapfilter verwijderd.
- Nieuwe sitemapoutput: 1.874 EN + 1.014 NL = 2.888 URLs.
- Nieuwe canonical inventaris: 1.840 EN + 980 NL = 2.820 routes.

## Runtime-QA

- Bangkok restaurantduplicate: HTTP 308 naar `/nl/city/bangkok/food/`.
- Hua Hin attractieduplicate: HTTP 308 naar `/nl/city/hua-hin/attractions/`.
- Engelse Bangkok-restaurant- en Hua Hin-attractieroutes blijven HTTP 200.
- Redirecttargets blijven indexeerbare HTTP 200-pagina’s.

## Vervolg

- Food- en attractiontargets worden op basis van volume en bestaande rankings verder als herbruikbare premium families uitgerold.
- De consolidatie voorkomt dat die nieuwe owners later met een oude top-10-variant moeten concurreren.
