# NL bloghub owner-audit — 1 augustus 2026

## Scope

- Route: `/nl/blog/`
- Primary: `thailand blog`
- Research: [`seo/research/nl/2026-08-01-thailand-blog-web-serp-refresh.md`](../research/nl/2026-08-01-thailand-blog-web-serp-refresh.md)
- DataForSEO: niet beschikbaar; geen metrics of echte-PAA-claims

## Implementatie

De Nederlandse route gebruikt `NlBlogHub`; de Engelse route behoudt zijn bestaande implementatie. De NL-owner heeft:

- een eigen gegenereerde 1800×1012 WebP-hero;
- premium jade/saffraan-design met editorial typography;
- één H1, een zelfrefererende canonical en locale-hreflang via de globale laag;
- `Blog`, `BreadcrumbList`, `ItemList` en globale `Organization` schema-opmaak;
- zoek- en categoriefilters met toegankelijke labels;
- drie natuurlijke ingangen naar route, bestemmingen en food;
- een zichtbare freshness- en ownergrens;
- geen geforceerde affiliate-uitgang of niet-functionele nieuwsbriefvorm.

## Technische controle

- HTTP 200 op de lokale server;
- exact één H1;
- canonical `https://go2-thailand.com/nl/blog/`;
- vier JSON-LD-blokken inclusief sitewide Organization;
- heroasset aanwezig en gerenderd;
- TypeScript zonder fouten.

De overige 252 editorial-routes blijven afzonderlijk in de editorial-queue totdat zij een eigen update-, consolidatie- of retirebesluit hebben.
