# Lampang attractions owner audit — NL

**Route:** `/nl/city/lampang/attractions/`  
**Datum:** 31 juli 2026

## Owner en intent

- Exacte owner voor `Lampang bezienswaardigheden` en `wat te doen in Lampang`.
- Scheidt Lampang-stad, Ko Kha, Chae Hom en Chae Son van elkaar.
- Verwerkt zelfstandig DFS-cluster, actuele zichtbare Nederlandse Google-SERP en vier echte PAA-vragen.

## Content en design

- Zeven keuzes rond rivierstad, Tha Ma O, keramiek, Ko Kha, bergtempel, nationaal park en bewuste vervoerskeuze.
- Drie routedieptes plus markt-, tempel-, weg-, klim-, weer-, park-, koets- en dierenwelzijnsgrenzen.
- Olifantenritten en shows niet aanbevolen; koets alleen na expliciete welzijnscheck.
- Klook pas na gratis routeadvies; geen geforceerd Amazonproduct.

## Verificatie

- Gerichte runtime-audit: **1/1 route**, **19/19 interne doelen** en **8/8 lokale assets** zonder harde fouten of waarschuwingen; p95 **1106 ms**.
- Desktop-QA: plaatsgebonden Wang River-hero, navigatie, teksthiërarchie, CTA-disclosure en uitsnede zijn intact.
- Mobiele QA op `390 × 844`: zoekpil, hero, contrast, CTA’s en bottomnavigatie passen zonder zichtbare horizontale overflow.
- Canonical, hreflang, JSON-LD, lokale assets, natuurlijke clusterlinks en affiliate-disclosure zijn door de runtime-audit gedekt.
