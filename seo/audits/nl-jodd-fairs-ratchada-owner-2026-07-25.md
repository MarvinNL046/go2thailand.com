# Acceptatie-audit — NL Jodd Fairs Ratchada owner

**Route:** `/nl/blog/jodd-fairs-bangkok-night-market-guide/`  
**Datum:** 25 juli 2026  
**Status:** geïmplementeerd en lokaal geverifieerd

## Zoekintentie en inhoud

- Primaire owner: `jodd fair night market`; bestaande DataForSEO-ranking positie 25 en volume 210.
- Elf clusterrecords, tien actuele SERP-sets, echte PAA, eigen rankingcheck, backlinkcheck en drie concurrentie-/bronparses vastgelegd.
- De bestaande GA4-route bleef exact behouden.
- De NL-route is vervangen door een actuele venue-owner voor locatie, openingstijden, route, timing, eten, betalen en bezoekwaarde.
- 2.101 gerenderde woorden en één H1.
- Tien echte PAA-vragen met geopende tekstkleur `rgb(41, 53, 49)`.
- De voormalige Rama 9-locatie en de huidige Ratchada-locatie zijn expliciet ontward; de sluitingsdatum is gecorrigeerd naar eind juni 2025.
- Onbewezen aantallen, vaste prijzen, betaalpercentages, first-person claims en absolute veiligheids- of authenticiteitsclaims uit de oude pagina zijn niet overgenomen.
- De Engelse versie blijft inhoudelijk ongewijzigd en wordt pas in de afzonderlijke EN-fase onderzocht.

## Design en beeld

- Drie nieuwe projectgebonden WebP-assets:
  - `/images/redesign/jodd-fairs-ratchada-hero.webp`
  - `/images/redesign/jodd-fairs-ratchada-arrival.webp`
  - `/images/redesign/jodd-fairs-ratchada-food-choice.webp`
- Cinematische avondhero met actuele feitenkaart en twee intentiegerichte CTA’s.
- Volwaardige onderste helft met locatie-alert, 90-minutenplan, MRT-route, timingvensters, foodkeuzemethode, reisgezelschapscenario’s, fit/niet-fit, marktvergelijking, praktische checks, PAA, related guides en bronverantwoording.
- Desktopbrowser op 1.280 px: document- en bodybreedte 1.265 px, viewport 1.280 px, geen documentoverflow.
- Mobiele browser op 390 × 844: document- en bodybreedte beide 375 px, geen documentoverflow. De sectienavigatie scrollt bewust binnen de eigen container.
- Na een progressieve volledige scroll waren alle beelden geladen en hadden zij bruikbare alt-tekst.

## Natuurlijke interne links en owner-grenzen

- Drie natuurlijke inline links zijn in lopende tekst opgenomen:
  - `gids voor BTS en MRT in Bangkok` naar de openbaarvervoerowner;
  - `streetfoodgids voor Thailand` naar de brede streetfoodowner;
  - `beste nachtmarkten van Bangkok` naar de vergelijkende nachtmarktenowner.
- Related-guidecards verwijzen aanvullend naar nachtmarkten, streetfood en Bangkok openbaar vervoer.
- Alle zeven unieke interne hoofcontentroutes reageerden lokaal met HTTP 200.
- De Jodd-owner bezit alleen exacte venue-intent; vergelijkende en foodbrede zoekvragen blijven bij hun eigen pagina.

## Amazon OneLink en overige affiliatecontrole

- Amazon OneLink is per owner expliciet beoordeeld en niet vergeten.
- Geen Amazon-productblok toegevoegd: een generieke poncho, powerbank of tas zou de navigational venue-intent onderbreken en dunne affiliatie opleveren.
- Relevante producten blijven gereserveerd voor afzonderlijke inpak- en reisgearowners en moeten daar uitsluitend via centrale `/go/<slug>/`-routes, OneLink-disclosure en redirecttests verschijnen.
- Eén rustige Klook-verwijzing staat alleen in de vervolggidssectie en wordt zichtbaar omschreven als een algemene Bangkok-foodtour, niet als Jodd Fairs-ticket.
- De Klook-link gebruikt route-eigen placement sub-ID en `noopener noreferrer nofollow sponsored`.
- `npm run affiliate:verify` blijft groen voor alle centraal gebruikte Amazon-slugs.

## Techniek, SEO en React-review

- Canonical exact: `https://go2-thailand.com/nl/blog/jodd-fairs-bangkok-night-market-guide/`.
- Hreflang `en`, `nl` en `x-default` aanwezig.
- JSON-LD valide voor Article, TouristAttraction, FAQPage, BreadcrumbList en ItemList; globale Organization is daarnaast aanwezig.
- Semantische headings, artikelen, lijsten, description lists, native details/summary en echte links gebruikt.
- Hooks zijn onvoorwaardelijk; alle contentbeelden gebruiken `next/image`; er is geen onnodige clientstate toegevoegd.
- TypeScript en gerichte ESLint zonder errors of warnings.
- Cannibalisatiecheck: nul harde botsingen en nul waarschuwingen.

## Bron- en actualiteitscontrole

- Officiële Jodd Fairs-communicatie voor openingsdatum, openingstijden, station en uitgang.
- Thailand Travel / Tourism Authority of Thailand Japan voor adres, loopafstand, aanbod en sluiting van Rama 9.
- AroiMakMak alleen voor de gedateerde heropening van Train Night Market Ratchada in maart 2026.
- Bangkok Expressway and Metro voor officiële Blue Line-netwerkcontext.
- Veranderlijke zaken zoals kraamaanbod, drukte, kaartacceptatie en vertrektijd zijn als controlepunten geformuleerd, niet als garanties.

