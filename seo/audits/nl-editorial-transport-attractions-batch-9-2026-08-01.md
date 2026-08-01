# NL editorial transport/attractions — batch 9 audit

Datum: 2026-08-01
Scope: zeven exact toegewezen `/nl/blog/`-routes. Centrale family-, keyword-, ledger-, package- en registrybestanden zijn niet gewijzigd.

## Lifecycle en ownergrenzen

| Route | Profiel | Robots | Grens |
|---|---|---|---|
| Bangkok–Koh Samui | `ready` | index | Alleen de routeketen; Samui en breed vervoer blijven aparte owners |
| White Temple entree | `ready` | index | Alleen de bevestigde 2026-entree-update; Chiang Rai-attracties blijven breed eigenaar |
| Dib Bangkok | `ready` | index | Alleen Dib en actuele programmacontrole |
| Pattaya Pride 2026 | `archived` | noindex | Verstreken jaaragenda; Pattaya en nightlife blijven blijvend |
| Walking Street-vernieuwing | `archived` | noindex | Onvoldoende onderbouwde nieuwsclaim; nightlife-owner neemt actuele keuze over |
| SkyFlyers Bangkok | `ready` | index | Alleen deze attractie; brede Bangkok-attractieowner blijft intact |
| Thai Airways A321neo | `ready` | index | Alleen toestel-/vlootupdate; geen algemene vluchtowner |

## Uitgevoerde inhoudscontrole

- Alle zeven Nederlandse bodies zijn volledig herschreven in natuurlijk Nederlands.
- Oude mojibake, vertaalde superlatieven en Schiphol/KLM-opvulling zijn verwijderd.
- Vaste prijzen, uren, dienstregelingen en beschikbaarheidsbeloften zijn vervangen door live controles bij de uitvoerder.
- De twee niet-blijvende Pattaya-routes hebben een expliciete lifecycle en verwijzen naar de juiste evergreen owner.
- FAQ's zijn redactionele vragen; er wordt nergens beweerd dat ze uit DataForSEO of Google PAA komen.
- Primaire bronnen en controledatum staan zowel in frontmatter als typed profielen.

## Design en assets

- Iedere route gebruikt een eigen lokale hero onder `public/images/redesign/editorial/<slug>-hero.webp`.
- Frontmatter en typed profiel verwijzen exact naar hetzelfde asset.
- Alle assets zijn minimaal 1024×576, behalve Bangkok–Samui op 1200×630.
- Alle assets blijven onder 450 KB.
- De gedeelde typed layouts leveren immersive/split heroes, besliskaarten, stappen, callouts, FAQ, bronnen en gerelateerde routes zonder route-specifieke componentduplicatie.

## Affiliatecontrole

- Bangkok–Samui: één natuurlijke 12Go-livevergelijking.
- SkyFlyers: één natuurlijke Klook-livevergelijking.
- Geen vaste prijs, korting of beschikbaarheidsclaim.
- Disclosure is zichtbaar in het typed affiliateblok; de gedeelde renderer gaf beide live-CTA's in de SSR-output uit met `rel="nofollow sponsored"`.

## Technische verificatie

Uitgevoerd op 2026-08-01:

- Loader-validatie: 7/7 profielen laden met exacte route, manifestcluster en lifecycle.
- `npx.cmd tsc --noEmit --incremental false`: geslaagd.
- Runtime op poort 3000: 7/7 routes geven HTTP 200.
- HTML: 7/7 routes hebben exact één H1 en een self-referencing canonical.
- Robots: 5/5 `ready`-routes blijven indexeerbaar; 2/2 `archived`-routes geven `noindex,follow`.
- Hreflang: gecontroleerde runtimevoorbeelden bevatten de Nederlandse alternate.
- Interne links: 16 unieke toegepaste Nederlandse routes geven HTTP 200.
- Affiliate-output: beide live-CTA's bevatten `nofollow sponsored`.
- Assets: 7/7 bestaan lokaal, matchen frontmatter en profiel, zijn minimaal 1024×576 en kleiner dan 450 KB.
- `npm.cmd run design:verify`: geslaagd (7 primitives, 34 pilot templates).
- `npm.cmd run affiliate:verify`: geslaagd (17 gebruikte slugs, 21 geregistreerde producten).
- `git diff --check`: geen whitespacefouten in de gedeelde worktree.

De centrale accepted-route- en keywordregistratie wordt bewust aan de hoofdagent overgelaten om conflicten met parallelle batches te voorkomen.
