# Surat Thani attractions owner audit — NL

**Route:** `/nl/city/surat-thani/attractions/`  
**Datum:** 31 juli 2026

## Owner en intent

- Exacte owner voor `Surat Thani bezienswaardigheden` en `wat te doen in Surat Thani`.
- Scheidt de stad en het bereikbare vasteland van Khao Sok, Cheow Lan, Donsak en de Golfeilanden.
- Verwerkt vier zichtbare Nederlandse Google-PAA-vragen, gerelateerde zoekopdrachten, lokale DFS-clusterdata en primaire bronnen.

## Content en design

- Herbruikbaar `AttractionsGuideTemplate` met zeven inhoudelijk verschillende keuzes.
- Oude stad, City Pillar, Tapee en Ko Lamphu, Shrine Market, Bang Bai Mai, Khao Tha Phet en Chaiya/Phum Riang vormen een geloofwaardige vastelandselectie.
- Drie routedieptes plus terminal-, boot-, wildlife-, water-, markt-, tempel- en veiligheidsgrenzen.
- Geen eiland, nationaal park of pier kunstmatig als stadsattractie opgenomen.
- Klook pas na gratis routeadvies; geen geforceerd Amazonproduct.

## Verificatie

- Gerichte runtime-audit: **1/1 route**, **19/19 interne doelen** en **10/10 lokale assets** zonder harde fouten of waarschuwingen; p95 **1026 ms**.
- Desktop-QA: premium rivierstadhero, navigatie, teksthiërarchie, CTA-disclosure en uitsnede zijn intact.
- Mobiele QA op `390 × 844`: zoekpil, hero, contrast, CTA’s en bottomnavigatie passen zonder zichtbare horizontale overflow.
- De bestaande Engelse en Nederlandse hoofdpagina’s en de Engelse attractiepagina laden met hun eigen oorspronkelijke titels; de NL-owner lekt niet naar andere routes.
- Affiliatekeuze blijft contextueel: één Klook-uitstap na gratis keuzeadvies, correcte disclosure en bewust geen geforceerd Amazonproduct.
