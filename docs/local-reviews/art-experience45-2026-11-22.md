# Art Room — forty-five deeper-use refinements

2026-11-22. Local only. Preview: http://127.0.0.1:3051/study/art

This is the approved 45-item follow-up package, separate from the preceding 34 refinements and earlier Picasso/entrance work. The JSON ledger records each implementation; this is not a historical count of all site work.

## Implemented scope

1. **Shareable drawing searches.** useArtFinderUrl + ArtPaperFinder retain sheetQuery/sheetGroup in the URL.
2. **Shareable visit selections.** ArtVisitChooser retains visitQuery/visitGroup in the URL.
3. **Return to a drawing result.** ArtPaperSelectionNav focuses the exact matching result and retains the search.
4. **Browse a drawing selection.** Previous/Next links follow the filtered paper-object sequence.
5. **Chronological gallery order.** Earliest/latest use the first recorded year; original uncertain date labels are retained and unknown dates sort last.
6. **Painter-name gallery order.** Painter A–Z is an optional URL-persisted order; curated order remains default.
7. **Responsive facet counts.** Painter/era/subject/mood options count matches under the other current choices.
8. **Explain drawing matches.** Results identify matching title, maker, material or combined-record text.
9. **Whole-image overview.** The enlarged viewer includes a proportional whole-image map with a viewport rectangle.
10. **Zoom around an inspected point.** Controls preserve the view center; pinch magnification anchors at the touch midpoint.
11. **Preserve center on resize.** ResizeObserver and normalized center coordinates preserve the inspected area across viewport changes.
12. **Resolution indicator.** Shows displayed CSS dimensions against actual source pixels; explicitly distinguishes screen density and new detail.
13. **Hide fullscreen controls.** A persistent show/hide control restores the toolbar; Escape continues to close the viewer.
14. **Detail-view links.** Copy canonical work URLs with bounded magnification/position, including a separately identified verso where available.
15. **Deliberate last-detail return.** Tab-local image position offers an explicit return action; ordinary opening still fits the whole image.
16. **Swap comparison sides.** Swaps works and their independent views while respecting the existing unsaved-writing guard.
17. **Independent comparison magnifications.** Each side retains its own bounded position/scale and survives view switching.
18. **Named suggested comparisons.** Visible buttons use the actual editorial comparison question instead of numbered Pair labels.
19. **Comparison selection summary.** First/second titles appear near the viewing controls.
20. **Complete comparison-view sharing.** Explicit copy action includes pair, lens, visible sides, independent views or shared detail/physical-size mode, without writing.
21. **Search notebook writing.** Search existing saved notes, before/after reflections and detail observations, with shared normalization.
22. **Notebook writing-type filters.** Choose personal notes, reflections or detail observations, combined with the existing collection filter.
23. **Exact matching notebook text.** Contextual snippets and safe React mark elements reveal distant matches; opening a result scrolls to its first marked passage.
24. **Saved paintings by collection.** My Art can show the saved subset belonging to a collection without modifying memberships.
25. **Duplicate a collection.** Unique named copy preserves the original IDs, sequence and introduction; collection limits remain enforced.
26. **Direct exhibition positioning.** Position selector moves a work directly, retaining the existing Earlier/Later controls.
27. **Undo a sequence move.** Restores the prior sequence only if a newer order has not superseded it.
28. **Exhibition introduction recovery.** Separate bounded drafts recover after reload and detect newer saved introductions; Save remains explicit.
29. **Per-entry restore decisions.** Conflicts in notes, passages, arguments, reflection fields, detail notes, comparison notes, collection names/introductions and reading positions require choices.
30. **Restore change preview.** Lists identical, additive/new and conflicting entries; a concurrently changed browser copy invalidates the preview before writing.
31. **Search museum-guide choices.** Title/painter search shares catalog normalization and aliases.
32. **Guide from personal collection.** Explicitly select the first six works; larger collections receive a clear limit message and saved collections remain untouched.
33. **Retain an unfinished guide.** Validated tab-local stop IDs, order, grouping and print layout survive refresh and returning from a study.
34. **Two print layouts.** Compact reference layout or spacious note-taking layout, using the existing print flow.
35. **Print page breaks.** Artwork records, questions and note spaces avoid breaking apart, with dedicated print CSS.
36. **Mixed-institution guide clarity.** Identifies multi-collection selections and optionally groups printed stops by collection without promising current display.
37. **Formatted study citation.** Copy editorial title, edition, canonical URL and actual consultation date; no invented personal author.
38. **RIS / BibTeX export.** Select essay references for local exports; unknown publication/author fields remain absent.
39. **Institutional identifiers.** Three painting numbers newly checked against institutional pages; existing 24 paper accession records retained. No URL IDs are inferred as accession numbers.
40. **Catalog abbreviation help.** Existing object-literacy guide explains inventory/accession/catalog numbers and catalogue-raisonné edition context.
41. **Separate editorial and reference dates.** Essay sources distinguish edition, editorial-review date, object-metadata check and consultation date; unavailable first-publication date is stated as unrecorded.
42. **Corrections linked to discussion.** Current correction records link to affected existing essay sections when an identifiable passage exists; older change entries retain source and study routes.
43. **Browser-reading speed.** Five supported rate choices, with a clear stop-on-change behavior.
44. **Browser voice selection.** Available voice list reacts to voiceschanged; identifies device voices without claiming every voice is local.
45. **Section audio playback.** Readable complete transcript segmented without dropping text; section playback, previous/next and continuous introduction playback.

## Preservation and limitations

- Original catalog IDs, artwork files, image permissions, subject gates, personal records and backup format remain in place. Picasso image clearance remains pending; no reproductions were added.
- Recovery drafts, museum-guide tab state and image-view tab state are separate conveniences. They are not silently added to saved Art Room backups. Detail/comparison links never include private writing.
- Publication dates and attribution identifiers are not invented. The three newly transcribed painting identifiers are a bounded addition, not a claim of complete accession-number coverage or scholarly peer review.
- New identifier sources checked November 22: [Rijksmuseum, Milkmaid, SK-A-2344](https://www.rijksmuseum.nl/en/collection/SK-A-2344); [Mauritshuis, Girl with a Pearl Earring, inventory 670](https://www.mauritshuis.nl/en/our-collection/artworks/670-girl-with-a-pearl-earring); [Met, Autumn Rhythm, object 57.92](https://www.metmuseum.org/art/collection/search/488978). Existing reproduction terms were not changed by these metadata checks.
- Browser-speech functionality is checked with a deterministic browser mock. Actual voice quality, service availability and device-specific speech behavior still depend on the browser/device.
- Desktop/phone checks use Chromium viewport emulation, not a physical-phone inspection.
- Raw build allowance explicitly adds 64 KiB JavaScript and 8 KiB CSS for this package. Image and packed-book limits are unchanged. This is not a hosting-cost estimate.

## Validation

Completed verification:

- Full unit suite: **1,181 passed, zero failed**.
- Complete Art Room browser regression: **204 passed, zero failed** across 25 test files.
- After final presentation fixes, **30 affected checks passed** again. These are reruns, not additional unique tests.
- Production build, TypeScript, packed-book validation, scoped ESLint and bounded asset budgets passed; no image/book budget increase.
- Desktop 1440 × 1000 and phone 390 × 844 screenshots opened and visually inspected for gallery sorting, notebook, exhibition editor, museum guide, citations, fullscreen inspection, exact notebook matches and backup conflicts. Compact/spacious print-media layouts also inspected. Keyboard, resize continuity, text enlargement and scoped WCAG A/AA checks are covered in browser tests.
- Clipboard detail-link check confirmed a canonical work URL and excluded private writing.
- Browser speech is a mocked functional check, not a listening-quality claim. Missing voice-discovery APIs retain readable transcripts.

 Browser evidence and screenshots: `artifacts/art-experience45/`; rerun with `npx playwright test --config=artifacts/art-experience45/playwright.config.ts` while the production preview runs on port 3051.

Initial browser checks exposed case-sensitive raw search text in the new notebook/guide code; both were corrected to shared normalization. Visual inspection found low-contrast viewer resolution text and a constrained overview ratio; these were corrected. Two early overlapping browser runs collided in their artifact directory; they were stopped and their incomplete results are not treated as release evidence. Subsequent validation runs use one suite process.

Nothing committed, pushed or deployed.

Final review also corrected a retained sticky essay menu overlapping the new citation heading in the stacked reading column. Two regression expectations were updated against the actual current UI: the enlarged image selector now distinguishes the inspected image from its new overview; an older search test now expects the existing 124-work catalog and “works” result label. Museum-guide reordering is explicitly disabled while institution grouping determines the printed order.

The first full 204-test run completed with 197 passes and seven failures. Five failures concerned obsolete labels/selectors or changed scholarship ordering; their assertions were checked against the current UI and updated. The speech mock lacked the newly used voice-discovery API; the application now also tolerates absent discovery/event methods without losing its transcript. The final-page continuity test now enters the real shareable page-11 URL instead of racing hydration with an injected session record. These failed/incomplete runs are not reported as a passing final suite.

Additional visual checks cover both conflict versions on desktop/phone, highlighted notebook passages, the viewer overview, working clipboard detail links and both print layouts. Final styling gives the sticky viewer toggle an opaque dark background over light artwork, removes code-block styling from personal-note comparisons, and hides screen-only support footers in museum-guide printing.

Final candidate: the production build and final three scoped style checks passed after the last two CSS overrides. Actual final phone screenshots confirm plain-text conflict versions and a white Studio print container. Full 204-test, 30-test follow-up and final 3-test follow-up logs are retained separately in `artifacts/art-experience45/`; these reruns are not added together as unique tests. The preview remains running on port 3051.
