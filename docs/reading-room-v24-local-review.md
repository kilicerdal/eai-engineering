# Reading Room V2.4 — local review

Local preview: http://127.0.0.1:3024/study/reading#books
Local only. Do not publish until requested.

## The fifteen requested ideas

1. Librarian’s table: three original editorial invitations selected deterministically each day from nine checked catalogue titles.
2. Read a little first: source-passage previews on compact tiles, with exact reader anchors and edition links.
3. Warmer My Books: Continue reading, Waiting for you, Recently finished, and All saved destinations.
4. Your own words: optional private book sentence, saved as an existing notebook note; save/discard guard in book details.
5. Quiet reading entrance: begin/resume and ten-minute reading choices with no timer.
6. Browse by time: complete-edition groups up to 30 minutes, 30 minutes–4 hours, and over 4 hours, using the slower 200 wpm estimate. Any length remains available.
7. Saved-place glimpse: the actual paragraph from the saved section/anchor, loaded from the unchanged local edition. Missing or failed text loads never substitute an unrelated excerpt.
8. A reading sample before opening: consolidated with #2 as Peek inside, rather than adding a duplicate control.
9. Book connections: three genre/mood-based suggestions in the finished-book flow, with explicit editorial reasons and finished titles excluded.
10. Quote worth keeping: rotating exact source excerpt, attribution, book action, and source link within the librarian’s table.
11. Older-language guidance: existing reviewed introduction and language context, plus the checked first chapter anchor and source-edition guidance.
12. Shelf arrangements: recently read, recently saved, title, author. Shelf dates are optional and recorded from this update forward; older undated saves are alphabetic, not assigned fictional dates.
13. Notebook revisit: group by book, select saved notes, print preview/Print to PDF, and plain-text export. Exports include selected saved notes and source references only. Nothing is uploaded.
14. Overlooked book: daily spotlight excludes books with saved reading positions and books marked Finished. Caption says unopened here, rather than making claims about reading elsewhere.
15. Remember visit: session-only filters, room, pages, time, sort, and guarded scroll-position restoration across reader navigation. Dialog opening does not overwrite the source shelf position.

## Preservation

All 100 catalogue records, local book texts, source assets, and backgrounds remain unchanged. Existing shelves, notes, bookmarks, collections, reading positions, reader appearance, Focus, chapter navigation, in-book search, ten-minute guides, comparison, book finder, journeys, reflections, backup/restore, and studio/Curiosity navigation remain available.

The personal library stays version 1. Optional savedAt dates are validated, included in existing backups, and merged with current dates winning conflicts. Missing dates in legacy libraries remain absent. Book sentences use existing note records and anchors. Temporary browse/return state is separate sessionStorage, excluded from personal backups. Shelf status can still save when its optional timestamp write is unavailable.

## Validation

410 Node tests pass, including the original preservation/source suites and eight new tests for time partitions, nonmutating shelf sorting, optional-date backup merging and invalid inputs, daily selections, unopened spotlight exclusions, exact saved passages, private sentence identity/anchors, selected-note export isolation, three connections, and invalid return coordinates.

Local browser checks: five genuinely short editions from the minutes filter; inline Raven source preview; saved Raven paragraph and reading entrance; existing Paper/Large reader settings; page-two and nonzero scroll restoration after reader return; Alice private sentence added without replacing the original note; grouped original notes and selected print preview. Final production-build and visual review results are recorded below after completion.

Local demonstration data only: existing test notes/collections retained; an additional Alice sentence was saved for review. Opening books during QA updates only their normal local reading positions.

Final verification: production build and TypeScript pass; ESLint has no errors and one pre-existing StudyAccount warning. Final built-preview review confirmed three connected titles in the finished-book dialog, preservation of the existing Alice sentence after canceling an unsaved edit, and desktop librarian-table layout. Both narrow and wide local browser surfaces were exercised without horizontal overflow. Book texts and tracked background files have no changes. Print preview was verified; the native operating-system print dialog was not exercised.
