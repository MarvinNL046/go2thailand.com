# Audit — NL editorial transport, food & activities batch 13

Datum: 2026-08-01

## Resultaat

Zeven routes zijn inhoudelijk herschreven en voorzien van een typed NL editorial profile. Alle zeven zijn `ready`, indexeerbaar, self-canonical en behouden de gespecialiseerde renderer-prioriteit van `pages/blog/[slug].tsx` wanneer later een gespecialiseerde renderer wordt toegevoegd.

## Routecheck

| Route | Cluster | Layout | Lifecycle | Canonical / robots |
| --- | --- | --- | --- | --- |
| Ayutthaya train day trip | transport | destination-guide / route | ready | self-canonical / index |
| Bangkok–Chiang Mai sleeper | transport | destination-guide / route | ready | self-canonical / index |
| Bangkok public transport | transport | evergreen-guide / plan | ready | self-canonical / index |
| Thainosaur Museum | attractions | evergreen-guide / plan | ready | self-canonical / index |
| Top Tables 2026 | food | food-guide / restaurant | ready | self-canonical / index |
| Bangkok cooking classes | food | food-guide / class | ready | self-canonical / index |
| Thailand kayaking and SUP | attractions | evergreen-guide / compare | ready | self-canonical / index |

## Kwaliteitsmaatregelen

- Oude machineachtige zinsbouw, ongefundeerde vaste prijzen, onnauwkeurige stationsclaims en absolute seizoensbeloften zijn verwijderd.
- Iedere route heeft één unieke H1 uit het profile en één unieke lokale hero (`1536×1024`, WebP, kleiner dan 450 KB).
- Bodies en profile blocks beantwoorden dezelfde intentie zonder elkaar woordelijk te dupliceren.
- Interne links gaan naar bestaande ownergrenzen: bestemmingen, transportcorridor, gerechten, hoteloverzichten en dagtripvergelijking.
- FAQ-schema komt uit de typed FAQ-blocks; bronblokken bevatten gecontroleerde HTTPS-bronnen met controledatum.
- Geen redirect voorgesteld. De Thainosaur-route behoudt zijn bestaande slug omdat het museum een duurzame owner kan dragen; de verstreken campagnedata zijn expliciet van de live attractie gescheiden.
- Affiliateblokken zijn beperkt tot vier routes en bevatten een disclosure en live-voorwaardenbeleid. Geen Amazon-product is geforceerd in een route waar geen natuurlijke productbeslissing nodig is.

## Verwachte verificatie

- Typed loader/profile-manifest match
- Runtime 200, unieke H1, self-canonical en index-robots voor alle zeven routes
- Assetdimensies en bestandsgrootte
- TypeScript zonder emit
- Design- en affiliate-gates
- `git diff --check`

De centrale `family-completion`, keywordmap, ledger, `next.config.js` en sitemap zijn niet gewijzigd; acceptatie en centrale integratie blijven bij root.
