# NL Phitsanulok destination-owner audit — 2026-07-24

## Resultaat

- Route: `http://localhost:3000/nl/city/phitsanulok/`
- Productiecanonical: `https://go2-thailand.com/nl/city/phitsanulok/`
- Owner: `data/destinations/nl/phitsanulok.ts`
- Template: `components/city/DestinationGuideTemplate.tsx`
- Status: premium destination-owner gebouwd en lokaal geverifieerd.

## DataForSEO en SERP

- Exacte hoofdquery: `phitsanulok thailand`
- Zoekvolume: 480
- Keyword difficulty: 0
- Intentie: informational
- DFS-cluster: 83 ruwe keywordrecords en 50 competitor domains.
- Bestaande owner: 0 gevonden Nederlandse rankings en 0 gevonden paginabacklinks.
- Clustervervuiling door generieke kaart-, taal-, land- en Thailand-termen is uitgesloten.
- Concurrenten inhoudelijk geanalyseerd: Sawadee, Backpacken in Azië, BM Air en Pack Lightly.
- Fouten uit concurrentcontent zijn niet overgenomen: Khao Yai als korte Phitsanulok-rit, Khao Kho als stadszone, Chao Phraya als stadsrivier, onbevestigde markt/kookles, vaste oude prijzen en dienstregelingen.

## Echte PAA-dekking

De FAQ gebruikt zes letterlijke locatievragen uit vijf live Nederlandse SERP's:

1. Wat te doen in Phitsanulok?
2. Wat is er te doen in Phitsanulok?
3. Waar staat Phitsanulok bekend om?
4. Wat is de religie van Phitsanulok?
5. Is Phitsanulok, Thailand veilig?
6. Wat zijn de mooiste uitzichtpunten in Phitsanulok?

De twee bijna gelijke doe-vragen hebben verschillende taken: de eerste bouwt een compacte stadsdag; de tweede behandelt provincie- en vervolgkeuzes.

## Inhoudelijke information gain

- Wat Yai wordt als levend bedevaartsoord behandeld, niet als fotodecor.
- Mueang Song Khwae wordt correct via Nan en Khwae Noi uitgelegd; de moderne avondroute ligt aan de Nan.
- De vijftiende-eeuwse koninklijke rol wordt genuanceerd beschreven als residentie en machtscentrum.
- Stad en provincie zijn expliciet gescheiden: de stad is compact, natuurgebieden zijn volledige wegdagen.
- Sukhothai is een vervolgroute en afzonderlijke owner; overnachten bij het historische park is vaak beter voor vroeg/laat licht en meerdere zones.
- Foodcontext gebruikt onderbouwde lokale ingangen: khanom wong, zongedroogde banaan uit Bang Krathum en markteten.
- Oude openingstijden, vluchtfrequenties, markturen, prijzen en parkstatus zijn niet als evergreen feiten bevroren.
- Gerenderde hoofdcontent: 2.423 woorden, binnen de researchbandbreedte van 2.100–2.600.

## Eigen beeldset

Vijf locatie-eigen assets zijn met de ingebouwde image-generation workflow gemaakt, visueel gecontroleerd en als WebP met kwaliteit 84 opgeslagen:

- `public/images/redesign/phitsanulok-destination-hero.webp` — 1815×867, Nan-rivier en Wat Yai met kopieruimte.
- `public/images/redesign/phitsanulok-wat-yai.webp` — 1448×1086, respectvol tempelinterieur.
- `public/images/redesign/phitsanulok-nan-night-market.webp` — 1448×1086, lokale avondmarkt aan de Nan.
- `public/images/redesign/phitsanulok-folk-craft.webp` — 1448×1086, volkscultuur en gietvormambacht.
- `public/images/redesign/phitsanulok-phu-hin-rong-kla.webp` — 2172×724, brede hoogland- en parkbanner.

Geen asset bevat tekst, logo, watermark, Bangkok-skyline, zuidelijke karst, strand of generieke festivaliconografie.

## Runtime SEO en techniek

- Documenttitle: `Phitsanulok Thailand: route, tips & wat te doen (2026)`.
- Meta description aanwezig en route-specifiek.
- Exact één H1: `Phitsanulok Thailand`.
- Canonical correct.
- Hreflang aanwezig voor `nl`, `en` en `x-default`.
- JSON-LD aanwezig: `Organization`, `TouristDestination`, `ItemList`, `FAQPage`, `BreadcrumbList`, `WebPage`.
- 17 image-instanties geladen; 0 gebroken en 0 zonder alttekst.
- Desktop-runtime: geen horizontale document- of body-overflow.
- Open FAQ-antwoord: `rgb(41, 53, 49)`, 14px/28px; goed leesbaar op de lichte sectieachtergrond.

## Affiliate en interne routes

- Trip.com: `phitsanulok-destination-hotels`, nieuw tabblad en `noopener noreferrer nofollow sponsored`.
- Klook: `phitsanulok-destination-experiences`, nieuw tabblad en `noopener noreferrer nofollow sponsored`.
- 12Go: `phitsanulok-destination-transport`, nieuw tabblad en `noopener noreferrer nofollow sponsored`.
- Transparante affiliate-disclosures staan direct bij de commerciële plaatsingen.
- HTTP 200 gecontroleerd voor attracties, hotelowner, Sukhothai-owner, transport en weer.

## Visuele QA

- Lokale browsercontrole uitgevoerd op de hero, quick answer, zones, affiliateband, foodstory, route/planning, praktische kaarten, FAQ, bronnen, nieuwsbrief en footer.
- Hero-crop houdt de titel leesbaar en Wat Yai herkenbaar rechts in beeld.
- De eigen beelden hebben elk een andere inhoudelijke rol; geen herhaling als decoratieve stockreeks.
- Onderste helft behoudt dezelfde typografische hiërarchie, spacing, kaartkwaliteit en brontransparantie als de eerste helft.
- Het gedeelde template gebruikt eerder geverifieerde mobiele stapeling voor highlight- en zonekaarten; de design- en NL-runtimegates bewaken dezelfde componentroute.

## Gates

- `npx tsc --noEmit` — groen.
- `npm run design:verify` — groen: 7 primitives en 26 pilot templates.
- `npm run seo:cannibalization` — groen: 0 hard collisions, 0 warnings.
- `npm run affiliate:verify` — groen: 13 gebruikte slugs, 13 geregistreerde Amazon-producten.
- `npm run seo:verify:nl-runtime` — groen.

## Bronnenbeleid

De owner toont de gebruikte primaire bronnen in de pagina zelf: Tourism Authority of Thailand, Department of National Parks, Department of Airports, State Railway of Thailand, Thai Meteorological Department en NederlandWereldwijd. Secundaire concurrentcontent is alleen gebruikt om dekking, fouten en information gain te bepalen.
