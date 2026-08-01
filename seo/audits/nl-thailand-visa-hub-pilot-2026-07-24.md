# Audit — NL Thailand visum- en inreisvoorwaardenhub

## Scope

Owner-route: `/nl/visa/`

## Implementatie

- NL-owner vervangen door `ThailandVisaGuide`; de Engelse locale behoudt de bestaande pagina tot afzonderlijke Engelse research.
- Huidige 60-dagenbron en goedgekeurde 30-dagenwijziging worden zichtbaar gescheiden; geen onbewezen ingangsdatum.
- Interactieve reisduurkeuze voor 1–30, 31–60, 61–90 en werk/lang verblijf.
- Beslisflow voor paspoort, bewijs van vertrek, eerste verblijfsadres en TDAC.
- Samenvatting van de officiële TDAC-regels plus duidelijke doorverwijzing naar de eigen spoke en het officiële domein.
- Vier visumroutekaarten zonder toelatingsbelofte of betaalde visumdienst.
- FAQPage, WebPage en BreadcrumbList-schema op basis van echte Nederlandse PAA-vragen.
- Drie eigen lokaal geoptimaliseerde WebP-assets en twee contextuele affiliatelinks met disclosure.
- Vier brede NL-visumblogs consolideren naar de hub; de dubbele NL-TDAC-blog consolideert naar de TDAC-spoke.

## Acceptatie

- [x] TypeScript
- [x] ESLint zonder template-eigen waarschuwingen
- [x] Design-system verifier
- [x] SEO verifier
- [x] Affiliate verifier
- [x] HTTP 200 en server-rendered hero/keuzehulp
- [x] Desktop browser-QA op 1440 × 1000
- [x] Mobiele browser-QA op 390 × 844 zonder horizontale overflow
- [x] Reisduurinteractie in echte browser gecontroleerd
- [x] Canonical, hreflang, schema, affiliatelinks, assets en redirects via HTTP/DOM gecontroleerd

## Huidige browseruitkomst

De owner laadt met één H1, zonder Next.js-erroroverlay en zonder horizontale overflow op desktop of exact 390 px mobiel. Hero, regelstatus, documentenset en TDAC-kaarten zijn visueel gecontroleerd. De bekende sitebrede `emrldco.com`-melding blijft onderdeel van de afzonderlijke third-party-audit.
