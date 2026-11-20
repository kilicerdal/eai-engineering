# Art Room: focused museum-reading refinement

Local preview: http://127.0.0.1:3038/study/art

This pass refines the existing Art Room. Nothing is published and no service, painting or image asset is added. Earlier approved local work remains present.

## Changes against the twelve recommendations

1. Painting before controls: depth navigation now follows the painting/introduction; compact headings and fewer explanations above the image. Phone screenshot confirms the complete Mona Lisa composition is visible before reading-depth options.
2. Repeated opening removed: a painting's introduction is shown once; the essay begins developing it. A central-argument disclosure identical to the opening is omitted.
3. Concrete historical context retained: the documented commissioning, setting, audience and acquisition passages from the research package remain intact. Direct essay-outline links and historical-evidence labels make that context easier to locate; this pass does not claim a fresh historical rewrite of every work.
4. Local definitions: tronie, patronage, glazing, sfumato, chiaroscuro and provenance link to their definitions within the section. Native disclosure targets open on direct navigation and keyboard activation.
5. Captions: whole-painting views are distinguished from reference-only works; original proportions and credits remain in comparisons. Existing detail/version captions keep their distinction from the original.
6. Citations: historical evidence, material/technical context and supporting context have different labels. Reference titles include their existing source scope; full scoped bibliography remains available.
7. Biography links: exact titles of represented paintings in biography paragraphs link to those studies. This makes existing career-to-work explanations actionable without adding unsupported influence claims.
8. Comparison conclusions: all nine curated pairs end with their own conclusion distinguishing the pictorial relationship from a claim of identical intentions or documented influence. Custom comparisons receive an honest looking prompt.
9. Scanning: optional essay outlines use the actual opening sentence of each section and link to its intact anchor. Detailed text remains unchanged and available; the outline is closed by default.
10. Precise returns: a full study opened from a short guided tour offers “Continue your guided visit”; comparison-specific returns remain intact.
11. Draft recovery: recovered text can be compared against the still-saved note before choosing Save or Discard. Existing concurrent-edit protection remains.
12. Repetition: each selected looking annotation appears once in the essay rather than reusing the final annotation in subsequent analysis sections. Reading-depth explanations sit in an optional disclosure.

## Checks

- Production build and existing asset budgets pass; no budget changes.
- 1,079 unit tests pass.
- All 95 Art Room browser tests pass, including six new refinement scenarios.
- Scoped Art lint and TypeScript checks pass.
- All 112 built studies retain 1,922 required legacy/new passage anchors, zero issues.
- Editorial structural audit passes.
- Phone and desktop screenshots visually inspected: image-first entrance, essay, comparison and My Art. Capture reports show no page errors or horizontal overflow at 390 and 1440 pixels.
- Original image assets, study content, saved-data schemas, bookmarks, notes and other Learning Studio features preserved.

Evidence: `/tmp/art12-build-final.log`, `/tmp/art12-browser.log`, `/tmp/art12-unit.log`, `/tmp/art12-lint-final.log`, `/tmp/art12-types-final.log`, `/tmp/art12-anchors.log`, and screenshots under `artifacts/art40/` and `artifacts/art-refinement/`.
