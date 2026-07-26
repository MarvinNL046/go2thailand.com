# NL hotel-detailfamilie — afrondingsaudit 2026-07-26

## Scope en ownerbesluit

De vier bestaande Nederlandse hotel-detailowners blijven op hun exacte URL staan. Alle vier hebben verse organische rankingsignalen; migreren of consolideren zou onnodig risico toevoegen.

| Owner | Verse DFS-keywords | Backlinks | Besluit |
|---|---:|---:|---|
| `/nl/hotel/mandarin-oriental-bangkok/` | 5 | 0 | Exacte owner behouden |
| `/nl/hotel/tonsai-bay-resort/` | 2 | 0 | Exacte owner behouden |
| `/nl/hotel/centara-grand-beach-resort-villas-krabi/` | 4 | 0 | Rankende legacy-URL behouden en rebranding helder uitleggen |
| `/nl/hotel/oasis-koh-chang/` | 3 | 0 | Exacte owner behouden |

De verse rankings- en backlinkbatch kostte samen `0.145824`. De eerder uitgevoerde zelfstandige SERP/PAA-audit per hotel blijft de inhoudelijke vraaglaag bepalen; PAA-vragen zijn niet verzonnen.

## Technische en visuele afronding

- De gedeelde premium hoteltemplate levert één H1 en één main-landmark, een redactionele hero, korte besliskaarten, eerlijke trade-offs, routevisualisatie, boekingschecks, FAQ, gerelateerde gidsen, bronverantwoording en feedback.
- De foutieve dubbele main-landmark in de detailtemplate is verwijderd.
- `dateModified` staat voor alle vier owners op `2026-07-26`.
- Oasis Koh Chang verwijst in zichtbare navigatie, inline route-CTA en breadcrumbschema natuurlijk naar `/nl/islands/koh-chang/` in plaats van naar Trat als bestemming.
- Elke pagina gebruikt unieke, lokaal aanwezige beelden met alt-tekst en behoudt de ton-sur-ton jade/saffraan vormentaal van het redesign.
- Metadata, self-canonical, `nl`, `en` en `x-default` hreflang en Organization-, FAQPage-, BreadcrumbList-, Hotel- en WebPage-schema zijn gecontroleerd.

## Interne links en commercie

De detailowners linken beschrijvend naar hun bestemming, hoteloverzicht en relevante vervolgcontent. Alle gerenderde interne NL-links zijn live gecontroleerd en geven geen 4xx-status.

De commerciële intentie blijft scherp: uitgangen gaan contextueel naar Trip.com, dragen `nofollow noopener noreferrer sponsored` en hebben zichtbare affiliatevermelding. Amazon-producten zijn bewust niet toegevoegd aan deze hotelboekingspagina’s; dat zou de zoek- en beslisintentie verwateren. Amazon OneLink blijft bestemd voor pagina’s waar een concreet reisproduct de lezer werkelijk helpt.

## Verificatie

`npm run seo:verify:nl-hotel-details` is groen voor 4/4 owners en controleert onder meer DFS/PAA-bewijs, rankingbehoud, contentstatus, metadata, landmarkstructuur, schema, affiliate-attributen, bronnen, beelden, beschrijvende clusterlinks en alle gerenderde interne links.

Brede regressiegates zijn eveneens groen: TypeScript, gerichte ESLint zonder fouten, 106/106 NL runtime-owners, 0 cannibalisatiebotsingen, affiliatecontrole en design-systemcontrole. De ContentOps-stand na deze familie is 94 `implemented` en 12 `implementing`.

Browser-QA is uitgevoerd op Mandarin Oriental Bangkok bij 1280×720 en Oasis Koh Chang bij een echte 390×844 device-emulatie. Beide hebben één H1/main, geen document-overflow, geen kapotte beelden of consolefouten. De mobiele sticky zoekbalk en bottomnavigation blijven vrij; de Oasis-hero, breadcrumbs, CTA’s en een geopende FAQ blijven volledig leesbaar.

De Engelse paginafamilie is in deze NL-fase inhoudelijk ongemoeid gelaten.
