# Hua Hin attractions owner audit — NL

**Route:** `/nl/city/hua-hin/attractions/`
**Datum:** 31 juli 2026

## Owner en intent

- Exacte owner voor `Hua Hin bezienswaardigheden` en `wat te doen in Hua Hin`.
- Scheidt attractieselectie van brede destination-, food-, hotel- en weerintentie.
- Verwerkt vier zichtbare Nederlandse Google-PAA-vragen, gerelateerde zoekopdrachten, lokale DFS-clusterdata en primaire bronnen.

## Content en design

- Herbruikbaar `AttractionsGuideTemplate` met zeven inhoudelijk verschillende keuzes.
- Centrum, Nong Kae/Khao Takiab, noordelijk erfgoed en precies één natuurdag voorkomen een onrealistische omgevinglijst.
- Drie routedieptes plus spoor-, strand-, markt-, makaak-, trail-, wildlife- en veiligheidsgrenzen.
- Geen snorkelbelofte, diereninteractie, wildlifegarantie, vaste prijs, openingstijd, treintijd, marktdag of parktoegang.
- Klook pas na gratis routeadvies; geen geforceerd Amazonproduct.

## Visuele productie

- Unieke imagegen-hero toegevoegd als `public/images/redesign/hua-hin-attractions-railway-hero.webp`.
- WebP: **1536 × 1024**, circa **253 kB**.
- Desktopcompositie houdt architectuur rechts en negatieve ruimte links; mobiele dekking is bewust lichter voor leesbaarheid.
- Alttekst noemt het beeld expliciet een redactioneel sfeerbeeld en vermijdt een actuele terreinclaim.

## Verificatie

- Gerichte runtime-audit: **1/1 route**, **18/18 interne doelen** en **8/8 lokale assets** zonder harde fouten of waarschuwingen; p95 **882 ms**.
- Desktop-QA op `1264 × 712`: premium hero, navigatie, leeshiërarchie, CTA-disclosure en uitsnede zijn intact.
- Mobiele QA op `390 × 844`: zoekpil, hero, tekstcontrast, CTA’s en bottomnavigatie passen zonder horizontale overflow.
- Engelse taalpartner `/city/hua-hin/attractions/` blijft bereikbaar met eigen legacytitel en content; de Nederlandse implementatie lekt niet naar EN.
- Affiliatekeuze blijft contextueel: één Klook-uitstap na gratis keuzeadvies, correcte disclosure en bewust geen geforceerd Amazonproduct.
