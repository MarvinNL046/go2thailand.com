# NL owneracceptatie — bezienswaardigheden in Chumphon

**Route:** `/nl/city/chumphon/attractions/`  
**Datum:** 31 juli 2026  
**Status:** geïmplementeerd en lokaal groen

## Research en afbakening

- Bestaand Nederlands DFS-cluster: 18 directe records, 50 concurrentdomeinen, live SERP, vijf echte PAA, vier concurrentparses en ranking-/backlinkchecks.
- Actuele zichtbare Google-NL SERP opnieuw gecontroleerd voor twee ownerqueries; zes relevante Chumphon-PAA-richtingen vastgelegd en geografische excursieruis uitgesloten.
- Primaire TAT-, DNP-, TMD-, operator- en NederlandWereldwijd-bronnen gebruikt.
- De owner scheidt stad, strandbasis, havenmonding, shrine, marien park, vertrekpier en Koh Tao. Destination, food, hotels, transport en eilandowner behouden hun verdieping.
- Geen nieuwe DFS-call nodig omdat de lokale dataset de owner aantoonbaar dekt.

## Inhoud en design

- Premium gedeeld attractietemplate met plaatsgebonden vastelandkusthero.
- Zeven keuzes: stad/markt, Thung Wua Laen, Khao Matsee/Pak Nam, Sai Ree/Prince Shrine, Mu Ko Chumphon, Ao Thung Makham en Koh Tao als zelfstandige reis.
- Drie routedieptes en acht vraagantwoorden.
- Expliciete grenzen voor markt, strand, stroming, herdenking, haven, DNP, pier, koraal, wildlife, reddingsmiddel en operator.
- Zeven lokale beeldbronnen; aanvankelijke verkeerde Koh Tao-spelling door de audit gevonden, gecorrigeerd en opnieuw groen geverifieerd.
- Geen Amazon-productblok; Klook verschijnt pas na gratis routeadvies met disclosure.

## Runtime en responsive QA

- Gerichte heraudit: 1/1 route zonder fout of waarschuwing.
- Interne doelen: 20/20 HTTP 200.
- Lokale assets: 7/7 HTTP 200.
- p95 responstijd: 885 ms.
- Eén H1: `Wat te doen in Chumphon?`.
- Desktop 1440 × 1000: hero, navigatie, CTA-hiërarchie en intro visueel groen.
- Mobiel 390 × 844: sticky zoekpil, hero, CTA-stapeling, bottom-nav en FAQ leesbaar; geen horizontale overflow.
- Open FAQ gebruikt donkere tekst en voldoende contrast.

## Gates

- TypeScript `--noEmit --incremental false`: groen.
- Gerichte runtime-audit bewijst route-, link- en assetintegriteit.
- Canonical, hreflang, breadcrumbs, ItemList, FAQPage en WebPage komen uit het gedeelde, eerder geverifieerde attractietemplate.
