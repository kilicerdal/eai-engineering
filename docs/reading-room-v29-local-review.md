# Reading Room V2.9 — local review

Local preview: http://127.0.0.1:3024/study/reading

## All 20 additions

| # | Addition | Where to find it |
|---|---|---|
| 1 | One waiting book | Discover: one recent unfinished, unpaused book; My Books retains its single continue row |
| 2 | Atmosphere invitations | Other ways into the library → What atmosphere feels right? Uses existing mood filters |
| 3 | First-page invitation | Other ways → Let a first page choose you. Source passage first, title after Reveal |
| 4 | Quiet discovery shelf | Other ways → Explore a different corner. Up to three unopened, unfinished books |
| 5 | Seasonal librarian selections | Other ways → seasonal selection. Three editorial picks; Northern Hemisphere calendar stated |
| 6 | Reading commitment | Book details → A closer look → Time for this book |
| 7 | Spoiler-free reading experience | A closer look → What kind of experience awaits? Existing curated invitation and language guidance |
| 8 | Edition and translation information | A closer look → Edition & translation. Header metadata for all 100 source texts; original publication context is separate from electronic release date |
| 9 | Historical reading context | A closer look → The world around this book. Existing sourced publication context and an explicitly editorial historical reading perspective |
| 10 | One companion book | A closer look → A companion book. Author/genre/mood connection explained; opens book details |
| 11 | Contents near current chapter | Reader → Chapters & contents. Current heading is scrolled into view and focused when reopened |
| 12 | Optional paragraph emphasis | A quieter reading experience. Click/tab to a paragraph; scrolling updates the visible paragraph |
| 13 | Hide repeated passage buttons | A quieter reading experience. Selection-based tools and Notes remain available |
| 14 | Optional keyboard shortcuts | A quieter reading experience. N/P chapters, B bookmark, T tools. Ignores controls, dialogs, text selection and modifiers; draft guard retained |
| 15 | Gentle stopping estimate | Optional reader footer and Reading tools: remaining words to next source heading/end, 200–250 wpm, no timer |
| 16 | Put a book aside | Book details → Put this book aside. Reversible flag; original shelf status, notes and position stay. Dedicated Put aside shelf |
| 17 | Personal shelf descriptions | Manage collections → shelf description. Private optional 300-character sentence with stale-data and unsaved-change guards |
| 18 | Optional ordered reading queue | Book details add/remove; My Books queue reorder/remove. Independent of original Up next pin |
| 19 | Search bookmarked source text | My Notebook → Bookmarks → Find my saved passage. Loads original paragraphs on request, four books at a time. Also searches full bookmarked paragraphs in the reader |
| 20 | Return to a thought | My Notebook optional disclosure. Existing private note plus original passage link; no duplicate note or AI summary |

## Data and content preservation

- All 100 catalogue records, original text/JSON files, source hashes and backgrounds unchanged.
- Existing shelf/library keys and version-1 backup format retained. No migration or startup rewrite.
- Optional reader preferences: paragraphFocus, hidePassageButtons, shortcuts, gentlePause. Off by default.
- Optional bookExtras.paused flag retains original shelf status. Paused/queued-only books remain visible in All saved.
- Optional readingQueue validates up to 100 unique known book IDs; backup merge retains current order and appends new imported members.
- Optional collection.description validates 300 characters. Restore preserves current descriptions and fills absent descriptions from imported matching collections.
- Source metadata copied from unchanged bundled Project Gutenberg headers. Electronic release dates are explicitly distinguished from original publication dates. Missing translator credits are not treated as proof of original language.
- Existing notes, bookmarks, dedications, recovery positions, collection membership, Up next, saved positions, export/restore and Focus mode remain supported.

## Verification

- 437 automated tests pass, including preservation of every original edition/source hash and new compatibility/search/queue/paused-book tests.
- Type checking passes. ESLint: no errors; the existing unrelated StudyAccount navigation warning remains.
- Local UI: atmosphere filtering; reveal a source passage; unopened and seasonal selections; book context and companion; queue add/reorder; pause/unpause; shelf description save and unsaved-change/discard guard.
- Local UI: saved paragraph search returns the exact Alice source paragraph for “cake”; 2 existing bookmarks and 3 notes remain available.
- Reader UI: hidden passage buttons; one emphasized paragraph; optional gentle estimate; T opens tools, N changes to the next original chapter with return path; typing T in search stays text entry. Current contents heading is visible and focused.
- Focus mode retains Backup & restore and the new aids within More options.
- Mobile 390×844: no horizontal overflow in library/reader; atmosphere controls exceed 44px height; expanded book dialog fits viewport. Temporary viewport reset.

Local-only implementation. No V2.9 push or deployment performed.
