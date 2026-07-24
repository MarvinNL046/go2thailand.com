# NL programmatic hoteldetails — indexatie-audit

**Vastgelegd:** 2026-07-24T09:43:56.222Z  
**Familie:** `/nl/hotel/*`  
**Sitemap-URLs:** 426  
**DFS-kosten:** rankings 0.01368, backlinks 0.039336

## Uitkomst

- Rankingzoekwoorden in Google Nederland/Nederlands: 14.
- Unieke rankende hotel-URLs: 4.
- URLs teruggegeven door de bulk-backlinkcheck: 426/426.
- URLs met ten minste één backlink of verwijzend domein: 0.
- Besluit: Niet familiebreed redirecten of verwijderen: behoud URLs met signalen en beoordeel de rest afzonderlijk.

## Organische signalen

| Zoekwoord | Positie | Volume | URL |
|---|---:|---:|---|
| mandarin oriental bangkok | 57 | 590 | https://go2-thailand.com/nl/hotel/mandarin-oriental-bangkok/ |
| mandarin oriental hotel bangkok | 59 | 590 | https://go2-thailand.com/nl/hotel/mandarin-oriental-bangkok/ |
| tonsai beach | 81 | 390 | https://go2-thailand.com/nl/hotel/tonsai-bay-resort/ |
| centara grand beach resort & villas krabi | 62 | 170 | https://go2-thailand.com/nl/hotel/centara-grand-beach-resort-villas-krabi/ |
| centara krabi | 53 | 140 | https://go2-thailand.com/nl/hotel/centara-grand-beach-resort-villas-krabi/ |
| grand centara beach resort krabi | 59 | 140 | https://go2-thailand.com/nl/hotel/centara-grand-beach-resort-villas-krabi/ |
| grand centara krabi | 52 | 140 | https://go2-thailand.com/nl/hotel/centara-grand-beach-resort-villas-krabi/ |
| koh chang oasis | 37 | 140 | https://go2-thailand.com/nl/hotel/oasis-koh-chang/ |
| oasis koh chang | 36 | 140 | https://go2-thailand.com/nl/hotel/oasis-koh-chang/ |
| oasis koh chang thailand | 38 | 140 | https://go2-thailand.com/nl/hotel/oasis-koh-chang/ |
| mandarin bangkok | 64 | 110 | https://go2-thailand.com/nl/hotel/mandarin-oriental-bangkok/ |
| mandarin hotel bangkok | 67 | 110 | https://go2-thailand.com/nl/hotel/mandarin-oriental-bangkok/ |
| oriental hotel bangkok | 61 | 110 | https://go2-thailand.com/nl/hotel/mandarin-oriental-bangkok/ |
| tonsai bay resort krabi | 43 | 110 | https://go2-thailand.com/nl/hotel/tonsai-bay-resort/ |

## URLs met backlinks

| URL | Backlinks | Verwijzende domeinen | Rank |
|---|---:|---:|---:|
| Geen externe links gevonden | — | — | — |

## Technische observatie

- Het huidige gedeelde template rendert Engelstalige bodycopy op de `/nl/`-routes.
- De canonical van die routes wijst naar de Engelse `/hotel/.../`-URL.
- Daardoor horen deze duplicaten niet als zelfstandige Nederlandse landingspagina’s in de NL-sitemap zolang er geen unieke, gecontroleerde Nederlandse inhoud is.

## Methodiek

- DataForSEO Labs Ranked Keywords, filter op `ranked_serp_element.serp_item.relative_url like /nl/hotel/%`.
- DataForSEO Backlinks Bulk Pages Summary voor alle actuele NL-hoteldetail-URLs uit `seo/inventory/routes.csv`.
- Officiële endpointdocumentatie: https://docs.dataforseo.com/v3/dataforseo_labs-google-ranked_keywords-live/ en https://docs.dataforseo.com/v3/backlinks-bulk_pages_summary-live/.
