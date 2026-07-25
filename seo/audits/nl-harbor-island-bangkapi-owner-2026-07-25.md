# Acceptatie-audit — NL Harbor Island Bangkapi owner

**Route:** `/nl/blog/harbor-island-bangkok-rooftop-waterpark-2026/`
**Datum:** 25 juli 2026
**Status:** geïmplementeerd en lokaal geverifieerd

## Zoekintentie en inhoud

- Primaire owner: `harbor island water park bangkok`, ondersteund door merk-, ticket-, prijs-, openingstijden-, kinderen-, route-, regels-, Bangkapi- en reviewintenties.
- DFS-cluster, tien actuele Nederlandse SERP-sets, echte PAA, officiële Engelse en Thaise HarborLand-bronnen, The Mall Group-routecheck, geparseerde concurrenten, rankingcheck en backlinkcheck zijn vastgelegd.
- De bestaande URL en historische GA4-owner blijven exact behouden; alleen de Nederlandse presentatie en inhoud zijn vervangen.
- De browser rendert 2.092 zichtbare woorden, exact één H1 en tien relevante FAQ-vragen.
- De pagina kiest eerst de juiste vestiging en bouwt daarna een beslisroute voor zones, gezinsfit, vervoer, weer, tickets, tijden en paklijst.
- De Engelse tegenhanger blijft inhoudelijk ongewijzigd en wordt later met afzonderlijk Engelstalig onderzoek behandeld.

## Feitcontrole en informatievoorsprong

- De owner gaat expliciet over Harbor Island op verdieping 3 van The Mall Lifestore Bangkapi, 3522 Lat Phrao Road, en niet over Harbor Island Bangkae of een droge HarborLand-indoorvestiging.
- De zeven officiële Bangkapi-zones zijn verwerkt: Super Island, Little Island, Lazy Island, Jungle Island, Sky Rider, Toys Island en Art Island.
- Super Island wordt met achttien glijbanen beschreven, Lazy Island met ongeveer 200 meter en Sky Rider met ongeveer 100 meter op circa acht meter hoogte; deze maten blijven gekoppeld aan de officiële vestigingsinformatie.
- De pagina legt uit dat positionering vanaf ongeveer twee jaar geen algemene toelating tot iedere attractie betekent. Lengte-, gewicht-, gezondheids- en begeleidingsregels blijven leidend.
- De officiële Engelse en Thaise vestigingspagina tonen verschillende openingstijden. De owner toont de discrepantie, dateert de check en adviseert controle op dezelfde dag in plaats van één schijnzeker tijdvak.
- Prijzen worden niet als vaste waarheid of met vluchtige euroconversie gepubliceerd. Bezoekers controleren vestiging, product, sessieduur, datum en inclusies vóór betaling.
- MRT Yellow Line Bang Kapi, Exit 3 en de skywalk naar de M-verdieping zijn als controleerbare route verwerkt; daarna volgt nog de interne mallroute naar verdieping 3.
- De oude claims over een tijdloos grootste waterpark, alle inclusies, Happy Care, vaste openingstijden, vaste prijzen en een directe ingang vanaf het station zijn verwijderd.

## Design en beeld

- Drie nieuwe venue-neutrale WebP-sfeerbeelden:
  - `/images/redesign/harbor-island-bangkapi-hero.webp`
  - `/images/redesign/harbor-island-family-zones.webp`
  - `/images/redesign/harbor-island-weather-route.webp`
- De beelden claimen niet de exacte venue, attractieconfiguratie of actuele operationele toestand te documenteren.
- Premium branch-passporthero, driedelige vestigingskeuze, zonepanorama, gezinscheck, gestippelde Yellow Line-route, weersbanner, ticket- en tijdencontrole, Klook-alternatievenblok en functionele paklijst geven de pagina een eigen visueel ritme.
- De onderste helft bestaat niet uit één generieke kaartmuur: paklijst, donkere Amazon-kit, noodscenario’s, gesplitste FAQ, gerelateerde gidsen en bronmethode gebruiken verschillende composities.
- Desktopbrowser op 1.280 px: geen horizontale documentoverflow.
- Mobiele browser op 390 × 844: sticky zoekbalk en bottom-nav intact en geen horizontale documentoverflow.
- Alle acht gerenderde pagina- en layoutbeelden geladen na volledige progressieve scroll; nul gebroken beelden.
- Het geopende FAQ-antwoord is op desktop visueel gecontroleerd en goed leesbaar op de lichte achtergrond.

## Natuurlijke interne links

- De branch- en route-uitleg verwijst natuurlijk naar de Bangkok-owner en de bestaande BTS/MRT-gids.
- Het weerplan verbindt met de Bangkok-weerowner; de alternatievenstap met de Bangkok-attractieowner.
- De gezinscontext en gerelateerde sectie verwijzen naar de bestaande Thailand-met-kinderen-owner.
- Alle vijf inhoudelijke vervolgroutes reageren lokaal met HTTP 200.
- Ankerteksten beschrijven de concrete vervolgstap en stapelen het primaire keyword niet kunstmatig.

## Affiliatecontrole

- Eén Klook-uitgang met eigen placement-sub-ID verschijnt pas na de branch-, ticket- en weercontrole.
- De interface zegt expliciet dat dit een algemene vergelijking van alternatieve Bangkok-waterparken opent en geen geverifieerde Harbor Island-deeplink is. Vestiging, product, datum en voorwaarden moeten opnieuw worden gecontroleerd.
- Twee relevante Amazon-OneLink-routes: `neutrogena-beach-defense-spf70` en `earth-pak-dry-bag`. Ze ondersteunen alleen zonbescherming en het scheiden van natte spullen.
- Waterschoenen, telefooncases, speelgoed en ride-uitrusting zijn bewust niet geforceerd omdat de actuele venueregels niet voor ieder gebruik zijn bevestigd.
- Beide `/go/`-routes reageren lokaal met HTTP 307 naar de geregistreerde Amazon.com-producten en voegen `tag=go2thailand-20` toe voor de bestaande OneLink-strategie.
- Alle drie commerciële links bevatten `noopener noreferrer nofollow sponsored` en een zichtbare disclosure over commissie, lokale OneLink-doorsturing, prijs, verkoper en beschikbaarheid.
- Trip.com is bewust niet in deze dagactiviteit-flow geplaatst; de bezoekbeslissing vereist geen hotelboeking.

## Techniek en SEO

- Canonical exact: `https://go2-thailand.com/nl/blog/harbor-island-bangkok-rooftop-waterpark-2026/`.
- Hreflang `en`, `nl` en `x-default` aanwezig; de Engelse route blijft de bestaande tegenhanger.
- JSON-LD aanwezig voor Article, TouristAttraction, FAQPage, BreadcrumbList, HowTo en ItemList; globale Organization is daarnaast aanwezig.
- Semantische sections, headings, articles, lijsten, native details/summary en echte links gebruikt.
- Contentbeelden gebruiken `next/image`; dynamische Klook-placementtracking gebruikt de bestaande hook onvoorwaardelijk.
- TypeScript en gerichte ESLint zijn groen zonder errors of warnings.
- Cannibalisatiecheck groen: nul harde botsingen en nul waarschuwingen.
- Designsystemcheck groen: zeven primitives en 26 pilottemplates.
- Amazon affiliateverificatie groen: 16 gebruikte slugs en 16 geregistreerde producten.
- Nederlandse runtimeverificatie groen: 93 van 93 owners reageren correct op de lokale server.
