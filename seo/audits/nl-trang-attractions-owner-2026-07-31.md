# NL owneracceptatie — bezienswaardigheden in Trang

**Route:** `/nl/city/trang/attractions/`  
**Datum:** 31 juli 2026  
**Status:** geïmplementeerd en lokaal groen

## Research en afbakening

- Bestaand Nederlands DFS-cluster: 151 ruwe keywordrecords, 50 concurrentdomeinen, zeven SERP-captures, zeven bruikbare PAA en ranking-/backlinkchecks.
- Actuele zichtbare Google-NL SERP opnieuw gecontroleerd voor twee ownerqueries; twee relevante Trang-specifieke PAA-richtingen vastgelegd. Nha Trang-, Trang An- en generieke Thailand-ruis uitgesloten.
- Primaire TAT-, DMCR-, DNP- en NederlandWereldwijd-bronnen gebruikt.
- De owner scheidt Trang-stad, Kantang, vastelandkust en drie verschillende eilandrollen. Destination, food, hotels, transport en eilandowners behouden hun eigen verdieping.
- Geen nieuwe DFS-call nodig omdat de bestaande lokale dataset de owner aantoonbaar dekt.

## Inhoud en design

- Premium gedeeld attractietemplate met Kantang Station als vastelandhero.
- Zeven keuzes: Trang-stadslaag, Kantang, Thung Khai, Pak Meng/Hat Chao Mai, Koh Mook/Emerald Cave, Koh Kradan en Koh Libong.
- Drie routedieptes en acht vraagantwoorden.
- Expliciete grenzen voor bewoners, markt, spoor, bos, pad, DNP, pier, getij, grot, zwemmen, wildlife, dugongs en zeegras.
- Zeven lokale beeldbronnen uit geografisch passende Trang-assets.
- Geen Amazon-productblok; Klook verschijnt pas na gratis routeadvies met disclosure.

## Runtime en responsive QA

- Gerichte audit: 1/1 route zonder fout of waarschuwing.
- Interne doelen: 19/19 HTTP 200.
- Lokale assets: 7/7 HTTP 200.
- p95 responstijd: 943 ms.
- Eén H1: `Wat te doen in Trang?`.
- Desktop 1440 × 1000: hero, navigatie, CTA-hiërarchie en intro visueel groen.
- Mobiel 390 × 844: sticky zoekpil, hero, CTA-stapeling, bottom-nav en FAQ leesbaar; geen horizontale overflow.
- Open FAQ-antwoord gebruikt donkere tekst en voldoende contrast.

## Gates

- TypeScript `--noEmit --incremental false`: groen.
- Gerichte runtime-audit bewijst route-, link- en assetintegriteit.
- Canonical, hreflang, breadcrumbs, ItemList, FAQPage en WebPage komen uit het gedeelde, eerder geverifieerde attractietemplate.
