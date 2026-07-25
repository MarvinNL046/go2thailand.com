# Acceptatie-audit — NL Lumpini Hawker Centre owner

**Route:** `/nl/blog/bangkok-lumpini-hawker-centre-street-food-2026/`  
**Datum:** 25 juli 2026  
**Status:** geïmplementeerd en lokaal geverifieerd

## Zoekintentie en inhoud

- Primaire owner: `lumpini hawker centre`, ondersteund door route-, openingstijden-, eten-in-het-park-, betaal-, vergelijkings- en bezoekwaardevragen.
- DFS-cluster, tien actuele Nederlandse SERP-sets met echte PAA, vijf primaire of redactionele bronchecks, rankingcheck en backlinkcheck zijn vastgelegd.
- De bestaande GA4-route met 33 weergaven, 20 actieve gebruikers, 1,65 weergaven per gebruiker en 0 seconden gemeten engagement bleef exact behouden.
- 1.585 zichtbare gerenderde woorden, één H1 en tien echte PAA-vragen.
- De owner helpt bezoekers een moment kiezen, Gate 5 vinden, wisselend kraamaanbod beoordelen, betalen, park en maaltijd combineren en alternatieven vergelijken.
- Verouderingsgevoelige details worden als gepubliceerde venuegegevens plus dagcheck gepresenteerd, niet als permanente garantie.
- De Engelse route blijft inhoudelijk ongewijzigd.

## Feitcontrole en informatievoorsprong

- Soft opening op 10 april 2026; de oude toekomsttekst over een opening in mei is verwijderd.
- Locatie: Gate 5 aan Ratchadamri Road. Gepubliceerde shifts: 05:00–16:00 en 16:00–00:00.
- De venue heeft meer dan honderd roterende verkopers; de pagina belooft daarom geen vaste kraam, gerecht of prijs.
- Voorzieningen zoals schoon water, afwas-, handwas-, zit- en afvalinfrastructuur worden venuebreed beschreven zonder te beweren dat iedere kraam automatisch veiliger of beter is.
- BTS Sala Daeng uitgang 6 en MRT Lumphini uitgang 1 komen uit de openingspublicatie; er wordt geen overdekte stationsverbinding beloofd.
- BMA publiceert voor Lumpini Park dagelijks 04:30–22:00 en gratis toegang. De pagina maakt het verschil met de latere hawker-shift zichtbaar.
- QR-betaling wordt als mogelijke kraamoptie behandeld; internationale reizigers krijgen het advies cash als reserve mee te nemen.
- De open paviljoens worden correct als natuurlijk geventileerd en niet als volledig airconditioned beschreven.

## Design en beeld

- Drie nieuwe projectgebonden WebP-assets:
  - `/images/redesign/lumpini-hawker-hero.webp`
  - `/images/redesign/lumpini-hawker-food.webp`
  - `/images/redesign/lumpini-hawker-route.webp`
- Premium venuehero met rustige tekstzone en compacte vertrekkaart.
- Volwaardige opbouw met vier bezoekplannen, stapsgewijze Gate 5-route, foodkeuzebeeld, betaalhiërarchie, parkroutebanner, vergelijkingstabel, functionele parkkit, PAA, gerelateerde routes en bronmethodiek.
- Desktopbrowser op 1.280 px: document- en bodybreedte 1.265 px, viewport 1.280 px en geen documentoverflow.
- Mobiele browser op 390 × 844: document- en bodybreedte beide 375 px en geen documentoverflow; sticky zoekbalk en bottom-nav blijven intact.
- Alle acht gerenderde pagina- en layoutbeelden geladen na progressieve volledige scroll; geen gebroken beelden.
- FAQ-antwoordtekst rendert met `rgb(41, 53, 49)`, opacity 1 en font-weight 500.

## Natuurlijke interne links

- Natuurlijke inline links verbinden de concrete vervolgvragen met Bangkok compleet, BTS/MRT, Thaise streetfood en Bangkokse nachtmarkten.
- Related-guidecards herhalen deze vervolgroutes alleen in de duidelijke volgende-stapzone.
- Alle gebruikte unieke hoofdcontentroutes reageren lokaal met HTTP 200.
- Ankerteksten beschrijven de vervolgvraag en herhalen het primaire keyword niet kunstmatig.

## Amazon OneLink en overige affiliatecontrole

- Amazon is alleen toegevoegd als functionele `park + hawker`-kit, niet als willekeurig winkelblok.
- Centrale, reeds geregistreerde routes: `/go/rainleaf-travel-towel/`, `/go/sun-cube-wide-brim-hat/` en `/go/venture-pal-packable-backpack/`.
- Alle drie lokale routes geven HTTP 307 naar Amazon met tag `go2thailand-20`; OneLink kan daarna de passende lokale winkel selecteren.
- De zichtbare disclosure noemt commissie, geen extra kosten, OneLink en controle van product, verkoper, prijs en beschikbaarheid.
- Alle drie links bevatten `noopener noreferrer nofollow sponsored`.
- Geen generieke Klook- of hotel-CTA geforceerd op deze venue-owner.

## Techniek en SEO

- Canonical exact: `https://go2-thailand.com/nl/blog/bangkok-lumpini-hawker-centre-street-food-2026/`.
- Hreflang `en`, `nl` en `x-default` aanwezig.
- JSON-LD aanwezig voor Article, FoodEstablishment, FAQPage, BreadcrumbList en HowTo; globale Organization is daarnaast aanwezig.
- Semantische sections, headings, artikelen, lijsten, native details/summary en echte links gebruikt.
- Contentbeelden gebruiken `next/image`; geen onnodige clientstate toegevoegd.
- TypeScript en gerichte ESLint groen zonder errors of warnings.
- Cannibalisatiecheck groen: nul harde botsingen en nul waarschuwingen.
- Designsystemcheck groen: zeven primitives en 26 pilottemplates.
- Amazon affiliateverificatie groen: 16 gebruikte slugs en 16 geregistreerde producten.
- NL-runtimecheck groen: 88/88 owner-routes reageren correct op de lokale server.
