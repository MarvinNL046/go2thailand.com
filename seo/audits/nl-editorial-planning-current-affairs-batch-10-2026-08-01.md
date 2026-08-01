# Audit — NL editorial planning/current-affairs batch 10

- Datum: 2026-08-01
- Scope: exact zeven toegewezen routes
- Centrale family/keywords/ledger/package/registry: niet gewijzigd

## Acceptatie-overzicht

- Ready/index: Bangkok wonen, droogte/water 2026, tourism outlook 2026.
- Archived/noindex: Chiang Mai verblijven, Thailand 10 dagen, brandstofverstoring maart, airline fuel surge.
- Permanente redirects aanbevolen:
  - `where-to-stay-chiang-mai-neighborhoods` → `/nl/best-hotels/chiang-mai/`
  - `thailand-10-day-itinerary` → `/nl/itineraries/`
- De twee nieuwsarchives blijven minimaal informatief zolang geen centrale redirectowner is gekozen.

## Contentkwaliteit

- Oude vaste prijzen, bezoekersclaims zonder peildatum en crisisachtige toekomsttaal verwijderd.
- Actuele cijfers staan alleen in de TAT-owner met bronmaand en prognosestatus.
- Droogteowner onderscheidt landelijke gemiddelden van lokale waarschuwingen.
- Bangkok-woonowner geeft geen juridisch, visum- of vast huurprijsadvies.
- Natuurlijk Nederlands, geen verzonnen first-personervaring of PAA/DFS-claim.

## Design en assets

- Zeven typed profiles en zeven route-eigen 1376×768 WebP-heroes.
- Passende layouts: evergreen compare, hotel/archive, planning/archive en news update.
- Beelden bevatten geen ingebakken tekst, logo of prijs.

## Affiliates

Geen affiliateblokken: geen van de drie actieve owners heeft een natuurlijke directe boektaak. Dit voorkomt geforceerde monetisatie op nieuws en wooncontractcontext.

## QA-checklist

- profile loader voor zeven slugs;
- frontmatter/profile-afbeelding exact gelijk;
- alle routes HTTP 200, één H1 en self-canonical;
- vier archives `noindex,follow`;
- doelowners en interne links HTTP 200;
- assets binnen dimensie- en bestandsgroottegrenzen;
- geen mojibake of achterhaalde vaste prijsclaims;
- TypeScript zonder emit.

Na centrale integratie mogen alleen de drie ready/index-routes een nieuwe keywordowner claimen.
