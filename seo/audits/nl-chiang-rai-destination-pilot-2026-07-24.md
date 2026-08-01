# Acceptance-audit — Nederlandse Chiang Rai destination-owner

**Datum:** 24 juli 2026  
**Status:** premium owner, research en responsive QA groen.

## Definitieve owner-route

- `/nl/city/chiang-rai/`

## Research

- DFS: 191 keywordrecords, 50 competitor domains, 10 organische resultaten en 6 echte PAA-vragen.
- Primair volume 2.900; KD 0.
- Exacte owner had 0 rankingkeywords en 0 backlinks.
- Drie concurrenten volledig via DFS Content Parsing gelezen: Sawadee, WeAreTravellers en BackpackenInAzie.
- Blue Temple-intentie blijft bewust op `/nl/city/chiang-rai/attractions/blue-temple/`; de nieuwe pillar vat samen en linkt door.

## Design en assets

- Hergebruik van `DestinationGuideTemplate` met unieke Chiang Rai-data en semantische tourist-types.
- Vier visuele routezones scheiden centrum, zuid, noord en bergprovincie.
- Drie nieuwe geoptimaliseerde WebP-assets met de imagegen-skill:
  - `chiang-rai-destination-hero.webp`
  - `chiang-rai-mountain-route.webp`
  - `chiang-rai-food-coffee.webp`
- Bestaande specifieke beelden worden alleen bij hun eigen attractie of zone gebruikt.

## Browser-QA

- Desktop 1440×1000: hero, sidecard, CTA’s en section-nav visueel groen.
- Mountain-routebanner en eerste highlightgrid afzonderlijk gecontroleerd.
- Mobiel 390×844: hero, koppen, bodycopy en beide CTA’s leesbaar binnen sticky app-navigatie.
- Documentbreedte 375/375; geen horizontale overflow en 0 gebroken afbeeldingen.
- Exact één H1: `Chiang Rai Thailand`.
- Canonical naar Nederlandse owner; `en`, `nl` en `x-default` hreflang aanwezig.
- Structured data: Organization, TouristDestination, ItemList, FAQPage, BreadcrumbList en WebPage.
- Alle affiliate-CTA’s met `target="_blank"` dragen `noopener noreferrer nofollow sponsored`.

## Technische poorten

- Lokale route HTTP 200.
- TypeScript, design-, SEO-, affiliate- en runtimepoorten zijn groen; de runtimecontrole dekt 56/56 Nederlandse owner-routes.
- Engelse route blijft onaangeroerd tot de afzonderlijke EN-fase.
