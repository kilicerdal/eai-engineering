# Works on paper — local implementation checkpoint

This is a partial checkpoint within the owner-authorized 110-outcome package. It is not a completion or release record.

- Added a local `/study/art/on-paper` room containing 24 individually sourced works on paper across six artist groups. The retained 124-work painting catalog is not renumbered or replaced.
- Authored 24 object-specific process accounts and 72 editorial looking prompts, separating visual observation, institutional documentation, and uncertainty.
- Added 12 contextual material definitions and three optional short routes. Full sheets retain their proportions, and deeper research is collapsed until requested.
- Retained School of Michelangelo, After Michelangelo and Attributed to Raphael labels. Three Kollwitz works are correctly called prints, not drawings. A source photograph presenting both sides of a Kollwitz sheet is labeled as a paired reproduction.
- The image contact-sheet review caught a mismatched Raphael image from a similarly named Commons record. Replaced it with the actual Met object 64.47, obtained from its object page. Added an identity regression assertion.
- Fullscreen now returns to the original reading scroll position and focus without scrolling the trigger into a different position. Reverse-side switches clear obsolete image failures; inspect requests return to the front.
- Added a bounded 12 MiB asset allowance; the 24 full images and thumbnails occupy approximately 11 MiB. This does not measure Vercel account storage or costs.

Validation at checkpoint: 1,111 unit tests passed; TypeScript and scoped ESLint passed; production build and packed-book/size checks passed. Desktop 1440×1000 and mobile 390×844 browser checks reported no page errors, no horizontal overflow and zero fullscreen-return scroll displacement. Screenshots were inspected, revealing missing page gutters; gutters were corrected and require the next screenshot pass.

Pending: finish the drawing/painting comparison research, six artist-practice accounts, recto/verso acquisition review, detail-note previews, independent comparison zoom, full-package ledger verification and remaining content/source checks. The O’Keeffe image-rights conflict was resolved for release purposes by making the three new studies reference-only, keeping their texts, IDs and institutional image links. The local files are preserved outside the publishable directory. No deployment was performed.

## Verified checkpoint results

- 1,111 unit tests passed.
- 101 browser regression checks passed after correcting stale expectations about the expanded collection and the explicitly opt-in image-hiding setting.
- TypeScript passed; full ESLint reported zero errors and one pre-existing `StudyAccount.tsx` navigation warning.
- Production build, packed-book and bounded asset-budget checks passed.
- Collection metadata, museum-study and editorial-depth audits reported no issues. Nine new image-dimension records were corrected, rather than weakening the dimension comparison.
- Desktop and mobile screenshots were viewed after adding page gutters. Independent comparison surfaces were inspected visually; zoomed views are explicitly labeled as details.
- The ledger currently records 38 implemented/refined outcomes, with final package verification still pending; 72 outcomes remain pending. The 24 paper objects are available in their separate local room and have not been silently inserted into the retained painting catalog.

The remaining package has not been released. The preview is at http://127.0.0.1:3038/study/art/on-paper.


## Finishing pass — November 21

The 110-outcome checklist now maps each requested outcome to its local implementation, refinement or retained capability. This is **not a claim that 110 wholly new features were built**. Earlier checkpoint statements above remain historical records.

Added or completed in this pass:

- Fifteen individually qualified drawing connections: twelve with paintings, plus pastel, engraving and tomb/design relationships. Preparatory, workshop, indirect and later-response relationships remain distinct. Target images without cleared reuse are linked at their institutions rather than copied or invented.
- Two V&A notebook encounters and seven object-specific documentary contexts, including named attribution disagreements, worked-over hair, a theatrical stage plan, print circulation, a missing cartoon and Degas’s study sequence.
- Two verified reverse photographs with independent geometry, explicit front/back controls and front-only detail markers. A paired Kollwitz photograph remains labeled as a paired source view.
- Forty-eight new focused fact entries for Bosch, Bruegel, Velázquez, O’Keeffe and their twelve studies. The collection now has 253 fact entries. Each separates documentary context, visual interpretation, significance and limits.
- Searchable drawing accounts, notebook encounters and documented connections with individual result types and exact anchors. Drawings has an entry in the existing navigation.
- Drawing journals and coordinate detail notes with previews, retained draft recovery, notebook inclusion and backup round trips. The 124 saved-gallery identities remain unchanged; the observation validator admits only the 24 specifically known paper IDs in addition to the existing works.
- Shared optional image hiding on connection views, corrected spoken/visible labels, no empty “more entries” disclosure, and more precise institutional links for The Spinners and The Peasant Wedding.

Validation:

- **1,117 unit tests passed; 114 browser checks passed.** The latter cover the sheet room, new connection views, drawing-note persistence, exact search return, retained painting controls, saved reading work and wider Studio flows.
- Production build, TypeScript, packed-book and asset budgets passed. Scoped lint passed; full lint retains one unrelated pre-existing StudyAccount navigation warning.
- All 124 catalog records and 26 separate paper photographs passed source/geometry/reuse-field integrity checks. The paper full-image set is 10,978,320 bytes, within its existing 12 MiB allowance.
- Desktop and phone screenshots were inspected. Reviewed pages have no horizontal overflow and zero scoped axe accessibility violations after corrections.
- The retained learning inventory has 200 books, 1,000 discoveries, 12 certification paths and 1,090 questions. Packed book bytes remain 90,791,154.

Editorial limits remain explicit: availability checks are not authentication, blocked museum pages are not automatically broken links, and publisher-text changes still require comparison before changing historical claims. This work does not claim independent specialist peer review. Fifteen catalog studies remain reference-only where image reproduction permission is not established. No generated conservation state, speculative owner or invented intermediate drawing fills those gaps.

**Local only — no commit, push or deployment in this finishing pass.**

Preview: http://127.0.0.1:3038/study/art/on-paper
Connections: http://127.0.0.1:3038/study/art/on-paper/connections

### Hourly review — November 21, 12:48 p.m. America/New_York

Reviewed the completed 110-outcome record, subsequent twelve reading refinements, dirty tree and rendered local painting study. Found one reproducible navigation defect: choose Introduction depth, enter Look first, then follow the artwork caption’s “Read the image description” link. The fragment changed but its research panel remained hidden because the reading navigation had been unmounted by Look first.

A bounded local fix now leaves Look first when that caption link is explicitly chosen. The existing reading navigation remounts, opens the research depth and scrolls to the structured description. Tested twice in the same visit, including an unchanged URL fragment. No new storage, content, images or services were introduced.

Verification: 19 affected browser checks passed (including phone navigation, whole comparison images, reading resume and editorial accessibility); production build, TypeScript compilation, packed-book validation and unchanged asset budgets passed; scoped lint and `git diff --check` passed. Before/after rendered screenshots were inspected in `artifacts/art-room/hourly/2026-11-21-1248-description-{before,after}.png`. Logs: `/tmp/art-hourly-1248-{build,browser,lint}.log`.

No publish, push or deployment. Previously recorded source-access limits remain unresolved and unchanged. Hourly reviews remain authorized only until November 22 at 10:00 a.m. America/New_York; this is one bounded defect correction, not a new count of the completed 110 outcomes.
