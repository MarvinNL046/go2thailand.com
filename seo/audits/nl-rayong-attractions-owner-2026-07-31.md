# NL owneracceptatie — bezienswaardigheden in Rayong

**Route:** `/nl/city/rayong/attractions/`  
**Datum:** 31 juli 2026  
**Status:** geïmplementeerd en lokaal groen

## Research en ownergrens

- Bestaand Nederlands DFS-cluster: 90 ruwe keywordrecords, 50 concurrentdomeinen, SERP/PAA-captures en ranking-/backlinkchecks.
- Actuele zichtbare Google-NL SERP opnieuw gecontroleerd voor `Rayong bezienswaardigheden` en `wat te doen in Rayong stad`; vier relevante echte PAA-richtingen vastgelegd.
- Primaire TAT-, TAT Newsroom-, DNP- en NederlandWereldwijd-bronnen gebruikt.
- De owner scheidt Rayong-stad, westelijke vastelandkust, oostelijke wetlandroute en Koh Samet. Destination, food, hotels, transport en eiland behouden hun verdiepende intentie.
- Geen extra DFS-call nodig omdat de bestaande lokale dataset de intentie aantoonbaar dekt.

## Inhoud en design

- Premium gedeeld attractietemplate met eigen Yomjinda-hero.
- Zeven keuzes: Yomjinda/stadslaag, Saeng Chan/Pak Nam, Mae Ramphueng, Khao Laem Ya, bevestigde boomgaard, Botanical Garden/Thung Prong Thong en Koh Samet als zelfstandige reis.
- Drie routedieptes en acht PAA-antwoorden.
- Expliciete grenzen voor bewoners, religie, fotografie, strandstroming, DNP, oogst, getij, wildlife, boot en terugvervoer.
- Zeven lokale beeldbronnen uit zes geografisch passende Rayong-assets; geen generiek nieuw beeld nodig.
- Geen Amazon-productblok omdat geen fysiek product de geografische keuze oplost. Klook verschijnt pas na gratis routeadvies met disclosure.

## Runtime en responsive QA

- Gerichte audit: 1/1 route zonder fout of waarschuwing.
- Interne doelen: 19/19 HTTP 200.
- Lokale assets: 7/7 HTTP 200.
- p95 responstijd: 952 ms.
- Eén H1: `Wat te doen in Rayong?`.
- Desktop 1440 × 1000: hero, CTA-hiërarchie, navigatie en intro visueel groen.
- Mobiel 390 × 844: sticky zoekpil, hero, CTA-stapeling, bottom-nav en FAQ leesbaar; geen horizontale overflow.
- Open FAQ gebruikt donkere tekst met goed contrast.

## Gates

- TypeScript `--noEmit --incremental false`: groen.
- Gerichte runtime-audit bewijst route-, link- en assetintegriteit.
- Canonical, hreflang, breadcrumbs, ItemList, FAQPage en WebPage komen uit het gedeelde, eerder geverifieerde attractietemplate.
