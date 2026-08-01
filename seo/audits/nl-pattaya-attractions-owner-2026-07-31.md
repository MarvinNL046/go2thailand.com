# Pattaya attractions owner audit — NL

**Route:** `/nl/city/pattaya/attractions/`
**Datum:** 31 juli 2026

## Owner en intent

- Exacte owner voor `Pattaya bezienswaardigheden` en `wat te doen in Pattaya`.
- Scheidt attractieselectie van brede destination-, food-, hotel-, Koh Larn-detail- en nightlife-intentie.
- Verwerkt vier zichtbare Nederlandse Google-PAA-vragen, gerelateerde zoekopdrachten, lokale DFS-clusterdata en primaire bronnen.

## Content en design

- Herbruikbaar `AttractionsGuideTemplate` met zeven inhoudelijk verschillende keuzes.
- Noord, centraal, Pratumnak, Jomtien, buitenstad en eiland voorkomen een onrealistische kustchecklist.
- Drie routedieptes plus zee-, pier-, verkeer-, tempel-, nightlife- en dierenwelzijnsgrenzen.
- Sanctuary of Truth correct als doorlopend houten museum- en bouwproject beschreven.
- Geen krokodillenfarm, dierenrit, show, jetski, vaste prijs, openingstijd, taxiquote, ferryfrequentie of zichtgarantie.
- Klook pas na gratis routeadvies; geen geforceerd Amazonproduct.

## Verificatie

- Gerichte runtime-audit: **1/1 route**, **19/19 interne doelen** en **11/11 lokale assets** zonder harde fouten of waarschuwingen; p95 **970 ms**.
- Desktop-QA op `1264 × 712`: premium hero, navigatie, leeshiërarchie, CTA-disclosure en uitsnede zijn intact.
- Mobiele QA op `390 × 844`: zoekpil, hero, tekstcontrast, CTA’s en bottomnavigatie passen zonder horizontale overflow; mobiele beelddekking is bewust lichter.
- Engelse taalpartner `/city/pattaya/attractions/` blijft bereikbaar met eigen legacytitel en content; de Nederlandse implementatie lekt niet naar EN.
- Affiliatekeuze blijft contextueel: één Klook-uitstap na gratis keuzeadvies, correcte disclosure en bewust geen geforceerd Amazonproduct.
