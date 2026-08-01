# NL Nong Khai destination — acceptance audit

**Route:** `/nl/city/nong-khai/`
**Datum:** 25 juli 2026
**Template:** `DestinationGuideTemplate`
**Status:** groen na desktop-, mobiel- en bron-QA

## Onderzoek en ownerkeuze

- Vergelijkende DFS-run uitgevoerd voor alle zes nog openstaande NL-destinationowners.
- Nong Khai gekozen op 30 clusterrecords en 50 concurrentdomeinen; hoofdterm circa volume 70 en KD 0.
- Vier geslaagde live NL-SERP’s, zes letterlijke owner-PAA’s en zichtbare topconcurrenten onderzocht.
- City-, travel-guide- en where-to-stay-kandidaten: nul gevonden rankingkeywords en geen zichtbaar backlinksamenvattingssignaal.
- `/nl/guides/travel-guide/nong-khai/` consolideert daarom permanent naar de city-owner; `/guides/travel-guide/nong-khai/` blijft in de NL-fase 200.
- Brede ownerintentie is gescheiden van attracties, hotels, weer en actuele Laos-grensformaliteiten.

## Content en ontwerp

- Unieke title, meta description en één H1.
- 2.436 gerenderde woorden in `main`.
- Zones voor Mekong/Tha Sadet, Wat Pho Chai, Sala Kaew Ku en Friendship Bridge.
- Eigen beslismodules voor 2–3 nachten, stad versus buitenstop, route, eten, seizoen, vervoer en grensvoorbereiding.
- Acht nieuwe projectgebonden WebP-assets. Alle gegenereerde beelden zijn handmatig bekeken; één onjuiste kabelbrugvariant is afgekeurd en niet opgenomen.
- Desktophero, foodsectie, gerelateerde kaarten, praktische cards en mobiele FAQ visueel gecontroleerd.

## Browser-QA

- Desktop: geen horizontale overflow.
- Mobiel: 390 × 844, geen horizontale overflow, sticky zoekbalk en vaste bottomnavigation aanwezig.
- 17 gerenderde afbeeldingen, 11 unieke bronnen, nul gebroken lazy-loaded afbeeldingen en nul ontbrekende altteksten.
- Hero en merklogo hebben een image-preload; de hero-srcset verwijst naar `nong-khai-hero.webp`.
- Open FAQ: tekstkleur `rgb(41, 53, 49)`, 14 px font, 28 px line-height en zichtbaar op transparante lichte achtergrond.
- Geen paginagebonden console-error. Alleen reeds bekende Next-development-HMR-waarschuwingen uit eerdere routes waren aanwezig.

## SEO en techniek

- Canonical: `https://go2-thailand.com/nl/city/nong-khai/`.
- Hreflang: `nl`, `en` en `x-default` aanwezig.
- Zes JSON-LD-typen zichtbaar: Organization, TouristDestination, ItemList, FAQPage, BreadcrumbList en WebPage.
- Affiliate-uitgangen naar Trip.com, Klook en 12Go bevatten `noopener noreferrer nofollow sponsored` plus zichtbare disclosure.
- Alle unieke interne contentroutes gecontroleerd: 200.
- NL duplicate: 308; Engelse equivalent: 200.
- TypeScript en designsysteemcheck groen.
- NL runtimecheck 75/75, cannibalisatie 0/0 en Amazon affiliatecheck 13/13 groen.

## Bronnen

De owner gebruikt onafhankelijke primaire bronnen van Tourism Authority of Thailand, Royal Thai Government / Department of Highways, State Railway of Thailand, Department of Airports Thailand, Thai Meteorological Department en NederlandWereldwijd. Actuele grens-, weer- en vervoersinformatie wordt als controlemoment gepresenteerd en niet als onveranderlijke claim.
