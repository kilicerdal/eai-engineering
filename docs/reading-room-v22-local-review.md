# Reading Room V2.2 — local review

Local preview: http://127.0.0.1:3024/study/reading#books
Not published. The production site remains V2.1.

## All five additions

1. Personal collections: create and rename up to 30 collections, put a book in multiple collections, filter the compact shelf, and remove a collection without removing books or other reading data. Collections use an optional field in the existing version-1 library; old libraries and backups still parse unchanged. Restore merges collection memberships by name and resolves conflicting IDs; oversized merges fail before writes.
2. Reading notebook: search private notes and passages across books by text, title, or author, filter by book, edit an existing note, and return to its exact saved paragraph. Edits retain IDs, quotes, anchors, and creation dates. A changed/deleted note is not silently recreated. Notes stay in the existing library and backups.
3. Just ten minutes: start from the saved or visible place, estimate a stretch of 2,000 words at whole-paragraph boundaries, and mark a suggested pause. Short books use the remaining text. There is no timer, completion claim, forced pause, or AI request. A small reading-guide strip stays available while reading. The guide is temporary; saved reading progress uses the existing system.
4. Book comparison: select two or three books, compare time, editorial moods, Why read this, and language guidance, then open book details. Comparison selections survive shelf filtering during the current visit and can be cleared; they are not stored as personal preferences.
5. Catalogue expansion: exactly 100 source-checked English-language editions, including translated works, poetry, drama, essays, fables, short fiction, and longer novels. All 75 additions have full local texts, source/credits/license links, source paragraph IDs, contents anchors, search, original editorial invitations, and reading guidance. Initial browsing shows 24 books, with Show more; search still checks all 100. Existing genres, curated filters, recommendations, and journeys include appropriate new selections.

## Source review and reproducibility

- `docs/reading-sources-v22.json`: 75 official Gutenberg metadata records, public-domain-in-USA status, English-language status, text URL, SHA-256, review date, and source contents/sample anchors.
- `scripts/reading/v22-curation.json`: original editorial selection, displayed title/author overrides, genres, moods, and reading invitations.
- `scripts/reading/import-v22.py`: offline importer for a previously downloaded and reviewed source cache. It never rewrites the original 25 editions. Input includes `selected.json`, each official RDF record, plain text, and corresponding HTML when available. Source paragraphs are preserved; source bodies are segmented at paragraph boundaries for navigation. Review output identifies source headings and sample passages.
- Every new text retains the complete Project Gutenberg credits and license. Text-only editions omit images; source links provide the illustrated versions. Rights are recorded for these particular editions, including translations, rather than inferred from the age of an author. The existing local copyright guidance remains.
- Samples for new editions are labeled source passages, not necessarily openings. Read here starts at the checked main-text anchor, while Open this passage deliberately jumps to the sample. Original 25 opening previews are unchanged.
- Historical or potentially offensive wording is not silently edited. Moods, invitations, and language guidance are editorial, not extracted source claims.

## Preservation and validation

398 tests pass. TypeScript and production build pass. ESLint has zero errors and the existing StudyAccount warning. Existing 25 catalogue records and all 50 source text/JSON files match the published V2.1 fixture byte for byte. The original six records and storage keys remain unchanged. All 100 texts pass source-body reconstruction, SHA, license, sample-anchor, section, and word-count checks. All contents anchors resolve to existing unchanged source paragraphs.

Tests also cover old-state parsing, collection validation/backup merging/identity conflicts/overflow, existing note and bookmark preservation, short-read start/end/word-count boundaries, new-reader start anchors, all 75 official source metadata records, and the existing Curiosity Room and studio suites.

Local browser review: 24 books initially, Show more to 48, full-catalogue search finding Gitanjali, its 103 source poem anchors and reader, personal collection creation and membership/filtering, comparison of Alice and Frankenstein, notebook search over pre-existing notes and canceling an edit without changing it, and ten-minute guide from Alice’s saved chapter II position. The original Alice note/bookmark and Paper theme remain. A local demo collection named Weekend reads contains Alice; no production records were touched.

Existing backgrounds, Focus, font/theme/width settings, bookmarks, notes, reading positions, shelf statuses, backup/restore, source/license links, chapter navigation, in-book search, finished-book reflections, book finder, and Curiosity Room access remain available.

Final browser check also followed The Raven into its second reading section and confirmed the suggested pause marker after the poem’s final paragraph, alongside the persistent, dismissible reading-guide strip. No timer or automatic Finished status was introduced.
