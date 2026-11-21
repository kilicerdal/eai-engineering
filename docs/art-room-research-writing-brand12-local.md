# Art Room research, writing and branding refinement — local review

2026-11-20. User approved the twelve proposed refinements and clarified that the logo should be improved too. This package is local only and retains the established eAI/dAI wordmarks and compass/star motif.

## Delivered

1. Comparison pickers use the same accent-insensitive, alternate-title matching as the collection; the current selection remains available when filtering.
2. Scholarship results identify the actual painting, painter or era separately from its editorial essay title.
3. Matching words are highlighted using React text nodes, without injecting HTML or modifying essay text.
4. Passages are grouped under their study; additional matching passages stay available in an optional disclosure. No search results are discarded by grouping.
5. Search pagination uses Previous / Next, current page and the visible study range, retaining query and type filters.
6. Paintings remains selected in navigation while viewing a painting, comparison or era study.
7. Before/After observation-journal drafts recover from separate bounded browser stores. Save remains explicit; conflicts with newer saved fields require review and a deliberate draft choice. Existing painting-note recovery is retained.
8. Changing only an argument's supporting passage now counts as an unsaved edit. Successful new-argument saves reset that selection consistently.
9. Detail-note deletion offers Undo; restoration retains other notes and refuses to overwrite a full three-note record.
10. Reference-only studies omit unavailable coordinate and detail-editor controls while preserving journal responses and any existing note text.
11. The collection introduction describes the permanent selection rather than referring to recently added painters.
12. Shared eAI/dAI logo lockups refine serif wordmark proportions, spacing, subtle separator and the existing compass/star motif. Applied to the homepage header/footer, Learning Studio header and Art Room header. Mobile presentation keeps navigation space available. No artwork backgrounds or image files changed.

Journal recovery copies are separate from the established Art Room backup and saved-work schema, consistent with the existing note-draft model. They remain on the device; no new service or external request was introduced.

## Verification

- 1,084 unit tests and 124 Art Room browser tests passed.
- TypeScript, scoped lint, production build and unchanged asset budgets passed.
- JavaScript: 8,831,536 bytes / 8,834,767 limit; CSS: 626,956 / 641,508. No budget increase.
- All 112 painting studies and 1,922 required legacy anchors retained.
- Inventory retained: 200 books, 1,000 discoveries, 12 certification paths, 1,090 questions.
- Actual homepage, Studio, Art Room and scholarship captures at 390, 768 and 1440 pixels showed no horizontal overflow. Visually inspected phone/desktop eAI and dAI headers, desktop Art Room, mobile scholarship and tablet results/journal controls.
- Existing draft failure, backup/restore, image proportions, subject notices and accessibility tests remain passing.

Local review: http://127.0.0.1:3038/ and http://127.0.0.1:3038/study/art.

Evidence: artifacts/art12brand/ (ignored screenshots); /tmp/art12brand-*.log. No commit pushed and no deployment created.
