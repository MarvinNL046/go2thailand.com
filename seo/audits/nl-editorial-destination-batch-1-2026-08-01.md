# NL editorial destination batch 1 — acceptatie-audit

Datum: 1 augustus 2026  
Routes: 6

## Uitkomst per route

| Route | Cluster | Layout | Bodyreview | Profiel | Affiliatefit |
|---|---|---|---|---|---|
| `/nl/blog/phuket-travel-guide-2026/` | destination-guides | destination-guide | afgerond | ready | Klook-activiteiten, contextueel |
| `/nl/blog/is-phuket-worth-visiting-2026-honest-guide/` | destination-guides | destination-guide | afgerond | ready | geen; zuivere keuze-intent |
| `/nl/blog/krabi-travel-guide/` | destination-guides | destination-guide | afgerond | ready | Klook-activiteiten, contextueel |
| `/nl/blog/phi-phi-islands-guide-beyond-tourist-crowds/` | destination-guides | destination-guide | afgerond | ready | 12Go-ferry, contextueel |
| `/nl/blog/doi-inthanon-national-park-thailand-highest-peak/` | attractions | evergreen-guide/plan | afgerond | ready | Klook-tour, contextueel |
| `/nl/blog/best-day-trips-from-bangkok/` | attractions | evergreen-guide/compare | afgerond | ready | Klook-dagtours, contextueel |

## Gedeelde kwaliteitscontrole

- alle frontmatters hebben `lastUpdated: 2026-08-01`;
- frontmatter en profiel gebruiken exact `/images/redesign/editorial/<slug>-hero.webp`;
- profielen valideren via `loadNlEditorialProfile` en matchen de manifestclusters;
- oude widgets en raw HTML zijn verwijderd;
- geen mojibake, verzonnen eerste persoon, vaste prijsblokken of superlatieve garanties;
- interne links gebruiken expliciete `/nl/`-routes;
- ownergrenzen staan in body en researchdossier;
- bronnen zijn primaire park-, overheid-, TAT- of luchthavenbronnen;
- affiliate-CTA's beloven geen vaste of laagste prijs en gebruiken een actuele-optieformulering.

## Runtime

Alle zes routes zijn op `http://localhost:3000/nl/blog/<slug>/` gecontroleerd:

- 6/6 HTTP 200;
- 6/6 exact één H1;
- 6/6 zelfrefererende Nederlandse canonical;
- 6/6 `BlogPosting`-schema;
- 6/6 route-eigen redesignhero in de HTML;
- 6/6 premium freshness-signatuur;
- 0 legacywidgets, iframes of `javascript:`-URLs in de gerenderde artikelbody;
- 10/10 unieke interne NL-linkdoelen geven HTTP 200.
