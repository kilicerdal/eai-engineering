# Hourly local Art Room review — November 21, 2026, 04:36 Eastern

Scope: one bounded reliability and accessibility correction to existing looking tools. The full 110-outcome package remains in progress. No publication, push, deployment or saved-data migration occurred.

## Reproduced problem

With the optional “Hide sensitive images until I choose to view them” setting enabled, opened Degas’s barre study and selected “Inspect an arcing back.” The viewer was not mounted while its image was hidden, so the command did nothing: no dialog, no explanation and no useful change of focus. Existing painting study tools had the same gap.

## Local correction

A small shared hook now handles inspect/highlight requests for the matching hidden artwork. It announces the next step and focuses the existing “View this sheet” or “Show this painting” button. It does not reveal an image automatically or change the saved viewing preference. Once the visitor explicitly reveals the image, the normal looking tools work. Other artworks do not receive the request.

## Verification

- Reproduced the inert control in the rendered page before editing.
- Viewed desktop and mobile screenshots after the correction: the next-step message is readable, focus moves to the reveal button and neither viewport overflows horizontally.
- Added a drawing test covering the message, focus, continued hiding, unchanged saved preference and successful inspection after explicit reveal.
- Added an existing-painting test using its actual “Inspect the interval” button.
- 24 focused browser checks passed, covering paper studies, existing learning tools, saved notes, viewing preferences and welcoming-priority flows.
- TypeScript, scoped ESLint, production build, packed-book and bounded asset-budget checks passed; `git diff --check` passed.

The evidence is appended to existing looking-tool outcomes without increasing the reported implemented-outcome count. Screenshots remain in `artifacts/art-room/on-paper/hourly-hidden-inspect-*.png`. No user action is required.
