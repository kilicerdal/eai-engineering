# Welcoming learning: 24 accepted improvements

Local-only batch. No commit, push or deployment. Existing work, 200-book delivery assets, backgrounds and original room storage formats remain intact.

## First twelve

1. Help me choose: one intent question gives one destination, on Start here and inside optional footer help.
2. First-visit welcome: dismissible and remembered in the separate comfort copy; regular starting choices remain immediately available.
3. Evidence labels: interactive models, dated records, authored examples and optional AI reply tools use consistent scope wording. A browser calculation is classified as a model, not generated text.
4. Restore previews: workshop, understanding notebook, learning-space and comfort backups now require reviewed apply/cancel. Reading Room's existing preview adds new-note/bookmark/shelf counts. Existing merge/conflict guards remain authoritative.
5. Optional personal titles: sidecar labels on connected notebook cards and workshop takeaways; original titles and items stay unchanged.
6. A sample before writing: optional readonly writing starter, clearly separate from the response field and not asserted as an answer.
7. Empty-state wording: Keep your first question, with a concrete safe-retry question and a small next step.
8. Larger text across supported pages: optional footer preference affects common learning text; detailed book-reader size/spacing/theme controls remain separate.
9. Everyday labels: Make something small, Something you made and Return note replace new-facing artifact jargon. Stored IDs and old entries remain valid.
10. Was this useful?: private helped/unclear/different reflections and per-question browser-saved drafts, with optional next help; no grading or automatic submission.
11. About this room: one optional footer disclosure describes purpose, AI scope, saving and connection limits for the current room.
12. First-visit walkthrough: local QA covers chooser → activity → save → leave/return → preview/cancel → reader state; a reusable review guide is available below.

## Next twelve

13. Safe temporary exploration: workshop's Just trying mode disables draft/keep/restore writes until Ready to keep. It retains writing in the tab, and download remains available. Temporary simulation controls are not a durable save.
14. Undo: recent bookshelf status changes, notebook removals and collection changes offer a 20-second guarded undo. A newer write stops it. Shelf undo restores shelf status; optional saved-at metadata is not rolled back. Restores and reading appearance have their existing separate controls.
15. Show me the difference: saved explanation revisions show added/removed sentence wording while retaining full versions. This is sentence presence, not semantic evaluation; reordering/repeated identical sentences are not highlighted.
16. Gradual hints: workshop nudge/stronger clue plus direct explanation; certification practice can reveal its two existing authored hints together. Timed/assessment answer locks are unchanged.
17. Tempting wrong answers: reviewed certification answers offer the actual selected-choice rationale next to the deciding requirement, without inferring the learner's belief.
18. Challenge feedback: I see it differently saves an alternative interpretation with supporting evidence separately from authored answers and official scoring.
19. One idea in different contexts: familiar, engineering and text-diagram examples of the same retry concept; no learning-style classification.
20. Clear stopping point: workshop Keep, certification results and local-review tasks offer a quiet stop, with one optional saved-work link.
21. Context beside writing: optional example/question beside workshop response on wider screens, stacked on phones; certification reasoning can reveal its exact current question and selected choice nearby.
22. Source guidance: workshop links identify what to look for (RFC section, Alice chapter, WAI notification guidance, relevant evidence/abstract); original sources and dates are retained.
23. Connection fallback: a browser connection signal and practical loaded-content/copy/download guidance. No claim of full offline library support or a service reachability test. Existing loaded local controls and saving remain usable where supported.
24. People-first review: /guide/local-review gives five optional one-task-at-a-time exercises, private observation notes and downloadable invitation wording. No volunteers were contacted; real participant review remains a human review step.

## Isolation and recovery

New key `eai-learning-comfort-v1`: large-text flag, manually dismissed welcome, up to 300 personal labels and 200 private reflections and 200 separate reflection drafts. Strict reads, compare-before-write storage guards, explicit backups, conflict-rejecting merges, no silent eviction. Appearance and intro choices remain current when merging a comfort backup. Room notebooks are not migrated. New personal labels/reflections have their own backup in the footer; they are not silently folded into book/workshop backups.

Restore preview rejects malformed files and conflicting records before changing storage. Apply checks that current data still matches the reviewed snapshot. Preview reads are protected against late file-read races. The final write still uses each room's own safe-save check.

## Verification

693 automated tests passed, TypeScript passed and optimized build passed on the final local batch. Packed-book audit: 200 books, 400 files, 90,791,154 packed bytes. Lint has no errors and the existing StudyAccount location.assign warning.

Browser checks: first welcome dismiss; one-intent chooser; temporary save disabled then explicit Ready to keep/save; gradual hint; workshop backup download, zero-new-record preview, cancel and reviewed merge; personal title; private alternative interpretation; larger-text DOM size; 390px phone width without horizontal overflow; Reading Room section 4, Large/Spacious/Paper, 2 bookmarks/3 notes preserved; shelf move/Undo back to Reading; Reading Room own-backup preview adds zero notes/bookmarks/shelves; existing completed certification session opened for review without starting/replacing a test; local review guide rendered. No AI requests were sent.

Final follow-up: reflection drafts auto-save by activity/question in the isolated comfort copy, survive switching reviewed questions and reload, and remain separate from kept reflections. Legacy comfort backups without drafts remain readable. Conflict checks also cover imported drafts.

Verified on the final build: a certification reflection draft stays blank on the second reviewed question, returns intact on the first question, survives reload and retains its words when changing helped/unclear. Keeping it creates a separate saved reflection. The explanation difference view shows the actual earlier and revised sentences from existing versions. Returning to Start here does not reopen the dismissed first-visit welcome. Browser console showed no errors during these checks.
