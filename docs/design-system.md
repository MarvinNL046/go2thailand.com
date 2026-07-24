# Go2Thailand premium design system

**Versie:** 1.0 — NL Krabi pilot  
**Status:** visuele basis bevroren; uitbreiden via gedeelde primitives, niet per URL  
**Referentie:** homepage en het Nederlandse Krabi-cluster

## Ontwerpprincipes

1. **Editorial first.** De pagina voelt als een rustige reispublicatie, niet als een boekingsmachine.
2. **Een duidelijke reisbeslissing per sectie.** Elke module helpt kiezen, vergelijken of plannen.
3. **Ivory, jade en saffraan.** Saffraan markeert acties en accenten; jade draagt hiërarchie en vertrouwen.
4. **Eerlijke frictie.** Naast voordelen tonen we reistijd, afhankelijkheid van boot of taxi, seizoensrisico en andere trade-offs.
5. **Affiliate is secundair.** Eerst redactionele waarde, daarna een duidelijk gelabelde CTA met disclosure.
6. **Data blijft data.** Geen gegenereerde prijzen, reviews, openingstijden of ervaringsclaims zonder actuele bron.

## Design tokens

### Kleuren

| rol | Tailwind-token | waarde | gebruik |
|---|---|---:|---|
| pagina-canvas | `canvas` | `#FCFAF6` | standaard pagina-achtergrond |
| ton-sur-ton vlak | `tonal` | `#F4EEE4` | afwisseling, tabellen, keuzevlakken |
| zachte beeldbasis | `mist` | `#E8EFEB` | hero fallback en rustige infoblokken |
| primair groen | `jade` | `#123F36` | koppen, primaire CTA, footer |
| jade light | `jade-light` | `#1D5A4D` | tweede regel, hover of subtiel accent |
| jade dark | `jade-dark` | `#0B2F29` | footer en sterke contrastvlakken |
| actieaccent | `saffron` | `#F29A38` | pijlen, labels, primaire highlights |
| bodytekst | `charcoal` | `#293531` | lopende tekst |

De oude `ivory`, `thailand-*`, `surface-*` en `primary-*` tokens blijven tijdelijk bestaan voor niet-gemigreerde pagina’s. Nieuwe templates gebruiken de rollen hierboven.

### Typografie

- Displaykoppen: Cormorant Garamond via `font-display`.
- Interface en body: Manrope via `font-sans`.
- Eyebrow: uppercase, klein, saffraan, ruime tracking.
- H1: maximaal twee visuele regels op desktop; natuurlijke tekst blijft één semantische H1.
- H2: `heading-redesign`, meestal 4xl–6xl met compacte regelhoogte.
- Body: minimaal 14 px, 24–28 px regelhoogte; belangrijke intro’s 15–16 px.

### Ruimte en maatvoering

- Contentcontainer: `container-custom`, maximaal 80rem.
- Grote sectie: `py-14 lg:py-20`.
- Compacte sectie: `py-12 lg:py-16`.
- Divider: één lijn over 80% van de viewport via `section-divider-*`.
- Cards: meestal `rounded-2xl`; knoppen bewust minder rond met `rounded-xl`.
- Standaardschaduw: `shadow-editorial-card`; uitgelichte kaart: `shadow-editorial-lift`.

## Gedeelde primitives

| component | verantwoordelijkheid |
|---|---|
| `EditorialHero` | hero-afbeelding, gradient, breadcrumbs, H1, CTA’s en optionele infokaart |
| `PageSectionNav` | horizontale, scrollbare in-page navigatie met actieve startpositie |
| `SectionHeading` | eyebrow, H2 en optionele uitleg |
| `FaqSplitSection` | toegankelijke native accordion en zichtbare DFS/PAA-antwoorden |
| `RelatedGuidesSection` | drie beschrijvende interne vervolgkeuzes en optionele partnerlink |
| `SourceMethodSection` | bronverantwoording en methode zonder het hoofdverhaal te onderbreken |
| `AffiliateDisclosure` | consistente, goed leesbare disclosure direct bij commerciële CTA’s |

Primitives bevatten geen bestemmingstekst, prijzen of zoekwoorden. Paginaspecifieke data blijft typed en locale-specifiek.

## CTA-grammatica

- Primair: `btn-jade btn-jade-pattern`; witte tekst, saffraankleurige pijl.
- Secundair: `btn-cream`; saffraankleurige tekst en omkaderde pijl.
- Maximaal twee CTA’s in een hero.
- Een externe of affiliate-CTA opent in een nieuw tabblad.
- Affiliate-links gebruiken altijd `noopener noreferrer nofollow sponsored`.
- Disclosure staat zichtbaar vóór of direct onder de eerste partner-CTA.

## Hero-grammatica

- `next/image`, `fill`, `priority` en `sizes="100vw"` voor de LCP-afbeelding.
- Mobiel: sterke verticale ivory-gradient zodat tekst leesbaar blijft.
- Desktop: horizontale gradient; beeldwaarde blijft rechts zichtbaar.
- Breadcrumbs staan boven de eyebrow en blijven semantische navigatie.
- De hero bevat geen zoekwoordvariant die alleen voor SEO is toegevoegd.
- Een optionele sidecard bevat één samenvattend feit, geen tweede CTA-cluster.

## Responsive regels

- Onder `lg` vervangt `MobileTravelNavigation` de desktopheader.
- In-page navigatie scrollt horizontaal en gebruikt minimaal 145 px per item.
- Hero-CTA’s zijn op smalle schermen full-width.
- Cardgrids gaan 1 → 2 → maximaal 4 kolommen afhankelijk van informatiedichtheid.
- Tabellen krijgen een horizontaal scrollbare container; de pagina zelf mag nooit overflowen.
- Content eindigt met voldoende ruimte boven de vaste mobiele bottomnav.

## Accessibility gates

- Exact één H1 per pagina.
- Semantische `<main>`, `<section>`, `<nav>`, `<article>`, `<details>` en echte links/buttons.
- Iconen die alleen decoratief zijn krijgen `aria-hidden="true"`.
- Elke inhoudelijke afbeelding krijgt beschrijvende alttekst; decoratieve cardafbeeldingen mogen `alt=""` gebruiken als de zichtbare titel dezelfde informatie geeft.
- Focus blijft browser-native zichtbaar; interactieve elementen zijn met toetsenbord bereikbaar.
- Bodytekst gebruikt minimaal `charcoal/60`; FAQ-antwoorden minimaal `charcoal/78`.

## SEO- en contentgates

- Elke publieke pagina heeft een locale-specifieke DFS-brief vóór substantieel schrijfwerk.
- Zichtbare PAA-vragen en FAQ-schema zijn exact gelijk.
- Canonical is zelfverwijzend; EN/NL-hreflang is reciproque en x-default wordt sitebreed beheerd.
- BreadcrumbList plus WebPage zijn standaard; extra schema alleen wanneer zichtbare content het ondersteunt.
- Interne links beschrijven de volgende reisbeslissing en blijven binnen de actieve locale.
- Routes met overlappende intentie worden eerst op rankings, backlinks en contentwaarde gecontroleerd.

## Performance gates

- Geen nieuwe clientcomponent zonder echte browserinteractie.
- Geen hooks in puur presentational templates.
- Geen remote hero-afbeeldingen wanneer een geoptimaliseerde lokale asset beschikbaar is.
- Geen routebrede carousels of zware animatielibraries voor statische storytelling.
- Pages Router-content blijft SSG/ISR waar de brondata niet per request verandert.
- TypeScript, `design:verify`, `seo:verify`, affiliateverificatie en browser-QA moeten slagen voor uitrol.
