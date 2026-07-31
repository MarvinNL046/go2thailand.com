# Hat Yai attractions owner audit — NL

**Route:** `/nl/city/hat-yai/attractions/`
**Datum:** 31 juli 2026

## Owner en intent

- Exacte owner voor `Hat Yai bezienswaardigheden` en `wat te doen in Hat Yai`.
- Scheidt attractieselectie van brede destination-, food-, hotel-, vervoer- en eilandketenintentie.
- Verwerkt drie lokale Nederlandse Google-PAA-vragen, één uitgesloten brede Thailand-ruisvraag, gerelateerde zoekopdrachten, lokale DFS-clusterdata en primaire bronnen.

## Content en design

- Herbruikbaar `AttractionsGuideTemplate` met zeven inhoudelijk verschillende keuzes.
- Centrum, markt, tempel, park, avondstad, Songkhla en natuur voorkomen een onrealistische top-tien.
- Drie routedieptes plus spoor-, marktstatus-, kabelbaan-, routeadvies-, trail-, overstromings- en sanctuarygrenzen.
- Songkhla correct als afzonderlijke stad en Ton Nga Chang als conditionele natuurdag beschreven.
- Geen vaste Khlong Hae- of kabelbaanstatus, prijs, campagne, universele goedkoopte, waterval- of veiligheidsclaim.
- Klook pas na gratis routeadvies; geen geforceerd Amazonproduct.

## Verificatie

- Gerichte runtime-audit: **1/1 route**, **18/18 interne doelen** en **11/11 lokale assets** zonder harde fouten of waarschuwingen; p95 **932 ms**.
- Desktop-QA op `1264 × 712`: premium hero, navigatie, leeshiërarchie, CTA-disclosure en uitsnede zijn intact.
- Mobiele QA op `390 × 844`: zoekpil, hero, tekstcontrast, CTA’s en bottomnavigatie passen zonder horizontale overflow.
- Engelse taalpartner `/city/hat-yai/attractions/` blijft bereikbaar met eigen legacytitel en content; de Nederlandse implementatie lekt niet naar EN.
- Affiliatekeuze blijft contextueel: één Klook-uitstap na gratis keuzeadvies, correcte disclosure en bewust geen geforceerd Amazonproduct.
