# Mae Hong Son attractions owner audit — NL

**Route:** `/nl/city/mae-hong-son/attractions/`  
**Datum:** 31 juli 2026

## Owner en intent

- Exacte owner voor `Mae Hong Son bezienswaardigheden` en `wat te doen in Mae Hong Son`.
- Scheidt de compacte stad, de noordroute en Soppong/Tham Lod van de volledige Mae Hong Son Loop.
- Verwerkt drie lokale zichtbare Nederlandse Google-PAA-vragen, één uitgesloten Isaan-ruisvraag, gerelateerde zoekopdrachten, lokale DFS-clusterdata en primaire bronnen.

## Content en design

- Herbruikbaar `AttractionsGuideTemplate` met zeven inhoudelijk verschillende keuzes.
- Nong Chong Kham, meertempels, Doi Kong Mu, markt, Su Tong Pae, Ban Rak Thai, Pang Ung/Pha Sua en Tham Lod hebben een heldere geografische rol.
- Drie routedieptes plus weg-, daglicht-, rook-, regen-, grot-, wildlife-, tempel- en gemeenschapsgrenzen.
- Tham Lod wordt correct als Soppong/Loop-etappe gepresenteerd en niet als nabije stadswandeling.
- Klook pas na gratis routeadvies; geen geforceerd Amazonproduct.

## Verificatie

- Gerichte runtime-audit: **1/1 route**, **18/18 interne doelen** en **6/6 lokale assets** zonder harde fouten of waarschuwingen; p95 **685 ms**.
- Desktop-QA: plaatsgebonden meer- en tempelhero, navigatie, teksthiërarchie, CTA-disclosure en uitsnede zijn intact.
- Mobiele QA op `390 × 844`: zoekpil, hero, contrast, CTA’s en bottomnavigatie passen zonder zichtbare horizontale overflow.
- De implementatie gebruikt bestaande plaatsgebonden Mae Hong Son-assets en introduceert geen onnodige generieke kaart- of stocklaag.
- Affiliatekeuze blijft contextueel: één Klook-uitstap na gratis keuzeadvies, correcte disclosure en bewust geen geforceerd Amazonproduct.
