# Reading Room V2.5 — local review

Local preview: http://127.0.0.1:3024/study/reading
Local only; V2.4 remains live until publication is requested.

## Six improvements

1. Just the book: Focus hides the header, toolbars, metadata, footer, paragraph action buttons, and reading-guide chrome. One fixed Reading tools button opens appearance, contents/search, bookmarks/notes, backup, section navigation, and a library link. Exit focus restores the original interface. Section boundaries remain the original reader sections; Next section is available in Reading tools.
2. Bookmark glimpses: the checked saved paragraph appears alongside its chapter name in the reader bookmark dialog and My Notebook. Original bookmark identity and anchors are unchanged. Notebook text requests are shared per edition. Missing paragraphs or failed fetches keep the bookmark link and show a neutral fallback rather than a substituted passage.
3. My Books search: collapsed by default, title/author matching with normalization for accents and punctuation. It combines with the active personal shelf/collection, preserves pagination behavior, and uses a separate session-only query from Discover.
4. Note organization: optional titles up to 80 characters and Question / Favorite passage / Thought types, exposed inside the editor. Notebook search includes these fields and exports include them. The source quote, anchor, identity, timestamp, and text are retained on metadata edits; fields can be cleared without deleting the note.
5. Reading rhythm: compact (1.5), comfortable (1.85), and spacious (2.2) line-height options alongside text size/theme. Optional spacing preference is validated and survives normal backup/restore; legacy preference objects remain unchanged until the reader chooses a value.
6. Backup reassurance: Library settings and Backup & restore show when a backup was last prepared on this browser and compare current reading data with that exact preparation. A separate local marker stores only the preparation time and a SHA-256 digest of canonical shelf/library data, not another copy of private notes. Preparation history is not restored from another device or included in personal backups. The interface explicitly says prepared does not mean downloaded. No reminder popup or unsupported file-save claim was introduced. Concurrent preparations retain the latest request’s marker.

## Preservation and validation

All 100 book records, source texts, and backgrounds remain unchanged. Existing reading positions, shelves, notes, bookmarks, collections, metadata, Focus preference, and other reader controls remain supported. The library and backup stay version 1 with optional validated fields. Old notes and preferences parse unchanged. Existing merge and rollback behavior remains in place; metadata differences in imported notes use the existing non-destructive conflict handling.

415 Node tests pass, including old source/preservation tests and new metadata compatibility, invalid-input, title/type clearing, export, preference, title/author search, session-state, canonical-change, and SHA-256 checks. ESLint has zero errors and the existing StudyAccount warning. Production build and TypeScript verification are recorded after the final build.

Local browser review: personal shelf query Lewis yields Alice; Spacious changes the actual paragraph line height to 48.4px at 22px text; Focus exposes exactly one visible button; Reading tools retains original reader controls; the original Alice bookmark shows its exact saved words and chapter; one additional local demo Question note was created with title and then retitled; original notes remain present; preparation displays no changes immediately after preparation and changes after that metadata edit. The preparation check does not assert that a backup file was downloaded. No production data was touched.

Final production build and TypeScript checks passed. Final notebook bookmark review confirmed the same original p8 link and passage preview after reload. No tracked book text, catalogue, or image file changes. The local preview remains on port 3024.
