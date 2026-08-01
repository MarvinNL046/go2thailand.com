# English commercial, hotel and location family audit — 2026-08-01

## Scope

Inventory snapshot: 309 English routes across four owners:

- `commercial-landing`: 53 routes;
- `hotel-guide`: 187 routes (`116` hotel-commercial plus `71` where-to-stay);
- `location-directory`: 54 routes;
- `phuket-location`: 15 routes.

The review covered the shared route owners and data flow, representative rendered pages, affiliate-link semantics, canonical/hreflang output, structured data, internal navigation and price-claim policy. No family ledger, sitemap or inventory file was edited in this task.

## Family findings and changes

### Hotel guides

- The destination and category templates already expose premium hero/content/card patterns, contextual links to area guides, destination guides and activities, and Trip.com calls to action marked `nofollow sponsored`.
- Replaced an unsupported English `20–30% less` booking claim with a like-for-like comparison checklist.
- Changed category-table actions from ambiguous `Check price` / `Search` to `Check current total` / `Search live stays`.
- Preserved historical price bands only as editorial planning context; the rendered owner already explains that room totals vary by date, room type and terms.

### Where-to-stay and location directories

- The shared audience owner now says `Check current stays`, rather than presenting a static rate action.
- Area hotel cards now have a hotel-specific accessible label and say `Check current total` or `Search live stays`.
- Location routes retain natural links to the destination guide, neighbourhood hub and hotel guide.
- English-only routes intentionally output only `en` and `x-default` alternates; paired routes output `en`, `nl` and `x-default`.

### Phuket locations

- The existing dedicated English components are premium, responsive owners with Article/ItemList/FAQ/Breadcrumb schema where appropriate.
- Affiliate actions in the inspected components are contextual (hotel, tour or transport intent), transparently marked and do not introduce unrelated Amazon placements.
- Patong's rendered route confirmed its language pair, canonical, five schema nodes and four sponsored actions.

### Commercial landings

The highest-risk shared/commercial owners received a live-price safety pass:

- all 15 origin-to-Phuket flight pages now call fare bands planning guidance and instruct readers to compare the same itinerary, baggage, fees, conditions and final payable total;
- the Phuket, Bangkok and Chiang Mai flight hubs no longer claim a reliably cheapest month or advertise a stale verification badge/source note;
- catamaran and yacht-rental pages no longer promise channel price parity, fixed seasonal savings or evergreen verification;
- private-pool, luxury-villa, honeymoon and wedding pages now require confirmation of the exact unit/package, dated inclusions and final quote;
- honeymoon extras are explicitly described as variable and subject to written confirmation;
- affiliate disclosures consistently explain possible commission at no extra cost and separate it from editorial ordering.

Numeric ranges that remain on these long-form pages are treated as planning examples, not live quotes. A future factual refresh may update or remove individual examples as primary supplier evidence changes; no current price, discount or perk is guaranteed by the call to action.

## Rendered evidence

Six representative routes were fetched from `http://localhost:3000` after the changes:

| Route                        | HTTP | Canonical | Alternate policy        | Schema                                                   | Sponsored actions |
| ---------------------------- | ---: | --------- | ----------------------- | -------------------------------------------------------- | ----------------: |
| `/best-hotels/phuket/`       |  200 | exact     | en/nl/x-default         | Organization, BreadcrumbList, FAQPage, ItemList, WebPage |                11 |
| `/where-to-stay/krabi/`      |  200 | exact     | en/x-default (unpaired) | Organization, BreadcrumbList, ItemList                   |                 7 |
| `/areas/bangkok/sukhumvit/`  |  200 | exact     | en/x-default (unpaired) | Organization, Place, FAQPage, BreadcrumbList             |                 5 |
| `/phuket/patong/`            |  200 | exact     | en/nl/x-default         | Organization, Article, BreadcrumbList, ItemList, FAQPage |                 4 |
| `/flights-to-phuket/london/` |  200 | exact     | en/nl/x-default         | Organization, FAQPage, BreadcrumbList                    |                 4 |
| `/catamaran-phuket/`         |  200 | exact     | en/nl/x-default         | Organization, FAQPage, BreadcrumbList                    |                15 |

Every sample had a meaningful `<main>`, no Next.js error overlay and valid JSON-LD. The existing `design-coverage-en-2026-08-01.md` report records premium coverage for all 309 scoped routes.

## Affiliate and technical gates

- Static scan: 53 scoped TSX owner/component files and 243 external `_blank` anchors inspected. All commercial/affiliate anchors include both `nofollow` and `sponsored`; the single non-sponsored external anchor is an editorial source citation, correctly `nofollow` only.
- `npm run affiliate:verify`: passed, 17 used Amazon slugs / 21 registered products.
- `npx tsc --noEmit --pretty false --incremental false`: passed.
- `git diff --check`: passed.

## Acceptance note

The hotel-guide, location-directory and Phuket-location template families have current-price-safe shared owners and green representative technical evidence. The commercial family has received the material claim-safety remediation above; volatile supplier facts remain explicitly delegated to live listings, and any later primary-source refresh should be treated as normal content maintenance rather than a booking guarantee.
