# eAI and dAI: clearer journeys — local review

Local implementation only. No deployment is authorized by this change.

## Recommendation coverage

1. Homepage: two optional chapters shorten the default journey. All original artwork and workspaces remain mounted, and legacy hash links open their chapter.
2. Learning hub: six room entrances, a Start here / Continue learning shortcut, and an optional embedded Tutor. Reading and certification saves also qualify for Continue learning through the existing read-only projection.
3. Headers: desktop study navigation uses one row where space permits; certification introduction is shorter.
4. Resume: removed the redundant current-question button while preserving the return panel and active session.
5. Contextual help: the question glossary shows relevant matches; unrelated first entries no longer appear by default. Explicit full-glossary search remains available.
6. Answer feedback: result, answer, short explanation and official source precede the deeper help drawer. Next question receives the primary treatment.
7. Counts: catalog and coverage text distinguish core questions from additional scenario questions; no bank contents changed.
8. Saving: the current status remains visible; normal guidance and recovery are disclosed on request. Unsaved and failed-write guidance stays visible immediately.
9. Project evidence: enlarge previews in a keyboard-dismissable dialog with original proportions, or jump directly to recorded evidence.
10. Walkthrough: `/guide/experience-review` records visitor-reported outcomes and elapsed times for three tasks. It is in-memory only, exports JSON, sends no responses, and does not supply invented visitor feedback. Human walkthrough remains optional and has not been represented as complete.

## Verification

- 991 unit tests passed.
- 108 browser checks passed against the local production build, including 10 new checks.
- Production build and raw asset budgets passed.
- Typecheck passed. Lint has no errors and the existing StudyAccount navigation warning.
- Inventory: 12 certification paths, 1,090 questions, 200 books, 1,000 discoveries; no issues.
- Structural certification quality audit: 1,090 questions checked, zero reported issues. This is not a fresh independent factual review of every question.
- Visually inspected homepage, project composition, learning hub and certification catalog; responsive checks cover 390, 1280 and 1920 px.
- No storage keys or persisted formats were migrated. Browser tests checked saved practice across reload, original reading-record preservation, and visible failed-write guidance.

## Preview

Production preview: http://127.0.0.1:3038
Development server: http://127.0.0.1:3037

No live model comparison or paid API requests were made. Existing locally unavailable AI credentials were not changed.
