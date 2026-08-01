# Acceptatie-audit — NL specialty coffee Bangkok owner

**Route:** `/nl/blog/bangkok-specialty-coffee-cafe-guide-2026/`
**Datum:** 25 juli 2026
**Status:** geïmplementeerd en lokaal geverifieerd

## Zoekintentie en inhoud

- Primaire owner: `specialty coffee bangkok`, ondersteund door beste-koffie-, koffiebar-, café-hopping-, Thaise-bonen-, merk-, wijk- en eventvragen.
- DFS-cluster met twee records, tien actuele Nederlandse SERP-sets met echte PAA, drie volledig geparseerde concurrenten, negen officiële bronchecks, rankingcheck en backlinkcheck zijn vastgelegd.
- De bestaande GA4-route met 26 weergaven, 20 actieve gebruikers, 1,30 weergaven per gebruiker en 0 seconden engagement bleef exact behouden.
- Meer dan 1.900 zichtbare gerenderde woorden, één H1 en tien echte PAA-vragen.
- De oude breekbare top-10 is vervangen door drie geografisch logische routes met zes betrouwbare ankers, gecontroleerde locaties, een menu-decoder, bonenlabel-uitleg, proeflog en praktische dagchecks.
- Exacte Google-scores, reviewaantallen, vaste prijzen en de niet-onderbouwde claim dat alle wijken persoonlijk bezocht zijn, zijn verwijderd.
- World of Coffee Bangkok staat correct als afgelopen evenement van 7–9 mei 2026 beschreven, niet als komende activiteit.
- De Engelse route blijft inhoudelijk ongewijzigd.

## Feitcontrole en informatievoorsprong

- Factory Phaya Thai: officieel adres en dagelijks 08:00–16:00 gecontroleerd.
- Roots Ratchathewi, Ari en Thong Lor: filiaaladres en gepubliceerde uren uit de officiële branchlijst gecontroleerd.
- Gallery Drip Coffee: BACC kamer 107 op de eerste verdieping, dinsdag tot en met zondag 10:00–20:00, maandag gesloten en de venue-regel voor eten en drinken benoemd.
- Ceresia Sukhumvit 41 en Kaizen Ekkamai: locatie en officiële uren gecontroleerd; Nana Ari blijft bewust een bezoekdagcheck omdat de primaire parse geen stabiele uren toont.
- Thaise Arabica en Robusta worden niet tot één universeel smaakprofiel gereduceerd. Herkomst, producent, proces en branding worden als afzonderlijke aankoopvelden uitgelegd.
- De gids maakt onderscheid tussen een sfeer- of rankinglijst en een werkelijk uitvoerbare BTS-/wijkroute.

## Design en beeld

- Drie nieuwe projectgebonden WebP-assets:
  - `/images/redesign/bangkok-coffee-hero.webp`
  - `/images/redesign/bangkok-coffee-tasting.webp`
  - `/images/redesign/bangkok-coffee-route-banner.webp`
- Premium hero met barista en BTS, routekaart, drie halve-dagprofielen, gestippelde stoplijnen, menu-keuzeboom, ton-sur-ton bonensectie, brede routebanner, praktische checks, proeflog en een rustige hotelvervolgstap.
- Desktopbrowser op 1.280 px: geen documentoverflow.
- Mobiele browser op 390 × 844: sticky zoekbalk en bottom-nav intact en geen documentoverflow.
- Alle acht gerenderde pagina- en layoutbeelden geladen na progressieve volledige scroll; geen gebroken beelden.
- FAQ-antwoordtekst rendert met `rgb(41, 53, 49)` en opacity 1.

## Natuurlijke interne links

- Inlopende tekstlinks verbinden de routekeuze met de BTS-/MRT-gids en de bonencontext met Chiang Mai, Chiang Rai en de bestaande Nan-reisgids.
- De brede banner verbindt koffie met de foodhub van Bangkok; de hotelstap verwijst rustig naar de bestaande Bangkok-hotelowner.
- Related guides verbinden de pagina met openbaar vervoer, Thaise streetfood en Lumpini Hawker Centre.
- Alle gebruikte unieke interne hoofdcontentroutes reageren lokaal met HTTP 200.
- Ankerteksten beantwoorden concrete vervolgstappen en stapelen het primaire keyword niet kunstmatig.

## Affiliatecontrole

- Eén contextuele Trip.com-uitgang bij de keuze van een BTS-basis, met eigen placement-sub-ID.
- De link bevat `noopener noreferrer nofollow sponsored` en doet niet alsof hij naar één specifiek hotel leidt.
- De disclosure noemt commissie zonder hogere prijs en houdt caféselectie en hotelkeuze inhoudelijk gescheiden.
- Amazon OneLink is expliciet beoordeeld en bewust niet toegevoegd: apparatuur is niet nodig om deze caféroutes uit te voeren en zou de informatieve intentie onnodig commercialiseren.
- Geen generieke Klook-link toegevoegd zonder gecontroleerde deep link naar een relevante koffietour.

## Techniek en SEO

- Canonical exact: `https://go2-thailand.com/nl/blog/bangkok-specialty-coffee-cafe-guide-2026/`.
- Hreflang `en`, `nl` en `x-default` aanwezig.
- JSON-LD aanwezig voor Article, ItemList, FAQPage, BreadcrumbList en HowTo; globale Organization is daarnaast aanwezig.
- Semantische sections, headings, articles, lijsten, native details/summary en echte links gebruikt.
- Contentbeelden gebruiken `next/image`; dynamische Trip.com-placementtracking gebruikt de bestaande hook onvoorwaardelijk.
- TypeScript en gerichte ESLint groen zonder errors of warnings.
- Cannibalisatiecheck groen: nul harde botsingen en nul waarschuwingen.
- Designsystemcheck groen: zeven primitives en 26 pilottemplates.
- Amazon affiliateverificatie groen: 16 gebruikte slugs en 16 geregistreerde producten.
- NL-runtimecheck groen: 90/90 owner-routes reageren correct op de lokale server.
