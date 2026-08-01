# NL Bangkok bestemmingspillar — implementatie-audit

**Route:** `/nl/city/bangkok/`  
**Datum:** 23 juli 2026  
**Template:** `DestinationGuideTemplate`

## Researchbewijs

- DFS-cluster: 353 keywords en 50 concurrentdomeinen
- Live SERP: `bangkok thailand` en `bangkok tips`
- Echte PAA: zes vragen voor `bangkok thailand`; geen PAA voor `bangkok tips`
- Topconcurrenten via DFS geparsed: Reisjunk, WeAreTravellers en VakantieDiscounter
- Bestaande ranking gecontroleerd en URL behouden: `bangkok`, positie 105, volume 33.100
- Backlinksamenvatting aangevraagd; DFS leverde geen samenvattende waarden
- Contentownership vastgelegd in `seo/research/nl/2026-07-23-bangkok-brief.md`

## Implementatie

- Datagedreven Nederlandse pillar geregistreerd onder `bangkok`
- Vijf stadszones met beste profiel en expliciete trade-off
- Vierdaagse route met rivier-, BTS- en MRT-logica
- Attractie-, hotel-, food-, weer- en vervoersdetails samengevat en doorgelinkt naar hun eigen contentowner
- Zes zichtbare PAA-antwoorden en overeenkomstig `FAQPage`-schema
- Klook-, Trip.com- en 12Go-vervolgstappen met unieke placement-subid, `nofollow sponsored` en zichtbare disclosure
- Vier nieuwe WebP-assets: hero, stadszones-banner, food en routeplanning

## Browser-QA

### Desktop — 1280 × 720

- één H1: `Bangkok Thailand`
- canonical: `https://go2-thailand.com/nl/city/bangkok/`
- hreflang: `nl`, `en`, `x-default`
- schema: `Organization`, `TouristDestination`, `ItemList`, `FAQPage`, `BreadcrumbList`, `WebPage`
- vijf affiliate-links met `noopener noreferrer nofollow sponsored`
- 18 van 18 beelden geladen, nul kapotte beelden
- horizontale overflow: 0 px
- visuele controle: hero, sidecard, zones en typografische hiërarchie groen

### Mobiel — 390 × 844

- één leesbare H1 en volledige hero-CTA's
- compacte zoekbalk en bottom-navigation aanwezig
- horizontale overflow: 0 px
- nul kapotte beelden
- foodsectie en lange zone-/FAQ-copy blijven leesbaar

### Regressie en links

- Engelse route `/city/bangkok/` blijft op het bestaande Engelstalige template
- Engelse canonical en `lang="en"` correct; nul overflow en kapotte beelden
- negen kernlinks gecontroleerd via lokale HTTP HEAD-responses; alle status 200

## Automatische gates

- `npx tsc --noEmit`: groen
- `npm run design:verify`: groen
- `npm run seo:verify`: groen, nul cannibalisatiebotsingen of waarschuwingen
- `npm run affiliate:verify`: groen, 13 gebruikte Amazon-slugs geregistreerd

## Conclusie

De Nederlandse Bangkok-hoofdpillar voldoet aan de template-acceptatie voor deze route. De volgende stap binnen het Bangkok-cluster is een afzonderlijke research- en implementatieronde voor de attractie-, hotel-, weer- en foodowners; de hoofdpillar neemt die zoekintenties niet over.

