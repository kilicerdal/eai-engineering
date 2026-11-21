# Hourly local Art Room review — November 21, 2026, 07:38 Eastern

Scope: bounded navigation and accessibility refinement to existing paper studies. Nothing published, pushed or deployed.

## Reproduced issue

On a 390-pixel phone viewport, the first sheet’s figure and credit block occupied 716 pixels before the process account. There was no direct link between image and account. All 24 process sections also shared the same `working-process` ID, preventing an unambiguous account destination.

## Local correction

Added a quiet “Read this sheet’s account” link above each reproduction and a return link from its account to the same whole sheet. Both destinations have object-specific IDs and programmatic focus targets. Process regions include their editorial role in their accessible name. The existing hash handler opens the correct parent sheet on reload. No artwork, scholarly wording, saved-work format, image crop or feature has been removed.

## Verification

- Inspected mobile rendered screenshots before and after the correction.
- New browser check verifies the Raphael sheet’s exact account/image destinations, keyboard focus, viewport position, 24 unique process IDs and reload into the correct open sheet without horizontal overflow.
- All 11 works-on-paper browser checks and four data checks passed, covering markers, fullscreen return, comparisons, saved detail notes, optional image hiding, paired views and deferred image loading.
- Scoped ESLint, TypeScript, production build, packed-book audit and bounded asset budgets passed.
- All 200 books and existing saving formats remain unchanged. `git diff --check` passed.

The wider 110-outcome upgrade remains in progress. This is a refinement of existing navigation, with no completion-count inflation. Local preview: http://127.0.0.1:3038/study/art/on-paper.
