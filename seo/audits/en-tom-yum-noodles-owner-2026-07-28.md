# English Tom Yum Noodles owner audit

**Route:** `/food/tom-yum-noodles/`  
**Audited:** 28 July 2026  
**Result:** production-ready owner implementation

## Research and intent

- Two independent DataForSEO clusters: 208 and 54 raw records; 50 competitor domains.
- Exact UK head term: volume 1,000, KD 0; `tom yum chicken noodles` also 1,000/KD 0.
- Ten current UK-English SERPs: 68 organic results, 57 PAA appearances and 45 case-normalised unique questions.
- Exact route ranking check returned zero terms; backlink check returned no reportable summary signal.
- Four complete DFS source parses, two current zero-markdown Michelin captures and current FSA guidance support the editorial boundary.
- Fresh Thai noodle-shop seasoning, Tom Yum Goong, other noodle families and branded instant products are separated rather than cannibalised.

## Design and content

- New rights-safe ImageGen hero inspected and optimised to 1672×941 WebP at 134,446 bytes.
- Premium `DishEditorialTemplate` used with strong desktop and mobile hierarchy, sticky section navigation, taste compass, eight ingredient signals, three format choices, three ordering decisions, safe preparation sequence, affiliate panel, class panel, ten FAQs, related guides and source-method section.
- Desktop browser QA at 1280×900: hero composition, copy zone, at-a-glance card, lower-half layout and related cards render correctly.
- Mobile browser QA at 390×844: hero, search chrome, typography, expanded FAQ and bottom navigation render without horizontal overflow.
- Visible lazy-loaded related images: zero broken.

## SEO and structured data

- One H1: `Tom Yum Noodles`.
- Canonical: `https://go2-thailand.com/food/tom-yum-noodles/`.
- Schemas present: Organization, Article, BreadcrumbList, ItemList and FAQPage.
- Recipe schema deliberately absent because the page does not publish a complete testable recipe.
- Natural owner links to Tom Yum Goong, Boat Noodles, Bangkok food and the Thai-food hub.
- `seo:verify`: zero hard cannibalisation collisions and zero warnings.

## Affiliate and trust controls

- Two contextual Amazon products use registered central `/go/` routes and OneLink disclosure.
- Amazon CTAs say `Check current price at Amazon`; no copied or fixed price is published.
- Klook CTA uses a page-specific subid and asks readers to verify the current class menu and conditions.
- All three exits use `_blank` plus `noopener noreferrer nofollow sponsored`.
- `affiliate:verify`: passed, 16 used slugs and 20 registered products.

## Verification evidence

- TypeScript: `npx tsc --noEmit --incremental false` passed.
- Focused ESLint: zero errors; two pre-existing `<img>` warnings remain in the untouched legacy fallback in `pages/food/[slug].tsx`.
- `design:verify`: passed, seven primitives and 26 pilot templates.
- Local route: HTTP 200.
- Browser measurements: desktop 1265/1265 and mobile 375/375 scroll width/client width; no overflow.
- English layered runtime audit: 1,583/1,583 sitemap routes without hard errors; zero warnings; 1,907/1,907 internal targets reused; 813/814 assets reused and the new asset freshly verified.
- Runtime evidence: `seo/audits/runtime/en-tom-yum-noodles-final-2026-07-28.json` (local audit artefact).

## Claim boundaries

No fixed price, calories, health benefit, universal heat, compulsory herb or protein, automatic gluten-free/vegetarian/vegan/halal status, permanent restaurant availability, universal shelf life or one-formula claim is published. Instant-product facts remain label-specific.
