# Audit — NL editorial sustainability, food, dive & trends batch 19

**Datum:** 1 augustus 2026
**Scope:** zeven exact toegewezen routes.
**Centrale bestanden:** niet gewijzigd; root verwerkt accepted routes, keywords, ledger, redirects en sitemap.

## Lifecycle-uitkomst

### Ready / index

1. `/nl/blog/thailand-good-travel-certification-41-sustainable-destinations-2026/`
   - Owner: `Thailand Good Travel keurmerk`
   - Correctie: “41 gecertificeerde bestemmingen” verwijderd en expliciet weerlegd.
   - Evergreen verificatie-intent; exacte canonical; FAQ en bronblok.

2. `/nl/blog/thailand-jay-food-vegan-street-guide-yellow-flag-2026/`
   - Owner: `jay food Thailand`
   - Afbakening: het gele เจ-symbool, verschil met vegetarisch, bestelzinnen en allergenen.
   - Geen garantie dat jay allergeenvrij of een specifieke kraam veilig is.

3. `/nl/blog/thailand-liveaboard-diving-guide-similan-surin-2026/`
   - Owner: `liveaboard duiken Thailand`
   - Parkseizoen, ervaring, remote-boat safety en totaalprijscheck.
   - Geen vaste prijs, zichtwaarde of ontmoeting met wilde dieren beloofd.

4. `/nl/blog/thailand-quietcation-trend-tranquil-travel-2026/`
   - Owner: `quietcation Thailand`
   - Trend vertaald naar concrete route-, ligging- en seizoenskeuzes.
   - Geen bestemming als permanent stil of leeg gepresenteerd.

### Archived / noindex

5. `/nl/blog/thailand-low-season-tourism-stimulus-tax-breaks-2026/`
   - Tijdelijke binnenlandse Thaise fiscale beleidscontext.
   - Geen redirect: de weatherhub is nuttig maar niet equivalent aan de oude fiscale intentie.

6. `/nl/blog/thailand-silver-tourism-active-seniors-key-market-2026/`
   - Branchetrend zonder voldoende zelfstandige reizigerstaak.
   - Geen redirect: practical-info is breder en niet intentie-equivalent.

7. `/nl/blog/thailand-tourism-competition-vietnam-regional-rivals-2026/`
   - Dubbele keuze-intentie met bestaande geaccepteerde vergelijkingsowner.
   - Permanent redirectadvies: `/nl/blog/thailand-vs-vietnam-which-country-visit-2026/`.

## Visuele uitvoering

Elke route heeft een eigen lokaal gegenereerde hero:

- 1600 × 900 pixels;
- WebP;
- 73–188 KB;
- route-eigen compositie en alttekst;
- geen gedeeld bestand of identieke hash;
- geen commercieel logo of watermerk.

Art direction per owner: community/mangrove, jay-foodstall, Andaman-liveaboard, rustige noordelijke veranda, groen-seizoentrein, toegankelijk tempelpad en een neutrale Thailand–Vietnam-compositie.

## SEO en veiligheid

- Exact canonical path op alle zeven profielen.
- `noindex: true` en `editorialStatus: archived` op drie lifecycle-routes.
- Vier ready-profielen hebben één onderscheidend primary keyword.
- Bronclaims voorzien van peildatum 2026-08-01.
- Interne links gebruiken uitsluitend Nederlandse, inhoudelijk relevante routes.
- Geen geforceerde affiliateblokken; dus ook geen vaste prijsclaims of rel-risico.
- Duikroute bevat medische of opleidingsclaims alleen als praktische grens, niet als vervanging van instructeur of arts.
- Foodroute onderscheidt voedingsstijl, voedselveiligheid en allergenen expliciet.

## Root-handoff

Root kan na centrale acceptatie:

1. alle zeven routes aan `nl:editorial.acceptedRoutes` toevoegen;
2. alleen de vier ready-owner-keywords registreren;
3. de ene permanente redirect toevoegen:
   - `/nl/blog/thailand-tourism-competition-vietnam-regional-rivals-2026/`
   - → `/nl/blog/thailand-vs-vietnam-which-country-visit-2026/`
4. dezelfde redirectbron uit de sitemap uitsluiten;
5. geen redirects toevoegen voor low-season stimulus of silver tourism;
6. ledger opnieuw genereren en centrale gates draaien.

## QA-bewijs

- Typed loader: alle zeven profielen laden; vier `ready`, drie `archived`; archived-profielen hebben `noindex: true`.
- Runtime: zes niet-geredirecte routes geven HTTP 200, hebben één hero-H1 en een exacte production-canonical.
- Robots: drie archiveprofielen renderden vóór centrale redirectintegratie `noindex,follow`; de twee zelfstandige archives blijven zo renderen.
- Redirect runtime: de concurrentieroute geeft HTTP 308 naar `/nl/blog/thailand-vs-vietnam-which-country-visit-2026/`; eindstatus HTTP 200.
- Assets: zeven unieke SHA-256-hashes; ieder bestand 1600 × 900, WebP en 73–188 KB.
- `npx tsc --noEmit --incremental false`: geslaagd.
- `npm run design:verify`: geslaagd (7 primitives, 34 pilot templates).
- `npm run affiliate:verify`: geslaagd (17 gebruikte slugs, 21 geregistreerde producten).
- `npm run seo:audit:nl-editorial-risk`: uitgevoerd; batchbesluiten zijn in de centrale 252-route-risicoscan opgenomen.
- `npm run seo:verify:nl-editorial:accepted`: geslaagd op de geïntegreerde stand, 162/253 geaccepteerde routes en 161 geverifieerde artikelprofielen.
- `npm run seo:verify:nl-editorial-assets`: geslaagd; 161 geaccepteerde lokale heroes zijn gematcht, indexeerbaar uniek en maximaal 450 KB.
- `npm run seo:cannibalization`: 0 harde conflicten en 0 waarschuwingen.
- Scoped `git diff --check`: geslaagd.
