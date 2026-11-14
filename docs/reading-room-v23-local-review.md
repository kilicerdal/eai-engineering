# Reading Room V2.3

A calmer library organized into Discover, My Books, and My Notebook. Compact tiles and list view, twelve books per page, broad browsing categories, and optional search/help reduce initial clutter. Book details retain source passages, Why read this, shelf controls, collections, comparison, and reading guides. Library settings holds backup/restore and collections.

All 100 book records, full texts, source assets, backgrounds, and existing personal storage schemas remain unchanged. Temporary room/filter/page choices use sessionStorage separately from personal data. Existing shelves, notes, bookmarks, collections, reader preferences, and reading positions remain available. Notebook stays mounted across room changes to retain an unsaved editing draft.

Validation: 402 tests pass; TypeScript and production build pass. ESLint has zero errors and one pre-existing StudyAccount warning. git diff --check passes. Browser review confirmed compact tiles, three destinations, saved notebook content, existing reading status, and page-two persistence after reload. Local review approved by the user before release to main.
