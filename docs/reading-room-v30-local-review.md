# Reading Room V3.0 — local review

Preview: http://127.0.0.1:3024/study/reading#books

## Catalogue

200 complete English-language editions: the original 100 plus 100 additions. Primary-source RDF records, English language, US public-domain status, full original licenses, source hashes, word counts and paragraph anchors were checked. Original books and source bytes remain unchanged; the V2.9 baseline fixture verifies this separately. New source metadata is recorded in `reading-sources-v30.json`.

Candidate titles were checked against the source records; mismatched IDs and duplicate editions were excluded. New starts were reviewed to avoid contents, publisher credits and late appendices. Text and JSON remain lazy-loaded reader assets; full texts are not embedded in catalogue cards.

## All 25 improvements

1. Simple/expanded library view, with active choices retained.
2. One returning-book invitation, with existing Continue reading retained.
3. Just browsing hides personal progress/details and reading estimates in Discover.
4. Preferred starting room in Library settings; remembered for future visits.
5. Contextual help disclosures explain view choices and optional tools.
6. Editorial reading-style filter in expanded Help me choose.
7. Another exact early source sample where an appropriate second passage exists.
8. Compare two opening passages within the existing comparison dialog.
9. Author's shelf within book reading guides.
10. Language and structural guidance, without easy/hard rankings.
11. Optional spoiler-light content notes for individually reviewed titles; other titles explicitly say not individually reviewed. No claim of exhaustive coverage.
12. Approachable starting points linked to original source anchors; front matter remains available.
13. Browser fullscreen control, separate from Focus mode, with unavailable/error fallback.
14. Visit-only appearance, return to saved settings, or explicitly keep the trial settings.
15. Bookmark confirmation with optional name and guarded undo of only the newly created bookmark.
16. Temporary three-passage tray, comparison and saving to the existing notes system.
17. Current-chapter beginning control with the existing return-to-origin path.
18. Three reading layout presets, retaining individual controls.
19. Optional read-aloud using English voices reported local by the browser; start/pause/resume/stop, rate and voice selection. No autoplay; source chunks preserve every character. Availability depends on the browser/device.
20. Whole-book notes stored separately from anchored notes, visible in book details and My Notebook.
21. Earlier reading records retain old position and links to original reflections. Starting a new reading updates shelf/position transactionally with rollback. Earlier-place preview does not overwrite the current saved position.
22. Compact multi-book collection organiser with search, incremental results and add/move actions that retain other memberships.
23. Private Recommended by field in the book journal.
24. Search a note's source text and optionally attach an unanchored thought without changing its text, quote, date or ID; stale edits are rejected.
25. Unified storage panel gives counts, approximate size, backup coverage and preparation/change status. It explicitly distinguishes local browser data, preparation and actual download; no cloud-sync claim.

## Preservation and validation

- Existing storage keys, version-1 backup format, notes, bookmarks, collections, queue, positions, dedications, preferences and backgrounds retained. No startup migration.
- New settings/book fields/history are optional and strictly validated. Collection and queue capacity support the full 200-book catalogue.
- Backup merge keeps current private fields, appends non-overlapping histories and remaps imported reflection references when note IDs must be renamed.
- 448 automated tests pass, including all 200 source hashes/licenses, all original 100 metadata/source baselines, new history rollback, malformed-data rejection, source-sample anchors and speech-chunk preservation.
- Type checking and production build pass. ESLint has no errors; only the pre-existing unrelated StudyAccount navigation warning remains.
- Local UI verified: 200 books, simple/expanded view, just-browsing visibility, reading-style filtering, new Lady Susan edition, author shelf, additional source sample, content-review disclosure, private book-journal save/draft guard, bookmark naming/undo, temporary theme/preset restore, passage tray/save, local voice start/pause/resume/stop, bulk membership update, notebook book journals, unlinked-note source search, and storage coverage.
- Reader route now includes a loading boundary for Next.js instant navigation.

Local only. No V3.0 commit, push or production deployment performed.

Final production-preview check: earlier-reading links use the framework query state; the earlier-place banner and Return to my current reading control were verified. No current reading position is written while previewing an earlier reading.
