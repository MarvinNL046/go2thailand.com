# NL owneracceptatie — bezienswaardigheden in Trat

**Route:** `/nl/city/trat/attractions/`  
**Datum:** 31 juli 2026  
**Status:** geïmplementeerd en lokaal groen

## Research en afbakening

- Bestaand Nederlands DFS-cluster: 86 ruwe keywordrecords, 50 concurrentdomeinen, zeven SERP-captures en zeven bruikbare PAA-richtingen.
- Actuele zichtbare Google-NL SERP hercontroleerd voor drie zoekopdrachten; vijf relevante PAA-richtingen vastgelegd.
- Primaire TAT-, TAT Newsroom- en actuele NederlandWereldwijd-bronnen gebruikt.
- De owner scheidt Trat-stad, vastelandcommunities, kust en eilanden. Food, brede bestemming, hotels, vervoer en eilanden behouden hun eigen zoekintentie.
- Geen nieuwe DFS-call nodig: de lokale dataset dekte de owner al; de zichtbare SERP en primaire bronnen zijn actueel aangevuld.

## Inhoud en design

- Premium gedeeld attractietemplate met plaatsgebonden kanaalstad-hero.
- Zeven keuzes: museum/oude wijk, tempellaag, markt/food, Ban Nam Chiao, Ban Tha Ranae, Laem Ngop en een afzonderlijke eilandbeslissing.
- Drie routedieptes en acht PAA-antwoorden.
- Expliciete grenzen voor bewoners, religie, communitytoerisme, fotografie, marktuitvoering, getij, weer, pierkeuze, grensveiligheid en dierenwelzijn.
- Bestaande zeven Trat-assets zijn geografisch passend hergebruikt; geen nieuw beeld nodig om deze owner uniek en geloofwaardig te maken.
- Geen Amazon-productblok: een fysiek product lost de geografische hoofdkeuze niet op. Klook verschijnt pas na het gratis routeadvies met affiliate-disclosure.

## Runtime en responsive QA

- Gerichte audit: 1/1 route zonder fout of waarschuwing.
- Interne doelen: 20/20 HTTP 200.
- Lokale assets: 7/7 HTTP 200.
- p95 responstijd: 890 ms.
- Eén H1: `Wat te doen in Trat?`.
- Desktop op 1440 × 1000 gecontroleerd: hero, navigatie, intro en CTA-hiërarchie zijn visueel groen.
- Mobiel op 390 × 844 gecontroleerd: sticky zoekpil, hero, CTA-stapeling, bottom-nav en FAQ zijn leesbaar; geen horizontale overflow.
- Open FAQ-antwoord gebruikt donkere tekst en voldoende contrast.

## Technische gates

- TypeScript `--noEmit --incremental false`: groen.
- Canonical, hreflang, breadcrumbs, ItemList, FAQPage en WebPage komen uit het eerder geverifieerde gedeelde attractietemplate.
- De gerichte runtime-audit bewijst route-, link- en assetintegriteit voor deze owner.
