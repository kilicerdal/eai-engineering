# Reading Room V2.8 — local review

Local preview: http://127.0.0.1:3024/study/reading

## Six improvements

- Optional private dedication in book details, with Save/Discard and stale-data protection.
- Search the current book's notes and named bookmarks; clear the query without changing saves.
- Compact notes show a title or preview. Expand to see the full note, quotation, and existing actions.
- Per-book opt-in to remember whether the notes panel is open. Independent of reading position; off by default.
- Start again in book details with explicit confirmation. Retains a recoverable previous position, blocks replacing that recovery point, and offers Restore my previous position. Shelf statuses, notes and bookmarks are unchanged.
- Reading journal in My Notebook gathers existing finished-book reflections, with saved dates, search, editing and the existing selection/export controls. No duplicate notes are created.

## Compatibility

All 100 catalogue records, original source editions, backgrounds and existing keys remain unchanged. Optional `bookExtras` metadata uses the existing version-1 library and backup. Parsing validates book IDs, booleans, 500-character dedication limits and recovery position bounds, and copies only supported fields. Backup merge preserves current book metadata over imported metadata.

## Verification

- 428 automated tests pass, including all 100 source hashes/anchors and new metadata parsing/backup compatibility checks.
- Type checking and production build pass.
- ESLint: no errors; existing unrelated StudyAccount navigation warning remains.
- Local UI: saved dedication; confirmed restart, saw recovery action, restored position, and reopened the saved section. Existing Alice notes and both bookmarks remained available.
- Local UI: journal displayed the existing Yellow Wallpaper reflection; note search reduced 3 notes to 1 and bookmark search reduced 2 bookmarks to 1.
- Local UI: enabled workspace memory and reloaded; notes panel reopened. Closed panel and verified return focus.
- Responsive checks at 1280×900 and 390×844: mobile document width matched viewport, panel remained inside viewport. Corrected paper/sepia search input contrast. Temporary viewport reset.

Local only. No commit, push or deployment performed for V2.8.
