# English owner audit — Chatuchak Market food guide

**Route:** `http://localhost:3000/blog/chatuchak-weekend-market-food-guide/`  
**Audit date:** 2026-07-26  
**Result:** pass

## Ownership and research

- Preserved the existing English URL and gave it an independent premium owner component.
- DataForSEO ranking snapshot: zero detected ranking keywords; no established query was displaced.
- DataForSEO backlink snapshot captured.
- Eleven English SERPs and a keyword cluster were researched independently from Dutch.
- Three ranking/reference competitors were parsed through DataForSEO: Souvenir Finder, AroiMakMak and Time Out Bangkok.
- FAQ contains twelve verbatim English PAA questions from the captured SERPs; no PAA wording was invented.
- Search ownership is separated from the general Chatuchak guide: this route owns food intent, while the general guide owns the complete market and shopping visit.

## Content and information gain

- Server-rendered page output contains more than 3,000 English word tokens including shared chrome; the owner body materially exceeds parsed competitor depth without relying on a fragile vendor list.
- Information gain includes a 90-minute food-only route, a clear 3–5-hour complete-market distinction, food-section orientation, flavour directions, payment backup, route-failure prevention, allergen prompts and explicit food-risk reduction.
- Current opening-hour and section claims are grounded in Chatuchak Market sources.
- Food-safety wording is grounded in CDC Yellow Book travel guidance and WHO’s Five Keys; no stall is described as guaranteed safe.

## Design and responsive QA

- Premium editorial hero, departure card, horizontal section navigation, intent cards, route visual, food cards, timing panel, decision framework, market-kit banner, split FAQ and related-guide cards all use shared design-system primitives.
- In-app Browser desktop QA: accessible English H1 and breadcrumb, canonical and all schema types present, no horizontal overflow (`scrollWidth === clientWidth`, 1265 px).
- In-app Browser mobile QA at 390 × 844: mobile search and bottom navigation present, section navigation remains usable, no horizontal page overflow (`scrollWidth === clientWidth`, 375 px content viewport).
- Images include contextual English alt text and use responsive Next Image sizing.

## SEO and schema

- Canonical: `https://go2-thailand.com/blog/chatuchak-weekend-market-food-guide/`.
- Hreflang output: `en`, `nl`, `x-default`.
- JSON-LD types verified in rendered output: `Organization`, `Article`, `TouristAttraction`, `FAQPage`, `BreadcrumbList`, `ItemList`.
- Twelve FAQ questions in the interface match FAQ schema verbatim.
- All detected internal links on the rendered owner returned HTTP 200 locally.
- English and Dutch owner routes both return HTTP 200; the Dutch route continues to render Dutch content.

## Affiliate and current-price policy

- Three context-relevant Amazon market-kit products use the central `/go/` OneLink router.
- Every product card visibly says `Check current price at Amazon` and uses `rel="noopener noreferrer nofollow sponsored"`.
- Disclosure explains commission, local-store routing and changing product, seller, delivery, price and availability.
- Klook appears only as an optional guided Bangkok food alternative with `Check current food-tour price at Klook`; no hard price is published.
- Cooking gear is intentionally not forced into this market-visit owner. It remains relevant on curry, recipe and home-cooking owners.

## Verification evidence

- TypeScript: `npx tsc --noEmit --incremental false` — pass.
- Rendered English route: HTTP 200.
- Rendered Dutch counterpart: HTTP 200 and Dutch owner retained.
- Amazon CTA count: 3; `/go/` link count: 3.
- Internal rendered-link check: all 20 unique non-affiliate local paths returned HTTP 200.

