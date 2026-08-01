# Satun hotel-detail source review — 2026-08-01

## Scope and method

This review covers the ten English Satun hotel records that have no `hotel.sources[].sourceUrl` in the repository. Searches prioritised first-party hotel websites and Tourism Authority of Thailand material. Search snippets were used only to locate sources, never as permission to preserve a claim. Live rates, review scores, room counts, walking times and availability were not copied into the site.

## Source findings

| Record                       | Source located                                                                                                                                                                     | Editorial decision                                                                                                                                                                                   |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ananya-lipe-resort`         | [Ananya Lipe official English site](https://www.ananyalipe.com/en/home-en/) and [official contact page](https://www.ananyalipe.com/en/contact-en/)                                 | The official site places the property on Pattaya Beach. The stored record calls it a Sunset Beach property, so the existing review is materially contradicted and must not be published as verified. |
| `castaway-resort-koh-lipe`   | [Castaway Resort official site](https://kohlipe.castaway-resorts.com/)                                                                                                             | The official site supports a Sunrise Beach bungalow property, but it does not validate the record’s fixed price, rating, comparative superlatives or all operational claims.                         |
| `coco-tarutao-resort`        | No matching first-party property found. [TAT Satun guide](https://api.tat.or.th/upload/live/multimedia/9354/ESatun.pdf) lists CoCo Bungalows and Tarutao Cabana as separate names. | High identity-conflation risk. Do not publish the generated review or Hotel schema.                                                                                                                  |
| `idyllic-concept-resort`     | [Idyllic Concept Resort official site](https://www.idyllicresort.com/)                                                                                                             | The official site supports a Sunrise Beach location. It does not validate the stored fixed price band, rating, guest demographics or all qualitative claims.                                         |
| `mountain-resort-koh-lipe`   | [Mountain Resort Koh Lipe official site](https://mountainresortlipe.com/)                                                                                                          | Confirms the property identity. The generated record still contains unsupported price, rating, distance and amenity assertions.                                                                      |
| `pakbara-seaside-guesthouse` | No reliable first-party or public-authority match found for the exact property name.                                                                                               | Identity and operating status remain unverified. Do not publish the generated review or Hotel schema.                                                                                                |
| `poohs-bungalow`             | [TAT Satun guide](https://api.tat.or.th/upload/live/multimedia/9354/ESatun.pdf) contains a Pooh’s business reference; no current first-party accommodation site was found.         | Evidence is insufficient for the stored current room, season, price and facility claims.                                                                                                             |
| `serendipity-beach-resort`   | [Serendipity Beach Resort official site](https://www.serendipityresort-kohlipe.com/)                                                                                               | Confirms the property identity on Koh Lipe. The stored rating, price, room count, walking time and urgency claims remain unsupported.                                                                |
| `sinkiat-thani-hotel`        | [Sinkiat Thani Hotel official site](https://www.sinkiathotel.com/)                                                                                                                 | Confirms the property identity in Satun. It does not validate the generated ranking superlative, price band, exact walking claims or all facilities.                                                 |
| `wan-wang-resort`            | No reliable first-party or public-authority match found for the exact Pak Bara property.                                                                                           | Identity and operating status remain unverified. Do not publish the generated review or Hotel schema.                                                                                                |

## Claim-level conclusion

All ten JSON records contain one or more unsupported volatile or experiential claims. Examples include fixed THB/USD price bands, numeric ratings without provenance, exact walking or boat times and fares, current amenity statements, “best value” or “most comfortable” rankings, inferred guest demographics, booking urgency and statements presented as guest consensus. These records were generated on 2026-04-15 but contain no evidence trail. A source URL that confirms a hotel name does not validate the rest of a generated review.

The safe interim state is therefore:

- keep the routes discoverable to users following existing internal links;
- render a useful live-booking verification checklist rather than unsupported review copy;
- apply `noindex, follow` until the record receives a claim-by-claim primary-source rewrite;
- omit `Hotel` and `FAQPage` structured data for those ten routes;
- retain canonical, breadcrumb and generic `WebPage` structured data;
- label the commercial exit and require users to verify live property identity, room, map pin, total and terms.

## Re-entry criteria

A route may return to the full indexed hotel template only after its JSON record includes at least one valid `hotel.sources[].sourceUrl` and the published claims have been reconciled against those sources. A first-party source should cover property identity/location; volatile room, policy and amenity details should be qualified and directed to live verification. Prices and third-party review scores should not be stored.
