# Reading Room V2.7 — local review

Local preview: http://127.0.0.1:3024/study/reading
Local only. V2.6 remains live; publish only after the user requests it.

## All six improvements

1. Back to where I was: one transient return place captures the previous visible/saved paragraph before a programmatic section, chapter, search, bookmark, or note jump. Returning restores that exact anchor and clears the return action rather than creating a navigation loop. Invalid target paragraphs do not replace the current place. The temporary return is scoped to the current book visit; normal saved reading position updates continue to work.
2. Bookmark names: optional names up to 80 characters are stored alongside the original generated label, identity, source anchor, and date. Names can be cleared without removing the bookmark; chapter and source glimpse remain. Naming is available in the reader and My Notebook; search and selected bookmark export include the name. Older libraries with unnamed bookmarks parse unchanged, and normal backups carry names.
3. Notes beside the book: a nonmodal companion panel sits beside the text at widths of 1100px or more, and becomes a dismissible lower panel on smaller screens. Existing add/edit/return/remove note actions and title/type fields are reused, with the full note tools still available. Draft text remains anchored to its captured paragraph. Closing, leaving through the library link, entering Focus, or opening the tutor with a nonempty side draft prompts Save or Discard/Cancel. Notes are not auto-saved or silently dropped by those actions. The panel itself is temporary and adds no personal storage key.
4. Quieter Reading tools: your place, text size, notes/bookmarks, contents/search, and previous/next section actions appear first. More options holds spacing/theme/width, backup, ten-minute guide, fine-grained section selector, bookmarking and collection controls. Common actions are not duplicated visibly in More options. All prior reader tools remain available; non-Focus controls remain accessible.
5. Personal collection order: Move up/Move down changes the existing bookIds sequence, with keyboard-accessible controls and boundary disabling. The moved item receives focus and the change is announced. Selecting a personal collection defaults to My collection order; title/author/recent sorting remains available. Moves preserve every membership and collection date/identity. Existing backups and merges already preserve this array order; no separate order migration is required.
6. Dialog/navigation polish: native dialogs are centered with fit-content sizing and viewport bounds. Sticky headers keep close controls reachable while the dialog scrolls. Chapter dialogs distinguish original chapters/acts/essays from finer reading sections, show the current source heading, and provide previous/next chapter actions. Close/Escape and existing modal keyboard boundaries remain in place.

## Preservation

All 100 catalogue records, full local source texts, source/contents anchors, and backgrounds are unchanged. Existing shelves, Up next, collections, notes and their titles/types, bookmarks, saved positions, reader appearance/Focus/spacing, backup/restore and preparation status, source previews, chapter search, ten-minute guides, comparisons, personal book sentences, discovery/journey tools, and Curiosity Room access remain supported. Version-1 libraries/backups and existing storage keys remain in use. No reset or destructive migration was added.

## Validation

425 Node tests pass. New coverage checks exact immutable return places, optional bookmark-name parsing and backup/export preservation, title clearing and invalid values, lossless collection moves/bounds/restore order, collection browse state, and real source chapter navigation. Existing full-text/source hashes and all previous preservation tests pass.

Local browser review: all original Alice notes and its p8 bookmark remain. A new local demo bookmark was named, without changing its source anchor. Side-note unsaved text prevented close and library navigation until discarded, and focus returned to the notes launcher. A source chapter jump and return restored the previously captured visible passage. The compact tools menu kept advanced controls behind More options. A new Local preview order collection was created with Pride and Prejudice, Alice, and Frankenstein; moving Frankenstein up produced Pride, Frankenstein, Alice on both the manager and the filtered shelf. The original Weekend reads collection remained unchanged.

Desktop check at 1280×900: the 350px notes panel did not overlap the 780px text paper and no horizontal overflow occurred. Chapter dialog bounds were centered (700px width, x=290) with viewport padding. Phone check at 390×844: tools/dialogs and lower notes panel had no horizontal overflow. The lower panel occupied 45svh, keeping book text visible; close target was at least 44px. Scrolling the long chapter dialog kept the close button at y=32 with the dialog at y=12. Temporary viewport overrides were reset after checks.

Local QA only added demonstration bookmark/collection data and used normal reading navigation. No production reading data was touched. Final production build, TypeScript, lint, and final preview are recorded after completion.

Final production build and TypeScript checks passed. ESLint has zero errors and only the pre-existing StudyAccount warning. Final 1280px notes companion check confirmed an opaque panel background, focus on its heading, and no horizontal overflow. No tracked catalogue, text, or image changes.
