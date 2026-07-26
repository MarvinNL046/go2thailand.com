# NL Koh Samet-owner — afrondingsaudit 2026-07-26

## Owner- en URL-besluit

`/nl/islands/koh-samet/` blijft de enige brede Nederlandse owner voor Koh Samet. De oude smalle route `/nl/city/rayong/attractions/koh-samet/` geeft lokaal een permanente 308 naar deze eilandowner.

De verse DFS-controle vond nog geen rankingkeywords of backlinks op de nieuwe owner. De oude Rayong-route heeft nog twee organische signalen: `ko samet` op positie 100 en `samet` op positie 89; backlinks zijn niet gevonden. De permanente één-op-éénredirect blijft daarom belangrijk voor signaaloverdracht. Totale kosten van de vier verse DFS-taken: `0.072312`.

## Zoekintentie en inhoud

De owner combineert het bestaande clusteronderzoek van 19 keywordrecords, 50 competitor domains, een zelfstandige Nederlandse SERP, vijf echte PAA-vragen en drie concurrentieparses. De pagina beantwoordt de brede beslisintentie via:

- een direct antwoord op de vraag of Koh Samet de moeite waard is;
- vier verblijfszones met duidelijke doelgroep en trade-off;
- weekdag-versus-weekendkeuze;
- drie dagen zonder checkliststress;
- Ban Phe-, pier- en bootlogica zonder kwetsbare vaste vaartijden;
- weer, zeecondities, watergebruik, eten, FAQ en officiële TAT-bronnen.

De niet-bestaande `/nl/city/koh-samet/food/`-link is uitgeschakeld. Beschrijvende inline links sturen natuurlijk naar Rayong, vervoer en weer; alle gerenderde interne NL-links zijn live gecontroleerd en geven geen 4xx-status.

## Visuele verrijking

Naast de bestaande hero zijn drie nieuwe projectassets gemaakt met de ingebouwde imagegen-workflow en lokaal geoptimaliseerd naar WebP:

- `public/images/redesign/koh-samet-ao-phai-morning.webp` — rustige baai en houten boot, 1200×800, 190 KB;
- `public/images/redesign/koh-samet-weekday-banner.webp` — brede weekday-strandbanner, 1600×667, 196 KB;
- `public/images/redesign/koh-samet-sea-conditions.webp` — lokale regenbui en opklarende lucht, 1200×800, 117 KB.

De beelden vervangen herhaald hergebruik van de hero in de zone-, banner- en weerlaag. De pagina heeft nu minimaal zeven unieke beeldassets, correcte alt-teksten en behoudt de jade/cream/saffraan-vormtaal.

## Affiliates en techniek

Klook- en Trip.com-uitgangen blijven contextueel, zichtbaar toegelicht en dragen `nofollow noopener noreferrer sponsored`. Amazon OneLink is bewust niet geforceerd op deze brede eilandowner; een concrete paklijst- of gearowner is geschikter voor productaanbevelingen.

`npm run seo:verify:nl-koh-samet` is groen voor 1/1 owner en bewaakt ContentOps-status, DFS/PAA-bewijs, legacyrankings, redirect, metadata, canonical/hreflang, één H1/main, schema, affiliate-attributen, officiële bronnen, interne links en nieuwe beelden.

De brede gates zijn groen: TypeScript, gerichte ESLint zonder fouten, 106/106 NL runtime-owners, 0 SEO-collisions, affiliatecontrole en design-systemcontrole. ContentOps staat nu op 95 `implemented` en 11 `implementing`.

Browser-QA is uitgevoerd op 1280×720 en met echte 390×844 device-emulatie. Hero, nieuwe weekendbanner, sticky zoekbalk, bottomnavigation en cookietoestemming werken zonder document-overflow, kapotte beelden of consolefouten. De toestemmingslaag verdwijnt na “Necessary only” en geeft de bottomnavigation weer vrij.

De Engelse pagina is in deze NL-fase inhoudelijk ongemoeid gelaten.
