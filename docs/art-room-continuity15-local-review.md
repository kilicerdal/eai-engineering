# Art Room: 15 local reading and navigation refinements

Date: 2026-11-20. Based on published commit e8efd37. Local preview: http://127.0.0.1:3038/study/art. Not published.

## Delivered

1. Alternate-title matching, including La Gioconda / La Joconde, La Pie and Las dos Fridas; canonical catalog records remain unchanged.
2. Up to three plausible closest matches on a failed search; bounded edit-distance matching rejects unrelated or oversized queries.
3. One essay outline combines section links and previews, reached from the whole-study index. Removed the second essay menu.
4. Removed the duplicate bibliography disclosure and the separate reading-depth help disclosure. Optional research, image credits and licenses remain available.
5. Existing unfinished reading positions remain protected during passive browsing. Resume or explicitly choose “Start reading here instead” before replacing the position. Direct saved-section links resume deliberately.
6. Each painting remembers its Introduction / Full study / Research choice within the tab. Direct essay or research links reveal their target even when another depth was selected.
7. My Art shows writing and visit-management summaries only when corresponding records exist.
8. An empty gallery has one starting invitation; empty management tools are folded away, with backup and restore still reachable by their existing anchor.
9. Recently opened paintings are explicitly distinguished from recorded essay and visit progress.
10. Incomplete comparison selections survive filtering, pagination, reload and visits to individual studies within the tab. Clear comparison is explicit.
11. Definition links provide a return to the exact originating paragraph, with keyboard focus restored there.
12. Essay citations provide a return to the originating reference passage, with keyboard focus restored there.
13. Closed research topics state their actual entry count or “Object record & limits only.” Counts are not presented as verified technical dossiers.
14. Tablet reading uses a single comfortable text column and a two-column optional outline; larger-text checks included.
15. Shortened repetitive instructions in reading-depth, reading-progress and My Art introductions.

Browser testing exposed and corrected a delayed-content deep-link issue: My Art's backup anchor can appear after local storage hydration. The frame now reveals the target and its disclosure ancestors once that content is mounted.

## Validation

- 1,082 unit tests passed.
- 106 Art Room browser tests passed, including existing notes, drafts, galleries, complete backup restore, tours, comparison controls, image proportions and accessibility checks.
- Scoped ESLint and TypeScript passed.
- Production build and existing asset budgets passed without raising limits.
- All 112 studies and 1,922 required legacy anchors passed the anchor audit.
- Inventory audit retained 200 books, 1,000 discoveries, 12 certification paths and 1,090 questions.
- Local screenshots captured at 390, 768, 1024 and 1440 pixels for collection, empty My Art, whole painting, essay passage and research. No horizontal overflow or browser exceptions across those 20 views.
- Visually inspected phone My Art, research index, phone/desktop outlines and tablet essay reading. Original artwork files and backgrounds are unchanged.

Artifacts: artifacts/art15/ (ignored local evidence). Logs: /tmp/art15-{build,browser,unit,types,lint,inventory,audit,anchors,visual}.log.

No historical essays were rewritten, new factual verification claimed, saved-work schema changed, commits pushed, or deployments created in this round. Comparison drafts and depth choices are tab-local conveniences, separate from the existing saved-work backup format.
