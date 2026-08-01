# NL Thaise woorden en zinnen owner — implementatie-audit

**Canonical owner:** `/nl/travel-guides/thai-phrases-language/`  
**Onderzocht en vernieuwd:** 31 juli 2026

## Intentie en grenzen

- Deze owner behandelt essentiële gesproken reiszinnen, Thai-schrift als visuele bevestiging, romanisering, tonen, beleefdheid, terugval en noodcommunicatie.
- Etiquette behoudt sociale en religieuze gedragsregels; foodowners behouden allergenen en gerechtkeuze; shopping behoudt onderhandelen en aankoopcontrole; hidden gems behoudt bestemmingskeuze.
- De onafhankelijke Engelse route blijft inhoudelijk ongewijzigd.

## Premium uitvoering

- Nieuwe route-specifieke ImageGen-hero van 1536 × 1024 en 134.190 bytes met donkere ruimte voor de titel.
- Vier situaties met twaalf korte zinnen, drie uitspraaklagen, vijf toonprofielen, beleefdheidsgrens, vierstaps terugvalroute en offline noodkaart.
- Tien actuele PAA-antwoorden en vier schema’s: Article, BreadcrumbList, ItemList en FAQPage.
- Legacyclaims over betere prijzen, appnauwkeurigheid, vaste downloadgrootte, onderhandelingspercentages en gegarandeerde hulpdiensttaal zijn verwijderd; kapotte Thai- en accentencoding is niet overgenomen.

## Affiliates en interne links

- De gratis zinnenkaart en aankoopcriteria komen vóór de enige Amazonuitgang.
- De Lonely Planet Thai Phrasebook-productroute gebruikt het centrale `/go/`-register, Associates-tag en OneLinkstrategie; de CTA belooft alleen de actuele Amazonprijs en laat editie, verkoper, taal, voorraad en levering open.
- De externe link gebruikt `target="_blank"` en `rel="noopener noreferrer nofollow sponsored"`.
- Natuurlijke links gaan naar etiquette, eten en de hidden-gemsowner.

## Verificatie

- TypeScript groen; designsystemgate groen met 7 primitives en 34 pilottemplates.
- Affiliategate groen met 17 gebruikte slugs en 21 geregistreerde producten; centrale route geeft HTTP 307 naar de getagde canonical Amazonproductpagina.
- Cannibalisatiegate: 0 harde botsingen en 0 waarschuwingen.
- Gerichte NL-siteaudit: 1/1 pagina, 18/18 interne doelen en 5/5 lokale assets zonder harde fout of waarschuwing; p95 679 ms.
- Browser-QA: één H1, correct gerenderd Thai-schrift, tien FAQ’s, vier owner-schema’s plus Organization, canonical en EN/NL/x-default hreflang correct, één sponsorkoppeling met juiste attributen, geen ontbrekende alttekst en geen horizontale desktopoverflow.
- Visuele hero-QA groen: titelcontrast, negatieve ruimte en persoonplaatsing volgen het premium designsysteem.
- Engelse regressiecontrole: HTTP 200, onafhankelijke Engelse H1/copy, Engelse canonical en geen Nederlandse ownercopy.
