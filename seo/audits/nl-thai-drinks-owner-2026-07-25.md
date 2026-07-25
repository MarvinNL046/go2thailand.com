# Acceptatie-audit — NL Thaise dranken owner

**Route:** `/nl/drinks/`

**Datum:** 25 juli 2026

**Status:** geïmplementeerd en lokaal geverifieerd

## Zoekintentie en inhoud

- Primaire owner: `thaise dranken`, ondersteund door populaire Thaise drankjes, wat drinken ze in Thailand, Thai iced tea, Thaise ijsthee, Thais bier, alcoholregels, kraanwater en kokoswater.
- DFS legde 115 clusterrecords, een vergelijking van zeven kandidaatowners, tien actuele Nederlandse SERP/PAA-sets, rankings, backlinks, drie concurrentparses en relevante primaire bronparses vast.
- De brede primary heeft volume 20 en KD 0. `Thais bier` (590 / KD 0) en `thai iced tea` (260 / KD 1) blijven subintenties, omdat deze hub alle 25 drankroutes moet ontsluiten en geen bier- of theedetailpagina mag kannibaliseren.
- De bestaande route had nul DFS-rankingkeywords en geen bruikbaar backlinksamenvattingssignaal. De GA4-route bleef exact behouden.
- De browser rendert circa 1.900 zichtbare woorden, exact één H1 en elf geselecteerde echte PAA-vragen.
- De oude generieke cardcatalogus is vervangen door een keuze-first owner met smaakkompas, eerste zes glazen, cha-yenontleding, dagroute, complete collectie, bestelzinnen, wateradvies, alcoholkader en allergenenchecks.
- De Engelse `/drinks/`-route blijft de bestaande Engelse pagina en reageert lokaal met HTTP 200.

## Feitcontrole en informatievoorsprong

- ChaTraMue ondersteunt de historische ontwikkeling van rode theeblends voor Thai Milk Tea en Thai Black Tea, maar wordt niet gebruikt voor gezondheids- of populariteitsclaims.
- De CDC Thailand Yellow Book adviseert reizigers geen kraanwater te drinken, verzegelde of gefilterde alternatieven te kiezen en voorzichtig te zijn met ijs wanneer de veilige herkomst onbekend is.
- TAT bevestigt per 29 mei 2026 algemene alcoholverkoop van 11:00 tot 24:00, minimumleeftijd 20 en mogelijke uitzonderingen of tijdelijke beperkingen per vergunning, locatie, verkiezing of religieuze dag.
- “Waan noi”, “mai waan”, “mai sai nom” en “mai sai nam khaeng” worden als praktische verzoeken uitgelegd, niet als garantie voor suikervrij, allergeenvrij of veilig water.
- Vaste prijzen, tijdloze bierpercentages, gezondheidsbeloftes en onbewezen claims over één nationale, populairste of gezondste drank zijn verwijderd.

## Design en beeld

- Drie nieuwe tekstloze WebP-sfeerbeelden:
  - `/images/redesign/thai-drinks-hero.webp` — 1.672 × 941.
  - `/images/redesign/thai-drinks-cha-yen.webp` — 1.536 × 1.024.
  - `/images/redesign/thai-drinks-hydration-route.webp` — 1.915 × 821.
- Premium hero met smaakpaspoort, ton-sur-ton smaakkompas, redactionele drankrijen, cha-yenfotografie, gestippelde dagroute, volledige catalogus in rijen, donkere bestelstrook en brede waterbanner geven de owner een eigen visueel ritme.
- De onderhelft is bewust niet afgeraffeld: safety-grid, Klook-context, donkere Amazon-duo, uitgebreide FAQ, related guides en bronmethode wisselen compositie en informatiedichtheid af.
- Desktop op 1.280 × 720 en mobiel op exact 390 × 844: geen horizontale documentoverflow.
- Sticky mobiele zoekbalk en bottom-nav blijven intact.
- Alle veertien pagina- en layoutbeelden laden na een volledige progressieve scroll; nul gebroken of hangende beelden.

## Natuurlijke interne links

- De cha-yensectie verbindt natuurlijk met de aparte Bangkok-specialty-coffee-owner.
- De hydratatiebanner verwijst naar gezondheid en reisvoorbereiding.
- De related-sectie koppelt currykeuze, koffie en de praktische 7-Eleven-owner zonder het primary keyword te stapelen.
- Alle 25 drankdetailroutes blijven vanuit vier scanbare families bereikbaar.

## Affiliatecontrole

- Eén algemene Klook-uitgang verschijnt pas na smaak-, bestel-, water-, alcohol- en allergeneninformatie en garandeert geen specifieke tour of proeverij.
- Twee relevante Amazon-OneLink-routes: een geïsoleerde drinkfles en de bestaande Original Thai Tea-mix.
- De drinkfles wordt expliciet niet als waterzuivering gepresenteerd; de theemix krijgt ingrediënten-, cafeïne-, bereiding-, houdbaarheid- en verkoperschecks.
- Beide `/go/`-routes reageren lokaal met HTTP 307 naar het geregistreerde Amazon.com-product en voegen `tag=go2thailand-20` toe.
- Alle commerciële links hebben `noopener noreferrer nofollow sponsored` en zichtbare disclosures.

## Techniek en SEO

- Canonical exact: `https://go2-thailand.com/nl/drinks/`.
- Hreflang en canonical worden door de bestaande layout gegenereerd; de Engelse tegenhanger blijft bestaan.
- JSON-LD aanwezig voor Article, FAQPage, BreadcrumbList en ItemList; globale Organization is daarnaast aanwezig.
- `next/image`, semantische sections, headings, lijsten, native details/summary en echte interne links gebruikt.
- Dynamische Klook-placementtracking gebruikt de bestaande hook onvoorwaardelijk.
- TypeScript en gerichte ESLint zijn schoon; cannibalisatie-, design- en Amazon-affiliategates zijn groen.
- De volledige Nederlandse runtimecontrole staat op 95/95 groene routes.
