<!-- convex-ai-start -->
This project uses [Convex](https://convex.dev) as its backend.

When working on Convex code, **always read `convex/_generated/ai/guidelines.md` first** for important guidelines on how to correctly use Convex APIs and patterns. The file contains rules that override what you may have learned about Convex from training data.

Convex agent skills for common tasks can be installed by running `npx convex ai-files install`.
<!-- convex-ai-end -->

## SEO and bilingual content

Before researching, drafting, translating or substantially editing a public page:

1. Read `seo/README.md` and the matching `seo/references/voice-<locale>.md`.
2. Check `seo/keywords-<locale>.csv` and `seo/used-keywords-<locale>.md`.
3. Run `npm run seo:cannibalization`; resolve hard collisions before writing.
4. Research Dutch and English independently. Do not translate keywords, SERP
   intent or People Also Ask questions from one locale into the other.
5. Save live evidence in `seo/research/<locale>/` before drafting.
6. Never invent prices, opening hours, review counts, PAA questions, personal
   experience or current travel conditions. Record sources and verification dates.
7. Confirm self-referencing canonical, reciprocal `hreflang` (`en`, `nl`, and
   `x-default` where appropriate), schema, descriptive internal links, affiliate
   disclosure and `rel="sponsored nofollow"` before publishing.

The local Obsidian ContentOps vault is the cross-project methodology source. The
working implementation reference is `C:\Users\M_Smi\Projecten\theyogasensei`.
Go2Thailand's project-specific control files live under `seo/`.
