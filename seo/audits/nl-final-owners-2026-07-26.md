# NL laatste owners — afrondingsaudit 2026-07-26

## Scope en behoudssignalen

Deze batch rondt de laatste drie Nederlandse ContentOps-owners af:

| Owner | Bewijs | Besluit |
|---|---|---|
| `/nl/is-thailand-safe/` | Zes actuele DFS-rankings: `veiligheid thailand` positie 62, `is thailand veilig` 70, `thailand veiligheid` 71 en drie langere varianten; geen verse backlinks | Exacte URL en brede veiligheidsintentie behouden |
| `/nl/compare/phuket-vs-krabi/` | Geen exacte rankings of backlinks | Enige indexeerbare NL-comparisonpilot behouden; overige automatische vergelijkingen blijven noindex |
| `/nl/blog/el-nino-2026-thailand-weather-heatwave-travel-tips/` | Geen exacte DFS-rankings of backlinks, maar aantoonbaar GA4/GSC-retentieverkeer | Bestaande verkeers-URL behouden en als actuele weerupdate blijven onderhouden |

De verse owner-ranking- en backlinkchecks kostten samen `0.108828`. Eerdere zelfstandige Nederlandse keywordclusters, live SERP's, echte PAA-vragen en concurrentieparses blijven de vraaglaag bepalen.

## Actuele bronnen en inhoud

De veiligheidsstatus is op 26 juli opnieuw gecontroleerd bij NederlandWereldwijd. De pagina kopieert geen statische landscore, maar beschrijft de actuele gele, oranje en rode routezones als momentopname en stuurt voor de live kaart altijd naar de overheidsbron. Verkeer, scooters, scams, zwemcondities, noodnummers en verzekeringskeuzes blijven aparte beslisvelden.

De klimaatupdate is op dezelfde datum opnieuw gecontroleerd bij WMO en TMD. WMO bevestigt het ontwikkelde El Niño-signaal van 3 juli 2026; de tekst presenteert dit niet als dagvoorspelling en laat lokale TMD-verwachtingen en waarschuwingen leidend zijn. De datum en alle zichtbare bronstatuslabels staan op `2026-07-26`.

De Phuket-vs-Krabi-owner heeft nu naast ItemList, FAQ en Breadcrumb ook een expliciet WebPage-schema met actuele wijzigingsdatum. Een natuurlijke besliszin linkt naar zowel de Phuket- als Krabi-owner. De vergelijking gebruikt geen samengestelde reviewscore, verzonnen winnaar of vaste dagprijs.

## Design, affiliates en indexatie

Alle drie templates hebben één H1 en één main-landmark, lokale redactionele beelden, beschrijvende alt-tekst, FAQ, bronnen en natuurlijke vervolgstappen. De geneste main-elementen zijn verwijderd.

De veiligheidspagina gebruikt Trip.com, 12Go en Klook alleen om echte voorwaarden te controleren. De vergelijking gebruikt dezelfde partners voor verblijf, excursies en de combinatie-transfer. De El Niño-paksectie bevat vier taakgerichte Amazon-OneLink-producten en een expliciete niet-medische disclosure. Alle commerciële links dragen `nofollow noopener noreferrer sponsored`.

De comparisonpilot is bewust NL-only en heeft daarom `nl` plus `x-default`, zonder misleidende Engelse hreflang. Een representatieve retired vergelijking is bereikbaar maar staat op `noindex, follow`. De twee brede veiligheidsdoublures redirecten permanent naar de owner.

## Verificatie

`npm run seo:verify:nl-final-owners` is groen voor 3/3 owners. De verifier controleert ContentOps, vers DFS-bewijs, rankingbehoud, GA4-retentie, metadata, landmarks, canonical/hreflang, WebPage/Article-, ItemList-, FAQ- en Breadcrumb-schema, affiliates, bronnen, assets, interne links, consolidaties en comparison-noindex.

Browser-QA is uitgevoerd op veiligheid en Phuket-vs-Krabi bij 1280 px breed en op de klimaatupdate met echte 390×844 device-emulatie. De vertrekcheck veranderde aantoonbaar van 0% naar 17%. De vergelijking linkt zichtbaar naar Phuket en bevat zes correcte sponsored-uitgangen. De mobiele Plan A–C-sectie, sticky zoekbalk, bottomnavigation en vier Amazon-productroutes werken zonder document-overflow, kapotte beelden of consolefouten.

De brede regressiegates zijn groen: TypeScript, gerichte ESLint zonder fouten, 106/106 NL runtime-owners, 0 harde SEO-collisions en 0 waarschuwingen, affiliatecontrole en design-systemcontrole. ContentOps staat na deze batch op 106 `implemented`; er zijn geen Nederlandse owners meer in `implementing`.
