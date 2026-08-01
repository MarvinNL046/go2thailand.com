# English Thailand visa overview owner audit — 27 July 2026

## Scope and intent

- Canonical owner: `https://go2-thailand.com/visa/`.
- Market: United Kingdom / English.
- Dominant task: decide whether a visa is needed and, if so, route the traveller to the correct purpose-led owner.
- The premium English component replaces the old catalogue-first rendering. The Dutch `/nl/visa/` owner remains independently rendered by its existing premium Dutch component.

## DataForSEO evidence

- Three independent clusters: 403 records, 330 unique keywords after deduplication.
- Ten live UK SERPs: 85 organic results.
- 60 verbatim PAA records, 42 unique questions.
- Exact URL ranking check: zero keywords returned.
- Exact URL backlink check: no reportable links or referring-domain metrics returned.
- Frequent SERP domains included the Royal Thai Embassy London, GOV.UK and official Thai e-Visa alongside commercial visa providers.

## Design and information architecture

- Editorial hero gives the current British-passport answer before showing products.
- Interactive six-plan finder: short holiday, longer tourism, remote work/soft power, retirement, study and employment/investment.
- Four-term explainer separates visa, visa exemption, Visa on Arrival and TDAC.
- Eight-card researched directory points to the dedicated exemption, Tourist Visa, DTV, retirement, education, LTR, Thailand Privilege and extension owners.
- Four-clock module separates application window, visa validity, permitted stay and extension.
- Current-rule and official-source links appear before any sponsored travel option.

## Cannibalisation and links

- The hub owns broad choice intent; detail owners retain evidence, eligibility, price and process depth.
- TDAC demand is bridged to `/visa/digital-arrival-card/` instead of duplicated.
- All eight visa-owner cards are internal links with descriptive copy.
- Post-decision affiliate module uses Trip.com and 12Go only, with current-option language, disclosure and `nofollow sponsored`.
- Amazon is deliberately absent because the hub has no natural physical-product task.

## SEO and structured data

- Unique title and description focus on UK decision intent.
- Canonical: `https://go2-thailand.com/visa/`.
- Alternates: English, Dutch and x-default.
- JSON-LD: Organization, FAQPage, CollectionPage and BreadcrumbList.
- CollectionPage `hasPart` references all eight dedicated owners.

## Verification

- `npx.cmd tsc --noEmit --incremental false`: passed.
- Local runtime: HTTP 200 at `/visa/`; homepage, Dutch visa overview and visa-exemption owner also remained HTTP 200.
- Desktop: 1,265 px client and scroll widths; no horizontal overflow.
- Mobile: 375 px client and scroll widths; 343 px H1 and six 343 px finder buttons fit the content column.
- Finder interaction changed the recommendation to the DTV evidence route.
- Eight route cards rendered in the directory.
- No legacy “April 2026 update” text remained in the English rendered body.
- Mobile retained the project’s sticky search and bottom navigation pattern.
