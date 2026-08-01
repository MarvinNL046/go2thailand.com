# Udon Thani attractions owner audit — NL

**Route:** `/nl/city/udon-thani/attractions/`  
**Datum:** 31 juli 2026

## Owner en intent

- Exacte owner voor `Udon Thani bezienswaardigheden` en `wat te doen in Udon Thani`.
- Scheidt stad, Ban Chiang, Kumphawapi en Phu Phrabat.
- Verwerkt zelfstandig DFS-cluster, bestaande SERP/PAA-data en vier actuele zichtbare Nederlandse PAA-vragen.

## Content en design

- Zeven keuzes rond park, museum, stadsritueel, tempel, avondlaag en drie verschillende provincierichtingen.
- Drie routedieptes plus tempel-, markt-, museum-, boot-, bloei-, trail-, UNESCO- en erfgoedgrenzen.
- Geen lotusbloeigarantie of kunstmatige combinatie van Ban Chiang en Phu Phrabat.
- Klook pas na gratis routeadvies; geen geforceerd Amazonproduct.

## Verificatie

- Gerichte runtime-audit: **1/1 route**, **19/19 interne doelen** en **8/8 lokale assets** zonder harde fouten of waarschuwingen; p95 **870 ms**.
- Desktop-QA: plaatsgebonden lotus- en provinciale hero, navigatie, teksthiërarchie en CTA-disclosure zijn intact.
- Mobiele QA op `390 × 844`: lange plaatsnaam, regelval, contrast, CTA’s en bottomnavigatie passen zonder zichtbare horizontale overflow.
- Canonical, hreflang, JSON-LD, assets, interne links en affiliate-disclosure zijn door de runtime-audit gedekt.
