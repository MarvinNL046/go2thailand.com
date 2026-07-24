# Acceptance-audit — Nederlandse hotel-detailfamilie

**Datum:** 2026-07-24  
**Status:** vier behouden owners groen; 422 niet-gelokaliseerde duplicaten uit de NL-sitemap en runtime verwijderd.

## Geaccepteerde owner-routes

- `/nl/hotel/mandarin-oriental-bangkok/`
- `/nl/hotel/tonsai-bay-resort/`
- `/nl/hotel/centara-grand-beach-resort-villas-krabi/`
- `/nl/hotel/oasis-koh-chang/`

## Research en content

- DataForSEO Ranked Keywords: 14 zoekwoorden op vier unieke URLs; volumes 590, 110, 170 en 140 voor de gekozen merkowners.
- DataForSEO Backlinks Bulk Pages Summary: 426/426 gecontroleerd; nul URLs met backlinks of verwijzende domeinen.
- Voor iedere owner is een afzonderlijke Nederlandse live SERP en echte PAA-set opgeslagen.
- Feiten zijn gecontroleerd via primaire hotelbronnen; Centara bevat expliciet de nieuwe naam `Centara Reserve Krabi` en gebruikt geen verouderde reviewclaims als actuele werkelijkheid.

## Design en assets

- Nieuwe herbruikbare `HotelDetailGuideTemplate` met premium jade/crème/saffraan-design, ton-sur-ton vlakken, editoriale typografie, visuele route en eerlijke keuzevelden.
- Vier unieke geoptimaliseerde WebP-hero’s:
  - `hotel-mandarin-oriental-bangkok-hero.webp`
  - `hotel-tonsai-bay-resort-hero.webp`
  - `hotel-centara-reserve-krabi-hero.webp`
  - `hotel-oasis-koh-chang-hero.webp`
- De captions voorkomen dat de AI-sfeerbeelden als exacte hotelfoto worden geïnterpreteerd.

## Browser-QA

- Desktop 1440×1000 gecontroleerd op `/nl/hotel/mandarin-oriental-bangkok/`: volledige premium hero, navigatie en inhoud zichtbaar zonder horizontale overflow.
- Mobiel 390×844 gecontroleerd op alle vier routes: documentbreedte 375 bij een layoutviewport van 390, nul mislukte afbeeldingen en nul afbeeldingen zonder alt-attribuut.
- Alle vier pagina’s hebben exact één H1, de juiste Nederlandse canonical en drie zichtbare `sponsored` affiliatelinks.
- Niet-gelokaliseerde Nederlandse hotel-detailroutes retourneren 404; de bestaande Engelse hotelroute blijft renderen.

## Sitemap en indexatie

- Gegenereerde sitemap bevat 4 Nederlandse hotel-detailowners en 426 Engelse hotel-detailroutes.
- Totale inventaris na consolidatie: 3156 URLs; 1840 EN en 1316 NL.
- Canonical en hreflang worden route-aware door de globale SEO-laag en de opnieuw gegenereerde unpaired-route-inventaris.

## Nog uit te voeren gates

- Volledige design-, SEO-, affiliate- en NL-runtimeverificatie na opname van de vier owners in `seo/keywords-nl.csv`.

