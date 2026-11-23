# Art Room pre-release finishing pass

Scope: the ten approved follow-up recommendations. Local only; no commit, push or deployment. This is one finishing pass, not a count of all historical improvements.

## Changes and coverage

1. **Storage failure behavior.** Browser checks simulate quota failures, denied writes and damaged recovery records. Active text remains visible, saved records remain intact and damaged recovery data is not overwritten. Saved-record quota failures use a readable copy-before-leaving message. Saving waits for recovery loading to finish.
2. **Interrupted visits.** Tests close the actual editing tab, reopen a new tab in the same browser context and verify unfinished argument, comparison and detail writing. These are tab-closure checks, not a promise of recovery after disk loss, cleared storage or a complete browser crash.
3. **Real two-tab editing.** Two pages in one context use actual storage events for saved edits and deletion. New and existing draft editors compare the recovery entry with the version they loaded before writing or clearing it. A different tab’s copy is retained, with the active text still visible. Argument deletion now keeps the editor identity and draft; an explicit action can save it under a new ID. Synchronous checks improve sequential cross-tab safety; browser local storage is not a transactional database or a guarantee against every simultaneous process race.
4. **Capacity.** Exercises 30 collections, 40 arguments, 80 bookmarks and 40 long comparison notes, including filtering and a complete reading export. Uses synthetic writing only.
5. **Keyboard focus.** Tab/Enter checks cover argument creation, removal and Undo, bookmark removal and Undo, collection preview/cancel/apply, and conflict choices. Focus returns to restored writing or the surviving control. Drawing-detail saves focus the saved annotation. macOS WebKit uses Option-Tab to include links and disclosure controls in keyboard navigation.
6. **Enlarged text and reflow.** Reviews 390- and 720-pixel viewports with larger Art Room text and a doubled root font size. The 720-pixel layout represents the reflow width of a 1440-pixel window at 200% zoom; this is not a native browser zoom or physical-phone test. Long labels and action buttons wrap without horizontal page overflow.
7. **Multipage printing.** Comparison entries can split across pages instead of forcing an entire long entry to stay together. Headings stay with following text, source URLs wrap and disclosure state is restored after printing. A 40-note, 35-page Chromium PDF retains all numbered comparisons in extracted text. Sample rendered pages are visually inspected separately from text extraction.
8. **Older backup round trips.** Three authored fixtures represent original gallery V1, early personal V1 and research V1 records without newer optional metadata. Each imports through the UI, permits a note revision, exports a complete backup and restores the writing and collection fields. These are representative schema fixtures, not claimed historical files from a real visitor.
9. **Save-status wording.** Argument, comparison and backup instructions distinguish saved writing, separate unfinished recovery copies and reading exports. The backup action says the download is prepared rather than claiming the file was stored on disk. The Backup deep link now opens the actual download/restore disclosure.
10. **Firefox verification.** Retried the installed browser; it still exits before any page loads with “Could not find profile folder.” Firefox remains configured and pending, never counted as passed. Chromium and WebKit perform the working-engine checks.

## Evidence

- Tests: `tests/browser/art-finishing.spec.ts`, included in the working-engine regression and standard CI configuration.
- Fixtures: `tests/fixtures/art-legacy/`.
- Ignored local evidence: `artifacts/art-finishing/`.
- Preview: http://127.0.0.1:3052/study/art
- Final validation results are recorded below after the clean candidate run.

Earlier new-workflow attempts exposed the deleted-argument identity bug, corrected in the application. Test setup also needed to open both detail editors before either generated a shared recovery copy, and WebKit keyboard journeys needed its native Option-Tab behavior. Backup tests now assert that the improved deep link opens the tool rather than toggling it closed. Earlier failures are retained in logs and are not counted as successful checks.

The first broad run passed 316/318 checks. Both failures were the same new painting-note helper toggling a panel while its hash handler was opening it (Chromium/WebKit). The helper now waits for the visible editor, keeping the strict recovery-copy assertions. Earlier focused runs passed 54/54 before the final additions. All failed-run logs remain separate from the final candidate result.

## Final candidate verification

- **318 browser checks passed, zero failed**, in 3.3 minutes: 261 Chromium checks across the Art Room and 57 WebKit checks across the writing and finishing packages. The finishing specification adds 32 checks per working engine.
- **1,190 unit tests passed, zero failed.**
- Scoped ESLint, TypeScript, production build, packed-book audit, existing raw asset budgets and `git diff --check` passed. No size allowance was increased for this pass.
- Desktop and emulated-phone screenshots reviewed, including the final deleted-argument choices and enlarged editor. Print pages 1, 2 and 35 rendered and reviewed; extracted PDF text contains all 40 comparison numbers.
- Firefox still fails at runtime startup and remains pending. No Firefox application check is claimed.
- Preview remains on port 3052. HEAD remains `aef1719f3e62857a7d2b76f4594cf328cbd001ff`. No commit, push or deployment was made.
