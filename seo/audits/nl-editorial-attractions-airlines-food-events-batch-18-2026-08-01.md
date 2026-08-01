# NL editorial batch 18 — lifecycle- en QA-audit
Peildatum: 2026-08-01

| Route | Lifecycle | Index | Keyword-owner | Redirect |
|---|---|---:|---|---|
| `/nl/blog/space-time-cube-bangkok-immersive-metaverse-museum-2026/` | ready | ja | `Space & Time Cube Bangkok` | geen |
| `/nl/blog/tha-kha-floating-market-samut-songkhram-hidden-gem-2026/` | ready | ja | `Tha Kha Floating Market` | geen |
| `/nl/blog/thai-airways-fare-hike-10-15-percent-fuel-costs-2026/` | archived | nee | `archief Thai Airways tarieven maart 2026` | geen |
| `/nl/blog/thai-airways-summer-2026-new-routes-amsterdam-auckland-perth/` | ready | ja | `Thai Airways Amsterdam Bangkok 2026` | geen |
| `/nl/blog/thailand-airlines-jet-fuel-tax-cut-proposal-march-2026/` | archived | nee | `archief accijns vliegtuigbrandstof Thailand 2026` | geen |
| `/nl/blog/thailand-bib-gourmand-2026-new-restaurants-street-food/` | ready | ja | `Bib Gourmand Thailand 2026` | geen |
| `/nl/blog/thailand-domestic-tourism-push-tat-festival-2026/` | archived | nee | `archief Thailand Tourism Festival 2026` | geen |

## Redactionele correcties

- Zeven legacy-bodies zijn volledig herschreven in natuurlijk Nederlands.
- Ongegronde superlatieven en ‘hidden gem’-claims zijn uit Tha Kha verwijderd.
- Space & Time Cube bevat geen onbevestigde kamertelling, projectieclaim of statische ticketprijs meer.
- De airline-owner onderscheidt bevestigd, gepland en bestaand; de oude titel bepaalt de inhoud niet langer.
- De twee brandstofroutes onderscheiden bericht, voorstel en effectieve regel.
- De Bib Gourmand-owner gebruikt exact de officiële aantallen 137 en 13 en doet geen vaste prijsbelofte.
- Het TAT-festival is als verstreken evenement gemarkeerd.

## Technische invarianten

- Alle zeven profielroutes, slugs en clusters volgen exact het manifest.
- Vier indexeerbare profielen zijn `ready`; drie verstreken updates zijn `archived` met `seo.noindex: true`.
- Canonicals blijven zelfverwijzend naar de bestaande NL-routes.
- Eventdata staan alleen op de verstreken festivalroute; policy-status staat expliciet op `superseded`.
- Interne links zijn NL-geprefixt en verwijzen naar route-, bestemming- of contentowners.
- Geen affiliateblok of externe koop-CTA toegevoegd; daardoor zijn er geen nieuwe sponsored-relaties nodig.

## Visueel

Elke route heeft een afzonderlijk gegenereerde WebP-hero in `public/images/redesign/editorial/`. De beelden zijn 1440×810, kleiner dan 450 KB en hebben route-eigen compositie. De vier indexeerbare heroes hebben onderling verschillende bestanden en inhoud.

## QA

De definitieve commandoutput wordt bij de handoff aan root gemeld voor:

- profile/manifest loader;
- H1/canonical/robots/runtime;
- assetdimensies, limiet en unieke hashes;
- TypeScript;
- design- en affiliateverificatie;
- `git diff --check` op uitsluitend batch 18.
