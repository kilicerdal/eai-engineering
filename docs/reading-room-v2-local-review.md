# Reading Room V2 — local review

Local preview: http://127.0.0.1:3024/study/reading#books

Compact responsive bookshelf with persistent grid/list toggle. Book details retain the reading invitation, Why read this, length, moods, opening excerpt, shelf controls, and source links. All 25 editions now have original chapter/act/essay navigation and literal phrase search across the complete text, capped at 100 matching passages with contextual snippets.

Existing source JSON, text, paragraph IDs, section boundaries, background images, and storage keys are unchanged. The optional shelfView preference remains compatible with old state and backups. Notes, bookmarks, positions, source links, appearance controls, Focus, passage discussion, filters, surprise, backup/restore, and Curiosity Room access remain available.

Validation: 386 tests pass, TypeScript passes, production build passes, ESLint has zero errors (existing StudyAccount navigation warning). Local browser verified view persistence, retained Alice shelf/note/bookmark, contents for all 12 chapters, chapter jump, full-book search for “curiouser,” and result navigation to its source paragraph. Not published.
