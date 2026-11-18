# Connected site refinement — local review

Status: implemented locally. Not published. Owner walkthrough pending.

Existing local origin: http://127.0.0.1:3037/guide/site-refinement

Production-build test preview: http://127.0.0.1:3041/guide/site-refinement

Browser saves belong to their origin. Continue using port 3037 to inspect existing local work; port 3041 is a separate test origin and does not migrate those saves.
Homepage: http://127.0.0.1:3041/
Artwork: http://127.0.0.1:3041/artworks

## Scope

All 35 suggestions are mapped, numbered and explained in `src/lib/site-refinement.ts` and the local review page. This is 35 suggestions addressed, not 35 invented new features: existing first-visit, reflection, comparison, evidence, saving, recovery and feedback tools are retained and connected rather than duplicated. Item 35 supplies the walkthrough and existing private feedback form; actual human feedback remains for the owner to provide.

New and strengthened parts include the homepage three-way entrance, room breadcrumbs and optional orientation, 12-artwork viewer/gallery, inspiration notes, keyboard focus restoration, on-demand full artwork loading, temporary Quiet artwork, a local question helper, personal return labels, original-store projections for both newer certification paths and the active engineering question, safe public links, a friendly missing-page screen, metadata, a public-route sitemap, release notes and this repeatable review.

No deployment, API generation, account migration, book replacement, or save-schema migration was performed. The original image assets and book archive remain unchanged. The pre-existing timestamp change in `public/evidence/reading50-anchors.json` is unrelated to this batch.

## Validation

- 946 unit tests pass, including new privacy, original-save projection, room-boundary, 35-item coverage and actual image-dimension checks.
- Production build passes, including TypeScript and packed-book/asset-budget audits.
- ESLint: no errors; one pre-existing internal-navigation warning in StudyAccount.
- 19 unique destinations from the review page resolve with HTTP 200 locally.
- Inventory: 12 certification paths, 1,090 questions, 200 books and 1,000 discoveries. No inventory issues.
- Desktop and mobile screenshots visually inspected: homepage artwork pairing, complete artwork viewer, mobile viewer and optional room orientation. Image assets retain their original proportions.
- New browser interactions pass at 1440×1000 and 390×844: full image/zoom/Escape/focus return, helper preserving original text across reload with no AI request, private display labels leaving original sessions untouched, temporary Quiet artwork and newer-path notebook return links without starting a round.
- Public regression suite: 146 of 148 checks passed initially on the production preview. The two AI Atlas contrast failures exposed color interpolation during filter selection. Removed the transition and increased touch targets; both failing checks pass on the final production build, together with six refinement interaction checks. Earlier isolated development-selector instability did not reproduce in three targeted repeats or the production run.
- Private invitation initialization was excluded from this public preview run because its feature flag is disabled locally. It was not changed by this batch.
- Existing homepage tests were aligned with the already-approved layout: the atlas starts open, its canvas stays inside its content panel, contact content fits the narrower side, and resource cards are measured together after layout settles. Functional assertions remain.

Raw production assets: see the generated `check-learning50-size` result. Image and packed-book bytes remain 13,280,283 and 90,791,154 respectively. This is a local build check, not Vercel account storage or billing measurement.

## Owner walkthrough

1. Choose a starting point on the homepage.
2. Open an artwork; zoom, fit and close it with Escape.
3. Open New here? in one learning or engineering room.
4. Return to saved work; optionally give one item a personal display title.
5. Try Quiet artwork and restore it.
6. Try the question helper with a small nonconfidential example.
7. Review the public-link/feedback preview before sharing anything.
8. Record any hesitation in `/guide/local-review`. Nothing is automatically submitted.

Human feedback and publication are separate. No real participant response, exhaustive accessibility certification, or re-verification of all sourced discoveries is claimed.
