# NL hotel-detailfamilie — behoud- en consolidatiebrief

**Datum:** 2026-07-24  
**Familie:** `/nl/hotel/*`  
**Besluit:** vier aantoonbaar rankende owners behouden en uniek lokaliseren; 422 Engelstalige duplicaten uit de NL-sitemap en NL-runtime verwijderen.

## Waarom deze aanpak

De DataForSEO-familieaudit vond binnen 426 Nederlandse hotel-detail-URLs slechts 14 rankende zoekwoorden, verdeeld over vier URLs. Geen van de 426 URLs had in de bulkcheck backlinks of verwijzende domeinen. De oude NL-routes gebruikten bovendien Engelstalige bodycopy en een Engelse canonical. Familiebreed blijven publiceren zou daarom indexatievolume toevoegen zonder zelfstandige Nederlandse waarde.

## Behouden owners

| Owner | Primair zoekwoord | Volume | Signaal | Nieuwe invalshoek |
|---|---|---:|---|---|
| Mandarin Oriental Bangkok | mandarin oriental bangkok | 590 | posities 57–67 op meerdere merkvarianten | Rivierlocatie als bewuste routekeuze; geen generieke luxe-review |
| Tonsai Bay Resort | tonsai bay resort krabi | 110 | positie 43; aanvullend Tonsai-signaal | Bootlogistiek, klimmerscontext en comfortcontrole |
| Centara Reserve Krabi | centara grand beach resort & villas krabi | 170 | meerdere merkvarianten | Correctie van de 2026-rebranding; oude reviews niet als actuele waarheid gebruiken |
| Oasis Koh Chang | oasis koh chang | 140 | positie 36; meerdere merkvarianten | Helling, Lonely Beach, ferryroute en eerlijke geluidscontext |

## Visuele en redactionele kwaliteitslat

- Iedere owner gebruikt een uniek 1920×1280 WebP-sfeerbeeld en noemt expliciet dat dit geen exacte accommodatie­foto is.
- De gedeelde premium detailtemplate bevat een redactionele hero, kort oordeel, feitelijke statistieken, `goed voor` versus `trade-offs`, een visuele routeplanning, boekingschecklist, PAA-FAQ, gerelateerde gidsen en primaire bronnen.
- Geen vaste prijs, gekochte rangschikking of reviewscore zonder controleerbare actuele bron.
- Trip.com-links krijgen `nofollow sponsored`, plaatsingssub-ID en een zichtbare affiliatevermelding.
- De pagina’s krijgen `Hotel`, `WebPage`, `BreadcrumbList` en `FAQPage` JSON-LD zonder verzonnen rating of prijsrange.

## Primaire bronnen

- Mandarin Oriental: officiële locatie- en kamerspagina’s.
- Tonsai Bay Resort: officiële hotel- en bereikbaarheidsinformatie.
- Centara: officiële Centara Reserve Krabi-factsheet uit 2026; de oude slug blijft behouden vanwege bestaande zoeksignalen.
- Oasis Koh Chang: officiële accommodatie-, bungalow- en servicepagina’s.

## Technische consolidatie

- Alleen de vier bovenstaande owners blijven in `sitemap-nl.xml`.
- Een niet-gelokaliseerde `/nl/hotel/<slug>/` retourneert 404; de corresponderende Engelse route blijft intact wanneer de brondata bestaat.
- De vier behouden owners hebben een Nederlandse canonical en worden in de centrale NL-keywordmap opgenomen.
- De Engelse hoteldetailfamilie wordt pas gewijzigd na zelfstandige Engelse keyword-, SERP-, concurrent- en PAA-research.

