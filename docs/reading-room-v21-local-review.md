# Reading Room V2.1 — local review

Preview: http://127.0.0.1:3024/study/reading#books
Status: local only; not published.

## Five additions

- Find my next book: three choices for whole-book length, editorial mood, and familiar/new genres. Offers up to three unfinished books with explanations. Short means the slower 200 wpm estimate remains under two hours; an evening allows up to five hours. Empty results invite revised choices, rather than violating the filters. Suggestions use the local shelf, not AI or external tracking.
- Continue Reading: most recently opened unfinished book, chapter, approximate position within the source edition, and one Continue link. Other books stay behind a disclosure. Position is not a completion claim or record of every page read.
- Reading journeys: Strange Worlds, An Hour or Two, The Human Mind, Ideas That Stay With Us. Selecting a journey resets other filters to show its complete curated selection; subsequent searches still work within it. Leave journey restores the full catalogue. All older collections and filters remain.
- Optional Before you begin introductions for all 25 books, available in book details and readers. Brief historical context, original spoiler-free invitation, language guidance, and a context/source link.
- Marking a book Finished from its detail panel or reader offers an optional private reflection and two unfinished follow-up suggestions. Reflections are ordinary bounded ReadingNote records, included in existing backup/restore and editable in Notes & passages. Unsaved text blocks closing or opening a next-book link until Save or explicit Discard. No automatic completion or AI request.

## Compatibility

No storage schema/key changes, migration, source text changes, chapter/paragraph changes, background replacements, or dependency changes. Existing shelf status, positions, notes, bookmarks, Focus, appearance, grid/list preference, chapter navigation, book search, passage discussions, source links, backup/restore, and Curiosity Room access remain.

## Context sources

All catalogue/context pages reviewed November 14, 2026: https://www.gutenberg.org/ebooks/{id} for the 25 existing catalogue IDs. These pages identify the source works and bibliographic context; invitations and language guidance are original editorial copy, not reproduced summaries. Dates describe original publication/performance or a broad composition period, not the Gutenberg upload date. Ancient works use broad periods and acknowledge uncertainty. Frankenstein acknowledges revision; Little Women identifies both parts. The Dorian Gray introduction distinguishes magazine appearance from expanded book form, checked against the British Library: https://www.britishlibrary.cn/en/works/picture-of-dorian-gray/ . Existing source ledger remains docs/reading-editions.md.

## Validation

392 tests pass; TypeScript and production build pass; ESLint has zero errors and the existing StudyAccount navigation warning. Tests cover recommendation constraints and empty results, familiar/surprising genres, journey integrity, recency and finished-book exclusions, stable resume anchors, reflection bounds and ordinary backup round-trip, all 25 introductions, and all existing tests.

Local browser: three-choice finder returns the two actual books under two hours, book introduction expands, An Hour or Two filters to two editions, finished-book dialog saves a reflection into the existing notes list, next-book navigation protects an unsaved reflection, Alice retains its existing bookmark, note, Paper theme, text size, and chapter II saved position. A clearly labeled local-preview reflection was added to The Yellow Wallpaper and it was marked Finished for demonstration; no production data was touched.
