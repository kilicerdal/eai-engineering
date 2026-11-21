# Hourly local Art Room review — November 21, 2026, 08:42 Eastern

Scope: bounded terminology correction in existing drawing and print looking controls. Local only; nothing published, pushed or deployed.

## Observed issue and correction

Opened Kollwitz’s *Sharpening the Scythe* in the rendered room. Its three looking buttons referred to “the whole painting,” and its enlarged viewer offered “Fit whole painting,” although this is a print. These labels obscured the distinction the room asks visitors to learn.

Paper-study highlights now say “whole sheet.” The shared viewer identifies drawings and prints as sheets in its fit control and editorial looking guidance, while retaining painting terminology for existing paintings. The correction uses the existing work-type metadata; it introduces no new classification or scholarly claim. No image, crop, source record, stored note or preference changed.

## Verification

- Viewed before/after rendered screenshots of the print’s enlarged viewer.
- New browser check verifies paper highlights, sheet-specific looking guidance, successful fit-to-whole return at 1× and retained “Fit whole painting” wording on the existing Leonardo painting.
- All 20 focused paper/Looking Room browser checks and four paper-data checks passed, including mobile navigation, image deferral, optional hiding, comparisons, saved notes and fullscreen return.
- Scoped ESLint, TypeScript, production build, packed-book audit and bounded size checks passed; `git diff --check` passed.

This refines existing controls without inflating the 110-outcome completion count. The full package remains in progress. All 200 books and saving formats remain intact. Preview remains at http://127.0.0.1:3038/study/art/on-paper.
