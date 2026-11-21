# Hourly local Art Room review — November 21, 2026, 03:39 Eastern

Scope: bounded accessibility correction within the existing drawing-marker experience. The wider 110-outcome package remains unfinished. No publication, push, deployment or saved-data migration was performed.

## Observed issue

Opened Leonardo’s composition sheet and Raphael’s Madonna study simultaneously in the rendered local drawing room and selected a looking point on each. Both captions had the same DOM ID, `art-selected-detail`. Marker `aria-controls` therefore could not uniquely identify its own description. Markers also referenced that ID before a caption existed.

## Local correction

`ArtViewer` now assigns a React `useId` value to each viewer’s caption. Marker controls refer to that viewer’s caption only when it exists. Hiding a selected description removes the obsolete relationship. The visible layout, image assets, source metadata, gallery IDs and local saving formats are unchanged.

Added a two-open-sheet browser regression proving distinct caption targets, exactly one matching element per target, and removal of dangling controls on deselection. Updated three older tests to locate the visible caption by its component class instead of a globally duplicated ID.

## Verification

- Reproduced the duplicate before editing and confirmed distinct generated IDs afterward.
- Viewed before/after desktop screenshots; the rendering remains consistent.
- 29 focused browser checks passed, including drawing sheets, independent zoom, detail-note reload, existing guided looking, curatorial highlights and desktop/mobile accessibility checks.
- TypeScript, scoped ESLint, production build and packed-book/asset-budget checks passed.
- `git diff --check` passed.

Screenshots and browser outputs remain under `artifacts/art-room/on-paper/` and the local test artifacts. Ledger evidence was appended to the existing removable-annotations outcome rather than inventing a new completion count. No user action is required for this routine local review.
