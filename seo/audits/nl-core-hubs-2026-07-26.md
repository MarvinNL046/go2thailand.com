# NL kernhubs — afrondingsaudit 2026-07-26

## Scope en onderzoeksbasis

Deze audit rondt de drie Nederlandse planninghubs af:

| Owner | Zoekintentie | Verse ownersignalen | Primaire commerciële partner |
|---|---|---|---|
| `/nl/city/` | Bestemmingen kiezen en vergelijken | Geen rankings of backlinks op de exacte URL | Geen; redactionele inspiratiehub |
| `/nl/activities/` | Excursies en tours vergelijken | Geen rankings of backlinks op de exacte URL | Klook |
| `/nl/transport/` | Vervoersvormen en routes plannen | Geen rankings of backlinks op de exacte URL | 12Go |

Voor iedere owner zijn op `2026-07-26` verse DataForSEO-ranking- en backlinkchecks opgeslagen. De totale kosten daarvan waren `0.108108`. De zelfstandige SERP-, PAA- en concurrentieonderzoeken van `2026-07-23` blijven de inhoudelijke vraaglaag bepalen; er zijn geen PAA-vragen of zoekvolumes verzonnen.

## Design en inhoud

Alle drie hubs gebruiken het premium redactionele designsysteem met een sterke hero, ton-sur-ton secties, duidelijke keuzehulpen, visuele kaarten, FAQ, vervolgstappen en bronverantwoording. De pagina's hebben ieder één H1 en één main-landmark; de eerder geneste main-elementen zijn verwijderd. De `CollectionPage`-schema's hebben `dateModified: 2026-07-26`.

De zoekintenties blijven bewust gescheiden:

- `/nl/city/` is de inspiratie- en keuzehub; lokale details blijven bij individuele bestemmingowners.
- `/nl/activities/` bezit de commerciële excursie-intentie; de brede redactionele wat-te-doen-intentie blijft bij `/nl/things-to-do-in-thailand/`.
- `/nl/transport/` bezit modaliteits- en routekeuze; volledige rondreizen blijven bij de itinerary- en routecontent.

## Interne links, routes en affiliates

De hubs linken vanuit leesbare zinnen en beslismomenten naar relevante bestemmingen, het weer, praktische informatie en vervolgplanners. De Koh Lanta-kaarten en het bijbehorende `ItemList`-schema verwijzen nu correct naar `/nl/islands/koh-lanta/` in plaats van de niet-bestaande city-route.

De bestemmingenhub blijft niet-commercieel. De activiteitenhub heeft zes transparante Klook-uitgangen en de vervoerhub drie transparante 12Go-uitgangen; externe commerciële links gebruiken de juiste sponsored-attributen. Amazon OneLink is hier bewust niet geforceerd, omdat generieke hubintentie geen natuurlijk productmoment biedt. Amazon-producten blijven voor paklijst-, weer- en gearcontent waar ze de bezoeker werkelijk helpen.

## Verificatie

`npm run seo:verify:nl-core-hubs` is groen voor 3/3 owners. De verifier controleert ContentOps-status, vers DFS-bewijs, metadata, landmarks, sectie- en contentdiepte, canonical/hreflang, Organization-, CollectionPage-, ItemList-, FAQ- en Breadcrumb-schema, affiliates, lokale assets en alle gerenderde interne links.

De brede regressiegates zijn groen: TypeScript, gerichte ESLint zonder fouten, 106/106 NL runtime-owners, 0 harde SEO-collisions en 0 waarschuwingen, affiliatecontrole en design-systemcontrole. ContentOps staat na deze batch op 100 `implemented` en 6 `implementing`.

Browser-QA is uitgevoerd op `/nl/city/` bij 1280 px breed en op `/nl/activities/` met echte 390×844 device-emulatie. De bestemmingszoeker filtert werkend op Koh Lanta en levert uitsluitend de correcte eilandenroute. Hero's, sticky mobiele zoekbalk, bottomnavigation, cookiekeuze en de zichtbare Klook-CTA werken zonder document-overflow, kapotte beelden of blokkerende consolefouten. De commerciële uitgang bevat `nofollow noopener noreferrer sponsored`.

De Engelse varianten blijven inhoudelijk ongemoeid tot hun eigen onderzoeks- en implementatiefase.
