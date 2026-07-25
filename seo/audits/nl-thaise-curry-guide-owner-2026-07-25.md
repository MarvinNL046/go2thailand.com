# Acceptatie-audit — NL Thaise curry owner

**Route:** `/nl/blog/thai-curry-guide-green-red-yellow-massaman-panang/`  
**Datum:** 25 juli 2026  
**Status:** geïmplementeerd en lokaal geverifieerd

## Zoekintentie en inhoud

- Primaire owner: `thaise curry` met DFS-volume 3.600 en KD 0.
- 279 keywordrecords, 50 concurrentdomeinen, elf geslaagde Nederlandse SERP-sets, echte PAA, drie typeconcurrentieparses, rankingcheck en backlinkcheck vastgelegd.
- De bestaande GA4-route bleef exact behouden.
- De oude generieke blog is voor NL vervangen door een keuze-, vergelijkings-, bestel-, allergenen- en thuiskookowner.
- 2.340 gerenderde woorden; één H1.
- PAA-FAQ bevat tien inhoudelijke antwoorden, met geopende tekstkleur `rgb(41, 53, 49)`.
- Claims over vaste pittigheid, universele kokosmelk, vegetarische geschiktheid en ingrediënten zijn bewust genuanceerd.
- De Engelse versie gebruikt nog de bestaande blogroute en is niet inhoudelijk aangepast.

## Design en beeld

- Vier nieuwe projectgebonden WebP-assets:
  - `/images/redesign/thai-curry-guide-hero.webp`
  - `/images/redesign/thai-curry-paste.webp`
  - `/images/redesign/thai-curry-ordering.webp`
  - `/images/redesign/thai-curry-home-cooking.webp`
- Premium hero met zoekbeslissing, glasmorph smaakkaart en eigen kleurhiërarchie.
- Vijf ton-sur-ton currykaarten, een donkergroene “kleur is geen warmtemeter”-banner, toegankelijke vergelijkingstabel, vierstappen-bestelroute en routekaarten per eetcontext.
- De onderste helft bevat een volwaardig allergenenblok, thuiskookbeeld, kookmethode, Amazon-kit, PAA, related guides en bronverantwoording.
- Desktopbrowser op 1.280 px: documentbreedte 1.265 px, viewport 1.280 px, geen documentoverflow.
- Mobiele browser op 390 × 844: document- en bodybreedte beide 375 px, geen documentoverflow. Sectienavigatie en tabel scrollen alleen binnen hun eigen containers.
- Alle beelden na volledige scroll geladen; nul gebroken beelden en alle beelden hebben alt-tekst.

## Amazon en overige affiliatecontrole

- Eén rustige Klook-kookles-CTA in het thuiskookblok en één herhaalde vervolglink bij related guides; beide gebruiken dezelfde route-eigen placement sub-ID.
- Drie relevante Amazon-producten centraal geregistreerd en alleen via `/go/<slug>/` gebruikt:
  - `/go/thai-granite-mortar-eight-inch/`
  - `/go/zojirushi-six-cup-rice-cooker/`
  - `/go/simple-thai-food-cookbook/`
- Alle drie reageren lokaal met HTTP 307 naar de juiste canonical Amazon.com-productroute en bevatten `tag=go2thailand-20`.
- De zichtbare disclosure noemt commissie, geen extra kosten, controle van product/prijs/verkoper en mogelijke OneLink-doorsturing naar een lokale Amazon-winkel.
- Alle vijf gesponsorde uitgangen in de hoofdcontent bevatten `noopener noreferrer nofollow sponsored`.
- Geen prijzen, voorraad of ratings van Amazon gekopieerd.

## Techniek, SEO en React-review

- Canonical exact: `https://go2-thailand.com/nl/blog/thai-curry-guide-green-red-yellow-massaman-panang/`.
- Hreflang `en`, `nl` en `x-default` aanwezig.
- JSON-LD valide voor Article, FAQPage, BreadcrumbList, ItemList en Organization; globale Organization blijft daarnaast aanwezig.
- Component gebruikt semantische headings, lijsten, tabelkoppen, links en afbeeldings-altteksten.
- Hookgebruik blijft onvoorwaardelijk; interactieve content gebruikt native details/summary en links.
- Alle contentbeelden gebruiken `next/image`; geen onnodige clientstate of memo-isering toegevoegd.
- TypeScript zonder errors; gerichte ESLint zonder warnings of errors.
- `npm run affiliate:verify`: 16 gebruikte slugs en 16 geregistreerde producten.
- `npm run seo:cannibalization`: nul harde botsingen en nul waarschuwingen.

## Bron- en actualiteitscontrole

- Thailand Foundation-bronnen voor centrale Thaise keuken, massaman en phanaeng.
- Officiële Thai SELECT-context via het Department of International Trade Promotion.
- Amazon-productroutes op 25 juli 2026 direct gecontroleerd; de pagina toont bewust geen veranderlijke commerciële claims.
- Inhoudelijke datum zichtbaar in Article-schema en bronsectie: 25 juli 2026.
