# Reading Room V2.6 — local review

Local preview: http://127.0.0.1:3024/study/reading
Local only; V2.5 remains live. Publish only after the user requests it.

## All six improvements

1. Up next: pin one title from Waiting for you, replace it with another waiting title, or unpin without removing the book. A small cue lives in My Books; Discover has no new panel. The optional version-1 library field is validated and backed up. Current pins win restore conflicts; an incoming pin is imported when none is present. Pins for titles no longer on the waiting shelf are hidden, and normal shelf changes clear the pin.
2. Note-type filters: an optional disclosure contains All notes, Question, Favorite passage, Thought, and Without a type. Filters combine with notebook book/text search. Legacy untyped notes remain available. Changing filters is blocked while editing a note.
3. Your place: Reading tools shows the checked current source heading and estimated words/time from the current saved/visible paragraph to the next contents heading, crossing artificial reading sections correctly. The last heading estimates to edition end, which can include source notes. Non-Focus readers have a Your place button. Estimates use 200–250 wpm, include the current paragraph, and are never countdowns or targets.
4. Gentle return: the reading entrance offers Revisit my last saved passage, with original text and an exact saved-place link. Saved positions at least seven days old receive a brief welcome back. No generated recap or later-event summary is used; existing Continue and ten-minute actions remain.
5. Selected bookmark export: notes and bookmarks can be selected across notebook sections and exported together through print preview or plain text. Bookmark exports use full original source paragraphs, source edition references, and stable section/paragraph links. Missing/failed source loads stop preparation rather than substituting a passage. Selection changes invalidate pending/old downloads. Nothing is uploaded, and saved items are not modified.
6. Accessibility refinements: dialogs restore focus without intentional scroll movement to a visible trigger, or to the active room/Reading tools/library link when the trigger was removed. Boundary Tab handling supplements native modal focus trapping, including the dialog itself. Escape still uses each dialog’s existing unsaved-edit guard. Close buttons have 44px targets; coarse-pointer/mobile controls gain 44px heights; paragraph action targets and gutters are widened on mobile. Focus outlines remain visible and use a darker color on light reading paper. Controls wrap on narrow screens.

## Preservation

All 100 catalogue records, full source texts, contents/source anchors, and background images are unchanged. Existing shelf statuses, saved positions, bookmarks, notes and their optional title/type, collections, preferences, backup/restore, Focus, line spacing, chapter/search tools, comparisons, ten-minute guides, personal book sentences, daily invitations, source previews, reading journeys, and Curiosity Room access remain available.

The library and backup retain version 1. Existing libraries with no upNext parse unchanged. No storage key was replaced, no global clear/reset was introduced, and current personal notes are not migrated or rewritten. Bookmark export is a separate prepared copy.

## Validation

421 Node tests pass, including the original source/preservation suites plus Up next compatibility/eligibility/merge checks, untyped note filtering, chapter boundary arithmetic across sections, real first/last headings in all 100 texts, seven-day/future timestamp cases, and exact-source bookmark export/failure behavior.

Local browser checks: Frankenstein was added as a local demo waiting title and pinned; the pin persisted after reload. The existing Question note filters correctly. A selected Question note and the original Alice p8 bookmark appeared together in print preview, including exact original wording and links. Escape returned to Print preview. The saved-passage return disclosure showed the existing Dickens passage. Your place showed CHAPTER I. The Period with a 5–6 minute estimate. Escape returned to Your place; Tab stayed inside Reading tools. The new estimate text measured contrast ratios of 8.31–9.94 against its rendered background.

At a temporary 390×844 viewport, the reader and waiting shelf had no horizontal overflow. Reading tools and dialog close targets measured 44px high (close also 44px wide); tested reader buttons measured 44px or more. The Up next tile action also measured 44px high. The temporary viewport was reset afterward. These are scoped accessibility checks, not a claim of a full conformance audit.

Local QA updates only normal demo reading state; original notes/bookmarks are retained. No production records were touched. Final build, TypeScript, lint and keyboard-wrap verification are recorded after completion.

Final verification: production build and TypeScript pass; ESLint has zero errors and only the existing StudyAccount warning. In the final built preview, Shift+Tab on the Reading tools close button wrapped to Exit focus mode inside the modal; Escape returned focus to the fixed Reading tools button. The viewport override was reset. No catalogue, source text, or background file changes.
