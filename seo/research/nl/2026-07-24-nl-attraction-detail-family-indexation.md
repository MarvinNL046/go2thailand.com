# NL programmatic attraction-details — indexatie-audit

**Vastgelegd:** 2026-07-24T10:27:41.210Z  
**Familie:** `/nl/city/*/attractions/*`  
**Sitemap-URLs:** 272  
**DFS-kosten:** rankings 0.01248, backlinks 0.081792

## Uitkomst

- Rankingzoekwoorden in Google Nederland/Nederlands: 4.
- Unieke rankende attraction-detail-URLs: 3.
- URLs teruggegeven door de bulk-backlinkcheck: 272/272.
- URLs met ten minste één backlink of verwijzend domein: 0.
- Besluit: Behoud URLs met aantoonbare signalen en onderzoek hun zoekintentie afzonderlijk; verwijder de overige Engelstalige duplicaten uit de Nederlandse index tot echte NL-content beschikbaar is.

## Organische signalen

| Zoekwoord | Positie | Volume | URL |
|---|---:|---:|---|
| ko samet | 100 | 590 | https://go2-thailand.com/nl/city/rayong/attractions/koh-samet/ |
| koh samui wat plai laem | 31 | 390 | https://go2-thailand.com/nl/city/koh-samui/attractions/wat-plai-laem/ |
| chiang rai blue temple | 76 | 210 | https://go2-thailand.com/nl/city/chiang-rai/attractions/blue-temple/ |
| samet | 89 | 170 | https://go2-thailand.com/nl/city/rayong/attractions/koh-samet/ |

## URLs met backlinks

| URL | Backlinks | Verwijzende domeinen | Rank |
|---|---:|---:|---:|
| Geen externe links gevonden | — | — | — |

## Technische observatie

- Het template vertaalt navigatie en tussenkoppen, maar rendert Engelse kerncopy uit de enhanced attraction-data op de `/nl/`-routes.
- Structured data gebruikt Engelse namen, omschrijvingen en een Engelse URL, terwijl de globale canonical naar de Nederlandse route wijst.
- Daardoor zijn deze routes geen zelfstandige Nederlandse detailpagina’s en veroorzaken ze taal- en kwaliteitsinconsistentie.

## Methodiek

- DataForSEO Labs Ranked Keywords met een routefilter op de Nederlandse attraction-detailfamilie.
- DataForSEO Backlinks Bulk Pages Summary voor alle actuele NL attraction-detail-URLs uit `seo/inventory/routes.csv`.
- Alleen URLs die exact het patroon `/nl/city/<stad>/attractions/<attractie>/` volgen zijn als detailranking meegenomen.
